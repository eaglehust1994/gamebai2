/**
 * Created by Admin on 10/21/2016.
 */

var TDK_SUBCRIBE = 4003;
var TDK_UNSUBCRIBE = 4004;
var TDK_CHANGE_ROOM = 4005;
var TDK_PLAY = 4001;
var TDK_UPDATE_RESULT = 4001;
var TDK_UPDATE_POT = 4002;
var TDK_AUTO = 4006;
var TDK_STOP_AUTO = 4006;
var TDK_FORCE_STOP_AUTO = 4008;
var TDK_DATE_X2 = 4009;
var TDK_BIG_WIN = 4010;
var TDK_FREE = 4011;
var TDK_FREE_DAI_LY = 4012;
var TDK_MINIMIZE = 4013;
//var TDK_TIME_X2 =

var TayDuKyCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var TayDuKyCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_UNSUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var TayDuKyCmdSendMinimize = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_MINIMIZE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var TayDuKyCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_CHANGE_ROOM);

        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var TayDuKyCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            //this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var TayDuKyCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var TayDuKyCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TDK_STOP_AUTO);

        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var TayDuKyResponseUpdateResult = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.ref = this.getLong();
            this.result = this.getByte();
            this.matrix = this.getString();
            this.linesWin = this.getString();
            this.haiSao = this.getString();
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
            this.freeSpin = this.getByte();
            this.isFree = this.getBool();
            this.itemsWild = this.getString();
            this.ratio = this.getByte();
        }

    }
);

var TayDuKyResponseUpdatePot = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){

            this.valueRoom1 = this.getLong();
            this.x2 = this.getByte();
        }

    }
);

var TayDuKyResponseDateX2 = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.dateX2 = this.getString();
            this.remain = this.getByte();
            this.current_money = this.getLong();
            this.freeSpin = this.getByte();
            this.lines = this.getString();
        }

    }
);

var TayDuKyResponseForceStopAuto = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
        }

    }
);

var TayDuKyResponseFree = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.prize = this.getInt();
            this.ratio = this.getByte();
        }

    }
);
var TayDuKyResponseFreeDaiLy = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remain = this.getByte();
        }

    }
);

var TayDuKyResponseBigWin = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.username = this.getString();
            this.type = this. getByte();
            this.betValue = this.getShort();
            this.totalPrizes = this.getLong();
            this.timestampt = this.getString();
        }

    }
);