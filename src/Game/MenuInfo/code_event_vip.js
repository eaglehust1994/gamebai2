var event_Vippoint = null;
var event_VippointX = null; var event_VippointY = null;
var event_VippointAppear = null;

var code_event_Vippoint = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_event_Vip = null;
            this.btn_close_event_vip = null;
            this.notice_top = null;
            this.txt_name_top = null;
            this.avatar_top = null;
            this.txt_vp_top = null;
            this.txt_destroy_top = null;
            this.notice_me = null;
            this.txt_name_me = null;
            this.avatar_me = null;
            this.txt_vp_me = null;
            this.txt_destroy_me = null;

            this.position_me = null;
            this.txt_moc = null;

            this.pn_moc_point = null;
            this.btn_hide_top = null;
            this.btn_moc_1 = null;
            this.btn_moc_2 = null;
            this.btn_moc_3 = null;
            this.btn_moc_4 = null;
            this.btn_moc_5 = null;
            this.btn_moc_6 = null;
            this.btn_moc_7 = null;
            this.btn_moc_8 = null;
            this.btn_moc_9 = null;
            this.btn_moc_10 = null;
            this.btn_moc_11 = null;
            this.btn_moc_12 = null;
            this.btn_moc_13 = null;
            this.btn_moc_14 = null;
            this.btn_moc_15 = null;
            this.btn_moc_16 = null;

            this.pn_bang_topxh = null;
            this.bg_bang_xh_vp = null;
            this.lv_top_xh = null;
            this.btn_updown_top_vp = null;

            this.array_btn_moc = [];
            this.gotoToolTip = "";
            this.gotoUpDown = false;
            this.save_vitri_btnUp = 0;

            this.pn_bangxephang_vp = null;
            this.btn_muutri = null;
            this.btn_kiencuong = null;
            this.btn_close_bangxh = null;
            this.pn_muutri = null;
            this.pn_kiencuong = null;

            this.btn_vinhdanh_vp = null;
            this.btn_thele_vp = null;
            this.arrrayPlaceVip = [];
            this.arrayTop = [];
            this.placeMe = [];
            this.isMeInList = false;

            this.IntelOrStrong = false; // false muu tri true kien cuong
            this.page_bxh = 1;
            this.arrrayIntel = [];
            this.arrrayStrong = [];
            this.IntelMe = [];
            this.StrongMe = [];

            this.lv_kiencuong = null;
            this.lv_muutri = null;
            this.isMeInListIntel = false;
            this.isMeInListStrong = false;

            this.pn_button_Page = null;
            this.btn_back_page = null;
            this.btn_backall_page = null;
            this.btn_next_page = null;
            this.btn_nextall_page = null;
            this.txt_page = null;
            this.maxpage = 0;
            this.pn_end_event = null;
            this.txt_content_end_event = null;
            this.txt_time_event = null;

            this.event_run = null;
            this.number_nhay = 0;

            this.pn_thele_event = null;
            this.btn_close_thele = null;
            this.sc_event = null;

            this.sp_vitri1 = null;
            this.sp_vitri2 = null;
            this.sp_vitri3 = null;

            this.isRun_table = false;

            this.is_first_bxh = false;

            this._super("code_event_Vippoint");
            this.initWithBinaryFile("res/Event_Vippoint.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_event_Vip = this._layout.getChildByName("pn_event_Vip");
            this.pn_end_event = this.pn_event_Vip.getChildByName("pn_end_event");
            this.pn_end_event.setVisible(false);
            this.txt_content_end_event = this.getControl("txt_content_end_event",this.pn_end_event);
            this.txt_time_event = this.getControl("txt_time_event",this.pn_event_Vip);
            this.btn_close_event_vip = this.customButton("btn_close_event_vip",code_event_Vippoint.BTN_CLOSE_EVENT_VIP,this.pn_event_Vip);
            this.notice_top = this.pn_event_Vip.getChildByName("notice_top");
            this.txt_name_top = this.getControl("txt_name_top",this.notice_top);
            this.avatar_top = this.notice_top.getChildByName("avatar_top"); this.avatar_top.setScale(0.8);
            this.txt_vp_top = this.getControl("txt_vp_top",this.notice_top);
            this.txt_destroy_top = this.getControl("txt_destroy_top",this.notice_top);
            this.notice_me = this.pn_event_Vip.getChildByName("notice_me");
            this.txt_name_me = this.getControl("txt_name_me",this.notice_me);
            this.avatar_me = this.notice_me.getChildByName("avatar_me"); this.avatar_me.setScale(0.8);
            this.txt_vp_me = this.getControl("txt_vp_me",this.notice_me);
            this.txt_destroy_me = this.getControl("txt_destroy_me",this.notice_me);
            var fadein_top = cc.fadeIn(0);
            this.notice_top.runAction(fadein_top);
            this.notice_top.setVisible(false);
            this.notice_me.setVisible(false);

            this.position_me = this.pn_event_Vip.getChildByName("position_me");
            this.txt_moc = this.getControl("txt_moc",this.position_me);

            var fadein_moc = cc.fadeIn(0);
            this.position_me.runAction(fadein_moc);
            this.position_me.setVisible(false);

            this.pn_moc_point = this.pn_event_Vip.getChildByName("pn_moc_point");
            this.btn_hide_top = this.customButton("btn_hide_top",code_event_Vippoint.BTN_HIDE_TOP,this.pn_moc_point);
            this.btn_moc_1 = this.customButton("btn_moc_1",code_event_Vippoint.BTN_MOC_1,this.pn_moc_point);
            this.btn_moc_2 = this.customButton("btn_moc_2",code_event_Vippoint.BTN_MOC_2,this.pn_moc_point);
            this.btn_moc_3 = this.customButton("btn_moc_3",code_event_Vippoint.BTN_MOC_3,this.pn_moc_point);
            this.btn_moc_4 = this.customButton("btn_moc_4",code_event_Vippoint.BTN_MOC_4,this.pn_moc_point);
            this.btn_moc_5 = this.customButton("btn_moc_5",code_event_Vippoint.BTN_MOC_5,this.pn_moc_point);
            this.btn_moc_6 = this.customButton("btn_moc_6",code_event_Vippoint.BTN_MOC_6,this.pn_moc_point);
            this.btn_moc_7 = this.customButton("btn_moc_7",code_event_Vippoint.BTN_MOC_7,this.pn_moc_point);
            this.btn_moc_8 = this.customButton("btn_moc_8",code_event_Vippoint.BTN_MOC_8,this.pn_moc_point);
            this.btn_moc_9 = this.customButton("btn_moc_9",code_event_Vippoint.BTN_MOC_9,this.pn_moc_point);
            this.btn_moc_10 = this.customButton("btn_moc_10",code_event_Vippoint.BTN_MOC_10,this.pn_moc_point);
            this.btn_moc_11 = this.customButton("btn_moc_11",code_event_Vippoint.BTN_MOC_11,this.pn_moc_point);
            this.btn_moc_12 = this.customButton("btn_moc_12",code_event_Vippoint.BTN_MOC_12,this.pn_moc_point);
            this.btn_moc_13 = this.customButton("btn_moc_13",code_event_Vippoint.BTN_MOC_13,this.pn_moc_point);
            this.btn_moc_14 = this.customButton("btn_moc_14",code_event_Vippoint.BTN_MOC_14,this.pn_moc_point);
            this.btn_moc_15 = this.customButton("btn_moc_15",code_event_Vippoint.BTN_MOC_15,this.pn_moc_point);
            this.btn_moc_16 = this.customButton("btn_moc_16",code_event_Vippoint.BTN_MOC_16,this.pn_moc_point);

            this.sp_vitri1 = this.pn_moc_point.getChildByName("sp_vitri1");
            this.sp_vitri2 = this.pn_moc_point.getChildByName("sp_vitri2");
            this.sp_vitri3 = this.pn_moc_point.getChildByName("sp_vitri3");
            this.sp_vitri1.setTexture("res/Minigame/ImageChung/Vong1.png");
            this.sp_vitri2.setTexture("res/Minigame/ImageChung/Vong2.png");
            this.sp_vitri3.setTexture("res/Minigame/ImageChung/Vong3.png");
            this.sp_vitri1.setVisible(false);
            this.sp_vitri2.setVisible(false);
            this.sp_vitri3.setVisible(false);

            this.btn_moc_1.setName("ev_0");
            this.btn_moc_2.setName("ev_1");
            this.btn_moc_3.setName("ev_2");
            this.btn_moc_4.setName("ev_3");
            this.btn_moc_5.setName("ev_4");
            this.btn_moc_6.setName("ev_5");
            this.btn_moc_7.setName("ev_6");
            this.btn_moc_8.setName("ev_7");
            this.btn_moc_9.setName("ev_8");
            this.btn_moc_10.setName("ev_9");
            this.btn_moc_11.setName("ev_10");
            this.btn_moc_12.setName("ev_11");
            this.btn_moc_13.setName("ev_12");
            this.btn_moc_14.setName("ev_13");
            this.btn_moc_15.setName("ev_14");
            this.btn_moc_16.setName("ev_15");

            for(var i =0; i < 16; i ++){
                if(this.pn_moc_point.getChildByName("ev_" + i) != null){
                    this.array_btn_moc.push(this.pn_moc_point.getChildByName("ev_" + i));
                }
            }

            this.pn_event_Vip.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.show_event_vip,this)));

            this.pn_bang_topxh = this.pn_event_Vip.getChildByName("pn_bang_topxh");
            this.bg_bang_xh_vp = this.pn_bang_topxh.getChildByName("bg_bang_xh_vp");
            this.bg_bxh_che = this.pn_bang_topxh.getChildByName("bg_bxh_che");
            this.lv_top_xh = this.getControl("lv_top_xh",this.pn_bang_topxh);
            this.lv_top_xh.setTouchEnabled(true);
            this.lv_top_xh.setClippingEnabled(true);
            this.lv_top_xh.setScrollBarEnabled(false);
            this.btn_updown_top_vp = this.customButton("btn_updown_top_vp",code_event_Vippoint.BTN_UPDOWN_VP,this.pn_bang_topxh);
            this.save_vitri_btnUp = this.btn_updown_top_vp.y + 257;

            this.pn_bangxephang_vp = this.pn_event_Vip.getChildByName("pn_bangxephang_vp");
            this.btn_muutri = this.customButton("btn_muutri",code_event_Vippoint.BTN_MUU_TRI,this.pn_bangxephang_vp);
            this.btn_kiencuong = this.customButton("btn_kiencuong",code_event_Vippoint.BTN_KIEN_CUONG,this.pn_bangxephang_vp);
            this.btn_close_bangxh = this.customButton("btn_close_bangxh",code_event_Vippoint.BTN_CLOSE_BANG_XH,this.pn_bangxephang_vp);
            this.pn_muutri = this.pn_bangxephang_vp.getChildByName("pn_muutri");
            this.pn_kiencuong = this.pn_bangxephang_vp.getChildByName("pn_kiencuong");
            this.pn_bangxephang_vp.setVisible(false); this.pn_bangxephang_vp.setScale(0);
            this.pn_kiencuong.setVisible(false);

            this.lv_kiencuong = this.getControl("lv_kiencuong",this.pn_kiencuong);
            this.lv_kiencuong.setTouchEnabled(true);
            this.lv_kiencuong.setClippingEnabled(true);
            this.lv_kiencuong.setScrollBarEnabled(false);
            this.lv_muutri = this.getControl("lv_muutri",this.pn_muutri);
            this.lv_muutri.setTouchEnabled(true);
            this.lv_muutri.setClippingEnabled(true);
            this.lv_muutri.setScrollBarEnabled(false);

            this.btn_vinhdanh_vp = this.customButton("btn_vinhdanh_vp",code_event_Vippoint.BTN_OPEN_BANG_XH,this.pn_event_Vip);
            this.btn_thele_vp = this.customButton("btn_thele_vp",code_event_Vippoint.BTN_THE_LE,this.pn_event_Vip);
            if(cc.sys.isNative) {
                if(lobby.open_payment_ios == false){
                    this.btn_thele_vp.setEnabled(false);
                }else{
                    this.btn_thele_vp.setEnabled(true);
                }
            }

            this.pn_button_Page = this.pn_bangxephang_vp.getChildByName("pn_button_Page");
            this.btn_back_page = this.customButton("btn_back_page",code_event_Vippoint.BTN_BACK_PAGE,this.pn_button_Page);
            this.btn_backall_page = this.customButton("btn_backall_page",code_event_Vippoint.BTN_BACKALL_PAGE,this.pn_button_Page);
            this.btn_next_page = this.customButton("btn_next_page",code_event_Vippoint.BTN_NEXT_PAGE,this.pn_button_Page);
            this.btn_nextall_page = this.customButton("btn_nextall_page",code_event_Vippoint.BTN_NEXTALL_PAGE,this.pn_button_Page);
            this.txt_page = this.getControl("txt_page",this.pn_button_Page);

            this.event_run = this.pn_event_Vip.getChildByName("event_run");
            this.event_run.runAction(cc.fadeOut(0));
            this.event_run.setVisible(false);

            this.pn_thele_event = this.pn_event_Vip.getChildByName("pn_thele_event");
            this.btn_close_thele = this.customButton("btn_close_thele",code_event_Vippoint.BTN_CLOSE_THELE_EVENT,this.pn_thele_event);
            this.pn_thele_event.setVisible(false); this.pn_thele_event.setScale(0);
            this.sc_event = this.getControl("sc_event",this.pn_thele_event);
            this.sc_event.setTouchEnabled(true);
            this.sc_event.setClippingEnabled(true);
            this.sc_event.setScrollBarEnabled(false);
        },
        onMovePoint : cc.EventListener.create(
            {event: cc.EventListener.MOUSE,
                onMouseMove: function(event){
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if(event_Vippoint.gotoToolTip != target.getName()) {
                            var stt = target.getName().substr(3,target.getName().length);
                            event_Vippoint.gotoToolTip = target.getName();
                            if(event_Vippoint.arrrayPlaceVip[stt].nickname != null) {
                                event_Vippoint.fillDataTop(target.getName());
                                event_Vippoint.notice_top.x = target.x + 25;
                                event_Vippoint.notice_top.y = target.y - 40;
                                event_Vippoint.notice_top.setVisible(true);
                                event_Vippoint.notice_top.stopAllActions();
                                event_Vippoint.notice_top.runAction(cc.fadeIn(0.2));

                                event_Vippoint.notice_me.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                                    event_Vippoint.notice_me.setVisible(false);
                                })));

                                if (Number(stt) == 0)
                                    event_Vippoint.array_btn_moc[stt].loadTextureNormal("res/ResourceMenuTab/Vip/xuatphat_chose.png");
                                else
                                    event_Vippoint.array_btn_moc[stt].loadTextureNormal("res/ResourceMenuTab/Vip/vitri_chose.png");

                                for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                                    if (i != Number(stt)) {
                                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                                    }
                                }
                            }
                            event_Vippoint.position_me.x = target.x + 3;
                            event_Vippoint.position_me.y = target.y + 10;
                            event_Vippoint.position_me.setVisible(true);
                            event_Vippoint.position_me.stopAllActions();
                            event_Vippoint.position_me.runAction(cc.fadeIn(0.2));
                            event_Vippoint.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[stt].min));
                        }
                    }else{
                        if(event_Vippoint.gotoToolTip == target.getName()) {
                            event_Vippoint.gotoToolTip = "";
                            event_Vippoint.position_me.stopAllActions();
                            event_Vippoint.position_me.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
                                event_Vippoint.position_me.setVisible(false);
                            })));

                            event_Vippoint.notice_top.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
                                event_Vippoint.notice_top.setVisible(false);
                            })));

                            event_Vippoint.notice_me.setVisible(true);
                            event_Vippoint.notice_me.stopAllActions();
                            event_Vippoint.notice_me.runAction(cc.fadeIn(0.2));

                            for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++){
                                cc.eventManager.resumeTarget( event_Vippoint.array_btn_moc[i], true);
                                if(i == 0){
                                    event_Vippoint.array_btn_moc[i].loadTextureNormal("res/ResourceMenuTab/Vip/xuatphat.png");
                                }else{
                                    event_Vippoint.array_btn_moc[i].loadTextureNormal("res/ResourceMenuTab/Vip/vitri.png");
                                }
                            }
                        }
                    }
                }
            }),
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_event_Vippoint.BTN_CLOSE_THELE_EVENT:
                    this.pn_thele_event.setVisible(false);
                    this.pn_thele_event.setScale(0);
                    for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_KIEN_CUONG:
                    this.btn_muutri.loadTextureNormal("res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    this.btn_kiencuong.loadTextureNormal("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    this.pn_muutri.setVisible(false);
                    this.pn_kiencuong.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = true;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case code_event_Vippoint.BTN_MUU_TRI:
                    this.btn_muutri.loadTextureNormal("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                    this.btn_kiencuong.loadTextureNormal("res/ResourceMenuTab/BaoMat/btn_2hang_s.png");
                    this.pn_kiencuong.setVisible(false);
                    this.pn_muutri.setVisible(true);
                    this.page_bxh = 1;
                    this.IntelOrStrong = false;
                    this.parserBXH_Vippoint(this.IntelOrStrong);
                    break;
                case code_event_Vippoint.BTN_CLOSE_BANG_XH:
                    this.pn_bangxephang_vp.setVisible(false);
                    this.pn_bangxephang_vp.setScale(0);
                    for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.resumeTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_OPEN_BANG_XH:
                    //cc.log("vao");
                    this.pn_bangxephang_vp.setVisible(true);
                    this.pn_bangxephang_vp.runAction(cc.scaleTo(0.2,1));
                    if(this.is_first_bxh == false) {
                        this.page_bxh = 1;
                        this.parserBXH_Vippoint(this.IntelOrStrong);
                        this.is_first_bxh = true;
                    }
                    for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
                case code_event_Vippoint.BTN_CLOSE_EVENT_VIP:
                    closeEvent_Vip();
                    break;
                case code_event_Vippoint.BTN_UPDOWN_VP:
                    if(this.isRun_table == false) {
                        this.isRun_table = true;
                        if (this.gotoUpDown == false) {
                            this.zoomBigBg_bangxh_vp(496);
                            this.gotoUpDown = true;
                        } else {
                            this.bg_bxh_che.setVisible(false);
                            this.zoomSmallBg_bangxh_vp(195);
                            this.gotoUpDown = false;
                        }
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_1:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[0].nickname != null) {
                            this.fillDataTop("ev_0");
                            this.unHideDataTop(0);
                        }
                        this.position_me.x = this.btn_moc_1.x + 3;
                        this.position_me.y = this.btn_moc_1.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[0].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_2:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[1].nickname != null) {
                            this.fillDataTop("ev_1");
                            this.unHideDataTop(1);
                        }
                        this.position_me.x = this.btn_moc_2.x + 3;
                        this.position_me.y = this.btn_moc_2.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[1].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_3:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[2].nickname != null) {
                            this.fillDataTop("ev_2");
                            this.unHideDataTop(2);
                        }
                        this.position_me.x = this.btn_moc_3.x + 3;
                        this.position_me.y = this.btn_moc_3.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[2].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_4:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[3].nickname != null) {
                            this.fillDataTop("ev_3");
                            this.unHideDataTop(3);
                        }
                        this.position_me.x = this.btn_moc_4.x + 3;
                        this.position_me.y = this.btn_moc_4.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[3].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_5:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[4].nickname != null) {
                            this.fillDataTop("ev_4");
                            this.unHideDataTop(4);
                        }
                        this.position_me.x = this.btn_moc_5.x + 3;
                        this.position_me.y = this.btn_moc_5.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[4].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_6:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[5].nickname != null) {
                            this.fillDataTop("ev_5");
                            this.unHideDataTop(5);
                        }
                        this.position_me.x = this.btn_moc_6.x + 3;
                        this.position_me.y = this.btn_moc_6.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[5].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_7:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[6].nickname != null) {
                            this.fillDataTop("ev_6");
                            this.unHideDataTop(6);
                        }
                        this.position_me.x = this.btn_moc_7.x + 3;
                        this.position_me.y = this.btn_moc_7.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[6].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_8:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[7].nickname != null) {
                            this.fillDataTop("ev_7");
                            this.unHideDataTop(7);
                        }
                        this.position_me.x = this.btn_moc_8.x + 3;
                        this.position_me.y = this.btn_moc_8.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[7].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_9:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[8].nickname != null) {
                            this.fillDataTop("ev_8");
                            this.unHideDataTop(8);
                        }
                        this.position_me.x = this.btn_moc_9.x + 3;
                        this.position_me.y = this.btn_moc_9.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[8].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_10:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[9].nickname != null) {
                            this.fillDataTop("ev_9");
                            this.unHideDataTop(9);
                        }
                        this.position_me.x = this.btn_moc_10.x + 3;
                        this.position_me.y = this.btn_moc_10.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[9].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_11:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[10].nickname != null) {
                            this.fillDataTop("ev_10");
                            this.unHideDataTop(10);
                        }
                        this.position_me.x = this.btn_moc_11.x + 3;
                        this.position_me.y = this.btn_moc_11.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[10].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_12:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[11].nickname != null) {
                            this.fillDataTop("ev_11");
                            this.unHideDataTop(11);
                        }
                        this.position_me.x = this.btn_moc_12.x + 3;
                        this.position_me.y = this.btn_moc_12.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[11].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_13:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[12].nickname != null) {
                            this.fillDataTop("ev_12");
                            this.unHideDataTop(12);
                        }
                        this.position_me.x = this.btn_moc_13.x + 3;
                        this.position_me.y = this.btn_moc_13.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[12].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_14:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[13].nickname != null) {
                            this.fillDataTop("ev_13");
                            this.unHideDataTop(13);
                        }
                        this.position_me.x = this.btn_moc_14.x + 3;
                        this.position_me.y = this.btn_moc_14.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[13].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_15:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[14].nickname != null) {
                            this.fillDataTop("ev_14");
                            this.unHideDataTop(14);
                        }
                        this.position_me.x = this.btn_moc_15.x + 3;
                        this.position_me.y = this.btn_moc_15.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[14].min));
                    }
                    break;
                case code_event_Vippoint.BTN_MOC_16:
                    if(cc.sys.isNative) {
                        if(event_Vippoint.arrrayPlaceVip[15].nickname != null) {
                            this.fillDataTop("ev_15");
                            this.unHideDataTop(15);
                        }
                        this.position_me.x = this.btn_moc_16.x + 3;
                        this.position_me.y = this.btn_moc_16.y + 10;
                        this.position_me.setVisible(true);
                        this.position_me.stopAllActions();
                        this.position_me.runAction(cc.fadeIn(0.2));
                        this.txt_moc.setString(formatMoney(0,3,event_Vippoint.arrrayPlaceVip[15].min));
                    }
                    break;
                case code_event_Vippoint.BTN_HIDE_TOP:
                    if(cc.sys.isNative) {
                        this.hideDataTop();
                    }
                    break;
                case code_event_Vippoint.BTN_BACK_PAGE:
                    if(this.page_bxh != 1)
                        this.page_bxh = this.page_bxh - 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_BACKALL_PAGE:
                    if(this.page_bxh != 1)
                        this.page_bxh = 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_NEXT_PAGE:
                    if(this.page_bxh != this.maxpage)
                        this.page_bxh = this.page_bxh + 1;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_NEXTALL_PAGE:
                    if(this.page_bxh != this.maxpage)
                        this.page_bxh = this.maxpage;
                    this.funLoadOtherPage();
                    break;
                case code_event_Vippoint.BTN_THE_LE:
                    this.pn_thele_event.setVisible(true);
                    this.pn_thele_event.runAction(cc.scaleTo(0.2,1));
                    for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++) {
                        cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
                    }
                    break;
            }
        },
        funLoadOtherPage : function(){
            if(this.IntelOrStrong = false)
                this.reload_Data_Intel(this.page_bxh);
            else
                this.reload_Data_Strong(this.page_bxh);
        },
        hideDataTop : function(){
            event_Vippoint.position_me.runAction(cc.sequence(cc.fadeIn(0.2),cc.callFunc(function(){
                event_Vippoint.position_me.setVisible(false);
            })));

            event_Vippoint.notice_top.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
                event_Vippoint.notice_top.setVisible(false);
            })));
            event_Vippoint.notice_me.setVisible(true);
            event_Vippoint.notice_me.stopAllActions();
            event_Vippoint.notice_me.runAction(cc.fadeIn(0.2));
        },
        unHideDataTop : function(vitri){
            event_Vippoint.notice_top.x = this.array_btn_moc[vitri].x + 25;
            event_Vippoint.notice_top.y = this.array_btn_moc[vitri].y - 40;
            event_Vippoint.notice_top.setVisible(true);
            event_Vippoint.notice_top.stopAllActions();
            event_Vippoint.notice_top.runAction(cc.fadeIn(0.2));

            event_Vippoint.notice_me.runAction(cc.sequence(cc.fadeOut(0.2),cc.callFunc(function(){
                event_Vippoint.notice_me.setVisible(false);
            })));
        },
        fillDataTop : function(vitri){
            vitri = vitri.substr(3,vitri.length);
            if(this.arrrayPlaceVip[vitri].nickname.length >= 15) {
                var nick = this.arrrayPlaceVip[vitri].nickname;
                var head = nick.substring(0, 12);
                var name = head + "...";
                this.txt_name_top.setString(name);
            }else
                this.txt_name_top.setString(this.arrrayPlaceVip[vitri].nickname);
            this.txt_vp_top.setString("Vippoint: " + formatMoney(0,3,this.arrrayPlaceVip[vitri].vippoint));
            this.txt_destroy_top.setString("Thiệt hại: " + formatMoney(0,3,this.arrrayPlaceVip[vitri].subVippoint));
            //this.txt_moc.setString(formatMoney(0,3,this.arrrayPlaceVip[vitri].min));
            if(this.arrrayPlaceVip[vitri].nickname == lobby.userInfo.nickname)
                event_Vippoint.avatar_top.setTexture(menutab.getlinkAvatar(lobby.userInfo.avatar));
            else
                event_Vippoint.avatar_top.setTexture(menutab.getlinkAvatar(this.arrrayPlaceVip[vitri].avatar));
            event_Vippoint.avatar_top.setScale(0.5);
        },
        zoomBigBg_bangxh_vp : function(value){
            if(event_Vippoint.bg_bang_xh_vp.height < value){
                event_Vippoint.bg_bang_xh_vp.height = event_Vippoint.bg_bang_xh_vp.height + 10;
                //event_Vippoint.btn_updown_top_vp.y = event_Vippoint.btn_updown_top_vp.y + 10;
                event_Vippoint.lv_top_xh.height = event_Vippoint.lv_top_xh.height + 9;
                event_Vippoint.runAction(cc.callFunc(function(){
                    event_Vippoint.zoomBigBg_bangxh_vp(453);
                }));
            }else{
                event_Vippoint.bg_bang_xh_vp.height = value;
                event_Vippoint.isRun_table = false;
                event_Vippoint.bg_bxh_che.setVisible(true);
                event_Vippoint.btn_updown_top_vp.setRotation(0);
                event_Vippoint.lv_top_xh.height = 360;
                event_Vippoint.lv_top_xh.refreshView();
            }
        },
        zoomSmallBg_bangxh_vp : function(value){
            if(event_Vippoint.bg_bang_xh_vp.height > value){
                event_Vippoint.bg_bang_xh_vp.height = event_Vippoint.bg_bang_xh_vp.height - 10;
                //event_Vippoint.btn_updown_top_vp.y = event_Vippoint.btn_updown_top_vp.y - 10;
                event_Vippoint.lv_top_xh.height = event_Vippoint.lv_top_xh.height - 10;
                event_Vippoint.runAction(cc.callFunc(function(){
                    event_Vippoint.zoomSmallBg_bangxh_vp(195);
                }));
            }else{
                event_Vippoint.bg_bang_xh_vp.height = value;
                event_Vippoint.isRun_table = false;
                event_Vippoint.btn_updown_top_vp.setRotation(180);
                event_Vippoint.lv_top_xh.height = 95;
            }
        },

        pauseMovePoint : function(){
            for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++){
                cc.eventManager.pauseTarget(event_Vippoint.array_btn_moc[i], true);
            }
        },
        resumeMovePoint : function(){
            for(var i = 0; i< event_Vippoint.array_btn_moc.length; i++){
                cc.eventManager.resumeTarget( event_Vippoint.array_btn_moc[i], true);
            }
        },

        show_event_vip : function () {
            event_Vippoint.pn_event_Vip.setVisible(true);
            event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2,1));
            if(!cc.sys.isNative) {
                this.btn_hide_top.setVisible(false);
            }
        },
        callBackError: function(response){},

        parserGetConfigVippointEvent: function(){
            var url = urlGetEventVippoint(lobby.userInfo.nickname);
            sendRequest(url,null,false,this.callBackDataVippointEvent,this.callBackError);
        },
        callBackDataVippointEvent: function(response){
            var jsonData = JSON.parse(response);
            event_Vippoint.arrrayPlaceVip = jsonData["places"];
            event_Vippoint.placeMe = jsonData["vip"];
            event_Vippoint.avatar_me.setTexture(menutab.getlinkAvatar(lobby.userInfo.avatar));
            event_Vippoint.avatar_me.setScale(0.5);

            var end_event = jsonData["status"];
            var des = jsonData["des"];
            if(end_event == 0){
                event_Vippoint.pn_end_event.setVisible(true);
                event_Vippoint.txt_content_end_event.setString(des);
            }else if(end_event == 1){
                event_Vippoint.pn_end_event.setVisible(false);
                event_Vippoint.txt_content_end_event.setString("");
            }else{
                event_Vippoint.pn_end_event.setVisible(true);
                event_Vippoint.txt_content_end_event.setString(des);
            }

            var button = new ccui.Button();
            if(jsonData["place"].place != 0) {
                button = event_Vippoint.array_btn_moc[jsonData["place"].place - 1];
                event_Vippoint.notice_me.x = button.x + 25;
                event_Vippoint.notice_me.y = button.y - 40;
                event_Vippoint.notice_me.setVisible(true);
                if(jsonData["place"].nickname.length >= 15){
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0,12);
                    var name = head + "...";
                    event_Vippoint.txt_name_me.setString(name);
                }else
                    event_Vippoint.txt_name_me.setString(jsonData["place"].nickname);
                event_Vippoint.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                event_Vippoint.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            }else{
                event_Vippoint.notice_me.x = 368.36;
                event_Vippoint.notice_me.y = 164.17;
                event_Vippoint.notice_me.setVisible(true);
                if(jsonData["place"].nickname.length >= 15){
                    var nick = jsonData["place"].nickname;
                    var head = nick.substring(0,12);
                    var name = head + "...";
                    event_Vippoint.txt_name_me.setString(name);
                }else
                    event_Vippoint.txt_name_me.setString(jsonData["place"].nickname);
                event_Vippoint.txt_vp_me.setString("Vippoint: " + formatMoney(0, 3, jsonData["place"].vippoint));
                event_Vippoint.txt_destroy_me.setString("Thiệt hại: " + formatMoney(0, 3, jsonData["place"].subVippoint));
            }

            if(event_Vippoint.arrayTop!=null)
                while(event_Vippoint.arrayTop.length > 0) {
                    event_Vippoint.arrayTop.pop();
                }

            var DataUser = jsonData["vips"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrayTop.push(counter);

            }
            event_Vippoint.reload_Bangxephang();
            if(!cc.sys.isNative) {
                for (var i = 0; i < event_Vippoint.array_btn_moc.length; i++) {
                    cc.eventManager.addListener(event_Vippoint.onMovePoint.clone(), event_Vippoint.array_btn_moc[i]);
                }
            }
        },
        reload_Bangxephang : function(){
            this.lv_top_xh.removeAllItems();
            this.lv_top_xh.removeAllChildren();
            var cellHeight = 32;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            if(this.arrayTop.length > 0) {
                for (var i = 0; i < this.arrayTop.length; i++) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(event_Vippoint.arrayTop[i].stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(event_Vippoint.arrayTop[i].nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(187.71, positionY));
                    lbvippoint.setString(event_Vippoint.arrayTop[i].vippoint + " VP");

                    lbstt.setColor(cc.color("#f7ebc6"));
                    lbnickname.setColor(cc.color("#f7ebc6"));
                    lbvippoint.setColor(cc.color("#f7ebc6"));

                    if (i == 0) {
                        var vong1 = new cc.Sprite();
                        vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                        lbstt.setColor(cc.color("#ffdf58"));
                        lbnickname.setColor(cc.color("#ffdf58"));
                        lbvippoint.setColor(cc.color("#ffdf58"));
                    } else if (i == 1) {
                        var vong1 = new cc.Sprite();
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else if (i == 2) {
                        var vong1 = new cc.Sprite();
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                        vong1.setPosition(cc.p(21.18, positionY + 2));
                        cellList.addChild(vong1);
                    } else {
                        cellList.addChild(lbstt);
                    }

                    if (event_Vippoint.arrayTop[i].nickname == lobby.userInfo.nickname) {
                        this.isMeInList = true;
                        lbstt.setColor(cc.color("#ffdf58"));
                        lbnickname.setColor(cc.color("#ffdf58"));
                        lbvippoint.setColor(cc.color("#ffdf58"));
                    }

                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                if (this.isMeInList == false) {
                    var cellList = new ccui.Layout();
                    cellList.height = cellHeight;
                    cellList.width = this.lv_top_xh.width;
                    cellList.setPosition(cc.p(0, 0));

                    var lbstt = new cc.LabelTTF('', fonts.fontName, 14, cc.size(25, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbstt.setPosition(cc.p(21.18, positionY));
                    lbstt.setString(event_Vippoint.placeMe.stt);

                    var lbnickname = new cc.LabelTTF('', fonts.fontName, 14, cc.size(120, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbnickname.setPosition(cc.p(93.89, positionY));
                    lbnickname.setString(event_Vippoint.placeMe.nickname);

                    var lbvippoint = new cc.LabelTTF('', fonts.fontName, 14, cc.size(68, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbvippoint.setPosition(cc.p(187.71, positionY));
                    lbvippoint.setString(event_Vippoint.placeMe.vippoint + " VP");

                    lbstt.setColor(cc.color("#67ec8a"));
                    lbnickname.setColor(cc.color("#67ec8a"));
                    lbvippoint.setColor(cc.color("#67ec8a"));

                    cellList.addChild(lbstt);
                    cellList.addChild(lbnickname);
                    cellList.addChild(lbvippoint);
                    this.lv_top_xh.pushBackCustomItem(cellList);
                }
                /// ve 3 vitri dau tien
                // vitri 1
                for (var i = 0; i < 16; i++) {
                    if (event_Vippoint.arrayTop[0].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                        event_Vippoint.sp_vitri1.setVisible(true);
                        var button = new ccui.Button();
                        button = event_Vippoint.array_btn_moc[i];
                        event_Vippoint.sp_vitri1.x = button.x;
                        event_Vippoint.sp_vitri1.y = button.y;
                    }
                    //if (event_Vippoint.arrayTop[1].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                    //    event_Vippoint.sp_vitri2.setVisible(true);
                    //    var button = new ccui.Button();
                    //    button = event_Vippoint.array_btn_moc[i];
                    //    event_Vippoint.sp_vitri2.x = button.x;
                    //    event_Vippoint.sp_vitri2.y = button.y;
                    //}
                    //if (event_Vippoint.arrayTop[2].vippoint >= event_Vippoint.arrrayPlaceVip[i].min) {
                    //    event_Vippoint.sp_vitri3.setVisible(true);
                    //    var button = new ccui.Button();
                    //    button = event_Vippoint.array_btn_moc[i];
                    //    event_Vippoint.sp_vitri3.x = button.x;
                    //    event_Vippoint.sp_vitri3.y = button.y;
                    //}
                }
            }
        },

        parserBXH_Vippoint : function(kind){
            if(kind == false){
                var url = urlBXH_Intel_Vippoint(lobby.userInfo.nickname);
                sendRequest(url,null,false,this.callBackData_Intel,this.callBackError);
            }else{
                var url = urlBXH_Strong_Vippoint(lobby.userInfo.nickname);
                sendRequest(url,null,false,this.callBackData_Strong,this.callBackError);
            }
            //cc.log("url : " + url);
        },
        callBackData_Intel : function(response){
            var jsonData = JSON.parse(response);
            event_Vippoint.IntelMe = jsonData["intel"];
            if(event_Vippoint.arrrayIntel!=null)
                while(event_Vippoint.arrrayIntel.length > 0) {
                    event_Vippoint.arrrayIntel.pop();
                }

            var DataUser = jsonData["intels"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrrayIntel.push(counter);

            }
            event_Vippoint.maxpage = (event_Vippoint.arrrayIntel.length/10);
            event_Vippoint.reload_Data_Intel(event_Vippoint.page_bxh);
        },
        reload_Data_Intel : function(page){
            this.lv_muutri.removeAllItems();
            this.lv_muutri.removeAllChildren();
            this.txt_page.setString(page+"/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            var end = page * 10; var start = end - 10;

            for(var i = 0; i< event_Vippoint.arrrayIntel.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_muutri.width;

                var cellList = null;
                if(i % 2 == 0){
                    cellList = new cc.LayerColor(cc.color(25,23,88,160));
                }else{
                    cellList = new cc.LayerColor(cc.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width =  this.lv_muutri.width;

                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(53,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38,positionY));
                lbstt.setString(event_Vippoint.arrrayIntel[i].stt);

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38,positionY));
                lbaccount.setString(event_Vippoint.arrrayIntel[i].nickname);

                var lbvippoint =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(106,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42,positionY));
                lbvippoint.setString(formatMoney(0,3,event_Vippoint.arrrayIntel[i].vippoint));

                var lbbonus =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(112,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73,positionY));
                lbbonus.setString(event_Vippoint.arrrayIntel[i].bonus);

                var lbplace =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(64,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31,positionY));
                lbplace.setString(event_Vippoint.arrrayIntel[i].place);

                var lbprize =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(260,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91,positionY));
                var str = event_Vippoint.arrrayIntel[i].prize;
                if(event_Vippoint.arrrayIntel[i].prize == null || event_Vippoint.arrrayIntel[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(cc.color("#f7ebc6"));
                lbaccount.setColor(cc.color("#f7ebc6"));
                lbplace.setColor(cc.color("#f7ebc6"));
                lbvippoint.setColor(cc.color("#f7ebc6"));
                lbbonus.setColor(cc.color("#f7ebc6"));
                lbprize.setColor(cc.color("#f7ebc6"));

                if(i == 0){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(cc.color("#ffdf58"));
                    lbaccount.setColor(cc.color("#ffdf58"));
                    lbplace.setColor(cc.color("#ffdf58"));
                    lbvippoint.setColor(cc.color("#ffdf58"));
                    lbbonus.setColor(cc.color("#ffdf58"));
                    lbprize.setColor(cc.color("#ffdf58"));
                }else if(i == 1){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                }else if(i == 2){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                }else{
                    cellList.addChild(lbstt);
                }

                if(event_Vippoint.arrrayIntel[i].nickname == lobby.userInfo.nickname){
                    this.isMeInListIntel = true;
                    lbstt.setColor(cc.color("#ffdf58"));
                    lbaccount.setColor(cc.color("#ffdf58"));
                    lbplace.setColor(cc.color("#ffdf58"));
                    lbvippoint.setColor(cc.color("#ffdf58"));
                    lbbonus.setColor(cc.color("#ffdf58"));
                    lbprize.setColor(cc.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59,positionY + 3));

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4); cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
            if(this.isMeInListIntel == false){
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_muutri.width;

                var cellList = null;
                cellList = new cc.LayerColor(cc.color(25,23,88,160));
                cellList.height = cellHeight;
                cellList.width =  this.lv_muutri.width;

                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(53,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38,positionY));
                if(parseInt(event_Vippoint.IntelMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(event_Vippoint.IntelMe.stt);

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38,positionY));
                lbaccount.setString(event_Vippoint.IntelMe.nickname);

                var lbvippoint =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(106,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippoint.setPosition(cc.p(250.42,positionY));
                lbvippoint.setString(formatMoney(0,3,event_Vippoint.IntelMe.vippoint));

                var lbbonus =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(112,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbbonus.setPosition(cc.p(362.73,positionY));
                lbbonus.setString(event_Vippoint.IntelMe.bonus);

                var lbplace =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(64,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(453.31,positionY));
                lbplace.setString(event_Vippoint.IntelMe.place);

                var lbprize =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(260,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(615.91,positionY));
                var str = event_Vippoint.IntelMe.prize;
                if(event_Vippoint.IntelMe.prize == null || event_Vippoint.IntelMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(cc.color("#67ec8a"));
                lbaccount.setColor(cc.color("#67ec8a"));
                lbplace.setColor(cc.color("#67ec8a"));
                lbvippoint.setColor(cc.color("#67ec8a"));
                lbbonus.setColor(cc.color("#67ec8a"));
                lbprize.setColor(cc.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(305.81,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(419.87,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(484.59,positionY + 3));

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4); cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbplace);
                cellList.addChild(lbvippoint);
                cellList.addChild(lbbonus);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_muutri.pushBackCustomItem(cl1);
            }
        },

        callBackData_Strong : function(response){
            var jsonData = JSON.parse(response);
            event_Vippoint.StrongMe = jsonData["strong"];
            if(event_Vippoint.arrrayStrong!=null)
                while(event_Vippoint.arrrayStrong.length > 0) {
                    event_Vippoint.arrrayStrong.pop();
                }

            var DataUser = jsonData["strongs"];
            for (var i = 0; i < DataUser.length; i++) {
                var counter = DataUser[i];
                event_Vippoint.arrrayStrong.push(counter);

            }
            event_Vippoint.maxpage = (event_Vippoint.arrrayStrong.length/10);
            event_Vippoint.reload_Data_Strong(event_Vippoint.page_bxh);
        },
        reload_Data_Strong : function(page){
            this.lv_kiencuong.removeAllItems();
            this.lv_kiencuong.removeAllChildren();
            this.txt_page.setString(page+"/" + this.maxpage);
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            var end = page * 10; var start = end - 10;

            for(var i = 0; i< event_Vippoint.arrrayStrong.length; i++) {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_kiencuong.width;

                var cellList = null;
                if(i % 2 == 0){
                    cellList = new cc.LayerColor(cc.color(25,23,88,160));
                }else{
                    cellList = new cc.LayerColor(cc.color("#39489E"));
                }
                cellList.height = cellHeight;
                cellList.width =  this.lv_kiencuong.width;

                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(53,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38,positionY));
                lbstt.setString(event_Vippoint.arrrayStrong[i].stt);

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38,positionY));
                lbaccount.setString(event_Vippoint.arrrayStrong[i].nickname);

                var lbvippointSub =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(117,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81,positionY));
                lbvippointSub.setString(formatMoney(0,3,event_Vippoint.arrrayStrong[i].vippointSub));

                var lbdragon =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(122,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42,positionY));
                lbdragon.setString(event_Vippoint.arrrayStrong[i].count);

                var lbplace =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(69,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91,positionY));
                lbplace.setString(event_Vippoint.arrrayStrong[i].place);

                var lbprize =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(260,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41,positionY));
                var str = event_Vippoint.arrrayStrong[i].prize;
                if(event_Vippoint.arrrayStrong[i].prize == null || event_Vippoint.arrrayStrong[i].prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(cc.color("#f7ebc6"));
                lbaccount.setColor(cc.color("#f7ebc6"));
                lbvippointSub.setColor(cc.color("#f7ebc6"));
                lbdragon.setColor(cc.color("#f7ebc6"));
                lbprize.setColor(cc.color("#f7ebc6"));

                if(i == 0){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                    lbstt.setColor(cc.color("#ffdf58"));
                    lbaccount.setColor(cc.color("#ffdf58"));
                    lbvippointSub.setColor(cc.color("#ffdf58"));
                    lbdragon.setColor(cc.color("#ffdf58"));
                    lbplace.setColor(cc.color("#ffdf58"));
                    lbprize.setColor(cc.color("#ffdf58"));
                }else if(i == 1){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                }else if(i == 2){
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(27.38,positionY + 2));
                    cellList.addChild(vong1);
                }else{
                    cellList.addChild(lbstt);
                }

                if(event_Vippoint.arrrayStrong[i].nickname == lobby.userInfo.nickname){
                    this.isMeInListStrong = true;
                    lbstt.setColor(cc.color("#ffdf58"));
                    lbaccount.setColor(cc.color("#ffdf58"));
                    lbvippointSub.setColor(cc.color("#ffdf58"));
                    lbdragon.setColor(cc.color("#ffdf58"));
                    lbplace.setColor(cc.color("#ffdf58"));
                    lbprize.setColor(cc.color("#ffdf58"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81,positionY + 3));

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4); cellList.addChild(aSprite5);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
            if(this.isMeInListStrong == false){
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_kiencuong.width;

                var cellList = null;
                cellList = new cc.LayerColor(cc.color(25,23,88,160));
                cellList.height = cellHeight;
                cellList.width =  this.lv_kiencuong.width;

                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(53,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(27.38,positionY));
                if(parseInt(event_Vippoint.StrongMe.stt) == 0)
                    lbstt.setString("--");
                else
                    lbstt.setString(event_Vippoint.StrongMe.stt);

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(124.38,positionY));
                lbaccount.setString(event_Vippoint.StrongMe.nickname);

                var lbvippointSub =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(106,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbvippointSub.setPosition(cc.p(253.81,positionY));
                lbvippointSub.setString(formatMoney(0,3,event_Vippoint.StrongMe.vippointSub));

                var lbdragon =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(112,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdragon.setPosition(cc.p(373.42,positionY));
                lbdragon.setString(event_Vippoint.StrongMe.count);

                var lbplace =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(69,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbplace.setPosition(cc.p(468.91,positionY));
                lbplace.setString(event_Vippoint.StrongMe.place);

                var lbprize =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(260,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbprize.setPosition(cc.p(608.41,positionY));
                var str = event_Vippoint.IntelMe.prize;
                if(event_Vippoint.IntelMe.prize == null || event_Vippoint.StrongMe.prize == "null")
                    str = "";
                lbprize.setString(str);

                lbstt.setColor(cc.color("#67ec8a"));
                lbaccount.setColor(cc.color("#67ec8a"));
                lbvippointSub.setColor(cc.color("#67ec8a"));
                lbdragon.setColor(cc.color("#67ec8a"));
                lbplace.setColor(cc.color("#67ec8a"));
                lbprize.setColor(cc.color("#67ec8a"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(53,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(193.91,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(311.37,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(432.81,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(502.81,positionY + 3));

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4); cellList.addChild(aSprite5);

                cellList.addChild(lbstt);
                cellList.addChild(lbaccount);
                cellList.addChild(lbvippointSub);
                cellList.addChild(lbdragon);
                cellList.addChild(lbplace);
                cellList.addChild(lbprize);

                cl1.addChild(cellList);
                this.lv_kiencuong.pushBackCustomItem(cl1);
            }
        },

        funDragonEvent : function(){
            event_Vippoint.number_nhay = event_Vippoint.number_nhay + 1;
            if(event_Vippoint.number_nhay <= 3) {
                event_Vippoint.event_run.setVisible(true);
                event_Vippoint.event_run.runAction(cc.sequence(cc.fadeIn(0.35), cc.delayTime(2.5), cc.fadeOut(0.35), cc.callFunc(function () {
                    event_Vippoint.event_run.setVisible(false);
                }), cc.delayTime(1.5), cc.callFunc(function () {
                    event_Vippoint.funDragonEvent();
                })));
            }else{
                event_Vippoint.event_run.stopAllActions();
                event_Vippoint.number_nhay = 0;
                event_Vippoint.event_run.setVisible(false);
                event_Vippoint.event_run.runAction(cc.fadeOut(0));
            }
        }
    }
);
code_event_Vippoint.BTN_CLOSE_EVENT_VIP = 1;
code_event_Vippoint.BTN_MOC_1 = 2;
code_event_Vippoint.BTN_MOC_2 = 3;
code_event_Vippoint.BTN_MOC_3 = 4;
code_event_Vippoint.BTN_MOC_4 = 5;
code_event_Vippoint.BTN_MOC_5 = 6;
code_event_Vippoint.BTN_MOC_6 = 7;
code_event_Vippoint.BTN_MOC_7 = 8;
code_event_Vippoint.BTN_MOC_8 = 9;
code_event_Vippoint.BTN_MOC_9 = 10;
code_event_Vippoint.BTN_MOC_10 = 11;
code_event_Vippoint.BTN_MOC_11 = 12;
code_event_Vippoint.BTN_MOC_12 = 13;
code_event_Vippoint.BTN_MOC_13 = 14;
code_event_Vippoint.BTN_MOC_14 = 15;
code_event_Vippoint.BTN_MOC_15 = 16;
code_event_Vippoint.BTN_MOC_16 = 17;

code_event_Vippoint.BTN_UPDOWN_VP = 18;

code_event_Vippoint.BTN_MUU_TRI = 19;
code_event_Vippoint.BTN_KIEN_CUONG = 20;
code_event_Vippoint.BTN_CLOSE_BANG_XH = 21;

code_event_Vippoint.BTN_OPEN_BANG_XH = 22;
code_event_Vippoint.BTN_THE_LE = 23;
code_event_Vippoint.BTN_HIDE_TOP = 24;

code_event_Vippoint.BTN_BACK_PAGE = 25;
code_event_Vippoint.BTN_BACKALL_PAGE = 26;
code_event_Vippoint.BTN_NEXT_PAGE = 27;
code_event_Vippoint.BTN_NEXTALL_PAGE = 28;
code_event_Vippoint.BTN_CLOSE_THELE_EVENT = 29;


openEvent_Vip = function () {
    if (event_Vippoint === null) {
        event_Vippoint = new code_event_Vippoint();
        event_VippointX = event_Vippoint.getPosition().x;
        event_VippointY = event_Vippoint.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(event_Vippoint,BaseScene.INDEX_INFO_GUI, 0);
    }
    else
    {
        event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2,1));
        if (!cc.sys.isNative)
            event_Vippoint.resumeMovePoint();
    }
    event_VippointAppear = true;
    event_Vippoint.parserGetConfigVippointEvent();
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closeEvent_Vip = function () {
    if (event_Vippoint === null) {
        return;
    }
    if(event_VippointAppear) {
        event_Vippoint.pn_event_Vip.runAction(cc.scaleTo(0.2,0));
        event_VippointAppear = false;
        event_Vippoint.isMeInListIntel = false;
        event_Vippoint.isMeInListStrong = false;
        event_Vippoint.isMeInList = false;
        if (!cc.sys.isNative) {
            lobby.resumeItemGameListen();
            event_Vippoint.pauseMovePoint();
        }
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};

