//
BaiCao.CmdSendTest = CmdSendCommon.extend({
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

BaiCao.CmdLogin = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDLOGIN);
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

BaiCao.CmdJoinRoom = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDJOINROOM);
    },
    putData:function(type, maxPersonNum, bet){
        //pack
        this.packHeader();
        this.putInt(type);
        this.putInt(maxPersonNum);
        this.putLong(bet);
        this.putInt(0);
        cc.log("type: " + type + " max: " + maxPersonNum + "bet :" + bet );
        this.updateSize();
    }
});

BaiCao.CmdReconnectRoom = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDRECONNECTGAMEROOM);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
})



BaiCao.SendVaoGa = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDVAOGA);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
        cc.log("send Vao ga");
    }
});

BaiCao.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDREQUESTLEAVEROOM);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

BaiCao.CmdSendHoldRoom = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDHOLD);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
})

BaiCao.SendGetGameConfig = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.MONEYBETCONFIG);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
    }
})

BaiCao.SendGetTopServer = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.TOPSERVER);
    },

    putData: function(type){
        this.packHeader();
        this.putByte(type);
        this.updateSize();
    }
});

BaiCao.SendCardCheat = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDCHEATBAI);
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
    }
});


BaiCao.CmdSendDatCuoc = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDDATCUOC);
    },

    putData: function(level){
        this.packHeader();
        this.putByte(level);
        this.updateSize();
        cc.log("send dat cuoc ");
    }
});

BaiCao.CmdSendDanhBien = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDYEUCAUDANHBIEN);
    },

    putData: function(chair, level){
        this.packHeader();
        this.putByte(chair);
        this.putByte(level);
        this.updateSize();
        cc.log("send Yeu cau Danh Bien");
    }
});

BaiCao.CmdSendKeCua = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDKECUA);
    },

    putData: function(chair, level){
        this.packHeader();
        this.putByte(chair);
        this.putByte(level);
        this.updateSize();
        cc.log("send Ke Cua" + chair + " " + level);
    }
});

BaiCao.CmdSendAcceptDanhBien = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDCHAPNHANDANHBIEN);
    },

    putData: function(chair){
        this.packHeader();
        this.putByte(chair);
        this.updateSize();
        cc.log("send acceptDanhBien");
    }
});

BaiCao.CmdSendMoBai = CmdSendCommon.extend({

    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDMOBAI);
        this.putData();
    },

    putData: function(){
        this.packHeader();
        this.updateSize();
        cc.log("send mo bai");
    }
});

BaiCao.CmdSendPing = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDPINGPONG);
    },

    putData:function(isCheat, cards){
        this.packHeader();
        this.updateSize();
    }
});

BaiCao.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(BACAYCMD.CMDREQUESTLEAVEROOM);
        this.putData();
    },
    putData:function(){
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})




