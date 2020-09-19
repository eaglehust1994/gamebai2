var panel_otp = null;
var panel_otpX = null; var panel_otpY = null;
var panel_otpAppear = null;

var code_panel_otp = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_OTP = null;
            this.btn_close_otp = null;
            this.btn_chose_sms_app = null;
            this.tf_insert_otp = null;
            this.pn_chose_otp = null;
            this.btn_close_chose_otp = null;
            this.btn_otp_sms = null;
            this.btn_otp_app = null;
            this.btn_confirm_otp = null;
            this.type_otp = 0;
            this.txt_chose = null;
            this.otp_dauso = null;
            this.isShowOTP = 0;
            this.text_otp1 = null;
            this.text_otp2 = null;

            this._super("code_panel_otp");
            this.initWithBinaryFile("res/Panel_OTP.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_OTP = this._layout.getChildByName("pn_OTP");
            this.pn_OTP.setScale(0); this.pn_OTP.setVisible(false);

            this.txt_chose = this.getControl("txt_chose",this.pn_OTP);

            this.tf_insert_otp = this.pn_OTP.getChildByName("tf_insert_otp");
            this.pn_chose_otp = this.pn_OTP.getChildByName("pn_chose_otp");
            this.pn_chose_otp.setScaleY(0); this.pn_chose_otp.setVisible(false);
            this.btn_close_otp = this.customButton("btn_close_otp",code_panel_otp.BTN_CLOSE_PN_OTP,this.pn_OTP);
            this.btn_confirm_otp = this.customButton("btn_confirm_otp",code_panel_otp.BTN_CONFIRM_OTP,this.pn_OTP);
            this.btn_chose_sms_app = this.customButton("btn_chose_sms_app",code_panel_otp.BTN_CHOSE_OTP,this.pn_OTP);
            this.btn_close_chose_otp = this.customButton("btn_close_chose_otp",code_panel_otp.BTN_CLOSE_CHOSE_OTP,this.pn_chose_otp);
            this.btn_otp_sms = this.customButton("btn_otp_sms",code_panel_otp.BTN_SELECT_SMS_OTP,this.pn_chose_otp);
            this.btn_otp_app = this.customButton("btn_otp_app",code_panel_otp.BTN_SELECT_APP_OTP,this.pn_chose_otp);
            this.txt_content = this.pn_OTP.getChildByName("txt_content");
            this.text_otp1 = this.getControl("text_otp1",this.pn_OTP);
            this.text_otp2 = this.getControl("text_otp2",this.pn_OTP);

            this.otp_dauso = this.pn_OTP.getChildByName("otp_dauso");
            this.otp_dauso.setString(lobby.sms_otp );
            cc.log("isShowOTP " + this.isShowOTP);
            if(this.isShowOTP == 0)
                this.pn_OTP.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.NotshowPnOtp,this)));
            else
                this.pn_OTP.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.showPnOtp,this)));
            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
                this.tf_insert_otp = lobby.changeTextFieldAsEditBox_Lobby(this.tf_insert_otp, this.pn_OTP);
                if(!cc.sys.isNative) {
                    this.tf_insert_otp.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                }
            }else {
                this.tf_insert_otp.addEventListener(this.text_field_event,this);
                this.tf_insert_otp.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }

            if(cc.sys.isNative) {
                this.text_otp1.x = 533.41; this.text_otp1.y = 306.16;
                this.otp_dauso.x = 634.94; this.otp_dauso.y = 305.53;
                this.text_otp2.x = 778.90; this.text_otp2.y = 267.16;
            }
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_panel_otp.BTN_CLOSE_PN_OTP:
                    closepn_otp();
                    this.btn_confirm_otp.setEnabled(true);
                    break;
                case code_panel_otp.BTN_CHOSE_OTP:
                    this.pn_chose_otp.setVisible(true);
                    this.pn_chose_otp.runAction(cc.scaleTo(0.2,1,1));
                    break;
                case code_panel_otp.BTN_CLOSE_CHOSE_OTP:
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
                case code_panel_otp.BTN_CONFIRM_OTP:
                    this.funSendOTP();
                    break;
                case code_panel_otp.BTN_SELECT_SMS_OTP:
                    this.type_otp = 0;
                    this.txt_chose.setString("TELE OTP");
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
                case code_panel_otp.BTN_SELECT_APP_OTP:
                    this.type_otp = 1;
                    this.txt_chose.setString("APP OTP");
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
            }
        },
        funSendOTP : function (){
            var otp = this.tf_insert_otp.getString();
            if(otp =="" || otp.length < 5){
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            }else if(!lobby.checkKyTuSpecial(otp,false)){
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            }else{
                if (Minigame.isLoginSocket) {
                    var sendOtp = new CmdSendOTP();
                    sendOtp.putSendOTP(panel_otp.tf_insert_otp.getString(), panel_otp.type_otp);
                    Minigame.miniGameClient.send(sendOtp);
                    sendOtp.clean();

                    this.btn_confirm_otp.setEnabled(false);
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },

        showPnOtp : function(){
            this.pn_OTP.setVisible(true);
            this.pn_OTP.runAction(cc.scaleTo(0.2,1));
            lobby.reloadLayout();
            //closepn_otp();
        },
        NotshowPnOtp : function(){
            cc.log("close");
            panel_otp.pn_OTP.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
                panel_otp.pn_OTP.setVisible(false);
            })));
            closepn_otp();
        },

        text_field_event: function(sender, type) {
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
                    if(sender.name == "tf_insert_otp") {
                        sender.setPlaceHolder("Nhập OTP");
                    }

                    if(sender.getString() == 0) sender.setString("");
                } break;
            }
        },

        responseSendOtp : function(error){
            //cc.log("error: " + error);
            this.btn_confirm_otp.setEnabled(true);
            if(error == 0){
                this.tf_insert_otp.setString("");
                if(panel_otpAppear)
                    closepn_otp();
            }else if(error == 1 || error == 2){
                popup.openPanel_Alert_Lobby("Giao dịch thất bại!");
            }else if(error == 3){
                popup.openPanel_Alert_Lobby("Mã OTP không chính xác!");
            }else if(error == 4){
                popup.openPanel_Alert_Lobby("Mã OTP đã hết hạn!");
            }
            if(sercurity_info != null) {
                //cc.log("vao: ");
                sercurity_info.btn_tiep_tuc_ketsat.setEnabled(true);
                sercurity_info.btn_luu_lai_bmdn.setEnabled(true);
                sercurity_info.btn_huy_dang_ky_bmdn.setEnabled(true);
                sercurity_info.btn_save_qlgame.setEnabled(true);     
            }
            if(profileUser != null) {
                profileUser.btn_change_pass.setEnabled(true);
            }
        },
    }
);
code_panel_otp.BTN_CLOSE_PN_OTP = 1;
code_panel_otp.BTN_CONFIRM_OTP = 2;
code_panel_otp.BTN_CHOSE_OTP = 3;
code_panel_otp.BTN_CLOSE_CHOSE_OTP = 4;
code_panel_otp.BTN_SELECT_SMS_OTP = 5; code_panel_otp.BTN_SELECT_APP_OTP = 6;

openpn_otp = function (str, ishow) {
    if (panel_otp === null) {
        panel_otp = new code_panel_otp();
        panel_otp.isShowOTP = ishow; // 0 dong 1 mo
        panel_otpX = panel_otp.getPosition().x;
        panel_otpY = panel_otp.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(panel_otp,BaseScene.INDEX_INFO_GUI, 5);
    }
    else
    {
        panel_otp.pn_OTP.setVisible(true);
        panel_otp.pn_OTP.runAction(cc.scaleTo(0.2,1));
        lobby.reloadLayout();
    }
    panel_otp.txt_content.setString(str);
    //if (!cc.sys.isNative)
    //    lobby.pauseItemGameListen();
    panel_otpAppear = true;
    //if(menutab != null)
    //    if (!cc.sys.isNative)
    //        menutab.pauseHeader();
};
closepn_otp = function () {
    if (panel_otp === null) {
        return;
    }
    if(panel_otpAppear) {
        //if (!cc.sys.isNative)
        //    lobby.resumeItemGameListen();
        //pn_otp.pn_dieu_khoan.setVisible(false);
        panel_otp.pn_OTP.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
            panel_otp.pn_OTP.setVisible(false);
            lobby.reloadLayout();
        })));
        panel_otp.tf_insert_otp.setString("");
        panel_otpAppear = false;
    }
    //if(menutab != null)
    //    if (!cc.sys.isNative)
    //        menutab.resumeHeader();
};
