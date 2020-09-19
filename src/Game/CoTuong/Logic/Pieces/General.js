
CoTuong.General = CoTuong.Piece.extend({
    ctor: function() {
        this._super();
    },

    getListMove: function() {
        var vector = CoTuong.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (CoTuong.isInPalace(tx, ty) && CoTuong.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoTuong.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (CoTuong.isInPalace(tx, ty) && board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    }
});