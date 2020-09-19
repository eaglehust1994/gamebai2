/**
 * Created by Admin on 5/27/2017.
 */

var DownLoadUpdate = BaseLayerSlots.extend({
    _am : null,
    _progress : null,
    _percent : 0,
    _percentByFile : 0,
    _loadingBar : null,
    _fileLoadingBar : null,
    _manifestPath : null,
    _storagePath : null,
    __failCount: 0,
    ctor: function(id, manifestPath, storagePath){
        this._super("DownLoad");
        if(!cc.sys.isNative)
        {
            return;
        }
        this._manifestPath = "res/VuongQuocVin/project.manifest";
        //this._storagePath = storagePath;

        this._storagePath = jsb.fileUtils.getWritablePath() + "update/res/VuongQuocVin";

    },

    runDownload : function (callBackOpen,callBackErr) {
        if(!cc.sys.isNative)
        {
            return;
        }
       // var manifestPath = sceneManifests[currentScene];
       // var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + storagePaths[currentScene]);
        cc.log("Storage path for this test : " + this._storagePath);
        //popup.openPanel_Alert_Lobby(this._storagePath);
        this.addSprite(this,"nen",cc.p(640,360),"res/Minigame/ImageChung/bg_soicau1.png");
        //var layer = new cc.Layer();
        //this.addChild(layer);

        /*var icon = new cc.Sprite("");
        icon.x = cc.winSize.width/2;
        icon.y = cc.winSize.height/2;
        this.addChild(icon);*/

        this._loadingBar = new ccui.LoadingBar("res/Minigame/ImageChung/sliderProgress.png");
        this._loadingBar.x = 640;
        this._loadingBar.y = 360 + 40;
        //this._loadingBar.setPercent(50);
        this.addChild(this._loadingBar);

        this._fileLoadingBar = new ccui.LoadingBar("res/Minigame/ImageChung/sliderProgress.png");
        this._fileLoadingBar.x = 640;
        this._fileLoadingBar.y = 360;
        this.addChild(this._fileLoadingBar);
        //this._fileLoadingBar.setPercent(50);

        this._am = new jsb.AssetsManager(this._manifestPath, this._storagePath);
        this._am.retain();


        if (!this._am.getLocalManifest().isLoaded())
        {
            cc.log("Fail to update assets, step skipped.");
            /*var scene = new AssetsManagerTestScene(backgroundPaths[currentScene]);
            cc.director.runScene(scene);*/
            if(callBackOpen)
                callBackOpen;
        }
        else
        {

            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                var scene;
                switch (event.getEventCode())
                {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        popup.openPanel_Alert_Lobby("No local manifest file found, skip assets update.");
                        //scene = new AssetsManagerTestScene(backgroundPaths[currentScene]);
                        //cc.director.runScene(scene);
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        that._percent = event.getPercent();
                        that._percentByFile = event.getPercentByFile();

                        var msg = event.getMessage();
                        if (msg) {
                            cc.log(msg);
                        }
                        cc.log(that._percent + "%");
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        popup.openPanel_Alert_Lobby("Fail to download manifest file, update skipped.");
                        //scene = new AssetsManagerTestScene(backgroundPaths[currentScene]);
                        //cc.director.runScene(scene);
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished. " + event.getMessage());

                        // Restart the game to update scripts in scene 3
                        /*if (currentScene == 2) {
                            // Register the manifest's search path
                            var searchPaths = that._am.getLocalManifest().getSearchPaths();
                            // This value will be retrieved and appended to the default search path during game startup,
                            // please refer to samples/js-tests/main.js for detailed usage.
                            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
                            cc.sys.localStorage.setItem("Scene3SearchPaths", JSON.stringify(searchPaths));
                            // Restart the game to make all scripts take effect.
                            cc.game.restart();
                        }
                        else {
                            scene = new AssetsManagerTestScene(backgroundPaths[currentScene]);
                            cc.director.runScene(scene);
                        }*/
                        popup.openPanel_Alert_Lobby("Download finished");
                        if(callBackOpen)
                            callBackOpen;
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());

                        this.__failCount ++;
                        if (this.__failCount < 5)
                        {
                            that._am.downloadFailedAssets();
                        }
                        else
                        {
                            cc.log("Reach maximum fail count, exit update process");
                            this.__failCount = 0;
                            //scene = new AssetsManagerTestScene(backgroundPaths[currentScene]);
                            //cc.director.runScene(scene);
                        }
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        popup.openPanel_Alert_Lobby("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        popup.openPanel_Alert_Lobby(event.getMessage());
                        break;
                    default:
                        break;
                }
            });

            cc.eventManager.addListener(listener, 1);

            this._am.update();

            //cc.director.runScene(this);
        }

        this.schedule(this.updateProgress, 0.5);
    },

    updateProgress : function () {
        this._loadingBar.setPercent(this._percent);
        this._fileLoadingBar.setPercent(this._percentByFile);
    },

    onExit : function () {
        this._am.release();
        this._super();
    }
})

openDownLoad = function()
{
    var downloadLayer = new DownLoadUpdate("aksd","dfsdf");
    downloadLayer.runDownload(null,null);
    BaseScene.MINI_GAME_GUI.addChild(downloadLayer);
}