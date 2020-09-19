var khoBauHuongDan = null;
var khoBauHuongDanAppear = false;

var KhoBauHuongDanLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("khoBauHuongDan");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/KBHuongDan.json");
            this.pHuongDan = null;
            this.btn_close_huong_dan = null;
        },
        customizeGUI: function () {
            this.pHuongDan = this._layout.getChildByName("pHuongDan");
            this.btn_close_huong_dan = this.customButton("btn_close_huong_dan",KhoBauHuongDanLayer.BTN_CLOSE_HUONG_DAN, this.pHungdan);

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case KhoBauHuongDanLayer.BTN_CLOSE_HUONG_DAN:
                    closeKhoBauHuongDan(false);
                    break;

            }
        }
    }
);

openKhoBauHuongDan = function () {
    if (khoBauHuongDan === null) {

        khoBauHuongDan = new KhoBauHuongDanLayer();
        slotKhoBau.addChild(khoBauHuongDan);


    }else
    {
        khoBauHuongDan.setVisible(true);
    }
    khoBauHuongDanAppear = true;

};
closeKhoBauHuongDan = function (isRemove) {
    if (khoBauHuongDan === null) {
        return;
    }
    if(khoBauHuongDanAppear) {
        khoBauHuongDan.setVisible(false);
        khoBauHuongDanAppear = false;
    }
};


KhoBauHuongDanLayer.BTN_CLOSE_HUONG_DAN = 35;