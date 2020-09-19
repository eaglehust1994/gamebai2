/**
 * Created by Tuan on 08-Aug-16.
 */

var EffectLayer = BaseLayer.extend({
    ctor: function(gameGui){
        this._super();
        this.gameGui = gameGui;
        this.arrangeStateText = [];
        this.arrangeStateAction = [];
        this.chatImage = [];
        this.clear();

        this.my_currentmoney = 0;
    },

    clear: function(){
        cc.log("Clear all effects");
        this.removeAllChildren();
        this.stopAllActions();
        this.waitingMatchStartText = null;
        this.waitingMatchEndText = null;
        this.waitingOtherPlayers = null;
        this.waitingArrangeText = null;

        this.maubinhType = [];
        this.groupKind = [];
        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++)
            this.groupKind[i] = [];

        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            this.arrangeStateText[i] = null;
            this.arrangeStateAction[i] = null;
        }

        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            this.chatImage[i] = null;
        }
    },

    chiabai: function(chairIndex, playerCard) {
        for (var i = 0; i < 13; i++) {
            var curCard = this.gameGui.getCardSprite(chairIndex, i);
            var cardEffect = GuiUtil.createSprite("res/CardGame/LaBai/labai_52.png");
            cardEffect.setScale(GameGui.MY_CARD_SO_BAI_SCALE);
            cardEffect.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height/2-i*1);
            cardEffect.setLocalZOrder(13-i);
            cardEffect.runAction(cc.sequence(
                cc.delayTime(0.1 * (i + 1)),
                cc.spawn(
                    cc.moveTo(0.2, curCard.getPosition()),
                    cc.scaleTo(0.2, curCard.getScale())
                ),
                cc.scaleTo(0.1, 0, curCard.getScaleY()),
                cc.callFunc(function (chairIndex, cardIndex) {
                    var curCard = this.gameGui.getCardSprite(chairIndex, cardIndex);
                    if (chairIndex == 0) { //self-player
                        var cardId = playerCard.getGroupCardContainsIndex(cardIndex).cardList[cardIndex % 5].id;
                        GuiUtil.changeSprite(curCard, GuiUtil.getCardResource(cardId));
                        curCard.setVisible(true);
                        curCard.runAction(cc.scaleTo(0.1, curCard.getScale()));
                        curCard.setScaleX(0.1);
                    }
                    else {
                        curCard.setVisible(true);
                    }
                }.bind(this, chairIndex, i)),
                cc.removeSelf()
            ));
            this.addChild(cardEffect);
        }
    },

    showWaitingMatchStart: function(countdownTime){
        cc.log("showWaitingMatchStart");
        if (!this.waitingMatchStartText){
            this.waitingMatchStartText = GuiUtil.createSprite("res/CardGame/MauBinh/match_start_after_time_text.png");
            this.waitingMatchStartText.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height*2/3);

            var numberSprite = new NumberSprite(countdownTime, NumberType.NUMBER_COUNT_TIME);
            numberSprite.setPosition(this.waitingMatchStartText.getContentSize().width/2, -30);
            numberSprite.startCountdown(this.onWaitingMatchStartFinish.bind(this));
            this.waitingMatchStartText.addChild(numberSprite);

            this.addChild(this.waitingMatchStartText);
        }
    },

    onWaitingMatchStartFinish: function(){
        cc.log("onWaitingMatchStartFinish");
        if (this.waitingMatchStartText){
            this.waitingMatchStartText.removeFromParent();
            this.waitingMatchStartText = null;
        }
    },

    showWatingArrange: function(countdownTime){
        if (!this.waitingArrangeText){
            this.waitingArrangeText = GuiUtil.createSprite("res/CardGame/MauBinh/time_arrange_text.png");
            this.waitingArrangeText.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height*2/3);

            var numberSprite = new NumberSprite(countdownTime, NumberType.NUMBER_COUNT_TIME);
            numberSprite.setPosition(this.waitingArrangeText.getContentSize().width + 40, this.waitingArrangeText.getContentSize().height/2);
            numberSprite.startCountdown(function(){
                gameWsClient.sendAutoBinhSoChi();
                this.onWaitingArrangeFinish();
            }.bind(this));
            this.waitingArrangeText.addChild(numberSprite);

            this.addChild(this.waitingArrangeText);
        }
    },

    onWaitingArrangeFinish: function(){
        if (this.waitingArrangeText){
            this.waitingArrangeText.removeFromParent();
            this.waitingArrangeText = null;

            this.gameGui.onWaitingArrangeFinish();
        }
    },

    showMauBinhType: function(chairIndex, mauBinhType) {
        cc.log("showMauBinhType: chairIndex = " + chairIndex + ", mauBinhType = " + MauBinhPlayerCard.getMauBinhString(mauBinhType));

        if (mauBinhType != MauBinh.Type.BINH_THUONG){

            var sprite = this.maubinhType[chairIndex];
            if (!sprite){
                var sprite = GuiUtil.createSprite("res/CardGame/MauBinh/maubinh_type_" + mauBinhType+".png");
                this.addChild(sprite);
                this.maubinhType[chairIndex] = sprite;
            }
            else{
                GuiUtil.changeSprite(sprite, "res/CardGame/MauBinh/maubinh_type_" + mauBinhType+".png");
            }
            sprite.stopAllActions();
            sprite.setPosition(this.gameGui.player_cardList[chairIndex][7].getPosition());
            sprite.setScaleX(0);
            sprite.runAction(cc.sequence(
                cc.scaleTo(0.3, this.gameGui.player_cardList[chairIndex][7].getScale()/GameGui.MY_CARD_ARRANGE_SCALE)
            ));
        }
        else{
            cc.log("remove maubinh type");
            if (this.maubinhType[chairIndex]){
                this.maubinhType[chairIndex].removeFromParent();
                this.maubinhType[chairIndex] = null;
            }
        }
    },

    showGroupKind: function(chairIndex, chiIndex, groupKind, groupKindLevel, autoRemove){
        var strRes = "res/CardGame/CommonResource/DiemBoBai/diemMauBinh/group_kind_" + groupKind;
        if (groupKindLevel == MauBinh.GroupKindLevel.THUONG) strRes = strRes+"_thuong";
        else if (groupKindLevel == MauBinh.GroupKindLevel.HA) strRes = strRes+"_ha";

        if ((groupKind<=2) && (chiIndex == 2)) strRes = strRes+"_chi2";
        if ((groupKind==5) && (chiIndex == 3)) strRes = strRes+"_chi3";

        var spriteText = this.groupKind[chairIndex][chiIndex];
        if (!spriteText){
            spriteText = GuiUtil.createSprite();
            spriteText.setVisible(false);
            this.addChild(spriteText);
            this.groupKind[chairIndex][chiIndex] = spriteText;
        }
        var pos = cc.p(0,0);
        switch (chiIndex){
            case 1:
                pos = this.gameGui.player_cardList[chairIndex][2].getPosition();
                break;
            case 2:
                pos = this.gameGui.player_cardList[chairIndex][7].getPosition();
                break;
            case 3:
                pos = this.gameGui.player_cardList[chairIndex][11].getPosition();
                break;
        }
        spriteText.stopAllActions();
        spriteText.setPosition(pos);
        var scale = this.gameGui.player_cardList[chairIndex][2].getScale()/GameGui.MY_CARD_SO_BAI_SCALE;
        spriteText.setScale(scale);
        GuiUtil.changeSprite(spriteText, strRes+".png");

        if (!spriteText.isVisible()){
            spriteText.setVisible(true);
            spriteText.setScaleX(0);
            spriteText.runAction(cc.sequence(
                cc.scaleTo(0.3, scale),
                cc.delayTime(2.0),
                cc.callFunc(function(){
                    if (autoRemove){
                        this.groupKind[chairIndex][chiIndex].setVisible(false);
                    }
                }.bind(this))
            ));
        }

    },

    hideGroupKind: function(chairIndex, chiIndex){
        if (this.groupKind[chairIndex][chiIndex]){
            this.groupKind[chairIndex][chiIndex].setVisible(false);
        }
    },

    setArrangeState: function(chairIndex, isDone){
        cc.log("setArrangeState: chairIndex=" + chairIndex + ": " + isDone);

        //remove text cu
        if (this.arrangeStateText[chairIndex]){
            this.arrangeStateText[chairIndex].removeFromParent();
            this.arrangeStateText[chairIndex] = null;
        }

        if (!isDone){
            cc.log("tao trang thai dang xep");
            this.arrangeStateText[chairIndex] = GuiUtil.createSprite("res/CardGame/MauBinh/arranging_text.png");
            this.arrangeStateText[chairIndex].setPosition(this.gameGui.player_cardList[chairIndex][2].getPosition());
            this.arrangeStateText[chairIndex].setName("arranging_text_" + chairIndex);
            this.addChild(this.arrangeStateText[chairIndex]);

            if (!this.arrangeStateAction[chairIndex]){
                cc.log("run action trao bai doi thu: " + chairIndex);
                //action trao 2 quan bai bat ky
                var action = cc.sequence(
                    cc.delayTime(MauBinhMathUtil.randomBetween(1,3)),
                    cc.callFunc(function(){
                        var cardList = this.gameGui.player_cardList[chairIndex];
                        var card1 = cardList[MauBinhMathUtil.randomBetween(0, 13)];
                        var card2 = cardList[MauBinhMathUtil.randomBetween(0, 13)];
                        var posTemp = card1.getPosition();
                        card1.setPosition(card2.getPosition());
                        card2.setPosition(posTemp);
                        card1.runAction(cc.moveTo(0.5, card2.getPosition()));
                        card2.runAction(cc.moveTo(0.5, card1.getPosition()));
                    }.bind(this))
                ).repeatForever();
                this.runAction(action);
                this.arrangeStateAction[chairIndex] = action;
            }
        }
        else{
            if (this.arrangeStateAction[chairIndex]) {
                cc.log("Stop trao bai action doi thu: " + chairIndex);
                //tra cac la bai ve vi tri ban dau cua no
                var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);
                var cardList = playerInfo.playerCard.getAllCards();
                for (var i=0; i<cardList.length; i++) {
                    var cardDisplay = cardList[i].display;
                    cardDisplay.sprite.stopAllActions();
                    cardDisplay.setPosition(cardDisplay.rootPosition);
                    cardDisplay.setLocalZOrder(cardDisplay.rootZOrder);
                }
                this.stopAction(this.arrangeStateAction[chairIndex]);
                this.arrangeStateAction[chairIndex] = null;

                this.arrangeStateText[chairIndex] = GuiUtil.createSprite("res/CardGame/MauBinh/arranged_text.png");
                this.arrangeStateText[chairIndex].setPosition(this.gameGui.player_cardList[chairIndex][2].getPosition());
                this.arrangeStateText[chairIndex].setName("arranged_text_" + chairIndex);
                this.addChild(this.arrangeStateText[chairIndex]);
            }
        }
    },

    // removeAllArrangeStateText: function(){
    //     cc.log("remove all arrange state text");
    //     for (var key in this.arrangeStateText){
    //         this.arrangeStateText[key].removeFromParent();
    //         this.arrangeStateText[key] = null;
    //         this.stopAction(this.arrangeStateAction[key]);
    //     }
    //     this.arrangeStateText = [];
    //     this.arrangeStateAction = [];
    // },

    // createArrangingText: function(){
    //     var arrangingText = GuiUtil.createSprite("res/MauBinh/arranging_text.png");
    //     for (var i=0; i<3; i++){
    //         var dot = GuiUtil.createSprite("res/MauBinh/arranging_dot.png");
    //         dot.setPosition(arrangingText.getContentSize().width-5 + (i+1)*10, arrangingText.getContentSize().height/4);
    //         arrangingText.addChild(dot);
    //         dot.runAction(cc.sequence(
    //             cc.delayTime(0.1*i),
    //             cc.callFunc(function(target){
    //                 target.runAction(cc.blink(0.5, 1).repeatForever())}, dot)
    //         ));
    //     }
    //     return arrangingText;
    // },

    showBatSap: function(playerResultList){
        var sapLang = 0;//ko ko sap lang
        var countBiSap3Chi = 0;
        var countBatSap3Chi = 0;
        for (var i=0; i<playerResultList.length; i++) {
            if (playerResultList[i].chairIndex!=0){
                if (playerResultList[i].moneySap > 0)
                    countBiSap3Chi++;
                else if (playerResultList[i].moneySap < 0)
                    countBatSap3Chi++;
            }
        }
        for (var i=0; i<playerResultList.length; i++){
            var textResource = "";
            var textPosition = "";
            if (playerResultList[i].chairIndex == 0){//neu la minh
                if (countBiSap3Chi>0){//neu minh bi sap 3 chi
                    if (countBiSap3Chi==3)//bi sap 3 chi tat ca
                        textResource = "res/CardGame/MauBinh/bi_sap_lang.png";
                    else
                        textResource = "res/CardGame/MauBinh/sap_3_chi.png";
                }
                if (countBatSap3Chi>0){//neu minh bat sap 3 chi
                    if (countBatSap3Chi==3)//bat sap 3 chi tat ca
                        textResource = "res/CardGame/MauBinh/bat_sap_lang.png";
                }
                textPosition = cc.p(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height*1/2);
                this.showMoney(playerResultList[i].chairIndex, playerResultList[i].moneySap, true);
            }
            else{//neu la doi thu
                if (playerResultList[i].moneySap != 0){
                    if (playerResultList[i].moneySap<0){
                        textResource = "res/CardGame/MauBinh/sap_3_chi.png";
                        textPosition = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(playerResultList[i].chairIndex).playerCard.chiGiua.cardList[2].display.getPosition();
                    }
                    this.showMoney(playerResultList[i].chairIndex, playerResultList[i].moneySap, true);
                }
            }

            if (textResource!=""){
                cc.log("textResource = " + textResource + ", textPos = " + textPosition.x + "," + textPosition.y);
                var scale = playerResultList[i].chairIndex==0?1.5:1.0;

                var textNoti = GuiUtil.createSprite(textResource);
                textNoti.setPosition(textPosition);
                this.addChild(textNoti);

                textNoti.setScaleX(0);
                textNoti.runAction(cc.sequence(
                    cc.scaleTo(0.3, scale, scale),
                    cc.delayTime(2.0),
                    cc.scaleTo(0.3, 0, scale),
                    cc.removeSelf()
                ));
            }
        }
    },

    showSoAt: function(){

        var res = "res/CardGame/MauBinh/So_At.png";
        var sprite = GuiUtil.createSprite(res);
        var size = GameScene.getMainContentSize();
        sprite.setPosition(size.width/2, size.height/2);
        this.addChild(sprite);
        sprite.setScaleX(0);
        sprite.runAction(cc.sequence(
            cc.scaleTo(0.3, 1, 1),
            cc.delayTime(2.4),
            cc.scaleTo(0.3, 0, 1),
            cc.removeSelf()
        ));
    },

    showMoney: function(chairIndex, money, isMoneyChi){
        cc.log("show Money: chairIndex = " + chairIndex + ", money = " + money);
        isMoneyChi = (isMoneyChi == undefined) ? false: isMoneyChi;
        var position = this.gameGui.convertToNodeSpace(this.gameGui["player_slot_"+chairIndex].convertToWorldSpace(this.gameGui["avatar_" + chairIndex].getPosition()));
        var res = "";
        if (money>=0) res = "res/CardGame/MauBinh/win_text.png";
        else if (money<0) res = "res/CardGame/MauBinh/lose_text.png";

        var sprite = GuiUtil.createSprite(res);
        sprite.setPosition(position.x, position.y + 20);
        this.addChild(sprite);

        var moneyText = new NumberSprite(money, money>=0?NumberType.NUMBER_THANG:NumberType.NUMBER_THUA, true);
        moneyText.setPosition(sprite.getContentSize().width/2, -20);
        moneyText.setScale(0.9);
        sprite.addChild(moneyText);

        if (isMoneyChi){
            moneyText.setPositionX(sprite.getContentSize().width/2-45);

            var chiText = GuiUtil.createSprite("res/CardGame/MauBinh/chi_text_" + (money>=0?"win":"lose") + ".png");
            chiText.setScale(moneyText.getScale());
            chiText.setPosition(sprite.getContentSize().width/2+25, moneyText.getPositionY()-5);
            sprite.addChild(chiText);
        }
        else{

        }

        sprite.setScaleX(0);
        sprite.runAction(cc.sequence(
            cc.scaleTo(0.3, 1, 1),
            cc.delayTime(2.4),
            cc.scaleTo(0.3, 0, 1),
            cc.removeSelf()
        ));
    },

    showWaitingMatchEnd: function(countdownTime){

        if (!this.waitingMatchEndText){
            this.waitingMatchEndText = GuiUtil.createSprite("res/CardGame/MauBinh/waiting_next_game.png");
            this.waitingMatchEndText.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height*2/3);
            this.addChild(this.waitingMatchEndText);

            if (countdownTime!=undefined){
                var numberSprite = new NumberSprite(countdownTime, NumberType.NUMBER_COUNT_TIME);
                numberSprite.setPosition(this.waitingMatchEndText.getContentSize().width/2, -30);
                numberSprite.startCountdown();
                this.waitingMatchEndText.addChild(numberSprite);
            }
        }
    },

    showWaitingOtherPlayers: function(){
        if (!this.waitingOtherPlayers){
            this.waitingOtherPlayers = GuiUtil.createSprite("res/CardGame/MauBinh/waiting_other_players_text.png");
            this.waitingOtherPlayers.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height*2/3);
            this.addChild(this.waitingOtherPlayers);
        }
    },

    updateChatRoom: function(globalChairIndex, image){
        var localChair = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(globalChairIndex);
        var position = this.gameGui.convertToNodeSpace(this.gameGui["player_slot_"+localChair].convertToWorldSpace(this.gameGui["avatar_" + localChair].getPosition()));
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