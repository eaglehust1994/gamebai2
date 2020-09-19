/**
 * Created by vinplay on 2/4/17.
 */

CoCaro.CoCaroSocket = CardGameWebSocket.extend({
    ctor: function() {
        this._super();
    },

    sendTakeTurn: function(x, y){
        var packet = new CoCaro.CmdSendTakeTurn();
        packet.putData(x, y);
        this.send(packet);
        packet.clean();
    }
});