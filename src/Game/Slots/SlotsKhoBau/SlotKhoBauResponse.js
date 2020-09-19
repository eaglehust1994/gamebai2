/**
 * Created by Admin on 10/21/2016.
 */

var KHOBAU_SUBCRIBE = 2003;
var KHOBAU_UNSUBCRIBE = 2004;
var KHOBAU_CHANGE_ROOM = 2005;
var KHOBAU_PLAY = 2001;
var KHOBAU_UPDATE_RESULT = 2001;
var KHOBAU_UPDATE_POT = 2002;
var KHOBAU_AUTO = 2006;
var KHOBAU_STOP_AUTO = 2006;
var KHOBAU_FORCE_STOP_AUTO = 2008;
var KHOBAU_DATE_X2 = 2009;
var KHOBAU_BIG_WIN = 2010;
var KHOBAU_FREE = 2011;
var KHOBAU_FREE_DAI_LY = 2012;
var KHOBAU_MINIMIZE = 2013;

var KhoBauCmdSendSubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_SUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);
var KhoBauCmdSendUnsubcribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_UNSUBCRIBE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var KhoBauCmdSendMinimize = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_MINIMIZE);

        },
        putCmd:function(roomId){
            this.packHeader();
            this.putByte(roomId);
            this.updateSize();
        }
    }
);

var KhoBauCmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_CHANGE_ROOM);

        },
        putCmd:function(roomLeavedId,roomJoinedId){
            this.packHeader();
            this.putByte(roomLeavedId);
            this.putByte(roomJoinedId);
            this.updateSize();
        }
    }
);

var KhoBauCmdSendPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_PLAY);

        },
        putCmd:function(betValue,lines){
            this.packHeader();
            this.putInt(betValue);
            this.putString(lines);
            this.updateSize();
        }
    }
);

var KhoBauCmdSendAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_AUTO);

        },
        putCmd:function(lines){
            this.packHeader();
            this.putByte(1);
            this.putString(lines);
            this.updateSize();
        }
    }
);
var KhoBauCmdSendStopAutoPlay = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(KHOBAU_STOP_AUTO);

        },
        putCmd:function(){
            this.packHeader();
            this.putByte(0);
            this.putString("");
            this.updateSize();
        }
    }
);

var KhoBauResponseUpdateResult = CmdReceivedCommon.extend(
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
        }

    }
);

var KhoBauResponseUpdatePot = CmdReceivedCommon.extend(
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


var KhoBauResponseForceStopAuto = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
        }

    }
);

var KhoBauResponseFree = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remain = this.getByte();
            this.current_money = this.getLong();
            this.ngayX2 = this.getString();
        }

    }
);
var KhoBauResponseFreeDaiLy = CmdReceivedCommon.extend(
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

var KhoBauResponseBigWin = CmdReceivedCommon.extend(
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