

var XepHangItem = cc.Class.extend({
    ctor: function(name, score){
        this.name = name;
        this.score = score;
    }
});

PokerTourLobby = BaseLayer.extend({
    ctor: function(){
        this._super("LobyScene");
        cc.log("GameLobby 1");
        this.initWithBinaryFile("res/g_res_cardGame_json_PokerTourLobby.json");
        this.tourItemList = [];
        this.tourCardList = [];
        this.bangXepHangList = [];
        this.bangXepHangLayer = null;
        this.fakeList();
    },

    showBangXepHangPoint: function(){
        if(this.bangXepHangLayer == null){
            this.bangXepHangLayer = new BangXepHangPoint();
            this.addChild(this.bangXepHangLayer);
        }
        this.bangXepHangLayer.show();
    },

    fakeList: function(){
        for(var i  = 0; i < 3; i++){
            var item = new PokerTourItem(100, 2000, 2000);
            this.tourItemList.push(item);
            this.bangXepHangList.push(new XepHangItem("Canhpv" + i, 200));
        }
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);

        var that = this;
        this.customlistener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "updateMoney",
            callback: function(){
                cc.log("function callback lobby");
                that.doSomething();
            }
        });
        cc.eventManager.addListener(this.customlistener, 1);
    },

    doSomething: function(){
        // chua phai lam gi
    },

    customizeGUI: function(){
        this.btnJackpot =  this.customButton("btnJackpot", PokerTourLobby.BTN_JACKPOT, this._layout, false);

        this.btnDangDienRa = this.customButton("btnDangDienRa", PokerTourLobby.BTN_DANG_DIEN_RA, this._layout, true);
        this.btnSapDienRa = this.customButton("btnSapDienRa", PokerTourLobby.BTN_SAP_DIEN_RA, this._layout, true);
        this.setVisible(false);
        this.addThongTinGiaiDau();
        this.updateListTour();
        this.updateBangXepHang();

    },

    updateListTour: function(){
        var deltaX = 200;
        var posStartX = 500;
        var posStartY = 50;
        for(var i = 0; i < this.tourCardList.length; i++){
             this.tourCardList.removeFromParent();
        }
        this.tourCardList = [];

        var centerI = (this.tourItemList.length - 1)/2;
        for(var i = 0; i < this.tourItemList.length; i++){
            var item = this.tourItemList[i];
            var tourCard = new PokerTourCard(item);
            tourCard.setPosition( (i - centerI)*deltaX + posStartX  , posStartY);
            this._layout.addChild(tourCard);
            var btn = tourCard.bg;
            btn.setPressedActionEnabled(true);
            btn.addTouchEventListener(this.onTouchEventHandler,this);
            btn.setSwallowTouches(true);
            btn.setTag(i + PokerTourLobby.START_TOUR_INDEX);
        }
    },

    updateBangXepHang: function(){
        var list = this.bangXepHangList;
        for(var i = 0; i < list.length && i < 3; i++){
            var tempString = "name" + i;
            var lb = ccui.helper.seekWidgetByName(this.thongTinGiaiDauNode, tempString);
            lb.setVisible(true);
            lb.setString(list[i].name);

            var tempString = "score" + i;
            lb = ccui.helper.seekWidgetByName(this.thongTinGiaiDauNode, tempString);
            lb.setVisible(true);
            lb.setString(list[i].score);
        }

        for(var i = list.length; i < 3; i++){
            var tempString = "name" + i;
            var lb = ccui.helper.seekWidgetByName(this.thongTinGiaiDauNode, tempString);
            lb.setVisible(false);

            tempString = "score" + i;
            lb = ccui.helper.seekWidgetByName(this.thongTinGiaiDauNode, tempString);
            lb.setVisible(false);
        }
    },

    onButtonRelease: function(btn, id){
        var typeInfo = 0;
        switch(id){
            case PokerTourLobby.BTN_DANG_DIEN_RA:
                typeInfo  = 0;
                gameWsClient.sendGetInfoTour(typeInfo);
                break;
            case PokerTourLobby.BTN_SAP_DIEN_RA:
                typeInfo  = 1;
                gameWsClient.sendGetInfoTour(typeInfo);
                break;
            case PokerTourLobby.BTN_JACKPOT:
            {
                cc.log("click jackpot");
            }
                break;

            case PokerTourLobby.BTN_CHI_TIET_1:
            {
                cc.log("click chi tiet 1");
                this.showBangXepHangPoint();
            }
                break;
            case PokerTourLobby.BTN_CHI_TIET_2:
            {
                cc.log("click chi tiet 2");
            }
                break;

            case PokerTourLobby.BTN_CHI_TIET_3:
            {
                cc.log("click chi tiet 3");
            }
                break;

        }

        if(id >= PokerTourLobby.START_TOUR_INDEX) {
            // doSomething
        }
    },

    show: function(){
        this.setVisible(true);
        menutab.Isingame = true;
        this.setVisible(true);
        menutab.showTopInfo();
    },

    addThongTinGiaiDau: function(){
        var json = "res/g_res_cardGame_json_ThongTinGiaiDau.json";
        var thongTinGiaiDauScene = ccs.load(json);
        this.thongTinGiaiDauNode = thongTinGiaiDauScene.node;
        this.thongTinGiaiDauNode.setPosition(1280, 0);
        this.addChild(this.thongTinGiaiDauNode);
        var btnChiTiet1 = this.customButton("btnChiTiet1", PokerTourLobby.BTN_CHI_TIET_1, this.thongTinGiaiDauNode, true);
        var btnChiTiet2 = this.customButton("btnChiTiet2", PokerTourLobby.BTN_CHI_TIET_2, this.thongTinGiaiDauNode, true);
        var btnChiTiet3 = this.customButton("btnChiTiet3", PokerTourLobby.BTN_CHI_TIET_3, this.thongTinGiaiDauNode, true);
    },



    sendGetBangXepHang: function(type, detail){
        var stringUrl = this.getUrlBangXepHang();
        stringUrl += type + detail;
        sendRequest(stringUrl, null, false, this.callBackGetBangXephang)
    },

    callBackGetBangXephang: function(response){
        // do something
    },

});


var pokerLobbyInstance = null;
PokerTourLobby.hasInit = false;
PokerTourLobby.getInstance = function(){
    if(pokerLobbyInstance == null){
        PokerTourLobby.hasInit = true;
        pokerLobbyInstance = new PokerTourLobby();
        GameScene.addGUI(pokerLobbyInstance, BaseScene.INDEX_GAME_GUI, 0);

    }
    return pokerLobbyInstance;
}


PokerTourLobby.BTN_JACKPOT = 1001;
PokerTourLobby.BTN_DANG_DIEN_RA = 1002;
PokerTourLobby.BTN_SAP_DIEN_RA = 1006;

PokerTourLobby.BTN_CHI_TIET_1 = 1011;
PokerTourLobby.BTN_CHI_TIET_2 = 1012;
PokerTourLobby.BTN_CHI_TIET_3 = 1013;

PokerTourLobby.START_TOUR_INDEX = 1030;
