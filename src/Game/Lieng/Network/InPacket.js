//
Lieng.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed myChair: " + this.myChair);
        this.moneyBet = this.getLong();
        cc.log("ReceiveJoinRoomSucceed moneyBet: " + this.moneyBet);
        this.roomOwner = this.getByte();
        cc.log("Receive RoomOwner: " + this.roomOwner);
        this.roomId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed roomId: " + this.roomId);
        this.gameId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed gameId: " + this.gameId);
        this.moneyType = this.getByte();
        cc.log("ReceiveJoinRoomSucceed moneyType: " + this.moneyType);
        this.rule   = this.getByte();
        cc.log("ReceiveJoinRoomSucceed rule: " + this.rule);

        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerStatus = [];
        for(var i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
            cc.log("ReceiveJoinRoomSucceed playerStatus: " + i + " " + this.playerStatus[i]);
        }

        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerInfos = [];

        for(var i =0; i < this.playerSize; i++){
            var player = {};
            player.avatar = this.getString();
            cc.log("ReceiveJoinRoomSucceed avatarUrl: " + i + " " + player.avatar);
            player.nickName = this.getString();
            cc.log("ReceiveJoinRoomSucceed nickName: " + i + " " + player.nickName);
            player.currentMoney = this.getLong();
            cc.log("ReceiveJoinRoomSucceed money: " + i + " " + player.currentMoney);
            this.playerInfos.push(player);
        }
        this.gameAction = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.gameAction);
        this.handCardSizeSize = this.getShort();
        this.handCardSizeList = [];
        for(var i = 0; i < this.handCardSizeSize; i++){
            this.handCardSizeList.push(this.getByte());
        }

        this.currentActionChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed currentActionChair: " + i + " " + this.gameAction);
        this.countDownTime = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.countDownTime);

        this.minBuyInTiLe = this.getInt();
        this.maxBuyInTiLe = this.getInt();
    }
})


Lieng.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function() {
        this.chair = this.getByte();
        this.nickName = this.getString();
        cc.log("chair" + this.chair + "nickName" + this.nickName);
    }
})

Lieng.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this["nickName"] = this.getString();
        this["avatar"] = this.getString();
        this["currentMoney"]= this.getLong();
        this.chair = this.getByte();
        this.status = this.getByte();
    }
});

Lieng.ReceiveGameInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.maxUserPerRoom = this.getByte();
        cc.log("maxUserPerRoom: " + this.maxUserPerRoom);
        this.chair = this.getByte();
        cc.log("chair: " + this.chair);
        this.myCardSize = this.getShort();
        cc.log("maxCardSize: " + this.myCardSize);
        this.myCards = [];
        var  temp  = "";
        for(var i = 0; i < this.myCardSize; i++){
            this.myCards.push(this.getByte());
            temp = temp + " " + this.myCards[i];
        }
        cc.log("card: " + temp);
        temp = "";

        cc.log("publicCard: " + temp);

        this.dealerChair = this.getByte();
        cc.log("dealerChair: " + this.dealerChair);

        this.smallBlindChair = this.getByte();
        cc.log("smallDealerChair: " + this.smallBlindChair);

        this.bigBlindChair = this.getByte();
        cc.log("bigDealerChair: " + this.bigBlindChair);

        this.potAmount = this.getLong();

        this.maxBet = this.getLong();
        this.raiseStep = this.getLong();

        cc.log("potAmount: " + this.potAmount);
        this.roundId = this.getByte();
        cc.log("roundId: " + this.roundId);

        this.gameServerState = this.getByte();
        cc.log("gameServerState: " + this.gameServerState);
        this.gameAction = this.getByte();
        cc.log("gameAction: " + this.gameAction);
        this.countDownTime = this.getByte();
        this.currentActiveChair = this.getByte();
        cc.log("gameAction: " + this.currentActiveChair);
        this.moneyType = this.getByte();
        this.bet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

        this.hasInfoSize = this.getShort();
        this.hasInfoList = [];
        cc.log("hasInfoSize: " + this.hasInfoSize);
        temp = "";
        for(var i = 0; i < this.hasInfoSize; i++){
            this.hasInfoList.push(this.getByte());
            temp = temp + " " + this.hasInfoList[i];
        }

        this.playerInfoList = [];
        for(var i = 0; i < Poker.MAX_PLAYER; i++){
            if(this.hasInfoList[i]){
                var playerInfo = [];
                playerInfo.hasFold = this.getByte();
                playerInfo.hasAllIn = this.getByte();
                playerInfo.currentBet = this.getLong();
                playerInfo.currentMoney = this.getLong();
                playerInfo.status = this.getByte();
                playerInfo.avatarUrl = this.getString();
                playerInfo.nickName = this.getString();
            }
            else{
                var playerInfo = [];
                playerInfo.hasFold = 0;
                playerInfo.hasAllIn = 0;
                playerInfo.currentBet = 0;
                playerInfo.currentMoney = 0;
                playerInfo.status = 0;
                playerInfo.avatarUrl = "";
                playerInfo.nickName = "";
            }
            this.playerInfoList.push(playerInfo);
        }
    }
});

Lieng.ReceiveTakeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    } ,

    readData: function(){
        this.actionChair = this.getByte();
        this.action = this.getByte();
        this.lastRaise = this.getLong();
        this.currentBet = this.getLong();
        this.maxBet = this.getLong();
        this.currentMoney = this.getLong();
        this.raiseStep = this.getLong();
        this.raiseBlock = this.getByte();
        this.potMoney = this.getLong();
    }
});

Lieng.ReceiveSelectDealer = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    } ,

    readData: function(){
        this.dealerChair = this.getByte();
        this.smallBlindChair = this.getByte();
        this.bigBlindChair = this.getByte();

        this.hasInfoSize = this.getShort();

        this.hasInfoList = [];
        cc.log("this.hasInfoSize: " + this.hasInfoSize);

        for(var i = 0; i < this.hasInfoSize; i++){
            var kk = this.getByte()
            this.hasInfoList.push(kk);
            cc.log("i: " + i + " " + kk);
        }

        this.playerStatusList = [];
        for(var i = 0; i < Poker.MAX_PLAYER; i++){
            if(this.hasInfoList[i]){
                var kk = this.getByte();
                this.playerStatusList.push(kk);
                cc.log("i: " +  i + " " + kk);
            }
            else{
                this.playerStatusList.push(0);
            }
        }

        this.gameId = this.getInt();
        this.isCheat = this.getByte();
        this.currentMoneySize = this.getShort();
        this.currentMoneyList = [];
        for(var i = 0; i < this.currentMoneySize; i++){
            this.currentMoneyList.push(this.getLong());
        }
    }
});

Lieng.ReceiveRequestOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
});


Lieng.ReceiveBuyIn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.buyInMoney = this.getLong();
    }
});

Lieng.ReceiveChangeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.roundId = this.getByte();
        //cc.log("roundId: " + this.roundId);
        this.chair = this.getByte();
        //cc.log("chair: " + this.chair);
        this.betTime = this.getByte();
        //cc.log("betTime: " + this.betTime);
    }
});

Lieng.ReceiveDealCards = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.sizeCard = this.getShort();
        this.myCards = [];
        for(var i = 0;i < this.sizeCard; i++){
            this.myCards.push(this.getByte());
        }
        this.boBaiId = this.getByte();
        this.timeChiaBai = this.getByte();
        cc.log("Bo bai server tra: " + this.boBaiId);
    }
});


Lieng.ReceiveNewBetRound = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.roundId = this.getByte();
        //cc.log("roundId: " + this.roundId);
        this.sizeCard = this.getShort();
        cc.log("sizeCard: " + this.sizeCard);
        this.plusCards = [];
        for(var i = 0;i < this.sizeCard; i++){
            this.plusCards.push(this.getByte());
            cc.log("public card: "  + this.plusCards[i]);
        }
        this.cardName = this.getByte();
        this.potAmount = this.getLong();
    }
})

Lieng.ReceiveEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.potAmount = this.getLong();
        this.rankSize = this.getShort();
        this.rankList = [];
        for(var i = 0; i < this.rankSize; i++){
            this.rankList.push(this.getLong());
        }
        this.kqttSize  = this.getShort();
        this.kqttList = [];
        for(var i = 0; i < this.kqttSize; i++){
            this.kqttList.push(this.getLong());
        }

        this.booleanWinerSize = this.getShort();
        this.booleanWinerList = [];

        for(var i = 0; i < this.booleanWinerSize; i++){
            this.booleanWinerList.push(this.getByte());
        }

        this.moneyArraySize  = this.getShort();
        this.currentMoney = [];

        for(var i = 0; i < this.moneyArraySize; i++){
            this.currentMoney.push(this.getLong());
        }



        this.gameMoney = [];
        this.gameMoneySize = this.getShort();
        cc.log("this.gameMoenySize: " + this.gameMoneySize);

        var tempGameMoney = " ";

        for(var i =0; i < this.gameMoneySize; i++){
            this.gameMoney.push(this.getLong());
            tempGameMoney = tempGameMoney + " " + this.gameMoney[i];
        }

        this.hasInfoSize = this.getShort();
        this.hasInfoList = [];
        for(var i = 0; i < this.hasInfoSize; i++){
            this.hasInfoList.push(this.getByte());
        }

        this.privateCardList = [];
        this.cardNameList = [];

        for(var i = 0; i < Poker.MAX_PLAYER; i++){
            var cardName = 0;
            var cards = [];
            if(this.hasInfoList[i]){
                var cardSize = this.getShort();
                for(var j = 0; j < cardSize; j++){
                    cards.push(this.getByte());
                }

                cardName = this.getByte();
            }
            else{
                cardName = 0;
            }

            this.privateCardList.push(cards);
            cc.log(" server private card Size: " + i + " "  + cards.length);
            this.cardNameList.push(cardName);
        }



    }
});

Lieng.ReceiveUpdateMatch = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.hasInfoSize = this.getShort();
        this.hasInfoList = [];
        for(var i = 0; i < this.hasInfoSize; i++){
            this.hasInfoList.push(this.getByte());
        }

        this.currentMoneyList = [];
        this.statusList = [];
        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            if(this.hasInfoList[i]){
                this.currentMoneyList.push(this.getLong());
                this.statusList.push(this.getInt());
            }
            else{
                this.currentMoneyList.push(0);
                this.statusList.push(0);
            }
        }
    }
});

Lieng.ReceiveLatBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.cardSize = this.getShort();
        this.cards = [];

        for(var i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
        }
    }
});

Lieng.NotifyLBuyIn= CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});


Lieng.ReceiveShowCard = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
    }
});

Lieng.ReceiveStandUp = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.isUp = this.getByte();
    }
});



