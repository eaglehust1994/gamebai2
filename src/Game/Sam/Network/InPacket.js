

//
Sam.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
})

Sam.ReceiveJoinRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        //this.getString();
    }
});


Sam.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i;
        // gia cua toi tren server
        this.myChair = this.getByte();
        this.moneyBet = this.getLong();
        this.roomOwner = this.getByte();
        this.roomId = this.getInt();
        this.gameId = this.getInt();

        this.moneyType = this.getByte();
        this.playerSize = this.getShort();
        this.playerStatus = [];
        for(i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
        }

        this.playerSize = this.getShort();
        this.playerInfos = [];
        for(i =0; i < this.playerSize; i++){
            var player = {};
            player.avatar = this.getString();
            player.nickName = this.getString();
            player.money = this.getLong();
            this.playerInfos.push(player);
        }

        this.gameAction = this.getByte();
        this.handCardSizeSize = this.getShort();
        this.handCardSize = [];
        for(i = 0; i < this.handCardSizeSize; i++){
            this.handCardSize.push(this.getByte());
        }
        this.currentChair = this.getByte();
        this.countDownTime = this.getByte();
    }
});


Sam.ReceivedDisconnect = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        //this.reason = this.getByte();
    }
});


Sam.ReceivedUpdateGameInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i;
        this.maxPlayer = this.getByte();
        this.myChair = this.getByte();
        var cardSize = this.getShort();
        this.cards = [];
        for(i = 0; i < cardSize; i++){
            this.cards.push(this.getByte());
        }
        this.baoSam = this.getBool();
        this.boLuot = this.getBool();
        this.toiTrang = this.getInt();

//Thong tin hien tai:
        this.newRound = this.getBool();
        this.gameServerState = this.getByte();
        this.gameAction = this.getByte();
        this.activeTimeRemain = this.getByte();
        this.currentChair = this.getByte();
        var lastCardSize = this.getShort();
        this.recentCards = [];
        for(i = 0; i < lastCardSize; i++){
            this.recentCards.push(this.getByte());
        }

//Thong tin chung
        this.moneyType = this.getByte();
        this.roomBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

//Thong tin tung nguoi choi
        var hasInfoSize = this.getShort();
        this.playerStatus = [];
        this.hasInfoList = [];
        this.playerInfos = [];
        for(i = 0; i < hasInfoSize; i++){
            this.hasInfoList.push(this.getBool());
        }
        for(i = 0; i < Sam.MAX_PLAYER; i++){
            info = {};
            if(this.hasInfoList[i]){

                info["cards"] = this.getByte();
                info["baosam"] = this.getBool();
                info["huybaosam"] = this.getBool();
                this.playerStatus.push(this.getByte());
                info["avatar"] = this.getString();
                info["uID"] = this.getInt();
                info["nickName"] = this.getString();
                info["money"] = this.getLong();
            }
            else{
                this.playerStatus.push(0);
            }
            this.playerInfos.push(info);
        }
    }
});

Sam.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.autoStartTime = this.getByte();

    }
});

Sam.ReceivedChiaBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i = 0;
        this.cardSize = this.getShort();
        this.cards = [];
        for( i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
        }
        this.toiTrang = this.getByte();
        this.timeBaoSam = this.getByte();
        this.gameId = this.getInt();
    }
});

Sam.ReceivedDanhBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i = 0;
        this.chair = this.getByte();
        var size = this.getShort();
        this.cards = [];

        for(var i =0;i<size;i++)
        {
            this.cards.push(this.getByte());
        }

        this.numberCard = this.getByte();
    }
});


Sam.ReceivedBoluot = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
    }
})

Sam.ReceivedChangeTurn = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.newRound = this.getBool();
        this.chair = this.getByte();
        this.time = this.getByte();

    }
})

Sam.ReceivedBaoSam = CmdReceivedCommon.extend({
    ctor: function(pkg) {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chair = this.getByte();
    }

})

Sam.ReceivedHuyBao = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
    }
})

Sam.ReceivedQuyetDinhSam = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.isSam = this.getBool();
    }


})

Sam.ReceivedEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i = 0;
        this.winTypes = [];
        this.ketQuaTinhTienList = [];
        this.cards = [];
        this.sizeWinType = this.getShort();
        for(i = 0; i < this.sizeWinType; i++){
            this.winTypes.push(this.getByte());
        }

        this.kqTinhTienSize = this.getShort();
        for(i =0; i < this.kqTinhTienSize; i++){
            this.ketQuaTinhTienList.push(this.getLong());
        }

        var playerSize = this.getShort();
        this.currentMoney = [];
        for(i = 0; i < playerSize; i++){
            this.currentMoney.push(this.getLong());
        }

        for(i = 0; i < Sam.MAX_PLAYER; i++){
            var cardSize = this.getShort();
            var player = [];
            for( var j = 0; j < cardSize; j++){
                player.push(this.getByte());
            }
            this.cards.push(player);
        }

        this.countDown = this.getByte();


    }
})


Sam.ReceivedFirstTurnDecision = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.isRandom = this.getBool();
        this.chair = this.getByte();
        this.cardSize = this.getShort();
        this.cards= [];
        for(var i = 0; i < this.cardSize; i++){
            var kk = this.getByte();
            this.cards.push(kk);
            cc.log("cardFirstTurn: " + i + " " +  kk);
        }
    }
})

Sam.ReceivedChatChong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.winChair = this.getByte();
        this.lostChair = this.getByte();
        this.winMoney = this.getLong();
        this.lostMoney = this.getLong();
        this.winCurrentMoney = this.getLong();
        this.lostCurrentMoney = this.getLong();
    }
})


Sam.ReceivedPingPong2 = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.id = this.getLong();
    }
})

Sam.CMDUSERLEAVEROOM = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function() {
        this.chair = this.getByte();
        this.nickName = this.getString();
    }
})

Sam.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.info = {};
        this.info["nickName"] = this.getString();
        this.info["avatar"] = this.getString();
        this.info["money"]= this.getLong();
        this.uChair = this.getByte();
        this.uStatus = this.getByte();
    }
})

Sam.CmdReceivedUpdateMath = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
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
        for(var i=0;i<size;i++){
            var info = {};
            if(this.hasInfo[i])
            {
                info["money"] = this.getLong();
                info["status"] = this.getInt();
            }
            this.infos.push(info);
        }

    }
})

Sam.CmdReceiveSamConfig = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listSize = this.getShort();
        this.list = [];
        for( var i = 0; i < this.listSize; i++){
            var kk = {};
            kk.maxUserPerRoom = this.getByte();
            kk.moneyType = this.getByte();
            kk.moneyBet = this.getLong();
            kk.moneyRequire = this.getLong();
            kk.nPersion = this.getInt();
            this.list.push(kk);
        };
    }
});


Sam.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
})

Sam.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

Sam.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.test = this.getLong();
    }
})