//
TopServerLayer = BaseLayer.extend({
    ctor: function(){
        this._super("LobyScene");
        this.initWithBinaryFile("res/g_res_cardGame_json_TopServer.json");
        this.randType = 0;
        this.cellSize= null;
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
        this.onUpdateGUI();
    },

    customizeGUI: function(){
        var winSize = GameScene.getMainContentSize();
        var bg = this._layout.getChildByName("bg");
        var sprite = new cc.Sprite(Sam.res.topItemSlot);
        this.cellSize = cc.size(sprite.getBoundingBox().width, sprite.getBoundingBox().height);
        var tableView = new cc.TableView(this, cc.size(bg.getContentSize().width*0.98, bg.getContentSize().height*0.87));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        tableView.setPosition(cc.p(bg.getPosition().x + bg.getContentSize().width*0.01, bg.getPositionY() + bg.getContentSize().height*0.01));
        tableView.setDelegate(this);
        this.tableView = tableView;
        this.addChild(tableView);

        tableView.reloadData();
        this.btnTab1 = this.customButton("btnRankVip", TopServerLayer.BTN_RANK_VIN, this._layout, false);
        this.btnTab2 = this.customButton("btnRankThuong", TopServerLayer.BTN_RANK_XU, this._layout, false);

        this.tableView.setContentOffset(cc.p(0, bg.getContentSize().height*0.75 - this.cellSize.height*9));
    },

    //overrided
    onButtonRelease: function(btn, id){
        cc.log("btn" + id);

        switch(id){
            case TopServerLayer.BTN_RANK_VIN:
            case TopServerLayer.BTN_RANK_XU:
                this.touchBtnTab(id);
                break;
        }
    },

    touchBtnTab: function(id){
        if(id == TopServerLayer.BTN_RANK_VIN){
            if(this.randType != 1) {
                this.randType = 1;
                this.reloadTable();
            }

            this.btnTab1.loadTextures(Sam.res.btnSelectRankVip, Sam.res.btnSelectRankVip, Sam.res.btnSelectRankVip);
            this.btnTab2.loadTextures(Sam.res.btnUnselectRankThuong, Sam.res.btnUnselectRankThuong,Sam.res.btnUnselectRankThuong);
        }
        else if(id == TopServerLayer.BTN_RANK_XU){
            if(this.randType != 0) {
                this.randType = 0;
                this.reloadTable();
            }
            this.btnTab1.loadTextures(Sam.res.btnUnselectRankVip, Sam.res.btnUnselectRankVip, Sam.res.btnUnselectRankVip);
            this.btnTab2.loadTextures(Sam.res.btnSelectRankThuong, Sam.res.btnSelectRankThuong,Sam.res.btnSelectRankThuong);
        }
    },

    reloadTable: function(){
        this.tableView.reloadData();
        //var maxId = this.getMaxIndex();
        //this.tableView.setContentOffset(cc.p( -Math.max(Math.min(1, maxId -2), 0)*this.cellSize.width,  0));
    },

    getMaxIndex: function(){
        if(this.randType == 1)
            return 0;
        else return 4;
    },

    scrollViewDidScroll:function (view) {
    },

    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        var sprite = new cc.Sprite(Sam.res.topItemSlot);
        return cc.size(sprite.getBoundingBox().width*1.0, sprite.getBoundingBox().height*1.0);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new TopCellItem();
        } else {

        }

        if(this.randType == 1){
            cell.updateWithItem(idx, gameData.vinTopServerList[idx]);
            //cell.items[0].centerImg.setTexture(Sam.res.cellRoomCenterPng);
        }
        else{
            cell.updateWithItem(idx, gameData.xuTopServerList[idx]);
            //cell.items[0].centerImg.setTexture(Sam.res.cellRoomCenterPng);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        if(this.randType == 1){
            return gameData.vinTopServerList.length;
        }
        else{
            return gameData.xuTopServerList.length;
        }

    }

});

TopServerLayer.BTN_RANK_VIN = 1;
TopServerLayer.BTN_RANK_XU = 0;