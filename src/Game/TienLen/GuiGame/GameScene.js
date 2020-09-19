//
TienLen.GameScene = BaseLayer.extend({
    ctor: function(){
        this._super();
        this.playerDisplayList = [];
        this.kType = 0;
        this.chatLayer = null;
        this.cheatLayer = null;

        //this.initWithBinaryFile("res/g_res_cardGame_json_TienLenGameScene.json");

        this.customizeGUI2();
        this.effect2D = new TienLen.EffectLayer();
        this.addChild(this.effect2D);
        this.effect2D.setLocalZOrder(10);
        this.hasInfoHuVang = false;

        var that = this;
        this.customlistener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "updateMoney",
            callback: function(event){
                cc.log("function callback");
                that.updateMoneyFromLobby(event);
            }
        });
        this.duongDan ="res/CardGame/CommonResource";

        cc.eventManager.addListener(this.customlistener, 1);
    },

    //override
    onEnter: function(){
        cc.log("onEnterTien Len: addListener");
        this._listener = null;
        BaseLayer.prototype.onEnter.call(this);
        cc.log("onEnterTienLen: addListener2");
        if(menutab)
            menutab.hideAllInfo();
        this.hasInfoHuVang = false;

        this.playerDisplayList[0].addListenerPlayer();

        if(CURRENT_MODE != MODE_DEPLOY.LIVE){
            this.cheatLayer = new CheatLayer();
            this.cheatLayer.clear();
            this.cheatLayer.setType(GameList.TienLenSoLo);
            this.cheatLayer.setVisible(false);
            this.addChild(this.cheatLayer);
            this.cheatLayer.setLocalZOrder(12);
        }

        this.clearScene();
        this.huVangIcon.hasHu = false;
        //test
        this.huVangIcon.setVisible(false);
        this.huVangIcon.changeToHasHu(false);
        if(gameWsClient){
            gameWsClient.sendThongTinHuVang();
        }
       this.updateLogoSolo();
    },


    onExit: function(){
        this.playerDisplayList[0].removeListenerPlayer();
        if(this.cheatLayer){
            this.cheatLayer.removeFromParent();
        }


        if(this.chatLayer){
            this.chatLayer.removeFromParent();
            this.chatLayer = null;
        }
        this.stopAutoStart();
        BaseLayer.prototype.onExit.call(this);
    },

    clearScene: function(){
        this.hideButton();
        this.playerDisplayList[0].clearHandOncard();
        for(var i=1;i< TienLen.MAX_PLAYER;i++) {
            this.playerDisplayList[i].clearBaiEndGame();
            this.playerDisplayList[i].card.setVisible(false);
        }

        for(var i=0;i<TienLen.MAX_PLAYER;i++)
        {
            this.playerDisplayList[i].clearThangThua();
            this.playerDisplayList[i].stopEffectTime();
            this.playerDisplayList[i].clearFirstTime();
        }

        this.effect2D.clearEffect();
        this.removeEndGameLayer();
    },

    hideButton: function(){
        this.btnBoLuot.setVisible(false);
        this.btnDanh.setVisible(false);
        this.btnXepBai.setVisible(false);
    },

    updateMoneyFromLobby: function(event){
        if(TienLen.gameLogic.moneyType == event.moneyType){
            this.playerDisplayList[0].uiGold.setString(StringUtility.standartNumber(event.currentMoney));
        }
        cc.log("updateMoneyFromLobby " + event.currentMoney + " "  + event.moneyType);
    },

    updateWithData: function(pk){
        this.huVangIcon.updateWithData(pk);
        this.hasInfoHuVang = true;
    },

    updateHuVangIcon: function(remainTime){
        if(this.hasInfoHuVang)
            this.huVangIcon.updateTime(remainTime, null);
    },

    startPingPong: function(){
        gameWsClient.sendPingPong();
    },

    updatePingPong: function(){
        this.lbPing.setString("" + gameData.pingCount);
    },

    //override
    customizeGUI2: function(){

        cc.spriteFrameCache.addSpriteFrames("res/CardGame/TienLen/PlistTienLen.plist","res/CardGame/TienLen/PlistTienLen.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        var i;
        this.addSprite(this, "sadsdfds",cc.p(640,360),"res/CardGame/TienLen/sanhRong.png");


        this.addLayout(this,"abcxyz",cc.p(640,360),null,cc.size(1280,720),true);
        this.addSprite(this,"bg",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/bg_layer_banchoi.png");
        this.addButton(this,"btnBack",TienLen.GameScene.BTNBACK,cc.p(47 ,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png");
        this.addButton(this,"btnInfo",TienLen.GameScene.BTNINFO,cc.p(1150 ,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png");
        this.addButton(this,"btnCash",TienLen.GameScene.BTNCASH,cc.p(1071 ,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png");

        if(CURRENT_MODE == MODE_DEPLOY.LIVE){
            this.btnCash.setVisible(false);
        }

        this.addButton(this,"btnChat",TienLen.GameScene.BTNCHAT,cc.p(1228 ,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png");
        this.addButton(this,"btnBoLuot",TienLen.GameScene.BTNBOLUOT,cc.p(488,243),true,res_CardGame_CommonResource_BanChoi+"/btn_boluot_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_boluot_gamebai.png");
        this.addSprite(this.btnBoLuot,"arrowbl",cc.p(128,100.5),res_CardGame_CommonResource_BanChoi+"/arrow.png");
        this["arrowbl"].setName("arrow");
        this.btnBoLuot.setVisible(false);
     //   this.btnDanh = this.customizeButton("btnDanh", TienLen.GameScene.BTNDANH);
        this.addButton(this,"btnDanh",TienLen.GameScene.BTNDANH,cc.p(795,243),true,res_CardGame_CommonResource_BanChoi+"/btn_danhbai_gamebai.png",res_CardGame_CommonResource_BanChoi+ "/btn_danhbai_gamebai.png");

        this.btnDanh.setVisible(false);
        this.addSprite(this.btnDanh,"arrowdb",cc.p(121,100.5),res_CardGame_CommonResource_BanChoi+"/arrow.png");
        this["arrowdb"].setName("arrow");// setkey
        this.btnDanh.arrowPos = this["arrowdb"].getPosition(); //

       // this.btnBoLuot = this.customizeButton("btnBoLuot", TienLen.GameScene.BTNBOLUOT);

        this.btnBoLuot.arrowPos = this["arrowbl"].getPosition();

      //  this.btnXepBai = this.customizeButton("btnXepBai", TienLen.GameScene.BTNXEPBAI);
        this.addButton(this,"btnXepBai",TienLen.GameScene.BTNXEPBAI,cc.p(1173,99),true,res_CardGame_CommonResource_BanChoi+"/btn_xep_labai.png",res_CardGame_CommonResource_BanChoi+"/btn_xep_labai.png");
        this.btnXepBai.setVisible(false);
       // this.btnBack = this.customizeButton("btnBack", TienLen.GameScene.BTNBACK);


        //this.btnInfo = this.customizeButton("btnInfo", TienLen.GameScene.BTNINFO);


       // this.btnCash = this.customizeButton("btnCash", TienLen.GameScene.BTNCASH);


       // this.btnChat = this.customizeButton("btnChat", TienLen.GameScene.BTNCHAT);

       // this.iconNetwork =  ccui.Helper.seekWidgetByName(this._layout, "iconNetwork");


        this.addSprite(this,"imageSamLoc",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/tienLen.png");
        this["imageSamLoc"].setName("imageSamLoc");

       // this.lbPing = ccui.Helper.seekWidgetByName(this._layout, "lbPinghaha");



        //them 5 btn avatar
        var positionUser = [cc.p(132,102),cc.p(118,402),cc.p(563,627),cc.p(1163,402)];
        for(i = 0; i < TienLen.MAX_PLAYER; i++) {
         //  var panel = ccui.Helper.seekWidgetByName(this._layout, "panel" + i);

            this.addLayout(this,"panel"+i,positionUser[i],null,cc.size(144,144),true);
            this.addButton(this["panel" + i], "btnAvatar" + i, 1, cc.p(72, 72), true, res_Common + "/avatar/bg_vongngoai_avatar.png");
            this["btnAvatar" + i].setName("btnAvatar");
            this.addSprite(this["panel" + i], "bg_progress" + i, cc.p(72, 72), res_Common + "/avatar/Vong_Ngoai.png");
            this["bg_progress" + i].setName("bg_progress");
            this["bg_progress" + i].setScale(128/124);

            if(i<3) {

                // var panel = this.addLayout(this,"panel"+i,cc.p());
                //   btn = ccui.Helper.seekWidgetByName(panel, "btnAvatar");


                if (i > 0 && i < 3) {
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
            //this["btnAvatar" + i].setPressedActionEnabled(true);
            this["btnAvatar" + i].setTag(TienLen.GameScene.btnavatarstarttag + i);
            this["btnAvatar" + i].addTouchEventListener(this.onTouchEventHandler, this);
            var playerDisplay = new TienLen.PlayerDisplay();
            playerDisplay.index = i;
            playerDisplay.gameScene = this;
            this.addChild(playerDisplay);
            playerDisplay.setPanel(this["panel"+i]);

            if (i == 0) {
                //playerDisplay.cardPanel = ccui.Helper.seekWidgetByName(this._layout, "cardpanel");
                playerDisplay.initMyPlayer();
            }
            else{

            }

            playerDisplay.initPlayerDisplay();
            this.playerDisplayList.push(playerDisplay);
        }

        this.addText(this,"roomId",cc.p(135,677),"Ban :9990",RobotoRegular.fontName,20);
        this.addText(this,"gameId",cc.p(247,677),"9999999999",RobotoRegular.fontName,20);
        this.addText(this,"muccuoc",cc.p(165,652),"Mức cược: 500K",RobotoRegular.fontName,20);
        //this.addSprite(this,"bg2",cc.p(640,436),res_Common+"/9patch.png");
        //this.addText(this["bg2"],"text1",cc.p(259,25),"Theo luot kkkkkkkkkkkkkkkkkkkduoc moi bao sam truoc",RobotoRegular.fontName,36);
        //this["text1"].setName("text");
        //this["bg2"].setVisible(false);
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
        this.huVangIcon.setBoBaiByType(GameList.TienLenSoLo);
        this.addChild(this.huVangIcon);
        this.huVangIcon.setScale(0.6);
        this.huVangIcon.setPosition(1140, 610);
        this.huVangIcon.addHuListener();
        //Test
        this.huVangIcon.setVisible(false);
        this.huVangIcon.changeToHasHu(false);
        cc.log("end customize");
    },

    updateLogoSolo: function(){
      //  var logo = ccui.Helper.seekWidgetByName(this._layout, "imageSamLoc");
      //  this.addSprite(this,"imageSamLoc",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/tienLen.png");
        var str;
        if(gameData.gameType == GameList.TienLenSoLo){
            str = "res/CardGame/CommonResource/BanChoi/TLMN-Solo.png";
        }else{
            str = "res/CardGame/CommonResource/BanChoi/tienLen.png";
        }
      //  this["imageSamLoc"].setTexture(str);
        GuiUtil.changeSprite(this["imageSamLoc"],str);
    },

    onButtonRelease: function(btn, id){
        switch(id) {
            case TienLen.GameScene.BTNAVATAR0:
            case TienLen.GameScene.BTNAVATAR1:
            case TienLen.GameScene.BTNAVATAR2:
            case TienLen.GameScene.BTNAVATAR3:
            case TienLen.GameScene.BTNAVATAR4:{
                var idx = id - TienLen.GameScene.BTNAVATAR0;
                var data = {};
                //sceneMgr.getRunningScene().addChild(new UserInfoGUI(data));
            }
                break;
            case TienLen.GameScene.BTNBACK:{
                cc.log("BTNBACK");
                // Thay doi mau sac nut Back
                //button.getChildByName("check").setVisible(!button.getChildByName("check").isVisible());
                var pk = new TienLen.CmdSendRequestLeaveGame();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
                break;

            case TienLen.GameScene.BTNDANH:{
                cc.log("btn danh");
                if(!btn.cothedanh)
                {
                    cc.log("khong hop le");
                    GameToast.makeToast(2,"Đánh bài không hợp lệ..", this.effect2D);
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
                var pk = new TienLen.CmdSendDanhBai();
                pk.putData(false,cards);
                gameWsClient.send(pk);
                pk.clean();

                this.btnDanh.setVisible(false);
                this.btnBoLuot.setVisible(false);
                break;
            }
                break;
            case TienLen.GameScene.BTNBOLUOT:{
                var pk = new TienLen.CmdSendDanhBai();
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
            case TienLen.GameScene.BTNXEPBAI:{
                this.sapxep();
            }
                break;
            case TienLen.GameScene.BTNSTART:{
                cc.log("BTNSTART");
            }
                break;
            case TienLen.GameScene.BTNCHAT:{
                cc.log("BTNCHAT");
                this.onBtnChatClicked();
            }
                break;
            case TienLen.GameScene.BTNCASH:{
                cc.log("BTNCASH");
                this.cheatLayer.setVisible(true);
            }
                break;

            case TienLen.GameScene.BTNINFO:{
                var s = GameManager.getInstance().getHotroLink(GameList.TienLenSoLo);
                if(cc.sys.isNative) {
                    if(lobby.open_payment_ios == false){
                        popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                        return;
                    }
                }
                ConnectNative.openWebView(s, false);
            }
                break;

            case TienLen.GameScene.BTN_MOI_CHOI:{
                cc.log("click btn moiChoi");
                if(gameWsClient){
                    gameWsClient.sendGetInfoMoiChoi();
                }
            }
                break;
        }
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
        if(!TienLen.gameLogic)
            return;

        //update hien thi Player
        for(i = 0; i < TienLen.MAX_PLAYER; i++) {
            this.playerDisplayList[i].updateWithPlayer(TienLen.gameLogic.players[i]);
        }

        //onUpdateButton();
        switch(TienLen.gameLogic.gameState){
            case TienLen.GameState.JOINROOM:{
                //var muccuoc = ccui.Helper.seekWidgetByName(this._layout,"muccuoc");

               // var ban  = ccui.Helper.seekWidgetByName(this._layout,"roomId");
               // var gameId = ccui.Helper.see kWidgetByName(this._layout, "gameId");

                this.roomId .setString("Bàn :" + TienLen.gameLogic.roomId);
                this.gameId.setString("# "+ TienLen.gameLogic.gameId);
                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(TienLen.gameLogic.bet));
                if(this.chip){
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + TienLen.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width*0.5 + 10, this.muccuoc.getPositionY());
            }
                break;

            case TienLen.GameState.PLAYCONTINUE:{
               // var muccuoc = ccui.Helper.seekWidgetByName(this._layout, "muccuoc");
               // var ban  = ccui.Helper.seekWidgetByName(this._layout,"roomId");
              //  var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn :" + TienLen.gameLogic.roomId);
                this.gameId.setString("# "+ TienLen.gameLogic.gameId);
                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(TienLen.gameLogic.bet));

                if(false){
                    if(gameData.gameType == GameList.TienLenSoLo){
                        this.btnMoiChoi.setVisible(true);
                    }
                    else{
                        this.btnMoiChoi.setVisible(false);
                    }
                }

                if(this.chip){
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + TienLen.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() +  this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width*0.5 + 10, this.muccuoc.getPositionY());

                this.btnXepBai.setVisible(true);
                for(var i=0;i< TienLen.MAX_PLAYER;i++)
                {
                    this.playerDisplayList[i].updateWithPlayer(TienLen.gameLogic.players[i]);
                }

                switch(TienLen.gameLogic.gameServerState){
                    case 1:  // dang choi
                    {
                        for(i = 1; i < TienLen.MAX_PLAYER; i++){
                            if(TienLen.gameLogic.players[i].ingame){
                                this.playerDisplayList[i].card.setVisible(true);
                                this.playerDisplayList[i].numCard.setString("" + TienLen.gameLogic.players[i].info["cards"]);
                                if(TienLen.gameLogic.players[i].info["cards"] == 0){
                                    this.playerDisplayList[i].card.setVisible(false);
                                }
                                else if(TienLen.gameLogic.players[i].info["cards"] == 1)
                                {
                                    //this.playerDisplayList[i].addBao1();
                                }
                            }
                        }


                        switch(TienLen.gameLogic.gameAction){
                            case 3: // dang choi binh thuong
                            {
                                this.playerDisplayList[0].clearBai();
                                this.playerDisplayList[0].initWithCards(TienLen.gameLogic.cardChiabai);
                                this.btnXepBai.setVisible(true);

                                var localChairTurn = TienLen.gameLogic.activeLocalChair;
                                this.playerDisplayList[localChairTurn].addEffectTime(TienLen.gameLogic.activeTimeRemain);


                                if(TienLen.gameLogic.recentCards.length > 0)
                                {
                                    this.effect2D.clearRecentCards();
                                    this.effect2D.addBaiDanh(TienLen.gameLogic.recentCards);
                                    this.cardRecent = TienLen.gameLogic.recentCards;
                                }

                                if (localChairTurn == 0) {
                                    this.btnDanh.setVisible(true);
                                    this.btnBoLuot.setVisible(true);
                                    if (TienLen.gameLogic.newRound) {
                                        this.btnBoLuot.setVisible(false);
                                    }
                                    this.kiemTraDanhBai();
                                }
                                else {
                                    this.btnDanh.setVisible(false);
                                   this.btnBoLuot.setVisible(false);
                                }

                                for(var i=0;i<TienLen.MAX_PLAYER;i++)
                                {
                                    if(TienLen.gameLogic.players[i].ingame) {
                                        if(TienLen.gameLogic.players[i].info["baosam"]){
                                            var localChair = i;
                                           // this.playerDisplayList[localChair].uiBaosam.setTexture(cc.textureCache.addImage(TienLen.res.iconBaoSamPng));
                                            GuiUtil.changeSprite(this.playerDisplayList[localChair].uiBaosam,TienLen.res.iconBaoSamPng);
                                            this.playerDisplayList[localChair].uiBaosam.setVisible(true);
                                            this.playerDisplayList[localChair].uiBaosam.stopAllActions();
                                            this.playerDisplayList[localChair].uiBaosam.setScale(1);
                                        }
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

            case TienLen.GameState.USERJOIN:{
                this.playerDisplayList[TienLen.gameLogic.activeLocalChair].clearFirstTime();
                this.playerDisplayList[TienLen.gameLogic.activeLocalChair].updateWithPlayer(TienLen.gameLogic.players[TienLen.gameLogic.activeLocalChair]);
                //this.playerDisplayList[TienLen.gameLogic.activeLocalChair].addVipEffect();
                if(TienLen.gameLogic.players[TienLen.gameLogic.activeLocalChair].status != 1){
                    //this.updateStartButton();
                }
                break;
            }
            case TienLen.GameState.USERLEAVE:{
                if(TienLen.gameLogic.players[TienLen.gameLogic.activeLocalChair].status != 1)
                {
                    //this.updateStartButton();
                }
                this.playerDisplayList[TienLen.gameLogic.activeLocalChair].updateWithPlayer(TienLen.gameLogic.players[TienLen.gameLogic.activeLocalChair]);
                if(TienLen.gameLogic.activeLocalChair == 0){
                    userGameData.setItem("inRoom", "false");
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }
                break;
            }
            case TienLen.GameState.AUTOSTART:
            {
                if(data && (data.isAutoStart) && (TienLen.gameLogic.timeAutoStart > 0))
                    this.addAutoStart(TienLen.gameLogic.timeAutoStart);
                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }
                this.removeEndGameLayer();

                TienLen.gameLogic.gameState = TienLen.GameState.NONE;
            }
                break;
            case TienLen.GameState.FIRSTTURN:{
                this.stopAutoStart();

                if(data.isRandom)
                {
                    for(var i=0;i<TienLen.MAX_PLAYER;i++)
                    {
                        var id = TienLen.gameLogic.firstTurnCards[i];


                        if(TienLen.gameLogic.players[i].ingame && (TienLen.gameLogic.players[i].status != 1))
                        {
                            this.playerDisplayList[i].firstTurn(id).setVisible(true);
                            this.effect2D.firstTurn(this.playerDisplayList[i]);

                        }
                    }
                }

                this.bg3.getChildByName("text").setVisible(true);
                this.bg3.getChildByName("text").setString(TienLen.gameLogic.players[TienLen.gameLogic.convertChair(data.chair)].info.nickName +" được đi lượt đầu tiên !");
                this.bg3.setVisible(true);
                this.bg3.setOpacity(0);
                this.bg3.runAction(cc.sequence(cc.fadeIn(.5),cc.delayTime(1),cc.fadeOut(.5),cc.hide()));
            }
                break;

            case TienLen.GameState.CHIABAI:{
                this.chiaBai(data);
            }
                break;

            case TienLen.GameState.CHANGETURN:{
                var i = 0;
                var activeChair = TienLen.gameLogic.activeLocalChair;
                this.effect2D.clearWait4DoiThong();
                for(i = 0; i < TienLen.MAX_PLAYER; i++){
                    this.playerDisplayList[i].stopEffectTime();
                }

                this.newRound = data.newRound;
                cc.log("Change turn id new Round" + data.newRound);

                if(data.newRound){
                    this.needWaitDoiThong = false;
                    this.effect2D.clearRecentCards();
                }

                this.removeEndGameLayer();

                for(var i=0;i<TienLen.MAX_PLAYER;i++)
                {
                    this.playerDisplayList[i].clearBoluot();
                }

                this.handCardToNormal();
                this.playerDisplayList[activeChair].addEffectTime(data.time);

                if (TienLen.gameLogic.activeLocalChair == 0) {
                    this.btnDanh.setVisible(true);
                   this.btnDanh.isWaitBonDoi = false;

                   this.btnBoLuot.setVisible(true);
                    if (data.newRound) {
                        this.btnBoLuot.setVisible(false);
                    }
                    //this.kiemTraBonDoiThongUp();
                    this.kiemtraBoluot();
                    this.kiemTraAnhSang();
                    this.kiemTraDanhBai();
                }
                else {
                    this.handCardToNormal();
                   this.btnDanh.setVisible(false);
                   this.btnBoLuot.setVisible(false);

                    if(this.needWaitDoiThong && this.kiemTraBonDoiThongChatDuoc2() && TienLen.gameLogic.chairLastTurn != 0){
                        this.effect2D.addEffectHas4DoiThongChatDuoc();
                        this.btnDanh.setVisible(true);
                        this.btnDanh.cothedanh = true;
                        //var arrow = ccui.Helper.seekWidgetByName(this.btnDanh, "arrow");
                        //arrow.setVisible(true);
                        //arrow.setPosition(this.btnDanh.arrowPos);
                        //arrow.runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(0, 15)), new cc.MoveBy(0.2, cc.p(0, -15))).repeatForever());
                    }
                }

                TienLen.gameLogic._gameState = TienLen.GameState.NONE;
                break;
            }
                break;

            case TienLen.GameState.WAITBONDOITHONG:{
                var i = 0;
                for(i = 0; i < TienLen.MAX_PLAYER; i++){
                    this.playerDisplayList[i].stopEffectTime();
                }

                for(var i=0;i<TienLen.MAX_PLAYER;i++)
                {
                    this.playerDisplayList[i].clearBoluot();
                }

                this.effect2D.addEffectWait4DoiThong();
                this.handCardToNormal();

                if(TienLen.gameLogic.chairLastTurn == 0){
                    cc.log("TienLen.gameLogic.chairLastTurn:" + TienLen.gameLogic.chairLastTurn);
                    TienLen.gameLogic._gameState = TienLen.GameState.NONE;
                    break;
                }

                if (this.kiemTraBonDoiThongChatDuoc1()) {
                    this.btnDanh.isWaitBonDoi = true;
                   this.btnDanh.setVisible(true);
                  this.btnBoLuot.setVisible(false);
                    this.kiemTraDanhBai();
                }
                else {
                  this.btnDanh.setVisible(false);
                   this.btnBoLuot.setVisible(false);
                }

                TienLen.gameLogic._gameState = TienLen.GameState.NONE;
                break;
            }

            case TienLen.GameState.DANHBAI:{
                if(!data) {
                    return;
                }
                cc.log("update GUI danh bai");

                this.effect2D.clearWait4DoiThong();
                if(TienLen.gameLogic.activeLocalChair != 0){
                    this.playerDisplayList[TienLen.gameLogic.activeLocalChair].card.setVisible(true);
                    this.playerDisplayList[TienLen.gameLogic.activeLocalChair].numCard.setString("" + data.numberCard);
                    if(data.numberCard == 0){
                        this.playerDisplayList[TienLen.gameLogic.activeLocalChair].card.setVisible(false);
                    }

                    this.playerDisplayList[TienLen.gameLogic.activeLocalChair].stopEffectTime();
                }


                var cards = [];
                for(var i=0;i < TienLen.gameLogic.cardDanhBai.length;i++)
                {
                    cards.push(new TienLen.Card(TienLen.gameLogic.cardDanhBai[i]));
                }

                this.needWaitDoiThong = false;


                this.effect2D.clearRecentCards();
                this.effect2D.danhBai(this.playerDisplayList[TienLen.gameLogic.activeLocalChair].danhBai(TienLen.gameLogic.cardDanhBai));

                var groupCardDanh = new TienLen.CardGroup(cards);
                {
                    //this.effect2D.addEffectBaDoiThong();
                    if(groupCardDanh.typeGroup ==TienLen.CardGroup.TYPEMOTLA && groupCardDanh.cards[0].so == TienLen.Card.kQuanbai2){
                        cc.log("Hai ne");
                        this.effect2D.addEffectHaiNe();
                        this.needWaitDoiThong = true;
                    }

                    if(groupCardDanh.typeGroup == TienLen.CardGroup.TYPEDOI && groupCardDanh.cards[0].so == TienLen.Card.kQuanbai2){
                        cc.log(" doi Hai");
                        this.effect2D.addEffectDoiHai();
                        this.needWaitDoiThong = true;
                    }

                    if(groupCardDanh.typeGroup == TienLen.CardGroup.TYPEBALA && groupCardDanh.cards[0].so == TienLen.Card.kQuanbai2){
                        cc.log(" ba Hai ne");
                        this.effect2D.addEffectBaHai();
                        this.needWaitDoiThong = false;
                    }

                    if(groupCardDanh.typeGroup == TienLen.CardGroup.BADOITHONG){
                        cc.log("ba doi ne");
                        this.effect2D.addEffectBaDoiThong();
                        this.needWaitDoiThong = true;
                    }

                    if(groupCardDanh.typeGroup == TienLen.CardGroup.TYPETUQUY){
                        cc.log("tu Quy ne");
                        this.effect2D.addEffectTuQuy();
                        this.needWaitDoiThong = true;
                    }

                    if(groupCardDanh.typeGroup == TienLen.CardGroup.BONDOITHONG){
                        cc.log("Bon Doi thong");
                        this.effect2D.addEffectBonDoiThong();
                        this.needWaitDoiThong = true;
                    }
                }

                TienLen.gameLogic.recentCards = TienLen.gameLogic.cardDanhBai;

            }
                break;

            case TienLen.GameState.BOLUOT:
            {
                if(data)
                {
                    this.playerDisplayList[TienLen.gameLogic.convertChair(data.chair)].boluot();

                }
            }
                break;
            case TienLen.GameState.NOTIFYOUTROOM:
            {
                this.playerDisplayList[TienLen.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if(TienLen.gameLogic.convertChair(data.outChair) == 0){
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
            case TienLen.GameState.JACKPOT:
            {
                var local = TienLen.gameLogic.convertChair(data.uChair);
                if(local == 0)
                {
                    //this.effect2D.jackpot();
                }
                break;
            }
            case TienLen.GameState.ENDGAME:
            {
                if(!data)
                    return;

                this.btnXepBai.setVisible(false);

                cc.log("this.playerDisplayList[0].handOnCards.length: " + this.playerDisplayList[0].handOnCards.length);
                //this.playerDisplayList[0].clearHandOncard();

                for(var i=0;i<TienLen.MAX_PLAYER;i++)
                {
                    this.playerDisplayList[i].stopEffectTime();
                    //this.playerDisplayList[i].removeBao1();
                    this.playerDisplayList[i].clearBoluot();
                    this.playerDisplayList[i].uiBaosam.stopAllActions();
                    this.playerDisplayList[i].uiBaosam.setScale(1);
                    this.playerDisplayList[i].uiBaosam.setVisible(false);
                }

                this.effect2D.ccRemove = function(sender){
                    sender.clearRecentCards();
                }

                this.effect2D.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(this.effect2D.ccRemove.bind(this.effect2D), this.effect2D)));


                var localToiTrang = -1;
                var winToiTrang = -1;
                for(var i=0; i<TienLen.MAX_PLAYER; i++){
                    var local = TienLen.gameLogic.convertChair(i);

                    if(TienLen.gameLogic.players[local].ingame){
                        cc.log(data.winTypes[i]);

                        if(data.winTypes[i] >=4 && data.winTypes[i] <=9){
                            winToiTrang = data.winTypes[i];
                            localToiTrang = local;
                            break;
                        }
                    }
                }

                if(winToiTrang != -1){
                    if(localToiTrang == 0) {
                        this.effect2D.toitrang(data.winTypes[i] - 4, this.playerDisplayList[0].handOnCards);
                        for(var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++){
                            this.playerDisplayList[0].handOnCards[i].removeFromParent(true);
                        }
                        this.playerDisplayList[0].handOnCards = [];
                    }
                    else
                        this.effect2D.toitrang(data.winTypes[i] - 4, this.playerDisplayList[0].handOnCards, this.playerDisplayList[local].card, data.cards[i]);
                }

                for(var i=0; i<TienLen.MAX_PLAYER; i++)
                {
                    var local = TienLen.gameLogic.convertChair(i);
                    if(TienLen.gameLogic.players[local].ingame){
                        cc.log(data.winTypes[i]);

                        switch (data.winTypes[i]) {
                            case 2:
                            case 3:     // Thang binh thuong
                            {
                                this.playerDisplayList[local].addThang(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i], 1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i], 2);
                                break;
                            }

                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            {
                                this.playerDisplayList[local].addThang(4);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],3);
                                break;
                            }

                            case 11:     // Thua binh thuong
                            {
                                this.playerDisplayList[local].addThua(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 12:        // Thua treo
                            {
                                this.playerDisplayList[local].addThua(1);
                                this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }
                            case 13:        // Thua toi trang
                            {
                                this.playerDisplayList[local].addThua(4);
                                //this.playerDisplayList[local].addBaiEndGame(data.cards[i],1.5);
                                this.playerDisplayList[local].addMoney(data.ketQuaTinhTienList[i],2);
                                //if(local == 0)
                                //    gameSound.playThua();
                                break;
                            }

                        }

                    }
                }
                this.runAction(cc.sequence(cc.delayTime(data.countDown - 7),cc.callFunc(this.addEndGameLayer.bind(this),this, data)));
               this.btnXepBai.setVisible(false);
               this.btnBoLuot.setVisible(false);
               this.btnDanh.setVisible(false);
                TienLen.gameLogic.gameState = TienLen.GameState.NONE;
                break;
            }
            case TienLen.GameState.CHATCHONG:
            {
                var local = TienLen.gameLogic.convertChair(data.winChair);
                this.playerDisplayList[local].addMoney(data.winMoney,1.5);
                local = TienLen.gameLogic.convertChair(data.lostChair);
                this.playerDisplayList[local].addMoney(data.lostMoney,1);
                break;
            }

            case TienLen.GameState.UPDATEMATH:
            {
                this.playerDisplayList[0].clearHandOncard();
                //this.playerDisplayList[0].moveCard.setVisible(false);
                for(var i=1;i<TienLen.MAX_PLAYER;i++) {
                    this.playerDisplayList[i].clearBaiEndGame();
                    this.playerDisplayList[i].card.setVisible(false);
                }

                for(var i=0;i<TienLen.MAX_PLAYER;i++)
                {
                    this.playerDisplayList[i].clearThangThua();
                    //this.playerDisplayList[i].removeBao1();
                }

                this.effect2D.removeAllChildren(true);
                this.effect2D.effects = [];

                this.removeEndGameLayer();

                //this.updateStartButton();
                break;

            }

            case  TienLen.GameState.NONE:
            {
                break;
            }
        }

    },


    chiaBai:function(data){
        //Qua trinh tao dealer
        var i;

        this.btnXepBai.setVisible(true);
        for(i = 0; i < TienLen.MAX_PLAYER; i++){
            this.playerDisplayList[i].clearBai();
        }

        for(i=1; i< TienLen.MAX_PLAYER;i++)
        {
            if(TienLen.gameLogic.players[i].ingame && (TienLen.gameLogic.players[i].status > 1))
            {
                //this.playerDisplayList[i].removeBao1();
                this.playerDisplayList[i].cardFirstTurn.setVisible(false);
                this.playerDisplayList[i].numCard.setString("0");
            }
        }
        var gameId = this.gameId;
        gameId.setString("# "+ TienLen.gameLogic.gameId);

        this.playerDisplayList[0].cardFirstTurn.setVisible(false);
        this.playerDisplayList[0].initWithCards(TienLen.gameLogic.cardChiabai);

        var countNum = 0;
        for(i = 0; i < TienLen.MAX_PLAYER; i++){
            if(TienLen.gameLogic.players[i].ingame && (TienLen.gameLogic.players[i].status > 1)) {
                countNum++;
            }
        }
        var stt = -1;
        for(i = 0; i < TienLen.MAX_PLAYER; i++){
            if(TienLen.gameLogic.players[i].ingame && (TienLen.gameLogic.players[i].status > 1)) {
                stt++;
                this.effect2D.chiaBai(this.playerDisplayList[i], countNum, stt);
            }
        }

        this.callbackAddBaoSam = function(sender,typeToiTrang){
            this.btnXepBai.setVisible(true);
            //this.playerDisplayList[0].enableTouch(true);
            this.addBaoSamLayer(TienLen.gameLogic.timeBaoSam - 2, typeToiTrang);

            for(var i=0;i<TienLen.MAX_PLAYER;i++)
            {
                if(TienLen.gameLogic.players[i].ingame && (TienLen.gameLogic.players[i].status != 1)) {
                    this.playerDisplayList[i].stopEffectTime();
                    this.playerDisplayList[i].addEffectTime(TienLen.gameLogic.timeBaoSam - 1.75);
                }
            }

        }

        //if(data)
        //    this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.callbackAddBaoSam.bind(this), this, data.toiTrang)));
        //Qua trinh Bai chuyen ve
    },

    sapxep: function(){
        this.effect2D.sapXep(this.playerDisplayList[0]);
    },

    refreshResize: function(){
        for(var i = 0; i < 5; i++){
            this.playerDisplayList[i].refreshResize();
        }
    },

    addAutoStart: function(time) {
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var after, donviS, chucS;
        if(after = this.getChildByTag(0 + TienLen.GameScene.aftertag)){
            after.removeFromParent();
        }

        if(chucS = this.getChildByTag(0 + TienLen.GameScene.chuctag)){
            chucS.removeFromParent();
        }

        if(donviS = this.getChildByTag(0 + TienLen.GameScene.donvitag)){
            donviS.removeFromParent();
        }

        after = GuiUtil.createSprite(TienLen.res.afterPng);
        after.setTag(TienLen.GameScene.aftertag);
        var timeRemain = time;
        after.setPosition(cc.p(winSize.width*0.5, winSize.height*0.5 + 50));
        var pos = after.getPosition();
        this.addChild(after);

        var chuc = Math.floor(time/10);
        var donVi = time % 10;

        chucS = GuiUtil.createSprite(this.getImgStartNum(chuc));
        chucS.setTag(TienLen.GameScene.chuctag);

        var donViS = GuiUtil.createSprite(this.getImgStartNum(donVi));
        donViS.setTag(TienLen.GameScene.donvitag);

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

           // chucS.setTexture(this.getImgStartNum(chuc));
            GuiUtil.changeSprite(chucS,this.getImgStartNum(chuc));
            GuiUtil.changeSprite(donViS,this.getImgStartNum(donVi));
           // donViS.setTexture(this.getImgStartNum(donVi));
        }

        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackStartAuto.bind(this), this));
        after.runAction(cc.repeatForever(action));
    },

    stopAutoStart: function(){
        var after, chuc, donVi;
        if( after = this.getChildByTag(parseInt(TienLen.GameScene.aftertag))){
            after.stopAllActions();
            after.removeFromParent();
        }

        if(chuc = this.getChildByTag(parseInt(TienLen.GameScene.chuctag))){
            chuc.removeFromParent();
        }

        if(donVi = this.getChildByTag(parseInt(TienLen.GameScene.donvitag))){
            donVi.removeFromParent();
        }
    },

    getImgStartNum: function(num){
        return TienLen.res.startNumPngPath + num + ".png";
    },

    kiemtraBoluot: function()
    {
        if(this.btnBoLuot.isVisible())      // Truong hop danh trong round
        {
            // Kiem tra xem co phai bo luot khong
            var cardsA = [];
            for (var i = 0; i < TienLen.gameLogic.recentCards.length; i++) {
                cardsA.push(new TienLen.Card(TienLen.gameLogic.recentCards[i]));
            }

            var cardsB = [];
            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                cardsB.push(new TienLen.Card(this.playerDisplayList[0].handOnCards[i].id));
            }

            var groupA = new TienLen.CardGroup(cardsA);
            var groupB = new TienLen.CardGroup(cardsB);

            var cothedanh = TienLen.GameHelper.kiemTraChatDuocKhong(groupA, cardsB);
            cc.log("cothe danh :  " + cothedanh);


            var btn = this.btnBoLuot;
            btn.getChildByName("arrow").stopAllActions();
            btn.getChildByName("arrow").setPosition(this.btnBoLuot.arrowPos);
            btn.getChildByName("arrow").setVisible(false);

            if (!cothedanh) {
                btn.getChildByName("arrow").setVisible(true);
                btn.getChildByName("arrow").stopAllActions();
                btn.getChildByName("arrow").setPosition(this.btnBoLuot.arrowPos);
                btn.getChildByName("arrow").runAction(cc.sequence(cc.moveBy(.2, cc.p(0, 15)), cc.moveBy(.2, cc.p(0, -15))).repeatForever());
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
            for (var i = 0; i < TienLen.gameLogic.recentCards.length; i++) {
                cardIn.push(TienLen.gameLogic.recentCards[i]);
            }
            if(cardIn.length ==0){
                return;
            }

            var cardHand = [];
            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                cardHand.push(this.playerDisplayList[0].handOnCards[i].id);
            }
            var black = TienLen.GameHelper.findBlackCard(cardIn, cardHand);

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

    kiemTraBonDoiThongChatDuoc1: function(){
        var i;
        var cardsB = [];
        var aGroup;
        var recentCards = [];
        for(i = 0; i< TienLen.gameLogic.recentCards.length; i++) {
            recentCards.push(new TienLen.Card(TienLen.gameLogic.recentCards[i]));
        }

        aGroup = new TienLen.CardGroup(recentCards);

        var myPlayerDisplay = this.playerDisplayList[0];
        for (i = 0; i < myPlayerDisplay.handOnCards.length; i++){
            cardsB.push(new TienLen.Card(myPlayerDisplay.handOnCards[i].id));
        }

        var res;
        if(aGroup.typeGroup == TienLen.CardGroup.BONDOITHONG){
            res = TienLen.GameHelper.timBonDoiThongChatDuoc(recentCards, cardsB);
        }
        else {
            res = TienLen.GameHelper.timBonDoiThong(cardsB);
        }

        if(res.length == 8){
            for (var j = 0; j < res.length; j++) {
                for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                    if (this.playerDisplayList[0].handOnCards[i].id == res[j].id) {
                        this.playerDisplayList[0].handOnCards[i].up();
                    }
                }
            }
            return true;
        }
        else {
            return false;
        }
    },

    kiemTraBonDoiThongChatDuoc2: function(){
        var i;
        var cardsB = [];
        var aGroup;
        var recentCards = [];
        for(i = 0; i< TienLen.gameLogic.recentCards.length; i++) {
            recentCards.push(new TienLen.Card(TienLen.gameLogic.recentCards[i]));
        }

        aGroup = new TienLen.CardGroup(recentCards);

        var myPlayerDisplay = this.playerDisplayList[0];
        for (i = 0; i < myPlayerDisplay.handOnCards.length; i++){
            cardsB.push(new TienLen.Card(myPlayerDisplay.handOnCards[i].id));
        }

        var res;
        if(aGroup.typeGroup == TienLen.CardGroup.BONDOITHONG){
            res = TienLen.GameHelper.timBonDoiThongChatDuoc(recentCards, cardsB);
        }
        else {
            res = TienLen.GameHelper.timBonDoiThong(cardsB);
        }

        if(res.length == 8){
            return true;
        }
        else {
            return false;
        }
    },

    kiemTraDanhBai: function(up){
        var i;
        var cardUp = [];
        var cardDown = [];
        var cardHandon = [];
        var aGroup = [];
        var bGroup;

        var myPlayerDisplay = this.playerDisplayList[0];
        for (i = 0; i < myPlayerDisplay.handOnCards.length; i++){
            cardHandon.push(myPlayerDisplay.handOnCards[i].id);
            if(myPlayerDisplay.handOnCards[i].isUp){
                cardUp.push(new TienLen.Card(myPlayerDisplay.handOnCards[i].id));
            }
            else{
                cardDown.push(new TienLen.Card(myPlayerDisplay.handOnCards[i].id));
            }
        }
        bGroup = new TienLen.CardGroup(cardUp);

        if(this.btnDanh.isWaitBonDoi){
            var recentCards = [];
            for(i = 0; i< TienLen.gameLogic.recentCards.length; i++){
                recentCards.push(new TienLen.Card(TienLen.gameLogic.recentCards[i]));
            }

            if(bGroup.typeGroup == TienLen.CardGroup.BONDOITHONG){
                this.myCheckDanh(cardUp, recentCards);
            }else{
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
            }
        }

        // truong hop danh trong vong;

        if(TienLen.gameLogic.newRound != true){
            var recentCards = [];
            var checkRecentCard = [];
            for(i = 0; i< TienLen.gameLogic.recentCards.length; i++){
                recentCards.push(new TienLen.Card(TienLen.gameLogic.recentCards[i]));
                checkRecentCard.push(TienLen.gameLogic.recentCards[i]);
            }

            aGroup = new TienLen.CardGroup(recentCards);

            if(TienLen.gameLogic.gameState == TienLen.GameState.WAITBONDOITHONG){
                TienLen.GameHelper.kiemtraChatQuan(aGroup, bGroup)
                if(bGroup.typeGroup != TienLen.CardGroup.BONDOITHONG){
                    this.btnDanh.cothedanh = false;
                    var arrow = this.btnDanh.getChildByName("arrow");
                    arrow.stopAllActions();
                    arrow.setVisible(false);
                    arrow.setPosition(this.btnDanh.arrowPos);
                }
            }

            if(TienLen.GameHelper.kiemtraChatQuan(aGroup, bGroup)){
                this.myCheckDanh(cardUp, recentCards);
            }
            else{
                if(cardUp.length == 1 && up){
                    var select = new TienLen.Card(cardUp[0].id);

                    var recommendedCards = TienLen.GameHelper.recommend(checkRecentCard, cardHandon, select);
                    // khong tim thay bai hop ly
                    if(recommendedCards.length <= 1){
                        this.myCheckDanh(cardUp, recentCards);
                    }
                    else{

                        for (var j = 0; j < recommendedCards.length; j++) {
                            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                                if (this.playerDisplayList[0].handOnCards[i].id == recommendedCards[j].id) {
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
            bGroup = new TienLen.CardGroup(cardUp);
            if(TienLen.GameHelper.kiemtraDanh(cardUp)){
                //khong can phai recommend;
                this.myCheckDanh(cardUp);
            }
            else{
                if(up){
                    var recommendedCards = TienLen.GameHelper.recommend2(cardHandon, cardUp);
                    // khong tim thay bai hop ly
                    if(recommendedCards.length <= cardUp.length){
                        this.myCheckDanh(cardUp);
                    }
                    else{
                        for (var j = 0; j < recommendedCards.length; j++) {
                            for (var i = 0; i < this.playerDisplayList[0].handOnCards.length; i++) {
                                if (this.playerDisplayList[0].handOnCards[i].id == recommendedCards[j].id) {
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

    },

    myCheckDanh: function(danhCard, inCard){
        var aCards = [];
        var bCards = [];
        var aGroup = null;
        var bGroup = null;
        // kiem tra chat quan
        if(inCard){

            for(i = 0; i < inCard.length; i++){
                aCards.push(new TienLen.Card(inCard[i].id));
            }

            for(i = 0; i < danhCard.length; i++){
                bCards.push(new TienLen.Card(danhCard[i].id));
            }
            aGroup = new TienLen.CardGroup(aCards);
            bGroup = new TienLen.CardGroup(bCards);

            if(danhCard.length == 0){
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
                return;
            }

            if(TienLen.GameHelper.kiemtraChatQuan(aGroup, bGroup)){
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
                bCards.push(new TienLen.Card(danhCard[i].id));
            }
            var bGroup = new TienLen.CardGroup(bCards);
            if(danhCard.length == 0){
                this.btnDanh.cothedanh = false;
                var arrow = this.btnDanh.getChildByName("arrow");
                arrow.stopAllActions();
                arrow.setVisible(false);
                arrow.setPosition(this.btnDanh.arrowPos);
                return;
            }

            if(TienLen.GameHelper.kiemtraDanh(bCards)){
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

    addEndGameLayer: function(sender,data) {
        this.removeEndGameLayer();
        cc.log("addEndGameLayer 12");
        var layer =  gameScenePool.getTienLenEndGameScene(data);
        this.addChild(layer);
        layer.setTag(TienLen.GameScene.layerEndGameTag);
        layer.setLocalZOrder(25);
    },

    removeEndGameLayer: function(){
        var layer = this.getChildByTag(parseInt(TienLen.GameScene.layerEndGameTag));
        if(layer){
            layer.removeFromParent();
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

        var localChair = TienLen.gameLogic.convertChair(globalChair);
        var player = this.playerDisplayList[localChair];
        var pos = player.uiAvatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effect2D.updateChatRoom(localChair,pos,  image);
    },

});

TienLen.GameScene.btnavatarstarttag = 12;
TienLen.GameScene.aftertag = 9100;
TienLen.GameScene.donvitag = 9101;
TienLen.GameScene.chuctag = 9102;
TienLen.GameScene.layerEndGameTag = 9112;

TienLen.GameScene.BTNDANH = 9000;
TienLen.GameScene.BTNBOLUOT = 9001;
TienLen.GameScene.BTNXEPBAI = 9002;
TienLen.GameScene.BTNSTART = 9003;
TienLen.GameScene.BTNBACK = 9006;
TienLen.GameScene.BTNINFO = 9008;
TienLen.GameScene.BTNCASH = 9009;
TienLen.GameScene.BTNCHAT = 9010;
TienLen.GameScene.BTNAVATAR0 = 9011;
TienLen.GameScene.BTNAVATAR1 = 9012;
TienLen.GameScene.BTNAVATAR2 = 9013;
TienLen.GameScene.BTNAVATAR3 = 9014;
TienLen.GameScene.BTNAVATAR4 = 9015;
TienLen.GameScene.BTNTOITRANG = 9016;
TienLen.GameScene.BTN_MOI_CHOI = 9017;

TienLen.LayerEndGame = BaseLayer.extend({

    ctor: function(data)
    {
        this._super("SamEndGame");
        //this.initWithBinaryFile("res/g_res_cardGame_json_SamEndGame.json");
        this.data = data;
    },

    setData: function(data){
        this.data = data;
    },

    customizeGUI: function()
    {
        //var bg = ccui.Helper.seekWidgetByName(this._layout,"bg");

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


        //this.show();
        this.setFog(true);

    },


    onEnter: function(){
        this._super();
       // var bg = ccui.Helper.seekWidgetByName(this._layout,"bg");
       // if(this.bg) {
       //    // this.addSprite(this, "bg", cc.p(640, 360), res_CardGame_CommonResource_BanChoi + "/24-7-2016_0013_Shape-270.png");
       // }
        this.panels = [];
        var starPositionX = 431;
        var starPositionY = 457;
        for(var i=0;i<5;i++)
        {
            //this.panels.push(ccui.Helper.seekWidgetByName(bg,"panel_" + i));
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
        var count = 1;
      //  var bg = ccui.Helper.seekWidgetByName(this._layout,"bg");
        this.bg.setScale(0.75);
        this.bg.setOpacity(0);
        this.bg.runAction(cc.spawn(new cc.EaseBackOut(cc.scaleTo(.3,1)),cc.fadeIn(.3)));

        for(var i=0;i< TienLen.MAX_CARDS && i < this.data.winTypes.length;i++)
        {
            cc.log("winTypes: " + i + " " +  this.data.winTypes[i]);
            if(this.data.winTypes[i] <= 1){
                continue;
            }
            switch (this.data.winTypes[i]) {
                //cc.log("haha");
                case 2:
                case 3:
                case 4:
                case 6:
                case 7:
                case 8:
                case 9:
                {
                    cc.log("show 1");
                    this.panels[0].setVisible(true);
                    var local = TienLen.gameLogic.convertChair(i);
                    this.addKQchoPanel(this.panels[0], this.data.winTypes[i],this.data.cards[i], TienLen.gameLogic.players[local].info,this.data.ketQuaTinhTienList[i]);
                    this.panels[0].getChildByName("vien").runAction(cc.sequence(cc.fadeTo(0.5,50),cc.fadeTo(.5,255)).repeatForever());
                    cc.log("show 2");
                    break;
                }
                default :
                {
                    cc.log("show 3");
                    this.panels[count].setVisible(true);
                    var local = TienLen.gameLogic.convertChair(i);
                    this.addKQchoPanel(this.panels[count],this.data.winTypes[i],this.data.cards[i], TienLen.gameLogic.players[local].info, this.data.ketQuaTinhTienList[i]);
                    count++;
                    cc.log("show 4");
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
            case 2:
            case 3:
                path = TienLen.res.kqThangPng;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            {
                path = TienLen.res.kqThangPng;
                break;
            }
            case 11:
            {
                path = TienLen.res.kqThuaPng;
                break;
            }
            case 12:
            {
                path = TienLen.res.kqThuaPng;
                break;
            }
            case 13:
            {
                path = TienLen.res.kqThuaPng;
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
            panel.getChildByName("gold").setColor({r: 255, g: 255, b: 255});
        }
        else{
            panel.getChildByName("gold").setColor({r: 255, g: 255, b: 0});
        }
        panel.getChildByName("kq").setVisible(false);

        cc.log("addKetQua 1");
        var pathTexture = this.textureForWin(winType);
        cc.log("addKetQua 2");

        switch (winType)
        {
            case 2:     // Thang binh thuong
            case 3:     // Thang bao sam
            case 4:     // Thang chan sam
            case 6:     // Thang sam dinh
            case 7:     // Thang 4 heo
            case 8:     // Thang 5 doi
            case 9:     // Thang dong` mau`
            {
                cc.log("addKetQua 31");
                var deltaX = 0;
                for (var j = 0; j < cards.length; j++) {
                    var tl = new TienLen.CardSprite(cards[j]);
                    node.addChild(tl);
                    tl.setPositionX(deltaX);
                    tl.setPositionY(tl.getContentSize().height*0.35*0.43);
                    tl.setScale(.35);
                    deltaX += 25;
                }

                if(winType == 3 || winType == 4|| winType == 5 || winType == 6 || winType == 7 || winType == 8 || winType == 9){
                    var nen = GuiUtil.createSprite(TienLen.res.kqNenThangPng);
                    nen.setScale(1.3);
                    nen.setAnchorPoint(cc.p(0.5,0.5));
                    nen.setPosition(node.getPositionX() + nen.getContentSize().width/2*1.3, node.getPositionY() + nen.getContentSize().height/2);
                    panel.nen = nen;
                    panel.addChild(nen);

                    var label = new ccui.Text();
                    panel.label = label;
                    label.setAnchorPoint(cc.p(0.5,0.5));
                    label.setFontName("res/Font/arial.ttf");
                    label.setFontSize(28);
                    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    label.setColor(cc.color.WHITE);
                   // label.setPosition(nen.getPositionX() + nen.getContentSize().width/2*1.3 - label.getContentSize().width/2,
                    //                  nen.getPositionY() + nen.getContentSize().height/2*1.3 - label.getContentSize().height/2);
                    label.setPosition(nen.getPositionX(), nen.getPositionY());

                    panel.addChild(label);



                    if(winType == 3){
                        label.setString("Thắng bắt treo");
                    }else {
                        label.setString("Tới trắng");
                    }
                }

                break;
            }

            case 11:
            case 12:
            case 13:
            {
                cc.log("addKetQua 32");
                node = panel.getChildByName("node");
                var deltaX = 0;
                for (var j = 0; j < cards.length; j++) {
                    var sam = new TienLen.CardSprite(cards[j]);
                    node.addChild(sam);
                    sam.setPositionX(deltaX);
                    sam.setPositionY(sam.getContentSize().height*0.35*0.43);
                    sam.setScale(.35);
                    deltaX += 25;
                }

                //texture.setPositionX(deltaX + 25);

                if(winType == 12 || winType ==13)
                {
                    var nen = GuiUtil.createSprite(TienLen.res.kqNenThuaPng);
                    nen.setScale(1.25);
                    nen.setAnchorPoint(cc.p(0.5,0.5));
                    nen.setPosition(node.getPositionX() + nen.getContentSize().width/2*1.25, node.getPositionY() + nen.getContentSize().height/2);
                    panel.addChild(nen);
                    panel.nen = nen;
                    var label = new ccui.Text();
                    panel.label = label;
                    label.setAnchorPoint(cc.p(0.5,0.5));
                    label.setFontName("res/Font/arial.ttf");
                    label.setFontSize(28);
                    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                    label.setColor(cc.color.WHITE);
                    label.setString("Cóng");
                    if(winType == 13){
                        label.setString("Thua tới trắng");
                    }
                    label.setPosition(nen.getPositionX(), nen.getPositionY());
                    panel.addChild(label);
                }


                else if(winType == 11)
                {
                    if(TienLen.GameHelper.kiemtraThoiTuQuy(cards))
                    {
                        var tuquy = GuiUtil.createSprite(TienLen.res.kqThoiTuQuy);
                        tuquy.setScale(0.7);
                        tuquy.setPositionY(tuquy.getContentSize().height*0.33);
                        panel.getChildByName("kq").addChild(tuquy);
                        panel.getChildByName("kq").setVisible(true);
                        panel.heo = tuquy;
                    }
                    else if(TienLen.GameHelper.kiemtraThoiHeo(cards)) {
                        var heo = GuiUtil.createSprite(TienLen.res.kqThoiHeo);
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


        if(pathTexture != ""){
            var texture = GuiUtil.createSprite(pathTexture);
        }

        if(texture){
            panel.texture = texture;
            panel.getChildByName("node").addChild(texture);
            panel.getChildByName("node").setVisible(true);
            texture.setPositionX(panel.getContentSize().width*0.4);
            texture.setPositionY(panel.getContentSize().height*0.3);
        }
    },




    onButtonRelease: function(btn,id){
        switch (id)
        {
            case 1:
            {
                cc.log("button Xac nhat");
                this._layerColor.runAction(cc.fadeTo(.2,0));
                //var bg = ccui.Helper.seekWidgetByName(this._layout,"bg");
                this.bg.setScale(1);
                this.bg.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(.2,1.2)),cc.fadeOut(.2)));
                this.runAction(cc.sequence(cc.delayTime(.2),cc.removeSelf()));
                break;
            }
        }
    }
})



