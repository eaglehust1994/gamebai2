var mini_slot_guild = null;
var mini_slot_guildX = 0;
var mini_slot_guildY = 0;
var mini_slot_guildAppear = false;

var codeSlot3Hang_guild = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseHelpSlot = null;
            this.pnHelpSlot = null;

            this._super("codeSlot3Hang_guild");
            this.initWithBinaryFile("res/Slot3Hang_guild.json");
            return true;
        },
        customizeGUI: function() {
            this.pnHelpSlot = this._layout.getChildByName("pnHelpSlot");
            this.pnHelpSlot.setScale(0);
            this.pnHelpSlot.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseHelpSlot = this.customButton("btnCloseHelpSlot", codeSlot3Hang_guild.BTN_CLOSEGUILDMINISLOT, this.pnHelpSlot);

            this.addMasterLayer(this.pnHelpSlot);
        },
        onshow :function(){
            this.pnHelpSlot.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeSlot3Hang_guild.BTN_CLOSEGUILDMINISLOT:
                    close_minislot_guild();
                    break;
            }
        },
    });

codeSlot3Hang_guild.BTN_CLOSEGUILDMINISLOT = 1;

open_minislot_guild = function () {
    if (mini_slot_guild == null) {
        mini_slot_guild = new codeSlot3Hang_guild();
        mini_slot_guildX = mini_slot_guild.getPosition().x;
        mini_slot_guildY = mini_slot_guild.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_slot_guild, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        mini_slot_guild.setVisible(true);
        mini_slot_guild.pnHelpSlot.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_slot_guild.pnHelpSlot, true);
        mini_slot_guild.setTag(Minigame.INDEX_MINI_SLOT +100);
        mini_slot_guild.reOpenLayer(mini_slot_guild.pnHelpSlot);
    }
    mini_slot_guildAppear = true;
    //mini_slot_guild.parserDataLichSuVQMM();
};
close_minislot_guild = function () {
    if (mini_slot_guild == null) {
        return;
    }
    if(mini_slot_guildAppear) {
        mini_slot_guild.closeLayer(mini_slot_guild.pnHelpSlot);
        mini_slot_guild.setVisible(false);
        mini_slot_guild.pnHelpSlot.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_slot_guild.pnHelpSlot, true);
        mini_slot_guildAppear = false;
    }
};