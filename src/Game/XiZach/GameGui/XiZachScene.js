//



XiZach.XiZachScene = BaseLayer.extend({
    ctor: function () {
        cc.log("XiZach + XiZachScene ctor 0");
        this._super();
        this.playerList = [];
        cc.log("XiZach + XiZachScene ctor  00 ");
        this.chatLayer = null;
        this.effectLayer = new XiZach.EffectLayer();
        cc.log("XiZach + XiZachScene ctor 000");
        this.effectLayer.gameScene = this;
        this.addChild(this.effectLayer);

        this.effectLayer.setLocalZOrder(10);
        this.registerCheckFold = false;
        this.registerFollowAll = false;
        this.minValue = 0;
        this.guiMoiChoi = null;

        cc.log("XiZach + XiZachScene ctor 1");
       // this.initWithBinaryFile("res/g_res_cardGame_json_XiZachScene.json");
        cc.log("XiZach + XiZachScene ctor 2");
        this.customizeGUI2();
        cc.log("XiZach + XiZachScene ctor 3");
    },

    customizeGUI2: function(){
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        var i;
        var btn;
        cc.log("XiZach + customizeGui ctor 1");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/backjack/PlistBackJack.plist","res/CardGame/backjack/PlistBackJack.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        var size = GameScene.getMainContentSize();
        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width/2, size.height / 2);
        touchBtn.setOpacity(0);

        this.addSprite(this,"bgPoker",cc.p(640,360),res_CardGame_Poker + "/bgBanPoker.png");
        this.addSprite(this,"table",cc.p(641,340),res_CardGame_Poker+"/banPoker.png");
        this.addSprite(this,"iconGame",cc.p(639.5,367),res_CardGame_backjack+"/iconXiZach.png");
        var positionPlayer = [cc.p(673,147),cc.p(626,647),cc.p(125,240),cc.p(125,455),cc.p(1154,455),cc.p(1154,240)];
        var positionAvatarIconOut = [cc.p(37.5,39.5),cc.p(42,40.5),cc.p(42,40.5),cc.p(42,40.5),cc.p(62.5,5.5),cc.p(60.5,4.5)];
        var positionAvatarbgName = [cc.p(-162,-9.5),cc.p(161.5,4.5),cc.p(-3.5,-90.5),cc.p(-1,-90),cc.p(4,-93),cc.p(-4.5,-93)];
        var positionCardPanel = [cc.p(91,138.5),cc.p(45.5,-86),cc.p(185,35),cc.p(185,35),cc.p(-110,37),cc.p(-110,37)];
        var positionXetBai = [cc.p(0,0),cc.p(62.5,-137.5),cc.p(203.5,-13),cc.p(203.5,-13),cc.p(-84,-16),cc.p(-85,-16)];
        var positionDanBai = [cc.p(75,135),cc.p(62,-82),cc.p(199.5,36),cc.p(197.5,39),cc.p(-84.5,40),cc.p(-91,40)];
        for (i = 0; i < XiZach.MAX_PLAYER; i++) {
            if(i==0) {
                this.addLayout(this, "playerPanel_" + i, positionPlayer[i], null, cc.size(200, 120), true);
                this.addLayout(this["playerPanel_"+i],"avatarPanel"+i,cc.p(91,26),null,cc.size(50,50),true);
                this["avatarPanel"+i].setName("avatarPanel");
            }
            else{
                this.addLayout(this, "playerPanel_" + i, positionPlayer[i], null, cc.size(100, 100), true);
                this.addButton(this["playerPanel_"+i],"btnXetBai"+i,XiZach.XiZachScene.BTN_XET_BAI_TAG + i,positionXetBai[i],true,res_CardGame_backjack+"/xetbainormal.png",res_CardGame_backjack+"/xetBaiPress.png");
                this["btnXetBai"+i].loadTextureDisabled(res_CardGame_backjack+"/xetbaidis.png",ccui.Widget.PLIST_TEXTURE);
                this.addLayout(this["playerPanel_"+i],"avatarPanel"+i,cc.p(57,56),null,cc.size(0,0),true);
                this["avatarPanel"+i].setName("avatarPanel");
            }


            this.addButton(this["avatarPanel"+i],"btnAvatar"+i,1,cc.p(0,0),true,res_common_avatar+"/Button.png");
            this["btnAvatar"+i].setName("btnAvatar");
            this.addSprite(this["avatarPanel"+i],"avatar"+i,cc.p(0,0),res_common_avatar+"/Avatar_1.png");
            this["avatar"+i].setName("avatar");
            this.addSprite(this["avatarPanel"+i],"bg_progress"+i,cc.p(0,0),res_common_avatar+"/bg_vongngoai_avatar.png");
            this["bg_progress"+i].setName("bg_progress");
            this.addSprite(this["avatarPanel"+i],"iconOut"+i,positionAvatarIconOut[i],res_CardGame_CommonResource_BanChoi+"/btn_exit_room.png");
            this["iconOut"+i].setName("iconOut");
            this.addSprite(this["avatarPanel"+i],"view"+i,cc.p(-7,-22.5),res_CardGame_CommonResource_BanChoi+"/viewing.png");
            this["view"+i].setName("view");
            this.addSprite(this["avatarPanel"+i],"bgName"+i,positionAvatarbgName[i],res_CardGame_backjack+"/bangten.png");
            this["bgName"+i].setScale(1.2);
            this["bgName"+i].setName("bgName");
            this.addText(this["bgName"+i],"name"+i,cc.p(63.5,29.5),"HoangTuanLinh231",RobotoRegular.fontName,16);
            this["name"+i].setScale(0.8);
            this["name"+i].setName("name");
            this.addText(this["bgName"+i],"gold"+i,cc.p(65,11),"HoangTuanLinh231",RobotoRegular.fontName,18);
            this["gold"+i].setName("gold");
            this["gold"+i].setScale(0.9);
            this["gold"+i].setColor(cc.color("#FFA500"));

            if(i==0){
                this.addLayout(this["playerPanel_"+i],"cardPanel"+i,positionCardPanel[i],null,cc.size(350,170),true);
                this["cardPanel"+i].setName("cardPanel");
                this["cardPanel"+i].setScale(0.6);
                for(var j=0;j<5;j++){
                    this.addSprite(this["cardPanel"+i],"card"+j,cc.p(35+j*50,85),res_CardGame_LaBai+"/labai_22.png");
                    this["card"+j].setName("card"+j);
                }
                this.addSprite(this["playerPanel_"+i],"iconChuong"+i,cc.p(19,40),res_CardGame_backjack+"/iconChuong.png");
                this["iconChuong"+i].setScale(0.75);
                this["iconChuong"+i].setName("iconChuong");

            }else{
                this.addLayout(this["playerPanel_"+i],"cardPanel"+i,positionCardPanel[i],null,cc.size(200,100),true);
                this["cardPanel"+i].setName("cardPanel");
                this["cardPanel"+i].setScale(0.5);
                for(var j=0;j<5;j++){
                    this.addSprite(this["cardPanel"+i],"card"+j,cc.p(35+j*50,85),res_CardGame_LaBai+"/labai_52.png");
                    this["card"+j].setName("card"+j);
                }
                if(i==1) {
                    this.addSprite(this["playerPanel_" + i], "iconChuong" + i, cc.p(20.5, 79.5), res_CardGame_backjack + "/iconChuong.png");
                    this["iconChuong"+i].setScale(0.7);
                    this["iconChuong"+i].setName("iconChuong");
                }
            }
            this.addSprite(this["playerPanel_" + i],"imRutBai"+i,positionDanBai[i],res_CardGame_backjack+"/textRutBai.png");
            this["imRutBai"+i].setName("imRutBai");
            this.addSprite(this["playerPanel_" + i],"imDanBai"+i,positionDanBai[i],res_CardGame_backjack+"/textdanbai.png");
            this["imDanBai"+i].setName("imDanBai");
           //// var panel = ccui.Helper.seekWidgetByName(this._layout, "playerPanel_" + i);
           //// var avatarPanel = ccui.helper.seekWidgetByName(panel, "avatarPanel");
           //// var btn = ccui.helper.seekWidgetByName(avatarPanel, "btnAvatar");
            this["btnAvatar"+i].setPressedActionEnabled(true);
            this["btnAvatar"+i].setTag(parseInt(XiZach.XiZachScene.btnAvatarStartTag) + i);
            this["btnAvatar"+i].addTouchEventListener(this.onTouchEventHandler, this);

            var playerDisplay = new XiZach.PlayerDisplay();
            playerDisplay.index = i;
            playerDisplay.gameScene = this;
            this.addChild(playerDisplay);
            playerDisplay.setPanel(this["playerPanel_" + i]);
            playerDisplay.initPlayerDisplay();
            if (i == 0) {
                playerDisplay.initMyPlayer();
            }

            if( i != 0){
               // var btnXetBai = ccui.helper.seekWidgetByName(panel, "btnXetBai");
                this["btnXetBai"+i].setPressedActionEnabled(true);
                this["btnXetBai"+i].setTag(parseInt(XiZach.XiZachScene.BTN_XET_BAI_TAG + i));
                this["btnXetBai"+i].addTouchEventListener(this.onTouchEventHandler, this);
                playerDisplay.btnXetBai =  this["btnXetBai"+i];
            }

            this.playerList.push(playerDisplay);
        }



        //doSomething

        this.addButton(this,"btnDanBai",XiZach.XiZachScene.BTN_DAN_BAI,cc.p(793,73.5),true,res_CardGame_backjack+"/danbainormal.png",res_CardGame_backjack+"/danbaipress.png");
        this["btnDanBai"].loadTextureDisabled(res_CardGame_backjack+"/danbaidisable.png",ccui.Widget.PLIST_TEXTURE);
        this.addButton(this,"btnXetTatCa",XiZach.XiZachScene.BTN_XET_BAI_ALL,cc.p(793,73.5),true,res_CardGame_backjack+"/btnxettatcanormal.png",res_CardGame_backjack+"/btnxettatcapress.png");
        this["btnXetTatCa"].loadTextureDisabled(res_CardGame_backjack+"/btnxettatcadisable.png",ccui.Widget.PLIST_TEXTURE);

        this.addButton(this,"btnRutBai",XiZach.XiZachScene.BTN_RUT_BAI,cc.p(640,377),true,res_CardGame_backjack+"/2.png",res_CardGame_backjack+"/2.png");
        this["btnRutBai"].loadTextureDisabled(res_CardGame_backjack+"/1.png",ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this,"iconMuiTen",cc.p(640,415.5),res_CardGame_CommonResource_BanChoi+"/arrow.png");
        this.addText(this,"muccuoc",cc.p(165,652),"Mức cược: 500K",RobotoRegular.fontName,20);
        this.addText(this,"gameId",cc.p(249,677),"9999999999",RobotoRegular.fontName,20);
        this.addText(this,"roomId",cc.p(135,677),"Ban: 9990",RobotoRegular.fontName,20);
        this.addButton(this,"btnBack",XiZach.XiZachScene.BTN_BACK,cc.p(47,667.5),true,res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png");
        this.addSprite(this,"iconNetwork",cc.p(1007,675),res_CardGame_CommonResource_BanChoi+"/ping_0.png");
        this.addButton(this,"btnChat",XiZach.XiZachScene.BTN_CHAT,cc.p(1231,672),true,res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png");
        this.addButton(this,"btnInfo",XiZach.XiZachScene.BTN_INFO,cc.p(1157.5,672),true,res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png");
        this.addButton(this,"btnInfo",XiZach.XiZachScene.BTN_CHEAT,cc.p(1083.5,672),true,res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png");
        this.addSprite(this,"cardDealer",cc.p(642,371),res_CardGame_backjack+"/1.png");

       // this.btnBack = this.customizeButton("btnBack", XiZach.XiZachScene.BTN_BACK);
    //    this.btnChat = this.customizeButton("btnChat", XiZach.XiZachScene.BTN_CHAT);
       // this.btnInfo = this.customizeButton("btnInfo", XiZach.XiZachScene.BTN_INFO);
       // this.btnCheat = this.customizeButton("btnCheat", XiZach.XiZachScene.BTN_CHEAT);

        if (CURRENT_MODE == MODE_DEPLOY.LIVE) {
            //this.btnCheat.setVisible(false);
        }

        //this.btnMoiChoi = this.customizeButton("btnMoiChoi", XiZach.XiZachScene.BTN_MOI_CHOI);
        //this.btnMoiChoi.setVisible(true);

       // this.iconGameXiZach = ccui.helper.seekWidgetByName(this._layout, "iconGame");

       // this.iconNetwork =  ccui.Helper.seekWidgetByName(this._layout, "iconNetwork");
        this.iconNetwork.setVisible(false);

       // this.table = ccui.helper.seekWidgetByName(this._layout, "table");
       // this.cardDealer = ccui.helper.seekWidgetByName(this._layout, "cardDealer");
        this.cardDealer.setVisible(false);

      //  this.btnRutBai = this.customizeButton("btnRutBai", XiZach.XiZachScene.BTN_RUT_BAI);
        this.btnRutBai.setVisible(false);

       // this.btnDanBai = this.customizeButton("btnDanBai", XiZach.XiZachScene.BTN_DAN_BAI);
        this.btnDanBai.setVisible(false);

        //this.btnXetTatCa = this.customizeButton("btnXetTatCa", XiZach.XiZachScene.BTN_XET_BAI_ALL);
       // this.iconMuiTen = ccui.helper.seekWidgetByName(this._layout, "iconMuiTen");
        this.arrowPos = this.iconMuiTen.getPosition();



        this.clearUpdateMatch();

        cc.log("XiZach + customizeGui ctor 8");
    },

    //
    onEnter: function () {
        if (menutab)
            menutab.hideAllInfo();
        BaseLayer.prototype.onEnter.call(this);
        //this.hasInfoHuVang = false;
        cc.log("XiZachScene onEnter 5");

        //this.effect2D.clearEffect();

        this.cheatLayer = gameScenePool.getCheatCardScene2();
        this.addChild(this.cheatLayer);
        this.cheatLayer.setVisible(false);
        this.cheatLayer.setLocalZOrder(12);
        this.cheatLayer.setType(GameList.XiZach);
        this.cheatLayer.clear();

        //this.huVangIcon.hasHu = false;
        //this.huVangIcon.setVisible(false);
        //this.huVangIcon.changeToHasHu(false);
        //if(gameWsClient){
        //   gameWsClient.sendThongTinHuVang();
        //}
    },


    onExit: function () {
        BaseLayer.prototype.onExit.call(this);
        if (this.chatLayer) {
            this.chatLayer.removeFromParent();
            this.chatLayer = null;
        }
    },

    receiveInfoMoiChoi: function(data){
        if(!this.guiMoiChoi){
            this.guiMoiChoi = new MoiChoiLayer();
            this.addChild(this.guiMoiChoi);
        }
        //this.guiMoiChoi.setVisible(true);
        this.guiMoiChoi.show();
        this.guiMoiChoi.updateListItems(data, XiZach.gameLogic.moneyType);
        this.guiMoiChoi.reloadData(data);
    },

    updateChangeTurn: function () {
        this.bottomLayer.setOpacity(255);
        this.resetBetButton();
    },

    clearUpdateMatch: function () {
        cc.log("clearUpdateMacth ");
        this.stopAllActions();
        this.stopAutoStart();
        this.effectLayer.clearEffectUpdateMatch();
        this.effectLayer.clearEffectChiaBai();

        this.iconMuiTen.setVisible(false);
        this.btnRutBai.setVisible(false);
        this.btnXetTatCa.setVisible(false);
        this.btnDanBai.setVisible(false);
        for (var i = 0; i < XiZach.MAX_PLAYER; i++) {
            this.playerList[i].clearUpdateMatch();
        }

    },

    clearWhenChiaBai: function(){
        this.effectLayer.clearEffectUpdateMatch();
        this.effectLayer.clearEffectChiaBai();

        this.iconMuiTen.setVisible(false);
        this.btnRutBai.setVisible(false);
        this.btnXetTatCa.setVisible(false);
        this.btnDanBai.setVisible(false);
        for (var i = 0; i < XiZach.MAX_PLAYER; i++) {
            this.playerList[i].clearUpdateMatch();
        }
    },

    resetWhenSelectDealer: function () {
        this.registerCheckFold = false;
        this.registerFollowAll = false;
        this.inBetTime = false;

        this.bottomLayer.runAction(cc.fadeIn(0.1));
        this.myBtnPlay1.setEnable(false);
        this.myBtnPlay2.setEnable(false);
        this.myBtnPlay3.setEnable(false);
        this.hideThanhBetAmount();
        this.showBoBai(false);

        this.lbPot.setString("0");
        this.potLayer.setVisible(true);
    },

    chiaBai: function() {
        //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");
        this.gameId.setString("# " + XiZach.gameLogic.gameId);

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.playerList[i].initWithCardsNotId(XiZach.gameLogic.players[i].groupCard.cards);
            this.playerList[i].hideBai();
            this.playerList[i].hideDisplayDiem();
        }


        this.playerList[0].hideBai();
        this.btnRutBai.setVisible(true);

        var countNum = 0;
        for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
            if (XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) {
                countNum++;
            }
        }

        cc.log("countNum: " + countNum);

        var stt = 0;
        this.effectLayer.hideEffectWhenChiaBai();

        for (var i = 0; i < XiZach.MAX_PLAYER; i++) {
            var chair = i ;
            if (XiZach.gameLogic.players[chair].status == XiZach.GameStatus.PLAYING){
                this.effectLayer.chiaBai(this.playerList[chair], countNum, stt);
                stt++;
            }
        }

        this.timeChiaBai = XiZach.gameLogic.timeChiaBai;
        this.actionChiBai = cc.sequence(cc.delayTime(3), cc.callFunc(this.updateWhenChiaBai.bind(this)));
        //this.actionChiBai.setTag(1234);
        //this.runAction(this.actionChiBai);
    },

    //
    chiaBaiInstance: function () {
        if (XiZach.gameLogic.players[0].status == XiZach.GameStatus.PLAYING) {
            this.playerList[0].chiaBaiInstance(XiZach.gameLogic.myCards);
        }

        for (var i = 1; i < XiZach.GameLogic.MAX_PLAYER; i++) {
            if (XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) {
                this.playerList[i].chiaBaiInstance();
            }
        }
        XiZach.gameLogic.hasChiaBai = true;

        this.bottomLayer.setOpacity(255);
    },

    enableRutBai: function(){

    },

    onButtonRelease: function (btn, id) {
        cc.log("id: " + id);
        switch (id) {
            case XiZach.XiZachScene.BTN_BACK:
                //cc.log("register out room");
                //GameManager.getInstance().backToSelectRoom();
                var pk = new XiZach.CmdSendRequestLeaveGame();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                break;

            case XiZach.XiZachScene.BTN_CHEAT:
                cc.log("BTNCHEAT");
                this.cheatLayer.setVisible(true);
                break;
            case XiZach.XiZachScene.BTN_CHAT:
                cc.log("BTNCHAT");
                this.onBtnChatClicked();
                break;

            case XiZach.XiZachScene.BTN_INFO:
            {
                //this.bgBotPlaying.setVisible(this.botAuto);
                var s = GameManager.getInstance().getHotroLink(GameList.XiZach);
                if(cc.sys.isNative){
                    if(lobby.open_payment_ios == false){
                        popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                        return;
                    }
                }

                ConnectNative.openWebView(s, false);
            }
                break;

            case XiZach.XiZachScene.BTN_MOI_CHOI:{
                cc.log("click btn moiChoi");
                if(gameWsClient){
                    gameWsClient.sendGetInfoMoiChoi();
                }
            }
                break;

            case XiZach.XiZachScene.BTN_RUT_BAI:
            {
                cc.log("Click rut bai");
                if(gameWsClient){
                    this.sendRutBai();
                }
                break;
            }
                break;
            case XiZach.XiZachScene.BTN_DAN_BAI:
            {
                cc.log("Click dan bai");
                this.sendDanBai();
                this.danBai();
            }
                break;
            case XiZach.XiZachScene.BTN_XET_BAI_ALL:
            {
                cc.log("Click xet bai all");
                this.sendXetBaiAll();
                this.btnXetTatCa.setEnabled(false);
                this.btnXetTatCa.setBright(false);
                break;
            }
        }

        if( id >= XiZach.XiZachScene.BTN_XET_BAI_TAG + 1 && id < XiZach.MAX_PLAYER +  XiZach.XiZachScene.BTN_XET_BAI_TAG){
            this.playerList[id - XiZach.XiZachScene.BTN_XET_BAI_TAG].showCanXetBai(false);
            this.sendDanBaiOne(id - XiZach.XiZachScene.BTN_XET_BAI_TAG);
        }

    },

    resetBetButton: function () {
        this.btnBet2.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet1.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet3.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet4.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
    },

    danBai: function(){
        this.btnRutBai.setEnabled(false);
        this.btnRutBai.setBright(false);
        this.btnDanBai.setEnabled(false);
        this.btnDanBai.setBright(false);
        this.iconMuiTen.setVisible(false);
        this.playerList[0].stopEffectTime();
    },


    getImgStartNum: function(num){
        return "res/common/boSo/start_" + num + ".png";
    },

    addAutoStart: function(time) {
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var after, donviS, chucS;
        if(after = this.getChildByTag(0 + XiZach.XiZachScene.aftertag)){
            after.removeFromParent();
        }

        if(chucS = this.getChildByTag(0 + XiZach.XiZachScene.chuctag)){
            chucS.removeFromParent();
        }

        if(donviS = this.getChildByTag(0 + XiZach.XiZachScene.donvitag)){
            donviS.removeFromParent();
        }

        //after = new cc.Sprite(XiZach.res.afterPng);
        after = GuiUtil.createSprite(XiZach.res.afterPng);//new cc.Sprite(XiZach.res.afterPng);

        after.setTag(XiZach.XiZachScene.aftertag);
        var timeRemain = time;
        after.setPosition(cc.p(winSize.width*0.5, winSize.height*0.7));
        var pos = after.getPosition();
        this.addChild(after);

        var chuc = Math.floor(time/10);
        var donVi = time % 10;

        //chucS = new cc.Sprite(this.getImgStartNum(chuc));
        chucS = GuiUtil.createSprite(this.getImgStartNum(chuc));
        chucS.setTag(XiZach.XiZachScene.chuctag);

        donViS = GuiUtil.createSprite(this.getImgStartNum(donVi));
        donViS.setTag(XiZach.XiZachScene.donvitag);

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
                after.stopAllActions();
                after.removeFromParent();
                return;
            }

            //chucS.setTexture(this.getImgStartNum(chuc));
            GuiUtil.changeSprite(chucS,this.getImgStartNum(chuc));
            GuiUtil.changeSprite(donViS,this.getImgStartNum(donVi));
        }

        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackStartAuto.bind(this), this));
        after.runAction(cc.repeatForever(action));
    },

    stopAutoStart: function(){
        var after, chuc, donVi;
        if( after = this.getChildByTag(XiZach.XiZachScene.aftertag)){
            after.stopAllActions();
            after.removeFromParent();
        }

        if(chuc = this.getChildByTag(XiZach.XiZachScene.chuctag)){
            chuc.removeFromParent();
        }

        if(donVi = this.getChildByTag(XiZach.XiZachScene.donvitag)){
            donVi.removeFromParent();
        }
    },

    onUpdateGui: function (data) {
        var i;
        switch (XiZach.gameLogic.gameState) {
            case XiZach.GameState.JOIN_ROOM:
            {
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
               // var muccuoc = ccui.Helper.seekWidgetByName(this._layout, "muccuoc");
                //var ban = ccui.Helper.seekWidgetByName(this._layout, "roomId");
              //  var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn: " + XiZach.gameLogic.roomId);
                this.gameId.setString("# " + XiZach.gameLogic.gameId);

                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(XiZach.gameLogic.bet));

                if (this.chip) {
                    this.chip.removeFromParent();
                }

                //this.chip = new cc.Sprite("res/common/chip/vinChip" + XiZach.gameLogic.moneyType + ".png");
                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + XiZach.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width * 0.5 + 10, this.muccuoc.getPositionY());
                this.updateChuong();

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                    this.playerList[i].updateEnterGame();
                }


            }
                break;

            case XiZach.GameState.GAME_INFO:
            {
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
                cc.log("scene gam info");
               // var muccuoc = ccui.Helper.seekWidgetByName(this._layout, "muccuoc");
               // var ban = ccui.Helper.seekWidgetByName(this._layout, "roomId");
              //  var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn: " + XiZach.gameLogic.roomId);
                this.gameId.setString("# " + XiZach.gameLogic.gameId);

                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(XiZach.gameLogic.bet));

                if (this.chip) {
                    this.chip.removeFromParent();
                }

                //this.chip = new cc.Sprite("res/common/chip/vinChip" + XiZach.gameLogic.moneyType + ".png");
                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + XiZach.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width*0.5 + this.chip.getContentSize().width * 0.5 + 10, this.muccuoc.getPositionY());

                this.updateChuong();
                for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateEnterGame();
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                    cc.log("scene game info: " + XiZach.gameLogic.players[i].status);
                    if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
                        this.playerList[i].initInstantCardGroup(XiZach.gameLogic.players[i].groupCard);
                    }
                }


                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    cc.log("scene game info: " +  i + "" + XiZach.gameLogic.players[i].status);
                }

                cc.log("gameServerState: " + XiZach.gameLogic.gameStateAtServer + " " +  XiZach.gameLogic.gameServerState);
                switch (XiZach.gameLogic.gameStateAtServer) {
                    case 1:  // dang choi`
                    {
                        this.kiemTraRutBai();
                        cc.log("gameServerState: " + XiZach.gameLogic.gameServerState);
                        if(XiZach.gameLogic.gameServerState == XiZach.GameStateServer.GIAI_DOAN_2){
                            cc.log("vao giai doan 2");
                            for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                                if(XiZach.gameLogic.players[i].isPlaying() && (i != XiZach.gameLogic.chuongChair) && !XiZach.gameLogic.players[i].hasDanBai){
                                    this.playerList[i].addEffectTime(data.countDownTime, data.countDownTime);
                                }

                                if(XiZach.gameLogic.players[i].isPlaying() && XiZach.gameLogic.players[i].hasDanBai && (i != XiZach.gameLogic.chuongChair)){
                                    this.playerList[i].danBai();
                                }
                            }
                        }
                        else if(XiZach.gameLogic.gameServerState == XiZach.GameStateServer.GIAI_DOAN_3){
                            cc.log("vao giai doan 3");
                            this.playerList[XiZach.gameLogic.chuongChair].showBaiInstance();
                            this.playerList[XiZach.gameLogic.chuongChair].addEffectTime(data.countDownTime, data.countDownTime);
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

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    cc.log("scene game info: " +  i + "" + XiZach.gameLogic.players[i].status);
                }
            }
                break;

            case XiZach.GameState.NEW_USER_JOIN_ROOM:
            {
                var chair = XiZach.gameLogic.convertChair(data.chair);
                this.playerList[chair].iconOutRoom.setVisible(false);
                if(chair!= 0){
                    this.playerList[chair].btnXetBai.setVisible(false);
                    this.playerList[chair].textRutBai.setVisible(false);
                    this.playerList[chair].textDanBai.setVisible(false);
                }

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
            }
                break;

            case XiZach.GameState.AUTOSTART:
            {
                if(data && (data.isAutoStart) && (XiZach.gameLogic.timeAutoStart > 0)) {
                    this.effectLayer.hideThongBaoNoChuong();
                    this.addAutoStart(XiZach.gameLogic.timeAutoStart);
                }

                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }

                if(this.getChildByTag(0 + XiZach.XiZachScene.layerEndGameTag)){
                    this.getChildByTag(0 + XiZach.XiZachScene.layerEndGameTag).removeFromParent();
                }

                if(this.getChildByTag(0 + XiZach.XiZachScene.layerSamTag)){
                    this.getChildByTag(0 + XiZach.XiZachScene.layerSamTag).removeFromParent();
                }

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].hideDisplayDiem();
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                    this.playerList[i].hasMoBai = false;
                }

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].iconOutRoom.setVisible(false);
                }

                this.updateChuong();

                XiZach.gameLogic.gameState = XiZach.GameState.NONE;
            }
                break;

            case XiZach.GameState.USER_LEAVE_ROOM:
            {
                this.playerList[XiZach.gameLogic.activeLocalChair].updateWithPlayer(XiZach.gameLogic.players[XiZach.gameLogic.activeLocalChair]);

                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }

                if (XiZach.gameLogic.activeLocalChair == 0) {
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }




            }
                break;

            case XiZach.GameState.NOTIFY_OUT_ROOM:
            {
                cc.log("notify out room");
                this.playerList[XiZach.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if (XiZach.gameLogic.convertChair(data.outChair) == 0) {
                    var stringNotify;
                    if (data.isOutRoom) {
                        stringNotify = "Bạn đã đăng ký rời phòng thành công."
                    } else {
                        stringNotify = "Bạn đã hủy đăng ký rời phòng."
                    }
                    GameToast.makeToast(2, stringNotify, this.effectLayer);
                }

                for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
            }
                break;

            case XiZach.GameState.DEAL_CARD:
            {
                for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                    this.playerList[i].hasMoBai = false;
                }
                this.clearWhenChiaBai();
                this.updateChuong();
                this.effectLayer.hideThongBaoNoChuong();
                this.stopAutoStart();
                this.chiaBai(data);
            }
                break;

            case XiZach.GameState.END_GAME:
            {
                for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }

                cc.log("on update gui end game");
                for (var i = 0; i < XiZach.MAX_PLAYER; i++) {
                    this.playerList[i].stopEffectTime();
                }
                this.endGame();
            }
                break;

            case XiZach.GameState.UPDATE_MATCH:
            {
                cc.log("onUpdateGui: ");
                this.clearUpdateMatch();
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].inGamePlayer = false;
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
            }
                break;


            case XiZach.GameState.CHUYEN_GIAI_DOAN_2:
            {
                cc.log("Chuyen giai doan 2 game scene");
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
                for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                    if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
                        this.playerList[i].stopEffectTime();
                    }
                }

                for(var i = 0; i < XiZach.MAX_PLAYER; i ++){
                    if((XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) && (!XiZach.gameLogic.players[i].hasSoBai) && (i != XiZach.gameLogic.chuongChair) && !XiZach.gameLogic.players[i].hasMoBai){
                           this.playerList[i].chuyenGiaiDoan2();
                    }
                }

                this.kiemTraRutBai();
            }
                break;

            case XiZach.GameState.CHUYEN_GIAI_DOAN_3:
            {
                cc.log("Chuyen giai doan 3 game scene");
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
                for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                    if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
                        this.playerList[i].stopEffectTime();
                    }
                }

                for(var i = 0; i < XiZach.MAX_PLAYER; i ++){
                    if((XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) && (!XiZach.gameLogic.players[i].hasSoBai) && (i == XiZach.gameLogic.chuongChair)){
                        this.playerList[i].chuyenGiaiDoan3();
                    }

                    if((XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) ){
                        this.playerList[i].hideAllText();
                    }
                }

                if(XiZach.gameLogic.chuongChair != 0){
                    this.playerList[XiZach.gameLogic.chuongChair].showBaiChuong();
                }

                this.kiemTraRutBai();
            }
                break;

            case XiZach.GameState.RUT_BAI:
            {
                // cc.log("XiZach Scene Rut bai");
                for (var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                    // cc.log("Status: "  + i + " " + XiZach.gameLogic.players[i].status);
                }

                var i = XiZach.gameLogic.convertChair(data.chair);
                cc.log("data.chair: " + data.chair + " localChair: " + i);


                this.playerList[i].addCard(data.card);


                //this.showCardInstance();
                this.effectLayer.addCardToPlayer(this.playerList[i], data.card);

                this.runAction(cc.sequence(cc.delayTime(XiZach.timeDealOne + XiZach.timeTransform), cc.callFunc(this.kiemTraRutBai.bind(this))));

                if(i == 0){
                    this.checkKiemTraHienThiDiem();
                }

            }
                break;

            case XiZach.GameState.DAN_BAI:
            {
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
                cc.log("XiZach Scene Dan bai");
                var chair = XiZach.gameLogic.convertChair(data.chair);
                this.danBaiForPlayer(chair);
            }
                break;

            case XiZach.GameState.RUT_BAI_TU_DONG:
            {
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
                cc.log("XiZach Scene rut bai tu dong");
                var i = XiZach.gameLogic.convertChair(data.chair);
                this.playerList[i].addCards(data.cards);
                this.effectLayer.addCardsToPlayer(this.playerList[i], data.cards);
                this.runAction(cc.sequence(cc.delayTime(XiZach.timeDealOne*data.cards.length + XiZach.timeTransform), cc.callFunc(this.kiemTraRutBai.bind(this))));
                if(i == 0){
                    this.checkKiemTraHienThiDiem();
                }
            }
                break;

            case XiZach.GameState.SO_BAI:
            {
                cc.log("XiZach Scene so bai");
                var chair1 = XiZach.gameLogic.convertChair(data.chair1);
                var chair2 = XiZach.gameLogic.convertChair(data.chair2);

                cc.log(" so bai: " + chair1 + " " + chair2);

                var moneyWin1 = data.winMoney1;
                var moneyWin2 = data.winMoney2;

                cc.log(" so bai : " + moneyWin1 + " " + moneyWin2);

                if(data.hasCard1){
                    if(!XiZach.gameLogic.players[chair1].hasMoBai){
                        if(chair1 != XiZach.gameLogic.chuongChair){
                            XiZach.gameLogic.players[chair1].hasMoBai = true;
                            this.playerList[chair1].moBai(data.isXiZach);
                        }


                    }
                }

                if(data.hasCard2){
                    if(!XiZach.gameLogic.players[chair2].hasMoBai){
                        if(chair2 != XiZach.gameLogic.chuongChair){
                            XiZach.gameLogic.players[chair2].hasMoBai = true;
                            this.playerList[chair2].moBai(data.isXiZach);
                        }
                    }
                }

                cc.log("hasMoBai: "  +   XiZach.gameLogic.players[chair1].hasMoBai +  " "  + XiZach.gameLogic.players[chair2].hasMoBai);

                if(!XiZach.gameLogic.players[chair1].isChuong()){
                    cc.log("clearEffectWhen")
                    this.clearEffectWhenSoBaiFor(chair1);
                }

                if(!XiZach.gameLogic.players[chair2].isChuong()){
                    this.clearEffectWhenSoBaiFor(chair2);
                }

                if(!data.hasCard1){
                    cc.log("11: " + chair2);
                    this.playerList[chair2].addMoney(moneyWin2, 0);
                }
                else{
                    cc.log("12: " + chair2);
                    this.playerList[chair2].addMoney(moneyWin2, 0.25);
                }

                if(!data.hasCard2){
                    cc.log("13: " + chair1);
                    this.playerList[chair1].addMoney(moneyWin1, 0);
                }
                else{
                    cc.log("14: " + chair1);
                    this.playerList[chair1].addMoney(moneyWin1, 0.25);
                }

                this.kiemTraRutBai();
            }
                break;

            case XiZach.GameState.DOI_CHUONG:
            {
                this.updateChuong();
                for (i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(XiZach.gameLogic.players[i]);
                }
            }
                break;
            case XiZach.GameState.NOTIFY_NO_CHUONG:
            {
                this.showNoChuong();
                this.updateChuong;
            }
                break;
            case XiZach.GameState.NOTIFY_KET_QUA_XIZACH:
            {
                this.updateKetQuaXiZach();
            }
                break;



        }
    },

    showNoChuong: function(){
        cc.log("there are no chuong");
        this.effectLayer.addThongBaoNoChuong();
    },

    finishChiaBai: function(){
        cc.log("finish chia bai");
        if(XiZach.gameLogic.hasChiaBai == false){
            if(XiZach.gameLogic.players[0].status == XiZach.GameStatus.PLAYING){
                this.effectLayer.clearEffectChiaBai();
                this.chiaBaiInstance();
            }
        }
        XiZach.gameLogic.hasChiaBai = true;
    },

    botDanhBai: function(){
        return;
        var kk = Math.floor(Math.random()*18);
        if(kk >= 1 && this.btnPlay2.isEnabled()){
            this.onButtonRelease(this.btnPlay2, XiZach.XiZachScene.BTN_PLAY_2);
        }
        else if(this.btnPlay3.isEnabled()){
            this.onButtonRelease(this.btnPlay3, XiZach.XiZachScene.BTN_PLAY_3);
        }
        else{
            this.clickBoBai();
        }
    },

    resetAllBetLayer: function(){
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.playerList[i].resetBetLayer();
        }
    },


    sendRutBai: function(){
        cc.log("rut Bai");
        var pk = new XiZach.CmdSendRutBai();
        pk.putData();
        gameWsClient.send(pk);
        pk.clean();
    },


    sendDanBai: function(){
        gameWsClient.sendDanBai();
    },

    checkKiemTraHienThiDiem: function(){
        //var boBaiId =   XiZach.gameLogic.players[0].groupCard.tinhBo();
        if(!XiZach.gameLogic.players[0].moBai && !XiZach.gameLogic.players[0].groupCard.canRutBai()){
            this.playerList[0].displayCheckHienThiDiem();
        }
    },

    kiemTraRutBai: function(){
        cc.log("kiem Tra rut Bai");

        this.btnDanBai.setVisible(false);
        if((XiZach.gameLogic.gameStateServer != XiZach.GameStateServer.GIAI_DOAN_2 && XiZach.gameLogic.gameStateServer != XiZach.GameStateServer.GIAI_DOAN_3 && XiZach.gameLogic.gameStateServer != XiZach.GameStateServer.KET_THUC_GIAI_DOAN_2)){
            this.btnRutBai.setVisible(false);
            this.btnDanBai.setVisible(false);
            this.btnXetTatCa.setVisible(false);
            this.iconMuiTen.setVisible(false);

            for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                this.playerList[i].clearPreDealCard();
            }
        }
        else if(XiZach.gameLogic.players[0].status != XiZach.GameStatus.PLAYING){
            this.btnRutBai.setVisible(true);
            this.btnRutBai.setEnabled(false);
            this.btnRutBai.setBright(false);
            this.iconMuiTen.setVisible(false);
            this.btnDanBai.setVisible(false);
            this.btnXetTatCa.setVisible(false);

            for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                this.playerList[i].clearPreDealCard();
            }
        }
        else{
            cc.log("hienThiRutBai");
            this.btnRutBai.setVisible(true);
            this.btnDanBai.setVisible(true);
            this.btnXetTatCa.setVisible(true);
            this.iconMuiTen.setVisible(true);

            if(XiZach.gameLogic.players[0].isChuong()){
                cc.log(" vao chuong");
                this.btnDanBai.setVisible(false);
                this.btnXetTatCa.setVisible(true);
                this.btnXetTatCa.setEnabled(false);
                this.btnXetTatCa.setBright(false);

                for(var i = 1; i < XiZach.MAX_PLAYER; i++){
                    if(XiZach.gameLogic.status == XiZach.GameStatus.PLAYING){
                        this.playerList[i].btnXetBai.setVisible(true);
                    }
                }

                if(XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.GIAI_DOAN_2 || XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.KET_THUC_GIAI_DOAN_2){
                    this.showCanRutBai(false);
                    this.btnXetTatCa.setEnabled(true);
                    this.btnXetTatCa.setBright(false);

                    for(var i = 1; i < XiZach.MAX_PLAYER; i++){
                        if(XiZach.gameLogic.status == XiZach.GameStatus.PLAYING){
                            this.playerList[i].btnXetBai.setEnabled(true);
                            this.playerList[i].btnXetBai.setBright(true);

                            if(this.playerList[i].hasMoBai){
                                this.playerList[i].textDanBai.setVisible(false);
                                this.playerList[i].textRutBai.setVisible(false);
                            }
                            else if(this.playerList[i].hasDanBai){
                                this.playerList[i].textDanBai.setVisible(true);
                                this.playerList[i].textRutBai.setVisible(false);
                            }
                            else{
                                this.playerList[i].textDanBai.setVisible(false);
                                this.playerList[i].textRutBai.setVisible(true);
                            }
                        }
                    }
                }
                else if(XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.GIAI_DOAN_3){
                    if(XiZach.gameLogic.players[0].canRutBai()){
                        this.showCanRutBai(true);
                    }
                    else{
                        this.showCanRutBai(false);
                    }

                    if(XiZach.gameLogic.players[0].canDanBai()) {
                        this.btnXetTatCa.setEnabled(true);
                        this.btnXetTatCa.setBright(true);
                    }
                    else {
                        this.btnXetTatCa.setEnabled(false);
                        this.btnXetTatCa.setBright(false);
                    }

                    for(var i = 1; i < XiZach.MAX_PLAYER; i++){

                        this.playerList[i].textDanBai.setVisible(false);
                        this.playerList[i].textRutBai.setVisible(false);

                        if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
                            this.playerList[i].btnXetBai.setVisible(true);
                        }
                        else{
                            this.playerList[i].btnXetBai.setVisible(false);
                        }



                        if(XiZach.gameLogic.players[0].canDanBai() && !XiZach.gameLogic.players[i].hasMoBai) {
                            this.playerList[i].btnXetBai.setEnabled(true);
                            this.playerList[i].btnXetBai.setBright(true);
                        }
                        else {
                            this.playerList[i].btnXetBai.setEnabled(false);
                            this.playerList[i].btnXetBai.setBright(false);
                        }
                    }

                }
                else if(XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.KET_THUC_GIAI_DOAN_3){

                    this.showCanRutBai(false);
                    this.btnXetTatCa.setEnabled(false);
                    this.btnXetTatCa.setBright(false);

                    for(var i = 1; i < XiZach.MAX_PLAYER; i++){
                        if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING) {
                            this.playerList[i].btnXetBai.setVisible(true);
                            this.playerList[i].btnXetBai.setEnabled(false);
                            this.playerList[i].btnXetBai.setBright(false);
                        }
                    }
                }
            }
            else {
                cc.log("vao khong phai chuong");

                this.btnDanBai.setVisible(true);
                this.btnDanBai.setEnabled(false);
                this.btnDanBai.setBright(false);
                this.btnXetTatCa.setVisible(false);

                for (var i = 1; i < XiZach.MAX_PLAYER; i++) {
                    this.playerList[i].btnXetBai.setVisible(false);
                }


                if (XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.GIAI_DOAN_2) {
                    cc.log(" vao giai doan 2");
                    if (!XiZach.gameLogic.players[0].hasDanBai &&XiZach.gameLogic.players[0].canRutBai() && !XiZach.gameLogic.players[0].hasMoBai) {
                        this.showCanRutBai(true);
                    }
                    else {
                        this.showCanRutBai(false);
                    }

                    if (XiZach.gameLogic.players[0].canDanBai() && !XiZach.gameLogic.players[0].hasMoBai) {
                        this.btnDanBai.setEnabled(true);
                        this.btnDanBai.setBright(true);
                    }
                    else {
                        this.btnDanBai.setVisible(false);
                        this.btnDanBai.setBright(false);
                    }
                }

                if (XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.KET_THUC_GIAI_DOAN_2){
                    this.showCanRutBai(false);
                    if (XiZach.gameLogic.players[0].canDanBai()) {
                        this.btnDanBai.setEnabled(true);
                        this.btnDanBai.setBright(true);
                    }
                    else {
                        this.btnDanBai.setEnabled(false);
                        this.btnDanBai.setBright(false);
                    }
                }

                if(XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.GIAI_DOAN_3 || XiZach.gameLogic.gameStateServer == XiZach.GameStateServer.KET_THUC_GIAI_DOAN_3 ){
                    if(XiZach.gameLogic.players[0].status != XiZach.GameStatus.PLAYING || !XiZach.gameLogic.players[0].isChuong()){
                        this.showCanRutBai(false);
                        this.btnXetTatCa.setVisible(false);
                        return;
                    }

                    if(XiZach.gameLogic.players[0].canRutBai()){
                        this.showCanRutBai(true);
                    }
                    else{
                        this.showCanRutBai(false);
                    }

                    if(XiZach.gameLogic.players[0].canDanBai()){
                        this.btnDanBai.setEnabled(true);
                        this.btnDanBai.setBright(true)
                    }
                    else{
                        this.btnDanBai.setEnabled(false);
                        this.btnDanBai.setBright(true);
                    }
                }
            }
        }
        this.autoDanh();
    },

    updateChuong: function(){
        var chuongChair = XiZach.gameLogic.chuongChair;

        if(chuongChair == 0){
            this.table.setRotation(180);
            this.table.setPositionY(410);
        }
        else{
            this.table.setRotation(0);
            this.table.setPositionY(330);
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(i != chuongChair){
                this.playerList[i].showIconChuong(false);
            }
            else{
                if(XiZach.gameLogic.hasChuong){
                    this.playerList[i].showIconChuong(true);
                }
                else{
                    this.playerList[i].showIconChuong(false);
                }
            }
        }


    },

    danBaiForPlayer: function(chair){
        // moBai
        cc.log("danBaiForPlayer: " + chair);

        if(chair == 0){
            this.btnRutBai.setEnabled(false);
            this.btnRutBai.setBright(false);
            this.btnDanBai.setEnabled(false);
            this.btnDanBai.setBright(false);
            this.iconMuiTen.setVisible(false);
        }

        this.playerList[chair].danBai();
    },

    clearEffectWhenSoBaiFor: function(chair){
        cc.log("clearEffectWhenSoBaiFor: " + chair);

        if(chair == 0){
            cc.log("chair == 0");
            this.btnDanBai.setEnabled(false);
            this.btnDanBai.setBright(false);
        }

        this.playerList[chair].clearWhenSoBai();
    },

    showCanRutBai: function(canRutBai){
        if(!canRutBai){
            this.btnRutBai.setEnabled(false);
            this.btnRutBai.setBright(false);
            this.iconMuiTen.stopAllActions();
            this.iconMuiTen.setVisible(false);
            cc.log("show can rut bai false");
        }
        else{
            cc.log("show can rut bai true");
            this.btnRutBai.setEnabled(true);
            this.btnRutBai.setBright(true);
            this.iconMuiTen.setVisible(true);
            this.iconMuiTen.setPosition(this.arrowPos);
            this.iconMuiTen.stopAllActions();
            this.iconMuiTen.runAction(cc.sequence(new cc.MoveBy(0.2, cc.p(0, 15)), new cc.MoveBy(0.2, cc.p(0, -15))).repeatForever());
        }
    },

    moBaiCaLang: function(){
        if(XiZach.gameLogic.needOpen){
            for(var i = 0; i < XiZach.GameLogic.MAX_PLAYER; i++){
                if(XiZach.gameLogic.players[i].status == 3 && (XiZach.gameLogic.players[i].hasBoBai == false)){
                    this.playerList[i].moBai();
                }
            }
        }
    },

    //
    endGame: function(){
        cc.log("scene endGame");
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING && !XiZach.gameLogic.players[i].hasMoBai){
                cc.log("end game mo bai");
                XiZach.gameLogic.players[i].hasMoBai = true;
                this.playerList[i].moBai();
            }
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING && XiZach.gameLogic.players[i].needShowWinLostMoney){
                cc.log("end game mo bai");
                this.playerList[i].addMoney(XiZach.gameLogic.players[i].winMoney, 0);
            }
        }

        //for(var i = 0; i < XiZach.MAX_PLAYER; i++){
        //    if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
        //        this.playerList[i].showBaiInstance();
        //    }
        //}

        this.clearEndGame();
        this.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(this.hienThiThangThua.bind(this))));
    },

    updateKetQuaXiZach: function(){
        cc.log("scene update XiZach");
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING && XiZach.gameLogic.players[i].needShowCardXiZach){
                XiZach.gameLogic.players[i].hasMoBai = true;
                this.playerList[i].moBai();
                this.playerList[i].stopEffectTime();
                this.playerList[i].danBai();
                this.playerList[i].hideAllText();
            }
        }

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING && XiZach.gameLogic.players[i].needUpdateMoneyXiZach){
                this.playerList[i].addMoney(XiZach.gameLogic.players[i].winMoney, 0);
            }
        }

        //for(var i = 0; i < XiZach.MAX_PLAYER; i++){
        //    if(XiZach.gameLogic.players[i].status == XiZach.GameStatus.PLAYING){
        //        this.playerList[i].showBaiInstance();
        //    }
        //}

        //this.clearEndGame();
    },

    clearEndGame: function(){
        cc.log("clear End Game");
        this.btnRutBai.setEnabled(false);
        this.btnRutBai.setBright(false);
        this.iconMuiTen.setVisible(false);
        this.btnXetTatCa.setVisible(false);
        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.playerList[i].clearEndGame(false);
        }

    },

    hienThiThangThua: function(){
        cc.log("scene hien thi thang thua");
        cc.log(XiZach.gameLogic.tongTienThangThua > 0);
    },

    chiaBaiCuoiGame: function(){
        this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.xylyEndGame.bind(this))));
    },

    xylyEndGame: function(){
        this.clearEndGame();
        this.updateThanhThongBao(XiZach.gameLogic.myBoBaiId);
        this.moBaiCaLang();

        for(var i =0; i < XiZach.GameLogic.MAX_PLAYER; i++){
            if(XiZach.gameLogic.players[i].status == 3 && i != 0){
                this.playerList[i].initWithCards(XiZach.gameLogic.players[i].cards);
            }
        }

        this.numTraThuong = 0;
        this.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(this.traThuong.bind(this))));
    },

    traThuong: function() {
        if (this.numTraThuong < XiZach.gameLogic.rankList.length) {
            // dark
            var chair = XiZach.gameLogic.rankList[this.numTraThuong];

            if(XiZach.gameLogic.players[chair].winMoney > 0){
                for(var i = 0; i < XiZach.MAX_PLAYER; i++){
                    if(i != 0){
                        this.playerList[i].darkCardEndGame();
                    }
                    else{
                        this.playerList[i].darkCard();
                    }
                }
                this.traThuongForPlayer(chair);
                this.numTraThuong++;
                this.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(this.traThuong.bind(this))));
            }
            else{
                this.numTraThuong++;
                this.traThuong.bind(this);
            }
        }
    },

    autoDanh: function(){
        return;
        if(this.btnRutBai.isEnabled() && this.btnRutBai.isVisible()){
            this.onButtonRelease(this.btnRutBai, XiZach.XiZachScene.BTN_RUT_BAI);
            return;
        }

        if(this.btnDanBai.isEnabled() && this.btnDanBai.isVisible()){
            this.onButtonRelease(this.btnDanBai, XiZach.XiZachScene.BTN_DAN_BAI);
            return;
        }

        if(this.btnXetTatCa.isEnabled() && this.btnXetTatCa.isVisible()){
            this.onButtonRelease(this.btnXetTatCa, XiZach.XiZachScene.BTN_XET_BAI_ALL);
            return;
        }
    },

    traThuongForPlayer: function(chair){
        var boBaiMax = XiZach.gameLogic.players[chair].boName;
        cc.log("traThuongForPlayer: " + chair );
        var desPos = this.playerList[chair].uiGold.convertToWorldSpaceAR(cc.p(0,0));
        desPos = this.effectLayer.convertToNodeSpace(desPos);
        var strPos = this.iconVinPot.convertToWorldSpaceAR(cc.p(0,0));
        strPos = this.effectLayer.convertToNodeSpace(strPos);
        // noi bat bai Win;

        if(XiZach.gameLogic.needOpen){
            this.effectLayer.showBoBaiDep(boBaiMax);
            this.playerList[chair].highLightMaxCards();
        }

        this.delay = 0.5;

        var yy = 0;
        var countPos0  = 0;
        var countPos1 = 0;
        var countPos2 = 0;

        for(var i=0; i < 12; i++)
        {
            var desPos2 = cc.p(desPos.x, desPos.y);
            var rand = Math.floor(Math.random()*3);
            if(rand == 0){
                desPos2.x = (rand - 1)*30 + desPos.x;
                desPos2.y = countPos0*6 + desPos.y - 20;
                countPos0++;
                if(countPos0 > 5){
                    continue;
                }
            }
            else if(rand == 1){

                desPos2.x = (rand - 1)*30 + desPos.x;
                desPos2.y = countPos1*6 + desPos.y - 20;
                countPos1++;
                if(countPos1 > 5){
                    continue;
                }
            }
            else if(rand == 2){
                desPos2.x = (rand - 1)*30 + desPos.x;
                desPos2.y = countPos2*6 + desPos.y - 20;
                countPos2++;
                if(countPos2 > 5){
                    continue;
                }
            }

            this.effectLayer.moneyFly(cc.p(strPos.x, strPos.y + yy), desPos2, 1.75, this.delay, false, 5 - this.delay);
            //this.effectLayer.moneyFly(strPos, desPos, 2, this.delay, false);
            this.delay += .075;
            yy++;
        }

        if(XiZach.gameLogic.players[chair].isWiner){
            this.playerList[chair].showWiner();
        }
        this.effectLayer.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.addWiner.bind(this), this, chair)));
        //this.runAction(cc.sequence(cc.delayTime(2) , cc.callFunc(this.traThuong.bind(this))));
    },

    addMoney: function(chair, money){
        this.playerList[chair].addMoney(money, 0.25);
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

    clickBack: function(){
        var pk = new XiZach.CmdSendRequestLeaveGame();
        pk.putData();
        gameWsClient.send(pk);
        pk.clean();
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
        var localChair = XiZach.gameLogic.convertChair(globalChair);
        var player = this.playerList[localChair];
        var pos = player.avatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effectLayer.updateChatRoom(localChair,pos,  image);
    },

    clickBoBai: function(){
        cc.log("click Bo Bai");
        var cmd = new XiZach.CmdSendTakeTurn();
        cmd.putData(1, 0, 0 ,0, 0);
        gameWsClient.send(cmd);
        cmd.clean();
    },


    showBoBai: function(isShow){
        this.bgThongBao.setVisible(false);
        this.lbThongBao.setVisible(false);

    },


    updateThanhThongBao: function(boBaiId) {
        var name = XiZach.GameLogic.getNameBoBai(boBaiId);
        this.lbThongBao.setString(name);
    },

    updateWhenChiaBai: function(){
        cc.log("updateWhenChiaBai");
        XiZach.gameLogic.hasChiaBai = true;
        this.finishChiaBai();

        for(var i = 0; i < XiZach.MAX_PLAYER; i++){
            this.playerList[i].updateWhenChiaBai();
        }
    },

    sendXetBaiAll: function(){
        cc.log("send Xet Bai All");
        if(gameWsClient){
            gameWsClient.sendXetBaiAll();
        }
    },

    sendDanBaiOne: function(chairLocal){
        cc.log("send Xet Bai One: " + chairLocal);
        var chairServer = XiZach.gameLogic.convertToServerChair(chairLocal);

        if(gameWsClient){
            gameWsClient.sendXetBaiOne(chairServer);
        }
    }

});


XiZach.XiZachScene.btnAvatarStartTag = 8099;


XiZach.XiZachScene.aftertag = 8100;
XiZach.XiZachScene.donvitag = 8101;
XiZach.XiZachScene.chuctag = 8102;
XiZach.XiZachScene.layerSamTag = 8111;
XiZach.XiZachScene.layerEndGameTag = 8112;


XiZach.XiZachScene.BTN_CASH = 9008;
XiZach.XiZachScene.BTN_BACK = 9009;
XiZach.XiZachScene.BTN_CHAT = 9010;
XiZach.XiZachScene.BTN_INFO = 9011;
XiZach.XiZachScene.BTN_CHEAT = 9012;
XiZach.XiZachScene.BTN_MOI_CHOI = 9013;
XiZach.XiZachScene.BTN_RUT_BAI = 9014;
XiZach.XiZachScene.BTN_DAN_BAI = 9015;
XiZach.XiZachScene.BTN_XET_BAI_ALL = 9016;
XiZach.XiZachScene.BTN_XET_BAI_TAG = 9020;

XiZach.XiZachScene.aftertag = 9400;
XiZach.XiZachScene.donvitag = 9401;
XiZach.XiZachScene.chuctag = 9402;

XiZach.XiZachScene.instance = null;
XiZach.XiZachScene.getInstance = function(){
    if(XiZach.XiZachScene.instance == null){
        XiZach.XiZachScene.instance = new XiZach.XiZachScene();
        return XiZach.XiZachScene.instance;
    }
}

