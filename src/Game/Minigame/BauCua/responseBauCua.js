/**
 * Created by Admin on 9/7/2016.
 */

    ///Send Bầu Cua
var BCSendSubscribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(BC_SUBSCRIBE);

        },
        putSubScribe:function(room){
            this.packHeader();
            this.putByte(room);
            this.updateSize();
        }
    }
);

var BCSendUnscribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(BC_UNSUBSCRIBE);

        },
        putUnsubScribe:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var BCSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(BC_CHANGE_ROOM);

        },
        putChangeRoom:function(lastRoomId,newRoomId){
            this.packHeader();
            this.putByte(lastRoomId);
            this.putByte(newRoomId);
            this.updateSize();
        }
    }
);
var BCSendBet = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(BC_BET);

        },
        putBet:function(betValue){
            this.packHeader();
            this.putString(betValue);
            this.updateSize();
        }
    }
);

// Response Bầu cua

var BCResponseInfo = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.referenceId = this.getLong();
            this.remainTime = this.getByte();
            this.bettingState = this.getBool();
            this.potData = this.getString();
            this.betData = this.getString();
            this.lichSuPhien = this.getString();
            this.dice1 = this.getByte();
            this.dice2 = this.getByte();
            this.dice3 = this.getByte();
            this.xPot = this.getByte();
            this.xValue = this.getByte();
            this.room = this.getByte();
        }

    }
);

var BCResponseBet = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.result = this.getByte();
            this.currentMoney = this.getLong();
        }

    }
);

var BCResponseStartNewGame = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.referenceId = this.getLong();
        }

    }
);

var BCResponseUpdate = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.potData = this.getString();
            this.remainTime = this.getByte();
            this.bettingState = this.getByte();
        }

    }
);

var BCResponseResult = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.dice1 = this.getByte();
            this.dice2 = this.getByte();
            this.dice3 = this.getByte();
            this.xPot = this.getByte();
            this.xValue = this.getByte();
        }

    }
);

var BCResponsePrize = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
            this.room = this.getByte();
        }

    }
);