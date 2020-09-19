/**
 * Created by Admin on 1/16/2017.
 */
var avengerMinigame = null;
var avengerMinigameAppear = false;

var AvengerMinigameLayer = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this._super("AvengerMiniGame");
            this.initWithBinaryFile("res/AvengerMiniGame.json");
            this.resultMiniGame = "";
            this.pMiniGame = null;
            for(var i = 1; i< 13; i++)
            {
                this["btn_tank_" + i] = null;
                this["sp_fire_"+i] = null;
            }
            this.sp_khung_cua = null;
            this.sp_minigame_hulk = null;
            this.sp_cua_trai = null;
            this.sp_cua_phai = null;
            this.sp_khung_choi = null;
            this.sp_chien_tanks = null;
            this.sp_nen_choi = null;
            this.indexSelect = 0;
            this.lb_cong_tien = null;
            this.sp_nen_tien = null;
            this.lb_tien_thang = null;
            this.pEndMinigame = null;
            this.lb_tong_thang = null;
            this.btn_close = null;

            this.pHeSoNhan = null;
            this.btn_mo1 = null;
            this.btn_mo2 = null;
            this.btn_mo3 = null;
            this.pPhepTinh = null;
            this.lb_prize_ingame = null;
            this.lb_nhan = null;
            this.lb_sum_prize = null;
            this.lb_x1 = null;
            this.lb_x2 = null;
            this.lb_x3 = null;
            this.lb_thong_bao = null;
            this.intRandom1 = 1;
            this.intRandom2 = 1;

            this.isStart = false;


            this.runHulkDam = [
                //1
               {
                   hulkPositionX: 194,
                   hulkPositionY: 316,
                   hulkScale:0.3
               },
                //2
                {
                   hulkPositionX: 272,
                   hulkPositionY: 255,
                   hulkScale:0.4
               },
                //3
                {
                    hulkPositionX: 387,
                    hulkPositionY: 326,
                    hulkScale:0.20
                },
                //4
                {
                    hulkPositionX: 440,
                    hulkPositionY: 234,
                    hulkScale:0.42
                },
                //5
                {
                    hulkPositionX: 506,
                    hulkPositionY: 334,
                    hulkScale:0.20
                },
                //6
                {
                    hulkPositionX: 643,
                    hulkPositionY: 227,
                    hulkScale:0.43
                },
                //7
                {
                    hulkPositionX: 640.00,
                    hulkPositionY: 328.00,
                    hulkScale:0.20
                },
                //8
                {
                    hulkPositionX: 766.00,
                    hulkPositionY: 335.00,
                    hulkScale:0.20
                },
                //9
                {
                    hulkPositionX: 860.00,
                    hulkPositionY: 230.00,
                    hulkScale:0.42
                },
                //10
                {
                    hulkPositionX: 925.00,
                    hulkPositionY: 320.00,
                    hulkScale:0.22
                },
                //11
                {
                    hulkPositionX: 1020.00,
                    hulkPositionY: 267.00,
                    hulkScale:0.35
                },
                //12
                {
                    hulkPositionX: 1119.00,
                    hulkPositionY: 302.00,
                    hulkScale:0.30
                },

            ];
            this.prizeKillTanks = [];
            this.heSoNhan = 0;
            this.soBonus = 3;
            this.soLanDaMo = 0;
            this.isWaittingKill = false;
            this.currentPrizeWin = 0;




        },
        customizeGUI: function () {
            this.pMiniGame = this._layout.getChildByName("pMiniGame");
            for(var i = 1; i< 13; i++)
            {
                this["btn_tank_" + i] = this.customButton("btn_tank_"+i,i,this.pMiniGame);
                this["sp_fire_"+i] = this.pMiniGame.getChildByName("sp_fire_"+i);

            }

            this.sp_khung_cua = this.pMiniGame.getChildByName("sp_khung_cua");
            this.sp_minigame_hulk = this.pMiniGame.getChildByName("sp_minigame_hulk");
            this.sp_cua_trai = this.pMiniGame.getChildByName("sp_cua_trai");
            this.sp_cua_phai = this.pMiniGame.getChildByName("sp_cua_phai");
            this.sp_khung_choi = this.pMiniGame.getChildByName("sp_khung_choi");
            this.sp_chien_tanks = this.pMiniGame.getChildByName("sp_chien_tanks");
            this.sp_nen_choi = this.pMiniGame.getChildByName("sp_nen_choi");

            this.lb_cong_tien = this.getControl("lb_cong_tien",this.pMiniGame);
            this.lb_cong_tien.setVisible(false);
            this.sp_nen_tien = this.pMiniGame.getChildByName("sp_nen_tien");
            this.lb_tien_thang = this.getControl("lb_tien_thang",this.pMiniGame);


            this.pEndMinigame = this.getControl("pEndMinigame",this.pMiniGame);
            this.lb_tong_thang = this.getControl("lb_tong_thang",this.pEndMinigame);
            this.btn_close = this.customizeButton("btn_close",AvengerMinigameLayer.BTN_CLOSE,this.pEndMinigame);
            this.pEndMinigame.setVisible(false);

            this.pHeSoNhan = this.getControl("pHeSoNhan",this.pMiniGame);
            this.pHeSoNhan.setVisible(false);
            this.btn_mo1 = this.customizeButton("btn_mo1",AvengerMinigameLayer.BTN_MO1,this.pHeSoNhan);
            this.btn_mo2 = this.customizeButton("btn_mo2",AvengerMinigameLayer.BTN_MO2,this.pHeSoNhan);
            this.btn_mo3 = this.customizeButton("btn_mo3",AvengerMinigameLayer.BTN_MO3,this.pHeSoNhan);
            this.pPhepTinh = this.getControl("pPhepTinh",this.pHeSoNhan);
            this.pPhepTinh.setVisible(false);
            this.lb_prize_ingame = this.getControl("lb_prize_ingame",this.pPhepTinh);
            this.lb_nhan = this.getControl("lb_nhan",this.pPhepTinh);
            this.lb_sum_prize = this.getControl("lb_sum_prize",this.pPhepTinh);

            this.lb_x1 = this.getControl("lb_x1",this.pHeSoNhan);
            this.lb_x2 = this.getControl("lb_x2",this.pHeSoNhan);
            this.lb_x3 = this.getControl("lb_x3",this.pHeSoNhan);
            this.lb_x1.setVisible(false);
            this.lb_x2.setVisible(false);
            this.lb_x3.setVisible(false);
            this.lb_thong_bao = this.getControl("lb_thong_bao",this.pMiniGame);
            this.lb_thong_bao.setVisible(false);
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkCho.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkDam.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkNhay.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistFire.plist");
            //this.resetMiniGame();
            //this.startPlayMiniGame();

        },
        onButtonRelease: function(button,id) {

            switch (id) {
                case AvengerMinigameLayer.BTN_TANK_1:

                case AvengerMinigameLayer.BTN_TANK_2:

                case AvengerMinigameLayer.BTN_TANK_3:

                case AvengerMinigameLayer.BTN_TANK_4:

                case AvengerMinigameLayer.BTN_TANK_5:

                case AvengerMinigameLayer.BTN_TANK_6:

                case AvengerMinigameLayer.BTN_TANK_7:

                case AvengerMinigameLayer.BTN_TANK_8:

                case AvengerMinigameLayer.BTN_TANK_9:

                case AvengerMinigameLayer.BTN_TANK_10:

                case AvengerMinigameLayer.BTN_TANK_11:

                case AvengerMinigameLayer.BTN_TANK_12:
                    if(this.isWaittingKill == false && this.soLanDaMo < this.prizeKillTanks.length)
                    {

                        this.isWaittingKill = true;
                        this.selectTank(id);
                        if(this.isStart)
                        {
                            this.isStart = false;
                            this.lb_thong_bao.setVisible(false);
                            if(avenger.waitingKhoBau)
                            {
                                avenger.stopAutoPlay();
                                avenger.isAutoRotate = false;
                                avenger.btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
                                if(!avenger.isRotate)
                                {
                                    avenger.btn_quay.setBright(true);
                                    avenger.btn_tu_quay.setBright(true);
                                }
                            }
                        }
                    }

                    break;
                case AvengerMinigameLayer.BTN_CLOSE:
                    avenger.audioAvenger.soundEffect(avenger.audioAvenger.btnMiniGame);
                    closeAvengerMinigame(false);
                    avenger.closeMiniGame();
                    break;
                case AvengerMinigameLayer.BTN_MO1:
                    this.moNgoc(1);
                    break;
                case AvengerMinigameLayer.BTN_MO2:
                    this.moNgoc(2);
                    break;
                case AvengerMinigameLayer.BTN_MO3:
                    this.moNgoc(3);
                    break;


            }
        },
        setData:function(data)
        {
            cc.log("data = " + data);
            this.resetMiniGame();
            var datas = data.split(",");
            this.prizeKillTanks = [];
            this.soLanConLai = datas.length - 1;
            for(var i = 0; i < datas.length; i++)
            {
                if(i != datas.length - 1 && i != datas.length - 2)
                    this.prizeKillTanks.push(datas[i]);
                else
                {
                    if( i == datas.length - 2)
                    {
                        this.heSoNhan = parseInt(datas[i]);
                        this.prizeKillTanks.push("0");
                    }
                    else
                    {
                        this.soBonus = parseInt(datas[i]);
                    }

                }

            }

            this.startPlayMiniGame();
        },
        resetMiniGame: function()
        {
            this.sp_chien_tanks.setOpacity(0);
            this.sp_cua_phai.setOpacity(0);
            this.sp_cua_phai.setPosition(cc.p(959,360));
            this.sp_cua_trai.setOpacity(0);
            this.sp_cua_trai.setPosition(cc.p(321,360));
            this.sp_khung_cua.setOpacity(0);
            this.sp_nen_choi.setVisible(false);
            this.sp_minigame_hulk.setVisible(false);
            this.sp_nen_tien.setVisible(false);
            this.lb_tien_thang.setVisible(false);
            this.lb_tien_thang.setString("0");
            this.currentPrizeWin = 0;
            this.prizeKillTanks = [];
            this.soLanDaMo = 0;
            this.heSoNhan = 0;
            this.pEndMinigame.setVisible(false);
            this.pHeSoNhan.setVisible(false);
            this.pPhepTinh.setVisible(false);
            this.lb_tong_thang.setString("");
            for(var i = 1; i< 13; i++)
            {
                this["sp_fire_"+i].setVisible(false);
                avengerMinigame["btn_tank_" + i].loadTextureNormal("res/Avenger/minigame/tanks/"+i+".png");
                avengerMinigame["btn_tank_" + i].setTouchEnabled(true);
                avengerMinigame["btn_tank_" + i].setVisible(false);
            }
            this.btn_mo1.setVisible(true);
            this.btn_mo2.setVisible(true);
            this.btn_mo3.setVisible(true);
            this.btn_mo1.setTouchEnabled(true);
            this.btn_mo2.setTouchEnabled(true);
            this.btn_mo3.setTouchEnabled(true);
            this.lb_thong_bao.setVisible(false);
            this.lb_x1.setVisible(false);
            this.lb_x2.setVisible(false);
            this.lb_x3.setVisible(false);



        },
        startPlayMiniGame: function()
        {
            this.isStart = true;
            this.sp_chien_tanks.runAction(cc.sequence(cc.fadeIn(0.5),cc.callFunc(function(){
                //var fadeIn = cc.fadeIn(0.5);
                avengerMinigame.sp_khung_cua.runAction(cc.fadeIn(1));
                avengerMinigame.sp_cua_trai.runAction(cc.fadeIn(1));
                avengerMinigame.sp_cua_phai.runAction(cc.sequence(cc.fadeIn(1),cc.callFunc(function(){
                    avengerMinigame.sp_nen_choi.setVisible(true);
                    avengerMinigame.sp_nen_tien.setVisible(true);
                    avengerMinigame.lb_tien_thang.setVisible(true);
                    avengerMinigame.sp_cua_trai.runAction(cc.moveTo(0.5,cc.p(-320,360)));
                    avengerMinigame.sp_cua_phai.runAction(cc.sequence(cc.moveTo(0.5,cc.p(1600,360)),cc.callFunc(function(){
                        avengerMinigame.sp_chien_tanks.runAction(cc.fadeOut(1));
                        avengerMinigame.sp_khung_cua.runAction(cc.fadeOut(1));
                        avengerMinigame.lb_thong_bao.setVisible(true);

                        for(var i = 1; i< 13; i++)
                        {
                            avengerMinigame["btn_tank_" + i].setVisible(true);
                        }

                        avengerMinigame.sp_minigame_hulk.setVisible(true);
                        avengerMinigame.hulkCho();

                        avengerMinigame.runAction(cc.sequence(cc.delayTime(10),cc.callFunc(function(){
                            if(avengerMinigame.isStart == true)
                            {
                                closeAvengerMinigame(false);
                                avenger.closeMiniGame();
                            }

                        })));

                    })));
                })));
            })));

        },
        hulkCho: function()
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkCho.plist");
            var str = "";
                var animHulkCho = [];
                for (var i = 1; i < 53; i++) {

                    str = "Avenger/minigame/hulk/cho/hulk_cho_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    if(!spriteFrame)
                    {
                        cc.log("index = "+ i);
                    }
                    animHulkCho.push(spriteFrame);
                }

            var animationHulkCho = cc.Animation.create(animHulkCho, 0.04, 1);
            var animateHulkCho = cc.Animate.create(animationHulkCho);

            avengerMinigame.sp_minigame_hulk.stopAllActions();
            avengerMinigame.sp_minigame_hulk.runAction(cc.repeatForever(animateHulkCho));

        },
        hulkNhay: function(index)
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkNhay.plist");
            var str = "";

                var animHulkNhay = [];
                for (var i = 1; i < 17; i++) {
                    str = "Avenger/minigame/hulk/nhay/hulk_nhay_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    animHulkNhay.push(spriteFrame);
                }

            var animationHulkNhay = cc.Animation.create(animHulkNhay, 0.04, 1);
            var animateHulkNhay = cc.Animate.create(animationHulkNhay);

            avengerMinigame.sp_minigame_hulk.stopAllActions();
            var dam = cc.sequence(cc.delayTime(0.20),cc.scaleTo(0.44,avengerMinigame.runHulkDam[index-1].hulkScale),cc.callFunc(function(){
                avengerMinigame.hulkDam(index);
            }))
            avengerMinigame.sp_minigame_hulk.runAction(cc.spawn(animateHulkNhay,cc.sequence(cc.delayTime(0.20),cc.callFunc(
                    function(){
                    avenger.audioAvenger.soundEffect(avenger.audioAvenger.nhay);
                }),cc.moveTo(0.44,cc.p(avengerMinigame.runHulkDam[index-1].hulkPositionX,avengerMinigame.runHulkDam[index-1].hulkPositionY))),
                dam));

        },
        hulkDam: function(index)
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistHulkDam.plist");
            var str = "";
                var animHulkDam = [];
                for (var i = 1; i < 15; i++) {
                    str = "Avenger/minigame/hulk/tancong/hulk_dam_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    animHulkDam.push(spriteFrame);
                }

            var animationHulkDam = cc.Animation.create(animHulkDam, 0.04, 1);
            var animateHulkDam = cc.Animate.create(animationHulkDam);
            avengerMinigame.sp_minigame_hulk.stopAllActions();
            avengerMinigame.sp_minigame_hulk.runAction(cc.sequence(animateHulkDam,cc.callFunc(function(){
                avengerMinigame.fire(index);
                avengerMinigame["btn_tank_" + index].loadTextureNormal("res/Avenger/minigame/tanks/"+index+"_1.png");
                avengerMinigame["btn_tank_" + index].setTouchEnabled(false);
                avengerMinigame.sp_minigame_hulk.setPosition(cc.p(760.00,49.00));
                avengerMinigame.sp_minigame_hulk.setScale(1);
                avengerMinigame.hulkCho();
                avengerMinigame.flyMoney(avengerMinigame.prizeKillTanks[avengerMinigame.soLanDaMo],index);

                avengerMinigame.currentPrizeWin = avengerMinigame.currentPrizeWin + parseInt(avengerMinigame.prizeKillTanks[avengerMinigame.soLanDaMo]);

                avengerMinigame.lb_tien_thang.setString(formatMoney(0,3,avengerMinigame.currentPrizeWin));

                avengerMinigame.soLanDaMo++;
                if(avengerMinigame.soLanDaMo >= avengerMinigame.prizeKillTanks.length)
                {

                    avengerMinigame.sp_minigame_hulk.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                        avenger.audioAvenger.soundEffect(avenger.audioAvenger.showPopup);
                        avengerMinigame.pHeSoNhan.setVisible(true);

                    })));
                }
                avengerMinigame.isWaittingKill = false;
            })));

        },
        fire: function(index)
        {
            cc.spriteFrameCache.addSpriteFrames("res/Avenger/minigame/PlistFire.plist");
            var str = "";
                var animFire = [];
                for (var i = 1; i < 81; i++) {
                    str = "Avenger/minigame/fire/Fire_"+i+".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFire.push(spriteFrame);
                }

            var animationFire = cc.Animation.create(animFire, 0.04, 1);
            var animateFire = cc.Animate.create(animationFire);
            avengerMinigame["sp_fire_"+index].stopAllActions();
            avengerMinigame["sp_fire_"+index].setVisible(true);
            avengerMinigame["sp_fire_"+index].runAction(cc.sequence(animateFire,cc.callFunc(function(){

            })));

        },
        selectTank:function(index)
        {
            this.indexSelect = index;
            this.hulkNhay(index);

        },
        flyMoney:function(money,index)
        {


            this.lb_cong_tien.setScale(0.5);
            this.lb_cong_tien.setVisible(true);
            if(parseInt(money)>0)
            {
                this.lb_cong_tien.setString("+"+formatMoney(0,3,money));
                avenger.audioAvenger.soundEffect(avenger.audioAvenger.damTang);
            }else
            {
                avenger.audioAvenger.soundEffect(avenger.audioAvenger.damTruot);
                this.lb_cong_tien.setString("Trượt rồi!");
            }

            this.lb_cong_tien.setPosition(cc.p(this["btn_tank_"+ index].getPosition().x,this["btn_tank_"+ index].getPosition().y+50));
            this.lb_cong_tien.runAction(cc.sequence(cc.spawn(cc.moveBy(0.3,cc.p(0,100)),cc.sequence(cc.scaleTo(0.3,1),cc.delayTime(1),cc.callFunc(function(){
                avengerMinigame.lb_cong_tien.setVisible(false);
            })))))
        },
        moNgoc:function(index)
        {
            avenger.audioAvenger.soundEffect(avenger.audioAvenger.btnMiniGame);
            this.getRandom();
            this["btn_mo" + index].setVisible(false);
            for(var i = 1; i< 4; i++)
            {
                this["btn_mo" + i].setTouchEnabled(false);
                this["lb_x" + i].setString("X1");
            }
            avengerMinigame["lb_x" + index].setString("X"+avengerMinigame.heSoNhan);
            avengerMinigame["btn_mo" + index].setVisible(false);
            this["btn_mo" + index].runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){

                avengerMinigame["lb_x" + ((index + 1)%4 + (Math.floor((index + 1)/4)))].setString("X"+avengerMinigame.intRandom1);
                avengerMinigame["lb_x" + ((index + 2)%4 + (Math.floor((index + 2)/4)))].setString("X"+avengerMinigame.intRandom2);

                for(var i = 1; i< 4; i++)
                {
                    avengerMinigame["lb_x" + i].setVisible(true);
                }
                avengerMinigame.lb_prize_ingame.setString(formatMoney(0,3,avengerMinigame.currentPrizeWin));
                avengerMinigame.lb_nhan.setString(avengerMinigame.heSoNhan);
                avengerMinigame.lb_sum_prize.setString(formatMoney(0,3,avengerMinigame.currentPrizeWin * avengerMinigame.heSoNhan));

                avengerMinigame.pPhepTinh.setVisible(true);
                avengerMinigame["btn_mo" + index].runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
                    avengerMinigame.sp_nen_tien.setVisible(false);
                    avengerMinigame.lb_tien_thang.setVisible(false);
                    avengerMinigame.pHeSoNhan.setVisible(false);
                    avengerMinigame.lb_tong_thang.setString(formatMoney(0,3,avengerMinigame.currentPrizeWin * avengerMinigame.heSoNhan));
                    avenger.audioAvenger.soundEffect(avenger.audioAvenger.showPopup);
                    avengerMinigame.pEndMinigame.setVisible(true);
                })));

            })));
        },
        getRandom:function()
        {

                this.intRandom1 = (this.heSoNhan + 1)%(this.soBonus+1) + (Math.floor((this.heSoNhan + 1)/(this.soBonus+1)));
                this.intRandom2 = (this.heSoNhan + 2)%(this.soBonus+1) + (Math.floor((this.heSoNhan + 2)/(this.soBonus+1)));
            if(Math.floor((this.heSoNhan + 1)/(this.soBonus+1)) > 0)
            {
                this.intRandom1 = this.intRandom1 + (this.soBonus-3);
            }
            if(Math.floor((this.heSoNhan + 2)/(this.soBonus+1)) > 0)
            {
                this.intRandom2 = this.intRandom2 + (this.soBonus-3);
            }

        }


    }


);



openAvengerMinigame = function () {
    if (avengerMinigame === null) {

        avengerMinigame = new AvengerMinigameLayer();
        avenger.addChild(avengerMinigame);


    }else
    {
        avengerMinigame.setVisible(true);
    }
    avengerMinigameAppear = true;
    avenger.audioAvenger.soundEffect(avenger.audioAvenger.miniGame);

};
closeAvengerMinigame = function (isRemove) {
    if (avengerMinigame === null) {
        return;
    }
    avengerMinigame.stopAllActions();
    avengerMinigame.sp_minigame_hulk.stopAllActions();
    if(avengerMinigameAppear) {
        avengerMinigame.setVisible(false);
        avengerMinigameAppear = false;
    }
};


AvengerMinigameLayer.BTN_CLOSE = 35;
AvengerMinigameLayer.BTN_TANK_1 = 1;
AvengerMinigameLayer.BTN_TANK_2 = 2;
AvengerMinigameLayer.BTN_TANK_3 = 3;
AvengerMinigameLayer.BTN_TANK_4 = 4;
AvengerMinigameLayer.BTN_TANK_5 = 5;
AvengerMinigameLayer.BTN_TANK_6 = 6;
AvengerMinigameLayer.BTN_TANK_7 = 7;
AvengerMinigameLayer.BTN_TANK_8 = 8;
AvengerMinigameLayer.BTN_TANK_9 = 9;
AvengerMinigameLayer.BTN_TANK_10 = 10;
AvengerMinigameLayer.BTN_TANK_11 = 11;
AvengerMinigameLayer.BTN_TANK_12 = 12;
AvengerMinigameLayer.BTN_MO1 = 13;
AvengerMinigameLayer.BTN_MO2 = 14;
AvengerMinigameLayer.BTN_MO3 = 15;

