var caothap_guild = null;
var caothap_guildX = 0;
var caothap_guildY = 0;
var caothap_guildAppear = false;

var codeCaoThap_guild = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseGuildCT = null;
            this.pnGuildCT = null;
            this.ScrollView = null;

            this._super("codeCaoThap_guild");
            this.initWithBinaryFile("res/CaoThap_guild.json");
            return true;
        },
        customizeGUI: function() {
            this.pnGuildCT = this._layout.getChildByName("pnGuildCT");
            this.pnGuildCT.setScale(0);
            this.pnGuildCT.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseGuildCT = this.customButton("btnCloseGuildCT", codeCaoThap_guild.BTN_CLOSEGUILDCAOTHAP, this.pnGuildCT);
            this.ScrollView = this.pnGuildCT.getChildByName("ScrollView");
            this.ScrollView.setScrollBarEnabled(false);

            this.addMasterLayer(this.pnGuildCT);
        },
        onshow :function(){
            this.pnGuildCT.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeCaoThap_guild.BTN_CLOSEGUILDCAOTHAP:
                    close_caothap_guild();
                    break;
            }
        },
    });

codeCaoThap_guild.BTN_CLOSEGUILDCAOTHAP = 1;

open_caothap_guild = function () {
    if (caothap_guild == null) {
        caothap_guild = new codeCaoThap_guild();
        caothap_guildX = caothap_guild.getPosition().x;
        caothap_guildY = caothap_guild.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(caothap_guild, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        caothap_guild.setVisible(true);
        caothap_guild.pnGuildCT.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(caothap_guild.pnGuildCT, true);
        caothap_guild.setTag(Minigame.INDEX_MINI_SLOT +100);
        caothap_guild.reOpenLayer(caothap_guild.pnGuildCT);
    }
    caothap_guildAppear = true;
};
close_caothap_guild = function () {
    if (caothap_guild == null) {
        return;
    }
    if(caothap_guildAppear) {
        caothap_guild.closeLayer(caothap_guild.pnGuildCT);
        caothap_guild.setVisible(false);
        caothap_guild.pnGuildCT.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(caothap_guild.pnGuildCT, true);
        caothap_guildAppear = false;
    }
};