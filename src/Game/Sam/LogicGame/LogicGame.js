Sam.kSortTangDan = 0;
Sam.kSortGroup = 1;
Sam.kSortUnkown = 2;

Sam.LogicGame = cc.Class.extend({
    ctor: function(){
        this.bet= 0
        this.myChair = -1
        this.roomId= 0;
        // Game play data
        this.players = [];
        this.gameState = -1;
        this.timeAutoStart =  0;

        this.timeBaoSam = 0;
        this.typeToiTrang = 0;
        this.cardChiabai = [];
        this.cardDanhBai = [];
        this.firstTurnCards = [];

        this.activeLocalChair = -1;
        this.newRound = true;
        this.gameAction = -1;
        this.cards = [];
        this.activeTimeRemain = 0;


        this.myCards = [];
        this.enemyCardNum = Sam.MAX_CARDS;

        for(var i=0;i<5;i++){
            var player = new Sam.Player();
            if(i ==0 )
                player.type = Sam.Player.MY;
            this.players.push(player);
        }

    },

    updateLogicGameInfo: function(pk){
        var i;
        userGameData.setItem("outRoom", "0");
        gameData.maxPlayer = pk.maxPlayer;
        if(gameData.maxPlayer == 2){
            GameManager.getInstance().currentGame = 0;
        }else{
            GameManager.getInstance().currentGame = 1;
        }

        this.gameState = Sam.GameState.PLAYCONTINUE;
        this.bet = pk.roomBet;
        this.moneyType = pk.moneyType;
        this.roomOwner = pk.roomOwner;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;

        this.myChair = pk.myChair;
        this.cardChiabai = [];
        this.myCards = [];

        cc.log("cardChidBai size" + pk.cards.length);

        for(i = 0; i < pk.cards.length; i++){
            this.cardChiabai.push(pk.cards[i]);
            this.myCards.push(pk.cards[i]);
            cc.log("carChiabai " + pk.cards[i]);
        }

        this.gameServerState = pk.gameServerState;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.activeTimeRemain;
        this.activeLocalChair = this.convertChair(pk.currentChair);

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

        // Hello  anh em.
        cc.log("pk.uChair: " + pk.uChair);

        pk.playerStatus[pk.uChair] = 2;

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

    updateLogicJoinRoom: function(pk){
        this.gameState = Sam.GameState.JOINROOM;
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
        var chair = (nChair - this.myChair + 5) %5;
        if(gameData.maxPlayer == 2){
            if(chair != 0){
                chair = 3;
            }
        }
        else if(chair != 0){
            chair = Sam.MAX_PLAYER - chair;
        }
        return chair;
    },


    numberPlayer: function(){
        var num = 0;
        for(var i=0;i<5;i++)
        {
            if(this.players[i].ingame && (this.players[i].status > 1)){
                num ++;
            }
        }
        return num;
    },

    updateLogicUserJoinRoom: function(pkg){
        this.gameState = Sam.GameState.USERJOIN;
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

    autoStartWithoutServer: function(){
        this.gameState = Sam.GameState.AUTOSTART;
        this.timeAutoStart = 10;
    },

    updateLogicAutoStart: function(pkg){
        this.gameState = Sam.GameState.AUTOSTART;
        this.timeAutoStart = pkg.autoStartTime;
    },

    updateLogicFirstTurn: function(pk){
        this.gameState = Sam.GameState.FIRSTTURN;
        this.firstTurnCards = [0, 0, 0, 0, 0];
        if(pk.isRandom)
        {
            for(var i =0; i < pk.cards.length && i < gameData.maxPlayer; i++){
                this.firstTurnCards[this.convertChair(i)]= pk.cards[i];
            }
        }

        for(var i = 0; i < 5; i++){
            cc.log("this.firstTurn: " + i  + " " + this.firstTurnCards[i]);
        }
    },


    updateLogicChiaBai: function(pk){
        this.gameState = Sam.GameState.CHIABAI;
        this.cardChiabai = pk.cards;
        this.myCards = [];

        for(var i = 0; i < pk.cards.length; i++){
            this.myCards.push(new Sam.Card(pk.cards[i]));
        }

        this.timeBaoSam = pk.timeBaoSam;
        this.gameId = pk.gameId;
    },

    updateLogicDanhBai: function(pk){
        this.gameState = Sam.GameState.DANHBAI;
        this.cardDanhBai = pk.cards;
        var chairLocal = this.convertChair(pk.chair);
        if((chairLocal >=0) && (chairLocal <= 4))
        {
            this.activeLocalChair = chairLocal;
        }


        // ghi nhan danh bai cho AI
        if(chairLocal != 0){
            this.enemyCardNum = pk.numberCard;
        }
        else {
            var check = [];
            for(var i=0;i< this.cardDanhBai.length;i++){
                for(var j=0; j< this.myCards.length; j++){
                    if(this.myCards[j].id == this.cardDanhBai[i])
                    {
                        check.push(j);
                        break;
                    }
                }
            }

            for(var i = check.length-1;i>= 0;i--){
                this.myCards.splice(check[i],1);
            }
        }
    },

    updateLogicBoLuot: function(pk){
        this.gameState = Sam.GameState.BOLUOT;
    },

    updateLogicNotifyOutRoom: function(pk){
        this.gameState = Sam.GameState.NOTIFYOUTROOM;
    },

    updateLogicChangeTurn: function(pk){
        this.gameState = Sam.GameState.CHANGETURN;
        this.newRound = pk.newRound;
        var chairLocal = this.convertChair(pk.chair);
        if((chairLocal >=0) && (chairLocal <= 4))
        {
            this.activeLocalChair = chairLocal;
        }
    },

    thinkCardDanh: function(pk){
        var res = [];
        res.push(this.myCards[0]);
        return res;
    },

    updateLogicChatChong: function(pk) {
        this.gameState = Sam.GameState.CHATCHONG;
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

    updateLogicBaoSam: function(pk){
        this.gameState = Sam.GameState.BAOSAM;
    },

    updateLogicHuyBaoSam: function(pk){
        this.gameState = Sam.GameState.HUYBAOSAM;
    },

    updateLogicQuyetDinhSam: function(pk){
        this.gameState = Sam.GameState.QUYETDINHSAM;
    },
    
    updateLogicUserLeave: function(pkg){
        var chairLocal = this.convertChair(pkg.chair);
        if((chairLocal >=0) && (chairLocal <= 4) && (pkg.nickName == this.players[chairLocal].info.nickName)){
            this.players[chairLocal].ingame = false;
            this.activeLocalChair = chairLocal;
        }
        this.gameState = Sam.GameState.USERLEAVE;
    },
    
    updateLogicEndGame: function(pk) {
        this.gameState = Sam.GameState.ENDGAME;
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

    updateLogicUpdateMatch: function(pk){
        this.gameState = Sam.GameState.UPDATEMATH;
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


Sam.GameState = function(){};

Sam.GameState.NONE = -1;
Sam.GameState.AUTOSTART = 0;
Sam.GameState.JOINROOM = 4;
Sam.GameState.FIRSTTURN = 1;
Sam.GameState.CHIABAI = 2;
Sam.GameState.CHANGETURN = 3;
Sam.GameState.USERJOIN = 5;
Sam.GameState.DANHBAI = 6;
Sam.GameState.BOLUOT = 7;
Sam.GameState.QUIT = 8;
Sam.GameState.BAOSAM = 9;
Sam.GameState.HUYBAOSAM = 10;
Sam.GameState.QUYETDINHSAM = 11;
Sam.GameState.USERLEAVE = 12;
Sam.GameState.ENDGAME = 13;
Sam.GameState.UPDATEMATH = 14;
Sam.GameState.UPDATEOWNERROOM = 15;
Sam.GameState.PLAYCONTINUE = 16;
Sam.GameState.CHATCHONG = 17;
Sam.GameState.JACKPOT = 18;
Sam.GameState.REASONQUIT = 19;
Sam.GameState.NOTIFYOUTROOM =20;