var slot3hang = null;
var slot3hangX = 0;
var slot3hangY = 0;
var slot3hangAppear = false;

var codeSlot3Hang = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.resourcePath = "res/Minigame/ResSlotBa/";

            this.betValueRoom = {
                betRoom0: 100,
                betRoom1: 1000,
                betRoom2: 10000,
                betRoom3: 1000,
                betRoom4: 10000,
                betRoom5: 100000
            };
            this.betValue = 100;
            this.moneyType = MONEY_VIN;
            this.currentRoom = 0;
            this.isChangeRoom = false;
            this.valueHuSlot = 0;
            this.arrBtnChoiLine = [];
            this.lineSelected = 1;
            this.result = 0;
            this.matrix = [];
            this.linesWin = [];
            this.isSubcribe = false;

            this.prize = 0;
            this.startPosYPnCol1 = 0;
            this.startPosYPnCol2 = 0;
            this.startPosYPnCol3 = 0;
            this.isX2 = false;


            this.btnCloseSlot = null;
            this.pnChonDong = null;
            this.btnCloseChonDong = null;
            this.pnLine = null;
            this.btnQuay = null;
            this.btnChonDong = null;
            this.btnTuQuay = null;
            this.txtchondong = null;
            this.pvItem = null;
            this.pnelItem = null;
            this.pnCol1 = null;
            this.pnCol2 = null;
            this.pnCol3 = null;
            this.pnBackGround = null;

            this.vlColum1 = false;
            this.linkImageItem = "";
            this.vitriY = 0;
            this.isStartRotate = false;
            this.linewin = null;
            this.nextline = 0;

            this.line1 = null;
            this.line2 = null;
            this.line3 = null;
            this.line4 = null;
            this.line5 = null;
            this.line6 = null;
            this.line7 = null;
            this.line8 = null;
            this.line9 = null;
            this.line10 = null;
            this.line11 = null;
            this.line12 = null;
            this.line13 = null;
            this.line14 = null;
            this.line15 = null;
            this.line16 = null;
            this.line17 = null;
            this.line18 = null;
            this.line19 = null;
            this.line20 = null;

            this.pnRoom1 = null;
            this.pnRoom2 = null;
            this.pnRoom3 = null;
            //this.sproom1 = null; this.sproom2 = null; this.sproom3 = null;
            this.btnRoom1 = null;
            this.btnRoom2 = null;
            this.btnRoom3 = null;
            // this.txtroom1 = null; this.txtroom2 = null; this.txtroom3 = null;
            //this.sp_changeMoney = null;
            this.btn_changeMoney = null;
            this.btn_event = null;
            this.btn_x2_hu = null;
            this.lb_date_x2 = null;


            //this.spline1 = null; this.spline2 = null; this.spline3 = null; this.spline4 = null; this.spline5 = null;
            //this.spline6 = null; this.spline7 = null; this.spline8 = null; this.spline9 = null; this.spline10 = null;
            //this.spline11 = null; this.spline12 = null; this.spline13 = null; this.spline14 = null; this.spline15 = null;
            //this.spline16 = null; this.spline17 = null; this.spline18 = null; this.spline19 = null; this.spline20 = null;

            //this.btn1 = null; this.btn2 = null; this.btn3 = null; this.btn4 = null; this.btn5 = null;
            //this.btn6 = null; this.btn7 = null; this.btn8 = null; this.btn9 = null; this.btn10 = null;
            //this.btn11 = null; this.btn12 = null; this.btn13 = null; this.btn14 = null; this.btn15 = null;
            //this.btn16 = null; this.btn17 = null; this.btn18 = null; this.btn19 = null; this.btn20 = null;

            this.running1 = true;
            this.running2 = false;
            this.running3 = false;
            this.running4 = false;
            this.running5 = false;
            this.running6 = false;
            this.running7 = false;
            this.running8 = false;
            this.running9 = false;
            this.running10 = false;
            this.running11 = false;
            this.running12 = false;
            this.running13 = false;
            this.running14 = false;
            this.running15 = false;
            this.running16 = false;
            this.running17 = false;
            this.running18 = false;
            this.running19 = false;
            this.running20 = false;

            this.btnDongLe = null;
            this.btnDongChan = null;
            this.btnTatCa = null;
            this.btnChonLai = null;
            this.txtchondong = null;
            this.autoRotateSlot = false;
            this.timedelayauto = parseFloat();
            this.txtMoneyEarn = null;
            this.BreakMoney = null;
            this.moneyearn = null;
            this.tilescale = 1.0;
            this.vitribandautxt = 0;

            this.moneyTypeSlot = "vin";
            this.valueMoneySlot = 100;
            this.txtHuSlot = null;
            this.actionAutoSlot = null;

            this.btnHelp = null;
            this.btnVinhDanhSlot = null;
            this.btnInfo = null;

            this.pnVisibleLine = null;
            this.vis_l1 = null;
            this.vis_l2 = null;
            this.vis_l3 = null;
            this.vis_l4 = null;
            this.vis_l5 = null;
            this.vis_l6 = null;
            this.vis_l7 = null;
            this.vis_l8 = null;
            this.vis_l9 = null;
            this.vis_l10 = null;
            this.vis_l11 = null;
            this.vis_l12 = null;
            this.vis_l13 = null;
            this.vis_l14 = null;
            this.vis_l15 = null;
            this.vis_l16 = null;
            this.vis_l17 = null;
            this.vis_l18 = null;
            this.vis_l19 = null;
            this.vis_l20 = null;

            this.moveOnLine = false;
            this.moveShowOn = false;

            this.pnShowLine = null;
            this.onMouseVisible = null;
            this.showline1 = null;
            this.showline2 = null;
            this.showline3 = null;
            this.showline4 = null;
            this.showline5 = null;
            this.showline6 = null;
            this.showline7 = null;
            this.showline8 = null;
            this.showline9 = null;
            this.showline10 = null;
            this.showline11 = null;
            this.showline12 = null;
            this.showline13 = null;
            this.showline14 = null;
            this.showline15 = null;
            this.showline16 = null;
            this.showline17 = null;
            this.showline18 = null;
            this.showline19 = null;
            this.showline20 = null;

            this.valueHuSlot = 0;
            this.breakValueHu = null;
            this.valueOldHuSlot = 100000000;

            this.txt_tuquay = null;
            this.sp_effect_earn_money = null;

            this.showline = null;
            this.line = null;
            this.isSelectline = false;

            this.posX = 30;
            this.posY = 46;
            this.saveposY = 46;
            this.config_item = 22;
            this.lineputslot = "0,1";
            this.resultSlot = "1_3,3,3,6,5,4,1,2,6|1,4,5,7,15,18,20|200000,0";
            this.CURRENT_ROOM_MINI_SLOT = 0;
            this.pn_nohu_slot = null;
            this.sp_item_thanglon = null;
            this.btn_close_no_hu = null;
            // this.par_nohu = null;
            this.pn_bangthuong = null;
            this.bg_bangthuong = null;
            this.sp_nohu = null;
            this.txt_money_hu = null;
            this.par_1 = null;
            this.par_2 = null;
            this.par_3 = null;
            this.par_4 = null;
            this.par_5 = null;
            this.par_6 = null;
            this.par_7 = null;
            this.par_8 = null;
            this.selectPar = 1;
            this.panX = null;
            this.panY = null;
            this.savePos_pn_bangthuongX = null;
            this.savePos_pn_bangthuongY = null;
            this.star_1 = null;
            this.star_2 = null;
            this.star_3 = null;
            this.shadow = null;

            this.pThangLon = null;
            this.sp_sao_thang_lon = null;
            this.sp_glow_thang_lon = null;
            this.sp_bg_thang_lon = null;
            this.lb_money_thang_lon = null;
            this.sp_pkc_thang_lon = null;
            this.sp_text_thang_lon = null;
            this.isPlus = false;

            this._super("codeSlot3Hang");
            // this.initWithBinaryFile("res/Slot3hang.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResSlotBa/PlistChonDongPoKeGo.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResSlotBa/PlistPoKeGo.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResSlotBa/ChonDong/Number/PlistChonDongPoKeGo.plist");
            this.createDraggableLayout();
            this.createLevelOneElement();
            this.createPnLine();
            this.createVisibleLine();
            this.createShowLine();
            this.createPvItem();
            this.createEffectEarnMoney();
            this.createPnChonDong();
            this.createPThangLon();
            this.createPnNoHuSlot();

            this.addMasterLayer(this._layout);
            this.addCustomEvent();



        },

        createDraggableLayout: function () {
            this.pnBackGround = this._layout = new ccui.Layout();
            this._layout.setContentSize(cc.size(440, 527));
            this.setPosition(cc.p(865.99, 169.43));
            this._layout.setAnchorPoint(1, 0);
            this.addChild(this._layout);
            return this._layout;
        },

        createLevelOneElement: function () {
            var layout = this._layout;

            this.addButtonStructure(layout, "btn_x2_hu", codeSlot3Hang.BTN_X2_HU, cc.p(-4.55, 416.36), true, this.resourcePath + "time_event.png");
            this.addTextStructure(layout, "lb_date_x2", cc.p(-4.55, 397.18), "123", fontRobotoBold.fontName, 16, "#FFFFFF");
            this.addSpriteStructure(layout, "background_image", cc.p(219.89, 185.45), "bground.png");
            this.addButtonStructure(layout, "btn_event", codeSlot3Hang.BTN_EVENT, cc.p(228.89, 382.29), true, this.resourcePath + "event_pokerGo.png", {anchorY: 0});
            this.addButtonStructure(layout, "btnChonDong", codeSlot3Hang.BTN_CHONDONGSLOT, cc.p(104.89, -12.55), true, [this.resourcePath + "btnChonDong.png", this.resourcePath + "btnChonDong_s.png"]);
            this.addTextStructure(layout, "txtchondong", cc.p(67.75, -8.61), this.lineSelected, fontRobotoMedium.fontName, 24, "#113287");
            this.addButtonStructure(layout, "btnTuQuay", codeSlot3Hang.BTN_TUQUAYSLOT, cc.p(347.15, -12.55), true, [this.resourcePath + "btn_tuquay.png", this.resourcePath + "btn_tuquay_s.png"]);
            this.addButtonStructure(layout, "btnQuay", codeSlot3Hang.BTN_STARTROTATE, cc.p(225.89, -12.55), true, [this.resourcePath + "btnQuay.png", this.resourcePath + "btnQuay_s.png"]);
            this.addTextStructure(layout, "txt_tuquay", cc.p(293.68, -9.45), "TỰ QUAY", fontRobotoBold.fontName, 22, "#9A4E10", {anchorX: 0});

            this.addButtonStructure(layout, "btnRoom1", codeSlot3Hang.BTN_SELECTROOMSLOT1, cc.p(0.89, 283.63), true, [this.commonImagePath + "room_select.png", this.commonImagePath + "room_select.png"], this.createButtonText("100"));
            this.addButtonStructure(layout, "btnRoom2", codeSlot3Hang.BTN_SELECTROOMSLOT2, cc.p(8.89, 185.05), true, [this.commonImagePath + "bg_room.png", this.commonImagePath + "bg_room.png"], this.createButtonText("1K"));
            this.addButtonStructure(layout, "btnRoom3", codeSlot3Hang.BTN_SELECTROOMSLOT3, cc.p(14.97, 84.14), true, [this.commonImagePath + "bg_room.png", this.commonImagePath + "bg_room.png"], this.createButtonText("10K"));
            this.addTextStructure(layout, "txtHuSlot", cc.p(250.97, 357.60), "9.000.000.000", fontRobotoBold.fontName, 34, "#FFFFFF");
            this.addButtonStructure(layout, "btnCloseSlot", codeSlot3Hang.BTN_CLOSEGAMESLOT3, cc.p(432.49, 358.74), true, this.commonImagePath + "btn_closegame.png");
            this.addButtonStructure(layout, "btn_changeMoney", codeSlot3Hang.BTN_CHANGEMONEYSLOT, cc.p(89.06, 358.07), true, [this.commonImagePath + "choivin.png", this.commonImagePath + "choixu.png"]);
            this.addButtonStructure(layout, "btnVinhDanhSlot", codeSlot3Hang.BTN_VINHDANHSLOT3, cc.p(437.50, 185.45), true, this.commonImagePath + "bangvinhdanh.png");
            this.addButtonStructure(layout, "btnInfo", codeSlot3Hang.BTN_INFOSLOT3, cc.p(434.71, 114.53), true, this.commonImagePath + "lsgd.png");
            this.addButtonStructure(layout, "btnHelp", codeSlot3Hang.BTN_HELPSLOT3, cc.p(440.75, 256.74), true, this.commonImagePath + "huongdan.png");

        },

        createPnLine: function () {
            this.addLayoutStructure(this._layout, "pnLine", cc.p(228.25, 180.53));
            var layout = this._layout.getChildByName("pnLine");
            layout.setContentSize(cc.size(10.00, 10.00));
            layout.setAnchorPoint(0, 0);
            for (var i = 0; i < 20; i++) {
                var name = i + 1;
                this.addSpriteStructure(layout, "line" + name, cc.p(0, 0), "LineAn/line" + name + ".png");
            }
        },

        createVisibleLine: function () {
            this.addLayoutStructure(this._layout, "pnVisibleLine", cc.p(123.92, 173.42));
            var layout = this._layout.getChildByName("pnVisibleLine");
            layout.setContentSize(cc.size(1.00, 1.00));
            layout.setAnchorPoint(0, 0);
            var x1 = -55.40;
            var x2 = 265.67;
            var position = [[x1, 135.14], [x1, 19.71], [x1, -95.76], [x2, 135.16], [x2, -95.95], [x1, 105.97], [x2, -66.77], [x2, 106.34], [x1, -38.06], [x2, -9.20],
                [x1, -67.05], [x1, 77.25], [x1, -8.92], [x1, 48.17], [x2, 48.10], [x2, 77.03], [x1, -125.03], [x2, -37.88], [x2, -125.12], [x2, 18.99]]
            for (var i = 0; i < 20; i++) {
                var name = i + 1;
                this.addSpriteStructure(layout, "vis_l" + name, cc.p.apply(this, position[i]), "VisibleLine/showline.png");
            }
        },

        createShowLine: function () {

            this.addLayoutStructure(this._layout, "pnShowLine", cc.p(123.92, 173.42));
            var layout = this._layout.getChildByName("pnShowLine");
            layout.setContentSize(cc.size(1.00, 1.00));
            layout.setAnchorPoint(0, 0);
            var x1 = -55.40;
            var x2 = 265.67;
            var position = [[x1, 135.14], [x1, 19.71], [x1, -95.76], [x2, 135.16], [x2, -95.95], [x1, 105.97], [x2, -66.77], [x2, 106.34], [x1, -38.06], [x2, -9.20],
                [x1, -67.05], [x1, 77.25], [x1, -8.92], [x1, 48.17], [x2, 48.10], [x2, 77.03], [x1, -125.03], [x2, -37.88], [x2, -125.12], [x2, 18.99]];

            for (var i = 0; i < 20; i++) {
                var name = i + 1;
                this.addSpriteStructure(layout, "showline" + name, cc.p.apply(this, position[i]), "VisibleLine/showline.png");
            }

            this.addLayoutStructure(layout, "onMouseVisible", cc.p("95.38", "11.67"));
            var onMouseVisible = layout.getChildByName("onMouseVisible");
            onMouseVisible.setContentSize(cc.size(1280.00, 720.00));


            for (var i = 0; i < 20; i++) {
                var name = i + 1;
                this.addTextStructure(layout, "txt" + name, cc.p.apply(this, position[i]), name, fontRobotoMedium.fontName, 19, "#FFFFFF");
            }
        },

        createPvItem: function () {
            var pvItem = new ccui.PageView();
            pvItem.setContentSize(cc.size(278.00, 273.00));
            pvItem.setAnchorPoint(1, 1);
            pvItem.setPosition(cc.p(368.09, 312.97));

            this.addChildAsProp(this._layout, pvItem, "pvItem");

            var pnelItem = this.addLayoutStructure(pvItem, "pnelItem", cc.p(0, 0));
            this.addLayoutStructure(pnelItem, "pnCol1", cc.p(15.62, -2.00), undefined, cc.size(10.00,10.00), true, {anchorX: 0, anchorY: 0});
            this.addLayoutStructure(pnelItem, "pnCol2", cc.p(109.12, -2.00), undefined, cc.size(10.00,10.00), true, {anchorX: 0, anchorY: 0});
            this.addLayoutStructure(pnelItem, "pnCol3", cc.p(202.12, -2.00), undefined, cc.size(10.00,10.00), true, {anchorX: 0, anchorY: 0});

            this.startPosYPnCol1 = this.pnCol1.getPosition().y;
            this.startPosYPnCol2 = this.pnCol2.getPosition().y;
            this.startPosYPnCol3 = this.pnCol3.getPosition().y;
        },

        createEffectEarnMoney: function () {
            this.addSpriteStructure(this._layout, "sp_effect_earn_money", cc.p(226.01, 174.53), "effect_money.png", {anchorX: 0.49, anchorY: 0.52});
            this.addTextStructure(this._layout, "txtMoneyEarn", cc.p(226.89, 174.45), "", fontRobotoBold.fontName, 40, "#FFFFFF");
        },

        createPnChonDong: function () {

            var layout = this.addLayoutStructure(this._layout, "pnChonDong", cc.p(-73.40, -108.32), "ChonDong/bgChonDong.png", cc.size(560, 465), false, {anchorX: 0, anchorY: 0, visible : false, scaleX : 0, scaleY : 0});

            this.addButtonStructure(layout, "btnCloseChonDong", codeSlot3Hang.BTN_CLOSECHONDONG, cc.p(529.65, 433.43), true, [this.resourcePath + "closeMinigame.png", this.resourcePath + "closeMinigame_s.png"]);

            this.addButtonStructure(layout, "btnDongLe", codeSlot3Hang.BTN_DONGLESLOT, cc.p(76.57, 29.18), true,
                [this.resourcePath + "ChonDong/btn_loaidong.png", this.resourcePath + "ChonDong/btn_loaidong_s.png"],this.createButtonText("DÒNG CHẴN", {titleFontSize : 22}));
            this.addButtonStructure(layout, "btnDongChan", codeSlot3Hang.BTN_DONGCHANSLOT, cc.p(212.58, 29.18), true,
                [this.resourcePath + "ChonDong/btn_loaidong.png", this.resourcePath + "ChonDong/btn_loaidong_s.png"],this.createButtonText("DÒNG CHẴN", {titleFontSize : 22}));
            this.addButtonStructure(layout, "btnTatCa", codeSlot3Hang.BTN_TATCASLOT, cc.p(348.56, 29.18), true,
                [this.resourcePath + "ChonDong/btn_loaidong.png", this.resourcePath + "ChonDong/btn_loaidong_s.png"],this.createButtonText("TẤT CẢ", {titleFontSize : 22}));
            this.addButtonStructure(layout, "btnChonLai", codeSlot3Hang.BTN_CHONLAISLOT, cc.p(484.52, 29.18), true,
                [this.resourcePath + "ChonDong/btn_loaidong.png", this.resourcePath + "ChonDong/btn_loaidong_s.png"],this.createButtonText("CHỌN LẠI", {titleFontSize : 22}));
        },

        createPThangLon: function () {
            var layout = this.addLayoutStructure(this._layout, "pThangLon", cc.p(23.00, -16.00), undefined, cc.size(400, 400), false, {anchorX: 0, anchorY: 0});

            this.addSpriteStructure(layout, "sp_sao_thang_lon", cc.p(200.00, 200.00), "Sao.png");
            this.addSpriteStructure(layout, "sp_glow_thang_lon", cc.p(200.00, 200.00), "Glow.png");
            this.addSpriteStructureWithoutResourcePath(layout, "sp_bg_thang_lon", cc.p(200.00, 76.33), this.commonImagePath + "bg_giaithuong.png");
            this.addTextStructure(layout, "lb_money_thang_lon", cc.p(200.00, 76.33), "",fontRobotoBold.fontName, 40, "#FFFFFF") ;
            this.addSpriteStructure(layout, "sp_pkc_thang_lon", cc.p(193.00, 280.00), "PKC.png");
            this.addSpriteStructure(layout, "sp_text_thang_lon", cc.p(204.67, 134.88), "Text_thanglon.png");
        },

        createPnNoHuSlot: function () {
            var layout = this.addLayoutStructure(this._layout, "pn_nohu_slot", cc.p(185.49, 177.37), undefined, cc.size(440.00, 447.00), false, {visible : false});

            this.addButtonStructure(layout, "btn_close_no_hu", codeSlot3Hang.BTN_CLOSE_EFFECT_HU, cc.p(0.00, 0.00), false, null);
            for(var i = 1; i<9; i++){
                var par = this.addSpriteStructure(layout, "par_" + i, cc.p(262.03, 237.73), "sao_vang.png");
                par.setScale(0);
            }
            this.addSpriteStructure(layout, "shadow", cc.p(260.64, 155.44), "SD.png", {scaleX : 0, scaleY : 0});
            var sp_item_thanglon = this.addSpriteStructure(layout, "sp_item_thanglon", cc.p(260.64, 185.44), "Ball/Poke_Ball_1.png");
            sp_item_thanglon.setScale(0);

            // var par = new cc.partical
            this.addSpriteStructure(layout, "star_1", cc.p(296.03, 246.73), "star_white.png", {scaleX : 0, scaleY : 0});
            this.addSpriteStructure(layout, "star_2", cc.p(202.27, 261.73), "star_white.png", {scaleX : 0, scaleY : 0});
            this.addSpriteStructure(layout, "star_3", cc.p(337.74, 246.54), "star_white.png", {scaleX : 0, scaleY : 0});

            var pn_bangthuong = this.addLayoutStructure(layout, "pn_bangthuong", cc.p(258.98, 205.06), undefined, cc.size(0, 0), false, {anchorX: 0,
                anchorY: 0,
                scaleX: 0,
                scaleY: 0
            });

            var fadeou1 = cc.fadeOut(0);
            pn_bangthuong.runAction(fadeou1);

            this.addSpriteStructureWithoutResourcePath(pn_bangthuong, "bg_bangthuong", cc.p(6.82, -96.24), this.commonImagePath + "bg_giaithuong.png");
            this.addSpriteStructure(pn_bangthuong, "sp_nohu", cc.p(3.82, -22.76),"text_nohu.png");
            this.addTextStructure(pn_bangthuong, "txt_money_hu", cc.p(6.82, -96.24),  "100",fontRobotoBold.fontName, 36, "#FFFFFF") ;
        },

        addCustomEvent : function () {
            var slot3hang = this;
            var ShowLineSelect = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (slot3hang.isSelectline == false) {
                                if (slot3hang.pnShowLine.getChildByName(target.getName()) != null) {
                                    slot3hang.resetshowline();
                                    slot3hang.resetLineWin();
                                    var showline = slot3hang.pnShowLine.getChildByName(target.getName());
                                    var str = target.getName();
                                    if (slot3hang.pnLine.getChildByName("line" + str.substr(8, str.length - 8)) != null)
                                        var line = slot3hang.pnLine.getChildByName("line" + str.substr(8, str.length - 8));
                                    showline.setVisible(true);
                                    line.setVisible(true);
                                    slot3hang.moveOnLine = true;
                                }
                            }
                        }
                    }
                });
            var VisibleLineSelect = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        //Check the click area
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (slot3hang.isSelectline == false) {
                                if (slot3hang.moveOnLine == true) {
                                    slot3hang.moveOnLine = false;
                                    slot3hang.resetshowline();
                                    slot3hang.resetLineWin();
                                }
                            }
                        }
                    }
                });

            for (var i = 1; i <= 20; i++) {
                if (this.pnShowLine.getChildByName("showline" + i) != null) {
                    if (i == 1)
                        cc.eventManager.addListener(ShowLineSelect, this.pnShowLine.getChildByName("showline" + i));
                    else
                        cc.eventManager.addListener(ShowLineSelect.clone(), this.pnShowLine.getChildByName("showline" + i));
                }
            }
            cc.eventManager.addListener(VisibleLineSelect, this.onMouseVisible);
            if (!cc.sys.isNative) {
                this.pnBackGround.setScale(0.7);
            }

            this.running1 = true;
            this.resetLineWin();
            this.resetVisibleLine();
            this.resetshowline();
            this.vis_l1.setVisible(true);
            this.sp_effect_earn_money.setVisible(false);
            this.insertItem(1, this.config_item, this.posY);
            this.initChoiceLine();

            //this.show_nohu(100);
            this.stopRunThangLon();
            //this.showThangLon(10000000);
        },

        showThangLon: function (prize) {
            this.pThangLon.setVisible(true);
            var scaleSao = cc.scaleTo(0.2, 1);
            var scaleGaw = cc.scaleTo(0.2, 1);
            var scalePKC = cc.scaleTo(0.2, 1);
            var scaleText = cc.scaleTo(0.2, 1);
            var nhayPKC = cc.repeatForever(cc.sequence(cc.moveTo(0.25, cc.p(193, 280 + 10)), cc.moveTo(0.25, cc.p(193, 280))));
            var repeatScaleText = cc.repeatForever(cc.sequence(cc.scaleTo(0.25, 1.05), cc.scaleTo(0.25, 1)));
            if (this.moneyType == MONEY_VIN) {
                this.lb_money_thang_lon.setColor(colorMoneyVin);
            } else {
                this.lb_money_thang_lon.setColor(cc.color.WHITE);
            }
            this.lb_money_thang_lon.setString(formatMoney(0, 3, prize));
            // this.pThangLon.runAction(cc.callFunc(function(){
            //slot3hang.sp_bg_thang_lon.setVisible()
            slot3hang.sp_sao_thang_lon.runAction(cc.sequence(scaleSao, cc.callFunc(function () {
                slot3hang.sp_glow_thang_lon.runAction(cc.sequence(scaleGaw, cc.callFunc(function () {
                    slot3hang.sp_pkc_thang_lon.runAction(cc.sequence(scalePKC, cc.callFunc(function () {
                        slot3hang.sp_pkc_thang_lon.runAction(nhayPKC);
                    })));
                    slot3hang.sp_text_thang_lon.runAction(cc.sequence(scaleText, cc.callFunc(function () {
                        slot3hang.sp_text_thang_lon.runAction(repeatScaleText);
                        slot3hang.pThangLon.runAction(cc.delayTime(2), cc.callFunc(slot3hang.hideThangLon, this));
                    })));

                })));
                slot3hang.sp_bg_thang_lon.setVisible(true);
                slot3hang.lb_money_thang_lon.setVisible(true);
            })));

            // }));

        },

        hideThangLon: function () {
            this.sp_bg_thang_lon.setVisible(false);
            this.lb_money_thang_lon.setVisible(false);
            this.sp_text_thang_lon.stopAllActions();
            this.sp_text_thang_lon.setScale(0);
            this.sp_pkc_thang_lon.stopAllActions();
            this.sp_pkc_thang_lon.setPosition(cc.p(193, 280));
            this.sp_pkc_thang_lon.setScale(0);
            this.sp_glow_thang_lon.stopAllActions();
            this.sp_glow_thang_lon.setScale(0);
            this.sp_sao_thang_lon.stopAllActions();
            this.sp_sao_thang_lon.setScale(0);
            this.pThangLon.stopAllActions();
            this.pThangLon.setVisible(false);
            this.runEffectLineWin();
        },
        stopRunThangLon: function () {
            this.sp_bg_thang_lon.setVisible(false);
            this.lb_money_thang_lon.setVisible(false);
            this.sp_text_thang_lon.stopAllActions();
            this.sp_text_thang_lon.setScale(0);
            this.sp_pkc_thang_lon.stopAllActions();
            this.sp_pkc_thang_lon.setPosition(cc.p(193, 280));
            this.sp_pkc_thang_lon.setScale(0);
            this.sp_glow_thang_lon.stopAllActions();
            this.sp_glow_thang_lon.setScale(0);
            this.sp_sao_thang_lon.stopAllActions();
            this.sp_sao_thang_lon.setScale(0);
            this.pThangLon.stopAllActions();
            this.pThangLon.setVisible(false);
        },

        onButtonRelease: function (button, id) {

            switch (id) {
                case codeSlot3Hang.BTN_EVENT:
                    open_minislot_x2();
                    break;
                case codeSlot3Hang.BTN_X2_HU:
                    open_minislot_x2();
                    break;
                case codeSlot3Hang.BTN_CLOSEGAMESLOT3:
                    closeslot3hang();
                    break;
                case codeSlot3Hang.BTN_STARTROTATE:

                    if (this.checkAction()) {
                        if (this.lineSelected == 0) {
                            this.toastSlot("Bạn chưa chọn dòng", 3);
                        } else {
                            var lineSelect = this.getStrLineSelect();

                            this.play(this.betValue, lineSelect);
                        }

                    }

                    break;
                case codeSlot3Hang.BTN_CHANGEMONEYSLOT:
                    if (this.checkAction()) {

                        if (this.moneyType == MONEY_VIN) {
                            this.changeRoom(this.currentRoom, 3);
                            this.currentRoom = 3;
                            this.btn_changeMoney.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                            this.moneyType = MONEY_XU;
                        } else {
                            this.changeRoom(this.currentRoom, 0);
                            this.currentRoom = 0;
                            this.btn_changeMoney.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                            this.moneyType = MONEY_VIN;
                        }
                        this.betValue = this.betValueRoom["betRoom" + this.currentRoom];
                        //cc.log("betvalue = " + this.betValue);
                        this.loadBtnRoom();
                        this.waitingChangeRoom();
                    }
                    break;
                case codeSlot3Hang.BTN_SELECTROOMSLOT1:
                    if (this.checkAction()) {
                        if (this.currentRoom != 0 && this.currentRoom != 3) {
                            var roomJoin = 0;
                            if (this.moneyType == MONEY_VIN) {
                                roomJoin = 0;
                            } else {
                                roomJoin = 3;
                            }
                            this.changeRoom(this.currentRoom, roomJoin);
                            this.betValue = this.betValueRoom["betRoom" + roomJoin];
                            //cc.log("betvalue = " + this.betValue);
                            this.currentRoom = roomJoin;
                            this.loadBtnRoom();
                            this.waitingChangeRoom();
                        }

                    }
                    break;
                case codeSlot3Hang.BTN_SELECTROOMSLOT2:
                    if (this.checkAction()) {
                        if (this.currentRoom != 1 && this.currentRoom != 4) {
                            var roomJoin = 1;
                            if (this.moneyType == MONEY_VIN) {
                                roomJoin = 1;
                            } else {
                                roomJoin = 4;
                            }
                            this.changeRoom(this.currentRoom, roomJoin);
                            this.betValue = this.betValueRoom["betRoom" + roomJoin];
                            this.currentRoom = roomJoin;
                            this.loadBtnRoom();
                            this.waitingChangeRoom();
                        }
                    }
                    break;
                case codeSlot3Hang.BTN_SELECTROOMSLOT3:
                    if (this.checkAction()) {
                        if (this.currentRoom != 2 && this.currentRoom != 5) {
                            var roomJoin = 2;
                            if (this.moneyType == MONEY_VIN) {
                                roomJoin = 2;
                            } else {
                                roomJoin = 5;
                            }
                            this.changeRoom(this.currentRoom, roomJoin);
                            this.betValue = this.betValueRoom["betRoom" + roomJoin];
                            this.currentRoom = roomJoin;
                            this.loadBtnRoom();
                            this.waitingChangeRoom();
                        }
                    }
                    break;
                case codeSlot3Hang.BTN_CHONDONGSLOT:
                    if (this.checkAction()) {
                        slot3hang.pnChonDong.setVisible(true);
                        slot3hang.pnChonDong.runAction(cc.scaleTo(0.2, 1));
                        slot3hang.isSelectline = true;
                    }

                    break;
                case codeSlot3Hang.BTN_CLOSECHONDONG:

                    slot3hang.pnChonDong.runAction(cc.sequence(cc.scaleTo(0.2, 0), cc.delayTime(1.4), cc.callFunc(this.setMoveOn, this)));
                    //this.sendValueLine();
                    break;
                case codeSlot3Hang.BTN_TUQUAYSLOT:

                    if (this.isChangeRoom) {
                        this.toastSlot("Bạn đang chuyển room, vui lòng chờ", 3);
                        //return false;
                    } else if (this.lineSelected == 0) {
                        this.toastSlot("Bạn chưa chọn dòng", 3);
                    }
                    else if (this.autoRotateSlot == false) {
                        if (this.isStartRotate == false) {
                            this.autoPlay(this.getStrLineSelect());
                            this.autoRotateSlot = true;
                            //this.closeMoneyFly();
                            // slot3hang.funautoRotateSlot();
                            slot3hang.txt_tuquay.setString("DỪNG");
                        }
                    } else {
                        this.stopAutoPlay();
                        this.autoRotateSlot = false;
                        //slot3hang.stopAction(slot3hang.actionAutoSlot);
                        this.txt_tuquay.setString("TỰ QUAY");
                    }
                    break;
                case codeSlot3Hang.BTN_DONGLESLOT:
                    this.selectLineLe();
                    break;
                case codeSlot3Hang.BTN_DONGCHANSLOT:
                    this.selectLineChan();
                    break;
                case codeSlot3Hang.BTN_TATCASLOT:
                    this.selectLineLTatCa();
                    break;
                case codeSlot3Hang.BTN_CHONLAISLOT:
                    this.unSelectLineLTatCa();
                    //this.reset_all_select_line();
                    break;
                case codeSlot3Hang.BTN_HELPSLOT3:
                    open_minislot_guild();
                    break;
                case codeSlot3Hang.BTN_VINHDANHSLOT3:
                    open_minislot_bangthanhtich();
                    break;
                case codeSlot3Hang.BTN_INFOSLOT3:
                    open_minislot_lichsu();
                    break;
                case codeSlot3Hang.BTN_CLOSE_EFFECT_HU:
                    this.closeEffectNoHu();
                    break;
            }
        },
        checkAction: function () {
            if (this.isChangeRoom) {
                this.toastSlot("Bạn đang chuyển room, vui lòng chờ", 3);
                return false;
            }
            if (this.autoRotateSlot) {
                this.toastSlot("Bạn đang quay tự động", 3);
                return false;
            }
            if (this.isStartRotate) {
                this.toastSlot("Bạn đang quay, vui lòng chờ quay xong", 3);
                return false;
            }
            return true;
        },
        initChoiceLine: function () {
            var deltaX = 106;
            var deltaY = 82;
            var positionStart = cc.p(67, 357);
            for (var i = 0; i < 20; i++) {
                var obj = {
                    isSelect: false,
                    btn: null
                };
                var btnChoiceLine = new ccui.Button();
                if (i == 0) {
                    obj.isSelect = true;
                    //obj.btn = btnChoiceLine;
                    btnChoiceLine.loadTextures("res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + ".png", "res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + "_1.png", "res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + "_1.png",  ccui.Widget.PLIST_TEXTURE);
                } else {
                    obj.isSelect = false;
                    btnChoiceLine.loadTextures("res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + "_1.png", "res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + "_1.png", "res/Minigame/ResSlotBa/ChonDong/Number/" + (i + 1) + "_1.png",  ccui.Widget.PLIST_TEXTURE)
                }
                btnChoiceLine.setPosition(cc.p(positionStart.x + deltaX * (i % 5), positionStart.y - deltaY * Math.floor(i / 5)));
                btnChoiceLine.setTag(i);
                btnChoiceLine.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            slot3hang.selectLine(sender.getTag());
                            break;
                    }

                }, this);
                obj.btn = btnChoiceLine;

                this.arrBtnChoiLine.push(obj);
                this.pnChonDong.addChild(btnChoiceLine);
            }
        },
        btnSelectLine: function (index, selected) {
            if (selected == true) {
                this.arrBtnChoiLine[index].isSelect = true;
                this.arrBtnChoiLine[index].btn.loadTextureNormal("res/Minigame/ResSlotBa/ChonDong/Number/" + (index + 1) + ".png",ccui.Widget.PLIST_TEXTURE);
                this["line" + (index + 1)].setVisible(true);
                this["vis_l" + (index + 1)].setVisible(true)
            } else {
                this.arrBtnChoiLine[index].isSelect = false;
                //this.lineSelected--;
                this.arrBtnChoiLine[index].btn.loadTextureNormal("res/Minigame/ResSlotBa/ChonDong/Number/" + (index + 1) + "_1.png", ccui.Widget.PLIST_TEXTURE);
                this["line" + (index + 1)].setVisible(false);
                this["vis_l" + (index + 1)].setVisible(false)
            }
            //this.txtchondong.setString(this.lineSelected);
        },
        selectLine: function (index) {
            if (this.arrBtnChoiLine[index].isSelect) {
                this.btnSelectLine(index, false);
                this.lineSelected--;

            }
            else {
                this.btnSelectLine(index, true);
                this.lineSelected++;
            }
            this.txtchondong.setString(this.lineSelected);
        },
        selectLineChan: function () {
            for (var i = 0; i < 20; i++) {
                if (i % 2 == 1) {
                    this.btnSelectLine(i, true);
                } else {
                    this.btnSelectLine(i, false);
                }
            }
            this.lineSelected = 10;
            this.txtchondong.setString(this.lineSelected);
        },
        selectLineLe: function () {
            for (var i = 0; i < 20; i++) {
                if (i % 2 == 0) {
                    this.btnSelectLine(i, true);
                } else {
                    this.btnSelectLine(i, false);
                }
            }
            this.lineSelected = 10;
            this.txtchondong.setString(this.lineSelected);
        },
        selectLineLTatCa: function () {
            for (var i = 0; i < 20; i++) {
                this.btnSelectLine(i, true);
            }
            this.lineSelected = 20;
            this.txtchondong.setString(this.lineSelected);
        },
        unSelectLineLTatCa: function () {
            for (var i = 0; i < 20; i++) {
                this.btnSelectLine(i, false);
            }
            this.lineSelected = 0;
            this.txtchondong.setString(this.lineSelected);
        },

        updatePot: function (pot, x2) {
            var breakValue = 0;//parseInt((pot - this.valueHuSlot)/999);
            if (Math.abs(pot - this.valueHuSlot) <= 100 && Math.abs(pot - this.valueHuSlot) > 0) {
                breakValue = 1;
            }
            else

                breakValue = parseInt((pot - this.valueHuSlot) / 50) + 1;
            effectRunMoney(this.txtHuSlot, this.valueHuSlot, pot, breakValue, true);

            if (x2 == 0) {
                if (this.isX2) {
                    this.isX2 = false;
                    this.btn_event.stopAllActions();
                    this.btn_event.setScale(1);
                }
            } else {
                if (this.isX2 == false) {
                    this.isX2 = true;
                    this.btn_event.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.3, 1))));
                }
            }

            this.valueHuSlot = pot;
            if (this.isChangeRoom || this.isSubcribe) {
                this.doneChangeRoom();
                this.resetLineWin();
                this.stopAllActions();
                this.nextline = 0;
                this.linewin = null;
                this.closeMoneyFly();
                this.stopRunThangLon();
                //this.closeEffectNoHu();
                this.sp_effect_earn_money.stopAllActions();
                this.pnCol1.stopAllActions();
                this.pnCol2.stopAllActions();
                this.pnCol3.stopAllActions();
                //startPosYPnCol1
                this.pnCol1.setPosition(cc.p(this.pnCol1.getPosition().x, this.startPosYPnCol1));
                this.pnCol2.setPosition(cc.p(this.pnCol2.getPosition().x, this.startPosYPnCol2));
                this.pnCol3.setPosition(cc.p(this.pnCol3.getPosition().x, this.startPosYPnCol3));
                for (var i = 1; i < this.config_item; i++) {
                    this.pnCol1.getChildByName("item1_" + i).stopAllActions();
                    this.pnCol2.getChildByName("item2_" + i).stopAllActions();
                    this.pnCol3.getChildByName("item3_" + i).stopAllActions();
                }
                if (this.moneyType == MONEY_VIN) {
                    this.txtHuSlot.setColor(colorCell1);
                } else {
                    this.txtHuSlot.setColor(cc.color.WHITE);
                }
                this.isSubcribe = false;
            }
            //this.show_nohu(100);

        },
        updateResult: function (result, matrix, linesWin, prize, currentMoney) {
            //cc.log(matrix);


            this.matrix = matrix.split(",");

            this.linesWin = linesWin.split(",");
            this.prize = prize;
            this.result = result;

            if (slot3hangAppear) {
                this.resetLineWin();
                this.stopAllActions();
                this.nextline = 0;
                this.linewin = null;
                this.closeMoneyFly();
                this.stopRunThangLon();
                //this.closeEffectNoHu();
                this.sp_effect_earn_money.stopAllActions();
                this.pnCol1.stopAllActions();
                this.pnCol2.stopAllActions();
                this.pnCol3.stopAllActions();
                //startPosYPnCol1
                this.pnCol1.setPosition(cc.p(this.pnCol1.getPosition().x, this.startPosYPnCol1));
                this.pnCol2.setPosition(cc.p(this.pnCol2.getPosition().x, this.startPosYPnCol2));
                this.pnCol3.setPosition(cc.p(this.pnCol3.getPosition().x, this.startPosYPnCol3));
                for (var i = 1; i < this.config_item; i++) {
                    this.pnCol1.getChildByName("item1_" + i).stopAllActions();
                    this.pnCol2.getChildByName("item2_" + i).stopAllActions();
                    this.pnCol3.getChildByName("item3_" + i).stopAllActions();
                }
                //this.resetPositionItem();
                if (this.isStartRotate == true) {
                    this.logvitri();
                    this.spinColum();
                } else {
                    this.spinColum();
                }

            }
            this.runAction(cc.sequence(cc.callFunc(function () {
                var moneyUpdate = 0;
                if (slot3hang.moneyType == MONEY_VIN) {
                    //this.userInfo.vinTotal = currentMoney;
                    moneyUpdate = lobby.userInfo.vinTotal - (slot3hang.lineSelected * slot3hang.betValue);

                } else {
                    moneyUpdate = lobby.userInfo.xuTotal - (slot3hang.lineSelected * slot3hang.betValue);
                    //this.userInfo.xuTotal = currentMoney;
                }
                if (moneyUpdate >= 0) {
                    lobby.updateMoney(moneyUpdate, slot3hang.moneyType);
                }
            }), cc.delayTime(4), cc.callFunc(function () {
                lobby.updateMoney(currentMoney, slot3hang.moneyType);
            }, this)));
        },
        forceStopAuto: function () {
            //this.isAuto
            slot3hang.autoRotateSlot = false;
            slot3hang.txt_tuquay.setString("TỰ QUAY");


        },
        setDateX2: function (date) {
            if (date == "") {
                //this.btn_x2_hu.loadTextures("res/Minigame/ResSlotBa/event_x2.png","res/Minigame/ResSlotBa/event_x2.png","res/Minigame/ResSlotBa/event_x2.png");
                this.btn_x2_hu.setVisible(false);

            } else {
                //this.btn_x2_hu.loadTextures("res/Minigame/ResSlotBa/time_event.png","res/Minigame/ResSlotBa/time_event.png","res/Minigame/ResSlotBa/time_event.png");
                this.btn_x2_hu.setVisible(true);
            }
            this.lb_date_x2.setString(date);
        },
        loadBtnRoom: function () {

            if (this.currentRoom < 3) {
                this.btnRoom1.setTitleText(formatMoneyStr(this.betValueRoom.betRoom0));
                this.btnRoom2.setTitleText(formatMoneyStr(this.betValueRoom.betRoom1));
                this.btnRoom3.setTitleText(formatMoneyStr(this.betValueRoom.betRoom2));
            } else {
                this.btnRoom1.setTitleText(formatMoneyStr(this.betValueRoom.betRoom3));
                this.btnRoom2.setTitleText(formatMoneyStr(this.betValueRoom.betRoom4));
                this.btnRoom3.setTitleText(formatMoneyStr(this.betValueRoom.betRoom5));
            }
            if (this.currentRoom == 0 || this.currentRoom == 3) {
                this.btnRoom1.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                this.btnRoom2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                this.btnRoom3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");

            } else if (this.currentRoom == 1 || this.currentRoom == 4) {
                this.btnRoom1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                this.btnRoom2.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                this.btnRoom3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");

            } else if (this.currentRoom == 2 || this.currentRoom == 5) {
                this.btnRoom1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                this.btnRoom2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                this.btnRoom3.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
            }
        },
        waitingChangeRoom: function () {
            this.isChangeRoom = true;
            this.btnRoom1.setEnabled(false);
            this.btnRoom2.setEnabled(false);
            this.btnRoom3.setEnabled(false);

        },
        doneChangeRoom: function () {
            this.isChangeRoom = false;
            this.btnRoom1.setEnabled(true);
            this.btnRoom2.setEnabled(true);
            this.btnRoom3.setEnabled(true);
        },


        show_nohu: function (money) {
            if (this.result == 3) {
                this.sp_nohu.setSpriteFrame("res/Minigame/ResSlotBa/text_nohu.png");
            } else {
                this.sp_nohu.setSpriteFrame("res/Minigame/ResSlotBa/text_nohux2.png");
            }

            this.pn_nohu_slot.setVisible(true);
            this.sp_item_thanglon.setVisible(true);
            if (this.moneyType == MONEY_VIN) {
                this.txt_money_hu.setColor(colorMoneyVin);
            }
            else {
                this.txt_money_hu.setColor(cc.color.WHITE);
            }
            this.txt_money_hu.setString(formatMoney(0, 3, money));
            this.sp_effect_earn_money.setVisible(true);
            var seq1 = cc.sequence(cc.scaleTo(0.2, 0.4), cc.scaleTo(0.2, 0), cc.scaleTo(0.2, 0.5), cc.scaleTo(0.2, 0), cc.delayTime(0.6), cc.scaleTo(0.2, 1.2), cc.scaleTo(0.2, 1),
                cc.callFunc(function () {
                    slot3hang.shadow.runAction(cc.scaleTo(0.2, 1));
                }));
            var move1 = cc.MoveTo.create(0.2, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y + 10));
            var move2 = cc.MoveTo.create(0.1, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y - 10));
            var move3 = cc.MoveTo.create(0.2, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y + 5));
            var move4 = cc.MoveTo.create(0.1, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y - 5));
            var move5 = cc.MoveTo.create(0.2, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y + 2));
            var move6 = cc.MoveTo.create(0.1, cc.p(this.sp_item_thanglon.x, this.sp_item_thanglon.y - 2));
            var seq2 = cc.sequence(move1, move2, move3, move4, move5, move6);

            var R1 = new cc.RotateBy(0.1, 15);
            var R2 = new cc.RotateBy(0.1, -30);
            var R3 = new cc.RotateBy(0.1, 25);
            var R4 = new cc.RotateBy(0.1, -20);
            var R5 = new cc.RotateBy(0.1, 15);
            var R6 = new cc.RotateBy(0.1, -10);
            var R7 = new cc.RotateBy(0.1, 5);

            var Rotate = cc.sequence(R1, R2, R3, R4, R5, R6, R7);
            var noHuAnimation = actionMoHu();
            var seq3 = cc.sequence(seq1, seq2, Rotate, cc.delayTime(0.6), Rotate, cc.delayTime(0.4), Rotate, cc.callFunc(function () {
                // slot3hang.par_nohu.resetSystem();
                var rotateByVT = new cc.RotateBy(5, 360);
                slot3hang.sp_effect_earn_money.runAction(cc.repeatForever(rotateByVT));
            }), cc.delayTime(0.1), noHuAnimation, cc.callFunc(function () {
                var fadein = cc.fadeIn(0.3);
                var spawn = cc.spawn(fadein, cc.scaleTo(0.3, 0.2));
                slot3hang.pn_bangthuong.runAction(cc.sequence(spawn, cc.callFunc(function () {
                    var Ro = new cc.RotateBy(0.5, 360);
                    slot3hang.sp_nohu.runAction(Ro)
                }), cc.callFunc(function () {
                    slot3hang.pn_bangthuong.runAction(cc.sequence(cc.scaleTo(0.2, 1), cc.callFunc(function () {
                        slot3hang.sp_nohu.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.4, 0.95), cc.scaleTo(0.4, 1.05))));
                    })));
                })));
            }), cc.callFunc(function () {
                slot3hang.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
                    if (slot3hang.pn_nohu_slot.getChildByName("par_" + slot3hang.selectPar) != null) {
                        var par = slot3hang.pn_nohu_slot.getChildByName("par_" + slot3hang.selectPar);
                        slot3hang.randomPos(parseInt(slot3hang.savePos_pn_bangthuongX - 150), parseInt(slot3hang.savePos_pn_bangthuongX + 150));
                        par.x = slot3hang.ranPos;
                        slot3hang.randomPos(parseInt(slot3hang.savePos_pn_bangthuongY - 150), parseInt(slot3hang.savePos_pn_bangthuongY + 150));
                        par.y = slot3hang.ranPos;
                        var fadein = cc.fadeIn(0.3);
                        var fadeout = cc.fadeOut(0.3);
                        par.runAction(cc.sequence(cc.spawn(fadein, cc.scaleTo(0.3, 1)), cc.delayTime(0.3), cc.spawn(fadeout, cc.scaleTo(0.3, 0))));
                        slot3hang.selectPar = slot3hang.selectPar + 1;
                        if (slot3hang.selectPar > 8)
                            slot3hang.selectPar = 1;
                    }
                }))));
                slot3hang.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function () {
                    slot3hang.btn_close_no_hu.setEnabled(true);
                })));
            }), cc.callFunc(function () {
                var rotateStar1 = new cc.RotateBy(10, -360);
                var rotateStar2 = new cc.RotateBy(10, 360);
                var rotateStar3 = new cc.RotateBy(10, 360);

                var ro_st_1 = cc.repeatForever(rotateStar1);
                var ro_st_2 = cc.repeatForever(rotateStar2);
                var ro_st_3 = cc.repeatForever(rotateStar3);

                slot3hang.star_1.runAction(ro_st_1);
                slot3hang.star_1.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1), cc.scaleTo(0.3, 0.9))));
                slot3hang.star_2.runAction(ro_st_2);
                slot3hang.star_2.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.8), cc.scaleTo(0.3, 0.7))));
                slot3hang.star_3.runAction(ro_st_3);
                slot3hang.star_3.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 0.6), cc.scaleTo(0.3, 0.5))));
            }));
            this.sp_item_thanglon.runAction(seq3);
        },

        randomPosXY: function (minX, maxX, minY, maxY) {
            this.panX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            this.panY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        },
        randomPos: function (min, max) {
            this.ranPos = Math.floor(Math.random() * (max - min + 1)) + min;
        },

        closeEffectNoHu: function () {
            this.stopAllActions();
            this.pn_nohu_slot.setVisible(false);
            this.btn_close_no_hu.setEnabled(false);
            this.sp_effect_earn_money.stopAllActions();
            this.sp_effect_earn_money.setVisible(false);
            for (var i = 1; i < 9; i++) {
                if (this.pn_nohu_slot.getChildByName("par_" + i) != null) {
                    var par = this.pn_nohu_slot.getChildByName("par_" + i);
                    par.stopAllActions();
                    var fadeout = cc.fadeOut(0);
                    par.setScale(0);
                }
            }
            this.pn_bangthuong.stopAllActions();
            var fadeou1 = cc.fadeOut(0);
            this.pn_bangthuong.runAction(fadeou1);
            this.pn_bangthuong.setScale(0);
            this.sp_item_thanglon.setVisible(false);
            this.sp_item_thanglon.setSpriteFrame("res/Minigame/ResSlotBa/Ball/Poke_Ball_1.png");
        },

        set_stop_autoRotate: function () {
            slot3hang.txt_tuquay.setString("TỰ QUAY");
            slot3hang.autoRotateSlot = false;
            slot3hang.isStartRotate = false;
            slot3hang.btnChonDong.setEnabled(true);
            slot3hang.btn_changeMoney.setEnabled(true);
            slot3hang.btnQuay.setEnabled(true);
            if (this.CURRENT_ROOM_MINI_SLOT == 0 || this.CURRENT_ROOM_MINI_SLOT == 3) {
                this.btnRoom1.setEnabled(false);
                this.btnRoom2.setEnabled(true);
                this.btnRoom3.setEnabled(true);
            } else if (this.CURRENT_ROOM_MINI_SLOT == 1 || this.CURRENT_ROOM_MINI_SLOT == 4) {
                this.btnRoom1.setEnabled(true);
                this.btnRoom2.setEnabled(false);
                this.btnRoom3.setEnabled(true);
            } else {
                this.btnRoom1.setEnabled(true);
                this.btnRoom2.setEnabled(true);
                this.btnRoom3.setEnabled(false);
            }
        },

        setMoveOn: function () {
            slot3hang.isSelectline = false;
        },

        waitEffectAfterRotate: function () {
            slot3hang.isSelectline = true;
            this.runAction(cc.sequence(cc.delayTime(1.4), cc.callFunc(this.setMoveOn, this)));
        },

        reset_all_select_line: function () {
            slot3hang.running1 = false;
            slot3hang.running3 = false;
            slot3hang.running5 = false;
            slot3hang.running7 = false;
            slot3hang.running9 = false;
            slot3hang.running11 = false;
            slot3hang.running13 = false;
            slot3hang.running15 = false;
            slot3hang.running17 = false;
            slot3hang.running19 = false;
            slot3hang.spline1.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/1_1.png"));
            slot3hang.spline3.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/3_1.png"));
            slot3hang.spline5.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/5_1.png"));
            slot3hang.spline7.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/7_1.png"));
            slot3hang.spline9.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/9_1.png"));
            slot3hang.spline11.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/11_1.png"));
            slot3hang.spline13.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/13_1.png"));
            slot3hang.spline15.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/15_1.png"));
            slot3hang.spline17.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/17_1.png"));
            slot3hang.spline19.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/19_1.png"));

            slot3hang.running2 = false;
            slot3hang.running4 = false;
            slot3hang.running6 = false;
            slot3hang.running8 = false;
            slot3hang.running10 = false;
            slot3hang.running12 = false;
            slot3hang.running14 = false;
            slot3hang.running16 = false;
            slot3hang.running18 = false;
            slot3hang.running20 = false;
            slot3hang.spline2.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/2_1.png"));
            slot3hang.spline4.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/4_1.png"));
            slot3hang.spline6.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/6_1.png"));
            slot3hang.spline8.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/8_1.png"));
            slot3hang.spline10.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/10_1.png"));
            slot3hang.spline12.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/12_1.png"));
            slot3hang.spline14.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/14_1.png"));
            slot3hang.spline16.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/16_1.png"));
            slot3hang.spline18.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/18_1.png"));
            slot3hang.spline20.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("Minigame/ResSlotBa/ChonDong/Number/20_1.png"));
        },

        insertItem: function (from, value, posY) {
            for (var i = from; i < value; i++) {
                //cc.log("i = " + i + " value = "+ value + "posy = "+ posY);
                if (this.pnCol1.getChildByName("item1_" + i) == null) {
                    this.getRandomInt(0, 5);
                    var item1 = new cc.Sprite("#res/Minigame/ResSlotBa/" + this.linkImageItem, cc.rect(0, 0, 77, 77));
                    this.pnCol1.addChild(item1);
                    item1.setName("item1_" + i);
                    item1.x = this.posX;
                    item1.y = posY;
                } else {
                    var item1 = this.pnCol1.getChildByName("item1_" + i);
                    this.getRandomInt(0, 5);
                    item1.y = posY;
                    item1.setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                }

                if (this.pnCol2.getChildByName("item2_" + i) == null) {
                    this.getRandomInt(0, 5);
                    var item2 = new cc.Sprite("#res/Minigame/ResSlotBa/" + this.linkImageItem, cc.rect(0, 0, 77, 77));
                    this.pnCol2.addChild(item2);
                    item2.setName("item2_" + i);
                    item2.x = this.posX;
                    item2.y = posY;
                } else {
                    var item2 = this.pnCol2.getChildByName("item2_" + i);
                    this.getRandomInt(0, 5);
                    item2.y = posY;
                    item2.setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                }

                if (this.pnCol3.getChildByName("item3_" + i) == null) {
                    this.getRandomInt(0, 5);
                    var item3 = new cc.Sprite("#res/Minigame/ResSlotBa/" + this.linkImageItem, cc.rect(0, 0, 77, 77));
                    this.pnCol3.addChild(item3);
                    item3.setName("item3_" + i);
                    item3.x = this.posX;
                    item3.y = posY;
                    posY = posY + 93;
                } else {
                    var item3 = this.pnCol3.getChildByName("item3_" + i);
                    this.getRandomInt(0, 5);
                    item3.y = posY;
                    item3.setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    posY = posY + 93;
                }
            }
        },

        resetPositionItem: function () {
            var from = 1;
            var value = this.config_item;
            var posY = this.posY;
            for (var i = 1; i < value; i++) {
                //cc.log("i = " + i + " value = "+ value + "posy = "+ posY);
                if (i >= 19 && this.vlColum1 == false) {
                    var item1 = this.pnCol1.getChildByName("item1_" + i);
                    item1.y = posY - 93 * (value - i);

                    var item2 = this.pnCol2.getChildByName("item2_" + i);
                    item2.y = posY - 93 * (value - i);

                    var item3 = this.pnCol3.getChildByName("item3_" + i);
                    item3.y = posY - 93 * (value - i);
                } else if (i < 4 && this.vlColum1 == false) {
                    var item1 = this.pnCol1.getChildByName("item1_" + i);
                    item1.y = posY - 93 * (value - i);

                    var item2 = this.pnCol2.getChildByName("item2_" + i);
                    item2.y = posY - 93 * (value - i);
                    var item3 = this.pnCol3.getChildByName("item3_" + i);
                    item3.y = posY - 93 * (value - i);

                } else {
                    var item1 = this.pnCol1.getChildByName("item1_" + i);
                    item1.y = posY;

                    var item2 = this.pnCol2.getChildByName("item2_" + i);
                    item2.y = posY;

                    var item3 = this.pnCol3.getChildByName("item3_" + i);
                    item3.y = posY;
                }

                posY = posY + 93;

            }
            //this.insertItem(4,(this.config_item - 3),(this.posY + 93*3));
            //cc.log(slot3hang.pnCol1.getChildByName("item1_19").y);
            if (slot3hang.vlColum1 == false) {
                this.insertItem(19, 22, (this.saveposY + 93));
            } else {
                this.insertItem(1, 4, (this.saveposY + 93));
            }
        },

        GenResult: function () {
            var row1 = 6;
            var row2 = 7;
            var row3 = 8;

            if (slot3hang.vlColum1 == true) { ///// rs1, rs2, rs3 o duoi
                for (var i = 19; i < this.config_item; i++) {
                    this.getLinkImageItem(parseInt(this.matrix[row1]));
                    this.pnCol1.getChildByName("item1_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row1 = row1 - 3;

                    this.getLinkImageItem(parseInt(this.matrix[row2]));
                    this.pnCol2.getChildByName("item2_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row2 = row2 - 3;

                    this.getLinkImageItem(parseInt(this.matrix[row3]));
                    this.pnCol3.getChildByName("item3_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row3 = row3 - 3;
                }
            } else { ///// rs4, rs5, rs6 o duoi
                for (var i = 1; i < 4; i++) {
                    this.getLinkImageItem(parseInt(this.matrix[row1]));
                    this.pnCol1.getChildByName("item1_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row1 = row1 - 3;

                    this.getLinkImageItem(parseInt(this.matrix[row2]));
                    this.pnCol2.getChildByName("item2_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row2 = row2 - 3;

                    this.getLinkImageItem(parseInt(this.matrix[row3]));
                    this.pnCol3.getChildByName("item3_" + i).setSpriteFrame("res/Minigame/ResSlotBa/" + slot3hang.linkImageItem);
                    row3 = row3 - 3;
                }
            }
        },

        spinColum: function () {
            if (this.result == 100) {
                this.toastSlot("Quay không thành công", 3);
                this.isStartRotate = false;
                this.autoRotateSlot = false;
                this.txt_tuquay.setString("TỰ QUAY");

            } else if (this.result == 101) {
                this.toastSlot("Đặt cược không hợp lệ", 3);
                this.isStartRotate = false;
                this.autoRotateSlot = false;
                this.txt_tuquay.setString("TỰ QUAY");
            } else if (this.result == 102) {
                this.toastSlot("Bạn không đủ tiền", 3);
                this.isStartRotate = false;
                this.autoRotateSlot = false;
                this.txt_tuquay.setString("TỰ QUAY");
            } else {

                slot3hang.isStartRotate = true;
                var actionBack = cc.MoveBy.create(0.5, cc.p(0, 9));
                var actionBack11 = cc.MoveBy.create(0.5, cc.p(0, -9));

                slot3hang.pnCol1.runAction(cc.sequence(actionBack, cc.spawn(actionBack11, cc.callFunc(this.spinColum1, this))));
                var actionBack2 = cc.MoveBy.create(0.5, cc.p(0, 9));
                var actionBack21 = cc.MoveBy.create(0.5, cc.p(0, -9));

                //var actionBack2 = cc.MoveTo.create(0.5, cc.p(slot3hang.pnCol2.x, slot3hang.pnCol2.y + 9));
                slot3hang.pnCol2.runAction(cc.sequence(cc.delayTime(0.3), actionBack2, cc.spawn(actionBack21, cc.callFunc(this.spinColum2, this))));
                var actionBack3 = cc.MoveTo.create(0.5, cc.p(slot3hang.pnCol3.x, slot3hang.pnCol3.y + 9));
                var actionBack3 = cc.MoveBy.create(0.5, cc.p(0, 9));
                var actionBack31 = cc.MoveBy.create(0.5, cc.p(0, -9));
                slot3hang.pnCol3.runAction(cc.sequence(cc.delayTime(0.6), actionBack3, cc.spawn(actionBack31, cc.callFunc(this.spinColum3, this))));

                if (slot3hang.vlColum1 == false) {
                    slot3hang.vlColum1 = true;
                } else {
                    slot3hang.vlColum1 = false;
                }
                this.GenResult();
            }

        },

        spinColum1: function () {
            for (var i = 1; i < this.config_item; i++) {
                var item_1 = this.pnCol1.getChildByName("item1_" + i);
                var actionBy = cc.MoveTo.create(1.6, cc.p(item_1.x, item_1.y - 1674));
                if (i != (this.config_item - 1)) {
                    item_1.runAction(actionBy);
                } else {
                    item_1.runAction(cc.sequence(actionBy, cc.callFunc(this.spinBackColum1, this)));
                }
            }
        },
        spinColum2: function () {
            for (var i = 1; i < this.config_item; i++) {
                var item_2 = this.pnCol2.getChildByName("item2_" + i);
                var actionBy = cc.MoveTo.create(1.6, cc.p(item_2.x, item_2.y - 1674));
                if (i != (this.config_item - 1)) {
                    item_2.runAction(actionBy);
                } else {
                    item_2.runAction(cc.sequence(actionBy, cc.callFunc(this.spinBackColum2, this)));
                }
            }
        },
        spinColum3: function () {
            for (var i = 1; i < this.config_item; i++) {
                var item_3 = this.pnCol3.getChildByName("item3_" + i);
                var actionBy = cc.MoveTo.create(1.6, cc.p(item_3.x, item_3.y - 1674));
                if (i != (this.config_item - 1)) {
                    item_3.runAction(actionBy);
                } else {
                    item_3.runAction(cc.sequence(actionBy, cc.callFunc(this.spinBackColum3, this)));
                }
            }
        },

        spinBackColum1: function () {
            var actionBack = cc.MoveBy.create(0.15, cc.p(0, 12));
            var actionBack1 = cc.MoveBy.create(0.12, cc.p(0, -15));
            var actionBack2 = cc.MoveBy.create(0.1, cc.p(0, 3));

            slot3hang.pnCol1.runAction(cc.sequence(actionBack, actionBack1, actionBack2));
        },
        spinBackColum2: function () {

            var actionBack = cc.MoveBy.create(0.15, cc.p(0, 12));
            var actionBack1 = cc.MoveBy.create(0.12, cc.p(0, -15));
            var actionBack2 = cc.MoveBy.create(0.1, cc.p(0, 3));

            slot3hang.pnCol2.runAction(cc.sequence(actionBack, actionBack1, actionBack2));
        },

        spinBackColum3: function () {
            var actionBack = cc.MoveBy.create(0.15, cc.p(0, 12));
            var actionBack1 = cc.MoveBy.create(0.12, cc.p(0, -15));
            var actionBack2 = cc.MoveBy.create(0.1, cc.p(0, 3));
            var seq = cc.sequence(cc.delayTime(0.1), cc.callFunc(this.waitEffectAfterRotate, this));
            var spawn = cc.spawn(actionBack2, seq);
            slot3hang.pnCol3.runAction(cc.sequence(actionBack, actionBack1, spawn, cc.delayTime(0.2), cc.callFunc(this.logvitri, this)));
            this.checkLineWin();
        },


        logvitri: function () {

            if (slot3hang.vlColum1 == false) {
                this.saveposY = this.saveposY;
                slot3hang.pnCol1.getChildByName("item1_1").y = this.saveposY;
                slot3hang.pnCol1.getChildByName("item1_2").y = this.saveposY + 93;
                slot3hang.pnCol1.getChildByName("item1_3").y = this.saveposY + 186;
                slot3hang.pnCol2.getChildByName("item2_1").y = this.saveposY;
                slot3hang.pnCol2.getChildByName("item2_2").y = this.saveposY + 93;
                slot3hang.pnCol2.getChildByName("item2_3").y = this.saveposY + 186;
                slot3hang.pnCol3.getChildByName("item3_1").y = this.saveposY;
                slot3hang.pnCol3.getChildByName("item3_2").y = this.saveposY + 93;
                slot3hang.pnCol3.getChildByName("item3_3").y = this.saveposY + 186;
                this.posY = slot3hang.pnCol1.getChildByName("item1_1").y;
                //cc.log("vitri : " + this.posY);
            } else {
                this.saveposY = this.saveposY;
                slot3hang.pnCol1.getChildByName("item1_19").y = this.saveposY;
                slot3hang.pnCol1.getChildByName("item1_20").y = this.saveposY + 93;
                slot3hang.pnCol1.getChildByName("item1_21").y = this.saveposY + 186;
                slot3hang.pnCol2.getChildByName("item2_19").y = this.saveposY;
                slot3hang.pnCol2.getChildByName("item2_20").y = this.saveposY + 93;
                slot3hang.pnCol2.getChildByName("item2_21").y = this.saveposY + 186;
                slot3hang.pnCol3.getChildByName("item3_19").y = this.saveposY;
                slot3hang.pnCol3.getChildByName("item3_20").y = this.saveposY + 93;
                slot3hang.pnCol3.getChildByName("item3_21").y = this.saveposY + 186;
                this.posY = slot3hang.pnCol1.getChildByName("item1_19").y;

                //cc.log("vitri : " + this.posY);
            }

            this.insertItem(4, (this.config_item - 3), (this.posY + 93 * 3));
            //cc.log(slot3hang.pnCol1.getChildByName("item1_19").y);
            if (slot3hang.vlColum1 == false) {
                this.insertItem(19, 22, (this.posY + 93 * 18));
            } else {
                this.insertItem(1, 4, (this.posY + 93 * 18));
            }
        },

        funautoRotateSlot: function () {
            //cc.log("auto");
            slot3hang.spinColum();
            this.resetLineWin();
            slot3hang.stopAllActions();
            slot3hang.nextline = 0;
            slot3hang.linewin = null;
        },

        effectHuSlot: function () {
            slot3hang.valueOldHuSlot = slot3hang.valueOldHuSlot + slot3hang.breakValueHu
            slot3hang.txtHuSlot.setString("" + formatMoney(0, 3, slot3hang.valueOldHuSlot));
            if (slot3hang.valueOldHuSlot < slot3hang.valueHuSlot) {
                slot3hang.txtHuSlot.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.effectHuSlot, this)));
            }
        },
        getStrLineSelect: function () {
            //this.lineputslot = "";
            var lineSelected = "";
            for (var i = 0; i < this.arrBtnChoiLine.length; i++) {
                if (this.arrBtnChoiLine[i].isSelect) {
                    if (lineSelected == "") {
                        lineSelected = "" + (i + 1).toString();
                    }
                    else {
                        lineSelected = lineSelected + "," + (i + 1).toString();
                    }
                }
            }
            return lineSelected;
        },

        drawLineSelected: function (index) {
            this.VisibleLineWin(parseInt(index));
            this.VisibleLineSelect(parseInt(index));
        },
        drawLineAfterSelect: function () {
            //cc.log("value line " + slot3hang.lineputslot);
            this.resetLineWin();
            this.resetVisibleLine();
            var afterSelectLine = slot3hang.lineputslot.split(",");
            slot3hang.txtchondong.setString("" + afterSelectLine.length);
            for (var i = 0; i < afterSelectLine.length; i++) {
                this.VisibleLineWin(parseInt(afterSelectLine[i]));
                this.VisibleLineSelect(parseInt(afterSelectLine[i]));
            }
            slot3hang.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(this.resetLineWin, this)));
        },

        getRandomInt: function (min, max) {
            var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            this.getLinkImageItem(vRandom);
        },

        getLinkImageItem: function (value) {
            if (value == 0) slot3hang.linkImageItem = "ItemBlue.png";
            else if (value == 1) slot3hang.linkImageItem = "ItemWild.png";
            else if (value == 2) slot3hang.linkImageItem = "ItemOrange.png";
            else if (value == 3) slot3hang.linkImageItem = "ItemGreen.png";
            else if (value == 4) slot3hang.linkImageItem = "ItemCoBan.png";
            else if (value == 5) slot3hang.linkImageItem = "ItemPink.png";
        },

        checkMoneyFly: function () {
            slot3hang.isStartRotate = false;
            if (this.result == 0) {
                // else
            } else if (this.result == 1) {
                if (this.prize > 0) {
                    this.effectMoneyFly();
                } else {

                }

                if (this.moneyType == MONEY_VIN)
                    this.txtMoneyEarn.setColor(colorMoneyVin);
                else
                    this.txtMoneyEarn.setColor(cc.color.WHITE);
            } else if (this.result == 2) {
                this.showThangLon(this.prize);
            } else if (this.result == 3 || this.result == 4) {
                this.show_nohu(this.prize);
            }


        },

        effectMoneyFly: function () {
            slot3hang.BreakMoney = slot3hang.BreakMoney + (this.prize / 10);
            slot3hang.txtMoneyEarn.setString("+" + formatMoney(0, 3, slot3hang.BreakMoney));
            slot3hang.tilescale = slot3hang.tilescale + 2;
            slot3hang.txtMoneyEarn.setFontSize(20 + slot3hang.tilescale);
            slot3hang.sp_effect_earn_money.setVisible(true);
            slot3hang.sp_effect_earn_money.stopAllActions();
            var rotateByVT = cc.rotateBy(4, 360);
            slot3hang.sp_effect_earn_money.runAction(rotateByVT);
            if (slot3hang.BreakMoney < slot3hang.prize) {
                slot3hang.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(this.effectMoneyFly, this)));
            } else {
                slot3hang.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(this.DisibleMoneyFly, this)));

            }

        },
        DisibleMoneyFly: function () {
            slot3hang.tilescale = 0;
            slot3hang.BreakMoney = 0;
            slot3hang.txtMoneyEarn.setFontSize(20);
            slot3hang.txtMoneyEarn.setString("");
            slot3hang.sp_effect_earn_money.stopAllActions();
            slot3hang.sp_effect_earn_money.setVisible(false);
            this.runAction(cc.sequence(cc.delayTime(15), cc.callFunc(this.runEffectLineWin, this)));

        },

        closeMoneyFly: function () {
            slot3hang.tilescale = 0;
            slot3hang.BreakMoney = 0;
            slot3hang.txtMoneyEarn.setFontSize(20);
            slot3hang.txtMoneyEarn.setString("");
            slot3hang.sp_effect_earn_money.stopAllActions();
            slot3hang.sp_effect_earn_money.setVisible(false);
        },
        checkLineWin: function () {
            this.resetLineWin();
            //slot3hang.linewin = slot3hang.resultSlot.split("_")[1].split("|")[1].split(",");
            slot3hang.timedelayauto = 0.8 * (this.linesWin.length + 1);
            for (var i = 0; i < this.linesWin.length; i++) {
                this.VisibleLineWin(parseInt(this.linesWin[i]));
            }
            slot3hang.runAction(cc.sequence(cc.delayTime(0.6), cc.callFunc(this.checkMoneyFly, this)));
        },
        resetVisibleLine: function () {
            slot3hang.vis_l1.setVisible(false);
            slot3hang.vis_l2.setVisible(false);
            slot3hang.vis_l3.setVisible(false);
            slot3hang.vis_l4.setVisible(false);
            slot3hang.vis_l5.setVisible(false);
            slot3hang.vis_l6.setVisible(false);
            slot3hang.vis_l7.setVisible(false);
            slot3hang.vis_l8.setVisible(false);
            slot3hang.vis_l9.setVisible(false);
            slot3hang.vis_l10.setVisible(false);
            slot3hang.vis_l11.setVisible(false);
            slot3hang.vis_l12.setVisible(false);
            slot3hang.vis_l13.setVisible(false);
            slot3hang.vis_l14.setVisible(false);
            slot3hang.vis_l15.setVisible(false);
            slot3hang.vis_l16.setVisible(false);
            slot3hang.vis_l17.setVisible(false);
            slot3hang.vis_l18.setVisible(false);
            slot3hang.vis_l19.setVisible(false);
            slot3hang.vis_l20.setVisible(false);
        },
        resetLineWin: function () {
            slot3hang.line1.setVisible(false);
            slot3hang.line2.setVisible(false);
            slot3hang.line3.setVisible(false);
            slot3hang.line4.setVisible(false);
            slot3hang.line5.setVisible(false);
            slot3hang.line6.setVisible(false);
            slot3hang.line7.setVisible(false);
            slot3hang.line8.setVisible(false);
            slot3hang.line9.setVisible(false);
            slot3hang.line10.setVisible(false);
            slot3hang.line11.setVisible(false);
            slot3hang.line12.setVisible(false);
            slot3hang.line13.setVisible(false);
            slot3hang.line14.setVisible(false);
            slot3hang.line15.setVisible(false);
            slot3hang.line16.setVisible(false);
            slot3hang.line17.setVisible(false);
            slot3hang.line18.setVisible(false);
            slot3hang.line19.setVisible(false);
            slot3hang.line20.setVisible(false);
        },
        resetshowline: function () {
            slot3hang.showline1.setVisible(false);
            slot3hang.showline2.setVisible(false);
            slot3hang.showline3.setVisible(false);
            slot3hang.showline4.setVisible(false);
            slot3hang.showline5.setVisible(false);
            slot3hang.showline6.setVisible(false);
            slot3hang.showline7.setVisible(false);
            slot3hang.showline8.setVisible(false);
            slot3hang.showline9.setVisible(false);
            slot3hang.showline10.setVisible(false);
            slot3hang.showline11.setVisible(false);
            slot3hang.showline12.setVisible(false);
            slot3hang.showline13.setVisible(false);
            slot3hang.showline14.setVisible(false);
            slot3hang.showline15.setVisible(false);
            slot3hang.showline16.setVisible(false);
            slot3hang.showline17.setVisible(false);
            slot3hang.showline18.setVisible(false);
            slot3hang.showline19.setVisible(false);
            slot3hang.showline20.setVisible(false);
        },

        runEffectLineWin: function () {
            //cc.log("line win " + slot3hang.linewin);
            this.resetLineWin();
            this.VisibleLineWin(parseInt(this.linesWin[slot3hang.nextline]));
            slot3hang.nextline = slot3hang.nextline + 1;
            if (slot3hang.nextline >= this.linesWin.length) {
                slot3hang.nextline = 0;
                slot3hang.runAction(cc.sequence(cc.delayTime(1.2), cc.callFunc(this.checkLineWin, this)));

            } else {
                slot3hang.runAction(cc.sequence(cc.delayTime(1.2), cc.callFunc(this.runEffectLineWin, this)));
            }
        },
        VisibleLineWin: function (value) {
            if (value == 1) slot3hang.line1.setVisible(true);
            else if (value == 2) slot3hang.line2.setVisible(true);
            else if (value == 3) slot3hang.line3.setVisible(true);
            else if (value == 4) slot3hang.line4.setVisible(true);
            else if (value == 5) slot3hang.line5.setVisible(true);
            else if (value == 6) slot3hang.line6.setVisible(true);
            else if (value == 7) slot3hang.line7.setVisible(true);
            else if (value == 8) slot3hang.line8.setVisible(true);
            else if (value == 9) slot3hang.line9.setVisible(true);
            else if (value == 10) slot3hang.line10.setVisible(true);
            else if (value == 11) slot3hang.line11.setVisible(true);
            else if (value == 12) slot3hang.line12.setVisible(true);
            else if (value == 13) slot3hang.line13.setVisible(true);
            else if (value == 14) slot3hang.line14.setVisible(true);
            else if (value == 15) slot3hang.line15.setVisible(true);
            else if (value == 16) slot3hang.line16.setVisible(true);
            else if (value == 17) slot3hang.line17.setVisible(true);
            else if (value == 18) slot3hang.line18.setVisible(true);
            else if (value == 19) slot3hang.line19.setVisible(true);
            else if (value == 20) slot3hang.line20.setVisible(true);
        },
        VisibleLineSelect: function (value) {
            if (value == 1) slot3hang.vis_l1.setVisible(true);
            else if (value == 2) slot3hang.vis_l2.setVisible(true);
            else if (value == 3) slot3hang.vis_l3.setVisible(true);
            else if (value == 4) slot3hang.vis_l4.setVisible(true);
            else if (value == 5) slot3hang.vis_l5.setVisible(true);
            else if (value == 6) slot3hang.vis_l6.setVisible(true);
            else if (value == 7) slot3hang.vis_l7.setVisible(true);
            else if (value == 8) slot3hang.vis_l8.setVisible(true);
            else if (value == 9) slot3hang.vis_l9.setVisible(true);
            else if (value == 10) slot3hang.vis_l10.setVisible(true);
            else if (value == 11) slot3hang.vis_l11.setVisible(true);
            else if (value == 12) slot3hang.vis_l12.setVisible(true);
            else if (value == 13) slot3hang.vis_l13.setVisible(true);
            else if (value == 14) slot3hang.vis_l14.setVisible(true);
            else if (value == 15) slot3hang.vis_l15.setVisible(true);
            else if (value == 16) slot3hang.vis_l16.setVisible(true);
            else if (value == 17) slot3hang.vis_l17.setVisible(true);
            else if (value == 18) slot3hang.vis_l18.setVisible(true);
            else if (value == 19) slot3hang.vis_l19.setVisible(true);
            else if (value == 20) slot3hang.vis_l20.setVisible(true);
        },
        changeRoom: function (currentRoom, joindRoom) {
            var sendPkm = new PKMCmdSendChangeRoom();
            sendPkm.putCmd(currentRoom, joindRoom);
            Minigame.miniGameClient.send(sendPkm);
            sendPkm.clean();
        },
        play: function (betValue, lines) {
            var sendPkm = new PKMCmdSendPlay();
            sendPkm.putCmd(betValue, lines);
            Minigame.miniGameClient.send(sendPkm);
            sendPkm.clean();
        },
        autoPlay: function (lines) {
            var sendPkm = new PKMCmdSendAutoPlay();
            sendPkm.putCmd(lines);
            Minigame.miniGameClient.send(sendPkm);
            sendPkm.clean();
        },
        stopAutoPlay: function () {
            var sendPkm = new PKMCmdSendStopAutoPlay();
            sendPkm.putCmd();
            Minigame.miniGameClient.send(sendPkm);
            sendPkm.clean();
        },
        toastSlot: function (message, timeShow, colorLable) {
            var wbg = this.pnBackGround.getContentSize().width;
            if (this.getChildByTag(999) != null) {
                this.getChildByTag(999).removeAllChildren(true);
                this.pnBackGround.removeChildByTag(999, true);
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

            this.pnBackGround.addChild(layer, 999);
            //var forever = seq.repeatForever();
            layer.runAction(seq);
            label1.runAction(seq.clone());


        }
    }
);

codeSlot3Hang.BTN_CLOSEGAMESLOT3 = 1;
codeSlot3Hang.BTN_STARTROTATE = 2;
codeSlot3Hang.BTN_CLOSECHONDONG = 3;
codeSlot3Hang.BTN_SELECTROOMSLOT1 = 4;
codeSlot3Hang.BTN_SELECTROOMSLOT2 = 5;
codeSlot3Hang.BTN_SELECTROOMSLOT3 = 6;
codeSlot3Hang.BTN_CHANGEMONEYSLOT = 7;
codeSlot3Hang.BTN_CHONDONGSLOT = 8;
codeSlot3Hang.BTN_TUQUAYSLOT = 9;
codeSlot3Hang.BTN_LINESLOT1 = 10;
codeSlot3Hang.BTN_LINESLOT2 = 14;
codeSlot3Hang.BTN_LINESLOT3 = 18;
codeSlot3Hang.BTN_LINESLOT4 = 22;
codeSlot3Hang.BTN_LINESLOT5 = 26;
codeSlot3Hang.BTN_LINESLOT6 = 11;
codeSlot3Hang.BTN_LINESLOT7 = 15;
codeSlot3Hang.BTN_LINESLOT8 = 19;
codeSlot3Hang.BTN_LINESLOT9 = 23;
codeSlot3Hang.BTN_LINESLOT10 = 27;
codeSlot3Hang.BTN_LINESLOT11 = 12;
codeSlot3Hang.BTN_LINESLOT12 = 16;
codeSlot3Hang.BTN_LINESLOT13 = 20;
codeSlot3Hang.BTN_LINESLOT14 = 24;
codeSlot3Hang.BTN_LINESLOT15 = 28;
codeSlot3Hang.BTN_LINESLOT16 = 13;
codeSlot3Hang.BTN_LINESLOT17 = 17;
codeSlot3Hang.BTN_LINESLOT18 = 21;
codeSlot3Hang.BTN_LINESLOT19 = 25;
codeSlot3Hang.BTN_LINESLOT20 = 29;

codeSlot3Hang.BTN_DONGLESLOT = 30;
codeSlot3Hang.BTN_DONGCHANSLOT = 31;
codeSlot3Hang.BTN_TATCASLOT = 32;
codeSlot3Hang.BTN_CHONLAISLOT = 33;
codeSlot3Hang.BTN_HELPSLOT3 = 34;
codeSlot3Hang.BTN_VINHDANHSLOT3 = 36;
codeSlot3Hang.BTN_INFOSLOT3 = 38;
codeSlot3Hang.BTN_CLOSE_EFFECT_HU = 39;

codeSlot3Hang.BTN_X2_HU = 40;
codeSlot3Hang.BTN_EVENT = 41;
function actionMoHu() {
    var animFrames = [];
    var str = "";
    cc.spriteFrameCache.addSpriteFrames("res/Minigame/ResSlotBa/Ball/BallPlist.plist");
    for (var i = 1; i < 8; i++) {
        str = "Minigame/ResSlotBa/Ball/Poke_Ball_" + i + ".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrame = new cc.AnimationFrame();
        animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
    }
    var animation = cc.Animation.create(animFrames, 0.08, 1);
    var animate = cc.Animate.create(animation);
    return animate;
}

pKMSubcribe = function (roomId) {
    slot3hang.isSubcribe = true;
    var sendPkm = new PKMCmdSendSubcribe();
    sendPkm.putCmd(roomId);
    Minigame.miniGameClient.send(sendPkm);
    sendPkm.clean();

}
pKMUnsubcribe = function (roomId) {
    var sendPkm = new PKMCmdSendUnsubcribe();
    sendPkm.putCmd(roomId);
    Minigame.miniGameClient.send(sendPkm);
    sendPkm.clean();

}


openslot3hang = function () {
    if (slot3hang === null) {
        slot3hang = new codeSlot3Hang();
        slot3hangX = slot3hang.getPosition().x;
        slot3hangY = slot3hang.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(slot3hang, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT);
        pKMSubcribe(0);
    } else {
        slot3hang.setVisible(true);
        pKMSubcribe(slot3hang.currentRoom);
        //slot3hang.pn_slot3hang.setVisible(true);
        cc.eventManager.resumeTarget(slot3hang.pnBackGround, true);
        slot3hang.reOpenLayer(slot3hang.pnBackGround);
    }
    slot3hangAppear = true;
};
closeslot3hang = function () {
    if (slot3hang === null) {
        return;
    }
    if (slot3hangAppear) {
        slot3hang.closeLayer(slot3hang.pnBackGround);
        slot3hang.setVisible(false);
        slot3hangAppear = false;

        close_minislot_bangthanhtich();
        close_minislot_guild();
        close_minislot_lichsu();
        close_minislot_x2();
        cc.eventManager.pauseTarget(slot3hang.pnBackGround, true);
        //var slot3hangSend = new CmdSendUnsubcriberslot3hang();
        //slot3hangSend.putUnsubscriberslot3hang(slot3hang.MINI_POKER_ROOM);
        //Minigame.miniGameClient.send(slot3hangSend);
        //slot3hangSend.clean();
    }
};