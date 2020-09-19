//
BaCay.GameLogic = cc.Class.extend({
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
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var player = new BaCay.Player();
            if(i == 0){
                player.isMy = true;
            }else{
                player.isMy = false;
            }
            player.status = 0;
            player.hasMoBai = false;
            this.players.push(player);
        }
    },

    joinRoom: function(pk){
        cc.log("joinRoom 1");
        this.gameState = BaCay.GameState.JOIN_ROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.chickenMoney = 0;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.chuongChair = this.convertChair(pk.chuongChair);
        cc.log("joinRoom 2");

        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.countDownTime;
        cc.log("joinRoom 3");
        for(var i=0;i< BaCay.GameLogic.MAX_PLAYER;i++)
        {
            var chair = this.convertChair(i);
            if(pk.playerStatus[i] != 0){
                cc.log("joinRoom 4");
                this.players[chair].info = pk.playerInfos[i];
                cc.log("joinRoom 5");
                this.players[chair].status = pk.playerStatus[i];
                cc.log("joinRoom 6");
                this.players[chair].chairInServer = i;
                cc.log("joinRoom 7");
                this.players[chair].chairLocal = chair;
                cc.log("joinRoom 8");
            }
        }
        cc.log("joinRoom end");
    },

    setGameInfo: function(pk){
        this.gameState = BaCay.GameState.THONG_TIN_VAN_CHOI;
        this.myChair = pk.myChair;
        this.chuongChair = this.convertChair(pk.chuongChair);
        this.moneyType = pk.moneyType;
        this.bet = pk.moneyBet;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;

        this.danhBienMoneyList = [];
        this.keCuaMoneyList = [];
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++) {
            this.danhBienMoneyList[this.convertChair(i)] = pk.cuocDanhBienList[i] * this.bet;
            this.keCuaMoneyList[this.convertChair(i)] = pk.cuocKeCuaList[i];
        }

        this.myCards =  [];
        for(var i = 0; i < pk.cards.length; i++){
            this.myCards.push(pk.cards[i]);
            cc.log("reconnect card: " + i + " " + pk.cards[i]);
        }

        this.gameAction = pk.gameAction;
        this.isAutoStart = pk.isAutoStart;
        //this.gameServerState = pk.gameServerState;
        this.activeTimeRemain = pk.countDownTime;

        this.chickenMoney = 0;
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var chair = this.convertChair(i);
            if(pk.hasInfo[i]){
                cc.log("gameLogic hasInfo" + i + " " + chair);
                this.players[chair].info = [];
                this.players[chair].info.nickName = pk.players[i].nickName;
                this.players[chair].info.money = pk.players[i].money;
                this.players[chair].moneyBet = pk.players[i].cuocChuong*this.bet;
                this.players[chair].cuocChuong = pk.players[i].cuocChuong;
                this.players[chair].cuocGa = pk.players[i].cuocGa;
                this.chickenMoney += pk.players[i].cuocGa*this.bet;
                this.players[chair].info.avatar = pk.players[i].avatar;
                this.players[chair].status = pk.players[i].status;
            }
            else{
                this.players[chair].status = 0;
            }
        }
        this.countDownTime = pk.countDownTime;
    },

    userJoinRoom: function(pkg){
        this.gameState = BaCay.GameState.USER_JOIN;
        var chairLocal = this.convertChair(pkg.uChair);
        {
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].info = pkg.info;
            this.players[chairLocal].status = pkg.uStatus;
            this.players[chairLocal].chairInServer = pkg.uChair;
        }
    },

    userLeave: function(pkg){
        cc.log("vao unserLeave logic");


        var chairLocal = this.convertChair(pkg.chair);
        if(pkg.nickName){
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].status = 0;
        }
        cc.log("local chair: " + this.activeLocalChair);
        this.gameState = BaCay.GameState.USER_LEAVE;
    },

    autoStart: function(pk){
        this.gameState = BaCay.GameState.AUTO_START;
        this.timeAutoStart = pk.timeAutoStart;
    },

    isChuong: function(){
        return this.chuongChair == 0;
    },

    datCuoc: function(pk){
        var i;
        this.gameState = BaCay.GameState.DAT_CUOC;
        var chair = this.convertChair(pk.chairDatCuoc);
        this.players[chair].moneyBet = pk.level*this.bet;
        if(chair === 0){
            this.vaoCuoc = true;
        }
    },

    doiChuong: function(pk){
        this.gameState = BaCay.GameState.DOI_CHUONG;
        this.chuongChair = this.convertChair(pk.chuongChair);
    },

    notifyOutRoom: function(pk){
        this.gameState = BaCay.GameState.NOTIFYOUTROOM;
    },

    vaoGa: function(pk){
        this.gameState = BaCay.GameState.VAO_GA;
        this.chickenMoney = this.chickenMoney + pk.chicKenBet;
        cc.log("vao ga " + pk.chicKenBet + " to " + this.chickenMoney);
    },

    chiaBai: function(pk){
        this.gameState = BaCay.GameState.CHIA_BAI;
        this.gameServerState = BaCay.GameStateServer.CHIA_BAI;
        this.cards = [];
        for(var i = 0; i < pk.cards.length; i++){
            this.cards.push(pk.cards[i]);
        }
        this.timeChiaBai = pk.timeChiaBai;
        this.gameId = pk.gameId;
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            BaCay.gameLogic.players[i].hasMoBai = false;
        }
    },

    moiDatCuoc: function(pk){
        this.vaoCuoc = false;
        this.gameState = BaCay.GameState.MOI_DAT_CUOC;
        this.gameServerState = BaCay.GameState.gameServerState;
        this.numberPlayerDangChoi = 0;
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            if(this.players[i].status != 0){
                if((i != this.chuongChair)) {
                    this.players[i].moneyBet = this.bet;
                }
                this.players[i].status = 3;
                this.numberPlayerDangChoi++;
            }else{
                this.players[i].moneyBet = 0;
            }
        }
        this.timeDatCuoc = pk.timeDatCuoc;
    },

    endGame: function(pk){
        this.gameServerState = BaCay.GameStateServer.END_GAME;
        this.gameState = BaCay.GameState.END_GAME;
        var i;
        this.statusList = [];
        for(i = 0; i < pk.statusList.length; i++){
            this.statusList.push(pk.statusList);
            this.players[this.convertChair(i)].status = pk.statusList[i];
        }

        for(i = 0; i < pk.cardList.length; i++){
            var cards = [];
            for(var j = 0; j < pk.cardList[i].length; j++){
                cards.push(pk.cardList[i][j]);
            }
            this.players[this.convertChair(i)].cards = cards;
        }

        this.tienThangChuong = pk.tienThangChuong;
        this.tienThangGa = pk.tienThangGa;
        this.keCuaMoneyList = [];
        this.danhBienMoneyList = [];

        for( i = 0; i < pk.keCuaMoneyList.length; i++) {
            this.keCuaMoneyList.push(pk.keCuaMoneyList[this.convertToChairServer(i)]);
        }
        for(i = 0; i < pk.danhBienMoneyList.length; i++){
            this.danhBienMoneyList.push(pk.danhBienMoneyList[this.convertToChairServer(i)]);
        }

        this.tongTienCuoiVan = this.tongTienCuoiVan;

        var flag1 = true;
        var flag2 = true;

        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var chair = this.convertChair(i);
            this.players[this.convertChair(i)].tongTienCuoc = pk.tongTienCuocList[i];
            this.players[this.convertChair(i)].tongDanhBien = pk.tongDanhBienList[i];
            this.players[this.convertChair(i)].tongKeCua = pk.tongKeCuaList[i];
            this.players[this.convertChair(i)].tongCuocGa = pk.tongCuocGaList[i];
            this.players[this.convertChair(i)].tongCuoiVan = pk.tongCuoiVanList[i];
            if(chair != this.chuongChair && pk.tongTienCuocList[i] < 0){
                flag1 = false;
            }
            if(chair != this.chuongChair && pk.tongTienCuocList[i] > 0){
                flag2 = false;
            }
        }

        this.caLangSangTien = flag2;
        this.phatLuong = flag1;
        this.numPlayerPlaying = 0;
        for(i = 0; i < pk.statusList.length; i++){
            if(pk.statusList[i] == 3) {
                this.players[this.convertChair(i)].info.money = pk.currentMoneyList[i];
                if(this.convertChair(i) == 0){
                    lobby.updateMoney(pk.currentMoneyList[i], this.moneyType);
                }

                if(pk.tongCuocGaList[i] > 0) {
                    this.chickenMoney = pk.tongCuocGaList[i];
                }
                this.numPlayerPlaying++;
            }
        }

        this.timeEndGame = pk.timeEndGame;
    },

    updateMatch: function(pk){
        this.gameState = BaCay.GameState.UPDATE_MATCH;
        this.myChair = pk.myChair;
        this.chickenMoney = 0;
        for(var i=0; i<pk.hasInfo.length && i < gameData.maxPlayer; i++){
            if(pk.hasInfo[i])
            {
                var local = this.convertChair(i);
                this.players[local].info["nickName"] = pk.infos[i]["nickName"];
                this.players[local].info["avatar"] = pk.infos[i]["avatar"];
                this.players[local].info["money"] = pk.infos[i]["money"];
                this.players[local].status = pk.infos[i]["status"];
            }
        }
    },

    danhBien: function(pk){
        this.gameState = BaCay.GameState.YEU_CAU_DANH_BIEN;
    },

    chapNhanDanhBien: function(pk){
        this.gameState = BaCay.GameState.CHAP_NHAN_DANH_BIEN;
    },

    keCua: function(pk){
        this.gameState = BaCay.GameState.KE_CUA;
        if(pk.getError() == 0){
            this.players[this.convertChair(pk.chairKeCuaTo)].moneyBet += pk.level*this.bet;
        }
    },

    moBai: function(pk){
        this.gameState = BaCay.GameState.MO_BAI;
        var chair = this.convertChair(pk.chairMoBai);
        this.players[chair].cards = [];
        for(var i = 0; i < pk.cards.length; i++){
            this.players[chair].cards.push(pk.cards[i]);
        }
    },
    convertChair: function(serverChair){
        return (serverChair - this.myChair + BaCay.GameLogic.MAX_PLAYER)%BaCay.GameLogic.MAX_PLAYER;
    },
    convertToChairServer: function(local){
        return (local + this.myChair + BaCay.GameLogic.MAX_PLAYER)%BaCay.GameLogic.MAX_PLAYER;
    },

    getInGamePlayer: function(idx){
        var count = 0;
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            if(this.players[i].status == 3)
                count++;
            if(count == idx +1){
                return i;
            }
        }
    },

    numPlayerInGame: function(idx){
        var count = 0;
        var i = 0;
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            if(this.players[i].status == 3){
                count++;
            }
        }
        return count;
    }
});


BaCay.GameLogic.GameAction = {};
BaCay.GameLogic.GameAction.DAT_CUOC = 1;
BaCay.GameLogic.GameAction.CHIA_BAI = 2;
BaCay.GameState = {};
BaCay.GameState.AUTO_START = 0;
BaCay.GameState.DAT_CUOC = 1;
BaCay.GameState.CHIA_BAI = 2;
BaCay.GameState.YEU_CAU_DANH_BIEN = 3;
BaCay.GameState.CHAP_NHAN_DANH_BIEN = 4;
BaCay.GameState.GOP_GA = 12;
BaCay.GameState.JOIN_ROOM = 7;
BaCay.GameState.END_GAME = 8;
BaCay.GameState.DOI_CHUONG = 9;
BaCay.GameState.VAO_GA = 10;
BaCay.GameState.MOI_DAT_CUOC = 11;
BaCay.GameState.USER_JOIN = 12;
BaCay.GameState.USER_LEAVE = 13;
BaCay.GameState.KE_CUA = 14;
BaCay.GameState.MO_BAI = 15;
BaCay.GameState.UPDATE_MATCH = 16;
BaCay.GameState.THONG_TIN_VAN_CHOI = 17;
BaCay.GameStateServer = {};

BaCay.GameStateServer.MOI_DAT_CUOC = 1;
BaCay.GameStateServer.NOT_START = 0;
BaCay.GameStateServer.CHIA_BAI = 2;
BaCay.GameStateServer.END_GAME = 3;

BaCay.GameLogic.MAX_PLAYER = 8;