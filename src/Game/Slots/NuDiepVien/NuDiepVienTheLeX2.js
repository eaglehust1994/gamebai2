var nuDiepVienTheLeX2 = null;
var nuDiepVienTheLeX2Appear = false;

var NuDiepVienTheLeX2Layer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("thelex2NDV");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/NDVTheLeX2.json");
            this.pHuongDan = null;
            this.btn_close_huong_dan = null;
        },
        customizeGUI: function () {
            this.pTheLe = this._layout.getChildByName("pTheLe");
            this.btn_close_the_le = this.customButton("btn_close_the_le",NuDiepVienTheLeX2Layer.BTN_CLOSE_THE_LE, this.pTheLe);

        },
        onButtonRelease: function(button,id) {
            nuDiepVien.audioNuDiepVien.soundEffectKhoBau(nuDiepVien.audioNuDiepVien.button);
            switch (id) {
                case NuDiepVienTheLeX2Layer.BTN_CLOSE_THE_LE:
                    closeNuDiepVienTheLeX2(false);
                    break;

            }
        }
    }
);

openNuDiepVienTheLeX2 = function () {
    if (nuDiepVienTheLeX2 === null) {

        nuDiepVienTheLeX2 = new NuDiepVienTheLeX2Layer();
        nuDiepVien.addChild(nuDiepVienTheLeX2);


    }else
    {
        nuDiepVienTheLeX2.setVisible(true);
    }
    nuDiepVienTheLeX2Appear = true;

};
closeNuDiepVienTheLeX2 = function (isRemove) {
    if (nuDiepVienTheLeX2 === null) {
        return;
    }
    if(nuDiepVienTheLeX2Appear) {
        nuDiepVienTheLeX2.setVisible(false);
        nuDiepVienTheLeX2Appear = false;
    }
};


NuDiepVienTheLeX2Layer.BTN_CLOSE_THE_LE = 35;