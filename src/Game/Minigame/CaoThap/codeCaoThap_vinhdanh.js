var caothap_vinhdanh = null;
var caothap_vinhdanhX = 0;
var caothap_vinhdanhY = 0;
var caothap_vinhdanhAppear = false;

var codeCaoThap_vinhdanh = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseVinhdanhCT = null;
            this.pn_vinhdanh = null;
            this.sp_vin_vinhdanh = null;
            this.sp_xu_vinhdanh = null;
            this.btn_vin_vinhdanh = null;
            this.btn_xu_vinhdanh = null;
            this.vinxu_vinhdanh = null;
            this.lv_vinhdanh = null;
            this.arrVinhdanh = [];
            this.pn_title = null;
            this.btn_backall = null;
            this.btn_back = null;
            this.btn_next = null;
            this.btn_nextall = null;
            this.lb_currentpage_vd = null;
            this.currentpage = 1;
            this.totalPage = 1;
            this.iswait = false;

            this._super("codeCaoThap_vinhdanh");
            this.initWithBinaryFile("res/CaoThap_vinhdanh.json");
            return true;
        },
        customizeGUI: function() {
            this.pn_vinhdanh = this._layout.getChildByName("pn_vinhdanh");
            this.pn_vinhdanh.setScale(0);
            this.pn_vinhdanh.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseVinhdanhCT = this.customButton("btnCloseVinhdanhCT", codeCaoThap_vinhdanh.BTN_CLOSE_VINHDANH_CAOTHAP, this.pn_vinhdanh);

            this.sp_vin_vinhdanh = this.pn_vinhdanh.getChildByName("sp_vin_vinhdanh");
            this.sp_xu_vinhdanh = this.pn_vinhdanh.getChildByName("sp_xu_vinhdanh");
            this.btn_vin_vinhdanh = this.customButton("btn_vin_vinhdanh", codeCaoThap_vinhdanh.BTN_VIN_CT_VINHDANH, this.pn_vinhdanh);
            this.btn_xu_vinhdanh = this.customButton("btn_xu_vinhdanh", codeCaoThap_vinhdanh.BTN_XU_CT_VINHDANH, this.pn_vinhdanh);

            this.pn_title = this.pn_vinhdanh.getChildByName("pn_title");
            this.lb_currentpage_vd = this.pn_title.getChildByName("lb_currentpage_vd");
            this.btn_backall = this.customButton("btn_backall", codeCaoThap_vinhdanh.BTN_BACKALL_VINHDANH, this.pn_title);
            this.btn_back = this.customButton("btn_back", codeCaoThap_vinhdanh.BTN_BACK_VINHDANH, this.pn_title);
            this.btn_next = this.customButton("btn_next", codeCaoThap_vinhdanh.BTN_NEXT_VINHDANH, this.pn_title);
            this.btn_nextall = this.customButton("btn_nextall", codeCaoThap_vinhdanh.BTN_NEXTALL_VINHDANH, this.pn_title);

            this.lv_vinhdanh = this.getControl("lv_vinhdanh",this.pn_vinhdanh);
            this.lv_vinhdanh.setTouchEnabled(true);
            this.lv_vinhdanh.setClippingEnabled(true);
            this.lv_vinhdanh.setScrollBarEnabled(false);

            this.addMasterLayer(this.pn_vinhdanh);
        },
        onshow :function(){
            this.pn_vinhdanh.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeCaoThap_vinhdanh.BTN_CLOSE_VINHDANH_CAOTHAP:
                    close_caothap_vinhdanh();
                    break;
                case codeCaoThap_vinhdanh.BTN_VIN_CT_VINHDANH:
                    if(this.iswait == false) {
                        this.gotoGui(1);
                    }
                    break;
                case codeCaoThap_vinhdanh.BTN_XU_CT_VINHDANH:
                    if(this.iswait == false) {
                        this.gotoGui(0);
                    }
                    break;
                case codeCaoThap_vinhdanh.BTN_BACKALL_VINHDANH:
                    if(this.iswait == false) {
                        if (this.currentpage != 1) {
                            this.currentpage = 1;
                            this.parserDataVinhDanhCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_vinhdanh.BTN_BACK_VINHDANH:
                    if(this.iswait == false) {
                        if (this.currentpage > 1) {
                            this.currentpage = this.currentpage - 1;
                            this.parserDataVinhDanhCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_vinhdanh.BTN_NEXT_VINHDANH:
                    if(this.iswait == false) {
                        if (this.currentpage < this.totalPage) {
                            this.currentpage = this.currentpage + 1;
                            this.parserDataVinhDanhCaoThap();
                        }
                    }
                    break;
                case codeCaoThap_vinhdanh.BTN_NEXTALL_VINHDANH:
                    if(this.iswait == false) {
                        if (this.currentpage != this.totalPage) {
                            this.currentpage = this.totalPage;
                            this.parserDataVinhDanhCaoThap();
                        }
                    }
                    break;
            }
        },
        gotoGui : function (value){
            if(value == 1){
                caothap_vinhdanh.vinxu_vinhdanh = 1;
                caothap_vinhdanh.btn_vin_vinhdanh.setEnabled(false); caothap_vinhdanh.btn_xu_vinhdanh.setEnabled(true);
                caothap_vinhdanh.sp_vin_vinhdanh.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); caothap_vinhdanh.sp_xu_vinhdanh.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
            }else{
                caothap_vinhdanh.vinxu_vinhdanh = 0;
                caothap_vinhdanh.btn_vin_vinhdanh.setEnabled(true); caothap_vinhdanh.btn_xu_vinhdanh.setEnabled(false);
                caothap_vinhdanh.sp_vin_vinhdanh.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); caothap_vinhdanh.sp_xu_vinhdanh.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
            }
            caothap_vinhdanh.parserDataVinhDanhCaoThap();
        },

        addLoading : function(){
            if(this.pn_vinhdanh.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(353.11,204));
                loading.setName("loadingdata");
                this.pn_vinhdanh.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_vinhdanh.getChildByName("loadingdata").setVisible(true);
                this.pn_vinhdanh.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_vinhdanh.getChildByName("loadingdata").stopAllActions();
            this.pn_vinhdanh.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response) {
            caothap_vinhdanh.iswait = false;
            this.closeLoading();
        },

        parserDataVinhDanhCaoThap: function()
        {
            var url = urlVinhdanhCaoThap(caothap_vinhdanh.vinxu_vinhdanh, this.currentpage);
            //cc.log("url = " + url);
            sendRequest(url,null,false,caothap_vinhdanh.callBackVinhDanh,caothap_vinhdanh.callBackError);
            caothap_vinhdanh.iswait = true;
            this.addLoading();
        },

        callBackVinhDanh:function(response)
        {
            var jsonData = JSON.parse(response);
           // cc.log("jsonData = " + jsonData);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            caothap_vinhdanh.totalPage = jsonData["totalPages"];
            if(jsonData["totalPages"] > 1000)
                caothap_vinhdanh.totalPage = 1000;
            caothap_vinhdanh.lb_currentpage_vd.setString(caothap_vinhdanh.currentpage+"/"+caothap_vinhdanh.totalPage);
            if(success)
            {
                if(caothap_vinhdanh.arrVinhdanh!=null)
                    while(caothap_vinhdanh.arrVinhdanh.length > 0) {
                        caothap_vinhdanh.arrVinhdanh.pop();
                    }
                var VinhdanhCaoThap = jsonData["results"];
                if(VinhdanhCaoThap == ""){
                    caothap_vinhdanh.closeLoading();
                }

                for (var i = 0; i < VinhdanhCaoThap.length; i++) {
                    var counter = VinhdanhCaoThap[i];
                    caothap_vinhdanh.arrVinhdanh.push(counter);

                }
                caothap_vinhdanh.reload_BangThanhTich();
            }
            caothap_vinhdanh.iswait = false;
        },

        reload_BangThanhTich:function()
        {
            this.lv_vinhdanh.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrVinhdanh.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_vinhdanh.width;

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
                cellList.width =  this.lv_vinhdanh.width;

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(69.21,positionY));
                lbTime.setString(Minigame.formatDateTime(caothap_vinhdanh.arrVinhdanh[i].timestamp));
                lbTime.setColor(cc.color("#e8daad"));

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(142,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(210.42,positionY));
                lbaccount.setString(caothap_vinhdanh.arrVinhdanh[i].nickname);
                lbaccount.setColor(cc.color("#e8daad"));

                var lbmucdat =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(100,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmucdat.setPosition(cc.p(340.14,positionY));
                lbmucdat.setString(formatMoney(0,3,parseInt(caothap_vinhdanh.arrVinhdanh[i].betValue)));

                var lbthang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(130,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbthang.setPosition(cc.p(468.42,positionY));
                lbthang.setString(formatMoney(0,3,parseInt(caothap_vinhdanh.arrVinhdanh[i].prize)));
                if(caothap_vinhdanh.vinxu_vinhdanh == 1){
                    lbmucdat.setColor(cc.color("#E702FE")); lbthang.setColor(cc.color("#E702FE"));
                }else{
                    lbmucdat.setColor(cc.color("#c0c1c3")); lbthang.setColor(cc.color("#c0c1c3"));
                }

                var lbresult =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(118,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbresult.setPosition(cc.p(596.81,positionY));
                if(parseInt(caothap_vinhdanh.arrVinhdanh[i].result) ==  7){
                    this.textResult = "Nổ Hũ";
                }else{
                    this.textResult = "Thắng Lớn";
                }
                lbresult.setString(this.textResult);
                lbresult.setColor(cc.color("#e8daad"));

                if(caothap_vinhdanh.arrVinhdanh[i].nickname == lobby.userInfo.nickname){
                    lbTime.setColor(cc.color("#F3F354"));
                    lbaccount.setColor(cc.color("#F3F354"));
                    lbresult.setColor(cc.color("#F3F354"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(139.34,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(281.60,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(398.84,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(537.87,positionY + 3));

                cellList.addChild(lbTime);
                cellList.addChild(lbaccount);
                cellList.addChild(lbmucdat);
                cellList.addChild(lbthang);
                cellList.addChild(lbresult);

                cellList.addChild(aSprite1); cellList.addChild(aSprite2);
                cellList.addChild(aSprite3); cellList.addChild(aSprite4);

                cl1.addChild(cellList);

                this.lv_vinhdanh.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },        
    });

codeCaoThap_vinhdanh.BTN_CLOSE_VINHDANH_CAOTHAP = 1;
codeCaoThap_vinhdanh.BTN_VIN_CT_VINHDANH = 2;
codeCaoThap_vinhdanh.BTN_XU_CT_VINHDANH = 3;
codeCaoThap_vinhdanh.BTN_BACKALL_VINHDANH = 4;
codeCaoThap_vinhdanh.BTN_BACK_VINHDANH = 5;
codeCaoThap_vinhdanh.BTN_NEXTALL_VINHDANH = 6;
codeCaoThap_vinhdanh.BTN_NEXT_VINHDANH = 7;

open_caothap_vinhdanh = function (value) {
    if (caothap_vinhdanh == null) {
        caothap_vinhdanh = new codeCaoThap_vinhdanh();
        caothap_vinhdanhX = caothap_vinhdanh.getPosition().x;
        caothap_vinhdanhY = caothap_vinhdanh.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(caothap_vinhdanh, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        caothap_vinhdanh.setVisible(true);
        caothap_vinhdanh.pn_vinhdanh.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(caothap_vinhdanh.pn_vinhdanh, true);
        caothap_vinhdanh.setTag(Minigame.INDEX_MINI_SLOT +100);
        caothap_vinhdanh.reOpenLayer(caothap_vinhdanh.pn_vinhdanh);
    }
    caothap_vinhdanhAppear = true;
    caothap_vinhdanh.gotoGui(value);
};

close_caothap_vinhdanh = function () {
    if (caothap_vinhdanh == null) {
        return;
    }
    if(caothap_vinhdanhAppear) {
        caothap_vinhdanh.closeLayer(caothap_vinhdanh.pn_vinhdanh);
        caothap_vinhdanh.setVisible(false);
        caothap_vinhdanh.pn_vinhdanh.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(caothap_vinhdanh.pn_vinhdanh, true);
        caothap_vinhdanhAppear = false;
    }
};