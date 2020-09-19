var ButtonMoiChoi = cc.Node.extend({

    ctor: function() {
        this._super();
        that = this;
        this.bg_moichoi = new cc.Sprite("res/CardGame/CommonResource/ChonBan/btn_moichoi.png");
        var size = this.bg_moichoi.getContentSize();
        this.bg_moichoi.setPosition(1230, 590);
        this.addChild(this.bg_moichoi);
        if(gameLobbyInstance)
            gameLobbyInstance.huVangIcon.setVisible(false);

        listHuMoving = cc.EventListener.create(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                startX: 0,
                startY: 0,
                deltaMove: 10,
                onTouchBegan: function (touch, event) {
                    var locationInNode = that.bg_moichoi.convertToNodeSpace(touch.getLocation());
                    var s = that.bg_moichoi.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        startX = touch.getLocation().x;
                        startY = touch.getLocation().y;
                        return true;
                    }
                    return false;
                },
                onTouchMoved: function (touch, event) {
                    var delta = touch.getDelta();
                    that.bg_moichoi.x += delta.x;
                    that.bg_moichoi.y += delta.y;
                },
                //Process the touch end event
                onTouchEnded: function (touch, event) {
                    var curX = touch.getLocation().x;
                    var curY = touch.getLocation().y;
                    var dxy = Math.abs(startX - curX) + Math.abs(startY - curY);
                    if(dxy <= this.deltaMove)
                    {
                        that.show_MoiChoi();
                    }
                    if(curX<0)
                    {
                        touch.x =0;
                    }
                    if(curX > 1920)
                    {
                        touch.x =1920;
                    }
                    if(curY<0)
                    {
                        touch.y =0;
                    }
                    if(curY > 1080)
                    {
                        touch.x =1080;
                    }
                }
            }
        );
        cc.eventManager.addListener(listHuMoving, this.bg_moichoi);
    },

    show_MoiChoi : function(){
        if(gameWsClient){
            if(gameData.openMoiChoi == false)
                gameWsClient.sendGetInfoMoiChoi();
        }
    },
});