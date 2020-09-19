//
BaiCao.BaiCaoWebSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendVaoGa: function(){
        cc.log("send Vao Ga");
        var packet = BaiCao.SendVaoGa();
        packet.putData();
        this.send(packet);
        packet.clean();
    }
})



