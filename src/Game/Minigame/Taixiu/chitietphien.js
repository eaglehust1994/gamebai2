var txChiTietPhien = null;
var txChiTietPhienX = 0;
var txChiTietPhienY = 0;
var txChiTietPhienAppear = false;

var TXChiTietPhienLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXChiTietPhien");
            this.initWithBinaryFile("res/TXChiTietPhien.json");

            this.pChiTietPhien = null;
            this.btn_close_chi_tiet_phien = null;
            this.btn_vin_chi_tiet_phien = null;
            this.btn_xu_chi_tiet_phien = null;
            this.btn_back_phien_chi_tiet_phien = null;
            this.btn_neck_phien_chi_tiet_phien = null;
            this.lb_phien_chi_tiet_phien = null;
            this.lb_ngay_chi_tiet_phien = null;
            this.lb_tai_chi_tiet_phien = null;
            this.lb_xiu_chi_tiet_phien = null;
            this.lb_tong_hoan_tra_tai_chi_tiet_phien = null;
            this.lb_tong_dat_tai_chi_tiet_phien = null;
            this.lb_tong_dat_xiu_chi_tiet_phien = null;
            this.lb_tong_hoan_tra_xiu_chi_tiet_phien = null;
            this.sp_tai_chi_tiet_phien = null;
            this.sp_xiu_chi_tiet_phien = null;
            this.sp_xx_chi_tiet_phien1 = null;
            this.sp_xx_chi_tiet_phien2 = null;
            this.sp_xx_chi_tiet_phien3 = null;
            this.lv_chi_tiet_phien = null;
            this.moneyTypeChiTietPhien = MONEY_VIN;
            this.itemChiTietPhien = null;
            this.arrChiTietPhien = null;
            this.rIdChiTietPhien = 0;

        },
        customizeGUI: function () {
            this.pChiTietPhien = this._layout.getChildByName("pChiTietPhien");
            this.pChiTietPhien = this.getControl("pChiTietPhien",this.bg_tai_xiu);
            this.btn_close_chi_tiet_phien = this.customButton("btn_close_chi_tiet_phien",TXChiTietPhienLayer.BTN_CLOSE_CHI_TIET_PHIEN,this.pChiTietPhien);
            this.btn_vin_chi_tiet_phien = this.customButton("btn_vin_chi_tiet_phien",TXChiTietPhienLayer.BTN_VIN_CHI_TIET_PHIEN,this.pChiTietPhien);
            this.btn_xu_chi_tiet_phien = this.customButton("btn_xu_chi_tiet_phien",TXChiTietPhienLayer.BTN_XU_CHI_TIET_PHIEN,this.pChiTietPhien);
            this.btn_back_phien_chi_tiet_phien = this.customButton("btn_back_phien_chi_tiet_phien",TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN,this.pChiTietPhien);
            this.btn_neck_phien_chi_tiet_phien = this.customButton("btn_neck_phien_chi_tiet_phien",TXChiTietPhienLayer.BTN_NECK_PHIEN_CHI_TIET_PHIEN,this.pChiTietPhien);
            this.lb_phien_chi_tiet_phien = this.getControl("lb_phien_chi_tiet_phien",this.pChiTietPhien);
            this.lb_ngay_chi_tiet_phien = this.getControl("lb_ngay_chi_tiet_phien",this.pChiTietPhien);
            this.lb_tai_chi_tiet_phien = this.getControl("lb_tai_chi_tiet_phien",this.pChiTietPhien);
            this.lb_xiu_chi_tiet_phien = this.getControl("lb_xiu_chi_tiet_phien",this.pChiTietPhien);
            this.lb_tong_hoan_tra_tai_chi_tiet_phien = this.getControl("lb_tong_hoan_tra_tai_chi_tiet_phien",this.pChiTietPhien);
            this.lb_tong_dat_tai_chi_tiet_phien = this.getControl("lb_tong_dat_tai_chi_tiet_phien",this.pChiTietPhien);
            this.lb_tong_dat_xiu_chi_tiet_phien = this.getControl("lb_tong_dat_xiu_chi_tiet_phien",this.pChiTietPhien);
            this.lb_tong_hoan_tra_xiu_chi_tiet_phien = this.getControl("lb_tong_hoan_tra_xiu_chi_tiet_phien",this.pChiTietPhien);
            this.sp_tai_chi_tiet_phien = this.pChiTietPhien.getChildByName("sp_tai_chi_tiet_phien");
            this.sp_xiu_chi_tiet_phien = this.pChiTietPhien.getChildByName("sp_xiu_chi_tiet_phien");
            this.sp_xx_chi_tiet_phien1 = this.pChiTietPhien.getChildByName("sp_xx_chi_tiet_phien1");
            this.sp_xx_chi_tiet_phien2 = this.pChiTietPhien.getChildByName("sp_xx_chi_tiet_phien2");
            this.sp_xx_chi_tiet_phien3 = this.pChiTietPhien.getChildByName("sp_xx_chi_tiet_phien3");
            this.lv_chi_tiet_phien = this.getControl("lv_chi_tiet_phien",this.pChiTietPhien);
            this.lv_chi_tiet_phien.setTouchEnabled(true);


           // this.lv_chi_tiet_phien.setBounceEnabled(true);
           // this.lv_chi_tiet_phien.clippingToBounds = false;
           // this.lv_chi_tiet_phien.setSizePercent(cc.p(0,0));
            this.lv_chi_tiet_phien.setScrollBarEnabled(true);
            this.itemChiTietPhien ={
            };
            this.arrChiTietPhien = [{
            }];

            var listener1 = cc.EventListener.create({
               event: cc.EventListener.TOUCH_ONE_BY_ONE,
               swallowTouches: true,
               onTouchBegan: function (touch, event) {
                   var target = event.getCurrentTarget();

                   //Get the position of the current point relative to the button
                   var locationInNode = target.convertToNodeSpace(touch.getLocation());
                   var s = target.getContentSize();
                   var rect = cc.rect(0, 0, s.width, s.height);

                   //Check the click area
                   if (cc.rectContainsPoint(rect, locationInNode)) {
                       cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);

                       return true;
                   }
                   return false;
               },
               //Trigger when moving touch
               onTouchMoved: function (touch, event) {
                   //Move the position of current button sprite
                   var target = event.getCurrentTarget();
                   var delta = touch.getDelta();
                   target.x += delta.x;
                   target.y += delta.y;
               },
               //Process the touch end event
               onTouchEnded: function (touch, event) {

               }
            });
            cc.eventManager.addListener(listener1,  this.pChiTietPhien);
            this.addMasterLayer(this.pChiTietPhien);

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case TXChiTietPhienLayer.BTN_CLOSE_CHI_TIET_PHIEN :
                    closeTXChiTietPhien();

                    break;
                case TXChiTietPhienLayer.BTN_VIN_CHI_TIET_PHIEN :
                    if (this.moneyTypeChiTietPhien == MONEY_VIN) {

                    } else {
                        this.btn_vin_chi_tiet_phien.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.btn_xu_chi_tiet_phien.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                        this.moneyTypeChiTietPhien = MONEY_VIN;
                        this.parserDataChiTietPhien(this.rIdChiTietPhien);
                    }
                    break;
                case TXChiTietPhienLayer.BTN_XU_CHI_TIET_PHIEN :
                    if (this.moneyTypeChiTietPhien == MONEY_XU) {

                    } else {
                        this.btn_vin_chi_tiet_phien.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.btn_xu_chi_tiet_phien.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                        this.moneyTypeChiTietPhien = MONEY_XU;
                        this.parserDataChiTietPhien(this.rIdChiTietPhien);
                    }
                    break;
                case TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN :
                    if (this.rIdChiTietPhien > 0) {

                        this.rIdChiTietPhien--;
                        this.parserDataChiTietPhien(this.rIdChiTietPhien);
                    }
                    break;
                case TXChiTietPhienLayer.BTN_NECK_PHIEN_CHI_TIET_PHIEN :
                    if(this.rIdChiTietPhien < taiXiu.referenceId-1)
                    {
                        this.rIdChiTietPhien++;
                        this.parserDataChiTietPhien(this.rIdChiTietPhien);
                    }
                    break;
            }
        },
        parserDataChiTietPhien: function(rid)
        {
            this.showLoading();
            var url = urlChiTietPhien(rid,this.moneyTypeChiTietPhien);
            sendRequest(url,null,false,txChiTietPhien.callBackChiTietPhien,txChiTietPhien.callBackError);
        },
        callBackError: function(response)
        {
            txChiTietPhien.hideLoading();
        }
        ,
        callBackChiTietPhien:function(response)
        {
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {

                txChiTietPhien.itemChiTietPhien = jsonData["resultTX"];


                if(txChiTietPhien.arrChiTietPhien!=null)
                    while(txChiTietPhien.arrChiTietPhien.length > 0) {
                        txChiTietPhien.arrChiTietPhien.pop();
                    }
                var transaction = jsonData["transactions"];

                for (var i = 0; i < transaction.length; i++) {
                    var counter = transaction[i];
                    txChiTietPhien.arrChiTietPhien.push(counter);

                }
                txChiTietPhien.reloadChiTietPhien();
            }

            txChiTietPhien.hideLoading();
        },
        reloadChiTietPhien:function()
        {
            txChiTietPhien.lv_chi_tiet_phien.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 12;

            this.sp_tai_chi_tiet_phien.stopAllActions();
            this.sp_xiu_chi_tiet_phien.stopAllActions();
            txChiTietPhien.lb_phien_chi_tiet_phien.setString("Phiên #"+txChiTietPhien.itemChiTietPhien.referenceId);
            txChiTietPhien.lb_ngay_chi_tiet_phien.setString(txChiTietPhien.itemChiTietPhien.timestamp);
            txChiTietPhien.lb_xiu_chi_tiet_phien.setVisible(true);
            txChiTietPhien.lb_tai_chi_tiet_phien.setVisible(true);
            if(txChiTietPhien.itemChiTietPhien.result == 1)
            {
                txChiTietPhien.lb_tai_chi_tiet_phien.setString((txChiTietPhien.itemChiTietPhien.dice1 + txChiTietPhien.itemChiTietPhien.dice2+txChiTietPhien.itemChiTietPhien.dice3).toString());
                txChiTietPhien.lb_xiu_chi_tiet_phien.setVisible(false);
                this.sp_tai_chi_tiet_phien.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.25,0.4),cc.scaleTo(0.25,0.5))));

            }else
            {
                txChiTietPhien.lb_xiu_chi_tiet_phien.setString((txChiTietPhien.itemChiTietPhien.dice1 + txChiTietPhien.itemChiTietPhien.dice2+txChiTietPhien.itemChiTietPhien.dice3).toString());
                txChiTietPhien.lb_tai_chi_tiet_phien.setVisible(false);
                this.sp_xiu_chi_tiet_phien.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.25,0.4),cc.scaleTo(0.25,0.5))));
                //this.sp_xiu_chi_tiet_phien
            }
            if(txChiTietPhien.moneyTypeChiTietPhien == MONEY_VIN)
            {
                txChiTietPhien.lb_tong_hoan_tra_tai_chi_tiet_phien.setColor(colorMoneyVin);
                txChiTietPhien.lb_tong_dat_tai_chi_tiet_phien.setColor(colorMoneyVin);
                txChiTietPhien.lb_tong_dat_xiu_chi_tiet_phien.setColor(colorMoneyVin);
                txChiTietPhien.lb_tong_hoan_tra_xiu_chi_tiet_phien.setColor(colorMoneyVin);
            }else
            {
                txChiTietPhien.lb_tong_hoan_tra_tai_chi_tiet_phien.setColor(colorMoneyXu);
                txChiTietPhien.lb_tong_dat_tai_chi_tiet_phien.setColor(colorMoneyXu);
                txChiTietPhien.lb_tong_dat_xiu_chi_tiet_phien.setColor(colorMoneyXu);
                txChiTietPhien.lb_tong_hoan_tra_xiu_chi_tiet_phien.setColor(colorMoneyXu);

            }
            txChiTietPhien.lb_tong_hoan_tra_tai_chi_tiet_phien.setString(formatMoney(0,3,txChiTietPhien.itemChiTietPhien.totalRefundTai));
            txChiTietPhien.lb_tong_dat_tai_chi_tiet_phien.setString(formatMoney(0,3,txChiTietPhien.itemChiTietPhien.totalTai));
            txChiTietPhien.lb_tong_dat_xiu_chi_tiet_phien.setString(formatMoney(0,3,txChiTietPhien.itemChiTietPhien.totalXiu));
            txChiTietPhien.lb_tong_hoan_tra_xiu_chi_tiet_phien.setString(formatMoney(0,3,txChiTietPhien.itemChiTietPhien.totalRefundXiu));
            txChiTietPhien.sp_xx_chi_tiet_phien1.setSpriteFrame("res/Minigame/TaiXiu/images/xx1"+txChiTietPhien.itemChiTietPhien.dice1+".png");
            txChiTietPhien.sp_xx_chi_tiet_phien2.setSpriteFrame("res/Minigame/TaiXiu/images/xx1"+txChiTietPhien.itemChiTietPhien.dice2+".png");
            txChiTietPhien.sp_xx_chi_tiet_phien3.setSpriteFrame("res/Minigame/TaiXiu/images/xx1"+txChiTietPhien.itemChiTietPhien.dice3+".png");


            var arrChiTietPhienTai = [];
            var arrChiTietPhienXiu = [];
            var  fonts = RobotoRegular;
            for(var i = 0; i<txChiTietPhien.arrChiTietPhien.length; i++) {

                if (txChiTietPhien.arrChiTietPhien[i].betSide == 1) {
                    arrChiTietPhienTai.push(txChiTietPhien.arrChiTietPhien[i]);
                } else {
                    arrChiTietPhienXiu.push(txChiTietPhien.arrChiTietPhien[i]);
                }
            }

            var countCell = 0;
            if(arrChiTietPhienTai.length>=arrChiTietPhienXiu.length)
            {
                countCell = arrChiTietPhienTai.length;
            }else
            {
                countCell = arrChiTietPhienXiu.length;
            }
            for(var i = 0; i< countCell; i++)
            {

                var cellList = new ccui.Layout();


                cellList.height = cellHeight;
                cellList.width =  this.lv_chi_tiet_phien.width;
                if(i>=arrChiTietPhienTai.length)
                {

                }else
                {
                   // var cellTai = null;
                   //
                   // //cellTai.setBackGroundColorType(ccui.Layout.BG_COLOR_GRADIENT);
                   //// cellTai.setClippingEnabled(true);
                   // if(i % 2 == 0)
                   // {
                   //     cellTai = new cc.LayerColor(colorBgCell1);
                   // }else
                   // {
                   //     cellTai = new cc.LayerColor(colorBgCell2);
                   // }
                   // cellTai.height = cellHeight;
                   // cellTai.width =  324;
                   // cellTai.setPosition(cc.p(0,0));
                   // cellTai.setOpacity(255);

                    var cellTai = new ccui.Layout();

                    cellTai.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                    cellTai.setBackGroundColor(colorBgCell1);
                    cellTai.height = cellHeight;
                    cellTai.width =  324;
                    if(i % 2 == 1)
                    {
                        cellList.height = cellHeight+2;
                        cellTai.height=cellHeight+2;
                        cellTai.setBackGroundColorOpacity(204);
                    }else
                    {
                        cellTai.setBackGroundColorOpacity(100);
                    }

                    var lbTG = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(36,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTG.setPosition(cc.p(18,positionY));
                    lbTG.setString("00:"+arrChiTietPhienTai[i].inputTime);

                    //var txtTG = new ccui.Text();
                    //txtTG.setFontName(fonts.fontName);
                    //txtTG.setFontSize(fontSize);
                    //txtTG.setString("00:"+arrChiTietPhienTai[i].inputTime);

                    var lbTen = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(126,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTen.setPosition(cc.p(99,positionY));
                    lbTen.setString(arrChiTietPhienTai[i].username);

                    var lbHoan = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbHoan.setPosition(cc.p(200,positionY));
                    lbHoan.setString(formatMoney(0,3,arrChiTietPhienTai[i].refund));


                    var lbDat = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbDat.setPosition(cc.p(283,positionY));
                    lbDat.setString(formatMoney(0,3,arrChiTietPhienTai[i].betValue));

                    if(txChiTietPhien.moneyTypeChiTietPhien == MONEY_VIN)
                    {
                        lbHoan.setColor(colorMoneyVin);
                        lbDat.setColor(colorMoneyVin);
                    }else
                    {

                        lbHoan.setColor(colorMoneyXu);
                        lbDat.setColor(colorMoneyXu);
                    }

                    if(lobby.userInfo.nickname == arrChiTietPhienTai[i].username)
                    {
                        lbTG.setColor(colorCell1);
                        lbTen.setColor(colorCell1);
                    }else
                    {
                        lbTG.setColor(colorCellOther);
                        lbTen.setColor(colorCellOther);
                    }

                    cellTai.addChild(lbTG);
                    cellTai.addChild(lbTen);
                    cellTai.addChild(lbHoan);
                    cellTai.addChild(lbDat);
                    cellList.addChild(cellTai);

                }

                if(i>=arrChiTietPhienXiu.length)
                {

                }else
                {
                    var cellXiu=  new ccui.Layout();

                    cellXiu.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                    cellXiu.setBackGroundColor(colorBgCell1);
                    cellXiu.height = cellHeight;
                    cellXiu.width =  324;
                    if(i % 2 == 1)
                    {
                        cellList.height = cellHeight+2;
                        cellXiu.height=cellHeight+2;
                        cellXiu.setBackGroundColorOpacity(204);
                    }else
                    {
                        cellXiu.setBackGroundColorOpacity(100);
                    }
                    // cellTai.setClippingEnabled(true);


                    cellXiu.setPosition(cc.p(328,0));
                    var lbTG = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(36,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                    lbTG.setPosition(cc.p(306,positionY));
                    lbTG.setString("00:"+arrChiTietPhienXiu[i].inputTime);

                    var lbTen = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(126,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTen.setPosition(cc.p(225,positionY));
                    lbTen.setString(arrChiTietPhienXiu[i].username);

                    var lbHoan = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbHoan.setPosition(cc.p(122,positionY));
                    lbHoan.setString(formatMoney(0,3,arrChiTietPhienXiu[i].refund));

                    var lbDat = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbDat.setPosition(cc.p(41,positionY));
                    lbDat.setString(formatMoney(0,3,arrChiTietPhienXiu[i].betValue));

                    if(txChiTietPhien.moneyTypeChiTietPhien == MONEY_VIN)
                    {
                        lbHoan.setColor(colorMoneyVin);
                        lbDat.setColor(colorMoneyVin);
                    }else
                    {

                            lbHoan.setColor(colorMoneyXu);
                            lbDat.setColor(colorMoneyXu);


                    }

                    if(lobby.userInfo.nickname == arrChiTietPhienXiu[i].username)
                    {
                        lbTG.setColor(colorCell1);
                        lbTen.setColor(colorCell1);
                    }else
                    {
                        lbTG.setColor(colorCellOther);
                        lbTen.setColor(colorCellOther);
                    }

                    cellXiu.addChild(lbTG);
                    cellXiu.addChild(lbTen);
                    cellXiu.addChild(lbHoan);
                    cellXiu.addChild(lbDat);
                    cellList.addChild(cellXiu);

                }
                txChiTietPhien.lv_chi_tiet_phien.pushBackCustomItem(cellList);

            }
        }
        //,
        //pause:function (sender) {
        //    //this._container.pauseSchedulerAndActions();
        //    //var selChildren = this._container.getChildren();
        //    //for (var i = 0; i < selChildren.length; i++) {
        //    //    selChildren[i].pauseSchedulerAndActions();
        //    //}
        //    cc.log("pause ------ ");
        //},
        //
        ///**
        // * Provided to make scroll view compatible with SWLayer's resume method
        // */
        //resume:function (sender) {
        //    cc.log("resume ------ ");
        //    //var selChildren = this._container.getChildren();
        //    //for (var i = 0; i < selChildren.length; i++) {
        //    //    selChildren[i].resumeSchedulerAndActions();
        //    //}
        //    //
        //    //this._container.resumeSchedulerAndActions();
        //}

    }
);

openTXChiTietPhien = function (rID) {
    if (txChiTietPhien === null) {
                //cc.log("----> Create mini game layer first time");
                txChiTietPhien = new TXChiTietPhienLayer();
                txChiTietPhienX = txChiTietPhien.getPosition().x;
                txChiTietPhienY = txChiTietPhien.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txChiTietPhien, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
                txChiTietPhien.rIdChiTietPhien = rID;
                txChiTietPhien.parserDataChiTietPhien(rID);
    }else
    {
        txChiTietPhien.setVisible(true);
        cc.eventManager.resumeTarget(txChiTietPhien.pChiTietPhien, true);
        txChiTietPhien.setTag(Minigame.INDEX_TAI_XIU+100);
        txChiTietPhien.rIdChiTietPhien = rID;
        txChiTietPhien.parserDataChiTietPhien(rID);
        txChiTietPhien.reOpenLayer(txChiTietPhien.pChiTietPhien);
    }

    txChiTietPhienAppear = true;

};
closeTXChiTietPhien = function () {
    if (txChiTietPhien === null) {
        return;
    }
    if(txChiTietPhienAppear) {
        txChiTietPhien.closeLayer(txChiTietPhien.pChiTietPhien);
        txChiTietPhien.setVisible(false);
        txChiTietPhienAppear = false;
        cc.eventManager.pauseTarget(txChiTietPhien.pChiTietPhien, true);
    }
};
TXChiTietPhienLayer.BTN_CLOSE_CHI_TIET_PHIEN = 46;
TXChiTietPhienLayer.BTN_VIN_CHI_TIET_PHIEN = 47;
TXChiTietPhienLayer.BTN_XU_CHI_TIET_PHIEN = 48;
TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN = 49;
TXChiTietPhienLayer.BTN_NECK_PHIEN_CHI_TIET_PHIEN = 50;