/**
 * Created by vinplay on 3/2/17.
 */

CoUp.PieceDisplay = cc.Sprite.extend({
    ctor: function(data) {
        this._super("res/GameCo/CoUp/bup.png");
        this.owner = data[0][0];
        this.name = data[0];
        this.setPiecePos(data[1], data[2]);
        this.reset();
    },

    setPieceData: function(pieceData) {
        this.piece = pieceData;
        this.owner = pieceData.owner;
        this.name = pieceData.name;
        this.setPiecePos(this.piece.x, this.piece.y);
        if (this.name[1] == "g") {
            this.show();
        } else {
            if (pieceData.state == CoUp.Piece.State.UP)
                this.hide();
            else
                this.show();
        }
    },

    changePieceData: function(piece) {
        this.piece = piece;
        this.owner = piece.owner;
        this.name = piece.name;
    },

    moveToPos: function(x, y, isTrans) {
        if (this.getNumberOfRunningActions() > 0) {
            this.stopAllActions();
            if (this.logicPosition) {
                this.setPosition(this.logicPosition);
            }
            this.show();
        }
        this.logicPosition = CoUp.getPosInMap(x, y);
        if (isTrans) {
            this.runAction(cc.sequence(cc.moveTo(0.1, this.logicPosition), cc.delayTime(0.1), cc.callFunc(this.show.bind(this), this)));
        } else {
            this.runAction(cc.moveTo(0.1, this.logicPosition));
        }
    },

    setPiecePos: function(x, y) {
        this.setPosition(CoUp.getPosInMap(x, y));
    },

    removePiece: function() {
        this.stopAllActions();
        this.piece = null;
        this.setVisible(false);
    },

    getResourcePath: function(name) {
        cc.log(name);
        return "res/GameCo/CoTuong/piece/" + name[0] + name[1] + ".png";
    },

    reset: function() {
        this.removePiece();
        this.logicPosition = null;
    },

    hide: function() {
        if (this.owner == "b")
            this.setTexture("res/GameCo/CoUp/bup.png");
        else
            this.setTexture("res/GameCo/CoUp/rup.png");
    },

    show: function() {
        cc.log("show new quan co");
        this.setTexture(this.getResourcePath(this.name));
        if (this.piece)
            this.setVisible(true);
    },

    showAnimation: function() {
        cc.log("show animation");
        this.setVisible(false);
        this.createLatQuanAnimation();
        this.runAction(cc.sequence(cc.delayTime(0.4), cc.callFunc(this.show.bind(this), this)));
    },

    createLatQuanAnimation: function() {
        var fd = "blackAnimation";
        if (this.owner == "r")
            fd = "redAnimation";

        var animFrames = [];
        for (var i = 0; i < 13; i++) {
            var str = "GameCo/" + fd + "/ani" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(frame, 1, null);
            animFrames.push(animFrame);
        }
        var spr = new cc.Sprite("#GameCo/" + fd + "/ani0.png");
        var animation = new cc.Animation(animFrames, 0.04, 1);
        var animate = new cc.Animate(animation);

        var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
        if (gameScene instanceof CoUp.CoUpScene) {
            gameScene.table.addChild(spr);
        }
        spr.setPosition(this.logicPosition);
        spr.setLocalZOrder(99999);
        spr.runAction(cc.sequence(animate, cc.delayTime(0.1), cc.removeSelf()));
        return spr;
    }
});