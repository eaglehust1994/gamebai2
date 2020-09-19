/**
 * Created by Admin on 10/19/2016.
 */


var slotKhoBau = null;
var slotKhoBauAppear = false;
Slots.Content = {
    arrLineSelect:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    isAutoRotate:false,
    currentRoom:0,
    betValue:100
}

var SlotKhoBauLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super("slotKhoBau");
            this.initWithBinaryFile("res/SlotsKhoBau.json");
            //lobby.userInfo = null;
            //lobby.appConfig = null;
            this.waitingKhoBau = false;
            this.free = 0;
            this.totalMoneyChoiThu = 10000000;
            this.isChoiThu = false;
            this.isBackToLobby = false;
            this.totalItemColum = 15;
            this.lineSelected = 1;
            this.betValue = SlotKhoBauLayer.BET_VALUE_ROOM1;
            this.currentRoom = SlotKhoBauLayer.ROOM1;
            this.sumBet = 100;
            this.soLuotChuaMo  = 10;
            this.soLanMo = 0;
            this.giaTriNhan = 1;
            this.isShowMayMan = false;
            this.isChangeRoom = false;
            this.valueHuSlot1 = 0;
            this.valueHuSlot2 = 0;
            this.valueHuSlot3 = 0;
            this.isStart = true;
            this.arrItemMatrix = [];
            this.arrIndexLine = [9,3,7,10,4,1,5,8,2,6,20,11,15,18,17,13,14,19,12,16];
            this.mapPositionLine = [];
            this.mapLine = [
                [ 5, 6, 7, 8, 9],//1
                [ 0, 1, 2, 3, 4],//2
                [10,11,12,13,14],//3
                [ 5, 6, 2, 8, 9],//4
                [ 5, 6,12, 8, 9],//5
                [ 0, 1, 7, 3, 4],//6
                [10,11, 7,13,14],//7
                [ 0,11, 2,13, 4],//8
                [10, 1,12, 3,14],//9
                [ 5, 1,12, 3, 9],//10
                [10, 6, 2, 8,14],//11
                [ 0, 6,12, 8, 4],//12
                [ 5,11, 7, 3, 9],//13
                [ 5, 1, 7,13, 9],//14
                [10, 6, 7, 8,14],//15
                [ 0, 6, 7, 8, 4],//16
                [ 5, 1, 2, 3, 9],//17
                [ 5,11,12,13, 9],//18
                [10,11, 7, 3, 4],//19
                [ 0, 1, 7,13,14]//20

            ];
            this.resultHaiSao = 0;

            this.arrLsgd = [];
            this.arrTopUser = [];
            this.arrVinhdanh = [];
            this.objLsgd = {
                "rf":598,
                "un":"phamCanh",
                "bv":100,
                "lb":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20",
                "lw":"1,10,12,14,15,16,18",
                "pz":4100,
                "ps":"300,400,300,400,300,2000,400",
                "ts":"20:51:46 28-10-2016"
            };
            this.resultSlot = {
                ref: 1454158,
                result: 0,
                matrix: "4,0,6,5,6,6,4,5,5,1,4,6,5,3,6",
                linesWin: "",
                khoBau: "",
                prize: 0,
                currentMoney: 9883889179333
            };
            this.currentPageTopUser = 1;
            this.currentPageLsgd = 1;
            this.totalPage = 100;
            this.isShowTopUser = false;
            this.isShowVinhDanh = true;


            this.arrLineSelect = [];
            this.pSlotKhoBau = null;
            this.column1 = 1;
            this.column2 = 2;
            this.column3 = 3;
            this.column4 = 4;
            this.column5 = 5;
            this.isAutoRotate = false;
            this.isRotate = false;
            this.isWaitingRotate = false;
            this.pItem = null;
            this.pColum1 = null;
            this.pColum2 = null;
            this.pColum3 = null;
            this.pColum4 = null;
            this.pColum5 = null;

            this.resultChoiThu = [
                {
                    ref:0,
                    result:1,
                    matrix:
                    "0,0,0,0,0," +
                    "1,2,0,4,6," +
                    "1,2,0,4,6" ,
                    linesWin:"1,3,5,7,9,11,13,15,17,19",
                    prize:1000000,
                    khoBau:"1,1,1,1,1,2,3,4,5,1,1",
                    currentMoney:0
                },
                {
                    result:2,
                    matrix:
                    "0,1,2,3,4," +
                    "1,2,3,4,5," +
                    "2,3,4,5,6" ,
                    linesWin:"2,4,6,8,10,12,14,16,18,20",
                    prize:2000000,
                    khoBau:"1,1,1,1,1,2,3,4,0,1,1",
                    currentMoney:0
                },
                {
                    result:3,
                    matrix:
                    "4,3,2,1,0," +
                    "5,4,3,2,1," +
                    "6,5,4,3,2" ,
                    linesWin:"1,2,3,4,5,6,7,8,9,10",
                    prize:3000000,
                    khoBau:"1,1,1,1,1,2,3,4,5,1,1",
                    currentMoney:0
                },
                {
                    result:5,
                    matrix:
                    "4,3,2,3,4," +
                    "5,4,3,4,5," +
                    "6,5,4,5,6" ,
                    linesWin:"11,12,13,14,15,16,17,18,19,20",
                    prize:4000000,
                    khoBau:"1,1,1,1,1,2,3,4,5,1,1",
                    currentMoney:0
                },
                {
                    result:1,
                    matrix:
                    "4,4,4,4,4," +
                    "5,5,5,5,5," +
                    "6,6,6,6,6" ,
                    linesWin:"1,2,3,4,5,16,17,18,19,20",
                    prize:5000000,
                    khoBau:"1,1,1,1,1,2,3,4,5,1,1",
                    currentMoney:0
                }
            ];
            this.isPlayMinigame = false;

            this.btn_choi_thu = null;
            this.btn_back_lobby = null;

            this.pMenu = null;
            //this.lb_nick_name = null;
            //this.sp_avatar = null;
            this.lb_prize = null;
            this.lb_total_money = null;
            this.lb_so_dong = null;
            this.btn_tu_quay = null;
            this.btn_quay = null;
            //this.btn_dung_quay = null;
            this.lb_tong_dat = null;
            this.lb_muc_dat = null;
            this.btn_x2_quy_thuong = null;
            this.lb_date_x2 = null;
            //this.btn_back_muc_dat = null;
            //this.btn_next_muc_dat = null;

            this.btn_bang_thuong = null;
            this.btn_dong = null;
            this.btn_muc_cuoc = null;
            this.btn_an = null;
            this.btn_top_no_hu = null;
            this.btn_lich_su = null;
            this.lb_hu = null;
            this.btn_close_chon_dong = null;


            this.pChonDong= null;
            this.btn_dong_chan = null;
            this.btn_dong_le = null;
            this.btn_chon_het = null;
            this.btn_chon_lai = null;

           // this.pThongKe = null;
            this.btn_lsgd = null;
            this.btn_ls_trung_hu = null;
            this.btn_vinh_danh = null;
            this.img_ls_giao_dich = null;
            this.img_ls_trung_hu = null;
            this.btn_back_all = null;
            this.btn_back = null;
            this.btn_next_all = null;
            this.btn_next = null;
            this.lb_page = null;
            this.lv_lich_su_giao_dich = null;
            this.lv_lich_su_trung_hu = null;
            this.pControl = null;

            //this.pVinhDanh = null;
            this.lv_vinh_danh = null;

            this.pHu = null;
            this.lb_hu_room1 = null;
            this.lb_hu_room2 = null;
            this.lb_hu_room3 = null;

            this.pNoHu = null;
            this.sp_bg_sang_vang = null;
            this.sp_duong_vang = null;
            this.sp_star1 = null;
            this.sp_star2 = null;
            this.sp_star3 = null;
            this.sp_star4 = null;
            this.sp_star_vang1 = null;
            this.sp_star_vang2 = null;
            this.sp_star_vang3 = null;
            this.sp_star_vang4 = null;
            this.sp_txt_no_hu = null;

            this.pThangLon = null;
            this.sp_bg_sang_xanh = null;
            this.sp_tui_tien = null;
            this.sp_txt_thang_lon = null;

            this.pBanDoKhoBau = null;
            this.pStartBanDo = null;
            this.sp_sang_vang_ban_do = null;
            this.sp_sao_ban_do = null;
            this.btn_ban_do = null;
            this.pPlayBanDo = null;
            this.lb_lan_con_lai = null;
            this.lb_diem_tich_luy = null;
            this.pMayMan = null;
            this.pEndBanDo = null;
            this.lb_tong_tien_ban_do = null;
            this.btn_thoat_ban_do = null;
            this.sp_luot_mien_phi = null;
            this.lb_so_luot_mien_phi = null;
            this.audioKhoBau = null;

            this.btn_setting = null;
            this.pn_setting = null;
            this.btn_am_thanh = null;
            this.btn_nhac_nen = null;
            this.sp_off_am_thanh = null;
            this.sp_off_nhac_nen = null;
            this.isFreeDaiLy = false;
            this.sp_quy_thuong = null;
        },
        customizeGUI: function () {
            this.audioKhoBau = new SlotKhoBauAudio(true,true);


            this.pSlotKhoBau = this._layout.getChildByName("pSlotKhoBau");
            //this.getUserInfo();


            this.pItem = this.getControl("pItem",this.pSlotKhoBau);
            this.pColum1 = this.getControl("pColum1",this.pItem);
            this.pColum2 = this.getControl("pColum2",this.pItem);
            this.pColum3 = this.getControl("pColum3",this.pItem);
            this.pColum4 = this.getControl("pColum4",this.pItem);
            this.pColum5 = this.getControl("pColum5",this.pItem);

            this.initShowLine();
            this.initItem();


            this.pMenu = this.getControl("pMenu",this.pSlotKhoBau);
            this.lb_prize =  this.getControl("lb_prize",this.pMenu);
            this.lb_total_money = this.getControl("lb_total_money",this.pMenu);
            this.lb_total_money.setString(formatMoney(0,3,lobby.userInfo.vinTotal));
            this.btn_choi_thu = this.customButton("btn_choi_thu",SlotKhoBauLayer.BTN_CHOI_THU,this.pMenu);
            this.btn_back_lobby = this.customButton("btn_back_lobby",SlotKhoBauLayer.BTN_BACK_LOBBY,this.pMenu);
            this.sp_quy_thuong = this.pMenu.getChildByName("sp_quy_thuong");


            this.lb_so_dong = this.getControl("lb_so_dong",this.pMenu);
            this.btn_tu_quay = this.customButton("btn_tu_quay",SlotKhoBauLayer.BTN_TU_QUAY,this.pMenu);
            this.btn_quay = this.customButton("btn_quay",SlotKhoBauLayer.BTN_QUAY,this.pMenu);
            this.lb_tong_dat = this.getControl("lb_tong_dat",this.pMenu);
            this.lb_muc_dat = this.getControl("lb_muc_dat",this.pMenu);

            this.btn_bang_thuong = this.customButton("btn_bang_thuong",SlotKhoBauLayer.BTN_BANG_THUONG,this.pMenu);
            this.btn_dong = this.customButton("btn_dong",SlotKhoBauLayer.BTN_DONG,this.pMenu);
            this.btn_muc_cuoc = this.customButton("btn_muc_cuoc",SlotKhoBauLayer.BTN_MUC_CUOC,this.pMenu);
            this.btn_an = this.customButton("btn_an",SlotKhoBauLayer.BTN_AN,this.pMenu);
            this.btn_top_no_hu = this.customButton("btn_top_no_hu",SlotKhoBauLayer.BTN_TOP_NO_HU,this.pMenu);
            this.btn_lich_su = this.customButton("btn_lich_su",SlotKhoBauLayer.BTN_LICH_SU,this.pMenu);
            this.btn_x2_quy_thuong = this.customButton("btn_x2_quy_thuong",SlotKhoBauLayer.BTN_X2_QUY_THUONG,this.pMenu);
            this.lb_date_x2 = this.getControl("lb_date_x2",this.btn_x2_quy_thuong);
            this.lb_hu = this.getControl("lb_hu",this.pMenu);



            this.pChonDong= this.getControl("pChonDong",this.pSlotKhoBau);
            this.btn_dong_chan = this.customButton("btn_dong_chan",SlotKhoBauLayer.BTN_DONG_CHAN,this.pChonDong);
            this.btn_dong_le = this.customButton("btn_dong_le",SlotKhoBauLayer.BTN_DONG_LE,this.pChonDong);
            this.btn_chon_het = this.customButton("btn_chon_het",SlotKhoBauLayer.BTN_CHON_HET,this.pChonDong);
            this.btn_chon_lai = this.customButton("btn_chon_lai",SlotKhoBauLayer.BTN_CHON_LAI,this.pChonDong);
            this.btn_close_chon_dong = this.customButton("btn_close_chon_dong",SlotKhoBauLayer.BTN_CLOSE_CHON_DONG,this.pChonDong);
            this.initChonDong();



            this.pBanDoKhoBau = this.getControl("pBanDoKhoBau",this.pSlotKhoBau);
            this.pStartBanDo = this.getControl("pStartBanDo",this.pBanDoKhoBau);
            this.sp_sang_vang_ban_do = this.pStartBanDo.getChildByName("sp_sang_vang_ban_do");
            this.sp_sao_ban_do = this.pStartBanDo.getChildByName("sp_sao_ban_do");
            this.btn_ban_do = this.customButton("btn_ban_do",SlotKhoBauLayer.BTN_BAN_DO,this.pStartBanDo);
            this.pPlayBanDo = this.getControl("pPlayBanDo",this.pBanDoKhoBau);
            this.lb_lan_con_lai = this.getControl("lb_lan_con_lai",this.pPlayBanDo);
            this.lb_diem_tich_luy = this.getControl("lb_diem_tich_luy",this.pPlayBanDo);
            this.pMayMan = this.getControl("pMayMan",this.pBanDoKhoBau);
            this.pEndBanDo = this.getControl("pEndBanDo",this.pBanDoKhoBau);
            this.lb_tong_tien_ban_do = this.getControl("lb_tong_tien_ban_do",this.pEndBanDo);
            this.btn_thoat_ban_do = this.customButton("btn_thoat_ban_do",SlotKhoBauLayer.BTN_THOAT_BAN_DO,this.pEndBanDo);

            this.setTextChangeLine();
            this.initNoHu();
            this.initThangLon();
            this.initBanDoKhoBau();
            var that = this;

            this.customlistener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "updateMoney",
                callback: function(event){

                    if(slotKhoBau!=null && !slotKhoBau.isChoiThu && !slotKhoBau.isRotate && !slotKhoBau.isPlayMinigame)
                    that.updateMoney(event);
                }
            });
            cc.eventManager.addListener(this.customlistener, 1);
            userGameData.setItem("key_open_slots", -1);
            this.initPositionIndexLine();


                this.sp_luot_mien_phi = this.pMenu.getChildByName("sp_luot_mien_phi");
                this.lb_so_luot_mien_phi = this.getControl("lb_so_luot_mien_phi",this.sp_luot_mien_phi );

            this.btn_setting = this.customButton("btn_setting",SlotKhoBauLayer.BTN_SETTING,this.pSlotKhoBau,false);
            this.pn_setting = this.getControl("pn_setting",this.pSlotKhoBau);
            this.pn_setting.setVisible(false);
            this.btn_am_thanh = this.customButton("btn_am_thanh",SlotKhoBauLayer.BTN_AM_THANH,this.pn_setting,false);
            this.btn_nhac_nen = this.customButton("btn_nhac_nen",SlotKhoBauLayer.BTN_NHAC_NEN,this.pn_setting,false);
            this.sp_off_am_thanh = this.pn_setting.getChildByName("sp_off_am_thanh");
            this.sp_off_am_thanh.setVisible(false);
            this.sp_off_nhac_nen = this.pn_setting.getChildByName("sp_off_nhac_nen");
            this.sp_off_nhac_nen.setVisible(false);

            this.initFreeDaiLy();
            openPopUp();
            this.loadContent();

        },
        loadContent:function()
        {
            for(var i = 1; i<=20; i++)
            {
                this.btnSelectLine(i,false);
            }
            for(var i = 0; i<Slots.Content.arrLineSelect.length; i++)
            {
                this.btnSelectLine(Slots.Content.arrLineSelect[i],true);
            }
            this.currentRoom = Slots.Content.currentRoom;
            this.betValue = Slots.Content.betValue;
            this.isAutoRotate = Slots.Content.isAutoRotate;
            if(this.isAutoRotate)
            {
                this.btn_quay.setBright(false);
                this.btn_tu_quay.setBright(false);
                this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_dungquay.png","res/SlotKhoBau/btn_dungquay_s.png","res/SlotKhoBau/btn_dungquay_s.png");
                //this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
            }


            this.changeLineSelected();
            this.setTextChangeLine();
        },
        loadFromContent:function()
        {
            var arrSelectLine = [];
            for(var i = 1; i <= 20; i++)
            {
                if(this["btnLine"+i].isSelectLine)
                {
                    arrSelectLine.push(i);
                }
            }
            Slots.Content.arrLineSelect = arrSelectLine;
            Slots.Content.currentRoom = this.currentRoom;
            Slots.Content.isAutoRotate = this.isAutoRotate;
            Slots.Content.betValue = this.betValue;
        },
        connectSocket:function()
        {
            showLoading();
            //gameData.setGameType(type);
            GameManager.getInstance().connectToGameServer();
        },

        hideShowLineShow:function(index)
        {
            for(var i = 0; i<20; i++)
            {
                if(i  == index)
                {
                    this["spShowLine" + this.arrIndexLine[index].toString()].setVisible(true);
                }else
                {
                    this["spShowLine" + this.arrIndexLine[i].toString()].setVisible(false);
                }
            }
        },
        initPositionIndexLine: function()
        {
            var xStart1 = 10;
            var xStart2 = 579;
            var yStart = 24;

            for(var i= 0; i<this.arrIndexLine.length;i++)
            {
                if(parseInt(i/10) == 0)
                {
                    var posi = cc.p(xStart1,yStart + i*31);

                    this.mapPositionLine.push(posi);
                }else
                {
                    var posi = cc.p(xStart2,yStart + i%10*31);
                    this.mapPositionLine.push(posi);
                }
            }
        },
        onButtonRelease: function(button,id) {
            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
            if(this.pn_setting.isVisible() && id != SlotKhoBauLayer.BTN_AM_THANH && id != SlotKhoBauLayer.BTN_NHAC_NEN && id != SlotKhoBauLayer.BTN_SETTING)
            {
                this.pn_setting.setVisible(false);
            }
            switch (id) {
                case SlotKhoBauLayer.BTN_TU_QUAY:
                    //if(this.checkDonePlay())
                    //{
                        if(this.isChoiThu)
                        {
                            this.toastSlot("Chơi thử không dùng được chế độ tự quay",3);
                        }else
                        if(this.isFreeDaiLy)
                        {
                            this.toastSlot("Lượt quay hằng ngày không dùng được chế độ tự quay",3);
                        }
                        else
                        {
                            if(this.waitingKhoBau == false)
                            {
                                if(this.isAutoRotate == false)
                                {
                                    if(this.isChangeRoom)
                                    {
                                        this.toastSlot("Bạn đang chuyển room, vui lòng chờ",3);
                                    }else
                                    if(this.isRotate)
                                    {
                                        this.toastSlot("Bạn đang quay, vui lòng chờ quay xong",3);
                                    }else
                                    if(this.isWaitingRotate)
                                    {
                                        this.toastSlot("Hệ thống đang xử lý, vui lòng chờ",3);
                                    }else
                                    {
                                        this.isWaitingRotate = true;
                                        this.isAutoRotate = true;
                                        this.autoPlay(this.getArrayLineSelected());
                                        this.btn_quay.setBright(false);
                                        this.btn_tu_quay.setBright(false);
                                        this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_dungquay.png","res/SlotKhoBau/btn_dungquay_s.png","res/SlotKhoBau/btn_dungquay_s.png");
                                    }

                                }else{
                                    this.isAutoRotate = false;
                                    this.stopAutoPlay();
                                    //this.btn_quay.setBright(true);
                                    //this.btn_tu_quay.setBright(true);
                                    this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
                                }

                            }


                        }

                    //}

                    break;
                case SlotKhoBauLayer.BTN_QUAY:
                    if(this.checkDonePlay())
                    {
                        //if(this.waitingKhoBau == false)
                            this.startPlay();
                    }

                    break;


                case SlotKhoBauLayer.BTN_DONG_CHAN:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                    this.selectLineChan();
                    break;
                case SlotKhoBauLayer.BTN_DONG_LE:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                    this.selectLineLe();
                    break;
                case SlotKhoBauLayer.BTN_CHON_HET:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                    this.selectLineAll();
                    break;
                case SlotKhoBauLayer.BTN_CHON_LAI:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                    this.chonLai();
                    break;
                case SlotKhoBauLayer.BTN_LSGD:
                    this.isShowVinhDanh = false;
                    this.isShowTopUser = false;
                    this.showTopUser();
                    break;
                case SlotKhoBauLayer.BTN_LS_TRUNG_HU:
                    this.isShowVinhDanh = false;
                    this.isShowTopUser = true;
                    this.showTopUser();

                    break;
                case SlotKhoBauLayer.BTN_VINH_DANH:
                    this.isShowVinhDanh = true;
                    this.showTopUser();
                    break;
                case SlotKhoBauLayer.BTN_BACK_ALL:
                    if(this.isShowTopUser)
                    {
                        if(this.currentPageTopUser > 1)
                        {
                            this.currentPageTopUser = 1;
                            this.showTopUser();
                        }
                    }else
                    {
                        if(this.currentPageLsgd > 1)
                        {
                            this.currentPageLsgd = 1;
                            this.showTopUser();
                        }
                    }
                case SlotKhoBauLayer.BTN_X2_QUY_THUONG:
                    openSlotKhoBauTheLeX2();
                    break;
                    break;
                case SlotKhoBauLayer.BTN_BACK:

                    if(this.isShowTopUser)
                    {
                        if(this.currentPageTopUser > 1)
                        {
                            this.currentPageTopUser --;
                            this.showTopUser();
                        }
                    }else
                    {
                        if(this.currentPageLsgd > 1)
                        {
                            this.currentPageLsgd --;
                            this.showTopUser();
                        }
                    }

                    break;
                case SlotKhoBauLayer.BTN_NEXT_ALL:
                    if(this.isShowTopUser)
                    {
                        if(this.currentPageTopUser < this.totalPage)
                        {
                            this.currentPageTopUser = this.totalPage;
                            this.showTopUser();
                        }
                    }else
                    {
                        if(this.currentPageLsgd < this.totalPage)
                        {
                            this.currentPageLsgd = this.totalPage;
                            this.showTopUser();
                        }
                    }
                    break;
                case SlotKhoBauLayer.BTN_NEXT:

                    if(this.isShowTopUser)
                    {
                        if(this.currentPageTopUser < this.totalPage)
                        {
                            this.currentPageTopUser ++;
                            this.showTopUser();
                        }
                    }else
                    {
                        if(this.currentPageLsgd < this.totalPage)
                        {
                            this.currentPageLsgd ++;
                            this.showTopUser();
                        }
                    }
                    break;
                case SlotKhoBauLayer.BTN_BAN_DO:
                    this.hideStartBanDo();
                    this.showPlayBanDo();
                    this.btn_ban_do.stopAllActions();
                    if(this.waitingKhoBau)
                    {
                       // this.waitingKhoBau = false;
                        this.stopAutoPlay();
                        this.isAutoRotate = false;
                        this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
                        if(!this.isRotate)
                        {
                            this.btn_quay.setBright(true);
                            this.btn_tu_quay.setBright(true);
                        }
                    }


                    break;
                case SlotKhoBauLayer.BTN_THOAT_BAN_DO:
                    this.isPlayMinigame = false;
                    this.pEndBanDo.setVisible(false);
                    this.hideBanDoKhoBau();
                    this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));
                    this.resultHaiSao = 0;
                    this.giaTriNhan = 1;
                    this.soLuotChuaMo = 10;
                    this.lb_lan_con_lai.setString("10");
                    this.lb_diem_tich_luy.setString("X"+this.giaTriNhan);
                    this.soLanMo = 0;
                    this.updateCurrentMoney();
                    if(this.waitingKhoBau == true)
                    {
                        this.waitingKhoBau = false;


                        this.btn_quay.setBright(false);
                        this.btn_tu_quay.setBright(false);
                        this.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                            if(slotKhoBau.isAutoRotate == false)
                            {
                                slotKhoBau.isAutoRotate = true;
                                slotKhoBau.autoPlay(slotKhoBau.getArrayLineSelected());

                                slotKhoBau.btn_quay.setBright(false);
                                slotKhoBau.btn_tu_quay.setBright(false);
                                slotKhoBau.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_dungquay.png","res/SlotKhoBau/btn_dungquay_s.png","res/SlotKhoBau/btn_dungquay_s.png");
                            }

                        })));
                    }
                    break;
                case SlotKhoBauLayer.BTN_CHOI_THU:
                    if(this.checkDonePlay())
                    {
                        if(!this.isChoiThu)
                        {
                            this.loadChoiThu()

                        }else
                        {
                            this.loadChoiThat();
                        }
                    }

                    break;
                case SlotKhoBauLayer.BTN_BACK_LOBBY:
                    this.isBackToLobby = true;
                    khoBauUnsubscribe(this.currentRoom);
                    closeSlotKhoBau();
                    break;

                case SlotKhoBauLayer.BTN_BANG_THUONG:
                    openKhoBauBangThuong();
                    break;
                case SlotKhoBauLayer.BTN_DONG:
                    this.pChonDong.setVisible(true);
                    break;
                case SlotKhoBauLayer.BTN_MUC_CUOC:
                     if(this.checkDonePlay()) {
                        this.isChangeRoom = true;
                        if(this.currentRoom == SlotKhoBauLayer.ROOM2)
                        {
                            this.currentRoom = SlotKhoBauLayer.ROOM3;
                            this.betValue = SlotKhoBauLayer.BET_VALUE_ROOM3;
                            this.setTextChangeLine();
                            this.changeRoom(SlotKhoBauLayer.ROOM2,SlotKhoBauLayer.ROOM3);
                        }else if(this.currentRoom == SlotKhoBauLayer.ROOM1)
                        {
                            this.currentRoom = SlotKhoBauLayer.ROOM2;
                            this.betValue = SlotKhoBauLayer.BET_VALUE_ROOM2;
                            this.setTextChangeLine();
                            this.changeRoom(SlotKhoBauLayer.ROOM1,SlotKhoBauLayer.ROOM2);
                        }else if(this.currentRoom == SlotKhoBauLayer.ROOM3)
                        {
                            this.currentRoom = SlotKhoBauLayer.ROOM1;
                            this.betValue = SlotKhoBauLayer.BET_VALUE_ROOM1;
                            this.setTextChangeLine();
                            this.changeRoom(SlotKhoBauLayer.ROOM3,SlotKhoBauLayer.ROOM1);
                        }
                         if(this.sp_bg_text_luot_quay_dai_ly.isVisible())
                         {
                             this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                         }
                         this.isFreeDaiLy = false;
                    }
                    break;
                case SlotKhoBauLayer.BTN_AN:
                    //this.setVisible(false);
                    this.minimize(this.currentRoom);
                    closeSlotKhoBau();
                    //openKhoBauHuongDan();
                    break;
                case SlotKhoBauLayer.BTN_TOP_NO_HU:
                    openKhoBauTopUser();
                    break;
                case SlotKhoBauLayer.BTN_LICH_SU:
                    openKhoBauLSGD();
                    break;
                //case SlotKhoBauLayer.BTN_CLOSE_BANG_THUONG:
                //    //this.pBangThuong.setVisible(false);
                //    openKhoBauBangThuong();
                    break;
                case SlotKhoBauLayer.BTN_CLOSE_CHON_DONG:
                    this.pChonDong.setVisible(false);
                    break;
                case SlotKhoBauLayer.BTN_SETTING:
                    if(this.pn_setting.isVisible())
                    {
                        this.pn_setting.setVisible(false);
                    }else
                    {
                        this.pn_setting.setVisible(true);
                    }
                    break;

                case SlotKhoBauLayer.BTN_AM_THANH:

                    if(!this.sp_off_am_thanh.isVisible())
                    {
                        this.audioKhoBau.offSoundEffect();
                        this.sp_off_am_thanh.setVisible(true);
                    }else
                    {
                        this.audioKhoBau.onSoundEffect();
                        this.sp_off_am_thanh.setVisible(false);
                    }
                    break;
                case SlotKhoBauLayer.BTN_NHAC_NEN:
                    if(!this.sp_off_nhac_nen.isVisible())
                    {
                        this.audioKhoBau.offSoundBackGround();
                        this.sp_off_nhac_nen.setVisible(true);
                    }else
                    {
                        this.audioKhoBau.onSoundBackGround();
                        this.sp_off_nhac_nen.setVisible(false);
                    }
                    break;

            }
        },
        loadChoiThu:function()
        {
            this.isChoiThu = true;
            this.btn_choi_thu.loadTextures("res/SlotKhoBau/btn_choithat.png","res/SlotKhoBau/btn_choithat.png","res/SlotKhoBau/btn_choithat.png");

            this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
            this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
            this.lb_so_dong.setString(this.lineSelected);
            this.selectLineAll();
            this.totalMoneyChoiThu = 10000000;
            this.lb_total_money.setString("10.000.000");
            this.lb_prize.setString("0");

        },
        loadChoiThat:function()
        {
            this.isChoiThu = false;
            this.btn_choi_thu.loadTextures("res/SlotKhoBau/btn_choithu.png","res/SlotKhoBau/btn_choithu.png","res/SlotKhoBau/btn_choithu.png");
            this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
            this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
            this.lb_so_dong.setString(this.lineSelected);
            this.lb_total_money.setString(formatMoney(0,3,lobby.userInfo.vinTotal));
            this.totalMoneyChoiThu = 10000000;
            this.lb_prize.setString("0");
            for(var i = 1; i<= 20; i++)
            {
                if(this["btnLine"+i].isSelectLine)
                {
                    this["btnLine"+i].loadTextures("res/SlotKhoBau/number/"+i+".png","res/SlotKhoBau/number/"+i+".png","res/SlotKhoBau/number/"+i+".png");
                }else
                {
                    this["btnLine"+i].loadTextures("res/SlotKhoBau/number/"+i+"_1.png","res/SlotKhoBau/number/"+i+"_1.png","res/SlotKhoBau/number/"+i+"_1.png");
                }

            }
        },
        updateMoney: function(event){
            if(this.lb_total_money === null || this.isChoiThu){
                return;
            }
            if(event.moneyType == MONEY_VIN)
            {
                this.lb_total_money.setString(formatMoney(0,3,event.currentMoney));
            }

        },
        showBanDoKhoBau:function()
        {
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultMiniGame);
            this.pBanDoKhoBau.setVisible(true);
            this.showStartBanDo();
        },
        initBanDoKhoBau:function()
        {
            var widthFramePlay = 1260;
            var heightFramePlay = 440;
            var startPositionPlay = cc.p(100,460);
            var khoangCanhText = 52;
            var khoangCachX = 120;
            var khoangCachY = 140;
            for(var i = 0; i<30; i++)
            {
                this["btnSelectPlay" + i] = new ccui.Button();
                this["btnSelectPlay" + i].loadTextures("res/SlotKhoBau/minigame/item_matup.png","res/SlotKhoBau/minigame/item_matup.png","res/SlotKhoBau/minigame/item_matup.png");
                this["btnSelectPlay" + i].setPosition(cc.p(startPositionPlay.x + (i%10)*khoangCachX,startPositionPlay.y - parseInt(i/10)*khoangCachY));
                this["btnSelectPlay" + i].setTag(i);
                this.pPlayBanDo.addChild(this["btnSelectPlay" + i]);
                this["lbSelectPlay" + i] =  new cc.LabelTTF('',  RobotoRegular.fontName, 20, cc.size(94,23), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this["lbSelectPlay" + i].setPosition(cc.p(startPositionPlay.x + (i%10)*khoangCachX + 10,startPositionPlay.y - parseInt(i/10)*khoangCachY - khoangCanhText));
                this["lbSelectPlay" + i].setTag(i+30);
                this["lbSelectPlay" + i].setColor(cc.color(144,238,144));
                this.pPlayBanDo.addChild(this["lbSelectPlay" + i]);

                this["btnSelectPlay" + i].addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            if(!slotKhoBau.isShowMayMan)
                            {
                                sender.setEnabled(false);
                                slotKhoBau.selectPlayBanDo(sender);
                            }
                            break;
                    }

                },this);


            }
            this.initGiaMayMan();
            this.hidePlayBanDo();
            this.hideStartBanDo();
            this.hideBanDoMayMan();
            this.hideBanDoKhoBau();
            this.pEndBanDo.setVisible(false);

        },
        hideStartBanDo:function()
        {
            this.pStartBanDo.setVisible(false);
            this.sp_sang_vang_ban_do.stopAllActions();
            this.sp_sao_ban_do.stopAllActions();

        },
        showStartBanDo:function()
        {
            this.pStartBanDo.setVisible(true);
            this.sp_sang_vang_ban_do.runAction(cc.repeatForever(cc.rotateBy(5,360)));
            this.sp_sao_ban_do.runAction(cc.repeatForever(cc.rotateBy(10,360)));
        },
        hideBanDoKhoBau:function()
        {
            this.pBanDoKhoBau.setVisible(false);
            this.hidePlayBanDo();
        },
        showPlayBanDo:function()
        {
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.startMiniGame);
            this.pPlayBanDo.setVisible(true);
        },
        hidePlayBanDo:function()
        {
            this.pPlayBanDo.setVisible(false);
            for(var i = 0; i<30; i++)
            {
                this["btnSelectPlay" + i].loadTextures("res/SlotKhoBau/minigame/item_matup.png","res/SlotKhoBau/minigame/item_matup.png","res/SlotKhoBau/minigame/item_matup.png");
                this["btnSelectPlay" + i].setEnabled(true);
                this["lbSelectPlay" + i].setString("");

            }
        },

        selectPlayBanDo:function(sender)
        {
            if(this.soLanMo < this.resultSlot.khoBau.split(",").length)
            {
                var keyGiai = parseInt(this.resultSlot.khoBau.split(",")[this.soLanMo]);

                switch (keyGiai)
                {
                    case 1:
                        this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultGoldMiniGame);
                        sender.loadTextures("res/SlotKhoBau/minigame/item_money.png","res/SlotKhoBau/minigame/item_money.png","res/SlotKhoBau/minigame/item_money.png");
                        this["lbSelectPlay" + sender.getTag()].setString(formatMoney(0,3,this.giaTriNhan * 4 * this.betValue));
                        this.resultHaiSao = this.resultHaiSao + this.giaTriNhan * 4 * this.betValue;
                        this.soLuotChuaMo--;
                        if(this.soLanMo == this.resultSlot.khoBau.split(",").length-1)
                        {
                            sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                                //show end ban do kho bau
                                slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.showResultMiniGame);
                                slotKhoBau.pEndBanDo.setVisible(true);
                                slotKhoBau.lb_tong_tien_ban_do.setString(formatMoney(0,3,slotKhoBau.resultHaiSao));
                            })));
                        }
                        break;
                    case 0:
                        this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultBonusMiniGame);
                        sender.loadTextures("res/SlotKhoBau/minigame/item_themluot.png","res/SlotKhoBau/minigame/item_themluot.png","res/SlotKhoBau/minigame/item_themluot.png");
                        this.giaTriNhan ++;
                        break;
                    case 2:
                    case 3:
                    case 4:
                        this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultDuongKhoBau);
                        this.showBanDoMayMan(sender,keyGiai);

                        this.soLuotChuaMo--;
                        break;
                }
                this.soLanMo ++;
                this.lb_lan_con_lai.setString(this.soLuotChuaMo);
                this.lb_diem_tich_luy.setString("X"+this.giaTriNhan);
            }

        },

        showBanDoMayMan:function(sender1,keyGiai)
        {
            this.isShowMayMan = true;
            //this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultDuongKhoBau);
            sender1.loadTextures("res/SlotKhoBau/minigame/item_hutien.png","res/SlotKhoBau/minigame/item_hutien.png","res/SlotKhoBau/minigame/item_hutien.png");
            this.pMayMan.setVisible(true);
            for(var i= 0; i< 5; i++)
            {
                this["btnSelectMayMan" + i].addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.clickResultKhoBau);
                            for(var i = 0; i< 5; i ++)
                            {
                                slotKhoBau["btnSelectMayMan" + i].setEnabled(false);
                                if(slotKhoBau["btnSelectMayMan" + i] == sender)
                                {
                                    slotKhoBau["lbSelectMayMan" + sender.getTag()].setString(formatMoney(0,3,slotKhoBau.genValueFromKey(keyGiai)*slotKhoBau.betValue* slotKhoBau.giaTriNhan));
                                    slotKhoBau.resultHaiSao = slotKhoBau.resultHaiSao + slotKhoBau.genValueFromKey(keyGiai)*slotKhoBau.betValue* slotKhoBau.giaTriNhan;

                                }else
                                {
                                    var randomKey = getRandomInt(2,4);
                                    slotKhoBau["lbSelectMayMan" + slotKhoBau["btnSelectMayMan" + i].getTag()].setString(formatMoney(0,3,slotKhoBau.genValueFromKey(randomKey)*slotKhoBau.betValue* slotKhoBau.giaTriNhan));
                                }
                            }

                            sender.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                                for(var i = 0; i< 5; i ++) {
                                    slotKhoBau["btnSelectMayMan" + i].setEnabled(true);
                                }
                                slotKhoBau.hideBanDoMayMan();
                                slotKhoBau["lbSelectPlay" + sender1.getTag()].setString(formatMoney(0,3,slotKhoBau.genValueFromKey(keyGiai)*slotKhoBau.betValue* slotKhoBau.giaTriNhan));
                                if(slotKhoBau.soLanMo == slotKhoBau.resultSlot.khoBau.split(",").length)
                                {
                                    sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                                        //show end ban do kho bau
                                        slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.showResultMiniGame);
                                        slotKhoBau.pEndBanDo.setVisible(true);
                                        slotKhoBau.lb_tong_tien_ban_do.setString(formatMoney(0,3,slotKhoBau.resultHaiSao));

                                    })));
                                }
                            })));

                            break;
                    }

                },this);
            }
        },
        hideBanDoMayMan: function()
        {
            this.isShowMayMan = false;
            this.pMayMan.setVisible(false);
            for(var i=0; i< 5; i++)
            {
                this["btnSelectMayMan" + i].loadTextures("res/SlotKhoBau/minigame/item_giai_may_man.png","res/SlotKhoBau/minigame/item_giai_may_man.png","res/SlotKhoBau/minigame/item_giai_may_man.png");
                this["lbSelectMayMan" + i].setString("");
            }
        },
        genValueFromKey:function(key)
        {
            if(key == 2)
            {
                return 10;
            }
            if(key == 3)
            {
                return 15;
            }
            if(key == 4)
            {
                return 20;
            }
        },
        initGiaMayMan:function()
        {
            var startX= 77;
            var startY = 212;
            var kcX= 142;
            var kcY = 136.5;
            var kcText = 46;
            for(var i = 0; i < 5; i++)
            {
                this["btnSelectMayMan" + i] = new ccui.Button();
                this["btnSelectMayMan" + i].loadTextures("res/SlotKhoBau/minigame/item_giai_may_man.png","res/SlotKhoBau/minigame/item_giai_may_man.png","res/SlotKhoBau/minigame/item_giai_may_man.png");
                this["lbSelectMayMan" + i] =  new cc.LabelTTF('',  RobotoRegular.fontName, 20, cc.size(94,23), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this["btnSelectMayMan" + i].setTag(i);
                if(i < 3)
                {
                    this["btnSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX,startY - parseInt(i/3)*kcY));
                    this["lbSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX+10,startY - parseInt(i/3)*kcY - kcText));

                }else
                {

                    this["btnSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX + kcX/2,startY - parseInt(i/3)*kcY));
                    this["lbSelectMayMan" + i].setPosition(cc.p(startX + (i%3)*kcX + kcX/2 + 10,startY - parseInt(i/3)*kcY - kcText));

                }

                this.pMayMan.addChild(this["btnSelectMayMan" + i]);
                this.pMayMan.addChild(this["lbSelectMayMan" + i]);
            }
        },
        initNoHu:function()
        {
            this.pNoHu = this.getControl("pNoHu",this.pSlotKhoBau);
            this.sp_bg_sang_vang = this.pNoHu.getChildByName("sp_bg_sang_vang");
            this.sp_duong_vang = this.pNoHu.getChildByName("sp_duong_vang");
            this.sp_star1 = this.pNoHu.getChildByName("sp_star1");
            this.sp_star2 = this.pNoHu.getChildByName("sp_star2");
            this.sp_star3 = this.pNoHu.getChildByName("sp_star3");
            this.sp_star4 = this.pNoHu.getChildByName("sp_star4");
            this.sp_star_vang1 = this.pNoHu.getChildByName("sp_star_vang1");
            this.sp_star_vang2 = this.pNoHu.getChildByName("sp_star_vang2");
            this.sp_star_vang3 = this.pNoHu.getChildByName("sp_star_vang3");
            this.sp_star_vang4 = this.pNoHu.getChildByName("sp_star_vang4");
            this.sp_txt_no_hu = this.pNoHu.getChildByName("sp_txt_no_hu");
            this.stopActionNoHu();
            //this.showActionNoHu();
        },


        stopActionNoHu:function()
        {
            this.pNoHu.setVisible(false);
            this.sp_bg_sang_vang.stopAllActions();
            this.sp_bg_sang_vang.setScale(0);
            this.sp_duong_vang.stopAllActions();
            this.sp_duong_vang.setScale(0);
            this.sp_txt_no_hu.stopAllActions();
            this.sp_txt_no_hu.setScale(0);

            for(var i = 1; i <= 4; i++)
            {
                this["sp_star" + i].stopAllActions();
                this["sp_star" + i].setScale(0);
            }
            for(var i = 1; i <= 4; i++)
            {
                this["sp_star_vang" + i].stopAllActions();
                this["sp_star_vang" + i].setScale(0);
            }
        },

        showActionNoHu:function()
        {
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.noHu);
            this.pNoHu.setVisible(true);
            var actionShow = cc.scaleTo(0.5,1);
            //var actionNhayTxtNoHu = cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1)));



            //var actionNhayStar = cc.repeatForever(cc.spawn(cc.rotateBy(10,360),cc.sequence(cc.scaleTo(5,0.5),cc.scaleTo(5,0.7))));

            //this.sp_txt_no_hu.setScale(1);

            this.sp_txt_no_hu.runAction(cc.sequence(actionShow,cc.callFunc(function(){
                slotKhoBau.sp_txt_no_hu.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1))));
                slotKhoBau.sp_bg_sang_vang.runAction(cc.sequence(actionShow.clone(),cc.callFunc(function(){
                    var actionXoaySangVang = cc.repeatForever(cc.rotateBy(4,360));
                    slotKhoBau.sp_bg_sang_vang.runAction(actionXoaySangVang);
                })));
                slotKhoBau.sp_duong_vang.runAction(cc.sequence(cc.delayTime(0.25),actionShow.clone(),cc.callFunc(function(){

                    var actionShowStar = cc.scaleTo(0.2,0.5);
                    slotKhoBau.sp_star1.runAction(cc.sequence(actionShowStar.clone(),cc.callFunc(function(){
                        var actionNhayStar = cc.repeatForever(cc.spawn(cc.rotateBy(10,360),cc.sequence(cc.scaleTo(5,0.5),cc.scaleTo(5,0.7))));
                        slotKhoBau.sp_star1.runAction(actionNhayStar);
                    })));
                    slotKhoBau.sp_star2.runAction(cc.sequence(actionShowStar.clone(),cc.callFunc(function(){
                        var actionNhayStar = cc.repeatForever(cc.spawn(cc.rotateBy(10,360),cc.sequence(cc.scaleTo(5,0.5),cc.scaleTo(5,0.7))));
                        slotKhoBau.sp_star2.runAction(actionNhayStar);
                    })));
                    slotKhoBau.sp_star3.runAction(cc.sequence(actionShowStar.clone(),cc.callFunc(function(){
                        var actionNhayStar = cc.repeatForever(cc.spawn(cc.rotateBy(10,360),cc.sequence(cc.scaleTo(5,0.5),cc.scaleTo(5,0.7))));
                        slotKhoBau.sp_star3.runAction(actionNhayStar);
                    })));
                    slotKhoBau.sp_star4.runAction(cc.sequence(actionShowStar.clone(),cc.callFunc(function(){
                        var actionNhayStar = cc.repeatForever(cc.spawn(cc.rotateBy(10,360),cc.sequence(cc.scaleTo(5,0.5),cc.scaleTo(5,0.7))));
                        slotKhoBau.sp_star4.runAction(actionNhayStar);
                    })));


                    var randomDelayTime1 = getRandomInt(1,20)/10;
                    slotKhoBau.sp_star_vang1.runAction(cc.sequence(cc.delayTime(randomDelayTime1),cc.callFunc(function(){
                        slotKhoBau.sp_star_vang1.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1),cc.scaleTo(1,0),cc.delayTime(1))));
                    })));
                    //slotKhoBau.sp_star_vang1.runAction(actionShowStarVang1);

                    var randomDelayTime2 = getRandomInt(1,20)/10;
                    slotKhoBau.sp_star_vang2.runAction(cc.sequence(cc.delayTime(randomDelayTime2),cc.callFunc(function(){
                        slotKhoBau.sp_star_vang2.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1),cc.scaleTo(1,0),cc.delayTime(1))));
                    })));
                    //slotKhoBau.sp_star_vang2.runAction(actionShowStarVang2);

                    var randomDelayTime3 = getRandomInt(1,20)/10;
                    slotKhoBau.sp_star_vang3.runAction(cc.sequence(cc.delayTime(randomDelayTime3),cc.callFunc(function(){
                        slotKhoBau.sp_star_vang3.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1),cc.scaleTo(1,0),cc.delayTime(1))));
                    })));
                    //slotKhoBau.sp_star_vang3.runAction(actionShowStarVang3);

                    var randomDelayTime4 = getRandomInt(1,20)/10;
                    slotKhoBau.sp_star_vang4.runAction(cc.sequence(cc.delayTime(randomDelayTime4),cc.callFunc(function(){
                        slotKhoBau.sp_star_vang4.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1,1),cc.scaleTo(1,0),cc.delayTime(1))));
                    })));
                    //slotKhoBau.sp_star_vang4.runAction(actionShowStarVang4);

                })));

            })));

        },
        initThangLon:function()
        {
            this.pThangLon = this.getControl("pThangLon",this.pSlotKhoBau);
            this.sp_bg_sang_xanh = this.pThangLon.getChildByName("sp_bg_sang_xanh");
            this.sp_tui_tien = this.pThangLon.getChildByName("sp_tui_tien");
            this.sp_txt_thang_lon = this.pThangLon.getChildByName("sp_txt_thang_lon");
            this.stopActionThangLon();
            //this.showActionThangLon();
        },
        stopActionThangLon:function()
        {
            this.pThangLon.setVisible(false);
            this.sp_bg_sang_xanh.stopAllActions();
            this.sp_bg_sang_xanh.setScale(0);
            this.sp_tui_tien.stopAllActions();
            this.sp_tui_tien.setScale(0);
            this.sp_txt_thang_lon.stopAllActions();
            this.sp_txt_thang_lon.setScale(0);
        },
        showActionThangLon:function()
        {
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultBigWin);
            this.pThangLon.setVisible(true);
            var actionShow = cc.scaleTo(0.5,1);



            this.sp_txt_thang_lon.runAction(cc.sequence(actionShow,cc.callFunc(function(){
                this.sp_txt_thang_lon.runAction(cc.sequence(cc.scaleTo(0.5,0.7),cc.scaleTo(0.5,1)));
                slotKhoBau.sp_bg_sang_xanh.runAction(cc.sequence(actionShow.clone(),cc.callFunc(function(){
                    var actionXoaySangXanh = cc.repeatForever(cc.rotateBy(4,360));
                    slotKhoBau.sp_bg_sang_xanh.runAction(actionXoaySangXanh);
                })));
                slotKhoBau.sp_tui_tien.runAction(cc.sequence(cc.delayTime(0.25),actionShow.clone(),cc.callFunc(function(){
                    var actionNhayTxtThangLon = cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1)));
                    slotKhoBau.sp_tui_tien.runAction(actionNhayTxtThangLon.clone());
                },this)));

            },this)));

        },



        initItem:function()
        {
            var khoangCach = 169;
            var viTriDauY = 84.5;
            var viTriDauX = 98.5;
            for(var j = this.totalItemColum -1; j >=0 ; j--)
            {
                for(var i=1;i<6;i++)
                {
                    this["pColum"+ i.toString()].indexColumn = i;

                    if(j<3)
                    {
                        this["spNenItem"+ i.toString() + j.toString()] = new cc.Sprite();
                        this["spNenItem"+ i.toString() + j.toString()].initWithFile("res/SlotKhoBau/item/khungan.png",cc.rect(0,0,172,172));
                        this["spNenItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                        this["pColum"+ i.toString()].addChild(this["spNenItem"+ i.toString() + j.toString()]);
                        this["spNenItem"+ i.toString() + j.toString()].setVisible(false);
                        this.arrItemMatrix.push(this["spNenItem"+ i.toString() + j.toString()]);
                    }
                    this["spItem"+ i.toString() + j.toString()] = new cc.Sprite();
                    this["spItem"+ i.toString() + j.toString()].initWithFile("res/SlotKhoBau/item/Item"+getRandomInt(0,6)+".png",cc.rect(0,0,176,176));
                    this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                    this["pColum"+ i.toString()].addChild(this["spItem"+ i.toString() + j.toString()]);
                    this["pColum"+ i.toString()].setLocalZOrder(20+i);
                }

            }
            var arrMatrix = this.resultSlot.matrix.split(",");
            for(var i= 2; i >= 0; i--)
            {
                for(var j= 1; j< 6; j++)
                {
                    this["spItem" + j.toString() + i.toString()].setScale(1);
                    this["spItem" + j.toString() + i.toString()].setTexture("res/SlotKhoBau/item/Item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                    //this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
                    ////cc.log(j + " " + i);
                }
            }
        },
        initShowLine:function()
        {
            for(var i = 1; i <= 20; i++)
            {
                this["spShowLine"+ i.toString()] = new cc.Sprite();
                this["spShowLine"+ i.toString()].initWithFile("res/SlotKhoBau/line/line"+i+".png",cc.rect(0,0,1102,451));
                this["spShowLine"+ i.toString()].setPosition(cc.p(this.pItem.getContentSize().width/2,this.pItem.getContentSize().height/2 + 2));
                this.pItem.addChild(this["spShowLine"+ i.toString()]);
                this["spShowLine"+ i.toString()].setLocalZOrder(i);
                this["spShowLine"+ i.toString()].setVisible(false);
            }

        },
        initChonDong:function()
        {
            var widthFragm = 270;
            var heightFragm = 172;
            var startX = 214;
            var startY = 520;
            var btnRect = cc.rect(132,113);
            var khoangCachX = 152;
            var khoangCachY = 132;

            for(var i = 1; i <= 20; i++)
            {

                this["btnLine"+i] = new ccui.Button();
                this["btnLine"+i].loadTextures("res/SlotKhoBau/number/"+i+"_1.png","res/SlotKhoBau/number/"+i+"_1.png","res/SlotKhoBau/number/"+i+"_1.png");
                this["btnLine"+i].setPosition(cc.p(startX + ((i-1)%5)*khoangCachX,startY - Math.floor((i-1)/5)*khoangCachY));
                this["btnLine"+i].setTag(i);
                this["btnLine"+i].isSelectLine = false;
                this.pChonDong.addChild(this["btnLine"+i]);
                if(i== 1)
                {
                    this["btnLine"+i].loadTextureNormal("res/SlotKhoBau/number/"+i+".png");
                    this["btnLine"+i].isSelectLine = true;
                }
                this["btnLine"+i].addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            if(slotKhoBau.checkDonePlay())
                            {
                                if(this.isChoiThu)
                                {
                                    this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                                }else
                                {
                                    slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
                                    slotKhoBau.selectLine(sender.getTag());
                                    slotKhoBau.changeLineSelected();
                                }

                            }

                            break;
                    }

                },this);
            }
            this.selectLineAll();
            //this.showAndHideLineSelect();
        },
        getArrayLineSelected:function()
        {
            var lineSelected = "";
            for(var i= 1; i <= 20; i++)
            {
                if(this["btnLine"+i].isSelectLine)
                {
                    if(lineSelected == "")
                    {
                        lineSelected = i.toString();
                    }else
                    {
                        lineSelected = lineSelected+","+i.toString();
                    }
                }
            }
            return lineSelected;
        },
        selectLine:function(index)
        {
           // //cc.log(index);
            if(this["btnLine"+index].isSelectLine == true)
            {
                this.btnSelectLine(index,false);
            }
            else
            {
                this.btnSelectLine(index,true);
            }

        },
        btnSelectLine:function(index,selected)
        {
            if(selected == true)
            {
                this["btnLine"+index].isSelectLine = true;
                this["btnLine"+index].loadTextureNormal("res/SlotKhoBau/number/"+index+".png");
                //this["spShowLine"+index].setVisible(true);
            }else
            {
                this["btnLine"+index].isSelectLine = false;
                this["btnLine"+index].loadTextureNormal("res/SlotKhoBau/number/"+index+"_1.png");
                //this["spShowLine"+index].setVisible(false);
            }
            //this.showAndHideLineSelect();
        },
        setTextChangeLine:function()
        {
            this.sumBet = this.lineSelected * this.betValue;
            this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
            this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
            this.lb_so_dong.setString(this.lineSelected);
        },
        changeLineSelected:function()
        {
            var countLineSelect = 0;
            for(var i = 1; i <= 20; i++)
            {
                if(this["btnLine"+i].isSelectLine == true)
                {
                    countLineSelect ++;
                }
            }

            this.lineSelected = countLineSelect;
            this.setTextChangeLine();

        },
        selectLineChan:function()
        {
            for(var i = 1; i<=20; i++)
            {
                if(i%2 == 0)
                {
                    this.btnSelectLine(i,true);
                }else
                {
                    this.btnSelectLine(i,false);
                }
            }
            this.changeLineSelected();
        },
        selectLineLe:function()
        {
            for(var i = 1; i<=20; i++)
            {
                if(i%2 == 0)
                {
                    this.btnSelectLine(i,false);
                }else
                {
                    this.btnSelectLine(i,true);
                }
            }
            this.changeLineSelected();
        }
        ,
        selectLineAll:function()
        {
            for(var i = 1; i<=20; i++)
            {
                this.btnSelectLine(i,true);
            }
            this.changeLineSelected();
        }
        ,
        chonLai:function()
        {
            for(var i = 1; i<=20; i++)
            {
                this.btnSelectLine(i,false);
            }
            this.changeLineSelected();
        },

        startPlay:function()
        {
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.quay);
            this.isRotate = true;
            this.btn_quay.setBright(false);
            this.btn_tu_quay.setBright(false);
            if(this.isChoiThu)
            {
                var randomResult = getRandomInt(0,Slots.resultChoiThu.length-1);
                var resultChoiThu = Slots.resultChoiThu[randomResult];
                //this.resultSlot =
                //var resultChoiThu = Slots.resultChoiThu[Slots.resultChoiThu.length-2];
               // //cc.log("Ket qua test " + randomResult);
                this.updateResult(resultChoiThu.ref,resultChoiThu.result,resultChoiThu.matrix,resultChoiThu.linesWin,resultChoiThu.khoBau,resultChoiThu.prize,0);


            }else
            {
                this.play(this.betValue,this.getArrayLineSelected());
            }
        },
        checkDonePlay:function()
        {
            if(this.isChangeRoom)
            {
                this.toastSlot("Bạn đang chuyển room, vui lòng chờ",3);
                return false;
            }
            if(this.isAutoRotate)
            {
                this.toastSlot("Bạn đang quay tự động",3);
                return false;
            }
            if(this.isRotate)
            {
                this.toastSlot("Bạn đang quay, vui lòng chờ quay xong",3);
                return false;
            }
            return true;

        },
        updateMoneyClient:function()
        {
            if(this.isChoiThu)
            {
                var moneyUpdate = 0;

                this.totalMoneyChoiThu = this.totalMoneyChoiThu - this.betValue*20;
                if(this.totalMoneyChoiThu >= 0)
                {
                    slotKhoBau.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));
                }
            }else
            {
                if(this.free > 0 || this.isFreeDaiLy == true)
                {

                }else
                {
                    var moneyUpdate = 0;

                    moneyUpdate = lobby.userInfo.vinTotal - (slotKhoBau.lineSelected * slotKhoBau.betValue);
                    if(moneyUpdate>=0)
                    {
                        slotKhoBau.lb_total_money.setString(formatMoney(0,3,moneyUpdate));
                    }
                }

            }
        },
        updateCurrentMoney:function()
        {
            if(!this.isChoiThu)
            {
                lobby.updateMoney(this.resultSlot.currentMoney,MONEY_VIN);
            }else
            {
                this.totalMoneyChoiThu = this.totalMoneyChoiThu + this.resultSlot.prize;
                slotKhoBau.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));
            }
        },
        updateLsgd:function()
        {

            var date = new Date();

            var strDate = date.getHours()+":"+date.getMinutes() + ":" +date.getSeconds()+ " "+ date.getDate() +"-"+date.getMonth()+"-"+date.getFullYear();
            this.resultSlot.time = strDate;
            var objLS = {};
            if(this.resultSlot.ref!=0)
            {
                objLS.rf = this.resultSlot.ref;
                objLS.un = "user name";
                objLS.bv = this.betValue;

                objLS.lb = this.getArrayLineSelected();
                if(this.free > 0)
                {
                    objLS.bv = 100;
                    objLS.lb = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
                }
                objLS.lw = this.resultSlot.linesWin;
                objLS.pz = this.resultSlot.prize;
                objLS.ps = "";
                objLS.ts = strDate;
            }

            var temLsgd = [];
            //this.arrLsgd.splice(0,0,this.objLsgd);
            temLsgd.push(objLS);
            for (var i = 0; i < this.arrLsgd.length; i++)
            {
                if(i<4)
                temLsgd.push(this.arrLsgd[i]);
            }
            if(this.arrLsgd!=null)
                while(this.arrLsgd.length > 0) {
                    this.arrLsgd.pop();
                }
            for (var i = 0; i < temLsgd.length; i++)
            {
                this.arrLsgd.push(temLsgd[i]);
            }
            this.arrLsgd = temLsgd;


        },
        updateBigWin:function(username,type,betValue,totalPrizes,timestampt)
        {
            var obj = {};
            obj.un = username;
            obj.type = type;
            obj.bv = betValue;
            obj.pz = totalPrizes;
            obj.ts = timestampt;
            this.arrVinhdanh.splice(0,0,obj);
            obj = null;
            delete obj;
            //this.reloadBangVinhDanh();

        },
        updateFree:function(currentFree)
        {
            this.free = currentFree;
            this.lb_so_luot_mien_phi.setString(currentFree);
        },
        updateResult:function(ref,result,matrix,linesWin,khoBau,prize,currentMoney)
        {
            if(!slotKhoBauAppear)
                return;
            if(this.isAutoRotate)
            {
                this.audioKhoBau.stopAllEffect();
            }
            this.isWaitingRotate = false;
            if(this.resultSlot.result == 5)
            {
                slotKhoBau.waitingKhoBau = false;
                this.btn_ban_do.stopAllActions();
                this.pEndBanDo.setVisible(false);
                this.isPlayMinigame = false;
                this.pEndBanDo.setVisible(false);
                this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));
                this.resultHaiSao = 0;
                this.giaTriNhan = 1;
                this.soLuotChuaMo = 10;
                this.soLanMo = 0;
                this.updateCurrentMoney();
                this.hidePlayBanDo();
                this.hideStartBanDo();
                this.hideBanDoMayMan();
                this.hideBanDoKhoBau();

            }
            if(this.isAutoRotate && result == 5)
            {
                this.waitingKhoBau = true;
            }
            //var obj = {};
            this.resultSlot.ref = ref;
            this.resultSlot.result = result;
            this.resultSlot.matrix = matrix;
            this.resultSlot.linesWin = linesWin;
            this.resultSlot.khoBau = khoBau;
            this.resultSlot.prize = prize;
            this.resultSlot.currentMoney = currentMoney;
            //this.resultSlot = obj;
            this.isRotate = true;

            this.stopActionNoHu();
            this.stopActionThangLon();
            this.pItem.stopAllActions();
            this.lb_prize.stopAllActions();
            //this.lb_prize.setString("0");

            for(var i = 1; i < 6; i++)
            {
                this["pColum"+ i.toString()].stopAllActions();
                this["pColum"+ i.toString()].y = 18;
            }
            this.resetPositionItem();

            if(result == 100)
            {
                this.toastSlot("Quay không thành công",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");

            }else if(result == 101)
            {
                this.toastSlot("Đặt cược không hợp lệ",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
            }else if(result == 102)
            {
                this.toastSlot("Bạn không đủ tiền",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
            }else if(result == 103)
            {
                this.toastSlot("Lượt quay không hợp lệ",3);
                this.isFreeDaiLy = false;
                this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
            }else
            {
                this.setItem();
                this.startPlayColum();
                if(!this.isChoiThu)
                {
                    //this.updateLsgd();
                }else
                {
                    this.resultSlot.prize = this.resultSlot.prize * (this.betValue/100);
                }
            }
            this.updateMoneyClient();

        },
        updatePot:function(pot1,pot2,pot3,x21,x22)
        {

            if(this.isChangeRoom)
            {
                this.isChangeRoom = false;
                this.lb_prize.setString("0");
            }
            //var breakValue = 0;//parseInt((pot - this.valueHuSlot)/999);
            //if(Math.abs(pot - this.valueHuSlot)<=100 && Math.abs(pot - this.valueHuSlot)>0)
            //{
            //    breakValue = 1;
            //}
            //else
            //
            //    breakValue = parseInt((pot - this.valueHuSlot)/50)+1;
            //effectRunMoney(this.txtHuSlot,this.valueHuSlot, pot, breakValue,true);

            var breakValue1 = parseInt((pot1 - this.valueHuSlot1)/50) +1;
            //effectRunMoney(this.lb_hu_room1,this.valueHuSlot1, pot1, breakValue1,true);

            var breakValue2 = parseInt((pot2 - this.valueHuSlot2)/50) + 1;
            //effectRunMoney(this.lb_hu_room2,this.valueHuSlot2, pot2, breakValue2,true);

            var breakValue3 = parseInt((pot3 - this.valueHuSlot3)/50) + 1;
            //effectRunMoney(this.lb_hu_room3,this.valueHuSlot3, pot3, breakValue3,true);

            if(this.currentRoom == SlotKhoBauLayer.ROOM1)
            {
                effectRunMoney(this.lb_hu,this.valueHuSlot1, pot1, breakValue1,true);
                this.sp_quy_thuong.stopAllActions();
                this.sp_quy_thuong.setScale(1);
                if(x21 == 0)
                {
                    this.sp_quy_thuong.setTexture("res/SlotKhoBau/quy_thuong.png");
                }else
                {
                    this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                    this.sp_quy_thuong.setTexture("res/SlotKhoBau/x2_quy_thuong.png");
                }
            }else
            if(this.currentRoom == SlotKhoBauLayer.ROOM2)
            {
                effectRunMoney(this.lb_hu,this.valueHuSlot2, pot2, breakValue2,true);
                this.sp_quy_thuong.stopAllActions();
                this.sp_quy_thuong.setScale(1);
                if(x22 == 0)
                {
                    this.sp_quy_thuong.setTexture("res/SlotKhoBau/quy_thuong.png");
                }else
                {
                    this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                    this.sp_quy_thuong.setTexture("res/SlotKhoBau/x2_quy_thuong.png");
                }
            }else
            if(this.currentRoom == SlotKhoBauLayer.ROOM3)
            {
                effectRunMoney(this.lb_hu,this.valueHuSlot3, pot3, breakValue3,true);
                this.sp_quy_thuong.stopAllActions();
                this.sp_quy_thuong.setScale(1);
                this.sp_quy_thuong.setTexture("res/SlotKhoBau/quy_thuong.png");
            }

            this.valueHuSlot1 = pot1;
            this.valueHuSlot2 = pot2;
            this.valueHuSlot3 = pot3;
        },
        setDateX2:function(date)
        {
            cc.log("date: " + date);
            this.lb_date_x2.setString(date);

        },
        forceStopAuto:function()
        {
            this.isAutoRotate = false;
            this.btn_quay.setBright(true);
            this.btn_tu_quay.setBright(true);
            this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
            //slot3hang.txt_tuquay.setString("TỰ QUAY");


        },
        showAndHideLineSelect: function()
        {
            for(var i = 1; i<=20; i++)
            {
                if(this["btnLine"+i].isSelectLine == true)
                {
                    this["spShowLine"+ i.toString()].setVisible(true);
                }else
                {
                    this["spShowLine"+ i.toString()].setVisible(false);
                }
            }
        },
        inVisibleAllLine:function()
        {
            for(var i = 1; i<=20; i++)
            {
                this["spShowLine"+ i.toString()].setVisible(false);
            }
        },
        visibleLine:function(arrLine)
        {
            for(var i = 0; i< arrLine.length; i++)
            {
                this["spShowLine"+ arrLine[i]].setVisible(true);
            }
        },
        setItem:function()
        {
            var arrMatrix = this.resultSlot.matrix.split(",");
            //this.arrItemMatrix = [];
            if(this["spItem10"].y > this["spItem1" + (this.totalItemColum-1).toString()].y)
            {
                for(var i= 2; i >= 0; i--)
                {
                    for(var j= 1; j< 6; j++)
                    {
                        this["spItem" + j.toString() + i.toString()].setScale(1);
                        this["spItem" + j.toString() + i.toString()].setTexture("res/SlotKhoBau/item/Item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                        //this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
                        ////cc.log(j + " " + i);
                    }
                }

            }else
            {
                for(var i = (this.totalItemColum-1); i >= this.totalItemColum-3; i--)
                {
                    for(var j= 1; j< 6; j++)
                    {
                        this["spItem" + j.toString() + i.toString()].setScale(1);
                        this["spItem" + j.toString() + i.toString()].setTexture("res/SlotKhoBau/item/Item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
                        //this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
                        ////cc.log(j + " " + i);
                    }
                }
            }
        },
        startPlayColum:function()
        {
            this.inVisibleAllLine();
            var delayTimeColum = 0.3;
            for(var i = 1; i <= 5; i++)
            {
                var actionBack = cc.MoveBy.create(0.3, cc.p(0, 9));
                var actionBack11 = cc.MoveBy.create(0.3, cc.p(0, -9));
                switch (i)
                {
                    case 1:
                        this["pColum"+ i.toString()].runAction(cc.sequence(cc.delayTime(delayTimeColum*(i-1)),actionBack,cc.spawn(actionBack11,cc.callFunc(function(){
                            this.spinColum(1);
                        } ,this))));
                        break;
                    case 2:
                        this["pColum"+ i.toString()].runAction(cc.sequence(cc.delayTime(delayTimeColum*(i-1)),actionBack,cc.spawn(actionBack11,cc.callFunc(function(){
                            this.spinColum(2);
                        } ,this))));
                        break;
                    case 3:
                        this["pColum"+ i.toString()].runAction(cc.sequence(cc.delayTime(delayTimeColum*(i-1)),actionBack,cc.spawn(actionBack11,cc.callFunc(function(){
                            this.spinColum(3);
                        } ,this))));
                        break;
                    case 4:
                        this["pColum"+ i.toString()].runAction(cc.sequence(cc.delayTime(delayTimeColum*(i-1)),actionBack,cc.spawn(actionBack11,cc.callFunc(function(){
                            this.spinColum(4);
                        } ,this))));
                        break;
                    case 5:
                        this["pColum"+ i.toString()].runAction(cc.sequence(cc.delayTime(delayTimeColum*(i-1)),actionBack,cc.spawn(actionBack11,cc.callFunc(function(){
                            this.spinColum(5);
                        } ,this))));
                        break;

                }

            }
        },
        spinColum:function(index)
        {
            if(index == 1)
            this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.runItem);
            var khoangCach = 169;
            for(var i = 0; i < this.totalItemColum; i++)
            {
                var actionBy = cc.MoveBy.create(0.8, cc.p(0,  - khoangCach*(this.totalItemColum-3)));
                if(i != (this.totalItemColum - 1)) {
                    this["spItem"+ index.toString() + i.toString()].runAction(actionBy);
                }else {
                    this["spItem"+ index.toString() + i.toString()].runAction(cc.sequence(actionBy, cc.callFunc(function(){

                       // //cc.log(" spinColum Xong");
                        slotKhoBau.endPlay(index);
                    }, this)));
                }
            }
        },
        endPlay:function(index)
        {
            var actionBack = cc.MoveBy.create(0.15, cc.p(0, 12));
            var actionBack1 = cc.MoveBy.create(0.12, cc.p(0, -15));
            var actionBack2 = cc.MoveBy.create(0.1, cc.p(0, 3));

            this["pColum"+ index.toString()].runAction(cc.sequence(actionBack,actionBack1,actionBack2,cc.callFunc(function(){
                if(index == 5)
                {
                   // //cc.log("Quay xong");
                    if(slotKhoBau.resultSlot.linesWin!="")
                    slotKhoBau.visibleLine(slotKhoBau.resultSlot.linesWin.split(","));
                    slotKhoBau.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){

                        slotKhoBau.isRotate = false;
                        slotKhoBau.showEffectDone();
                        //if(!this.isChoiThu)
                        //{
                        //    this.reloadLsgd();
                        //}
                        if(!slotKhoBau.isAutoRotate)
                        {
                            slotKhoBau.btn_quay.setBright(true);
                            slotKhoBau.btn_tu_quay.setBright(true);

                        }

                        if(slotKhoBau.resultSlot.linesWin!="")
                            slotKhoBau.runEffectLineWin(0);
                        if(slotKhoBau.resultSlot.result!=5)
                            effectRunMoney(slotKhoBau.lb_prize,0,slotKhoBau.resultSlot.prize,parseInt(slotKhoBau.resultSlot.prize/20),true);
                    },this)));

                }
            },this)));
        },

        runEffectLineWin : function (index){
            var arrLineWin = this.resultSlot.linesWin.split(",");
            var indexInLine = 1;
            if(index < arrLineWin.length-1)
            {
                for(var i = index +1; i< arrLineWin.length; i++)
                {
                    if(arrLineWin[index] == arrLineWin[i])
                    {
                        indexInLine++;
                    }
                }
            }else
            {
                indexInLine = 1;
            }


            this.inVisibleAllLine();

            if(index >= arrLineWin.length){

            }else{
                if(this.resultSlot.result != 2 && this.resultSlot.result != 3&& this.resultSlot.result != 5)
                slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.lineThang);
                this["spShowLine"+ arrLineWin[index]].setVisible(true);
                this.runEffectItemInLine(arrLineWin[index] -1,indexInLine);
                slotKhoBau.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                    slotKhoBau.runEffectLineWin(index + 1);
                },this)));
            }
        },

        runEffectItemInLine: function(line,indexInLine)
        {
            var arrMatrix = this.resultSlot.matrix.split(",");
            var countLine = 0;
            var arrLine = [];
            var arrItem = [];
            for(var i = 0; i< 5; i++)
            {
                if(arrMatrix[this.mapLine[line][i]] == 1)
                {
                    continue;
                }else
                {
                    arrLine.push(this.mapLine[line][i]);
                    var daCo = false;
                    for(var n = 0; n < arrItem.length; n++)
                    {
                        if(arrMatrix[this.mapLine[line][i]] == arrItem[n])
                        {
                            daCo = true;
                        }
                    }
                    if(daCo)
                    {
                        continue;
                    }else
                        for(var j = 0; j < 5; j++)
                        {
                            if(i == j)
                            {
                            }
                            else
                            {
                                if(arrMatrix[this.mapLine[line][i]] == arrMatrix[this.mapLine[line][j]] || arrMatrix[this.mapLine[line][j]] == 1)
                                    arrLine.push(this.mapLine[line][j]);
                            }
                        }
                    if(arrLine.length >= 3 )
                    {
                        if(arrLine.length == 3 && (arrMatrix[this.mapLine[line][i]] == 5 || arrMatrix[this.mapLine[line][i]] == 6))
                        {
                            arrLine = [];
                        }else
                        {
                            countLine++;
                            if(countLine == indexInLine)
                            {
                                //cc.log(arrLine.toString() + "  item "+ arrMatrix[this.mapLine[line][i]]);
                                break;
                            }else
                            {
                                arrItem.push(arrMatrix[this.mapLine[line][i]]);
                                arrLine = [];
                            }
                        }

                        // //cc.log("sua lai " +arrLine.length )

                    }
                    else
                    {
                        arrLine = [];
                    }
                }

            }
            for(var i = 0; i<arrLine.length; i++)
            {
                this.effectItemWin(this.arrItemMatrix[arrLine[i]]);
            }



        },

        effectItemWin:function(view)
        {
            view.setScale(1);
            view.stopAllActions();
            view.runAction(cc.sequence(cc.callFunc(function(){
                view.setVisible(true);
            }),cc.delayTime(0.8),cc.callFunc(function(){
                view.setVisible(false);
            })));


        },


        showEffectDone:function()
        {
            if(this.resultSlot.result == 2)
            {
                this.showActionThangLon();
                this.updateCurrentMoney();
            }else
            if(this.resultSlot.result == 3)
            {
                this.showActionNoHu();
                this.updateCurrentMoney();
            }else
            if(this.resultSlot.result == 5)
            {
                this.showBanDoKhoBau();
                this.isPlayMinigame = true;
                this.btn_ban_do.runAction(cc.sequence(cc.delayTime(8),cc.callFunc(function(){
                    if(slotKhoBau.waitingKhoBau == true)
                    {
                        slotKhoBau.waitingKhoBau = false;
                        slotKhoBau.pEndBanDo.setVisible(false);
                        slotKhoBau.isPlayMinigame = false;
                        slotKhoBau.pEndBanDo.setVisible(false);
                        slotKhoBau.lb_prize.setString(formatMoney(0,3,slotKhoBau.resultSlot.prize));
                        slotKhoBau.resultHaiSao = 0;
                        slotKhoBau.giaTriNhan = 1;
                        slotKhoBau.soLuotChuaMo = 10;
                        slotKhoBau.soLanMo = 0;
                        slotKhoBau.updateCurrentMoney();
                        slotKhoBau.hidePlayBanDo();
                        slotKhoBau.hideStartBanDo();
                        slotKhoBau.hideBanDoMayMan();
                        slotKhoBau.hideBanDoKhoBau();

                    }
                })));
            }else
            {
                this.updateCurrentMoney();
                if(this.resultSlot.prize>0)
                {
                    this.audioKhoBau.soundEffectKhoBau(this.audioKhoBau.resultGiaiThuong);
                }
            }
        },

        resetPositionItem:function()
        {
            var khoangCach = 169;
            var viTriDauY = 84.5;
            var viTriDauX = 98.5;
            if(this["spItem10"].y > this["spItem1" + (this.totalItemColum-1).toString()].y)
            {
                for(var i=1;i<6;i++)
                {
                    for(var j = 0; j < this.totalItemColum; j++)
                    {
                        this["spItem"+ i.toString() + j.toString()].stopAllActions();
                            this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                    }
                }
            }else
            {
                if(this["spItem10"].y!=viTriDauY)
                {
                    for(var i=1;i<6;i++)
                    {
                        for(var j = 0; j < this.totalItemColum; j++)
                        {
                            this["spItem"+ i.toString() + j.toString()].stopAllActions();
                            if(j > 2 && j < this.totalItemColum - 3)
                                this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                            else if(j<3)
                            {
                                this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*(j+(this.totalItemColum-3))));
                            }else
                            {
                                this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*(j-(this.totalItemColum-3))));
                            }
                        }

                    }
                }


            }
        },



        toastSlot: function(message,timeShow, colorLable)
        {
            var wbg = this.pSlotKhoBau.getContentSize().width;
            if(this.pSlotKhoBau.getChildByTag(999)!=null)
            {
                this.pSlotKhoBau.getChildByTag(999).stopAllActions();
                this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).stopAllActions();

                this.pSlotKhoBau.getChildByTag(999).setOpacity(90);
                this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).setOpacity(255);
                this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).setString(message);
                if(colorLable!=null)
                {
                    this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).color = colorLable;
                }else
                {
                    this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).color = cc.color(255, 255, 255);
                }
                var fadeOut = cc.fadeOut(2);
                var fadeIn = cc.fadeIn(0.5);
                var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut);
                this.pSlotKhoBau.getChildByTag(999).runAction(seq);
                this.pSlotKhoBau.getChildByTag(999).getChildByTag(10).runAction(seq.clone());

            }else
            {
                var layer = new cc.Sprite("res/Minigame/ImageChung/bg_mo.png");
                layer.setOpacity(90);
                layer.setName("tostTaiXiu");
                layer.setTag(999);
                var label1 = new cc.LabelTTF(message, "Arial", 28);
                label1.setTag(10);
                layer.addChild(label1);
                var w = layer.getContentSize().width;
                //layer.setContentSize(cc.size(w + 10,40))
                layer.setPosition(wbg/2,360);
                if(colorLable!=null)
                {
                    label1.color = colorLable;
                }else
                {
                    label1.color = cc.color(255, 255, 255);
                }
                //label1.color = cc.color(241, 224, 99);
                label1.x = w/2;
                label1.y = 20;
                //label1.opacity = 0;
                var fadeOut = cc.fadeOut(2);
                var fadeIn = cc.fadeIn(0.5);
                var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut);

                this.pSlotKhoBau.addChild(layer, 999);
                //var forever = seq.repeatForever();
                layer.runAction(seq);
                label1.runAction(seq.clone());
            }
            //var layer = new cc.LayerColor(cc.color(245, 170, 8));
        },
        changeRoom:function(currentRoom,joindRoom)
        {
            var sendPkm = new KhoBauCmdSendChangeRoom();
            sendPkm.putCmd(currentRoom,joindRoom);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        play:function(betValue,lines)
        {
            var sendPkm = new KhoBauCmdSendPlay();
            sendPkm.putCmd(betValue,lines);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        autoPlay:function(lines)
        {
            var sendPkm = new KhoBauCmdSendAutoPlay();
            sendPkm.putCmd(lines);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        stopAutoPlay:function()
        {
            var sendPkm = new KhoBauCmdSendStopAutoPlay();
            sendPkm.putCmd();
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        minimize:function(roomId)
        {
            var sendKb = new KhoBauCmdSendMinimize();
            sendKb.putCmd(roomId);
            lobby.socketSlot.send(sendKb);
            sendKb.clean();
        },

        callBackError: function(response)
        {
            //slotKhoBau.hideLoading();
        }
        ,
        showLoading : function(view){
            if(view.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = view.getContentSize().width/2;
                var y = view.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                view.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                view.getChildByName("loadingdatamaster").setVisible(true);
            }
        },

        hideLoading : function (view){
            //this.panelLichSuMiniPoker.getChildByName("loadingdata").stopAllActions();
            if(view.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                view.getChildByName("loadingdatamaster").setVisible(false);
            }

        },
        initFreeDaiLy:function()
        {
            var wbg = this.pMenu.getContentSize().width;
            var  fonts = fontRobotoBlack;
            var fontSize = 36;

            this.sp_bg_text_luot_quay_dai_ly = cc.Sprite.create("res/Minigame/ImageChung/bg_thong_bao.png",cc.rect(0,0,551,67));
            this.lb_free_dai_ly = new cc.LabelTTF('',  fonts.fontName, fontSize, this.sp_bg_text_luot_quay_dai_ly.getContentSize(), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            this.sp_bg_text_luot_quay_dai_ly.addChild(this.lb_free_dai_ly);
            this.sp_bg_text_luot_quay_dai_ly.setPosition(wbg/2,260);
            this.lb_free_dai_ly.x = 275;
            this.lb_free_dai_ly.y = 33;
            this.lb_free_dai_ly.setColor(cc.color.YELLOW);

            this.pMenu.addChild(this.sp_bg_text_luot_quay_dai_ly);
            this.sp_bg_text_luot_quay_dai_ly.setVisible(false);

        },
        showFreeDaiLy:function(remain)
        {
            if(remain > 0)
            {
                this.isFreeDaiLy = true;
                this.lb_free_dai_ly.setString("Bạn còn " + remain + " lượt quay hằng ngày");
                this.sp_bg_text_luot_quay_dai_ly.setVisible(true);
            }else
            {
                if(this.sp_bg_text_luot_quay_dai_ly.isVisible())
                {
                    this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                }
                this.isFreeDaiLy = false;
            }
        },


        showTopUser:function()
        {
            if(this.isShowVinhDanh)
            {
                this.img_ls_giao_dich.setVisible(false);
                this.lv_lich_su_giao_dich.setVisible(false);
                this.img_ls_trung_hu.setVisible(false);
                this.lv_lich_su_trung_hu.setVisible(false);
                this.pControl.setVisible(false);
                this.lv_vinh_danh.setVisible(true);
                this.btn_lsgd.setColor(cc.color.WHITE);
                this.btn_ls_trung_hu.setColor(cc.color.WHITE);
                this.btn_vinh_danh.setColor(cc.color.YELLOW);
            }else
            if(this.isShowTopUser)
            {
                this.lv_vinh_danh.setVisible(false);
                this.img_ls_giao_dich.setVisible(false);
                this.lv_lich_su_giao_dich.setVisible(false);
                this.img_ls_trung_hu.setVisible(true);
                this.lv_lich_su_trung_hu.setVisible(true);
                this.pControl.setVisible(true);
                this.btn_lsgd.setColor(cc.color.WHITE);
                this.btn_ls_trung_hu.setColor(cc.color.YELLOW);
                this.btn_vinh_danh.setColor(cc.color.WHITE);
                //this.lb_page.setString(this.currentPageTopUser);
                this.parserDataTopUser();
            }else
            {
                this.lv_vinh_danh.setVisible(false);
                this.img_ls_giao_dich.setVisible(true);
                this.lv_lich_su_giao_dich.setVisible(true);
                this.img_ls_trung_hu.setVisible(false);
                this.lv_lich_su_trung_hu.setVisible(false);
                this.pControl.setVisible(true);
                this.btn_lsgd.setColor(cc.color.YELLOW);
                this.btn_ls_trung_hu.setColor(cc.color.WHITE);
                this.btn_vinh_danh.setColor(cc.color.WHITE);
                //this.lb_page.setString(this.currentPageTopUser);
                this.parserDataLsgd();
            }
        },
        getlinkAvatar : function (value){
            for(var i = 0; i < 12; i ++){
                if(value == i) {
                    return "res/common/avatar/Avatar_" + (i + 1) + ".png";
                }
            }
        },


    }
);

openSlotKhoBau = function () {

    if (slotKhoBau === null) {
       // //cc.log("----> Create mini game layer first time");
        slotKhoBau = new SlotKhoBauLayer();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(slotKhoBau, BaseScene.INDEX_GAME_GUI, 10);
        khoBauSubcribe(Slots.Content.currentRoom);
    }else
    {
        slotKhoBau.setVisible(true);
        khoBauSubcribe(Slots.Content.currentRoom);
    }
    if(menutab)
        menutab.hideAllInfo();
    slotKhoBauAppear = true;
    slotKhoBau.audioKhoBau.playSoundBackGround();


};
closeSlotKhoBau = function () {
    if (slotKhoBau === null) {
        return;
    }
    if(slotKhoBauAppear) {
        //slotKhoBau.setVisible(false);
        closeKhoBauLSGD(true);
        closeKhoBauBangThuong(true);
        closeKhoBauHuongDan(true);
        closeKhoBauTopUser(true);
        slotKhoBau.setVisible(false);
        slotKhoBauAppear = false;

	    slotKhoBau.audioKhoBau.stopAllSound();

        menutab.showAllInfoSlots();
        lobby.socketSlot.sendSubScribe();
        cc.eventManager.removeListener(slotKhoBau.customlistener);
        slotKhoBau.loadFromContent();
        slotKhoBau.removeAllChildren(true);
        slotKhoBau.removeFromParent(true);
        slotKhoBau = null;

    }

};


khoBauSubcribe = function(roomId)
{
    var sendPkm = new KhoBauCmdSendSubcribe();
    sendPkm.putCmd(roomId);
    lobby.socketSlot.send(sendPkm);
    sendPkm.clean();

}
khoBauUnsubscribe = function(roomId)
{
    var sendKb = new KhoBauCmdSendUnsubcribe();
    sendKb.putCmd(roomId);
    lobby.socketSlot.send(sendKb);
    sendKb.clean();
    if(slotKhoBau!= null)
        slotKhoBau.isAutoRotate = false;
    Slots.Content.isAutoRotate = false;
    //this.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
},



SlotKhoBauLayer.BTN_TU_QUAY = 1;
SlotKhoBauLayer.BTN_QUAY = 2;
SlotKhoBauLayer.BTN_DUNG_QUAY = 3;


SlotKhoBauLayer.BTN_BACK_MUC_DAT = 4;
SlotKhoBauLayer.BTN_NEXT_MUC_DAT = 5;

SlotKhoBauLayer.BTN_DONG_CHAN = 6;
SlotKhoBauLayer.BTN_DONG_LE = 7;
SlotKhoBauLayer.BTN_CHON_HET = 8;
SlotKhoBauLayer.BTN_CHON_LAI = 9;

SlotKhoBauLayer.BTN_LSGD = 10;
SlotKhoBauLayer.BTN_LS_TRUNG_HU = 11;
SlotKhoBauLayer.BTN_VINH_DANH = 20;
SlotKhoBauLayer.BTN_BACK_ALL = 12;
SlotKhoBauLayer.BTN_BACK = 13;
SlotKhoBauLayer.BTN_NEXT_ALL = 14;
SlotKhoBauLayer.BTN_NEXT = 15;

SlotKhoBauLayer.BTN_BAN_DO = 16;
SlotKhoBauLayer.BTN_THOAT_BAN_DO = 17;
SlotKhoBauLayer.BTN_CHOI_THU = 18;
SlotKhoBauLayer.BTN_BACK_LOBBY = 19;

SlotKhoBauLayer.BTN_BANG_THUONG = 21;
SlotKhoBauLayer.BTN_DONG = 22;
SlotKhoBauLayer.BTN_MUC_CUOC = 23;
SlotKhoBauLayer.BTN_AN = 24;
SlotKhoBauLayer.BTN_TOP_NO_HU = 25;
SlotKhoBauLayer.BTN_LICH_SU = 26;
SlotKhoBauLayer.BTN_CLOSE_BANG_THUONG = 27;
SlotKhoBauLayer.BTN_CLOSE_CHON_DONG = 28;

SlotKhoBauLayer.BTN_SETTING = 30;
SlotKhoBauLayer.BTN_AM_THANH = 31;
SlotKhoBauLayer.BTN_NHAC_NEN = 32;
SlotKhoBauLayer.BTN_X2_QUY_THUONG = 33;



SlotKhoBauLayer.BET_VALUE_ROOM1 = 100;
SlotKhoBauLayer.BET_VALUE_ROOM2 = 1000;
SlotKhoBauLayer.BET_VALUE_ROOM3 = 10000;

SlotKhoBauLayer.ROOM1 = 0;
SlotKhoBauLayer.ROOM2 = 1;
SlotKhoBauLayer.ROOM3 = 2;
