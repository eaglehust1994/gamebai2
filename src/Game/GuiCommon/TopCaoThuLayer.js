//
TopCaoThuItem = cc.Node.extend({
    ctor: function(){
        this._super();
        this.sizeBg = cc.size(200, 30);
        var font = fontArial;

        var lbName = new ccui.Text();
        lbName.setAnchorPoint(cc.p(0.5,0.5));
        lbName.setFontName(font.fontName);
        lbName.setFontSize(16);
        lbName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lbName.setColor({r:247, g:235, b:198});
        lbName.setString("KhanhThinh");
        lbName.setPosition(this.sizeBg.width*0.00, this.sizeBg.height*0.0);
        this.addChild(lbName);
        this.lbName = lbName;

        var lbWinThang = new ccui.Text();
        lbWinThang.setAnchorPoint(cc.p(0.5,0.5));
        lbWinThang.setFontName(font.fontName);
        lbWinThang.setFontSize(16);
        lbWinThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lbWinThang.setColor({r:247, g:235, b:198});
        lbWinThang.setString("1000000000");
        lbWinThang.setPosition(this.sizeBg.width*1.0, this.sizeBg.height*0.0);
        this.addChild(lbWinThang);
        this.lbWinThang = lbWinThang;
    },

    updateWithItem: function(stt, item, isVin){
        this.lbName.setString(item.n);
        this.lbWinThang.setString( StringUtility.standartNumber(item.m));
        if(isVin){
            this.lbWinThang.setColor({r:231, g:2, b:254});
        }else{
            this.lbWinThang.setColor({r:247, g:235, b:198});
        }
    }
}),

TopCaoThuLayer = BaseLayer.extend({
    ctor: function(){
        this._super("TopCaoThu");
        this.initWithBinaryFile("res/g_res_cardGame_json_TopCaoThu.json");
        this.randType = MONEY_VIN;
        this.isWeek = false;
        this.cellSize= null;
        this.listContent = [];
    },

    createContent: function(){
        for(var i = 0; i < 5; i++){
            var topItem = new TopCaoThuItem();
            this.listContent.push(topItem);
            this.bg.addChild(topItem);
            topItem.setVisible(false);
            topItem.setPosition(cc.p(this.startPos.x, this.startPos.y - 26*i));
        }
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
    },

    customizeGUI: function(){
        var winSize = GameScene.getMainContentSize();
        this.bg = ccui.helper.seekWidgetByName(this._layout, "topCaoThuBg");

        this.btnVin = this.customButton("btnVinTop", TopCaoThuLayer.BTN_RANK_VIN);
        this.btnXu = this.customButton("btnXuTop", TopCaoThuLayer.BTN_RANK_XU);

        this.startPos = ccui.helper.seekWidgetByName(this._layout, "startNode").getPosition();
        this.createContent();
    },

    //overrided
    onButtonRelease: function(btn, id){
        cc.log("btn" + id);
        switch(id){
            case TopGameLayer.BTN_RANK_VIN:
            case TopGameLayer.BTN_RANK_XU:
                this.touchBtnTab(id);
                break;
        }
    },

    touchBtnTab: function(id){
        if(id == TopCaoThuLayer.BTN_RANK_VIN){
            if(this.randType != 1) {
                this.randType = 1;
                this.reloadTable();
            }
            GameManager.getInstance().sendRequestTopCaoThuVin();
            this.btnVin.loadTextures(Res.btnRankVinSelected, Res.btnRankVinSelected, Res.btnRankVinUnselected);
            this.btnXu.loadTextures(Res.btnRankXuUnselected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
        }
        else if(id == TopCaoThuLayer.BTN_RANK_XU){
            if(this.randType != 0) {
                this.randType = 0;
                this.reloadTable();
            }
            GameManager.getInstance().sendRequestTopCaoThuXu();
            this.btnVin.loadTextures(Res.btnRankVinUnselected, Res.btnRankXuSelected, Res.btnRankXuSelected);
            this.btnXu.loadTextures(Res.btnRankXuSelected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
        }
    },

    reloadTable: function(){
        if(this.randType == MONEY_VIN){
            this.topList = gameData.vinCaoThuList;
        }else{
            this.topList = gameData.xuCaoThuList;
        }

        for(var i = 0; i < 5; i++) {
            if( i < this.topList.length){
                this.listContent[i].setVisible(true);
                if(this.randType == MONEY_VIN){
                    this.listContent[i].updateWithItem(i, this.topList[i], true);
                }
                else{
                    this.listContent[i].updateWithItem(i, this.topList[i], false);
                }

            }else {
                this.listContent[i].setVisible(false);
            }
        }
    }
});

TopCaoThuLayer.BTN_RANK_VIN = 1001;
TopCaoThuLayer.BTN_RANK_XU = 1002;