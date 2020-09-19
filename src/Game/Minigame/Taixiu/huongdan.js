var txHuongDan = null;
var txHuongDanX = 0;
var txHuongDanY = 0;
var txHuongDanAppear = false;

var TXHuongDanLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXHuongDan");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/TXHuongDan.json");
            this.pHungdan = null;
            this.btn_close_huong_dan = null;
        },
        customizeGUI: function () {
            this.pHungdan = this._layout.getChildByName("pHungdan");
            this.btn_close_huong_dan = this.customButton("btn_close_huong_dan",TXHuongDanLayer.BTN_CLOSE_HUONG_DAN, this.pHungdan);
            //var listener1 = cc.EventListener.create({
            //    event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //    swallowTouches: true,
            //    onTouchBegan: function (touch, event) {
            //        var target = event.getCurrentTarget();
            //
            //        //Get the position of the current point relative to the button
            //        var locationInNode = target.convertToNodeSpace(touch.getLocation());
            //        var s = target.getContentSize();
            //        var rect = cc.rect(0, 0, s.width, s.height);
            //
            //        //Check the click area
            //        if (cc.rectContainsPoint(rect, locationInNode)) {
            //            cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
            //            //target.setOpacity(200);
            //            return true;
            //        }
            //        return false;
            //    },
            //    //Trigger when moving touch
            //    onTouchMoved: function (touch, event) {
            //        //Move the position of current button sprite
            //        var target = event.getCurrentTarget();
            //        var delta = touch.getDelta();
            //        target.x += delta.x;
            //        target.y += delta.y;
            //    },
            //    //Process the touch end event
            //    onTouchEnded: function (touch, event) {
            //        var target = event.getCurrentTarget();
            //        cc.log("sprite onTouchesEnded.. ");
            //        //target.setOpacity(255);
            //        //Reset zOrder and the dis     ay sequence will change
            //
            //    }
            //});
            //cc.eventManager.addListener(listener1,  this.pHungdan);
            this.addMasterLayer(this.pHungdan);

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case TXHuongDanLayer.BTN_CLOSE_HUONG_DAN:
                    closeTXHuongDan();
                    break;


            }
        }
    }
);

openTXHuongDan = function () {
    if (txHuongDan === null) {


                //cc.log("----> Create mini game layer first time");
                txHuongDan = new TXHuongDanLayer();
                txHuongDanX = txHuongDan.getPosition().x;
                txHuongDanY = txHuongDan.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txHuongDan, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);



    }else
    {
        txHuongDan.setVisible(true);
        cc.eventManager.resumeTarget(txHuongDan.pHungdan, true);
        txHuongDan.setTag(Minigame.INDEX_TAI_XIU+100);
        txHuongDan.reOpenLayer(txHuongDan.pHungdan);
    }
    txHuongDanAppear = true;

};
closeTXHuongDan = function () {
    if (txHuongDan === null) {
        return;
    }
    if(txHuongDanAppear) {
        txHuongDan.closeLayer(txHuongDan.pHungdan);
        txHuongDan.setVisible(false);
        txHuongDanAppear = false;
        cc.eventManager.pauseTarget(txHuongDan.pHungdan, true);
    }
};


TXHuongDanLayer.BTN_CLOSE_HUONG_DAN = 35;