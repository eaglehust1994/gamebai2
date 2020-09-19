var mini_thanhtich = null;
var mini_thanhtichX = 0;
var mini_thanhtichY = 0;
var mini_thanhtichAppear = false;

var codeMinipoker_bangthanhtich = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.Pn_TopXepHang = null;
            this.sp_xu_thanhtich = null; this.sp_vin_thanhtich = null;
            this.btn_vin_thanhtich =null; this.btn_xu_thanhtich = null;
            this.lv_bangthanhtich = null;

            this.vinxu_thanhtich = 1;
            this.arrVinhdanh = [];
            this.cacheVinhdanh ={};
            this.iswait = false;

            this.textResult = null;
            this.page_vinhdanh_poker = 1;
            this.btn_backall = null;
            this.btn_back = null;
            this.btn_next = null;
            this.btn_nextall = null;
            this.txt_numberpage = null;
            this.maxpage_thanhtich = 1;

            this._super("codeMinipoker_bangthanhtich");
            this.initWithBinaryFile("res/MiniPoker_BangThanhTich.json");
            return true;
        },
        customizeGUI: function() {
            this.Pn_TopXepHang = this._layout.getChildByName("Pn_TopXepHang");
            this.Pn_TopXepHang.setScale(0);
            this.Pn_TopXepHang.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));

            this.sp_vin_thanhtich = this.Pn_TopXepHang.getChildByName("sp_vin_thanhtich");
            this.sp_xu_thanhtich = this.Pn_TopXepHang.getChildByName("sp_xu_thanhtich");
            this.btnCloseXepHang = this.customButton("btnCloseXepHang",codeMinipoker_bangthanhtich.BTN_CLOSEXEPHANG,this.Pn_TopXepHang);
            this.btn_vin_thanhtich = this.customButton("btn_vin_thanhtich",codeMinipoker_bangthanhtich.BTN_VIN_THANHTICH,this.Pn_TopXepHang);
            this.btn_xu_thanhtich = this.customButton("btn_xu_thanhtich",codeMinipoker_bangthanhtich.BTN_XU_THANHTICH,this.Pn_TopXepHang);
            this.btn_vin_thanhtich.setEnabled(false);

            this.lv_bangthanhtich = this.getControl("lv_bangthanhtich",this.Pn_TopXepHang);
            this.lv_bangthanhtich.setTouchEnabled(true);
            this.lv_bangthanhtich.setClippingEnabled(true);
            this.lv_bangthanhtich.setScrollBarEnabled(false);

            this.btn_backall = this.customButton("btn_backall",codeMinipoker_bangthanhtich.BTN_BACKALL_THANHTICH,this.Pn_TopXepHang);
            this.btn_back = this.customButton("btn_back",codeMinipoker_bangthanhtich.BTN_BACK_THANHTICH,this.Pn_TopXepHang);
            this.btn_next = this.customButton("btn_next",codeMinipoker_bangthanhtich.BTN_NEXT_THANHTICH,this.Pn_TopXepHang);
            this.btn_nextall = this.customButton("btn_nextall",codeMinipoker_bangthanhtich.BTN_NEXTALL_THANHTICH,this.Pn_TopXepHang);
            this.txt_numberpage = this.getControl("txt_numberpage",this.Pn_TopXepHang);

            this.addMasterLayer(this.Pn_TopXepHang);
        },
        onshow :function(){
            this.Pn_TopXepHang.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeMinipoker_bangthanhtich.BTN_BACKALL_THANHTICH:
                    this.page_vinhdanh_poker = 1;
                    this.parserDataVinhDanhMiniPoker();
                    break;
                case codeMinipoker_bangthanhtich.BTN_BACK_THANHTICH:
                    if(this.page_vinhdanh_poker > 1) {
                        this.page_vinhdanh_poker = this.page_vinhdanh_poker - 1;
                        this.parserDataVinhDanhMiniPoker();
                    }
                    break;
                case codeMinipoker_bangthanhtich.BTN_NEXT_THANHTICH:
                    if(this.page_vinhdanh_poker < this.maxpage_thanhtich) {
                        this.page_vinhdanh_poker = this.page_vinhdanh_poker + 1;
                        this.parserDataVinhDanhMiniPoker();
                    }
                    break;
                case codeMinipoker_bangthanhtich.BTN_NEXTALL_THANHTICH:
                    this.page_vinhdanh_poker = this.maxpage_thanhtich;
                    this.parserDataVinhDanhMiniPoker();
                    break;
                case codeMinipoker_bangthanhtich.BTN_CLOSEXEPHANG:
                    close_minipoker_bangthanhtich();
                    break;
                case codeMinipoker_bangthanhtich.BTN_VIN_THANHTICH:
                    if(this.iswait == false) {
                        if (mini_thanhtich.cacheVinhdanh.responseVinhDanhVin != null) {
                            this.callBackVinhDanh(mini_thanhtich.cacheVinhdanh.responseVinhDanhVin);
                        }
                        mini_thanhtich.vinxu_thanhtich = 1;
                        this.reload_BangThanhTich();
                        mini_thanhtich.btn_vin_thanhtich.setEnabled(false);
                        mini_thanhtich.btn_xu_thanhtich.setEnabled(true);
                        mini_thanhtich.sp_vin_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
                        mini_thanhtich.sp_xu_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
                        this.parserDataVinhDanhMiniPoker();
                    }
                    break;
                case codeMinipoker_bangthanhtich.BTN_XU_THANHTICH:
                    //cc.log("iswait = " + this.iswait);
                    if(this.iswait == false) {
                        if (mini_thanhtich.cacheVinhdanh.responseVinhDanhXu != null) {
                            this.callBackVinhDanh(mini_thanhtich.cacheVinhdanh.responseVinhDanhXu);
                        }
                        mini_thanhtich.vinxu_thanhtich = 0;
                        this.reload_BangThanhTich();
                        mini_thanhtich.btn_vin_thanhtich.setEnabled(true);
                        mini_thanhtich.btn_xu_thanhtich.setEnabled(false);
                        mini_thanhtich.sp_vin_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
                        mini_thanhtich.sp_xu_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
                        this.parserDataVinhDanhMiniPoker();
                    }
                    break;
            }
        },

        addLoading : function(){
            if(this.Pn_TopXepHang.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(371.44,186.22));
                loading.setName("loadingdata");
                this.Pn_TopXepHang.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.Pn_TopXepHang.getChildByName("loadingdata").setVisible(true);
                this.Pn_TopXepHang.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.Pn_TopXepHang.getChildByName("loadingdata").stopAllActions();
            this.Pn_TopXepHang.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            mini_thanhtich.iswait = false;
            this.closeLoading();
        },

        parserDataVinhDanhMiniPoker: function()
        {
            var url = urlVinhdanhMiniPoker(mini_thanhtich.vinxu_thanhtich, this.page_vinhdanh_poker);
            sendRequest(url,null,false,mini_thanhtich.callBackVinhDanh,mini_thanhtich.callBackError);
            if(mini_thanhtich.vinxu_thanhtich == 1){
                mini_thanhtich.btn_vin_thanhtich.setEnabled(false); mini_thanhtich.btn_xu_thanhtich.setEnabled(true);
                mini_thanhtich.sp_vin_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); mini_thanhtich.sp_xu_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
            }else{
                mini_thanhtich.btn_vin_thanhtich.setEnabled(true); mini_thanhtich.btn_xu_thanhtich.setEnabled(false);
                mini_thanhtich.sp_vin_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); mini_thanhtich.sp_xu_thanhtich.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
            }
            mini_thanhtich.iswait = true;
            this.addLoading();
        },
        callBackVinhDanh:function(response)
        {
            if(mini_thanhtich.vinxu_thanhtich == 1)
            {
                mini_thanhtich.cacheVinhdanh.responseVinhDanhVin = response;
            }else
            {
                mini_thanhtich.cacheVinhdanh.responseVinhDanhXu = response;
            }

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(mini_thanhtich.arrVinhdanh!=null)
                    while(mini_thanhtich.arrVinhdanh.length > 0) {
                        mini_thanhtich.arrVinhdanh.pop();
                    }
                var VinhdanhMiniPoker = jsonData["results"];
                if(VinhdanhMiniPoker == ""){
                    mini_thanhtich.closeLoading();
                }

                for (var i = 0; i < VinhdanhMiniPoker.length; i++) {
                    var counter = VinhdanhMiniPoker[i];
                    mini_thanhtich.arrVinhdanh.push(counter);

                }
                mini_thanhtich.reload_BangThanhTich();
            }
            mini_thanhtich.maxpage_thanhtich = jsonData["totalPages"];
            mini_thanhtich.txt_numberpage.setString(mini_thanhtich.page_vinhdanh_poker+"/"+mini_thanhtich.maxpage_thanhtich);
            mini_thanhtich.iswait = false;
        },

        reload_BangThanhTich:function()
        {
            this.lv_bangthanhtich.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrVinhdanh.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_bangthanhtich.width;

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
                cellList.width =  this.lv_bangthanhtich.width;

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(145,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(72.90,positionY));
                lbTime.setString(Minigame.formatDateTime(mini_thanhtich.arrVinhdanh[i].timestamp));
                lbTime.setColor(cc.color("#e8daad"));

                var lbaccount =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(153,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaccount.setPosition(cc.p(221.31,positionY));
                lbaccount.setString(mini_thanhtich.arrVinhdanh[i].username);
                lbaccount.setColor(cc.color("#e8daad"));

                var lbmucdat =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(80,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmucdat.setPosition(cc.p(344.87,positionY));
                lbmucdat.setString(formatMoney(0,3,parseInt(mini_thanhtich.arrVinhdanh[i].betValue)));

                var lbthang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbthang.setPosition(cc.p(471.85,positionY));
                lbthang.setString(formatMoney(0,3,parseInt(mini_thanhtich.arrVinhdanh[i].prize)));
                if(mini_thanhtich.vinxu_thanhtich == 1){
                    lbmucdat.setColor(cc.color("#E702FE")); lbthang.setColor(cc.color("#E702FE"));
                }else{
                    lbmucdat.setColor(cc.color("#c0c1c3")); lbthang.setColor(cc.color("#c0c1c3"));
                }

                var lbresult =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(162,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbresult.setPosition(cc.p(634.10,positionY));
                if(parseInt(mini_thanhtich.arrVinhdanh[i].result) ==  1){
                    this.textResult = "Nổ hũ";
                }else{
                    this.textResult = "Thùng phá sảnh";
                }
                lbresult.setString(this.textResult);
                lbresult.setColor(cc.color("#e8daad"));

                if(mini_thanhtich.arrVinhdanh[i].username == lobby.userInfo.nickname){
                    lbTime.setColor(cc.color("#F3F354"));
                    lbaccount.setColor(cc.color("#F3F354"));
                    lbresult.setColor(cc.color("#F3F354"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(145.24,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(298.73,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(390.48,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(553.28,positionY + 3));

                cellList.addChild(lbTime);
                cellList.addChild(lbaccount);
                cellList.addChild(lbmucdat);
                cellList.addChild(lbthang);
                cellList.addChild(lbresult);
                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cellList.addChild(aSprite4);
                cl1.addChild(cellList);

                this.lv_bangthanhtich.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
    });

codeMinipoker_bangthanhtich.BTN_CLOSEXEPHANG = 1;
codeMinipoker_bangthanhtich.BTN_VIN_THANHTICH = 2;
codeMinipoker_bangthanhtich.BTN_XU_THANHTICH = 3;
codeMinipoker_bangthanhtich.BTN_BACKALL_THANHTICH = 4;
codeMinipoker_bangthanhtich.BTN_BACK_THANHTICH = 5;
codeMinipoker_bangthanhtich.BTN_NEXTALL_THANHTICH = 6;
codeMinipoker_bangthanhtich.BTN_NEXT_THANHTICH = 7;

open_minipoker_bangthanhtich = function (value) {
    if (mini_thanhtich == null) {
        mini_thanhtich = new codeMinipoker_bangthanhtich();
        mini_thanhtichX = mini_thanhtich.getPosition().x;
        mini_thanhtichY = mini_thanhtich.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_thanhtich, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_POKER+100);
    }else
    {
        mini_thanhtich.setVisible(true);
        mini_thanhtich.Pn_TopXepHang.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_thanhtich.Pn_TopXepHang, true);
        mini_thanhtich.setTag(Minigame.INDEX_MINI_POKER+100);
        mini_thanhtich.reOpenLayer(mini_thanhtich.Pn_TopXepHang);
    }
    mini_thanhtichAppear = true;
    mini_thanhtich.vinxu_thanhtich = value;
    mini_thanhtich.parserDataVinhDanhMiniPoker();
};
close_minipoker_bangthanhtich = function () {
    if (mini_thanhtich == null) {
        return;
    }
    if(mini_thanhtichAppear) {
        mini_thanhtich.closeLayer(mini_thanhtich.Pn_TopXepHang);
        mini_thanhtich.setVisible(false);
        mini_thanhtich.Pn_TopXepHang.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_thanhtich.Pn_TopXepHang, true);
        mini_thanhtichAppear = false;
    }
};