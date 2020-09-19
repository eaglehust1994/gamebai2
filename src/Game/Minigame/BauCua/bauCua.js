var baucua = null;
var baucuaX = 0;
var baucuaY = 0;
var baucuaAppear = false;

var codeBauCua = MiniGameBaseLayer.extend(
    {
        ctor: function () {

            this.resourcePath = "res/Minigame/BauCua/";
            this.initbuttonTags();

            this.btnCloseGameBC = null;
            this.isFirtBet = true;
            this.arrLichSu = [];
            //this.currentRoomBC
            this.pBauCua = null;
            this.btnXacNhan = null;
            this.btnXoa = null;
            this.btnGapThep = null;
            this.btnDatLai = null;
            this.bettingState = true;
            this.remainTime = 0;
            this.result = {
                dice1: 1,
                dice2: 1,
                dice3: 1,
                xPot: 1,
                xValue: 1
            };
            this.colorPotVin = cc.color(231, 2, 254);
            this.colorPotXu = cc.color.BLACK;
            this.colorBet = cc.color.RED;
            this.colorBetDone = cc.color.BLACK;

            this.isDoneTungXX = true;
            this.btn_room1 = null;
            this.btn_room2 = null;
            this.btn_room3 = null;
            this.txtMoneyPutBau = null;
            this.txtMoneyPutCua = null;
            this.txtMoneyPutTom = null;
            this.txtMoneyPutCa = null;
            this.txtMoneyPutGa = null;
            this.txtMoneyPutHuou = null;
            this.txtHuBau = null;
            this.txtHuCua = null;
            this.txtHuTom = null;
            this.txtHuCa = null;
            this.txtHuGa = null;
            this.txtHuHuou = null;
            this.txtMaPhienBC = null;
            this.txtTime = null;
            this.pnroomBC1 = null;
            this.pnroomBC2 = null;
            this.pnroomBC3 = null;
            this.pnroomBC4 = null;
            this.pnroomBC5 = null;
            this.btnBau = null;
            this.btnCua = null;
            this.btnTom = null;
            this.btnCa = null;
            this.btnGa = null;
            this.btnHuou = null;
            this.btn_soi_cau = null;
            this.indexMenhGia = 1;
            this.spTileNhan = null;
            this.sp_glow_nhan = null;
            this.spTileNhanXX = null;
            this.sp_glow_nhanXX = null;
            this.aniXucXacBC = null;
            this.spXucXacBC1 = null;
            this.spXucXacBC2 = null;
            this.spXucXacBC3 = null;
            this.spDiaBC = null;
            this.currentRoom = 0;
            this.moneyTypeBC = MONEY_VIN;
            this.menhGia = 1000;
            this.isBetDone = {
                room0: false,
                room1: false,
                room2: false,
                room3: false,
                room4: false,
                room5: false

            };
            this.lv_soi_cau = null;

            this.betValueOld = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.betValueDone = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.betValue = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.valueMoney = 0;
            this.vtBtnRoom = 0;
            this.valuePutBau = 0;
            this.valuePutCua = 0;
            this.valuePutTom = 0;
            this.valuePutCa = 0;
            this.valuePutGa = 0;
            this.valuePutHuou = 0;
            this.resultBC = "6,3,1|2,4";
            this.linkImageXX = null;
            this.pnEffect = null;
            this.btnChangeRoomBC = null;
            this.InBau = null;
            this.InCua = null;
            this.InTom = null;
            this.InCa = null;
            this.InGa = null;
            this.InHuou = null;
            this.invisibleBC = "huou";
            this.numRunEffect = 15;
            this.strPutVin = "0,0,0,0,0,0";
            this.strPutXu = "0,0,0,0,0,0";
            this.strRememberVin = "0,0,0,0,0,0";
            this.strRememberXu = "0,0,0,0,0,0";
            this.moneyTypeBC = MONEY_VIN;
            //this.pn_SoiCau = null;
            this.btnTopXHBC = null;
            this.btnGuildBC = null;
            //this.btnLSPhienBC = null;
            this.btnLSGDBC = null;
            this.pnGuildBC = null;
            this.btnCloseGuild = null;
            this.pnTopXHBC = null;
            this.btnCloseXHBC = null;
            this.pnTopLSPhienBC = null;
            this.btnCloseLSPhienBC = null;
            this.pnLSGDBC = null;
            this.btnCloseLSGDBC = null;
            this.pSoiCau = null;
            this.lb_soi_cau_huou = null;
            this.lb_soi_cau_bau = null;
            this.lb_soi_cau_ga = null;
            this.lb_soi_cau_ca = null;
            this.lb_soi_cau_cua = null;
            this.lb_soi_cau_tom = null;
            this.btn_event = null;
            this._super("codeBauCua");

            // this.initWithBinaryFile("res/MNBauCua.json");
            return true;
        },

        initbuttonTags: function () {
            this.buttonTags = {};
            this.buttonTags.BTN_CLOSEGAMEBAUCUA = 1;
            this.buttonTags.BTN_XACNHAN = 2;
            this.buttonTags.BTN_BAU = 3;
            this.buttonTags.BTN_CUA = 4;
            this.buttonTags.BTN_TOM = 5;
            this.buttonTags.BTN_CA = 6;
            this.buttonTags.BTN_GA = 7;
            this.buttonTags.BTN_HUOU = 8;
            this.buttonTags.BTN_NEXTROOM = 9;
            this.buttonTags.BTN_PREVIOSROOM = 10;
            this.buttonTags.BTN_MONEYVALUE1 = 11;
            this.buttonTags.BTN_MONEYVALUE2 = 12;
            this.buttonTags.BTN_MONEYVALUE3 = 13;
            this.buttonTags.BTN_MONEYVALUE4 = 14;
            this.buttonTags.BTN_MONEYVALUE5 = 15;
            this.buttonTags.BTN_CHANGEROOMBC = 16;
            this.buttonTags.BTN_XOABAUCUA = 17;
            this.buttonTags.BTN_DATLAIBC = 18;
            this.buttonTags.BTN_GAPTHEPBC = 19;
            this.buttonTags.BTN_TOPXHBC = 20;
            this.buttonTags.BTN_CLOSETOPXHBC = 25;
            this.buttonTags.BTN_GUILDBC = 21;
            this.buttonTags.BTN_CLOSEGUILDBC = 24;
            //this.buttonTags.BTN_LICHSUPHIENBC = 22;
            this.buttonTags.BTN_CLOSELICHSUPHIENBC = 26;
            this.buttonTags.BTN_LICHSUGDBC = 23;
            this.buttonTags.BTN_CLOSELICHSUGDBC = 27;
            this.buttonTags.BTN_ROOM1 = 28;
            this.buttonTags.BTN_ROOM2 = 29;
            this.buttonTags.BTN_ROOM3 = 30;
            this.buttonTags.BTN_SOI_CAU = 31;
            this.buttonTags.BTN_EVENT = 32;

            this.buttonTags.BAU = 0;
            this.buttonTags.CUA = 1;
            this.buttonTags.TOM = 2;
            this.buttonTags.CA = 3;
            this.buttonTags.GA = 4;
            this.buttonTags.HUOU = 5;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/BauCua/PlistMNBauCua.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/BauCua/animationXXBC.plist");
            this.pBauCua = this.createDraggableLayout();

            this.initBackground();

            this.initActionButtons();

            this.initHeader();

            this.initBettingLevel();

            this.initResult();

            this.initBettingDoors();

            this.initBettingValues();

            this.initEffect();
        },
        createDraggableLayout: function () {
            this._layout = this.addLayoutStructure(this, "_layout", cc.p(211.27, 177.09), "bg_baucua.png", cc.size(880, 330), false);
            this._layout.setAnchorPoint(0, 0);
            this.addMasterLayer(this._layout);
            return this._layout;
        },

        initBackground: function () {
            if (!cc.sys.isNative) {
                this.setScale(0.80);
            }
            var background = this._layout;

            //this.addSpriteStructureWithoutResourcePath(background, "shadow_tren", cc.p(440.09, 394.95), this.commonImagePath + "shadow_tren.png", {_scaleX: 1.11});
            this.addSpriteStructure(background, "bg_remainingTime", cc.p(219.59, 345.86), "bg_phien.png");
            this.addSpriteStructure(background, "bg_phien", cc.p(403.59, 345.86), "bg_phien.png");
            this.addSpriteStructure(background, "sp_bgmenu", cc.p(510.27, 6), "bg_select_money.png");
            this.addSpriteStructure(background, "background_item_1", cc.p(388.29, 250.78), "background_item.png");
            this.addSpriteStructure(background, "background_item_2", cc.p(510.52, 250.78), "background_item.png");
            this.addSpriteStructure(background, "background_item_3", cc.p(632.52, 250.78), "background_item.png");
            this.addSpriteStructure(background, "background_item_4", cc.p(388.29, 116.61), "background_item.png");
            this.addSpriteStructure(background, "background_item_5", cc.p(510.52, 116.61), "background_item.png");
            this.addSpriteStructure(background, "background_item_6", cc.p(632.52, 116.61), "background_item.png");
            //this.addButtonStructure(background, "btn_evt", this.buttonTags.BTN_EVENT, cc.p(437.68, 415.48), true, [this.resourcePath + "toichonca.png", this.resourcePath + "toichonca.png"]);

            if (cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false)
                    this.btn_event.setEnabled(false);
            }
        },

        initActionButtons: function () {
            this.addLayoutStructure(this._layout, "actionLayout", cc.p(0, 0));
            // var actionLayout = this.getChildByName("actionLayout");
            var actionLayout = this._layout;

            function createTextTypeYellow(name, options) {
                return cc.extend({
                    titleText: name,
                    titleColor: cc.color(160, 81, 17, 1),
                    titleFontName: fontRobotoBlack.fontName,
                    titleFontSize: 24
                }, options);
            }

            var yellowButtonImages = [this.resourcePath + "button_nor.png", this.resourcePath + "button_click.png"];

            this.addButtonStructure(actionLayout, "btnDatLai", this.buttonTags.BTN_DATLAIBC, cc.p(758.05, 271.19), true, yellowButtonImages, createTextTypeYellow("ĐẶT LẠI"));
            this.addButtonStructure(actionLayout, "btnGapThep", this.buttonTags.BTN_GAPTHEPBC, cc.p(758.05, 215.13), true, yellowButtonImages, createTextTypeYellow("GẤP THẾP"));
            this.addButtonStructure(actionLayout, "btnXoa", this.buttonTags.BTN_XOABAUCUA, cc.p(758.05, 152.40), true, yellowButtonImages, createTextTypeYellow("XÓA"));

            function createTextTypeGreen(name, options) {
                return createTextTypeYellow.call(this, name, cc.extend({titleColor: cc.color(65, 65, 70)}, options));
            }

            this.addButtonStructure(actionLayout, "btnXacNhan", this.buttonTags.BTN_XACNHAN, cc.p(758.05, 98.33), true, this.resourcePath + "xac_nhan_nor.png", this.resourcePath + "xac_nhan_click.png", createTextTypeGreen(""));
            var scale = {
                _scaleX: 0.79,
                _scaleY: 0.79
            };
            this.addButtonStructure(actionLayout, "btnTopXHBC", this.buttonTags.BTN_TOPXHBC, cc.p(597.73, 346.91), true, this.commonImagePath + "bangvinhdanh.png", scale);
            this.addButtonStructure(actionLayout, "btnGuildBC", this.buttonTags.BTN_GUILDBC, cc.p(653.46, 346.91), true, this.commonImagePath + "huongdan.png", scale);
            this.addButtonStructure(actionLayout, "btnLSGDBC", this.buttonTags.BTN_LICHSUGDBC, cc.p(710.61, 346.91), true, this.commonImagePath + "lsgd.png", scale);
            this.addButtonStructure(actionLayout, "btnCloseGameBC", this.buttonTags.BTN_CLOSEGAMEBAUCUA, cc.p(769.88, 334.99), true, this.commonImagePath + "btn_closegame.png");


            var soicauButtonImages = [this.resourcePath + "SoiCau/Nor_soi_cau.png", this.resourcePath + "SoiCau/Click_soi_cau.png"];
            this.addButtonStructure(actionLayout, "btn_soi_cau", this.buttonTags.BTN_SOI_CAU, cc.p(220.88, 14.40), true, soicauButtonImages, createTextTypeYellow("SOI CẦU", {titleFontSize: 30}));
        },

        initHeader: function () {
            this.addTextStructure(this._layout, "txtTime", cc.p(219.60, 345.86), "00:59", "Roboto-Bold", "36");
            this.addTextStructure(this._layout, "txtMaPhienBC", cc.p(403.35, 345.86), "#0123456", "Roboto-Regular", "25");
        },

        initBettingLevel: function () {

            this.addLayoutStructure(this._layout, "bettingLevelLayout", cc.p(0, 0));
            // var bettingLevelLayout = this.getChildByName("bettingLevelLayout");
            var bettingLevelLayout = this._layout;

            var buttonImages = [this.commonImagePath + "bg_room.png", this.commonImagePath + "room_select.png", this.commonImagePath + "bg_room.png"];

            function createTextOptions(name, options) {
                return cc.extend({
                    titleText: name,
                    titleFontName: fontRobotoBold.fontName,
                    titleFontSize: 24
                }, options);
            }

            this.addButtonStructure(bettingLevelLayout, "btn_room1", this.buttonTags.BTN_ROOM1, cc.p(78.27, 258.90), true, buttonImages[1], createTextOptions("1K"));
            this.addButtonStructure(bettingLevelLayout, "btn_room2", this.buttonTags.BTN_ROOM2, cc.p(62.27, 185.59), true, buttonImages, createTextOptions("10K"));
            this.addButtonStructure(bettingLevelLayout, "btn_room3", this.buttonTags.BTN_ROOM3, cc.p(77.27, 112.90), true, buttonImages, createTextOptions("100K"));

            this.addButtonStructure(this._layout, "btnChangeRoomBC", this.buttonTags.BTN_CHANGEROOMBC, cc.p(102.64, 339.16), true, this.commonImagePath + "choivin.png");
        },

        initBettingValues: function () {

            var bettingValueLayer = this.addLayoutStructure(this._layout, "bettingValueLayer", cc.p(0, 0), undefined, undefined, undefined, {
                anchorX: 0,
                anchorY: 0
            });

            var textOptions = {
                titleFontName: fontRobotoBlack.fontName,
                titleFontSize: 14,
                titleColor: cc.color(255, 247, 0, 1)
            }

            this.addButtonStructure(bettingValueLayer, "btn_key1", this.buttonTags.BTN_MONEYVALUE1, cc.p(361.77, 5), true, this.resourcePath + "xengbac.png", textOptions);
            this.addButtonStructure(bettingValueLayer, "btn_key2", this.buttonTags.BTN_MONEYVALUE2, cc.p(434.77, 5), true, this.resourcePath + "xengdo.png", textOptions);
            this.addButtonStructure(bettingValueLayer, "btn_key3", this.buttonTags.BTN_MONEYVALUE3, cc.p(508.77, 5), true, this.resourcePath + "xengtim.png", textOptions);
            this.addButtonStructure(bettingValueLayer, "btn_key4", this.buttonTags.BTN_MONEYVALUE4, cc.p(582.76, 5), true, this.resourcePath + "xengvang.png", textOptions);
            this.addButtonStructure(bettingValueLayer, "btn_key5", this.buttonTags.BTN_MONEYVALUE5, cc.p(658.96, 5), true, this.resourcePath + "xengxanh.png", textOptions);
        },

        initResult: function () {
            this.addLayoutStructure(this._layout, "bg_pSoiCau", cc.p(221.93, 179.79), "bg_soicau.png");
            this.addLayoutStructure(this._layout, "pSoiCau", cc.p(118, 62), undefined, undefined, undefined, {
                anchorX: 0,
                anchorY: 0
            });


            // var pSoiCau = this.getChildByName("pSoiCau");
            var pSoiCau = this._layout.getChildByName("pSoiCau");
            pSoiCau.setVisible(false);

            var scale = {
                _scaleX: 0.75,
                _scaleY: 0.75
            }

            this.addSpriteStructure(pSoiCau, "bg_huou", cc.p(71, 213.5), "SoiCau/5.png", scale);
            this.addSpriteStructure(pSoiCau, "bg_bau", cc.p(71, 175), "SoiCau/0.png", scale);
            this.addSpriteStructure(pSoiCau, "bg_ga", cc.p(71, 139), "SoiCau/4.png", scale);
            this.addSpriteStructure(pSoiCau, "bg_ca", cc.p(71, 99), "SoiCau/3.png", scale);
            this.addSpriteStructure(pSoiCau, "bg_cua", cc.p(71, 60), "SoiCau/1.png", scale);
            this.addSpriteStructure(pSoiCau, "bg_tom", cc.p(71, 22), "SoiCau/2.png", scale);

            var options = {textAlign: cc.TEXT_ALIGNMENT_LEFT};

            this.addTextStructure(pSoiCau, "lb_soi_cau_huou", cc.p(137, 213), "100", "Roboto-Medium", "20", undefined, options);
            this.addTextStructure(pSoiCau, "lb_soi_cau_bau", cc.p(137, 175), "100", "Roboto-Medium", "20", undefined, options);
            this.addTextStructure(pSoiCau, "lb_soi_cau_ga", cc.p(137, 139), "100", "Roboto-Medium", "20", undefined, options);
            this.addTextStructure(pSoiCau, "lb_soi_cau_ca", cc.p(137, 99), "100", "Roboto-Medium", "20", undefined, options);
            this.addTextStructure(pSoiCau, "lb_soi_cau_cua", cc.p(137, 59.22), "100", "Roboto-Medium", "20", undefined, options);
            this.addTextStructure(pSoiCau, "lb_soi_cau_tom", cc.p(137, 22), "100", "Roboto-Medium", "20", undefined, options);

            var lv_soi_cau = this.lv_soi_cau = new ccui.ListView();
            // this.lv_menu_slot.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
            lv_soi_cau.setTouchEnabled(true);
            lv_soi_cau.setBounceEnabled(true);
            lv_soi_cau.setClippingEnabled(true);
            lv_soi_cau.setContentSize(cc.size(208, 208));
            lv_soi_cau.setPosition(cc.p(119.00, 76.22));
            lv_soi_cau.setAnchorPoint(cc.p(0.00, 0.00));
            this._layout.addChild(lv_soi_cau);


            var diaLayer = this.addLayoutStructure(this._layout, "diaLayer", cc.p(0, 0));

            this.addSpriteStructureWithoutResourcePath(diaLayer, "spDiaBC", cc.p(220.14, 183.08), this.commonImagePath + "VongTron.png", {visible: false});
            this.addSpriteStructure(diaLayer, "aniXucXacBC", cc.p(220.13, 184.62), "", {visible: false});
            this.addSpriteStructure(diaLayer, "spXucXacBC1", cc.p(179.14, 144.08), "Result/kq_ca.png", {visible: false});
            this.addSpriteStructure(diaLayer, "spXucXacBC2", cc.p(220.14, 219.08), "Result/kq_bau.png", {visible: false});
            this.addSpriteStructure(diaLayer, "spXucXacBC3", cc.p(261.14, 145.62), "Result/kq_huou.png", {visible: false});
        },

        initBettingDoors: function () {
            this.addLayoutStructure(this._layout, "Pn_PutMoney", cc.p(90.77, 175.30), undefined, undefined, undefined, {
                anchorX: 0,
                anchorY: 0
            });
            var pSoiCau = this.getChildByName("pSoiCau");

            var Pn_PutMoney = this._layout.getChildByName("Pn_PutMoney");

            function setFixSize(text) {
                text.ignoreContentAdaptWithSize(false);
                text.setContentSize(cc.size(100, 21));
                text.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            }

            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuHuou", cc.p(298.17, 122.62), "1.000.000", "Roboto-Medium", "15"));
            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuBau", cc.p(419.23, 124.62), "1.000.000", "Roboto-Medium", "15"));
            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuGa", cc.p(541.93, 122.62), "1.000.000", "Roboto-Medium", "15"));
            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuCa", cc.p(298.17, -11.34), "1.000.000", "Roboto-Medium", "15"));
            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuCua", cc.p(419.23, -11.34), "1.000.000", "Roboto-Medium", "15"));
            setFixSize.call(undefined, this.addTextStructure(Pn_PutMoney, "txtHuTom", cc.p(541.93, -11.34), "1.000.000", "Roboto-Medium", "15"));

            this.addTextStructure(Pn_PutMoney, "txtMoneyPutHuou", cc.p(298.17, 27.98), "1.000.000", "Roboto-Medium", "15");
            this.addTextStructure(Pn_PutMoney, "txtMoneyPutBau", cc.p(419.23, 27.98), "1.000.000", "Roboto-Medium", "15");
            this.addTextStructure(Pn_PutMoney, "txtMoneyPutGa", cc.p(541.93, 27.98), "1.000.000", "Roboto-Medium", "15");
            this.addTextStructure(Pn_PutMoney, "txtMoneyPutCa", cc.p(298.17, -105.98), "1.000.000", "Roboto-Medium", "15");
            this.addTextStructure(Pn_PutMoney, "txtMoneyPutCua", cc.p(419.23, -105.98), "1.000.000", "Roboto-Medium", "15");
            this.addTextStructure(Pn_PutMoney, "txtMoneyPutTom", cc.p(541.93, -105.98), "1.000.000", "Roboto-Medium", "15");


            var bettingDoorLayer = this.addLayoutStructure(this._layout, "bettingDoorLayer", cc.p(0, 0), undefined, undefined, undefined, {
                anchorX: 0,
                anchorY: 0
            });

            this.addButtonStructure(bettingDoorLayer, "btnBau", this.buttonTags.BTN_BAU, cc.p(510.53, 248.78), false, this.resourcePath + "bau.png");
            this.addButtonStructure(bettingDoorLayer, "btnCua", this.buttonTags.BTN_CUA, cc.p(510.53, 116.61), false, this.resourcePath + "cua.png");
            this.addButtonStructure(bettingDoorLayer, "btnTom", this.buttonTags.BTN_TOM, cc.p(632.52, 116.61), false, this.resourcePath + "tom.png");
            this.addButtonStructure(bettingDoorLayer, "btnCa", this.buttonTags.BTN_CA, cc.p(388.29, 116.61), false, this.resourcePath + "ca.png");
            this.addButtonStructure(bettingDoorLayer, "btnGa", this.buttonTags.BTN_GA, cc.p(632.52, 250.78), false, this.resourcePath + "ga.png");
            this.addButtonStructure(bettingDoorLayer, "btnHuou", this.buttonTags.BTN_HUOU, cc.p(388.29, 250.78), false, this.resourcePath + "huou.png");

        },

        initEffect: function () {
            var result_layer = this.addLayoutStructure(this._layout, "result_layer", cc.p(0, 0), undefined, undefined, undefined, {
                anchorX: 0,
                anchorY: 0
            });
            this.addSpriteStructure(result_layer, "InBau", cc.p(511.17, 250.42), "Invisible.png");
            this.addSpriteStructure(result_layer, "InCua", cc.p(511.17, 116.29), "Invisible.png");
            this.addSpriteStructure(result_layer, "InTom", cc.p(633.24, 116.29), "Invisible.png");
            this.addSpriteStructure(result_layer, "InCa", cc.p(388.93, 116.29), "Invisible.png");
            this.addSpriteStructure(result_layer, "InGa", cc.p(633.24, 250.42), "Invisible.png");
            this.addSpriteStructure(result_layer, "InHuou", cc.p(388.93, 250.42), "Invisible.png");


            this.addSpriteStructure(result_layer, "sp_glow_nhanXX", cc.p(512.03, 250.42), "Glow.png", {visible: false});
            this.addSpriteStructure(result_layer, "spTileNhan", cc.p(388.03, 250.82), "x6.png", {visible: false});
            this.addSpriteStructure(result_layer, "sp_glow_nhan", cc.p(389.41, 251.70), "Glow.png", {visible: false});
            this.addSpriteStructure(result_layer, "sp_glow_nhanXX", cc.p(512.03, 250.42), "Glow.png", {visible: false});
            this.addSpriteStructure(result_layer, "spTileNhanXX", cc.p(510.65, 249.54), "x9.png", {visible: false});
            this.sp_glow_nhanXX.runAction(cc.repeatForever(cc.rotateBy(2, 360)));
            this.sp_glow_nhan.runAction(cc.repeatForever(cc.rotateBy(2, 360)));
        },


        onButtonRelease: function (button, id) {
            var codeBauCua = this.buttonTags;

            switch (id) {
                case codeBauCua.BTN_EVENT:
                    openBCToiChonCa();
                    break;
                case codeBauCua.BTN_SOI_CAU:
                    if (this.pSoiCau.isVisible()) {
                        this.pSoiCau.setVisible(false);
                        this.lv_soi_cau.setVisible(true);
                    } else {
                        this.pSoiCau.setVisible(true);
                        this.lv_soi_cau.setVisible(false);
                    }
                    break;
                case codeBauCua.BTN_CLOSEGAMEBAUCUA:
                    closeBauCua();
                    break;
                case codeBauCua.BTN_XACNHAN:
                    if (this.bettingState == true && this.remainTime < 6) {
                        this.toastBauCua("Quá thời gian đặt cửa", 3);
                    } else {
                        this.btnXacNhan.setEnabled(false);
                        this.sendBet();
                    }


                    break;
                case codeBauCua.BTN_BAU:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.BAU, this.menhGia);
                    }

                    break;
                case codeBauCua.BTN_CUA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.CUA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_TOM:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.TOM, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_CA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.CA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_GA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.GA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_HUOU:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.HUOU, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE1:
                    if (this.indexMenhGia == 1) {

                    } else {
                        this.nhayBtnKey(this.btn_key1);
                        this.indexMenhGia = 1;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 1000;
                                break;
                            case 1:
                                this.menhGia = 10000;
                                break;
                            case 2:
                                this.menhGia = 100000;
                                break;
                            case 3:
                                this.menhGia = 10000;
                                break;
                            case 4:
                                this.menhGia = 100000;
                                break;
                            case 5:
                                this.menhGia = 1000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE2:
                    if (this.indexMenhGia == 2) {

                    } else {
                        this.nhayBtnKey(this.btn_key2);
                        this.indexMenhGia = 2;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 5000;
                                break;
                            case 1:
                                this.menhGia = 50000;
                                break;
                            case 2:
                                this.menhGia = 500000;
                                break;
                            case 3:
                                this.menhGia = 50000;
                                break;
                            case 4:
                                this.menhGia = 500000;
                                break;
                            case 5:
                                this.menhGia = 5000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE3:
                    if (this.indexMenhGia == 3) {

                    } else {
                        this.nhayBtnKey(this.btn_key3);
                        this.indexMenhGia = 3;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 10000;
                                break;
                            case 1:
                                this.menhGia = 100000;
                                break;
                            case 2:
                                this.menhGia = 1000000;
                                break;
                            case 3:
                                this.menhGia = 100000;
                                break;
                            case 4:
                                this.menhGia = 1000000;
                                break;
                            case 5:
                                this.menhGia = 10000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE4:
                    if (this.indexMenhGia == 4) {

                    } else {
                        this.nhayBtnKey(this.btn_key4);
                        this.indexMenhGia = 4;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 50000;
                                break;
                            case 1:
                                this.menhGia = 500000;
                                break;
                            case 2:
                                this.menhGia = 5000000;
                                break;
                            case 3:
                                this.menhGia = 500000;
                                break;
                            case 4:
                                this.menhGia = 5000000;
                                break;
                            case 5:
                                this.menhGia = 50000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE5:
                    if (this.indexMenhGia == 5) {

                    } else {
                        this.nhayBtnKey(this.btn_key5);
                        this.indexMenhGia = 5;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 100000;
                                break;
                            case 1:
                                this.menhGia = 1000000;
                                break;
                            case 2:
                                this.menhGia = 10000000;
                                break;
                            case 3:
                                this.menhGia = 1000000;
                                break;
                            case 4:
                                this.menhGia = 10000000;
                                break;
                            case 5:
                                this.menhGia = 100000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_CHANGEROOMBC:

                    if (this.moneyTypeBC == MONEY_VIN) {
                        this.sendChangeRoom(this.currentRoom, 3);
                    } else {
                        this.sendChangeRoom(this.currentRoom, 0);
                    }

                    break;
                case codeBauCua.BTN_XOABAUCUA:


                    if (this.betValue["room" + this.currentRoom].betBau > 0 || this.betValue["room" + this.currentRoom].betCua > 0 || this.betValue["room" + this.currentRoom].betTom > 0 || this.betValue["room" + this.currentRoom].betCa > 0 || this.betValue["room" + this.currentRoom].betGa > 0 || this.betValue["room" + this.currentRoom].betHuou > 0) {
                        this.betValue["room" + this.currentRoom].betBau = 0;
                        this.betValue["room" + this.currentRoom].betCua = 0;
                        this.betValue["room" + this.currentRoom].betTom = 0;
                        this.betValue["room" + this.currentRoom].betCa = 0;
                        this.betValue["room" + this.currentRoom].betGa = 0;
                        this.betValue["room" + this.currentRoom].betHuou = 0;

                        this.txtMoneyPutBau.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betBau));
                        this.txtMoneyPutBau.setColor(this.colorBetDone);
                        this.txtMoneyPutCua.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betCua));
                        this.txtMoneyPutCua.setColor(this.colorBetDone);
                        this.txtMoneyPutTom.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betTom));
                        this.txtMoneyPutTom.setColor(this.colorBetDone);
                        this.txtMoneyPutCa.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betCa));
                        this.txtMoneyPutCa.setColor(this.colorBetDone);
                        this.txtMoneyPutGa.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betGa));
                        this.txtMoneyPutGa.setColor(this.colorBetDone);
                        this.txtMoneyPutHuou.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betHuou));
                        this.txtMoneyPutHuou.setColor(this.colorBetDone);
                    } else {
                        this.toastBauCua("Bạn chưa đăt cửa", 3);
                    }


                    break;
                case codeBauCua.BTN_DATLAIBC:
                    if (this.isBetDone["room" + this.currentRoom]) {
                        this.toastBauCua("Chỉ được đặt lại lần đầu", 3);
                    } else {
                        if (this.betValueOld["room" + this.currentRoom].betBau > 0 || this.betValueOld["room" + this.currentRoom].betCua > 0 || this.betValueOld["room" + this.currentRoom].betTom > 0 || this.betValueOld["room" + this.currentRoom].betCa > 0 || this.betValueOld["room" + this.currentRoom].betGa > 0 || this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                            if (this.betValueOld["room" + this.currentRoom].betBau > 0) {
                                this.betValue["room" + this.currentRoom].betBau = 0;//parseFloat(this.betValueOld["room"+this.currentRoom].betBau)*2;
                                this.updateBetBauCua(codeBauCua.BAU, parseFloat(this.betValueOld["room" + this.currentRoom].betBau));

                            } else {
                                this.betValue["room" + this.currentRoom].betBau = 0;
                                this.updateBetBauCua(codeBauCua.BAU, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCua > 0) {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, parseFloat(this.betValueOld["room" + this.currentRoom].betCua));
                            } else {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betTom > 0) {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, parseFloat(this.betValueOld["room" + this.currentRoom].betTom));
                            } else {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCa > 0) {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, parseFloat(this.betValueOld["room" + this.currentRoom].betCa));
                            } else {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betGa > 0) {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, parseFloat(this.betValueOld["room" + this.currentRoom].betGa));
                            } else {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, parseFloat(this.betValueOld["room" + this.currentRoom].betHuou));
                            } else {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, 0);
                            }
                        } else {
                            this.toastBauCua("Bạn chưa đặt phiên trước", 3);
                        }


                    }
                    break;
                case codeBauCua.BTN_GAPTHEPBC:

                    if (this.isBetDone["room" + this.currentRoom]) {
                        this.toastBauCua("Chỉ được gấp thếp lần đầu");
                    } else {
                        if (this.betValueOld["room" + this.currentRoom].betBau > 0 || this.betValueOld["room" + this.currentRoom].betCua > 0 || this.betValueOld["room" + this.currentRoom].betTom > 0 || this.betValueOld["room" + this.currentRoom].betCa > 0 || this.betValueOld["room" + this.currentRoom].betGa > 0 || this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                            if (this.betValueOld["room" + this.currentRoom].betBau > 0) {
                                this.betValue["room" + this.currentRoom].betBau = 0;//parseFloat(this.betValueOld["room"+this.currentRoom].betBau)*2;
                                this.updateBetBauCua(codeBauCua.BAU, parseFloat(this.betValueOld["room" + this.currentRoom].betBau) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betBau = 0;
                                this.updateBetBauCua(codeBauCua.BAU, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCua > 0) {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, parseFloat(this.betValueOld["room" + this.currentRoom].betCua) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betTom > 0) {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, parseFloat(this.betValueOld["room" + this.currentRoom].betTom) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCa > 0) {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, parseFloat(this.betValueOld["room" + this.currentRoom].betCa) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betGa > 0) {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, parseFloat(this.betValueOld["room" + this.currentRoom].betGa) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, parseFloat(this.betValueOld["room" + this.currentRoom].betHuou) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, 0);
                            }
                        } else {
                            this.toastBauCua("Bạn chưa đặt phiên trước", 3);
                        }


                    }

                    break;
                case codeBauCua.BTN_TOPXHBC:
                    openBCTopUser();
                    break;
                case codeBauCua.BTN_CLOSETOPXHBC:
                    break;
                case codeBauCua.BTN_GUILDBC:
                    openbcHuongDan();
                    break;
                case codeBauCua.BTN_CLOSEGUILDBC:
                    break;
                //case codeBauCua.BTN_LICHSUPHIENBC:
                //    break;
                case codeBauCua.BTN_CLOSELICHSUPHIENBC:
                    break;
                case codeBauCua.BTN_LICHSUGDBC:
                    openbcLSGD();
                    break;
                case codeBauCua.BTN_CLOSELICHSUGDBC:
                    break;
                case codeBauCua.BTN_ROOM1:
                    if (this.currentRoom == 0 || this.currentRoom == 3) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 0);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 3);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
                case codeBauCua.BTN_ROOM2:
                    if (this.currentRoom == 1 || this.currentRoom == 4) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 1);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 4);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
                case codeBauCua.BTN_ROOM3:
                    if (this.currentRoom == 2 || this.currentRoom == 5) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 2);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 5);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
            }
        },
        updateBetBauCua: function (side, value) {
            var codeBauCua = this.buttonTags;
            // cc.log(this.menhGia);
            if (this.isFirtBet) {
                this.toastBauCua("Bấm xác nhận để hoàn tất", 3);
                this.isFirtBet = false;
            }

            switch (side) {
                case codeBauCua.BAU:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betBau = this.betValue.room0.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betBau) + parseFloat(this.betValueDone.room0.betBau);
                            // cc.log(monneyBetShow);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betBau = this.betValue.room1.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betBau) + parseFloat(this.betValueDone.room1.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betBau = this.betValue.room2.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betBau) + parseFloat(this.betValueDone.room2.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betBau = this.betValue.room3.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betBau) + parseFloat(this.betValueDone.room3.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betBau = this.betValue.room4.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betBau) + parseFloat(this.betValueDone.room4.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betBau = this.betValue.room5.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betBau) + parseFloat(this.betValueDone.room5.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.CUA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betCua = this.betValue.room0.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betCua) + parseFloat(this.betValueDone.room0.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betCua = this.betValue.room1.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betCua) + parseFloat(this.betValueDone.room1.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betCua = this.betValue.room2.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betCua) + parseFloat(this.betValueDone.room2.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betCua = this.betValue.room3.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betCua) + parseFloat(this.betValueDone.room3.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betCua = this.betValue.room4.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betCua) + parseFloat(this.betValueDone.room4.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betCua = this.betValue.room5.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betCua) + parseFloat(this.betValueDone.room5.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.TOM:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betTom = this.betValue.room0.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betTom) + parseFloat(this.betValueDone.room0.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betTom = this.betValue.room1.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betTom) + parseFloat(this.betValueDone.room1.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betTom = this.betValue.room2.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betTom) + parseFloat(this.betValueDone.room2.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betTom = this.betValue.room3.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betTom) + parseFloat(this.betValueDone.room3.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betTom = this.betValue.room4.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betTom) + parseFloat(this.betValueDone.room4.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betTom = this.betValue.room5.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betTom) + parseFloat(this.betValueDone.room5.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.CA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betCa = this.betValue.room0.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betCa) + parseFloat(this.betValueDone.room0.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betCa = this.betValue.room1.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betCa) + parseFloat(this.betValueDone.room1.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betCa = this.betValue.room2.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betCa) + parseFloat(this.betValueDone.room2.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betCa = this.betValue.room3.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betCa) + parseFloat(this.betValueDone.room3.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betCa = this.betValue.room4.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betCa) + parseFloat(this.betValueDone.room4.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betCa = this.betValue.room5.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betCa) + parseFloat(this.betValueDone.room5.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.GA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betGa = this.betValue.room0.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betGa) + parseFloat(this.betValueDone.room0.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betGa = this.betValue.room1.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betGa) + parseFloat(this.betValueDone.room1.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betGa = this.betValue.room2.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betGa) + parseFloat(this.betValueDone.room2.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betGa = this.betValue.room3.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betGa) + parseFloat(this.betValueDone.room3.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betGa = this.betValue.room4.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betGa) + parseFloat(this.betValueDone.room4.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betGa = this.betValue.room5.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betGa) + parseFloat(this.betValueDone.room5.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.HUOU:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betHuou = this.betValue.room0.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betHuou) + parseFloat(this.betValueDone.room0.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betHuou = this.betValue.room1.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betHuou) + parseFloat(this.betValueDone.room1.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betHuou = this.betValue.room2.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betHuou) + parseFloat(this.betValueDone.room2.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betHuou = this.betValue.room3.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betHuou) + parseFloat(this.betValueDone.room3.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betHuou = this.betValue.room4.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betHuou) + parseFloat(this.betValueDone.room4.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betHuou = this.betValue.room5.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betHuou) + parseFloat(this.betValueDone.room5.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
            }
        },
        checkMoney: function () {
            if (this.moneyTypeBC == MONEY_VIN) {
                if (lobby.userInfo.vinTotal < this.menhGia) {
                    this.toastBauCua("Không đủ VIN", 3);
                    return false;
                }
                else {
                    return true;
                }
            } else {
                if (lobby.userInfo.xuTotal < this.menhGia) {
                    this.toastBauCua("Không đủ Xu", 3);
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        nhayBtnKey: function (btn) {
            this.btn_key1.setPosition(cc.p(this.btn_key1.getPosition().x, 5));
            this.btn_key2.setPosition(cc.p(this.btn_key2.getPosition().x, 5));
            this.btn_key3.setPosition(cc.p(this.btn_key3.getPosition().x, 5));
            this.btn_key4.setPosition(cc.p(this.btn_key4.getPosition().x, 5));
            this.btn_key5.setPosition(cc.p(this.btn_key5.getPosition().x, 5));
            this.btn_key1.stopAllActions();
            this.btn_key2.stopAllActions();
            this.btn_key3.stopAllActions();
            this.btn_key4.stopAllActions();
            this.btn_key5.stopAllActions();

            var moveB = cc.moveBy(0.2, cc.p(0, 8));
            var actionByBack = moveB.reverse();
            btn.runAction(cc.repeatForever(cc.sequence(moveB, actionByBack)));

        },

        responseInfo: function (referenceId, remainTime, bettingState, potData, betData, lichSuPhien, dice1, dice2, dice3, xPot, xValue, room) {
            this.bettingState = bettingState;
            this.remainTime = remainTime;
            if (bettingState) {
                if (remainTime > 5) {
                    this.txtTime.setColor(cc.color.WHITE);
                } else {
                    this.txtTime.setColor(cc.color.RED);
                }
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.inVisibleEffect();

                this.stopAllActions();
                this.btnBau.stopAllActions();
                this.btnCua.stopAllActions();
                this.btnTom.stopAllActions();
                this.btnCa.stopAllActions();
                this.btnGa.stopAllActions();
                this.btnHuou.stopAllActions();
                this.btnBau.setScale(1);
                this.btnCua.setScale(1);
                this.btnTom.setScale(1);
                this.btnCa.setScale(1);
                this.btnGa.setScale(1);
                this.btnHuou.setScale(1);

                this.numRunEffect = 15;
                this.spDiaBC.setVisible(false);
                this.spXucXacBC1.setVisible(false);
                this.spXucXacBC2.setVisible(false);
                this.spXucXacBC3.setVisible(false);
                this.aniXucXacBC.stopAllActions();
                this.aniXucXacBC.setVisible(false);
                this.spTileNhan.setVisible(false);
                this.sp_glow_nhan.setVisible(false);
                this.spTileNhanXX.setVisible(false);
                this.sp_glow_nhanXX.setVisible(false);

                //this.isBetDone = false;

                this.txtHuBau.setString("0");
                this.txtHuCua.setString("0");
                this.txtHuTom.setString("0");
                this.txtHuCa.setString("0");
                this.txtHuGa.setString("0");
                this.txtHuHuou.setString("0");

                this.txtMoneyPutBau.setString("0");
                this.txtMoneyPutCua.setString("0");
                this.txtMoneyPutTom.setString("0");
                this.txtMoneyPutCa.setString("0");
                this.txtMoneyPutGa.setString("0");
                this.txtMoneyPutHuou.setString("0");

                this.txtMoneyPutBau.setColor(this.colorBetDone);
                this.txtMoneyPutCua.setColor(this.colorBetDone);
                this.txtMoneyPutTom.setColor(this.colorBetDone);
                this.txtMoneyPutCa.setColor(this.colorBetDone);
                this.txtMoneyPutGa.setColor(this.colorBetDone);
                this.txtMoneyPutHuou.setColor(this.colorBetDone);


                this.btn_room1.setEnabled(true);
                this.btn_room2.setEnabled(true);
                this.btn_room3.setEnabled(true);
                this.btnChangeRoomBC.setEnabled(true);
                this.btnBau.setEnabled(true);
                this.btnCua.setEnabled(true);
                this.btnTom.setEnabled(true);
                this.btnCa.setEnabled(true);
                this.btnGa.setEnabled(true);
                this.btnHuou.setEnabled(true);

                this.btnGapThep.setEnabled(true);
                this.btnDatLai.setEnabled(true);
                this.btnXoa.setEnabled(true);
                this.btnXacNhan.setEnabled(true);
            }
            else {
                //this.visibleEffect();
                this.txtTime.setColor(cc.color.YELLOW);
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }

                //if(dice1 == 0) baucua.InBau.setVisible(false);
                //else if(dice1 == 1) baucua.InCua.setVisible(false);
                //else if(dice1 == 2) baucua.InTom.setVisible(false);
                //else if(dice1 == 3) baucua.InCa.setVisible(false);
                //else if(dice1 == 4) baucua.InGa.setVisible(false);
                //else if(dice1 == 5) baucua.InHuou.setVisible(false);
                //
                //if(dice2 == 0) baucua.InBau.setVisible(false);
                //else if(dice2 == 1) baucua.InCua.setVisible(false);
                //else if(dice2 == 2) baucua.InTom.setVisible(false);
                //else if(dice2 == 3) baucua.InCa.setVisible(false);
                //else if(dice2 == 4) baucua.InGa.setVisible(false);
                //else if(dice2 == 5) baucua.InHuou.setVisible(false);
                //
                //if(dice3 == 0) baucua.InBau.setVisible(false);
                //else if(dice3 ==1) baucua.InCua.setVisible(false);
                //else if(dice3 == 2) baucua.InTom.setVisible(false);
                //else if(dice3 == 3) baucua.InCa.setVisible(false);
                //else if(dice3 == 4) baucua.InGa.setVisible(false);
                //else if(dice3 == 5) baucua.InHuou.setVisible(false);
                this.result.dice1 = dice1;
                this.result.dice2 = dice2;
                this.result.dice3 = dice3;
                this.result.xPot = xPot;
                this.result.xValue = xValue;

                this.showDoneEff();

                this.btn_room1.setEnabled(false);
                this.btn_room2.setEnabled(false);
                this.btn_room3.setEnabled(false);
                this.btnChangeRoomBC.setEnabled(false);
                this.btnBau.setEnabled(false);
                this.btnCua.setEnabled(false);
                this.btnTom.setEnabled(false);
                this.btnCa.setEnabled(false);
                this.btnGa.setEnabled(false);
                this.btnHuou.setEnabled(false);

                this.btnGapThep.setEnabled(false);
                this.btnDatLai.setEnabled(false);
                this.btnXoa.setEnabled(false);
                this.btnXacNhan.setEnabled(false);

            }

            this.txtMaPhienBC.setString("#" + referenceId);
            var potDatas = potData.split(",");
            if (potDatas.length > 5) {
                this.txtHuBau.setString(formatMoneyStr(potDatas[0]));
                this.txtHuCua.setString(formatMoneyStr(potDatas[1]));
                this.txtHuTom.setString(formatMoneyStr(potDatas[2]));
                this.txtHuCa.setString(formatMoneyStr(potDatas[3]));
                this.txtHuGa.setString(formatMoneyStr(potDatas[4]));
                this.txtHuHuou.setString(formatMoneyStr(potDatas[5]));
            }
            var betDatas = betData.split(",");
            if (betDatas.length > 5) {
                this.txtMoneyPutBau.setString(formatMoneyStr(betDatas[0]));
                this.txtMoneyPutCua.setString(formatMoneyStr(betDatas[1]));
                this.txtMoneyPutTom.setString(formatMoneyStr(betDatas[2]));
                this.txtMoneyPutCa.setString(formatMoneyStr(betDatas[3]));
                this.txtMoneyPutGa.setString(formatMoneyStr(betDatas[4]));
                this.txtMoneyPutHuou.setString(formatMoneyStr(betDatas[5]));
                this.betValueDone["room" + room].betBau = betDatas[0];
                this.betValueDone["room" + room].betCua = betDatas[1];
                this.betValueDone["room" + room].betTom = betDatas[2];
                this.betValueDone["room" + room].betCa = betDatas[3];
                this.betValueDone["room" + room].betGa = betDatas[4];
                this.betValueDone["room" + room].betHuou = betDatas[5];

            }
            this.betValue["room" + room].betBau = 0;
            this.betValue["room" + room].betCua = 0;
            this.betValue["room" + room].betTom = 0;
            this.betValue["room" + room].betCa = 0;
            this.betValue["room" + room].betGa = 0;
            this.betValue["room" + room].betHuou = 0;

            this.txtMoneyPutBau.setColor(this.colorBetDone);
            this.txtMoneyPutCua.setColor(this.colorBetDone);
            this.txtMoneyPutTom.setColor(this.colorBetDone);
            this.txtMoneyPutCa.setColor(this.colorBetDone);
            this.txtMoneyPutGa.setColor(this.colorBetDone);
            this.txtMoneyPutHuou.setColor(this.colorBetDone);

            this.loadRoom(room, betData);

            //cc.log(lichSuPhien);
            var lichSu = lichSuPhien.split(",");
            while (this.arrLichSu.length > 0) {
                this.arrLichSu.pop();
            }
            for (var i = 0; i < lichSu.length; i++) {
                if (i % 5 == 4) {
                    var obLs = {};
                    obLs.xx1 = lichSu[i - 4];
                    obLs.xx2 = lichSu[i - 3];
                    obLs.xx3 = lichSu[i - 2];
                    obLs.xPot = lichSu[i - 1];
                    obLs.xValue = lichSu[i];

                    this.arrLichSu.push(obLs);
                }
            }
            this.reloadSoiCau1(this.arrLichSu);
            this.reloadSoiCau2(this.arrLichSu);

        },
        responseBet: function (result, currentMoney) {

            lobby.updateMoney(currentMoney, this.moneyTypeBC);
            this.btnXacNhan.setEnabled(true);

            if (result == 1) {
                this.betValueDone["room" + this.currentRoom].betBau = parseFloat(this.betValueDone["room" + this.currentRoom].betBau) + parseFloat(this.betValue["room" + this.currentRoom].betBau);
                this.betValueDone["room" + this.currentRoom].betCua = parseFloat(this.betValueDone["room" + this.currentRoom].betCua) + parseFloat(this.betValue["room" + this.currentRoom].betCua);
                this.betValueDone["room" + this.currentRoom].betTom = parseFloat(this.betValueDone["room" + this.currentRoom].betTom) + parseFloat(this.betValue["room" + this.currentRoom].betTom);
                this.betValueDone["room" + this.currentRoom].betCa = parseFloat(this.betValueDone["room" + this.currentRoom].betCa) + parseFloat(this.betValue["room" + this.currentRoom].betCa);
                this.betValueDone["room" + this.currentRoom].betGa = parseFloat(this.betValueDone["room" + this.currentRoom].betGa) + parseFloat(this.betValue["room" + this.currentRoom].betGa);
                this.betValueDone["room" + this.currentRoom].betHuou = parseFloat(this.betValueDone["room" + this.currentRoom].betHuou) + parseFloat(this.betValue["room" + this.currentRoom].betHuou);

                this.betValue["room" + this.currentRoom].betBau = 0;
                this.betValue["room" + this.currentRoom].betCua = 0;
                this.betValue["room" + this.currentRoom].betTom = 0;
                this.betValue["room" + this.currentRoom].betCa = 0;
                this.betValue["room" + this.currentRoom].betGa = 0;
                this.betValue["room" + this.currentRoom].betHuou = 0;

                this.txtMoneyPutBau.setColor(this.colorBetDone);
                this.txtMoneyPutCua.setColor(this.colorBetDone);
                this.txtMoneyPutTom.setColor(this.colorBetDone);
                this.txtMoneyPutCa.setColor(this.colorBetDone);
                this.txtMoneyPutGa.setColor(this.colorBetDone);
                this.txtMoneyPutHuou.setColor(this.colorBetDone);

                this.isBetDone["room" + this.currentRoom] = true;

                this.toastBauCua("Đặt cửa thành công.", 3);

            } else if (result == 100) {
                this.toastBauCua("Đặt của thất bại.", 3);
            }
            else if (result == 101) {
                this.toastBauCua("Chưa tới lượt đặt cửa.", 3);
            }
            else if (result == 102) {
                this.toastBauCua("Không đủ tiền.", 3);
            }

        },

        responseStartNewGame: function (referenceId) {
            this.isFirtBet = true;
            this.txtMaPhienBC.setString("#" + referenceId);
            this.inVisibleEffect();
            this.stopAllActions();
            this.btnBau.stopAllActions();
            this.btnCua.stopAllActions();
            this.btnTom.stopAllActions();
            this.btnCa.stopAllActions();
            this.btnGa.stopAllActions();
            this.btnHuou.stopAllActions();
            this.btnBau.setScale(1);
            this.btnCua.setScale(1);
            this.btnTom.setScale(1);
            this.btnCa.setScale(1);
            this.btnGa.setScale(1);
            this.btnHuou.setScale(1);

            this.numRunEffect = 15;
            this.spDiaBC.setVisible(false);
            this.spXucXacBC1.setVisible(false);
            this.spXucXacBC2.setVisible(false);
            this.spXucXacBC3.setVisible(false);
            this.aniXucXacBC.stopAllActions();
            this.aniXucXacBC.setVisible(false);
            this.spTileNhan.setVisible(false);
            this.sp_glow_nhan.setVisible(false);
            this.spTileNhanXX.setVisible(false);
            this.sp_glow_nhanXX.setVisible(false);

            //this.isBetDone = false;

            this.txtHuBau.setString("0");
            this.txtHuCua.setString("0");
            this.txtHuTom.setString("0");
            this.txtHuCa.setString("0");
            this.txtHuGa.setString("0");
            this.txtHuHuou.setString("0");

            this.txtMoneyPutBau.setString("0");
            this.txtMoneyPutCua.setString("0");
            this.txtMoneyPutTom.setString("0");
            this.txtMoneyPutCa.setString("0");
            this.txtMoneyPutGa.setString("0");
            this.txtMoneyPutHuou.setString("0");

            this.txtMoneyPutBau.setColor(this.colorBetDone);
            this.txtMoneyPutCua.setColor(this.colorBetDone);
            this.txtMoneyPutTom.setColor(this.colorBetDone);
            this.txtMoneyPutCa.setColor(this.colorBetDone);
            this.txtMoneyPutGa.setColor(this.colorBetDone);
            this.txtMoneyPutHuou.setColor(this.colorBetDone);


            this.btn_room1.setEnabled(true);
            this.btn_room2.setEnabled(true);
            this.btn_room3.setEnabled(true);
            this.btnChangeRoomBC.setEnabled(true);
            this.btnBau.setEnabled(true);
            this.btnCua.setEnabled(true);
            this.btnTom.setEnabled(true);
            this.btnCa.setEnabled(true);
            this.btnGa.setEnabled(true);
            this.btnHuou.setEnabled(true);

            this.btnGapThep.setEnabled(true);
            this.btnDatLai.setEnabled(true);
            this.btnXoa.setEnabled(true);
            this.btnXacNhan.setEnabled(true);

            for (var i = 0; i < 6; i++) {
                if (this.betValueDone["room" + i].betBau > 0 || this.betValueDone["room" + i].betCua > 0 || this.betValueDone["room" + i].betTom > 0 || this.betValueDone["room" + i].betCa > 0 || this.betValueDone["room" + i].betGa > 0 || this.betValueDone["room" + i].betHuou > 0) {
                    this.betValueOld["room" + i].betBau = this.betValueDone["room" + i].betBau;
                    this.betValueOld["room" + i].betCua = this.betValueDone["room" + i].betCua;
                    this.betValueOld["room" + i].betTom = this.betValueDone["room" + i].betTom;
                    this.betValueOld["room" + i].betCa = this.betValueDone["room" + i].betCa;
                    this.betValueOld["room" + i].betGa = this.betValueDone["room" + i].betGa;
                    this.betValueOld["room" + i].betHuou = this.betValueDone["room" + i].betHuou;
                }
                this.betValueDone["room" + i].betBau = 0;
                this.betValueDone["room" + i].betCua = 0;
                this.betValueDone["room" + i].betTom = 0;
                this.betValueDone["room" + i].betCa = 0;
                this.betValueDone["room" + i].betGa = 0;
                this.betValueDone["room" + i].betHuou = 0;

                this.betValue["room" + i].betBau = 0;
                this.betValue["room" + i].betCua = 0;
                this.betValue["room" + i].betTom = 0;
                this.betValue["room" + i].betCa = 0;
                this.betValue["room" + i].betGa = 0;
                this.betValue["room" + i].betHuou = 0;

                this.isBetDone["room" + i] = false;
            }
            this.reloadSoiCau1(this.arrLichSu);
            this.reloadSoiCau2(this.arrLichSu);
            //this.betValueDone = this.betValueNull;
            //this.betValue = this.betValueNull;

        },
        responseUpdate: function (potData, remainTime, bettingState) {
            this.bettingState = bettingState;
            this.remainTime = remainTime;
            if (bettingState) {
                if (remainTime > 5) {
                    this.txtTime.setColor(cc.color.WHITE);
                } else {
                    this.txtTime.setColor(cc.color.RED);
                }
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.inVisibleEffect();
            }
            else {
                this.txtTime.setColor(cc.color.YELLOW);
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.btn_room1.setEnabled(false);
                this.btn_room2.setEnabled(false);
                this.btn_room3.setEnabled(false);
                this.btnChangeRoomBC.setEnabled(false);
                this.btnBau.setEnabled(false);
                this.btnCua.setEnabled(false);
                this.btnTom.setEnabled(false);
                this.btnCa.setEnabled(false);
                this.btnGa.setEnabled(false);
                this.btnHuou.setEnabled(false);

                this.btnGapThep.setEnabled(false);
                this.btnDatLai.setEnabled(false);
                this.btnXoa.setEnabled(false);
                this.btnXacNhan.setEnabled(false);
            }
            var potDatas = potData.split(",")
            if (potDatas.length > 5) {
                this.txtHuBau.setString(formatMoneyStr(potDatas[0]));
                this.txtHuCua.setString(formatMoneyStr(potDatas[1]));
                this.txtHuTom.setString(formatMoneyStr(potDatas[2]));
                this.txtHuCa.setString(formatMoneyStr(potDatas[3]));
                this.txtHuGa.setString(formatMoneyStr(potDatas[4]));
                this.txtHuHuou.setString(formatMoneyStr(potDatas[5]));
            }
        },
        responseResult: function (dice1, dice2, dice3, xPot, xValue) {
            this.result.dice1 = dice1;
            this.result.dice2 = dice2;
            this.result.dice3 = dice3;
            this.result.xPot = xPot;
            this.result.xValue = xValue;

            this.aniXucXacBC.setVisible(true);
            this.aniXucXacBC.runAction(cc.sequence(this.actionTungXXBC()));
            var obLs = {};
            obLs.xx1 = dice1;
            obLs.xx2 = dice2;
            obLs.xx3 = dice3;
            obLs.xPot = xPot;
            obLs.xValue = xValue;
            this.arrLichSu.push(obLs);
        },
        responsePrize: function (prize, currentMoney, room) {
            var moneyType = MONEY_VIN;

            if (room < 3) {
                moneyType = MONEY_VIN;
            }
            else {
                moneyType = MONEY_XU;
            }

            lobby.updateMoney(currentMoney, moneyType);
            var dvTien = "";
            var strKetQua = "";
            if (room == this.currentRoom) {
                if (room < 3) {
                    dvTien = " VIN";
                } else {
                    dvTien = " XU";
                }

                if (prize > 0) {

                    strKetQua = strKetQua + "+ " + formatMoney(0, 3, prize) + dvTien;
                    if (this.moneyTypeBC == MONEY_VIN) {
                        this.effectShowMoney(strKetQua, 1, colorMoneyVin);

                    } else {
                        this.effectShowMoney(strKetQua, 1, colorMoneyXu);
                    }

                }

            }

        },
        loadRoom: function (room, betData) {
            var betDatas = betData.split(",");
            this.currentRoom = room;
            this.indexMenhGia = 1;
            switch (room) {
                case 0:
                    this.betValueDone.room0.betBau = betDatas[0];
                    this.betValueDone.room0.betCua = betDatas[1];
                    this.betValueDone.room0.betTom = betDatas[2];
                    this.betValueDone.room0.betCa = betDatas[3];
                    this.betValueDone.room0.betGa = betDatas[4];
                    this.betValueDone.room0.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");
                    // "Minigame/TaiXiu/images/sp_xiu.png"
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");

                    this.menhGia = 1000;

                    this.btn_key1.setTitleText("1K");
                    this.btn_key2.setTitleText("5K");
                    this.btn_key3.setTitleText("10K");
                    this.btn_key4.setTitleText("50K");
                    this.btn_key5.setTitleText("100K");
                    break;
                case 1:
                    this.betValueDone.room1.betBau = betDatas[0];
                    this.betValueDone.room1.betCua = betDatas[1];
                    this.betValueDone.room1.betTom = betDatas[2];
                    this.betValueDone.room1.betCa = betDatas[3];
                    this.betValueDone.room1.betGa = betDatas[4];
                    this.betValueDone.room1.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");

                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 10000;

                    this.btn_key1.setTitleText("10K");
                    this.btn_key2.setTitleText("50K");
                    this.btn_key3.setTitleText("100K");
                    this.btn_key4.setTitleText("500K");
                    this.btn_key5.setTitleText("1M");
                    break;
                case 2:
                    this.betValueDone.room2.betBau = betDatas[0];
                    this.betValueDone.room2.betCua = betDatas[1];
                    this.betValueDone.room2.betTom = betDatas[2];
                    this.betValueDone.room2.betCa = betDatas[3];
                    this.betValueDone.room2.betGa = betDatas[4];
                    this.betValueDone.room2.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/room_select.png");

                    this.menhGia = 100000;
                    this.btn_key1.setTitleText("100K");
                    this.btn_key2.setTitleText("500K");
                    this.btn_key3.setTitleText("1M");
                    this.btn_key4.setTitleText("5M");
                    this.btn_key5.setTitleText("10M");
                    break;
                case 3:
                    this.betValueDone.room3.betBau = betDatas[0];
                    this.betValueDone.room3.betCua = betDatas[1];
                    this.betValueDone.room3.betTom = betDatas[2];
                    this.betValueDone.room3.betCa = betDatas[3];
                    this.betValueDone.room3.betGa = betDatas[4];
                    this.betValueDone.room3.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 10000;

                    this.btn_key1.setTitleText("10K");
                    this.btn_key2.setTitleText("50K");
                    this.btn_key3.setTitleText("100K");
                    this.btn_key4.setTitleText("500K");
                    this.btn_key5.setTitleText("1M");
                    break;
                case 4:
                    this.betValueDone.room4.betBau = betDatas[0];
                    this.betValueDone.room4.betCua = betDatas[1];
                    this.betValueDone.room4.betTom = betDatas[2];
                    this.betValueDone.room4.betCa = betDatas[3];
                    this.betValueDone.room4.betGa = betDatas[4];
                    this.betValueDone.room4.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 100000;

                    this.btn_key1.setTitleText("100K");
                    this.btn_key2.setTitleText("500K");
                    this.btn_key3.setTitleText("1M");
                    this.btn_key4.setTitleText("5M");
                    this.btn_key5.setTitleText("10M");
                    break;
                case 5:
                    this.betValueDone.room5.betBau = betDatas[0];
                    this.betValueDone.room5.betCua = betDatas[1];
                    this.betValueDone.room5.betTom = betDatas[2];
                    this.betValueDone.room5.betCa = betDatas[3];
                    this.betValueDone.room5.betGa = betDatas[4];
                    this.betValueDone.room5.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.menhGia = 1000000;

                    this.btn_key1.setTitleText("1M");
                    this.btn_key2.setTitleText("5M");
                    this.btn_key3.setTitleText("10M");
                    this.btn_key4.setTitleText("50M");
                    this.btn_key5.setTitleText("100M");
                    break;
            }


            if (this.moneyTypeBC == MONEY_VIN) {
                this.txtHuBau.setColor(this.colorPotVin);
                this.txtHuCua.setColor(this.colorPotVin);
                this.txtHuTom.setColor(this.colorPotVin);
                this.txtHuCa.setColor(this.colorPotVin);
                this.txtHuGa.setColor(this.colorPotVin);
                this.txtHuHuou.setColor(this.colorPotVin);
            } else {
                this.txtHuBau.setColor(this.colorPotXu);
                this.txtHuCua.setColor(this.colorPotXu);
                this.txtHuTom.setColor(this.colorPotXu);
                this.txtHuCa.setColor(this.colorPotXu);
                this.txtHuGa.setColor(this.colorPotXu);
                this.txtHuHuou.setColor(this.colorPotXu);
            }


            this.btn_room1.setEnabled(true);
            this.btn_room2.setEnabled(true);
            this.btn_room3.setEnabled(true);
            this.btnChangeRoomBC.setEnabled(true);
            this.nhayBtnKey(this.btn_key1);


        },
        actionTungXXBC: function () {
            baucua.spDiaBC.setVisible(true);
            baucua.aniXucXacBC.setVisible(true);
            baucua.spTileNhan.setVisible(false);
            baucua.sp_glow_nhan.setVisible(false);
            baucua.spTileNhanXX.setVisible(false);
            baucua.sp_glow_nhanXX.setVisible(false);
            baucua.spXucXacBC1.setVisible(false);
            baucua.spXucXacBC2.setVisible(false);
            baucua.spXucXacBC3.setVisible(false);

            //var bcTexture = cc.textureCache.addImage("res/Minigame/BauCua/animationXXBC.png");
            //baucua.addChild(bcImages);
            var animFrames = [];
            var str = "";
            for (var i = 0; i < 19; i++) {
                if (i <= 9) {
                    str = "Minigame/BauCua/AnimationXucXac/00" + i + ".png";
                } else {
                    str = "Minigame/BauCua/AnimationXucXac/0" + i + ".png";
                }
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.05, 1);
            var animate = new cc.Animate(animation);


            this.isDoneTungXX = false;
            baucua.runEffect();
            var seq = cc.sequence(animate, cc.callFunc(function () {
                baucua.isDoneTungXX = true;
                baucua.ShowResult();
            }));

            return seq;
        },
        ShowResult: function () {
            var baucua = this;

            if (this.result.dice1 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice1 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice1 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice1 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice1 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice1 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC1.setVisible(true);
            baucua.spXucXacBC1.setSpriteFrame(baucua.linkImageXX);

            if (this.result.dice2 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice2 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice2 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice2 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice2 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice2 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC2.setVisible(true);
            baucua.spXucXacBC2.setSpriteFrame(baucua.linkImageXX);

            if (this.result.dice3 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice3 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice3 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice3 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice3 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice3 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC3.setVisible(true);
            baucua.spXucXacBC3.setSpriteFrame(baucua.linkImageXX);


        },
        reloadChangeRoom: function (value) {

            if (value == 1) {
                baucua.txtroomBC1.setString("1K");
                baucua.txtroomBC2.setString("5K");
                baucua.txtroomBC3.setString("10K");
                baucua.txtroomBC4.setString("50K");
                baucua.txtroomBC5.setString("100K");
            } else if (value == 2) {
                baucua.txtroomBC1.setString("10K");
                baucua.txtroomBC2.setString("50K");
                baucua.txtroomBC3.setString("100K");
                baucua.txtroomBC4.setString("500K");
                baucua.txtroomBC5.setString("1M");
            } else {
                baucua.txtroomBC1.setString("100K");
                baucua.txtroomBC2.setString("500K");
                baucua.txtroomBC3.setString("1M");
                baucua.txtroomBC4.setString("5M");
                baucua.txtroomBC5.setString("10M");
            }
        },
        runEffect: function () {
            if (baucua.invisibleBC == "huou") {
                baucua.invisibleBC = "bau";
                baucua.InHuou.setVisible(true);
                baucua.InBau.setVisible(false);
            } else if (baucua.invisibleBC == "bau") {
                baucua.invisibleBC = "ga";
                baucua.InBau.setVisible(true);
                baucua.InGa.setVisible(false);
            } else if (baucua.invisibleBC == "ga") {
                baucua.invisibleBC = "tom";
                baucua.InGa.setVisible(true);
                baucua.InTom.setVisible(false);
            } else if (baucua.invisibleBC == "ca") {
                baucua.invisibleBC = "huou";
                baucua.InCa.setVisible(true);
                baucua.InHuou.setVisible(false);
            } else if (baucua.invisibleBC == "cua") {
                baucua.invisibleBC = "ca";
                baucua.InCua.setVisible(true);
                baucua.InCa.setVisible(false);
            } else if (baucua.invisibleBC == "tom") {
                baucua.invisibleBC = "cua";
                baucua.InTom.setVisible(true);
                baucua.InCua.setVisible(false);
            }
            if (!baucua.isDoneTungXX) {
                this.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(baucua.runEffect, this)));
            }



            //return ac;
            //if (baucua.numRunEffect >= 0){
            //    this.runAction(cc.sequence(cc.delayTime(0.05),cc.callFunc(baucua.runEffect,this)));
            else {

                this.showDoneEff();
            }
        },
        showDoneEff: function () {

            this.visibleEffect();
            baucua.btnBau.stopAllActions();
            baucua.btnCua.stopAllActions();
            baucua.btnTom.stopAllActions();
            baucua.btnCa.stopAllActions();
            baucua.btnGa.stopAllActions();
            baucua.btnHuou.stopAllActions();
            baucua.btnXacNhan.setEnabled(true);
            if (this.result.dice1 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice1 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice1 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            if (this.result.dice2 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice2 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice2 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            if (this.result.dice3 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice3 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice3 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            this.checkXPot();
        },

        checkXPot: function () {


            var arrXX = [this.result.dice1, this.result.dice2, this.result.dice3];
            var nhan = this.nhan(arrXX);
            for (var i = 0; i < nhan.length; i++) {
                if (nhan[i].nhan1 > 1) {
                    this.spTileNhanXX.setVisible(true);
                    this.sp_glow_nhanXX.setVisible(true);
                    this.spTileNhanXX.setSpriteFrame("res/Minigame/BauCua/x" + nhan[i].nhan1 + ".png");
                    this.sp_glow_nhanXX.setPosition(this.getPositionNhan(i))
                    this.spTileNhanXX.setPosition(this.getPositionNhan(i));
                }

                if (nhan[i].nhan2 > 2) {
                    this.spTileNhan.setVisible(true);
                    this.sp_glow_nhan.setVisible(true);
                    this.spTileNhan.setSpriteFrame("res/Minigame/BauCua/x" + nhan[i].nhan2 + ".png");
                    this.sp_glow_nhan.setPosition(this.getPositionNhan(i))
                    this.spTileNhan.setPosition(this.getPositionNhan(i));
                }

            }

        },
        showNhan: function () {
            if (this.result.xValue >= 2) {
                this.spTileNhan.setSpriteFrame("res/Minigame/BauCua/x" + this.result.xValue + ".png");
                this.spTileNhan.setPosition(this.getPositionNhan(this.result.xPot));
                this.sp_glow_nhan.setPosition(this.getPositionNhan(this.result.xPot));

            }
            else {
                this.spTileNhan.setVisible(false);
                this.sp_glow_nhan.setVisible(false);

            }
        },
        getPositionNhan: function (pot) {
            if (pot == 0) return this.btnBau.getPosition();
            else if (pot == 1) return this.btnCua.getPosition();
            else if (pot == 2) return this.btnTom.getPosition();
            else if (pot == 3) return this.btnCa.getPosition();
            else if (pot == 4) return this.btnGa.getPosition();
            else return this.btnHuou.getPosition();
        },
        nhayBtnItem: function () {
            var moveB = cc.scaleBy(0.3, 0.8);
            var actionByBack = moveB.reverse();
            var se = cc.sequence(moveB, actionByBack);
            return se;
        },
        visibleEffect: function () {
            baucua.InBau.setVisible(true);
            baucua.InCua.setVisible(true);
            baucua.InTom.setVisible(true);
            baucua.InCa.setVisible(true);
            baucua.InGa.setVisible(true);
            baucua.InHuou.setVisible(true);
        },
        inVisibleEffect: function () {
            baucua.InBau.setVisible(false);
            baucua.InCua.setVisible(false);
            baucua.InTom.setVisible(false);
            baucua.InCa.setVisible(false);
            baucua.InGa.setVisible(false);
            baucua.InHuou.setVisible(false);
        },
        resetVitriRoom: function () {
            baucua.pnroomBC1.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC2.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC3.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC4.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC5.setPositionX(baucua.vtBtnRoom);
        },

        sendChangeRoom: function (currentRoom, joinRoom) {
            var bcSend = new BCSendChangeRoom();
            bcSend.putChangeRoom(currentRoom, joinRoom);
            Minigame.miniGameClient.send(bcSend);
            bcSend.clean();
        },
        sendBet: function () {
            if (this.betValue["room" + this.currentRoom].betBau > 0 || this.betValue["room" + this.currentRoom].betCua > 0 || this.betValue["room" + this.currentRoom].betTom > 0 || this.betValue["room" + this.currentRoom].betCa > 0 || this.betValue["room" + this.currentRoom].betGa > 0 || this.betValue["room" + this.currentRoom].betHuou > 0) {
                var betData = this.betValue["room" + this.currentRoom].betBau.toString() + "," + this.betValue["room" + this.currentRoom].betCua.toString() + "," + this.betValue["room" + this.currentRoom].betTom.toString() + "," + this.betValue["room" + this.currentRoom].betCa.toString() + "," + this.betValue["room" + this.currentRoom].betGa.toString() + "," + this.betValue["room" + this.currentRoom].betHuou.toString();
                //cc.log(betData);
                var bcSend = new BCSendBet();
                bcSend.putBet(betData);
                Minigame.miniGameClient.send(bcSend);
                bcSend.clean();
            } else {
                this.toastBauCua("Bạn chưa đăt cửa", 3);
            }


        },
        reloadSoiCau2: function (arr) {
            var codeBauCua = this.buttonTags;
            var bau = 0;
            var cua = 0;
            var tom = 0;
            var ca = 0;
            var ga = 0;
            var huou = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].xx1 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx1 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx1 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx1 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx1 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx1 == codeBauCua.HUOU) {
                    huou++;
                }

                if (arr[i].xx2 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx2 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx2 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx2 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx2 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx2 == codeBauCua.HUOU) {
                    huou++;
                }

                if (arr[i].xx3 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx3 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx3 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx3 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx3 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx3 == codeBauCua.HUOU) {
                    huou++;
                }
            }
            this.lb_soi_cau_bau.setString(bau);
            this.lb_soi_cau_cua.setString(cua);
            this.lb_soi_cau_tom.setString(tom);
            this.lb_soi_cau_ca.setString(ca);
            this.lb_soi_cau_ga.setString(ga);
            this.lb_soi_cau_huou.setString(huou);

        },
        reloadSoiCau1: function (arr) {
            this.lv_soi_cau.removeAllItems();
            var startX = 44;
            var startY = 27;
            var khoangCach = 60;
            var chieuCao = 46;

            for (var i = arr.length - 1; i >= 0; i--) {
                var cellList = new ccui.Layout();
                cellList.height = chieuCao;
                cellList.width = this.lv_soi_cau.width;

                var spNen1;// = new cc.Sprite();
                if (arr[i].xx1 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen1 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen1 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen1 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen1 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen1.setPosition(startX, startY);
                var spItem1 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/" + arr[i].xx1 + ".png");
                spItem1.setPosition(startX, startY);


                var spNen2;// = new cc.Sprite();
                if (arr[i].xx2 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen2 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen2 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen2 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen2 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen2.setPosition(startX + khoangCach, startY);
                var spItem2 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/" + arr[i].xx2 + ".png");
                spItem2.setPosition(startX + khoangCach, startY);

                var spNen3;// = new cc.Sprite();
                if (arr[i].xx3 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen3 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen3 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/soicau_x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen3 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen3 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen3.setPosition(startX + 2 * khoangCach, startY);
                var spItem3 = new cc.Sprite("#res/Minigame/BauCua/SoiCau/" + arr[i].xx3 + ".png");
                spItem3.setPosition(startX + 2 * khoangCach, startY);

                cellList.addChild(spNen1);
                cellList.addChild(spNen2);
                cellList.addChild(spNen3);
                cellList.addChild(spItem1);
                cellList.addChild(spItem2);
                cellList.addChild(spItem3);

                this.lv_soi_cau.pushBackCustomItem(cellList);

            }
        },
        nhan: function (dices) {
            var tiLe = new Array(6);
            for (var i = 0; i < 6; i++) {
                var objTile = {nhan1: 0, nhan2: 0};
                objTile.nhan1 = 0;
                for (var j = 0; j < dices.length; j++) {
                    if (i == dices[j]) {
                        objTile.nhan1++;
                    }
                }
                if (objTile.nhan1 > 0 && i == this.result.xPot) {
                    objTile.nhan2 = objTile.nhan1 * this.result.xValue;
                }
                tiLe[i] = objTile;
            }
            if (tiLe[this.result.xPot].nhan1 == 0) {
                tiLe[this.result.xPot].nhan2 = this.result.xValue;
            }
            return tiLe;
        }


        ,
        effectShowMoney: function (message, timeShow, colorLB) {
            var wbg = this.pBauCua.getContentSize().width;
            var hbg = this.pBauCua.getContentSize().height;
            if (this.pBauCua.getChildByTag(9999) != null) {
                // this.bg_tai_xiu.getChildByName("moneyShow123").removeAllChildren(true);
                this.pBauCua.removeChildByTag(9999, true);

            }
            var lb = new cc.LabelTTF(message, fontRobotoBlack.fontName, 32);
            lb.setName("moneyShow123");
            lb.setTag(9999);
            lb.setString(message);
            lb.setPosition(cc.p(wbg / 2, hbg / 2 + 70));
            this.pBauCua.addChild(lb);

            if (colorLB != null) {
                lb.color = colorLB;
            } else {
                lb.color = cc.color(255, 255, 255);
            }
            var fadeOut = cc.fadeOut(3);
            var fadeIn = cc.fadeIn(0.25);
            var mo = cc.moveBy(3, cc.p(0, 120));
            var sp = cc.spawn(fadeOut, mo);
            var seq = cc.sequence(fadeIn, cc.delayTime(timeShow), sp);
            lb.runAction(seq);
        },

        toastBauCua: function (message, timeShow, colorLable) {
            var baucua = {
                pBauCua: this._layout
            };
            var btnXacNhan = this.btnXacNhan;
            setTimeout(function () {
                btnXacNhan.setEnabled(true);
            }, 500);
            var wbg = baucua.pBauCua.getContentSize().width;
            if (this.getChildByTag(999) != null) {
                this.getChildByTag(999).removeAllChildren(true);
                baucua.pBauCua.removeChildByTag(999, true);
            }
            //var layer = new cc.LayerColor(cc.color(245, 170, 8));
            var layer = new cc.Sprite("res/Minigame/ImageChung/bg_mo.png");
            layer.setOpacity(90);

            layer.setName("tostTaiXiu");


            layer.setTag(999);

            var label1 = new cc.LabelTTF(message, "Arial", 28);
            layer.addChild(label1);
            var w = layer.getContentSize().width;
            //layer.setContentSize(cc.size(w + 10,40))
            layer.setPosition(wbg / 2, 40);
            if (colorLable != null) {
                label1.color = colorLable;
            } else {
                label1.color = cc.color(255, 255, 255);
            }
            //label1.color = cc.color(241, 224, 99);
            label1.x = w / 2;
            label1.y = 20;
            //label1.opacity = 0;
            var fadeOut = cc.fadeOut(2);
            var fadeIn = cc.fadeIn(0.5);
            var seq = cc.sequence(fadeIn, cc.delayTime(timeShow), fadeOut, cc.callFunc(function () {
                // label1.setVisible(false);
            }));

            baucua.pBauCua.addChild(layer, 999);
            //var forever = seq.repeatForever();
            layer.runAction(seq);
            label1.runAction(seq.clone());


        }

    }
)


subscribeBauCua = function () {
    var bcSend = new BCSendSubscribe();
    if (baucua == null) {
        bcSend.putSubScribe(0);
    } else {
        bcSend.putSubScribe(baucua.currentRoom);
    }
    Minigame.miniGameClient.send(bcSend);
    bcSend.clean();
}

unsubscribeBauCua = function () {
    var bcSend = new BCSendUnscribe();
    bcSend.putUnsubScribe(baucua.currentRoom);
    Minigame.miniGameClient.send(bcSend);
    bcSend.clean();
},

    openBauCua = function () {

        if (baucua === null) {

            cc.log("----> openBauCua");
            baucua = new codeBauCua();
            baucuaX = baucua.getPosition().x;
            baucuaY = baucua.getPosition().y;
            var curScene = SceneMgr.getInstance().getRunningScene();
            curScene.addGUI(baucua, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_BAU_CUA);

        } else {
            baucua.setVisible(true);
            cc.eventManager.resumeTarget(baucua.pBauCua, true);
            baucua.reOpenLayer(baucua.pBauCua);
        }
        subscribeBauCua();
        baucuaAppear = true;
    };
closeBauCua = function () {
    if (baucua === null) {
        cc.log(" Bau cua Null");
        return;
    }
    if (baucuaAppear) {
        baucua.closeLayer(baucua.pBauCua);
        baucua.setVisible(false);
        if (menutab.Islogout == false) {
            unsubscribeBauCua();
        }
        baucuaAppear = false;
        cc.eventManager.pauseTarget(baucua.pBauCua, true);

        if (bcTopUser != null) {
            closeBCTopUser();
        }
        if (bcLSGD != null) {
            closebcLSGD();
        }
        if (bcHuongDan != null) {
            closebcHuongDan();
        }
        if (bcToiChonCa != null) {
            closeBCToiChonCa();
        }


    }
};
