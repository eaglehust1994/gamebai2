BaseLayerTable = BaseLayer.extend({
    size: null,
    titleContent : null,
    title: [],
    sizeTitle: null,
    callback: null,
    isPage: null,
    txt_title: null,
    txt_title_size:null,
    heightListView: null,
    ctor: function(size, titleContent, title, sizeTitle, callback, isPage, txt_title, txt_title_size, heightListView){
        this._super("BaseLayerTable");
        this.size = size;
        this.titleContent = titleContent;
        this.title = title;
        this.sizeTitle = sizeTitle;
        this.callback = callback;
        this.isPage = isPage;
        this.txt_title = txt_title;
        this.txt_title_size = txt_title_size;
        this.heightListView = heightListView;

        this.posYTitle = 583.32;
        this.currentPage = 1;
        this.maxPage = 100;
        this.typeTitle = null;
        this.isShow = null;

//        this.customizeGUI();
        return true;
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
        cc.eventManager.addListener(this._listener, this);
    },

    customizeGUI: function(){
        this.addLayout(this,"pnShadow",cc.p(640,360),null, cc.size(1280,720), true);
        this.addImage(this.pnShadow,"bgTable",cc.p(640,360),res_BaseTable + "/bgtab_mail.png", this.size);
        this.addImage(this.pnShadow,"bgTitle",cc.p(640,648.18),res_BaseTable + "/Title.png", cc.size(478,62));
        this.addText(this.pnShadow,"txtTitle",cc.p(640,649.09),this.titleContent,RobotoRegular.fontName,38);
        this.txtTitle.ignoreContentAdaptWithSize(false);
        this.txtTitle.setColor(cc.color("#7A3808"));
        this.txtTitle.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.txtTitle.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.txtTitle.setContentSize(400,45);
        this.addButton(this.pnShadow,"btn_hide",BaseLayerTable.BTN_HIDE,cc.p(1145.01,632.01),true,res_BaseTable + "/btnClose.png",res_BaseTable + "/btnClose_s.png");

        //this.addText(this.pnShadow,"Text_3",cc.p(242.51,33.43),"BÀN VIN",fontRobotoBold.fontName,28);

        this.addLayout(this.pnShadow,"pnTitle",cc.p(0,0),null, cc.size(0,0), true);

        var fistPos = (1280-this.sizeTitle)/2 + (this.getPositionTitleContent());
        var sizeButton = parseFloat(this.sizeTitle/this.title.length);

        if(this.title.length != 0){
            var num = this.title.length;
            for(var i = 0; i < num; i ++){
                var button = new ccui.Button();
                if(i == 0 || i == (num - 1))
                    button.loadTextures(res_Sercurity + "/btn_3_hang_s.png",res_Sercurity + "/btn_3_hang_s.png", res_Sercurity + "/btn_3_hang.png");
                else
                    button.loadTextures(res_Sercurity + "/btn_3_mid_s.png",res_Sercurity + "/btn_3_mid_s.png", res_Sercurity + "/btn_3_mid.png");
                button.setPressedActionEnabled(false);
                var scale = parseFloat(sizeButton/button.width);
                if(i == (num - 1))
                    button.setScaleX(0 - scale);
                else
                    button.setScaleX(scale);
                button.setPosition(cc.p(fistPos + i*sizeButton,this.posYTitle));
                button.setName(1000 + i);

                if(i == 0){
                    button.setEnabled(false);
                    button.setBright(false);
                }
                this.pnTitle.addChild(button);
                button.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            this.buttonTouch(sender.name);
                            break;
                    }
                },this);

                this.addText(this.pnTitle,"txt",cc.p(fistPos + i*sizeButton,this.posYTitle),this.title[i],RobotoRegular.fontName,28);
            }
        }

        if(this.isPage == true){
            this.addLayout(this.pnShadow,"pn_button",cc.p(640,102),null, cc.size(0,0), true);
            this.addButton(this.pn_button,"btn_BackAll",BaseLayerTable.BTN_BACKALL,cc.p(-147.01,-3),true,res_History + "/number.png",res_History + "/number_s.png");
            this.addButton(this.pn_button,"btn_Back",BaseLayerTable.BTN_BACK,cc.p(-91.00,-3),true,res_History + "/number.png",res_History + "/number_s.png");
            this.addButton(this.pn_button,"btn_Next",BaseLayerTable.BTN_NEXT,cc.p(77,-3),true,res_History + "/number.png",res_History + "/number_s.png");
            this.addButton(this.pn_button,"btn_NextAll",BaseLayerTable.BTN_NEXTALL,cc.p(132.99,-3),true,res_History + "/number.png",res_History + "/number_s.png");
            this.addSprite(this.pn_button,"sp_page",cc.p(-7,-3),res_History + "/number_big.png");

            this.addSprite(this.pn_button,"sp_backall",cc.p(-147.01,-3),res_History + "/backall.png");
            this.addSprite(this.pn_button,"sp_back",cc.p(-91.00,-3),res_History + "/back.png");
            this.addSprite(this.pn_button,"sp_next",cc.p(77,-3),res_History + "/back.png");
            this.sp_next.setRotation(180);
            this.addSprite(this.pn_button,"sp_nextall",cc.p(132.99,-3),res_History + "/backall.png");
            this.sp_nextall.setRotation(180);

            this.addText(this.pn_button, "lbPage", cc.p(-7.31, -2.77), this.currentPage + "/" + this.maxPage, fontRobotoBold.fontName, 19);
            this.lbPage.ignoreContentAdaptWithSize(false);
            this.lbPage.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.lbPage.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lbPage.setContentSize(100, 22);
        }

        var posList = 0;
        if(this.isPage == true) {
            posList = 130 + this.heightListView/2;
        }else{
            posList = 70 +  this.heightListView/2;
        }
        this.addImage(this.pnShadow,"imglist",cc.p(640,(posList + 40/2)),res_BaseTable + "/lopmo.png", cc.size(this.sizeTitle + 6, this.heightListView + 40));
        this.addListView(this.pnShadow, "lv_mucCuoc_creatroom", cc.p(640, posList), cc.size(this.sizeTitle, this.heightListView));

        if(this.txt_title.length > 0){
            this.addLayout(this.pnShadow,"pn_content",cc.p(0,0),null, cc.size(0,0), false);
            var startPos = (1280 - this.sizeTitle)/2;
            for(var i = 0; i < this.txt_title.length; i ++) {
                this.addText(this.pn_content, "txt", cc.p(startPos + this.txt_title_size[i]/2, 542.28), this.txt_title[i], RobotoRegular.fontName, 18);
                this.txt.ignoreContentAdaptWithSize(false);
                this.txt.setColor(cc.color("#FFDF58"));
                this.txt.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                this.txt.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.txt.setContentSize(this.txt_title_size[i], 20);
                startPos = startPos + this.txt_title_size[i];
            }
        }


        this.typeTitle = 0;
        this.isShow = true;
        this.pnShadow.setScale(0.1);
        this.pnShadow.runAction(cc.scaleTo(0.3, 1, 1));
    },

    // test
//    if(this.testBaseTable == null){
//    this.testBaseTable = new BaseLayerTable(cc.size(1095,627), "TEST BASE TABLE", ["ChoiVin", "ChoiXu", "TieuVin"], 1000, [lobby.test1, lobby.test2, lobby.test3], true,
//        ["Mã GD", "Thời gian", "Dịch vụ", "Phat sinh", "So du", "Mo ta", "Chi tiet"], [117, 162, 162,107,107,218,117], 390);
//    this.addChild(this.testBaseTable);
//}else{
//    this.testBaseTable.show(true);
//}
//

    buttonTouch : function(id){
        //cc.log("id: " + id);
        var st = (id - 1000);
        this.typeTitle = st;
        this.resetButtonTile(id);
        this.currentPage = 1;
        this.callback[st](this.currentPage);
    },
    resetButtonTile : function(id){
        for(var i = 0; i < this.title.length; i ++){
            if(id == (1000 + i)){
                if (this.pnTitle.getChildByName(id) != null) {
                    var btn = this.pnTitle.getChildByName(id);
                    btn.setEnabled(false);
                    btn.setBright(false);
                }
            }else {
                if (this.pnTitle.getChildByName(1000 + i) != null) {
                    var btn = this.pnTitle.getChildByName(1000 + i);
                    btn.setEnabled(true);
                    btn.setBright(true);
                }
            }
        }
    },

    getPositionTitleContent : function(){
        var maxSize = this.sizeTitle;
        var num = this.title.length;
        var firstPos = parseFloat(maxSize/(num*2));
        return firstPos;
    },

    show: function(callfunction){
        cc.eventManager.resumeTarget(this, true);
        if(this.isShow){
            return;
        }else{
            this.isShow = true;
            this.pnShadow.setScale(0.1);
            this.pnShadow.runAction(cc.scaleTo(0.3, 1, 1));
            this.setVisible(true);
            if(callfunction)
                this.callback[this.typeTitle](this.currentPage);
        }
    },

    hide: function(){
        this.isShow = false;
        cc.eventManager.pauseTarget(this, true);
        this.setVisible(false);
    },


    onButtonRelease: function(btn, id){
        switch(id){
            case BaseLayerTable.BTN_HIDE:
                this.hide();
                break;
            case BaseLayerTable.BTN_BACKALL:
                if(this.currentPage != 1){
                    this.currentPage = 1;
                }
                this.callback[this.typeTitle](this.currentPage);
                break;
            case BaseLayerTable.BTN_BACK:
                if(this.currentPage >= 2){
                    this.currentPage = this.currentPage - 1;
                }
                this.callback[this.typeTitle](this.currentPage);
                break;
            case BaseLayerTable.BTN_NEXT:
                if(this.currentPage < this.maxpage){
                    this.currentPage = this.currentPage + 1;
                }
                this.callback[this.typeTitle](this.currentPage);
                break;
            case BaseLayerTable.BTN_NEXTALL:
                if(this.currentPage != this.maxpage){
                    this.currentPage = this.maxpage;
                }
                this.callback[this.typeTitle](this.currentPage);
                break;
        }
    },
});
BaseLayerTable.BTN_HIDE = 1;
BaseLayerTable.BTN_BACKALL = 2;
BaseLayerTable.BTN_BACK = 3;
BaseLayerTable.BTN_NEXT = 4;
BaseLayerTable.BTN_NEXTALL = 5;
