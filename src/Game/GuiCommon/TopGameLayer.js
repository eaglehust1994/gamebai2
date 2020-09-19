//
TopGameItem = cc.Node.extend({
    ctor: function(){
        this._super();
        var font = fontArial;
        this.sizeBg = cc.size(100, 30);
        var lbName = new ccui.Text();
        lbName.setAnchorPoint(cc.p(0.5,0.5));
        lbName.setFontName(RobotoRegular.fontName);
        lbName.setFontSize(19);
        lbName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lbName.setColor(cc.color.WHITE);
        lbName.setColor({r:247, g:235, b:198});
        lbName.setString("KhanhThinh");
        lbName.setPosition(this.sizeBg.width*0.0, this.sizeBg.height*0.0);
        this.addChild(lbName);
        this.lbName = lbName;

        var lbWinThang = new ccui.Text();
        lbWinThang.setAnchorPoint(cc.p(0.5,0.5));
        lbWinThang.setFontName(RobotoRegular.fontName);
        lbWinThang.setFontSize(19);
        lbWinThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lbWinThang.setColor(cc.color("#000000"));
        lbWinThang.setString("88");
        lbWinThang.setPosition(this.sizeBg.width*2.0 + 10, this.sizeBg.height*0.0);
        this.addChild(lbWinThang);
        this.lbWinThang = lbWinThang;

        var lbTranThang = new ccui.Text();
        lbTranThang.setAnchorPoint(cc.p(0.5,0.5));
        lbTranThang.setFontName(RobotoRegular.fontName);
        lbTranThang.setFontSize(19);
        lbTranThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lbTranThang.setColor({r:247, g:235, b:198});
        lbTranThang.setString("88");
        lbTranThang.setPosition(this.sizeBg.width*2.0 + 205, this.sizeBg.height*0.0);
        this.addChild(lbTranThang);
        this.lbTranThang = lbTranThang;
    },

    updateWithItem: function(i, item, isVin, isMoney){
        this.lbName.setString(item.n);

        this.lbWinThang.setString(StringUtility.standartNumber(item.m));
        this.lbTranThang.setString(StringUtility.standartNumber(item.c));

        if(isVin){
            this.lbWinThang.setColor(cc.color("#E702FE"));
        }
        else{
            this.lbWinThang.setColor({r:247, g:235, b:198});
        }

        //this.lbTranThang.setString(item.c);
        this.setVisible(true);
    }
}),

TopGameLayer = BaseLayer.extend({
    ctor: function(){
        this._super("TopGame");
        //this.initWithBinaryFile("res/g_res_cardGame_json_TopGame.json");
        this.randType = MONEY_VIN;
        this.isWeek = 0; // 0 : day ; 1 : week ; 2 : month
        this.isMoney = true;
        this.cellSize= null;
        this.listContent = [];
    },

    createContent: function(){
        for(var i = 0; i < 10; i++){
            var topItem = new TopGameItem();
            this.listContent.push(topItem);
            topItem.setVisible(false);
            this.bg.addChild(topItem);
            topItem.setPosition(cc.p(this.startPos.x, this.startPos.y - 31*i));
        }
        this.reloadTable();
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
    },

    customizeGUI: function(){
        var winSize = GameScene.getMainContentSize();
        this.addLayout(this, "abcxyz", cc.p(640, 320), null, cc.size(1280, 720), !0);
        this.addImage(this, "bg", cc.p(640, 320),   "res/ResourceMenuTab/Mail/bgtab_mail.png", cc.size(701, 497));
        this.addImage(this.bg, "title", cc.p(350.5, 470.5), "res/Minigame/ImageChung/Title.png", cc.size(478, 62));
        this.addText(this.bg, "lb_title", cc.p(350.5, 476.5), "B\u1ea2NG X\u1ebeP H\u1ea0NG", UTMBebas.fontName, 34);
        this.lb_title.setColor(cc.color(162, 105, 64));
        this.addButton(this.bg, "btnClose_top", TopGameLayer.BTN_CLOSE_TOP, cc.p(670, 465.5), !0, res_Lobby + "/btnClose.png", res_Lobby + "/btnClose_s.png");
        
        this.addButton(this.bg, "btnDay", TopGameLayer.BTN_DAY, cc.p(133, 421.5), !0, res_Minigame_ImageChung + "/btn_thanhdu_s.png", res_Minigame_ImageChung + "/btn_thanhdu_s.png");
        this.btnDay.setContentSize(cc.size(170, 31));
        this.btnDay.ignoreContentAdaptWithSize(!1);
        this.addText(this.btnDay, "txt1", cc.p(90, 15), "XẾP HẠNG NGÀY", UTMBebas.fontName, 22);

        this.addButton(this.bg, "btnWeek", TopGameLayer.BTN_WEEK, cc.p(350, 421.5), !0, res_Minigame_ImageChung + "/btn_thanhdu.png", res_Minigame_ImageChung + "/btn_thanhdu_s.png");
        this.btnWeek.ignoreContentAdaptWithSize(!1);
        this.btnWeek.setContentSize(cc.size(170, 31));
        this.addText(this.btnWeek, "txt2", cc.p(90, 15), "XẾP HẠNG TUẦN", UTMBebas.fontName, 22);
        
        this.addButton(this.bg, "btnAll", TopGameLayer.BTN_ALL, cc.p(567, 421.5), !0, res_Minigame_ImageChung + "/btn_thanhdu.png", res_Minigame_ImageChung + "/btn_thanhdu_s.png");
        this.btnAll.ignoreContentAdaptWithSize(!1);
        this.btnAll.setContentSize(cc.size(170, 31));
        this.addText(this.btnAll, "txt3", cc.p(90, 15), "XẾP HẠNG THÁNG", UTMBebas.fontName, 22);

        this.addButton(this.bg, "btnVin", TopGameLayer.BTN_RANK_VIN, cc.p(187, 381), !0, Res.btnRankVinSelected, Res.btnRankVinUnselected);
        this.btnVin.setContentSize(cc.size(326, 31));
        this.addButton(this.bg, "btnXu", TopGameLayer.BTN_RANK_XU, cc.p(513, 381), !0, Res.btnRankXuUnselected, Res.btnRankXuSelected);
        this.btnXu.setContentSize(cc.size(326, 31));
        this.addImage(this.bg, "contentXepHang", cc.p(350, 188), "res/CardGame/CommonResource/ChonBan/tab_new.png", cc.size(650, 335));
        this.addText(this.bg, "sttXepHang", cc.p(60, 341.5), "STT", RobotoRegular.fontName, 18);
        this.sttXepHang.ignoreContentAdaptWithSize(!1);
        this.sttXepHang.setContentSize(cc.size(67, 21));
        this.sttXepHang.setColor(cc.color("#FFDF58"));
        this.sttXepHang.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.sttXepHang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.bg, "namXepHang", cc.p(195, 341.5), "T\u00e0i kho\u1ea3n", RobotoRegular.fontName, 18);
        this.namXepHang.ignoreContentAdaptWithSize(!1);
        this.namXepHang.setContentSize(cc.size(202, 21));
        this.namXepHang.setColor(cc.color("#FFDF58"));
        this.namXepHang.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.namXepHang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addText(this.bg, "startPos", cc.p(195, 313.5), "Hoang Khanh Thinh", RobotoRegular.fontName, 18);
        this.startPos.ignoreContentAdaptWithSize(!1);
        this.startPos.setContentSize(cc.size(161, 30));
        this.startPos.setColor(cc.color("#FFDF58"));
        this.startPos.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.startPos.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.startPos.setVisible(!1);
        this.addButton(this, "btnTienThang", TopGameLayer.BTN_WIN_MONEY, cc.p(698.5, 413.5), !0, "res/CardGame/CommonResource/ChonBan/btn_vin_win.png", "res/CardGame/CommonResource/ChonBan/btn_vin_win.png");
        this.btnTienThang.ignoreContentAdaptWithSize(!1);
        this.btnTienThang.setContentSize(cc.size(226, 27));
        this.btnTienThang.setPressedActionEnabled(!1);
        this.addText(this.btnTienThang, "lbTienThang", cc.p(0, 3), " VIN th\u1eafng", RobotoRegular.fontName, 18);
        this.lbTienThang.ignoreContentAdaptWithSize(!1);
        this.lbTienThang.setContentSize(cc.size(224, 21));
        this.lbTienThang.setColor(cc.color("#592500"));
        this.lbTienThang.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lbTienThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.lbTienThang.setAnchorPoint(0, 0);
        this.addButton(this, "btnTranTrang", TopGameLayer.BTN_WIN_NUMBER, cc.p(887.5, 413.5), !0, "res/CardGame/CommonResource/ChonBan/btn_number_win_s.png", "res/CardGame/CommonResource/ChonBan/btn_number_win.png");
        this.btnTranTrang.ignoreContentAdaptWithSize(!1);
        this.btnTranTrang.setContentSize(cc.size(155, 27));
        this.btnTranTrang.setPressedActionEnabled(!1);
        this.addText(this.btnTranTrang, "lbTranThang", cc.p(0, 3), "Tr\u1eadn th\u1eafng", RobotoRegular.fontName, 18);
        this.lbTranThang.ignoreContentAdaptWithSize(!1);
        this.lbTranThang.setContentSize(cc.size(154, 21));
        this.lbTranThang.setColor(cc.color("#FFDF58"));
        this.lbTranThang.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this.lbTranThang.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.lbTranThang.setAnchorPoint(0, 0);
        this.txt1.setColor(cc.color.WHITE);
        this.txt2.setColor(cc.color.GRAY);
        this.txt3.setColor(cc.color.GRAY);
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
            case TopGameLayer.BTN_DAY:
                if(this.isWeek != 0) {
                    this.isWeek = 0;
                    this.reloadTable();
                    this.btnDay.loadTextures(Res.btnXepHangSelected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.btnWeek.loadTextures(Res.btnXepHangMidUnselected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
                    this.btnAll.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.txt1.setColor(cc.color.WHITE);
                    this.txt2.setColor(cc.color.GRAY);
                    this.txt3.setColor(cc.color.GRAY);
                }
                break;
            case TopGameLayer.BTN_WEEK:
                if(this.isWeek != 1) {
                    this.isWeek = 1;
                    this.reloadTable();
                    this.btnDay.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.btnWeek.loadTextures(Res.btnXepHangMidSelected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
                    this.btnAll.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.txt1.setColor(cc.color.GRAY);
                    this.txt2.setColor(cc.color.WHITE);
                    this.txt3.setColor(cc.color.GRAY);
                }
                break;
            case TopGameLayer.BTN_ALL:
                if(this.isWeek != 2) {
                    this.isWeek = 2;
                    this.reloadTable();
                    this.btnDay.loadTextures(Res.btnXepHangUnselected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.btnWeek.loadTextures(Res.btnXepHangMidUnselected, Res.btnXepHangMidSelected, Res.btnXepHangMidUnselected);
                    this.btnAll.loadTextures(Res.btnXepHangSelected, Res.btnXepHangSelected, Res.btnXepHangUnselected);
                    this.txt1.setColor(cc.color.GRAY);
                    this.txt2.setColor(cc.color.GRAY);
                    this.txt3.setColor(cc.color.WHITE);
                }
                break;
            case TopGameLayer.BTN_WIN_MONEY:
                if(this.isMoney == false){
                    this.isMoney = true;
                    this.reloadTable();
                    this.btnTienThang.loadTextures(Res.vinWinSelect, Res.vinWinSelect, Res.vinWinUnselect);
                    this.btnTranTrang.loadTextures(Res.numWinUnselect, Res.numWinSelect, Res.numWinUnselect);
                }
                this.updateColorTienThang();
                break;
            case TopGameLayer.BTN_WIN_NUMBER:
                if(this.isMoney == true){
                    this.isMoney = false;
                    this.reloadTable();
                    this.btnTienThang.loadTextures(Res.vinWinUnselect, Res.vinWinSelect, Res.vinWinUnselect);
                    this.btnTranTrang.loadTextures(Res.numWinSelect, Res.numWinSelect, Res.numWinUnselect);
                }
                this.updateColorTienThang();
                break;
            case TopGameLayer.BTN_CLOSE_TOP:
                this.setVisible(false);
                break;
        }
    },

    updateColorTienThang: function(){
        if(this.isMoney){
            //this.lbTienThang.setColor(cc.color("#FFDF58"));
            //this.lbTranThang.setColor(cc.color("#FFDF58"));
        }
        else{
            //this.lbTienThang.setColor(cc.color("#FFDF58"));
            //this.lbTranThang.setColor(cc.color("#FFDF58"));
        }
    },


    touchBtnTab: function(id){
        if(id == TopGameLayer.BTN_RANK_VIN){
            this.btnVin.loadTextures(Res.btnRankVinSelected, Res.btnRankVinSelected, Res.btnRankVinUnselected);
            this.btnXu.loadTextures(Res.btnRankXuUnselected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
            if(gameLobbyInstance.type_topxh != MONEY_VIN) {
                gameLobbyInstance.type_topxh = MONEY_VIN;
                this.randType = MONEY_VIN;
                gameWsClient.sendTopServer(gameLobbyInstance.type_topxh);
                this.lbTienThang.setString("VIN Thắng");
            }
        }
        else if(id == TopGameLayer.BTN_RANK_XU){
            this.btnVin.loadTextures(Res.btnRankVinUnselected, Res.btnRankVinSelected, Res.btnRankVinSelected);
            this.btnXu.loadTextures(Res.btnRankXuSelected, Res.btnRankXuUnselected, Res.btnRankXuUnselected);
            if(gameLobbyInstance.type_topxh != MONEY_XU) {
                gameLobbyInstance.type_topxh = MONEY_XU;
                this.randType = MONEY_XU;
                gameWsClient.sendTopServer(gameLobbyInstance.type_topxh);
                this.lbTienThang.setString("XU Thắng");
            }
        }
    },

    reloadTable: function(){
        if(this.randType == MONEY_VIN){
            if(this.isWeek == 0){
                if(this.isMoney){
                    this.topList = gameData.topDayVin_money;
                }
                else{
                    this.topList = gameData.topDayVin_number;
                }
            }else if(this.isWeek == 1){
                if(this.isMoney){
                    cc.log("vin thang + tuan");
                    this.topList = gameData.topWeekVin_money;
                }
                else{
                    cc.log("tran vin thang + tuan");
                    this.topList = gameData.topWeekVin_number;
                }
            }else{
                if(this.isMoney){
                    this.topList = gameData.topMonthVin_money;
                }
                else{
                    this.topList = gameData.topMonthVin_number;
                }
            }
        }else{
            if(this.isWeek == 0){
                if(this.isMoney){
                    this.topList = gameData.topDayXu_money;
                }
                else{
                    this.topList = gameData.topDayXu_number;
                }
            }else if(this.isWeek == 1){
                if(this.isMoney){
                    cc.log("xu thang + tuan");
                    this.topList = gameData.topWeekXu_money;
                }
                else{
                    cc.log("tran xu thang + tuan");
                    this.topList = gameData.topWeekXu_number;
                }
            }else{
                if(this.isMoney){
                    this.topList = gameData.topMonthXu_money;
                }
                else{
                    this.topList = gameData.topMonthXu_number;
                }
            }
        }
        

        for(var i = 0; i < 10; i++) {
            if( i < this.topList.length){
                this.listContent[i].setVisible(true);
                if(this.randType == MONEY_VIN) {
                    if(this.isMoney){
                        this.listContent[i].updateWithItem(i, this.topList[i], true, true);
                    }
                    else{
                        this.listContent[i].updateWithItem(i, this.topList[i], true, false);
                    }

                }
                else{
                    if(this.isMoney){
                        this.listContent[i].updateWithItem(i, this.topList[i], false, true);
                    }
                    else{
                        this.listContent[i].updateWithItem(i, this.topList[i], false, false);
                    }
                }
            }else {
                this.listContent[i].setVisible(false);
            }
        }
    }
});

TopGameLayer.BTN_RANK_VIN = 1001;
TopGameLayer.BTN_RANK_XU = 1002;
TopGameLayer.BTN_WEEK = 1003;
TopGameLayer.BTN_ALL = 1004;
TopGameLayer.BTN_WIN_MONEY = 1005;
TopGameLayer.BTN_WIN_NUMBER = 1006;
TopGameLayer.BTN_CLOSE_TOP = 1007;
TopGameLayer.BTN_DAY = 1008;