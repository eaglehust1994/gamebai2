/**
 * Created by vinplay on 2/7/17.
 */

CoTuong.Horse = CoTuong.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoTuong.horseVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            var px = this.x + vector.px[i];
            var py = this.y + vector.py[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (CoTuong.gameLogic.isBlank(px, py) && CoTuong.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoTuong.horseVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            var px = this.x + vector.px[i];
            var py = this.y + vector.py[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (board[px][py].piece == null && board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    }
});