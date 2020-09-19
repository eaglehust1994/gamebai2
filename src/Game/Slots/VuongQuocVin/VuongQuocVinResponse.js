/**
 * Created by Admin on 10/21/5016.
 */

var VQV_SUBCRIBE = 5003;
var VQV_UNSUBCRIBE = 5004;
var VQV_CHANGE_ROOM = 5005;
var VQV_PLAY = 5001;
var VQV_UPDATE_RESULT = 5001;
var VQV_UPDATE_POT = 5002;
var VQV_AUTO = 5006;
var VQV_STOP_AUTO = 5006;
var VQV_FORCE_STOP_AUTO = 5008;
var VQV_DATE_X2 = 5009;
var VQV_BIG_WIN = 5010;
var VQV_FREE = 5011;
var VQV_FREE_DAI_LY = 5012;
var VQV_MINIMIZE = 5013;
//var VQV_TIME_X2 =

var VuongQuocVinCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var VuongQuocVinCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_UNSUBCRIBE);
        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var VuongQuocVinCmdSendMinimize = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_MINIMIZE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var VuongQuocVinCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_CHANGE_ROOM);
        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var VuongQuocVinCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            //this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var VuongQuocVinCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var VuongQuocVinCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(VQV_STOP_AUTO);

        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var VuongQuocVinResponseUpdateResult = CmdReceivedCommon.extend(
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
            this.isFreeSpin = this.getByte();
            this.ratio = this.getByte();
        }

    }
);

var VuongQuocVinResponseUpdatePot = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){

            this.valueRoom1 = this.getLong();
            this.valueRoom2 = this.getLong();
            this.valueRoom3 = this.getLong();
            this.x21 = this.getByte();
            this.x22 = this.getByte();
        }

    }
);

var VuongQuocVinResponseDateX2 = CmdReceivedCommon.extend(
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
            this.current_room = this.getByte();
        }

    }
);


var VuongQuocVinResponseForceStopAuto = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
        }

    }
);

var VuongQuocVinResponseFree = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remain = this.getByte();
            this.current_money = this.getLong();
        }

    }
);
var VuongQuocVinResponseFreeDaiLy = CmdReceivedCommon.extend(
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

var VuongQuocVinResponseBigWin = CmdReceivedCommon.extend(
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