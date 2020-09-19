/**
 * Created by vinplay on 2/7/17.
 */

CoUp.Move = cc.Class.extend({
    ctor: function(x, y) {
        this.x = x;
        this.y = y;
    }
});

CoUp.Piece = cc.Class.extend({
    ctor: function() {
    },

    initData: function(name, x, y) {
        this.name = name;
        this.owner = name[0];
        this.x = x;
        this.y = y;
        this.state = CoUp.Piece.State.UP;
    }
});

CoUp.Piece.State = {
    UP: 0,
    LAT: 1
};