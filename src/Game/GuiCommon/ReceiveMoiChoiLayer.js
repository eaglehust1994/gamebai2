
var ReceiveMoiChoiLayer = BaseLayer.extend({
    ctor: function(){
        this._super();
     //   this.initWithBinaryFile("res/g_res_cardGame_json_ReceiveMoiChoiLayer.json");
        this.cellSize= null;
        this.listItem = [];
        this.listCheck = [];
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
    },

    customizeGUI: function(){

        this.addSprite(this,"bg",cc.p(638.5,675),res_CardGame_CommonResource_MoiChoi+"/bgMoiChoi.png");
        this.addButton(this["bg"],"btnClose",ReceiveMoiChoiLayer.BTN_CLOSE,cc.p(1224,45.5),true,res_CardGame_CommonResource_MoiChoi+"/tickDeny.png",res_CardGame_CommonResource_MoiChoi+"/tickDeny.png");
        this.addText(this["bg"],"lbName",cc.p(156.5,43),"nguyenThacDu",RobotoRegular.fontName,24);
        this.addText(this["bg"],"lbMoiChoiGame",cc.p(558,43),"nguyenThacDu",RobotoRegular.fontName,24);
        this.addText(this["bg"],"lbMucCuoc",cc.p(949,40)," 200M ",RobotoRegular.fontName,24);
        this["lbMucCuoc"].setColor(cc.color("#EF02FE"));
        this.addButton(this["bg"],"btnDongY",ReceiveMoiChoiLayer.BTN_OK,cc.p(1142,44),true,res_CardGame_CommonResource_MoiChoi+"/ticOk.png",res_CardGame_CommonResource_MoiChoi+"/ticOk.png");
        this.addText(this["bg"],"textMucCuoc",cc.p(858,43)," Cược: ",RobotoRegular.fontName,24);
        this.addSprite(this["bg"],"Image_4",cc.p(1012,42),res_Common_Chip+"/vinChip1.png");
        //var winSize = GameScene.getMainContentSize();
        //this.bg = ccui.helper.seekWidgetByName(this._layout, "bg");
        //
        //this.btnOk = this.customButton("btnDongY", ReceiveMoiChoiLayer.BTN_OK, this.bg, true);
        //this.btnClose = this.customButton("btnClose", ReceiveMoiChoiLayer.BTN_CLOSE, this.bg, true);
        //this.lbMoiChoiGame = ccui.helper.seekWidgetByName(this._layout, "textMoiChoiGame");
        //this.lbName = ccui.helper.seekWidgetByName(this._layout, "lbName");
        //this.lbMucCuoc = ccui.helper.seekWidgetByName(this._layout, "mucCuoc");
        //this.createContent();
    },

    onButtonRelease: function(btn, id){
        cc.log("btn" + id);
        switch(id){
            case ReceiveMoiChoiLayer.BTN_CLOSE:
                this.close();
                break;
            case ReceiveMoiChoiLayer.BTN_OK:
                cc.log("vao day roi");
                this.sendAcceptMoiChoi();
                this.hideWhenDongY();
                break;
        }
    },

    close: function(){
        this.hide();
    },

    show: function(){
        var mainContainSize = GameScene.getMainContentSize();
        var bgSize = this.bg.getContentSize();
        this.setVisible(true);
        this.setPosition(cc.p(0, bgSize.height*2));
        var desPos = cc.p(0, 0);
        var action = cc.EaseBackOut.create(cc.moveTo(0.5, desPos));
        this.bg.setOpacity(255);
        this.stopAllActions();
        this.runAction(cc.sequence(action, cc.delayTime(10), cc.callFunc(this.hide, this)));
    },

    hide: function(){
        cc.log("hide");
        GameLobby.getInstance().addDenyMoiChoi();
        var mainContainSize = GameScene.getMainContentSize();
        var bgSize = this.bg.getContentSize();
        var desPos = cc.p(0, bgSize.height*2);
        var action = cc.EaseBackIn.create(cc.moveTo(0.5, desPos));
        this.stopAllActions();
        this.runAction(action);
        gameLobbyInstance.disableMoiChoi = false;
    },

    hideWhenDongY: function(){
        GameLobby.getInstance().addDongYMoiChoi();
        var mainContainSize = GameScene.getMainContentSize();
        var bgSize = this.bg.getContentSize();
        var desPos = cc.p(0, bgSize.height*2);
        var action = cc.EaseBackIn.create(cc.moveTo(0.5, desPos));
        this.stopAllActions();
        this.runAction(action);
        gameLobbyInstance.disableMoiChoi = false;
    },

    updateGui: function(data){
        this.nameInviter = data.nameInviter;
        this.lbName.setString(this.nameInviter);
        var gameName = GameManager.getInstance().getGameName(gameData.gameType);
        this.lbMoiChoiGame.setString("Mời bạn chơi " + gameName);
        this.lbMucCuoc.setString(StringUtility.rutGonNumBer(data.moneyBet));
    },

    sendAcceptMoiChoi: function(){
        cc.log("moi choi nao");
        gameWsClient.sendAcceptMoiChoi(this.nameInviter);
    }
});

ReceiveMoiChoiLayer.BTN_CLOSE = 0;
ReceiveMoiChoiLayer.BTN_OK = 1;