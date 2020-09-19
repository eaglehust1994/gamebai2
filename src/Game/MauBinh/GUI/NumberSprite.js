/**
 * Created by user on 24/11/2015.
 */

var NumberSprite = cc.Node.extend({

    ctor: function(number, fontType, needPlusAtFirst){

        this.distanceConfig = [0,0,0];
        this.numberWidth = 0;
        this.numberHeight = 0;
        this.listSprite = [];
        this.fontType = -1;
        this.countdownCallback = null;
        this.needPlusAtFirst = (needPlusAtFirst===undefined?false:needPlusAtFirst);

        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setFontType(fontType);
        this.listSprite = [];
        this.setNumber(number);
    },

    setFontType: function(fontType){
        this.fontType = fontType;
    },

    update: function(dt){
        if (this.number>0){
            this.number--;
            if (this.number == 0){
                if (this.countdownCallback!=null){
                    this.countdownCallback();
                }
                this.removeFromParent();
            }
            this.setNumber(this.number);
        }
    },

    startCountdown: function(callback){
        this.schedule(this.update, 1);
        this.countdownCallback = typeof  callback !== "undefined" ? callback : null;
    },

    stopCountdown: function(){
        this.unschedule(this.update);
    },

    setNumber: function(number){
        this.number = number;
        var str = (number<0?("-"):(this.needPlusAtFirst?"+":"")) + StringUtility.standartNumber(Math.abs(number));
        this.numberWidth = 0;
        this.numberHeight = 0;

        for (var i=0; i<str.length; i++){
            var eSprite;
            if (i<this.listSprite.length){
                eSprite = this.listSprite[i];
                eSprite.setVisible(true);
            }
            else{
                eSprite = cc.Sprite.create();
                this.addChild(eSprite);
                this.listSprite.push(eSprite);
            }

            var res = gameUtility.getResNumberByType(this.fontType, str[i]);
            //cc.log("NumberSprite: " + str[i] + "-->" + res);
            eSprite.setTexture(res);
            eSprite.setPosition(this.numberWidth+eSprite.getContentSize().width/2,
                                str[i]=="."?this.numberHeight-this.listSprite[i-1].getContentSize().height/2+eSprite.getContentSize().height/2:this.numberHeight);
            this.numberWidth+=eSprite.getContentSize().width-this.distanceConfig[this.fontType];
        }

        for (var i=str.length; i<this.listSprite.length; i++){
            this.listSprite[i].setVisible(false);
        }

        for (var i=0; i<this.listSprite.length; i++){
            var eSprite = this.listSprite[i];
            eSprite.setPositionX(eSprite.getPositionX()-this.numberWidth/2);
        }
    },

});