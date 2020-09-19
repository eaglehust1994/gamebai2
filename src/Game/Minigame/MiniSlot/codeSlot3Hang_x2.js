var mini_slot_x2 = null;
var mini_slot_x2X = 0;
var mini_slot_x2Y = 0;
var mini_slot_x2Appear = false;

var codeSlot3Hang_x2 = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseHelpSlot = null;
            this.pnHelpSlot = null;

            this._super("codeSlot3Hang_x2");
            this.initWithBinaryFile("res/Slot3hang_theleX2.json");
            return true;
        },
        customizeGUI: function() {
            this.pnHelpSlot = this._layout.getChildByName("pnHelpSlot");
            this.pnHelpSlot.setScale(0);
            this.pnHelpSlot.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseHelpSlot = this.customButton("btnCloseHelpSlot", codeSlot3Hang_x2.BTN_CLOSEGUILDMINISLOT, this.pnHelpSlot);

            this.addMasterLayer(this.pnHelpSlot);
        },
        onshow :function(){
            this.pnHelpSlot.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeSlot3Hang_x2.BTN_CLOSEGUILDMINISLOT:
                    close_minislot_x2();
                    break;
            }
        },
    });


codeSlot3Hang_x2.BTN_CLOSEGUILDMINISLOT = 1;

open_minislot_x2= function () {
    if (mini_slot_x2 == null) {
        mini_slot_x2 = new codeSlot3Hang_x2();
        mini_slot_x2X = mini_slot_x2.getPosition().x;
        mini_slot_x2Y = mini_slot_x2.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(mini_slot_x2, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT+100);
    }else
    {
        mini_slot_x2.setVisible(true);
        mini_slot_x2.pnHelpSlot.runAction(cc.scaleTo(0.2,1));
        cc.eventManager.resumeTarget(mini_slot_x2.pnHelpSlot, true);
        mini_slot_x2.setTag(Minigame.INDEX_MINI_SLOT +100);
    }
    mini_slot_x2Appear = true;
    //mini_slot_x2.parserDataLichSuVQMM();
};
close_minislot_x2 = function () {
    if (mini_slot_x2 == null) {
        return;
    }
    if(mini_slot_x2Appear) {
        mini_slot_x2.closeLayer(mini_slot_x2.pnHelpSlot);
        mini_slot_x2.setVisible(false);
        mini_slot_x2.pnHelpSlot.runAction(cc.scaleTo(0.2,0));
        cc.eventManager.pauseTarget(mini_slot_x2.pnHelpSlot, true);
        mini_slot_x2Appear = false;
    }
};