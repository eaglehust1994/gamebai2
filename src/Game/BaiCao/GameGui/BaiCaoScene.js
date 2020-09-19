//
BaiCao.BaiCaoScene = BaseLayer.extend({
    ctor: function(){

        this._super();
        this.playerList = [];
        this.effect2D = new BaiCao.EffectLayer();
        this.addChild(this.effect2D);
        this.effect2D.setLocalZOrder(10);
        cc.log("BaiCao + BaiCaoScene ctor 1");
        //this.initWithBinaryFile("res/g_res_cardGame_json_BaiCaoScene.json");
        this.customizeGUI2();
        cc.log("BaiCao onEnter 1");
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
        cc.eventManager.addListener(this.customlistener, 1);
        cc.log("BaiCaoScene onEnter 4");
    },

    onEnter: function(){
        if(menutab)
            menutab.hideAllInfo();
        BaseLayer.prototype.onEnter.call(this);
        this.hasInfoHuVang = false;
        cc.log("BaiCaoScene onEnter 5");
        this.hideEndGame();
        this.effect2D.clearEffect();

        this.cheatLayer = gameScenePool.getCheatCardScene2();
        this.addChild(this.cheatLayer);
        this.cheatLayer.setVisible(false);
        this.cheatLayer.setLocalZOrder(12);
        this.cheatLayer.setType(GameList.BaiCao);
        this.cheatLayer.clear();

        this.hideEndGameLayer();
        this.huVangIcon.hasHu = false;
        this.huVangIcon.setVisible(false);
        this.huVangIcon.changeToHasHu(false);
        //if(gameWsClient){
        //    gameWsClient.sendThongTinHuVang();
        //}
    },


    onExit: function(){
        BaseLayer.prototype.onExit.call(this);
        this.cheatLayer.removeFromParent();
        if(this.chatLayer){
            this.chatLayer = null;
            this.hideEndGameLayer();
        }
        this.stopAutoStart();
    },


    customizeGUI2: function(){
        //doSomething
        var i;
        var btn;
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/BaCay/PlistBaCay.plist","res/CardGame/BaCay/PlistBaCay.png");
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");

        var size = GameScene.getMainContentSize();
        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width/2, size.height / 2);
        touchBtn.setOpacity(0);

        this.addSprite(this,"bg",cc.p(size.width/2, size.height / 2),res_CardGame_CommonResource_BanChoi + "/bg_layer_banchoi.png");
        this.addButton(this,"btnBack",BaiCao.BaiCaoScene.BTN_BACK,cc.p(58,674),true,res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png");
        this.addButton(this,"btnCash",BaiCao.BaiCaoScene.BTN_CASH,cc.p(1068,670),true,res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png");


        this.addButton(this,"btnInfo",9017,cc.p(1148,670),true,res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png");
        this.addButton(this,"btnChat",BaiCao.BaiCaoScene.BTN_CHAT,cc.p(1230,670),true,res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png");

        if(CURRENT_MODE == MODE_DEPLOY.LIVE){
            this.btnCash.setVisible(false);
        }


        this.addSprite(this,"imgBaiCao",cc.p(640,401),res_CardGame_CommonResource_BanChoi + "/baiCao.png");
        this.imgBaiCao.setVisible(true);
        this.addSprite(this,"imgBaiCao",cc.p(640,390),res_CardGame_CommonResource_BanChoi + "/chicken_table.png");
        this.imgBaiCao.setVisible(false);

        this.addButton(this,"btnMoBai",BaiCao.BaiCaoScene.BTN_MO_BAI,cc.p(670,127),true,res_CardGame_BaCay + "/btn_mobai.png",res_CardGame_BaCay + "/btn_mobai.png");
        cc.log("customize 2");
        this.btnMoBai.setVisible(false);
        cc.log("customize 3");
        this.btnVaoGa = this.customizeButton("btnVaoGa", BaiCao.BaiCaoScene.BTN_VAO_GA);
        this.addButton(this,"btnVaoGa",BaiCao.BaiCaoScene.BTN_VAO_GA,cc.p(640,313),true,res_CardGame_BaCay + "/btn_vao_ga.png",res_CardGame_BaCay + "/btn_vao_ga.png");
        this.addText(this,"lbChickenMoney",cc.p(640,250),"lbChickenMoney",RobotoRegular.fontName,36);

        this.lbChickenMoney.ignoreContentAdaptWithSize(false);
        this.lbChickenMoney.setContentSize(cc.size(500,64));
        this.lbChickenMoney.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lbChickenMoney.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER) ;
        this.lbChickenMoney.setString("Tiền Gà: 0");
        this.lbChickenMoney.setVisible(false);

        this.addSprite(this,"iconNetwork",cc.p(),res_CardGame_CommonResource_BanChoi + "/ping_0.png");
        this.iconNetwork.setVisible(false);

        this.addText(this,"muccuoc",cc.p(97,651),"Mức cược: 100M",RobotoRegular.fontName,20);
        this.muccuoc.setAnchorPoint(0.0,0.5);
        this.addText(this,"roomId",cc.p(97,677),"Ban 999",RobotoRegular.fontName,20);
        this.roomId.setAnchorPoint(0.0,0.5);
        this.addText(this,"gameId",cc.p(223,677),"9999999999",RobotoRegular.fontName,20);
        this.roomId.setAnchorPoint(0.0,0.5);
        var arrPositionPanel = [
            {
                panel:cc.p(287,76),
                bgNen:cc.p(169,67),
                iconGa:cc.p(-29,34),
                avatarPanel:cc.p(70,70),
                btn1:cc.p(192,102),
                btn2:cc.p(282,102),
                btn3:cc.p(192,52),
                btn4:cc.p(282,52),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(233,138),
                textDanhBien:cc.p(233,138),
                cardPanel:cc.p(102,60),
                view:cc.p(71,59),
                moneyBet:cc.p(236,6),
                notify:cc.p(39,43),
                card1:cc.p(165,78),
                card2:cc.p(225,78),
                card3:cc.p(285,78)
            },
            {
                panel:cc.p(37,240),
                bgNen:cc.p(176,68),
                iconGa:cc.p(40,176),
                avatarPanel:cc.p(91,70),
                btn1:cc.p(200,95),
                btn2:cc.p(275,95),
                btn3:cc.p(200,45),
                btn4:cc.p(275,45),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(235,70),
                textDanhBien:cc.p(235,121),
                cardPanel:cc.p(127,55),
                view:cc.p(81.5,76.5),
                moneyBet:cc.p(238,14.5),
                notify:cc.p(39,43),
                card1:cc.p(158,89),
                card2:cc.p(218,89),
                card3:cc.p(278,89)
            },
            {
                panel:cc.p(37,452),
                bgNen:cc.p(176,68),
                iconGa:cc.p(40,176),
                avatarPanel:cc.p(91,70),
                btn1:cc.p(200,95),
                btn2:cc.p(275,95),
                btn3:cc.p(200,45),
                btn4:cc.p(275,45),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(235,70),
                textDanhBien:cc.p(235,121),
                cardPanel:cc.p(127,55),
                view:cc.p(81.5,76.5),
                moneyBet:cc.p(238,14.5),
                notify:cc.p(39,43),
                card1:cc.p(158,89),
                card2:cc.p(218,89),
                card3:cc.p(278,89)
            },
            {
                panel:cc.p(326,614),
                bgNen:cc.p(176,68),
                iconGa:cc.p(-29,34),
                avatarPanel:cc.p(91,70),
                btn1:cc.p(200,95),
                btn2:cc.p(275,95),
                btn3:cc.p(200,45),
                btn4:cc.p(275,45),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(235,70),
                textDanhBien:cc.p(235,121),
                cardPanel:cc.p(127,55),
                view:cc.p(81.5,76.5),
                moneyBet:cc.p(238,14.5),
                notify:cc.p(39,43),
                card1:cc.p(158,89),
                card2:cc.p(218,89),
                card3:cc.p(278,89)
            },
            {
                panel:cc.p(732,614),
                bgNen:cc.p(176,68),
                iconGa:cc.p(-29,34),
                avatarPanel:cc.p(91,70),
                btn1:cc.p(200,95),
                btn2:cc.p(275,95),
                btn3:cc.p(200,45),
                btn4:cc.p(275,45),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(235,70),
                textDanhBien:cc.p(235,121),
                cardPanel:cc.p(127,55),
                view:cc.p(81.5,76.5),
                moneyBet:cc.p(238,14.5),
                notify:cc.p(39,43),
                card1:cc.p(158,89),
                card2:cc.p(218,89),
                card3:cc.p(278,89)
            },
            {
                panel:cc.p(986,448),
                bgNen:cc.p(176,68),
                iconGa:cc.p(267,176),
                avatarPanel:cc.p(275,70),
                btn1:cc.p(85,95),
                btn2:cc.p(159,95),
                btn3:cc.p(85,45),
                btn4:cc.p(159,45),
                btnOk:cc.p(-3,111),
                textKeCua:cc.p(122,70),
                textDanhBien:cc.p(122,121),
                cardPanel:cc.p(61,55),
                view:cc.p(269,76.5),
                moneyBet:cc.p(122,14.5),
                notify:cc.p(239,43),
                card1:cc.p(80,89),
                card2:cc.p(140,89),
                card3:cc.p(200,89)
            },
            {
                panel:cc.p(986,238),
                bgNen:cc.p(176,68),
                iconGa:cc.p(267,176),
                avatarPanel:cc.p(275,70),
                btn1:cc.p(85,95),
                btn2:cc.p(159,95),
                btn3:cc.p(85,45),
                btn4:cc.p(159,45),
                btnOk:cc.p(-3,111),
                textKeCua:cc.p(122,70),
                textDanhBien:cc.p(122,121),
                cardPanel:cc.p(61,55),
                view:cc.p(269,76.5),
                moneyBet:cc.p(122,14.5),
                notify:cc.p(239,43),
                card1:cc.p(80,89),
                card2:cc.p(140,89),
                card3:cc.p(200,89)
            },
            {
                panel:cc.p(799,76),
                bgNen:cc.p(176,68),
                iconGa:cc.p(-29,34),
                avatarPanel:cc.p(91,70),
                btn1:cc.p(200,95),
                btn2:cc.p(275,95),
                btn3:cc.p(200,45),
                btn4:cc.p(275,45),
                btnOk:cc.p(358,104),
                textKeCua:cc.p(235,70),
                textDanhBien:cc.p(235,121),
                cardPanel:cc.p(127,55),
                view:cc.p(81.5,76.5),
                moneyBet:cc.p(238,14.5),
                notify:cc.p(39,43),
                card1:cc.p(158,89),
                card2:cc.p(218,89),
                card3:cc.p(278,89)
            }];
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.addLayout(this,"panel"+i,arrPositionPanel[i].panel,null,cc.size(100,100),true);

            this.addImage(this["panel" + i],"bg_nen"+i,arrPositionPanel[i].bgNen,res_CardGame_BaCay + "/bg_table_right_2.png",cc.size(324,163));
            if(i == 0)
            {
                this["bg_nen" + i].setContentSize(cc.size(362,180));
            }
            this["bg_nen"+i].setName("bg_nen");
            if(i==5 || i == 6)
            {
                this["bg_nen"+i].setRotationY(180);
            }
            this.addSprite(this["panel" + i],"iconGa" + i,arrPositionPanel[i].iconGa,res_CardGame_BaCay + "/chicken.png");
            this["iconGa"+i].setName("iconGa");



            // btnDatCuoc

            this.addSprite(this["panel" + i],"view" + i,arrPositionPanel[i].view,res_CardGame_BaCay +"/text_dangxem.png");
            this["view" + i].setName("view");
            this.addText(this["panel" + i],"moneyBet"+ i,arrPositionPanel[i].moneyBet,"Cược: 50000000",RobotoRegular.fontName,20);
            this["moneyBet" + i].setName("moneyBet");
            this["moneyBet" + i].setColor(cc.color(255,165,0));

            this.addLayout(this["panel" + i],"avatarPanel" + i,arrPositionPanel[i].avatarPanel,"",cc.size(140,140),true);
            this["avatarPanel" + i].setName("avatarPanel");

            this.addButton(this["avatarPanel" + i],"btnAvatar"+ i,BaiCao.BaiCaoScene.btnavatarstarttag + i,cc.p(65,75),true,res_common_avatar+"/Button.png",null);
            this["btnAvatar"+ i].setName("btnAvatar");

            this.addSprite(this["avatarPanel" + i],"bg_progress" + i,cc.p(65,75),res_common_avatar+"/Vong_Ngoai.png");
            this["bg_progress"+ i].setName("bg_progress");

            this.addText(this["avatarPanel" + i],"name"+i,cc.p(69,144),"Phu Ba Dao Viet Nam",RobotoRegular.fontName,20);
            this["name"+i].setName("name");

            this.addText(this["avatarPanel" + i],"gold"+i,cc.p(71,-3),"Phu Ba Dao Viet Nam",RobotoRegular.fontName,20);
            this["gold"+i].setName("gold");
            this["gold"+i].setColor(cc.color(255,165,0));

            this.addImage(this["avatarPanel" + i],"avatar" + i,cc.p(65,75),res_common_avatar+"/Avatar_1.png",cc.size(128,128));
            this["avatar"+ i].setName("avatar");

            this.addSprite(this["avatarPanel" + i],"iconOut" + i,cc.p(120,112),res_CardGame_CommonResource_BanChoi+"/btn_exit_room.png");
            this["iconOut"+ i].setName("iconOut");

            this.addSprite(this["avatarPanel" + i],"imgChuong" + i,cc.p(65,35),res_CardGame_BaCay+"/sp_chuong.png");
            this["imgChuong"+ i].setName("imgChuong");

            this.addLayout(this["panel" + i],"cardPanel" + i,arrPositionPanel[i].cardPanel,"",cc.size(100,100),true);
            this["cardPanel" + i].setName("cardPanel");
            this.addSprite(this["cardPanel" + i],"card1" + i,arrPositionPanel[i].card1,res_CardGame_BaCay+"/laBaiChe.png");
            this["card1"+ i].setName("card1");

            this.addSprite(this["cardPanel" + i],"card2" + i,arrPositionPanel[i].card2,res_CardGame_BaCay+"/laBaiChe.png");
            this["card2"+ i].setName("card2");

            this.addSprite(this["cardPanel" + i],"card3" + i,arrPositionPanel[i].card3,res_CardGame_BaCay+"/laBaiChe.png");
            this["card3"+ i].setName("card3");
            if(i == 0){
                for(var j = 0; j < 4; j++){
                    this.addButton(this["panel" + i],"btn_dat_cuoc_" + (j + 1),BaiCao.BaiCaoScene.BTN_DAT_CUOC_START + j,arrPositionPanel[i]["btn" + (j + 1)],true,res_CardGame_BaCay + "/money_dat_cuoc.png",null);
                    this["btn_dat_cuoc_" + (j + 1)].setName("btn_dat_cuoc_" + (j + 1));
                    this["btn_dat_cuoc_" + (j + 1)].ignoreContentAdaptWithSize(false);
                    this["btn_dat_cuoc_" + (j + 1)].setContentSize(cc.size(75,35));

                }
                this.addText(this["panel" + i],"text_dat_cuoc" + i,arrPositionPanel[i].textDanhBien,"Đặt Cược",RobotoRegular.fontName,20);
                this["text_dat_cuoc"+i].setName("text_dat_cuoc");
                this["cardPanel" + i].setScale(0.75);
            }

            else{
                this["cardPanel" + i].setScale(0.66);
                for(var j = 0; j < 2; j++){
                    this.addButton(this["panel" + i],"btnBien" + i.toString() + (j + 1).toString(),BaiCao.BaiCaoScene.BTN_DANH_BIEN_START + 2*i + j,arrPositionPanel[i]["btn" + (j + 1)],true,res_CardGame_BaCay + "/money_danhbien.png",null);
                    this["btnBien" + i.toString() + (j + 1).toString()].setName("btnBien" + (j  + 1));
                    this["btnBien" + i.toString() + (j + 1).toString()].ignoreContentAdaptWithSize(false);
                    this["btnBien" + i.toString() + (j + 1).toString()].setContentSize(cc.size(62,29));
                }

                for(var j = 0; j < 2;j ++){
                    this.addButton(this["panel" + i],"btnKe" + i.toString() + (j + 1).toString(),BaiCao.BaiCaoScene.BTN_KE_CUA_START + 2*i + j,arrPositionPanel[i]["btn" + (j + 3)],true,res_CardGame_BaCay + "/money_kecua.png",null);
                    this["btnKe" + i.toString() + (j + 1).toString()].setName("btnKe" + (j  +1));
                    this["btnKe" + i.toString() + (j + 1).toString()].ignoreContentAdaptWithSize(false);
                    this["btnKe" + i.toString() + (j + 1).toString()].setContentSize(cc.size(62,29));
                }
                this.addButton(this["panel" + i],"btnOk" + i.toString(),BaiCao.BaiCaoScene.BTN_OK_START + i,arrPositionPanel[i].btnOk,true,res_CardGame_BaCay + "/btn_ok.png",null);
                this["btnOk" + i.toString()].setName("btnOk");

                this.addSprite(this["panel" + i],"notify"+i,arrPositionPanel[i].notify,res_CardGame_BaCay + "/ok_danhbien.png");
                this["notify"+i].setName("notify");
                this.addText(this["panel" + i],"textKeCua" + i,arrPositionPanel[i].textKeCua,"Ké Cửa",RobotoRegular.fontName,20);
                this["textKeCua"+i].setName("textKeCua");
                this.addText(this["panel" + i],"textDanhBien" + i,arrPositionPanel[i].textDanhBien,"Đánh Biên",RobotoRegular.fontName,20);
                this["textDanhBien"+i].setName("textDanhBien");

            }



            var playerDisplay = new BaiCao.PlayerDisplay();
            playerDisplay.index = i;
            playerDisplay.gameScene = this;
            this.addChild(playerDisplay);
            playerDisplay.setPanel(this["panel" + i]);

            if (i == 0) {
                playerDisplay.initMyPlayer();
            }
            playerDisplay.initPlayerDisplay();
            this.playerList.push(playerDisplay);
        }
        this.hideEndGame();
        this.huVangIcon = new ThongTinHuVang();
        this.huVangIcon.setBoBaiByType(GameList.BaiCao);
        this.addChild(this.huVangIcon);
        this.huVangIcon.setScale(0.6);
        this.huVangIcon.setPosition(1140, 610);
        this.huVangIcon.addHuListener();
        this.huVangIcon.setVisible(false);
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

    onButtonRelease: function(btn, id){
        cc.log("id: " + id);
        switch(id){
            case BaiCao.BaiCaoScene.BTN_BACK:
                cc.log("register out room");
                var pk = new BaiCao.CmdSendRequestLeaveGame();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                break;
            case BaiCao.BaiCaoScene.BTN_CASH:
                cc.log("BTNCHEAT");
                this.cheatLayer.setVisible(true);
                break;
            case BaiCao.BaiCaoScene.BTN_CHAT:
                cc.log("BTNCHEAT");
                this.onBtnChatClicked();
                break;

            case BaiCao.BaiCaoScene.BTN_INFO:{
                var s = GameManager.getInstance().getHotroLink(GameList.BaiCao);
                if(cc.sys.isNative) {
                    if(lobby.open_payment_ios == false){
                        popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                        return;
                    }
                }
                ConnectNative.openWebView(s, false);
            }
                break;

            case BaiCao.BaiCaoScene.BTN_VAO_GA:{
                this.sendVaoGa();
            }
                break;
            case BaiCao.BaiCaoScene.BTN_MO_BAI:{
                this.sendMoBai();
            }
                break;
            case BaiCao.BaiCaoScene.BTN_MOI_CHOI:{
                cc.log("click btn moiChoi");
                if(gameWsClient){
                    gameWsClient.sendGetInfoMoiChoi();
                }
            }
                break;
        }

        if(id  >= BaiCao.BaiCaoScene.BTN_DAT_CUOC_START && id < BaiCao.BaiCaoScene.BTN_DAT_CUOC_START + 4){
            this.sendDatCuoc(id);
        }
        else if(id >= BaiCao.BaiCaoScene.BTN_DANH_BIEN_START && id < BaiCao.BaiCaoScene.BTN_DANH_BIEN_START + 16){
            this.sendDanhBien(id);
        }
        else if(id >= BaiCao.BaiCaoScene.BTN_KE_CUA_START && id < BaiCao.BaiCaoScene.BTN_KE_CUA_START + 16){
            this.sendKeCua(id);
        }
        else if(id >= BaiCao.BaiCaoScene.BTN_OK_START && id < BaiCao.BaiCaoScene.BTN_OK_START + 8){
            if(BaiCao.gameLogic.vaoCuoc) {
                this.sendOk(id);
            }else{
                GameToast.makeToast(2, "Vui lòng đặc cược trước!", this);
            }
        }
    },

    updateMoneyFromLobby: function(event){
        if(BaiCao.gameLogic.moneyType == event.moneyType){
            BaiCao.gameLogic.players[0].info.money = event.currentMoney;
            this.playerList[0].updateMoney2();

        }
        cc.log("updateMoneyFromLobby " + event.currentMoney + " "  + event.moneyType);
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

    setKeCua: function(chair1, chair2, level){
        if(chair1 == 0){
            this.playerList[chair2].setKeCua(level);
        }

        this.effect2D.chuyenTienCuoc(this.playerList[chair1], this.playerList[chair2], level*BaiCao.gameLogic.bet);
    },

    setChapNhanDanhBien: function(chair, level){
        this.playerList[chair].setChapNhanDanhBien(level);
    },

    setYeuCauDanhBien:function(chair, level){
        this.playerList[chair].setYeuCauDanhBien(level);
    },

    sendDatCuoc: function(id){
        var btn;
        var level = id - BaiCao.BaiCaoScene.BTN_DAT_CUOC_START + 1;

        for(var i = 0 ; i < 4; i++){
            btn = ccui.helper.seekWidgetByTag(this, BaiCao.BaiCaoScene.BTN_DAT_CUOC_START + i);
            btn.setEnabled(false);
        }

        var pk = new BaiCao.CmdSendDatCuoc();
        pk.putData(level);
        gameWsClient.send(pk);
        pk.clean();
    },

    sendDanhBien: function(id){
        var btn;
        var level = (id - BaiCao.BaiCaoScene.BTN_DANH_BIEN_START)%2 + 1;
        var chair = Math.floor((id - BaiCao.BaiCaoScene.BTN_DANH_BIEN_START)/2);

        for(var i = 0 ; i < 2; i++){
            btn = ccui.helper.seekWidgetByTag(this, BaiCao.BaiCaoScene.BTN_DANH_BIEN_START + chair*2 +i);
            btn.setEnabled(false);
            if(i != level -1)
                btn.setVisible(false);
        }

        chair = BaiCao.gameLogic.convertToChairServer(chair);
        var pk = new BaiCao.CmdSendDanhBien();
        pk.putData(chair, level);
        gameWsClient.send(pk);
    },

    sendKeCua: function(id){
        cc.log("sendKeCua");
        var btn;
        var level = (id - BaiCao.BaiCaoScene.BTN_KE_CUA_START)%2 + 1;
        var chair = Math.floor((id - BaiCao.BaiCaoScene.BTN_KE_CUA_START)/2);

        for(var i = 0 ; i < 2; i++){
            btn = ccui.helper.seekWidgetByTag(this, BaiCao.BaiCaoScene.BTN_KE_CUA_START + chair*2 +i);
            btn.setEnabled(false);
        }

        chair = BaiCao.gameLogic.convertToChairServer(chair);
        var pk = new BaiCao.CmdSendKeCua();
        pk.putData(chair, level);
        gameWsClient.send(pk);
        pk.clean();
    },

    sendOk: function(id){
        var chair = Math.floor(id - BaiCao.BaiCaoScene.BTN_OK_START);
        cc.log("")
        chair = BaiCao.gameLogic.convertToChairServer(chair);
        var pk = new BaiCao.CmdSendAcceptDanhBien();
        pk.putData(chair);
        gameWsClient.send(pk);
        pk.clean();
    },

    sendVaoGa: function(){
        this.btnVaoGa.setVisible(false);
        var pk = new BaiCao.SendVaoGa();
        gameWsClient.send(pk);
        pk.clean();
    },

    doiChuong: function(local){
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(i != index){
                this.playerList[i].showIconChuong(false);
            }
            else{
                this.playerList[i].showIconChuong(true);
            }
        }
    },

    sendMoBai: function(){
        this.btnMoBai.setVisible(false);
        var pk = new BaiCao.CmdSendMoBai();
        gameWsClient.send(pk);
        pk.clean();
    },

    onUpdateGui: function(data){
        var i;
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++) {
            this.playerList[i].updateWithPlayer(BaiCao.gameLogic.players[i]);
        }

        switch(BaiCao.gameLogic.gameState){
            case BaiCao.GameState.JOIN_ROOM:{
                cc.log("BaiCao join room");
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
                //var muccuoc = ccui.Helper.seekWidgetByName(this,"muccuoc");
                //var ban  = ccui.Helper.seekWidgetByName(this._layout,"roomId");
                //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");

                this.roomId.setString("Bàn: " + BaiCao.gameLogic.roomId);
                this.gameId.setString("# "+ BaiCao.gameLogic.gameId);
                this.muccuoc.setString("Mức cược: " + gameUtility.standartMoney2(BaiCao.gameLogic.bet));

                if(this.chip){
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + BaiCao.gameLogic.moneyType + ".png");//new cc.Sprite("res/common/chip/vinChip" + BaiCao.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width + this.chip.getContentSize().width*0.5, this.muccuoc.getPositionY());

                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].showIconChuong(false);
                    this.playerList[i].initMoneyBetButton(BaiCao.gameLogic.bet);
                }
                this.playerList[BaiCao.gameLogic.chuongChair].showIconChuong(true);
            }
                break;

            case BaiCao.GameState.THONG_TIN_VAN_CHOI:{
                cc.log("BaiCaoScene update reconnect 1 ");
                //var muccuoc = ccui.Helper.seekWidgetByName(this._layout,"muccuoc");
                //var ban  = ccui.Helper.seekWidgetByName(this._layout,"roomId");
                //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");
                cc.log("BaiCaoScene update reconnect 2 ");
                this.roomId.setString("Bàn :" + BaiCao.gameLogic.roomId);
                this.gameId.setString("# "+ BaiCao.gameLogic.gameId);
                this.muccuoc.setString(StringUtility.standartNumber(BaiCao.gameLogic.bet));

                if(this.chip){
                    this.chip.removeFromParent();
                }

                this.chip = GuiUtil.createSprite("res/common/chip/vinChip" + BaiCao.gameLogic.moneyType + ".png");//new cc.Sprite("res/common/chip/vinChip" + BaiCao.gameLogic.moneyType + ".png");
                this.addChild(this.chip);
                this.chip.setPosition(this.muccuoc.getPositionX() + this.muccuoc.getContentSize().width + this.chip.getContentSize().width*0.5, this.muccuoc.getPositionY());


                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].showIconChuong(false);
                    this.playerList[i].initMoneyBetButton(BaiCao.gameLogic.bet);
                }
                cc.log("BaiCaoScene update reconnect 3 ");
                this.playerList[BaiCao.gameLogic.chuongChair].showIconChuong(true);


                cc.log("BaiCao gameServerState: " + data.gameServerState);
                if(data.gameServerState == 1){
                    cc.log("gameServerState = 1");
                    this.startDatCuocReconnect();
                    for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                        if(i == 0 && (BaiCao.gameLogic.players[i].cuocChuong != 0) ){
                            this.playerList[0].setDatCuoc(BaiCao.gameLogic.players[i].cuocChuong);
                        }
                        this.playerList[i].updateTienCuoc();
                    }

                    for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                        if(BaiCao.gameLogic.players[i].cuocGa > 0){
                            this.playerList[i].showIConGa(true);
                        }

                    }

                    this.updateMoney();

                    if(BaiCao.gameLogic.players[0].cuocChuong == 0){
                        // chuyenTienDatCuoc;
                    }else{
                        this.startDanhBien();
                    }

                    if(BaiCao.gameLogic.players[0].cuocGa > 0){
                        this.btnVaoGa.setVisible(false);
                    }

                    for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                        if(BaiCao.gameLogic.danhBienMoneyList[i] > 0){
                            this.playerList[i].setChapNhanDanhBien();
                        }
                    }

                    for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                        if(BaiCao.gameLogic.keCuaMoneyList[i] > 0){
                            this.playerList[i].setKeCua(this.keCuaMoneyList[i]);
                        }
                    }


                    for(var i = 0; i < BaiCao.gameLogic.myCards.length; i++){
                        cc.log("BaiCao myCards: " + i + " " + BaiCao.gameLogic.myCards[i]);
                    }

                    cc.log("gameAction + data.gameAction");
                    if(data.gameAction == BaiCao.GameLogic.GameAction.CHIA_BAI){
                        cc.log("gameAction = ChiaBai");
                        this.hideWhenChiaBai();
                        this.chiaBaiInstant(BaiCao.gameLogic.myCards);
                        cc.log("initWithCards");
                    }

                    if(data.gameAction != BaiCao.GameLogic.GameAction.END_GAME){
                        if(BaiCao.gameLogic.countDownTime > 0){
                            this.addDemLuiSimple(BaiCao.gameLogic.countDownTime);
                        }
                    }

                }else{
                    //return;
                }
            }
                break;

            case BaiCao.GameState.NOTIFYOUTROOM:
            {
                this.playerList[BaiCao.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if(BaiCao.gameLogic.convertChair(data.outChair) == 0){
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

            case BaiCao.GameState.DOI_CHUONG:{
                cc.log("BaiCao doi chuong");
                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].showIconChuong(false);
                }
                this.playerList[BaiCao.gameLogic.chuongChair].showIconChuong(true);
            }
                break;
            case BaiCao.GameState.AUTO_START:
            {
                cc.log("BaiCaoScene autostart");

                if(data && (data.isAutoStart) && (data.timeAutoStart > 0))
                    this.addAutoStart(BaiCao.gameLogic.timeAutoStart);

                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }

                BaiCao.gameLogic.gameState = BaiCao.GameState.NONE;
            }
                break;

            case BaiCao.GameState.USER_JOIN:{
                this.playerList[BaiCao.gameLogic.activeLocalChair].hideEndGame();
                this.playerList[BaiCao.gameLogic.activeLocalChair].updateWithPlayer(BaiCao.gameLogic.players[BaiCao.gameLogic.activeLocalChair]);
            }
                break;

            case BaiCao.GameState.USER_LEAVE:{
                cc.log("vao BaiCaoScene userleave");

                this.playerList[BaiCao.gameLogic.activeLocalChair].updateWithPlayer(BaiCao.gameLogic.players[BaiCao.gameLogic.activeLocalChair]);
                if(BaiCao.gameLogic.activeLocalChair == 0){
                    cc.log("vao acitiveLocalChair roi");
                    userGameData.setItem("inRoom", "false");
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }
                break;
            }
                break;
            case BaiCao.GameState.MOI_DAT_CUOC:{
                // An het moi button chi con lai btn
                cc.log("BaiCaoScene moi dat cuoc");

                this.stopAutoStart();
                this.hideDemLui();
                this.nanBaiTimeUp();
                this.hideEndGameLayer();
                this.hideEndGame();
                //this.effect2D.removeAllEffect();
                this.startDatCuoc(data.timeDatCuoc);
                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].hideDisplayDiem();
                }
            }
                break;

            case BaiCao.GameState.CHIA_BAI:
            {
                this.stopAutoStart();
                this.hideDemLui();
                this.hideWhenChiaBai();
                this.btnVaoGa.setVisible(false);
                this.chiaBai(data);
                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].hideDisplayDiem();
                }
            }
                break;
            case BaiCao.GameState.VAO_GA:
            {
                // runAction tien Ga vao ban;
                // update so tien hien tai
                cc.log("error dat cuoc " + data.getError())
                if(data.getError() == 0){
                    cc.log("Vao Ga Thanh cong");
                    this.addVaoGaForPlayer(BaiCao.gameLogic.convertChair(data.chair), data.chicKenBet, BaiCao.gameLogic.moneyType);
                    this.playerList[BaiCao.gameLogic.convertChair(data.chair)].showIConGa(true);
                }
                else {
                    var chair = 0;
                    var pos = this.playerList[chair].cardList[1].convertToWorldSpaceAR(cc.p(0,0));
                    pos = this.effect2D.convertToNodeSpace(pos);

                    var node = gameUtility.createText("Bạn không đủ điều kiện vào gà");
                    node.setPosition(pos);
                    this.effect2D.addChild(node);
                    node.runAction(cc.sequence(cc.fadeIn(0.3),
                        cc.delayTime(this._time),
                        cc.fadeOut(0.3),cc.removeSelf()));
                }

            }
                break;

            case BaiCao.GameState.DAT_CUOC:
            {
                cc.log("error dat cuoc " + data.getError())
                if(data.getError() != 0){
                    cc.log("Dat Cuoc That Bai");

                    var btn;
                    for(var i = 0 ; i < 4; i++){
                        btn = ccui.helper.seekWidgetByTag(this, BaiCao.BaiCaoScene.BTN_DAT_CUOC_START + i);
                        btn.setEnabled(true);
                        btn.setVisible(true);
                    };

                    var chair = 0;
                    var pos = this.playerList[chair].cardList[1].convertToWorldSpaceAR(cc.p(0,0));
                    pos = this.effect2D.convertToNodeSpace(pos);

                    var node = gameUtility.createText("Bạn không đủ điều kiện đặt cược");
                    node.setPosition(pos);
                    this.effect2D.addChild(node);
                    node.runAction(cc.sequence(cc.fadeIn(0.3),
                        cc.delayTime(this._time),
                        cc.fadeOut(0.3),cc.removeSelf()));

                }
                else {
                    cc.log("dat cuoc khong loi");
                    var btn;
                    var chair = BaiCao.gameLogic.convertChair(data.chairDatCuoc);
                    this.playerList[chair].setDatCuoc(data.level);
                    var money = data.level * BaiCao.gameLogic.bet;
                    this.effect2D.chuyenTienCuoc(this.playerList[chair], this.playerList[chair], money);
                    // Neu goi dat cuoc nhan duoc la minh thi chuyen sang cho phep danh Bien
                    if (chair === 0) {
                        this.startDanhBien(chair);
                    }
                }
            }
                break;

            case BaiCao.GameState.YEU_CAU_DANH_BIEN:
            {
                cc.log("error danh bien " + data.getError())
                if(data.getError() != 0){
                    cc.log("Danh Bien That Bai");

                    var chair = BaiCao.gameLogic.convertChair(data.danhBienChair);
                    var pos = this.playerList[chair].cardList[1].convertToWorldSpaceAR(cc.p(0,0));
                    pos = this.effect2D.convertToNodeSpace(pos);
                    var node = gameUtility.createText("Bạn không đủ điều kiện đặt đánh biên");
                    node.setPosition(pos);
                    this.effect2D.addChild(node);
                    node.runAction(cc.sequence(cc.fadeIn(0.3),
                        cc.delayTime(this._time),
                        cc.fadeOut(0.3),cc.removeSelf()));
                }
                else {
                    cc.log("setYeuCauDanhBien" + data.chairBanhBien + " " + data.level);
                    var chair = BaiCao.gameLogic.convertChair(data.danhBienChair);
                    var level = data.level;

                    cc.log("setYeuCauDanhBien" + chair+ " " + level);
                    this.setYeuCauDanhBien(chair, level);
                    //cc.log("setYeuCauDanhBien" + chair + " " + level);
                }
            }
                break;

            case BaiCao.GameState.CHAP_NHAN_DANH_BIEN:{
                if(data.getError()){
                    cc.log("Chap nhan danh bien error");
                    var chair = BaiCao.gameLogic.convertChair(data.danhBienChair);
                    var pos = this.playerList[chair].cardList[1].convertToWorldSpaceAR(cc.p(0,0));
                    pos = this.effect2D.convertToNodeSpace(pos);
                    var node = gameUtility.createText("Bạn không đủ điều kiện đánh biên");
                    node.setPosition(pos);
                    this.effect2D.addChild(node);
                    node.runAction(cc.sequence(cc.fadeIn(0.3),
                        cc.delayTime(this._time),
                        cc.fadeOut(0.3),cc.removeSelf()));
                }
                else {
                    var chair = BaiCao.gameLogic.convertChair(data.danhBienChair);
                    var level = data.level;
                    this.setChapNhanDanhBien(chair, level);
                }

            }
                break;

            case BaiCao.GameState.KE_CUA:{
                if(data.getError()){
                    cc.log("Ke cua error");
                    var chair = BaiCao.gameLogic.convertChair(data.chairKeCuaTo);
                    cc.log("Ke cua: " + data.chairKeCuaTo + "  " + chair);

                    var pos = this.playerList[chair].cardList[1].convertToWorldSpaceAR(cc.p(0,0));
                    pos = this.effect2D.convertToNodeSpace(pos);
                    var node = gameUtility.createText("Bạn không đủ điều kiện ké cửa", pos, 1);
                    node.setPosition(pos);
                    this.effect2D.addChild(node);
                    node.runAction(cc.sequence(cc.fadeIn(0.3),
                        cc.delayTime(this._time),
                        cc.fadeOut(0.3),cc.removeSelf()));
                }
                else {
                    var chairFrom = BaiCao.gameLogic.convertChair(data.chairKeCuaFrom);
                    var chairTo = BaiCao.gameLogic.convertChair(data.chairKeCuaTo);
                    var level = data.level;
                    this.setKeCua(chairFrom, chairTo, level);
                }
            }
                break;

            case BaiCao.GameState.MO_BAI:
            {
                var activeLocalChair = BaiCao.gameLogic.convertChair(data.chairMoBai);
                if(BaiCao.gameLogic.players[activeLocalChair].hasMoBai == false){
                    BaiCao.gameLogic.players[activeLocalChair].hasMoBai = true;
                    this.playerList[activeLocalChair].initWithCards(BaiCao.gameLogic.players[activeLocalChair].cards);
                    this.playerList[activeLocalChair].moBai();
                }
            }
                break;

            case BaiCao.GameState.END_GAME:
            {
                //Dau Tien la mo bai moi thang trong van choi
                this.btnMoBai.setVisible(false);
                this.hideDemLui();
                this.stopAutoStart();
                this.nanBaiTimeUp();

                for(var i =0; i < BaiCao.GameLogic.MAX_PLAYER;i++){
                    if(BaiCao.gameLogic.players[i].status == 3){
                        this.playerList[i].initWithCards(BaiCao.gameLogic.players[i].cards);
                    }
                }


                this.data = {};
                this.data.numPlayerInGame = BaiCao.gameLogic.numPlayerInGame();
                this.data.listPlayerInGame = [];
                for(var i =0 ; i < this.data.numPlayerInGame; i++){
                    var dataPlayer = [];
                    var player = BaiCao.gameLogic.players[BaiCao.gameLogic.getInGamePlayer(i)];
                    dataPlayer.name = player.info.nickName;
                    dataPlayer.tongTienCuoc = player.tongTienCuoc;
                    dataPlayer.tongDanhBien = player.tongDanhBien;
                    dataPlayer.tongKeCua = player.tongKeCua;
                    dataPlayer.tongCuocGa = player.tongCuocGa;
                    dataPlayer.tongCuoiVan = player.tongCuoiVan;
                    this.data.listPlayerInGame.push(dataPlayer);
                }

                this.moBaiCaLang();
                this.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(this.soBaiVoiChuong.bind(this)), cc.delayTime(0.5), cc.callFunc(this.soBaiDanhBienVaAnGa.bind(this)), cc.delayTime(0.3), cc.callFunc(this.addTienCuoiVan.bind(this))));
                this.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(this.addEndGameLayer.bind(this))));


                if(BaiCao.gameLogic.phatLuong && BaiCao.gameLogic.numPlayerPlaying > 2){

                    cc.log("phatLuong");
                    this.effect2D.addPhatLuong();
                }
                else if(BaiCao.gameLogic.caLangSangTien && BaiCao.gameLogic.numPlayerPlaying > 2){
                    cc.log("caLangSangTien");
                    this.effect2D.addCaLangSangTien();
                }
            }
                break;

            case BaiCao.GameState.UPDATE_MATCH:
            {
                //An so tien vao ga khi bat dau van choi moi
                cc.log("onUpdateGui Update Match");

                this.stopAutoStart();
                this.nanBaiTimeUp();
                this.hideDemLui();
                this.hideEndGameLayer();
                this.hideEndGame();
                this.effect2D.hideAllEffect();
                this.hideAllNodeMoney();

                for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
                    this.playerList[i].hideDisplayDiem();
                }

                if(this.lbChickenMoney){
                    this.lbChickenMoney.setString("Tiền Gà: 0");
                    this.lbChickenMoney.setVisible(false);
                }
                //An het la bai cua nguoi choi khi bat dau van moi
            }
                break;
        }
    },

    addTienCuoiVan: function() {
        for (var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++) {
            //var local = Sam.gameLogic.convertChair(i);
            if (BaiCao.gameLogic.players[i].status == 3) {
                this.playerList[i].addMoney(BaiCao.gameLogic.players[i].tongCuoiVan, 2);
            }
        }
    },

    hideAllNodeMoney: function(){
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.playerList[i].removeNodeMoney();
        }
    },

    soBaiDanhBienVaAnGa: function(){
        cc.log("So Bai Danh Bien");
        var chuongChair = BaiCao.gameLogic.chuongChair;
        cc.log("chuongChair: " + chuongChair);
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3 && (i != chuongChair) && (i != 0)){
                var money = BaiCao.gameLogic.danhBienMoneyList[i];
                cc.log("i: " + i + " money: " + money);
                if(money > 0){
                    this.effect2D.chuyenTienCuoiVan(this.playerList[i], this.playerList[0], money);
                }else if(money < 0){
                    this.effect2D.chuyenTienCuoiVan(this.playerList[0], this.playerList[i], -money);
                }
            }
        }
        var chairAnGa = -1;
        var money = 0;
        for(var i =0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            money = BaiCao.gameLogic.players[i].tongCuocGa;
            if(money > 0){
                chairAnGa = i;
                break;
            }
        }
        if(chairAnGa >=0){
            cc.log("Nguoi o ghe " + chairAnGa + " an ga");
            this.effectAnGa(chairAnGa);
        }else{
            cc.log("Khong co ai an ga");
        }
    },

    soBaiVoiChuong: function(){
        var chuongChair = BaiCao.gameLogic.chuongChair;
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3 && (i != chuongChair)){
                var money = BaiCao.gameLogic.players[i].tongTienCuoc + BaiCao.gameLogic.players[i].tongKeCua;
                if(money < 0){
                    this.effect2D.chuyenTienCuoiVan(this.playerList[i], this.playerList[chuongChair], -money);
                }else if(money >= 0){
                    this.effect2D.chuyenTienCuoiVan(this.playerList[chuongChair], this.playerList[i], money);
                }

            }
        }
    },

    addVaoGaForPlayer: function(chair, money, moneyType){
        cc.log("run effect vao ga tu " + chair, + " voi so tien " + money);
        var panel = this.playerList[chair].panel;
        var avatarPanel = panel.getChildByName("avatarPanel");
        var bg_progress = avatarPanel.getChildByName("bg_progress");
        var startPos = bg_progress.convertToWorldSpaceAR(cc.p(0, 0));
        startPos = this.convertToNodeSpace(startPos);
        var color = {r: 255, g: 165, b:0};
        var node = gameUtility.createSo2(money, color);
        node.setScale(0.85);
        node.setPosition(startPos);
        node.setOpacity(0);
        //var moneyChicken = ccui.helper.seekWidgetByName(this, "chickenMoney");

        var lengFix = 35;
        var desPos = this.lbChickenMoney.convertToWorldSpaceAR(cc.p(lengFix, 0));
        desPos = this.convertToNodeSpace(desPos);
        this.addChild(node);
        node.runAction(cc.sequence(cc.fadeIn(0.1), cc.EaseBackOut.create(cc.moveTo(1.0, desPos)), cc.fadeOut(0.05), cc.callFunc(this.updateMoney, this), cc.removeSelf()));
    },

    effectAnGa: function(chair){
        this.effect2D.anGa(this.lbChickenMoney, this.playerList[chair].uiAvatar);
    },

    updateMoney: function(){
        if(this.lbChickenMoney === null || this.lbChickenMoney === undefined){
            return;
        }

        if(BaiCao.gameLogic.chickenMoney == 0){
            this.lbChickenMoney.setVisible(false);
        }else {
            var stringS = "Tiền Gà: " + StringUtility.standartNumber(BaiCao.gameLogic.chickenMoney);
            this.lbChickenMoney.setString(stringS);
        }
    },

    // gameServerState chuyen sang moi dat cuoc, hien thi cac button DatCuoc.
    hideWhenChiaBai: function(){
        this.btnVaoGa.setVisible(false);
        this.hideDemLui();
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.playerList[i].hideWhenChiaBai();
        }
    },

    hideEndGame: function(){
        this.btnVaoGa.setVisible(false);
        this.lbChickenMoney.setVisible(false);
        this.btnMoBai.setVisible(false);

        this.hideDemLui();

        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.playerList[i].hideEndGame();
        }
    },

    hideDatcuoc: function(){
        this.btnMoBai.setVisible(false);
        this.btnVaoGa.setVisible(false);
        this.lbChickenMoney.setVisible(true);
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.playerList[i].hideDatCuoc();
        }
    },

    startDanhBien: function(){
        if (!BaiCao.gameLogic.isChuong()) {
            if(BaiCao.gameLogic.numberPlayerDangChoi > 2){
                this.btnVaoGa.setVisible(true);
            }
            else{
                this.btnVaoGa.setVisible(false);
            }
            for (var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++) {
                if (BaiCao.gameLogic.players[i].status > 1){
                    this.playerList[i].startDanhBien();
                }
            }
        }




    },

    startDatCuoc: function(time){
        cc.log("BaiCaoScene startDatCuoc");
        this.stopAutoStart();
        this.addDemLuiSimple(time);
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3){
                if(i != BaiCao.gameLogic.chuongChair) {
                    this.effect2D.chuyenTienCuoc(this.playerList[i], this.playerList[i], BaiCao.gameLogic.bet, 1);
                }
            }
        }
        this.hideDatcuoc();
    },

    startDatCuocReconnect: function(time){
        cc.log("BaiCaoScene startDatCuoc");
        this.stopAutoStart();
        this.hideDatcuoc();
    },

    addAutoStart: function(time) {
        cc.log("addAutoStart");
        this.stopAutoStart();
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var after = new cc.Sprite(BaiCao.res.afterPng);
        after.setTag(BaiCao.BaiCaoScene.aftertag);
        var timeRemain = time;
        after.setPosition(cc.p(winSize.width*0.48, winSize.height*0.63));
        this.addChild(after);

        var chuc = Math.floor(time/10);
        var donVi = time % 10;

        //var chucS = new cc.Sprite(this.getImgStartNum(chuc));
        var chucS = GuiUtil.createSprite(this.getImgStartNum(chuc));//new cc.Sprite(this.getImgStartNum(chuc));
        chucS.setTag(BaiCao.BaiCaoScene.chuctag);
        var donViS = GuiUtil.createSprite(this.getImgStartNum(donVi));//new cc.Sprite(this.getImgStartNum(donVi));

        donViS.setTag(BaiCao.BaiCaoScene.donvitag);
        chucS.setPosition(after.getPositionX() + after.getContentSize().width*0.5, after.getPositionY());
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

            chucS.setTexture(this.getImgStartNum(chuc));
            donViS.setTexture(this.getImgStartNum(donVi));
        }
        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackStartAuto.bind(this), this));
        after.runAction(cc.repeatForever(action));
    },

    addDemLuiSimple: function(time, timeRemain){
        this.effect2D.addDemLuiSimple(time, timeRemain);
    },

    hideDemLui: function(){
        this.effect2D.hideDemLui();
    },


    stopAutoStart: function(){
        // xu thang cu neu ton tai;
        var after = this.getChildByTag(0 + BaiCao.BaiCaoScene.aftertag);
        var chucS = this.getChildByTag(0 + BaiCao.BaiCaoScene.chuctag);
        var donviS = this.getChildByTag(0 + BaiCao.BaiCaoScene.donvitag);
        if(after){
            after.stopAllActions();
            after.removeFromParent();
        }
        if(chucS){
            chucS.removeFromParent();
        }

        if(donviS){
            donviS.removeFromParent();
        }
    },

    chiaBai: function(data){
        cc.log("chiabai");
        var i;
        for(i = 0; i < 5; i++){
            this.playerList[i].clearBai();
        }

        //var gameId = ccui.Helper.seekWidgetByName(this._layout, "gameId");
        this.gameId.setString("# "+ BaiCao.gameLogic.gameId);

        this.playerList[0].initWithCards(BaiCao.gameLogic.cards);
        this.playerList[0].upBai();

        var countNum = 0;
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3) {
                countNum++;
            }
        }

        var stt = -1;
        this.effect2D.hideChiaBai();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3) {
                stt++;
                this.effect2D.chiaBai(this.playerList[i], countNum, stt);
            }
        }
        this.timeChiaBai = data.timeChiaBai;
        var callbackAddNanBai = function(){
            this.addNanBaiLayer(this.timeChiaBai -2);
        }

        if(data) {
            this.runAction(cc.sequence(cc.delayTime(2.3), cc.callFunc(callbackAddNanBai.bind(this))));
        }
    },

    chiaBaiInstant: function(cards){
        var i;
        for(i = 0; i < 5; i++){
            this.playerList[i].clearBai();
        }
        cc.log("chiaBaiInstant");
        this.playerList[0].initWithCards(BaiCao.gameLogic.myCards);
        this.playerList[0].moBai();

        for(var i = 1; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            this.playerList[i].displayBai();
        }
    },

    addNanBaiLayer: function(time){
        this.nanBaiTimeUp();
        this.effect2D.hideChiaBai();
        if(BaiCao.gameLogic.gameServerState != BaiCao.GameStateServer.CHIA_BAI){
            return;
        }
        var layer = gameScenePool.getNanBaiBaiCaoLayer();
        layer.gameLayer = this;
        layer.setLocalZOrder(2);
        layer.setTag(BaiCao.BaiCaoScene.nanBaiTag);

        this.effect2D.addChild(layer);

        layer.initCards(BaiCao.gameLogic.cards);
        layer.initWithQuanBai();
        if(time >= 1) {
            this.addDemLuiSimple(time);
        }
    },

    nanBaiTimeUp: function(){
        var nanBai;
        if(this.effect2D.getChildByTag(0 + BaiCao.BaiCaoScene.nanBaiTag)){
            this.effect2D.getChildByTag(0 + BaiCao.BaiCaoScene.nanBaiTag).removeFromParent();
        }
    },

    displayMyCard: function(){
        this.btnMoBai.setVisible(true);
        this.playerList[0].moBai();
    },

    moBaiCaLang: function(){
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(BaiCao.gameLogic.players[i].status == 3 && (BaiCao.gameLogic.players[i].hasMoBai == false)){
                BaiCao.gameLogic.players[i].hasMoBai = true;
                this.playerList[i].moBai();
            }
        }
    },

    back: function(){
        cc.log("back");
    },

    getImgStartNum: function(num){
        return Sam.res.startNumPngPath + num + ".png";
    },

    addEndGameLayer: function(){
        if(BaiCao.gameLogic.gameServerState != BaiCao.GameStateServer.END_GAME){
            return;
        }
        this.hideEndGameLayer();
        this.endGameLayer = gameScenePool.getBaiCaoEndGameScene();
        this.endGameLayer.setData(this.data);
        //var bg = ccui.Helper.seekWidgetByName(this.endGameLayer, "bg");
        this.effect2D.addChild(this.endGameLayer);
        this.endGameLayer.setLocalZOrder(7);
        this.endGameLayer.reloadTable();

        cc.log("endGameLayer addEndGameLayer");
        this.endGameLayer.bg.setScale(0.75);
        this.endGameLayer.bg.setOpacity(0);
        this.endGameLayer.bg.runAction(cc.spawn(new cc.EaseBackOut(cc.scaleTo(.3,1)),cc.fadeIn(.3)));
    },

    hideEndGameLayer: function(){
        cc.log("hideEndGameLayer1");
        if(this.endGameLayer){
            this.endGameLayer.removeFromParent();
            this.endGameLayer = null;
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
        var localChair = BaiCao.gameLogic.convertChair(globalChair);
        var player = this.playerList[localChair];
        var pos = player.uiAvatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effect2D.updateChatRoom(localChair,pos,  image);
    },
});

BaiCao.BaiCaoScene.btnavatarstarttag = 9000;
BaiCao.BaiCaoScene.BTN_BACK = 9008;
BaiCao.BaiCaoScene.BTN_CHAT = 9009;
BaiCao.BaiCaoScene.BTN_CHIA_BAI = 9010;
BaiCao.BaiCaoScene.BTN_MO_BAI = 9011;
BaiCao.BaiCaoScene.BTN_AUTO_START = 9012;
BaiCao.BaiCaoScene.BTN_DAT_CUOC = 9013;
BaiCao.BaiCaoScene.BTN_DOI_CHUONG = 9014;
BaiCao.BaiCaoScene.BTN_JOIN_ROOM = 9015;
BaiCao.BaiCaoScene.BTN_VAO_GA = 9016;
BaiCao.BaiCaoScene.BTN_CHAT = 9017;
BaiCao.BaiCaoScene.BTN_INFO = 9018;
BaiCao.BaiCaoScene.BTN_CASH = 9019;


BaiCao.BaiCaoScene.BTN_DAT_CUOC_START = 9050;
BaiCao.BaiCaoScene.BTN_DANH_BIEN_START = 9060;
BaiCao.BaiCaoScene.BTN_KE_CUA_START = 9080;
BaiCao.BaiCaoScene.BTN_OK_START = 9100;


BaiCao.BaiCaoScene.aftertag = 9200;
BaiCao.BaiCaoScene.donvitag = 9201;
BaiCao.BaiCaoScene.chuctag = 9202;
BaiCao.BaiCaoScene.nanBaiTag = 9203;

BaiCao.BaiCaoScene.instance = null;
BaiCao.BaiCaoScene.getInstance = function(){
    if(BaiCao.BaiCaoScene.instance == null){
        BaiCao.BaiCaoScene.instance = new BaiCao.BaiCaoScene();

        return BaiCao.BaiCaoScene.instance;
    }
}

