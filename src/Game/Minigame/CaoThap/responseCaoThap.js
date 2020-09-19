var CmdStartCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(START_PLAY_CAO_THAP);
        },
        putStartCaoThap:function(betValue,moneyType){
            this.packHeader();
            this.putInt(betValue);
            this.putByte(moneyType);
            this.updateSize();
        }
    }
);

var CmdReceivedStartCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.error = this.getError();
            this.referenceId = this.getLong();
            this.card = this.getByte();
            this.money1 = this.getLong();
            this.money2 = this.getLong();
            this.money3 = this.getLong();
            this.currentMoney = this.getLong();
        }
    }
);

function SubscribeCaoThap(roomId)
{
    //cc.log("vao");
    var caoThapSend = new CmdSubscribeCaoThap();
    caoThapSend.putSubscribeCaoThap(roomId);
    Minigame.miniGameClient.send(caoThapSend);
    caoThapSend.clean();
}

var CmdPlayCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(PLAY_CAO_THAP);
        },
        putPlayCaoThap:function(betValue,moneyType,choose){
            this.packHeader();
            this.putInt(betValue);
            this.putByte(moneyType);
            this.putByte(choose);
            this.updateSize();
        }
    }
);

var CmdReceivedPlayCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.card = this.getByte();
            this.money1 = this.getLong();
            this.money2 = this.getLong();
            this.money3 = this.getLong();
        }
    }
);

var CmdSubscribeCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(SUBSCRIBE_CAO_THAP);
        },
        putSubscribeCaoThap:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var CmdReceivedSubscribeCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.status  = this.getByte();
            this.roomId = this.getByte();
        }
    }
);

var CmdReceivedUserInfoCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.numA  = this.getByte();
            this.card  = this.getByte();
            this.money1  = this.getLong();
            this.money2  = this.getLong();
            this.money3  = this.getLong();
            this.time  = this.getShort();
            this.step  = this.getByte();
            this.referenceId  = this.getLong();
            this.cards = this.getString();
        }
    }
);

var CmdUnSubscribeCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(UNSUBSCRIBE_CAO_THAP);
        },
        putUnSubscribeCaoThap:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var CmdUpdatePotPlayCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.value = this.getLong();
        }
    }
);

var CmdChangeRoomCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(CHANGE_ROOM_CAO_THAP);
        },
        putChangeRoomCaoThap:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var CmdReceivedChangeRoomCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.status  = this.getByte();
        }
    }
);

var CmdStopCaoThap = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(STOP_PLAY_CAO_THAP);
        },
        putStopCaoThap:function(betValue,moneyType){
            this.packHeader();
            this.putInt(betValue);
            this.putByte(moneyType);
            this.updateSize();
        }
    }
);

var CmdReceivedStopCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.result  = this.getByte();
            this.currentMoney = this.getLong();
            this.moneyExchange = this.getLong();
        }
    }
);

var CmdReceivedUpdateTimeCaoThap = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.time  = this.getShort();
        }
    }
);