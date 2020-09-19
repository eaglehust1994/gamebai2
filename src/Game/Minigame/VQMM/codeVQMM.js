var vongquay = null;
var vongquayX = 0; var vongquayY = 0;
var vongquayAppear = false;


var codeVQMM = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_vqmm = null;
            this.btninfo = null;   this.btnclose = null;    this.notice = null;    this.btnStart = null;
            this.btnCloseNotice = null;
            this.txtNotice = null;

            this.VQMMVongngoai = null; this.VQMMVongtrong = null;
            this.vong_vin = null;
            this.VQMMResultVongNgoai = "";
            this.VQMMResultVongTrong = "";
            this.VQMMResultVongVin = "";

            this.VQMMbtnStart = null;
            this.VQMMNotice = null;
            this.lb_soluotquay = null;
            this.countVQMM = null;
            this.content_mess_trong = "";
            this.content_mess_ngoai = "";
            this.content_mess_vin= "";
            this.gocrotate = 0; this.gocrotateIn = 0;
            this.isRotate = false; this.isStopVongTrong = false;
            this.deltarotate = 10; this.deltarotateIn = 8;
            this.gocsosanh = 360; this.gocsosanhIn = 360;
            this.isresult =false; this.count_wait = 0;
            this.currentMoneyVin = null;
            this.currentMoneyXu = null;

            this.rotate_wait_result = 0; this.rotate_wait_resultIn = 0;
            this.playOrNot = false;

            this.pn_tanthu = null;
            this.btn_close_tanthu = null;
            this.btn_thamgia_tanthu = null;
            this.txt_user_tanthu = null;
            if(lobby.facebook_canvas == false)
                this.link_tanthu = "https://www.facebook.com/vinplay.vin.fanpage";

            this.pn_light = null;
            this.pn_chan = null;
            this.pn_le = null;
            this.is_light_on = false;
            this.btnguild = null;

            this._super("VongQuayMM");
            this.initWithBinaryFile("res/VongQuayMM.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_vqmm = this._layout.getChildByName("pn_vqmm");
            this.pn_vqmm.setScale(0);

            this.btninfo = this.customButton("btninfo",codeVQMM.BTN_INFO,this.pn_vqmm);
            this.btnguild = this.customButton("btnguild",codeVQMM.BTN_GUILD,this.pn_vqmm);
            this.btnclose = this.customButton("btnclose",codeVQMM.BTN_CLOSEGAME,this.pn_vqmm);
            this.VQMMbtnStart = this.customButton("btnStart",codeVQMM.BTN_STARTROTATE,this.pn_vqmm);
            this.VQMMNotice = this.pn_vqmm.getChildByName("PanelNotice");
            this.VQMMNotice.setScale(0);
            this.VQMMNotice.setVisible(false);
            this.VQMMVongngoai = this.pn_vqmm.getChildByName("Vongngoai");
            this.VQMMVongtrong = this.pn_vqmm.getChildByName("Vongtrong");
            this.vong_vin = this.pn_vqmm.getChildByName("vong_vin");

            this.btnCloseNotice = this.customButton("btnCloseNotice",codeVQMM.BTN_CLOSENOTICE,this.VQMMNotice);
            this.txtNotice  = this.getControl("txtNotice",this.VQMMNotice);
            this.txtNotice.setString("");
            this.lb_soluotquay = this.pn_vqmm.getChildByName("lb_soluotquay");

            this.lb_soluotquay.setString(lobby.userInfo.luckyRotate);
            this.countVQMM = lobby.userInfo.luckyRotate;
            this.pn_vqmm.runAction(cc.scaleTo(0.2,1));

            this.pn_tanthu = this._layout.getChildByName("pn_tanthu");
            this.pn_tanthu.setScale(0);
            this.pn_tanthu.setVisible(false);
            this.btn_close_tanthu = this.customButton("btn_close_tanthu",codeVQMM.BTN_CLOSE_TANTHU,this.pn_tanthu);
            this.btn_thamgia_tanthu = this.customButton("btn_thamgia_tanthu",codeVQMM.BTN_JOIN_TANTHU,this.pn_tanthu);
            this.txt_user_tanthu = this.getControl("txt_user_tanthu",this.pn_tanthu);
            if(lobby.isNewUser == true){
                this.pn_tanthu.setVisible(true);
                this.pn_tanthu.runAction(cc.scaleTo(0.2,1));
                lobby.isNewUser = false;
            }

            this.pn_light = this.pn_vqmm.getChildByName("pn_light");
            this.pn_chan = this.pn_light.getChildByName("pn_chan");
            this.pn_le = this.pn_light.getChildByName("pn_le");
        },
        EffectLight : function(){
            this.pn_light.stopAllActions();
            if(this.is_light_on == false){
                this.pn_le.setVisible(false);
                this.pn_chan.setVisible(true);
                this.is_light_on =true;
            }else{
                this.pn_le.setVisible(true);
                this.pn_chan.setVisible(false);
                this.is_light_on = false;
            }
            this.pn_light.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(this.EffectLight, this)));
        },
        EffectLightFinish : function(){
            this.pn_light.stopAllActions();
            if(this.is_light_on == false){
                this.pn_le.setVisible(true);
                this.pn_chan.setVisible(true);
                this.is_light_on =true;
            }else{
                this.pn_le.setVisible(false);
                this.pn_chan.setVisible(false);
                this.is_light_on = false;
            }
            this.pn_light.runAction(cc.sequence(cc.delayTime(0.1),cc.callFunc(this.EffectLightFinish, this)));
        },

        onButtonRelease: function(button,id) {
            switch (id) {
                case codeVQMM.BTN_CLOSE_TANTHU:
                    this.pn_tanthu.setScale(0);
                    this.pn_tanthu.setVisible(false);
                    break;
                case codeVQMM.BTN_JOIN_TANTHU:
                    if(cc.sys.isNative) {
                        cc.sys.openURL(this.link_tanthu);
                    }else
                        window.open(this.link_tanthu);
                    break;
                case codeVQMM.BTN_INFO:
                    openvongquay_ls();
                    break;
                case codeVQMM.BTN_CLOSEGAME:
                    if(this.playOrNot == true)
                        this.stopRotate();
                    closeVongquay();
                    break;
                case codeVQMM.BTN_STARTROTATE:
                    if (this.countVQMM > 0) {
                        this.VQMMbtnStart.setEnabled(false);
                        var vqmmSend = new CmdSendVQMM();
                        vqmmSend.putStartVQMM();
                        Minigame.miniGameClient.send(vqmmSend);
                        vqmmSend.clean();
                    }else{
                        this.VQMMbtnStart.setEnabled(true);
                        this.showNoticeVQMM("Bạn đã hết lượt quay!");
                    }
                    break;
                case codeVQMM.BTN_CLOSENOTICE:
                    this.VQMMNotice.runAction(cc.scaleTo(0.2,0));
                    this.VQMMNotice.setVisible(false);
                    break;
                case codeVQMM.BTN_GUILD:
                    openvqmm_thele();
                    break;
            }
        },

        stopRotate : function (){
            vongquay.unscheduleUpdate();
            vongquay.VQMMVongngoai.stopAllActions();
            vongquay.VQMMVongngoai.setRotation(0);
            vongquay.VQMMVongtrong.stopAllActions();
            vongquay.VQMMVongtrong.setRotation(0);
            vongquay.vong_vin.stopAllActions();
            vongquay.vong_vin.setRotation(0);
            vongquay.VQMMbtnStart.setEnabled(true);
            vongquay.btninfo.setEnabled(true);
            if(this.playOrNot == true) {
                if(lobby.userInfo == null){
                }else {
                    lobby.userInfo.vinTotal = vongquay.currentMoneyVin;
                    lobby.userInfo.xuTotal = vongquay.currentMoneyXu;
                    menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(vongquay.currentMoneyVin)));
                    menutab.lb_blance_xu.setString(formatMoney(0, 3, parseInt(vongquay.currentMoneyXu)));
                }
                this.playOrNot = false;
            }
        },

        update:function(dt){
            if(this.isRotate == true) {
                if (this.result == true) {
                    this.VQMMVongngoai.setRotation(this.gocrotate);
                    this.gocrotate = this.gocrotate + this.deltarotate;
                    if (this.gocrotate >= this.gocsosanh) {
                        this.deltarotate = this.deltarotate - 1;
                        this.gocsosanh = this.gocsosanh + 150;
                    }
                    if (this.deltarotate == 2) {
                        this.unscheduleUpdate();
                        this.isRotate = false;
                        this.deltarotate = 10;
                        this.gocsosanh = 360;
                        this.StopRotateVongNgoai();
                        this.result = false;
                        this.rotate_wait_result = 0; this.rotate_wait_resultIn = 0; this.count_wait = 0;
                    }

                    if (this.isStopVongTrong == true) {
                        this.VQMMVongtrong.setRotation(this.gocrotateIn);
                        this.vong_vin.setRotation(this.gocrotateIn);
                        this.gocrotateIn = this.gocrotateIn + this.deltarotateIn;
                        if (this.gocrotateIn >= this.gocsosanhIn) {
                            this.deltarotateIn = this.deltarotateIn - 1;
                            this.gocsosanhIn = this.gocsosanhIn + 150;
                        }

                        if (this.deltarotateIn == 2) {
                            this.deltarotateIn = 8;
                            this.gocsosanhIn = 360;
                            this.isStopVongTrong = false;
                            this.StopRotateVongTrong();
                        }
                    }
                }else{
                    //cc.log("vao vao");
                    this.VQMMVongngoai.setRotation(this.rotate_wait_result);
                    this.rotate_wait_result = this.rotate_wait_result + 10;
                    this.VQMMVongtrong.setRotation(this.rotate_wait_resultIn);
                    this.vong_vin.setRotation(this.rotate_wait_resultIn);
                    this.rotate_wait_resultIn = this.rotate_wait_resultIn + 10;
                    this.count_wait = this.count_wait + 0.001;
                    if(this.count_wait >= 3.5){
                        this.showNoticeVQMM("Không thể kết nối đến máy chủ.\nVui lòng quay lại sau!");
                        this.isRotate = false; this.count_wait = 0;
                        this.VQMMbtnStart.setEnabled(true);
                    }
                    //cc.log("time " + this.count_wait);
                }
            }
        },

        TurnOffNotice : function () {
            this.VQMMNotice.setScale(0);
            this.VQMMNotice.setVisible(false);
            this.VQMMNotice.stopAllActions();
        },

        StartRotate : function () {
            this.gocrotate = 0; this.gocrotateIn = 0;
            this.VQMMVongngoai.setRotation(this.gocrotate);
            this.VQMMVongtrong.setRotation(this.gocrotateIn);
            this.vong_vin.setRotation(this.gocrotateIn);
            this.isRotate = true;
            this.scheduleUpdate();
            this.isStopVongTrong = true;
            this.EffectLight();
        },
        StopRotateVongNgoai : function () {
            cc.log("vao 1");
            if (this.VQMMResultVongNgoai == "KhoBau3") {
                this.content_mess_ngoai = "3 lượt quay Kho Báu";
                var rotateBy2 =  new cc.RotateBy(2.95, 407.0); ///
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "NuDiepVien1") {
                this.content_mess_ngoai = "1 lượt quay Nữ Điệp Viên";
                if(parseInt(this.getRandomNumber(0,1)) == 0)
                    var rotateBy2 = new cc.RotateBy(3, 527.0); //
                else
                    var rotateBy2 = new cc.RotateBy(2.9, 377.0); //
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "NuDiepVien2") {
                this.content_mess_ngoai = "2 lượt quay Nữ Điệp Viên";
                var rotateBy2 = new cc.RotateBy(3.1, 437.0);
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "KhoBau1") {
                this.content_mess_ngoai = "1 lượt quay Kho Báu";
                var rotateBy2 = new cc.RotateBy(3, 317.0); // .0
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "fail") {
                this.content_mess_ngoai = "";
                var rotateBy2 = new cc.RotateBy(2.7, 287.0); // ok
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "NuDiepVien3") {
                this.content_mess_ngoai = "3 lượt quay Nữ Điệp Viên";
                var rotateBy2 = new cc.RotateBy(2.5, 257.0); //
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "SieuAnhHung2") {
                this.content_mess_ngoai = "2 lượt quay Siêu Anh Hùng";
                var rotateBy2 = new cc.RotateBy(2.8, 347); //
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "KhoBau2") {
                this.content_mess_ngoai = "2 lượt quay Kho Báu";
                var rotateBy2 = new cc.RotateBy(2, 197.0);  //
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "SieuAnhHung3") {
                this.content_mess_ngoai = "3 lượt quay Siêu Anh Hùng";
                var rotateBy2 = new cc.RotateBy(3.05, 497.0); // 347.0
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "more") {
                this.content_mess_ngoai = "Thêm 1 lượt";
                var rotateBy2 = new cc.RotateBy(2.95, 467.0); //
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }else if (this.VQMMResultVongNgoai == "SieuAnhHung1") {
                this.content_mess_ngoai = "1 lượt quay Siêu Anh Hùng";
                var rotateBy2 = new cc.RotateBy(2, 227.0);
                this.VQMMVongngoai.runAction(cc.sequence(rotateBy2,cc.callFunc(this.FinishRotate,this)));
            }
        },
        StopRotateVongTrong : function () {
            if (this.VQMMResultVongTrong == "200000") {
                this.content_mess_trong = "200K Xu";
                var rotateByVT2 = new cc.RotateBy(2.9, 353.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "2000000") {
                this.content_mess_trong = "2M Xu";
                var rotateByVT2 = new cc.RotateBy(2.8, 398.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "500000") {
                this.content_mess_trong = "500K Xu";
                var rotateByVT2 = new cc.RotateBy(2.75, 443.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "1000000") {
                this.content_mess_trong = "1M Xu";
                var rotateByVT2 = new cc.RotateBy(2.7, 488.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "300000") {
                this.content_mess_trong = "300K Xu";
                var rotateByVT2 = new cc.RotateBy(2.65, 533.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "3000000") {
                this.content_mess_trong = "3M Xu";
                var rotateByVT2 = new cc.RotateBy(1.8, 218.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "100000") {
                this.content_mess_trong = "100K Xu";
                var rotateByVT2 = new cc.RotateBy(2.2, 263.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }else if (this.VQMMResultVongTrong == "5000000") {
                this.content_mess_trong = "5M Xu";
                var rotateByVT2 = new cc.RotateBy(2.45, 308.5);
                this.VQMMVongtrong.runAction(rotateByVT2);
            }
            this.GetSpeedVongVin();
        },

        GetSpeedVongVin : function (){
            if (this.VQMMResultVongVin == "1000") {
                this.content_mess_vin = "1K Vin";
                var rotateByVin2 = new cc.RotateBy(2.9, 354);
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "10000") {
                this.content_mess_vin = "10K Vin";
                var rotateByVin2 = new cc.RotateBy(2.8, 399);
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "2000") {
                this.content_mess_vin = "2K Vin";
                var rotateByVin2 = new cc.RotateBy(2.75, 444);
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "50000") {
                this.content_mess_vin = "50K Vin";
                var rotateByVin2 = new cc.RotateBy(2.7, 489);
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "5000") {
                this.content_mess_vin = "5K Vin";
                var rotateByVin2 = new cc.RotateBy(2.65, 534); //
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "20000") {
                this.content_mess_vin = "20K Vin";
                var rotateByVin2 = new cc.RotateBy(1.8, 219); //
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "fail") {
                this.content_mess_vin = "";
                var rotateByVin2 = new cc.RotateBy(2.2, 264); //
                this.vong_vin.runAction(rotateByVin2);
            }else if (this.VQMMResultVongVin == "100000") {
                this.content_mess_vin = "100K Vin";
                var rotateByVin2 = new cc.RotateBy(2.45, 309); //
                this.vong_vin.runAction(rotateByVin2);
            }
        },

        FinishRotate : function () {
            this.EffectLightFinish();
            this.VQMMbtnStart.setEnabled(true);
            this.btninfo.setEnabled(true);
            lobby.userInfo.vinTotal = this.currentMoneyVin;
            lobby.userInfo.xuTotal = this.currentMoneyXu;
            menutab.lb_blance_vin.setString(formatMoney(0, 3, parseInt(this.currentMoneyVin)));
            menutab.lb_blance_xu.setString(formatMoney(0, 3, parseInt(this.currentMoneyXu)));
            this.currentMoneyVin = 0; this.currentMoneyXu = 0;
            this.playOrNot = false;

            if(this.VQMMResultVongVin == "fail"){
                if(this.VQMMResultVongNgoai == "fail"){
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_trong + "!");
                }else{
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_trong + " và " + this.content_mess_ngoai + "!");
                }
            }else{
                if(this.VQMMResultVongNgoai == "fail"){
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_vin + " và " + this.content_mess_trong + "!");
                }else{
                    this.showNoticeVQMM("Chúc mừng bạn nhận được \n" + this.content_mess_vin + ", " + this.content_mess_trong + "\nvà " + this.content_mess_ngoai + "!");
                }
            }
        },
        responseVQMM : function (error, prizeVin, prizeXu, prizeSlot, remainCount,currentMoneyVin, currentMoneyXu){
            cc.log("error: " + error + " prizeVin: " + prizeVin + " prizeXu: " + prizeXu + " prizeSlot: " + prizeSlot + " remainCount: " + remainCount + "currentMoneyVin: " + currentMoneyVin + "currentMoneyXu: " + currentMoneyXu );

            if(error == 0){
                this.countVQMM = remainCount;
                lobby.userInfo.luckyRotate = remainCount;
                if(remainCount > 0) {
                    this.lb_soluotquay.setString(remainCount);
                }else{
                    this.lb_soluotquay.setString("0");
                }

                this.StartRotate();
                this.playOrNot = true;
                this.result = true;

                this.VQMMResultVongTrong = prizeXu;
                this.VQMMResultVongNgoai = prizeSlot;
                this.VQMMResultVongVin = prizeVin;

                this.currentMoneyVin = currentMoneyVin;
                this.currentMoneyXu = currentMoneyXu;
            }else if (error == 1){
                this.showNoticeVQMM("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                this.isRotate = false; this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            }else if (error == 2){
                this.showNoticeVQMM("Bạn đã hết lượt quay!");
                this.isRotate = false; this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            }else if (error == 3){
                this.showNoticeVQMM("Mỗi ngày chỉ được quay tối đa 2 lần!");
                this.isRotate = false; this.count_wait = 0;
                this.VQMMbtnStart.setEnabled(true);
                this.btninfo.setEnabled(false);
            }
        },
        showNoticeVQMM : function (str){
            this.txtNotice.setString(str);
            this.VQMMNotice.setVisible(true);
            this.VQMMNotice.runAction(cc.sequence(cc.scaleTo(0.2,1),cc.delayTime(3.5),cc.callFunc(this.TurnOffNotice,this)));
        },

        getRandomNumber : function(min, max) {
            var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            return vRandom;
        },
    }
);

codeVQMM.BTN_INFO = 1;
codeVQMM.BTN_CLOSEGAME = 2;
codeVQMM.BTN_STARTROTATE = 3;
codeVQMM.BTN_GETFREE = 4;
codeVQMM.BTN_CLOSENOTICE = 5;

codeVQMM.BTN_CLOSE_TANTHU = 6;
codeVQMM.BTN_JOIN_TANTHU = 7;

codeVQMM.BTN_GUILD = 8;

openVongquay = function () {
    if (vongquay == null) {
        vongquay = new codeVQMM();
        vongquayX = vongquay.getPosition().x;
        vongquayY = vongquay.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(vongquay, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_VQMM);
    }else
    {
        vongquay.setVisible(true);
        vongquay.pn_vqmm.runAction(cc.scaleTo(0.2,1));
        if(lobby.isNewUser == true){
            vongquay.pn_tanthu.setVisible(true);
            vongquay.pn_tanthu.runAction(cc.scaleTo(0.2,1));
            lobby.isNewUser = false;
        }
    }
    vongquay.lb_soluotquay.setString(lobby.userInfo.luckyRotate);
    vongquay.countVQMM = lobby.userInfo.luckyRotate;
    vongquayAppear = true;
    vongquay.txt_user_tanthu.setString(lobby.userInfo.nickname);
    closeLoading();
};
closeVongquay = function () {
    if (vongquay == null) {
        return;
    }
    if(vongquayAppear) {
        vongquay.pn_vqmm.runAction(cc.scaleTo(0.2,0));
        vongquay.setVisible(false);
        vongquayAppear = false;
        vongquay.stopRotate();
        closevongquay_ls();
    }
};