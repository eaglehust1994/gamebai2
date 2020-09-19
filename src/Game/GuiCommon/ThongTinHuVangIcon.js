var ThongTinHuVang = cc.Node.extend({
    ctor: function() {
        this._super();
        this.huIcon = new cc.Sprite("res/common/nohuvang/nenHuVang.png");

        var size = this.huIcon.getContentSize();
        this.addChild(this.huIcon);

        var nenGameName =  new cc.Sprite("res/common/nohuvang/nenGameName.png");

        this.nenGameName = nenGameName;
        var gameNameLb = new ccui.Text();
        this.gameNameLb = gameNameLb;
        this.gameNameLb.setAnchorPoint(cc.p)

        var fonts = fontArial;
        gameNameLb.setAnchorPoint(cc.p(0.5, 0.5));
        gameNameLb.setFontName(fonts.fontName);
        gameNameLb.setFontSize(21);
        gameNameLb.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        //lb2.setColor({r:116, g: 62, b: 4});
        gameNameLb.setColor(cc.color.WHITE);
        gameNameLb.setString("Mậu Binh");
        gameNameLb.setPosition(nenGameName.getContentSize().width/2, nenGameName.getContentSize().height/2);

        nenGameName.setPosition(-size.width*0.06, size.height*0.25);
        nenGameName.addChild(gameNameLb);
        this.addChild(nenGameName);

        var nenRemainTime = new cc.Sprite("res/common/nohuvang/nenRemainTime.png");
        this.nenRemainTime = nenRemainTime;
        this.addChild(nenRemainTime);
        nenRemainTime.setPosition(size.width * 0.3, size.height *0.25);
        var lb = new ccui.Text();
        this.remainLb = lb;
        lb.setAnchorPoint(cc.p(0.5, 0.5));
        lb.setFontName(fonts.fontName);
        lb.setFontSize(21);
        lb.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb.setColor({r:255, g: 224, b: 55});
        lb.setString("0:30:20");
        lb.setPosition(nenRemainTime.getContentSize().width/2, nenRemainTime.getContentSize().height/2);
        nenRemainTime.addChild(this.remainLb);


        var nenBoBai = new cc.Sprite("res/common/nohuvang/nenBoBai.png");
        this.addChild(nenBoBai);
        nenBoBai.setPosition(size.width*0.08, -size.height*0.42);
        var boBai = new cc.Sprite("res/common/nohuvang/boBaiBaCay.png");
        this.boBai = boBai;
        this.nenBoBai = nenBoBai;
        //
        this.boBai.setPosition(nenBoBai.getContentSize().width/2, nenBoBai.getContentSize().height*0.35);
        nenBoBai.addChild(this.boBai);


        var nenGold = new cc.Sprite("res/common/nohuvang/nenGold.png");
        this.addChild(nenGold);
        nenGold.setPosition(size.width * 0.08, -size.height * 0.18);
        lb = new ccui.Text();
        this.goldLb = lb;
        lb.setAnchorPoint(cc.p(0.5, 0.5));
        lb.setFontName(fonts.fontName);
        lb.setFontSize(30);

        lb.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb.setColor({r:141, g: 4, b: 4});
        lb.setString("1000.000");
        lb.setPosition(nenGold.getContentSize().width/2, nenGold.getContentSize().height/2);
        nenGold.addChild(this.goldLb);
        this.nenGold = nenGold;

        this.huIconNormal = new cc.Sprite("res/common/nohuvang/huIconNormal.png");
        this.addChild(this.huIconNormal);
        this.huIconNormal.setPosition(-size.width*0.37, -size.height * 0.05);

        this.huIconLighter = new cc.Sprite("res/common/nohuvang/huIconLighter.png");
        this.addChild(this.huIconLighter);
        this.huIconLighter.setPosition(-size.width*0.37, -size.height * 0.05);

        this.iconStar1 = new cc.Sprite("res/common/nohuvang/star.png");
        this.huIconLighter.addChild(this.iconStar1);
        this.iconStar1.setPosition(this.huIconLighter.getContentSize().width*0.7, this.huIconLighter.getContentSize().height*0.4);

        this.iconStar2 = new cc.Sprite("res/common/nohuvang/star.png");
        this.huIconLighter.addChild(this.iconStar2);
        this.iconStar2.setPosition(this.huIconLighter.getContentSize().width*0.3, this.huIconLighter.getContentSize().height*0.3);

        this.iconStar3 = new cc.Sprite("res/common/nohuvang/star.png");
        this.huIconLighter.addChild(this.iconStar3);
        this.iconStar3.setPosition(this.huIconLighter.getContentSize().width*0.35, this.huIconLighter.getContentSize().height*0.6);

        this.quangSangSprite = new cc.Sprite("res/common/nohuvang/HuVangQuangSang/Quang_Sang_00.png");
        this.nenGold.addChild(this.quangSangSprite);
        this.quangSangSprite.setPosition(this.nenGold.getContentSize().width/2, this.nenGold.getContentSize().height/2);

        //cc.spriteFrameCache.addSpriteFrames("res/huVangQuangSang.plist");
        //var mostafaTexture = cc.textureCache.addImage("res/huVangQuangSang.png"), mostafaImages  = cc.SpriteBatchNode.create(mostafaTexture);
        //this.addChild(mostafaImages);
        //var animFrames = [];
        //var str = "";
        //for (var i = 0; i < 20; i++) {
        //    var str = "common/nohuvang/HuVangQuangSang/Quang_Sang_";
        //    if(i < 10){
        //        str = str +"0";
        //    }
        //    str = str + i + ".png";
        //    var frame = cc.spriteFrameCache.getSpriteFrame(str);
        //    animFrames.push(frame);
        //}
        //
        //var animation = cc.Animation.create(animFrames, 0.05, 1);
        //var animate   = new cc.Animate(animation);
        //this.runningAction = animate;

        //this.quangSangSprite.runAction(animate);
        //mostafaImages.runAction(animate);
        this.needMove = false;
        this.hasHu = false;
        this.changeToHasHu(false);
    },


    setBoBaiByType: function(type){
        if(type == GameList.SamSoLo || type == GameList.SamThuong){
            this.boBai.setTexture("res/common/nohuvang/boBaiSam.png");
        }
        else if(type == GameList.BaCay){
            this.boBai.setTexture("res/common/nohuvang/boBaiBaCay.png");
        }
        else if(type == GameList.BaiCao){
            this.boBai.setTexture("res/common/nohuvang/boBaiBaiCao.png");
        }
        else if(type == GameList.TienLenSoLo || type == GameList.TienLenThuong){
            this.boBai.setTexture("res/common/nohuvang/boBaiTienLen.png");
        }
        else if(type == GameList.MauBinh || type == GameList.MauBinhTinhAt){
            this.boBai.setTexture("res/common/nohuvang/boBaiMauBinh.png");
        }
    },

    onEnter: function(){
        cc.log("addTouch Listener");
        this._super();

        // Test
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });


        cc.eventManager.addListener(this.listener, this);
    },

    onExit: function(){
        cc.eventManager.removeListener(this.listener);

        this._super();
    },

    addHuListener: function(){
       this.needMove = true;
    },

    onTouchBegan: function(touch, event){
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();
        target.firstPoint = point;

        if(!target.isVisible() || (target.parent && !target.parent.isVisible())){
            cc.log(" visible false");
            return false;
        }

        var card = target.huIcon;
        var localPoint = card.convertToNodeSpaceAR(point);
        var rect = card.getContentSize();
        var rect2 = new cc.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
        var flag =  cc.rectContainsPoint(rect2, localPoint);

        if(flag){
            target.firstTouch = point;
            target.firstPos = target.getParent().convertToWorldSpaceAR(target.getPosition());
        }

        cc.log("target visible" + target.isVisible() + target.parent.isVisible());
        return flag;
    },

    onTouchMoved: function(touch, event){
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        if(!target.isVisible() || (target.parent && !target.parent.isVisible())){
            cc.log(" visible false");
            return false;
        }

        var movePos = cc.p(target.firstPos.x + point.x - target.firstTouch.x, target.firstPos.y + point.y - target.firstTouch.y);

        var pos = target.getParent().convertToNodeSpaceAR(movePos);

        if(target.needMove){
            target.setPosition(pos);
        }
    },

    onTouchEnded: function(touch, event){
        var target = event.getCurrentTarget();
        if(!target.isVisible() || (target.parent && !target.parent.isVisible())){
            cc.log(" visible false");
            return false;
        }

        var point = touch.getLocation();
        var endPoint = point;
        if(Math.abs(endPoint.x - target.firstPoint.x) + Math.abs(endPoint.y - target.firstPoint.y) < 5){
            BangLichSuTheLeHuVang.getInstance().openHuongDan();
        }
    },


    updateTime: function(time, gold){
        if(gold != undefined && gold != null){
            this.goldLb.setString("" + gold);
        }

        if(time != undefined && time != null){
            if(time == 0){
                this.setVisible(false);
            }else{
                this.setVisible(true);
            }
            time = Math.abs(time);
            this.remainLb.setString(this.standartTimeString(time));
        }
    },

    updateGameName: function(gameName){
        gameName = gameName.toLowerCase();
        if(gameName == "bacay"){
            this.gameNameLb.setString("Ba Cây");
            this.boBai.setTexture("res/common/nohuvang/boBaiBaCay.png");
        }
        else if(gameName == "baicao"){
            this.gameNameLb.setString("Bài Cào");
            this.boBai.setTexture("res/common/nohuvang/boBaiBaiCao.png");
        }
        else if(gameName == "tlmn"){
            this.gameNameLb.setString("Tiến Lên");
            this.boBai.setTexture("res/common/nohuvang/boBaiTienLen.png");
        }
        else if(gameName == "sam"){
            this.gameNameLb.setString("Sâm");
            this.boBai.setTexture("res/common/nohuvang/boBaiSam.png");
        }
        else if(gameName == "binh"){
            this.gameNameLb.setString("Mậu Binh");
            this.boBai.setTexture("res/common/nohuvang/boBaiMauBinh.png");
        }
    },

    updateWithData: function(data){
        this.updateGameName(data.gameName);
        if(data.remainTime > 0){
            if(this.hasHu){
                this.hasHu = false;
                this.changeToHasHu(false);
            }
        }
        else if(data.remainTime < 0 ){
            if(!this.hasHu){
                this.hasHu = true;
                this.changeToHasHu(true);
            }
        }

        if(data.remainTime == 0){
            this.setVisible(false)
        }
        else{
            this.setVisible(true);
        }


        this.remainLb.setString(this.standartTimeString(data.remainTime));
        this.goldLb.setString(StringUtility.standartNumber(data.gold));
    },

    changeToHasHu: function(hasHu){
        if(!hasHu){
            this.huIconLighter.setVisible(false);
            //changeColor;
            //this.huIconNormal.setColor({r:189, g:189, b:189});
            //this.nenGameName.setColor({r:189, g:189, b:189});
            //this.nenRemainTime.setColor({r:189, g:189, b:189});
            //this.nenGold.setColor({r:189, g:189, b:189});
            this.huIconLighter.stopAllActions();
            this.iconStar1.stopAllActions();
            this.iconStar2.stopAllActions();
            this.iconStar3.stopAllActions();
            this.quangSangSprite.setVisible(false);
            this.huIconNormal.setOpacity(200);
            this.nenGameName.setOpacity(150);
            this.nenRemainTime.setOpacity(150);
            this.nenGold.setOpacity(150);
        }
        else{
            this.huIconLighter.stopAllActions();
            this.huIconLighter.setVisible(true);
            this.huIconNormal.setColor({r:255, g:255, b:255});
            this.nenGameName.setColor({r:255, g:255, b:255});
            this.nenRemainTime.setColor({r:255, g:255, b:255});
            this.nenGold.setColor({r:255, g:255, b:255});

            this.huIconNormal.setOpacity(255);
            this.nenGameName.setOpacity(255);
            this.nenRemainTime.setOpacity(255);
            this.nenGold.setOpacity(255);

            this.huIconLighter.runAction(cc.sequence(cc.fadeIn(1), cc.fadeOut(1)).repeatForever());
            this.quangSangSprite.setVisible(true);

            //this.quangSangSprite.runAction(this.runningAction);

            this.iconStar1.setScale(0.8);
            this.iconStar2.setScale(1);
            this.iconStar3.setScale(0.6);

            this.iconStar1.runAction(cc.sequence(cc.scaleTo(0.8, 0.1), cc.scaleTo(0.8, 0.7)).repeatForever());
            this.iconStar2.runAction(cc.sequence(cc.scaleTo(1, 0.1), cc.scaleTo(1, 0.35)).repeatForever());
            this.iconStar3.runAction(cc.sequence(cc.scaleTo(0.6, 0.1), cc.scaleTo(0.6, 0.3)).repeatForever());
        }

    },

    standartTimeString: function(time){
        time = Math.abs(time);
        var gio = Math.floor(time/3600);
        var phut = Math.floor((time - gio*3600)/60);

        var giay = Math.floor((time - gio*3600 - phut*60));
        if(gio < 10){
            gio = "0" + gio;
        }

        if(phut < 10){
            phut = "0" + phut;
        }

        if(giay < 10){
            giay = "0" + giay;
        }

        return ""+ gio + ":" + phut +":"+giay;
    }
});


