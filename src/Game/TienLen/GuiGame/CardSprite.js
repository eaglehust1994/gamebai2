//
TienLen.CardSprite = cc.Sprite.extend({
    ctor: function (id) {
        this._super(TienLen.res.cardNamePath + 51 + ".png");
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
        //this.setTexture(cc.textureCache.addImage(this.getResource(this.id)));
        GuiUtil.changeSprite(this,this.getResource(this.id));
        this.startY = 0;
        this.isUp = false;
        this.grey = false;
    },

    getSoById: function(){
        return Math.floor(this.id/4);
    },

    getChatById: function(){
        return this.id%4;
    },

    setId: function(id) {
        this.id = id;
        this.so = this.getSoById();
        this.chat = this.getChatById();
     //   this.setTexture(cc.textureCache.addImage(this.getResource(this.id)));
        GuiUtil.changeSprite(this,this.getResource(this.id));
        this.isUp = false;
        this.sangLai();
    },
    setGrey: function(grey){
        this.grey = grey;
        if(grey){
            this.denLai();
        }
        else{
            this.sangLai();
        }
    },

    convertId: function(idCard){
        return (idCard)%52;
    },

    up: function(){
        this.isUp = true;
        this.stopAllActions();
        var action = new cc.MoveTo(0.11, cc.p(this.getPositionX(), this.startY + 15));
        this.runAction(action);
    },

    down: function(){
        this.isUp =false;
        this.stopAllActions();
        var action = new cc.MoveTo(0.11, cc.p(this.getPositionX(), this.startY));
        this.runAction(action);
    },


    instantUp: function(){
        this.stopAllActions();
        this.isUp = true;
        this.setPositionY(this.startY + 15);
    },

    instantDown: function(){
        this.stopAllActions();
        this.isUp =false;
        this.setPositionY(this.startY);
    },

    denLai: function(){
        this.setColor({r:199,g:199,b:199});
        this.grey = true;
    },

    sangLai: function(){
        this.setColor({r:255,g:255,b:255});
        this.grey = false;
    },

    containTouchPoint: function(touchPoint) {
        var localPoint = this.convertToNodeSpaceAR(touchPoint);
        var rect = this.getBoundingBox();
        var rect2 = new cc.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
        return cc.rectContainsPoint(rect2, localPoint);
    },

    upDown: function(){
        if(!this.isUp){
            this.up();
        }else{
            this.down();
        }

    },
    getResource: function(id){
        if(this.id < 52){
            return TienLen.res.cardNamePath + this.convertId(id)+ ".png";
        }
        return "res/CardGame/LaBai/labai_52.png";
    }
});

TienLen.CardSprite.getResource = function(id){
    if(id < 52){
        return TienLen.res.cardNamePath + (id)%52 + ".png";
    }
    return "res/CardGame/LaBai/labai_52.png";
}
