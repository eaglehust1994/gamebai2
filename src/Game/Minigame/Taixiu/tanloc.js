/**
 * Created by Admin on 8/22/2016.
 */
var txTanLoc = null;
var txTanLocX = 0;
var txTanLocY = 0;
var txTanLocAppear = false;

var TXTanLocLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("TXTanLoc");
            //cc.log("MinigameLayer: 2");
            this.initWithBinaryFile("res/TXTanLoc.json");
            this.pTanLoc = null;
            this.btn_close_tan_loc = null;
            this.btn_key10k = null;
            this.btn_key50k= null;
            this.btn_key100k= null;
            this.btn_key500k= null;
            this.btn_key1M= null;
            this.btn_key10M= null;
            this.btn_tan_loc= null;
            this.btn_clear_text = null;
            this.tf_bet_tan_loc = null;
            this.lb_bet_tan_loc = null;
            this.betValue = 0;

        },
        customizeGUI: function () {
            this.pTanLoc = this._layout.getChildByName("pTanLoc");
            this.btn_close_tan_loc = this.customButton("btn_close_tan_loc",TXTanLocLayer.BTN_CLOSE_TAN_LOC, this.pTanLoc);
            this.btn_key10k = this.customButton("btn_key10k",TXTanLocLayer.BTN_KEY10K, this.pTanLoc);
            this.btn_key50k= this.customButton("btn_key50k",TXTanLocLayer.BTN_KEY50K, this.pTanLoc);
            this.btn_key100k= this.customButton("btn_key100k",TXTanLocLayer.BTN_KEY100K, this.pTanLoc);
            this.btn_key500k= this.customButton("btn_key500k",TXTanLocLayer.BTN_KEY500K, this.pTanLoc);
            this.btn_key1M= this.customButton("btn_key1M",TXTanLocLayer.BTN_KEY1M, this.pTanLoc);
            this.btn_key10M= this.customButton("btn_key10M",TXTanLocLayer.BTN_KEY10M, this.pTanLoc);
            this.btn_tan_loc= this.customButton("btn_tan_loc",TXTanLocLayer.BTN_TAN_LOC, this.pTanLoc);
            this.btn_clear_text = this.customButton("btn_clear_text",TXTanLocLayer.BTN_CLEAR_TEXT, this.pTanLoc);
            this.btn_clear_text.setVisible(false);
            this.tf_bet_tan_loc = this.getControl("tf_bet_tan_loc",this.pTanLoc);
            this.tf_bet_tan_loc.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.tf_bet_tan_loc.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.tf_bet_tan_loc.addEventListener(this.text_field_event,this);
            this.lb_bet_tan_loc = this.getControl("lb_bet_tan_loc",this.pTanLoc);
            if(cc.sys.isNative)
            {
                this.tf_bet_tan_loc.setVisible(false);
                this.lb_bet_tan_loc.setVisible(true);
            }
            else
            {
                this.tf_bet_tan_loc.setVisible(true);
                this.lb_bet_tan_loc.setVisible(false);
            }
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
            //        if(!cc.sys.isNative)
            //        {
            //            txTanLoc.tf_bet_tan_loc.attachWithIME();
            //        }
            //    }
            //});
            //cc.eventManager.addListener(listener1,  this.pTanLoc);
            this.addMasterLayer(this.pTanLoc);
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case TXTanLocLayer.BTN_CLOSE_TAN_LOC:
                    closeTXTanLoc();
                    break;
                case TXTanLocLayer.BTN_KEY10K:
                    this.inputKeyNhapNhanh(10000);
                    break;
                case TXTanLocLayer.BTN_KEY50K:
                    this.inputKeyNhapNhanh(50000);
                    break;
                case TXTanLocLayer.BTN_KEY100K:
                    this.inputKeyNhapNhanh(100000);
                    break;
                case TXTanLocLayer.BTN_KEY500K:
                    this.inputKeyNhapNhanh(500000);
                    break;
                case TXTanLocLayer.BTN_KEY1M:
                    this.inputKeyNhapNhanh(1000000);
                    break;
                case TXTanLocLayer.BTN_KEY10M:
                    this.inputKeyNhapNhanh(10000000);
                    break;
                case TXTanLocLayer.BTN_TAN_LOC:
                    if(this.betValue<1000)
                    {
                        popup.openPanel_Alert_Lobby("Tán lộc phải lớn hơn 1.000 VIN!");
                    }else
                    {
                        var taiXiuSend = new CmdSendTanLoc();
                        taiXiuSend.putTanLoc(this.betValue);
                        Minigame.miniGameClient.send(taiXiuSend);
                        taiXiuSend.clean();
                        this.lb_bet_tan_loc.setString("");
                        this.tf_bet_tan_loc.setString("");
                        this.betValue = 0;
                        closeTXTanLoc();
                    }

                    break;
                case TXTanLocLayer.BTN_CLEAR_TEXT:
                    this.betValue = 0;
                    this.changeBetValue(this.betValue);
                    this.btn_clear_text.setVisible(false);
                    break;
            }
        },
        text_field_event: function(sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.setPlaceHolder("");
                } break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.setPlaceHolder("0");
                    if(sender.getString() == 0)
                    {
                        sender.setString("");
                    }
                } break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    //cc.log("Insert character");
                    var str = sender.getString();
                    str = replaceAll(".","",str);
                    if(!isNumeric(str))
                    {
                        str = str.substr(0, str.length - 1);
                    }
                    if(!isNumeric(str))
                    {
                        str = "0";
                    }
                    txTanLoc.betValue = Number(str);
                    sender.setString(formatMoney(0,3,txTanLoc.betValue ));
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD: {
                    //cc.log("Delect character");
                    var str = sender.getString();
                    str = replaceAll(".","",str);
                    txTanLoc.betValue = Number(str);
                    sender.setString(formatMoney(0,3,txTanLoc.betValue));
                } break;
            }
        },
        changeBetValue: function(betV)
        {
            if(cc.sys.isNative)
            {
                this.lb_bet_tan_loc.setString(formatMoney(0,3,betV));
                if(!txTanLoc.btn_clear_text.isVisible())
                {
                    txTanLoc.btn_clear_text.setVisible(true);
                }
            }else
            {
                this.tf_bet_tan_loc.setString(formatMoney(0,3,betV));
                this.tf_bet_tan_loc.attachWithIME();
            }
        },
        inputKeyNhapNhanh: function(value)
        {
                if(this.betValue >= 99999999999)
                {
                }else
                {
                    this.betValue = this.betValue+value;
                    this.changeBetValue(this.betValue);
                }
        }
    }
);

openTXTanLoc = function () {
    if (txTanLoc === null) {

                //cc.log("----> Create mini game layer first time");
                txTanLoc = new TXTanLocLayer();
                txTanLocX = txTanLoc.getPosition().x;
                txTanLocY = txTanLoc.getPosition().y;
                // taiXiu.onCreate();
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(txTanLoc, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU+100);



    }else
    {
        txTanLoc.setVisible(true);
        cc.eventManager.resumeTarget(txTanLoc.pTanLoc, true);
        txTanLoc.setTag(Minigame.INDEX_TAI_XIU+100);
        txTanLoc.reOpenLayer(txTanLoc.pTanLoc);
    }
    txTanLocAppear = true;

};
closeTXTanLoc = function () {
    if (txTanLoc === null) {
        return;
    }
    if(txTanLocAppear) {
        txTanLoc.closeLayer(txTanLoc.pTanLoc);
        txTanLoc.setVisible(false);
        txTanLocAppear = false;
        cc.eventManager.pauseTarget(txTanLoc.pTanLoc, true);
    }
};



TXTanLocLayer.BTN_CLOSE_TAN_LOC = 1;
TXTanLocLayer.BTN_KEY10K = 2;
TXTanLocLayer.BTN_KEY50K= 3;
TXTanLocLayer.BTN_KEY100K=4;
TXTanLocLayer.BTN_KEY500K=5;
TXTanLocLayer.BTN_KEY1M=6;
TXTanLocLayer.BTN_KEY10M=7;
TXTanLocLayer.BTN_TAN_LOC=8;
TXTanLocLayer.BTN_CLEAR_TEXT = 9;