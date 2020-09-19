/**
 * Created by vinplay on 2/4/17.
 */

XocDia.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.DANG_KY_THOAT_PHONG);
        this.putData();
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendOrderBanker = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.ORDER_BANKER);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendPutMoney = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.PUT_MONEY);
    },
    putData:function(potId, money){
        this.packHeader();
        this.putByte(potId);
        this.putLong(money);
        this.updateSize();
    }
});

XocDia.CmdSendPutMoneyX2 = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.PUT_MONEY_X2);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendPutAllIn = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.PUT_ALL_IN);
    },
    putData:function(potid){
        this.packHeader();
        this.putByte(potid);
        this.updateSize();
    }
});

XocDia.CmdSendBankerSellGate = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.BANKER_SELL_GATE);
    },
    putData:function(action, moneySell){
        this.packHeader();
        this.putByte(action);
        this.putLong(moneySell);
        this.updateSize();
    }
});

XocDia.CmdSendBuyGate = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.BUY_GATE);
    },
    putData:function(moneyBuy){
        this.packHeader();
        this.putLong(moneyBuy);
        this.updateSize();
    }
});

XocDia.CmdSendGetTime = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.GET_TIME);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendHuyLamCai = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.HUY_LAM_CAI);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendGetCau = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.SOI_CAU);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendCheat = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.SET_CHEAT);
    },
    putData:function(dince1, dince2, dince3, dince4){
        this.packHeader();
        this.putByte(dince1);
        this.putByte(dince2);
        this.putByte(dince3);
        this.putByte(dince4);
        this.updateSize();
    }
});

XocDia.CmdSendActionBanker = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.ACTION_BANKER);
    },
    putData:function(action){
        this.packHeader();
        this.putByte(action);
        this.updateSize();
    }
});

XocDia.CmdSendLockGate = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.LOCK_GATE);
    },
    putData:function(pot){
        this.packHeader();
        this.putByte(pot);
        this.updateSize();
    }
});

XocDia.CmdSendKickUserXocDia = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.KICK_OUT_XOCDIA);
    },
    putData:function(nickname){
        this.packHeader();
        this.putString(nickname);
        this.updateSize();
    }
});

XocDia.CmdSendDestroyRoom = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.DESTROY_ROOM);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

XocDia.CmdSendChotLai = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XocDia.XocDiaCmd.GET_MONEY_LAI);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});