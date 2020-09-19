var mini_slot_lichsu = null;
var mini_slot_lichsuX = 0;
var mini_slot_lichsuY = 0;
var mini_slot_lichsuAppear = false;

var codeSlot3Hang_lichsu = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrLichSuGiaoDich = [];
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.btnCloseLichSuSlot = null;

            this.pn_lichsu = null;

            this.pMaster = null;
            this.btn_vin_lichsu_slot = null;
            this.btn_xu_lichsu_slot = null;
            this.lv_lichsu = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;

            this.pDetail = null;
            this.btn_back = null;
            this.lb_phien_detail = null;
            this.lb_time_detail = null;
            this.lb_phong_detail = null;
            this.lv_lichsu_detail = null;


            this._super("codeSlot3Hang_lichsu");
            this.initWithBinaryFile("res/Slot3Hang_lichsu.json");
            return true;
        },

        customizeGUI: function() {
            this.pn_lichsu = this._layout.getChildByName("pn_lichsu");
            this.pn_lichsu.setScale(0);
            this.pn_lichsu.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichSuSlot = this.customButton("btnCloseLichSuSlot", codeSlot3Hang_lichsu.BTN_CLOSELICHSUMINISLOT, this.pn_lichsu);

            this.pMaster = this.getControl("pMaster",this.pn_lichsu);
            this.btn_vin_lichsu_slot = this.customButton("btn_vin_lichsu_slot", codeSlot3Hang_lichsu.BTN_VIN, this.pMaster);
            this.btn_xu_lichsu_slot = this.customButton("btn_xu_lichsu_slot", codeSlot3Hang_lichsu.BTN_XU, this.pMaster);
            this.lv_lichsu = this.getControl("lv_lichsu",this.pMaster);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",codeSlot3Hang_lichsu.BTN_BACK_ALL_LSGD,this.pMaster);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",codeSlot3Hang_lichsu.BTN_BACK_LSGD,this.pMaster);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pMaster);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",codeSlot3Hang_lichsu.BTN_NECK_LSGD,this.pMaster);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",codeSlot3Hang_lichsu.BTN_NECKALL_LSGD,this.pMaster);


            this.pDetail = this.getControl("pDetail",this.pn_lichsu);
            this.btn_back = this.customButton("btn_back", codeSlot3Hang_lichsu.BTN_BACK, this.pDetail);
            this.lb_phien_detail = this.getControl("lb_phien_detail",this.pDetail);
            this.lb_time_detail = this.getControl("lb_time_detail",this.pDetail);
            this.lb_phong_detail = this.getControl("lb_phong_detail",this.pDetail);
            this.lv_lichsu_detail = this.getControl("lv_lichsu_detail",this.pDetail);

            this.pDetail.setVisible(false);

            this.addMasterLayer(this.pn_lichsu);

        },
        onshow :function(){
            this.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeSlot3Hang_lichsu.BTN_CLOSELICHSUMINISLOT:
                    close_minislot_lichsu();
                    break;
                case codeSlot3Hang_lichsu.BTN_VIN:
                    if (this.moneyTypeLSGD == MONEY_VIN) {

                    } else {
                        this.btn_vin_lichsu_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.btn_xu_lichsu_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_VIN;
                        this.parserDataLichSuGiaoDich(this.currentPageLSGD);

                    }
                    break;
                case codeSlot3Hang_lichsu.BTN_XU:
                    if (this.moneyTypeLSGD == MONEY_XU) {

                    } else {
                        this.btn_vin_lichsu_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.btn_xu_lichsu_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_XU;
                        this.parserDataLichSuGiaoDich();

                    }
                    break;
                case codeSlot3Hang_lichsu.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLichSuGiaoDich();
                    }

                    break;
                case codeSlot3Hang_lichsu.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case codeSlot3Hang_lichsu.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case codeSlot3Hang_lichsu.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case codeSlot3Hang_lichsu.BTN_BACK:
                    this.pDetail.setVisible(false);
                    this.pMaster.setVisible(true);
                    break;
            }
        },
        parserDataLichSuGiaoDich: function()
        {
            this.showLoading();
            var url = urlPKMLichSuGiaoDich(lobby.userInfo.nickname,mini_slot_lichsu.currentPageLSGD,this.moneyTypeLSGD);
            sendRequest(url,null,false,mini_slot_lichsu.callBackLSGD,mini_slot_lichsu.callBackError);
        },
        callBackLSGD: function(response)
        {
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            mini_slot_lichsu.totalPageLSGD = jsonData["totalPages"];
            if(success)
            {
                if(mini_slot_lichsu.arrLichSuGiaoDich!=null)
                    while(mini_slot_lichsu.arrLichSuGiaoDich.length > 0) {
                        mini_slot_lichsu.arrLichSuGiaoDich.pop();
                    }
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    mini_slot_lichsu.arrLichSuGiaoDich.push(counter);

                }

            }

            mini_slot_lichsu.reloadLSGD();

            mini_slot_lichsu.hideLoading();
        },
        callBackError: function(response)
        {
            mini_slot_lichsu.hideLoading();
        }
        ,
        reloadLSGD:function()
        {
            this.pMaster.setVisible(true);
            this.pDetail.setVisible(false);
            this.lv_lichsu.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 16;

            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;
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
                var lbPhien =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(77,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(36,positionY));
                lbPhien.setString(mini_slot_lichsu.arrLichSuGiaoDich[i].rf);
                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTime =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(187,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(170,positionY));
                if(mini_slot_lichsu.arrLichSuGiaoDich[i].ts != null)
                    lbTime.setString(mini_slot_lichsu.arrLichSuGiaoDich[i].ts);
                else
                    lbTime.setString("");
                // lbTime.setTextColor(cc.color.WHITE);

                var lbRoom =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(55,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(291.5,positionY));
                lbRoom.setString(formatMoneyStr(mini_slot_lichsu.arrLichSuGiaoDich[i].bv));
                //lbBetSide.setTextColor(cc.color.WHITE);


                var lbResult =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(46,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(342,positionY));
                if(mini_slot_lichsu.arrLichSuGiaoDich[i].lb!="")
                {
                    lbResult.setString(mini_slot_lichsu.arrLichSuGiaoDich[i].lb.split(",").length.toString());
                }else
                {
                    lbResult.setString("0");
                }

                //lbResult.setTextColor(cc.color.WHITE);

                var lbBetValue =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(57,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(393.5,positionY));
                if(mini_slot_lichsu.arrLichSuGiaoDich[i].lw!="")
                {
                    lbBetValue.setString(mini_slot_lichsu.arrLichSuGiaoDich[i].lw.split(",").length.toString());
                }else
                {
                    lbBetValue.setString("0");
                }
                
                var lbTotalPrize =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTotalPrize.setPosition(cc.p(494,positionY));
                lbTotalPrize.setString(formatMoney(0,3,parseFloat(mini_slot_lichsu.arrLichSuGiaoDich[i].pz)));
                // lbTotalPrize.setTextColor(cc.color.WHITE);

                var btnChiTiet = new ccui.Button();
                btnChiTiet.setContentSize(cc.size(104,30));
                btnChiTiet.setPosition(cc.p(610,positionY));
                btnChiTiet.setTitleText("Chi tiết");
                btnChiTiet.setTag(i);
                btnChiTiet.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:

                            mini_slot_lichsu.showDetailLSGD(mini_slot_lichsu.arrLichSuGiaoDich[sender.getTag()]);
                            break;
                    }

                },mini_slot_lichsu);


                this.lb_current_page_lsgd.setString(this.currentPageLSGD +"/"+this.totalPageLSGD );

                if(mini_slot_lichsu.moneyTypeLSGD == MONEY_VIN)
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
                spNganCot.setPosition(cc.p(77,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(264,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(319,positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(365,positionY));

                var spNganCot4 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(422,positionY));

                var spNganCot5 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot5.setScaleY(0.8);
                spNganCot5.setPosition(cc.p(566,positionY));



                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);
                cellList.addChild(spNganCot5);



                mini_slot_lichsu.lv_lichsu.pushBackCustomItem(cellList);

            }

        },
        showDetailLSGD: function(obj)
        {
            var lineWins = null;
            if(obj.lw.trim(" ") != "")
                lineWins = obj.lw.split(",");
            else
                lineWins = [];

            var moneyWin = obj.ps.split(",");
            var phien = obj.rf;
            var time = obj.ts;
            var phong = obj.bv;

            mini_slot_lichsu.pDetail.setVisible(true);
            mini_slot_lichsu.pMaster.setVisible(false);
            mini_slot_lichsu.lv_lichsu_detail.removeAllItems();
            //var phienPhong = "Phiên #"+obj.referenceId+"/"+formatMoneyStr(obj.room);
            mini_slot_lichsu.lb_phien_detail.setString(phien.toString());
            mini_slot_lichsu.lb_time_detail.setString(time.toString());
            mini_slot_lichsu.lb_phong_detail.setString(phong.toString());
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 16;


            for(var i = 0; i<lineWins.length; i++)
            {

                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;
                cellList.setBackGroundColor(colorBgCell1);
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }

                var lbCua =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(217,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbCua.setPosition(cc.p(108,positionY));
                lbCua.setString(lineWins[i]);

                var lbBetValue =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(217,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(325,positionY));
                lbBetValue.setString(formatMoney(0,3,obj.bv));

                var lbPrize =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(217,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPrize.setPosition(cc.p(542,positionY));
                lbPrize.setString(formatMoney(0,3,moneyWin[i]));

                lbCua.setColor(colorCellOther);
                lbBetValue.setColor(colorCellOther);
                lbPrize.setColor(colorCellOther);

                cellList.addChild(lbCua);
                cellList.addChild(lbBetValue);
                cellList.addChild(lbPrize);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(217,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(434,positionY));

                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);


                mini_slot_lichsu.lv_lichsu_detail.pushBackCustomItem(cellList);
            }


        }
    });

codeSlot3Hang_lichsu.BTN_CLOSELICHSUMINISLOT = 1;
codeSlot3Hang_lichsu.BTN_VIN = 2;
codeSlot3Hang_lichsu.BTN_XU = 3;
codeSlot3Hang_lichsu.BTN_BACK = 4;
codeSlot3Hang_lichsu.BTN_BACK_ALL_LSGD = 39;
codeSlot3Hang_lichsu.BTN_BACK_LSGD = 40;
codeSlot3Hang_lichsu.BTN_NECK_LSGD = 41;
codeSlot3Hang_lichsu.BTN_NECKALL_LSGD = 42;

open_minislot_lichsu = function () {
    if (mini_slot_lichsu == null) {
        mini_slot_lichsu = new codeSlot3Hang_lichsu();
        mini_slot_lichsuX = mini_slot_lichsu.getPosition().x;
        mini_slot_lichsuY = mini_slot_lichsu.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_slot_lichsu, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        mini_slot_lichsu.setVisible(true);
        mini_slot_lichsu.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_slot_lichsu.pn_lichsu, true);
        mini_slot_lichsu.setTag(Minigame.INDEX_MINI_SLOT +100);
        mini_slot_lichsu.reOpenLayer(mini_slot_lichsu.pn_lichsu);
    }
    mini_slot_lichsuAppear = true;
    mini_slot_lichsu.parserDataLichSuGiaoDich();
};
close_minislot_lichsu = function () {
    if (mini_slot_lichsu == null) {
        return;
    }
    if(mini_slot_lichsuAppear) {
        mini_slot_lichsu.closeLayer(mini_slot_lichsu.pn_lichsu);
        mini_slot_lichsu.setVisible(false);
        mini_slot_lichsu.pn_lichsu.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_slot_lichsu.pn_lichsu, true);
        mini_slot_lichsuAppear = false;
    }
};