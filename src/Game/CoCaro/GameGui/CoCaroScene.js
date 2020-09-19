/**
 * Created by vinplay on 2/4/17.
 */

CoCaro.CoCaroScene = BaseLayer.extend({
    ctor: function() {
        this._super();
        this.effect2D = new CoCaro.EffectLayer();
        this.effect2D.gameLayer = this;
        this.addChild(this.effect2D);
        this.effect2D.setLocalZOrder(9999);
        this.board = null;
        this.lastTile = null;
        this.isMarked = false;
    },

    onEnter: function() {
        this._super();
    },

    customizeGUI: function() {
        var size = GameScene.getMainContentSize();

        var touchBtn = new ccui.Button("res/GameCo/Caro/background.png");
        this.addChild(touchBtn);
        touchBtn.setLocalZOrder(-1000);
        touchBtn.setPosition(size.width/2, size.height / 2);
        touchBtn.setOpacity(0);

        this.bg = new cc.Sprite("res/GameCo/Caro/background.png");
        this.addChild(this.bg);
        this.bg.setPosition(size.width / 2, size.height / 2);

        var table = new cc.Sprite("res/GameCo/Caro/table.png");
        this.addChild(table);
        table.setPosition(644, 355);

        this.playerList = [];
        var player1 = new CoCaro.PlayerDisplay(0, this);
        player1.setPosition(135, 302);
        this.addChild(player1);

        var player2 = new CoCaro.PlayerDisplay(1, this);
        this.addChild(player2);
        player2.setPosition(1150, 302);
        this.playerList.push(player1);
        this.playerList.push(player2);

        this.boardSize = CoCaro.boardSize;
        this.board = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.board[i] = new Array(this.boardSize);
            for (var j = 0; j < this.boardSize; j++) {
                if ((i + j) % 2 == 0)
                    this.board[i][j] = new cc.Sprite(CoCaro.res.x);
                else
                    this.board[i][j] = new cc.Sprite(CoCaro.res.o);
                this.addChild(this.board[i][j]);
                this.board[i][j].setPosition(this.getPositionOfTile(i, j));
            }
        }

        this.tempMark = new cc.Sprite(CoCaro.res.x);
        this.addChild(this.tempMark);
        this.tempMark.setVisible(false);
        this.tempMark.setOpacity(150);

        var infoNode = new cc.Node();
        var bgInfo = new cc.Sprite("res/GameCo/Caro/bg_info.png");
        infoNode.addChild(bgInfo);

        this.lblTableName = new cc.LabelTTF("tenban", fontArialB.fontName, 20);
        infoNode.addChild(this.lblTableName);
        this.lblTableName.setPosition(0, 25);
        this.lblTableName.setColor({r: 107, g: 60, b: 3});

        if (CoCaro.gameLogic.moneyType == MONEY_VIN) {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipVin.png");
        } else {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipXu.png");
        }
        infoNode.addChild(this.chip);
        this.chip.setPosition(5 - bgInfo.getContentSize().width / 2 + this.chip.getContentSize().width / 2, -9);

        this.lblMoney = new cc.LabelTTF("1.000.000", fontArialB.fontName, 22);
        infoNode.addChild(this.lblMoney);
        this.lblMoney.setPosition(14, -9);
        this.lblMoney.enableStroke({r: 0, g: 0, b: 0}, 1.5);
        /*
        if (CoCaro.gameLogic.moneyType == MONEY_VIN) {
            this.lblMoney.setColor({r:231, g:2, b:254});
        } else {
            this.lblMoney.setColor({r:247, g:235, b:198});
        }*/

        this.addChild(infoNode);
        infoNode.setPosition(134, 560);

        this.btnBack = new ccui.Button("res/GameCo/Caro/back.png");
        this.btnBack.setPosition(82, 661);
        this.addChild(this.btnBack);
        this.btnBack.setPressedActionEnabled(true);
        this.btnBack.addTouchEventListener(this.onBackClick, this);

        this.btnSound = new ccui.Button("res/GameCo/Caro/audioOn.png");
        this.btnSound.setPosition(189.63, 661);
        this.addChild(this.btnSound);
        this.btnSound.addTouchEventListener(this.onSoundClick, this);

        this.btnNoSound = new ccui.Button("res/GameCo/Caro/audioOff.png");
        this.btnNoSound.setPosition(181.39, 661);
        this.addChild(this.btnNoSound);
        this.btnNoSound.addTouchEventListener(this.onSoundClick, this);
        this.isMute = false;
        this.updateSound();

        this.highLight = new cc.Sprite("res/GameCo/Caro/nhac_nho.png");
        this.addChild(this.highLight);
        this.highLight.setVisible(false);

        var btnHelp = new ccui.Button("res/GameCo/Caro/help.png");
        this.addChild(btnHelp);
        btnHelp.setPosition(1086, 606);
        btnHelp.addTouchEventListener(this.onHelpClick, this);

        var btnChat = new ccui.Button("res/GameCo/Caro/chat.png");
        this.addChild(btnChat);
        btnChat.setPosition(1200, 606);
        btnChat.addTouchEventListener(this.onChatClick, this);

        this.nodeStart = [];
        var nodeLeft = new CoCaro.NodeStart(0);
        this.addChild(nodeLeft);
        nodeLeft.setPosition(-nodeLeft.bg.getContentSize().width / 2 - cc.winSize.width, 493);
        this.posLeft = nodeLeft.getPosition();

        this.nodeStart.push(nodeLeft);
        var nodeRight = new CoCaro.NodeStart(1);
        this.addChild(nodeRight);
        nodeRight.setPosition(nodeRight.bg.getContentSize().width / 2 + cc.winSize.width, 300);
        this.posRight = nodeRight.getPosition();

        this.nodeStart.push(nodeRight);

        this.vs = new cc.Sprite("res/GameCo/Caro/vs.png");
        this.addChild(this.vs);
        this.vs.setPosition(640, 398);
        this.vs.setScale(0);

        this.wait = new cc.Scale9Sprite("res/common/9patch.png");
        this.addChild(this.wait);
        this.wait.setPosition(size.width / 2, size.height * 0.6);
        var lblWait = new cc.LabelTTF("Vui lòng chờ người khác vào chơi", fontArialB.fontName, 25);
        this.wait.addChild(lblWait);
        this.wait.setContentSize(lblWait.getContentSize().width + 20, lblWait.getContentSize().height + 20);
        lblWait.setPosition(this.wait.getContentSize().width / 2, this.wait.getContentSize().height / 2);

        this.resetBoard();

        var that = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                return CoCaro.gameLogic.isPlaying && CoCaro.gameLogic.isMyTurn() && !that.isMarked;
            },

            onTouchMoved: function(touch, event) {
            },

            onTouchEnded: function(touch, event) {
                var pos = that.convertToNodeSpace(touch.getLocation());
                if (pos.x <= CoCaro.fixPos.minx || pos.x > CoCaro.fixPos.maxx || pos.y <= CoCaro.fixPos.miny || pos.y > CoCaro.fixPos.maxy)
                    return;
                var tile = that.getTileOfPos(pos);
                if (!CoCaro.gameLogic.canMark(tile.x, tile.y))
                    return;
                that.tempMark.setVisible(false);
                that.isMarked = true;
                that.lastTile = tile;
                that.setBoardTile(tile.x, tile.y, CoCaro.gameLogic.getCurrentTickType());
                gameWsClient.sendTakeTurn(tile.x, tile.y);
            }
        });
        cc.eventManager.addListener(listener, this.bg);

        var mouseListener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event){
                if (!CoCaro.gameLogic.isMyTurn() || that.isMarked)
                    return;
                var target = event.getCurrentTarget();
                var pos = target.convertToNodeSpace(event.getLocation());
                if (pos.x <= CoCaro.fixPos.minx || pos.x > CoCaro.fixPos.maxx || pos.y <= CoCaro.fixPos.miny || pos.y > CoCaro.fixPos.maxy) {
                    that.tempMark.setVisible(false);
                    return;
                }
                var tile = that.getTileOfPos(pos);
                if (!CoCaro.gameLogic.canMark(tile.x, tile.y)) {
                    that.tempMark.setVisible(false);
                    return;
                }
                that.tempMark.setVisible(true);
                that.tempMark.setPosition(that.board[tile.x][tile.y].getPosition());
            }
        });
        cc.eventManager.addListener(mouseListener, this.bg);
    },

    onHelpClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var s = GameManager.getInstance().getHotroLink(GameList.CoCaro);
            if(!cc.sys.isNative){
                window.open(s, '_blank');
            } else {
                if(lobby.open_payment_ios == false){
                    popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                    return;
                }
            }
        }
    },

    onSoundClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.isMute = !this.isMute;
            this.updateSound();
        }
    },

    updateSound: function() {
        this.btnSound.setVisible(!this.isMute);
        this.btnNoSound.setVisible(this.isMute);
    },

    onChatClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (!this.chatLayer){
                this.chatLayer = new ChatLayer(this);
                this.chatLayer.setVisible(false);
                this.addChild(this.chatLayer, 999);
                this.chatLayer.bg.setPositionY(this.chatLayer.bg.getPositionY() - 50);
            }
            this.chatLayer.setVisible(!this.chatLayer.isVisible());
            this.chatLayer.touchListener.setEnabled(this.chatLayer.isVisible());
        }
    },

    getPositionOfTile: function(x, y) {
        return cc.p(CoCaro.fixPos.minx + CoCaro.halfTileSize * (2 * x + 1), CoCaro.fixPos.miny + CoCaro.halfTileSize * (2 * y + 1));
    },

    getTileOfPos: function(pos) {
        var tx = parseInt((pos.x - CoCaro.fixPos.minx) / CoCaro.tileSize);
        var ty = parseInt((pos.y - CoCaro.fixPos.miny) / CoCaro.tileSize);
        return {x: tx, y: ty};
    },

    updateWarning: function() {
        var map = CoCaro.gameLogic.effectMap;
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                if (map[i][j] == 1) {
                    cc.log("running action: " + this.board[i][j].getNumberOfRunningActions());
                    if (this.board[i][j].getNumberOfRunningActions() == 0) {
                        var action = cc.sequence(cc.scaleTo(0.3, 0.8, 0.8), cc.scaleTo(0.3, 1, 1));
                        this.board[i][j].runAction(cc.repeatForever(action));
                    }
                } else {
                    this.board[i][j].stopAllActions();
                    this.board[i][j].setScale(1);
                }
            }
        }
    },

    resetData: function() {
        this.effect2D.hideEffect();
        this.resetBoard();
        this.lastTile = null;
        this.isMarked = false;
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].reset();
        }
    },

    resetBoard: function() {
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                this.board[i][j].stopAllActions();
                this.board[i][j].setScale(1);
                this.board[i][j].setVisible(false);
            }
        }
        this.highLight.setVisible(false);
        this.tempMark.setVisible(false);
    },

    addAutoStart: function(time) {
        cc.log("addAutoStart");
        this.stopAutoStart();
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        this.after = new cc.Sprite(CoCaro.res.afterTime);

        var timeRemain = time;
        this.after.setPosition(cc.p(winSize.width*0.48, winSize.height*0.63));
        this.addChild(this.after);

        var chuc = Math.floor(time/10);
        var donVi = time % 10;

        this.chucS = new cc.Sprite(this.getImgStartNum(chuc));
        this.donViS = new cc.Sprite(this.getImgStartNum(donVi));
        this.chucS.setPosition(this.after.getPositionX() + this.after.getContentSize().width*0.5, this.after.getPositionY());
        this.addChild(this.chucS);
        this.donViS.setPosition(this.chucS.getPositionX() + this.chucS.getContentSize().width, this.chucS.getPositionY());
        this.addChild(this.donViS);

        if(chuc == 0){
            if (this.chucS)
                this.chucS.setVisible(false);
        }

        this.callBackStartAuto = function(sender){
            timeRemain--;
            chuc = Math.floor(timeRemain/10);
            donVi = timeRemain % 10;
            if(chuc == 0){
                if (this.chucS)
                    this.chucS.setVisible(false);
            }
            if(timeRemain < 0){
                this.stopAutoStart();
                return;
            }

            this.chucS.setTexture(this.getImgStartNum(chuc));
            this.donViS.setTexture(this.getImgStartNum(donVi));
        };

        var action = cc.sequence(cc.delayTime(1),cc.callFunc(this.callBackStartAuto.bind(this), this));
        this.after.runAction(cc.repeatForever(action));
    },

    getImgStartNum: function(num){
        return CoCaro.res.startNumPngPath + num + ".png";
    },

    stopAutoStart: function(){
        // xu thang cu neu ton tai;
        if(this.after){
            this.after.stopAllActions();
            this.after.removeFromParent();
            this.after = null;
        }
        if(this.chucS){
            this.chucS.removeFromParent();
            this.chucS = null;
        }

        if(this.donViS){
            this.donViS.removeFromParent();
            this.donViS = null;
        }
    },

    onBackClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            cc.log("back clicked");
            var pk = new CoCaro.CmdSendRequestLeaveGame();
            pk.putData();
            gameWsClient.send(pk);
            pk.clean();
        }
    },

    setBoardTile: function(x, y, type) {
        if (type == 1) {
            this.board[x][y].setTexture(CoCaro.res.x);
        } else {
            this.board[x][y].setTexture(CoCaro.res.o);
        }
        this.board[x][y].setVisible(true);
        this.highLight.setVisible(true);
        this.highLight.setPosition(this.board[x][y].getPosition());
    },

    showStartGame: function() {
        this.stopAutoStart();
        this.vs.stopAllActions();
        this.vs.setScale(0);
        this.vs.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.delayTime(1), cc.scaleTo(0.3, 0)));
        for (var i = 0; i < 2; i++) {
            if (CoCaro.gameLogic.players[i].status != 0) {
                this.nodeStart[i].initData(CoCaro.gameLogic.players[i]);
            }
            this.nodeStart[i].stopAllActions();
            if (i == 0) {
                this.nodeStart[i].setPosition(this.posLeft);
                var action = cc.sequence(cc.moveTo(0.3, cc.p(493, 493)), cc.delayTime(1),
                      cc.moveTo(0.3, this.posRight));
                this.nodeStart[i].runAction(action);
            } else {
                this.nodeStart[i].setPosition(this.posRight);
                var action = cc.sequence(cc.moveTo(0.3, cc.p(786, 300)), cc.delayTime(1),
                    cc.moveTo(0.3, this.posLeft));
                this.nodeStart[i].runAction(action);
            }
        }
        if (!this.isMute)
            cc.audioEngine.playEffect(CoCaro.sound.start, false);
    },

    addTienCuoiVan: function() {
        for (var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
            this.playerList[i].addMoney(CoCaro.gameLogic.players[i].tongCuoiVan, 1);
        }
    },

    showWinLine: function(x, y) {
        for (var i = 0; i < x.length; i++) {
            var spr = new cc.Sprite("res/GameCo/Caro/highlightTile.png");
            this.board[x[i]][y[i]].setLocalZOrder(1);
            spr.setPosition(this.board[x[i]][y[i]].getPosition());
            this.addChild(spr);
            spr.runAction(cc.sequence(cc.fadeIn(0.1), cc.delayTime(3), cc.fadeOut(0.1), cc.delayTime(0.1), cc.removeSelf()));
        }
    },

    receiveInfoMoiChoi: function(data){
        if(!this.guiMoiChoi){
            this.guiMoiChoi = new MoiChoiLayer();
            this.addChild(this.guiMoiChoi);
        }
        //this.guiMoiChoi.setVisible(true);
        this.guiMoiChoi.show();
        this.guiMoiChoi.updateListItems(data, this.moneyType);
        this.guiMoiChoi.reloadData(data);
    },

    onUpdateGui: function(data){
        var i;
        var numPlayer = 0;
        for (i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
            this.playerList[i].updateWithPlayer(CoCaro.gameLogic.players[i]);
            if (CoCaro.gameLogic.players[i].status != 0)
                numPlayer++;
        }

        if (numPlayer == 2) {
            this.wait.setVisible(false);
        } else {
            this.wait.setVisible(true);
        }

        switch (CoCaro.gameLogic.gameState) {
            case CoCaro.GameState.JOIN_ROOM: {
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
                cc.log("Caro join room");
                this.lblTableName.setString("Bàn " + CoCaro.gameLogic.roomId);
                this.lblMoney.setString(StringUtility.standartNumber(CoCaro.gameLogic.bet));
                break;
            }

            case CoCaro.GameState.AUTO_START:
            {
                cc.log("CoCaroScene autostart");
                if(data && (data.isAutoStart) && (data.timeAutoStart > 0))
                    this.addAutoStart(CoCaro.gameLogic.timeAutoStart);

                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }

                CoCaro.gameLogic.gameState = CoCaro.GameState.NONE;
                break;
            }

            case CoCaro.GameState.USER_JOIN:{
                //this.playerList[CoCaro.gameLogic.activeLocalChair].hideEndGame();
                this.playerList[CoCaro.gameLogic.activeLocalChair].updateWithPlayer(CoCaro.gameLogic.players[CoCaro.gameLogic.activeLocalChair]);
                break;
            }

            case CoCaro.GameState.USER_LEAVE:{
                cc.log("vao CoCaroScene userleave");
                this.playerList[CoCaro.gameLogic.activeLocalChair].updateWithPlayer(CoCaro.gameLogic.players[CoCaro.gameLogic.activeLocalChair]);
                if(CoCaro.gameLogic.activeLocalChair == 0){
                    cc.log("vao acitiveLocalChair roi");
                    userGameData.setItem("inRoom", "false");
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                }
                break;
            }

            case CoCaro.GameState.START_GAME:
            {
                cc.log("bat dau choi nao anh em");
                for (var i = 0; i < this.playerList.length; i++) {
                    this.playerList[i].setTick(CoCaro.gameLogic.players[i].info.tickType);
                }
                var myTick = CoCaro.gameLogic.getTickTypeOfPlayer(0);
                var resTick = CoCaro.res.o;
                if (myTick == 1)
                    resTick = CoCaro.res.x;
                this.tempMark.setTexture(resTick);
                this.showStartGame();
                break;
            }

            case CoCaro.GameState.TAKE_TURN:
            {
                this.isMarked = true;
                if (this.lastTile) {
                    if (this.lastTile.x != data.x || this.lastTile.y != data.y) {
                        this.board[this.lastTile.x][this.lastTile.y].setVisible(false);
                    }
                    this.lastTile = null;
                }
                cc.log("Take Turn.................................");
                cc.log(data.x + " " + data.y + " " + data.type);
                this.tempMark.setVisible(false);
                this.setBoardTile(data.x, data.y, data.type);
                CoCaro.gameLogic.checkWarning(data.x, data.y);
                this.updateWarning();
                if (!this.isMute)
                    cc.audioEngine.playEffect(CoCaro.sound.mark, false);
                break;
            }

            case CoCaro.GameState.CHANGE_TURN:
            {
                for (var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++)
                    this.playerList[i].stopTurn();
                this.playerList[CoCaro.gameLogic.currentPlayer].startTurn(CoCaro.gameLogic.countDownTime);
                if (CoCaro.gameLogic.isMyTurn()) {
                    this.isMarked = false;
                }
                break;
            }

            case CoCaro.GameState.END_GAME:
            {
                this.tempMark.setVisible(false);
                for (var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].stopTurn();
                }
                if (data.result == CoCaro.Result.WIN_LOSE) {
                    var f;
                    if (data.winner != CoCaro.gameLogic.myChair) {
                        f = this.effect2D.showLoseEffect;
                        if (!this.isMute)
                            cc.audioEngine.playEffect(CoCaro.sound.lose, false);
                    } else {
                        f = this.effect2D.showWinEffect;
                        if (!this.isMute)
                            cc.audioEngine.playEffect(CoCaro.sound.win, false);
                    }
                    this.runAction(cc.sequence(cc.callFunc(this.showWinLine.bind(this, data.x, data.y)), cc.delayTime(0.3),
                        cc.callFunc(this.addTienCuoiVan.bind(this)), cc.callFunc(f.bind(this.effect2D))));
                } else {
                    this.effect2D.showDrawEffect();
                    if (!this.isMute)
                        cc.audioEngine.playEffect(CoCaro.sound.draw, false);
                }
                break;
            }

            case CoCaro.GameState.UPDATE_MATCH:
            {
                this.resetData();
                for (var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
                    this.playerList[i].reset();
                }
                break;
            }

            case CoCaro.GameState.NOTIFYOUTROOM:
            {
                this.playerList[CoCaro.gameLogic.convertChair(data.outChair)].iconOutRoom.setVisible(data.isOutRoom);
                if (CoCaro.gameLogic.convertChair(data.outChair) == 0){
                    var stringNotify;
                    if(data.isOutRoom){
                        stringNotify = "Bạn đã đăng ký rời phòng thành công."
                    }else{
                        stringNotify = "Bạn đã hủy đăng ký rời phòng."
                    }
                    GameToast.makeToast(2, stringNotify, this.effect2D);
                }
                break;
            }

            case CoCaro.GameState.THONG_TIN_VAN_CHOI:
            {
                this.lblTableName.setString("Bàn " + CoCaro.gameLogic.roomId);
                this.lblMoney.setString(StringUtility.standartNumber(CoCaro.gameLogic.bet));

                for (var i = 0; i < this.boardSize; i++) {
                    for (var j = 0; j < this.boardSize; j++) {
                        if (CoCaro.gameLogic.board[i][j] != 0) {
                            if (CoCaro.gameLogic.board[i][j] == 1) {
                                this.board[i][j].setTexture(CoCaro.res.x);
                            } else {
                                this.board[i][j].setTexture(CoCaro.res.o);
                            }
                            this.board[i][j].setVisible(true);
                        }
                    }
                }

                this.updateWarning();
                this.playerList[CoCaro.gameLogic.currentPlayer].startTurn(data.countDownTime);

                for (var i = 0; i < 2; i++) {
                    this.playerList[i].setTick(CoCaro.gameLogic.players[i].info.tickType);
                }

                if (0 <= data.lastX && data.lastX < this.boardSize && 0 <= data.lastY && data.lastY < this.boardSize) {
                    if (CoCaro.gameLogic.board[data.lastX][data.lastY] != 0) {
                        this.highLight.setPosition(this.board[data.lastX][data.lastY].getPosition());
                        this.highLight.setVisible(true);
                    }
                }

                var myTick = CoCaro.gameLogic.players[0].info.tickType;
                var resTick;
                cc.log("My Tick: " + myTick);
                if (myTick == CaroTile.X) {
                    CoCaro.gameLogic.starter = 0;
                    resTick = CoCaro.res.x;
                } else {
                    CoCaro.gameLogic.starter = 1;
                    resTick = CoCaro.res.o;
                }

                this.tempMark.setTexture(resTick);

                CoCaro.gameLogic.gameState = CoCaro.GameState.NONE;
                break;
            }
        }
    },

    updateChatRoom: function(globalChair, image) {
        var localChair = CoCaro.gameLogic.convertChair(globalChair);
        var player = this.playerList[localChair];
        var pos = player.avatar.convertToWorldSpaceAR(cc.p(0,0));
        this.effect2D.updateChatRoom(localChair, pos, image);
    }
});