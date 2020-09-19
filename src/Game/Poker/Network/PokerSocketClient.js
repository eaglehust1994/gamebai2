
Poker.PokerSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendRequestLeaveRoom: function(){
        cc.log("sendRegisterExitRoom");
        var pk = new Poker.CmdSendRequestLeaveRoom();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendBuyIn: function(money, isAuto){
        var buyInMoney = money;
        var cmd = new Poker.CmdSendBuyIn();
        cmd.putData(buyInMoney, isAuto);

        cc.log("send Buy in: " + buyInMoney + " " + isAuto);
        this.send(cmd);
        cmd.clean();
    },

    sendShowCard: function(){
        cc.log("sendRegisterExitRoom");
        var pk = new Poker.CmdSendShowCard();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendStandUp: function(){
        cc.log("send Request standUp");
        var pk = new Poker.CmdSendDungDay();
        this.send(pk);
        pk.clean();
    },

    sendGetInfoTour: function(type){
        var pk = new Poker.CmdSendGetInfoTour();
        pk.putData(type);
        cc.log("send Request info tour" + info);
    }
});

