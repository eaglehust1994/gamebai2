//
Lieng.BuyInLayer = BaseLayer.extend({
    ctor: function(){
        this._super();
    //    this.initWithBinaryFile("res/g_res_cardGame_json_LiengBuyInScene.json");
        this.gameLayer = null;

        this.setContentSize(cc.winSize);
        this.setAnchorPoint(cc.p(.5,.5));
        this.customizeGUI2();

        this.buyInAmount = 0;
        this.minBuyIn = 0;
        this.maxBuyIn = 0;
        this.recommendRate = 20;
        this.setTouchDisable = false;
    },

    onEnter: function(){
        cc.Layer.prototype.onEnter.call(this);

        //this.setInit();

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouch: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });

        this._layerColor.setVisible(true);
        this._layerColor.runAction(cc.fadeTo(.25,150));
        this.setFog(true);
    },

    show: function(){
        cc.log("show notify buyin");
        this.setVisible(true);
        this.bg.setScale(0.2);
        this.setInit();
    },

    onTouchBegan: function(touch, event){
        cc.log("onTouchBegan");
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();


        var  nutKeo = target.nutKeo;

        if(nutKeo.isVisible() == false){
            return false;
        }

        target.firstTouch = point;
        //target.initPosNutKeo = target.nutKeo.getPosition();

        target.initPos = target.nutKeo.convertToWorldSpaceAR(cc.p(0,0));

        var localPoint = nutKeo.convertToNodeSpaceAR(point);
        var rect = nutKeo.getContentSize();
        var rect2 = new cc.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
        cc.log("localPoint pos: " + localPoint.x + " " + localPoint.y);
        return cc.rectContainsPoint(rect2, localPoint);
    },

    onTouchMoved: function(touch, event){
        cc.log("onTouch Moved");
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();
        var nutKeo = target.nutKeo;

        var localPoint = target.bg.convertToNodeSpace(point);

        var minNode = target.minNode;
        var minPointWorld = minNode.convertToWorldSpaceAR(cc.p(0,0));
        var minPoint = target.bg.convertToNodeSpace(minPointWorld);

        var maxNode = target.maxNode;
        var maxPointWorld = maxNode.convertToWorldSpaceAR(cc.p(0,0));
        var maxPoint = target.bg.convertToNodeSpace(maxPointWorld);

        var newPos = cc.p(target.initPos.x + point.x - target.firstTouch.x, target.initPos.y);
        newPos = target.bg.convertToNodeSpace(newPos);

        if(newPos.x >= maxPoint.x){
            nutKeo.setPositionX(maxPoint.x);
        }
        else if(newPos.x <= minPoint.x){
            nutKeo.setPositionX(minPoint.x);
        }
        else{
            nutKeo.setPositionX(newPos.x);
        }

        var percentage = Math.floor((nutKeo.getPosition().x - minPoint.x)*1000/(maxPoint.x - minPoint.x))/1000;

        if(percentage <= 0){
            percentage = 0;
        }
        if(percentage >= 0.998){
            percentage = 1;
        }

        target.percentage = percentage;
        target.thanhHong.setScaleX(percentage);
        target.countBuyInMoney(percentage);
    },

    onTouchEnded: function(touch, event){
        var i = 0;
        var target = event.getCurrentTarget();
        var point = touch.getLocation();

        target.countBuyInMoney(target.percentage);
    },

    countBuyInMoney: function(percent){
        if(percent == 1)
            this.buyInAmount = this.maxBuyIn;
        else{
            this.buyInAmount = Math.floor(((this.maxBuyIn - this.minBuyIn)*percent)) + this.minBuyIn;
            this.buyInAmount = this.buyInAmount - this.buyInAmount% (Lieng.gameLogic.bet);
        }

        this.lbBuyInAmount.setString(StringUtility.standartNumber(this.buyInAmount));
    },

    setBuyInMoney: function(money){
        this.buyInAmount = money - money% (Lieng.gameLogic.bet);
        this.lbBuyInAmount.setString(StringUtility.standartNumber(this.buyInAmount));
    },

    setPercentageThanhBet: function(percent){
        if(percent < 0)
            percent = 0;

        if(percent > 1){
            percent = 1;
        }

        cc.log("setPercent: " + percent);
        this.thanhHong.setScaleX(percent);
        var minPos = this.startNode.x;
        var maxPos = this.endNode.x;
        this.nutKeo.setPositionX(minPos + (maxPos - minPos)*percent);
    },

    setInit: function(){
        cc.log("setInit Buy In");
        var currentMoney;
        if(Lieng.gameLogic.moneyType == MONEY_VIN){
            currentMoney = lobby.userInfo.vinTotal;
            this.textTuDongBuyIn.setString("Tự động mua vào khi hết Vin");
        }
        else{
            currentMoney = lobby.userInfo.xuTotal;
            this.textTuDongBuyIn.setString("Tự động mua vào khi hết Xu");
        }

        this.minBuyIn = Lieng.gameLogic.bet*Lieng.gameLogic.minBuyInTiLe;
        this.maxBuyIn = Math.min(currentMoney, Lieng.gameLogic.bet*Lieng.gameLogic.maxBuyInTiLe );
        if(currentMoney <= this.minBuyIn){
            this.maxBuyIn = this.minBuyIn;
        }

        this.buyInAmount = this.minBuyIn;
        this.lbBuyInAmount.setString("" + StringUtility.standartNumber(this.buyInAmount));

        this.lbToiThieu.setString("" + StringUtility.standartNumber(this.minBuyIn));
        this.lbToiDa.setString("" + StringUtility.standartNumber(this.maxBuyIn));
        this.bg.setScale(0.2);
        this.bg.runAction(cc.scaleTo(0.13, 1, 1));


        var percentage = 0;

        if(this.recommendRate * Lieng.gameLogic.bet  < currentMoney && this.recommendRate*Lieng.gameLogic.bet < this.maxBuyIn){
            if(this.maxBuyIn <= this.minBuyIn){
                percentage = 0;
            }
            else{
                percentage = Math.floor((this.recommendRate*Lieng.gameLogic.bet - this.minBuyIn)*1000/(this.maxBuyIn - this.minBuyIn))/1000;
            }
        }

        this.percentage = percentage;
        this.thanhHong.setScaleX(percentage);
        this.nutKeo.setPositionX(  this.minNode.x + percentage*Math.floor((this.maxNode.x - this.minNode.x)));
        this.countBuyInMoney(percentage);

        if(this.recommendRate * Lieng.gameLogic.bet  < currentMoney && this.recommendRate*Lieng.gameLogic.bet < this.maxBuyIn){
            if(this.maxBuyIn <= this.minBuyIn){
            }
            else{
                this.setBuyInMoney(this.recommendRate*Lieng.gameLogic.bet);
            }
        }



        if(this.minBuyIn >= this.maxBuyIn){
            this.setTouchDisable = true;
        }
    },

    customizeGUI2: function(){
        this.addSprite(this,"bg",cc.p(640,360),res_CardGame_Poker+"/buyInBg.png");
        this.addText(this["bg"],"titleBuyIn",cc.p(386,502),"MUA VÀO",RobotoRegular.fontName,28);
        this["titleBuyIn"].setColor(cc.color("#642A00"));

        this.addSprite(this["bg"],"imgToiThieu",cc.p(400,256),res_CardGame_Poker+"/bgBack.png");
        this.addText(this["imgToiThieu"],"lbToiThieu",cc.p(201,27),"10000000",RobotoRegular.fontName,24);
        this.addText(this["imgToiThieu"],"lbTextToiThieu_0",cc.p(67,23),"Tối thiểu:",RobotoRegular.fontName,22);
        this["lbTextToiThieu_0"].setColor(cc.color("#000000"));
        this.addSprite(this["bg"],"imgToiDa",cc.p(400,190),res_CardGame_Poker+"/bgBack.png");
        this.addText(this["imgToiDa"],"lbToiDa",cc.p(201,24.5),"10000000",RobotoRegular.fontName,24);
        this.addText(this["imgToiDa"],"lbTextToiDa_0",cc.p(55.5,26.5),"Tối đa:",RobotoRegular.fontName,22);
        this["lbTextToiDa_0"].setColor(cc.color("#000000"));
        this.addButton(this["bg"],"btnBuyIn",Lieng.BuyInLayer.BTN_BUY_IN,cc.p(391,8.5),true,res_CardGame_Poker+"/btnBuyInOk.png",res_CardGame_Poker+"/btnBuyInOk.png");
        this["btnBuyIn"].setTitleText("Mua vào");
        this["btnBuyIn"].setTitleColor(cc.color("#FFFF00"));
        this["btnBuyIn"].setTitleFontSize(36);
        this.addCheckBox(this["bg"],"checkBoxAuto",cc.p(206,123),true,res_CardGame_Poker+"/buyInOtrong.png",res_CardGame_Poker+"/buyInOtrong.png",res_CardGame_Poker+"/buyInTick.png",res_CardGame_Poker+"/buyInOtrong.png",res_CardGame_Poker+"/buyInTick.png");
        this.addText(this["bg"],"lbBuyInAmount",cc.p(396,389),"1000.000.000",RobotoRegular.fontName,30);
        this.addText(this["bg"],"textTuDongBuyIn",cc.p(417,122),"Tự động BuyIn khi hết chip",RobotoRegular.fontName,24);
        this["textTuDongBuyIn"].setColor(cc.color("#000000"));

        this.addButton(this["bg"],"btnClose",Lieng.BuyInLayer.BTN_CLOSE,cc.p(755,511),true,res_CardGame_Poker+"/closeBuyIn.png",res_CardGame_Poker+"/closeBuyIn.png");
        this.addSprite(this["bg"],"thanhDen",cc.p(394,331.5),res_CardGame_Poker+"/bgThanhKeo.png");
        this.addSprite(this["bg"],"thanhHong",cc.p(178.5,310.5),res_CardGame_Poker+"/thanhKeoBuyIn.png");
        this["thanhHong"].setAnchorPoint(0,0);
        this.addSprite(this["bg"],"dauThanhHong",cc.p(167,331.5),res_CardGame_Poker+"/dauBgHong.png");
        this.addSprite(this["bg"],"nutKeo",cc.p(609,331.5),res_CardGame_Poker+"/dauKeo.png");
        this.addButton(this["bg"],"btnMinus",Lieng.BuyInLayer.BTN_MINUS,cc.p(117.5,331.5),true,res_CardGame_Poker+"/btnBuyInMinus.png");
        this.addButton(this["bg"],"btnPlus",Lieng.BuyInLayer.BTN_PLUS,cc.p(675,331.5),true,res_CardGame_Poker+"/btnBuyInPlus.png");
        this.addLayout(this["bg"],"minNode",cc.p(169.5,334),null,cc.size(20,20),true);
        this.addLayout(this["bg"],"maxNode",cc.p(609.5,334),null,cc.size(20,20),true);

      //  this.bg = ccui.helper.seekWidgetByName(this._layout, "bgBuyIn");
      //  this.btnPlus = this.customizeButton("btnPlus", Lieng.BuyInLayer.BTN_PLUS, this.bg);
      //  this.btnMinus = this.customizeButton("btnMinus", Lieng.BuyInLayer.BTN_MINUS, this.bg);
      //  this.btnClose = this.customizeButton("btnClose", Lieng.BuyInLayer.BTN_CLOSE, this.bg);
      //  this.btnBuyIn = this.customizeButton("btnBuyIn", Lieng.BuyInLayer.BTN_BUY_IN, this.bg);
      //  this.nutKeo = ccui.helper.seekWidgetByName(this._layout, "nutKeo");
      //  this.minNode = ccui.helper.seekWidgetByName(this._layout, "minNode");
        this.minNode.setPositionX(Math.floor(this.minNode.getPositionX()));

      //  this.maxNode = ccui.helper.seekWidgetByName(this._layout, "maxNode");
        this.maxNode.setPositionX(Math.floor(this.maxNode.getPositionX()));


        //this.thanhHong = ccui.helper.seekWidgetByName(this._layout, "thanhHong");
        //this.thanhXam = ccui.helper.seekWidgetByName(this._layout, "thanhXam");
        //this.lbBuyInAmount = ccui.helper.seekWidgetByName(this._layout, "lbBuyInAmount");
        //this.lbMinBuyIn = ccui.helper.seekWidgetByName(this._layout, "lbToiThieu");
        //this.lbMaxBuyIn = ccui.helper.seekWidgetByName(this._layout, "lbToiDa");
        //this.checkBoxAuto = ccui.helper.seekWidgetByName(this._layout, "checkBoxAuto");
        //this.textBuyIn = ccui.helper.seekWidgetByName(this._layout, "textTuDongBuyIn");

        if(Lieng.gameLogic.moneyType == MONEY_VIN){
            this.lbBuyInAmount.setColor(cc.color(231, 2, 253, 1));
            this.lbToiThieu.setColor(cc.color(231, 2, 253, 1));
            this.lbToiDa.setColor(cc.color(231, 2, 253, 1));
            //this.lbMinBuyIn.setColor(cc.color(255, 255, 255, 1));
            //this.lbMaxBuyIn.setColor(cc.color(255, 255, 255, 1));
        }
        else{
            this.lbBuyInAmount.setColor(cc.color("#E6E6FA"));
            this.lbToiThieu.setColor(cc.color("#FFFFFF"));
            this.lbToiDa.setColor(cc.color("#FFFFFF"));
        }
    },

    onButtonRelease: function(btn, id){
        switch(id){
            case Lieng.BuyInLayer.BTN_CLOSE:
            {
                this.btnClose.setEnabled(false);
                this.gameScene.clickBack();
                this.gameScene.btnStandUp.setEnabled(true);
                this.close();
            }
                break;

            case Lieng.BuyInLayer.BTN_BUY_IN:
            {
                var isAuto = this.checkBoxAuto.isSelected() ;
                gameWsClient.sendBuyIn(this.buyInAmount, isAuto);
                this.btnBuyIn.setEnabled(false);
                this.gameScene.btnStandUp.setEnabled(true);
                this.close();
            }
                break;

            case Lieng.BuyInLayer.BTN_MINUS:
            {
                cc.log("btn minus");
                if(this.buyInAmount > this.minBuyIn){
                    this.buyInAmount = Math.max(this.buyInAmount - Lieng.gameLogic.bet, this.minBuyIn);

                    this.buyInAmount = this.buyInAmount - this.buyInAmount%(Lieng.gameLogic.bet);
                    this.lbBuyInAmount.setString("" + StringUtility.standartNumber(this.buyInAmount));
                }

                if(this.maxBuyIn > this.minBuyIn){
                    var percentage = Math.floor((this.buyInAmount - this.minBuyIn)*1000/(this.maxBuyIn- this.minBuyIn))/1000;
                }
                else{
                    var percentage = 1;
                }

                if(percentage >= 0.998){
                    percentage = 1;
                }

                this.percentage = percentage;
                this.thanhHong.setScaleX(percentage);
                this.nutKeo.setPositionX(  this.minNode.x + percentage*Math.floor((this.maxNode.x - this.minNode.x)));
            }
                break;

            case Lieng.BuyInLayer.BTN_PLUS:
            {
                cc.log("btn plus");
                if(this.buyInAmount < this.maxBuyIn){
                    this.buyInAmount = Math.min(this.buyInAmount + Lieng.gameLogic.bet , this.maxBuyIn);
                    this.buyInAmount = this.buyInAmount - this.buyInAmount%(Lieng.gameLogic.bet);
                    this.lbBuyInAmount.setString("" + StringUtility.standartNumber(this.buyInAmount));
                }

                if(this.maxBuyIn > this.minBuyIn){
                    var percentage = Math.floor((this.buyInAmount - this.minBuyIn)*1000/(this.maxBuyIn- this.minBuyIn))/1000;
                }
                else{
                    var percentage = 1;
                }

                if(percentage >= 0.998){
                    percentage = 1;
                }

                this.percentage = percentage;
                this.thanhHong.setScaleX(percentage);
                this.nutKeo.setPositionX(  this.minNode.x + percentage*Math.floor((this.maxNode.x - this.minNode.x)));
            }
                break;
        }
    },

    close: function() {
        //this.setVisible(false);
        this.gameScene.btnStandUp.setEnabled(true);
        this.removeFromParent();
        this.gameScene.buyInLayer = null;
    },

    checkHide: function(){
        var count = 0;
        for(var i = 0; i < 3; i++){
            if(this.list[i]){
                count++;
            }
        }
        if(count >= 3 && this.isHide == false){
            this.isHide = true;
            this.runAction(cc.sequence(cc.delayTime(0.8), cc.hide()));
            this.gameLayer.displayMyCard();
        }
    }

});

Lieng.BuyInLayer.BTN_PLUS = 9100;
Lieng.BuyInLayer.BTN_MINUS = 9101;
Lieng.BuyInLayer.BTN_BUY_IN = 9012;
Lieng.BuyInLayer.BTN_CLOSE = 9013;