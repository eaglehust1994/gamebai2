/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Guard = CoUp.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoUp.crossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (this.state == CoUp.Piece.State.UP) {
                if (CoUp.isInPalace(tx, ty) && CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                    res.push(new CoUp.Move(tx, ty));
                }
            } else {
                if (CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                    res.push(new CoUp.Move(tx, ty));
                }
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoUp.crossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (this.state == CoUp.Piece.State.UP && !CoUp.isInPalace(tx, ty))
                continue;
            if (board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    }
});