/**
 * Created by vinplay on 2/16/17.
 */

CoTuong.CoTuongTile = cc.Class.extend({
    ctor: function() {
        this.piece = null;
    },

    setPiece: function(piece) {
        this.piece = piece;
    },

    removePiece: function() {
        this.piece = null;
    }
});