/**
 * Created by vinplay on 2/4/17.
 */

CoCaro.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

CoCaro.ReceiveJoinRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        //this.getString();
    }
});

CoCaro.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i;
        // gia cua toi tren server
        this.myChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed myChair: " + this.myChair);
        this.moneyBet = this.getLong();
        cc.log("ReceiveJoinRoomSucceed moneyBet: " + this.moneyBet);
        this.roomOwner = this.getByte();
        cc.log("ReceiveJoinRoomSucceed roomOwner: " + this.roomOwner);
        this.roomId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed roomId: " + this.roomId);
        this.gameId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed gameId: " + this.gameId);
        this.moneyType = this.getByte();
        cc.log("ReceiveJoinRoomSucceed moneyType: " + this.moneyType);
        this.rule = this.getByte();
        cc.log("ReceiveJoinRoomSucceed rule: " + this.rule);
        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerStatus = [];
        for(i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
            cc.log("ReceiveJoinRoomSucceed playerStatus: " + i + " " + this.playerStatus[i]);
        }

        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerInfos = [];
        for(i = 0; i < this.playerSize; i++){
            var player = {};
            player.avatar = this.getString();
            cc.log("ReceiveJoinRoomSucceed avatarUrl: " + i + " " + player.avatar);
            player.nickName = this.getString();
            cc.log("ReceiveJoinRoomSucceed nickName: " + i + " " + player.nickName);
            player.money = this.getLong();
            cc.log("ReceiveJoinRoomSucceed money: " + i + " " + player.money);
            this.playerInfos.push(player);
        }
        this.gameAction = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.gameAction);
        this.currentChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed currentChair: " + i + " " + this.currentChair);
        this.countDownTime = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.countDownTime);
        this.gameState = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameState: " + i + " " + this.gameState);
    }
});

CoCaro.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.timeAutoStart = this.getByte();
    }
});

CoCaro.ReceivedStartGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.starter = this.getByte();
        this.playerInfo = [];
        var size = this.getShort();

        for (var i = 0; i < size; i++) {
            this.getBool();
        }

        for (var i = 0; i < size; i++) {
            var player = {};
            player.status = this.getByte();
            player.tickType = this.getByte();
            this.playerInfo.push(player);
            cc.log(player);
        }
    }
});

CoCaro.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
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

CoCaro.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
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
});

CoCaro.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
});

CoCaro.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

CoCaro.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
    }
});

CoCaro.CmdReceivedChangeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.currentPlayer = this.getByte();
        this.countDownTime = this.getByte();
    }
});

CoCaro.CmdReceivedTakeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chair = this.getByte();
        this.x = this.getByte();
        this.y = this.getByte();
        this.type = this.getByte();
    }
});

CoCaro.CmdReceivedEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.result = this.getByte();
        this.winner = this.getByte();
        this.moneyWin = this.getLong();
        this.moneyLose = this.getLong();
        this.countDown = this.getByte();
        this.currentMoney = [];
        this.moneyArraySize = this.getShort();
        for(var i = 0; i < this.moneyArraySize; i++){
            this.currentMoney.push(this.getLong());
        }
        var size = this.getShort();
        this.x = [];
        for (var i = 0; i < size; i++)
            this.x.push(this.getByte());
        this.y = [];
        size = this.getShort();
        for (var i = 0; i < size; i++)
            this.y.push(this.getByte());
    }
});

CoCaro.CmdReceivedUpdateMatch = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();
        var size = this.getShort();
        this.hasInfoAtChair = [];
        for (var i = 0; i < size; i++) {
            this.hasInfoAtChair.push(this.getBool());
        }
        this.playerStatus = [];
        for (var i = 0; i < size; i++) {
            if (this.hasInfoAtChair[i]) {
                this.playerStatus.push(this.getInt());
            }
        }
    }
});

CoCaro.CmdReceivedRoomInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.maxUserPerRoom = this.getByte();
        this.myChair = this.getByte();
        var size = this.getShort();
        this.map = new Array(size);
        for (var i = 0; i < size; i++) {
            var n = this.getShort();
            this.map[i] = new Array(n);
            var s = "";
            for (var j = 0; j < n; j++) {
                this.map[i][j] = this.getByte();
                s += this.map[i][j] + " ";
            }
            cc.log(s);
        }

        this.gameState = this.getByte();
        this.gameAction = this.getByte();
        this.countDownTime = this.getByte();
        this.currentChair = this.getByte();
        this.moneyType = this.getByte();
        this.moneyBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();
        this.lastX = this.getByte();
        this.lastY = this.getByte();

        this.hasInfoAtChair = [];
        size = this.getShort();
        for (var i = 0; i < size; i++) {
            this.hasInfoAtChair.push(this.getBool());
        }

        this.playerStatus = [];
        this.playerInfos = [];
        for (var i = 0; i < size; i++) {
            var player = {};
            var status = 0;
            if (this.hasInfoAtChair[i]) {
                status = this.getByte();
                player.avatar = this.getString();
                player.nickName = this.getString();
                player.money = this.getLong();
                player.tickType = this.getByte();
                cc.log("Tick Type " + player.tickType);
            }
            this.playerStatus.push(status);
            this.playerInfos.push(player);
        }
    }
});
