
Lieng.CmdSendTakeTurn = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.TAKE_TURN);
    },

    putData: function(fold, check, follow, allIn, riseBet){
        cc.log("put take turn: " + fold + " " + check + " " + follow + " " + allIn + " " + riseBet);
        this.packHeader();
        this.putByte(fold);
        this.putByte(check);
        this.putByte(allIn);
        this.putByte(follow);
        this.putByte(false);
        this.putLong(riseBet);
        this.updateSize();
    }
});

Lieng.CmdSendBuyIn = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.BUY_IN);
    },

    putData: function(buyInMoney, isAuto){
        this.packHeader();
        this.putLong(buyInMoney);
        this.putByte(isAuto);
        cc.log("isAuto Buyin: " + isAuto);
        this.updateSize();
    }
});

Lieng.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.REQUEST_LEAVE_ROOM);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

Lieng.CmdSendShowCard = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.REQUEST_SHOW_CARD);
        this.putData();
    },

    putData:function(){
        cc.log("put data send show card");
        this.packHeader();
        this.updateSize();
    }
});

Lieng.CmdSendLatBai = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.REQUEST_LAT_BAI);
    },

    putData:function(latBaiList){
        this.packHeader();
        this.putShort(latBaiList.length);
        for(var i = 0; i < latBaiList.length; i++){
            this.putByte(latBaiList[i]);
        }
        this.updateSize();
    }
});

Lieng.CmdSendDungDay = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Lieng.Cmd.REQUEST_STAND_UP);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

