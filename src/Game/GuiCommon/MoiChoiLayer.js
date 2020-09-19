var MoiChoiItem = cc.Class.extend({
    ctor: function(name, gold, type){
        this.nickName = name;
        this.gold = gold;
        this.isCheck = true;
        this.moneytype = type;
    }
});

var MoiChoiCellItem = cc.TableViewCell.extend({
    ctor: function(){
        this._super();

        //this.addSprite(this,"bg",cc.p(0,0),res_CardGame_CommonResource_MoiChoi+"/itemMoiChoi.png");
        //this["bg"].setAnchorPoint(0,0);
        //this.addCheckBox(this["bg"],"checkBoxMoiChoi",cc.p(239.5,25),true,res_CardGame_CommonResource_MoiChoi+"/A-57.png",res_CardGame_CommonResource_MoiChoi+"/A-57.png",res_CardGame_CommonResource_MoiChoi+"/tick.png",res_CardGame_CommonResource_MoiChoi+"/A-57.png",res_CardGame_CommonResource_MoiChoi+"/tick.png");
        //this["checkBoxMoiChoi"].setName("checkBoxMoiChoi");
        //this.addText(this["bg"],"lbNickName",cc.p(86,25),"NguyenThacDu",RobotoRegular.fontName,20);
        //this["lbNickName"].setName("lbNickName");
        //this.addText(this["bg"],"lbGold",cc.p(402,25),"1000000",RobotoRegular.fontName,20);
        //this["lbGold"].setName("lbGold");
        //this.addSprite(this["bg"],"iconVin",cc.p(314.5,25),res_Common_Chip+"/vinChip1.png");
        //this["iconVin"].setName("iconVin");
        //this.addChild(this["bg"]);
        //this.nickName = this["bg"].getChildByName("lbNickName");
        //this.gold = this["bg"].getChildByName("lbGold");
        //this.iconVin = this["bg"].getChildByName("iconVin");
        //this.checkBox = this["bg"].getChildByName("checkBoxMoiChoi");
       /* var jsonLayout = ccs.load("res/g_res_cardGame_json_ItemMoiChoi.json");
        this._layout = jsonLayout.node;
        this.addChild(this._layout);
        this._layout.anchorX = 0.0;
        this._layout.anchorY = 0.0;
        this._layout.x = 0;
        this._layout.y = 0;
        this.nickName = this._layout.getChildByName("lbNickName");
        this.gold = this._layout.getChildByName("lbGold");
        this.iconVin = this._layout.getChildByName("iconVin");
        this.checkBox = ccui.helper.seekWidgetByName(this._layout, "checkBoxMoiChoi");*/

    },

    ctor: function(item){
        this._super();
        this.containItem = item;
        this.nickName = item.getChildByName("lbNickName");
        this.gold = item.getChildByName("lbGold");
        this.checkBox = item.getChildByName("checkBoxMoiChoi");
        this.iconVin = item.getChildByName("iconVin");
    },

    onEnter: function()
    {
        cc.TableViewCell.prototype.onEnter.call(this);
    },

    updateWithItem: function(item){
        this.nickName.setString(item.nickName);
        this.gold.setString(formatMoney(0,3,parseInt(item.gold)));
        this.checkBox.setSelected(item.isCheck);
        if(item.moneytype == MONEY_VIN)
            this.iconVin.setTexture("res/common/chip/vinChip1.png");
        else
            this.iconVin.setTexture("res/common/chip/vinChip1.png");
    },

    setVisible: function(value){
        this.containItem.setVisible(value);
    }

});

var MoiChoiLayer = BaseLayer.extend({
    ctor: function(){
        this._super();
        //this.initWithBinaryFile("res/g_res_cardGame_json_MoiChoiLayer.json");
        this.cellSize= null;
        this.listItem = [];
        this.listCheck = [];
        this.mapCheckBox = {};
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
    },

    customizeGUI: function(){
        this.addSprite(this,"bg",cc.p(260.5,199.5),res_CardGame_CommonResource_MoiChoi+"/bg.png");
        this.addButton(this,"btnClose",MoiChoiLayer.BTN_CLOSE,cc.p(485,335),true,"res/ResourceMenuTab/Mail/btnClose.png","res/ResourceMenuTab/Mail/btnClose.png");
        this.addButton(this,"btnOk",MoiChoiLayer.BTN_OK,cc.p(257.5,16.5),true,"res/ResourceMenuTab/Mail/button_2.png","res/ResourceMenuTab/Mail/button_2.png");
        this["btnOk"].setTitleText("Đồng Ý");
        this["btnOk"].setTitleFontSize(20);
        this["btnOk"].setTitleFontName(RobotoRegular.fontName);
        
        this.addLayout(this,"table",cc.p(25,44),null,cc.size(470,255),true);
        this["table"].setAnchorPoint(0,0);
        this["table"].setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this["table"].setBackGroundColor(cc.color("#96C8FF"));
        this["table"].setBackGroundColorOpacity(0.4*255);
        this.addText(this["table"],"lbThongBao",cc.p(245.5,157),"Không có người chơi thích hợp!",RobotoRegular.fontName,24);
        this["lbThongBao"].setColor(cc.color("#000000"));
        this["scrollView"] = new ccui.ScrollView();
        this["scrollView"].setPosition(cc.p(27,46.5));
        this["scrollView"].setAnchorPoint(0,0);
        this["scrollView"].setContentSize(cc.size(470,255));
        this["scrollView"].setClippingEnabled(true);
        this.listContainItem = [];
        this["scrollView"].setInnerContainerSize(cc.size(470,503));
        this.addChild(this["scrollView"]);

        for(var i = 0; i < 10; i++){
            this.addImage(this["scrollView"],"bgItem_" + i,cc.p(0,450-i*45),res_CardGame_CommonResource_MoiChoi+"/itemMoiChoi1.png",cc.size(473,44));
            this["bgItem_" + i].setAnchorPoint(0,0);
            this.addCheckBox(this["bgItem_" + i],"checkBoxMoiChoi",cc.p(214.5,25),true,res_CardGame_CommonResource_MoiChoi+"/bgTick.png",res_CardGame_CommonResource_MoiChoi+"/bgTick.png",res_CardGame_CommonResource_MoiChoi+"/tick.png",res_CardGame_CommonResource_MoiChoi+"/bgTick.png",res_CardGame_CommonResource_MoiChoi+"/tick.png");
            this["checkBoxMoiChoi"].setName("checkBoxMoiChoi");
            this.addText(this["bgItem_" + i],"lbNickName",cc.p(94,25),"NguyenThacDu",RobotoRegular.fontName,20);
            this["lbNickName"].setColor(cc.color("#000000"));
            this["lbNickName"].setName("lbNickName");
            this.addText(this["bgItem_" + i],"lbGold",cc.p(447.5,25),"10000000",fontRobotoBold.fontName,20);
            this["lbGold"].setName("lbGold");
            this["lbGold"].setAnchorPoint(1,0.5);
            this["lbGold"].setColor(cc.color("#800080"));
            this.addSprite(this["bgItem_" + i],"iconVin",cc.p(277.5,24),res_Common_Chip+"/vinChip1.png");
            this["iconVin"].setName("iconVin");
            this.listContainItem.push(this["bgItem_" + i]);
        }
        this.addText(this,"Text_35",cc.p(263,355),"Mời Chơi",RobotoRegular.fontName,24);
        this["Text_35"].setColor(cc.color("#000000"));
    },

    onButtonRelease: function(btn, id){
        cc.log("btn moi choi" + id);
        switch(id){
            case MoiChoiLayer.BTN_CLOSE:
                this.close();
                break;
            case MoiChoiLayer.BTN_OK:
                this.sendMoiChoi();
                this.close();
                gameData.openMoiChoi = true;
                this.runAction(cc.sequence(cc.delayTime(10), cc.callFunc(function(){
                    gameData.openMoiChoi = false;
                })));
                break;
        }
    },

    close: function(){
        this.hide();
    },

    show: function(){
        this.setVisible(true);
        var mainContainSize = GameScene.getMainContentSize();
        var bgSize = this.bg.getContentSize();
        this.setPosition(cc.p(mainContainSize.width/2 - bgSize.width/2, mainContainSize.height + bgSize.height/2));
        var desPos = cc.p(mainContainSize.width/2 - bgSize.width/2, mainContainSize.height/2 - bgSize.height/2);
        var action = cc.moveTo(0.1, desPos);
        this.runAction(action);
    },

    hide: function(){
        this.setVisible(false);
        var mainContainSize = GameScene.getMainContentSize();
        var bgSize = this.bg.getContentSize();
        var desPos = cc.p(mainContainSize.width/2 - bgSize.width/2, mainContainSize.height + bgSize.height/2);
        var action = cc.moveTo(0.1, desPos);
        this.runAction(action);
        gameData.openMoiChoi = false;
    },
    updateWithItem: function(view,item){
        view.getChildByName("lbNickName").setString(item.nickName);
        view.getChildByName("lbGold").setString(formatMoney(0,3,parseInt(item.gold)));
        view.getChildByName("checkBoxMoiChoi").setSelected(item.isCheck);
        if(item.moneytype == MONEY_VIN)
            GuiUtil.changeSprite(view.getChildByName("iconVin"),"res/common/chip/vinChip1.png");
        else
            GuiUtil.changeSprite(view.getChildByName("iconVin"),"res/common/chip/vinChip1.png");
    },

    updateListItems: function(data, type){
        this.listItem = [];
        cc.log("data listName: " + data.listName.length);

        for(var i = 0; i < data.listName.length && i < 10; i++){
            var item = new MoiChoiItem(data.listName[i], data.listMoney[i], type);
            this.listItem.push(item);
        }

        if(data.listName.length == 0){
            this.lbThongBao.setVisible(true);
        }
        else{
            this.lbThongBao.setVisible(false);
        }
    },

    reloadData: function(){
        cc.log("reloadData");
        cc.log(this.listItem.length);
        for(var i = 0; i < this.listItem.length; i++){
            this.updateWithItem(this.listContainItem[i],this.listItem[i]);
            this.listContainItem[i].setVisible(true);
        }

        cc.log("listContainItem.length" + this.listContainItem.length);
        for(var i = this.listItem.length; i < this.listContainItem.length; i++){
            this.listContainItem[i].setVisible(false);
        }
    },

    sendMoiChoi: function(){
        var listNickName = [];
        for(var i = 0; i < this.listContainItem.length && i < this.listItem.length; i++){
            if(this.listContainItem[i].getChildByName("checkBoxMoiChoi").isSelected() == true){
                listNickName.push(this.listItem[i].nickName);
                gameWsClient.sendMoiChoi(listNickName);
            }
        }
    }
});

MoiChoiLayer.BTN_CLOSE = 0;
MoiChoiLayer.BTN_OK = 1;