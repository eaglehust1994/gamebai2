var mail_info = null;
var mail_infoX = null; var mail_infoY = null;
var mail_infoAppear = null;

var code_mail_info = BaseLayer.extend(
    {
        ctor: function () {
            //// panel dieu khoan
            this.pn_dieu_khoan = null;
            this.btn_close_dieu_khoan = null;
            // panel mail
            this.btn_close_inbox = null; 
            this.sv_mail = null;
            this.btn_recycle = null;
            this.bg_unread = null; this.bg_readed = null; this.btn_close_read_mail = null;
            this.arrMail = [];
            this.btn_backall = null; this.btn_back = null; this.btn_next = null; this.btn_next_all = null;
            this.page_max = 0;
            this.current_page = 1;
            this.pn_content = null;
            this.txt_title = null;
            this.txt_author = null;
            this.sc_content = null;
            this.txt_content = null;
            this.idMail = null;
            this.btn_homepage = null;
            this.btn_email_support = null;
            this.btn_news = null;
            this.btn_fanpage = null;
            this.btn_groups = null;
            this.saveLenghtArray = null;
            this.btn_add_giftcode = null;
            this.saveGiftcode_mail = null;

            this._super("code_mail_info");
            this.initWithBinaryFile("res/mail_info.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_inbox_mail = this._layout.getChildByName("pn_inbox_mail");
            this.pn_read_mail = this._layout.getChildByName("pn_read_mail");
            this.pn_content = this.pn_read_mail.getChildByName("pn_content");
            this.txt_title = this.getControl("txt_title",this.pn_content);
            this.sc_content = this.getControl("sc_content",this.pn_content);
            this.sc_content.setScrollBarEnabled(false);
            this.txt_content = this.getControl("txt_content",this.sc_content);
            this.txt_author = this.getControl("txt_author",this.pn_content);

            this.btn_homepage = this.customButton("btn_homepage", code_mail_info.BTN_HOMEPAGE,this.pn_content);
            this.btn_email_support = this.customButton("btn_email_support", code_mail_info.BTN_EMAIL_SUPPORT,this.pn_content);
            this.btn_news = this.customButton("btn_news", code_mail_info.BTN_NEWS,this.pn_content);
            this.btn_fanpage = this.customButton("btn_fanpage", code_mail_info.BTN_FANPAGE,this.pn_content);
            this.btn_groups = this.customButton("btn_groups", code_mail_info.BTN_GROUPS,this.pn_content);
            this.btn_add_giftcode = this.customButton("btn_add_giftcode", code_mail_info.BTN_ADD_GIFTCODE,this.pn_content);

            // panel Mail
            this.sv_mail = this.getControl("sv_mail",this.pn_inbox_mail);
            this.sv_mail.setTouchEnabled(true);
            this.sv_mail.setClippingEnabled(true);
            this.sv_mail.setScrollBarEnabled(false);
            this.pn_button = this.pn_inbox_mail.getChildByName("pn_button");

            this.btn_close_inbox = this.customButton("btn_close_inbox", code_mail_info.BTN_CLOSE_MAIL,this.pn_inbox_mail);
            this.lb_currentpage = this.getControl("lb_currentpage",this.pn_button);
            this.btn_backall = this.customButton("btn_backall",code_mail_info.BTN_MAIL_BACKALL,this.pn_button); 
            this.btn_back = this.customButton("btn_back",code_mail_info.BTN_MAIL_BACK,this.pn_button);
            this.btn_next_all = this.customButton("btn_next_all",code_mail_info.BTN_MAIL_NEXTALL,this.pn_button);  
            this.btn_next = this.customButton("btn_next",code_mail_info.BTN_MAIL_NEXT,this.pn_button);

            this.btn_close_read_mail = this.customButton("btn_close_read_mail", code_mail_info.BTN_CLOSE_READ_MAIL,this.pn_read_mail);

            this.pn_inbox_mail.setVisible(false);
            this.pn_read_mail.setScale(0);
            this.pn_read_mail.setVisible(false);
            this.pn_inbox_mail.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showmail_info)));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_mail_info.BTN_ADD_GIFTCODE:
                    mail_info.pn_read_mail.runAction(cc.scaleTo(0.2,0));
                    mail_info.pn_read_mail.setVisible(false);
                    closemail_info();
                    opengiftcode(this.saveGiftcode_mail);
                    break;
                case code_mail_info.BTN_CLOSE_MAIL:
                    closemail_info();
                    break;
                case code_mail_info.BTN_CLOSE_MAIL:
                    mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2,0));
                    break;
                case code_mail_info.BTN_NHAN_LUOT_QUAY:
                    mail_info.pn_ma_xac_nhan_mail.setVisible(true);
                    mail_info.pn_ma_xac_nhan_mail.runAction(cc.scaleTo(0.2,1));
                    break;
                case code_mail_info.BTN_XOA_MAIL:
                    break;
                case code_mail_info.BTN_CLOSE_READ_MAIL:
                    mail_info.pn_read_mail.runAction(cc.scaleTo(0.2,0));
                    mail_info.pn_read_mail.setVisible(false);
                    break;
                case code_mail_info.BTN_MAIL_BACKALL:
                    if(this.current_page != 1) {
                        this.current_page = 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_BACK:
                    if(this.current_page >= 2) {
                        this.current_page = this.current_page - 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_NEXT:
                    if(this.current_page < this.page_max) {
                        this.current_page = this.current_page + 1;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_MAIL_NEXTALL:
                    cc.log("current_page : " + this.current_page + " page_max : " + this.page_max);
                    if(this.current_page != this.page_max) {
                        this.current_page = this.page_max;
                        this.parserDataMailUser();
                    }
                    break;
                case code_mail_info.BTN_HOMEPAGE:
                    if(cc.sys.isNative) {
                        //cc.sys.openURL("http://vinplay.com");
                    }else{
                        if(lobby.facebook_canvas == false)
                            window.open("http://vinplay.vin");
                    }
                    break;
                case code_mail_info.BTN_EMAIL_SUPPORT:
                    break;
                case code_mail_info.BTN_NEWS:
                    if(cc.sys.isNative) {
                        //cc.sys.openURL("http://vinplay.net");
                    }else {
                        if(lobby.facebook_canvas == false)
                            window.open("http://vinplay.vin");
                    }
                    break;
                case code_mail_info.BTN_FANPAGE:
                    if(cc.sys.isNative) {
                        //cc.sys.openURL("https://www.facebook.com/Gamebaivinplay");
                    }else {
                        if(lobby.facebook_canvas == false)
                            window.open("https://www.facebook.com/vinplay.vin.fanpage");
                    }
                    break;
                case code_mail_info.BTN_GROUPS:
                    if(cc.sys.isNative) {
                        //cc.sys.openURL("http://facebook.com/groups/vinplay");
                    }else {
                        if(lobby.facebook_canvas == false)
                            window.open("https://www.facebook.com/vinplay.vin.fanpage");
                    }
                    break;
            }
        },
        showmail_info : function () {
            mail_info.pn_inbox_mail.setVisible(true);
            mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2,1));
        },
        addLoading : function(){

            cc.log("addLoading");
            if(this.pn_inbox_mail.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(640.3,329.85));
                loading.setName("loadingdata");
                this.pn_inbox_mail.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_inbox_mail.getChildByName("loadingdata").setVisible(true);
                this.pn_inbox_mail.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_inbox_mail.getChildByName("loadingdata").stopAllActions();
            this.pn_inbox_mail.getChildByName("loadingdata").setVisible(false);
        },

        callBackError: function(response){
            this.closeLoading();
        },

        parserDataMailUser: function()
        {
            //var url = urlGetMailUser(lobby.userInfo.nickname,this.current_page);
            var url = urlGetMailUser(lobby.userInfo.nickname,this.current_page, lobby.userInfo.accessToken);
            //cc.log("url " + url);
            sendRequest(url,null,false,mail_info.callBackMailUser,mail_info.callBackError);
            mail_info.addLoading();
        },
        callBackMailUser:function(response)
        {
            //cc.log("callBackMailUser " + response);
            if(response != "") {
                var jsonData = JSON.parse(response);
                var success = jsonData["success"];
                var errorCode = jsonData["errorCode"];
                if (success) {
                    if (mail_info.arrMail != null)
                        while (mail_info.arrMail.length > 0) {
                            mail_info.arrMail.pop();
                        }

                    var MailUser = jsonData["transactions"];
                    if (MailUser == "") {
                        mail_info.closeLoading();
                    }
                    for (var i = 0; i < MailUser.length; i++) {
                        var counter = MailUser[i];
                        mail_info.arrMail.push(counter);
                    }
                    mail_info.reload_BangMail();
                    if (jsonData["totalPages"] > 1000)
                        mail_info.page_max = 1000;
                    else
                        mail_info.page_max = jsonData["totalPages"];
                    mail_info.lb_currentpage.setString(mail_info.current_page + "/" + mail_info.page_max);
                } else {
                    if (mail_info.arrMail != null)
                        while (mail_info.arrMail.length > 0) {
                            mail_info.arrMail.pop();
                        }
                    //var MailUser = jsonData["transactions"];
                    //for (var i = 0; i < MailUser.length; i++) {
                    //    var counter = MailUser[i];
                    //    mail_info.arrMail.push(counter);
                    //}
                    mail_info.reload_BangMail();
                    mail_info.closeLoading();
                    mail_info.lb_currentpage.setString("");
                    mail_info.page_max = 1;
                }
            }
        },

        reload_BangMail:function()
        {
            this.sv_mail.removeAllItems();
            this.sv_mail.removeAllChildren();
            var cellHeight = 98;
            var positionY = 42;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            this.saveLenghtArray = this.arrMail.length;
            //cc.log("lengh : " + this.arrMail.length);
            for(var i = 0; i<this.arrMail.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.sv_mail.width;
                cellList.setName("cell"+i);
                cellList.setPosition(cc.p(0,0));

                var bgmail = new cc.Sprite();
                bgmail.initWithFile("res/ResourceMenuTab/Mail/bgtab_mail_small.png",cc.rect(0,0,931,98));
                bgmail.setPosition(cc.p(471,positionY));

                var sp_mailRead = new cc.Sprite();
                sp_mailRead.setName("sp_mail"+i);
                if(parseInt(mail_info.arrMail[i].status) == 0)
                    sp_mailRead.initWithFile("res/ResourceMenuTab/Mail/IconMail.png",cc.rect(0,0,105,80));
                else
                    sp_mailRead.initWithFile("res/ResourceMenuTab/Mail/IconMail_s.png",cc.rect(0,0,105,80));
                sp_mailRead.setPosition(cc.p(80,bgmail.y));

                var lbtitile =  new cc.LabelTTF('',  fonts.fontName, 18, cc.size(720,30), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtitile.setPosition(cc.p(500.74,bgmail.y + 25));
                lbtitile.setString(mail_info.arrMail[i].title);
                lbtitile.setColor(cc.color("#ffdf58"));

                var lbtime =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(720,30), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbtime.setPosition(cc.p(500.74,bgmail.y));
                lbtime.setString(mail_info.arrMail[i].author + " - " + Minigame.formatDateTime(mail_info.arrMail[i].createTime));
                lbtime.setColor(cc.color("#f7ebc6"));

                var lbcontent =  new cc.LabelTTF('',  fonts.fontName, 16, cc.size(720,20), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
                lbcontent.setPosition(cc.p(500.74,bgmail.y - 25));
                var str = mail_info.arrMail[i].content;
                lbcontent.setString(str);
                if(str.length >= 85)
                    lbcontent.setString(str.substr(0,85)+"...");

                var button = new ccui.Button();
                    button.loadTextureNormal("res/ResourceMenuTab/Mail/btn_readmail.png");
                    button.setPosition(cc.p(471,positionY));
                    button.setName(i);

                    button.addTouchEventListener(function(sender,type){
                        switch (type){
                            case ccui.Widget.TOUCH_ENDED:
                                this.detail_mail(sender.name);
                                break;
                        }

                    },this);

                if(parseInt(mail_info.arrMail[i].sysMail) != 0) {
                    var btnRecycle = new ccui.Button();
                    btnRecycle.loadTextureNormal("res/ResourceMenuTab/Mail/btnBin.png");
                    btnRecycle.setPosition(cc.p(890, positionY));
                    btnRecycle.setName(i);

                    btnRecycle.addTouchEventListener(function (sender, type) {
                        switch (type) {
                            case ccui.Widget.TOUCH_ENDED:
                                this.Delete_Mail(sender.name);
                                break;
                        }

                    }, this);
                    cellList.addChild(btnRecycle);
                }

                cellList.addChild(bgmail);
                cellList.addChild(sp_mailRead);
                cellList.addChild(lbtitile);
                cellList.addChild(lbtime);
                cellList.addChild(lbcontent);
                cellList.addChild(button);


                this.sv_mail.pushBackCustomItem(cellList);
                this.closeLoading();
            }
        },
        detail_mail : function(name){
            //cc.log("name : " + name);
            this.txt_title.setString(mail_info.arrMail[name].title);
            this.txt_author.setString(mail_info.arrMail[name].author + " - " + Minigame.formatDateTime(mail_info.arrMail[name].createTime));
            this.txt_content.setString(mail_info.arrMail[name].content);

            if(parseInt(mail_info.arrMail[name].status) == 0){
                this.parserUpdateMail(mail_info.arrMail[name].mail_id);
                Minigame.Number_Mail_Unread = Minigame.Number_Mail_Unread - 1;
                if(Number(Minigame.Number_Mail_Unread) > 0){
                    Minigame.pCountEmail1.setVisible(true);
                    Minigame.pCountEmail2.setVisible(true);
                    Minigame.lb_count_email1.setString(Minigame.Number_Mail_Unread);
                    Minigame.lb_count_email2.setString(Minigame.Number_Mail_Unread);
                }else{
                    Minigame.pCountEmail1.setVisible(false);
                    Minigame.pCountEmail2.setVisible(false);
                    Minigame.lb_count_email1.setString("");
                    Minigame.lb_count_email2.setString("");
                }
                if(mail_info.sv_mail.getChildByName("cell"+name) != null){
                    var cellList = new ccui.Layout();
                    cellList = mail_info.sv_mail.getChildByName("cell"+name);
                    if(cellList.getChildByName("sp_mail"+name) != null){
                        var sp_mailRead = new cc.Sprite();
                        sp_mailRead = cellList.getChildByName("sp_mail"+name);
                        sp_mailRead.setTexture("res/ResourceMenuTab/Mail/IconMail_s.png");
                    }
                }
            }
            if(mail_info.arrMail[name].giftCode == null || mail_info.arrMail[name].giftCode == "null"){
                this.btn_add_giftcode.setVisible(false);
            }else{
                this.btn_add_giftcode.setVisible(true);
                this.saveGiftcode_mail = mail_info.arrMail[name].giftCode;
            }

            this.pn_read_mail.setVisible(true); this.pn_read_mail.runAction(cc.scaleTo(0.2,1));
        },

        Delete_Mail : function(name){
            this.idMail = mail_info.arrMail[name].mail_id;
            //cc.log("idMail: "+ this.idMail);
            popup.open_panel_message_confirm("THÔNG BÁO","Bạn có chắc chắn muốn xóa thư này!","ĐỒNG Ý","HỦY", this.parserDeleteMail, null);
        },

        parserUpdateMail: function(mailid)
        {
            //var url = urlGetMailUser(lobby.userInfo.nickname,this.current_page);
            var url = urlUpdateMailUser(mailid);
            //cc.log("url " + url);
            sendRequest(url,null,false,mail_info.callBackUpdateMail,mail_info.callBackError);
        },

        callBackUpdateMail:function(response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                //cc.log("success");
            }
        },

        parserDeleteMail: function()
        {
            //var url = urlGetMailUser(lobby.userInfo.nickname,this.current_page);
            var url = urlDeleteMailUser(mail_info.idMail);
            //cc.log("url " + url);
            sendRequest(url,null,false,mail_info.callBackDeleteMail,mail_info.callBackError);
        },
        callBackDeleteMail:function(response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if(mail_info.saveLenghtArray == 1){
                    if(mail_info.current_page > 1)
                        mail_info.current_page = mail_info.current_page - 1;
                }
                mail_info.parserDataMailUser();
            }
        },
    }
);
// panel mail
code_mail_info.BTN_CLOSE_MAIL = 160; code_mail_info.BTN_NHAN_LUOT_QUAY = 161; code_mail_info.BTN_XOA_MAIL = 162;
code_mail_info.BTN_CLOSE_READ_MAIL = 163; code_mail_info.BTN_CLOSE_NHAN_LUOT_QUAY = 164; code_mail_info.BTN_REFRESH_NHAN_LUOT_QUAY = 165; code_mail_info.BTN_NHAN_LUOT_QUAY = 166;
code_mail_info.BTN_MAIL_BACKALL = 7; code_mail_info.BTN_MAIL_BACK = 8; code_mail_info.BTN_MAIL_NEXTALL = 9; code_mail_info.BTN_MAIL_NEXT = 10;

code_mail_info.BTN_HOMEPAGE = 1; code_mail_info.BTN_EMAIL_SUPPORT = 2; code_mail_info.BTN_NEWS = 3; code_mail_info.BTN_FANPAGE = 4; code_mail_info.BTN_GROUPS = 5;
code_mail_info.BTN_ADD_GIFTCODE = 6;

var ReadMail = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            mail_info.pn_read_mail.setVisible(true);
            mail_info.pn_read_mail.runAction(cc.scaleTo(0.2,1));
            return true;
        }
        return false;
    },
});



openmail_info = function () {
    if (mail_info === null) {
        mail_info = new code_mail_info();
        mail_infoX = mail_info.getPosition().x;
        mail_infoY = mail_info.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mail_info,BaseScene.INDEX_INFO_GUI, 0);
    }else{
        mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2,1));
    }
    mail_infoAppear = true;

    mail_info.parserDataMailUser();
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
    Minigame.btn_mail.stopAllActions();
};
closemail_info = function () {
    if (mail_info === null) {
        return;
    }
    if(mail_infoAppear) {
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
        mail_info.pn_inbox_mail.runAction(cc.scaleTo(0.2,0));
        mail_infoAppear = false;
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
