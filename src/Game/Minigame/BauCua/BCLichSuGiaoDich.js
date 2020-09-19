var bcLSGD = null;
var bcLSGDX = 0;
var bcLSGDY = 0;
var bcLSGDAppear = false;

var BCLSGDLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("bcLSGD");
            this.initWithBinaryFile("res/BCLichSuGiaoDich.json");
            this.pLichSuGiaoDich = null;
            this.btn_close_lsgd = null;
            this.btn_vin_lsgd = null;
            this.btn_xu_lsgd = null;
            this.lv_lich_su_giao_dich = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrLichSuGiaoDich = null;
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.pMaster = null;
            this.pDetail = null;
            this.lb_phien_phong = null;
            this.lb_time = null;
            this.sp_xx1 = null;
            this.sp_xx2 = null;
            this.sp_xx3 = null;
            this.lv_detail = null;
            this.btn_quay_lai = null;


        },
        customizeGUI: function () {
            this.pLichSuGiaoDich = this._layout.getChildByName("pLichSuGiaoDich");
            this.pMaster = this.getControl("pMaster",this.pLichSuGiaoDich);
            this.pDetail = this.getControl("pDetail",this.pLichSuGiaoDich);
            this.btn_close_lsgd = this.customButton("btn_close_lsgd",BCLSGDLayer.BTN_CLOSE_LSGD,this.pLichSuGiaoDich);
            this.btn_vin_lsgd = this.customButton("btn_vin_lsgd",BCLSGDLayer.BTN_VIN_LSGD,this.pMaster);
            this.btn_xu_lsgd = this.customButton("btn_xu_lsgd",BCLSGDLayer.BTN_XU_LSGD,this.pMaster);
            this.lv_lich_su_giao_dich = this.getControl("lv_lich_su_giao_dich",this.pMaster);
            this.lv_lich_su_giao_dich.setTouchEnabled(false);
            this.lv_lich_su_giao_dich.setBounceEnabled(true);
            this.lv_lich_su_giao_dich.setClippingEnabled(true);
            this.lv_lich_su_giao_dich.setScrollBarEnabled(false);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",BCLSGDLayer.BTN_BACK_ALL_LSGD,this.pMaster);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",BCLSGDLayer.BTN_BACK_LSGD,this.pMaster);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pMaster);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",BCLSGDLayer.BTN_NECK_LSGD,this.pMaster);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",BCLSGDLayer.BTN_NECKALL_LSGD,this.pMaster);

            this.lb_phien_phong = this.getControl("lb_phien_phong",this.pDetail);;
            this.lb_time = this.getControl("lb_time",this.pDetail);;
            this.sp_xx1 = this.pDetail.getChildByName("sp_xx1");
            this.sp_xx2 = this.pDetail.getChildByName("sp_xx2");
            this.sp_xx3 = this.pDetail.getChildByName("sp_xx3");
            this.lv_detail = this.getControl("lv_detail",this.pDetail);
            this.lv_detail.setTouchEnabled(false);
            this.lv_detail.setClippingEnabled(true);
            this.lv_detail.setScrollBarEnabled(false);
            this.btn_quay_lai = this.customButton("btn_quay_lai",BCLSGDLayer.BTN_QUAY_LAI,this.pDetail);
            this.arrLichSuGiaoDich = [];
            this.addMasterLayer(this.pLichSuGiaoDich);
            this.pDetail.setVisible(false);

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case BCLSGDLayer.BTN_CLOSE_LSGD:
                    closebcLSGD();

                    break;
                case BCLSGDLayer.BTN_VIN_LSGD:
                    if (this.moneyTypeLSGD == MONEY_VIN) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_VIN;
                        this.parserDataLichSuGiaoDich(this.currentPageLSGD);

                    }

                    break;
                case BCLSGDLayer.BTN_XU_LSGD:
                    if (this.moneyTypeLSGD == MONEY_XU) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_XU;
                        this.parserDataLichSuGiaoDich();

                    }
                    break;
                case BCLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLichSuGiaoDich();
                    }

                    break;
                case BCLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_QUAY_LAI:
                    this.pDetail.setVisible(false);
                    this.pMaster.setVisible(true);
                    break;
            }
        },
        parserDataLichSuGiaoDich: function()
        {
            this.showLoading();
            var url = urlBCLichSuGiaoDich(lobby.userInfo.nickname,bcLSGD.currentPageLSGD,this.moneyTypeLSGD);
            sendRequest(url,null,false,bcLSGD.callBackLSGD,bcLSGD.callBackError);
        },
        callBackLSGD: function(response)
        {
            cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            bcLSGD.totalPageLSGD = jsonData["totalPages"];
            if(success)
            {
                if(bcLSGD.arrLichSuGiaoDich!=null)
                    while(bcLSGD.arrLichSuGiaoDich.length > 0) {
                        bcLSGD.arrLichSuGiaoDich.pop();
                    }
                var transactions = jsonData["transactions"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];
                    bcLSGD.arrLichSuGiaoDich.push(counter);

                }

            }

            bcLSGD.reloadLSGD();

            bcLSGD.hideLoading();
        },
        callBackError: function(response)
        {
            bcLSGD.hideLoading();
        }
        ,
        reloadLSGD:function()
        {
            this.pMaster.setVisible(true);
            this.pDetail.setVisible(false);
            this.lv_lich_su_giao_dich.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 12;

            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_giao_dich.width;
                cellList.setBackGroundColor(colorBgCell1);
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);

///res/Font/Roboto-Medium.tff
                var lbPhien =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(40,positionY));
                lbPhien.setString(bcLSGD.arrLichSuGiaoDich[i].referenceId);
                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTime =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(157,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(160,positionY));
                if(bcLSGD.arrLichSuGiaoDich[i].timestamp != null)
                lbTime.setString(bcLSGD.arrLichSuGiaoDich[i].timestamp);
                else
                    lbTime.setString("");
                // lbTime.setTextColor(cc.color.WHITE);

                var lbRoom =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(55,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(265,positionY));
                lbRoom.setString(formatMoneyStr(bcLSGD.arrLichSuGiaoDich[i].room));
                //lbBetSide.setTextColor(cc.color.WHITE);
                var strResult = "";
                if(bcLSGD.arrLichSuGiaoDich[i].dices != null)
                {
                    var strResults = bcLSGD.arrLichSuGiaoDich[i].dices.split(",");
                    if(strResults.length>2)
                    {
                        strResult = bcLSGD.convertToStrItem(strResults[0]) + "," +bcLSGD.convertToStrItem(strResults[1]) + "," +bcLSGD.convertToStrItem(strResults[2]);
                    }

                }
                else
                {

                }

                var lbResult =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(98,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(342,positionY));
                lbResult.setString(strResult);
                //lbResult.setTextColor(cc.color.WHITE);
                var betValue = 0;
                if(bcLSGD.arrLichSuGiaoDich[i].betValues.length > 5)
                betValue =parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[0]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[1]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[2]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[3]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[4]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[5]);

                var lbBetValue =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(94,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(438,positionY));
                lbBetValue.setString(formatMoney(0,3,betValue));
                //lbBetValue.setTextColor(cc.color.WHITE);

                //var lbRefund =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(90,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                //lbRefund.setPosition(cc.p(532,positionY));
                //lbRefund.setString(formatMoney(0,3,bcLSGD.arrLichSuGiaoDich[i].totalRefund));
                //lbRefund.setTextColor(cc.color.WHITE);
                var prize = 0;
                if(bcLSGD.arrLichSuGiaoDich[i].prizes.length > 5)
                    prize =parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[0]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[1]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[2]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[3]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[4]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[5]);
                var lbTotalPrize =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(94,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTotalPrize.setPosition(cc.p(532,positionY));
                lbTotalPrize.setString(formatMoney(0,3,prize));
                // lbTotalPrize.setTextColor(cc.color.WHITE);

                var btnChiTiet = new ccui.Button();
                btnChiTiet.setContentSize(cc.size(91,30));
                btnChiTiet.setPosition(cc.p(625,positionY));
                btnChiTiet.setTitleText("Chi tiết");
                btnChiTiet.setTag(i);
                btnChiTiet.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:

                           bcLSGD.showDetailLSGD(bcLSGD.arrLichSuGiaoDich[sender.getTag()]);
                            break;
                    }

                },bcLSGD);


                this.lb_current_page_lsgd.setString(this.currentPageLSGD +"/"+this.totalPageLSGD );

                if(bcLSGD.moneyTypeLSGD == MONEY_VIN)
                {
                    //lbResult.setColor(cc.color(231,2,254));
                    lbBetValue.setColor(colorMoneyVin);
                    //lbRefund.setColor(colorMoneyVin);
                    lbTotalPrize.setColor(colorMoneyVin);
                }else
                {
                    //lbResult.setColor(cc.color(255,255,255));
                    lbBetValue.setColor(colorMoneyXu);
                    //lbRefund.setColor(colorMoneyXu);
                    lbTotalPrize.setColor(colorMoneyXu);
                }
                lbPhien.setColor(colorCellOther);
                lbTime.setColor(colorCellOther);
                lbRoom.setColor(colorCellOther);
                //lbBetSide.setColor(colorCellOther);
                lbResult.setColor(colorCellOther);
                btnChiTiet.setTitleColor(colorCellOther);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbBetValue);
               // cellList.addChild(lbRefund);
                cellList.addChild(lbTotalPrize);
                cellList.addChild(lbResult);
                cellList.addChild(btnChiTiet);


                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(81,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(238,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(293,positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(391,positionY));

                var spNganCot4 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(485,positionY));

                var spNganCot5 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot5.setScaleY(0.8);
                spNganCot5.setPosition(cc.p(579,positionY));



                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);
                cellList.addChild(spNganCot5);



                bcLSGD.lv_lich_su_giao_dich.pushBackCustomItem(cellList);

            }

        },
        showDetailLSGD: function(obj)
        {
            bcLSGD.pDetail.setVisible(true);
            bcLSGD.pMaster.setVisible(false);
            bcLSGD.lv_detail.removeAllItems();
            var phienPhong = "Phiên #"+obj.referenceId+"/"+formatMoneyStr(obj.room);
            bcLSGD.lb_phien_phong.setString(phienPhong);
            if(obj.timestamp!=null)
            bcLSGD.lb_time.setString( "Ngày: "+obj.timestamp);
            else
                bcLSGD.lb_time.setString( "Ngày: ");

            if(obj.dices != null)
            {
                var strResults = obj.dices.split(",");
                if(strResults.length>2)
                {
                    bcLSGD.sp_xx1.setSpriteFrame("res/Minigame/BauCua/"+bcLSGD.getImageToItem(strResults[0]));
                    bcLSGD.sp_xx2.setSpriteFrame("res/Minigame/BauCua/"+bcLSGD.getImageToItem(strResults[1]));
                    bcLSGD.sp_xx3.setSpriteFrame("res/Minigame/BauCua/"+bcLSGD.getImageToItem(strResults[2]));
                }

            }
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 12;


            for(var i = 0; i<6; i++)
            {

                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                if(i % 2 == 0)
                {
                    cellList.setBackGroundColor(colorBgCell1);
                }else
                {
                    cellList.setBackGroundColor(colorBgCell2);
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_giao_dich.width;

                var lbCua =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(223,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbCua.setPosition(cc.p(112,positionY));
                lbCua.setString(bcLSGD.convertToStrItem(i));

                var lbBetValue =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(223,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(335,positionY));
                lbBetValue.setString(formatMoney(0,3,obj.betValues[i]));

                var lbPrize =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(223,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPrize.setPosition(cc.p(558,positionY));
                lbPrize.setString(formatMoney(0,3,obj.prizes[i]));

                lbCua.setColor(colorCellOther);
                lbBetValue.setColor(colorCellOther);
                lbPrize.setColor(colorCellOther);

                cellList.addChild(lbCua);
                cellList.addChild(lbBetValue);
                cellList.addChild(lbPrize);

                bcLSGD.lv_detail.pushBackCustomItem(cellList);
            }


        },
        convertToStrItem: function(num)
        {
            var strItem = "";
            switch (parseFloat(num))
            {
                case 0:
                    strItem = "Bầu";
                    break;
                case 1:
                    strItem = "Cua";
                    break;
                case 2:
                    strItem = "Tôm";
                    break;
                case 3:
                    strItem = "Cá";
                    break;
                case 4:
                    strItem = "Gà";
                    break;
                case 5:
                    strItem = "Hươu";
                    break;
            }
            return strItem;
        },
        getImageToItem: function(num)
        {
            var strItem = "";
            switch (parseFloat(num))
            {
                case 0:
                    strItem = "bau.png";
                    break;
                case 1:
                    strItem = "cua.png";
                    break;
                case 2:
                    strItem = "tom.png";
                    break;
                case 3:
                    strItem = "ca.png";
                    break;
                case 4:
                    strItem = "ga.png";
                    break;
                case 5:
                    strItem = "huou.png";
                    break;
            }
            return strItem;
        }
    }
);

openbcLSGD = function () {
    if (bcLSGD === null) {
        cc.log("----> openbcLSGD");
        bcLSGD = new BCLSGDLayer();
        bcLSGDX = bcLSGD.getPosition().x;
        bcLSGDY = bcLSGD.getPosition().y;
        // taiXiu.onCreate();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bcLSGD, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
    }else
    {
        bcLSGD.setVisible(true);
        cc.eventManager.resumeTarget(bcLSGD.pLichSuGiaoDich, true);
        bcLSGD.setTag(Minigame.INDEX_TAI_XIU+100);
        bcLSGD.reOpenLayer(bcLSGD.pLichSuGiaoDich);
    }
    bcLSGD.parserDataLichSuGiaoDich();
    bcLSGDAppear = true;
};
closebcLSGD = function () {
    if (bcLSGD === null) {
        return;
    }
    if(bcLSGDAppear) {
        bcLSGD.closeLayer(bcLSGD.pLichSuGiaoDich);
        bcLSGD.setVisible(false);
        bcLSGDAppear = false;
        cc.eventManager.pauseTarget(bcLSGD.pLichSuGiaoDich, true);
    }
};


BCLSGDLayer.BTN_CLOSE_LSGD = 36;
BCLSGDLayer.BTN_VIN_LSGD = 37;
BCLSGDLayer.BTN_XU_LSGD = 38;
BCLSGDLayer.BTN_BACK_ALL_LSGD = 39;
BCLSGDLayer.BTN_BACK_LSGD = 40;
BCLSGDLayer.BTN_NECK_LSGD = 41;
BCLSGDLayer.BTN_NECKALL_LSGD = 42;
BCLSGDLayer.BTN_QUAY_LAI = 43;