/**
 * Created by Admin on 9/21/2016.
 */

var maxZorderMiniGame = 0;
var arrayBackGroudMiniGame = [];
var ischeckPosition = false;
var MiniGameBaseLayer = BaseLayer.extend(
    {
        ctor: function () {
            maxZorderMiniGame++;
            this._super();
            this.pMasterLayer = null;
            this.setLocalZOrder(maxZorderMiniGame);
            this.commonImagePath = "res/Minigame/ImageChung/"
        },

        addMasterLayer:function(master)
        {
            this.pMasterLayer = master;
            this.pMasterLayer.setAnchorPoint(cc.p(0.5,0.5));
            arrayBackGroudMiniGame.push(this.pMasterLayer);
            //if(!cc.sys.isNative) {
            //    if(lobby.isOpenChat == true) {
            //        if (this.checkPosition()) {
            //            lobby.tf_chat_lobby.setVisible(false);
            //        } else {
            //            lobby.tf_chat_lobby.setVisible(true);
            //        }
            //    }
            //}

            var that = this;
            var listener1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        {
                            that.reOpenLayer1();
                        }
                        return true;
                    }
                    return false;
                },
                //Trigger when moving touch
                onTouchMoved: function (touch, event) {
                    //Move the position of current button sprite
                    var target = event.getCurrentTarget();
                    var delta = touch.getDelta();
                    target.x += delta.x;
                    target.y += delta.y;
                    //if(!cc.sys.isNative && lobby.isOpenChat == true) {
                    //    if (that.checkPosition()) {
                    //        lobby.tf_chat_lobby.setVisible(false);
                    //    } else {
                    //        lobby.tf_chat_lobby.setVisible(true);
                    //    }
                    //}

                    if(!cc.sys.isNative)
                    {
                        if(taiXiu!=null)
                        {
                            if(target == taiXiu.bg_tai_xiu)
                            {
                                if(txSoiCau != null)
                                {
                                    txSoiCau.setLocalZOrder(maxZorderMiniGame-1);
                                    txSoiCau.pSoiCauTaiXiu.x = target.x;
                                    txSoiCau.pSoiCauTaiXiu.y = target.y;
                                }
                            }
                        }
                    }
                },
                //Process the touch end event
                    onTouchEnded: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var endX = target.getPosition().x;
                    var endY = target.getPosition().y;
                    if(cc.sys.isNative)
                    {
                        if(endX < 0)
                        {
                            target.x = 0;
                        }
                        if(endX > 1280)
                        {
                            target.x = 1280;
                        }
                        if(endY < 0)
                        {
                            target.y = 0;
                        }
                        if(endY > 720)
                        {
                            target.y = 720;
                        }
                    }else
                    {
                        if(endX < -320)
                        {
                            target.x = -320;
                        }
                        if(endX > 1600)
                        {
                            target.x = 1600;
                        }
                        if(endY < -220)
                        {
                            target.y = -220;
                        }
                        if(endY > 760)
                        {
                            target.y = 760;
                        }

                    }

                }
            });

            cc.eventManager.addListener(listener1,  this.pMasterLayer);
        },
        createDraggableLayout :  function () {
            this._layout = new ccui.Layout();
            this._layout.setContentSize(cc.size(1280, 720));
            this._layout.setAnchorPoint(0,0);
            this.addChild(this._layout);
            return this._layout;
        },
        checkPosition : function(){
            for (var i = 0; i < arrayBackGroudMiniGame.length; i++) {
                var po = arrayBackGroudMiniGame[i].getPosition();
                //var re = cc.rect(po.x-arrayBackGroudMiniGame[i].getContentSize().width/2,po.y-arrayBackGroudMiniGame[i].getContentSize().height,arrayBackGroudMiniGame[i].getContentSize().width,arrayBackGroudMiniGame[i].getContentSize().height);

                if (po.x < 530 && po.y < 365) {
                    ischeckPosition = true;
                    return true;
                }
                if (arrayBackGroudMiniGame[i] == taiXiu.bg_tai_xiu && txSoiCauAppear) {
                    if (po.x < 1050 && po.y < 365) {
                        ischeckPosition = true;
                        return true;
                    }
                }
                ischeckPosition = false;
                //if(menutab.isHuOverChat == true){
                //    //ischeckPosition = true;
                //    return true;
                //}
            }
            return false;
        },
        reOpenLayer1: function(layer)
        {

            //arrayBackGroudMiniGame.push(layer);
            if(this.getLocalZOrder() == maxZorderMiniGame)
            {

            }else
            {

                maxZorderMiniGame++;
                Minigame.setLocalZOrder(maxZorderMiniGame+1);
                if(vongquay != null)
                {
                    vongquay.setLocalZOrder(maxZorderMiniGame+2);
                }

                this.setLocalZOrder(maxZorderMiniGame);
                if(vongquay_ls != null)
                {
                    vongquay_ls.setLocalZOrder(maxZorderMiniGame+3);
                }

            }
            //if(!cc.sys.isNative) {
            //    if(lobby.isOpenChat == true) {
            //        if (this.checkPosition()) {
            //            lobby.tf_chat_lobby.setVisible(false);
            //        } else {
            //            lobby.tf_chat_lobby.setVisible(true);
            //        }
            //    }
            //}
        },

        reOpenLayer: function(layer)
        {

            if(this.getLocalZOrder() == maxZorderMiniGame)
            {

            }else
            {

                maxZorderMiniGame++;
                Minigame.setLocalZOrder(maxZorderMiniGame+1);
                if(vongquay != null)
                {
                    vongquay.setLocalZOrder(maxZorderMiniGame+2);
                }
                this.setLocalZOrder(maxZorderMiniGame);
                if(vongquay_ls != null)
                {
                    vongquay_ls.setLocalZOrder(maxZorderMiniGame+3);
                }

            }
            //if(!cc.sys.isNative) {
            //    arrayBackGroudMiniGame.push(layer);
            //    if(lobby.isOpenChat == true) {
            //        if (this.checkPosition()) {
            //            lobby.tf_chat_lobby.setVisible(false);
            //        } else {
            //            lobby.tf_chat_lobby.setVisible(true);
            //        }
            //    }
            //}
        },
        closeLayer: function(layer){
            if(!cc.sys.isNative) {
                for (var i = 0; i < arrayBackGroudMiniGame.length; i++) {
                    if (arrayBackGroudMiniGame[i] == layer) {
                        arrayBackGroudMiniGame.splice(i,1);
                    }
                }
                //if(lobby.isOpenChat == true) {
                //    if (this.checkPosition()) {
                //        lobby.tf_chat_lobby.setVisible(false);
                //    } else {
                //        lobby.tf_chat_lobby.setVisible(true);
                //    }
                //}
            }
        },

        showLoading : function(){
            if(this.pMasterLayer.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = this.pMasterLayer.getContentSize().width/2;
                var y = this.pMasterLayer.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                this.pMasterLayer.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pMasterLayer.getChildByName("loadingdatamaster").setVisible(true);
                //this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        hideLoading : function (){
            //this.panelLichSuMiniPoker.getChildByName("loadingdata").stopAllActions();
            if(this.pMasterLayer.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                this.pMasterLayer.getChildByName("loadingdatamaster").setVisible(false);
            }

        }

    }
);

//MiniGameBaseLayer.maxZorder = 0;