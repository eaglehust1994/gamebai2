/**
 * Created by Admin on 7/9/2016.
 */

///Send


//123
var CmdSendTanLoc = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TX_TAN_LOC);

        },
        putTanLoc:function(money){
            this.packHeader();
            this.putLong(money);
            this.updateSize();
        }
    }
);

var CmdSendRutLoc = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(TX_RUT_LOC);

        },
        putRutLoc:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);




var CmdSendBetTaiXiu= CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(BET_TAI_XIU);

        },
        putBetTaiXiu:function(userId, referenceId,betValue,moneyType,betSide,inputTime){

            this.packHeader();
            this.putInt(userId);
            this.putLong(referenceId);
            this.putLong(betValue);
            this.putShort(moneyType);
            this.putShort(betSide);
            this.putShort(inputTime);
            this.updateSize();
        }
    }
);

var CmdSendLichSuTaiXiu= CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(LICH_SU_PHIEN_TAI_XIU);

        },
        putLichSuTaiXiu:function(){

            this.packHeader();
            this.updateSize();
        }
    }
);


var CmdUpdateMoney = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.currentMoney = this.getLong();
            this.moneyType = this.getShort();
        }

    }
);

var CmdPopMinigame = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            //this.currentMoney = this.getLong();
            //this.moneyType = this.getShort();
        }

    }
);



//Response

var CmdBetTaiXiu = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.result = this.getError();
            this.currentMoney = this.getLong();
            //this.getError();
        }

    }
);
//lich su phien

var CmdLichSuTaiXiu = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.data = this.getString();
        }

    }
);

var CmdTaiXiuInfo = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.gameId = this.getShort();
            this.moneyType = this.getShort();
            this.referenceId = this.getLong();
            this.remainTime =this.getShort();
            this.bettingState = this.getBool();
            this.potTai = this.getLong();
            this.potXiu = this.getLong();
            this.betTai = this.getLong();
            this.betXiu = this.getLong();
            this.dice1 = this.getShort();
            this.dice2 = this.getShort();
            this.dice3 = this.getShort();

            this.remainTimeRutLoc = this.getShort();
        }

    }
);//TaiXiuInfo

var CmdUpdateTaiXiu = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remainTime =this.getShort();
            this.bettingState = this.getBool();
            this.potTai = this.getLong();
            this.potXiu = this.getLong();
            this.numBetTai = this.getShort();
            this.numBetXiu = this.getShort();

        }
    }
);

//UPDATE_RESULT_DICES

var CmdUpdateResultDices = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.result = this.getShort();
            this.dice1 = this.getShort();
            this.dice2 = this.getShort();
            this.dice3 = this.getShort();
        }

    }
);
//UPDATE_PRIZE_TAI_XIU

var CmdUpdatePrizeTaiXiu = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){

            this.moneyType = this.getShort();
            this.totalMoney = this.getLong();
            this.currentMoney = this.getLong();

        }

    }
);
//START_NEW_GAME_TAI_XIU
var CmdStartNewGameTaiXiu = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.referenceId = this.getLong();
            this.remainTimeRutLoc = this.getShort();
        }

    }
);
//Rut Loc
var CmdTXRutLoc = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.prize = this.getInt();
            this.currentMoney = this.getLong();
        }

    }
);
//Tan Loc
var CmdTXTanLoc = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.result = this.getShort();
            this.currentMoney = this.getLong();
        }

    }
);

//Update quy loc
var CmdTXUpdateQuyLoc = CmdReceivedCommon.extend(
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

// start new rut loc

var CmdTXStartRutLoc = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remainTime = this.getInt();
        }

    }
);
var CmdTXUpdateSoLuotRutLoc = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.soLuotRut = this.getInt();
        }

    }
);
var CmdTXUpdateTimeTaiXiu = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.remainTime = this.getByte();
            this.bettingState = this.getBool();

        }

    }
);