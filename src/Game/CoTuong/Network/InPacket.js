/**
 * Created by vinplay on 2/4/17.
 */

CoTuong.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

CoTuong.ReceiveJoinRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        //this.getString();
    }
});

CoTuong.ReceiveCauHoaSuccess = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
    }
});

CoTuong.ReceiveCauHoaFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.result = this.getByte();
    }
});

CoTuong.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
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
            player.gameChair = this.getByte();
            cc.log("ReceiveJoinRoomSucceed gameChair: " + i + " " + player.gameChair);
            player.chair = this.getByte();
            cc.log("ReceiveJoinRoomSucceed chair: " + i + " " + player.chair);
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

CoTuong.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.timeAutoStart = this.getByte();
        cc.log("is auto start " + this.isAutoStart);
        cc.log("time auto start " + this.timeAutoStart);
    }
});

CoTuong.ReceivedSitting = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.action = this.getByte();
        this.gameChair = this.getByte();
        this.nickname = this.getString();
        this.currentMoney = this.getLong();
        cc.log("action: " + this.action);
        cc.log("chair " + this.gameChair);
        cc.log("nickname " + this.nickname);
        cc.log("money " + this.currentMoney);
    }
});

CoTuong.ReceivedStartGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.starter = this.getByte();
        this.playerInfo = [];
        var size = this.getShort();
        for (var i = 0; i < size; i++) {
            var test = this.getBool();
            cc.log(test);
        }

        for (var i = 0; i < 2; i++) {
            var player = {};
            player.gameChair = this.getByte();
            player.status = this.getByte();
            player.chessColor = this.getByte();
            player.turnTime = this.getInt();
            player.gameTime = this.getInt();
            this.playerInfo.push(player);
        }
    }
});

CoTuong.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
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

CoTuong.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.info = {};
        this.info.nickName = this.getString();
        this.info.avatar = this.getString();
        this.info.money = this.getLong();
        this.info.gameChair = this.getByte();
        this.info.chair = this.getByte();
        this.uStatus = this.getByte();
    }
});

CoTuong.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
});

CoTuong.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

CoTuong.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
    }
});

CoTuong.CmdReceivedChangeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.currentPlayer = this.getByte();
        this.turnTime = this.getInt();
        this.gameTime = this.getInt();
    }
});

CoTuong.CmdReceivedTakeTurn = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chair = this.getByte();
        this.getShort();
        this.sx = this.getByte();
        this.sy = this.getByte();
        this.getShort();
        this.dx = this.getByte();
        this.dy = this.getByte();
        this.key = this.getString();
        this.die = this.getString();
        this.result = this.getByte();
    }
});

CoTuong.CmdReceivedEndGame = CmdReceivedCommon.extend({
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
    }
});

CoTuong.CmdReceivedCauHoaResponse = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

CoTuong.CmdReceivedKhieuChien = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.nickName = this.getString();
        this.moneyBet = this.getInt();
    }
});

CoTuong.CmdReceivedKhieuChienResponse = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
});

CoTuong.CmdReceivedUpdateMatch = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.myChair = this.getByte();
        this.size = this.getShort();
        this.hasInfoAtChair = [];
        for (var i = 0; i < this.size; i++) {
            this.hasInfoAtChair.push(this.getBool());
        }
        this.playerStatus = [];
        for (var i = 0; i < this.size; i++) {
            cc.log("has info update: " + this.hasInfoAtChair[i]);
            if (this.hasInfoAtChair[i]) {
                this.playerStatus.push(this.getInt());
            } else {
                this.playerStatus.push(0);
            }
        }
        cc.log(this.playerStatus);
    }
});

CoTuong.CmdReceivedRoomInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.maxUserPerRoom = this.getByte();
        this.myChair = this.getByte();
        cc.log("my chair " + this.myChair);
        var mapLength = this.getShort();
        this.board = new Array(mapLength);
        for (var i = 0; i < mapLength; i++) {
            var s = this.getShort();
            this.board[i] = new Array(s);
            for (var j = 0; j < s; j++) {
                this.board[i][j] = this.getString();
            }
        }
        this.gameState = this.getByte();
        this.gameAction = this.getByte();
        this.countDownTime = this.getByte();
        this.currentChair = this.getByte();
        this.moneyType = this.getByte();
        this.moneyBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

        cc.log("currentChair " + this.currentChair);

        var size = this.getShort();
        this.hasInfoAtChair = [];
        for (var i = 0; i < size; i++) {
            this.hasInfoAtChair.push(this.getBool());
        }
        this.playerInfo = [];
        for (var i = 0; i < size; i++) {
            var player = {};
            cc.log("hasInfo at Chair " + i + " " + this.hasInfoAtChair[i]);
            if (this.hasInfoAtChair[i]) {
                player.status = this.getByte();
                player.info = {};
                player.info.avatar = this.getString();
                player.info.nickName = this.getString();
                player.info.money = this.getLong();
                player.info.gameChair = this.getByte();
                player.chessColor = this.getByte() == 114 ? "r" : "b";
                player.gameTime = this.getInt();
            } else {
                player.status = 0;
                player.info = {};
                player.info.avatar = 1;
                player.info.nickName = "";
                player.info.money = 0;
                player.info.gameChair = 255;
            }
            this.playerInfo.push(player);
        }
        this.getShort();
        this.lastX = this.getByte();
        this.lastY = this.getByte();
    }
});
