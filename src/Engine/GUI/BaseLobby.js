var BaseLobby = BaseLayer.extend(

    {

        ctor: function () {
            this._super("BaseLobby");
            this.sizeSceen = null;
            this.positionCenter = null;
            this.positionContent = null;
            this.bg = null;
            this.main_content = null;
            this.imageBg = null;



            if (cc.sys.isNative) {

                this.sizeSceen = cc.size(1280,720);
                this.positionCenter = cc.p(640,360);
                this.positionContent = cc.p(640,360);
                this.imageBg = "res/Base/Lobby/GUI/mobile-lobby-bg.jpg";
            } else {
                this.sizeSceen = cc.size(1920,1080);
                this.positionCenter = cc.p(960,540);
                this.positionContent = cc.p(960,630);
                this.imageBg = "res/Base/Lobby/GUI/lobby-bg.jpg";

            }
            this.addSprite(this,"bg",this.positionCenter,this.imageBg);
            this.addLayout(this,"main_content",this.positionContent,null,cc.size(1280,720),true);
            return true;
        },
        onEnter: function(){
            // cc.log("Base Lobby");
            this._super();
            // cc.log("end Base Lobby hehe");
        },

        initGUI: function () {
            //this.main_content = this._layout.getChildByName("main_content");
            //this.main_content.setOpacity(0);
        },
        customizeGUI: function(){

        },
        addGUI: function(layer, zOrder){
            this.main_content.addChild(layer, zOrder);
        }
    }
);