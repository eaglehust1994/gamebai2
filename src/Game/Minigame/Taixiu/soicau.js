var txSoiCau = null;
var txSoiCauX = 0;
var txSoiCauY = 0;
var txSoiCauAppear = false;

var TXSoiCauLayer;
TXSoiCauLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXSoiCau");
            // this.initWithBinaryFile("res/TXSoiCau.json");
            this.arrLichSu = null;
            this.pSoiCauTaiXiu = null;
            this.pSoiCauTaiXiu1 = null;
            this.pSoiCauTaiXiu2 = null;


            this.btn_close_soi_cau = null;
            this.btn_close_soi_cau1 = null;
            this.btn_close_soi_cau2 = null;
            this.btn_neck_soi_cau = null;
            this.btn_back_soi_cau = null;
            this.lb_phien_gan_nhat = null;
            this.lb__ket_qua_phien_gan_nhat = null;
            this.cb_soi_cau_xx1 = null;
            this.cb_soi_cau_xx2 = null;
            this.cb_soi_cau_xx3 = null;

            this.lb_tai_soi_cau1 = null;
            this.lb_xiu_soi_cau1 = null;
            this.lb_tai_soi_cau2 = null;
            this.lb_xiu_soi_cau2 = null;
            this.arrLbSoiCau = [];
            this.arrDotSoiCau = [];
            this.arrArcSoiCau = [];
            this.mouseLis = null;
            this.pToolTip = null;
            this.lb_phien_tooltip = null;
            this.lb_ket_qua_tooltip = null;


            this.dc1 = null;
            this.dcXX1 = null;
            this.dcXX2 = null;
            this.dcXX3 = null;
            this.dc2 = null;
        },
        customizeGUI: function () {
            this.resourcePath = "res/Minigame/TaiXiu/images/";
            this.pSoiCauTaiXiu = this.addLayoutStructure(this, "_layout", cc.p(641.34, 362.01), "", cc.size(776.00, 638.00), false);
            this.createPSoiCauTaiXiu1();
            this.createPSoiCauTaiXiu2();
            this.createOther();
            this.onCreate();

        },

        createPSoiCauTaiXiu1: function () {
            var layout = this.addLayoutStructure(this._layout, "pSoiCauTaiXiu1", cc.p(0.00, 0.00), "", cc.size(776.00, 638.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            this.addSpriteStructureWithoutResourcePath(layout, "pSoiCauTaiXiu1_bg", cc.p(388, 319), this.commonImagePath + "bg_soicau1.png");
            this.addButtonStructure(layout, "btn_close_soi_cau1", TXSoiCauLayer.BTN_CLOSE_SOI_CAU1, cc.p(719.92, 581.17), true, [this.resourcePath + "btn_close.png", this.resourcePath + "btn_close_s.png"]);
            var checkboxImages = ["res/Lobby/bg_checkbox.png", "res/Lobby/bg_checkbox.png", "res/Lobby/nodecheckbox.png", "res/Lobby/bg_checkbox.png", "res/Lobby/nodecheckbox.png"];
            this.addCheckBoxStructure(layout, "cb_soi_cau_xx1", cc.p(180.77, 58.00), true, checkboxImages, ccui.Widget.PLIST_TEXTURE);
            this.addCheckBoxStructure(layout, "cb_soi_cau_xx2", cc.p(354.22, 58.00), true, checkboxImages, ccui.Widget.PLIST_TEXTURE);
            this.addCheckBoxStructure(layout, "cb_soi_cau_xx3", cc.p(522.16, 58.00), true, checkboxImages, ccui.Widget.PLIST_TEXTURE);
            this.addTextStructure(layout, "Text_3", cc.p(249.42, 58.00), "Xúc Xắc 1", fontRobotoMedium.fontName, 20, "#FFFF00");
            this.addTextStructure(layout, "Text_3_0", cc.p(420.10, 58.00), "Xúc Xắc 2", fontRobotoMedium.fontName, 20, "#90EE90");
            this.addTextStructure(layout, "Text_3_1", cc.p(588.61, 58.00), "Xúc Xắc 3", fontRobotoMedium.fontName, 20, "#FF0000");
            this.addTextStructure(layout, "Text_3_1", cc.p(588.61, 58.00), "Xúc Xắc 3", fontRobotoMedium.fontName, 20, "#FF0000");
            this.addTextStructure(layout, "lb_phien_gan_nhat", cc.p(286.00, 585.00), "Phiên gần nhất (#23456)", fontRobotoMedium.fontName, 20, "#FFFFFF");
            this.lb_phien_gan_nhat.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "Text_1", cc.p(75.00, 350.00), "0", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_0", cc.p(75.00, 380.00), "3", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_1", cc.p(75.00, 410.00), "6", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_2", cc.p(75.00, 440.00), "9", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_3", cc.p(75.00, 470.00), "12", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_4", cc.p(75.00, 500.00), "15", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_5", cc.p(75.00, 530.00), "18", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_6", cc.p(75.00, 100.00), "0", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_0_0", cc.p(75.00, 130.00), "1", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_1_0", cc.p(75.00, 160.00), "2", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_2_0", cc.p(75.00, 190.00), "3", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_3_0", cc.p(75.00, 220.00), "4", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_4_0", cc.p(75.00, 250.00), "5", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "Text_1_5_0", cc.p(75.00, 280.00), "6", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(layout, "lb__ket_qua_phien_gan_nhat", cc.p(506.00, 585.00), "TÀI 15(4-5-6)", fontRobotoMedium.fontName, 20, "#FFFFFF");
            this.lb__ket_qua_phien_gan_nhat.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        },

        createPSoiCauTaiXiu2: function () {
            var layout = this.addLayoutStructure(this._layout, "pSoiCauTaiXiu2", cc.p(0.00, 0.00), "", cc.size(776.00, 638.00), false, {
                anchorX: 0,
                anchorY: 0
            });
            this.addSpriteStructureWithoutResourcePath(layout, "pSoiCauTaiXiu2_bg", cc.p(388, 319), this.commonImagePath + "bg_soicau1.png");
            this.addButtonStructure(layout, "btn_close_soi_cau2", TXSoiCauLayer.BTN_CLOSE_SOI_CAU2, cc.p(722.17, 585.54), true, [this.resourcePath + "btn_close.png", this.resourcePath + "btn_close_s.png"]);
            this.addSpriteStructure(layout, "bg_soicau_xiu_20", cc.p(458.00, 563.00), "bg_soicau_xiu.png");
            this.addSpriteStructure(layout, "bg_soicau_tai_19", cc.p(318.00, 563.00), "bg_soicau_tai.png");
            this.addSpriteStructure(layout, "bg_soicau_xiu_20_0", cc.p(458.00, 310.00), "bg_soicau_xiu.png");
            this.addSpriteStructure(layout, "bg_soicau_tai_19_0", cc.p(318.00, 310.00), "bg_soicau_tai.png");
            this.addTextStructure(layout, "lb_tai_soi_cau2", cc.p(318.00, 310.00), "TÀI: 20", fontRobotoBlack.fontName, 20, "#00FFFF");
            this.addTextStructure(layout, "lb_xiu_soi_cau2", cc.p(458.00, 310.00), "XỈU: 20", fontRobotoBlack.fontName, 20, "#000000");
            this.addTextStructure(layout, "lb_tai_soi_cau1", cc.p(318.00, 563.00), "TÀI: 20", fontRobotoBlack.fontName, 20, "#00FFFF");
            this.addTextStructure(layout, "lb_xiu_soi_cau1", cc.p(458.00, 563.00), "XỈU: 20", fontRobotoBlack.fontName, 20, "#00FFFF");


            var pToolTip = this.addLayoutStructure(layout, "pToolTip", cc.p(252.66, 395.98), "tooltip01.png", cc.size(123.00, 58.00), false);
            this.addTextStructure(pToolTip, "lb_phien_tooltip", cc.p(66.00, 44.00), "Phiên: #123456", fontRobotoMedium.fontName, 16, "#FFFFFF");
            this.addTextStructure(pToolTip, "lb_ket_qua_tooltip", cc.p(66.00, 25.00), "Tài (6,6,6)", fontRobotoMedium.fontName, 20, "#FFFFFF", {__size: cc.size(123.00, 16.00)});
        },

        createOther: function () {
            this.addButtonStructure(this._layout, "btn_close_soi_cau", TXSoiCauLayer.BTN_CLOSE_SOI_CAU, cc.p(721.58, 582.48), true, [this.resourcePath + "btn_close.png", this.resourcePath + "btn_close_s.png"]);
            this.addButtonStructure(this._layout, "btn_neck_soi_cau", TXSoiCauLayer.BTN_NECK_SOI_CAU, cc.p(726.00, 319.00), true, [this.resourcePath + "mt1.png", this.resourcePath + "mt9.png"], {
                scaleY: 0.5,
                scaleX: 0.5
            });
            this.addButtonStructure(this._layout, "btn_back_soi_cau", TXSoiCauLayer.BTN_BACK_SOI_CAU, cc.p(50.00, 319.00), true, [this.resourcePath + "mt1.png", this.resourcePath + "mt9.png"], {
                scaleY: 0.5,
                scaleX: 0.5,
                rotationX: 180,
                rotationY: 180
            });
        },

        onCreate: function () {
            this.arrLichSu = [{
                phien: 1,
                xx1: 1,
                xx2: 1,
                xx3: 1,
                tong: 1
            }];
            //this.pSoiCauTaiXiu.setVisible(false);
            this.pSoiCauTaiXiu1.setVisible(true);
            this.pToolTip.setVisible(false);
            this.pToolTip.setTag(1000);
            this.pToolTip.setLocalZOrder(1000);
            this.pSoiCauTaiXiu2.setVisible(false);
            this.btn_back_soi_cau.setEnabled(false);
            this.btn_back_soi_cau.setBright(false);

            this.cb_soi_cau_xx1.setSelected(true);
            this.cb_soi_cau_xx2.setSelected(true);
            this.cb_soi_cau_xx3.setSelected(true);


            this.cb_soi_cau_xx1.addEventListener(function (sender, eventType) {
                if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                    txSoiCau.drawSoiCauXX1();
                } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                    txSoiCau.dcXX1.clear();
                }

            });
            this.cb_soi_cau_xx2.addEventListener(function (sender, eventType) {
                if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                    txSoiCau.drawSoiCauXX2();
                } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                    txSoiCau.dcXX2.clear();
                }

            });
            this.cb_soi_cau_xx3.addEventListener(function (sender, eventType) {
                if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                    txSoiCau.drawSoiCauXX3();
                } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                    txSoiCau.dcXX3.clear();
                }

            });

            this.initSoiCau1(this.pSoiCauTaiXiu1);
            this.initSoiCau2(this.pSoiCauTaiXiu2);

            this.dc1 = new cc.DrawNode();
            this.pSoiCauTaiXiu1.addChild(this.dc1);
            this.dcXX1 = new cc.DrawNode();
            this.pSoiCauTaiXiu1.addChild(this.dcXX1);
            this.dcXX2 = new cc.DrawNode();
            this.pSoiCauTaiXiu1.addChild(this.dcXX2);
            this.dcXX3 = new cc.DrawNode();
            this.pSoiCauTaiXiu1.addChild(this.dcXX3);

            this.dc2 = new cc.DrawNode();
            this.pSoiCauTaiXiu2.addChild(this.dc2);




            if (cc.sys.isNative) {
                this.btn_close_soi_cau1.setVisible(false);
                this.btn_close_soi_cau2.setVisible(false);
                this.addMasterLayer(this.pSoiCauTaiXiu);
            } else {
                this.pSoiCauTaiXiu.setScale(0.7);
                this.btn_back_soi_cau.setVisible(false);
                this.btn_close_soi_cau.setVisible(false);
                this.btn_neck_soi_cau.setVisible(false);
                this.pSoiCauTaiXiu.setPosition(taiXiu.bg_tai_xiu.getPosition());
                this.pSoiCauTaiXiu1.setPosition(cc.p(735, 0));
                this.pSoiCauTaiXiu2.setPosition(cc.p(-730, 0));
                //this.pSoiCauTaiXiu.setPosition(taiXiu.getPosition());

            }
        },

        onButtonRelease: function (button, id) {

            switch (id) {
                case TXSoiCauLayer.BTN_CLOSE_SOI_CAU:
                    //this.pSoiCauTaiXiu.setVisible(false);
                    closeTXSoiCau();
                    break;
                case TXSoiCauLayer.BTN_NECK_SOI_CAU:
                    this.btn_back_soi_cau.setEnabled(true);
                    this.btn_back_soi_cau.setBright(true);
                    this.btn_neck_soi_cau.setEnabled(false);
                    this.btn_neck_soi_cau.setBright(false);
                    this.pSoiCauTaiXiu1.setVisible(false);
                    this.pSoiCauTaiXiu2.setVisible(true);
                    break;
                case TXSoiCauLayer.BTN_BACK_SOI_CAU:
                    this.btn_back_soi_cau.setEnabled(false);
                    this.btn_back_soi_cau.setBright(false);
                    this.btn_neck_soi_cau.setEnabled(true);
                    this.btn_neck_soi_cau.setBright(true);
                    this.pSoiCauTaiXiu1.setVisible(true);
                    this.pSoiCauTaiXiu2.setVisible(false);
                    break;
                case TXSoiCauLayer.BTN_CLOSE_SOI_CAU1:
                    //this.pSoiCauTaiXiu.setVisible(false);
                    this.pSoiCauTaiXiu1.setVisible(false);
                    if (!this.pSoiCauTaiXiu2.isVisible()) {
                        closeTXSoiCau();
                    }
                    break;
                case TXSoiCauLayer.BTN_CLOSE_SOI_CAU2:
                    //this.pSoiCauTaiXiu.setVisible(false);
                    this.pSoiCauTaiXiu2.setVisible(false);
                    if (!this.pSoiCauTaiXiu1.isVisible()) {
                        closeTXSoiCau();
                    }
                    break;


            }
        },
        showToolTip: function (phien, ketQua, position) {
            this.pToolTip.setVisible(true);
            this.pToolTip.setPosition(cc.p(position.x, position.y + 33));
            this.lb_phien_tooltip.setString(phien);
            this.lb_ket_qua_tooltip.setString(ketQua);
        },
        hideToolTip: function () {
            this.pToolTip.setVisible(false);
        },
        //initArrSoiCauTong: function()
        //{
        //    for(var i = 0; i < this.arrSoiCauTong.length;i++)
        //    {
        //        this.arrSoiCauTong[i] = Math.floor((Math.random() * 15) + 0) + 3;
        //        //cc.log(taiXiu.arrSoiCauTong[i]);
        //    }
        //},
        reLoadSoiCau: function () {
            this.dc1.clear();
            this.dc2.clear();
            this.dcXX1.clear();
            this.dcXX2.clear();
            this.dcXX3.clear();
            this.drawSoiCauTong();
            this.drawSoiCauXX1();
            this.drawSoiCauXX2();
            this.drawSoiCauXX3();
            this.drawSoiCauTX2();
        },
        //initArrSoiCauXX: function()
        //{
        //    for(var i = 0; i < this.arrSoiCauXX1.length;i++)
        //    {
        //        this.arrSoiCauXX1[i] = Math.floor((Math.random() * 6) + 1);
        //        this.arrSoiCauXX2[i] = Math.floor((Math.random() * 6) + 1);
        //        this.arrSoiCauXX3[i] = Math.floor((Math.random() * 6) + 1);
        //        //cc.log(taiXiu.arrSoiCauXX1[i]);
        //    }
        //},


        drawSoiCauXX1: function () {

            var drawStartX = 95;
            var drawStartY2 = 100;
            var indexDraw = this.arrLichSu.length - 20;
            for (var i = indexDraw; i < this.arrLichSu.length; i++) {
                if (i == this.arrLichSu.length - 1) {

                } else {
                    this.dcXX1.drawSegment(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx1 * 30)), cc.p(drawStartX + ((i - indexDraw + 2) * 30), drawStartY2 + (this.arrLichSu[i + 1].xx1 * 30)), 1, cc.color.YELLOW);
                }
                this.dcXX1.drawDot(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx1 * 30)), 5, cc.color.YELLOW);

            }

        },

        drawSoiCauXX2: function () {

            var drawStartX = 95;
            var drawStartY2 = 100;
            var indexDraw = this.arrLichSu.length - 20;
            for (var i = indexDraw; i < this.arrLichSu.length; i++) {
                if (i == this.arrLichSu.length - 1) {

                } else {
                    this.dcXX2.drawSegment(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx2 * 30)), cc.p(drawStartX + ((i - indexDraw + 2) * 30), drawStartY2 + (this.arrLichSu[i + 1].xx2 * 30)), 1, cc.color.GREEN);
                }
                this.dcXX2.drawDot(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx2 * 30)), 5, cc.color.GREEN);

            }

        },
        drawSoiCauXX3: function () {

            var drawStartX = 95;
            var drawStartY2 = 100;
            var indexDraw = this.arrLichSu.length - 20;
            for (var i = indexDraw; i < this.arrLichSu.length; i++) {
                if (i == this.arrLichSu.length - 1) {

                } else {
                    this.dcXX3.drawSegment(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx3 * 30)), cc.p(drawStartX + ((i - indexDraw + 2) * 30), drawStartY2 + (this.arrLichSu[i + 1].xx3 * 30)), 1, cc.color.RED);
                }
                this.dcXX3.drawDot(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY2 + (this.arrLichSu[i].xx3 * 30)), 5, cc.color.RED);

            }

        },

        drawSoiCauTong: function () {

            // taiXiu.dc1 = new cc.DrawNode();
            //taiXiu.dc1.removeFromParent();
            var drawStartX = 95;
            var drawStartY1 = 350;
            var indexDraw = this.arrLichSu.length - 20;

            for (var i = indexDraw; i < this.arrLichSu.length; i++) {
                if (i == this.arrLichSu.length - 1) {

                } else {
                    this.dc1.drawSegment(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY1 + (this.arrLichSu[i].tong * 10)), cc.p(drawStartX + ((i - indexDraw + 2) * 30), drawStartY1 + (this.arrLichSu[i + 1].tong * 10)), 1, cc.color.YELLOW);
                }

                if (this.arrLichSu[i].tong < 11) {
                    this.dc1.drawDot(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY1 + (this.arrLichSu[i].tong * 10)), 10, cc.color(255, 255, 255));
                } else {
                    this.dc1.drawDot(cc.p(drawStartX + ((i - indexDraw + 1) * 30), drawStartY1 + (this.arrLichSu[i].tong * 10)), 10, cc.color(0, 0, 0));
                }


            }
            this.lb_phien_gan_nhat.setString("Phiên gần nhất: (# " + (parseInt(taiXiu.referenceId) - 1) + ")");
            if (this.arrLichSu[this.arrLichSu.length - 1].tong < 11) {
                this.lb__ket_qua_phien_gan_nhat.setColor(cc.color.WHITE);
                this.lb__ket_qua_phien_gan_nhat.setString("Xỉu: " + this.arrLichSu[this.arrLichSu.length - 1].tong + "(" + this.arrLichSu[this.arrLichSu.length - 1].xx1 + "-" + this.arrLichSu[this.arrLichSu.length - 1].xx2 + "-" + this.arrLichSu[this.arrLichSu.length - 1].xx3 + ")");

            } else {
                this.lb__ket_qua_phien_gan_nhat.setColor(cc.color(39, 34, 34));
                this.lb__ket_qua_phien_gan_nhat.setString("Tài: " + this.arrLichSu[this.arrLichSu.length - 1].tong + "(" + this.arrLichSu[this.arrLichSu.length - 1].xx1 + "-" + this.arrLichSu[this.arrLichSu.length - 1].xx2 + "-" + this.arrLichSu[this.arrLichSu.length - 1].xx3 + ")");
            }

            // taiXiu.pSoiCauTaiXiu1.addChild(taiXiu.dc1);

        },

        initSoiCau1: function (panel) {
            var line = new cc.DrawNode();
            panel.addChild(line);

            var drawStartX = 95;
            var drawEndX = drawStartX + 605;
            var drawStartY1 = 350;
            var drawEndY1 = drawStartY1 + 190;
            var drawStartY2 = 100;
            var drawEndY2 = drawStartY2 + 190;
            for (var i = 0; i < 21; i++) {
                //cc.log("init Soi cau1 = "+i);
                // caro soi cầu 1 Tổng, tọa độ đầu p(65,350);
                if (i % 3 == 0) {

                    if (i == 0) {
                        line.drawSegment(cc.p(drawStartX, drawStartY1 + (i * 10)), cc.p(drawEndX, drawStartY1 + (i * 10)), 1, cc.color(255, 255, 255, 80));
                    } else {
                        line.drawSegment(cc.p(drawStartX, drawStartY1 + (i * 10)), cc.p(drawEndX, drawStartY1 + (i * 10)), 1, cc.color(255, 255, 255, 30));
                    }
                } else {

                }

                if (i == 0) {
                    line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY1), cc.p(drawStartX + (i * 30), drawEndY1), 1, cc.color(255, 255, 255, 80));
                } else {
                    line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY1), cc.p(drawStartX + (i * 30), drawEndY1), 1, cc.color(255, 255, 255, 30));
                }
                //caro soi cầu xúc xắc 1,2,3 tọa độ đầu p(65,100)
                if (i % 3 == 0) {

                    if (i == 0) {
                        line.drawSegment(cc.p(drawStartX, drawStartY2 + (i * 10)), cc.p(drawEndX, drawStartY2 + (i * 10)), 1, cc.color(255, 255, 255, 80));
                    } else {
                        line.drawSegment(cc.p(drawStartX, drawStartY2 + (i * 10)), cc.p(drawEndX, drawStartY2 + (i * 10)), 1, cc.color(255, 255, 255, 30));
                        //line.drawSegment(cc.p(65,350+(i*10)), cc.p(580,350+(i*10)),0.6,cc.color(255,255,255,30));
                    }
                } else {
                }
                if (i == 0) {
                    line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY2), cc.p(drawStartX + (i * 30), drawEndY2), 1, cc.color(255, 255, 255, 80));
                } else {


                    line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY2), cc.p(drawStartX + (i * 30), drawEndY2), 1, cc.color(255, 255, 255, 30));

                }
            }

        },
        initSoiCau2: function (panel) {

            if ('mouse' in cc.sys.capabilities) {
                this.mouseLis = cc.EventListener.create({
                    event: cc.EventListener.MOUSE,
                    onMouseDown: function (event) {
                    },
                    onMouseMove: function (event) {
                        var pos = event.getLocation();
                        target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        // cc.log("onMouseMove at: " + pos.x + " " + pos.y );
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (!cc.rectContainsPoint(rect, locationInNode)) {
                            //txSoiCau.showToolTip(txSoiCau.arrDotSoiCau[i].phien,txSoiCau.arrDotSoiCau[i].strToolTip,txSoiCau.arrDotSoiCau[i].sp.getPosition());
                            //cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                            txSoiCau.hideToolTip();

                        } else {
                            for (var i = 0; i < 120; i++) {
                                if (cc.rectContainsPoint(txSoiCau.arrDotSoiCau[i].rect, locationInNode)) {
                                    txSoiCau.showToolTip(txSoiCau.arrDotSoiCau[i].strPhien, txSoiCau.arrDotSoiCau[i].strToolTip, txSoiCau.arrDotSoiCau[i].sp.getPosition());
                                    break;

                                } else {
                                    txSoiCau.hideToolTip();
                                }
                                if (cc.rectContainsPoint(txSoiCau.arrArcSoiCau[i].rect, locationInNode)) {
                                    txSoiCau.showToolTip(txSoiCau.arrArcSoiCau[i].strPhien, txSoiCau.arrArcSoiCau[i].strToolTip, txSoiCau.arrArcSoiCau[i].sp.getPosition());
                                    break;
                                }
                                else {
                                    txSoiCau.hideToolTip();
                                }
                            }

                        }

                    },
                    onMouseUp: function (event) {
                        var pos = event.getLocation();
                        target = event.getCurrentTarget();

                        //cc.log("onMouseUp at: " + pos.x + " " + pos.y);
                    }
                });

            } else {
                //cc.log("MOUSE Not supported");
            }

            var line = new cc.DrawNode();
            panel.addChild(line);

            var drawStartX = 88;
            var drawEndX = drawStartX + 600;
            var drawStartY1 = 350;
            var drawEndY1 = drawStartY1 + 180;
            var drawStartY2 = 100;
            var drawEndY2 = drawStartY2 + 180;
            for (var i = 0; i < 21; i++) {
                //cc.log("init Soi cau2 = "+i);
                // caro soi cầu 1 Tổng, tọa độ đầu p(65,350);
                if (i % 3 == 0) {
                    line.drawSegment(cc.p(drawStartX, drawStartY1 + (i * 10)), cc.p(drawEndX, drawStartY1 + (i * 10)), 1, cc.color(255, 255, 255, 50));
                }

                line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY1), cc.p(drawStartX + (i * 30), drawEndY1), 1, cc.color(255, 255, 255, 50));

                //caro soi cầu xúc xắc 1,2,3 tọa độ đầu p(65,100)
                if (i % 3 == 0) {
                    line.drawSegment(cc.p(drawStartX, drawStartY2 + (i * 10)), cc.p(drawEndX, drawStartY2 + (i * 10)), 1, cc.color(255, 255, 255, 50));

                }
                line.drawSegment(cc.p(drawStartX + (i * 30), drawStartY2), cc.p(drawStartX + (i * 30), drawEndY2), 1, cc.color(255, 255, 255, 50));

            }

            var drawStartcX = 103;
            var drawEndcX = drawStartcX + 570;
            var drawStartcY1 = 335;
            var drawEndcY1 = drawStartcY1 + 180;
            var drawStartcY2 = 115;
            var drawEndcY2 = drawStartcY2 + 150;
            var indexDrawc = 0;


            for (var i = 0; i < 120; i++) {
                //cc.log("draw caro 1 " + i);
                var spDot = new cc.Sprite();
                var xNodePosition = parseFloat(drawStartcX + Math.floor(i / 6) * 30);
                var y2NodePosition = parseFloat(drawEndcY2 - ((i % 6) * 30));
                var y1NodePosition = parseFloat(drawEndcY1 - ((i % 6) * 30));
                spDot.setPosition(cc.p(xNodePosition, y2NodePosition));
                spDot.setVisible(false);
                panel.addChild(spDot);
                var temp2 = {};
                temp2.strToolTip = "";
                temp2.strPhien = "";
                temp2.sp = spDot;
                temp2.rect = cc.rect(0, 0, 0, 0);

                this.arrDotSoiCau.push(temp2);

                var spVong = new cc.Sprite();
                spVong.setPosition(cc.p(xNodePosition, y1NodePosition));
                spVong.setScale(0.3);
                panel.addChild(spVong);
                spVong.setVisible(false);

                var temp1 = {};
                temp1.strToolTip = "";
                temp1.strPhien = "";
                temp1.sp = spVong;
                temp1.rect = cc.rect(0, 0, 0, 0);
                this.arrArcSoiCau.push(temp1);

                var lbTaiXiu = new cc.LabelTTF('', RobotoRegular.fontName, 18, cc.size(30, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiXiu.setString("12");
                lbTaiXiu.setPosition(cc.p(xNodePosition, y1NodePosition));
                panel.addChild(lbTaiXiu);
                lbTaiXiu.setVisible(false);
                lbTaiXiu.setColor(cc.color(0, 255, 255));
                this.arrLbSoiCau.push(lbTaiXiu);
            }
            if ('mouse' in cc.sys.capabilities) {
                cc.eventManager.addListener(this.mouseLis, panel);

            }
        },
        drawSoiCauTX2: function () {
            var countRow = 0;
            var countColum = 0;
            var currentSlide = 0;

            var countItemInColum = 0;


            var drawStartX = 103;
            var drawEndX = drawStartX + 570;
            var drawStartY1 = 335;
            var drawEndY1 = drawStartY1 + 180;
            var drawStartY2 = 115;
            var drawEndY2 = drawStartY2 + 150;
            var indexDraw = 0;
            for (var i = 0; i < 120; i++) {
                //cc.log("draw caro 2 " + i);
                this.arrArcSoiCau[i].sp.setVisible(false);
                this.arrArcSoiCau[i].rect = cc.rect(0, 0, 0, 0);
                this.arrDotSoiCau[i].rect = cc.rect(0, 0, 0, 0);
                this.arrDotSoiCau[i].sp.setVisible(false);
                this.arrLbSoiCau[i].setVisible(false);
                //cc.eventManager.pauseTarget(this.arrArcSoiCau[i].sp, true);
                //cc.eventManager.pauseTarget(this.arrDotSoiCau[i].sp, true);

            }
            for (var i = this.arrLichSu.length - 1; i > 0; i--) {
                if (countColum > 19) {

                } else {
                    if (i == 0) {
                        if (this.arrLichSu[i].tong > 10) {
                            currentSlide = 1;
                        }
                        else {
                            currentSlide = 0;
                        }
                        countRow++;

                    }
                    else {


                        if (currentSlide == 1 && this.arrLichSu[i].tong > 10) {

                            if (countRow > 5) {
                                countRow = 0;
                                countColum++;
                            }

                            countRow++;

                        }
                        else if (currentSlide == 0 && this.arrLichSu[i].tong <= 10) {


                            if (countRow > 5) {
                                countRow = 0;
                                countColum++;


                            }
                            countRow++;
                        }
                        else {

                            countRow = 0;
                            countColum++;
                            if (this.arrLichSu[i].tong <= 10) {
                                currentSlide = 0;
                            }
                            else {
                                currentSlide = 1;
                            }
                            countRow++;
                        }
                    }
                    indexDraw = i;
                }

            }
            countRow = 0;
            countColum = 0;
            currentSlide = 0;

            var countIndex = 0;

            for (var i = indexDraw + 1; i < this.arrLichSu.length; i++) {
                if (i == indexDraw + 1) {
                    if (this.arrLichSu[i].tong > 10) {
                        currentSlide = 1;
                        this.arrLbSoiCau[0].setVisible(true);
                        this.arrLbSoiCau[0].setString(this.arrLichSu[i].tong);
                        this.arrLbSoiCau[0].setColor(cc.color(0, 255, 255));
                        this.arrArcSoiCau[0].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrArcSoiCau[0].strToolTip = "Tài(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";


                        this.arrArcSoiCau[0].sp.setVisible(true);
                        this.arrArcSoiCau[0].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_den.png");
                        this.arrArcSoiCau[i].rect = cc.rect(this.arrArcSoiCau[0].sp.getPosition().x - 15, this.arrArcSoiCau[0].sp.getPosition().y - 15, 30, 30);

                        //cc.eventManager.resumeTarget(this.arrArcSoiCau[0].sp, true);

                        //this.dc2.drawDot(cc.p(drawStartX, drawEndY1), 13, cc.color.BLACK);
                    }
                    else {
                        currentSlide = 0;
                        this.arrLbSoiCau[0].setVisible(true);
                        this.arrLbSoiCau[0].setString(this.arrLichSu[i].tong);
                        this.arrLbSoiCau[0].setColor(cc.color(255, 255, 255));
                        this.arrArcSoiCau[0].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrArcSoiCau[0].strToolTip = "Xỉu(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                        this.arrArcSoiCau[0].sp.setVisible(true);
                        this.arrArcSoiCau[0].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_trang.png");
                        this.arrArcSoiCau[0].rect = cc.rect(this.arrArcSoiCau[0].sp.getPosition().x - 15, this.arrArcSoiCau[0].sp.getPosition().y - 15, 30, 30);
                        cc.eventManager.resumeTarget(this.arrArcSoiCau[0].sp, true);
                        //this.dc2.drawDot(cc.p(drawStartX, drawEndY1), 13, cc.color.WHITE);
                    }
                    countRow++;

                }
                else {


                    if (currentSlide == 1 && this.arrLichSu[i].tong > 10) {

                        if (countRow > 5) {
                            countRow = 0;
                            countColum++;
                        }
                        this.arrLbSoiCau[countColum * 6 + countRow].setVisible(true);
                        this.arrLbSoiCau[countColum * 6 + countRow].setString(this.arrLichSu[i].tong);
                        this.arrLbSoiCau[countColum * 6 + countRow].setColor(cc.color(0, 255, 255));
                        this.arrArcSoiCau[countColum * 6 + countRow].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrArcSoiCau[countColum * 6 + countRow].strToolTip = "Tài(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                        this.arrArcSoiCau[countColum * 6 + countRow].sp.setVisible(true);
                        this.arrArcSoiCau[countColum * 6 + countRow].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_den.png");
                        this.arrArcSoiCau[countColum * 6 + countRow].rect = cc.rect(this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().x - 15, this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().y - 15, 30, 30);
                        //cc.eventManager.resumeTarget(this.arrArcSoiCau[countColum * 6 + countRow].sp, true);
                        countRow++;

                    }
                    else if (currentSlide == 0 && this.arrLichSu[i].tong <= 10) {


                        if (countRow > 5) {
                            countRow = 0;
                            countColum++;


                        }
                        this.arrLbSoiCau[countColum * 6 + countRow].setVisible(true);
                        this.arrLbSoiCau[countColum * 6 + countRow].setString(this.arrLichSu[i].tong);
                        this.arrLbSoiCau[countColum * 6 + countRow].setColor(cc.color(255, 255, 255));
                        this.arrArcSoiCau[countColum * 6 + countRow].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrArcSoiCau[countColum * 6 + countRow].strToolTip = "Xỉu(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                        this.arrArcSoiCau[countColum * 6 + countRow].sp.setVisible(true);
                        this.arrArcSoiCau[countColum * 6 + countRow].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_trang.png");
                        this.arrArcSoiCau[countColum * 6 + countRow].rect = cc.rect(this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().x - 15, this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().y - 15, 30, 30);
                        //cc.eventManager.resumeTarget(this.arrArcSoiCau[countColum * 6 + countRow].sp, true);
                        countRow++;
                    }
                    else {

                        countRow = 0;
                        countColum++;
                        if (this.arrLichSu[i].tong <= 10) {
                            currentSlide = 0;
                            this.arrLbSoiCau[countColum * 6 + countRow].setVisible(true);
                            this.arrLbSoiCau[countColum * 6 + countRow].setString(this.arrLichSu[i].tong);
                            this.arrLbSoiCau[countColum * 6 + countRow].setColor(cc.color(255, 255, 255));
                            this.arrArcSoiCau[countColum * 6 + countRow].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                            this.arrArcSoiCau[countColum * 6 + countRow].strToolTip = "Xỉu(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                            this.arrArcSoiCau[countColum * 6 + countRow].sp.setVisible(true);
                            this.arrArcSoiCau[countColum * 6 + countRow].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_trang.png");
                            this.arrArcSoiCau[countColum * 6 + countRow].rect = cc.rect(this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().x - 15, this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().y - 15, 30, 30);
                            //cc.eventManager.resumeTarget(this.arrArcSoiCau[countColum * 6 + countRow].sp, true);
                        }
                        else {
                            currentSlide = 1;
                            this.arrLbSoiCau[countColum * 6 + countRow].setVisible(true);
                            this.arrLbSoiCau[countColum * 6 + countRow].setString(this.arrLichSu[i].tong);
                            this.arrLbSoiCau[countColum * 6 + countRow].setColor(cc.color(0, 255, 255));
                            this.arrArcSoiCau[countColum * 6 + countRow].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                            this.arrArcSoiCau[countColum * 6 + countRow].strToolTip = "Tài(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                            this.arrArcSoiCau[countColum * 6 + countRow].sp.setVisible(true);
                            this.arrArcSoiCau[countColum * 6 + countRow].sp.setSpriteFrame("res/Minigame/TaiXiu/images/vong_den.png");
                            this.arrArcSoiCau[countColum * 6 + countRow].rect = cc.rect(this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().x - 15, this.arrArcSoiCau[countColum * 6 + countRow].sp.getPosition().y - 15, 30, 30);
                            //cc.eventManager.resumeTarget(this.arrArcSoiCau[countColum * 6 + countRow].sp, true);
                        }
                        countRow++;
                    }
                }
            }

            var tai1 = 0;
            var xiu1 = 0;
            var tai2 = 0;
            var xiu2 = 0;

            for (var i = 0; i < 120; i++) {

                if (i < this.arrLichSu.length) {
                    this.arrDotSoiCau[i].sp.setVisible(true);
                    if (this.arrLichSu[i].tong > 10) {
                        this.arrDotSoiCau[i].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrDotSoiCau[i].strToolTip = "Tài(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                        this.arrDotSoiCau[i].sp.setSpriteFrame("res/Minigame/TaiXiu/images/sp_tai.png");
                        this.arrDotSoiCau[i].rect = cc.rect(this.arrDotSoiCau[i].sp.getPosition().x - 15, this.arrDotSoiCau[i].sp.getPosition().y - 15, 30, 30);
                        //cc.eventManager.resumeTarget(this.arrDotSoiCau[i].sp, true);
                        tai2++;
                        if (i >= indexDraw + 1) {
                            tai1++;
                        }
                    }
                    else {
                        this.arrDotSoiCau[i].strPhien = "Phiên:#" + this.arrLichSu[i].phien;
                        this.arrDotSoiCau[i].strToolTip = "Xỉu(" + this.arrLichSu[i].xx1 + "-" + this.arrLichSu[i].xx2 + "-" + this.arrLichSu[i].xx3 + ")";
                        this.arrDotSoiCau[i].sp.setSpriteFrame("res/Minigame/TaiXiu/images/sp_xiu.png");
                        this.arrDotSoiCau[i].rect = cc.rect(this.arrDotSoiCau[i].sp.getPosition().x - 15, this.arrDotSoiCau[i].sp.getPosition().y - 15, 30, 30);
                        // cc.eventManager.resumeTarget(this.arrDotSoiCau[i].sp, true);

                        xiu2++;
                        if (i >= indexDraw + 1) {
                            xiu1++;
                        }
                    }
                } else {
                    this.arrDotSoiCau[i].sp.setVisible(false);
                }

            }
            this.lb_tai_soi_cau1.setString("TÀI: " + tai1);
            this.lb_xiu_soi_cau1.setString("XỈU: " + xiu1);
            this.lb_tai_soi_cau2.setString("TÀI: " + tai2);
            this.lb_xiu_soi_cau2.setString("XỈU: " + xiu2);

        }
    }
);

openTXSoiCau = function (visible) {
    if (txSoiCau === null) {

        //cc.log("----> Create mini game layer first time");
        txSoiCau = new TXSoiCauLayer();
        txSoiCauX = txSoiCau.getPosition().x;
        txSoiCauY = txSoiCau.getPosition().y;
        // taiXiu.onCreate();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(txSoiCau, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU + 100);
        //txSoiCau.setVisible(false);
        if (cc.sys.isNative) {
           // cc.eventManager.pauseTarget(txSoiCau.pSoiCauTaiXiu, true);

        } else {
            txSoiCau.pSoiCauTaiXiu1.setVisible(true);
            txSoiCau.pSoiCauTaiXiu2.setVisible(true);
        }
        txSoiCauAppear = true;
        txSoiCau.arrLichSu = taiXiu.arrLichSu;
        txSoiCau.reLoadSoiCau();


    } else {
        if (cc.sys.isNative) {
            if (visible == true) {
                txSoiCau.setVisible(true);
                cc.eventManager.resumeTarget(txSoiCau.pSoiCauTaiXiu, true);
                txSoiCau.setTag(Minigame.INDEX_TAI_XIU + 100);
                txSoiCauAppear = true;
            }
            txSoiCau.reOpenLayer(txSoiCau.pSoiCauTaiXiu);
        } else {
            if (visible == true) {
                txSoiCau.setVisible(true);
                txSoiCau.pSoiCauTaiXiu1.setVisible(true);
                txSoiCau.pSoiCauTaiXiu2.setVisible(true);
                txSoiCauAppear = true;
            }

        }

        txSoiCau.arrLichSu = taiXiu.arrLichSu;
        txSoiCau.reLoadSoiCau();


    }


};

closeTXSoiCau = function () {
    if (txSoiCau === null) {
        return;
    }
    if (txSoiCauAppear) {
        txSoiCau.setVisible(false);
        txSoiCauAppear = false;
        if (cc.sys.isNative) {
            cc.eventManager.pauseTarget(txSoiCau.pSoiCauTaiXiu, true);
            txSoiCau.closeLayer(txSoiCau.pSoiCauTaiXiu);
        }

    }
};


TXSoiCauLayer.BTN_CLOSE_SOI_CAU = 1;
TXSoiCauLayer.BTN_NECK_SOI_CAU = 2;
TXSoiCauLayer.BTN_BACK_SOI_CAU = 3;
TXSoiCauLayer.BTN_CLOSE_SOI_CAU1 = 4;
TXSoiCauLayer.BTN_CLOSE_SOI_CAU2 = 5;