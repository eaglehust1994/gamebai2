//


// cc
Lieng.LiengScene = BaseLayer.extend({
    ctor: function () {
        cc.log("Lieng + LiengScene ctor 0");
        this._super();
        this.playerList = [];
        cc.log("Lieng + LiengScene ctor  00 ");
        this.chatLayer = null;
        this.effectLayer = new Lieng.EffectLayer();
        cc.log("Lieng + LiengScene ctor 000");
        this.effectLayer.gameScene = this;
        this.addChild(this.effectLayer);

        this.effectLayer.setLocalZOrder(10);
        this.registerCheckFold = false;
        this.registerFollowAll = false;
        this.minValue = 0;
        this.guiMoiChoi = null;

        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        cc.eventManager.addListener(this.listener, this);

        cc.log("Lieng + LiengScene ctor 1");

      //  this.initWithBinaryFile("res/g_res_cardGame_json_PokerScene.json");
        cc.log("Lieng + LiengScene ctor 2");
        this.customizeGUI2();
        cc.log("Lieng + LiengScene ctor 3");

        this.buyInLayer = new Lieng.BuyInLayer();
        this.buyInLayer.gameScene = this;
        this.addChild(this.buyInLayer);
        this.buyInLayer.setLocalZOrder(12);
        this.buyInLayer.setVisible(false);

        if(CURRENT_MODE != MODE_DEPLOY.LIVE){
            this.cheatLayer =  new CheatLayer();
            this.addChild(this.cheatLayer);
            this.cheatLayer.setVisible(false);
            this.cheatLayer.setLocalZOrder(12);
            this.cheatLayer.setType(GameList.Lieng);
            this.cheatLayer.clear();
        }

        cc.log("Lieng + LiengScene ctor 4");

        this.hasInfoHuVang = false;
        this.raiseValue = 0;
        this.recommendValue = 0;
        this.botAuto = false;
        this.actionChiaBai = null;
        cc.log("Lieng + LiengScene ctor 5");
    },

    customizeGUI2: function () {
        //doSomething
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/Poker/PlistPoker.plist","res/CardGame/Poker/PlistPoker.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        var size = GameScene.getMainContentSize();
        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width/2, size.height / 2);
        touchBtn.setOpacity(0);
        var i;
        var btn;
        this.addSprite(this,"bgPoker",cc.p(640,360),res_CardGame_Poker+ "/bgBanPoker.png");
        this.addSprite(this,"banPoker",cc.p(640.5,333),res_CardGame_Poker+ "/banPoker.png");
        this.addSprite(this,"dealer",cc.p(640,636),res_CardGame_Poker+ "/dealerchuan.png");
        this.addImage(this,"bottomLayer",cc.p(640,36.5),res_CardGame_Poker+"/poker112016-37.png",cc.size(1297,108));
        this.publicCard = [];

        for (var i = 0; i < 5; i++) {
            this.addLayout(this,"publicCards",cc.p(302,269),null,cc.size(0,0),true);
            this.addSprite(this["publicCards"],"publicCard_" + i,cc.p(198 + 73 * i,110));
            this["publicCard_" + i].setName("publicCard_" + i);
            this["publicCard_" + i].setVisible(false);
            //var publicCardPanel = ccui.helper.seekWidgetByName(this._layout, "publicCards");
            //var card = publicCardPanel.getChildByName("publicCard_" + i);
            //card.setVisible(false);
        }
        this.addSprite(this,"cardPosDealer",cc.p(642.5,555.5),res_CardGame_LaBai+"/labai_52.png");
        this.addLayout(this,"leftButtons",cc.p(309,40),null,cc.size(600,70),false);
        this.addButton(this["leftButtons"],"btnPlay1",Lieng.LiengScene.BTN_PLAY_1,cc.p(73.5,50),true,res_CardGame_Poker+"/btnleftBoBai.png",res_CardGame_Poker+"/btnLeftBoBaiLight.png");
        this["btnPlay1"].loadTextureDisabled(res_CardGame_Poker+"/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnPlay1"].setTitleText("CHECK/FOLD");
        this["btnPlay1"].setTitleFontName(fontRobotoBold.fontName);
        this["btnPlay1"].setTitleFontSize(16);
        this.addButton(this["leftButtons"],"btnPlay2",Lieng.LiengScene.BTN_PLAY_2,cc.p(217.5,50),true,res_CardGame_Poker+"/btnLeftNormal.png",res_CardGame_Poker+"/btnLeftLight.png");
        this["btnPlay2"].loadTextureDisabled(res_CardGame_Poker+"/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnPlay2"].setTitleText("FOLLOW");
        this["btnPlay2"].setTitleFontName(fontRobotoBold.fontName);
        this["btnPlay2"].setTitleFontSize(16);
        this.addButton(this["leftButtons"],"btnPlay3",Lieng.LiengScene.BTN_PLAY_3,cc.p(364.5,50),true,res_CardGame_Poker+"/buttonHightlight.png",res_CardGame_Poker+"/btnLeftLight.png");
        this["btnPlay3"].loadTextureDisabled(res_CardGame_Poker+"/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnPlay3"].setTitleText("FOLLOW ALL");
        this["btnPlay3"].setTitleFontName(fontRobotoBold.fontName);
        this["btnPlay3"].setTitleFontSize(16);
        this.addLayout(this,"rightButtons",cc.p(961.5,75.5),null,cc.size(600,70),false);
        this.addButton(this["rightButtons"],"btnBet1",Lieng.LiengScene.BTN_BET_1,cc.p(260,33),true,res_CardGame_Poker+"/btnRightNormal.png",res_CardGame_Poker+"/btnRightLight.png");
        this["btnBet1"].loadTextureDisabled(res_CardGame_Poker+"/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnBet1"].setTitleText("X1");
        this["btnBet1"].setTitleFontName(fontRobotoBold.fontName);
        this["btnBet1"].setTitleFontSize(16);
        this.addButton(this["rightButtons"],"btnBet2",Lieng.LiengScene.BTN_BET_2,cc.p(354,33),true,res_CardGame_Poker+"/btnRightNormal.png",res_CardGame_Poker+"/btnRightLight.png");
        this["btnBet2"].loadTextureDisabled(res_CardGame_Poker+"/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnBet2"].setTitleText("X2");
        this["btnBet2"].setTitleFontName(fontRobotoBold.fontName);
        this["btnBet2"].setTitleFontSize(16);
        this.addButton(this["rightButtons"],"btnBet3",Lieng.LiengScene.BTN_BET_3,cc.p(447,33),false,res_CardGame_Poker+"/btnRightNormal.png",res_CardGame_Poker+"/btnRightLight.png");
        this["btnBet3"].loadTextureDisabled(res_CardGame_Poker+"/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnBet3"].setTitleText("X5");
        this["btnBet3"].setTitleFontName(fontRobotoBold.fontName);
        this["btnBet3"].setTitleFontSize(16);
        this.addButton(this["rightButtons"],"btnBet4",Lieng.LiengScene.BTN_BET_4,cc.p(541,33),false,res_CardGame_Poker+"/btnRightNormal.png",res_CardGame_Poker+"/btnRightLight.png");
        this["btnBet4"].loadTextureDisabled(res_CardGame_Poker+"/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this["btnBet4"].setTitleText("TẤT TAY");
        this["btnBet4"].setTitleFontName(fontRobotoBold.fontName);
        this["btnBet4"].setTitleFontSize(16);
        this.addSprite(this["rightButtons"],"bgThanhBet",cc.p(406,-22),res_CardGame_Poker+"/thanhXam.png");
        this.addSprite(this["rightButtons"],"betAmount",cc.p(127,-22),res_CardGame_Poker+"/betAmount.png");
        this.addText(this["betAmount"],"lbAmountBet",cc.p(55,22),"5000.00M",fontRobotoBold.fontName,14);
        this.addSprite(this["rightButtons"],"thanhHong",cc.p(248,-31),res_CardGame_Poker+"/thanhkeobanchoi.png");
        this["thanhHong"].setAnchorPoint(0,0);
        this.addButton(this["rightButtons"],"btnMinus",Lieng.LiengScene.BTN_MINUS,cc.p(220,-20),false,res_CardGame_Poker+"/btnMinus.png",res_CardGame_Poker+"/btnMinus.png");
        this.addButton(this["rightButtons"],"btnPlus",Lieng.LiengScene.BTN_PLUS,cc.p(593,-20),false,res_CardGame_Poker+"/btnPlus.png",res_CardGame_Poker+"/btnPlus.png");
        this.addImage(this["rightButtons"],"nutKeo",cc.p(550,-22),res_CardGame_Poker+"/poker112016-07.png",cc.size(44,42));
        this.nutKeo.setTouchEnabled(false);
        this.addLayout(this["rightButtons"],"startNode",cc.p(259,-23.5),null,cc.size(20,20),false);
        this["startNode"].setName("minNode");
        this.addLayout(this["rightButtons"],"endNode",cc.p(549,-23.5),null,cc.size(20,20),false);
        this["endNode"].setName("maxNode");
        this.addButton(this,"btnBack",Lieng.LiengScene.BTN_BACK,cc.p(44.5,673),true,res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png");
        this.addButton(this,"btnCheat",Lieng.LiengScene.BTN_CHEAT,cc.p(1083.5,673),true,res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_cash_gamebai.png");
        this.addButton(this,"btnInfo",Lieng.LiengScene.BTN_INFO,cc.p(1157.5,673),true,res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png");
        this.addButton(this,"btnChat",Lieng.LiengScene.BTN_CHAT,cc.p(1231.5,673),true,res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_chat_gamebai.png");
        this.addSprite(this,"iconNetwork",cc.p(1007,667.5),res_CardGame_CommonResource_BanChoi+"/ping_0.png");
        this.addText(this,"muccuoc",cc.p(97.5,640),"Mức cược: 100M",RobotoRegular.fontName,20);
        this["muccuoc"].setAnchorPoint(0,0);
        this.addText(this,"gameId",cc.p(258,677),"9999999999",RobotoRegular.fontName,20);
        this.addText(this,"roomId",cc.p(134,677),"Ban 999",RobotoRegular.fontName,20);
        this.addSprite(this,"potLayer",cc.p(641,486),res_CardGame_Poker+"/thanhBet.png");
        this["potLayer"].setScale(1.3);
        this.addSprite(this["potLayer"],"iconVinPot",cc.p(8.5,19.5),res_Common_Chip+"/vinChip1.png");
        this["iconVinPot"].setScale(0.85);
        this.addText(this["potLayer"],"lbPot",cc.p(56,18),"",RobotoRegular.fontName,12);
        this["lbPot"].setColor(cc.color("#000000"));
        this.addSprite(this,"bgThongBao",cc.p(602,18),res_CardGame_Poker+"/poker112016-04.png");
        this.addText(this["bgThongBao"],"lbThongBao",cc.p(145.5,15),"THÙNG PHÁ SẢNH",fontRobotoBold.fontName,18);
        this.addSprite(this,"Image_3",cc.p(353,381),res_CardGame_Poker+"/logoVinPlay.png");
        this.addSprite(this,"iconGamePoker",cc.p(934,379),res_CardGame_Poker+"/logoPoker.png");
        this.addSprite(this,"iconGameLieng",cc.p(920,383),res_CardGame_Poker+"/logoLieng.png");
        this.addSprite(this,"thanhMessage",cc.p(1051,29),res_CardGame_Poker+"/bangThongBao.png");
        this.addText(this["thanhMessage"],"lbMessage",cc.p(196,28.5),"Nguoi choi XXXXXX gianh thang loi100.000.000 K",RobotoRegular.fontName,20);
        this.addImage(this,"bgWait",cc.p(637,387),res_Common+"/9patch.png",cc.size(500,40));
        this.addText(this["bgWait"],"text",cc.p(254,19.5),"Đang chờ ván mới bắt đầu...",RobotoRegular.fontName,30);
        this["text"].setColor(cc.color("#FFFF00"));
        this.addImage(this,"bgBotPlay",cc.p(641,449),res_Common+"/9patch.png",cc.size(300,40));
        this.addText(this["bgBotPlay"],"text",cc.p(155,18.5),"BOT IS PLAYING",RobotoRegular.fontName,30);
        this["text"].setColor(cc.color("#FFFF00"));
        this.addSprite(this,"iconOmBai",cc.p(641,395),res_CardGame_Poker+"/omBai.png");
        this.addButton(this,"btnShowCard",Lieng.LiengScene.BTN_SHOW_CARD,cc.p(734,57),true,res_CardGame_Poker+"/btnLatBai.png",res_CardGame_Poker+"/btnLatBai.png");
        this["btnShowCard"].setTitleText("Khoe Bài");
        this["btnShowCard"].setTitleFontName(RobotoRegular.fontName);
        this["btnShowCard"].setTitleFontSize(14);
        this.addButton(this,"btnLatBai",Lieng.LiengScene.BTN_LAT_BAI,cc.p(734,57),true,res_CardGame_Poker+"/btnLatBai.png",res_CardGame_Poker+"/btnLatBai.png");
        this["btnLatBai"].setTitleText("LẬT BÀI");
        this["btnLatBai"].setTitleFontName(fontRobotoBold.fontName);
        this["btnLatBai"].setTitleFontSize(16);
        this.addButton(this,"btnStandUp",Lieng.LiengScene.BTN_STAND_UP,cc.p(44.5,603),true,res_CardGame_Poker+"/sitDown.png",res_CardGame_Poker+"/sitDown.png");

        cc.log("Lieng + customizeGui ctor 1");

        var positionPlayer = [cc.p(468.5,171.5),cc.p(233,199),cc.p(83,365),cc.p(186,548),cc.p(383,592),cc.p(886.5,592),cc.p(1091,547),cc.p(1175,366),cc.p(1025,195)];
        var positionbetLayer = [cc.p(47,102),cc.p(167,27),cc.p(163,23),cc.p(164,-41),cc.p(171,-8),cc.p(-55.5,-11),cc.p(-47,-20),cc.p(-49,22),cc.p(-49,26)];
        var positionBlindIcon = [cc.p(136.5,60),cc.p(136.5,123),cc.p(226.5,54),cc.p(163,-70),cc.p(56,-37),cc.p(59,-38),cc.p(-49.5,-55),cc.p(-105,62.5),cc.p(-28.5,128)];
        for(i = Lieng.GameLogic.MAX_PLAYER - 1; i >= 0; i--)
        {
            if(i==0){
                this.addLayout(this,"playerPanel_" + i,positionPlayer[i],null,cc.size(200,120),true);
                this["playerPanel_" + i].setAnchorPoint(0,0);
                this.addLayout(this["playerPanel_" + i],"avatarPanel"+i,cc.p(52.5,17),null,cc.size(0,0),true);
                this["avatarPanel"+i].setName("avatarPanel");
            }else{
                this.addLayout(this,"playerPanel_" + i,positionPlayer[i],null,cc.size(100,100),true);
                this.addLayout(this["playerPanel_" + i],"avatarPanel"+i,cc.p(57,56),null,cc.size(0,0),true);
                this["avatarPanel"+i].setName("avatarPanel");
            }
        }
        for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
            this.addSprite(this["playerPanel_" + i],"betLayer"+i,positionbetLayer[i],res_CardGame_Poker+"/thanhBet.png");
            this["betLayer"+i].setName("betLayer");
            this.addText(this["betLayer"+i],"lbBet"+i,cc.p(56.5,17),"1000.4 K",RobotoRegular.fontName,14);
            this["lbBet"+i].setColor(cc.color("#000000"));
            this["lbBet"+i].setName("lbBet");
            this.addSprite(this["betLayer"+i],"iconVin"+i,cc.p(16.5,17),res_Common_Chip+"/vinChip1.png");
            this["iconVin"+i].setName("iconVin");
            this.addSprite(this["playerPanel_" + i],"blindIcon"+i,positionBlindIcon[i],res_CardGame_Poker+"/dealerIcon.png");
            this["blindIcon"+i].setName("blindIcon");

            // var avatarPanel = ccui.helper.seekWidgetByName(panel, "avatarPanel");
            // var btn = ccui.helper.seekWidgetByName(avatarPanel, "btnAvatar");
            this.addButton(this["avatarPanel"+i],"btnAvatar"+i,1,cc.p(0,0),true,res_Common+"/avatar/Button.png");
            this["btnAvatar"+i].setName("btnAvatar");
            //  btn.setPressedActionEnabled(true);
            //   this["btnAvatar" + i].setTag(Poker.PokerScene.btnAvatarStartTag + i);
            //btn.addTouchEventListener(this.onTouchEventHandler, this);
            this.addSprite(this["avatarPanel"+i],"avatar"+i,cc.p(0,0),res_Common+"/avatar/Avatar_1.png");
            this["avatar"+i].setName("avatar");
            this.addSprite(this["avatarPanel"+i],"bg_progress"+i,cc.p(0,0),res_Common+"/avatar/bg_vongngoai_avatar.png");
            this["bg_progress"+i].setName("bg_progress");
            if(i==0){
                this.addSprite(this["avatarPanel"+i],"iconOut"+i,cc.p(43.5,36),res_CardGame_CommonResource_BanChoi+"/btn_exit_room.png");
                this["iconOut" + i].setName("iconOut");
                this.addSprite(this["avatarPanel"+i],"view"+i,cc.p(-1.5,-22),res_CardGame_CommonResource_BanChoi+"/viewing.png");
                this["view" + i].setName("view");
                this.addSprite(this["avatarPanel"+i],"raseIcon"+i,cc.p(-30,-40),res_CardGame_Poker+"/raiseIcon.png");
                this["raseIcon"+i].setName("raseIcon");
                this.addText(this["raseIcon"+i],"text1"+i,cc.p(27.5,11),"RAISE",RobotoRegular.fontName,14);
                this["text1"+i].setName("text");
                this["text1"+i].setColor(cc.color("#000000"));
                this.addSprite(this["avatarPanel"+i],"allInIcon"+i,cc.p(-30,-40),res_CardGame_Poker+"/allInIcon.png");
                this["allInIcon"+i].setName("allInIcon");
                this.addText(this["allInIcon"+i],"allIn"+i,cc.p(26.5,12),"ALL IN",RobotoRegular.fontName,14);
                this["allIn"+i].setColor(cc.color("#000000"));
                this["allIn"+i].setName("allIn");
                this.addSprite(this["avatarPanel"+i],"callIcon"+i,cc.p(-30,-40),res_CardGame_Poker+"/callIcon.png");
                this["callIcon"+i].setName("callIcon");
                this.addText(this["callIcon"+i],"text"+i,cc.p(27.5,11),"CHECK",RobotoRegular.fontName,14);
                this["text"+i].setName("text");
                this["text"+i].setColor(cc.color("#000000"));
                this.addImage(this["avatarPanel"+i],"bgName"+i,cc.p(-5.5,-76),res_CardGame_CommonResource_BanChoi+"/bgName.png",cc.size(113,44));
                this.addText(this["avatarPanel"+i],"name"+i,cc.p(-5.5,-58.5),"HoangTuanLinh23123122",RobotoRegular.fontName,20);
                this["name"+i].setName("name");
                this["name"+i].setColor(cc.color("#FFFFFF"));
                this.addText(this["avatarPanel"+i],"gold"+i,cc.p(-4,-78),"5.000000000M",fontRobotoBold.fontName,18);
                this["gold"+i].setName("gold");
                this["gold"+i].setColor(cc.color("#FFA500"));
                this.addSprite(this["avatarPanel"+i],"iconWin"+i,cc.p(-3,-33),res_CardGame_Poker+"/chienthang-23.png");
                this["iconWin"+i].setName("iconWin");
                for(var j=1;j<4;j++){
                    this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(161+(j-1)*43,-23),res_CardGame_LaBai+"/labai_22.png");
                    this["card"+j].setAnchorPoint(0,0.5);
                    this["card"+j].setName("card"+j);
                    this["card"+j].setScale(0.85);
                }
            }else{
                this.addImage(this["avatarPanel"+i],"bgName"+i,cc.p(0,-68),res_CardGame_CommonResource_BanChoi+"/bgName.png",cc.size(114,32));
                this.addText(this["avatarPanel"+i],"gold"+i,cc.p(3,-77),"5.0000M",fontRobotoBold.fontName,18);
                this["gold"+i].setName("gold");
                this["gold"+i].setColor(cc.color("#FFA500"));
                this.addText(this["avatarPanel"+i],"name"+i,cc.p(-1.5,-57),"HoangTuanLinh23123122",RobotoRegular.fontName,20);
                this["name"+i].setName("name");
                this["name"+i].setColor(cc.color("#FFFFFF"));
                this.addSprite(this["avatarPanel"+i],"raseIcon"+i,cc.p(-27,-34),res_CardGame_Poker+"/raiseIcon.png");
                this["raseIcon"+i].setName("raseIcon");
                this.addText(this["raseIcon"+i],"text1"+i,cc.p(29.5,11),"RAISE",RobotoRegular.fontName,14);
                this["text1"+i].setColor(cc.color("#000000"));
                this["text1"+i].setName("text");
                this.addSprite(this["avatarPanel"+i],"allInIcon"+i,cc.p(-27,-34),res_CardGame_Poker+"/allInIcon.png");
                this["allInIcon"+i].setName("allInIcon");
                this.addText(this["allInIcon"+i],"allIn"+i,cc.p(29.5,12),"ALL IN",RobotoRegular.fontName,14);
                this["allIn"+i].setColor(cc.color("#000000"));
                this["allIn"+i].setName("allIn");
                this.addSprite(this["avatarPanel"+i],"callIcon"+i,cc.p(-27,-34),res_CardGame_Poker+"/callIcon.png");
                this["callIcon"+i].setName("callIcon");
                this.addText(this["callIcon"+i],"text"+i,cc.p(27.5,10),"CHECK",RobotoRegular.fontName,14);
                this["text"+i].setName("text");
                this["text"+i].setColor(cc.color("#000000"));
                this.addSprite(this["avatarPanel"+i],"iconOut"+i,cc.p(42,40.5),res_CardGame_CommonResource_BanChoi+"/btn_exit_room.png");
                this["iconOut" + i].setName("iconOut");
                this.addSprite(this["avatarPanel"+i],"view"+i,cc.p(-17,-22.5),res_CardGame_CommonResource_BanChoi+"/viewing.png");
                this["view" + i].setName("view");
                this.addSprite(this["avatarPanel"+i],"iconWin"+i,cc.p(-4,-28),res_CardGame_Poker+"/chienthang-23.png");
                this["iconWin"+i].setName("iconWin");
                if(i==1){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(145+j*15,75),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==2){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(145+j*15,65),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==3){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(136+j*15,2),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==4){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(145+j*15,40),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }
                else if(i==5){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(11+j*30,119),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==6){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(-69+j*15,22),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==7){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(-70+j*15,75),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }else if(i==8){
                    for(var j=1;j<4;j++){
                        this.addSprite(this["playerPanel_"+i],"card"+j,cc.p(-75.5+j*15,76),res_CardGame_LaBai+"/labai_22.png");
                        this["card"+j].setName("card"+j);
                        this["card"+j].setScale(0.25);
                    }
                }
                for(var j=1;j<4;j++) {
                    this.addSprite(this["playerPanel_" + i], "cardEndGame" + j, cc.p(12 + j * 30, 118), res_CardGame_LaBai + "/labai_9.png");
                    this["cardEndGame" + j].setName("cardEndGame" + j);
                    this["cardEndGame" + j].setScale(0.5);
                }
            }
            cc.log("display Lieng 1 0");
            //var panel = ccui.Helper.seekWidgetByName(this._layout, "playerPanel_" + i);
            // var avatarPanel = ccui.helper.seekWidgetByName(panel, "avatarPanel");
            //var btn = ccui.helper.seekWidgetByName(avatarPanel, "btnAvatar");
            this["btnAvatar"+i].setPressedActionEnabled(true);
            this["btnAvatar"+ i].setTag(parseInt(Lieng.LiengScene.btnAvatarStartTag) + i);
            this["btnAvatar" + i].addTouchEventListener(this.onTouchEventHandler, this);

            cc.log("display Lieng 1 1");

            var playerDisplay = new Lieng.PlayerDisplay();
            playerDisplay.index = i;
            playerDisplay.gameScene = this;
            this.addChild(playerDisplay);
            playerDisplay.setPanel(this["playerPanel_" + i]);

            if (i == 0) {
                playerDisplay.initMyPlayer();
                playerDisplay.addListenerPlayer();
            }

            playerDisplay.initPlayerDisplay();
            this.playerList.push(playerDisplay);
        }

        //this.btnBack = this.customizeButton("btnBack", Lieng.LiengScene.BTN_BACK);
        //this.btnChat = this.customizeButton("btnChat", Lieng.LiengScene.BTN_CHAT);
        //this.btnInfo = this.customizeButton("btnInfo", Lieng.LiengScene.BTN_INFO);
        //this.btnCheat = this.customizeButton("btnCheat", Lieng.LiengScene.BTN_CHEAT);
        //
        //this.btnChiaBai1 = this.customizeButton("btnChiaBai1", Lieng.LiengScene.BTN_CHIA_BAI_1);
        //this.btnChiaBai2 = this.customizeButton("btnChiaBai2", Lieng.LiengScene.BTN_CHIA_BAI_2);
        //this.btnChiaBai3 = this.customizeButton("btnChiaBai3", Lieng.LiengScene.BTN_CHIA_BAI_3);
        //this.btnChiaBai4 = this.customizeButton("btnChiaBai4", Lieng.LiengScene.BTN_CHIA_BAI_4);
        //cc.log("Lieng + customizeGui ctor 2");
        //
        //this.rightButons = ccui.helper.seekWidgetByName(this._layout, "rightButtons");
        //this.startNode = this.rightButons.getChildByName("minNode");
        //this.endNode = this.rightButons.getChildByName("maxNode");
        //this.nutKeo = this.rightButons.getChildByName("nutKeo");
        ////this.betAmountLayer = ccui.helper.seekWidgetByName(this._layout, "betAmount");
        //
        //
        //this.bottomLayer = ccui.helper.seekWidgetByName(this._layout, "bottomLayer");
        //this.thanhHong = ccui.helper.seekWidgetByName(this._layout, "thanhHong");
        //this.bgThanhBet = ccui.helper.seekWidgetByName(this._layout, "bgThanhBet");
        //cc.log("Lieng + customizeGui 3");
        //
        //this.btnMinus =  this.customizeButton("btnMinus", Lieng.LiengScene.BTN_MINUS, this.rightButons );
        //this.btnPlus =  this.customizeButton("btnPlus", Lieng.LiengScene.BTN_PLUS, this.rightButons);

        if (CURRENT_MODE == MODE_DEPLOY.LIVE){
            this.btnCheat.setVisible(false);
        }

       // this.iconNetwork = ccui.Helper.seekWidgetByName(this._layout, "iconNetwork");
        this.iconNetwork.setVisible(false);

        this.cardDealer = this["cardPosDealer"];
        this.cardPosDealer.setVisible(false);



        //this.leftButons = ccui.helper.seekWidgetByName(this._layout, "leftButtons");

       // this.btnPlay1 = this.customizeButton("btnPlay1", Lieng.LiengScene.BTN_PLAY_1, this.leftButons);
        this.myBtnPlay1 = new BtnPlay2(this.btnPlay1);
      //  this.btnPlay2 = this.customizeButton("btnPlay2", Lieng.LiengScene.BTN_PLAY_2, this.leftButons);
        this.myBtnPlay2 = new BtnPlay2(this.btnPlay2);
     //   this.btnPlay3 = this.customizeButton("btnPlay3", Lieng.LiengScene.BTN_PLAY_3, this.leftButons);
        this.myBtnPlay3 = new BtnPlay2(this.btnPlay3);

        cc.log("Lieng + customizeGui 5");
        //this.btnBet1 = this.customizeButton("btnBet1", Lieng.LiengScene.BTN_BET_1, this.rightButons, true);
        //this.btnBet1.setTitleText("X1");
        //this.btnBet2 = this.customizeButton("btnBet2", Lieng.LiengScene.BTN_BET_2, this.rightButons, true);
        //this.btnBet2.setTitleText("X2");
        //this.btnBet3 = this.customizeButton("btnBet3", Lieng.LiengScene.BTN_BET_3, this.rightButons);
        //this.btnBet3.setTitleText("X5");
        //this.btnBet4 = this.customizeButton("btnBet4", Lieng.LiengScene.BTN_BET_4, this.rightButons);
        //this.btnBet4.setTitleText("TẤT TAY");
       // this.btnShowCard = this.customizeButton("btnShowCard", Lieng.LiengScene.BTN_SHOW_CARD);
        this.btnShowCard.setVisible(false);
        //this.btnShowCard.setTitleText("Khoe Bài");
       // this.btnLatBai = this.customizeButton("btnLatBai", Lieng.LiengScene.BTN_LAT_BAI);
        this.btnLatBai.setVisible(false);

      //  this.btnStandUp = this.customizeButton("btnStandUp", Lieng.LiengScene.BTN_STAND_UP);
        this.btnStandUp.setVisible(true);

     //   this.potLayer = ccui.helper.seekWidgetByName(this._layout, "potLayer");
        this.potLayer.setPositionY(this.potLayer.getPositionY());
      //  this.iconVinPot = ccui.helper.seekWidgetByName(this._layout, "iconVinPot");
      //  this.lbPot = ccui.helper.seekWidgetByName(this._layout, "lbPot");
        this.lbPot.setString("");
        cc.log("Lieng + customizeGui 6");

       // this.lbThongBao = ccui.helper.seekWidgetByName(this._layout, "lbThongBao");
      //  this.bgThongBao = ccui.helper.seekWidgetByName(this._layout, "bgThongBao");
        this.bgThongBao.setVisible(false);

       // this.lbAmountBet = ccui.helper.seekWidgetByName(this._layout, "lbAmountBet");

        //this.thanhMessage = ccui.helper.seekWidgetByName(this._layout, "thanhMessage");
       // this.lbMessage = ccui.helper.seekWidgetByName(this._layout, "lbMessage");
        this.thanhMessage.setVisible(false);
        this.lbMessage.setVisible(false);
      //  this.bgWait = ccui.helper.seekWidgetByName(this._layout, "bgWait");
      //  this.bgBotPlaying = ccui.helper.seekWidgetByName(this._layout, "bgBotPlay");
        this.bgBotPlay.setVisible(false);
        cc.log("PLieng + customizeGui 7");

       // this.iconGamePoker = ccui.helper.seekWidgetByName(this._layout, "iconGamePoker");
       // this.iconGameLieng = ccui.helper.seekWidgetByName(this._layout, "iconGameLieng");
        this.iconGamePoker.setVisible(false);

        //this.btnPlus =  this.customizeButton("btnMinus", Lieng.LiengScene.BTN_PLUS);
       // this.btnMinus = this.customizeButton("btnPlus", Lieng.LiengScene.BTN_MINUS);



        cc.log("Lieng + customizeGui ctor 8");

     //   this.iconOmBai = ccui.helper.seekWidgetByName(this._layout, "iconOmBai");
        this.iconOmBai.setVisible(false);

        this.clearEnterRoom();
    },

    //
    onEnter: function () {
        cc.log("onEnter 1");
        if (menutab)
            menutab.hideAllInfo();
        cc.log("onEnter 2");
        BaseLayer.prototype.onEnter.call(this);
        //this.hasInfoHuVang = false;
        cc.log("LiengScene onEnter 5");
    },

    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();
        var needTouch = true;

        var nutKeo = target.nutKeo;

        if (nutKeo.isVisible() == false) {
            cc.log("onTouchBegan1");
            return false;
        }
        cc.log("onTouchBegan2");
        var localPoint = nutKeo.convertToNodeSpaceAR(point);
        var rect = nutKeo.getContentSize();
        var rect2 = new cc.rect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
        var res =  cc.rectContainsPoint(rect2, localPoint);
        cc.log("res: " + res);
        return res;
    },

    //
    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();
        var nutKeo = target.nutKeo;

        var localPoint = target.convertToNodeSpace(point);
        var maxNode = target.endNode;
        var maxPoint = maxNode.convertToWorldSpace(cc.p(0, 0));
        maxPoint = target.convertToNodeSpace(maxPoint);

        var minNode = target.startNode;
        var minPoint = minNode.convertToWorldSpace(cc.p(0, 0));
        minPoint = target.convertToNodeSpace(minPoint);


        if (localPoint.x >= maxPoint.x) {
            nutKeo.setPositionX(maxPoint.x);
        }
        else if (localPoint.x <= minPoint.x) {
            nutKeo.setPositionX(minPoint.x);
        }
        else {
            nutKeo.setPositionX(localPoint.x);
        }

        var percentage = Math.floor((nutKeo.getPosition().x - minPoint.x) * 100 / (maxPoint.x - minPoint.x)) / 100;
        target.percentage = percentage;
        target.setPercentageThanhBet(percentage);

        target.countRaiseMoney1(percentage);
    },

    onTouchEnded: function (touch, event) {
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        target.countRaiseMoney(target.percentage);
    },
    //hehe

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
        this.guiMoiChoi.updateListItems(data, Lieng.gameLogic.moneyType);
        this.guiMoiChoi.reloadData(data);
    },

    clearEnterRoom: function () {
        this.clearUpdateMatch();
        var isVin = Lieng.gameLogic.moneyType;
        //this.iconVinPot.setTexture("res/common/chip/vinChip" + isVin + ".png");
        GuiUtil.changeSprite(this.iconVinPot,"res/common/chip/vinChip" + isVin + ".png");
        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
            this.playerList[i].iconOutRoom.setVisible(false);
            this.playerList[i].updateEnterRoom();
        }
    },

    updateChangeTurn: function () {
        this.bottomLayer.setOpacity(255);
        this.resetBetButton();
    },

    clearUpdateMatch: function () {
        cc.log("clearUpdateMacth ");
        this.stopAllActions();
        this.btnShowCard.setVisible(false);
        this.btnLatBai.setVisible(false);
        this.iconOmBai.setVisible(false);
        this.effectLayer.hideEffectBoBaiDep();
        this.effectLayer.clearEffectUpdateMatch();
        this.bottomLayer.stopAllActions();

        for (var i = 0; i < this.publicCard.length; i++) {
            this.publicCard[i].runToNormal();
            this.publicCard[i].setVisible(false);
        }

        this.registerCheckFold = false;
        this.registerFollowAll = false;

        this.bottomLayer.setOpacity(150);
        this.myBtnPlay1.setEnable(false);
        this.myBtnPlay2.setEnable(false);
        this.myBtnPlay3.setEnable(false);

        this.resetBetButton();
        this.hideThanhBetAmount();
        this.showBoBai(false);

        this.potLayer.setVisible(false);
        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
            this.playerList[i].clearUpdateMatch();
        }
    },

    clearEndGame: function () {
        cc.log("playerDisplay clearEndGame");
        for (var i = 0; i < 3; i++) {
            this["btnPlay" + (i + 1)].setEnabled(false);
            this["btnPlay" + (i + 1)].setBright(false);
        }
        this.hideThanhBetAmount();

        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
            this.playerList[i].clearEndGame();
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
      //  var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");
        this.gameId.setString("# " + Lieng.gameLogic.gameId);

        this.playerList[0].initWithCards(Lieng.gameLogic.players[0].cards);
        this.playerList[0].hideBai();

        var countNum = 0;
        for (var i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
            if (Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING) {
                countNum++;
            }
        }
        cc.log("countNum: " + countNum);

        var stt = 0;
        this.effectLayer.hideEffectWhenChiaBai();


        cc.log("Lieng.gameLogic.smallBlindChair: " + Lieng.gameLogic.smallBlindChair);

        var chairDealer = Lieng.gameLogic.smallBlindChair;

        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
            var chair = (i + chairDealer)% Lieng.MAX_PLAYER;
            if (Lieng.gameLogic.players[chair].status == Lieng.GameStatus.PLAYING) {
                cc.log("")
                this.effectLayer.chiaBai(this.playerList[chair], countNum, stt);
                stt++;
            }
        }

        var timeChiaBai = Lieng.timeOffsetAppear + Lieng.timeDif*(2*countNum+stt) + Lieng.timeDealOne  + Lieng.timeTransform;
        Lieng.gameLogic.timeOmBai = Lieng.gameLogic.timeChiaBai - timeChiaBai;

        this.actionChiBai = cc.sequence(cc.delayTime(timeChiaBai), cc.callFunc(this.updateWhenChiaBai.bind(this)));
        this.actionChiBai.setTag(1234);
        this.runAction(this.actionChiBai);
    },

    //
    chiaBaiInstance: function () {
        if (Lieng.gameLogic.players[0].status == Lieng.GameStatus.PLAYING) {
            this.playerList[0].chiaBaiInstance(Lieng.gameLogic.players[0].cards);
        }

        for (var i = 1; i < Lieng.GameLogic.MAX_PLAYER; i++) {
            if (Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING) {
                this.playerList[i].chiaBaiInstance();
            }
        }
        Lieng.gameLogic.hasChiaBai = true;

        this.bottomLayer.setOpacity(255);
    },

    onButtonRelease: function (btn, id) {
        cc.log("id: " + id);
        switch (id) {
            case Lieng.LiengScene.BTN_BACK:
                //cc.log("register out room");
                //GameManager.getInstance().backToSelectRoom();
                var pk = new Lieng.CmdSendRequestLeaveGame();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                break;
            case Lieng.LiengScene.BTN_CHEAT:
                cc.log("BTNCHEAT");
                this.cheatLayer.setVisible(true);
                break;
            case Lieng.LiengScene.BTN_CHAT:
                cc.log("BTNCHAT");
                this.onBtnChatClicked();
                break;

            case Lieng.LiengScene.BTN_INFO:
            {
                //this.bgBotPlaying.setVisible(this.botAuto);
                var s = GameManager.getInstance().getHotroLink(GameList.Lieng);
                if(cc.sys.isNative) {
                    if(lobby.open_payment_ios == false){
                        popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                        return;
                    }
                }
                ConnectNative.openWebView(s, false);
            }
                break;

            case Lieng.LiengScene.BTN_MINUS:
            {

            }
                break;

            case Lieng.LiengScene.BTN_PLUS:
            {

            }
                break;
            case Lieng.LiengScene.BTN_PLAY_1:
            {
                cc.log("click play 1");
                var myBtn = this.myBtnPlay1;
                this.clickButton(myBtn);
            }
                break;

            case Lieng.LiengScene.BTN_PLAY_2:
            {
                cc.log("click play 2");
                var myBtn = this.myBtnPlay2;
                this.clickButton(myBtn);
            }
                break;

            case Lieng.LiengScene.BTN_PLAY_3:
            {
                cc.log("click play 3");
                var myBtn = this.myBtnPlay3;
                this.clickButton(myBtn)
            }
                break;

            case Lieng.LiengScene.BTN_BET_1:
            {
                cc.log("click bet 1");

                var temp = Math.min(Lieng.gameLogic.raiseStep + Lieng.gameLogic.maxBet, Lieng.gameLogic.players[0].currentMoney);
                if (temp >= this.minValue) {
                    this.raiseValue = temp;
                    this.btnBet1.loadTextures("res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet2.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet3.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet4.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.addHightLight = true;
                    var percent = 0;
                    if(Lieng.gameLogic.players[0].currentMoney <= 0){
                        percent = 0;
                    }else{
                        percent = (this.raiseValue - this.minValue) / (Lieng.gameLogic.players[0].currentMoney);
                    }

                    percent = Math.ceil(20 * percent) / 20;
                    if (this.minValue >= Lieng.gameLogic.players[0].currentMoney) {
                        percent = 1;
                    }
                    this.setPercentageThanhBet(percent);
                }

                this.kiemTraDanhBai();
            }
                break;

            case Lieng.LiengScene.BTN_BET_2:
            {
                cc.log("click bet 2");

                temp = Math.max(Lieng.gameLogic.bet * 2, Lieng.gameLogic.raiseStep) + Lieng.gameLogic.maxBet;



                if (temp >= this.minValue) {

                    this.raiseValue = temp;
                    var percent = 0;
                    if(Lieng.gameLogic.players[0].currentMoney <= this.minValue){
                        percent = 1;
                    }
                    else{
                        percent = (this.raiseValue - this.minValue) / (Lieng.gameLogic.players[0].currentMoney - this.minValue);
                    }

                    percent = Math.ceil(20 * percent) / 20;
                    this.setPercentageThanhBet(percent);
                    this.addHightLight = true;

                    this.btnBet2.loadTextures("res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet1.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet3.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet4.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                }

                this.kiemTraDanhBai();
            }
                break;

            case Lieng.LiengScene.BTN_BET_3:
            {
                cc.log("click bet 3");
                temp = Math.max(Lieng.gameLogic.bet * 5, Lieng.gameLogic.raiseStep) + Lieng.gameLogic.maxBet;

                if (temp >= this.minValue) {
                    this.raiseValue = temp;
                    var percent = (this.raiseValue - this.minValue) / (Lieng.gameLogic.players[0].currentMoney);
                    percent = Math.ceil(20 * percent) / 20;
                    if (this.minValue >= Lieng.gameLogic.players[0].currentMoney) {
                        percent = 1;
                    }

                    this.setPercentageThanhBet(percent);
                    this.addHightLight = true;

                    this.btnBet3.loadTextures("res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet1.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet2.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet4.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                }
                this.kiemTraDanhBai();
            }
                break;

            case Lieng.LiengScene.BTN_BET_4:
            {
                cc.log("click bet 4");
                var temp = Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet;

                if (temp >= this.minValue) {
                    this.raiseValue = temp;
                    var percent = (this.raiseValue - this.minValue) / (Lieng.gameLogic.players[0].currentMoney);
                    percent = Math.ceil(20 * percent) / 20;
                    if (this.minValue >= Lieng.gameLogic.players[0].currentMoney) {
                        percent = 1;
                    }
                    this.setPercentageThanhBet(percent);
                    this.addHightLight = true;

                    this.btnBet4.loadTextures("res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet1.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet2.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                    this.btnBet3.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
                }
                this.kiemTraDanhBai();
            }
                break;

            case Lieng.LiengScene.BTN_SHOW_CARD:{
                cc.log("click show Card");
                cc.log("show card");
                if(gameWsClient){
                    gameWsClient.sendShowCard();
                }
                this.btnShowCard.setVisible(false);
            }
                break;
            case Lieng.LiengScene.BTN_LAT_BAI:{
                cc.log("click btn show card");
                this.addLatBaiLayer();
            }
                break;

            case Lieng.LiengScene.BTN_STAND_UP:{
                cc.log("click btn stand up");
                if(gameWsClient){
                    gameWsClient.sendStandUp();
                }
            }
                break;

            case Lieng.LiengScene.BTN_MOI_CHOI:{
                cc.log("click btn moiChoi");
                if(gameWsClient){
                    gameWsClient.sendGetInfoMoiChoi();
                }
            }
                break;
        }
    },

    resetBetButton: function () {
        this.btnBet2.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet1.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet3.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
        this.btnBet4.loadTextures("res/CardGame/Poker/btnRightNormal.png", "res/CardGame/Poker/btnRightLight.png", "res/CardGame/Poker/btnRightDisable.png",ccui.Widget.PLIST_TEXTURE);
    },

    clickButton: function (myBtn) {
        this.addHightLight = false;
        switch (myBtn.actionState) {
            case Lieng.ButtonState.FOLD:
            {
                myBtn.setEnable(false);
                myBtn.btn.loadTextures("res/CardGame/Poker/btnLeftBoBaiLight.png", "res/CardGame/Poker/btnLeftBoBaiLight.png", "res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.clickBoBai();
            }
                break;

            case Lieng.ButtonState.CHECK:
            {
                myBtn.setEnable(false);
                myBtn.btn.loadTextures("res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.clickCheckBai();
            }
                break;

            case Lieng.ButtonState.CALL:
            {
                myBtn.setEnable(false);
                myBtn.btn.loadTextures("res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.clickCallBai();
            }
                break;

            case Lieng.ButtonState.RAISE:
            {
                myBtn.setEnable(false);
                myBtn.btn.loadTextures("res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.clickRaiseBai();
            }
                break;

            case Lieng.ButtonState.ALLIN:
            {
                myBtn.setEnable(false);
                //myBtn.btn.loadTextures("res/CardGame/Lieng/btnLeftLight.png", "res/CardGame/Lieng/btnLeftLight.png", "res/CardGame/Lieng/btnRightDisable.png");
                this.clickAllInBai();
            }
                break;

            case Lieng.ButtonState.CHECK_FOLD:
            {
                this.clickCheckFold();
                if (!this.inBetTime) {
                    this.myBtnPlay3.setState(Lieng.ButtonState.FOLLOW_ALL);
                }
            }
                break;

            case Lieng.ButtonState.CHECK_FOLD_X:
            {
                this.clickCheckFoldX();
            }
                break;
            case Lieng.ButtonState.FOLLOW_ALL:
            {
                this.clickFollowAll();
                if (!this.inBetTime) {
                    this.myBtnPlay1.setState(Lieng.ButtonState.CHECK_FOLD);
                }
            }
                break;
            case Lieng.ButtonState.FOLLOW_ALL_X:
            {
                this.clickFollowAllX();
            }
                break;
        }
        myBtn.clickButton();

    },

    onUpdateGui: function (data) {
        var i;

        if(Lieng.gameLogic.players[0].status == Lieng.GameStatus.VIEWING || Lieng.gameLogic.players[0].status == Lieng.GameStatus.SITTING){
            this.bgWait.setVisible(true);
        }
        else{
            this.bgWait.setVisible(false);
        }

        switch (Lieng.gameLogic.gameState) {
            case Lieng.GameState.JOIN_ROOM:
            {
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
                //var muccuoc = ccui.Helper.seekWidgetByName(this._layout, "muccuoc");
                //var ban = ccui.Helper.seekWidgetByName(this._layout, "roomId");
                //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn: " + Lieng.gameLogic.roomId);
                this.gameId.setString("# " + Lieng.gameLogic.gameId);

                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(Lieng.gameLogic.bet));

                if (this.chip) {
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + Lieng.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width + this.chip.getContentSize().width * 0.5 +10, this.muccuoc.getPositionY() + 10);

                //for(var i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++){
                //}
                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }

                this.buyInLayer.show();
            }
                break;

            case Lieng.GameState.GAME_INFO:
            {
                //var muccuoc = ccui.Helper.seekWidgetByName(this._layout, "muccuoc");
                //var ban = ccui.Helper.seekWidgetByName(this._layout, "roomId");
                //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn: " + Lieng.gameLogic.roomId);
                this.gameId.setString("# " + Lieng.gameLogic.gameId);

                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(Lieng.gameLogic.bet));

                if (this.chip) {
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + Lieng.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width + this.chip.getContentSize().width * 0.5+10, this.muccuoc.getPositionY() +10);


                if (Lieng.gameLogic.potAmount > 0) {
                    this.lbPot.setString(StringUtility.standartNumber(Lieng.gameLogic.potAmount));
                    this.potLayer.setVisible(true);
                }

                for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
                    this.playerList[i].showBetLayer();
                }

                this.dealerChair = Lieng.gameLogic.dealerChair;
                this.smallBlindChair = Lieng.gameLogic.smallBlindChair;
                this.bigBlindChair = Lieng.gameLogic.bigBlindChair;

                // add code Lieng release
                switch (Lieng.gameLogic.gameServerState) {
                    case 1:  // dang choi
                    {
                        for (i = 1; i < Lieng.MAX_PLAYER; i++) {
                            if (Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING) {
                                this.playerList[i].cardList[0].setVisible(true);
                                this.playerList[i].cardList[1].setVisible(true);
                            }
                        }
                        if (Lieng.gameLogic.myCards.length > 0) {
                            // chia bai;
                            this.chiaBaiInstance();
                        }

                        var localChairTurn = Lieng.gameLogic.currentActiveChair;
                        this.playerList[localChairTurn].addEffectTime(Lieng.gameLogic.countDownTime, Lieng.gameLogic.countDownTime);


                        if (Lieng.gameLogic.roundId > 0){
                            this.potLayer.setVisible(true);
                            this.lbAmountBet.setString(StringUtility.rutGonNumBer(Lieng.gameLogic.potAmount));
                        }

                        this.updateChangeTurn();
                        this.addHightLight = false;

                        cc.log("maxBet: " + Lieng.gameLogic.maxBet + " " + Lieng.gameLogic.raiseStep);
                        this.bottomLayer.setOpacity(255);

                        if (localChairTurn == 0) {
                            this.inBetTime = true;
                        }
                        else {
                            this.inBetTime = false;
                        }

                        this.minValue = Lieng.gameLogic.maxBet + Lieng.gameLogic.raiseStep;
                        this.raiseValue = this.minValue;

                        this.kiemTraDanhBai();

                        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
                            if (Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING) {
                                if (Lieng.gameLogic.players[i].hasFold == true) {
                                    this.playerList[i].addActionInstance(Lieng.GameAction.FOLD);
                                }
                                else if (Lieng.gameLogic.players[i].hasAllIn == true) {
                                    this.playerList[i].addActionInstance(Lieng.GameAction.ALLIN);
                                }
                            }

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

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }

                this.playerList[0].canTouch = false;
                this.buyInLayer.close();
            }
                break;

            case Lieng.GameState.NEW_USER_JOIN_ROOM:
            {
                var chair = Lieng.gameLogic.convertChair(data.chair);
                this.playerList[chair].iconOutRoom.setVisible(false);
                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;

            case Lieng.GameState.USER_LEAVE_ROOM:
            {
                this.playerList[Lieng.gameLogic.activeLocalChair].updateWithPlayer(Lieng.gameLogic.players[Lieng.gameLogic.activeLocalChair]);

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }

                if (Lieng.gameLogic.activeLocalChair == 0) {
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }


            }
                break;

            case Lieng.GameState.NOTIFY_OUT_ROOM:
            {
                cc.log("notify out room");
                this.playerList[Lieng.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if (Lieng.gameLogic.convertChair(data.outChair) == 0) {
                    var stringNotify;
                    if (data.isOutRoom) {
                        stringNotify = "Bạn đã đăng ký rời phòng thành công."
                    } else {
                        stringNotify = "Bạn đã hủy đăng ký rời phòng."
                    }
                    GameToast.makeToast(2, stringNotify, this.effectLayer);
                }

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;

            case Lieng.GameState.TAKE_TURN:
            {
                cc.log("take Turn");
                var activeChair = Lieng.gameLogic.convertChair(data.actionChair);
                if (data.action != Lieng.GameAction.FOLD && data.action != Lieng.GameAction.CHECK) {
                    this.playerList[activeChair].addBetMoney(data.currentBet);
                }

                for (i = 0; i < Lieng.MAX_PLAYER; i++) {
                    this.playerList[i].stopEffectTime();
                }

                this.playerList[activeChair].addAction(data.action);

                if (activeChair == 0) {
                    this.inBetTime = false;
                    this.addHightLight = false;
                }
                else {
                }

                this.kiemTraDanhBai();

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;

            case Lieng.GameState.SELECT_DEALER:
            {
                cc.log("select Dealer");
                this.clearUpdateMatch();
                this.resetWhenSelectDealer();
                this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.addTienGa.bind(this))));
                //
                cc.log("maxBet: " + Lieng.gameLogic.maxBet + " " + Lieng.gameLogic.raiseStep);
                this.raiseValue = Lieng.gameLogic.maxBet + Lieng.gameLogic.raiseStep;
                //this.kiemTraDanhBai();

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                    this.playerList[i].updateWhenSelectDealer();
                }

               // var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");
                this.gameId.setString("# "+ Lieng.gameLogic.gameId);
                this.playerList[0].canTouch = false;
                this.btnLatBai.setVisible(false);

            }
                break;

            case Lieng.GameState.CHANGE_TURN:
            {
               cc.log("change turn");
                var i = 0;
                //var activeChair = Lieng.gameLogic.convertChair(data.currentActionChair)
                for (i = 0; i < Lieng.MAX_PLAYER; i++) {
                    this.playerList[i].stopEffectTime();
                }

                this.updateChangeTurn();
                this.addHightLight = false;
                this.playerList[Lieng.gameLogic.currentActiveChair].addEffectTime(data.betTime);
                //cc.log("maxBet: " + Lieng.gameLogic.maxBet + " " + Lieng.gameLogic.raiseStep);
                this.bottomLayer.setOpacity(255);
                var actionChiaBai = this.getActionByTag(1234);
                if(actionChiaBai){
                    cc.log("stopActionByTag");
                    this.stopActionByTag(1234);
                    if(Lieng.gameLogic.hasChiaBai == false){
                        cc.log("chia Bai Instance");
                        this.effectLayer.clearEffectChiaBai();
                    }
                }

                if(Lieng.gameLogic.hasChiaBai == false){
                    cc.log("chiaBai Instance bt");
                    this.effectLayer.clearEffectChiaBai();
                    if(Lieng.gameLogic.players[0].status == Lieng.GameStatus.PLAYING){
                        this.chiaBaiInstance();
                    }
                }

                if (Lieng.gameLogic.currentActiveChair == 0) {
                    if(this.playerList[0].canTouch == true){
                        this.btnLatBai.setVisible(true);
                    }
                    this.inBetTime = true;
                    this.playerList[0].canTouch = false;
                    this.playerList[0].resetCardPosition();
                    this.iconOmBai.setVisible(false);
                    this.nanBaiTimeUp();
                }
                else {
                    if(this.playerList[0].canTouch == true){
                        cc.log("latBai");
                        this.btnLatBai.setVisible(true);
                    }
                    this.playerList[0].canTouch = false;
                    this.playerList[0].resetCardPosition();
                    this.iconOmBai.setVisible(false);



                    this.inBetTime = false;
                }

                this.minValue = Lieng.gameLogic.maxBet + Lieng.gameLogic.raiseStep;
                cc.log("minValue: " + this.minValue + " maxBet: " + Lieng.gameLogic.maxBet +  " raiseStep: " + Lieng.gameLogic.lastRaise);
                this.recommendValue = Lieng.gameLogic.maxBet + Lieng.gameLogic.lastRaise;


                var recommendValue = this.recommendValue;
                this.raiseValue = this.minValue;

                 cc.log("curentMoney: " + Lieng.gameLogic.players[0].currentMoney + " currentBet: " + Lieng.gameLogic.players[0].currentBet);
                if(Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet >= recommendValue && recommendValue > this.minValue){
                    cc.log("recommend");
                    this.raiseValue = this.recommendValue;
                }


                var percent = 0;
                if(Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet <= this.minValue){
                    percent = 1;
                }
                else{
                    percent = (this.raiseValue - this.minValue) / (Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet - this.minValue);
                }

                percent = Math.ceil(20 * percent) / 20;

                this.setPercentageThanhBet(percent);
                this.kiemTraDanhBai();

                if(this.inBetTime && this.botAuto){
                    this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.botDanhBai.bind(this))));
                }

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
                Lieng.gameLogic.gameState = Lieng.GameState.NONE;
            }
                break;

            case Lieng.GameState.BUY_IN:
            {
                var i = 0;
                var activeChair = 0;
                Lieng.gameLogic.gameState = Lieng.GameState.NONE;
                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
                this.standUp(false);
            }
                break;

            case Lieng.GameState.DEAL_CARD:
            {
                this.updateThanhThongBao(Lieng.gameLogic.myBoBaiId);
                this.chiaBai();

                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;

            case Lieng.GameState.END_GAME:
            {
                this.nanBaiTimeUp();
                this.endGame();
            }
                break;

            case Lieng.GameState.UPDATE_MATCH:
            {
                cc.log("onUpdateGui: ");
                this.clearUpdateMatch();
                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].inGamePlayer = false;
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;
            case Lieng.GameState.SHOW_CARD:
            {
                cc.log("onUpdateGui: ");
                var chairShow = Lieng.gameLogic.showCardChair;
                cc.log("lieng scene show card: " + chairShow );
                if(chairShow != 0){
                    this.playerList[chairShow].moCard(Lieng.gameLogic.players[chairShow].cards);
                }
            }
                break;

            case Lieng.GameState.LAT_BAI:
            {
                var chairShow = Lieng.gameLogic.showCardChair;
                cc.log("lieng scene lat bai: " + chairShow );
                if(chairShow != 0){
                    this.playerList[chairShow].moCard(Lieng.gameLogic.players[chairShow].cards);
                }

            }
                break;
            case Lieng.GameState.NOTIFY_BUY_IN:
            {
                var cur = 0;
                if(Lieng.gameLogic.moneyType == MONEY_VIN){
                    cur = lobby.userInfo.vinTotal;
                }
                else{
                    cur = lobby.userInfo.xuTotal;
                }

                if(cur >= Lieng.gameLogic.bet*Lieng.gameLogic.minBuyInTiLe){
                    if(!this.buyInLayer){
                        cc.log("init buyinLayer");
                        this.buyInLayer = new Lieng.BuyInLayer();
                        this.buyInLayer.gameScene = this;
                        this.addChild(this.buyInLayer);
                        this.buyInLayer.setLocalZOrder(12);
                        this.buyInLayer.setVisible(false);
                    }

                    this.btnStandUp.setEnabled(false);
                    this.buyInLayer.show();
                }
                for (i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].updateWithPlayer(Lieng.gameLogic.players[i]);
                }
            }
                break;

            case Lieng.GameState.STAND_UP:
            {
                cc.log("isUp: " + data.isUp);
                this.standUp(data.isUp);
                if(data.isUp){
                    GameToast.makeToast(2, "Đăng ký mua vào thành công", this.effectLayer);
                }
                else{
                    GameToast.makeToast(2, "Bạn đã hủy đăng ký mua vào ", this.effectLayer);
                }
            }
                break;
        }
    },

    botDanhBai: function(){
        return;
        var kk = Math.floor(Math.random()*18);
        if(kk >= 1 && this.btnPlay2.isEnabled()){
            this.onButtonRelease(this.btnPlay2, Lieng.LiengScene.BTN_PLAY_2);
        }
        else if(this.btnPlay3.isEnabled()){
            this.onButtonRelease(this.btnPlay3, Lieng.LiengScene.BTN_PLAY_3);
        }
        else{
            this.clickBoBai();
        }
    },

    resetAllBetLayer: function(){
        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            this.playerList[i].resetBetLayer();
        }
    },

    standUp: function(isUp){
        if(isUp){
            this.btnStandUp.loadTextures("res/CardGame/Poker/standUp.png", "res/CardGame/Poker/standUp.png", "res/CardGame/Poker/standUp.png",ccui.Widget.PLIST_TEXTURE);

            // standUp
        }
        else if(!isUp){
            this.btnStandUp.loadTextures("res/CardGame/Poker/sitDown.png", "res/CardGame/Poker/sitDown.png", "res/CardGame/Poker/sitDown.png",ccui.Widget.PLIST_TEXTURE);

        }
    },

    setPotMoney: function(){
        cc.log("setPotMoney");
        var pot = Lieng.gameLogic.potAmount;
        this.lbPot.setString("" + StringUtility.standartNumber(pot));
        this.lbPot.setColor({r:0, g:0, b:0});

        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            this.playerList[i].resetBetLayer();
        }
    },

    startOmBai: function(timeOmBai){
        this.playerList[0].canTouch = true;
        this.iconOmBai.setVisible(true);

        for (var i = 0; i < Lieng.MAX_PLAYER; i++) {
            this.playerList[i].stopEffectTime();
            if(Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING){
                this.playerList[i].addEffectTime(timeOmBai);
            }
        }
    },

    countRaiseMoney1: function(percentage){
        if(this.minValue >= Lieng.gameLogic.players[0].currentMoney +  Lieng.gameLogic.players[0].currentBet){
            cc.log("kkakak");
            cc.log("this.minValue" + this.minValue + " " + Lieng.gameLogic.players[0].currentMoney + " " +  Lieng.gameLogic.players[0].currentBet);

            this.raiseValue = this.minValue;
            this.kiemTraDanhBai();
            return;
        }

        if(percentage < 0){
            percentage = 0;
        }

        if(percentage > 0.98){
            percentage = 1;
        }

        if(percentage == 1){
            this.raiseValue = Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet;
        }
        else{
            if(this.currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue > Lieng.gameLogic.minBuyInTiLe*Lieng.gameLogic.bet){
                if(percentage < 0.5){
                    this.raiseValue = Math.floor(0.25*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue)*(0.5 - percentage)) + this.minValue;
                }
                else if(percentage < 0.75){
                    this.raiseValue = Math.floor((0.25 + ((percentage - 0.5) )*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue))) + this.minValue;
                }
                else if(percentage < 1){
                    this.raiseValue = Math.floor((0.5 + percentage - 0.75)*(Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet - this.minValue)) + this.minValue;
                }
            }
            else{
                this.raiseValue =  Math.floor((percentage)*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue)) + this.minValue;
            }

            this.raiseValue = this.raiseValue - this.raiseValue % (Lieng.gameLogic.bet);
        }

        this.kiemTraDanhBai();
    },

    countRaiseMoney: function(percentage){

        if(this.minValue >= Lieng.gameLogic.players[0].currentMoney +  Lieng.gameLogic.players[0].currentBet){
            cc.log("kkakak");
            cc.log("this.minValue" + this.minValue + " " + Lieng.gameLogic.players[0].currentMoney + " " +  Lieng.gameLogic.players[0].currentBet);

            this.raiseValue = this.minValue;
            this.kiemTraDanhBai();
            return;
        }

        if(percentage < 0){
            percentage = 0;
        }

        if(percentage > 0.98){
            percentage = 1;
        }

        if(percentage == 1){
            this.raiseValue = Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet;
        }
        else{
            if(this.currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue > Lieng.gameLogic.minBuyInTiLe*Lieng.gameLogic.bet){
                if(percentage < 0.5){
                    this.raiseValue = Math.floor(0.25*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue)*(0.5 - percentage)) + this.minValue;
                }
                else if(percentage < 0.75){
                    this.raiseValue = Math.floor((0.25 + ((percentage - 0.5) )*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue))) + this.minValue;
                }
                else if(percentage < 1){
                    this.raiseValue = Math.floor((0.5 + percentage - 0.75)*(Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet - this.minValue)) + this.minValue;
                }
            }
            else{
                this.raiseValue =  Math.floor((percentage)*(Lieng.gameLogic.players[0].currentMoney  + Lieng.gameLogic.players[0].currentBet - this.minValue)) + this.minValue;
            }

            this.raiseValue = this.raiseValue - this.raiseValue % (Lieng.gameLogic.bet);
        }

        this.kiemTraDanhBai();
    },

    kiemTraDanhBai: function(){
        cc.log("kiem Tra danh Bai");
        if(Lieng.gameLogic.players[0].status != Lieng.GameStatus.PLAYING){
            this.myBtnPlay1.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay2.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay3.setState(Lieng.ButtonState.DISABLE);
            this.hideThanhBetAmount();
            this.showBoBai(false);
            return;
        }

        if(Lieng.gameLogic.players[0].hasBoBai){
            this.myBtnPlay1.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay2.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay3.setState(Lieng.ButtonState.DISABLE);
            this.hideThanhBetAmount();
            return;
        }

        if(Lieng.gameLogic.players[0].hasAllIn){
            this.myBtnPlay1.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay2.setState(Lieng.ButtonState.DISABLE);
            this.myBtnPlay3.setState(Lieng.ButtonState.ALLIN);
            this.myBtnPlay3.btn.setEnabled(false);
            this.hideThanhBetAmount();
            return;
        }


        cc.log("setEnable");
        this.myBtnPlay1.setEnable(true);
        this.myBtnPlay1.setEnable(true);
        this.myBtnPlay3.setEnable(true);

        if(this.inBetTime){
            this.showThanhBetAmount();

            this.setBetAmount(StringUtility.standartNumber(Math.min(this.raiseValue, Lieng.gameLogic.players[0].currentMoney + Lieng.gameLogic.players[0].currentBet) - Lieng.gameLogic.players[0].currentBet));

            this.myBtnPlay1.setState(Lieng.ButtonState.FOLD);

            if(Lieng.gameLogic.maxBet == Lieng.gameLogic.players[0].currentBet){
                this.myBtnPlay2.setState(Lieng.ButtonState.CHECK);
            }
            else if(Lieng.gameLogic.maxBet - Lieng.gameLogic.players[0].currentBet >= Lieng.gameLogic.players[0].currentMoney){
                cc.log("Lieng.gameLogic.maxBet" + Lieng.gameLogic.maxBet + " " +  Lieng.gameLogic.players[0].currentBet + " " + Lieng.gameLogic.players[0].currentMoney);
                this.myBtnPlay2.setState(Lieng.ButtonState.DISABLE);
                this.myBtnPlay3.setState(Lieng.ButtonState.ALLIN);
                this.lbAmountBet.setString("TẤT TAY");
                this.myBtnPlay3.hightLight();
                this.setPercentageThanhBet(1);
            }else{
                this.myBtnPlay2.setState(Lieng.ButtonState.CALL, StringUtility.rutGonNumBer(Lieng.gameLogic.maxBet - Lieng.gameLogic.players[0].currentBet));
            }

            if(this.raiseValue - Lieng.gameLogic.players[0].currentBet >= Lieng.gameLogic.players[0].currentMoney){
                cc.log("Lieng.gameLogic.maxBet2: " + this.raiseValue  + " " +  Lieng.gameLogic.players[0].currentBet + " " + Lieng.gameLogic.players[0].currentMoney);
                this.myBtnPlay3.setState(Lieng.ButtonState.ALLIN);
                this.lbAmountBet.setString("TẤT TAY");
                this.myBtnPlay3.hightLight();
                this.setPercentageThanhBet(1);
            }
            else if(Lieng.gameLogic.raiseBlock){
                this.myBtnPlay3.setState(Lieng.ButtonState.ALLIN);
                this.lbAmountBet.setString("TẤT TAY");
                this.myBtnPlay3.hightLight();
                this.setPercentageThanhBet(1);
            }
            else{
                cc.log("this.raiseValue: " + this.raiseValue + "currentBet" + Lieng.gameLogic.players[0].currentBet);
                this.myBtnPlay3.setState(Lieng.ButtonState.RAISE, StringUtility.rutGonNumBer(this.raiseValue - Lieng.gameLogic.players[0].currentBet));
            }

            if(this.addHightLight){
                this.myBtnPlay3.hightLight();
            }

            if(this.registerCheckFold == true){
                this.registerCheckFold = false;
                if(this.myBtnPlay2.actionState != Lieng.ButtonState.CHECK){
                    this.clickBoBai();
                }
                else{
                    this.onButtonRelease(this.btnPlay2, Lieng.LiengScene.BTN_PLAY_2);
                }
                return;
            }

            if(this.registerFollowAll == true){
                this.registerFollowAll = false;

                if(this.myBtnPlay2.actionState == Lieng.ButtonState.DISABLE && this.myBtnPlay3.actionState == Lieng.ButtonState.ALLIN){
                    this.onButtonRelease(this.btnPlay3, Lieng.LiengScene.BTN_PLAY_3);
                }
                else if(this.myBtnPlay2.actionState == Lieng.ButtonState.CHECK){
                    this.onButtonRelease(this.btnPlay2, Lieng.LiengScene.BTN_PLAY_2);
                }
                else if(this.myBtnPlay2.actionState == Lieng.ButtonState.CALL){
                    this.onButtonRelease(this.btnPlay2, Lieng.LiengScene.BTN_PLAY_2);
                }
                return;
            }
        }
        else{
            this.hideThanhBetAmount();

            if(this.registerCheckFold == false){
                cc.log("set check fold");
                this.myBtnPlay1.setState(Lieng.ButtonState.CHECK_FOLD);
            }
            else if(this.registerCheckFold == true){
                cc.log("set check fold x");
                this.myBtnPlay1.setState(Lieng.ButtonState.CHECK_FOLD_X);
            }

            if(this.registerFollowAll == false){
                cc.log("set followAll");
                this.myBtnPlay3.setState(Lieng.ButtonState.FOLLOW_ALL);
            }
            else if(this.registerFollowAll == true){
                cc.log("set followAll X");
                this.myBtnPlay3.setState(Lieng.ButtonState.FOLLOW_ALL_X);
            }
            this.myBtnPlay2.setState(Lieng.ButtonState.DISABLE);
        }
    },

    moBaiCaLang: function(){
        if(Lieng.gameLogic.needOpen){
            for(var i = 0; i < Lieng.GameLogic.MAX_PLAYER; i++){
                if(Lieng.gameLogic.players[i].status == 3 && (Lieng.gameLogic.players[i].hasBoBai == false)){
                    this.playerList[i].moBai();
                }
            }
        }

        if(Lieng.gameLogic.canShowCard){
            cc.log("Lieng gameLogic can show card");
            this.btnShowCard.setVisible(true);
            this.btnShowCard.setOpacity(255);
            this.btnShowCard.runAction(cc.sequence(cc.fadeIn(0.15), cc.delayTime(5), cc.hide()));
        }
    },

    setPercentageThanhBet: function(percent){
        cc.log("setPercent: " + percent);
        this.thanhHong.setScaleX(percent);
        var minPos = this.startNode.x;
        var maxPos = this.endNode.x;
        this.nutKeo.setPositionX(minPos + (maxPos - minPos)*percent);
    },

    setBetAmount: function(money){
        this.lbAmountBet.setString(StringUtility.rutGonNumBer(money));
    },

    showMaxCard: function(){
        for(var i = 0; i < Lieng.gameLogic.myCards.length; i++){
            for(var j = 0; j < Lieng.gameLogic.players[0].maxCards.length; j++)
                if(Lieng.gameLogic.myCards[i].id == Lieng.gameLogic.players[j].maxCards[j].id){
                    this.playerList[0].card[i].runAction(cc.sequence(cc.scaleBy(0.2, 1.25) , cc.scaleBy(0.2, 1.25).repeatForever()));
                }
        }

        for(var i = 0; i < Lieng.gameLogic.publicCard.length; i++){
            for(var j = 0; j < Lieng.gameLogic.players[0].maxCards.length; j++)
                if(Lieng.gameLogic.publicCard[i].id == Lieng.gameLogic.players[j].maxCards[j].id){
                    this.publicCard[i].runAction(cc.sequence(cc.scaleBy(0.2, 1.25) , cc.scaleBy(0.2, 1.25).repeatForever()));
                }
        }
    },
    //
    endGame: function(){
        //Dau Tien la mo bai moi thang trong van choi
        this.btnLatBai.setVisible(false);
        this.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(this.chiaBaiCuoiGame.bind(this))));
    },

    chiaBaiCuoiGame: function(){
        this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.xylyEndGame.bind(this))));
    },

    xylyEndGame: function(){
        this.clearEndGame();
        this.updateThanhThongBao(Lieng.gameLogic.myBoBaiId);
        this.moBaiCaLang();

        for(var i =0; i < Lieng.GameLogic.MAX_PLAYER; i++){
            if(Lieng.gameLogic.players[i].status == 3 && i != 0){
                this.playerList[i].initWithCards(Lieng.gameLogic.players[i].cards);
            }
        }

        this.numTraThuong = 0;
        this.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(this.traThuong.bind(this))));
    },

    traThuong: function() {
        if (this.numTraThuong < Lieng.gameLogic.rankList.length) {
            // dark
            var chair = Lieng.gameLogic.rankList[this.numTraThuong];

            if(Lieng.gameLogic.players[chair].winMoney > 0){
                for(var i = 0; i < Lieng.MAX_PLAYER; i++){
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

    traThuongForPlayer: function(chair){
        var boBaiMax = Lieng.gameLogic.players[chair].boName;
        cc.log("traThuongForPlayer: " + chair );
        var desPos = this.playerList[chair].uiGold.convertToWorldSpaceAR(cc.p(0,0));
        desPos = this.effectLayer.convertToNodeSpace(desPos);
        var strPos = this.iconVinPot.convertToWorldSpaceAR(cc.p(0,0));
        strPos = this.effectLayer.convertToNodeSpace(strPos);
        // noi bat bai Win;

        if(Lieng.gameLogic.needOpen){
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

        if(Lieng.gameLogic.players[chair].isWiner){
            this.playerList[chair].showWiner();
        }
        this.effectLayer.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.addWiner.bind(this), this, chair)));
        //this.runAction(cc.sequence(cc.delayTime(2) , cc.callFunc(this.traThuong.bind(this))));
    },

    addWiner: function(target, chair){
        this.playerList[chair].addMoney(Lieng.gameLogic.players[chair].winMoney, 0.25);
        Lieng.gameLogic.currentPot = Lieng.gameLogic.currentPot - Lieng.gameLogic.players[chair].winMoney;
        //this.lbPot.setString("" + Lieng.gameLogic.currentPot);
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
        var pk = new Lieng.CmdSendRequestLeaveGame();
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
        var localChair = Lieng.gameLogic.convertChair(globalChair);
        var player = this.playerList[localChair];
        var pos = player.avatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effectLayer.updateChatRoom(localChair,pos,  image);
    },

    clickBoBai: function(){
        cc.log("click Bo Bai");
        var cmd = new Lieng.CmdSendTakeTurn();
        cmd.putData(1, 0, 0 ,0, 0);
        gameWsClient.send(cmd);
        cmd.clean();
    },

    clickCheckBai: function(){
        cc.log("click Check");
        var cmd = new Lieng.CmdSendTakeTurn();
        cmd.putData(0, 1, 0 ,0, 0);
        gameWsClient.send(cmd);
        cmd.clean();
    },

    clickCallBai: function(){
        cc.log("click Call bai");
        var cmd = new Lieng.CmdSendTakeTurn();
        cmd.putData(0, 0, 1, 0, 0);
        gameWsClient.send(cmd);
        cmd.clean();

    },

    clickRaiseBai: function(){
        cc.log("click Raise Bai");
        var cmd = new Lieng.CmdSendTakeTurn();
        var kk = Math.min(this.raiseValue - Lieng.gameLogic.players[0].currentBet, Lieng.gameLogic.players[0].currentMoney);
        cmd.putData(0, 0, 0, 0, kk);
        gameWsClient.send(cmd);
        cmd.clean();
    },

    clickAllInBai: function(){
        cc.log("click All in Bai");
        var cmd = new Lieng.CmdSendTakeTurn();
        cmd.putData(0, 0, 0, 1, 0);
        gameWsClient.send(cmd);
        cmd.clean();
    },

    clickCheckFold: function(){
        cc.log("click check Fold");
        this.registerCheckFold = true;
        this.registerFollowAll = false;
    },

    clickCheckFoldX: function(){
        cc.log("click check Fold X");
        this.registerCheckFold = false;
    },

    clickFollowAll: function(){
        cc.log("click follow All");
        this.registerFollowAll = true;
        this.registerCheckFold = false;
    },

    clickFollowAllX: function(){
        cc.log("click follow All X");
        this.registerFollowAll = false;
    },

    sendBuyIn: function(money, isAuto){
        var buyInMoney = money;
        var cmd = new Lieng.CmdSendBuyIn();
        cmd.putData(buyInMoney, isAuto);
        cmd.clean();
        cc.log("send Buy in");
        gameWsClient.send(cmd);
    },

    hideThanhBetAmount: function(){
        //this.rightButons.fadeOut(0.1)
        //this.rightButons.setVisible(false);
        this.rightButtons.stopAllActions();
        this.rightButtons.runAction(cc.sequence(cc.fadeOut(0.15), cc.hide()));

    },

    showThanhBetAmount: function(){
        this.rightButtons.stopAllActions();
        this.rightButtons.runAction(cc.sequence(cc.show(), cc.fadeIn(0.15)));
        this.btnBet1.setEnabled(true);
        this.btnBet2.setEnabled(true);
        this.btnBet3.setEnabled(true);
        this.btnBet4.setEnabled(true);

        this.btnBet1.setBright(true);
        this.btnBet2.setBright(true);
        this.btnBet3.setBright(true);
        this.btnBet4.setBright(true);
    },

    showBoBai: function(isShow){
        this.bgThongBao.setVisible(false);
        this.lbThongBao.setVisible(false);

    },


    updateThanhThongBao: function(boBaiId) {
        var name = Lieng.GameLogic.getNameBoBai(boBaiId);
        this.lbThongBao.setString(name);
    },

    updateWhenChiaBai: function(){
        cc.log("updateWhenChiaBai");
        Lieng.gameLogic.hasChiaBai = true;
        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            this.playerList[i].updateWhenChiaBai();
        }

        this.startOmBai(Lieng.gameLogic.timeOmBai);

        if(Lieng.gameLogic.players[0].status == Lieng.GameStatus.PLAYING){
            this.bottomLayer.runAction(cc.fadeIn(0.5));
            //this.showBoBai(true);
        }

    },

    addTienGa: function(){
        for(var i = 0; i < Lieng.MAX_PLAYER; i++){
            if(Lieng.gameLogic.players[i].status == Lieng.GameStatus.PLAYING){
                this.playerList[i].addBetMoney(Lieng.gameLogic.bet);
            }
        }
    },

    updatePotMoney: function(time){
        cc.log("updatePotMoney");
        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.updatePotMoneyInstance.bind(this))));
    },

    updatePotMoneyInstance: function(){
        cc.log("updatePotMoneyInstance");
        var pot = Lieng.gameLogic.potAmount;
        this.lbPot.setString("" + StringUtility.standartNumber(pot));
        this.lbPot.setColor({r:0, g:0, b:0});
    },

    addLatBaiLayer: function(){
        this.nanBaiTimeUp();

        var layer = new Lieng.LatBaiLayer();
        layer.gameScene = this;
        layer.setLocalZOrder(2);
        layer.setTag(parseInt(Lieng.LiengScene.LAT_BAI_LAYER_TAG));

        this.effectLayer.addChild(layer);
        layer.initWithQuanBai(Lieng.gameLogic.myCards);
    },

    nanBaiTimeUp: function(){
        if(this.effectLayer.getChildByTag(parseInt(Lieng.LiengScene.LAT_BAI_LAYER_TAG))){
            this.effectLayer.getChildByTag(parseInt(Lieng.LiengScene.LAT_BAI_LAYER_TAG)).removeFromParent();
        }
    }

});

Lieng.LiengScene.btnAvatarStartTag = 8099;

Lieng.LiengScene.BTN_CASH = 9008;
Lieng.LiengScene.BTN_BACK = 9009;
Lieng.LiengScene.BTN_CHAT = 9010;
Lieng.LiengScene.BTN_INFO = 9011;
Lieng.LiengScene.BTN_CHEAT = 9012;

Lieng.LiengScene.BTN_PLAY_1 = 9013;
Lieng.LiengScene.BTN_PLAY_2 = 9014;
Lieng.LiengScene.BTN_PLAY_3 = 9015;

Lieng.LiengScene.BTN_BET_1 = 9016;
Lieng.LiengScene.BTN_BET_2 = 9017;
Lieng.LiengScene.BTN_BET_3 = 9018;
Lieng.LiengScene.BTN_BET_4 = 9019;

Lieng.LiengScene.BTN_CHIA_BAI_1 = 9020;
Lieng.LiengScene.BTN_CHIA_BAI_2 = 9021;
Lieng.LiengScene.BTN_CHIA_BAI_3 = 9022;
Lieng.LiengScene.BTN_CHIA_BAI_4 = 9023;
Lieng.LiengScene.BTN_CLEAR_NEW_GAME = 9024;
Lieng.LiengScene.BTN_SELECT_DEALER = 9025;
Lieng.LiengScene.BTN_NEW_BET_ROUND = 9026;
Lieng.LiengScene.BTN_CHANGE_TURN = 9027;
Lieng.LiengScene.BTN_MINUS  = 9028;
Lieng.LiengScene.BTN_PLUS = 9029;
Lieng.LiengScene.BTN_SHOW_CARD = 9030;
Lieng.LiengScene.BTN_LAT_BAI = 9031;
Lieng.LiengScene.BTN_STAND_UP = 9032;
Lieng.LiengScene.BTN_MOI_CHOI = 9033;

Lieng.LiengScene.aftertag = 9400;
Lieng.LiengScene.donvitag = 9401;
Lieng.LiengScene.chuctag = 9402;
Lieng.LiengScene.nanBaiTag = 9403;
Lieng.LiengScene.LAT_BAI_LAYER_TAG = 9404;

Lieng.LiengScene.instance = null;
Lieng.LiengScene.getInstance = function(){
    if(Lieng.LiengScene.instance == null){
        Lieng.LiengScene.instance = new Lieng.LiengScene();
        return Lieng.LiengScene.instance;
    }
}

