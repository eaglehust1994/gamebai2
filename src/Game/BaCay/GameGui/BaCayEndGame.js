//
BaCay.BaCayEndGame = BaseLayer.extend({

    ctor: function()
    {
        this._super("BaCayEndGame");
        //this.initWithBinaryFile("res/g_res_cardGame_json_BaCayEndGame.json");
        cc.log("BaCayEndGame ctor end");
        this.data = [];
        this.data.numPlayerInGame = 0;
        this.data.listPlayerInGame = [];
        this.customizeGUI2();
    },

    setData: function(data){
        this.data = data;
    },

    customizeGUI2: function()
    {
        cc.log("BaCayEndGame custormize1");
        //var bg = ccui.Helper.seekWidgetByName(this._layout,"bg");
        this.addSprite(this,"bg",cc.p(640,360),res_CardGame_BaCay + "/bg_bangketqua.png");
        //var bg2 = ccui.helper.seekWidgetByName(this._layout, "bg2");
        this.addImage(this.bg,"bg2",cc.p(433,283),res_CardGame_BaCay + "/bg_bangketqua_lopmo.png", cc.size(830,439));
        //this.btnXacNhan = this.customizeButton("btnXacNhan", 1, bg);
        this.addButton(this.bg,"btnXacNhan",1,cc.p(433,27),true,res_CardGame_BaCay + "/btn_xacnhan.png",null);
        this.addText(this.bg,"title_kq",cc.p(433,538),"Kết Quả",fontRobotoBold.fontName,55);

        cc.log("BaCayEndGame custormize2");
        this.panels = [];
        var sprite = GuiUtil.createSprite(BaCay.res.endGameItemSlot);
        this.cellSize = cc.size(sprite.getBoundingBox().width, sprite.getBoundingBox().height);

        cc.log("BaCayEndGame custormize3");
        var tableView = new cc.TableView(this, cc.size(this.bg2.getContentSize().width, this.bg2.getContentSize().height*0.83));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        tableView.setPosition(cc.p(this.bg2.getPositionX() -  this.bg2.getContentSize().width*0.50 + 8, this.bg2.getPositionY() - this.bg2.getContentSize().height*0.50));
        tableView.setDelegate(this);
        this.tableView = tableView;
        this.bg.addChild(tableView);
        this.tableView.setContentOffset(cc.p(0, this.bg2.getContentSize().height*0.83 - 5*this.cellSize.height));
        tableView.reloadData();

        this.addText(this,"num0",cc.p(339,537),"Người Chơi",fontRobotoBold.fontName,24);
        this.addText(this,"num1",cc.p(498,537),"Tiền Cược",fontRobotoBold.fontName,24);
        this.addText(this,"num2",cc.p(622,537),"Đánh Biên",fontRobotoBold.fontName,24);
        this.addText(this,"num3",cc.p(747,537),"Ké Cửa",fontRobotoBold.fontName,24);
        this.addText(this,"num4",cc.p(870,537),"Cược Gà",fontRobotoBold.fontName,24);
        this.addText(this,"num5",cc.p(990,537),"Tổng Kết",fontRobotoBold.fontName,24);
    },


    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
        this.tableView.setTouchEnabled(true);
        this.setFog(true);
    },

    setVisible: function(visible){
        BaseLayer.prototype.setVisible.call(this, visible);
        //this.tableView.setTouchEnabled(visible);
        //this.btnXacNhan.setTouchEnabled(visible);
        //cc.log("setVisible: " + visible);
    },

    reloadTable: function(){
        this.tableView.reloadData();
    },

    scrollViewDidScroll:function (view) {
    },

    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        var sprite = GuiUtil.createSprite(BaCay.res.endGameItemSlot);
        return cc.size(sprite.getBoundingBox().width*1.00, sprite.getBoundingBox().height*1.05);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();

        if (!cell) {
            cell = new BaBayItemContain();
        } else {

        }

        var player = this.data.listPlayerInGame[idx];
        var item = new BaCayEndGameItem(idx + 1, player.name, player.tongTienCuoc, player.tongDanhBien, player.tongKeCua, player.tongCuocGa, player.tongCuoiVan);

        cell.updateWithItem(item);
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.data.numPlayerInGame;
    },

    onButtonRelease: function(btn,id){
        switch (id)
        {
            case 1:
            {
                cc.log("button Xac nhat");
                this._layerColor.runAction(cc.fadeTo(.2,0));
                //var bg = ccui.Helper.seekWidgetByName(this,"bg");
                this.bg.setScale(1);
                this.bg.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(.2,1.2)),cc.fadeOut(.2)));
                if(!cc.sys.isNative){
                    this.runAction(cc.sequence(cc.delayTime(.2), cc.removeSelf()));
                }else{
                    this.runAction(cc.sequence(cc.delayTime(.2), cc.hide()));
                }

                break;
            }
        }
    },

    remove: function(){
        this.removeFromParent();
    }
})