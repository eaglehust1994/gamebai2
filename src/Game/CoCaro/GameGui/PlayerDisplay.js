/**
 * Created by vinplay on 2/8/17.
 */

CoCaro.PlayerDisplay = cc.Node.extend({
    ctor: function(index, gameScene) {
        this._super();
        this.index = index;
        this.gameScene = gameScene;
        var bg = new cc.Sprite("res/GameCo/Caro/cuon_giay.png");
        this.addChild(bg);

        var lua1 = new cc.Sprite("res/GameCo/Caro/lua.png");
        this.addChild(lua1);
        lua1.setAnchorPoint(0.5, 1);
        lua1.setPosition(-105, 134.5);
        lua1.setRotationY(180);

        var lua2 = new cc.Sprite("res/GameCo/Caro/lua.png");
        this.addChild(lua2);
        lua2.setPosition(105, 134.5);
        lua2.setAnchorPoint(0.5, 1);

        var action1 = cc.repeatForever(cc.sequence(cc.rotateBy(1, 7), cc.rotateBy(1, -7), cc.rotateBy(1, -7), cc.rotateBy(1, 7)));
        lua1.runAction(action1);
        lua2.runAction(action1.clone());

        var coinBg = new cc.Sprite("res/GameCo/Caro/coin_user.png");
        this.addChild(coinBg);
        coinBg.setPosition(0, -54);

        this.tick = new cc.Sprite(CoCaro.res.o);
        this.addChild(this.tick);
        this.tick.setPosition(0, -120);
        this.tick.setVisible(false);

        this.name = new cc.LabelTTF("Phuhihi", fontArialB.fontName, 20);
        this.addChild(this.name);
        this.name.setPosition(0, 130);
        this.name.enableStroke({r: 0, g: 0, b: 0}, 1.5);

        if (CoCaro.gameLogic.moneyType == MONEY_VIN) {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipVin.png");
        } else {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipXu.png");
        }

        this.addChild(this.chip);
        this.chip.setPosition(coinBg.getPositionX() - coinBg.getContentSize().width / 2 + this.chip.getContentSize().width / 3, coinBg.getPositionY());

        this.cash = new cc.LabelTTF("1.000.000", fontArialB.fontName, 20);
        this.addChild(this.cash);
        this.cash.setPosition(13, -53);
        this.cash.enableStroke({r: 0, g: 0, b: 0}, 1.5);
        /*
        if (CoCaro.gameLogic.moneyType == MONEY_VIN) {
            this.cash.setColor({r:231, g:2, b:254});
        } else {
            this.cash.setColor({r:247, g:235, b:198});
        }*/

        this.avatar = new cc.Sprite("res/common/avatar/Avatar_1.png");
        this.addChild(this.avatar);
        this.avatar.setPosition(0, 40);

        this.clock = new cc.Node();
        this.tieClock = new cc.Sprite("res/GameCo/Caro/Tai-1.png");
        this.clock.addChild(this.tieClock);
        this.tieClock.setPosition(-24.04, 34.02);
        this.tieClock.setAnchorPoint(0.64, 0.18);

        this.tieClock1 = new cc.Sprite("res/GameCo/Caro/Tai-2.png");
        this.clock.addChild(this.tieClock1);
        this.tieClock1.setPosition(24.05, 34.48);
        this.tieClock1.setAnchorPoint(0.36, 0.2);

        var thanClock = new cc.Sprite("res/GameCo/Caro/Mat-dong-ho.png");
        this.clock.addChild(thanClock);

        var matClock = new cc.Sprite("res/GameCo/Caro/mat-tren.png");
        this.clock.addChild(matClock);
        matClock.setPosition(0, 13);

        this.nutbam = new cc.Sprite("res/GameCo/Caro/Num-bam.png");
        this.clock.addChild(this.nutbam);
        this.nutbam.setPosition(0, 45); // -11, 44  20

        var matclock = new cc.Sprite("res/GameCo/Caro/mat-tren.png");
        this.clock.addChild(matclock);
        matclock.setPosition(0, 13);

        this.addChild(this.clock);

        this.timer = 20;
        this.lblTimer = new cc.LabelTTF(this.timer, fontArialB.fontName, 50);
        this.lblTimer.setColor({r: 18, g: 32, b: 68});
        this.lblTimer.setPosition(0, 4);
        this.clock.addChild(this.lblTimer);
        this.clock.setPosition(this.avatar.getPositionX(), this.avatar.getPositionY() - 5);
        this.clock.setVisible(false);
        this.clock.setScale(1.5);
        this.clock.setLocalZOrder(10);

        this.iconOutRoom = new cc.Sprite("res/CardGame/CommonResource/BanChoi/btn_exit_room.png");
        this.addChild(this.iconOutRoom);
        this.iconOutRoom.setPosition(41, 90);
        this.iconOutRoom.setVisible(false);

        this.clockShadow = new cc.Sprite("res/GameCo/Caro/SD2.png");
        this.addChild(this.clockShadow);
        this.clockShadow.setPosition(this.clock.getPositionX(), this.clock.getPositionY() - 60);
        this.clockShadow.setVisible(false);
    },

    startTurn: function(countDownTime) {
        var timeRemain = countDownTime;
        this.clock.setVisible(true);
        this.clockShadow.setVisible(true);
        this.lblTimer.setString(timeRemain);

        if (timeRemain <= 5) {
            this.alertEffect();
        }
        this.callBackCountDown = function(sender){
            timeRemain--;
            if (timeRemain == 5) {
                this.alertEffect();
            }
            if(timeRemain < 0){
                this.stopTurn();
                return;
            }
            this.lblTimer.setString(timeRemain);
        };
        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackCountDown.bind(this), this));
        this.lblTimer.runAction(cc.repeatForever(action));
    },

    alertEffect: function() {
        var action = cc.repeatForever(cc.sequence(cc.rotateBy(0.05, 20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, 20)));
        this.tieClock.runAction(action);
        this.tieClock1.runAction(action.clone());
        this.nutbam.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.rotateBy(0.05, 20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, 20)),
            cc.sequence(cc.moveTo(0.05, cc.p(-11, 44)), cc.moveTo(0.05, cc.p(0, 45)), cc.moveTo(0.05, cc.p(11, 44)), cc.moveTo(0.05, cc.p(0, 45))))));
        this.clock.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.1, 1.55), cc.scaleTo(0.2, 1.45), cc.scaleTo(0.1, 1.5))));
        this.runAction(cc.repeatForever(cc.sequence(cc.callFunc(this.playTicSound, this), cc.delayTime(0.7), cc.callFunc(this.playTicSound, this), cc.delayTime(0.7))));
    },

    playTicSound: function() {
        if (!this.gameScene.isMute)
            this.audioId = cc.audioEngine.playEffect(CoCaro.sound.tictoc, false);
    },

    stopTurn: function() {
        if (this.audioId)
            cc.audioEngine.stopEffect(this.audioId);
        this.clock.setVisible(false);
        this.clockShadow.setVisible(false);
        this.clock.setScale(1.5);
        this.lblTimer.stopAllActions();
        this.clock.stopAllActions();
        this.tieClock.stopAllActions();
        this.tieClock1.stopAllActions();
        this.nutbam.stopAllActions();
        this.tieClock.setRotation(0);
        this.tieClock1.setRotation(0);
        this.nutbam.setRotation(0);
        this.nutbam.setPosition(0, 45);
        this.stopAllActions();
    },

    reset: function() {
        this.stopTurn();
        this.tick.setVisible(false);
        this.iconOutRoom.setVisible(false);
    },

    updateWithPlayer: function(player)
    {
        //cc.log("player index " + player.index);
        if(player.status == 0)
        {
            this.setVisible(false);
            return;
        }

        this.setVisible(true);
        cc.log("this.index " + this.index);
        cc.log("playerName " + player.info.nickName);
        this.name.setString(StringUtility.rutGonName(player.info["nickName"]));
        this.cash.setString(StringUtility.standartNumber(player.info["money"]));
        // Thay doi avatar theo loai

        var avatarUrl = player.info["avatar"];
        this.setAvatarChuan(avatarUrl);
    },

    setAvatar: function(avatarType){
        this.avatar.loadTexture("res/common/avatar/Avatar_" + avatarType + ".png");
    },

    setAvatarChuan: function(avatarUrl){
        cc.log("avatarUrl: " + avatarUrl);
        this.avatar.setTexture(gameUtility.getAvatarPath(avatarUrl));
    },

    setTick: function(tickType) {
        if (tickType == 1) {
            this.tick.setTexture(CoCaro.res.x);
        } else {
            this.tick.setTexture(CoCaro.res.o);
        }
        this.tick.setVisible(true);
    },

    addMoney: function(money, time)           // Effect tien` khi het van' choi
    {
        if(!time){
            time = 0;
        }
        var nodeMoney = gameUtility.createNodeMoney(money);
        nodeMoney.setLocalZOrder(10);
        var pos = this.avatar.getPosition();

        this.updateMoney = function(sender){
            this.cash.setString(StringUtility.standartNumber(CoCaro.gameLogic.players[this.index].info["money"]));
        };

        pos = this.convertToWorldSpaceAR(pos);
        pos = this.gameScene.effect2D.convertToNodeSpace(pos);
        nodeMoney.setPosition(pos);
        nodeMoney.setVisible(false);
        nodeMoney.setScale(4);
        nodeMoney.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.85))),cc.delayTime(1),cc.moveBy(1,cc.p(0,50)),cc.removeSelf()));

        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.updateMoney.bind(this), this)));
        this.gameScene.effect2D.addChild(nodeMoney);
    }
});