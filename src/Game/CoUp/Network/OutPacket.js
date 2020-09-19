/**
 * Created by vinplay on 2/4/17.
 */

CoUp.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.DANG_KY_THOAT_PHONG);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
});

CoUp.CmdSendTakeTurn = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.TAKE_TURN);
    },
    putData:function(sx, sy, dx, dy){
        this.packHeader();
        this.putShort(2);
        this.putByte(sx);
        this.putByte(sy);
        this.putShort(2);
        this.putByte(dx);
        this.putByte(dy);
        this.updateSize();
    }
});

CoUp.CmdSendRequestSitting = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.DANG_KY_CHOI);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

CoUp.CmdSendRequestStandUp = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.HUY_DANG_KY_CHOI);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});


CoUp.CmdCauHoa = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.CAU_HOA);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

CoUp.CmdCauHoaResponse = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.DONG_Y_HOA);
    },
    putData:function(isAccepted){
        this.packHeader();
        this.putByte(isAccepted);
        this.updateSize();
    }
});

CoUp.CmdXinThua = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.XIN_THUA);
    },
    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

CoUp.CmdKhieuChien = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.THACH_DAU);
    },
    putData:function(nickName, money){
        this.packHeader();
        this.putString(nickName);
        this.putInt(money);
        this.updateSize();
    }
});

CoUp.CmdKhieuChienResponse = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoUp.Cmd.DONG_Y_THACH_DAU);
    },
    putData:function(isAccept, nickName, money){
        this.packHeader();
        this.putByte(isAccept);
        this.putString(nickName);
        this.putInt(money);
        this.updateSize();
    }
});