
Poker.CmdSendTakeTurn = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.TAKE_TURN);
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

Poker.CmdSendBuyIn = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.BUY_IN);
    },

    putData: function(buyInMoney, isAuto){
        this.packHeader();
        this.putLong(buyInMoney);
        this.putByte(isAuto);
        this.updateSize();
    }
});

Poker.CmdSendRequestLeaveGame = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.REQUEST_LEAVE_ROOM);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

Poker.CmdSendShowCard = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.REQUEST_SHOW_CARD);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});

Poker.CmdSendGetInfoTour = CmdSendCommon.extend({
    ctor: function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.REQUEST_INFO_TOUR);
    },

    putData: function(type){
        this.packHeader();
        this.putByte(type);
        this.updateSize();
    }
})

Poker.CmdSendDungDay = CmdSendCommon.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        this.setCmdId(Poker.Cmd.REQUEST_STAND_UP);
        this.putData();
    },

    putData:function(){
        this.packHeader();
        this.updateSize();
    }
});