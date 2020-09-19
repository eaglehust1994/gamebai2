var BtnPlay2 = cc.Node.extend({
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

        switch(state){
            case Lieng.ButtonState.DISABLE:{
                this.btn.setTitleText("");
                this.setEnable(false);
            }
                break;
            case Lieng.ButtonState.FOLD: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnleftBoBai.png","res/CardGame/Poker/btnLeftBoBaiLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("BỎ BÀI");
            }
                break;

            case Lieng.ButtonState.CHECK: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("XEM ");
            }
                break;

            case Lieng.ButtonState.CALL: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CÂN\n" + money);
            }
                break;

            case Lieng.ButtonState.RAISE: {
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("TỐ\n" + money);
            }
                break;

            case Lieng.ButtonState.ALLIN:{
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("TẤT TAY");
            }
                break;

            case Lieng.ButtonState.CHECK_FOLD:{
                cc.log("set check fold");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnleftBoBai.png", "res/CardGame/Poker/btnLeftBoBaiLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("XEM/BỎ");
            }
                break;

            case Lieng.ButtonState.CHECK_FOLD_X:{
                cc.log("set check fold x");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftBoBaiLight.png", "res/CardGame/Poker/btnleftBoBai.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("XEM/BỎ");
            }
                break;

            case Lieng.ButtonState.FOLLOW_ALL:{
                cc.log("set follow all");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftNormal.png", "res/CardGame/Poker/btnLeftLight.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CÂN TẤT");
            }
                break;

            case Lieng.ButtonState.FOLLOW_ALL_X:{
                cc.log("set follow all x");
                this.setEnable(true);
                this.btn.loadTextures("res/CardGame/Poker/btnLeftLight.png", "res/CardGame/Poker/btnLeftNormal.png","res/CardGame/Poker/btnLeftDisable.png",ccui.Widget.PLIST_TEXTURE);
                this.btn.setTitleText("CÂN TẤT");
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
        if(this.actionState == Lieng.ButtonState.CHECK_FOLD){
            this.setState(Lieng.ButtonState.CHECK_FOLD_X);
            //Lieng.gameLogic.registerXemBo = false;
            return;
        }
        else if(this.actionState == Lieng.ButtonState.CHECK_FOLD_X){
            this.setState(Lieng.ButtonState.CHECK_FOLD);
            //Lieng.gameLogic.registerXemBo = true;
            return;
        }
        else if(this.actionState == Lieng.ButtonState.FOLLOW_ALL){
            this.setState(Lieng.ButtonState.FOLLOW_ALL_X);
            //Lieng.gameLogic.registerFollowAll = false;
            return;
        }
        else if(this.actionState == Lieng.ButtonState.FOLLOW_ALL_X){
            this.setState(Lieng.ButtonState.FOLLOW_ALL);
            //Lieng.gameLogic.registerFollowAll = true;
            return;
        }
    }

});

Lieng.ButtonState = {};

Lieng.ButtonState.DISABLE = -1;
Lieng.ButtonState.FOLD = 0;
Lieng.ButtonState.CHECK = 1;
Lieng.ButtonState.CALL = 2;
Lieng.ButtonState.RAISE = 3;
Lieng.ButtonState.ALLIN = 4;
Lieng.ButtonState.CHECK_FOLD = 5;
Lieng.ButtonState.CHECK_FOLD_X = 6;
Lieng.ButtonState.FOLLOW_ALL = 7;
Lieng.ButtonState.FOLLOW_ALL_X = 8;