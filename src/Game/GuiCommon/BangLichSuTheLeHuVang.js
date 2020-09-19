var BangLichSuTheLeHuVang = MiniGameBaseLayer.extend({
    ctor: function(){
        this._super("g_res_cardGame_json_theLeGameBai");

        var posInitialX = 0;
        var posInitialY = 0;
        var isShowing = false;

        this.btnClose = null;

        this.lbTextBaCay = null;
        this.lbTextBaCao = null;
        this.lbTextSam = null;
        this.lbTextTienLen = null;
        this.lbTextMauBinh = null;

        this.pnTheLe = null;

        this.btnBack = null;
        this.btnNext = null;
        this.btnNextAll = null;
        this.lbCurrentPage = null;

        this.currentPage = 1;
        this.totalPage = 1;
        this.isWait = false;
        this.initWithBinaryFile("res/g_res_cardGame_json_theLeGameBai.json");
    },

    customizeGUI: function(){
        this.pnHuongDan = this._layout.getChildByName("pnHuongDan");
        var arrayRootChildren = this._layout.getChildren();
        var length = arrayRootChildren.length;
        cc.log("lengt",length);
        for (var i = 0; i < length; i++) {
            var child = arrayRootChildren[i];
            if(child.getName() == "pnHuongDan"){
                this.pnHuongDan = child;
            }
        }
        this.pnHuongDan.setScale(0);
        this.pnHuongDan.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.onshow, this)));
        this.btnClose = this.customButton("btnCloseGuild", BangLichSuTheLeHuVang.BTN_CLOSE, this.pnHuongDan);
        this.lbCurrentPage = this.pnHuongDan.getChildByName("lbCurrentPage");

        this.btnBackAll = this.customButton("btn_backall", BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH, this.pnHuongDan);
        this.btnBack = this.customButton("btn_back", BangLichSuTheLeHuVang.BTN_BACK_VINHDANH, this.pnHuongDan);
        this.btnNext = this.customButton("btn_next", BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH, this.pnHuongDan);
        this.btnNextAll = this.customButton("btn_nextall", BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH, this.pnHuongDan);

        this.tableVinhDanh = ccui.helper.seekWidgetByName(this.pnHuongDan, "bangVinhDanhTable");
        this.addMasterLayer(this.pnHuongDan);
    },

    onshow: function () {
        this.pnHuongDan.runAction(cc.scaleTo(0.2, 1));
    },

    onButtonRelease: function(button, id){
        switch(id) {
            case BangLichSuTheLeHuVang.BTN_CLOSE:
                this.closeHuongDan();
                break;
            
            case BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage != 1) {
                        this.currentPage = 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
            case BangLichSuTheLeHuVang.BTN_BACK_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage > 1) {
                        this.currentPage = this.currentPage - 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
            case BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage < this.totalPage) {
                        this.currentPage = this.currentPage + 1;
                        this.getLichSuVinhDanh();
                    }
                }
                break;

            case BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH:
                if (this.isWait == false) {
                    if (this.currentPage != this.totalPage) {
                        this.currentPage = this.totalPage;
                        this.getLichSuVinhDanh();
                    }
                }
                break;
        }
    },
    addLoading: function() {
        if (this.pnHuongDan.getChildByName("loadingdata") == null) {
            var loading = new cc.Sprite();
            loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png", cc.rect(0, 0, 60, 60));
            loading.setPosition(cc.p(640, 320));
            loading.setName("loadingdata");
            this.pnHuongDan.addChild(loading);
            var rotateByVT = new cc.RotateBy(1, 360);
            loading.runAction(cc.repeatForever(rotateByVT));
        } else {
            var rotateByVT = new cc.RotateBy(1, 360);
            this.pnHuongDan.getChildByName("loadingdata").setVisible(true);
            this.pnHuongDan.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
        }
    },

    closeLoading: function() {
        this.pnHuongDan.getChildByName("loadingdata").stopAllActions();
        this.pnHuongDan.getChildByName("loadingdata").setVisible(false);
    },

    callBackError: function(response) {
        this.isWait = false;
        this.closeLoading();
    },

    getLichSuVinhDanh: function() {
        var url = this.getUrlLichSuHuGameBai(this.currentPage);
        sendRequest(url, null, false, this.callBackVinhDanh.bind(this), this.callBackError.bind(this));
        this.isWait = true;
        this.addLoading();
    },

    getUrlLichSuHuGameBai: function(page)
    {
        return BASE_URL + "c=110&p=" + page;
    },


    callBackVinhDanh: function(response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        this.totalPage = jsonData["totalPages"];
        if (this.totalPage > 100){
            this.totalPage = 100;
        }

        this.lbCurrentPage.setString(this.currentPage + "/" + this.totalPage);

        if(success) {
            if (this.arrVinhdanh != null) {
                while (this.arrVinhdanh.length > 0) {
                    this.arrVinhdanh.pop();
                }
            }

            this.arrVinhdanh = [];

            var tempArrayVinhDanh = jsonData["noHu"];


            if (tempArrayVinhDanh != "") {
                for (var i = 0; i < tempArrayVinhDanh.length; i++) {
                    var counter = tempArrayVinhDanh[i];
                    this.arrVinhdanh.push(counter);
                }
            }
            this.reload_BangThanhTich();
        }

        this.closeLoading();
        this.isWait = false;
    },


    formatDateTime : function (str){
        var date = str.split(" ")[0];
        var time  = str.split(" ")[1];
        var day = date.split("-")[2];
        var month = date.split("-")[1];
        var year = date.split("-")[0];
        str = time + " " + day + "/" + month + "/" + year;
        return str;
    },

    reload_BangThanhTich: function () {
        this.tableVinhDanh.removeAllItems();
        var cellHeight = 40;
        var positionY = 20;

        var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};

        for (var i = 0; i < this.arrVinhdanh.length; i++) {
            var cl1 = new ccui.Layout();
            cl1.height = cellHeight;
            cl1.width = this.tableVinhDanh.width;

            var cellList = null;

            if(i % 2 == 0) {
                cellList = new cc.LayerColor(cc.color(25, 23, 88, 160));
            } else {
                cellList = new cc.LayerColor(cc.color("#39489E"));
            }

            cellList.height = cellHeight;
            cellList.width = this.tableVinhDanh.width;

            var lbTime = new cc.LabelTTF('', fonts.fontName, 16, cc.size(200, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbTime.setAnchorPoint(0.5, 0.5);
            lbTime.setPosition(cc.p(80, positionY));
            lbTime.setString(this.formatDateTime(this.arrVinhdanh[i].createTime));
            lbTime.setColor(cc.color("#e8daad"));

            var lbAccount = new cc.LabelTTF('', fonts.fontName, 18, cc.size(142, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbAccount.setPosition(cc.p(270, positionY));
            lbAccount.setString(this.arrVinhdanh[i].nickname);
            lbAccount.setColor(cc.color("#e8daad"));

            var lbPhong = new cc.LabelTTF('', fonts.fontName, 18, cc.size(100, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbPhong.setPosition(cc.p(470, positionY));
            lbPhong.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].room)));
            lbPhong.setColor(cc.color("#e8daad"));

            var lbThang = new cc.LabelTTF('', fonts.fontName, 18, cc.size(130, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbThang.setPosition(cc.p(600, positionY));
            lbThang.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].moneyWin)));
            lbThang.setColor(cc.color("#E702FE"));


            var lbHu = new cc.LabelTTF('', fonts.fontName, 18, cc.size(130, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbHu.setPosition(cc.p(780, positionY));
            lbHu.setString(formatMoney(0, 3, parseInt(this.arrVinhdanh[i].potValue)));
            lbHu.setColor(cc.color("#E702FE"));

            var lbGame = new cc.LabelTTF('', fonts.fontName, 18, cc.size(118, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            lbGame.setPosition(cc.p(970, positionY));

            var gameNameString = this.arrVinhdanh[i].gamename;
            if(gameNameString == "BaCay"){
                gameNameString = "Ba Cây";
            }else if(gameNameString == "BaiCao"){
                gameNameString = "Bài Cào"
            }else if(gameNameString == "Tlmn"){
                gameNameString = "Tiến lên";
            }else if(gameNameString == "Binh"){
                gameNameString = "Mậu Binh";
            }else if(gameNameString == "Sam"){
                gameNameString = "Sâm";
            }

            lbGame.setString(gameNameString);

            lbGame.setColor(cc.color("#e8daad"));

            if (this.arrVinhdanh[i].nickname == lobby.userInfo.nickname) {
                lbTime.setColor(cc.color("#F3F354"));
                lbAccount.setColor(cc.color("#F3F354"));
                lbPhong.setColor(cc.color("#F3F354"));
            }

            cellList.addChild(lbTime);
            cellList.addChild(lbAccount);
            cellList.addChild(lbPhong);
            cellList.addChild(lbThang);
            cellList.addChild(lbGame);
            cellList.addChild(lbHu);

            cl1.addChild(cellList);
            this.tableVinhDanh.pushBackCustomItem(cl1);
            this.closeLoading();
        }
    },
       //

    openHuongDan: function () {
        this.setVisible(true);
        if (!this.isShowing) {
            cc.eventManager.resumeTarget(this.pnHuongDan, true);
            this.pnHuongDan.runAction(cc.scaleTo(0.2, 1));
            this.setTag(Minigame.INDEX_MINI_SLOT + 189);
        }

        this.isShowing = true;
        this.getLichSuVinhDanh();
        this.reOpenLayer(this.pnHuongDan);
    },

    closeHuongDan: function (){
        if (this.isShowing){
            this.closeLayer(this.pnHuongDan);
            this.setVisible(false);
            this.pnHuongDan.setScale(0);
            cc.eventManager.pauseTarget(this.pnHuongDan, true);
            this.isShowing = false;
        }
    }
});

BangLichSuTheLeHuVang.BTN_CLOSE = 1;
BangLichSuTheLeHuVang.BTN_BACKALL_VINHDANH = 4;
BangLichSuTheLeHuVang.BTN_BACK_VINHDANH = 5;
BangLichSuTheLeHuVang.BTN_NEXTALL_VINHDANH = 6;
BangLichSuTheLeHuVang.BTN_NEXT_VINHDANH = 7;


var bangLichSuHuVangInstance = null;

BangLichSuTheLeHuVang.getInstance = function(){
    if(bangLichSuHuVangInstance == null){
        bangLichSuHuVangInstance = new BangLichSuTheLeHuVang();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bangLichSuHuVangInstance, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT + 100);
    }

    return bangLichSuHuVangInstance;
}


