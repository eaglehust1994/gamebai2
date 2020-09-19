/**
 * Created by Admin on 10/21/2016.
 */

var AVENGER_SUBCRIBE = 4003;
var AVENGER_UNSUBCRIBE = 4004;
var AVENGER_CHANGE_ROOM = 4005;
var AVENGER_PLAY = 4001;
var AVENGER_UPDATE_RESULT = 4001;
var AVENGER_UPDATE_POT = 4002;
var AVENGER_AUTO = 4006;
var AVENGER_STOP_AUTO = 4006;
var AVENGER_FORCE_STOP_AUTO = 4008;
var AVENGER_DATE_X2 = 4009;
var AVENGER_BIG_WIN = 4010;
var AVENGER_FREE = 4011;
var AVENGER_FREE_DAI_LY = 4012;
var AVENGER_MINIMIZE = 4013;
//var AVENGER_TIME_X2 =

var AvengerCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var AvengerCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_UNSUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var AvengerCmdSendMinimize = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_MINIMIZE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var AvengerCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_CHANGE_ROOM);

        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var AvengerCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            //this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var AvengerCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var AvengerCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(AVENGER_STOP_AUTO);

        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var AvengerResponseUpdateResult = CmdReceivedCommon.extend(
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

var AvengerResponseUpdatePot = CmdReceivedCommon.extend(
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

var AvengerResponseDateX2 = CmdReceivedCommon.extend(
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

var AvengerResponseForceStopAuto = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
        }

    }
);

var AvengerResponseFree = CmdReceivedCommon.extend(
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
var AvengerResponseFreeDaiLy = CmdReceivedCommon.extend(
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

var AvengerResponseBigWin = CmdReceivedCommon.extend(
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