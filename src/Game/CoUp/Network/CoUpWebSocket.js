/**
 * Created by vinplay on 2/4/17.
 */

CoUp.CoUpSocket = CardGameWebSocket.extend({
    ctor: function() {
        this._super();
    },

    sendTakeTurn: function(x, y){
        var packet = new CoUp.CmdSendTakeTurn();
        packet.putData(x, y);
        this.send(packet);
        packet.clean();
    },

    sendCauHoa: function(){
        var packet = new CoUp.CmdCauHoa();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendCauHoaResponse: function(isAccepted){
        var packet = new CoUp.CmdCauHoaResponse();
        packet.putData(isAccepted);
        this.send(packet);
        packet.clean();
    },

    sendXinThua: function(){
        var packet = new CoUp.CmdXinThua();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendKhieuChien: function(nickName, moneyBet){
        var packet = new CoUp.CmdKhieuChien();
        packet.putData(nickName, moneyBet);
        this.send(packet);
        packet.clean();
    },

    sendKhieuChienResponse: function(isAccept, nickName, moneyBet){
        var packet = new CoUp.CmdKhieuChienResponse();
        packet.putData(isAccept, nickName, moneyBet);
        this.send(packet);
        packet.clean();
    }
});