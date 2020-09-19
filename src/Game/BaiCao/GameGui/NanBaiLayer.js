//
BaiCao.NanBaiLayer = BaseLayer.extend({
    ctor: function(){
        this._super();
        //this.initWithBinaryFile("res/g_res_cardGame_json_nanBaiLayer.json");
        this.gameLayer = null;

        this.setContentSize(cc.winSize);
        this.setAnchorPoint(cc.p(.5,.5));
        this.customizeGUI2();
    },

    onEnter: function(){
        cc.Layer.prototype.onEnter.call(this);
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        this.setFog(true);
        this.refresh();
    },
    refresh: function(){
        cc.log("refresh1");
        this.isHide = false;
        for(var i = 0; i < 3; i++){
            this.cardCheList[i].setPosition(this["card" + i].getPosition());
            this.cardCheList[i].setVisible(true);
            this.cardCheList[i].setOpacity(255);
            this.cardCheList[i].setScale(1.3);
            this.list[i] = false;
            cc.log("refresh" + i);
        }
    },

    customizeGUI2: function(){
        this.cardList = [];
        this.cardCheList = [];
        this.list = [];
        this.isHide = false;

        this.addLayout(this,"bg",cc.p(640,360),res_CardGame_BaCay + "/bg_nanbai.png",cc.size(1280,720),false);
        //this.btnMoLuon = this.customizeButton("btnMoLuon", BaiCao.NanBaiLayer.BTN_MO_LUON);
        this.addButton(this,"btnMoLuon", BaiCao.NanBaiLayer.BTN_MO_LUON,cc.p(816,520),true,res_CardGame_BaCay + "/moLuon.png",null);
        var startX = 460;
        var startY = 365;

        for(var i = 0; i < 3; i++){
            //this["card"+ i] = this._layout.getChildByName("card" + i);
            this.addSprite(this,"card"+i,cc.p(startX + (180*i),startY),res_CardGame_BaCay + "/laBaiChe.png");
            this["card"+i].setScale(1.3);
            this.cardList.push(this["card" + i]);
            var cardChe = new BaiCao.CardSprite(52);
            cardChe.setPosition(this["card" + i].getPosition());
            cc.log("carChe" + cardChe.getPosition().x);
            cardChe.setScale(1.3);
            this.addChild(cardChe);
            this.cardCheList.push(cardChe);
            this.list[i] = false;
        }
    },

    initCards: function(cards){
        this.cards = cards;
        cc.log("initCards");
    },

    initWithQuanBai: function(){
        cc.log("initWithQuanBai");
        for(var i = 0; i < this.cards.length; i++){
            //this.cardList[i].setTexture(cc.textureCache.addImage(BaiCao.CardSprite.getResource(this.cards[i])));
            //cc.log("i" + i +  + " " + this.cards[i] + " " + BaiCao.CardSprite.getResource(this.cards[i]));
            GuiUtil.changeSprite(this.cardList[i],BaiCao.CardSprite.getResource(this.cards[i]));
        }
    },

    onButtonRelease: function(btn, id){
        switch(id){
            case BaiCao.NanBaiLayer.BTN_MO_LUON:
            {
                this.moBai();
            }
                break;
        }
    },

    onTouchBegan: function(touch, event){
        var i = 0;
        cc.log("onTouchBegan 0");
        var target = event.getCurrentTarget();
        var point = touch.getLocation();


        if(target.cardCheList.length == 0)
            return false;


        cc.log("onTouchBegan 1");
        for(i = target.cardCheList.length - 1; i >= 0;i-- ){

            var card = target.cardCheList[i];
            var card2 = target.cardList[i];

            if(card.isVisible() == false){
                continue;
            }

            if(card.containTouchPoint(point)){
                target.beginCardId = i;
                target.startPoint = point;
                target.startPos = card.getPosition();//target.convertToWorldSpaceAR(card.getPosition());
                target.initPos = card2.getPosition();//target.convertToWorldSpaceAR(card2.getPosition());

                cc.log("click true: " + i + " " + target.startPos.x + " " + target.startPos.y);

                for(i = 0; i < 3; i++){
                    target.cardCheList[i].setLocalZOrder(0);
                }
                card.setLocalZOrder(10);
                return true;
            }
        }
        return false;
    },


    onTouchMoved: function(touch, event){
        var i = 0;
        var cardSize = cc.size(140 *1.3, 180*1.3);
        var target = event.getCurrentTarget();
        var curPoint = touch.getLocation();
        var startPoint = target.startPoint;
        var startPos = target.startPos;
        var initPos = target.initPos;
        var distant = (curPoint.x - startPoint.x)*(curPoint.x - startPoint.x) + (curPoint.y - startPoint.y)*(curPoint.y - startPoint.y);

        cc.log("onTouchMoved1");
        // da duoc mo
        if(target.list[target.beginCardId]){
            return;
        }

        cc.log("onTouchMoved2");
        //cc.log("curx, startx: " + curPoint.x  + " " + startPoint.x);
        if(distant < 2*2){
            return;
        }
        cc.log("onTouchMoved3");
        var localPoint = cc.p(startPos.x + curPoint.x - startPoint.x , startPos.y + curPoint.y - startPoint.y);
        //cc.log("localPoint1: " + localPoint.x + " " + localPoint.y);
        var local = localPoint;
        //localPoint = target.convertToNodeSpace(localPoint);
       // cc.log("localPoint2 " + localPoint.x + " " + localPoint.y);

        target.cardCheList[target.beginCardId].setPosition(localPoint);
        cc.log("onTouchMoved4");

        if(((local.x - initPos.x) > cardSize.width*0.3 || (local.x - initPos.x) < -cardSize.width
            || (local.y - initPos.y) > cardSize.height
            || (local.y - initPos.y) < -cardSize.height*0.3) && target.list[target.beginCardId]== false)
        {
            //cc.log("Toi la so 1 action");
            target.cardCheList[target.beginCardId].runAction(cc.sequence( cc.spawn(cc.rotateBy(0.8, 360*3), cc.scaleTo(0.8, 0.5), cc.EaseBackOut.create(cc.moveTo(0.8, cc.p(1280, 720)))), cc.hide()));
            target.list[target.beginCardId]= true;
            target.checkHide();
        }
    },

    onTouchEnded: function(touch, event){
        var i = 0;
        var target = event.getCurrentTarget();
        cc.log("target" + target.beginCardId);
        if(target.cardCheList.length == 0)
            return;

        var curPoint = touch.getLocation();
        var startPoint = target.startPoint;
        var distant = (curPoint.x - startPoint.x)*(curPoint.x - startPoint.x) + (curPoint.y - startPoint.y)*(curPoint.y - startPoint.y);
        if(distant < 5*5 && target.list[target.beginCardId] == false){
            target.cardCheList[target.beginCardId].runAction(cc.sequence(cc.fadeOut(0.4), cc.hide()));
            target.list[target.beginCardId] = true;
            target.checkHide();
        }
    },

    checkHide: function(){
        var count = 0;
        for(var i = 0; i < 3; i++){
            if(this.list[i]){
                count++;
            }
        }
        if(count >= 3 && this.isHide == false){
            this.isHide = true;
            this.runAction(cc.sequence(cc.delayTime(0.8), cc.hide()));
            this.gameLayer.displayMyCard();
        }
    },

    moBai: function(){
        for(var i = 0; i < this.list.length; i++){
            if(this.list[i] == false){
                this.cardCheList[i].runAction(cc.sequence(cc.fadeOut(0.3), cc.hide()));
            }
        }

        this.isHide = true;
        this.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.EaseBackOut.create(cc.fadeOut(0.2))), cc.hide()));
        this.gameLayer.displayMyCard();
    }
});

BaiCao.NanBaiLayer.BTN_MO_LUON = 10000;