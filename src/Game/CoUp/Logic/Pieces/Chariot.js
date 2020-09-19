/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Chariot = CoUp.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoUp.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            res = res.concat(this.dfsWithVector(vector.x[i], vector.y[i]));
        }
        return res;
    },

    dfsWithVector: function(dx, dy) {
        var tx = this.x;
        var ty = this.y;
        var res = [];
        while (true) {
            tx += dx;
            ty += dy;
            if (!CoUp.isInBoard(tx, ty))
                return res;
            if (CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoUp.Move(tx, ty));
            }
            if (!CoUp.gameLogic.isBlank(tx, ty)) {
                return res;
            }
        }
    },

    getAttackPosInBoard: function(board) {
        var vector = CoUp.normalVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            res = res.concat(this.dfsFindAttackPos(board, vector.x[i], vector.y[i]));
        }
        return res;
    },

    dfsFindAttackPos: function(board, dx, dy) {
        var tx = this.x;
        var ty = this.y;
        var res = [];
        while (true) {
            tx += dx;
            ty += dy;
            if (!CoUp.isInBoard(tx, ty))
                return res;
            if (board[tx][ty].piece != null) {
                if (board[tx][ty].piece.owner != this.owner)
                    res.push(new CoUp.Move(tx, ty));
                return res;
            }
        }
    }
});