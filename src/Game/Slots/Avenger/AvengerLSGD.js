var avengerLSGD = null;
var avengerLSGDX = 0;
var avengerLSGDY = 0;
var avengerLSGDAppear = false;

var AvengerLSGDLayer = BaseLayer.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrLichSuGiaoDich = [];
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.btn_close = null;

            this.pn_lichsu = null;
            this.pMaster = null;

            this.lv_lichsu = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("AvengerLSGDLayer");
            this.initWithBinaryFile("res/AvengerLichSuGiaoDich.json");
            return true;
        },

        customizeGUI: function() {
            this.pn_lichsu = this._layout.getChildByName("pn_lichsu");

            this.pMaster = this.getControl("pMaster",this.pn_lichsu);
            this.pn_lichsu.setScale(0);
            this.pn_lichsu.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btn_close = this.customButton("btn_close", AvengerLSGDLayer.BTN_CLOSE, this.pn_lichsu);

            //this.pMaster = this.getControl("pMaster",this.pn_lichsu);
            this.lv_lichsu = this.getControl("lv_lichsu",this.pMaster);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",AvengerLSGDLayer.BTN_BACK_ALL_LSGD,this.pMaster);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",AvengerLSGDLayer.BTN_BACK_LSGD,this.pMaster);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pMaster);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",AvengerLSGDLayer.BTN_NECK_LSGD,this.pMaster);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",AvengerLSGDLayer.BTN_NECKALL_LSGD,this.pMaster);


        },
        onshow :function(){
            this.pn_lichsu.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            avenger.audioAvenger.soundEffect(avenger.audioAvenger.button);
            switch (id) {
                case AvengerLSGDLayer.BTN_CLOSE:
                    closeAvengerLSGD(false);
                    break;

                case AvengerLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLsgd();
                    }

                    break;
                case AvengerLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLsgd();
                    }
                    break;
                case AvengerLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLsgd();
                    }
                    break;
                case AvengerLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLsgd();
                    }
                    break;

            }
        },
        parserDataLsgd: function()
        {
            var url = urlGetLsgdAvenger(lobby.userInfo.nickname,this.currentPageLSGD);
            cc.log(url);
            sendRequest(url,null,false,this.callBackLsgd,this.callBackError);
            avengerLSGD.showLoading();
        },
        callBackError: function(response)
        {
           avengerLSGD.hideLoading();
        },
        callBackLsgd:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(avengerLSGD.arrLichSuGiaoDich!=null)
                    while(avengerLSGD.arrLichSuGiaoDich.length > 0) {
                        avengerLSGD.arrLichSuGiaoDich.pop();
                    }
                avengerLSGD.totalPageLSGD = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    avengerLSGD.arrLichSuGiaoDich.push(counter);

                }
                avengerLSGD.reloadLsgd();
            }
            //slotKhoBau.hideLoading();

        },
        reloadLsgd:function()
        {
            this.lv_lichsu.removeAllItems();
            var cellHeight = 38;
            var positionY = 19;
            var  fonts = UTMMobifoneKT;
            var fontSize = 20;

            for(var i = 0; i<avengerLSGD.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu.width;
                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, fontSize - 4, cc.size(120,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(60,positionY));
                lbPhien.setString(avengerLSGD.arrLichSuGiaoDich[i].rf);

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(290,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(268,positionY));
                lbTime.setString(avengerLSGD.arrLichSuGiaoDich[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(120,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbRoom.setPosition(cc.p(473,positionY));
                lbRoom.setString(formatMoney(0,3,avengerLSGD.arrLichSuGiaoDich[i].bv));
                lbRoom.setColor(colorMoneyVin);
                var  tongDat = avengerLSGD.arrLichSuGiaoDich[i].lb.split(",").length;
                var lbLineBet =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(124,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineBet.setPosition(cc.p(597,positionY));
                lbLineBet.setString(tongDat);
                lbLineBet.setColor(colorMoneyVin);

                var  win = 0;
                if(avengerLSGD.arrLichSuGiaoDich[i].lw != "")
                {
                    win = avengerLSGD.arrLichSuGiaoDich[i].lw.split(",").length;
                }
                var lbLineWin =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(130,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineWin.setPosition(cc.p(728,positionY));
                lbLineWin.setString(win);
                lbLineWin.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(276,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(955,positionY));
                lbResult.setString(formatMoney(0,3,avengerLSGD.arrLichSuGiaoDich[i].pz));

                lbResult.setColor(colorMoneyVin);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbLineBet);
                cellList.addChild(lbLineWin);
                cellList.addChild(lbResult);



                this.lv_lichsu.pushBackCustomItem(cellList);
                this.lb_current_page_lsgd.setString(this.currentPageLSGD + "/" + this.totalPageLSGD);

            }
            avengerLSGD.hideLoading();
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

AvengerLSGDLayer.BTN_CLOSE = 1;
AvengerLSGDLayer.BTN_VIN = 2;
AvengerLSGDLayer.BTN_XU = 3;
AvengerLSGDLayer.BTN_BACK = 4;
AvengerLSGDLayer.BTN_BACK_ALL_LSGD = 39;
AvengerLSGDLayer.BTN_BACK_LSGD = 40;
AvengerLSGDLayer.BTN_NECK_LSGD = 41;
AvengerLSGDLayer.BTN_NECKALL_LSGD = 42;

openAvengerLSGD = function () {
    if (avengerLSGD == null) {
        avengerLSGD = new AvengerLSGDLayer();
        avenger.addChild(avengerLSGD);
    }else
    {
        avengerLSGD.setVisible(true);
        avengerLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,1));
    }
    avengerLSGDAppear = true;
    avengerLSGD.parserDataLsgd();
};
closeAvengerLSGD = function (isRemove) {
    if (avengerLSGD == null) {
        return;
    }
    if(isRemove)
    {
        avengerLSGD.removeFromParent();
        avengerLSGD = null;
        avengerLSGDAppear = false;
    }else
    if(avengerLSGDAppear) {
        avengerLSGD.setVisible(false);
        avengerLSGD.pn_lichsu.runAction(cc.scaleTo(0.2,0));
        avengerLSGDAppear = false;
    }
};