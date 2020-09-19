
MauBinh.CmdSendLogin = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.LOGIN);
    },

    putData:function(nickName, sessionKey){
        //pack
        this.packHeader();
        this.putString(nickName);
        this.putString(sessionKey);
        //update
        this.updateSize();
    }
});

MauBinh.CmdReconnectRoom = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.RECONNECT);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
})


MauBinh.CmdSendPing = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.PING);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

MauBinh.CmdSendJoinGameRoom = CmdSendCommon.extend({
    ctor: function(pkg){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.JOIN_GAME_ROOM);
    },

    putData: function(moneyType, maxUserPerRoom, moneyBet, rule){
        this.packHeader();

        this.putInt(moneyType);
        this.putInt(maxUserPerRoom);
        this.putLong(moneyBet);
        this.putInt(rule);

        this.updateSize();
    }
});

MauBinh.CmdSendRequestLeaveRoom = CmdSendCommon.extend({
    ctor: function(pkg){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.REQUEST_LEAVE_ROOM);
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});

MauBinh.SendCheatBai = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.CHEAT_BAI);
    },

    putData:function(isCheat, cards){
        this.packHeader();
        this.putByte(isCheat?1:0);
        this.putShort(cards.length);
        if(isCheat){
            for(var i = 0; i < cards.length; i++){
                this.putByte(cards[i]);
            }
        }
        this.updateSize();
    }
})

MauBinh.CmdSendBinhSoChi = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.BINH_SO_CHI);
    },

    putData:function(chi1, chi2, chi3){
        this.packHeader();

        this.putShort(chi1.length);
        for (var i=0; i<chi1.length; i++)
            this.putByte(chi1[i]);

        this.putShort(chi2.length);
        for (var i=0; i<chi2.length; i++)
            this.putByte(chi2[i]);

        this.putShort(chi3.length);
        for (var i=0; i<chi3.length; i++)
            this.putByte(chi3[i]);

        this.updateSize();
    }
});

MauBinh.CmdSendBaoBinh = CmdSendCommon.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.BAO_BINH);
    },

    putData:function() {
        this.packHeader();
        this.updateSize();
    }
});

MauBinh.CmdSendAutoBinhSoChi = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.AUTO_BINH_SO_CHI);
    },

    putData:function(chi1, chi2, chi3){
        this.packHeader();

        this.putShort(chi1.length);
        for (var i=0; i<chi1.length; i++)
            this.putByte(chi1[i]);

        this.putShort(chi2.length);
        for (var i=0; i<chi2.length; i++)
            this.putByte(chi2[i]);

        this.putShort(chi3.length);
        for (var i=0; i<chi3.length; i++)
            this.putByte(chi3[i]);

        this.updateSize();
    }
});

MauBinh.CmdSendXepLai = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.XEP_LAI);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

MauBinh.CmdSendGetGameConfig = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.MONEY_BET_CONFIG);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
})

MauBinh.CmdSendGetTopServer = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(MauBinh.Cmd.TOP_SERVER);
    },

    putData: function(type){
        this.packHeader();
        this.putByte(type);
        this.updateSize();
    }
});



