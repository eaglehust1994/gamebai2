var khoBauTopUser = null;
var khoBauTopUserX = 0;
var khoBauTopUserY = 0;
var khoBauTopUserAppear = false;

var KhoBauTopUserLayer = BaseLayer.extend(
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


            this._super("KhoBauTopUserLayer");
            this.initWithBinaryFile("res/KBTopNoHu.json");
            return true;
        },

        customizeGUI: function() {
            this.pTopUser = this._layout.getChildByName("pTopUser");
            this.pTopUser.setScale(0);
            this.pTopUser.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichSuSlot = this.customButton("btnCloseLichSuSlot", KhoBauTopUserLayer.BTN_CLOSELICHSUMINISLOT, this.pTopUser);

            //this.pMaster = this.getControl("pMaster",this.pTopUser);
            this.lv_lich_su_nu_hu = this.getControl("lv_lich_su_nu_hu",this.pTopUser);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",KhoBauTopUserLayer.BTN_BACK_ALL_LSGD,this.pTopUser);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",KhoBauTopUserLayer.BTN_BACK_LSGD,this.pTopUser);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pTopUser);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",KhoBauTopUserLayer.BTN_NECK_LSGD,this.pTopUser);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",KhoBauTopUserLayer.BTN_NECKALL_LSGD,this.pTopUser);


        },
        onshow :function(){
            this.pTopUser.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
            switch (id) {
                case KhoBauTopUserLayer.BTN_CLOSELICHSUMINISLOT:
                    closeKhoBauTopUser(false);
                    break;

                case KhoBauTopUserLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser = 1;
                        this.parserDataTopUser();
                    }

                    break;
                case KhoBauTopUserLayer.BTN_BACK_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser--;
                        this.parserDataTopUser();
                    }
                    break;
                case KhoBauTopUserLayer.BTN_NECK_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser++;
                        this.parserDataTopUser();
                    }
                    break;
                case KhoBauTopUserLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser = this.totalPage;
                        this.parserDataTopUser();
                    }
                    break;

            }
        },
        callBackError: function(response)
        {
            khoBauTopUser.hideLoading();
        },
        parserDataTopUser: function()
        {
            var url = urlGetTopSlotsKhoBau(this.currentPageTopUser);
            sendRequest(url,null,false,this.callBackTopUser,this.callBackError);
           khoBauTopUser.showLoading();
        },
        callBackTopUser:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(khoBauTopUser.arrTopUser!=null)
                    while(khoBauTopUser.arrTopUser.length > 0) {
                        khoBauTopUser.arrTopUser.pop();
                    }
                khoBauTopUser.totalPage = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    khoBauTopUser.arrTopUser.push(counter);


                }

                khoBauTopUser.reloadTopUser();
            }
            //slotKhoBau.hideLoading();

        },
        reloadTopUser:function()
        {
            this.lv_lich_su_nu_hu.removeAllItems();
            var cellHeight = 55;
            var positionY = 27;
            var  fonts = RobotoRegular;
            var fontSize = 26;

            for(var i = 0; i<this.arrTopUser.length; i++)
            {
                var cellList = new ccui.Layout();


                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_nu_hu.width;
                if(i % 2 == 1)
                {
                    cellList.height = cellHeight+2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                }else
                {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(390,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(197,positionY));
                lbTime.setString(khoBauTopUser.arrTopUser[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(154,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(471,positionY));
                lbRoom.setString(formatMoney(0,3,khoBauTopUser.arrTopUser[i].bv));
                lbRoom.setColor(colorMoneyVin);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(375,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(740,positionY));
                lbTaiKhoan.setString(khoBauTopUser.arrTopUser[i].un);
                // lbTime.setTextColor(cc.color.WHITE);



                //lbRomm.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(262,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbResult.setPosition(cc.p(1061,positionY));
                lbResult.setString(formatMoney(0,3,khoBauTopUser.arrTopUser[i].pz));

                lbResult.setColor(colorMoneyVin);

                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbResult);



                this.lv_lich_su_nu_hu.pushBackCustomItem(cellList);
                this.lb_current_page_lsgd.setString(this.currentPageTopUser + "/" + this.totalPage);

                khoBauTopUser.hideLoading();

            }
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

KhoBauTopUserLayer.BTN_CLOSELICHSUMINISLOT = 1;
KhoBauTopUserLayer.BTN_VIN = 2;
KhoBauTopUserLayer.BTN_XU = 3;
KhoBauTopUserLayer.BTN_BACK = 4;
KhoBauTopUserLayer.BTN_BACK_ALL_LSGD = 39;
KhoBauTopUserLayer.BTN_BACK_LSGD = 40;
KhoBauTopUserLayer.BTN_NECK_LSGD = 41;
KhoBauTopUserLayer.BTN_NECKALL_LSGD = 42;

openKhoBauTopUser = function () {
    if (khoBauTopUser == null) {
        khoBauTopUser = new KhoBauTopUserLayer();
        //khoBauTopUserX = khoBauTopUser.getPosition().x;
        //khoBauTopUserY = khoBauTopUser.getPosition().y;
        slotKhoBau.addChild(khoBauTopUser);
    }else
    {
        khoBauTopUser.setVisible(true);
        khoBauTopUser.pTopUser.runAction(cc.scaleTo(0.2,1));
        //cc.eventManager.resumeTarget(khoBauTopUser.pTopUser, true);
        //khoBauTopUser.setTag(Minigame.INDEX_MINI_SLOT +100);
    }
    khoBauTopUserAppear = true;
    khoBauTopUser.parserDataTopUser();
};
closeKhoBauTopUser = function (isRemove) {
    if (khoBauTopUser == null) {
        return;
    }
    //if(isRemove)
    //{
    //    khoBauTopUser.removeFromParent();
    //    khoBauTopUser = null;
    //    khoBauTopUserAppear = false;
    //}else
    if(khoBauTopUserAppear) {
        khoBauTopUser.setVisible(false);
        khoBauTopUser.pTopUser.runAction(cc.scaleTo(0.2,0));
        //cc.eventManager.pauseTarget(khoBauTopUser.pTopUser, true);
        khoBauTopUserAppear = false;
    }
};