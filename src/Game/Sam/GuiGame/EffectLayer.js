//
Sam.EffectLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.recentEffectCards = [];
        this.chatImage = [];
        for (var i=0; i< Sam.MAX_PLAYER; i++){
            this.chatImage[i] = null;
        }
        this.toast = null;
    },

    clearEffect: function(){
        for(var i = 0; i < Sam.MAX_PLAYER; i++) {
            if (this.chatImage[i]){
                this.chatImage[i].removeFromParent();
                this.chatImage[i] = null;
            }
        }
        this.removeAllChildren();
        this.recentEffectCards = [];
        this.toast = null;
    },

    sapXep: function(player){
        var i = 0, j = 0;

        for(i = 0; i < player.handOnCards.length; i++){
            var card = player.handOnCards[i];
            card.setVisible(false);
            card.instantDown();
        }
        var layerCards = [];
        for(i = 0; i < player.handOnCards.length; i++){
            var card2 = new Sam.CardSprite(player.handOnCards[i].id);
            var point = player.handOnCards[i].convertToWorldSpaceAR(cc.p(0,0));
            var point = this.convertToNodeSpace(point);
            card2.setPosition(point);
            layerCards.push(card2);
            layerCards[i].setLocalZOrder(i);
            this.addChild(card2);
        }

        var original = player.sapXep();
        for(i = 0; i < player.handOnCards.length; i++){
            var card = player.handOnCards[i];
            card.setVisible(false);
            card.down();
        }

        var newCard = [];

        for(i = 0; i < player.handOnCards.length; i++){
            var icard = new Sam.Card(player.handOnCards[i].id);
            newCard.push(icard);
        }

        for(i = 0; i < layerCards.length; i++){
            for(j = 0; j < newCard.length; j++){
                //Di chuyen quan bai
                if(layerCards[i].id == newCard[j].id){
                    var point = player.handOnCards[j].convertToWorldSpaceAR(cc.p(0,0));
                    point = this.convertToNodeSpace(point);
                    var move = new cc.EaseExponentialInOut(cc.moveTo(0.5, point));
                    var action = cc.sequence(move, cc.removeSelf());
                    layerCards[i].runAction(action);
                    layerCards[i].setLocalZOrder(j);
                }

            }
        }

        for(i = 0; i < player.handOnCards.length; i++){
            var card = player.handOnCards[i];
            card.runAction(cc.sequence(cc.delayTime(0.47), cc.show()));
        }
    },

    chiaBai: function(player, num, stt){
        var winSizeW = SceneMgr.getInstance().getRunningScene().getMainContentSize().width;
        var winSizeH = SceneMgr.getInstance().getRunningScene().getMainContentSize().height;
        var dealCards = [];
        var cardImg = GuiUtil.createSprite(Sam.res.cardFirstTurnPng);
        //dealerImg.setPosition(winSizeW/2, winSizeH - dealerImg.getContentSize().height/2 - 30);

        //tao dealer
        var timeSlow = 1;
        var offset = 3;
        var timeDealOne = 0.15*timeSlow;
        var timeTransform = 0.05*timeSlow;
        var timeOffsetAppear = 0.02*timeSlow;

        var delayPlayer = (timeDealOne)/num;

        if(player.index == 0){
            for(i = 0; i < 20; i++){
                var card = GuiUtil.createSprite(Sam.res.cardFirstTurnPng);
                card.setPosition(winSizeW/2, winSizeH/2 + cardImg.getContentSize().height/2 + offset*i);
                card.setRotation(-90);
                card.setVisible(false);
                dealCards.push(card);
                this.addChild(card);
                var action = cc.sequence(cc.delayTime(timeOffsetAppear*i), cc.show(), cc.delayTime(timeOffsetAppear*(19-i)), cc.delayTime(timeDealOne* (19 - i)/2), cc.removeSelf());
                card.runAction(action);
            }

            var scaleFactor = player.handOnCards[0].getContentSize().height/cardImg.getContentSize().height;

            for(i = 0; i < 10; i++){
                var mycard  = GuiUtil.createSprite(Sam.res.cardFirstTurnPng);
                this.addChild(mycard);
                mycard.setPosition(winSizeW/2, winSizeH/2 + cardImg.getContentSize().height/2 + offset*2*(10-i));
                mycard.setRotation(-90);
                mycard.setVisible(false);
                var cardPos = player.handOnCards[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cardPos), cc.scaleTo(timeDealOne, scaleFactor), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(timeOffsetAppear*19), cc.delayTime((timeDealOne)*i), cc.show(),
                                            acSpawn,
                                            cc.scaleTo(timeTransform,0,1),
                                            cc.removeSelf());
                mycard.runAction(sequence);
            }

            for(i =0; i< 10; i++){
                player.handOnCards[i].setVisible(false);
            }

            for(i = 0; i< 10; i++){
                player.handOnCards[i].runAction(cc.sequence(cc.delayTime(timeOffsetAppear*19),cc.delayTime(timeTransform+ (timeDealOne)*(i+1)),
                                                            cc.show(),
                                                            cc.scaleTo(timeTransform, 1.0, 1.0)
                                                ));
            }
        }

        else{
            var cardP = player.card;
            cardP.numCount =0;

            for(i = 0; i < 10; i++){
                var layerCard = GuiUtil.createSprite(Sam.res.cardFirstTurnPng);
                this.addChild(layerCard);
                layerCard.setPosition(winSizeW/2, winSizeH/2 + cardImg.getContentSize().height/2 + offset*2*(10-i));
                //layerCard.setPosition(winSizeW/2, winSizeH - cardImg.getContentSize().height/2 - 30 + offset*(18 - 2*i));
                layerCard.setRotation(-90);
                layerCard.setVisible(false);
                var layPos = player.card.convertToWorldSpaceAR(cc.p(0,0));
                layPos = this.convertToNodeSpace(layPos);

                var callBack = function(sender, target){
                    var num = target.getChildByName("num");
                    target.setVisible(true);
                    target.numCount ++;
                    num.setString(target.numCount);
                }

                var acSpawn = cc.spawn(cc.moveTo(timeDealOne,layPos), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(timeOffsetAppear*19),cc.delayTime(delayPlayer*stt + timeDealOne*(i)),
                                            cc.show(),
                                            acSpawn,
                                            cc.scaleTo(timeTransform,1),
                                            cc.callFunc(callBack, this, cardP),
                                            cc.removeSelf());
                layerCard.runAction(sequence);
            }
        }
    },

    danhBai: function (cards) {
        var poss = this.generatePosArrary(cards.length);
        this.recentEffectCards = [];

        for(var i =0;i <poss.length;i++){
            var sam = new Sam.CardSprite(cards[i].id);
            var point = this.convertToNodeSpace(cc.p(cards[i].x, cards[i].y));

            sam.setPosition(point);

            var newPos = cc.p(poss[i].x, poss[i].y);

            var action = cc.spawn(cc.moveTo(.25, newPos),cc.rotateTo(.25,poss[i].alpha));

            var action2 = cc.sequence(cc.scaleTo(.125,1.35),cc.scaleTo(.125,1));
            sam.runAction(cc.sequence(cc.delayTime(i *.075),cc.spawn(new cc.EaseOut(action, 1.5), action2)));
            this.recentEffectCards.push(sam);
            this.addChild(sam);
        }
    },

    addBaiDanh: function(cards){
        cc.log("cards length: " + cards.length);
        var poss = this.generatePosArrary(cards.length);
        this.recentEffectCards = []
        for(var i =0;i <poss.length;i++){
            var sam = new Sam.CardSprite(cards[i]);

            var newPos = cc.p(poss[i].x, poss[i].y);

            var action = cc.spawn(cc.moveTo(.25, newPos),cc.rotateTo(.25,poss[i].alpha));

            var action2 = cc.sequence(cc.scaleTo(.125,1.35),cc.scaleTo(.125,1));
            sam.setPosition(newPos);
            sam.setRotation(poss[i].alpha);
            this.recentEffectCards.push(sam);
            this.addChild(sam);
        }
    },


    firstTurn: function(player){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var layerCard = GuiUtil.createSprite(Sam.res.cardFirstTurnPng);
        layerCard.setPosition(winSize.width/2, winSize.height/2);
        var pos = player.cardFirstTurn.convertToWorldSpaceAR(cc.p(0,0));
        pos = this.convertToNodeSpace(pos);
        this.addChild(layerCard);
        layerCard.setVisible(false);

        var scaleFactor = player.cardFirstTurn.getContentSize().height/ layerCard.getContentSize().height;
        var spawn = cc.spawn(cc.moveTo(0.25, pos), cc.scaleTo(0.25, scaleFactor));
        var sequence = cc.sequence(cc.show(), spawn, cc.scaleTo(0.1, 0, 1));
        layerCard.runAction(sequence);

        player.cardFirstTurn.setVisible(false);
        player.cardFirstTurn.setScaleX(0.0);
        player.cardFirstTurn.runAction(cc.sequence(cc.delayTime(0.25), cc.show(), cc.scaleTo(0.1, 1, 1), cc.delayTime(2.0), cc.hide()));
    },


    generatePosArrary: function(length){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var deltaX = 30;
        var deltaY = 8;
        var deltaAlpha = 10
        var startX = winSize.width/2 ;
        var startY = winSize.height /2 + 90;
        var startAlpha = 0;
        var result = []

        if(length % 2 == 0){
            for(var i = (length / 2 - 1);i>=0;i--){
                var tmp = {x: (startX  - deltaX/2 - i * deltaX),y : (startY - deltaY/2 - deltaY * i), alpha: (startAlpha - deltaAlpha/2 - deltaAlpha * i)}
                result.push(tmp);
            }
            for(var i = 0;i<(length / 2);i++){
                var tmp = {x: (startX  + deltaX/2 + i * deltaX),y : (startY - deltaY/2 - deltaY * i), alpha: (startAlpha + deltaAlpha/2 + deltaAlpha * i)}
                result.push(tmp);
            }
            return result;
        }
        else
        {
            for(var i = (Math.floor(length / 2) );i>=1;i--){
                var tmp = {x: (startX  - i * deltaX),y : (startY - deltaY * i), alpha: (startAlpha - deltaAlpha * i)}
                result.push(tmp);
            }
            result.push({x: startX ,y:startY - deltaY/2,alpha: 0})
            for(var i = 1;i<=(Math.floor(length / 2));i++){
                var tmp = {x: (startX  + i * deltaX),y : (startY  - deltaY * i), alpha: (startAlpha  + deltaAlpha * i)}
                result.push(tmp);
            }
            return result;
        }
    },

    clearRecentCards: function(){
        for(var  i = 0; i < this.recentEffectCards.length; i++){
            var card = this.recentEffectCards[i];
            card.runAction(cc.sequence(cc.fadeOut(0.75), cc.removeSelf()));
        }
        this.recentEffectCards = [];
    },

    moneyFly: function(posSrc,posDst,time,delay,visible)
    {

        var rdChip = Math.floor(Math.random() * 6 + 1);
        if(rdChip > 6)
            rdChip = 6;
        var chip = GuiUtil.createSprite("res/common/" + "chip/chip"+rdChip+".png");

        var rdX = Math.random() * 200;
        var rdY = Math.random() * 200;

        this.addChild(chip,3);
        chip.setPosition(posSrc);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-100,-100)),cc.p(rdX,rdY)),posDst];

        this.bezierEffect(chip,time,delay,config,visible);
    },

    bezierEffect: function(target,time,delay,config,visible)
    {
        alert("2222");
        target.setVisible(visible);
        target.runAction(cc.sequence(cc.delayTime(delay),cc.show(),new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(1),cc.removeSelf()));
    },

    toitrang: function(type,handOnCards,enemy,enemyCards)
    {
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var center = cc.p(mainContentSize.width/2,mainContentSize.height/2);
        //this.rect = cc.rect(center.x - 185,center.y + 20,300,200);
        var time = 0;

        if(!enemy)
        {
            for(var i=0;i<handOnCards.length;i++)
            {
                var card = new Sam.CardSprite(handOnCards[i].id);
                this.addChild(card);
                card.setPosition(this.convertToNodeSpace(handOnCards[i].convertToWorldSpaceAR(cc.p(0, 0))));

                card.runAction(cc.sequence(cc.delayTime(time+=.065),new cc.EaseExponentialOut(cc.spawn(cc.scaleTo(.25,.75),cc.moveTo(.25,cc.p(center.x - 110 + 25 * i, center.y - 100))))));
                handOnCards[i].runAction(cc.sequence(cc.delayTime(time),cc.hide()));
            }

        }
        else
        {
            for(var i=0;i<enemyCards.length;i++)
            {
                var card = new Sam.CardSprite(enemyCards[i]);
                this.addChild(card);
                card.setPosition(this.convertToNodeSpace(enemy.convertToWorldSpaceAR(cc.p(0,0))));

                card.setScale(.75);
                card.runAction(cc.sequence(cc.delayTime(time+=.065), new cc.EaseExponentialOut(cc.spawn(cc.scaleTo(.25,.75),cc.moveTo(.25,cc.p(center.x - 110 + 25 * i, center.y - 100))))));
                enemy.setVisible(false);
            }

        }

        var effect = null;
        var effect1 = null;
        switch (type)
        {
            case 1:
            {
                //effect = this.createAnimation("Samdinh");
                effect = GuiUtil.createSprite(Sam.res.nenEffectVangPng);
                effect1 = GuiUtil.createSprite(Sam.res.effectSamDinhPng);
                effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
                effect.addChild(effect1);
                break;
            }
            case 2:
            {
                effect = GuiUtil.createSprite(Sam.res.nenEffectVangPng);
                effect1 = GuiUtil.createSprite(Sam.res.effectTuQuyHeoPng);
                effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
                effect.addChild(effect1);
                break;
            }
            case 3:
            {
                effect = GuiUtil.createSprite(Sam.res.nenEffectVangPng);
                effect1 = GuiUtil.createSprite(Sam.res.effectNamDoiPng);
                effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
                effect.addChild(effect1);
                break;
            }
            case 4:
            {
                //effect = this.createAnimation("Dongmau");
                effect = GuiUtil.createSprite(Sam.res.nenEffectVangPng);
                effect1 = GuiUtil.createSprite(Sam.res.effectDongMauPng);
                effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
                effect.addChild(effect1);
                break;
            }
        }

        if(!effect){
            return;
        }
        else{
            this.addChild(effect);
            effect.setPosition(cc.p(center.x, center.y + 80));
            effect.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2)));
        }
    },

    chansamthanhcong: function(pos)
    {
        var effect = GuiUtil.createSprite(Sam.res.effectChanSamThanhCongPng);
        this.addChild(effect);
        effect.setPosition(pos);
        effect.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2), cc.fadeOut(0.2), cc.removeSelf()));
        //return effect;
    },

    baosamthatbai: function(pos)
    {
        var effect = GuiUtil.createSprite(Sam.res.effectSamThatBaiPng);
        this.addChild(effect);
        effect.setPosition(pos);
        effect.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2), cc.fadeOut(0.2), cc.removeSelf()));
    },

    addEffectSanhToiCot: function(){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        effect = GuiUtil.createSprite(Sam.res.nenSanhToiCotPng);
        effect1 = GuiUtil.createSprite(Sam.res.effectSanhToiCotPng);
        effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
        effect.addChild(effect1);
        effect.setPosition(winSize.width/2, winSize.height - 100);
        this.addChild(effect);
        effect.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(.5), cc.fadeOut(0.2), cc.removeSelf()));
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
    },
});
