var caothap_sanbai = null;
var caothap_sanbaiX = 0;
var caothap_sanbaiY = 0;
var caothap_sanbaiAppear = false;

var codeCaoThap_sanbai = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseSanBaiCT = null;
            this.pn_sanbaidep = null;
            this.sp_bxh_ngay = null;
            this.sp_thele = null;
            this.sp_bxh_thang = null;
            this.btn_bxh_ngay = null;
            this.btn_bxh_thang = null;
            this.btn_thele = null;
            this.vinxu_sanbai = null;
            this.lv_sanbaidep = null;
            this.arrSanBai = [];
            this.pn_title_sanbai = null;
            this.pn_thele = null;
            this.currentpage = 1;
            this.currentMonth = null; this.currentYear = null; this.currentDay = null;
            this.monthChange = null;
            this.timeshow = null;
            this.btn_chosedaymonth = null;
            this.lb_thang = null;
            this.btn_close_chosedaymonth = null;

            this.pn_chon_ngay = null;
            this.btn_backmonth = null; this. btn_nextmonth = null;
            this.event_month = null;
            this.getDayOrMonth = 0; // get top ngay
            this.isfirstRun = false;
            this.choseMonth = null; this.choseDay = null; this.choseYear = null;
            this.posx = 24.93; this.posy = 76.58;
            this.Send_date = null; this.Send_month = null;
            this.txt_giaithuong1 = null; this.txt_giaithuong = null;
            this.txt_prize_sp_thang = null;
            this.btn_select_month = null;
            this.bg_chon_ngay = null;
            this.nen_chon_ngay = null;
            this.lb_nam = null; this.save_pos_nam = null;
            this.tx_giaiba = null; this.tx_giaiba1 = null;
            this.tx_giainhi = null; this.tx_giainhi1 = null;
            this.tx_giainhat = null; this.tx_giainhat1 = null;
            this.tx_sl_nhat = null;
            this.tx_sl_nhi = null;
            this.tx_sl_ba = null;
            this.tx_sl_dacbiet = null;
            this.iswait = false;

            this._super("codeCaoThap_sanbai");
            this.initWithBinaryFile("res/CaoThap_sanbaidep.json");
            return true;
        },
        customizeGUI: function() {
            this.pn_sanbaidep = this._layout.getChildByName("pn_sanbaidep");
            this.pn_sanbaidep.setScale(0);
            this.pn_sanbaidep.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseSanBaiCT = this.customButton("btnCloseSanBaiCT", codeCaoThap_sanbai.BTN_CLOSE_SANBAI_CAOTHAP, this.pn_sanbaidep);

            this.sp_bxh_ngay = this.pn_sanbaidep.getChildByName("sp_bxh_ngay");
            this.sp_thele = this.pn_sanbaidep.getChildByName("sp_thele");
            this.sp_bxh_thang = this.pn_sanbaidep.getChildByName("sp_bxh_thang");
            this.btn_bxh_ngay = this.customButton("btn_bxh_ngay", codeCaoThap_sanbai.BTN_BXH_NGAY, this.pn_sanbaidep);
            this.btn_bxh_thang = this.customButton("btn_bxh_thang", codeCaoThap_sanbai.BTN_BXH_THANG, this.pn_sanbaidep);
            this.btn_thele = this.customButton("btn_thele", codeCaoThap_sanbai.BTN_THELE, this.pn_sanbaidep);

            this.pn_title_sanbai = this.pn_sanbaidep.getChildByName("pn_title_sanbai");
            this.btn_chosedaymonth = this.customButton("btn_chosedaymonth", codeCaoThap_sanbai.BTN_CHOSEDAYMONTH, this.pn_title_sanbai);
            this.pn_thele = this.pn_sanbaidep.getChildByName("pn_thele"); this.pn_thele.setScrollBarEnabled(false);
            this.txt_giaithuong1 = this.pn_thele.getChildByName("txt_giaithuong1");
            this.txt_giaithuong = this.pn_thele.getChildByName("txt_giaithuong");
            this.txt_prize_sp_thang = this.pn_thele.getChildByName("txt_prize_sp_thang");
            this.tx_giaiba = this.pn_thele.getChildByName("tx_giaiba");
            this.tx_giaiba1 = this.pn_thele.getChildByName("tx_giaiba1");
            this.tx_giainhi = this.pn_thele.getChildByName("tx_giainhi");
            this.tx_giainhi1 = this.pn_thele.getChildByName("tx_giainhi1");
            this.tx_giainhat = this.pn_thele.getChildByName("tx_giainhat");
            this.tx_giainhat1 = this.pn_thele.getChildByName("tx_giainhat1");

            this.tx_sl_nhat = this.pn_thele.getChildByName("tx_sl_nhat");
            this.tx_sl_nhi = this.pn_thele.getChildByName("tx_sl_nhi");
            this.tx_sl_ba = this.pn_thele.getChildByName("tx_sl_ba");
            this.tx_sl_dacbiet = this.pn_thele.getChildByName("tx_sl_dacbiet");

            this.pn_chon_ngay = this.pn_sanbaidep.getChildByName("pn_chon_ngay");
            this.btn_close_chosedaymonth = this.customButton("btn_close_chosedaymonth", codeCaoThap_sanbai.BTN_CLOSE_CHOSEDAYMONTH, this.pn_chon_ngay);

            this.btn_backmonth = this.customButton("btn_backmonth", codeCaoThap_sanbai.BTN_BACK_CHOSE_MONTH, this.pn_chon_ngay);
            this.btn_nextmonth = this.customButton("btn_nextmonth", codeCaoThap_sanbai.BTN_NEXT_CHOSE_MONTH, this.pn_chon_ngay);
            this.btn_select_month = this.customButton("btn_select_month", codeCaoThap_sanbai.BTN_SELECT_MONTH, this.pn_chon_ngay);
            this.btn_select_month.setVisible(false);

            this.bg_chon_ngay = this.pn_chon_ngay.getChildByName("bg_chon_ngay");
            this.nen_chon_ngay = this.pn_chon_ngay.getChildByName("nen_chon_ngay");
            this.lb_nam = this.pn_chon_ngay.getChildByName("lb_nam");
            this.save_pos_nam = this.lb_nam.y;

            // add button day
            for(var i = 1; i < 34 ; i ++){
                var button = new ccui.Button();
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                button.loadTextures("Minigame/ImageChung/btn_value.png", "Minigame/ImageChung/btn_value_s.png", "Minigame/ImageChung/btn_value_s.png",ccui.Widget.PLIST_TEXTURE);
                button.setPosition(cc.p(this.posx,this.posy));
                if(i == 32){
                    button.setPosition(cc.p(197.15,-133.20));
                    button.setName("btn_nam_2016");
                    button.setTitleFontSize(15);
                    button.setTitleText("2016");
                }else if(i == 33){
                    button.setPosition(cc.p(240.15,-133.20));
                    button.setName("btn_nam_2017");
                    button.setTitleFontSize(15);
                    button.setTitleText("2017");
                }else{
                    button.setPosition(cc.p(this.posx,this.posy));
                    button.setName("btn_ngay" + i);
                    button.setTitleFontSize(22);
                    button.setTitleText(i);
                }

                this.pn_chon_ngay.addChild(button);
                button.setTitleFontName("res/Font/Roboto-Bold.ttf");
                button.setTitleColor(cc.color("#5B5959"));
                if(i == 32 || i == 33){
                    button.setVisible(false);
                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.btn_chose_Year(sender.getName());
                                break;
                        }

                    }, this);
                }else {
                    button.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.closePn_chon_ngay(sender.getName());
                                break;
                        }

                    }, this);
                }
                this.posx = this.posx + 43;
                if(this.posx > 239.93){
                    this.posx = 24.93; this.posy = this.posy - 41.78;
                }
            }

            this.lb_thang = this.pn_chon_ngay.getChildByName("lb_thang");

            this.pn_chon_ngay.setScale(0); this.pn_chon_ngay.setVisible(false);

            this.lv_sanbaidep = this.getControl("lv_sanbaidep",this.pn_sanbaidep);
            this.lv_sanbaidep.setTouchEnabled(true);
            this.lv_sanbaidep.setClippingEnabled(true);
            this.lv_sanbaidep.setScrollBarEnabled(false);

            this.addMasterLayer(this.pn_sanbaidep);
            
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            this.currentDay = day;
            this.currentMonth = month;
            this.currentYear = year;

            if(parseInt(day) < 10) day = "0" + day;
            if(parseInt(month) < 10) month = "0" + month;
            this.Send_date = year + "-" + month + "-" + day ;
            this.Send_month = year + "-" + month;
        },
        daysInMonth : function (month,year) {
            return new Date(year, month, 0).getDate();
        },
        onshow :function(){
            this.pn_sanbaidep.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeCaoThap_sanbai.BTN_CLOSE_SANBAI_CAOTHAP:
                    close_caothap_sanbai();
                    break;
                case codeCaoThap_sanbai.BTN_BXH_NGAY:
                    if(this.iswait == false) {
                        this.gotoGui(1);
                    }
                    break;
                case codeCaoThap_sanbai.BTN_THELE:
                    this.gotoGui(0);
                    break;
                case codeCaoThap_sanbai.BTN_BXH_THANG:
                    if(this.iswait == false) {
                        this.gotoGui(2);
                    }
                    break;
                case codeCaoThap_sanbai.BTN_CHOSEDAYMONTH:
                    this.pn_chon_ngay.runAction(cc.scaleTo(0.2,1)); this.pn_chon_ngay.setVisible(true);
                    this.openpanel_chonngay();
                    break;
                case codeCaoThap_sanbai.BTN_CLOSE_CHOSEDAYMONTH:
                    this.pn_chon_ngay.runAction(cc.scaleTo(0.2,0)); this.pn_chon_ngay.setVisible(false);
                    break;
                case codeCaoThap_sanbai.BTN_BACK_CHOSE_MONTH:
                    if(this.choseMonth > 1){
                        this.choseMonth = this.choseMonth - 1;
                        this.lb_thang.setColor(cc.color("#FFFFFF"));
                        if (this.choseMonth > 9)
                            this.lb_thang.setString("Tháng " + this.choseMonth + "/" + this.choseYear);
                        else
                            this.lb_thang.setString("Tháng 0" + this.choseMonth + "/" + this.choseYear);

                        if(this.getDayOrMonth == 0)
                            this.findCurrentDay(this.choseMonth);
                    }else{
                        this.choseMonth = 12;
                        this.choseYear = this.choseYear - 1;
                        this.lb_thang.setString("Tháng " + this.choseMonth + "/" + this.choseYear);
                        if(this.getDayOrMonth == 0)
                            this.findCurrentDay(this.choseMonth);
                    }
                    break;
                case codeCaoThap_sanbai.BTN_NEXT_CHOSE_MONTH:
                    if(this.choseMonth < 12){
                        this.choseMonth = this.choseMonth + 1;
                        this.lb_thang.setColor(cc.color("#FFFFFF"));
                        if (this.choseMonth > 9)
                            this.lb_thang.setString("Tháng " + this.choseMonth + "/" + this.choseYear);
                        else
                            this.lb_thang.setString("Tháng 0" + this.choseMonth + "/" + this.choseYear);

                        if(this.getDayOrMonth == 0)
                            this.findCurrentDay(this.choseMonth);
                    }else{
                        this.choseMonth = 1;
                        this.choseYear = this.choseYear + 1;
                        this.lb_thang.setString("Tháng 0" + this.choseMonth + "/" + this.choseYear);
                        if(this.getDayOrMonth == 0)
                            this.findCurrentDay(this.choseMonth);
                    }
                    break;
                case codeCaoThap_sanbai.BTN_SELECT_MONTH:
                    if(this.iswait == false) {
                        this.pn_chon_ngay.runAction(cc.scaleTo(0.2, 0));
                        this.pn_chon_ngay.setVisible(false);
                        if (caothap_sanbai.choseMonth < 10) {
                            this.btn_chosedaymonth.setTitleText("Tháng 0" + this.choseMonth + "/" + this.choseYear);
                            this.Send_month = this.choseYear + "-0" + this.choseMonth;
                        }
                        else {
                            this.btn_chosedaymonth.setTitleText("Tháng " + this.choseMonth + "/" + this.choseYear);
                            this.Send_month = this.choseYear + "-" + this.choseMonth;
                        }
                        this.parserDataEventCaoThap(this.getDayOrMonth);
                    }
                    break;
            }
        },

        btn_chose_Year:function(year){
            if(year == "btn_nam_2016"){
                this.choseYear = 2016;
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                this.pn_chon_ngay.getChildByName("btn_nam_2016").loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
                this.pn_chon_ngay.getChildByName("btn_nam_2017").loadTextureNormal("Minigame/ImageChung/btn_value.png",ccui.Widget.PLIST_TEXTURE);
            }else{
                this.choseYear = 2017;
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                this.pn_chon_ngay.getChildByName("btn_nam_2016").loadTextureNormal("Minigame/ImageChung/btn_value.png",ccui.Widget.PLIST_TEXTURE);
                this.pn_chon_ngay.getChildByName("btn_nam_2017").loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
            }
            if(this.getDayOrMonth == 0)
                this.checkdayinmonth(this.choseMonth,this.choseYear);
        },

        openpanel_chonngay : function(){
            var str = this.btn_chosedaymonth.getTitleText();
            str = str.substr(5,str.length - 5);
            //cc.log("day : " + this.choseDay + " thang : " + this.choseMonth + " nam : " + this.choseYear);
            if(parseInt(this.choseMonth) > 9)
                this.lb_thang.setString("Tháng " + this.choseMonth + "/" + this.choseYear);
            else
                this.lb_thang.setString("Tháng 0" + this.choseMonth + "/" + this.choseYear);
        },

        closePn_chon_ngay : function(day){
            if(this.iswait == false) {
                var str = day.substr(8, day.length - 8);
                this.choseDay = parseInt(str);
                this.pn_chon_ngay.runAction(cc.scaleTo(0.2, 0));
                if (parseInt(str) > 9) {
                    if (this.choseMonth > 9) {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày " + str + "/" + this.choseMonth + "/" + this.choseYear);
                        this.Send_date = this.choseYear + "-" + this.choseMonth + "-" + str;
                    } else {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày " + str + "/0" + this.choseMonth + "/" + this.choseYear);
                        this.Send_date = this.choseYear + "-0" + this.choseMonth + "-" + str;
                    }
                } else {
                    if (this.choseMonth > 9) {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày 0" + str + "/" + this.choseMonth + "/" + this.choseYear);
                        this.Send_date = this.choseYear + "-" + this.choseMonth + "-0" + str;
                    } else {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày 0" + str + "/0" + this.choseMonth + "/" + this.choseYear);
                        this.Send_date = this.choseYear + "-0" + this.choseMonth + "-0" + str;
                    }
                }
                this.parserDataEventCaoThap(this.getDayOrMonth);
            }
        },

        findCurrentDay : function(month){
            //cc.log("thang : " + month + " va " + parseInt(this.currentMonth));
            this.checkdayinmonth(month,this.choseYear);
            if(month == parseInt(this.currentMonth) && this.choseYear == this.currentYear) {
                //cc.log("trung day : " + parseInt(day));
                var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + parseInt(this.currentDay));
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                btn.loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
            }else{
                this.resetButtonDay();
            }
        },

        checkdayinmonth : function (month,year){
           // cc.log("thang : " + month);
            var numberDay = this.daysInMonth(month,year);
            for(var i = 29; i < 32; i++){
                var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                btn.setVisible(true);
            }
            //this.btn_ngay29.setVisible(true); this.btn_ngay30.setVisible(true); this.btn_ngay31.setVisible(true);
            if(numberDay == 30){
                var btn = this.pn_chon_ngay.getChildByName("btn_ngay31");
                btn.setVisible(false);
            }else if(numberDay == 29){
                for(var i = 30; i < 32; i++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                    btn.setVisible(false);
                }
            }else if(numberDay == 28){
                for(var i = 29; i < 32; i++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                    btn.setVisible(false);
                }
            }
        },
        resetButtonDay : function (){
            for(var i = 1; i <32; i++){
                var btn = new ccui.Button();
                var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                btn.loadTextureNormal("Minigame/ImageChung/btn_value.png",ccui.Widget.PLIST_TEXTURE);
            }
        },

        gotoGui : function (value){
            if(value == 1){
                caothap_sanbai.btn_bxh_ngay.setEnabled(false); caothap_sanbai.btn_bxh_thang.setEnabled(true); caothap_sanbai.btn_thele.setEnabled(true);
                caothap_sanbai.sp_bxh_ngay.setTexture("res/Minigame/ImageChung/btn_thanhdu.png"); caothap_sanbai.sp_thele.setTexture("res/Minigame/ImageChung/btn_thanhdu_s.png");
                caothap_sanbai.sp_bxh_thang.setTexture("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                this.pn_thele.setVisible(false); this.pn_title_sanbai.setVisible(true); this.lv_sanbaidep.setVisible(true);
                this.getDayOrMonth = 0;
                this.btn_select_month.setVisible(false);
                if(caothap_sanbai.currentDay < 10) {
                    this.btn_chosedaymonth.setTitleText("Ngày 0" +this.currentDay + "/" +this.currentMonth + "/" + this.currentYear);
                    this.Send_date = this.currentYear + "-" + this.currentMonth + "-0" + this.currentDay ;
                    if(caothap_sanbai.currentMonth < 10) {
                        this.btn_chosedaymonth.setTitleText("Ngày 0" +this.currentDay + "/0" +this.currentMonth + "/" + this.currentYear);
                        this.Send_date = this.currentYear + "-0" + this.currentMonth + "-0" + this.currentDay ;
                    }
                }
                else {
                    this.btn_chosedaymonth.setTitleText("Ngày " +this.currentDay + "/" +this.currentMonth + "/" + this.currentYear);
                    this.Send_date = this.currentYear + "-" + this.currentMonth + "-" + this.currentDay ;
                    if(caothap_sanbai.currentMonth < 10) {
                        this.btn_chosedaymonth.setTitleText("Ngày " +this.currentDay + "/0" +this.currentMonth + "/" + this.currentYear);
                        this.Send_date = this.currentYear + "-0" + this.currentMonth + "-" + this.currentDay ;
                    }
                }
                for(var i = 1; i < 32 ; i ++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                    btn.setVisible(true);
                }
                this.bg_chon_ngay.setScaleY(1.94);
                this.nen_chon_ngay.setScaleY(1);
                this.lb_nam.y = this.save_pos_nam;
                for(var i = 6; i < 8 ; i ++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_nam_201" + i);
                    btn.y = this.lb_nam.y;
                }
                caothap_sanbai.parserDataEventCaoThap(this.getDayOrMonth);
                caothap_sanbai.findCurrentDay(this.currentMonth);
            }else if(value == 0){
                caothap_sanbai.btn_bxh_ngay.setEnabled(true); caothap_sanbai.btn_bxh_thang.setEnabled(true);  caothap_sanbai.btn_thele.setEnabled(false);
                caothap_sanbai.sp_bxh_ngay.setTexture("res/Minigame/ImageChung/btn_thanhdu_s.png"); caothap_sanbai.sp_thele.setTexture("res/Minigame/ImageChung/btn_thanhdu.png");
                caothap_sanbai.sp_bxh_thang.setTexture("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                this.pn_thele.setVisible(true); this.pn_title_sanbai.setVisible(false); this.lv_sanbaidep.setVisible(false);
                if(caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao") != null)
                    caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao").setString("");
            }else{
                caothap_sanbai.btn_bxh_ngay.setEnabled(true); caothap_sanbai.btn_bxh_thang.setEnabled(false);  caothap_sanbai.btn_thele.setEnabled(true);
                caothap_sanbai.sp_bxh_ngay.setTexture("res/Minigame/ImageChung/btn_thanhdu_s.png"); caothap_sanbai.sp_thele.setTexture("res/Minigame/ImageChung/btn_thanhdu_s.png");
                caothap_sanbai.sp_bxh_thang.setTexture("res/Minigame/ImageChung/btn_thanhdu_mid.png");
                this.pn_thele.setVisible(false); this.pn_title_sanbai.setVisible(true); this.lv_sanbaidep.setVisible(true);
                this.getDayOrMonth = 1;
                this.btn_select_month.setVisible(true);
                if(caothap_sanbai.currentMonth < 10) {
                    this.btn_chosedaymonth.setTitleText("Tháng 0" +this.currentMonth + "/" + this.currentYear);
                    this.Send_month = this.currentYear + "-0" + this.currentMonth;
                }
                else {
                    this.btn_chosedaymonth.setTitleText("Tháng " +this.currentMonth + "/" + this.currentYear);
                    this.Send_month = this.currentYear + "-" + this.currentMonth;
                }
                for(var i = 1; i < 32 ; i ++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_ngay" + i);
                    btn.setVisible(false);
                }
                this.bg_chon_ngay.setScaleY(0.64);
                this.nen_chon_ngay.setScaleY(0.3);
                this.lb_nam.y = 76.58;
                for(var i = 6; i < 8 ; i ++){
                    var btn = this.pn_chon_ngay.getChildByName("btn_nam_201" + i);
                    btn.y = this.lb_nam.y;
                }
                caothap_sanbai.parserDataEventCaoThap(this.getDayOrMonth);
            }
            this.choseDay = this.currentDay; this.choseMonth = this.currentMonth; this.choseYear = this.currentYear;
            caothap_sanbai.currentpage = 1;
        },

        addLoading : function(){
            if(this.pn_sanbaidep.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(407,166.99));
                loading.setName("loadingdata");
                this.pn_sanbaidep.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_sanbaidep.getChildByName("loadingdata").setVisible(true);
                this.pn_sanbaidep.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_sanbaidep.getChildByName("loadingdata").stopAllActions();
            this.pn_sanbaidep.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            caothap_sanbai.iswait = false;
            this.closeLoading();
        },

        parserDataEventCaoThap: function(dayormonth)
        {
            if(dayormonth == 0)
                var url = urlEventCaoThapDate(dayormonth,this.Send_date);
            else
                var url = urlEventCaoThapMonth(dayormonth,this.Send_month);
            //cc.log("url = " + url);
            sendRequest(url,null,false,caothap_sanbai.callBackEvent,caothap_sanbai.callBackError);
            caothap_sanbai.iswait = true;
            this.addLoading();
        },
        callBackEvent:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            var giaithuong = jsonData["prizes"];
            //cc.log("giaithuong : " + giaithuong[3].prize);

            if(success)
            {
                if(caothap_sanbai.arrSanBai!=null)
                    while(caothap_sanbai.arrSanBai.length > 0) {
                        caothap_sanbai.arrSanBai.pop();
                    }
                if(caothap_sanbai.getChildByName("lb_thongbao") != null)
                    caothap_sanbai.getChildByName("lb_thongbao").setString("");

                var EventCaoThap = jsonData["results"];
                if(EventCaoThap == ""){
                    //cc.log("Chưa có bảng xếp hạng");
                    if(caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao") == null) {
                        var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
                        var lbnotice = new cc.LabelTTF('', fonts.fontName, 14, cc.size(350, 30), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lbnotice.setPosition(cc.p(407, 260));
                        lbnotice.setName("lb_thongbao");
                        lbnotice.setString("Chưa có bảng xếp hạng");
                        lbnotice.setColor(cc.color("#e8daad"));
                        caothap_sanbai.pn_sanbaidep.addChild(lbnotice);
                        caothap_sanbai.closeLoading();
                    }else{
                        caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao").setString("Chưa có bảng xếp hạng");
                        caothap_sanbai.closeLoading();
                    }
                }else{
                    if(caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao") != null)
                        caothap_sanbai.pn_sanbaidep.getChildByName("lb_thongbao").setString("");
                }

                for (var i = 0; i < EventCaoThap.length; i++) {
                    var counter = EventCaoThap[i];
                    caothap_sanbai.arrSanBai.push(counter);

                }
                caothap_sanbai.reload_Event();
                if(caothap_sanbai.isfirstRun == false) {
                    caothap_sanbai.txt_giaithuong1.setString(giaithuong[0].prize);
                    caothap_sanbai.txt_giaithuong.setString(giaithuong[0].prize);
                    caothap_sanbai.txt_prize_sp_thang.setString(giaithuong[0].money);
                    caothap_sanbai.tx_sl_dacbiet.setString(giaithuong[0].num);

                    caothap_sanbai.tx_giaiba.setString(giaithuong[3].prize);
                    caothap_sanbai.tx_giaiba1.setString(giaithuong[3].money);
                    caothap_sanbai.tx_sl_ba.setString(giaithuong[3].num);

                    caothap_sanbai.tx_giainhi.setString(giaithuong[2].prize);
                    caothap_sanbai.tx_giainhi1.setString(giaithuong[2].money);
                    caothap_sanbai.tx_sl_nhi.setString(giaithuong[2].num);

                    caothap_sanbai.tx_giainhat.setString(giaithuong[1].prize);
                    caothap_sanbai.tx_giainhat1.setString(giaithuong[1].money);
                    caothap_sanbai.tx_sl_nhat.setString(giaithuong[1].num);

                    caothap_sanbai.choseMonth = parseInt(caothap_sanbai.currentMonth);
                    caothap_sanbai.choseDay = parseInt(caothap_sanbai.currentDay);
                    caothap_sanbai.choseYear = parseInt(caothap_sanbai.currentYear);
                    caothap_sanbai.findCurrentDay(caothap_sanbai.currentMonth);
                    caothap_sanbai.lb_thang.setString("Tháng " + caothap_sanbai.currentMonth);
                    if(parseInt(caothap_sanbai.currentYear) == 2016) {
                        cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                        caothap_sanbai.pn_chon_ngay.getChildByName("btn_nam_2016").loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
                    }else {
                        cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                        caothap_sanbai.pn_chon_ngay.getChildByName("btn_nam_2017").loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
                    }
                    caothap_sanbai.isfirstRun = true;
                    if(caothap_sanbai.currentDay < 10) {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày 0" + caothap_sanbai.currentDay + "/" + caothap_sanbai.currentMonth + "/" + caothap_sanbai.currentYear);
                        if(caothap_sanbai.currentMonth < 10) {
                            caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày 0" + caothap_sanbai.currentDay + "/0" + caothap_sanbai.currentMonth + "/" + caothap_sanbai.currentYear);
                        }
                    }
                    else {
                        caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày " + caothap_sanbai.currentDay + "/" + caothap_sanbai.currentMonth + "/" + caothap_sanbai.currentYear);
                        if(caothap_sanbai.currentMonth < 10) {
                            caothap_sanbai.btn_chosedaymonth.setTitleText("Ngày " + caothap_sanbai.currentDay + "/0" + caothap_sanbai.currentMonth + "/" + caothap_sanbai.currentYear);
                        }
                    }
                }
            }
            caothap_sanbai.iswait = false;
        },

        reload_Event:function()
        {
            this.lv_sanbaidep.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrSanBai.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_sanbaidep.width;

                var cellList = null;
                if(i % 2 == 0)
                {
                    cellList = new cc.LayerColor(cc.color(25,23,88,160));
                }else
                {
                    cellList = new cc.LayerColor(cc.color("#39489E"));
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.lv_sanbaidep.width;

                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(49,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setAnchorPoint(0.5,0.5);
                lbstt.setPosition(cc.p(24.71,positionY));
                lbstt.setString(caothap_sanbai.arrSanBai[i].stt);
                lbstt.setColor(cc.color("#e8daad"));

                var lbNickname =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(131,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbNickname.setAnchorPoint(0.5,0.5);
                lbNickname.setPosition(cc.p(114.92,positionY));
                lbNickname.setString(caothap_sanbai.arrSanBai[i].nickname);
                lbNickname.setColor(cc.color("#e8daad"));

                var lbhand =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(170,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbhand.setAnchorPoint(0.5,0.5);
                lbhand.setPosition(cc.p(266.08,positionY));
                lbhand.setString(caothap_sanbai.arrSanBai[i].hand);
                lbhand.setColor(cc.color("#e8daad"));

                var lbthang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(130,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbthang.setPosition(cc.p(426.42,positionY));
                lbthang.setString(formatMoney(0,3,parseInt(caothap_sanbai.arrSanBai[i].money)));
                lbthang.setColor(cc.color("#E702FE"));

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(144,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(574.31,positionY));
                if(caothap_sanbai.getDayOrMonth == 0)
                    lbTime.setString(caothap_sanbai.formatGetTimeCT(caothap_sanbai.arrSanBai[i].timestamp));
                else
                    lbTime.setString(caothap_sanbai.arrSanBai[i].timestamp);
                lbTime.setColor(cc.color("#e8daad"));


                var lbNhanThuong =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(133,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbNhanThuong.setPosition(cc.p(712.98,positionY));
                lbNhanThuong.setString(caothap_sanbai.arrSanBai[i].prize);
                lbNhanThuong.setColor(cc.color("#F3F354"));

                if(caothap_sanbai.arrSanBai[i].nickname == lobby.userInfo.nickname){
                    lbstt.setColor(cc.color("#FCFC88"));
                    lbNickname.setColor(cc.color("#FCFC88"));
                    lbhand.setColor(cc.color("#FCFC88"));
                    lbTime.setColor(cc.color("#FCFC88"));
                }

                if(i == 0)
                {
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(24.71,positionY + 2));
                    cellList.addChild(vong1);
                }

                if(i == 1)
                {
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    vong1.setPosition(cc.p(24.71,positionY + 2));
                    cellList.addChild(vong1);
                }

                if(i==2)
                {
                    var vong1 = new cc.Sprite();
                    vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    vong1.setPosition(cc.p(24.71,positionY + 2));
                    cellList.addChild(vong1);
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(49.34,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(180.60,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(350.84,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(501.87,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(646.07,positionY + 3));

                cellList.addChild(lbstt);
                cellList.addChild(lbNickname);
                cellList.addChild(lbhand);
                cellList.addChild(lbthang);
                cellList.addChild(lbTime);
                cellList.addChild(lbNhanThuong);

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4); cellList.addChild(aSprite5);
                cl1.addChild(cellList);

                this.lv_sanbaidep.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },

        formatGetTimeCT : function (str){
            var time  = str.split(" ")[1];
            str = time;
            return str;
        },
    });

codeCaoThap_sanbai.BTN_CLOSE_SANBAI_CAOTHAP = 1;
codeCaoThap_sanbai.BTN_BXH_NGAY = 2;
codeCaoThap_sanbai.BTN_BXH_THANG = 6;
codeCaoThap_sanbai.BTN_THELE = 3;
codeCaoThap_sanbai.BTN_CHOSEDAYMONTH = 4;
codeCaoThap_sanbai.BTN_CLOSE_CHOSEDAYMONTH = 5;

codeCaoThap_sanbai.BTN_SELECT_MONTH = 7;
codeCaoThap_sanbai.BTN_BACK_CHOSE_MONTH = 8;codeCaoThap_sanbai.BTN_NEXT_CHOSE_MONTH = 9;



open_caothap_sanbai = function () {
    if (caothap_sanbai == null) {
        caothap_sanbai = new codeCaoThap_sanbai();
        caothap_sanbaiX = caothap_sanbai.getPosition().x;
        caothap_sanbaiY = caothap_sanbai.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(caothap_sanbai, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        caothap_sanbai.setVisible(true);
        caothap_sanbai.pn_sanbaidep.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(caothap_sanbai.pn_sanbaidep, true);
        caothap_sanbai.setTag(Minigame.INDEX_MINI_SLOT +100);
        caothap_sanbai.reOpenLayer(caothap_sanbai.pn_sanbaidep);
    }
    caothap_sanbaiAppear = true;
    caothap_sanbai.parserDataEventCaoThap(caothap_sanbai.getDayOrMonth);
    //caothap_sanbai.gotoGui(value);
};
close_caothap_sanbai = function () {
    if (caothap_sanbai == null) {
        return;
    }
    if(caothap_sanbaiAppear) {
        caothap_sanbai.closeLayer(caothap_sanbai.pn_sanbaidep);
        caothap_sanbai.setVisible(false);
        caothap_sanbai.pn_sanbaidep.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(caothap_sanbai.pn_sanbaidep, true);
        caothap_sanbaiAppear = false;
    }
};