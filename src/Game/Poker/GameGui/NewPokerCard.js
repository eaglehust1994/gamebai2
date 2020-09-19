//
Poker.CardSprite = cc.Sprite.extend({
    ctor: function (id) {
        this._super(Poker.res.cardNamePath + 51 + ".png");
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
        //this.setTexture(cc.textureCache.addImage(this.getResource(this.id)));
        GuiUtil.changeSprite(this,this.getResource(this.id));
        this.startY = 0;
        this.isUp = false;
        //this.anhSang = new cc.Sprite("res/CardGame/Poker/anhSang.png");
        //this.anhSang.setAnchorPoint(0.5, 0.5);
        //this.anhSang.setPosition(cc.p(this.getContentSize().width/2, this.getContentSize().height/2));
        this.setAnchorPoint(0.5, 0.5);
        //this.addChild(this.anhSang);
        this.rootPosition = cc.p(0,0);
        this.rootScale = 1;
    },

    setId: function(id){
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
        //this.setTexture(cc.textureCache.addImage(this.getResource(this.id)));
        GuiUtil.changeSprite(this,this.getResource(this.id));
        this.isUp = false;
    },

    convertId: function(idCard){
        return (idCard)%52;
    },

    getSoById: function(id){
        return Math.floor(id/4);
    },

    getChatById: function(id){
        return id/4;
    },

    containTouchPoint: function(touchPoint) {
        var localPoint = this.convertToNodeSpaceAR(touchPoint);
        var rect = this.getContentSize();
        var rect2 = new cc.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
        return cc.rectContainsPoint(rect2, localPoint);
    },

    getResource: function(id){
        if(id >= 52 || id < 0){
            return "res/CardGame/LaBai/labai_52.png";
        }

        var realId = Poker.Card.getDisplayId(id);
        return Poker.res.cardNamePath + realId + ".png";
    },

    runHighlight: function(){
        this.setColor({r:255, g:255, b:255});
        this.runAction(cc.sequence( cc.spawn(cc.scaleTo(0.15, this.rootScale*1.05), cc.moveTo(0.15, cc.p(this.rootPosition.x, this.rootPosition.y + 15)))));
    },

    runToNormal: function(){
        this.setColor({r:255, g:255, b:255});
        this.setPosition(cc.p(this.rootPosition.x, this.rootPosition.y));
        this.setScale(this.rootScale);
        this.stopAllActions();
    },

    runToDark: function(){
        this.setColor({r:200, g:200, b:200});
    }
});



Poker.CardSprite.getResource = function(id){
    if(id >= 52 || id < 0){
        return "res/CardGame/LaBai/labai_52.png";
    }

    var realId = Poker.Card.getDisplayId(id);
    return Poker.res.cardNamePath + realId + ".png";
}