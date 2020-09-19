Lieng.GameLogic = cc.Class.extend({
    ctor: function(){
        var i;
        this.vaoCuoc = false;
        this.myChair = 0; // Chair in server
        this.players = [];
        this.gameId = 0;
        this.roomId = 0;
        this.bet = 0;
        this.chickenMoney = 0;
        for(i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++){
            var player = new Lieng.Player();
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

        this.maxBet = 0;
        this.oldMaxBet = 0;
        this.currentBet = 0;
        this.currentMoney = 0;
        this.currentActiveChair = 0;
        this.myCards = [];
        this.publicCard = [];
        this.actionChair = 0;
        this.myBoBaiId = 0;
        this.needUpdateGui = false;
        this.inBattle = false;
        this.potAmount = 0;
        this.raiseStep = 0;
        for(var i=0; i < Lieng.MAX_PLAYER; i++)
        {
            this.players[i].oldCurrentBet = 0;
            this.players[i].currentBet = 0;
            this.players[i].hasBoBai = false;
            this.players[i].hasAllIn = false;
        }
        this.canShowCard = false;
        this.hasChiaBai = false;
    },

    convertChair: function(serverChair){
        return (serverChair - this.myChair + Lieng.MAX_PLAYER)%Lieng.MAX_PLAYER;
    },

    joinRoom: function(pk){
        this.needUpdateGui = true;
        cc.log("joinRoom 1");
        this.gameState = Lieng.GameState.JOIN_ROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.chickenMoney = 0;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.countDownTime;

        for(var i=0;i< Lieng.GameLogic.MAX_PLAYER;i++)
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
        this.needUpdateGui = true;
        this.gameState = Lieng.GameState.GAME_INFO;
        this.myChair = pk.chair;

        this.players[0].originCards = pk.myCards;
        this.players[0].cards = this.shuffle(pk.myCards);
        this.myCards = this.players[0].cards;
        this.publicCard = pk.publicCards;

        this.dealerChair = this.convertChair(pk.dealerChair);
        this.smallBlindChair = this.convertChair(pk.smallBlindChair);
        this.bigBlindChair = this.convertChair(pk.bigBlindChair);
        this.potAmount = pk.potAmount;
        this.maxBet = pk.maxBet;
        this.oldMaxBet = this.maxBet;
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

        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
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
        this.lastRaise = 0;
    },

    notifyOutRoom: function(pk){
        this.gameState = Lieng.GameState.NOTIFY_OUT_ROOM;
    },

    userJoinRoom: function(pkg){
        this.gameState = Lieng.GameState.NEW_USER_JOIN_ROOM;
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
        this.gameState = Lieng.GameState.USER_LEAVE_ROOM;
    },

    clearNewGame: function(){
        this.gameState = Lieng.GameState.NONE;
        this.myCards = [];
        this.publicCard = [];
    },

    shuffle: function(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    },

    takeTurn: function(cmd){
        this.gameState = Lieng.GameState.TAKE_TURN;
        this.currentBet = cmd.currentBet;
        this.oldMaxBet = this.maxBet;
        this.maxBet = cmd.maxBet;
        this.raiseStep = cmd.raiseStep;
        //this.lastRaise = cmd.lastRaise;

        if(this.oldMaxBet < this.maxBet){
            this.lastRaise = this.maxBet - this.oldMaxBet;
        }

        if(this.raiseStep < this.bet){
            this.raiseStep = this.bet;
        }

        var actionChair = this.convertChair(cmd.actionChair);
        this.currentAction = cmd.action;
        this.players[actionChair].currentMoney = cmd.currentMoney;
        this.players[actionChair].currentBet = cmd.currentBet;

        if(this.currentAction == Lieng.GameAction.FOLD){
            this.players[actionChair].hasBoBai = true;
        }

        if(this.currentAction == Lieng.GameAction.ALLIN){
            this.players[actionChair].hasAllIn = true;
        }

        cc.log(cmd.potMoney);
        this.potAmount = cmd.potMoney;
        this.raiseBlock = cmd.raiseBlock;
        this.process();
    },

    process: function(cmd) {

    },

    selectDealer: function(pk){
        cc.log("selectDealer");
        this.gameState = Lieng.GameState.SELECT_DEALER;

        for(var i=0; i < Lieng.MAX_PLAYER; i++)
        {
            var chair = this.convertChair(i);
            this.players[chair].status = pk.playerStatusList[i];
        }

        this.dealerChair = this.convertChair(pk.dealerChair);
        this.smallBlindChair = this.convertChair(pk.smallBlindChair);
        this.bigBlindChair =  this.convertChair(pk.bigBlindChair);
        this.roundId = 0;
        this.publicCard = [];
        this.potAmount = 0;

        this.maxBet = this.bet;
        this.oldMaxBet = this.maxBet;
        this.raiseStep = this.bet;
        this.hasChiaBai = false;
        this.lastRaise = 0;

        for(var i=0; i < Lieng.MAX_PLAYER; i++)
        {
            this.players[i].oldCurrentBet = 0;
            this.players[i].currentBet = 0;
            //cc.log("i: " + pk.playerStatusList[i]);
            this.players[i].hasBoBai = false;
            this.players[i].hasAllIn = false;
            this.players[i].hasShowCard = false;
        }

        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            if(this.players[i].status == Lieng.GameStatus.PLAYING){
                this.players[i].currentBet = this.bet;
                this.players[i].currentMoney = this.players[i].currentMoney - this.bet;
                this.potAmount = this.potAmount + this.bet;
            }
        }

        this.gameId = pk.gameId;
        this.isCheat = pk.isCheat;
        if(this.isCheat){
            for(var i =0; i < Lieng.MAX_PLAYER; i++){
                var localChair = this.convertChair(i);
                this.players[localChair].currentMoney = pk.currentMoneyList[i];
            }
        }
        this.inBattle = true;
        this.canShowCard = false;
        this.raiseBlock = false;
        this.hasChiaBai = false;
    },

    buyIn: function(pk){
        this.gameState = Lieng.GameState.BUY_IN;
        this.buyInChair = this.convertChair(pk.chair);
        this.players[this.buyInChair].currentMoney = pk.buyInMoney;
        if(this.players[this.buyInChair].currentMoney > this.bet) {
            this.players[this.buyInChair].status = Lieng.GameStatus.SITTING;
        }
    },

    changeTurn: function(pk){
        this.currentActiveChair = this.convertChair(pk.chair);
        this.betTime = pk.countDownTime;
        this.gameState = Lieng.GameState.CHANGE_TURN;
        //this.process();
    },

    dealCard: function(pk) {
        this.gameState = Lieng.GameState.DEAL_CARD;
        cc.log("logic dealCard");
        this.myCards = pk.myCards;

        this.players[0].originCards = pk.myCards;
        this.players[0].cards = this.shuffle(pk.myCards);
        this.myBoBaiId = pk.boBaiId;
        this.timeChiaBai = pk.timeChiaBai;
        cc.log("this.timeChiaBai" + this.timeChiaBai);
        cc.log("this.boBaiId: " + this.boBaiId);
    },

    endGame: function(pk){
        this.gameState = Lieng.GameState.END_GAME;
        this.potAmount = pk.potAmount;
        this.currentPot = pk.potAmount;
        this.rankList = pk.rankList;
        this.kqttList = pk.kqttList;
        this.currentMoney = pk.currentMoney;
        this.privateCardList = pk.privateCardList;
        this.playerActionList = pk.hasInfoList;

        this.myEndAction = 1;
        for(var i = 0; i < this.playerActionList.length; i++){
            if(this.convertChair(i) == 0){
                this.myEndAction = this.playerActionList[i];
            }
        }

        var rankList2 = [];
        var mark = [];

        for(var i = 0; i < this.rankList.length; i++) {
            if(this.rankList[i] == 0)
                this.rankList[i] = 10;
            mark[i] = false;
        }

        while(rankList2.length < Lieng.MAX_PLAYER){
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
            if(this.kqttList[i] > 0){
                this.countWiner++;
            }

            if(this.kqttList[i] > 0 && pk.booleanWinerList[i]){
                this.players[this.convertChair(i)].isWiner = true;
            }
            else{
                this.players[this.convertChair(i)].isWiner = false;
            }

            this.players[this.convertChair(i)].winMoney = this.kqttList[i];

        }


        for(var i = 0; i < this.currentMoney.length && pk.hasInfoList[i]; i++){
            this.players[this.convertChair(i)].currentMoney = this.currentMoney[i];
        }


        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            this.players[i].oldCurrentBet = this.players[i].currentBet;
            //this.players[i].currentBet = 0;
        }

        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            var chair = this.convertChair(i);

            if(chair != 0){
                this.players[chair].cards = pk.privateCardList[i];
            }

            this.players[chair].boName = pk.cardNameList[i];
        }

        this.myBoBaiId = this.players[0].boName;

        this.countNeedOpen = 0;
        for(var i = 0; i < this.playerActionList.length; i++){
            if(this.playerActionList[i] > 1){
                this.countNeedOpen++;
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

        for(i = 0; i < pk.gameMoney.length && i < Lieng.MAX_PLAYER; i++){
            if(this.convertChair(i) == 0 && pk.hasInfoList[i]){
                cc.log("end Game" + pk.gameMoney[i]  +   " " + this.moneyType);
                lobby.updateMoney(pk.gameMoney[i], this.moneyType);
            }
        }

    },

    updateMatch: function(cmd){
        this.gameState = Lieng.GameState.UPDATE_MATCH;
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
        cc.log("game Logic showCard");
        this.gameState = Lieng.GameState.SHOW_CARD;
        cc.log("cmd chair: " + cmd.chair);
        this.showCardChair = this.convertChair(cmd.chair);
        cc.log("this show card chair: " + this.showCardChair);
    },

    receiveLatBai: function(cmd){
        cc.log("latBai");
        this.gameState = Lieng.GameState.LAT_BAI;
        this.showCardChair = this.convertChair(cmd.chair);
        this.players[this.showCardChair].cards = cmd.cards;
    },

    notifyBuyIn: function(cmd){
        cc.log("logic notifyBuyIn");
        this.gameState = Lieng.GameState.NOTIFY_BUY_IN;
        this.players[0].currentMoney = 0;
    },

    standBuy: function(cmd){
        cc.log("stand up");
        this.gameState = Lieng.GameState.STAND_UP;
    }
});


Lieng.GameLogic.getNameBoBai = function(boBaiId){
    if(boBaiId >= 0 && boBaiId <=8){
        return boBaiId + " ĐIỂM";
    }
    else if(boBaiId == Lieng.BoLieng.EG_CHIN){
        return "CHÍN ĐIỂM";
    }
    else if(boBaiId == Lieng.BoLieng.EG_ANH){
        return "ẢNH";
    }
    else if(boBaiId == Lieng.BoLieng.EG_LIENG){
        return "LIÊNG";
    }
    else if(boBaiId == Lieng.BoLieng.EG_SAP + 1) {
        return "SÁP ÁT";
    }
    else if(boBaiId >= Lieng.BoLieng.EG_SAP +2 && boBaiId <= Lieng.BoLieng.EG_SAP + 10){
        return "SÁP " + (boBaiId - 20);
    }
    else if(boBaiId == Lieng.BoLieng.EG_SAP + 11){
        return "SÁP J";
    }
    else if(boBaiId == Lieng.BoLieng.EG_SAP + 12){
        return "SÁP Q";
    }
    else if(boBaiId == Lieng.BoLieng.EG_SAP + 13){
        return "SÁP K";
    }
};

Lieng.GameLogic.getResourceBoBai = function(boBaiId){
    if(boBaiId >= 0 && boBaiId <= 8){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/" + boBaiId + "Nuoc.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_CHIN){
        return "res/CardGame/Poker/diemChin.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_ANH){
        return "res/CardGame/Poker/diemAnh.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_LIENG){
        return "res/CardGame/Poker/diemLieng.png";
    }
    else if(boBaiId >= Lieng.BoLieng.EG_SAP + 1) {
        return "res/CardGame/Poker/diemSap.png";
    }
};

Lieng.GameLogic.needShadown = function(boBaiId){
    if(boBaiId >= 0 && boBaiId <= 8){
        return true;
    }
    else if(boBaiId == Lieng.BoLieng.EG_CHIN){
        return true;
    }
    else{
        return false;
    }
};

Lieng.GameLogic.getResourceHienThiDiem = function(boBaiId){
    if(boBaiId == 0){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/0NuocLieng.png";
    }
    if(boBaiId >= 1 && boBaiId <= 8){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/" + boBaiId + "Nuoc.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_CHIN){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/" + 9 + "Nuoc.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_ANH){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/anh.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_LIENG){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/lieng.png";
    }
    else if(boBaiId == Lieng.BoLieng.EG_SAP + 1){
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_at" + ".png";
    }
    else if(boBaiId >= Lieng.BoLieng.EG_SAP + 2) {
        return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_" + (boBaiId - 20) +".png";
    }
};

Lieng.GameLogic.GameAction = {};
Lieng.GameLogic.GameAction.DAT_CUOC = 1;
Lieng.GameLogic.GameAction.CHIA_BAI = 2;

Lieng.GameState = {};
Lieng.GameState.CHIA_BAI = 1;
Lieng.GameState.JOIN_ROOM = 2;
Lieng.GameState.END_GAME = 3;
Lieng.GameState.NEW_USER_JOIN_ROOM = 5;
Lieng.GameState.USER_LEAVE_ROOM = 6;
Lieng.GameState.DEAL_CARD = 7;
Lieng.GameState.SELECT_DEALER = 8;
Lieng.GameState.CHANGE_TURN = 9;
Lieng.GameState.NEW_BET_ROUND = 10;
Lieng.GameState.NOTIFY_OUT_ROOM = 11;
Lieng.GameState.BUY_IN = 12;
Lieng.GameState.UPDATE_MATCH = 13;
Lieng.GameState.GAME_INFO = 14;
Lieng.GameState.SHOW_CARD = 15;
Lieng.GameState.LAT_BAI = 16;
Lieng.GameState.NOTIFY_BUY_IN = 17;
Lieng.GameState.STAND_UP = 18;

Lieng.GameStateServer = {};
Lieng.GameStateServer.MOI_DAT_CUOC = 1;
Lieng.GameStateServer.NOT_START = 0;
Lieng.GameStateServer.CHIA_BAI = 2;
Lieng.GameStateServer.END_GAME = 3;

Lieng.GameAction = {};
Lieng.GameAction.FOLD = 0;
Lieng.GameAction.CHECK = 1;
Lieng.GameAction.CALL = 2;
Lieng.GameAction.RAISE = 3;
Lieng.GameAction.ALLIN = 4;

Lieng.GameStatus = {
    OUT_GAME: 0,
    VIEWING: 1,
    SITTING: 2,
    PLAYING: 3
}

Lieng.BoLieng = {
    EG_DIEM: 0,
    EG_CHIN: 11,
    EG_ANH: 12,
    EG_LIENG: 13,
    EG_SAP: 20
}

Lieng.getLiengBoName = {

}

Lieng.GameLogic.MAX_PLAYER = 9;