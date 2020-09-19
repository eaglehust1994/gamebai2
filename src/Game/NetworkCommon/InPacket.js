//
CARD_GAME.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
})

CARD_GAME.ReceiveJoinRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        //this.getString();
    }
});

CARD_GAME.ReceivedDisconnect = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        //this.reason = this.getByte();
    }
});

CARD_GAME.ReceivedPingPong2 = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.id = this.getLong();
    }
})

CARD_GAME.CmdReceiveSamConfig = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listSize = this.getShort();
        this.list = [];
        for( var i = 0; i < this.listSize; i++){
            var kk = {};
            kk.maxUserPerRoom = this.getInt();
            kk.moneyType = this.getByte();
            kk.moneyBet = this.getLong();
            kk.moneyRequire = this.getLong();
            kk.nPersion = this.getInt();
            this.list.push(kk);
        }
        this.rules = [];
        for (var i = 0; i < this.listSize; i++) {
            this.rules.push(this.getByte());
        }

    }
});
/// get list room
CARD_GAME.CmdReceiveListRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listSize = this.getShort();
        
        this.list = [];
        for( var i = 0; i < this.listSize; i++){
            var kk = {};
            kk.getId = this.getInt();
            kk.getUserCount = this.getByte();
            kk.limitPlayer = this.getByte();
            kk.maxUserPerRoom = this.getInt();
             kk.moneyType = this.getByte();
            kk.moneyBet = this.getInt();
            kk.requiredMoney = this.getInt();
            kk.rule = this.getByte();
            kk.nameRoom = this.getString();
            kk.key = this.getBool();
            kk.quyban = this.getLong();
            this.list.push(kk);
        }
    }
});
// get xocdia config
CARD_GAME.CmdReceiveXocDiaConfig = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.fundVipMinRegis =this.getDouble();
    }
});
// create room
CARD_GAME.CmdReceiveCreateRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
    }
});

CARD_GAME.CmdReceiveFindRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        if(this.error == 0) {
            this.list = [];
            var kk = {};
            kk.getId = this.getInt();
            kk.getUserCount = this.getByte();
            kk.limitPlayer = this.getByte();
            kk.maxUserPerRoom = this.getByte();
            kk.moneyType = this.getByte();
            kk.moneyBet = this.getInt();
            kk.requiredMoney = this.getInt();
            kk.rule = this.getByte();
            kk.nameRoom = this.getString();
            kk.key = this.getBool();
            kk.quyban = this.getLong();
            this.list.push(kk);
        }
    }
});

CARD_GAME.CmdReceiveTopServer = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();

    },

    readData: function(){
        this.rankType = this.getByte();
        this.topWeek_money = this.getString();
        this.topMonth_money = this.getString();
        this.topWeek_number = this.getString();
        this.topMonth_number = this.getString();
        this.topDay_money = this.getString();
        this.topDay_number = this.getString();
    }
});

CARD_GAME.CmdReceiveChatRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.isIcon = this.getBool();
        this.content = decodeURI(this.getString());
        this.nickname = this.getString();
    }
});

CARD_GAME.CmdReceiveNoHuVang = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.gameName = this.getString();
        this.moneyAdd = this.getLong();
        this.currentMoney = this.getLong();
        this.nickName = this.getString();
        this.noHu = this.getBool();
        var length = this.getShort();
        this.cards = [];
        for (var i=0; i<length; i++){
            this.cards.push(this.getByte());
        }
    }
});

CARD_GAME.CmdThongTinHuVang = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.gameName = this.getString();
        this.remainTime = this.getInt();
        this.gold = this.getLong();
    }
});

CARD_GAME.ReceiveInfoMoiChoi =  CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listName = [];
        this.listMoney = [];

        var size = this.getShort();
        cc.log(size);
        for(var i = 0; i < size; i++){
            this.listName.push(this.getString());
            cc.log(this.listName[i]);
        }

        size = this.getShort();
        cc.log(size);
        for(var i = 0; i < size; i++){
            this.listMoney.push(this.getLong());
            cc.log(this.listMoney[i]);
        }
    }
});

CARD_GAME.ReceiveLoiMoiChoi = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.roomId = this.getInt();
        this.maxUser = this.getByte();
        this.moneyBet  = this.getLong();
        cc.log("moneyBet: " + this.moneyBet);
        this.nameInviter = this.getString();
        cc.log("this.nameInviter: " + this.nameInviter);
        this.rule = this.getInt();
    }
});

CARD_GAME.CmdReceivePingTest = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.curLong = this.getLong();
        //cc.log("Phu test getLong");
        //var kk = 3 + this.curLong;
        //cc.log(kk);
        //cc.log(3 + this.curLong);
        //cc.log(this.curLong);
        //cc.log(this.curLong + this.curLong);

    }
})