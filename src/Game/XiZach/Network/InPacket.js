//
XiZach.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed myChair: " + this.myChair);
        this.chuongChair = this.getByte();
        cc.log("chuongChair: " + this.chuongChair);
        this.hasChuong = this.getByte();
        cc.log("ReceiveJointRoomSucceed hasChuong: " + this.hasChuong);
        this.moneyBet = this.getLong();
        cc.log("ReceiveJoinRoomSucceed moneyBet: " + this.moneyBet);
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

            player.nickName = this.getString();
            cc.log("ReceiveJoinRoomSucceed nickName: " + i + " " + player.nickName);
            player.avatar = this.getString();
            cc.log("ReceiveJoinRoomSucceed avatarUrl: " + i + " " + player.avatar);
            player.currentMoney = this.getLong();
            cc.log("ReceiveJoinRoomSucceed money: " + i + " " + player.currentMoney);
            this.playerInfos.push(player);
        }

        this.gameAction = this.getByte();
        this.countDownTime = this.getByte();
    }
})

XiZach.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
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

XiZach.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
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

XiZach.ReceiveGameInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();
        cc.log("chair: " + this.myChair);

        this.chuongChair = this.getByte();
        cc.log("chuong Chair " + this.chuongChair);

        this.gameServerState = this.getByte();
        cc.log("gamaState: " + this.gameServerState);

        this.isAutoStart = this.getByte();

        cc.log("isAutoStart: " + this.isAutoStart);

        this.gameAction = this.getByte();

        cc.log("gameAction: " + this.gameAction);

        this.countDownTime = this.getByte();

        cc.log("countDownTime: " + this.countDownTime);

        this.moneyType = this.getByte();
        cc.log("moneyType: " + this.moneyType);

        this.moneyBet = this.getLong();

        cc.log("moneyBet: " + this.moneyBet);

        this.gameId = this.getInt();
        cc.log("gameId: " + this.gameId);

        this.roomId = this.getInt();
        cc.log("roomId: " + this.roomId);

        var tempString = " ";
        this.playerStatusSize = this.getShort();
        cc.log("playerSize: " + this.playerStatusSize);
        this.playerStatusList = [];

        for(var i = 0; i < this.playerStatusSize; i++){
            this.playerStatusList.push(this.getInt());
            tempString = tempString + " " + this.playerStatusList[i];
        }

        cc.log("playerStatusList: " + tempString);

        this.playerInfoList = [];

        for(var i = 0; i < Poker.MAX_PLAYER; i++){
            if(this.playerStatusList[i] > 0){
                var playerInfo = [];
                playerInfo.status = this.getByte();
                playerInfo.currentMoney = this.getLong();
                playerInfo.avatarUrl = this.getString();
                playerInfo.nickName = this.getString();
            }
            else{
                var playerInfo = [];
                playerInfo.currentMoney = 0;
                playerInfo.status = 0;
                playerInfo.avatarUrl = "";
                playerInfo.nickName = "";
            }
            this.playerInfoList.push(playerInfo);
        }


        this.cardPlayerList = [];

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            var cardList = [];
            var cardStringkk = " ";
            cc.log(" playerStatusList: " + i + " " + this.playerStatusList[i]);
            if(this.playerStatusList[i] == XiZach.GameStatus.PLAYING){
                var cardSize = this.getShort();
                cc.log("cardSize: " + cardSize);

                for(var j = 0 ; j < cardSize; j++){
                    cardList.push(this.getByte());
                }

            }
            else{

            }

            this.cardPlayerList.push(cardList);
            if(cardList.length > 0){
                for(var k = 0; k < cardList.length; k++){
                    cardStringkk += " " + cardList[k];
                }
                cc.log("cardList: " + k + " " + cardStringkk);
            }

        }


        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(this.playerStatusList[i] == XiZach.GameStatus.PLAYING){
                this.playerInfoList[i].hasDanBai = this.getByte();
            }
            else{
                this.playerInfoList[i].hasDanBai = false;
            }
        }
    }
});

XiZach.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.autoStartTime = this.getByte();
        this.chuongChair = this.getByte();
        cc.log("chuongChairAuto: "  + this.chuongChair);
    }
});

XiZach.ReceiveChuyenGiaiDoan2 = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.countDownTime = this.getByte();
    }
});

XiZach.ReceiveChuyenGiaiDoan3 = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.countDownTime = this.getByte();
        this.sizeCard = this.getShort();
        this.chuongCards = [];
        for(var i = 0; i < this.sizeCard; i++){
            this.chuongCards.push(this.getByte());
        }
    }
})

XiZach.ReceiveRequestOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
});

XiZach.ReceiveDoiChuong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chuongChair = this.getByte();
    }
});


XiZach.ReceiveDealCards = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.playerStatusList = [];
        var size = this.getShort();
        cc.log("statusList: " + size);
        var tempString = "";

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.playerStatusList.push(this.getByte());
            tempString += " " + this.playerStatusList[i];
        }
        cc.log("status List server: " + tempString);

        this.sizeCard = this.getShort();
        this.myCards = [];
        for(var i = 0;i < this.sizeCard; i++){
            this.myCards.push(this.getByte());
        }

        this.gameId = this.getInt();
        this.chuongChair = this.getByte();

        this.timeChiaBai = this.getByte();
        cc.log("Bo bai server tra: " + this.boBaiId);
    }
});

XiZach.ReceiveRutCard = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.card = this.getByte();
        cc.log("receive rut card: " + this.chair + " " + this.card);
    }
});

XiZach.ReceiveDanBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
    }
})

XiZach.ReceiveKetQuaSoBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
    },

    readData: function(){
        this.chair1 = this.getByte();
        this.chair2 = this.getByte();
        this.chair1WinMoney = this.getLong();
        this.chair2WinMoney = this.getLong();
        this.chair1CurrentMoney = this.getLong();
        this.chair2CurrentMoney = this.getLong();

        this.hasCard1 = this.getByte();
        cc.log("so bai hasCard1: "  + this.hasCard1);
        this.hasCard2 = this.getByte();
        cc.log("so bai hasCard2: "  + this.hasCard2);

        this.card1Size = this.getShort();
        this.card1 = [];
        for(var i = 0; i < this.card1Size; i++){
            this.card1.push(this.getByte());
        }

        this.card2Size = this.getShort();
        this.card2 = [];
        for(var i = 0; i < this.card2Size; i++){
            this.card2.push(this.getByte());
        }

        this.isXiZach = this.getByte();
        cc.log("so Bai: " + this.isXiZach);
    }
});




XiZach.ReceiveEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        cc.log("readData end Game");

        this.playerStatusList = [];
        this.listCards = [];
        var size = this.getShort();
        var statusTemp = " ";

        for(var i = 0; i < size; i++){
            this.playerStatusList.push(this.getInt());
            statusTemp += " " + this.playerStatusList[i];
        }
        cc.log("StatusList: " + statusTemp);



        for(var i = 0; i < size; i++){
            if(this.playerStatusList[i] == XiZach.GameStatus.PLAYING){
                var cards = [];
                var cardSize = this.getShort();
                var cardString = " ";
                for(var k = 0; k < cardSize; k++){
                    cards.push(this.getByte());
                    cardString += " " + cards[k];
                }
                cc.log("CardString: " + cardString);
                this.listCards.push(cards);
            }
            else{
                var cards = [];
                this.listCards.push(cards);
            }
        }

        this.tongTienThangThua = this.getLong();


        this.winMoneyList = [];
        size = this.getShort();

        for(var i = 0; i < size; i++){
            this.winMoneyList.push(this.getLong());
            cc.log("Index: " +  this.winMoneyList[i] );
        }

        cc.log("tongTienThangThua: " + this.tongTienThangThua);
        this.currentMoneyList = [];

        size = this.getShort();
        cc.log("sizeCurrent: " + size);
        for(var i = 0; i < size; i++){
            this.currentMoneyList.push(this.getLong());
            cc.log("Index: " +  this.currentMoneyList[i] );
        }

        size = this.getShort();
        cc.log("sizeNeedShow: " + size);
        this.needShowWinLostMoney = [];
        for(var i = 0; i < size; i++){
            this.needShowWinLostMoney.push(this.getByte());
            cc.log("Index: "  + "i" + this.needShowWinLostMoney[i]);
        }

    }
});

XiZach.ReceiveKetQuaXiZach = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){

        var sizeNeedShow = this.getShort();
        cc.log(sizeNeedShow);
        var temp = "";
        this.needShowList = [];
        for(var i = 0; i < sizeNeedShow; i++){
            this.needShowList.push(this.getByte());
            temp += " " + this.needShowList[i];
        }
        cc.log(temp);

        var sizeNeedUpdateMoney = this.getShort();
        cc.log(sizeNeedUpdateMoney);
        this.needUpdateMoneyList = [];
        var temp = "";

        for(var i = 0; i < sizeNeedUpdateMoney; i++){
            this.needUpdateMoneyList.push(this.getByte());
            temp += " " + this.needUpdateMoneyList[i];
        }

        this.currentMoneyList = [];
        this.winMoneyList = [];

        this.listCards = [];

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(this.needShowList[i]){
                var cards = [];
                var sizeCard = this.getShort();
                for(var j = 0; j < sizeCard; j++){
                    cards.push(this.getByte());
                }
                this.listCards.push(cards)
            }
            else{
                this.listCards.push([]);
            }
        }


        var size = this.getShort();
        for(var i = 0; i< size; i++){
            this.winMoneyList.push(this.getLong());
        }

        size = this.getShort();
        for(var i = 0; i< size; i++){
            this.currentMoneyList.push(this.getLong());
        }
    }
});

XiZach.ReceiveUpdateMatch = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();

        var size = this.getShort();
        this.hasInfo = [];
        for(var i=0;i<size;i++){
            this.hasInfo.push(this.getBool());
        }

        this.infos = [];
        for(var i=0; i < size;i++){
            var info = {};
            if(this.hasInfo[i])
            {
                info["nickName"] = this.getString();
                info["avatar"] = this.getString();
                info["money"] = this.getLong();
                info["status"] = this.getInt();
            }
            else{
                info["nickName"] = "";
                info["avatar"] = "";
                info["money"] = 0;
                info["status"] = 0;
            }
            this.infos.push(info);
        }
    }
});

XiZach.ReceiveSoBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair1 = this.getByte();
        cc.log("chair1: " + this.chair1);
        this.chair2 = this.getByte();
        cc.log("chair2: " + this.chair2);

        this.winMoney1 = this.getLong();
        cc.log("winMoney1: " + this.winMoney1);
        this.winMoney2 = this.getLong();
        cc.log("winMoney2: " + this.winMoney2);
        this.currentMoney1 = this.getLong();
        cc.log("currentMoney1: " + this.currentMoney1);
        this.currentMoney2 = this.getLong();
        cc.log("currentMoney2: " + this.currentMoney2);

        this.hasCard1 = this.getByte();
        cc.log("hasCard1: " + this.hasCard1);

        this.card1 = [];
        this.hasCard2 = this.getByte();
        cc.log("hasCard2: " + this.hasCard2);
        this.card2 = [];

        if(this.hasCard1){
            var string1 = "";
            this.cardSize1 = this.getShort();
            for(var i = 0; i < this.cardSize1; i++){
                this.card1.push(this.getByte());
                string1 = string1 + " " +  this.card1[i];
            }
            cc.log("card1: " + string1);
        }

        if(this.hasCard2){
            var string2 = "";
            this.cardSize2 = this.getShort();
            for(var i = 0; i < this.cardSize2; i++){
                this.card2.push(this.getByte());
                string2 = string2 + " " + this.card2[i];
            }
            cc.log("card2: " + string2);
        }

    }
});

XiZach.ReceiveRutBaiTuDong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();

        this.cardSize = this.getShort();
        cc.log("rutBaiTuDong size: " + this.cardSize);
        this.cards = [];
        var temp = "";

        for(var i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
            temp += " " + this.cards[i];
        }
        cc.log("card rut tu dong: "  + temp);
    }
});



