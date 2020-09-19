var caothap = null;
var caothapX = 0;
var caothapY = 0;
var caothapAppear = false;


var codeCaoThap = MiniGameBaseLayer.extend(
    {
        ctor: function () {

            this.resourcePath = "res/Minigame/ResCaoThap/";

            this.pn_caothap = null;
            this.pnRoom1 = null;
            this.pnRoom2 = null;
            this.pnRoom3 = null;
            this.pnRoom4 = null;
            this.pnRoom5 = null;
            this.sproom1 = null;
            this.sproom2 = null;
            this.sproom3 = null;
            this.sproom4 = null;
            this.sproom5 = null;
            this.txtroom1 = null;
            this.txtroom2 = null;
            this.txtroom3 = null;
            this.txtroom4 = null;
            this.txtroom5 = null;
            this.buttonroom1 = null;
            this.buttonroom2 = null;
            this.buttonroom3 = null;
            this.buttonroom4 = null;
            this.buttonroom5 = null;
            this.valueMoneyCT = 1000;
            this.valuemoneyTypeCT = 1;
            this.btnMoneyTypeCT = null;
            this.moneyTypeCT = null;
            this.btnUpCT = null;
            this.btnDownCT = null;
            this.btnPlayCT = null;
            this.spQuanBaiCT = null;
            this.linkImage = "";
            this.link_image_chat = "";
            this.text_quanbai = "";
            this.color_quanbai = "";
            this.pn_labai = null;
            this.btn_event = null;

            this.numberRandom = 15;
            this.pnTxtMoney = null;
            this.txtMucTren = null;
            this.txtMucGiua = null;
            this.txtMucDuoi = null;
            this.enableLaBai1 = false;
            this.enableLaBai2 = false;
            this.enableLaBai3 = false;
            this.txt_At1 = null;
            this.txt_At2 = null;
            this.txt_At3 = null;
            this.btnNewGame = null;

            this.sp_chat = null;
            this.sp_daunguoi = null;
            this.txt_labai = null;

            this.btnHelpCaoThap = null;
            this.pnGuildCT = null;
            this.btnCloseGuildCT = null;
            this.btnRankCaoThap = null;
            this.btnInfoCaoThap = null;
            this.btnCloseGameCT = null;
            this.txttime = null;
            this.timeMinute = 1;
            this.timeSecond = 59;
            this.tagCaothap = 1000;
            this.vitrix = 205;
            this.vitriy = -0.46;
            this.txt_chat = null;
            this.vitri_txt_x = 180;
            this.tagCaothap_text = 1500;
            this.txt_notice = null;
            this.bg_notice_1 = null;
            this.bg_notice_2 = null;
            this.bg_notice_3 = null;
            this.bg_notice_4 = null;
            this.bg_notice_5 = null;
            this.valueOld = null;
            this.valueNew = null;
            this.breakValue = null;
            this.CURRENT_ROOM_CAO_THAP = 0;
            this.txtEffectMoney = null;
            this.isgaming = false;
            this.waitFinish = false;
            this.pn_effect_nohu = null;
            this.sp_moc = null;
            // this.Particle_1 = null;
            // this.Particle_2 = null;
            // this.Particle_3 = null;
            // this.Particle_4 = null;
            this.ranPos = null;
            // this.Particle_star = null;
            this.roomjoint = 0;
            this.ischangeroom = false;
            this.txthuCT = null;
            this.strhu = null;
            this.numberphien = null;
            this.countOpenCard = null;
            this.sp_image_blur = null;

            this.isruneffecthu = false;
            this.breakValueHu = 0;
            this.valueOldHu = 0;
            this.valueNewHu = 0;

            this.txtmaphien = null;
            this.currentCard = null;
            this.money_mid = null;
            this.money_over = null;
            this.money_under = null;
            this.bg_tren = null;
            this.bg_duoi = null;

            this.statusStopGame = null;
            this.moneyWin = null;
            this.currentMoneyUser = null;
            this.sp_circle = null;
            this.sp_bg_hu = null;
            this.sp_text_hu = null;
            this.lb_win_hu = null;
            this.statuszoom = false;
            this.onMouseVisible = null;
            this.bg_room1 = null;
            this.bg_room2 = null;
            this.bg_room3 = null;
            this.bg_room4 = null;
            this.bg_room5 = null;
            this.moveOn1 = false;
            this.moveOn2 = false;
            this.moveOn3 = false;
            this.moveOn4 = false;
            this.moveOn5 = false;
            this.isrunningCT = false;
            this.btn_close_effect_hu = null;
            this.isshowNoHu = false;

            this._super("codeCaoThap");
            // this.initWithBinaryFile("res/CaoThapScene.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResCaoThap/PlistCaoThap.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResMiniPoker/PlistMiniPoker.plist");
            this.pn_caothap = this.addLayoutStructure(this, "_layout", cc.p(640.00, 360.00), "", cc.size(778.00, 330.00), false);
            this.addMasterLayer(this._layout);
            this.initBackground();
            this.initPanelLaBai();
            this.initBackgroundSecon();
            this.initPanelRoom();
            this.initBackgroundThird();
            this.initpnTxtMoney();
            this.initBackgroundFourth();
            this.initPnEffectNohu();

            this.initEffect();


        },

        initBackground: function () {
            if (!cc.sys.isNative) {
                this.setScale(0.7);
            }

            var background = this._layout;

            this.addSpriteStructureWithoutResourcePath(background, "shadow_tren", cc.p(389.65, 349.97), this.commonImagePath + "shadow_tren.png");
            this.addSpriteStructureWithoutResourcePath(background, "bgCaoThap", cc.p(389.65, 165.53), this.commonImagePath + "backgroundTX.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_hu", cc.p(389.65, 302.14), this.commonImagePath + "bg_hu.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_room5", cc.p(246.40, 57.91), this.commonImagePath + "bg_room.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_room4", cc.p(165.87, 57.91), this.commonImagePath + "bg_room.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_room3", cc.p(91.65, 89.09), this.commonImagePath + "bg_room.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_room2", cc.p(59.92, 164.77), this.commonImagePath + "bg_room.png");
            this.addSpriteStructureWithoutResourcePath(background, "bg_room1", cc.p(90.97, 243.98), this.commonImagePath + "bg_room.png");
            this.addButtonStructure(background, "btnRankCaoThap", codeCaoThap.BTN_RANKCT, cc.p(708.39, 236.67), true, this.commonImagePath + "bangvinhdanh.png");
            this.addButtonStructure(background, "btnHelpCaoThap", codeCaoThap.BTN_GUILDCT, cc.p(725.55, 165.24), true, this.commonImagePath + "huongdan.png");
            this.addButtonStructure(background, "btnInfoCaoThap", codeCaoThap.BTN_INFOCT, cc.p(708.39, 95.98), true, this.commonImagePath + "lsgd.png");
            this.addSpriteStructure(background, "bg_labai", cc.p(249.50, 173.50), "bg_labai_to.png");
            this.addSpriteStructure(background, "spQuanBaiCT", cc.p(248.70, 174.48), "labai.png");
        },

        initPanelLaBai: function () {

            var layout = this.addLayoutStructure(this._layout, "pn_labai", cc.p(249.70, 174.48));
            this.addSpriteStructure(layout, "sp_labaithat", cc.p(-1.30, 2.30), "bg_labai.png");
            this.addSpriteStructureWithoutResourcePath(layout, "sp_daunguoi", cc.p(38.50, -49.50), this.commonImagePath + "DauNguoi/K_ro.png", {
                anchorX: 1,
                anchorY: 0
            });
            this.addTextStructure(layout, "txt_labai", cc.p(-27.20, 39.03), "10", fontRobotoMedium.fontName, "40");
            this.addSpriteStructureWithoutResourcePath(layout, "sp_chat", cc.p(-27.20, 9.45), this.commonImagePath + "DauNguoi/chat_co.png", {
                scaleX: 0.32,
                scaleY: 0.32
            });
            this.addSpriteStructure(layout, "sp_image_blur", cc.p(-1.30, 2.30), "image_blur.png");

        },

        initBackgroundSecon: function () {
            var layout = this._layout;
            this.addButtonStructure(layout, "btnPlayCT", codeCaoThap.BTN_PLAYGAMECT, cc.p(248.70, 174.48), true, this.resourcePath + "btnplay.png");
            this.addSpriteStructure(layout, "btnUpDis", cc.p(389.08, 196.22), "btn-up-dis.png");
            this.addSpriteStructure(layout, "btnDownDis", cc.p(389.07, 97.72), "btn-up-dis.png", {
                rotationX: 180,
                rotationY: 180
            });
            this.addSpriteStructure(layout, "spLabaiCT1", cc.p(505.65, 152.07), "a.png");
            this.addSpriteStructure(layout, "spLabaiCT3", cc.p(653.96, 152.07), "a.png");
            this.addSpriteStructure(layout, "spLabaiCT2", cc.p(579.93, 152.07), "a.png");
            this.addTextStructure(layout, "txt_At3", cc.p(653.96, 155.41), "A", fontRobotoBold.fontName, "55");
            this.addTextStructure(layout, "txt_At2", cc.p(579.93, 155.41), "A", fontRobotoBold.fontName, "55");
            this.addTextStructure(layout, "txt_At1", cc.p(505.65, 155.41), "A", fontRobotoBold.fontName, "55");
            this.addButtonStructure(layout, "btnUpCT", codeCaoThap.BTN_UPCAOTHAP, cc.p(389.07, 196.22), true, this.resourcePath + "btn-up-h.png");
            this.addButtonStructure(layout, "btnDownCT", codeCaoThap.BTN_DOWNCAOTHAP, cc.p(389.07, 97.72), true, this.resourcePath + "btn-up-h.png", {
                rotationX: 180,
                rotationY: 180
            });
            this.addSpriteStructureWithoutResourcePath(layout, "moneyTypeCT", cc.p(156.33, 306.30), this.commonImagePath + "choivin.png");
            this.addButtonStructure(layout, "btnMoneyTypeCT", codeCaoThap.BTN_CHANGEROOMCT, cc.p(156.33, 306.41), true, this.resourcePath + "disactive-room.png");
            this.addSpriteStructure(layout, "DisBtnNew", cc.p(579.93, 63.81), "btnluotmoi_dis.png");
            this.addButtonStructure(layout, "btnCloseGameCT", codeCaoThap.BTN_CLOSEGAMECT, cc.p(680.84, 326.95), true, this.commonImagePath + "btn_closegame.png");
            this.addButtonStructure(layout, "btnNewGame", codeCaoThap.BTN_NEWGAMECT, cc.p(579.93, 63.81), true, [this.resourcePath + "btnluotmoi.png", this.resourcePath + "btnluotmoi_s.png"]);
        },

        initPanelRoom: function () {
            var postions = [[86.87, 239.13], [55.59, 159.93], [87.37, 84.83], [161.64, 53.65], [242.14, 53.65]];

            function createBtnRoom(position, number) {
                var name = number + 1;
                var layout = this.addLayoutStructure(this._layout, "pnRoom" + number, cc.p.apply(this, position), "", cc.size(10.00, 10.00), false, {
                    anchorX: 0,
                    anchorY: 0
                });
                this.addSpriteStructureWithoutResourcePath(layout, "sproom" + name, cc.p(4.22, 3.89), this.commonImagePath + "room_select.png");
                this.addButtonStructure(layout, "buttonroom" + name, codeCaoThap["BTN_CHOSEROOM" + name], cc.p(4.22, 3.89), true, this.resourcePath + "disactive-room.png");
                var txtroom = this.addTextStructure(layout, "txtroom" + name, cc.p(4.00, 3.20), "100K", fontRobotoBold.fontName, "23");
                txtroom.setTouchEnabled(false);
            };
            postions.forEach(createBtnRoom.bind(this));
        },

        initBackgroundThird: function () {
            var layout = this._layout;
            this.addTextStructure(layout, "txthuCT", cc.p(388.64, 302.64), "", fontRobotoBold.fontName, "34");
            this.addSpriteStructure(layout, "bg_phien", cc.p(548.56, 270.44), "bg_phien.png", {anchorX: 0});
            this.addSpriteStructure(layout, "bg_time", cc.p(579.93, 223.98), "bg_time.png");
            this.addTextStructure(layout, "txtmaphien", cc.p(549.10, 270.38), "#12345678900", fontRobotoMedium.fontName, 20, undefined, {
                anchorX: 0,
                __size: cc.size(148.00, 20.00)
            });
            this.addTextStructure(layout, "txttime", cc.p(579.35, 223.45), "01:59", fontRobotoMedium.fontName, 30);
        },

        initpnTxtMoney: function () {
            var layout = this.addLayoutStructure(this._layout, "pnTxtMoney", cc.p(390.09, 114.81), "", cc.size(10.00, 10.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            this.addSpriteStructure(layout, "bg_point", cc.p(0, 32.00), "bg_point.png");
            this.addSpriteStructure(layout, "bg_tren", cc.p(0, 121.71), "bg_point.png");
            this.addSpriteStructure(layout, "bg_duoi", cc.p(0, -57.58), "bg_point.png");
            this.addTextStructure(layout, "txtMucTren", cc.p(-1.02, 121.40), "", fontRobotoMedium.fontName, 28);
            this.addTextStructure(layout, "txtMucGiua", cc.p(-1.02, 31.15), "", fontRobotoMedium.fontName, 30, undefined, {__size: cc.size(170.00, 30)});
            this.addTextStructure(layout, "txtMucDuoi", cc.p(-1.02, -57.78), "", fontRobotoMedium.fontName, 28);
            this.addTextStructure(layout, "txtEffectMoney", cc.p(-1.02, 31.15), "120.000.000", fontRobotoMedium.fontName, 30, undefined, {__size: cc.size(200.00, 30)});
        },

        initBackgroundFourth: function () {
            var layout = this._layout;
            this.addSpriteStructure(layout, "bg_notice", cc.p(393.91, -0.38), "bg_point.png", {
                scaleX: 667.00/138
            });
            this.addTextStructure(layout, "txt_notice", cc.p(393.91, -0.38), "Click Play để bắt đầu chơi", fontRobotoMedium.fontName, 22, "#E8DAAD");
            this.addSpriteStructure(layout, "bg_notice_1", cc.p(393.91, -0.38), "bg_point.png", {
                width: 667.00,
                height: -40.38
            });
            this.addSpriteStructure(layout, "bg_notice_2", cc.p(393.91, -80.38), "bg_point.png", {
                width: 667.00,
                height: 48.00
            });
            this.addSpriteStructure(layout, "bg_notice_3", cc.p(393.91, -120.38), "bg_point.png", {
                width: 667.00,
                height: 48.00
            });
            this.addSpriteStructure(layout, "bg_notice_4", cc.p(393.91, -160.38), "bg_point.png", {
                width: 667.00,
                height: 48.00
            });
            this.addSpriteStructure(layout, "bg_notice_5", cc.p(393.91, -200.38), "bg_point.png", {
                width: 667.00,
                height: 48.00
            });
        },

        initPnEffectNohu: function () {
            var layout = this.addLayoutStructure(this._layout, "pn_effect_nohu", cc.p(373.00, 175.00), "", cc.size(0.00, 0.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            this.addButtonStructure(layout, "btn_close_effect_hu", codeCaoThap.BTN_CLOSE_EFFECT_HU, cc.p(-355.00, 138.00), true, this.resourcePath + "btn_play.png", {
                anchorX: 0,
                anchorY: 0
            });
            this.addLayoutStructure(layout, "sp_moc", cc.p(0, 0), "", cc.size(0.00, 0.00), false);
            this.addSpriteStructure(layout, "sp_circle", cc.p(0, 0));
            this.addSpriteStructure(layout, "sp_bg_hu", cc.p(0, 95.00), undefined, {
                anchorX: 0,
                anchorY: 1
            });
            this.addSpriteStructure(layout, "sp_text_hu", cc.p(0, 0));
            this.addSpriteStructure(layout, "sp_icon_CT", cc.p(0, 64), "icon_caothap.pnd");
            this.addTextStructure(layout, "lb_win_hu", cc.p(0, -48.87), "Text Label", fontRobotoMedium.fontName, 36);

            this.addButtonStructure(layout, "btn_event", codeCaoThap.BTN_EVENTCT, cc.p(233.70, 332.43), true, this.resourcePath + "event_caothap.png", {
                anchorX: 0,
                anchorY: 0
            });
        },

        initEffect: function () {
            // var caothap = this;

            this.sproom1.setVisible(false);
            this.sproom2.setVisible(false);
            this.sproom3.setVisible(false);
            this.sproom4.setVisible(false);
            this.sproom5.setVisible(false);

            this.txtroom1.setString("1K");
            this.txtroom2.setString("10K");
            this.txtroom3.setString("50K");
            this.txtroom4.setString("100K");
            this.txtroom5.setString("500K");

            this.buttonroom1.setEnabled(false);
            this.buttonroom2.setEnabled(false);
            this.buttonroom3.setEnabled(false);
            this.buttonroom4.setEnabled(false);
            this.buttonroom5.setEnabled(false);

            this.btnMoneyTypeCT.setEnabled(false);
            this.btnUpCT.setVisible(false);
            this.btnDownCT.setVisible(false);
            this.btnPlayCT.setVisible(false);
            this.sp_image_blur.setVisible(false);
            this.txt_labai.setString("");
            this.pn_labai.setVisible(false);
            this.txtMucTren.setString("");
            this.txtMucDuoi.setString("");
            this.txtEffectMoney.setString("");
            this.txtMucGiua.setString(formatMoney(0, 3, this.valueMoneyCT));
            this.txtMucGiua.setColor(cc.color("#F3F354"));
            this.txtEffectMoney.setColor(cc.color("#F3F354"));
            this.txtMucTren.setColor(cc.color("#F3F354"));
            this.txtMucDuoi.setColor(cc.color("#F3F354"));
            this.bg_tren.setVisible(false);
            this.bg_duoi.setVisible(false);
            this.strhu = this.txthuCT.getString();
            this.txthuCT.setColor(cc.color("#FFFF00"));
            this.txtmaphien.setString("");
            this.btnNewGame.setVisible(false);
            this.bg_notice_1.setVisible(false);
            this.bg_notice_2.setVisible(false);
            this.bg_notice_3.setVisible(false);
            this.bg_notice_4.setVisible(false);
            this.bg_notice_5.setVisible(false);
            this.pn_effect_nohu.setVisible(false);
            // this.Particle_1 = this.pn_effect_nohu.getChildByName("Particle_1");
            // this.Particle_1.stopSystem();
            // this.Particle_2 = this.pn_effect_nohu.getChildByName("Particle_2");
            // this.Particle_2.stopSystem();
            // this.Particle_3 = this.pn_effect_nohu.getChildByName("Particle_3");
            // this.Particle_3.stopSystem();
            // this.Particle_4 = this.pn_effect_nohu.getChildByName("Particle_4");
            // this.Particle_4.stopSystem();
            // this.Particle_star = this.pn_effect_nohu.getChildByName("Particle_star");
            // this.Particle_star.stopSystem();

            this.btn_close_effect_hu.setEnabled(false);

            this.txttime.setString("02:00");
            this.enableButtonRoom();
            // ve truoc
            for (var i = 0; i < 52; i++) {
                //cc.log("i: " + caothap.tagCaothap);
                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap) == null) {
                    var osprite = new cc.Sprite();
                    osprite.initWithFile("res/Minigame/ResCaoThap/bich.png", cc.rect(0, 0, 14, 17));
                    osprite.setTag(caothap.tagCaothap);
                    caothap.pn_caothap.addChild(osprite);
                    osprite.x = caothap.vitrix;
                    osprite.y = caothap.vitriy;
                    caothap.tagCaothap = caothap.tagCaothap + 1;
                    caothap.vitrix = caothap.vitrix + 42;
                    if (caothap.tagCaothap == 1010 || caothap.tagCaothap == 1020 || caothap.tagCaothap == 1030 || caothap.tagCaothap == 1040 || caothap.tagCaothap == 1050) {
                        caothap.vitrix = 205;
                    }
                }
                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text) == null) {
                    var text = new cc.LabelTTF('"res/ResCaoThap/Roboto-Regular.ttf"', '', 22, cc.size(30, 29), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    text.setColor(cc.color("#FFFF00"));
                    text.setString("K");
                    text.setTag(caothap.tagCaothap_text);
                    caothap.pn_caothap.addChild(text);
                    text.setPosition(cc.p(caothap.vitri_txt_x, caothap.vitriy));
                    caothap.tagCaothap_text = caothap.tagCaothap_text + 1;
                    caothap.vitri_txt_x = caothap.vitri_txt_x + 42;
                    if (caothap.tagCaothap_text == 1510 || caothap.tagCaothap_text == 1520 || caothap.tagCaothap_text == 1530 || caothap.tagCaothap_text == 1540 || caothap.tagCaothap_text == 1550) {
                        caothap.vitri_txt_x = 180;
                        caothap.vitriy = caothap.vitriy - 40;
                    }
                }
            }

            for (var i = 1000; i < caothap.tagCaothap; i++) {
                var osprite = caothap.pn_caothap.getChildByTag(i);
                osprite.setVisible(false);
            }
            caothap.tagCaothap = 1000;
            for (var i = 1500; i < caothap.tagCaothap_text; i++) {
                var text = caothap.pn_caothap.getChildByTag(i);
                text.setString("");
            }
            caothap.tagCaothap_text = 1500;

            /// move on room
            var ShowLineSelect1 = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (caothap.moveOn1 == false) {
                                caothap.sproom1.setVisible(true);
                                caothap.moveOn1 = true;
                            }
                        } else {
                            if (caothap.moveOn1 == true) {
                                if (caothap.roomjoint == 0 || caothap.roomjoint == 5) {
                                } else
                                    caothap.sproom1.setVisible(false);
                                caothap.moveOn1 = false;
                            }
                        }
                    }
                });
            cc.eventManager.addListener(ShowLineSelect1.clone(), this.bg_room1);

            var ShowLineSelect2 = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (caothap.moveOn2 == false) {
                                caothap.sproom2.setVisible(true);
                                caothap.moveOn2 = true;
                            }
                        } else {
                            if (caothap.moveOn2 == true) {
                                if (caothap.roomjoint == 1 || caothap.roomjoint == 6) {
                                } else
                                    caothap.sproom2.setVisible(false);
                                caothap.moveOn2 = false;
                            }
                        }
                    }
                });
            cc.eventManager.addListener(ShowLineSelect2.clone(), this.bg_room2);

            var ShowLineSelect3 = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (caothap.moveOn3 == false) {
                                caothap.sproom3.setVisible(true);
                                caothap.moveOn3 = true;
                            }
                        } else {
                            if (caothap.moveOn3 == true) {
                                if (caothap.roomjoint == 2 || caothap.roomjoint == 7) {
                                } else
                                    caothap.sproom3.setVisible(false);
                                caothap.moveOn3 = false;
                            }
                        }
                    }
                });
            cc.eventManager.addListener(ShowLineSelect3.clone(), this.bg_room3);

            var ShowLineSelect4 = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (caothap.moveOn4 == false) {
                                caothap.sproom4.setVisible(true);
                                caothap.moveOn4 = true;
                            }
                        } else {
                            if (caothap.moveOn4 == true) {
                                if (caothap.roomjoint == 3 || caothap.roomjoint == 8) {
                                } else
                                    caothap.sproom4.setVisible(false);
                                caothap.moveOn4 = false;
                            }
                        }
                    }
                });
            cc.eventManager.addListener(ShowLineSelect4.clone(), this.bg_room4);

            var ShowLineSelect5 = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (caothap.moveOn5 == false) {
                                caothap.sproom5.setVisible(true);
                                caothap.moveOn5 = true;
                            }
                        } else {
                            if (caothap.moveOn5 == true) {
                                if (caothap.roomjoint == 4 || caothap.roomjoint == 9) {
                                }
                                else
                                    caothap.sproom5.setVisible(false);
                                caothap.moveOn5 = false;
                            }
                        }
                    }
                });
            cc.eventManager.addListener(ShowLineSelect5.clone(), this.bg_room5);
            ///
        },

        showEffectNoHu: function (money) {
            this.pn_effect_nohu.setVisible(true);
            this.sp_circle.setTexture("res/Minigame/ImageChung/effect_circle.png");
            this.sp_bg_hu.setSpriteFrame("res/Minigame/ResMiniPoker/bg_effect.png");
            this.sp_bg_hu.setScaleY(1.4);
            this.sp_text_hu.setSpriteFrame("res/Minigame/ResMiniPoker/text_nohu.png");
            this.sp_text_hu.setScale(0.8);
            this.isshowNoHu = true;

            var rotateByVT = new cc.RotateBy(5, 360);
            this.sp_circle.runAction(cc.repeatForever(rotateByVT));

            if (this.valuemoneyTypeCT == 1)
                this.lb_win_hu.setColor(cc.color("#F3F354"));
            else
                this.lb_win_hu.setColor(cc.color("#EDEDFC"));
            this.lb_win_hu.setString("+" + formatMoney(0, 3, money));
            this.lb_win_hu.setScale(0);
            this.zoomTextMoney();

            // this.Particle_star.resetSystem();
            this.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(this.Effect1, this)));
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(this.Effect2, this)));
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.Effect3, this)));
            this.runAction(cc.sequence(cc.delayTime(0.7), cc.callFunc(this.Effect4, this), cc.delayTime(15), cc.callFunc(function () {
                caothap.btn_close_effect_hu.setEnabled(true);
            })));
        }
        ,
        zoomTextMoney: function () {
            if (this.statuszoom == false) {
                this.statuszoom = true;
                this.lb_win_hu.runAction(cc.sequence(cc.scaleTo(0.4, 1.1), cc.delayTime(0.01), cc.callFunc(this.zoomTextMoney, this)));
            } else {
                this.statuszoom = false;
                this.lb_win_hu.runAction(cc.sequence(cc.scaleTo(0.4, 0.9), cc.delayTime(0.01), cc.callFunc(this.zoomTextMoney, this)));
            }
        }
        ,

        Effect1: function () {
            this.randomPos(parseInt(this.sp_moc.x - 376), parseInt(this.sp_moc.x + 376));
            // this.Particle_1.x = this.ranPos;
            this.randomPos(parseInt(this.sp_moc.y - 231), parseInt(this.sp_moc.y + 231));
            // this.Particle_1.y = this.ranPos;
            // this.Particle_1.resetSystem();
            // this.Particle_1.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.Effect1, this)));
        }
        ,
        Effect2: function () {
            this.randomPos(parseInt(this.sp_moc.x - 376), parseInt(this.sp_moc.x + 376));
            // this.Particle_2.x = this.ranPos;
            this.randomPos(parseInt(this.sp_moc.y - 231), parseInt(this.sp_moc.y + 231));
            // this.Particle_2.y = this.ranPos;
            // this.Particle_2.resetSystem();
            // this.Particle_2.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this.Effect2, this)));
        }
        ,
        Effect3: function () {
            this.randomPos(parseInt(this.sp_moc.x - 376), parseInt(this.sp_moc.x + 376));
            // this.Particle_3.x = this.ranPos;
            this.randomPos(parseInt(this.sp_moc.y - 231), parseInt(this.sp_moc.y + 231));
            // this.Particle_3.y = this.ranPos;
            // this.Particle_3.resetSystem();
            // this.Particle_3.runAction(cc.sequence(cc.delayTime(0.9), cc.callFunc(this.Effect3, this)));
        }
        ,
        Effect4: function () {
            this.randomPos(parseInt(this.sp_moc.x - 376), parseInt(this.sp_moc.x + 376));
            // this.Particle_4.x = this.ranPos;
            this.randomPos(parseInt(this.sp_moc.y - 231), parseInt(this.sp_moc.y + 231));
            // this.Particle_4.y = this.ranPos;
            // this.Particle_4.resetSystem();
            // this.Particle_4.runAction(cc.sequence(cc.delayTime(0.6), cc.callFunc(this.Effect4, this)));
        }
        ,
        randomPos: function (min, max) {
            this.ranPos = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        ,
        checkOpenHu: function () {
            if (this.isshowNoHu == true) {
                this.isshowNoHu = false;
                this.closeEffectNoHu();
            }
        },

        closeEffectNoHu: function () {
            this.isshowNoHu = false;
            this.btn_close_effect_hu.setEnabled(false);
            this.pn_effect_nohu.setVisible(false);
            this.sp_circle.stopAllActions();
            this.lb_win_hu.stopAllActions();
            // this.Particle_star.stopSystem();
            // this.Particle_1.stopSystem();
            // this.Particle_2.stopSystem();
            // this.Particle_3.stopSystem();
            // this.Particle_4.stopSystem();
            // this.Particle_1.stopAllActions();
            // this.Particle_2.stopAllActions();
            // this.Particle_3.stopAllActions();
            // this.Particle_4.stopAllActions();
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case codeCaoThap.BTN_CHOSEROOM1:
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            caothap.valueMoneyCT = 1000;
                            this.roomjoint = 0;
                        } else {
                            caothap.valueMoneyCT = 10000;
                            this.roomjoint = 5;
                        }
                        this.resetSellectRoom();
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom1.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_CHOSEROOM2:
                    //cc.log("vao");
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            caothap.valueMoneyCT = 10000;
                            this.roomjoint = 1;
                        } else {
                            caothap.valueMoneyCT = 100000;
                            this.roomjoint = 6;
                        }
                        this.resetSellectRoom();
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom2.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_CHOSEROOM3:
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            caothap.valueMoneyCT = 50000;
                            this.roomjoint = 2;
                        } else {
                            caothap.valueMoneyCT = 500000;
                            this.roomjoint = 7;
                        }
                        this.resetSellectRoom();
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom3.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_CHOSEROOM4:
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            caothap.valueMoneyCT = 100000;
                            this.roomjoint = 3;
                        } else {
                            caothap.valueMoneyCT = 1000000;
                            this.roomjoint = 8;
                        }
                        this.resetSellectRoom();
                        if (this.roomjoint == 8) {
                            this.txtMucTren.setFontSize(26);
                            this.txtMucGiua.setFontSize(28);
                            this.txtMucDuoi.setFontSize(26);
                        }
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom4.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_CHOSEROOM5:
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            caothap.valueMoneyCT = 500000;
                            this.roomjoint = 4;
                        } else {
                            caothap.valueMoneyCT = 5000000;
                            this.roomjoint = 9;
                        }
                        this.resetSellectRoom();
                        this.txtMucTren.setFontSize(26);
                        this.txtMucGiua.setFontSize(28);
                        this.txtMucDuoi.setFontSize(26);
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom5.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_CHANGEROOMCT:
                    this.checkOpenHu();
                    if (this.isrunningCT == false) {
                        if (caothap.valuemoneyTypeCT == 1) {
                            this.txtMucGiua.setColor(cc.color("#EDEDFC"));
                            this.txtEffectMoney.setColor(cc.color("#EDEDFC"));
                            this.txtMucTren.setColor(cc.color("#EDEDFC"));
                            this.txtMucDuoi.setColor(cc.color("#EDEDFC"));
                            this.txthuCT.setColor(cc.color("#E3E3E3"));
                            caothap.valuemoneyTypeCT = 0;
                            caothap.moneyTypeCT.setTexture("res/Minigame/ImageChung/choixu.png");
                            caothap.valueMoneyCT = 10000;
                            this.roomjoint = 5;
                            caothap.txtroom1.setString("10K");
                            caothap.txtroom2.setString("100K");
                            caothap.txtroom3.setString("500K");
                            caothap.txtroom4.setString("1M");
                            caothap.txtroom5.setString("5M");
                        } else {
                            this.txtMucGiua.setColor(cc.color("#F3F354"));
                            this.txtEffectMoney.setColor(cc.color("#F3F354"));
                            this.txtMucTren.setColor(cc.color("#F3F354"));
                            this.txtMucDuoi.setColor(cc.color("#F3F354"));
                            this.txthuCT.setColor(cc.color("#FFFF00"));
                            caothap.valuemoneyTypeCT = 1;
                            caothap.moneyTypeCT.setTexture("res/Minigame/ImageChung/choivin.png");
                            caothap.valueMoneyCT = 1000;
                            this.roomjoint = 0;
                            caothap.txtroom1.setString("1K");
                            caothap.txtroom2.setString("10K");
                            caothap.txtroom3.setString("50K");
                            caothap.txtroom4.setString("100K");
                            caothap.txtroom5.setString("500K");
                        }
                        this.resetSellectRoom();
                        this.funChangeRoom(this.CURRENT_ROOM_CAO_THAP, this.roomjoint);
                        caothap.sproom1.setVisible(true);
                    }
                    break;
                case codeCaoThap.BTN_UPCAOTHAP:
                    if (this.isgaming == false) {
                        this.funPlayCaoThap(1);
                    }
                    break;
                case codeCaoThap.BTN_DOWNCAOTHAP:
                    if (this.isgaming == false) {
                        this.funPlayCaoThap(0);
                    }
                    break;
                case codeCaoThap.BTN_PLAYGAMECT:
                    this.checkOpenHu();
                    if (this.waitFinish == false) {
                        this.btnPlayCT.setVisible(false);
                        this.funStartGame(this.valueMoneyCT, this.valuemoneyTypeCT);
                    }
                    break;
                case codeCaoThap.BTN_NEWGAMECT:
                    if (this.isgaming == false) {
                        this.funStopGame();
                        this.waitFinish = true;
                    }
                    break;
                case codeCaoThap.BTN_GUILDCT:
                    open_caothap_guild();
                    break;
                case codeCaoThap.BTN_RANKCT:
                    open_caothap_vinhdanh(this.valuemoneyTypeCT);
                    break;
                case codeCaoThap.BTN_INFOCT:
                    open_caothap_lichsu(this.valuemoneyTypeCT);
                    break;
                case codeCaoThap.BTN_EVENTCT:
                    open_caothap_sanbai();
                    break;
                case codeCaoThap.BTN_CLOSEGAMECT:
                    closeCaoThap();
                    break;
                case codeCaoThap.BTN_CLOSE_EFFECT_HU:
                    this.closeEffectNoHu();
                    break;
            }
        },

        funStopGame: function () {
            var caoThapSend = new CmdStopCaoThap();
            caoThapSend.putStopCaoThap(this.valueMoneyCT, this.valuemoneyTypeCT);
            Minigame.miniGameClient.send(caoThapSend);
            caoThapSend.clean();
        },

        funPlayCaoThap: function (choose) {
            var caothap = this;
            var caoThapSend = new CmdPlayCaoThap();
            caoThapSend.putPlayCaoThap(this.valueMoneyCT, this.valuemoneyTypeCT, choose);
            Minigame.miniGameClient.send(caoThapSend);
            caoThapSend.clean();
            caothap.btnUpCT.setVisible(true);
            caothap.btnDownCT.setVisible(true);
            caothap.btnNewGame.setVisible(true);
            caothap.btnUpCT.setEnabled(false);
            caothap.btnDownCT.setEnabled(false);
            caothap.btnNewGame.setEnabled(false);
            //this.autoRandomQuanBai();
            caothap.txttime.stopAllActions();
            caothap.timeMinute = 1;
            caothap.timeSecond = 59;
            caothap.txttime.setString("02:00");
        },

        funChangeRoom: function (roomLeavedId, roomJoinedId) {
            // cc.log("roomLeavedId : " + roomLeavedId + " roomJoinedId : " +roomJoinedId);
            var caoThapSend = new CmdChangeRoomCaoThap();
            caoThapSend.putChangeRoomCaoThap(roomLeavedId, roomJoinedId);
            Minigame.miniGameClient.send(caoThapSend);
            caoThapSend.clean();
            this.ischangeroom = true;
        },

        funStartGame: function (betValue, moneyType) {
            var caoThapSend = new CmdStartCaoThap();
            caoThapSend.putStartCaoThap(betValue, moneyType);
            Minigame.miniGameClient.send(caoThapSend);
            caoThapSend.clean();
        },

        effectMoneyFly: function (value) {
            caothap.txtMucGiua.setString("");
            this.txtEffectMoney.setString("+" + formatMoney(0, 3, value));

            var fadeout = new cc.FadeOut(3);
            this.txtEffectMoney.runAction(fadeout);
            var actionBack = cc.MoveTo.create(3, cc.p(this.txtEffectMoney.x, this.txtEffectMoney.y + 50));
            this.txtEffectMoney.runAction(cc.sequence(actionBack, cc.callFunc(this.HideNotice, this)));
        },
        HideNotice: function () {
            this.txtEffectMoney.y = this.txtMucGiua.y;
            this.txtEffectMoney.setString("");
            caothap.valueOld = 0;
            var fadein = new cc.FadeIn(0);
            this.txtEffectMoney.runAction(fadein);

            this.opositeValue(this.valueMoneyCT);
            caothap.buttonroom1.setEnabled(true);
            caothap.buttonroom2.setEnabled(true);
            caothap.buttonroom3.setEnabled(true);
            caothap.buttonroom4.setEnabled(true);
            caothap.buttonroom5.setEnabled(true);
            this.btnMoneyTypeCT.setEnabled(true);
            caothap.btnPlayCT.setVisible(true);
        },

        funPlayGame: function () {
            var caothap = this;
            caothap.btnUpCT.setVisible(true);
            caothap.btnDownCT.setVisible(true);
            caothap.btnPlayCT.setVisible(false);
            this.autoRandomQuanBai();
            caothap.enableLaBai1 = false;
            caothap.enableLaBai2 = false;
            caothap.enableLaBai3 = false;
            this.txt_At1.setColor(cc.color("#FFFFFF"));
            this.txt_At2.setColor(cc.color("#FFFFFF"));
            this.txt_At3.setColor(cc.color("#FFFFFF"));
            caothap.bg_notice_1.setVisible(false);
            caothap.bg_notice_2.setVisible(false);
            caothap.bg_notice_3.setVisible(false);
            caothap.bg_notice_4.setVisible(false);
            caothap.bg_notice_5.setVisible(false);
            caothap.txttime.stopAllActions();
            caothap.timeMinute = 1;
            caothap.timeSecond = 59;
            caothap.txttime.setString("02:00");
            caothap.buttonroom1.setEnabled(false);
            caothap.buttonroom2.setEnabled(false);
            caothap.buttonroom3.setEnabled(false);
            caothap.buttonroom4.setEnabled(false);
            caothap.buttonroom5.setEnabled(false);
            this.btnMoneyTypeCT.setEnabled(false);
            caothap.txt_notice.setString("");
            caothap.spQuanBaiCT.setVisible(false);
        },
        Restart_game_caoThap: function () {
            var caothap = this;
            caothap.btnUpCT.setVisible(false);
            caothap.btnDownCT.setVisible(false);
            caothap.btnNewGame.setVisible(false);
            caothap.pn_labai.setVisible(false);
            caothap.txttime.stopAllActions();
            caothap.sp_daunguoi.setSpriteFrame("res/Minigame/ResCaoThap/dis_chat.png");
            caothap.sp_chat.setSpriteFrame("res/Minigame/ResCaoThap/dis_chat.png");
            caothap.txt_labai.setString("");
            this.txtMucTren.setString("");
            this.txtMucDuoi.setString("");
            this.bg_tren.setVisible(false);
            this.bg_duoi.setVisible(false);
            //cc.log("vao");
            for (var i = 1000; i < caothap.tagCaothap; i++) {
                var osprite = caothap.pn_caothap.getChildByTag(i);
                osprite.setVisible(false);
            }
            caothap.tagCaothap = 1000;
            for (var i = 1500; i < caothap.tagCaothap_text; i++) {
                var text = caothap.pn_caothap.getChildByTag(i);
                text.setString("");
            }
            caothap.tagCaothap_text = 1500;
            this.bg_notice_1.setVisible(false);
            this.bg_notice_2.setVisible(false);
            this.bg_notice_3.setVisible(false);
            this.bg_notice_4.setVisible(false);
            this.bg_notice_5.setVisible(false);
            if (caothap.isshowNoHu == false) {
                caothap.txttime.setString("02:00");
                caothap.txt_notice.setString("Click 'Play' để bắt đầu chơi");
            }
            caothap.spQuanBaiCT.setVisible(true);
            caothap.txt_At1.setColor(cc.color("#FFFFFF"));
            caothap.txt_At2.setColor(cc.color("#FFFFFF"));
            caothap.txt_At3.setColor(cc.color("#FFFFFF"));
            caothap.txtmaphien.setString("");
            caothap.isrunningCT = false;
        },
        Lose_game: function () {
            caothap.txttime.stopAllActions();

            if (this.valuemoneyTypeCT == 1) {
                lobby.userInfo.vinTotal = this.currentMoneyUser;
                lobby.updateMoney(lobby.userInfo.vinTotal, MONEY_VIN);
            } else {
                lobby.userInfo.xuTotal = this.currentMoneyUser;
                lobby.updateMoney(lobby.userInfo.xuTotal, MONEY_XU);
            }
            menutab.changeFontMoney();
            //cc.log("vao");
            for (var i = 1000; i < caothap.tagCaothap; i++) {
                var osprite = caothap.pn_caothap.getChildByTag(i);
                osprite.setVisible(false);
            }
            caothap.tagCaothap = 1000;
            for (var i = 1500; i < caothap.tagCaothap_text; i++) {
                var text = caothap.pn_caothap.getChildByTag(i);
                text.setString("");
            }
            caothap.tagCaothap_text = 1500;

            this.txt_notice.setString("Bạn đã thua. Chúc bạn may mắn lượt sau!");
            this.bg_notice_1.setVisible(false);
            this.bg_notice_2.setVisible(false);
            this.bg_notice_3.setVisible(false);
            this.bg_notice_4.setVisible(false);
            this.bg_notice_5.setVisible(false);
            caothap.txttime.setString("02:00");
            caothap.txt_At1.setColor(cc.color("#FFFFFF"));
            caothap.txt_At2.setColor(cc.color("#FFFFFF"));
            caothap.txt_At3.setColor(cc.color("#FFFFFF"));
            caothap.countOpenCard = 0;
        },

        actionLoseGame: function () {
            this.runAction(cc.sequence(cc.callFunc(this.Lose_game, this), cc.delayTime(2.5), cc.callFunc(function () {
                caothap.txt_notice.setString("Click 'Play' để bắt đầu chơi");
                caothap.buttonroom1.setEnabled(true);
                caothap.buttonroom2.setEnabled(true);
                caothap.buttonroom3.setEnabled(true);
                caothap.buttonroom4.setEnabled(true);
                caothap.buttonroom5.setEnabled(true);
                caothap.btnMoneyTypeCT.setEnabled(true);
                caothap.btnPlayCT.setVisible(true);
                caothap.waitFinish = false;
                caothap.pn_labai.setVisible(false);
                caothap.spQuanBaiCT.setVisible(true);
                caothap.sp_daunguoi.setSpriteFrame("res/Minigame/ResCaoThap/dis_chat.png");
                caothap.sp_chat.setSpriteFrame("res/Minigame/ResCaoThap/dis_chat.png");
                caothap.txt_labai.setString("");
                caothap.txtMucTren.setString("");
                caothap.txtMucDuoi.setString("");
                caothap.bg_tren.setVisible(false);
                caothap.bg_duoi.setVisible(false);
                caothap.valueOld = 0;
                caothap.opositeValue(caothap.valueMoneyCT);
                caothap.txtmaphien.setString("");
                caothap.countOpenCard = 0;
                caothap.isrunningCT = false;
            })));
        },

        runTime: function () {
            if (caothap.timeSecond >= 10) {
                caothap.txttime.setString("0" + caothap.timeMinute + ":" + caothap.timeSecond);
            } else {
                caothap.txttime.setString("0" + caothap.timeMinute + ":0" + caothap.timeSecond);
            }
            if (caothap.timeSecond >= 1) {
                caothap.timeSecond = caothap.timeSecond - 1;
            } else {
                if (caothap.timeMinute >= 1) {
                    caothap.timeMinute = 0;
                    caothap.timeSecond = 59;
                } else {
                    caothap.timeMinute = 0;
                }
            }
            if (caothap.timeMinute >= 0 && caothap.timeSecond >= 0) {
                caothap.txttime.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.runTime, this)));
            }
        },
        autoRandomQuanBai: function () {
            this.isgaming = true;
            this.getRandomInt_CaoThap(0, 51);
        },
        getRandomInt_CaoThap: function (min, max) {
            var caothap = this;
            var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            caothap.linkImage = "";
            caothap.link_image_chat = "";
            caothap.text_quanbai = "";
            caothap.color_quanbai = "";
            caothap.txt_chat = "";
            this.GetLinkImage(vRandom, false);
            caothap.pn_labai.setVisible(true);
            this.sp_image_blur.setVisible(true);
            this.sp_daunguoi.setOpacity(180);
            this.sp_chat.setOpacity(180);
            this.txt_labai.setOpacity(180);
            this.btnDownCT.setVisible(false);
            this.btnUpCT.setVisible(false);
            caothap.numberRandom = caothap.numberRandom - 1;
            if (caothap.numberRandom > 0) {
                caothap.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.autoRandomQuanBai, this)));
            } else {
                this.sp_image_blur.setVisible(false);
                this.sp_daunguoi.setOpacity(255);
                this.sp_chat.setOpacity(255);
                this.txt_labai.setOpacity(255);
                this.btnDownCT.setVisible(true);
                this.btnUpCT.setVisible(true);
                vRandom = caothap.currentCard;
                caothap.linkImage = "";
                caothap.link_image_chat = "";
                caothap.text_quanbai = "";
                caothap.color_quanbai = "";
                caothap.txt_chat = "";
                this.GetLinkImage(vRandom, false);
                //cc.log("linkImage: " + caothap.linkImage + " link_image_chat: " + caothap.link_image_chat + " text_quanbai: " + caothap.text_quanbai);

                caothap.numberRandom = 15;
                caothap.btnUpCT.setEnabled(true);
                caothap.btnDownCT.setEnabled(true);
                caothap.btnNewGame.setEnabled(true);
                caothap.txttime.stopAllActions();
                caothap.txttime.runAction(cc.sequence(cc.delayTime(0), cc.callFunc(this.runTime, this)));
                if (vRandom == 48 || vRandom == 49 || vRandom == 50 || vRandom == 51) {
                    if (caothap.enableLaBai1 == false) {
                        caothap.txt_At1.setColor(cc.color("#00DCFF"));
                        caothap.enableLaBai1 = true;
                    } else {
                        if (caothap.enableLaBai2 == false) {
                            caothap.txt_At2.setColor(cc.color("#00DCFF"));
                            caothap.enableLaBai2 = true;
                        } else {
                            if (caothap.enableLaBai3 == false) {
                                caothap.txt_At3.setColor(cc.color("#00DCFF"));
                                caothap.enableLaBai3 = true;
                            }
                        }
                    }
                }
                // so sanh money hien thi button
                if (this.money_mid == this.money_over)
                    caothap.btnDownCT.setVisible(false);
                else if (this.money_mid == this.money_under)
                    caothap.btnUpCT.setVisible(false);
                if (this.money_mid == 0)
                    this.txtMucGiua.setString("");
                else
                    this.txtMucGiua.setString(formatMoney(0, 3, this.money_mid));

                this.bg_tren.setVisible(true);
                this.bg_duoi.setVisible(true);
                if (this.money_over == 0) {
                    this.txtMucTren.setString("");
                    this.bg_tren.setVisible(false);
                }
                else
                    this.txtMucTren.setString(formatMoney(0, 3, this.money_over));

                if (this.money_under == 0) {
                    this.txtMucDuoi.setString("");
                    this.bg_duoi.setVisible(false);
                }
                else
                    this.txtMucDuoi.setString(formatMoney(0, 3, this.money_under));

                this.txt_notice.setString("");

                if (this.statusStopGame == 4) {
                    this.Restart_game_caoThap();
                    this.effectMoneyFly(this.moneyWin);
                    this.statusStopGame = null;
                    if (this.valuemoneyTypeCT == 1) {
                        lobby.userInfo.vinTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.vinTotal, MONEY_VIN);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, this.moneyWin) + " VIN sau " + this.countOpenCard + " lần mở bài");
                    } else {
                        lobby.userInfo.xuTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.xuTotal, MONEY_XU);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, this.moneyWin) + " XU sau " + this.countOpenCard + " lần mở bài");
                    }
                    this.txt_notice.stopAllActions();
                    this.txt_notice.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.hideError, this)));
                } else if (this.statusStopGame == 5) {
                    this.btnUpCT.setVisible(false);
                    this.btnDownCT.setVisible(false);
                    this.btnNewGame.setVisible(false);
                    this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(this.actionLoseGame, this)));
                    this.statusStopGame = null;
                } else if (this.statusStopGame == 7) {
                    this.runAction(cc.sequence(cc.delayTime(0.5), cc.spawn(cc.callFunc(this.Restart_game_caoThap, this), cc.callFunc(function () {
                        caothap.btnPlayCT.setVisible(true);
                        caothap.buttonroom1.setEnabled(true);
                        caothap.buttonroom2.setEnabled(true);
                        caothap.buttonroom3.setEnabled(true);
                        caothap.buttonroom4.setEnabled(true);
                        caothap.buttonroom5.setEnabled(true);
                        caothap.btnMoneyTypeCT.setEnabled(true);
                        caothap.opositeValue(caothap.valueMoneyCT);
                        caothap.waitFinish = false;
                    }))));
                    this.showEffectNoHu(this.moneyWin);
                    this.statusStopGame = null;
                    if (this.valuemoneyTypeCT == 1) {
                        lobby.userInfo.vinTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.vinTotal, MONEY_VIN);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, this.moneyWin) + " VIN sau " + this.countOpenCard + " lần mở bài");
                    } else {
                        lobby.userInfo.xuTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.xuTotal, MONEY_XU);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, this.moneyWin) + " XU sau " + this.countOpenCard + " lần mở bài");
                    }
                    menutab.changeFontMoney();
                    this.txt_notice.stopAllActions();
                    this.txt_notice.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.hideError, this)));
                }
                this.isgaming = false;

                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap) != null) {
                    //cc.log("1");
                    var osprite = caothap.pn_caothap.getChildByTag(caothap.tagCaothap);
                    if (caothap.txt_chat == "bich") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/bich.png");
                    } else if (caothap.txt_chat == "tep") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/te.png");
                    } else if (caothap.txt_chat == "ro") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/ro.png");
                    } else {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/co.png");
                    }
                    osprite.setVisible(true);
                    caothap.tagCaothap = caothap.tagCaothap + 1;
                    if (caothap.tagCaothap == 1011)
                        caothap.bg_notice_1.setVisible(true);
                    else if (caothap.tagCaothap == 1021)
                        caothap.bg_notice_2.setVisible(true);
                    else if (caothap.tagCaothap == 1031)
                        caothap.bg_notice_3.setVisible(true);
                    else if (caothap.tagCaothap == 1041)
                        caothap.bg_notice_4.setVisible(true);
                    else if (caothap.tagCaothap == 1051)
                        caothap.bg_notice_5.setVisible(true);
                }

                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text) != null) {
                    var text = caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text);
                    text.setString("" + caothap.text_quanbai);
                    caothap.tagCaothap_text = caothap.tagCaothap_text + 1;
                }
            }
        },
        resetSellectRoom: function () {
            caothap.sproom1.setVisible(false);
            caothap.sproom2.setVisible(false);
            caothap.sproom3.setVisible(false);
            caothap.sproom4.setVisible(false);
            caothap.sproom5.setVisible(false);
            this.buttonroom1.setEnabled(false);
            this.buttonroom2.setEnabled(false);
            this.buttonroom3.setEnabled(false);
            this.buttonroom4.setEnabled(false);
            this.buttonroom5.setEnabled(false);
            this.btnMoneyTypeCT.setEnabled(false);
            this.txtMucTren.setFontSize(28);
            this.txtMucGiua.setFontSize(30);
            this.txtMucDuoi.setFontSize(28);
        }
        ,

        opositeValue: function (value) {
            if (value > caothap.valueOld) {
                caothap.valueNew = value;
                caothap.breakValue = parseInt((value - caothap.valueOld) / 10);
                if (caothap.breakValue == 0) caothap.breakValue = 1;
                this.effectrunMoneyPutUp();
            } else if (value < caothap.valueOld) {
                caothap.valueNew = value;
                caothap.breakValue = parseInt((value - caothap.valueOld) / 10);
                this.effectrunMoneyPutDown();
            } else {
                caothap.txtMucGiua.setString("" + formatMoney(0, 3, value));
                this.enableButtonRoom();
            }
        },
        effectrunMoneyPutUp: function () {
            caothap.valueOld = caothap.valueOld + caothap.breakValue;
            caothap.txtMucGiua.setString("" + formatMoney(0, 3, caothap.valueOld));
            if (caothap.valueOld < caothap.valueNew) {
                caothap.txtMucGiua.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.effectrunMoneyPutUp, this)));
            } else {
                caothap.txtMucGiua.setString("" + formatMoney(0, 3, caothap.valueNew));
                caothap.valueOld = caothap.valueNew;
                this.enableButtonRoom();
            }
        },
        effectrunMoneyPutDown: function () {
            caothap.valueOld = caothap.valueOld + caothap.breakValue;
            caothap.txtMucGiua.setString("" + formatMoney(0, 3, caothap.valueOld));
            if (caothap.valueOld > caothap.valueNew) {
                caothap.txtMucGiua.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.effectrunMoneyPutDown, this)));
            } else {
                caothap.txtMucGiua.setString("" + formatMoney(0, 3, caothap.valueNew));
                caothap.valueOld = caothap.valueNew;
                this.enableButtonRoom();
            }
        },
        enableButtonRoom: function () {
            //cc.log("current room " + this.CURRENT_ROOM_CAO_THAP);
            if (this.CURRENT_ROOM_CAO_THAP == 0 || this.CURRENT_ROOM_CAO_THAP == 5) {
                this.buttonroom1.setEnabled(false);
                this.buttonroom2.setEnabled(true);
                this.buttonroom3.setEnabled(true);
                this.buttonroom4.setEnabled(true);
                this.buttonroom5.setEnabled(true);
            } else if (this.CURRENT_ROOM_CAO_THAP == 1 || this.CURRENT_ROOM_CAO_THAP == 6) {
                this.buttonroom1.setEnabled(true);
                this.buttonroom2.setEnabled(false);
                this.buttonroom3.setEnabled(true);
                this.buttonroom4.setEnabled(true);
                this.buttonroom5.setEnabled(true);
            } else if (this.CURRENT_ROOM_CAO_THAP == 2 || this.CURRENT_ROOM_CAO_THAP == 7) {
                this.buttonroom1.setEnabled(true);
                this.buttonroom2.setEnabled(true);
                this.buttonroom3.setEnabled(false);
                this.buttonroom4.setEnabled(true);
                this.buttonroom5.setEnabled(true);
            } else if (this.CURRENT_ROOM_CAO_THAP == 3 || this.CURRENT_ROOM_CAO_THAP == 8) {
                this.buttonroom1.setEnabled(true);
                this.buttonroom2.setEnabled(true);
                this.buttonroom3.setEnabled(true);
                this.buttonroom4.setEnabled(false);
                this.buttonroom5.setEnabled(true);
            } else if (this.CURRENT_ROOM_CAO_THAP == 4 || this.CURRENT_ROOM_CAO_THAP == 9) {
                this.buttonroom1.setEnabled(true);
                this.buttonroom2.setEnabled(true);
                this.buttonroom3.setEnabled(true);
                this.buttonroom4.setEnabled(true);
                this.buttonroom5.setEnabled(false);
            }
            this.btnMoneyTypeCT.setEnabled(true);
        },

        effectHuCaoThapUp: function () {
            caothap.valueOldHu = parseFloat(caothap.valueOldHu) + parseFloat(caothap.breakValueHu);
            caothap.txthuCT.setString(this.strhu + " " + formatMoney(0, 3, caothap.valueOldHu));
            if (caothap.valueOldHu < caothap.valueNewHu) {
                caothap.txthuCT.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.effectHuCaoThapUp, this)));
            } else {
                caothap.txthuCT.setString(this.strhu + " " + formatMoney(0, 3, caothap.valueNewHu));
                caothap.valueOldHu = caothap.valueNewHu;
                caothap.isruneffecthu = false;
            }
        },
        effectHuCaoThapDown: function () {
            caothap.valueOldHu = parseFloat(caothap.valueOldHu) + parseFloat(caothap.breakValueHu);
            caothap.txthuCT.setString(this.strhu + " " + formatMoney(0, 3, caothap.valueOldHu));
            if (caothap.valueOldHu > caothap.valueNewHu) {
                caothap.txthuCT.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.effectHuCaoThapDown, this)));
            } else {
                caothap.txthuCT.setString(this.strhu + " " + formatMoney(0, 3, caothap.valueNewHu));
                caothap.valueOldHu = caothap.valueNewHu;
                caothap.isruneffecthu = false;
            }
        },

        responseUserInfoCaoThap: function (numA, card, money1, money2, money3, time, step, referenceId, cards) {
            var caothap = this;
            //cc.log("numA : " + numA + " card : " + card + " money1 : " +money1 + " money2 : " + money2 + " money3: " + money3 + " time : " + time + " step : " + step + " phien : " + referenceId + " cards : " + cards);
            if (numA == 1) {
                caothap.txt_At1.setColor(cc.color("#00DCFF"));
            } else if (numA == 2) {
                caothap.txt_At1.setColor(cc.color("#00DCFF"));
                caothap.txt_At2.setColor(cc.color("#00DCFF"));
            }
            this.bg_tren.setVisible(true);
            this.bg_duoi.setVisible(true);
            this.txtMucGiua.setString(formatMoney(0, 3, money2));
            this.txtMucTren.setString(formatMoney(0, 3, money1));
            this.txtMucDuoi.setString(formatMoney(0, 3, money3));
            this.GetLinkImage(card, false);
            caothap.pn_labai.setVisible(true);
            this.spQuanBaiCT.setVisible(false);
            this.btnPlayCT.setVisible(false);
            caothap.btnDownCT.setVisible(true);
            caothap.btnUpCT.setVisible(true);
            // so sanh money hien thi button
            if (money2 == money1)
                caothap.btnDownCT.setVisible(false);
            else if (money2 == money3)
                caothap.btnUpCT.setVisible(false);

            var subtr = cards.substr(0, (cards.length - 1));
            //cc.log("subtr" + subtr);
            var str = subtr.split(',');
            this.countOpenCard = str.length;
            //cc.log("currentcard : " + this.currentCard +" liscard : " + cards + " long: " + str.length + " hien tai: " + str[str.length - 1]);
            for (var i = 0; i < str.length; i++) {
                this.GetLinkImage(str[i], true);
                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap) != null) {
                    var osprite = caothap.pn_caothap.getChildByTag(caothap.tagCaothap);
                    if (caothap.txt_chat == "bich") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/bich.png");
                    } else if (caothap.txt_chat == "tep") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/te.png");
                    } else if (caothap.txt_chat == "ro") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/ro.png");
                    } else {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/co.png");
                    }
                    osprite.setVisible(true);
                    caothap.tagCaothap = caothap.tagCaothap + 1;
                }

                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text) != null) {
                    var text = caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text);
                    text.setString("" + caothap.text_quanbai);
                    caothap.tagCaothap_text = caothap.tagCaothap_text + 1;
                }
            }

            caothap.buttonroom1.setEnabled(false);
            caothap.buttonroom2.setEnabled(false);
            caothap.buttonroom3.setEnabled(false);
            caothap.buttonroom4.setEnabled(false);
            caothap.buttonroom5.setEnabled(false);
            this.btnMoneyTypeCT.setEnabled(false);
            caothap.txt_notice.setString("");
            this.bg_notice_1.setVisible(false);
            this.bg_notice_2.setVisible(false);
            this.bg_notice_3.setVisible(false);
            this.bg_notice_4.setVisible(false);
            this.bg_notice_5.setVisible(false);
            // tra them trang thai nut Luot moi

            if ((time - 60) > 0) {
                caothap.timeMinute = 1;
                caothap.timeSecond = (time - 60);
            } else {
                caothap.timeMinute = 0;
                caothap.timeSecond = time;
            }
            if (caothap.timeSecond >= 10) {
                caothap.txttime.setString("0" + caothap.timeMinute + ":" + caothap.timeSecond);
            } else {
                caothap.txttime.setString("0" + caothap.timeMinute + ":0" + caothap.timeSecond);
            }
            caothap.txttime.stopAllActions();
            caothap.txttime.runAction(cc.callFunc(this.runTime, this));

            this.txtmaphien.setString("#" + referenceId);
            this.numberphien = referenceId;
            if (step == 1)
                this.btnNewGame.setVisible(false);
            else
                this.btnNewGame.setVisible(true);

            this.isrunningCT = true;
        },

        responseUpdateTimeCaoThap: function (time) {
            //cc.log("time : " + time);
            if ((time - 60) > 0) {
                caothap.timeMinute = 1;
                caothap.timeSecond = (time - 60);
            } else {
                caothap.timeMinute = 0;
                caothap.timeSecond = time;
            }
            if (caothap.timeSecond >= 10) {
                caothap.txttime.setString("0" + caothap.timeMinute + ":" + caothap.timeSecond);
            } else {
                caothap.txttime.setString("0" + caothap.timeMinute + ":0" + caothap.timeSecond);
            }
        },

        responseStopCaoThap: function (result, currentMoney, moneyExchange) {
            cc.log("result : " + result + " currentMoney : " + currentMoney + " moneyExchange : " + moneyExchange);
            this.statusStopGame = result;
            this.moneyWin = moneyExchange;
            this.currentMoneyUser = currentMoney;
            if (result == 4) {
                if (this.isgaming == false) {
                    this.Restart_game_caoThap();
                    this.effectMoneyFly(this.moneyWin);
                    this.statusStopGame = null;
                    if (this.valuemoneyTypeCT == 1) {
                        lobby.userInfo.vinTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.vinTotal, MONEY_VIN);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, moneyExchange) + " VIN sau " + this.countOpenCard + " lần mở bài");
                    } else {
                        lobby.userInfo.xuTotal = this.currentMoneyUser;
                        lobby.updateMoney(lobby.userInfo.xuTotal, MONEY_XU);
                        this.txt_notice.setString("Phiên " + this.numberphien + " bạn đã thắng " + formatMoney(0, 3, moneyExchange) + " XU sau " + this.countOpenCard + " lần mở bài");
                    }
                    menutab.changeFontMoney();
                    this.txt_notice.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.hideError, this)));
                }
            }
        },

        responseUpdatePotCaoThap: function (value) {
            //cc.log("value : " + value);
            value = parseFloat(value);
            if (this.ischangeroom == true) {
                this.CURRENT_ROOM_CAO_THAP = this.roomjoint;
                this.ischangeroom = false;
                this.opositeValue(this.valueMoneyCT);
            }

            if (value > caothap.valueOldHu) {
                caothap.valueNewHu = value;
                if (caothap.isruneffecthu == false) {
                    caothap.isruneffecthu = true;
                    caothap.breakValueHu = parseInt((value - caothap.valueOldHu) / 10);
                    if (caothap.breakValueHu == 0) caothap.breakValueHu = 1;
                    this.effectHuCaoThapUp();
                } else {
                    caothap.breakValueHu = parseInt((value - caothap.valueOldHu) / 10);
                }
            } else if (value < caothap.valueOldHu) {
                caothap.valueNewHu = value;
                if (caothap.isruneffecthu == false) {
                    caothap.isruneffecthu = true;
                    caothap.breakValueHu = parseInt((value - caothap.valueOldHu) / 10);
                    this.effectHuCaoThapDown();
                } else {
                    caothap.breakValueHu = parseInt((value - caothap.valueOldHu) / 10);
                }
            } else if (value == caothap.valueOldHu) {
                caothap.txthuCT.setString(this.strhu + " " + formatMoney(0, 3, value));
            }
        },

        responsePlayCaoThap: function (card, money1, money2, money3) {
            //card = 1;  money1 = 1; money2 = 1; money3 = 1;
            //cc.log("card : " + card + " money1 : " + money1 + " money2 : " + money2 + " money3 : " + money3);

            if (this.isgaming == true) {
                //cc.log("2");
                this.GetLinkImage(this.currentCard, true);
                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap) != null) {
                    //cc.log("3");
                    var osprite = caothap.pn_caothap.getChildByTag(caothap.tagCaothap);
                    if (caothap.txt_chat == "bich") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/bich.png");
                    } else if (caothap.txt_chat == "tep") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/te.png");
                    } else if (caothap.txt_chat == "ro") {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/ro.png");
                    } else {
                        osprite.setSpriteFrame("res/Minigame/ResCaoThap/co.png");
                    }
                    osprite.setVisible(true);
                    caothap.tagCaothap = caothap.tagCaothap + 1;
                }

                if (caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text) != null) {
                    var text = caothap.pn_caothap.getChildByTag(caothap.tagCaothap_text);
                    text.setString("" + caothap.text_quanbai);
                    caothap.tagCaothap_text = caothap.tagCaothap_text + 1;
                }
                if (this.currentCard == 48 || this.currentCard == 49 || this.currentCard == 50 || this.currentCard == 51) {
                    if (caothap.enableLaBai1 == false) {
                        caothap.txt_At1.setColor(cc.color("#00DCFF"));
                        caothap.enableLaBai1 = true;
                    } else {
                        if (caothap.enableLaBai2 == false) {
                            caothap.txt_At2.setColor(cc.color("#00DCFF"));
                            caothap.enableLaBai2 = true;
                        } else {
                            if (caothap.enableLaBai3 == false) {
                                caothap.txt_At3.setColor(cc.color("#00DCFF"));
                                caothap.enableLaBai3 = true;
                            }
                        }
                    }
                }
            } else {
                this.autoRandomQuanBai();
            }
            caothap.btnNewGame.setVisible(true);
            caothap.btnNewGame.setEnabled(false);

            this.currentCard = card;
            this.countOpenCard = this.countOpenCard + 1;
            this.money_mid = money2;
            this.money_over = money1;
            this.money_under = money3;
            caothap.txttime.stopAllActions();
            caothap.timeMinute = 1;
            caothap.timeSecond = 59;
            caothap.txttime.setString("02:00");
        },

        responseStartCaoThap: function (error, referenceId, card, money1, money2, money3, currentMoney) {
            //cc.log("referenceId : " + referenceId + " card : " + card + " money1 : " + money1 + " money2 : " + money2 + " money3 : " + money3 + " currentMoney : " + currentMoney);
            //cc.log("error: " + error);
            this.numberphien = referenceId;
            this.countOpenCard = this.countOpenCard + 1;
            if (error == 0) {
                this.money_mid = money2;
                this.money_over = money1;
                this.money_under = money3;
                this.funPlayGame();
                this.txtmaphien.setString("#" + referenceId);
                this.currentCard = card;
                if (this.valuemoneyTypeCT == 1) {
                    lobby.userInfo.vinTotal = currentMoney;
                    lobby.updateMoney(lobby.userInfo.vinTotal, MONEY_VIN);
                } else {
                    lobby.userInfo.xuTotal = currentMoney;
                    lobby.updateMoney(lobby.userInfo.xuTotal, MONEY_XU);
                }
                menutab.changeFontMoney();
            } else if (error == 1) {
                this.txt_notice.stopAllActions();
                this.txt_notice.setString("Bạn đang chơi trong room này rồi!");
                this.txt_notice.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.hideError, this)));
            } else if (error == 3) {
                this.txt_notice.stopAllActions();
                this.txt_notice.setString("Bạn không đủ số dư!");
                this.txt_notice.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.hideError, this)));
                this.btnPlayCT.setVisible(true);
                this.enableButtonRoom();
            }
            this.isrunningCT = true;
            //this.runAction(cc.sequence(cc.delayTime(0,5),cc.callFunc(this.responsePlayCaoThap, this)));
        },

        responseReceivedSubcribeCaoThap: function (status, roomid) {
            //cc.log("status : " + status + " roomid : " + roomid);
            if (status == 0) {
                this.resetSellectRoom();
                this.Restart_game_caoThap();
                this.btnPlayCT.setVisible(true);
                if (roomid == 0 || roomid == 1 || roomid == 2 || roomid == 3 || roomid == 4) { // choi vin
                    this.valuemoneyTypeCT = 1;
                    this.moneyTypeCT.setTexture("res/Minigame/ImageChung/choivin.png");
                    this.txtroom1.setString("1K");
                    this.txtroom2.setString("10K");
                    this.txtroom3.setString("50K");
                    this.txtroom4.setString("100K");
                    this.txtroom5.setString("500K");
                    this.txthuCT.setColor(cc.color("#FFFF00"));
                    this.txtEffectMoney.setColor(cc.color("#FFFF00"));
                    this.txtMucGiua.setColor(cc.color("#FFFF00"));
                    if (roomid == 0) {
                        this.valueMoneyCT = 1000;
                        this.sproom1.setVisible(true);
                    } else if (roomid == 1) {
                        this.valueMoneyCT = 10000;
                        this.sproom2.setVisible(true);
                    } else if (roomid == 2) {
                        this.valueMoneyCT = 50000;
                        this.sproom3.setVisible(true);
                    } else if (roomid == 3) {
                        this.valueMoneyCT = 100000;
                        this.sproom4.setVisible(true);
                    } else if (roomid == 4) {
                        this.valueMoneyCT = 500000;
                        this.sproom5.setVisible(true);
                    }
                } else {
                    this.valuemoneyTypeCT = 0;
                    this.moneyTypeCT.setTexture("res/Minigame/ImageChung/choixu.png");
                    this.txtroom1.setString("10K");
                    this.txtroom2.setString("100K");
                    this.txtroom3.setString("500K");
                    this.txtroom4.setString("1M");
                    this.txtroom5.setString("5M");
                    this.txthuCT.setColor(cc.color("#E3E3E3"));
                    this.txtEffectMoney.setColor(cc.color("#E3E3E3"));
                    this.txtMucGiua.setColor(cc.color("#E3E3E3"));
                    if (roomid == 5) {
                        this.valueMoneyCT = 10000;
                        this.sproom1.setVisible(true);
                    } else if (roomid == 6) {
                        this.valueMoneyCT = 100000;
                        this.sproom2.setVisible(true);
                    } else if (roomid == 7) {
                        this.valueMoneyCT = 500000;
                        this.sproom3.setVisible(true);
                    } else if (roomid == 8) {
                        this.valueMoneyCT = 1000000;
                        this.sproom4.setVisible(true);
                    } else if (roomid == 9) {
                        this.valueMoneyCT = 5000000;
                        this.sproom5.setVisible(true);
                    }
                }
                this.CURRENT_ROOM_CAO_THAP = roomid;
                this.roomjoint = this.CURRENT_ROOM_CAO_THAP;
                this.opositeValue(this.valueMoneyCT);
                caothap.timeMinute = 1;
                caothap.timeSecond = 59;
                caothap.txttime.setString("02:00");
            } else if (status == 1) {
                this.resetSellectRoom();
                this.sproom1.setVisible(true);
                this.btnPlayCT.setVisible(false);
                this.txt_notice.stopAllActions();
                this.txt_notice.setString("Bạn đăng nhập quá nhiều nơi!");
                this.txt_notice.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.hideError, this), cc.callFunc(function () {
                    closeCaoThap();
                })));
            }
        },

        responseReceivedChangeRoomCaoThap: function (status) {
            //cc.log("status : " + status);
            if (status == 3) {
                this.resetSellectRoom();
                //cc.log("CURRENT_ROOM_CAO_THAP : " + this.CURRENT_ROOM_CAO_THAP);
                this.roomjoint = this.CURRENT_ROOM_CAO_THAP;
                if (this.CURRENT_ROOM_CAO_THAP == 0) {
                    this.valueMoneyCT = 1000;
                    this.sproom1.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 1) {
                    this.valueMoneyCT = 10000;
                    this.sproom2.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 2) {
                    this.valueMoneyCT = 50000;
                    this.sproom3.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 3) {
                    this.valueMoneyCT = 100000;
                    this.sproom4.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 4) {
                    this.valueMoneyCT = 500000;
                    this.sproom5.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 5) {
                    this.valueMoneyCT = 10000;
                    this.sproom1.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 6) {
                    this.valueMoneyCT = 100000;
                    this.sproom2.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 7) {
                    this.valueMoneyCT = 500000;
                    this.sproom3.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 8) {
                    this.valueMoneyCT = 1000000;
                    this.sproom4.setVisible(true);
                } else if (this.CURRENT_ROOM_CAO_THAP == 9) {
                    this.valueMoneyCT = 5000000;
                    this.sproom5.setVisible(true);
                }

                this.opositeValue(this.valueMoneyCT);
                this.ischangeroom = false;
                this.txt_notice.stopAllActions();
                this.txt_notice.setString("Hãy đợi phiên chơi cũ của bạn kết thúc!");
                this.txt_notice.runAction(cc.sequence(cc.delayTime(4), cc.callFunc(this.hideError, this)));
            }
        },

        hideError: function () {
            this.txt_notice.setString("Click 'Play' để bắt đầu chơi");
            this.countOpenCard = 0;
            this.waitFinish = false;
            this.isrunningCT = false;
        },
        GetLinkImage: function (value, isdraw) {
            if (value == 0) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "2";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 1) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "2";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 2) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "2";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 3) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "2";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 4) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "3";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 5) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "3";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 6) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "3";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 7) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "3";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 8) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "4";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 9) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "4";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 10) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "4";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 11) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "4";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 12) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "5";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 13) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "5";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 14) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "5";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 15) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "5";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 16) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "6";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 17) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "6";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 18) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "6";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 19) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "6";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 20) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "7";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 21) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "7";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 22) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "7";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 23) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "7";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 24) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "8";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 25) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "8";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 26) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "8";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 27) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "8";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 28) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "9";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 29) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "9";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 30) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "9";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 31) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "9";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 32) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "10";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 33) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "10";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 34) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "10";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 35) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "10";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 36) {
                caothap.linkImage = "J_bi.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "J";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 37) {
                caothap.linkImage = "J_te.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "J";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 38) {
                caothap.linkImage = "J_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "J";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 39) {
                caothap.linkImage = "J_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "J";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 40) {
                caothap.linkImage = "Q_bi.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "Q";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 41) {
                caothap.linkImage = "Q_te.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "Q";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 42) {
                caothap.linkImage = "Q_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "Q";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 43) {
                caothap.linkImage = "Q_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "Q";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 44) {
                caothap.linkImage = "K_bi.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "K";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 45) {
                caothap.linkImage = "K_te.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "K";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 46) {
                caothap.linkImage = "K_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "K";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 47) {
                caothap.linkImage = "K_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "K";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }

            else if (value == 48) {
                caothap.linkImage = "chat_bich.png";
                caothap.link_image_chat = "chat_bich.png";
                caothap.text_quanbai = "A";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "bich";
            } else if (value == 49) {
                caothap.linkImage = "chat_tep.png";
                caothap.link_image_chat = "chat_tep.png";
                caothap.text_quanbai = "A";
                caothap.color_quanbai = "black";
                caothap.txt_chat = "tep";
            } else if (value == 50) {
                caothap.linkImage = "chat_ro.png";
                caothap.link_image_chat = "chat_ro.png";
                caothap.text_quanbai = "A";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "ro";
            } else if (value == 51) {
                caothap.linkImage = "chat_co.png";
                caothap.link_image_chat = "chat_co.png";
                caothap.text_quanbai = "A";
                caothap.color_quanbai = "red";
                caothap.txt_chat = "co";
            }
            if (isdraw == false) {
                caothap.sp_daunguoi.setTexture("res/Minigame/ImageChung/DauNguoi/" + caothap.linkImage);
                caothap.sp_chat.setTexture("res/Minigame/ImageChung/DauNguoi/" + caothap.link_image_chat);
                caothap.txt_labai.setString("" + caothap.text_quanbai);
                if (caothap.color_quanbai == "red") caothap.txt_labai.setColor(cc.color("#FF0000"));
                else caothap.txt_labai.setColor(cc.color("#000000"));
            }
        },
    });


codeCaoThap.BTN_CHOSEROOM1 = 2;
codeCaoThap.BTN_CHOSEROOM2 = 3;
codeCaoThap.BTN_CHOSEROOM3 = 4;
codeCaoThap.BTN_CHOSEROOM4 = 5;
codeCaoThap.BTN_CHOSEROOM5 = 6;
codeCaoThap.BTN_CHANGEROOMCT = 7;
codeCaoThap.BTN_DOWNCAOTHAP = 8;
codeCaoThap.BTN_UPCAOTHAP = 9;
codeCaoThap.BTN_PLAYGAMECT = 10;
codeCaoThap.BTN_NEWGAMECT = 11;
codeCaoThap.BTN_GUILDCT = 12;
codeCaoThap.BTN_RANKCT = 14;
codeCaoThap.BTN_INFOCT = 18;
codeCaoThap.BTN_CLOSEGAMECT = 22;
codeCaoThap.BTN_EVENTCT = 23;
codeCaoThap.BTN_CLOSE_EFFECT_HU = 24;

openCaoThap = function () {
    if (caothap === null) {
        caothap = new codeCaoThap();
        caothapX = caothap.getPosition().x;
        caothapY = caothap.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(caothap, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_CAO_THAP);
    } else {
        caothap.setVisible(true);
        caothap.pn_caothap.setVisible(true);
        cc.eventManager.resumeTarget(caothap.pn_caothap, true);
        caothap.reOpenLayer(caothap.pn_caothap);
    }
    SubscribeCaoThap(caothap.CURRENT_ROOM_CAO_THAP);
    caothapAppear = true;
};
closeCaoThap = function () {
    if (caothap === null) {
        return;
    }
    if (caothapAppear) {
        caothap.closeLayer(caothap.pn_caothap);
        caothap.setVisible(false);
        caothapAppear = false;
        cc.eventManager.pauseTarget(caothap.pn_caothap, true);
        if (menutab.Islogout == false) {
            var caothapSend = new CmdUnSubscribeCaoThap();
            caothapSend.putUnSubscribeCaoThap(caothap.CURRENT_ROOM_CAO_THAP);
            Minigame.miniGameClient.send(caothapSend);
            caothapSend.clean();
            caothap.buttonroom1.setEnabled(false);
            caothap.buttonroom2.setEnabled(false);
            caothap.buttonroom3.setEnabled(false);
            caothap.buttonroom4.setEnabled(false);
            caothap.buttonroom5.setEnabled(false);
            caothap.btnPlayCT.setVisible(false);
            caothap.btnMoneyTypeCT.setEnabled(false);
            caothap.btnNewGame.setVisible(false);
        } else {
            //caothap.CURRENT_ROOM_CAO_THAP = 0;
            caothap.buttonroom1.setEnabled(false);
            caothap.buttonroom2.setEnabled(false);
            caothap.buttonroom3.setEnabled(false);
            caothap.buttonroom4.setEnabled(false);
            caothap.buttonroom5.setEnabled(false);
            caothap.btnPlayCT.setVisible(false);
            caothap.btnMoneyTypeCT.setEnabled(false);
            caothap.btnNewGame.setVisible(false);
            caothap.currentCard = null;
        }
        caothap.txttime.stopAllActions();
        close_caothap_guild();
        close_caothap_lichsu();
        close_caothap_sanbai();
        close_caothap_vinhdanh();
    }
};


