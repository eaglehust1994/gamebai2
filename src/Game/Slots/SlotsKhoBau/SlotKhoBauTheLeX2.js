var slotKhoBauTheLeX2 = null;
var slotKhoBauTheLeX2Appear = false;

var SlotKhoBauTheLeX2Layer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("thelex2KB");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/KBTheLeX2.json");
            this.pTheLe = null;
            this.btn_close_the_le = null;
        },
        customizeGUI: function () {
            this.pTheLe = this._layout.getChildByName("pTheLe");
            this.btn_close_the_le = this.customButton("btn_close_the_le",SlotKhoBauTheLeX2Layer.BTN_CLOSE_THE_LE, this.pTheLe);

        },
        onButtonRelease: function(button,id) {
            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
            switch (id) {
                case SlotKhoBauTheLeX2Layer.BTN_CLOSE_THE_LE:
                    closeSlotKhoBauTheLeX2(false);
                    break;

            }
        }
    }
);

openSlotKhoBauTheLeX2 = function () {
    if (slotKhoBauTheLeX2 === null) {

        slotKhoBauTheLeX2 = new SlotKhoBauTheLeX2Layer();
        slotKhoBau.addChild(slotKhoBauTheLeX2);


    }else
    {
        slotKhoBauTheLeX2.setVisible(true);
    }
    slotKhoBauTheLeX2Appear = true;

};
closeSlotKhoBauTheLeX2 = function (isRemove) {
    if (slotKhoBauTheLeX2 === null) {
        return;
    }
    if(isRemove)
    {
        slotKhoBauTheLeX2.removeFromParent();
        slotKhoBauTheLeX2 = null;
        slotKhoBauTheLeX2Appear = false;
    }else
    if(slotKhoBauTheLeX2Appear) {
        slotKhoBauTheLeX2.setVisible(false);
        slotKhoBauTheLeX2Appear = false;
    }
};


SlotKhoBauTheLeX2Layer.BTN_CLOSE_THE_LE = 35;