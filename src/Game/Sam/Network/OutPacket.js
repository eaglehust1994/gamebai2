//
Sam.CmdSendTest = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(0);

    },
    putData:function(username, pass){
        //pack
        this.packHeader();
        this.putString(username);
        this.putInt(111);
        this.putLong(2147483647);
        this.putLong(325);
        this.putLong(8686);
        //update
        this.updateSize();
    }
});

Sam.CmdLogin = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDLOGIN);
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

Sam.CmdReconnectRoom = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDRECONNECTGAMEROOM);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

Sam.SendReadyAutoStart = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.READYAUTOSTART);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

Sam.CmdSendStartGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDSTARTGAME);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

Sam.CmdSendHuyBaoSam = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDHUYBAOSAM);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

Sam.CmdSendBaoSam = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDBAOSAM);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

Sam.CmdSendDanhBai = CmdSendCommon.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDDANHBAI);
    },

    putData:function(boLuot, cards){
        //pack
        var i;

        this.packHeader();
        this.putByte(boLuot);
        if(boLuot){

        }else{
            this.putShort(cards.length);
            for(i = 0; i < cards.length; i++){
                this.putByte(cards[i]);
            }
        }
        //update
        this.updateSize();
    }
});

Sam.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDREQUESTLEAVEROOM);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
});

Sam.CmdSendHoldRoom = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDHOLD);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});

Sam.SendGetGameConfig = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.MONEYBETCONFIG);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});

Sam.SendGetTopServer = CmdSendCommon.extend({
    ctor: function()
    {
       this._super();
       this.initData(100);
       this.setControllerId(1);
       this.setCmdId(SAMCMD.TOPSERVER);
    },

    putData: function(type){
        this.packHeader();
        this.putByte(type);
        this.updateSize();
    }
});

Sam.SendCardCheat = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDCHEATBAI);
    },

    putData:function(isCheat, cards){
        this.packHeader();
        this.putByte(isCheat);
        this.putByte(0);
        this.putShort(cards.length);
        if(isCheat){
            for(var i = 0; i < cards.length; i++){
                this.putByte(cards[i]);
            }
        }
        this.updateSize();
        cc.log("isCheat: " + isCheat);
        for(var i = 0; i < 52 && i < cards.length; i++){
            cc.log("card:" + cards[i]);
        }

    }
});

Sam.CmdSendPing = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(0);
        this.setCmdId(SAMCMD.CMDPINGPONG);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

Sam.CmdSendPingTest = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(1050);
    },

    putData:function(id){
        this.packHeader();
        this.putLong(id);
        this.updateSize();
    }
})



