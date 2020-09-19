/**
 * Created by vinplay on 2/7/17.
 */

CoTuong.Elephant = CoTuong.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector = CoTuong.doubleCrossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var px = this.x + CoTuong.crossVector.x[i];
            var py = this.y + CoTuong.crossVector.y[i];
            if (CoTuong.isInBoard(px, py) && CoTuong.gameLogic.board[px][py].piece != null)
                continue;
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (!CoTuong.gameLogic.isOverRiver(this.owner, tx) && CoTuong.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector = CoTuong.doubleCrossVector;
        var res = [];
        for (var i = 0; i < vector.x.length; i++) {
            var px = this.x + CoTuong.crossVector.x[i];
            var py = this.y + CoTuong.crossVector.y[i];
            if (CoTuong.isInBoard(px, py) && board[px][py].piece != null)
                continue;
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (!CoTuong.gameLogic.isOverRiver(this.owner, tx) && board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    }
});