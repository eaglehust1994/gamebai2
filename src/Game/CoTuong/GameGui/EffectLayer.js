/**
 * Created by vinplay on 2/4/17.
 */

CoTuong.EffectLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        this.chatImage = [];
        for (var i=0; i < 2; i++){
            this.chatImage[i] = null;
        }

        this.createChieuTuong();
        this.createEffect();
        this.hideEffect();
    },

    createChieuTuong: function() {
        this.nodeChieuTuong = new cc.Node();
        this.kiemChieuTuong = new cc.Sprite("res/GameCo/CoTuong/chieutuong/kiem.png");
        this.nodeChieuTuong.addChild(this.kiemChieuTuong);

        this.chuChieuTuong = new cc.Sprite("res/GameCo/CoTuong/chieutuong/chieu_tuong.png");
        this.nodeChieuTuong.addChild(this.chuChieuTuong);
        this.chuChieuTuong.setPosition(0, -78);
        this.glowChieuTuong = new cc.Sprite("res/GameCo/CoTuong/chieutuong/glow.png");
        this.nodeChieuTuong.addChild(this.glowChieuTuong);
        this.glowChieuTuong.setPosition(0, -84);

        this.addChild(this.nodeChieuTuong);
        this.nodeChieuTuong.setVisible(false);
    },

    showChieuTuong: function(index, pos) {
        cc.log("chieu tuong pos: " + pos.x + " " + pos.y);
        this.nodeChieuTuong.stopAllActions();
        this.nodeChieuTuong.setVisible(true);
        var startPos;
        if (index == 0) {
            this.chuChieuTuong.setPosition(0, -78);
            this.glowChieuTuong.setPosition(0, -84);
            this.kiemChieuTuong.setRotation(0);
            startPos = cc.p(pos.x, cc.winSize.height);
        } else {
            this.chuChieuTuong.setPosition(0, 78);
            this.glowChieuTuong.setPosition(0, 84);
            this.kiemChieuTuong.setRotation(180);
            startPos = cc.p(pos.x, 0);
        }
        var that = this;
        this.nodeChieuTuong.setPosition(startPos);
        this.nodeChieuTuong.runAction(cc.sequence(cc.moveTo(0.3, pos).easing(cc.easeBackOut()), cc.delayTime(1), cc.callFunc(function(){
            that.nodeChieuTuong.setVisible(false);
        }, this)));
        this.chuChieuTuong.setScale(0);
        this.glowChieuTuong.setScale(0);
        this.chuChieuTuong.runAction(cc.sequence(cc.delayTime(0.1), cc.scaleTo(0.2, 1)));
        this.glowChieuTuong.runAction(cc.sequence(cc.delayTime(0.1), cc.scaleTo(0.2, 1)));
    },

    createEffect: function() {
        this.effectNode = new cc.Node();
        this.bg = new cc.Sprite("res/GameCo/Caro/Effect/Glow.png");
        this.effectNode.addChild(this.bg);
        this.bg.setLocalZOrder(-10);

        this.bgThua = new cc.Sprite("res/GameCo/Caro/Effect/Glowthua.png");
        this.effectNode.addChild(this.bgThua);
        this.bgThua.setLocalZOrder(-10);

        this.winSpr = new cc.Sprite("res/GameCo/Caro/Effect/thang.png");
        this.effectNode.addChild(this.winSpr);
        this.winSpr.setPosition(0, 0);

        this.drawSpr = new cc.Sprite("res/GameCo/Caro/Effect/hoa.png");
        this.effectNode.addChild(this.drawSpr);
        this.drawSpr.setPosition(0, -37);

        this.flag = new cc.Sprite("res/GameCo/Caro/Effect/flag.png");
        this.effectNode.addChild(this.flag);
        this.flag.setAnchorPoint(0.25, 0);
        this.flag.setPosition(-3, -105);

        this.loseSpr = new cc.Sprite("res/GameCo/Caro/Effect/thua.png");
        this.effectNode.addChild(this.loseSpr);
        this.loseSpr.setPosition(0, -94);

        this.starEff = new cc.Sprite("res/GameCo/Caro/Effect/sao.png");
        this.effectNode.addChild(this.starEff);
        this.starEff.setPosition(0, 70);
        this.starEff.setLocalZOrder(-5);

        this.loseStarEff = new cc.Sprite("res/GameCo/Caro/Effect/saothua.png");
        this.effectNode.addChild(this.loseStarEff);
        this.loseStarEff.setPosition(0, 70);
        this.loseStarEff.setLocalZOrder(-5);

        this.wings = [];
        var firstWing = new cc.Sprite("res/GameCo/Caro/Effect/canh.png");
        this.effectNode.addChild(firstWing);
        firstWing.setAnchorPoint(0, 0.5);
        firstWing.setRotationY(180);
        firstWing.setPosition(-100, -50);
        firstWing.setLocalZOrder(-1);
        this.wings.push(firstWing);

        var secondWing = new cc.Sprite("res/GameCo/Caro/Effect/canh.png");
        this.effectNode.addChild(secondWing);
        secondWing.setAnchorPoint(0, 0.5);
        secondWing.setPosition(100, -50);
        secondWing.setLocalZOrder(-1);
        this.wings.push(secondWing);

        this.addChild(this.effectNode);
        var size = GameScene.getMainContentSize();
        this.effectNode.setPosition(size.width/2, size.height/2);
    },

    showWinEffect: function() {
        this.hideEffect();
        this.drawSpr.setVisible(false);
        this.loseSpr.setVisible(false);
        this.flag.setVisible(false);
        this.loseStarEff.setVisible(false);
        this.bgThua.setVisible(false);

        this.bg.setVisible(true);
        this.winSpr.setVisible(true);
        this.starEff.setVisible(true);

        this.effectNode.setScale(0);
        this.effectNode.runAction(cc.sequence(cc.show(), new cc.EaseBounceOut(cc.scaleTo(0.3, 1, 1)), cc.delayTime(0.1), cc.callFunc(function(){
            for (var i = 0; i < 2; i++) {
                var scale = cc.repeat(cc.sequence(cc.scaleTo(0.3, 0.6, 1), cc.scaleTo(0.3, 1, 1)), 4);
                this.wings[i].runAction(scale);
            }
            this.bg.runAction(cc.rotateBy(2.4, 300));
        }.bind(this)), cc.delayTime(3), cc.callFunc(function() {
            this.hideEffect();
        }.bind(this))));
    },

    showDrawEffect: function() {
        this.hideEffect();
        this.winSpr.setVisible(false);
        this.loseSpr.setVisible(false);
        this.flag.setVisible(false);
        this.loseStarEff.setVisible(false);
        this.bgThua.setVisible(false);

        this.bg.setVisible(true);
        this.drawSpr.setVisible(true);
        this.starEff.setVisible(true);

        this.effectNode.setScale(0);
        this.effectNode.runAction(cc.sequence(cc.show(), new cc.EaseBounceOut(cc.scaleTo(0.3, 1, 1)), cc.delayTime(0.1), cc.callFunc(function(){
            for (var i = 0; i < 2; i++) {
                var scale = cc.repeat(cc.sequence(cc.scaleTo(0.3, 0.6, 1), cc.scaleTo(0.3, 1, 1)), 4);
                this.wings[i].runAction(scale);
            }
            this.bg.runAction(cc.rotateBy(2.4, 300));
        }.bind(this)), cc.delayTime(3), cc.callFunc(function() {
            this.hideEffect();
        }.bind(this))));
    },

    showLoseEffect: function() {
        this.hideEffect();
        this.drawSpr.setVisible(false);
        this.winSpr.setVisible(false);
        this.starEff.setVisible(false);
        this.bg.setVisible(false);

        this.bgThua.setVisible(true);
        this.flag.setVisible(true);
        this.loseSpr.setVisible(true);
        this.loseStarEff.setVisible(true);

        this.effectNode.setScale(0);
        this.effectNode.runAction(cc.sequence(cc.show(), new cc.EaseBounceOut(cc.scaleTo(0.3, 1, 1)), cc.delayTime(0.1), cc.callFunc(function(){
            for (var i = 0; i < 2; i++) {
                var scale = cc.repeat(cc.sequence(cc.scaleTo(0.3, 0.6, 1), cc.scaleTo(0.3, 1, 1)), 4);
                this.wings[i].runAction(scale);
            }
            this.bgThua.runAction(cc.rotateBy(2.4, 300));
            var rotate = cc.repeat(cc.sequence(cc.rotateTo(0.3, 25), cc.rotateTo(0.3, -15)), 4);
            this.flag.runAction(rotate);
        }.bind(this)), cc.delayTime(3), cc.callFunc(function() {
            this.hideEffect();
        }.bind(this))));
    },

    hideEffect: function() {
        this.effectNode.stopAllActions();
        this.effectNode.setVisible(false);
    },

    updateChatRoom: function(localChair, pos, image){
        var position = this.convertToNodeSpace(pos);

        if (this.chatImage[localChair]){
            this.chatImage[localChair].removeFromParent();
            this.chatImage[localChair] = null;
        }

        this.chatImage[localChair] = image;
        this.chatImage[localChair].setPosition(position);
        this.addChild(this.chatImage[localChair]);

        var actionArr = [];
        for (var i=0; i<4; i++){
            actionArr.push(cc.moveBy(0.3, 0, 10));
            actionArr.push(cc.moveBy(0.3, 0, -10));
        }
        actionArr.push(cc.callFunc(function(){
            if (this.chatImage[localChair]){
                this.chatImage[localChair].removeFromParent();
                this.chatImage[localChair] = null;
            }
        }.bind(this)));

        this.chatImage[localChair].runAction(cc.sequence(actionArr));
    }
});