
XiZach.CmdSendRutBai = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XiZach.Cmd.RUT_BAI);
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});


XiZach.CmdSendDanBai = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XiZach.Cmd.DAN_BAI);
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});


XiZach.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XiZach.Cmd.REQUEST_LEAVE_ROOM);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});


XiZach.CmdSendXetBaiOne = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XiZach.Cmd.XET_BAI_ONE);
    },

    putData: function(chair){
        this.packHeader();
        this.putByte(chair);
        this.updateSize();
    }
});


XiZach.CmdSendXetBaiAll = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(XiZach.Cmd.XET_BAI_ALL);
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
})
