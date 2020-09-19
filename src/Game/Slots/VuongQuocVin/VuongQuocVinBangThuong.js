var vuongQuocVinBangThuong = null;
var vuongQuocVinBangThuongAppear = false;

var VuongQuocVinBangThuongLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super("vuongQuocVinBangThuong");
            this.pBangThuong = null;
            this.btn_close_bang_thuong = null;
            this.sp_tab = null;
            this.btn_neck_tab = null;
            this.btn_back_tab = null;
            this.currentTab = 1;
        },
        customizeGUI: function () {

            this.pBangThuong = new ccui.Layout();
            this.pBangThuong.setContentSize(size);
            this.pBangThuong.setTouchEnabled(true);
            this.pBangThuong.setBackGroundImage("");
            this.pBangThuong.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pBangThuong.setBackGroundColor(cc.color.BLACK);
            this.pBangThuong.setBackGroundColorOpacity(200);
            //this.pBangThuong.setPosition(position);

            this.addChild(this.pBangThuong);


            this.btn_close_bang_thuong = this.customButton("btn_close_bang_thuong",VuongQuocVinBangThuongLayer.BTN_CLOSE_BANG_THUONG, this.pBangThuong);
            this.sp_tab = this.pBangThuong.getChildByName("sp_tab");
            this.btn_neck_tab = this.customButton("btn_neck_tab",VuongQuocVinBangThuongLayer.BTN_NECK_TAB,this.pBangThuong);
            this.btn_back_tab = this.customButton("btn_back_tab",VuongQuocVinBangThuongLayer.BTN_BACK_TAB,this.pBangThuong);

        },
        onButtonRelease: function(button,id) {
            vuongQuocVin.audioVuongQuocVin.soundEffectKhoBau(vuongQuocVin.audioVuongQuocVin.button);
            switch (id) {
                case VuongQuocVinBangThuongLayer.BTN_CLOSE_BANG_THUONG:
                    closevuongQuocVinBangThuong(false);
                    break;

                case VuongQuocVinBangThuongLayer.BTN_NECK_TAB:
                    if(this.currentTab < 6)
                    {
                        this.currentTab ++;
                        this.sp_tab.setTexture("res/vuongQuocVin/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
                case VuongQuocVinBangThuongLayer.BTN_BACK_TAB:
                    if(this.currentTab > 1)
                    {
                        this.currentTab --;
                        this.sp_tab.setTexture("res/vuongQuocVin/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
            }
        }
    }
);

openvuongQuocVinBangThuong = function () {
    if (vuongQuocVinBangThuong === null) {

        vuongQuocVinBangThuong = new VuongQuocVinBangThuongLayer();
        vuongQuocVin.addChild(vuongQuocVinBangThuong);


    }else
    {
        vuongQuocVinBangThuong.setVisible(true);
    }
    vuongQuocVinBangThuongAppear = true;

};
closevuongQuocVinBangThuong = function (isRemove) {
    if (vuongQuocVinBangThuong === null) {
        return;
    }
    if(isRemove)
    {
        vuongQuocVinBangThuong.removeFromParent();
        vuongQuocVinBangThuong = null;
        vuongQuocVinBangThuongAppear = false;
    }else
    if(vuongQuocVinBangThuongAppear) {
        vuongQuocVinBangThuong.setVisible(false);
        vuongQuocVinBangThuongAppear = false;
    }
};


VuongQuocVinBangThuongLayer.BTN_CLOSE_BANG_THUONG = 1;
VuongQuocVinBangThuongLayer.BTN_NECK_TAB = 2;
VuongQuocVinBangThuongLayer.BTN_BACK_TAB = 3;