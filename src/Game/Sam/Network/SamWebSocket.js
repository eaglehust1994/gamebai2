//
Sam.SamWebSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendBoLuot: function(){
        cc.log("Send bo luot");
        var packet  = new Sam.CmdSendDanhBai();
        packet.putData(true);
        this.send(packet);
        packet.clean();
    },

    sendDanhBai: function(cards){
        cc.log("Send danh bai");
        var packet = new Sam.CmdSendDanhBai();
        packet.putData(false, cards);
        this.send(packet);
        packet.clean();
    }
})






