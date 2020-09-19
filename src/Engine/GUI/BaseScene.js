var GameScene = null;
var MainContent = null;

var BaseScene = cc.Scene.extend({
    ctor: function(){
        this._super();
        this.listGameGui = [];
        this.gameGui = null;
    },

    addChild: function (child) {
        cc.Scene.prototype.addChild.call(this,child);
    },

    addGameGUI: function(child){
        this.removeGameGui();
        child.setTag(11);
        BaseScene.GAME_GUI.addChild(child);
        this.gameGui = child;
    },

    replaceGameGui: function(gui){
        this.removeGameGui();
        BaseScene.GAME_GUI.addChild(gui, 1);
        gui.setTag(11);
        this.gameGui = gui;
    },

    removeGameGui: function(){
        if(this.gameGui){
            this.gameGui.removeFromParent();
            this.gameGui = null;
        }
    },

    getMainLayer: function(){
        return BaseScene.GAME_GUI.getChildByTag(11);
    },

    getMainContentSize: function(){
        return MainContent.getContentSize();
    },

    addGUI: function(child, index, zOrder){
        // cc.log("addGUI");
        switch(index){
            case BaseScene.INDEX_BG_GUI:
                break;
            case BaseScene.INDEX_GAME_GUI:
                BaseScene.GAME_GUI.addChild(child, zOrder);
                break;
            case BaseScene.INDEX_MINIGAME_GUI:
                BaseScene.MINI_GAME_GUI.addChild(child, zOrder);
                break;
            case BaseScene.INDEX_INFO_GUI:
                BaseScene.INFO_GUI.addChild(child, zOrder);
                break;
            case BaseScene.INDEX_POP_UP_GUI:
                BaseScene.POP_UP_GUI.addChild(child, zOrder);
                break;
        }
    }
});

BaseScene.INDEX_BG_GUI            = 0;
BaseScene.INDEX_GAME_GUI          = 1;
BaseScene.INDEX_INFO_GUI          = 2;
BaseScene.INDEX_MINIGAME_GUI      = 3;
BaseScene.INDEX_POP_UP_GUI        = 4;


BaseScene.BG_GUI = null;
BaseScene.GAME_GUI = null;
BaseScene.MINI_GAME_GUI = null;
BaseScene.POP_UP_GUI = null;
BaseScene.INFO_GUI = null;



var globalScaleFactor = globalScaleFactor || 1;
makeScene = function(layer){
    // cc.log("make Scene");


    var frameSize = cc.view.getFrameSize();
    var scaleWidth = frameSize.width/ 1280;
    var scaleHeight = frameSize.height/ 720;
    globalScaleFactor = scaleHeight < scaleWidth ? scaleHeight/scaleWidth: scaleWidth/scaleHeight ;

    if(GameScene === null) {
        GameScene = new BaseScene();
        if(cc.sys.isNative){
            cc.log(globalScaleFactor);
            var winSize = cc.director.getWinSize();
            var originPos = cc.director.getVisibleOrigin();

            //GameScene.setPosition(originPos.x,   winSize.height*0.5 - winSize.height*0.5*globalScaleFactor);
             GameScene.setPosition(originPos);
            //GameScene.setScale(globalScaleFactor);
            //var origame
        }
        var baseLobby = new BaseLobby();
        MainContent = baseLobby.main_content;
        GameScene.addChild(baseLobby);

        MainContent.addChild(BaseScene.BG_GUI, BaseScene.INDEX_BG_GUI);
        MainContent.addChild(BaseScene.GAME_GUI, BaseScene.INDEX_GAME_GUI);
        MainContent.addChild(BaseScene.MINI_GAME_GUI, BaseScene.INDEX_MINIGAME_GUI);
        MainContent.addChild(BaseScene.INFO_GUI, BaseScene.INDEX_INFO_GUI);
        MainContent.addChild(BaseScene.POP_UP_GUI, BaseScene.INDEX_POP_UP_GUI);
        // cc.log("end ctorLobby222");
    }
    BaseScene.BG_GUI.addChild(layer);
    // cc.log("end onEnter Lobby333");

    return GameScene;
}


makeScene2 = function(layer){
    cc.log("make Scene");
    testGameScene = new BaseScene();
    testGameScene.addChild(layer);
    return testGameScene;
}

var testGameScene = null;
var testLobby = null;




