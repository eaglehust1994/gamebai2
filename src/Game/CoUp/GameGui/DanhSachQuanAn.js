/**
 * Created by vinplay on 4/5/17.
 */

CoUp.DanhSachQuanAn = cc.Node.extend({
    ctor: function(index) {
        this._super();
        var bg = new cc.Sprite("res/GameCo/CoUp/quanan.png");
        this.addChild(bg);

        this.btnShow = new ccui.Button("res/GameCo/CoUp/tamgiac.png");
        this.addChild(this.btnShow);
        this.btnShow.y = 0;
        if (index == 0) {
            this.btnShow.x = 155;
            this.btnShow.setRotation(180);
        } else {
            this.btnShow.x = -155;
        }
        this.btnShow.addTouchEventListener(this.btnShowClick, this);

        this.listQuanAn = [];
    },

    btnShowClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    },

    addQuanAn: function(quanan) {
        var sprite = new cc.Sprite("res/GameCo/CoTuong/piece/" + quanan[0] + quanan[1] + ".png");
        this.addChild(sprite);
        sprite.setPosition(this.getPositionOfQuan(this.listQuanAn.length));
        this.listQuanAn.push(sprite);
    },

    getPositionOfQuan: function(index) {
        var row = parseInt(index / 4);
        var col = index % 4;
        var x = 0, y = 0;
        switch(row) {
            case 0:
                y = 118;
                break;
            case 1:
                y = 38;
                break;
            case 2:
                y = -53;
                break;
            case 3:
                y = -133;
                break;
        }

        switch(col) {
            case 0:
                x = -110;
                break;
            case 1:
                x = -35;
                break;
            case 2:
                x = 38;
                break;
            case 3:
                x = 113;
                break;
        }
        return cc.p(x, y);
    },

    reset: function() {
        for (var i = 0; i < this.listQuanAn.length; i++) {
            this.listQuanAn[i].removeFromParent();
        }
        this.listQuanAn = [];
    }

});