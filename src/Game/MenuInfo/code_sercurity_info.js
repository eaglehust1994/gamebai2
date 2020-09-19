var sercurity_info = null;
var sercurity_infoX = null;
var sercurity_infoY = null;

var code_sercurity_info = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_bao_mat = null;

            // panel bao mat
            this.pn_thong_tin_bao_mat = null;
            this.pn_sms_plus = null;
            this.pn_sms_plus_thay_doi = null;
            this.pn_bao_mat_dang_nhap = null;
            this.pn_ket_an_toan = null;
            this.pn_quan_ly_game = null;
            this.pn_button_chua_dang_ky = null;
            this.sp_thongtinbaomat = null;
            this.sp_quanlygame = null;
            this.btn_thong_tin_bao_mat = null;
            this.btn_quan_ly_game = null;
            this.btn_close_bao_mat = null;
            this.pn_button_da_dang_ky = null;
            this.sp_thongtinbaomat_s = null;
            this.sp_quanlygame_s = null;
            this.sp_sms_plus = null;
            this.sp_bao_mat_dang_nhap = null;
            this.sp_ket_an_toan = null;
            this.btn_thong_tin_bao_mat_s = null;
            this.btn_sms_plus = null;
            this.btn_bao_mat_dang_nhap = null;
            this.btn_ket_an_toan = null;
            this.btn_quan_ly_game_s = null;
            this.pn_sms_app = null;
            this.lb_account_bm = null;
            this.lb_nickname_bm = null;
            this.tf_cmtnd = null;
            this.tf_email = null;
            this.tf_phone_bm = null;
            this.btn_cap_nhat_bm = null;
            this.check_dangky_baomat = false;
            this.pn_noidung = null;
            this.pn_noidung_xacthuc = null;
            this.pn_nhap_ma_xac_thuc = null;
            this.pn_thongbao_ttbm = null;
            this.btn_kichhoat_email = null;
            this.btn_kichhoat_phone = null;
            this.btn_thaydoi_email = null;
            this.btn_thaydoi_phone = null;
            this.tf_nhap_ma_xac_thuc = null;
            this.btn_quaylai_ttbm = null;
            this.btn_hoantat_ttbm = null;
            this.btn_quaylai_notice = null;
            this.btn_save_qlgame = null;
            this.lb_thongbao_ttbm = null;
            this.lb_sms_app_qlg = null;
            this.btn_sms_app_qlg = null;
            this.btn_save_qlgame = null;
            this.btn_close_sms_app = null;
            this.btn_bm_sms = null;
            this.btn_bm_app = null;
            this.where_pn_sms_otp = "quanlygame";
            this.btn_thay_doi_sms_plus = null;
            this.lb_account_thaydoi_sms = null;
            this.lb_phone_thaydoi_sms = null;
            this.tf_new_phone_thaydoi_sms = null;
            this.btn_quay_lai_thaydoi_sms = null;
            this.btn_tiep_tuc_thaydoi_sms = null;

            this.btn_clear_cmt = null;
            this.btn_clear_email = null;
            this.btn_clear_phone = null;
            this.lb_save_cmt = null;
            this.lb_save_email = null;
            this.lb_save_phone = null;
            this.save_cmt = "";
            this.save_email = "";
            this.save_phone = "";
            this.save_new_phone = "";
            this.ischangeEmail = false;
            this.ischangePhone = false;

            this.lb_dauso = null;
            this.ck_app_otp = null;
            this.gotoTab = "";

            this.lb_dauso_sms_thaydoi = null;
            this.pn_otp_sms = null;
            this.btn_close_otp_sms = null;
            this.tf_otp_sms = null;
            this.lb_dauso_otp_sms = null;
            this.btn_hoantat_otp_sms = null;

            // bao mat dang nhap
            this.pn_da_dang_ky_bm_dang_nhap = null;
            this.pn_chua_dang_ky = null;
            this.pn_dang_ky_thanh_cong = null;
            this.tf_vin_toi_thieu = null;
            this.lb_sms_app_bmdn = null;
            this.btn_sms_app_bmdn = null;
            this.tf_ma_otp_bmdn = null;
            this.btn_luu_lai_bmdn = null;
            this.btn_huy_dang_ky_bmdn = null;
            this.btn_dang_ky_bmdn = null;
            this.btn_quay_lai_bmdn = null;
            // panel ket sat
            this.lb_account_ketsat = null;
            this.lb_value_kha_dung_ketsat = null;
            this.lb_value_dong_bang_ketsat = null;
            this.ck_dong_bang = null;
            this.ck_mo_dong_bang = null;
            this.tf_vin_ketsat = null;
            this.btn_sms_app_ketsat = null;
            this.lb_sms_app_ketsat = null;
            this.tf_ma_ketsat = null;
            this.btn_tiep_tuc_ketsat = null;

            this.lb_account_smsplus = null;
            this.lb_phone_smsplus = null;
            this.btn_clear_newphone = null;

            this.type_otp = 0;
            this.lb_dauso_login = null;
            this.isRegisterOrRemoveOtpLogin = false;  // false la regis true la remove
            this.lb_trang_thai = null;
            this.tf_otp_config_game = null;

            this.arrayStatusGame = [];
            this.arrayIdGame = [];
            this.saveArrayStatusGame = [];
            this.type_safe = 1; // 0 mo dong bang 1 dong bang
            this.lb_dauso_qlgame = null;
            this.lb_dauso_ketsat = null;
            this.ischeckListgame = false;
            this.saveOtp_ketsat = null;

            this.isClickActiveMail = false;
            this.pn_qlgame_chua_bm = null;
            this.link_qlgame = null;
            this.pn_otp_ket_sat = null;

            this._super("code_sercurity_info");
            this.initWithBinaryFile("res/sercurity_info.json");
            return true;
        },
        customizeGUI: function () {
            // panel bao mat
            this.pn_bao_mat = this._layout.getChildByName("pn_bao_mat");
            this.pn_thong_tin_bao_mat = this.getControl("pn_thong_tin_bao_mat", this.pn_bao_mat);
            this.pn_sms_plus = this.getControl("pn_sms_plus", this.pn_bao_mat);
            this.pn_sms_plus_thay_doi = this.getControl("pn_sms_plus_thay_doi", this.pn_bao_mat);
            this.pn_bao_mat_dang_nhap = this.getControl("pn_bao_mat_dang_nhap", this.pn_bao_mat);
            this.pn_ket_an_toan = this.getControl("pn_ket_an_toan", this.pn_bao_mat);
            this.pn_quan_ly_game = this.getControl("pn_quan_ly_game", this.pn_bao_mat);
            this.pn_button_chua_dang_ky = this.getControl("pn_button_chua_dang_ky", this.pn_bao_mat);
            this.pn_button_da_dang_ky = this.getControl("pn_button_da_dang_ky", this.pn_bao_mat);
            this.pn_sms_app = this.getControl("pn_sms_app", this.pn_bao_mat);
            this.pn_sms_app.setScaleY(0);

            this.sp_thongtinbaomat = this.pn_button_chua_dang_ky.getChildByName("sp_thongtinbaomat");
            this.sp_quanlygame = this.pn_button_chua_dang_ky.getChildByName("sp_quanlygame");
            this.sp_thongtinbaomat_s = this.pn_button_da_dang_ky.getChildByName("sp_thongtinbaomat_s");
            this.sp_quanlygame_s = this.pn_button_da_dang_ky.getChildByName("sp_quanlygame_s");
            this.sp_sms_plus = this.pn_button_da_dang_ky.getChildByName("sp_sms_plus");
            this.sp_bao_mat_dang_nhap = this.pn_button_da_dang_ky.getChildByName("sp_bao_mat_dang_nhap");
            this.sp_ket_an_toan = this.pn_button_da_dang_ky.getChildByName("sp_ket_an_toan");
            this.lb_account_bm = this.getControl("lb_account_bm", this.pn_thong_tin_bao_mat);
            this.lb_nickname_bm = this.getControl("lb_nickname_bm", this.pn_thong_tin_bao_mat);
            this.tf_cmtnd = this.getControl("tf_cmtnd", this.pn_thong_tin_bao_mat);
            this.tf_email = this.getControl("tf_email", this.pn_thong_tin_bao_mat);
            this.tf_phone_bm = this.getControl("tf_phone_bm", this.pn_thong_tin_bao_mat);
            this.btn_cap_nhat_bm = this.customButton("btn_cap_nhat_bm", code_sercurity_info.BTN_CAPNHAT_TTBM, this.pn_thong_tin_bao_mat);

            this.lb_save_cmt = this.getControl("lb_save_cmt", this.pn_thong_tin_bao_mat);
            this.lb_save_cmt.setVisible(false);
            this.lb_save_email = this.getControl("lb_save_email", this.pn_thong_tin_bao_mat);
            this.lb_save_email.setVisible(false);
            this.lb_save_phone = this.getControl("lb_save_phone", this.pn_thong_tin_bao_mat);
            this.lb_save_phone.setVisible(false);

            this.btn_clear_cmt = this.customButton("btn_clear_cmt", code_sercurity_info.BTN_CLEAR_CMT, this.pn_thong_tin_bao_mat);
            this.btn_clear_email = this.customButton("btn_clear_email", code_sercurity_info.BTN_CLEAR_EMAIL, this.pn_thong_tin_bao_mat);
            this.btn_clear_phone = this.customButton("btn_clear_phone", code_sercurity_info.BTN_CLEAR_PHONE, this.pn_thong_tin_bao_mat);
            this.btn_clear_cmt.setVisible(false);
            this.btn_clear_email.setVisible(false);
            this.btn_clear_phone.setVisible(false);

            this.btn_close_bao_mat = this.customButton("btn_close_bao_mat", code_sercurity_info.BTN_CLOSE_BAO_MAT, this.pn_bao_mat);
            this.btn_thong_tin_bao_mat = this.customButton("btn_thong_tin_bao_mat", code_sercurity_info.BTN_TTBM_BIG, this.pn_button_chua_dang_ky);
            this.btn_quan_ly_game = this.customButton("btn_quan_ly_game", code_sercurity_info.BTN_QUANLYGAME_BIG, this.pn_button_chua_dang_ky);
            this.btn_thong_tin_bao_mat_s = this.customButton("btn_thong_tin_bao_mat_s", code_sercurity_info.BTN_TTBM_SMALL, this.pn_button_da_dang_ky);
            this.btn_sms_plus = this.customButton("btn_sms_plus", code_sercurity_info.BTN_SMS_PLUS, this.pn_button_da_dang_ky);
            this.btn_bao_mat_dang_nhap = this.customButton("btn_bao_mat_dang_nhap", code_sercurity_info.BTN_BM_DANG_NHAP, this.pn_button_da_dang_ky);
            this.btn_ket_an_toan = this.customButton("btn_ket_an_toan", code_sercurity_info.BTN_KET_AN_TOAN, this.pn_button_da_dang_ky);
            this.btn_quan_ly_game_s = this.customButton("btn_quan_ly_game_s", code_sercurity_info.BTN_QUANLYGAME_SMALL, this.pn_button_da_dang_ky);

            this.lb_sms_app_qlg = this.getControl("lb_sms_app_qlg", this.pn_quan_ly_game);
            this.btn_save_qlgame = this.customButton("btn_save_qlgame", code_sercurity_info.BTN_SAVE_QLGAME, this.pn_quan_ly_game);
            this.btn_sms_app_qlg = this.customButton("btn_sms_app_qlg", code_sercurity_info.BTN_SMS_APP_QLGAME, this.pn_quan_ly_game);
            this.tf_otp_config_game = this.pn_quan_ly_game.getChildByName("tf_otp_config_game");

            this.pn_qlgame_chua_bm = this.pn_quan_ly_game.getChildByName("pn_qlgame_chua_bm");
            this.link_qlgame = this.customButton("link_qlgame", code_sercurity_info.BTN_LINK_QLGAME, this.pn_qlgame_chua_bm);

            this.btn_close_sms_app = this.customButton("btn_close_sms_app", code_sercurity_info.BTN_CLOSE_SMS_APP, this.pn_sms_app);
            this.btn_bm_sms = this.customButton("btn_bm_sms", code_sercurity_info.BTN_BM_SMS, this.pn_sms_app);
            this.btn_bm_app = this.customButton("btn_bm_app", code_sercurity_info.BTN_BM_APP, this.pn_sms_app);
            this.pn_noidung = this.getControl("pn_noidung", this.pn_thong_tin_bao_mat);
            this.pn_noidung_xacthuc = this.getControl("pn_noidung_xacthuc", this.pn_thong_tin_bao_mat);
            this.pn_nhap_ma_xac_thuc = this.getControl("pn_nhap_ma_xac_thuc", this.pn_thong_tin_bao_mat);
            this.pn_thongbao_ttbm = this.getControl("pn_thongbao_ttbm", this.pn_thong_tin_bao_mat);

            this.lb_dauso = this.getControl("lb_dauso", this.pn_nhap_ma_xac_thuc);

            this.tf_nhap_ma_xac_thuc = this.getControl("tf_nhap_ma_xac_thuc", this.pn_nhap_ma_xac_thuc);
            this.btn_kichhoat_appotp = this.customButton("btn_kichhoat_appotp", code_sercurity_info.BTN_APPOTP, this.pn_noidung_xacthuc);
            this.btn_kichhoat_email = this.customButton("btn_kichhoat_email", code_sercurity_info.BTN_KICHHOAT_EMAIL, this.pn_noidung_xacthuc);
            this.btn_kichhoat_phone = this.customButton("btn_kichhoat_phone", code_sercurity_info.BTN_KICHHOAT_PHONE, this.pn_noidung_xacthuc);
            this.btn_thaydoi_appotp = this.customButton("btn_thaydoi_appotp", code_sercurity_info.BTN_APPOTP, this.pn_noidung_xacthuc);
            this.btn_thaydoi_email = this.customButton("btn_thaydoi_email", code_sercurity_info.BTN_THAYDOI_EMAIL, this.pn_noidung_xacthuc);
            this.btn_thaydoi_phone = this.customButton("btn_thaydoi_phone", code_sercurity_info.BTN_THAYDOI_PHONE, this.pn_noidung_xacthuc);
            this.btn_quaylai_ttbm = this.customButton("btn_quaylai_ttbm", code_sercurity_info.BTN_QUAYLAI_TTBM, this.pn_nhap_ma_xac_thuc);
            this.btn_hoantat_ttbm = this.customButton("btn_hoantat_ttbm", code_sercurity_info.BTN_HOANTAT_TTBM, this.pn_nhap_ma_xac_thuc);
            this.btn_quaylai_notice = this.customButton("btn_quaylai_notice", code_sercurity_info.BTN_QUAYLAI_NOTICE_TTBM, this.pn_thongbao_ttbm);
            this.lb_thongbao_ttbm = this.getControl("lb_thongbao_ttbm", this.pn_thongbao_ttbm);
            this.lb_thongbao_ttbm.setString("");
            this.lb_account_thaydoi_sms = this.getControl("lb_account_thaydoi_sms", this.pn_sms_plus_thay_doi);
            this.lb_phone_thaydoi_sms = this.getControl("lb_phone_thaydoi_sms", this.pn_sms_plus_thay_doi);
            this.tf_new_phone_thaydoi_sms = this.getControl("tf_new_phone_thaydoi_sms", this.pn_sms_plus_thay_doi);
            this.pn_otp_sms = this.pn_sms_plus_thay_doi.getChildByName("pn_otp_sms");
            this.pn_otp_sms.setVisible(false);
            this.btn_close_otp_sms = this.customButton("btn_close_otp_sms", code_sercurity_info.BTN_CLOSE_SMS_OTP, this.pn_otp_sms);
            this.tf_otp_sms = this.getControl("tf_otp_sms", this.pn_otp_sms);
            this.lb_dauso_otp_sms = this.getControl("lb_dauso_otp_sms", this.pn_otp_sms);
            this.btn_hoantat_otp_sms = this.customButton("btn_hoantat_otp_sms", code_sercurity_info.BTN_HOANTAT_SMS_OTP, this.pn_otp_sms);

            this.lb_dauso_sms_thaydoi = this.getControl("lb_dauso_sms_thaydoi", this.pn_sms_plus_thay_doi);
            this.lb_dauso_sms_thaydoi.setString(lobby.sms_otp);
            this.btn_clear_newphone = this.customButton("btn_clear_newphone", code_sercurity_info.BTN_CLEAR_NEWPHONE, this.pn_sms_plus_thay_doi);
            this.btn_clear_newphone.setVisible(false);

            // sms plus
            this.lb_account_smsplus = this.getControl("lb_account_smsplus", this.pn_sms_plus);
            this.lb_phone_smsplus = this.getControl("lb_phone_smsplus", this.pn_sms_plus);
            this.btn_thay_doi_sms_plus = this.customButton("btn_thay_doi_sms_plus", code_sercurity_info.BTN_THAYDOI_SMSPLUS, this.pn_sms_plus);
            this.btn_quay_lai_thaydoi_sms = this.customButton("btn_quay_lai_thaydoi_sms", code_sercurity_info.BTN_QUAYLAI_THAYDOI_SMS, this.pn_sms_plus_thay_doi);
            this.btn_tiep_tuc_thaydoi_sms = this.customButton("btn_tiep_tuc_thaydoi_sms", code_sercurity_info.BTN_TIEPTUC_THAYDOI_SMS, this.pn_sms_plus_thay_doi);
            this.ck_app_otp = this.getControl("ck_app_otp", this.pn_sms_plus);

            //Tony app otp
            this.addLayout(this.pn_thong_tin_bao_mat, "pn_nhap_ma_xac_thuc_appotp", cc.p(518, 1), null, cc.size(0, 0), !0);
            var sr = this.getRandomSecret();
            this.addText(this.pn_nhap_ma_xac_thuc_appotp, "lb_notice_2_appotp", cc.p(239, 450), sr, "res/Font/Roboto-Regular.ttf", 20);

            if (!cc.sys.isNative) {
                this.addSprite(this.pn_nhap_ma_xac_thuc_appotp, "qr_appotp", cc.p(239, 335), "/qr.php?nn=" + window.localStorage.getItem("current_username") + "&sr=" + sr);
            } else {
                var myUrl = "http://" + CURRENT_IP + "/qr.php?nn=" + userGameData.getItem("current_username") + "&sr=" + sr;
                this.addSprite(this.pn_nhap_ma_xac_thuc_appotp, "qr_appotp", cc.p(239, 335), "res/Default/Sprite.png");
                this.qr_appotp.initWithFile(myUrl);
                // cc.textureCache.addImageAsync(myUrl, function (texture) {
                //     this.qr_appotp.setTexture(texture);
                //     this.qr_appotp.setScale(4);
                // }.bind(this), this);
            }

            this.addText(this.pn_nhap_ma_xac_thuc_appotp, "lb_notice_0_appotp", cc.p(239, 210), "Bước 1: Quét QR code bằng Google Authenticator", "res/Font/Roboto-Regular.ttf", 20);

            this.addSprite(this.pn_nhap_ma_xac_thuc_appotp, "sp_appotp", cc.p(239, 145), "res/ResourceMenuTab/Profile/bg_hoso.png");
            this.addEditBox(this.pn_nhap_ma_xac_thuc_appotp, "tf_nhap_ma_xac_thuc_appotp", cc.p(325, 145), "", "_ _ _ _ _ _", RobotoRegular.fontName, 26, cc.size(269, 51), null, cc.VERTICAL_TEXT_ALIGNMENT_CENTER, 6);

            this.addText(this.pn_nhap_ma_xac_thuc_appotp, "lb_notice_3_appotp", cc.p(239, 90), "Bước 2: Nhập mã xác thực gồm 6 chữ số và bấm HOÀN TẤT", "res/Font/Roboto-Regular.ttf", 20);

            this.addButton(this.pn_nhap_ma_xac_thuc_appotp, "btn_quaylai_ttbm_appotp", code_sercurity_info.BTN_QUAYLAI_TTBM, cc.p(66, 35), !0, "res/ResourceMenuTab/Mail/button_2.png", "res/ResourceMenuTab/Mail/button_2.png");
            this.addTextStructure(this.btn_quaylai_ttbm_appotp, "lb_ql_appotp", cc.p(80, 28), "QUAY LẠI", UTMBebas.fontName, "28", "#ffffff", {
                __size: cc.size(270, 34)
            });
            this.lb_ql_appotp.setFontSize(24);

            this.addButton(this.pn_nhap_ma_xac_thuc_appotp, "btn_huongdan_ttbm_appotp", code_sercurity_info.BTN_HUONGDAN_TTBM_APPOTP, cc.p(238, 35), !0, "res/ResourceMenuTab/Mail/button_2.png", "res/ResourceMenuTab/Mail/button_2.png");
            this.addTextStructure(this.btn_huongdan_ttbm_appotp, "lb_hd_appotp", cc.p(80, 30), "HƯỚNG DẪN ", UTMBebas.fontName, "28", "#ffffff", {
                __size: cc.size(270, 34)
            });
                this.lb_hd_appotp.setFontSize(24);
            this.addButton(this.pn_nhap_ma_xac_thuc_appotp, "btn_hoantat_ttbm_appotp", code_sercurity_info.BTN_HOANTAT_TTBM_APPOTP, cc.p(411, 35), !0, "res/ResourceMenuTab/Mail/button_2.png", "res/ResourceMenuTab/Mail/button_2.png");
            this.addTextStructure(this.btn_hoantat_ttbm_appotp, "lb_ht_appotp", cc.p(80, 30), "HOÀN TẤT", UTMBebas.fontName, "28", "#ffffff", {
                __size: cc.size(270, 34)
            });
            this.lb_ht_appotp.setFontSize(24);

            this.addButtonStructure(this.pn_nhap_ma_xac_thuc, "btn_hoantat_ttbm_appotp2", code_sercurity_info.BTN_APPOTP, cc.p(230, 30), !0, ["res/ResourceMenuTab/Mail/button_2.png", "res/ResourceMenuTab/Mail/button_2.png"]);
            this.addTextStructure(this.btn_hoantat_ttbm_appotp2, "lb_ht_8", cc.p(75, 32), "APP OTP", UTMBebas.fontName, "28", "#ffffff", {
                __size: cc.size(270, 34)
            });

            this.pn_nhap_ma_xac_thuc_appotp.setVisible(!1);


            // bao mat dang nhap
            this.pn_da_dang_ky_bm_dang_nhap = this.getControl("pn_da_dang_ky_bm_dang_nhap", this.pn_bao_mat_dang_nhap);
            this.pn_chua_dang_ky = this.getControl("pn_chua_dang_ky", this.pn_bao_mat_dang_nhap);
            this.pn_dang_ky_thanh_cong = this.getControl("pn_dang_ky_thanh_cong", this.pn_bao_mat_dang_nhap);
            this.tf_vin_toi_thieu = this.getControl("tf_vin_toi_thieu", this.pn_da_dang_ky_bm_dang_nhap);
            this.lb_sms_app_bmdn = this.getControl("lb_sms_app_bmdn", this.pn_da_dang_ky_bm_dang_nhap);
            this.tf_ma_otp_bmdn = this.getControl("tf_ma_otp_bmdn", this.pn_da_dang_ky_bm_dang_nhap);
            this.btn_sms_app_bmdn = this.customButton("btn_sms_app_bmdn", code_sercurity_info.BTN_SMS_APP_BMDN, this.pn_da_dang_ky_bm_dang_nhap);
            this.btn_luu_lai_bmdn = this.customButton("btn_luu_lai_bmdn", code_sercurity_info.BTN_LUU_LAI_BMDN, this.pn_da_dang_ky_bm_dang_nhap);
            this.btn_huy_dang_ky_bmdn = this.customButton("btn_huy_dang_ky_bmdn", code_sercurity_info.BTN_HUY_DANGKY_BMDN, this.pn_da_dang_ky_bm_dang_nhap);
            this.lb_dauso_login = this.getControl("lb_dauso_login", this.pn_da_dang_ky_bm_dang_nhap);
            this.lb_dauso_login.setString(lobby.sms_otp);
            this.lb_trang_thai = this.getControl("lb_trang_thai", this.pn_da_dang_ky_bm_dang_nhap);

            this.btn_dang_ky_bmdn = this.customButton("btn_dang_ky_bmdn", code_sercurity_info.BTN_DANKY_BMDN, this.pn_chua_dang_ky);
            this.btn_quay_lai_bmdn = this.customButton("btn_quay_lai_bmdn", code_sercurity_info.BTN_QUAYLAI_BMDN, this.pn_dang_ky_thanh_cong);
            // panel ket sat
            this.lb_account_ketsat = this.getControl("lb_account_ketsat", this.pn_ket_an_toan);
            this.lb_value_kha_dung_ketsat = this.getControl("lb_value_kha_dung_ketsat", this.pn_ket_an_toan);
            this.lb_value_dong_bang_ketsat = this.getControl("lb_value_dong_bang_ketsat", this.pn_ket_an_toan);
            this.ck_dong_bang = this.getControl("ck_dong_bang", this.pn_ket_an_toan);
            this.ck_mo_dong_bang = this.getControl("ck_mo_dong_bang", this.pn_ket_an_toan);
            this.pn_otp_ket_sat = this.pn_ket_an_toan.getChildByName("pn_otp_ket_sat");
            this.pn_otp_ket_sat.setVisible(false);
            this.tf_vin_ketsat = this.getControl("tf_vin_ketsat", this.pn_ket_an_toan);
            this.lb_sms_app_ketsat = this.getControl("lb_sms_app_ketsat", this.pn_otp_ket_sat);
            this.tf_ma_ketsat = this.getControl("tf_ma_ketsat", this.pn_otp_ket_sat);
            this.btn_sms_app_ketsat = this.customButton("btn_sms_app_ketsat", code_sercurity_info.BTN_SMS_APP_KETSAT, this.pn_otp_ket_sat);
            this.btn_tiep_tuc_ketsat = this.customButton("btn_tiep_tuc_ketsat", code_sercurity_info.BTN_TIEPTUC_KETSAT, this.pn_ket_an_toan);
            this.ck_dong_bang.addEventListener(this.DongBangKetSat);
            this.ck_mo_dong_bang.addEventListener(this.MoDongBangKetSat);

            this.lb_dauso_qlgame = this.getControl("lb_dauso_qlgame", this.pn_quan_ly_game);
            this.lb_dauso_ketsat = this.getControl("lb_dauso_ketsat", this.pn_ket_an_toan);

            this.pn_sms_app.setVisible(false);
            this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
            this.pn_dang_ky_thanh_cong.setVisible(false);
            this.pn_noidung_xacthuc.setVisible(false);
            this.pn_nhap_ma_xac_thuc.setVisible(false);
            this.pn_thongbao_ttbm.setVisible(false);
            this.pn_sms_plus.setVisible(false);
            this.pn_sms_plus_thay_doi.setVisible(false);
            this.pn_bao_mat_dang_nhap.setVisible(false);
            this.pn_ket_an_toan.setVisible(false);
            this.pn_quan_ly_game.setVisible(false);
            this.pn_button_da_dang_ky.setVisible(false);
            this.pn_bao_mat.setVisible(false);
            //this.pn_bao_mat.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showsercurity_info)));

            this.lb_dauso_otp_sms.setString(lobby.sms_otp);
            this.lb_dauso.setString(lobby.sms_otp);
            this.lb_dauso_qlgame.setString(lobby.sms_otp);
            this.lb_dauso_ketsat.setString(lobby.sms_otp);

            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
                this.tf_cmtnd = menutab.changeTextFieldAsEditBox(this.tf_cmtnd, this.pn_thong_tin_bao_mat);
                this.tf_email = menutab.changeTextFieldAsEditBox(this.tf_email, this.pn_thong_tin_bao_mat);
                this.tf_phone_bm = menutab.changeTextFieldAsEditBox(this.tf_phone_bm, this.pn_thong_tin_bao_mat);
                this.tf_nhap_ma_xac_thuc = menutab.changeTextFieldAsEditBox(this.tf_nhap_ma_xac_thuc, this.pn_nhap_ma_xac_thuc);
                this.tf_new_phone_thaydoi_sms = menutab.changeTextFieldAsEditBox(this.tf_new_phone_thaydoi_sms, this.pn_sms_plus_thay_doi);
                this.tf_otp_sms = menutab.changeTextFieldAsEditBox(this.tf_otp_sms, this.pn_otp_sms);
                this.tf_vin_toi_thieu = menutab.changeTextFieldAsEditBox(this.tf_vin_toi_thieu, this.pn_da_dang_ky_bm_dang_nhap);
                this.tf_ma_otp_bmdn = menutab.changeTextFieldAsEditBox(this.tf_ma_otp_bmdn, this.pn_da_dang_ky_bm_dang_nhap);
                this.tf_otp_config_game = menutab.changeTextFieldAsEditBox(this.tf_otp_config_game, this.pn_quan_ly_game);
                this.tf_vin_ketsat = menutab.changeTextFieldAsEditBox(this.tf_vin_ketsat, this.pn_ket_an_toan);
                this.tf_ma_ketsat = menutab.changeTextFieldAsEditBox(this.tf_ma_ketsat, this.pn_otp_ket_sat);
                this.tf_otp_sms.setFontColor(cc.color.WHITE);
                this.tf_nhap_ma_xac_thuc.setFontColor(cc.color.WHITE);
                this.pn_qlgame_chua_bm.setLocalZOrder(1000);
                this.pn_otp_sms.setLocalZOrder(1001);

                if (!cc.sys.isNative) {
                    this.tf_otp_sms.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                    this.tf_nhap_ma_xac_thuc.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                    this.tf_otp_config_game.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                    this.tf_ma_ketsat.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                    this.tf_ma_otp_bmdn.setTextAlign(cc.TEXT_ALIGNMENT_CENTER);
                }
            } else {
                this.tf_cmtnd.addEventListener(this.text_field_event, this);
                this.tf_email.addEventListener(this.text_field_event, this);
                this.tf_phone_bm.addEventListener(this.text_field_event, this);
                this.tf_nhap_ma_xac_thuc.addEventListener(this.text_field_event, this);
                this.tf_new_phone_thaydoi_sms.addEventListener(this.text_field_event, this);
                this.tf_otp_sms.addEventListener(this.text_field_event, this);
                this.tf_vin_toi_thieu.addEventListener(this.text_field_event, this);
                this.tf_ma_otp_bmdn.addEventListener(this.text_field_event, this);
                this.tf_otp_config_game.addEventListener(this.text_field_event, this);
                this.tf_vin_ketsat.addEventListener(this.text_field_event, this);
                this.tf_ma_ketsat.addEventListener(this.text_field_event, this);

                this.tf_otp_sms.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_nhap_ma_xac_thuc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_otp_config_game.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_ma_ketsat.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_ma_otp_bmdn.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

                this.tf_cmtnd.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_email.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_phone_bm.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_nhap_ma_xac_thuc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_new_phone_thaydoi_sms.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_otp_sms.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_vin_toi_thieu.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_ma_otp_bmdn.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_otp_config_game.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_vin_ketsat.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_ma_ketsat.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }

        },

        //TonyNDT
        getRandomSecret: function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (var i = 0; i < 16; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        showsercurity_info: function () {
            sercurity_info.pn_bao_mat.setVisible(true);
            sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(false);
            sercurity_info.pn_bao_mat.runAction(cc.scaleTo(0.2, 1));
            sercurity_info.check_dangky_baomat = lobby.userInfo.mobileSecurity;

            if (sercurity_info.check_dangky_baomat == 0) {
                sercurity_info.pn_button_chua_dang_ky.setVisible(true);
                sercurity_info.pn_button_da_dang_ky.setVisible(false);
                sercurity_info.pn_qlgame_chua_bm.setVisible(true);
                if (sercurity_info.gotoTab == "" || sercurity_info.gotoTab == "TTBM_S" || sercurity_info.gotoTab == "SMSPLUS" || sercurity_info.gotoTab == "BMDN" || sercurity_info.gotoTab == "KSAT" || sercurity_info.gotoTab == "QLG_S")
                    sercurity_info.gotoTab = "TTBM_B";
            } else {
                sercurity_info.pn_button_chua_dang_ky.setVisible(false);
                sercurity_info.pn_button_da_dang_ky.setVisible(true);
                sercurity_info.pn_qlgame_chua_bm.setVisible(false);
                if (sercurity_info.gotoTab == "" || sercurity_info.gotoTab == "TTBM_B" || sercurity_info.gotoTab == "QLG_B")
                    sercurity_info.gotoTab = "TTBM_S";
            }

            sercurity_info.gotoBaoMatTab(sercurity_info.gotoTab);

            if (lobby.userInfo.appSecurity == 0) {
                sercurity_info.ck_app_otp.setSelected(false);
            } else {
                sercurity_info.ck_app_otp.setSelected(true);
            }
        },

        gotoBaoMatTab: function (str) {
            if (str == "TTBM_B") {
                this.resetSP_Button_Baomat();
                this.resetThongTin_Baomat();
                sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
            } else if (str == "QLG_B") {
                this.resetSP_Button_Baomat();
                sercurity_info.sp_quanlygame.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                sercurity_info.pn_quan_ly_game.setVisible(true);
            } else if (str == "TTBM_S") {
                this.resetSP_Button_Baomat();
                this.resetThongTin_Baomat();
                sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
            } else if (str == "SMSPLUS") {
                this.resetSP_Button_Baomat();
                sercurity_info.sp_sms_plus.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                sercurity_info.pn_sms_plus.setVisible(true);
            } else if (str == "BMDN") {
                this.resetSP_Button_Baomat();
                sercurity_info.sp_bao_mat_dang_nhap.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                sercurity_info.pn_bao_mat_dang_nhap.setVisible(true);
            } else if (str == "KSAT") {
                this.resetSP_Button_Baomat();
                sercurity_info.sp_ket_an_toan.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                sercurity_info.pn_ket_an_toan.setVisible(true);
            } else if (str == "QLG_S") {
                this.resetSP_Button_Baomat();
                sercurity_info.sp_quanlygame_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                sercurity_info.pn_quan_ly_game.setVisible(true);
            }

            sercurity_info.ShowInformation();
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case code_sercurity_info.BTN_CLOSE_SMS_OTP:
                    this.pn_otp_sms.setVisible(false);
                    break;
                case code_sercurity_info.BTN_CLEAR_NEWPHONE:
                    this.tf_new_phone_thaydoi_sms.setString("");
                    this.tf_new_phone_thaydoi_sms.setPlaceHolder("Số điện thoại mới");
                    this.btn_clear_newphone.setVisible(false);
                    this.tf_new_phone_thaydoi_sms.setColor(cc.color("#FFFFFF"));
                    this.tf_new_phone_thaydoi_sms.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_sercurity_info.BTN_CLEAR_CMT:
                    cc.log("CMT");
                    this.tf_cmtnd.setString("");
                    this.tf_cmtnd.setPlaceHolder("CMTND");
                    this.btn_clear_cmt.setVisible(false);
                    this.tf_cmtnd.setColor(cc.color("#FFFFFF"));
                    this.tf_cmtnd.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_sercurity_info.BTN_CLEAR_EMAIL:
                    cc.log("MAIL");
                    this.tf_email.setString("");
                    this.tf_email.setPlaceHolder("Email");
                    this.btn_clear_email.setVisible(false);
                    this.tf_email.setColor(cc.color("#FFFFFF"));
                    this.tf_email.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_sercurity_info.BTN_CLEAR_PHONE:
                    cc.log("PHONE");
                    this.tf_phone_bm.setString("");
                    this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                    this.btn_clear_phone.setVisible(false);
                    this.tf_phone_bm.setColor(cc.color("#FFFFFF"));
                    this.tf_phone_bm.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_sercurity_info.BTN_CLOSE_BAO_MAT:
                    closesercurity_info();
                    break;
                case code_sercurity_info.BTN_TTBM_BIG:
                    this.resetSP_Button_Baomat();
                    this.resetThongTin_Baomat();
                    this.gotoTab = "TTBM_B";
                    sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
                    this.ShowInformation();
                    break;
                case code_sercurity_info.BTN_QUANLYGAME_BIG:
                    this.resetSP_Button_Baomat();
                    this.gotoTab = "QLG_B";
                    sercurity_info.sp_quanlygame.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    sercurity_info.pn_quan_ly_game.setVisible(true);
                    sercurity_info.where_pn_sms_otp = "quanlygame";
                    sercurity_info.pn_sms_app.x = 432.56;
                    sercurity_info.pn_sms_app.y = 222.95;
                    //this.funGotoQuanLyGame();
                    break;
                case code_sercurity_info.BTN_SMS_APP_QLGAME:
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_sercurity_info.BTN_CLOSE_SMS_APP:
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(false);
                    break;
                case code_sercurity_info.BTN_BM_SMS:
                    if (sercurity_info.where_pn_sms_otp == "quanlygame") {
                        sercurity_info.lb_sms_app_qlg.setString("TELE OTP");
                    } else if (sercurity_info.where_pn_sms_otp == "baomatdangnhap") {
                        sercurity_info.lb_sms_app_bmdn.setString("TELE OTP");
                    } else if (sercurity_info.where_pn_sms_otp == "ketsat") {
                        sercurity_info.lb_sms_app_ketsat.setString("TELE OTP");
                    }
                    this.type_otp = 0;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case code_sercurity_info.BTN_BM_APP:
                    if (sercurity_info.where_pn_sms_otp == "quanlygame") {
                        sercurity_info.lb_sms_app_qlg.setString("APP OTP");
                    } else if (sercurity_info.where_pn_sms_otp == "baomatdangnhap") {
                        sercurity_info.lb_sms_app_bmdn.setString("APP OTP");
                    } else if (sercurity_info.where_pn_sms_otp == "ketsat") {
                        sercurity_info.lb_sms_app_ketsat.setString("APP OTP");
                    }
                    this.type_otp = 1;
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 0));
                    this.pn_sms_app.setVisible(true);
                    break;
                case code_sercurity_info.BTN_CAPNHAT_TTBM:
                    this.funUpdateUserInfo();
                    break;
                case code_sercurity_info.BTN_KICHHOAT_PHONE:
                    this.funAutoSendActivePhone();
                    break;
                case code_sercurity_info.BTN_KICHHOAT_EMAIL:
                    if (Minigame.isLoginSocket) {
                        //cc.log("vao");
                        var sercurity = new CmdSendActiveEmail();
                        sercurity.putActiveEmail();
                        Minigame.miniGameClient.send(sercurity);
                        sercurity.clean();
                        this.btn_kichhoat_email.setEnabled(false);
                    } else {
                        popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                        Minigame.connectSocket();
                    }
                    break;
                case code_sercurity_info.BTN_QUAYLAI_NOTICE_TTBM:
                    this.resetThongTin_Baomat();
                    sercurity_info.lb_thongbao_ttbm.setString("");
                    this.ischangeEmail = false;
                    this.pn_thongbao_ttbm.setVisible(false);
                    this.pn_noidung.setVisible(false);
                    this.pn_noidung_xacthuc.setVisible(true);
                    this.btn_cap_nhat_bm.setVisible(false);
                    sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(false);
                    sercurity_info.pn_nhap_ma_xac_thuc.setVisible(false);
                    break;
                case code_sercurity_info.BTN_THAYDOI_EMAIL:
                    this.resetThongTin_Baomat();
                    this.tf_email.setVisible(true);
                    this.lb_save_email.setVisible(false);
                    this.tf_email.setColor(cc.color("#FFFFFF"));
                    this.ischangeEmail = true;
                    break;
                case code_sercurity_info.BTN_THAYDOI_PHONE:
                    this.resetThongTin_Baomat();
                    this.tf_phone_bm.setVisible(true);
                    this.lb_save_phone.setVisible(false);
                    this.ischangePhone = true;
                    this.tf_phone_bm.setColor(cc.color("#FFFFFF"));
                    break;
                case code_sercurity_info.BTN_QUAYLAI_TTBM:
                    sercurity_info.pn_nhap_ma_xac_thuc.setVisible(false);
                    sercurity_info.pn_noidung_xacthuc.setVisible(true);
                    this.ischangePhone = false;
                    this.btn_kichhoat_phone.setEnabled(true);
                    this.tf_nhap_ma_xac_thuc.setString("");
                    this.tf_nhap_ma_xac_thuc.setPlaceHolder(" _ _ _ _ _");
                    sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(false);
                    break;
                case code_sercurity_info.BTN_HOANTAT_TTBM:
                    this.funSendOTP(false);
                    break;
                case code_sercurity_info.BTN_TTBM_SMALL:
                    this.resetSP_Button_Baomat();
                    this.resetThongTin_Baomat();
                    this.gotoTab = "TTBM_S";
                    sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                    sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
                    this.ShowInformation();
                    break;
                case code_sercurity_info.BTN_QUANLYGAME_SMALL:
                    this.resetSP_Button_Baomat();
                    this.gotoTab = "QLG_S";
                    sercurity_info.sp_quanlygame_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                    sercurity_info.pn_quan_ly_game.setVisible(true);
                    sercurity_info.where_pn_sms_otp = "quanlygame";
                    sercurity_info.pn_sms_app.x = 432.56;
                    sercurity_info.pn_sms_app.y = 222.95;
                    //this.funGotoQuanLyGame();
                    break;
                case code_sercurity_info.BTN_SMS_PLUS:
                    this.resetSP_Button_Baomat();
                    this.gotoTab = "SMSPLUS";
                    sercurity_info.sp_sms_plus.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    sercurity_info.pn_sms_plus.setVisible(true);
                    break;
                case code_sercurity_info.BTN_BM_DANG_NHAP:
                    this.resetSP_Button_Baomat();
                    this.gotoTab = "BMDN";
                    sercurity_info.sp_bao_mat_dang_nhap.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    sercurity_info.pn_bao_mat_dang_nhap.setVisible(true);
                    sercurity_info.where_pn_sms_otp = "baomatdangnhap";
                    this.funGotoSercurityLogin();
                    sercurity_info.pn_sms_app.x = 432.56;
                    sercurity_info.pn_sms_app.y = 222.95;
                    break;
                case code_sercurity_info.BTN_KET_AN_TOAN:
                    this.resetSP_Button_Baomat();
                    this.gotoTab = "KSAT";
                    sercurity_info.sp_ket_an_toan.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    sercurity_info.pn_ket_an_toan.setVisible(true);
                    sercurity_info.where_pn_sms_otp = "ketsat";
                    sercurity_info.pn_sms_app.x = 432.56;
                    sercurity_info.pn_sms_app.y = 222.95;
                    break;
                case code_sercurity_info.BTN_THAYDOI_SMSPLUS:
                    sercurity_info.pn_sms_plus.setVisible(false);
                    sercurity_info.pn_sms_plus_thay_doi.setVisible(true);
                    sercurity_info.pn_otp_sms.setVisible(false);
                    break;
                case code_sercurity_info.BTN_APPOTP:
                    this.pn_noidung_xacthuc.setVisible(!1);
                    this.pn_nhap_ma_xac_thuc.setVisible(!1);
                    sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(!0);
                    break;
                case code_sercurity_info.BTN_HUONGDAN_TTBM_APPOTP:
                    //this.pn_noidung_xacthuc.setVisible(!1);
                    //sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(!0);
                    cc.sys.openURL("https://www.youtube.com/watch?v=dGj7arceqCM");
                    break;
                case code_sercurity_info.BTN_HOANTAT_TTBM_APPOTP:
                    this.funSendAPPOTP();
                    break;
                case code_sercurity_info.BTN_QUAYLAI_THAYDOI_SMS:
                    sercurity_info.pn_sms_plus.setVisible(true);
                    sercurity_info.pn_sms_plus_thay_doi.setVisible(false);
                    sercurity_info.pn_otp_sms.setVisible(false);
                    this.tf_new_phone_thaydoi_sms.setString("");
                    this.tf_new_phone_thaydoi_sms.setPlaceHolder("Số điện thoại mới");
                    this.btn_clear_newphone.setVisible(false);
                    this.tf_new_phone_thaydoi_sms.setColor(cc.color("#FFFFFF"));
                    this.tf_new_phone_thaydoi_sms.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_sercurity_info.BTN_TIEPTUC_THAYDOI_SMS:
                    this.funExchangeMobileActived();
                    break;
                case code_sercurity_info.BTN_DANKY_BMDN:
                    sercurity_info.pn_chua_dang_ky.setVisible(false);
                    sercurity_info.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                    break;
                case code_sercurity_info.BTN_QUAYLAI_BMDN:
                    sercurity_info.pn_dang_ky_thanh_cong.setVisible(false);
                    sercurity_info.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                    break;
                case code_sercurity_info.BTN_SMS_APP_BMDN:
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_sercurity_info.BTN_SMS_APP_KETSAT:
                    this.pn_sms_app.setVisible(true);
                    this.pn_sms_app.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_sercurity_info.BTN_HOANTAT_SMS_OTP:
                    this.funSendOTP(true);
                    break;
                case code_sercurity_info.BTN_LUU_LAI_BMDN:
                    this.funRegisterSercurityLogin();
                    this.isRegisterOrRemoveOtpLogin = false;
                    break;
                case code_sercurity_info.BTN_HUY_DANGKY_BMDN:
                    this.funRemoveSercurityLogin();
                    this.isRegisterOrRemoveOtpLogin = true;
                    break;
                case code_sercurity_info.BTN_SAVE_QLGAME:
                    this.funConfigGame();
                    break;
                case code_sercurity_info.BTN_TIEPTUC_KETSAT:
                    this.funSafeMoney();
                    break;
                case code_sercurity_info.BTN_LINK_QLGAME:
                    this.gotoBaoMatTab("TTBM_B");
                    break;
            }
        },

        funSendAPPOTP: function () {
            var a = this.tf_nhap_ma_xac_thuc_appotp.getString();
            var sr = this.lb_notice_2_appotp.getString();
            var un = userGameData.getItem("current_username");
            var at = lobby.userInfo.accessToken;
            if ("" == a || 6 > a.length)
                popup.openPanel_Alert_Lobby("Mã OTP phải là 6 ký tự!");
            else if (lobby.checkKyTuSpecial(a, !1))
                if (Minigame.isLoginSocket) {
                    sendRequest("http://" + CURRENT_IP + ":8081/api?c=2000&un=" + un + "&secret=" + sr + "&otp=" + a + "&at=" + at, null, !1, this.callBackGetDataAPPOTP.bind(this), this.callBackErrorAPPOTP.bind(this));
                } else
                    popup.openPanel_Alert_Lobby("K\u1ebft n\u1ed1i m\u1ea1ng kh\u00f4ng \u1ed5n \u0111\u1ecbnh. Vui l\u00f2ng th\u1eed l\u1ea1i sau!"),
                        Minigame.connectSocket();
            else
                popup.openPanel_Alert_Lobby("Mã OTP phải là 6 ký tự!")
        },
        callBackGetDataAPPOTP: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                popup.openPanel_Alert_Lobby("Thành công");
                lobby.userInfo.appSecurity = 1;
                lobby.userInfo.mobileSecurity = 1;
                sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(false);
                this.ShowInformation();
            } else {
                popup.openPanel_Alert_Lobby("Không thành công. Code: " + errorCode);
            }
        },
        callBackErrorAPPOTP: function (a) {
            popup.openPanel_Alert_Lobby("Lỗi");
        },
        funAutoSendActivePhone: function () {
            if (Minigame.isLoginSocket) {
                var sercurity = new CmdSendActivePhone();
                sercurity.putActivePhone();
                Minigame.miniGameClient.send(sercurity);
                sercurity.clean();
                this.btn_kichhoat_phone.setEnabled(false);
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },

        funSafeMoney: function () {
            //cc.log("sent ket sat");
            var otp = this.tf_ma_ketsat.getString();
            var money = this.tf_vin_ketsat.getString();
            money = replaceAll(".", "", money);
            if (this.type_safe == 1) {
                if (money > lobby.userInfo.moneyUse) {
                    popup.openPanel_Alert_Lobby("Bạn không thể đóng băng quá số dư khả dụng!");
                    return null;
                }
            } else {
                if (money > lobby.userInfo.safe) {
                    popup.openPanel_Alert_Lobby("Bạn không thể mở đóng băng quá số tiền trong két sắt!");
                    return null;
                } else if (otp == "" || otp.length < 5) {
                    popup.openPanel_Alert_Lobby("Mã Otp gồm 6 ký tự!");
                    return null;
                }
            }
            if (money == "" || money <= 0) {
                popup.openPanel_Alert_Lobby("Bạn chưa nhập số tiền cần giao dịch!");
            } else {
                if (Minigame.isLoginSocket) {
                    var sercurity = new CmdSendSafeMoney();
                    //cc.log("type_safe " + sercurity_info.type_safe + " money " + money);
                    sercurity.putSafeMoney(sercurity_info.type_safe, money);
                    Minigame.miniGameClient.send(sercurity);
                    sercurity.clean();
                    this.btn_tiep_tuc_ketsat.setEnabled(false);
                    this.saveOtp_ketsat = otp;
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }

        },
        responseSafeMoney: function (error, moneyUse, safe) {
            //cc.log("error safe money: " + error + " moneyUse : " + moneyUse + " safe : " + safe);
            lobby.userInfo.moneyUse = moneyUse;
            lobby.userInfo.safe = safe;
            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, lobby.userInfo.safe));
            if (error == 0) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    if (Minigame.isLoginSocket) {
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(sercurity_info.saveOtp_ketsat, sercurity_info.type_otp);
                        Minigame.miniGameClient.send(sendOtp);
                        sendOtp.clean();
                    } else {
                        popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                        Minigame.connectSocket();
                    }
                })));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                if (this.type_safe == 1) {
                    popup.openPanel_Alert_Lobby("Bạn không thể đóng băng quá số dư khả dụng!");
                } else {
                    popup.openPanel_Alert_Lobby("Bạn không thể mở đóng băng quá số tiền trong két sắt!");
                }
            }
            //openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch!");
        },
        responseResultSafeMoney: function (error, moneyUse, safe, currentMoney) {
            //cc.log("error result safe money: " + error + " moneyUse : " + moneyUse + " safe : " + safe + " currentMoney : " + currentMoney);
            this.btn_tiep_tuc_ketsat.setEnabled(true);
            lobby.userInfo.moneyUse = moneyUse;
            lobby.userInfo.safe = safe;
            lobby.userInfo.vinTotal = currentMoney;
            if (lobby.userInfo == null) {
            } else {
                menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
            }

            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, lobby.userInfo.safe));
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Giao dịch thành công!");
                this.tf_vin_ketsat.setString("");
                this.tf_vin_ketsat.setPlaceHolder("Nhập số Vin cần đóng băng / mở đóng băng");
                this.tf_vin_ketsat.setColor(cc.color("#FFFFFF"));
                this.tf_vin_ketsat.runAction(cc.scaleTo(0.225, 1));

                this.tf_ma_ketsat.setString("");
                this.tf_ma_ketsat.setPlaceHolder("Mã OTP");
                this.tf_ma_ketsat.setColor(cc.color("#FFFFFF"));
                this.tf_ma_ketsat.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            }
        },

        funGotoQuanLyGame: function () {
            var array = JSON.parse(lobby.userInfo.configGame);
            var vitriX = 42.63;
            var vitriY = 338.55;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            if (this.arrayStatusGame != null)
                while (this.arrayStatusGame.length > 0) {
                    this.arrayStatusGame.pop();
                }
            for (var i = 0; i < array.length; i++) {
                if (this.pn_quan_ly_game.getChildByName("ck_game_" + i) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/BaoMat/Chk_game.png");
                    button.setPosition(cc.p(vitriX + 79, vitriY));
                    button.setName("ck_game_2" + i);
                    this.pn_quan_ly_game.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_game(sender.name);
                                break;
                        }

                    }, this);
                    var button2 = new ccui.Button();
                    button2.loadTextureNormal("res/ResourceMenuTab/BaoMat/checkbox.png");
                    button2.setPosition(cc.p(vitriX, vitriY));
                    button2.setName("ck_game_s" + i);
                    this.pn_quan_ly_game.addChild(button2);

                    button2.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_game(sender.name);
                                break;
                        }

                    }, this);

                    var lb_xacnhan = new cc.Sprite();
                    lb_xacnhan.initWithFile("res/ResourceMenuTab/BaoMat/click2.png", cc.rect(0, 0, 21, 21));
                    lb_xacnhan.setName("tich_" + i);
                    lb_xacnhan.setPosition(cc.p(vitriX, vitriY));
                    this.pn_quan_ly_game.addChild(lb_xacnhan);
                    if (array[i].status == 1) {
                        lb_xacnhan.setVisible(false);
                    }

                    var lb_game = new cc.LabelTTF('', fonts.fontName, 18, cc.size(200, 25), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lb_game.setPosition(cc.p((vitriX + 118.26), vitriY));
                    lb_game.setString(array[i].name);
                    lb_game.setColor(cc.color("#e8daad"));
                    this.pn_quan_ly_game.addChild(lb_game);

                    this.arrayStatusGame.push(array[i].status);
                    this.arrayIdGame.push(array[i].id);
                    this.saveArrayStatusGame.push(array[i].status);
                    //cc.log("this.arrayStatusGame " + this.arrayStatusGame);

                    vitriX = vitriX + 245;
                    if (i == 3 || i == 7 || i == 11) {
                        vitriX = 42.63;
                        vitriY = vitriY - 48;
                    }
                } else {
                    if (this.pn_quan_ly_game.getChildByName("tich_" + i) != null) {
                        var lb_xacnhan = this.pn_quan_ly_game.getChildByName("tich_" + i);
                        if (array[i].status == 1) {
                            lb_xacnhan.setVisible(false);
                        } else {
                            lb_xacnhan.setVisible(true);
                        }
                    }

                    this.arrayStatusGame.push(array[i].status);
                    this.arrayIdGame.pop();
                    this.arrayIdGame.push(array[i].id);
                    this.saveArrayStatusGame.push(array[i].id);
                    //cc.log("this.arrayStatusGame " + this.arrayStatusGame);
                }
            }
        },

        detail_game: function (value) {
            //cc.log("value : "+ value.substring((value.length - 1), value.length));
            var stt = value.substr(9, value.length);
            if (this.pn_quan_ly_game.getChildByName("tich_" + stt) != null) {
                var lb_xacnhan = this.pn_quan_ly_game.getChildByName("tich_" + stt);
                if (this.arrayStatusGame[stt] == 0) {
                    this.arrayStatusGame[stt] = 1;
                    lb_xacnhan.setVisible(false);
                } else {
                    this.arrayStatusGame[stt] = 0;
                    lb_xacnhan.setVisible(true);
                }
                // cc.log("mang sau2 : " + this.arrayStatusGame);
            }
        },

        funConfigGame: function () {
            var arrObj = [];
            arrObj.pop();
            //cc.log("sercurity_info.arrayIdGame.length " + sercurity_info.arrayIdGame.length);
            for (var i = 0; i < sercurity_info.arrayIdGame.length; i++) {
                var obj = {
                    id: sercurity_info.arrayIdGame[i],
                    name: "",
                    status: sercurity_info.arrayStatusGame[i],
                };
                arrObj.push(obj);
            }

            var json = JSON.stringify(arrObj);
            //cc.log("json: " + json);
            //cc.log("arrayStatusGame: " + sercurity_info.arrayStatusGame);
            //cc.log("saveArrayStatusGame: " + sercurity_info.saveArrayStatusGame);

            this.checkArrayListGame();

            var otp = this.tf_otp_config_game.getString();
            if (otp == "" || otp.length < 5) {
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            } else if (this.ischeckListgame == false) {
                popup.openPanel_Alert_Lobby("Cấu hình không có thay đổi so với trước!");
            } else {
                if (Minigame.isLoginSocket) {
                    var sercurity = new CmdSendConfigGames();
                    sercurity.putConfigGames(json);
                    Minigame.miniGameClient.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, sercurity_info.type_otp);
                        Minigame.miniGameClient.send(sendOtp);
                        sendOtp.clean();
                    })));
                    this.btn_save_qlgame.setEnabled(false);
                    this.ischeckListgame = false;

                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },
        responseConfigGames: function (error) {
            //cc.log("error config games: " + error);
            sercurity_info.btn_save_qlgame.setEnabled(true);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Lưu thay đổi thành công!");
                for (var i = 0; i < lobby.userInfo.configGame.length; i++) {
                    this.saveArrayStatusGame[i] = this.arrayStatusGame[i];
                }
                this.tf_otp_config_game.setString("");
                this.tf_otp_config_game.setPlaceHolder("Mã OTP");
                this.tf_otp_config_game.setColor(cc.color("#FFFFFF"));
                this.tf_otp_config_game.runAction(cc.scaleTo(0.225, 1));
            } else {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }
        },

        checkArrayListGame: function () {
            for (var i = 0; i < this.arrayStatusGame.length; i++) {
                if (this.arrayStatusGame[i] != this.saveArrayStatusGame[i]) {
                    this.ischeckListgame = true;
                    return;
                }
            }
        },

        funGotoSercurityLogin: function () {
            //cc.log("loginSecure : "+ lobby.userInfo.loginSecure);
            if (lobby.userInfo.loginSecure == 0) {
                this.lb_trang_thai.setString("Đang đăng ký ...!");
                this.pn_chua_dang_ky.setVisible(true);
                this.pn_dang_ky_thanh_cong.setVisible(false);
                this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
            } else {
                this.lb_trang_thai.setString("Đã kích hoạt bảo mật");
                this.pn_chua_dang_ky.setVisible(false);
                this.pn_dang_ky_thanh_cong.setVisible(false);
                this.pn_da_dang_ky_bm_dang_nhap.setVisible(true);
                this.tf_vin_toi_thieu.setString(formatMoney(0, 3, parseInt(lobby.userInfo.moneyLoginOtp)));
                this.tf_vin_toi_thieu.setColor(cc.color("#3E3E3E"));
            }
        },

        funRegisterSercurityLogin: function () {
            var vinmin = this.tf_vin_toi_thieu.getString();
            vinmin = replaceAll(".", "", vinmin);
            var otp = this.tf_ma_otp_bmdn.getString();
            if (otp == "" || otp.length < 5) {
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            } else {
                var input = 0;
                if (vinmin == "" || parseInt(vinmin) <= 0)
                    input = 0;
                else
                    input = parseInt(vinmin);

                if (Minigame.isLoginSocket) {
                    var sercurity = new CmdSendSercurityLogin();
                    sercurity.putSercurityLogin(input, 1);
                    Minigame.miniGameClient.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, sercurity_info.type_otp);
                        Minigame.miniGameClient.send(sendOtp);
                        sendOtp.clean();
                    })));
                    this.btn_luu_lai_bmdn.setEnabled(false);
                    this.btn_huy_dang_ky_bmdn.setEnabled(false);
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },
        funRemoveSercurityLogin: function () {
            var otp = this.tf_ma_otp_bmdn.getString();
            if (otp == "" || otp.length < 5) {
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            } else {
                if (Minigame.isLoginSocket) {
                    var sercurity = new CmdSendSercurityLogin();
                    sercurity.putSercurityLogin(0, 0);
                    Minigame.miniGameClient.send(sercurity);
                    sercurity.clean();

                    this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                        //cc.log("type_otp : " + sercurity_info.type_otp);
                        var sendOtp = new CmdSendOTP();
                        sendOtp.putSendOTP(otp, sercurity_info.type_otp);
                        Minigame.miniGameClient.send(sendOtp);
                        sendOtp.clean();
                    })));
                    this.btn_luu_lai_bmdn.setEnabled(false);
                    this.btn_huy_dang_ky_bmdn.setEnabled(false);
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },
        responseSercurityLogin: function (error) {
            //cc.log("error sercurity login " + error);
            this.btn_luu_lai_bmdn.setEnabled(true);
            this.btn_huy_dang_ky_bmdn.setEnabled(true);
            if (error == 0) {
                if (this.isRegisterOrRemoveOtpLogin == false) {
                    if (lobby.userInfo.loginSecure == 0) {
                        this.pn_dang_ky_thanh_cong.setVisible(true);
                        this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
                        lobby.userInfo.loginSecure = 1;
                    } else {
                        popup.openPanel_Alert_Lobby("Cài đặt mức Vin tối thiểu đăng nhập thành công!");
                    }
                    var vinmin = this.tf_vin_toi_thieu.getString();
                    vinmin = replaceAll(".", "", vinmin);
                    if (vinmin == "")
                        this.tf_vin_toi_thieu.setString("0");
                    lobby.userInfo.moneyLoginOtp = parseInt(vinmin);
                    this.lb_trang_thai.setString("Đã kích hoạt bảo mật");
                } else {
                    this.tf_vin_toi_thieu.setString("");
                    this.tf_vin_toi_thieu.setPlaceHolder("Số Vin tối thiểu");
                    this.tf_vin_toi_thieu.setColor(cc.color("#FFFFFF"));
                    this.tf_vin_toi_thieu.runAction(cc.scaleTo(0.225, 1));
                    lobby.userInfo.loginSecure = 0;
                    lobby.userInfo.moneyLoginOtp = 0;
                    this.pn_chua_dang_ky.setVisible(true);
                    this.pn_dang_ky_thanh_cong.setVisible(false);
                    this.pn_da_dang_ky_bm_dang_nhap.setVisible(false);
                    popup.openPanel_Alert_Lobby("Bạn đã hủy chức năng bảo mật đăng nhập!");
                    this.lb_trang_thai.setString("Đang đăng ký ...!");
                }
                this.tf_ma_otp_bmdn.setString("");
                this.tf_ma_otp_bmdn.setPlaceHolder("Mã OTP");
                this.tf_ma_otp_bmdn.setColor(cc.color("#FFFFFF"));
                this.tf_ma_otp_bmdn.runAction(cc.scaleTo(0.225, 1));
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },

        funGetInformation: function () {
            if (Minigame.isLoginSocket) {
                var sendOtp = new CmdSendGetInformationSercurity();
                sendOtp.putGetInformationSercurity();
                Minigame.miniGameClient.send(sendOtp);
                sendOtp.clean();
                //cc.log("send get info");
            } else {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                Minigame.connectSocket();
            }
        },
        responseGetInformationSercurity: function (error, username, cmt, email, mobile, mobileSecure, emailSecure, appSecure, loginSecure, moneyLoginOtp, moneyUse, safe, configGame) {
            //cc.log("error get sercurity: " + error + " username: " + username+ " cmt: " + cmt+ " email: " + email + " mobile: " + mobile + " mobileSecure: " + mobileSecure
            //    + " emailSecure: " + emailSecure + " appSecure: " + appSecure + " loginSecure: " + loginSecure  + " moneyLoginOtp: " + moneyLoginOtp + " moneyUse: " + moneyUse
            //    + " safe: " + safe + " configGame: " + configGame);
            if (error == 0) {
                lobby.userInfo.username = username;
                lobby.userInfo.identification = cmt;
                lobby.userInfo.email = email;
                lobby.userInfo.mobile = mobile;
                lobby.userInfo.mobileSecurity = mobileSecure;
                lobby.userInfo.emailSecurity = emailSecure;
                lobby.userInfo.appSecurity = appSecure;
                lobby.userInfo.loginSecure = loginSecure;
                lobby.userInfo.moneyLoginOtp = moneyLoginOtp;
                lobby.userInfo.moneyUse = moneyUse;
                lobby.userInfo.safe = safe;
                lobby.userInfo.configGame = configGame;

                this.showsercurity_info();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                closesercurity_info();
            }
        },

        funExchangeMobileActived: function () {
            //cc.log("vao");
            var newphone = this.tf_new_phone_thaydoi_sms.getString();
            if (newphone == "" || newphone.length < 10 || newphone.length > 15 || parseInt(newphone.substr(0, 1)) != 0) {
                popup.openPanel_Alert_Lobby("Số điện thoại phải bắt đầu bằng 0 và độ dài từ 10 - 15 số!");
            } else {
                if (Minigame.isLoginSocket) {
                    var sercurity = new CmdSendExchangeMobileActived();
                    sercurity.putExchangeMobileActived(newphone);
                    Minigame.miniGameClient.send(sercurity);
                    sercurity.clean();

                    this.save_new_phone = newphone;
                    this.btn_tiep_tuc_thaydoi_sms.setEnabled(false);
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },
        responseExchangeMobileActived: function (error) {
            //cc.log("error ExchangeMobileActived: " + error);
            this.btn_tiep_tuc_thaydoi_sms.setEnabled(true);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP (Số điện thoại cũ) để hoàn tất thay đổi số điện thoại\nbảo mật!", 1);
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Số điện thoại mới trùng với số điện thoại cũ!");
            } else if (error == 4) {
                popup.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            }
        },
        responseResultExchangeMobileActived: function (error) {
            //cc.log("error Result ExchangeMobileActived: " + error);
            if (error == 0) {
                this.pn_otp_sms.setVisible(true);
                this.tf_new_phone_thaydoi_sms.setString("");
                this.tf_new_phone_thaydoi_sms.setPlaceHolder("Số điện thoại mới");
                this.btn_clear_newphone.setVisible(false);
                this.tf_new_phone_thaydoi_sms.setColor(cc.color("#FFFFFF"));
                this.tf_new_phone_thaydoi_sms.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }
        },
        responseResultActiveNewMobile: function (error) {
            //cc.log("error Result ExchangeMobileActived: " + error);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Thay đổi số điện thoại và kích hoạt bảo mật thành công!");
                this.pn_otp_sms.setVisible(false);
                this.save_phone = this.save_new_phone;
                this.funGetInformation();
                this.lb_phone_thaydoi_sms.setString(this.MahoaNoiDung(lobby.userInfo.mobile));
                this.lb_phone_smsplus.setString(this.MahoaNoiDung(lobby.userInfo.mobile));
                this.tf_otp_sms.setString("");
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },

        responseActiveEmail: function (error) {
            //cc.log("error active mail: " + error);
            if (error == 0) {
                sercurity_info.pn_noidung_xacthuc.setVisible(false);
                sercurity_info.pn_thongbao_ttbm.setVisible(true);
                sercurity_info.lb_thongbao_ttbm.setString("Chúng tôi đã gửi link kích hoạt bảo mật đến email bạn\nđăng ký. Bạn vui lòng truy cập email để kích hoạt.");
                this.btn_kichhoat_email.setEnabled(false);
                this.btn_kichhoat_email.setTitleText("Đang kích hoạt bảo mật!");
                this.btn_thaydoi_email.setVisible(false);
                this.isClickActiveMail = true;
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Email đăng ký không tồn tại!");
            }
        },

        responseActivePhone: function (error) {
            //cc.log("error : " + error);
            if (error == 0) {
                sercurity_info.pn_noidung_xacthuc.setVisible(false);
                sercurity_info.pn_nhap_ma_xac_thuc.setVisible(true);
                this.btn_kichhoat_phone.setEnabled(false);
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                this.btn_kichhoat_phone.setEnabled(true);
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
                this.btn_kichhoat_phone.setEnabled(true);
            }
        },
        responseResultActivePhone: function (error) {
            //cc.log("error : " + error);
            if (error == 0) {
                this.pn_nhap_ma_xac_thuc.setVisible(false);
                this.pn_noidung_xacthuc.setVisible(true);
                this.btn_thaydoi_phone.setVisible(false);
                this.btn_kichhoat_phone.setEnabled(false);
                this.btn_kichhoat_phone.setTitleText("Đã kích hoạt bảo mật bằng điện thoại");
                popup.openPanel_Alert_Lobby("Kích hoạt bảo mật thành công!");
                lobby.userInfo.mobileSecurity = true;
                this.showsercurity_info();
                this.tf_nhap_ma_xac_thuc.setString("");
                if (cc.sys.isNative) {
                    if (lobby.recharge == 0)
                        lobby.semi_recharge = 0;
                    else
                        lobby.semi_recharge = 1;

                    if (lobby.cashout == 0)
                        lobby.semi_cashout = 0;
                    else
                        lobby.semi_cashout = 1;
                    if (shopping_info != null) {
                        shopping_info.isfirtgetConfigBilling = false;
                    }
                }
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }

            this.tf_nhap_ma_xac_thuc.setString("");
            this.tf_nhap_ma_xac_thuc.setPlaceHolder(" _ _ _ _ _");
        },

        ShowInformation: function () {
            this.lb_account_bm.setString(lobby.userInfo.username);
            this.lb_nickname_bm.setString(lobby.userInfo.nickname);
            this.lb_account_smsplus.setString(lobby.userInfo.nickname);
            this.lb_account_thaydoi_sms.setString(lobby.userInfo.nickname);
            this.lb_account_ketsat.setString(lobby.userInfo.nickname);
            this.lb_value_kha_dung_ketsat.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
            this.lb_value_dong_bang_ketsat.setString(formatMoney(0, 3, lobby.userInfo.safe));
            this.btn_kichhoat_email.setEnabled(true);
            this.btn_kichhoat_phone.setEnabled(true);

            if (lobby.userInfo.mobile == null || lobby.userInfo.mobile == "") {
                sercurity_info.btn_cap_nhat_bm.setVisible(true);
                sercurity_info.pn_noidung.setVisible(true);
                sercurity_info.pn_noidung_xacthuc.setVisible(false);
                this.pn_nhap_ma_xac_thuc.setVisible(false);
                this.pn_thongbao_ttbm.setVisible(false);

                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_cmtnd.setVisible(true);
                this.tf_email.setVisible(true);
                this.tf_phone_bm.setVisible(true);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(false);
                this.lb_save_email.setVisible(false);
                this.lb_save_phone.setVisible(false);
            } else {
                sercurity_info.btn_cap_nhat_bm.setVisible(false);
                sercurity_info.pn_noidung.setVisible(false);
                sercurity_info.pn_noidung_xacthuc.setVisible(true);
                this.pn_nhap_ma_xac_thuc.setVisible(false);
                this.pn_thongbao_ttbm.setVisible(false);

                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_cmtnd.setVisible(false);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(true);
                this.lb_save_cmt.setString(this.MahoaNoiDung(lobby.userInfo.identification));
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(this.MahoaEmail(lobby.userInfo.email));
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(this.MahoaNoiDung(lobby.userInfo.mobile));

                this.save_cmt = lobby.userInfo.identification;
                this.save_email = lobby.userInfo.email;
                this.save_phone = lobby.userInfo.mobile;
            }

            if (lobby.userInfo.mobileSecurity == 0) {
                this.btn_kichhoat_phone.setTitleText("Kích hoạt bảo mật bằng điện thoại");
                this.btn_thaydoi_phone.setVisible(true);
                this.lb_phone_smsplus.setString("");
                this.lb_phone_thaydoi_sms.setString("");
            } else {
                this.btn_kichhoat_phone.setEnabled(false);
                this.btn_kichhoat_phone.setTitleText("Đã kích hoạt bảo mật bằng điện thoại");
                this.btn_thaydoi_phone.setVisible(false);
                this.lb_phone_smsplus.setString(this.MahoaNoiDung(lobby.userInfo.mobile));
                this.lb_phone_thaydoi_sms.setString(this.MahoaNoiDung(lobby.userInfo.mobile));
            }

            if (lobby.userInfo.emailSecurity == 0) {
                this.btn_kichhoat_email.setTitleText("Kích hoạt bảo mật bằng email");
                if (this.isClickActiveMail == false)
                    this.btn_thaydoi_email.setVisible(true);
                else
                    this.btn_kichhoat_email.setTitleText("Đang kích hoạt bảo mật!");
            } else {
                this.btn_kichhoat_email.setEnabled(false);
                this.btn_kichhoat_email.setTitleText("Đã kích hoạt bảo mật bằng email");
                this.btn_thaydoi_email.setVisible(false);
            }

            if (lobby.userInfo.appSecurity == 0) {
                this.btn_kichhoat_appotp.setTitleText("Kích hoạt xác thực 2 lớp - APP OTP");
                this.btn_thaydoi_appotp.setVisible(true);

            } else {
                this.btn_kichhoat_appotp.setEnabled(false);
                this.btn_kichhoat_appotp.setTitleText("Đã kích hoạt xác thực 2 lớp - APP OTP");
                this.btn_thaydoi_appotp.setVisible(false);
            }

            this.funGotoQuanLyGame();
        },

        funSendOTP: function (value) {
            if (value == false)
                var otp = this.tf_nhap_ma_xac_thuc.getString();
            else
                var otp = this.tf_otp_sms.getString();

            if (otp == "" || otp.length < 5) {
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            } else if (!lobby.checkKyTuSpecial(otp, false)) {
                popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
            } else {
                if (Minigame.isLoginSocket) {
                    var sendOtp = new CmdSendOTP();
                    sendOtp.putSendOTP(otp, 0);
                    Minigame.miniGameClient.send(sendOtp);
                    sendOtp.clean();
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },

        funUpdateUserInfo: function () {
            if (this.ischangeEmail == false && this.ischangePhone == false) {
                var cmt = this.tf_cmtnd.getString();
                var email = this.tf_email.getString();
                var phone = this.tf_phone_bm.getString();

                if (cmt == "" || email == "" || phone == "") {
                    popup.openPanel_Alert_Lobby("Thông tin nhập chưa đầy đủ!");
                } else if (phone.length < 10 || phone.length > 15 || parseInt(phone.substr(0, 1)) != 0) {
                    popup.openPanel_Alert_Lobby("Số điện thoại phải bắt đầu bằng 0 và độ dài từ 10 - 15 số!");
                } else if (cmt.length != 9 && cmt.length != 12) {
                    popup.openPanel_Alert_Lobby("Số CMTND phải có độ dài bằng 9 hoặc 12 số!");
                } else if (!lobby.checkNoiDungEmail(email)) {
                    popup.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
                } else {
                    if (Minigame.isLoginSocket) {
                        var sercurity = new CmdSendUpdateUserInfo();
                        sercurity.putUpdateUserInfo(cmt, email, phone);
                        Minigame.miniGameClient.send(sercurity);
                        sercurity.clean();
                        sercurity_info.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                        Minigame.connectSocket();
                    }
                }
            } else if (this.ischangeEmail == true) {
                var email = this.tf_email.getString();
                if (email == "") {
                    popup.openPanel_Alert_Lobby("Bạn chưa nhập thông tin Email!");
                } else if (email == this.save_email) {
                    popup.openPanel_Alert_Lobby("Thông tin Email không thay đổi!");
                } else {
                    if (Minigame.isLoginSocket) {
                        //cc.log("send update email");
                        var sercurity = new CmdSendUpdateEmail();
                        sercurity.putUpdateEmail(email);
                        Minigame.miniGameClient.send(sercurity);
                        sercurity.clean();
                        sercurity_info.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                        Minigame.connectSocket();
                    }
                }
            } else if (this.ischangePhone == true) {
                var phone = this.tf_phone_bm.getString();
                if (phone == "") {
                    popup.openPanel_Alert_Lobby("Bạn chưa nhập thông tin số điện thoại!");
                } else if (phone == this.save_phone) {
                    popup.openPanel_Alert_Lobby("Thông tin Số điện thoại không thay đổi!");
                } else {
                    if (Minigame.isLoginSocket) {
                        var sercurity = new CmdSendUpdatePhone();
                        sercurity.putUpdatePhone(phone);
                        Minigame.miniGameClient.send(sercurity);
                        sercurity.clean();
                        sercurity_info.btn_cap_nhat_bm.setEnabled(false);
                    } else {
                        popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                        Minigame.connectSocket();
                    }
                }
            }
        },
        responseUpdateUserInfo: function (error) {
            //cc.log("error : " + error);
            sercurity_info.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                this.save_cmt = this.tf_cmtnd.getString();
                this.save_email = this.tf_email.getString();
                this.save_phone = this.tf_phone_bm.getString();

                sercurity_info.btn_cap_nhat_bm.setVisible(false);
                sercurity_info.pn_noidung.setVisible(false);
                sercurity_info.pn_noidung_xacthuc.setVisible(true);
                this.tf_cmtnd.setString("");
                this.tf_cmtnd.setPlaceHolder("CMTND");
                this.tf_cmtnd.setVisible(false);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_cmt.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_cmt.setVisible(true);
                this.lb_save_cmt.setString(this.MahoaNoiDung(this.save_cmt));
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(this.MahoaEmail(this.save_email));
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(this.MahoaNoiDung(this.save_phone));

                lobby.userInfo.identification = this.save_cmt;
                lobby.userInfo.email = this.save_email;
                lobby.userInfo.mobile = this.save_phone;

                this.funAutoSendActivePhone();
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Số CMTND phải có độ dài bằng 9 hoặc 12 số!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
            } else if (error == 4) {
                popup.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 5) {
                popup.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            } else if (error == 6) {
                popup.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            }
        },
        responseUpdateEmail: function (error) {
            //cc.log("error update email : " + error);
            sercurity_info.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                this.save_email = this.tf_email.getString();
                this.ischangeEmail = false;
                sercurity_info.btn_cap_nhat_bm.setVisible(false);
                sercurity_info.pn_noidung.setVisible(false);
                sercurity_info.pn_noidung_xacthuc.setVisible(true);
                this.tf_email.setString("");
                this.tf_email.setPlaceHolder("Email");
                this.tf_email.setVisible(false);
                this.btn_clear_email.setVisible(false);
                this.lb_save_email.setVisible(true);
                this.lb_save_email.setString(this.MahoaEmail(this.save_email));

                lobby.userInfo.email = this.save_email;
                //this.btn_kichhoat_email.setEnabled(true);
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Email không hợp lệ!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Email đã được đăng ký bởi tài khoản khác!");
            }
        },
        responseUpdatePhone: function (error) {
            //cc.log("error : " + error);
            sercurity_info.btn_cap_nhat_bm.setEnabled(true);
            if (error == 0) {
                this.ischangePhone = false;
                this.save_phone = this.tf_phone_bm.getString();
                sercurity_info.btn_cap_nhat_bm.setVisible(false);
                sercurity_info.pn_noidung.setVisible(false);
                sercurity_info.pn_noidung_xacthuc.setVisible(true);
                this.tf_phone_bm.setString("");
                this.tf_phone_bm.setPlaceHolder("Số điện thoại");
                this.tf_phone_bm.setVisible(false);
                this.btn_clear_phone.setVisible(false);
                this.lb_save_phone.setVisible(true);
                this.lb_save_phone.setString(this.MahoaNoiDung(this.save_phone));

                lobby.userInfo.phone = this.save_phone;
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Số điện thoại không hợp lệ!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Số điện thoại đã được đăng ký bởi tài khoản khác!");
            }
        },

        MahoaNoiDung: function (value) {
            //cc.log("value : " + value.length);
            var str = value.substr((value.length - 3), value.length);
            var str1 = value.substr(0, (value.length - 3));
            //cc.log("str : " + str);
            //cc.log("str1 : " + str1.length);
            var mahoa = "";
            for (var i = 0; i < str1.length; i++) {
                mahoa = mahoa + "*";
            }
            var noidung = mahoa + "" + str;
            //cc.log("mahoa " + noidung);
            return noidung;
        },

        MahoaEmail: function (value) {
            var n = value.search("@");
            var noidung = "";
            var mahoa = "";
            var start = value.substr(0, n);
            var end = value.substr(n, value.length);
            if (start.length <= 3) {
                for (var i = 0; i < start.length; i++) {
                    mahoa = mahoa + "*";
                }
                noidung = mahoa + end;
            } else if (start.length > 3 && start.length < 7) {
                var g = start.substr(0, (start.length - 3));
                noidung = g + "***" + end;
            } else {
                var g = start.substr(0, 3);
                var h = start.substr(3, start.length);
                for (var i = 0; i < h.length; i++) {
                    mahoa = mahoa + "*";
                }
                noidung = g + mahoa + end;
            }
            // cc.log("noi dung cuoi: " + noidung);
            return noidung;
        },

        text_field_event: function (sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    if (sender.name == "tf_nhap_ma_xac_thuc" || sender.name == "tf_otp_sms")
                        sender.setColor(cc.color("#FFFFFF"));
                    else
                        sender.setColor(cc.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                }
                    break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    if (sender.name == "tf_nhap_ma_xac_thuc" || sender.name == "tf_otp_sms") {
                        if (sender.getString().length != 0)
                            sender.setColor(cc.color("#FFFFFF"));
                        else
                            sender.setColor(cc.color("#989898"));
                    } else {
                        if (sender.getString().length != 0)
                            sender.setColor(cc.color("#3E3E3E"));
                        else
                            sender.setColor(cc.color("#FFFFFF"));
                    }

                    if (sender.name == "tf_cmtnd") {
                        sender.setPlaceHolder("CMTND");
                    } else if (sender.name == "tf_email") {
                        sender.setPlaceHolder("Email");
                    } else if (sender.name == "tf_phone_bm") {
                        sender.setPlaceHolder("Số điện thoại");
                    } else if (sender.name == "tf_nhap_ma_xac_thuc") {
                        sender.setPlaceHolder(" _ _ _ _ _");
                    } else if (sender.name == "tf_new_phone_thaydoi_sms") {
                        sender.setPlaceHolder("Số điện thoại mới");
                    } else if (sender.name == "tf_otp_sms") {
                        sender.setPlaceHolder(" _ _ _ _ _");
                    } else if (sender.name == "tf_vin_toi_thieu") {
                        sender.setPlaceHolder("Số Vin tối thiểu");
                    } else if (sender.name == "tf_ma_otp_bmdn" || sender.name == "tf_otp_config_game" || sender.name == "tf_ma_ketsat") {
                        sender.setPlaceHolder("Mã OTP");
                    } else if (sender.name == "tf_vin_ketsat") {
                        sender.setPlaceHolder("Nhập số Vin cần đóng băng / mở đóng băng");
                    }

                    if (sender.getString() == 0) sender.setString("");
                }
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    if (sender.name == "tf_cmtnd" || sender.name == "tf_phone_bm" || sender.name == "tf_new_phone_thaydoi_sms" || sender.name == "tf_vin_toi_thieu"
                        || sender.name == "tf_vin_ketsat") {
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        if (!isNumeric(str)) {
                            str = str.substr(0, str.length - 1);
                        }
                        if (!isNumeric(str)) {
                            str = "0";
                        }
                        if (sender.name == "tf_vin_toi_thieu" || sender.name == "tf_vin_ketsat") {
                            //cc.log("erro");
                            sender.setString(formatMoney(0, 3, Number(str)));
                        } else {
                            sender.setString(str);
                        }
                    }
                    if (sender.name == "tf_cmtnd") {
                        this.btn_clear_cmt.setVisible(true);
                    } else if (sender.name == "tf_email") {
                        this.btn_clear_email.setVisible(true);
                    } else if (sender.name == "tf_phone_bm") {
                        this.btn_clear_phone.setVisible(true);
                    } else if (sender.name == "tf_new_phone_thaydoi_sms") {
                        this.btn_clear_newphone.setVisible(true);
                    }
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    if (str.length == 0) {
                        if (sender.name == "tf_cmtnd")
                            this.btn_clear_cmt.setVisible(false);
                        else if (sender.name == "tf_email")
                            this.btn_clear_email.setVisible(false);
                        else if (sender.name == "tf_phone_bm")
                            this.btn_clear_phone.setVisible(false);
                        else if (sender.name == "tf_new_phone_thaydoi_sms")
                            this.btn_clear_newphone.setVisible(false);
                    }
                    if (sender.name == "tf_vin_toi_thieu" || sender.name == "tf_vin_ketsat") {
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        sender.setString(formatMoney(0, 3, Number(str)));
                    }
                }
                    break;
            }

        },

        resetThongTin_Baomat: function () {
            sercurity_info.pn_noidung.setVisible(true);
            sercurity_info.pn_noidung_xacthuc.setVisible(false);
            sercurity_info.pn_nhap_ma_xac_thuc.setVisible(false);
            sercurity_info.pn_nhap_ma_xac_thuc_appotp.setVisible(false);
            sercurity_info.pn_thongbao_ttbm.setVisible(false);
            sercurity_info.btn_cap_nhat_bm.setVisible(true);
        },

        resetSP_Button_Baomat: function () {
            sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
            sercurity_info.sp_quanlygame.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
            sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang_s.png");
            sercurity_info.sp_quanlygame_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang_s.png");
            sercurity_info.sp_sms_plus.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            sercurity_info.sp_bao_mat_dang_nhap.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            sercurity_info.sp_ket_an_toan.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            sercurity_info.pn_thong_tin_bao_mat.setVisible(false);
            sercurity_info.pn_sms_plus.setVisible(false);
            sercurity_info.pn_sms_plus_thay_doi.setVisible(false);
            sercurity_info.pn_otp_sms.setVisible(false);
            sercurity_info.pn_bao_mat_dang_nhap.setVisible(false);
            sercurity_info.pn_ket_an_toan.setVisible(false);
            sercurity_info.pn_quan_ly_game.setVisible(false);
        },
        DongBangKetSat: function (sender, eventType) {
            if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                sercurity_info.ck_mo_dong_bang.setSelected(false);
                sercurity_info.type_safe = 1;
                sercurity_info.pn_otp_ket_sat.setVisible(false);
            } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                sercurity_info.ck_mo_dong_bang.setSelected(true);
                sercurity_info.type_safe = 0;
                sercurity_info.pn_otp_ket_sat.setVisible(true);
            }
        },
        MoDongBangKetSat: function (sender, eventType) {
            if (eventType == ccui.CheckBox.EVENT_SELECTED) {
                sercurity_info.ck_dong_bang.setSelected(false);
                sercurity_info.type_safe = 0;
                sercurity_info.pn_otp_ket_sat.setVisible(true);
            } else if (eventType == ccui.CheckBox.EVENT_UNSELECTED) {
                sercurity_info.ck_dong_bang.setSelected(true);
                sercurity_info.type_safe = 1;
                sercurity_info.pn_otp_ket_sat.setVisible(false);
            }
        },
    }
);
// panel bao mat
code_sercurity_info.BTN_TTBM_BIG = 121;
code_sercurity_info.BTN_TTBM_SMALL = 122;
code_sercurity_info.BTN_QUANLYGAME_BIG = 123;
code_sercurity_info.BTN_QUANLYGAME_SMALL = 124;
code_sercurity_info.BTN_CLOSE_BAO_MAT = 125;
code_sercurity_info.BTN_CAPNHAT_TTBM = 126;
code_sercurity_info.BTN_SMS_PLUS = 127;
code_sercurity_info.BTN_BM_DANG_NHAP = 128;
code_sercurity_info.BTN_KET_AN_TOAN = 129;
code_sercurity_info.BTN_CLOSE_BAO_MAT = 130;
code_sercurity_info.BTN_SAVE_QLGAME = 131;
code_sercurity_info.BTN_SMS_APP_QLGAME = 133;
code_sercurity_info.BTN_CLOSE_SMS_APP = 134;
code_sercurity_info.BTN_BM_SMS = 135;
code_sercurity_info.BTN_BM_APP = 136;
code_sercurity_info.BTN_KICHHOAT_EMAIL = 137;
code_sercurity_info.BTN_KICHHOAT_PHONE = 138;
code_sercurity_info.BTN_THAYDOI_EMAIL = 139;
code_sercurity_info.BTN_THAYDOI_PHONE = 140;
code_sercurity_info.BTN_QUAYLAI_TTBM = 141;
code_sercurity_info.BTN_HOANTAT_TTBM = 142;
code_sercurity_info.BTN_QUAYLAI_NOTICE_TTBM = 143;
//bao mat dang nhap
code_sercurity_info.BTN_THAYDOI_SMSPLUS = 144;
code_sercurity_info.BTN_QUAYLAI_THAYDOI_SMS = 146;
code_sercurity_info.BTN_TIEPTUC_THAYDOI_SMS = 147;

code_sercurity_info.BTN_SMS_APP_BMDN = 150;
code_sercurity_info.BTN_LUU_LAI_BMDN = 151;
code_sercurity_info.BTN_HUY_DANGKY_BMDN = 152;
code_sercurity_info.BTN_DANKY_BMDN = 154;
code_sercurity_info.BTN_QUAYLAI_BMDN = 155;
//ket sat
code_sercurity_info.BTN_SMS_APP_KETSAT = 156;
code_sercurity_info.BTN_TIEPTUC_KETSAT = 158;

code_sercurity_info.BTN_CLEAR_CMT = 1;
code_sercurity_info.BTN_CLEAR_EMAIL = 2;
code_sercurity_info.BTN_CLEAR_PHONE = 3;

code_sercurity_info.BTN_CLEAR_NEWPHONE = 4;

code_sercurity_info.BTN_CLOSE_SMS_OTP = 5;
code_sercurity_info.BTN_HOANTAT_SMS_OTP = 6;
code_sercurity_info.BTN_LINK_QLGAME = 7;
code_sercurity_info.BTN_APPOTP = 160;
code_sercurity_info.BTN_HUONGDAN_TTBM_APPOTP = 161;
code_sercurity_info.BTN_HOANTAT_TTBM_APPOTP = 162;


opensercurity_info = function () {
    if (sercurity_info != null) {
        sercurity_info.removeFromParent(true);
        sercurity_info = null;
    }
    sercurity_info = new code_sercurity_info();
    sercurity_infoX = sercurity_info.getPosition().x;
    sercurity_infoY = sercurity_info.getPosition().y;
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(sercurity_info, BaseScene.INDEX_INFO_GUI, 0);
    sercurity_info.funGetInformation();
};
closesercurity_info = function () {
    if (sercurity_info === null) {
        return;
    } else {
        sercurity_info.removeFromParent(true);
        sercurity_info = null;
    }

};
