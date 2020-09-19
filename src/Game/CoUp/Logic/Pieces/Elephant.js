/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Elephant = CoUp.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoUp.doubleCrossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var px = this.x + CoUp.crossVector.x[i];
            var py = this.y + CoUp.crossVector.y[i];
            if (CoUp.isInBoard(px, py) && CoUp.gameLogic.board[px][py].piece != null)
                continue;
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoUp.doubleCrossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var px = this.x + CoUp.crossVector.x[i];
            var py = this.y + CoUp.crossVector.y[i];
            if (CoUp.isInBoard(px, py) && board[px][py].piece != null)
                continue;
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    }
});