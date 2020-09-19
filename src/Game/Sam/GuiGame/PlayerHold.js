//
Sam.PlayerHold = cc.Node.extend({
    ctor: function() {
        this._super();
        this.handOnCards = [];
        this.baiEndGame = [];

        this.index = -1;
        this.gameScene = null;
        this.hasAddListener = false;
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


    initWithCards: function(cards){
        var i;
        cc.log("cards: " + cards.length);
        for(i = 0; i < cards.length; i++){
            var cardSprite = new Sam.CardSprite(cards[i]);
            this.handOnCards.push(cardSprite);
            this.addChild(this.handOnCards[i]);
        }
        this.setPositionStart();
    },

    refreshCardPosition: function(){
        if(this.handOnCards.length == 0)
            return;
        var height = this.handOnCards[0].getContentSize().height;
        var cardW = this.handOnCards[0].getContentSize().width;
        var xx = (cardW)*0.5;
        var i = 0;
        var posY = Math.floor(height/2);
        var posX;

        for(i = 0; i < this.handOnCards.length; i++){
            this.handOnCards[i].setLocalZOrder(i);
            posX =   Math.floor(i * xx + cardW/2);
            var point = cc.p(posX, posY);

            var action = cc.moveTo(0.39, point);
            action.setTag(1234);
            this.handOnCards[i].runAction(action);
        }
    },

    firstTurn: function(id){
        cc.log("id: " + id );
        if(this.index == 0){
            this.cardFirstTurn.setId(id);
        }
        else{
            var ss = Sam.CardSprite.getResource(id);
            //this.cardFirstTurn.setTexture(cc.textureCache.addImage(ss));
            GuiUtil.changeSprite(this.cardFirstTurn,ss);
        }

        return this.cardFirstTurn;
    },

    stopEffectTime: function()
    {
        this.uiTimer.stopAllActions();
        this.uiTimer.setVisible(false);

        if(this.panel.getChildByName("bg_progress").getChildByTag(Sam.PlayerHold.sunnodetag))
        {
            this.panel.getChildByName("bg_progress").getChildByTag(Sam.PlayerHold.sunnodetag).stopAllActions();
            this.panel.getChildByName("bg_progress").getChildByTag(Sam.PlayerHold.sunnodetag).removeFromParent(true);
        }
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

        var size = this.panel.getChildByName("bg_progress").getContentSize();
        var node= new cc.Node();
        node.setPosition(cc.p(size.width/2,size.height/2))
        this.panel.getChildByName("bg_progress").addChild(node);
        node.setTag(Sam.PlayerHold.sunnodetag);

        var sun = new cc.ParticleSun();
        sun.texture = cc.textureCache.addImage("res/common/particles/fire.png");
        node.addChild(sun);
        sun.setPosition(cc.p(0,0))
        sun.setScale(.25)

        var action = !cc.sys.isNative?engine.MoveCircle.create(time, size.width/2 -2, 0, 6.28) : cc.MoveCircle.create(time, size.width/2 -2, 0, 6.28);
        //var actionCircle = new MyMoveCircle(time,size.width/2 , node.getPosition(), 0);
        node.runAction(cc.sequence(action, cc.removeSelf()))

    },

    refreshResize: function(){
        this.uiTimer.setDirty(true);
    },

    initMyPlayer:function(){
        this.sortType = Sam.kSortTangDan;
        this.setPosition(cc.p(300, 12));
        this.setVisible(true);
        //cc.eventManager.addListener(this.listener, this);
    },

    addListenerPlayer: function(){
        cc.log("addListenerPlayer");
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        if(!this.hasAddListener || !cc.sys.isNative){
            cc.eventManager.addListener(this.listener, this);
            this.hasAddListener = true;
        }


    },

    removeListenerPlayer: function(){
        cc.log("removeListenerPlayer");

        if(!cc.sys.isNative){
            cc.eventManager.removeListener(this.listener);
            this.listener = null;
        }
    },

    initPlayerHold: function(){

        var cardTemp = new Sam.CardSprite(52);
        var cardSize = cardTemp.getContentSize();
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();


        var avatar  = GuiUtil.createSprite("res/common/avatar/Avatar_1.png");
        avatar.setScale(1.0);
        this.panel.addChild(avatar);
        avatar.setPosition(cc.p(this.panel.getChildByName("btnAvatar").getPosition().x + 200, this.panel.getChildByName("btnAvatar").getPosition().y + 200) );
        avatar.setPosition(this.panel.getChildByName("btnAvatar").getPosition());
        avatar.setLocalZOrder(1);
        this.uiAvatar = avatar;
        this.avatar = avatar;

        this.panel.getChildByName("bg_progress").setLocalZOrder(2);
        if(this.index == 0){
            this.cardFirstTurn = new Sam.CardSprite(52);
            this.cardFirstTurn.setPosition(winSize.width/2 - this.getPositionX(), this.getPositionY() + cardSize.height/2);
            this.addChild(this.cardFirstTurn);
            this.cardFirstTurn.setVisible(false);
        }
        else{
            this.card = this.panel.getChildByName("card");
            this.card.setVisible(false);
            this.numCard = this.card.getChildByName("num");
            this.cardFirstTurn = new Sam.CardSprite(52);

            this.panel.addChild(this.cardFirstTurn);
            this.cardFirstTurn.setPosition(this.card.getPosition());
            this.cardFirstTurn.setVisible(false);
        }


        this.uiName = this.panel.getChildByName("name");
        this.uiGold = this.panel.getChildByName("gold");
        //this.uiHome = ccui.Helper.seekWidgetByName(this.panel,"home");
        this.iconOutRoom =   this.panel.getChildByName("iconOut");
        this.iconOutRoom.setLocalZOrder(2);
        this.iconOutRoom.setVisible(false);

        this.uiBaosam = GuiUtil.createSprite(Sam.res.iconBaoSamPng);
        //this.panel.addChild(this.uiBaosam);
        this.uiBaosam.setVisible(false);


        if(this.index != 0){
            this.card.addChild(this.uiBaosam, 3);
            this.uiBaosam.setPosition(this.card.getContentSize().width*0.5, this.card.getContentSize().height/2);
        }else{
            this.panel.addChild(this.uiBaosam, 3);
            this.uiBaosam.setPosition(this.uiAvatar.getContentSize().width*0.55, this.uiAvatar.getContentSize().height*0.55);
        }

        var cardSize = (GuiUtil.createSprite(Sam.res.cardFirstTurnPng)).getContentSize();
        //var xBaoSam = new cc.Sprite(Sam.res.xBaoSamPng);
        //if(this.index == 1 || this.index == 2|| this.index == 0){
        //    xBaoSam.setPositionX(cardSize.width*0.8)
        //}else{
        //    xBaoSam.setPositionX(cardSize.width*0.17);
        //}
        //xBaoSam.setPositionY(cardSize.height*0.5);
        //this.uiBaosam.addChild(xBaoSam);
        //this.uiNen = panel.getChildByName("mask").getChildByName("nen");

        var sprite = GuiUtil.createSprite(Sam.res.circleEffectPng);
        sprite.setColor(cc.GREEN);

        this.uiTimer = new cc.ProgressTimer(sprite);
        this.uiTimer.setType(cc.ProgressTimer.TYPE_RADIAL);
        this.uiTimer.setReverseDirection(true);
        var size = this.panel.getChildByName("bg_progress").getContentSize();
        this.uiTimer.setPosition(size.width/2,size.height/2);
        this.uiTimer.setPercentage(0);
        this.panel.getChildByName("bg_progress").addChild(this.uiTimer);
        this.initBao1();
    },

    clearFirstTime: function(){
        this.cardFirstTurn.setVisible(false);
        this.iconOutRoom.setVisible(false);
        this.uiBaosam.setVisible(false);
    },


    setAvatarChuan: function(avatarUrl){
        cc.log("avatarUrl: " + avatarUrl);
      //  this.avatar.setTexture(cc.textureCache.addImage(gameUtility.getAvatarPath(avatarUrl)));
        GuiUtil.changeSprite(this.avatar,gameUtility.getAvatarPath(avatarUrl));
    },

    updateWithPlayer: function(player)
    {
        //cc.log("player index " + player.index);

        if(!player.ingame)
        {
            this.setVisible(false);
            return;
        }

        this.setVisible(true);

        var avatarUrl = player.info["avatar"];
        this.setAvatarChuan(avatarUrl);

        this.uiName.setString(player.info["nickName"]);

        this.uiGold.setString(StringUtility.standartNumber(player.info["money"]));

        if(player.status == 1)     // dang xem
        {
            this.viewing(true);
        }
        else if(player.status == 0)
        {
            this.setVisible(false);
        }
        else
        {
            this.viewing(false);
        }

        player.active = false;

    },

    clearBai: function(){
        var i = 0;
        for(i = 0; i< this.handOnCards.length; i++){
            var card = this.handOnCards[i];
            card.removeFromParent();
        }
        this.handOnCards = [];
    },

    setPositionStart: function(){
        if(this.handOnCards.length == 0)
            return;
        var height = this.handOnCards[0].getContentSize().height;
        var cardW = this.handOnCards[0].getContentSize().width;
        var xx = (cardW)*0.5;
        var i = 0;
        var posY = Math.floor(height/2);
        var posX;

        for(i = 0; i < this.handOnCards.length; i++){
            this.handOnCards[i].setLocalZOrder(i);
            posX =   Math.floor(i * xx + cardW/2);
            this.handOnCards[i].startY = posY;
            this.handOnCards[i].setPosition(posX, posY);
        }
    },


    onTouchBegan: function(touch, event){
        cc.log("onTouchBegan");
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();
        var needTouch = true;
        for(var i=0;i<target.handOnCards.length;i++) {
            if(!target.handOnCards[i].isVisible()){
                needTouch = false;
                break;
            }
        }
        if(!needTouch)
            return false;

        if(target.handOnCards.length == 0)
            return false;
        for(i = target.handOnCards.length - 1; i >= 0;i-- ){
            var card = target.handOnCards[i];
            if(card.containTouchPoint(point)){
                target.beginCardId = i;
                return true;

            }
        }
        return false;
    },

    onTouchMoved: function(touch, event){

    },

    onTouchEnded: function(touch, event){
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        if(this.gameTouchEnable = false){
            return;
        }

        if(target.handOnCards.length == 0)
            return;
        for(i = target.handOnCards.length - 1; i >= 0;i-- ){
            var card = target.handOnCards[i];
            if(card.containTouchPoint(point)){
                target.endCardId = i;
                break;
            }
        }
        if(target.endCardId == target.beginCardId){
            if(target.handOnCards[target.endCardId].getActionByTag(1234)){
                return;
            }
            target.handOnCards[target.endCardId].upDown();
            if(target.handOnCards[target.endCardId].isUp) {
                target.gameScene.kiemTraDanhBai(true);
            }
            else{
                target.gameScene.kiemTraDanhBai();
            }
        }
    },


    sapXep: function(){
        var i;
        var cardsSapXep = [];
        var originalCards = [];
        if(this.sortType == Sam.kSortTangDan){
            this.sortType = Sam.kSortGroup;
        }else{
            this.sortType = Sam.kSortTangDan;
        }


        for(i = 0; i < this.handOnCards.length; i++){

            cardsSapXep.push(new Sam.Card(this.handOnCards[i].id));
            originalCards.push(new Sam.Card(this.handOnCards[i].id));
        }

        var res = Sam.LogicUtil.sapxepQuanBai(cardsSapXep, this.sortType);

        for(i = 0; i < res.length; i++){
            for(var j = 0; j < this.handOnCards.length; j++){
                if(this.handOnCards[j].id == res[i].id){
                    res[i].grey = this.handOnCards[j].grey;
                }
            }
        }

        for(i = 0; i < res.length; i++){
            this.handOnCards[i].setId(res[i].id);
            this.handOnCards[i].setGrey(res[i].grey);
        }


        return originalCards;
    },


    boluot: function()
    {
        var parent = this.panel.getChildByName("bg_progress");
        if(parent.getChildByTag(Sam.PlayerHold.boluottag)) {
            parent.getChildByTag(Sam.PlayerHold.boluottag).removeFromParent(true);
        }

        var boluot = GuiUtil.createSprite("res/common/animation/cancel.png");
        parent.addChild(boluot);
        boluot.setPosition(parent.getContentSize().width/2,parent.getContentSize().height/2 + 5);
        boluot.setScale(0);
        boluot.runAction(new cc.EaseBackOut(cc.scaleTo(.35,1.1)));
        boluot.setTag(Sam.PlayerHold.boluottag);

        var bg = GuiUtil.createSprite("res/common/animation/1.png");
        boluot.addChild(bg);
        bg.setPosition(cc.p(boluot.getContentSize().width/2,-7));
        bg.runs = [];
        for(var i=0;i<5;i++)
        {
            var run = GuiUtil.createSprite("res/common/animation/2.png");
            bg.addChild(run);
            run.setPosition(cc.p(6.5 + i * 10,6));
            bg.runs.push(run);
            run.setVisible(false);
            run.runAction(cc.sequence(cc.delayTime(i *.15),cc.show(),cc.delayTime(.75 - i *.15),cc.hide(),cc.delayTime(.15)).repeatForever());
        }
    },

    clearBoluot: function()
    {
        var parent = this.panel.getChildByName("bg_progress");
        if(parent.getChildByTag(Sam.PlayerHold.boluottag))
        {
            parent.getChildByTag(Sam.PlayerHold.boluottag).stopAllActions();
            parent.getChildByTag(Sam.PlayerHold.boluottag).setScale(1.1);
            parent.getChildByTag(Sam.PlayerHold.boluottag).runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.5),cc.removeSelf()));
        }
    },

    clearBaiEndGame: function()
    {
        for(var i=0;i<this.baiEndGame.length;i++){
            this.baiEndGame[i].removeFromParent();
        }
        this.baiEndGame = [];
    },

    clearBaiEndGameInstant: function(){
        for(var i=0;i<this.baiEndGame.length;i++){
            this.baiEndGame[i].removeFromParent();
        }
        this.baiEndGame = [];
    },

    addBaiEndGame: function(cards,delayTime){
        var mainSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        if(this.index != 0){
            this.card.setVisible(false);
        }

        switch (this.index)
        {
            case 1:
            case 2:
            {
                var centerPos = this.card.convertToWorldSpaceAR(cc.p(0,0));
                centerPos = this.convertToNodeSpace(centerPos);
                var deltaX = 40;
                var startY = centerPos.y;
                var startX = centerPos.x;
                if(cards.length <= 5){
                    var time = 0;if(delayTime)time += delayTime;
                    for(var i=0;i<cards.length;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(startX + deltaX* i, startY));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }
                }
                else
                {
                    startY = centerPos.y;
                    startX = centerPos.x;
                    var time = 0;
                    if(delayTime)
                        time += delayTime;
                    for(var i=5;i<cards.length;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(centerPos.x + deltaX * (i-5),startY ));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }

                    for(var i=0;i<5;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(centerPos.x  + deltaX* i, startY - 40));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }
                }

                break;
            }

            case 3:
            case 4:
            {
                var centerPos = this.card.convertToWorldSpaceAR(cc.p(0,0));
                centerPos = this.convertToNodeSpace(centerPos);
                var deltaX = 40;
                var startY = centerPos.y;
                var startX = centerPos.x;
                if(cards.length <= 5){
                    var time = 0;if(delayTime)time += delayTime;
                    for(var i=0;i<cards.length;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam, 5 -i);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(startX - deltaX* i, startY));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }
                }
                else
                {
                    startY = centerPos.y;
                    startX = centerPos.x;
                    var time = 0;
                    if(delayTime)
                        time += delayTime;
                    for(var i=5;i<cards.length;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam, 5- i);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(centerPos.x - deltaX * (i-5),startY ));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }

                    for(var i=0;i<5;i++){
                        var sam = new Sam.CardSprite(cards[i]);
                        sam.setScale(.72);
                        this.addChild(sam, 10 - i);
                        this.baiEndGame.push(sam);
                        sam.setPosition(cc.p(centerPos.x - deltaX* i, startY - 40));
                        sam.setOpacity(0);
                        sam.runAction(cc.sequence(cc.delayTime(time),cc.fadeIn(.45)));
                        time += .05;
                    }
                }
                break;
            }
        }
    },

    clearHandOncard: function()
    {
        for(var i=0;i< this.handOnCards.length;i++)
        {
            this.handOnCards[i].removeFromParent(true);
        }
        this.handOnCards = [];
    },

    addThang: function(delayTime, samthanhcong)            // Them effect thang'
    {
        //var sprite1 = new cc.Sprite("GameGUI/new/effc0021Layer-13-copy-7.png");
        ////var sprite1 = new cc.Sprite(Sam.res.chienThangPng);
        //
        var time = .5;
        if(delayTime && isNaN(delayTime))
            time = delayTime;
        //this.panel.getChildByName("bg_progress").addChild(sprite1);
        //sprite1.setTag(123);
        //
        //var size = this.panel.getChildByName("bg_progress").getContentSize();
        //sprite1.setPosition(size.width/2,size.height/2);

        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        if(this.index == 0)
        {
            var sprite2 = GuiUtil.createSprite(Sam.res.nenChienThang);
            if(samthanhcong)
                var sprite1 = GuiUtil.createSprite(Sam.res.samThanhCongPng);
            else
                var sprite1 = GuiUtil.createSprite(Sam.res.chienThang);
            sprite1.setPosition(sprite2.getContentSize().width/2, sprite2.getContentSize().height/2);
            sprite2.addChild(sprite1);
            this.gameScene.effect2D.addChild(sprite2);
            sprite2.setTag(124);
            sprite2.setPosition(winSize.width/2, sprite2.getContentSize().height/2);
            sprite2.setOpacity(0);sprite2.setScale(3);sprite2.setVisible(false);
            sprite2.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.9))),cc.callFunc(function(){
                var forever = cc.repeatForever(cc.sequence(cc.scaleTo(.35,.93),cc.scaleTo(.35,.9)));
                this.runAction(forever);
            }.bind(sprite2))));
        }
    },


    addThua: function(delayTime)
    {
        //var sprite1 = new cc.Sprite("GameGUI/new/effc0015Layer-13-copy-7.png");
        //this.panel.getChildByName("mask").addChild(sprite1);
        //sprite1.setTag(123);
        //var size = this.panel.getChildByName("mask").getContentSize();
        //sprite1.setPosition(size.width/2,size.height/2);
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var time = .5;
        if(delayTime)
            time = delayTime;


        if(this.index == 0)
        {
            var sprite2 = GuiUtil.createSprite(Sam.res.nenThuaCuoc);
            var sprite1 = GuiUtil.createSprite(Sam.res.thuaCuoc);
            sprite2.addChild(sprite1);
            sprite1.setPosition(sprite2.getContentSize().width/2, sprite2.getContentSize().height/2);

            this.gameScene.effect2D.addChild(sprite2);
            sprite2.setTag(124);
            sprite2.setPosition(winSize.width/2,sprite2.getContentSize().height/2);
            sprite2.setOpacity(0);sprite2.setScale(3);sprite2.setVisible(false);
            sprite2.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.9))),cc.callFunc(function(){
                var forever = cc.repeatForever(cc.sequence(cc.scaleTo(.35,.93),cc.scaleTo(.35,.9)));
                this.runAction(forever);
            }.bind(sprite2))));
        }

    },

    addHoa: function(delayTime)
    {
        //var sprite1 = new cc.Sprite("GameGUI/new/effc0015Layer-13-copy-7.png");
        //this.panel.getChildByName("mask").addChild(sprite1);
        //sprite1.setTag(123);
        //var size = this.panel.getChildByName("mask").getContentSize();
        //sprite1.setPosition(size.width/2,size.height/2);
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var time = .5;
        if(delayTime)
            time = delayTime;


        if(this.index == 0)
        {
            var sprite2 = GuiUtil.createSprite(Sam.res.nenThuaCuoc);
            var sprite1 = GuiUtil.createSprite(Sam.res.hoaPng);
            sprite2.addChild(sprite1);
            sprite1.setPosition(sprite2.getContentSize().width/2, sprite2.getContentSize().height/2);

            this.gameScene.effect2D.addChild(sprite2);
            sprite2.setTag(124);
            sprite2.setPosition(winSize.width/2,sprite2.getContentSize().height/2);
            sprite2.setOpacity(0);sprite2.setScale(3);sprite2.setVisible(false);
            sprite2.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.9))),cc.callFunc(function(){
                var forever = cc.repeatForever(cc.sequence(cc.scaleTo(.35,.93),cc.scaleTo(.35,.9)));
                this.runAction(forever);
            }.bind(sprite2))));
        }

    },

    clearThangThua: function()
    {
        if(this.panel.getChildByName("bg_progress").getChildByTag(123))
        {
            this.panel.getChildByName("bg_progress").getChildByTag(123).stopAllActions();
            this.panel.getChildByName("bg_progress").getChildByTag(123).removeFromParent(true);
        }
        if(this.gameScene.effect2D.getChildByTag(124))
        {
            this.gameScene.effect2D.getChildByTag(124).stopAllActions();
            this.gameScene.effect2D.getChildByTag(124).removeFromParent(true);
        }
    },

    initBao1: function(){
        if(!this.card)
            return;
        var sizeCard = this.card.getContentSize();
        if ((this.index == 3) || (this.index == 4)) {
            var bao1 = GuiUtil.createSprite(Sam.res.bao1bPng);
            this.card.addChild(bao1);
            this.bao1 = bao1;
            bao1.setLocalZOrder(1);
            this.card.getChildByName("num").setLocalZOrder(2);
            bao1.setPosition(sizeCard.width/2,sizeCard.height*0.58);
            bao1.setTag(130);
            this.bao1.setVisible(false);
        }

        else if ((this.index == 1) || (this.index == 2)) {
            var bao1 = GuiUtil.createSprite(Sam.res.bao1aPng);
            this.card.addChild(bao1);
            this.bao1 = bao1;
            bao1.setLocalZOrder(1);
            this.card.getChildByName("num").setLocalZOrder(2);
            bao1.setPosition(sizeCard.width/2,sizeCard.height*0.58);
            bao1.setTag(130);
            this.bao1.setVisible(false);
        }
    },

    addBao1: function() {
        if(!this.card)
            return;
        this.bao1.setVisible(true);
        this.card.runAction(cc.sequence(cc.scaleTo(0.35,1.05),cc.scaleTo(.35,1)).repeatForever());
    },

    removeBao1: function()
    {
        if(!this.card){
            return;

        }

        this.card.stopAllActions();
        if(this.card.getChildByTag(130))
        {
            this.card.getChildByTag(130).setVisible(false);
        }
    },

    danhBai: function(cards){
        var ret = [];
        if(this.index == 0)
        {
            for(var j=0;j<this.handOnCards.length;j++){
                this.handOnCards[j].instantDown();
                this.handOnCards[j].setVisible(true);
            }

            var check = [];
            for(var i=0;i< cards.length;i++){
                for(var j=0; j< this.handOnCards.length;j++){
                    if(this.handOnCards[j].id == cards[i])
                    {
                        ret.push({id:this.handOnCards[j].id,x: this.handOnCards[j].convertToWorldSpaceAR(cc.p(0,0)).x,y : this.handOnCards[j].convertToWorldSpaceAR(cc.p(0,0)).y});
                        check.push(j);
                        break;
                    }
                }
            }

            for(var i = check.length-1;i>= 0;i--){
                this.handOnCards[check[i]].removeFromParent(true);
                this.handOnCards.splice(check[i],1);
            }
            this.refreshCardPosition();
        }
        else{
            for(var i=0;i<cards.length;i++) {
                ret.push({
                    id: cards[i],
                    x: this.card.convertToWorldSpaceAR(cc.p(0,0)).x,
                    y: this.card.convertToWorldSpaceAR(cc.p(0,0)).y
                });
            }
        }
        return ret;
    },


    viewing: function(view){
        if(view)
        {
            this.panel.setColor({r:150,g:150,b:150});
            this.uiAvatar.setColor({r:150,g:150,b:150});
            this.panel.getChildByName("view").setVisible(true);
            this.panel.getChildByName("view").setLocalZOrder(2);
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
            this.panel.getChildByName("view").setVisible(false);
            if(this.index == 0) {
                this.panel.getChildByName("view").stopAllActions();
            }
        }

    },

    addMoney: function(money, time)           // Effect tien` khi het van' choi
    {
        if(!time){
            time = 0;
        }
        var nodeMoney = gameUtility.createNodeMoney(money);
        nodeMoney.setLocalZOrder(10);
        var pos;
        switch (this.index)
        {
            case 0:
            {
                pos = cc.p(0,0);
                break;
            }
            case 1:
            {
                pos = cc.p(0,0);
                break;
            }
            case 2:
            {
                pos = cc.p(0,0);
                break;
            }
            case 3:
            {
                pos = cc.p(0, 0);
                break;
            }
            case 4:
            {
                pos = cc.p(0,0);
                break;
            }
        }
        this.updateMoney = function(sender){
            this.uiGold.setString(StringUtility.standartNumber(Sam.gameLogic.players[this.index].info["money"]));
        }

        pos = this.panel.convertToWorldSpaceAR(pos);
        pos = this.gameScene.effect2D.convertToNodeSpace(pos);
        nodeMoney.setPosition(pos);
        nodeMoney.setVisible(false);
        nodeMoney.setScale(3);
        nodeMoney.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.85))),cc.delayTime(3),cc.moveBy(1.25,cc.p(0,100)),cc.removeSelf()));

        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.updateMoney.bind(this), this)));
        this.gameScene.effect2D.addChild(nodeMoney);
    },

    updateMoneyFromLobby: function(){

    }

});

Sam.PlayerHold.sunnodetag = 111;
Sam.PlayerHold.boluottag = 15;

