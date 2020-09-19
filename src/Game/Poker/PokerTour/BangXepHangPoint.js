


BangXepHangPointCell = cc.TableViewCell.extend({
    ctor: function(){
        this._super();
        //var i = 0;
        //this.items = [];
        //
        //var _layout = new ccui.Button();
        //_layout.loadTextures(Res.imageCenterVinEnabled, Res.imageCenterVinEnabled, Res.imageCenterVinEnabled);
        //_layout.anchorX = 0.0;
        //_layout.anchorY = 0.0;
        //_layout.x = 0;
        //_layout.y = 0;
        //var sizeBg = _layout.getContentSize();
        //_layout.setPosition(0, sizeBg.height*(1.2*(1-i) + 0.15));
        //
        //this.addChild(_layout);
        //this.items.push(_layout);

        var im = new cc.Sprite("res/CardGame/PokerTour/poker/bangxephangpoint/bangxephang-11.png");
        im.setAnchorPoint(cc.p(0,0));
        im.setPosition(0, 0);
        this.addChild(im);

        //var fonts = fontArial;
        //var lb2 = new ccui.Text();
        //lb2.setAnchorPoint(cc.p(0.5,0.5));
        //lb2.setFontName(fonts.fontName);
        //lb2.setFontSize(50);
        //lb2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        ////lb2.setColor({r:116, g: 62, b: 4});
        //lb2.setColor(cc.color.WHITE);
        //lb2.setString("what the hell");
        //lb2.setPosition(sizeBg.width/2, sizeBg.height*0.75);
        //_layout.addChild(lb2);
        //
        //this.items[i].moneyBet = lb2;
        //
        //var lb3 = new ccui.Text();
        //lb3.setAnchorPoint(cc.p(0.0,0.5));
        //lb3.setFontName(fonts.fontName);
        //lb3.setFontSize(28);
        //lb3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        //lb3.setColor(cc.color.WHITE);
        //lb3.setString("what the hell");
        //lb3.setPosition( sizeBg.width*0.39, sizeBg.height*0.12);
        //_layout.addChild(lb3);
        //this.items[i].nPerson = lb3;
    },

    onEnter: function()
    {
        cc.TableViewCell.prototype.onEnter.call(this);
    },

    updateWithItem: function(item1, item2, type, gameType){
        this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet));
        if(gameType == GameList.Poker){
            this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet) + "/" + this.getMoneyString(item1.moneyBet*2));
            this.items[0].moneyBet.setFontSize(30);
            this.items[1].moneyBet.setString("" + this.getMoneyString(item2.moneyBet) + "/" + this.getMoneyString(item2.moneyBet*2));
            this.items[1].moneyBet.setFontSize(30);
        }
        else{
            this.items[0].moneyBet.setString("" + this.getMoneyString(item1.moneyBet));
            this.items[0].moneyBet.setFontSize(50);
            this.items[1].moneyBet.setString("" + this.getMoneyString(item2.moneyBet));
            this.items[1].moneyBet.setFontSize(50);
        }

        this.items[0].nPerson.setString("" + item1.nPerson);
        if(type == 1){
            this.items[0].moneyBet.setColor({r:109, g:73, b:21});
        }
        else{
            this.items[0].moneyBet.setColor({r:255, g:255, b:255});
        }

        this.items[1].nPerson.setString("" + item2.nPerson);

        if(type == 1){
            this.items[1].moneyBet.setColor({r:109, g:73, b:21});
        }
        else{
            this.items[1].moneyBet.setColor({r:255, g:255, b:255});
        }
    },

    getMoneyString: function(num){
        if(num < 1000){
            return "" + num;
        }else if(num < 1000000){
            return "" + Math.floor(num/1000) + "K";
        }else {
            return "" + Math.floor(num / 1000000) + "M";
        }
    }

})

BangXepHangPoint = BaseLayer.extend({
    ctor: function(){
        this._super("BangXepHangPoint");
        this.initWithBinaryFile("res/g_res_cardGame_json_BangXepHangPointPokerTour.json");
        this.bangXepHangList = [];
        this.fakeList();
    },

    fakeList: function(){
        for(var i  = 0; i < 15; i++){
            this.bangXepHangList.push(new XepHangItem("Canhpv" + i, 200));
        }
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
    },


    customizeGUI: function(){
        this.bg = ccui.helper.seekWidgetByName(this._layout, "bg");
        this.btnHide = this.customizeButton("btnHide", BangXepHangPoint.BTN_HIDE, this.bg, true)
        this.btnNgay =  this.customButton("btnNgay", BangXepHangPoint.BTN_NGAY, this.bg, false);
        this.btnTuan = this.customButton("btnTuan", BangXepHangPoint.BTN_TUAN, this.bg, false);
        this.btnThang = this.customButton("btnThang", BangXepHangPoint.BTN_THANG, this.bg, false);
        this.btnNam = this.customButton("btnNam",BangXepHangPoint.BTN_NAM, this.bg, false);
        this.setVisible(false);

        var chanelSelect = ccui.helper.seekWidgetByName(this.bg, "pn_table");
        var sizeTable = chanelSelect.getContentSize();
        var tableView = new cc.TableView(this, cc.size(sizeTable.width, sizeTable.height));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(cc.p(chanelSelect.getPosition().x , chanelSelect.getPositionY()));
        tableView.setDelegate(this);
        this.tableView = tableView;
        this.bg.addChild(tableView);
        tableView.reloadData();

        //this.updateBangXepHang();
    },

    show: function(){
        if(this.isShow){
            return;
        }
        else{
            this.isShow = true;
            this.bg.setScale(0.1);
            this.bg.runAction(cc.scaleTo(0.3, 1, 1));
            this.setVisible(true);
        }
    },

    hide: function(){
        this.isShow = false;
        this.bg.runAction(cc.sequence(cc.scaleTo(0.3, 0, 0)));
        this.runAction(cc.sequence(cc.delayTime(0.29), cc.hide()));
    },

    onButtonRelease: function(btn, id){
        switch(id){
            case BangXepHangPoint.BTN_HIDE:
                this.hide();
                break;
        }
    },

    callBackGetBangXephang: function(response){
        // do something
    },


    reloadTable: function(){
        this.tableView.reloadData();
    },

    scrollViewDidScroll:function (view) {
    },

    scrollViewDidZoom:function (view) {
    },

    tableCellSizeForIndex:function (table, idx) {
        var sprite = new cc.Sprite("res/CardGame/PokerTour/poker/bangxephangpoint/bangxephang-11.png");
        return cc.size(sprite.getBoundingBox().width*1.0, sprite.getBoundingBox().height*1.0);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new BangXepHangPointCell();
        } else {

        }
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.bangXepHangList.length;
    }

});


BangXepHangPoint.BTN_HIDE = 1000;
BangXepHangPoint.BTN_NGAY = 1001;
BangXepHangPoint.BTN_TUAN = 1002;
BangXepHangPoint.BTN_THANG = 1003;
BangXepHangPoint.BTN_NAM = 1004;
