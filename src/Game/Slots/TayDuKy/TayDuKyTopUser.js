var vuongQuocVinTopUser = null;
var vuongQuocVinTopUserX = 0;
var vuongQuocVinTopUserY = 0;
var vuongQuocVinTopUserAppear = false;

var VuongQuocVinTopUserLayer = BaseLayerSlots.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrTopUser = [];
            this.currentPageTopUser = 1;
            this.totalPage = 1;
            this.btnCloseLichSuSlot = null;

            this.pTopUser = null;

            this.lv_lich_su_nu_hu = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("VuongQuocVinTopUserLayer");
            return true;
        },

        customizeGUI: function() {

            if(cc.sys.isNative)
            {
                this.positionCenter = cc.p(640,360);
                this.positionCenterBG = cc.p(640,360);
            }else
            {
                this.positionCenterBG = cc.p(640,270);
                this.positionCenter = cc.p(640,317);

            }

            this.addLayout(this,"pTopUser",this.positionCenter,"res/VuongQuocVin/back_ground/bg_bang.png",cc.size(1280,720),true);
            this.pTopUser.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pTopUser.setBackGroundColor(cc.color.BLACK);
            this.pTopUser.setBackGroundColorOpacity(200);

            this.addSprite(this.pTopUser,"spNen",cc.p(640,369),"res/VuongQuocVin/lsth/bg_lsth.png");

            this.addButton("btn_close",VuongQuocVinTopUserLayer.BTN_CLOSE,this.pTopUser,cc.p(1087,618),false,"res/VuongQuocVin/btn_close.png","res/VuongQuocVin/btn_close.png");
            this.addButton("btn_back_all_lsgd",VuongQuocVinTopUserLayer.BTN_BACK_ALL_LSGD,this.pTopUser,cc.p(402,109),false,"res/VuongQuocVin/lsgd/back_all.png","res/VuongQuocVin/lsgd/back_all.png");
            this.addButton("btn_back_lsgd",VuongQuocVinTopUserLayer.BTN_BACK_LSGD,this.pTopUser,cc.p(505,109),false,"res/VuongQuocVin/lsgd/back.png","res/VuongQuocVin/lsgd/back.png");
            this.addSprite(this.pTopUser,"spMid",cc.p(640,109),"res/VuongQuocVin/lsgd/mid.png");
            this.addText(this.pTopUser,"lb_current_page_lsgd",cc.p(640,109),"1/100",fontRobotoBlack.fontName,30);
            this.lb_current_page_lsgd.setColor(cc.color(70,44,23));
            this.addButton("btn_neck_lsgd",VuongQuocVinTopUserLayer.BTN_NECK_LSGD,this.pTopUser,cc.p(775,109),false,"res/VuongQuocVin/lsgd/next.png","res/VuongQuocVin/lsgd/next.png");
            this.addButton("btn_neckall_lsgd",VuongQuocVinTopUserLayer.BTN_NECKALL_LSGD,this.pTopUser,cc.p(877,109),false,"res/VuongQuocVin/lsgd/next_all.png","res/VuongQuocVin/lsgd/next_all.png");


            this.lv_lich_su_nu_hu = new ccui.ListView();
            this.lv_lich_su_nu_hu.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_lich_su_nu_hu.setTouchEnabled(true);
            this.lv_lich_su_nu_hu.setBounceEnabled(true);
            this.lv_lich_su_nu_hu.setClippingEnabled(true);
            this.lv_lich_su_nu_hu.setContentSize(cc.size(920, 363));
            this.lv_lich_su_nu_hu.setAnchorPoint(cc.p(0.5,0.5));
            this.lv_lich_su_nu_hu.setPosition(cc.p(640,327));
            this.pTopUser.addChild(this.lv_lich_su_nu_hu);
        },
        onButtonRelease: function(button,id) {
            vuongQuocVin.audioVuongQuocVin.soundEffectKhoBau(vuongQuocVin.audioVuongQuocVin.button);
            switch (id) {
                case VuongQuocVinTopUserLayer.BTN_CLOSE:
                    closeVuongQuocVinTopUser(true);
                    break;

                case VuongQuocVinTopUserLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser = 1;
                        this.parserDataTopUser();
                    }

                    break;
                case VuongQuocVinTopUserLayer.BTN_BACK_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser--;
                        this.parserDataTopUser();
                    }
                    break;
                case VuongQuocVinTopUserLayer.BTN_NECK_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser++;
                        this.parserDataTopUser();
                    }
                    break;
                case VuongQuocVinTopUserLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser = this.totalPage;
                        this.parserDataTopUser();
                    }
                    break;

            }
        },
        callBackError: function(response)
        {
            vuongQuocVinTopUser.hideLoading();
        },
        parserDataTopUser: function()
        {
            var url = urlGetTopVuongQuocVin(this.currentPageTopUser);
            sendRequest(url,null,false,this.callBackTopUser,this.callBackError);
           vuongQuocVinTopUser.showLoading();
        },
        callBackTopUser:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(vuongQuocVinTopUser.arrTopUser!=null)
                    while(vuongQuocVinTopUser.arrTopUser.length > 0) {
                        vuongQuocVinTopUser.arrTopUser.pop();
                    }
                vuongQuocVinTopUser.totalPage = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    vuongQuocVinTopUser.arrTopUser.push(counter);


                }

                vuongQuocVinTopUser.reloadTopUser();
            }
            //slotKhoBau.hideLoading();

        },
        reloadTopUser:function()
        {
            this.lv_lich_su_nu_hu.removeAllItems();
            var cellHeight = 36;
            var positionY = 19;
            var  fonts = RobotoRegular;
            var fontSize = 20;

            for(var i = 0; i<this.arrTopUser.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_nu_hu.width;
                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(235,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(117.5,positionY));
                lbTime.setString(vuongQuocVinTopUser.arrTopUser[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(98,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(283,positionY));
                lbRoom.setString(formatMoney(0,3,vuongQuocVinTopUser.arrTopUser[i].bv));
                lbRoom.setColor(colorMoneyVin);

                var lbNoHu =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(114,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbNoHu.setPosition(cc.p(390,positionY));
                if(vuongQuocVinTopUser.arrTopUser[i].rs == 4)
                {
                    lbNoHu.setString("Nổ hũ X2");
                }else{
                    lbNoHu.setString("Nổ hũ");
                }
                // lbTime.setTextColor(cc.color.WHITE);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(235,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(565,positionY));
                lbTaiKhoan.setString(vuongQuocVinTopUser.arrTopUser[i].nn);
                // lbTime.setTextColor(cc.color.WHITE);



                //lbRomm.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(154,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbResult.setPosition(cc.p(760,positionY));
                lbResult.setString(formatMoney(0,3,vuongQuocVinTopUser.arrTopUser[i].pz));
                lbResult.setColor(colorMoneyVin);

                var btnChiTiet = new ccui.Button();
                btnChiTiet.setContentSize(cc.size(80,cellHeight));
                btnChiTiet.setPosition(cc.p(878,positionY));
                btnChiTiet.setTitleText("Xem");
                btnChiTiet.setTitleFontSize(fontSize);
                btnChiTiet.setTitleColor(cc.color(110,220,72));

                btnChiTiet.setTitleFontName(fonts.fontName);
                btnChiTiet.setTag(i);
                btnChiTiet.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            openVuongQuocVinChiTietTopUser();
                            vuongQuocVinChiTietTopUser.loadData(this.arrTopUser[sender.getTag()]);
                            //mini_slot_lichsu.showDetailLSGD(mini_slot_lichsu.arrLichSuGiaoDich[sender.getTag()]);
                            break;
                    }

                },this);

                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbNoHu);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbResult);
                cellList.addChild(btnChiTiet);

                this.lv_lich_su_nu_hu.pushBackCustomItem(cellList);




            }
            this.lb_current_page_lsgd.setString(this.currentPageTopUser + "/" + this.totalPage);
            vuongQuocVinTopUser.hideLoading();
        },
        showLoading : function(){
            if(this.pTopUser.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = this.pTopUser.getContentSize().width/2;
                var y = this.pTopUser.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                this.pTopUser.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pTopUser.getChildByName("loadingdatamaster").setVisible(true);
                //this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },
        hideLoading : function (){
            if(this.pTopUser.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                this.pTopUser.getChildByName("loadingdatamaster").setVisible(false);
            }

        }

    });

VuongQuocVinTopUserLayer.BTN_CLOSE = 1;
VuongQuocVinTopUserLayer.BTN_VIN = 2;
VuongQuocVinTopUserLayer.BTN_XU = 3;
VuongQuocVinTopUserLayer.BTN_BACK = 4;
VuongQuocVinTopUserLayer.BTN_BACK_ALL_LSGD = 39;
VuongQuocVinTopUserLayer.BTN_BACK_LSGD = 40;
VuongQuocVinTopUserLayer.BTN_NECK_LSGD = 41;
VuongQuocVinTopUserLayer.BTN_NECKALL_LSGD = 42;

openVuongQuocVinTopUser = function () {
    if (vuongQuocVinTopUser == null) {
        vuongQuocVinTopUser = new VuongQuocVinTopUserLayer();
        vuongQuocVin.addChild(vuongQuocVinTopUser);
    }else
    {
        vuongQuocVinTopUser.setVisible(true);
    }
    vuongQuocVinTopUserAppear = true;
    vuongQuocVinTopUser.parserDataTopUser();
};
closeVuongQuocVinTopUser = function (isRemove) {
    if (vuongQuocVinTopUser == null) {
        return;
    }
    if(isRemove)
    {
        vuongQuocVinTopUser.removeFromParent();
        vuongQuocVinTopUser = null;
        vuongQuocVinTopUserAppear = false;
    }else
    if(vuongQuocVinTopUserAppear) {
        vuongQuocVinTopUser.setVisible(false);
        vuongQuocVinTopUserAppear = false;
    }
};