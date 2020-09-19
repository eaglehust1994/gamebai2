/**
 * Created by Admin on 9/16/2016.
 */
var bcHuongDan = null;
var bcHuongDanX = 0;
var bcHuongDanY = 0;
var bcHuongDanAppear = false;

var BCHuongDanLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("bcHuongDan");
            cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/BCHuongDan.json");
            this.pHungdan = null;
            this.btn_close_huong_dan = null;
        },
        customizeGUI: function () {
            this.pHungdan = this._layout.getChildByName("pHuongDan");
            this.btn_close_huong_dan = this.customButton("btn_close",BCHuongDanLayer.BTN_CLOSE, this.pHungdan);
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
            //        //Reset zOrder and the display sequence will change
            //
            //    }
            //});
            //cc.eventManager.addListener(listener1,  this.pHungdan);
            this.addMasterLayer(this.pHungdan);
        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case BCHuongDanLayer.BTN_CLOSE:
                    closebcHuongDan();
                    break;


            }
        }
    }
);

openbcHuongDan = function () {
    if (bcHuongDan === null) {

        cc.log("----> Create mini game layer first time");
        bcHuongDan = new BCHuongDanLayer();
        bcHuongDanX = bcHuongDan.getPosition().x;
        bcHuongDanY = bcHuongDan.getPosition().y;
        // taiXiu.onCreate();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bcHuongDan, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);
    }else
    {
        bcHuongDan.setVisible(true);
        cc.eventManager.resumeTarget(bcHuongDan.pHungdan, true);
        bcHuongDan.setTag(Minigame.INDEX_TAI_XIU+100);
        bcHuongDan.reOpenLayer(bcHuongDan.pHungdan);
    }
    bcHuongDanAppear = true;
};
closebcHuongDan = function () {
    if (bcHuongDan === null) {
        return;
    }
    if(bcHuongDanAppear) {
        bcHuongDan.closeLayer(bcHuongDan.pHungdan);
        bcHuongDan.setVisible(false);
        bcHuongDanAppear = false;
        cc.eventManager.pauseTarget(bcHuongDan.pHungdan, true);
    }
};


BCHuongDanLayer.BTN_CLOSE = 35;