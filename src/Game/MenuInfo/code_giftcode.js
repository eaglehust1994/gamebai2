var giftcode = null;
var giftcodeX = null; var giftcodeY = null;
var giftcodeAppear = null;

var code_giftcode = BaseLayer.extend(
    {
        ctor: function () {
            //// panel dieu khoan
            this.pn_giftcode = null;
            this.btn_close_giftcode = null;
            this.tf_giftcode = null;
            this.btn_clear_gift = null;
            this.btn_nhanGift = null;
            this.pn_thongbao = null;
            this.content_thongbao = null;
            this.btn_close_thongbao = null;
            this.ct_success = null;
            this.ct_vin = null;
            this.ct_xu = null;
            this.ct_other = null;

            this.vin_receive = 0;
            this.xu_receive = 0;

            this._super("code_giftcode");
            this.initWithBinaryFile("res/GiftCode.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_giftcode = this._layout.getChildByName("pn_giftcode");
            this.btn_close_giftcode = this.customButton("btn_close_giftcode",code_giftcode.BTN_CLOSE_GIFTCODE,this.pn_giftcode);
            this.tf_giftcode = this.pn_giftcode.getChildByName("tf_giftcode");
            this.btn_clear_gift = this.customButton("btn_clear_gift",code_giftcode.BTN_CLEAR_GIFTCODE,this.pn_giftcode);
            this.btn_nhanGift = this.customButton("btn_nhanGift",code_giftcode.BTN_SEND_GIFTCODE,this.pn_giftcode);
            this.btn_clear_gift.setVisible(false);

            this.pn_thongbao = this.pn_giftcode.getChildByName("pn_thongbao"); this.pn_thongbao.setScale(0);
            this.content_thongbao = this.pn_thongbao.getChildByName("content_thongbao");
            this.ct_success = this.pn_thongbao.getChildByName("ct_success");
            this.ct_vin = this.pn_thongbao.getChildByName("ct_vin");
            this.ct_xu = this.pn_thongbao.getChildByName("ct_xu");
            this.ct_other = this.pn_thongbao.getChildByName("ct_other");
            this.btn_close_thongbao = this.customButton("btn_close_thongbao",code_giftcode.BTN_CLOSE_THONGBAO,this.pn_thongbao);
            this.ct_success.setVisible(false);
            this.ct_vin.setString(""); this.ct_xu.setString(""); this.ct_other.setString("");

            this.pn_giftcode.setVisible(false);
            this.pn_giftcode.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showgiftcode)));
            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
                this.tf_giftcode = menutab.changeTextFieldAsEditBox(this.tf_giftcode, this.pn_giftcode);
                this.pn_thongbao.setLocalZOrder(100);
            }else {
                this.tf_giftcode.addEventListener(this.text_field_event_gc,this);
                this.tf_giftcode.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_giftcode.BTN_CLOSE_GIFTCODE:
                    closegiftcode();
                    break;
                case code_giftcode.BTN_CLEAR_GIFTCODE:
                    this.tf_giftcode.setString("");
                    this.tf_giftcode.setPlaceHolder("Nhập mã giftcode:");
                    this.btn_clear_gift.setVisible(false);
                    this.tf_giftcode.setColor(cc.color("#ffffff"));
                    this.tf_giftcode.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_giftcode.BTN_SEND_GIFTCODE:
                    this.sendGiftcode();
                    break;
                case code_giftcode.BTN_CLOSE_THONGBAO:
                    this.closeThongBao();
                    break;
            }
        },
        showThongBao : function (str, value) {
            this.pn_thongbao.setVisible(true);
            this.pn_thongbao.runAction(cc.scaleTo(0.2, 1));
            if(value == 0) {
                this.ct_success.setVisible(false);
                this.ct_vin.setString("");
                this.ct_xu.setString("");
                this.ct_other.setString("");
                this.content_thongbao.setString(str);
            }else{
                this.content_thongbao.setString("");
                this.ct_success.setVisible(true);
                if(this.vin_receive != 0)
                    this.ct_vin.setString("+" + formatMoney(0,3,this.vin_receive) +" VIN");
                if(this.xu_receive != 0)
                    this.ct_xu.setString("+" + formatMoney(0,3,this.xu_receive) + " XU");
                this.ct_other.setString("");
                this.vin_receive = 0;
                this.xu_receive = 0;
            }
            this.content_thongbao.stopAllActions();
            this.content_thongbao.runAction(cc.sequence(cc.delayTime(4),cc.callFunc(this.closeThongBao,this)));
        },
        closeThongBao : function (str) {
            this.pn_thongbao.runAction(cc.scaleTo(0.2,0));
            this.content_thongbao.setString("");
            this.content_thongbao.stopAllActions();
            this.ct_success.setVisible(false);
            this.ct_vin.setString("");
            this.ct_xu.setString("");
            this.ct_other.setString("");
        },

        showgiftcode : function () {
            giftcode.pn_giftcode.setVisible(true);
            giftcode.pn_giftcode.runAction(cc.scaleTo(0.2,1));
        },
        text_field_event_gc: function(sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    sender.setColor(cc.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                } break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    if(sender.getString().length != 0)
                        sender.setColor(cc.color("#3E3E3E"));
                    else
                        sender.setColor(cc.color("#FFFFFF"));
                    sender.setPlaceHolder("Nhập mã giftcode:");
                    var str = sender.getString();
                    if(str.length == 0){
                        this.btn_clear_gift.setVisible(false);
                    }
                } break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    this.btn_clear_gift.setVisible(true);
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    if(str.length == 0){
                        this.btn_clear_gift.setVisible(false);
                    }
                } break;
            }
        },

        sendGiftcode : function(){
            var str = this.tf_giftcode.getString();
            if(str.length > 0) {
                if(Minigame.isLoginSocket) {
                    var giftcode = new CmdSendGiftCode();
                    giftcode.putGiftCode(str);
                    Minigame.miniGameClient.send(giftcode);
                    giftcode.clean();
                    this.btn_nhanGift.setEnabled(false);
                }else{
                    //popup.openPanel_Alert_Lobby("Hệ thống tạm thời gián đoạn!");
                    Minigame.connectSocket();
                }
            }else{
                this.showThongBao("Xin mời bạn nhập mã Giftcode!",0);
            }
        },

        responseGiftCode : function(error, currentMoneyVin, currentMoneyXu, moneyGiftCodeVin, moneyGiftCodeXu){
            //cc.log("error: " + error + " currentMoneyVin: "+ currentMoneyVin + " currentMoneyXu: " + currentMoneyXu + " moneyGiftCodeVin: " + moneyGiftCodeVin + " moneyGiftCodeXu : " + moneyGiftCodeXu);
            if(error == 0) {
                this.showThongBao("Mã Giftcode không chính xác. Vui lòng kiểm tra lại!",0);
            }else if(error == 1) {
                this.showThongBao("Mã Giftcode đã được sử dụng!",0);
            }else if(error == 3) {
                popup.open_panel_message_confirm("THÔNG BÁO","Để nhận giftcode vui lòng đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?","ĐỒNG Ý","HỦY", this.gotoSercurity, null);
            }else if(error == 4) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!",0);
            }else if(error == 5) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!", 0);
            }else if(error == 6) {
                this.showThongBao("Giftcode đã nhập không hợp lệ!", 0);
            }else if(error == 2) {
                this.vin_receive = moneyGiftCodeVin;
                this.xu_receive = moneyGiftCodeXu;
                this.showThongBao("Nhận thưởng Giftcode thành công!",1);
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentMoneyVin;
                    lobby.userInfo.xuTotal = currentMoneyXu;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.lb_blance_xu.setString(formatMoney(0, 3, parseInt(lobby.userInfo.xuTotal)));
                    menutab.changeFontMoney();
                }
                giftcode.tf_giftcode.setString("");
                giftcode.tf_giftcode.setColor(cc.color("#ffffff"));
                giftcode.btn_clear_gift.setVisible(false);
            }
            this.btn_nhanGift.setEnabled(true);
        },

        gotoSercurity : function (){
            closegiftcode();
            opensercurity_info();
            sercurity_info.resetSP_Button_Baomat();
            if(sercurity_info.check_dangky_baomat == 0){
                sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                sercurity_info.gotoTab = "TTBM_B";
            }else{
                sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                sercurity_info.gotoTab = "TTBM_S";
            }
            sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
        },

    }
);
code_giftcode.BTN_CLOSE_GIFTCODE = 1;
code_giftcode.BTN_CLEAR_GIFTCODE = 2;
code_giftcode.BTN_SEND_GIFTCODE = 3;
code_giftcode.BTN_CLOSE_THONGBAO = 4;

opengiftcode = function (str) {
    if (giftcode === null) {
        giftcode = new code_giftcode();
        giftcodeX = giftcode.getPosition().x;
        giftcodeY = giftcode.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(giftcode,BaseScene.INDEX_INFO_GUI, 0);
    }
    else
    {
        //giftcode.pn_giftcode.setVisible(true);
        giftcode.pn_giftcode.runAction(cc.scaleTo(0.2,1));
    }
    giftcodeAppear = true;
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
    if(str != "") {
        giftcode.tf_giftcode.setString(str);
        giftcode.tf_giftcode.setColor(cc.color("#3E3E3E"));
        giftcode.btn_clear_gift.setVisible(true);
    }
};
closegiftcode = function () {
    if (giftcode === null) {
        return;
    }
    if(giftcodeAppear) {
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
        giftcode.pn_giftcode.runAction(cc.scaleTo(0.2,0));
        giftcodeAppear = false;
        giftcode.tf_giftcode.setString("");
        giftcode.tf_giftcode.setColor(cc.color("#ffffff"));
        giftcode.btn_clear_gift.setVisible(false);
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
