/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : false,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debuging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    // cc.log("onStart begin");
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) {
        cc.log(" -----------> remove cocosLoading child")
        document.body.removeChild(document.getElementById("cocosLoading"));
    }
    cc.resPath = "./res";
    //jsb.fileUtils.addSearchPath("/");
    //jsb.fileUtils.addSearchPath("res/");
    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Setup the resolution policy and design resolution size
    // cc.log("cc.game.onStart" + cc.view.getFrameSize().width + " " + cc.view.getFrameSize().height);

    // var globalScaleFactor = globalScaleFactor;
    if(cc.sys.isNative){
        //cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);

        //var frameSize = cc.view.getFrameSize();
        //var scaleWidth = frameSize.width/ 1280;
        //var scaleHeight = frameSize.height/ 720;
        //globalScaleFactor = scaleHeight < scaleWidth ? scaleHeight/scaleWidth: scaleWidth/scaleHeight ;
        //cc.log("globalScaleFactor " + scaleWidth + " " + + scaleHeight +  " " + globalScaleFactor);
        cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);


    }else {
        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.NO_BORDER);
    }
    //var glview = cc.director.getOpenGLView();
    //if(!glview)
    //{
    //    glview = cc.GLView.create("VinPlay");
    //    cc.director.setOpenGLView(glview);
    //}
    // Instead of set design resolution, you can also set the real pixel resolution size
    // Uncomment the following line and delete the previous line.
    // cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);
    time1 = new Date().getTime();




    //load resources
    cc.LoaderScene.preload(g_resources, function () {

        BaseScene.BG_GUI = new cc.Layer();
        BaseScene.GAME_GUI = new cc.Layer();
        BaseScene.MINI_GAME_GUI = new cc.Layer();
        BaseScene.POP_UP_GUI = new cc.Layer();
        BaseScene.INFO_GUI = new cc.Layer();
        BaseScene.BG_GUI.retain();
        BaseScene.GAME_GUI.retain();
        BaseScene.MINI_GAME_GUI.retain();
        BaseScene.POP_UP_GUI.retain();
        BaseScene.INFO_GUI.retain();


        var time2 = new Date().getTime();
        lobby = new LobbyLayer();
        cc.director.runScene(makeScene(lobby));

        if(!cc.sys.isNative)
        {
            cc.director.getScheduler().scheduleUpdate(engine.HandlerManager.getInstance(),0,false);
        }

    }, this);
};
cc.game.run();
