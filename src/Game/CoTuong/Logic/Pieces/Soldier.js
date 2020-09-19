/**
 * Created by vinplay on 2/7/17.
 */

CoTuong.Soldier = CoTuong.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector;
        if (CoTuong.gameLogic.mePlaying) {
            if (CoTuong.gameLogic.myChessColor == this.owner) {
                vector = CoTuong.soldierVector;
            } else {
                vector = CoTuong.soldierVectorEnemy;
            }
        } else {
            if (this.owner == "b")
                vector = CoTuong.soldierVector;
            else
                vector = CoTuong.soldierVectorEnemy;
        }
        var len = vector.x.length;
        if (!CoTuong.gameLogic.isOverRiver(this.owner, this.x))
            len = 1;
        var res = [];
        for (var i = 0; i < len; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (CoTuong.gameLogic.canMovePiece(this.x, this.y, tx, ty)) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    },

    getAttackPosInBoard: function(board) {
        var vector;
        if (CoTuong.gameLogic.mePlaying) {
            if (CoTuong.gameLogic.myChessColor == this.owner) {
                vector = CoTuong.soldierVector;
            } else {
                vector = CoTuong.soldierVectorEnemy;
            }
        } else {
            if (this.owner == "b")
                vector = CoTuong.soldierVector;
            else
                vector = CoTuong.soldierVectorEnemy;
        }
        var len = vector.x.length;
        if (!CoTuong.gameLogic.isOverRiver(this.owner, this.x))
            len = 1;
        var res = [];
        for (var i = 0; i < len; i++) {
            var tx = this.x + vector.x[i];
            var ty = this.y + vector.y[i];
            if (!CoTuong.isInBoard(tx, ty))
                continue;
            if (board[tx][ty].piece != null && board[tx][ty].piece.owner != this.owner) {
                res.push(new CoTuong.Move(tx, ty));
            }
        }
        return res;
    }
});