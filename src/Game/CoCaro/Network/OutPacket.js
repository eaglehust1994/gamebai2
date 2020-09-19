/**
 * Created by vinplay on 2/4/17.
 */

CoCaro.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoCaro.CoCaroCmd.DANG_KY_THOAT_PHONG);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
});

CoCaro.CmdSendTakeTurn = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CoCaro.CoCaroCmd.TAKE_TURN);
    },
    putData:function(x, y){
        this.packHeader();
        this.putByte(x);
        this.putByte(y);
        this.updateSize();
    }
});