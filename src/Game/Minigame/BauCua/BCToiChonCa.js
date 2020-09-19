/**
 * Created by PVC on 9/12/2016.
 */
var bcToiChonCa = null;
var bcToiChonCaX = 0;
var bcToiChonCaY = 0;
var bcToiChonCaAppear = false;

var BCToiChonCaLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("BCToiChonCa");
            this.initWithBinaryFile("res/BCToiChonCa.json");
            this.myMoney = 0;
            this.cacheTopUser ={};
            this.pToiChonCa = null;
            this.lv_toi_chon_ca = null;
            this.btn_close = null;
            this.btn_the_le = null;
            this.btn_bxh_ngay = null;
            this.btn_chon_ngay = null;
            this.moneyTypeTopUser = MONEY_VIN;
            this.arrTopToiChonCa = null;
            this.calendar = null;
            this.wvTheLe = null;
            this.p_thele = null;

        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
            this.pToiChonCa = this._layout.getChildByName("pToiChonCa");
            this.p_thele = this.getControl("p_thele",this.pToiChonCa);
            this.lv_toi_chon_ca = this.getControl("lv_toi_chon_ca",this.pToiChonCa);
            this.lv_toi_chon_ca.setTouchEnabled(false);
            this.lv_toi_chon_ca.setBounceEnabled(true);
            this.lv_toi_chon_ca.setClippingEnabled(true);
            this.lv_toi_chon_ca.setScrollBarEnabled(false);
            this.btn_close = this.customButton("btn_close",BCToiChonCaLayer.BTN_CLOSE,this.pToiChonCa);
            this.btn_the_le = this.customButton("btn_the_le",BCToiChonCaLayer.BTN_THE_LE,this.pToiChonCa);
            this.btn_bxh_ngay = this.customButton("btn_bxh_ngay",BCToiChonCaLayer.BTN_BXH_NGAY,this.pToiChonCa);
            this.btn_chon_ngay = this.customButton("btn_chon_ngay",BCToiChonCaLayer.BTN_CHON_NGAY,this.pToiChonCa);

            //this.btn_chon_ngay.setTitleText("Ng�y " + str + "/" + this.choseMonth + "/" + this.choseYear);


            this.arrTopToiChonCa = [];


            this.addMasterLayer(this.pToiChonCa);

            // add button day



            this.calendar = new CalendarLayer();
            this.calendar.addEventListener(this.calendar_event,this);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.calendar.setPosition(cc.p(-50,-150));
            var dates = new Date();
            this.btn_chon_ngay.setTitleText("Ngày " + dates.getDate() +"/"+(parseInt(dates.getMonth()) + 1)+"/"+dates.getFullYear());
            this.pToiChonCa.addChild(this.calendar);
            this.p_thele.setVisible(false);
           // this.wvTheLe = new ccui.WebView();
           // var winSize = cc.view.getFrameSize();
           //
           // //this.wvTheLe.setContentSize(cc.size(670,387));
           // this.wvTheLe.setContentSize(winSize);
           // this.wvTheLe.setAnchorPoint(cc.p(0,0));
           // //var pos = this.pToiChonCa.convertToWorldSpaceAR(cc.p(0,0));
           // //pos = this.pToiChonCa.convertToNodeSpace(pos);
           // this.wvTheLe.setPosition(cc.p(0,0));
           //
           //// this.setPosition(cc.p(0,0));
           // this.wvTheLe.loadURL("http://www.24h.com.vn/");
            //this.wvTheLe.setScalesPageToFit(true);

            //this.pToiChonCa.addChild(this.wvTheLe);
            //MainContent.addChild(this.wvTheLe);
        },

        onButtonRelease: function(button,id) {
            switch (id) {
                case BCToiChonCaLayer.BTN_CHON_NGAY:
                    //this.pn_chon_ngay.runAction(cc.scaleTo(0.2,1)); this.pn_chon_ngay.setVisible(true);
                    //this.openpanel_chonngay();
                    if(this.calendar.isVisible())
                    {
                        this.calendar.hide();
                    }else
                    {
                        this.calendar.show();
                    }

                    break;
                case BCToiChonCaLayer.BTN_CLOSE:
                    closeBCToiChonCa();
                    break;
                case BCToiChonCaLayer.BTN_BXH_NGAY:

                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.p_thele.setVisible(false);
                    var strDate = "";

                    if(parseInt(this.calendar.currentMonth)+1<10)
                    {
                        strDate = this.calendar.currentYear + "-0" + (parseInt(this.calendar.currentMonth)+1)
                    }else
                    {
                        strDate = this.calendar.currentYear + "-" + (parseInt(this.calendar.currentMonth)+1)
                    }

                    if(parseInt(this.calendar.currentDay)<10)
                    {
                        strDate = strDate +"-0" + this.calendar.currentDay;
                    }else
                    {
                        strDate = strDate +"-" + this.calendar.currentDay;
                    }

                    this.parserDataTopUser(strDate);
                    //}

                    break;
                case BCToiChonCaLayer.BTN_THE_LE:
                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                    this.calendar.hide();
                    this.p_thele.setVisible(true);

                   // this.parserDataTopUser();
                    // }
                    break;

            }
        },
        calendar_event: function(sender, type) {
            switch (type) {
                case CalendarLayer.SELECT_DAY: {
                    var strDate = "";

                    if(parseInt(sender.currentMonth)+1<10)
                    {
                        strDate = sender.currentYear + "-0" + (parseInt(sender.currentMonth)+1)
                    }else
                    {
                        strDate = sender.currentYear + "-" + (parseInt(sender.currentMonth)+1)
                    }

                    if(parseInt(sender.currentDay)<10)
                    {
                        strDate = strDate +"-0" + sender.currentDay;
                    }else
                    {
                        strDate = strDate +"-" + sender.currentDay;
                    }

                    this.btn_chon_ngay.setTitleText("Ngày " + sender.currentDay +"/"+(parseInt(sender.currentMonth)+1)+"/"+sender.currentYear);
                    this.parserDataTopUser(strDate);

                } break;
            }

        },

        callBackError: function(response)
        {
            bcToiChonCa.hideLoading();
        }
        ,

        parserDataTopUser: function(date)
        {
            this.showLoading();
            var url = urlBCToiChonCa(date);
            sendRequest(url,null,false,bcToiChonCa.callBackTopUser,bcToiChonCa.callBackError);
        },
        callBackTopUser:function(response)
        {

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(bcToiChonCa.arrTopToiChonCa!=null)
                    while(bcToiChonCa.arrTopToiChonCa.length > 0) {
                        bcToiChonCa.arrTopToiChonCa.pop();
                    }
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    bcToiChonCa.arrTopToiChonCa.push(counter);

                }
                bcToiChonCa.reloadTopUser();
            }
            bcToiChonCa.hideLoading();
        },
        reloadTopUser:function()
        {
            this.lv_toi_chon_ca.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            var fontSize  =14;

            for(var i = 0; i<this.arrTopToiChonCa.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_toi_chon_ca.width;
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);
                var lbHang =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(36,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbHang.setAnchorPoint(0.5,0.5);
                lbHang.setPosition(cc.p(18,positionY));
                lbHang.setString(i+1);

                var lbTaiKhoan =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(143,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(107.5,positionY));
                lbTaiKhoan.setString(bcToiChonCa.arrTopToiChonCa[i].username);

                var lbSoCa =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(49,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSoCa.setPosition(cc.p(203.5,positionY));
                lbSoCa.setString(bcToiChonCa.arrTopToiChonCa[i].soCa);

                var lbSoVan =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(56,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSoVan.setPosition(cc.p(256,positionY));
                lbSoVan.setString(bcToiChonCa.arrTopToiChonCa[i].soVan);

                var lbThang =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(91,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbThang.setPosition(cc.p(329,positionY));
                lbThang.setString(formatMoney(0,3,bcToiChonCa.arrTopToiChonCa[i].tongThang));

                var lbDat =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(83,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbDat.setPosition(cc.p(416.5,positionY));
                lbDat.setString(formatMoney(0,3,bcToiChonCa.arrTopToiChonCa[i].tongDat));

                var lbPhien =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(67,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setPosition(cc.p(491,positionY));
                lbPhien.setString(bcToiChonCa.arrTopToiChonCa[i].currentPhien);

                var lbGiaiThuong =  new cc.LabelTTF('',  RobotoRegular.fontName, fontSize, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbGiaiThuong.setPosition(cc.p(597.5,positionY));
                lbGiaiThuong.setString(bcToiChonCa.arrTopToiChonCa[i].prize);

                if(i == 0)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(18,positionY));
                    cellList.addChild(vong1);
                    lbHang.setColor(colorCell1);
                    lbHang.setString("");
                    lbTaiKhoan.setColor(colorCell1);
                    lbSoCa.setColor(colorCell1);
                    lbSoVan.setColor(colorCell1);
                    lbThang.setColor(colorCell1);
                    lbDat.setColor(colorCell1);
                    lbPhien.setColor(colorCell1);

                }else
                {
                    lbHang.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                    lbSoCa.setColor(colorCellOther);
                    lbSoVan.setColor(colorCellOther);
                    lbThang.setColor(colorCellOther);
                    lbDat.setColor(colorCellOther);
                    lbPhien.setColor(colorCellOther);
                }

                if(i == 1 || i == 2)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"

                    lbHang.setString("");
                    if(i==1)
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    }
                    else
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    }
                    vong1.setPosition(cc.p(18,positionY));
                    cellList.addChild(vong1);
                }

                lbGiaiThuong.setColor(colorMoneyVin);


                cellList.addChild(lbHang);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbSoCa);
                cellList.addChild(lbSoVan);
                cellList.addChild(lbThang);
                cellList.addChild(lbDat);
                cellList.addChild(lbPhien);
                cellList.addChild(lbGiaiThuong);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(36,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(179,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(228,positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(284,positionY));

                var spNganCot4 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(375,positionY));

                var spNganCot5 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot5.setScaleY(0.8);
                spNganCot5.setPosition(cc.p(458,positionY));

                var spNganCot6 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot6.setScaleY(0.8);
                spNganCot6.setPosition(cc.p(525,positionY));


                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);
                cellList.addChild(spNganCot5);
                cellList.addChild(spNganCot6);

                this.lv_toi_chon_ca.pushBackCustomItem(cellList);

            }
        }
    }
);

openBCToiChonCa = function ()
{
    if (bcToiChonCa === null) {
        cc.log("----> Create mini game layer first time");
        bcToiChonCa = new BCToiChonCaLayer();
        bcToiChonCaX = bcToiChonCa.getPosition().x;
        bcToiChonCaY = bcToiChonCa.getPosition().y;
        // taiXiu.onCreate();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bcToiChonCa, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
        var dates = new Date();
        var strDate="";
        if(parseInt(dates.getMonth())+1<10)
        {
            strDate = dates.getFullYear() + "-0" + (parseInt(dates.getMonth())+1)
        }else
        {
            strDate = dates.getFullYear() + "-" + (parseInt(dates.getMonth())+1)
        }

        if(parseInt(dates.getDate())<10)
        {
            strDate = strDate +"-0" + dates.getDate();
        }else
        {
            strDate = strDate +"-" + dates.getDate();
        }

        //var strDate = bcToiChonCa.calendar.currentYear + "-" + (parseInt(bcToiChonCa.calendar.currentMonth)+1) + "-" + bcToiChonCa.calendar.currentDay;
        bcToiChonCa.parserDataTopUser(strDate);
        //bcToiChonCa.parserDataTopUser();
    }else
    {
        bcToiChonCa.setVisible(true);

        bcToiChonCa.setTag(Minigame.INDEX_TAI_XIU+100);
        //var curScene = SceneMgr.getInstance().getRunningScene();
        //curScene.addGUI(bcToiChonCa, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
        var dates = new Date();
        var strDate="";
        if(parseInt(dates.getMonth())+1<10)
        {
            strDate = dates.getFullYear() + "-0" + (parseInt(dates.getMonth())+1)
        }else
        {
            strDate = dates.getFullYear() + "-" + (parseInt(dates.getMonth())+1)
        }

        if(parseInt(dates.getDate())<10)
        {
            strDate = strDate +"-0" + dates.getDate();
        }else
        {
            strDate = strDate +"-" + dates.getDate();
        }

        //var strDate = bcToiChonCa.calendar.currentYear + "-" + (parseInt(bcToiChonCa.calendar.currentMonth)+1) + "-" + bcToiChonCa.calendar.currentDay;
        bcToiChonCa.btn_chon_ngay.setTitleText(bcToiChonCa.calendar.getStrDateShow());
        bcToiChonCa.parserDataTopUser(strDate);
        bcToiChonCa.calendar.setDate(dates);
       // bcToiChonCa.parserDataTopUser();
        bcToiChonCa.reOpenLayer(bcToiChonCa.pToiChonCa);
    }

    bcToiChonCaAppear = true;
    cc.eventManager.resumeTarget(bcToiChonCa.pToiChonCa, true);
};
closeBCToiChonCa = function () {

    if (bcToiChonCa === null) {
        return;
    }
    if(bcToiChonCaAppear) {
        bcToiChonCa.closeLayer(bcToiChonCa.pToiChonCa);
        bcToiChonCa.setVisible(false);
        bcToiChonCaAppear = false;
        cc.eventManager.pauseTarget(bcToiChonCa.pToiChonCa, true);
    }
};


BCToiChonCaLayer.BTN_CLOSE = 43;
BCToiChonCaLayer.BTN_BXH_NGAY = 44;
BCToiChonCaLayer.BTN_THE_LE = 45;
BCToiChonCaLayer.BTN_CHON_NGAY = 48;