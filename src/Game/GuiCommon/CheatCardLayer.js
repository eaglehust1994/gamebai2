var CheatCardLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.cheatCards = [];
        this.handOnCards= [];
        this.selectCards = [];
        this.selectCount = 0;
        this.selectDisplayCards = [];
        this.numCardOnePlayer = 10;
        this.listInGame = [];
        this.isHide = [];

        for (var i = 0; i < 52; i++) {
            this.cheatCards.push(i);
            this.isHide.push(false);
            this.listInGame[i] = true;
        }

        this.initCards();
    },

    onEnter: function(){
        cc.Layer.prototype.onEnter.call(this);
    },


    addListenerNew: function(){
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(this.listener, this);
    },

    initCards: function(){
        var i;
        this.cheatCards = [];
        this.handOnCards= [];
        this.selectCards = [];
        this.selectCount = 0;
        this.selectDisplayCards = [];
        this.isHide = [];
        for (var i = 0; i < 52; i++) {
            this.cheatCards.push(i);
            this.isHide.push(false);
        }
        var cardSize = new Sam.CardSprite(0);
        //cc.log("cards: " + cards.length);
        for(i = 0; i < 26; i++){
            var cardSprite = new Sam.CardSprite(this.cheatCards[i]);
            this.addChild(cardSprite);
            this.handOnCards.push(cardSprite);
            cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*i, cardSize.height*1.2));
        }

        for(i = 26; i <52; i++){
            var cardSprite = new Sam.CardSprite(this.cheatCards[i]);
            this.addChild(cardSprite);
            this.handOnCards.push(cardSprite);
            cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*(i-26), cardSize.height*0.5));
        }
    },

    clear: function(){
        for( var i = 0; i < 52; i++){
            this.isHide = false;
            if(this.listInGame[i])
                this.handOnCards[i].setVisible(true);
        }

        for(var i = 0; i < this.selectDisplayCards.length; i++){
            this.selectDisplayCards[i].removeFromParent();
        }
        this.selectDisplayCards = [];
        this.selectCount = 0;
        this.isHide = [];
        this.cheatCards = [];
        this.selectCards = [];
        this.selectCount = 0;
        for (var i = 0; i < 52; i++) {
            this.cheatCards.push(i);
            this.isHide.push(false);
        }
    },


    onTouchBegan: function(touch, event){
        var i = 0;
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var card = new Sam.CardSprite(0);
        var cardSize = card.getContentSize();
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        if(target.handOnCards.length == 0)
            return;
        for(i = target.handOnCards.length - 1; i >= 0;i-- ){
            var card = target.handOnCards[i];
            if(card.isVisible() ==  false){
                continue;
            }
            if(target.listInGame[i] == false){
                continue;
            }

            if(card.containTouchPoint(point)){
                target.selectCount++;
                target.isHide[i] = true;
                target.selectCards.push(i);
                target.handOnCards[i].setVisible(false);

                var cardSprite = new Sam.CardSprite(target.cheatCards[i]);
                target.selectDisplayCards.push(cardSprite);
                target.addChild(cardSprite);


                cc.log("numCardOnPlayer: " + target.numCardOnePlayer);

                if(target.selectCount <= target.numCardOnePlayer*1){
                    cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*((target.selectCount -1)%target.numCardOnePlayer), mainContentSize.height - cardSize.height));
                }
                else if(target.selectCount <= target.numCardOnePlayer*2){
                    cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*((target.selectCount -1)%target.numCardOnePlayer), mainContentSize.height - cardSize.height*1.7));
                }
                else if(target.selectCount <= target.numCardOnePlayer*3){
                    cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*((target.selectCount -1)%target.numCardOnePlayer), mainContentSize.height - cardSize.height*2.4));
                }
                else if(target.selectCount <= target.numCardOnePlayer*4){
                    cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*((target.selectCount -1)%target.numCardOnePlayer), mainContentSize.height - cardSize.height*3.1));
                }
                else if(target.selectCount <= target.numCardOnePlayer*5){
                    cardSprite.setPosition(cc.p(cardSize.width/2 + cardSize.width*0.3*((target.selectCount -1)%target.numCardOnePlayer), mainContentSize.height - cardSize.height*3.8));
                }

                return true;

            }
        }
        return false;
    }





});

CheatLayer.BTNBACK = 1;
CheatLayer.BTNCHEAT = 2;
CheatLayer.BTNHUYCHEAT = 3;
