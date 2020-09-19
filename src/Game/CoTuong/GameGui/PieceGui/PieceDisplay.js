/**
 * Created by vinplay on 3/2/17.
 */

CoTuong.PieceDisplay = cc.Sprite.extend({
    ctor: function(data) {
        this._super(this.getResourcePath(data[0]));
        this.owner = data[0][0];
        this.name = data[0];
        this.setPiecePos(data[1], data[2]);
        this.reset();
    },

    setPieceData: function(pieceData) {
        this.piece = pieceData;
        this.setPiecePos(this.piece.x, this.piece.y);
    },

    moveToPos: function(x, y) {
        this.stopAllActions();
        if (this.logicPosition)
            this.setPosition(this.logicPosition);
        this.logicPosition = CoTuong.getPosInMap(x, y);
        this.runAction(cc.moveTo(0.1, this.logicPosition));
    },

    setPiecePos: function(x, y) {
        this.setPosition(CoTuong.getPosInMap(x, y));
    },

    removePiece: function() {
        this.stopAllActions();
        this.piece = null;
        this.setVisible(false);
    },

    getResourcePath: function(name) {
        cc.log(name);
        return "res/GameCo/CoTuong/piece/" + name[0] + name[1] + ".png";
    },

    reset: function() {
        this.removePiece();
        this.logicPosition = null;
    }
});