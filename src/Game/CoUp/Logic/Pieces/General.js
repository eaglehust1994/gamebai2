
CoUp.General = CoUp.Piece.extend({
    ctor: function() {
        this._super();
    },

    getListMove: function() {
        var vector = CoUp.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (CoUp.isInPalace(tx, ty) && CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoUp.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (CoUp.isInPalace(tx, ty) && board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    }
});