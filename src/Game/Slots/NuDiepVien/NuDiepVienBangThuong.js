var nuDiepVienBangThuong = null;
var nuDiepVienBangThuongAppear = false;

var NuDiepVienBangThuongLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("nuDiepVienBangThuong");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/NDVBangThuong.json");
            this.pBangThuong = null;
            this.btn_close_bang_thuong = null;
            this.sp_tab = null;
            this.btn_neck_tab = null;
            this.btn_back_tab = null;
            this.currentTab = 1;
        },
        customizeGUI: function () {
            this.pBangThuong = this._layout.getChildByName("pBangThuong");
            this.btn_close_bang_thuong = this.customButton("btn_close_bang_thuong",NuDiepVienBangThuongLayer.BTN_CLOSE_BANG_THUONG, this.pBangThuong);
            this.sp_tab = this.pBangThuong.getChildByName("sp_tab");
            this.btn_neck_tab = this.customButton("btn_neck_tab",NuDiepVienBangThuongLayer.BTN_NECK_TAB,this.pBangThuong);
            this.btn_back_tab = this.customButton("btn_back_tab",NuDiepVienBangThuongLayer.BTN_BACK_TAB,this.pBangThuong);

        },
        onButtonRelease: function(button,id) {
            nuDiepVien.audioNuDiepVien.soundEffectKhoBau(nuDiepVien.audioNuDiepVien.button);
            switch (id) {
                case NuDiepVienBangThuongLayer.BTN_CLOSE_BANG_THUONG:
                    closeNuDiepVienBangThuong(false);
                    break;

                case NuDiepVienBangThuongLayer.BTN_NECK_TAB:
                    if(this.currentTab < 6)
                    {
                        this.currentTab ++;
                        this.sp_tab.setTexture("res/NuDiepVien/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
                case NuDiepVienBangThuongLayer.BTN_BACK_TAB:
                    if(this.currentTab > 1)
                    {
                        this.currentTab --;
                        this.sp_tab.setTexture("res/NuDiepVien/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
            }
        }
    }
);

openNuDiepVienBangThuong = function () {
    if (nuDiepVienBangThuong === null) {

        nuDiepVienBangThuong = new NuDiepVienBangThuongLayer();
        nuDiepVien.addChild(nuDiepVienBangThuong);


    }else
    {
        nuDiepVienBangThuong.setVisible(true);
    }
    nuDiepVienBangThuongAppear = true;

};
closeNuDiepVienBangThuong = function (isRemove) {
    if (nuDiepVienBangThuong === null) {
        return;
    }
    if(nuDiepVienBangThuongAppear) {
        nuDiepVienBangThuong.setVisible(false);
        nuDiepVienBangThuongAppear = false;
    }
};


NuDiepVienBangThuongLayer.BTN_CLOSE_BANG_THUONG = 1;
NuDiepVienBangThuongLayer.BTN_NECK_TAB = 2;
NuDiepVienBangThuongLayer.BTN_BACK_TAB = 3;