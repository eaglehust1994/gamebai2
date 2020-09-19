/**
 * Created by vinplay on 2/8/17.
 */

CoUp.PlayerDisplay = cc.Node.extend({
    ctor: function(index, gameScene) {
        this._super();
        this.index = index;
        this.gameScene = gameScene;
        var bg = new cc.Sprite("res/GameCo/CoTuong/cuon_giay.png");
        this.addChild(bg);

        var lua1 = new cc.Sprite("res/GameCo/CoTuong/lua.png");
        this.addChild(lua1);
        lua1.setAnchorPoint(0.5, 1);
        lua1.setPosition(-100, 83);
        lua1.setRotationY(180);

        var lua2 = new cc.Sprite("res/GameCo/CoTuong/lua.png");
        this.addChild(lua2);
        lua2.setPosition(100, 83);
        lua2.setAnchorPoint(0.5, 1);

        var action1 = cc.repeatForever(cc.sequence(cc.rotateBy(1, 7), cc.rotateBy(1, -7), cc.rotateBy(1, -7), cc.rotateBy(1, 7)));
        lua1.runAction(action1);
        lua2.runAction(action1.clone());

        this.coinBg = new cc.Sprite("res/GameCo/Caro/coin_user.png");
        this.addChild(this.coinBg);
        this.coinBg.setPosition(-1, -55);

        this.name = new cc.LabelTTF("Phuhihi", fontArialB.fontName, 20);
        this.addChild(this.name);
        this.name.setPosition(0, 92);
        this.name.enableStroke({r: 0, g: 0, b: 0}, 1.5);

        if (CoUp.gameLogic.moneyType == MONEY_VIN) {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipVin.png");
        } else {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipXu.png");
        }

        this.addChild(this.chip);
        this.chip.setPosition(this.coinBg.getPositionX() - this.coinBg.getContentSize().width / 2 + this.chip.getContentSize().width / 3, this.coinBg.getPositionY());

        this.cash = new cc.LabelTTF("1.000.000", fontArialB.fontName, 20);
        this.addChild(this.cash);
        this.cash.setPosition(13, -55);
        this.cash.enableStroke({r: 0, g: 0, b: 0}, 1.5);

        this.avatar = new cc.Sprite("res/common/avatar/Avatar_1.png");
        this.addChild(this.avatar);
        this.avatar.setPosition(0, 20);
        this.avatar.setScale(0.9);

        this.btnJoinRoom = new ccui.Button("res/GameCo/CoTuong/add_user.png");
        this.addChild(this.btnJoinRoom);
        this.btnJoinRoom.setPosition(this.avatar.getPosition());
        this.btnJoinRoom.addTouchEventListener(this.onSittingClick, this);

        this.btnStandUp = new ccui.Button("res/GameCo/CoTuong/standup.png");
        this.addChild(this.btnStandUp);
        this.btnStandUp.setPosition(41, -10);
        this.btnStandUp.setVisible(false);
        this.btnStandUp.addTouchEventListener(this.onStandUp, this);

        this.iconOutRoom = new cc.Sprite("res/CardGame/CommonResource/BanChoi/btn_exit_room.png");
        this.addChild(this.iconOutRoom);
        this.iconOutRoom.setPosition(41, 60);
        this.iconOutRoom.setVisible(false);

        this.clock = new cc.Sprite("res/GameCo/CoTuong/clock.png");
        this.addChild(this.clock);
        this.clock.setPosition(-56, -94);

        this.lblTimer = new cc.LabelTTF("14:30", fontArialB.fontName, 25);
        this.lblTimer.setColor({r: 18, g: 32, b: 68});
        this.lblTimer.setPosition(12, -94);
        this.addChild(this.lblTimer);

        this.bgPiece = new cc.Sprite("res/GameCo/CoTuong/dau_quan_do.png");
        this.addChild(this.bgPiece);
        if (index == 0) {
            this.bgPiece.setPosition(-125, -55);
        } else {
            this.bgPiece.setPosition(125, -58);
        }
        this.piece = new cc.Sprite("res/GameCo/CoTuong/piece/bg.png");
        this.bgPiece.addChild(this.piece);
        this.piece.setPosition(this.bgPiece.width / 2 - 2, this.bgPiece.height / 2 + 4);
        this.bgPiece.setVisible(false);
    },

    startTurn: function(countDownTime, gameTime) {
        if (this.lblTurnTime) {
            this.lblTurnTime.removeFromParent();
            this.lblTurnTime = null;
        }

        this.lblTurnTime = gameUtility.createSo(countDownTime);
        this.addChild(this.lblTurnTime);
        this.lblTurnTime.setPosition(this.avatar.getPosition());

        this.lblTimer.setString(this.convertMinuteTime(gameTime));
        var timeRemain = countDownTime;

        this.callBackCountDown = function(sender){
            gameTime--;
            timeRemain--;
            if(timeRemain < 0 || gameTime < 0){
                this.stopTurn();
                return;
            }
            this.lblTimer.setString(this.convertMinuteTime(gameTime));
            if (this.lblTurnTime) {
                this.lblTurnTime.removeFromParent();
                this.lblTurnTime = null;
            }
            this.lblTurnTime = gameUtility.createSo(timeRemain);
            this.addChild(this.lblTurnTime);
            this.lblTurnTime.setPosition(this.avatar.getPosition());
        };
        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackCountDown.bind(this), this));
        this.lblTimer.runAction(cc.repeatForever(action));
    },

    convertMinuteTime: function(time) {
        var m = parseInt(time / 60);
        var s = time - m * 60;
        if (m < 10)
            m = "0" + m;
        if (s < 10)
            s = "0" + s;
        return m + ":" + s;
    },

    stopTurn: function() {
        this.lblTimer.stopAllActions();
        if (this.lblTurnTime) {
            this.lblTurnTime.removeFromParent();
            this.lblTurnTime = null;
        }
    },

    reset: function() {
        this.stopTurn();
        this.iconOutRoom.setVisible(false);
        this.lblTimer.setVisible(false);
        this.clock.setVisible(false);
    },

    updateWithPlayer: function(player) {
        this.player = player;
        //cc.log("player index " + player.index);
        if (player.status <= 1) {
            this.removePlayer();
            return;
        }

        cc.log("Check hang");
        cc.log(player.status);
        if (player.status == 2) {
            this.bgPiece.setVisible(false);
            cc.log(player.info.gameChair);
            cc.log(CoUp.gameLogic.myGameChair);
            if (player.info.gameChair == CoUp.gameLogic.myGameChair) {
                cc.log("show");
                this.showBtnStandUp();
            } else {
                cc.log("hide");
                this.hideBtnStandUp();
            }
        } else {
            cc.log("hide2");
            this.hideBtnStandUp();
        }

        this.btnJoinRoom.setVisible(false);
        this.name.setVisible(true);
        this.cash.setVisible(true);
        this.avatar.setVisible(true);
        this.coinBg.setVisible(true);
        this.chip.setVisible(true);

        cc.log("this.index " + this.index);
        cc.log("playerName " + player.info.nickName);
        this.name.setString(StringUtility.rutGonString(player.info["nickName"], 12));
        this.cash.setString(StringUtility.standartNumber(player.info["money"]));
        // Thay doi avatar theo loai

        var avatarUrl = player.info["avatar"];
        this.setAvatarChuan(avatarUrl);
    },

    removePlayer: function() {
        this.name.setVisible(false);
        this.cash.setVisible(false);
        this.avatar.setVisible(false);
        this.iconOutRoom.setVisible(false);
        this.coinBg.setVisible(false);
        this.lblTimer.setVisible(false);
        this.clock.setVisible(false);
        this.chip.setVisible(false);
        this.btnJoinRoom.setVisible(true);
        this.bgPiece.setVisible(false);
        this.hideBtnStandUp();
    },

    setAvatar: function(avatarType){
        this.avatar.loadTexture("res/common/avatar/Avatar_" + avatarType + ".png");
    },

    setAvatarChuan: function(avatarUrl){
        cc.log("avatarUrl: " + avatarUrl);
        this.avatar.setTexture(gameUtility.getAvatarPath(avatarUrl));
    },

    addMoney: function(money, time)           // Effect tien` khi het van' choi
    {
        if(!time){
            time = 0;
        }
        var nodeMoney = gameUtility.createNodeMoney(money);
        nodeMoney.setLocalZOrder(10);
        var pos = this.avatar.getPosition();

        this.updateMoney = function(){
            var player = CoUp.gameLogic.getPlayerByGameChair(this.index);
            if (player)
                this.cash.setString(StringUtility.standartNumber(player.info["money"]));
        };

        pos = this.convertToWorldSpaceAR(pos);
        pos = this.gameScene.effect2D.convertToNodeSpace(pos);
        nodeMoney.setPosition(pos);
        nodeMoney.setVisible(false);
        nodeMoney.setScale(4);
        nodeMoney.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.85))),cc.delayTime(1),cc.moveBy(1,cc.p(0,50)),cc.removeSelf()));

        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.updateMoney.bind(this), this)));
        this.gameScene.effect2D.addChild(nodeMoney);
    },

    onSittingClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var pk = new CoUp.CmdSendRequestSitting();
            pk.putData();
            gameWsClient.send(pk);
            pk.clean();
        }
    },

    onStandUp: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var pk = new CoUp.CmdSendRequestStandUp();
            pk.putData();
            gameWsClient.send(pk);
            pk.clean();
        }
    },

    showBtnStandUp: function() {
        if(this.player.status == 0) {
            return;
        }
        this.btnStandUp.setVisible(true);
    },

    hideBtnStandUp: function() {
        this.btnStandUp.setVisible(false);
    },

    checkStandUp: function() {
        if (this.player && this.player.status <= 1) {
            this.hideBtnStandUp();
            this.removePlayer();
        }
    },

    updateStartInfo: function() {
        this.lblTimer.setVisible(true);
        this.clock.setVisible(true);
        this.lblTimer.setString(this.convertMinuteTime(this.player.gameTime));
        this.bgPiece.setVisible(true);
        if (this.player.chessColor == "b") {
            this.bgPiece.setTexture("res/GameCo/CoTuong/dau_quan_den.png");
            this.piece.setTexture("res/GameCo/CoTuong/piece/bg.png");
            this.piece.setPosition(this.bgPiece.width / 2 + 1, this.bgPiece.height / 2);
        } else {
            this.bgPiece.setTexture("res/GameCo/CoTuong/dau_quan_do.png");
            this.piece.setTexture("res/GameCo/CoTuong/piece/rg.png");
            this.piece.setPosition(this.bgPiece.width / 2 - 2, this.bgPiece.height / 2 + 4);
        }
    }
});