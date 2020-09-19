//
XiZach.PlayerDisplay = cc.Node.extend({
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
        this.nodeDiem = null;
        this.widthDistance = 0;
        this.cardOriginePos = [];
    },

    setPanel: function(panel) {
        this.panel = panel;
    },

    setVisible: function(isVisible){
        cc.Node.prototype.setVisible.call(this, isVisible);
        this.panel.setVisible(isVisible);
    },

    initMyPlayer:function(){
        this.setVisible(true);
    },

    initWithCards: function(cards){
        //cc.log("index: " + this.index + " init cards size: " + cards.length);

        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.cards.push(cards[i]);
        }

        for(var i = 0; i < cards.length; i++){
            //cc.log("initWithCards: " + i + " " + cards[i]);
            this.cardList[i].setId(cards[i]);
        }

        for(var i = 0; i < XiZach.MAX_CARDS; i++){
            this.cardList[i].setScale(this.cardList[i].rootScale);
        }

        for(var i = cards.length; i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
        }

        this.fixPosition();
    },

    initInstantCardGroup: function(cardGroup){
        cc.log("index: " + this.index + " init cards size: " + cardGroup.cards.length);

        for(var i = 0; i < XiZach.MAX_CARDS; i++){
            this.cardList[i].setScale(this.cardList[i].rootScale);
        }


        for(var i = 0; i < cardGroup.cards.length; i++){
            cc.log("initWithCards: " + i + " " + cardGroup.cards[i].id);
            this.cardList[i].setId(cardGroup.cards[i].id);
            this.cardList[i].setVisible(true);
        }

        for(var i = cardGroup.cards.length; i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
        }
        this.fixPosition();
    },


    initWithCardsNotId: function(cards){
        cc.log("index: " + this.index + " init cards size: " + cards.length);

        this.cards = [];

        for(var i = 0; i < XiZach.MAX_CARDS; i++){
            this.cardList[i].setScale(this.cardList[i].rootScale);
        }

        for(var i = 0; i < cards.length; i++){
            this.cards.push(cards[i].id);
        }

        for(var i = 0; i < cards.length; i++){
            cc.log("initWithCards: " + i + " " + cards[i].id);
            this.cardList[i].setId(cards[i].id);
        }

        for(var i = cards.length; i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
        }

        this.fixPosition();
    },

    addCard: function(card){
        this.updateCardInstance();
        var i = XiZach.gameLogic.players[this.index].getCardSize() - 1;
        cc.log("xizach player addCard: " + this.index + " " + card +  " " + i);

        this.cardList[i].setId(card);
        this.cardList[i].setVisible(false);
        for(var i = 0; i < XiZach.MAX_CARDS; i++){
            this.cardList[i].setScale(this.cardList[i].rootScale);
        }
        this.fixPosition();
    },

    addCards: function(cards){
        this.updateCardInstance();
        var size = XiZach.gameLogic.players[this.index].getCardSize();
        cc.log("xizach player addCard index: " + this.index + " sizeCardadd" + cards.length + " sizeCardLogic: "  + size);
        for(var i = 0; i < XiZach.gameLogic.players[this.index].getCardSize(); i++){

            cc.log("cards: " + XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
            this.cardList[i].setId(XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
        }

        for(var i = 0; i < cards.length; i++){
            this.cardList[size - 1 - i].setVisible(false);
        }

        //for(var i = 0; i < )

        for(var i = 0; i < XiZach.MAX_CARDS; i++){

            this.cardList[i].setScale(this.cardList[i].rootScale);
        }
        this.fixPosition();
    },

    showCanXetBai: function(canXet){
        if(this.index == 0){
            return;
        }

        this.btnXetBai.setEnabled(canXet);
        this.btnXetBai.setBright(canXet);
    },

    congTien: function(){
    },

    danBai: function(){
        cc.log("thuc hien dan bai");
        this.stopEffectTime();
        if(this.index != 0){
            this.hideAllText();
            this.textDanBai.setVisible(true);
        }

        if(this.index == 0){
            this.displayDiem();
        }
    },

    clearWhenSoBai: function(){
        this.stopEffectTime();
        this.hideAllText();
    },

    hideAllText: function(){
        if(this.index != 0){
            this.textRutBai.setVisible(false);
            this.textDanBai.setVisible(false);
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
                //this.handOnCards[i].setTexture(cc.textureCache.addImage(XiZach.CardSprite.getResource(cards[i])));
                if(this.index == 0){
                    this.cardList[i].stopAllActions();
                    this.cardList[i].setScale(this.cardList[i].rootScale);
                    this.cardList[i].setId(cards[i]);
                }
                this.cardList[i].setVisible(true);
            }
        }
        else{
            for(var i = 0; i < this.cardList.length; i++){
                this.cardList[i].setVisible(true);
                this.cardList[i].setId(52);
                this.cardList[i].stopAllActions();
                this.cardList[i].setScale(this.cardList[i].rootScale);
            }
        }
        this.fixPosition();
    },


    hideBai: function(){
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);
        }
    },

    fixPosition: function(){
        var curSize = XiZach.gameLogic.players[this.index].getCardSize();

        for(var i = 0; i < XiZach.MAX_CARD; i++){
            var newPosX = ((5 - curSize)/2)*this.widthDistance + this.cardOriginePos[i].x;
            this.cardList[i].runAction(cc.moveTo(0.5, cc.p(newPosX, this.cardOriginePos[i].y)));
        }
    },

    initPlayerDisplay: function(){
        cc.log("initPlayerDisplay index player" + this.index);

        this.cardPanel = this.panel.getChildByName("cardPanel");
        this.cardList = [];

        for(var i = 0; i < 5; i++){
            var card = this.cardPanel.getChildByName("card" + i);
            card.setVisible(false);

            var cardNew = new XiZach.CardSprite(52);
            cardNew.setPosition(card.getPosition());

            if(this.index == 0){
                cardNew.setAnchorPoint(cc.p(0.5, 0.5));
                cardNew.setPositionY(card.getPositionY());
            }

            cardNew.setScale(card.getScaleX());
            cardNew.setVisible(false);

            cardNew.rootPosition = cardNew.getPosition();
            cardNew.rootScale = cardNew.getScaleX();

            card.getParent().addChild(cardNew);
            cardNew.setLocalZOrder(1);

            this.cardOriginePos.push(cardNew.getPosition());
            this.cardList.push(cardNew);
        }

        this.widthDistance = this.cardList[1].getPositionX() - this.cardList[0].getPositionX();

        //if(this.index != 0){
        //    this.textRutBai = ccui.helper.seekWidgetByName(this.panel, "imRutBai");
        this.textRutBai = this.panel.getChildByName("imRutBai");
        this.textDanBai = this.panel.getChildByName("imDanBai");
            //this.textDanBai = ccui.helper.seekWidgetByName(this.panel, "imDanBai");
            this.textRutBai.setVisible(false);
            this.textRutBai.setLocalZOrder(2);
            this.textDanBai.setVisible(false);
            this.textDanBai.setLocalZOrder(2);
        //}
        this.avatarPanel = this.panel.getChildByName("avatarPanel");

        this.uiAvatar = this.avatarPanel.getChildByName("btnAvatar");

        this.avatar = this.avatarPanel.getChildByName("avatar");
        this.bgName = this.avatarPanel.getChildByName("bgName");
        this.uiName = this.bgName.getChildByName("name");
        this.uiGold = this.bgName.getChildByName("gold");
        this.view = this.avatarPanel.getChildByName("view");
        this.view.setVisible(false);
        this.iconOutRoom = this.avatarPanel.getChildByName("iconOut");
        this.iconOutRoom.setVisible(false);

        if(this.index == 0 || this.index == 1){
            this.iconChuong = this.panel.getChildByName("iconChuong");
            this.iconChuong.setVisible(false);
        }

        var sprite = GuiUtil.createSprite(XiZach.res.circleEffectPng);//new cc.Sprite(XiZach.res.circleEffectPng);
        sprite.setColor(cc.GREEN);

        this.uiTimer = new cc.ProgressTimer(sprite);
        this.uiTimer.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.uiTimer.setReverseDirection(true);



        this.avatarPanel.rootScale = this.avatarPanel.getScaleX();

        var size = this.avatarPanel.getChildByName("bg_progress").getContentSize();
        this.uiTimer.setPosition(size.width/2,size.height/2);
        this.uiTimer.setPercentage(0);
        this.avatarPanel.getChildByName("bg_progress").addChild(this.uiTimer);
    },

    hienThiXetBai: function(value){
        if(value){
            this.btnXetBai.setVisible(value);
        }
        else{
            this.btnXetBai.setVisible(value);
        }
    },

    showIconChuong: function(value){
        if(this.index == 0 || this.index == 1){
            this.iconChuong.setVisible(value);
        }
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

        if(player.status == XiZach.GameStatus.VIEWING)     // dang xem
        {
            this.viewing(true);
        }
        else if(player.status == XiZach.GameStatus.OUT_GAME)
        {
            this.setVisible(false);
        }
        else if(player.status == XiZach.GameStatus.SITTING && XiZach.gameLogic.inBattle == true)
        {
            this.viewing(true);
            //if(this.add)
        }
        else{
            this.viewing(false);
        }
    },

    setAvatar: function(avatarType){
        this.avatar.loadTexture("res/common/avatar/Avatar_" + avatarType + ".png");
    },

    setAvatarChuan: function(avatarUrl){
        this.avatar.setTexture(gameUtility.getAvatarPath(avatarUrl));
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
        cc.log(" " + this.index + " " + time + " addMoney");
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
            cc.log("updateMOney" + XiZach.gameLogic.players[this.index]["currentMoney"]);
            cc.log("string: " + StringUtility.rutGonNumBer(XiZach.gameLogic.players[this.index].currentMoney))
            this.uiGold.setString(StringUtility.rutGonNumBer(XiZach.gameLogic.players[this.index].currentMoney));
        }

        var pos = cc.p(0,0);
        pos = this.avatar.convertToWorldSpaceAR(pos);
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

    resetBetLayer: function(){
        this.betLayer.setVisible(false);
        this.lbBet.setString("0");
    },

    moneyFly: function(posSrc,posDst,time,delay,visible)
    {
        //var chip = new cc.Sprite("res/common/" + "chip/vinChip"+ XiZach.gameLogic.moneyType + ".png");

        var chip = GuiUtil.createSprite("res/common/" + "chip/vinChip"+ XiZach.gameLogic.moneyType + ".png");
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
        node.setTag(XiZach.PlayerDisplay.sunnodetag);

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

        if(this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(XiZach.PlayerDisplay.sunnodetag)))
        {
            this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(XiZach.PlayerDisplay.sunnodetag)).stopAllActions();
            this.avatarPanel.getChildByName("bg_progress").getChildByTag(parseInt(XiZach.PlayerDisplay.sunnodetag)).removeFromParent(true);
        }
    },

    clearEndGame: function(){
        cc.log(" display clearEndGame");
        this.stopEffectTime();
        if(this.index != 0){
            this.btnXetBai.setVisible(false);
            this.textDanBai.setVisible(false);
            this.textRutBai.setVisible(false);
        }
        else{

        }
    },

    clearUpdateMatch: function(){
        if(this.index != 0){
            this.hideAllText();
            this.btnXetBai.setVisible(false);
        }

        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);
        }
        this.stopAllActions();
        this.hideDisplayDiem();
    },

    displayDiemInstance: function(){
        var boBai  = XiZach.gameLogic.players[this.index].getBoName();
        var diemBoBai = XiZach.gameLogic.players[this.index].getDiemBoBai();
        var resourceBoBai = XiZach.GameLogic.getResourceHienThiDiem(boBai, diemBoBai);
        if(this.nodeDiem){
            if(resourceBoBai != ""){
                this.nodeDiem.setTexture(resourceBoBai);
            }
        }
        else{

        }
    },

    displayDiem: function(){
        cc.log("displayDiem: ");
        if(this.nodeDiem){
            this.nodeDiem.removeFromParent();
        }

        var node;
        var boBai  = XiZach.gameLogic.players[this.index].getBoName();
        var diemBoBai = XiZach.gameLogic.players[this.index].getDiemBoBai();
        var resourceBoBai = XiZach.GameLogic.getResourceHienThiDiem(boBai, diemBoBai);
        if(resourceBoBai == ""){
            return;
        }

        //node = new cc.Sprite(resourceBoBai);
        node = GuiUtil.createSprite(resourceBoBai);
        this.nodeDiem = node;

        var pos;
        var sizeCard = XiZach.gameLogic.players[this.index].groupCard.cards.length;
        var indexCard = Math.floor(sizeCard/2);
        cc.log("mo bai index khac");
        //var cardSprite = new cc.Sprite(BaCay.res.laBaiChe);
        var cardSprite = GuiUtil.createSprite(res_CardGame_LaBai + "/labai_52.png");

        if(this.index == 0){
            cc.log("display diem index 0");
            if(sizeCard %2 == 0){
                pos = this.cardList[indexCard].convertToWorldSpaceAR(cc.p(-cardSprite.width*0.25, -cardSprite.height*0.15));
            }
            else{
                pos = this.cardList[indexCard].convertToWorldSpaceAR(cc.p(0, -cardSprite.height*0.15));
            }

            pos = this.gameScene.effectLayer.convertToNodeSpace(pos);

            this.gameScene.effectLayer.addChild(node);
            node.setPosition(pos);
            node.setVisible(false);
            node.setOpacity(255);
            node.runAction(cc.sequence(cc.show(), cc.scaleTo(0.5, 1.15), cc.delayTime(3.0)));
        }
        else{
            pos = this.cardList[indexCard].convertToWorldSpaceAR(cc.p(0,-cardSprite.height*0.15));
            pos = this.gameScene.effectLayer.convertToNodeSpace(pos);

            this.gameScene.effectLayer.addChild(node);
            node.setPosition(pos);
            node.setVisible(false);
            node.setScale(0.8);
            node.setOpacity(0);
            node.runAction(cc.sequence(cc.show(), cc.fadeIn(0.1), cc.delayTime(3.0)));
        }
    },

    displayCheckHienThiDiem: function(){
        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.displayDiem.bind(this))));
    },

    hideDisplayDiem: function(){
        if(this.nodeDiem)
            this.nodeDiem.removeFromParent();
        this.nodeDiem = null;
    },

    updateWhenChiaBai: function(){
    },

    moBai: function(isXiZach){
        cc.log("moBai: " + this.index);

        if(this.index != 0){
            var sizeCard = XiZach.gameLogic.players[this.index].groupCard.getCardSize();
            cc.log("sizeCard: " + sizeCard);

            for(var i = 0; i < 5; i++){
                this.cardList[i].setVisible(false);
            }

            for(var i = 0; i < sizeCard; i++){
                this.cardList[i].setVisible(true);
                this.cardList[i].runAction(cc.sequence(cc.scaleTo(0.1, 0 ,1.0)));
            }

            this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.updateCard.bind(this))));
        }

        var kk = "";
        for (var i = 0; i < XiZach.gameLogic.players[this.index].groupCard.getCardSize(); i++) {
            kk += " " + XiZach.gameLogic.players[this.index].groupCard.cards[i].id;
        }

        cc.log("cards: " + kk);

        var boId = XiZach.gameLogic.players[this.index].groupCard.tinhBo();
        cc.log("index: " + this.index + "boId: " + boId);

        var typeString = XiZach.GameLogic.getNameBoBai(boId);

        this.typeString = typeString;
        cc.log("typeString: " + typeString);

        if(!this.hasMoBai){
            this.runAction(cc.sequence(cc.delayTime(0.12), cc.callFunc(this.displayDiem.bind(this))));
        }
        else{
            this.displayDiemInstance();
        }

        this.hasMoBai = true;
    },

    showBaiChuong: function(){
        if(this.index == 0){
            return;
        }
        var sizeCard = XiZach.gameLogic.players[this.index].groupCard.getCardSize();
        cc.log("sizeCard: " + sizeCard);

        for(var i = 0; i < 5; i++){
            this.cardList[i].setVisible(false);
        }

        for(var i = 0; i < sizeCard; i++){
            this.cardList[i].setVisible(true);
            this.cardList[i].runAction(cc.sequence(cc.fadeOut(0.002)));
        }

        this.runAction(cc.sequence(cc.delayTime(0.002), cc.callFunc(this.updateCard2.bind(this))));
    },

    showBaiInstance: function(){
        if(this.index == 0){
            return;
        }
        var sizeCard = XiZach.gameLogic.players[this.index].groupCard.getCardSize();
        cc.log("sizeCard: " + sizeCard);

        for(var i = 0; i < 5; i++){
            this.cardList[i].setVisible(false);
        }

        for(var i = 0; i < sizeCard; i++){
            this.cardList[i].setVisible(true);
        }


        for(var i = 0; i < XiZach.gameLogic.players[this.index].getCardSize(); i++){
            this.cardList[i].setId(XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
            this.cardList[i].setScale(1);
            this.cardList[i].stopAllActions();
        }

        for(var i =  XiZach.gameLogic.players[this.index].getCardSize(); i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setScale(1);
            this.cardList[i].setVisible(false);
            this.cardList[i].stopAllActions();
        }
    },


    updateCardInstance: function(){
        cc.log("updateCard");
        for(var i = 0; i < XiZach.gameLogic.players[this.index].getCardSize(); i++){
            this.cardList[i].setId(XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
            this.cardList[i].stopAllActions();
            this.cardList[i].setScale(1);
            this.cardList[i].setVisible(true);
        }

        for(var i =  XiZach.gameLogic.players[this.index].getCardSize(); i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
            this.cardList[i].setScale(1);
            this.cardList[i].stopAllActions();

        }
    },

    updateCard: function(){
        cc.log("updateCard");
        for(var i = 0; i < XiZach.gameLogic.players[this.index].getCardSize(); i++){
            this.cardList[i].setId(XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
            this.cardList[i].stopAllActions();
            this.cardList[i].runAction(cc.sequence(cc.show(), cc.scaleTo(0.1, 1.0, 1.0)));
        }

        for(var i =  XiZach.gameLogic.players[this.index].getCardSize(); i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
            this.cardList[i].setScale(1);
        }
    },

    updateEnterGame: function(){
        this.iconOutRoom.setVisible(false);
    },

    updateCard2: function(){
        cc.log("updateCard2");

        for(var i = 0; i < XiZach.gameLogic.players[this.index].getCardSize(); i++){
            this.cardList[i].setId(XiZach.gameLogic.players[this.index].groupCard.cards[i].id);
            this.cardList[i].stopAllActions();
            this.cardList[i].setScale(this.cardList[i].rootScale);
            this.cardList[i].runAction(cc.fadeIn(0.005));
        }

        for(var i =  XiZach.gameLogic.players[this.index].getCardSize(); i < XiZach.MAX_CARD; i++){
            this.cardList[i].setId(52);
            this.cardList[i].setVisible(false);
        }
    },

    chuyenGiaiDoan2: function(){
        this.updateCardInstance();
        this.addEffectTime(XiZach.gameLogic.countDownTime);
    },

    chuyenGiaiDoan3: function(){
        this.updateCardInstance();
        this.addEffectTime(XiZach.gameLogic.countDownTime);
        this.hideAllText();
    },

    clearPreDealCard: function(){
        if(this.index == 0){
            this.textDanBai.setVisible(false);
            this.textRutBai.setVisible(false);
        }
        else{
            this.btnXetBai.setVisible(false);
            this.textDanBai.setVisible(false);
            this.textRutBai.setVisible(false);
        }

    }
});

XiZach.PlayerDisplay.sunnodetag = 111;