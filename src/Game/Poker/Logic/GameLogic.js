Poker.GameLogic = cc.Class.extend({
    ctor: function(){
        var i;
        this.vaoCuoc = false;
        this.myChair = 0; // Chair in server
        this.players = [];
        this.gameId = 0;
        this.roomId = 0;
        this.bet = 1000;
        this.chickenMoney = 0;
        this.chuongChair = 5;
        this.numberPlayerDangChoi = 8;
        this.maxPlayer = 9;

        for(i = 0; i < this.maxPlayer; i++){
            var player = new Poker.Player();
            if(i == 0){
                player.isMy = true;
            }else{
                player.isMy = false;
            }
            player.status = 0;
            player.hasMoBai = false;
            player.index = i;
            this.players.push(player);
        }

        this.potTotal = 0;
        this.maxBet = 0;
        this.riseStep = 0;
        this.currentBet = 0;
        this.currentMoney = 0;
        this.currentActiveChair = 0;
        this.potMoney = 0;
        this.myCards = [];
        this.publicCard = [];
        this.actionChair = 0;
        this.myBoBaiId = 0;
        this.needUpdateGui = false;
        this.inBattle = false;

        for(var i=0; i < this.maxPlayer; i++)
        {
            this.players[i].oldCurrentBet = 0;
            this.players[i].currentBet = 0;
            //cc.log("i: " + pk.playerStatusList[i]);
            this.players[i].hasBoBai = false;
            this.players[i].hasAllIn = false;
        }

        this.canShowCard = false;
        this.hasChiaBai = false;
        this.potAmount = 0;
        this.lastStep = 0;
        this.isTour = false;

    },

    convertChair: function(serverChair){
        return (serverChair - this.myChair + 3*this.maxPlayer)%this.maxPlayer;
    },

    joinRoom: function(pk){
        this.maxPlayer = pk.maxPlayer;
        this.needUpdateGui = true;
        cc.log("joinRoom 1");
        this.gameState = Poker.GameState.JOIN_ROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.chickenMoney = 0;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.countDownTime;

        for(var i=0;i< this.maxPlayer;i++)
        {
            var chair = this.convertChair(i);
            if(pk.playerStatus[i] != 0){
                this.players[chair].nickName = pk.playerInfos[i].nickName;
                this.players[chair].currentMoney = pk.playerInfos[i].currentMoney;
                this.players[chair].avatar = pk.playerInfos[i].avatar;
                this.players[chair].status = pk.playerStatus[i];
                this.players[chair].chairInServer = i;
                this.players[chair].chairLocal = chair;
            }
        }
        this.minBuyInTiLe = pk.minBuyInTiLe;
        this.maxBuyInTiLe = pk.maxBuyInTiLe;
    },

    setGameInfo: function(pk){
        cc.log("setGameInfo");
        this.maxPlayer = pk.maxPlayer;
        this.needUpdateGui = true;
        this.gameState = Poker.GameState.GAME_INFO;
        this.myChair = pk.chair;
        this.myCards = pk.myCards;
        this.publicCard = pk.publicCards;

        this.dealerChair = this.convertChair(pk.dealerChair);
        this.smallBlindChair = this.convertChair(pk.smallBlindChair);
        this.bigBlindChair = this.convertChair(pk.bigBlindChair);

        this.potAmount = pk.potAmount;
        this.maxBet = pk.maxBet;
        this.raiseStep = pk.raiseStep;

        this.roundId = pk.roundId;
        this.gameServerState = pk.gameServerState;
        this.gameAction = pk.gameAction;

        this.countDownTime = pk.countDownTime;
        this.currentActiveChair = this.convertChair(pk.currentActiveChair);

        this.moneyType = pk.moneyType;
        this.bet = pk.bet;
        this.gameId = pk.gameId;
        this.roomId = pk.roomId;
        this.hasInfoList = pk.hasInfoList;

        for(var i = 0; i < this.maxPlayer; i++){
            var localChair = this.convertChair(i);
            this.players[localChair].hasFold = pk.playerInfoList[i].fold;
            this.players[localChair].hasAllIn = pk.playerInfoList[i].hasAllIn;
            this.players[localChair].currentBet = pk.playerInfoList[i].currentBet;
            this.players[localChair].currentMoney = pk.playerInfoList[i].currentMoney;
            this.players[localChair].status = pk.playerInfoList[i].status;
            this.players[localChair].avatarUrl = pk.playerInfoList[i].avatarUrl;
            this.players[localChair].nickName = pk.playerInfoList[i].nickName;
            this.players[i].hasShowCard = false;
        }

        // them cac thong tin
        this.publicOldSize = 0;
        this.inBattle = true;
        this.raiseBlock = false;
        this.lastStep = 0;
    },

    notifyOutRoom: function(pk){
        this.gameState = Poker.GameState.NOTIFY_OUT_ROOM;
    },

    userJoinRoom: function(pkg){
        this.gameState = Poker.GameState.NEW_USER_JOIN_ROOM;
        var chairLocal = this.convertChair(pkg.chair);
        {
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].nickName = pkg.nickName;
            this.players[chairLocal].avatar = pkg.avatar;
            this.players[chairLocal].currentMoney = pkg.currentMoney;
            this.players[chairLocal].status = pkg.status;
            this.players[chairLocal].chairInServer = pkg.chair;
        }
    },

    userLeaveRoom: function(pkg){
        cc.log("vao unserLeave logic");
        var chairLocal = this.convertChair(pkg.chair);
        if(pkg.nickName){
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].status = 0;
        }
        cc.log("local chair: " + this.activeLocalChair);
        this.gameState = Poker.GameState.USER_LEAVE_ROOM;
    },

    clearNewGame: function(){
        this.gameState = Poker.GameState.NONE;
        this.myCards = [];
        this.publicCard = [];
    },

    takeTurn: function(cmd){
        this.gameState = Poker.GameState.TAKE_TURN;
        this.currentBet = cmd.currentBet;
        this.maxBet = cmd.maxBet;
        this.raiseStep = cmd.raiseStep;
        this.raiseBlock = cmd.raiseBlock;
        this.lastStep = cmd.lastStep;
        if(this.lastStep <= 0 || this.lastStep == null || this.lastStep == undefined){
            this.lastStep = 0;
        }
        //this.raiseStep = cmd.bet;

        if(this.raiseStep < this.bet*2){
            this.raiseStep = this.bet*2;
        }

        var actionChair = this.convertChair(cmd.actionChair);
        this.currentAction = cmd.action;
        this.players[actionChair].currentMoney = cmd.currentMoney;
        this.players[actionChair].currentBet = cmd.currentBet;

        if(this.currentAction == Poker.GameAction.FOLD){
            this.players[actionChair].hasBoBai = true;
        }

        if(this.currentAction == Poker.GameAction.ALLIN){
            this.players[actionChair].hasAllIn = true;
        }

        this.process();
    },

    process: function(cmd) {

    },

    selectDealer: function(pk){
        cc.log("selectDealer");
        this.gameState = Poker.GameState.SELECT_DEALER;

        for(var i=0; i < this.maxPlayer; i++)
        {
            var chair = this.convertChair(i);
            this.players[chair].status = pk.playerStatusList[i];
        }

        this.dealerChair = this.convertChair(pk.dealerChair);
        this.smallBlindChair = this.convertChair(pk.smallBlindChair);
        this.bigBlindChair =  this.convertChair(pk.bigBlindChair);

        cc.log(this.dealerChair + " " + this.smallBlindChair + " " + this.bigBlindChair);
        this.roundId = 0;
        this.publicCard = [];
        this.potAmount = 0;

        this.maxBet = this.bet*2;
        this.raiseStep = this.bet*2;

        for(var i=0; i < this.maxPlayer; i++)
        {
            this.players[i].oldCurrentBet = 0;
            this.players[i].currentBet = 0;
            //cc.log("i: " + pk.playerStatusList[i]);
            this.players[i].hasBoBai = false;
            this.players[i].hasAllIn = false;
            this.players[i].hasShowCard = false;
        }




        this.gameId = pk.gameId;
        this.isCheat = pk.isCheat;
        if(this.isCheat){
            for(var i =0; i < this.maxPlayer; i++){
                var localChair = this.convertChair(i);
                this.players[localChair].currentMoney = pk.currentMoneyList[i];
            }
        }
        this.inBattle = true;
        this.canShowCard = false;
        this.raiseBlock = false;
        this.hasChiaBai = false;



        var s= "";
        for(var i = 0; i < this.maxPlayer; i++){
            s += " " + pk.listBetBigBlind[i];
        }

        cc.log("myChair: " + this.myChair);
        cc.log(" logic Big Blind them: " + s);


        for(var i = 0; i < this.maxPlayer; i++){
            if(pk.listBetBigBlind[i]){
                cc.log("gameLogic: " + pk.listBetBigBlind[i]);
                this.players[this.convertChair(i)].currentBet = this.bet*2;
            }

        }

        if(pk.listBetBigBlind[pk.smallBlindChair] > 0){
            this.players[this.smallBlindChair].currentBet = this.bet*2;
        }
        else{
            this.players[this.smallBlindChair].currentBet = this.bet;
        }

        this.players[this.bigBlindChair].currentBet = this.bet*2;


        for(var i = 0; i < this.maxPlayer; i++){
            if(this.players[i].currentBet > 0){
                this.players[i].currentMoney = this.players[i].currentMoney - this.players[i].currentBet;
            }
        }
    },

    buyIn: function(pk){
        this.gameState = Poker.GameState.BUY_IN;
        this.buyInChair = this.convertChair(pk.chair);
        this.players[this.buyInChair].currentMoney = pk.buyInMoney;
        if(this.players[this.buyInChair].currentMoney > this.bet) {
            this.players[this.buyInChair].status = Poker.GameStatus.SITTING;
        }
    },

    changeTurn: function(pk){
        this.currentActiveChair = this.convertChair(pk.chair);
        this.betTime = pk.countDownTime;
        this.gameState = Poker.GameState.CHANGE_TURN;
        //this.process();
    },

    dealCard: function(pk) {
        this.gameState = Poker.GameState.DEAL_CARD;
        cc.log("logic dealCard");
        this.myCards = pk.myCards;
        this.players[0].cards = pk.myCards;
        this.myBoBaiId = pk.boBaiId;
        cc.log("this.boBaiId: " + this.boBaiId);
    },

    newBetRound: function(pk){
        this.roundId  = pk.roundId;
        cc.log("round Id: " + pk. roundId);
        this.gameState = Poker.GameState.NEW_BET_ROUND;
        this.publicOldSize = this.publicCard.length;
        cc.log("public card size: " + this.publicOldSize);

        for(var i = 0; i < this.maxPlayer; i++){
            this.players[i].oldCurrentBet = this.players[i].currentBet;
            this.players[i].currentBet = 0;
        }

        this.maxBet = 0;
        this.raiseStep = 2*this.bet;
        cc.log("pk card size: " + pk.plusCards.length);
        for(var i = 0; i < pk.plusCards.length; i++){
            this.publicCard.push(pk.plusCards[i]);
        }

        this.myBoBaiId = pk.cardName;
        this.potAmount = pk.potAmount;
    },

    endGame: function(pk){
        this.gameState = Poker.GameState.END_GAME;
        this.potAmount = pk.potAmount;
        this.currentPot = pk.potAmount;
        this.rankList = pk.rankList;
        this.kqttList = pk.kqttList;
        this.currentMoney = pk.currentMoney;
        this.privateCardList = pk.privateCardList;
        this.playerActionList = pk.hasInfoList;
        this.publicOldSize = this.publicCard.length;
        this.publicCard = pk.publicCards;

        var rankList2 = [];
        var mark = [];


        cc.log("rank list: " + this.rankList.length);

        var temp = "";
        for(var i = 0; i < this.rankList.length; i++) {
            temp = temp + " " + this.rankList[i];
            if(this.rankList[i] == 0)
                this.rankList[i] = 10;
            mark[i] = false;
        }
        cc.log(temp);

        while(rankList2.length < this.maxPlayer){
            var maxChair = -1;
            var maxRank = 11;

            for(var i = 0; i < this.rankList.length; i++){;
                if(!mark[i]){
                    if(this.rankList[i] < maxRank ){
                        maxRank = this.rankList[i];
                        maxChair = i;
                    }
                }
            }

            mark[maxChair] = true;
            rankList2.push(this.convertChair(maxChair));
        }

        this.rankList = rankList2;


        this.countWiner = 0;

        for(var i = 0; i < this.kqttList.length; i++){
            if(this.kqttList[i] > 0 && pk.booleanWinerList[i]){
                this.players[this.convertChair(i)].isWiner = true;
            }
            else{
                this.players[this.convertChair(i)].isWiner = false;
            }

            this.players[this.convertChair(i)].winMoney = this.kqttList[i];
        }


        temp = "";
        var temp2 = "";
        for(var i = 0; i < this.rankList.length; i++) {
            temp = temp + " " + this.rankList[i];
        }

        for(var i = 0; i < this.rankList.length; i++) {
            temp2 = temp2 + " " + this.players[i].winMoney;
        }

        cc.log(temp);
        cc.log(temp2);

        for(var i = 0; i < this.currentMoney.length && pk.hasInfoList[i]; i++){
            this.players[this.convertChair(i)].currentMoney = this.currentMoney[i];
        }


        for(var i = 0; i < this.maxPlayer; i++){
            this.players[i].oldCurrentBet = this.players[i].currentBet;
            //this.players[i].currentBet = 0;
        }

        for(var i = 0; i < this.maxPlayer; i++){
            var chair = this.convertChair(i);
            this.players[chair].cards = pk.privateCardList[i];
            this.players[chair].maxCards = pk.maxCardList[i];
            this.players[chair].boName = pk.cardNameList[i];
        }

        this.myBoBaiId = this.players[0].boName;

        this.countNeedOpen = 0;
        for(var i = 0; i < this.playerActionList.length; i++){
            if(this.playerActionList[i] > 1){
                this.countNeedOpen++;
            }
        }

        this.myEndAction = 1;
        for(var i = 0; i < this.playerActionList.length; i++){
            if(this.convertChair(i) == 0){
                this.myEndAction = this.playerActionList[i];
            }
        }

        if(this.countNeedOpen >= 2){
            this.needOpen = true;
        }
        else{
            this.needOpen = false;
            if(this.myEndAction > 1){
                this.canShowCard = true;
            }
        }


        this.maxCardList = pk.maxCardList;

        for(i = 0; i < pk.gameMoney.length && i < this.maxPlayer; i++){
            if(this.convertChair(i) == 0 && pk.hasInfoList[i]){
                cc.log("end Game" + pk.gameMoney[i]  +   " " + this.moneyType);
                lobby.updateMoney(pk.gameMoney[i], this.moneyType);
            }
        }

    },

    updateMatch: function(cmd){
        this.gameState = Poker.GameState.UPDATE_MATCH;
        this.inBattle = false;
        for(var i=0; i< cmd.hasInfoList.length; i++){
            if(cmd.hasInfoList[i])
            {
                var local = this.convertChair(i);
                // need review
                this.players[local].currentMoney = cmd.currentMoneyList[i];
                this.players[local].status = cmd.statusList[i];
            }
        }
    },

    showCard: function(cmd){
        cc.log("showCard doa nguoi");
        this.gameState = Poker.GameState.SHOW_CARD;
        cc.log(cmd.chair);
        this.showCardChair = this.convertChair(cmd.chair);
        cc.log(this.showCardChair);
    },

    notifyBuyIn: function(){
        cc.log("notifyBuyIn");
        this.gameState = Poker.GameState.NOTIFY_BUY_IN;
    },

    standBuy: function(cmd){
        cc.log("stand up");
        this.gameState = Poker.GameState.STAND_UP;
    }
});


Poker.GameLogic.getNameBoBai = function(boBaiId){
    if(boBaiId == Poker.BoPoker.EG_SANH_VUA){
        return "SẢNH VUA";
    }
    else if(boBaiId == Poker.BoPoker.EG_THUNG_PHA_SANH){
        return "THÙNG PHÁ SẢNH";
    }
    else if(boBaiId == Poker.BoPoker.EG_TU_QUY){
        return "TỨ QUÝ";
    }
    else if(boBaiId == Poker.BoPoker.EG_CU_LU){
        return "CÙ LŨ";
    }
    else if(boBaiId == Poker.BoPoker.EG_THUNG) {
        return "THÙNG"
    }
    else if(boBaiId == Poker.BoPoker.EG_SANH){
        return "SẢNH";
    }
    else if(boBaiId == Poker.BoPoker.EG_XAM_CO){
        return "SÁM CÔ";
    }
    else if(boBaiId == Poker.BoPoker.EG_HAI_DOI){
        return "HAI ĐÔI";
    }
    else if(boBaiId == Poker.BoPoker.EG_DOI){
        return "MỘT ĐÔI";
    }
    else if(boBaiId == Poker.BoPoker.EG_MAU_THAU){
        return "MẬU THẦU";
    }
    else if(boBaiId == Poker.BoPoker.EG_SERVER_NGU){
        return "SERVER NGU";
    }
    else{
        return "" + boBaiId;
    }
};


Poker.GameLogic.getResourceBoBai = function(boBaiId){
    if(boBaiId == Poker.BoPoker.EG_SANH_VUA){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/sanh_vua.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_THUNG_PHA_SANH){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_0.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_TU_QUY){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_1.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_CU_LU){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_2.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_THUNG) {
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_3.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_SANH){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_4.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_XAM_CO){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_5.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_HAI_DOI){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/hai_doi.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_DOI){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_7.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_MAU_THAU){
        return "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_8.png";
    }
    else if(boBaiId == Poker.BoPoker.EG_SERVER_NGU){
        "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_8.png";
    }
};

Poker.GameLogic.GameAction = {};
Poker.GameLogic.GameAction.DAT_CUOC = 1;
Poker.GameLogic.GameAction.CHIA_BAI = 2;

Poker.GameState = {};
Poker.GameState.CHIA_BAI = 1;
Poker.GameState.JOIN_ROOM = 2;
Poker.GameState.END_GAME = 3;
Poker.GameState.NEW_USER_JOIN_ROOM = 5;
Poker.GameState.USER_LEAVE_ROOM = 6;
Poker.GameState.DEAL_CARD = 7;
Poker.GameState.SELECT_DEALER = 8;
Poker.GameState.CHANGE_TURN = 9;
Poker.GameState.NEW_BET_ROUND = 10;
Poker.GameState.NOTIFY_OUT_ROOM = 11;
Poker.GameState.BUY_IN = 12;
Poker.GameState.UPDATE_MATCH = 13;
Poker.GameState.GAME_INFO = 14;
Poker.GameState.SHOW_CARD = 15;
Poker.GameState.NOTIFY_BUY_IN = 16;
Poker.GameState.STAND_UP  = 17;

Poker.GameStateServer = {};
Poker.GameStateServer.MOI_DAT_CUOC = 1;
Poker.GameStateServer.NOT_START = 0;
Poker.GameStateServer.CHIA_BAI = 2;
Poker.GameStateServer.END_GAME = 3;

Poker.GameAction = {};
Poker.GameAction.FOLD = 0;
Poker.GameAction.CHECK = 1;
Poker.GameAction.CALL = 2;
Poker.GameAction.RAISE = 3;
Poker.GameAction.ALLIN = 4;

Poker.GameStatus = {
    OUT_GAME: 0,
    VIEWING: 1,
    SITTING: 2,
    PLAYING: 3
}

Poker.BoPoker = {
    EG_SANH_VUA: 0,
    EG_THUNG_PHA_SANH: 1,
    EG_TU_QUY: 2,
    EG_CU_LU: 3,
    EG_THUNG: 4,
    EG_SANH: 5,
    EG_XAM_CO: 6,
    EG_HAI_DOI: 7,
    EG_DOI: 8,
    EG_MAU_THAU: 9,
    EG_SERVER_NGU: 10
}

Poker.getPokerBoName = {

}

