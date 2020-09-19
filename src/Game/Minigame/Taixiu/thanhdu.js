var txThanhDu = null;
var txThanhDuX = 0;
var txThanhDuY = 0;
var txThanhDuAppear = false;

var TXThanhDuLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {

            //this.cacheThanhDu ={};
            this._super("txThanhDu");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/TXThanhDu.json");
            this.pTabOption = null;
            this.pThanhDu = null;
            this.btn_bxh_ngay = null;
            this.btn_bxh_chung_cuoc = null;
            this.btn_the_le = null;
            this.btn_close_thanh_du = null;
            this.btn_top_thang = null;
            this.btn_top_thua = null;
            //this.btn_xem = null;
            //this.tf_ngay = null;
            //this.tf_thang = null;
            //this.lb_chon_ngay = null;
            this.lv_thanh_du = null;
            this.isBXHNgay = true;
            this.typeTop = 1;
            this.dateThanhDu = null;
            this.sp_bg_date = null;
            this.btn_date = null;
            this.calendar = null;
            this.p_thele = null;


        },


        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
            this.pThanhDu = this._layout.getChildByName("pThanhDu");
            this.pTabOption = this.getControl("pTabOption",this.pThanhDu);
            this.arrThanhDu = [{
                "username":"phamcanh",
                "number":4,
                "totalMoney":500000,
                "referenceId":1001,
                "prize":"2.000.000"
            }];
            this.dateThanhDu = new Date();
            this.btn_bxh_ngay = this.customButton("btn_bxh_ngay",TXThanhDuLayer.BTN_BXH_NGAY,this.pThanhDu);

            this.btn_bxh_chung_cuoc = this.customButton("btn_bxh_chung_cuoc",TXThanhDuLayer.BTN_BXH_CHUNG_CUOC,this.pThanhDu);
            this.btn_the_le = this.customButton("btn_the_le",TXThanhDuLayer.BTN_THE_LE,this.pThanhDu);
            this.btn_close_thanh_du = this.customButton("btn_close_thanh_du",TXThanhDuLayer.BTN_CLOSE_THANH_DU,this.pThanhDu);
            this.btn_top_thang = this.customButton("btn_top_thang",TXThanhDuLayer.BTN_TOP_THANG,this.pTabOption);
            this.btn_top_thua = this.customButton("btn_top_thua",TXThanhDuLayer.BTN_TOP_THUA,this.pTabOption);
            //this.btn_xem = this.customButton("btn_xem",TXThanhDuLayer.BTN_XEM,this.pTabOption);

            //this.tf_ngay = this.getControl("tf_ngay",this.pTabOption);
            //this.tf_ngay.addEventListener(this.text_field_event,this);
            //this.tf_ngay.setVisible(true);
            //this.tf_thang = this.getControl("tf_thang",this.pTabOption);
            //this.tf_thang.addEventListener(this.text_field_event,this);
            //this.tf_thang.setVisible(false);
            //this.lb_chon_ngay = this.getControl("lb_chon_ngay",this.pTabOption);
            this.btn_date = this.customButton("btn_date",TXThanhDuLayer.BTN_DATE,this.pTabOption);

            this.lv_thanh_du = this.getControl("lv_thanh_du",this.pThanhDu);
            this.lv_thanh_du.setTouchEnabled(false);
            this.lv_thanh_du.setBounceEnabled(true);
            this.lv_thanh_du.setClippingEnabled(true);
            this.lv_thanh_du.setScrollBarEnabled(false);
            this.p_thele = this.getControl("p_thele",this.pThanhDu);
            this.addMasterLayer(this.pThanhDu);
            //this.calendar = null;
            this.calendar = new CalendarLayer();
            this.calendar.addEventListener(this.calendar_event,this);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.calendar.setPosition(cc.p(-50,-150));
            var dates = new Date();
            this.btn_date.setTitleText("Ngày " + dates.getDate() +"/"+(parseInt(dates.getMonth()) + 1)+"/"+dates.getFullYear());
            this.pThanhDu.addChild(this.calendar);
            this.p_thele.setVisible(false);

        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case TXThanhDuLayer.BTN_CLOSE_THANH_DU:
                    closeTXThanhDu();
                    break;
                case TXThanhDuLayer.BTN_DATE:
                    if(this.calendar.isVisible())
                    {
                        this.calendar.hide();
                    }else
                    {
                        this.calendar.show();
                    }
                    break;
                case TXThanhDuLayer.BTN_BXH_NGAY:
                    this.dateThanhDu = new Date();
                    this.calendar.setDate(this.dateThanhDu)
                    this.calendar.typeShow = CalendarLayer.TYPE_DAY;
                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    this.isBXHNgay = true;
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                    this.btn_bxh_chung_cuoc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                    this.p_thele.setVisible(false);
                    break;

                case TXThanhDuLayer.BTN_BXH_CHUNG_CUOC:
                    this.calendar.typeShow = CalendarLayer.TYPE_MONTH;
                    this.calendar.setDate(this.dateThanhDu)
                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    //this.lb_chon_ngay.setString("Chọn tháng:");
                    this.dateThanhDu = new Date();
                    //this.tf_ngay.setVisible(false);
                    //this.tf_thang.setVisible(true);
                    this.isBXHNgay = false;
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                    this.btn_bxh_chung_cuoc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid.png");
                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                    this.p_thele.setVisible(false);

                    break;
                case TXThanhDuLayer.BTN_THE_LE:
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
                    this.btn_bxh_chung_cuoc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                    this.calendar.hide();
                    this.p_thele.setVisible(true);
                    break;
                case TXThanhDuLayer.BTN_TOP_THANG:
                    //this.dateThanhDu = new Date();

                    this.btn_top_thang.loadTextureNormal("res/Minigame/ImageChung/tanloc_button.png");
                    this.btn_top_thua.loadTextureNormal("res/Minigame/ImageChung/tanloc_button_s.png");
                    this.p_thele.setVisible(false);
                    this.typeTop = TXThanhDuLayer.TOP_THANG;
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                    break;
                case TXThanhDuLayer.BTN_TOP_THUA:
                    //this.dateThanhDu = new Date();
                    this.btn_top_thang.loadTextureNormal("res/Minigame/ImageChung/tanloc_button_s.png");
                    this.btn_top_thua.loadTextureNormal("res/Minigame/ImageChung/tanloc_button.png");
                    this.p_thele.setVisible(false);
                    this.typeTop = TXThanhDuLayer.TOP_THUA;
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                    break;


            }
        },
        text_field_event: function(sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {

                    //sender.runAction(cc.scaleTo(0.225, 1.2));
                    txThanhDu.sp_bg_date.setTexture("res/Minigame/ImageChung/bg_date_s.png");
                    sender.setPlaceHolder("");
                    //sender.setString("");


                } break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    //cc.log("Deactivate");
                    //sender.runAction(cc.scaleTo(0.225, 1));
                    txThanhDu.sp_bg_date.setTexture("res/Minigame/ImageChung/bg_date.png");
                    sender.setPlaceHolder("0");
                    if(sender.getString() == 0)
                    {
                        sender.setString("");
                    }
                    if(txThanhDu.isBXHNgay)
                    {
                        txThanhDu.tf_ngay.setPlaceHolder(txThanhDu.dateThanhDu.getDate()+"/"+(txThanhDu.dateThanhDu.getMonth()+1) + "/"+txThanhDu.dateThanhDu.getFullYear());
                        //txThanhDu.tf_ngay.setString("");
                    }else
                    {
                        txThanhDu.tf_thang.setPlaceHolder((txThanhDu.dateThanhDu.getMonth()+1) + "/"+txThanhDu.dateThanhDu.getFullYear());
                        //txThanhDu.tf_thang.setString("");
                    }
                    //this.text_field.placeHolder = this.placeholder;
                } break;

                case ccui.TextField.EVENT_INSERT_TEXT:
                    //cc.log("Insert character");

                        var str = sender.getString();
                        str = replaceAll("/","",str);

                        if(!isNumeric(str))
                        {
                            str = str.substr(0, str.length - 1);
                        }
                        if(!isNumeric(str))
                        {
                            str = "0";
                        }
                    if(txThanhDu.isBXHNgay)
                    {
                        sender.string = this.formatDate(str);
                    }else
                    {
                        sender.string = this.formatDate2(str);
                    }



                    break;

                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    //cc.log("Delect character");
                    var str = sender.getString();
                    if(str.substr(str.length-1,1) == "/")
                    {
                        str = str.substr(0,str.length-1);
                    }
                    sender.setString(str);
                    sender.attachWithIME();

                } break;
            }

        },
        calendar_event: function(sender, type) {
            switch (type) {
                case CalendarLayer.SELECT_DAY: {

                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                } break;
                case CalendarLayer.SELECT_MONTH:
                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    this.parserDataThanhDu(this.calendar.getStrDateSend());
                    break;
            }

        },
        formatDate: function(strNum)
        {
            var strFormatDate = "";
            var currentYear = "2016"
            switch (strNum.length)
            {
                case 0:
                    break;
                case 1:
                    if(Number(strNum) > 3)
                    {
                        strFormatDate = "0"+strNum+"/";
                    }else
                    {
                        strFormatDate = strNum;
                    }
                    break;
                case 2:
                    if(Number(strNum) > 31)
                    {
                        if(Number(strNum.substr(1,1))>1)
                        {
                            strFormatDate = "0"+strNum.substr(0,1)+"/"+"0"+strNum.substr(1,1)+"/"+currentYear;
                        }else
                        {
                            strFormatDate = "0"+strNum.substr(0,1)+"/"+strNum.substr(1,1);
                        }

                    }else
                    {
                        strFormatDate = strNum + "/";
                    }
                    break;
                case 3:
                    strFormatDate = this.formatDate(strNum.substr(0,2));
                    if(strFormatDate.length == 3)
                    {
                        if(Number(strNum.substr(2,1))>1)
                        {
                            strFormatDate = strFormatDate +"0"+strNum.substr(2,1)+"/"+currentYear;
                        }else
                        {
                            strFormatDate = strFormatDate+strNum.substr(2,1);
                        }
                    }
                    else
                    if(strFormatDate.length == 4)
                    {
                        if(Number(strNum.substr(2,1))>2)
                        {
                            strFormatDate = strFormatDate.substr(0,3) + "0" +  strFormatDate.substr(3,1)+"/"+currentYear;
                        }else
                        {
                            strFormatDate = strFormatDate + strFormatDate.substr(2,1)+"/"+currentYear;
                        }

                    }
                    else
                    {
                        strFormatDate = strFormatDate;
                    }
                    break;
                case 4:
                    strFormatDate = this.formatDate(strNum.substr(0,3));
                    if(strFormatDate.length == 4)
                    {
                        if(Number(strNum.substr(3,1)) == 1)
                        {
                            if(Number(strNum.substr(3,1))>2)
                            {
                                strFormatDate = strFormatDate.substr(0,3) + "0" +  strNum.substr(3,1)+"/"+currentYear;
                            }else
                            {
                                strFormatDate = strFormatDate + strNum.substr(3,1)+"/"+currentYear;
                            }
                        }else
                        {
                            strFormatDate = strFormatDate + strNum.substr(3,1)+"/"+currentYear;
                        }

                    }
                    break;
                default :

                    strFormatDate = this.formatDate(strNum.substr(0,4)) + strNum.substr(4,strNum.length);
            }
            return strFormatDate;
        },


        formatDate2: function(strNum)
        {
            var currentYear = "2016"
            var strFormatDate = "";
            switch (strNum.length)
            {
                case 0:
                    break;
                case 1:
                    if(Number(strNum) > 1)
                    {
                        strFormatDate = "0"+strNum+"/"+currentYear;
                    }else
                    {
                        strFormatDate = strNum;
                    }
                    break;
                case 2:
                    if(Number(strNum) > 12)
                    {
                        if(Number(strNum.substr(1,1))>1)
                        {
                            strFormatDate = "0"+strNum.substr(0,1)+"/"+ currentYear;
                        }else
                        {
                            strFormatDate = "0"+strNum.substr(0,1)+"/"+currentYear;
                        }

                    }else
                    {
                        strFormatDate = strNum + "/"+currentYear;
                    }
                    break;

                default :

                    strFormatDate = this.formatDate2(strNum.substr(0,2)) + strNum.substr(2,strNum.length);
            }
            return strFormatDate;
        },


        callBackError: function(response)
        {
            txThanhDu.hideLoading();
        }
        ,

        parserDataThanhDu: function(strDate)
        {
            this.showLoading();
            var url = "";
            if(txThanhDu.isBXHNgay)
            {
                //var strDate = txThanhDu.dateThanhDu.getFullYear() + "-"+(txThanhDu.dateThanhDu.getMonth()+1) + "-" + txThanhDu.dateThanhDu.getDate();
                //txThanhDu.tf_ngay.setPlaceHolder(txThanhDu.dateThanhDu.getDate()+"/"+(txThanhDu.dateThanhDu.getMonth()+1) + "/"+txThanhDu.dateThanhDu.getFullYear());
                //txThanhDu.tf_ngay.setString("");
                url = urlThanhDuDay(strDate,txThanhDu.typeTop);
            }else
            {
                //var strDate =   txThanhDu.dateThanhDu.getFullYear()+ "-" +(txThanhDu.dateThanhDu.getMonth()+1);
                //txThanhDu.tf_thang.setPlaceHolder((txThanhDu.dateThanhDu.getMonth()+1) + "/"+txThanhDu.dateThanhDu.getFullYear());
                //txThanhDu.tf_thang.setString("");
                url = urlThanhDuMonth(strDate,txThanhDu.typeTop);
            }
            //if(txThanhDu.cacheThanhDu[strDate] != null)
            //{
            //    txThanhDu.callBackThanhDu(txThanhDu.cacheThanhDu[strDate]);
            //    cc.log(txThanhDu.cacheThanhDu[strDate]);
            //}
            //url = urlThanhDuDay(strDate,txThanhDu.typeTop);
            sendRequest(url,null,false,txThanhDu.callBackThanhDu,txThanhDu.callBackError);
        },
        callBackThanhDu:function(response)
        {
            if(txThanhDu.isBXHNgay)
            {
                var strDate = txThanhDu.dateThanhDu.getFullYear() + "-"+(txThanhDu.dateThanhDu.getMonth()+1) + "-" + txThanhDu.dateThanhDu.getDate();

            }else
            {
                var strDate =   txThanhDu.dateThanhDu.getFullYear()+ "-" +(txThanhDu.dateThanhDu.getMonth()+1);

            }
            //txThanhDu.cacheThanhDu[strDate] = response;
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(txThanhDu.arrThanhDu!=null)
                    while(txThanhDu.arrThanhDu.length > 0) {
                        txThanhDu.arrThanhDu.pop();
                    }
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    txThanhDu.arrThanhDu.push(counter);

                }
                txThanhDu.reloadThanhDu();
            }
            txThanhDu.hideLoading();
        },
        reloadThanhDu:function()
        {


            this.lv_thanh_du.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var  fonts = RobotoRegular;
            for(var i = 0; i<this.arrThanhDu.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_thanh_du.width;
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);

                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);



                var lbSTT =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(40,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSTT.setAnchorPoint(0.5,0.5);
                lbSTT.setPosition(cc.p(21,positionY));
                lbSTT.setString(i+1);



                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(170,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setAnchorPoint(0.5,0.5);
                lbTaiKhoan.setPosition(cc.p(129,positionY));
                lbTaiKhoan.setString(txThanhDu.arrThanhDu[i].username);

                var lbSoVan =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(52,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSoVan.setAnchorPoint(0.5,0.5);
                lbSoVan.setPosition(cc.p(245,positionY));
                lbSoVan.setString(txThanhDu.arrThanhDu[i].number);

                var lbTongThang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(100,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTongThang.setAnchorPoint(0.5,0.5);
                lbTongThang.setPosition(cc.p(328,positionY));
                lbTongThang.setString(formatMoney(0,3,txThanhDu.arrThanhDu[i].totalMoney));
                lbTongThang.setColor(cc.color(colorMoneyVin));

                var lbPhien = new cc.LabelTTF('',  fonts.fontName, 14, cc.size(70,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(419,positionY));
                lbPhien.setString(txThanhDu.arrThanhDu[i].referenceId);

                var lbGiaiThuong = new cc.LabelTTF('',  fonts.fontName, 14, cc.size(190,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbGiaiThuong.setAnchorPoint(0.5,0.5);
                lbGiaiThuong.setPosition(cc.p(554,positionY));

                lbGiaiThuong.setString(txThanhDu.arrThanhDu[i].prize);
                var strGiaiThuong = replaceAll(".","",txThanhDu.arrThanhDu[i].prize);
                if(isNumeric(strGiaiThuong))
                {
                    lbGiaiThuong.setColor(colorMoneyVin);
                }else
                {
                    lbGiaiThuong.setColor(colorCell1);
                }

                if(i == 0)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(21,positionY));
                    cellList.addChild(vong1);
                    lbSTT.setColor(colorCell1);
                    lbTaiKhoan.setColor(colorCell1);
                    lbSoVan.setColor(colorCell1);
                    lbPhien.setColor(colorCell1);
                    lbSTT.setString("");
                }else
                {
                    lbSTT.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                    lbSoVan.setColor(colorCellOther);
                    lbPhien.setColor(colorCellOther);
                }

                if(i == 1 || i==2)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"

                    if(i==2)
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    }else
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    }
                    vong1.setPosition(cc.p(21,positionY));
                    cellList.addChild(vong1);
                    lbSTT.setString("");
                }

                cellList.addChild(lbSTT);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbSoVan);
                cellList.addChild(lbTongThang);
                cellList.addChild(lbPhien);
                cellList.addChild(lbGiaiThuong);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(42,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(216,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(274,positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(382,positionY));

                var spNganCot4 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(456,positionY));

                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);


                this.lv_thanh_du.pushBackCustomItem(cellList);

            }
        }
    }
);

openTXThanhDu = function () {
    if (txThanhDu === null) {

                //cc.log("----> Create mini game layer first time");
                txThanhDu = new TXThanhDuLayer();
                txThanhDuX = txThanhDu.getPosition().x;
                txThanhDuY = txThanhDu.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txThanhDu, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
                txThanhDuAppear = true;
                txThanhDu.dateThanhDu = new Date();
                txThanhDu.calendar.setDate(txThanhDu.dateThanhDu)
                txThanhDu.calendar.typeShow = CalendarLayer.TYPE_DAY;
                txThanhDu.btn_date.setTitleText(txThanhDu.calendar.getStrDateShow());
                txThanhDu.isBXHNgay = true;
                txThanhDu.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                txThanhDu.btn_bxh_chung_cuoc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                txThanhDu.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
                txThanhDu.parserDataThanhDu(txThanhDu.calendar.getStrDateSend());



    }else
    {
        txThanhDu.setVisible(true);
        cc.eventManager.resumeTarget(txThanhDu.pThanhDu, true);
        txThanhDuAppear = true;
        txThanhDu.dateThanhDu = new Date();
        txThanhDu.calendar.setDate(txThanhDu.dateThanhDu)
        txThanhDu.calendar.typeShow = CalendarLayer.TYPE_DAY;
        txThanhDu.btn_date.setTitleText(txThanhDu.calendar.getStrDateShow());
        txThanhDu.isBXHNgay = true;
        txThanhDu.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
        txThanhDu.btn_bxh_chung_cuoc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
        txThanhDu.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
        txThanhDu.parserDataThanhDu(txThanhDu.calendar.getStrDateSend());

        txThanhDu.reOpenLayer(txThanhDu.pThanhDu);

    }
    //txThanhDu.parserDataThanhDu();

};
closeTXThanhDu = function () {
    if (txThanhDu === null) {
        return;
    }
    if(txThanhDuAppear) {
        txThanhDu.closeLayer(txThanhDu.pThanhDu);
        txThanhDu.setVisible(false);
        txThanhDuAppear = false;
        cc.eventManager.pauseTarget(txThanhDu.pThanhDu, true);
    }
};



TXThanhDuLayer.BTN_BXH_NGAY = 1;
TXThanhDuLayer.BTN_BXH_CHUNG_CUOC = 2;
TXThanhDuLayer.BTN_THE_LE= 3;
TXThanhDuLayer.BTN_CLOSE_THANH_DU= 4;
TXThanhDuLayer.BTN_TOP_THANG= 5;
TXThanhDuLayer.BTN_TOP_THUA= 6;
//TXThanhDuLayer.BTN_XEM = 7;
TXThanhDuLayer.TOP_THANG = 1;
TXThanhDuLayer.TOP_THUA = 0;
TXThanhDuLayer.BTN_DATE = 8;
