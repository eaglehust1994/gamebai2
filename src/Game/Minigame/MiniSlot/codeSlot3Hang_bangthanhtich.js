var mini_slot_bangthanhtich = null;
var mini_slot_bangthanhtichX = 0;
var mini_slot_bangthanhtichY = 0;
var mini_slot_bangthanhtichAppear = false;

var codeSlot3Hang_bangthanhtich = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.arrTopUser = [];
            this.currentPage = 1;
            this.totalPage = 1;
            this.moneyType = MONEY_VIN;
            this.btnCloseVinhDanhSlot = null;
            this.pn_bangthanhtich = null;

            this.btn_vin_thanhtich_slot = null;
            this.btn_xu_thanhtich_slot = null;
            this.lv_top_user = null;

            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("codeSlot3Hang_bangthanhtich");
            this.initWithBinaryFile("res/Slot3hang_bangthanhtich.json");
            return true;
        },
        customizeGUI: function() {
            this.pn_bangthanhtich = this._layout.getChildByName("pn_bangthanhtich");
            //this.pn_bangthanhtich.setScale(0);
            //this.pn_bangthanhtich.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseVinhDanhSlot = this.customButton("btnCloseVinhDanhSlot", codeSlot3Hang_bangthanhtich.BTN_CLOSEBTT_MINISLOT, this.pn_bangthanhtich);

            this.btn_vin_thanhtich_slot = this.customButton("btn_vin_thanhtich_slot", codeSlot3Hang_bangthanhtich.BTN_VIN, this.pn_bangthanhtich);
            this.btn_xu_thanhtich_slot = this.customButton("btn_xu_thanhtich_slot", codeSlot3Hang_bangthanhtich.BTN_XU, this.pn_bangthanhtich);

            this.lv_top_user = this.getControl("lv_top_user",this.pn_bangthanhtich);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",codeSlot3Hang_bangthanhtich.BTN_BACK_ALL_LSGD,this.pn_bangthanhtich);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",codeSlot3Hang_bangthanhtich.BTN_BACK_LSGD,this.pn_bangthanhtich);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pn_bangthanhtich);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",codeSlot3Hang_bangthanhtich.BTN_NECK_LSGD,this.pn_bangthanhtich);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",codeSlot3Hang_bangthanhtich.BTN_NECKALL_LSGD,this.pn_bangthanhtich);


            this.addMasterLayer(this.pn_bangthanhtich);
        },
        onshow :function(){
            this.pn_bangthanhtich.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeSlot3Hang_bangthanhtich.BTN_CLOSEBTT_MINISLOT:
                    close_minislot_bangthanhtich();
                    break;
                case codeSlot3Hang_bangthanhtich.BTN_VIN:
                    if (this.moneyType == MONEY_VIN) {

                    } else {
                        this.btn_vin_thanhtich_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                        this.btn_xu_thanhtich_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                        this.moneyType = MONEY_VIN;
                        this.parserDataTopUser();
                    }
                    break;
                case codeSlot3Hang_bangthanhtich.BTN_XU:
                    if (this.moneyType == MONEY_XU) {

                    } else {
                        this.btn_vin_thanhtich_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                        this.btn_xu_thanhtich_slot.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                        this.moneyType = MONEY_XU;
                        this.parserDataTopUser();

                    }
                    break;
                case codeSlot3Hang_bangthanhtich.BTN_BACK_ALL_LSGD:
                    if (this.currentPage != 1) {
                        this.currentPage = 1;
                        this.parserDataTopUser();
                    }

                    break;
                case codeSlot3Hang_bangthanhtich.BTN_BACK_LSGD:
                    if (this.currentPage != 1) {
                        this.currentPage--;
                        this.parserDataTopUser();
                    }
                    break;
                case codeSlot3Hang_bangthanhtich.BTN_NECK_LSGD:
                    if (this.currentPage != this.totalPage) {
                        this.currentPage++;
                        this.parserDataTopUser();
                    }
                    break;
                case codeSlot3Hang_bangthanhtich.BTN_NECKALL_LSGD:
                    if (this.currentPage != this.totalPage) {
                        this.currentPage = this.totalPage;
                        this.parserDataTopUser();
                    }
                    break;
            }
        },
        callBackError: function(response)
        {
            mini_slot_bangthanhtich.hideLoading();
        }
        ,

        parserDataTopUser: function()
        {
            this.showLoading();
            var url = urlPKMTopUser(mini_slot_bangthanhtich.currentPage,mini_slot_bangthanhtich.moneyType);
            sendRequest(url,null,false,mini_slot_bangthanhtich.callBackTopUser,mini_slot_bangthanhtich.callBackError);
        },
        callBackTopUser:function(response)
        {
            //if(mini_slot_bangthanhtich.moneyType == MONEY_VIN)
            //{
            //    mini_slot_bangthanhtich.cacheTopUser.responseTopVin = response;
            //}else
            //{
            //    mini_slot_bangthanhtich.cacheTopUser.responseTopXu = response;
            //}
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                mini_slot_bangthanhtich.totalPage = jsonData["totalPages"];
                if(mini_slot_bangthanhtich.arrTopUser!=null)
                    while(mini_slot_bangthanhtich.arrTopUser.length > 0) {
                        mini_slot_bangthanhtich.arrTopUser.pop();
                    }
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    mini_slot_bangthanhtich.arrTopUser.push(counter);

                }
                mini_slot_bangthanhtich.reloadTopUser();
            }
            mini_slot_bangthanhtich.hideLoading();

        },
        reloadTopUser:function()
        {
            this.lv_top_user.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var  fonts = RobotoRegular;

            for(var i = 0; i<this.arrTopUser.length; i++)
            {
                var cellList = new ccui.Layout();


                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_top_user.width;
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
                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(168,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(84,positionY));
                lbTime.setString(mini_slot_bangthanhtich.arrTopUser[i].ts);
                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(130,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(233.72,positionY));
                lbTaiKhoan.setString(mini_slot_bangthanhtich.arrTopUser[i].un);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(85,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(341.38,positionY));
                lbRoom.setString(formatMoney(0,3,mini_slot_bangthanhtich.arrTopUser[i].bv));

                var lbTienThang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(120,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbTienThang.setPosition(cc.p(447.18,positionY));
                lbTienThang.setString(formatMoney(0,3,mini_slot_bangthanhtich.arrTopUser[i].pz));

                var lbLoai =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(142,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbLoai.setPosition(cc.p(581.31,positionY));
                lbLoai.setString("Nổ hũ");
                if(mini_slot_bangthanhtich.moneyType == MONEY_VIN)
                {
                    lbTienThang.setColor(colorMoneyVin);
                }else
                {
                    lbTienThang.setColor(colorMoneyXu);
                }


                cellList.addChild(lbTime);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbRoom);
                cellList.addChild(lbTienThang);
                cellList.addChild(lbLoai);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(168.12,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(298.87,positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(383.96,positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(510.14,positionY));

                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);

                this.lv_top_user.pushBackCustomItem(cellList);


            }
            this.lb_current_page_lsgd.setString(this.currentPage +"/"+this.totalPage );
        }
    });

codeSlot3Hang_bangthanhtich.BTN_CLOSEBTT_MINISLOT = 1;
codeSlot3Hang_bangthanhtich.BTN_VIN = 2;
codeSlot3Hang_bangthanhtich.BTN_XU = 3
codeSlot3Hang_bangthanhtich.BTN_BACK_ALL_LSGD = 39;
codeSlot3Hang_bangthanhtich.BTN_BACK_LSGD = 40;
codeSlot3Hang_bangthanhtich.BTN_NECK_LSGD = 41;
codeSlot3Hang_bangthanhtich.BTN_NECKALL_LSGD = 42;

open_minislot_bangthanhtich = function () {
    if (mini_slot_bangthanhtich == null) {
        mini_slot_bangthanhtich = new codeSlot3Hang_bangthanhtich();
        mini_slot_bangthanhtichX = mini_slot_bangthanhtich.getPosition().x;
        mini_slot_bangthanhtichY = mini_slot_bangthanhtich.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_slot_bangthanhtich, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        mini_slot_bangthanhtich.setVisible(true);
        mini_slot_bangthanhtich.pn_bangthanhtich.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_slot_bangthanhtich.pn_bangthanhtich, true);
        mini_slot_bangthanhtich.setTag(Minigame.INDEX_MINI_SLOT +100);
        mini_slot_bangthanhtich.reOpenLayer(mini_slot_bangthanhtich.pn_bangthanhtich);
    }
    mini_slot_bangthanhtichAppear = true;
    mini_slot_bangthanhtich.parserDataTopUser();

};
close_minislot_bangthanhtich = function () {
    if (mini_slot_bangthanhtich == null) {
        return;
    }
    if(mini_slot_bangthanhtichAppear) {
        mini_slot_bangthanhtich.closeLayer(mini_slot_bangthanhtich.pn_bangthanhtich);
        mini_slot_bangthanhtich.setVisible(false);
        mini_slot_bangthanhtich.pn_bangthanhtich.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_slot_bangthanhtich.pn_bangthanhtich, true);
        mini_slot_bangthanhtichAppear = false;
    }
};