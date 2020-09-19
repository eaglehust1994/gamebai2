var advertise = null;
var advertiseX = null; var advertiseY = null;
var advertiseAppear = null;

var codeAdvertise = BaseLayer.extend(
    {
        ctor: function () {
            //// panel advertise

            this.pn_merry_chrismas = null;
            this.sp_dao = null;
            this.sp_mai = null;
            this.pn_hoadao = null;
            this.dao1 = null;   this.dao2 = null;   this.dao3 = null;   this.dao4 = null;   this.dao5 = null;
            this.dao6 = null;   this.dao7 = null;   this.dao8 = null;   this.dao9 = null;   this.dao10 = null;
            this.dao11 = null;   this.dao12 = null;   this.dao13 = null;
            this.pn_hoamai = null;
            this.mai1 = null;   this.mai2 = null;   this.mai3 = null;   this.mai4 = null;
            this.mai5 = null;   this.mai6 = null;   this.mai7 = null;   this.mai8 = null;
            this.mai9 = null;   this.mai10 = null;


            this._super("codeAdvertise");
            this.initWithBinaryFile("res/AdvertiseScene.json");
            return true;
        },
        customizeGUI: function(){
            this.pn_merry_chrismas = this._layout.getChildByName("pn_merry_chrismas");
            this.sp_dao = this.pn_merry_chrismas.getChildByName("sp_dao");
            this.sp_mai = this.pn_merry_chrismas.getChildByName("sp_mai");
            this.pn_hoadao = this.pn_merry_chrismas.getChildByName("pn_hoadao");
            this.dao1 = this.pn_hoadao.getChildByName("dao1");            this.dao2 = this.pn_hoadao.getChildByName("dao2");
            this.dao3 = this.pn_hoadao.getChildByName("dao3");            this.dao4 = this.pn_hoadao.getChildByName("dao4");
            this.dao5 = this.pn_hoadao.getChildByName("dao5");            this.dao6 = this.pn_hoadao.getChildByName("dao6");
            this.dao7 = this.pn_hoadao.getChildByName("dao7");            this.dao8 = this.pn_hoadao.getChildByName("dao8");
            this.dao9 = this.pn_hoadao.getChildByName("dao9");            this.dao10 = this.pn_hoadao.getChildByName("dao10");
            this.dao11 = this.pn_hoadao.getChildByName("dao11");            this.dao12 = this.pn_hoadao.getChildByName("dao12");
            this.dao13 = this.pn_hoadao.getChildByName("dao13");
            for(var i = 0; i < 13; i ++){
                //var osprite = new cc.Sprite();
                //osprite = this.pn_hoadao.getChildByName("dao"+(i+1));
                this["dao"+(i+1)].runAction(cc.fadeOut(0));
            }

            this.pn_hoamai = this.pn_merry_chrismas.getChildByName("pn_hoamai");
            this.mai1 = this.pn_hoamai.getChildByName("mai1");            this.mai2 = this.pn_hoamai.getChildByName("mai2");
            this.mai3 = this.pn_hoamai.getChildByName("mai3");            this.mai4 = this.pn_hoamai.getChildByName("mai4");
            this.mai5 = this.pn_hoamai.getChildByName("mai5");            this.mai6 = this.pn_hoamai.getChildByName("mai6");
            this.mai7 = this.pn_hoamai.getChildByName("mai7");            this.mai8 = this.pn_hoamai.getChildByName("mai8");
            this.mai9 = this.pn_hoamai.getChildByName("mai9");            this.mai10 = this.pn_hoamai.getChildByName("mai10");
            for(var i = 0; i < 10; i ++){
                //var osprite = new cc.Sprite();
                //osprite = this.pn_hoamai.getChildByName("mai"+(i+1));
                this["mai"+(i+1)].runAction(cc.fadeOut(0));
            }

            if (!cc.sys.isNative) {
                this.EffectRunDao();
                this.EffectRunMai();
            }else{
                this.pn_merry_chrismas.setVisible(false);
            }
        },

        getRandomNumber : function(min, max) {
            var vRandom = Math.floor(Math.random() * (max - min + 1)) + min;
            return vRandom;
        },
        EffectRunDao : function(){
            //var next1 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x + 4, advertise.getRandomNumber(388.28,398.28)));
            //var back1 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x - 8, advertise.getRandomNumber(388.28,398.28)));
            //var next2 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x + 8, advertise.getRandomNumber(388.28,398.28)));
            //var back2 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x - 8, advertise.getRandomNumber(388.28,398.28)));
            //var next3 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x + 8, advertise.getRandomNumber(388.28,398.28)));
            //var back3 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x - 8, advertise.getRandomNumber(388.28,398.28)));
            //var next4 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x + 8, advertise.getRandomNumber(388.28,398.28)));
            //var back4 = cc.MoveTo.create(0.1, cc.p(advertise.sp_dao.x - 4, advertise.getRandomNumber(388.28,398.28)));
            //var goto = cc.MoveTo.create(0.1, cc.p(-109.17, 393.28));
            advertise.sp_dao.stopAllActions();
            advertise.sp_dao.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                advertise.HoaDaoDown();
            })));
        },

        HoaDaoDown : function(){
            for(var i = 0; i < 13; i ++){
                //var osprite = new cc.Sprite();
                //osprite = advertise.pn_hoadao.getChildByName("dao"+(i+1));

                this["dao"+(i+1)].x = advertise.getRandomNumber((this["dao"+(i+1)].x - 80.0), (this["dao"+(i+1)].x+80.0));
                this["dao"+(i+1)].y = advertise.getRandomNumber((this["dao"+(i+1)].y - 50.0), (this["dao"+(i+1)].y+50.0));

                var time = this.getRandomNumber(3.5,4.5);
                var actiondown = cc.MoveTo.create(time, cc.p(this["dao"+(i+1)].x + advertise.getRandomNumber(-100.0,350.0),((this["dao"+(i+1)].y - 500) - advertise.getRandomNumber(0,200))));
                var rotateby = cc.rotateBy(time, this.getRandomNumber(10,360));
                var seq1 = cc.sequence(actiondown,cc.fadeOut(0.25),cc.delayTime(1),cc.callFunc(function(){
                    for(var i = 0; i < 13; i ++) {
                        //var osprite1 = new cc.Sprite();
                        //osprite1 = advertise.pn_hoadao.getChildByName("dao"+(i+1));
                        advertise["dao" + (i+1)].x = advertise.getRandomNumber(-237.66,-137.66);
                        advertise["dao" + (i+1)].y = 507.85;
                    }
                }));

                var seq2 = cc.sequence(cc.delayTime(0.01),cc.fadeIn(0.15));
                var spawn = cc.spawn(seq1,seq2,rotateby);
                this["dao"+(i+1)].runAction(spawn);
            }
            advertise.sp_dao.stopAllActions();
            advertise.sp_dao.runAction(cc.sequence(cc.delayTime(advertise.getRandomNumber(18,20)),cc.callFunc(function(){
                advertise.EffectRunDao();
            })));
        },
        EffectRunMai : function(){
            //var next1 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x - 4, advertise.getRandomNumber(509.54,519.54)));
            //var back1 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x + 8, advertise.getRandomNumber(509.54,519.54)));
            //var next2 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x - 8, advertise.getRandomNumber(509.54,519.54)));
            //var back2 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x + 8, advertise.getRandomNumber(509.54,519.54)));
            //var next3 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x - 8, advertise.getRandomNumber(509.54,519.54)));
            //var back3 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x + 8, advertise.getRandomNumber(509.54,519.54)));
            //var next4 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x - 8, advertise.getRandomNumber(509.54,519.54)));
            //var back4 = cc.MoveTo.create(0.1, cc.p(advertise.sp_mai.x + 4, advertise.getRandomNumber(509.54,519.54)));
            //var goto = cc.MoveTo.create(0.1, cc.p(1414.56, 514.54));
            advertise.sp_mai.stopAllActions();
            advertise.sp_mai.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                advertise.HoaMaiDown();
            })));
        },
        HoaMaiDown : function(){
            for(var i = 0; i < 10; i ++){
                //var osprite = new cc.Sprite();
                //osprite = advertise.pn_hoamai.getChildByName("mai"+(i+1));

                this["mai" + (i+1)].x = advertise.getRandomNumber((this["mai" + (i+1)].x - 80.0), (this["mai" + (i+1)].x+80.0));
                this["mai" + (i+1)].y = advertise.getRandomNumber((this["mai" + (i+1)].y - 50.0), (this["mai" + (i+1)].y+50.0));
                var time = this.getRandomNumber(3.5,4.5);
                var actiondown = cc.MoveTo.create(time, cc.p(this["mai" + (i+1)].x + advertise.getRandomNumber(-350.0,100.0),((this["mai" + (i+1)].y - 500) - advertise.getRandomNumber(0,200))));
                var rotateby = cc.rotateBy(time, this.getRandomNumber(10,360));
                var seq1 = cc.sequence(actiondown,cc.fadeOut(0.25),cc.delayTime(1),cc.callFunc(function(){
                    for(var i = 0; i < 10; i ++) {
                        //var osprite1 = new cc.Sprite();
                        //osprite1 = advertise.pn_hoamai.getChildByName("mai"+(i+1));
                        advertise["mai" + (i+1)].x = advertise.getRandomNumber(75.39,175.39);
                        advertise["mai" + (i+1)].y = 518.78;
                    }
                }));

                var seq2 = cc.sequence(cc.delayTime(0.01),cc.fadeIn(0.15));
                var spawn = cc.spawn(seq1,seq2,rotateby);
                this["mai" + (i+1)].runAction(spawn);
            }
            advertise.sp_mai.stopAllActions();
            advertise.sp_mai.runAction(cc.sequence(cc.delayTime(advertise.getRandomNumber(20,25)),cc.callFunc(function(){
                advertise.EffectRunMai();
            })));
        },
    }
);

openadvertise = function () {
    if (advertise === null) {
        advertise = new codeAdvertise();
        advertiseX = advertise.getPosition().x;
        advertiseY = advertise.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(advertise, BaseScene.INDEX_MINIGAME_GUI, 0);
    }
    else
    {
        //advertise.pn_dieu_khoan.setVisible(true);
        //advertise.pn_dieu_khoan.runAction(cc.scaleTo(0.2,1));
    }
    advertiseAppear = true;
};
closeadvertise = function () {
    if (advertise === null) {
        return;
    }
    if(advertiseAppear) {
        advertiseAppear = false;
    }
};
