TienLen.kSortTangDan = 0;
TienLen.kSortGroup = 1;
TienLen.kSortUnkown = 2;

TienLen.GameLogic = cc.Class.extend({
    ctor: function(){
        this.bet= 0            // tiec cuoc cua 1 van bai
        this.roomOwner = 0      // ghe' cua chu romm
        this.roomOwnerID = 0    // uID cua chu room
        this.myChair = -1      // ghe cua minh` tren server
        this.roomLock = false   //
        this.roomJackpot = 0;
        this.roomIndex =  0;
        this.roomId= 0;
        // Game play data
        this.players = [];
        this.gameState = -1;             // trang thai cua 1 van choi (mac dinh la NONE)
        this.timeAutoStart =  0          // khi can` update autostart
        //this.cardFirstTurn=  null;        // card khi quyet dinh ng di dau`
        this.timeBaoSam = 0;
        this.typeToiTrang = 0;
        this.cardChiabai = [];
        this.cardDanhBai = [];
        this.firstTurnCards = [];
        // card cua minh` khi chia bai
        this.activeLocalChair = -1;
        this.changeTurnChair = -1;
        // chair cua nguoi` dang thuc hien 1 hanh dong (vi van dau theo luot)
        this.newRound = true;
        this.gameAction = -1;
        this.cards = [];
        this.activeTimeRemain = 0;

        for(var i=0;i< TienLen.MAX_PLAYER; i++){
            var player = new TienLen.Player();
            if(i ==0 )
                player.type = TienLen.Player.MY;
            this.players.push(player);
        }
    },

    initReconnect: function(pk){
        var i;
        userGameData.setItem("outRoom", "0");
        gameData.maxPlayer = pk.maxPlayer;

        if(gameData.maxPlayer == 2){
            GameManager.getInstance().currentGame = 4;
        }else{
            GameManager.getInstance().currentGame = 5;
        }

        this.gameState = TienLen.GameState.PLAYCONTINUE;
        this.bet = pk.roomBet;
        this.moneyType = pk.moneyType;
        this.roomOwner = pk.roomOwner;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;

        this.myChair = pk.myChair;
        this.cardChiabai = [];
        cc.log("cardChidBai size" + pk.cards.length);

        for(i = 0; i < pk.cards.length; i++){
            this.cardChiabai.push(pk.cards[i]);
            cc.log("carChiabai " + pk.cards[i]);
        }

        this.gameServerState = pk.gameServerState;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.activeTimeRemain;
        this.activeLocalChair = this.convertChair(pk.currentChair);
        this.changeTurnChair = this.activeLocalChair;

        this.baoSam = pk.baoSam;
        this.boLuot = pk.boLuot;
        this.toiTrang = pk.toiTrang;

        this.recentCards = [];
        for(i = 0; i < pk.recentCards.length; i++){
            this.recentCards.push(pk.recentCards[i]);
        }

        for(i=0; i < this.players.length;i++)
        {
            this.players[i].ingame = false;
        }

        for(i=0; i < gameData.maxPlayer;i++)
        {
            var chair = this.convertChair(i);
            if(pk.playerStatus[i] != 0){
                cc.log("playI: " + i + " " + chair );
                this.players[chair].ingame = true;
                this.players[chair].active = true;
                this.players[chair].info = pk.playerInfos[i];
                cc.log("pkPlayerInfos" + pk.playerInfos[i].nickName);
                this.players[chair].status = pk.playerStatus[i];
                this.players[chair].chairInServer = i;
                this.players[chair].chairLocal = chair;
            }
        }
    },

    initWith: function(pk){
        this.gameState = TienLen.GameState.JOINROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.roomOwner = pk.roomOwner;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.gameId = pk.gameId;

        //this.roomOwnerID = pk.roomOwnerID;
        //this.roomJackpot = pk.roomJackpot;

        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.activeTimeRemain;
        this.activeLocalChair = this.convertChair(pk.currentChair);
        this.changeTurnChair = this.activeLocalChair;
        this.cardSizes = [];

        for(i = 0; i < this.handCardSizeSize; i++){
            this.cardSizes.push(pk.handCardSize[i]);
        }

        //this.cards = pk.cards;

        for(var i=0; i < this.players.length;i++)
        {
            this.players[i].ingame = false;
        }

        for(var i=0;i< gameData.maxPlayer;i++)
        {
            var chair = this.convertChair(i);
            if(pk.playerStatus[i] != 0){
                this.players[chair].ingame = true;
                this.players[chair].active = true;
                this.players[chair].info = pk.playerInfos[i];
                this.players[chair].status = pk.playerStatus[i];
                this.players[chair].chairInServer = i;
                this.players[chair].chairLocal = chair;
                this.players[chair].remainCard = pk.handCardSize[i];
            }
        }
    },

    // Chuyen ghe tu server thanh ghe tren local (tren local myChair = 0
    convertChair: function(nChair)
    {
        var chair = (nChair - this.myChair + 4) %4;
        if(gameData.maxPlayer == 2){
            if(chair != 0){
                chair = 2;
            }
        }
        // chuyen thanh nguoc vong
        else if(chair != 0){
            chair = TienLen.MAX_PLAYER - chair;
        }
        return chair;
    },


    numberPlayer: function(){
        var num = 0;
        for(var i=0;i<TienLen.MAX_PLAYER;i++)
        {
            if(this.players[i].ingame && (this.players[i].status > 1)){
                num ++;
            }
        }
        return num;
    },

    userJoinRoom: function(pkg){
        this.gameState = TienLen.GameState.USERJOIN;
        var chairLocal = this.convertChair(pkg.uChair);
        {
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].ingame = true;
            this.players[chairLocal].active = true;
            this.players[chairLocal].info = pkg.info;
            this.players[chairLocal].status = pkg.uStatus;
            this.players[chairLocal].chairInServer = pkg.uChair;
            //cc.log("fuck " + this.players[chairLocal].status)
        }
    },

    updateOwnerRoom: function(pkg)
    {
        this.roomOwner = pkg.chair;
        this.gameState = TienLen.GameState.UPDATEOWNERROOM;
    },

    autoStart: function(pkg){
        this.gameState = TienLen.GameState.AUTOSTART;
        this.timeAutoStart = pkg.autoStartTime;
    },

    firstTurn: function(pk){
        this.gameState = TienLen.GameState.FIRSTTURN;
        this.firstTurnCards = [0, 0, 0, 0, 0];
        if(pk.isRandom)
        {
            for(var i =0; i < pk.cards.length && i < gameData.maxPlayer; i++){
                this.firstTurnCards[this.convertChair(i)]= pk.cards[i];
            }
        }

        for(var i = 0; i < TienLen.MAX_PLAYER; i++){
            cc.log("this.firstTurn: " + i  + " " + this.firstTurnCards[i]);
        }
    },


    chiabai: function(pk){
        this.gameState = TienLen.GameState.CHIABAI;
        this.cardChiabai = pk.cards;
        this.timeBaoSam = pk.timeBaoSam;
        this.gameId = pk.gameId;
    },

    danhbai: function(pk){
        this.gameState = TienLen.GameState.DANHBAI;
        this.cardDanhBai = pk.cards;
        var chairLocal = this.convertChair(pk.chair);
        if((chairLocal >=0) && (chairLocal <= 4))
        {
            this.activeLocalChair = chairLocal;
        }
    },

    boluot: function(pk){
        this.gameState = TienLen.GameState.BOLUOT;
    },

    notifyOutRoom: function(pk){
        this.gameState = TienLen.GameState.NOTIFYOUTROOM;
    },

    changeturn: function(pk){
        this.gameState = TienLen.GameState.CHANGETURN;
        this.newRound = pk.newRound;
        var chairLocal = this.convertChair(pk.chair);
        this.chairLastTurn = this.convertChair(pk.chairLastTurn);
        cc.log("chairLastTurn: " + this.chairLastTurn);
        this.activeLocalChair = chairLocal;
        this.changeTurnChair = chairLocal;
    },

    waitBonDoiThong: function(pk){
        this.gameState = TienLen.GameState.WAITBONDOITHONG;
        cc.log("server.chair: " + pk.chair);
        this.chairLastTurn = this.convertChair(pk.chair);
        cc.log("chairLastTurn: " + this.chairLastTurn);
    },

    quitRoom: function() {
        this.gameState = TienLen.GameState.QUIT;
    },

    chatchong: function(pk) {
        this.gameState = TienLen.GameState.CHATCHONG;
        var winChair = this.convertChair(pk.winChair);
        var lostChair = this.convertChair(pk.lostChair);
        if(winChair == 0){
            lobby.updateMoney(pk.winMoney, this.moneyType);
        }
        else if(lostChair == 0){
            lobby.updateMoney(pk.lostMoney, this.moneyType);
        }

        this.players[winChair].info.money = pk.winCurrentMoney;
        this.players[lostChair].info.money = pk.lostCurrentMoney;

    },
    baosam: function(pk){
        this.gameState = TienLen.GameState.BAOSAM;
    },
    huybaosam: function(pk){
        this.gameState = TienLen.GameState.HUYBAOSAM;
    },
    quyetdinhsam: function(pk){
        this.gameState = TienLen.GameState.QUYETDINHSAM;
    },
    
    jackpot: function(pk) {
        this.gameState = TienLen.GameState.JACKPOT;
    },
    
    userLeave: function(pkg){
        var chairLocal = this.convertChair(pkg.chair);
        if((chairLocal >=0) && (chairLocal <= 3) && (pkg.nickName == this.players[chairLocal].info.nickName)){
            this.players[chairLocal].ingame = false;
            this.activeLocalChair = chairLocal;
        }
        this.gameState = TienLen.GameState.USERLEAVE;
    },
    
    endGame: function(pk) {
        this.gameState = TienLen.GameState.ENDGAME;
        this.roomJackpot = pk.roomJackpot;

        for(i = 0; i< pk.currentMoney.length && i < gameData.maxPlayer; i++){
            if(this.players[this.convertChair(i)].info){
                this.players[this.convertChair(i)].info.money = pk.currentMoney[i];
                if(this.convertChair(i) == 0){
                    lobby.updateMoney(pk.currentMoney[i], this.moneyType);
                }
            }
        }
        cc.log("endGame");
    },

    updateMath: function(pk){
        this.gameState = TienLen.GameState.UPDATEMATH;
        this.myChair = pk.myChair;
        this.roomOwner = pk.ownerChair;

        for(var i=0; i<pk.hasInfo.length && i < gameData.maxPlayer; i++){
            if(pk.hasInfo[i])
            {
                var local = this.convertChair(i);
                if(this.players[local].ingame)
                {
                    this.players[local].info["money"] = pk.infos[i]["money"];
                    this.players[local].active = true;
                    this.players[local].status = pk.infos[i]["status"];
                }
            }
        }


    }

})


TienLen.GameState = function(){};

TienLen.GameState.NONE = -1;
TienLen.GameState.AUTOSTART = 0;
TienLen.GameState.JOINROOM = 4;
TienLen.GameState.FIRSTTURN = 1;
TienLen.GameState.CHIABAI = 2;
TienLen.GameState.CHANGETURN = 3;
TienLen.GameState.USERJOIN = 5;
TienLen.GameState.DANHBAI = 6;
TienLen.GameState.BOLUOT = 7;
TienLen.GameState.QUIT = 8;
TienLen.GameState.USERLEAVE = 12;
TienLen.GameState.ENDGAME = 13;
TienLen.GameState.UPDATEMATH = 14;
TienLen.GameState.UPDATEOWNERROOM = 15;
TienLen.GameState.PLAYCONTINUE = 16;
TienLen.GameState.CHATCHONG = 17;
TienLen.GameState.JACKPOT = 18;
TienLen.GameState.REASONQUIT = 19;
TienLen.GameState.NOTIFYOUTROOM =20;
TienLen.GameState.WAITBONDOITHONG = 21;