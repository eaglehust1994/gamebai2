/**
 * Created by Tuan on 10-Aug-16.
 */

var MauBinhCardDisplay = cc.Class.extend({
    ctor: function(card, sprite){
        this.card = card;
        this.sprite = sprite;
        this.rootPosition = cc.p(0,0);
        this.rootZOrder = sprite.getLocalZOrder();
    },

    getPosition: function(){
        return this.sprite.getPosition();
    },

    setPosition: function(position){
        this.sprite.setPosition(position);
    },

    setLocalZOrder: function(zOrder){
        this.sprite.setLocalZOrder(zOrder);
    },

    setRootPosition: function(position){
        this.rootPosition = position;
    },

    setScale: function(scale){
        this.sprite.setScale(scale);
    },

    setVisible: function(visible){
        this.sprite.setVisible(visible);
    },

    setHighlight: function(isHighlight){
        if (isHighlight){
            this.sprite.setColor(cc.WHITE);
        }
        else{
            this.sprite.setColor(cc.color(199,199,199,0));
        }
    },

    runBubble: function(){
        var curScale = this.sprite.getScale();
        this.sprite.runAction(cc.sequence(
            cc.scaleTo(0.5, curScale*1.2),
            cc.scaleTo(0.5, curScale*0.9),
            cc.scaleTo(0.5, curScale*1.2),
            cc.scaleTo(0.5, curScale))
        );
    },

    reload: function(){
        GuiUtil.changeSprite(this.sprite, GuiUtil.getCardResource(this.card.id));
    },

    showCard: function(){
        var scale = this.sprite.getScale();
        this.sprite.runAction(cc.sequence(
            cc.scaleTo(0.1, 0, scale),
            cc.callFunc(function(){
                this.reload();
            }.bind(this)),
            cc.scaleTo(0.1, scale)
        ));
    }
});