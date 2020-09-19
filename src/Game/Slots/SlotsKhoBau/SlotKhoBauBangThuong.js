var khoBauBangThuong = null;
var khoBauBangThuongAppear = false;

var KhoBauBangThuongLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("khoBauBangThuong");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/KBBangThuong.json");
            this.pBangThuong = null;
            this.btn_close_bang_thuong = null;
            this.sp_tab = null;
            this.btn_neck_tab = null;
            this.btn_back_tab = null;
            this.currentTab = 1;
        },
        customizeGUI: function () {
            this.pBangThuong = this._layout.getChildByName("pBangThuong");
            this.btn_close_bang_thuong = this.customButton("btn_close_bang_thuong",KhoBauBangThuongLayer.BTN_CLOSE_BANG_THUONG, this.pBangThuong);
            this.sp_tab = this.pBangThuong.getChildByName("sp_tab");
            this.btn_neck_tab = this.customButton("btn_neck_tab",KhoBauBangThuongLayer.BTN_NECK_TAB,this.pBangThuong);
            this.btn_back_tab = this.customButton("btn_back_tab",KhoBauBangThuongLayer.BTN_BACK_TAB,this.pBangThuong);

        },
        onButtonRelease: function(button,id) {
            slotKhoBau.audioKhoBau.soundEffectKhoBau(slotKhoBau.audioKhoBau.button);
            switch (id) {
                case KhoBauBangThuongLayer.BTN_CLOSE_BANG_THUONG:
                    closeKhoBauBangThuong(false);
                    break;

                case KhoBauBangThuongLayer.BTN_NECK_TAB:
                    if(this.currentTab < 4)
                    {
                        this.currentTab ++;
                        this.sp_tab.setTexture("res/SlotKhoBau/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
                case KhoBauBangThuongLayer.BTN_BACK_TAB:
                    if(this.currentTab > 1)
                    {
                        this.currentTab --;
                        this.sp_tab.setTexture("res/SlotKhoBau/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
            }
        }
    }
);

openKhoBauBangThuong = function () {
    if (khoBauBangThuong === null) {

        khoBauBangThuong = new KhoBauBangThuongLayer();
        slotKhoBau.addChild(khoBauBangThuong);


    }else
    {
        khoBauBangThuong.setVisible(true);
    }
    khoBauBangThuongAppear = true;

};
closeKhoBauBangThuong = function (isRemove) {
    if (khoBauBangThuong === null) {
        return;
    }
    //if(isRemove)
    //{
    //    khoBauBangThuong.removeFromParent();
    //    khoBauBangThuong = null;
    //    khoBauBangThuongAppear = false;
    //}else
    if(khoBauBangThuongAppear) {
        khoBauBangThuong.setVisible(false);
        khoBauBangThuongAppear = false;
    }
};


KhoBauBangThuongLayer.BTN_CLOSE_BANG_THUONG = 1;
KhoBauBangThuongLayer.BTN_NECK_TAB = 2;
KhoBauBangThuongLayer.BTN_BACK_TAB = 3;