var menutab = null;
var menutabX = null; var menutabY = null;
var menutabAppear = null;
var listHuMoving = null;

var menuinfo = BaseLayer.extend(
    {
        ctor: function () {
            //// panel profile
            this.pn_inbox_mail = null; this.pn_read_mail = null; this.pn_ma_xac_nhan_mail = null;
            this.pAccount = null; this.pTabQuanLy = null; this.pRunEven = null;
            this.pn_setting = null; this.btn_logout = null;
            this.Isingame = false;
            this.pDataRun = null;
            this.vtIcon = 20;
            this.nickname = "nickname1234";

            //Tab Setting
            this.sp_avatar = null; this.lb_user_name = null; this.lb_vip_lever = null; this.lb_exp = null; this.sd_exp = null; this.lb_blance_vin = null;
            this.btn_nap_vin = null; this.lb_blance_xu = null; this.btn_nap_xu = null; this.btn_sercuriry = null; this.btn_lichsugiaodich = null; this.btn_shop = null; this.btn_menu = null;
            this.btn_close_pnsetting = null; this.btn_dieukhoansudung = null; this.btn_gop_y = null; this.btn_sound = null; this.sp_mute = null; this.is_sound = true;
            this.btn_event = null;
            this.sp_quangsang = null;
            this.sp_time_event = null;
            this.txt_event = null;
            this.arrBroadcast = [];
            this.sizeIconW = 74; this.sizeIconH = 75;
            this.linkIconGame = "";
            this.sp_icon_minipoker = null; this.sp_icon_minislot = null; this.sp_icon_khobau = null; this.sp_icon_NDV = null; this.sp_icon_Avenger = null;
            this.lb_hu_minipoker = null; this.lb_hu_minislot = null; this.lb_hu_khobau = null; this.lb_hu_nudiepvien = null; this.lb_hu_avenger = null;
            this.btn_goto_minipoker = null; this.btn_goto_minislot = null; this.btn_goto_khobau = null; this.btn_goto_ndv = null; this.btn_goto_avenger = null;
            this.sp_starhu1 = null; this.sp_starhu2 = null; this.sp_starhu3 = null;

            // panel_thong bao
            this.select_nap_xu = "napvin";
            this.moveInTapQuanLy = false;

            // panel_list_hu
            this.pn_list_hu = null; this.pn_content = null; this.btn_listhu_room1 = null; this.btn_listhu_room2 = null; this.btn_listhu_room3 = null;
            this.lb_listhu_room1 = null; this.lb_listhu_room2 = null; this.lb_listhu_room3 = null; this.isShowHu = false; this.isShowContentHu = false;
            this.Islogout = false;
            this.isRunVinhDanh = false;

            this.gotoToolTip = "";
            this.arrayToolTip = [];

            this.old_minipoker_100 = 0; this.new_minipoker_100 = 0; this.break_minipoker_100 = 0;
            this.old_minipoker_1000 = 0; this.new_minipoker_1000 = 0; this.break_minipoker_1000 = 0;
            this.old_minipoker_10000 = 0; this.new_minipoker_10000 = 0; this.break_minipoker_10000 = 0;
            this.old_poke_100 = 0; this.new_poke_100 = 0; this.break_poke_100 = 0;
            this.old_poke_1000 = 0; this.new_poke_1000 = 0; this.break_poke_1000 = 0;
            this.old_poke_10000 = 0; this.new_poke_10000 = 0; this.break_poke_10000 = 0;
            this.old_khobau_100 = 0; this.new_khobau_100 = 0; this.break_khobau_100 = 0;
            this.old_khobau_1000 = 0; this.new_khobau_1000 = 0; this.break_khobau_1000 = 0;
            this.old_khobau_10000 = 0; this.new_khobau_10000 = 0; this.break_khobau_10000 = 0;
            this.old_ndv_100 = 0; this.new_ndv_100 = 0; this.break_ndv_100 = 0;
            this.old_ndv_1000 = 0; this.new_ndv_1000 = 0; this.break_ndv_1000 = 0;
            this.old_ndv_10000 = 0; this.new_ndv_10000 = 0; this.break_ndv_10000 = 0;
            this.old_avenger_100 = 0; this.new_avenger_100 = 0; this.break_avenger_100 = 0;
            this.old_avenger_1000 = 0; this.new_avenger_1000 = 0; this.break_avenger_1000 = 0;
            this.old_avenger_10000 = 0; this.new_avenger_10000 = 0; this.break_avenger_10000 = 0;
            this.old_vqv_100 = 0; this.new_vqv_100 = 0; this.break_vqv_100 = 0;
            this.old_vqv_1000 = 0; this.new_vqv_1000 = 0; this.break_vqv_1000 = 0;
            this.old_vqv_10000 = 0; this.new_vqv_10000 = 0; this.break_vqv_10000 = 0;
            this.isRunEffectAllHu = false;
            this.isRunEffectHuMinipoker = false; this.isRunEffectHuPokeGo = false; this.isRunEffectHuKhoBau = false;
            this.isRunEffectHuNDV = false; this.isRunEffectHuAvenger = false; this.isRunEffectHuvqv = false;
            this.gotoRoomHu = 100;

            this.hasPot_TLMN = false;
            this.hasPot_SAM = false;
            this.hasPot_3CAY = false;
            this.hasPot_BAICAO = false;
            this.hasPot_BINH = false;

            this.time_Pot_TLMN = 0;
            this.time_Pot_SAM = 0;
            this.time_Pot_3CAY = 0;
            this.time_Pot_BAICAO = 0;
            this.time_Pot_BINH = 0;

            this.isGetConfigBilling = false;
            this.isHuOverChat = false;

            this.vt_TLMN = [0,9]; this.vt_SAM = [1,11]; this.vt_BACAY = [3]; this.vt_BAICAO = [5];this.vt_MAUBINH = [7,10];

            this._super("menuinfo");
            this.initWithBinaryFile("res/AllMenuScene.json");
            return true;
        },
        customizeGUI: function(){
            this.pAccount = this._layout.getChildByName("pAccount");
            this.pn_setting = this._layout.getChildByName("pn_setting");
            this.pn_setting.setScaleY(0);

            this.btn_sound = this.customButton("btn_sound",menuinfo.BTN_SOUND_MENU,this.pn_setting);
            this.sp_mute = this.btn_sound.getChildByName("sp_mute");
            this.sp_mute.setVisible(false);

            // panel Account
            this.pTabQuanLy = this.pAccount.getChildByName("pTabQuanLy");
            this.pRunEven = this.pAccount.getChildByName("pRunEven");
            this.pDataRun = this.pRunEven.getChildByName("pDataRun");
            this.sp_avatar = this.customButton("sp_avatar",menuinfo.CLICKAVATAR,this.pTabQuanLy);
            if(cc.sys.os == cc.sys.OS_WINRT){
                this.sp_avatar.setScale(0.55);
            }

            this.lb_user_name = this.getControl("lb_user_name",this.pTabQuanLy);
            this.lb_vip_lever = this.getControl("lb_vip_lever",this.pTabQuanLy);
            this.lb_exp = this.getControl("lb_exp",this.pTabQuanLy);
            this.sd_exp = this.getControl("sd_exp",this.pTabQuanLy);
            this.lb_blance_vin = this.getControl("lb_blance_vin",this.pTabQuanLy);
            this.btn_nap_vin = this.customButton("btn_nap_vin",menuinfo.BTN_NAP_VIN,this.pTabQuanLy);
            this.lb_blance_xu = this.getControl("lb_blance_xu",this.pTabQuanLy);
            this.btn_nap_xu = this.customButton("btn_nap_xu",menuinfo.BTN_NAP_XU,this.pTabQuanLy);
            this.btn_sercuriry = this.customButton("btn_sercuriry",menuinfo.BTN_SERCURITY,this.pTabQuanLy);
            this.btn_lichsugiaodich = this.customButton("btn_lichsugiaodich",menuinfo.BTN_LICHSUGIAODICH,this.pTabQuanLy);
            this.btn_shop = this.customButton("btn_shop",menuinfo.BTN_SHOP,this.pTabQuanLy);
            this.btn_menu = this.customButton("btn_menu",menuinfo.BTN_MENU, this.pTabQuanLy);
            this.btn_logout = this.customButton("btn_logout",menuinfo.BTN_LOGOUT,this.pTabQuanLy);

            this.btn_event = this.customButton("btn_event",menuinfo.BTN_EVENT,this.pTabQuanLy);

            this.sp_quangsang = this.pTabQuanLy.getChildByName("sp_quangsang");
            var rotateByVT = new cc.RotateBy(2.5, 360);
            this.sp_quangsang.runAction(cc.repeatForever(rotateByVT));
            this.sp_time_event = this.pTabQuanLy.getChildByName("sp_time_event"); this.sp_time_event.setVisible(false);
            this.txt_event = this.pTabQuanLy.getChildByName("txt_event"); this.txt_event.setString("");

            // pnael setting
            this.btn_close_pnsetting = this.customButton("btn_close_pnsetting",menuinfo.BTN_CLOSE_PANEL_SETTING,this.pn_setting);
            this.btn_dieukhoansudung = this.customButton("btn_dieukhoansudung",menuinfo.BTN_DIEUKHOANSUDUNG,this.pn_setting);
            this.btn_gop_y = this.customButton("btn_gop_y",menuinfo.BTN_GOPY,this.pn_setting);

            // panel_list_hu
            this.pn_list_hu = this._layout.getChildByName("pn_list_hu");
            this.pn_list_hu.setPosition(cc.p(this.pn_list_hu.getPositionX(), this.pn_list_hu.getPositionY() - 30));
            if(!cc.sys.isNative)
            {
                this.pn_list_hu.setPosition(cc.p(-205,this.pn_list_hu.getPosition().y));
            }else
            {
                this.pn_list_hu.setPosition(cc.p(this.pn_list_hu.getPosition().x + 150,this.pn_list_hu.getPosition().y));
            }
            this.pn_content = this.getControl("pn_content",this.pn_list_hu); this.pn_content.setVisible(false);
            this.sc_list_hu = this.getControl("sc_list_hu",this.pn_content);
            this.sc_list_hu.setTouchEnabled(true);
            this.sc_list_hu.setClippingEnabled(true);
            this.sc_list_hu.setScrollBarEnabled(false);

            this.pn_content.setScaleY(0);
            this.sp_icon_minipoker = this.sc_list_hu.getChildByName("sp_icon_minipoker");
            this.sp_icon_minislot = this.sc_list_hu.getChildByName("sp_icon_minislot");
            this.sp_icon_khobau = this.sc_list_hu.getChildByName("sp_icon_khobau");
            this.sp_icon_NDV = this.sc_list_hu.getChildByName("sp_icon_NDV");
            this.sp_icon_Avenger = this.sc_list_hu.getChildByName("sp_icon_Avenger");
            this.sp_icon_vqv = this.sc_list_hu.getChildByName("sp_icon_vqv");

            this.lb_hu_minipoker = this.getControl("lb_hu_minipoker",this.sc_list_hu);
            this.lb_hu_minislot = this.getControl("lb_hu_minislot",this.sc_list_hu);
            this.lb_hu_khobau = this.getControl("lb_hu_khobau",this.sc_list_hu);
            this.lb_hu_nudiepvien = this.getControl("lb_hu_nudiepvien",this.sc_list_hu);
            this.lb_hu_avenger = this.getControl("lb_hu_avenger",this.sc_list_hu);
            this.lb_hu_vqv = this.getControl("lb_hu_vqv",this.sc_list_hu);

            this.btn_goto_minipoker = this.customButton("btn_goto_minipoker",menuinfo.BTN_GOTO_MINIPOKER,this.sc_list_hu);
            this.btn_goto_minislot = this.customButton("btn_goto_minislot",menuinfo.BTN_GOTO_MINISLOT,this.sc_list_hu);
            this.btn_goto_khobau = this.customButton("btn_goto_khobau",menuinfo.BTN_GOTO_KHOBAU,this.sc_list_hu);
            this.btn_goto_ndv = this.customButton("btn_goto_ndv",menuinfo.BTN_GOTO_NDV,this.sc_list_hu);
            this.btn_goto_avenger = this.customButton("btn_goto_avenger",menuinfo.BTN_GOTO_AVENGER,this.sc_list_hu);
            this.btn_goto_vqv = this.customButton("btn_goto_vqv",menuinfo.BTN_GOTO_VQV,this.sc_list_hu);

            this.sp_icon_minipoker.setTexture("res/Minigame/mini_poke.png");
            this.sp_icon_minipoker.setScale(0.8);
            this.sp_icon_minislot.setTexture("res/Minigame/poke_ball.png");
            this.sp_icon_minislot.setScale(0.8);
            this.sp_icon_NDV.setTexture("res/Lobby/IconGame/nudiepvien.png");
            this.sp_icon_NDV.setScale(0.28);
            this.sp_icon_Avenger.setTexture("res/Lobby/IconGame/avenger.png");
            this.sp_icon_Avenger.setScale(0.28);
            this.sp_icon_vqv.setTexture("res/Lobby/IconGame/vuongquocvin.png");
            this.sp_icon_vqv.setScale(0.28);

            this.btn_listhu_room1 = this.customButton("btn_listhu_room1",menuinfo.BTN_LIST_HU_ROOM1,this.pn_content);
            this.btn_listhu_room2 = this.customButton("btn_listhu_room2",menuinfo.BTN_LIST_HU_ROOM2,this.pn_content);
            this.btn_listhu_room3 = this.customButton("btn_listhu_room3",menuinfo.BTN_LIST_HU_ROOM3,this.pn_content);
            this.lb_listhu_room1 = this.getControl("lb_listhu_room1",this.pn_content); this.lb_listhu_room1.setColor(cc.color("#FFB600"));
            this.lb_listhu_room2 = this.getControl("lb_listhu_room2",this.pn_content);
            this.lb_listhu_room3 = this.getControl("lb_listhu_room3",this.pn_content);
            this.sp_starhu1 = this.pn_list_hu.getChildByName("sp_starhu1");
            this.sp_starhu2 = this.pn_list_hu.getChildByName("sp_starhu2");
            this.sp_starhu3 = this.pn_list_hu.getChildByName("sp_starhu3");
            this.pn_setting.setVisible(false);
            this.pAccount.setVisible(true);
            this.Islogout = false;
            this.pDataRun.x = 1280;
            this.sp_avatar.setVisible(false);

            this.pn_tooltip = this.pTabQuanLy.getChildByName("pn_tooltip"); this.pn_tooltip.setVisible(false);
            var fadein = cc.fadeIn(0);
            this.pn_tooltip.runAction(fadein);
            this.lb_content_tooltip = this.getControl("lb_content_tooltip",this.pn_tooltip);

            //openpn_otp("");
            this.effectAllHu();

            if(listHuMoving === null){
                listHuMoving = cc.EventListener.create(
                    {
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,
                        startX: 0,
                        startY: 0,
                        deltaMove: 10,
                        onTouchBegan: function (touch, event) {
                            var locationInNode = menutab.pn_list_hu.convertToNodeSpace(touch.getLocation());
                            var s = menutab.pn_list_hu.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {
                                startX = touch.getLocation().x;
                                startY = touch.getLocation().y;
                                return true;
                            }
                            return false;
                        },
                        onTouchMoved: function (touch, event) {
                            var delta = touch.getDelta();
                            menutab.pn_list_hu.x += delta.x;
                            menutab.pn_list_hu.y += delta.y;
                            if(!cc.sys.isNative && lobby.isOpenChat == true) {
                                //menutab.checkListHu_disChat();
                            }
                        },
                        //Process the touch end event
                        onTouchEnded: function (touch, event) {
                            var curX = touch.getLocation().x;
                            var curY = touch.getLocation().y;
                            var dxy = Math.abs(startX - curX) + Math.abs(startY - curY);
                            if(dxy <= this.deltaMove)
                            {
                                menutab.show_list_hu();
                            }
                            if(curX<0)
                            {
                                touch.x =0;
                            }
                            if(curX > 1920)
                            {
                                touch.x =1920;
                            }
                            if(curY<0)
                            {
                                touch.y =0;
                            }
                            if(curY > 1080)
                            {
                                touch.x =1080;
                            }
                        }
                    }
                );
                cc.eventManager.addListener(listHuMoving, this.pn_list_hu);
            }else if(!cc.sys.isNative){
                cc.eventManager.addListener(listHuMoving, this.pn_list_hu);
            }

            var onMovepToolTip = cc.EventListener.create(
                {event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if(menutab.gotoToolTip != target.getName()) {
                                var stt = target.getName().substr(8,target.getName().length);
                                //cc.log("vao roi: " + stt);
                                menutab.gotoToolTip = target.getName();
                                //cc.log("vitri : " + target.x + "y: " + target.y);
                                menutab.pn_tooltip.x = target.x;
                                menutab.pn_tooltip.y = target.y + 50;
                                var fadein = cc.fadeIn(0.3);
                                menutab.pn_tooltip.setVisible(true);
                                menutab.pn_tooltip.stopAllActions();
                                menutab.pn_tooltip.runAction(fadein);
                                for(var i = 0; i< menutab.arrayToolTip.length; i++){
                                    if(i != Number(stt)){
                                        cc.eventManager.pauseTarget( menutab.arrayToolTip[i], true);
                                    }
                                }
                                menutab.lb_content_tooltip.setString(menutab.getNameTooltip(target.getName()));
                            }
                        }else{
                            if(menutab.gotoToolTip == target.getName()) {
                                menutab.gotoToolTip = "";
                                var fadeout = cc.fadeOut(0.3);
                                menutab.pn_tooltip.stopAllActions();
                                menutab.pn_tooltip.runAction(cc.sequence(fadeout,cc.callFunc(function(){
                                    menutab.pn_tooltip.setVisible(false);
                                    menutab.lb_content_tooltip.setString("");
                                })));
                                for(var i = 0; i< menutab.arrayToolTip.length; i++){
                                    cc.eventManager.resumeTarget( menutab.arrayToolTip[i], true);
                                }
                            }
                        }
                    }
                });
            this.btn_logout.setName("Tooltip_0");
            this.sp_avatar.setName("Tooltip_1");
            this.btn_nap_vin.setName("Tooltip_2");
            this.btn_nap_xu.setName("Tooltip_3");
            this.btn_event.setName("Tooltip_4");
            this.btn_sercuriry.setName("Tooltip_5");
            this.btn_lichsugiaodich.setName("Tooltip_6");
            this.btn_shop.setName("Tooltip_7");
            this.btn_menu.setName("Tooltip_8");

            this.arrayToolTip.push(this.btn_logout);
            this.arrayToolTip.push(this.sp_avatar);
            this.arrayToolTip.push(this.btn_nap_vin);
            this.arrayToolTip.push(this.btn_nap_xu);
            this.arrayToolTip.push(this.btn_event);
            this.arrayToolTip.push(this.btn_sercuriry);
            this.arrayToolTip.push(this.btn_lichsugiaodich);
            this.arrayToolTip.push(this.btn_shop);
            this.arrayToolTip.push(this.btn_menu);

            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_logout);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.sp_avatar);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_nap_vin);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_nap_xu);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_event);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_sercuriry);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_lichsugiaodich);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_shop);
            cc.eventManager.addListener(onMovepToolTip.clone(), this.btn_menu);


            var onMovepTabQuanLy = cc.EventListener.create(
                {event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if(this.moveInTapQuanLy == false) {
                                this.moveInTapQuanLy = true;
                                menutab.resumeToolTip();
                            }
                        }else{
                            if(this.moveInTapQuanLy == true) {
                                menutab.pauseToolTip();
                            }
                        }
                    }
                });
            if(!cc.sys.isNative) {
                cc.eventManager.addListener(onMovepTabQuanLy.clone(), this.pTabQuanLy);
            }
            if(cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false) {
                    this.sp_avatar.setEnabled(false);
                    this.btn_nap_vin.setVisible(false);
                    this.btn_nap_xu.setVisible(false);
                    this.btn_event.setVisible(false);
                    this.sp_time_event.setVisible(false);
                    this.txt_event.setString("");
                    this.sp_quangsang.setVisible(false);
                    this.btn_sercuriry.setVisible(false);
                    this.btn_lichsugiaodich.setVisible(false);
                    this.btn_shop.setVisible(false);
                }
            }

            if(lobby.facebook_canvas == true){
                if(lobby.payment_fb == 1) {
                    this.btn_nap_vin.setVisible(false);
                    this.btn_nap_xu.setVisible(false);
                    this.btn_event.setVisible(false);
                    this.btn_shop.setVisible(false);
                    this.txt_event.setString("");
                    this.sp_quangsang.setVisible(false);
                    this.btn_sercuriry.setVisible(false);
                    this.btn_lichsugiaodich.setVisible(false);
                }
            }
            this.setAvatar();
        },
        getNameTooltip : function(value){
            var str = "";
            if(value == "Tooltip_0")
                str = "Thoát game";
            else if(value == "Tooltip_1")
                str = " Hồ sơ ";
            else if(value == "Tooltip_2")
                str = "Nạp Vin";
            else if(value == "Tooltip_3")
                str = " Nạp xu ";
            else if(value == "Tooltip_4")
                str = "Sự kiện";
            else if(value == "Tooltip_5")
                str = " Bảo mật ";
            else if(value == "Tooltip_6")
                str = "Lịch sử giao dịch";
            else if(value == "Tooltip_7")
                str = "Cửa hàng";
            else if(value == "Tooltip_8")
                str = "Thông tin khác";
            return str;
        },
        pauseToolTip : function(){
            for(var i = 0; i< menutab.arrayToolTip.length; i++){
                cc.eventManager.pauseTarget( menutab.arrayToolTip[i], true);
            }
        },
        resumeToolTip : function(){
            for(var i = 0; i< menutab.arrayToolTip.length; i++){
                cc.eventManager.resumeTarget( menutab.arrayToolTip[i], true);
            }
        },
        pauseHeader : function(){
            menutab.pauseToolTip();
            cc.eventManager.pauseTarget( menutab.pTabQuanLy, true);
            menutab.gotoToolTip = "";
            var fadeout = cc.fadeOut(0.3);
            menutab.pn_tooltip.stopAllActions();
            menutab.pn_tooltip.runAction(cc.sequence(fadeout,cc.callFunc(function(){
                menutab.pn_tooltip.setVisible(false);
                menutab.lb_content_tooltip.setString("");
            })));
            if(lobby.isOpenChat == true){
                //lobby.tf_chat_lobby.setVisible(false);
            }
        },

        resumeHeader : function(){
            cc.eventManager.resumeTarget( menutab.pTabQuanLy, true);
            if(lobby.isOpenChat == true && ischeckPosition == false && menutab.isHuOverChat == false){
                //lobby.tf_chat_lobby.setVisible(true);
            }
        },

        setAvatar : function () {
            menutab.sp_avatar.loadTextureNormal(menutab.getlinkAvatar(lobby.userInfo.avatar));
            menutab.sp_avatar.loadTexturePressed(menutab.getlinkAvatar(lobby.userInfo.avatar));
            menutab.sp_avatar.loadTextureDisabled(menutab.getlinkAvatar(lobby.userInfo.avatar));
            menutab.sp_avatar.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function(){
                menutab.sp_avatar.setVisible(true);
            })));
            menutab.pn_list_hu.setVisible(true);
            menutab.lb_user_name.setString(lobby.userInfo.nickname);
            checkVipPoint(lobby.userInfo.vippointSave);
            menutab.sd_exp.setPercent(lobby.percentVP);
            //cc.log("money " + lobby.userInfo.vinTotal);

            menutab.lb_blance_vin.setString(formatMoney(0,3,lobby.userInfo.vinTotal));
            menutab.lb_blance_xu.setString(formatMoney(0,3,lobby.userInfo.xuTotal));

            this.changeFontMoney();
        },

        changeFontMoney : function(){
            if(lobby.userInfo.vinTotal >= 10000000000 && lobby.userInfo.vinTotal < 100000000000)
                menutab.lb_blance_vin.setFontSize(22);
            else if(lobby.userInfo.vinTotal >= 100000000000)
                menutab.lb_blance_vin.setFontSize(21);
            else
                menutab.lb_blance_vin.setFontSize(23);

            if(lobby.userInfo.xuTotal >= 10000000000 && lobby.userInfo.xuTotal < 100000000000)
                menutab.lb_blance_xu.setFontSize(22);
            else if(lobby.userInfo.xuTotal >= 100000000000)
                menutab.lb_blance_xu.setFontSize(21);
            else
                menutab.lb_blance_xu.setFontSize(23);
        },
        showAllInfo: function()
        {
            //cc.log("showAllInfo");
            this.pAccount.setVisible(true);
            this.pn_list_hu.setVisible(true);
            lobby.lv_menu.setVisible(true);
            //lobby.pn_chat_event.setVisible(true);
            this.resumeHeader();
            lobby.btn_vipcode.setEnabled(true);
            lobby.btn_fanpage.setEnabled(true);
            lobby.btn_chuyen_menu.setVisible(true);
            this.startTime_outGameBai();
            if(menutab.isShowContentHu == true){
                menutab.funSubcribleJacport();
            }
        },
        showAllInfoSlots:function()
        {
            this.pAccount.setVisible(true);
            this.pn_list_hu.setVisible(true);
            //lobby.lv_menu.setVisible(true);
            //lobby.pn_chat_event.setVisible(true);
            lobby.btn_chuyen_menu.setVisible(true);
            this.resumeHeader();
            lobby.btn_vipcode.setEnabled(true);
            lobby.btn_fanpage.setEnabled(true);
            this.startTime_outGameBai();
            if(menutab.isShowContentHu == true){
                menutab.funSubcribleJacport();
            }
        },
        showTopInfo: function()
        {
            this.pAccount.setVisible(true);
            this.resumeHeader();
            //lobby.pn_chat_event.setVisible(true);
        },
        hideAllInfo: function(){
            this.pAccount.setVisible(false);
            this.pn_list_hu.setVisible(false);
            lobby.lv_menu.setVisible(false);
            //lobby.pn_chat_event.setVisible(false);
            lobby.btn_chuyen_menu.setVisible(false);
            this.pauseHeader();
            if(menutab.isShowContentHu == true){
                menutab.funUnsubcribleJacport();
            }
        },
        gotoLobbyGameBai : function(){
            lobby.lv_menu.setVisible(false);
            //lobby.pn_chat_event.setVisible(false);
            //lobby.btn_vipcode.setEnabled(false);
            lobby.btn_fanpage.setEnabled(false);
            lobby.btn_chuyen_menu.setVisible(false);
            if(menutab.isShowContentHu == true){
                menutab.funUnsubcribleJacport();
            }
        },
        checkSoundMenu : function(){
            if(this.is_sound == true){
                this.sp_mute.setVisible(true);
                this.is_sound = false;
                lobby.audioMenuSlots.offSoundEffect();

            }else {
                this.sp_mute.setVisible(false);
                this.is_sound = true;
                lobby.audioMenuSlots.onSoundEffect();
            }
        },

        onButtonRelease: function(button,id) {
            switch (id) {
                case menuinfo.BTN_GOTO_MINIPOKER:
                    loadResoureGame(g_resources_mn_poker,miniPoker,function() {
                        if (Minigame.isLoginSocket) {
                            if (!miniPokerAppear) {
                                openMiniPoker();
                                if (miniPoker.autoRotate == false) {
                                    subScribeMiniPoker(miniPoker.MINI_POKER_ROOM);
                                }
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_POKER;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    });
                    break;
                case menuinfo.BTN_GOTO_MINISLOT:
                    loadResoureGame(g_resources_mn_pokego,slot3hang,function() {
                        if (Minigame.isLoginSocket) {
                            if (!slot3hangAppear) {
                                openslot3hang();
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_MINI_SLOT;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    });
                    break;
                case menuinfo.BTN_GOTO_KHOBAU:
                    //if(lobby.facebook_canvas == false)
                    //    this.GotoSlotFromList(6);
                    lobby.isMenuSlots = true;
                    lobby.chuyenMenu();
                    lobby.socketSlot.openGame = "khobau";
                    break;
                case menuinfo.BTN_GOTO_NDV:
                    //if(lobby.facebook_canvas == false)
                    //    this.GotoSlotFromList(4);
                    lobby.isMenuSlots = true;
                    lobby.chuyenMenu();
                    lobby.socketSlot.openGame = "nudiepvien";
                    break;
                case menuinfo.BTN_GOTO_AVENGER:
                    //if(lobby.facebook_canvas == false)
                    //    this.GotoSlotFromList(2);
                    lobby.isMenuSlots = true;
                    lobby.chuyenMenu();
                    lobby.socketSlot.openGame = "sieuanhhung";
                    break;
                case menuinfo.BTN_GOTO_VQV:
                    lobby.isMenuSlots = true;
                    lobby.chuyenMenu();
                    lobby.socketSlot.openGame = "vuongquocvin";
                    break;
                case menuinfo.BTN_NAP_VIN:
                    if(this.isGetConfigBilling == false){
                        menutab.select_nap_xu = "napvin";
                        openshopping_info();
                    } else {
                        if (lobby.is_recharge_card_game == 0 || lobby.is_recharge_bank == 0) {
                            menutab.select_nap_xu = "napvin";
                            openshopping_info();
                        }
                    }
                    break;
                case menuinfo.BTN_NAP_XU:
                    if(this.isGetConfigBilling == false){
                        menutab.select_nap_xu = "napxu";
                        openshopping_info_xu();
                    } else {
                        if (lobby.is_recharge_xu == 0) {
                            //cc.log("vao");
                            menutab.select_nap_xu = "napxu";
                            openshopping_info_xu();
                        }
                    }
                    break;
                case menuinfo.BTN_SERCURITY:
                    if (Minigame.isLoginSocket) {
                        //cc.log("open");
                        opensercurity_info();
                    }
                    break;
                case menuinfo.BTN_LICHSUGIAODICH:
                    //openmail_info();
                    openhistory_tranfer();
                    break;
                case menuinfo.BTN_SHOP:
                    if(this.isGetConfigBilling == false) {
                        menutab.select_nap_xu = "FIRST_GO_TO";
                        openshopping_info();
                    }else{
                        openshopping_info();
                    }
                    break;
                case menuinfo.BTN_MENU:
                    menutab.pn_setting.setVisible(true);
                    menutab.pn_setting.runAction(cc.scaleTo(0.15,1,1));
                    break;
                    break;
                case menuinfo.BTN_CLOSE_PANEL_SETTING:
                    menutab.pn_setting.runAction(cc.scaleTo(0.15,1,0));
                    menutab.pn_setting.setVisible(false);
                    break;
                case menuinfo.BTN_DIEUKHOANSUDUNG:
                    opendieukhoan();
                    menutab.pn_setting.runAction(cc.scaleTo(0.15,1,0));
                    menutab.pn_setting.setVisible(false);
                    break;
                case menuinfo.BTN_GOPY:
                    popup.openPanel_Alert_Lobby("Chức năng này đang xây dựng!");
                    menutab.pn_setting.runAction(cc.scaleTo(0.2,1,0));
                    menutab.pn_setting.setVisible(false);
                    break;
                case menuinfo.BTN_SOUND_MENU:
                    this.checkSoundMenu();
                    menutab.pn_setting.runAction(cc.scaleTo(0.2,1,0));
                    menutab.pn_setting.setVisible(false);
                    break;
                case menuinfo.BTN_LOGOUT:
                    if(lobby.IsRegister == true) {
                        lobby.tf_user_name_dk.setVisible(true); lobby.tf_mat_khau_dk.setVisible(true);
                        lobby.tf_nhap_lai_mk_dk.setVisible(true); lobby.tf_ma_xac_nhan_dk.setVisible(true);
                        lobby.IsRegister = false;
                    }
                    if(GameManager.getInstance().inGame == false) {
                        menutab.Islogout = true;
                        popup.open_panel_message_confirm("THÔNG BÁO","Bạn có chắc chắn muốn thoát game!","ĐỒNG Ý","HỦY", this.logout, this.Cancellogout);
                    }else{
                        GameManager.getInstance().clickOnBack();
                        menutab.Isingame = false;
                        //menutab.showAllInfo();
                    }
                    break;
                case menuinfo.BTN_LIST_HU_ROOM1:
                    this.lb_listhu_room1.setColor(cc.color("#FFB600")); this.lb_listhu_room2.setColor(cc.color("#FFFFFF")); this.lb_listhu_room3.setColor(cc.color("#FFFFFF"));
                    this.gotoRoomHu = 100;
                    this.lb_hu_minipoker.setString(formatMoney(0,3,this.new_minipoker_100));
                    this.lb_hu_minislot.setString(formatMoney(0,3,this.new_poke_100));
                    this.lb_hu_khobau.setString(formatMoney(0,3,this.new_khobau_100));
                    this.lb_hu_nudiepvien.setString(formatMoney(0,3,this.new_ndv_100));
                    this.lb_hu_avenger.setString(formatMoney(0,3,this.new_avenger_100));
                    this.lb_hu_vqv.setString(formatMoney(0,3,this.new_vqv_100));

                    this.old_minipoker_100 = this.new_minipoker_100;
                    this.old_poke_100 = this.new_poke_100;
                    this.old_khobau_100 = this.new_khobau_100;
                    this.old_ndv_100 = this.new_ndv_100;
                    this.old_avenger_100 = this.new_avenger_100;
                    this.old_vqv_100 = this.new_vqv_100;
                    if(this.new_minipoker_100 == 0) {
                        this.lb_hu_minipoker.setString("500.000");
                        this.old_minipoker_100 = 500000;
                    }
                    if(this.new_poke_100 == 0) {
                        this.lb_hu_minislot.setString("500.000");
                        this.old_poke_100 = 500000;
                    }
                    if(this.new_khobau_100 == 0) {
                        this.lb_hu_khobau.setString("500.000");
                        this.old_khobau_100 = 0;
                    }
                    if(this.new_ndv_100 == 0) {
                        this.lb_hu_nudiepvien.setString("500.000");
                        this.old_ndv_100 = 0;
                    }
                    if(this.new_avenger_100 == 0) {
                        this.lb_hu_avenger.setString("500.000");
                        this.old_avenger_100 = 0;
                    }
                    if(this.new_vqv_100 == 0) {
                        this.lb_hu_vqv.setString("500.000");
                        this.old_vqv_100 = 0;
                    }
                    break;
                case menuinfo.BTN_LIST_HU_ROOM2:
                    this.lb_listhu_room1.setColor(cc.color("#FFFFFF")); this.lb_listhu_room2.setColor(cc.color("#FFB600")); this.lb_listhu_room3.setColor(cc.color("#FFFFFF"));
                    this.gotoRoomHu = 1000;
                    this.lb_hu_minipoker.setString(formatMoney(0,3,this.new_minipoker_1000));
                    this.lb_hu_minislot.setString(formatMoney(0,3,this.new_poke_1000));
                    this.lb_hu_khobau.setString(formatMoney(0,3,this.new_khobau_1000));
                    this.lb_hu_nudiepvien.setString(formatMoney(0,3,this.new_ndv_1000));
                    this.lb_hu_avenger.setString(formatMoney(0,3,this.new_avenger_1000));
                    this.lb_hu_vqv.setString(formatMoney(0,3,this.new_vqv_1000));

                    this.old_minipoker_1000 = this.new_minipoker_1000;
                    this.old_poke_1000 = this.new_poke_1000;
                    this.old_khobau_1000 = this.new_khobau_1000;
                    this.old_ndv_1000 = this.new_ndv_1000;
                    this.old_avenger_1000 = this.new_avenger_1000;
                    this.old_vqv_1000 = this.new_vqv_1000;

                    if(this.new_minipoker_1000 == 0) {
                        this.lb_hu_minipoker.setString("5.000.000");
                        this.old_minipoker_1000 = 5000000;
                    }
                    if(this.new_poke_1000 == 0) {
                        this.lb_hu_minislot.setString("5.000.000");
                        this.old_poke_1000 = 5000000;
                    }
                    if(this.new_khobau_1000 == 0) {
                        this.lb_hu_khobau.setString("5.000.000");
                        this.old_khobau_1000 = 0;
                    }
                    if(this.new_ndv_1000 == 0) {
                        this.lb_hu_nudiepvien.setString("5.000.000");
                        this.old_ndv_1000 = 0;
                    }
                    if(this.new_avenger_1000 == 0) {
                        this.lb_hu_avenger.setString("5.000.000");
                        this.old_avenger_1000 = 0;
                    }
                    if(this.new_vqv_1000 == 0) {
                        this.lb_hu_vqv.setString("5.000.000");
                        this.old_vqv_1000 = 0;
                    }
                    break;
                case menuinfo.BTN_LIST_HU_ROOM3:
                    this.lb_listhu_room1.setColor(cc.color("#FFFFFF")); this.lb_listhu_room2.setColor(cc.color("#FFFFFF")); this.lb_listhu_room3.setColor(cc.color("#FFB600"));
                    this.gotoRoomHu = 10000;
                    this.lb_hu_minipoker.setString(formatMoney(0,3,this.new_minipoker_10000));
                    this.lb_hu_minislot.setString(formatMoney(0,3,this.new_poke_10000));
                    this.lb_hu_khobau.setString(formatMoney(0,3,this.new_khobau_10000));
                    this.lb_hu_nudiepvien.setString(formatMoney(0,3,this.new_ndv_10000));
                    this.lb_hu_avenger.setString(formatMoney(0,3,this.new_avenger_10000));
                    this.lb_hu_vqv.setString(formatMoney(0,3,this.new_vqv_10000));

                    this.old_minipoker_10000 = this.new_minipoker_10000;
                    this.old_poke_10000 = this.new_poke_10000;
                    this.old_khobau_10000 = this.new_khobau_10000;
                    this.old_ndv_10000 = this.new_ndv_10000;
                    this.old_avenger_10000 = this.new_avenger_10000;
                    this.old_vqv_10000 = this.new_vqv_10000;

                    if(this.new_minipoker_10000 == 0) {
                        this.lb_hu_minipoker.setString("50.000.000");
                        this.old_minipoker_10000 = 50000000;
                    }
                    if(this.new_poke_10000 == 0) {
                        this.lb_hu_minislot.setString("50.000.000");
                        this.old_poke_10000 = 50000000;
                    }
                    if(this.new_khobau_10000 == 0) {
                        this.lb_hu_khobau.setString("50.000.000");
                        this.old_khobau_10000 = 0;
                    }
                    if(this.new_ndv_10000 == 0) {
                        this.lb_hu_nudiepvien.setString("50.000.000");
                        this.old_ndv_10000 = 0;
                    }
                    if(this.new_avenger_10000 == 0) {
                        this.lb_hu_avenger.setString("50.000.000");
                        this.old_avenger_10000 = 0;
                    }
                    if(this.new_vqv_10000 == 0) {
                        this.lb_hu_vqv.setString("50.000.000");
                        this.old_vqv_10000 = 0;
                    }
                    break;
                case menuinfo.CLICKAVATAR:
                    openprofileUser();
                    break;
                case menuinfo.BTN_EVENT:
                    openEvent_Vip();
                    break;
            }
        },
        GotoSlotFromList : function(tag){
            if (lobby.userInfo == null) {
                popup.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
            } else {
                menutab.Isingame = true;
                menutab.pn_list_hu.setVisible(false);
                var gameNumber = tag;
                menutab.stopTime_gotoGameBai();

                var kk = mapTagToGameType["" + gameNumber];
                if (mapTagToGameType["" + gameNumber] != undefined) {
                    GameManager.getInstance().initAndOpenGame(parseInt(mapTagToGameType["" + gameNumber]));
                }
                else {
                    popup.openPanel_Alert_Lobby("Game sắp ra mắt.");
                }
            }
        },
		logout : function(){
            menutab.Islogout = true;
            Logout_lobby();
            Minigame.miniGameClient.closeSocket();
            if(lobby.socketSlot && lobby.socketSlot.isConnected)
                lobby.socketSlot.closeSocket();
            lobby.btn_chuyen_menu.setVisible(false);
            lobby.userInfo = null;
            menutab.pn_list_hu.setVisible(false);
            lobby.pn_chat.setVisible(false);
            lobby.btn_chat.setVisible(false); lobby.btn_event.setVisible(false);
            //lobby.tf_user_name_tab.setVisible(true); lobby.tf_pass_tab.setVisible(true);
            lobby.savePassword = "";
            lobby.islogin = false;
            if(sercurity_info != null)
                sercurity_info.isClickActiveMail = false;
            if(shopping_info != null) {
                shopping_info.numberFail = 0;
                shopping_info.numberFail_vinplay = 0;
                shopping_info.numberFail_mega = 0;
                shopping_info.isfirtgetNapBank = false;
                shopping_info.isfirtgetConfigBilling = false;
                shopping_info.pn_in_app_purchase.setVisible(false);
                shopping_info.sp_nap_vin_shop.setVisible(true);
                shopping_info.sp_nap_xu_shop.setVisible(true);
                shopping_info.sp_tieu_vin_shop.setVisible(true);
                shopping_info.btn_nap_vin_shop.setVisible(true);
                shopping_info.btn_nap_xu_shop.setVisible(true);
                shopping_info.btn_tieu_vin_shop.setVisible(true);
                shopping_info.txt_tieuvin.setString("Tiêu Vin");
                shopping_info.txt_napxu.setString("Nạp  Xu");
                shopping_info.txt_napvin.setString("Nạp Vin");
            }
            if(chuyenkhoan != null)
                chuyenkhoan.isfirstChuyenKhoan = false;
            Minigame.isfirstReadMail = false;
            menutab.select_nap_xu = "napvin";

            lobby.pn_chat.setVisible(false);
            lobby.pn_event.setVisible(true);
            if(lobby.isOpenChat == true){
                lobby.tf_chat_lobby.setVisible(false);
            }
            lobby.isDaiLy = false;
            lobby.isBanVinhvien = false;
            if(vongquay != null) {
                vongquay.pn_tanthu.setScale(0);
                vongquay.pn_tanthu.setVisible(false);
            }
        },
        Cancellogout : function(){
            menutab.Islogout = false;
        },

        responseBroadcastMessage : function(message){
            //cc.log("message " + message);
            var jsonData = JSON.parse(message);

            if(menutab.arrBroadcast!=null)
                while(menutab.arrBroadcast.length > 0) {
                    menutab.arrBroadcast.pop();
                }
            var RunEvent = jsonData["entries"];
            if(RunEvent == null || RunEvent == "") {
            }else{
                for (var i = 0; i < RunEvent.length; i++) {
                    var counter = RunEvent[i];
                    menutab.arrBroadcast.push(counter);
                }
                menutab.insertDataToRunEvent();
            }
        },
        insertDataToRunEvent : function(){
            menutab.pDataRun.removeAllChildren();
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i < this.arrBroadcast.length; i++){
                var namegame = this.checkIconGame(this.arrBroadcast[i].g);
                var lbgame = cc.LabelTTF.create();
                lbgame.string = namegame;
                lbgame.fontName = fonts.fontName;
                lbgame.fontSize = 15;
                lbgame.textAlign = cc.TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                //var lbgame = cc.LabelTTF.create(namegame, fonts.fontName, 15,cc.size(135,30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                //lbgame.setName("lbnickname_" + i);
                this.vtIcon = this.vtIcon + (lbgame.width/2);
                lbgame.setColor(cc.color("#ffe600"));
                lbgame.setPosition(cc.p(this.vtIcon, 20));
                menutab.pDataRun.addChild(lbgame);

                var str = this.arrBroadcast[i].n;

                if(menutab.pDataRun.getChildByName("lbnickname_"+i) == null) {
                    //var lbnickname = cc.LabelTTF.create(str, fonts.fontName, 15, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    var lbnickname = cc.LabelTTF.create();
                    lbnickname.string = str;
                    lbnickname.fontName = fonts.fontName;
                    lbnickname.fontSize = 15;
                    lbnickname.textAlign = cc.TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    lbnickname.setName("lbnickname_" + i);
                    this.vtIcon = this.vtIcon + (lbgame.width/2) + 5 + (lbnickname.width/2);
                    lbnickname.setColor(cc.color("#ff0054"));
                    lbnickname.setPosition(cc.p(this.vtIcon, 20));
                    menutab.pDataRun.addChild(lbnickname);
                }

                var strThang = "thắng";

                if(menutab.pDataRun.getChildByName("lbthang_"+i) == null) {
                    //var lbthang = cc.LabelTTF.create(strThang, fonts.fontName, 15, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    var lbthang = cc.LabelTTF.create();
                    lbthang.string = strThang;
                    lbthang.fontName = fonts.fontName;
                    lbthang.fontSize = 15;
                    lbthang.textAlign = cc.TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    lbthang.setName("lbthang_" + i);
                   // lbthang.setString(" thắng ");
                    lbthang.setColor(cc.color("#ffffff"));
                    this.vtIcon = this.vtIcon + (lbnickname.width/2) + 2 + (lbthang.width/2);
                    lbthang.setPosition(cc.p(this.vtIcon, 20));
                    menutab.pDataRun.addChild(lbthang);
                }

                var strMoney = formatMoney(0,3,this.arrBroadcast[i].m);

                if(menutab.pDataRun.getChildByName("lbmoney_"+i) == null) {
                    //var lbmoney = cc.LabelTTF.create(strMoney, fonts.fontName, 16, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    var lbmoney = cc.LabelTTF.create();
                    lbmoney.string = strMoney;
                    lbmoney.fontName = fonts.fontName;
                    lbmoney.fontSize = 15;
                    lbmoney.textAlign = cc.TEXT_ALIGNMENT_CENTER|cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                    //lbmoney.setString(strMoney);
                    lbmoney.setName("lbmoney_" + i);
                    lbmoney.setColor(cc.color("#E702FE"));
                    this.vtIcon = this.vtIcon + (lbthang.width/2) + 2 + (lbmoney.width/2)
                    lbmoney.setPosition(cc.p(this.vtIcon, 20));
                    menutab.pDataRun.addChild(lbmoney);
                }

                this.vtIcon = this.vtIcon + (lbmoney.width/2) + 80;
                //cc.log(i + "5");
            }
            this.vtIcon = 20;
            if(this.isRunVinhDanh == false) {
                this.runDataEvent();
            }
        },

        checkIconGame : function(value){
            var str = "";
            if(value == 1){
                str = "(MiniPoker)";
            }else if(value == 2){
                str = "(TaiXiu)";
            }else if(value == 3){
                str = "(BauCua)";
            }else if(value == 4){
                str = "(CaoThap)";
            }else if(value == 5){
                str = "(PokeGo)";
            }else if(value == 7){
                str = "(VQMM)";
            }else if(value == 8){
                str = "(Sam)";
            }else if(value == 9){
                str = "(BaCay)";
            }else if(value == 10){
                str = "(MauBinh)";
            }else if(value == 11){
                str = "(TLMN)";
            }else if(value == 12){
                str = "(TaLa)";
            }else if(value == 13){
                str = "(Lieng)";
            }else if(value == 14){
                str = "(XiTo)";
            }else if(value == 15){
                str = "(XocXoc)";
            }else if(value == 16){
                str = "(BaiCao)";
            }else if(value == 17){
                str = "(Poker)";
            }else if(value == 18){
                str = "(SieuAnhHung)";
            }else if(value == 19){
                str = "(MyNhanNgu)";
            }else if(value == 20){
                str = "(KhoBau)";
            }else if(value == 21){
                str = "(NuDiepVien)";
            }else if(value == 22){
                str = "(VuongQuocVin)";
            }
            //cc.log("ten game : " + str);
            return str;
        },

        runDataEvent : function(){
            this.isRunVinhDanh = true;
            this.pDataRun.stopAllActions();
            var move = cc.MoveTo.create(80, cc.p(this.pDataRun.x - 8200, this.pDataRun.y));
            this.pDataRun.runAction(cc.sequence(move,cc.callFunc(function(){
                menutab.pDataRun.x = 1280;
                menutab.nickname = "nickname";
                for(var i = 1; i < 21; i++){
                    if(menutab.pDataRun.getChildByName("icon_" + i) != null){
                        var icon = menutab.pDataRun.getChildByName("icon_" + i);
                        icon.setScale(0);
                        // set lai texture game type
                    }
                    if(menutab.pDataRun.getChildByName("lbnickname_" + i) != null){
                        var lbnickname = menutab.pDataRun.getChildByName("lbnickname_" + i);
                        lbnickname.setString("");
                    }
                    if(menutab.pDataRun.getChildByName("lbmoney_" + i) != null){
                        var lbmoney = menutab.pDataRun.getChildByName("lbmoney_" + i);
                        lbmoney.setString("");
                    }
                }
            }),cc.delayTime(0.5),cc.callFunc(function(){
                menutab.isRunVinhDanh = false;
            })));
        },

        getlinkAvatar : function (value){
            for(var i = 0; i < 12; i ++){
                if(value == i) {
                    return "res/common/avatar/Avatar_" + (i + 1) + ".png";
                }
            }
        },

        effectAllHu : function (){
            var fadeInStar = new cc.FadeIn(1.2);
            var fadeOutStar = new cc.FadeOut(1.2);
            var spawnIn = cc.spawn(fadeOutStar,cc.scaleTo(1.2,0));
            var spawnOut = cc.spawn(fadeInStar,cc.scaleTo(1.2,1));
            var sequence = cc.sequence(spawnIn,cc.delayTime(0.3),spawnOut);
            menutab.sp_starhu1.runAction(cc.repeatForever(sequence));

            var fadeInStar2 = new cc.FadeIn(1);
            var fadeOutStar2 = new cc.FadeOut(1);
            var spawnIn2 = cc.spawn(fadeOutStar2,cc.scaleTo(1,0));
            var spawnOut2 = cc.spawn(fadeInStar2,cc.scaleTo(1,0.8));
            var sequence2 = cc.sequence(spawnOut2,cc.delayTime(0.5),spawnIn2);
            menutab.sp_starhu2.runAction(cc.repeatForever(sequence2));

            var fadeInStar3 = new cc.FadeIn(0.7);
            var fadeOutStar3 = new cc.FadeOut(0.7);
            var spawnIn3 = cc.spawn(fadeOutStar3,cc.scaleTo(0.7,0));
            var spawnOut3 = cc.spawn(fadeInStar3,cc.scaleTo(0.7,0.4));
            var sequence3 = cc.sequence(spawnIn3,cc.delayTime(0),spawnOut3);
            menutab.sp_starhu3.runAction(cc.repeatForever(sequence3));
        },
        show_list_hu : function () {
            if(menutab.isShowContentHu == false) {
                menutab.pn_content.setVisible(true);
                menutab.pn_content.runAction(cc.scaleTo(0.2, 1, 1)); menutab.isShowContentHu = true;
                this.funSubcribleJacport();
            }else{
                menutab.pn_content.setVisible(false);
                menutab.pn_content.runAction(cc.scaleTo(0.2, 1, 0)); menutab.isShowContentHu = false;
                this.funUnsubcribleJacport();
            }
            if(!cc.sys.isNative && lobby.isOpenChat == true) {
               // menutab.checkListHu_disChat();
            }
        },
        close_list_hu : function(){
            menutab.pn_content.setVisible(false);
            menutab.pn_content.runAction(cc.scaleTo(0.2, 1, 0)); menutab.isShowContentHu = false;
        },
        checkListHu_disChat : function(){
            if(ischeckPosition == false) {
                if (menutab.isShowContentHu == false) {
                    if (menutab.pn_list_hu.x > 40 && menutab.pn_list_hu.x < 245) {
                        if (menutab.pn_list_hu.y > 115 && menutab.pn_list_hu.y < 213) {
                            lobby.tf_chat_lobby.setVisible(false);
                            menutab.isHuOverChat = true;
                        } else {
                            lobby.tf_chat_lobby.setVisible(true);
                            menutab.isHuOverChat = false;
                        }
                    } else {
                        lobby.tf_chat_lobby.setVisible(true);
                        menutab.isHuOverChat = false;
                    }
                } else {
                    if (menutab.pn_list_hu.x > -88 && menutab.pn_list_hu.x < 390) {
                        if (menutab.pn_list_hu.y > 115 && menutab.pn_list_hu.y < 639) {
                            lobby.tf_chat_lobby.setVisible(false);
                            menutab.isHuOverChat = true;
                        } else {
                            lobby.tf_chat_lobby.setVisible(true);
                            menutab.isHuOverChat = false;
                        }
                    } else {
                        lobby.tf_chat_lobby.setVisible(true);
                        menutab.isHuOverChat = false;
                    }
                }
            }else{
                if (menutab.isShowContentHu == false) {
                    if (menutab.pn_list_hu.x > 40 && menutab.pn_list_hu.x < 245) {
                        if (menutab.pn_list_hu.y > 115 && menutab.pn_list_hu.y < 213) {
                            menutab.isHuOverChat = true;
                        } else {
                            menutab.isHuOverChat = false;
                        }
                    } else {
                        menutab.isHuOverChat = false;
                    }
                } else {
                    if (menutab.pn_list_hu.x > -88 && menutab.pn_list_hu.x < 390) {
                        if (menutab.pn_list_hu.y > 115 && menutab.pn_list_hu.y < 639) {
                            menutab.isHuOverChat = true;
                        } else {
                            menutab.isHuOverChat = false;
                        }
                    } else {
                        menutab.isHuOverChat = false;
                    }
                }
            }
        },

        responseUpdateJackpot : function(miniPoker100, miniPoker1000, miniPoker10000, pokeGo100, pokeGo1000, pokeGo10000, khoBau100, khoBau1000, khoBau10000,NDV100, NDV1000, NDV10000, Avengers100, Avengers1000, Avengers10000, VQV100, VQV1000, VQV10000) {
            //cc.log("miniPoker100 : " + miniPoker100 + " miniPoker1000 : " + miniPoker1000 + " miniPoker10000 : " + miniPoker10000 +
            //    "\n pokeGo100 : " + pokeGo100 + " pokeGo1000 :" + pokeGo1000 + " pokeGo10000 :" + pokeGo10000 +
            //    "\n khoBau100 : " + khoBau100 + " khoBau1000 :" + khoBau1000 + " khoBau10000 : " + khoBau10000+
            // "\n NDV 100: " + NDV100 + " NDV 1000: " + NDV1000 + " NDV 10000: " + NDV10000 +
            //"\n Avenger 100: " + Avengers100 + " Avenger 1000: " + Avengers1000 + " Avenger 10000: " + Avengers10000);

            miniPoker100 = parseFloat(miniPoker100); miniPoker1000 = parseFloat(miniPoker1000); miniPoker10000 = parseFloat(miniPoker10000);
            pokeGo100 = parseFloat(pokeGo100); pokeGo1000 = parseFloat(pokeGo1000); pokeGo10000 = parseFloat(pokeGo10000);
            khoBau100 = parseFloat(khoBau100); khoBau1000 = parseFloat(khoBau1000); khoBau10000 = parseFloat(khoBau10000);
            Avengers100 = parseFloat(Avengers100); Avengers1000 = parseFloat(Avengers1000); Avengers10000 = parseFloat(Avengers10000);
            VQV100 = parseFloat(VQV100); VQV1000 = parseFloat(VQV1000); VQV10000 = parseFloat(VQV10000);

            this.new_minipoker_100 = miniPoker100;
            this.new_minipoker_1000 = miniPoker1000;
            this.new_minipoker_10000 = miniPoker10000;
            this.new_poke_100 = pokeGo100;
            this.new_poke_1000 = pokeGo1000;
            this.new_poke_10000 = pokeGo10000;
            this.new_khobau_100 = khoBau100;
            this.new_khobau_1000 = khoBau1000;
            this.new_khobau_10000 = khoBau10000;
            this.new_ndv_100 = NDV100;
            this.new_ndv_1000 = NDV1000;
            this.new_ndv_10000 = NDV10000;
            this.new_avenger_100 = Avengers100;
            this.new_avenger_1000 = Avengers1000;
            this.new_avenger_10000 = Avengers10000;
            this.new_vqv_100 = VQV100;
            this.new_vqv_1000 = VQV1000;
            this.new_vqv_10000 = VQV10000;

            this.break_minipoker_100 = parseInt((this.new_minipoker_100 - this.old_minipoker_100) / 10);
            this.break_minipoker_1000 = parseInt((this.new_minipoker_1000 - this.old_minipoker_1000) / 10);
            this.break_minipoker_10000 = parseInt((this.new_minipoker_10000 - this.old_minipoker_10000) / 10);

            this.break_poke_100 = parseInt((this.new_poke_100 - this.old_poke_100) / 10);
            this.break_poke_1000 = parseInt((this.new_poke_1000 - this.old_poke_1000) / 10);
            this.break_poke_10000 = parseInt((this.new_poke_10000 - this.old_poke_10000) / 10);

            this.break_khobau_100 = parseInt((this.new_khobau_100 - this.old_khobau_100) / 10);
            this.break_khobau_1000 = parseInt((this.new_khobau_1000 - this.old_khobau_1000) / 10);
            this.break_khobau_10000 = parseInt((this.new_khobau_10000 - this.old_khobau_10000) / 10);

            this.break_ndv_100 = parseInt((this.new_ndv_100 - this.old_ndv_100) / 10);
            this.break_ndv_1000 = parseInt((this.new_ndv_1000 - this.old_ndv_1000) / 10);
            this.break_ndv_10000 = parseInt((this.new_ndv_10000 - this.old_ndv_10000) / 10);

            this.break_avenger_100 = parseInt((this.new_avenger_100 - this.old_avenger_100) / 10);
            this.break_avenger_1000 = parseInt((this.new_avenger_1000 - this.old_avenger_1000) / 10);
            this.break_avenger_10000 = parseInt((this.new_avenger_10000 - this.old_avenger_10000) / 10);

            this.break_vqv_100 = parseInt((this.new_vqv_100 - this.old_vqv_100) / 10);
            this.break_vqv_1000 = parseInt((this.new_vqv_1000 - this.old_vqv_1000) / 10);
            this.break_vqv_10000 = parseInt((this.new_vqv_10000 - this.old_vqv_10000) / 10);
            //cc.log("break : " + this.break_poke_100);
            if(this.new_minipoker_100 - this.old_minipoker_100 < 10)
                this.break_minipoker_100 = 1;
            else if(this.new_minipoker_100 - this.old_minipoker_100 < -10)
                this.break_minipoker_100 = -1;

            if(this.new_poke_100 - this.old_poke_100 < 10)
                this.break_poke_100 = 1;
            else if(this.new_poke_100 - this.old_poke_100 < -10)
                this.break_poke_100 = -1;

            if(this.new_khobau_100 - this.old_khobau_100 < 10)
                this.break_khobau_100 = 1;
            else if(this.new_khobau_100 - this.old_khobau_100 < -10)
                this.break_khobau_100 = -1;

            if(this.new_ndv_100 - this.old_ndv_100 < 10)
                this.break_ndv_100 = 1;
            else if(this.new_ndv_100 - this.old_ndv_100 < -10)
                this.break_ndv_100 = -1;

            if(this.new_avenger_100 - this.old_avenger_100 < 10)
                this.break_avenger_100 = 1;
            else if(this.new_avenger_100 - this.old_avenger_100 < -10)
                this.break_avenger_100 = -1;

            if(this.new_vqv_100 - this.old_vqv_100 < 10)
                this.break_vqv_100 = 1;
            else if(this.new_vqv_100 - this.old_vqv_100 < -10)
                this.break_vqv_100 = -1;

            //cc.log("break kho bau: " + this.break_khobau_100);

            if (this.isRunEffectHuMinipoker == false) {
                this.runPointHuMiniPoker();
            }
            if (this.isRunEffectHuPokeGo == false) {
                this.runPointHuPokeGo();
            }
            if (this.isRunEffectHuKhoBau == false) {
                this.runPointHuKhoBau();
            }
            if (this.isRunEffectHuNDV == false) {
                this.runPointHuNDV();
            }
            if (this.isRunEffectHuAvenger == false) {
                this.runPointHuAvenger();
            }
            if (this.isRunEffectHuAvenger == false) {
                this.runPointHuVQV();
            }
        },

        runPointHuMiniPoker : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_minipoker_100 = parseFloat(menutab.old_minipoker_100) + parseFloat(menutab.break_minipoker_100);
                    menutab.lb_hu_minipoker.setString(formatMoney(0,3,menutab.old_minipoker_100));
                    if(menutab.break_minipoker_100 > 0) {
                        if (menutab.old_minipoker_100 < menutab.new_minipoker_100) {
                            menutab.lb_hu_minipoker.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuMiniPoker, menutab)));
                        } else {
                            menutab.old_minipoker_100 = menutab.new_minipoker_100;
                            menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_100));
                            menutab.isRunEffectHuMinipoker = false;
                        }
                    }else {
                        menutab.old_minipoker_100 = menutab.new_minipoker_100;
                        menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_100));
                        menutab.isRunEffectHuMinipoker = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_minipoker_1000 = parseFloat(menutab.old_minipoker_1000) + parseFloat(menutab.break_minipoker_1000);
                    menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_1000));
                    if(menutab.break_minipoker_1000 > 0) {
                        if (menutab.old_minipoker_1000 < menutab.new_minipoker_1000) {
                            menutab.lb_hu_minipoker.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuMiniPoker, menutab)));
                        } else {
                            menutab.old_minipoker_1000 = menutab.new_minipoker_1000;
                            menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_1000));
                            menutab.isRunEffectHuMinipoker = false;
                        }
                    }else {
                        menutab.old_minipoker_1000 = menutab.new_minipoker_1000;
                        menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_1000));
                        menutab.isRunEffectHuMinipoker = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_minipoker_10000 = parseFloat(menutab.old_minipoker_10000) + parseFloat(menutab.break_minipoker_10000);
                    menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_10000));
                    if(menutab.break_minipoker_10000 > 0) {
                        if (menutab.old_minipoker_10000 < menutab.new_minipoker_10000) {
                            menutab.lb_hu_minipoker.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuMiniPoker, menutab)));
                        } else {
                            menutab.old_minipoker_10000 = menutab.new_minipoker_10000;
                            menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_10000));
                            menutab.isRunEffectHuMinipoker = false;
                        }
                    }else {
                        menutab.old_minipoker_10000 = menutab.new_minipoker_10000;
                        menutab.lb_hu_minipoker.setString(formatMoney(0, 3, menutab.old_minipoker_10000));
                        menutab.isRunEffectHuMinipoker = false;
                    }
                }
            }
        },
        runPointHuPokeGo : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_poke_100 = parseFloat(menutab.old_poke_100) + parseFloat(menutab.break_poke_100);
                    menutab.lb_hu_minislot.setString(formatMoney(0,3,menutab.old_poke_100));
                    if(menutab.break_poke_100 > 0) {
                        if (menutab.old_poke_100 < menutab.new_poke_100) {
                            menutab.lb_hu_minislot.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuPokeGo, menutab)));
                        } else {
                            menutab.old_poke_100 = menutab.new_poke_100;
                            menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_100));
                            menutab.isRunEffectHuPokeGo = false;
                        }
                    }else {
                        menutab.old_poke_100 = menutab.new_poke_100;
                        menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_100));
                        menutab.isRunEffectHuPokeGo = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_poke_1000 = parseFloat(menutab.old_poke_1000) + parseFloat(menutab.break_poke_1000);
                    menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_1000));
                    if(menutab.break_poke_1000 > 0) {
                        if (menutab.old_poke_1000 < menutab.new_poke_1000) {
                            menutab.lb_hu_minislot.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuPokeGo, menutab)));
                        } else {
                            menutab.old_poke_1000 = menutab.new_poke_1000;
                            menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_1000));
                            menutab.isRunEffectHuPokeGo = false;
                        }
                    }else {
                        menutab.old_poke_1000 = menutab.new_poke_1000;
                        menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_1000));
                        menutab.isRunEffectHuPokeGo = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_poke_10000 = parseFloat(menutab.old_poke_10000) + parseFloat(menutab.break_poke_10000);
                    menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_10000));
                    if(menutab.break_poke_10000 > 0) {
                        if (menutab.old_poke_10000 < menutab.new_poke_10000) {
                            menutab.lb_hu_minislot.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuPokeGo, menutab)));
                        } else {
                            menutab.old_poke_10000 = menutab.new_poke_10000;
                            menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_10000));
                            menutab.isRunEffectHuPokeGo = false;
                        }
                    }else {
                        menutab.old_poke_10000 = menutab.new_poke_10000;
                        menutab.lb_hu_minislot.setString(formatMoney(0, 3, menutab.old_poke_10000));
                        menutab.isRunEffectHuPokeGo = false;
                    }
                }
            }
        },
        runPointHuKhoBau : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_khobau_100 = parseFloat(menutab.old_khobau_100) + parseFloat(menutab.break_khobau_100);
                    menutab.lb_hu_khobau.setString(formatMoney(0,3,menutab.old_khobau_100));
                    if(menutab.break_khobau_100 > 0) {
                        if (menutab.old_khobau_100 < menutab.new_khobau_100) {
                            menutab.lb_hu_khobau.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuKhoBau, menutab)));
                        } else {
                            menutab.old_khobau_100 = menutab.new_khobau_100;
                            menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_100));
                            menutab.isRunEffectHuKhoBau = false;
                        }
                    }else {
                        menutab.old_khobau_100 = menutab.new_khobau_100;
                        menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_100));
                        menutab.isRunEffectHuKhoBau = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_khobau_1000 = parseFloat(menutab.old_khobau_1000) + parseFloat(menutab.break_khobau_1000);
                    menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_1000));
                    if(menutab.break_khobau_1000 > 0) {
                        if (menutab.old_khobau_1000 < menutab.new_khobau_1000) {
                            menutab.lb_hu_khobau.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuKhoBau, menutab)));
                        } else {
                            menutab.old_khobau_1000 = menutab.new_khobau_1000;
                            menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_1000));
                            menutab.isRunEffectHuKhoBau = false;
                        }
                    }else {
                        menutab.old_khobau_1000 = menutab.new_khobau_1000;
                        menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_1000));
                        menutab.isRunEffectHuKhoBau = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_khobau_10000 = parseFloat(menutab.old_khobau_10000) + parseFloat(menutab.break_khobau_10000);
                    menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_10000));
                    if(menutab.break_khobau_10000 > 0) {
                        if (menutab.old_khobau_10000 < menutab.new_khobau_10000) {
                            menutab.lb_hu_khobau.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuKhoBau, menutab)));
                        } else {
                            menutab.old_khobau_10000 = menutab.new_khobau_10000;
                            menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_10000));
                            menutab.isRunEffectHuKhoBau = false;
                        }
                    }else {
                        menutab.old_khobau_10000 = menutab.new_khobau_10000;
                        menutab.lb_hu_khobau.setString(formatMoney(0, 3, menutab.old_khobau_10000));
                        menutab.isRunEffectHuKhoBau = false;
                    }
                }
            }
        },
        runPointHuNDV : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_ndv_100 = parseFloat(menutab.old_ndv_100) + parseFloat(menutab.break_ndv_100);
                    menutab.lb_hu_nudiepvien.setString(formatMoney(0,3,menutab.old_ndv_100));
                    if(menutab.break_ndv_100 > 0) {
                        if (menutab.old_ndv_100 < menutab.new_ndv_100) {
                            menutab.lb_hu_nudiepvien.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuNDV, menutab)));
                        } else {
                            menutab.old_ndv_100 = menutab.new_ndv_100;
                            menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_100));
                            menutab.isRunEffectHuNDV = false;
                        }
                    }else {
                        menutab.old_ndv_100 = menutab.new_ndv_100;
                        menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_100));
                        menutab.isRunEffectHuNDV = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_ndv_1000 = parseFloat(menutab.old_ndv_1000) + parseFloat(menutab.break_ndv_1000);
                    menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_1000));
                    if(menutab.break_ndv_1000 > 0) {
                        if (menutab.old_ndv_1000 < menutab.new_ndv_1000) {
                            menutab.lb_hu_nudiepvien.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuNDV, menutab)));
                        } else {
                            menutab.old_ndv_1000 = menutab.new_ndv_1000;
                            menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_1000));
                            menutab.isRunEffectHuNDV = false;
                        }
                    }else {
                        menutab.old_ndv_1000 = menutab.new_ndv_1000;
                        menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_1000));
                        menutab.isRunEffectHuNDV = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_ndv_10000 = parseFloat(menutab.old_ndv_10000) + parseFloat(menutab.break_ndv_10000);
                    menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_10000));
                    if(menutab.break_ndv_10000 > 0) {
                        if (menutab.old_ndv_10000 < menutab.new_ndv_10000) {
                            menutab.lb_hu_nudiepvien.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuNDV, menutab)));
                        } else {
                            menutab.old_ndv_10000 = menutab.new_ndv_10000;
                            menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_10000));
                            menutab.isRunEffectHuNDV = false;
                        }
                    }else {
                        menutab.old_ndv_10000 = menutab.new_ndv_10000;
                        menutab.lb_hu_nudiepvien.setString(formatMoney(0, 3, menutab.old_ndv_10000));
                        menutab.isRunEffectHuNDV = false;
                    }
                }
            }
        },
        runPointHuAvenger : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_avenger_100 = parseFloat(menutab.old_avenger_100) + parseFloat(menutab.break_avenger_100);
                    menutab.lb_hu_avenger.setString(formatMoney(0,3,menutab.old_avenger_100));
                    if(menutab.break_avenger_100 > 0) {
                        if (menutab.old_avenger_100 < menutab.new_avenger_100) {
                            menutab.lb_hu_avenger.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuAvenger, menutab)));
                        } else {
                            menutab.old_avenger_100 = menutab.new_avenger_100;
                            menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_100));
                            menutab.isRunEffectHuAvenger = false;
                        }
                    }else {
                        menutab.old_avenger_100 = menutab.new_avenger_100;
                        menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_100));
                        menutab.isRunEffectHuAvenger = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_avenger_1000 = parseFloat(menutab.old_avenger_1000) + parseFloat(menutab.break_avenger_1000);
                    menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_1000));
                    if(menutab.break_avenger_1000 > 0) {
                        if (menutab.old_avenger_1000 < menutab.new_avenger_1000) {
                            menutab.lb_hu_avenger.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuAvenger, menutab)));
                        } else {
                            menutab.old_avenger_1000 = menutab.new_avenger_1000;
                            menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_1000));
                            menutab.isRunEffectHuAvenger = false;
                        }
                    }else {
                        menutab.old_avenger_1000 = menutab.new_avenger_1000;
                        menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_1000));
                        menutab.isRunEffectHuAvenger = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_avenger_10000 = parseFloat(menutab.old_avenger_10000) + parseFloat(menutab.break_avenger_10000);
                    menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_10000));
                    if(menutab.break_avenger_10000 > 0) {
                        if (menutab.old_avenger_10000 < menutab.new_avenger_10000) {
                            menutab.lb_hu_nudiepvien.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuAvenger, menutab)));
                        } else {
                            menutab.old_avenger_10000 = menutab.new_avenger_10000;
                            menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_10000));
                            menutab.isRunEffectHuAvenger = false;
                        }
                    }else {
                        menutab.old_avenger_10000 = menutab.new_avenger_10000;
                        menutab.lb_hu_avenger.setString(formatMoney(0, 3, menutab.old_avenger_10000));
                        menutab.isRunEffectHuAvenger = false;
                    }
                }
            }
        },
        runPointHuVQV : function(){
            if(menutab != null) {
                if (menutab.gotoRoomHu == 100) {
                    menutab.old_vqv_100 = parseFloat(menutab.old_vqv_100) + parseFloat(menutab.break_vqv_100);
                    menutab.lb_hu_vqv.setString(formatMoney(0,3,menutab.old_vqv_100));
                    if(menutab.break_vqv_100 > 0) {
                        if (menutab.old_vqv_100 < menutab.new_vqv_100) {
                            menutab.lb_hu_vqv.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuVQV, menutab)));
                        } else {
                            menutab.old_vqv_100 = menutab.new_vqv_100;
                            menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_100));
                            menutab.isRunEffectHuvqv = false;
                        }
                    }else {
                        menutab.old_vqv_100 = menutab.new_vqv_100;
                        menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_100));
                        menutab.isRunEffectHuvqv = false;
                    }
                }else if (menutab.gotoRoomHu == 1000) {
                    menutab.old_vqv_1000 = parseFloat(menutab.old_vqv_1000) + parseFloat(menutab.break_vqv_1000);
                    menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_1000));
                    if(menutab.break_vqv_1000 > 0) {
                        if (menutab.old_vqv_1000 < menutab.new_vqv_1000) {
                            menutab.lb_hu_vqv.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuVQV, menutab)));
                        } else {
                            menutab.old_vqv_1000 = menutab.new_vqv_1000;
                            menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_1000));
                            menutab.isRunEffectHuvqv = false;
                        }
                    }else {
                        menutab.old_vqv_1000 = menutab.new_vqv_1000;
                        menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_1000));
                        menutab.isRunEffectHuvqv = false;
                    }
                }else if (menutab.gotoRoomHu == 10000) {
                    menutab.old_vqv_10000 = parseFloat(menutab.old_vqv_10000) + parseFloat(menutab.break_vqv_10000);
                    menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_10000));
                    if(menutab.break_vqv_10000 > 0) {
                        if (menutab.old_vqv_10000 < menutab.new_vqv_10000) {
                            menutab.lb_hu_nudiepvien.runAction(cc.sequence(cc.delayTime(0.02), cc.callFunc(menutab.runPointHuVQV, menutab)));
                        } else {
                            menutab.old_vqv_10000 = menutab.new_vqv_10000;
                            menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_10000));
                            menutab.isRunEffectHuvqv = false;
                        }
                    }else {
                        menutab.old_vqv_10000 = menutab.new_vqv_10000;
                        menutab.lb_hu_vqv.setString(formatMoney(0, 3, menutab.old_vqv_10000));
                        menutab.isRunEffectHuvqv = false;
                    }
                }
            }
        },

        funSubcribleJacport : function(){
            var jacport = new CmdSendSubcribeJacport();
            jacport.putSubcribeJacport();
            Minigame.miniGameClient.send(jacport);
            jacport.clean();
        },

        funUnsubcribleJacport : function(){
            var jacport = new CmdSendUnsubcribeJacport();
            jacport.putUnsubcribeJacport();
            Minigame.miniGameClient.send(jacport);
            jacport.clean();
        },


        fungetGetPotGameBai : function(){
            if(Minigame.isLoginSocket) {
                if(GameManager.getInstance().inGame == false) {
                    var potgamebai = new CmdSendPotGameBai();
                    potgamebai.putPotGameBai();
                    Minigame.miniGameClient.send(potgamebai);
                    potgamebai.clean();
                }
            }
        },
        responsePotGameBai : function(huBaCay, huBaiCao, huBinh, huSam, huTLMN){
            //cc.log("huBaCay : " + huBaCay + " huBaiCao : " + huBaiCao + " huBinh : " + huBinh + " huSam: " + huSam + " huTLMN : " + huTLMN);
            //huBaCay = - 10000;
            if(lobby.facebook_canvas == true){
                //this.vt_TLMN = [0,8]; this.vt_SAM = [1,10]; this.vt_BACAY = [3]; this.vt_BAICAO = [5];this.vt_MAUBINH = [6,9];
            }
            this.time_Pot_3CAY = huBaCay;
            this.time_Pot_BAICAO = huBaiCao;
            this.time_Pot_BINH = huBinh;
            this.time_Pot_SAM = huSam;
            this.time_Pot_TLMN = huTLMN;
            //cc.log("array_Pot " + lobby.array_Pot.length);
            if(huTLMN < 0) {
                this.hasPot_TLMN = true;
                lobby.array_Pot[this.vt_TLMN[0]].setOpacity(255);
                lobby.array_Pot[this.vt_TLMN[1]].setOpacity(255);
                lobby.array_Pot[this.vt_TLMN[0]].setColor(cc.color("#FFFFFF"));
                lobby.array_Pot[this.vt_TLMN[1]].setColor(cc.color("#FFFFFF"));
            }else if(huTLMN > 0) {
                this.hasPot_TLMN = true;
                lobby.array_Pot[this.vt_TLMN[0]].setOpacity(150);
                lobby.array_Pot[this.vt_TLMN[1]].setOpacity(150);
                lobby.array_Pot[this.vt_TLMN[0]].setColor(cc.color("#B2B2B2"));
                lobby.array_Pot[this.vt_TLMN[1]].setColor(cc.color("#B2B2B2"));
            }else
                this.hasPot_TLMN = false;

            if(huSam < 0) {
                this.hasPot_SAM = true;
                lobby.array_Pot[this.vt_SAM[0]].setOpacity(255);
                lobby.array_Pot[this.vt_SAM[1]].setOpacity(255);
                lobby.array_Pot[this.vt_SAM[0]].setColor(cc.color("#FFFFFF"));
                lobby.array_Pot[this.vt_SAM[1]].setColor(cc.color("#FFFFFF"));
            }else if(huSam > 0) {
                this.hasPot_SAM = true;
                lobby.array_Pot[this.vt_SAM[0]].setOpacity(150);
                lobby.array_Pot[this.vt_SAM[1]].setOpacity(150);
                lobby.array_Pot[this.vt_SAM[0]].setColor(cc.color("#B2B2B2"));
                lobby.array_Pot[this.vt_SAM[1]].setColor(cc.color("#B2B2B2"));
            }else
                this.hasPot_SAM = false;

            if(huBaCay < 0) {
                this.hasPot_3CAY = true;
                lobby.array_Pot[this.vt_BACAY[0]].setOpacity(255);
                lobby.array_Pot[this.vt_BACAY[0]].setColor(cc.color("#FFFFFF"));
            }else if(huBaCay > 0) {
                this.hasPot_3CAY = true;
                lobby.array_Pot[this.vt_BACAY[0]].setColor(cc.color("#B2B2B2"));
                lobby.array_Pot[this.vt_BACAY[0]].setOpacity(150);
            }else
                this.hasPot_3CAY = false;

            if(huBaiCao < 0) {
                this.hasPot_BAICAO = true;
                lobby.array_Pot[this.vt_BAICAO[0]].setOpacity(255);
                lobby.array_Pot[this.vt_BAICAO[0]].setColor(cc.color("#FFFFFF"));
            }else if(huBaiCao > 0) {
                this.hasPot_BAICAO = true;
                lobby.array_Pot[this.vt_BAICAO[0]].setOpacity(150);
                lobby.array_Pot[this.vt_BAICAO[0]].setColor(cc.color("#B2B2B2"));
            }else
                this.hasPot_BAICAO = false;

            if(huBinh < 0) {
                this.hasPot_BINH = true;
                lobby.array_Pot[this.vt_MAUBINH[1]].setOpacity(255);
                lobby.array_Pot[this.vt_MAUBINH[0]].setOpacity(255);
                lobby.array_Pot[this.vt_MAUBINH[1]].setColor(cc.color("#FFFFFF"));
                lobby.array_Pot[this.vt_MAUBINH[0]].setColor(cc.color("#FFFFFF"));
            }else if(huBinh > 0) {
                this.hasPot_BINH = true;
                lobby.array_Pot[this.vt_MAUBINH[1]].setOpacity(150);
                lobby.array_Pot[this.vt_MAUBINH[0]].setOpacity(150);
                lobby.array_Pot[this.vt_MAUBINH[1]].setColor(cc.color("#B2B2B2"));
                lobby.array_Pot[this.vt_MAUBINH[0]].setColor(cc.color("#B2B2B2"));
            }else
                this.hasPot_BINH = false;


            if(this.hasPot_TLMN == true || this.hasPot_SAM == true || this.hasPot_3CAY == true || this.hasPot_BAICAO == true || this.hasPot_BINH == true){
                this.runTime_Pot_GameBai();
            }
            menutab.btn_event.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(function(){
                lobby.stopAllActions();
                menutab.fungetGetPotGameBai();
            })));
        },

        runTime_Pot_GameBai : function (){
            if(this.hasPot_TLMN == true){
                lobby.array_Pot[this.vt_TLMN[0]].setVisible(true);
                lobby.array_txt_Pot[this.vt_TLMN[0]].setString(this.formartTimeSecond(this.time_Pot_TLMN));
                lobby.array_Pot[this.vt_TLMN[1]].setVisible(true);
                lobby.array_txt_Pot[this.vt_TLMN[1]].setString(this.formartTimeSecond(this.time_Pot_TLMN));
                if(this.time_Pot_TLMN < 0)
                    this.time_Pot_TLMN = this.time_Pot_TLMN + 1;
                else
                    this.time_Pot_TLMN = this.time_Pot_TLMN - 1;
                if(this.time_Pot_TLMN == 0) {
                    this.time_Pot_TLMN = 0;
                    lobby.array_Pot[this.vt_TLMN[0]].setVisible(false);
                    lobby.array_Pot[this.vt_TLMN[1]].setVisible(false);
                    this.hasPot_TLMN = false;
                }
            }else{
                lobby.array_Pot[this.vt_TLMN[0]].setVisible(false);
                lobby.array_Pot[this.vt_TLMN[1]].setVisible(false);
            }

            if(this.hasPot_SAM == true){
                lobby.array_Pot[this.vt_SAM[0]].setVisible(true);
                lobby.array_txt_Pot[this.vt_SAM[0]].setString(this.formartTimeSecond(this.time_Pot_SAM));
                lobby.array_Pot[this.vt_SAM[1]].setVisible(true);
                lobby.array_txt_Pot[this.vt_SAM[1]].setString(this.formartTimeSecond(this.time_Pot_SAM));
                if(this.time_Pot_SAM < 0)
                    this.time_Pot_SAM = this.time_Pot_SAM + 1;
                else
                    this.time_Pot_SAM = this.time_Pot_SAM - 1;
                if(this.time_Pot_SAM == 0) {
                    this.time_Pot_SAM = 0;
                    lobby.array_Pot[this.vt_SAM[0]].setVisible(false);
                    lobby.array_Pot[this.vt_SAM[1]].setVisible(false);
                    this.hasPot_SAM = false;
                }
            }else{
                lobby.array_Pot[this.vt_SAM[0]].setVisible(false);
                lobby.array_Pot[this.vt_SAM[1]].setVisible(false);
            }

            if(this.hasPot_3CAY == true){
                lobby.array_Pot[this.vt_BACAY[0]].setVisible(true);
                lobby.array_txt_Pot[this.vt_BACAY[0]].setString(this.formartTimeSecond(this.time_Pot_3CAY));
                if(this.time_Pot_3CAY < 0)
                    this.time_Pot_3CAY = this.time_Pot_3CAY + 1;
                else
                    this.time_Pot_3CAY = this.time_Pot_3CAY - 1;
                if(this.time_Pot_3CAY == 0) {
                    this.time_Pot_3CAY = 0;
                    lobby.array_Pot[this.vt_BACAY[0]].setVisible(false);
                    this.hasPot_3CAY = false;
                }
            }else{
                lobby.array_Pot[this.vt_BACAY[0]].setVisible(false);
            }

            if(this.hasPot_BAICAO == true){
                lobby.array_Pot[this.vt_BAICAO[0]].setVisible(true);
                lobby.array_txt_Pot[this.vt_BAICAO[0]].setString(this.formartTimeSecond(this.time_Pot_BAICAO));
                if(this.time_Pot_BAICAO < 0)
                    this.time_Pot_BAICAO = this.time_Pot_BAICAO + 1;
                else
                    this.time_Pot_BAICAO = this.time_Pot_BAICAO - 1;
                if(this.time_Pot_BAICAO == 0) {
                    this.time_Pot_BAICAO = 0;
                    lobby.array_Pot[this.vt_BAICAO[0]].setVisible(false);
                    this.hasPot_BAICAO = false;
                }
            }else{
                lobby.array_Pot[this.vt_BAICAO[0]].setVisible(false);
            }

            if(this.hasPot_BINH == true){
                lobby.array_Pot[this.vt_MAUBINH[1]].setVisible(true);
                lobby.array_txt_Pot[this.vt_MAUBINH[1]].setString(this.formartTimeSecond(this.time_Pot_BINH));
                lobby.array_Pot[this.vt_MAUBINH[0]].setVisible(true);
                lobby.array_txt_Pot[this.vt_MAUBINH[0]].setString(this.formartTimeSecond(this.time_Pot_BINH));
                if(this.time_Pot_BINH < 0)
                    this.time_Pot_BINH = this.time_Pot_BINH + 1;
                else
                    this.time_Pot_BINH = this.time_Pot_BINH - 1;
                if(this.time_Pot_BINH == 0) {
                    this.time_Pot_BINH = 0;
                    lobby.array_Pot[this.vt_MAUBINH[1]].setVisible(false);
                    lobby.array_Pot[this.vt_MAUBINH[0]].setVisible(false);
                    this.hasPot_BINH = false;
                }
            }else{
                lobby.array_Pot[this.vt_MAUBINH[1]].setVisible(false);
                lobby.array_Pot[this.vt_MAUBINH[0]].setVisible(false);
            }

            if(this.hasPot_TLMN == true || this.hasPot_SAM == true || this.hasPot_3CAY == true || this.hasPot_BAICAO == true || this.hasPot_BINH == true){
                this.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                    menutab.stopAllActions();
                    menutab.runTime_Pot_GameBai();
                })));
            }else{
                menutab.stopAllActions();
            }
        },

        stopTime_gotoGameBai: function(){
            menutab.stopAllActions();
        },
        startTime_outGameBai : function(){
            this.fungetGetPotGameBai();
        },

        formartTimeSecond : function(value){
            value = Math.abs(value);
            var minute = Math.floor(value / 60);
            var second = value - minute*60;
            var hour = Math.floor(minute/60)
            minute = minute - hour*60;

            var str = "";
            if(hour < 10){
                str = "0" + hour;
            }else{
                str = hour;
            }
            if(minute < 10){
                str = str + ":0"+minute;
            }else{
                str = str + ":"+minute;
            }
            if(second < 10){
                str = str + ":0"+second;
            }else{
                str = str + ":"+second;
            }
            //cc.log("so gio : " + str);
            return str;
        },
        formartTimeSecondEventVip : function(value){
            value = Math.abs(value);
            var minute = Math.floor(value / 60);
            var second = value - minute*60;
            var hour = Math.floor(minute/60)
            minute = minute - hour*60;

            var str = "";
            if(hour < 10){
                str = "0" + hour + "H\n";
            }else{
                str = hour + "H\n";
            }
            if(minute < 10){
                str = str + "0"+minute;
            }else{
                str = str + ""+minute;
            }
            if(second < 10){
                str = str + ":0"+second;
            }else{
                str = str + ":"+second;
            }
            //cc.log("so gio : " + str);
            return str;
        },
        changeTextFieldAsEditBox : function(textfield, parent){
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
            this.neweditbox.setAnchorPoint(cc.p(0.5,0.5));
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

        editBoxEditingDidBegin: function (editBox) {
            if(editBox.getName() == "tf_nickname") {
                //cc.log("ok");
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            var str = editBox.getString();
            if(editBox.getName() == "tf_nickname") {
                if (str.length >= 6 && str.length <= 16) {
                    chuyenkhoan.checkNickName();
                } else {
                    chuyenkhoan.lb_check_daily.setVisible(false);
                    if (chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname") != null) {
                        var aSprite4 = chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname");
                        aSprite4.setVisible(false);
                    }
                }
            }
        },

        editBoxTextChanged: function (editBox, text) {
            var str = editBox.getString();
            if(editBox.getName() == "tf_nickname") {
                if(str != "")
                    chuyenkhoan.btn_clear_nickname_ck.setVisible(true);
                else
                    chuyenkhoan.btn_clear_nickname_ck.setVisible(false);
            }else  if(editBox.getName() == "tf_nickname_again") {
                if(str != "")
                    chuyenkhoan.btn_clear_nickname_again_ck.setVisible(true);
                else
                    chuyenkhoan.btn_clear_nickname_again_ck.setVisible(false);
            }else  if(editBox.getName() == "tf_ly_do") {
                if(str != "")
                    chuyenkhoan.btn_clear_lydo.setVisible(true);
                else
                    chuyenkhoan.btn_clear_lydo.setVisible(false);
            }else  if(editBox.getName() == "tf_so_vin_chuyen" || editBox.getName() == "tf_phone_number_nttt" || editBox.getName() == "tf_cmtnd"
                || editBox.getName() == "tf_phone_bm" || editBox.getName() == "tf_new_phone_thaydoi_sms" || editBox.getName() == "tf_soluong_dt"
                || editBox.getName() == "tf_money_vin" || editBox.getName() == "tf_money_again"|| editBox.getName() == "tf_soluong_thegame"
                || editBox.getName() == "tf_vin_ketsat" || editBox.getName() == "lb_vin_nhan_duoc" || editBox.getName() == "tf_vin_toi_thieu") {
                str = replaceAll(".", "", str);
                if (!isNumeric(str)) {
                    str = str.substr(0, str.length - 1);
                }
                if (!isNumeric(str)) {
                    str = "";
                }
                //if(str == "")
                //    str = 0;
                if(editBox.getName() == "tf_so_vin_chuyen") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                    if (Number(str) >= Number(lobby.transfer_min))
                        chuyenkhoan.lb_vin_nhan_duoc.setString(formatMoney(0, 3, parseInt(Number(str) * lobby.radio_tranfer)));
                    else
                        chuyenkhoan.lb_vin_nhan_duoc.setString("");
                }else if(editBox.getName() == "lb_vin_nhan_duoc") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                    if (Number(str) >= parseInt(lobby.transfer_min * lobby.radio_tranfer)) {
                        chuyenkhoan.tf_so_vin_chuyen.setString(formatMoney(0, 3, Math.round(Number(str)/lobby.radio_tranfer)));
                    }
                }else if(editBox.getName() == "tf_money_vin") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                    if(parseInt(Number(str)) > 0)
                        shopping_info.lb_xu_nhan_duoc.setString(formatMoney(0,3,parseInt(parseInt(str)*lobby.radio_xu)));
                    else
                        shopping_info.lb_xu_nhan_duoc.setString("");
                }else if(editBox.getName() == "tf_money_again"|| editBox.getName() == "tf_vin_ketsat" || editBox.getName() == "tf_vin_toi_thieu") {
                    editBox.setString(formatMoney(0, 3, parseInt(Number(str))));
                }else if(editBox.getName() == "tf_soluong_dt" || editBox.getName() == "tf_soluong_thegame") {
                    editBox.setString(str);
                    if (Number(str) > lobby.num_cash_out){
                        shopping_info.tf_soluong_dt.setString(lobby.num_cash_out);
                        shopping_info.tf_soluong_thegame.setString(lobby.num_cash_out);
                    }
                    shopping_info.showMoneyBuyCard();
                }else{
                    editBox.setString(str);
                }
            }
            if(editBox.getName() == "tf_giftcode") {
                if(str != "")
                    giftcode.btn_clear_gift.setVisible(true);
                else
                    giftcode.btn_clear_gift.setVisible(false);
            }else if(editBox.getName() == "tf_serial") {
                if(str != "")
                    shopping_info.btn_clear_serial.setVisible(true);
                else
                    shopping_info.btn_clear_serial.setVisible(false);
            }else if(editBox.getName() == "tf_ma_the") {
                if(str != "")
                    shopping_info.btn_clear_mathe.setVisible(true);
                else
                    shopping_info.btn_clear_mathe.setVisible(false);
            }else if(editBox.getName() == "tf_phone_number_nttt") {
                if(str != "")
                    shopping_info.btn_clear_fone.setVisible(true);
                else
                    shopping_info.btn_clear_fone.setVisible(false);
            }else if(editBox.getName() == "tf_cmtnd") {
                if(str != "")
                    sercurity_info.btn_clear_cmt.setVisible(true);
                else
                    sercurity_info.btn_clear_cmt.setVisible(false);
            }else if(editBox.getName() == "tf_email") {
                if(str != "")
                    sercurity_info.btn_clear_email.setVisible(true);
                else
                    sercurity_info.btn_clear_email.setVisible(false);
            }else if(editBox.getName() == "tf_phone_bm") {
                if(str != "")
                    sercurity_info.btn_clear_phone.setVisible(true);
                else
                    sercurity_info.btn_clear_phone.setVisible(false);
            }else if(editBox.getName() == "tf_new_phone_thaydoi_sms") {
                if(str != "")
                    sercurity_info.btn_clear_newphone.setVisible(true);
                else
                    sercurity_info.btn_clear_newphone.setVisible(false);
            }
        },

        editBoxReturn: function (editBox) {
            var str = editBox.getString();
            if(editBox.getName() == "tf_nickname") {
                if (str.length >= 6 && str.length <= 16) {
                    chuyenkhoan.checkNickName();
                } else {
                    chuyenkhoan.lb_check_daily.setVisible(false);
                    if (chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname") != null) {
                        var aSprite4 = chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname");
                        aSprite4.setVisible(false);
                    }
                }
            }
        },

        funGetInfoEventVippoint : function(){
            if(Minigame.isLoginSocket) {
                var eventVippoint = new CmdSendEventVippoint();
                eventVippoint.putEventVippoint();
                Minigame.miniGameClient.send(eventVippoint);
                eventVippoint.clean();
            }else{
                Minigame.connectSocket();
            }
        },

        responseEventVippoint : function(status, time){
            // cc.log("status: " + status + " time : " + time);
            this.timeEvent = time;
            if(status == 0){
                this.sp_time_event.setVisible(false);
                this.txt_event.setString("");
                if(event_Vippoint != null){
                    event_Vippoint.txt_time_event.setString("00H\n00:00");
                }
                this.btn_event.stopAllActions();
                this.btn_event.runAction(cc.scaleTo(0,1));
                this.txt_event.stopAllActions();
                this.sp_time_event.stopAllActions();
            }else{
                var seq = cc.sequence(cc.scaleTo(0.2,1.05), cc.scaleTo(0.2,1));
                this.btn_event.runAction(cc.repeatForever(seq));
                if(cc.sys.os == cc.sys.OS_IOS) {
                    if (lobby.open_payment_ios == true) {
                        this.sp_time_event.setVisible(true);
                        this.funDownTimeEvent();
                        this.sp_time_event.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(this.funGetInfoEventVippoint, this)));
                    }
                }else{
                    this.sp_time_event.setVisible(true);
                    this.funDownTimeEvent();
                    this.sp_time_event.runAction(cc.sequence(cc.delayTime(120),cc.callFunc(this.funGetInfoEventVippoint, this)));
                }
            }
        },
        funDownTimeEvent : function(){
            menutab.txt_event.setString(menutab.formartTimeSecond(menutab.timeEvent));
            if(event_Vippoint != null){
                event_Vippoint.txt_time_event.setString(menutab.formartTimeSecondEventVip(menutab.timeEvent));
            }
            menutab.timeEvent = menutab.timeEvent - 1;
            var seq1 = cc.sequence(cc.delayTime(1),cc.callFunc(menutab.funDownTimeEvent, menutab));
            menutab.txt_event.stopAllActions();
            menutab.txt_event.runAction(seq1);
        },
        responseHasEventDragon : function(){
            cc.log("has event dragon");
            this.btn_event.stopAllActions();
            this.btn_event.loadTextureNormal("res/ResourceMenuTab/Profile/btn_dragon_s.png");
            this.btn_event.loadTexturePressed("res/ResourceMenuTab/Profile/btn_dragon_s.png");
            var seq = cc.sequence(cc.scaleTo(0.2,1.05), cc.callFunc(function(){
                menutab.btn_event.loadTextureNormal("res/ResourceMenuTab/Profile/btn_dragon_s.png");
            }), cc.scaleTo(0.2,1), cc.callFunc(function(){
                menutab.btn_event.loadTextureNormal("res/ResourceMenuTab/Profile/btn_dragon_s.png");
            }));
            this.btn_event.runAction(cc.repeatForever(seq));
            this.btn_event.runAction(cc.sequence(cc.delayTime(10),cc.callFunc(function(){
                menutab.btn_event.loadTextureNormal("res/ResourceMenuTab/Profile/btn_dragon.png");
                menutab.btn_event.loadTexturePressed("res/ResourceMenuTab/Profile/btn_dragon.png");
                menutab.btn_event.stopAllActions();
                var seq2 = cc.sequence(cc.scaleTo(0.2,1.05), cc.scaleTo(0.2,1));
                menutab.btn_event.runAction(cc.repeatForever(seq2));
            })));
            if(event_VippointAppear == true){
                event_Vippoint.number_nhay = 0;
                event_Vippoint.funDragonEvent();
            }
        },


    }
);

// account
menuinfo.BTN_NAP_VIN= 167; menuinfo.BTN_NAP_XU= 168; menuinfo.BTN_SERCURITY= 169; menuinfo.BTN_LICHSUGIAODICH= 170; menuinfo.BTN_SHOP= 171; menuinfo.BTN_MENU= 172;
menuinfo.BTN_CLOSE_PANEL_SETTING= 173; menuinfo.BTN_DIEUKHOANSUDUNG= 175; menuinfo.BTN_GOPY= 176; menuinfo.BTN_LOGOUT= 177; menuinfo.BTN_EVENT= 5;
menuinfo.BTN_LIST_HU_ROOM1= 1; menuinfo.BTN_LIST_HU_ROOM2= 2; menuinfo.BTN_LIST_HU_ROOM3= 3; menuinfo.CLICKAVATAR= 4;
menuinfo.BTN_GOTO_MINIPOKER= 6; menuinfo.BTN_GOTO_MINISLOT= 7; menuinfo.BTN_GOTO_KHOBAU= 8; menuinfo.BTN_GOTO_NDV= 9; menuinfo.BTN_GOTO_AVENGER= 10;
menuinfo.BTN_SOUND_MENU= 11;
menuinfo.BTN_GOTO_VQV= 12;


openMenuTab = function () {
    if (menutab === null) {
        menutab = new menuinfo();
        menutabX = menutab.getPosition().x;
        menutabY = menutab.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(menutab,BaseScene.INDEX_INFO_GUI, 0);
    }
    else
    {
        menutab.setVisible(true);
        menutab.pAccount.setVisible(true);
        menutab.Islogout = false;
        menutab.setAvatar();
    }
    menutabAppear = true;
    //lobby.pn_chat_event.setVisible(true);
    lobby.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){
        menutab.fungetGetPotGameBai();
    })));
};
closeMenuTab = function () {
    if (menutab === null) {
        return;
    }
    if(menutabAppear) {
        menutab.setVisible(false);
        menutabAppear = false;
    }
};
