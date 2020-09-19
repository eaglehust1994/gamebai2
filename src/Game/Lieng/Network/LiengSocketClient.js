
Lieng.LiengSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendRequestLeaveRoom: function(){
        cc.log("sendRegisterExitRoom");
        var pk = new Lieng.CmdSendRequestLeaveRoom();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendBuyIn: function(money, isAuto){
        var buyInMoney = money;
        var cmd = new Lieng.CmdSendBuyIn();
        cmd.putData(buyInMoney, isAuto);
        this.send(cmd);
        cmd.clean();
    },

    sendShowCard: function(){
        cc.log("send Show Card");
        var pk = new Lieng.CmdSendShowCard();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendRequestLatBai: function(cards){
        cc.log("send Request latBai");
        cc.log("cards: " + cards[0] + " " + cards[1] + " " + cards[2]);
        var pk = new Lieng.CmdSendLatBai();
        pk.putData(cards);
        this.send(pk);
        pk.clean();
    },

    sendStandUp: function(){
        cc.log("send Request standUp");
        var pk = new Lieng.CmdSendDungDay();
        this.send(pk);
        pk.clean();
    },
});

