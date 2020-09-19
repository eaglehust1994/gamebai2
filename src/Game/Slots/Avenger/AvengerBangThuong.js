var avengerBangThuong = null;
var avengerBangThuongAppear = false;

var AvengerBangThuongLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("avengerBangThuong");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/AvengerBangThuong.json");
            this.pBangThuong = null;
            this.btn_close_bang_thuong = null;
            this.sp_tab = null;
            this.btn_neck_tab = null;
            this.btn_back_tab = null;
            this.currentTab = 1;
        },
        customizeGUI: function () {
            this.pBangThuong = this._layout.getChildByName("pBangThuong");
            this.btn_close_bang_thuong = this.customButton("btn_close_bang_thuong",AvengerBangThuongLayer.BTN_CLOSE_BANG_THUONG, this.pBangThuong);
            this.sp_tab = this.pBangThuong.getChildByName("sp_tab");
            this.btn_neck_tab = this.customButton("btn_neck_tab",AvengerBangThuongLayer.BTN_NECK_TAB,this.pBangThuong);
            this.btn_back_tab = this.customButton("btn_back_tab",AvengerBangThuongLayer.BTN_BACK_TAB,this.pBangThuong);

        },
        onButtonRelease: function(button,id) {
            avenger.audioAvenger.soundEffect(avenger.audioAvenger.button);
            switch (id) {
                case AvengerBangThuongLayer.BTN_CLOSE_BANG_THUONG:
                    closeAvengerBangThuong(false);
                    break;

                case AvengerBangThuongLayer.BTN_NECK_TAB:
                    if(this.currentTab < 6)
                    {
                        this.currentTab ++;
                        this.sp_tab.setTexture("res/Avenger/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
                case AvengerBangThuongLayer.BTN_BACK_TAB:
                    if(this.currentTab > 1)
                    {
                        this.currentTab --;
                        this.sp_tab.setTexture("res/Avenger/huongdan/tab_0"+this.currentTab + ".png");
                    }
                    break;
            }
        }
    }
);

openAvengerBangThuong = function () {
    if (avengerBangThuong === null) {

        avengerBangThuong = new AvengerBangThuongLayer();
        avenger.addChild(avengerBangThuong);


    }else
    {
        avengerBangThuong.setVisible(true);
    }
    avengerBangThuongAppear = true;

};
closeAvengerBangThuong = function (isRemove) {
    if (avengerBangThuong === null) {
        return;
    }

    if(avengerBangThuongAppear) {
        avengerBangThuong.setVisible(false);
        avengerBangThuongAppear = false;
    }
};


AvengerBangThuongLayer.BTN_CLOSE_BANG_THUONG = 1;
AvengerBangThuongLayer.BTN_NECK_TAB = 2;
AvengerBangThuongLayer.BTN_BACK_TAB = 3;