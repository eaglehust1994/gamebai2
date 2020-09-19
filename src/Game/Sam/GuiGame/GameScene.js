
//
Sam.GameScene = BaseLayer.extend({
    ctor: function(){
        this._super();
        this.playerDisplayList = [];
        this.kType = 0;
        this.chatLayer = null;

       // this.initWithBinaryFile("res/g_res_cardGame_json_SamGameScene.json");
        this.customizeGUI2();
        this.effect2D = new Sam.EffectLayer();
        this.addChild(this.effect2D);
        this.effect2D.setLocalZOrder(10);

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

    //override
    onEnter: function() {

        BaseLayer.prototype.onEnter.call(this);
        if (menutab)
            menutab.hideAllInfo();
        this.hasInfoHuVang = false;
        this.playerDisplayList[0].addListenerPlayer();
        this.cheatLayer = gameScenePool.getCheatCardScene1();
        this.cheatLayer.clear();
        this.cheatLayer.setType(GameList.SamSoLo);
        this.cheatLayer.setVisible(false);
        this.addChild(this.cheatLayer);
        this.cheatLayer.setLocalZOrder(12);
        this.clearScene();
        this.huVangIcon.hasHu = false;
        this.huVangIcon.setVisible(false);
        this.huVangIcon.changeToHasHu(false);
        if (gameWsClient) {
            gameWsClient.sendThongTinHuVang();
        }
       this.updateLogoSolo();
    },

    updateLogoSolo: function(){
       // var logo = ccui.Helper.seekWidgetByName(this._layout, "imageSamLoc");
      //  var logo = this.imageSamLoc;
        var str;
        if(gameData.gameType == GameList.SamSoLo){
            str = "res/CardGame/CommonResource/BanChoi/samloc_solo.png";
        }else{
            str = "res/CardGame/CommonResource/BanChoi/logo_sam_loc.png";
        }
       // this["imageSamLoc"].setTexture(str);
        GuiUtil.changeSprite(this["imageSamLoc"],str);

    },

    onExit: function(){
        this.playerDisplayList[0].removeListenerPlayer();
        this.stopAutoStart();
        this.cheatLayer.removeFromParent();
        if(this.chatLayer){
            this.chatLayer.removeFromParent();
            this.chatLayer = null;
        }
        BaseLayer.prototype.onExit.call(this);

    },


    clearScene: function(){
        this.btnBoLuot.setVisible(false);
        this.btnDanh.setVisible(false);
        this.btnXepBai.setVisible(false);
        this.playerDisplayList[0].clearHandOncard();
        for(var i=1;i<5;i++) {
            this.playerDisplayList[i].clearBaiEndGameInstant();
            this.playerDisplayList[i].card.setVisible(false);
        }

        for(var i=0;i<5;i++)
        {
            this.playerDisplayList[i].clearThangThua();
            this.playerDisplayList[i].removeBao1();
            this.playerDisplayList[i].stopEffectTime();
            this.playerDisplayList[i].clearFirstTime();
            this.playerDisplayList[i].clearBoluot();
        }

        this.effect2D.clearEffect();

        if(this.getChildByTag(0 + Sam.GameScene.layerEndGameTag)){
            this.getChildByTag(0 + Sam.GameScene.layerEndGameTag).removeFromParent();
        }

        if(this.getChildByTag(0 + Sam.GameScene.layerSamTag)){
            this.getChildByTag(0 + Sam.GameScene.layerSamTag).removeFromParent();
        }

    },

    updateMoneyFromLobby: function(event){
        if(Sam.gameLogic.moneyType == event.moneyType){
            this.playerDisplayList[0].uiGold.setString(StringUtility.standartNumber(event.currentMoney));
        }
        cc.log("updateMoneyFromLobby " + event.currentMoney + " "  + event.moneyType);
    },


    //override
    customizeGUI2: function(){
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/TienLen/PlistTienLen.plist","res/CardGame/TienLen/PlistTienLen.png");
        var i;
        this.addLayout(this,"abcxyz",cc.p(640,360),null,cc.size(1280,720),true);
        this.addSprite(this,"bg",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/bg_layer_banchoi.png");
        this.addButton(this,"btnBack",Sam.GameScene.BTNBACK,cc.p(47,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png");
        this.addButton(this,"btnInfo",Sam.GameScene.BTNINFO,cc.p(1143,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png");
        this.addButton(this,"btnCash",Sam.GameScene.BTNCASH,cc.p(1060,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png");
        if(CURRENT_MODE == 2){
            this.btnCash.setVisible(false);
        }
        this.addButton(this,"btnChat",Sam.GameScene.BTNCHAT,cc.p(1228,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png");
        this.addButton(this,"btnBoLuot",Sam.GameScene.BTNBOLUOT,cc.p(488,243),true,res_CardGame_CommonResource_BanChoi+"/btn_boluot_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_boluot_gamebai.png");
        this.addSprite(this.btnBoLuot,"arrowbl",cc.p(128,100.5),res_CardGame_CommonResource_BanChoi+"/arrow.png");
        this["arrowbl"].setName("arrow");
        this.btnBoLuot.setVisible(false);
        this.btnBoLuot.arrowPos = this["arrowbl"].getPosition();
        this.addButton(this,"btnDanh",Sam.GameScene.BTNDANH,cc.p(767,243),true,res_CardGame_CommonResource_BanChoi+"/btn_danhbai_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_danhbai_gamebai.png");
        this.btnDanh.setVisible(false);
        this.addSprite(this.btnDanh,"arrowdb",cc.p(121,100.5),res_CardGame_CommonResource_BanChoi+"/arrow.png");
        this["arrowdb"].setName("arrow");// setkey
        this.btnDanh.arrowPos = this["arrowdb"].getPosition(); //
        //this.btnDanh = this.customizeButton("btnDanh", Sam.GameScene.BTNDANH);
        //this.btnDanh.setVisible(false);
        //this.btnDanh.arrowPos = ccui.Helper.seekWidgetByName(this.btnDanh, "arrow").getPosition();
       // this.btnBoLuot = this.customizeButton("btnBoLuot", Sam.GameScene.BTNBOLUOT);
       // this.btnBoLuot.arrowPos = ccui.Helper.seekWidgetByName(this.btnBoLuot, "arrow").getPosition();
        //this.btnBoLuot.setVisible(false);
       // this.btnXepBai = this.customizeButton("btnXepBai", Sam.GameScene.BTNXEPBAI);
        this.addButton(this,"btnXepBai",Sam.GameScene.BTNXEPBAI,cc.p(1170,99),true,res_CardGame_CommonResource_BanChoi+"/btn_xep_labai.png",res_CardGame_CommonResource_BanChoi+"/btn_xep_labai.png");
        this.btnXepBai.setVisible(false);

     //   this.btnBack = this.customizeButton("btnBack", Sam.GameScene.BTNBACK);
     //   this.btnInfo = this.customizeButton("btnInfo", Sam.GameScene.BTNINFO);
       // this.btnCash = this.customizeButton("btnCash", Sam.GameScene.BTNCASH);




      //  this.btnChat = this.customizeButton("btnChat", Sam.GameScene.BTNCHAT);
        this.addSprite(this,"imageSamLoc",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/logo_sam_loc.png");
        this["imageSamLoc"].setName("imageSamLoc");
        //this.iconNetwork = ccui.Helper.seekWidgetByName(this._layout, "iconNetwork");
        //this.iconNetwork.setVisible(false);
        //this.lbPing = ccui.Helper.seekWidgetByName(this._layout, "lbPinghaha");
        //this.lbPing.setVisible(false);

        //them 5 btn avatar

        var positionUser = [cc.p(192,102),cc.p(124.5,311),cc.p(120,525),cc.p(1142,528),cc.p(1142,303)];
        for(i = 0; i < 5; i++) {


        //   var panel = ccui.Helper.seekWidgetByName(this._layout, "panel" + i);
            this.addLayout(this,"panel"+i,positionUser[i],null,cc.size(144,144),true);
            this.addButton(this["panel" + i], "btnAvatar" + i, 1, cc.p(72, 72), true, res_Common + "/avatar/bg_vongngoai_avatar.png");
            this["btnAvatar" + i].setName("btnAvatar");
            this["btnAvatar" + i].setTag(Sam.GameScene.btnavatarstarttag + i);
            this["btnAvatar" + i].addTouchEventListener(this.onTouchEventHandler, this);
            this.addSprite(this["panel" + i], "bg_progress" + i, cc.p(72, 72), res_Common + "/avatar/Vong_Ngoai.png");
            this["bg_progress" + i].setName("bg_progress");
            this["bg_progress" + i].setScale(128/124);
            if(i<3){
                if(i>0 && i<3){
                    this.addSprite(this["panel" + i], "Image_17" + i, cc.p(157,72), res_CardGame_CommonResource_BanChoi + "/bg_shape_shadow.png");
                    this.addSprite(this["panel" + i], "card" + i, cc.p(245,72), res_CardGame_CommonResource_BanChoi + "/labai_52.png");
                    this["card"+i].setName("card");
                    this.addSprite(this["card" + i], "img" + i, cc.p(92,31), res_CardGame_CommonResource_BanChoi + "/bg_numcard_remain.png");
                    this.addText(this["card" + i], "num" + i, cc.p(95,30), "10", RobotoRegular.fontName, 22);
                    this["num"+i].setName("num");
                    this["num" + i].setColor(cc.color("#26457C"));
                }

                this.addSprite(this["panel" + i], "iconOut" + i, cc.p(125,112), res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
                this["iconOut"+i].setName("iconOut");
                this.addText(this["panel" + i], "name" + i, cc.p(70,145), "Phu Ba Dao Viet Nam", RobotoRegular.fontName, 20);
                this["name"+i].setName("name");
                this.addText(this["panel" + i], "gold" + i, cc.p(71,-3), "100000000000$", RobotoRegular.fontName, 20);
                this["gold"+i].setName("gold");
                this["gold" + i].setColor(cc.color("#FFA500"));
                this.addSprite(this["panel" + i], "view" + i, cc.p(72,62), res_CardGame_CommonResource_BanChoi + "/viewing.png");
                this["view"+i].setName("view");
            }else{
                this.addSprite(this["panel" + i], "Image_17" + i, cc.p(-9,72), res_CardGame_CommonResource_BanChoi + "/bg_shape_shadow.png");
                this["Image_17"+i].setRotationY(180);
                this.addSprite(this["panel" + i], "card" + i, cc.p(-92,74), res_CardGame_CommonResource_BanChoi + "/labai_52.png");
                this["card"+i].setName("card");
                this.addSprite(this["card" + i], "img" + i, cc.p(29,31), res_CardGame_CommonResource_BanChoi + "/bg_numcard_remain.png");
                this["img" + i].setRotationY(180);
                this.addText(this["card" + i], "num" + i, cc.p(26.5,28), "10", RobotoRegular.fontName, 22);
                this["num"+i].setName("num");
                this["num" + i].setColor(cc.color("#26457C"));
                this.addSprite(this["panel" + i], "iconOut" + i, cc.p(26,108), res_CardGame_CommonResource_BanChoi + "/btn_exit_room.png");
                this["iconOut"+i].setName("iconOut");
                this.addText(this["panel" + i], "name" + i, cc.p(70,147), "Phu Ba Dao Viet Nam", RobotoRegular.fontName, 20);
                this["name"+i].setName("name");
                this.addText(this["panel" + i], "gold" + i, cc.p(73,-5), "100000000000$", RobotoRegular.fontName, 20);
                this["gold"+i].setName("gold");
                this["gold" + i].setColor(cc.color("#FFA500"));
                this.addSprite(this["panel" + i], "view" + i, cc.p(72,65), res_CardGame_CommonResource_BanChoi + "/viewing.png");
                this["view"+i].setName("view");
            }
            //btn = ccui.Helper.seekWidgetByName(panel, "btnAvatar");
            //btn.setPressedActionEnabled(true);
            //btn.setTag(Sam.GameScene.btnavatarstarttag + i);
            //btn.addTouchEventListener(this.onTouchEventHandler, this);

            var playerDisplay = new Sam.PlayerHold();
            playerDisplay.index = i;
            playerDisplay.gameScene = this;
            this.addChild(playerDisplay);
            playerDisplay.setPanel(this["panel"+i]);

            if (i == 0) {
                playerDisplay.initMyPlayer();
            }
            playerDisplay.initPlayerHold();
            this.playerDisplayList.push(playerDisplay);
        }
        this.addText(this,"roomId",cc.p(135,677),"Ban :9990",RobotoRegular.fontName,20);
        this.addText(this,"gameId",cc.p(247,677),"9999999999",RobotoRegular.fontName,20);
        this.addText(this,"muccuoc",cc.p(165,652),"Mức cược: 500K",RobotoRegular.fontName,20);
        this.addText(this,"lbPinghaha",cc.p(727,663),"00000",RobotoRegular.fontName,20);
        this.lbPinghaha.setVisible(false);

        this.addImage(this,"bg3",cc.p(640,360),res_Common+"/9patch.png",cc.size(672,44),false);
        //this.addSprite(this,"bg3",cc.p(640,360),res_Common+"/9patch.png");
        //this["bg3"].setContentSize(cc.size(671,43));
        this.addText(this["bg3"],"text2",cc.p(336,22),"Theo luot kkkkkkkkkkkkkkkkkkkduoc moi bao sam truoc",RobotoRegular.fontName,36);
        this["text2"].setName("text");
        this["text2"].setColor(cc.color("#FFFF00"));
        this["bg3"].setVisible(false);
        this.addSprite(this,"iconNetwork",cc.p(995,667.5),res_CardGame_CommonResource_BanChoi+"/ping_0.png");
        this.iconNetwork.setVisible(false);
        this.huVangIcon = new ThongTinHuVang();
        this.huVangIcon.setBoBaiByType(GameList.SamSoLo);
        this.addChild(this.huVangIcon);
        this.huVangIcon.setScale(0.6);
        this.huVangIcon.setPosition(1140, 610);
        this.huVangIcon.addHuListener();

        // test
        this.huVangIcon.setVisible(false);
    },

    updateWithData: function(pk){
        this.huVangIcon.updateWithData(pk);
        this.hasInfoHuVang = true;
    },

    updateHuVangIcon: function(remainTime){
        if(this.hasInfoHuVang)
            this.huVangIcon.updateTime(remainTime, null);
    },

    onButtonRelease: function(btn, id){

        cc.log("id: "  + id);

        switch(id) {

            case Sam.GameScene.BTNAVATAR0:
            case Sam.GameScene.BTNAVATAR1:
            case Sam.GameScene.BTNAVATAR2:
            case Sam.GameScene.BTNAVATAR3:
            case Sam.GameScene.BTNAVATAR4:{
                var idx = id - Sam.GameScene.BTNAVATAR0;
                var data = {};
                //sceneMgr.getRunningScene().addChild(new UserInfoGUI(data));
            }
                break;
            case Sam.GameScene.BTNBACK:{
                cc.log("BTNBACK");
                // Thay doi mau sac nut Back
                //button.getChildByName("check").setVisible(!button.getChildByName("check").isVisible());
                var pk = new Sam.CmdSendRequestLeaveGame();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
                break;
            case Sam.GameScene.BTNBAOSAM:
            case Sam.GameScene.BTNTOITRANG:
            {
                cc.log("btn BaoSam");
                var pk = new Sam.CmdSendBaoSam();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                this.getChildByTag(Sam.GameScene.layerSamTag).removeFromParent(true);
            }
                break;
            case Sam.GameScene.BTNHUYSAM:{
                cc.log("btn HUYSAM");
                var pk = new Sam.CmdSendHuyBaoSam();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                this.getChildByTag(Sam.GameScene.layerSamTag).removeFromParent(true);
            }
                break;
            case Sam.GameScene.BTNDANH:{
                cc.log("btn danh");
                if(!btn.cothedanh)
                {
                    cc.log("khong hop le");
                    GameToast.makeToast(2,"Đánh bài không hợp lệ!", this.effect2D);
                    break;
                }

                var i = 0;
                var cards = [];
                for(i = 0; i< this.playerDisplayList[0].handOnCards.length; i++){
                    if(this.playerDisplayList[0].handOnCards[i].isUp){
                        cards.push(this.playerDisplayList[0].handOnCards[i].id);
                        cc.log("bai danh" + cards[0]);
                    }
                }

                cc.log("send danh");
                var pk = new Sam.CmdSendDanhBai();
                pk.putData(false,cards);
                gameWsClient.send(pk);
                pk.clean();

               this.btnDanh.setVisible(false);
              this.btnBoLuot.setVisible(false);
                break;
            }
                break;

            case Sam.GameScene.BTNBOLUOT:{
                var pk = new Sam.CmdSendDanhBai();
                pk.putData(true);
                gameWsClient.send(pk);
                pk.clean();

                this.btnDanh.setVisible(false);
                this.btnBoLuot.stopAllActions();
               this.btnBoLuot.setOpacity(255);
                this.btnBoLuot.setVisible(false);
                this.stopAllActions();
            }
                break;

            case Sam.GameScene.BTNXEPBAI:{
                this.sapxep();
            }
                break;
            case Sam.GameScene.BTNSTART:{
                cc.log("BTNSTART");
            }
                break;
            case Sam.GameScene.BTNCHAT:{
                cc.log("BTNINFO");
                this.onBtnChatClicked();
            }
                break;
            case Sam.GameScene.BTNCASH:{
                cc.log("BTNCASH");
                this.cheatLayer.setVisible(true);
            }
                break;
            case Sam.GameScene.BTNINFO:{
                cc.log("BTNCASH");

                //TEST
                //listenerPingPong = !listenerPingPong;
                var s = GameManager.getInstance().getHotroLink(GameList.SamSoLo);
                if(cc.sys.isNative) {
                    if(lobby.open_payment_ios == false){
                        popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                        return;
                    }
                }
                ConnectNative.openWebView(s, false);
            }
                break;

            case Sam.GameScene.BTN_MOI_CHOI:{
                cc.log("btnMoiChoi");
                if(gameWsClient){
                    gameWsClient.sendGetInfoMoiChoi();
                }
            }


        }
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

    updateChatRoom: function(globalChair, image){

        var localChair = Sam.gameLogic.convertChair(globalChair);
        var player = this.playerDisplayList[localChair];
        var pos = player.uiAvatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effect2D.updateChatRoom(localChair,pos,  image);
    },

    networkSlow: function(data){
        if(data == true){
            cc.log("networkSlow");
            this.iconNetwork.setVisible(true);
            this.iconNetwork.runAction(cc.sequence(cc.scaleTo(0.5, 2.2), cc.scaleTo(0.5, 2.0), cc.scaleTo(0.5, 2.2), cc.scaleTo(0.5, 2.0), cc.scaleTo(0.5, 2.2), cc.scaleTo(0.5, 2.0), cc.hide()));
        }
        else if(data == false){
            this.iconNetwork.setVisible(false);
            this.iconNetwork.stopAllActions();
            cc.log("remove networkClose");
        }
    },


    onUpdateGui: function(data){
        var i;
        var mainContentSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        if(!Sam.gameLogic)
            return;

        //update hien thi Player
        for(i = 0; i < 5; i++) {
            this.playerDisplayList[i].updateWithPlayer(Sam.gameLogic.players[i]);
        }

        //onUpdateButton();
        switch(Sam.gameLogic.gameState){
            case Sam.GameState.JOINROOM:{
                this.roomId.setString("Bàn :" + Sam.gameLogic.roomId);
                this.gameId.setString("# "+ Sam.gameLogic.gameId);
                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(Sam.gameLogic.bet));

                if(this.chip){
                    this.chip.removeFromParent();
                }




                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + Sam.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width*0.5 + 10, this.muccuoc.getPositionY());
            }
                break;

            case Sam.GameState.PLAYCONTINUE:{
                this.roomId.setString("Bàn :" + Sam.gameLogic.roomId);
                this.gameId.setString("# "+ Sam.gameLogic.gameId);
                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(Sam.gameLogic.bet));

                if(this.chip){
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + Sam.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width*0.5 + 10, this.muccuoc.getPositionY());


                this.btnXepBai.setVisible(true);
                for(var i=0;i<5;i++)
                {
                    this.playerDisplayList[i].updateWithPlayer(Sam.gameLogic.players[i]);
                }

                switch(Sam.gameLogic.gameServerState){
                    case 1:  // dang choi
                    {
                        for(i = 1; i < 5; i++){
                            if(Sam.gameLogic.players[i].ingame){
                                this.playerDisplayList[i].card.setVisible(true);
                                this.playerDisplayList[i].numCard.setString("" + Sam.gameLogic.players[i].info["cards"]);
                                if(Sam.gameLogic.players[i].info["cards"] == 0){
                                    this.playerDisplayList[i].card.setVisible(false);
                                }
                                else if(Sam.gameLogic.players[i].info["cards"] == 1)
                                {
                                    this.playerDisplayList[i].addBao1();
                                }
                            }
                        }


                        switch(Sam.gameLogic.gameAction){
                            case 4: // dang choi binh thuong
                            {
                                this.playerDisplayList[0].clearBai();
                                this.playerDisplayList[0].initWithCards(Sam.gameLogic.cardChiabai);
                                this.btnXepBai.setVisible(true);

                                var localChairTurn = Sam.gameLogic.activeLocalChair;
                                this.playerDisplayList[localChairTurn].addEffectTime(Sam.gameLogic.activeTimeRemain);


                                if(Sam.gameLogic.recentCards.length > 0)
                                {
                                    this.effect2D.clearRecentCards();
                                    this.effect2D.addBaiDanh(Sam.gameLogic.recentCards);
                                    this.cardRecent = Sam.gameLogic.recentCards;
                                }

                                if (localChairTurn == 0) {
                                  this.btnDanh.setVisible(true);
                                   this.btnBoLuot.setVisible(true);
                                    if (Sam.gameLogic.newRound) {
                                        this.btnBoLuot.setVisible(false);
                                    }
                                    this.kiemTraDanhBai();
                                }
                                else {
                                    this.btnDanh.setVisible(false);
                                   this.btnBoLuot.setVisible(false);
                                }

                                for(var i=0;i<5;i++)
                                {
                                    if(Sam.gameLogic.players[i].ingame) {
                                        if(Sam.gameLogic.players[i].info["baosam"]){
                                            var localChair = i;
                                           // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconBaoSamPng));
                                            GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconBaoSamPng);

                                            this.playerDisplayList[localChair].uiBaosam.setVisible(true);
                                            this.playerDisplayList[localChair].uiBaosam.stopAllActions();
                                            this.playerDisplayList[localChair].uiBaosam.setScale(1);
                                        }
                                    }
                                }
                            }
                                break;

                            case 2: // dang bao sam
                            {
                                this.playerDisplayList[0].clearBai();
                                this.playerDisplayList[0].initWithCards(Sam.gameLogic.cardChiabai);
                               this.btnXepBai.setVisible(true);
                                for (var i = 1; i < 5; i++) {
                                    if (Sam.gameLogic.players[i].ingame) {
                                        this.playerDisplayList[i].card.setVisible(true);
                                        this.playerDisplayList[i].numCard.setString("" + 10);
                                        if (Sam.gameLogic.players[i].info["baosam"]) {
                                            var localChair = i;
                                           // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconBaoSamPng));
                                            GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconBaoSamPng);
                                            this.playerDisplayList[localChair].uiBaosam.setVisible(true);
                                        }
                                        else {
                                            if (Sam.gameLogic.players[i].info["huybaosam"]) {
                                                var localChair = i;
                                              //  this.players[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconHuyBaoSamPng));
                                                GuiUtil.changeSprite(this.players[localChair].uiBaosam,Sam.res.iconHuyBaoSamPng);
                                                this.players[localChair].uiBaosam.setVisible(true);
                                            }
                                        }
                                    }
                                }


                                if (Sam.gameLogic.players[0].info["baosam"]) {
                                    var localChair = 0;
                                   // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconBaoSamPng));
                                    GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconBaoSamPng);
                                    this.playerDisplayList[localChair].uiBaosam.setVisible(true);
                                }
                                else {
                                    if (Sam.gameLogic.players[0].info["huybaosam"]) {
                                        var localChair = 0;
                                     //   this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconHuyBaoSamPng));
                                        GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconHuyBaoSamPng);
                                        this.playerDisplayList[localChair].uiBaosam.setVisible(true);
                                    }
                                    else {
                                        this.addBaoSamLayer(Sam.gameLogic.activeTimeRemain, Sam.gameLogic.typeToiTrang);
                                    }
                                }
                            }
                                break;
                        }
                    }
                        break;
                    case 0:// chia start game
                    {
                    }
                        break;
                    case 2: // end game
                    {
                    }
                        break;

                }

            }
                break;

            case Sam.GameState.USERJOIN:{
                this.playerDisplayList[Sam.gameLogic.activeLocalChair].clearFirstTime();
                this.playerDisplayList[Sam.gameLogic.activeLocalChair].updateWithPlayer(Sam.gameLogic.players[Sam.gameLogic.activeLocalChair]);

                break;
            }
            case Sam.GameState.USERLEAVE:{
                if(Sam.gameLogic.players[Sam.gameLogic.activeLocalChair].status != 1)
                {
                    //this.updateStartButton();
                }
                this.playerDisplayList[Sam.gameLogic.activeLocalChair].updateWithPlayer(Sam.gameLogic.players[Sam.gameLogic.activeLocalChair]);
                if(Sam.gameLogic.activeLocalChair == 0){
                    userGameData.setItem("inRoom", "false");
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }
                break;
            }
            case Sam.GameState.AUTOSTART:
            {
                if(data && (data.isAutoStart) && (Sam.gameLogic.timeAutoStart > 0))
                    this.addAutoStart(Sam.gameLogic.timeAutoStart);
                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }

                if(this.getChildByTag(0 + Sam.GameScene.layerEndGameTag)){
                    this.getChildByTag(0 + Sam.GameScene.layerEndGameTag).removeFromParent();
                }

                if(this.getChildByTag(0 + Sam.GameScene.layerSamTag)){
                    this.getChildByTag(0 + Sam.GameScene.layerSamTag).removeFromParent();
                }

                Sam.gameLogic.gameState = Sam.GameState.NONE;
            }
                break;
            case Sam.GameState.FIRSTTURN:{
                this.stopAutoStart();

                if(data.isRandom)
                {
                    for(var i=0;i<5;i++)
                    {
                        var id = Sam.gameLogic.firstTurnCards[i];


                        if(Sam.gameLogic.players[i].ingame && (Sam.gameLogic.players[i].status != 1))
                        {
                            this.playerDisplayList[i].firstTurn(id).setVisible(true);
                            this.effect2D.firstTurn(this.playerDisplayList[i]);

                        }
                    }
                }

                this.bg3.getChildByName("text").setVisible(true);
                this.bg3.getChildByName("text").setString(Sam.gameLogic.players[Sam.gameLogic.convertChair(data.chair)].info.nickName +" được đi lượt đầu tiên !");
                this.bg3.setVisible(true);
                this.bg3.setOpacity(0);
                this.bg3.runAction(cc.sequence(cc.fadeIn(.5),cc.delayTime(1),cc.fadeOut(.5),cc.hide()));
            }
                break;

            case Sam.GameState.CHIABAI:{
                this.chiaBai(data);
            }
                break;

            case Sam.GameState.BAOSAM:
            {
                var localChair = Sam.gameLogic.convertChair(data.chair);
                this.playerDisplayList[localChair].stopEffectTime();
               // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconBaoSamPng));
                GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconBaoSamPng);
                this.playerDisplayList[localChair].uiBaosam.setVisible(true);

                break;
            }

            case Sam.GameState.HUYBAOSAM:
            {
                var localChair = Sam.gameLogic.convertChair(data.chair);
                this.playerDisplayList[localChair].stopEffectTime();
               // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconHuyBaoSamPng));
                GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconHuyBaoSamPng);
                this.playerDisplayList[localChair].uiBaosam.setVisible(true);

                break;
            }
            case Sam.GameState.QUYETDINHSAM:
            {
                for(var i=0;i<5;i++)
                {
                    this.playerDisplayList[i].stopEffectTime();
                    this.playerDisplayList[i].uiBaosam.stopAllActions();
                    this.playerDisplayList[i].uiBaosam.setScale(1);
                    this.playerDisplayList[i].uiBaosam.setVisible(false);
                }

                if(this.getChildByTag(Sam.GameScene.layerSamTag))
                {
                    this.getChildByTag(Sam.GameScene.layerSamTag).removeFromParent(true);
                }

                if(data && data.isSam){
                    var localChair = Sam.gameLogic.convertChair(data.chair);
                   // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(Sam.res.iconBaoSamPng));
                    GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,Sam.res.iconBaoSamPng);
                    this.playerDisplayList[localChair].uiBaosam.setVisible(true);

                    var text = localized("NOTIFY_GAME_1");
                    text = StringUtility.replaceAll(text,"@name", Sam.gameLogic.players[localChair].info.nickName);

                    this.bg3.getChildByName("text").setString(text);
                    this.bg3.getChildByName("text").setVisible(true);
                    this.bg3.setVisible(true);
                    this.bg3.setOpacity(0);
                    this.bg3.runAction(cc.sequence(cc.fadeIn(.5),cc.delayTime(3),cc.fadeOut(.5),cc.hide()));
                }

                break;
            }

            case Sam.GameState.CHANGETURN:{
                var i = 0;
                var activeChair = Sam.gameLogic.activeLocalChair;
                for(i = 0; i < 5; i++){
                    this.playerDisplayList[i].stopEffectTime();
                }

                this.newRound = data.newRound;
                cc.log("Change turn id new Round" + data.newRound);

                if(data.newRound){
                    this.effect2D.clearRecentCards();
                }

                if(this.getChildByTag(Sam.GameScene.layerSamTag))
                {
                    this.getChildByTag(Sam.GameScene.layerSamTag).removeFromParent(true);
                }

                if(this.getChildByTag(0 + Sam.GameScene.layerEndGameTag)){
                    this.getChildByTag(0 + Sam.GameScene.layerEndGameTag).removeFromParent();
                }

                for(var i=0;i<5;i++)
                {
                    this.playerDisplayList[i].clearBoluot();
                }

                this.handCardToNormal();
                this.playerDisplayList[activeChair].addEffectTime(data.time);

                if (Sam.gameLogic.activeLocalChair == 0) {
                    this.btnDanh.setVisible(true);
                   this.btnBoLuot.setVisible(true);
                    if (data.newRound) {
                        this.btnBoLuot.setVisible(false);
                    }
                    this.kiemtraBoluot();
                    this.kiemTraAnhSang();
                    this.kiemTraDanhBai();
                }
                else {
                    this.handCardToNormal();
                   this.btnDanh.setVisible(false);
                    this.btnBoLuot.setVisible(false);
                }

                Sam.gameLogic._gameState = Sam.GameState.NONE;
                break;
            }
                break;

            case Sam.GameState.DANHBAI:{
                if(!data) {
                    return;
                }
                cc.log("update GUI danh bai");
                if(Sam.gameLogic.activeLocalChair != 0){
                    this.playerDisplayList[Sam.gameLogic.activeLocalChair].card.setVisible(true);
                    this.playerDisplayList[Sam.gameLogic.activeLocalChair].numCard.setString("" + data.numberCard);
                    if(data.numberCard == 0){
                        this.playerDisplayList[Sam.gameLogic.activeLocalChair].card.setVisible(false);
                    }
                    else if(data.numberCard == 1)
                    {
                        this.playerDisplayList[Sam.gameLogic.activeLocalChair].addBao1();
                    }
                }


                var cards = [];
                for(var i=0;i < Sam.gameLogic.cardDanhBai.length;i++)
                {
                    cards.push(new Sam.Card(Sam.gameLogic.cardDanhBai[i]));
                }
                var groupCardDanh = new Sam.CardGroup(cards);
                {
                    if(groupCardDanh.isSanhToiCot()){
                        cc.log("Sanh toi cot nhe");
                        this.effect2D.addEffectSanhToiCot();
                    }
                }


                this.effect2D.clearRecentCards();
                this.effect2D.danhBai(this.playerDisplayList[Sam.gameLogic.activeLocalChair].danhBai(Sam.gameLogic.cardDanhBai));

                Sam.gameLogic.recentCards = Sam.gameLogic.cardDanhBai;
            }
                break;

            case Sam.GameState.BOLUOT:
            {
                if(data)
                {
                    this.playerDisplayList[Sam.gameLogic.convertChair(data.chair)].boluot();
                   // if( ( Sam.gameLogic.convertChair(data.chair) == 0 ) && this.nguoikhacdanhbobaito)
                    {
                        //gameSound.playMinhkhongchatduocbobaito();
                        //cc.log("minh gap bo bai to khong bat dc")
                    }
                    //else
                    {
                        //gameSound.playBoluot();
                    }
                }
            }
                break;
            case Sam.GameState.NOTIFYOUTROOM:
            {
                this.playerDisplayList[Sam.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if(Sam.gameLogic.convertChair(data.outChair) == 0){
                    var stringNotify;
                    if(data.isOutRoom){
                        stringNotify = "Bạn đã đăng ký rời phòng thành công."
                    }else{
                        stringNotify = "Bạn đã hủy đăng ký rời phòng."
                    }

                    GameToast.makeToast(2, stringNotify, this.effect2D);
                }
            }
                break;
            case Sam.GameState.JACKPOT:
            {
                var local = Sam.gameLogic.convertChair(data.uChair);
                if(local == 0)
                {
                    //this.effect2D.jackpot();
                }
                break;
            }
            case Sam.GameState.ENDGAME:
            {
                if(!data)
                    return;
               // var jackpot = ccui.Helper.seekWidgetByName(this._layout,"jackpot");
                //jackpot.setString(StringUtility.standartNumber(gamedata.gameLogic._roomJackpot) + "$");
                this.btnXepBai.setVisible(false);
                for(var i=0;i<5;i++)
                {
                    this.playerDisplayList[i].stopEffectTime();
                    this.playerDisplayList[i].removeBao1();
                    this.playerDisplayList[i].clearBoluot();
                    this.playerDisplayList[i].uiBaosam.stopAllActions();
                    this.playerDisplayList[i].uiBaosam.setScale(1);
                    this.playerDisplayList[i].uiBaosam.setVisible(false);
                }

                this.effect2D.ccRemove = function(sender){
                    sender.clearRecentCards();
                }


                if(this.getChildByTag(Sam.GameScene.layerSamTag))
                {
                    this.getChildByTag(Sam.GameScene.layerSamTag).removeFromParent(true);
                }


                this.effect2D.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(this.effect2D.ccRemove.bind(this.effect2D), this.effect2D)));


                var hoa = -1;
                var hoa_Thang_chair = -1, hoa_Thua_chair = -1;       // Nguoi` hoa` cungx co effect
                var thuaChansam = -1;                                            // Nguoi thua se co effect bay tien`
                this.kType++;


                for(var i=0;i<5;i++)
                {
                    var local = Sam.gameLogic.convertChair(i);
                    if(Sam.gameLogic.players[local].ingame){
                        cc.log(data.winTypes[i]);
                        //data.winTypes[i] = this.kType;

                        switch (data.winTypes[i]) {
                            case 5:
                            case 2:     // Thang binh thuong
                            {
                                this.playerDisplayList[local].addThang(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i], 1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i], 2);
                                //if(local == 0)
                                    //gameSound.playThang();
                                break;
                            }

                            case 3:     // Thang bao sam
                            {
                                this.playerDisplayList[local].addThang(1,true);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);

                                if(local == 0)
                                    this.runAction(cc.sequence(cc.delayTime(.75),cc.callFunc(function(){
                                        sceneMgr.shakeScreen();
                                    })));

                                //if(local == 0)
                                //    gameSound.playThang();
                                break;
                            }
                            case 4:     // Thang chan sam
                            {
                                this.playerDisplayList[local].addThang(1.5);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],2.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                if(local == 0)
                                    this.effect2D.chansamthanhcong(cc.p(mainContentSize.width/2,mainContentSize.height/2 + 50));
                                //if(local == 0)
                                //    gameSound.playThang();
                                hoa_Thang_chair = local;
                                break;
                            }
                            case 6:     // Thang sam dinh
                            {
                                this.playerDisplayList[local].addThang(4);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                if(local == 0)
                                    this.effect2D.toitrang(1, this.playerDisplayList[0].handOnCards);
                                else
                                    this.effect2D.toitrang(1, this.playerDisplayList[0].handOnCards, this.playerDisplayList[local].card, data.cards[i]);
                                //if(local == 0)
                                //    gameSound.playThang();

                                break;
                            }
                            case 7:     // Thang 4 heo
                            {
                                this.playerDisplayList[local].addThang(4);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                if(local == 0)
                                    this.effect2D.toitrang(2, this.playerDisplayList[0].handOnCards);
                                else
                                    this.effect2D.toitrang(2,this.playerDisplayList[0].handOnCards,this.playerDisplayList[local].card,data.cards[i]);
                                //if(local == 0)
                                //    gameSound.playThang();
                                break;
                            }
                            case 8:     // Thang 5 doi
                            {
                                this.playerDisplayList[local].addThang(4);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                if(local == 0)
                                {
                                    this.effect2D.toitrang(3,this.playerDisplayList[0].handOnCards);
                                }
                                else
                                    this.effect2D.toitrang(3,this.playerDisplayList[0].handOnCards,this.playerDisplayList[local].card,data.cards[i]);

                                break;
                            }

                            case 9:     // Thang dong` mau`
                            {
                                this.playerDisplayList[local].addThang(4);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                if(local == 0)
                                {
                                    this.effect2D.toitrang(4, this.playerDisplayList[0].handOnCards);
                                }
                                else
                                    this.effect2D.toitrang(4, this.playerDisplayList[0].handOnCards,this.playerDisplayList[local].card,data.cards[i]);
                                //if(local == 0)
                                //    gameSound.playThang();
                                break;
                            }
                            case 10:    // Thang' den` bao 1
                            {
                                this.playerDisplayList[local].addThang(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThang();
                                break;
                            }
                            case 11:    // Thua den` bao 1
                            {
                                this.playerDisplayList[local].addThua(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 13:     // Thua binh thuong
                            {
                                this.playerDisplayList[local].addThua(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 14:        // Thua treo
                            {
                                this.playerDisplayList[local].addThua(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 15:        // Thua toi trang
                            {
                                this.playerDisplayList[local].addThua(4);
                                //this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 16:        // Thua chan sam
                            {
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],2.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2.5);
                                this.playerDisplayList[local].addThua(1.5);
                                if(local == 0)
                                    this.effect2D.baosamthatbai(cc.p(mainContentSize.width/2,mainContentSize.height/2 + 70));
                                //if(local == 0)
                                //    gameSound.playThua();
                                hoa_Thua_chair = local;
                                thuaChansam = local;
                                break;
                            }
                            case 12:
                            {
                                hoa = local;
                                this.playerDisplayList[local].addHoa(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                break;
                            }
                        }
                        //if((hoa == 0 ) && (hoa_Thang_chair > 0) && (hoa_Thua_chair > 0))
                        //{
                        //    this.effect2D.chansamthanhcong(cc.p(cc.winSize.width/2,cc.winSize.height/2 + 50));
                        //    this.effect2D.srcPos = this.playerDisplayList[hoa_Thua_chair].uiAvatar.convertToWorldSpaceAR(cc.p(.5,.5));
                        //    this.effect2D.dstPos = this.playerDisplayList[hoa_Thang_chair].uiAvatar.convertToWorldSpaceAR(cc.p(.5,.5));
                        //
                        //    var time = 1.5;var delay = .75;
                        //    var yy = 0;
                        //    for(var i=0;i<20;i++)
                        //    {
                        //        this.effect2D.moneyFly(cc.pAdd(this.effect2D.srcPos,cc.p(0,yy)),this.effect2D.dstPos,time,delay,true);
                        //        delay += .05;
                        //        yy += 1;
                        //    }
                        //    //gameSound.playThang();
                        //}

                        if((hoa_Thua_chair >= 0  && hoa_Thang_chair >= 0))
                        {

                            //this.effect2D.srcPos = cc.p(mainContentSize.width/2+ 100,mainContentSize.height/2 - 60);
                            this.effect2D.srcPos = this.convertToNodeSpace(this.playerDisplayList[hoa_Thua_chair].uiAvatar.convertToWorldSpaceAR(cc.p(.5,.5)));
                            this.effect2D.dstPos = this.convertToNodeSpace(this.playerDisplayList[hoa_Thang_chair].uiAvatar.convertToWorldSpaceAR(cc.p(.5,.5)));

                            var time = 1.75;var delay = .5;
                            var yy = 0;
                            for(var i=0;i<25;i++)
                            {
                                this.effect2D.moneyFly(cc.pAdd(this.effect2D.srcPos,cc.p(0,yy)),this.effect2D.dstPos,time,delay,false);
                                delay += .075;
                                yy += 1;
                            }
                        }
                    }
                }

                this.runAction(cc.sequence(cc.delayTime(data.countDown - 7),cc.callFunc(this.addEndGameLayer.bind(this),this, data)));
               this.btnXepBai.setVisible(false);
                this.btnBoLuot.setVisible(false);
               this.btnDanh.setVisible(false);
                Sam.gameLogic.gameState = Sam.GameState.NONE;
                break;
            }
            case Sam.GameState.CHATCHONG:
            {
                var local = Sam.gameLogic.convertChair(data.winChair);
                this.playerDisplayList[local].addMoney(data.winMoney,1.5);
                local = Sam.gameLogic.convertChair(data.lostChair);
                this.playerDisplayList[local].addMoney(data.lostMoney,1);
                break;
            }

            case Sam.GameState.UPDATEMATH:
            {
                this.playerDisplayList[0].clearHandOncard();
                //this.playerDisplayList[0].moveCard.setVisible(false);
                for(var i=1;i<5;i++) {
                    this.playerDisplayList[i].clearBaiEndGame();
                    this.playerDisplayList[i].card.setVisible(false);
                }

                for(var i=0;i<5;i++)
                {
                    this.playerDisplayList[i].clearThangThua();
                    this.playerDisplayList[i].removeBao1();
                }

                this.effect2D.removeAllChildren(true);
                this.effect2D.effects = [];

                if(this.getChildByTag(0 + Sam.GameScene.layerEndGameTag)){
                    this.getChildByTag(0 + Sam.GameScene.layerEndGameTag).removeFromParent();
                }

                if(this.getChildByTag(0 + Sam.GameScene.layerSamTag)){
                    this.getChildByTag(0 + Sam.GameScene.layerSamTag).removeFromParent();
                }

                //this.updateStartButton();
                break;

            }

            case  Sam.GameState.NONE:
            {
                break;
            }
        }

    },



    onUpdateButton: function(){

        //this.btnStart.setVisible(false);
        this.btnDanh.setVisible(false);
        this.btnBoLuot.setVisible(false);
        this.btnXepBai.setVisible(false);

        if(Sam.gameLogic.gameState == Sam.GameState.AUTOSTART || Sam.gameLogic.gameState == Sam.GameState.JOINROOM){
            //this.btnStart.setVisible(true);
        }
    },

    chiaBai:function(data){
        //Qua trinh tao dealer
        var i;

        this.btnXepBai.setVisible(true);
        for(i = 0; i < 5; i++){
            this.playerDisplayList[i].clearBai();
        }

        for(i=1;i<5;i++)
        {
            if(Sam.gameLogic.players[i].ingame && (Sam.gameLogic.players[i].status > 1))
            {
                this.playerDisplayList[i].removeBao1();
                this.playerDisplayList[i].cardFirstTurn.setVisible(false);
                this.playerDisplayList[i].numCard.setString("0");
            }
        }
        this.gameId.setString("# "+ Sam.gameLogic.gameId);

        this.playerDisplayList[0].cardFirstTurn.setVisible(false);
        this.playerDisplayList[0].initWithCards(Sam.gameLogic.cardChiabai);

        var countNum = 0;
        for(i = 0; i < 5; i++){
            if(Sam.gameLogic.players[i].ingame && (Sam.gameLogic.players[i].status > 1)) {
                countNum++;
            }
        }
        var stt = -1;
        for(i = 0; i < 5; i++){
            if(Sam.gameLogic.players[i].ingame && (Sam.gameLogic.players[i].status > 1)) {
                stt++;
                this.effect2D.chiaBai(this.playerDisplayList[i], countNum, stt);
            }
        }

        this.callbackAddBaoSam = function(sender,typeToiTrang){
            this.btnXepBai.setVisible(true);
            //this.playerDisplayList[0].enableTouch(true);
            this.addBaoSamLayer(Sam.gameLogic.timeBaoSam - 2, typeToiTrang);
            for(var i=0;i<5;i++)
            {
                if(Sam.gameLogic.players[i].ingame && (Sam.gameLogic.players[i].status != 1)) {
                    this.playerDisplayList[i].stopEffectTime();
                    this.playerDisplayList[i].addEffectTime(Sam.gameLogic.timeBaoSam - 1.75);
                }
            }
        }

        if(data)
            this.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(this.callbackAddBaoSam.bind(this), this, data.toiTrang)));
        //Qua trinh Bai chuyen ve
    },

    danhBaiAI: function(cards){
        return;
    },


    sapxep: function(){
        this.effect2D.sapXep(this.playerDisplayList[0]);
    },

    refreshResize: function(){
        for(var i = 0; i < 5; i++){
            this.playerDisplayList[i].refreshResize();
        }
    },

    addBaoSamLayer: function(time, typeToiTrang){
        this.removeBaoSamLayer();
        var layer = new BaseLayer();
        //layer.initWithBinaryFile("res/g_res_cardGame_json_BaoSamScene.json");

        layer.setTag(Sam.GameScene.layerSamTag);
        this.addChild(layer, 2);
        layer.setFog(true);
        //customize

        //var btnBaoSam = ccui.Helper.seekWidgetByName(layer._layout, "btnBaoSam");
        //btnBaoSam.setPressedActionEnabled(true);
        //btnBaoSam.setTag(Sam.GameScene.BTNBAOSAM);
        //btnBaoSam.addTouchEventListener(this.onTouchEventHandler, this);
        layer.addSprite(layer,"bg",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/bg_layer_banchoi.png");
        layer.addButton(layer,"btnBaoSam",Sam.GameScene.BTNBAOSAM,cc.p(637,495),true,res_CardGame_CommonResource_BanChoi+"/btn_baosam.png",res_CardGame_CommonResource_BanChoi+"/btn_baosam.png");

        layer["btnBaoSam"].addTouchEventListener(this.onTouchEventHandler, this);
        layer.addButton(layer,"btnHuySam",Sam.GameScene.BTNHUYSAM,cc.p(640,317),true,res_CardGame_CommonResource_BanChoi+"/btn_huybao_sam.png",res_CardGame_CommonResource_BanChoi+"/btn_huybao_sam.png");
        layer["btnHuySam"].addTouchEventListener(this.onTouchEventHandler, this);


        //var btnHuySam = ccui.Helper.seekWidgetByName(layer._layout, "btnHuySam");
        //btnHuySam.setPressedActionEnabled(true);
        //btnHuySam.setTag(Sam.GameScene.BTNHUYSAM);
        //btnHuySam.addTouchEventListener(this.onTouchEventHandler, this);

         layer.addImage(layer,"bg_timer",cc.p(437.5,352),res_CardGame_CommonResource_BanChoi+"/process_nen_baosam.png",cc.size(417,80));
        layer.bg_timer.setAnchorPoint(0,0);
        //ccui.Helper.seekWidgetByName(layer._layout, "bg_timer");
        layer.addImage(layer,"progress",cc.p(465,381),res_CardGame_CommonResource_BanChoi+"/process_baosam.png",cc.size(360,22));//ccui.Helper.seekWidgetByName(layer._layout, "progress");
        layer.progress.setAnchorPoint(0,0);
        layer.progress.time = time;
        layer.progress.runAction(cc.scaleTo(time, 0, 1));

        var sun = new cc.ParticleSun();
        sun.texture = cc.textureCache.addImage("res/common/particles/fire.png");

        sun.setScale(0.4);
        sun.setPosition(layer.progress.getPositionX() + layer.progress.getContentSize().width - layer.progress.getContentSize().width*0.05 , layer.progress.getPositionY() + layer.progress.getContentSize().height/2-sun._getHeight()/2);
        var posX = layer.progress.getPositionX();
        sun.setAnchorPoint(cc.p(0.0, 0.0));

        layer.addChild(sun);
        //node.addChild(sun);
        sun.runAction(cc.moveTo(time, cc.p(posX - layer.progress.getContentSize().width*0.05, layer.progress.getPositionY() + layer.progress.getContentSize().height/2 - - sun._getHeight()/2 )));

        for(var i=0; i <this.playerDisplayList[0].handOnCards.length;i++)
        {
            var card = new Sam.CardSprite(this.playerDisplayList[0].handOnCards[i].id);
            var posCard = this.playerDisplayList[0].handOnCards[i].convertToWorldSpaceAR(cc.p(0.0,0.0));
            posCard = layer.convertToNodeSpace(posCard);
            card.setPosition(posCard);
            layer.addChild(card);
        }
        layer.addImage(layer,"bg2",cc.p(640,603),res_Common+"/9patch.png",cc.size(600,60));
        layer.bg2.setVisible(false);
        layer.addText(layer["bg2"],"text",cc.p(302,29),"Chúc mừng bạn được Bộ bài Đồng màu,chọn tới trắng để Sâm ngay hoặc hủy báo để chơi tiếp",RobotoRegular.fontName,24);
        layer.text.setName("text");
        layer.text.setColor(cc.color("#FFFF00"));
        //layer._layout.getChildByName("bg2").setVisible(false);
        if((typeToiTrang == 1) || (typeToiTrang == 2) ||(typeToiTrang == 3) ||(typeToiTrang == 4))
        {

            var text = localized("NOTIFY_GAME_2");
            switch (typeToiTrang)
            {
                case 1: // sam dinh

                    text = StringUtility.replaceAll(text,"@type","Bộ bài Sâm đỉnh");
                    break;

                case 2: // 5 doi
                    text = StringUtility.replaceAll(text,"@type","Bộ bài 5 Đôi");
                    break;

                case 3: // tu 2
                    text = StringUtility.replaceAll(text,"@type","Bộ bài Tứ quý 2");
                    break;
                case 4: //dong mau
                {
                    text = StringUtility.replaceAll(text,"@type","Bộ bài Đồng màu");
                    break;
                }
            }
            layer.bg2.getChildByName("text").setString(text);
            layer.bg2.setVisible(true);
            layer["btnBaoSam"].loadTextures(Sam.res.btnToiTrangPng,Sam.res.btnToiTrangPng,Sam.res.btnToiTrangPng,ccui.Widget.PLIST_TEXTURE);
            //ccui.Helper.seekWidgetByName(layer._layout,"btnBaoSam").setVisible(false);
            //ccui.Helper.seekWidgetByName(layer._layout,"btnBaoSam").setVisible(true);

        }
    },

    removeBaoSamLayer: function(){
        var layer = this.getChildByTag(parseInt(Sam.GameScene.layerSamTag));
        if(layer){
            layer.removeFromParent();
        }
    },

    addAutoStart: function(time) {
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var after, donviS, chucS;
        if(after = this.getChildByTag(0 + Sam.GameScene.aftertag)){
            after.removeFromParent();
        }

        if(chucS = this.getChildByTag(0 + Sam.GameScene.chuctag)){
            chucS.removeFromParent();
        }

        if(donviS = this.getChildByTag(0 + Sam.GameScene.donvitag)){
            donviS.removeFromParent();
        }

        after = GuiUtil.createSprite(Sam.res.afterPng);
        after.setTag(Sam.GameScene.aftertag);
        var timeRemain = time;
        after.setPosition(cc.p(winSize.width*0.5, winSize.height*0.7));
        var pos = after.getPosition();
        this.addChild(after);

        var chuc = Math.floor(time/10);
        var donVi = time % 10;

        chucS = GuiUtil.createSprite(this.getImgStartNum(chuc));
        chucS.setTag(Sam.GameScene.chuctag);

        var donViS = GuiUtil.createSprite(this.getImgStartNum(donVi));
        donViS.setTag(Sam.GameScene.donvitag);

        chucS.setPosition(after.getPositionX() + chucS.getContentSize().width*0, after.getPositionY() - chucS.getContentSize().height*1.2);
        this.addChild(chucS);
        donViS.setPosition(chucS.getPositionX() + chucS.getContentSize().width, chucS.getPositionY());
        this.addChild(donViS);

        if(chuc == 0){
            chucS.setVisible(false);
        }

        this.callBackStartAuto = function(sender){
            timeRemain--;
            chuc = Math.floor(timeRemain/10);
            donVi = timeRemain % 10;
            if(chuc == 0){
                chucS.setVisible(false);
            }
            if(timeRemain < 0){
                donViS.setVisible(false);
                after.setVisible(false);
                after.stopAction();
                after.removeFromParent();
                return;
            }

            //chucS.setTexture(this.getImgStartNum(chuc));
            GuiUtil.changeSprite(chucS,this.getImgStartNum(chuc));
            GuiUtil.changeSprite(donViS,this.getImgStartNum(donVi));
            //donViS.setTexture(this.getImgStartNum(donVi));
        }

        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackStartAuto.bind(this), this));
        after.runAction(cc.repeatForever(action));
    },

    stopAutoStart: function(){
        var after, chuc, donVi;
        if( after = this.getChildByTag(Sam.GameScene.aftertag)){
            after.stopAllActions();
            after.removeFromParent();
        }

        if(chuc = this.getChildByTag(Sam.GameScene.chuctag)){
            chuc.removeFromParent();
        }

        if(donVi = this.getChildByTag(Sam.GameScene.donvitag)){
            donVi.removeFromParent();
        }
    },

    getImgStartNum: function(num){
        return Sam.res.startNumPngPath + num + ".png";
    },

    kiemtraBoluot: function()
    {
        if(this.btnBoLuot.isVisible())      // Truong hop danh trong round
        {
            // Kiem tra xem co phai bo luot khong
            var cardsA = [];
            for (var i = 0; i < Sam.gameLogic.recentCards.length; i++) {
                cardsA.push(new Sam.Card(Sam.gameLogic.recentCards[i]));
            }

            var cardsB = [];
            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                cardsB.push(new Sam.Card(this.playerDisplayList[0].handOnCards[i].id));
            }

            var groupA = new Sam.CardGroup(cardsA);
            var groupB = new Sam.CardGroup(cardsB);

            var cothedanh = Sam.LogicUtil.kiemTraChatDuocKhong(groupA, groupB);
            cc.log("cothe danh :  " + cothedanh);

            this.btnBoLuot.getChildByName("arrow").stopAllActions();
            this.btnBoLuot.getChildByName("arrow").setPosition(this.btnBoLuot.arrowPos);
            this.btnBoLuot.getChildByName("arrow").setVisible(false);

            if (!cothedanh) {
                this.btnBoLuot.getChildByName("arrow").setVisible(true);
                this.btnBoLuot.getChildByName("arrow").stopAllActions();
                this.btnBoLuot.getChildByName("arrow").setPosition(this.btnBoLuot.arrowPos);
                this.btnBoLuot.getChildByName("arrow").runAction(cc.sequence(cc.moveBy(.2, cc.p(0, 15)), cc.moveBy(.2, cc.p(0, -15))).repeatForever());
            }
            return cothedanh;
        }
        else
            return true;
    },

    kiemTraAnhSang: function(){
        if(this.btnBoLuot.isVisible())      // Truong hop danh trong round
        {
            var cardIn = [];
            for (var i = 0; i < Sam.gameLogic.recentCards.length; i++) {
                cardIn.push(Sam.gameLogic.recentCards[i]);
            }
            if(cardIn.length ==0){
                return;
            }

            var cardHand = [];
            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                cardHand.push(this.playerDisplayList[0].handOnCards[i].id);
            }
            var black = Sam.LogicUtil.findBlackCard(cardIn, cardHand);

            for (var j = 0; j < black.length; j++) {
                for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                    if (this.playerDisplayList[0].handOnCards[i].id == black[j]) {
                        this.playerDisplayList[0].handOnCards[i].denLai();
                    }
                }
            }
        }
    },

    handCardToNormal: function(){
        for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
            {
                this.playerDisplayList[0].handOnCards[i].sangLai();
            }
        }
    },



    kiemTraDanhBai: function(up){
        var cardUp = [];
        var cardDown = [];
        var cardHandon = [];
        var aGroup = [];
        var bGroup = [];
        var myPlayerDisplay = this.playerDisplayList[0];
        for (i = 0; i < myPlayerDisplay.handOnCards.length; i++){
            cardHandon.push(myPlayerDisplay.handOnCards[i].id);
            if(myPlayerDisplay.handOnCards[i].isUp){
                cardUp.push(new Sam.Card(myPlayerDisplay.handOnCards[i].id));
            }
            else{
                cardDown.push(new Sam.Card(myPlayerDisplay.handOnCards[i].id));
            }
        }

        // truong hop danh trong vong;
        if(Sam.gameLogic.newRound != true){
            var recentCards = [];
            var checkRecentCard = [];
            for(i = 0; i< Sam.gameLogic.recentCards.length; i++){
                recentCards.push(new Sam.Card(Sam.gameLogic.recentCards[i]));
                checkRecentCard.push(Sam.gameLogic.recentCards[i]);
            }

            aGroup = new Sam.CardGroup(recentCards);
            bGroup = new Sam.CardGroup(cardUp);

            if(Sam.LogicUtil.kiemtraChatQuan(aGroup, bGroup)){
                //khong can phai recommend;
                this.myCheckDanh(cardUp, recentCards);
            }
            else{
                if(cardUp.length == 1 && up){
                    var recommendedCards = Sam.LogicUtil.recommend(checkRecentCard, cardHandon, cardUp[0].id);
                    // khong tim thay bai hop ly
                    if(recommendedCards.length <= 1){
                        this.myCheckDanh(cardUp, recentCards);
                    }
                    else{

                        for (var j = 0; j < recommendedCards.length; j++) {
                            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                                if (this.playerDisplayList[0].handOnCards[i].id == recommendedCards[j]) {
                                    this.playerDisplayList[0].handOnCards[i].up();
                                }
                            }
                        }
                        this.kiemTraDanhBai();
                    }
                }
                else{
                    this.myCheckDanh(cardUp, recentCards);
                }
            }
        }
        // Truong hop danh dau turn
        else{
            bGroup = new Sam.CardGroup(cardUp);
            if(Sam.LogicUtil.kiemtraDanh(cardUp)){
                //khong can phai recommend;
                this.myCheckDanh(cardUp);
            }
            else{
                if(up){
                    var recommendedCards = Sam.LogicUtil.recommend2(cardHandon, cardUp);
                    // khong tim thay bai hop ly
                    if(recommendedCards.length <= cardUp.length){
                        this.myCheckDanh(cardUp);
                    }
                    else{
                        for (var j = 0; j < recommendedCards.length; j++) {
                            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                                if (this.playerDisplayList[0].handOnCards[i].id == recommendedCards[j]) {
                                    this.playerDisplayList[0].handOnCards[i].up();
                                }
                            }
                        }
                        this.kiemTraDanhBai();
                    }
                }else{
                    this.myCheckDanh(cardUp);
                }
            }
        }


        var all2 = true;
        for(var i=0;i<cardDown.length;i++)
        {
            if(cardDown[i].so != Sam.Card.kQuanbai2)
            {
                all2 = false;
                break;
            }
        }
        if((cardDown.length > 0) && all2)
        {
            this.btnDanh.cothedanh = false;
            this.btnDanh.getChildByName("arrow").stopAllActions();
            this.btnDanh.getChildByName("arrow").setPositionY(81);
            this.btnDanh.getChildByName("arrow").setVisible(false);
            //Toast.makeToast(2,"Bạn không được đánh 2 cuối cùng...");
        }
    },

    myCheckDanh: function(danhCard, inCard){
        var aCards = [];
        var bCards = [];
        var aGroup = null;
        var bGroup = null;
        // kiem tra chat quan
        if(inCard){

            for(i = 0; i < inCard.length; i++){
                aCards.push(new Sam.Card(inCard[i].id));
            }

            for(i = 0; i < danhCard.length; i++){
                bCards.push(new Sam.Card(danhCard[i].id));
            }
            aGroup = new Sam.CardGroup(aCards);
            bGroup = new Sam.CardGroup(bCards);

            if(danhCard.length == 0){
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
                return;
            }

            if(Sam.LogicUtil.kiemtraChatQuan(aGroup, bGroup)){
                this.btnDanh.cothedanh = true;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.setVisible(true);
                arrow.setPosition(this.btnDanh.arrowPos);
                arrow.runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(0, 15)), new cc.MoveBy(0.2, cc.p(0, -15))).repeatForever());
            }
            else{
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
            }
        }
        else{
            for(i = 0; i < danhCard.length; i++){
                bCards.push(new Sam.Card(danhCard[i].id));
            }
            var bGroup = new Sam.CardGroup(bCards);
            if(danhCard.length == 0){
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
                return;
            }

            if(Sam.LogicUtil.kiemtraDanh(bCards)){
                this.btnDanh.cothedanh = true;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.setVisible(true);
                arrow.setPosition(this.btnDanh.arrowPos);
                arrow.runAction(cc.sequence(new cc.moveBy(0.2, cc.p(0, 15)), new cc.moveBy(0.2, cc.p(0, -15))).repeatForever());
            }
            else{
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
            }
        }

    },

    //addEffectTime: function(timeRemain){
    //    var i;
    //    for(i = 0; i < 5; i++){
    //        this.playerDisplayList[i].addEffectTime(time, time);
    //    }
    //},

    addEndGameLayer: function(sender,data) {
        this.removeEndGameLayer();
        //var layer = new Sam.LayerEndGame(data);
        var layer = gameScenePool.getSamEndGameScene(data);
        this.addChild(layer);
        layer.setTag(Sam.GameScene.layerEndGameTag);
        layer.setLocalZOrder(25);
    },

    removeEndGameLayer: function(){
        var layer = this.getChildByTag(Sam.GameScene.layerEndGameTag);
        if(layer){
            layer.removeFromParent();
        }
    }
});

Sam.GameScene.btnavatarstarttag = 12;
Sam.GameScene.aftertag = 9100;
Sam.GameScene.donvitag = 9101;
Sam.GameScene.chuctag = 9102;
Sam.GameScene.layerSamTag = 9111;
Sam.GameScene.layerEndGameTag = 9112;

Sam.GameScene.BTNDANH = 9000;
Sam.GameScene.BTNBOLUOT = 9001;
Sam.GameScene.BTNXEPBAI = 9002;
Sam.GameScene.BTNSTART = 9003;
Sam.GameScene.BTNBAOSAM = 9004;
Sam.GameScene.BTNHUYSAM = 9005;
Sam.GameScene.BTNBACK = 9006;
Sam.GameScene.BTNINFO = 9008;
Sam.GameScene.BTNCASH = 9009;
Sam.GameScene.BTNCHAT = 9010;

Sam.GameScene.BTNAVATAR0 = 9011;
Sam.GameScene.BTNAVATAR1 = 9012;
Sam.GameScene.BTNAVATAR2 = 9013;
Sam.GameScene.BTNAVATAR3 = 9014;
Sam.GameScene.BTNAVATAR4 = 9015;
Sam.GameScene.BTNTOITRANG = 9016;
Sam.GameScene.BTN_MOI_CHOI = 9017;

Sam.LayerEndGame = BaseLayer.extend({

    ctor: function(data)
    {
        this._super("SamEndGame");
      //  this.initWithBinaryFile("res/g_res_cardGame_json_SamEndGame.json");
        this.data = data;
    },

    setData: function(data){
        this.data = data;
    },

    customizeGUI: function()
    {
        this.addSprite(this, "bg", cc.p(640, 360), res_CardGame_CommonResource_BanChoi + "/bg_endgame.png");

        this.addSprite(this.bg,"nenDen",cc.p(433,289),res_CardGame_CommonResource_BanChoi + "/bg_nenden_engame.png");
        //  this.customizeButton("btnXacNhan", 1, this.bg);
        this.addButton(this.bg,"btnXacNhan",1,cc.p(460,37),true,res_CardGame_CommonResource_BanChoi + "/btn_xacnhan_endgame.png");

        this.panels = [];
        var starPositionX = 431;
        var starPositionY = 457;
        for(var i=0;i<5;i++)
        {
            // this.panels.push(ccui.Helper.seekWidgetByName(bg,"panel_" + i));
            this.panels.push(this.addLayout(this.bg,"panel_"+i,cc.p(starPositionX,starPositionY - i*84),res_CardGame_CommonResource_BanChoi+"/playerShell.png",cc.size(815,75),true));
            this.addSprite(this["panel_"+i],"spect1"+i,cc.p(105,37.5),res_CardGame_CommonResource_BanChoi+"/seperator1.png");
            this.addSprite(this["panel_"+i],"spect2"+i,cc.p(353,37.5),res_CardGame_CommonResource_BanChoi+"/seperator1.png");
            this.addLayout(this["panel_"+i],"node"+i,cc.p(425,37.5),null,cc.size(50,50),true);
            this["node"+i].setName("node");
            this.addText(this["panel_"+i],"name"+i,cc.p(233,57),"Phubadaovietnamhaha",RobotoRegular.fontName,20);
            this["name"+i].setName("name");
            this.addText(this["panel_"+i],"gold"+i,cc.p(233,25),"+200000000",RobotoRegular.fontName,20);
            this["gold"+i].setName("gold");
            this.addLayout(this["panel_"+i],"kq"+i,cc.p(516,37.5),null,cc.size(50,50),true);
            this["kq"+i].setName("kq");
            this.addSprite(this["panel_"+i],"vien"+i,cc.p(407.5,37.5),res_CardGame_CommonResource_BanChoi+"/playerShell2.png");
            this["vien"+i].setName("vien");
            if(i==0){
                this.addSprite(this["panel_"+i],"lb_sttkq"+i,cc.p(50,37.5),res_CardGame_CommonResource_EndGame+"/so1.png");
            }else{
                this.addText(this["panel_"+i],"lb_sttkq"+i,cc.p(50,37.5),(i+1).toString(),RobotoRegular.fontName,48);
            }




        }
        this.addText(this.bg,"title",cc.p(440,541),"Kết Quả",RobotoRegular.fontName,36);
       // gameSound.playResult();
        //this.show();
        this.setFog(true);
    },


    onEnter: function(){
        this._super();

        this.panels = [];

        for(var i=0;i<5;i++)
        {
            this.panels.push(this["panel_"+i]);
            this.panels[i].setVisible(false);
            this.panels[i].nen = null;
            this.panels[i].texture = null;
            this.panels[i].heo = null;
            this.panels[i].label = null;
        }

        this.show();
    },


    onExit: function(){

        if(this.bg) {
            this.addSprite(this, "bg", cc.p(640, 360), res_CardGame_CommonResource_BanChoi + "/bg_endgame.png");
        }

        for(var i=0; i<5;i++)
        {
            if(this.panels[i].texture){
                this.panels[i].texture.removeFromParent();
                this.panels[i].texture = null;
            }

            if(this.panels[i].heo){
                this.panels[i].heo.removeFromParent();
                this.panels[i].heo = null;
            }

            if(this.panels[i].nen){
                this.panels[i].nen.removeFromParent();
                this.panels[i].nen = null;
            }

            if(this.panels[i].label){
                this.panels[i].label.removeFromParent();
                this.panels[i].label = null;
            }
        }
        this._super();
    },

    show: function()
    {

        this.bg.setScale(0.75);
        this.bg.setOpacity(0);
        this.bg.runAction(cc.spawn(new cc.EaseBackOut(cc.scaleTo(.3,1)),cc.fadeIn(.3)));

        var count = 1;
        for(var i=0;i<5;i++)
        {
            cc.log("winTypes" + this.data.winTypes[i]);
            switch (this.data.winTypes[i]) {

                //cc.log("haha");

                case 2:     // Thang binh thuong
                case 5:
                case 3:     // Thang bao sam
                case 4:     // Thang chan sam
                case 6:     // Thang sam dinh
                case 7:     // Thang 4 heo
                case 8:     // Thang 5 doi
                case 9:     // Thang dong` mau`
                case 10:    // Thang den bao 1
                {
                    this.panels[0].setVisible(true);
                    var local = Sam.gameLogic.convertChair(i);
                    this.addKQchoPanel(this.panels[0], this.data.winTypes[i],this.data.cards[i], Sam.gameLogic.players[local].info,this.data.ketQuaTinhTienList[i]);
                    this.panels[0].getChildByName("vien").runAction(cc.sequence(cc.fadeTo(0.5,50),cc.fadeTo(.5,255)).repeatForever());
                    break;
                }
                case 1:
                {
                    break;
                }
                default :
                {
                    this.panels[count].setVisible(true);
                    var local = Sam.gameLogic.convertChair(i);
                    this.addKQchoPanel(this.panels[count],this.data.winTypes[i],this.data.cards[i], Sam.gameLogic.players[local].info, this.data.ketQuaTinhTienList[i]);
                    count++;
                    break;
                }
            }
        }

    },

    textureForWin: function(winType)
    {
        var path = "";
        switch (winType)
        {
            case 1:
            {
                path = Sam.res.kqThangPng;
                break;
            }
            case 5:
            case 2:     // Thang binh thuong
            {
                path = Sam.res.kqThangPng;
                break;
            }
            case 3:     // Thang bao sam
            {
                path = Sam.res.kqThangSamPng;
                break;
            }
            case 4:     // Thang chan sam
            {
                path = Sam.res.kqThangChanSamPng;
                break;
            }
            case 6:     // Thang sam dinh
            {
                path = Sam.res.kqSamDinhPng;
                break;
            }
            case 7:     // Thang 4 heo
            {
                path = Sam.res.kqTuQuyHeoPng;
                break;
            }
            case 8:     // Thang 5 doi
            {
                path = Sam.res.kqNamDoiPng;
                break;
            }
            case 9:     // Thang dong` mau`
            {
                path = Sam.res.kqDongMauPng
                break;
            }
            case 10:     // Thang den bao 1
            {
                path =  Sam.res.kqThangPng;
                break;
            }
            case 11:     // thua den` bao 1
            {
                path = Sam.res.kqDenPng;
                break;
            }
            case 12:     // Hoa`
            {
                path = Sam.res.kqHoaPng;
                break;
            }
            case 13:     // Thua thong thuong`
            {
                path = Sam.res.kqThuaPng;
                break;
            }
            case 14:        // treo
            {
                //path = "symbol_0001_Treo.png";
                path = Sam.res.kqThuaPng;
                break;
            }
            case 15:        // thua toi trang
            {
                path = Sam.res.kqThuaPng;
                break;
            }
            case 16:        // thua chan sam
            {
                path = Sam.res.kqDenSamPng;
                break;
            }
        }
        return path;
    },

    addKQchoPanel: function(panel,winType,cards,info,gold)
    {
        panel.getChildByName("name").setString(info.nickName);
        var node = panel.getChildByName("node");
        node.removeAllChildren();

        if(panel.texture){
            panel.texture.removeFromParent();
            panel.texture = null;
        }

        if(panel.heo){
            panel.heo.removeFromParent();
            panel.heo = null;
        }

        if(panel.nen){
            panel.nen.removeFromParent();
            panel.nen = null;
        }

        if(panel.label){
            panel.label.removeFromParent();
            panel.label = null;
        }


        var str = "";
        if (gold < 0) {
            str = "-" + StringUtility.standartNumber(Math.abs(gold));
        }
        else {
            str = "+" + StringUtility.standartNumber(gold);
        }
        panel.getChildByName("gold").setString(str);
        if (gold < 0){
            //do something
        }
            //panel.getChildByName("gold").setColor({r: 120, g: 120, b: 120});
        else{
            panel.getChildByName("gold").setColor({r: 255, g: 255, b: 0});
        }
        panel.getChildByName("kq").setVisible(false);


        //cc.log(winType+"sss");
        var pathTexture = this.textureForWin(winType);

        if(pathTexture != ""){
            var texture = GuiUtil.createSprite(pathTexture);
        }

        if(texture) {
            panel.texture = texture;
            panel.getChildByName("node").addChild(texture);
            panel.getChildByName("node").setVisible(true);
            texture.setPositionX(panel.getContentSize().width*0.4);
            texture.setPositionY(panel.getContentSize().height*0.3);
        }


       switch (winType)
        {
            case 1:
            {
                break;
            }
            case 2:     // Thang binh thuong
            case 5:
            case 3:     // Thang bao sam
            case 4:     // Thang chan sam
            case 6:     // Thang sam dinh
            case 7:     // Thang 4 heo
            case 8:     // Thang 5 doi
            case 9:     // Thang dong` mau`
            case 10:

            {

                var deltaX = 0;
                for (var j = 0; j < cards.length; j++) {
                    var sam = new Sam.CardSprite(cards[j]);
                    node.addChild(sam);
                    sam.setPositionX(deltaX);
                    sam.setPositionY(sam.getContentSize().height*0.35*0.43);
                    sam.setScale(.35);
                    deltaX += 25;
                }

                if(winType == 2)
                {
                    //panel.getChildByName("kq").setPosition(node);
                }
                if(winType == 3 || winType == 4 || winType == 6 || winType == 7 || winType == 8 || winType == 9){
                    var nen = GuiUtil.createSprite(Sam.res.kqNenThangPng);
                    panel.nen = nen;
                    nen.setAnchorPoint(cc.p(0,0.5));
                    nen.setPosition(node.getPositionX(), node.getPositionY() + nen.getContentSize().height/2);
                    panel.addChild(nen);
                    var label = new ccui.Text();
                    panel.label = label;
                    label.setAnchorPoint(cc.p(0.5,0.5));
                    label.setFontName("res/Font/arial.ttf");
                    label.setFontSize(30);
                    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    label.setColor(cc.color.WHITE);
                    label.setString("Cóng");
                    label.setPosition(nen.getContentSize().width/2, nen.getContentSize().height/2);
                    nen.addChild(label);
                    if(winType == 3){
                        label.setString("Thắng Sâm");
                    }else if(winType == 4){
                        label.setString("Chặn Sâm");
                    }else {
                        label.setString("Tới Trắng");
                    }
                }

                //texture.setPositionX(deltaX + 25);
                break;
            }

            case 11:    // Thua den bao 1
            case 12:     // Hoa`
            case 13:     // Thua thong thuong`
            case 14:      // Thua treo
            case 15:        // thua toi trang
            case 16:        // thua chan sam
            {
                var deltaX = 0;
                for (var j = 0; j < cards.length; j++) {
                    var sam = new Sam.CardSprite(cards[j]);
                    node.addChild(sam);
                    sam.setPositionX(deltaX);
                    sam.setPositionY(sam.getContentSize().height*0.35*0.43);
                    sam.setScale(.35);
                    deltaX += 25;
                }

                //texture.setPositionX(deltaX + 25);

                if(winType == 14)
                {
                    var nen = GuiUtil.createSprite(Sam.res.kqNenThuaPng);
                    panel.nen = nen;
                    nen.setAnchorPoint(cc.p(0,0.5));
                    nen.setPosition(node.getPositionX(), node.getPositionY());

                    panel.addChild(nen);
                    var label = new ccui.Text();
                    panel.label = label;
                    label.setAnchorPoint(cc.p(0.5,0.5));
                    label.setFontName("res/Font/arial.ttf");
                    label.setFontSize(30);
                    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    label.setColor(cc.color.WHITE);
                    label.setString("Cóng");
                    label.setPosition(nen.getContentSize().width/2, nen.getContentSize().height/2);
                    nen.addChild(label);
                }
                else if(winType == 15){
                    //var nen = new cc.Sprite(Sam.res.kqNenThuaPng);
                    //nen.setAnchorPoint(cc.p(0,0.5));
                    //nen.setPosition(node.getPosition());
                    //
                    //panel.addChild(nen);
                    //var label = new ccui.Text();
                    //label.setAnchorPoint(cc.p(0.5,0.5));
                    //label.setFontName("fonts/arial.ttf");
                    //label.setFontSize(30);
                    //label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    //label.setColor(cc.color.WHITE);
                    //label.setString("Cóng");
                    //label.setPosition(nen.getContentSize().width/2, nen.getContentSize().height/2);
                    //nen.addChild(label);
                }
                else if(winType == 16){
                    var nen = GuiUtil.createSprite(Sam.res.kqNenThuaPng);
                    panel.nen = nen;
                    nen.setAnchorPoint(cc.p(0,0.5));
                    nen.setPosition(node.getPosition());
                    panel.addChild(nen);
                    var label = new ccui.Text();
                    panel.label = label;
                    label.setAnchorPoint(cc.p(0.5,0.5));
                    label.setFontName("res/Font/arial.ttf");
                    label.setFontSize(30);
                    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    label.setColor(cc.color.WHITE);
                    label.setString("Bị chặn sâm");
                    label.setPosition(nen.getContentSize().width/2, nen.getContentSize().height/2);
                    nen.addChild(label);
                }

                else if(winType == 13)
                {
                    if(Sam.LogicUtil.kiemtraThoiTuQuy(cards))
                    {
                        var tuquy = GuiUtil.createSprite(Sam.res.kqThoiTuQuy);
                        tuquy.setScale(0.7);
                        tuquy.setPositionY(tuquy.getContentSize().height*0.33);

                        panel.getChildByName("kq").addChild(tuquy);
                        panel.getChildByName("kq").setVisible(true);
                        panel.heo = tuquy;
                    }
                    else if(Sam.LogicUtil.kiemtraThoiHeo(cards)) {
                        var heo = GuiUtil.createSprite(Sam.res.kqThoiHeo);
                        heo.setScale(0.7);
                        heo.setPositionY(heo.getContentSize().height*0.33);
                        panel.getChildByName("kq").addChild(heo);
                        panel.getChildByName("kq").setVisible(true);
                        panel.heo = heo;
                    }
                }
                break;
            }
        }
    },

    onButtonRelease: function(btn,id){
        switch (id)
        {
            case 1:
            {
                cc.log("button Xac nhat");
                this._layerColor.runAction(cc.fadeTo(.2,0));

                this.bg.setScale(1);
                this.bg.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(.2,1.2)),cc.fadeOut(.2)));
                this.runAction(cc.sequence(cc.delayTime(.2),cc.removeSelf()));
                break;
            }
        }
    }
})



