var shopping_info = null;
var shopping_infoX = null;
var shopping_infoY = null;
var shopping_infoAppear = null;

var code_shopping_info = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_shopping_napvin = null;

            // panel shopping
            this.btn_back_shop = null;
            this.btn_close_shop = null;
            this.sp_nap_vin_shop = null;
            this.sp_nap_xu_shop = null;
            this.sp_tieu_vin_shop = null;
            this.btn_nap_vin_shop = null;
            this.btn_nap_xu_shop = null;
            this.btn_tieu_vin_shop = null;
            this.pn_nap_vin = null;
            this.pn_nap_the = null;
            this.pn_nap_banking = null;
            this.pn_nap_xu = null;
            this.pn_nha_mang = null;
            this.pn_dau_so_mobi = null;
            this.pn_tieu_vin = null;
            this.pn_mua_the_DT = null;
            this.pn_mua_the_game = null;
            this.pn_nap_tien_tra_truoc = null;
            this.btn_vinaphone = null;
            this.btn_mobilecard = null;
            this.btn_vietel = null;
            this.btn_zing_xu = null;
            this.btn_vcoin = null;
            this.btn_internet_banking = null;
            this.btn_vietnameMobile = null;
            this.btn_gate = null;

            this.kind_card_mobile = "";
            this.current_menu_shop = "napvin";
            this.pn_select_the = null;
            this.btn_select_the = null;
            this.lb_the_selected = null;
            this.btn_close_select_the = null;
            this.btn_select_vina = null;
            this.btn_select_mobi = null;
            this.btn_select_viettel = null;
            this.btn_select_zingxu = null;
            this.btn_select_vcoin = null;
            this.btn_select_vnMobile = null;
            this.btn_select_vBee = null;
            this.btn_select_Gate = null;
            this.btn_select_VinCard = null;
            this.tf_serial = null;
            this.tf_ma_the = null;
            this.btn_nap_the_dt = null;

            this.tf_money_vin = null;
            this.tf_money_again = null;
            this.lb_xu_nhan_duoc = null;
            this.btn_doi_xu = null;
            this.btn_mua_ma_the = null;
            this.btn_ma_the_game = null;
            this.btn_nap_tien_tra_truoc = null;
            this.btn_nap_tien_tra_sau = null;
            this.btn_chuyen_khoan = null;
            this.lb_mua_the_selected = null;
            this.btn_select_mua_the = null;
            this.pn_select_mua_the = null;
            this.tf_soluong_dt = null;
            this.tf_gia_ban_dt = null;
            this.sp_capcha_mua_the_dt = null;
            this.btn_tiep_tuc_mua_the_dt = null;
            this.btn_close_select_mua_the_dt = null;
            this.kind_mua_the_dt = "vina";
            this.menhgia_mua_the_dt = 0;
            this.btn_muathedt_vina = null;
            this.btn_muathedt_mobi = null;
            this.btn_muathedt_viettel = null;
            this.btn_muathedt_vnmobile = null;
            this.btn_muathedt_bee = null;

            this.lb_menhgia_dt = null;
            this.btn_menhgia_thedt = null;
            this.pn_menhgia_thedt = null;
            this.btn_close_menhgia_dt = null;

            this.lb_mua_the_game = null;
            this.lb_gia_ban_thegame = null;
            this.lb_menhgia_game = null;
            this.tf_soluong_thegame = null;
            this.btn_select_the_game = null;
            this.btn_menhgia_thegame = null;
            this.pn_menhgia_thegame = null;
            this.pn_select_the_game = null;
            this.btn_tiep_tuc_mua_thegame = null;
            this.kind_mua_the_game = "zingxu";
            this.menhgia_mua_the_game = 50;
            this.btn_close_select_thegame = null;
            this.btn_close_menhgia_game = null;
            this.kind_panel_shop = "";
            this.kind_nap_the_truoc_sau = "";
            this.btn_muathegame_zing = null;
            this.btn_muathegame_vcoin = null;
            this.btn_muathegame_gate = null;

            this.btn_nttt_select_loaithe = null;
            this.lb_nttt_loai_the = null;
            this.lb_dau_so_nttt = null;
            this.btn_dau_so_nttt = null;
            this.tf_phone_number_nttt = null;
            this.lb_gia_ban_nttt = null;
            this.btn_tiep_tuc_nttt = null;
            this.btn_close_dau_so_mobi = null;

            this.arrayVina = ["091", "094", "0123", "0125", "0127", "0129", "0124", "088"];
            this.arrayMobi = ["090", "093", "0121", "0122", "0126", "0128", "0120", "089"];
            this.arrayViettel = ["097", "098", "0165", "0166", "0167", "0168", "0169", "0164", "096", "0162", "0163", "086"];
            this.arrayBee = ["099", "0199"];
            this.arrayVnMobile = ["092", "0188", "0186"];


            this.isSameNickName = false;
            this.txt_content = null;
            this.provider = null;
            this.lb_check_daily = null;
            this.lb_sodu_kd_napxu = null;

            this.btn_clear_nickname_ck = null;
            this.btn_clear_nickname_again_ck = null;
            this.btn_clear_lydo = null;
            this.ischeckDaiLy = false;
            this.lb_tile_vin_to_xu = null;
            this.lb_tranfer_min = null;

            this.lv_gia_the_nap = null;
            this.lv_menhgia_doi_the_dt = null;
            this.sc_btn_homeNet = null;
            this.is_Vina = false;
            this.is_Mobile = false;
            this.is_Viettel = false;
            this.is_VietnamMobile = false;
            this.is_Bee = false;
            this.is_Zing = false;
            this.is_Gate = false;
            this.is_Vcoin = false;

            this.is_Buy_Vina = false;
            this.is_Buy_Mobile = false;
            this.is_Buy_Viettel = false;
            this.is_Buy_VietnamMobile = false;
            this.is_Buy_Bee = false;
            this.is_Buy_Zing = false;
            this.is_Buy_Gate = false;
            this.is_Buy_Vcoin = false;

            this.numberFail = null;
            this.numberFail_vinplay = null;
            this.numberFail_mega = null;

            this.btn_clear_serial = null;
            this.btn_clear_mathe = null;
            this.saveArray_mua_the_dt = [];
            this.saveArray_mua_the_game = [];
            this.saveArray_dauso = [];
            this.saveArray_nap_dt = [];
            this.positionY_muathedt = 186.97;
            this.positionY_muathegame = 186.97;
            this.positionY_dauso = 207;
            this.positionY_napdt = 187.15;
            this.dauso_chose = "";
            this.bg_pn_menhgia_thedt = null;
            this.bg_pn_menhgia_thegame = null;
            this.lb_sodu_kd_muathe_dt = null;
            this.lb_sodu_kd_muathe_game = null;
            this.iskindDoiThe = "";
            this.bg_pn_dau_so_mobi = null;
            this.homenetwork_nap_dt = 1;
            this.menhgia_nap_dt = 0;
            this.lb_sodu_kd_nap_dt = null;
            this.btn_clear_fone = null;
            this.lv_menhgia_nap_dt = null;
            this.txt_title_nap_dt = null;

            this.pn_menhgia_nap_dt = null;
            this.bg_pn_menhgia_nap_dt = null;
            this.btn_close_menhgia_nap_dt = null;
            this.btn_chon_muc_nap_dt = null;
            this.lb_menh_gia_nap_dt = null;
            this.save_fone_naptien = null;

            this.PosNapVinX = 167.08;
            this.PosNapVinY = 810.72;
            this.posHomeNetY = 326.47;
            this.posHome_tieuVinY = 120.47;
            this.posGame_tieuVinY = 120.47;
            this.bg_pn_select_the = null;
            this.bg_pn_nha_mang = null;
            this.bg_pn_select_the_game = null;

            this.lb_notice_muathe_dt = null;
            this.lb_notice_muathe_game = null;
            this.pn_notice_mua_the = null;
            this.pn_content = null;
            this.btn_xacnhan_muathe = null;
            this.soluong_muathe = null;
            this.NameCard = null;
            this.txt_napvin = null;
            this.txt_napxu = null;
            this.txt_tieuvin = null;
            this.txt_vin_1 = null;
            this.txt_vin_2 = null;
            this.txt_vin_3 = null;

            // panel bank
            this.btn_nap_vin_bank = null;
            this.txt_vin_nhan_bank = null;
            this.lb_chose_mg_bank = null;
            this.btn_chose_mg_bank = null;
            this.pn_menh_gia_bank = null;
            this.bg_pn_menh_gia_bank = null;
            this.btn_close_pn_mg_bank = null;
            this.lb_chose_bank = null;
            this.btn_chose_bank = null;
            this.pn_select_bank = null;
            this.bg_pn_select_bank = null;
            this.btn_close_pn_select_bank = null;
            this.lv_list_bank = null;
            this.save_select_bank = null;
            this.save_menhgia_bank = null;
            this.sc_bank = null;
            this.isfirtgetNapBank = false;
            this.isfirtgetConfigBilling = false;
            this.positionY_bank = 303;
            this.lb_notice_trasau = null;

            this.typeRechargeMobile = null;

            this.pn_in_app_purchase = null;
            this.btn_in_app_purchases = null;
            this.btn_inApp_1 = null;
            this.btn_inApp_2 = null;
            this.btn_inApp_3 = null;
            this.btn_inApp_4 = null;
            this.btn_inApp_5 = null;
            this.btn_inApp_6 = null;
            this.btn_inApp_7 = null;
            this.btn_inApp_8 = null;
            this.is_show_iap = false;

            this.btn_nap_sms = null;
            this.btn_nap_VinCard = null;

            this.pn_vinplus = null;
            this.btn_vinplus = null;
            this.txt_ratio_bank = null;

            // nap vin sms
            this.pn_vin_from_sms = null;
            this.pn_chose_menh_gia = null;
            this.pn_nha_mang_sms = null;
            this.pn_cu_phap_sms = null;
            this.txt_nha_mang_sms = null;
            this.btn_nha_mang_sms = null;

            this.bg_chose_homenet_sms = null;
            this.btn_nha_mang_vietel = null;
            this.btn_nha_mang_vina = null;
            this.btn_nha_mang_mobi = null;
            this.btn_nha_mang_vnmobile = null;
            this.btn_nha_mang_beeline = null;
            this.btn_close_pn_nha_mang = null;
            this.homenetwork_sms = "";
            this.menhgia_sms = 0;
            this.dauso_sms_viettel = "";
            this.dauso_sms_vina = "";
            this.dauso_sms_mobi = "";

            this.pn_9029 = null;
            this.pn_8x98 = null;
            this.txt_menhgia_sms = null;
            this.btn_chose_menhgia_sms = null;
            this.txt_vin_sms_plus = null;
            this.btn_send_sms_plus = null;
            this.lv_9029 = null;
            this.lv_8x98 = null;
            this.bg_pn_9029 = null;
            this.bg_pn_8x98 = null;
            this.txt_notice_sms = null;
            this.txt_dieukien_sms = null;

            this.pn_cu_phap_sms = null;
            this.txt_cu_phap = null;
            this.txt_dau_so_sms = null;
            this.is_first_nap_sms = false;
            this.btn_close_pn_9029 = null;
            this.btn_close_pn_8x98 = null;
            this.savecuphap = "";
            this.lv_dau_so = null;
            this.sum_item_napvin = 0;

            this.is_vietel = false;
            this.is_vina = false;
            this.is_mobi = false;
            this.is_vnmobile = false;
            this.is_beeline = false;
            this.txt_title_napthe = null;

            this._super("code_shopping_info");
            this.initWithBinaryFile("res/shopping.json");
            return true;
        },
        customizeGUI: function () {
            this.pn_shopping_napvin = this._layout.getChildByName("pn_shopping_napvin");
            this.pn_notice_mua_the = this.pn_shopping_napvin.getChildByName("pn_notice_mua_the");
            this.pn_content = this.pn_notice_mua_the.getChildByName("pn_content");
            this.pn_notice_mua_the.setScale(0);
            this.pn_notice_mua_the.setVisible(false);
            this.btn_xacnhan_muathe = this.customButton("btn_xacnhan_muathe", code_shopping_info.BTN_XACNHAN_MUATHE, this.pn_notice_mua_the);

            this.txt_napvin = this.getControl("txt_napvin", this.pn_shopping_napvin);
            this.txt_napxu = this.getControl("txt_napxu", this.pn_shopping_napvin);
            this.txt_tieuvin = this.getControl("txt_tieuvin", this.pn_shopping_napvin);

            //// panel shopping
            this.sp_nap_vin_shop = this.pn_shopping_napvin.getChildByName("sp_nap_vin_shop");
            this.sp_nap_xu_shop = this.pn_shopping_napvin.getChildByName("sp_nap_xu_shop");
            this.sp_tieu_vin_shop = this.pn_shopping_napvin.getChildByName("sp_tieu_vin_shop");
            this.pn_nap_vin = this.getControl("pn_nap_vin", this.pn_shopping_napvin);
            this.pn_nap_the = this.getControl("pn_nap_the", this.pn_shopping_napvin);
            this.pn_nap_banking = this.getControl("pn_nap_banking", this.pn_shopping_napvin);
            this.pn_nap_xu = this.getControl("pn_nap_xu", this.pn_shopping_napvin);
            this.pn_tieu_vin = this.getControl("pn_tieu_vin", this.pn_shopping_napvin);
            this.pn_mua_the_DT = this.getControl("pn_mua_the_DT", this.pn_shopping_napvin);
            this.pn_mua_the_game = this.getControl("pn_mua_the_game", this.pn_shopping_napvin);
            this.pn_nap_tien_tra_truoc = this.getControl("pn_nap_tien_tra_truoc", this.pn_shopping_napvin);
            this.pn_nha_mang = this.getControl("pn_nha_mang", this.pn_shopping_napvin);
            this.pn_nha_mang.setScaleY(0);
            this.bg_pn_nha_mang = this.pn_nha_mang.getChildByName("bg_pn_nha_mang");
            this.pn_dau_so_mobi = this.getControl("pn_dau_so_mobi", this.pn_shopping_napvin);
            this.pn_dau_so_mobi.setScaleY(0);
            this.bg_pn_dau_so_mobi = this.pn_dau_so_mobi.getChildByName("bg_pn_dau_so_mobi");

            this.lb_notice_muathe_dt = this.getControl("lb_notice_muathe_dt", this.pn_mua_the_DT);
            this.lb_notice_muathe_game = this.getControl("lb_notice_muathe_game", this.pn_mua_the_game);

            this.sc_btn_homeNet = this.pn_nap_vin.getChildByName("sc_btn_homeNet");
            this.sc_btn_homeNet.setTouchEnabled(false);
            this.sc_btn_homeNet.setClippingEnabled(true);
            this.sc_btn_homeNet.setScrollBarEnabled(false);
            this.btn_back_shop = this.customButton("btn_back_shop", code_shopping_info.BTN_SHOP_BACK, this.pn_shopping_napvin);
            this.btn_close_shop = this.customButton("btn_close_shop", code_shopping_info.BTN_SHOP_CLOSE, this.pn_shopping_napvin);
            this.btn_nap_vin_shop = this.customButton("btn_nap_vin_shop", code_shopping_info.BTN_SHOP_NAPVIN, this.pn_shopping_napvin);
            this.btn_nap_xu_shop = this.customButton("btn_nap_xu_shop", code_shopping_info.BTN_SHOP_NAPXU, this.pn_shopping_napvin);
            this.btn_tieu_vin_shop = this.customButton("btn_tieu_vin_shop", code_shopping_info.BTN_SHOP_TIEUVIN, this.pn_shopping_napvin);
            this.btn_vinaphone = this.customButton("btn_vinaphone", code_shopping_info.BTN_SHOP_VINA, this.sc_btn_homeNet);
            this.btn_vietnameMobile = this.customButton("btn_vietnameMobile", code_shopping_info.BTN_SHOP_VNMOBILE, this.sc_btn_homeNet);
            this.btn_gate = this.customButton("btn_gate", code_shopping_info.BTN_SHOP_GATE, this.sc_btn_homeNet);

            this.btn_mobilecard = this.customButton("btn_mobilecard", code_shopping_info.BTN_SHOP_MOBI, this.sc_btn_homeNet);
            this.btn_vietel = this.customButton("btn_vietel", code_shopping_info.BTN_SHOP_VIETTEL, this.sc_btn_homeNet);
            this.btn_zing_xu = this.customButton("btn_zing_xu", code_shopping_info.BTN_SHOP_ZING, this.sc_btn_homeNet);
            this.btn_vcoin = this.customButton("btn_vcoin", code_shopping_info.BTN_SHOP_VCOIN, this.sc_btn_homeNet);
            this.btn_BeeLine = this.customButton("btn_BeeLine", code_shopping_info.BTN_SHOP_BEELINE, this.sc_btn_homeNet);

            this.btn_internet_banking = this.customButton("btn_internet_banking", code_shopping_info.BTN_SHOP_INTERNETBANKING, this.pn_nap_vin);
            this.btn_vietel.setName("btn_nap_vin_0");
            this.btn_vinaphone.setName("btn_nap_vin_1");
            this.btn_mobilecard.setName("btn_nap_vin_2");
            this.btn_vietnameMobile.setName("btn_nap_vin_3");
            this.btn_BeeLine.setName("btn_nap_vin_4");
            this.btn_gate.setName("btn_nap_vin_5");
            this.btn_zing_xu.setName("btn_nap_vin_6");
            this.btn_vcoin.setName("btn_nap_vin_7");
            for (var i = 0; i < 8; i++) {
                if (this.sc_btn_homeNet.getChildByName("btn_nap_vin_" + i) != null) {
                    var button = this.sc_btn_homeNet.getChildByName("btn_nap_vin_" + i);
                    button.setVisible(false);
                }
            }

            this.pn_select_the = this.getControl("pn_select_the", this.pn_nap_the);
            this.txt_title_napthe = this.getControl("txt_title_napthe", this.pn_nap_the);
            this.lv_gia_the_nap = this.pn_nap_the.getChildByName("lv_gia_the_nap");
            this.lv_gia_the_nap.setTouchEnabled(true);
            this.lv_gia_the_nap.setClippingEnabled(true);
            this.lv_gia_the_nap.setScrollBarEnabled(false);

            this.pn_select_the.setScaleY(0);
            this.lb_the_selected = this.getControl("lb_the_selected", this.pn_nap_the);
            this.btn_select_the = this.customButton("btn_select_the", code_shopping_info.BTN_SELECT_ARROW, this.pn_nap_the);
            this.tf_serial = this.getControl("tf_serial", this.pn_nap_the);
            this.tf_ma_the = this.getControl("tf_ma_the", this.pn_nap_the);
            this.btn_nap_the_dt = this.customButton("btn_nap_the_dt", code_shopping_info.BTN_NAP_THE_DT, this.pn_nap_the);
            this.btn_clear_serial = this.customButton("btn_clear_serial", code_shopping_info.BTN_CLEAR_SERIAL, this.pn_nap_the);
            this.btn_clear_mathe = this.customButton("btn_clear_mathe", code_shopping_info.BTN_CLEAR_MATHE, this.pn_nap_the);
            this.btn_clear_serial.setVisible(false);
            this.btn_clear_mathe.setVisible(false);

            this.btn_select_vina = this.customButton("btn_select_vina", code_shopping_info.BTN_SELECT_VINA, this.pn_select_the);
            this.btn_select_mobi = this.customButton("btn_select_mobi", code_shopping_info.BTN_SELECT_MOBI, this.pn_select_the);
            this.btn_select_viettel = this.customButton("btn_select_viettel", code_shopping_info.BTN_SELECT_VIETTEL, this.pn_select_the);
            this.btn_select_zingxu = this.customButton("btn_select_zingxu", code_shopping_info.BTN_SELECT_ZING, this.pn_select_the);
            this.btn_select_vcoin = this.customButton("btn_select_vcoin", code_shopping_info.BTN_SELECT_VCOIN, this.pn_select_the);
            this.btn_select_vnMobile = this.customButton("btn_select_vnMobile", code_shopping_info.BTN_SELECT_VNMOBILE, this.pn_select_the);
            this.btn_select_vBee = this.customButton("btn_select_vBee", code_shopping_info.BTN_SELECT_VBEE, this.pn_select_the);
            this.btn_select_Gate = this.customButton("btn_select_Gate", code_shopping_info.BTN_SELECT_GATE, this.pn_select_the);
            this.btn_select_VinCard = this.customButton("btn_select_VinCard", code_shopping_info.BTN_SELECT_VIN_CARD, this.pn_select_the);
            this.btn_select_VinCard.setVisible(false);
            this.btn_select_megaCard = this.customButton("btn_select_megaCard", code_shopping_info.BTN_SELECT_MEGA_CARD, this.pn_select_the);
            this.btn_select_megaCard.setVisible(false);
            this.btn_select_viettel.setName("btn_home_0");
            this.btn_select_vina.setName("btn_home_1");
            this.btn_select_mobi.setName("btn_home_2");
            this.btn_select_vnMobile.setName("btn_home_3");
            this.btn_select_vBee.setName("btn_home_4");
            this.btn_select_Gate.setName("btn_home_5");
            this.btn_select_zingxu.setName("btn_home_6");
            this.btn_select_vcoin.setName("btn_home_7");
            this.bg_pn_select_the = this.pn_select_the.getChildByName("bg_pn_select_the");


            this.btn_close_select_the = this.customButton("btn_close_select_the", code_shopping_info.BTN_CLOSE_SELECT_THE, this.pn_select_the);
            this.tf_money_vin = this.getControl("tf_money_vin", this.pn_nap_xu);
            this.tf_money_again = this.getControl("tf_money_again", this.pn_nap_xu);
            this.lb_xu_nhan_duoc = this.getControl("lb_xu_nhan_duoc", this.pn_nap_xu);
            this.lb_xu_nhan_duoc.setString("");
            this.btn_doi_xu = this.customButton("btn_doi_xu", code_shopping_info.BTN_NAPXU_DOIXU, this.pn_nap_xu);
            this.lb_sodu_kd_napxu = this.getControl("lb_sodu_kd_napxu", this.pn_nap_xu);
            this.lb_tile_vin_to_xu = this.getControl("lb_tile_vin_to_xu", this.pn_nap_xu);
            this.txt_vin_1 = this.getControl("txt_vin_1", this.pn_nap_xu);
            this.txt_vin_2 = this.getControl("txt_vin_2", this.pn_nap_xu);
            this.txt_vin_3 = this.getControl("txt_vin_3", this.pn_nap_xu);



            if (cc.sys.isNative) {
                this.txt_vin_1.x -= 5;
                this.txt_vin_1.y = 320;
                this.lb_tile_vin_to_xu.y = 320;
                this.txt_vin_2.x = 320;
                this.txt_vin_2.y = 150;
                this.txt_vin_3.y = 56;
                this.txt_vin_3.x -= 5 ;
            }else{
                this.txt_vin_1.x -= 5;
                this.txt_vin_1.y = 320;
                this.lb_tile_vin_to_xu.y = 320;
                this.txt_vin_2.x = 325;
                this.txt_vin_2.y = 130;
                this.txt_vin_3.y = 36;
            }



            this.btn_mua_ma_the = this.customButton("btn_mua_ma_the", code_shopping_info.BTN_MUA_MA_THE, this.pn_tieu_vin);
            this.btn_ma_the_game = this.customButton("btn_ma_the_game", code_shopping_info.BTN_MUA_THE_GAME, this.pn_tieu_vin);
            this.btn_nap_tien_tra_truoc = this.customButton("btn_nap_tien_tra_truoc", code_shopping_info.BTN_NAPTIEN_TRATRUOC, this.pn_tieu_vin);
            this.btn_nap_tien_tra_sau = this.customButton("btn_nap_tien_tra_sau", code_shopping_info.BTN_NAPTIEN_TRASAU, this.pn_tieu_vin);
            this.btn_chuyen_khoan = this.customButton("btn_chuyen_khoan", code_shopping_info.BTN_CHUYEN_KHOAN, this.pn_tieu_vin);
            this.lb_mua_the_selected = this.getControl("lb_mua_the_selected", this.pn_mua_the_DT);
            this.tf_soluong_dt = this.getControl("tf_soluong_dt", this.pn_mua_the_DT);
            this.sp_capcha_mua_the_dt = this.pn_mua_the_DT.getChildByName("sp_capcha_mua_the_dt");
            this.tf_gia_ban_dt = this.getControl("tf_gia_ban_dt", this.pn_mua_the_DT);
            this.btn_select_mua_the = this.customButton("btn_select_mua_the", code_shopping_info.BTN_SELECT_MUA_THE_DT, this.pn_mua_the_DT);
            this.btn_tiep_tuc_mua_the_dt = this.customButton("btn_tiep_tuc_mua_the_dt", code_shopping_info.BTN_TIEP_TUC_MUA_THE_DT, this.pn_mua_the_DT);
            this.lb_sodu_kd_muathe_dt = this.getControl("lb_sodu_kd_muathe_dt", this.pn_mua_the_DT);
            this.lb_sodu_kd_muathe_game = this.getControl("lb_sodu_kd_muathe_game", this.pn_mua_the_game);

            this.btn_close_select_mua_the_dt = this.customButton("btn_close_select_mua_the_dt", code_shopping_info.BTN_CLOSE_SELECT_MUA_THE_DT, this.pn_nha_mang);
            this.btn_muathedt_vina = this.customButton("btn_muathedt_vina", code_shopping_info.BTN_MUATHEDT_VINA, this.pn_nha_mang);
            this.btn_muathedt_mobi = this.customButton("btn_muathedt_mobi", code_shopping_info.BTN_MUATHEDT_MOBI, this.pn_nha_mang);
            this.btn_muathedt_viettel = this.customButton("btn_muathedt_viettel", code_shopping_info.BTN_MUATHEDT_VIETTEL, this.pn_nha_mang);
            this.btn_muathedt_vnmobile = this.customButton("btn_muathedt_vnmobile", code_shopping_info.BTN_MUATHEDT_VNMOBILE, this.pn_nha_mang);
            this.btn_muathedt_bee = this.customButton("btn_muathedt_bee", code_shopping_info.BTN_MUATHEDT_BEELINE, this.pn_nha_mang);
            this.btn_muathedt_viettel.setName("btn_home_tieuvin_0");
            this.btn_muathedt_vina.setName("btn_home_tieuvin_1");
            this.btn_muathedt_mobi.setName("btn_home_tieuvin_2");
            this.btn_muathedt_vnmobile.setName("btn_home_tieuvin_3");
            this.btn_muathedt_bee.setName("btn_home_tieuvin_4");

            this.lb_menhgia_dt = this.getControl("lb_menhgia_dt", this.pn_mua_the_DT);
            this.pn_menhgia_thedt = this.pn_mua_the_DT.getChildByName("pn_menhgia_thedt");
            this.bg_pn_menhgia_thedt = this.pn_menhgia_thedt.getChildByName("bg_pn_menhgia_thedt");
            this.lv_menhgia_doi_the_dt = this.pn_mua_the_DT.getChildByName("lv_menhgia_doi_the_dt");
            this.lv_menhgia_doi_the_dt.setTouchEnabled(true);
            this.lv_menhgia_doi_the_dt.setClippingEnabled(true);
            this.lv_menhgia_doi_the_dt.setScrollBarEnabled(false);
            this.lv_menhgia_doi_the_game = this.pn_mua_the_game.getChildByName("lv_menhgia_doi_the_game");
            this.lv_menhgia_doi_the_game.setTouchEnabled(true);
            this.lv_menhgia_doi_the_game.setClippingEnabled(true);
            this.lv_menhgia_doi_the_game.setScrollBarEnabled(false);

            this.btn_menhgia_thedt = this.customButton("btn_menhgia_thedt", code_shopping_info.BTN_OPEN_MENHGIA_DT, this.pn_mua_the_DT);
            this.btn_close_menhgia_dt = this.customButton("btn_close_menhgia_dt", code_shopping_info.BTN_CLOSE_MENHGIA_DT, this.pn_menhgia_thedt);

            this.pn_menhgia_thedt.setScaleY(0);
            this.pn_menhgia_thedt.setVisible(false);
            this.lb_mua_the_game = this.getControl("lb_mua_the_game", this.pn_mua_the_game);
            this.lb_gia_ban_thegame = this.getControl("lb_gia_ban_thegame", this.pn_mua_the_game);
            this.lb_menhgia_game = this.getControl("lb_menhgia_game", this.pn_mua_the_game);
            this.tf_soluong_thegame = this.getControl("tf_soluong_thegame", this.pn_mua_the_game);
            this.pn_menhgia_thegame = this.getControl("pn_menhgia_thegame", this.pn_mua_the_game);
            this.pn_select_the_game = this.getControl("pn_select_the_game", this.pn_mua_the_game);
            this.bg_pn_menhgia_thegame = this.pn_menhgia_thegame.getChildByName("bg_pn_menhgia_thegame");
            this.pn_select_the_game.setScaleY(0);
            this.pn_menhgia_thegame.setScaleY(0);

            this.btn_select_the_game = this.customButton("btn_select_the_game", code_shopping_info.BTN_SELECT_THEGAME, this.pn_mua_the_game);
            this.btn_tiep_tuc_mua_thegame = this.customButton("btn_tiep_tuc_mua_thegame", code_shopping_info.BTN_TIEPTUC_THEGAME, this.pn_mua_the_game);
            this.btn_menhgia_thegame = this.customButton("btn_menhgia_thegame", code_shopping_info.BTN_MENHGIA_THEGAME, this.pn_mua_the_game);

            this.btn_close_select_thegame = this.customButton("btn_close_select_thegame", code_shopping_info.BTN_CLOSE_SELECT_THEGAME, this.pn_select_the_game);
            this.btn_close_menhgia_game = this.customButton("btn_close_menhgia_game", code_shopping_info.BTN_CLOSE_MENHGIA_THEGAME, this.pn_menhgia_thegame);
            this.btn_muathegame_zing = this.customButton("btn_muathegame_zing", code_shopping_info.BTN_MUATHEGAME_ZING, this.pn_select_the_game);
            this.btn_muathegame_vcoin = this.customButton("btn_muathegame_vcoin", code_shopping_info.BTN_MUATHEGAME_VCOIN, this.pn_select_the_game);
            this.btn_muathegame_gate = this.customButton("btn_muathegame_gate", code_shopping_info.BTN_MUATHEGAME_GATE, this.pn_select_the_game);
            this.btn_muathegame_zing.setVisible(false);
            this.btn_muathegame_vcoin.setVisible(false);
            this.btn_muathegame_gate.setVisible(false);
            this.btn_muathegame_gate.setName("btn_kind_game_5");
            this.btn_muathegame_zing.setName("btn_kind_game_6");
            this.btn_muathegame_vcoin.setName("btn_kind_game_7");
            this.bg_pn_select_the_game = this.pn_select_the_game.getChildByName("bg_pn_select_the_game");

            this.lb_nttt_loai_the = this.getControl("lb_nttt_loai_the", this.pn_nap_tien_tra_truoc);
            this.lb_dau_so_nttt = this.getControl("lb_dau_so_nttt", this.pn_nap_tien_tra_truoc);
            this.lb_dau_so_nttt.setString("091");
            this.tf_phone_number_nttt = this.getControl("tf_phone_number_nttt", this.pn_nap_tien_tra_truoc);
            this.lb_gia_ban_nttt = this.getControl("lb_gia_ban_nttt", this.pn_nap_tien_tra_truoc);
            this.btn_tiep_tuc_nttt = this.customButton("btn_tiep_tuc_nttt", code_shopping_info.BTN_TIEPTUC_NTTT, this.pn_nap_tien_tra_truoc);
            this.btn_nttt_select_loaithe = this.customButton("btn_nttt_select_loaithe", code_shopping_info.BTN_SELECT_NHAMANG_NTTT, this.pn_nap_tien_tra_truoc);
            this.btn_dau_so_nttt = this.customButton("btn_dau_so_nttt", code_shopping_info.BTN_SELECT_DAUSO_NTTT, this.pn_nap_tien_tra_truoc);

            this.lb_notice_trasau = this.getControl("lb_notice_trasau", this.pn_nap_tien_tra_truoc);
            this.lb_menh_gia_nap_dt = this.getControl("lb_menh_gia_nap_dt", this.pn_nap_tien_tra_truoc);
            this.lb_sodu_kd_nap_dt = this.getControl("lb_sodu_kd_nap_dt", this.pn_nap_tien_tra_truoc);
            this.txt_title_nap_dt = this.getControl("txt_title_nap_dt", this.pn_nap_tien_tra_truoc);
            this.lv_menhgia_nap_dt = this.pn_nap_tien_tra_truoc.getChildByName("lv_menhgia_nap_dt");
            this.lv_menhgia_nap_dt.setTouchEnabled(true);
            this.lv_menhgia_nap_dt.setClippingEnabled(true);
            this.lv_menhgia_nap_dt.setScrollBarEnabled(false);
            this.pn_menhgia_nap_dt = this.pn_nap_tien_tra_truoc.getChildByName("pn_menhgia_nap_dt");
            this.pn_menhgia_nap_dt.setScaleY(0);
            this.pn_menhgia_nap_dt.setVisible(false);
            this.bg_pn_menhgia_nap_dt = this.pn_menhgia_nap_dt.getChildByName("bg_pn_menhgia_nap_dt");
            this.btn_close_menhgia_nap_dt = this.customButton("btn_close_menhgia_nap_dt", code_shopping_info.BTN_CLOSE_MENHGIA_NAP_DT, this.pn_menhgia_nap_dt);
            this.btn_chon_muc_nap_dt = this.customButton("btn_chon_muc_nap_dt", code_shopping_info.BTN_OPEN_MENHGIA_NAP_DT, this.pn_nap_tien_tra_truoc);
            this.btn_clear_fone = this.customButton("btn_clear_fone", code_shopping_info.BTN_CLEAR_FONE, this.pn_nap_tien_tra_truoc);
            this.btn_clear_fone.setVisible(false);
            this.lv_dau_so = this.getControl("lv_dau_so", this.pn_dau_so_mobi);
            this.lv_dau_so.setTouchEnabled(true);
            this.lv_dau_so.setClippingEnabled(true);
            this.lv_dau_so.setScrollBarEnabled(false);
            if (!cc.sys.isNative) {
                this.lv_dau_so.setVisible(false);
            }

            this.btn_close_dau_so_mobi = this.customButton("btn_close_dau_so_mobi", code_shopping_info.BTN_CLOSE_DAUSO_MOBI, this.pn_dau_so_mobi);

            this.pn_nap_the.setVisible(false);
            this.pn_nap_banking.setVisible(false);
            this.pn_nap_xu.setVisible(false);
            this.pn_tieu_vin.setVisible(false);
            this.pn_mua_the_DT.setVisible(false);
            this.pn_mua_the_game.setVisible(false);
            this.pn_nap_tien_tra_truoc.setVisible(false);
            this.pn_select_the.setVisible(false);
            this.btn_back_shop.setVisible(false);
            this.pn_nha_mang.setVisible(false);
            this.pn_dau_so_mobi.setVisible(false);

            this.pn_select_the_game.setVisible(false);
            this.pn_menhgia_thegame.setVisible(false);
            this.pn_shopping_napvin.setScale(0);
            this.pn_shopping_napvin.setVisible(false);

            // panel bank
            this.btn_nap_vin_bank = this.customButton("btn_nap_vin_bank", code_shopping_info.BTN_NAP_VIN_BANKING, this.pn_nap_banking);
            this.txt_vin_nhan_bank = this.getControl("txt_vin_nhan_bank", this.pn_nap_banking);
            this.lb_chose_mg_bank = this.getControl("lb_chose_mg_bank", this.pn_nap_banking);
            this.lb_chose_bank = this.getControl("lb_chose_bank", this.pn_nap_banking);
            this.btn_chose_bank = this.customButton("btn_chose_bank", code_shopping_info.BTN_SELECT_BANK, this.pn_nap_banking);
            this.pn_select_bank = this.pn_nap_banking.getChildByName("pn_select_bank");
            this.pn_select_bank.setScaleY(0);
            this.pn_select_bank.setVisible(false);
            this.bg_pn_select_bank = this.pn_select_bank.getChildByName("bg_pn_select_bank");
            this.btn_close_pn_select_bank = this.customButton("btn_close_pn_select_bank", code_shopping_info.BTN_CLOSE_SELECT_BANK, this.pn_select_bank);
            this.lv_list_bank = this.pn_select_bank.getChildByName("lv_list_bank");
            this.lv_list_bank.setTouchEnabled(true);
            this.lv_list_bank.setClippingEnabled(true);
            this.lv_list_bank.setScrollBarEnabled(false);
            this.btn_chose_mg_bank = this.customButton("btn_chose_mg_bank", code_shopping_info.BTN_SELECT_MG_BANK, this.pn_nap_banking);
            this.pn_menh_gia_bank = this.pn_nap_banking.getChildByName("pn_menh_gia_bank");
            this.pn_menh_gia_bank.setScaleY(0);
            this.pn_menh_gia_bank.setVisible(false);
            this.bg_pn_menh_gia_bank = this.pn_menh_gia_bank.getChildByName("bg_pn_menh_gia_bank");
            this.btn_close_pn_mg_bank = this.customButton("btn_close_pn_mg_bank", code_shopping_info.BTN_CLOSE_SELECT_MG_BANK, this.pn_menh_gia_bank);
            this.sc_bank = this.pn_nap_banking.getChildByName("sc_bank");
            this.sc_bank.setTouchEnabled(true);
            this.sc_bank.setClippingEnabled(true);
            this.sc_bank.setScrollBarEnabled(false);

            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
                this.tf_money_vin = menutab.changeTextFieldAsEditBox(this.tf_money_vin, this.pn_nap_xu);
                this.tf_money_again = menutab.changeTextFieldAsEditBox(this.tf_money_again, this.pn_nap_xu);
                this.tf_serial = menutab.changeTextFieldAsEditBox(this.tf_serial, this.pn_nap_the);
                this.tf_ma_the = menutab.changeTextFieldAsEditBox(this.tf_ma_the, this.pn_nap_the);
                this.tf_soluong_dt = menutab.changeTextFieldAsEditBox(this.tf_soluong_dt, this.pn_mua_the_DT);
                this.tf_soluong_thegame = menutab.changeTextFieldAsEditBox(this.tf_soluong_thegame, this.pn_mua_the_game);
                this.tf_phone_number_nttt = menutab.changeTextFieldAsEditBox(this.tf_phone_number_nttt, this.pn_nap_tien_tra_truoc);
                this.pn_select_the.setLocalZOrder(8000);
                this.pn_menhgia_thedt.setLocalZOrder(1001);
                this.pn_select_the_game.setLocalZOrder(1002);
                this.pn_menhgia_thegame.setLocalZOrder(1003);
                if (!cc.sys.isNative) {
                    this.tf_soluong_dt.setTextAlign(cc.TEXT_ALIGNMENT_RIGHT);
                    this.tf_soluong_thegame.setTextAlign(cc.TEXT_ALIGNMENT_RIGHT);
                }
            } else {
                this.tf_money_vin.addEventListener(this.text_field_event, this);
                this.tf_money_again.addEventListener(this.text_field_event, this);
                this.tf_serial.addEventListener(this.text_field_event, this);
                this.tf_ma_the.addEventListener(this.text_field_event, this);
                this.tf_soluong_dt.addEventListener(this.text_field_event, this);
                this.tf_soluong_thegame.addEventListener(this.text_field_event, this);
                this.tf_phone_number_nttt.addEventListener(this.text_field_event, this);

                this.tf_soluong_dt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.tf_soluong_thegame.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

                this.tf_money_vin.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_money_again.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_serial.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_ma_the.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_soluong_dt.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_soluong_thegame.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_phone_number_nttt.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }

            this.pn_in_app_purchase = this.pn_shopping_napvin.getChildByName("pn_in_app_purchase");
            this.btn_in_app_purchases = this.customButton("btn_in_app_purchases", code_shopping_info.BTN_SHOP_IAP, this.sc_btn_homeNet);
            this.btn_inApp_1 = this.customButton("btn_inApp_1", code_shopping_info.BTN_SHOP_IAP_1, this.pn_in_app_purchase);
            this.btn_inApp_2 = this.customButton("btn_inApp_2", code_shopping_info.BTN_SHOP_IAP_2, this.pn_in_app_purchase);
            this.btn_inApp_3 = this.customButton("btn_inApp_3", code_shopping_info.BTN_SHOP_IAP_3, this.pn_in_app_purchase);
            this.btn_inApp_4 = this.customButton("btn_inApp_4", code_shopping_info.BTN_SHOP_IAP_4, this.pn_in_app_purchase);
            this.btn_inApp_5 = this.customButton("btn_inApp_5", code_shopping_info.BTN_SHOP_IAP_5, this.pn_in_app_purchase);
            this.btn_inApp_6 = this.customButton("btn_inApp_6", code_shopping_info.BTN_SHOP_IAP_6, this.pn_in_app_purchase);
            this.btn_inApp_7 = this.customButton("btn_inApp_7", code_shopping_info.BTN_SHOP_IAP_7, this.pn_in_app_purchase);
            this.btn_inApp_8 = this.customButton("btn_inApp_8", code_shopping_info.BTN_SHOP_IAP_8, this.pn_in_app_purchase);

            this.btn_nap_sms = this.customButton("btn_nap_sms", code_shopping_info.BTN_SHOP_NAP_VIN_SMS, this.sc_btn_homeNet);
            this.btn_nap_sms.setVisible(false);
            this.btn_nap_VinCard = this.customButton("btn_nap_VinCard", code_shopping_info.BTN_SHOP_NAP_VIN_CARD, this.sc_btn_homeNet);
            this.btn_nap_VinCard.setVisible(false);
            this.btn_nap_megaCard = this.customButton("btn_nap_megaCard", code_shopping_info.BTN_SHOP_NAP_MEGA, this.sc_btn_homeNet);
            this.btn_nap_megaCard.setVisible(false);

            this.pn_vinplus = this.pn_in_app_purchase.getChildByName("pn_vinplus");
            this.btn_vinplus = this.customButton("btn_vinplus", code_shopping_info.BTN_DOWNLOAD_VINPLUS, this.pn_vinplus);
            this.pn_vinplus.setVisible(false);

            this.pn_in_app_purchase.setVisible(false);
            if (!cc.sys.isNative) {
                this.btn_in_app_purchases.setVisible(false);
            }

            this.txt_ratio_bank = this.getControl("txt_ratio_bank", this.pn_nap_banking);
            this.txt_ratio_bank.setString("");
            // nap vin sms
            this.pn_vin_from_sms = this.pn_shopping_napvin.getChildByName("pn_vin_from_sms");
            this.pn_chose_menh_gia = this.pn_vin_from_sms.getChildByName("pn_chose_menh_gia");
            this.pn_nha_mang_sms = this.pn_vin_from_sms.getChildByName("pn_nha_mang_sms");
            this.pn_cu_phap_sms = this.pn_vin_from_sms.getChildByName("pn_cu_phap_sms");
            this.pn_vin_from_sms.setVisible(false);
            this.pn_chose_menh_gia.setVisible(false);
            this.pn_nha_mang_sms.setVisible(false);
            this.pn_nha_mang_sms.setScaleY(0);
            this.pn_cu_phap_sms.setVisible(false);
            this.txt_nha_mang_sms = this.getControl("txt_nha_mang_sms", this.pn_vin_from_sms);
            this.txt_nha_mang_sms.setString("");
            this.bg_chose_homenet_sms = this.getControl("bg_chose_homenet_sms", this.pn_nha_mang_sms);
            this.btn_nha_mang_sms = this.customButton("btn_nha_mang_sms", code_shopping_info.BTN_CHOSE_HOMENETWORK_SMS, this.pn_vin_from_sms);
            this.btn_nha_mang_vietel = this.customButton("btn_nha_mang_vietel", code_shopping_info.BTN_HOMENETWORK_VIETTEL_SMS, this.pn_nha_mang_sms);
            this.btn_nha_mang_vina = this.customButton("btn_nha_mang_vina", code_shopping_info.BTN_HOMENETWORK_VINA_SMS, this.pn_nha_mang_sms);
            this.btn_nha_mang_mobi = this.customButton("btn_nha_mang_mobi", code_shopping_info.BTN_HOMENETWORK_MOBI_SMS, this.pn_nha_mang_sms);
            this.btn_nha_mang_vnmobile = this.customButton("btn_nha_mang_vnmobile", code_shopping_info.BTN_HOMENETWORK_VNM_SMS, this.pn_nha_mang_sms);
            this.btn_nha_mang_beeline = this.customButton("btn_nha_mang_beeline", code_shopping_info.BTN_HOMENETWORK_BEE_SMS, this.pn_nha_mang_sms);
            this.btn_close_pn_nha_mang = this.customButton("btn_close_pn_nha_mang", code_shopping_info.BTN_CLOSE_HOMENETWORK_SMS, this.pn_nha_mang_sms);

            this.pn_9029 = this.pn_chose_menh_gia.getChildByName("pn_9029");
            this.pn_9029.setScaleY(0);
            this.pn_9029.setVisible(false);
            this.pn_8x98 = this.pn_chose_menh_gia.getChildByName("pn_8x98");
            this.pn_8x98.setScaleY(0);
            this.pn_8x98.setVisible(false);
            this.txt_menhgia_sms = this.getControl("txt_menhgia_sms", this.pn_chose_menh_gia);
            this.txt_menhgia_sms.setString("");
            this.btn_chose_menhgia_sms = this.customButton("btn_chose_menhgia_sms", code_shopping_info.BTN_CHOSE_MENHGIA_SMS, this.pn_chose_menh_gia);
            this.txt_vin_sms_plus = this.getControl("txt_vin_sms_plus", this.pn_chose_menh_gia);
            this.btn_send_sms_plus = this.customButton("btn_send_sms_plus", code_shopping_info.BTN_SOANTIN_SMS, this.pn_chose_menh_gia);
            if (!cc.sys.isNative) {
                this.btn_send_sms_plus.setVisible(false);
            }
            this.lv_9029 = this.getControl("lv_9029", this.pn_9029);
            this.lv_9029.setTouchEnabled(true);
            this.lv_9029.setClippingEnabled(true);
            this.lv_9029.setScrollBarEnabled(false);
            this.lv_8x98 = this.getControl("lv_8x98", this.pn_8x98);
            this.lv_8x98.setTouchEnabled(true);
            this.lv_8x98.setClippingEnabled(true);
            this.lv_8x98.setScrollBarEnabled(false);
            this.bg_pn_9029 = this.getControl("bg_pn_9029", this.pn_9029);
            this.bg_pn_8x98 = this.getControl("bg_pn_8x98", this.pn_8x98);
            this.txt_notice_sms = this.getControl("txt_notice_sms", this.pn_chose_menh_gia);
            this.txt_dieukien_sms = this.getControl("txt_dieukien_sms", this.pn_chose_menh_gia);
            this.txt_dieukien_sms.setVisible(false);

            this.pn_cu_phap_sms = this.pn_vin_from_sms.getChildByName("pn_cu_phap_sms");
            this.txt_cu_phap = this.getControl("txt_cu_phap", this.pn_cu_phap_sms);
            this.txt_dau_so_sms = this.getControl("txt_dau_so_sms", this.pn_cu_phap_sms);
            this.btn_close_pn_9029 = this.customButton("btn_close_pn_9029", code_shopping_info.BTN_CLOSE_PN_9029, this.pn_9029);
            this.btn_close_pn_8x98 = this.customButton("btn_close_pn_8x98", code_shopping_info.BTN_CLOSE_PN_8X98, this.pn_8x98);

            if (cc.sys.isNative) {
                if (cc.sys.os != cc.sys.OS_IOS) {
                    this.btn_inApp_1.setPosition(cc.p(this.btn_inApp_2.getPositionX(), this.btn_inApp_1.getPositionY()));
                    this.btn_inApp_2.setPosition(cc.p(this.btn_inApp_3.getPositionX(), this.btn_inApp_2.getPositionY()));
                    this.btn_inApp_3.setVisible(false);
                    this.btn_inApp_4.setVisible(false);
                    this.btn_inApp_5.setVisible(false);
                    this.btn_inApp_6.setVisible(false);
                    this.btn_inApp_7.setVisible(false);
                    this.btn_inApp_8.setVisible(false);
                } else {
                    this.pn_vinplus.setVisible(false);
                }
            }
        },
        showshopping_info: function () {
            //cc.log("vao1");
            shopping_info.pn_shopping_napvin.setVisible(true);
            shopping_info.pn_shopping_napvin.runAction(cc.sequence(cc.delayTime(0.01), cc.scaleTo(0.2, 1)));
            shopping_info.pn_nap_vin.setVisible(true);
            shopping_info.pn_nap_the.setVisible(false);
            shopping_info.pn_nap_banking.setVisible(false);
            shopping_info.pn_nap_xu.setVisible(false);
            shopping_info.pn_tieu_vin.setVisible(false);
            shopping_info.pn_mua_the_DT.setVisible(false);
            shopping_info.pn_mua_the_game.setVisible(false);
            shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
            shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
            shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
            shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
            shopping_info.current_menu_shop = "napxu";
            shopping_info.btn_back_shop.setVisible(false);
            shopping_info.closePanelNapTuSMS();
        },
        showshopping_info_xu: function () {
            //cc.log("vao2");
            shopping_info.pn_shopping_napvin.setVisible(true);
            shopping_info.pn_shopping_napvin.runAction(cc.sequence(cc.delayTime(0.01), cc.scaleTo(0.2, 1)));
            if (lobby.is_recharge_xu == 0) {
                cc.log("vao1");
                shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid.png");
                shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                shopping_info.current_menu_shop = "napxu";
                shopping_info.pn_nap_xu.setVisible(true);
                shopping_info.pn_nap_vin.setVisible(false);
                shopping_info.pn_nap_the.setVisible(false);
                shopping_info.pn_nap_banking.setVisible(false);
                shopping_info.pn_tieu_vin.setVisible(false);
                shopping_info.pn_mua_the_DT.setVisible(false);
                shopping_info.pn_mua_the_game.setVisible(false);
                shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
            } else {
                cc.log("vao2");
                shopping_info.pn_nap_xu.setVisible(false);
                shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                shopping_info.current_menu_shop = "tieuvin";
                shopping_info.select_nap_xu = "tieuvin";
                shopping_info.txt_napxu.setString("");
                shopping_info.btn_nap_xu_shop.setEnabled(false);
                shopping_info.pn_nap_vin.setVisible(false);
                shopping_info.pn_nap_the.setVisible(false);
                shopping_info.pn_nap_banking.setVisible(false);
                shopping_info.pn_tieu_vin.setVisible(true);
                shopping_info.pn_mua_the_DT.setVisible(false);
                shopping_info.pn_mua_the_game.setVisible(false);
                shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
            }
            if (lobby.semi_recharge == 1) {
                cc.log("vao3");
                shopping_info.pn_nap_xu.setVisible(false);
                shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                shopping_info.current_menu_shop = "tieuvin";
                shopping_info.select_nap_xu = "tieuvin";
                shopping_info.txt_napxu.setString("");
                shopping_info.btn_nap_xu_shop.setEnabled(false);
                shopping_info.pn_nap_vin.setVisible(false);
                shopping_info.pn_nap_the.setVisible(false);
                shopping_info.pn_nap_banking.setVisible(false);
                shopping_info.pn_tieu_vin.setVisible(true);
                shopping_info.pn_mua_the_DT.setVisible(false);
                shopping_info.pn_mua_the_game.setVisible(false);
                shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
            }

            shopping_info.btn_back_shop.setVisible(false);
            shopping_info.funGetMoneyUse();
        },
        showshopping_info_tieuvin: function () {
            shopping_info.pn_nap_vin.setVisible(false);
            shopping_info.pn_nap_the.setVisible(false);
            shopping_info.pn_nap_banking.setVisible(false);
            shopping_info.pn_nap_xu.setVisible(false);
            shopping_info.pn_tieu_vin.setVisible(true);
            shopping_info.pn_mua_the_DT.setVisible(false);
            shopping_info.pn_mua_the_game.setVisible(false);
            shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
            shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
            shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
            shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
            shopping_info.current_menu_shop = "tieuvin";
            shopping_info.btn_back_shop.setVisible(false);
        },

        configRechargeVin_SMS: function () {
            var posy = -30.46;
            var array_homenetwork = [];
            if (lobby.is_sms_plus == 0) {
                for (var i = 0; i < lobby.sms_plus_telco.length; i++) {
                    if (lobby.sms_plus_telco[i] == 0) {
                        this.btn_nha_mang_vietel.setVisible(true);
                        this.is_vietel = true;
                        array_homenetwork.push(this.btn_nha_mang_vietel);
                        this.dauso_sms_viettel = "9029";
                    }
                    if (lobby.sms_plus_telco[i] == 1) {
                        this.btn_nha_mang_vina.setVisible(true);
                        this.is_vina = true;
                        array_homenetwork.push(this.btn_nha_mang_vina);
                        this.dauso_sms_vina = "9029";
                    }
                    if (lobby.sms_plus_telco[i] == 2) {
                        this.btn_nha_mang_mobi.setVisible(true);
                        this.is_mobi = true;
                        array_homenetwork.push(this.btn_nha_mang_mobi);
                        this.dauso_sms_mobi = "9029";
                    }
                }
            }
            if (lobby.is_sms == 0) {
                for (var i = 0; i < lobby.sms_telco.length; i++) {
                    if (this.is_vietel == false) {
                        if (lobby.sms_telco[i] == 0) {
                            this.btn_nha_mang_vietel.setVisible(true);
                            this.is_vietel = true;
                            array_homenetwork.push(this.btn_nha_mang_vietel);
                            this.dauso_sms_viettel = "8x98";
                        }
                    }
                    if (this.is_vina == false) {
                        if (lobby.sms_telco[i] == 1) {
                            this.btn_nha_mang_vina.setVisible(true);
                            this.is_vina = true;
                            array_homenetwork.push(this.btn_nha_mang_vina);
                            this.dauso_sms_vina = "8x98";
                        }
                    }
                    if (this.is_mobi == false) {
                        if (lobby.sms_telco[i] == 2) {
                            this.btn_nha_mang_mobi.setVisible(true);
                            this.is_mobi = true;
                            array_homenetwork.push(this.btn_nha_mang_mobi);
                            this.dauso_sms_mobi = "8x98";
                        }
                    }
                    if (lobby.sms_telco[i] == 3) {
                        this.btn_nha_mang_vnmobile.setVisible(true);
                        array_homenetwork.push(this.btn_nha_mang_vnmobile);
                        this.is_vnmobile = true;
                    }
                    if (lobby.sms_telco[i] == 4) {
                        this.btn_nha_mang_beeline.setVisible(true);
                        array_homenetwork.push(this.btn_nha_mang_beeline);
                        this.is_beeline = true;
                    }
                }
            }

            for (var i = 0; i < array_homenetwork.length; i++) {
                array_homenetwork[i].y = posy;
                posy = posy - 50;
            }
            this.bg_chose_homenet_sms.height = 3 + array_homenetwork.length * 50;

            if (lobby.is_sms_plus == 0) {
                for (var i = (lobby.sms_plus_amount.length - 1); i >= 0; i--) {
                    var cl1 = new ccui.Layout();
                    cl1.height = 45;
                    cl1.width = this.lv_9029.width;

                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/bg_2.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/bg_2.png");
                    button.setPosition(cc.p(128, 22.5));
                    button.setScaleX(0.7);
                    button.setScaleY(0.85);
                    var str = lobby.sms_plus_amount[i] * 1000;
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(24);
                    button.setName(lobby.sms_plus_amount[i]);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonSelectMenhGia9029(sender.getName());
                                break;
                        }

                    }, this);
                    cl1.addChild(button);
                    this.lv_9029.pushBackCustomItem(cl1);
                }
                if (lobby.sms_plus_amount.length > 4)
                    this.bg_pn_9029.height = 228;
                else
                    this.bg_pn_9029.height = 3 + lobby.sms_plus_amount.length * 45;
            }
            if (lobby.is_sms == 0) {
                for (var i = (lobby.sms_amount.length - 1); i >= 0; i--) {
                    var cl1 = new ccui.Layout();
                    cl1.height = 45;
                    cl1.width = this.lv_8x98.width;

                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/bg_2.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/bg_2.png");
                    button.setPosition(cc.p(128, 22.5));
                    button.setScaleX(0.7);
                    button.setScaleY(0.85);
                    var str = lobby.sms_amount[i] * 1000;
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(24);
                    button.setName(lobby.sms_amount[i]);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonSelectMenhGia8x98(sender.getName());
                                break;
                        }

                    }, this);
                    cl1.addChild(button);
                    this.lv_8x98.pushBackCustomItem(cl1);
                }
                if (lobby.sms_amount.length > 4)
                    this.bg_pn_8x98.height = 228;
                else
                    this.bg_pn_8x98.height = 3 + lobby.sms_amount.length * 45;
            }
            this.AutoOpenHomeNet();
        },
        buttonSelectMenhGia9029: function (str) {
            shopping_info.menhgia_sms = str * 1000;
            shopping_info.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
            shopping_info.pn_9029.setScaleY(0);
            shopping_info.pn_9029.setVisible(false);
            shopping_info.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
            shopping_info.showCuPhapSMS();
        },
        buttonSelectMenhGia8x98: function (str) {
            //cc.log("vao: " + str);
            shopping_info.menhgia_sms = str * 1000;
            shopping_info.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
            shopping_info.pn_8x98.setScaleY(0);
            shopping_info.pn_8x98.setVisible(false);
            shopping_info.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
            shopping_info.showCuPhapSMS();
        },
        choseHomeNetWork_SMS: function (value) {
            if (value == 0) {
                this.homenetwork_sms = 0;
                this.txt_nha_mang_sms.setString("Viettel");
                if (this.dauso_sms_viettel == "9029") {
                    this.txt_notice_sms.setString("Điều kiện: hoạt động >= 180 ngày\nHạn mức: 500k/ngày");
                    this.menhgia_sms = lobby.sms_plus_amount[lobby.sms_plus_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                } else {
                    this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                    shopping_info.menhgia_sms = lobby.sms_amount[lobby.sms_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                }
            } else if (value == 1) {
                this.homenetwork_sms = 1;
                this.txt_nha_mang_sms.setString("Vinaphone");
                if (this.dauso_sms_vina == "9029") {
                    this.txt_notice_sms.setString("Trả trước:\n- Điều kiện: hoạt động >= 180 ngày\n- Hạn mức: 200k/ngày\nTrả sau:\n- Với thuê bao thường và hạn mức < 1 Triệu / tháng hạn mức 100k/tháng" +
                        "\n- Với thuê bao có mức cam kết cước / tháng > 1 Triệu \nđồng hạn mức tối đa 10% giá trị cước cam kết / tháng");
                    this.menhgia_sms = lobby.sms_plus_amount[lobby.sms_plus_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                } else {
                    this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                    shopping_info.menhgia_sms = lobby.sms_amount[lobby.sms_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                }
            } else if (value == 2) {
                this.homenetwork_sms = 2;
                this.txt_nha_mang_sms.setString("Mobifone");
                if (this.dauso_sms_mobi == "9029") {
                    this.txt_notice_sms.setString("Điều kiện: hoạt động >= 90 ngày, phát sinh cước gọi, tin nhắn\nHạn mức: 500k/ngày");
                    this.menhgia_sms = lobby.sms_plus_amount[lobby.sms_plus_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                } else {
                    this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                    shopping_info.menhgia_sms = lobby.sms_amount[lobby.sms_amount.length - 1] * 1000;
                    this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                    this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
                }
            } else if (value == 3) {
                this.homenetwork_sms = 3;
                this.txt_nha_mang_sms.setString("VietNamMobile");
                this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                shopping_info.menhgia_sms = lobby.sms_amount[lobby.sms_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
            } else if (value == 4) {
                this.homenetwork_sms = 4;
                this.txt_nha_mang_sms.setString("Beeline");
                this.txt_notice_sms.setString("Hạn mức: 150k / ngày");
                shopping_info.menhgia_sms = lobby.sms_amount[lobby.sms_amount.length - 1] * 1000;
                this.txt_menhgia_sms.setString(formatMoney(0, 3, shopping_info.menhgia_sms));
                this.txt_vin_sms_plus.setString(formatMoney(0, 3, shopping_info.menhgia_sms * lobby.ratio_nap_sms) + " VIN");
            }
            this.showCuPhapSMS();
            this.pn_nha_mang_sms.setScaleY(0);
            this.pn_nha_mang_sms.setVisible(false);
            this.pn_chose_menh_gia.setVisible(true);
            this.txt_dieukien_sms.setVisible(true);
        },
        openMenhGia_SMS: function () {
            if (this.homenetwork_sms == 0) {
                if (this.dauso_sms_viettel == "9029") {
                    this.pn_9029.setVisible(true);
                    this.pn_9029.runAction(cc.scaleTo(0.2, 1, 1));
                } else {
                    this.pn_8x98.setVisible(true);
                    this.pn_8x98.runAction(cc.scaleTo(0.2, 1, 1));
                }
            } else if (this.homenetwork_sms == 1) {
                if (this.dauso_sms_vina == "9029") {
                    this.pn_9029.setVisible(true);
                    this.pn_9029.runAction(cc.scaleTo(0.2, 1, 1));
                } else {
                    this.pn_8x98.setVisible(true);
                    this.pn_8x98.runAction(cc.scaleTo(0.2, 1, 1));
                }
            } else if (this.homenetwork_sms == 2) {
                if (this.dauso_sms_mobi == "9029") {
                    this.pn_9029.setVisible(true);
                    this.pn_9029.runAction(cc.scaleTo(0.2, 1, 1));
                } else {
                    this.pn_8x98.setVisible(true);
                    this.pn_8x98.runAction(cc.scaleTo(0.2, 1, 1));
                }
            } else if (this.homenetwork_sms == 3 || this.homenetwork_sms == 4) {
                this.pn_8x98.setVisible(true);
                this.pn_8x98.runAction(cc.scaleTo(0.2, 1, 1));
            }
        },
        closePanelNapTuSMS: function () {
            this.pn_vin_from_sms.setVisible(false);
            this.pn_chose_menh_gia.setVisible(false);
            this.pn_nha_mang_sms.setVisible(false);
            this.pn_cu_phap_sms.setVisible(false);
            this.txt_vin_sms_plus.setString("");
            this.txt_menhgia_sms.setString("");
            this.txt_nha_mang_sms.setString("");
            this.txt_dieukien_sms.setVisible(false);
            this.menhgia_sms = 0;
        },
        showCuPhapSMS: function () {
            if (this.menhgia_sms != 0) {
                if (this.homenetwork_sms == 0) {
                    if (this.dauso_sms_viettel == "9029") {
                        this.savecuphap = "MW " + this.menhgia_sms + " VPL NAP " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("MW  " + this.menhgia_sms + "  VPL  NAP  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString("9029");
                    } else {
                        this.savecuphap = "VPL " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("VPL  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString(this.getDauSo8x98(this.menhgia_sms));
                    }
                } else if (this.homenetwork_sms == 1) {
                    if (this.dauso_sms_vina == "9029") {
                        this.savecuphap = "MW VPL " + this.getGoiNap9029(this.menhgia_sms) + " " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("MW  VPL  " + this.getGoiNap9029(this.menhgia_sms) + "  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString("9029");
                    } else {
                        this.savecuphap = "VPL " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("VPL  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString(this.getDauSo8x98(this.menhgia_sms));
                    }
                } else if (this.homenetwork_sms == 2) {
                    if (this.dauso_sms_mobi == "9029") {
                        this.savecuphap = "MW VPL " + this.getGoiNap9029(this.menhgia_sms) + " " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("MW  VPL  " + this.getGoiNap9029(this.menhgia_sms) + "  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString("9029");
                    } else {
                        this.savecuphap = "VPL " + lobby.userInfo.nickname;
                        this.txt_cu_phap.setString("VPL  " + lobby.userInfo.nickname);
                        this.txt_dau_so_sms.setString(this.getDauSo8x98(this.menhgia_sms));
                    }
                } else if (this.homenetwork_sms == 3 || this.homenetwork_sms == 4) {
                    this.savecuphap = "VPL " + lobby.userInfo.nickname;
                    this.txt_cu_phap.setString("VPL  " + lobby.userInfo.nickname);
                    this.txt_dau_so_sms.setString(this.getDauSo8x98(this.menhgia_sms));
                }
                this.pn_cu_phap_sms.setVisible(true);
            } else {
                popup.openPanel_Alert_Lobby("Vui lòng chọn đầy đủ thông tin!");
            }
        },
        getDauSo8x98: function (value) {
            var str = "";
            if (value == 1000) return str = "8198";
            else if (value == 2000) return str = "8298";
            else if (value == 3000) return str = "8398";
            else if (value == 4000) return str = "8498";
            else if (value == 5000) return str = "8598";
            else if (value == 10000) return str = "8698";
            else if (value == 15000) return str = "8798";
        },
        getGoiNap9029: function (value) {
            var str = "";
            if (value == 1000) return str = "NAP1";
            else if (value == 2000) return str = "NAP2";
            else if (value == 3000) return str = "NAP3";
            else if (value == 4000) return str = "NAP4";
            else if (value == 5000) return str = "NAP5";
            else if (value == 10000) return str = "NAP10";
            else if (value == 15000) return str = "NAP15";
            else if (value == 20000) return str = "NAP20";
            else if (value == 30000) return str = "NAP30";
            else if (value == 50000) return str = "NAP50";
            else if (value == 100000) return str = "NAP100";
        },
        AutoOpenHomeNet: function () {
            if (lobby.networkCode == 1) {
                if (this.is_mobi == true)
                    this.choseHomeNetWork_SMS(2);
            } else if (lobby.networkCode == 2) {
                if (this.is_vina == true)
                    this.choseHomeNetWork_SMS(1);
            } else if (lobby.networkCode == 4) {
                if (this.is_vietel == true)
                    this.choseHomeNetWork_SMS(0);
            } else if (lobby.networkCode == 5) {
                if (this.is_vnmobile == true)
                    this.choseHomeNetWork_SMS(3);
            } else if (lobby.networkCode == 7) {
                if (this.is_beeline == true)
                    this.choseHomeNetWork_SMS(4);
            } else {
                if (this.is_vietel == true)
                    this.choseHomeNetWork_SMS(0);
                else if (this.is_mobi == true)
                    this.choseHomeNetWork_SMS(2);
                else if (this.is_vina == true)
                    this.choseHomeNetWork_SMS(1);
                else if (this.is_vnmobile == true)
                    this.choseHomeNetWork_SMS(3);
                else if (this.is_beeline == true)
                    this.choseHomeNetWork_SMS(4);
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case code_shopping_info.BTN_CLOSE_PN_9029:
                    this.pn_9029.setVisible(false);
                    this.pn_9029.setScaleY(0);
                    break;
                case code_shopping_info.BTN_CLOSE_PN_8X98:
                    this.pn_8x98.setVisible(false);
                    this.pn_8x98.setScaleY(0);
                    break;
                case code_shopping_info.BTN_SOANTIN_SMS:
                    if (cc.sys.isNative)
                        ConnectNative.sendSMS(shopping_info.txt_dau_so_sms.getString(), this.savecuphap);
                    break;
                case code_shopping_info.BTN_CHOSE_MENHGIA_SMS:
                    this.openMenhGia_SMS();
                    break;
                case code_shopping_info.BTN_HOMENETWORK_VIETTEL_SMS:
                    this.choseHomeNetWork_SMS(0);
                    break;
                case code_shopping_info.BTN_HOMENETWORK_VINA_SMS:
                    this.choseHomeNetWork_SMS(1);
                    break;
                case code_shopping_info.BTN_HOMENETWORK_MOBI_SMS:
                    this.choseHomeNetWork_SMS(2);
                    break;
                case code_shopping_info.BTN_HOMENETWORK_VNM_SMS:
                    this.choseHomeNetWork_SMS(3);
                    break;
                case code_shopping_info.BTN_HOMENETWORK_BEE_SMS:
                    this.choseHomeNetWork_SMS(4);
                    break;
                case code_shopping_info.BTN_CLOSE_HOMENETWORK_SMS:
                    this.pn_nha_mang_sms.setScaleY(0);
                    this.pn_nha_mang_sms.setVisible(false);
                    break;
                case code_shopping_info.BTN_CHOSE_HOMENETWORK_SMS:
                    this.pn_nha_mang_sms.setVisible(true);
                    this.pn_nha_mang_sms.runAction(cc.scaleTo(0.2, 1, 1));
                    break;
                case code_shopping_info.BTN_SHOP_NAP_VIN_SMS:
                    this.pn_nap_vin.setVisible(false);
                    this.pn_vin_from_sms.setVisible(true);
                    this.btn_back_shop.setVisible(true);
                    this.current_menu_shop = "napvin";
                    if (this.is_first_nap_sms == false) {
                        this.configRechargeVin_SMS();
                        this.is_first_nap_sms = true;
                    } else
                        this.AutoOpenHomeNet();
                    break;
                case code_shopping_info.BTN_DOWNLOAD_VINPLUS:
                    if (cc.sys.os == cc.sys.OS_ANDROID) {
                        //ConnectNative.openWebView("https://play.google.com/store/apps/details?id=com.vinplus", false);
                        cc.sys.openURL("https://play.google.com/store/apps/details?id=com.vinotp");
                    }
                    break;
                case code_shopping_info.BTN_SHOP_IAP:
                    this.pn_in_app_purchase.setVisible(true);
                    this.pn_nap_vin.setVisible(false);
                    this.pn_nap_the.setVisible(false);
                    this.pn_nap_banking.setVisible(false);
                    this.btn_back_shop.setVisible(true);
                    this.current_menu_shop = "napvin";
                    break;
                case code_shopping_info.BTN_SHOP_IAP_1:
                    lobby.sku_iap = IAPManager.SKU_1;
                    this.funCheckIAP(1);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_2:
                    lobby.sku_iap = IAPManager.SKU_2;
                    this.funCheckIAP(2);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_3:
                    lobby.sku_iap = IAPManager.SKU_3;
                    this.funCheckIAP(3);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_4:
                    lobby.sku_iap = IAPManager.SKU_4;
                    this.funCheckIAP(4);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_5:
                    lobby.sku_iap = IAPManager.SKU_5;
                    this.funCheckIAP(5);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_6:
                    lobby.sku_iap = IAPManager.SKU_6;
                    this.funCheckIAP(6);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_7:
                    lobby.sku_iap = IAPManager.SKU_7;
                    this.funCheckIAP(7);
                    break;
                case code_shopping_info.BTN_SHOP_IAP_8:
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        lobby.sku_iap = IAPManager.SKU_9;
                    } else
                        lobby.sku_iap = IAPManager.SKU_8;
                    this.funCheckIAP(8);
                    break;
                case code_shopping_info.BTN_NAP_VIN_BANKING:
                    this.funRechargeBank();
                    break;
                case code_shopping_info.BTN_SELECT_MG_BANK:
                    this.pn_menh_gia_bank.setVisible(true);
                    this.pn_menh_gia_bank.runAction(cc.scaleTo(0.2, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_SELECT_MG_BANK:
                    this.pn_menh_gia_bank.setVisible(false);
                    this.pn_menh_gia_bank.runAction(cc.scaleTo(0, 1, 0));
                    break;
                case code_shopping_info.BTN_SELECT_BANK:
                    this.pn_select_bank.setVisible(true);
                    this.pn_select_bank.runAction(cc.scaleTo(0.2, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_SELECT_BANK:
                    this.pn_select_bank.setVisible(false);
                    this.pn_select_bank.runAction(cc.scaleTo(0, 1, 0));
                    break;
                case code_shopping_info.BTN_XACNHAN_MUATHE:
                    this.pn_notice_mua_the.setVisible(false);
                    this.pn_notice_mua_the.runAction(cc.scaleTo(0, 0));
                    this.pn_content.removeAllChildren();
                    break;
                case code_shopping_info.BTN_CLEAR_FONE:
                    this.tf_phone_number_nttt.setString("");
                    this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
                    this.btn_clear_fone.setVisible(false);
                    this.tf_phone_number_nttt.setColor(cc.color("#FFFFFF"));
                    this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_shopping_info.BTN_CLEAR_SERIAL:
                    this.tf_serial.setString("");
                    this.tf_serial.setPlaceHolder("Nhập số serial");
                    this.btn_clear_serial.setVisible(false);
                    this.tf_serial.setColor(cc.color("#FFFFFF"));
                    this.tf_serial.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_shopping_info.BTN_CLEAR_MATHE:
                    this.tf_ma_the.setString("");
                    this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
                    this.btn_clear_mathe.setVisible(false);
                    this.tf_ma_the.setColor(cc.color("#FFFFFF"));
                    this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_shopping_info.BTN_SHOP_CLOSE:
                    closeshopping_info();
                    break;
                // panel shoping
                case code_shopping_info.BTN_SHOP_BACK:
                    if (shopping_info.current_menu_shop == "napvin") {
                        shopping_info.kind_card_mobile = "";
                        shopping_info.btn_back_shop.setVisible(false);
                        shopping_info.pn_nap_vin.setVisible(true);
                        shopping_info.pn_nap_the.setVisible(false);
                        shopping_info.pn_nap_banking.setVisible(false);
                        shopping_info.pn_in_app_purchase.setVisible(false);
                        shopping_info.pn_vin_from_sms.setVisible(false);
                    } else if (shopping_info.current_menu_shop == "tieuvin") {
                        shopping_info.kind_card_mobile = "";
                        shopping_info.btn_back_shop.setVisible(false);
                        shopping_info.pn_tieu_vin.setVisible(true);
                        shopping_info.pn_mua_the_DT.setVisible(false);
                        shopping_info.pn_mua_the_game.setVisible(false);
                        shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
                        this.tf_soluong_thegame.setString("");
                        this.lb_gia_ban_thegame.setString("");
                        this.tf_soluong_dt.setString("");
                        this.tf_gia_ban_dt.setString("");
                        shopping_info.pn_shopping_napvin.setVisible(true);
                    }
                    break;
                case code_shopping_info.BTN_SHOP_NAPVIN:
                    shopping_info.pn_nap_vin.setVisible(true);
                    shopping_info.pn_nap_the.setVisible(false);
                    shopping_info.pn_nap_banking.setVisible(false);
                    shopping_info.pn_nap_xu.setVisible(false);
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_mua_the_DT.setVisible(false);
                    shopping_info.pn_mua_the_game.setVisible(false);
                    shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
                    shopping_info.pn_in_app_purchase.setVisible(false);
                    this.closePanelNapTuSMS();
                    shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                    shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                    shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    shopping_info.current_menu_shop = "napvin";
                    shopping_info.btn_back_shop.setVisible(false);
                    menutab.select_nap_xu = "napvin";
                    if (shopping_info.is_show_iap == true) {
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_in_app_purchase.setVisible(true);
                    }
                    break;
                case code_shopping_info.BTN_SHOP_NAPXU:
                    shopping_info.pn_nap_vin.setVisible(false);
                    shopping_info.pn_nap_the.setVisible(false);
                    shopping_info.pn_nap_banking.setVisible(false);
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_mua_the_DT.setVisible(false);
                    shopping_info.pn_mua_the_game.setVisible(false);
                    shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
                    shopping_info.pn_in_app_purchase.setVisible(false);
                    this.closePanelNapTuSMS();
                    if (lobby.is_recharge_xu == 0)
                        shopping_info.pn_nap_xu.setVisible(true);
                    else
                        shopping_info.pn_nap_xu.setVisible(false);
                    shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid.png");
                    shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    shopping_info.current_menu_shop = "napxu";
                    shopping_info.btn_back_shop.setVisible(false);
                    menutab.select_nap_xu = "napxu";
                    this.funGetMoneyUse();
                    break;
                case code_shopping_info.BTN_SHOP_TIEUVIN:
                    shopping_info.pn_nap_vin.setVisible(false);
                    shopping_info.pn_nap_the.setVisible(false);
                    shopping_info.pn_nap_banking.setVisible(false);
                    shopping_info.pn_nap_xu.setVisible(false);
                    this.pn_tieu_vin.setVisible(true);
                    shopping_info.pn_mua_the_DT.setVisible(false);
                    shopping_info.pn_mua_the_game.setVisible(false);
                    shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
                    shopping_info.pn_in_app_purchase.setVisible(false);
                    this.closePanelNapTuSMS();
                    shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                    shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                    shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                    shopping_info.current_menu_shop = "tieuvin";
                    shopping_info.btn_back_shop.setVisible(false);
                    menutab.select_nap_xu = "tieuvin";
                    this.tf_soluong_thegame.setString("");
                    this.lb_gia_ban_thegame.setString("");
                    this.tf_soluong_dt.setString("");
                    this.tf_gia_ban_dt.setString("");
                    break;
                case code_shopping_info.BTN_SHOP_VINA:
                    if (this.is_Vina == true) {
                        shopping_info.kind_card_mobile = "vina";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");

                    break;
                case code_shopping_info.BTN_SHOP_VNMOBILE:
                    if (this.is_VietnamMobile == true) {
                        shopping_info.kind_card_mobile = "vnmobile";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_GATE:
                    if (this.is_Gate == true) {
                        shopping_info.kind_card_mobile = "gate";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_MOBI:
                    if (this.is_Mobile == true) {
                        shopping_info.kind_card_mobile = "mobi";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_VIETTEL:
                    if (this.is_Viettel == true) {
                        shopping_info.kind_card_mobile = "viettel";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_ZING:
                    if (this.is_Zing == true) {
                        shopping_info.kind_card_mobile = "zingxu";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_VCOIN:
                    if (this.is_Vcoin == true) {
                        shopping_info.kind_card_mobile = "vcoin";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_BEELINE:
                    if (this.is_Bee == true) {
                        shopping_info.kind_card_mobile = "vbee";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    break;
                case code_shopping_info.BTN_SHOP_NAP_VIN_CARD:
                    if (lobby.is_vin_card == 0) {
                        shopping_info.kind_card_mobile = "vincard";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SHOP_NAP_MEGA:
                    if (lobby.is_nap_mega_card == 0) {
                        shopping_info.kind_card_mobile = "megacard";
                        shopping_info.btn_back_shop.setVisible(true);
                        shopping_info.pn_nap_vin.setVisible(false);
                        shopping_info.pn_nap_the.setVisible(true);
                        shopping_info.current_menu_shop = "napvin";
                        this.openPanel_NapThe();
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SHOP_INTERNETBANKING:
                    shopping_info.btn_back_shop.setVisible(true);
                    shopping_info.pn_nap_vin.setVisible(false);
                    shopping_info.pn_nap_banking.setVisible(true);
                    shopping_info.current_menu_shop = "napvin";
                    if (this.isfirtgetNapBank == false) {
                        this.gotoNapBank();
                        this.isfirtgetNapBank = true;
                    }
                    break;
                case code_shopping_info.BTN_SELECT_ARROW:
                    shopping_info.pn_select_the.setVisible(true);
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 1));
                    this.tf_serial.setVisible(false);
                    this.tf_ma_the.setVisible(false);
                    break;
                case code_shopping_info.BTN_CLOSE_SELECT_THE:
                    //shopping_info.kind_card_mobile = "";
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VINA:
                    if (this.is_Vina == true) {
                        shopping_info.lb_the_selected.setString("Thẻ Vinaphone");
                        shopping_info.kind_card_mobile = "vina";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_MOBI:
                    if (this.is_Mobile == true) {
                        shopping_info.lb_the_selected.setString("Thẻ Mobifone");
                        shopping_info.kind_card_mobile = "mobi";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VIETTEL:
                    if (this.is_Viettel == true) {
                        shopping_info.lb_the_selected.setString("Thẻ Viettel");
                        shopping_info.kind_card_mobile = "viettel";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_ZING:
                    if (this.is_Zing == true) {
                        shopping_info.lb_the_selected.setString("Thẻ ZingXu");
                        shopping_info.kind_card_mobile = "zingxu";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VCOIN:
                    if (this.is_Vcoin == true) {
                        shopping_info.lb_the_selected.setString("Thẻ VCoin");
                        shopping_info.kind_card_mobile = "vcoin";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VNMOBILE:
                    if (this.is_VietnamMobile == true) {
                        shopping_info.lb_the_selected.setString("Thẻ VietNamMobile");
                        shopping_info.kind_card_mobile = "vnmobile";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VBEE:
                    if (this.is_Bee == true) {
                        shopping_info.lb_the_selected.setString("Thẻ G Mobile");
                        shopping_info.kind_card_mobile = "vbee";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_GATE:
                    if (this.is_Gate == true) {
                        shopping_info.lb_the_selected.setString("Thẻ Gate");
                        shopping_info.kind_card_mobile = "gate";
                        this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_VIN_CARD:
                    shopping_info.lb_the_selected.setString("Thẻ Vinplay");
                    shopping_info.kind_card_mobile = "vincard";
                    this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the.setVisible(false);
                    this.tf_serial.setVisible(true);
                    this.tf_ma_the.setVisible(true);
                    break;
                //case code_shopping_info.BTN_SELECT_MEGA_CARD:
                    //shopping_info.lb_the_selected.setString("Thẻ Mega");
                    //shopping_info.kind_card_mobile = "megacard";
                    //this.LoadMenhGiaThe(shopping_info.kind_card_mobile);
                    //shopping_info.pn_select_the.runAction(cc.scaleTo(0.15, 1, 0));
                    //shopping_info.pn_select_the.setVisible(false);
                    //this.tf_serial.setVisible(true);
                    //this.tf_ma_the.setVisible(true);
                    //break;
                case code_shopping_info.BTN_NAP_THE_DT:
                    if (this.kind_card_mobile == "vincard")
                        this.RechargeVinplayCard();
                    else if (this.kind_card_mobile == "megacard")
                        this.RechargeMegaCard();
                    else
                        this.RechargeVinFromCard();
                    break;
                case code_shopping_info.BTN_MUA_MA_THE:
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_mua_the_DT.setVisible(true);
                    shopping_info.btn_back_shop.setVisible(true);
                    this.lb_mua_the_selected.setString(this.getLabelTheDT(lobby.buy_card[0], 0));
                    this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                    this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                    this.funGetMoneyUse();
                    this.kind_panel_shop = "mua_the";
                    this.loadNhaMang(lobby.buy_card);
                    this.changeButtonNhaMang(0);
                    this.resetCheckNhaMang();
                    this.checkNhaMang(lobby.buy_card);
                    break;
                case code_shopping_info.BTN_MUA_THE_GAME:
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_mua_the_game.setVisible(true);
                    shopping_info.btn_back_shop.setVisible(true);
                    //cc.log("buy card game" + lobby.buy_card_game[0]);
                    //cc.log("kind_mua_the_game " + shopping_info.kind_mua_the_game);
                    shopping_info.lb_mua_the_game.setString(this.getLabelTheGame(lobby.buy_card_game[0]));
                    this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_game, 0);
                    this.GotoMuaTheGame(shopping_info.kind_mua_the_game);
                    this.funGetMoneyUse();
                    break;
                case code_shopping_info.BTN_NAPTIEN_TRATRUOC:
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_nap_tien_tra_truoc.setVisible(true);
                    shopping_info.btn_back_shop.setVisible(true);
                    this.lb_nttt_loai_the.setString(this.getLabelTheDT(lobby.recharge_mobile[0], 1));
                    this.typeRechargeMobile = 1;
                    this.LoadDauSo(shopping_info.kind_mua_the_dt);
                    this.kind_panel_shop = "nap_dt";
                    this.funGetMoneyUse();
                    this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 1);
                    this.txt_title_nap_dt.setString("NẠP TIỀN TRẢ TRƯỚC");
                    this.loadNhaMang(lobby.recharge_mobile);
                    this.changeButtonNhaMang(1);
                    this.resetCheckNhaMang();
                    this.checkNhaMang(lobby.recharge_mobile);
                    this.tf_phone_number_nttt.setString("");
                    this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
                    this.tf_phone_number_nttt.setColor(cc.color("#FFFFFF"));
                    this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
                    this.lb_notice_trasau.setVisible(false);
                    break;
                case code_shopping_info.BTN_NAPTIEN_TRASAU:
                    shopping_info.pn_tieu_vin.setVisible(false);
                    shopping_info.pn_nap_tien_tra_truoc.setVisible(true);
                    shopping_info.btn_back_shop.setVisible(true);
                    this.lb_nttt_loai_the.setString(this.getLabelTheDT(lobby.recharge_mobile[0], 1));
                    this.typeRechargeMobile = 2;
                    this.LoadDauSo(shopping_info.kind_mua_the_dt);
                    this.kind_panel_shop = "nap_dt";
                    this.funGetMoneyUse();
                    this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 1);
                    this.txt_title_nap_dt.setString("NẠP TIỀN TRẢ SAU");
                    this.loadNhaMang(lobby.recharge_mobile);
                    this.changeButtonNhaMang(1);
                    this.resetCheckNhaMang();
                    this.checkNhaMang(lobby.recharge_mobile);
                    this.tf_phone_number_nttt.setString("");
                    this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
                    this.tf_phone_number_nttt.setColor(cc.color("#FFFFFF"));
                    this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
                    this.lb_notice_trasau.setVisible(true);
                    break;
                case code_shopping_info.BTN_SELECT_MUA_THE_DT:
                    shopping_info.pn_nha_mang.setVisible(true);
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_TIEP_TUC_MUA_THE_DT:
                    this.funBuyCardMobile_Game(0);
                    break;
                case code_shopping_info.BTN_TIEPTUC_THEGAME:
                    this.funBuyCardMobile_Game(1);
                    break;
                case code_shopping_info.BTN_CLOSE_SELECT_MUA_THE_DT:
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEDT_VINA:
                    if (this.is_Buy_Vina == true) {
                        if (this.kind_panel_shop == "mua_the") {
                            shopping_info.kind_mua_the_dt = "vina";
                            this.closePanel_Nhamang(1);
                            this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                            this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                        } else {
                            this.closePanel_Nhamang(1);
                            this.homenetwork_nap_dt = 1;
                            this.LoadDauSo("vina");
                        }
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEDT_MOBI:
                    if (this.is_Buy_Mobile == true) {
                        if (this.kind_panel_shop == "mua_the") {
                            shopping_info.kind_mua_the_dt = "mobi";
                            this.closePanel_Nhamang(2);
                            this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                            this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                        } else {
                            this.closePanel_Nhamang(2);
                            this.homenetwork_nap_dt = 2;
                            this.LoadDauSo("mobi");
                        }
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEDT_VIETTEL:
                    if (this.is_Buy_Viettel == true) {
                        if (this.kind_panel_shop == "mua_the") {
                            shopping_info.kind_mua_the_dt = "viettel";
                            this.closePanel_Nhamang(3);
                            this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                            this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                        } else {
                            this.closePanel_Nhamang(3);
                            this.homenetwork_nap_dt = 0;
                            this.LoadDauSo("viettel");
                        }
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEDT_VNMOBILE:
                    if (this.is_Buy_VietnamMobile == true) {
                        if (this.kind_panel_shop == "mua_the") {
                            shopping_info.kind_mua_the_dt = "vnmobile";
                            this.closePanel_Nhamang(4);
                            this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                            this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                        } else {
                            this.closePanel_Nhamang(4);
                            this.homenetwork_nap_dt = 3;
                            this.LoadDauSo("vnmobile");
                        }
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break
                case code_shopping_info.BTN_MUATHEDT_BEELINE:
                    if (this.is_Buy_Bee == true) {
                        if (this.kind_panel_shop == "mua_the") {
                            shopping_info.kind_mua_the_dt = "vbee";
                            this.closePanel_Nhamang(5);
                            this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_dt, 0);
                            this.GotoMuaTheDienThoai(shopping_info.kind_mua_the_dt);
                        } else {
                            this.closePanel_Nhamang(5);
                            this.homenetwork_nap_dt = 4;
                            this.LoadDauSo("vbee");
                        }
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_nha_mang.setVisible(false);
                    break
                case code_shopping_info.BTN_OPEN_MENHGIA_DT:
                    shopping_info.pn_menhgia_thedt.setVisible(true);
                    shopping_info.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_MENHGIA_DT:
                    shopping_info.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_menhgia_thedt.setVisible(false);
                    break;
                case code_shopping_info.BTN_SELECT_THEGAME:
                    shopping_info.pn_select_the_game.setVisible(true);
                    shopping_info.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_SELECT_THEGAME:
                    shopping_info.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the_game.setVisible(false);
                    break;
                case code_shopping_info.BTN_MENHGIA_THEGAME:
                    shopping_info.pn_menhgia_thegame.setVisible(true);
                    shopping_info.pn_menhgia_thegame.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_MENHGIA_THEGAME:
                    shopping_info.pn_menhgia_thegame.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_menhgia_thegame.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEGAME_ZING:
                    if (this.is_Buy_Zing == true) {
                        shopping_info.kind_mua_the_game = "zingxu";
                        shopping_info.lb_mua_the_game.setString("Thẻ ZING");
                        this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_game, 0);
                        this.GotoMuaTheGame(shopping_info.kind_mua_the_game);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the_game.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEGAME_VCOIN:
                    if (this.is_Buy_Vcoin == true) {
                        shopping_info.kind_mua_the_game = "vcoin";
                        shopping_info.lb_mua_the_game.setString("Thẻ VCOIN");
                        this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_game, 0);
                        this.GotoMuaTheGame(shopping_info.kind_mua_the_game);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the_game.setVisible(false);
                    break;
                case code_shopping_info.BTN_MUATHEGAME_GATE:
                    if (this.is_Buy_Gate == true) {
                        shopping_info.kind_mua_the_game = "gate";
                        shopping_info.lb_mua_the_game.setString("Thẻ GATE");
                        this.LoadMenhGiaThe_Buy_Card(shopping_info.kind_mua_the_game, 0);
                        this.GotoMuaTheGame(shopping_info.kind_mua_the_game);
                    } else
                        popup.openPanel_Alert_Lobby("Kênh đang bảo trì...!");
                    shopping_info.pn_select_the_game.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_select_the_game.setVisible(false);
                    break;
                case code_shopping_info.BTN_SELECT_NHAMANG_NTTT:
                    shopping_info.pn_nha_mang.setVisible(true);
                    shopping_info.pn_nha_mang.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_SELECT_DAUSO_NTTT:
                    shopping_info.pn_dau_so_mobi.setVisible(true);
                    shopping_info.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_CLOSE_DAUSO_MOBI:
                    shopping_info.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_dau_so_mobi.setVisible(false);
                    break;
                case code_shopping_info.BTN_CHUYEN_KHOAN:
                    closeshopping_info();
                    openchuyenkhoan(0);
                    break;
                case code_shopping_info.BTN_NAPXU_DOIXU:
                    this.RechargeVinToXu();
                    break;
                case code_shopping_info.BTN_CLOSE_MENHGIA_NAP_DT:
                    shopping_info.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 0));
                    shopping_info.pn_menhgia_nap_dt.setVisible(false);
                    break;
                case code_shopping_info.BTN_OPEN_MENHGIA_NAP_DT:
                    shopping_info.pn_menhgia_nap_dt.setVisible(true);
                    shopping_info.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 1));
                    break;
                case code_shopping_info.BTN_TIEPTUC_NTTT:
                    this.funRechargeMobile();
                    break;
            }
        },

        funCheckIAP: function (sku) {
            if (Minigame.isLoginSocket) {
                var checkiap = new CmdSendCheckIAP();
                checkiap.putCheckIAP(sku);
                Minigame.miniGameClient.send(checkiap);
                checkiap.clean();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        funGetMoneyUse: function () {
            if (Minigame.isLoginSocket) {
                var getMoneyUse = new CmdSendGetMoneyUse();
                getMoneyUse.putGetMoneyUse();
                Minigame.miniGameClient.send(getMoneyUse);
                getMoneyUse.clean();
            } else {
                popup.openPanel_Alert_Lobby("Hệ thống nạp thẻ tạm thời bị gián đoạn!");
                Minigame.connectSocket();
            }
        },
        responseGetMoneyUse: function (moneyUse) {
            //cc.log("moneyUse : " + moneyUse);
            lobby.userInfo.moneyUse = moneyUse;
            if (shopping_info != null) {
                this.lb_sodu_kd_napxu.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
                this.lb_sodu_kd_muathe_dt.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
                this.lb_sodu_kd_muathe_game.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
                this.lb_sodu_kd_nap_dt.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
            }
            if (chuyenkhoan != null)
                chuyenkhoan.lb_so_du_vin.setString(formatMoney(0, 3, lobby.userInfo.moneyUse));
        },

        gotoSercurity: function () {
            shopping_info.tf_money_vin.setString("");
            shopping_info.tf_money_again.setString("");
            shopping_info.lb_xu_nhan_duoc.setString("");
            shopping_info.tf_soluong_dt.setString("");
            shopping_info.tf_gia_ban_dt.setString("");
            shopping_info.lb_check_daily.setVisible(false);

            closeshopping_info();
            opensercurity_info();
            sercurity_info.resetSP_Button_Baomat();
            if (sercurity_info.check_dangky_baomat == 0) {
                sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                sercurity_info.gotoTab = "TTBM_B";
            } else {
                sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                sercurity_info.gotoTab = "TTBM_S";
            }
            sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
        },

        RechargeVinToXu: function () {
            var str = this.tf_money_vin.getString();
            str = replaceAll(".", "", str);

            var xunhan = this.lb_xu_nhan_duoc.getString();
            xunhan = replaceAll(".", "", xunhan);
            if (str == null || str == "")
                str = 0;
            //cc.log("chuyen len " + parseInt(str));
            if (str == "") {
                popup.openPanel_Alert_Lobby("Vui lòng nhập số VIN cần chuyển!");
            } else if (this.tf_money_vin.getString() != this.tf_money_again.getString()) {
                popup.openPanel_Alert_Lobby("Số VIN nhập lại chưa chính xác!");
            } else {
                if (parseInt(str) > lobby.userInfo.moneyUse) {
                    popup.openPanel_Alert_Lobby("Bạn không đủ số dư để chuyển!");
                } else {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn\nđổi " + formatMoney(0, 3, parseInt(str)) + " VIN thành " + formatMoney(0, 3, parseInt(xunhan)) + " XU không?", "ĐỒNG Ý", "HỦY", this.confirmRechargeVintoXu, null);
                }

            }
        },
        confirmRechargeVintoXu: function () {
            shopping_info.btn_doi_xu.setEnabled(false);
            var str = shopping_info.tf_money_vin.getString();
            str = replaceAll(".", "", str);
            if (Minigame.isLoginSocket) {
                var rechargeXu = new CmdSendRechargeXu();
                rechargeXu.putRechargeXu(parseInt(str));
                Minigame.miniGameClient.send(rechargeXu);
                rechargeXu.clean();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseRechargeXu: function (error) {
            //cc.log("error: " + error);
            shopping_info.btn_doi_xu.setEnabled(true);
            if (error == 1) {
                popup.openPanel_Alert_Lobby("Chuyển Vin sang Xu thất bại!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Bạn không đủ số dư để chuyển!");
            } else if (error == 3) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", this.gotoSercurity, null);
                })));
            } else if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất chuyển Vin sang Xu!", 1);
            } else if (error == 10) {
                popup.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau " + lobby.configHour + "h kích hoạt bảo mật thành công!");
            }
        },
        responseResultRechargeXu: function (error, currentVin, currentXu) {
            //cc.log("error: " + error + " currentVin : " + currentVin + " currentXu : "+ currentXu);
            if (error == 0) {
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentVin;
                    lobby.userInfo.xuTotal = currentXu;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.lb_blance_xu.setString(formatMoney(0, 3, parseInt(lobby.userInfo.xuTotal)));
                    menutab.changeFontMoney();
                }
                this.tf_money_vin.setString("");
                this.tf_money_vin.setPlaceHolder("Nhập số Vin cần đổi");
                this.tf_money_vin.setColor(cc.color("#FFFFFF"));
                this.tf_money_vin.runAction(cc.scaleTo(0.225, 1));

                this.tf_money_again.setString("");
                this.tf_money_again.setPlaceHolder("Nhập lại số Vin cần đổi");
                this.tf_money_again.setColor(cc.color("#FFFFFF"));
                this.tf_money_again.runAction(cc.scaleTo(0.225, 1));

                this.lb_xu_nhan_duoc.setString("");

                popup.openPanel_Alert_Lobby("Giao dịch thành công!");
                this.funGetMoneyUse();
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Giao dịch thất bại!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Bạn không đủ số dư!");
            }
        },

        RechargeMegaCard: function () {
            var serial = this.tf_serial.getString();
            var mathe = this.tf_ma_the.getString();

            if (serial == null || serial == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
            else if (serial.length < 5 || serial.length > 20)
                popup.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
            else if (mathe == null || mathe == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
            else if (mathe.length < 5 || mathe.length > 20)
                popup.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
            else {
                if (this.numberFail_mega == (lobby.num_recharge_fail - 1) || this.numberFail_mega == (lobby.num_recharge_fail - 2)) {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn đã nạp sai " + shopping_info.numberFail_mega + " lần liên tiếp.\nNếu nạp sai " + lobby.num_recharge_fail
                        + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVinplayCard, null);
                } else {
                    this.confirmRechargeMegaCard();
                }
            }
        },
        confirmRechargeMegaCard: function () {
            var serial = shopping_info.tf_serial.getString();
            var mathe = shopping_info.tf_ma_the.getString();

            if (Minigame.isLoginSocket) {
                var rechargeMega = new CmdSendRechargeMegaCard();
                rechargeMega.putdata(serial, mathe);
                Minigame.miniGameClient.send(rechargeMega);
                rechargeMega.clean();
                shopping_info.btn_nap_the_dt.setEnabled(false);
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseRechargeMegaCard: function (error, currentMoney, timefail, numberfail) {
            cc.log("error nap the mega: " + error + " currentMoney: " + currentMoney + " timefail: " + timefail + " intfail: " + numberfail);
            this.numberFail_mega = numberfail;
            shopping_info.btn_nap_the_dt.setEnabled(true);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Nạp thẻ thành công!");
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentMoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
                this.funGetMoneyUse();

                this.tf_serial.setString("");
                this.tf_serial.setPlaceHolder("Nhập số serial");
                this.tf_serial.setColor(cc.color("#FFFFFF"));
                this.tf_serial.runAction(cc.scaleTo(0.225, 1));

                this.tf_ma_the.setString("");
                this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
                this.tf_ma_the.setColor(cc.color("#FFFFFF"));
                this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            } else if (error == 30) {
                popup.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
            } else if (error == 31) {
                popup.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
            } else if (error == 32) {
                popup.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
            } else if (error == 33) {
                popup.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
            } else if (error == 34) {
                popup.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
            } else if (error == 35) {
                popup.openPanel_Alert_Lobby("Thông tin không chính xác!");
            } else if (error == 36) {
                popup.openPanel_Alert_Lobby("Thông tin không chính xác!");
            } else if (error == 37 || error == 38) {
                popup.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
            } else if (error == 39) {
                popup.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ Vinplay Card!");
            } else if (error == 8) {
                popup.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info.formartHourMinus(timefail));
            }
        },

        RechargeVinplayCard: function () {
            var serial = this.tf_serial.getString();
            var mathe = this.tf_ma_the.getString();

            if (serial == null || serial == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
            else if (serial.length < 5 || serial.length > 20)
                popup.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
            else if (mathe == null || mathe == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
            else if (mathe.length < 5 || mathe.length > 20)
                popup.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
            else {
                if (this.numberFail_vinplay == (lobby.num_recharge_fail - 1) || this.numberFail_vinplay == (lobby.num_recharge_fail - 2)) {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn đã nạp sai " + shopping_info.numberFail_vinplay + " lần liên tiếp.\nNếu nạp sai " + lobby.num_recharge_fail
                        + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVinplayCard, null);
                } else {
                    this.confirmRechargeVinplayCard();
                }
            }
        },
        confirmRechargeVinplayCard: function () {
            var serial = shopping_info.tf_serial.getString();
            var mathe = shopping_info.tf_ma_the.getString();

            if (Minigame.isLoginSocket) {
                var rechargeVin = new CmdSendRechargeVinPlayCard();
                rechargeVin.putRechargeVinPlayCard(serial, mathe);
                Minigame.miniGameClient.send(rechargeVin);
                rechargeVin.clean();
                shopping_info.btn_nap_the_dt.setEnabled(false);
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseRechargeVinplayCard: function (error, currentMoney, timefail, numberfail) {
            cc.log("error nap the vinplay: " + error + " currentMoney: " + currentMoney + " timefail: " + timefail + " intfail: " + numberfail);
            this.numberFail_vinplay = numberfail;
            shopping_info.btn_nap_the_dt.setEnabled(true);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Nạp thẻ thành công!");
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentMoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
                this.funGetMoneyUse();

                this.tf_serial.setString("");
                this.tf_serial.setPlaceHolder("Nhập số serial");
                this.tf_serial.setColor(cc.color("#FFFFFF"));
                this.tf_serial.runAction(cc.scaleTo(0.225, 1));

                this.tf_ma_the.setString("");
                this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
                this.tf_ma_the.setColor(cc.color("#FFFFFF"));
                this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            } else if (error == 30) {
                popup.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
            } else if (error == 31) {
                popup.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
            } else if (error == 32) {
                popup.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
            } else if (error == 33) {
                popup.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
            } else if (error == 34) {
                popup.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
            } else if (error == 35) {
                popup.openPanel_Alert_Lobby("Thông tin không chính xác!");
            } else if (error == 36) {
                popup.openPanel_Alert_Lobby("Thông tin không chính xác!");
            } else if (error == 37 || error == 38) {
                popup.openPanel_Alert_Lobby("Hệ thống nạp thẻ vincard đang tạm thời gián đoạn, vui lòng thử lại sau!");
            } else if (error == 39) {
                popup.openPanel_Alert_Lobby("Đại lý không được phép nạp thẻ Vinplay Card!");
            } else if (error == 8) {
                popup.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info.formartHourMinus(timefail));
            }
        },

        RechargeVinFromCard: function () {
            var serial = this.tf_serial.getString();
            var mathe = this.tf_ma_the.getString();

            if (this.kind_card_mobile == "viettel")
                this.provider = 0;
            else if (this.kind_card_mobile == "vina")
                this.provider = 1;
            else if (this.kind_card_mobile == "mobi")
                this.provider = 2;
            else if (this.kind_card_mobile == "vnmobile")
                this.provider = 3;
            else if (this.kind_card_mobile == "vbee")
                this.provider = 4;
            else if (this.kind_card_mobile == "gate")
                this.provider = 5;
            else if (this.kind_card_mobile == "zingxu")
                this.provider = 6;
            else if (this.kind_card_mobile == "vcoin")
                this.provider = 7;
            //cc.log("provide :" + this.provider);

            if (this.provider == null || this.provider > 8 || this.provider < 0)
                popup.openPanel_Alert_Lobby("Vui lòng chọn nhà mạng!");
            else if (serial == null || serial == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập số serial!");
            else if (serial.length < 5 || serial.length > 20)
                popup.openPanel_Alert_Lobby("Mã serial có độ dài từ 5 - 20 ký tự!");
            else if (mathe == null || mathe == "")
                popup.openPanel_Alert_Lobby("Vui lòng nhập mã thẻ!");
            else if (mathe.length < 5 || mathe.length > 20)
                popup.openPanel_Alert_Lobby("Mã thẻ có độ dài từ 5 - 20 ký tự!");
            else {
                if (this.numberFail == (lobby.num_recharge_fail - 1) || this.numberFail == (lobby.num_recharge_fail - 2)) {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn đã nạp sai " + shopping_info.numberFail + " lần liên tiếp.\nNếu nạp sai " + lobby.num_recharge_fail
                        + " lần liên tiếp, tài khoản sẽ tạm thời bị khóa nạp thẻ.\nBạn có muốn tiếp tục không!", "ĐỒNG Ý", "HỦY", this.confirmRechargeVin, null);
                } else {
                    this.confirmRechargeVin();
                }
            }
        },
        confirmRechargeVin: function () {
            var serial = shopping_info.tf_serial.getString();
            var mathe = shopping_info.tf_ma_the.getString();

            if (Minigame.isLoginSocket) {
                //cc.log("gui nap the");
                var rechargeVin = new CmdSendRechargeVin();
                rechargeVin.putRechargeVin(shopping_info.provider, serial, mathe);
                Minigame.miniGameClient.send(rechargeVin);
                rechargeVin.clean();

                shopping_info.btn_nap_the_dt.setEnabled(false);
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseRechargeVin: function (error, currentMoney, timefail, numberfail) {
            //cc.log("error nap the: " + error + " currentMoney: " + currentMoney + " timefail: "+ timefail + " intfail: " + numberfail);
            this.numberFail = numberfail;
            shopping_info.btn_nap_the_dt.setEnabled(true);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Nạp thẻ thành công!");
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentMoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
                this.funGetMoneyUse();

                this.tf_serial.setString("");
                this.tf_serial.setPlaceHolder("Nhập số serial");
                this.tf_serial.setColor(cc.color("#FFFFFF"));
                this.tf_serial.runAction(cc.scaleTo(0.225, 1));

                this.tf_ma_the.setString("");
                this.tf_ma_the.setPlaceHolder("Nhập mã thẻ");
                this.tf_ma_the.setColor(cc.color("#FFFFFF"));
                this.tf_ma_the.runAction(cc.scaleTo(0.225, 1));
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            } else if (error == 30) {
                popup.openPanel_Alert_Lobby("Hệ thống đã ghi nhận giao dịch, vui lòng chờ hệ thống xử lý!");
            } else if (error == 31) {
                popup.openPanel_Alert_Lobby("Thẻ đã được sử dụng!");
            } else if (error == 32) {
                popup.openPanel_Alert_Lobby("Thẻ đã bị khóa!");
            } else if (error == 33) {
                popup.openPanel_Alert_Lobby("Thẻ chưa được kích hoạt!");
            } else if (error == 34) {
                popup.openPanel_Alert_Lobby("Thẻ đã hết hạn sử dụng!");
            } else if (error == 35) {
                popup.openPanel_Alert_Lobby("Mã thẻ không đúng!");
            } else if (error == 36) {
                popup.openPanel_Alert_Lobby("Số serial không đúng!");
            } else if (error == 8) {
                popup.openPanel_Alert_Lobby("Tài khoản đã bị khóa nạp thẻ do nạp sai quá nhiều lần!\nThời gian khóa nạp thẻ còn lại: " + shopping_info.formartHourMinus(timefail));
            }
        },
        formartHourMinus: function (value) {
            var h = parseInt(value / 60);
            var m = value - (h * 60);
            var strM = "";
            if (m < 10) strM = "0" + m;
            else strM = m;

            var str = "";
            if (h == 0)
                str = strM + " phút";
            else if (h < 10)
                str = "0" + h + " giờ : " + strM + " phút";
            else
                str = h + " giờ : " + strM + " phút";
            return str
        },

        closePanel_Nhamang: function (value) {
            if (value == 1) { /// vina
                if (shopping_info.kind_panel_shop == "mua_the") {
                    shopping_info.lb_mua_the_selected.setString("Thẻ Vinaphone");
                } else if (shopping_info.kind_panel_shop == "nap_dt") {
                    shopping_info.lb_nttt_loai_the.setString("Vinaphone");
                    shopping_info.lb_dau_so_nttt.setString("091");
                }
            } else if (value == 2) { /// mobi
                if (shopping_info.kind_panel_shop == "mua_the") {
                    shopping_info.lb_mua_the_selected.setString("Thẻ Mobifone");
                } else if (shopping_info.kind_panel_shop == "nap_dt") {
                    shopping_info.lb_nttt_loai_the.setString("Mobifone");
                    shopping_info.lb_dau_so_nttt.setString("090");
                }
            } else if (value == 3) { /// viettel
                if (shopping_info.kind_panel_shop == "mua_the") {
                    shopping_info.lb_mua_the_selected.setString("Thẻ Viettel");
                } else if (shopping_info.kind_panel_shop == "nap_dt") {
                    shopping_info.lb_nttt_loai_the.setString("Viettel");
                    shopping_info.lb_dau_so_nttt.setString("097");
                }
            } else if (value == 4) { /// vn mobile
                if (shopping_info.kind_panel_shop == "mua_the") {
                    shopping_info.lb_mua_the_selected.setString("Thẻ VietnamMobile");
                } else if (shopping_info.kind_panel_shop == "nap_dt") {
                    shopping_info.lb_nttt_loai_the.setString("VietnamMobile");
                    shopping_info.lb_dau_so_nttt.setString("097");
                }
            } else if (value == 5) { /// vn mobile
                if (shopping_info.kind_panel_shop == "mua_the") {
                    shopping_info.lb_mua_the_selected.setString("Thẻ G Mobile");
                } else if (shopping_info.kind_panel_shop == "nap_dt") {
                    shopping_info.lb_nttt_loai_the.setString("G Mobile");
                    shopping_info.lb_dau_so_nttt.setString("097");
                }
            }
        },
        openPanel_NapThe: function () {
            if (shopping_info.kind_card_mobile == "vina") {
                shopping_info.lb_the_selected.setString("Thẻ Vinaphone");
            } else if (shopping_info.kind_card_mobile == "mobi") {
                shopping_info.lb_the_selected.setString("Thẻ Mobifone");
            } else if (shopping_info.kind_card_mobile == "viettel") {
                shopping_info.lb_the_selected.setString("Thẻ Viettel");
            } else if (shopping_info.kind_card_mobile == "zingxu") {
                shopping_info.lb_the_selected.setString("Thẻ ZingXu");
            } else if (shopping_info.kind_card_mobile == "vcoin") {
                shopping_info.lb_the_selected.setString("Thẻ VCoin");
            } else if (shopping_info.kind_card_mobile == "vnmobile") {
                shopping_info.lb_the_selected.setString("Thẻ VietNamMobile");
            } else if (shopping_info.kind_card_mobile == "gate") {
                shopping_info.lb_the_selected.setString("Thẻ Gate");
            } else if (shopping_info.kind_card_mobile == "vbee") {
                shopping_info.lb_the_selected.setString("Thẻ G Mobile");
            } else if (shopping_info.kind_card_mobile == "vincard") {
                shopping_info.lb_the_selected.setString("Thẻ Vinplay");
            } else if (shopping_info.kind_card_mobile == "megacard") {
                shopping_info.lb_the_selected.setString("Thẻ Mega");
            }
        },

        text_field_event: function (sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    if (sender.name == "tf_so_vin_chuyen" || sender.name == "tf_money_vin" || sender.name == "tf_money_again")
                        sender.setColor(cc.color("#C200FF"));
                    else
                        sender.setColor(cc.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                }
                    break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    //cc.log("length: " + sender.getString().length);
                    if (sender.getString().length != 0)
                        if (sender.name == "tf_so_vin_chuyen" || sender.name == "tf_money_vin" || sender.name == "tf_money_again")
                            sender.setColor(cc.color("#C200FF"));
                        else
                            sender.setColor(cc.color("#3E3E3E"));
                    else
                        sender.setColor(cc.color("#FFFFFF"));
                    var str2 = sender.getString();
                    if (sender.name == "tf_money_vin") {
                        sender.setPlaceHolder("Nhập số Vin cần đổi");
                        var str = this.tf_money_vin.getString();
                        str = replaceAll(".", "", str);
                        if (parseInt(str) > 0)
                            this.lb_xu_nhan_duoc.setString(formatMoney(0, 3, parseInt(parseInt(str) * lobby.radio_xu)));
                        else
                            this.lb_xu_nhan_duoc.setString("");
                    } else if (sender.name == "tf_money_again") {
                        sender.setPlaceHolder("Nhập lại số Vin cần đổi");
                    } else if (sender.name == "tf_soluong_dt") {
                        sender.setPlaceHolder("0");
                    } else if (sender.name == "tf_soluong_thegame") {
                        sender.setPlaceHolder("0");
                    } else if (sender.name == "tf_serial") {
                        sender.setPlaceHolder("Nhập số serial");
                        if (str2.length == 0) {
                            this.btn_clear_serial.setVisible(false);
                        }
                    } else if (sender.name == "tf_ma_the") {
                        sender.setPlaceHolder("Nhập mã thẻ");
                        if (str2.length == 0) {
                            this.btn_clear_mathe.setVisible(false);
                        }
                    } else if (sender.name == "tf_phone_number_nttt") {
                        sender.setPlaceHolder("Nhập số điện thoại");
                        if (str2.length == 0) {
                            this.btn_clear_fone.setVisible(false);
                        }
                    }
                    if (sender.getString() == 0) {
                        sender.setString("");
                        sender.getString().length = 0;
                        sender.setColor(cc.color("#FFFFFF"));
                    }
                }
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    if (sender.name == "tf_so_vin_chuyen" || sender.name == "tf_money_vin" || sender.name == "tf_money_again" || sender.name == "tf_soluong_dt" || sender.name == "tf_soluong_thegame"
                        || sender.name == "tf_phone_number_nttt") {
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        if (!isNumeric(str)) {
                            str = str.substr(0, str.length - 1);
                        }
                        if (!isNumeric(str)) {
                            str = "0";
                        }
                        if (sender.name == "tf_phone_number_nttt") {
                            sender.setString(str);
                        } else
                            sender.setString(formatMoney(0, 3, Number(str)));
                        if (sender.name == "tf_so_vin_chuyen") {
                            if (Number(str) >= 10000)
                                this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, parseInt(Number(str) * lobby.radio_tranfer)));
                        }
                        if (sender.name == "tf_soluong_dt" || sender.name == "tf_soluong_thegame") {
                            if (Number(str) > lobby.num_cash_out) {
                                this.tf_soluong_dt.setString(lobby.num_cash_out);
                                this.tf_soluong_thegame.setString(lobby.num_cash_out);
                                str = lobby.num_cash_out;
                            } else {

                            }
                            this.showMoneyBuyCard();
                        }
                    }
                    if (sender.name == "tf_serial") {
                        this.btn_clear_serial.setVisible(true);
                    } else if (sender.name == "tf_ma_the") {
                        this.btn_clear_mathe.setVisible(true);
                    } else if (sender.name == "tf_phone_number_nttt") {
                        this.btn_clear_fone.setVisible(true);
                    }
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    if (sender.name == "tf_money_vin" || sender.name == "tf_money_again") {
                        str = replaceAll(".", "", str);
                        sender.setString(formatMoney(0, 3, Number(str)));
                    }
                    if (sender.name == "tf_serial") {
                        if (str.length == 0) {
                            this.btn_clear_serial.setVisible(false);
                        }
                    } else if (sender.name == "tf_ma_the") {
                        if (str.length == 0) {
                            this.btn_clear_mathe.setVisible(false);
                        }
                    } else if (sender.name == "tf_soluong_dt" || sender.name == "tf_soluong_thegame") {
                        this.tf_gia_ban_dt.setString("");
                        sender.setPlaceHolder("0");
                    } else if (sender.name == "tf_phone_number_nttt") {
                        if (str.length == 0) {
                            this.btn_clear_fone.setVisible(false);
                        }
                    }

                }
                    break;
            }

        },

        showMoneyBuyCard: function () {
            var str = this.tf_soluong_dt.getString();
            this.tf_gia_ban_dt.setString(formatMoney(0, 3, (shopping_info.menhgia_mua_the_dt * lobby.radio_exchange_card * Number(str)).toFixed(0)));
            var str2 = this.tf_soluong_thegame.getString();
            this.lb_gia_ban_thegame.setString(formatMoney(0, 3, (shopping_info.menhgia_mua_the_game * lobby.radio_exchange_card * Number(str2)).toFixed(0)));
            var str3 = this.lb_menh_gia_nap_dt.getString();
            str3 = replaceAll(".", "", str3);
            this.lb_gia_ban_nttt.setString(formatMoney(0, 3, (Number(str3) * lobby.radio_recharge_out_mobile).toFixed(0)) + " VIN");
        },

        CheckConfigRecharge_Cashout: function () {
            if (lobby.semi_recharge == 0) {
                this.btn_internet_banking.setVisible(true);
                this.btn_nap_vin_shop.setEnabled(true);
                this.txt_napvin.setString("Nạp Vin");

                if (lobby.is_vin_card == 0) {
                    this.btn_nap_VinCard.setVisible(true);
                    this.btn_nap_VinCard.x = this.PosNapVinX;
                    this.btn_nap_VinCard.y = this.PosNapVinY;
                    this.PosNapVinX = this.PosNapVinX + 231.01;
                    this.sum_item_napvin = this.sum_item_napvin + 1;
                    if (this.PosNapVinX > 865.48) {
                        this.PosNapVinX = 167.08;
                        this.PosNapVinY = this.PosNapVinY - 227.93;
                    }

                    this.btn_select_VinCard.setVisible(true);
                    this.btn_select_VinCard.y = this.posHomeNetY;
                    this.posHomeNetY = this.posHomeNetY - 40.62;
                }

                if (lobby.is_recharge_card_game == 0) {
                    this.VisibleNapThe();
                    this.btn_internet_banking.setVisible(false);
                    for (var i = 0; i < lobby.home_network.length; i++) {
                        if (this.sc_btn_homeNet.getChildByName("btn_nap_vin_" + lobby.home_network[i]) != null) {
                            var button = this.sc_btn_homeNet.getChildByName("btn_nap_vin_" + lobby.home_network[i]);
                            button.setVisible(true);
                            button.x = this.PosNapVinX;
                            button.y = this.PosNapVinY;
                            this.PosNapVinX = this.PosNapVinX + 231.01;
                            this.sum_item_napvin = this.sum_item_napvin + 1;
                            if (this.PosNapVinX > 865.48) {
                                this.PosNapVinX = 167.08;
                                this.PosNapVinY = this.PosNapVinY - 227.93;
                            }
                            this.getHomeNetWork(lobby.home_network[i]);
                        }
                        if (this.pn_select_the.getChildByName("btn_home_" + lobby.home_network[i]) != null) {
                            var button2 = this.pn_select_the.getChildByName("btn_home_" + lobby.home_network[i]);
                            button2.setVisible(true);
                            button2.y = this.posHomeNetY;
                            this.posHomeNetY = this.posHomeNetY - 40.62;
                            this.bg_pn_select_the.height = 12 + lobby.home_network.length * 33 + (lobby.home_network.length - 1) * 7.62;
                        }
                    }
                } else {
                    this.VisibleNapThe();
                    this.btn_internet_banking.x = this.PosNapVinX;
                    this.btn_internet_banking.y = this.PosNapVinY;
                }

                this.bg_pn_select_the.height = this.bg_pn_select_the.height + 40.62;

                if (lobby.is_nap_mega_card == 0) {
                    this.btn_select_megaCard.setVisible(true);
                    this.btn_select_megaCard.y = this.posHomeNetY;
                    this.posHomeNetY = this.posHomeNetY - 40.62;
                    this.bg_pn_select_the.height = this.bg_pn_select_the.height + 40.62;
                } else {
                    this.btn_select_megaCard.setVisible(false);
                }

                if (lobby.is_recharge_bank == 0) {
                    this.btn_internet_banking.setVisible(true);
                    this.btn_internet_banking.x = this.PosNapVinX;
                    this.btn_internet_banking.y = this.PosNapVinY;
                    this.PosNapVinX = this.PosNapVinX + 231.01;
                    this.sum_item_napvin = this.sum_item_napvin + 1;
                    if (this.PosNapVinX > 865.48) {
                        this.PosNapVinX = 167.08;
                        this.PosNapVinY = this.PosNapVinY - 227.93;
                    }
                } else {
                    this.btn_internet_banking.setVisible(false);
                }
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    this.btn_in_app_purchases.setVisible(false);
                } else if (cc.sys.os == cc.sys.OS_IOS) {
                    try {
                        if (ConnectNative.versionCode() == "1.3") {
                            if (lobby.is_recharge_iap == 0) {
                                this.btn_in_app_purchases.setVisible(true);
                                this.btn_in_app_purchases.x = this.PosNapVinX;
                                this.btn_in_app_purchases.y = this.PosNapVinY;
                                this.PosNapVinX = this.PosNapVinX + 231.01;
                                this.sum_item_napvin = this.sum_item_napvin + 1;
                                if (this.PosNapVinX > 865.48) {
                                    this.PosNapVinX = 167.08;
                                    this.PosNapVinY = this.PosNapVinY - 227.93;
                                }
                                if (lobby.is_recharge_card_game == 1 && lobby.is_recharge_bank == 1 && lobby.is_recharge_iap == 0) {
                                    this.btn_in_app_purchases.setVisible(false);
                                    this.is_show_iap = true;
                                    shopping_info.pn_nap_vin.setVisible(false);
                                    shopping_info.pn_in_app_purchase.setVisible(true);
                                }
                            } else {
                                this.btn_in_app_purchases.setVisible(false);
                            }
                        } else
                            this.btn_in_app_purchases.setVisible(false);
                    } catch (err) {
                        this.btn_in_app_purchases.setVisible(false);
                    }
                } else {
                    this.btn_in_app_purchases.setVisible(false);
                }

                if (lobby.is_sms == 0 || lobby.is_sms_plus == 0) {
                    this.btn_nap_sms.setVisible(true);
                    this.btn_nap_sms.x = this.PosNapVinX;
                    this.btn_nap_sms.y = this.PosNapVinY;
                    this.sum_item_napvin = this.sum_item_napvin + 1;
                    this.PosNapVinX = this.PosNapVinX + 231.01;
                    if (this.PosNapVinX > 865.48) {
                        this.PosNapVinX = 167.08;
                        this.PosNapVinY = this.PosNapVinY - 227.93;
                    }
                }
                if (lobby.is_nap_mega_card == 0) {
                    this.btn_nap_megaCard.setVisible(true);
                    this.btn_nap_megaCard.x = this.PosNapVinX;
                    this.btn_nap_megaCard.y = this.PosNapVinY;
                    this.sum_item_napvin = this.sum_item_napvin + 1;
                }
                if (this.sum_item_napvin > 8) {
                    this.sc_btn_homeNet.setTouchEnabled(true);
                } else
                    this.sc_btn_homeNet.setTouchEnabled(false);

                this.PosNapVinX = 167.08;
                this.PosNapVinY = 810.72;
                this.posHomeNetY = 326.47;
                this.sum_item_napvin = 0;
            } else {
                this.VisibleNapThe();
                this.btn_internet_banking.setVisible(false);
                this.btn_in_app_purchases.setVisible(false);
                this.PosNapVinX = 167.08;
                this.PosNapVinY = 578.74;
            }

            if (lobby.semi_cashout == 0) {
                this.btn_mua_ma_the.setVisible(true);
                this.btn_ma_the_game.setVisible(true);
                this.btn_nap_tien_tra_truoc.setVisible(true);
                this.btn_nap_tien_tra_sau.setVisible(true);
                this.btn_chuyen_khoan.y = 113.81;
                this.btn_nap_xu_shop.setEnabled(true);
                this.txt_napxu.setString("Nạp Xu");
                //shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                //shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                //shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");

                if (lobby.is_buy_card_game == 1) {
                    this.btn_mua_ma_the.setVisible(false);
                    this.btn_ma_the_game.setVisible(false);
                    this.btn_nap_tien_tra_truoc.x = 167.08;
                    this.btn_nap_tien_tra_truoc.y = 342.29;
                    this.btn_nap_tien_tra_sau.x = 399.09;
                    this.btn_nap_tien_tra_sau.y = 342.29;
                    this.btn_chuyen_khoan.x = 631.92;
                    this.btn_chuyen_khoan.y = 342.29;
                } else {
                    for (var j = 0; j < lobby.buy_card_game.length; j++) {
                        this.getHomeNetWork_Buy_Card_Game(lobby.buy_card_game[j]);
                    }

                    for (var i = 0; i < lobby.buy_card_game.length; i++) {
                        if (this.pn_select_the_game.getChildByName("btn_kind_game_" + lobby.buy_card_game[i]) != null) {
                            var button2 = this.pn_select_the_game.getChildByName("btn_kind_game_" + lobby.buy_card_game[i]);
                            button2.setVisible(true);
                            button2.y = this.posGame_tieuVinY;
                            this.posGame_tieuVinY = this.posGame_tieuVinY - 40.62;
                            this.bg_pn_select_the_game.height = 12 + lobby.buy_card_game.length * 33 + (lobby.buy_card_game.length - 1) * 7.62;
                        }
                    }
                    this.posGame_tieuVinY = 120.47;
                    this.btn_mua_ma_the.setVisible(true);
                    this.btn_ma_the_game.setVisible(true);
                    this.btn_mua_ma_the.x = 167.08;
                    this.btn_mua_ma_the.y = 342.29;
                    this.btn_ma_the_game.x = 399.09;
                    this.btn_ma_the_game.y = 344.44;
                    this.btn_nap_tien_tra_truoc.x = 631.92;
                    this.btn_nap_tien_tra_truoc.y = 342.50;
                    this.btn_nap_tien_tra_sau.x = 865.48;
                    this.btn_nap_tien_tra_sau.y = 342.54;
                    this.btn_chuyen_khoan.x = 167.08;
                    this.btn_chuyen_khoan.y = 113.81;
                }
                if (lobby.is_recharge_mobile_phone == 1) {
                    this.btn_nap_tien_tra_truoc.setVisible(false);
                    this.btn_nap_tien_tra_sau.setVisible(false);
                    this.btn_chuyen_khoan.x = 631.92;
                    this.btn_chuyen_khoan.y = 342.29;
                }
                if (lobby.is_buy_card_game == 1 && lobby.is_recharge_mobile_phone == 1) {
                    this.btn_chuyen_khoan.x = 167.08;
                    this.btn_chuyen_khoan.y = 342.29;
                }
            } else {
                this.btn_mua_ma_the.setVisible(false);
                this.btn_ma_the_game.setVisible(false);
                this.btn_nap_tien_tra_truoc.setVisible(false);
                this.btn_nap_tien_tra_sau.setVisible(false);
                this.btn_chuyen_khoan.y = 342.29;
                this.btn_nap_xu_shop.setEnabled(false);
                this.txt_napxu.setString("");
                shopping_info.pn_nap_xu.setVisible(false);
                //shopping_info.sp_nap_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                //shopping_info.sp_nap_xu_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_mid_s.png");
                //shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang.png");
                shopping_info.current_menu_shop = "tieuvin";
            }

            if (lobby.is_Exchange_money == 1)
                this.btn_chuyen_khoan.setVisible(false);

            if (lobby.is_buy_card_game == 1 && lobby.is_recharge_mobile_phone == 1 && lobby.is_Exchange_money == 1) {
                shopping_info.btn_tieu_vin_shop.setEnabled(false);
                shopping_info.sp_tieu_vin_shop.setTexture("res/ResourceMenuTab/BaoMat/btn_3_hang_s.png");
                shopping_info.current_menu_shop = "tieuvin";
                shopping_info.txt_tieuvin.setString("");
            }

            if (lobby.semi_recharge == 1 && lobby.semi_cashout == 1) {
                shopping_info.pn_nap_vin.setVisible(false);
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    shopping_info.pn_in_app_purchase.setVisible(false);
                } else if (cc.sys.os == cc.sys.OS_IOS) {
                    try {
                        if (ConnectNative.versionCode() == "1.3") {
                            shopping_info.pn_in_app_purchase.setVisible(true);
                        }
                    } catch (err) {
                        shopping_info.pn_in_app_purchase.setVisible(false);
                    }
                } else
                    shopping_info.pn_in_app_purchase.setVisible(false);

                shopping_info.sp_nap_vin_shop.setVisible(false);
                shopping_info.pn_nap_the.setVisible(false);
                shopping_info.pn_nap_banking.setVisible(false);
                shopping_info.pn_nap_xu.setVisible(false);
                shopping_info.pn_tieu_vin.setVisible(false);
                shopping_info.pn_mua_the_DT.setVisible(false);
                shopping_info.pn_mua_the_game.setVisible(false);
                shopping_info.pn_notice_mua_the.setVisible(false);
                shopping_info.pn_nap_tien_tra_truoc.setVisible(false);
                shopping_info.pn_mua_the_game.setVisible(false);

                shopping_info.sp_nap_xu_shop.setVisible(false);
                shopping_info.sp_tieu_vin_shop.setVisible(false);
                shopping_info.btn_nap_vin_shop.setVisible(false);
                shopping_info.btn_nap_xu_shop.setVisible(false);
                shopping_info.btn_tieu_vin_shop.setVisible(false);
                shopping_info.txt_tieuvin.setString("");
                shopping_info.txt_napxu.setString("");
                shopping_info.txt_napvin.setString("");
            }

            if (lobby.is_vin_plus == 0) {
                shopping_info.pn_vinplus.setVisible(true);
                if (cc.sys.os == cc.sys.OS_IOS)
                    shopping_info.pn_vinplus.setVisible(false);
            } else {
                shopping_info.pn_vinplus.setVisible(false);
            }
            if (lobby.facebook_canvas == true) {
                if (lobby.semi_recharge == 1 && lobby.semi_cashout == 1) {
                    shopping_info.pn_in_app_purchase.setVisible(false);
                }
            }
        },
        loadNhaMang: function (str) {
            var array = [];
            array = str;
            this.btn_muathedt_vina.setVisible(false);
            this.btn_muathedt_mobi.setVisible(false);
            this.btn_muathedt_viettel.setVisible(false);
            this.btn_muathedt_vnmobile.setVisible(false);
            this.btn_muathedt_bee.setVisible(false);

            for (var i = 0; i < array.length; i++) {
                if (this.pn_nha_mang.getChildByName("btn_home_tieuvin_" + array[i]) != null) {
                    var button2 = this.pn_nha_mang.getChildByName("btn_home_tieuvin_" + array[i]);
                    button2.setVisible(true);
                    button2.y = this.posHome_tieuVinY;
                    this.posHome_tieuVinY = this.posHome_tieuVinY - 40.62;
                    this.bg_pn_nha_mang.height = 12 + array.length * 33 + (array.length - 1) * 7.62;
                }
            }
            this.posHome_tieuVinY = 120.47;
        },
        changeButtonNhaMang: function (kind) {
            if (kind == 0) {
                this.btn_muathedt_vina.setTitleText("Thẻ Vinaphone");
                this.btn_muathedt_mobi.setTitleText("Thẻ Mobifone");
                this.btn_muathedt_viettel.setTitleText("Thẻ Viettel");
                this.btn_muathedt_vnmobile.setTitleText("Thẻ VietnamMobile");
                this.btn_muathedt_bee.setTitleText("Thẻ G Mobile");
            } else {
                this.btn_muathedt_vina.setTitleText("Vinaphone");
                this.btn_muathedt_mobi.setTitleText("Mobifone");
                this.btn_muathedt_viettel.setTitleText("Viettel");
                this.btn_muathedt_vnmobile.setTitleText("VietnamMobile");
                this.btn_muathedt_bee.setTitleText("G Mobile");
            }
        },

        VisibleNapThe: function () {
            this.btn_vinaphone.setVisible(false);
            this.btn_mobilecard.setVisible(false);
            this.btn_vietel.setVisible(false);
            this.btn_zing_xu.setVisible(false);
            this.btn_vcoin.setVisible(false);
            this.btn_vietnameMobile.setVisible(false);
            this.btn_gate.setVisible(false);
            this.btn_BeeLine.setVisible(false);
            this.btn_select_viettel.setVisible(false);
            this.btn_select_vina.setVisible(false);
            this.btn_select_mobi.setVisible(false);
            this.btn_select_vnMobile.setVisible(false);
            this.btn_select_vBee.setVisible(false);
            this.btn_select_Gate.setVisible(false);
            this.btn_select_zingxu.setVisible(false);
            this.btn_select_vcoin.setVisible(false);
            this.btn_muathedt_viettel.setVisible(false);
            this.btn_muathedt_vina.setVisible(false);
            this.btn_muathedt_mobi.setVisible(false);
            this.btn_muathedt_vnmobile.setVisible(false);
            this.btn_muathedt_bee.setVisible(false);
        },

        GetConfigBilling: function () {
            var url = urlGetConfigBilling();
            sendRequest(url, null, false, this.callBackGetConfig, this.callBackError);
        },
        callBackGetConfig: function (response) {
            //cc.log("config billing: " + response);
            var jsonData = JSON.parse(response);

            lobby.is_recharge_card_game = jsonData["is_nap_the"];
            lobby.is_recharge_bank = jsonData["is_nap_vin_nh"];
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                lobby.is_recharge_iap = 1;
            } else
                lobby.is_recharge_iap = jsonData["is_nap_vin_iap"];
            lobby.is_recharge_xu = jsonData["is_nap_xu"];
            lobby.is_Exchange_money = jsonData["is_chuyen_vin"];
            lobby.is_buy_card_game = jsonData["is_mua_the"];
            lobby.is_recharge_mobile_phone = jsonData["is_nap_dt"];
            lobby.radio_xu = jsonData["ratio_xu"];
            lobby.radio_vin = jsonData["ratio_nap_the"];
            lobby.radio_exchange_card = jsonData["ratio_mua_the"];
            lobby.radio_tranfer = jsonData["ratio_chuyen"];
            lobby.radio_bank = jsonData["ratio_nap_tien_nh"];
            lobby.radio_vin_bank = jsonData["ratio_nap_vin_nh"];
            shopping_info.txt_ratio_bank.setString("                     Nạp 1.000.000 nhận " + formatMoney(0, 3, (1000000 * lobby.radio_vin_bank).toFixed(0)) + " VIN");
            lobby.home_network = jsonData["nap_the"];
            lobby.recharge_bank = jsonData["nap_vin_nh"];
            lobby.buy_card = jsonData["mua_the_dt"];
            lobby.buy_card_game = jsonData["mua_the_game"];
            lobby.recharge_mobile = jsonData["nap_tien_dt"];
            lobby.transfer_min = jsonData["chuyen_vin_min"];
            lobby.valueRechargeBank = jsonData["i2b"];
            lobby.is_vin_plus = jsonData["is_vin_plus"];
            //lobby.is_vin_card = jsonData["is_nap_vin_card"];
            lobby.ratio_vin_card = jsonData["ratio_nap_vin_card"];
            //lobby.is_nap_mega_card = jsonData["is_nap_mega_card"];
            lobby.ratio_nap_mega_card = jsonData["ratio_nap_mega_card"];

            lobby.card_Vina = jsonData["Vina"];
            lobby.card_Mobi = jsonData["Mobi"];
            lobby.card_Viettel = jsonData["Viettel"];
            lobby.card_Zing = jsonData["Zing"];
            lobby.card_Gate = jsonData["Gate"];
            lobby.card_Vcoin = jsonData["Vcoin"];
            lobby.card_VnMobi = jsonData["VNM"];
            lobby.card_Bee = jsonData["Beeline"];

            lobby.radio_recharge_out_mobile = jsonData["ratio_nap_dt"];

            lobby.num_recharge_fail = jsonData["num_recharge_fail"];
            lobby.num_cash_out = jsonData["num_doi_the"];
            lobby.cashout_limit_user = jsonData["cashout_limit_user"];
            lobby.configHour = jsonData["cashout_time_block"];

            //lobby.is_sms_plus = jsonData["is_sms_plus"];
            //lobby.is_sms = jsonData["is_sms"];
            lobby.sms_plus_telco = jsonData["sms_plus_telco"];
            lobby.sms_telco = jsonData["sms_telco"];
            lobby.sms_plus_amount = jsonData["sms_plus_amount"];
            lobby.sms_amount = jsonData["sms_amount"];
            lobby.ratio_nap_sms = jsonData["ratio_nap_sms"];

            //cc.log("select_nap_xu: " + menutab.select_nap_xu);
            if (menutab.isGetConfigBilling == false) {
                if (menutab.select_nap_xu == "napvin") {
                    if (lobby.is_recharge_card_game == 0 || lobby.is_recharge_bank == 0 || lobby.is_recharge_iap == 0) {
                        shopping_info.showshopping_info();
                        if (profileUserAppear)
                            closeprofileUser();
                    } else {
                        closeshopping_info();
                    }
                } else if (menutab.select_nap_xu == "napxu") {
                    if (lobby.is_recharge_xu == 0) {
                        shopping_info.showshopping_info_xu();
                        if (profileUserAppear)
                            closeprofileUser();
                    } else {
                        closeshopping_info();
                    }
                } else if (menutab.select_nap_xu == "FIRST_GO_TO") {
                    shopping_info.showshopping_info();
                } else if (menutab.select_nap_xu == "chuyenkhoan") {
                    shopping_info.showshopping_info_tieuvin();
                    openchuyenkhoan(0);
                } else if (menutab.select_nap_xu == "daily") {
                    shopping_info.showshopping_info_tieuvin();
                    openchuyenkhoan(1);
                }
                menutab.isGetConfigBilling = true;
            } else {
                if (menutab.select_nap_xu == "napvin") {
                    shopping_info.showshopping_info();
                } else if (menutab.select_nap_xu == "tieuvin") {
                    if (lobby.is_Exchange_money == 0) {
                        shopping_info.showshopping_info_tieuvin();
                        openchuyenkhoan();
                    } else {
                        shopping_info.showshopping_info_tieuvin();
                        shopping_info.pn_shopping_napvin.setVisible(true);
                        shopping_info.pn_shopping_napvin.runAction(cc.sequence(cc.delayTime(0.01), cc.scaleTo(0.2, 1)));
                    }
                } else {
                    shopping_info.showshopping_info_xu();
                }
            }
            if (lobby.facebook_canvas == true) {
                if (lobby.payment_fb == 1) {
                    lobby.semi_recharge = 1;
                    lobby.semi_cashout = 1;
                }
            }

            shopping_info.lb_tile_vin_to_xu.setString("1.000Vin = " + formatMoney(0, 3, (1000 * lobby.radio_xu)) + " XU");
            shopping_info.CheckConfigRecharge_Cashout();

            shopping_info.lb_notice_muathe_dt.setString("Chú ý: Mỗi lần mua được tối đa " + lobby.num_cash_out + " thẻ");
            shopping_info.lb_notice_muathe_game.setString("Chú ý: Mỗi lần mua được tối đa " + lobby.num_cash_out + " thẻ");
        },
        getMenhGiaThe: function (value) {
            // cc.log("menhgia: " + value);
            var menhgia = 0;
            if (value == 0)
                menhgia = 10000;
            else if (value == 1)
                menhgia = 20000;
            else if (value == 2)
                menhgia = 50000;
            else if (value == 3)
                menhgia = 100000;
            else if (value == 4)
                menhgia = 200000;
            else if (value == 5)
                menhgia = 500000;
            else if (value == 6)
                menhgia = 1000000;
            else if (value == 7)
                menhgia = 2000000;
            else if (value == 8)
                menhgia = 5000000;
            return parseInt(menhgia);
        },
        getHomeNetWork: function (value) {
            if (value == 0) {
                this.is_Viettel = true;
                return;
            } else if (value == 1) {
                this.is_Vina = true;
                return;
            } else if (value == 2) {
                this.is_Mobile = true;
                return;
            } else if (value == 3) {
                this.is_VietnamMobile = true;
                return;
            } else if (value == 4) {
                this.is_Bee = true;
                return;
            } else if (value == 5) {
                this.is_Gate = true;
                return;
            } else if (value == 6) {
                this.is_Zing = true;
                return;
            } else if (value == 7) {
                this.is_Vcoin = true;
                return;
            }
        },

        getHomeNetWork_Buy_Card_Mobi: function (value) {
            if (value == 0) {
                this.is_Buy_Viettel = true;
                return;
            } else if (value == 1) {
                this.is_Buy_Vina = true;
                return;
            } else if (value == 2) {
                this.is_Buy_Mobile = true;
                return;
            } else if (value == 3) {
                this.is_Buy_VietnamMobile = true;
                return;
            } else if (value == 4) {
                this.is_Buy_Bee = true;
                return;
            }
        },
        resetCheckNhaMang: function () {
            this.is_Buy_Bee = false;
            this.is_Buy_Zing = false;
            this.is_Buy_Gate = false;
            this.is_Buy_Vcoin = false;
        },
        checkNhaMang: function (str) {
            for (var i = 0; i < str.length; i++) {
                this.getHomeNetWork_Buy_Card_Mobi(str[i]);
            }
        },
        getHomeNetWork_Buy_Card_Game: function (value) {
            if (value == 5) {
                this.is_Buy_Gate = true;
                return;
            } else if (value == 6) {
                this.is_Buy_Zing = true;
                return;
            } else if (value == 7) {
                this.is_Buy_Vcoin = true;
                return;
            }
        },

        LoadMenhGiaThe: function (str) {
            var array = "";
            this.lv_gia_the_nap.removeAllItems();
            if (str == "vina" || str == "mobi" || str == "viettel" || str == "vcoin" || str == "vnmobile" || str == "vbee") {
                array = [0, 1, 2, 3, 4, 5];
                shopping_info.txt_title_napthe.setString("NẠP THẺ ĐIỆN THOẠI");
            } else if (str == "vincard") {
                array = [0, 1, 2, 3, 4, 5, 6, 7];
                shopping_info.txt_title_napthe.setString("NẠP THẺ VINPLAY");
            } else if (str == "megacard") {
                array = [0, 1, 2, 3, 4, 5, 6, 7];
                shopping_info.txt_title_napthe.setString("NẠP THẺ MEGA");
            } else {
                array = [1, 2, 3, 4, 5, 6, 7, 8];
                shopping_info.txt_title_napthe.setString("NẠP THẺ GAME");
            }
            //cc.log("array : " + array);

            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < array.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width = this.lv_gia_the_nap.width;

                var lbMenhGia = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbMenhGia.setPosition(cc.p(70, positionY));
                var menhgia = this.getMenhGiaThe(array[i]);
                lbMenhGia.setString(formatMoney(0, 3, menhgia));
                lbMenhGia.setColor(cc.color("#e8daad"));

                var lbKhuyenMai = new cc.LabelTTF('', fonts.fontName, 14, cc.size(137, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbKhuyenMai.setPosition(cc.p(210, positionY));
                if (str == "vincard") {
                    lbKhuyenMai.setString(((lobby.ratio_vin_card * 100).toFixed(0) - 100) + "%");
                    lbKhuyenMai.setColor(cc.color("#e8daad"));
                } else if (str == "megacard") {
                    lbKhuyenMai.setString(((lobby.ratio_nap_mega_card * 100).toFixed(0) - 100) + "%");
                    lbKhuyenMai.setColor(cc.color("#e8daad"));
                } else {
                    lbKhuyenMai.setString(((lobby.radio_vin * 100).toFixed(0) - 100) + "%");
                    lbKhuyenMai.setColor(cc.color("#e8daad"));
                }

                var lbVin = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVin.setPosition(cc.p(370, positionY));
                if (str == "vincard")
                    var heso = menhgia * lobby.ratio_vin_card;
                else if (str == "megacard")
                    var heso = menhgia * lobby.ratio_nap_mega_card;
                else
                    var heso = menhgia * lobby.radio_vin;
                lbVin.setString(formatMoney(0, 3, heso.toFixed(0)));
                lbVin.setColor(cc.color("#E702FE"));

                cl1.addChild(lbMenhGia);
                cl1.addChild(lbKhuyenMai);
                cl1.addChild(lbVin);

                this.lv_gia_the_nap.pushBackCustomItem(cl1);
            }

        },
        LoadMenhGiaThe_Buy_Card: function (str, value) {
            var array = "";
            if (value == 0) {
                //cc.log("vao2");
                if (str == "vina" || str == "mobi" || str == "viettel" || str == "vnmobile" || str == "vbee") {
                    this.lv_menhgia_doi_the_dt.removeAllItems();
                } else {
                    this.lv_menhgia_doi_the_game.removeAllItems();
                }
            } else
                this.lv_menhgia_nap_dt.removeAllItems();

            if (str == "vina") {
                array = lobby.card_Vina;
            } else if (str == "mobi") {
                array = lobby.card_Mobi;
            } else if (str == "viettel") {
                array = lobby.card_Viettel;
            } else if (str == "zingxu") {
                array = lobby.card_Zing;
            } else if (str == "vcoin") {
                array = lobby.card_Vcoin;
            } else if (str == "vnmobile") {
                array = lobby.card_VnMobi;
            } else if (str == "vbee") {
                array = lobby.card_Bee;
            } else if (str == "gate") {
                array = lobby.card_Gate;
            }
            //cc.log("array the game: " + array);

            var cellHeight = 30;
            var positionY = 12;
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            if (value == 0) {
                for (var i = 0; i < array.length; i++) {
                    var cl1 = new ccui.Layout();
                    cl1.height = cellHeight;
                    cl1.width = this.lv_menhgia_doi_the_dt.width;

                    var lbMenhGia2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbMenhGia2.setPosition(cc.p(100, positionY));
                    var menhgia2 = this.getMenhGiaThe(array[i]);
                    lbMenhGia2.setString(formatMoney(0, 3, menhgia2));
                    lbMenhGia2.setColor(cc.color("#e8daad"));

                    var lbVin2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbVin2.setPosition(cc.p(340, positionY));
                    var heso2 = Number(menhgia2) * lobby.radio_exchange_card;
                    heso2 = heso2.toFixed(0);
                    lbVin2.setString(formatMoney(0, 3, Number(heso2)));
                    lbVin2.setColor(cc.color("#E702FE"));

                    cl1.addChild(lbMenhGia2);
                    cl1.addChild(lbVin2);

                    if (str == "vina" || str == "mobi" || str == "viettel" || str == "vnmobile" || str == "vbee") {
                        this.lv_menhgia_doi_the_dt.pushBackCustomItem(cl1);
                    } else
                        this.lv_menhgia_doi_the_game.pushBackCustomItem(cl1);
                }
            } else {
                for (var i = 0; i < array.length; i++) {
                    var cl1 = new ccui.Layout();
                    cl1.height = cellHeight;
                    cl1.width = this.lv_menhgia_nap_dt.width;

                    var lbMenhGia2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(141, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbMenhGia2.setPosition(cc.p(100, positionY));
                    var menhgia2 = this.getMenhGiaThe(array[i]);
                    lbMenhGia2.setString(formatMoney(0, 3, menhgia2));
                    lbMenhGia2.setColor(cc.color("#e8daad"));

                    var lbVin2 = new cc.LabelTTF('', fonts.fontName, 14, cc.size(186, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbVin2.setPosition(cc.p(340, positionY));
                    var heso2 = Number(menhgia2) * lobby.radio_recharge_out_mobile;
                    heso2 = heso2.toFixed(0);
                    lbVin2.setString(formatMoney(0, 3, Number(heso2)));
                    lbVin2.setColor(cc.color("#E702FE"));

                    cl1.addChild(lbMenhGia2);
                    cl1.addChild(lbVin2);

                    this.lv_menhgia_nap_dt.pushBackCustomItem(cl1);
                }
            }
        },

        LoadDauSo: function (str) {
            for (var j = 0; j < this.saveArray_dauso.length; j++) {
                if (this.pn_dau_so_mobi.getChildByName("btn_dauso_" + j) != null) {
                    var button = this.pn_dau_so_mobi.getChildByName("btn_dauso_" + j);
                    button.setVisible(false);
                }
            }

            var array = "";
            if (str == "vina") {
                array = this.arrayVina;
            } else if (str == "mobi") {
                array = this.arrayMobi;
            } else if (str == "viettel") {
                array = this.arrayViettel;
            } else if (str == "vnmobile") {
                array = this.arrayVnMobile;
            } else if (str == "vbee") {
                array = this.arrayBee;
            }
            this.saveArray_dauso = array;
            //cc.log("array : " + array);

            if (this.saveArray_dauso.length != 0) {
                this.dauso_chose = this.saveArray_dauso[0];
                this.lb_dau_so_nttt.setString(this.saveArray_dauso[0]);
            } else {
                this.dauso_chose = "";
                this.lb_dau_so_nttt.setString("");
            }
            if (cc.sys.isNative) {
                this.lv_dau_so.removeAllItems();
                this.lv_dau_so.removeAllChildren();
                for (var i = 0; i < this.saveArray_dauso.length; i++) {
                    var cl1 = new ccui.Layout();
                    cl1.height = 30;
                    cl1.width = this.lv_dau_so.width;

                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_dauso.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_dauso.png");
                    button.setPosition(cc.p(45, 15));
                    button.setTitleText(this.saveArray_dauso[i]);
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(20);
                    button.setName("btn_dauso_" + i);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonDauSo(sender.titleText);
                                break;
                        }

                    }, this);

                    cl1.addChild(button);
                    this.lv_dau_so.pushBackCustomItem(cl1);
                }
                this.positionY_dauso = 207;
                this.bg_pn_dau_so_mobi.height = 4 + this.saveArray_dauso.length * 28 + (this.saveArray_dauso.length - 1) * 4;
            } else {
                for (var i = 0; i < this.saveArray_dauso.length; i++) {
                    if (this.pn_dau_so_mobi.getChildByName("btn_dauso_" + i) == null) {
                        var button = new ccui.Button();
                        button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_dauso.png");
                        button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_dauso.png");
                        button.setPosition(cc.p(45, this.positionY_dauso));
                        button.setTitleText(this.saveArray_dauso[i]);
                        button.setTitleColor(cc.color("#000000"));
                        button.setTitleFontName("Roboto-Regular");
                        button.setTitleFontSize(20);
                        button.setName("btn_dauso_" + i);

                        this.pn_dau_so_mobi.addChild(button);

                        button.addTouchEventListener(function (sender, type) {
                            switch (type) {
                                case ccui.Widget.TOUCH_ENDED:
                                    this.buttonDauSo(sender.titleText);
                                    break;
                            }

                        }, this);
                        this.positionY_dauso = this.positionY_dauso - 32;
                    } else {
                        var button = this.pn_dau_so_mobi.getChildByName("btn_dauso_" + i);
                        button.setVisible(true);
                        var str = this.saveArray_dauso[i];
                        button.setTitleText(str);
                    }
                }
                this.positionY_dauso = 207;
                this.bg_pn_dau_so_mobi.height = 8 + this.saveArray_dauso.length * 28 + (this.saveArray_dauso.length - 1) * 4;
            }
            this.GotoNapDienThoai(str);

        },
        buttonDauSo: function (value) {
            //cc.log("dau so :" + value);
            shopping_info.dauso_chose = value;
            shopping_info.lb_dau_so_nttt.setString(value);
            shopping_info.pn_dau_so_mobi.setVisible(false);
            shopping_info.pn_dau_so_mobi.runAction(cc.scaleTo(0.15, 1, 0));
        },
        GotoNapDienThoai: function (str) {
            for (var j = 0; j < this.saveArray_nap_dt.length; j++) {
                if (this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + j) != null) {
                    var button = this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + j);
                    button.setVisible(false);
                }
            }

            if (str == "vina") {
                this.saveArray_nap_dt = lobby.card_Vina;
            } else if (str == "mobi") {
                this.saveArray_nap_dt = lobby.card_Mobi;
            } else if (str == "viettel") {
                this.saveArray_nap_dt = lobby.card_Viettel;
            } else if (str == "zingxu") {
                this.saveArray_nap_dt = lobby.card_Zing;
            } else if (str == "vcoin") {
                this.saveArray_nap_dt = lobby.card_Vcoin;
            } else if (str == "vnmobile") {
                this.saveArray_nap_dt = lobby.card_VnMobi;
            } else if (str == "vbee") {
                this.saveArray_nap_dt = lobby.card_Bee;
            } else if (str == "gate") {
                this.saveArray_nap_dt = lobby.card_Gate;
            }
            //cc.log("array : " + this.saveArray_nap_dt);
            if (this.saveArray_nap_dt.length != 0) {
                this.menhgia_nap_dt = this.getMenhGiaThe(this.saveArray_nap_dt[0]);
                this.lb_menh_gia_nap_dt.setString(formatMoney(0, 3, this.getMenhGiaThe(this.saveArray_nap_dt[0])));
            } else {
                this.menhgia_nap_dt = 0;
                this.lb_menh_gia_nap_dt.setString("");
            }

            for (var i = 0; i < this.saveArray_nap_dt.length; i++) {
                if (this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + i) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.setPosition(cc.p(123.03, this.positionY_napdt));
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_nap_dt[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(20);
                    button.setName("btn_nap_dt" + i);

                    this.pn_menhgia_nap_dt.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonNapDienThoai(sender.titleText);
                                break;
                        }

                    }, this);
                    this.positionY_napdt = this.positionY_napdt - 41;
                } else {
                    var button = this.pn_menhgia_nap_dt.getChildByName("btn_nap_dt" + i);
                    button.setVisible(true);
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_nap_dt[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                }
            }
            this.positionY_napdt = 187.15;
            this.bg_pn_menhgia_nap_dt.height = 12 + this.saveArray_nap_dt.length * 33 + (this.saveArray_nap_dt.length - 1) * 8;
            this.showMoneyBuyCard();
        },
        buttonNapDienThoai: function (value) {
            value = replaceAll(".", "", value);
            shopping_info.menhgia_nap_dt = value;
            shopping_info.lb_menh_gia_nap_dt.setString(formatMoney(0, 3, value));
            shopping_info.pn_menhgia_nap_dt.runAction(cc.scaleTo(0.15, 1, 0));
            shopping_info.pn_menhgia_nap_dt.setVisible(false);
            shopping_info.showMoneyBuyCard();
            //cc.log("menh gia the: " + value);
        },

        GotoMuaTheDienThoai: function (str) {
            for (var j = 0; j < this.saveArray_mua_the_dt.length; j++) {
                if (this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + j) != null) {
                    var button = this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + j);
                    button.setVisible(false);
                }
            }

            if (str == "vina") {
                this.saveArray_mua_the_dt = lobby.card_Vina;
            } else if (str == "mobi") {
                this.saveArray_mua_the_dt = lobby.card_Mobi;
            } else if (str == "viettel") {
                this.saveArray_mua_the_dt = lobby.card_Viettel;
            } else if (str == "zingxu") {
                this.saveArray_mua_the_dt = lobby.card_Zing;
            } else if (str == "vcoin") {
                this.saveArray_mua_the_dt = lobby.card_Vcoin;
            } else if (str == "vnmobile") {
                this.saveArray_mua_the_dt = lobby.card_VnMobi;
            } else if (str == "vbee") {
                this.saveArray_mua_the_dt = lobby.card_Bee;
            } else if (str == "gate") {
                this.saveArray_mua_the_dt = lobby.card_Gate;
            }
            //cc.log("array : " + this.saveArray_mua_the_dt);
            if (this.saveArray_mua_the_dt.length != 0) {
                this.menhgia_mua_the_dt = this.getMenhGiaThe(this.saveArray_mua_the_dt[0]);
                this.lb_menhgia_dt.setString(formatMoney(0, 3, this.getMenhGiaThe(this.saveArray_mua_the_dt[0])));
            } else {
                this.menhgia_mua_the_dt = 0;
                this.lb_menhgia_dt.setString("");
            }
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < this.saveArray_mua_the_dt.length; i++) {
                if (this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + i) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.setPosition(cc.p(123.03, this.positionY_muathedt));
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_mua_the_dt[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(20);
                    button.setName("btn_mua_the_dt" + i);

                    this.pn_menhgia_thedt.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonMenhGiaTheDT(sender.titleText);
                                break;
                        }

                    }, this);
                    this.positionY_muathedt = this.positionY_muathedt - 41;
                } else {
                    var button = this.pn_menhgia_thedt.getChildByName("btn_mua_the_dt" + i);
                    button.setVisible(true);
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_mua_the_dt[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                }
            }
            this.positionY_muathedt = 186.97;
            this.bg_pn_menhgia_thedt.height = 12 + this.saveArray_mua_the_dt.length * 33 + (this.saveArray_mua_the_dt.length - 1) * 8;
        },
        buttonMenhGiaTheDT: function (value) {
            value = replaceAll(".", "", value);
            shopping_info.menhgia_mua_the_dt = value;
            shopping_info.lb_menhgia_dt.setString(formatMoney(0, 3, value));
            shopping_info.pn_menhgia_thedt.runAction(cc.scaleTo(0.15, 1, 0));
            shopping_info.pn_menhgia_thedt.setVisible(false);
            shopping_info.showMoneyBuyCard();
            //cc.log("menh gia the: " + value);
        },

        GotoMuaTheGame: function (str) {
            for (var j = 0; j < this.saveArray_mua_the_game.length; j++) {
                if (this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + j) != null) {
                    var button = this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + j);
                    button.setVisible(false);
                }
            }

            if (str == "vina") {
                this.saveArray_mua_the_game = lobby.card_Vina;
            } else if (str == "mobi") {
                this.saveArray_mua_the_game = lobby.card_Mobi;
            } else if (str == "viettel") {
                this.saveArray_mua_the_game = lobby.card_Viettel;
            } else if (str == "zingxu") {
                this.saveArray_mua_the_game = lobby.card_Zing;
            } else if (str == "vcoin") {
                this.saveArray_mua_the_game = lobby.card_Vcoin;
            } else if (str == "vnmobile") {
                this.saveArray_mua_the_game = lobby.card_VnMobi;
            } else if (str == "vbee") {
                this.saveArray_mua_the_game = lobby.card_Bee;
            } else if (str == "gate") {
                this.saveArray_mua_the_game = lobby.card_Gate;
            }
            //cc.log("array the game moi: " + this.saveArray_mua_the_game);
            if (this.saveArray_mua_the_game.length != 0) {
                this.menhgia_mua_the_game = this.getMenhGiaThe(this.saveArray_mua_the_game[0]);
                this.lb_menhgia_game.setString(formatMoney(0, 3, this.getMenhGiaThe(this.saveArray_mua_the_game[0])));
            } else {
                this.menhgia_mua_the_game = 0;
                this.lb_menhgia_game.setString("");
            }
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < this.saveArray_mua_the_game.length; i++) {
                if (this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + i) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_the2.png");
                    button.setPosition(cc.p(123.03, this.positionY_muathegame));
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_mua_the_game[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(22);
                    button.setName("btn_mua_the_game" + i);

                    this.pn_menhgia_thegame.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonMenhGiaTheGame(sender.titleText);
                                break;
                        }

                    }, this);
                    this.positionY_muathegame = this.positionY_muathegame - 41;
                } else {
                    var button = this.pn_menhgia_thegame.getChildByName("btn_mua_the_game" + i);
                    button.setVisible(true);
                    var str = shopping_info.getMenhGiaThe(shopping_info.saveArray_mua_the_game[i]);
                    button.setTitleText(formatMoney(0, 3, str));
                }
            }
            this.positionY_muathegame = 186.97;
            this.bg_pn_menhgia_thegame.height = 12 + this.saveArray_mua_the_game.length * 33 + (this.saveArray_mua_the_game.length - 1) * 8;
        },
        buttonMenhGiaTheGame: function (value) {
            value = replaceAll(".", "", value);
            shopping_info.menhgia_mua_the_game = value;
            shopping_info.lb_menhgia_game.setString(formatMoney(0, 3, value));
            shopping_info.pn_menhgia_thegame.runAction(cc.scaleTo(0.15, 1, 0));
            shopping_info.pn_menhgia_thegame.setVisible(false);
            shopping_info.showMoneyBuyCard();
            //cc.log("menh gia the game: " + value);
        },

        funBuyCardMobile_Game: function (value) { // = 0  mua the dien thoai // = 1 la mua the game
            if (value == 0) {
                this.iskindDoiThe = "mobile";
                if (this.kind_mua_the_dt == "viettel") {
                    this.provider = 0;
                    this.NameCard = "Thẻ Viettel";
                } else if (this.kind_mua_the_dt == "vina") {
                    this.provider = 1;
                    this.NameCard = "Thẻ Vinaphone";
                } else if (this.kind_mua_the_dt == "mobi") {
                    this.provider = 2;
                    this.NameCard = "Thẻ Mobifone";
                } else if (this.kind_mua_the_dt == "vnmobile") {
                    this.provider = 3;
                    this.NameCard = "Thẻ VietNamMobile";
                } else if (this.kind_mua_the_dt == "vbee") {
                    this.provider = 4;
                    this.NameCard = "Thẻ G Mobile";
                }
            } else {
                this.iskindDoiThe = "game";
                if (this.kind_mua_the_game == "zingxu") {
                    this.provider = 6;
                    this.NameCard = "Thẻ Zing";
                } else if (this.kind_mua_the_game == "gate") {
                    this.provider = 5;
                    this.NameCard = "Thẻ Gate";
                } else if (this.kind_mua_the_game == "vcoin") {
                    this.provider = 7;
                    this.NameCard = "Thẻ Vcoin";
                }
            }

            //cc.log("provide :" + this.provider);

            if (value == 0) {
                var soluong = this.tf_soluong_dt.getString();
                var money = (shopping_info.menhgia_mua_the_dt * Number(soluong)).toFixed(0);
            } else {
                var soluong = this.tf_soluong_thegame.getString();
                var money = (shopping_info.menhgia_mua_the_game * Number(soluong)).toFixed(0);
            }
            //cc.log("money tranfer:" + money);
            //cc.log("soluong : " + soluong);

            if (soluong == "" || soluong == null) {
                soluong = 0;
                popup.openPanel_Alert_Lobby("Nhập số lượng thẻ muốn đổi!");
            } else if (money > lobby.userInfo.moneyUse) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (money > lobby.cashout_limit_user) {
                popup.openPanel_Alert_Lobby("Hạn mức đổi thưởng tối đa " + formatMoney(0, 3, lobby.cashout_limit_user) + "!\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch");
            } else {
                popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn thực hiện giao dịch đổi thẻ!", "ĐỒNG Ý", "HỦY", this.confirmBuyCardMobile, null);
            }
        },
        confirmBuyCardMobile: function () {
            if (shopping_info.iskindDoiThe == "mobile")
                var soluong = shopping_info.tf_soluong_dt.getString();
            else
                var soluong = shopping_info.tf_soluong_thegame.getString();
            shopping_info.soluong_muathe = Number(soluong);

            if (Minigame.isLoginSocket) {
                var rechargeVin = new CmdSendBuyCardMobile();
                if (shopping_info.iskindDoiThe == "mobile") {
                    rechargeVin.putBuyCardMobile(shopping_info.provider, shopping_info.ReGetMenhGia(shopping_info.menhgia_mua_the_dt), Number(soluong));
                    //cc.log("provider : " + shopping_info.provider + " menh gia: " + shopping_info.ReGetMenhGia(shopping_info.menhgia_mua_the_dt) + " soluong: " + Number(soluong));
                } else {
                    rechargeVin.putBuyCardMobile(shopping_info.provider, shopping_info.ReGetMenhGia(shopping_info.menhgia_mua_the_game), Number(soluong));
                    //cc.log("provider : " + shopping_info.provider + " menh gia: " + shopping_info.ReGetMenhGia(shopping_info.menhgia_mua_the_game) + " soluong: " + Number(soluong));
                }
                Minigame.miniGameClient.send(rechargeVin);
                rechargeVin.clean();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        ReGetMenhGia: function (value) {
            var menhgia = 0;
            if (value == 10000)
                menhgia = 0;
            else if (value == 20000)
                menhgia = 1;
            else if (value == 50000)
                menhgia = 2;
            else if (value == 100000)
                menhgia = 3;
            else if (value == 200000)
                menhgia = 4;
            else if (value == 500000)
                menhgia = 5;
            else if (value == 1000000)
                menhgia = 6;
            else if (value == 2000000)
                menhgia = 7;
            else if (value == 5000000)
                menhgia = 8;
            return parseInt(menhgia);
        },
        responseBuyCard: function (error) {
            //cc.log("error buy card dt : " + error);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch đổi thẻ!", 1);
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (error == 9) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", shopping_info.gotoSercurity, null);
                })));
            } else if (error == 20) {
                popup.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 21) {
                popup.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 10) {
                popup.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau " + lobby.configHour + "h kích hoạt bảo mật thành công!");
            }
        },
        responseResultBuyCard: function (error, currentmoney, softpin) {
            //cc.log("error result buy card: " + error + " currentmoney: " + currentmoney + " softpin: " + softpin);
            if (error == 0) {
                var listthe = softpin;
                var length = listthe.split('|').length;
                ////cc.log("the 1" + listthe.split('|')[0]);
                var str = "";
                for (var i = 0; i < length; i++) {
                    str = str + listthe.split('|')[i] + "\n";
                }
                //cc.log("soluong : " + shopping_info.soluong_muathe);
                //popup.openPanel_Big_Message("Giao dịch thành công!\nMã thẻ của bạn:\n" + str);
                if (shopping_info.iskindDoiThe == "mobile")
                    this.showNoticeBuyCard(shopping_info.NameCard, shopping_info.soluong_muathe, shopping_info.menhgia_mua_the_dt, softpin);
                else
                    this.showNoticeBuyCard(shopping_info.NameCard, shopping_info.soluong_muathe, shopping_info.menhgia_mua_the_game, softpin);
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentmoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
                this.tf_soluong_dt.setString("");
                this.tf_soluong_dt.setPlaceHolder("0");
                this.tf_soluong_dt.setColor(cc.color("#FFFFFF"));
                this.tf_soluong_dt.runAction(cc.scaleTo(0.225, 1));
                this.tf_gia_ban_dt.setString("");

                this.tf_soluong_thegame.setString("");
                this.tf_soluong_thegame.setPlaceHolder("0");
                this.tf_soluong_thegame.setColor(cc.color("#FFFFFF"));
                this.tf_soluong_thegame.runAction(cc.scaleTo(0.225, 1));
                this.lb_gia_ban_thegame.setString("");
                this.funGetMoneyUse();
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (error == 9) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", shopping_info.gotoSercurity, null);
                })));
            } else if (error == 20) {
                popup.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 21) {
                popup.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 22) {
                popup.openPanel_Alert_Lobby("Số lượng thẻ đổi đã quá hạn mức.\nBạn vui lòng quay trở lại sau!");
            } else if (error == 30) {
                popup.openPanel_Alert_Lobby("Giao dịch đang chờ xử lý!");
            }
        },

        funRechargeMobile: function () {
            var fone = this.tf_phone_number_nttt.getString();
            var str3 = this.lb_menh_gia_nap_dt.getString();
            str3 = replaceAll(".", "", str3);
            var money = Number(str3).toFixed(0);
            var fullfone = shopping_info.dauso_chose + fone;
            this.save_fone_naptien = fullfone;
            //cc.log("fone: " + this.save_fone_naptien);

            if (fone == "") {
                popup.openPanel_Alert_Lobby("Bạn chưa nhập số điện thoại!");
            } else if (money > lobby.userInfo.moneyUse) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (money > lobby.cashout_limit_user) {
                popup.openPanel_Alert_Lobby("Hạn mức đổi thưởng tối đa " + formatMoney(0, 3, lobby.cashout_limit_user) + "!\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch");
            } else {
                popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn thực hiện giao dịch nạp tiền điện thoại!", "ĐỒNG Ý", "HỦY", this.confirmRechargeMobile, null);
            }
        },
        confirmRechargeMobile: function () {
            if (Minigame.isLoginSocket) {
                var rechargeVin = new CmdSendRechargeMobile();
                rechargeVin.putRechargeMobile(shopping_info.save_fone_naptien, shopping_info.ReGetMenhGia(shopping_info.menhgia_nap_dt), shopping_info.typeRechargeMobile);
                //cc.log("fone : " + shopping_info.save_fone_naptien + " menh gia: " + shopping_info.ReGetMenhGia(shopping_info.menhgia_nap_dt) +
                //"loai : " + shopping_info.typeRechargeMobile);
                Minigame.miniGameClient.send(rechargeVin);
                rechargeVin.clean();
            } else {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseRechargeMobile: function (error) {
            //cc.log("error nap dien thoai: " + error);
            if (error == 0) {
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch nạp tiền điện thoại!", 1);
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (error == 9) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", shopping_info.gotoSercurity, null);
                })));
            } else if (error == 20) {
                popup.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 21) {
                popup.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau thực hiện lại giao dịch!");
            } else if (error == 23) {
                popup.openPanel_Alert_Lobby("Số điện thoại nhập không chính xác!");
            } else if (error == 10) {
                popup.openPanel_Alert_Lobby("Chức năng này sẽ hoạt động sau " + lobby.configHour + "h kích hoạt bảo mật thành công!");
            }
        },
        responseResultRechargeMobile: function (error, currentMoney) {
            //cc.log("error nap dien thoai: " + error + " currentMoney: " + currentMoney);
            if (error == 0) {
                popup.openPanel_Alert_Lobby("Giao dịch thành công!");
                if (lobby.userInfo == null) {
                } else {
                    lobby.userInfo.vinTotal = currentMoney;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
                this.tf_phone_number_nttt.setString("");
                this.tf_phone_number_nttt.setPlaceHolder("Nhập số điện thoại");
                this.tf_phone_number_nttt.setColor(cc.color("#FFFFFF"));
                this.tf_phone_number_nttt.runAction(cc.scaleTo(0.225, 1));
                this.lb_gia_ban_nttt.setString("");

                this.funGetMoneyUse();
            } else if (error == 1) {
                popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
            } else if (error == 2) {
                popup.openPanel_Alert_Lobby("Tài khoản hiện đang bị cấm đổi thưởng!");
            } else if (error == 3) {
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            } else if (error == 9) {
                this.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
                    popup.open_panel_message_confirm("THÔNG BÁO", "Để thực hiện chức năng đổi thẻ, tài khoản cần đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?", "ĐỒNG Ý", "HỦY", shopping_info.gotoSercurity, null);
                })));
            } else if (error == 20) {
                popup.openPanel_Alert_Lobby("Mức đổi vượt quá hạn mức trong ngày của tài khoản.\nVui lòng đợi đến hôm sau để thực hiện lại giao dịch!");
            } else if (error == 21) {
                popup.openPanel_Alert_Lobby("Không thể đổi quá hạn mức trong ngày của hệ thống.\nVui lòng đợi đến hôm sau thực hiện lại giao dịch!");
            } else if (error == 23) {
                popup.openPanel_Alert_Lobby("Số điện thoại nhập không chính xác!");
            } else if (error == 30) {
                popup.openPanel_Alert_Lobby("Giao dịch đang chờ xử lý!");
            }
        },

        showNoticeBuyCard: function (kindcard, value, menhgia, array) {
            this.pn_notice_mua_the.setVisible(true);
            this.pn_notice_mua_the.runAction(cc.scaleTo(0.2, 1));
            var jsonData = JSON.parse(array);
            //cc.log("giatri: " + jsonData[0].serial);
            //cc.log("value: " + value);
            var position = null;
            if (value == 1)
                position = 369.03;
            else if (value == 2)
                position = 200.03;
            else if (value == 3)
                position = 24.03;
            else if (value == 4)
                position = -144.97;

            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < value; i++) {
                var cl1 = null;
                cl1 = new cc.LayerColor(cc.color("#FFF6F6"));
                cl1.height = 340;
                cl1.width = 300;
                cl1.setPosition(cc.p(position, 102.22));

                var lbtitle = new cc.LabelTTF('', fonts.fontName, 22, cc.size(280, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtitle.setPosition(cc.p(150, 302.44));
                lbtitle.setString(kindcard);
                lbtitle.setColor(cc.color("#4D4D4D"));

                var lbMenhGia = new cc.LabelTTF('', fonts.fontName, 22, cc.size(280, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbMenhGia.setPosition(cc.p(150, 262.82));
                lbMenhGia.setString(formatMoney(0, 3, menhgia));
                lbMenhGia.setColor(cc.color("#1E90FF"));

                var lbMathe = new cc.LabelTTF('', fonts.fontName, 24, cc.size(280, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbMathe.setPosition(cc.p(150, 224.30));
                lbMathe.setString(jsonData[i].pin);
                lbMathe.setColor(cc.color("#FF0000"));

                var lbSerial = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 30), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSerial.setPosition(cc.p(150, 184.37));
                lbSerial.setString("Số serial: " + jsonData[i].serial);
                lbSerial.setColor(cc.color("#4D4D4D"));

                var lbhandung = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 30), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbhandung.setPosition(cc.p(150, 159.37));
                lbhandung.setString("Hạn sử dụng: " + jsonData[i].expire);
                lbhandung.setColor(cc.color("#4D4D4D"));

                var lbnap = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 60), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbnap.setPosition(cc.p(150, 134.37));
                lbnap.setString("Nạp tiền nhấn: *100*mã nạp tiền#");
                lbnap.setColor(cc.color("#4D4D4D"));

                var lbtra = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 60), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtra.setPosition(cc.p(150, 109.37));
                lbtra.setString("Kiểm tra tài khoản: *101#");
                lbtra.setColor(cc.color("#4D4D4D"));

                var lbemail = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 60), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbemail.setPosition(cc.p(150, 84.37));
                lbemail.setString("Email hỗ trợ: hotro@vinplay.com");
                lbemail.setColor(cc.color("#4D4D4D"));

                var lbmagd = new cc.LabelTTF('', fonts.fontName, 18, cc.size(280, 60), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmagd.setPosition(cc.p(150, 59.37));
                lbmagd.setString("Mã GD: " + jsonData[i].id);
                lbmagd.setColor(cc.color("#4D4D4D"));

                cl1.addChild(lbtitle);
                cl1.addChild(lbMenhGia);
                cl1.addChild(lbMathe);
                cl1.addChild(lbSerial);
                cl1.addChild(lbhandung);
                cl1.addChild(lbnap);
                cl1.addChild(lbtra);
                cl1.addChild(lbemail);
                cl1.addChild(lbmagd);

                position = position + 345;
                this.pn_content.addChild(cl1);
            }
        },

        getLabelTheDT: function (value, card_or_mobile) {
            var str = "";
            if (value == 0) {
                this.kind_mua_the_dt = "viettel";
                if (card_or_mobile == 0) {
                    str = "Thẻ Viettel";
                } else {
                    str = "Viettel";
                }
                return str
            } else if (value == 1) {
                this.kind_mua_the_dt = "vina";
                if (card_or_mobile == 0)
                    str = "Thẻ Vinaphone";
                else
                    str = "Vinaphone";
                return str
            } else if (value == 2) {
                this.kind_mua_the_dt = "mobi";
                if (card_or_mobile == 0)
                    str = "Thẻ Mobifone";
                else
                    str = "Mobifone";
                return str
            } else if (value == 3) {
                this.kind_mua_the_dt = "vnmobile";
                if (card_or_mobile == 0)
                    str = "Thẻ VietnamMobile";
                else
                    str = "VietnamMobile";
                return str
            } else if (value == 4) {
                this.kind_mua_the_dt = "vbee";
                if (card_or_mobile == 0)
                    str = "Thẻ G Mobile";
                else
                    str = "G Mobile";
                return str
            }
        },
        getLabelTheGame: function (value) {
            var str = "";
            if (value == 5) {
                this.kind_mua_the_game = "gate";
                str = "Thẻ Gate";
                return str
            } else if (value == 6) {
                this.kind_mua_the_game = "zingxu";
                str = "Thẻ Zing";
                return str
            } else if (value == 7) {
                this.kind_mua_the_game = "vcoin";
                str = "Thẻ Vcoin";
                return str
            }
        },

        gotoNapBank: function () {
            this.lv_list_bank.removeAllChildren();
            this.sc_bank.removeAllChildren();
            for (var i = 0; i < lobby.valueRechargeBank.length; i++) {
                if (this.pn_menh_gia_bank.getChildByName("value_bank_" + i) != null) {
                    var button = this.pn_menh_gia_bank.getChildByName("value_bank_" + i);
                    button.setVisible(false);
                }
            }

            for (var i = 0; i < lobby.recharge_bank.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = 42;
                cl1.width = this.lv_list_bank.width;

                if (this.lv_list_bank.getChildByName("btn_bank" + lobby.recharge_bank[i]) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_bank.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_bank.png");
                    button.setPosition(cc.p(173, 20));
                    var str = this.getNameBank(lobby.recharge_bank[i]);
                    button.setTitleText(str);
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(15);
                    button.setName("btn_bank" + lobby.recharge_bank[i]);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonSelectBank(sender.getName());
                                break;
                        }

                    }, this);
                    cl1.addChild(button);
                    this.lv_list_bank.pushBackCustomItem(cl1);
                    if (lobby.recharge_bank.length >= 10)
                        this.bg_pn_select_bank.height = 401;
                    else
                        this.bg_pn_select_bank.height = this.bg_pn_select_bank.height + 42;
                }
            }

            for (var i = 0; i <= lobby.recharge_bank.length; i++) {
                if (i % 2 == 1) {
                    var lblLayer = new ccui.Layout();
                    lblLayer.height = this.sc_bank.height;
                    lblLayer.width = 70;

                    var btnItem = new ccui.Button();
                    btnItem.setName("logo_" + lobby.recharge_bank[i - 1]);
                    btnItem.loadTextureNormal("res/ResourceMenuTab/Shopping/bank/bank_" + lobby.recharge_bank[i - 1] + ".png");
                    btnItem.loadTexturePressed("res/ResourceMenuTab/Shopping/bank/bank_" + lobby.recharge_bank[i - 1] + ".png");
                    btnItem.setTouchEnabled(true);
                    btnItem.setPosition(cc.p(35, 120));
                    btnItem.setTag(i - 1);
                    lblLayer.addChild(btnItem);
                    btnItem.addTouchEventListener(this.onTouchLogo, this);

                    if (i < lobby.recharge_bank.length) {
                        var btnItem1 = new ccui.Button();
                        btnItem1.setName("logo_" + lobby.recharge_bank[i]);
                        btnItem1.loadTextureNormal("res/ResourceMenuTab/Shopping/bank/bank_" + lobby.recharge_bank[i] + ".png");
                        btnItem1.loadTexturePressed("res/ResourceMenuTab/Shopping/bank/bank_" + lobby.recharge_bank[i] + ".png");
                        btnItem1.setTouchEnabled(true);
                        btnItem1.setPosition(cc.p(35, 40));
                        btnItem1.setTag(i);
                        lblLayer.addChild(btnItem1);
                        btnItem1.addTouchEventListener(this.onTouchLogo, this);
                    }


                    this.sc_bank.pushBackCustomItem(lblLayer);
                }
            }

            for (var i = 0; i < lobby.valueRechargeBank.length; i++) {
                if (this.pn_menh_gia_bank.getChildByName("value_bank_" + i) == null) {
                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Shopping/txt_bank.png");
                    button.loadTexturePressed("res/ResourceMenuTab/Shopping/txt_bank.png");
                    button.setPosition(cc.p(175, this.positionY_bank));
                    var str = lobby.valueRechargeBank[i];
                    button.setTitleText(formatMoney(0, 3, str));
                    button.setTitleColor(cc.color("#000000"));
                    button.setTitleFontName("Roboto-Regular");
                    button.setTitleFontSize(20);
                    button.setName("value_bank_" + i);

                    this.pn_menh_gia_bank.addChild(button);

                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.buttonMenhGiaBank(sender.titleText);
                                break;
                        }

                    }, this);
                    this.positionY_bank = this.positionY_bank - 48;
                } else {
                    var button = this.pn_menh_gia_bank.getChildByName("value_bank_" + i);
                    button.setVisible(true);
                    var str = lobby.valueRechargeBank[i];
                    button.setTitleText(formatMoney(0, 3, str));
                }
            }
            this.positionY_bank = 303;
            this.bg_pn_menh_gia_bank.height = 12 + lobby.valueRechargeBank.length * 40 + (lobby.valueRechargeBank.length - 1) * 8;
        },
        buttonMenhGiaBank: function (value) {
            shopping_info.lb_chose_mg_bank.setString(value);
            shopping_info.save_menhgia_bank = replaceAll(".", "", value);
            //cc.log("menh gia bank: " + shopping_info.save_menhgia_bank);
            shopping_info.pn_menh_gia_bank.setVisible(false);
            shopping_info.pn_menh_gia_bank.runAction(cc.scaleTo(0, 1, 0));
            var str = Number(shopping_info.save_menhgia_bank * lobby.radio_vin_bank).toFixed(0);
            shopping_info.txt_vin_nhan_bank.setString(formatMoney(0, 3, str));
        },
        buttonSelectBank: function (value) {
            shopping_info.save_select_bank = value.substr(8, value.length);
            //cc.log("stt bank " + shopping_info.save_select_bank);
            shopping_info.pn_select_bank.setVisible(false);
            shopping_info.pn_select_bank.runAction(cc.scaleTo(0, 1, 0));
            shopping_info.lb_chose_bank.setFontSize(15);
            shopping_info.lb_chose_bank.setString(shopping_info.getNameBank(shopping_info.save_select_bank));
        },
        onTouchLogo: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    shopping_info.save_select_bank = sender.getName().substr(5, sender.getName().length);
                    //cc.log("bank: " + shopping_info.save_select_bank);
                    shopping_info.lb_chose_bank.setFontSize(15);
                    shopping_info.lb_chose_bank.setString(shopping_info.getNameBank(shopping_info.save_select_bank));
                    break;
            }
        },
        getNameBank: function (value) {
            var str = "";
            if (value == 0)
                return str = "Ngân hàng đầu tư và phát triển Việt Nam - BIDV";
            else if (value == 1)
                return str = "Ngân Hàng TMCP Công Thương VN - VietinBank";
            else if (value == 2)
                return str = "Ngân hàng TMCP Ngoại thương VN - Vietcombank";
            else if (value == 3)
                return str = "Ngân hàng TMCP Hàng Hải VN - Maritime Bank";
            else if (value == 4)
                return str = "Ngân hàng Việt Nam Thịnh vượng - VPBank";
            else if (value == 5)
                return str = "Ngân hàng thương mại cổ phần Việt Á";
            else if (value == 6)
                return str = "Ngân hàng TMCP Kỹ thương VN - TechcomBank";
            else if (value == 7)
                return str = "Ngân hàng TMCP xuất nhập khẩu VN - EximBank";
            else if (value == 8)
                return str = "Ngân Hàng Quốc Tế - VIB";
            else if (value == 9)
                return str = "Ngân hàng TMCP Tiên Phong - TPBank";
            else if (value == 10)
                return str = "Ngân hàng TMCP Sài Gòn – Hà Nội - SHB";
            else if (value == 11)
                return str = "Ngân Hàng TMCP Đông Nam Á - SeaBank";
            else if (value == 12)
                return str = "Ngân Hàng TMCP SG Thương Tín - SacomBank";
            else if (value == 13)
                return str = "Ngân Hàng TMCP Đại Dương - OceanBank";
            else if (value == 14)
                return str = "Ngân Hàng TMCP Quân Đội - MBBank";
            else if (value == 15)
                return str = "Ngân hàng TM TNHH MTV Dầu Khí TC - GPBank";
            else if (value == 16)
                return str = "Ngân hàng TMCP Bắc Á - BacA Bank";
            else if (value == 17)
                return str = "Ngân hàng NN và PT Nông thôn VN - Agribank";
            else if (value == 18)
                return str = "Ngân Hàng TMCP An Bình - ABBank";
            else if (value == 19)
                return str = "Ngân Hàng TMCP Á Châu - ACB";
            else if (value == 20)
                return str = "Ngân Hàng TMCP Phương Đông VN - OricomBank";
            else if (value == 21)
                return str = "Ngân hàng Bưu điện Liên Việt - LienVietPostBank";
            else if (value == 22)
                return str = "Ngân hàng TMCP Đông Á - DongA Bank";
            else if (value == 23)
                return str = "Ngân Hàng TMCP Bảo Việt - Baovietbank";
            else if (value == 24)
                return str = "Ngân Hàng TMCP PT Nhà TP HCM - HDBank";
            else if (value == 25)
                return str = "Ngân hàng TMCP Kiên Long - KienLong Bank";
            else if (value == 26)
                return str = "Ngân hàng TMCP Nam Á - Nam A Bank";
            else if (value == 27)
                return str = "Ngân hàng Quốc Dân - NCB";
            else if (value == 28)
                return str = "Ngân hàng Liên doanh Việt - Nga - VRB";
            else if (value == 50)
                return str = "Ngân hàng SmartlinkCard - SML";
        },
        funRechargeBank: function () {
            if (this.save_select_bank == null)
                popup.openPanel_Alert_Lobby("Vui lòng lựa chọn ngân hàng của bạn!");
            else if (this.save_menhgia_bank == null)
                popup.openPanel_Alert_Lobby("Vui lòng lựa chọn mệnh giá bạn muốn nạp!");
            else {
                if (Minigame.isLoginSocket) {
                    var rechargeBank = new CmdSendRechargeBank();
                    rechargeBank.putRechargeBank(this.save_select_bank, this.save_menhgia_bank);
                    //cc.log("bank : " + this.save_select_bank + " menh gia: " + this.save_menhgia_bank);
                    Minigame.miniGameClient.send(rechargeBank);
                    rechargeBank.clean();
                } else {
                    popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    Minigame.connectSocket();
                }
            }
        },
        responseRechargeBank: function (error, url) {
            //cc.log("error nap bank : " + error + " url : " + url );
            if (error == 1)
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            else if (error == 3)
                popup.openPanel_Alert_Lobby("Hiện tại ngân hàng này đang không hỗ trợ!");
            else if (error == 0) {
                if (cc.sys.isNative) {
                    ConnectNative.openWebView(url, false);
                } else {
                    window.location = url;
                }
            }
        },
    }
);
// panel shopping
code_shopping_info.BTN_SHOP_BACK = 5;
code_shopping_info.BTN_SHOP_CLOSE = 6;
code_shopping_info.BTN_SHOP_NAPVIN = 7;
code_shopping_info.BTN_SHOP_NAPXU = 8;
code_shopping_info.BTN_SHOP_TIEUVIN = 9;
code_shopping_info.BTN_SHOP_VINA = 10;
code_shopping_info.BTN_SHOP_MOBI = 11;
code_shopping_info.BTN_SHOP_VIETTEL = 12;
code_shopping_info.BTN_SHOP_ZING = 13;
code_shopping_info.BTN_SHOP_VCOIN = 14;
code_shopping_info.BTN_SHOP_INTERNETBANKING = 15;
code_shopping_info.BTN_SHOP_VNMOBILE = 103;
code_shopping_info.BTN_SHOP_GATE = 104;
code_shopping_info.BTN_NAP_THE_DT = 111;
code_shopping_info.BTN_SHOP_BEELINE = 108;
code_shopping_info.BTN_SHOP_IAP = 114;
code_shopping_info.BTN_SHOP_IAP_1 = 115;
code_shopping_info.BTN_SHOP_IAP_2 = 116;
code_shopping_info.BTN_SHOP_IAP_3 = 117;
code_shopping_info.BTN_SHOP_IAP_4 = 118;
code_shopping_info.BTN_DOWNLOAD_VINPLUS = 119;
code_shopping_info.BTN_SHOP_NAP_VIN_SMS = 120;
code_shopping_info.BTN_CHOSE_HOMENETWORK_SMS = 121;
code_shopping_info.BTN_HOMENETWORK_VIETTEL_SMS = 122;
code_shopping_info.BTN_HOMENETWORK_VINA_SMS = 123;
code_shopping_info.BTN_HOMENETWORK_MOBI_SMS = 124;
code_shopping_info.BTN_HOMENETWORK_VNM_SMS = 125;
code_shopping_info.BTN_HOMENETWORK_BEE_SMS = 126;
code_shopping_info.BTN_CLOSE_HOMENETWORK_SMS = 127;
code_shopping_info.BTN_CHOSE_MENHGIA_SMS = 128;
code_shopping_info.BTN_SOANTIN_SMS = 129;
code_shopping_info.BTN_CLOSE_PN_9029 = 131;
code_shopping_info.BTN_CLOSE_PN_8X98 = 132;
code_shopping_info.BTN_SHOP_IAP_5 = 133;
code_shopping_info.BTN_SHOP_IAP_6 = 134;
code_shopping_info.BTN_SHOP_IAP_7 = 135;
code_shopping_info.BTN_SHOP_IAP_8 = 136;
code_shopping_info.BTN_SHOP_NAP_VIN_CARD = 137;
code_shopping_info.BTN_SELECT_VIN_CARD = 138;
code_shopping_info.BTN_SHOP_NAP_MEGA = 139;
code_shopping_info.BTN_SELECT_MEGA_CARD = 140;

code_shopping_info.BTN_SELECT_VINA = 16;
code_shopping_info.BTN_SELECT_MOBI = 17;
code_shopping_info.BTN_SELECT_VIETTEL = 18;
code_shopping_info.BTN_SELECT_ZING = 19;
code_shopping_info.BTN_SELECT_VCOIN = 20;
code_shopping_info.BTN_SELECT_VNMOBILE = 105;
code_shopping_info.BTN_SELECT_VBEE = 106;
code_shopping_info.BTN_SELECT_GATE = 107;

code_shopping_info.BTN_SELECT_ARROW = 21;
code_shopping_info.BTN_CLOSE_SELECT_THE = 22;
code_shopping_info.BTN_NAPXU_REFRESH = 23;
code_shopping_info.BTN_NAPXU_DOIXU = 24;
code_shopping_info.BTN_MUA_MA_THE = 25;
code_shopping_info.BTN_MUA_THE_GAME = 26;
code_shopping_info.BTN_NAPTIEN_TRATRUOC = 27;
code_shopping_info.BTN_NAPTIEN_TRASAU = 28;
code_shopping_info.BTN_CHUYEN_KHOAN = 29;
code_shopping_info.BTN_SELECT_MUA_THE_DT = 30;
code_shopping_info.BTN_TIEP_TUC_MUA_THE_DT = 32;
code_shopping_info.BTN_CLOSE_SELECT_MUA_THE_DT = 33;
code_shopping_info.BTN_MUATHEDT_VINA = 34;
code_shopping_info.BTN_MUATHEDT_MOBI = 35;
code_shopping_info.BTN_MUATHEDT_VIETTEL = 36;
code_shopping_info.BTN_MUATHEDT_VNMOBILE = 109;
code_shopping_info.BTN_MUATHEDT_BEELINE = 110;

code_shopping_info.BTN_OPEN_MENHGIA_DT = 37;
code_shopping_info.BTN_CLOSE_MENHGIA_DT = 38;
code_shopping_info.BTN_SELECT_THEGAME = 44;
code_shopping_info.BTN_MENHGIA_THEGAME = 45;
code_shopping_info.BTN_TIEPTUC_THEGAME = 47;
code_shopping_info.BTN_CLOSE_SELECT_THEGAME = 48;
code_shopping_info.BTN_CLOSE_MENHGIA_THEGAME = 49;
code_shopping_info.BTN_MUATHEGAME_ZING = 50;
code_shopping_info.BTN_MUATHEGAME_VCOIN = 51;
code_shopping_info.BTN_MUATHEGAME_GATE = 52;
code_shopping_info.BTN_TIEPTUC_NTTT = 57;
code_shopping_info.BTN_SELECT_NHAMANG_NTTT = 58;
code_shopping_info.BTN_SELECT_DAUSO_NTTT = 59;

code_shopping_info.BTN_XACNHAN_MUATHE = 60;
code_shopping_info.BTN_NAP_VIN_BANKING = 61;
code_shopping_info.BTN_SELECT_BANK = 62;
code_shopping_info.BTN_SELECT_MG_BANK = 63;
code_shopping_info.BTN_CLOSE_SELECT_BANK = 64;
code_shopping_info.BTN_CLOSE_SELECT_MG_BANK = 65;

code_shopping_info.BTN_CLEAR_FONE = 75;
code_shopping_info.BTN_OPEN_MENHGIA_NAP_DT = 76;
code_shopping_info.BTN_CLOSE_MENHGIA_NAP_DT = 77;

code_shopping_info.BTN_CLOSE_DAUSO_MOBI = 78;

code_shopping_info.BTN_CLEAR_SERIAL = 112;
code_shopping_info.BTN_CLEAR_MATHE = 113;


openshopping_info = function () {
    //cc.log("vao7");
    if (shopping_info === null) {
        shopping_info = new code_shopping_info();
        shopping_infoX = shopping_info.getPosition().x;
        shopping_infoY = shopping_info.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(shopping_info, BaseScene.INDEX_INFO_GUI, 0);
    } else {
        if (menutab.select_nap_xu == "napvin") {
            shopping_info.showshopping_info();
        } else {
            shopping_info.pn_shopping_napvin.setVisible(true);
            shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0.2, 1));
        }
    }
    if (shopping_info.isfirtgetConfigBilling == false) {
        shopping_info.GetConfigBilling();
        shopping_info.isfirtgetConfigBilling = true;
    }
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    //shopping_info.showNoticeBuyCard("the viettel",3,300000,"");
    shopping_infoAppear = true;
    shopping_info.funGetMoneyUse();
    if (menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closeshopping_info = function () {
    if (shopping_info === null) {
        return;
    }
    if (shopping_infoAppear) {
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
        shopping_info.pn_shopping_napvin.setVisible(false);
        shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0.2, 0));
        shopping_infoAppear = false;

        shopping_info.tf_money_vin.setString("");
        shopping_info.tf_money_again.setString("");
        shopping_info.lb_xu_nhan_duoc.setString("");

        shopping_info.tf_phone_number_nttt.setString("");
        shopping_info.btn_clear_fone.setVisible(false);
        shopping_info.tf_soluong_thegame.setString("");
        shopping_info.tf_soluong_dt.setString("");
        shopping_info.tf_gia_ban_dt.setString("");
        shopping_info.lb_gia_ban_thegame.setString("");
        shopping_info.lb_gia_ban_nttt.setString("");
        shopping_info.tf_serial.setString("");
        shopping_info.tf_ma_the.setString("");

        shopping_info.tf_money_vin.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_money_again.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_phone_number_nttt.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_soluong_thegame.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_soluong_dt.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_gia_ban_dt.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_serial.setColor(cc.color("#FFFFFF"));
        shopping_info.tf_ma_the.setColor(cc.color("#FFFFFF"));

        shopping_info.lb_chose_bank.setFontSize(20);
        shopping_info.lb_chose_bank.setString("Lựa chọn ngân hàng");
        shopping_info.save_select_bank = null;
        shopping_info.lb_chose_mg_bank.setString("Lựa mệnh giá");
        shopping_info.save_menhgia_bank = null;
        shopping_info.txt_vin_nhan_bank.setString("");

        shopping_info.btn_clear_serial.setVisible(false);
        shopping_info.btn_clear_mathe.setVisible(false);
    }
    if (menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
openshopping_info_xu = function () {
    //cc.log("vao5");
    if (shopping_info === null) {
        shopping_info = new code_shopping_info();
        shopping_infoX = shopping_info.getPosition().x;
        shopping_infoY = shopping_info.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(shopping_info, BaseScene.INDEX_INFO_GUI, 0);
    } else {
        if (menutab.select_nap_xu == "tieuvin") {
            shopping_info.showshopping_info_tieuvin();
            openchuyenkhoan();
        } else {
            shopping_info.showshopping_info_xu();
            shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0.2, 1));
        }
    }
    if (shopping_info.isfirtgetConfigBilling == false) {
        shopping_info.GetConfigBilling();
        shopping_info.isfirtgetConfigBilling = true;
    }
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    shopping_infoAppear = true;
    if (menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
openshopping_Chuyenkhoan = function () {
    //cc.log("vao6");
    if (shopping_info === null) {
        shopping_info = new code_shopping_info();
        shopping_infoX = shopping_info.getPosition().x;
        shopping_infoY = shopping_info.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(shopping_info, BaseScene.INDEX_INFO_GUI, 0);
        shopping_infoAppear = true;
    } else {
        shopping_info.pn_shopping_napvin.setVisible(false);
        shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0, 0));
        shopping_info.current_menu_shop = "tieuvin";
        shopping_info.btn_back_shop.setVisible(false);
        if (lobby.is_Exchange_money == 0) {
            openchuyenkhoan();
            shopping_infoAppear = true;
        } else {
            shopping_infoAppear = false;
        }
    }
    if (shopping_info.isfirtgetConfigBilling == false) {
        shopping_info.GetConfigBilling();
        shopping_info.isfirtgetConfigBilling = true;
    }
};


