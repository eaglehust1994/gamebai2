/**
 * Created by vinplay on 2/7/17.
 */

CoTuong.Chariot = CoTuong.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoTuong.normalVector;
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
            if (!CoTuong.isInBoard(tx, ty))
                return res;
            if (CoTuong.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoTuong.Move(tx, ty));
            }
            if (!CoTuong.gameLogic.isBlank(tx, ty)) {
                return res;
            }
        }
    },

    getAttackPosInBoard: function(board) {
        var vector = CoTuong.normalVector;
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
            if (!CoTuong.isInBoard(tx, ty))
                return res;
            if (board[tx][ty].piece != null) {
                if (board[tx][ty].piece.owner != this.owner)
                    res.push(new CoTuong.Move(tx, ty));
                return res;
            }
        }
    }
});