var g_resources_menu = [
    res_Lobby + "/IconGame/tlmn.png",
    res_Lobby + "/IconGame/samloc.png",
    res_Lobby + "/IconGame/lieng.png",
    res_Lobby + "/IconGame/3cay.png",
    res_Lobby + "/IconGame/poker.png",
    res_Lobby + "/IconGame/xizach.png",
    res_Lobby + "/IconGame/xocdia.png",
    res_Lobby + "/IconGame/maubinh.png",
    res_Lobby + "/IconGame/cocaro.png",
    res_Lobby + "/IconGame/tlmnsolo.png",
    res_Lobby + "/IconGame/maubinhtinhat.png",
    res_Lobby + "/IconGame/samsolo.png",
    res_Lobby + "/IconGame/baicao.png",
    res_Lobby + "/IconGame/cotuong.png",
    res_Lobby + "/IconGame/coup.png"

];
var g_resources_menu_facebook = [
    res_Lobby + "/IconGame/tlmn.png",
    res_Lobby + "/IconGame/samloc.png",
    res_Lobby + "/IconGame/lieng.png",
    res_Lobby + "/IconGame/3cay.png",
    res_Lobby + "/IconGame/poker.png",
    res_Lobby + "/IconGame/baicao.png",
    res_Lobby + "/IconGame/maubinh.png",
    res_Lobby + "/IconGame/cocaro.png",
    res_Lobby + "/IconGame/tlmnsolo.png",
    res_Lobby + "/IconGame/maubinhtinhat.png",
    res_Lobby + "/IconGame/samsolo.png"
];

var gameListSlot = [{
    name: "khobau",
    isComingSoon: false,
    imageBackGround: "res/MenuSlots/icon/kho_bau.png",
    nameSocket: "kb",
    manifestPath: "res/SlotKhoBau/project.manifest",
    toragePath: "update/res/SlotKhoBau"

    //openGame:openSlotKhoBau(),

},
    {
        name: "nudiepvien",
        isComingSoon: false,
        imageBackGround: "res/MenuSlots/icon/nu_diep_vien.png",
        nameSocket: "ndv",
        manifestPath: "res/NuDiepVien/project.manifest",
        toragePath: "update/res/NuDiepVien"
        //openGame:openNuDiepVien(),
    },
    {
        name: "sieuanhhung",
        isComingSoon: false,
        imageBackGround: "res/MenuSlots/icon/sieu_anh_hung.png",
        nameSocket: "sah",
        manifestPath: "res/Avenger/project.manifest",
        toragePath: "update/res/Avenger"
        //openGame:openAvenger()
    },
    {
        name: "vuongquocvin",
        isComingSoon: false,
        imageBackGround: "res/MenuSlots/icon/vuong_quoc_vin.png",
        nameSocket: "vqv",
        openGame: null,
        manifestPath: "res/VuongQuocVin/project.manifest",
        toragePath: "update/res/VuongQuocVin"
    }

];
var mapMenuSlot = {
    khoBau: 0,
    nuDiepVien: 1,
    sieuAnhHung: 2,
    vuongQuocVin: 3
}

var GameList = function () {
};

GameList.SamSoLo = 0;
GameList.SamThuong = 1;
GameList.BaCay = 2;
GameList.MauBinh = 3;
GameList.TienLenSoLo = 4;
GameList.TienLenThuong = 5;
GameList.XiZach = 15;
GameList.SlotKhoBau = 7;
GameList.MauBinhTinhAt = 8;
GameList.NuDiepVien = 9;
GameList.Poker = 10;
GameList.Lieng = 11;
GameList.Avenger = 12;
GameList.CoCaro = 14;
GameList.BaiCao = 6;
GameList.CoTuong = 13;
GameList.CoUp = 16;
GameList.XocDia = 17;

var mapTagToGameType = {
    "0": GameList.TienLenThuong,
    "1": GameList.SamThuong,
    "2": GameList.Lieng,
    "3": GameList.BaCay,
    "4": GameList.Poker,
    "5": GameList.XiZach,
    "6": GameList.XocDia,
    "7": GameList.MauBinh,
    "8": GameList.CoCaro,
    "9": GameList.TienLenSoLo,
    "10": GameList.MauBinhTinhAt,
    "11": GameList.SamSoLo,
    "12": GameList.BaiCao,
    "13": GameList.CoTuong,
    "14": GameList.CoUp
};
var mapTagToGameType_fb = {
    "0": GameList.TienLenThuong,
    "1": GameList.SamThuong,
    "2": GameList.Lieng,
    "3": GameList.BaCay,
    "4": GameList.Poker,
    "5": GameList.BaiCao,
    "6": GameList.MauBinh,
    "7": GameList.CoCaro,
    "8": GameList.TienLenSoLo,
    "9": GameList.MauBinhTinhAt,
    "10": GameList.SamSoLo
};

var lobby = null;

var LobbyLayer = BaseLayer.extend({
    ctor: function () {
        this.isConnectSocketSlots = false;
        this.socketSlot = null;
        this.arrBtnMenu = [];
        this.isShowSlots = false;
        this.appConfig = null;
        this.userName = null;
        this.passWord = null;
        this.passWordMD5 = null;
        this.pAccount = null;
        this.lv_menu = null;
        this.pTabQuanLyLobby = null;
        this.pLogin = null;
        this.pDangKy = null;
        this.userInfo = null;
        this.pRunEven = null;
        this.pDataRun = null;
        this.percentVP = null;
        this.s = null;
        this.btn_fanpage = null;
        this.btn_telegram = null;

        //Tab Đăng Nhập
        this.sp_logo = null;
        this.btn_facebook_tab = null;
        this.btn_google_tab = null;
        this.tf_user_name_tab = null;
        this.tf_pass_tab = null;
        this.btn_dang_nhap_tab = null;
        this.btn_dang_ky_tab = null;
        this.btn_quen_mk = null;

        this.isFBGG = false;
        this.accessTokenFBGG = null;

        //Tab Đăng ký
        this.tf_user_name_dk = null;
        this.tf_mat_khau_dk = null;
        this.tf_nhap_lai_mk_dk = null;
        this.tf_ma_xac_nhan_dk = null;
        this.sp_ma_xac_nhan = null;
        this.btn_refresh = null;
        this.cb_dong_y = null;
        this.btn_dang_ky = null;
        this.btn_dang_ky_facebook = null;
        this.btn_dang_ky_google = null;
        this.IsRegister = false;

        //tab Tao ten nhan vat
        this.pTaoNhanVat = null;
        this.tf_tao_ten_nhan_vat = null;
        this.btn_tao_ten_nhan_vat = null;
        this.sp_title_creatNick = null;
        this.bg_tf_nickname = null;
        this.btn_clear_nick = null;

        this.btn_chat = null;
        // panel dang nhap voi Otp
        this.pn_login_otp = null;
        this.bg_tab_otp = null;
        this.bg_title_otp = null;
        this.btn_close_pn_otp = null;
        this.tf_login_otp = null;
        this.txt_sms_otp_lobby = null;
        this.btn_select_otp_lobby = null;
        this.btn_dang_nhap_otp = null;
        this.pn_sms_app_lobby = null;
        this.btn_close_pn_select_otp = null;
        this.btn_sl_sms = null;
        this.btn_sl_app = null;
        this.sms_or_app_otp = null;
        this.idcaptcha = null;
        this.lb_hotline = null;
        this.btn_dieukhoan_sudung = null;
        this.isDieuKhoan_lobby = false;
        this.isClickDangKy = false;
        //this.pn_other = null;
        this.savePassword = null;
        // forget pass
        this.pn_forget_pass = null;
        this.btn_close_forget_pass = null;
        this.bg_title_forget = null;
        this.pn_otp_forget = null;
        this.pn_otp_information = null;
        this.pn_otp_thongbao = null;
        this.txt_otp_forget = null;
        this.btn_select_otp_forget = null;
        this.btn_send_otp_forget = null;
        this.txt_dauso_forget = null;
        this.tf_captcha_forget = null;
        this.sp_show_captcha_for = null;
        this.btn_send_information = null;
        this.txt_tongdai = null;
        this.tx_tongdai_info = null;
        this.content_bm = null;
        this.content_no_bm = null;
        this.pn_chose_otp_for = null;
        this.btn_close_chose_otp_for = null;
        this.btn_sl_sms_for = null;
        this.btn_sl_app_for = null;
        this.tf_username_for = null;
        this.btn_refresh_forget = null;
        this.tf_input_otp_for = null;
        this.save_username = "";
        this.save_password = "";
        this.txt_dauso_login_otp = null;
        this.type_otp_login = 0;
        this.pn_email_forget = null;
        this.tf_input_email_for = null;
        this.btn_send_email_forget = null;
        this.btn_clear_email_forget = null;
        this.btn_send_chose = null;
        this.btn_back_forget_pass = null;
        this.pn_chose_email_otp = null;
        this.email_sms_chose = null;
        this.txt_email_sms_for = null;
        this.btn_chose_email_sms_for = null;
        this.btn_close_chose_email_sms = null;
        this.btn_sl_phone = null;
        this.btn_sl_email = null;
        this.type_email_phone = 0;

        // pn_ baotri
        this.pn_baotriHeThong = null;
        this.tx_cham1 = null;
        this.tx_cham2 = null;
        this.tx_cham3 = null;
        this.tx_chamthan = null;


        // config chung
        this.status_game = 0;
        this.web = "http://vinplay.vin/";
        this.phone = "";
        this.sms_otp = "";
        this.linkFanpage = "https://www.facebook.com/vinplay.vin.fanpage";
        this.linktelegram = "https://t.me/vinplay_bot/";

        // config game
        this.recharge = null;
        this.cashout = null;
        this.semi_recharge = null;
        this.semi_cashout = null;
        this.call_common = null;
        // billing
        this.is_recharge_card_game = null;
        this.is_recharge_bank = null;
        this.is_recharge_iap = null;
        this.is_recharge_xu = null;
        this.is_Exchange_money = null;
        this.is_buy_card_game = null;
        this.is_recharge_mobile_phone = null;
        this.radio_xu = null;
        this.radio_vin = null;
        this.radio_exchange_card = null;
        this.radio_tranfer = null;
        this.radio_bank = null;
        this.home_network = null;
        this.recharge_bank = null;
        this.radio_recharge_out_mobile = null;
        this.buy_card = null;
        this.buy_card_game = null;
        this.recharge_mobile = null;
        this.transfer_min = null;
        this.card_Vina = null;
        this.card_Mobi = null;
        this.card_Viettel = null;
        this.card_Zing = null;
        this.card_Gate = null;
        this.card_Vcoin = null;
        this.card_VnMobi = null;
        this.card_Bee = null;
        this.num_recharge_fail = null;
        this.num_cash_out = null;
        this.cashout_limit_user = null;
        this.configHour = null;
        this.radio_vin_bank = null;
        this.is_vin_plus = null;
        this.is_sms_plus = null; // 9029
        this.is_sms = null; // 8x98
        this.sms_plus_telco = null;
        this.sms_telco = null;
        this.sms_plus_amount = null;
        this.sms_amount = null;
        this.ratio_nap_sms = null;
        this.is_vin_card = null;
        this.ratio_vin_card = null;
        this.is_nap_mega_card = null;
        this.ratio_nap_mega_card = null;

        this.arrayBanner = null;
        // panel chat event
        this.pn_chat_event = null;
        this.pn_chat = null;
        this.pn_event = null;
        this.btn_event = null;
        this.isfirstLoadChat = false;
        this.btn_send_chat = null;
        // fix result
        this.runEvent = {
            "transactions": [{
                "gametype": "taixiu",
                "nickName": "mintkute",
                "moneyVin": "10000000"
            }, {"gametype": "taixiu", "nickName": "CanhPv", "moneyVin": "10000000"}, {
                "gametype": "taixiu",
                "nickName": "Vinh_ku_teo",
                "moneyVin": "500000"
            }]
        };
        this.listCheck = "~,`,!,@,#,$,%,^,&,*,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ," +
            "ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ, ";

        this.listCheckVN = "~,`,!,(,),-,+,=,},{,[,],',|,\,/,<,>,?,ê,ư,ơ,ô,â,ă,đ,á,à,ả,ạ,ã,ắ,ằ,ẳ,ặ,ẵ,ấ,ầ,ẩ,ậ,ẫ,é,è,ẻ,ẹ,ẽ,ế,ề,ể,ệ,ễ,ú,ù,ủ,ụ,ũ,ứ,ừ,ử,ự,ữ,í,ì,ỉ,ị,ĩ,ó,ò,ỏ,ọ,õ,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ở,ợ,ỡ,ý,ỳ,ỷ,ỵ,ỹ ";

        this.listNickNameBegin = "Gamemaster,GM,Bot,Mod,Bocongan,HCM,hochiminh,DCS,Dangcongsan,dmcs,Nhacai,Hethong,Mas_ter,Game_master,Daily,Dai_ly,Fuck,matlon,12lieugiai,19006896";
        this.listNickNameInclude = "Admin,Master,Vinplay,19006896,daily,rik,zdo,tip";

        this.islogin = false;
        this.pn_suppot = null;
        this.btn_dayly = null;
        this.btn_vipcode = null;
        this.btn_hotro = null;
        this.btn_quydinh = null;
        this.btn_news = null;
        this.sp_banner = null;
        this.btn_click_event = null;

        this.sttBanner = 1;
        this.AlertLogin = false;
        this.btn_dangnhap_ngay = null;

        this.btn_ios = null;
        this.btn_android = null;
        this.btn_windowfone = null;
        this.linkBanner1 = "https://doithe.org";
        this.linkBanner2 = "https://doithe.org";
        this.linkBanner = this.linkBanner1;

        this.shadow = null;
        this.moveIn = "";
        this.moveInListView = false;

        this.pn_tooltip = null;
        this.bg_tooltip = null;
        this.lb_content_tooltip = null;

        this.array_Pot = [];
        this.array_txt_Pot = [];

        this.tf_chat_lobby = null;
        this.lv_content_chat = null;
        this.numberItemInListView = 0;
        this.isOpenChat = false;
        this.listBanChat = "đệt,an_cac,ancac,ăn cặc,ăncặc,ba_may,bà mày,bà mày,bàmay,bamày,bàmày,bac_ho,bamay,ban_dam,ban_hoa,bandam,bo_may,bomay,bon_cho,bon_khon_nan,boncho,bonkhonnan," +
            "bucac,buoi,buồi,buom,bướm,cạc,cặc,cai_buoi,cai_chim,cai_cu,cai_lon,caibuoi,caichim,caicu,cailon,cave,chim,chim_to,chimto,chó,chochet,concho,concu,concucac,concutotuong" +
            ",condi,condiem,conghoa,congsan,conlon,conpho,cụ,cucac,cuccac,cuccut,cuho,cumay,cuongdam,cuonghiep,cứt,cuto,đái,danchu,dangcongsan,dcm,đcm,đĩ,điếm,dis_me,disme" +
            ",dit,dịt,đít,địt,ditba,ditbo,ditme,ditme,ditmemay,ditong,dm,đm,doconcho,dokhon,drug,dụ,đụ,dục,duma,dume,fuck,Gaibanhoa,Gaidiem,Hamhiep,hanh_kinh,Hanhkinh,Hiếp,Hiepdam " +
            ",Hochiminh,Iả,Ỉa,Khốn,khon_nan,Khonnan,Khungbo,Kiep,Kiép,kiếp,lamtinh,liem_cac,liemcac,lìn,lon,lòn,lồn,lợn,longlon,lonto,thủ dâm,Thủ Dâm,buom,buôi,bướm,dis" +
            ".,disme,dit,di't,Dịt,dụ,du ma,du má,Đis,Địs,Đis Mẹ,Đit,Đit mẹ,đklm,Đkm,ĐKM,Đm,đu,Đụ,Đụ mẹ,cong.san,Hochi.minh,mau.lon,me.kiep,me.may,mua.dam,mut.cac,dc.m,DC.M," +
            "đc.m,ĐC.M,Đc.M,Đc.m,ĐI.T,d.m,D.m,D.M,đ.m,Đ.m,Đ.M,dm.m,đm.m,Dm.m,Đm.m,DM.M,ĐM.M,Đ.cm,Đc.M,đC.M,đcm.m,dk.m,đk.m,d.cm,đc.m,dk.mm,đk.mm,fu.ck,F.uck,FU.CK,ĐK.M,Đ.m,phan dong," +
            " phản động,phan_dong,Hồ Chí Minh,Ho Chi Minh,admin,gmmaster,ba mày,lol,cai_buoi,caibuoi,concutotuong,condiem,dangcongsan,ditmemay,doconcho,Hochiminh," +
            " Đụ me,mau.lon,me.kiep,dm.m,đm.m,đcm.m,dk.mm,đk.mm,vinplay,phatloc,phát lộc,rik,zdo,23zdo,địt con mẹ,lồn,tip,club,vuachoibai,cứt,địt";

        this.isBlockChat = false;
        this.minVipPoint = null;
        this.timeClient = null;
        this.timeExchange = null;
        this.isDaiLy = false;
        this.isBanVinhvien = false;
        this.isNewUser = false;
        this.sku_iap = "";
        this.isLoginAccessToken = false;
        this.platform = "";

        this.urlhref = "";
        this.facebook_canvas = false;
        this.payment_fb = null;

        this.open_payment_ios = false; /// false la dong // true la mo
        this.networkCode = 0;
        this.lv_menu_slot = null;
        this.btn_chuyen_menu = null;
        this.isMenuSlots = false;
        this.isClickMenuSlot = false;
        this.audioMenuSlots = null;
        this.isSubscribeMenuSlots = false;

        this._super("LobbyScene");

        return true;
    },
    customizeGUI: function () {
        cc.spriteFrameCache.addSpriteFrames("res/Lobby/PlistLobby.plist", "res/Lobby/PlistLobby.png");
        this.addSprite(this, "shadow", cc.p(640, 360), res_Lobby + "/Shadow.jpg");
        //this.addLayout(this,"pDangKy",cc.p(640,360),res_Lobby + "/DangKy/bg_DangKy.jpg",cc.size(1280,720),true);//tab Dang Ky
        this.addLayout(this, "pLogin", cc.p(640, 678), null, cc.size(1280, 78), true); //tab Dang Nhap
        this.addLayout(this, "pAccount", cc.p(640, 360), null, cc.size(1280, 720), false); // tab thong tin user, tab chay TV
        this.addLayout(this, "pTaoNhanVat", cc.p(640, 360), res_Lobby + "/bg_supersmaill_mail.png", cc.size(1280, 720), true);
        this.addLayout(this, "pDangKy", cc.p(640, 360), res_Lobby + "/DangKy/bg_DangKy.jpg", cc.size(1280, 720), true); //tab Dang Ky
        this.addLayout(this, "pn_login_otp", cc.p(640, 360), res_Lobby + "/bground_tab.png", cc.size(1280, 720), true);
        this.addLayout(this, "pn_forget_pass", cc.p(640, 360), res_Lobby + "/btnCreatNickname.png", cc.size(1280, 720), true);
        this.addLayout(this, "pn_baotriHeThong", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addLayout(this, "pn_suppot", cc.p(640, 360), null, cc.size(1280, 720), false);
        //this.addImage(this, "dsfmsgm",cc.p(640,360),res_Lobby + "/logo2.png",cc.size(1280,720));

        //this.addTextBM(this,"testTextBM",cc.p(640,360),"res/Minigame/ImageChung/bg_giaithuong.png","a a  a a a a a a a a", "res/Font/Demo_font_V5_bs-export.fnt");
        //this.addImage(this,"testImage",cc.p(640,360),res_Lobby +"/btnCreatNickname.png",cc.size(500,400));

        this.initPDangKy();
        this.initPLogin();
        this.initPContent();
        this.initPTaoNhanVat();
        this.initPLoginOTP();
        this.initPForgetPass();
        this.initPBaoTri();
        this.initPSubpot();

        this.initGameInfo();


    },
    initGameInfo: function () {
        var url = urlGetConfig();
        openPopUp();
        if (cc.sys.isNative) {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.platform = "ad";
            } else if (cc.sys.os == cc.sys.OS_IOS) {
                this.platform = "ios";
            } else if (cc.sys.os == cc.sys.OS_WINRT) {
                this.platform = "wp";
            }
        } else {
            this.platform = "web";
            if (this.facebook_canvas == true)
                this.platform = "fb";
        }
        if (cc.sys.isNative) {

            this.btn_dayly.setVisible(false);
            this.btn_hotro.setVisible(false);
            this.btn_quydinh.setVisible(false);
            this.btn_ios.setVisible(false);
            this.btn_android.setVisible(false);
            this.btn_windowfone.setVisible(false);
            this.btn_vipcode.x = 1347.63;
            this.btn_vipcode.y = -366.16;
            this.lb_hotline.x = 998.56;
            this.btn_fanpage.x = 1155.53;
            this.btn_telegram.x = 1040.53;

            if (cc.sys.os == cc.sys.OS_ANDROID) {
                this.btn_vipcode.setVisible(false);
            }
        } else {
            this.initAuth();

        }
        sendRequest(url, null, false, lobby.callBackGetConfig, lobby.callBackError);
        this.addJackpotGame();

        if (!cc.sys.isNative) {
            //openadvertise();
        }

        if (cc.sys.isNative) {
            this.pDangKy.setBackGroundImage(res_Lobby + "/DangKy/bg_DangKy.png");
            if (cc.sys.os == cc.sys.OS_IOS) {
                try {
                    if (ConnectNative.versionCode() == "1.3") {
                        if (parseInt(ConnectNative.countryCode()) == 452) {
                            this.networkCode = parseInt(ConnectNative.networkCode());
                        }
                        this.open_payment_ios = false;
                    } else {
                        this.open_payment_ios = true;
                    }
                } catch (err) {
                    this.open_payment_ios = true;
                }
            } /// chua co android
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (parseInt(ConnectNative.versionCode()) >= 12)
                    this.open_payment_ios = false;
                else
                    this.open_payment_ios = true;
            }
        }
        if (cc.sys.os == cc.sys.OS_IOS) {
            if (this.open_payment_ios == false) {
                this.btn_vipcode.setVisible(false);
                this.btn_fanpage.setVisible(false);
                this.lb_hotline.setString("");
            }
        }

        if (cc.sys.isNative) {
            var user = userGameData.getItem("current_username");
            if (user != null && user != undefined && user != "undefined" && user != "null" && user != "") {
                this.tf_user_name_tab.setString(user);
            }
        }
    },
    initPDangKy: function () {
        this.addEditBox(this.pDangKy, "tf_user_name_dk", cc.p(715, 487), "", "Tên đăng nhập", RobotoRegular.fontName, 20, cc.size(250, 46), null, cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_user_name_dk.setFontColor(cc.color.BLACK);
        this.addEditBox(this.pDangKy, "tf_mat_khau_dk", cc.p(715, 429), "", "Mật khẩu", RobotoRegular.fontName, 20, cc.size(250, 46), null, cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_mat_khau_dk.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.tf_mat_khau_dk.setFontColor(cc.color.BLACK);
        this.addEditBox(this.pDangKy, "tf_nhap_lai_mk_dk", cc.p(715, 369), "", "Nhập lại mật khẩu", RobotoRegular.fontName, 20, cc.size(250, 46), null, cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_nhap_lai_mk_dk.setFontColor(cc.color.BLACK);
        this.tf_nhap_lai_mk_dk.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.addEditBox(this.pDangKy, "tf_ma_xac_nhan_dk", cc.p(614, 310), "", "Mã xác nhận", RobotoRegular.fontName, 20, cc.size(127, 46), null, cc.TEXT_ALIGNMENT_CENTER, 3);
        this.tf_ma_xac_nhan_dk.setFontColor(cc.color.BLACK);
        this.addSprite(this.pDangKy, "sp_ma_xac_nhan", cc.p(738, 310), res_Lobby + "/Default/Sprite.png");
        // cc.log("create Btn 1");
        this.addButton(this.pDangKy, "btn_refresh", LobbyLayer.BTN_REFRSH, cc.p(823, 310), true, res_Lobby + "/btnRefresh.png", res_Lobby + "/btnRefresh.png");
        // cc.log("create Btn 2");
        this.btn_refresh.setScale(0.8);
        this.addCheckBox(this.pDangKy, "cb_dong_y", cc.p(582, 268), true, "res/Lobby/bg_checkbox.png", "res/Lobby/bg_checkbox.png", "res/Lobby/nodecheckbox.png", "res/Lobby/bg_checkbox.png", "res/Lobby/nodecheckbox.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pDangKy, "btn_dieukhoan_sudung", LobbyLayer.BTN_DIEUKHOAN_SD, cc.p(751, 268), true, res_Lobby + "/btnline.png", res_Lobby + "/btnline.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pDangKy, "btn_dang_ky", LobbyLayer.BTN_DANG_KY, cc.p(696, 217), true, res_Lobby + "/DangKy/btnDangKy.png", res_Lobby + "/DangKy/btnDangKy_s.png");
        //this.addButton(this.pDangKy, "btn_dang_ky_facebook", LobbyLayer.BTN_DANG_KY_FACEBOOK, cc.p(660, 109), true, res_Lobby + "/btnFacebook.png", res_Lobby + "/btnFacebook.png", ccui.Widget.PLIST_TEXTURE);
        //this.addButton(this.pDangKy, "btn_dang_ky_google", LobbyLayer.BTN_DANG_KY_GOOGLE, cc.p(724, 109), true, res_Lobby + "/btnGoogle.png", res_Lobby + "/btnGoogle.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pDangKy, "btn_dangnhap_ngay", LobbyLayer.BTN_DANGNHAP_NGAY, cc.p(770, 52), true, res_Lobby + "/btnline.png", res_Lobby + "/btnline.png", ccui.Widget.PLIST_TEXTURE);
        this.pDangKy.setVisible(false);
    },
    initPLogin: function () {
        this.addSprite(this.pLogin, "sp_logo", cc.p(155, 39), res_Lobby + "/logo2.png", ccui.Widget.PLIST_TEXTURE);
        //this.addText(this.pLogin, "lb_dang_nhap_voi", cc.p(224, 39), "Đăng nhập với", RobotoRegular.fontName, 22);
        // this.addButton(this.pLogin, "btn_facebook_tab", LobbyLayer.BTN_FACEBOOOK_TAB, cc.p(338, 39), true, res_Lobby + "/btnFacebook.png", res_Lobby + "/btnFacebook.png", ccui.Widget.PLIST_TEXTURE);
        // this.addButton(this.pLogin, "btn_google_tab", LobbyLayer.BTN_GOOGLE_TAB, cc.p(398, 39), true, res_Lobby + "/btnGoogle.png", res_Lobby + "/btnGoogle.png", ccui.Widget.PLIST_TEXTURE);
        this.addEditBox(this.pLogin, "tf_user_name_tab", cc.p(400, 39), "", "Tên Đăng nhập", RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
        this.addEditBox(this.pLogin, "tf_pass_tab", cc.p(600, 39), "", "Mật khẩu", RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_pass_tab.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

        this.addButton(this.pLogin, "btn_dang_nhap_tab", LobbyLayer.BTN_DANG_NHAP_TAB, cc.p(775, 39), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pLogin, "btn_dang_ky_tab", LobbyLayer.BTN_DANG_KY_TAB, cc.p(937, 39), false, res_Lobby + "/btnDangKy.png", res_Lobby + "/btnDangKy_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pLogin, "btn_quen_mk", LobbyLayer.BTN_QUEN_MK, cc.p(1090, 39), false, res_Lobby + "/btnForgetPass.png", res_Lobby + "/btnForgetPass.png", ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pLogin, "sp_vach", cc.p(640, -4), res_Lobby + "/vachngang.png");

    },
    initPContent: function () {
        this.lv_menu_slot = new ccui.ListView();
        this.lv_menu_slot.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.lv_menu_slot.setTouchEnabled(true);
        this.lv_menu_slot.setBounceEnabled(true);
        this.lv_menu_slot.setClippingEnabled(true);
        this.lv_menu_slot.setContentSize(cc.size(960, 440));
        this.lv_menu_slot.setPosition(cc.p(776, 342));
        this.lv_menu_slot.setAnchorPoint(cc.p(0.5, 0.5));
        this.pAccount.addChild(this.lv_menu_slot);
        this.audioMenuSlots = new MenuSlotsAudio(true);
        for (var i = 0; i < gameListSlot.length; i++) {
            var lblLayer = new ccui.Layout();
            lblLayer.height = this.lv_menu_slot.height;
            lblLayer.width = 240;

            this[gameListSlot[i].name] = new VPItemSlots(gameListSlot[i].imageBackGround, gameListSlot[i].isComingSoon, cc.size(215, 403));
            this[gameListSlot[i].name].setGameName(gameListSlot[i].name);
            this[gameListSlot[i].name].setNameSocket(gameListSlot[i].nameSocket);
            this[gameListSlot[i].name].setTouchEnabled(true);
            this[gameListSlot[i].name].setAudio(this.audioMenuSlots);
            this[gameListSlot[i].name].setPosition(cc.p(lblLayer.width / 2, lblLayer.height / 2));
            lblLayer.addChild(this[gameListSlot[i].name]);
            this[gameListSlot[i].name].addTouchEventListener(this.onTouchMenuSlot, this);
            if (cc.sys.isNative)
                this[gameListSlot[i].name].checkDownLoad(gameListSlot[i].manifestPath, gameListSlot[i].toragePath);
            this.lv_menu_slot.pushBackCustomItem(lblLayer);
        }
        //this.lv_menu_slot.setVisible(false);
        this.lv_menu = new ccui.ListView();
        this.lv_menu.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this.lv_menu.setTouchEnabled(true);
        this.lv_menu.setBounceEnabled(true);
        this.lv_menu.setClippingEnabled(true);
        this.lv_menu.setContentSize(cc.size(960, 440));
        this.lv_menu.setPosition(cc.p(776, 342));
        this.lv_menu.setAnchorPoint(cc.p(0.5, 0.5));
        this.pAccount.addChild(this.lv_menu);

        for (var i = 0; i < g_resources_menu.length; i++) {
            if (i % 2 == 0) {
                var lblLayer = new ccui.Layout();
                lblLayer.height = this.lv_menu.height;
                lblLayer.width = 240;
                lblLayer.setName("LayerItem_" + i);
                var btnItem1 = new ccui.Button();
                btnItem1.setName("Item_" + i);
                btnItem1.loadTextures(g_resources_menu[i], "", g_resources_menu[i]);
                btnItem1.setTouchEnabled(true);
                btnItem1.setPosition(cc.p(120, 330));
                btnItem1.setTag(i);
                lblLayer.addChild(btnItem1);
                this.arrBtnMenu.push(btnItem1);
                btnItem1.addTouchEventListener(this.onTouchMenu, this);
                var btnItem = new ccui.Button();
                if (i < g_resources_menu.length - 1) {
                    btnItem.setName("Item_" + (i + 1));
                    btnItem.loadTextures(g_resources_menu[i + 1], "", g_resources_menu[i + 1]);
                    btnItem.setTouchEnabled(true);
                    btnItem.setPosition(cc.p(120, 110));
                    btnItem.setTag(i + 1);
                    lblLayer.addChild(btnItem);
                    btnItem.addTouchEventListener(this.onTouchMenu, this);
                    this.arrBtnMenu.push(btnItem);
                }
                this.lv_menu.pushBackCustomItem(lblLayer);
            }
        }

        var onMoveItem = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(event.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (lobby.moveIn != target.getName()) {
                        lobby.moveIn = target.getName();
                        target.stopAllActions();
                        target.runAction(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 0.95), cc.scaleTo(0.15, 1.05), cc.scaleTo(0.1, 1)));
                        var str = lobby.moveIn.substr(5, target.getName().length);
                    }
                } else {
                    if (lobby.moveIn == target.getName()) {
                        lobby.moveIn = "";
                        for (var i = 0; i < g_resources_menu.length; i++) {
                            cc.eventManager.resumeTarget(lobby.arrBtnMenu[i], true);
                        }
                    }
                }
            }
        });

        if (!cc.sys.isNative) {
            for (var i = 0; i < g_resources_menu.length; i++) {
                if (i % 2 == 0) {
                    if (lobby.lv_menu.getChildByName("LayerItem_" + i) != null) {
                        var layer = lobby.lv_menu.getChildByName("LayerItem_" + i);

                        var button = layer.getChildByName("Item_" + (i + 1));
                        if (!cc.sys.isNative && i < g_resources_menu.length - 1)
                            cc.eventManager.addListener(onMoveItem.clone(), button);

                        var button2 = layer.getChildByName("Item_" + i);
                        if (!cc.sys.isNative)
                            cc.eventManager.addListener(onMoveItem.clone(), button2);
                    }
                }
            }
        }

        this.addSprite(this.pAccount, "btn_chuyen_menu", cc.p(150, 580), "res/MenuSlots/game_slot.png");

        var listenerMenu = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (target.isVisible())
                        return true;
                }

                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {

            },
            //Process the touch end event
            onTouchEnded: function (touch, event) {

                lobby.isMenuSlots = !lobby.isMenuSlots;
                //showLoading();
                lobby.chuyenMenu();
            }
        });

        cc.eventManager.addListener(listenerMenu, this.btn_chuyen_menu);
        this.btn_chuyen_menu.setVisible(false);

        this.addText(this.pAccount, "lb_hotline", cc.p(1042, 39), "Hotline: " + LobbyLayer.hotLine, RobotoRegular.fontName, 24);
        this.lb_hotline.setVisible(false);
        this.addButton(this.pAccount, "btn_fanpage", LobbyLayer.BTN_FANPAGE, cc.p(1208, 59), false, res_Lobby + "/btnFanpage.png", res_Lobby + "/btnFanpage_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pAccount, "btn_telegram", LobbyLayer.BTN_TELEGRAM, cc.p(1100, 62), false, res_Lobby + "/tele.png");
        //this.addButton(this.pAccount, "btn_vipcode", LobbyLayer.BTN_GIFTCODE, cc.p(920, 62), true, res_Lobby + "/btn_giftcode.png", res_Lobby + "/btn_giftcode.png", ccui.Widget.PLIST_TEXTURE);

        //this.addButton(this.pAccount,"btn_chat",LobbyLayer.BTN_CHAT,cc.p(97,59),false,res_Lobby + "/btn_chat.png",res_Lobby + "/btn_chat_s.png");
        //this.addButton(this.pAccount,"btn_event",LobbyLayer.BTN_EVENT,cc.p(211,59),false,res_Lobby + "/btn_event.png",res_Lobby + "/btn_event_st.png");

        this.addLayout(this.pAccount, "pn_event", cc.p(157, 342), res_Lobby + "/banner.png", cc.size(252, 435), false);
        this.addSprite(this.pn_event, "sp_banner", cc.p(126, 217.5), res_Lobby + "/banner_1.png");
        this.addButton(this.pn_event, "btn_click_event", LobbyLayer.BTN_CLICK_EVENT, cc.p(126, 217.5), false, res_Lobby + "/banner_1.png", res_Lobby + "/banner_1.png");


        this.addLayout(this.pAccount, "pn_chat", cc.p(157, 342), res_Lobby + "/bg_chat.png", cc.size(252, 435), false);
        this.addButton(this.pn_chat, "btn_send_chat", LobbyLayer.BTN_SEND_CHAT, cc.p(210, 31), true, res_Lobby + "/btn_send_chat.png", res_Lobby + "/btn_send_chat_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addEditBox(this.pn_chat, "tf_chat_lobby", cc.p(100, 33), "", "Bạn cần VP để chat", RobotoRegular.fontName, 15, cc.size(153, 27), null, cc.TEXT_ALIGNMENT_LEFT, 16);
        this.addButton(this.pAccount, "btn_chat", LobbyLayer.BTN_CHAT, cc.p(97, 59), true, res_Lobby + "/btn_chat.png", res_Lobby + "/btn_chat_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pAccount, "btn_event", LobbyLayer.BTN_BANNER, cc.p(211, 59), true, res_Lobby + "/btn_event.png", res_Lobby + "/btn_even_st.png", ccui.Widget.PLIST_TEXTURE);

        this.btn_chat.setVisible(false);
        this.btn_event.setVisible(false);

        this.lv_content_chat = new ccui.ListView();
        this.lv_content_chat.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.lv_content_chat.setTouchEnabled(true);
        this.lv_content_chat.setBounceEnabled(true);
        this.lv_content_chat.setClippingEnabled(true);
        this.lv_content_chat.setContentSize(cc.size(210, 331));
        this.lv_content_chat.setPosition(cc.p(126, 219));
        this.lv_content_chat.setAnchorPoint(cc.p(0.5, 0.5));
        this.pn_chat.addChild(this.lv_content_chat);

        this.pn_chat.setVisible(false);
        this.chuyenMenu();
    },
    initPTaoNhanVat: function () {
        this.addSprite(this.pTaoNhanVat, "sp_title_tao_nhan_vat", cc.p(640, 464), "res/Minigame/ImageChung/Title.png");
        this.sp_title_tao_nhan_vat.setScale(0.7);
        this.addText(this.pTaoNhanVat, "lb_title_tao_nhan_vat", cc.p(640, 460), "TÊN NHÂN VẬT", RobotoRegular.fontName, 28);
        //this.lb_title_tao_nhan_vat.setColor(cc.color.WHITE);
        //this.lb_title_tao_nhan_vat.setColor(cc.color(131,74,32));
        this.lb_title_tao_nhan_vat.setColor(cc.color(162, 105, 64));
        this.addText(this.pTaoNhanVat, "lb_tt_bat_buoc", cc.p(640, 428), "(*) Thông tin bắt buộc", RobotoRegular.fontName, 20);
        this.addEditBox(this.pTaoNhanVat, "tf_tao_ten_nhan_vat", cc.p(640, 381), "", "Tên nhân vật", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 16);
        this.tf_tao_ten_nhan_vat.setFontColor(cc.color.BLACK);
        this.addText(this.pTaoNhanVat, "lb_tt_bat_buoc", cc.p(640, 328), "(*) Tên nhân vật trong khoảng từ 6-16 ký tự, không chứa các ký tự nhạy cảm," +
            "\nký tự đặc biệt và không có khoảng trắng", RobotoRegular.fontName, 15);
        this.lb_tt_bat_buoc.ignoreContentAdaptWithSize(false);
        this.lb_tt_bat_buoc.setContentSize(cc.size(544, 38));
        this.lb_tt_bat_buoc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_tt_bat_buoc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addButton(this.pTaoNhanVat, "btn_clear_nick", LobbyLayer.BTN_CLEAR_NICKNAME, cc.p(837, 381), true, res_Lobby + "/closetf.png", res_Lobby + "/closetf.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pTaoNhanVat, "btn_tao_ten_nhan_vat", LobbyLayer.BTN_TAO_TEN_NHAN_VAT, cc.p(640, 276), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname_s.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_tao_ten_nhan_vat.setTitleFontName(RobotoRegular.fontName);
        this.btn_tao_ten_nhan_vat.setTitleText("TẠO NHÂN VẬT");
        this.btn_tao_ten_nhan_vat.setTitleFontSize(28);

        this.pTaoNhanVat.setVisible(false);
    },

    initPLoginOTP: function () {

        this.addLayout(this.pn_login_otp, "bg_login_otp", cc.p(640, 326), null, cc.size(1035, 499), true);

        this.bg_login_otp.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bg_login_otp.setBackGroundColor(cc.color(68, 80, 147));
        this.bg_login_otp.setBackGroundColorOpacity(200);

        this.pn_login_otp.addTouchEventListener(this.onTouchEventHandler, this);
        this.pn_login_otp.setTag(LobbyLayer.BTN_CLOSE_PANEL_SELECT_OTP);
        //btn_close_pn_otp
        this.addButton(this.pn_login_otp, "btn_close_pn_otp", LobbyLayer.BTN_CLOSE_PANEL_OTP, cc.p(1146, 630.), false, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png", ccui.Widget.PLIST_TEXTURE);

        this.addSprite(this.pn_login_otp, "bg_title_otp", cc.p(640, 647), "res/Minigame/ImageChung/Title.png");
        this.addText(this.pn_login_otp, "lb_title_login_otp", cc.p(640, 647), "Xác Thực Đăng Nhập", RobotoRegular.fontName, 38);
        this.lb_title_login_otp.setColor(cc.color(162, 105, 64));
        this.addText(this.pn_login_otp, "lb_nhap_ma_otp", cc.p(640, 527), "Nhập Mã OTP", RobotoRegular.fontName, 30);
        this.addText(this.pn_login_otp, "lb_txt_content", cc.p(640, 473), "Bạn đang sử dụng tính năng bảo mật bằng OTP." +
            "\nVui lòng nhập OTP để đăng nhập", RobotoRegular.fontName, 24);
        this.lb_txt_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_content.setContentSize(cc.size(600, 56));
        this.lb_txt_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addButton(this.pn_login_otp, "btn_select_otp_lobby", LobbyLayer.BTN_SELECT_OTP, cc.p(640, 395), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pn_login_otp, "sp_mui_ten_xuong", cc.p(778, 395), res_Lobby + "/muiten_xuong.png", ccui.Widget.PLIST_TEXTURE);
        this.addText(this.pn_login_otp, "txt_sms_otp_lobby", cc.p(640, 395), "TELE OTP", RobotoRegular.fontName, 25);
        this.txt_sms_otp_lobby.setColor(cc.color.GRAY);

        this.addEditBox(this.pn_login_otp, "tf_login_otp", cc.p(640, 303), "", "Nhập mã xác thực", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 6);
        this.tf_login_otp.setFontColor(cc.color.GRAY);
        this.addText(this.pn_login_otp, "text_conten_otp1", cc.p(277, 236), "TELE OTP : ", RobotoRegular.fontName, 24);
        this["text_conten_otp1"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_login_otp, "text_conten_otp2", cc.p(654, 236), "Vui lòng bật app telegram lên để gửi và nhận mã", RobotoRegular.fontName, 24);
        this.addText(this.pn_login_otp, "text_conten_otp3", cc.p(581, 236), "", RobotoRegular.fontName, 24);
        this["text_conten_otp3"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_login_otp, "text_conten_otp4", cc.p(703, 236), LobbyLayer.SMS_OTP, RobotoRegular.fontName, 24);
        this["text_conten_otp4"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_login_otp, "text_conten_otp5", cc.p(277, 198), "APP OTP : ", RobotoRegular.fontName, 24);
        this["text_conten_otp5"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_login_otp, "text_conten_otp6", cc.p(699, 198), "Nếu bạn đã cài APP OTP. Vui lòng bật APP OTP để lấy mã xác thực", RobotoRegular.fontName, 24);

        this.addButton(this.pn_login_otp, "btn_dang_nhap_otp", LobbyLayer.BTN_LOGIN_OTP, cc.p(640, 133), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);

        this.addLayout(this.pn_login_otp, "pn_sms_app_lobby", cc.p(640, 313), null, cc.size(365, 110), true);
        this.pn_sms_app_lobby.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_sms_app_lobby.setBackGroundColor(cc.color.WHITE);
        this.pn_sms_app_lobby.setBackGroundColorOpacity(254);
        this.addLayout(this.pn_sms_app_lobby, "l_nen", cc.p(182, 55), null, cc.size(361, 106), false);
        this.l_nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.l_nen.setBackGroundColor(cc.color(19, 50, 112));
        this.l_nen.setBackGroundColorOpacity(254);


        this.addButton(this.pn_sms_app_lobby, "btn_sl_sms", LobbyLayer.BTN_SELECT_SMS_OTP, cc.p(182, 81), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_sms.setTitleText("TELE OTP");
        this.btn_sl_sms.setTitleColor(cc.color.GRAY);
        this.btn_sl_sms.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_sms.setTitleFontSize(30);

        this.addButton(this.pn_sms_app_lobby, "btn_sl_app", LobbyLayer.BTN_SELECT_APP_OTP, cc.p(182, 29), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_app.setTitleText("APP OTP");
        this.btn_sl_app.setTitleColor(cc.color.GRAY);
        this.btn_sl_app.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_app.setTitleFontSize(30);

        this.pn_login_otp.setVisible(false);
    },

    initPForgetPass: function () {


        this.addLayout(this.pn_forget_pass, "bg_forget_pass", cc.p(640, 326), null, cc.size(1035, 499), true);
        this.addSprite(this.pn_forget_pass, "bg", cc.p(640, 360), "res/ResourceMenuTab/Mail/bgtab_mail.png");

        //btn_close_pn_otp

        this.addSprite(this.pn_forget_pass, "bg_title_forget_pass", cc.p(640, 647), "res/Minigame/ImageChung/Title.png");
        this.addText(this.pn_forget_pass, "lb_title_forget_pass", cc.p(640, 640), "Quên mật khẩu", RobotoRegular.fontName, 28);
        this.lb_title_forget_pass.setColor(cc.color(162, 105, 64));


        this.addLayout(this.pn_forget_pass, "pn_otp_forget", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.pn_otp_forget.addTouchEventListener(this.onTouchEventHandler, this);
        this.pn_otp_forget.setTag(LobbyLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET);
        this.addText(this.pn_otp_forget, "lb_txt_forget_content", cc.p(640, 473), "Tài khoản đã đăng ký bảo mật." +
            "\nVui lòng nhập OTP để được hỗ trợ nhanh nhất", RobotoRegular.fontName, 24);
        this.lb_txt_forget_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_forget_content.setContentSize(cc.size(600, 56));
        this.lb_txt_forget_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_forget_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addButton(this.pn_otp_forget, "btn_select_otp_forget", LobbyLayer.BTN_SHOW_OTP_FORGET, cc.p(640, 409), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pn_otp_forget, "sp_mui_ten_xuong_forget", cc.p(778, 409), res_Lobby + "/muiten_xuong.png", ccui.Widget.PLIST_TEXTURE);
        this.addText(this.pn_otp_forget, "txt_otp_forget", cc.p(640, 409), "TELE OTP", RobotoRegular.fontName, 25);
        this.txt_otp_forget.setColor(cc.color.GRAY);
        this.addEditBox(this.pn_otp_forget, "tf_input_otp_for", cc.p(640, 316), "", "Nhập mã xác thực", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 6);
        this.tf_input_otp_for.setFontColor(cc.color.BLACK);
        this.addText(this.pn_otp_forget, "text_conten_otp7", cc.p(277, 249), "TELE OTP : ", RobotoRegular.fontName, 24);
        this["text_conten_otp7"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_otp_forget, "text_conten_otp8", cc.p(654, 249), "Vui lòng bật app telegram lên để gửi và nhận mã", RobotoRegular.fontName, 24);
        this.addText(this.pn_otp_forget, "text_conten_otp9", cc.p(581, 249), "", RobotoRegular.fontName, 24);
        this["text_conten_otp9"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_otp_forget, "text_conten_otp10", cc.p(703, 249), LobbyLayer.SMS_OTP, RobotoRegular.fontName, 24);
        this["text_conten_otp10"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_otp_forget, "text_conten_otp11", cc.p(277, 210), "APP OTP : ", RobotoRegular.fontName, 24);
        this["text_conten_otp11"].setColor(cc.color(243, 13, 241));
        this.addText(this.pn_otp_forget, "text_conten_otp12", cc.p(699, 210), "Nếu bạn đã cài APP OTP. Vui lòng bật APP OTP để lấy mã xác thực", RobotoRegular.fontName, 24);
        this.addLayout(this.pn_otp_forget, "pn_chose_otp_for", cc.p(640, 330), null, cc.size(365, 110), true);

        this.addButton(this.pn_otp_forget, "btn_send_otp_forget", LobbyLayer.BTN_SEND_OTP_FORGET, cc.p(640, 141), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname_s.png", ccui.Widget.PLIST_TEXTURE);

        this.btn_send_otp_forget.setTitleText("TIẾP TỤC");
        this.btn_send_otp_forget.setTitleColor(cc.color.WHITE);
        this.btn_send_otp_forget.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_otp_forget.setTitleFontSize(30);

        this.pn_chose_otp_for.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_chose_otp_for.setBackGroundColor(cc.color.WHITE);
        this.pn_chose_otp_for.setBackGroundColorOpacity(254);
        this.addLayout(this.pn_chose_otp_for, "l_nen1", cc.p(182, 55), null, cc.size(361, 106), false);
        this.l_nen1.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.l_nen1.setBackGroundColor(cc.color(19, 50, 112));
        this.l_nen1.setBackGroundColorOpacity(254);
        this.addButton(this.pn_chose_otp_for, "btn_sl_sms_for", LobbyLayer.BTN_SELECT_SMS_FORGET, cc.p(182, 81), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_sms_for.setTitleText("TELE OTP");
        this.btn_sl_sms_for.setTitleColor(cc.color.GRAY);
        this.btn_sl_sms_for.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_sms_for.setTitleFontSize(30);
        this.addButton(this.pn_chose_otp_for, "btn_sl_app_for", LobbyLayer.BTN_SELECT_APP_FORGET, cc.p(182, 29), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_app_for.setTitleText("APP OTP");
        this.btn_sl_app_for.setTitleColor(cc.color.GRAY);
        this.btn_sl_app_for.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_app_for.setTitleFontSize(30);

        this.pn_otp_forget.setVisible(false);


        this.addLayout(this.pn_forget_pass, "pn_email_forget", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.pn_email_forget, "lb_txt_email_content", cc.p(640, 483), "Tài khoản kích hoạt bảo mật bằng Email." +
            "Xin vui lòng nhập chính xác Email dùng để bảo mật!", RobotoRegular.fontName, 24);
        this.lb_txt_email_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_email_content.setContentSize(cc.size(600, 56));
        this.lb_txt_email_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_email_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addEditBox(this.pn_email_forget, "tf_input_email_for", cc.p(640, 360), "", "Nhập Email:", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_LEFT, 100);
        this.tf_input_email_for.setFontColor(cc.color.BLACK);
        this.addButton(this.pn_email_forget, "btn_clear_email_forget", LobbyLayer.BTN_CLEAR_EMAIL_FORGETPASS, cc.p(875, 360.), false, res_Lobby + "/closetf.png", res_Lobby + "/closetf.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_email_forget, "btn_send_email_forget", LobbyLayer.BTN_SEND_EMAIL_FORGETPASS, cc.p(640, 213.), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname_s.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_send_email_forget.setTitleText("GỬI THÔNG TIN");
        this.btn_send_email_forget.setTitleColor(cc.color.WHITE);
        this.btn_send_email_forget.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_email_forget.setTitleFontSize(32);

        this.pn_email_forget.setVisible(false);


        this.addLayout(this.pn_forget_pass, "pn_otp_information", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.pn_otp_information, "lb_txt_information_content", cc.p(640, 486), "Để nhận được hỗ trợ." +
            "Vui lòng nhập đầy đủ các thông tin dưới đây:", RobotoRegular.fontName, 24);
        this.lb_txt_information_content.ignoreContentAdaptWithSize(false);
        this.lb_txt_information_content.setContentSize(cc.size(600, 56));
        this.lb_txt_information_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_information_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addEditBox(this.pn_otp_information, "tf_username_for", cc.p(640, 360), "", "Nhập tên đăng nhập:", RobotoRegular.fontName, 24, cc.size(357, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_LEFT, 16);
        this.tf_username_for.setFontColor(cc.color.BLACK);
        this.addEditBox(this.pn_otp_information, "tf_captcha_forget", cc.p(555, 290), "", "Mã xác nhận", RobotoRegular.fontName, 24, cc.size(178, 50), res_Lobby + "/bg_2.png", cc.TEXT_ALIGNMENT_CENTER, 6);
        this.tf_captcha_forget.setFontColor(cc.color.BLACK);
        this.addSprite(this.pn_otp_information, "sp_show_captcha_for", cc.p(703, 290), res_Lobby + "/Default/Sprite.png");
        this.addButton(this.pn_otp_information, "btn_refresh_forget", LobbyLayer.BTN_REFRESH_CAPTCHA_FORGET, cc.p(790, 290), true, res_Lobby + "/btnRefresh.png", res_Lobby + "/btnRefresh.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_otp_information, "btn_send_information", LobbyLayer.BTN_SEND_INFORMATION_FORGET, cc.p(640, 205), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname_s.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_send_information.setTitleText("Gửi thông tin");
        this.btn_send_information.setTitleColor(cc.color.WHITE);
        this.btn_send_information.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_information.setTitleFontSize(28);

        this.pn_otp_information.setVisible(false);


        this.addLayout(this.pn_forget_pass, "pn_otp_thongbao", cc.p(640, 360), null, cc.size(1280, 720), true);

        this.addLayout(this.pn_otp_thongbao, "content_bm", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.content_bm, "lb_txt_otp_thongbao1", cc.p(640, 360), "Hệ thống đã ghi nhận thông báo của quý khách." +
            "\nHệ thống đang tiến hành kiểm tra và hỗ trợ trong vòng 24h."

            +
            "\n\nVui lòng kiểm tra Email và số điện thoại đã kích hoạt bảo mật!", RobotoRegular.fontName, 24);
        this.lb_txt_otp_thongbao1.ignoreContentAdaptWithSize(false);
        this.lb_txt_otp_thongbao1.setContentSize(cc.size(700, 150));
        this.lb_txt_otp_thongbao1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_otp_thongbao1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.content_bm, "txt_content_td_1_0", cc.p(515, 102), LobbyLayer.hotLine, RobotoRegular.fontName, 20);
        this["txt_content_td_1_0"].setColor(cc.color(243, 13, 241));
        this["txt_content_td_1_0"].setSkewX(15);
        this.addText(this.content_bm, "txt_content_td_fo_1_0", cc.p(459, 102), "*** Mọi thắc mắc xin liên hệ tổng đài                    để được hỗ trợ trực tiếp!", RobotoRegular.fontName, 20);
        this["txt_content_td_fo_1_0"].setSkewX(15);
        this.content_bm.setVisible(false);

        this.addLayout(this.pn_otp_thongbao, "content_no_bm", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.content_no_bm, "lb_txt_content_no_bm", cc.p(640, 360), "Tài khoản chưa đăng ký sử dụng chức năng bảo mật. " +
            "\nXin vui lòng liên hệ đến tổng đài                     để được hỗ trợ!", RobotoRegular.fontName, 24);
        this.lb_txt_content_no_bm.ignoreContentAdaptWithSize(false);
        this.lb_txt_content_no_bm.setContentSize(cc.size(700, 200));
        this.lb_txt_content_no_bm.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_content_no_bm.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.content_no_bm, "lb_txt_content_no_bm2", cc.p(730, 344), LobbyLayer.hotLine, RobotoRegular.fontName, 24);
        this["lb_txt_content_no_bm2"].setColor(cc.color(243, 13, 241));

        this.addText(this.content_no_bm, "lb_txt_content_no_bm3", cc.p(626, 106), "*** Trường hợp các tài khoản đã đăng ký sử dụng chức năng bảo mật. Hệ thống sẽ tự động kiểm tra, hỗ trợ " +
            "\nmột cách nhanh chóng và thuận tiện hơn", RobotoRegular.fontName, 20);
        this["lb_txt_content_no_bm3"].setSkewX(15);
        this.lb_txt_content_no_bm.ignoreContentAdaptWithSize(false);
        this.lb_txt_content_no_bm.setContentSize(cc.size(939, 46));
        this.content_no_bm.setVisible(false);


        this.addLayout(this.pn_forget_pass, "pn_chose_email_otp", cc.p(640, 360), null, cc.size(1280, 720), true);
        this.addText(this.pn_chose_email_otp, "lb_txt_chose_email_otp", cc.p(640, 462), "Tài khoản đã đăng ký bảo mật bằng Email và số điện thoại."

            +
            "\nVui lòng lựa chọn hình thức lấy lại mật khẩu", RobotoRegular.fontName, 24);
        this.lb_txt_chose_email_otp.ignoreContentAdaptWithSize(false);
        this.lb_txt_chose_email_otp.setContentSize(cc.size(700, 150));
        this.lb_txt_chose_email_otp.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lb_txt_chose_email_otp.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addButton(this.pn_chose_email_otp, "btn_chose_email_sms_for", LobbyLayer.BTN_CHOSE_EMAIL_PHONE, cc.p(640, 356), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.addSprite(this.pn_chose_email_otp, "sp_mui_ten_xuong_email_sms_for", cc.p(778, 356), res_Lobby + "/muiten_xuong.png", ccui.Widget.PLIST_TEXTURE);
        this.addText(this.pn_chose_email_otp, "txt_email_sms_for", cc.p(640, 356), "Qua số điện thoại", RobotoRegular.fontName, 25);
        this.txt_email_sms_for.setColor(cc.color.GRAY);

        this.addLayout(this.pn_chose_email_otp, "email_sms_chose", cc.p(640, 276), null, cc.size(365, 110), true);

        this.email_sms_chose.addTouchEventListener(this.onTouchEventHandler, this);
        this.email_sms_chose.setTag(LobbyLayer.BTN_CLOSE_EMAIL_PHONE);

        this.email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.email_sms_chose.setBackGroundColor(cc.color.WHITE);
        this.email_sms_chose.setBackGroundColorOpacity(254);
        this.addLayout(this.email_sms_chose, "l_nen_email_sms_chose", cc.p(182, 55), null, cc.size(361, 106), false);
        this.l_nen_email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.l_nen_email_sms_chose.setBackGroundColor(cc.color(19, 50, 112));
        this.l_nen_email_sms_chose.setBackGroundColorOpacity(254);
        this.addButton(this.email_sms_chose, "btn_sl_phone", LobbyLayer.BTN_SELECT_PHONE, cc.p(182, 81), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_phone.setTitleText("Qua số điện thoại");
        this.btn_sl_phone.setTitleColor(cc.color.GRAY);
        this.btn_sl_phone.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_phone.setTitleFontSize(30);
        this.addButton(this.email_sms_chose, "btn_sl_email", LobbyLayer.BTN_SELECT_EMAIL, cc.p(182, 29), false, res_Lobby + "/bg_2.png", res_Lobby + "/bg_2.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_sl_email.setTitleText("Qua địa chỉ Email");
        this.btn_sl_email.setTitleColor(cc.color.GRAY);
        this.btn_sl_email.setTitleFontName(RobotoRegular.fontName);
        this.btn_sl_email.setTitleFontSize(30);
        this.addButton(this.pn_chose_email_otp, "btn_send_chose", LobbyLayer.BTN_EMAIL_PHONE, cc.p(640, 165), false, res_Lobby + "/btnCreatNickname.png", res_Lobby + "/btnCreatNickname_s.png", ccui.Widget.PLIST_TEXTURE);
        this.btn_send_chose.setTitleText("TIẾP TỤC");
        this.btn_send_chose.setTitleColor(cc.color.WHITE);
        this.btn_send_chose.setTitleFontName(RobotoRegular.fontName);
        this.btn_send_chose.setTitleFontSize(32);

        this.addButton(this.pn_forget_pass, "btn_back_forget_pass", LobbyLayer.BTN_BACK_FORGETPASS, cc.p(133, 630), false, res_Lobby + "/btnBack.png", res_Lobby + "/btnBack_s.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_forget_pass, "btn_close_forget_pass", LobbyLayer.BTN_CLOSE_FORGET_PASS, cc.p(1146, 630.), false, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png", ccui.Widget.PLIST_TEXTURE);

        this.pn_forget_pass.setVisible(false);

    },

    initPBaoTri: function () {
        this.pn_baotriHeThong.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.pn_baotriHeThong.setBackGroundColor(cc.color.BLACK);
        this.pn_baotriHeThong.setBackGroundColorOpacity(200);
        this.addText(this.pn_baotriHeThong, "lb_baotri1", cc.p(640, 360), "BẢO TRÌ HỆ THỐNG", RobotoRegular.fontName, 40);
        this.addText(this.pn_baotriHeThong, "tx_cham1", cc.p(825, 360), ".", RobotoRegular.fontName, 40);
        this.addText(this.pn_baotriHeThong, "tx_cham2", cc.p(835, 360), ".", RobotoRegular.fontName, 40);
        this.addText(this.pn_baotriHeThong, "tx_cham3", cc.p(845, 360), ".", RobotoRegular.fontName, 40);
        this.addText(this.pn_baotriHeThong, "tx_chamthan", cc.p(865, 360), "/", RobotoRegular.fontName, 40);
        this.pn_baotriHeThong.setVisible(false);
    },
    initPSubpot: function () {
        this.addButton(this.pn_suppot, "btn_dayly", LobbyLayer.BTN_DAILY, cc.p(-41, 587), true, res_Lobby + "/btn_Daily.png", res_Lobby + "/btn_Daily.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_vipcode", LobbyLayer.BTN_GIFTCODE, cc.p(-41, 511), true, res_Lobby + "/btn_giftcode.png", res_Lobby + "/btn_giftcode.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_hotro", LobbyLayer.BTN_HOTRO, cc.p(-41, 435), true, res_Lobby + "/btn_hotro.png", res_Lobby + "/btn_hotro.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_quydinh", LobbyLayer.BTN_QUYDINH, cc.p(-41, 359), true, res_Lobby + "/btn_quydinh.png", res_Lobby + "/btn_quydinh.png", ccui.Widget.PLIST_TEXTURE);
        //this.addButton(this.pn_suppot, "btn_news", LobbyLayer.BTN_NEWS, cc.p(-41, 282), true, res_Lobby + "/btn_New.png", res_Lobby + "/btn_New.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_ios", LobbyLayer.BTN_IOS, cc.p(308, -35), true, res_Lobby + "/btn_ios.png", res_Lobby + "/btn_ios.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_android", LobbyLayer.BTN_ANDROID, cc.p(640, -35), true, res_Lobby + "/btn_android.png", res_Lobby + "/btn_android.png", ccui.Widget.PLIST_TEXTURE);
        this.addButton(this.pn_suppot, "btn_windowfone", LobbyLayer.BTN_WINDOWFONE, cc.p(955, -35), true, res_Lobby + "/btn_windowfone.png", res_Lobby + "/btn_windowfone.png", ccui.Widget.PLIST_TEXTURE);
    },

    onButtonRelease: function (button, id) {
        switch (id) {
            case LobbyLayer.BTN_IOS:
                if (lobby.facebook_canvas == false)
                    window.open("https://tai.vinplay.vin/");
                break;
            case LobbyLayer.BTN_ANDROID:
                if (lobby.facebook_canvas == false)
                    window.open("https://tai.vinplay.vin/");
                break;
            case LobbyLayer.BTN_WINDOWFONE:
                if (lobby.facebook_canvas == false)
                    window.open("#");
                break;
            case LobbyLayer.BTN_CLICK_EVENT:
                if (cc.sys.isNative) {
                    if (lobby.open_payment_ios == true) {
                        ConnectNative.openWebView(this.linkBanner, false);
                    }
                } else {
                    if (lobby.facebook_canvas == false)
                        window.open(this.linkBanner);
                }
                break;
            case LobbyLayer.BTN_CLEAR_EMAIL_FORGETPASS:
                this.tf_input_email_for.setString("");
                this.tf_input_email_for.setPlaceHolder("Nhập Email:");
                this.btn_clear_email_forget.setVisible(false);
                this.tf_input_email_for.runAction(cc.scaleTo(0.225, 1));
                if (cc.sys.os == cc.sys.OS_ANDROID)
                    this.tf_input_email_for.setColor(cc.color("#FFFFFF"));
                break;
            case LobbyLayer.BTN_CLEAR_NICKNAME:
                this.tf_tao_ten_nhan_vat.setString("");
                this.tf_tao_ten_nhan_vat.setPlaceHolder("Tên nhân vật");
                this.btn_clear_nick.setVisible(false);
                this.tf_tao_ten_nhan_vat.runAction(cc.scaleTo(0.225, 1));
                this.bg_tf_nickname.setColor(cc.color("#FFFFFF"));
                break;
            case LobbyLayer.BTN_SEND_CHAT:
                this.funSendChat();
                break;
            case LobbyLayer.BTN_CHAT:
                this.funSubcribleChat();
                break;
            case LobbyLayer.BTN_BANNER:
                this.pn_event.setVisible(true);
                this.pn_chat.setVisible(false);
                this.funUnSubcribleChat();
                this.isOpenChat = false;
                break;
            case LobbyLayer.BTN_DIEUKHOAN_SD:
                opendieukhoan();
                this.isDieuKhoan_lobby = true;
                break;
            case LobbyLayer.BTN_FANPAGE:
                if (cc.sys.isNative) {
                    cc.sys.openURL(this.linkFanpage);
                } else
                    window.open(this.linkFanpage);
                break;
            case LobbyLayer.BTN_TELEGRAM:
                if (cc.sys.isNative) {
                    cc.sys.openURL(this.linktelegram);
                } else
                    window.open(this.linktelegram);
                break;                
            case LobbyLayer.BTN_FACEBOOOK_TAB:
                this.s = "fb";
                this.isFBGG = true;
                if (!cc.sys.isNative) {
                    // this.checkLoginState();
                    this.loginFB();
                } else {
                    socialMgr.setTarget(this, this.onGetAcsessToken);
                    socialMgr.loginFacebook();
                }
                break;
            case LobbyLayer.BTN_GOOGLE_TAB:
                //this.runDataEvent();
                this.s = "gg";
                this.isFBGG = true;
                if (!cc.sys.isNative) {
                    this.loginGG();
                } else {
                    socialMgr.setTarget(this, this.onGetAcsessToken);
                    socialMgr.loginGoogle();
                }
                break;
            case LobbyLayer.BTN_DANGNHAP_NGAY:
                if (this.isClickDangKy == true) {
                    this.btn_chat.setVisible(false);
                    this.btn_event.setVisible(false);
                    this.pn_event.setVisible(true);
                    lobby.IsRegister = false;
                    lobby.pn_chat.setVisible(false);
                    this.isClickDangKy = false;
                    this.pDangKy.setVisible(false);
                    //this.pn_other.setVisible(true);
                    this.pAccount.setVisible(true);
                    this.shadow.setVisible(true);
                }
                break;
            case LobbyLayer.BTN_DANG_NHAP_TAB:
                this.funLogin();
                break;
            case LobbyLayer.BTN_DANG_KY_TAB:
                this.isClickDangKy = true;
                this.shadow.setVisible(false);
                this.parserDataCaptcha();
                //send request đăng ký tab
                this.isFBGG = false;
                this.pDangKy.setVisible(true);
                //this.pn_other.setVisible(false);


                this.pAccount.setVisible(false);
                this.btn_chat.setVisible(false);
                this.btn_event.setVisible(false);
                this.pn_event.setVisible(false);
                lobby.pn_chat.setVisible(false);

                break;
            case LobbyLayer.BTN_QUEN_MK:
                this.pn_forget_pass.setVisible(true);
                this.pn_forget_pass.runAction(cc.scaleTo(0.2, 1));
                this.pn_otp_information.setVisible(true);
                this.pn_otp_forget.setVisible(false);
                this.pn_otp_thongbao.setVisible(false);
                this.content_bm.setVisible(false);
                this.content_no_bm.setVisible(false);
                this.pn_chose_otp_for.setVisible(false);
                this.pn_email_forget.setVisible(false);
                this.pn_chose_email_otp.setVisible(false);
                this.email_sms_chose.setVisible(false);
                this.btn_back_forget_pass.setVisible(false);
                this.parserDataCaptcha();
                break;
            case LobbyLayer.BTN_CLOSE_FORGET_PASS:
                this.pn_forget_pass.setVisible(false);
                this.pn_forget_pass.runAction(cc.scaleTo(0.2, 0));
                lobby.btn_send_information.setEnabled(true);
                lobby.btn_send_otp_forget.setEnabled(true);
                this.save_username = "";
                //this.resetTextfieldForgetPass();
                break;
            case LobbyLayer.BTN_SEND_INFORMATION_FORGET:
                this.funSendInformationForgetPass();

                break;
            case LobbyLayer.BTN_REFRSH:
                this.parserDataCaptcha();
                break;
            case LobbyLayer.BTN_REFRESH_CAPTCHA_FORGET:
                this.parserDataCaptcha();
                break;
            case LobbyLayer.BTN_DANG_KY:
                this.funCreateAccount();
                break;
            case LobbyLayer.BTN_DANG_KY_FACEBOOK:
                this.s = "fb";
                this.isFBGG = true;
                if (!cc.sys.isNative) {
                    // this.checkLoginState();
                    this.loginFB();
                } else {
                    socialMgr.setTarget(this, this.onGetAcsessToken);
                    socialMgr.loginFacebook();
                }
                break;
            case LobbyLayer.BTN_DANG_KY_GOOGLE:
                this.s = "gg";
                this.isFBGG = true;
                if (!cc.sys.isNative) {
                    // this.checkLoginState();
                    this.loginGG();
                } else {
                    socialMgr.setTarget(this, this.onGetAcsessToken);
                    socialMgr.loginGoogle();
                }
                break;
            case LobbyLayer.BTN_TAO_TEN_NHAN_VAT:
                if (this.isFBGG) {
                    var nickName = this.tf_tao_ten_nhan_vat.getString();
                    if (nickName == null || nickName.length < 6 || nickName.length > 16) {
                        popup.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái, số và dấu _");
                    } else if (!this.checkKyTuSpecial(nickName, true)) {
                        popup.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái,số và dấu _!");
                    } else if (!this.checkNickNameNhayCam(nickName)) {
                        popup.openPanel_Alert_Lobby("Không chọn NickName nhạy cảm!");
                    } else {
                        var url = urlUpdateNickFBGG(this.s, this.accessTokenFBGG, nickName, lobby.platform);
                        sendRequest(url, null, false, lobby.callBackUpdateNickName, lobby.callBackError);
                    }
                } else {
                    var userName = lobby.userName;
                    var pass = md5(lobby.passWord);
                    if (lobby.passWordMD5 != null)
                        pass = lobby.passWordMD5;
                    var nickName = this.tf_tao_ten_nhan_vat.getString();
                    if (nickName == null || nickName.length < 6 || nickName.length > 16) {
                        popup.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái, số và dấu _");
                    } else if (!this.checkKyTuSpecial(nickName, true)) {
                        popup.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái,số và dấu _!");
                    } else if (!this.checkNickNameNhayCam(nickName)) {
                        popup.openPanel_Alert_Lobby("Không chọn NickName nhạy cảm!");
                    } else {
                        var url = urlUpdateNick(userName, pass, nickName, lobby.platform);
                        sendRequest(url, null, false, lobby.callBackUpdateNickName, lobby.callBackError);
                    }
                }
                break;
            case LobbyLayer.BTN_CLOSE_PANEL_OTP:
                this.pn_login_otp.runAction(cc.scaleTo(0.2, 0));
                this.btn_dang_nhap_otp.setEnabled(true);
                lobby.tf_login_otp.setString("");
                lobby.tf_login_otp.setPlaceHolder("Nhập mã xác thực");
                lobby.tf_login_otp.setColor(cc.color("#7F7F7F"));
                lobby.tf_login_otp.runAction(cc.scaleTo(0.225, 1));
                break;
            case LobbyLayer.BTN_SELECT_OTP:
                this.pn_sms_app_lobby.setVisible(true);
                this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case LobbyLayer.BTN_LOGIN_OTP:
                this.funLoginWithOtp();
                break;
            case LobbyLayer.BTN_CLOSE_PANEL_SELECT_OTP:
                this.pn_sms_app_lobby.setVisible(false);
                this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 0));
                break;
            case LobbyLayer.BTN_SELECT_SMS_OTP:
                this.sms_or_app_otp = "sms";
                this.txt_sms_otp_lobby.setString("TELE OTP");
                this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 0));
                this.pn_sms_app_lobby.setVisible(false);
                this.type_otp_login = 0;
                break;
            case LobbyLayer.BTN_SELECT_APP_OTP:
                this.sms_or_app_otp = "app";
                this.txt_sms_otp_lobby.setString("APP OTP");
                this.pn_sms_app_lobby.runAction(cc.scaleTo(0.2, 1, 0));
                this.pn_sms_app_lobby.setVisible(false);
                this.type_otp_login = 1;
                break;
            case LobbyLayer.BTN_SHOW_OTP_FORGET:
                this.pn_chose_otp_for.setVisible(true);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case LobbyLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                break;
            case LobbyLayer.BTN_SELECT_APP_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                this.txt_otp_forget.setString("APP OTP");
                break;
            case LobbyLayer.BTN_SELECT_SMS_FORGET:
                this.pn_chose_otp_for.setVisible(false);
                this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                this.txt_otp_forget.setString("TELE OTP");
                break;
            case LobbyLayer.BTN_SEND_OTP_FORGET:
                this.funSendOTPForgetPass();
                break;
            case LobbyLayer.BTN_SEND_EMAIL_FORGETPASS:
                this.funSendEmailForGetPass();
                break;
            case LobbyLayer.BTN_BACK_FORGETPASS:
                this.pn_email_forget.setVisible(false);
                this.pn_otp_forget.setVisible(false);
                this.btn_back_forget_pass.setVisible(false);
                this.pn_chose_email_otp.setVisible(true);
                break;
            case LobbyLayer.BTN_EMAIL_PHONE:
                this.pn_chose_email_otp.setVisible(false);
                this.btn_back_forget_pass.setVisible(true);
                if (this.type_email_phone == 0) {
                    this.pn_otp_forget.setVisible(true);
                    this.pn_email_forget.setVisible(false);
                } else {
                    this.pn_email_forget.setVisible(true);
                    this.pn_otp_forget.setVisible(false);
                }
                break;
            case LobbyLayer.BTN_CHOSE_EMAIL_PHONE:
                this.email_sms_chose.setVisible(true);
                this.email_sms_chose.runAction(cc.scaleTo(0.2, 1, 1));
                break;
            case LobbyLayer.BTN_CLOSE_EMAIL_PHONE:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                break;
            case LobbyLayer.BTN_SELECT_EMAIL:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                this.type_email_phone = 1;
                this.txt_email_sms_for.setString("Qua địa chỉ Email");
                break;
            case LobbyLayer.BTN_SELECT_PHONE:
                this.email_sms_chose.setVisible(false);
                this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                this.type_email_phone = 0;
                this.txt_email_sms_for.setString("Qua số điện thoại");
                break;
            case LobbyLayer.BTN_DAILY:
                if (this.islogin == true) {
                    if (giftcodeAppear == true)
                        closegiftcode();
                    if (dieukhoanAppear == true)
                        closedieukhoan();
                    menutab.select_nap_xu = "daily";
                    openshopping_Chuyenkhoan();
                } else {
                    lobby.AlertLogin = true;
                    popup.openPanel_Alert_Lobby("Vui lòng đăng nhập vào hệ thống!");
                }
                break;
            case LobbyLayer.BTN_GIFTCODE:
                if (this.islogin == true) {
                    if (dieukhoanAppear == true)
                        closedieukhoan();
                    if (chuyenkhoanAppear == true) {
                        closechuyenkhoan();
                        closeshopping_info();
                    }
                    opengiftcode("");
                } else {
                    lobby.AlertLogin = true;
                    popup.openPanel_Alert_Lobby("Vui lòng đăng nhập vào hệ thống!");
                }
                break;
            case LobbyLayer.BTN_HOTRO:
                if (cc.sys.isNative) {
                    cc.sys.openURL("https://facebook.com/vinplay.vin.fanpage");
                } else {
                    if (lobby.facebook_canvas == false)
                        window.open("https://facebook.com/vinplay.vin.fanpage");
                }
                break;
          //  case LobbyLayer.BTN_NEWS:
          //      if (cc.sys.isNative) {
          //          cc.sys.openURL("http://vinplay.net");
          //      } else {
          //          if (lobby.facebook_canvas == false)
          //              window.open("http://vinplay.net");
          //     }
          //      break;
            case LobbyLayer.BTN_QUYDINH:
                opendieukhoan();
                if (giftcodeAppear == true)
                    closegiftcode();
                if (chuyenkhoanAppear == true) {
                    closechuyenkhoan();
                    closeshopping_info();
                }
                this.isDieuKhoan_lobby = true;

                break;

        }
    },
    chuyenMenu: function () {
        this.btn_chuyen_menu.stopAllActions();
        if (!this.isMenuSlots) {
            if (this.socketSlot != null) {
                this.socketSlot.sendUnSubScribe();
            }
            cc.spriteFrameCache.addSpriteFrames("res/MenuSlots/Plist_slots.plist");
            this.btn_chuyen_menu.setTexture("res/MenuSlots/game_slot.png");
            var animFrames = [];
            var str = "";

            for (var i = 0; i <= 31; i++) {
                str = "MenuSlot/animation_slots/Game_Slot_" + i + ".png";
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.04, 1);
            var animate = cc.Animate.create(animation);

            this.btn_chuyen_menu.runAction(cc.repeatForever(cc.sequence(animate, cc.delayTime(3))));
            this.lv_menu.setVisible(true);
            this.lv_menu_slot.setVisible(false);

        } else {
            if (this.socketSlot == null) {
                this.socketSlot = new Slots.SlotsWebSocket();
                this.socketSlot.connectToServer();
            } else {
                if (this.socketSlot.isConnected) {
                    this.socketSlot.sendSubScribe();
                } else {
                    this.socketSlot.connectToServer();
                    this.isClickMenuSlot = true;
                }

            }
            cc.spriteFrameCache.addSpriteFrames("res/MenuSlots/Plist_bai.plist");
            this.btn_chuyen_menu.setTexture("res/MenuSlots/game_bai.png");
            var animFrames = [];
            var str = "";

            for (var i = 0; i <= 27; i++) {
                str = "MenuSlot/animation_bai/Game_Bai_" + i + ".png";
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.04, 1);
            var animate = cc.Animate.create(animation);

            this.btn_chuyen_menu.runAction(cc.repeatForever(cc.sequence(animate, cc.delayTime(3))));
            this.lv_menu.setVisible(false);
            this.lv_menu_slot.setVisible(true);
        }
    },
    onTouchMenu: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (lobby.userInfo == null) {
                    popup.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
                } else {
                    menutab.Isingame = true;
                    menutab.pn_list_hu.setVisible(false);
                    var gameNumber = sender.getTag();
                    menutab.stopTime_gotoGameBai();

                    var kk = mapTagToGameType["" + gameNumber];
                    if (mapTagToGameType["" + gameNumber] != undefined) {
                        GameManager.getInstance().initAndOpenGame(parseInt(mapTagToGameType["" + gameNumber]));
                    } else {
                        popup.openPanel_Alert_Lobby("Game sắp ra mắt.");
                    }
                }
                break;
        }
    },
    openGame: function (name) {
        if (name == "") {
            popup.openPanel_Alert_Lobby("Game sắp ra mắt.");
            return;
        }
        for (var i = 0; i < gameListSlot.length; i++) {
            if (this[gameListSlot[i].name].getComingSoon() == false) {
                this[gameListSlot[i].name].stopRunAllPot();
            }
        }

        if (name == "khobau") {
            if (cc.sys.isNative && this[gameListSlot[mapMenuSlot.khoBau].name].getChildByTag(999).isVisible()) {
                this[gameListSlot[mapMenuSlot.khoBau].name].downloadGamne();
            } else
                loadResoureGame(g_resources_slots_kho_bau, slotKhoBau, function () {
                    if (!slotKhoBauAppear) {
                        if (cc.sys.isNative) {
                            lobby.runAction(cc.sequence(cc.callFunc(function () {
                                showLoading();
                            }), cc.delayTime(0.1), cc.callFunc(function () {
                                openSlotKhoBau();
                                closeLoading();
                            })))
                        } else {
                            openSlotKhoBau();
                        }

                    }
                });

        } else if (name == "nudiepvien") {
            if (cc.sys.isNative && this[gameListSlot[mapMenuSlot.nuDiepVien].name].getChildByTag(999).isVisible()) {
                this[gameListSlot[mapMenuSlot.nuDiepVien].name].downloadGamne();
            } else
                loadResoureGame(g_resources_nu_diep_vien, nuDiepVien, function () {
                    if (!nuDiepVienAppear) {
                        if (cc.sys.isNative) {
                            lobby.runAction(cc.sequence(cc.callFunc(function () {
                                showLoading();
                            }), cc.delayTime(0.1), cc.callFunc(function () {
                                openNuDiepVien();
                                closeLoading();
                            })))
                        } else {
                            openNuDiepVien();
                        }

                    }
                });
        } else if (name == "sieuanhhung") {
            if (cc.sys.isNative && this[gameListSlot[mapMenuSlot.sieuAnhHung].name].getChildByTag(999).isVisible()) {
                this[gameListSlot[mapMenuSlot.sieuAnhHung].name].downloadGamne();
            } else
                loadResoureGame(g_resources_avenger, avenger, function () {
                    if (!avengerAppear) {
                        if (cc.sys.isNative) {
                            lobby.runAction(cc.sequence(cc.callFunc(function () {
                                showLoading();
                            }), cc.delayTime(0.1), cc.callFunc(function () {
                                openAvenger();
                                closeLoading();
                            })))
                        } else {
                            openAvenger();
                        }

                    }
                });
        } else if (name == "vuongquocvin") {
            // openTayDuKy();
            //return;
            if (cc.sys.isNative && this[gameListSlot[mapMenuSlot.vuongQuocVin].name].getChildByTag(999).isVisible()) {
                this[gameListSlot[mapMenuSlot.vuongQuocVin].name].downloadGamne();
            } else
                loadResoureGame(g_resources_slot_vqv, vuongQuocVin, function () {
                    lobby.runAction(cc.sequence(cc.callFunc(function () {
                        showLoading();
                    }), cc.delayTime(0.5), cc.callFunc(function () {
                        openVuongQuocVin();
                        closeLoading();
                    })));

                });

        }
    },
    onTouchMenuSlot: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if (lobby.userInfo == null) {
                    popup.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
                } else {
                    if (lobby.socketSlot == null) {
                        lobby.isMenuSlots = true;
                        lobby.chuyenMenu();
                    }
                    if (!lobby.socketSlot.isConnected) {

                    } else {
                        if (this.isMenuSlots) {
                            this.socketSlot.sendUnSubScribe();
                            lobby.openGame(sender.getGameName());
                        }

                        //sender.openGame();

                    }

                }
                break;
        }
    },
    updateResultHall: function (result, prize, curentMoney, indexMenu) {
        this[gameListSlot[indexMenu].name].updateResult(result, prize, curentMoney);
    },
    updateAuto: function (autoKhoBau, autoNDV, autoSieuAnhHung, autoVuongQuocVin) {
        this.khobau.setStatusPlay(autoKhoBau);
        this.nudiepvien.setStatusPlay(autoNDV);
        this.sieuanhhung.setStatusPlay(autoSieuAnhHung);
        this.vuongquocvin.setStatusPlay(autoVuongQuocVin);

    },


    requestLoginHTTP: function (strLinks) {
        var jsonData = JSON.parse(xhr.responseText);
        if (jsonData["success"]) {
            var userLogin = new UserLogin();
            userLogin.parserResult(jsonData["user"]);
        }
    },

    funCreateAccount: function () {
        var str = this.tf_mat_khau_dk.getString();
        lobby.IsRegister = true;
        if (!this.checkKyTuSpecial(this.tf_user_name_dk.getString(), false)) {
            popup.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (!this.checkKyTuVN(this.tf_mat_khau_dk.getString())) {
            popup.openPanel_Alert_Lobby("Mật khẩu phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (str == "123456" || str == "abc123" || str == "ABC123" || str == "000000" || str == "111111" || str == "222222" ||
            str == "333333" || str == "444444" || str == "555555" || str == "666666" || str == "777777" || str == "888888" ||
            str == "999999") {
            popup.openPanel_Alert_Lobby("Mật khẩu quá đơn giản. Vui lòng nhập lại!");
        } else {
            this.s = "";
            this.isFBGG = false;
            var url = this.getUrlDangKy();
            if (url != null) {
                sendRequest(url, null, false, this.callBackDangKy, this.callBackError);
                showLoading();
            }
        }
    },
    funLogin: function () {
        if (this.isClickDangKy == false) {
            this.s = "";
            this.isFBGG = false;
            var url = this.getUrlLogin();
            if (url != null) {
                sendRequest(url, null, false, this.callBackLogIn, this.callBackError);
                showLoading();
            }

        } else {
            this.btn_chat.setVisible(false);
            this.btn_event.setVisible(false);
            this.pn_event.setVisible(true);
            lobby.pn_chat.setVisible(false);
            this.isClickDangKy = false;
            this.pDangKy.setVisible(false);
            this.pn_other.setVisible(true);
            this.pAccount.setVisible(true);
        }
    },
    funLoginWithOtp: function () {
        var otp = this.tf_login_otp.getString();
        if (otp == "" || otp.length < 5) {
            popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
        } else if (!this.checkKyTuSpecial(otp, false)) {
            popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
        } else {
            if (this.isFBGG == false) {
                var url = urlLoginWithOtp(this.userName, md5(this.passWord), otp, this.type_otp_login, lobby.platform);
                sendRequest(url, null, false, this.callBackLogIn, this.callBackError);
            } else {
                var url = urlLoginFB_GG_Otp(lobby.s, lobby.accessTokenFBGG, otp, this.type_otp_login, lobby.platform);
                sendRequest(url, null, false, this.callBackLogIn, this.callBackError);
            }
            lobby.btn_dang_nhap_otp.setEnabled(false);
        }
    },

    funSendInformationForgetPass: function () {
        var username = this.tf_username_for.getString();
        var captcha = this.tf_captcha_forget.getString();
        this.parserDataCaptcha();
        this.tf_captcha_forget.setString("");
        /*this.tf_captcha_forget.setPlaceHolder("Mã xác thực");
        this.tf_captcha_forget.setColor(cc.color("#7F7F7F"));
        this.tf_captcha_forget.runAction(cc.scaleTo(0.225, 1));*/
        if (username == null || username.length < 6 || username.length > 16) {
            popup.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (!this.checkKyTuSpecial(username, false)) {
            popup.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
        } else if (captcha == null) {
            popup.openPanel_Alert_Lobby("Bạn chưa nhập mã xác thực!");
        } else {
            var url = urlForgetPassword(username, captcha, lobby.idcaptcha);
            sendRequest(url, null, false, this.callBackInformationForgetPass, this.callBackError);
            this.save_username = username;
            this.btn_send_information.setEnabled(false);
        }
    },
    callBackInformationForgetPass: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        lobby.btn_send_information.setEnabled(true);
        if (errorCode == 1001) {
            popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        } else if (errorCode == 115) {
            popup.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        } else if (errorCode == 1005) {
            popup.openPanel_Alert_Lobby("Thông tin không hợp lệ!");
        } else if (errorCode == 2001) {
            popup.openPanel_Alert_Lobby("Hệ thống không hỗ trợ các tài khoản chưa cập nhật Nickname!");
        } else if (errorCode == 1022) {
            lobby.pn_otp_information.setVisible(false);
            lobby.pn_otp_thongbao.setVisible(true);
            lobby.content_bm.setVisible(false);
            lobby.content_no_bm.setVisible(true);
        } else if (errorCode == 1023) {
            lobby.pn_otp_information.setVisible(false);
            lobby.pn_otp_forget.setVisible(true);
        } else if (errorCode == 1026) {
            lobby.pn_otp_information.setVisible(false);
            lobby.pn_email_forget.setVisible(true);
        } else if (errorCode == 1027) {
            lobby.pn_otp_information.setVisible(false);
            lobby.pn_chose_email_otp.setVisible(true);
        }
        lobby.reloadLayout();
    },

    funSendEmailForGetPass: function () {
        var email = this.tf_input_email_for.getString();
        if (email == "") {
            popup.openPanel_Alert_Lobby("Bạn chưa nhập email đã dùng bảo mật tài khoản!");
        } else if (!lobby.checkNoiDungEmail(email)) {
            popup.openPanel_Alert_Lobby("Định dạng Email không hợp lệ!");
        } else {
            var url = urlSendEmailForgetPassword(this.save_username, email);
            sendRequest(url, null, false, this.callBackSendEmailForgetPass, this.callBackError);

            this.btn_send_email_forget.setEnabled(false);
        }
    },
    callBackSendEmailForgetPass: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        lobby.btn_send_email_forget.setEnabled(true);
        if (success) {
            lobby.pn_email_forget.setVisible(false);
            lobby.pn_otp_thongbao.setVisible(true);
            lobby.content_bm.setVisible(true);
            lobby.content_no_bm.setVisible(false);

            lobby.tf_input_email_for.setString("");
            lobby.tf_input_email_for.setPlaceHolder("Nhập Email:");
            lobby.tf_input_email_for.setColor(cc.color("#7F7F7F"));
            lobby.tf_input_email_for.runAction(cc.scaleTo(0.225, 1));
            lobby.btn_clear_email_forget.setVisible(true);

            lobby.btn_back_forget_pass.setVisible(false);
        } else {
            if (errorCode == 1001) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (errorCode == 103) {
                popup.openPanel_Alert_Lobby("Email nhập không đúng định dạng!");
            } else if (errorCode == 1028) {
                popup.openPanel_Alert_Lobby("Email nhập không phải là Email dùng để đăng ký!");
            } else if (errorCode == 1114) {
                popup.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }
        }
    },

    funSendOTPForgetPass: function () {
        var otp = this.tf_input_otp_for.getString();
        var lbtype = this.txt_otp_forget.getString();
        if (otp == "" || otp.length < 5) {
            popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
        } else if (!this.checkKyTuSpecial(otp, false)) {
            popup.openPanel_Alert_Lobby("Mã OTP gồm 6 ký tự!");
        } else {
            var type = 0;
            if (lbtype == "TELE OTP")
                type = 0;
            else
                type = 1;

            var url = urlOTP_ForgetPassword(this.save_username, otp, type);
            sendRequest(url, null, false, this.callBackOTPForgetPass, this.callBackError);
            this.btn_send_otp_forget.setEnabled(false);
        }
    },
    callBackOTPForgetPass: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        lobby.btn_send_otp_forget.setEnabled(true);
        if (success) {
            lobby.pn_otp_forget.setVisible(false);
            lobby.pn_otp_thongbao.setVisible(true);
            lobby.content_bm.setVisible(true);
            lobby.content_no_bm.setVisible(false);
            lobby.tf_username_for.setString("");

            lobby.tf_input_otp_for.setString("");

            lobby.btn_back_forget_pass.setVisible(false);

        } else {
            if (errorCode == 1001) {
                popup.openPanel_Alert_Lobby("Hệ thống tạm thời bị gián đoạn!");
            } else if (errorCode == 1008) {
                popup.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
            } else if (errorCode == 1021) {
                popup.openPanel_Alert_Lobby("Mã xác nhận đã hết hạn sử dụng!");
            } else if (errorCode == 1114) {
                popup.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }
        }
    },

    callBackError: function (response) {
    },

    parserDataCaptcha: function () {
        var url = urlGetCaptcha();
        sendRequest(url, null, false, lobby.callBackCaptcha, lobby.callBackError);
    },
    callBackCaptcha: function (response) {
        var jsonData = JSON.parse(response);
        lobby.idcaptcha = jsonData["id"];
        var img = "data:image/png;base64," + jsonData["img"];
        if (cc.sys.isNative) {
            var data = jsonData["img"];
            lobby.sp_ma_xac_nhan.initWithBase64(data);
            lobby.sp_show_captcha_for.initWithBase64(data);
        } else {
            cc.loader.loadImg(img, {isCrossOrigin: false}, function (err, img) {
                var texture2d = self._texture2d = new cc.Texture2D();
                texture2d.initWithElement(img);
                texture2d.handleLoadedTexture();
                lobby.sp_ma_xac_nhan.initWithTexture(texture2d);
                lobby.sp_show_captcha_for.initWithTexture(texture2d);

            });
        }
    },

    initAuth: function () {
        // gapi.load('auth2', function () {
        //     auth2 = gapi.auth2.init({
        //         client_id: '632901182605-t0p14rbls6h017jspnrd8fantpqb4ooi.apps.googleusercontent.com',
        //         cookiepolicy: 'single_host_origin'
        //         // Request scopes in addition to 'profile' and 'email'
        //         //scope: 'additional_scope'
        //     });
        // });
    },

    loginGG: function () {
        gapi.auth2.getAuthInstance().signIn().then(function () {
            lobby.accessTokenFBGG = gapi.auth2.getAuthInstance().currentUser.get().Zi.access_token;
            lobby.sendLoginFBGG(lobby.accessTokenFBGG);

        });

    },

    loginFB: function () {
        FB.login(function (response) {
            if (response.status === 'connected') {
                lobby.accessTokenFBGG = response.authResponse.accessToken;
                cc.log(lobby.accessTokenFBGG);
                lobby.sendLoginFBGG(lobby.accessTokenFBGG);

            } else if (response.status === 'not_authorized') {
                //document.getElementById('status').innerHTML = 'We are not logged in.'
            } else {
                //document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
            }
        });
    },
    getInfo: function () {
        FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function (response) {
            // document.getElementById('status').innerHTML = response.id;
        });
    },
    sendLoginFBGG: function (accessToken) {
        var url = urlLoginGGFB(lobby.s, accessToken, lobby.platform);
        sendRequest(url, null, false, this.callBackLogIn, this.callBackError);
        showLoading();
    },

    onGetAcsessToken: function (socialID, data) {
        var obj = JSON.parse(data);
        var token = "";
        if (obj["error"] == 0) {
            token = obj["token"];
            if (token == null || token == undefined) {
                token = obj["access_token"];
            }
            lobby.accessTokenFBGG = token;
            lobby.sendLoginFBGG(token);
            sceneMgr.addLoading("Đang đăng nhập, vui lòng chờ xíu...");
        } else {
            GameToast.makeToast(2, "Xảy ra lỗi khi đăng nhập, vui lòng thử lại...", lobby);
        }
    },

    updateUserInFo: function () {
        if (this.userInfo != null) {
        }
    },

    updateMoney: function (currentMoney, moneyType) {


        if (this.userInfo != null && this.userInfo.vinTotal != null && this.userInfo.xuTotal != null) {
            var event = new cc.EventCustom("updateMoney");
            event.setUserData("updateTien");
            event.currentMoney = currentMoney;
            event.moneyType = moneyType;
            cc.eventManager.dispatchEvent(event);

            if (moneyType == MONEY_VIN) {
                this.userInfo.vinTotal = currentMoney;


            } else {
                this.userInfo.xuTotal = currentMoney;
            }
            menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(this.userInfo.vinTotal)));
            menutab.lb_blance_xu.setString(formatMoney(0, 3, parseInt(this.userInfo.xuTotal)));
            menutab.changeFontMoney();
        }
    },

    callBackGetConfig: function (response) {

        var jsonData = JSON.parse(response);
        userGameData.setItem("current_game_config", response);
        lobby.appConfig = jsonData;

        // cc.log(jsonData);
        // useTCP = lobby.appConfig.isTcp;
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            if (parseInt(ConnectNative.versionCode()) < 10) {
                lobby.recharge = 0;
                lobby.cashout = 0;
            } else {
                lobby.recharge = jsonData["recharge"];
                lobby.cashout = jsonData["cashout"];
            }
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            try {
                if (ConnectNative.versionCode() == "1.3") {
                    lobby.recharge = 1;
                    lobby.cashout = 1;
                } else {
                    lobby.recharge = jsonData["recharge"];
                    lobby.cashout = jsonData["cashout"];
                }
            } catch (err) {
                lobby.recharge = jsonData["recharge"];
                lobby.cashout = jsonData["cashout"];
            }
        } else {
            lobby.recharge = jsonData["recharge"];
            lobby.cashout = jsonData["cashout"];
        }

        // payment facebook
        if (lobby.facebook_canvas == true) {
            lobby.payment_fb = jsonData["payment_fb"];
            if (lobby.payment_fb == 1) {
                lobby.recharge = 1;
                lobby.cashout = 1;
            } else {
                lobby.recharge = jsonData["recharge"];
                lobby.cashout = jsonData["cashout"];
            }
        }

        lobby.arrayBanner = jsonData["banner"];
        if (lobby.arrayBanner != "") {
            if (CURRENT_MODE == MODE_DEPLOY.LIVE) {
                lobby.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(lobby.EffectChangeBanner, lobby)));
            }
        }

        lobby.status_game = jsonData["status_game"];

        if (lobby.status_game == 0 || lobby.status_game == 1) {
            // chay binh thuong
        } else {
            lobby.pn_baotriHeThong.setScale(1);
            lobby.runEffectBaotri();

        }
        lobby.call_common = jsonData["call_common"];
        if (lobby.call_common != 0) {
            sendRequest(urlGetConfigCommon(), null, false, lobby.callBackGetConfigCommon, lobby.callBackError);
        }
        if (CURRENT_MODE == MODE_DEPLOY.LIVE || CURRENT_MODE == MODE_DEPLOY.LOCAL || CURRENT_MODE == MODE_DEPLOY.TEST) {
            if (lobby.facebook_canvas) {
                lobby.s = "fb";
                lobby.isFBGG = true;
                lobby.loginFB();
            } else {
                /// login khi dang ky o landing
                if (!cc.sys.isNative) {
                    var facebookcanvas = window.location.href;
                    if (facebookcanvas.search("a=") != -1) {
                        var vt = facebookcanvas.search("a=");
                        var nx = facebookcanvas.search("&b");
                        var username = facebookcanvas.substring(vt + 2, nx);
                        username = Jacob__Codec__Base64__decode(username);
                        cc.log("username : " + username);

                        var pass = facebookcanvas.substring(nx + 3, facebookcanvas.length);
                        cc.log("pass : " + pass);
                        pass = Jacob__Codec__Base64__decode(pass);
                        lobby.userName = username;
                        lobby.passWordMD5 = pass;
                        var url = urlLogin(username, pass, lobby.platform);
                        sendRequest(url, null, false, lobby.callBackLogIn, lobby.callBackError);
                        userGameData.removeItem("current_user_info_login");
                    }
                }
                var data = userGameData.getItem("current_user_info_login");
                if (data != null && data != undefined) {
                    lobby.loginAccessToken(data);
                }
            }

        }
    },

    callBackGetConfigCommon: function (response) {
        var jsonData = JSON.parse(response);

        lobby.lb_hotline.setString("Hotline: " + jsonData["hotline"]);
        lobby.txt_tongdai.setString(jsonData["hotline"]);
        lobby.tx_tongdai_info.setString(jsonData["hotline"]);
        lobby.txt_dauso_forget.setString(jsonData["sms_otp"]);
        lobby.txt_dauso_login_otp.setString(jsonData["sms_otp"]);

        lobby.linkFanpage = jsonData["facebook"];
        lobby.phone = jsonData["hotline"];
        lobby.sms_otp = jsonData["sms_otp"];
        lobby.web = jsonData["web"];
    },

    runEffectBaotri: function () {
        var seq1 = new cc.sequence(cc.delayTime(0.5), cc.callFunc(function () {
            lobby.tx_cham1.setVisible(true);
        }), cc.delayTime(0.5), cc.callFunc(function () {
            lobby.tx_cham2.setVisible(true);
        }), cc.delayTime(0.5), cc.callFunc(function () {
            lobby.tx_cham3.setVisible(true);
        }), cc.delayTime(0.5), cc.callFunc(function () {
            lobby.tx_chamthan.setVisible(true);
            var rotate = new cc.RotateBy(3.5, 1440);
            lobby.tx_chamthan.runAction(cc.sequence(rotate, cc.callFunc(function () {
                lobby.tx_cham1.setVisible(false);
                lobby.tx_cham2.setVisible(false);
                lobby.tx_cham3.setVisible(false);
                lobby.tx_chamthan.setVisible(false);
            }), cc.callFunc(lobby.runEffectBaotri, lobby)));
        }));
        this.pn_baotriHeThong.runAction(seq1);
    },

    getConfigByType: function (type) {
        var config;
        switch (type) {
            case GameList.SamSoLo:
            case GameList.SamThuong:
                config = lobby.appConfig.sam;
                break;
            case GameList.BaCay:
                config = lobby.appConfig.bacay;
                break;
            case GameList.MauBinh:
            case GameList.MauBinhTinhAt:
                config = lobby.appConfig.binh;
                break;
            case GameList.TienLenSoLo:
            case GameList.TienLenThuong:
                config = lobby.appConfig.tlmn;
                break;
            case GameList.BaiCao:
                config = lobby.appConfig.baicao;
                break;
            case GameList.SlotKhoBau:
                config = lobby.appConfig.khobau;
                break;
            case GameList.NuDiepVien:
                config = lobby.appConfig.khobau;
                break;
            case GameList.Poker:
                config = lobby.appConfig.poker;
                break;
            case GameList.Lieng:
                config = lobby.appConfig.lieng;
                break;
            case GameList.Avenger:
                config = lobby.appConfig.khobau;
                break;
            case GameList.CoCaro:
                config = lobby.appConfig.caro;
                break;
            case GameList.XiZach:
                config = lobby.appConfig.xidzach;
                break;
            case GameList.CoTuong:
                config = lobby.appConfig.cotuong;
                break;
            case GameList.CoUp:
                config = lobby.appConfig.coup;
                break;
            case GameList.XocDia:
                config = lobby.appConfig.xocdia;
                break;
        }
        return config;
    },

    loginAccessToken: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if (success) {
            var sessionKey = jsonData["sessionKey"];
            var userData = JSON.parse(Jacob__Codec__Base64__decode(sessionKey));
            lobby.userInfo = userData;
            lobby.userInfo.accessToken = jsonData["accessToken"];
            accessTokenUrl = lobby.userInfo.accessToken;
            var url = urlLoginAcccessToken(lobby.userInfo.nickname, lobby.userInfo.accessToken, lobby.platform);
            this.isLoginAccessToken = true;
            sendRequest(url, null, false, this.callBackLogIn, this.callBackError);


        }

    },

    callBackLogIn: function (response) {
        var jsonData = JSON.parse(response);
        //cc.log("login : " + response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        lobby.btn_dang_nhap_otp.setEnabled(true);
        closeLoading();
        if (success) {
            if (lobby.isLoginAccessToken) {
                lobby.isLoginAccessToken = false;
            }
            userGameData.setItem("current_user_info_login", response);
            if (lobby.save_username != "")
                userGameData.setItem("current_username", lobby.save_username);
            var sessionKey = jsonData["sessionKey"];
            var userData = JSON.parse(Jacob__Codec__Base64__decode(sessionKey));
            //cc.log("respones: " + userData.toString());
            lobby.userInfo = new Object();
            lobby.userInfo.sessionKey = sessionKey;
            lobby.userInfo.nickname = userData["nickname"];
            lobby.userInfo.facebookId = userData["facebookId"];
            lobby.userInfo.vinTotal = userData["vinTotal"];
            lobby.userInfo.xuTotal = userData["xuTotal"];
            lobby.userInfo.vippoint = userData["vippoint"];
            lobby.userInfo.vippointSave = userData["vippointSave"];
            lobby.userInfo.createTime = userData["createTime"];
            lobby.userInfo.IP = userData["ipAddress"];
            lobby.userInfo.certificate = userData["certificate"];
            lobby.userInfo.birthday = userData["birthday"];
            lobby.userInfo.luckyRotate = userData["luckyRotate"];
            lobby.userInfo.sessionKeyId = userData["sessionKeyId"];
            lobby.userInfo.accessToken = jsonData["accessToken"];
            lobby.userInfo.avatar = userData["avatar"];
            if (lobby.userInfo.avatar == null || lobby.userInfo.avatar == "")
                lobby.userInfo.avatar = "0";

            lobby.userInfo.username = "";
            lobby.userInfo.identification = "";
            lobby.userInfo.email = "";
            lobby.userInfo.mobile = "";
            lobby.userInfo.mobileSecurity = userData["mobileSecure"];

            accessTokenUrl = lobby.userInfo.accessToken;
            // thuong xuyen bat payment khi duyet
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (parseInt(ConnectNative.versionCode()) < 10) {
                    lobby.semi_recharge = lobby.recharge;
                    lobby.semi_cashout = lobby.cashout;
                } else {
                    if (lobby.userInfo.mobileSecurity == 0) {
                        lobby.semi_recharge = 1;
                        lobby.semi_cashout = 1;
                        lobby.btn_vipcode.setVisible(false);
                    } else {
                        lobby.btn_vipcode.setVisible(true);
                        if (lobby.recharge == 0)
                            lobby.semi_recharge = 0;
                        else
                            lobby.semi_recharge = 1;

                        if (lobby.cashout == 0)
                            lobby.semi_cashout = 0;
                        else
                            lobby.semi_cashout = 1;
                    }
                }
            } else {
                lobby.semi_recharge = lobby.recharge;
                lobby.semi_cashout = lobby.cashout;
            }

            lobby.userInfo.emailSecurity = "";
            lobby.userInfo.appSecurity = "";
            lobby.userInfo.loginSecure = "";
            lobby.userInfo.moneyLoginOtp = "";
            lobby.userInfo.moneyUse = "";
            lobby.userInfo.safe = "";
            lobby.userInfo.configGame = "";

            lobby.savePassword = lobby.tf_pass_tab.getString();
            lobby.tf_user_name_tab.setString("");
            lobby.tf_pass_tab.setString("");

            lobby.pDangKy.setVisible(false);
            lobby.pAccount.setVisible(true);

            //show Layer info
            //lobby.updateUserInFo();

            loadResoureGame(g_resources_mn, Minigame, function () {
                lobby.pLogin.setVisible(false);
                openMiniGame();
                openMenuTab();
            });
            lobby.btn_chat.setVisible(true);
            lobby.btn_event.setVisible(true);
            GameManager.getInstance().openPlayingGame();
            //lobby.pn_chat_event.setVisible(true);
            lobby.btn_chat.setVisible(true);
            lobby.btn_event.setVisible(true);
            lobby.pn_event.setVisible(true);
            lobby.pn_chat.setVisible(false);

            lobby.pn_login_otp.setVisible(false);
            lobby.pn_login_otp.runAction(cc.scaleTo(0, 0));

            lobby.tf_login_otp.setString("");
            lobby.tf_login_otp.setPlaceHolder("Nhập mã xác thực");
            lobby.tf_login_otp.setColor(cc.color("#7F7F7F"));
            lobby.tf_login_otp.runAction(cc.scaleTo(0.225, 1));
            lobby.shadow.setVisible(true);

            lobby.islogin = true;

            lobby.btn_chuyen_menu.setVisible(true);
            var randomMenu = gameUtility.getRandomInt(0, 2);
            if (randomMenu == 0) {
                lobby.isMenuSlots = false;
            } else {
                lobby.isMenuSlots = true;
            }
            lobby.chuyenMenu();
        } else {
            lobby.AlertLogin = true;
            if (lobby.isLoginAccessToken) {
                lobby.isLoginAccessToken = false;
            } else {
                if (errorCode == 1001) {
                    popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                }
                if (errorCode == 1005) {
                    popup.openPanel_Alert_Lobby("Thông tin đăng nhập không hợp lệ!");
                }
                if (errorCode == 1007) {
                    popup.openPanel_Alert_Lobby("Thông tin đăng nhập không hợp lệ!");
                }
                if (errorCode == 1109) {
                    popup.openPanel_Alert_Lobby("Tài khoản đang bị khóa!");
                }
                if (errorCode == 2001) {
                    lobby.pDangKy.setVisible(false);
                    lobby.pTaoNhanVat.setVisible(true);
                    lobby.reloadLayout();
                    lobby.pAccount.setVisible(false);
                    lobby.pLogin.setVisible(false);
                    //lobby.pn_chat_event.setVisible(false);
                    lobby.AlertLogin = false;
                }
                if (errorCode == 1012) {
                    lobby.pn_login_otp.setVisible(true);
                    lobby.pn_login_otp.runAction(cc.scaleTo(0.2, 1));
                }
                if (errorCode == 1008) {
                    popup.openPanel_Alert_Lobby("Mã xác thực không chính xác!");
                }
                if (errorCode == 1021) {
                    popup.openPanel_Alert_Lobby("Mã xác thực đã hết thời gian sử dụng!");
                }
                if (errorCode == 1114) {
                    popup.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
                }
                if (errorCode == 1014 || errorCode == 1015) {
                    lobby.AlertLogin = false;
                    lobby.AlertLogin = false;
                }
            }

        }
    },
    openSlotsKhoBaut: function (type) {
        loadResoureGame(g_resources_slots_kho_bau, slotKhoBau, function () {
            showLoading();
            gameData.setGameType(type);
            GameManager.getInstance().connectToGameServer(type);
        }.bind(this));
    },
    callBackError: function (response) {
        closeLoading();
        lobby.btn_dang_nhap_otp.setEnabled(true);
    },

    getUrlLogin: function () {
        var user = this.tf_user_name_tab.getString();
        var pass = this.tf_pass_tab.getString();
        lobby.save_username = user;
        if (user == null || user.length < 6) {
            popup.openPanel_Alert_Lobby("Bạn chưa nhập tên đăng nhập hoặc nhập sai tên đăng nhập!");
            lobby.AlertLogin = true;
            return null;
        }
        if (pass == null || pass.length < 6) {
            popup.openPanel_Alert_Lobby("Bạn chưa nhập mật khẩu hoặc nhập sai mật khẩu!");
            lobby.AlertLogin = true;
            return null;
        }

        this.userName = user;
        this.passWord = pass;
        pass = md5(pass);
        var url = urlLogin(user, pass, lobby.platform);
        return url;

    },
    callBackDangKy: function (response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if (success) {
            var userName = lobby.tf_user_name_dk.getString();
            var pass = lobby.tf_mat_khau_dk.getString();
            if (userName != "")
                userGameData.setItem("current_username", userName);
            lobby.savePassword = pass;
            pass = md5(pass);
            var url = urlLogin(userName, pass, lobby.platform);
            sendRequest(url, null, false, lobby.callBackLogIn, lobby.callBackError);
            lobby.pTaoNhanVat.setVisible(true);
            lobby.tf_user_name_dk.setString("");
            lobby.tf_nhap_lai_mk_dk.setString("");
            lobby.tf_ma_xac_nhan_dk.setString("");
            lobby.tf_mat_khau_dk.setString("");
            lobby.shadow.setVisible(true);
            lobby.reloadLayout();
        } else {
            lobby.parserDataCaptcha();
            closeLoading();
            if (errorCode == 1001) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
            if (errorCode == 101) {
                popup.openPanel_Alert_Lobby("UserName không hợp lệ!");
            }
            if (errorCode == 1006) {
                popup.openPanel_Alert_Lobby("UserName đã tồn tại!");
            }
            if (errorCode == 102) {
                popup.openPanel_Alert_Lobby("Password không đúng!");
            }
            if (errorCode == 108) {
                popup.openPanel_Alert_Lobby("Password phải khác UserName!");
            }
            if (errorCode == 115) {
                popup.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
            }
            if (errorCode == 1114) {
                popup.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }

        }
    },
    callBackUpdateNickName: function (response) {
        var jsonData = JSON.parse(response);

        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if (success) {
            userGameData.setItem("current_user_info_login", response);
            var sessionKey = jsonData["sessionKey"];
            var userData = JSON.parse(Jacob__Codec__Base64__decode(sessionKey));
            lobby.userInfo = new Object();
            lobby.userInfo.sessionKey = sessionKey;
            lobby.userInfo.nickname = userData["nickname"];
            lobby.userInfo.facebookId = userData["facebookId"];
            lobby.userInfo.vinTotal = userData["vinTotal"];
            lobby.userInfo.xuTotal = userData["xuTotal"];
            lobby.userInfo.vippoint = userData["vippoint"];
            lobby.userInfo.vippointSave = userData["vippointSave"];
            lobby.userInfo.createTime = userData["createTime"];
            lobby.userInfo.IP = userData["ipAddress"];
            lobby.userInfo.avatar = userData["avatar"];
            lobby.userInfo.certificate = userData["certificate"];
            lobby.userInfo.birthday = userData["birthday"];
            lobby.userInfo.luckyRotate = userData["luckyRotate"];
            lobby.userInfo.sessionKeyId = userData["sessionKeyId"];
            lobby.userInfo.accessToken = jsonData["accessToken"];
            accessTokenUrl = lobby.userInfo.accessToken;
            if (lobby.userInfo.avatar == null || lobby.userInfo.avatar == "")
                lobby.userInfo.avatar = 0;

            lobby.userInfo.username = "";
            lobby.userInfo.identification = "";
            lobby.userInfo.email = "";
            lobby.userInfo.mobile = "";
            lobby.userInfo.mobileSecurity = userData["mobileSecure"];
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                if (parseInt(ConnectNative.versionCode()) < 10) {
                    lobby.semi_recharge = lobby.recharge;
                    lobby.semi_cashout = lobby.cashout;
                } else {
                    if (lobby.userInfo.mobileSecurity == 0) {
                        lobby.semi_recharge = 1;
                        lobby.semi_cashout = 1;
                        lobby.btn_vipcode.setVisible(false);
                    } else {
                        lobby.btn_vipcode.setVisible(true);
                        if (lobby.recharge == 0)
                            lobby.semi_recharge = 0;
                        else
                            lobby.semi_recharge = 1;

                        if (lobby.cashout == 0)
                            lobby.semi_cashout = 0;
                        else
                            lobby.semi_cashout = 1;
                    }
                }
            } else {
                lobby.semi_recharge = lobby.recharge;
                lobby.semi_cashout = lobby.cashout;
            }
            lobby.userInfo.emailSecurity = "";
            lobby.userInfo.appSecurity = "";
            lobby.userInfo.loginSecure = "";
            lobby.userInfo.moneyLoginOtp = "";
            lobby.userInfo.moneyUse = "";
            lobby.userInfo.safe = "";
            lobby.userInfo.configGame = "";

            if (cc.sys.isNative) {
                lobby.isNewUser = false;
            } else {
                lobby.isNewUser = true;
            }

            lobby.pDangKy.setVisible(false);
            lobby.pAccount.setVisible(false);
            lobby.pLogin.setVisible(false);
            lobby.tf_tao_ten_nhan_vat.setString("");
            lobby.tf_tao_ten_nhan_vat.setPlaceHolder("Tên nhân vật");
            lobby.pTaoNhanVat.setVisible(false);

            lobby.tf_user_name_tab.setString("");
            lobby.tf_pass_tab.setString("");

            // show info
            closeLoading();
            openMenuTab();
            lobby.updateUserInFo();
            lobby.pAccount.setVisible(true);
            openMiniGame();
            lobby.btn_chat.setVisible(true);
            lobby.btn_event.setVisible(true);
            lobby.pn_event.setVisible(true);
            lobby.pn_chat.setVisible(false);
            lobby.islogin = true;
            lobby.btn_chuyen_menu.setVisible(true);
        } else {
            if (errorCode == 1001) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            }
            if (errorCode == 1005) {
                popup.openPanel_Alert_Lobby("Tài khoản không tồn tại!");
            }
            if (errorCode == 1007) {
                popup.openPanel_Alert_Lobby("Password không đúng!");
            }
            if (errorCode == 1109) {
                popup.openPanel_Alert_Lobby("Tài khoản hiện đang bị khóa!");
            }
            if (errorCode == 106) {
                popup.openPanel_Alert_Lobby("NickName không hợp lệ!");
            }
            if (errorCode == 1010) {
                popup.openPanel_Alert_Lobby("NickName đã tồn tại!");
            }
            if (errorCode == 1011) {
                popup.openPanel_Alert_Lobby("NickName không được trùng với UserName!");
            }
            if (errorCode == 1006) {
                popup.openPanel_Alert_Lobby("Đã có NickName rồi!");
            }
            if (errorCode == 116) {
                popup.openPanel_Alert_Lobby("Không chọn NickName nhạy cảm!");
            }
            if (errorCode == 1114) {
                popup.openPanel_Alert_Lobby("Hệ thống đang bảo trì. Vui lòng quay trở lại sau!");
            }
        }
    },
    getUrlDangKy: function () {
        var userName = this.tf_user_name_dk.getString();
        var pass = this.tf_mat_khau_dk.getString();
        var repass = this.tf_nhap_lai_mk_dk.getString();
        var captcha = this.tf_ma_xac_nhan_dk.getString();
        // var address = this.tf_ma_xac_nhan_dk.getString();

        if (userName == null || userName.length < 6 || userName.length > 16) {
            popup.openPanel_Alert_Lobby("Tên đăng nhập trong khoảng từ 6 - 16 ký tự!");
            return null;
        }
        if (pass == null || pass.length < 6 || pass.length > 15) {
            popup.openPanel_Alert_Lobby("Password trong khoảng từ 6 - 16 ký tự!");
            return null;
        }
        if (pass == userName) {
            popup.openPanel_Alert_Lobby("Mật khẩu không được giống với Tên đăng nhập!");
            return null;
        }
        if (pass != repass) {
            popup.openPanel_Alert_Lobby("Nhập lại mật khẩu không giống mật khẩu!");
            return null;
        }
        if (lobby.cb_dong_y.isSelected() == false) {
            popup.openPanel_Alert_Lobby("Hãy đọc và đồng ý với các điều khoản của Vinplay!");
            return null;
        }
        if (lobby.tf_ma_xac_nhan_dk.getString() == "" || lobby.tf_ma_xac_nhan_dk.getString() == null) {
            popup.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
        }

        this.userName = userName;
        this.passWord = pass;
        pass = md5(pass);

        return urlQuickRegiste(userName, pass, captcha, lobby.idcaptcha);
    },

    showLobby: function () {
        this.setVisible(true);
        menutab.showTopInfo();
    },

    onGetAccessToken: function (socialID, jsonData) {
        var obj = JSON.parse(jsonData);
        if (obj.error == 0) {
            var token = obj["access_token"];
        } else {
            // error
        }
    },
    logoutFBGG: function () {
        if (lobby.s == "gg") {
            // gapi.auth2.getAuthInstance().signOut();
            //gapi.auth.signOut();
            // location.reload();
        }
    },

    checkKyTuSpecial: function (value, nickname) {
        value = value.toLowerCase();
        for (var i = 0; i < value.length; i++) {
            var kt = value[i];
            var str = this.listCheck.split(',');
            for (j = 0; j < str.length; j++) {
                if (kt == str[j]) {
                    return false;
                }
            }
            if (kt == ",") {
                return false;
            }
            if (kt == "\\") {
                return false;
            }
            if (nickname == false) {
                if (kt == "_") {
                    return false;
                }
            }
        }
        return true;
    },

    checkKyTuVN: function (value) {
        value = value.toLowerCase();
        for (var i = 0; i < value.length; i++) {
            var kt = value[i];
            var str = this.listCheckVN.split(',');
            for (j = 0; j < str.length; j++) {
                if (kt == str[j]) {
                    return false;
                }
            }
            if (kt == ",") {
                return false;
            }
            if (kt == "\\") {
                return false;
            }
        }
        return true;
    },

    checkNickNameNhayCam: function (value) {
        value = value.toLowerCase();
        var strInclude = this.listNickNameInclude.split(',');
        for (var i = 0; i < strInclude.length; i++) {
            if (value.search(strInclude[i].toLowerCase()) != -1) {
                return false;
            }
        }

        var strBegin = this.listNickNameBegin.split(',');
        for (var j = 0; j < strBegin.length; j++) {
            var str = strBegin[j].toLowerCase();
            if (value.length >= str.length) {
                if (value.substr(0, str.length) == str) {
                    return false;
                }
            }
        }
        return true;
    },

    checkNoiDungEmail: function (str) {
        str = str.toLowerCase();
        if (str.search("@") == -1) {
            return false;
        }
        return true;
    },

    resetTextfieldForgetPass: function () {
        lobby.tf_username_for.setString("");
        lobby.tf_username_for.setPlaceHolder("Nhập tên đăng nhập");
        lobby.tf_username_for.setColor(cc.color("#7F7F7F"));
        lobby.tf_username_for.runAction(cc.scaleTo(0.225, 1));

        lobby.tf_captcha_forget.setString("");
        lobby.tf_captcha_forget.setPlaceHolder("Mã xác thực");
        lobby.tf_captcha_forget.setColor(cc.color("#7F7F7F"));
        lobby.tf_captcha_forget.runAction(cc.scaleTo(0.225, 1));

        lobby.tf_input_email_for.setString("");
        lobby.tf_input_email_for.setPlaceHolder("Nhập Email:");
        lobby.tf_input_email_for.setColor(cc.color("#7F7F7F"));
        lobby.tf_input_email_for.runAction(cc.scaleTo(0.225, 1));

        lobby.tf_input_otp_for.setString("");
        lobby.tf_input_otp_for.setPlaceHolder("Nhập mã xác thực");
        lobby.tf_input_otp_for.setColor(cc.color("#7F7F7F"));
        lobby.tf_input_otp_for.runAction(cc.scaleTo(0.225, 1));

        lobby.tf_input_otp_for.setString("");
        lobby.tf_input_otp_for.setPlaceHolder("Nhập mã xác thực");
        lobby.tf_input_otp_for.setColor(cc.color("#7F7F7F"));
        lobby.tf_input_otp_for.runAction(cc.scaleTo(0.225, 1));
    },

    EffectChangeBanner: function () {
        if (CURRENT_MODE == MODE_DEPLOY.LOCAL) {
            var imageUrl = "http://localhost:81/images/banner_" + (this.sttBanner + 1) + ".png";
        } else if (CURRENT_MODE == MODE_DEPLOY.TEST) {
            var imageUrl = "http://localhost:81/images/banner_" + (this.sttBanner + 1) + ".png";
        } else {
            var imageUrl = "";
            if (!cc.sys.isNative)
                imageUrl = this.urlhref + "images/banner_" + (this.sttBanner + 1) + ".png";
            else {
                lobby.sp_banner.setTexture(res_Lobby + "/banner_2.png");
                //imageUrl = "http://vinplay.com/images/banner_" + (this.sttBanner + 1) + ".png";
                //if(cc.sys.isNative)
                //    imageUrl = "http://vinplay.com/images/banner_1.png";
            }
        }
        if (!cc.sys.isNative) {
            cc.textureCache.addImageAsync(imageUrl, function (texture) {
                lobby.setTextureBanner(texture);
            }, this);
        }
    },
    setTextureBanner: function (texture) {
        if (texture instanceof cc.Texture2D) {
            var fadein = cc.fadeIn(1);
            var fadeout = cc.fadeOut(1);
            var seq = cc.sequence(fadeout, cc.callFunc(function () {
                lobby.sp_banner.setTexture(texture);
            }), fadein, cc.delayTime(30), cc.callFunc(function () {
                lobby.EffectChangeBanner();
            }));
            lobby.sp_banner.runAction(seq);
            this.sttBanner = this.sttBanner + 1;
            if (this.sttBanner >= lobby.arrayBanner.length)
                this.sttBanner = 0;

            this.linkBanner = lobby.arrayBanner[this.sttBanner];
        } else {
            lobby.sp_banner.setTexture(res_Lobby + "/banner_1.png");
            var seq = cc.sequence(cc.delayTime(30), cc.callFunc(function () {
                lobby.EffectChangeBanner();
            }));
            lobby.sp_banner.runAction(seq);
        }
    },

    addJackpotGame: function (value) {
        var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        for (var i = 0; i < this.arrBtnMenu.length; i++) {
            if (this.arrBtnMenu[i].getChildByName("hu_game_" + i) == null) {
                var aSprite1 = new cc.Sprite();
                aSprite1.initWithSpriteFrameName(res_Lobby + "/icon_hu_sanh.png");
                aSprite1.setAnchorPoint(cc.p(0, 0));
                aSprite1.setPosition(cc.p(120, 120));
                this.arrBtnMenu[i].addChild(aSprite1);

                var lbtime = new cc.LabelTTF('', fonts.fontName, 14, cc.size(96, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtime.setPosition(cc.p(53, 42));
                lbtime.setString("00:00:00");
                aSprite1.addChild(lbtime);
                aSprite1.setVisible(false);
                aSprite1.mapGame = parseInt(mapTagToGameType["" + i]);

                this.array_Pot.push(aSprite1);
                this.array_txt_Pot.push(lbtime);
            }
        }
    },
    removeJackpotGame: function (value) {
        for (var i = 0; i < this.arrBtnMenu.length; i++) {
            if (value == i) {
                if (this.arrBtnMenu[i].getChildByName("hu_game_" + i) != null) {
                    this.arrBtnMenu[i].removeAllChildren();
                }
            }
        }
    },

    editBoxEditingDidBegin: function (editBox) {
        if (editBox.getName() == "editbox_chat") {
            this.tf_chat_lobby.setPlaceHolder("");
            this.tf_chat_lobby.setFontName("Roboto-Regular");
            this.tf_chat_lobby.setPlaceholderFontName("Roboto-Regular");
        }
    },

    editBoxEditingDidEnd: function (editBox) {
        if (editBox.getName() == "editbox_chat") {
            if (editBox.getString() == "") {
                this.tf_chat_lobby.setPlaceHolder("Bạn cần " + this.minVipPoint + "VP để chat");
                this.tf_chat_lobby.setFontName("Roboto-Italic");
                this.tf_chat_lobby.setPlaceholderFontName("Roboto-Italic");
            }
        }
    },

    editBoxTextChanged: function (editBox, text) {
        var str = editBox.getString();
        if (editBox.getName() == "tf_input_email_for") {
            if (str != "")
                lobby.btn_clear_email_forget.setVisible(true);
            else
                lobby.btn_clear_email_forget.setVisible(false);
        } else if (editBox.getName() == "tf_tao_ten_nhan_vat") {
            if (str != "")
                lobby.btn_clear_nick.setVisible(true);
            else
                lobby.btn_clear_nick.setVisible(false);
        }
        //cc.log("enter "+ text);
    },

    editBoxReturn: function (editBox) {
        if (!cc.sys.isNative) {
            if (editBox == this.tf_chat_lobby) {
                lobby.funSendChat();
            } else if (editBox == this.tf_user_name_tab || editBox == this.tf_pass_tab)
                lobby.funLogin();
            else if (editBox == this.tf_user_name_dk || editBox == this.tf_mat_khau_dk || editBox == this.tf_nhap_lai_mk_dk || editBox == this.tf_ma_xac_nhan_dk)
                lobby.funCreateAccount();
        }
        //cc.log("enter");
        return;
    },

    funSubcribleChat: function () {
        if (ischeckPosition == false && menutab.isHuOverChat == false) {
            this.tf_chat_lobby.setVisible(true);
        }
        if (Minigame.isLoginSocket) {
            this.pn_event.setVisible(false);
            this.pn_chat.setVisible(true);
            this.isOpenChat = true;
            var chat = new CmdSendSubcribleChat();
            chat.putSubcribleChat();
            Minigame.miniGameClient.send(chat);
            chat.clean();
        } else {
            popup.openPanel_Alert_Lobby("Không thể kết nối tới phòng Chat!");
            Minigame.connectSocket();
        }
    },
    funUnSubcribleChat: function () {
        this.tf_chat_lobby.setVisible(false);
        if (Minigame.isLoginSocket) {
            var chat = new CmdSendUnSubcribleChat();
            chat.putUnSubcribleChat();
            Minigame.miniGameClient.send(chat);
            chat.clean();
        }
    },

    funSendChat: function () {
        if (this.isDaiLy == true) {
            this.AddThongBaoChat("*** Bạn không có quyền Chat!");
            lobby.tf_chat_lobby.setString("");
            lobby.tf_chat_lobby.setPlaceHolder("Bạn cần " + lobby.minVipPoint + "VP để chat");
            lobby.tf_chat_lobby.setFontName("Roboto-Italic");
            lobby.tf_chat_lobby.setPlaceholderFontName("Roboto-Italic");
            return;
        } else if (this.isBanVinhvien == true) {
            this.AddThongBaoChat("*** Bạn bị cấm Chat vĩnh viễn!");
            lobby.tf_chat_lobby.setString("");
            lobby.tf_chat_lobby.setPlaceHolder("Bạn cần " + lobby.minVipPoint + "VP để chat");
            lobby.tf_chat_lobby.setFontName("Roboto-Italic");
            lobby.tf_chat_lobby.setPlaceholderFontName("Roboto-Italic");
            return;
        }

        var noi_dung = this.tf_chat_lobby.getString();
        if (noi_dung.trim() == "" || noi_dung.trim() == null) {
            return
        } else if (lobby.isBlockChat == true) {
            this.AddThongBaoChat("*** Bạn Chat quá nhanh!");
            return;
        } else {
            if (Minigame.isLoginSocket) {
                var chat = new CmdSendChat();
                chat.putChat(this.encode_utf8(noi_dung.trim()));
                Minigame.miniGameClient.send(chat);
                chat.clean();
                lobby.tf_chat_lobby.setString("");
                lobby.tf_chat_lobby.setPlaceHolder("Bạn cần " + lobby.minVipPoint + "VP để chat");
                lobby.tf_chat_lobby.setFontName("Roboto-Italic");
                lobby.tf_chat_lobby.setPlaceholderFontName("Roboto-Italic");

                lobby.isBlockChat = true;
                lobby.lv_content_chat.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                    lobby.isBlockChat = false;
                })));
            } else {
                this.AddThongBaoChat("*** Không thể kết nối tới phòng Chat!");
            }
        }
    },

    AddThongBaoChat: function (str) {
        var fontItalic = {fontName: "Roboto-Italic", src: [{src: "res/Font/Roboto-Italic.ttf", type: "truetype"}]};
        var content = new cc.LabelTTF(str, fontItalic.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        content.setPosition(cc.p((content.width / 2) + 5, (content.height / 2) + 2));
        content.setColor(cc.color("#FF0000"));
        var cl1 = new ccui.Layout();
        cl1.height = content.height + 5;
        cl1.width = 210;
        cl1.addChild(content);
        this.lv_content_chat.pushBackCustomItem(cl1);
        if (this.numberItemInListView < 100) {
            this.numberItemInListView = this.numberItemInListView + 1;
        } else {
            this.lv_content_chat.removeItem(0);
        }
        this.lv_content_chat.jumpToBottom();
    },

    encode_utf8: function (s) {
        return unescape(encodeURIComponent(s));
    },

    funCheckListBan: function (str) {
        var noi_dung = " " + str;
        var noi_dung_low = noi_dung.toLowerCase();

        var str = this.listBanChat.split(',');
        for (var i = 0; i < str.length; i++) {
            if (noi_dung_low.search(str[i].toLowerCase()) != -1) {
                var vitri = noi_dung_low.search(str[i].toLowerCase());
                var start = noi_dung.substr(0, vitri);
                var end = noi_dung.substr((vitri + str[i].length), noi_dung.length);
                noi_dung = start + "***" + end;
                noi_dung_low = noi_dung.toLowerCase();
            }
        }
        return noi_dung;
    },

    responseSendChat: function (error, nicknames, message) {
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        var fontItalic = {fontName: "Roboto-Italic", src: [{src: "res/Font/Roboto-Italic.ttf", type: "truetype"}]};
        if (error == 0) {
            var txtnick = nicknames + ":";
            var nickname = new cc.LabelTTF(txtnick, fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            var lbgame = new cc.LabelTTF(this.funCheckListBan(message), fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            if (nicknames.toLowerCase() == "admin") {
                nickname.setColor(cc.color("#F30DF1"));
                lbgame.setColor(cc.color("#F8D9A1"));
            } else {
                nickname.setColor(cc.color("#ffe600"));
            }

            var cl1 = new ccui.Layout();
            cl1.height = nickname.height + 5 + lbgame.height;
            cl1.width = 210;
            nickname.setPosition(cc.p((nickname.width / 2) + 5, (lbgame.height) + (nickname.height / 2)));
            lbgame.setPosition(cc.p((lbgame.width / 2) + 5, (nickname.y - (nickname.height / 2) - (lbgame.height / 2))));

            var cellList = null;
            cellList = new cc.LayerColor(cc.color(57, 72, 138, 100));
            //cellList.setBackGroundColorOpacity(50);
            cellList.height = lbgame.height;
            cellList.width = lbgame.width + 4;
            cellList.setPosition(cc.p(lbgame.x - (lbgame.width / 2) - 2, lbgame.y - (lbgame.height / 2)));
            var index1 = this.lv_content_chat.getIndex(this.lv_content_chat.getBottommostItemInCurrentView());
            //cl1.addChild(cellList);
            cl1.addChild(nickname);
            cl1.addChild(lbgame);
            this.lv_content_chat.pushBackCustomItem(cl1);


            if (this.numberItemInListView < 100) {
                this.numberItemInListView = this.numberItemInListView + 1;
            } else {
                this.lv_content_chat.removeItem(0);
            }
            if (this.lv_content_chat.getIndex(this.lv_content_chat.getBottommostItemInCurrentView()) < (this.numberItemInListView - 2)) {
                //this.lv_content_chat.setItemModel(this.lv_content_chat.getCenterItemInCurrentView());
                this.lv_content_chat.jumpToItem(index1, cc.p(0, 0), cc.p(0.5, 0.5));
            } else
                this.lv_content_chat.jumpToBottom();
        } else if (error == 2) {
            this.AddThongBaoChat("*** Bạn không có quyền Chat!");
        } else if (error == 3) {
            this.AddThongBaoChat("*** Tạm thời bạn bị cấm Chat!");
        } else if (error == 4) {
            this.AddThongBaoChat("*** Nội dung Chat quá dài!");
        }
    },

    responseLogChat: function (message, minVipPoint, timeBan, userType) {
        this.minVipPoint = minVipPoint;
        this.tf_chat_lobby.setPlaceHolder("Bạn cần " + minVipPoint + "VP để chat");
        this.lv_content_chat.removeAllItems();
        var logmessage = JSON.parse(message);
        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
        for (var i = 0; i < logmessage.length; i++) {
            var txtnick = logmessage[i].u + ":";
            var nickname = new cc.LabelTTF(txtnick, fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            var mes = logmessage[i].m;
            var lbgame = new cc.LabelTTF(this.funCheckListBan(mes), fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            if (logmessage[i].u.toLowerCase() == "admin") {
                nickname.setColor(cc.color("#F30DF1"));
                lbgame.setColor(cc.color("#F8D9A1"));
            } else {
                nickname.setColor(cc.color("#ffe600"));
            }

            var cl1 = new ccui.Layout();
            cl1.height = nickname.height + 5 + lbgame.height;
            cl1.width = 210;
            nickname.setPosition(cc.p((nickname.width / 2) + 5, (lbgame.height) + (nickname.height / 2)));
            lbgame.setPosition(cc.p((lbgame.width / 2) + 5, (nickname.y - (nickname.height / 2) - (lbgame.height / 2))));

            var cellList = null;
            cellList = new cc.LayerColor(cc.color(57, 72, 138, 100));
            cellList.height = lbgame.height;
            cellList.width = lbgame.width + 4;
            cellList.setPosition(cc.p(lbgame.x - (lbgame.width / 2) - 2, lbgame.y - (lbgame.height / 2)));

            //cl1.addChild(cellList);
            cl1.addChild(nickname);
            cl1.addChild(lbgame);
            this.lv_content_chat.pushBackCustomItem(cl1);

        }
        this.lv_content_chat.jumpToBottom();
        this.numberItemInListView = logmessage.length;

        if (userType == 0) {
            this.tf_chat_lobby.setMaxLength(50);
        } else if (userType == 100) {
            this.tf_chat_lobby.setMaxLength(250);
        } else {
            this.tf_chat_lobby.setMaxLength(50);
            this.isDaiLy = true;
        }
        if (timeBan < 0)
            this.isBanVinhvien = true;
        else if (timeBan > 0) {
            var newdate = new Date(timeBan);

            var year = newdate.getFullYear();
            var month = newdate.getMonth() + 1;
            var day = newdate.getDate();
            var seconds = newdate.getSeconds();
            var minute = newdate.getMinutes();
            var hour = newdate.getHours();

            var strday = "";
            var strmonth = "";
            var strhour = "";
            var strminute = "";
            var strsecond = "";

            if (Number(day) < 10)
                strday = "0" + day;
            else
                strday = day;
            if (Number(month) < 10)
                strmonth = "0" + month;
            else
                strmonth = month;
            if (Number(hour) < 10)
                strhour = "0" + hour;
            else
                strhour = hour;
            if (Number(minute) < 10)
                strminute = "0" + minute;
            else
                strminute = minute;
            if (Number(seconds) < 10)
                strsecond = "0" + seconds;
            else
                strsecond = seconds;

            var str = "Bạn bị cấm Chat đến " + strhour + ":" + strminute + ":" + strsecond + " " + strday + "/" + strmonth + "/" + year + " !"
            this.AddThongBaoChat(str);
        }
    },


    onPurchaseGG: function (errorCode, signedData, signature, purchaseData) {

        //popup.openPanel_Alert_Lobby("signedData: " + signedData + "\n signature : " + signature + "\n purchaseData: " + purchaseData);
        if (errorCode == 0) {
            if (Minigame.isLoginSocket) {
                var send_purchase = new CmdSendResultIAP();
                send_purchase.putResultIAP(signedData, signature);
                Minigame.miniGameClient.send(send_purchase);
                send_purchase.clean();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        } else {
            popup.openPanel_Alert_Lobby("Giao dịch bị gián đoạn!");
        }
    },

    CloseItemCallback: function (errorcode, message) {
        if (errorcode != 0) {
            popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
        }
    },

    responseCheckIAP: function (error) {
        if (error == 0) {
            iapManager.setTarget(lobby, lobby.onPurchaseGG.bind(lobby));
            iapManager.purchase(lobby.sku_iap, lobby.userInfo.nickname);
        } else if (error == 1) {
            popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
        } else if (error == 2) {
            popup.openPanel_Alert_Lobby("Quá hạn mức nạp tiền trong ngày. Bạn vui lòng quay lại sau!");
        }
    },

    responseResultIAP: function (error, sku, currentMoney) {
        if (error == 0) {
            popup.openPanel_Alert_Lobby("Nạp tiền thành công!");
            if (lobby.userInfo == null) {
            } else {
                lobby.userInfo.vinTotal = currentMoney;
                menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                menutab.changeFontMoney();
            }
        } else if (error == 1) {
            popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
        } else if (error == 2) {
            popup.openPanel_Alert_Lobby("Phiên giao dịch đã được xử lý!");
        }

        if (error == 0 || error == 2) {
            var strSku = "";
            if (sku == 1)
                strSku = IAPManager.SKU_1;
            else if (sku == 2)
                strSku = IAPManager.SKU_2;
            else if (sku == 3)
                strSku = IAPManager.SKU_3;
            else if (sku == 4)
                strSku = IAPManager.SKU_4;
            iapManager.setTarget(lobby, lobby.CloseItemCallback.bind(lobby));
            iapManager.closeItem(strSku);
        }
    },

    getRandomBanner: function (min, max) {
        var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        if (vRandom == 0) {
            this.funSubcribleChat();
        } else {
            this.pn_event.setVisible(true);
            this.pn_chat.setVisible(false);
            this.isOpenChat = false;
        }

    },

    changeTextFieldAsEditBox_Lobby: function (textfield, parent) {
        var namebox = textfield.getName();
        var placeHolder = textfield.getPlaceHolder();
        var fontsize = textfield.getFontSize();
        var maxlenght = textfield.getMaxLength();
        var tag = textfield.getLocalZOrder();
        textfield.removeFromParent(true);
        //textfield.setName("textfield_mobile");
        //textfield.setVisible(false);

        this.neweditbox = new cc.EditBox(cc.size(textfield.width, textfield.height + 10), cc.Scale9Sprite.create(), cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        this.neweditbox.setName(namebox);
        this.neweditbox.setAnchorPoint(cc.p(0.5, 0.5));
        this.neweditbox.setPosition(cc.p(textfield.x, textfield.y));
        this.neweditbox.setPlaceHolder(placeHolder);
        this.neweditbox.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.neweditbox.setFontName("Roboto-Regular");
        this.neweditbox.setPlaceholderFontName("Roboto-Regular");
        this.neweditbox.setFontSize(fontsize);
        this.neweditbox.setPlaceholderFontSize(fontsize);
        this.neweditbox.setPlaceholderFontColor(cc.color.GRAY);
        this.neweditbox.setFontColor(cc.color.BLACK);
        this.neweditbox.setDelegate(this);
        this.neweditbox.setMaxLength(maxlenght);
        parent.addChild(this.neweditbox, tag);
        this.neweditbox.setLocalZOrder(tag);
        return this.neweditbox;

    },

    reloadLayout: function () {
        lobby.btn_dayly.setVisible(false);
        lobby.btn_dayly.setVisible(true);
    },

    pauseItemGameListen: function () {
        for (var i = 0; i < g_resources_menu.length; i++) {
            if (i % 2 == 0) {
                if (lobby.lv_menu.getChildByName("LayerItem_" + i) != null) {
                    var layer = lobby.lv_menu.getChildByName("LayerItem_" + i)
                    var button = layer.getChildByName("Item_" + (i + 1));
                    if (i < g_resources_menu.length - 1)
                        cc.eventManager.pauseTarget(button, true);

                    var button2 = layer.getChildByName("Item_" + i);
                    cc.eventManager.pauseTarget(button2, true);
                }
            }
        }
    },
    resumeItemGameListen: function () {
        for (var i = 0; i < g_resources_menu.length; i++) {
            if (i % 2 == 0) {
                if (lobby.lv_menu.getChildByName("LayerItem_" + i) != null) {
                    var layer = lobby.lv_menu.getChildByName("LayerItem_" + i)
                    var button = layer.getChildByName("Item_" + (i + 1));
                    if (i < g_resources_menu.length - 1)
                        cc.eventManager.resumeTarget(button, true);

                    var button2 = layer.getChildByName("Item_" + i);
                    cc.eventManager.resumeTarget(button2, true);
                }
            }
        }
    },

    updatePotSlots: function (pots) {
        //var start = new Date().getTime();
        //
        //cc.log("Time Result Pot = " + (start - this.time));
        //this.time = start;
        var jsonData = JSON.parse(pots);
        if (jsonData) {
            for (var i = 0; i < gameListSlot.length; i++) {

                if (this[gameListSlot[i].name] && gameListSlot[i].isComingSoon == false) {
                    if (jsonData[this[gameListSlot[i].name].getNameSocket()]) {
                        this[gameListSlot[i].name].updatePot(jsonData[this[gameListSlot[i].name].getNameSocket()]);
                        //cc.log(gameListSlot[i].name + " = " + jsonData[this[gameListSlot[i].name].getNameSocket()].toString());
                    }
                }
            }
        }


        if (cc.sys.isNative) {
            var user = userGameData.getItem("current_username");
            if (user != null && user != undefined && user != "undefined" && user != "null" && user != "") {
                this.tf_user_name_tab.setString(user);
            }
        }

    },
})
LobbyLayer.SESSION_KEY = "";
LobbyLayer.BTN_LOGIN = 1;

LobbyLayer.BTN_NAP_VIN = 2;
LobbyLayer.BTN_NAP_XU = 3;
LobbyLayer.BTN_SERCURITY = 4;
LobbyLayer.BTN_EMAIL = 5;
LobbyLayer.BTN_SHOP = 6;
LobbyLayer.BTN_MENU = 7;
LobbyLayer.BTN_CHAT = 8;
LobbyLayer.BTN_BANNER = 26;

//
LobbyLayer.BTN_FACEBOOOK_TAB = 9;
LobbyLayer.BTN_GOOGLE_TAB = 10;
LobbyLayer.BTN_DANG_NHAP_TAB = 11;
LobbyLayer.BTN_DANG_KY_TAB = 12;
LobbyLayer.BTN_QUEN_MK = 13;

//
LobbyLayer.BTN_REFRSH = 14;
LobbyLayer.BTN_DANG_KY = 15;
LobbyLayer.BTN_DANG_KY_FACEBOOK = 16;
LobbyLayer.BTN_DANG_KY_GOOGLE = 17;
LobbyLayer.BTN_TAO_TEN_NHAN_VAT = 18;
LobbyLayer.BTN_CLEAR_NICKNAME = 27;
LobbyLayer.BTN_DIEUKHOAN_SD = 28;

LobbyLayer.BTN_CLOSE_PANEL_ALERT = 19;

LobbyLayer.BTN_CLOSE_PANEL_OTP = 20;
LobbyLayer.BTN_SELECT_OTP = 21;
LobbyLayer.BTN_LOGIN_OTP = 22;
LobbyLayer.BTN_CLOSE_PANEL_SELECT_OTP = 23;
LobbyLayer.BTN_SELECT_SMS_OTP = 24;
LobbyLayer.BTN_SELECT_APP_OTP = 25;
LobbyLayer.BTN_FANPAGE = 29;
LobbyLayer.BTN_TELEGRAM = 57;
LobbyLayer.BTN_CLOSE_FORGET_PASS = 30;
LobbyLayer.BTN_SHOW_OTP_FORGET = 31;
LobbyLayer.BTN_SEND_INFORMATION_FORGET = 32;
LobbyLayer.BTN_SEND_OTP_FORGET = 33;
LobbyLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET = 34;
LobbyLayer.BTN_SELECT_SMS_FORGET = 35;
LobbyLayer.BTN_SELECT_APP_FORGET = 36;
LobbyLayer.BTN_REFRESH_CAPTCHA_FORGET = 37;
LobbyLayer.BTN_SEND_EMAIL_FORGETPASS = 38;
LobbyLayer.BTN_CLEAR_EMAIL_FORGETPASS = 39;
LobbyLayer.BTN_BACK_FORGETPASS = 40;
LobbyLayer.BTN_CHOSE_EMAIL_PHONE = 41;
LobbyLayer.BTN_CLOSE_EMAIL_PHONE = 42;
LobbyLayer.BTN_SELECT_EMAIL = 43;
LobbyLayer.BTN_SELECT_PHONE = 44;
LobbyLayer.BTN_EMAIL_PHONE = 45;

LobbyLayer.BTN_DAILY = 46;
LobbyLayer.BTN_GIFTCODE = 47;
LobbyLayer.BTN_HOTRO = 48;
LobbyLayer.BTN_QUYDINH = 49;
LobbyLayer.BTN_NEWS = 55;

LobbyLayer.BTN_CLICK_EVENT = 50;
LobbyLayer.BTN_DANGNHAP_NGAY = 51;

LobbyLayer.BTN_ANDROID = 52;
LobbyLayer.BTN_IOS = 53;
LobbyLayer.BTN_WINDOWFONE = 54;

LobbyLayer.BTN_SEND_CHAT = 56;

LobbyLayer.hotLine = "19006896";
LobbyLayer.fanPage = "";
LobbyLayer.SMS_OTP = "";

Logout_lobby = function () {
    userGameData.removeItem("current_user_info_login");
    lobby.pLogin.setVisible(true);
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        lobby.btn_vipcode.setVisible(false);
    }
    //lobby.pTabQuanLyLobby.setVisible(false);
    //lobby.pRunEven.setVisible(false);
    //lobby.pn_other.setVisible(true);
    closeMiniGame();
    menutab.pAccount.setVisible(false);
    socialMgr.logout();
    if (cc.sys.isNative) {
        var user = userGameData.getItem("current_username");
        if (user != null && user != undefined && user != "undefined" && user != "null" && user != "") {
            lobby.tf_user_name_tab.setString(user);
        }
    }
    lobby.save_username = "";
    lobby.passWordMD5 = null;
};

checkVipPoint = function (value) {
    if (value <= 80) {
        menutab.lb_exp.setString("Đá");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/80");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 80);
    } else if (value > 80 && value <= 800) {
        menutab.lb_exp.setString("Đồng");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/800");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 800);
    } else if (value > 800 && value <= 4500) {
        menutab.lb_exp.setString("Bạc");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/4.500");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 4500);
    } else if (value > 4500 && value <= 8600) {
        menutab.lb_exp.setString("Vàng");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/8.600");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 8600);
    } else if (value > 8600 && value <= 12000) {
        menutab.lb_exp.setString("BK 1");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/12.000");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 12000);
    } else if (value > 12000 && value <= 50000) {
        menutab.lb_exp.setString("BK 2");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/50.000");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 50000);
    } else if (value > 50000 && value <= 100000) {
        menutab.lb_exp.setString("KC 1");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/100.000");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 100000);
    } else if (value > 100000 && value <= 200000) {
        menutab.lb_exp.setString("KC 2");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/200.000");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 200000);
    } else if (value > 200000) {
        menutab.lb_exp.setString("KC 3");
        menutab.lb_vip_lever.setString("VP : " + formatMoney(0, 3, parseInt(lobby.userInfo.vippointSave)) + "/1.000.000");
        lobby.percentVP = parseInt((lobby.userInfo.vippointSave * 100) / 1000000);
    }
};