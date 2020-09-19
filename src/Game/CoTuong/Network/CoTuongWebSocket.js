/**
 * Created by vinplay on 2/4/17.
 */

CoTuong.CoTuongSocket = CardGameWebSocket.extend({
    ctor: function() {
        this._super();
    },

    sendTakeTurn: function(x, y){
        var packet = new CoTuong.CmdSendTakeTurn();
        packet.putData(x, y);
        this.send(packet);
        packet.clean();
    },

    sendCauHoa: function(){
        var packet = new CoTuong.CmdCauHoa();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendCauHoaResponse: function(isAccepted){
        var packet = new CoTuong.CmdCauHoaResponse();
        packet.putData(isAccepted);
        this.send(packet);
        packet.clean();
    },

    sendXinThua: function(){
        var packet = new CoTuong.CmdXinThua();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendKhieuChien: function(nickName, moneyBet){
        var packet = new CoTuong.CmdKhieuChien();
        packet.putData(nickName, moneyBet);
        this.send(packet);
        packet.clean();
    },

    sendKhieuChienResponse: function(isAccept, nickName, moneyBet){
        var packet = new CoTuong.CmdKhieuChienResponse();
        packet.putData(isAccept, nickName, moneyBet);
        this.send(packet);
        packet.clean();
    }
});