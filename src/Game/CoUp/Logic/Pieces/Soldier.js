/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Soldier = CoUp.Piece.extend({
    ctor: function() {

    },

    getListMove: function() {
        var vector;
        if (CoUp.gameLogic.mePlaying) {
            if (CoUp.gameLogic.myChessColor == this.owner) {
                vector = CoUp.soldierVector;
            } else {
                vector = CoUp.soldierVectorEnemy;
            }
        } else {
            if (this.owner == "b")
                vector = CoUp.soldierVector;
            else
                vector = CoUp.soldierVectorEnemy;
        }
        var len = vector.x.length;
        if (!CoUp.gameLogic.isOverRiver(this.owner, this.x))
            len = 1;
        var res = [];
        for (var i = 0; i < len; i++) {
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
        var vector;
        if (CoUp.gameLogic.mePlaying) {
            if (CoUp.gameLogic.myChessColor == this.owner) {
                vector = CoUp.soldierVector;
            } else {
                vector = CoUp.soldierVectorEnemy;
            }
        } else {
            if (this.owner == "b")
                vector = CoUp.soldierVector;
            else
                vector = CoUp.soldierVectorEnemy;
        }
        var len = vector.x.length;
        if (!CoUp.gameLogic.isOverRiver(this.owner, this.x))
            len = 1;
        var res = [];
        for (var i = 0; i < len; i++) {
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