var mini_guild = null;
var mini_guildX = 0;
var mini_guildY = 0;
var mini_guildAppear = false;

var codeMinipoker_guild = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseGuild = null;
            this.Pn_HuongDan = null;
            this.sp_vin_guild = null; this.sp_xu_guild = null; this.btn_vin_guild = null; this.btn_xu_guild = null;
            this.sv_guild = null; this.PanelND = null; this.pn_vin_guild = null; this.pn_xu_guild = null;
            this.vinxu_guild = null;

            this._super("codeMinipoker_guild");
            this.initWithBinaryFile("res/MiniPoker_Huongdan.json");
            return true;
        },

        customizeGUI: function() {
            this.Pn_HuongDan = this._layout.getChildByName("Pn_HuongDan");
            this.Pn_HuongDan.setScale(0);
            this.Pn_HuongDan.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseGuild = this.customButton("btnCloseGuild", codeMinipoker_guild.BTN_CLOSEGUILDMINIPOKER, this.Pn_HuongDan);

            this.sp_vin_guild = this.Pn_HuongDan.getChildByName("sp_vin_guild"); this.sp_xu_guild = this.Pn_HuongDan.getChildByName("sp_xu_guild");
            this.sv_guild = this.getControl("sv_guild",this.Pn_HuongDan); this.PanelND = this.getControl("PanelND",this.sv_guild);
            this.pn_vin_guild = this.getControl("pn_vin_guild",this.PanelND); this.pn_xu_guild = this.getControl("pn_xu_guild",this.PanelND);
            this.pn_xu_guild.setVisible(false);
            this.btn_vin_guild = this.customButton("btn_vin_guild",codeMinipoker_guild.BTN_VIN_GUILD,this.Pn_HuongDan);
            this.btn_xu_guild = this.customButton("btn_xu_guild",codeMinipoker_guild.BTN_XU_GUILD,this.Pn_HuongDan);

            this.sv_guild.setScrollBarEnabled(false);

            this.addMasterLayer(this.Pn_HuongDan);
        },
        onshow :function(){
            this.Pn_HuongDan.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeMinipoker_guild.BTN_CLOSEGUILDMINIPOKER:
                    close_minipoker_guild();
                    break;
                case codeMinipoker_guild.BTN_VIN_GUILD:
                    mini_guild.pn_vin_guild.setVisible(true); mini_guild.pn_xu_guild.setVisible(false);
                    mini_guild.sp_vin_guild.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); mini_guild.sp_xu_guild.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
                    break;
                case codeMinipoker_guild.BTN_XU_GUILD:
                    mini_guild.pn_vin_guild.setVisible(false); mini_guild.pn_xu_guild.setVisible(true);
                    mini_guild.sp_vin_guild.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); mini_guild.sp_xu_guild.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
                    break;
            }
        }
});

codeMinipoker_guild.BTN_CLOSEGUILDMINIPOKER = 1;
codeMinipoker_guild.BTN_VIN_GUILD = 2;
codeMinipoker_guild.BTN_XU_GUILD = 3;

open_minipoker_guild = function (value) {
    if (mini_guild == null) {
        mini_guild = new codeMinipoker_guild();
        mini_guildX = mini_guild.getPosition().x;
        mini_guildY = mini_guild.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_guild, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_POKER+100);
    }else
    {
        mini_guild.setVisible(true);
        mini_guild.Pn_HuongDan.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_guild.Pn_HuongDan, true);
        mini_guild.setTag(Minigame.INDEX_MINI_POKER+100);
        mini_guild.reOpenLayer(mini_guild.Pn_HuongDan);
    }
    mini_guild.vinxu_guild = value;
    mini_guildAppear = true;
    //cc.log("value = " + value);
    if(mini_guild.vinxu_guild == 1){
        mini_guild.pn_vin_guild.setVisible(true); mini_guild.pn_xu_guild.setVisible(false);
        mini_guild.sp_vin_guild.setTexture("res/Minigame/ImageChung/btn_button_tab.png"); mini_guild.sp_xu_guild.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png");
    }else{
        mini_guild.pn_vin_guild.setVisible(false); mini_guild.pn_xu_guild.setVisible(true);
        mini_guild.sp_vin_guild.setTexture("res/Minigame/ImageChung/btn_button_tab_s.png"); mini_guild.sp_xu_guild.setTexture("res/Minigame/ImageChung/btn_button_tab.png");
    }
};

close_minipoker_guild = function () {
    if (mini_guild == null) {
        return;
    }
    if(mini_guildAppear) {
        mini_guild.closeLayer(mini_guild.Pn_HuongDan);
        mini_guild.setVisible(false);
        mini_guild.Pn_HuongDan.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_guild.Pn_HuongDan, true);
        mini_guildAppear = false;
    }
};
