var avengerTheLeX2 = null;
var avengerTheLeX2Appear = false;

var AvengerTheLeX2Layer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("thelex2Avenger");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/AvengerTheLeX2.json");
            this.pHuongDan = null;
            this.btn_close_huong_dan = null;
        },
        customizeGUI: function () {
            this.pTheLe = this._layout.getChildByName("pTheLe");
            this.btn_close_the_le = this.customButton("btn_close_the_le",AvengerTheLeX2Layer.BTN_CLOSE_THE_LE, this.pTheLe);

        },
        onButtonRelease: function(button,id) {
            avenger.audioAvenger.soundEffect(avenger.audioAvenger.button);
            switch (id) {
                case AvengerTheLeX2Layer.BTN_CLOSE_THE_LE:
                    closeAvengerTheLeX2(false);
                    break;

            }
        }
    }
);

openAvengerTheLeX2 = function () {
    if (avengerTheLeX2 === null) {

        avengerTheLeX2 = new AvengerTheLeX2Layer();
        avenger.addChild(avengerTheLeX2);


    }else
    {
        avengerTheLeX2.setVisible(true);
    }
    avengerTheLeX2Appear = true;

};
closeAvengerTheLeX2 = function (isRemove) {
    if (avengerTheLeX2 === null) {
        return;
    }
    if(avengerTheLeX2Appear) {
        avengerTheLeX2.setVisible(false);
        avengerTheLeX2Appear = false;
    }
};


AvengerTheLeX2Layer.BTN_CLOSE_THE_LE = 35;