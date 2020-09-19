/**
 * Created by vinplay on 3/15/17.
 */

CoTuong.PopupTag = {
    CAU_HOA: 100,
    CAU_HOA_CONFIRM: 101,
    CAU_HOA_DENIED: 102,
    XIN_THUA: 103,
    XIN_THUA_DENIED: 104,
    KHIEU_CHIEN: 105,
    KHIEU_CHIEN_CONFIRM: 106,
    KHIEU_CHIEN_DENIED: 107
};

CoTuong.Popup = cc.Node.extend({
    ctor: function(gameScene) {
        this._super();
        this.bg = new cc.Sprite("res/GameCo/CoTuong/popup/cuon_thu_do.png");
        this.addChild(this.bg);

        this.lblText = new cc.LabelTTF("", fontArialB.fontName, 25, cc.size(350, 0));
        this.addChild(this.lblText);
        this.lblText.setColor({r: 251, g: 219, b: 0});
        this.lblText.setPosition(0, 30);

        var size = GameScene.getMainContentSize();
        this.gameScene = gameScene;
        gameScene.addChild(this);
        this.setPosition(size.width / 2, size.height * 0.6);
    },

    showCauHoaSendConfirm: function() {
        this.lblText.setString("Bạn chắc chắn muốn cầu hoà");
        this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var btnSendCauHoa = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnSendCauHoa);
        btnSendCauHoa.setPosition(-100, -50);
        btnSendCauHoa.addTouchEventListener(this.onSendCauHoa, this);

        var btnCancel = new ccui.Button("res/GameCo/CoTuong/popup/bt_khong.png");
        this.addChild(btnCancel);
        btnCancel.setPosition(100, -50);
        btnCancel.addTouchEventListener(this.onCancel, this);
    },

    showXinThuaSendConfirm: function() {
        this.lblText.setString("Bạn chắc chắn muốn xin thua");
        this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var btnSendCauHoa = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnSendCauHoa);
        btnSendCauHoa.setPosition(-100, -50);
        btnSendCauHoa.addTouchEventListener(this.onSendXinThua, this);

        var btnCancel = new ccui.Button("res/GameCo/CoTuong/popup/bt_khong.png");
        this.addChild(btnCancel);
        btnCancel.setPosition(100, -50);
        btnCancel.addTouchEventListener(this.onCancel, this);
    },

    showCauHoaConfirm: function() {
        this.lblText.setString("Đối phương muốn cầu hòa");
        this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        var btnAcceptCauHoa = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnAcceptCauHoa);
        btnAcceptCauHoa.setPosition(-100, -50);
        btnAcceptCauHoa.addTouchEventListener(this.onAcceptCauHoa, this);

        var btnDenyCauHoa = new ccui.Button("res/GameCo/CoTuong/popup/bt_khong.png");
        this.addChild(btnDenyCauHoa);
        btnDenyCauHoa.setPosition(100, -50);
        btnDenyCauHoa.addTouchEventListener(this.onDenyCauHoa, this);
    },

    showCauHoaDenied: function(error) {
        if (error == 1) {
            this.lblText.setString("Hết lượt cầu hòa");
            this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        } else if (error == 2) {
            this.lblText.setString("Đối thủ không đồng ý hòa");
            this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        } else if (error == 3) {
            this.lblText.setString("Bạn không đủ điều kiện cầu hòa");
        }
        var btnOk = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnOk);
        btnOk.setPosition(0, -50);
        btnOk.addTouchEventListener(this.onCancel, this);
    },

    showKhieuChienDenied: function(error) {
        if (error == 1) {
            this.lblText.setString("Hết lượt khiêu chiến");
            this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        } else if (error == 2) {
            this.lblText.setString("Đối thủ không đồng ý lời khiêu chiến");
        } else if (error == 3) {
            this.lblText.setString("Bạn đang khiêu chiến người chơi khác");
        }
        var btnOk = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnOk);
        btnOk.setPosition(0, -50);
        btnOk.addTouchEventListener(this.onCancel, this);
    },

    showXinThuaDenied: function(error) {
        this.lblText.setString("Bạn chưa đi đủ số nước cần thiết để xin thua");
        var btnOk = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnOk);
        btnOk.setPosition(0, -50);
        btnOk.addTouchEventListener(this.onCancel, this);
    },

    showKhieuChienConfirm: function(nickName, moneyBet) {
        this.nickName = nickName;
        this.moneyBet = moneyBet;
        var moneyName = "";
        //var moneyColor;
        if (CoTuong.gameLogic.moneyType == MONEY_VIN) {
            moneyName = "vin";
        //    moneyColor = {r:231, g:2, b:254};
        } else {
            moneyName = "xu";
        //    moneyColor = {r:247, g:235, b:198};
        }
        this.lblText.setString("thách đấu bạn với mức cược");
        this.lblText.setPositionY(30);

        var lblName = new cc.LabelTTF(nickName, fontArialB.fontName, 25);
        var lblMoney = new cc.LabelTTF(StringUtility.formatNumberSymbol(moneyBet) + " " + moneyName, fontArialB.fontName, 25);
        lblName.setColor(cc.color.WHITE);
        lblMoney.setColor(cc.color.WHITE);
        lblName.y = 65;
        lblMoney.y = -5;
        this.addChild(lblName);
        this.addChild(lblMoney);

        var btnAcceptKhieuChien = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnAcceptKhieuChien);
        btnAcceptKhieuChien.setPosition(-100, -50);
        btnAcceptKhieuChien.addTouchEventListener(this.onAcceptKhieuChien, this);

        var btnCancelKhieuChien = new ccui.Button("res/GameCo/CoTuong/popup/bt_khong.png");
        this.addChild(btnCancelKhieuChien);
        btnCancelKhieuChien.setPosition(100, -50);
        btnCancelKhieuChien.addTouchEventListener(this.onDenyKhieuChien, this);
    },

    showKhieuChien: function(nickName, moneyBet) {
        this.nickName = nickName;
        this.moneyBet = moneyBet;
        var moneyName = "";
        if (CoTuong.gameLogic.moneyType == MONEY_VIN)
            moneyName = "vin";
        else
            moneyName = "xu";
        this.lblText.setString("Bạn muốn khiêu chiến");
        this.lblText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.lblText.setFontSize(25);
        this.lblText.x = 0;
        this.lblText.y = 60;

        var lblName = new cc.LabelTTF(nickName, fontArialB.fontName, 25);
        var lblMoney = new cc.LabelTTF(StringUtility.formatNumberSymbol(moneyBet) + " " + moneyName, fontArialB.fontName, 25);
        var lblMuccuoc = new cc.LabelTTF("Mức cược", fontArialB.fontName, 25);
        lblMuccuoc.setColor({r: 251, g: 219, b: 0});
        lblName.setColor(cc.color.WHITE);
        lblMoney.setColor(cc.color.WHITE);
        lblMoney.setAnchorPoint(0, 0.5);
        lblName.y = 30;
        lblMuccuoc.x = -50;
        lblMuccuoc.y = -5;
        lblMoney.y = -5;
        lblMoney.x = 17;
        this.addChild(lblName);
        this.addChild(lblMoney);
        this.addChild(lblMuccuoc);

        var btnSendKhieuChien = new ccui.Button("res/GameCo/CoTuong/popup/bt_dong_y.png");
        this.addChild(btnSendKhieuChien);
        btnSendKhieuChien.setPosition(-100, -50);
        btnSendKhieuChien.addTouchEventListener(this.onSendKhieuChien, this);

        var btnCancel = new ccui.Button("res/GameCo/CoTuong/popup/bt_khong.png");
        this.addChild(btnCancel);
        btnCancel.setPosition(100, -50);
        btnCancel.addTouchEventListener(this.onCancel, this);
    },

    onSendKhieuChien: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendKhieuChien(this.nickName, this.moneyBet);
            this.setVisible(false);
        }
    },

    onSendCauHoa: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendCauHoa();
            this.setVisible(false);
        }
    },

    onSendXinThua: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendXinThua();
            this.setVisible(false);
        }
    },

    onAcceptCauHoa: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendCauHoaResponse(true);
            this.setVisible(false);
        }
    },

    onDenyCauHoa: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendCauHoaResponse(false);
            this.setVisible(false);
        }
    },

    onAcceptKhieuChien: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendKhieuChienResponse(true, this.nickName, this.moneyBet);
            this.setVisible(false);
        }
    },

    onDenyKhieuChien: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            gameWsClient.sendKhieuChienResponse(false, this.nickName, this.moneyBet);
            this.setVisible(false);
        }
    },

    onCancel: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.setVisible(false);
        }
    }
});