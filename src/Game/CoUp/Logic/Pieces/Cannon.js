/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Cannon = CoUp.Piece.extend({
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
        var isOverOnePiece = false;
        while (true) {
            tx += dx;
            ty += dy;
            if (!CoUp.isInBoard(tx, ty))
                return res;
            if (isOverOnePiece) {
                if (CoUp.gameLogic.isBlank(tx, ty)) {
                    continue;
                }
                if (CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                    res.push(new CoUp.Move(tx, ty));
                }
                return res;
            } else {
                if (CoUp.gameLogic.isBlank(tx, ty)) {
                    if (CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                        res.push(new CoUp.Move(tx, ty));
                    }
                } else {
                    isOverOnePiece = true;
                }
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
        var isOverOnePiece = false;
        while (true) {
            tx += dx;
            ty += dy;
            if (!CoUp.isInBoard(tx, ty))
                return res;
            if (isOverOnePiece) {
                if (board[tx][ty].piece != null) {
                    if (board[tx][ty].piece.owner != this.owner)
                        res.push(new CoUp.Move(tx, ty));
                    return res;
                }
            } else {
                if (board[tx][ty].piece != null) {
                    isOverOnePiece = true;
                }
            }
        }
    }
});