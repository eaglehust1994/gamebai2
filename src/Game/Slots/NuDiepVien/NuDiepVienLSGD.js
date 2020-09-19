var nuDiepVienLSGD = null;
var nuDiepVienLSGDX = 0;
var nuDiepVienLSGDY = 0;
var nuDiepVienLSGDAppear = false;

var NuDiepVienLSGDLayer = BaseLayer.extend(
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


            this._super("NuDiepVienLSGDLayer");
            this.initWithBinaryFile("res/NDVLichSuGiaoDich.json");
            return true;
        },

        customizeGUI: function() {
            this.pn_lichsu = this._layout.getChildByName("pn_lichsu");
            this.pn_lichsu.setScale(0);
            this.pn_lichsu.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichSuSlot = this.customButton("btnCloseLichSuSlot", NuDiepVienLSGDLayer.BTN_CLOSELICHSUMINISLOT, this.pn_lichsu);

            //this.pMaster = this.getControl("pMaster",this.pn_lichsu);
            this.lv_lichsu = this.getControl("lv_lichsu",this.pn_lichsu);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",NuDiepVienLSGDLayer.BTN_BACK_ALL_LSGD,this.pn_lichsu);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",NuDiepVienLSGDLayer.BTN_BACK_LSGD,this.pn_lichsu);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pn_lichsu);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",NuDiepVienLSGDLayer.BTN_NECK_LSGD,this.pn_lichsu);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",NuDiepVienLSGDLayer.BTN_NECKALL_LSGD,this.pn_lichsu);


        },
        onshow :function(){
            this.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            nuDiepVien.audioNuDiepVien.soundEffectKhoBau(nuDiepVien.audioNuDiepVien.button);
            switch (id) {
                case NuDiepVienLSGDLayer.BTN_CLOSELICHSUMINISLOT:
                    closeNuDiepVienLSGD(false);
                    break;

                case NuDiepVienLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLsgd();
                    }

                    break;
                case NuDiepVienLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLsgd();
                    }
                    break;
                case NuDiepVienLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLsgd();
                    }
                    break;
                case NuDiepVienLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLsgd();
                    }
                    break;

            }
        },
        parserDataLsgd: function()
        {
            var url = urlGetLsgdNuDiepVien(lobby.userInfo.nickname,this.currentPageLSGD);
            cc.log(url);
            sendRequest(url,null,false,this.callBackLsgd,this.callBackError);
            nuDiepVienLSGD.showLoading();
        },
        callBackError: function(response)
        {
           nuDiepVienLSGD.hideLoading();
        },
        callBackLsgd:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(nuDiepVienLSGD.arrLichSuGiaoDich!=null)
                    while(nuDiepVienLSGD.arrLichSuGiaoDich.length > 0) {
                        nuDiepVienLSGD.arrLichSuGiaoDich.pop();
                    }
                nuDiepVienLSGD.totalPageLSGD = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    nuDiepVienLSGD.arrLichSuGiaoDich.push(counter);

                }
                nuDiepVienLSGD.reloadLsgd();
            }
            //slotKhoBau.hideLoading();

        },
        reloadLsgd:function()
        {
            this.lv_lichsu.removeAllItems();
            var cellHeight = 38;
            var positionY = 19;
            var  fonts = UTMMobifoneKT;
            var fontSize = 24;

            for(var i = 0; i<nuDiepVienLSGD.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();


                //cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                //cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;
                //if(i % 2 == 1)
                //{
                //    cellList.height = cellHeight+2;
                //    cellList.setBackGroundColorOpacity(opacityCell2);
                //}else
                //{
                //    cellList.setBackGroundColorOpacity(opacityCell1);
                //}
                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, fontSize - 4, cc.size(146,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(73,positionY));
                lbPhien.setString(nuDiepVienLSGD.arrLichSuGiaoDich[i].rf);

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(342,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(319,positionY));
                lbTime.setString(nuDiepVienLSGD.arrLichSuGiaoDich[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(125,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbRoom.setPosition(cc.p(555,positionY));
                lbRoom.setString(formatMoney(0,3,nuDiepVienLSGD.arrLichSuGiaoDich[i].bv));
                lbRoom.setColor(colorMoneyVin);
                var  tongDat = nuDiepVienLSGD.arrLichSuGiaoDich[i].lb.split(",").length;
                var lbLineBet =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(106,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineBet.setPosition(cc.p(674,positionY));
                lbLineBet.setString(tongDat);
                lbLineBet.setColor(colorMoneyVin);

                var  win = 0;
                if(nuDiepVienLSGD.arrLichSuGiaoDich[i].lw != "")
                {
                    win = nuDiepVienLSGD.arrLichSuGiaoDich[i].lw.split(",").length;
                }
                var lbLineWin =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(114,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineWin.setPosition(cc.p(787,positionY));
                lbLineWin.setString(win);
                lbLineWin.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(244,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(968,positionY));
                lbResult.setString(formatMoney(0,3,nuDiepVienLSGD.arrLichSuGiaoDich[i].pz));

                lbResult.setColor(colorMoneyVin);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbLineBet);
                cellList.addChild(lbLineWin);
                cellList.addChild(lbResult);



                this.lv_lichsu.pushBackCustomItem(cellList);
                this.lb_current_page_lsgd.setString(this.currentPageLSGD + "/" + this.totalPageLSGD);
                nuDiepVienLSGD.hideLoading();
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

NuDiepVienLSGDLayer.BTN_CLOSELICHSUMINISLOT = 1;
NuDiepVienLSGDLayer.BTN_VIN = 2;
NuDiepVienLSGDLayer.BTN_XU = 3;
NuDiepVienLSGDLayer.BTN_BACK = 4;
NuDiepVienLSGDLayer.BTN_BACK_ALL_LSGD = 39;
NuDiepVienLSGDLayer.BTN_BACK_LSGD = 40;
NuDiepVienLSGDLayer.BTN_NECK_LSGD = 41;
NuDiepVienLSGDLayer.BTN_NECKALL_LSGD = 42;

openNuDiepVienLSGD = function () {
    if (nuDiepVienLSGD == null) {
        nuDiepVienLSGD = new NuDiepVienLSGDLayer();
        //nuDiepVienLSGDX = nuDiepVienLSGD.getPosition().x;
        //nuDiepVienLSGDY = nuDiepVienLSGD.getPosition().y;
        nuDiepVien.addChild(nuDiepVienLSGD);
    }else
    {
        nuDiepVienLSGD.setVisible(true);
        nuDiepVienLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        //cc.eventManager.resumeTarget(nuDiepVienLSGD.pn_lichsu, true);
        //nuDiepVienLSGD.setTag(Minigame.INDEX_MINI_SLOT +100);
    }
    nuDiepVienLSGDAppear = true;
    nuDiepVienLSGD.parserDataLsgd();
};
closeNuDiepVienLSGD = function (isRemove) {
    if (nuDiepVienLSGD == null) {
        return;
    }
    if(nuDiepVienLSGDAppear) {
        nuDiepVienLSGD.setVisible(false);
        nuDiepVienLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,0));
        nuDiepVienLSGDAppear = false;
    }
};