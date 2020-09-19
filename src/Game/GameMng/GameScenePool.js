//
GameScenePool = cc.Class.extend({
    ctor: function(){
        this.baCayScene = null;
        this.samScene = null;
        this.tienLenScene = null;
        this.nanBaiScene = null;
        this.baiCaoScene = null;
        this.nanBaiBaiCaoScene = null;
        this.baCayEndGameScene = null;
        this.baiCaoEndGameScene = null;
        this.cheatCardScene1 = null;
        this.cheatCardScene2 = null;
        this.samEndGameScene = null;
        this.tienLenEndGameScene = null;
        this.caroGameScene = null;
    },

    getBaCayScene: function(){
        this.baCayScene = new BaCay.BaCayScene();
        //if(this.baCayScene == null){
        //    this.baCayScene = new BaCay.BaCayScene();
        //    this.baCayScene.retain();
        //}
        //this.baCayScene.setVisible(true);
        return this.baCayScene;
    },

    getSamScene: function(){
        this.samScene = new Sam.GameScene();
        //if(this.samScene == null){
        //    this.samScene = new Sam.GameScene();
        //    this.samScene.retain();
        //}
        //this.samScene.setVisible(true);
        return this.samScene;
    },

    getTienLenScene: function(){
        //this.tienLenScene = new TienLen.GameScene();
        if(this.tienLenScene == null){
            this.tienLenScene = new TienLen.GameScene();
            this.tienLenScene.retain();
        }
        this.tienLenScene.setVisible(true);
        return this.tienLenScene;
    },

    getBaiCaoScene: function(){
        this.baiCaoScene = new BaiCao.BaiCaoScene();
        //this.baiCaoScene.setVisible(true);
        //if(this.baiCaoScene == null){
        //    this.baiCaoScene = new BaiCao.BaiCaoScene();
        //    this.baiCaoScene.retain();
        //}
        //this.baiCaoScene.setVisible(true);
        return this.baiCaoScene;
    },

    getNanBaiLayer: function(){
        this.nanBaiScene = new BaCay.NanBaiLayer();
        //if(this.nanBaiScene == null){
        //    this.nanBaiScene = new BaCay.NanBaiLayer();
        //    this.nanBaiScene.retain();
        //}
        //this.nanBaiScene.setVisible(true);
        return this.nanBaiScene;
    },

    getNanBaiBaiCaoLayer: function(){
        this.nanBaiBaiCaoScene = new BaiCao.NanBaiLayer();
        //if(this.nanBaiBaiCaoScene == null){
        //    this.nanBaiBaiCaoScene = new BaiCao.NanBaiLayer();
        //    this.nanBaiBaiCaoScene.retain();
        //}
        //this.nanBaiBaiCaoScene.setVisible(true);
        return this.nanBaiBaiCaoScene;
    },

    getBaCayEndGameScene: function(){
        this.baCayEndGameScene = new BaCay.BaCayEndGame();
        //if(this.baCayEndGameScene == null){
        //    this.baCayEndGameScene = new BaCay.BaCayEndGame();
        //    this.baCayEndGameScene.retain();
        //}
        //this.baCayEndGameScene.setVisible(true);
        return this.baCayEndGameScene;
    },

    getBaiCaoEndGameScene: function(){
        this.baiCaoEndGameScene = new BaiCao.BaiCaoEndGame();
        //if(this.baiCaoEndGameScene == null){
        //    this.baiCaoEndGameScene = new BaiCao.BaiCaoEndGame();
        //    this.baiCaoEndGameScene.retain();
        //}
        //this.baiCaoEndGameScene.setVisible(true);
        return this.baiCaoEndGameScene;
    },

    getCheatCardScene1: function(){
        this.cheatCardScene1 = new CheatLayer();
        //if(this.cheatCardScene1 == null){
        //    this.cheatCardScene1 = new CheatLayer();
        //    this.cheatCardScene1.retain();
        //}
        //this.cheatCardScene1.setVisible(true);
        return this.cheatCardScene1;
    },

    getCheatCardScene2: function(){
        this.cheatCardScene2 = new CheatLayer();
        //if(this.cheatCardScene2 == null){
        //    this.cheatCardScene2 = new CheatLayer();
        //    this.cheatCardScene2.retain();
        //}
        //this.cheatCardScene2.setVisible(true);
        return this.cheatCardScene2;
    },

    getSamEndGameScene: function(data){
        this.samEndGameScene = new Sam.LayerEndGame();
        this.samEndGameScene.setData(data);
        //if(this.samEndGameScene == null){
        //    this.samEndGameScene = new Sam.LayerEndGame();
        //    this.samEndGameScene.retain();
        //}
        //this.samEndGameScene.setData(data);
        //this.samEndGameScene.setVisible(true);
        return this.samEndGameScene;
    },

    getTienLenEndGameScene: function(data){
        this.tienLenEndGameScene = new TienLen.LayerEndGame();
        this.tienLenEndGameScene.setData(data);
        //if(this.tienLenEndGameScene == null){
        //    this.tienLenEndGameScene = new TienLen.LayerEndGame();
        //    this.tienLenEndGameScene.retain();
        //}
        //this.tienLenEndGameScene.setData(data);
        //this.tienLenEndGameScene.setVisible(true);
        return this.tienLenEndGameScene;
    },

    getCaroGameScene: function(){
        this.caroGameScene = new CoCaro.CoCaroScene();
        return this.caroGameScene;
    },

    getCoTuongGameScene: function(){
        this.coTuongScene = new CoTuong.CoTuongScene();
        return this.coTuongScene;
    },

    getCoUpGameScene: function(){
        this.coUpScene = new CoUp.CoUpScene();
        return this.coUpScene;
    },
	getXocDiaGameScene: function(){
        this.xocdiaGameScene = new codeXocDia();
        return this.xocdiaGameScene;
    }
});

var gameScenePool = new GameScenePool();