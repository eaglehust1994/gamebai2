/**
 * Created by Admin on 9/14/2016.
 */

var miniGameMoving = null;
var CalendarLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super("Calendar");
            this.initWithBinaryFile("res/UiCalendar.json");
            this.calendarEventSelector= null;
            this.calendarEventListener= null;
            this.typeShow = CalendarLayer.TYPE_DAY;
            this.pChonNgay = null;
            this.pChonThang = null;
            this.lb_thang1 = null;
            this.lb_thang2 = null;
            this.btn_back_month = null;
            this.btn_next_month = null;
            this.btn_back_day = null;
            this.btn_next_day = null;
            this.btn_xem = null;

            this.currentDay = 0;
            this.currentMonth = 0;
            this.currentYear = 0;
            this.isShow = false;

        },
        customizeGUI: function () {

            //cc.spriteFrameCache.addSpriteFrames("res/Minigame/TaiXiu/images/animationTX.plist");
            this.pChonNgay = this._layout.getChildByName("pChonNgay");
            this.pChonThang = this._layout.getChildByName("pChonThang");

            this.lb_thang1 = this.getControl("lb_thang1",this.pChonNgay);
            this.lb_thang2 = this.getControl("lb_thang2",this.pChonThang);
            this.btn_back_month = this.customButton("btn_back_month",CalendarLayer.BTN_BACK_MONTH, this.pChonThang);
            this.btn_next_month = this.customButton("btn_next_month",CalendarLayer.BTN_NEXT_MONTH, this.pChonThang);
            this.btn_back_day = this.customButton("btn_back_day",CalendarLayer.BTN_BACK_DAY, this.pChonNgay);
            this.btn_next_day = this.customButton("btn_next_day",CalendarLayer.BTN_NEXT_DAY, this.pChonNgay);
            this.btn_xem = this.customButton("btn_xem",CalendarLayer.BTN_XEM, this.pChonThang);

            this.dateC = new Date();
            this.currentDay = this.dateC.getDate();
            this.currentMonth = this.dateC.getMonth();
            this.currentYear = this.dateC.getFullYear();

            this.lb_thang1.setString(this.genStrThang());
            this.lb_thang2.setString(this.genStrThang());
            this.pChonThang.setVisible(false);
            this.setVisible(false);

            this.initDay();


        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case CalendarLayer.BTN_NEXT_DAY:
                    if(this.currentMonth < 11){
                        this.currentMonth = this.currentMonth + 1;
                    }else
                    {
                        this.currentMonth = 0;
                        this.currentYear = this.currentYear+1;
                    }
                    this.lb_thang1.setString(this.genStrThang());
                    this.findCurrentDay(this.currentMonth);
                    break;
                case CalendarLayer.BTN_BACK_DAY:
                    if(this.currentMonth > 0 ){
                        this.currentMonth = this.currentMonth - 1;

                    }else
                    {
                        this.currentMonth = 11;
                        this.currentYear = this.currentYear-1;
                    }
                    this.lb_thang1.setString(this.genStrThang());
                    this.findCurrentDay(this.currentMonth);
                    break;
                case CalendarLayer.BTN_NEXT_MONTH:
                    if(this.currentMonth < 11){
                        this.currentMonth = this.currentMonth + 1;

                    }else
                    {
                        this.currentMonth = 0;
                        this.currentYear = this.currentYear+1;
                    }
                    this.lb_thang2.setString(this.genStrThang());
                    break;
                case CalendarLayer.BTN_BACK_MONTH:
                    if(this.currentMonth >0){
                        this.currentMonth = this.currentMonth - 1;

                    }else
                    {
                        this.currentMonth = 11;
                        this.currentYear = this.currentYear-1;
                    }
                    this.lb_thang2.setString(this.genStrThang());
                    break;
                case CalendarLayer.BTN_XEM:

                    if (this.calendarEventListener)
                        this.calendarEventSelector.call(this.calendarEventListener, this, CalendarLayer.SELECT_MONTH);
                    else
                        this.calendarEventSelector(this, CalendarLayer.SELECT_MONTH);

                    this.setVisible(false);
                    break;


            }
        }
        ,
        initDay:function()
        {
            var posx = 24.93;
            var posy = 230.58;
            for(var i = 1; i < 32 ; i ++){
                var button = new ccui.Button();
                //cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                button.loadTextures("Minigame/ImageChung/btn_value.png", "Minigame/ImageChung/btn_value_s.png", "Minigame/ImageChung/btn_value_s.png",ccui.Widget.PLIST_TEXTURE);
                button.setPosition(cc.p(posx,posy));
                button.setPosition(cc.p(posx,posy));
                button.setName("btn_ngay" + i);
                button.setTag(i);
                button.setTitleFontSize(22);
                button.setTitleText(i);
                this.pChonNgay.addChild(button);
                button.setTitleFontName("res/Font/Roboto-Bold.ttf");
                button.setTitleColor(cc.color("#5B5959"));

                button.addTouchEventListener(this.onTouchEventDay,this);

                posx = posx + 43;
                if(posx > 239.93){
                    posx = 24.93; posy = posy - 41.78;
                }
            }
        },
        onTouchEventDay: function(sender,type){
            switch (type){
                case ccui.Widget.TOUCH_ENDED:
                    this.selectDay(sender.getTag());
                    break;
            }
        },
        selectDay:function(day)
        {
            this.currentDay = day;
            this.hide();
            if(this.calendarEventSelector){
                if (this.calendarEventListener)
                    this.calendarEventSelector.call(this.calendarEventListener, this, CalendarLayer.SELECT_DAY);
                else
                    this.calendarEventSelector(this, CalendarLayer.SELECT_DAY);          //eventCallback
            }
        },

        findCurrentDay : function(month){
            this.checkdayinmonth(month,this.currentYear);
           // var dateTemp = new Date();
            if(month == parseInt(this.dateC.getMonth())) {
                var btn = this.pChonNgay.getChildByTag(this.dateC.getDate());
                cc.log("current day = "+this.dateC.getDate());
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                btn.loadTextureNormal("Minigame/ImageChung/btn_value_current.png",ccui.Widget.PLIST_TEXTURE);
            }else{
                this.resetButtonDay();
            }
        },

        checkdayinmonth : function (month,year){
            var numberDay = this.daysInMonth(month,year);
            for(var i = 29; i < 32; i++){
                var btn = this.pChonNgay.getChildByTag( + i);
                btn.setVisible(true);
            }
            if(numberDay == 30){
                var btn = this.pChonNgay.getChildByTag(31);
                btn.setVisible(false);
            }else if(numberDay == 29){
                for(var i = 30; i < 32; i++){
                    var btn = this.pChonNgay.getChildByTag(i);
                    btn.setVisible(false);
                }
            }else if(numberDay == 28){
                for(var i = 29; i < 32; i++){
                    var btn = this.pChonNgay.getChildByTag(i);
                    btn.setVisible(false);
                }
            }
        },
        resetButtonDay : function (){
            for(var i = 1; i <32; i++){
                var btn = this.pChonNgay.getChildByTag(i);
                cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
                btn.loadTextureNormal("Minigame/ImageChung/btn_value.png",ccui.Widget.PLIST_TEXTURE);
            }
        },
        daysInMonth : function (month,year) {
            return new Date(year, month + 1, 0).getDate();
        },
        addEventListener: function(selector, target){
            this.calendarEventSelector = selector;
            this.calendarEventListener = target;
        }
        ,
        show :function () {
            this.isShow = true;
            this.setVisible(true);
            this.findCurrentDay(this.currentMonth);
            if(this.typeShow == CalendarLayer.TYPE_DAY)
            {
                this.pChonThang.setVisible(false);
                this.pChonNgay.setVisible(true);
            }
            else
            {
                this.pChonThang.setVisible(true);
                this.pChonNgay.setVisible(false);
            }
        }
        ,
        hide :function () {
            this.isShow = false;
            this.setVisible(false);
        }
        ,
        genStrThang:function()
        {
            var str ="";
            if (parseInt(this.currentMonth) + 1 > 9)
                str = "Tháng " + (parseInt(this.currentMonth) + 1) + " Năm " + this.currentYear;

            else
                str = "Tháng 0" + (parseInt(this.currentMonth) + 1) + " Năm " + this.currentYear;
            //str = "Tháng " + this.currentMonth + " Năm " + this.currentYear;
            return str;
        },
        getStrDateShow:function()
        {
            if(this.typeShow == CalendarLayer.TYPE_DAY)
                return "Ngày " + this.currentDay +"/"+(parseInt(this.currentMonth) + 1)+"/"+this.currentYear;
            else
                return "Tháng " +(parseInt(this.currentMonth) + 1)+"/"+this.currentYear;
        },
        getStrDateSend:function()
        {
            var strDate = "";

            if(parseInt(this.currentMonth)+1<10)
            {
                strDate = this.currentYear + "-0" + (parseInt(this.currentMonth)+1)
            }else
            {
                strDate = this.currentYear + "-" + (parseInt(this.currentMonth)+1)
            }



            if(this.typeShow == CalendarLayer.TYPE_DAY)
            {
                if(parseInt(this.currentDay)<10)
                {
                    strDate = strDate +"-0" + this.currentDay;
                }else
                {
                    strDate = strDate +"-" + this.currentDay;
                }
            }

            return strDate;
        },
        setDate:function(date)
        {
            this.currentDay = date.getDate();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            this.findCurrentDay(this.currentMonth);
            this.lb_thang2.setString(this.genStrThang());
            this.lb_thang1.setString(this.genStrThang());
        }
    }
);

CalendarLayer.TYPE_DAY = 0;
CalendarLayer.TYPE_MONTH = 1;
CalendarLayer.SELECT_DAY = 0;
CalendarLayer.SELECT_MONTH = 1;
CalendarLayer.BTN_BACK_MONTH = 42;
CalendarLayer.BTN_NEXT_MONTH = 43;
CalendarLayer.BTN_BACK_DAY = 40;
CalendarLayer.BTN_NEXT_DAY = 41;
CalendarLayer.BTN_XEM = 14;


