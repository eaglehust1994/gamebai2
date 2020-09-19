var history_tranfer = null;
var history_tranferX = null; var history_tranferY = null;
var history_tranferAppear = null;

var code_history_tranfer = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_lich_su_giao_dich = null;
            /// panel lich su giao dich
            this.btn_close_lsgd = null; this.sp_choi_vin = null; this.sp_choi_xu = null; this.sp_nap_vin = null; this.sp_nap_xu = null;
            this.sp_tieu_vin = null; this.btn_choi_vin = null; this.btn_choi_xu = null; this.btn_nap_vin = null; this.btn_nap_xu = null;
            this.btn_tieu_vin = null; this.pn_button = null;
            this.lb_currentpage = null;
            this.btn_backall = null; this.btn_back = null; this.btn_next = null; this.btn_next_all = null;
            this.page_lsgd1 = 1; this.page_lsgd2 = 2; this.page_lsgd3 = 3; this.page_lsgd4 = 4; this.page_max = 0; this.current_page = 1;
            this.totalpage = null;
            this.lv_lichsu_user = null;
            this.pn_chitiet = null;
            this.btn_close_chitiet = null;
            this.txt_maGD = null;
            this.txt_timeGD = null;
            this.txt_dichvu = null;
            this.txt_phatsinh = null;
            this.txt_sodu = null;
            this.txt_mota = null;
            this.arrLichSu = [];
            this.kind = 1;

            this._super("code_history_tranfer");
            this.initWithBinaryFile("res/history_tranfer.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_lich_su_giao_dich = this._layout.getChildByName("pn_lich_su_giao_dich");
            /// panel lich su giao dich
            this.btn_close_lsgd = this.customButton("btn_close_lsgd",code_history_tranfer.BTN_CLOSE_LSGD,this.pn_lich_su_giao_dich);
            this.sp_choi_vin = this.pn_lich_su_giao_dich.getChildByName("sp_choi_vin"); this.sp_choi_xu = this.pn_lich_su_giao_dich.getChildByName("sp_choi_xu");
            this.sp_nap_vin = this.pn_lich_su_giao_dich.getChildByName("sp_nap_vin"); this.sp_nap_xu = this.pn_lich_su_giao_dich.getChildByName("sp_nap_xu");
            this.sp_tieu_vin = this.pn_lich_su_giao_dich.getChildByName("sp_tieu_vin"); this.pn_button = this.getControl("pn_button",this.pn_lich_su_giao_dich);
            this.btn_choi_vin = this.customButton("btn_choi_vin",code_history_tranfer.BTN_LSGD_CHOIVIN,this.pn_lich_su_giao_dich);
            this.btn_choi_xu = this.customButton("btn_choi_xu",code_history_tranfer.BTN_LSGD_CHOIXU,this.pn_lich_su_giao_dich);
            this.btn_nap_vin = this.customButton("btn_nap_vin",code_history_tranfer.BTN_LSGD_NAPVIN,this.pn_lich_su_giao_dich);
            this.btn_nap_xu = this.customButton("btn_nap_xu",code_history_tranfer.BTN_LSGD_NAPXU,this.pn_lich_su_giao_dich);
            this.btn_tieu_vin = this.customButton("btn_tieu_vin",code_history_tranfer.BTN_LSGD_TIEUVIN,this.pn_lich_su_giao_dich);
            this.lb_currentpage = this.getControl("lb_currentpage",this.pn_button);
            this.btn_backall = this.customButton("btn_backall",code_history_tranfer.BTN_LSGD_BACKALL,this.pn_button);  this.btn_back = this.customButton("btn_back",code_history_tranfer.BTN_LSGD_BACK,this.pn_button);
            this.btn_next_all = this.customButton("btn_next_all",code_history_tranfer.BTN_LSGD_NEXTALL,this.pn_button);  this.btn_next = this.customButton("btn_next",code_history_tranfer.BTN_LSGD_NEXT,this.pn_button);

            this.lv_lichsu_user = this.getControl("lv_lichsu_user",this.pn_lich_su_giao_dich);
            this.lv_lichsu_user.setTouchEnabled(true);
            this.lv_lichsu_user.setClippingEnabled(true);
            this.lv_lichsu_user.setScrollBarEnabled(false);

            this.pn_chitiet = this.getControl("pn_chitiet",this.pn_lich_su_giao_dich);
            this.btn_close_chitiet = this.customButton("btn_close_chitiet",code_history_tranfer.BTN_CLOSE_CHITIET_LS,this.pn_chitiet);
            this.txt_maGD = this.getControl("txt_maGD",this.pn_chitiet);
            this.txt_timeGD = this.getControl("txt_timeGD",this.pn_chitiet);
            this.txt_dichvu = this.getControl("txt_dichvu",this.pn_chitiet);
            this.txt_phatsinh = this.getControl("txt_phatsinh",this.pn_chitiet);
            this.txt_sodu = this.getControl("txt_sodu",this.pn_chitiet);
            this.txt_mota = this.getControl("txt_mota",this.pn_chitiet);
            this.pn_chitiet.setScale(0);

            this.pn_lich_su_giao_dich.setVisible(false);
            this.pn_lich_su_giao_dich.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showhistory_tranfer)));
        },
        showhistory_tranfer : function () {
            history_tranfer.pn_lich_su_giao_dich.setVisible(true);
            history_tranfer.pn_lich_su_giao_dich.runAction(cc.scaleTo(0.2,1));
        },

        onButtonRelease: function(button,id) {
            switch (id) {
                case code_history_tranfer.BTN_CLOSE_LSGD:
                    closehistory_tranfer();
                    break;
                case code_history_tranfer.BTN_LSGD_CHOIVIN:
                    if(this.kind != 1) {
                        this.reset_sprite_button_lichsu();
                        this.kind = 1;
                        this.callServer_withKind(this.kind);
                        history_tranfer.sp_choi_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_CHOIXU:
                    if(this.kind != 2) {
                        this.reset_sprite_button_lichsu();
                        this.kind = 2;
                        this.callServer_withKind(this.kind);
                        history_tranfer.sp_choi_xu.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_NAPVIN:
                    if(this.kind != 3) {
                        this.reset_sprite_button_lichsu();
                        this.kind = 3;
                        this.callServer_withKind(this.kind);
                        history_tranfer.sp_nap_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_NAPXU:
                    if(this.kind != 4) {
                        this.reset_sprite_button_lichsu();
                        this.kind = 4;
                        this.callServer_withKind(this.kind);
                        history_tranfer.sp_nap_xu.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid.png");
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_TIEUVIN:
                    if(this.kind != 5) {
                        this.reset_sprite_button_lichsu();
                        this.kind = 5;
                        this.callServer_withKind(this.kind);
                        history_tranfer.sp_tieu_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_BACKALL:
                    if(this.current_page != 1) {
                        this.current_page = 1;
                        this.parserDataLichSuUser(this.kind);
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_BACK:
                    if(this.current_page >= 2) {
                        this.current_page = this.current_page - 1;
                        this.parserDataLichSuUser(this.kind);
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_NEXT:
                    if(this.current_page < this.page_max) {
                        this.current_page = this.current_page + 1;
                        this.parserDataLichSuUser(this.kind);
                    }
                    break;
                case code_history_tranfer.BTN_LSGD_NEXTALL:
                    if(this.current_page != this.page_max) {
                        this.current_page = this.page_max;
                        this.parserDataLichSuUser(this.kind);
                    }
                    break;
                case code_history_tranfer.BTN_CLOSE_CHITIET_LS:
                    this.pn_chitiet.runAction(cc.scaleTo(0.2,0));
                    break;
            }
        },

        reset_sprite_button_lichsu : function () {
            history_tranfer.sp_choi_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang_s.png");
            history_tranfer.sp_choi_xu.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            history_tranfer.sp_nap_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            history_tranfer.sp_nap_xu.setTexture("res/ResourceMenuTab/BaoMat/btn_5_mid_s.png");
            history_tranfer.sp_tieu_vin.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang_s.png");
        },
        callServer_withKind : function (kind){
            this.current_page = 1;
            this.parserDataLichSuUser(kind);
        },

        addLoading : function(){
            if(this.pn_lich_su_giao_dich.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(640.3,329.85));
                loading.setName("loadingdata");
                this.pn_lich_su_giao_dich.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_lich_su_giao_dich.getChildByName("loadingdata").setVisible(true);
                this.pn_lich_su_giao_dich.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_lich_su_giao_dich.getChildByName("loadingdata").stopAllActions();
            this.pn_lich_su_giao_dich.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            this.closeLoading();
        },

        parserDataLichSuUser: function(kind)
        {
            var url = urlLichSuUser(lobby.userInfo.nickname,kind,this.current_page, lobby.userInfo.accessToken);
            //cc.log("url " + url);
            sendRequest(url,null,false,history_tranfer.callBackLichSuUser,history_tranfer.callBackError);
            history_tranfer.addLoading();
        },
        callBackLichSuUser:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(history_tranfer.arrLichSu!=null)
                    while(history_tranfer.arrLichSu.length > 0) {
                        history_tranfer.arrLichSu.pop();
                    }

                var LichSuUser = jsonData["transactions"];
                if(LichSuUser == ""){
                    history_tranfer.closeLoading();
                }
                for (var i = 0; i < LichSuUser.length; i++) {
                    var counter = LichSuUser[i];
                    history_tranfer.arrLichSu.push(counter);

                }
                history_tranfer.reload_Banglichsu();
            }
            if(jsonData["totalPages"] > 1000)
                history_tranfer.page_max = 1000;
            else
                history_tranfer.page_max = jsonData["totalPages"];
            history_tranfer.lb_currentpage.setString(history_tranfer.current_page + "/"+ history_tranfer.page_max);
        },

        reload_Banglichsu:function()
        {
            this.lv_lichsu_user.removeAllItems();
            this.lv_lichsu_user.removeAllChildren();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            //cc.log("lengh : " + this.arrLichSu.length);
            for(var i = 0; i<this.arrLichSu.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_lichsu_user.width;
                cellList.setPosition(cc.p(0,0));
                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                //cellList.setClippingEnabled(true);
                if(i % 2 == 1)
                {
                    cellList.setBackGroundColor(cc.color("#39489E"));
                }else
                {
                    cellList.setBackGroundColor(colorBgCell2);
                }
                var lbmagd =  new cc.LabelTTF('',  fonts.fontName, 12, cc.size(117,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmagd.setPosition(cc.p(58.32,positionY));
                lbmagd.setString(history_tranfer.arrLichSu[i].transId);
                lbmagd.setColor(cc.color("#e8daad"));

                var lbtime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(162,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtime.setPosition(cc.p(198.44,positionY));
                lbtime.setString(Minigame.formatDateTime(history_tranfer.arrLichSu[i].transactionTime));
                lbtime.setColor(cc.color("#e8daad"));

                var lbdichvu =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(162,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdichvu.setPosition(cc.p(360.72,positionY));
                lbdichvu.setString(history_tranfer.arrLichSu[i].serviceName);
                lbdichvu.setColor(cc.color("#e8daad"));

                var lbphatsinh =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(96,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbphatsinh.setPosition(cc.p(495.97,positionY));
                var st = history_tranfer.arrLichSu[i].moneyExchange;
                if(parseInt(st)<0) {
                    st = -st;
                    lbphatsinh.setString("-" + formatMoney(0,3,parseInt(st)));
                }else
                    lbphatsinh.setString(formatMoney(0,3,parseInt(st)));


                var lbsodu =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(96,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbsodu.setPosition(cc.p(603.55,positionY));
                lbsodu.setString(formatMoney(0,3,parseInt(history_tranfer.arrLichSu[i].currentMoney)));

                var lbmota =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(218,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbmota.setPosition(cc.p(767.27,positionY));
                var str = history_tranfer.arrLichSu[i].description;
                lbmota.setString(str);
                lbmota.setColor(cc.color("#e8daad"));

                if(str.length >= 25){
                    lbmota.setString(str.substr(0,25)+"...");

                    var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/lichsugiaodich/btn_xemchitiet.png");
                    button.setPosition(cc.p(935.46,positionY));
                    button.setName(i);

                    cellList.addChild(button);

                    button.addTouchEventListener(function(sender,type){
                        switch (type){
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_giaodich(sender.name);
                                break;
                        }

                    },this);
                }

                if(this.kind == 1 || this.kind == 3 || this.kind == 5){
                    lbphatsinh.setColor(cc.color("#E702FE"));
                    lbsodu.setColor(cc.color("#E702FE"));
                }else{
                    lbphatsinh.setColor(cc.color("#c0c1c3"));
                    lbsodu.setColor(cc.color("#c0c1c3"));
                }

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(117.50,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(279.86,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(441.50,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(549.53,positionY + 3));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(657.93,positionY + 3));

                var aSprite6 = new cc.Sprite();
                aSprite6.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite6.setScaleY(1); aSprite6.setScaleX(2);
                aSprite6.setPosition(cc.p(876.36,positionY + 3));

                cellList.addChild(lbmagd);
                cellList.addChild(lbtime);
                cellList.addChild(lbdichvu);
                cellList.addChild(lbphatsinh);
                cellList.addChild(lbsodu);
                cellList.addChild(lbmota);
                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3);
                cellList.addChild(aSprite4); cellList.addChild(aSprite5); cellList.addChild(aSprite6);

                this.lv_lichsu_user.pushBackCustomItem(cellList);
                this.closeLoading();
            }
        },

        detail_giaodich : function (value){
            this.pn_chitiet.runAction(cc.scaleTo(0.2,1));
            this.txt_maGD.setString(history_tranfer.arrLichSu[value].transId);
            this.txt_timeGD.setString(Minigame.formatDateTime(history_tranfer.arrLichSu[value].transactionTime));
            this.txt_dichvu.setString(history_tranfer.arrLichSu[value].serviceName);
            var st = history_tranfer.arrLichSu[value].moneyExchange;
            if(parseInt(st)<0) {
                st = -st;
                this.txt_phatsinh.setString("-" + formatMoney(0,3,parseInt(st)));
            }else
                this.txt_phatsinh.setString(formatMoney(0,3,parseInt(st)));
            this.txt_sodu.setString(formatMoney(0,3,parseInt(history_tranfer.arrLichSu[value].currentMoney)));
            var str = history_tranfer.arrLichSu[value].description;
            var str2 = str.split(',');
            var noidung = " ";
            //cc.log("length : " + str2.length);
            //cc.log("giatri : " + str2[0]);
            for (var i = 0; i < str2.length; i ++){
                noidung = noidung + str2[i] + "\n";
            }
            this.txt_mota.setString(noidung);
            if(this.kind == 1 || this.kind == 3 || this.kind == 5){
                this.txt_phatsinh.setColor(cc.color("#E702FE"));
                this.txt_sodu.setColor(cc.color("#E702FE"));
            }else{
                this.txt_phatsinh.setColor(cc.color("#c0c1c3"));
                this.txt_sodu.setColor(cc.color("#c0c1c3"));
            }
        }
    }
);
// panel lich su giao dich
code_history_tranfer.BTN_CLOSE_LSGD = 1;
code_history_tranfer.BTN_LSGD_CHOIVIN = 2; code_history_tranfer.BTN_LSGD_CHOIXU = 3; code_history_tranfer.BTN_LSGD_NAPVIN = 4; code_history_tranfer.BTN_LSGD_NAPXU = 5; code_history_tranfer.BTN_LSGD_TIEUVIN = 6;
code_history_tranfer.BTN_LSGD_BACKALL = 7; code_history_tranfer.BTN_LSGD_BACK = 8; code_history_tranfer.BTN_LSGD_NEXTALL = 9; code_history_tranfer.BTN_LSGD_NEXT = 10;
code_history_tranfer.BTN_CLOSE_CHITIET_LS = 11;


openhistory_tranfer = function () {
    if (history_tranfer === null) {
        history_tranfer = new code_history_tranfer();
        history_tranferX = history_tranfer.getPosition().x;
        history_tranferY = history_tranfer.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(history_tranfer,BaseScene.INDEX_INFO_GUI, 0);
    }
    else
    {
        history_tranfer.pn_lich_su_giao_dich.runAction(cc.scaleTo(0.2,1));
        history_tranfer.setTag(0);
    }
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    history_tranferAppear = true;
    history_tranfer.parserDataLichSuUser(history_tranfer.kind);
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closehistory_tranfer = function () {
    if (history_tranfer === null) {
        return;
    }
    if(history_tranferAppear) {
        this.current_page = 1;
        history_tranfer.pn_lich_su_giao_dich.runAction(cc.scaleTo(0.2,0));
        history_tranferAppear = false;
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
