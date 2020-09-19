
XiZach.XiZachSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
        cc.log("end ctor");
    },

    sendRequestLeaveRoom: function(){
        cc.log("sendRegisterExitRoom");
        var pk = new XiZach.CmdSendRequestLeaveRoom();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendBuyIn: function(money, isAuto){
        var buyInMoney = money;
        var cmd = new XiZach.CmdSendBuyIn();
        cmd.putData(buyInMoney, isAuto);
        this.send(cmd);
        cmd.clean();
    },

    sendShowCard: function(){
        cc.log("send Show Card");
        var pk = new XiZach.CmdSendShowCard();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendDanBai: function(cards){
        cc.log("send danBai");
        var pk = new XiZach.CmdSendDanBai();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendXetBaiAll: function(){
        cc.log("gameClient send Xet Bai All");
        var pk = new XiZach.CmdSendXetBaiAll();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendXetBaiOne: function(chair){
        cc.log("gameClient sendXetBai One: " +  chair);
        var pk = new XiZach.CmdSendXetBaiOne();
        pk.putData(chair);
        this.send(pk);
        pk.clean();
    }


});

