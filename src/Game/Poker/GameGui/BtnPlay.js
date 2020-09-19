
var BtnPlay = cc.Node.extend({
    ctor: function(button){
        this.btn = button;
    },

    setEnable: function(value){
        this.btn.setEnabled(value);
        this.btn.setBright(value);
        if(value == false){
            this.btn.setTitleText("");
        }
    },

    setState: function(state, money){

        //this.btn.setTitleFontSize(18);
        //this.btn.setTitleColor({r: 0, g: 0, b: 0});
        switch(state){
            case Poker.ButtonState.DISABLE:{
                this.btn.setTitleText("");
                this.setEnable(false);
            }
                break;
            case Poker.ButtonState.FOLD: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnleftBoBai.png","res/CardGame/Poker/btnLeftBoBaiLight.png","res/CardGame/Poker/btnLeftDisable.png" ,ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("FOLD");
            }
                break;

            case Poker.ButtonState.CHECK: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CHECK ");
            }
                break;

            case Poker.ButtonState.CALL: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CALL\n" + money);
            }
                break;

            case Poker.ButtonState.RAISE: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("RAISE\n" + money);
            }
                break;

            case Poker.ButtonState.ALLIN:{
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("ALL IN");
            }
                break;

            case Poker.ButtonState.CHECK_FOLD:{
                cc.log("set check fold");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnleftBoBai.png", "res/CardGame/Poker/btnLeftBoBaiLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CHECK/FOLD");
            }
                break;

            case Poker.ButtonState.CHECK_FOLD_X:{
                cc.log("set check fold x");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftBoBaiLight.png", "res/CardGame/Poker/btnLeftBoBai.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CHECK/FOLD");
            }
                break;

            case Poker.ButtonState.FOLLOW_ALL:{
                cc.log("set follow all");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CALL ALL");
            }
                break;

            case Poker.ButtonState.FOLLOW_ALL_X:{
                cc.log("set follow all x");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftNormal.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CALL ALL");
            }
                break;
        }

        this.actionState = state;
    },

    hightLight: function(){
        cc.log("hightLight");
        this.btn.loadTextures("res/CardGame/Poker/buttonHightlight.png", "res/CardGame/Poker/buttonHightlight.png", "res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
    },

    clickButton: function(){
        cc.log("clickButton actionState:" + this.actionState);
        if(this.actionState == Poker.ButtonState.CHECK_FOLD){
            this.setState(Poker.ButtonState.CHECK_FOLD_X);
            //Poker.gameLogic.registerXemBo = false;
            return;
        }
        else if(this.actionState == Poker.ButtonState.CHECK_FOLD_X){
            this.setState(Poker.ButtonState.CHECK_FOLD);
            //Poker.gameLogic.registerXemBo = true;
            return;
        }
        else if(this.actionState == Poker.ButtonState.FOLLOW_ALL){
            this.setState(Poker.ButtonState.FOLLOW_ALL_X);
            //Poker.gameLogic.registerFollowAll = false;
            return;
        }
        else if(this.actionState == Poker.ButtonState.FOLLOW_ALL_X){
            this.setState(Poker.ButtonState.FOLLOW_ALL);
            //Poker.gameLogic.registerFollowAll = true;
            return;
        }
    }

});

Poker.ButtonState = {};

Poker.ButtonState.DISABLE = -1;
Poker.ButtonState.FOLD = 0;
Poker.ButtonState.CHECK = 1;
Poker.ButtonState.CALL = 2;
Poker.ButtonState.RAISE = 3;
Poker.ButtonState.ALLIN = 4;
Poker.ButtonState.CHECK_FOLD = 5;
Poker.ButtonState.CHECK_FOLD_X = 6;
Poker.ButtonState.FOLLOW_ALL = 7;
Poker.ButtonState.FOLLOW_ALL_X = 8;