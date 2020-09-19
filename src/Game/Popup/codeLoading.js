var popup = null;
var popupX = null; var popupY = null;
var popupAppear = null;

var codeLoading = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_loading = null; this.pn_message = null; this.bg_shadow = null;
            this.sp_point1 = null; this.sp_point2 = null; this.sp_point3 = null; this.sp_point4 = null; this.sp_point5 = null;
            this.bg_message = null; this.bg_title = null; this.txt_content = null; this.pn_message_show = null; this.pn_message_confirm = null;
            //this.btn_mess_show_popup = null; this.btn_cancel_popup = null; this.btn_dong_y_popup = null;
            this.pn_message_small = null; this.btn_close_pn_alert = null; this.bg_alert = null; this.bg_title_alert = null; this.txt_content_alert_lobby = null;
            this.shadow_popup = null;
            this.txt_title = null;

            this.pn_message_big = null;
            this.btn_close_ms_big = null;
            this.bg_big_alert = null;
            this.bg_title_alert = null;
            this.txt_content_big = null;

            this.txt_note_daily = null;
            this.txt_canh_bao = null;
            this.txt_money = null;

            this.pn_banner_tet = null;
            this.btn_close_banner_tet = null;
            this.btn_banner_tet = null;

            this._super("codeLoading");
            this.initWithBinaryFile("res/loadingscene.json");
            return true;
        },
        customizeGUI: function(){
            this.shadow_popup = this._layout.getChildByName("shadow_popup");
            this.shadow_popup.setTexture("res/Lobby/Shadow.png"); this.shadow_popup.setVisible(false);
            this.pn_loading = this._layout.getChildByName("pn_loading"); this.pn_loading.setVisible(false);
            this.pn_message = this._layout.getChildByName("pn_message"); this.pn_message.setScale(0); this.pn_message.setVisible(false);
            this.bg_shadow = this.pn_loading.getChildByName("bg_shadow"); this.bg_shadow.setTexture("res/Lobby/Shadow.png");
            this.sp_point1 = this.pn_loading.getChildByName("sp_point1");
            this.sp_point2 = this.pn_loading.getChildByName("sp_point2");
            this.sp_point3 = this.pn_loading.getChildByName("sp_point3");
            this.sp_point4 = this.pn_loading.getChildByName("sp_point4");
            this.sp_point5 = this.pn_loading.getChildByName("sp_point5");

            this.bg_message = this.pn_message.getChildByName("bg_message"); this.bg_message.setTexture("res/ResourceMenuTab/Mail/bgtab_mail_s.png");
            this.bg_title = this.pn_message.getChildByName("bg_title"); this.bg_title.setTexture("res/ResourceMenuTab/Mail/Title.png");
            this.pn_message_show = this.getControl("pn_message_show",this.pn_message);
            this.pn_message_confirm = this.getControl("pn_message_confirm",this.pn_message); this.pn_message_confirm.setVisible(false);
            this.txt_content = this.getControl("txt_content",this.pn_message);
            this.txt_note_daily = this.getControl("txt_note_daily",this.pn_message);
            this.txt_note_daily.y = this.txt_content.y - 45;
            this.txt_note_daily.setVisible(false);
            this.txt_canh_bao = this.getControl("txt_canh_bao",this.pn_message);
            this.txt_canh_bao.setVisible(false);

            this.txt_money = this.getControl("txt_money",this.pn_message);
            this.txt_money.y = this.txt_content.y - 93;
            this.txt_money.x = this.txt_content.x - 15;
            this.txt_money.setColor(cc.color("#E702FE"));
            this.txt_money.setVisible(false);

            this.txt_title = this.getControl("txt_title",this.pn_message);

            this.pn_message_big = this._layout.getChildByName("pn_message_big");
            this.btn_close_ms_big = this.customButton("btn_close_ms_big",codeLoading.BTN_CLOSE_BIG_MESSAGE, this.pn_message_big);
            this.bg_big_alert = this.pn_message_big.getChildByName("bg_big_alert");
            this.bg_title_alert = this.pn_message_big.getChildByName("bg_title_alert");
            this.txt_content_big = this.getControl("txt_content_big",this.pn_message_big);
            this.bg_big_alert.setTexture("res/ResourceMenuTab/Mail/bgtab_mail_s.png");
            this.bg_title_alert.setTexture("res/ResourceMenuTab/Mail/Title.png");
            this.pn_message_big.setScale(0); this.pn_message_big.setVisible(false);

            // panel alert
            this.pn_message_small = this._layout.getChildByName("pn_message_small");
            this.bg_alert = this.pn_message_small.getChildByName("bg_alert");  this.bg_alert.setTexture("res/ResourceMenuTab/Mail/bgtab_mail_small.png");
            this.bg_title_alert = this.pn_message_small.getChildByName("bg_title_alert");  this.bg_title_alert.setTexture("res/ResourceMenuTab/Mail/Title.png");
            this.btn_close_pn_alert = this.customButton("btn_close_pn_alert",codeLoading.BTN_CLOSE_PANEL_ALERT, this.pn_message_small);
            this.txt_content_alert_lobby = this.getControl("txt_content_alert_lobby",this.pn_message_small);
            this.pn_message_small.setScale(0);
            this.pn_message_small.setVisible(false);
            this.callbackOK = null;

            this.pn_banner_tet = this._layout.getChildByName("pn_banner_tet");
            this.btn_close_banner_tet = this.customButton("btn_close_banner_tet",codeLoading.BTN_CLOSE_BANNER_TET, this.pn_banner_tet);
            this.btn_banner_tet = this.customButton("btn_banner_tet",codeLoading.BTN_GOTO_BANNER_TET, this.pn_banner_tet);
            this.pn_banner_tet.setScale(0);
            this.pn_banner_tet.setVisible(false);
            //showLoading();
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeLoading.BTN_CLOSE_BANNER_TET:
                    this.pn_banner_tet.runAction(cc.scaleTo(0.2,0));
                    this.pn_banner_tet.setVisible(false);
                    //lobby.tf_user_name_tab.setVisible(true);
                    //lobby.tf_pass_tab.setVisible(true);
                    break;
                case codeLoading.BTN_GOTO_BANNER_TET:
                    if (!cc.sys.isNative) {
                        this.pn_banner_tet.runAction(cc.scaleTo(0.2,0));
                        this.pn_banner_tet.setVisible(false);
                        //lobby.tf_user_name_tab.setVisible(true);
                        //lobby.tf_pass_tab.setVisible(true);
                        window.open("https://www.facebook.com/vinplay.vin.fanpage");
                    }
                    break;
                case codeLoading.BTN_CLOSE_PANEL_ALERT:
                    this.pn_message_small.runAction(cc.scaleTo(0.2,0));
                    popup.shadow_popup.setVisible(false);
                    //cc.log("aleart : " + lobby.AlertLogin);
                    if(lobby.IsRegister == true) {
                        //lobby.tf_user_name_dk.setVisible(true); lobby.tf_mat_khau_dk.setVisible(true);
                        //lobby.tf_nhap_lai_mk_dk.setVisible(true); lobby.tf_ma_xac_nhan_dk.setVisible(true);
                    }else if(lobby.AlertLogin == true){
                        //lobby.tf_user_name_tab.setVisible(true);
                        //lobby.tf_pass_tab.setVisible(true);
                        lobby.AlertLogin = false;
                    }
                    break;
                case codeLoading.BTN_CLOSE_BIG_MESSAGE:
                    this.pn_message_big.setVisible(false);
                    this.pn_message_big.runAction(cc.scaleTo(0,0));
                    this.shadow_popup.setVisible(false);
                    break;
            }
        },
        openPanel_Alert_Lobby : function (str) {
            this.txt_content_alert_lobby.setString(str);
            this.pn_message_small.setVisible(true);
            this.shadow_popup.setVisible(true);
            this.pn_message_small.runAction(cc.scaleTo(0.2,1));
        },
        openPanel_Big_Message : function (str) {
            this.txt_content_big.setString(str);
            this.pn_message_big.setVisible(true);
            this.shadow_popup.setVisible(true);
            this.pn_message_big.runAction(cc.scaleTo(0.2,1));
        },
        scalePoint1 : function () {
            popup.sp_point1.runAction(cc.sequence(cc.scaleTo(0.8,0),cc.callFunc(popup.scalePoint_Back1,this)));
        },
        scalePoint_Back1 : function () {
            popup.sp_point1.runAction(cc.sequence(cc.scaleTo(0,1),cc.callFunc(popup.scalePoint1,this)));
        },
        scalePoint2 : function () {
            popup.sp_point2.runAction(cc.sequence(cc.scaleTo(0.8,0),cc.callFunc(popup.scalePoint_Back2,this)));
        },
        scalePoint_Back2 : function () {
            popup.sp_point2.runAction(cc.sequence(cc.scaleTo(0,1),cc.callFunc(popup.scalePoint2,this)));
        },
        scalePoint3 : function () {
            popup.sp_point3.runAction(cc.sequence(cc.scaleTo(0.8,0),cc.callFunc(popup.scalePoint_Back3,this)));
        },
        scalePoint_Back3 : function () {
            popup.sp_point3.runAction(cc.sequence(cc.scaleTo(0,1),cc.callFunc(popup.scalePoint3,this)));
        },
        scalePoint4 : function () {
            popup.sp_point4.runAction(cc.sequence(cc.scaleTo(0.8,0),cc.callFunc(popup.scalePoint_Back4,this)));
        },
        scalePoint_Back4 : function () {
            popup.sp_point4.runAction(cc.sequence(cc.scaleTo(0,1),cc.callFunc(popup.scalePoint4,this)));
        },
        scalePoint5 : function () {
            popup.sp_point5.runAction(cc.sequence(cc.scaleTo(0.8,0),cc.callFunc(popup.scalePoint_Back5,this)));
        },
        scalePoint_Back5 : function () {
            popup.sp_point5.runAction(cc.sequence(cc.scaleTo(0,1),cc.callFunc(popup.scalePoint5,this)));
        },

        open_panel_message_confirm : function (title,message,txt_btn_OK,txt_btn_Cancel,callback,callbackerror){
            this.pn_message.setVisible(true);
            this.pn_message.runAction(cc.scaleTo(0.2,1));
            this.pn_message_confirm.setVisible(true); this.pn_message_show.setVisible(false);
            this.txt_title.setString(title);
            this.txt_content.setString(message);
            if(this.pn_message_confirm.getChildByName("popupOk123") == null)
            {
                var button = new ccui.Button();
                button.loadTextureNormal("res/ResLoading/bg_button.png");
                button.setPosition(cc.p(728.63,239));
                button.setName("popupOk123");
                this.pn_message_confirm.addChild(button);
                button.setTitleText(txt_btn_OK);
                button.setTitleFontName(UTMBebas.fontName);
                button.setTitleFontSize(28);

                button.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            popup.txt_note_daily.setVisible(false);
                            popup.txt_canh_bao.setVisible(false);
                            popup.txt_money.setVisible(false);
                            callback();
                            break;
                    }

                },this);
            }
            else
            {
                this.pn_message_confirm.getChildByName("popupOk123").addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            popup.txt_note_daily.setVisible(false);
                            popup.txt_canh_bao.setVisible(false);
                            popup.txt_money.setVisible(false);
                            callback();
                            break;
                    }

                },this);
            }
            if(this.pn_message_confirm.getChildByName("popupCancel123") == null)
            {
                var cancel = new ccui.Button();
                cancel.loadTextureNormal("res/ResLoading/bg_button.png");
                cancel.setPosition(cc.p(525.00,239));
                cancel.setName("popupCancel123");
                cancel.setTitleFontName(UTMBebas.fontName);
                this.pn_message_confirm.addChild(cancel);
                cancel.setTitleText(txt_btn_Cancel);
                cancel.setTitleFontSize(28);

                cancel.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            popup.txt_note_daily.setVisible(false);
                            popup.txt_canh_bao.setVisible(false);
                            popup.txt_money.setVisible(false);
                            if(callbackerror != null)
                                callbackerror();
                            break;
                    }

                },this);
            }else{
                this.pn_message_confirm.getChildByName("popupCancel123").addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            popup.txt_note_daily.setVisible(false);
                            popup.txt_canh_bao.setVisible(false);
                            popup.txt_money.setVisible(false);
                            if(callbackerror != null)
                                callbackerror();
                            break;
                    }

                },this);
            }
        },
        open_panel_message_OK : function (title,message,txt_btn_OK,callback){
            cc.log(title + " # " + message + " # " + txt_btn_OK);
            this.pn_message.setVisible(true);
            this.pn_message.runAction(cc.scaleTo(0.2,1));
            this.pn_message_confirm.setVisible(false); this.pn_message_show.setVisible(true);
            this.txt_title.setString(title);
            this.txt_content.setString(message);
            if(this.pn_message_confirm.getChildByName("popupOk120") == null)
            {
                var button = new ccui.Button();
                button.loadTextureNormal("res/ResLoading/bg_button.png");
                button.setPosition(cc.p(640,239));
                button.setName("popupOk120");
                button.setTitleFontName(UTMBebas.fontName);
                this.pn_message_show.addChild(button);
                button.setTitleText(txt_btn_OK);
                button.setTitleFontSize(28);

                button.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            callback();
                            break;
                    }

                },this);
            }else{
                this.pn_message_confirm.getChildByName("popupOk120").addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            popup.pn_message.runAction(cc.scaleTo(0.2,0));
                            popup.pn_message.setVisible(false);
                            callback();
                            break;
                    }
                },this);
            }
        },
    }
);

codeLoading.BTN_XAC_NHAN_POPUP = 1; codeLoading.BTN_CANCEL_POPUP = 2; codeLoading.BTN_DONG_Y_POPUP = 3; codeLoading.BTN_CLOSE_PANEL_ALERT = 4;
codeLoading.BTN_MESS_SHOW_POPUP = 5; codeLoading.BTN_CANCEL_POPUP = 6; codeLoading.BTN_DONG_Y_POPUP = 7;
codeLoading.BTN_CLOSE_BIG_MESSAGE = 8;
codeLoading.BTN_GOTO_BANNER_TET = 9;
codeLoading.BTN_CLOSE_BANNER_TET = 10;

showLoading = function () {
    return sceneMgr.addLoading("Vui lòng chờ !!!");

    //popup.pn_loading.runAction()
    popup.pn_loading.setVisible(true);
    popup.sp_point1.runAction(cc.callFunc(popup.scalePoint1,this));
    popup.sp_point2.runAction(cc.sequence(cc.delayTime(0.15),cc.callFunc(popup.scalePoint2,this)));
    popup.sp_point3.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(popup.scalePoint3,this)));
    popup.sp_point4.runAction(cc.sequence(cc.delayTime(0.45),cc.callFunc(popup.scalePoint4,this)));
    popup.sp_point5.runAction(cc.sequence(cc.delayTime(0.6),cc.callFunc(popup.scalePoint5,this)));
};

closeLoading = function () {
    sceneMgr.clearLoading();
    return;
    popup.sp_point1.stopAllActions();
    popup.sp_point2.stopAllActions();
    popup.sp_point3.stopAllActions();
    popup.sp_point4.stopAllActions();
    popup.sp_point5.stopAllActions();
    popup.pn_loading.setVisible(false);
};



openPopUp = function () {
    if (popup === null) {
        popup = new codeLoading();
        popupX = popup.getPosition().x;
        popupY = popup.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(popup,BaseScene.INDEX_POP_UP_GUI, 0);
    }
    else
    {
        popup.setVisible(true);
    }
    popupAppear = true;

};
closePopUp = function () {
    if (popup === null) {
        return;
    }
    if(popupAppear) {
        popup.setVisible(false);
        popupAppear = false;
    }
};
