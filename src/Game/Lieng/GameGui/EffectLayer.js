Lieng.EffectLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.effectList = [];
        this.chatImage = [];
        this.demLui = null;
        this.effectBoBai = null;
        for (var i=0; i< Lieng.MAX_PLAYER; i++){
            this.chatImage[i] = null;
        }
        this.effectUpdateMatch = [];
        this.effectChiaBai = [];
        this.effectWait = null;
    },

    clearEffect: function(){
        for(var i = 0; i < Lieng.MAX_PLAYER; i++) {
            if (this.chatImage[i]){
                this.chatImage[i].removeFromParent();
                this.chatImage[i] = null;
            }
        }
    },

    clearEffectUpdateMatch: function(){
        cc.log(" Effect layer: clearEffectUpdateMath");
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
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip"+ Lieng.gameLogic.moneyType + ".png");
        var rdX = Math.random() * 200;
        var rdY = Math.random() * 200;
        this.addChild(chip,3);
        chip.setPosition(posSrc);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-100,-100)),cc.p(rdX,rdY)),posDst];
        this.bezierEffect(chip,time,delay,config,visible, showTime);
        this.effectUpdateMatch.push(chip);
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
        var totalCard = num*3;

        Lieng.timeSlow = 3;
        Lieng.timeOffsetAppear = 0.02;
        Lieng.timeDealOne = 0.05*Lieng.timeSlow;
        Lieng.timeDif =  0.08*Lieng.timeSlow;
        Lieng.timeTransform = 0.02*Lieng.timeSlow;

        if(player.index == 0) {
            for ( var i = 0; i < totalCard; i++) {
                var card = new Lieng.CardSprite(52);
                card.setScale(0.25);
                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);
                card.setPosition(pos);
                card.setVisible(false);
                this.addChild(card);
                var action = cc.sequence(cc.delayTime(Lieng.timeOffsetAppear), cc.show(), cc.delayTime(Lieng.timeDif* (totalCard - 1 - i)), cc.hide());
                card.runAction(action);
                this.effectChiaBai.push(card);
            }
        }

        if(player.index == 0){
            for(var i = 0; i < 3; i++){
                var desScale = player.cardList[i].getScale();
                var curCard = player.cardList[i];
                var mycard  = new Lieng.CardSprite(52);
                this.effectChiaBai.push(mycard);
                mycard.setAnchorPoint(cc.p(0, 0.5));

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
                //
                var acSpawn =  cc.spawn(cc.bezierTo(Lieng.timeDealOne,config), cc.scaleTo(Lieng.timeDealOne, curCard.getScale()), cc.rotateTo(Lieng.timeDealOne, curCard.getRotationX()));
                //
                var sequence =  cc.sequence(cc.delayTime(Lieng.timeOffsetAppear), cc.delayTime(Lieng.timeDif*(i*num + stt)), cc.show(),
                    acSpawn, cc.delayTime(Lieng.timeDif*(2-i)*num),
                    cc.moveBy(0.1*Lieng.timeSlow, cc.p(-25*i, 0)),
                    cc.scaleTo(Lieng.timeTransform, 0, desScale),
                    cc.hide()
                );

                mycard.runAction(sequence);
            }

            player.setPositionChiaBai();

            for(var i = 0; i< 3; i++){
                var desScale = player.cardList[i].getScale();
                player.cardList[i].setScaleX(0);
                player.cardList[i].runAction(cc.sequence(cc.delayTime(Lieng.timeOffsetAppear),
                    cc.delayTime(Lieng.timeDif*(2*num+stt) + Lieng.timeDealOne + 0.1*Lieng.timeSlow + Lieng.timeTransform),
                    cc.show(),
                    cc.scaleTo(Lieng.timeTransform, desScale, desScale)
                    //cc.EaseBackOut.create(cc.scaleTo(timeTransform, desScale, desScale))
                ));
            }
        }
        else{

            for(var i = 0; i < 3; i++){
                var desScale = player.cardList[i].getScale();
                var curCard = player.cardList[i];
                var mycard  = new Lieng.CardSprite(52);
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

                var acSpawn =  cc.spawn(cc.bezierTo(Lieng.timeDealOne,config), cc.scaleTo(Lieng.timeDealOne, curCard.getScale()), cc.rotateTo(Lieng.timeDealOne, curCard.getRotationX()));

                var sequence =  cc.sequence(cc.delayTime(Lieng.timeOffsetAppear), cc.delayTime(Lieng.timeDif*(i*num + stt)), cc.show(),
                    acSpawn, cc.hide());
                mycard.runAction(sequence);
            }

            for(var i = 0; i< 3; i++){
                var desScale = player.cardList[i].getScale();
                player.cardList[i].runAction(cc.sequence(cc.delayTime(Lieng.timeOffsetAppear),
                    cc.delayTime(Lieng.timeDif*(i*num+stt) + Lieng.timeDealOne),
                    cc.show()
                ));
            }

        }


    },

    addTienVoPos: function(posSrc, posDst, time, delay, visible){
        var rdChip = Lieng.gameLogic.moneyType;
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

    showBoBaiDep: function(boBaiId){
        if(boBaiId <= 9){
            return;
        }
        cc.log("addEffectHas4DoiThong");
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var center = cc.p(mainContentSize.width/2,mainContentSize.height*0.5);

        if(this.effectWait){
            this.effectWait.removeFromParent();
            this.effectWait = null;
        }

        this.effectWait = GuiUtil.createSprite(Lieng.GameLogic.getResourceBoBai(boBaiId));
        this.addChild(this.effectWait);
        this.effectWait.setPosition(cc.p(center.x, center.y + 80));
        this.effectWait.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2)));
    },

    hideEffectBoBaiDep: function(){
        if(this.effectWait){
            this.effectWait.removeFromParent();
            this.effectWait = null;
        }
    },



    hideEffectWhenChiaBai: function(){

    }
});
