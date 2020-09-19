/**
 * Created by PVC on 9/12/2016.
 */
var bcTopUser = null;
var bcTopUserX = 0;
var bcTopUserY = 0;
var bcTopUserAppear = false;

var BCTopUserLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("bcTopUser");
            cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/BCTopUser.json");
            this.myMoney = 0;
            this.cacheTopUser ={};
            this.pTopUser = null;
            this.lv_top_user = null;
            this.btn_close_top_user = null;
            this.btn_xu_top_user = null;
            this.btn_vin_top_user = null;
            this.moneyTypeTopUser = MONEY_VIN;
            this.arrTopUser = null;

        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/ImageChung.plist");
            this.pTopUser = this._layout.getChildByName("pTopUser");

            this.pTabTopUser = this.getControl("pTabTopUser",this.pTopUser);
            this.lv_top_user = this.getControl("lv_top_user",this.pTopUser);
            this.lv_top_user.setTouchEnabled(false);
            this.lv_top_user.setBounceEnabled(true);
            this.lv_top_user.setClippingEnabled(true);
            this.lv_top_user.setScrollBarEnabled(false);
            this.btn_close_top_user = this.customButton("btn_close_top_user",BCTopUserLayer.BTN_CLOSE_TOP_USER,this.pTopUser);
            this.btn_xu_top_user = this.customButton("btn_xu_top_user",BCTopUserLayer.BTN_XU_TOP_USER,this.pTopUser);
            this.btn_vin_top_user = this.customButton("btn_vin_top_user",BCTopUserLayer.BTN_VIN_TOP_USER,this.pTopUser);


            this.arrTopUser = [{
                username:"banhcuon",
                money:100
            }];

            
            this.addMasterLayer(this.pTopUser);

        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case BCTopUserLayer.BTN_CLOSE_TOP_USER:
                    closeBCTopUser();
                    break;
                case BCTopUserLayer.BTN_XU_TOP_USER:
                    if(bcTopUser.cacheTopUser.responseTopXu!=null)
                    {
                        this.callBackTopUser(bcTopUser.cacheTopUser.responseTopXu);
                    }
                    //if (this.moneyTypeTopUser == MONEY_XU) {
                    //
                    //} else {
                    this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                    this.moneyTypeTopUser = MONEY_XU;
                    this.parserDataTopUser();
                    //}

                    break;
                case BCTopUserLayer.BTN_VIN_TOP_USER:
                    if(bcTopUser.cacheTopUser.responseTopVin!=null)
                    {
                        this.callBackTopUser(bcTopUser.cacheTopUser.responseTopVin);
                    }
                    this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                    this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.moneyTypeTopUser = MONEY_VIN;

                    this.parserDataTopUser();
                    // }
                    break;

            }
        },
        callBackError: function(response)
        {
            bcTopUser.hideLoading();
        }
        ,

        parserDataTopUser: function()
        {
            this.showLoading();
            var url = urlBCTopUser(bcTopUser.moneyTypeTopUser);
            sendRequest(url,null,false,bcTopUser.callBackTopUser,bcTopUser.callBackError);
        },
        callBackTopUser:function(response)
        {
            if(bcTopUser.moneyTypeTopUser == MONEY_VIN)
            {
                bcTopUser.cacheTopUser.responseTopVin = response;
            }else
            {
                bcTopUser.cacheTopUser.responseTopXu = response;
            }
            cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(bcTopUser.arrTopUser!=null)
                    while(bcTopUser.arrTopUser.length > 0) {
                        bcTopUser.arrTopUser.pop();
                    }
                var topBC = jsonData["topBC"];

                for (var i = 0; i < topBC.length; i++) {
                    var counter = topBC[i];
                    bcTopUser.arrTopUser.push(counter);

                }
                bcTopUser.reloadTopUser();
            }
            bcTopUser.hideLoading();

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
                var lbHang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(174,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbHang.setAnchorPoint(0.5,0.5);
                lbHang.setPosition(cc.p(87,positionY));
                lbHang.setString(i+1);
                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(265,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(310,positionY));
                lbTaiKhoan.setString(bcTopUser.arrTopUser[i].username);
                // lbTime.setTextColor(cc.color.WHITE);

                var lbTienThang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(200,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbTienThang.setPosition(cc.p(549,positionY));
                lbTienThang.setString(formatMoney(0,3,bcTopUser.arrTopUser[i].money));

                if(i == 0)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(87,positionY));
                    cellList.addChild(vong1);
                    lbHang.setColor(colorCell1);
                    lbTaiKhoan.setColor(colorCell1);
                    lbHang.setString("");
                }else
                {
                    lbHang.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                }

                if(i == 1 || i==2)
                {
                    var vong1 = new cc.Sprite();

                    if(i==1)
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    }else
                    {
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    }
                    vong1.setPosition(cc.p(87,positionY));
                    cellList.addChild(vong1);
                    lbHang.setString("");
                }

                if(bcTopUser.moneyTypeTopUser == MONEY_VIN)
                {
                    lbTienThang.setColor(colorMoneyVin);
                }else
                {
                    lbTienThang.setColor(colorMoneyXu);
                }


                cellList.addChild(lbHang);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbTienThang);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(174,positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(446,positionY));
                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);

                this.lv_top_user.pushBackCustomItem(cellList);

            }
        }
    }
);

openBCTopUser = function () {
    if (bcTopUser === null) {

        cc.log("----> openBCTopUser");
        bcTopUser = new BCTopUserLayer();
        bcTopUserX = bcTopUser.getPosition().x;
        bcTopUserY = bcTopUser.getPosition().y;
        // taiXiu.onCreate();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bcTopUser, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
        bcTopUser.parserDataTopUser();
    }else
    {
        bcTopUser.setVisible(true);
        cc.eventManager.resumeTarget(bcTopUser.pTopUser, true);
        bcTopUser.setTag(Minigame.INDEX_TAI_XIU+100);

        if(bcTopUser.cacheTopUser.responseTopVin!=null)
        {
            bcTopUser.callBackTopUser(bcTopUser.cacheTopUser.responseTopVin);
        }
        bcTopUser.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
        bcTopUser.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
        bcTopUser.moneyTypeTopUser = MONEY_VIN;
        //bcTopUser.pTabTopUser.setVisible(true);
        //bcTopUser.pTanRutLoc.setVisible(false);

        bcTopUser.parserDataTopUser();
        bcTopUser.reOpenLayer(bcTopUser.pTopUser);
    }

    bcTopUserAppear = true;
};
closeBCTopUser = function () {
    if (bcTopUser === null) {
        return;
    }
    if(bcTopUserAppear) {
        bcTopUser.closeLayer(bcTopUser.pTopUser);
        bcTopUser.setVisible(false);
        bcTopUserAppear = false;
        cc.eventManager.pauseTarget(bcTopUser.pTopUser, true);
    }
};


BCTopUserLayer.BTN_CLOSE_TOP_USER = 43;
BCTopUserLayer.BTN_XU_TOP_USER = 44;
BCTopUserLayer.BTN_VIN_TOP_USER = 45;
