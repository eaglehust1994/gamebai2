MauBinh.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

MauBinh.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

MauBinh.CmdReceiveMauBinhConfig = CmdReceivedCommon.extend({
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


MauBinh.CmdReceiveJoinGameRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

MauBinh.CmdReceiveJoinRoomSuccess = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.uChair = this.getByte();
        this.moneyBet = this.getLong();
        this.roomId = this.getInt();
        this.gameId = this.getInt();
        this.moneyType = this.getByte();
        this.rule = this.getByte();
        var length = this.getShort();
        this.playerStatus = [];
        for (var i=0; i<length; i++){
            this.playerStatus.push(this.getByte());
        }
        length = this.getShort();
        this.playerList = [];
        for (var i=0; i<length; i++){
            var player = {
                nickName: this.getString(),
                avatar: this.getString(),
                currentMoney: this.getLong()
            }
            this.playerList.push(player);
        };
        this.gameState = this.getByte();
        this.gameAction = this.getByte();
        this.countdownTime = this.getByte();
    }
});

MauBinh.CmdReceiveNewUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.money = this.getLong();
        this.nickName = this.getString();
        this.avatar = this.getString();
        this.uChair = this.getByte();
        this.uStatus = this.getByte();
    }
});

MauBinh.CmdReceiveRequestLeaveRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
});

MauBinh.CmdReceiveLeaveRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chairIndex = this.getByte();
        this.nickName = this.getString();
    }
});


MauBinh.CmdReceiveChiaBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var length = this.getShort();
        this.cardList = [];
        for (var i=0; i<length; i++){
            this.cardList.push(this.getByte());
        }
        this.mauBinh = this.getByte();
        this.gameId = this.getInt();
        this.countdown = this.getByte();
    }
});

MauBinh.CmdReceiveNewUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.nickName = this.getString();
        this.avatar = this.getString();
        this.money = this.getLong();
        this.uChair = this.getByte();
        this.uStatus = this.getByte();
    }
});

MauBinh.CmdReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.isAutoStart = this.getBool();
        this.autoStartTime = this.getByte();
    }
});

MauBinh.CmdReceiveBinhSoChi = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chairIndex = this.getByte();
    }
});

MauBinh.CmdReceiveXepLai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chairIndex = this.getByte();
    }
});

MauBinh.CmdReceiveKetThuc = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.playerResultList = [];
        var length = this.getShort();
        for (var i=0; i<length; i++){
            cc.log("readData: i = " + i);
            var playerResultObject = {};
            playerResultObject.chairIndex = this.getByte();
            playerResultObject.maubinhType = this.getInt();

            cc.log("readData: read chi 1");
            var chiSize = this.getShort();
            cc.log("chisize = " + chiSize);
            playerResultObject.chi1 = [];
            for (var j=0; j<chiSize; j++)
                playerResultObject.chi1.push(this.getByte());
            //playerResultObject.chi1 = this.getBytes(chiSize);
            cc.log("playerResultObject.chi1: " + playerResultObject.chi1.toString());

            cc.log("readData: read chi 2");
            chiSize = this.getShort();
            cc.log("chisize = " + chiSize);
            playerResultObject.chi2 = [];
            for (var j=0; j<chiSize; j++)
                playerResultObject.chi2.push(this.getByte());

            cc.log("readData: read chi 3");
            chiSize = this.getShort();
            playerResultObject.chi3 = [];
            for (var j=0; j<chiSize; j++)
                playerResultObject.chi3.push(this.getByte());

            cc.log("readData: read money in chi");
            playerResultObject.moneyInChi = [];
            var size = this.getShort();
            cc.log("size = " + size);
            for (var j=0; j<size; j++){
                playerResultObject.moneyInChi.push(this.getLong());
                cc.log("readData moneyInchi = " +  playerResultObject.moneyInChi[playerResultObject.moneyInChi.length-1]);
            }

            playerResultObject.moneyAt = this.getLong();

            cc.log("playerResultObject.moneyCommon");
            playerResultObject.moneyCommon = this.getLong();
            cc.log("playerResultObject.moneySap");
            playerResultObject.moneySap = this.getLong();
            playerResultObject.currentMoney = this.getLong();

            this.playerResultList.push(playerResultObject);
        }
        cc.log("readData: finish loop");
        this.countdownTime = this.getByte();
    }
});

MauBinh.CmdReceiveUpdateMatch= CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.uChair = this.getByte();
        var size = this.getShort();
        this.hasInfoAtChair = [];
        for (var i=0; i<size; i++){
            this.hasInfoAtChair[i] = this.getBool();
        }
        this.playerList = [];
        for (var i=0; i<size; i++){
            if (this.hasInfoAtChair[i]){
                var player = {
                    nickName: this.getString(),
                    avatar: this.getString(),
                    currentMoney: this.getLong(),
                    status: this.getInt()
                }
                this.playerList[i] = player;
            }
        };
    }
});

MauBinh.CmdReceiveGameInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.uChair = this.getByte();

        this.gameState = this.getByte();
        this.gameAction = this.getByte();
        this.countdownTime = this.getByte();

        this.moneyBet = this.getLong();
        this.moneyType = this.getByte();
        this.gameId = this.getInt();
        this.roomId = this.getInt();
        this.rule = this.getByte();

        var size = this.getShort();
        this.hasInfoAtChair = [];
        for (var i=0; i<size; i++){
            this.hasInfoAtChair[i] = this.getBool();
        }

        this.playerList = [];
        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            if (this.hasInfoAtChair[i]){
                this.playerList[i] = {};
                if (this.gameState == MauBinh.GameState.PLAYING){
                    if (i == this.uChair){
                        size = this.getShort();
                        cc.log("size = " + size);
                        this.playerList[i].cardList = [];
                        for (var j=0; j<size; j++){
                            this.playerList[i].cardList.push(this.getByte());
                            cc.log(this.playerList[i].cardList[this.playerList[i].cardList.length-1]);
                        }
                    }
                }
                else if (this.gameState == MauBinh.GameState.GAME_END){
                    size = this.getShort();
                    this.playerList[i].cardList = [];
                    for (var j=0; j<size; j++){
                        this.playerList[i].cardList.push(this.getByte());
                    }
                    this.playerList[i].maubinhType = this.getByte();
                    this.playerList[i].moneyCommon = this.getLong();
                }
                this.playerList[i].sochi = this.getBool();
                this.playerList[i].status = this.getByte();
                this.playerList[i].avatar = this.getString();
                this.playerList[i].userId = this.getInt();
                this.playerList[i].nickName = this.getString();
                this.playerList[i].currentMoney = this.getLong();
            }
        }
    }
});








