/**
 * Created by Admin on 10/19/2016.
 */
//var Slots = {};

var avenger = null;
var avengerAppear = false;
Avenger.Content = {
    arrLineSelect:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    isAutoRotate:false,
    currentRoom:0,
    betValue:100
}
var AvengerLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super("avenger");
            this.initWithBinaryFile("res/Avenger.json");
            //lobby.userInfo = null;
            //lobby.appConfig = null;
            this.startColumY = 138;
            this.soDong = 25;
            this.waitingKhoBau = false;
            this.free = 0;
            this.totalMoneyChoiThu = 10000000;
            this.isChoiThu = false;
            this.isBackToLobby = false;
            this.totalItemColum = 15;
            this.lineSelected = 1;
            this.betValue = AvengerLayer.BET_VALUE_ROOM1;
            this.currentRoom = AvengerLayer.ROOM1;
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
            this.arrWildFree = [];
            this.arrIndexLine = [21,3,9,15,22,11,1,7,17,14,2,8,20,25,5,13,19,10,16,23,6,24,12,4,18];
            this.mapPositionLine = [];
            this.mapLine = [
                [ 5, 6, 7, 8, 9],//1
                [ 0, 1, 2, 3, 4],//2
                [10,11,12,13,14],//3
                [ 0, 6,12, 8, 4],//4
                [10, 6, 2, 8,14],//5
                [ 5, 1, 2, 3, 9],//6
                [ 5,11,12,13, 9],//7
                [ 0, 1, 7,13,14],//8
                [10,11, 7, 3, 4],//9
                [ 5,11, 7, 3, 9],//10
                [ 5, 1, 7,13, 9],//11
                [ 0, 6, 7, 8, 4],//12
                [10, 6, 7, 8,14],//13
                [ 0, 6, 2, 8, 4],//14
                [10, 6,12, 8,14],//15
                [ 5, 6, 2, 8, 9],//16
                [ 5, 6,12, 8, 9],//17
                [ 0, 1,12, 3, 4],//18
                [10,11, 2,13,14],//19
                [ 0,11,12,13, 4],//20
                [10, 1, 2, 3,14],//21
                [ 5,11, 2,13, 9],//22
                [ 5, 1,12, 3, 9],//23
                [ 0,11, 2,13, 4],//24
                [10, 1,12, 3,14]//25

            ];
            this.resultHaiSao = 0;

            this.arrLsgd = [];
            this.arrTopUser = [];
            this.arrVinhdanh = [];
            this.objLsgd = {
                "rf":598,
                "un":"phamCanh",
                "bv":100,
                "lb":"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25",
                "lw":"1,10,12,14,15,16,18",
                "pz":4100,
                "ps":"300,400,300,400,300,2000,400",
                "ts":"20:51:46 28-10-2016"
            };
            this.resultSlot = {
                ref: 1618702,
                result: 0,
                matrix: "5,6,5,3,0,2,4,2,8,3,5,6,4,6,8",
                linesWin: "",
                khoBau: "",
                prize: 0,
                currentMoney: 9883889209033,
                freeSpin: 0,
                isFree: false,
                itemsWild: "",
                ratio:0
            };
            this.currentPageTopUser = 1;
            this.currentPageLsgd = 1;
            this.totalPage = 100;
            this.isShowTopUser = false;
            this.isShowVinhDanh = true;


            this.arrLineSelect = [];
            this.pAvenger = null;
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
            this.sp_num1 = null;
            this.sp_num2 = null;
            this.sp_num3 = null;
            this.sp_num4 = null;
            this.sp_num5 = null;
            this.sp_num6 = null;
            this.sp_num7 = null;
            this.sp_num8 = null;
            this.sp_num9 = null;
            this.sp_num10 = null;
            this.sp_num11 = null;
            this.sp_num12 = null;
            this.sp_num13 = null;
            this.sp_num14 = null;
            this.sp_num15 = null;
            this.sp_num16 = null;
            this.sp_num17 = null;
            this.sp_num18 = null;
            this.sp_num19 = null;
            this.sp_num20 = null;
            this.sp_num21 = null;
            this.sp_num22 = null;
            this.sp_num23 = null;
            this.sp_num24 = null;
            this.sp_num25 = null;

            this.sp_wild2 = null;
            this.sp_wild3 = null;
            this.sp_wild4 = null;

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
            this.sp_girl = null;

            this.pMenu = null;
            //this.lb_nick_name = null;
            //this.sp_avatar = null;
            this.lb_prize_show = null;
            this.lb_prize = null;
            this.lb_total_money = null;
            this.lb_nick_name = null;
            this.lb_so_dong = null;
            this.btn_tu_quay = null;
            this.btn_quay = null;
            //this.btn_dung_quay = null;
            this.lb_tong_dat = null;
            this.lb_muc_dat = null;
            this.btn_x2_quy_thuong = null;
            this.lb_date_x2 = null;
            this.sp_quy_thuong = null;
            //this.btn_back_muc_dat = null;
            //this.btn_next_muc_dat = null;

            this.btn_bang_thuong = null;
            this.btn_dong = null;
            this.btn_muc_cuoc = null;
            //this.btn_huong_dan = null;
            this.btn_top_no_hu = null;
            this.btn_lich_su = null;
            this.lb_hu = null;
            this.btn_close_chon_dong = null;
            this.sp_bg_text_luot_quay_mien_phi = null;
            this.lb_free_spin = null;
            this.sp_bg_text_luot_quay_dai_ly = null;
            this.lb_free_dai_ly = null;


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
            this.lb_prize_no_hu = null;
            this.sp_set_jackpot = null;

            this.pThangLon = null;
            this.sp_glow_thang_lon = null;
            this.sp_tui_tien = null;
            this.lb_prize_thang_lon = null;
            this.sp_set_thang_lon = null;
            this.btn_an = null;
            this.btn_setting = null;
            this.pn_setting = null;
            this.btn_am_thanh = null;
            this.btn_nhac_nen = null;
            this.sp_off_am_thanh = null;
            this.sp_off_nhac_nen = null;

            this.pStartMienPhi = null;
            this.lb_thong_bao_free = null;

            this.pEndMienPhi = null;
            this.lb_total_free = null;
            this.lb_sum_free = null;
            this.lb_he_so_nhan = null;

            this.waitingNoHu = false;
            this.waitingThangLon = false;
            this.isX2 = false;
            this.prizeFree = 0;
            this.ratioFree = 0;
            this.isWaittingEndFree = false;

           // this.resultSlot.freeSpin = 0;
            this.isFreeInGame = false;
            this.audioAvenger = null;
            this.isFreeDaiLy = false;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistKhungAn.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistWait1.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistWait2.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistWild.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistSetJackpot.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistGlowThangLon.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistTiaSetThangLon.plist");

            this.audioAvenger = new AvengerAudio(true,true);
            //this.audioAvenger.onSoundBackGround();

            this.pAvenger = this._layout.getChildByName("pAvenger");
            //this.getUserInfo();


            this.pItem = this.getControl("pItem",this.pAvenger);
            this.pColum1 = this.getControl("pColum1",this.pItem);
            this.pColum2 = this.getControl("pColum2",this.pItem);
            this.pColum3 = this.getControl("pColum3",this.pItem);
            this.pColum4 = this.getControl("pColum4",this.pItem);
            this.pColum5 = this.getControl("pColum5",this.pItem);

            this.sp_num1 = this.pItem.getChildByName("sp_num1");
            this.sp_num2 = this.pItem.getChildByName("sp_num2");
            this.sp_num3 = this.pItem.getChildByName("sp_num3");
            this.sp_num4 = this.pItem.getChildByName("sp_num4");
            this.sp_num5 = this.pItem.getChildByName("sp_num5");
            this.sp_num6 = this.pItem.getChildByName("sp_num6");
            this.sp_num7 = this.pItem.getChildByName("sp_num7");
            this.sp_num8 = this.pItem.getChildByName("sp_num8");
            this.sp_num9 = this.pItem.getChildByName("sp_num9");
            this.sp_num10 = this.pItem.getChildByName("sp_num10");
            this.sp_num11 = this.pItem.getChildByName("sp_num11");
            this.sp_num12 = this.pItem.getChildByName("sp_num12");
            this.sp_num13 = this.pItem.getChildByName("sp_num13");
            this.sp_num14 = this.pItem.getChildByName("sp_num14");
            this.sp_num15 = this.pItem.getChildByName("sp_num15");
            this.sp_num16 = this.pItem.getChildByName("sp_num16");
            this.sp_num17 = this.pItem.getChildByName("sp_num17");
            this.sp_num18 = this.pItem.getChildByName("sp_num18");
            this.sp_num19 = this.pItem.getChildByName("sp_num19");
            this.sp_num20 = this.pItem.getChildByName("sp_num20");
            this.sp_num21 = this.pItem.getChildByName("sp_num21");
            this.sp_num22 = this.pItem.getChildByName("sp_num22");
            this.sp_num23 = this.pItem.getChildByName("sp_num23");
            this.sp_num24 = this.pItem.getChildByName("sp_num24");
            this.sp_num25 = this.pItem.getChildByName("sp_num25");

            this.sp_wild2 = this.pItem.getChildByName("sp_wild2");
            this.sp_wild3 = this.pItem.getChildByName("sp_wild3");
            this.sp_wild4 = this.pItem.getChildByName("sp_wild4");

            this.sp_wild2.setVisible(false);
            this.sp_wild3.setVisible(false);
            this.sp_wild4.setVisible(false);

            this.initShowLine();
            this.initItem();


            this.pMenu = this.getControl("pMenu",this.pAvenger);
            this.lb_prize =  this.getControl("lb_prize",this.pMenu);
            this.lb_prize_show =  this.getControl("lb_prize_show",this.pMenu);
            this.lb_prize_show.setFontSize(120);
            this.lb_total_money = this.getControl("lb_total_money",this.pMenu);
            this.lb_total_money.setString(formatMoney(0,3,lobby.userInfo.vinTotal));
            this.lb_nick_name = this.getControl("lb_nick_name",this.pMenu);
            this.lb_nick_name.setString(lobby.userInfo.nickname);
            this.btn_choi_thu = this.customButton("btn_choi_thu",AvengerLayer.BTN_CHOI_THU,this.pMenu);
            this.btn_back_lobby = this.customButton("btn_back_lobby",AvengerLayer.BTN_BACK_LOBBY,this.pMenu);
            this.sp_girl = this.pItem.getChildByName("sp_girl");


            this.lb_so_dong = this.getControl("lb_so_dong",this.pMenu);
            this.btn_tu_quay = this.customizeButton("btn_tu_quay",AvengerLayer.BTN_TU_QUAY,this.pMenu);
            this.btn_quay = this.customButton("btn_quay",AvengerLayer.BTN_QUAY,this.pMenu,false);
            this.lb_tong_dat = this.getControl("lb_tong_dat",this.pMenu);
            this.lb_muc_dat = this.getControl("lb_muc_dat",this.pMenu);
            this.btn_x2_quy_thuong = this.customButton("btn_x2_quy_thuong",AvengerLayer.BTN_X2_QUY_THUONG,this.pMenu);
            this.lb_date_x2 = this.getControl("lb_date_x2",this.btn_x2_quy_thuong);
            this.sp_quy_thuong = this.pMenu.getChildByName("sp_quy_thuong");

            this.btn_bang_thuong = this.customButton("btn_bang_thuong",AvengerLayer.BTN_BANG_THUONG,this.pMenu);
            this.btn_dong = this.customButton("btn_dong",AvengerLayer.BTN_DONG,this.pMenu);
            this.btn_muc_cuoc = this.customButton("btn_muc_cuoc",AvengerLayer.BTN_MUC_CUOC,this.pMenu);
            //this.btn_huong_dan = this.customButton("btn_huong_dan",AvengerLayer.BTN_HUONG_DAN,this.pMenu);
            this.btn_top_no_hu = this.customButton("btn_top_no_hu",AvengerLayer.BTN_TOP_NO_HU,this.pMenu);
            this.btn_lich_su = this.customButton("btn_lich_su",AvengerLayer.BTN_LICH_SU,this.pMenu);


            this.lb_hu = this.getControl("lb_hu",this.pMenu);
            this.sp_bg_text_luot_quay_mien_phi = this.pMenu.getChildByName("sp_bg_text_luot_quay_mien_phi");
            this.lb_free_spin = this.getControl("lb_free_spin",this.pMenu);

            this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
            this.lb_free_spin.setVisible(false);



            this.pChonDong= this.getControl("pChonDong",this.pAvenger);
            this.btn_dong_chan = this.customButton("btn_dong_chan",AvengerLayer.BTN_DONG_CHAN,this.pChonDong);
            this.btn_dong_le = this.customButton("btn_dong_le",AvengerLayer.BTN_DONG_LE,this.pChonDong);
            this.btn_chon_het = this.customButton("btn_chon_het",AvengerLayer.BTN_CHON_HET,this.pChonDong);
            this.btn_chon_lai = this.customButton("btn_chon_lai",AvengerLayer.BTN_CHON_LAI,this.pChonDong);
            this.btn_close_chon_dong = this.customButton("btn_close_chon_dong",AvengerLayer.BTN_CLOSE_CHON_DONG,this.pChonDong);
            this.initChonDong();


            this.pStartMienPhi = this.getControl("pStartMienPhi",this.pAvenger);
            this.pStartMienPhi.setVisible(false);
            this.lb_thong_bao_free = this.getControl("lb_thong_bao_free",this.pStartMienPhi);

            this.pEndMienPhi = this.getControl("pEndMienPhi",this.pAvenger);
            this.pEndMienPhi.setVisible(false);
            this.lb_total_free = this.getControl("lb_total_free",this.pEndMienPhi);
            this.lb_sum_free = this.getControl("lb_sum_free",this.pEndMienPhi);
            this.lb_he_so_nhan = this.getControl("lb_he_so_nhan",this.pEndMienPhi);

            this.setTextChangeLine();
            this.initNoHu();
            this.initThangLon();
            //this.initBanDoKhoBau();

            var that = this;

            this.customlistener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "updateMoney",
                callback: function(event){

                    if(avenger!=null && !avenger.isChoiThu && !avenger.isRotate && !avenger.isPlayMinigame)
                    that.updateMoney(event);
                }
            });
            cc.eventManager.addListener(this.customlistener, 1);
            userGameData.setItem("key_open_slots", -1);
            this.initPositionIndexLine();
                this.sp_luot_mien_phi = this.pMenu.getChildByName("sp_luot_mien_phi");
                this.lb_so_luot_mien_phi = this.getControl("lb_so_luot_mien_phi",this.sp_luot_mien_phi );

            this.btn_an = this.customButton("btn_an",AvengerLayer.BTN_AN,this.pMenu,false);
            this.btn_setting = this.customButton("btn_setting",AvengerLayer.BTN_SETTING,this.pMenu,false);
            this.pn_setting = this.getControl("pn_setting",this.pAvenger);
            this.pn_setting.setVisible(false);
            this.btn_am_thanh = this.customButton("btn_am_thanh",AvengerLayer.BTN_AM_THANH,this.pn_setting,false);
            this.btn_nhac_nen = this.customButton("btn_nhac_nen",AvengerLayer.BTN_NHAC_NEN,this.pn_setting,false);
            this.sp_off_am_thanh = this.pn_setting.getChildByName("sp_off_am_thanh");
            this.sp_off_am_thanh.setVisible(false);
            this.sp_off_nhac_nen = this.pn_setting.getChildByName("sp_off_nhac_nen");
            this.sp_off_nhac_nen.setVisible(false);

            this.initFreeDaiLy();

            openPopUp();


            this.actionGirl();

            //openAvengerMinigame();
            //avengerMinigame.setData("100000,200000,300000,400000,4,5");
            this.loadContent();
        },
        loadContent:function()
        {
            for(var i = 1; i<=20; i++)
            {
                this.btnSelectLine(i,false);
            }
            for(var i = 0; i<Avenger.Content.arrLineSelect.length; i++)
            {
                this.btnSelectLine(Avenger.Content.arrLineSelect[i],true);
            }
            this.currentRoom = Avenger.Content.currentRoom;
            this.betValue = Avenger.Content.betValue;
            this.isAutoRotate = Avenger.Content.isAutoRotate;
            if(this.isAutoRotate)
            {
                this.btn_quay.setBright(false);
                this.btn_tu_quay.setBright(false);
                this.btn_tu_quay.loadTextures("res/Avenger/btn_dungquay.png","res/Avenger/btn_dungquay_s.png","res/Avenger/btn_dungquay_s.png");
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
            Avenger.Content.arrLineSelect = arrSelectLine;
            Avenger.Content.currentRoom = this.currentRoom;
            Avenger.Content.isAutoRotate = this.isAutoRotate;
            Avenger.Content.betValue = this.betValue;
        },
        connectSocket:function()
        {
            showLoading();
            //gameData.setGameType(type);
            GameManager.getInstance().connectToGameServer();
        },

        actionGirl:function()
        {
            var animFrames = [];
            var str = "";

            for (var i = 0; i < 15; i++) {
                str = "Avenger/item/wait/wait01/Wait_"+i+".png";
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.04, 1);
            var animate   = cc.Animate.create(animation);

            var animFrames2 = [];
            var str2 = "";

            for (var i = 1; i < 16; i++) {
                str = "Avenger/item/wait/wait02/Wait_"+i+".png";
                var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame2 = new cc.AnimationFrame();
                animFrame2.initWithSpriteFrame(spriteFrame2, 1, null);
                animFrames2.push(animFrame2);
            }
            var animation2 = cc.Animation.create(animFrames2, 0.04, 1);
            var animate2   = cc.Animate.create(animation2);

            this.sp_girl.runAction(cc.repeatForever(cc.sequence(cc.repeat(animate,10),animate2)));
        },
        hideShowLineShow:function(index)
        {
            for(var i = 0; i<this.soDong; i++)
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
            if(this.pn_setting.isVisible() && id != AvengerLayer.BTN_AM_THANH && id != AvengerLayer.BTN_NHAC_NEN && id != AvengerLayer.BTN_SETTING)
            {
                this.pn_setting.setVisible(false);
            }
            this.audioAvenger.soundEffect(this.audioAvenger.button);
            switch (id) {
                case AvengerLayer.BTN_TU_QUAY:
                    //if(this.checkDonePlay())
                    //{if(this.isFreeInGame || this.resultSlot.isFree)

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
                                    this.btn_tu_quay.loadTextures("res/Avenger/btn_dungquay.png","res/Avenger/btn_dungquay_s.png","res/Avenger/btn_dungquay_s.png");
                                }

                            }else{
                                this.isAutoRotate = false;
                                this.stopAutoPlay();
                                //this.btn_quay.setBright(true);
                                //this.btn_tu_quay.setBright(true);
                                this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
                            }

                        }


                    }

                    //}

                    break;
                case AvengerLayer.BTN_X2_QUY_THUONG:
                    openAvengerTheLeX2();
                    break;
                case AvengerLayer.BTN_QUAY:
                    if(this.checkDonePlay())
                    {
                        //if(this.waitingKhoBau == false)
                        this.startPlay();
                    }

                    break;
                case AvengerLayer.BTN_DONG_CHAN:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                        this.selectLineChan();
                    break;
                case AvengerLayer.BTN_DONG_LE:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                        this.selectLineLe();
                    break;
                case AvengerLayer.BTN_CHON_HET:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                        this.selectLineAll();
                    break;
                case AvengerLayer.BTN_CHON_LAI:
                    if(this.isChoiThu)
                    {
                        this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                    }else
                    if(this.checkDonePlay())
                        this.chonLai();
                    break;
                case AvengerLayer.BTN_LSGD:
                    this.isShowVinhDanh = false;
                    this.isShowTopUser = false;
                    this.showTopUser();
                    break;
                case AvengerLayer.BTN_LS_TRUNG_HU:
                    this.isShowVinhDanh = false;
                    this.isShowTopUser = true;
                    this.showTopUser();

                    break;
                case AvengerLayer.BTN_VINH_DANH:
                    this.isShowVinhDanh = true;
                    this.showTopUser();
                    break;
                case AvengerLayer.BTN_BACK_ALL:
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

                    break;
                case AvengerLayer.BTN_BACK:

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
                case AvengerLayer.BTN_NEXT_ALL:
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
                case AvengerLayer.BTN_NEXT:

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
                case AvengerLayer.BTN_BAN_DO:
                    this.hideStartBanDo();
                    this.showPlayBanDo();
                    this.btn_ban_do.stopAllActions();
                    if(this.waitingKhoBau)
                    {
                        // this.waitingKhoBau = false;
                        this.stopAutoPlay();
                        this.isAutoRotate = false;
                        this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
                        if(!this.isRotate)
                        {
                            this.btn_quay.setBright(true);
                            this.btn_tu_quay.setBright(true);
                        }
                    }


                    break;
                case AvengerLayer.BTN_THOAT_BAN_DO:
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
                            if(avenger.isAutoRotate == false)
                            {
                                avenger.isAutoRotate = true;
                                avenger.autoPlay(avenger.getArrayLineSelected());

                                avenger.btn_quay.setBright(false);
                                avenger.btn_tu_quay.setBright(false);
                                avenger.btn_tu_quay.loadTextures("res/Avenger/btn_dungquay.png","res/Avenger/btn_dungquay_s.png","res/Avenger/btn_dungquay_s.png");
                            }

                        })));
                    }
                    break;
                case AvengerLayer.BTN_CHOI_THU:
                    if(this.checkDonePlay())
                    {
                        if(this.resultSlot.freeSpin > 0)
                        {
                            this.toastSlot("Bạn còn lượt quay miễn phí");
                        }else
                        if(!this.isChoiThu)
                        {
                            this.loadChoiThu()

                        }
                        else
                        {
                            this.loadChoiThat();
                        }
                    }

                    break;
                case AvengerLayer.BTN_BACK_LOBBY:
                    this.isBackToLobby = true;
                    avengerUnsubscribe(this.currentRoom)
                    //this.setVisible(false);
                    closeAvenger();
                    //gameWsClient.disconnect();
                    break;
                case AvengerLayer.BTN_AN:
                    this.minimize(this.currentRoom);
                    closeAvenger();
                    break;

                case AvengerLayer.BTN_BANG_THUONG:
                    openAvengerBangThuong();
                    break;
                case AvengerLayer.BTN_DONG:
                    if(this.resultSlot.freeSpin > 0)
                    {
                        this.toastSlot("Bạn còn lượt quay miễn phí");
                    }else
                    {
                        this.pChonDong.setVisible(true);
                    }

                    break;
                case AvengerLayer.BTN_MUC_CUOC:
                    if(this.resultSlot.freeSpin > 0)
                    {
                        this.toastSlot("Bạn còn lượt quay miễn phí");
                    }else
                    if(this.checkDonePlay()) {
                        this.isChangeRoom = true;
                        if(this.currentRoom == AvengerLayer.ROOM2)
                        {
                            this.currentRoom = AvengerLayer.ROOM3;
                            this.betValue = AvengerLayer.BET_VALUE_ROOM3;
                            this.setTextChangeLine();
                            this.changeRoom(AvengerLayer.ROOM2,AvengerLayer.ROOM3);
                        }else if(this.currentRoom == AvengerLayer.ROOM1)
                        {
                            this.currentRoom = AvengerLayer.ROOM2;
                            this.betValue = AvengerLayer.BET_VALUE_ROOM2;
                            this.setTextChangeLine();
                            this.changeRoom(AvengerLayer.ROOM1,AvengerLayer.ROOM2);
                        }else if(this.currentRoom == AvengerLayer.ROOM3)
                        {
                            this.currentRoom = AvengerLayer.ROOM1;
                            this.betValue = AvengerLayer.BET_VALUE_ROOM1;
                            this.setTextChangeLine();
                            this.changeRoom(AvengerLayer.ROOM3,AvengerLayer.ROOM1);
                        }
                        if(this.sp_bg_text_luot_quay_dai_ly.isVisible())
                        {
                            this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                        }
                        this.isFreeDaiLy = false;
                    }
                    break;
                //case AvengerLayer.BTN_HUONG_DAN:
                //    openKhoBauHuongDan();
                //    break;
                case AvengerLayer.BTN_TOP_NO_HU:
                    openAvengerTopUser();
                    break;
                case AvengerLayer.BTN_LICH_SU:
                    openAvengerLSGD();
                    break;
                    //case AvengerLayer.BTN_CLOSE_BANG_THUONG:
                    //    //this.pBangThuong.setVisible(false);
                    //    openKhoBauBangThuong();
                    break;
                case AvengerLayer.BTN_CLOSE_CHON_DONG:
                    this.pChonDong.setVisible(false);
                    break;
                case AvengerLayer.BTN_SETTING:
                    if(this.pn_setting.isVisible())
                    {
                        this.pn_setting.setVisible(false);
                    }else
                    {
                        this.pn_setting.setVisible(true);
                    }
                    break;

                case AvengerLayer.BTN_AM_THANH:

                    if(!this.sp_off_am_thanh.isVisible())
                    {
                        this.audioAvenger.offSoundEffect();
                        this.sp_off_am_thanh.setVisible(true);
                    }else
                    {
                        this.audioAvenger.onSoundEffect();
                        this.sp_off_am_thanh.setVisible(false);
                    }
                    break;
                case AvengerLayer.BTN_NHAC_NEN:
                    if(!this.sp_off_nhac_nen.isVisible())
                    {
                        this.audioAvenger.offSoundBackGround();
                        this.sp_off_nhac_nen.setVisible(true);
                    }else
                    {
                        this.audioAvenger.onSoundBackGround();
                        this.sp_off_nhac_nen.setVisible(false);
                    }
                    break;
            }
        },
        loadChoiThu:function()
        {
            this.isChoiThu = true;
            this.btn_choi_thu.loadTextures("res/Avenger/btn_choithat.png","res/Avenger/btn_choithat.png","res/Avenger/btn_choithat.png");

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
            this.btn_choi_thu.loadTextures("res/Avenger/btn_choithu.png","res/Avenger/btn_choithu.png","res/Avenger/btn_choithu.png");
            this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
            this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
            this.lb_so_dong.setString(this.lineSelected);
            this.lb_total_money.setString(formatMoney(0,3,lobby.userInfo.vinTotal));
            this.totalMoneyChoiThu = 10000000;
            this.lb_prize.setString("0");
            for(var i = 1; i<= 25; i++)
            {
                if(this["btnLine"+i].isSelectLine)
                {
                    this["btnLine"+i].loadTextures("res/Avenger/number/"+i+"_1.png","res/Avenger/number/"+i+"_1.png","res/Avenger/number/"+i+"_1.png");
                }else
                {
                    this["btnLine"+i].loadTextures("res/Avenger/number/"+i+".png","res/Avenger/number/"+i+".png","res/Avenger/number/"+i+".png");
                }

            }
        },
        updateMoney: function(event){
            cc.log("sua xem");
            if(this.lb_total_money == null || this.isChoiThu){
                return;
            }
            if(event.moneyType == MONEY_VIN)
            {
                cc.log("a1");
                cc.log("currentMoney " + event.currentMoney);
                this.lb_total_money.setString(formatMoney(0,3,event.currentMoney));
                cc.log("a2");
            }

        },
        //showBanDoKhoBau:function()
        //{
        //    this.pBanDoKhoBau.setVisible(true);
        //    this.showStartBanDo();
        //},
        //initBanDoKhoBau:function()
        //{
        //    var widthFramePlay = 1260;
        //    var heightFramePlay = 440;
        //    var startPositionPlay = cc.p(110,460);
        //    var khoangCanhText = 52;
        //    var khoangCachX = 118;
        //    var khoangCachY = 140;
        //    for(var i = 0; i<30; i++)
        //    {
        //        this["btnSelectPlay" + i] = new ccui.Button();
        //        this["btnSelectPlay" + i].loadTextures("res/Avenger/minigame/item_matup.png","res/Avenger/minigame/item_matup.png","res/Avenger/minigame/item_matup.png");
        //        this["btnSelectPlay" + i].setPosition(cc.p(startPositionPlay.x + (i%10)*khoangCachX,startPositionPlay.y - parseInt(i/10)*khoangCachY));
        //        this["btnSelectPlay" + i].setTag(i);
        //        this.pPlayBanDo.addChild(this["btnSelectPlay" + i]);
        //        this["lbSelectPlay" + i] =  new cc.LabelTTF('',  RobotoRegular.fontName, 20, cc.size(94,23), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        //        this["lbSelectPlay" + i].setPosition(cc.p(startPositionPlay.x + (i%10)*khoangCachX + 10,startPositionPlay.y - parseInt(i/10)*khoangCachY - khoangCanhText));
        //        this["lbSelectPlay" + i].setTag(i+30);
        //        this["lbSelectPlay" + i].setColor(cc.color(144,238,144));
        //        this.pPlayBanDo.addChild(this["lbSelectPlay" + i]);
        //
        //        this["btnSelectPlay" + i].addTouchEventListener(function(sender,type){
        //            switch (type){
        //                case ccui.Widget.TOUCH_ENDED:
        //                    if(!avenger.isShowMayMan)
        //                    {
        //                        sender.setEnabled(false);
        //                        avenger.selectPlayBanDo(sender);
        //                    }
        //                    break;
        //            }
        //
        //        },this);
        //
        //
        //    }
        //    this.initGiaMayMan();
        //    this.hidePlayBanDo();
        //    this.hideStartBanDo();
        //    this.hideBanDoMayMan();
        //    this.hideBanDoKhoBau();
        //    this.pEndBanDo.setVisible(false);
        //
        //},
        //hideStartBanDo:function()
        //{
        //    this.pStartBanDo.setVisible(false);
        //   // this.sp_sang_vang_ban_do.stopAllActions();
        //   // this.sp_sao_ban_do.stopAllActions();
        //
        //},
        //showStartBanDo:function()
        //{
        //    this.pStartBanDo.setVisible(true);
        //    //this.sp_sang_vang_ban_do.runAction(cc.repeatForever(cc.rotateBy(5,360)));
        //   // this.sp_sao_ban_do.runAction(cc.repeatForever(cc.rotateBy(10,360)));
        //},
        //hideBanDoKhoBau:function()
        //{
        //    this.pBanDoKhoBau.setVisible(false);
        //    this.hidePlayBanDo();
        //},
        //showPlayBanDo:function()
        //{
        //    this.pPlayBanDo.setVisible(true);
        //},
        //hidePlayBanDo:function()
        //{
        //    this.pPlayBanDo.setVisible(false);
        //    for(var i = 0; i<30; i++)
        //    {
        //        this["btnSelectPlay" + i].loadTextures("res/Avenger/minigame/item_matup.png","res/Avenger/minigame/item_matup.png","res/Avenger/minigame/item_matup.png");
        //        this["btnSelectPlay" + i].setEnabled(true);
        //        this["lbSelectPlay" + i].setString("");
        //
        //    }
        //},
        //
        //selectPlayBanDo:function(sender)
        //{
        //    if(this.soLanMo < this.resultSlot.khoBau.split(",").length)
        //    {
        //        var keyGiai = parseInt(this.resultSlot.khoBau.split(",")[this.soLanMo]);
        //
        //        switch (keyGiai)
        //        {
        //            case 1:
        //                sender.loadTextures("res/Avenger/minigame/item_money.png","res/Avenger/minigame/item_money.png","res/Avenger/minigame/item_money.png");
        //                this["lbSelectPlay" + sender.getTag()].setString(formatMoney(0,3,this.giaTriNhan * 4 * this.betValue));
        //                this.resultHaiSao = this.resultHaiSao + this.giaTriNhan * 4 * this.betValue;
        //                this.soLuotChuaMo--;
        //                if(this.soLanMo == this.resultSlot.khoBau.split(",").length-1)
        //                {
        //                    sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
        //                        //show end ban do kho bau
        //                        avenger.pEndBanDo.setVisible(true);
        //                        avenger.lb_tong_tien_ban_do.setString(formatMoney(0,3,avenger.resultHaiSao));
        //                    })));
        //                }
        //                break;
        //            case 0:
        //                sender.loadTextures("res/Avenger/minigame/item_themluot.png","res/Avenger/minigame/item_themluot.png","res/Avenger/minigame/item_themluot.png");
        //                this.giaTriNhan ++;
        //                break;
        //            case 2:
        //            case 3:
        //            case 4:
        //                this.showBanDoMayMan(sender,keyGiai);
        //
        //                this.soLuotChuaMo--;
        //                break;
        //        }
        //        this.soLanMo ++;
        //        this.lb_lan_con_lai.setString(this.soLuotChuaMo);
        //        this.lb_diem_tich_luy.setString("X"+this.giaTriNhan);
        //    }
        //
        //},
        //
        //showBanDoMayMan:function(sender1,keyGiai)
        //{
        //    this.isShowMayMan = true;
        //
        //    sender1.loadTextures("res/Avenger/minigame/item_hutien.png","res/Avenger/minigame/item_hutien.png","res/Avenger/minigame/item_hutien.png");
        //    this.pMayMan.setVisible(true);
        //    for(var i= 0; i< 5; i++)
        //    {
        //        this["btnSelectMayMan" + i].addTouchEventListener(function(sender,type){
        //            switch (type){
        //                case ccui.Widget.TOUCH_ENDED:
        //
        //                    for(var i = 0; i< 5; i ++)
        //                    {
        //                        avenger["btnSelectMayMan" + i].setEnabled(false);
        //                        if(avenger["btnSelectMayMan" + i] == sender)
        //                        {
        //                            this["btnSelectMayMan" + i].loadTextures("res/Avenger/minigame/item_giai_may_man2.png","res/Avenger/minigame/item_giai_may_man2.png","res/Avenger/minigame/item_giai_may_man2.png");
        //                            avenger["lbSelectMayMan" + sender.getTag()].setString(formatMoney(0,3,avenger.genValueFromKey(keyGiai)*avenger.betValue* avenger.giaTriNhan));
        //                            avenger.resultHaiSao = avenger.resultHaiSao + avenger.genValueFromKey(keyGiai)*avenger.betValue* avenger.giaTriNhan;
        //
        //                        }else
        //                        {
        //                            var randomKey = getRandomInt(2,4);
        //                            avenger["lbSelectMayMan" + avenger["btnSelectMayMan" + i].getTag()].setString(formatMoney(0,3,avenger.genValueFromKey(randomKey)*avenger.betValue* avenger.giaTriNhan));
        //
        //                        }
        //                    }
        //
        //                    sender.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
        //                        for(var i = 0; i< 5; i ++) {
        //                            avenger["btnSelectMayMan" + i].setEnabled(true);
        //                        }
        //                        avenger.hideBanDoMayMan();
        //                        avenger["lbSelectPlay" + sender1.getTag()].setString(formatMoney(0,3,avenger.genValueFromKey(keyGiai)*avenger.betValue* avenger.giaTriNhan));
        //                        if(avenger.soLanMo == avenger.resultSlot.khoBau.split(",").length)
        //                        {
        //                            sender.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
        //                                //show end ban do kho bau
        //                                avenger.pEndBanDo.setVisible(true);
        //                                avenger.lb_tong_tien_ban_do.setString(formatMoney(0,3,avenger.resultHaiSao));
        //
        //                            })));
        //                        }
        //                    })));
        //
        //                    break;
        //            }
        //
        //        },this);
        //    }
        //},
        //hideBanDoMayMan: function()
        //{
        //    this.isShowMayMan = false;
        //    this.pMayMan.setVisible(false);
        //    for(var i=0; i< 5; i++)
        //    {
        //        this["btnSelectMayMan" + i].loadTextures("res/Avenger/minigame/item_giai_may_man.png","res/Avenger/minigame/item_giai_may_man.png","res/Avenger/minigame/item_giai_may_man.png");
        //        this["lbSelectMayMan" + i].setString("");
        //    }
        //},
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
            var startX= 90;
            var startY = 193;
            var kcX= 147;
            var kcY = 119;
            var kcText = 46;
            for(var i = 0; i < 5; i++)
            {
                this["btnSelectMayMan" + i] = new ccui.Button();
                this["btnSelectMayMan" + i].loadTextures("res/Avenger/minigame/item_giai_may_man.png","res/Avenger/minigame/item_giai_may_man.png","res/Avenger/minigame/item_giai_may_man.png");
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
            this.pNoHu = this.getControl("pNoHu",this.pAvenger);
            this.sp_bg_sang_vang = this.pNoHu.getChildByName("sp_bg_sang_vang");
            this.sp_duong_vang = this.pNoHu.getChildByName("sp_duong_vang");
            this.lb_prize_no_hu = this.sp_duong_vang.getChildByName("lb_prize_no_hu");
            this.sp_set_jackpot = this.pNoHu.getChildByName("sp_set_jackpot");
            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        return true;
                    }

                    return true;
                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                    //Move the position of current button sprite



                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {
                    var target = event.getCurrentTarget();

                    if(avenger.waitingNoHu == false)
                    {
                        avenger.stopActionNoHu();
                    }
                }
            });
            cc.eventManager.addListener(listener1,  this.pNoHu);

            this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){
                this.stopActionNoHu();
            }.bind(this))));


        },


        stopActionNoHu:function()
        {
            cc.eventManager.pauseTarget(this.pNoHu, true);
            this.pNoHu.setVisible(false);
            this.waitingNoHu = false;
            this.pNoHu.stopAllActions();
            this.sp_bg_sang_vang.stopAllActions();
            this.sp_bg_sang_vang.setScale(0);
            this.sp_set_jackpot.stopAllActions();
            this.sp_duong_vang.stopAllActions();
            this.sp_duong_vang.setScale(0);
        },

        showActionNoHu:function()
        {
            this.audioAvenger.soundEffect(this.audioAvenger.noHu);
            this.waitingNoHu = true;
            this.pNoHu.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
                avenger.waitingNoHu = false;
            })));
            this.pNoHu.setVisible(true);
            cc.eventManager.resumeTarget(this.pNoHu, true);
            avenger.lb_prize_no_hu.setString(formatMoney(0,3,avenger.resultSlot.prize));
            var actionShow = cc.scaleTo(0.5,1);
            avenger.sp_bg_sang_vang.runAction(cc.sequence(actionShow.clone(),cc.callFunc(function(){
                var actionXoaySangVang = cc.repeatForever(cc.rotateBy(4,360));
                avenger.sp_bg_sang_vang.runAction(actionXoaySangVang);
                avenger.sp_set_jackpot.runAction(cc.repeatForever(avenger.runSetNoHu()));
            })));
            avenger.sp_duong_vang.runAction(cc.sequence(cc.delayTime(0.25),actionShow.clone(),cc.callFunc(function(){

                var actionNhayTxtThangLon = cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1)));
                avenger.sp_duong_vang.runAction(actionNhayTxtThangLon);

            })));


            //})));

        },
        runSetNoHu: function()
        {
            var str = "";
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistSetJackpot.plist");
                var animSetNoHu = [];
                for (var i = 1; i < 15; i++) {

                    str = "Avenger/hieuung/jackpot/set/set_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    if(!spriteFrame)
                    {
                        cc.log("index = "+ i);
                    }
                    animSetNoHu.push(spriteFrame);
                }

            var animationSetNoHu = cc.Animation.create(animSetNoHu, 0.04, 1);
            var animateSetNoHu = cc.Animate.create(animationSetNoHu);
            return animateSetNoHu;

        },

        initThangLon:function()
        {
            this.pThangLon = this.getControl("pThangLon",this.pAvenger);
            this.sp_glow_thang_lon = this.pThangLon.getChildByName("sp_glow_thang_lon");
            this.sp_set_thang_lon = this.pThangLon.getChildByName("sp_set_thang_lon");
            this.sp_tui_tien = this.pThangLon.getChildByName("sp_tui_tien");
            this.lb_prize_thang_lon = this.getControl("lb_prize_thang_lon",this.sp_tui_tien);
            //this.sp_txt_thang_lon = this.pThangLon.getChildByName("sp_txt_thang_lon");

            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        return true;
                    }

                    return true;
                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                    //Move the position of current button sprite

                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {
                    var target = event.getCurrentTarget();

                    if(avenger.waitingThangLon == false)
                    {
                        avenger.stopActionThangLon();
                    }
                }
            });
            cc.eventManager.addListener(listener1,  this.pThangLon);
            this.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(function(){
                this.stopActionThangLon();
            }.bind(this))));
        },
        stopActionThangLon:function()
        {

            cc.eventManager.pauseTarget(this.pThangLon, true);
            this.pThangLon.setVisible(false);
            this.pThangLon.stopAllActions();
            this.waitingThangLon = false;
            this.sp_glow_thang_lon.stopAllActions();
            this.sp_set_thang_lon.stopAllActions();
            this.sp_tui_tien.stopAllActions();
            this.sp_tui_tien.setScale(0);
        },
        showActionThangLon:function()
        {
            this.audioAvenger.soundEffect(this.audioAvenger.thangLon);
            cc.eventManager.resumeTarget(this.pThangLon, true);
            this.waitingThangLon = true;
            this.pThangLon.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
                avenger.waitingThangLon = false;
            })));
            this.pThangLon.setVisible(true);
            var actionShow = cc.scaleTo(0.5,1);
            avenger.sp_tui_tien.setScale(1);

            avenger.lb_prize_thang_lon.setString(formatMoney(0,3,avenger.resultSlot.prize));

            this.sp_set_thang_lon.runAction(cc.repeatForever(this.runSetThangLon()));
            this.sp_glow_thang_lon.runAction(cc.repeatForever(this.runGlowThangLon()));

        },
        runSetThangLon: function()
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistTiaSetThangLon.plist");
            var str = "";
                var animSetThangLon = [];
                for (var i = 1; i < 12; i++) {

                    str = "Avenger/hieuung/thang_lon/tia_set/tia_set_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    if(!spriteFrame)
                    {
                        cc.log("index = "+ i);
                    }
                    animSetThangLon.push(spriteFrame);
                }

            var animationSetThangLon = cc.Animation.create(animSetThangLon, 0.04, 1);
            var animateSetThangLon = cc.Animate.create(animationSetThangLon);
            return animateSetThangLon;

        },
        runGlowThangLon: function()
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/hieuung/PlistGlowThangLon.plist");
            var str = "";

                var animGlowThangLon = [];
                for (var i = 0; i < 18; i++) {

                    str = "Avenger/hieuung/thang_lon/glow/glow_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    if(!spriteFrame)
                    {
                        cc.log("index = "+ i);
                    }
                    animGlowThangLon.push(spriteFrame);
                }

            var animationGlowThangLon = cc.Animation.create(animGlowThangLon, 0.04, 1);
            var animateGlowThangLon = cc.Animate.create(animationGlowThangLon);
            return animateGlowThangLon;

        },


        initItem:function(isFr)
        {
            var khoangCach = 166;
            var viTriDauY = 83;
            var viTriDauX = 83;
            for(var j = this.totalItemColum -1; j >= 0 ; j--)
            {
                for(var i=1;i<6;i++)
                {
                    this["pColum"+ i.toString()].indexColumn = i;



                    if(!this["spItem"+ i.toString() + j.toString()])
                    {
                        this["spItem"+ i.toString() + j.toString()] = new cc.Sprite();
                        if(isFr)
                        {
                            this["spItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/FreeSpin/item"+getRandomInt(3,10)+".png",cc.rect(0,0,171,171));
                        }else
                        {
                            this["spItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/item"+getRandomInt(3,10)+".png",cc.rect(0,0,171,171));
                        }

                        this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                        this["pColum"+ i.toString()].addChild(this["spItem"+ i.toString() + j.toString()]);
                    }else
                    {
                        if(isFr)
                        {
                            this["spItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/FreeSpin/item"+getRandomInt(3,10)+".png",cc.rect(0,0,171,171));
                        }else
                        {
                            this["spItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/item"+getRandomInt(3,10)+".png",cc.rect(0,0,171,171));
                        }
                    }



                    // this["pColum"+ i.toString()].setLocalZOrder(25+i);
                }



            }
            for(var j = 2; j >= 0 ; j--) {

                for (var i = 1; i < 6; i++) {


                    if(!this["spWildFree"+ i.toString() + j.toString()])
                    {
                        this["spWildFree"+ i.toString() + j.toString()] = new cc.Sprite();
                        this["spWildFree"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/FreeSpin/item2.png",cc.rect(0,0,171,171));
                        this["spWildFree"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                        this["pColum"+ i.toString()].addChild(this["spWildFree"+ i.toString() + j.toString()]);
                        this["spWildFree"+ i.toString() + j.toString()].setVisible(false);
                        this.arrWildFree.push(this["spWildFree"+ i.toString() + j.toString()]);
                    }
                    if(!this["spNenItem"+ i.toString() + j.toString()])
                    {
                        this["spNenItem"+ i.toString() + j.toString()] = new cc.Sprite();
                        this["spNenItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/khungan.png",cc.rect(0,0,200,200));
                        this["spNenItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                        this["pColum"+ i.toString()].addChild(this["spNenItem"+ i.toString() + j.toString()]);
                        this["spNenItem"+ i.toString() + j.toString()].setVisible(false);
                        this.arrItemMatrix.push(this["spNenItem"+ i.toString() + j.toString()]);
                    }


                }
            }
            //var arrMatrix = this.resultSlot.matrix.split(",");
            //for(var i= 2; i >= 0; i--)
            //{
            //    for(var j= 1; j< 6; j++)
            //    {
            //        this["spItem" + j.toString() + i.toString()].setScale(1);
            //        this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
            //        //this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
            //        ////cc.log(j + " " + i);
            //    }
            //}
        },
        initFreeItem:function()
        {
            var khoangCach = 166;
            var viTriDauY = 83;
            var viTriDauX = 83;
            for(var j = this.totalItemColum -1; j >=0 ; j--)
            {
                for(var i=1;i<6;i++)
                {
                    this["pColum"+ i.toString()].indexColumn = i;
                    this["spItem"+ i.toString() + j.toString()] = new cc.Sprite();
                    this["spItem"+ i.toString() + j.toString()].initWithFile("res/Avenger/item/item"+getRandomInt(0,8)+".png",cc.rect(0,0,171,171));
                    this["spItem"+ i.toString() + j.toString()].setPosition(cc.p(viTriDauX,viTriDauY + khoangCach*j));
                    this["pColum"+ i.toString()].addChild(this["spItem"+ i.toString() + j.toString()]);
                    //this["pColum"+ i.toString()].setLocalZOrder(20+i);
                }

            }
            var arrMatrix = this.resultSlot.matrix.split(",");



            if(this["spItem10"].y > this["spItem1" + (this.totalItemColum-1).toString()].y)
            {
                for(var i= 2; i >= 0; i--)
                {
                    for(var j= 1; j< 6; j++)
                    {
                        this["spItem" + j.toString() + i.toString()].setScale(1);
                        this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                        this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
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
                        this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
                        this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
                        ////cc.log(j + " " + i);
                    }
                }
            }
            for(var i= 2; i >= 0; i--)
            {
                for(var j= 1; j< 6; j++)
                {
                    this["spItem" + j.toString() + i.toString()].setScale(1);
                    this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                    //this.arrItemMatrix.push(this["spItem" + j.toString() + i.toString()]);
                    ////cc.log(j + " " + i);
                }
            }
        },
        initShowLine:function()
        {
            for(var i = 1; i <= this.soDong; i++)
            {
                this["spShowLine"+ i.toString()] = new cc.Sprite();
                this["spShowLine"+ i.toString()].initWithFile("res/Avenger/line/" + i + ".png",cc.rect(0,0,964,484));
                this["spShowLine"+ i.toString()].setPosition(cc.p(577,370 ));
                this.pItem.addChild(this["spShowLine"+ i.toString()]);
                //this["spShowLine"+ i.toString()].setLocalZOrder(i);
                this["spShowLine"+ i.toString()].setVisible(false);
            }

        },
        initChonDong:function()
        {
            var widthFragm = 270;
            var heightFragm = 172;
            var startX = 150;
            var startY = 520;
            var btnRect = cc.rect(112,96);
            var khoangCachX = 170;
            var khoangCachY = 100;

            for(var i = 1; i <= this.soDong; i++)
            {

                this["btnLine"+i] = new ccui.Button();
                this["btnLine"+i].loadTextures("res/Avenger/number/"+i+"_1.png","res/Avenger/number/"+i+"_1.png","res/Avenger/number/"+i+"_1.png");
                this["btnLine"+i].setPosition(cc.p(startX + ((i-1)%5)*khoangCachX,startY - Math.floor((i-1)/5)*khoangCachY));
                this["btnLine"+i].setTag(i);
                this["btnLine"+i].isSelectLine = true;
                this.pChonDong.addChild(this["btnLine"+i]);
                this["sp_num" + i].setVisible(true);
                //if(i == 1)
                //{
                //    this["btnLine"+i].loadTextureNormal("res/Avenger/number/"+i+".png");
                //    this["btnLine"+i].isSelectLine = true;
                //    this["sp_num" + i].setVisible(true);
                //}
                this["btnLine"+i].addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            avenger.audioAvenger.soundEffect(avenger.audioAvenger.button);
                            if(avenger.checkDonePlay())
                            {
                                if(this.isChoiThu)
                                {
                                    this.toastSlot("Bạn đang ở chế độ chơi thử, không được chọn dòng",3);
                                }else if(this.resultSlot.freeSpin > 0)
                                {
                                    this.toastSlot("Bạn còn lượt quay miễn phí");
                                }else
                                {
                                    avenger.selectLine(sender.getTag());
                                    avenger.changeLineSelected();
                                }

                            }

                            break;
                    }

                },this);
            }
            this.selectLineAll();
            //this.lb_muc_dat.setString(formatMoney(0,3,this.betValue));
            //this.lb_tong_dat.setString(formatMoney(0,3,this.sumBet));
            //this.lb_so_dong.setString(this.lineSelected);
            //this.showAndHideLineSelect();
        },
        getArrayLineSelected:function()
        {
            var lineSelected = "";
            for(var i= 1; i <= this.soDong; i++)
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
                this["btnLine"+index].loadTextureNormal("res/Avenger/number/"+index+"_1.png");
                this["sp_num" + index].setVisible(true);
                //this["spShowLine"+index].setVisible(true);
            }else
            {
                this["btnLine"+index].isSelectLine = false;
                this["btnLine"+index].loadTextureNormal("res/Avenger/number/"+index+".png");
                this["sp_num" + index].setVisible(false);
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
            for(var i = 1; i <= this.soDong; i++)
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
            if(this.resultSlot.freeSpin > 0)
            {
                this.toastSlot("Bạn còn lượt quay miễn phí");
                return;
            }
            for(var i = 1; i<=this.soDong; i++)
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
            if(this.resultSlot.freeSpin > 0)
            {
                this.toastSlot("Bạn còn lượt quay miễn phí");
                return;
            }
            for(var i = 1; i<=this.soDong; i++)
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
            if(this.resultSlot.freeSpin > 0)
            {
                this.toastSlot("Bạn còn lượt quay miễn phí");
                return;
            }
            for(var i = 1; i<=this.soDong; i++)
            {
                this.btnSelectLine(i,true);
            }
            this.changeLineSelected();
        }
        ,
        chonLai:function()
        {
            if(this.resultSlot.freeSpin > 0)
            {
                this.toastSlot("Bạn còn lượt quay miễn phí");
                return;
            }
            for(var i = 1; i<=this.soDong; i++)
            {
                this.btnSelectLine(i,false);
            }
            this.changeLineSelected();
        },

        startPlay:function()
        {
            this.audioAvenger.soundEffect(this.audioAvenger.quay);
            this.isRotate = true;
            this.btn_quay.setBright(false);
            this.btn_tu_quay.setBright(false);
            if(this.isChoiThu)
            {
                var randomResult = getRandomInt(0,Avenger.resultChoiThu.length-1);
                var resultChoiThu = Avenger.resultChoiThu[randomResult];
                //this.resultSlot =
                //var resultChoiThu = Slots.resultChoiThu[Slots.resultChoiThu.length-2];
                // //cc.log("Ket qua test " + randomResult);
                //function(ref,result,matrix,linesWin,khoBau,prize,currentMoney,freeSpin,isFree, itemsWild, ratio);
                this.updateResult(resultChoiThu.ref,resultChoiThu.result,resultChoiThu.matrix,resultChoiThu.linesWin,resultChoiThu.khoBau,resultChoiThu.prize,resultChoiThu.currentMoney,resultChoiThu.freeSpin,resultChoiThu.isFree,resultChoiThu.itemsWild,resultChoiThu.ratio);


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

                this.totalMoneyChoiThu = this.totalMoneyChoiThu - this.betValue*25;
                if(this.totalMoneyChoiThu >= 0)
                {
                    avenger.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));
                }
            }else
            {
                if(this.resultSlot.isFree || this.isFreeDaiLy)
                {

                }else
                {
                    var moneyUpdate = 0;

                    moneyUpdate = lobby.userInfo.vinTotal - (avenger.lineSelected * avenger.betValue);
                    if(moneyUpdate>=0)
                    {
                        avenger.lb_total_money.setString(formatMoney(0,3,moneyUpdate));
                    }
                }

            }
        },
        updateCurrentMoney:function()
        {
            if(!this.isChoiThu)
            {
                cc.log("loi o day 1");
                cc.log("resultSlot.currentMoney = "+ this.resultSlot.currentMoney);
                lobby.updateMoney(this.resultSlot.currentMoney,MONEY_VIN);
                cc.log("loi o day 2");
            }else
            {
                this.totalMoneyChoiThu = this.totalMoneyChoiThu + this.resultSlot.prize;

                avenger.lb_total_money.setString(formatMoney(0,3,this.totalMoneyChoiThu));

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
                    objLS.lb = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25";
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
        updateFree:function(currentFree,currentMoney)
        {
            this.free = currentFree;
            this.lb_so_luot_mien_phi.setString(currentFree);
            this.lb_total_money.setString(formatMoney(0,3,currentMoney));
        },
        checkFreeIngame:function(free,soDong)
        {

            cc.log("So lan mien phi : = " + free);
            this.resultSlot.freeSpin = free;
            if(free > 0 && this.isFreeDaiLy == false)
            {
                if(this.isFreeInGame == false)
                    this.initItem(true);
                this.sp_bg_text_luot_quay_mien_phi.setVisible(true);
                this.lb_free_spin.setVisible(true);
                this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
                this.resultSlot.isFree = true;
                this.isFreeInGame = true;
                var arrSoDong = soDong.split(",");
                for(var i = 1; i<=this.soDong; i++)
                {
                    this.btnSelectLine(i,false);
                }

                for(var i = 0; i < arrSoDong.length; i++)
                {
                    this.btnSelectLine(parseInt(arrSoDong[i]),true);
                }
                this.changeLineSelected();

            }else
            {
                this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
                this.lb_free_spin.setVisible(false);
            }

        },
        updateResult:function(ref,result,matrix,linesWin,khoBau,prize,currentMoney,freeSpin,isFree, itemsWild, ratio)
        {
            if(!avengerAppear)
            {
                return;
            }
            if(this.isAutoRotate)
            {
                this.audioAvenger.stopAllEffect();
            }

            //this.retainCount();
            this.isWaitingRotate = false;
            cc.log("{\nref: " + ref + ",\n" +
                "result: " + result + ",\n" +
                "matrix: \"" + matrix + "\",\n" +
                "linesWin: \"" + linesWin + "\",\n" +
                "khoBau: \"" + khoBau + "\",\n" +
                "prize: " + prize + ",\n" +
                "currentMoney: " + currentMoney + ",\n " +
                "freeSpin:" + freeSpin + ",\n " +
                "isFree:" + isFree + ",\n " +
                "itemsWild:" + itemsWild+ ",\n " +
                "ratio:" + ratio + ",\n}");
            if(this.isAutoRotate && result == 5)
            {
                this.waitingKhoBau = true;
            }
            if(this.resultSlot.result == 2)
            {
                this.stopActionThangLon();
            }else
            if(this.resultSlot.result == 3 || this.resultSlot.result == 4)
            {
                this.stopActionNoHu();
            }
            //this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));
            this.lb_prize.setString("0");
            //var obj = {};
            this.resultSlot.ref = ref;
            this.resultSlot.result = result;
            this.resultSlot.matrix = matrix;
            this.resultSlot.linesWin = linesWin;
            this.resultSlot.khoBau = khoBau;
            this.resultSlot.prize = prize;
            this.resultSlot.currentMoney = currentMoney;
            this.resultSlot.freeSpin = freeSpin;
            this.resultSlot.isFree = isFree;
            this.resultSlot.itemsWild = itemsWild;
            this.resultSlot.ratio = ratio;

            this.isRotate = true;



            this.pItem.stopAllActions();
            this.lb_prize.stopAllActions();
            this.sp_wild2.setVisible(false);
            this.sp_wild3.setVisible(false);
            this.sp_wild4.setVisible(false);
            this.hideStartFree();
            this.hideEndFree();
            closeAvengerMinigame(false);
            for(var i = 1; i < 6; i++)
            {
                this["pColum"+ i.toString()].stopAllActions();
                this["pColum"+ i.toString()].y = this.startColumY;
            }

            this.resetPositionItem();

            if(result == 100)
            {
                this.toastSlot("Quay không thành công",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");

            }else if(result == 101)
            {
                this.toastSlot("Đặt cược không hợp lệ",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
            }else if(result == 102)
            {
                this.toastSlot("Bạn không đủ tiền",3);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
            }else if(result == 103)
            {
                this.toastSlot("Lượt quay không hợp lệ",3);
                this.isFreeDaiLy = false;
                this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                this.isRotate = false;
                this.isAutoRotate = false;
                this.btn_quay.setBright(true);
                this.btn_tu_quay.setBright(true);
                this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
            }else
            {

                if(this.isFreeInGame == false && this.resultSlot.isFree)
                {
                    this.isFreeInGame = true;
                    this.initItem(true);
                    this.sp_bg_text_luot_quay_mien_phi.setVisible(true);
                    this.lb_free_spin.setVisible(true);
                    this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");

                }else if(this.isFreeInGame == true && this.resultSlot.isFree == false)
                {
                    this.isFreeInGame = false;
                    this.initItem(false);
                    this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
                    this.lb_free_spin.setVisible(false);
                    for(var i=0 ; i<this.arrWildFree.length; i++)
                    {
                        this.arrWildFree[i].setVisible(false);
                    }
                    //this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
                }else
                if(this.resultSlot.freeSpin>0)
                {
                    this.lb_free_spin.setString("Bạn còn " + this.resultSlot.freeSpin + " lượt quay miễn phí");
                }else  if(this.resultSlot.freeSpin == 0)
                {
                    if(this.lb_free_spin.isVisible())
                    {
                        this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
                        this.lb_free_spin.setVisible(false);
                    }
                }

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
        updatePot:function(pot1,x2)
        {
            if(this.isChangeRoom)
            {
                this.isChangeRoom = false;
                this.lb_prize.setString("0");
            }

            var breakValue1 = parseInt((pot1 - this.valueHuSlot1)/50) +1;
            if(pot1 - this.valueHuSlot1 > 0)
            {
                effectRunMoney(this.lb_hu,this.valueHuSlot1, pot1, breakValue1,true);
            }else
            {
                this.lb_hu.stopAllActions();
                this.lb_hu.setString(formatMoney(0,3,pot1));
            }
            this.valueHuSlot1 = pot1;

            if(x2 == 0)
            {
                if(this.isX2)
                {
                    this.isX2=false;
                    this.sp_quy_thuong.stopAllActions();

                    this.sp_quy_thuong.setScale(1);
                    this.sp_quy_thuong.setTexture("res/Avenger/bg/quy_thuong.png");
                }
            }else
            {
                if(this.isX2 == false)
                {
                    if(this.resultSlot.result == 3 || this.resultSlot.result == 4)
                    {
                        this.sp_quy_thuong.runAction(cc.sequence(cc.delayTime(5),cc.callFunc(function(){
                            avenger.isX2=true;
                            avenger.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                            avenger.sp_quy_thuong.setTexture("res/Avenger/bg/x2_quy_thuong.png");
                        })));
                    }else
                    {
                        this.isX2=true;
                        this.sp_quy_thuong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,1.1),cc.scaleTo(0.3,1))));
                        this.sp_quy_thuong.setTexture("res/Avenger/bg/x2_quy_thuong.png");
                    }

                }
            }

            //this.valueHuSlot2 = pot2;
            //this.valueHuSlot3 = pot3;
        },
        setDateX2:function(date)
        {
            cc.log("date: " + date);
            this.lb_date_x2.setString(date);
            //if(date == "")
            //{
            //    //this.btn_x2_hu.loadTextures("res/Minigame/ResSlotBa/event_x2.png","res/Minigame/ResSlotBa/event_x2.png","res/Minigame/ResSlotBa/event_x2.png");
            //    this.btn_x2_quy_thuong.setVisible(false);
            //
            //}else
            //{
            //    //this.btn_x2_hu.loadTextures("res/Minigame/ResSlotBa/time_event.png","res/Minigame/ResSlotBa/time_event.png","res/Minigame/ResSlotBa/time_event.png");
            //    this.btn_x2_quy_thuong.setVisible(true);
            //    this.lb_date_x2.setString(date);
            //
            //    //this.lb_date_x2
            //}

        },
        forceStopAuto:function()
        {
            this.isAutoRotate = false;
            this.btn_quay.setBright(true);
            this.btn_tu_quay.setBright(true);
            this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
            //slot3hang.txt_tuquay.setString("TỰ QUAY");


        },
        showAndHideLineSelect: function()
        {
            for(var i = 1; i<=this.soDong; i++)
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
            for(var i = 1; i<=this.soDong; i++)
            {
                this["spShowLine"+ i.toString()].setVisible(false);
            }
        },
        visibleLine:function(arrLine)
        {
            for(var i = 0; i< arrLine.length; i++)
            {
                cc.log("line = " +i);
                if(arrLine[i] != 0)
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
                        if(this.resultSlot.isFree)
                        {
                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/FreeSpin/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                        }else
                        {
                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                        }

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
                        if(this.resultSlot.isFree)
                        {
                            //this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/FreeSpin/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/FreeSpin/item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
                        }else
                        {
                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
                        }

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
            {
                this.audioAvenger.soundEffect(this.audioAvenger.runItem);
            }
            var khoangCach = 166;
            for(var i = 0; i < this.totalItemColum; i++)
            {
                var actionBy = cc.MoveBy.create(0.8, cc.p(0,  - khoangCach*(this.totalItemColum-3)));
                if(i != (this.totalItemColum - 1)) {
                    this["spItem"+ index.toString() + i.toString()].runAction(actionBy);
                }else {
                    this["spItem"+ index.toString() + i.toString()].runAction(cc.sequence(actionBy, cc.callFunc(function(){
                        // //cc.log(" spinColum Xong");
                        avenger.endPlay(index);

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
                    if(avenger.resultSlot.isFree == false)
                        avenger.checkWild();
                    else
                        avenger.checkWildFree();
                    // //cc.log("Quay xong");
                    if(avenger.resultSlot.freeSpin > 0 && avenger.resultSlot.isFree == false)
                    {
                        avenger.showStartFree(this.resultSlot.freeSpin);

                    }
                    if(avenger.resultSlot.freeSpin == 0 && avenger.resultSlot.isFree == true)
                    {
                        avenger.showEndFree();
                        avenger.resultSlot.isFree = false
                    }
                    if(avenger.resultSlot.linesWin!="")
                        avenger.visibleLine(avenger.resultSlot.linesWin.split(","));
                    cc.log("Check Err0");
                    avenger.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                        cc.log("Check Err1");
                        avenger.isRotate = false;
                        avenger.showEffectDone();
                        cc.log("Check Err2");
                        //if(!this.isChoiThu)
                        //{
                        //    this.reloadLsgd();
                        //}
                        if(!avenger.isAutoRotate)
                        {
                            avenger.btn_quay.setBright(true);
                            avenger.btn_tu_quay.setBright(true);

                        }

                        if(avenger.resultSlot.linesWin!="")
                            avenger.runEffectLineWin(0);
                        if((avenger.resultSlot.result!=5 && avenger.resultSlot.result!=2 && avenger.resultSlot.result!=3 && avenger.resultSlot.result!=4) && avenger.resultSlot.prize > 0)
                        {
                            avenger.lb_prize_show.setPosition(cc.p(581,366));
                            avenger.lb_prize_show.setScale(1);
                            avenger.lb_prize_show.setVisible(true);
                            avenger.lb_prize_show.stopAllActions();
                            var prz = avenger.resultSlot.prize;
                            effectRunMoneyPlus(avenger.lb_prize_show,0,avenger.resultSlot.prize,parseInt(avenger.resultSlot.prize/10),true);

                            avenger.lb_prize_show.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                                var runPrize = cc.spawn(cc.moveTo(1,cc.p(710,71)),cc.scaleTo(1,0));
                                avenger.lb_prize_show.runAction(cc.sequence(runPrize,cc.callFunc(function(){
                                    avenger.lb_prize.setString(formatMoney(0,3,prz));
                                })));
                            })));
                            //freeSpin: 0,
                            //    isFree: false

                        }else
                        if(avenger.resultSlot.result!=5)
                            effectRunMoney(avenger.lb_prize,0,avenger.resultSlot.prize,parseInt(avenger.resultSlot.prize/20),true);
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
                if(arrLineWin[index] != 0)
                {
                    if(this.resultSlot.result != 2 && this.resultSlot.result != 3&& this.resultSlot.result != 5)
                        this.audioAvenger.soundEffect(this.audioAvenger.lineWin);
                    this["spShowLine"+ arrLineWin[index]].setVisible(true);
                    this.runEffectItemInLine(arrLineWin[index] -1,indexInLine);
                    avenger.pItem.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                        avenger.runEffectLineWin(index + 1);
                    },this)));
                }else
                {
                    avenger.runEffectLineWin(index + 1);
                }

            }
        },

        checkWild:function()
        {

            var arrMatrix = this.resultSlot.matrix.split(",");
            var wildCot2 = false;
            var wildCot3 = false;
            var wildCot4 = false;
            //this.arrItemMatrix = [];
            cc.log(this.resultSlot.matrix);
            for(var i= 2; i >= 0; i--)
            {
                for(var j= 1; j< 6; j++)
                {
                    if(arrMatrix[(j-1) + ((2-i)*5)] == 2)
                    {
                        if(j == 2 && wildCot2 == false)
                        {
                            wildCot2 = true;
                            for(var n = 0; n < 3; n++)
                            {
                                arrMatrix[1+ n*5] = 2;
                            }
                        }else
                        if(j == 3 && wildCot3 == false)
                        {
                            wildCot3 = true;
                            for(var n = 0; n < 3; n++)
                            {
                                arrMatrix[2+ n*5] = 2;
                            }
                        }else
                        if(j == 4 && wildCot4 == false)
                        {
                            wildCot4 = true;
                            for(var n = 0; n < 3; n++)
                            {
                                arrMatrix[3+ n*5] = 2;
                            }
                        }
                    }
                }
            }

            var strMatrix = ""
            for(var i = 0; i < arrMatrix.length; i++)
            {
                if(i == 0)
                    strMatrix = arrMatrix[i].toString();
                else
                    strMatrix = strMatrix + "," + arrMatrix[i];
            }

            this.resultSlot.matrix = strMatrix;
            cc.log(this.resultSlot.matrix);

            if(wildCot2)
            {
                this.sp_wild2.setVisible(true)
                this.sp_wild2.runAction(cc.sequence(this.runWild(),cc.callFunc(function(){
                    avenger.sp_wild2.setVisible(false);
                })));
            }
            if(wildCot3)
            {
                this.sp_wild3.setVisible(true)
                this.sp_wild3.runAction(cc.sequence(this.runWild(),cc.callFunc(function(){
                    avenger.sp_wild3.setVisible(false);
                })));
            }
            if(wildCot4)
            {
                this.sp_wild4.setVisible(true)
                this.sp_wild4.runAction(cc.sequence(this.runWild(),cc.callFunc(function(){
                    avenger.sp_wild4.setVisible(false);
                })));
            }
            if(wildCot2||wildCot3||wildCot4)
                this.audioAvenger.soundEffect(this.audioAvenger.wild);
                if(this["spItem10"].y > this["spItem1" + (this.totalItemColum-1).toString()].y)
                {
                    for(var i= 2; i >= 0; i--)
                    {
                        for(var j= 1; j< 6; j++)
                        {
                            this["spItem" + j.toString() + i.toString()].setScale(1);

                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+arrMatrix[(j-1) + ((2-i)*5)]+".png");
                        }
                    }

                }else
                {
                    for(var i = (this.totalItemColum-1); i >= this.totalItemColum-3; i--)
                    {
                        for(var j= 1; j< 6; j++)
                        {
                            this["spItem" + j.toString() + i.toString()].setScale(1);
                            this["spItem" + j.toString() + i.toString()].setTexture("res/Avenger/item/item"+ arrMatrix[(j-1) + (((this.totalItemColum-1)-i)*5)] +".png");
                        }
                    }
                }
        },
        checkWildFree:function()
        {
            var arrWildFree = this.resultSlot.itemsWild.split(",");
            for(var i = 0; i< arrWildFree.length; i++)
            {
                if(i % 2 == 1)
                {
                    this.showWildFree(parseInt(arrWildFree[i-1]),parseInt(arrWildFree[i]));
                }
            }
        },
        showWildFree:function(hang,cot)
        {
            if(!this.arrWildFree[hang*5 + cot].isVisible())
            {
                this.arrWildFree[hang*5 + cot].setVisible(true);
            }
        },
        runWild: function()
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistWild.plist");
            var str = "";
            if(avenger["animHulkWild"] == null)
            {

                avenger["animHulkWild"] = [];
                for (var i = 0; i < 31; i++) {

                    str = "Avenger/item/wild/Wild_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    if(!spriteFrame)
                    {
                        cc.log("index = "+ i);
                    }
                    avenger["animHulkWild"].push(spriteFrame);
                }
            }
            avenger["animationHulkWild"] = cc.Animation.create(avenger["animHulkWild" ], 0.04, 1);
            avenger["animateHulkWild"] = cc.Animate.create( avenger["animationHulkWild"]);
            return avenger["animateHulkWild"];

        },

        runEffectItemInLine: function(line,indexInLine)
        {
            var arrMatrix = this.resultSlot.matrix.split(",");
            var countLine = 0;
            var arrLine = [];
            var arrItem = [];

            arrLine.push(this.mapLine[line][0]);
            for(var j = 1; j < 5; j++)
            {
                if(arrMatrix[this.mapLine[line][0]] == arrMatrix[this.mapLine[line][j]] || arrMatrix[this.mapLine[line][j]] == 2)
                    arrLine.push(this.mapLine[line][j]);
                else
                    break;
            }

            for(var i = 0; i<arrLine.length; i++)
            {
                this.effectItemWin(this.arrItemMatrix[arrLine[i]],arrMatrix[arrLine[i]]);
            }



        },

        effectItemWin:function(view,item)
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/item/PlistKhungAn.plist");
            //var animFrames = [];
            var str = "";
            view.setVisible(true);
                var animFramesKhung = [];
                for (var i = 0; i < 23; i++) {
                    str = "Avenger/item/khungan/Khung_an_" + i + ".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFramesKhung.push(spriteFrame);
                    //animFrame = null;
                }



            var animationKhung = cc.Animation.create(animFramesKhung, 0.04, 1);
            var animateKhung  = cc.Animate.create(animationKhung);

            view.stopAllActions();
            view.runAction(cc.sequence(animateKhung,cc.callFunc(function(){
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
            if(this.resultSlot.result == 3 || this.resultSlot.result == 4)
            {
                this.showActionNoHu();
                this.updateCurrentMoney();
            }else
            if(this.resultSlot.result == 5)
            {
                openAvengerMinigame();
                avengerMinigame.setData(this.resultSlot.khoBau);
                this.isPlayMinigame = true;
            }else if(this.resultSlot.result == 6)
            {

            }
            else
            {
                this.updateCurrentMoney();
                if(this.resultSlot.prize>0)
                {
                    this.audioAvenger.soundEffect(this.audioAvenger.giaiThuong);
                }
            }
        },

        resetPositionItem:function()
        {
            var khoangCach = 166;
            var viTriDauY = 83;
            var viTriDauX = 83;
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
            delete khoangCach;
            delete viTriDauY;
            delete viTriDauX;
        },



        toastSlot: function(message,timeShow, colorLable)
        {
            var wbg = this.pAvenger.getContentSize().width;
            if(this.pAvenger.getChildByTag(999)!=null)
            {
                this.pAvenger.getChildByTag(999).stopAllActions();
                this.pAvenger.getChildByTag(999).getChildByTag(10).stopAllActions();

                this.pAvenger.getChildByTag(999).setOpacity(90);
                this.pAvenger.getChildByTag(999).getChildByTag(10).setOpacity(255);
                this.pAvenger.getChildByTag(999).getChildByTag(10).setString(message);
                if(colorLable!=null)
                {
                    this.pAvenger.getChildByTag(999).getChildByTag(10).color = colorLable;
                }else
                {
                    this.pAvenger.getChildByTag(999).getChildByTag(10).color = cc.color(255, 255, 255);
                }
                var fadeOut = cc.fadeOut(2);
                var fadeIn = cc.fadeIn(0.5);
                var seq = cc.sequence(fadeIn,cc.delayTime(timeShow), fadeOut);
                this.pAvenger.getChildByTag(999).runAction(seq);
                this.pAvenger.getChildByTag(999).getChildByTag(10).runAction(seq.clone());

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

                this.pAvenger.addChild(layer, 999);
                //var forever = seq.repeatForever();
                layer.runAction(seq);
                label1.runAction(seq.clone());
            }
            //var layer = new cc.LayerColor(cc.color(245, 170, 8));
        },
        changeRoom:function(currentRoom,joindRoom)
        {
            var sendPkm = new AvengerCmdSendChangeRoom();
            sendPkm.putCmd(currentRoom,joindRoom);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        play:function(betValue,lines)
        {
            var sendPkm = new AvengerCmdSendPlay();
            sendPkm.putCmd(betValue,lines);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        autoPlay:function(lines)
        {
            var sendPkm = new AvengerCmdSendAutoPlay();
            sendPkm.putCmd(lines);
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        stopAutoPlay:function()
        {
            var sendPkm = new AvengerCmdSendStopAutoPlay();
            sendPkm.putCmd();
            lobby.socketSlot.send(sendPkm);
            sendPkm.clean();
        },
        minimize:function(roomId)
        {
            var sendKb = new AvengerCmdSendMinimize();
            sendKb.putCmd(roomId);
            lobby.socketSlot.send(sendKb);
            sendKb.clean();
        },

        callBackError: function(response)
        {
            //avenger.hideLoading();
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
        getlinkAvatar : function (value){
            for(var i = 0; i < 12; i ++){
                if(value == i) {
                    return "res/common/avatar/Avatar_" + (i + 1) + ".png";
                }
            }
        },
        closeMiniGame:function()
        {
            this.isPlayMinigame = false;
            this.lb_prize.setString(formatMoney(0,3,this.resultSlot.prize));
            this.updateCurrentMoney();
            if(this.waitingKhoBau == true)
            {
                this.waitingKhoBau = false;
                this.btn_quay.setBright(false);
                this.btn_tu_quay.setBright(false);
                this.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                    if(avenger.isAutoRotate == false)
                    {
                        avenger.isAutoRotate = true;
                        avenger.autoPlay(avenger.getArrayLineSelected());

                        avenger.btn_quay.setBright(false);
                        avenger.btn_tu_quay.setBright(false);
                        avenger.btn_tu_quay.loadTextures("res/Avenger/btn_dungquay.png","res/Avenger/btn_dungquay_s.png","res/Avenger/btn_dungquay_s.png");
                    }

                })));
            }
        },
        showStartFree:function(soLuot)
        {
            this.pStartMienPhi.setVisible(true);
            if(soLuot == 8)
            {
                this.audioAvenger.soundEffect(this.audioAvenger.mienPhi);
            }
            this.lb_thong_bao_free. setString("Bạn nhận được "+ soLuot +" lượt quay miễn phí");
            this.pStartMienPhi.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                if(avenger.pStartMienPhi.isVisible())
                    avenger.pStartMienPhi.setVisible(false);
                avenger.sp_bg_text_luot_quay_mien_phi.setVisible(true);
                avenger.lb_free_spin.setVisible(true);
                avenger.lb_free_spin.setString("Bạn có " + avenger.resultSlot.freeSpin + " lượt quay miễn phí");
            })));

        },
        initFreeDaiLy:function()
        {
            var wbg = this.pAvenger.getContentSize().width;
            var  fonts = fontRobotoBlack;
            var fontSize = 36;

            this.sp_bg_text_luot_quay_dai_ly = new cc.Sprite("res/Minigame/ImageChung/bg_thong_bao.png");
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
                this.sp_bg_text_luot_quay_mien_phi.setVisible(false);
                this.lb_free_spin.setVisible(false);
                if(this.resultSlot.isFree == true)
                {
                    this.resultSlot.isFree = false;
                    this.isFreeInGame = false;
                    this.initItem(false);
                }
            }else
            {
                if(avenger.sp_bg_text_luot_quay_dai_ly.isVisible())
                {
                    this.sp_bg_text_luot_quay_dai_ly.setVisible(false);
                }
                this.isFreeDaiLy = false;


            }
        },
        hideStartFree:function()
        {
            if(this.pStartMienPhi.isVisible())
                this.pStartMienPhi.setVisible(false);
        },
        updateEndFree:function(totalPrize, heSoNhan)
        {
            this.prizeFree = totalPrize;
            this.ratioFree = heSoNhan;

        },
        showEndFree:function()
        {
            this.pEndMienPhi.setVisible(true);
            this.lb_total_free.setString(formatMoney(0,3,this.prizeFree));
            this.lb_he_so_nhan.setString(this.ratioFree);
            var sumPrize = this.prizeFree*this.ratioFree;
            this.lb_sum_free.setString(formatMoney(0,3,sumPrize));
            this.pEndMienPhi.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
                if(avenger.pEndMienPhi.isVisible())
                {
                    avenger.pEndMienPhi.setVisible(false);
                }
            })));
        },
        hideEndFree:function()
        {
            if(this.pEndMienPhi.isVisible())
            {
                avenger.pEndMienPhi.setVisible(false);
            }
        }


    }
);

openAvenger = function () {
    if (avenger == null) {
       // //cc.log("----> Create mini game layer first time");
        avenger = new AvengerLayer();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(avenger, BaseScene.INDEX_GAME_GUI, 10);
        avengerSubcribe(Avenger.Content.currentRoom);
    }else
    {
        avenger.setVisible(true);
        avengerSubcribe(Avenger.Content.currentRoom);
        avenger.actionGirl();
    }
    if(menutab)
        menutab.hideAllInfo();
    avengerAppear = true;
    avenger.audioAvenger.playSoundBackGround();


};
closeAvenger = function () {
    if (avenger === null) {
        return;
    }
    if(avengerAppear) {
        closeAvengerLSGD(true);
        closeAvengerBangThuong(true);
        closeAvengerMinigame(true);
        avenger.setVisible(false);

        avengerAppear = false;
        avenger.audioAvenger.stopAllSound();
        menutab.showAllInfoSlots();
        lobby.socketSlot.sendSubScribe();
        avenger.sp_girl.stopAllActions();
        cc.eventManager.removeListener(avenger.customlistener);
        avenger.loadFromContent();
        avenger.removeAllChildren(true);
        avenger.removeFromParent(true);
        avenger = null;
    }

};


avengerSubcribe = function(roomId)
{
    //slot3hang.isSubcribe = true;
    var sendPkm = new AvengerCmdSendSubcribe();
    sendPkm.putCmd(roomId);
    lobby.socketSlot.send(sendPkm);
    sendPkm.clean();


}
avengerUnsubscribe=function(roomId)
{
    var sendKb = new AvengerCmdSendUnsubcribe();
    sendKb.putCmd(roomId);
    lobby.socketSlot.send(sendKb);
    sendKb.clean();
    if(avenger!= null)
        avenger.isAutoRotate = false;
    Avenger.Content.isAutoRotate = false;
    //this.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
},



AvengerLayer.BTN_TU_QUAY = 1;
AvengerLayer.BTN_QUAY = 2;
AvengerLayer.BTN_DUNG_QUAY = 3;


AvengerLayer.BTN_BACK_MUC_DAT = 4;
AvengerLayer.BTN_NEXT_MUC_DAT = 5;

AvengerLayer.BTN_DONG_CHAN = 6;
AvengerLayer.BTN_DONG_LE = 7;
AvengerLayer.BTN_CHON_HET = 8;
AvengerLayer.BTN_CHON_LAI = 9;

AvengerLayer.BTN_LSGD = 10;
AvengerLayer.BTN_LS_TRUNG_HU = 11;
AvengerLayer.BTN_VINH_DANH = 20;
AvengerLayer.BTN_BACK_ALL = 12;
AvengerLayer.BTN_BACK = 13;
AvengerLayer.BTN_NEXT_ALL = 14;
AvengerLayer.BTN_NEXT = 15;

AvengerLayer.BTN_BAN_DO = 16;
AvengerLayer.BTN_THOAT_BAN_DO = 17;
AvengerLayer.BTN_CHOI_THU = 18;
AvengerLayer.BTN_BACK_LOBBY = 19;

AvengerLayer.BTN_BANG_THUONG = 21;
AvengerLayer.BTN_DONG = 22;
AvengerLayer.BTN_MUC_CUOC = 23;
//AvengerLayer.BTN_HUONG_DAN = 24;
AvengerLayer.BTN_TOP_NO_HU = 25;
AvengerLayer.BTN_LICH_SU = 26;
AvengerLayer.BTN_CLOSE_BANG_THUONG = 27;
AvengerLayer.BTN_CLOSE_CHON_DONG = 28;
AvengerLayer.BTN_X2_QUY_THUONG = 29;
AvengerLayer.BTN_SETTING = 30;
AvengerLayer.BTN_AM_THANH = 31;
AvengerLayer.BTN_NHAC_NEN = 32;
AvengerLayer.BTN_AN = 33;



AvengerLayer.BET_VALUE_ROOM1 = 100;
AvengerLayer.BET_VALUE_ROOM2 = 1000;
AvengerLayer.BET_VALUE_ROOM3 = 10000;

AvengerLayer.ROOM1 = 0;
AvengerLayer.ROOM2 = 1;
AvengerLayer.ROOM3 = 2;
