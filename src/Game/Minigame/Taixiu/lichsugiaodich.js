var txLSGD = null;
var txLSGDX = 0;
var txLSGDY = 0;
var txLSGDAppear = false;

var TXLSGDLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXLSGD");
            this.initWithBinaryFile("res/TXLichSuGiaoDich.json");
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
        },
        customizeGUI: function () {
            this.pLichSuGiaoDich = this._layout.getChildByName("pLichSuGiaoDich");
            this.btn_close_lsgd = this.customButton("btn_close_lsgd",TXLSGDLayer.BTN_CLOSE_LSGD,this.pLichSuGiaoDich);
            this.btn_vin_lsgd = this.customButton("btn_vin_lsgd",TXLSGDLayer.BTN_VIN_LSGD,this.pLichSuGiaoDich);
            this.btn_xu_lsgd = this.customButton("btn_xu_lsgd",TXLSGDLayer.BTN_XU_LSGD,this.pLichSuGiaoDich);
            this.lv_lich_su_giao_dich = this.getControl("lv_lich_su_giao_dich",this.pLichSuGiaoDich);
            this.lv_lich_su_giao_dich.setTouchEnabled(false);
            this.lv_lich_su_giao_dich.setBounceEnabled(true);
            this.lv_lich_su_giao_dich.setClippingEnabled(true);
            this.lv_lich_su_giao_dich.setScrollBarEnabled(false);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",TXLSGDLayer.BTN_BACK_ALL_LSGD,this.pLichSuGiaoDich);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",TXLSGDLayer.BTN_BACK_LSGD,this.pLichSuGiaoDich);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pLichSuGiaoDich);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",TXLSGDLayer.BTN_NECK_LSGD,this.pLichSuGiaoDich);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",TXLSGDLayer.BTN_NECKALL_LSGD,this.pLichSuGiaoDich);
           // this.pLichSuGiaoDich.setVisible(false);
            this.arrLichSuGiaoDich = [{
                referenceId:168,
                userId:1,
                username:"banhcuon",
                betValue:0,
                betSide:0,
                totalPrize:0,
                totalRefund:20020000,
                moneyType:0,
                timestamp:"2016-08-04",
                resultPhien:1
            }];

            //var listener1 = cc.EventListener.create({
            //    event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //    swallowTouches: true,
            //    onTouchBegan: function (touch, event) {
            //        var target = event.getCurrentTarget();
            //
            //        //Get the position of the current point relative to the button
            //        var locationInNode = target.convertToNodeSpace(touch.getLocation());
            //        var s = target.getContentSize();
            //        var rect = cc.rect(0, 0, s.width, s.height);
            //
            //        //Check the click area
            //        if (cc.rectContainsPoint(rect, locationInNode)) {
            //            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
            //            //target.setOpacity(200);
            //            return true;
            //        }
            //        return false;
            //    },
            //    //Trigger when moving touch
            //    onTouchMoved: function (touch, event) {
            //        //Move the position of current button sprite
            //        var target = event.getCurrentTarget();
            //        var delta = touch.getDelta();
            //        target.x += delta.x;
            //        target.y += delta.y;
            //    },
            //    //Process the touch end event
            //    onTouchEnded: function (touch, event) {
            //        var target = event.getCurrentTarget();
            //        cc.log("sprite onTouchesEnded.. ");
            //        //target.setOpacity(255);
            //        //Reset zOrder and the display sequence will change
            //
            //    }
            //});
            //cc.eventManager.addListener(listener1,  this.pLichSuGiaoDich);
            this.addMasterLayer(this.pLichSuGiaoDich);

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case TXLSGDLayer.BTN_CLOSE_LSGD:
                    //this.pLichSuGiaoDich.setVisible(false);
                    closeTXLSGD();

                    break;
                case TXLSGDLayer.BTN_VIN_LSGD:
                    if (this.moneyTypeLSGD == MONEY_VIN) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_VIN;
                        this.parserDataLichSuGiaoDich(this.currentPageLSGD);

                    }

                    break;
                case TXLSGDLayer.BTN_XU_LSGD:
                    if (this.moneyTypeLSGD == MONEY_XU) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_XU;
                        this.parserDataLichSuGiaoDich();

                    }
                    break;
                case TXLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLichSuGiaoDich();
                    }

                    break;
                case TXLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case TXLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case TXLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
            }
        },
        parserDataLichSuGiaoDich: function()
        {
            txLSGD.showLoading();
            var url = urlLichSuGiaoDichTX(txLSGD.currentPageLSGD,lobby.userInfo.nickname,this.moneyTypeLSGD);
            sendRequest(url,null,false,txLSGD.callBackLSGD,txLSGD.callBackError);
        },
        callBackLSGD: function(response)
        {
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            txLSGD.totalPageLSGD = jsonData["totalPages"];
            if(success)
            {
                if(txLSGD.arrLichSuGiaoDich!=null)
                    while(txLSGD.arrLichSuGiaoDich.length > 0) {
                        txLSGD.arrLichSuGiaoDich.pop();
                    }
                var transactions = jsonData["transactions"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];
                    txLSGD.arrLichSuGiaoDich.push(counter);

                }

            }

            txLSGD.reloadLSGD();
            txLSGD.hideLoading();

        },
        callBackError: function(response)
        {
            txLSGD.hideLoading();
        }
        ,
        reloadLSGD:function()
        {
            this.lv_lich_su_giao_dich.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 13;

            //var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_giao_dich.width;
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
                lbPhien.setString(txLSGD.arrLichSuGiaoDich[i].referenceId);
                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTime =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(157,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(160,positionY));
                lbTime.setString(txLSGD.arrLichSuGiaoDich[i].timestamp);
                // lbTime.setTextColor(cc.color.WHITE);

                var lbBetSide =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(60,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbBetSide.setPosition(cc.p(268,positionY));
                if(txLSGD.arrLichSuGiaoDich[i].betSide == 0)
                    lbBetSide.setString("XỈU");
                else
                    lbBetSide.setString("TÀI");
                //lbBetSide.setTextColor(cc.color.WHITE);

                var lbResult =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(87,cellHeight), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(344,positionY));
                lbResult.setString(txLSGD.arrLichSuGiaoDich[i].resultPhien);
                //lbResult.setTextColor(cc.color.WHITE);

                var lbBetValue =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(90,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(438,positionY));
                lbBetValue.setString(formatMoney(0,3,txLSGD.arrLichSuGiaoDich[i].betValue));
                //lbBetValue.setTextColor(cc.color.WHITE);

                var lbRefund =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(90,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbRefund.setPosition(cc.p(532,positionY));
                lbRefund.setString(formatMoney(0,3,txLSGD.arrLichSuGiaoDich[i].totalRefund));
                //lbRefund.setTextColor(cc.color.WHITE);

                var lbTotalPrize =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(90,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTotalPrize.setPosition(cc.p(624,positionY));
                lbTotalPrize.setString(formatMoney(0,3,txLSGD.arrLichSuGiaoDich[i].totalPrize));
                // lbTotalPrize.setTextColor(cc.color.WHITE);


                this.lb_current_page_lsgd.setString(this.currentPageLSGD +"/"+this.totalPageLSGD );

                if(txLSGD.moneyTypeLSGD == MONEY_VIN)
                {
                    //lbResult.setColor(cc.color(231,2,254));
                    lbBetValue.setColor(colorMoneyVin);
                    lbRefund.setColor(colorMoneyVin);
                    lbTotalPrize.setColor(colorMoneyVin);
                }else
                {
                    //lbResult.setColor(cc.color(255,255,255));
                    lbBetValue.setColor(colorMoneyXu);
                    lbRefund.setColor(colorMoneyXu);
                    lbTotalPrize.setColor(colorMoneyXu);
                }
                lbPhien.setColor(colorCellOther);
                lbTime.setColor(colorCellOther);
                lbBetSide.setColor(colorCellOther);
                lbResult.setColor(colorCellOther);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbBetSide);
                cellList.addChild(lbBetValue);
                cellList.addChild(lbRefund);
                cellList.addChild(lbTotalPrize);
                cellList.addChild(lbResult);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(81,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(238,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(298,positionY));

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

                this.lv_lich_su_giao_dich.pushBackCustomItem(cellList);

            }

        }
    }
);

openTXLSGD = function () {
    if (txLSGD === null) {

                //cc.log("----> Create mini game layer first time");
                txLSGD = new TXLSGDLayer();
                txLSGDX = txLSGD.getPosition().x;
                txLSGDY = txLSGD.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txLSGD, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
                txLSGD.parserDataLichSuGiaoDich();


    }else
    {
        txLSGD.setVisible(true);
        cc.eventManager.resumeTarget(txLSGD.pLichSuGiaoDich, true);
        txLSGD.setTag(Minigame.INDEX_TAI_XIU+100);
        txLSGD.reOpenLayer(txLSGD.pLichSuGiaoDich);
        txLSGD.parserDataLichSuGiaoDich();
    }

    txLSGDAppear = true;

};
closeTXLSGD = function () {
    if (txLSGD === null) {
        return;
    }
    if(txLSGDAppear) {
        txLSGD.closeLayer(txLSGD.pLichSuGiaoDich);
        txLSGD.setVisible(false);
        txLSGDAppear = false;
        cc.eventManager.pauseTarget(txLSGD.pLichSuGiaoDich, true);
    }
};


TXLSGDLayer.BTN_CLOSE_LSGD = 36;
TXLSGDLayer.BTN_VIN_LSGD = 37;
TXLSGDLayer.BTN_XU_LSGD = 38;
TXLSGDLayer.BTN_BACK_ALL_LSGD = 39;
TXLSGDLayer.BTN_BACK_LSGD = 40;
TXLSGDLayer.BTN_NECK_LSGD = 41;
TXLSGDLayer.BTN_NECKALL_LSGD = 42;