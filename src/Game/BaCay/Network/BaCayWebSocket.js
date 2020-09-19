//
BaCay.BaCayWebSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendVaoGa: function(){
        cc.log("send Vao Ga");
        var packet = BaCay.SendVaoGa();
        packet.putData();
        this.send(packet);
        packet.clean();
    }
})



