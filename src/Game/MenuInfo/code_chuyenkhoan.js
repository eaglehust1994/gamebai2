var chuyenkhoan = null;
var chuyenkhoanX = null; var chuyenkhoanY = null;
var chuyenkhoanAppear = null;

var code_chuyenkhoan = BaseLayer.extend(
    {
        ctor: function () {
            //// chuyenkhoan
            this.pn_chuyen_khoan = null;
            // panel chuyen khoan
            this.lb_so_du_vin = null; this.tf_nickname = null; this.tf_nickname_again = null; this.tf_so_vin_chuyen =null; this.lb_vin_nhan_duoc = null;
            this.tf_ly_do = null; this.sp_ma_capcha =null;
            this.btn_daily = null; this.btn_tiep_tuc = null;
            this.pn_dai_ly = null; this.pn_quy_dinh = null; this.btn_back_ck = null;
            this.save_nickname = ""; this.save_money = 0; this.save_description = "";

            this.btn_close_chuyenkhoan = null;
            this.lb_phigiaodich = null;
            this.lb_quydinh_chuyenkhoan = null;
            this.isfirstChuyenKhoan = false;
            this.arrDaiLy = [];

            this.panel_dai_ly = null;
            this.btn_close_daily = null;

            this._super("code_chuyenkhoan");
            this.initWithBinaryFile("res/ChuyenKhoan.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_chuyen_khoan = this._layout.getChildByName("pn_chuyen_khoan");
            this.pn_chuyen_khoan.setScale(0);
            this.pn_chuyen_khoan.setVisible(false);

            this.panel_dai_ly = this._layout.getChildByName("panel_dai_ly");
            this.panel_dai_ly.setScale(0);
            this.panel_dai_ly.setVisible(false);

            this.lb_phigiaodich = this.getControl("lb_phigiaodich",this.pn_chuyen_khoan);
            this.lb_phigiaodich.setString((100 - Number(lobby.radio_tranfer*100)) + "%");
            // panel chuyen khoan
            this.lb_so_du_vin = this.getControl("lb_so_du_vin",this.pn_chuyen_khoan);
            this.tf_nickname = this.getControl("tf_nickname",this.pn_chuyen_khoan);
            this.tf_nickname_again = this.getControl("tf_nickname_again",this.pn_chuyen_khoan);
            this.tf_so_vin_chuyen = this.getControl("tf_so_vin_chuyen",this.pn_chuyen_khoan); this.lb_vin_nhan_duoc = this.getControl("lb_vin_nhan_duoc",this.pn_chuyen_khoan);
            this.tf_ly_do = this.getControl("tf_ly_do",this.pn_chuyen_khoan);
            this.sp_ma_capcha = this.pn_chuyen_khoan.getChildByName("sp_ma_capcha");
            this.pn_dai_ly = this.getControl("pn_dai_ly",this.panel_dai_ly);  this.pn_quy_dinh = this.getControl("pn_quy_dinh",this.pn_chuyen_khoan);
            this.lb_tranfer_min = this.getControl("lb_tranfer_min",this.pn_quy_dinh);
            this.lv_daily = this.pn_dai_ly.getChildByName("lv_daily");
            this.lb_check_daily = this.pn_chuyen_khoan.getChildByName("lb_check_daily"); this.lb_check_daily.setVisible(false);
            this.lv_daily.setTouchEnabled(true);
            this.lv_daily.setClippingEnabled(true);
            this.lv_daily.setScrollBarEnabled(false);

            this.btn_close_daily = this.customButton("btn_close_daily",code_chuyenkhoan.BTN_CLOSE_DAILY,this.panel_dai_ly);

            this.btn_daily = this.customButton("btn_daily",code_chuyenkhoan.BTN_CHUYENKHOAN_DAILY,this.pn_chuyen_khoan);
            this.btn_back_ck = this.customButton("btn_back_ck",code_chuyenkhoan.BTN_CHUYENKHOAN_BACK,this.pn_chuyen_khoan);
            this.btn_close_chuyenkhoan = this.customButton("btn_close_chuyenkhoan",code_chuyenkhoan.BTN_CLOSE_ALL_CHUYENKHOAN,this.pn_chuyen_khoan);
            this.btn_tiep_tuc = this.customButton("btn_tiep_tuc",code_chuyenkhoan.BTN_CHUYENKHOAN_TIEPTUC,this.pn_chuyen_khoan);
            this.btn_clear_nickname_ck = this.customButton("btn_clear_nickname_ck",code_chuyenkhoan.BTN_CLEAR_NICKNAME_CK,this.pn_chuyen_khoan);
            this.btn_clear_nickname_again_ck = this.customButton("btn_clear_nickname_again_ck",code_chuyenkhoan.BTN_CLEAR_NICKNAME_AGAIN_CK,this.pn_chuyen_khoan);
            this.btn_clear_lydo = this.customButton("btn_clear_lydo",code_chuyenkhoan.BTN_CLEAR_LYDO,this.pn_chuyen_khoan);
            this.btn_clear_nickname_ck.setVisible(false);
            this.btn_clear_nickname_again_ck.setVisible(false);
            this.btn_clear_lydo.setVisible(false);

            this.lb_quydinh_chuyenkhoan = this.getControl("lb_quydinh_chuyenkhoan",this.pn_quy_dinh);
            this.lb_quydinh_chuyenkhoan.setString("_Giá trị giao dịch tối thiểu: \n\n" +
                "_Chi phí giao dịch là :  "+ (100 - Number(lobby.radio_tranfer*100))+"% giá trị chuyển khoản (làm tròn lên).\n\n" +
                "_Không giới hạn giá trị giao dịch tối đa và số lần giao dịch trong ngày");

            if (cc.sys.os == cc.sys.OS_IOS || !cc.sys.isNative) {
                this.tf_nickname = menutab.changeTextFieldAsEditBox(this.tf_nickname, this.pn_chuyen_khoan);
                this.tf_nickname_again = menutab.changeTextFieldAsEditBox(this.tf_nickname_again, this.pn_chuyen_khoan);
                this.tf_so_vin_chuyen = menutab.changeTextFieldAsEditBox(this.tf_so_vin_chuyen, this.pn_chuyen_khoan);
                this.tf_ly_do = menutab.changeTextFieldAsEditBox(this.tf_ly_do, this.pn_chuyen_khoan);
                this.lb_vin_nhan_duoc = menutab.changeTextFieldAsEditBox(this.lb_vin_nhan_duoc, this.pn_chuyen_khoan);
                if(!cc.sys.isNative) {
                    this.lb_vin_nhan_duoc.setTextAlign(cc.TEXT_ALIGNMENT_RIGHT);
                }
                this.lb_vin_nhan_duoc.setFontColor(cc.color("#C200FF"));
            }else {
                this.tf_nickname.addEventListener(this.text_field_event, this);
                this.tf_nickname_again.addEventListener(this.text_field_event, this);
                this.tf_so_vin_chuyen.addEventListener(this.text_field_event, this);
                this.tf_ly_do.addEventListener(this.text_field_event, this);
                this.lb_vin_nhan_duoc.addEventListener(this.text_field_event, this);

                this.lb_vin_nhan_duoc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
                this.lb_vin_nhan_duoc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.lb_vin_nhan_duoc.setFontColor(cc.color("#C200FF"));
                this.tf_nickname.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_nickname_again.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_so_vin_chuyen.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                this.tf_ly_do.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            }

            this.lb_tranfer_min.setString(formatMoney(0,3,lobby.transfer_min)+" VIN");

            //this.pn_chuyen_khoan.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showchuyenkhoan)));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_chuyenkhoan.BTN_CLOSE_DAILY:
                    closechuyenkhoan(0);
                    break;
                case code_chuyenkhoan.BTN_CLEAR_NICKNAME_CK:
                    this.tf_nickname.setString("");
                    this.tf_nickname.setPlaceHolder("Nickname:");
                    this.btn_clear_nickname_ck.setVisible(false);
                    this.tf_nickname.setColor(cc.color("#FFFFFF"));
                    this.tf_nickname.runAction(cc.scaleTo(0.225, 1));
                    this.lb_check_daily.setVisible(false);
                    if(this.pn_chuyen_khoan.getChildByName("checkNickname") !=null) {
                        var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                        aSprite4.setVisible(false);
                    }
                    break;
                case code_chuyenkhoan.BTN_CLEAR_NICKNAME_AGAIN_CK:
                    this.tf_nickname_again.setString("");
                    this.tf_nickname_again.setPlaceHolder("Nhập lại Nickname:");
                    this.btn_clear_nickname_again_ck.setVisible(false);
                    this.tf_nickname_again.setColor(cc.color("#FFFFFF"));
                    this.tf_nickname_again.runAction(cc.scaleTo(0.225, 1));
                    break;
                case code_chuyenkhoan.BTN_CLEAR_LYDO:
                    this.tf_ly_do.setString("");
                    this.tf_ly_do.setPlaceHolder("Lý do chuyển khoản");
                    this.btn_clear_lydo.setVisible(false);
                    this.tf_ly_do.setColor(cc.color("#FFFFFF"));
                    this.tf_ly_do.runAction(cc.scaleTo(0.225, 1));
                    break;
                // chuyen khoan
                case code_chuyenkhoan.BTN_CHUYENKHOAN_BACK:
                    closechuyenkhoan(1);
                    shopping_info.showshopping_info_tieuvin();
                    shopping_info.pn_shopping_napvin.setVisible(true);
                    shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0.2,1));
                    shopping_infoAppear = true;
                    break;
                case code_chuyenkhoan.BTN_CLOSE_ALL_CHUYENKHOAN:
                    closechuyenkhoan(0);
                    closeshopping_info();
                    break;
                case code_chuyenkhoan.BTN_CHUYENKHOAN_DAILY:
                    this.pn_chuyen_khoan.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
                        chuyenkhoan.pn_chuyen_khoan.setVisible(false);
                        chuyenkhoan.panel_dai_ly.setVisible(true);
                        chuyenkhoan.panel_dai_ly.runAction(cc.scaleTo(0.2,1));
                    })));
                    break;
                case code_chuyenkhoan.BTN_CHUYENKHOAN_TIEPTUC:
                    this.funExchangeVin();
                    break;
            }
        },
        showchuyenkhoan : function () {
            chuyenkhoan.pn_chuyen_khoan.setVisible(true);
            lobby.reloadLayout();
            chuyenkhoan.pn_chuyen_khoan.runAction(cc.sequence(cc.delayTime(0.01),cc.scaleTo(0.2,1)));
        },
        showdaily : function () {
            chuyenkhoan.panel_dai_ly.setVisible(true);
            lobby.reloadLayout();
            chuyenkhoan.panel_dai_ly.runAction(cc.sequence(cc.delayTime(0.01),cc.scaleTo(0.2,1)));
        },

        gotoSercurity : function (){
            chuyenkhoan.pn_chuyen_khoan.setVisible(false);
            chuyenkhoan.tf_nickname.setString("");
            chuyenkhoan.tf_nickname_again.setString("");
            chuyenkhoan.tf_so_vin_chuyen.setString("");
            chuyenkhoan.lb_vin_nhan_duoc.setString("");
            chuyenkhoan.tf_ly_do.setString("");
            chuyenkhoan.lb_check_daily.setVisible(false);
            if(chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname") !=null) {
                var aSprite4 = chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname");
                aSprite4.setVisible(false);
            }
            closechuyenkhoan(0);
            opensercurity_info();
            sercurity_info.resetSP_Button_Baomat();
            if(sercurity_info.check_dangky_baomat == 0){
                sercurity_info.sp_thongtinbaomat.setTexture("res/ResourceMenuTab/BaoMat/btn_2hang.png");
                sercurity_info.gotoTab = "TTBM_B";
            }else{
                sercurity_info.sp_thongtinbaomat_s.setTexture("res/ResourceMenuTab/BaoMat/btn_5_hang.png");
                sercurity_info.gotoTab = "TTBM_S";
            }
            sercurity_info.pn_thong_tin_bao_mat.setVisible(true);
        },
        callBackError: function(response){
        },

        parserDataDaiLy_user: function()
        {
            var url = urlDaily();
            //cc.log("url dai ly " + url);
            sendRequest(url,null,false,chuyenkhoan.callBackDaiLy,chuyenkhoan.callBackError);
        },
        callBackDaiLy:function(response)
        {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if(success)
            {
                if(chuyenkhoan.arrDaiLy!=null)
                    while(chuyenkhoan.arrDaiLy.length > 0) {
                        chuyenkhoan.arrDaiLy.pop();
                    }

                var DaiLy_user = jsonData["transactions"];
                for (var i = 0; i < DaiLy_user.length; i++) {
                    var counter = DaiLy_user[i];
                    chuyenkhoan.arrDaiLy.push(counter);

                }
                chuyenkhoan.reload_Daily();
            }
        },

        reload_Daily:function()
        {
            this.lv_daily.removeAllItems();
            this.lv_daily.removeAllChildren();
            var cellHeight = 50;
            var positionY = 22;
            var  fonts = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            var stt = 1;
            //cc.log("lengh : " + this.arrDaiLy.length);
            for(var i = 0; i<this.arrDaiLy.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_daily.width;
                cellList.setPosition(cc.p(0,0));
                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                //cellList.setClippingEnabled(true);
                if(i % 2 == 1)
                {
                    cellList.setBackGroundColor(cc.color("#39489E"));
                }else
                {
                    cellList.setBackGroundColor(cc.color(25,23,88));
                }
                var lbstt =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(58,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbstt.setPosition(cc.p(29.18,positionY));
                lbstt.setString(stt);
                stt = stt + 1;
                lbstt.setColor(cc.color("#f7ebc6"));

                var lbdaily =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(166,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbdaily.setPosition(cc.p(141.38,positionY));
                lbdaily.setString(chuyenkhoan.arrDaiLy[i].fullName);
                lbdaily.setColor(cc.color("#f7ebc6"));

                var lbNickName =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(166,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbNickName.setPosition(cc.p(307.61,positionY));
                lbNickName.setString(chuyenkhoan.arrDaiLy[i].nickName);
                lbNickName.setColor(cc.color("#f3d400"));

                var lbphone =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(198,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbphone.setPosition(cc.p(490.60,positionY));
                lbphone.setString(chuyenkhoan.arrDaiLy[i].mobile);
                lbphone.setColor(cc.color("#f7ebc6"));

                var lbaddress =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(163,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbaddress.setPosition(cc.p(780.20,positionY));
                lbaddress.setString(chuyenkhoan.arrDaiLy[i].address);
                lbaddress.setColor(cc.color("#f7ebc6"));


                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1.75); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(58.53,positionY + 4));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1.75); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(224.45,positionY + 4));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1.75); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(391.65,positionY + 4));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1.75); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(589.73,positionY + 4));

                var aSprite5 = new cc.Sprite();
                aSprite5.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite5.setScaleY(1.75); aSprite5.setScaleX(2);
                aSprite5.setPosition(cc.p(698.58,positionY + 4));

                var aSprite6 = new cc.Sprite();
                aSprite6.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite6.setScaleY(1.75); aSprite6.setScaleX(2);
                aSprite6.setPosition(cc.p(861.57,positionY + 4));

                var button = new ccui.Button();
                button.loadTextureNormal("res/ResourceMenuTab/ChuyenKhoan/btn_txt_chuyenkhoan.png");
                button.setPosition(cc.p(930.52,positionY + 3));
                button.setName(i);

                button.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            this.detail_daily(sender.name);
                            break;
                    }

                },this);
                var button2 = new ccui.Button();
                button2.loadTextureNormal("res/ResourceMenuTab/ChuyenKhoan/btn_chose_daily.png");
                button2.setPosition(cc.p(293,positionY + 1));
                button2.setName(i);

                button2.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            this.detail_daily(sender.name);
                            break;
                    }

                },this);

                var btn_fb = new ccui.Button();
                btn_fb.loadTextureNormal("res/Lobby/btnFanpage.png",ccui.Widget.PLIST_TEXTURE);
                btn_fb.setScale(0.7);
                btn_fb.setPosition(cc.p(643.14,positionY+1));
                btn_fb.setName(i);

                btn_fb.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            this.open_facebook(sender.name);
                            break;
                    }

                },this);

                cellList.addChild(lbstt);
                cellList.addChild(lbdaily);
                cellList.addChild(lbNickName);
                cellList.addChild(lbphone);
                cellList.addChild(lbaddress);
                cellList.addChild(aSprite1); cellList.addChild(aSprite2);
                cellList.addChild(aSprite3); cellList.addChild(aSprite4);
                cellList.addChild(aSprite5); cellList.addChild(aSprite6);
                cellList.addChild(button);
                cellList.addChild(button2);
                cellList.addChild(btn_fb);

                this.lv_daily.pushBackCustomItem(cellList);
            }
        },

        open_facebook : function (value){
            if(cc.sys.isNative) {
                cc.sys.openURL(this.arrDaiLy[value].facebook);
            }else
                window.open(this.arrDaiLy[value].facebook);
        },

        detail_daily : function (value){
            this.tf_nickname.setString(this.arrDaiLy[value].nickName);
            this.tf_nickname_again.setString(this.arrDaiLy[value].nickName);
            this.lb_check_daily.setVisible(true);
            this.btn_clear_nickname_ck.setVisible(true);
            this.btn_clear_nickname_again_ck.setVisible(true);
            this.btn_clear_lydo.setVisible(true);
            this.isSameNickName = true;
            this.ischeckDaiLy = true;
            this.tf_ly_do.setString("Chuyển khoản Vin cho " + this.arrDaiLy[value].fullName);
            //if(this.pn_chuyen_khoan.getChildByName("checkNickname")== null) {
            //    var aSprite4 = new cc.Sprite();
            //    aSprite4.initWithFile("res/ResourceMenuTab/BaoMat/click2.png", cc.rect(0, 0, 21, 21));
            //    aSprite4.setPosition(cc.p(540.59, 483.80));
            //    aSprite4.setName("checkNickname");
            //    this.pn_chuyen_khoan.addChild(aSprite4);
            //}else{
            //    var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
            //    aSprite4.setVisible(true);
            //}
            this.checkNickName();
            this.tf_nickname.setColor(cc.color("#3E3E3E"));
            this.tf_nickname_again.setColor(cc.color("#3E3E3E"));
            this.tf_ly_do.setColor(cc.color("#3E3E3E"));

            this.panel_dai_ly.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
                chuyenkhoan.panel_dai_ly.setVisible(false);
                chuyenkhoan.pn_chuyen_khoan.setVisible(true);
                chuyenkhoan.pn_chuyen_khoan.runAction(cc.scaleTo(0.2,1))
            })));
        },

        text_field_event: function(sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    if(sender.name == "tf_so_vin_chuyen"|| sender.name == "lb_vin_nhan_duoc")
                        sender.setColor(cc.color("#C200FF"));
                    else
                        sender.setColor(cc.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                } break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    //cc.log("length: " + sender.getString().length);
                    if(sender.getString().length != 0)
                        if(sender.name == "tf_so_vin_chuyen"|| sender.name == "lb_vin_nhan_duoc")
                            sender.setColor(cc.color("#C200FF"));
                        else
                            sender.setColor(cc.color("#3E3E3E"));
                    else
                        sender.setColor(cc.color("#FFFFFF"));
                    var str2 = sender.getString();
                    if(sender.name == "tf_nickname") {
                        sender.setPlaceHolder("Nickname:");
                        if(str2.length >= 6 && str2.length <= 16) {
                            this.checkNickName();
                        }else{
                            this.lb_check_daily.setVisible(false);
                            if(this.pn_chuyen_khoan.getChildByName("checkNickname") !=null) {
                                var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                                aSprite4.setVisible(false);
                            }
                        }
                        if(str2.length == 0){
                            this.btn_clear_nickname_ck.setVisible(false);
                        }
                    }else if(sender.name == "tf_nickname_again") {
                        sender.setPlaceHolder("Nhập lại Nickname:");
                        if(str2.length == 0){
                            this.btn_clear_nickname_again_ck.setVisible(false);
                        }
                    }else if(sender.name == "tf_so_vin_chuyen") {
                        sender.setPlaceHolder("Nhập số Vin cần chuyển");
                    }else if(sender.name == "tf_ly_do") {
                        sender.setPlaceHolder("Lý do chuyển khoản");
                        if(str2.length == 0){
                            this.btn_clear_lydo.setVisible(false);
                        }
                    }
                    if(sender.getString() == 0) {
                        sender.setString("");
                        sender.getString().length = 0;
                        sender.setColor(cc.color("#FFFFFF"));
                    }
                } break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    if(sender.name == "tf_so_vin_chuyen"|| sender.name == "lb_vin_nhan_duoc") {
                        var str = sender.getString();
                        str = replaceAll(".", "", str);
                        if (!isNumeric(str)) {
                            str = str.substr(0, str.length - 1);
                        }
                        if (!isNumeric(str)) {
                            str = "0";
                        }
                        sender.setString(formatMoney(0, 3, parseInt(Number(str))));
                        if(sender.name == "tf_so_vin_chuyen") {
                            if (Number(str) >= Number(lobby.transfer_min)) {
                                this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, Math.round(Number(str) * lobby.radio_tranfer)));
                                this.lb_vin_nhan_duoc.setColor(cc.color("#C200FF"));
                            }
                        }else if(sender.name == "lb_vin_nhan_duoc") {
                            if (Number(str) >= parseInt(lobby.transfer_min * lobby.radio_tranfer)) {
                                this.tf_so_vin_chuyen.setString(formatMoney(0, 3, Math.round(Number(str)/lobby.radio_tranfer)));
                                this.tf_so_vin_chuyen.setColor(cc.color("#C200FF"));
                            }
                        }
                    }
                    if(sender.name == "tf_nickname") {
                        this.btn_clear_nickname_ck.setVisible(true);
                    }else if(sender.name == "tf_nickname_again") {
                        this.btn_clear_nickname_again_ck.setVisible(true);
                    }else if(sender.name == "tf_ly_do") {
                        this.btn_clear_lydo.setVisible(true);
                    }
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    var str = sender.getString();
                    if(sender.name == "tf_so_vin_chuyen"){
                        str = replaceAll(".", "", str);
                        sender.setString(formatMoney(0, 3, Number(str)));
                        if(sender.name == "tf_so_vin_chuyen") {
                            if (Number(str) >= 10000)
                                this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, parseInt((Number(str) * 98) / 100)));
                            else
                                this.lb_vin_nhan_duoc.setString("");
                        }
                    }
                    if(sender.name == "tf_nickname"){
                        //this.checkNickName();
                        if(str.length == 0){
                            //cc.log("vao");
                            this.btn_clear_nickname_ck.setVisible(false);
                            this.lb_check_daily.setVisible(false);
                            if(this.pn_chuyen_khoan.getChildByName("checkNickname") !=null) {
                                var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                                aSprite4.setVisible(false);
                            }
                        }
                    }else if(sender.name == "tf_nickname_again"){
                        if(str.length == 0){
                            this.btn_clear_nickname_again_ck.setVisible(false);
                        }
                    }else if(sender.name == "tf_ly_do"){
                        if(str.length == 0){
                            this.btn_clear_lydo.setVisible(false);
                        }
                    }
                } break;
            }

        },

        checkNickName : function(){
            var str = this.tf_nickname.getString();
            this.isSameNickName = false;
            this.ischeckDaiLy = false;
            //for(var i = 0; i<this.arrDaiLy.length; i++)
            //{
            //    //cc.log("ten dai ly: " + this.arrDaiLy[0].nickName);
            //    if(str == this.arrDaiLy[i].nickName){
            //        //cc.log("co trung");
            //        this.ischeckDaiLy = true;
            //        this.isSameNickName = true;
            //        this.lb_check_daily.setVisible(true);
            //        if(this.pn_chuyen_khoan.getChildByName("checkNickname")== null) {
            //            this.tf_nickname_again.setString(str);
            //            var aSprite4 = new cc.Sprite();
            //            aSprite4.initWithFile("res/ResourceMenuTab/BaoMat/click2.png", cc.rect(0, 0, 21, 21));
            //            aSprite4.setPosition(cc.p(540.59, 483.80));
            //            aSprite4.setName("checkNickname");
            //            this.pn_chuyen_khoan.addChild(aSprite4);
            //        }else{
            //            var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
            //            aSprite4.setVisible(true);
            //            this.tf_nickname_again.setString(str);
            //        }
            //    }else{
            //        //cc.log("ko dai ly");
            //        if(this.isSameNickName == false)
            //            this.lb_check_daily.setVisible(false);
            //    }
            //}
            if(this.isSameNickName == false){
                if(Minigame.isLoginSocket) {
                    var checkNick = new CmdSendCheckNickName();
                    checkNick.putCheckNickName(str);
                    Minigame.miniGameClient.send(checkNick);
                    checkNick.clean();
                }else{
                    if(this.pn_chuyen_khoan.getChildByName("checkNickname")!= null) {
                        var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                        aSprite4.setVisible(false);

                    }
                }
            }
        },
        responsenickname : function(error, type, fee){
            //cc.log("error responsenickname : " + error + " type : " + type + " fee : " +fee);
            var str = this.tf_nickname.getString();
            if(error == 0){
                if(this.pn_chuyen_khoan.getChildByName("checkNickname")!= null) {
                    var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                    aSprite4.setVisible(false);
                    this.tf_nickname_again.setString("");
                }
            }else{
                lobby.radio_tranfer = (100 - fee)/100;
                this.lb_phigiaodich.setString((100 - Number(lobby.radio_tranfer*100)) + "%");
                this.isSameNickName = true;
                if(this.pn_chuyen_khoan.getChildByName("checkNickname")== null) {
                    //this.tf_nickname_again.setString(str);
                    var aSprite4 = new cc.Sprite();
                    aSprite4.initWithFile("res/ResourceMenuTab/BaoMat/click2.png", cc.rect(0, 0, 21, 21));
                    aSprite4.setPosition(cc.p(540.59, 483.80));
                    aSprite4.setName("checkNickname");
                    this.pn_chuyen_khoan.addChild(aSprite4);
                }else{
                    var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                    aSprite4.setVisible(true);
                    //this.tf_nickname_again.setString(str);
                }
                if(type == 1 || type == 2){
                    this.ischeckDaiLy = true;
                    this.lb_check_daily.setVisible(true);
                }else{
                    this.ischeckDaiLy = false;
                    this.lb_check_daily.setVisible(false);
                }
                var money_put = this.tf_so_vin_chuyen.getString();
                var money_receive = this.lb_vin_nhan_duoc.getString();
                money_put = replaceAll(".", "", money_put);
                money_receive = replaceAll(".", "", money_receive);
                if(Number(money_receive) > 0){
                    this.tf_so_vin_chuyen.setString(formatMoney(0,3, Math.round(Number(money_receive)/lobby.radio_tranfer)));
                }else{
                    if(Number(money_put) > Number(lobby.transfer_min)){
                        this.lb_vin_nhan_duoc.setString(formatMoney(0, 3, Math.round(Number(str) * lobby.radio_tranfer)));
                    }
                }

            }
        },

        funExchangeVin : function(){
            var nickname = this.tf_nickname.getString();
            var nickname_again = this.tf_nickname_again.getString();
            var money = this.tf_so_vin_chuyen.getString();
            money = replaceAll(".", "", money);
            var description = this.tf_ly_do.getString();

            this.save_nickname = nickname;
            this.save_money = money;
            this.save_description = description;

            //cc.log("money hien nhap: " + money + " vav " + parseInt(money));

            if(nickname == null|| nickname.length<6 || nickname.length>16){
                popup.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái, số và dấu _");
            }else if(!lobby.checkKyTuSpecial(nickname,true)){
                popup.openPanel_Alert_Lobby("NickName phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái,số và dấu _!");
            }else if(nickname != nickname_again){
                popup.openPanel_Alert_Lobby("NickName nhập lại không đúng!");
            }else if(nickname.toLowerCase() == (lobby.userInfo.nickname).toLowerCase()){
                popup.openPanel_Alert_Lobby("Không thể chuyển khoản cho chính mình!");
            }else if(money == "" || parseInt(money) < lobby.transfer_min){
                popup.openPanel_Alert_Lobby("Số VIN tối thiểu chuyển khoản là " +formatMoney(0,3,lobby.transfer_min)+ " Vin!");
            }else if(parseInt(money) > lobby.userInfo.moneyUse){
                popup.openPanel_Alert_Lobby("Không thể chuyển vượt quá số dư khả dụng!");
            }else if(this.isSameNickName == false){
                popup.openPanel_Alert_Lobby("NickName nhận chuyển khoản không tồn tại!");
            }else if (description == ""){
                popup.openPanel_Alert_Lobby("Bạn chưa nhập nội dung chuyển khoản!");
            }else{
                if(this.ischeckDaiLy == true) {
                    popup.txt_note_daily.setVisible(true);
                    popup.txt_money.y = popup.txt_content.y - 69;
                    popup.txt_note_daily.setString("(Đại lý)");
                    popup.txt_note_daily.setColor(cc.color("#1BFF00"));

                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn\nchuyển cho tài khoản: " + chuyenkhoan.save_nickname + "\n \n Số tiền:" +
                         "                     "+ "\nLý do: " + chuyenkhoan.save_description + "!", "ĐỒNG Ý", "HỦY", this.confirmRechargeMoney, null);
                }else{
                    popup.txt_note_daily.setVisible(true);
                    popup.txt_money.y = popup.txt_content.y - 93;
                    popup.txt_canh_bao.setVisible(true);
                    popup.txt_note_daily.setString("(Không phải đại lý)");
                    popup.txt_note_daily.setColor(cc.color("#FF0000"));
                    popup.open_panel_message_confirm("THÔNG BÁO", "Bạn có chắc chắn muốn\nchuyển cho tài khoản: " + chuyenkhoan.save_nickname + "\n \n \nSố tiền:" +
                        "                     " + "\nLý do: " + chuyenkhoan.save_description + "!", "ĐỒNG Ý", "HỦY", this.confirmRechargeMoney, null);
                }

                popup.txt_money.setVisible(true);
                popup.txt_money.setString(formatMoney(0, 3, parseInt(chuyenkhoan.save_money)) + " VIN");
            }

        },

        encode_utf8 : function(s) {
            return unescape(encodeURIComponent(s));
        },
        confirmRechargeMoney : function(){
            if(Minigame.isLoginSocket) {
                var shopping = new CmdSendExchangeVin();
                //cc.log("ly do chuyen: " + chuyenkhoan.encode_utf8(chuyenkhoan.save_description));
                shopping.putExchangeVin(chuyenkhoan.save_nickname, parseInt(chuyenkhoan.save_money), chuyenkhoan.encode_utf8(chuyenkhoan.save_description));
                Minigame.miniGameClient.send(shopping);
                shopping.clean();
            }else{
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                Minigame.connectSocket();
            }
        },
        responseExchangeMoney : function(error , moneyUse){
            //cc.log("error: " + error  + " moneyUse : " + moneyUse);
            if(error == 0){
                openpn_otp("Vui lòng nhập mã OTP để hoàn tất giao dịch chuyển khoản!",1);
                lobby.userInfo.moneyUse = moneyUse;
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định, vui lòng thử lại sau!");
            }else if(error == 2){
                popup.openPanel_Alert_Lobby("Số tiền tối thiểu chuyển khoản là " +formatMoney(0,3,lobby.transfer_min)+ " Vin!");
            }else if(error == 3){
                this.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                    popup.open_panel_message_confirm("THÔNG BÁO","Chức năng này dành cho các tài khoản đã đăng ký bảo mật!\n Bạn có muốn đăng ký bảo mật luôn không?","ĐỒNG Ý","HỦY", chuyenkhoan.gotoSercurity, null);
                })));
            }else if(error == 4){
                popup.openPanel_Alert_Lobby("Tài khoản không đủ số dư khả dụng!");
            }else if(error == 5){
                popup.openPanel_Alert_Lobby("Tài khoản bị cấm chuyển tiền!");
            }else if(error == 6){
                popup.openPanel_Alert_Lobby("Nickname nhận chuyển khoản không tồn tại!");
            }else if(error == 10){
                popup.openPanel_Alert_Lobby("Chức năng bảo mật sẽ tự động kích hoạt sau "+lobby.configHour+"h kể từ thời điểm đăng\nký thành công!");
            }else if(error == 11){
                popup.openPanel_Alert_Lobby("Bạn chỉ được chuyển cho Đại lý tổng trong khoảng tiền quy định!");
            }
        },
        responseResultExchangeMoney : function(error , moneyUse, currentMoney){
            //cc.log("error: " + error  + " moneyUse : " + moneyUse + " currentMoney : " + currentMoney);

            if(error == 0){
                popup.openPanel_Alert_Lobby("Giao dịch chuyển khoản thành công!");
                shopping_info.funGetMoneyUse();
                this.tf_nickname.setString("");
                this.tf_nickname.setPlaceHolder("Nickname:");
                this.tf_nickname.setColor(cc.color("#FFFFFF"));
                this.tf_nickname.runAction(cc.scaleTo(0.225, 1));

                this.lb_check_daily.setVisible(false);

                if(this.pn_chuyen_khoan.getChildByName("checkNickname")!= null) {
                    var aSprite4 = this.pn_chuyen_khoan.getChildByName("checkNickname");
                    aSprite4.setVisible(false);
                }

                this.tf_nickname_again.setString("");
                this.tf_nickname_again.setPlaceHolder("Nhập lại Nickname:");
                this.tf_nickname_again.setColor(cc.color("#FFFFFF"));
                this.tf_nickname_again.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_nickname_ck.setVisible(false);

                this.tf_so_vin_chuyen.setString("");
                this.tf_so_vin_chuyen.setPlaceHolder("Nhập số Vin cần chuyển");
                this.tf_so_vin_chuyen.setColor(cc.color("#FFFFFF"));
                this.tf_so_vin_chuyen.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_nickname_again_ck.setVisible(false);

                this.lb_vin_nhan_duoc.setString("");
                this.isSameNickName = false;

                this.tf_ly_do.setString("");
                this.tf_ly_do.setPlaceHolder("Lý do chuyển khoản");
                this.tf_ly_do.setColor(cc.color("#FFFFFF"));
                this.tf_ly_do.runAction(cc.scaleTo(0.225, 1));
                this.btn_clear_lydo.setVisible(false);

                lobby.userInfo.moneyUse = moneyUse;
                lobby.userInfo.vinTotal = currentMoney;

                this.lb_so_du_vin.setString(formatMoney(0,3,lobby.userInfo.moneyUse));

                if(lobby.userInfo == null){
                }else {
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(lobby.userInfo.vinTotal)));
                    menutab.changeFontMoney();
                }
            }else if(error == 1){
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }
        },
    }
);
// panel chuyen khoan
code_chuyenkhoan.BTN_CHUYENKHOAN_BACK = 1; code_chuyenkhoan.BTN_CHUYENKHOAN_DAILY = 2; code_chuyenkhoan.BTN_CHUYENKHOAN_TIEPTUC = 4;
code_chuyenkhoan.BTN_CLOSE_ALL_CHUYENKHOAN = 96;
code_chuyenkhoan.BTN_CLEAR_NICKNAME_CK = 97; code_chuyenkhoan.BTN_CLEAR_NICKNAME_AGAIN_CK = 98; code_chuyenkhoan.BTN_CLEAR_LYDO = 99;
code_chuyenkhoan.BTN_CLOSE_DAILY = 5;


openchuyenkhoan = function (index) {
    if (chuyenkhoan === null) {
        chuyenkhoan = new code_chuyenkhoan();
        chuyenkhoanX = chuyenkhoan.getPosition().x;
        chuyenkhoanY = chuyenkhoan.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(chuyenkhoan,BaseScene.INDEX_INFO_GUI, 1);
    }
    else
    {
        //chuyenkhoan.pn_chuyen_khoan.setVisible(true);
        //chuyenkhoan.pn_chuyen_khoan.runAction(cc.scaleTo(0.2,1));
    }
    chuyenkhoanAppear = true;
    if(shopping_info!=null) {
        shopping_info.funGetMoneyUse();
        shopping_info.pn_shopping_napvin.setVisible(false);
        shopping_info.pn_shopping_napvin.runAction(cc.scaleTo(0, 0));
    }
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(chuyenkhoan.isfirstChuyenKhoan == false){
        chuyenkhoan.parserDataDaiLy_user();
        chuyenkhoan.isfirstChuyenKhoan = true;
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();

    if(index == 0){
        chuyenkhoan.pn_chuyen_khoan.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(chuyenkhoan.showchuyenkhoan)));
    }else{
        chuyenkhoan.panel_dai_ly.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(chuyenkhoan.showdaily)));
    }

};
closechuyenkhoan = function (index) {
    if (chuyenkhoan === null) {
        return;
    }
    if(chuyenkhoanAppear) {
        chuyenkhoan.pn_chuyen_khoan.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
            chuyenkhoan.pn_chuyen_khoan.setVisible(false);
            lobby.reloadLayout();
        })));
        //chuyenkhoan.pn_chuyen_khoan.setVisible(false);

        chuyenkhoan.panel_dai_ly.setVisible(false);
        lobby.reloadLayout();
        chuyenkhoan.panel_dai_ly.runAction(cc.scaleTo(0.2,0));
        chuyenkhoan.tf_nickname.setString("");
        chuyenkhoan.tf_nickname_again.setString("");
        chuyenkhoan.tf_so_vin_chuyen.setString("");
        chuyenkhoan.lb_vin_nhan_duoc.setString("");
        chuyenkhoan.tf_ly_do.setString("");
        chuyenkhoan.lb_check_daily.setVisible(false);

        chuyenkhoan.tf_nickname.setColor(cc.color("#FFFFFF"));
        chuyenkhoan.tf_nickname_again.setColor(cc.color("#FFFFFF"));
        chuyenkhoan.tf_so_vin_chuyen.setColor(cc.color("#FFFFFF"));
        chuyenkhoan.tf_ly_do.setColor(cc.color("#FFFFFF"));

        if(chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname") !=null) {
            var aSprite4 = chuyenkhoan.pn_chuyen_khoan.getChildByName("checkNickname");
            aSprite4.setVisible(false);
        }
        chuyenkhoan.btn_clear_nickname_ck.setVisible(false);
        chuyenkhoan.btn_clear_nickname_again_ck.setVisible(false);
        chuyenkhoan.btn_clear_lydo.setVisible(false);

        chuyenkhoanAppear = false;
        if(index == 0) {
            if (!cc.sys.isNative)
                lobby.resumeItemGameListen();
            if (menutab != null)
                if (!cc.sys.isNative)
                    menutab.resumeHeader();
        }
    }
};
