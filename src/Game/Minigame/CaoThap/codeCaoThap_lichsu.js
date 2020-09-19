var caothap_lichsu = null;
var caothap_lichsuX = 0;
var caothap_lichsuY = 0;
var caothap_lichsuAppear = false;

var codeCaoThap_lichsu = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseLichsuCT = null;
            this.pn_lichsu = null;
            this.sp_vin_lichsu = null;
            this.sp_xu_lichsu = null;
            this.btn_vin_lichsu = null;
            this.btn_xu_lichsu = null;
            this.vinxu_lichsu = null;
            this.lv_lichsu = null;
            this.arrVinhdanh = [];
            this.pn_title_lichsu = null;
            this.btn_backall = null;
            this.btn_back = null;
            this.btn_next = null;
            this.btn_nextall = null;
            this.lb_currentpage = null;
            this.currentpage = 1;
            this.totalPage = 1;
            this.iswait = false;

            this._super("codeCaoThap_lichsu");
            this.initWithBinaryFile("res/CaoThap_lichsu.json");
            return true;
        },
        customizeGUI: function() {
            this.pn_lichsu = this._layout.getChildByName("pn_lichsu");
            this.pn_lichsu.setScale(0);
            this.pn_lichsu.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichsuCT = this.customButton("btnCloseLichsuCT", codeCaoThap_lichsu.BTN_CLOSE_LICHSU_CAOTHAP, this.pn_lichsu);

            this.sp_vin_lichsu = this.pn_lichsu.getChildByName("sp_vin_lichsu");
            this.sp_xu_lichsu = this.pn_lichsu.getChildByName("sp_xu_lichsu");
            this.btn_vin_lichsu = this.customButton("btn_vin_lichsu", codeCaoThap_lichsu.BTN_VIN_CT_LICHSU, this.pn_lichsu);
            this.btn_xu_lichsu = this.customButton("btn_xu_lichsu", codeCaoThap_lichsu.BTN_XU_CT_LICHSU, this.pn_lichsu);

            this.pn_title_lichsu = this.pn_lichsu.getChildByName("pn_title_lichsu");
            this.lb_currentpage = this.pn_title_lichsu.getChildByName("lb_currentpage");
            this.btn_backall = this.customButton("btn_backall", codeCaoThap_lichsu.BTN_BACKALL_LICHSU, this.pn_title_lichsu);
            this.btn_back = this.customButton("btn_back", codeCaoThap_lichsu.BTN_BACK_LICHSU, this.pn_title_lichsu);
            this.btn_next = this.customButton("btn_next", codeCaoThap_lichsu.BTN_NEXT_LICHSU, this.pn_title_lichsu);
            this.btn_nextall = this.customButton("btn_nextall", codeCaoThap_lichsu.BTN_NEXTALL_LICHSU, this.pn_title_lichsu);

            this.lv_lichsu = this.getControl("lv_lichsu",this.pn_lichsu);
            this.lv_lichsu.setTouchEnabled(true);
            this.lv_lichsu.setClippingEnabled(true);
            this.lv_lichsu.setScrollBarEnabled(false);

            this.addMasterLayer(this.pn_lichsu);
        },
        onshow :function(){
            this.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeCaoThap_lichsu.BTN_CLOSE_LICHSU_CAOTHAP:
                    close_caothap_lichsu();
                    break;
                case codeCaoThap_lichsu.BTN_VIN_CT_LICHSU:
                    if(this.iswait == false) {
                        this.gotoGui(1);
                    }
                    break;
                case codeCaoThap_lichsu.BTN_XU_CT_LICHSU:
                    if(this.iswait == false) {
                        this.gotoGui(0);
                    }
                    break;
                case codeCaoThap_lichsu.BTN_BACKALL_LICHSU:
                    if(this.iswait == false) {
                        if (this.currentpage != 1) {
                            this.currentpage = 1;
                            this.parserDataLichSuCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_lichsu.BTN_BACK_LICHSU:
                    if(this.iswait == false) {
                        if (this.currentpage > 1) {
                            this.currentpage = this.currentpage - 1;
                            this.parserDataLichSuCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_lichsu.BTN_NEXT_LICHSU:
                    if(this.iswait == false) {
                        if (this.currentpage < this.totalPage) {
                            this.currentpage = this.currentpage + 1;
                            this.parserDataLichSuCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_lichsu.BTN_NEXTALL_LICHSU:
                    if(this.iswait == false) {
                        if (this.currentpage != this.totalPage) {
                            this.currentpage = this.totalPage;
                            this.parserDataLichSuCaoThap();
                        }
                    }
                    break;
            }
        },
        gotoGui : function (value){
            if(value == 1){
                caothap_lichsu.vinxu_lichsu = 1;
                caothap_lichsu.btn_vin_lichsu.setEnabled(false); caothap_lichsu.btn_xu_lichsu.setEnabled(true);
                caothap_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); caothap_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
            }else{
                caothap_lichsu.vinxu_lichsu = 0;
                caothap_lichsu.btn_vin_lichsu.setEnabled(true); caothap_lichsu.btn_xu_lichsu.setEnabled(false);
                caothap_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); caothap_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
            }
            caothap_lichsu.currentpage = 1;
            caothap_lichsu.parserDataLichSuCaoThap();
        },

        addLoading : function(){
            if(this.pn_lichsu.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(407,204));
                loading.setName("loadingdata");
                this.pn_lichsu.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_lichsu.getChildByName("loadingdata").setVisible(true);
                this.pn_lichsu.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_lichsu.getChildByName("loadingdata").stopAllActions();
            this.pn_lichsu.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            caothap_lichsu.iswait = false;
            this.closeLoading();
        },

        parserDataLichSuCaoThap: function()
        {
            var url = urlLichSuCaoThap(this.currentpage,lobby.userInfo.nickname, this.vinxu_lichsu);
            sendRequest(url,null,false,caothap_lichsu.callBackLichSu,caothap_lichsu.callBackError);
            caothap_lichsu.iswait = true;
            this.addLoading();
        },
        callBackLichSu:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            caothap_lichsu.totalPage = jsonData["totalPages"];
            caothap_lichsu.lb_currentpage.setString(caothap_lichsu.currentpage+"/"+caothap_lichsu.totalPage);
            if(success)
            {
                if(caothap_lichsu.arrVinhdanh!=null)
                    while(caothap_lichsu.arrVinhdanh.length > 0) {
                        caothap_lichsu.arrVinhdanh.pop();
                    }
                var LichSuCaoThap = jsonData["results"];
                if(LichSuCaoThap == ""){
                    caothap_lichsu.closeLoading();
                }

                for (var i = 0; i < LichSuCaoThap.length; i++) {
                    var counter = LichSuCaoThap[i];
                    caothap_lichsu.arrVinhdanh.push(counter);

                }
                caothap_lichsu.reload_BangThanhTich();
            }
            caothap_lichsu.iswait = false;
        },

        reload_BangThanhTich:function()
        {
            this.lv_lichsu.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrVinhdanh.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_lichsu.width;

                var cellList = null;
                if(i % 2 == 0)
                {
                    cellList = new cc.LayerColor(cc.color(25,23,88,160));
                }else
                {
                    cellList = new cc.LayerColor(cc.color("#39489E"));
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;

                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(152,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(76.21,positionY));
                lbPhien.setString(caothap_lichsu.arrVinhdanh[i].transId);
                lbPhien.setColor(cc.color("#e8daad"));

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(142,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(224.92,positionY));
                lbTime.setString(Minigame.formatDateTime(caothap_lichsu.arrVinhdanh[i].timestamp));
                lbTime.setColor(cc.color("#e8daad"));

                var lbmucdat =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(108,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmucdat.setPosition(cc.p(356.14,positionY));
                lbmucdat.setString(formatMoney(0,3,parseInt(caothap_lichsu.arrVinhdanh[i].betValue)));

                var lbthang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(126,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbthang.setPosition(cc.p(712.98,positionY));
                lbthang.setString(formatMoney(0,3,parseInt(caothap_lichsu.arrVinhdanh[i].prize)));
                if(caothap_lichsu.vinxu_lichsu == 1){
                    lbmucdat.setColor(cc.color("#E702FE")); lbthang.setColor(cc.color("#E702FE"));
                }else{
                    lbmucdat.setColor(cc.color("#c0c1c3")); lbthang.setColor(cc.color("#c0c1c3"));
                }

                var lbCuadat =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(91,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbCuadat.setPosition(cc.p(600.81,positionY));
                if(caothap_lichsu.arrVinhdanh[i].step != 1) {
                    if (caothap_lichsu.arrVinhdanh[i].potBet == 1)
                        lbCuadat.setString("Trên");
                    else
                        lbCuadat.setString("Dưới");
                }
                lbCuadat.setColor(cc.color("#e8daad"));

                var lbKetqua =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(76,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbKetqua.setPosition(cc.p(517.81,positionY));
                lbKetqua.setString(caothap_lichsu.arrVinhdanh[i].cards);
                lbKetqua.setColor(cc.color("#e8daad"));

                var lbStep =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(65,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbStep.setPosition(cc.p(447.42,positionY));
                lbStep.setString(caothap_lichsu.arrVinhdanh[i].step);
                lbStep.setColor(cc.color("#e8daad"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(152.34,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(297.60,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(414.84,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(479.87,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(555.57,positionY + 3));

                var aSprite6 = new cc.Sprite();
                aSprite6.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite6.setScaleY(1); aSprite6.setScaleX(2);
                aSprite6.setPosition(cc.p(646.07,positionY + 3));

                cellList.addChild(lbTime);
                cellList.addChild(lbmucdat);
                cellList.addChild(lbPhien);
                cellList.addChild(lbthang);
                cellList.addChild(lbCuadat);
                cellList.addChild(lbKetqua);
                cellList.addChild(lbStep);

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3);
                cellList.addChild(aSprite4); cellList.addChild(aSprite5); cellList.addChild(aSprite6);

                cl1.addChild(cellList);

                this.lv_lichsu.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
    });

codeCaoThap_lichsu.BTN_CLOSE_LICHSU_CAOTHAP = 1;
codeCaoThap_lichsu.BTN_VIN_CT_LICHSU = 2;
codeCaoThap_lichsu.BTN_XU_CT_LICHSU = 3;
codeCaoThap_lichsu.BTN_BACKALL_LICHSU = 4;
codeCaoThap_lichsu.BTN_BACK_LICHSU = 5;
codeCaoThap_lichsu.BTN_NEXTALL_LICHSU = 6;
codeCaoThap_lichsu.BTN_NEXT_LICHSU = 7;

open_caothap_lichsu = function (value) {
    if (caothap_lichsu == null) {
        caothap_lichsu = new codeCaoThap_lichsu();
        caothap_lichsuX = caothap_lichsu.getPosition().x;
        caothap_lichsuY = caothap_lichsu.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(caothap_lichsu, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        caothap_lichsu.setVisible(true);
        caothap_lichsu.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(caothap_lichsu.pn_lichsu, true);
        caothap_lichsu.setTag(Minigame.INDEX_MINI_SLOT +100);
        caothap_lichsu.reOpenLayer(caothap_lichsu.pn_lichsu);
    }
    caothap_lichsuAppear = true;
    //caothap_lichsu.parserDataLichSuVQMM();
    caothap_lichsu.gotoGui(value);
};
close_caothap_lichsu = function () {
    if (caothap_lichsu == null) {
        return;
    }
    if(caothap_lichsuAppear) {
        caothap_lichsu.closeLayer(caothap_lichsu.pn_lichsu);
        caothap_lichsu.setVisible(false);
        caothap_lichsu.pn_lichsu.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(caothap_lichsu.pn_lichsu, true);
        caothap_lichsuAppear = false;
    }
};