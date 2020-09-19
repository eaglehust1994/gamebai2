XiZach.EffectLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.effectList = [];
        this.chatImage = [];
        this.demLui = null;
        this.effectBoBai = null;
        for (var i=0; i< XiZach.MAX_PLAYER; i++){
            this.chatImage[i] = null;
        }
        this.effectUpdateMatch = [];
        this.effectChiaBai = [];
        this.effectWait = null;
    },

    clearEffect: function(){
        for(var i = 0; i < XiZach.MAX_PLAYER; i++) {
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
        //var chip = new cc.Sprite("res/common/" + "chip/vinChip"+ XiZach.gameLogic.moneyType + ".png");
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip"+ XiZach.gameLogic.moneyType + ".png");//new cc.Sprite("res/common/" + "chip/vinChip"+ XiZach.gameLogic.moneyType + ".png");

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
        var totalCard = num*2;
        cc.log("num: " + num + " stt: " + stt );

        XiZach.timeSlow = 3;
        XiZach.timeOffsetAppear = 0.02;
        XiZach.timeDealOne = 0.05*XiZach.timeSlow;
        XiZach.timeDif =  0.08*XiZach.timeSlow;
        XiZach.timeTransform = 0.02*XiZach.timeSlow;

        if(player.index == 0){
            for(var i = 0; i < 2; i++){
                var desScale = player.cardList[i].getParent().getScale();
                var curCard = player.cardList[i];
                var mycard  = new XiZach.CardSprite(52);
                this.effectChiaBai.push(mycard);
                mycard.setAnchorPoint(cc.p(0.5, 0.5));
                mycard.setScale(0.5);

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);
                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);


                var posSrc = mycard.getPosition();
                var desPos = cardPos;

                var config = [posSrc, cc.p(posSrc.x + (desPos.x - posSrc.x)*0.75 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.17, posSrc.y + (desPos.y - posSrc.y)*0.75), desPos];
                //
                var acSpawn =  cc.spawn(cc.bezierTo(XiZach.timeDealOne,config), cc.scaleTo(XiZach.timeDealOne, curCard.getParent().getScale()), cc.rotateTo(XiZach.timeDealOne, curCard.getRotationX()));
                //
                var sequence =  cc.sequence(cc.delayTime(XiZach.timeDif*(i*num + stt)), cc.show(),
                    acSpawn,
                    //cc.delayTime(XiZach.timeDif*(1-i)*num),
                    cc.scaleTo(XiZach.timeTransform, 0, desScale),
                    cc.hide()
                );

                mycard.runAction(sequence);
            }

            for(var i = 0; i< 2; i++){
                var desScale = player.cardList[i].rootScale;
                player.cardList[i].setScaleX(0);
                player.cardList[i].runAction(cc.sequence(
                    cc.delayTime(XiZach.timeDif*(i*num+stt) + XiZach.timeDealOne + XiZach.timeTransform),
                    cc.show(),
                    cc.scaleTo(XiZach.timeTransform, desScale, desScale)
                    //cc.EaseBackOut.create(cc.scaleTo(timeTransform, desScale, desScale))
                ));
            }
        }
        else{
            for(var i = 0; i < 2; i++){
                var desScale = player.cardList[i].getParent().getScale();
                var desScale = 0.5;
                cc.log("desScale: " + player.index + " " + desScale);
                var mycard  = new XiZach.CardSprite(52);
                mycard.setScale(0.5);
                this.effectChiaBai.push(mycard);

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);

                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var posSrc = mycard.getPosition();
                var desPos = cardPos;
                var config = [posSrc, cc.p(posSrc.x/2 + desPos.x/2 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.29, posSrc.y/2 + desPos.y/2), desPos];

                var acSpawn =  cc.spawn(cc.bezierTo(XiZach.timeDealOne,config), cc.scaleTo(XiZach.timeDealOne, desScale, desScale));
                cc.log("desScale: " + desScale);

                var sequence =  cc.sequence(cc.delayTime(XiZach.timeDif*(i*num + stt)), cc.show(),
                    acSpawn, cc.hide());
                mycard.runAction(sequence);
            }

            for(var i = 0; i< 2; i++){
                player.cardList[i].runAction(cc.sequence(
                    cc.delayTime(XiZach.timeDif*(i*num+stt) + XiZach.timeDealOne),
                    cc.show()
                ));
            }
        }
    },

    addCardToPlayer: function(player){

        XiZach.timeSlow = 3;
        XiZach.timeOffsetAppear = 0.02;
        XiZach.timeDealOne = 0.05*XiZach.timeSlow;
        XiZach.timeDif =  0.08*XiZach.timeSlow;
        XiZach.timeTransform = 0.02*XiZach.timeSlow;

        cc.log("addCardToPlayer");
        cc.log("")
        var cardSize = XiZach.gameLogic.players[player.index].groupCard.getCardSize();
        cc.log("cardSize: " + cardSize);
        var i = cardSize -1;

        if(player.index == 0) {
            var desScale = player.cardList[i].getParent().getScaleY();
            var curCard = player.cardList[i];
            var mycard = new XiZach.CardSprite(52);
            mycard.setScale(0.5);
            this.effectChiaBai.push(mycard);
            mycard.setAnchorPoint(cc.p(0.5, 0.5));

            var cardDealer = this.gameScene.cardDealer;
            var pos = cardDealer.convertToWorldSpaceAR(cc.p(0, 0));
            pos = this.convertToNodeSpace(pos);
            mycard.setPosition(pos);
            mycard.setVisible(false);
            this.addChild(mycard);

            var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0, 0));
            cardPos = this.convertToNodeSpace(cardPos);

            var posSrc = mycard.getPosition();
            var desPos = cardPos;

            var config = [posSrc, cc.p(posSrc.x + (desPos.x - posSrc.x) * 0.75 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x)) * 0.17, posSrc.y + (desPos.y - posSrc.y) * 0.75), desPos];

            var acSpawn = cc.spawn(cc.bezierTo(XiZach.timeDealOne, config), cc.scaleTo(XiZach.timeDealOne, curCard.getParent().getScaleY()), cc.rotateTo(XiZach.timeDealOne, curCard.getRotationX()));
            var sequence = cc.sequence(cc.show(),
                acSpawn,
                cc.scaleTo(XiZach.timeTransform, 0, desScale),
                cc.hide()
            );

            mycard.runAction(sequence);

            var desScale = player.cardList[i].rootScale;
            player.cardList[i].setScaleX(0);
            player.cardList[i].runAction(cc.sequence(
                cc.delayTime(XiZach.timeDealOne + XiZach.timeTransform),
                cc.show(),
                cc.scaleTo(XiZach.timeTransform, desScale, desScale)
            ));
        }

        else{
            var desScale = 0.5;
            cc.log("desScale: " + player.index + " " + desScale);
            var mycard  = new XiZach.CardSprite(52);
            mycard.setScale(0.5);
            this.effectChiaBai.push(mycard);

            var cardDealer = this.gameScene.cardDealer;
            var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
            pos = this.convertToNodeSpace(pos);

            mycard.setPosition(pos);
            mycard.setVisible(false);
            this.addChild(mycard);

            var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
            cardPos = this.convertToNodeSpace(cardPos);

            var posSrc = mycard.getPosition();
            var desPos = cardPos;
            var config = [posSrc, cc.p(posSrc.x/2 + desPos.x/2 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.29, posSrc.y/2 + desPos.y/2), desPos];

            var acSpawn =  cc.spawn(cc.bezierTo(XiZach.timeDealOne, config), cc.scaleTo(XiZach.timeDealOne, desScale, desScale));
            cc.log("desScale: " + desScale);

            var sequence =  cc.sequence(cc.show(),
                   acSpawn,
                   cc.hide()
                );

            mycard.runAction(sequence);

            player.cardList[i].runAction(cc.sequence(
                cc.delayTime(XiZach.timeDealOne),
                cc.show()));
        }
    },

    addCardsToPlayer: function(player, cards){

        XiZach.timeSlow = 3;
        XiZach.timeOffsetAppear = 0.02;
        XiZach.timeDealOne = 0.05*XiZach.timeSlow;
        XiZach.timeDif =  0.08*XiZach.timeSlow;
        XiZach.timeTransform = 0.02*XiZach.timeSlow;

        cc.log("addCardToPlayer: "  + cards.length);
        var cardSize = XiZach.gameLogic.players[player.index].groupCard.getCardSize();
        cc.log("cardSize: " + cardSize);
        var i = cardSize -1;

        if(player.index == 0) {
            for(var i = cardSize - cards.length; i < cardSize; i++){
                cc.log("I: " + i);
                var desScale = player.cardList[i].getParent().getScaleY();
                var curCard = player.cardList[i];
                var mycard = new XiZach.CardSprite(52);
                mycard.setScale(0.5);
                cc.log("desScale: " + desScale);
                this.effectChiaBai.push(mycard);
                mycard.setAnchorPoint(cc.p(0.5, 0.5));

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0, 0));
                pos = this.convertToNodeSpace(pos);
                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0, 0));
                cardPos = this.convertToNodeSpace(cardPos);


                var posSrc = mycard.getPosition();
                var desPos = cardPos;

                var config = [posSrc, cc.p(posSrc.x + (desPos.x - posSrc.x) * 0.75 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x)) * 0.17, posSrc.y + (desPos.y - posSrc.y) * 0.75), desPos];

                var acSpawn = cc.spawn(cc.bezierTo(XiZach.timeDealOne, config), cc.scaleTo(XiZach.timeDealOne, curCard.getParent().getScaleY()), cc.rotateTo(XiZach.timeDealOne, curCard.getRotationX()));
                var sequence = cc.sequence(
                    cc.delayTime((i - cardSize + cards.length)*XiZach.timeDealOne),
                    cc.show(),
                    acSpawn,
                    cc.scaleTo(XiZach.timeTransform, 0, desScale),
                    cc.hide()
                );

                mycard.runAction(sequence);

                var desScale = player.cardList[i].rootScale;
                player.cardList[i].setScaleX(0);
                player.cardList[i].runAction(cc.sequence(
                    cc.delayTime((i - cardSize + cards.length)*XiZach.timeDealOne),
                    cc.delayTime(XiZach.timeDealOne + XiZach.timeTransform),
                    cc.show(),
                    cc.scaleTo(XiZach.timeTransform, desScale, desScale)
                ));
            }
        }
        else{
            for(var i = cardSize - cards.length; i < cardSize; i++) {
                cc.log("I: " + i)
                var desScale = player.cardList[i].getParent().getScale();
                var desScale = 0.5;
                cc.log("desScale: " + player.index + " " + desScale);
                var mycard  = new XiZach.CardSprite(52);
                mycard.setScale(0.5);
                this.effectChiaBai.push(mycard);

                var cardDealer = this.gameScene.cardDealer;
                var pos = cardDealer.convertToWorldSpaceAR(cc.p(0,0));
                pos = this.convertToNodeSpace(pos);

                mycard.setPosition(pos);
                mycard.setVisible(false);
                this.addChild(mycard);

                var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                cardPos = this.convertToNodeSpace(cardPos);

                var posSrc = mycard.getPosition();
                var desPos = cardPos;
                var config = [posSrc, cc.p(posSrc.x/2 + desPos.x/2 + (Math.abs(desPos.y - posSrc.y) + Math.abs(desPos.x - posSrc.x))*0.29, posSrc.y/2 + desPos.y/2), desPos];

                var acSpawn =  cc.spawn(cc.bezierTo(XiZach.timeDealOne, config), cc.scaleTo(XiZach.timeDealOne, desScale, desScale));
                cc.log("desScale: " + desScale);

                var sequence =  cc.sequence(
                    cc.delayTime((i - cardSize + cards.length)*XiZach.timeDealOne),
                    cc.show(),
                    acSpawn,
                    cc.hide()
                );

                mycard.runAction(sequence);

                //var desScale = player.cardList[i].getParent().getScale();
                player.cardList[i].runAction(cc.sequence(
                    cc.delayTime((i - cardSize + cards.length)*XiZach.timeDealOne),
                    cc.delayTime(XiZach.timeDealOne),
                    cc.show()));
            }
        }
    },

    addTienVoPos: function(posSrc, posDst, time, delay, visible){
        var rdChip = XiZach.gameLogic.moneyType;
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip" + rdChip + ".png");//new cc.Sprite("res/common/" + "chip/vinChip" + rdChip + ".png");

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

        this.effectWait = GuiUtil.createSprite(XiZach.GameLogic.getResourceBoBai(boBaiId));//new cc.Sprite(XiZach.GameLogic.getResourceBoBai(boBaiId));
        this.addChild(this.effectWait);
        this.effectWait.setPosition(cc.p(center.x, center.y + 80));
        this.effectWait.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2)));
    },


    addThongBaoNoChuong: function(){
        cc.log("addThongBaoNoChuong");
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var center = cc.p(mainContentSize.width/2,mainContentSize.height*0.5);

        if(this.effectNoChuong){
            this.effectNoChuong.removeFromParent();
            this.effectNoChuong = null;
        }

        //this.effectNoChuong = new cc.Sprite("res/CardGame/backjack/bandanglamcai.png");
        this.effectNoChuong = GuiUtil.createSprite("res/CardGame/backjack/bandanglamcai.png");
        this.addChild(this.effectNoChuong);
        this.effectNoChuong.setPosition(cc.p(center.x, center.y + 80));
        this.effectNoChuong.runAction(cc.sequence(cc.delayTime(.1), cc.fadeIn(0.2)));
    },

    hideThongBaoNoChuong: function(){
        if(this.effectNoChuong){
            this.effectNoChuong.removeFromParent();
            this.effectNoChuong = null;
        }
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
