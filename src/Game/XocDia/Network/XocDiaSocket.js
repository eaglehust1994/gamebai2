/**
 * Created by vinplay on 2/4/17.
 */

XocDia.XocDiaSocket = CardGameWebSocket.extend({
    ctor: function() {
        this._super();
    },

    sendTakeTurn: function(x, y){
        var packet = new XocDia.CmdSendTakeTurn();
        packet.putData(x, y);
        this.send(packet);
        packet.clean();
    }
});