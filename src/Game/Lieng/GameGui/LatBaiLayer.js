//
Lieng.LatBaiLayer = BaseLayer.extend({
    ctor: function(){
        this._super();
        //this.initWithBinaryFile("res/g_res_cardGame_json_LiengLatBai.json");
        this.gameLayer = null;

        this.setContentSize(cc.winSize);
        this.setAnchorPoint(cc.p(.5,.5));
        this.customizeGUI2();
        this.marks = [];
    },
    //
    onEnter: function(){
        cc.Layer.prototype.onEnter.call(this);

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        this._layerColor.setVisible(true);
        this._layerColor.runAction(cc.fadeTo(.25,150));
        this.setFog(true);
    },

    show: function(){
        this.setVisible(true);
        this.bg.setScale(0.2);
        this.setInit();
    },

    onTouchBegan: function(touch, event){
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        for(var i = target.cardList.length - 1; i >= 0;i-- ){
            var card = target.cardList[i];
            if(card.containTouchPoint(point)){
                target.beginCardId = i;
                return true;
            }
        }
        return false;
    },

    onTouchEnded: function(touch, event){
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();


        for(i = target.cardList.length - 1; i >= 0;i-- ){
            var card = target.cardList[i];
            if(card.containTouchPoint(point)){
                target.endCardId = i;
                break;
            }
        }

        if(target.endCardId == target.beginCardId){

            var count = 0;
            for(var i = 0; i < 3; i++){
                if(target.marks[i])
                    count++;
            }

            if(count < 2){
                target.marks[target.endCardId] = ! target.marks[target.endCardId];
                target.cardList[target.endCardId].upDown();
            }
            else if(target.marks[target.endCardId] == true){
                target.marks[target.endCardId] = ! target.marks[target.endCardId];
                target.cardList[target.endCardId].upDown();
            }
            else{
                target.marks[target.endCardId] = ! target.marks[target.endCardId];
                target.cardList[target.endCardId].upDown();
                if(target.marks[0] && (target.endCardId != 0)){
                    target.marks[0] = false;
                    target.cardList[0].down();
                }
                else if(target.marks[1] && (target.endCardId != 1)){
                    target.marks[1] = false;
                    target.cardList[1].down();
                }
            }
        }
    },

    countBuyInMoney: function(percent){
        if(percent == 1)
            this.buyInAmount = this.maxBuyIn;
        else{
            this.buyInAmount = Math.floor(((this.maxBuyIn - this.minBuyIn)*percent)) + this.minBuyIn;
            this.buyInAmount = this.buyInAmount - this.buyInAmount% (Lieng.gameLogic.bet);
        }

        this.lbBuyInAmount.setString(StringUtility.standartNumber(this.buyInAmount));
    },

    setPercentageThanhBet: function(percent){
        if(percent < 0)
            percent = 0;

        if(percent > 1){
            percent = 1;
        }

        cc.log("setPercent: " + percent);
        this.thanhHong.setScaleX(percent);
        var minPos = this.startNode.x;
        var maxPos = this.endNode.x;
        this.nutKeo.setPositionX(minPos + (maxPos - minPos)*percent);
    },

    setInit: function(){
        cc.log("setInit Buy In");
        var currentMoney;

        this.maxBuyIn = Math.min(currentMoney, Lieng.gameLogic.bet*Lieng.gameLogic.maxBuyInTiLe );
        this.minBuyIn = Lieng.gameLogic.bet*Lieng.gameLogic.minBuyInTiLe;
        this.buyInAmount = this.minBuyIn;
        this.lbBuyInAmount.setString("" + StringUtility.standartNumber(this.buyInAmount));

        this.lbMinBuyIn.setString("" + StringUtility.standartNumber(this.minBuyIn));
        this.lbMaxBuyIn.setString("" + StringUtility.standartNumber(this.maxBuyIn));
        this.bg.setScale(0.2);
        this.bg.runAction(cc.scaleTo(0.13, 1, 1));


        var percentage = 0;
        this.percentage = percentage;
        this.thanhHong.setScaleX(percentage);
        this.nutKeo.setPositionX(  this.minNode.x + percentage*Math.floor((this.maxNode.x - this.minNode.x)));
        this.countBuyInMoney(percentage);
        if(this.minBuyIn >= this.maxBuyIn){
            this.setTouchDisable = true;
        }
    },

    customizeGUI2: function(){
        this.addImage(this,"bg",cc.p(640,400),res_CardGame_Poker+"/bglatBai.png",cc.size(477,321));
        this.addButton(this,"btnOk",Lieng.BuyInLayer.BTN_BUY_IN,cc.p(640,276),true,res_CardGame_Poker+"/btnDongY.png",res_CardGame_Poker+"/btnDongY.png");
        this.btnOk.setTitleText("Đồng Ý");
        this.btnOk.setTitleFontSize(18);
     //   this.bg = ccui.helper.seekWidgetByName(this._layout, "bgLatBai");
     //   this.btnClose = this.customizeButton("btnCloseLatBai", Lieng.LatBaiLayer.BTN_CLOSE);
       // this.btnOk = this.customizeButton("btnOk", Lieng.BuyInLayer.BTN_BUY_IN);
        this.marks = [false, false, false];
        this.cardList = [];

        for(var i = 0; i < 3; i++){
            this.addSprite(this,"card"+i,cc.p(530 + 110*i,405),res_CardGame_LaBai+"/labai_42.png");
           // var card  = this._layout.getChildByName("card" + i);
            this["card" + i].setVisible(false);
            this["card" + i].setScale(0.6);
            var cardNew = new Lieng.CardSprite(52);
            cardNew.setPosition( this["card" + i].getPosition());
            cardNew.setScale( this["card" + i].getScaleX());
            cardNew.startY = cardNew.getPositionY();
            this["card" + i].getParent().addChild(cardNew);
            this.cardList.push(cardNew);
        }

        this.addButton(this,"btnCloseLatBai",Lieng.LatBaiLayer.BTN_CLOSE,cc.p(857,539.5),true,res_CardGame_Poker+"/btnCloseLatBai.png");
        this.addText(this,"Text_1",cc.p(640,495),"Chọn lá bài muốn mở cho làng xem:",RobotoRegular.fontName,20);
    },

    initWithQuanBai: function(cards) {
        cc.log("initWithQuanBai");
        this.cards = cards;

        for (var i = 0; i < this.cards.length; i++) {
            //this.cardList[i].setTexture(cc.textureCache.addImage(Lieng.CardSprite.getResource(this.cards[i])));
            GuiUtil.changeSprite(this.cardList[i],Lieng.CardSprite.getResource(this.cards[i]));
            cc.log("i" + i + +" " + this.cards[i] + " " + Lieng.CardSprite.getResource(this.cards[i]));
        }
    },

    onButtonRelease: function(btn, id){
        switch(id){
            case Lieng.LatBaiLayer.BTN_CLOSE:
            {
                cc.log("btn close");
                this.close();
            }
                break;

            case Lieng.LatBaiLayer.BTN_OK:
            {
                cc.log("btn close");

                var cardSend = [];
                for(var i = 0; i < this.marks.length; i++){
                    if(this.marks[i]){
                        cardSend.push(this.cards[i]);
                    }
                }
                if(cardSend.length > 0 && cardSend.length < 3){
                    gameWsClient.sendRequestLatBai(cardSend);
                }

                this.close();
                cc.log("btn close2");
            }
                break;
        }
    },

    close: function() {
        this.removeFromParent();
        this.gameScene.btnLatBai.setVisible(false);
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
    }
});

Lieng.LatBaiLayer.BTN_OK = 9012;
Lieng.LatBaiLayer.BTN_CLOSE = 9013;