/**
 * Created by vinplay on 2/7/17.
 */

CoTuong.Move = cc.Class.extend({
    ctor: function(x, y) {
        this.x = x;
        this.y = y;
    }
});

CoTuong.Piece = cc.Class.extend({
    ctor: function() {
    },

    initData: function(name, x, y) {
        this.name = name;
        this.owner = name[0];
        this.x = x;
        this.y = y;
    }
});