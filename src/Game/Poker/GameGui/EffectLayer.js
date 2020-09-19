Poker.EffectLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.effectList = [];
        this.chatImage = [];
        this.demLui = null;
        for (var i=0; i< Poker.gameLogic.maxPlayer; i++){
            this.chatImage[i] = null;
        }
        this.effectUpdateMatch = [];
        this.effectChiaBai = [];
        this.effectWait = null;
    },

    clearEffect: function(){
        for(var i = 0; i < Poker.gameLogic.maxPlayer; i++) {
            if (this.chatImage[i]){
                this.chatImage[i].removeFromParent();
                this.chatImage[i] = null;
            }
        }
    },


    clearEffectUpdateMatch: function(){
        this.stopAllActions();
        for(var i = 0 ; i < this.effectUpdateMatch.length; i++){
            var effectItem = this.effectUpdateMatch[i];
            effectItem.stopAllActions();
            effectItem.removeFromParent();
        }
        this.effectUpdateMatch = [];
        this.hideEffectBoBaiDep();
    },

    clearEffectChiaBai: function(){
        cc.log("clearEffectChiaBai");
        for(var i = 0 ; i < this.effectChiaBai.length; i++){
            var effectItem = this.effectChiaBai[i];
            effectItem.stopAllActions();
            effectItem.removeFromParent();
        }
        this.effectChiaBai = [];
    },

    moneyFly: function(posSrc,posDst,time,delay,visible, showTime)
    {
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip"+ Poker.gameLogic.moneyType + ".png");
        var rdX = Math.random() * 200;
        var rdY = Math.random() * 200;
        this.addChild(chip,3);
        chip.setPosition(posSrc);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-100,-100)),cc.p(rdX,rdY)),posDst];
        this.effectUpdateMatch.push(chip);

        this.bezierEffect(chip,time,delay,config,visible, showTime);
    },

    bezierEffect: function(target,time,delay,config,visible, timeShow)
    {
        target.setVisible(visible);
        if(timeShow == undefined || timeShow == null){
            target.runAction(cc.sequence(cc.delayTime(delay),cc.show(),new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(1),cc.hide()));
        }
        else{
            target.runAction(cc.sequence(cc.delayTime(delay),cc.show(),new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(timeShow),cc.hide()));
        }

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
        this.chatImage[localChair].setLocalZOrder(2);

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


    chiaBai: function(player, num, stt){
        var totalCard = num*2;

        var timeSlow = 5;
        var timeOffsetAppear = 0.02;
        var timeDealOne = 0.05*timeSlow;
        var timeDif =  0.08*timeSlow;
        var timeTransform = 0.01*timeSlow;

        if(player.index == 0) {
            for ( var i = 0; i < totalCard; i++) {
                var card = new Poker.CardSprite(52);
                card.setScale(0.25);
                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);
                card.setPosition(pos);
                card.setVisible(false);
                this.addChild(card);
                var action = cc.sequence(cc.delayTime(timeOffsetAppear), cc.show(), cc.delayTime(timeDif* (totalCard - 1 - i)), cc.hide());
                card.runAction(action);
                this.effectChiaBai.push(card);
            }
        }

        if(player.index == 0){
            for(var i = 0; i < 2; i++){
                var desScale = player.cardList[i].getScale();
                var curCard = player.cardList[i];
                var mycard  = new Poker.CardSprite(52);
                this.effectChiaBai.push(mycard);

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);

                mycard.setScale(0.25);
                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);


                var rdX = Math.random() * 200;
                var rdY = Math.random() * 200;

                var posSrc = mycard.getPosition();
                var desPos = cardPos;

                var config = [posSrc, cc.p(posSrc.x + (desPos.x - posSrc.x)*0.75 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.17, posSrc.y + (desPos.y - posSrc.y)*0.75), desPos];

                //target.runAction(new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(1),cc.removeSelf()));
                //this.bezierEffect(chip,time,delay,config,visible);
                //cc.moveTo(timeDealOne,cardPos)

                var acSpawn =  cc.spawn(cc.bezierTo(timeDealOne,config), cc.scaleTo(timeDealOne, curCard.getScale()), cc.rotateTo(timeDealOne, curCard.getRotationX()));

                var sequence =  cc.sequence(cc.delayTime(timeOffsetAppear), cc.delayTime(timeDif*(i*num + stt)), cc.show(),
                    acSpawn, cc.EaseBackOut.create(cc.scaleTo(timeTransform, 0, desScale)), cc.hide());
                mycard.runAction(sequence);
            }

            for(var i = 0; i< 2; i++){
                var desScale = player.cardList[i].getScale();
                player.cardList[i].setScaleX(0);
                player.cardList[i].runAction(cc.sequence(cc.delayTime(timeOffsetAppear),
                    cc.delayTime(timeDif*(i*num+stt) + timeDealOne),
                    cc.EaseBackOut.create(cc.scaleTo(timeTransform, desScale, desScale)),
                    cc.show()
                ));
            }
        }
        else{

            for(var i = 0; i < 2; i++){
                var desScale = player.cardList[i].getScale();
                var curCard = player.cardList[i];
                var mycard  = new Poker.CardSprite(52);
                this.effectChiaBai.push(mycard);

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);

                mycard.setScale(0.25);
                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var posSrc = mycard.getPosition();
                var desPos = cardPos;
                var config = [posSrc, cc.p(posSrc.x/2 + desPos.x/2 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.29, posSrc.y/2 + desPos.y/2), desPos];

                var acSpawn =  cc.spawn(cc.bezierTo(timeDealOne,config), cc.scaleTo(timeDealOne, curCard.getScale()), cc.rotateTo(timeDealOne, curCard.getRotationX()));

                var sequence =  cc.sequence(cc.delayTime(timeOffsetAppear), cc.delayTime(timeDif*(i*num + stt)), cc.show(),
                    acSpawn, cc.hide());
                mycard.runAction(sequence);
            }

            for(var i = 0; i< 2; i++){
                var desScale = player.cardList[i].getScale();
                player.cardList[i].runAction(cc.sequence(cc.delayTime(timeOffsetAppear),
                    cc.delayTime(timeDif*(i*num+stt) + timeDealOne),
                    cc.show()
                ));
            }

        }


    },

    addTienVoPos: function(posSrc, posDst, time, delay, visible){
        var rdChip = Poker.gameLogic.moneyType;
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip" + rdChip + ".png");
        chip.setScale(0.91);
        var rdX = Math.random() * 200;
        var rdY = Math.random() * 200;

        this.addChild(chip,3);
        chip.setPosition(posSrc);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-100,-100)),cc.p(rdX,rdY)),posDst];
        this.effectUpdateMatch.push(chip);
        this.bezierEffect(chip,time,delay,config,visible);
    },

    chiaBaiPublic: function(){

        cc.log("effect chiaBaiPublic");
        var timeSlow = 5;
        var timeDealOne = 0.05*timeSlow;
        var timeDealOne2 = 0.02*timeSlow;
        var timeLatBai = 0.02*timeSlow

        var minCard = Poker.gameLogic.publicOldSize;
        var maxCard = Poker.gameLogic.publicCard.length;

        var countSoLanChia = 0;

        if(minCard < 2){
            countSoLanChia = (maxCard - 3) + 1;
        }else{
            countSoLanChia = maxCard - minCard + 1;
        }

        var curCardHasDeal = minCard;
        var nextCardHasDeal;

        var delayStart = 0;

        while(curCardHasDeal < maxCard){
            if(curCardHasDeal < 2){
                nextCardHasDeal = 3;
            }
            else{
                nextCardHasDeal = curCardHasDeal + 1;
            }

            for(var i = curCardHasDeal; i < nextCardHasDeal; i++){
                var curCard = this.gameScene.publicCard[curCardHasDeal];

                var pos = curCard.convertToWorldSpaceAR(cc.p(0,500));
                pos = this.convertToNodeSpace(pos);

                var mycard  = new Poker.CardSprite(52);
                mycard.setScale(0.25);
                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = curCard.convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cardPos), cc.scaleTo(timeDealOne, curCard.getScale(), curCard.getScale()), cc.rotateTo(timeDealOne, curCard.getRotation()));

                var sequence =  cc.sequence(cc.delayTime(delayStart), cc.show(), acSpawn, cc.scaleTo(timeLatBai, 0, curCard.getScale()), cc.removeSelf());
                mycard.runAction(sequence);
            }

            for(var i = curCardHasDeal; i < nextCardHasDeal; i++){
                var curCard = this.gameScene.publicCard[i];
                var minCardSprite = this.gameScene.publicCard[curCardHasDeal];

                var pos = minCardSprite.convertToWorldSpaceAR(cc.p(0, 0));
                pos = this.convertToNodeSpace(pos);

                var effectCard  = new Poker.CardSprite(curCard.id);
                effectCard.setScale(curCard.getScale());
                effectCard.setPosition(pos);
                effectCard.setVisible(false);
                effectCard.setScaleX(0);
                this.addChild(effectCard);

                var cardPos = curCard.convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne2*(i - minCard + 1), cardPos), cc.scaleTo(timeDealOne2*(i - minCard + 1),
                    curCard.getScale(), curCard.getScale()), cc.rotateTo(timeDealOne2*(i - minCard + 1), curCard.getRotation()));

                var sequence =  cc.sequence(cc.delayTime(delayStart),cc.delayTime(timeDealOne + timeLatBai), cc.show(), cc.scaleTo(timeLatBai, curCard.getScale(), curCard.getScale()), acSpawn, cc.removeSelf());
                effectCard.runAction(sequence);
            }


            for(var i = curCardHasDeal; i< nextCardHasDeal; i++){
                var curCard = this.gameScene.publicCard[i];
                curCard.setVisible(false);
                curCard.runAction(cc.sequence(
                    cc.delayTime(delayStart),
                    cc.delayTime((timeDealOne + timeLatBai) +  timeLatBai + timeDealOne2*(i - curCardHasDeal + 1)),
                    cc.show()
                ));
            }

            delayStart += timeDealOne + timeLatBai + timeLatBai + timeDealOne2*(nextCardHasDeal - curCardHasDeal + 1);
            curCardHasDeal = nextCardHasDeal;
        }
    },

    showBoBaiDep: function(boBaiId){

        cc.log("showBoBaiDep");
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var center = cc.p(mainContentSize.width/2,mainContentSize.height*0.5);

        if(this.effectWait){
            this.effectWait.removeFromParent();
            this.effectWait = null;
        }

        this.effectWait = GuiUtil.createSprite(Poker.GameLogic.getResourceBoBai(boBaiId));
        this.addChild(this.effectWait);
        this.effectWait.setPosition(cc.p(center.x, center.y));
        this.effectWait.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2)));
    },

    hideEffectBoBaiDep: function(){
        cc.log("hide bo bai dep");
        if(this.effectWait){
            cc.log("remove anh bai dep");
            this.effectWait.removeFromParent();
            this.effectWait = null;
        }
    },

    hideEffectWhenChiaBai: function(){

    }
});
