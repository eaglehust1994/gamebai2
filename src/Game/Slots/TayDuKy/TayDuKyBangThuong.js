var tayDuKyBangThuong = null;
var tayDuKyBangThuongAppear = false;

var TayDuKyBangThuongLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super("tayDuKyBangThuong");
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


            this.btn_close_bang_thuong = this.customButton("btn_close_bang_thuong",TayDuKyBangThuongLayer.BTN_CLOSE_BANG_THUONG, this.pBangThuong);
            this.sp_tab = this.pBangThuong.getChildByName("sp_tab");
            this.btn_neck_tab = this.customButton("btn_neck_tab",TayDuKyBangThuongLayer.BTN_NECK_TAB,this.pBangThuong);
            this.btn_back_tab = this.customButton("btn_back_tab",TayDuKyBangThuongLayer.BTN_BACK_TAB,this.pBangThuong);

        },
        onButtonRelease: function(button,id) {
            vuongQuocVin.audioVuongQuocVin.soundEffectKhoBau(vuongQuocVin.audioVuongQuocVin.button);
            switch (id) {
                case TayDuKyBangThuongLayer.BTN_CLOSE_BANG_THUONG:
                    closetayDuKyBangThuong(false);
                    break;

                case TayDuKyBangThuongLayer.BTN_NECK_TAB:
                    if(this.currentTab < 6)
                    {
                        this.currentTab ++;
                        this.sp_tab.setTexture("res/vuongQuocVin/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
                case TayDuKyBangThuongLayer.BTN_BACK_TAB:
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

opentayDuKyBangThuong = function () {
    if (tayDuKyBangThuong === null) {

        tayDuKyBangThuong = new TayDuKyBangThuongLayer();
        vuongQuocVin.addChild(tayDuKyBangThuong);


    }else
    {
        tayDuKyBangThuong.setVisible(true);
    }
    tayDuKyBangThuongAppear = true;

};
closetayDuKyBangThuong = function (isRemove) {
    if (tayDuKyBangThuong === null) {
        return;
    }
    if(isRemove)
    {
        tayDuKyBangThuong.removeFromParent();
        tayDuKyBangThuong = null;
        tayDuKyBangThuongAppear = false;
    }else
    if(tayDuKyBangThuongAppear) {
        tayDuKyBangThuong.setVisible(false);
        tayDuKyBangThuongAppear = false;
    }
};


TayDuKyBangThuongLayer.BTN_CLOSE_BANG_THUONG = 1;
TayDuKyBangThuongLayer.BTN_NECK_TAB = 2;
TayDuKyBangThuongLayer.BTN_BACK_TAB = 3;