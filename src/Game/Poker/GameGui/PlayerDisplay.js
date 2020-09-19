//
Poker.PlayerDisplay = cc.Node.extend({
    ctor: function() {
        this._super();
        this.handOnCards = [];
        this.baiEndGame = [];
        this.index = -1;
        this.gameScene = null;
        this.cards = [];
        this.isWaitingDanhBien = false;
        this.danhBienLevel = 1;
        this.hasMoBai = false;
        this.nodeMoney = null;
        this.endGameCards = [];
    },

    setPanel: function(panel) {
        this.panel = panel;
    },

    setVisible: function(isVisible){
        cc.Node.prototype.setVisible.call(this, isVisible);
        this.panel.setVisible(isVisible);
    },

    refresh: function(){
        this.setPositionStart();
    },

    highLightMaxCards: function(){
        cc.log("hightLightMaxCards");

        for(var i = 0; i < Poker.gameLogic.publicCard.length; i++){
            this.gameScene.publicCard[i].runToDark();
        }

        for(var i = 0; i < Poker.gameLogic.players[this.index].cards.length; i++){
            if(this.index == 0) {
                this.cardList[i].runToDark();
            }
            else{
                this.cardEndGame[i].runToDark();
            }
        }

        for(var i = 0; i < Poker.gameLogic.players[this.index].cards.length; i++){
            for(var j = 0; j < Poker.gameLogic.players[this.index].maxCards.length; j++){
                if(this.index == 0) {
                    if (this.cardList[i].id == Poker.gameLogic.players[this.index].maxCards[j]) {
                        this.cardList[i].runHighlight();
                    }
                }
                else{
                    if (this.cardEndGame[i].id == Poker.gameLogic.players[this.index].maxCards[j]) {
                        this.cardEndGame[i].runHighlight();
                    }
                }
            }
        }

        for(var i = 0; i < Poker.gameLogic.publicCard.length; i++){
            for(var j = 0; j < Poker.gameLogic.players[this.index].maxCards.length; j++){
                if(Poker.gameLogic.publicCard[i] == Poker.gameLogic.players[this.index].maxCards[j]){
                    this.gameScene.publicCard[i].runHighlight();
                }
            }
        }
    },

    showWiner: function(){
        this.iconWin.setVisible(true);
        this.iconWin.setOpacity(0);
        this.iconWin.runAction(cc.fadeIn(0.5));
    },

    initMyPlayer:function(){
        this.setVisible(true);
    },

    initWithCards: function(cards){
        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.cards.push(cards[i]);
        }

        for(var i = 0; i < cards.length; i++){
            cc.log("initWithCards: " + i + " " + cards[i]);
            //this.handOnCards[i].setTexture(cc.textureCache.addImage(Poker.CardSprite.getResource(cards[i])));
            if(this.index == 0){
                this.cardList[i].setId(cards[i]);
            }
            else{
                this.cardEndGame[i].setId(cards[i]);
            }
        }
    },


    chiaBaiInstance: function(cards){
        if(this.index == 0){
            this.cards = [];
            for(var i = 0; i < cards.length; i++){
                this.cards.push(cards[i]);
            }

            for(var i = 0; i < cards.length; i++){
                cc.log("initWithCards: " + i + " " + cards[i]);
                //this.handOnCards[i].setTexture(cc.textureCache.addImage(Poker.CardSprite.getResource(cards[i])));
                if(this.index == 0){
                    this.cardList[i].stopAllActions();
                    this.cardList[i].runToNormal();
                    this.cardList[i].setId(cards[i]);
                }
                this.cardList[i].setVisible(true);
            }
        }
        else{
            for(var i = 0; i < this.cardList.length; i++){
                this.cardList[i].stopAllActions();
                this.cardList[i].runToNormal();
                this.cardList[i].setVisible(true);
            }
        }


    },

    hideBai: function(){
        for(var i = 0; i < this.handOnCards.length; i++){
            this.handOnCards[i].setVisible(false);
        }
    },

    initMoneyBetButton: function(moneyBet){
    },

    initPlayerDisplay: function(){
        cc.log("initPlayerDisplay index player" + this.index);
        this.cardList = [];
        this.cardEndGame = [];

        for(var i = 1; i <= 3; i++){
          //  var card = this.panel.getChildByName("card" + i);
            this.panel.getChildByName("card" + i).setVisible(false);

            if(this.index != 0){
             //  var cardEndGame = this.panel.getChildByName("cardEndGame" + i);
                this.panel.getChildByName("cardEndGame" + i).setVisible(false);
            }
        }

        for(var i = 1; i <= 2; i++){
            var card = this.panel.getChildByName("card" + i);
            card.setVisible(false);

            var cardNew = new Poker.CardSprite(52);
            cardNew.setPosition(card.getPosition());

            if(this.index == 0){
                cardNew.setPositionX(card.getPositionX() + 70);
            }

            cc.log("indexLaBai: " + i);
            cardNew.setScale(card.getScaleX());
            cc.log("indexLaBai: " + i);
            cardNew.setRotationX(card.getRotationX());
            cardNew.setRotationY(card.getRotationY());

            cardNew.setVisible(false);

            cardNew.rootPosition = cardNew.getPosition();
            cardNew.rootScale = cardNew.getScaleX();
            this.panel.addChild(cardNew);
            this.cardList.push(cardNew);

            if(this.index != 0){
                var cardEndGame = this.panel.getChildByName("cardEndGame" + i);
                cardEndGame.setVisible(false);

                var cardNew2 = new Poker.CardSprite(52);
                cardNew2.setPosition(cardEndGame.getPosition());
                cc.log("indexLaBai: " + i);
                cardNew2.setScale(cardEndGame.getScaleX());
                cc.log("indexLaBai: " + i);
                cardNew2.setRotationX(cardEndGame.getRotationX());
                cardNew2.setRotationY(cardEndGame.getRotationY());
                cardNew2.rootPosition = cardNew2.getPosition();
                cardNew2.rootScale = cardNew2.getScaleX();
                cardNew2.setVisible(false);
                this.panel.addChild(cardNew2);
                this.cardEndGame.push(cardNew2);
            }
        }
        //var sprite = new cc.Sprite(Poker.res.circleEffectPng);
        var sprite = GuiUtil.createSprite(Poker.res.circleEffectPng);//new cc.Sprite(Poker.res.circleEffectPng);

        sprite.setColor(cc.GREEN);

        this.uiTimer = new cc.ProgressTimer(sprite);
        this.uiTimer.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.uiTimer.setReverseDirection(true);

        this.avatarPanel = this.panel.getChildByName("avatarPanel");
        this.avatarPanel.rootScale = this.avatarPanel.getScaleX();
        var size = this.avatarPanel.getChildByName("bg_progress").getContentSize();
        this.uiTimer.setPosition(size.width/2,size.height/2);
        this.uiTimer.setPercentage(0);
        this.avatarPanel.getChildByName("bg_progress").addChild(this.uiTimer);
        this.iconWin = this.avatarPanel.getChildByName("iconWin");
        this.allInIcon = this.avatarPanel.getChildByName("allInIcon");
        this.callIcon = this.avatarPanel.getChildByName("callIcon");
        this.callText = this.callIcon.getChildByName("text");
        this.raiseIcon = this.avatarPanel.getChildByName("raseIcon");
        this.uiAvatar = this.avatarPanel.getChildByName("btnAvatar");
        this.avatar = this.avatarPanel.getChildByName("avatar");
        this.uiName = this.avatarPanel.getChildByName("name");
        this.uiGold = this.avatarPanel.getChildByName("gold");
        this.view = this.avatarPanel.getChildByName("view");
        this.avatarPanel.getChildByName("view").setVisible(false);
        this.iconOutRoom = this.avatarPanel.getChildByName("iconOut");
        this.avatarPanel.getChildByName("iconOut").setVisible(false);

        this.blindIcon = this.panel.getChildByName("blindIcon");
        this.panel.getChildByName("blindIcon").setVisible(false);


        this.betLayer = this.panel.getChildByName("betLayer");
        this.lbBet =  this.betLayer.getChildByName("lbBet");
        this.iconVin = this.betLayer.getChildByName("iconVin");
        //this.iconVin = ccui.helper.seekWidgetByName(this.betLayer, "iconVin");





    },


    updateWithPlayer: function(player)
    {
        if(player.status == 0)
        {
            this.setVisible(false);
            return;
        }

        this.setVisible(true);
        this.uiName.setString(StringUtility.rutGonName(player["nickName"]));
        this.uiGold.setString(StringUtility.rutGonNumBer(player["currentMoney"]));
        // Thay doi avatar theo loai

        var avatarUrl = player["avatar"];
        this.setAvatarChuan(avatarUrl);

        if(player.status == Poker.GameStatus.VIEWING)     // dang xem
        {
            this.viewing(true);
        }
        else if(player.status == Poker.GameStatus.OUT_GAME)
        {
            this.setVisible(false);
        }
        else if(player.status == Poker.GameStatus.SITTING && Poker.gameLogic.inBattle == true)
        {
            this.viewing(true);
            //if(this.add)
        }
        else{
            this.viewing(false);
        }
    },

    setAvatar: function(avatarType){
        //this.avatar.setTexture("res/common/avatar/Avatar_" + avatarType + ".png");
        GuiUtil.changeSprite(this.avatar,"res/common/avatar/Avatar_" + avatarType + ".png");
    },

    setAvatarChuan: function(avatarUrl){
      //  this.avatar.setTexture(gameUtility.getAvatarPath(avatarUrl));
        GuiUtil.changeSprite(this.avatar,gameUtility.getAvatarPath(avatarUrl));
    },

    setPositionStart: function(cards){
        for(var i =0; i < cards.length; i++){
            this.handOnCards[i].getPosition(this.cardList[i].getPosition());
        }
    },

    updateEnterRoom: function(){
        var isVin = Poker.gameLogic.moneyType;
        GuiUtil.changeSprite(this.iconVin,"res/common/chip/vinChip" + isVin + ".png");
        //this.iconVin.setTexture("res/common/chip/vinChip" + isVin + ".png");
    },

    clearAction: function(){
        this.callIcon.setVisible(false);
        this.allInIcon.setVisible(false);
        this.raiseIcon.setVisible(false);
    },

    viewing: function(view){
        if(view)
        {
            this.panel.setColor({r:150,g:150,b:150});
            this.avatar.setColor({r:150,g:150,b:150});

            this.panel.getChildByName("avatarPanel").getChildByName("view").setVisible(true);
            this.panel.getChildByName("avatarPanel").getChildByName("view").setLocalZOrder(2);
            if(this.index == 0)
            {
                this.panel.setColor(cc.WHITE);
                this.uiAvatar.setColor(cc.WHITE);
            }
        }
        else
        {
            this.panel.setColor(cc.WHITE);
            this.uiAvatar.setColor(cc.WHITE);
            this.panel.getChildByName("avatarPanel").getChildByName("view").setVisible(false);
            this.panel.getChildByName("avatarPanel").getChildByName("view").stopAllActions();
        }
    },

    // Effect tien` khi het van' choi
    addMoney: function(money, time) {
        if(!time){
            time = 0;
        }

        //if(this.nodeMoney){
        //    this.nodeMoney.removeFromParent();
        //}

        var nodeMoney = gameUtility.createNodeMoney(money);
        this.nodeMoney = nodeMoney;
        nodeMoney.setLocalZOrder(5);
        this.gameScene.effectLayer.addChild(nodeMoney);
        this.gameScene.effectLayer.effectUpdateMatch.push(nodeMoney);

        this.updateMoney = function(){
            cc.log("updateMOney" + Poker.gameLogic.players[this.index]["currentMoney"]);
            cc.log("string: " + StringUtility.rutGonNumBer(Poker.gameLogic.players[this.index].currentMoney))
            this.uiGold.setString(StringUtility.rutGonNumBer(Poker.gameLogic.players[this.index].currentMoney));
        }

        var pos = cc.p(0,0);
        if(this.index == 5 || this.index == 6){
            pos = this.avatar.convertToWorldSpaceAR(cc.p(this.avatar.getContentSize().width*(-0.5), 0));
        }
        else{
            pos = this.iconOutRoom.convertToWorldSpaceAR(pos);
        }

        pos = this.gameScene.effectLayer.convertToNodeSpace(pos);

        nodeMoney.setPosition(pos);
        nodeMoney.setVisible(false);
        nodeMoney.setScale(3);
        nodeMoney.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.85))),cc.delayTime(3),cc.moveBy(1.25,cc.p(0,100)),cc.hide()));
        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.updateMoney.bind(this))));
    },

    removeNodeMoney: function(){
        if(this.nodeMoney){
            this.nodeMoney.removeFromParent();
            this.nodeMoney = null;
        }
    },

    setDealer: function(){
        cc.log(this.index);
        cc.log("setDealer");
        this.blindIcon.setVisible(true);
        cc.log("setDealer2");
       // this.blindIcon.setTexture("res/CardGame/Poker/dealerIcon.png");
        GuiUtil.changeSprite(this.blindIcon,"res/CardGame/Poker/dealerIcon.png");
        cc.log("setDealer3");
    },

    setSmallBlind: function(){
        this.blindIcon.setVisible(true);
        //this.blindIcon.setTexture("res/CardGame/Poker/smallBlindIcon.png");
        GuiUtil.changeSprite(this.blindIcon,"res/CardGame/Poker/smallBlindIcon.png");
    },

    setBigBlind: function(){
        this.blindIcon.setVisible(true);
       // this.blindIcon.setTexture(this.blindIcon,"res/CardGame/Poker/bigBlindIcon.png");
        GuiUtil.changeSprite(this.blindIcon,"res/CardGame/Poker/bigBlindIcon.png");
    },

    resetBetLayer: function(){
        this.betLayer.setVisible(false);
        this.lbBet.setString("0");
    },

    addBetMoney: function(betMoney){
        if(betMoney > 0){
            this.betLayer.setVisible(true);
            this.lbBet.setString(StringUtility.rutGonNumBer(betMoney));
        }
        for(var i = 0; i < 3; i++){
            var pos = this.uiGold.convertToWorldSpaceAR(cc.p(0, 0));
            pos = this.convertToNodeSpace(pos);

            var pos2 = this.iconVin.convertToWorldSpaceAR(cc.p(0, 0));
            pos2 = this.convertToNodeSpace(pos2);
            this.moneyFly(pos, pos2, 0.25, i*0.25, true);
        }
        this.gameScene.updatePotMoney(0.5);
    },

    moneyFly: function(posSrc,posDst,time,delay,visible)
    {
        //var chip = new cc.Sprite("res/common/" + "chip/vinChip"+ Poker.gameLogic.moneyType + ".png");
        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip"+ Poker.gameLogic.moneyType + ".png");//new cc.Sprite("res/common/" + "chip/vinChip"+ Poker.gameLogic.moneyType + ".png");
        var rdX = Math.random() * 50;
        var rdY = Math.random() * 50;
        this.addChild(chip,3);
        chip.setPosition(posSrc);
        chip.setScale(0.85);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-30,-30)),cc.p(rdX,rdY)),posDst];

        this.bezierEffect(chip,time,delay,config,visible);
    },

    bezierEffect: function(target,time,delay,config,visible)
    {
        target.setVisible(visible);
        target.runAction(cc.sequence(cc.delayTime(delay),cc.show(),new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(1),cc.removeSelf()));
    },


    addEffectTime: function(time,timeRemain){
        var percent = 1;
        if(timeRemain)
            percent = timeRemain / time;
        this.uiTimer.setVisible(true);
        this.uiTimer.setPercentage(percent * 100);

        var effect;

        if(!cc.sys.isNative){
            effect = engine.TimeProgressEffect.create(this.uiTimer,time, percent);
        }
        else{
            effect = new cc.ProgressFromTo(time, percent*100, 0);
        }

        //var myEffect = new cc.ProgressFromTo(time, percent*100, 0);
        //effect.setNen(this.uiNen);
        this.uiTimer.runAction(effect);
        this.uiTimer.time = time;

        if(this.index == 0)
            this.uiTimer.runAction(cc.sequence(cc.callFunc(function()
            {
                this.time--;
            }.bind(this.uiTimer)),cc.delayTime(1)).repeat(Math.floor(time)));

        var size = this.avatarPanel.getChildByName("bg_progress").getContentSize();
        var node= new cc.Node();
        node.setPosition(cc.p(size.width/2,size.height/2))
        this.avatarPanel.getChildByName("bg_progress").addChild(node);
        node.setTag(Poker.PlayerDisplay.sunnodetag);

        var sun = new cc.ParticleSun();
        sun.texture = cc.textureCache.addImage("res/common/particles/fire.png");
        node.addChild(sun);
        sun.setPosition(cc.p(0,0));
        sun.setScale(.25);

        var action = !cc.sys.isNative?engine.MoveCircle.create(time, size.width/2 -2, 0, 6.28) :cc.MoveCircle.create(time,size.width/2 -2, 0, 6.28);
        //var actionCircle = new MyMoveCircle(time,size.width/2 , node.getPosition(), 0);
        node.runAction(cc.sequence(action, cc.removeSelf()));
    },

    stopEffectTime: function()
    {
        this.uiTimer.stopAllActions();
        this.uiTimer.setVisible(false);

        if(this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(Poker.PlayerDisplay.sunnodetag)))
        {
            this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(Poker.PlayerDisplay.sunnodetag)).stopAllActions();
            this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(Poker.PlayerDisplay.sunnodetag)).removeFromParent(true);
        }
    },

    upBai: function(){
        for(var i = 0; i < this.cardList.length; i++){
            if(this.index == 0){
                //this.cardList[i].setOpacity(199);
                //this.cardList[i].runAction(cc.fadeTo(0.2, 150));
            }
            this.cardList[i].runAction(cc.tintTo(0.5, 120, 120, 120));
        }

        var curScale = this.avatarPanel.getScale();
        var action = cc.spawn(cc.fadeTo(0.4, 50), cc.sequence(cc.scaleTo(0.2, 0, curScale), cc.scaleTo(0.2, curScale, curScale)));
        this.avatar.runAction(cc.tintTo(0.5, 150, 150, 150));
        this.avatarPanel.runAction(action);
    },

    upBaiInstance: function(){
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setColor({r: 150,b: 150, g: 150});
        }

        this.avatar.setColor({r: 150,b: 150, g: 150});
        this.avatar.setOpacity(150);
    },

    clearBetLayer: function(){
        this.lbBet.setString("");
        this.betLayer.setVisible(false);
    },

    showBetLayer: function(){
        var player = Poker.gameLogic.players[this.index];
        if(player.currentBet > 0){
            this.betLayer.setVisible(true);
            this.lbBet.setString(StringUtility.rutGonNumBer(player.currentBet));
        }
    },

    addAction: function(action){
        switch(action){
            case Poker.GameAction.ALLIN:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(true);
                this.allInIcon.setOpacity(255);
                this.raiseIcon.setVisible(false);

                this.hasAllIn = true;
            }
                break;
            case Poker.GameAction.CALL:{
                this.callIcon.setVisible(true);
                this.callIcon.setOpacity(255);
                this.allInIcon.setVisible(false);
                this.raiseIcon.setVisible(false);
                this.callText.setText("CALL");
            }
                break;
            case Poker.GameAction.CHECK:{
                this.callIcon.setVisible(true);
                this.allInIcon.setVisible(false);
                this.raiseIcon.setVisible(false);
                this.callText.setText("CHECK");
                this.callText.setOpacity(255);
            }
                break;

            case Poker.GameAction.FOLD:{
                this.callIcon.setVisible(true);
                this.allInIcon.setVisible(false);
                this.raiseIcon.setVisible(false);
                this.callText.setText("FOLD");
                this.callText.setOpacity(255);
                this.hasBoBai = true;
                this.upBai();
            }
                break;
            case Poker.GameAction.RAISE:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(false);
                this.raiseIcon.setVisible(true);
                this.raiseIcon.setOpacity(255);
            }
                break;
        }
    },

    addActionInstance: function(action){
        switch(action){
            case Poker.GameAction.ALLIN:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(true);
                this.raiseIcon.setVisible(false);
                this.hasAllIn = true;
            }
                break;

            case Poker.GameAction.FOLD:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(false);
                this.raiseIcon.setVisible(false);
                this.callText.setText("FOLD");
                this.hasBoBai = true;
                this.upBaiInstance();
            }
                break;
        }
    },

    myAddAction: function(action){
        switch(action){
            case Poker.GameAction.ALLIN:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(true);
                this.hasAllIn = true;
            }
                break;

            case Poker.GameAction.CALL:{
                this.callIcon.setVisible(true);
                this.allInIcon.setVisible(false);
                this.callText.setText("CALL");
            }
                break;

            case Poker.GameAction.CHECK:{
                this.callIcon.setVisible(true);
                this.allInIcon.setVisible(false);
                this.callText.setText("CHECK");
            }
                break;

            case Poker.GameAction.FOLD:{
                this.callIcon.setVisible(false);
                this.allInIcon.setVisible(false);
                this.callText.setText("FOLD");
                this.hasBoBai = true;
                this.upBai();
            }
                break;

            case Poker.GameAction.RAISE:{
                this.callIcon.setVisible(true);
                this.allInIcon.setVisible(false);
                this.callText.setText("RAISE");
            }
                break;
        }
    },

    clearEndGame: function(){
        this.stopEffectTime();
        this.callIcon.setVisible(false);
        this.allInIcon.setVisible(false);
        this.raiseIcon.setVisible(false);
        this.iconWin.setVisible(false);
    },


    updateWhenSelectDealer: function(){
        //cc.log("updateWhenSelectDealer");
        this.lbBet.setString("0");
        this.betLayer.setVisible(false);
        if(this.status == Poker.GameStatus.SITTING){
            this.inGamePlayer = true;
        }
    },

    updateWhenChiaBai: function(){
        //this.betLayer.setVisible(true);
        //this.lbBet.setString("0");
    },

    clearUpdateMatch: function(){
        //cc.log("clearUpdateMacth Player 0");
        this.stopEffectTime();
        //cc.log("clearUpdateMacth Player 1");
        this.callIcon.setVisible(false);
        this.allInIcon.setVisible(false);
        this.raiseIcon.setVisible(false);

        this.iconWin.stopAllActions();
        this.iconWin.setVisible(false);
        this.nodeMoney = null;

        //cc.log("clearUpdateMacth Player 2");
        for(var i = 0; i < this.cardEndGame.length; i++){
            this.cardEndGame[i].setVisible(false);
        }
        //cc.log("clearUpdateMacth Player 3");

        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);
            this.cardList[i].runToNormal();
            this.cardList[i].setId(52);
        }
        //cc.log("clearUpdateMacth Player 4");

        for(var i = 0; i < this.cardEndGame.length; i++){
            this.cardEndGame[i].stopAllActions();
            this.cardEndGame[i].setVisible(false);
            this.cardEndGame[i].runToNormal();
        }
        //cc.log("clearUpdateMacth Player 5");

        this.lbBet.setString("");
        this.betLayer.setVisible(false);
        this.blindIcon.setVisible(false);
        //cc.log("clearUpdateMacth Player 6");

        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].stopAllActions();
            this.cardList[i].runToNormal();
            this.cardList[i].setColor({r: 255, b: 255, g: 255});
        }

        this.avatarPanel.stopAllActions();
        this.avatarPanel.setScale(this.avatarPanel.rootScale);
        this.avatar.setColor({r: 255,b: 255, g: 255});
        this.avatarPanel.setOpacity(255);
    },

    initWithCardEndGame: function(cards){
        cc.log(this.index);
        for(var i = 0; i < cards.length; i++){
            cc.log("initWithCards: " + i + " " + cards[i]);
            this.cardEndGame[i].setId(cards[i]);
        }
    },

    moCard: function(cards){
        this.index;
        cc.log("mo Card " + cards[0] + " " + cards[1]);
        if(this.index == 0){
            return;
        }


        var needDisplayDiem = 0;
        for(var i = 0; i < cards.length; i++){
            if(cards[i] < 52 && cards[i] >= 0){
                needDisplayDiem++;
            }
        }

            Poker.gameLogic.players[this.index].hasShowCard = true;
            for(var i = 0; i < this.cardList.length; i++){
                this.cardList[i].setVisible(false);

                var newCard = new Lieng.CardSprite(52);
                //this.cardEffect.push(newCard);

                newCard.setPosition(this.cardList[i].getPosition());
                newCard.setScale(this.cardList[i].getScale());
                newCard.setRotation(this.cardList[i].getRotationX());

                this.endGameCards.push(newCard);
                this.cardList[i].getParent().addChild(newCard);

                var newPos = this.cardEndGame[i].getPosition();
                var scale = this.cardEndGame[i].getScaleX();
                var rotation = this.cardEndGame[i].getRotation();
                var actionSpawn = cc.spawn(cc.scaleTo(0.2, scale, scale), cc.moveTo(0.2, newPos), cc.rotateTo(0.2, rotation, rotation));

                newCard.runAction(cc.sequence(cc.delayTime(0.1), actionSpawn, cc.removeSelf()));
                this.cardEndGame[i].setScaleX(0);

                var callBack = function(sender, target){
                    cc.log("kakakakaka");
                    target.setColor({r:155, g:155, b:155});
                }

                this.cardEndGame[i].runAction(cc.sequence(cc.delayTime(0.3), cc.show(), cc.scaleTo(0.1, 0.5, 0.5), cc.delayTime(0.05), cc.callFunc(callBack, this, this.cardEndGame[i])));
            }

        Poker.gameLogic.players[this.index].hasShowCard = true;
    },

    moBai: function(){
        if(this.index == 0){
            //this.runAction(cc.sequence(cc.delayTime(0.45), cc.callFunc(this.darkCard.bind(this))));
            return;
        }

        this.initWithCardEndGame(Poker.gameLogic.players[this.index].cards);

        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);

            var newCard = new Poker.CardSprite(52);
            //this.cardEffect.push(newCard);

            newCard.setPosition(this.cardList[i].getPosition());
            newCard.setScale(this.cardList[i].getScale());
            newCard.setRotation(this.cardList[i].getRotationX());

            this.endGameCards.push(newCard);
            this.cardList[i].getParent().addChild(newCard);

            var newPos = this.cardEndGame[i].getPosition();
            var scale = this.cardEndGame[i].getScaleX();
            var rotation = this.cardEndGame[i].getRotation();
            var actionSpawn = cc.spawn(cc.scaleTo(0.2, scale, scale), cc.moveTo(0.2, newPos), cc.rotateTo(0.2, rotation, rotation));

            newCard.runAction(cc.sequence(cc.delayTime(0.1), actionSpawn, cc.removeSelf()));
            this.cardEndGame[i].setScaleX(0);

            var callBack = function(sender, target){
                cc.log("kakakakaka");
                target.setColor({r:155, g:155, b:155});
            }

            this.cardEndGame[i].runAction(cc.sequence(cc.delayTime(0.3), cc.show(), cc.scaleTo(0.1, 0.5, 0.5), cc.delayTime(0.05), cc.callFunc(callBack, this, this.cardEndGame[i])));
        }
        //this.runAction(cc.sequence(cc.delayTime(0.45), cc.callFunc(this.darkCardEndGame.bind(this))));
    },


    clearNewRound: function(){
        //this.blindIcon.setVisible(false);
    },

    darkCardEndGame: function(){
        for(var i = 0; i < this.cardEndGame.length; i++){
            this.cardEndGame[i].setColor({r:155, g:155, b:155});
        }
    },

    darkCard: function(){
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setColor({r:155, g:155, b:155});
        }
    },
});

Poker.PlayerDisplay.sunnodetag = 111;