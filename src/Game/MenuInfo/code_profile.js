var profileUser = null;
var profileUserX = null; var profileUserY = null;
var profileUserAppear = null;

var code_profile = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_profile = null; this.pn_doi_pass = null;  this.pn_change_avatar = null;
            /// panel profile
            this.pn_hoso = null; this.pn_vip = null; this.pn_avatar = null; this.pn_money = null; this.pn_table = null; this.lb_title = null;
            this.sp_ho_so = null; this.sp_vip = null; this.sp_vongquayvip = null;
            this.btn_ho_so = null; this.btn_vip = null; this.btn_vongquayvip = null;
            this.sp_avatar = null; this.lb_nickname = null; this.lb_lv_phan_tram = null; this.lb_cap_vp = null; this.lb_vip_point =null; this.btn_camera = null;
            this.lb_money_vin = null; this.lb_money_xu = null; this.btn_nap_vin = null; this.btn_nap_xu = null; this.process_lv = null;
            this.lb_ngay_tham_gia = null; this.lb_chung_thuc = null; this.lb_Ip = null; this.btn_doi_pass = null; this.lb_cap_do_hien_tai = null;
            this.lb_diem_vip_tiep_theo = null; this.lb_tong_diem_vippoint = null; this.lb_diem_vp_hien_co = null; this.pn_cap_do_hien_tai = null; this.pn_phan_thuong_hien_tai = null;
            /// panel camera
            this.btn_thay_doi = null; this.btn_quay_lai = null;
            this.sc_avatar = null;
            this.firstlistavatar = false;
            this.X_avatar = 81; this.Y_avatar = 260;
            this.sp_cirle_ava = null;
            this.slider_da = null; this.slider_dong = null; this.slider_bac = null;
            this.slider_vang = null; this.slider_bk = null; this.slider_kc = null;

            /// panel doi pass
            this.tf_old_pass = null; this.tf_new_pass = null; this.tf_new_pass_again = null;
            this.btn_change_pass = null; this.btn_close_doi_pas = null;
            this.valueAvatar = null;
            this.mucNhanVip = 0;
            this.pn_thongbao = null; this.ct_vin = null;
            this.btn_close_thongbao = null;
            this.btn_vqv = null;

            this.goto_profile = "hoso";
            this.pn_vongquayvip = null;
            this.sc_thele_vqv = null;

            this.btn_nhan_thuong_vip = null;
            this.save_vin_exchange_vippoint = 0;

            this._super("code_profile");
            this.initWithBinaryFile("res/profile_user.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_profile = this._layout.getChildByName("pn_profile");
            this.pn_doi_pass = this._layout.getChildByName("pn_doi_pass");
            this.pn_change_avatar = this._layout.getChildByName("pn_change_avatar");
            this.sc_avatar = this.pn_change_avatar.getChildByName("sc_avatar");
            this.sp_cirle_ava = this.sc_avatar.getChildByName("sp_cirle_ava");
            this.pn_thongbao = this._layout.getChildByName("pn_thongbao");
            this.pn_thongbao.setScale(0); this.pn_thongbao.setVisible(false);
            this.ct_vin = this.getControl("ct_vin",this.pn_thongbao);
            this.btn_close_thongbao = this.customButton("btn_close_thongbao",code_profile.BTN_CLOSE_THONGBAO,this.pn_thongbao);

            this.sc_avatar.setTouchEnabled(true);
            this.sc_avatar.setClippingEnabled(true);
            this.sc_avatar.setScrollBarEnabled(false);

            /// panel profile
            this.pn_hoso = this.getControl("pn_hoso",this.pn_profile); this.pn_vip = this.getControl("pn_vip",this.pn_profile);
            this.lb_title = this.getControl("lb_title",this.pn_profile);
            this.btn_close_profile = this.customButton("btn_close_profile",code_profile.BTN_CLOSE_PROFILE,this.pn_profile);
            this.sp_ho_so = this.pn_profile.getChildByName("sp_ho_so"); this.sp_vip = this.pn_profile.getChildByName("sp_vip");
            this.sp_vongquayvip = this.pn_profile.getChildByName("sp_vongquayvip");
            this.btn_ho_so = this.customButton("btn_ho_so",code_profile.BTN_HOSO_PROFILE,this.pn_profile);
            this.btn_vip = this.customButton("btn_vip",code_profile.BTN_VIP_PROFILE,this.pn_profile);
            this.btn_vongquayvip = this.customButton("btn_vongquayvip",code_profile.BTN_VQV_PROFILE,this.pn_profile);

            this.pn_vongquayvip =  this.pn_profile.getChildByName("pn_vongquayvip"); this.pn_vongquayvip.setVisible(false);
            this.sc_thele_vqv = this.getControl("sc_thele_vqv",this.pn_vongquayvip);
            this.sc_thele_vqv.setTouchEnabled(true);
            this.sc_thele_vqv.setClippingEnabled(true);
            this.sc_thele_vqv.setScrollBarEnabled(false);

            this.pn_avatar = this.getControl("pn_avatar",this.pn_hoso); this.pn_money = this.getControl("pn_money",this.pn_hoso); this.pn_table = this.getControl("pn_table",this.pn_hoso);
            this.sp_avatar = this.pn_avatar.getChildByName("sp_avatar"); this.lb_nickname = this.getControl("lb_nickname",this.pn_avatar);
            this.lb_lv_phan_tram = this.getControl("lb_lv_phan_tram",this.pn_avatar); this.lb_cap_vp = this.getControl("lb_cap_vp",this.pn_avatar);
            this.lb_vip_point = this.getControl("lb_vip_point",this.pn_avatar); this.btn_camera = this.customButton("btn_camera",code_profile.BTN_PROFILE_CAMERA,this.pn_avatar);
            this.process_lv = this.getControl("process_lv",this.pn_avatar);
            this.lb_money_vin = this.getControl("lb_money_vin",this.pn_money); this.lb_money_xu = this.getControl("lb_money_xu",this.pn_money);
            this.lb_ngay_tham_gia = this.getControl("lb_ngay_tham_gia",this.pn_money); this.lb_chung_thuc = this.getControl("lb_chung_thuc",this.pn_money);
            this.lb_Ip = this.getControl("lb_Ip",this.pn_money);
            this.btn_nap_vin = this.customButton("btn_nap_vin",code_profile.BTN_PROFILE_NAPVIN,this.pn_money);
            this.btn_nap_xu = this.customButton("btn_nap_xu",code_profile.BTN_PROFILE_NAPXU,this.pn_money);
            this.btn_doi_pass = this.customButton("btn_doi_pass",code_profile.BTN_PROFILE_DOIPASS,this.pn_money);
            this.pn_cap_do_hien_tai = this.getControl("pn_cap_do_hien_tai",this.pn_vip); this.pn_phan_thuong_hien_tai = this.getControl("pn_phan_thuong_hien_tai",this.pn_vip);
            this.lb_cap_do_hien_tai = this.getControl("lb_cap_do_hien_tai",this.pn_cap_do_hien_tai);
            this.slider_da = this.getControl("slider_da",this.pn_vip);
            this.slider_dong = this.getControl("slider_dong",this.pn_vip);
            this.slider_bac = this.getControl("slider_bac",this.pn_vip);
            this.slider_vang = this.getControl("slider_vang",this.pn_vip);
            this.slider_bk = this.getControl("slider_bk",this.pn_vip);
            this.slider_kc = this.getControl("slider_kc",this.pn_vip);

            this.lb_diem_vip_tiep_theo = this.getControl("lb_diem_vip_tiep_theo",this.pn_cap_do_hien_tai);
            this.lb_tong_diem_vippoint = this.getControl("lb_tong_diem_vippoint",this.pn_cap_do_hien_tai);
            this.lb_diem_vp_hien_co = this.getControl("lb_diem_vp_hien_co",this.pn_phan_thuong_hien_tai);

            this.btn_nhan_thuong_vip = this.customButton("btn_nhan_thuong_vip",code_profile.BTN_GOTO_NHANTHUONG_VIP,this.pn_phan_thuong_hien_tai);
            this.btn_vqv = this.customButton("btn_vqv",code_profile.BTN_GOTO_VQV,this.pn_vongquayvip);

            /// panel change avatar
            this.btn_thay_doi = this.customButton("btn_thay_doi",code_profile.BTN_THAYDOI_AVATAR,this.pn_change_avatar);
            this.btn_quay_lai = this.customButton("btn_quay_lai",code_profile.BTN_BACK_AVATAR,this.pn_change_avatar);

            /// panel doi pass
            this.tf_old_pass = this.getControl("tf_old_pass",this.pn_doi_pass);
            this.tf_new_pass = this.getControl("tf_new_pass",this.pn_doi_pass); this.tf_new_pass_again = this.getControl("tf_new_pass_again",this.pn_doi_pass);
            this.btn_close_doi_pas = this.customButton("btn_close_doi_pas",code_profile.BTN_CLOSE_DOIPASS,this.pn_doi_pass);
            this.btn_change_pass = this.customButton("btn_change_pass",code_profile.BTN_CHANGE_PASS,this.pn_doi_pass);

            this.sp_avatar.setTexture(menutab.getlinkAvatar(lobby.userInfo.avatar));
            this.pn_vip.setVisible(false);
            this.pn_change_avatar.setVisible(false);  this.pn_doi_pass.setVisible(false);
            this.pn_doi_pass.setScale(0); this.pn_change_avatar.setScale(0);
            this.pn_profile.setVisible(false);
            this.pn_profile.setScale(0);
            this.pn_profile.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showprofileUser)));
            this.valueAvatar = lobby.userInfo.avatar;

            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative ) {
                this.tf_old_pass = menutab.changeTextFieldAsEditBox(this.tf_old_pass, this.pn_doi_pass);
                this.tf_new_pass = menutab.changeTextFieldAsEditBox(this.tf_new_pass, this.pn_doi_pass);
                this.tf_new_pass_again = menutab.changeTextFieldAsEditBox(this.tf_new_pass_again, this.pn_doi_pass);
                this.tf_old_pass.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
                this.tf_new_pass.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
                this.tf_new_pass_again.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
            }else {
                this.tf_old_pass.addEventListener(this.text_field_event, this);
                this.tf_new_pass.addEventListener(this.text_field_event, this);
                this.tf_new_pass_again.addEventListener(this.text_field_event, this);

                this.tf_old_pass.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_new_pass.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_new_pass_again.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }
        },
        showprofileUser : function () {
            profileUser.pn_profile.setVisible(true);
            profileUser.pn_profile.runAction(cc.scaleTo(0.2,1));
            profileUser.lb_nickname.setString(lobby.userInfo.nickname);
            profileUser.lb_cap_vp.setString(menutab.lb_exp.getString()); profileUser.lb_vip_point.setString(menutab.lb_vip_lever.getString());
            profileUser.lb_money_vin.setString(menutab.lb_blance_vin.getString()); profileUser.lb_money_xu.setString(menutab.lb_blance_xu.getString());
            profileUser.lb_ngay_tham_gia.setString("Ngày tham gia: " + lobby.userInfo.createTime);
            if(lobby.userInfo.birthday == ""){
                profileUser.lb_chung_thuc.setString("Ngày sinh nhật: Chưa cập nhật");
            }else{
                profileUser.lb_chung_thuc.setString("Ngày sinh nhật: " + lobby.userInfo.birthday);
            }
            profileUser.lb_Ip.setString("IP: " + lobby.userInfo.IP); profileUser.lb_lv_phan_tram.setString(lobby.percentVP+"%");
            profileUser.process_lv.setPercent(lobby.percentVP);

        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_profile.BTN_GOTO_VQV:
                    openvq_vip();
                    closeprofileUser();
                    break;
                case code_profile.BTN_GOTO_NHANTHUONG_VIP:
                    if(cc.sys.isNative) {
                        if(lobby.open_payment_ios == true){
                            cc.sys.openURL("http://vinplay.vin/thuong-vip");
                        }
                    }else {
                        if(lobby.facebook_canvas == false)
                            window.open("http://vinplay.vin/thuong-vip");
                    }
                    break;
                case code_profile.BTN_CLOSE_PROFILE:
                    closeprofileUser();
                    break;
                case code_profile.BTN_HOSO_PROFILE:
                    profileUser.pn_vip.setVisible(false); profileUser.pn_hoso.setVisible(true); this.pn_vongquayvip.setVisible(false);
                    profileUser.sp_ho_so.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                    profileUser.sp_vip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                    profileUser.sp_vongquayvip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    profileUser.lb_title.setString("HỒ SƠ");  this.goto_profile = "hoso";
                    break;
                case code_profile.BTN_VIP_PROFILE:
                    this.clickPnVIP();
                    break;
                case code_profile.BTN_VQV_PROFILE:
                    profileUser.pn_vip.setVisible(false); profileUser.pn_hoso.setVisible(false); this.pn_vongquayvip.setVisible(true);
                    profileUser.sp_ho_so.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    profileUser.sp_vip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                    profileUser.sp_vongquayvip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                    profileUser.lb_title.setString("VÒNG QUAY VIP");  this.goto_profile = "vqv";
                    break;
                case code_profile.BTN_PROFILE_CAMERA:
                    profileUser.pn_change_avatar.setVisible(true);
                    profileUser.pn_change_avatar.runAction(cc.scaleTo(0.2,1));
                    this.addListAvatar();
                    this.btn_close_profile.setVisible(false);
                    break;
                case code_profile.BTN_PROFILE_DOIPASS:
                    profileUser.pn_doi_pass.setVisible(true);
                    profileUser.pn_doi_pass.runAction(cc.scaleTo(0.2,1));
                    break;
                case code_profile.BTN_BACK_AVATAR:
                    profileUser.pn_change_avatar.runAction(cc.scaleTo(0.2,0));
                    this.btn_close_profile.setVisible(true);
                    break;
                case code_profile.BTN_CLOSE_DOIPASS:
                    profileUser.pn_doi_pass.runAction(cc.scaleTo(0.2,0));
                    profileUser.tf_old_pass.setString("");
                    profileUser.tf_new_pass.setString(""); profileUser.tf_new_pass_again.setString("");
                    this.btn_change_pass.setEnabled(true);
                    break;
                case code_profile.BTN_THAYDOI_AVATAR:
                    this.changeAvatar();
                    break;
                case code_profile.BTN_PROFILE_NAPVIN:
                    if(menutab.isGetConfigBilling == false){
                        menutab.select_nap_xu = "napvin";
                        openshopping_info();
                    } else {
                        if (lobby.is_recharge_card_game == 0 || lobby.is_recharge_bank == 0) {
                            menutab.select_nap_xu = "napvin";
                            openshopping_info();
                            closeprofileUser();
                        }
                    }
                    break;
                case code_profile.BTN_PROFILE_NAPXU:
                    if(menutab.isGetConfigBilling == false){
                        menutab.select_nap_xu = "napxu";
                        openshopping_info_xu();
                    } else {
                        if (lobby.is_recharge_xu == 0) {
                            menutab.select_nap_xu = "napxu";
                            openshopping_info_xu();
                            closeprofileUser();
                        }
                    }
                    break;
                case code_profile.BTN_CHANGE_PASS:
                    this.changePassword();
                    break;
                case code_profile.BTN_CLOSE_THONGBAO:
                    this.pn_thongbao.setVisible(false);
                    this.pn_thongbao.setScale(0);
                    this.ct_vin.setString("");
                    break;
            }
        },
        clickPnVIP : function(){
            profileUser.pn_hoso.setVisible(false); profileUser.pn_vip.setVisible(true); this.pn_vongquayvip.setVisible(false);
            profileUser.lb_title.setString("VIP"); this.goto_profile = "vip";
            profileUser.sp_ho_so.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
            profileUser.sp_vip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid.png");
            profileUser.sp_vongquayvip.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
            profileUser.lb_cap_do_hien_tai.setString(menutab.lb_exp.getString()); profileUser.lb_tong_diem_vippoint.setString(formatMoney(0,3,lobby.userInfo.vippointSave));
            profileUser.lb_diem_vp_hien_co.setString(formatMoney(0,3,lobby.userInfo.vippoint));
            profileUser.funGetVipPoint();
        },

        funGetVipPoint :function(){
            var url = urlGetVipPoint(lobby.userInfo.nickname);
            //cc.log("url " + url);
            sendRequest(url,null,false,profileUser.callBackGetVippoint,profileUser.callBackError);
        },

        changePassword : function(){
            var oldpass = this.tf_old_pass.getString();
            var newpass = this.tf_new_pass.getString();
            var againpass = this.tf_new_pass_again.getString();
            //cc.log("password: " + lobby.savePassword);

            //cc.log("pass : " + lobby.savePassword);
            if(lobby.savePassword != null && lobby.savePassword != ""){
                if(oldpass != lobby.savePassword) {
                    popup.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
                    return null;
                }
            }
            if(oldpass == "" ){
                popup.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
            }else if(newpass == null || newpass.length<6 || newpass.length>16){
                popup.openPanel_Alert_Lobby("Password trong khoảng từ 6 - 16 ký tự!");
            }else if(newpass == "123456" || newpass == "abc123" || newpass == "ABC123" || newpass == "000000" || newpass == "111111" || newpass == "222222"
                || newpass == "333333" || newpass == "444444" || newpass == "555555" || newpass == "666666" || newpass == "777777" || newpass == "888888"
                || newpass == "999999"){
                popup.openPanel_Alert_Lobby("Mật khẩu quá đơn giản. Vui lòng nhập lại!");
            }else if(newpass == "" ){
                popup.openPanel_Alert_Lobby("Bạn chưa nhập mật khẩu mới!");
            }else if(oldpass == newpass){
                popup.openPanel_Alert_Lobby("Mật khẩu mới giống mật khẩu hiện tại của bạn!");
            }else if(againpass == "" || newpass != againpass){
                popup.openPanel_Alert_Lobby("Nhập lại mật khẩu không chính xác!");
            }else{
                if(Minigame.isLoginSocket) {
                    var profileUser = new CmdSendChangePassword();
                    profileUser.putChangePassword(md5(oldpass),md5(newpass));
                    Minigame.miniGameClient.send(profileUser);
                    profileUser.clean();

                    this.btn_change_pass.setEnabled(false);
                }else{
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },

        responseChangePassword : function(error){
          //cc.log("error1: " + error);
            this.btn_change_pass.setEnabled(true);
            if(error == 0){
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất thay đổi mật khẩu!",1);
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }else if(error == 2){
                popup.open_panel_message_confirm("THÔNG BÁO","Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?","ĐỒNG Ý","HỦY", this.gotoSercurity, null);
            }else if(error == 3){
                popup.openPanel_Alert_Lobby("Mật khẩu hiện tại không chính xác!");
            }else if(error == 4 || error == 5){
                popup.openPanel_Alert_Lobby("Tài khoản đăng nhập bằng Facebook hoặc Google+\n không thể sử dụng chức năng này!");
            }
        },

        responseResultChangePassword : function(error){
            cc.log("error2: " + error);
            if(error == 0){
                popup.openPanel_Alert_Lobby("Thay đổi mật khẩu thành công!");
                profileUser.pn_doi_pass.runAction(cc.scaleTo(0.2,0));
                profileUser.tf_old_pass.setString("");
                profileUser.tf_new_pass.setString(""); profileUser.tf_new_pass_again.setString("");

                this.tf_old_pass.setString("");
                this.tf_old_pass.setPlaceHolder("Mật khẩu hiện tại");
                this.tf_old_pass.setColor(cc.color("#7F7F7F"));
                this.tf_old_pass.runAction(cc.scaleTo(0.225, 1));

                this.tf_new_pass.setString("");
                this.tf_new_pass.setPlaceHolder("Mật khẩu mới");
                this.tf_new_pass.setColor(cc.color("#7F7F7F"));
                this.tf_new_pass.runAction(cc.scaleTo(0.225, 1));

                this.tf_new_pass_again.setString("");
                this.tf_new_pass_again.setPlaceHolder("Nhập lại mật khẩu mới");
                this.tf_new_pass_again.setColor(cc.color("#7F7F7F"));
                this.tf_new_pass_again.runAction(cc.scaleTo(0.225, 1));
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }
        },

        gotoSercurity : function (){
            profileUser.pn_doi_pass.runAction(cc.scaleTo(0.2,0));
            profileUser.tf_old_pass.setString("");
            profileUser.tf_new_pass.setString(""); profileUser.tf_new_pass_again.setString("");
            closeprofileUser();
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

        callBackGetVippoint:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            var ratioList= jsonData["ratioList"];
            profileUser.save_vin_exchange_vippoint = 0;

            if(success) {
                lobby.userInfo.vippoint = jsonData["vippoint"];
                lobby.userInfo.vippointSave = jsonData["vippointSave"];

                profileUser.checkVipPoint_Profile(lobby.userInfo.vippointSave);
                checkVipPoint(lobby.userInfo.vippointSave);
                menutab.sd_exp.setPercent(lobby.percentVP);
                profileUser.lb_lv_phan_tram.setString(lobby.percentVP+"%");
                profileUser.process_lv.setPercent(lobby.percentVP);

                profileUser.lb_cap_vp.setString(menutab.lb_exp.getString()); profileUser.lb_vip_point.setString(menutab.lb_vip_lever.getString());
                profileUser.lb_cap_do_hien_tai.setString(menutab.lb_exp.getString());
                profileUser.lb_tong_diem_vippoint.setString(formatMoney(0,3,lobby.userInfo.vippointSave));
                profileUser.lb_diem_vp_hien_co.setString(formatMoney(0,3,lobby.userInfo.vippoint));
                var cellHeight = 38;
                var positionY = 398.85;
                var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};

                for(var i = 1; i < (ratioList.length + 1); i ++){
                    if(profileUser.pn_vip.getChildByName("lb_vip_ht_"+i) == null) {
                        var lb_vip_ht = new cc.LabelTTF('', fonts.fontName, 15, cc.size(137, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lb_vip_ht.setName("lb_vip_ht_" + i);
                        lb_vip_ht.setAnchorPoint(0.5, 0.5);
                        lb_vip_ht.setPosition(cc.p(782.78, positionY));
                        lb_vip_ht.setString(formatMoney(0,3,lobby.userInfo.vippoint));
                        lb_vip_ht.setColor(cc.color("#ffffff"));

                        profileUser.pn_vip.addChild(lb_vip_ht);
                    }else{
                        var lb_vip_ht = profileUser.pn_vip.getChildByName("lb_vip_ht_"+i);
                        lb_vip_ht.setString(formatMoney(0,3,lobby.userInfo.vippoint));
                    }

                    if(profileUser.pn_vip.getChildByName("lb_vip_ex_"+i) == null) {
                        var lb_vip_ex = new cc.LabelTTF('', fonts.fontName, 15, cc.size(152, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lb_vip_ex.setName("lb_vip_ex_" + i);
                        lb_vip_ex.setAnchorPoint(0.5, 0.5);
                        lb_vip_ex.setPosition(cc.p(919.54, positionY));
                        var heso = lobby.userInfo.vippoint * parseInt(ratioList[i - 1]);
                        lb_vip_ex.setString(formatMoney(0,3,heso));
                        lb_vip_ex.setColor(cc.color("#E702FE"));

                        profileUser.pn_vip.addChild(lb_vip_ex);
                    }else{
                        var lb_vip_ex = profileUser.pn_vip.getChildByName("lb_vip_ex_"+i);
                        var heso = lobby.userInfo.vippoint * parseInt(ratioList[i - 1]);
                        lb_vip_ex.setString(formatMoney(0,3,heso));
                    }

                    if(i != 1){
                        if(i != profileUser.mucNhanVip || lobby.userInfo.vippoint <= 0) {
                            if(profileUser.pn_vip.getChildByName("btn_nhanthuong_"+i) == null) {
                                var button = new ccui.Button();
                                button.loadTextureNormal("res/ResourceMenuTab/Vip/btn_nhanthuong_dis.png");
                                button.setName("btn_nhanthuong_" + i);
                                button.setPosition(cc.p(1074.95, positionY));
                                button.setEnabled(false);
                                button.addTouchEventListener(function (sender, type) {
                                    switch (type) {
                                        case ccui.Widget.TOUCH_ENDED:
                                            profileUser.detail_nhan_vip(sender.name);
                                            break;
                                    }

                                }, this);
                                profileUser.pn_vip.addChild(button);
                            }else{
                                var button = profileUser.pn_vip.getChildByName("btn_nhanthuong_"+i);
                                button.loadTextureNormal("res/ResourceMenuTab/Vip/btn_nhanthuong_dis.png");
                                button.setEnabled(false);
                            }
                        }else{
                            if(profileUser.pn_vip.getChildByName("btn_nhanthuong_"+i) == null) {
                                var button = new ccui.Button();
                                button.loadTextureNormal("res/ResourceMenuTab/Vip/btn_nhanthuong.png");
                                button.loadTexturePressed("res/ResourceMenuTab/Vip/btn_nhanthuong_s.png");
                                button.setName("btn_nhanthuong_" + i);
                                button.setPosition(cc.p(1074.95, positionY));
                                button.setEnabled(true);

                                button.addTouchEventListener(function (sender, type) {
                                    switch (type) {
                                        case ccui.Widget.TOUCH_ENDED:
                                            profileUser.detail_nhan_vip(sender.name);
                                            break;
                                    }

                                }, this);
                                profileUser.pn_vip.addChild(button);
                                profileUser.save_vin_exchange_vippoint = lobby.userInfo.vippoint * parseInt(ratioList[i - 1]);
                            }else{
                                var button = profileUser.pn_vip.getChildByName("btn_nhanthuong_"+i);
                                button.loadTextureNormal("res/ResourceMenuTab/Vip/btn_nhanthuong.png");
                                button.loadTexturePressed("res/ResourceMenuTab/Vip/btn_nhanthuong_s.png");
                                button.setEnabled(true);
                                profileUser.save_vin_exchange_vippoint = lobby.userInfo.vippoint * parseInt(ratioList[i - 1]);
                            }
                        }
                    }

                    positionY = positionY - 38;
                }
            }else{
                popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }
        },

        detail_nhan_vip : function(value){
            cc.log("click vao");
            popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn nhận thưởng vippoint\nTương ứng với cấp Vippoint hiện tại bạn nhận được :\n"+
                formatMoney(0,3,profileUser.save_vin_exchange_vippoint)+ " VIN ?", "ĐỒNG Ý", "HỦY", this.confirmNhanThuongVipPoint, null);
        },
        confirmNhanThuongVipPoint : function(){
            if(Minigame.isLoginSocket) {
                cc.log("go");
                var profileUser = new CmdSendExchangeVippont();
                profileUser.putExchangeVippint();
                Minigame.miniGameClient.send(profileUser);
                profileUser.clean();
            }else{
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },

        responseExchangeVippoint: function(error){
            cc.log("error3 : " + error);
            if(error == 0){
                //cc.log("vao day : " );
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất nhận thưởng Vip point!",1);
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }else if(error == 2){
                cc.log("vao fix");
                popup.open_panel_message_confirm("THÔNG BÁO","Bạn chưa đăng ký bảo mật!\n Bạn có muốn đăng ký luôn không?","ĐỒNG Ý","HỦY", this.gotoSercurity, null);
            }
        },

        responseResultExchangeVippoint: function(error, currentMoney, moneyAdd){
            cc.log("error4 : " + error + " currentMoney : " + currentMoney + " moneyAdd : " + moneyAdd);
            if(error == 0){
                this.pn_thongbao.setVisible(true);
                this.pn_thongbao.runAction(cc.scaleTo(0.2,1));
                this.ct_vin.setString("+" + formatMoney(0,3,parseInt(moneyAdd)) + " VIN");
                if(lobby.userInfo == null){
                }else {
                    lobby.userInfo.vinTotal = currentMoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                }
                this.funGetVipPoint();
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời gián đoạn!");
            }else if(error == 2){
                popup.open_panel_message_confirm("THÔNG BÁO","Bạn chưa đăng ký bảo mật!\n Bạn có muốn đăng ký luôn không?","ĐỒNG Ý","HỦY", this.gotoSercurity, null);
            }
        },

        callBackError: function(response){
        },

        changeAvatar : function (){
            if(parseInt(this.valueAvatar) == lobby.userInfo.avatar ){
                popup.openPanel_Alert_Lobby("Avatar của bạn không khác trước!");
            }else{
                var url = urlUpdateAvatar(lobby.userInfo.nickname,this.valueAvatar);
                //cc.log("url " + url);
                sendRequest(url,null,false,profileUser.callBackChangeAvatar,profileUser.callBackError);
            }
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
                    if(sender.name == "tf_old_pass") {
                        sender.setPlaceHolder("Mật khẩu hiện tại");
                    }else if(sender.name == "tf_new_pass") {
                        sender.setPlaceHolder("Mật khẩu mới");
                    }else if(sender.name == "tf_new_pass_again") {
                        sender.setPlaceHolder("Nhập lại mật khẩu mới");
                    }

                    if(sender.getString() == 0) sender.setString("");
                } break;
            }
        },

        callBackChangeAvatar:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success) {
                popup.openPanel_Alert_Lobby("Cập nhật Avatar thành công!");
                lobby.userInfo.avatar = profileUser.valueAvatar;
                profileUser.sp_avatar.setTexture(menutab.getlinkAvatar(lobby.userInfo.avatar));
                menutab.sp_avatar.loadTextureNormal(menutab.getlinkAvatar(lobby.userInfo.avatar));
                menutab.sp_avatar.loadTexturePressed(menutab.getlinkAvatar(lobby.userInfo.avatar));
                menutab.sp_avatar.loadTextureDisabled(menutab.getlinkAvatar(lobby.userInfo.avatar));
                profileUser.pn_change_avatar.runAction(cc.scaleTo(0.2,0));
                profileUser.btn_close_profile.setVisible(true);
            }else{
                popup.openPanel_Alert_Lobby("Cập nhật thất bại!");
            }
        },

        addListAvatar : function(){
            if(this.firstlistavatar == false){
                this.firstlistavatar = true;
                for (var i = 0; i <12 ; i ++){
                    var button = new ccui.Button();
                    button.loadTextureNormal(menutab.getlinkAvatar(i));
                    button.loadTexturePressed(menutab.getlinkAvatar(i));
                    button.loadTextureDisabled(menutab.getlinkAvatar(i));
                    button.setPosition(cc.p(this.X_avatar,this.Y_avatar));
                    button.setName("avatar_" + i);

                    button.addTouchEventListener(function(sender,type){
                        switch (type){
                            case ccui.Widget.TOUCH_ENDED:
                                this.Click_Avatar(sender.name);
                                break;
                        }

                    },this);
                    this.sc_avatar.addChild(button);
                    cc.log("x =" + parseInt(lobby.userInfo.avatar));
                    if(parseInt(lobby.userInfo.avatar) == i){
                        this.sp_cirle_ava.setPosition(cc.p(button.x,button.y));
                    }
                    this.X_avatar = this.X_avatar + 164;
                    if(i == 5){
                        this.X_avatar = 81;
                        this.Y_avatar = 100;
                    }

                }
            }else{
                for (var i = 0; i <12 ; i ++){
                    if(parseInt(lobby.userInfo.avatar) == i){
                        if(this.sc_avatar.getChildByName("avatar_" + i) != null){
                            var btn = this.sc_avatar.getChildByName("avatar_" + i);
                        }
                        this.sp_cirle_ava.setPosition(cc.p(btn.x,btn.y));
                    }
                }
            }
        },

        Click_Avatar : function(value){
            if(this.sc_avatar.getChildByName(value) != null){
                var btn = this.sc_avatar.getChildByName(value);
                this.sp_cirle_ava.setPosition(cc.p(btn.x,btn.y));
                this.valueAvatar = value.substr(7,value.length - 7);
                cc.log("valueAvatar : " + this.valueAvatar);
            }
        },

        checkVipPoint_Profile : function (value){
            this.resetAllVippointSlider();
            if(value <= 80){
                profileUser.lb_diem_vip_tiep_theo.setString("80");
                this.slider_da.setPercent(100*lobby.userInfo.vippointSave/80);
                this.mucNhanVip = 1;
            }else if(value > 80 && value <= 800){
                profileUser.lb_diem_vip_tiep_theo.setString("800");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100*lobby.userInfo.vippointSave/800);
                this.mucNhanVip = 2;
            }else if(value > 800 && value <= 4500){
                profileUser.lb_diem_vip_tiep_theo.setString("4.500");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100*lobby.userInfo.vippointSave/4500);
                this.mucNhanVip = 3;
            }else if(value > 4500 && value <= 8600){
                profileUser.lb_diem_vip_tiep_theo.setString("8.600");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100*lobby.userInfo.vippointSave/8600);
                this.mucNhanVip = 4;
            }else if(value > 8600 && value <= 12000){
                profileUser.lb_diem_vip_tiep_theo.setString("12.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100*lobby.userInfo.vippointSave/50000);
                this.mucNhanVip = 5;
            }else if(value > 12000 && value <= 50000){
                profileUser.lb_diem_vip_tiep_theo.setString("50.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100*lobby.userInfo.vippointSave/50000);
                this.mucNhanVip = 6;
            }else if(value > 50000 && value <= 100000){
                profileUser.lb_diem_vip_tiep_theo.setString("100.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100*lobby.userInfo.vippointSave/1000000);
                this.mucNhanVip = 7;
            }else if(value > 100000 && value <= 200000){
                profileUser.lb_diem_vip_tiep_theo.setString("200.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100*lobby.userInfo.vippointSave/1000000);
                this.mucNhanVip = 8;
            }else if(value > 200000){
                profileUser.lb_diem_vip_tiep_theo.setString("1.000.000");
                this.slider_da.setPercent(100);
                this.slider_dong.setPercent(100);
                this.slider_bac.setPercent(100);
                this.slider_vang.setPercent(100);
                this.slider_bk.setPercent(100);
                this.slider_kc.setPercent(100*lobby.userInfo.vippointSave/1000000);
                this.mucNhanVip = 9;
            }
        },
        resetAllVippointSlider : function (){
            this.slider_da.setPercent(0);
            this.slider_dong.setPercent(0);
            this.slider_bac.setPercent(0);
            this.slider_vang.setPercent(0);
            this.slider_bk.setPercent(0);
            this.slider_kc.setPercent(0);
        },

        formatDateTime : function (str){
            var date = str.split(" ")[0];
            var time  = str.split(" ")[1];
            var day = date.split("-")[2];
            var month = date.split("-")[1];
            var year = date.split("-")[0];
            //cc.log("chuoi " + time + " "+  day + "/" + month + "/" + year);
            str = time + " " + day + "/" + month + "/" + year;
            return str;
        },
    }
);
/// panel profile
code_profile.BTN_CLOSE_PROFILE = 1; code_profile.BTN_HOSO_PROFILE = 2; code_profile.BTN_VIP_PROFILE = 3; code_profile.BTN_PROFILE_CAMERA = 4;
code_profile.BTN_PROFILE_NAPVIN = 5; code_profile.BTN_PROFILE_NAPXU = 6; code_profile.BTN_PROFILE_DOIPASS = 7;
// panel change avatar
code_profile.BTN_THAYDOI_AVATAR = 8; code_profile.BTN_BACK_AVATAR = 9;
/// panel doi pass
code_profile.BTN_CLOSE_DOIPASS = 10; code_profile.BTN_CHANGE_PASS = 11;

code_profile.BTN_CLOSE_THONGBAO = 12;

code_profile.BTN_GOTO_NHANTHUONG_VIP= 13;
code_profile.BTN_GOTO_VQV= 14;
code_profile.BTN_VQV_PROFILE = 15;

openprofileUser = function () {
    if (profileUser === null) {
        profileUser = new code_profile();
        profileUserX = profileUser.getPosition().x;
        profileUserY = profileUser.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(profileUser,BaseScene.INDEX_INFO_GUI, 0);
    }
    else
    {
        profileUser.pn_profile.runAction(cc.scaleTo(0.2,1));
        profileUser.lb_nickname.setString(lobby.userInfo.nickname);
        profileUser.lb_cap_vp.setString(menutab.lb_exp.getString()); profileUser.lb_vip_point.setString(menutab.lb_vip_lever.getString());
        profileUser.lb_money_vin.setString(menutab.lb_blance_vin.getString()); profileUser.lb_money_xu.setString(menutab.lb_blance_xu.getString());
        profileUser.lb_ngay_tham_gia.setString("Ngày tham gia: " + lobby.userInfo.createTime);
        if(lobby.userInfo.birthday == ""){
            profileUser.lb_chung_thuc.setString("Ngày sinh nhật: Chưa cập nhật");
        }else{
            profileUser.lb_chung_thuc.setString("Ngày sinh nhật: " + lobby.userInfo.birthday);
        }
        profileUser.lb_Ip.setString("IP: " + lobby.userInfo.IP); profileUser.lb_lv_phan_tram.setString(lobby.percentVP+"%");
        profileUser.process_lv.setPercent(lobby.percentVP);
        if(profileUser.goto_profile == "vip"){
            profileUser.funGetVipPoint();
        }
    }
    profileUserAppear = true;
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    profileUser.checkVipPoint_Profile(lobby.userInfo.vippointSave);
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closeprofileUser = function () {
    if (profileUser === null) {
        return;
    }
    if(profileUserAppear) {
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
        profileUser.pn_profile.runAction(cc.scaleTo(0.2,0));
        profileUserAppear = false;
        profileUser.tf_old_pass.setString("");
        profileUser.tf_new_pass.setString("");
        profileUser.tf_new_pass_again.setString("");
        profileUser.tf_old_pass.setColor(cc.color("#FFFFFF"));
        profileUser.tf_new_pass.setColor(cc.color("#FFFFFF"));
        profileUser.tf_new_pass_again.setColor(cc.color("#FFFFFF"));
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};



