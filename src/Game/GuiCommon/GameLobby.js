//
// Vin = 1
// Xu = 2
TableRoomCell = cc.TableViewCell.extend({
    ctor: function () {
        this._super();
        var i = 0;
        this.items = [];
        this.bground = [];
        var sp_bg = new cc.Sprite();
        sp_bg.initWithFile(Res.imageCenterVinEnabled, cc.rect(0, 0, 777, 51));
        sp_bg.setAnchorPoint(cc.p(0, 0));
        sp_bg.setPosition(cc.p(0, 0));
        this.addChild(sp_bg);
        this.bground.push(sp_bg);

        var _layout = new ccui.Button();
        _layout.loadTextures(Res.imageCenterJoinRoomEnable, Res.imageCenterJoinRoomPress, Res.imageCenterJoinRoomDisable);
        _layout.anchorX = 0.5;
        _layout.anchorY = 0.5;
        _layout.x = sp_bg.getPositionX() + sp_bg.width - 290.5;
        _layout.y = sp_bg.getPositionY() + (sp_bg.height / 2);
        var sizeBg = _layout.getContentSize();
        //_layout.setPosition(0, sizeBg.height*(1.2*(1-i) + 0.15));

        sp_bg.addChild(_layout);
        this.items.push(_layout);

        var fonts = fontArial;
        var lb2 = new ccui.Text();
        lb2.setAnchorPoint(cc.p(0.5, 0.5));
        lb2.setFontName(fonts.fontName);
        lb2.setFontSize(20);
        lb2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        //lb2.setColor({r:116, g: 62, b: 4});
        lb2.setColor(cc.color("#f7ebc6"));
        lb2.setString("what the hell");
        lb2.setPosition(sizeBg.width / 2 + 25, (_layout.getPositionY() - _layout.height / 4 + 10));
        _layout.addChild(lb2);

        this.items[i].moneyBet = lb2;

        var lb3 = new ccui.Text();
        lb3.setAnchorPoint(cc.p(0.5, 0.5));
        lb3.setFontName(fonts.fontName);
        lb3.setFontSize(20);
        lb3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb3.setColor(cc.color("#f7ebc6"));
        lb3.setString("what the hell");
        lb3.setPosition(sizeBg.width / 2 + 285, (_layout.getPositionY() - _layout.height / 4 + 10));
        _layout.addChild(lb3);
        this.items[i].nPerson = lb3;

        var lb4 = new ccui.Text();
        lb4.setAnchorPoint(cc.p(0.5, 0.5));
        lb4.setFontName(fonts.fontName);
        lb4.setFontSize(20);
        lb4.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb4.setColor(cc.color("#f7ebc6"));
        lb4.setString("what the hell");
        lb4.setPosition(sizeBg.width / 2 - 445, (_layout.getPositionY() - _layout.height / 4 + 10));
        _layout.addChild(lb4);
        this.items[i].roomid = lb4;

        var lb5 = new cc.LabelTTF("what the hell", fonts.fontName, 14, cc.size(218, 21), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        lb5.setAnchorPoint(cc.p(0.5, 0.5));
        lb5.setFontName(fonts.fontName);
        lb5.setFontSize(20);
        lb5.setColor(cc.color("#f7ebc6"));
        lb5.setPosition(sizeBg.width / 2 - 295, (_layout.getPositionY() - _layout.height / 4 + 10));
        _layout.addChild(lb5);
        this.items[i].nameRoom = lb5;

        var lb6 = new ccui.Text();
        lb6.setAnchorPoint(cc.p(0.5, 0.5));
        lb6.setFontName(fonts.fontName);
        lb6.setFontSize(20);
        lb6.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb6.setColor(cc.color("#f7ebc6"));
        lb6.setString("1.000.000.000");
        lb6.setPosition(sizeBg.width / 2 - 117, (_layout.getPositionY() - _layout.height / 4 + 10));
        _layout.addChild(lb6);
        this.items[i].quyban = lb6;

        var sp_khoa = new cc.Sprite();
        sp_khoa.initWithFile(Res.imageKhoa, cc.rect(0, 0, 25, 35));
        sp_khoa.setAnchorPoint(cc.p(0.5, 0.5));
        sp_khoa.setRotation(30);
        sp_khoa.setPosition(sizeBg.width / 2 + 465, (_layout.getPositionY() - _layout.height / 4 + 3));
        _layout.addChild(sp_khoa);
        this.items[i].key = sp_khoa;
        sp_khoa.setVisible(false);

        var uiSlider = new ccui.Slider();
        uiSlider.setTouchEnabled(false);
        uiSlider.loadBarTexture("res/CardGame/CommonResource/ChonBan/sliderBar.png");
        uiSlider.loadSlidBallTextures("", "", "");
        uiSlider.loadProgressBarTexture("res/CardGame/CommonResource/ChonBan/sliderBar2.png");

        uiSlider.setPosition(cc.p(_layout.getPositionX() + 175, _layout.getPositionY()));
        sp_bg.addChild(uiSlider);
        this.items[i].slider = uiSlider;
    },

    onEnter: function () {
        cc.TableViewCell.prototype.onEnter.call(this);
    },

    updateWithItem: function (item1, item2, type, gameType) {
        this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet));
        if (gameType == GameList.Poker) {
            this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet) + "/" + this.getMoneyString(item1.moneyBet * 2));
            this.items[0].moneyBet.setFontSize(20);
        }
        else {
            this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet));
            this.items[0].moneyBet.setFontSize(20);
        }

        this.items[0].nPerson.setString(item1.getUserCount + "/" + item1.limitPlayer);
        this.items[0].roomid.setString("#" + item1.roomId);
        if (gameType == GameList.XocDia) {
            if (item1.quyban > 0)
                this.items[0].quyban.setString(formatMoney(0, 3, item1.quyban));
            else
                this.items[0].quyban.setString("");
        } else {
            if (item1.moneyRequire > 0)
                this.items[0].quyban.setString(formatMoney(0, 3, item1.moneyRequire));
            else
                this.items[0].quyban.setString("");
        }
        if (gameType == GameList.XocDia) {
            var sizeBg = this.items[0].getContentSize();
            if (gameLobbyInstance.typeBan == MONEY_VIN) {
                if (item1.rule == 1) {
                    this.items[0].roomid.setString("");
                    this.items[0].nPerson.setString(item1.getUserCount);
                    this.items[0].nPerson.setPosition(cc.p(sizeBg.width / 2 + 200, this.items[0].nPerson.getPositionY()));
                    this.items[0].slider.setVisible(false);
                } else {
                    this.items[0].nPerson.setPosition(cc.p(sizeBg.width / 2 + 280, this.items[0].nPerson.getPositionY()));
                    this.items[0].slider.setVisible(true);
                }
            } else {
                this.items[0].nPerson.setPosition(cc.p(sizeBg.width / 2 + 280, this.items[0].nPerson.getPositionY()));
                this.items[0].slider.setVisible(true);
            }
        } else {
            var sizeBg = this.items[0].getContentSize();
            this.items[0].nPerson.setPosition(cc.p(sizeBg.width / 2 + 280, this.items[0].nPerson.getPositionY()));
            this.items[0].slider.setVisible(true);
        }
        var name = item1.nameRoom;
        //if(name.length > 10){
        //    name = name.substr(0,10);
        //}
        this.items[0].nameRoom.setString(name);
        if (item1.key == true)
            this.items[0].key.setVisible(true);
        else
            this.items[0].key.setVisible(false);
        if (type == 1) {
            this.items[0].moneyBet.setColor(cc.color("#f7ebc6"));
        }
        else {
            this.items[0].moneyBet.setColor(cc.color("#f7ebc6"));
        }
        var percent = (item1.getUserCount / item1.limitPlayer) * 100;
        if (percent > 100)
            percent = 100;
        this.items[0].slider.setPercent(parseInt(percent));
    },

    getMoneyString: function (num) {
        if (num < 1000) {
            return "" + num;
        } else if (num < 1000000) {
            return "" + Math.floor(num / 1000) + "K";
        } else {
            return "" + Math.floor(num / 1000000) + "M";
        }
    }

})

MoneyBetItem = cc.Class.extend({
    ctor: function () {
        this._super();
        this.topServer = null;
    },

    setData: function (require, moneyBet, num) {
        this.require = require;
        this.moneyBet = moneyBet;
        this.num = num;
    }
});

GameLobby = BaseLayer.extend({
    ctor: function () {
        this._super("LobyScene");
        cc.log("GameLobby 1");
        //this.initWithBinaryFile("res/g_res_cardGame_json_ChonBanScene.json");
        this.moneyBetList = [];
        this.kk = 0;
        this.typeBan = MONEY_VIN;
        this.cellSize = null;
        this.buttonTouchStart = cc.p(0, 0);
        this.imageGame = null;
        this.timeRemain = 0;
        this.timeFromStart = 0;
        this.canUpdate = false;
        this.guiReceiveMoiChoi = null;
        this.disableMoiChoi = false;

        this.is_draw = false;
        this.save_type_createRoom = 1000;
        this.num_person = 2;
        this.is_visible_full_table = false;
        this.save_array_full_table = [];
        this.save_muccuoc = 0;

        this.array_muc_cuoc = [];
        this.betvalue_createroom = 0;

        this.save_room_order_join = 0;

        this.type_topxh = 1;
        this.save_quyban_createroom = 0;

        this.isSortBetValue = false;
        this.isSortPlayer = false;
        this.isSortQuy = false;
    },

    //test
    onEnter: function () {
        BaseLayer.prototype.onEnter.call(this);

        var that = this;
        this.customlistener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "updateMoney",
            callback: function () {
                cc.log("function callback lobby");
                that.doSomething();
            }
        });
        cc.eventManager.addListener(this.customlistener, 1);
    },

    doSomething: function () {
        this.reloadTable();
    },

    customizeGUI: function () {
        this.num_person = gameData.maxPlayer;
        // new Gui
        this.addLayout(this, "pn_lobby", cc.p(780, 360), null, cc.size(1000, 720), true);
        this.addLayout(this, "pn_create_room", cc.p(779.64, 321), null, cc.size(1000, 642), true); this.pn_create_room.setVisible(false);
        this.addLayout(this, "pn_password", cc.p(779.64, 360), null, cc.size(1000, 642), true); this.pn_password.setVisible(false);
        this.addLayout(this, "pn_thele_xocdia", cc.p(779.64, 360), null, cc.size(1000, 642), true); this.pn_thele_xocdia.setVisible(false);
        this.addImage(this, "table1", cc.p(784, 239), res_LobbyGameBai + "/bg_table_room_2.png", cc.size(975, 464));

        //pn_lobby
        this.addImage(this.pn_lobby, "bg_0", cc.p(494.64, 263.67), res_LobbyGameBai + "/panel_banchoi1.png", cc.size(975, 464));
        this.addButton(this.pn_lobby, "btn_Vin", GameLobby.BTN_VIN, cc.p(250.66, 488.07), true, res_LobbyGameBai + "/btn_banvin.png", res_LobbyGameBai + "/btn_banvin_s.png");
        this.addText(this.btn_Vin, "Text_3", cc.p(242.51, 30), "BÀN VIN", UTMBebas.fontName, 28);
        this.Text_3.setColor(cc.color("#9D5409"));
        this.addButton(this.pn_lobby, "btn_Xu", GameLobby.BTN_XU, cc.p(739.15, 488.07), true, res_LobbyGameBai + "/btn_banxu.png", res_LobbyGameBai + "/btn_banvin_s.png");
        this.addText(this.btn_Xu, "Text_4", cc.p(242.51, 30), "BÀN XU", UTMBebas.fontName, 28);
        this.addImage(this.pn_lobby, "bg_table_view", cc.p(494.65, 263.66), res_LobbyGameBai + "/panel_banchoi.png", cc.size(989, 512));
        this.addSprite(this.bg_table_view, "sp_muc_cuoc_vao_ban", cc.p(356.91, 442.38), res_LobbyGameBai + "/sp_muc_vao_ban.png");
        this.sp_muc_cuoc_vao_ban.setVisible(false);

        this.btn_Vin.setPressedActionEnabled(false); this.btn_Xu.setPressedActionEnabled(false);

        this.addLayout(this.pn_lobby, "pn_tableview", cc.p(-289.99, 0), null, cc.size(0, 0), true);
        this.addButton(this.pn_lobby, "btn_loc_muc_cuoc", GameLobby.BTN_CHOSE_MUCCUOC, cc.p(515.43, 451.05), true, res_LobbyGameBai + "/btn_muccuoc.png", res_LobbyGameBai + "/btn_muccuoc.png");
        this.addSprite(this.btn_loc_muc_cuoc, "sp_loc_bet_value", cc.p(122.38, 15.06), res_LobbyGameBai + "/arrowwhite.png");
        this.addButton(this.pn_lobby, "btn_order_user", GameLobby.BTN_ORDER_USER, cc.p(707.43, 451.05), true, res_LobbyGameBai + "/btn_muccuoc.png", res_LobbyGameBai + "/btn_muccuoc.png");
        this.addSprite(this.btn_order_user, "sp_order_user", cc.p(117.38, 15.06), res_LobbyGameBai + "/arrowwhite.png");
        this.addButton(this.pn_lobby, "btn_order_quy", GameLobby.BTN_ORDER_QUY, cc.p(376, 451.05), true, res_LobbyGameBai + "/btn_muccuoc.png", res_LobbyGameBai + "/btn_muccuoc.png");
        this.addSprite(this.btn_order_quy, "sp_order_quy", cc.p(117.38, 15.06), res_LobbyGameBai + "/arrowwhite.png");

        this.addCheckBox(this.pn_lobby, "ck_visible_full_table", cc.p(270.27, 38.93), false, res_LobbyGameBai + "/uncheckbox.png", res_LobbyGameBai + "/uncheckbox.png", res_LobbyGameBai + "/check.png", res_LobbyGameBai + "/uncheckbox.png", res_LobbyGameBai + "/check.png");

        this.addEditBox(this.pn_lobby, "tf_find_id_table", cc.p(102.09, 36.59), "", "Nhập ID bàn", fontRobotoBold.fontName, 20, cc.size(177, 36), null, cc.TEXT_ALIGNMENT_LEFT, 10);

        this.addButton(this.pn_lobby, "btn_find_table", GameLobby.BTN_FIND_TABLE, cc.p(216.86, 36.40), true, res_LobbyGameBai + "/btn_find.png", res_LobbyGameBai + "/btn_find_s.png");
        this.addButton(this.pn_lobby, "btn_create_table", GameLobby.BTN_CREATE_TABLE, cc.p(728.42, 36.40), true, res_LobbyGameBai + "/btn_createRoom_lobby.png", res_LobbyGameBai + "/btn_createRoom_lobby_s.png");
        this.addButton(this.pn_lobby, "btn_show_top", GameLobby.BTN_SHOW_TOP, cc.p(472.78, 38.40), true, res_LobbyGameBai + "/btn_top.png", res_LobbyGameBai + "/btn_top_s.png");
        this.addButton(this.pn_lobby, "btn_thele", GameLobby.BTN_SHOW_THELE, cc.p(585.78, 38.40), true, res_LobbyGameBai + "/btn_thele.png", res_LobbyGameBai + "/btn_thele_s.png");
        this.addButton(this.pn_lobby, "btn_refresh_table", GameLobby.BTN_REFRESH_TABLE, cc.p(897.88, 36.40), true, res_LobbyGameBai + "/btn_refresh.png", res_LobbyGameBai + "/btn_refresh_s.png");
        this.addButton(this.pn_lobby, "btn_quickPlay", GameLobby.BTN_QUICK_PLAY, cc.p(837.80, 563.00), true, res_LobbyGameBai + "/btn_choingay.png", res_LobbyGameBai + "/btn_choingay_s.png");

        this.addLayout(this.pn_lobby, "pn_top_thele", cc.p(-289.99, 0), null, cc.size(0, 0), true);
        this.addButton(this.pn_lobby, "btn_visible_full_table", GameLobby.BTN_VISISBLE_FULL_TABLE, cc.p(349.70, 37.75), true, res_LobbyGameBai + "/bt2.png", res_LobbyGameBai + "/bt2.png");
        this.btn_visible_full_table.setScaleX(0.62);

        // pn_create_room
        this.addImage(this.pn_create_room, "bg", cc.p(360.99, 355.50), res_LobbyGameBai + "/bg_createRoom.png", cc.size(560, 435));
        this.addText(this.pn_create_room, "title", cc.p(360.99, 547), "TẠO BÀN", fontRobotoBold.fontName, 34);
        this.title.setColor(cc.color("#9D5409"));
        this.addText(this.pn_create_room, "title", cc.p(360.99, 223.55), "* Mật khẩu gồm 4 ký tự là số", RobotoRegular.fontName, 16);
        this.addButton(this.pn_create_room, "btn_close_creatRoom", GameLobby.BTN_CLOSE_CREATE_ROOM, cc.p(613.38, 536.30), true, res_LobbyGameBai + "/btn_close.png", res_LobbyGameBai + "/btn_close_s.png");

        this.addLayout(this.pn_create_room, "pn_textfield", cc.p(-279.01, 0), null, cc.size(0, 0), true);
        this.addEditBox(this.pn_textfield, "tf_nameRoom", cc.p(655.89, 468.45), "San bằng tất cả", "Tên bàn", fontRobotoBold.fontName, 22, cc.size(266, 44), null, cc.TEXT_ALIGNMENT_LEFT, 50);
        this.tf_nameRoom.setFontColor(cc.color.BLACK);
        this.addEditBox(this.pn_textfield, "tf_passRoom", cc.p(655.89, 264.58), "", "Chưa có mật khẩu", fontRobotoBold.fontName, 22, cc.size(266, 44), null, cc.TEXT_ALIGNMENT_LEFT, 4);
        this.tf_passRoom.setFontColor(cc.color.BLACK);

        this.addText(this.pn_textfield, "txt_mucCuoc", cc.p(616.39, 400.81), "500K", RobotoRegular.fontName, 22);
        this.txt_mucCuoc.ignoreContentAdaptWithSize(false);
        this.txt_mucCuoc.setColor(cc.color.BLACK);
        this.txt_mucCuoc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.txt_mucCuoc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txt_mucCuoc.setContentSize(187, 30);

        this.addButton(this.pn_textfield, "btn_muccuoc", GameLobby.BTN_OPEN_MUCCUOC_CREATEROOM, cc.p(641.28, 402.81), true, res_LobbyGameBai + "/btn_chonmuc.png", res_LobbyGameBai + "/btn_chonmuc_s.png");

        this.addText(this.pn_textfield, "txt_person", cc.p(616.39, 330.28), "Số người", RobotoRegular.fontName, 22);
        this.txt_person.ignoreContentAdaptWithSize(false);
        this.txt_person.setColor(cc.color.BLACK);
        this.txt_person.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.txt_person.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txt_person.setContentSize(187, 30);
        this.txt_person.setString(this.num_person + " người");

        this.addLayout(this.pn_textfield, "pn_quyban", cc.p(0, 0), null, cc.size(0, 0), true);
        this.addImage(this.pn_quyban, "Image_1", cc.p(639.80, 467.86), res_LobbyGameBai + "/bg_quyban.png", cc.size(341, 52));
        this.addText(this.pn_quyban, "Text_1", cc.p(422.15, 467.86), "Quỹ bàn:", fontRobotoBold.fontName, 22);

        this.addEditBox(this.pn_quyban, "tf_quyban", cc.p(657.54, 468.93), "", "Quỹ bàn tối thiểu", fontRobotoBold.fontName, 22, cc.size(276, 47), null, cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_quyban.setFontColor(cc.color.BLACK);

        this.addButton(this.pn_create_room, "btn_createRoom", GameLobby.BTN_CREATE_ROOM, cc.p(360.99, 182.21), true, res_LobbyGameBai + "/btn_createRoom.png", res_LobbyGameBai + "/btn_createRoom_s.png");
        this.btn_createRoom.setScale(0.95);
        this.addLayout(this.pn_create_room, "pn_person", cc.p(361, 310.89), null, cc.size(0, 0), true);
        this.pn_person.setVisible(false);
        this.addButton(this.pn_person, "btn_per_6", GameLobby.BTN_PER_6, cc.p(91.58, 25.97), true, res_LobbyGameBai + "/btn_player_nor.png", res_LobbyGameBai + "/btn_player_select.png");
        this.btn_per_6.loadTextureDisabled(res_LobbyGameBai + "/btn_player_nor.png");
        this.addButton(this.pn_person, "btn_per_9", GameLobby.BTN_PER_9, cc.p(137.58, 25.97), true, res_LobbyGameBai + "/btn_player_select.png", res_LobbyGameBai + "/btn_player_select.png");
        this.btn_per_9.loadTextureDisabled(res_LobbyGameBai + "/btn_player_nor.png");

        this.addLayout(this.pn_create_room, "pn_mucCuoc", cc.p(361, 272.80), null, cc.size(520, 212), true);
        this.pn_mucCuoc.setVisible(false);
        this.pn_mucCuoc.setLocalZOrder(300);
        this.addImage(this.pn_mucCuoc, "bg_mucCuoc", cc.p(260.28, 106.16), res_LobbyGameBai + "/bg_chonmuc.png", cc.size(520, 212));

        this.addButton(this.pn_mucCuoc, "btn_close_pn_muccuoc", GameLobby.BTN_CLOSE_MUCCUOC_CREATE_ROOM, cc.p(260.13, 193.51), true, res_LobbyGameBai + "/bt2.png", res_LobbyGameBai + "/bt2.png");
        this.btn_close_pn_muccuoc.setScaleX(6.18); this.btn_close_pn_muccuoc.setScaleY(18.46);
        this.addListView(this.pn_mucCuoc, "lv_mucCuoc_creatroom", cc.p(260.28, 102.31), cc.size(491, 186));
        this.lv_mucCuoc_creatroom.setTouchEnabled(true);
        this.lv_mucCuoc_creatroom.setClippingEnabled(true);
        this.lv_mucCuoc_creatroom.setScrollBarEnabled(false);

        // pn_password
        this.addImage(this.pn_password, "Image_4", cc.p(360.99, 360), "res/ResourceMenuTab/Mail/bgtab_mail.png", cc.size(400, 200));
        this.addImage(this.pn_password, "Image_4_0", cc.p(360.99, 438), "res/ResourceMenuTab/Mail/Title.png", cc.size(291, 52));
        this.addText(this.pn_password, "Text_6", cc.p(360.99, 437.37), "MẬT KHẨU", fontRobotoMedium.fontName, 34);
        this.Text_6.setColor(cc.color("#642A00"));
        this.addButton(this.pn_password, "btn_close_pn_pass", GameLobby.BTN_CLOSE_PN_PASSWORD, cc.p(528.30, 427.86), true, res_LobbyGameBai + "/btn_close.png", res_LobbyGameBai + "/btn_close_s.png");
        this.addLayout(this.pn_password, "Image_7", cc.p(361.41, 366.69), null, cc.size(297, 46), false);
        this.Image_7.setColor(cc.color("#7B809D"));
        this.Image_7.setOpacity(220);

        this.addEditBox(this.pn_password, "tf_input_pass", cc.p(361.41, 366.69), "", "Nhập mật khẩu", fontRobotoBold.fontName, 20, cc.size(291, 40), null, cc.TEXT_ALIGNMENT_LEFT, 4);

        this.addButton(this.pn_password, "btn_join_table", GameLobby.BTN_JOIN_ROOM_PASS, cc.p(360.99, 304.83), true, res_LobbyGameBai + "/btn_vaoban_2.png", res_LobbyGameBai + "/btn_vaoban_2.png");

        // pn_thele_xocdia


        if (gameData.gameType == GameList.XocDia) {
            this.pn_quyban.setVisible(true);
            this.tf_nameRoom.setVisible(false);
        } else {
            this.sp_muc_cuoc_vao_ban.setVisible(true);
        }

        if (gameData.gameType == GameList.Poker) {
            this.pn_person.setVisible(true);
        }

        this.ck_visible_full_table.addEventListener(this.VisibleFullTable);

        //if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
        //    this.tf_find_id_table = lobby.changeTextFieldAsEditBox_Lobby(this.tf_find_id_table, this.pn_lobby);
        //    this.tf_nameRoom = lobby.changeTextFieldAsEditBox_Lobby(this.tf_nameRoom, this.pn_textfield);
        //    this.tf_passRoom = lobby.changeTextFieldAsEditBox_Lobby(this.tf_passRoom, this.pn_textfield);
        //    this.tf_passRoom.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        //    this.tf_input_pass = lobby.changeTextFieldAsEditBox_Lobby(this.tf_input_pass, this.pn_password);
        //    this.tf_input_pass.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        //    this.tf_input_pass.setPlaceholderFontColor(cc.color.WHITE);
        //    this.tf_find_id_table.setFontColor(cc.color.WHITE);
        //    this.tf_nameRoom.setString("San bằng tất cả");
        //    this.tf_quyban = lobby.changeTextFieldAsEditBox_Lobby(this.tf_quyban, this.pn_quyban);
        //}else{
        //    this.tf_find_id_table.addEventListener(this.text_field_event, this);
        //    this.tf_nameRoom.addEventListener(this.text_field_event, this);
        //    this.tf_passRoom.addEventListener(this.text_field_event, this);
        //    this.tf_input_pass.addEventListener(this.text_field_event, this);
        //    this.tf_quyban.addEventListener(this.text_field_event, this);
        //}


        //this.sc_guild.setTouchEnabled(true);
        //this.sc_guild.setClippingEnabled(true);
        //this.sc_guild.setScrollBarEnabled(false);
        //this.sc_cai.setTouchEnabled(true);
        //this.sc_cai.setClippingEnabled(true);
        //this.sc_cai.setScrollBarEnabled(false);

        var size = GameScene.getMainContentSize();
        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        //this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width / 2, size.height / 2);
        touchBtn.setOpacity(0);

        var chanelSelect = this.table1;
        var sizeTable = chanelSelect.getContentSize();

        var tableView = new cc.TableView(this, cc.size(sizeTable.width * 1, sizeTable.height - 95));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(chanelSelect.getPosition().x - sizeTable.width / 2, chanelSelect.getPositionY() - sizeTable.height / 2 + 55));
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.tableView = tableView;
        this.pn_tableview.addChild(tableView);
        tableView.reloadData();


        var sprite = new cc.Sprite(Res.imageCenterVinEnabled);
        this.cellSize = cc.size(sprite.getBoundingBox().width * 1.3, sprite.getBoundingBox().height * 1.3);

        this.touchBtnTab(GameLobby.BTN_VIN);

        cc.log("tao HU Vang");
        this.huVangIcon = new ThongTinHuVang();
        this.huVangIcon.nenBoBai.setVisible(false);
        cc.log("affter tao hu");
        this.huVangIcon.setPosition((cc.p(170, 563)));
        this.huVangIcon.setVisible(false);
        this.pn_tableview.addChild(this.huVangIcon);
    },

    VisibleFullTable: function () {
        if (gameLobbyInstance.is_visible_full_table == false) {
            gameLobbyInstance.ck_visible_full_table.setSelected(true);
            if (gameLobbyInstance.typeBan == MONEY_VIN)
                gameLobbyInstance.save_array_full_table = gameData.moneyBetWinList;
            else
                gameLobbyInstance.save_array_full_table = gameData.moneyBetXuList;

            var array = []
            for (var i = 0; i < gameLobbyInstance.save_array_full_table.length; i++) {
                if (gameLobbyInstance.save_array_full_table[i].getUserCount < gameLobbyInstance.save_array_full_table[i].limitPlayer) {
                    array.push(gameLobbyInstance.save_array_full_table[i]);
                }
            }
            if (gameLobbyInstance.typeBan == MONEY_VIN)
                gameData.moneyBetWinList = array;
            else
                gameData.moneyBetXuList = array;

            gameLobbyInstance.is_visible_full_table = true;
        } else {
            gameLobbyInstance.ck_visible_full_table.setSelected(false);
            gameLobbyInstance.is_visible_full_table = false;
            if (gameLobbyInstance.typeBan == MONEY_VIN)
                gameData.moneyBetWinList = gameLobbyInstance.save_array_full_table;
            else
                gameData.moneyBetXuList = gameLobbyInstance.save_array_full_table;
        }
        gameLobbyInstance.reloadTable();
    },
    chosePersonPoker: function (value) {
        if (value == 6) {
            this.num_person = 6;
            this.btn_per_6.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_select.png");
            this.btn_per_9.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_nor.png");
        } else {
            this.num_person = 9;
            this.btn_per_6.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_nor.png");
            this.btn_per_9.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_select.png");
        }
        this.txt_person.setString(this.num_person + " người");
    },

    findRoom: function (value) {
        cc.log("value: " + value);
        var stt = "" + value;
        var array = [];
        var new_array = [];
        if (value == 0) {
            if (this.typeBan == MONEY_VIN)
                new_array = gameData.save_BetVinList;
            else
                new_array = gameData.save_BetXuList;
        } else {
            if (this.typeBan == MONEY_VIN) {
                array = gameData.save_BetVinList;
            } else {
                array = gameData.save_BetXuList;
            }
            for (var i = 0; i < array.length; i++) {
                var roomid = "" + array[i].roomId;
                if (roomid.search(stt) != -1) {
                    new_array.push(array[i]);
                }
            }
        }
        if (this.typeBan == MONEY_VIN) {
            gameData.moneyBetWinList = new_array;
        } else {
            gameData.moneyBetXuList = new_array;
        }
        this.reloadTable();

    },

    text_field_event: function (sender, type) {
        switch (type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                sender.runAction(cc.scaleTo(0.225, 1.2));
                sender.setPlaceHolder("");
            }
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME: {
                sender.runAction(cc.scaleTo(0.225, 1));
                if (sender.getString() == "") {
                    if (sender.name == "tf_find_id_table") {
                        sender.setPlaceHolder("Nhập ID bàn");
                    } else if (sender.name == "tf_nameRoom") {
                        sender.setPlaceHolder("Tên bàn");
                    } else if (sender.name == "tf_passRoom") {
                        sender.setPlaceHolder("Mật khẩu");
                    } else if (sender.name == "tf_input_pass") {
                        sender.setPlaceHolder("Nhập mật khẩu");
                    } else if (sender.name == "tf_quyban") {
                        if (this.typeBan == MONEY_VIN)
                            sender.setPlaceHolder("Quỹ bàn tối thiểu: " + this.getMoneyString(this.betvalue_createroom * gameData.fundVipMinRegis));
                        else
                            sender.setPlaceHolder("Quỹ bàn tối thiểu: " + this.getMoneyString(this.betvalue_createroom * gameData.fundVipMinRegis));
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        if (str != "")
                            this.checkMoneyWithQuyBan(parseInt(str));
                    }
                }
            }
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                if (sender.name == "tf_find_id_table") {
                    var str = sender.getString();
                    str = replaceAll(".", "", str);
                    if (!isNumeric(str)) {
                        str = str.substr(0, str.length - 1);
                    }
                    if (!isNumeric(str)) {
                        str = "0";
                    }
                    sender.setString(parseInt(str));
                    this.findRoom(parseInt(str));
                } else if (sender.name == "tf_quyban") {
                    var str = sender.getString();
                    str = replaceAll(".", "", str);
                    if (!isNumeric(str)) {
                        str = str.substr(0, str.length - 1);
                    }
                    if (!isNumeric(str)) {
                        str = "0";
                    }
                    sender.setString(formatMoney(0, 3, parseInt(str)));
                }
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD: {
                if (sender.name == "tf_find_id_table") {
                    var str = sender.getString();
                    if (str == "")
                        str = 0;
                    this.findRoom(parseInt(str));
                }
            }
                break;
        }
    },

    initWithGameType: function (type) {
        if (this.imageGame) {
            this.imageGame.removeFromParent();
            this.imageGame = null;
        }

        this.imageGame = new cc.Sprite(this.getResourceImageGame(type));
        this.imageGame.setAnchorPoint(cc.p(0.5, 0.5));
        this.pn_tableview.addChild(this.imageGame);
        this.imageGame.setPosition(cc.p(640, 565));
        //if(type == GameList.TienLenSoLo){
        //    this.imageGame.setPosition(cc.p(400,565));
        //}
        //else{
        //    this.imageGame.setPosition(cc.p(350,565));
        //}
    },

    resetCountReceiveMoiChoi: function () {
        this.countDeny = 0;
        this.disableMoiChoi = false;
    },

    addDenyMoiChoi: function () {
        this.countDeny++;
        if (this.countDeny >= 3) {
            this.countDeny = 0;
            this.disableMoiChoi = true;
            this.remainTimeMoiChoi = 30 * 60;
        }
    },

    addDongYMoiChoi: function () {
        this.countDeny = 0;
        this.disableMoiChoi = false;
    },


    getResourceImageGame: function (type) {
        return "res/CardGame/CommonResource/ThongTinChung/gameImage_" + type + ".png";
    },

    sendReload: function () {
        gameWsClient.sendGetMoneyBetConfig();
        //gameWsClient.sendTopServer(this.type_topxh);
        //gameWsClient.sendTopServer(1);
    },

    show: function () {
        //test
        this.btn_quickPlay.setEnabled(true);
        if (gameData.gameType == GameList.XocDia) {
            this.pn_quyban.setVisible(true);
            this.tf_nameRoom.setVisible(false);
            this.sp_muc_cuoc_vao_ban.setVisible(false);
        } else {
            this.pn_quyban.setVisible(false);
            this.tf_nameRoom.setVisible(true);
            this.sp_muc_cuoc_vao_ban.setVisible(true);
        }
        this.resetButtonOrder(3);
        if (this.topGameLayer != null) {
            this.topGameLayer.setVisible(false);
        }
        this.pn_thele_xocdia.setVisible(false);
        this.ck_visible_full_table.setSelected(false);
        this.is_visible_full_table = false;
        this.num_person = gameData.maxPlayer;
        this.txt_person.setString(this.num_person + " người");
        menutab.Isingame = true;
        this.huVangIcon.setVisible(false)
        this.setVisible(true);
        menutab.showTopInfo();
        this.reloadTable();
        if (this.guiReceiveMoiChoi) {
            this.guiReceiveMoiChoi.setVisible(false);
        }
        if (gameData.gameType == GameList.Poker) {
            this.pn_person.setVisible(true);
            this.btn_per_6.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_nor.png");
            this.btn_per_9.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_select.png");
        } else {
            this.pn_person.setVisible(false);
        }
        if (gameWsClient) {
            gameWsClient.sendThongTinHuVang();
        }
    },

    showAndSendTopServer: function () {
        this.show();
        //gameWsClient.sendTopServer(this.type_topxh);
        //gameWsClient.sendTopServer(1);
        //GameManager.getInstance().sendRequestTopCaoThu();
    },

    showAndSendGetConfig: function () {
        this.show();
        GameLobby.getInstance().skeduleSendThongTinHuVang();
        gameWsClient.sendGetMoneyBetConfig();
        //gameWsClient.sendTopServer(0);
        GameManager.getInstance().sendRequestTopCaoThu();
        gameWsClient.sendThongTinHuVang();
    },

    onButtonTouched: function (btnm, id) {
        if (id >= GameLobby.START_JOIN_ROOM_INDEX) {
            this.buttonTouchStart = this.tableView.getContainer().getPosition();
        }
    },

    onButtonRelease: function (btn, id) {
        switch (id) {
            case GameLobby.BTN_VIN:
            case GameLobby.BTN_XU:
                this.is_draw = false;
                this.touchBtnTab(id);
                break;
            case GameLobby.BTN_REFRESH_TABLE:
                this.touchBtnTab(id);
                return;
            case GameLobby.BTN_CHOSE_MUCCUOC:
                this.resetButtonOrder(0);
                if (this.isSortBetValue == false) {
                    this.sp_loc_bet_value.setRotation(180);
                    this.isSortBetValue = true;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 1, true);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return b.moneyBet - a.moneyBet });
                    } else {
                        gameData.moneyBetXuList.sort(function (a, b) { return b.moneyBet - a.moneyBet });
                    }
                } else {
                    this.sp_loc_bet_value.setRotation(0);
                    this.isSortBetValue = false;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 1, false);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return a.moneyBet - b.moneyBet });
                    } else {
                        gameData.moneyBetXuList.sort(function (a, b) { return a.moneyBet - b.moneyBet });
                    }
                }
                this.reloadTable();
                return;
            case GameLobby.BTN_ORDER_USER:
                this.resetButtonOrder(1);
                if (this.isSortPlayer == false) {
                    this.sp_order_user.setRotation(180);
                    this.isSortPlayer = true;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 2, true);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                    } else {
                        gameData.moneyBetXuList.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                    }
                } else {
                    this.sp_order_user.setRotation(0);
                    this.isSortPlayer = false;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 2, false);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return a.getUserCount - b.getUserCount });
                    } else {
                        gameData.moneyBetXuList.sort(function (a, b) { return a.getUserCount - b.getUserCount });
                    }
                }
                this.reloadTable();
                return;
            case GameLobby.BTN_ORDER_QUY:
                this.resetButtonOrder(2);
                if (this.isSortQuy == false) {
                    this.sp_order_quy.setRotation(180);
                    this.isSortQuy = true;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 3, true);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return b.moneyRequire - a.moneyRequire });
                    } else {
                        if (gameData.gameType == GameList.XocDia)
                            gameData.moneyBetXuList.sort(function (a, b) { return b.quyban - a.quyban });
                        else
                            gameData.moneyBetXuList.sort(function (a, b) { return b.moneyRequire - a.moneyRequire });
                    }
                } else {
                    this.sp_order_quy.setRotation(0);
                    this.isSortQuy = false;
                    if (this.typeBan == MONEY_VIN) {
                        if (gameData.gameType == GameList.XocDia) {
                            gameData.moneyBetWinList = this.XocDiaOrderByBetValue(gameData.moneyBetWinList, 3, false);
                        } else
                            gameData.moneyBetWinList.sort(function (a, b) { return a.moneyRequire - b.moneyRequire });
                    } else {
                        if (gameData.gameType == GameList.XocDia)
                            gameData.moneyBetXuList.sort(function (a, b) { return a.quyban - b.quyban });
                        else
                            gameData.moneyBetXuList.sort(function (a, b) { return a.moneyRequire - b.moneyRequire });
                    }
                }
                this.reloadTable();
                return;
            case GameLobby.BTN_CREATE_TABLE:
                if (this.typeBan == MONEY_VIN) {
                    if (gameData.gameType != GameList.TienLenThuong &&
                        gameData.gameType != GameList.SamThuong &&
                        gameData.gameType != GameList.MauBinh &&
                        gameData.gameType != GameList.MauBinhTinhAt &&
                        gameData.gameType != GameList.XocDia)
                        this.openCreateRoom();
                    else
                        popup.openPanel_Alert_Lobby("Không thể tạo bàn trong game này!");
                }
                else
                    popup.openPanel_Alert_Lobby("Chỉ có tính năng tạo bàn Vin!");

                return;
            case GameLobby.BTN_CLOSE_CREATE_ROOM:
                this.closeCreateRoom();
                return;
            case GameLobby.BTN_OPEN_MUCCUOC_CREATEROOM:
                this.pn_mucCuoc.setVisible(true);
                return;
            case GameLobby.BTN_CLOSE_MUCCUOC_CREATE_ROOM:
                this.pn_mucCuoc.setVisible(false);
                return;
            case GameLobby.BTN_PER_6:
                this.chosePersonPoker(6);
                return;
            case GameLobby.BTN_PER_9:
                this.chosePersonPoker(9);
                return;
            case GameLobby.BTN_VISISBLE_FULL_TABLE:
                this.VisibleFullTable();
                return;
            case GameLobby.BTN_SHOW_THELE:
                if (gameData.gameType != GameList.XocDia) {
                    var s = GameManager.getInstance().getHotroLink(gameData.gameType);
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        if (lobby.open_payment_ios == false) {
                            popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                            return;
                        }
                    }
                    ConnectNative.openWebView(s, false);
                } else {
                    this.pn_thele_xocdia.setVisible(true);
                }
                return;
            case GameLobby.BTN_SHOW_TOP:
                gameWsClient.sendTopServer(this.type_topxh);
                return;
            case GameLobby.BTN_CREATE_ROOM:
                this.funSendCreateRoom();
                return;
            case GameLobby.BTN_JOIN_ROOM_PASS:
                waitingJoinRoom = true;
                GameManager.getInstance().addStartJoinRoom();
                var pass = this.tf_input_pass.getString();
                gameWsClient.sendJoinRoomById(this.save_room_order_join, pass);
                this.pn_password.setVisible(false);
                this.tf_input_pass.setString("");
                return;
            case GameLobby.BTN_CLOSE_PN_PASSWORD:
                this.pn_password.setVisible(false);
                this.tf_input_pass.setString("");
                return;
            case GameLobby.BTN_QUICK_PLAY:
                waitingJoinRoom = true;
                this.btn_quickPlay.setEnabled(false);
                GameManager.getInstance().addStartJoinRoom();
                if (gameData.gameType == GameList.MauBinhTinhAt)
                    gameWsClient.sendJoinRoom(this.typeBan, gameData.maxPlayer, -1, 1);
                else
                    gameWsClient.sendJoinRoom(this.typeBan, gameData.maxPlayer, -1, 0);
                return;
            case GameLobby.BTN_FIND_TABLE:
                var str = this.tf_find_id_table.getString();
                if (str == "" || str == null) {
                    popup.openPanel_Alert_Lobby("Vui lòng điền bàn bạn muốn tìm kiếm!");
                    return;
                }
                gameWsClient.sendFindRoom(parseInt(str));
                this.btn_find_table.setEnabled(false);
                //this.findRoom(parseInt(str));
                return;
            case GameLobby.BTN_CLOSE_THELE_XOCDIA:
                this.pn_thele_xocdia.setVisible(false);
                return;
            case GameLobby.BTN_GUILD_XD:
                this.pn_guild_xd.setVisible(true);
                this.pn_chinhsach_cai.setVisible(false);
                this.btn_guild_xd.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_xephang_s.png");
                this.btn_chinhsach_cai.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_xephang.png");
                return;
            case GameLobby.BTN_CHINHSACH_XD:
                this.pn_guild_xd.setVisible(false);
                this.pn_chinhsach_cai.setVisible(true);
                this.btn_guild_xd.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_xephang.png");
                this.btn_chinhsach_cai.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_xephang_s.png");
                return;
        }

        if (id >= GameLobby.START_JOIN_ROOM_INDEX) {
            cc.log(" " + this.buttonTouchStart.x + " " + this.tableView.getContainer().getPosition().x);
            if (Math.abs(this.buttonTouchStart.y - this.tableView.getContainer().getPosition().y) > 10) {
                return;
            }

            if (btn.disableJoinRoom) {

                var s;
                if (this.typeBan == MONEY_VIN) {
                    s = "Bạn không đủ Vin để vào bàn chơi này";
                }
                else {
                    s = "Bạn không đủ Xu để vào bàn chơi này";
                }

                popup.openPanel_Alert_Lobby(s);
                return;
            }

            var maxNum = 0;
            var moneyType = this.typeBan;
            var moneyBet = 0;
            var roomId = 0;
            var pass = "";
            if (moneyType == MONEY_VIN) {
                moneyBet = gameData.moneyBetWinList[id - GameLobby.START_JOIN_ROOM_INDEX].moneyBet;
                maxNum = gameData.moneyBetWinList[id - GameLobby.START_JOIN_ROOM_INDEX].maxUserPerRoom;
                roomId = gameData.moneyBetWinList[id - GameLobby.START_JOIN_ROOM_INDEX].roomId;
            } else {
                moneyBet = gameData.moneyBetXuList[id - GameLobby.START_JOIN_ROOM_INDEX].moneyBet;
                maxNum = gameData.moneyBetXuList[id - GameLobby.START_JOIN_ROOM_INDEX].maxUserPerRoom;
                roomId = gameData.moneyBetXuList[id - GameLobby.START_JOIN_ROOM_INDEX].roomId;
            }
            cc.log("watingJoinRoom: " + waitingJoinRoom);

            if (waitingJoinRoom == false) {
                var rule = 0;
                if (gameData.gameType == GameList.MauBinhTinhAt)
                    rule = 1;
                if (this.typeBan == MONEY_VIN) {
                    if (gameData.moneyBetWinList[id - GameLobby.START_JOIN_ROOM_INDEX].key == true) {
                        if (this.checkJoinRoomHavePass(gameData.moneyBetWinList[id - GameLobby.START_JOIN_ROOM_INDEX].roomId) >= 3) {
                            popup.openPanel_Alert_Lobby("Bạn đã nhập sai mã bàn 3 lần!");
                            return;
                        }
                        this.pn_password.setVisible(true);
                        this.save_room_order_join = roomId;
                        return;
                    }
                } else {
                    if (gameData.moneyBetXuList[id - GameLobby.START_JOIN_ROOM_INDEX].key == true) {
                        this.pn_password.setVisible(true);
                        this.save_room_order_join = roomId;
                        return;
                    }
                }

                GameManager.getInstance().addStartJoinRoom();
                cc.log("sendJoinRoom");
                gameWsClient.sendJoinRoomById(roomId, pass);
                waitingJoinRoom = true;
            }
        }
    },

    checkJoinRoomHavePass: function (roomID) {
        var numJoin = 0;
        var check = false;
        for (var i = 0; i < gameData.ListRoomHavePass.length; i++) {
            if (roomID == gameData.ListRoomHavePass[i].roomId) {
                numJoin = gameData.ListRoomHavePass[i].numJoin;
                numJoin = numJoin + 1;
                gameData.ListRoomHavePass[i].numJoin = numJoin;
                check = true;
                break;
            }
        }

        if (check == false) {
            var kk = new RoomLock(
                roomID,
                numJoin
            );
            gameData.ListRoomHavePass.push(kk);
        }
        cc.log("numJoin + " + numJoin);
        return numJoin;
    },

    XocDiaOrderByBetValue: function (list, kind, order) { // false: be den lon, true: lon den be   /// kind = 1 moneybet, kind = 2 getUserCount; kind = 3 quyban
        var list_world = [];
        var list_master = [];
        var list_normal = [];
        var new_list = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].rule == 1) {
                list_world.push(list[i]);
            } else if (list[i].rule == 2) {
                list_master.push(list[i]);
            } else {
                list_normal.push(list[i]);
            }
        }
        if (order == false) {
            if (kind == 1) {
                list_world.sort(function (a, b) { return a.moneyBet - b.moneyBet });
                list_master.sort(function (a, b) { return a.moneyBet - b.moneyBet });
                list_normal.sort(function (a, b) { return a.moneyBet - b.moneyBet });
            } else if (kind == 2) {
                list_world.sort(function (a, b) { return a.getUserCount - b.getUserCount });
                list_master.sort(function (a, b) { return a.getUserCount - b.getUserCount });
                list_normal.sort(function (a, b) { return a.getUserCount - b.getUserCount });
            } else if (kind == 3) {
                list_world.sort(function (a, b) { return a.quyban - b.quyban });
                list_master.sort(function (a, b) { return a.quyban - b.quyban });
                list_normal.sort(function (a, b) { return a.quyban - b.quyban });
            }
        } else {
            if (kind == 1) {
                list_world.sort(function (a, b) { return b.moneyBet - a.moneyBet });
                list_master.sort(function (a, b) { return b.moneyBet - a.moneyBet });
                list_normal.sort(function (a, b) { return b.moneyBet - a.moneyBet });
            } else if (kind == 2) {
                list_world.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                list_master.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                list_normal.sort(function (a, b) { return b.getUserCount - a.getUserCount });
            } else if (kind == 3) {
                list_world.sort(function (a, b) { return b.quyban - a.quyban });
                list_master.sort(function (a, b) { return b.quyban - a.quyban });
                list_normal.sort(function (a, b) { return b.quyban - a.quyban });
            }
        }
        for (var i = 0; i < list_world.length; i++) {
            new_list.push(list_world[i]);
        }
        for (var i = 0; i < list_master.length; i++) {
            new_list.push(list_master[i]);
        }
        for (var i = 0; i < list_normal.length; i++) {
            new_list.push(list_normal[i]);
        }
        return new_list;
    },

    resetButtonOrder: function (value) {
        this.sp_loc_bet_value.setRotation(0);
        this.sp_order_user.setRotation(0);
        this.sp_order_quy.setRotation(0);
        if (value == 0) { /// order by betvalue
            this.isSortPlayer = false;
            this.isSortQuy = false;
        } else if (value == 1) { /// order by player
            this.isSortBetValue = false;
            this.isSortQuy = false;
        } else if (value == 2) { /// order by quy
            this.isSortPlayer = false;
            this.isSortBetValue = false;
        } else if (value == 3) { /// set lai tat ca
            this.isSortPlayer = false;
            this.isSortBetValue = false;
            this.isSortQuy = false;
        }
    },
    checkMoneyWithQuyBan: function (value) {
        var quy_ban = parseInt(this.betvalue_createroom * gameData.fundVipMinRegis);
        if (value <= quy_ban) {
            this.tf_quyban.setString(formatMoney(0, 3, quy_ban));
            this.save_quyban_createroom = quy_ban;
        } else {
            this.tf_quyban.setString(formatMoney(0, 3, value));
            this.save_quyban_createroom = value;
        }
    },

    funSendCreateRoom: function () {
        var nameroom = this.tf_nameRoom.getString();
        var pass = this.tf_passRoom.getString();
        var quyban = 0;
        if (gameData.gameType == GameList.XocDia) {
            var tf = this.tf_quyban.getString();
            if (tf == "") {
                popup.openPanel_Alert_Lobby("Bạn chưa nhập mức quỹ bàn!");
                return;
            }
            quyban = this.save_quyban_createroom;
            gameWsClient.sendCreateRoom(this.typeBan, gameData.maxPlayer, this.betvalue_createroom, 2, this.num_person, pass, lobby.encode_utf8(nameroom), quyban);
        } else if (gameData.gameType == GameList.MauBinhTinhAt) {
            gameWsClient.sendCreateRoom(this.typeBan, gameData.maxPlayer, this.betvalue_createroom, 1, this.num_person, pass, lobby.encode_utf8(nameroom), quyban);
        } else {
            gameWsClient.sendCreateRoom(this.typeBan, gameData.maxPlayer, this.betvalue_createroom, 0, this.num_person, pass, lobby.encode_utf8(nameroom), quyban);
        }
        //this.pn_create_room.setVisible(false);
    },

    openCreateRoom: function () {
        this.pn_create_room.setVisible(true);
        if (gameData.gameType != GameList.XocDia) {
            this.tf_nameRoom.setString(gameData.initDefautNameRoom());
        }
        if (this.save_type_createRoom != gameData.gameType) {
            this.save_type_createRoom = gameData.gameType;
            /// draw list muc cuoc create room
            this.lv_mucCuoc_creatroom.removeAllItems();
            this.lv_mucCuoc_creatroom.removeAllChildren();
            var cellWidth = this.lv_mucCuoc_creatroom.width;
            var peace = cellWidth / 5;
            var cellHeight = this.lv_mucCuoc_creatroom.height / 2;
            var fonts = { fontName: "Roboto-Medium", src: [{ src: "res/Font/Roboto-Medium.ttf", type: "truetype" }] };
            var array_draw = [];
            if (this.typeBan == MONEY_VIN)
                array_draw = gameData.configVinList;
            else
                array_draw = gameData.configXuList;

            this.txt_mucCuoc.setString(this.getMoneyString(array_draw[0]));
            this.betvalue_createroom = array_draw[0];
            if (gameData.gameType == GameList.XocDia) {
                this.tf_quyban.setPlaceHolder("Quỹ bàn tối thiểu: " + this.getMoneyString(array_draw[0] * gameData.fundVipMinRegis));
                this.tf_quyban.setString(formatMoney(0, 3, array_draw[0] * gameData.fundVipMinRegis));
                this.save_quyban_createroom = parseInt(this.betvalue_createroom * gameData.fundVipMinRegis);
            }
            var length_bet = array_draw.length;
            var cell_int = parseInt(length_bet / 5);
            var bet_du = length_bet - (cell_int * 5);
            var name = 0;

            for (var i = 0; i < cell_int; i++) {
                var cellList = new ccui.Layout();
                cellList.width = this.lv_mucCuoc_creatroom.width;
                cellList.height = cellHeight;
                for (var j = 0; j < 5; j++) {
                    var button = new ccui.Button("res/CardGame/CommonResource/ChonBan/btn_select_muc.png", "res/CardGame/CommonResource/ChonBan/btn_select_muc_s.png", "res/CardGame/CommonResource/ChonBan/btn_select_muc_s.png");
                    button.setPosition(cc.p(peace / 2 + peace * j, cellHeight / 2));
                    button.setName(name);
                    cellList.addChild(button);
                    //button.addTouchEventListener(this.onTouchSelectBetValue, this);
                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.onTouchSelectBetValue(sender.name);
                                break;
                        }

                    }, this);

                    if (this.typeBan == MONEY_VIN)
                        var sp_kind = new cc.Sprite("res/CardGame/CommonResource/ChonBan/vin.png");
                    else
                        var sp_kind = new cc.Sprite("res/CardGame/CommonResource/ChonBan/xu.png");
                    cellList.addChild(sp_kind);
                    sp_kind.setPosition(button.getPositionX(), button.getPositionY() + 10);

                    var lb_value = new cc.LabelTTF('', fontArialB.fontName, 20, cc.size(50, 25), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_value.setColor(cc.color("#a35400"));
                    lb_value.setString(this.getMoneyString(array_draw[name]));
                    lb_value.setPosition(button.getPositionX(), button.getPositionY() - 30);
                    cellList.addChild(lb_value);

                    name = name + 1;
                }
                this.lv_mucCuoc_creatroom.pushBackCustomItem(cellList);
            }

            if (bet_du > 0) {
                var cellList = new ccui.Layout();
                cellList.width = this.lv_mucCuoc_creatroom.width;
                cellList.height = cellHeight;
                for (var j = 0; j < bet_du; j++) {
                    var button = new ccui.Button("res/CardGame/CommonResource/ChonBan/btn_select_muc.png", "res/CardGame/CommonResource/ChonBan/btn_select_muc_s.png", "res/CardGame/CommonResource/ChonBan/btn_select_muc_s.png");
                    button.setPosition(cc.p(peace / 2 + peace * j, cellHeight / 2));
                    button.setName(name);
                    cellList.addChild(button);
                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.onTouchSelectBetValue(sender.name);
                                break;
                        }

                    }, this);

                    if (this.typeBan == MONEY_VIN)
                        var sp_kind = new cc.Sprite("res/CardGame/CommonResource/ChonBan/vin.png");
                    else
                        var sp_kind = new cc.Sprite("res/CardGame/CommonResource/ChonBan/xu.png");
                    cellList.addChild(sp_kind);
                    sp_kind.setPosition(button.getPositionX(), button.getPositionY() + 10);

                    var lb_value = new cc.LabelTTF('', fontArialB.fontName, 20, cc.size(50, 25), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_value.setColor(cc.color("#a35400"));
                    lb_value.setString(this.getMoneyString(array_draw[name]));
                    lb_value.setPosition(button.getPositionX(), button.getPositionY() - 30);
                    cellList.addChild(lb_value);

                    name = name + 1;
                }
                this.lv_mucCuoc_creatroom.pushBackCustomItem(cellList);
            }
        }
    },

   
    onTouchSelectBetValue: function (name) {
        var array_draw = [];
        if (this.typeBan == MONEY_VIN)
            array_draw = gameData.configVinList;
        else
            array_draw = gameData.configXuList;
        this.txt_mucCuoc.setString(this.getMoneyString(array_draw[name]));
        this.betvalue_createroom = array_draw[name];
        this.pn_mucCuoc.setVisible(false);
        if (gameData.gameType == GameList.XocDia) {
            this.tf_quyban.setPlaceHolder("Quỹ bàn tối thiểu: " + this.getMoneyString(array_draw[name] * gameData.fundVipMinRegis));
            this.tf_quyban.setString(formatMoney(0, 3, array_draw[name] * gameData.fundVipMinRegis));
            var str = this.tf_quyban.getString();
            str = replaceAll(".", "", str);
            if (str != "")
                this.checkMoneyWithQuyBan(parseInt(str));
        }
    },

    closeCreateRoom: function () {
        this.tf_quyban.setString("");
        this.tf_passRoom.setString("");
        this.pn_create_room.setVisible(false);
        var array_draw = [];
        if (this.typeBan == MONEY_VIN)
            array_draw = gameData.configVinList;
        else
            array_draw = gameData.configXuList;
        this.txt_mucCuoc.setString(this.getMoneyString(array_draw[0]));
        this.betvalue_createroom = array_draw[0];
        if (gameData.gameType == GameList.XocDia) {
            this.tf_quyban.setPlaceHolder("Quỹ bàn tối thiểu: " + this.getMoneyString(array_draw[0] * gameData.fundVipMinRegis));
            this.tf_quyban.setString(formatMoney(0, 3, array_draw[0] * gameData.fundVipMinRegis));
            this.save_quyban_createroom = parseInt(this.betvalue_createroom * gameData.fundVipMinRegis);
        }
        this.num_person = gameData.maxPlayer;
        if (gameData.gameType == GameList.Poker) {
            this.btn_per_6.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_nor.png");
            this.btn_per_9.loadTextureNormal("res/CardGame/CommonResource/ChonBan/btn_player_select.png");
        }
        this.txt_person.setString(this.num_person + " người");
    },

    reloadTopServer: function () {
        if (this.topGameLayer) {
            this.topGameLayer.reloadTable();
        }
    },

    reloadTopCaoThu: function () {
        if (this.topCaoThuLayer) {
            this.topCaoThuLayer.reloadTable();
        }
    },

    touchBtnTab: function (id) {
        var setEnable = false;
        var refreshCheckbox = false;
        if (id == GameLobby.BTN_VIN) {
            if (this.typeBan != MONEY_VIN) {
                this.btn_Vin.loadTextures(Res.lobbyMoneySelect, Res.lobbyMoneyClick, Res.lobbyMoneyUnselect);
                this.btn_Xu.loadTextures(Res.lobbyMoneyUnselect, Res.lobbyMoneyClick, Res.lobbyMoneyUnselect);
                if (gameData.gameType == GameList.MauBinhTinhAt)
                    gameWsClient.sendGetListRoom(MONEY_VIN, gameData.maxPlayer, -1, 1, CARD_FROM, CARD_TO);
                else
                    gameWsClient.sendGetListRoom(MONEY_VIN, gameData.maxPlayer, -1, 0, CARD_FROM, CARD_TO);
                this.typeBan = MONEY_VIN;
                setEnable = true;
                refreshCheckbox = true;
                this.resetButtonOrder();
            }
        }
        else if (id == GameLobby.BTN_XU) {
            if (this.typeBan != MONEY_XU) {
                this.btn_Vin.loadTextures(Res.lobbyMoneyUnselect, Res.lobbyMoneyClick, Res.lobbyMoneyUnselect);
                this.btn_Xu.loadTextures(Res.lobbyMoneySelect, Res.lobbyMoneyClick, Res.lobbyMoneyUnselect);
                if (gameData.gameType == GameList.MauBinhTinhAt)
                    gameWsClient.sendGetListRoom(MONEY_XU, gameData.maxPlayer, -1, 1, CARD_FROM, CARD_TO);
                else
                    gameWsClient.sendGetListRoom(MONEY_XU, gameData.maxPlayer, -1, 0, CARD_FROM, CARD_TO);
                this.typeBan = MONEY_XU;
                setEnable = true;
                refreshCheckbox = true;
                this.resetButtonOrder();
            }
        }
        if (id == GameLobby.BTN_REFRESH_TABLE) {
            if (gameData.gameType == GameList.MauBinhTinhAt)
                gameWsClient.sendGetListRoom(this.typeBan, gameData.maxPlayer, this.save_muccuoc, 1, CARD_FROM, CARD_TO);
            else
                gameWsClient.sendGetListRoom(this.typeBan, gameData.maxPlayer, this.save_muccuoc, 0, CARD_FROM, CARD_TO);
            setEnable = true;
        }

        if (setEnable == true) {
            this.btn_Vin.setEnabled(false);
            this.btn_Xu.setEnabled(false);
            this.btn_refresh_table.setEnabled(false);
        }
        if (refreshCheckbox == true) {
            this.ck_visible_full_table.setSelected(false);
            this.is_visible_full_table = false;
        }
    },

    reloadTable: function () {
        this.tableView.reloadData();
        var maxId = this.getMaxIndex();
        //this.tableView.setContentOffset(cc.p(0*this.cellSize.width,  0));
    },

    getMaxIndex: function () {
        var money;
        var i;
        var betConfig = [];
        //test
        //if(!lobby.userInfo){
        //    return 0;
        //}

        if (this.typeBan == MONEY_VIN) {
            money = lobby.userInfo.vinTotal;
            betConfig = gameData.moneyBetWinList;
        } else {
            money = lobby.userInfo.xuTotal;
            betConfig = gameData.moneyBetXuList;
        }

        for (i = betConfig.length - 1; i >= 0; i--) {
            if (betConfig[i].moneyRequire <= money) {
                return Math.floor(i / 2);
            }
        }
        return 0;
    },

    scrollViewDidScroll: function (view) {
    },

    scrollViewDidZoom: function (view) {
    },

    tableCellSizeForIndex: function (table, idx) {
        var sprite = new cc.Sprite(Res.imageCenterVinEnabled);
        return cc.size(sprite.getBoundingBox().width * 1.3, sprite.getBoundingBox().height * 1.04);
    },

    tableCellAtIndex: function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new TableRoomCell();
            cell.items[0].setPressedActionEnabled(false);
            cell.items[0].addTouchEventListener(this.onTouchEventHandler, this);
            cell.items[0].setSwallowTouches(false);
        } else {

        }

        if (this.typeBan == MONEY_VIN) {
            cell.updateWithItem(gameData.moneyBetWinList[idx], gameData.moneyBetWinList[idx + 1], 1, gameData.gameType);
        }
        else {
            cell.updateWithItem(gameData.moneyBetXuList[idx], gameData.moneyBetXuList[idx + 1], 0, gameData.gameType);
        }

        for (var i = 0; i < 1; i++) {
            cell.items[i].setTag(idx + i + GameLobby.START_JOIN_ROOM_INDEX);
            if (this.typeBan == MONEY_VIN) {
                cell.items[i].loadTextures(Res.imageCenterJoinRoomEnable, Res.imageCenterJoinRoomPress, Res.imageCenterJoinRoomDisable);

            } else {
                cell.items[i].loadTextures(Res.imageCenterJoinRoomEnable, Res.imageCenterJoinRoomPress, Res.imageCenterJoinRoomDisable);
            }

            if (this.typeBan == MONEY_VIN) {
                if (!lobby.userInfo || lobby.userInfo.vinTotal < gameData.moneyBetWinList[idx + i].moneyRequire) {
                    //cell.items[i].setEnabled(false);
                    cell.items[i].setBright(false);
                    cell.items[i].disableJoinRoom = true;
                    cell.bground[i].setTexture(Res.imageCenterVinDisabled);
                    if (gameData.gameType == GameList.XocDia) {
                        if (gameData.moneyBetWinList[idx + i].rule == 1) {
                            cell.bground[i].setTexture(Res.imageCenterWorldVinDisabled);
                        } else if (gameData.moneyBetWinList[idx + i].rule == 2) {
                            cell.bground[i].setTexture(Res.imageCenterVipVinDisabled);
                        } else
                            cell.bground[i].setTexture(Res.imageCenterVinDisabled);
                    }
                } else {
                    cell.items[i].disableJoinRoom = false;
                    //cell.items[i].setEnabled(true);
                    cell.items[i].setBright(true);
                    cell.bground[i].setTexture(Res.imageCenterVinEnabled);
                    if (gameData.gameType == GameList.XocDia) {
                        if (gameData.moneyBetWinList[idx + i].rule == 1) {
                            cell.bground[i].setTexture(Res.imageCenterWorldVinEnabled);
                        } else if (gameData.moneyBetWinList[idx + i].rule == 2) {
                            cell.bground[i].setTexture(Res.imageCenterVipVinEnabled);
                        }
                    }
                }
            }
            else if (this.typeBan == MONEY_XU) {
                if (!lobby.userInfo || lobby.userInfo.xuTotal < gameData.moneyBetXuList[idx + i].moneyRequire) {
                    cell.items[i].setEnabled(true);
                    cell.items[i].setBright(false);
                    cell.items[i].disableJoinRoom = true;
                    cell.bground[i].setTexture(Res.imageCenterXuDisabled);
                } else {
                    cell.items[i].disableJoinRoom = false;
                    cell.items[i].setEnabled(true);
                    cell.items[i].setBright(true);
                    cell.bground[i].setTexture(Res.imageCenterXuEnabled);
                }
            }
        }
        return cell;
    },

    numberOfCellsInTableView: function (table) {
        if (this.typeBan == MONEY_VIN) {
            return Math.floor(gameData.moneyBetWinList.length);
        }
        else {
            return Math.floor(gameData.moneyBetXuList.length);
        }

    },

    skeduleSendThongTinHuVang: function () {
        cc.log("schedule");
        this.startTime = 0;
        this.timeFromStart = 0;
        this.remainTime = 0;
        this.canUpdate = true;
        this.scheduleUpdate();
    },

    unscheduleThongTinHuVang: function () {
        this.canUpdate = false;
        this.timeFromStart = 0;
        this.startTime = 0;
        this.huVangIcon.setVisible(false);
        this.unscheduleUpdate();
    },

    update: function (dt) {
        if (!this.canUpdate) {
            return;
        }


        if (this.disableMoiChoi) {
            this.remainTimeMoiChoi = this.remainTimeMoiChoi - dt;
            if (this.remainTimeMoiChoi <= 0) {
                this.remainTimeMoiChoi = 0;
                this.disableMoiChoi = false;
            }
        }



        var flag = false;
        this.startTime += dt;
        if (this.startTime >= 1) {
            this.startTime = 0;
            if (this.remainTime > 0) {
                this.remainTime--;
                if (this.remainTime == 0) {
                    flag = true;
                }
            }
            else if (this.remainTime < 0) {
                this.remainTime++;
                if (this.remainTime == 0) {
                    flag = true;
                }
            }

            if (this.isVisible()) {
                this.huVangIcon.updateTime(this.remainTime, null);
            } else {
                var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
                if (gameScene != null) {
                    //Test
                    //gameScene.updateHuVangIcon(this.remainTime);
                }
            }

            this.timeFromStart++;
            if (this.timeFromStart % 60000 == 0) {
                flag = true;
            }
        }

        if (flag && gameWsClient) {
            gameWsClient.sendThongTinHuVang();
        }
    },

    updateThongTinHuVang: function (pk) {
        this.remainTime = pk.remainTime;

        if (pk.remainTime == 0) {
            this.huVangIcon.setVisible(false);
        } else {
            this.huVangIcon.setVisible(true);
        }


        this.huVangIcon.updateWithData(pk);
    },

    receiveMoiChoi: function (data) {
        if (gameData.gameType == GameList.Poker) {
            if (data.maxUser == 6 || data.maxUser == 9) {
                if (!this.guiReceiveMoiChoi) {
                    this.guiReceiveMoiChoi = new ReceiveMoiChoiLayer();
                    var curScene = SceneMgr.getInstance().getRunningScene();
                    curScene.addGUI(this.guiReceiveMoiChoi, BaseScene.INDEX_INFO_GUI, 2);
                    this.guiReceiveMoiChoi.setLocalZOrder(10);
                }
                cc.log("receive moi choi");
                if (this.disableMoiChoi == false) {
                    cc.log("show moi choi");
                    this.disableMoiChoi = true;
                    this.guiReceiveMoiChoi.show();
                    this.guiReceiveMoiChoi.updateGui(data);
                }
            }
            return;
        }

        if (gameData.gameType == GameList.MauBinh || gameData.gameType == GameList.MauBinhTinhAt) {
            if (gameData.ruleType != data.rule)
                return;
        }

        if (data.maxUser == gameData.maxPlayer) {
            if (!this.guiReceiveMoiChoi) {
                this.guiReceiveMoiChoi = new ReceiveMoiChoiLayer();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(this.guiReceiveMoiChoi, BaseScene.INDEX_INFO_GUI, 2);
                this.guiReceiveMoiChoi.setLocalZOrder(10);
            }
            cc.log("receive moi choi");
            if (this.disableMoiChoi == false) {
                cc.log("show moi choi");
                this.disableMoiChoi = true;
                this.guiReceiveMoiChoi.show();
                this.guiReceiveMoiChoi.updateGui(data);
            }
        }
    },

    getMoneyString: function (num) {
        if (num < 1000) {
            return "" + num;
        } else if (num < 1000000) {
            return "" + Math.floor(num / 1000) + "K";
        } else {
            return "" + Math.floor(num / 1000000) + "M";
        }
    },
});

var gameLobbyInstance = null;
GameLobby.hasInit = false;
GameLobby.getInstance = function () {
    if (gameLobbyInstance == null) {
        GameLobby.hasInit = true;
        gameLobbyInstance = new GameLobby();
        GameScene.addGUI(gameLobbyInstance, BaseScene.INDEX_GAME_GUI, 0);

    }
    return gameLobbyInstance;
}


GameLobby.BTN_VIN = 1001;
GameLobby.BTN_XU = 1002;
GameLobby.START_JOIN_ROOM_INDEX = 1006;
GameLobby.BTN_CHOSE_MUCCUOC = 1;
GameLobby.BTN_FIND_TABLE = 2;
GameLobby.BTN_CREATE_TABLE = 3;
GameLobby.BTN_REFRESH_TABLE = 4;
GameLobby.BTN_QUICK_PLAY = 5;
GameLobby.BTN_CLOSE_CREATE_ROOM = 7;
GameLobby.BTN_CLOSE_MUCCUOC_CREATE_ROOM = 8;
GameLobby.BTN_OPEN_MUCCUOC_CREATEROOM = 9;
GameLobby.BTN_SHOW_THELE = 12;
GameLobby.BTN_SHOW_TOP = 13;
GameLobby.BTN_PER_6 = 14;
GameLobby.BTN_PER_9 = 15;
GameLobby.BTN_VISISBLE_FULL_TABLE = 16;
GameLobby.BTN_CREATE_ROOM = 17;
GameLobby.BTN_JOIN_ROOM_PASS = 18;
GameLobby.BTN_CLOSE_PN_PASSWORD = 19;
GameLobby.BTN_CLOSE_THELE_XOCDIA = 20;
GameLobby.BTN_GUILD_XD = 21;
GameLobby.BTN_CHINHSACH_XD = 22;
GameLobby.BTN_ORDER_USER = 23;
GameLobby.BTN_ORDER_QUY = 24;
