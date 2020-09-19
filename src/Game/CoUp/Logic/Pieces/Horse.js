/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Horse = CoUp.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoUp.horseVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            var px = this.x + vector.px[i];
            var py = this.y + vector.py[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (CoUp.gameLogic.isBlank(px, py) && CoUp.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoUp.horseVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            var px = this.x + vector.px[i];
            var py = this.y + vector.py[i];
            if (!CoUp.isInBoard(tx, ty))
                continue;
            if (board[px][py].piece == null && board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoUp.Move(tx, ty));
            }
        }
        return res;
    }
});