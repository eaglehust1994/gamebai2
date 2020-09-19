var khoBauLSGD = null;
var khoBauLSGDX = 0;
var khoBauLSGDY = 0;
var khoBauLSGDAppear = false;

var KhoBauLSGDLayer = BaseLayer.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrLichSuGiaoDich = [];
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.btnCloseLichSuSlot = null;

            this.pn_lichsu = null;

            this.lv_lichsu = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("KhoBauLSGDLayer");
            this.initWithBinaryFile("res/KBLichSuGiaoDich.json");
            return true;
        },

        customizeGUI: function() {
            this.pn_lichsu = this._layout.getChildByName("pn_lichsu");
            this.pn_lichsu.setScale(0);
            this.pn_lichsu.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichSuSlot = this.customButton("btnCloseLichSuSlot", KhoBauLSGDLayer.BTN_CLOSELICHSUMINISLOT, this.pn_lichsu);

            //this.pMaster = this.getControl("pMaster",this.pn_lichsu);
            this.lv_lichsu = this.getControl("lv_lichsu",this.pn_lichsu);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",KhoBauLSGDLayer.BTN_BACK_ALL_LSGD,this.pn_lichsu);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",KhoBauLSGDLayer.BTN_BACK_LSGD,this.pn_lichsu);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pn_lichsu);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",KhoBauLSGDLayer.BTN_NECK_LSGD,this.pn_lichsu);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",KhoBauLSGDLayer.BTN_NECKALL_LSGD,this.pn_lichsu);


        },
        onshow :function(){
            this.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
            switch (id) {
                case KhoBauLSGDLayer.BTN_CLOSELICHSUMINISLOT:
                    closeKhoBauLSGD(false);
                    break;

                case KhoBauLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLsgd();
                    }

                    break;
                case KhoBauLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLsgd();
                    }
                    break;
                case KhoBauLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLsgd();
                    }
                    break;
                case KhoBauLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLsgd();
                    }
                    break;

            }
        },
        parserDataLsgd: function()
        {
            var url = urlGetLsgdKhoBau(lobby.userInfo.nickname,this.currentPageLSGD);
            cc.log(url);
            sendRequest(url,null,false,this.callBackLsgd,this.callBackError);
            khoBauLSGD.showLoading();
        },
        callBackError: function(response)
        {
           khoBauLSGD.hideLoading();
        },
        callBackLsgd:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(khoBauLSGD.arrLichSuGiaoDich!=null)
                    while(khoBauLSGD.arrLichSuGiaoDich.length > 0) {
                        khoBauLSGD.arrLichSuGiaoDich.pop();
                    }
                khoBauLSGD.totalPageLSGD = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    khoBauLSGD.arrLichSuGiaoDich.push(counter);

                }
                khoBauLSGD.reloadLsgd();
            }
            //slotKhoBau.hideLoading();

        },
        reloadLsgd:function()
        {
            this.lv_lichsu.removeAllItems();
            var cellHeight = 55;
            var positionY = 27;
            var  fonts = RobotoRegular;
            var fontSize = 26;

            for(var i = 0; i<khoBauLSGD.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();


                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(79,positionY));
                lbPhien.setString(khoBauLSGD.arrLichSuGiaoDich[i].rf);

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(368,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(341,positionY));
                lbTime.setString(khoBauLSGD.arrLichSuGiaoDich[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(136,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbRoom.setPosition(cc.p(596,positionY));
                lbRoom.setString(formatMoney(0,3,khoBauLSGD.arrLichSuGiaoDich[i].bv));
                lbRoom.setColor(colorMoneyVin);
                var  tongDat = khoBauLSGD.arrLichSuGiaoDich[i].lb.split(",").length;
                var lbLineBet =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(126,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineBet.setPosition(cc.p(731,positionY));
                lbLineBet.setString(tongDat);
                lbLineBet.setColor(colorMoneyVin);

                var  win = 0;
                if(khoBauLSGD.arrLichSuGiaoDich[i].lw != "")
                {
                    win = khoBauLSGD.arrLichSuGiaoDich[i].lw.split(",").length;
                }
                var lbLineWin =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(134,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineWin.setPosition(cc.p(861,positionY));
                lbLineWin.setString(win);
                lbLineWin.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(264,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(1061,positionY));
                lbResult.setString(formatMoney(0,3,khoBauLSGD.arrLichSuGiaoDich[i].pz));

                lbResult.setColor(colorMoneyVin);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbLineBet);
                cellList.addChild(lbLineWin);
                cellList.addChild(lbResult);



                this.lv_lichsu.pushBackCustomItem(cellList);
                this.lb_current_page_lsgd.setString(this.currentPageLSGD + "/" + this.totalPageLSGD);
                khoBauLSGD.hideLoading();
            }
        },
        showLoading : function(){
            if(this.pn_lichsu.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = this.pn_lichsu.getContentSize().width/2;
                var y = this.pn_lichsu.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                this.pn_lichsu.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_lichsu.getChildByName("loadingdatamaster").setVisible(true);
                //this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },
        hideLoading : function (){
            if(this.pn_lichsu.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                this.pn_lichsu.getChildByName("loadingdatamaster").setVisible(false);
            }

        }

    });

KhoBauLSGDLayer.BTN_CLOSELICHSUMINISLOT = 1;
KhoBauLSGDLayer.BTN_VIN = 2;
KhoBauLSGDLayer.BTN_XU = 3;
KhoBauLSGDLayer.BTN_BACK = 4;
KhoBauLSGDLayer.BTN_BACK_ALL_LSGD = 39;
KhoBauLSGDLayer.BTN_BACK_LSGD = 40;
KhoBauLSGDLayer.BTN_NECK_LSGD = 41;
KhoBauLSGDLayer.BTN_NECKALL_LSGD = 42;

openKhoBauLSGD = function () {
    if (khoBauLSGD == null) {
        khoBauLSGD = new KhoBauLSGDLayer();
        //khoBauLSGDX = khoBauLSGD.getPosition().x;
        //khoBauLSGDY = khoBauLSGD.getPosition().y;
        slotKhoBau.addChild(khoBauLSGD);
    }else
    {
        khoBauLSGD.setVisible(true);
        khoBauLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        //cc.eventManager.resumeTarget(khoBauLSGD.pn_lichsu, true);
        //khoBauLSGD.setTag(Minigame.INDEX_MINI_SLOT +100);
    }
    khoBauLSGDAppear = true;
    khoBauLSGD.parserDataLsgd();
};
closeKhoBauLSGD = function (isRemove) {
    if (khoBauLSGD == null) {
        return;
    }
    //if(isRemove)
    //{
    //    khoBauLSGD.removeFromParent();
    //    khoBauLSGD = null;
    //    khoBauLSGDAppear = false;
    //}else
    if(khoBauLSGDAppear) {
        khoBauLSGD.setVisible(false);
        khoBauLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,0));
        khoBauLSGDAppear = false;
    }
};