var vqmm_thele = null;
var vqmm_theleX = null; var vqmm_theleY = null;
var vqmm_theleAppear = null;

var codeVQMM_thele = BaseLayer.extend(
    {
        ctor: function () {
            //// panel dieu khoan
            this.PanelTheLeVQ = null;
            this.btnCloseTheLe = null;
            this.sc_thele = null;
            this._super("codeVQMM_thele");
            this.initWithBinaryFile("res/VQMM_TheLe.json");
            return true;
        },
        customizeGUI: function(){
            this.PanelTheLeVQ = this._layout.getChildByName("PanelTheLeVQ");
            this.btnCloseTheLe = this.customButton("btnCloseTheLe",codeVQMM_thele.BTN_CLOSE_VQMM_THELE,this.PanelTheLeVQ);
            this.btnCloseTheLe = null;
            this.sc_thele = this.getControl("sc_thele", this.PanelTheLeVQ);
            this.sc_thele.setTouchEnabled(true);
            this.sc_thele.setClippingEnabled(true);
            this.sc_thele.setScrollBarEnabled(false);
            this.PanelTheLeVQ.setVisible(false);
            this.PanelTheLeVQ.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showvqmm_thele)));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeVQMM_thele.BTN_CLOSE_VQMM_THELE:
                    closevqmm_thele();
                    break;
            }
        },
        showvqmm_thele : function () {
            vqmm_thele.PanelTheLeVQ.setVisible(true);
            vqmm_thele.PanelTheLeVQ.runAction(cc.scaleTo(0.2,1));
        }
    }
);
codeVQMM_thele.BTN_CLOSE_VQMM_THELE = 1;



openvqmm_thele = function () {
    if (vqmm_thele === null) {
        vqmm_thele = new codeVQMM_thele();
        vqmm_theleX = vqmm_thele.getPosition().x;
        vqmm_theleY = vqmm_thele.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(vqmm_thele, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_VQMM+101);
    }
    else
    {
        vqmm_thele.PanelTheLeVQ.setVisible(true);
        vqmm_thele.PanelTheLeVQ.runAction(cc.scaleTo(0.2,1));
    }
    vqmm_theleAppear = true;
    if (!cc.sys.isNative)
        lobby.pauseItemGameListen();
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.pauseHeader();
};
closevqmm_thele = function () {
    if (vqmm_thele === null) {
        return;
    }
    if(vqmm_theleAppear) {

        vqmm_thele.PanelTheLeVQ.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
            vqmm_thele.PanelTheLeVQ.setVisible(false);
        })));
        vqmm_theleAppear = false;
        if (!cc.sys.isNative)
            lobby.resumeItemGameListen();
    }
    if(lobby.isvqmm_thele_lobby == true){
        /*if(lobby.isClickDangKy == true) {
            lobby.tf_user_name_dk.setVisible(true);
            lobby.tf_nhap_lai_mk_dk.setVisible(true);
            lobby.tf_ma_xac_nhan_dk.setVisible(true);
            lobby.tf_mat_khau_dk.setVisible(true);
        }else {
            lobby.tf_user_name_tab.setVisible(true);
            lobby.tf_pass_tab.setVisible(true);
        }*/
        lobby.isvqmm_thele_lobby = false;
    }
    if(menutab != null)
        if (!cc.sys.isNative)
            menutab.resumeHeader();
};
