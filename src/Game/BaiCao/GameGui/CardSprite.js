//
BaiCao.CardSprite = cc.Sprite.extend({
    ctor: function (id) {
        this._super(BaiCao.res.cardNamePath + 51 + ".png");
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
        GuiUtil.changeSprite(this,this.getResource(this.id));
        this.startY = 0;
        this.isUp = false;
    },

    setId: function(id){
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
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
        if(id >= 52){
            return "res/CardGame/BaCay/laBaiChe.png";
        }
        var realId = BaiCao.Card.getNormalId(id);
        return BaiCao.res.cardNamePath + realId + ".png";
    }
});

BaiCao.CardSprite.getResource = function(id){
    if(id >= 52){
        return "res/CardGame/BaCay/laBaiChe.png";
    }
    var realId = BaiCao.Card.getNormalId(id);
    return BaiCao.res.cardNamePath + realId + ".png";
}
