XiZach.GameLogic = cc.Class.extend({
    ctor: function(){
        var i;
        this.myChair = 0; // Chair in server
        this.chuongChair = 0;
        this.chuongChairServer = 0;
        this.players = [];
        this.gameId = 0;
        this.roomId = 0;
        this.bet = 0;

        for(i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++){
            var player = new XiZach.Player();
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

        this.currentMoney = 0;
        this.currentActiveChair = 0;
        this.myCards = [];
        this.myBoBaiId = 0;
        this.needUpdateGui = false;
        this.inBattle = false;

        for(var i=0; i < XiZach.MAX_PLAYER; i++)
        {
            this.players[i].hasMoBai = false;
        }
        this.gameStateServer = XiZach.GameStateServer.NO_START;
        this.gameState = XiZach.GameState.NONE;
        this.hasChiaBai = false;
    },



    resetNewGame: function(){
        for(var i = 0; i < XiZach.MAX_PLAYER; i++) {
            this.players[i].hasMoBai = false;
            this.players[i].hasSoBai = false;
            this.players[i].cards = [];
            this.players[i].groupCard = new XiZach.GroupCard([]);
            this.needShowWinLostMoney = true;
            this.needShowCardXiZach = false;
            this.needUpdateMoneyXiZach = false;
            this.winMoney = false;
            this.needShowCardXiZach = false;
            this.needUpdateMoneyXiZach = false;
        }
    },

    convertChair: function(serverChair){
        if(this.myChair == this.chuongChairServer){
            return (serverChair - this.myChair + XiZach.MAX_PLAYER)%XiZach.MAX_PLAYER;
        }
        else{
            if(serverChair == this.myChair){
                return 0;
            }
            else if(serverChair == this.chuongChairServer){
                return 1;
            }
            else{
                var i = 0;
                var res = 2;

                while(i != serverChair){
                    if(i == this.myChair || i == this.chuongChairServer){
                        i++;
                    }
                    else{
                        i++;
                        res++;
                    }
                }

                return res;
            }
        }
    },

    //convertChair: function(serverChair){
    //    var res = (serverChair - this.myChair + XiZach.MAX_PLAYER)%XiZach.MAX_PLAYER;
    //    return res;
    //},

    convertToServerChair: function(clientChair){
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(this.convertChair(i) == clientChair){
                var res = i;
                return res;
            }
        }
    },

    //convertToServerChair: function(clientChair){
    //    if(this.myChair == this.chuongChairServer){
    //        return (clientChair + this.myChair + XiZach.MAX_PLAYER)%XiZach.MAX_PLAYER;
    //    }
    //    else{
    //        if(clientChair == 0){
    //            return this.myChair;
    //        }
    //        else if(clientChair == 1){
    //            return this.chuongChairServer;
    //        }
    //        else{
    //            var serverChair  = 0;
    //            for(var i = 2; i < XiZach.MAX_PLAYER; i++){
    //                while(serverChair == this.myChair || serverChair == this.chuongChairServer){
    //                    serverChair++;
    //                }
    //                if(i == clientChair){
    //                    return serverChair;
    //                    break;
    //                }
    //                serverChair++;
    //            }
    //        }
    //    }
    //},

    joinRoom: function(pk){
        this.needUpdateGui = true;
        cc.log("joinRoom 1");
        this.gameState = XiZach.GameState.JOIN_ROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.roomId = pk.roomId
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.chuongChairServer = pk.chuongChair;

        cc.log("myChair: " + this.myChair);
        cc.log("chuongChairServer: " + this.chuongChairServer);
        this.chuongChair = this.convertChair(this.chuongChairServer);
        cc.log("chuonChair: " + this.chuongChair);

        this.gameAction = pk.gameAction;
        this.countDownTime = pk.countDownTime;
        this.hasChuong  = pk.hasChuong;

        for(var i=0; i < XiZach.GameLogic.MAX_PLAYER;i++)
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
    },

    setGameInfo: function(pk){
        cc.log("setGameInfo");
        this.needUpdateGui = true;
        this.gameState = XiZach.GameState.GAME_INFO;
        this.myChair = pk.myChair;
        this.chuongChairServer = pk.chuongChair;
        this.hasChuong = true;
        this.chuongChair = this.convertChair(pk.chuongChair);
        this.gameStateAtServer = pk.gameServerState;

        this.gameServerState = pk.gameAction;
        this.gameStateServer = pk.gameAction;
        this.countDownTime = pk.countDownTime;

        this.moneyType = pk.moneyType;
        this.bet = pk.moneyBet;
        this.gameId = pk.gameId;
        this.roomId = pk.roomId;
        this.playerStatusList = pk.playerStatusList;

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            var localChair = this.convertChair(i);
            this.players[localChair].currentMoney = pk.playerInfoList[i].currentMoney;
            this.players[localChair].status = pk.playerStatusList[i];
            this.players[localChair].avatarUrl = pk.playerInfoList[i].avatarUrl;
            this.players[localChair].nickName = pk.playerInfoList[i].nickName;
            this.players[localChair].hasDanBai = pk.playerInfoList[i].hasDanBai;
            this.players[localChair].groupCard.clearCard();
            this.players[localChair].groupCard.addCards(pk.cardPlayerList[i]);
        }

        var tempString = "";
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            tempString += " " + this.players[i].status;
        }
        cc.log("logicStatusList: " + tempString);
    },

    notifyOutRoom: function(pk){
        this.gameState = XiZach.GameState.NOTIFY_OUT_ROOM;
    },

    userJoinRoom: function(pkg){
        this.gameState = XiZach.GameState.NEW_USER_JOIN_ROOM;
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
        this.gameState = XiZach.GameState.USER_LEAVE_ROOM;
    },

    clearNewGame: function(){
        this.gameState = XiZach.GameState.NONE;
        this.myCards = [];
        this.publicCard = [];
    },

    takeTurn: function(cmd){
        this.gameState = XiZach.GameState.TAKE_TURN;
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

        if(this.currentAction == XiZach.GameAction.FOLD){
            this.players[actionChair].hasBoBai = true;
        }

        if(this.currentAction == XiZach.GameAction.ALLIN){
            this.players[actionChair].hasAllIn = true;
        }

        cc.log(cmd.potMoney);
        this.potAmount = cmd.potMoney;
        this.raiseBlock = cmd.raiseBlock;
        this.process();
    },

    process: function(cmd) {

    },


    autoStart: function(pk){
        this.gameState = XiZach.GameState.AUTOSTART;
        this.resetNewGame();
        this.listPlayerServer = [];

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.listPlayerServer.push({});
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            cc.log("index: " + i  + " " + "oldServerChair" + this.convertToServerChair(i));
            this.listPlayerServer[this.convertToServerChair(i)] = {};
            this.listPlayerServer[this.convertToServerChair(i)].avatar = this.players[i].avatar;
            this.listPlayerServer[this.convertToServerChair(i)].nickName = this.players[i].nickName;
            this.listPlayerServer[this.convertToServerChair(i)].currentMoney = this.players[i].currentMoney;
            this.listPlayerServer[this.convertToServerChair(i)].status = this.players[i].status;
        }

        this.chuongChairServer = pk.chuongChair;
        this.chuongChair = this.convertChair(pk.chuongChair);

        cc.log("chuongChairServer" + pk.chuongChair + " " + this.chuongChair);

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){

            this.players[this.convertChair(i)].avatar = this.listPlayerServer[i].avatar;
            this.players[this.convertChair(i)].nickName = this.listPlayerServer[i].nickName;
            this.players[this.convertChair(i)].currentMoney = this.listPlayerServer[i].currentMoney;
            this.players[this.convertChair(i)].status = this.listPlayerServer[i].status;
            cc.log("index: " + i  + " " + "clientChair: " + this.convertChair(i));
        }


        this.timeAutoStart = pk.autoStartTime;

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.players[i].resetNewGame();
        }
    },

    dealCard: function(pk) {
        this.gameStateServer = XiZach.GameStateServer.CHIA_BAI;
        this.gameState = XiZach.GameState.DEAL_CARD;
        this.resetNewGame();

        this.listPlayerServer = [];

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.listPlayerServer.push({});
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.listPlayerServer[this.convertToServerChair(i)] = {};
            this.listPlayerServer[this.convertToServerChair(i)].avatar = this.players[i].avatar;
            this.listPlayerServer[this.convertToServerChair(i)].nickName = this.players[i].nickName;
            this.listPlayerServer[this.convertToServerChair(i)].currentMoney = this.players[i].currentMoney;
            this.listPlayerServer[this.convertToServerChair(i)].status = this.players[i].status;
        }

        this.chuongChairServer = pk.chuongChair;
        this.chuongChair = this.convertChair(pk.chuongChair);

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.players[this.convertChair(i)].avatar = this.listPlayerServer[i].avatar;
            this.players[this.convertChair(i)].nickName = this.listPlayerServer[i].nickName;
            this.players[this.convertChair(i)].currentMoney = this.listPlayerServer[i].currentMoney;
            this.players[this.convertChair(i)].status = this.listPlayerServer[i].status;
        }

        this.hasChiaBai = false;
        this.hasChuong = true;

        //cc.log("logic dealCard");

        this.myCards = [];
        this.players[0].groupCard.clearCard();
        for(var i = 0; i < pk.myCards.length; i++){
            this.myCards.push(pk.myCards[i]);
            this.players[0].groupCard.addCard(pk.myCards[i]);
        }

        for( var i = 0; i < pk.playerStatusList.length; i++){
            this.players[this.convertChair(i)].status = pk.playerStatusList[i];
        }

        this.gameId = pk.gameId;
        this.timeChiaBai = pk.timeChiaBai;

        var countPlaying =0;

        cc.log("myChair: " + this.myChair + " chuonChair: "  + this.chuongChairServer);
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.players[this.convertChair(i)].status = pk.playerStatusList[i];
            cc.log("i: " + i + " local: " + this.convertChair(i) + " " + pk.playerStatusList[i] + " " + this.players[this.convertChair(i)].status);
        }

        var tempString = " ";

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            tempString += " " + this.players[i].status;
        }

        cc.log("tempString: " + tempString);

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.players[i].groupCard.clearCard();
            this.players[i].hasSoBai = false;

            if(pk.playerStatusList[i] == XiZach.GameStatus.PLAYING){
                countPlaying++;
                //cc.log("I: " + i + " " + this.convertChair(i));
            }


            var listCard = [52, 52];
            //cc.log("listCard: " + listCard.length);
            var stringL = "";

            for(var j =0; j < listCard.length; j++){
                stringL += " " + listCard[j] + stringL;
            }

            //cc.log("stringL: " + stringL);

            if(i != 0){
                this.players[i].groupCard.addCards(listCard);
            }
        }

        this.players[0].groupCard.addCards(this.myCards);
    },

    notifyChuyenGiaiDoan2: function(pk){
        this.gameStateServer = XiZach.GameStateServer.GIAI_DOAN_2;
        this.gameState = XiZach.GameState.CHUYEN_GIAI_DOAN_2;
        this.countDownTime = pk.countDownTime;
    },

    notifyChuyenGiaiDoan3: function(pk){
        this.gameStateServer = XiZach.GameStateServer.GIAI_DOAN_3;
        this.gameState = XiZach.GameState.CHUYEN_GIAI_DOAN_3;
        if(0 != this.chuongChair){
            this.players[this.chuongChair].groupCard.clearCard();
            this.players[this.chuongChair].groupCard.addCards(pk.chuongCards);
        }

        this.countDownTime = pk.countDownTime;
    },

    receiveRutBai: function(pk){
        cc.log("logic receiveRutBai");

        this.gameState = XiZach.GameState.RUT_BAI;
        this.players[this.convertChair(pk.chair)].oldSize = this.players[this.convertChair(pk.chair)].groupCard.getCardSize();
        this.players[this.convertChair(pk.chair)].groupCard.addCard(pk.card);
    },

    rutBaiTuDong: function(pk){
        cc.log("rutBaiTuDong");
        var local = this.convertChair(pk.chair);

        if(local != this.chuongChair){
            this.gameServerState = XiZach.GameStateServer.KET_THUC_GIAI_DOAN_2;
        }
        else{
            this.gameServerState = XiZach.GameStateServer.KET_THUC_GIAI_DOAN_3;
        }

        this.gameState = XiZach.GameState.RUT_BAI_TU_DONG;
        cc.log("size before: " + this.players[local].groupCard.getCardSize());

        this.players[this.convertChair(pk.chair)].oldSize = this.players[this.convertChair(pk.chair)].groupCard.getCardSize();
        this.players[local].groupCard.addCards(pk.cards);
        cc.log("size after: "  + this.players[local].groupCard.getCardSize());
    },

    soBai: function(pk){
        cc.log("logic soBai");
        this.gameState = XiZach.GameState.SO_BAI;
        var chair1 = this.convertChair(pk.chair1);
        cc.log("logic chair1: " + chair1);
        var chair2 = this.convertChair(pk.chair2);
        cc.log("logic chair2: " + chair2);

        this.players[chair1].currentMoney = pk.currentMoney1;

        this.players[chair2].currentMoney = pk.currentMoney2;

        cc.log("logic hasCard1" + pk.hasCard1);
        cc.log("logic hasCard2"  + pk.hasCard2);

        if(pk.hasCard1){
            this.players[chair1].groupCard.clearCard();
            for(var i = 0; i < pk.card1.length; i++){
                this.players[chair1].groupCard.addCard(pk.card1[i]);
            }
        }

        if(pk.hasCard2){
            this.players[chair2].groupCard.clearCard();
            for(var i = 0; i < pk.card2.length; i++){
                this.players[chair2].groupCard.addCard(pk.card2[i]);
            }
        }

        //if(this.players[chair1].groupCard.isXiZach() && this.players[chair1].groupCard.isXiBang()){
        //    this.players[chair1].hasDanBai = true;
        //}

        //if(this.players[chair2].groupCard.isXiZach() && this.players[chair2].groupCard.isXiBang()){
        //    this.players[chair2].hasDanBai = true;
        //}
    },

    doiChuong: function(pk){
        cc.log("logic receiveDanBai");
        this.gameState = XiZach.GameState.DOI_CHUONG;

        this.listPlayerServer = [];

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.listPlayerServer.push({});
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.listPlayerServer[this.convertToServerChair(i)] = {};
            this.listPlayerServer[this.convertToServerChair(i)].avatar = this.players[i].avatar;
            this.listPlayerServer[this.convertToServerChair(i)].nickName = this.players[i].nickName;
            this.listPlayerServer[this.convertToServerChair(i)].currentMoney = this.players[i].currentMoney;
            this.listPlayerServer[this.convertToServerChair(i)].status = this.players[i].status;
        }

        this.chuongChairServer = pk.chuongChair;
        this.chuongChair = this.convertChair(pk.chuongChair);

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.players[this.convertChair(i)].avatar = this.listPlayerServer[i].avatar;
            this.players[this.convertChair(i)].nickName = this.listPlayerServer[i].nickName;
            this.players[this.convertChair(i)].currentMoney = this.listPlayerServer[i].currentMoney;
            this.players[this.convertChair(i)].status = this.listPlayerServer[i].status;
        }
    },

    notifyNoChuong: function(pk){
        cc.log("notify no chuong");
        this.gameState = XiZach.GameState.NOTIFY_NO_CHUONG;
        this.chuongChair = -1;
    },

    receiveDanBai: function(pk){
        cc.log("logic receiveDanBai");
        this.gameState = XiZach.GameState.DAN_BAI;
        this.players[this.convertChair(pk.chair)].hasDanBai = true;
    },

    endGame: function(pk){
        cc.log("logic endGame");

        this.gameState = XiZach.GameState.END_GAME;
        this.gameStateServer = XiZach.GameStateServer.END_GAME;

        this.statusList = pk.playerStatusList;
        for(var i = 0; i < this.statusList.length; i++){
            if(this.statusList[i] == XiZach.GameStatus.PLAYING) {
                var chair = this.convertChair(i);
                this.players[chair].groupCard.clearCard();
                this.players[chair].groupCard.addCards(pk.listCards[i]);
                this.players[chair].currentMoney = pk.currentMoneyList[i];
                this.players[chair].winMoney = pk.winMoneyList[i];
                this.players[chair].status = pk.playerStatusList[i];
                this.players[chair].needShowWinLostMoney = pk.needShowWinLostMoney[i];
                if(chair == 0){
                    lobby.updateMoney(this.players[chair].currentMoney, this.moneyType);
                }
            }
        }

        this.tongTienThangThua = pk.tongTienThangThua;
    },


    notifyKetQuaXiZach: function(pk){
        cc.log("logic endGame");

        this.gameState = XiZach.GameState.NOTIFY_KET_QUA_XIZACH;

        this.needShowCard = pk.needShowList;
        this.needUpdateMoney = pk.needUpdateMoneyList;

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            var chair = this.convertChair(i);

            if(this.needShowCard[i]) {
                this.players[chair].groupCard.clearCard();
                this.players[chair].groupCard.addCards(pk.listCards[i]);
                this.players[chair].needShowCardXiZach = true;
            }
            else{
                this.players[chair].needShowCardXiZach = false;
            }
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            var chair = this.convertChair(i);
            if(this.needUpdateMoney[i]){
                this.players[chair].winMoney = pk.winMoneyList[i];
                this.players[chair].currentMoney = pk.currentMoneyList[i];
                this.players[chair].needUpdateMoneyXiZach = true;
            }
            else{
                this.players[chair].needUpdateMoneyXiZach = false;
            }
        }
    },

    updateMatch: function(cmd){
        this.gameState = XiZach.GameState.UPDATE_MATCH;
        this.myChair = cmd.myChair;
        this.resetNewGame();

        for(var i=0; i < cmd.hasInfo.length; i++){
            if(cmd.hasInfo[i])
            {
                var local = this.convertChair(i);
                this.players[local].nickName = cmd.infos[i]["nickName"];
                this.players[local].avatar = cmd.infos[i]["avatar"];
                this.players[local].money = cmd.infos[i]["money"];
                this.players[local].status = cmd.infos[i]["status"];
            }
        }
    },

    isChuong: function(pk){
        return this.chuongChair == 0;
    }


});

XiZach.GameLogic.getBoId = function(id){
    return "" + id;

}

XiZach.GameLogic.hasAnhBoBai =  function(boBaiId){
    return (boBaiId > XiZach.BoXiZach.KG_THUONG || boBaiId == XiZach.BoXiZach.KG_QUAC);
}


XiZach.GameLogic.getNameBoBai = function(boBaiId) {
    if (boBaiId == XiZach.BoXiZach.KG_WRONG) {
        return "WRONG";
    }

    if(boBaiId == XiZach.BoXiZach.KG_DANNON){
        return "DAN NON";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_QUAC){
        return "QUAC";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_THUONG){
        return "THUONG";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_21DIEM){
        return "21 DIEM";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_NGULINH){
        return "NGU LINH";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_XIZACH){
        return "XI RACH";
    }
    else if(boBaiId == XiZach.BoXiZach.KG_XIBANG){
        return "XI_BANG";
    }
    else{
        cc.log("boBaiId getName: " + boBaiId);
        return "KHONG RO";
    }

};


XiZach.GameLogic.getNameImage = function(){
    var kk = this.tinhBo();
    if(kk == XiZach.BoXiZach.KG_XIBANG){
        return "res/CardGame/blackjack/xibang.png";
    }
    else if(kk == XiZach.BoXiZach.KG_XIZACH){
        return "res/CardGame/blackjack/xizach.png";
    }
    else if(kk == XiZach.BoXiZach.KG_NGULINH){
        return "res/CardGame/blackjack/ngulinh.png";
    }
    else if(kk == XiZach.BoXiZach.KG_QUAC){
        return "res/CardGame/blackjack/quac.png";
    }
    else if(kk == XiZach.BoXiZach.KG_21DIEM){
        return "res/CardGame/blackjack/21diem.png";
    }
    else{
        return "res/CardGame/blackjack/xibang.png";
    }
},

XiZach.GameLogic.getResourceHienThiDiem = function(boBaiId, diemBoBai){
    var kk = boBaiId;
    if(kk == XiZach.BoXiZach.KG_XIBANG){
        return "res/CardGame/backjack/xibang.png";
    }
    else if(kk == XiZach.BoXiZach.KG_XIZACH){
        return "res/CardGame/backjack/xizach.png";
    }
    else if(kk == XiZach.BoXiZach.KG_NGULINH){
        return "res/CardGame/backjack/ngulinh.png";
    }
    else if(kk == XiZach.BoXiZach.KG_QUAC){
        return "res/CardGame/backjack/quac.png";
    }
    else if(kk == XiZach.BoXiZach.KG_21DIEM){
        return "res/CardGame/backjack/21diem.png";
    }
    else if(kk == XiZach.BoXiZach.KG_THUONG){
        return "res/CardGame/backjack/" + diemBoBai + "D.png";
    }
    else{
        return "";
    }

};

XiZach.BoXiZach = {};
XiZach.BoXiZach.KG_WRONG = 0;
XiZach.BoXiZach.KG_XIBANG = 7;
XiZach.BoXiZach.KG_XIZACH = 6;
XiZach.BoXiZach.KG_NGULINH = 5;
XiZach.BoXiZach.KG_21DIEM = 4;
XiZach.BoXiZach.KG_THUONG = 3;
XiZach.BoXiZach.KG_QUAC = 2;
XiZach.BoXiZach.KG_DANNON = 1;

XiZach.GameState = {};
XiZach.GameState.JOIN_ROOM = 2;
XiZach.GameState.END_GAME = 3;
XiZach.GameState.NEW_USER_JOIN_ROOM = 4;
XiZach.GameState.USER_LEAVE_ROOM = 5;
XiZach.GameState.DEAL_CARD = 6;
XiZach.GameState.NOTIFY_OUT_ROOM = 8;
XiZach.GameState.UPDATE_MATCH = 10;
XiZach.GameState.GAME_INFO = 11;
XiZach.GameState.AUTOSTART = 12;
XiZach.GameState.CHUYEN_GIAI_DOAN_2 = 13;
XiZach.GameState.CHUYEN_GIAI_DOAN_3 = 14;
XiZach.GameState.RUT_BAI = 15;
XiZach.GameState.DAN_BAI = 16;
XiZach.GameState.SO_BAI = 17;
XiZach.GameState.RUT_BAI_TU_DONG = 18;
XiZach.GameState.DOI_CHUONG = 19;
XiZach.GameState.NOTIFY_NO_CHUONG = 20;
XiZach.GameState.NOTIFY_KET_QUA_XIZACH = 21;

XiZach.GameStateServer = {};
XiZach.GameStateServer.CHIA_BAI = 1;
XiZach.GameStateServer.GIAI_DOAN_2 = 2;
XiZach.GameStateServer.KET_THUC_GIAI_DOAN_2 = 3;
XiZach.GameStateServer.GIAI_DOAN_3 = 4;
XiZach.GameStateServer.KET_THUC_GIAI_DOAN_3 = 5;
XiZach.GameStateServer.END_GAME = 6;
XiZach.GameStateServer.NO_START  = -1;

XiZach.GameStatus = {
    OUT_GAME: 0,
    VIEWING: 1,
    SITTING: 2,
    PLAYING: 3
}

XiZach.getXiZachBoName = {

}

XiZach.GameLogic.MAX_PLAYER = 6;