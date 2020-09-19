//
CARD_GAME.CmdSendTest = CmdSendCommon.extend({
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

CARD_GAME.CmdLogin = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.CMDLOGIN);
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


CARD_GAME.CmdJoinRoom = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDJOINROOM);
    },
    putData:function(type, maxPersonNum, bet, rule){
        //pack
        this.packHeader();
        this.putInt(type);
        this.putInt(maxPersonNum);
        this.putLong(bet);
        this.putInt(rule);
        cc.log("type: " + type + ", max: " + maxPersonNum + ", bet: " + bet + ", rule: " + rule);
        this.updateSize();
    }
});

CARD_GAME.CmdReconnectRoom = CmdSendCommon.extend({
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
})

CARD_GAME.CmdSendThongTinHuVang = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.THONG_TIN_HU_VANG);
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
})

CARD_GAME.CmdSendHoldRoom = CmdSendCommon.extend({
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
CARD_GAME.SendGetGameConfig = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.MONEYBETCONFIG);
        //this.putData();
    },
    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});
// get xoc dia config
CARD_GAME.SendGetXocDiaConfig = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.GET_XOCDIA_CONFIG);
        //this.putData();
    },
    putData: function(){
        this.packHeader();
        this.updateSize();
    }
});
// join room by id
CARD_GAME.SendJoinRoomById = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.JOIN_GAME_ROOM_BY_ID);
        //this.putData();
    },
    putData: function(roomid, password){
        this.packHeader();
        this.putInt(roomid);
        this.putString(password);
        this.updateSize();
    }
});
//Find room
CARD_GAME.SendFindRoom = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.FIND_ROOM_LOBBY);
        //this.putData();
    },
    putData: function(roomId){
        this.packHeader();
        this.putInt(roomId);
        this.updateSize();
    }
});
// get list room
CARD_GAME.SendGetListRoom = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.GETLISTROOM);
        //this.putData();
    },
    putData: function(moneyType, maxUserPerRoom, moneyBet, rule, from, to){
        this.packHeader();
        this.putInt(moneyType);
        this.putInt(maxUserPerRoom);
        this.putLong(moneyBet);
        this.putInt(rule);
        this.putInt(from);
        this.putInt(to);
        this.updateSize();
    }
});
// create room
CARD_GAME.SendCreateRoom = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.CREATEROOM);
        //this.putData();
    },
    // moneyType, maxUserPerRoom, moneyBet, rule, from, to
    putData: function(moneyType, maxUserPerRoom, moneyBet, rule, limitPlayer, password, roomName, quyban){
        this.packHeader();
        this.putInt(moneyType);
        this.putInt(maxUserPerRoom);
        this.putLong(moneyBet);
        this.putInt(rule);
        this.putInt(limitPlayer);
        this.putString(password);
        this.putString(roomName);
        this.putLong(quyban);
        this.updateSize();
    }
});
////
CARD_GAME.SendGetTopServer = CmdSendCommon.extend({
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

CARD_GAME.SendCardCheat = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(SAMCMD.CMDCHEATBAI);
    },

    putData:function(isCheat, cards, smallChair, cheatMoneyList){
        this.packHeader();
        this.putByte(isCheat);
        this.putByte(0);
        this.putShort(cards.length);
        if(isCheat){
            for(var i = 0; i < cards.length; i++){
                this.putByte(cards[i]);
            }
        }


        this.putShort(9);
        for(var i = 0; i < Poker.MAX_PLAYER; i++){
            this.putLong(cheatMoneyList[i]);
        }

        this.putByte(smallChair);

        this.updateSize();
        cc.log("isCheat: " + isCheat);
        for(var i = 0; i < 52 && i < cards.length; i++){
            cc.log("card:" + cards[i]);
        }

    }
});

CARD_GAME.SendChatRoom = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.CHAT_ROOM);
    },

    putData:function(isIcon, content){
        this.packHeader();
        this.putByte(isIcon?1:0);
        this.putString(encodeURI(content));
        this.updateSize();
    }
});

CARD_GAME.SendRequestInfoMoiChoi = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.REQUEST_INFO_MOI_CHOI);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

CARD_GAME.SendMoiChoi = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.MOI_CHOI);
    },

    putData:function(listName){
        this.packHeader();
        this.putShort(listName.length);
        cc.log(listName.length);
        for(var i = 0; i < listName.length; i++){
            this.putString(listName[i]);
            cc.log("listName: " + listName[i]);
        }

        this.updateSize();
    }
});

CARD_GAME.SendAcceptMoiChoi = CmdSendCommon.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(CARD_GAME_CMD.ACCEPT_MOI_CHOI);
    },

    putData:function(name){
        this.packHeader();
        cc.log("send name: " + name);
        this.putString(name);
        this.updateSize();
    }
});

CARD_GAME.CmdSendPing = CmdSendCommon.extend({
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

CARD_GAME.CmdSendPingTest = CmdSendCommon.extend({
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
});

CARD_GAME.CmdSendPingTest = CmdSendCommon.extend({
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
});






