var txTopUser = null;
var txTopUserX = 0;
var txTopUserY = 0;
var txTopUserAppear = false;

var TXTopUserLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXTopUser");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/TXTopUser.json");
            this.myMoney = 0;
            //this.cacheTopUser ={};
            this.pTopUser = null;
            this.lv_top_user = null;
            this.btn_close_top_user = null;
            this.btn_xu_top_user = null;
            this.btn_vin_top_user = null;
            this.moneyTypeTopUser = MONEY_VIN;
            this.arrTopUser = null;
            this.arrVinhDanh = null;
            this.arrBXH = null;
            this.pTanRutLoc = null;
            this.pTabTopUser = null;
            this.lb_your_vin = null;
            this.btn_top_rut_loc = null;
            this.btn_top_tan_loc = null;
            this.typeTanRutLoc = 3;

        },
        customizeGUI: function () {
            this.pTopUser = this._layout.getChildByName("pTopUser");

            this.pTanRutLoc = this.getControl("pTanRutLoc",this.pTopUser);
            this.pTabTopUser = this.getControl("pTabTopUser",this.pTopUser);
            this.lv_top_user = this.getControl("lv_top_user",this.pTopUser);
            this.lv_top_user.setTouchEnabled(false);
            this.lv_top_user.setBounceEnabled(true);
            this.lv_top_user.setClippingEnabled(true);
            this.lv_top_user.setScrollBarEnabled(false);
            this.btn_close_top_user = this.customButton("btn_close_top_user",TXTopUserLayer.BTN_CLOSE_TOP_USER,this.pTopUser);
            this.btn_xu_top_user = this.customButton("btn_xu_top_user",TXTopUserLayer.BTN_XU_TOP_USER,this.pTopUser);
            this.btn_vin_top_user = this.customButton("btn_vin_top_user",TXTopUserLayer.BTN_VIN_TOP_USER,this.pTopUser);

            this.btn_top_rut_loc = this.customButton("btn_top_rut_loc",TXTopUserLayer.BTN_TOP_RUT_LOC,this.pTopUser);
            this.btn_top_tan_loc = this.customButton("btn_top_tan_loc",TXTopUserLayer.BTN_TOP_TAN_LOC,this.pTopUser);
            this.lb_your_vin = this.getControl("lb_your_vin",this.pTanRutLoc);

            this.pTanRutLoc.setVisible(false);
            this.arrTopUser = [{
                username:"banhcuon",
                money:100
            }];
            this.arrVinhDanh = [];
            this.arrBXH = [];
            this.addMasterLayer(this.pTopUser);

        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case TXTopUserLayer.BTN_CLOSE_TOP_USER:
                    closeTXTopUser();
                    break;
                case TXTopUserLayer.BTN_XU_TOP_USER:
                    //if(txTopUser.cacheTopUser.responseTopXu!=null)
                    //{
                    //    this.callBackTopUser(txTopUser.cacheTopUser.responseTopXu);
                    //}
                    //if (this.moneyTypeTopUser == MONEY_XU) {
                    //
                    //} else {
                        this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                        this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid.png");
                        this.btn_top_rut_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_tan_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");

                        this.moneyTypeTopUser = MONEY_XU;
                        this.pTabTopUser.setVisible(true);
                        this.pTanRutLoc.setVisible(false);
                        this.parserDataTopUser();
                    //}

                    break;
                case TXTopUserLayer.BTN_VIN_TOP_USER:
                    //if(txTopUser.cacheTopUser.responseTopVin!=null)
                    //{
                    //    this.callBackTopUser(txTopUser.cacheTopUser.responseTopVin);
                    //}
                        this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
                        this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_rut_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_tan_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                        this.moneyTypeTopUser = MONEY_VIN;
                    this.pTabTopUser.setVisible(true);
                    this.pTanRutLoc.setVisible(false);

                        this.parserDataTopUser();
                   // }
                    break;
                case TXTopUserLayer.BTN_TOP_RUT_LOC:
                    //if(txTopUser.cacheTopUser.responseTopRutLoc!=null)
                    //{
                    //    this.callBackTopTanLoc(txTopUser.cacheTopUser.responseTopRutLoc);
                    //}
                        this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                        this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_rut_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid.png");
                        this.btn_top_tan_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                        this.typeTanRutLoc = TXTopUserLayer.RUT_LOC;
                    this.pTabTopUser.setVisible(false);
                    this.pTanRutLoc.setVisible(true);

                        this.parserDataTopTanLoc();
                    //}
                    break;
                case TXTopUserLayer.BTN_TOP_TAN_LOC:
                    //if(txTopUser.cacheTopUser.responseTopTanLoc!=null)
                    //{
                    //    this.callBackTopTanLoc(txTopUser.cacheTopUser.responseTopTanLoc);
                    //}
                        this.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
                        this.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_rut_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
                        this.btn_top_tan_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
                        this.typeTanRutLoc = TXTopUserLayer.TAN_LOC;

                    this.pTabTopUser.setVisible(false);
                    this.pTanRutLoc.setVisible(true);

                        this.parserDataTopTanLoc();
                    //}
                    break;
            }
        },
        callBackError: function(response)
        {

        }
        ,

        parserDataTopUser: function()
        {
            this.showLoading();
            var url = urlTopUserTX(txTopUser.moneyTypeTopUser);
            sendRequest(url,null,false,txTopUser.callBackTopUser,txTopUser.callBackError);
        },
        callBackTopUser:function(response)
        {
            //if(txTopUser.moneyTypeTopUser == MONEY_VIN)
            //{
            //    txTopUser.cacheTopUser.responseTopVin = response;
            //}else
            //{
            //    txTopUser.cacheTopUser.responseTopXu = response;
            //}
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(txTopUser.arrTopUser!=null)
                    while(txTopUser.arrTopUser.length > 0) {
                        txTopUser.arrTopUser.pop();
                    }
                var topTX = jsonData["topTX"];

                for (var i = 0; i < topTX.length; i++) {
                    var counter = topTX[i];
                    txTopUser.arrTopUser.push(counter);

                }
                txTopUser.reloadTopUser();
            }

            txTopUser.hideLoading();
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
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.lv_top_user.width;
///res/Font/Roboto-Medium.tff

                var lbHang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(174,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbHang.setAnchorPoint(0.5,0.5);
                lbHang.setPosition(cc.p(87,positionY));
                lbHang.setString(i+1);


                //lbPhien.setTextColor(cc.color.WHITE);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(265,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(310,positionY));
                lbTaiKhoan.setString(txTopUser.arrTopUser[i].username);
                // lbTime.setTextColor(cc.color.WHITE);

                var lbTienThang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(200,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbTienThang.setPosition(cc.p(549,positionY));
                lbTienThang.setString(formatMoney(0,3,txTopUser.arrTopUser[i].money));

                if(i == 0)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(87,positionY));
                    cellList.addChild(vong1);
                    lbHang.setColor(colorCell1);
                    lbHang.setString("");
                    lbTaiKhoan.setColor(colorCell1);
                }else
                {
                    lbHang.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                }

                if(i == 1 )
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    lbHang.setString("");
                    vong1.setPosition(cc.p(87,positionY));
                    cellList.addChild(vong1);
                }
                if( i==2)
                {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    lbHang.setString("");
                    vong1.setPosition(cc.p(87,positionY));
                    cellList.addChild(vong1);
                }

                if(txTopUser.moneyTypeTopUser == MONEY_VIN)
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
        },
        parserDataTopTanLoc: function()
        {
            this.showLoading();
            var url = urlTopTanLoc(lobby.userInfo.nickname,this.typeTanRutLoc);
            sendRequest(url,null,false,txTopUser.callBackTopTanLoc,txTopUser.callBackError);
        },
        callBackTopTanLoc:function(response)
        {

            //if(txTopUser.typeTanRutLoc == TXTopUserLayer.TAN_LOC)
            //{
            //    txTopUser.cacheTopUser.responseTopTanLoc = response;
            //}else
            //{
            //    txTopUser.cacheTopUser.responseTopRutLoc = response;
            //}
            //cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(txTopUser.arrBXH!=null)
                    while(txTopUser.arrBXH.length > 0) {
                        txTopUser.arrBXH.pop();
                    }
                if(txTopUser.arrVinhDanh!=null)
                    while(txTopUser.arrVinhDanh.length > 0) {
                        txTopUser.arrVinhDanh.pop();
                    }

                var xepHang = jsonData["xepHang"];

                for (var i = 0; i < xepHang.length; i++) {
                    var counter = xepHang[i];
                    txTopUser.arrBXH.push(counter);
                }

                var vinhDanh = jsonData["vinhDanh"];

                for (var i = 0; i < vinhDanh.length; i++) {
                    var counter = vinhDanh[i];
                    txTopUser.arrVinhDanh.push(counter);
                }
                txTopUser.myMoney = jsonData["myMoney"];
                txTopUser.reloadTopTanLoc();
            }
            txTopUser.hideLoading();
        },
        reloadTopTanLoc:function()
        {
            this.lv_top_user.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 14;
            txTopUser.lb_your_vin.setString(formatMoney(0,3,txTopUser.myMoney));
            var  fonts = RobotoRegular;


            var countCell = 0;
            if(txTopUser.arrBXH.length>=txTopUser.arrVinhDanh.length)
            {
                countCell = txTopUser.arrBXH.length;
            }else
            {
                countCell = txTopUser.arrVinhDanh.length;
            }
            for(var i = 0; i< countCell; i++)
            {

                var cellList = new ccui.Layout();
                cellList.height = cellHeight;

                cellList.width =  this.lv_top_user.width;
                if(i>=txTopUser.arrVinhDanh.length)
                {

                }else
                {
                    var cellVinhDanh = new ccui.Layout();
                    cellVinhDanh.height = cellHeight;
                    cellVinhDanh.width =  375;
                    cellVinhDanh.setPosition(cc.p(0,0));
                    cellVinhDanh.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                    cellVinhDanh.setBackGroundColor(colorBgCell1);
                    cellVinhDanh.setClippingEnabled(true);
                    if(i % 2 == 1)
                    {
                        cellList.height = cellHeight+2;
                        cellVinhDanh.height=cellHeight+2;
                        cellVinhDanh.setBackGroundColorOpacity(204);
                    }else
                    {
                        cellVinhDanh.setBackGroundColorOpacity(100);
                    }

                    var lbSTT = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(36,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbSTT.setPosition(cc.p(18,positionY));
                    lbSTT.setString((i+1).toString());

                    var lbTen = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(135,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTen.setPosition(cc.p(106,positionY));
                    lbTen.setString(txTopUser.arrVinhDanh[i].username);

                    var lbSoVin = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(95,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbSoVin.setPosition(cc.p(226,positionY));
                    lbSoVin.setString(formatMoney(0,3,txTopUser.arrVinhDanh[i].money));


                    var lbTime = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(100,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTime.setPosition(cc.p(325,positionY));
                    var strTime = txTopUser.arrVinhDanh[i].time.substr(5,11);
                    lbTime.setString(strTime);

                    lbSoVin.setColor(colorMoneyVin);

                    if(i == 0)
                    {
                        var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                        vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                        vong1.setPosition(cc.p(18,positionY));
                        cellVinhDanh.addChild(vong1);

                        lbSTT.setColor(colorCell1);
                        lbSTT.setString("");
                        lbTen.setColor(colorCell1);
                        lbTime.setColor(colorCell1);
                    }else
                    {

                        lbSTT.setColor(colorCellOther);
                        lbTen.setColor(colorCellOther);
                        lbTime.setColor(colorCellOther);
                    }

                    if(i == 1 || i==2)
                    {

                        var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"

                        lbSTT.setString("");
                        if(i==2)
                        {
                            vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                        }else
                        {
                            vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                        }
                        vong1.setPosition(cc.p(18,positionY));
                        cellVinhDanh.addChild(vong1);
                    }

                    cellVinhDanh.addChild(lbSTT);
                    cellVinhDanh.addChild(lbTen);
                    cellVinhDanh.addChild(lbSoVin);
                    cellVinhDanh.addChild(lbTime);

                    var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot.setScaleY(0.80);
                    spNganCot.setPosition(cc.p(36,positionY));


                    var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot1.setScaleY(0.80);
                    spNganCot1.setPosition(cc.p(176,positionY));

                    var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot2.setScaleY(0.80);
                    spNganCot2.setPosition(cc.p(275,positionY));

                    cellVinhDanh.addChild(spNganCot);
                    cellVinhDanh.addChild(spNganCot1);
                    cellVinhDanh.addChild(spNganCot2);

                    cellList.addChild(cellVinhDanh);



                    if(i<3)
                    {
                        lbSTT.setColor(cc.color(255,255,92));
                    }

                }

                if(i>=txTopUser.arrBXH.length)
                {

                }else
                {
                    var cellBXH = new ccui.Layout();
                    cellBXH.height = cellHeight;
                    cellBXH.width =  276;
                    cellBXH.setPosition(cc.p(378,0));
                    cellBXH.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                    cellBXH.setClippingEnabled(true);
                    cellBXH.setBackGroundColor(colorBgCell1);
                    if(i % 2 == 1)
                    {
                        cellList.height = cellHeight+2;
                        cellBXH.height=cellHeight+2;
                        cellBXH.setBackGroundColorOpacity(204);
                    }else
                    {
                        cellBXH.setBackGroundColorOpacity(100);
                    }

                    var lbSTT = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(36,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbSTT.setPosition(cc.p(18,positionY));
                    lbSTT.setString((i+1).toString());

                    var lbTen = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(135,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbTen.setPosition(cc.p(106,positionY));
                    lbTen.setString(txTopUser.arrBXH[i].username);

                    var lbSoVin = new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(95,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                    lbSoVin.setPosition(cc.p(226,positionY));
                    lbSoVin.setString(formatMoney(0,3,txTopUser.arrBXH[i].money));


                    lbSoVin.setColor(colorMoneyVin);

                    if(i == 0)
                    {
                        var vong1 = cc.Sprite.create();//"Minigame/ImageChung/money_xu.png"
                        vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                        vong1.setPosition(cc.p(18,positionY));
                        cellBXH.addChild(vong1);
                        lbSTT.setString("");
                        lbSTT.setColor(colorCell1);
                        lbTen.setColor(colorCell1);
                        lbTime.setColor(colorCell1);
                    }else
                    {

                        lbSTT.setColor(colorCellOther);
                        lbTen.setColor(colorCellOther);
                        lbTime.setColor(colorCellOther);
                    }

                    if(i == 1 || i==2)
                    {
                        var vong1 = cc.Sprite.create();//"Minigame/ImageChung/money_xu.png"
                        lbSTT.setString("");
                        if(i==2)
                        {
                            vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                        }else
                        {
                            vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                        }
                        vong1.setPosition(cc.p(18,positionY));
                        cellBXH.addChild(vong1);
                    }

                    cellBXH.addChild(lbSTT);
                    cellBXH.addChild(lbTen);
                    cellBXH.addChild(lbSoVin);
                    var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot.setScaleY(0.8);
                    spNganCot.setPosition(cc.p(36,positionY));


                    var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                    spNganCot1.setScaleY(0.8);
                    spNganCot1.setPosition(cc.p(176,positionY));
                    cellBXH.addChild(spNganCot);
                    cellBXH.addChild(spNganCot1);


                    cellList.addChild(cellBXH);

                }
                txTopUser.lv_top_user.pushBackCustomItem(cellList);

            }
        }
    }
);

openTXTopUser = function () {
    if (txTopUser === null) {


                //cc.log("----> Create mini game layer first time");
                txTopUser = new TXTopUserLayer();
                txTopUserX = txTopUser.getPosition().x;
                txTopUserY = txTopUser.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txTopUser, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
                txTopUser.parserDataTopUser();


    }else
    {
        txTopUser.setVisible(true);
        cc.eventManager.resumeTarget(txTopUser.pTopUser, true);
        txTopUser.setTag(Minigame.INDEX_TAI_XIU+100);

        //if(txTopUser.cacheTopUser.responseTopVin!=null)
        //{
        //    txTopUser.callBackTopUser(txTopUser.cacheTopUser.responseTopVin);
        //}
        txTopUser.btn_vin_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu.png");
        txTopUser.btn_xu_top_user.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
        txTopUser.btn_top_rut_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_mid_s.png");
        txTopUser.btn_top_tan_loc.loadTextureNormal("res/Minigame/ImageChung/btn_thanhdu_s.png");
        txTopUser.moneyTypeTopUser = MONEY_VIN;
        txTopUser.pTabTopUser.setVisible(true);
        txTopUser.pTanRutLoc.setVisible(false);

        txTopUser.parserDataTopUser();
        txTopUser.reOpenLayer(txTopUser.pTopUser);
    }

    txTopUserAppear = true;

};
closeTXTopUser = function () {
    if (txTopUser === null) {
        return;
    }
    if(txTopUserAppear) {
        txTopUser.closeLayer(txTopUser.pTopUser);
        txTopUser.setVisible(false);
        txTopUserAppear = false;
        cc.eventManager.pauseTarget(txTopUser.pTopUser, true);
    }
};


TXTopUserLayer.BTN_CLOSE_TOP_USER = 43;
TXTopUserLayer.BTN_XU_TOP_USER = 44;
TXTopUserLayer.BTN_VIN_TOP_USER = 45;
TXTopUserLayer.BTN_TOP_RUT_LOC = 46;
TXTopUserLayer.BTN_TOP_TAN_LOC = 47;
TXTopUserLayer.RUT_LOC = 1;
TXTopUserLayer.TAN_LOC = 0;
