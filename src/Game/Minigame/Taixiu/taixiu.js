/**
 * Created by Admin on 6/30/2016.
 */

var taiXiu = null;
var taiXiuX = 0;
var taiXiuY = 0;
var moneyTypeTaiXiu = "gold";
var taiXiuAppear = false;
var taiXiuMoving = null;


var TaiXiuLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.resourcePath = "res/Minigame/TaiXiu/images/";

            this.referenceId = null;
            this.soLanRutLoc = 0;

            this.arrLichSu = null;
            this.arrBtnLichSu = null;
            this.isDat = true;
            this.isStartPlay = true;
            this.isChangeRoom = false;
            this.betValue = 0;
            this.betSide = 0;
            this.isKeyNhapNhanh = true;
            this.moneyType = MONEY_VIN;
            this.isBetTai = true;
            this.remainTime = 0;
            //this.pTaiXiu = null;
            this.bg_tai_xiu = null;
            this.sp_bg_time_result = null;
            this.betTanLoc = 0;

            this.btn_dong_y_web = null;

            this.pBgKey = null;
            this.pBgKeyNhapSo = null;
            this.pBgKeyNhapNhanh = null;
            this.bg_soicau = null;
            this.timeStartTanLoc = new Date();
            this.timeCurrent = new Date();
            this.arrIsNhayLS = [];

            this.lb_phien = null;
            this.lb_dem_giay_ket_qua = null;
            this.lb_dem_giay_choi = null;
            this.sp_animation = null;
            this.lb_tong_tai = null;
            this.lb_tong_xiu = null;
            this.lb_user_tai = null;
            this.lb_user_xiu = null;
            this.sp_tai = null;
            this.sp_xiu = null;
            this.btn_dat_tai = null;
            this.btn_dat_xiu = null;
            this.tf_bet_tai = null;
            this.tf_bet_xiu = null;
            this.pBetXiu = null;
            this.pBetTai = null;
            this.eboxTai = null;
            this.eboxXiu = null;

            this.btn_bet_tai = null;
            this.btn_bet_xiu = null;


            this.lb_bet_tai = null;
            this.lb_bet_xiu = null;
            this.sp_dia = null;
            this.sp_xx1 = null;
            this.sp_xx2 = null;
            this.sp_xx3 = null;
            this.btn_thanh_du = null;

            this.btn_money_type = null;
            this.btn_close = null;
            this.btn_soi_cau = null;
            this.btn_lich_su = null;
            this.btn_top_user = null;
            this.btn_huong_dan = null;

            this.btn_change_key = null;
            this.btn_dong_y = null;
            this.btn_huy = null;

            this.btn_key1 = null;
            this.btn_key2 = null;
            this.btn_key3 = null;
            this.btn_key4 = null;
            this.btn_key5 = null;
            this.btn_key6 = null;
            this.btn_key7 = null;
            this.btn_key8 = null;
            this.btn_key9 = null;
            this.btn_key0 = null;
            this.btn_key000 = null;
            this.btn_keydelete = null;

            this.btn_key1000 = null;
            this.btn_key5000 = null;
            this.btn_key10000 = null;
            this.btn_key50000 = null;
            this.btn_key100k = null;
            this.btn_key500k = null;
            this.btn_key1m = null;
            this.btn_key10m = null;

            this.btn_rut_loc = null;
            this.btn_tan_loc = null;

            this.lb_time_rut_loc = null;
            this.pHuLoc = null;
            this.btn_hu_loc = null;
            this.lb_hu_loc = null;
            this.lb_so_lan_rut_loc = null;
            this.timeRutLoc = 300;
            this.pToolTip = null;
            this.lb_toolTip = null;
            this.mouseLis = null;
            this.resultLS = {};
            this.bettingState = true;
            this.isWaittingBet = false;
            this.btn_nan = null;
            this.sp_nan = null;
            this.isNan = false;
            this.isWaitingNan = false;
            this.tongxx = 3;
            this._super("TaiXiuScene");

            // this.initWithBinaryFile("res/MNTaiXiu.json");
            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/TaiXiu/images/PlistMNTaiXiu.plist");
            this.createDraggableLayout();
            this.createLevelOneElement();
            this.createPHuLoc();
            this.createPBgKey();
            this.createBetLayer();
            this.createSoiCau();
            this.createOther();

            this.addMasterLayer(this._layout);
            this.onCreate();

        },

        createDraggableLayout: function () {
            this.bg_tai_xiu = this.addLayoutStructure(this, "_layout", cc.p(628.05, 352.07), undefined, cc.size(778, 330), false);
            this.addSpriteStructureWithoutResourcePath(this._layout, "backgroundTX", cc.p(0, 0), this.commonImagePath + "backgroundTX.png", {
                anchorY: 0,
                anchorX: 0
            });
            return this._layout;
        },

        createLevelOneElement: function () {
            var layout = this._layout;

            this.addLayoutStructure(layout, "Panel_1", cc.p(38.02, -67.08), undefined, cc.size(700.00, 92.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            
            this.addSpriteStructureWithoutResourcePath(layout, "Sprite_1", cc.p(389.00, 353.35), this.commonImagePath + "shadow_tren.png");
            this.addSpriteStructure(layout, "bg_sophienTX_2", cc.p(199.76, 285.22), "bg_sophienTX.png");
            this.addSpriteStructure(layout, "bg_money_pot_6", cc.p(137.76, 149.22), "bg_money_pot.png", {visible: false});
            this.addSpriteStructure(layout, "bg_money_pot_7", cc.p(634.77, 149.22), "bg_money_pot.png", {visible: false});
            this.addSpriteStructure(layout, "btn_putmoney_5_0", cc.p(634.77, 104.40), "btn_putmoney.png");
            this.addSpriteStructure(layout, "btn_putmoney_5", cc.p(138.58, 105.40), "btn_putmoney.png");
            this.addSpriteStructure(layout, "Sprite_2_0", cc.p(647.00, 146.00), "Shadow_Tien.png");
            this.addSpriteStructure(layout, "Sprite_2", cc.p(128.00, 146.00), "Shadow_Tien.png");
            this.addSpriteStructure(layout, "Sprite_2", cc.p(128.00, 146.00), "Shadow_Tien.png");
            this.addSpriteStructure(layout, "sp_dia", cc.p(387.76, 163.22), "bg_vongtron.png");
            this.addTextStructure(layout, "lb_bet_tai", cc.p(137.75, 62.22), "0", fontRobotoMedium.fontName, 24, "#FFFFFF");
            this.addTextStructure(layout, "lb_bet_xiu", cc.p(628.77, 64.22), "0", fontRobotoMedium.fontName, 24, "#FFFFFF");
            this.addSpriteStructure(layout, "sp_tai", cc.p(140.00, 235.00), "txtTai.png");
            this.addSpriteStructure(layout, "sp_xiu", cc.p(630.77, 235.00), "txtXiu.png");
            this.addTextStructure(layout, "lb_tong_tai", cc.p(138.76, 145.22), "0", fontRobotoMedium.fontName, 26, "#FFFFFF", {__size: cc.size(200.00, 30)});
            this.addTextStructure(layout, "lb_tong_xiu", cc.p(635.77, 145.22), "0", fontRobotoMedium.fontName, 26, "#FFFFFF", {__size: cc.size(200.00, 30)});
            this.addTextStructure(layout, "lb_dem_giay_choi", cc.p(386.10, 162.78), "0:00", fontRobotoMedium.fontName, 98, "#FFFFFF");
            this.addSpriteStructure(layout, "sp_animation", cc.p(387.76, 167.22), "", {width: 46, height: 46});
            // this.addSpriteStructure(layout, "sp_xx1", cc.p(387.76, 167.22), "xx11.png");
            // this.addSpriteStructure(layout, "sp_xx2", cc.p(387.76, 161.66), "xx22.png");
            // this.addSpriteStructure(layout, "sp_xx3", cc.p(387.76, 167.22), "xx33.png");
            this.addSpriteStructure(layout, "sp_xx1", cc.p(337.76, 123.22), "xx11.png");
            this.addSpriteStructure(layout, "sp_xx2", cc.p(388.76, 215.66), "xx22.png");
            this.addSpriteStructure(layout, "sp_xx3", cc.p(438.76, 128.22), "xx33.png");
            this.addTextStructure(layout, "lb_phien", cc.p(198.61, 285.59), "0:00", fontRobotoMedium.fontName, 24, "#FFFFFF");
            this.addTextFieldStructure(layout, "tf_bet_tai", cc.p(138.00, 105.00), "", "Nhập số", fontRobotoMedium.fontName, 16, cc.size(150.00, 27), null, cc.TEXT_ALIGNMENT_CENTER, 16);
            this.addTextFieldStructure(layout, "tf_bet_xiu", cc.p(635.00, 105.00), "", "Nhập số", fontRobotoMedium.fontName, 16, cc.size(150.00, 27), null, cc.TEXT_ALIGNMENT_CENTER, 16);
            this.addTextStructure(layout, "lb_user_tai", cc.p(168.02, 180.22), "(0)", fontRobotoMedium.fontName, 20, "#FFFFFF");
            this.addTextStructure(layout, "lb_user_xiu", cc.p(662.68, 181.22), "(0)", fontRobotoMedium.fontName, 20, "#FFFFFF");
            this.addButtonStructure(layout, "btn_money_type", TaiXiuLayer.BTN_MONEY_TYPE, cc.p(41.75, 232.22), true, this.commonImagePath + "choivin.png");
            this.addButtonStructure(layout, "btn_close", TaiXiuLayer.BTN_CLOSE, cc.p(656.85, 307.22), true, this.commonImagePath + "btn_closegame.png");
            this.addButtonStructure(layout, "btn_tan_loc", TaiXiuLayer.BTN_TAN_LOC, cc.p(535.80, -51.76), true,
                [this.resourcePath + "btn_tanloc.png", this.resourcePath + "btn_tanloc_s.png", this.resourcePath + "btn_tanloc_s.png"],
                this.createButtonText("TÁN LỘC", {
                    titleColor: cc.color(158, 84, 15, 1),
                    titleFontName: fontRobotoBlack.fontName,
                    titleFontSize: 20
                }));
            this.addSpriteStructure(layout, "userTX_3", cc.p(107.75, 182.22), "userTX.png");
            this.addSpriteStructure(layout, "userTX_4", cc.p(598.95, 182.22), "userTX.png");
            this.addButtonStructure(layout, "btn_nan", TaiXiuLayer.BTN_NAN, cc.p(738.00, 235.00), true, this.resourcePath + "bonan.png");
            this.addButtonStructure(layout, "btn_soi_cau", TaiXiuLayer.BTN_SOI_CAU, cc.p(643.43, -45.00), true, [this.resourcePath + "btn_soicau.png", this.resourcePath + "btn_soicau_s.png"]);
            this.addButtonStructure(layout, "btn_lich_su", TaiXiuLayer.BTN_LICH_SU, cc.p(448.86, -56.00), true, this.commonImagePath + "lsgd.png");
            this.addButtonStructure(layout, "btn_huong_dan", TaiXiuLayer.BTN_HUONG_DAN, cc.p(328.09, -56.00), true, this.commonImagePath + "huongdan.png");
            this.addButtonStructure(layout, "btn_top_user", TaiXiuLayer.BTN_TOP_USER, cc.p(390.11, -56.00), true, this.commonImagePath + "bangvinhdanh.png");
            this.addButtonStructure(layout, "btn_thanh_du", TaiXiuLayer.BTN_THANH_DU, cc.p(389.00, 377.60), true, this.resourcePath + "btn_event.png");
        },

        createPHuLoc: function () {
            var layout = this.addLayoutStructure(this._layout, "pHuLoc", cc.p(-24.94, -177.37), "bg_huloc.png", cc.size(228.00, 94.00), false, {
                anchorX: 0,
                anchorY: 0,
                visible: false
            });
            this.addSpriteStructure(layout, "Sprite_4", cc.p(92.00, 61.78), "bg_money_hu.png");
            this.addSpriteStructureWithoutResourcePath(layout, "Sprite_5", cc.p(198.62, 60.83), this.commonImagePath + "iconVin.png");
            this.addSpriteStructureWithoutResourcePath(layout, "Sprite_5", cc.p(198.62, 60.83), this.commonImagePath + "iconVin.png");
            this.addTextStructure(layout, "Text_5", cc.p(91.80, 21.00), "Số lần rút còn lại: ", fontRobotoMedium.fontName, 20, "#F1E063");
            this.addTextStructure(layout, "lb_so_lan_rut_loc", cc.p(197.29, 21.00), "0", fontRobotoMedium.fontName, 20, "#F1E063");
            this.addTextStructure(layout, "lb_hu_loc", cc.p(92.13, 60.82), "0", fontRobotoMedium.fontName, 26, "#E000FA");

            this.addButtonStructure(this._layout, "btn_hu_loc", TaiXiuLayer.BTN_HU_LOC, cc.p(89.07, -51.44), true, this.resourcePath + "iconHuLoc.png");
            this.addButtonStructure(this._layout, "btn_rut_loc", TaiXiuLayer.BTN_RUT_LOC, cc.p(206.83, -55.32), true, [this.resourcePath + "btn_rutloc.png", this.resourcePath + "btn_rutloc_s.png"]);
            this.addTextStructure(this._layout, "lb_time_rut_loc", cc.p(204.71, -52.85), "RÚT LỘC ", fontRobotoMedium.fontName, 20, "#9E540F");
        },


        createPBgKey: function () {
            var layout = this.addLayoutStructure(this._layout, "pBgKey", cc.p(390.00, -237.61), undefined, cc.size(766.00, 213.00), false, {
                anchorX: 0.5,
                anchorY: 0,
                visible: false
            });
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setBackGroundColor(cc.color(77,77,77,0.5));
            layout.setBackGroundColorOpacity(127);
            // setBackGroundColorOpacity

            this.addButtonStructure(layout, "btn_change_key", TaiXiuLayer.BTN_CHANGE_KEY, cc.p(128.36, 42.00), true, [this.resourcePath + "btn_select.png", this.resourcePath + "btn_select_s.png"],
                this.createButtonText("SỐ KHÁC", {
                    titleFontName: fontRobotoBold.fontName,
                    titleFont: fontRobotoBold.fontName,
                    titleFontSize: 36
                }));
            this.addButtonStructure(layout, "btn_dong_y", TaiXiuLayer.BTN_DONG_Y, cc.p(383.00, 42.00), true, [this.resourcePath + "btn_select.png", this.resourcePath + "btn_select_s.png"],
                this.createButtonText("ĐỒNG Ý", {
                    titleFontName: fontRobotoBold.fontName,
                    titleFont: fontRobotoBold.fontName,
                    titleFontSize: 36
                }));
            this.addButtonStructure(layout, "btn_huy", TaiXiuLayer.BTN_HUY, cc.p(637.77, 42.00), true, [this.resourcePath + "btn_select.png", this.resourcePath + "btn_select_s.png"],
                this.createButtonText("HỦY", {
                    titleFontName: fontRobotoBold.fontName,
                    titleFont: fontRobotoBold.fontName,
                    titleFontSize: 36
                })
            );


            var pBgKeyNhapSo = this.addLayoutStructure(layout, "pBgKeyNhapSo", cc.p(0, 86), undefined, cc.size(766.00, 128.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            var _self = this;

            function createBtn_key(name, position) {
                var  button = _self.addButtonStructure(pBgKeyNhapSo, "btn_key" + name, TaiXiuLayer["BTN_KEY" + name], cc.p.apply(this, position), true, [_self.resourcePath + "small_number.png", _self.resourcePath + "small_number_s.png"],
                    _self.createButtonText(name, {
                        titleColor: cc.color(65, 65, 70, 1),
                        titleFontName: fontRobotoBlack.fontName,
                        titleFontSize: 36
                    })
                );
                button.setTitleColor(cc.color(65, 65, 70, 1));
                return button;
            }

            var y1 = 95.00, y2 = 31.80;
            var btn_keyOptionArray = [[1, [66.00, y1]], [2, [193.00, y1]], [3, [320.00, y1]], [4, [447, y1]], [5, [574.00, y1]], [6, [701.00, y1]],
                [7, [66.00, y2]], [8, [193.00, y2]], [9, [320.00, y2]], [0, [447, y2]], ["000", [574.00, y2]]];
            btn_keyOptionArray.forEach(function (item, index) {
                createBtn_key.apply(this, item);
            });
            _self.addButtonStructure(pBgKeyNhapSo, "btn_keydelete", TaiXiuLayer.BTN_KEYDELETE, cc.p(701.00, y2), true, [this.resourcePath + "btn_back.png", this.resourcePath + "btn_back_s.png"]);


            var pBgKeyNhapNhanh = this.addLayoutStructure(layout, "pBgKeyNhapNhanh", cc.p(0, 84), undefined, cc.size(766.00, 128.00), false, {
                anchorX: 0,
                anchorY: 0,
                visible: false
            });
            var _self = this;

            function createBtn_quick_key(name, position, text) {
                button = _self.addButtonStructure(pBgKeyNhapNhanh, name, TaiXiuLayer[name.toUpperCase()], cc.p.apply(this, position), true, [_self.resourcePath + "button_number.png", _self.resourcePath + "button_number_s.png"],
                    _self.createButtonText(text, {
                        titleColor: cc.color(65, 65, 70, 1),
                        titleFontName: fontRobotoBlack.fontName,
                        titleFontSize: 36
                    })
                );
                button.setTitleColor(cc.color(65, 65, 70, 1));
                return button;
            }

            var y1 = 96.18, y2 = 31.80;
            var btn_keyOptionArray = [["btn_key1000", [95.82, y1], "1.000"], ["btn_key5000", [288.00, y1], "5.000"], ["btn_key10000", [479.00, y1], "10.000"], ["btn_key50000", [670.00, y1], "50.000"],
                ["btn_key100k", [95.00, y2], "100K"], ["btn_key500k", [288.00, y2], "500K"], ["btn_key1m", [479.00, y2], "1M"], ["btn_key10m", [670.00, y2], "10M"]];

            btn_keyOptionArray.forEach(function (item) {
                createBtn_quick_key.apply(this, item);
            });

        },

        createBetLayer: function () {
            this.addButtonStructure(this._layout, "btn_bet_tai", TaiXiuLayer.BTN_DAT_TAI, cc.p(138.58, 105.40), true, this.resourcePath + "btn_putmoney.png", {visible: false});
            this.addButtonStructure(this._layout, "btn_bet_xiu", TaiXiuLayer.BTN_DAT_XIU, cc.p(634.77, 105.40), true, this.resourcePath + "btn_putmoney.png", {visible: false});
            this.addLayoutStructure(this._layout, "pBetTai", cc.p(51.70, 84.00), undefined, cc.size(171.00, 44), false, {
                anchorX: 0,
                anchorY: 0,
                visible: false
            });
            this.addLayoutStructure(this._layout, "pBetXiu", cc.p(549.00, 84.00), undefined, cc.size(171.00, 44), false, {
                anchorX: 0,
                anchorY: 0,
                visible: false
            });
            this.addButtonStructure(this._layout, "btn_dong_y_web", TaiXiuLayer.BTN_DONG_Y_WEB, cc.p(392.04, 41.83), true, this.resourcePath + "btn_dongy.png", {visible: false});
        },

        createSoiCau: function () {
            var layout = this.addLayoutStructure(this._layout, "bg_soicau", cc.p(389.00, -5.00), "bg_soicau.png", cc.size(674.00, 39.00), false);

            this.addSpriteStructure(layout, "vong_tien_8", cc.p(627.00, 20.00), "vong_tien.png");
            var pToolTip = this.addLayoutStructure(layout, "pToolTip", cc.p(368.56, 39.09), undefined, cc.size(214.00, 35.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            var Panel_6 = this.addLayoutStructure(pToolTip, "Panel_6", cc.p(0.52, 1.95), "tooltip02.png", cc.size(134.00, 21.00), false, {
                anchorX: 0,
                anchorY: 0,
                scaleX : 1.6,
                scaleY : 1.6
            });

            this.addTextStructure(pToolTip, "lb_toolTip", cc.p(108.57, 19.04), "#1266666: Tài(5 5 5)", fontRobotoMedium.fontName, 22, "#000000");
        },

        createOther: function () {
            this.addSpriteStructure(this._layout, "sp_nan", cc.p(389.00, 164.00), "bat_nan2.png", {visible: true});
            this.addSpriteStructure(this._layout, "sp_bg_time_result", cc.p(519.77, 256.22), "bg_timeTX.png");
            this.addTextStructure(this._layout, "lb_dem_giay_ket_qua", cc.p(519.62, 255.34), "00:00", fontRobotoMedium.fontName, 30, "#FF0000", {__size: cc.size(110.00, 41)});
        },


        onCreate: function () {
            this.arrLichSu = [{
                xx1: 1,
                xx2: 1,
                xx3: 1,
                tong: 1,
                phien: 0
            }];
            this.arrBtnLichSu = new Array();
            this.arrSoiCauTong = new Array(17);
            this.arrSoiCauXX1 = new Array(17);
            this.arrSoiCauXX2 = new Array(17);
            this.arrSoiCauXX3 = new Array(17)

            this.pToolTip.setLocalZOrder(100);

            //this.tf_bet_tai.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            //this.tf_bet_tai.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            //this.tf_bet_xiu.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            //this.tf_bet_xiu.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            if (cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false)
                    this.btn_thanh_du.setEnabled(false);
            }

            if (cc.sys.isNative) {
                this.tf_bet_tai.setVisible(false);
                this.tf_bet_xiu.setVisible(false);
                this.btn_bet_tai.setVisible(true);
                this.btn_bet_xiu.setVisible(true);
                this.pToolTip.setVisible(false);
            } else {
                this.tf_bet_xiu.removeFromParent(true);
                this.tf_bet_xiu = new cc.EditBox(cc.size(150, 40), cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
                this.tf_bet_xiu.setPosition(cc.p(635, 105));
                this.tf_bet_xiu.setName("tf_bet_xiu");
                this.tf_bet_xiu.setPlaceHolder("Nhập số");
                this.tf_bet_xiu.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                this.tf_bet_xiu.setFontName("Roboto-Medium");
                this.tf_bet_xiu.setFontSize(20);
                this.tf_bet_xiu.setPlaceholderFontSize(20);
                this.tf_bet_xiu.setPlaceholderFontColor(cc.color.GRAY);
                this.tf_bet_xiu.setFontColor(cc.color.WHITE);
                this.tf_bet_xiu.setDelegate(this);
                this.tf_bet_xiu.setMaxLength(13);
                this.tf_bet_xiu.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);


                this.tf_bet_tai.removeFromParent(true);
                this.tf_bet_tai = new cc.EditBox(cc.size(150, 40), cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
                this.tf_bet_tai.setPosition(cc.p(138, 105));
                this.tf_bet_tai.setName("tf_bet_tai");
                this.tf_bet_tai.setPlaceHolder("Nhập số");
                this.tf_bet_tai.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                this.tf_bet_tai.setFontName("Roboto-Medium");
                this.tf_bet_tai.setFontSize(20);
                this.tf_bet_tai.setPlaceholderFontSize(20);
                this.tf_bet_tai.setPlaceholderFontColor(cc.color.GRAY);
                this.tf_bet_tai.setFontColor(cc.color.WHITE);
                this.tf_bet_tai.setDelegate(this);
                this.tf_bet_tai.setMaxLength(13);
                this.tf_bet_tai.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                this.bg_tai_xiu.addChild(this.tf_bet_tai);
                this.bg_tai_xiu.addChild(this.tf_bet_xiu);

                this.btn_bet_tai.setVisible(false);
                this.btn_bet_xiu.setVisible(false);
            }


            this.initLichSu();

            this.addMasterLayer(this.bg_tai_xiu);
            this.bg_tai_xiu.setPosition(cc.p(this.bg_tai_xiu.getPosition().x, this.bg_tai_xiu.getPosition().y + 100));


            //closeLoading();
            this.updateTimeRutLoc();
            if (!cc.sys.isNative) {
                this.bg_tai_xiu.setScale(0.7);
            }
            if ('mouse' in cc.sys.capabilities) {
                this.mouseLis = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: function (event) {
                    },
                    onMouseMove: function (event) {
                        var pos = event.getLocation();
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (!cc.rectContainsPoint(rect, locationInNode)) {
                            taiXiu.hideToolTip();
                            taiXiu.nhayLichSu(taiXiu.lb_bet_tai);

                        } else {
                            var indexStartLichSu = taiXiu.arrLichSu.length - 22;
                            if (indexStartLichSu >= 0)
                                for (var i = 0; i < taiXiu.arrBtnLichSu.length; i++) {
                                    if (cc.rectContainsPoint(cc.rect(taiXiu.arrBtnLichSu[i].getPosition().x - 14, taiXiu.arrBtnLichSu[i].getPosition().y - 14, 28, 28), locationInNode)) {
                                        var str = "";
                                        if (taiXiu.arrLichSu[indexStartLichSu + i].phien != null) {
                                            str = "#" + taiXiu.arrLichSu[indexStartLichSu + i].phien + ": ";
                                            if (taiXiu.arrLichSu[indexStartLichSu + i].tong > 10) {
                                                str = str + "Tài (" + taiXiu.arrLichSu[indexStartLichSu + i].xx1 + " " + taiXiu.arrLichSu[indexStartLichSu + i].xx2 + " " + taiXiu.arrLichSu[indexStartLichSu + i].xx3 + ")";
                                            } else {
                                                str = str + "Xỉu (" + taiXiu.arrLichSu[indexStartLichSu + i].xx1 + " " + taiXiu.arrLichSu[indexStartLichSu + i].xx2 + " " + taiXiu.arrLichSu[indexStartLichSu + i].xx3 + ")";
                                            }
                                            taiXiu.showToolTip(str, taiXiu.arrBtnLichSu[i].getPosition());
                                        }
                                        if (!taiXiu.arrIsNhayLS[i]) {
                                            taiXiu.nhayLichSu(taiXiu.arrBtnLichSu[i]);
                                        }

                                        break;
                                    } else {
                                        taiXiu.hideToolTip();
                                    }
                                }


                        }

                    },
                    onMouseUp: function (event) {

                    }
                });

            } else {
            }
            if ('mouse' in cc.sys.capabilities) {
                cc.eventManager.addListener(this.mouseLis, this.bg_soicau);

            }
            subScribeTaiXiu(TAI_XIU_ID, MONEY_VIN);
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/TaiXiu/images/animationTX.plist");

            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    return (cc.rectContainsPoint(rect, locationInNode)) ;


                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                    //Move the position of current button sprite
                    var target = event.getCurrentTarget();
                    var delta = touch.getDelta();
                    target.x += delta.x;
                    target.y += delta.y;
                    var khoangCach = Math.sqrt(Math.pow(target.x - 389, 2) + Math.pow(target.y - 164, 2));
                    if (khoangCach > 390) {
                        if (taiXiu.isWaitingNan) {
                            if (taiXiu.tongxx < 11) {
                                actionNhayTaiXiu(taiXiu.sp_xiu);
                            } else {
                                actionNhayTaiXiu(taiXiu.sp_tai);
                            }
                            taiXiu.lb_dem_giay_ket_qua.setString(taiXiu.tongxx.toString());
                            taiXiu.sp_nan.setVisible(false);
                            cc.eventManager.pauseTarget(taiXiu.sp_nan, true);
                            taiXiu.isWaitingNan = false;
                            taiXiu.sp_nan.setPosition(cc.p(389, 164));
                        }


                    }

                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {


                }
            });

            cc.eventManager.addListener(listener1, this.sp_nan);

        },
        nhayLichSu: function (view) {
            var startLSx = 18;
            var startLSy = 20;
            var khoangCach = 29;
            for (var i = 0; i < this.arrBtnLichSu.length; i++) {
                if (this.arrBtnLichSu[i] == view) {
                    var moveB = cc.moveBy(0.2, cc.p(0, 8));
                    var actionByBack = moveB.reverse();
                    view.runAction(cc.repeatForever(cc.sequence(moveB, actionByBack)));
                    this.arrIsNhayLS[i] = true;

                } else {
                    if (this.arrIsNhayLS[i] == true) {
                        this.arrBtnLichSu[i].stopAllActions();
                        this.arrBtnLichSu[i].setPosition(cc.p(startLSx + i * khoangCach, startLSy));
                        this.arrIsNhayLS[i] = false
                    }


                }
            }

        },
        editBoxEditingDidBegin: function (editBox) {
            var str = editBox.getString();
            str = replaceAll(".", "", str);
            if (Number(str) >= 100) {
                taiXiu.btn_dong_y_web.setVisible(true);
            } else {
                taiXiu.btn_dong_y_web.setVisible(false);
            }

            if (editBox == taiXiu.tf_bet_tai) {

                taiXiu.betSide = 1;
                taiXiu.tf_bet_xiu.setString("");
            }
            else if (editBox == taiXiu.tf_bet_xiu) {
                taiXiu.betSide = 0;
                taiXiu.tf_bet_tai.setString("");
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            if (editBox.getString() == "0") {
                editBox.setString("");
            }
            taiXiu.btn_dong_y_web.setVisible(false);
        },

        editBoxTextChanged: function (editBox, text) {
            var str = editBox.getString();
            str = replaceAll(".", "", str);
            if (!isNumeric(str)) {
                str = str.substr(0, str.length - 1);
            }
            if (!isNumeric(str) || str == "0") {
                str = "";
            }
            if (Number(str) >= 100) {
                taiXiu.btn_dong_y_web.setVisible(true);
            } else {
                taiXiu.btn_dong_y_web.setVisible(false);
            }
            taiXiu.betValue = Number(str);
            //if(formatMoney(0,3,taiXiu.betValue) == "0")
            //    editBox.setString("");
            //else
            editBox.setString(formatMoney(0, 3, taiXiu.betValue));
        },

        editBoxReturn: function (editBox) {
            if (!cc.sys.isNative) {
                if (taiXiu.isDat) {

                    if (taiXiu.betValue > 0 && taiXiu.isWaittingBet == false) {
                        taiXiu.isWaittingBet = true;
                        taiXiu.isDat = false;
                        if (taiXiu.betSide == 1) {

                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, taiXiu.referenceId, taiXiu.betValue, taiXiu.moneyType, SIDE_TAI, taiXiu.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();
                        }
                        else {
                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, taiXiu.referenceId, taiXiu.betValue, taiXiu.moneyType, SIDE_XIU, taiXiu.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();
                        }
                    }
                }
            }
            return;
        },
        text_field_event: function (sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {

                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.2), cc.callFunc(function () {
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        if (Number(str) >= 100) {
                            taiXiu.btn_dong_y_web.setVisible(true);
                        } else {
                            taiXiu.btn_dong_y_web.setVisible(false);
                        }
                    })));
                    sender.setPlaceHolder("");
                    if (sender == taiXiu.tf_bet_tai) {

                        taiXiu.betSide = 1;
                        taiXiu.tf_bet_xiu.setString("");
                    }
                    else if (sender == taiXiu.tf_bet_xiu) {
                        taiXiu.betSide = 0;
                        taiXiu.tf_bet_tai.setString("");
                    }


                }
                    break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    sender.setPlaceHolder("Nhập số");
                    if (sender.getString() == 0) {
                        sender.setString("");
                    }
                    taiXiu.btn_dong_y_web.setVisible(false);
                }
                    break;

                case ccui.TextField.EVENT_INSERT_TEXT:
                    var str = sender.getString();
                    str = replaceAll(".", "", str);
                    if (!isNumeric(str)) {
                        str = str.substr(0, str.length - 1);
                    }
                    if (!isNumeric(str)) {
                        str = "0";
                    }
                    if (Number(str) >= 100) {
                        taiXiu.btn_dong_y_web.setVisible(true);
                    } else {
                        taiXiu.btn_dong_y_web.setVisible(false);
                    }
                    taiXiu.betValue = Number(str);
                    sender.setString(formatMoney(0, 3, taiXiu.betValue));
                    break;

                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    str = replaceAll(".", "", str);
                    taiXiu.betValue = Number(str);
                    sender.setString(formatMoney(0, 3, taiXiu.betValue));
                }
                    break;
            }

        },


        getKeyStr: function (keycode) {
            if (keycode == cc.KEY.none) {
                return "";
            }

            for (var keyTemp in cc.KEY) {
                if (cc.KEY[keyTemp] == keycode) {
                    return keyTemp;
                }
            }
            return "";
        },
        initLichSu: function () {
            var startLSx = 18;
            var startLSy = 20;
            var khoangCach = 29;
            for (var i = 0; i < 22; i++) {

                var btnLichSuPhien = new ccui.Button();
                if (i % 2 == 0) {
                    btnLichSuPhien.loadTextureNormal("res/Minigame/TaiXiu/images/sp_xiu.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/sp_xiu.png"));

                } else {
                    btnLichSuPhien.loadTextureNormal("res/Minigame/TaiXiu/images/sp_tai.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/sp_tai.png"));
                }
                btnLichSuPhien.setPosition(cc.p(startLSx + i * khoangCach, startLSy));
                btnLichSuPhien.setTag(21 - i);
                this.bg_soicau.addChild(btnLichSuPhien);

                this.arrBtnLichSu.push(btnLichSuPhien);
                this.arrIsNhayLS.push(false);

                btnLichSuPhien.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:

                            var rID = taiXiu.referenceId - sender.getTag() - 1;
                            openTXChiTietPhien(rID);
                            break;
                    }

                }, this);

            }
        },
        showToolTip: function (str, posi) {
            this.pToolTip.setVisible(true);
            this.lb_toolTip.setString(str);
            this.pToolTip.setPosition(posi.x, posi.y - 46);
        },
        hideToolTip: function () {
            this.pToolTip.setVisible(false);
        },
        updateLichSu: function () {
            if (this.arrLichSu.length >= 22) {
                var indexStartLichSu = this.arrLichSu.length - 22;
                for (var i = 0; i < this.arrBtnLichSu.length; i++) {
                    if (this.arrLichSu[indexStartLichSu + i].tong > 10) {
                        this.arrBtnLichSu[i].loadTextureNormal("res/Minigame/TaiXiu/images/sp_tai.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/sp_tai.png"));
                    } else {
                        this.arrBtnLichSu[i].loadTextureNormal("res/Minigame/TaiXiu/images/sp_xiu.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/sp_xiu.png"));
                    }
                }
                // openTXSoiCau(false);
            }
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case TaiXiuLayer.BTN_MONEY_TYPE:
                    this.changeRoom();

                    break;
                case TaiXiuLayer.BTN_CLOSE:

                    closeTaiXiu();
                    break;
                case TaiXiuLayer.BTN_SOI_CAU:
                    if (txSoiCauAppear) {
                        closeTXSoiCau();
                    } else

                        openTXSoiCau(true);
                    break;
                case TaiXiuLayer.BTN_LICH_SU:
                    openTXLSGD();
                    break;
                case TaiXiuLayer.BTN_TOP_USER:
                    openTXTopUser();
                    break;
                case TaiXiuLayer.BTN_HUONG_DAN:
                    // this.pHungdan.setVisible(true);
                    openTXHuongDan();

                    break;
                case TaiXiuLayer.BTN_DAT_TAI:

                    this.pBgKey.setVisible(true);
                    if (this.betSide != 1) {
                        this.betValue = 0;
                        this.changeBetValue(this.betValue);
                        this.betSide = 1;

                    }

                    break;
                case TaiXiuLayer.BTN_DAT_XIU:

                    this.pBgKey.setVisible(true);
                    if (this.betSide != 0) {
                        this.betValue = 0;
                        this.changeBetValue(this.betValue);
                        this.betSide = 0;
                        //this.betValue = 0;
                        //this.changeBetValue(this.betValue);
                    }
                    break;
                case TaiXiuLayer.BTN_CHANGE_KEY:
                    if (this.isKeyNhapNhanh) {
                        this.btn_change_key.setTitleText("CHỌN NHANH");
                        this.isKeyNhapNhanh = false;
                        this.pBgKeyNhapNhanh.setVisible(false);
                        this.pBgKeyNhapSo.setVisible(true);
                    }
                    else {
                        this.btn_change_key.setTitleText("SỐ KHÁC");
                        this.isKeyNhapNhanh = true;
                        this.pBgKeyNhapNhanh.setVisible(true);
                        this.pBgKeyNhapSo.setVisible(false);
                    }

                    this.betValue = 0;
                    this.changeBetValue(this.betValue);

                    break;
                case TaiXiuLayer.BTN_DONG_Y:
                    if (taiXiu.isWaittingBet == false) {
                        taiXiu.isWaittingBet = true;
                        if (this.betSide == 1) {
                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, this.referenceId, this.betValue, this.moneyType, SIDE_TAI, this.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();
                        }
                        else {
                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, this.referenceId, this.betValue, this.moneyType, SIDE_XIU, this.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();

                        }
                    }

                    this.pBgKey.setVisible(false);
                    break;
                case TaiXiuLayer.BTN_HUY:

                    this.betValue = 0;
                    this.changeBetValue(this.betValue);


                    this.pBgKey.setVisible(false);

                    break;
                case TaiXiuLayer.BTN_KEY1:
                    this.inputKeyNhapSo("1");

                    break;
                case TaiXiuLayer.BTN_KEY2:
                    this.inputKeyNhapSo("2");

                    break;
                case TaiXiuLayer.BTN_KEY3:
                    this.inputKeyNhapSo("3");

                    break;
                case TaiXiuLayer.BTN_KEY4:
                    this.inputKeyNhapSo("4");

                    break;
                case TaiXiuLayer.BTN_KEY5:
                    this.inputKeyNhapSo("5");
                    break;
                case TaiXiuLayer.BTN_KEY6:
                    this.inputKeyNhapSo("6");
                    break;
                case TaiXiuLayer.BTN_KEY7:
                    this.inputKeyNhapSo("7");
                    break;
                case TaiXiuLayer.BTN_KEY8:
                    this.inputKeyNhapSo("8");
                    break;
                case TaiXiuLayer.BTN_KEY9:
                    this.inputKeyNhapSo("9");
                    break;
                case TaiXiuLayer.BTN_KEY0:
                    this.inputKeyNhapSo("0");
                    break;
                case TaiXiuLayer.BTN_KEY000:
                    this.inputKeyNhapSo("000");
                    break;
                case TaiXiuLayer.BTN_KEYDELETE:

                    if (this.betValue < 10) {
                        this.betValue = 0;
                    } else {
                        var strBetValue = this.betValue.toString();
                        strBetValue = strBetValue.substr(0, strBetValue.length - 1);
                        this.betValue = Number(strBetValue);
                    }
                    this.changeBetValue(this.betValue);


                    break;

                case TaiXiuLayer.BTN_KEY1000:
                    this.inputKeyNhapNhanh(1000);
                    break;

                case TaiXiuLayer.BTN_KEY5000:
                    this.inputKeyNhapNhanh(5000);
                    break;
                case TaiXiuLayer.BTN_KEY10000:
                    this.inputKeyNhapNhanh(10000);
                    break;
                case TaiXiuLayer.BTN_KEY50000:
                    this.inputKeyNhapNhanh(50000);
                    break;
                case TaiXiuLayer.BTN_KEY100K:
                    this.inputKeyNhapNhanh(100000);
                    break;
                case TaiXiuLayer.BTN_KEY500K:
                    this.inputKeyNhapNhanh(500000);
                    break;
                case TaiXiuLayer.BTN_KEY1M:
                    this.inputKeyNhapNhanh(1000000);
                    break;
                case TaiXiuLayer.BTN_KEY10M:
                    this.inputKeyNhapNhanh(10000000);
                    break;
                case TaiXiuLayer.BTN_THANH_DU:
                    openTXThanhDu();
                    break;
                case TaiXiuLayer.BTN_RUT_LOC:
                    if (this.soLanRutLoc > 0) {
                        var taiXiuSend = new CmdSendRutLoc();
                        taiXiuSend.putRutLoc();
                        Minigame.miniGameClient.send(taiXiuSend);
                        taiXiuSend.clean();
                    } else {
                        this.toastTaiXiu("Bạn đã hết lượt rút lộc", 4);
                    }

                    break;
                case TaiXiuLayer.BTN_TAN_LOC:
                    // this.pBgKey.setVisible(true);
                    openTXTanLoc();
                    break;
                case TaiXiuLayer.BTN_DONG_Y_WEB:

                    if (taiXiu.isWaittingBet == false) {
                        taiXiu.isWaittingBet = true;
                        if (this.betSide == 1) {
                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, this.referenceId, this.betValue, this.moneyType, SIDE_TAI, this.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();

                        }
                        else {
                            var taiXiuSend = new CmdSendBetTaiXiu();
                            taiXiuSend.putBetTaiXiu(1, this.referenceId, this.betValue, this.moneyType, SIDE_XIU, this.remainTime);
                            Minigame.miniGameClient.send(taiXiuSend);
                            taiXiuSend.clean();

                        }
                    }
                    this.btn_dong_y_web.setVisible(false);
                    //this.btn_dong_y_web.setTouchEnabled(false);
                    //this.btn_dong_y_web.setOpacity(128);
                    break;
                case TaiXiuLayer.BTN_HU_LOC:
                    if (!this.pHuLoc.isVisible()) {
                        this.pHuLoc.setVisible(true);
                    } else {
                        this.pHuLoc.setVisible(false);
                    }

                    break;
                case TaiXiuLayer.BTN_NAN:
                    if (this.isNan) {
                        this.isNan = false;
                        this.btn_nan.loadTextureNormal("res/Minigame/TaiXiu/images/bonan.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/bonan.png"));
                    } else {
                        this.isNan = true;
                        this.btn_nan.loadTextureNormal("res/Minigame/TaiXiu/images/nan.png", GuiUtil.checkTextureType("res/Minigame/TaiXiu/images/nan.png"));
                    }
                    break;
            }
        },

        changeBetValue: function (betV) {
            if (this.betSide == 1) {
                this.btn_bet_tai.setTitleText(formatMoney(0, 3, betV));
            } else {
                this.btn_bet_xiu.setTitleText(formatMoney(0, 3, betV));
            }
        },
        formatMoney: function (n, x, number) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
        },
        inputKeyNhapSo: function (so) {

            if (this.betValue > 0) {
                var strSo = this.betValue.toString();
                if (Number(strSo + so) > 99999999999) {

                } else {
                    strSo = this.betValue.toString() + so;
                }
                this.betValue = Number(strSo);

            } else {
                this.betValue = Number(so);
            }
            this.changeBetValue(this.betValue);


        },
        inputKeyNhapNhanh: function (value) {

            if (this.betValue >= 99999999999) {

            } else {
                this.betValue = this.betValue + value;
                this.changeBetValue(this.betValue);
            }


        },
        changeRoom: function () {


            if (this.moneyType == MONEY_VIN) {
                var taiXiuSend = new CmdSendChangeRoom();
                taiXiuSend.putChangeRoom(TAI_XIU_ID, MONEY_VIN, MONEY_XU);
                Minigame.miniGameClient.send(taiXiuSend);
                taiXiuSend.clean();
                this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choixu.png", GuiUtil.checkTextureType("res/Minigame/ImageChung/choixu.png"));
                //this.moneyType = MONEY_XU;

            } else {
                var taiXiuSend = new CmdSendChangeRoom();
                taiXiuSend.putChangeRoom(TAI_XIU_ID, MONEY_XU, MONEY_VIN);
                Minigame.miniGameClient.send(taiXiuSend);
                taiXiuSend.clean();
                this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choivin.png", GuiUtil.checkTextureType("res/Minigame/ImageChung/choivin.png"));
                //this.moneyType = MONEY_VIN;
            }
            this.isChangeRoom = true;
            this.btn_money_type.setTouchEnabled(false);
            this.btn_money_type.setOpacity(128);
        },
        getLichSu: function () {
            var taiXiuSend = new CmdSendLichSuTaiXiu();
            taiXiuSend.putLichSuTaiXiu();
            Minigame.miniGameClient.send(taiXiuSend);
            taiXiuSend.clean();
        },
        //bắt đầu vào game
        responseTaiXiuInfo: function (gameId, moneyType, referenceTaiXiu, remainTimeInRound, bettingState, potTai, potXiu, betTai, betXiu, dice1, dice2, dice3, remainTimeRutLoc) {
            stopNhayTaiXiu();
            this.referenceId = referenceTaiXiu;
            this.lb_phien.setString("#" + referenceTaiXiu.toString());

            this.lb_bet_xiu.setString(formatMoney(0, 3, betXiu));
            this.lb_bet_tai.setString(formatMoney(0, 3, betTai));
            this.lb_tong_tai.setString(formatMoney(0, 3, potTai));
            this.lb_tong_xiu.setString(formatMoney(0, 3, potXiu));
            this.bettingState = bettingState;
            this.sp_nan.setVisible(false);
            this.isWaitingNan = false;
            this.sp_nan.setPosition(cc.p(389, 164));
            cc.eventManager.pauseTarget(taiXiu.sp_nan, true);


            var dice1 = dice1;
            var dice2 = dice2;
            var dice3 = dice3;

            this.timeRutLoc = remainTimeRutLoc;
            //this.timeStartTanLoc = new Date();

            this.moneyType = moneyType;
            if (this.moneyType == MONEY_VIN) {
                //this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choivin.png",ccui.Widget.PLIST_TEXTURE);
                this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choivin.png", GuiUtil.checkTextureType("res/Minigame/ImageChung/choivin.png"));
                this.lb_tong_tai.setColor(cc.color(254, 2, 222));
                this.lb_tong_xiu.setColor(cc.color(254, 2, 222));
                //this.moneyType = MONEY_VIN;

            } else {
                //this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choixu.png",ccui.Widget.PLIST_TEXTURE);
                this.btn_money_type.loadTextureNormal("res/Minigame/ImageChung/choixu.png", GuiUtil.checkTextureType("res/Minigame/ImageChung/choixu.png"));
                this.lb_tong_tai.setColor(cc.color(255, 255, 255));
                this.lb_tong_xiu.setColor(cc.color(255, 255, 255));

            }
            this.isChangeRoom = false;
            // this.btn_money_type.setTouchEnabled(true);
            //this.btn_money_type.setOpacity(255);
            if (cc.sys.isNative) {
                this.btn_bet_xiu.setEnabled(true);
                this.btn_bet_xiu.setBright(true);
                this.btn_bet_tai.setEnabled(true);
                this.btn_bet_tai.setBright(true);
            } else {
                this.tf_bet_tai.setVisible(true);
                this.tf_bet_xiu.setVisible(true);
            }

            this.sp_animation.setVisible(false);
            if (bettingState == true) {
                this.sp_xx1.setVisible(false);
                this.sp_xx2.setVisible(false);
                this.sp_xx3.setVisible(false);
                this.isStartPlay = false;
                this.lb_dem_giay_ket_qua.setString("");
                this.sp_bg_time_result.setVisible(false);

                this.remainTime = remainTimeInRound;
                if (remainTimeInRound > 9) {
                    this.lb_dem_giay_choi.setString("00:" + remainTimeInRound);
                    this.lb_dem_giay_choi.setColor(cc.color(255, 255, 255));

                } else {
                    this.lb_dem_giay_choi.setString("00:0" + remainTimeInRound);
                    if (remainTimeInRound > 5) {
                        this.lb_dem_giay_choi.setColor(cc.color(255, 255, 255));
                    } else {
                        this.lb_dem_giay_choi.setColor(cc.color(255, 0, 0));
                    }
                }
                if (cc.sys.isNative) {
                    this.btn_bet_xiu.setEnabled(true);
                    this.btn_bet_xiu.setBright(true);
                    this.btn_bet_tai.setEnabled(true);
                    this.btn_bet_tai.setBright(true);
                    this.btn_bet_tai.setTitleText("0");
                    this.btn_bet_xiu.setTitleText("0");
                } else {
                    this.tf_bet_tai.setVisible(true);
                    this.tf_bet_xiu.setVisible(true);
                }
                if (betTai > 0) {

                    if (cc.sys.isNative) {
                        this.btn_bet_tai.setEnabled(true);
                        this.btn_bet_tai.setBright(true);
                        this.btn_bet_xiu.setEnabled(false);
                        this.btn_bet_xiu.setBright(false);
                        this.btn_bet_xiu.setTitleText("");
                    } else {
                        this.tf_bet_tai.setVisible(true);
                        this.tf_bet_xiu.setVisible(false);
                    }
                }
                if (betXiu > 0) {

                    if (cc.sys.isNative) {
                        this.btn_bet_tai.setEnabled(false);
                        this.btn_bet_tai.setBright(false);
                        this.btn_bet_xiu.setEnabled(true);
                        this.btn_bet_xiu.setBright(true);
                        this.btn_bet_tai.setTitleText("");
                    } else {
                        this.tf_bet_tai.setVisible(false);
                        this.tf_bet_xiu.setVisible(true);
                    }
                }

            } else {
                this.sp_bg_time_result.setVisible(true);
                this.lb_dem_giay_choi.setString("");
                // this.btn_dat_tai.setEnable(false);
                // this.btn_dat_xiu.setEnable(false);

                this.sp_xx1.setVisible(true);
                this.sp_xx2.setVisible(true);
                this.sp_xx3.setVisible(true);
                taiXiu.sp_xx1.setVisible(true);
                this.resultLS.xx1 = dice1;
                this.resultLS.xx2 = dice2;
                this.resultLS.xx3 = dice3;
                this.resultLS.phien = this.referenceId;
                this.resultLS.tong = dice1 + dice2 + dice3;
                this.tongxx = dice1 + dice2 + dice3;
                if (dice1 != 0) {
                    taiXiu.sp_xx1.setSpriteFrame("res/Minigame/TaiXiu/images/xx1" + dice1 + ".png");
                }
                if (dice2 != 0) {
                    taiXiu.sp_xx2.setSpriteFrame("res/Minigame/TaiXiu/images/xx2" + dice2 + ".png");
                }
                if (dice3 != 0) {
                    taiXiu.sp_xx3.setSpriteFrame("res/Minigame/TaiXiu/images/xx3" + dice3 + ".png");
                }
                var tong = dice1 + dice2 + dice3;


                if (tong >= 3) {
                    this.lb_dem_giay_ket_qua.setString(tong.toString());

                    if (tong < 11) {
                        actionNhayTaiXiu(taiXiu.sp_xiu);
                    } else {
                        actionNhayTaiXiu(taiXiu.sp_tai);
                    }
                }

                if (remainTimeInRound > 15) {
                } else if (remainTimeInRound <= 15 && remainTimeInRound > 9) {
                    this.lb_dem_giay_ket_qua.setString("00:" + remainTimeInRound);
                } else {
                    this.lb_dem_giay_ket_qua.setString("00:0" + remainTimeInRound);
                }

            }

            this.btn_money_type.setTouchEnabled(true);
            this.btn_money_type.setOpacity(255);

        },
        //bắt đầu phiên mới
        responseStartNewGameTaiXiu: function (referenceId, remainTimeRutLoc) {
            this.isStartPlay = false;
            this.referenceId = referenceId;
            this.lb_phien.setString("#" + this.referenceId.toString());
            this.lb_dem_giay_choi.setString("");
            this.sp_bg_time_result.setVisible(false);
            this.lb_dem_giay_ket_qua.setString("");
            this.lb_bet_tai.setString("0");
            this.lb_bet_xiu.setString("0");
            this.lb_tong_tai.setString("");
            this.lb_tong_xiu.setString("");
            //this.sp_dia.setVisible(false);
            this.sp_xx1.setVisible(false);
            this.sp_xx2.setVisible(false);
            this.sp_xx3.setVisible(false);
            this.isDat = true;
            this.timeRutLoc = remainTimeRutLoc;
            this.stopAllActions();
            this.isWaitingNan = false;
            //this.isNan = false;
            if (this.sp_nan.isVisible()) {
                this.sp_nan.setVisible(false);
                this.sp_nan.setPosition(cc.p(389, 164));
                cc.eventManager.pauseTarget(taiXiu.sp_nan, true);
            }

            //this.timeStartTanLoc = new Date();
            if (cc.sys.isNative) {
                this.btn_bet_xiu.setEnabled(true);
                this.btn_bet_xiu.setBright(true);
                this.btn_bet_tai.setEnabled(true);
                this.btn_bet_tai.setBright(true);
                this.btn_bet_tai.setTitleText("0");
                this.btn_bet_xiu.setTitleText("0");
            } else {
                this.tf_bet_tai.setVisible(true);
                this.tf_bet_xiu.setVisible(true);
                //this.tf_bet_xiu.setDetachWithIME(true);
                //this.tf_bet_tai.setDetachWithIME(true);

            }

            if (this.arrLichSu[this.arrLichSu.length - 1].phien == this.resultLS.phien) {

            } else {
                this.arrLichSu.push(this.resultLS);
            }
            //if( txSoiCau != null)
            //{
            //    txSoiCau.arrLichSu = this.arrLichSu;
            //}
            this.updateLichSu();
            if (txSoiCau) {
                openTXSoiCau(false);
            }

            //this.sp_tai.stopAllActions();
            //this.sp_xiu.stopAllActions();
            stopNhayTaiXiu();
            this.sp_animation.stopAllActions();
            this.sp_animation.setVisible(false);

        },
        //Lấy lịch sử Phiên
        responseLichSuPhien: function (strLichSu) {
            var arrLs = strLichSu.split(",");
            while (this.arrLichSu.length > 0) {
                this.arrLichSu.pop();
            }
            for (var i = 0; i < arrLs.length; i++) {

                if (i % 3 == 2) {
                    var rsLS = new Object();
                    rsLS.xx1 = parseInt(arrLs[i - 2]);
                    rsLS.xx2 = parseInt(arrLs[i - 1]);
                    rsLS.xx3 = parseInt(arrLs[i]);
                    rsLS.tong = parseInt(arrLs[i - 2]) + parseInt(arrLs[i - 1]) + parseInt(arrLs[i]);

                    this.arrLichSu.push(rsLS);
                }
            }
            if (this.bettingState) {
                for (var i = 0; i < this.arrLichSu.length; i++) {
                    this.arrLichSu[i].phien = (this.referenceId - this.arrLichSu.length) + i;

                }
            } else {
                for (var i = 0; i < this.arrLichSu.length; i++) {
                    this.arrLichSu[i].phien = (this.referenceId - this.arrLichSu.length) + i + 1;

                }
            }


            if (this.arrLichSu.length < 22) {
                for (var i = 0; i < 100; i++) {
                    var randomXX1 = Math.floor((Math.random() * 6) + 1);
                    var randomXX2 = Math.floor((Math.random() * 6) + 1);
                    var randomXX3 = Math.floor((Math.random() * 6) + 1);
                    var randomTong = randomXX1 + randomXX2 + randomXX3;

                    var randomLS = new Object();
                    randomLS.xx1 = randomXX1;
                    randomLS.xx2 = randomXX2;
                    randomLS.xx3 = randomXX3;
                    randomLS.tong = randomTong;

                    this.arrLichSu.push(randomLS);
                }
            }


            //txSoiCau.arrLichSu = this.arrLichSu;
            //txSoiCau.reLoadSoiCau();

            this.updateLichSu();
            if (txSoiCau)
                openTXSoiCau(false);

        },
        //kết quả kết cộng trừ tiền thúc phiên
        responsePrizeTaiXiu: function (moneyType, totalMoney, currentMoney) {

            var dvTien = "";
            var strKetQua = "";
            if (moneyType == this.moneyType) {
                if (moneyType == MONEY_VIN) {
                    dvTien = " VIN";
                } else {
                    dvTien = " XU";
                }

                if (totalMoney > 0) {
                    if (this.isNan) {
                        this.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.1), cc.callFunc(function () {
                            if (taiXiu.bettingState == false && taiXiu.remainTime <= 15) {
                                lobby.updateMoney(currentMoney, moneyType);
                                strKetQua = strKetQua + "+ " + formatMoney(0, 3, totalMoney) + dvTien;
                                if (moneyType == MONEY_VIN) {
                                    taiXiu.effectShowMoney(strKetQua, 1, colorMoneyVin);

                                } else {
                                    taiXiu.effectShowMoney(strKetQua, 1, colorMoneyXu);
                                }
                                taiXiu.stopAllActions();
                            }
                        }))));
                    } else {
                        lobby.updateMoney(currentMoney, moneyType);
                        strKetQua = strKetQua + "+ " + formatMoney(0, 3, totalMoney) + dvTien;
                        if (moneyType == MONEY_VIN) {
                            this.effectShowMoney(strKetQua, 1, colorMoneyVin);

                        } else {
                            this.effectShowMoney(strKetQua, 1, colorMoneyXu);
                        }
                    }


                }
                //var str = formatMoney(0,3,strKetQua);
                // lobby.updateMoney(cmd.currentMoney,cmd.moneyType);

            }


        },
//trả về khi đặt cửa thành công
        responseBetTaiXiuSuccess: function (result, currentMoney) {
            this.isWaittingBet = false;
            lobby.updateMoney(currentMoney, this.moneyType);
            if (result == 0) {

                if (this.betSide == 0) {
                    var betValue = parseFloat(replaceAll(".", "", this.lb_bet_xiu.getString())) + this.betValue;
                    this.lb_bet_xiu.setString(this.formatMoney(0, 3, betValue));

                    if (cc.sys.isNative) {
                        this.btn_bet_tai.setEnabled(false);
                        this.btn_bet_tai.setBright(false);
                        this.btn_bet_tai.setTitleText("");
                        this.btn_bet_xiu.setTitleText("0");


                    } else {
                        this.tf_bet_tai.setVisible(false);
                        this.tf_bet_tai.setString("");
                        this.tf_bet_xiu.setString("");
                        //this.tf_bet_xiu.setDetachWithIME(true);
                        //this.tf_bet_tai.setDetachWithIME(true);
                    }


                } else {
                    var betValue = parseFloat(replaceAll(".", "", this.lb_bet_tai.getString())) + this.betValue;
                    this.lb_bet_tai.setString(this.formatMoney(0, 3, betValue));

                    if (cc.sys.isNative) {
                        this.btn_bet_xiu.setEnabled(false);
                        this.btn_bet_xiu.setBright(false);
                        this.btn_bet_xiu.setTitleText("");
                        this.btn_bet_tai.setTitleText("0");
                    } else {
                        this.tf_bet_xiu.setVisible(false);
                        this.tf_bet_tai.setString("");
                        this.tf_bet_xiu.setString("");
                        //this.tf_bet_xiu.setDetachWithIME(true);
                        //this.tf_bet_tai.setDetachWithIME(true);
                    }
                }
                this.betValue = 0;
                this.toastTaiXiu("Đặt cửa thành công", 3);
            } else if (result == 1) {
                this.toastTaiXiu("Đặt cửa không thành công", 3);
            } else if (result == 2) {
                this.toastTaiXiu("Quá thời gian đặt", 3);
            }
            else if (result == 3) {
                this.toastTaiXiu("Không đủ số dư", 3);
            } else if (result == 4) {
                this.toastTaiXiu("Số tiền phải lớn hơn 100", 3);
            } else if (result == 5) {
                this.toastTaiXiu("Đã đặt ở cửa khác", 3);
            }
            //if(cc.sys.isNative)
            //{
            //    //this.btn_bet_tai.setTitleText("0");
            //    //this.btn_bet_xiu.setTitleText("0");
            //}else
            //{
            //    this.tf_bet_tai.setString("");
            //    this.tf_bet_xiu.setString("");
            //}
            this.isDat = true;


        },
//kết quả Xúc Xắc
        responseTaiXiu: function (result, dice1, dice2, dice3) {

            // this.sp_dia.setVisible(true);
            this.sp_animation.setVisible(true);
            this.lb_dem_giay_choi.setString("");
            this.tongxx = dice1 + dice2 + dice3;
            //var xucXac = dices.split(",");

            this.sp_animation.runAction(cc.sequence(
                actionTungXX(),
                cc.callFunc(function () {
                    if (taiXiu.isNan) {
                        taiXiu.sp_nan.setVisible(true);
                        taiXiu.isWaitingNan = true;
                        cc.eventManager.resumeTarget(taiXiu.sp_nan, true);
                    }
                    taiXiu.sp_animation.setVisible(false);
                    taiXiu.sp_xx1.setVisible(true);
                    taiXiu.sp_xx1.setSpriteFrame("res/Minigame/TaiXiu/images/xx1" + dice1 + ".png");
                    taiXiu.sp_xx2.setVisible(true);
                    taiXiu.sp_xx2.setSpriteFrame("res/Minigame/TaiXiu/images/xx2" + dice2 + ".png");
                    taiXiu.sp_xx3.setVisible(true);
                    taiXiu.sp_xx3.setSpriteFrame("res/Minigame/TaiXiu/images/xx3" + dice3 + ".png");

                }), cc.delayTime(0.5),
                cc.callFunc(function () {
                    if (!taiXiu.isNan) {
                        if (result == 0) {
                            actionNhayTaiXiu(taiXiu.sp_xiu);
                        } else {
                            actionNhayTaiXiu(taiXiu.sp_tai);
                        }
                        //taiXiu.tongxx = dice1 + dice2 + dice3;
                        taiXiu.lb_dem_giay_ket_qua.setString(taiXiu.tongxx.toString());
                        taiXiu.sp_bg_time_result.setVisible(true);
                    }

                })
                )
            );

            if (this.arrLichSu.length >= 120) {
                this.arrLichSu.splice(0, 60);
            }

            this.resultLS = new Object();
            this.resultLS.xx1 = dice1;
            this.resultLS.xx2 = dice2;
            this.resultLS.xx3 = dice3;
            this.resultLS.tong = dice1 + dice2 + dice3;
            this.resultLS.phien = this.referenceId;


        },
//update Game
        responseUpdateTaiXiu: function (remainTime, bettingState, potTai, potXiu, userTai, userXiu) {
            this.lb_tong_tai.setString(formatMoney(0, 3, potTai));
            this.lb_tong_xiu.setString(formatMoney(0, 3, potXiu));
            this.lb_user_tai.setString("(" + formatMoney(0, 3, userTai) + ")");
            this.lb_user_xiu.setString("(" + formatMoney(0, 3, userXiu) + ")");
            this.bettingState = bettingState;
            this.remainTime = remainTime;
            if (bettingState == true) {

                if (remainTime > 9) {
                    this.lb_dem_giay_choi.setString("00:" + remainTime);

                    this.lb_dem_giay_choi.setColor(cc.color(255, 255, 255));
                } else {
                    this.lb_dem_giay_choi.setString("00:0" + remainTime);

                    if (remainTime < 6) {
                        this.lb_dem_giay_choi.setColor(cc.color(255, 0, 0));
                    }
                }

            } else {
                this.betValue = 0;
                this.tf_bet_tai.setString("");
                this.tf_bet_xiu.setString("");
                this.btn_dong_y_web.setVisible(false);
                this.lb_dem_giay_choi.setString("");
                this.sp_bg_time_result.setVisible(true);

                //if(this.isStartPlay == true)
                //{
                //    if(remainTime > 9)
                //    {
                //        this.lb_dem_giay_ket_qua.setString("00:" + remainTime);
                //
                //    }else
                //    {
                //        this.lb_dem_giay_ket_qua.setString("00:0" + remainTime);
                //    }
                //}else
                //{
                if (remainTime > 15) {
                    if (this.isWaitingNan) {
                        //this.sp_nan.setVisible(true);
                        this.lb_dem_giay_ket_qua.setString("00:" + remainTime);
                    } else {
                        //if(remainTime < 27)
                        //    taiXiu.lb_dem_giay_ket_qua.setString(taiXiu.tongxx.toString());
                        //else
                        //    this.lb_dem_giay_ket_qua.setString("00:" + remainTime);
                    }

                } else {
                    if (this.sp_nan.isVisible()) {
                        cc.eventManager.pauseTarget(taiXiu.sp_nan, true);
                    }
                    this.sp_nan.setVisible(false);
                    this.isWaitingNan = false;
                    this.sp_nan.setPosition(cc.p(389, 164));
                    if (remainTime <= 15 && remainTime > 9) {
                        this.lb_dem_giay_ket_qua.setString("00:" + remainTime);
                    } else {
                        this.lb_dem_giay_ket_qua.setString("00:0" + remainTime);
                    }
                    if (remainTime == 15) {
                        if (this.tongxx < 11) {
                            actionNhayTaiXiu(taiXiu.sp_xiu);
                        } else {
                            actionNhayTaiXiu(taiXiu.sp_tai);
                        }
                    }

                    //taiXiu.tongxx = dice1 + dice2 + dice3;

                    taiXiu.sp_bg_time_result.setVisible(true)
                }

                //       }

                if (cc.sys.isNative) {
                    this.btn_bet_xiu.setEnabled(false);
                    this.btn_bet_xiu.setBright(false);
                    this.btn_bet_tai.setEnabled(false);
                    this.btn_bet_tai.setBright(false);
                    this.btn_bet_tai.setTitleText("");
                    this.btn_bet_xiu.setTitleText("");
                } else {
                    this.tf_bet_tai.setVisible(false);
                    this.tf_bet_xiu.setVisible(false);
                }
            }

        },
        updateTimeRutLoc: function () {
            var seq = cc.sequence(cc.delayTime(1), cc.callFunc(function () {

                if (taiXiu.timeRutLoc > 0) {
                    taiXiu.timeRutLoc--;

                    taiXiu.lb_time_rut_loc.setString("RÚT LỘC " + taiXiu.convertIntToTime(taiXiu.timeRutLoc));
                } else if (taiXiu.timeRutLoc == 0) {
                    taiXiu.lb_time_rut_loc.setString("RÚT LỘC " + taiXiu.convertIntToTime(taiXiu.timeRutLoc));
                }
                taiXiu.updateTimeRutLoc();
            }));
            this.lb_time_rut_loc.runAction(seq);
            //if(this.timeRutLoc == 30)
            //    this.startRutLoc();
        },
        responseRutLoc: function (prize, currentMoney) {
            lobby.updateMoney(currentMoney, MONEY_VIN);
            if (prize == -1) {
                this.toastTaiXiu("Rút Lộc Không thành công! Chờ 30 giây cuối cùng nhé.", 4);
            } else if (prize == 0) {
                this.toastTaiXiu("Chúc bạn may mắn lần sau!", 4);
            } else if (prize > 0) {
                this.toastTaiXiu("Bạn rút lộc được " + formatMoney(0, 3, prize) + " VIN.", 4);
            }
            else if (prize == -3) {
                this.toastTaiXiu("Quỹ lộc không đủ.", 4);
            }
            else if (prize == -2) {
                this.toastTaiXiu("Bạn đã hết lượt rút lộc.", 4);
            }


        },
        responseTanLoc: function (result, currentMoney) {
            lobby.updateMoney(currentMoney, MONEY_VIN);
            if (result == 0) {
                this.toastTaiXiu("Tán lộc thành công. Chúc bạn gặp nhiều may mắn!", 4);
            } else if (result == 1) {
                this.toastTaiXiu("Tán lộc không thành công!", 4);
            } else if (result = 2) {
                this.toastTaiXiu("Bạn không đủ VIN", 4);
            }
            else if (result = 3) {
                this.toastTaiXiu("Tán lộc phải lớn hơn 1.000 VIN", 4);
            }


        },
        responseUpdateHuLoc: function (value) {
            if (value >= 1000000000)
                this.lb_hu_loc.setFontSize(22);
            else
                this.lb_hu_loc.setFontSize(26);
            this.lb_hu_loc.setString(formatMoney(0, 3, value));

        },
        responseStartRutLoc: function (remainTime) {
            this.timeRutLoc = remainTime;
            this.lb_time_rut_loc.setString("RÚT LỘC " + this.convertIntToTime(this.timeRutLoc));

            this.lb_time_rut_loc.stopAllActions();
            this.btn_rut_loc.stopAllActions();
            this.lb_time_rut_loc.setScale(1);
            this.btn_rut_loc.setScale(1);
            this.updateTimeRutLoc();

            //this.timeStartTanLoc = new Date();
        },
        responseUpdateLuotRutLoc: function (soLuot) {
            this.soLanRutLoc = soLuot;
            this.lb_so_lan_rut_loc.setString(soLuot);
        },
        startRutLoc: function () {
            this.timeRutLoc = 30;

            this.lb_time_rut_loc.setString("RÚT LỘC " + this.convertIntToTime(this.timeRutLoc));

            this.lb_time_rut_loc.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.15, 1))));
            this.btn_rut_loc.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.15, 1))));
        },
        convertIntToTime: function (value) {
            var strTime = "";
            if (value >= 0) {
                var phut = Math.floor(value / 60);
                var giay = value % 60;
                if (phut < 10) {
                    strTime = "0" + phut;
                } else {
                    strTime = phut.toString();
                }
                if (giay < 10) {
                    strTime = strTime + ":" + "0" + giay;
                } else {
                    strTime = strTime + ":" + giay;
                }
            }


            return strTime;

        },


        effectShowMoney: function (message, timeShow, colorLB) {
            var wbg = this.bg_tai_xiu.getContentSize().width;
            var hbg = this.bg_tai_xiu.getContentSize().height;
            if (this.bg_tai_xiu.getChildByTag(9999) != null) {
                // this.bg_tai_xiu.getChildByName("moneyShow123").removeAllChildren(true);
                this.bg_tai_xiu.removeChildByTag(9999, true);

            }
            var lb = new cc.LabelTTF(message, fontRobotoBlack.fontName, 32);
            lb.setName("moneyShow123");
            lb.setTag(9999);
            lb.setString(message);
            lb.setPosition(cc.p(wbg / 2, hbg / 2 + 70));
            this.bg_tai_xiu.addChild(lb);

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

        //toastTaiXiu: function(message,timeShow, colorLable)
        //{
        //    var wbg = this.bg_tai_xiu.getContentSize().width;
        //    if(this.getChildByTag(999)!=null)
        //    {
        //        this.getChildByTag(999).removeAllChildren(true);
        //        this.bg_tai_xiu.removeChildByTag(999,true);
        //    }
        //
        //    var layer = new cc.LayerColor(cc.color(245, 170, 8));
        //    layer.setOpacity(90);
        //
        //    layer.setName("tostTaiXiu");
        //
        //
        //    layer.setTag(999);
        //
        //    var label1 = new cc.LabelTTF(message, "Arial", 28);
        //    layer.addChild(label1);
        //    var w = label1.getContentSize().width;
        //    layer.setContentSize(cc.size(w + 10,40))
        //    layer.setPosition(wbg/2-w/2,40);
        //    if(colorLable!=null)
        //    {
        //        label1.color = colorLable;
        //    }else
        //    {
        //        label1.color = cc.color(255, 255, 255);
        //    }
        //
        //    //label1.color = cc.color(241, 224, 99);
        //    label1.x = (w+10)/2;
        //    label1.y = 20;
        //    //label1.opacity = 0;
        //    var fadeOut = cc.fadeOut(2);
        //    var fadeIn = cc.fadeIn(0.5);
        //    var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut,  cc.callFunc(function(){
        //       // label1.setVisible(false);
        //    }));
        //
        //    taiXiu.bg_tai_xiu.addChild(layer, 999);
        //    //var forever = seq.repeatForever();
        //    layer.runAction(seq);
        //    label1.runAction(seq.clone());
        //
        //
        //}
        toastTaiXiu: function (message, timeShow, colorLable) {
            var wbg = this.bg_tai_xiu.getContentSize().width;
            if (this.getChildByTag(999) != null) {
                this.getChildByTag(999).removeAllChildren(true);
                this.bg_tai_xiu.removeChildByTag(999, true);
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
            layer.setPosition(wbg / 2, 60);
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

            this.bg_tai_xiu.addChild(layer, 999);
            //var forever = seq.repeatForever();
            layer.runAction(seq);
            label1.runAction(seq.clone());


        }

    }
)


function actionTungXX() {
    taiXiu.sp_xx1.setVisible(false);
    taiXiu.sp_xx2.setVisible(false);
    taiXiu.sp_xx3.setVisible(false);
    cc.spriteFrameCache.addSpriteFrames("res/Minigame/TaiXiu/images/animationTX.plist");
    var animFrames = [];
    var str = "";

    for (var i = 1; i < 20; i++) {
        str = "Minigame/TaiXiu/images/animation" + i + ".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrame = new cc.AnimationFrame();
        animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
    }
    var animation = cc.Animation.create(animFrames, 0.05, 1);
    var animate = cc.Animate.create(animation);
    return animate;
}

function actionNhayTaiXiu(sprite) {
    stopNhayTaiXiu();

    sprite.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.scaleTo(0.15, 1.1), cc.scaleTo(0.15, 1)), cc.sequence(cc.delayTime(0.15), cc.callFunc(function () {
        if (sprite == taiXiu.sp_tai) {
            GuiUtil.changeSprite(sprite, "res/Minigame/TaiXiu/images/tai1.png");
        } else {
            GuiUtil.changeSprite(sprite, "res/Minigame/TaiXiu/images/xiu1.png");
        }
    }), cc.delayTime(0.15), cc.callFunc(function () {
        if (sprite == taiXiu.sp_tai) {
            sprite.setSpriteFrame("res/Minigame/TaiXiu/images/txtTai.png");
        } else {
            sprite.setSpriteFrame("res/Minigame/TaiXiu/images/txtXiu.png");
        }
    })))));

}
function stopNhayTaiXiu() {
    taiXiu.sp_tai.stopAllActions();
    taiXiu.sp_xiu.stopAllActions();
    taiXiu.sp_tai.setScale(1);
    taiXiu.sp_xiu.setScale(1);
    taiXiu.sp_tai.setSpriteFrame("res/Minigame/TaiXiu/images/txtTai.png");
    taiXiu.sp_xiu.setSpriteFrame("res/Minigame/TaiXiu/images/txtXiu.png");

}

function betTaiXiu(betValue, moneyType, betSide, timeInput, userId, referenceId) {


}


openTaiXiu = function () {
    if (taiXiu === null) {

        taiXiu = new TaiXiuLayer();
        taiXiuX = taiXiu.getPosition().x;
        taiXiuY = taiXiu.getPosition().y;
        BaseScene.MINI_GAME_GUI.addChild(taiXiu);


    } else {
        taiXiu.setVisible(true);
        taiXiu.bg_tai_xiu.setVisible(true);
        cc.eventManager.resumeTarget(taiXiu.bg_tai_xiu, true);
        subScribeTaiXiu(TAI_XIU_ID, MONEY_VIN);
        taiXiu.reOpenLayer(taiXiu.bg_tai_xiu);
    }
    taiXiuAppear = true;

};
closeTaiXiu = function () {
    if (taiXiu === null) {
        return;
    }
    if (taiXiuAppear) {
        taiXiu.closeLayer(taiXiu.bg_tai_xiu);
        if (txChiTietPhien != null) {
            closeTXChiTietPhien();
        }
        if (txHuongDan != null) {
            closeTXHuongDan();
        }
        if (txHuongDan != null) {
            closeTXLSGD();
        }

        if (txSoiCau != null) {
            closeTXSoiCau();
        }

        if (txThanhDu != null) {
            closeTXThanhDu();
        }

        if (txTopUser != null) {
            closeTXTopUser();
        }

        if (txTanLoc != null) {
            closeTXTanLoc();
        }


        taiXiu.setVisible(false);

        taiXiuAppear = false;
        cc.eventManager.pauseTarget(taiXiu.bg_tai_xiu, true);
        taiXiu.betValue = 0;
        taiXiu.changeBetValue(taiXiu.betValue);
        if (menutab.Islogout) {

        } else {

            var taiXiuSend = new CmdSendUnscribe();
            taiXiuSend.putUnsubScribe(TAI_XIU_ID, taiXiu.moneyType);
            Minigame.miniGameClient.send(taiXiuSend);
            taiXiuSend.clean();
        }
    }
};


TaiXiuLayer.BTN_DAT_TAI = 1;
TaiXiuLayer.BTN_DAT_XIU = 2;

TaiXiuLayer.BTN_CHANGE_KEY = 3;
TaiXiuLayer.BTN_DONG_Y = 4;
TaiXiuLayer.BTN_HUY = 5;

TaiXiuLayer.BTN_KEY1 = 6;
TaiXiuLayer.BTN_KEY2 = 7;
TaiXiuLayer.BTN_KEY3 = 8;
TaiXiuLayer.BTN_KEY4 = 9;
TaiXiuLayer.BTN_KEY5 = 10;
TaiXiuLayer.BTN_KEY6 = 11;
TaiXiuLayer.BTN_KEY7 = 12;
TaiXiuLayer.BTN_KEY8 = 13;
TaiXiuLayer.BTN_KEY9 = 14;
TaiXiuLayer.BTN_KEY0 = 15;
TaiXiuLayer.BTN_KEY000 = 16;
TaiXiuLayer.BTN_KEYDELETE = 17;

TaiXiuLayer.BTN_KEY1000 = 18;
TaiXiuLayer.BTN_KEY5000 = 19;
TaiXiuLayer.BTN_KEY10000 = 20;
TaiXiuLayer.BTN_KEY50000 = 21;
TaiXiuLayer.BTN_KEY100K = 22;
TaiXiuLayer.BTN_KEY500K = 23;
TaiXiuLayer.BTN_KEY1M = 24;
TaiXiuLayer.BTN_KEY10M = 25;

TaiXiuLayer.BTN_MONEY_TYPE = 26;
TaiXiuLayer.BTN_CLOSE = 27;
TaiXiuLayer.BTN_SOI_CAU = 28;
TaiXiuLayer.BTN_LICH_SU = 29;
TaiXiuLayer.BTN_TOP_USER = 30;
TaiXiuLayer.BTN_HUONG_DAN = 31;


TaiXiuLayer.BTN_THANH_DU = 32;

TaiXiuLayer.BTN_RUT_LOC = 33;
TaiXiuLayer.BTN_TAN_LOC = 34;
TaiXiuLayer.BTN_DONG_Y_WEB = 35;
TaiXiuLayer.BTN_HU_LOC = 36;
TaiXiuLayer.BTN_NAN = 37;






