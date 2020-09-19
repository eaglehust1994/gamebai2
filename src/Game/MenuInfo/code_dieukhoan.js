var dieukhoan = null;
var dieukhoanX = null; var dieukhoanY = null;
var dieukhoanAppear = null;

var code_dieukhoan = BaseLayer.extend(
    {
        ctor: function () {
            //// panel dieu khoan
            this.pn_dieu_khoan = null;
            this.btn_close_dieu_khoan = null;
            this._super("code_dieukhoan");
            this.initWithBinaryFile("res/DieuKhoanSuDung.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_dieu_khoan = this._layout.getChildByName("pn_dieu_khoan");
            this.btn_close_dieu_khoan = this.customButton("btn_close_dieu_khoan",code_dieukhoan.BTN_CLOSE_DIEUKHOAN,this.pn_dieu_khoan);
            this.pn_dieu_khoan.setVisible(false);
            this.pn_dieu_khoan.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showdieukhoan)));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_dieukhoan.BTN_CLOSE_DIEUKHOAN:
                    closedieukhoan();
                    break;
            }
        },
        showdieukhoan : function () {
            dieukhoan.pn_dieu_khoan.setVisible(true);
            dieukhoan.pn_dieu_khoan.runAction(cc.scaleTo(0.2,1));
        }
    }
);
code_dieukhoan.BTN_CLOSE_DIEUKHOAN = 1;



opendieukhoan = function () {
    if (dieukhoan === null) {
        dieukhoan = new code_dieukhoan();
        dieukhoanX = dieukhoan.getPosition().x;
        dieukhoanY = dieukhoan.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(dieukhoan,BaseScene.INDEX_INFO_GUI, 1);
    }
    else
    {
        //dieukhoan.pn_dieu_khoan.setVisible(true);
        dieukhoan.pn_dieu_khoan.runAction(cc.scaleTo(0.2,1));
    }
    dieukhoanAppear = true;
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closedieukhoan = function () {
    if (dieukhoan === null) {
        return;
    }
    if(dieukhoanAppear) {
        //dieukhoan.pn_dieu_khoan.setVisible(false);
        dieukhoan.pn_dieu_khoan.runAction(cc.scaleTo(0.2,0));
        dieukhoanAppear = false;
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
    }
    if(lobby.isDieuKhoan_lobby == true){
        /*if(lobby.isClickDangKy == true) {
            lobby.tf_user_name_dk.setVisible(true);
            lobby.tf_nhap_lai_mk_dk.setVisible(true);
            lobby.tf_ma_xac_nhan_dk.setVisible(true);
            lobby.tf_mat_khau_dk.setVisible(true);
        }else {
            lobby.tf_user_name_tab.setVisible(true);
            lobby.tf_pass_tab.setVisible(true);
        }*/
        lobby.isDieuKhoan_lobby = false;
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
