//
BaiCao.PlayerDisplay = cc.Node.extend({
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

    initMyPlayer:function(){
        this.setVisible(true);
    },

    initWithCards: function(cards){
        if(this.text_dat_cuoc){
            this.text_dat_cuoc.setVisible(false);
        }

        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.cards.push(cards[i]);
        }


        for(var i = 0; i < cards.length; i++){
            cc.log("initWithCards: " + i + " " + cards[i]);
            this.handOnCards[i].setTexture(cc.textureCache.addImage(BaiCao.CardSprite.getResource(cards[i])));
        }
    },

    upBai: function(){
        for(var i = 0; i < this.handOnCards.length; i++){
            this.handOnCards[i].setVisible(false);
        }
    },

    initMoneyBetButton: function(moneyBet){
        // cc.log("initMoneyBetButton" + moneyBet);
        if(this.betButtonList !== undefined && this.betButtonList.length == 4){
            for(var i = 1; i <= 4; i++){
                this.betButtonList[i-1].setTitleColor(cc.WHITE);
                this.betButtonList[i-1].setTitleText(StringUtility.formatNumberSymbol(i*moneyBet));
                this.betButtonList[i-1].setTitleFontSize(20);
                //cc.log("initMoneyBetButton betButtonList" + StringUtility.formatNumberSymbol( i*moneyBet));
            }
        }
        if(this.bienButtonList !== undefined && this.keButtonList !== undefined){
            for(var i = 1; i <= 2; i++){
                this.bienButtonList[i-1].setTitleText(StringUtility.formatNumberSymbol(i*moneyBet));
                this.bienButtonList[i-1].setTitleColor(cc.WHITE);
                this.bienButtonList[i-1].setTitleFontSize(20);

                this.keButtonList[i-1].setTitleColor(cc.WHITE);
                this.keButtonList[i-1].setTitleFontSize(20);
                this.keButtonList[i-1].setTitleText(StringUtility.formatNumberSymbol(i*moneyBet));
                //cc.log("initMoneyBetButton bienButtonList" + StringUtility.formatNumberSymbol(i*moneyBet));
            }
        }
    },

    initPlayerDisplay: function(){
        //cc.log("initPlayerDisplay 1");
        var cardTemp = new Sam.CardSprite(52);
        var avatarPanel = this.panel.getChildByName("avatarPanel");
        avatarPanel.getChildByName("imgChuong").setVisible(false);
        this.panel.getChildByName("iconGa").setVisible(false);
        for(var i = 1; i <= 3; i++){
            this.panel.getChildByName("cardPanel").getChildByName("card" + i).setVisible(false);
            //ccui.helper.seekWidgetByName(this.panel, "card" + i).setVisible(false);
            //  cc.log("initPlayerDisplay 5 " + i);
        }

        if(this.index == 0){
            this.betButtonList = [];
            for(var i = 1; i <=4; i++){
                this["btnDatCuoc"+i] = this.panel.getChildByName("btn_dat_cuoc_" + i);
                this.betButtonList[i-1] = this["btnDatCuoc"+i];
                this["btnDatCuoc"+i].setVisible(false);
                this.text_dat_cuoc = this.panel.getChildByName("text_dat_cuoc");
            }
        }
        else{
            this.bienButtonList = [];
            this.keButtonList = [];
            for(var i = 1; i <=2; i++){
                this["btnBien" + i] = this.panel.getChildByName("btnBien" + i);
                this.bienButtonList[i-1] = this["btnBien" + i];
                this["btnKe"  + i] = this.panel.getChildByName("btnKe" + i);
                this.keButtonList[i-1] = this["btnKe"  + i];
                this["btnBien" + i].setVisible(false);
                this["btnKe"  + i].setVisible(false);
            }
            this["btnOk"] = this.panel.getChildByName("btnOk");
            this.btnOk.setVisible(false);
            this.iconNotify = this.panel.getChildByName("notify");
            this.iconNotify.setVisible(false);
            this.textDanhBien = this.panel.getChildByName("textDanhBien");
            this.textDanhBien.setVisible(false);
            this.textKeCua = this.panel.getChildByName("textKeCua");
            this.textKeCua.setVisible(false);
        }

        this.iconGa = this.panel.getChildByName("iconGa");
        //cc.log("initPlayerDisplay 15 " + i);
        this.iconGa.setVisible(false);
        this.cardList = [];
        this.handOnCards = [];
        //this.cardPanel = ccui.helper.seekWidgetByName(this.panel, "cardPanel");
        this.cardPanel = this.panel.getChildByName("cardPanel");
        cc.log("initPlayerDisplay 16 " + i);
        for(i = 1; i <= 3; i++){
            this["card" + i] = this.cardPanel.getChildByName("card" + i);
            var baCayCard = new BaCay.CardSprite(0);
            baCayCard.setPosition(this["card" + i].getPosition());
            baCayCard.setScale(this["card" + 1].getScale());
            this.cardPanel.addChild(baCayCard);
            this["card" + i].setVisible(false);
            this.cardList.push(this["card" + i]);
            this.handOnCards.push(baCayCard);
            baCayCard.setVisible(false);
        }

        cc.log("initPlayerDisplay 2 " + this.index);
        this.uiAvatar = avatarPanel.getChildByName("btnAvatar");
        this.avatar = avatarPanel.getChildByName("avatar");
        this.uiName = avatarPanel.getChildByName("name");
        this.uiGold = avatarPanel.getChildByName("gold");
        this.iconChuong = avatarPanel.getChildByName("imgChuong");
        this.iconChuong.setVisible(false);
        this.notify = this.panel.getChildByName("notify");
        this.moneyBet = this.panel.getChildByName("moneyBet");
        this.moneyBet.setString("0");
        this.moneyBet.setVisible(false);
        this.view = this.panel.getChildByName("view");
        this.view.setVisible(false);
        this.iconOutRoom = avatarPanel.getChildByName("iconOut");
        this.iconOutRoom.setVisible(false);
    },

    updateWithPlayer: function(player)
    {
        //cc.log("player index " + player.index);
        if(player.status == 0)
        {
            this.setVisible(false);
            return;
        }
        this.setVisible(true)
        this.uiName.setString(player.info["nickName"]);
        this.uiGold.setString(StringUtility.standartNumber(player.info["money"]));
        // Thay doi avatar theo loai

        var avatarUrl = player.info["avatar"];
        this.setAvatarChuan(avatarUrl);

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
    },

    setAvatarChuan: function(avatarUrl){
        cc.log("avatarUrl: " + avatarUrl);
        this.avatar.loadTexture(gameUtility.getAvatarPath(avatarUrl));
    },

    updateTienCuoc: function(){
        if(!this.isChuong()) {
            this.moneyBet.setVisible(true);
            this.moneyBet.setString("Cược: " + StringUtility.standartNumber(BaiCao.gameLogic.players[this.index].moneyBet));
        }else{
            this.moneyBet.setVisible(false);
        }
    },

    showIconChuong: function(isChuong){
        this.iconChuong.setVisible(isChuong);
    },

    showIConGa: function(vaoGa){
        this.iconGa.setVisible(vaoGa);
    },

    startDanhBien: function(){
        if(this.isChuong()){
            //do nothing;
        }
        else{
            if (this.index != 0) { // nguoi choi khac da vao cuoc
                for (var i = 1; i <= 2; i++) {
                    this["btnBien" + i].setVisible(true);
                    this["btnBien" + i].setEnabled(true);
                }
                for (var i = 1; i <= 2; i++) {
                    this["btnKe" + i].setVisible(true);
                    this["btnKe" + i].setEnabled(true);
                }

                this.textDanhBien.setVisible(true);
                this.textKeCua.setVisible(true);

                if(this.isWaitingDanhBien){
                    this["btnOk"].setVisible(true);
                    for (var i = 1; i <= 2; i++) {
                        this["btnBien" + i].setVisible(false);
                    }
                    this["btnBien" + this.danhBienLevel].setVisible(true);
                    this["btnBien" + this.danhBienLevel].setEnabled(false);
                }

                this.notify.setVisible(false);
            }
        }
    },

    setPositionStart: function(cards){
        for(var i =0; i < cards.length; i++){
            this.handOnCards[i].getPosition(this.cardList[i].getPosition());
        }
    },

    hideEndGame: function(){
        var i;
        if(this.index != 0){ // nguoi choi khac
            for(i = 1; i <= 2; i++){
                this["btnBien" + i].setVisible(false);
                this["btnBien" + i].setEnabled(true);
            }
            for(i = 1; i <= 2; i++){
                this["btnKe" + i].setVisible(false);
                this["btnKe" + i].setEnabled(true);
            }
            for(i = 1; i <=3; i++){
                this["card" + i].setVisible(false);
            }
            this["btnOk"].setVisible(false);
            this["btnOk"].setEnabled(true);
            this.textDanhBien.setVisible(false);
            this.textKeCua.setVisible(false);
            this.notify.setVisible(false);
        }else {
            for (i = 1; i <= 4; i++) {
                this["btnDatCuoc" + i].setVisible(false);
            }
            this.text_dat_cuoc.setVisible(false);
        }
        this.iconGa.setVisible(false);
        this.moneyBet.setString("0");
        this.moneyBet.setVisible(false);
        this.iconOutRoom.setVisible(false);

        this.isWaitingDanhBien = false;
        this.hideBai();
        this.hasMoBai = false;
        this.hideDisplayDiem();
    },

    hideDatCuoc: function(){
        if(this.index != 0){ // nguoi choi khac
            for (i = 1; i <= 2; i++) {
                this["btnBien" + i].setVisible(false);
                this["btnBien" + i].setEnabled(true);
            }
            for (i = 1; i <= 2; i++) {
                this["btnKe" + i].setVisible(false);
                this["btnKe" + i].setEnabled(true);
            }
            for (i = 1; i <= 3; i++) {
                this["card" + i].setVisible(false);
            }
            this["btnOk"].setVisible(false);
            this["btnOk"].setEnabled(true);
            this.notify.setVisible(false);
            this.textDanhBien.setVisible(false);
            this.textKeCua.setVisible(false);
        }else if(this.isChuong()){
            for(i = 1; i <= 4; i++){
                this["btnDatCuoc"+i].setVisible(false);
                this["btnDatCuoc"+i].setEnabled(false);
            }
        }else{
            for(i = 1; i <= 4; i++){
                this["btnDatCuoc"+i].setVisible(true);
                this["btnDatCuoc"+i].setEnabled(true);
            }
            this.text_dat_cuoc.setVisible(true);
        }
        if(!this.isChuong()) {
            this.moneyBet.setVisible(true);
        }
    },

    hideWhenChiaBai: function(){
        var i;
        if(this.index != 0){ // nguoi choi khac
            for(i = 1; i <= 2; i++){
                this["btnBien" + i].setVisible(false);
            }
            for(i = 1; i <= 2; i++){
                this["btnKe" + i].setVisible(false);
            }
            for(i = 1; i <=3; i++){
                this["card" + i].setVisible(false);
            }
            this["btnOk"].setVisible(false);
            this.textDanhBien.setVisible(false);
            this.textKeCua.setVisible(false);
        }
        else{
            for(i = 1; i <= 4; i++){
                this["btnDatCuoc" + i].setVisible(false);
            }
        }
    },

    setDatCuoc: function(level){
        if(this.index == 0){
            cc.log("setDatCuoc" + level);
            for(i = 1; i <= 4; i++){
                if(i != level)
                    this["btnDatCuoc"+i].setVisible(false);
            }
            this["btnDatCuoc" + level].setEnabled(false);
        }
    },

    setKeCua: function(level){
        cc.log("setKe" + level);
        for(i = 1; i <= 2; i++){
            if(i != level)
                this["btnKe"+i].setVisible(false);
        }

        this["btnKe" + level].setEnabled(false);
    },

    setYeuCauDanhBien: function(level){
        this.isWaitingDanhBien = true;
        this.danhBienLevel = level;
        for(var i = 1; i <= 2; i++){
            if(i != level)
                this["btnBien" + i].setVisible(false);
        }
        this["btnBien" + level].setEnabled(false);
        this.btnOk.setVisible(true);
        this.btnOk.setEnabled(true);
    },

    setChapNhanDanhBien: function(){
        for(var i = 1; i <=  2; i++){
            //this["btnBien" + i].setVisible(false);
            this["btnBien" + i].setEnabled(false);
        }
        this.btnOk.setVisible(false);
        this.iconNotify.setVisible(true);
    },

    moBai: function(){
        if(this.hasMoBai)
            return;
        this.hasMoBai = true;
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);
            this.cardList[i].runAction(cc.sequence(cc.scaleTo(0.1,0.1,1.0), cc.hide(), cc.scaleTo(0, 1.0, 1.0)));
            this.handOnCards[i].setScale(0.1,1.0);
            this.handOnCards[i].runAction(cc.sequence(cc.delayTime(0.1), cc.show(), cc.scaleTo(0.1,1.0,1.0)));
        }

        cc.log("moBai ");
        var cards = [];
        for(var i = 0; i < this.cards.length; i++){
            cards.push(new BaiCao.Card(this.cards[i]));
        }

        var bo = new BaiCao.BoBaiCao(cards);


        var typeString = bo.getNameImage();

        this.typeString = typeString;
        this.needShadown = bo.needShadown();
        cc.log("typeString: " + typeString);
        this.runAction(cc.sequence(cc.delayTime(0.12), cc.callFunc(this.displayDiem.bind(this))));
    },


    updateMoney2: function(money){
        //cc.log("updateMOney" + BaCay.gameLogic.players[this.index].info["money"]);
        cc.log("string: " + StringUtility.standartNumber(BaiCao.gameLogic.players[this.index].info["money"]))
        this.uiGold.setString(StringUtility.standartNumber(BaiCao.gameLogic.players[this.index].info["money"]));
    },

    displayBai: function(){
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(true);
        }
        for(var i = 0; i < this.handOnCards.length; i++){
            this.handOnCards[i].setVisible(false);
        }
    },

    displayDiem: function(){
        cc.log("displayDiem: " + this.typeString)
        if(this.nodeDiem){
            this.nodeDiem.removeFromParent();
        }

        var node;
        if(this.needShadown){
            node = GuiUtil.createSprite("res/CardGame/CommonResource/DiemBoBai/diem3Cay/shadown.png"); //new cc.Sprite("res/CardGame/CommonResource/DiemBoBai/diem3Cay/shadown.png");
            //var node2 = new cc.Sprite(this.typeString);
            var node2 = GuiUtil.createSprite(this.typeString);
            node.addChild(node2);
            node2.setPosition(node.getContentSize().width/2, node.getContentSize().height/2);
        }
        else{
            //node = new cc.Sprite(this.typeString);
            node2 = GuiUtil.createSprite(this.typeString);
        }

        this.nodeDiem = node;
        //var cardSprite = new cc.Sprite(BaiCao.res.laBaiChe);
        var cardSprite = GuiUtil.createSprite(BaiCao.res.laBaiChe);
        var pos = this.cardList[1].convertToWorldSpaceAR(cc.p(0,-cardSprite.height*0.02));
        pos = this.gameScene.effect2D.convertToNodeSpace(pos);
        this.gameScene.effect2D.addChild(node);
        node.setPosition(pos);
        node.setVisible(false);
        node.runAction(cc.sequence(cc.show(), cc.scaleTo(0.3, 1.15), cc.scaleTo(0.3, 0.87), cc.scaleTo(0.3, 1.0)));
    },

    hideDisplayDiem: function(){
        if(this.nodeDiem)
            this.nodeDiem.removeFromParent();
        this.nodeDiem = null;
    },

    hideBai: function(){
        for(var i = 0; i < this.cardList.length; i++){
            this.cardList[i].setVisible(false);
            this.handOnCards[i].setVisible(false);
        }
    },

    clearBai: function(){
        var i = 0;
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
            target.handOnCards[target.endCardId].upDown();
            if(target.handOnCards[target.endCardId].isUp) {
                target.gameScene.kiemTraDanhBai(true);
            }
            else{
                target.gameScene.kiemTraDanhBai();
            }
        }
    },

    clearBoluot: function() {
        var parent = this.panel.getChildByName("bg_progress");
        if(parent.getChildByTag(BaiCao.PlayerDisplay.boluottag))
        {
            parent.getChildByTag(BaiCao.PlayerDisplay.boluottag).stopAllActions();
            parent.getChildByTag(BaiCao.PlayerDisplay.boluottag).setScale(1.1);
            parent.getChildByTag(BaiCao.PlayerDisplay.boluottag).runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.5),cc.removeSelf()));
        }
    },

    clearBaiEndGame: function() {
        for(var i=0;i<this.baiEndGame.length;i++){
            this.baiEndGame[i].runAction(cc.sequence(cc.fadeOut(.4),cc.removeSelf()));
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

    clearHandOncard: function() {
    },

    // Them effect thang'
    addThang: function(delayTime, samthanhcong) {
        var time = .5;
        if(delayTime && isNaN(delayTime))
            time = delayTime;
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
            sprite2.setPosition(winSize.width/2, sprite2.getContentSize().height/2);
            sprite2.setOpacity(0);sprite2.setScale(3);sprite2.setVisible(false);
            sprite2.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.9))),cc.callFunc(function(){
                var forever = cc.repeatForever(cc.sequence(cc.scaleTo(.35,.93),cc.scaleTo(.35,.9)));
                this.runAction(forever);
            }.bind(sprite2))));
        }
    },

    addThua: function(delayTime) {
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
            sprite2.setPosition(winSize.width/2,sprite2.getContentSize().height/2);
            sprite2.setOpacity(0);sprite2.setScale(3);sprite2.setVisible(false);
            sprite2.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.9))),cc.callFunc(function(){
                var forever = cc.repeatForever(cc.sequence(cc.scaleTo(.35,.93),cc.scaleTo(.35,.9)));
                this.runAction(forever);
            }.bind(sprite2))));
        }

    },

    clearThangThua: function() {
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

    // Effect tien` khi het van' choi
    addMoney: function(money, time) {
        if(!time){
            time = 0;
        }

        if(this.nodeMoney){
            this.nodeMoney.removeFromParent();
        }

        var nodeMoney = gameUtility.createNodeMoney(money);
        this.nodeMoney = nodeMoney;
        nodeMoney.setLocalZOrder(5);
        this.gameScene.effect2D.addChild(nodeMoney);

        this.updateMoney = function(){
            cc.log("updateMOney" + BaiCao.gameLogic.players[this.index].info["money"]);
            cc.log("string: " + StringUtility.standartNumber(BaiCao.gameLogic.players[this.index].info["money"]))
            this.uiGold.setString(StringUtility.standartNumber(BaiCao.gameLogic.players[this.index].info["money"]));
        }


        var pos = cc.p(0,0);
        if(this.index == 5 || this.index == 6){
            pos = this.uiAvatar.convertToWorldSpaceAR(cc.p(this.uiAvatar.getContentSize().width*(-0.5), 0));
        }
        else{
            pos = this.iconOutRoom.convertToWorldSpaceAR(pos);
        }

        pos = this.gameScene.effect2D.convertToNodeSpace(pos);

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

    isChuong: function(){
        return this.index == BaiCao.gameLogic.chuongChair;
    }
});
BaiCao.PlayerDisplay.sunnodetag = 9211;
BaiCao.PlayerDisplay.boluottag = 9215;
