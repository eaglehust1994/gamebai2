/**
 * Created by Tuan on 01-Aug-16.
 */

var GameGui = BaseLayer.extend({

    ctor: function () {
        this.player_cardList = [];
        this.firstCard = null;
        this.secondCard = null;
        this.cardBorder = null;
        this.touchListener = null;
        this.btnArrange = null;
        this.effectLayer = null;
        this.chatLayer = null;
        this.overlap = 4/5;
        this.arrangeFog = null;
        this._super("GameGui");
        this.hasInfoHuVang = false;
        this.customizeGUI2();
        //this.initWithBinaryFile("res/g_res_cardGame_json_MauBinhGameGui.json");
    },
    customizeGUI2:function()
    {
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/MauBinh/PlistMauBinh.plist","res/CardGame/MauBinh/PlistMauBinh.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        var size = GameScene.getMainContentSize();
        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width/2, size.height / 2);
        touchBtn.setOpacity(0);
        this.addSprite(this,"Image_1",cc.p(640,360),res_CardGame_CommonResource_BanChoi+ "/bg_layer_banchoi.png");
        this.addSprite(this,"mb_bg_name",cc.p(640,360),res_CardGame_MauBinh + "/mb_bg_name.png");
        this.addButton(this,"btnBack",2000,cc.p(58,674),true,res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png");
        this.btnBack.addClickEventListener(this.onBtnBackClicked.bind(this));
        this.addButton(this,"btnCheatCard",2000,cc.p(58,78),true,res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png");

        if(CURRENT_MODE != MODE_DEPLOY.LIVE) {
            this.btnCheatCard.addClickEventListener(this.onBtnCheatCardClicked.bind(this));
        }else{
            this.btnCheatCard.setVisible(false);
        }
        this.addButton(this,"btnQuestion",2000,cc.p(1106,663),true,res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png");
        this.btnQuestion.addClickEventListener(this.onBtnQuestionClicked.bind(this));
        this.addButton(this,"btnChat",2000,cc.p(1207,663),true,res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png");
        this.btnChat.addClickEventListener(this.onBtnChatClicked.bind(this));

        this.addSprite(this,"kindOfChiSlot",cc.p(210,88),res_CardGame_MauBinh + "/kind_of_chi_slot.png");
        this.kindOfChiSlot.setLocalZOrder(GameGui.MAIN_PLAYER_Z_ORDER);
        this.kindOfChiSlot.setVisible(false);
        this.addText(this.kindOfChiSlot,"text_chi_3_kind",cc.p(109,101),"Củ lũ",RobotoRegular.fontName,18);
        this.text_chi_3_kind.ignoreContentAdaptWithSize(false);
        this.text_chi_3_kind.setContentSize(cc.size(150,23));
        this.text_chi_3_kind.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addText(this.kindOfChiSlot,"text_chi_2_kind",cc.p(109,66),"Củ lũ",RobotoRegular.fontName,18);
        this.text_chi_2_kind.ignoreContentAdaptWithSize(false);
        this.text_chi_2_kind.setContentSize(cc.size(150,23));
        this.text_chi_2_kind.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.addText(this.kindOfChiSlot,"text_chi_1_kind",cc.p(109,34),"Củ lũ",RobotoRegular.fontName,18);
        this.text_chi_1_kind.ignoreContentAdaptWithSize(false);
        this.text_chi_1_kind.setContentSize(cc.size(150,23));
        this.text_chi_1_kind.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

        this.addText(this.kindOfChiSlot,"text_chi_1_kind_stt",cc.p(23,34),"3.",RobotoRegular.fontName,18);
        this.addText(this.kindOfChiSlot,"text_chi_2_kind_stt",cc.p(23,66),"2.",RobotoRegular.fontName,18);
        this.addText(this.kindOfChiSlot,"text_chi_3_kind_stt",cc.p(23,101),"3.",RobotoRegular.fontName,18);

        this.addButton(this,"btnArrange",-1,cc.p(1123,70),true,res_CardGame_MauBinh + "/btn_arrange_so_chi.png",res_CardGame_MauBinh + "/btn_arrange_so_chi.png");
        this.btnArrange.addClickEventListener(this.onBtnArrangeClicked.bind(this));
        this.btnArrange.setLocalZOrder(GameGui.MAIN_PLAYER_Z_ORDER+1);
        this.setEnableBtnArrange(false);

        this.addButton(this,"btnBaoBinh",-1,cc.p(1123,154),true,res_CardGame_MauBinh + "/btn_arrange_bao_binh.png",res_CardGame_MauBinh + "/btn_arrange_bao_binh.png");
        this.btnBaoBinh.addClickEventListener(this.onBtnBaoBinhClicked.bind(this));
        this.btnBaoBinh.setLocalZOrder(GameGui.MAIN_PLAYER_Z_ORDER+1);
        this.btnBaoBinh.setVisible(false);


        this.addLayout(this,"player_slot_0",cc.p(589,133),null,cc.size(480,254),false);
        this.addImage(this["player_slot_0"],"bg_player_slot_0",cc.p(240,127),res_CardGame_MauBinh + "/player_slot_2.png",cc.size(480,254));
        this.addSprite(this["player_slot_0"],"avatar_0",cc.p(86,127),res_common_avatar + "/Avatar_10.png");
        this.addSprite(this["avatar_0"],"leave_room_0",cc.p(109,92),res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
        this.addText(this["player_slot_0"],"name_player_0",cc.p(86,210),"name_player_0",RobotoRegular.fontName,20);
        this.addText(this["player_slot_0"],"money_player_0",cc.p(86,50),"money_player_0",RobotoRegular.fontName,20);
        this["money_player_0"].setColor(cc.color.YELLOW);
        this.addText(this["player_slot_0"],"view_text_player_0",cc.p(307,127),"Đang xem...",RobotoRegular.fontName,20);


        this.addLayout(this,"player_slot_1",cc.p(1151,396),null,cc.size(263,359),false);
        this.addImage(this["player_slot_1"],"bg_player_slot_1",cc.p(131.5,179.5),res_CardGame_MauBinh + "/player_slot_2.png",cc.size(263,359));
        this["bg_player_slot_1"].setRotationY(180);
        this.addSprite(this["player_slot_1"],"avatar_1",cc.p(131.5,283),res_common_avatar + "/Avatar_10.png");
        this["avatar_1"].setScale(0.75);
        this.addSprite(this["avatar_1"],"leave_room_1",cc.p(109,92),res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
        this.addText(this["player_slot_1"],"name_player_1",cc.p(131.5,346),"name_player_0",RobotoRegular.fontName,20);
        this.addText(this["player_slot_1"],"money_player_1",cc.p(131.5,222),"money_player_0",RobotoRegular.fontName,20);
        this["money_player_1"].setColor(cc.color.YELLOW);
        this.addText(this["player_slot_1"],"view_text_player_1",cc.p(131,55),"Đang xem...",RobotoRegular.fontName,20);


        this.addLayout(this,"player_slot_2",cc.p(605,610),null,cc.size(387,207),false);
        this.addImage(this["player_slot_2"],"bg_player_slot_2",cc.p(198.5,103.5),res_CardGame_MauBinh + "/player_slot_2.png",cc.size(387,207));
        this.addSprite(this["player_slot_2"],"avatar_2",cc.p(79,112),res_common_avatar + "/Avatar_10.png");
        this["avatar_2"].setScale(0.75);
        this.addSprite(this["avatar_2"],"leave_room_2",cc.p(109,92),res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
        this.addText(this["player_slot_2"],"name_player_2",cc.p(79,174),"name_player_0",RobotoRegular.fontName,20);
        this.addText(this["player_slot_2"],"money_player_2",cc.p(79,55),"money_player_0",RobotoRegular.fontName,20);
        this["money_player_2"].setColor(cc.color.YELLOW);
        this.addText(this["player_slot_2"],"view_text_player_2",cc.p(248,107),"Đang xem...",RobotoRegular.fontName,20);



        this.addLayout(this,"player_slot_3",cc.p(139,396),null,cc.size(263,359),false);
        this.addImage(this["player_slot_3"],"bg_player_slot_3",cc.p(131.5,179.5),res_CardGame_MauBinh + "/player_slot_2.png",cc.size(263,359));
        this.addSprite(this["player_slot_3"],"avatar_3",cc.p(131.5,283),res_common_avatar + "/Avatar_10.png");
        this["avatar_3"].setScale(0.75);
        this.addSprite(this["avatar_3"],"leave_room_3",cc.p(109,92),res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
        this.addText(this["player_slot_3"],"name_player_3",cc.p(131.5,346),"name_player_0",RobotoRegular.fontName,20);
        this.addText(this["player_slot_3"],"money_player_3",cc.p(131.5,222),"money_player_0",RobotoRegular.fontName,20);
        this["money_player_3"].setColor(cc.color.YELLOW);
        this.addText(this["player_slot_3"],"view_text_player_3",cc.p(131.5,55),"Đang xem...",RobotoRegular.fontName,20);


        this.addText(this,"lb_ban_title",cc.p(128,690),"Bàn:",RobotoRegular.fontName,20);
        this.addText(this,"text_room_id",cc.p(187,690),"99999",RobotoRegular.fontName,20);
        this.addText(this,"text_#",cc.p(241,690),"#",RobotoRegular.fontName,20);
        this.addText(this,"text_game_id",cc.p(290,690),"100000",RobotoRegular.fontName,20);

        this.addText(this,"lb_muc_cuoc_titile",cc.p(157,659),"Mức cược: ",RobotoRegular.fontName,20);
        this.addText(this,"text_money_bet",cc.p(233,659),"100K",RobotoRegular.fontName,20);

        this.addSprite(this,"image_money_type",cc.p(284,659),res_Common + "/chip/vinChip0.png");

        this.effectLayer = new EffectLayer(this);
        this.addChild(this.effectLayer, GameGui.EFFECT_Z_ORDER);



        this.arrangeFog = new cc.LayerColor(cc.color(0,0,0, 100));
        this.arrangeFog.setVisible(false);
        this.arrangeFog.setContentSize(MainContent.getContentSize());
        this.arrangeFog.setPosition(this.convertToNodeSpace(cc.p(0,0)));
        this.addChild(this.arrangeFog, GameGui.MAIN_PLAYER_Z_ORDER);



        this.cardBorder = GuiUtil.createSprite("res/CardGame/MauBinh/selectCard.png");
        this.cardBorder.setVisible(false);
        this.cardBorder.setScale(1.6);
        this.addChild(this.cardBorder);
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(this.touchListener,this);
        this.touchListener.setEnabled(false);

        this.huVangIcon = new ThongTinHuVang();
        this.huVangIcon.setBoBaiByType(GameList.MauBinh);
        this.addChild(this.huVangIcon);
        this.huVangIcon.setScale(0.6);
        this.huVangIcon.setPosition(1140, 610);
        this.huVangIcon.addHuListener();
        this.huVangIcon.setVisible(false);
        //if(gameWsClient){
        //    gameWsClient.sendThongTinHuVang();
        //}




        this.initCards();

        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            this.removePlayer(i);
        }

        var that = this;
        this.customlistener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "updateMoney",
            callback: function(event){
                cc.log("function callback");
                that.updateMoneyFromLobby(event);
            }
        });
        cc.eventManager.addListener(this.customlistener, 1);
    },
    initGUI: function () {

    },

    clickMoiChoi: function(){
        cc.log("click btn moiChoi");
        if(gameWsClient){
            gameWsClient.sendGetInfoMoiChoi();
        }
    },

    updateSoloTinhAt: function(isTinhAt){
        var str;
        if(isTinhAt < 1){
            str = "res/CardGame/MauBinh/mb_bg_name.png";
        }else{
            str = "res/CardGame/MauBinh/soloMauBinhTinhAt.png";
        }
        //logo.loadTexture(str);
        //this.mb_bg_name.setTexture(cc.textureCache.addImage(str));
        GuiUtil.changeSprite(this.mb_bg_name,str);
    },

    updateMoneyFromLobby: function(event){

        if(MauBinhMatchMgr.getInstance().moneyType == event.moneyType){
            this["money_player_0"].setVisible(true);
            this["money_player_0"].setString(StringUtility.standartNumber(event.currentMoney));
        }

        cc.log("updateMoneyFromLobby " + event.currentMoney + " "  + event.moneyType);
    },

    initCards: function(){
        var addedIndex = [10,11,12,5,6,7,8,9,0,1,2,3,4];
        for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            this.player_cardList[i] = [];
            for (var j = 0; j <addedIndex.length; j++){
                var cardIndex = addedIndex[j];
                var card = GuiUtil.createSprite("res/CardGame/LaBai/labai_52.png");
                this.addChild(card);

                card.setVisible(false);
                card.setLocalZOrder(i==0? GameGui.MAIN_PLAYER_Z_ORDER + j:j);
                this.player_cardList[i][cardIndex] = card;
            }
        }
    },

    setEnableBtnArrange: function(enable, state){
        cc.log("setEnableBtnArrange to " + state);
        this.btnArrange.setVisible(enable);
        if (enable){
            if ((state!=undefined) && (state != this.btnArrange.getTag())){
                var res = "";
                if (state == GameGui.BTN_ARRANGE_SO_CHI){
                    this.btnArrange.setTag(GameGui.BTN_ARRANGE_SO_CHI);
                    res = "res/CardGame/MauBinh/btn_arrange_so_chi.png";
                }
                else  if (state == GameGui.BTN_ARRANGE_XEP_LAI){
                    this.btnArrange.setTag(GameGui.BTN_ARRANGE_XEP_LAI);
                    res = "res/CardGame/MauBinh/btn_arrange_again.png";
                }
                this.btnArrange.loadTextures(res, res, res,ccui.Widget.PLIST_TEXTURE);
            }
        }
    },

    distributeCard: function(){
        var allPlayingPlayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<allPlayingPlayers.length; i++) {
            var playerInfo = allPlayingPlayers[i];
            this.zoomCardOfPlayer(playerInfo, playerInfo.chairIndex==0?GameGui.MY_CARD_SO_BAI_SCALE:GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE);
            this.effectLayer.chiabai(playerInfo.chairIndex, playerInfo.playerCard);
        }
        this.runAction(cc.sequence(
            cc.delayTime(2.0),
            cc.callFunc(this.onDistributionFinish.bind(this))
        ));
    },

    onDistributionFinish: function(){
        cc.log("onDistributionFinish");
        var myPlayerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0);
        this.zoomCardOfPlayer(myPlayerInfo, GameGui.MY_CARD_ARRANGE_SCALE);
        this.arrangeFog.setVisible(true);

        for (var i=0; i<this.player_cardList[0].length; i++){
            var cardSprite = this.getCardSprite(0, i);
            cardSprite.setOpacity(0);
            cardSprite.runAction(cc.sequence(
                cc.delayTime(0.3+i*0.05),
                cc.fadeIn(0.5)
            ));
        }
        this.runAction(cc.sequence(
            cc.delayTime(2.0),
            cc.callFunc(function(){

                cc.log("onDistributionFinish callback");
                this.touchListener.setEnabled(true);
                this.kindOfChiSlot.setVisible(true);

                this.setEnableBtnArrange(true, GameGui.BTN_ARRANGE_SO_CHI);
                this.updateBinhInfo();

                this.effectLayer.showWatingArrange(MauBinhMatchMgr.getInstance().countdownTime);

                var allPlayingPlayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
                for (var i=0; i<allPlayingPlayers.length; i++){
                    var playerInfo = allPlayingPlayers[i];
                    if (playerInfo.chairIndex!=0){
                        this.effectLayer.setArrangeState(playerInfo.chairIndex, false);
                    }
                }
            }.bind(this))
        ));
    },

    onWaitingArrangeFinish: function(){
        this.touchListener.setEnabled(false);

        //tra tat ca cac la bai ve vi tri cu
        var playerList = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<playerList.length; i++){
            var playerInfo = playerList[i];
            if (playerInfo.chairIndex != 0){
                this.effectLayer.setArrangeState(playerInfo.chairIndex, true);
            }
        }
        this.cardBorder.setVisible(false);
        this.setEnableBtnArrange(false);
        this.btnBaoBinh.setVisible(false);
    },

    getCardSprite: function(playerIndex, cardIndex){
        return this.player_cardList[playerIndex][cardIndex];
    },

    onTouchBegan: function(touch, event){
        //cc.log("onTouchBegan: " + touch.getLocation().x, touch.getLocation().y);
        if (cc.sys.isNative && touch.getID()!=0) return false;

        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        var touchLocal = gameGui.convertToNodeSpace(touch.getLocation());
        //cc.log("touch local = " + touchLocal.x  + ", " + touchLocal.y);
        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0).playerCard;
        var allCards = [];
        allCards = allCards.concat(playerCard.chiDau.cardList.slice(0).reverse());
        allCards = allCards.concat(playerCard.chiGiua.cardList.slice(0).reverse());
        allCards = allCards.concat(playerCard.chiCuoi.cardList.slice(0).reverse());
        for (var i=0; i<allCards.length; i++){
            var card = allCards[i];
            //cc.log("on touch began, card id = " + card.id);
            if (cc.rectContainsPoint(card.display.sprite.getBoundingBox(), touchLocal)){
                gameGui.firstCard = card;
                cc.log("gameGui.firstCard: " + card.id);
                card.display.sprite.setLocalZOrder(GameGui.EFFECT_Z_ORDER);
                return true;
            }
        }
        return true;
    },

    onTouchMoved: function(touch, event){
        //cc.log("onTouchMoved: " + touch.getLocation().x, touch.getLocation().y);
        if (cc.sys.isNative && touch.getID()!=0) return false;

        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        if (gameGui.firstCard==null) return;

        var touchLocal = gameGui.convertToNodeSpace(touch.getLocation());
        gameGui.firstCard.display.setPosition(touchLocal);

        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0).playerCard;
        var allCards = [];
        allCards = allCards.concat(playerCard.chiDau.cardList.slice(0).reverse());
        allCards = allCards.concat(playerCard.chiGiua.cardList.slice(0).reverse());
        allCards = allCards.concat(playerCard.chiCuoi.cardList.slice(0).reverse());

        for (var i=0; i<allCards.length; i++){
            var card = allCards[i];
            if ((card!==gameGui.firstCard) && (cc.rectContainsPoint(card.display.sprite.getBoundingBox(), touchLocal))){
                gameGui.secondCard = card;
                cc.log("gameGui.secondCard: " + card.id);
                gameGui.cardBorder.setVisible(true);
                gameGui.cardBorder.setLocalZOrder(card.display.sprite.getLocalZOrder());
                gameGui.cardBorder.setPosition(card.display.getPosition());
                return;
            }
        }
        gameGui.secondCard = null;
        gameGui.cardBorder.setVisible(false);
    },

    onTouchEnded: function(touch, event){
        if (cc.sys.isNative && touch.getID()!=0) return false;
        //cc.log("onTouchEnded: " + touch.getLocation().x, touch.getLocation().y);
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();

        var myPlayerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0);
        var playerCard = myPlayerInfo.playerCard;

        if (gameGui.firstCard!=null){
            var firstCardDisplay = gameGui.firstCard.display;
            firstCardDisplay.setPosition(firstCardDisplay.rootPosition);
            firstCardDisplay.setLocalZOrder(firstCardDisplay.rootZOrder);
            if (gameGui.secondCard!=null){
                playerCard.swapCard(gameGui.firstCard, gameGui.secondCard);

                gameGui.firstCard.display.sprite.setOpacity(0);
                gameGui.firstCard.display.sprite.runAction(cc.fadeIn(0.2));

                gameGui.secondCard.display.sprite.setOpacity(0);
                gameGui.secondCard.display.sprite.runAction(cc.fadeIn(0.2));

                gameGui.updateBinhInfo();
            }
            gameGui.cardBorder.setVisible(false);
        }

        gameGui.firstCard = null;
        gameGui.secondCard = null;
    },

    updateBinhInfo: function(){
        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0).playerCard;
        playerCard.updatePlayerCard(MauBinhMatchMgr.getInstance().isTinhAt);
        this.loadKindOfChiText(1, playerCard.chiDau.groupKind);
        this.loadKindOfChiText(2, playerCard.chiGiua.groupKind);
        this.loadKindOfChiText(3, playerCard.chiCuoi.groupKind);

        if ((playerCard.maubinhType != MauBinh.Type.BINH_LUNG) && (playerCard.maubinhType != MauBinh.Type.BINH_THUONG))
            this.setHighLighAllCardsOfPlayer(0, false);

        this.updateBinhTypeOnCard(0);

        if (this.btnArrange.getTag() == GameGui.BTN_ARRANGE_SO_CHI){
            //hien thi nut bao binh va so chi hay ko
            if ((playerCard.maubinhType != MauBinh.Type.BINH_LUNG) && (playerCard.maubinhType != MauBinh.Type.BINH_THUONG)){
                //neu la mau binh: chi hien btn bao binh
                this.setEnableBtnArrange(false);
                this.btnBaoBinh.setVisible(true);
            }
            else{
                //hien thi: btn so chi
                this.setEnableBtnArrange(true);
                //truong hop luc phe bon chua sap xep
                if ((playerCard.maubinhType == MauBinh.Type.BINH_THUONG) && (playerCard.haveSauDoi())){
                    //hien thi bao binh
                    this.btnBaoBinh.setVisible(true);
                }
                else{
                    this.btnBaoBinh.setVisible(false);
                }
            }
        }
    },

    updateWithData: function(pk){
        this.hasInfoHuVang = true;
        this.huVangIcon.updateWithData(pk);
    },

    updateHuVangIcon: function(remainTime){
        if(this.hasInfoHuVang){
            this.huVangIcon.updateTime(remainTime, null);
        }
    },

    updateBinhTypeOnCard: function(chairIndex){
        cc.log("updateBinhTypeOnCard");
        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex).playerCard;

        //hien thi mau binh neu co
        this.effectLayer.showMauBinhType(chairIndex, playerCard.maubinhType);

        //hien thi binh quy theo tung chi neu can
        var isTinhAt = MauBinhMatchMgr.getInstance().isTinhAt;
        if (playerCard.maubinhType==MauBinh.Type.BINH_THUONG){
            //chi dau
            if (playerCard.chiDau.groupKind<2)
                this.effectLayer.showGroupKind(chairIndex, 1, playerCard.chiDau.groupKind, playerCard.chiDau.getGroupKindLevel(isTinhAt), false);
            else
                this.effectLayer.hideGroupKind(chairIndex, 1);
            //chi giua
            if (playerCard.chiGiua.groupKind<=2)
                this.effectLayer.showGroupKind(chairIndex, 2, playerCard.chiGiua.groupKind, playerCard.chiGiua.getGroupKindLevel(isTinhAt), false);
            else
                this.effectLayer.hideGroupKind(chairIndex, 2);
            //chi cuoi
            if (playerCard.chiCuoi.groupKind==MauBinh.GroupKind.SAM_CO)
                this.effectLayer.showGroupKind(chairIndex, 3, playerCard.chiCuoi.groupKind, playerCard.chiCuoi.getGroupKindLevel(isTinhAt), false);
            else
                this.effectLayer.hideGroupKind(chairIndex, 3);
        }
        else{
            this.effectLayer.hideGroupKind(chairIndex, 1);
            this.effectLayer.hideGroupKind(chairIndex, 2);
            this.effectLayer.hideGroupKind(chairIndex, 3);
        }
    },

    loadKindOfChiText: function(chiIndex, chiKind){
        var textStr = "";
        switch(chiKind){
            case MauBinh.GroupKind.THUNG_PHA_SANH:
                textStr = "Thùng phá sảnh";
                break;
            case MauBinh.GroupKind.TU_QUY:
                textStr = "Tứ quý";
                break;
            case MauBinh.GroupKind.CU_LU:
                textStr = "Cù lũ";
                break;
            case MauBinh.GroupKind.THUNG:
                textStr = "Thùng";
                break;
            case MauBinh.GroupKind.SANH:
                textStr = "Sảnh";
                break;
            case MauBinh.GroupKind.SAM_CO:
                textStr = "Sám cô";
                break;
            case MauBinh.GroupKind.THU:
                textStr = "Thú";
                break;
            case MauBinh.GroupKind.MOT_DOI:
                textStr = "Một đôi";
                break;
            case MauBinh.GroupKind.MAU_THAU:
                textStr = "Mậu thầu";
                break;
        }
        this["text_chi_" + chiIndex +"_kind"].setString(textStr);
    },

    onBtnBaoBinhClicked: function(){
        this.btnBaoBinh.setVisible(false);
        this.setEnableBtnArrange(false);

        this.touchListener.setEnabled(false);
        gameWsClient.sendBaoBinh();
    },

    onBtnArrangeClicked: function(){
        this.btnBaoBinh.setVisible(false);
        this.setEnableBtnArrange(false);

        if (this.btnArrange.getTag() == GameGui.BTN_ARRANGE_SO_CHI){
            this.touchListener.setEnabled(false);
            gameWsClient.sendBinhSoChi();
        }
        else if (this.btnArrange.getTag() == GameGui.BTN_ARRANGE_XEP_LAI){
            gameWsClient.sendXepLai();
        }
    },

    onBtnBackClicked: function(){
        gameWsClient.sendRequestLeaveRoom();
    },

    onBtnCheatCardClicked: function(){
        if (!this.cheatCardGui){
            this.cheatCardGui = new MauBinh.CheatCardGui();
            this.cheatCardGui.setVisible(false);
            this.addChild(this.cheatCardGui, 1);
        }
        this.cheatCardGui.setVisible(!this.cheatCardGui.isVisible());
    },

    resetElementsInMatch: function(){
        cc.log("reset Elements In Match");
        this.stopAllActions();

        var allPlayingPlayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<allPlayingPlayers.length; i++) {
            var cardList = allPlayingPlayers[i].playerCard.getAllCards();
            for (var j=0; j<cardList.length; j++){
                var card = cardList[j];
                card.id = 52;
                card.display.reload();
                card.display.setHighlight(true);
                card.display.setVisible(false);
            }
        }

        for (var chairIndex=0; chairIndex<MauBinh.Const.MAX_NUMBER_PLAYER; chairIndex++){
            this["view_text_player_" + chairIndex].setVisible(false);
        }

        //an kind of chi slot
        this.kindOfChiSlot.setVisible(false);
        this.kindOfChiSlot.setVisible(false);
        if(this.effectLayer){
            this.effectLayer.clear();
        }
        this.arrangeFog.setVisible(false);
        //an btn xep xong
        this.setEnableBtnArrange(false);
        this.btnBaoBinh.setVisible(false);
    },

    onSoBaiFinish: function(){
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        cc.log("UPDATE TIEN CHO ME: " + gameGui.effectLayer.my_currentmoney);
        lobby.updateMoney(gameGui.effectLayer.my_currentmoney, MauBinhMatchMgr.getInstance().moneyType);
        cc.log("So bai ket thuc");
        this.resetElementsInMatch();
        this.effectLayer.showWaitingMatchEnd();
    },

    startSoBai: function(){
        var allPlayingPlayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<allPlayingPlayers.length; i++) {
            var playerInfo = allPlayingPlayers[i];
            var chairIndex = playerInfo.chairIndex;
            this.zoomCardOfPlayer(playerInfo, chairIndex==0?GameGui.MY_CARD_SO_BAI_SCALE:GameGui.OTHER_PLAYER_CARD_SO_BAI_SCALE);
            this.arrangeFog.setVisible(false);

            for (var j=0; j<this.player_cardList[chairIndex].length; j++){
                this.player_cardList[chairIndex][j].setVisible(true);
            }

            //fix bug chuyen tab
            if (chairIndex == 0){
                this.showAllCardsOfPlayer(playerInfo, playerInfo.playerCard.maubinhType);
            }
        }
        this.soChi(1);
    },

    soChi: function(chiIndex){
        cc.log("so chi " + chiIndex);
        var needSoChi = MauBinhMatchMgr.getInstance().needSoChi();
        var needShowMoneyWhenSoChi = MauBinhMatchMgr.getInstance().needShowMoneyWhenSoChi();

        var playerResultList = MauBinhMatchMgr.getInstance().playerResultList;
        for (var i=0; i<playerResultList.length; i++) {
            var playerResult = playerResultList[i];
            var chairIndex = playerResult.chairIndex;
            var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);

            cc.log("MauBinh Type of player " + chairIndex + " = " + MauBinhPlayerCard.getMauBinhString(playerResult.maubinhType));

            if ((playerResult.maubinhType == MauBinh.Type.BINH_THUONG) && needSoChi){
                this.highlightCardInChi(playerInfo, chiIndex);
                cc.log("show group kind of chi" + chiIndex + ", playerIndex = " + playerInfo.chairIndex);

                var chi = playerInfo.playerCard.getChi(chiIndex);
                this.effectLayer.showGroupKind(chairIndex, chiIndex, chi.groupKind, chi.getGroupKindLevel(MauBinhMatchMgr.getInstance().isTinhAt), true);

                if (needShowMoneyWhenSoChi){
                    cc.log("showMoney of chi " + chiIndex + ", playerIndex = " + playerInfo.chairIndex);
                    this.effectLayer.showMoney(chairIndex, playerResult.moneyInChi[chiIndex-1], true);
                }
            }
            else{
                if (chiIndex == 1){
                    this.showAllCardsOfPlayer(playerInfo, playerResult.maubinhType);
                    if (playerResult.maubinhType == MauBinh.Type.BINH_THUONG){
                        this.updateBinhTypeOnCard(playerInfo.chairIndex);
                    }
                }
            }
        }

        if (needSoChi){
            this.runAction(cc.sequence(
                cc.delayTime(3.0),
                cc.callFunc(function(){
                    if (chiIndex<3){
                        this.soChi(chiIndex+1);
                    }
                    else{
                        this.batSap();
                    }
                }.bind(this))
            ));
        }
        else{
            this.batSap();
        }
    },

    batSap: function(){
        cc.log("batsap");
        this.setHighlightAllCards(true);
        var needBatSap = MauBinhMatchMgr.getInstance().needBatSap();
        if (needBatSap){
            this.effectLayer.showBatSap(MauBinhMatchMgr.getInstance().playerResultList);
            this.runAction(cc.sequence(
                cc.delayTime(3.0),
                cc.callFunc(this.soAt.bind(this))
            ));
        }
        else{
            this.soAt();
        }
    },

    soAt: function(){
        cc.log("so at");
        //if(this.soAtPic) {
        //    this.soAtPic = new cc.Sprite("res/CardGame/MauBinh/So_At.png");
        //    var size = BaseScene.getMainContentSize();
        //    this.soAtPic.setPosition(size.width/2, size.height/2);
        //    this.addChild(this.soAtPic);
        //    this.soAtPic.setVisible(false);
        //}

        if (MauBinhMatchMgr.getInstance().isTinhAt && (MauBinhPlayerMgr.getInstance().getNumberPlayingPlayer()==4)){
            if(this.soAtPic) {
                this.soAtPic.setVisible(true);
            }
            this.setHighlightAllCards(false);
            this.setHighlightAllAt(true);

            var playerResultList = MauBinhMatchMgr.getInstance().playerResultList;

            for (var i=0; i<playerResultList.length; i++) {
                var playerResult = playerResultList[i];
                var chairIndex = playerResult.chairIndex;
                this.effectLayer.showMoney(chairIndex, playerResult.moneyAt, true);
            }
            //this.addChild(soAt);
            this.runAction(cc.sequence(
                cc.delayTime(5.0),
                cc.callFunc(this.tinhTienChung.bind(this))
            ));

            this.effectLayer.showSoAt();

        }
        else{
            //bo qua buoc so at, tinh tien chung luon
            this.tinhTienChung();
        }
    },



    tinhTienChung: function(){
        cc.log("tinh tien chung");
        if(this.soAtPic) {
            this.soAtPic.setVisible(false);
        }
        this.setHighlightAllCards(true);
        var playerResultList = MauBinhMatchMgr.getInstance().playerResultList;
        for (var i=0; i<playerResultList.length; i++) {
            var playerResult = playerResultList[i];
            var chairIndex = playerResult.chairIndex;
            this.effectLayer.showMoney(chairIndex, playerResult.moneyCommon, false);
        }
        this.runAction(cc.sequence(
            cc.delayTime(3.0),
            cc.callFunc(this.onSoBaiFinish.bind(this))
        ));
    },

    highlightCardInChi: function(playerInfo, chiIndex){
        cc.log("highlightCardInChi " + chiIndex + " of " + playerInfo.chairIndex);
        var chi = playerInfo.playerCard.getChi(chiIndex);
        for (var i=0; i<chi.cardList.length; i++){
            var card = chi.cardList[i];
            card.display.showCard();
            card.display.setHighlight(true);
        }

        var allCards = playerInfo.playerCard.getAllCards();
        for (var i=0; i<allCards.length; i++){
            var card = allCards[i];
            if (chi.cardList.indexOf(card) == -1){
                card.display.setHighlight(false);
            }
        }
    },

    //hien thi tat ca cac la bai At cua tat ca nguoi choi
    setHighlightAllAt: function(isHighLight){
        var playingPlayerList = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<playingPlayerList.length; i++){
            var allCards = playingPlayerList[i].playerCard.getAllCards();
            for (var j=0; j<allCards.length; j++){
                if (allCards[j].getNumber() == 14){
                    allCards[j].display.setHighlight(isHighLight);
                    allCards[j].display.runBubble();
                }
            }
        }
    },

    setHighlightAllCards: function(isHighlight){
        var playingPlayerList = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
        for (var i=0; i<playingPlayerList.length; i++){
            var allCards = playingPlayerList[i].playerCard.getAllCards();
            for (var j=0; j<allCards.length; j++){
                allCards[j].display.setHighlight(isHighlight);
            }
        }
    },

    setHighLighAllCardsOfPlayer: function(playerChairIndex, isHighlight){
        var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(playerChairIndex);
        var allCards = playerInfo.playerCard.getAllCards();
        for (var j=0; j<allCards.length; j++) {
            allCards[j].display.setHighlight(isHighlight);
        }
    },

    showAllCardsOfPlayer: function(playerInfo, maubinhType){
        var cardList = playerInfo.playerCard.getAllCards();
        for (var i=0; i<cardList.length; i++){
            var card = cardList[i];
            card.display.showCard();
        }
        this.setHighLighAllCardsOfPlayer(playerInfo.chairIndex, false);
        this.effectLayer.showMauBinhType(playerInfo.chairIndex, maubinhType);
    },

    zoomCardOfPlayer: function(playerInfo, scale){

        var cardList = playerInfo.playerCard.getAllCards();
        for (var i=0; i<cardList.length; i++){
            var cardDisplay = cardList[i].display;
            cardDisplay.setScale(scale);
            var chiIndex = Math.floor(i/5);
            var cardIndexInChi = i%5;
            var winSize = GuiUtil.getWinSize();
            var cardPosition = cc.p (0,0);
            switch (playerInfo.chairIndex){
                case 0:
                    if(scale == GameGui.MY_CARD_ARRANGE_SCALE) {
                        cardPosition = cc.p(winSize.width / 2 - 160 + GameGui.CARD_SIZE.width * scale * (cardIndexInChi * this.overlap),
                            10 + GameGui.CARD_SIZE.height * scale * (0.5 + chiIndex * this.overlap));
                    }else{
                        cardPosition = cc.p(winSize.width / 2 - 60 + GameGui.CARD_SIZE.width * scale * (cardIndexInChi * this.overlap),
                            10 + GameGui.CARD_SIZE.height * scale * (0.5 + chiIndex * this.overlap));
                    }
                    break;
                case 1:
                    cardPosition = cc.p(winSize.width - 15 - GameGui.CARD_SIZE.width*scale*(0.5 + (4-cardIndexInChi)*this.overlap),
                        winSize.height*1/2-10 + GameGui.CARD_SIZE.height*scale*(0.5 + (chiIndex-2)*this.overlap));
                    break;
                case 2:
                    cardPosition = cc.p(winSize.width/2-60 + GameGui.CARD_SIZE.width*scale*(cardIndexInChi*this.overlap),
                        winSize.height - 10 - GameGui.CARD_SIZE.height*scale*(0.5 + (2-chiIndex)*this.overlap));
                    break;
                case 3:
                    cardPosition = cc.p(25 + GameGui.CARD_SIZE.width*scale*(0.5 + cardIndexInChi*this.overlap),
                        winSize.height*1/2-10 + GameGui.CARD_SIZE.height*scale*(0.5 + (chiIndex-2)*this.overlap));
                    break;
            }
            cardDisplay.sprite.stopAllActions();
            cardDisplay.sprite.setOpacity(255);
            cardDisplay.setPosition(cardPosition);
            cardDisplay.setRootPosition(cardPosition);
            cardDisplay.setLocalZOrder(cardDisplay.rootZOrder);
        }
        this.effectLayer.showMauBinhType(playerInfo.chairIndex, playerInfo.playerCard.maubinhType);
    },

    addPlayer: function(chairIndex){

        var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);
        this["name_player_" + chairIndex].setVisible(true);
        this["name_player_" + chairIndex].setString(playerInfo.nickName);
        this["avatar_" + chairIndex].setVisible(true);
        this["money_player_" + chairIndex].setVisible(true);
        this["money_player_" + chairIndex].setString(StringUtility.standartNumber(playerInfo.currentMoney));

        if (playerInfo.status == MauBinh.PlayerStatus.VIEW){
            this["view_text_player_" + chairIndex].setVisible(true);
        }
    },

    removePlayer: function(chairIndex){
        this["name_player_" + chairIndex].setLocalZOrder(-1);
        this["name_player_" + chairIndex].setVisible(false);
        this["avatar_" + chairIndex].setLocalZOrder(-1);
        this["avatar_" + chairIndex].setVisible(false);
        this["leave_room_" + chairIndex].setVisible(false);
        this["money_player_" + chairIndex].setLocalZOrder(-1);
        this["money_player_" + chairIndex].setVisible(false);
        this["view_text_player_" + chairIndex].setVisible(false);
    },

    removeAllPlayers: function(){
        for ( var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
            this.removePlayer(i);
        }
        //this.effectLayer.clear();
    },
    receiveInfoMoiChoi: function(data){
        if(!this.guiMoiChoi){
            this.guiMoiChoi = new MoiChoiLayer();
            this.addChild(this.guiMoiChoi);
        }
        //this.guiMoiChoi.setVisible(true);
        this.guiMoiChoi.show();
        this.guiMoiChoi.updateListItems(data, this.moneyType);
        this.guiMoiChoi.reloadData(data);
    },

    onJoinRoomSuccess: function(pk){
        if(pk.moneyType == MONEY_VIN){
            this.btn_moichoi = new ButtonMoiChoi();
            this.addChild(this.btn_moichoi);
        }
        var allPlayers = MauBinhPlayerMgr.getInstance().getAllInRoomPlayers();
        for (var i=0; i<allPlayers.length; i++) {
            var playerInfo = allPlayers[i];
            this.addPlayer(playerInfo.chairIndex);
        }

        var matchMgr = MauBinhMatchMgr.getInstance();
        switch (matchMgr.gameState){
            case MauBinh.GameState.NO_START:
                //do nothing
                break;
            case MauBinh.GameState.PLAYING:
                var allPlayingPLayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
                for (var i=0; i<allPlayingPLayers.length; i++){
                    var chairIndex = allPlayingPLayers[i].chairIndex;
                    for (var j=0; j<this.player_cardList[chairIndex].length; j++){
                        this.player_cardList[chairIndex][j].setVisible(true);
                    }
                    this.zoomCardOfPlayer(allPlayingPLayers[i], GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE);
                    this.effectLayer.setArrangeState(chairIndex, false);
                    this.effectLayer.showWatingArrange(matchMgr.countdownTime);
                }
                break;
            case MauBinh.GameState.GAME_END:
                var allPlayingPLayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
                for (var i=0; i<allPlayingPLayers.length; i++){
                    var chairIndex = allPlayingPLayers[i].chairIndex;
                    for (var j=0; j<this.player_cardList[chairIndex].length; j++){
                        this.player_cardList[chairIndex][j].setVisible(true);
                    }
                    this.zoomCardOfPlayer(allPlayingPLayers[i], GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE);
                    //this.effectLayer.setArrangeState(chairIndex, true);
                }
                this.effectLayer.showWaitingMatchEnd(matchMgr.countdownTime);
                break;
        }
        this.loadBoardInfo();
    },

    reconnectGame: function(){
        var allPlayers = MauBinhPlayerMgr.getInstance().getAllInRoomPlayers();
        for (var i=0; i<allPlayers.length; i++) {
            var playerInfo = allPlayers[i];
            this.addPlayer(playerInfo.chairIndex);
            cc.log("reconnectGame: add player " + playerInfo.chairIndex);
        }

        var matchMgr = MauBinhMatchMgr.getInstance();
        cc.log("reconnectGame: gameState = " + matchMgr.gameState);

        switch (matchMgr.gameState){
            case MauBinh.GameState.NO_START:
                //do nothing
                break;
            case MauBinh.GameState.PLAYING:
                this.onDistributionFinish();

                var allPlayingPLayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
                for (var i=0; i<allPlayingPLayers.length; i++){
                    var chairIndex = allPlayingPLayers[i].chairIndex;
                    for (var j=0; j<this.player_cardList[chairIndex].length; j++){
                        this.player_cardList[chairIndex][j].setVisible(true);
                    }
                    if (chairIndex!=0)
                        this.zoomCardOfPlayer(allPlayingPLayers[i], GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE);
                    this.arrangeFog.setVisible(true);
                    if (chairIndex == 0){
                        var myPlayer = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);
                        this.showAllCardsOfPlayer(myPlayer, MauBinh.Type.BINH_THUONG);
                    }
                }
                break;
            case MauBinh.GameState.GAME_END:
                var allPlayingPLayers = MauBinhPlayerMgr.getInstance().getAllPlayingPlayers();
                for (var i=0; i<allPlayingPLayers.length; i++){
                    var chairIndex = allPlayingPLayers[i].chairIndex;
                    for (var j=0; j<this.player_cardList[chairIndex].length; j++){
                        this.player_cardList[chairIndex][j].setVisible(true);
                    }
                    this.zoomCardOfPlayer(allPlayingPLayers[i], GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE);
                    this.zoomCardOfPlayer(allPlayingPLayers[i], chairIndex==0?GameGui.MY_CARD_SO_BAI_SCALE:GameGui.OTHER_PLAYER_CARD_SO_BAI_SCALE);

                    var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);
                    this.showAllCardsOfPlayer(playerInfo, playerInfo.playerCard.maubinhType);
                    this.tinhTienChung();
                }
                break;
        }

        this.loadBoardInfo();
    },


    loadBoardInfo: function(){
        var matchMgr = MauBinhMatchMgr.getInstance();
        this["text_room_id"].setString(matchMgr.roomId);
        this["text_game_id"].setString(matchMgr.gameId);
        this["text_money_bet"].setString(StringUtility.formatNumberSymbol(matchMgr.moneyBet));
        this["image_money_type"].setTexture("res/common/chip/vinChip" + matchMgr.moneyType + ".png");
        GuiUtil.changeSprite(this["image_money_type"],"res/common/chip/vinChip" + matchMgr.moneyType + ".png");
    },

    onRequestLeaveRoom: function(chairIndex, isOutRoom){

        if (chairIndex == 0){
            var stringNotify;
            if(isOutRoom){
                stringNotify = "Bạn đã đăng ký rời phòng thành công.";

            }else{
                stringNotify = "Bạn đã hủy đăng ký rời phòng.";
            }
            GameToast.makeToast(2, stringNotify, this);
        }
        this["leave_room_" + chairIndex].setVisible(isOutRoom);
    },

    onBtnQuestionClicked: function(){
        var s = GameManager.getInstance().getHotroLink(gameData.gameType);
        if(cc.sys.isNative) {
            popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
            return;
        }
        ConnectNative.openWebView(s, false);
    },

    onBtnChatClicked: function(){
        if (!this.chatLayer){
            this.chatLayer = new ChatLayer(this);
            this.chatLayer.setVisible(false);
            this.addChild(this.chatLayer, GameGui.CHAT_Z_ORDER);
        }
        this.chatLayer.setVisible(!this.chatLayer.isVisible());
        this.chatLayer.touchListener.setEnabled(this.chatLayer.isVisible());
    },

    updateChatRoom: function(globalChairIndex, image){
        this.effectLayer.updateChatRoom(globalChairIndex, image);
    },

});

GameGui.CARD_SIZE = cc.size(140, 180);
GameGui.MY_CARD_ARRANGE_SCALE = 0.95;
GameGui.MY_CARD_SO_BAI_SCALE = 0.6;
GameGui.OTHER_PLAYER_CARD_ARRANGE_SCALE = 0.4;
GameGui.OTHER_PLAYER_CARD_SO_BAI_SCALE = 0.4;
GameGui.MAIN_PLAYER_Z_ORDER = 100;
GameGui.EFFECT_Z_ORDER = 999;
GameGui.CHAT_Z_ORDER = 9999;

GameGui.BTN_ARRANGE_SO_CHI = 0;
GameGui.BTN_ARRANGE_XEP_LAI = 1;
