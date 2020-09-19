/**
 * Created by Tuan on 10-Sep-16.
 */

MauBinh.CheatCardGui = BaseLayer.extend({
    ctor: function(){
        this._super("CheatCardGui");

        this.cardList = [];
        this.overlap = 2/3;

        this.player_cardList = [];
        var target = this;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: target.onTouchBegan.bind(target),
            onTouchMoved: function(touch,event){},
            onTouchEnded: function(){}
        });
        cc.eventManager.addListener(this.touchListener, this);


        this.initWithBinaryFile("res/g_res_cardGame_json_MauBinhCheatCardGui.json");
    },

    initGUI: function(){
        this.btnSend = this._layout.getChildByName("btn_send");
        this.btnSend.addClickEventListener(this.onBtnSendClicked.bind(this));

        this.btnReset = this._layout.getChildByName("btn_reset");
        this.btnReset.addClickEventListener(this.onBtnResetClicked.bind(this));

        this.checkboxCheat = this._layout.getChildByName("cb_cheat");

        this.btnClose = this._layout.getChildByName("btn_close");
        this.btnClose.addClickEventListener(this.onBtnCloseClicked.bind(this));
        this.resetData();
    },

    resetData: function(){
        //var cardId = 0;
        for (var i=0; i<4; i++){
            this.player_cardList[i] = [];
            for(var j = 0; j < 13; j++){
                //this.player_cardList[i].push(cardId++);
            }
        }
        for (var i=0; i<this.cardList.length; i++){
            this.cardList[i].display.sprite.removeFromParent();
        }
        this.cardList = [];

        var winSize = GuiUtil.getWinSize();
        var cardList = [];
        for (var i=0; i<52; i++){
            var row = Math.floor(i/13);
            var column = i%13;
            var scale = 0.55;
            var cardSprite = GuiUtil.createSprite(GuiUtil.getCardResource(i));
            cardSprite.setScale(scale);
            cardSprite.setPosition(10 + GameGui.CARD_SIZE.width*scale*(column*this.overlap),
                winSize.height/2 + GameGui.CARD_SIZE.height*scale*(0.5 + ((row-2)*this.overlap)));
            cardSprite.setLocalZOrder(3-row);
            this.addChild(cardSprite);

            var card = new MauBinhCard(i, cardSprite);
            cardList.push(card);
        }
        for (var row=0; row<4; row++){
            for (var col=12; col>=0; col--){
                var index = 13*row+col;
                this.cardList.push(cardList[index]);
            }
        }
    },


    onBtnSendClicked: function(){
        var cards = [];
        for (var i=0; i<this.player_cardList.length; i++){
            for (var j=0; j<this.player_cardList[i].length; j++){
                var id = this.player_cardList[i][j].id;
                cards.push(id);
            }
        }
        cc.log("send cheat cards: " + cards.toString());
        gameWsClient.sendCheatBai(this.checkboxCheat.selected, cards);
        this.setVisible(false);
    },

    onBtnResetClicked: function(){
        this.resetData();
    },

    onBtnCloseClicked: function(){
        //cc.log("onBtnCloseClicked: close cheat GUI");
        this.setVisible(false);
        this.touchListener.setEnabled(false);
    },

    onTouchBegan: function(touch, event){
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        var cheatCardGui = gameGui.cheatCardGui;

        for (var i=0; i<cheatCardGui.cardList.length; i++){
            var cardSprite = cheatCardGui.cardList[i].display.sprite;
            var touchLocal = cheatCardGui.convertToNodeSpace(touch.getLocation());
            if (cc.rectContainsPoint(cardSprite.getBoundingBox(), touchLocal)){
                cheatCardGui.releaseCard(cheatCardGui.cardList[i]);
                return true;
            }
        }
        return false;
    },

    releaseCard: function(card){
        for (var i=0; i<this.player_cardList.length; i++){
            if (this.player_cardList[i].length < 13){
                this.player_cardList[i].push(card);
                var chiIndex = Math.floor((this.player_cardList[i].length-1)/5);
                var cardIndexInChi = (this.player_cardList[i].length-1)%5;
                var scale = 0.4;
                var winSize = GuiUtil.getWinSize();
                var rootPos;
                switch (i){
                    case 0:
                        rootPos = cc.p(winSize.width*3/4, winSize.height*3/4);
                        break;
                    case 1:
                        rootPos = cc.p(winSize.width, winSize.height*3/4);
                        break;
                    case 2:
                        rootPos = cc.p(winSize.width*3/4, winSize.height*1/4);
                        break;
                    case 3:
                        rootPos = cc.p(winSize.width, winSize.height*1/4);
                        break;
                }

                var cardPosition = cc.p(rootPos.x - GameGui.CARD_SIZE.width*scale*(0.5 + (4-cardIndexInChi)),
                    rootPos.y + GameGui.CARD_SIZE.height*scale*(0.5 + (chiIndex-2)));
                card.display.sprite.runAction(cc.spawn(
                    cc.moveTo(0.2, cardPosition),
                    cc.scaleTo(0.2, scale)
                ));
                return;
            }
        }
    },

    setVisible: function(isVisible){
        this._super(isVisible);
        this.touchListener.setEnabled(isVisible);
    }

});
