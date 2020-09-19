var mini_lichsu = null;
var mini_lichsuX = 0;
var mini_lichsuY = 0;
var mini_lichsuAppear = false;

var codeMinipoker_lichsu = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.panelLichSuMiniPoker = null;
            this.sp_xu_lichsu = null; this.sp_vin_lichsu = null;
            this.btn_vin_lichsu =null; this.btn_xu_lichsu = null;
            this.lv_lichsu = null;

            this.vinxu_lichsu = 1;
            this.pagelsmp = 1;
            this.totalpage = 1;
            this.arrLichSu = [];
            this.cacheLichSu ={};
            this.txt_numberpage = null;
            this.btn_backall = null;
            this.btn_back = null;
            this.btn_nextall = null;
            this.btn_next = null;
            this.iswait = false;

            this._super("codeMinipoker_lichsu");
            this.initWithBinaryFile("res/MiniPoker_LichSu.json");
            return true;
        },
        customizeGUI: function() {
            this.panelLichSuMiniPoker = this._layout.getChildByName("panelLichSuMiniPoker");
            this.panelLichSuMiniPoker.setScale(0);
            this.panelLichSuMiniPoker.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));

            this.sp_vin_lichsu = this.panelLichSuMiniPoker.getChildByName("sp_vin_lichsu");
            this.sp_xu_lichsu = this.panelLichSuMiniPoker.getChildByName("sp_xu_lichsu");
            this.btnCloseLichSu = this.customButton("btnCloseLichSu",codeMinipoker_lichsu.BTN_CLOSELICHSU,this.panelLichSuMiniPoker);
            this.btn_vin_lichsu = this.customButton("btn_vin_lichsu",codeMinipoker_lichsu.BTN_VIN_LICHSU,this.panelLichSuMiniPoker);
            this.btn_xu_lichsu = this.customButton("btn_xu_lichsu",codeMinipoker_lichsu.BTN_XU_LICHSU,this.panelLichSuMiniPoker);
            this.btn_vin_lichsu.setEnabled(false);

            this.lv_lichsu = this.getControl("lv_lichsu",this.panelLichSuMiniPoker);
            this.lv_lichsu.setTouchEnabled(true);
            this.lv_lichsu.setClippingEnabled(true);
            this.lv_lichsu.setScrollBarEnabled(false);
            this.txt_numberpage = this.getControl("txt_numberpage",this.panelLichSuMiniPoker);
            this.btn_backall = this.customButton("btn_backall",codeMinipoker_lichsu.BTN_BACKALL,this.panelLichSuMiniPoker);
            this.btn_back = this.customButton("btn_back",codeMinipoker_lichsu.BTN_BACK,this.panelLichSuMiniPoker);
            this.btn_nextall = this.customButton("btn_nextall",codeMinipoker_lichsu.BTN_NEXTALL,this.panelLichSuMiniPoker);
            this.btn_next = this.customButton("btn_next",codeMinipoker_lichsu.BTN_NEXT,this.panelLichSuMiniPoker);

            this.addMasterLayer(this.panelLichSuMiniPoker);
        },
        onshow :function(){
            this.panelLichSuMiniPoker.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeMinipoker_lichsu.BTN_CLOSELICHSU:
                    close_minipoker_lichsu();
                    break;
                case codeMinipoker_lichsu.BTN_VIN_LICHSU:
                    if(this.iswait == false) {
                        if (mini_lichsu.cacheLichSu.responseLichSuVin != null) {
                            this.callBackLichSu(mini_lichsu.cacheLichSu.responseLichSuVin);
                        }
                        mini_lichsu.vinxu_lichsu = 1;
                        this.reload_Banglichsu();
                        mini_lichsu.btn_vin_lichsu.setEnabled(false);
                        mini_lichsu.btn_xu_lichsu.setEnabled(true);
                        mini_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
                        mini_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
                        this.pagelsmp = 1;
                        this.parserDataLichSuMiniPoker();
                    }
                    break;
                case codeMinipoker_lichsu.BTN_XU_LICHSU:
                    if(this.iswait == false) {
                        if (mini_lichsu.cacheLichSu.responseLichSuXu != null) {
                            this.callBackLichSu(mini_lichsu.cacheLichSu.responseLichSuXu);
                        }
                        mini_lichsu.vinxu_lichsu = 0;
                        this.reload_Banglichsu();
                        mini_lichsu.btn_vin_lichsu.setEnabled(true);
                        mini_lichsu.btn_xu_lichsu.setEnabled(false);
                        mini_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
                        mini_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
                        this.pagelsmp = 1;
                        this.parserDataLichSuMiniPoker();
                    }
                    break;
                case codeMinipoker_lichsu.BTN_BACKALL:
                    if(this.iswait == false) {
                        if (this.pagelsmp != 1) {
                            this.pagelsmp = 1;
                            this.parserDataLichSuMiniPoker();
                        }
                    }
                    break;
                case codeMinipoker_lichsu.BTN_BACK:
                    if(this.iswait == false) {
                        if (this.pagelsmp > 1) {
                            this.pagelsmp = this.pagelsmp - 1;
                            this.parserDataLichSuMiniPoker();
                        }
                    }
                    break;
                case codeMinipoker_lichsu.BTN_NEXTALL:
                    if(this.iswait == false) {
                        if (this.pagelsmp != this.totalpage) {
                            this.pagelsmp = this.totalpage;
                            this.parserDataLichSuMiniPoker();
                        }
                    }
                    break;
                case codeMinipoker_lichsu.BTN_NEXT:
                    if(this.iswait == false) {
                        if (this.pagelsmp < this.totalpage) {
                            this.pagelsmp = this.pagelsmp + 1;
                            this.parserDataLichSuMiniPoker();
                        }
                    }
                    break;
            }
        },

        addLoading : function(){
            if(this.panelLichSuMiniPoker.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(352.44,209.76));
                loading.setName("loadingdata");
                this.panelLichSuMiniPoker.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.panelLichSuMiniPoker.getChildByName("loadingdata").setVisible(true);
                this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.panelLichSuMiniPoker.getChildByName("loadingdata").stopAllActions();
            this.panelLichSuMiniPoker.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            mini_lichsu.iswait = false;
            this.closeLoading();
        },

        parserDataLichSuMiniPoker: function()
        {
            var url = urlLichSuMiniPoker(mini_lichsu.pagelsmp,lobby.userInfo.nickname,mini_lichsu.vinxu_lichsu);
            sendRequest(url,null,false,mini_lichsu.callBackLichSu,mini_lichsu.callBackError);
            if(mini_lichsu.vinxu_lichsu == 1){
                mini_lichsu.btn_vin_lichsu.setEnabled(false); mini_lichsu.btn_xu_lichsu.setEnabled(true);
                mini_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); mini_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
            }else{
                mini_lichsu.btn_vin_lichsu.setEnabled(true); mini_lichsu.btn_xu_lichsu.setEnabled(false);
                mini_lichsu.sp_vin_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); mini_lichsu.sp_xu_lichsu.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
            }
            mini_lichsu.iswait == true;
            this.addLoading();
        },
        callBackLichSu:function(response)
        {
            if(mini_lichsu.vinxu_lichsu == 1)
            {
                mini_lichsu.cacheLichSu.responseLichSuVin = response;
            }else
            {
                mini_lichsu.cacheLichSu.responseLichSuXu = response;
            }

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(jsonData["totalPages"] > 1000)
                mini_lichsu.totalpage = 1000;
            else
                mini_lichsu.totalpage = jsonData["totalPages"];

            if(success)
            {
                if(mini_lichsu.arrLichSu!=null)
                    while(mini_lichsu.arrLichSu.length > 0) {
                        mini_lichsu.arrLichSu.pop();
                    }
                var VinhdanhMiniPoker = jsonData["results"];
                if(VinhdanhMiniPoker == ""){
                    mini_lichsu.closeLoading();
                }

                for (var i = 0; i < VinhdanhMiniPoker.length; i++) {
                    var counter = VinhdanhMiniPoker[i];
                    mini_lichsu.arrLichSu.push(counter);

                }
                mini_lichsu.reload_Banglichsu();
                mini_lichsu.txt_numberpage.setString(mini_lichsu.pagelsmp + "/" + mini_lichsu.totalpage);
            }
            mini_lichsu.iswait = false;
        },

        reload_Banglichsu:function()
        {
            this.lv_lichsu.removeAllItems();
            this.lv_lichsu.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.arrLichSu.length; i++)
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

                var lbtime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(179,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtime.setPosition(cc.p(89.31,positionY));
                lbtime.setString(Minigame.formatDateTime(mini_lichsu.arrLichSu[i].timestamp));
                lbtime.setColor(cc.color("#e8daad"));

                var lbmucdat =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(96,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmucdat.setPosition(cc.p(233.87,positionY));
                lbmucdat.setString(formatMoney(0,3,parseInt(mini_lichsu.arrLichSu[i].betValue)));

                var lbthang =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(96,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbthang.setPosition(cc.p(599.60,positionY));
                lbthang.setString(formatMoney(0,3,parseInt(mini_lichsu.arrLichSu[i].prize)));
                if(mini_lichsu.vinxu_lichsu == 1){
                    lbmucdat.setColor(cc.color("#E702FE")); lbthang.setColor(cc.color("#E702FE"));
                }else{
                    lbmucdat.setColor(cc.color("#c0c1c3")); lbthang.setColor(cc.color("#c0c1c3"));
                }

                var lb_card =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(261,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lb_card.setPosition(cc.p(421.70,positionY));
                lb_card.setString(mini_lichsu.arrLichSu[i].cards);
                lb_card.setColor(cc.color("#e8daad"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(178.73,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(288.47,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(549.28,positionY + 3));

                cellList.addChild(lbtime);
                cellList.addChild(lbmucdat);
                cellList.addChild(lbthang);
                cellList.addChild(lb_card);
                cellList.addChild(aSprite1);
                cellList.addChild(aSprite2);
                cellList.addChild(aSprite3);
                cl1.addChild(cellList);
                this.lv_lichsu.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
    });

codeMinipoker_lichsu.BTN_CLOSELICHSU = 1;
codeMinipoker_lichsu.BTN_VIN_LICHSU = 2;
codeMinipoker_lichsu.BTN_XU_LICHSU = 3;
codeMinipoker_lichsu.BTN_BACKALL = 5;
codeMinipoker_lichsu.BTN_BACK = 6;
codeMinipoker_lichsu.BTN_NEXTALL = 7;
codeMinipoker_lichsu.BTN_NEXT = 8;

open_minipoker_lichsu = function (value) {
    if (mini_lichsu == null) {
        mini_lichsu = new codeMinipoker_lichsu();
        mini_lichsuX = mini_lichsu.getPosition().x;
        mini_lichsuY = mini_lichsu.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_lichsu, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_POKER+100);
    }else
    {
        mini_lichsu.setVisible(true);
        mini_lichsu.panelLichSuMiniPoker.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_lichsu.panelLichSuMiniPoker, true);
        mini_lichsu.setTag(Minigame.INDEX_MINI_POKER+100);
        mini_lichsu.reOpenLayer(mini_lichsu.panelLichSuMiniPoker);
    }
    mini_lichsu.vinxu_lichsu = value;
    mini_lichsuAppear = true;
    mini_lichsu.parserDataLichSuMiniPoker();
};
close_minipoker_lichsu = function () {
    if (mini_lichsu == null) {
        return;
    }
    if(mini_lichsuAppear) {
        mini_lichsu.closeLayer(mini_lichsu.panelLichSuMiniPoker);
        mini_lichsu.setVisible(false);
        mini_lichsu.panelLichSuMiniPoker.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_lichsu.panelLichSuMiniPoker, true);
        mini_lichsuAppear = false;
        mini_lichsu.pagelsmp = 1
    }
};