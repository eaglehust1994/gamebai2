/**
 * Created by vinplay on 2/4/17.
 */

CoUp.CoUpScene = BaseLayer.extend({
    ctor: function() {
        this._super();
        this.effect2D = new CoUp.EffectLayer();
        this.effect2D.gameLayer = this;
        this.addChild(this.effect2D);
        this.effect2D.setLocalZOrder(9999);
        this.pieces = null;
        this.lastTile = null;
        this.isMarked = false;
        this.chatLogLength = 0;
        cc.spriteFrameCache.addSpriteFrames("res/GameCo/CoTuong/checkKillEffect/a.plist");
        cc.spriteFrameCache.addSpriteFrames("res/GameCo/CoTuong/killEffect/kill.plist");
        cc.spriteFrameCache.addSpriteFrames("res/GameCo/CoUp/latquanden.plist");
        cc.spriteFrameCache.addSpriteFrames("res/GameCo/CoUp/latquando.plist");
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

        this.btnBack = new ccui.Button("res/GameCo/Caro/back.png");
        this.btnBack.setPosition(95, 666);
        this.addChild(this.btnBack);
        this.btnBack.addTouchEventListener(this.onBackClick, this);

        this.reqDraw = new ccui.Button("res/GameCo/CoTuong/reqDraw.png");
        this.addChild(this.reqDraw);
        this.reqDraw.setPosition(1068, 666);
        this.reqDraw.addTouchEventListener(this.onReqDraw, this);
        this.reqDraw.setVisible(false);

        this.reqLose = new ccui.Button("res/GameCo/CoTuong/reqLose.png");
        this.addChild(this.reqLose);
        this.reqLose.setPosition(1175, 666);
        this.reqLose.addTouchEventListener(this.onReqLose, this);
        this.reqLose.setVisible(false);

        this.playerList = [];
        var player1 = new CoUp.PlayerDisplay(0, this);
        player1.setPosition(172, 474);
        this.addChild(player1);
        player1.removePlayer();

        var player2 = new CoUp.PlayerDisplay(1, this);
        this.addChild(player2);
        player2.setPosition(1116, 474);
        player2.removePlayer();
        this.playerList.push(player1);
        this.playerList.push(player2);

        var infoNode = new cc.Node();
        var bgInfo = new cc.Sprite("res/GameCo/CoTuong/bg_info.png");
        infoNode.addChild(bgInfo);

        this.lblTableName = new cc.LabelTTF("tenban", fontArialB.fontName, 20);
        infoNode.addChild(this.lblTableName);
        this.lblTableName.setPosition(0, 25);
        this.lblTableName.setColor({r: 107, g: 60, b: 3});

        if (CoUp.gameLogic.moneyType == MONEY_VIN) {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipVin.png");
        } else {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipXu.png");
        }
        infoNode.addChild(this.chip);
        this.chip.setPosition(-65 + this.chip.width / 2, -9);

        this.lblMoney = new cc.LabelTTF("1.000.000", fontArialB.fontName, 22);
        infoNode.addChild(this.lblMoney);
        this.lblMoney.setPosition(14, -9);
        this.lblMoney.enableStroke({r: 0, g: 0, b: 0}, 1.5);

        this.addChild(infoNode);
        infoNode.setPosition(210, 665);

        var bg1 = new cc.Sprite("res/GameCo/CoTuong/bgViewer.png");
        this.addChild(bg1);
        bg1.setPosition(164, 160);

        this.tableView = new cc.TableView(this, cc.size(330, 190));
        this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.tableView.x = 0;
        this.tableView.y = 65;
        this.tableView.setDelegate(this);
        this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.tableView);

        var bg2 = new cc.Sprite("res/GameCo/CoTuong/bgChat.png");
        this.addChild(bg2);
        bg2.setPosition(1116, 160);

        this.chatView = new ccui.ListView();
        this.chatView.setContentSize(300, 225);
        this.chatView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.chatView.setTouchEnabled(true);
        this.chatView.setBounceEnabled(false);
        this.chatView.setPosition(967, 80);
        this.addChild(this.chatView);

        var tableBg = new cc.Sprite("res/GameCo/CoTuong/table.png");
        this.addChild(tableBg);
        tableBg.setPosition(640, 357);

        this.table = new cc.Sprite("res/GameCo/CoTuong/table_inside.png");
        this.addChild(this.table);
        this.table.setPosition(tableBg.getPosition());

        this.invalidMoveSpr = new cc.Sprite("res/GameCo/CoTuong/x.png");
        this.table.addChild(this.invalidMoveSpr);
        this.invalidMoveSpr.setVisible(false);

        this.justMovedEffect = new cc.Sprite("res/GameCo/CoTuong/justMove.png");
        this.table.addChild(this.justMovedEffect);
        this.justMovedEffect.runAction(cc.repeatForever(cc.rotateBy(2, -360)));
        this.justMovedEffect.setVisible(false);
        this.justMovedEffect.setLocalZOrder(999);

        this.selected = new cc.Sprite("res/GameCo/CoTuong/selected.png");
        this.table.addChild(this.selected);
        this.selected.setVisible(false);

        this.btnChat = new ccui.Button("res/GameCo/CoTuong/chat.png");
        this.addChild(this.btnChat);
        this.btnChat.setPosition(983, 42);
        this.btnChat.addTouchEventListener(this.onChatClick, this);
        this.btnChat.setTouchEnabled(false);
        this.btnChat.setColor(cc.color.GRAY);

        this.editBox = new cc.EditBox(cc.size(206, 29), new cc.Scale9Sprite("res/GameCo/CoTuong/chatBox.png"));
        this.editBox.setPosition(1115, 47);
        this.editBox.setPlaceHolder("Nhập nội dung...");
        this.editBox.setFontColor(cc.color(0, 0, 0));
        this.editBox.setDelegate(this);
        this.addChild(this.editBox);

        var btnHelp = new ccui.Button("res/GameCo/CoTuong/Help.png");
        this.addChild(btnHelp);
        btnHelp.setPosition(85, 30);
        btnHelp.addTouchEventListener(this.onHelpClick, this);

        this.btnSound = new ccui.Button("res/GameCo/CoTuong/sound_on.png");
        this.btnSound.setPosition(178, 30);
        this.addChild(this.btnSound);
        this.btnSound.addTouchEventListener(this.onSoundClick, this);

        this.btnNoSound = new ccui.Button("res/GameCo/CoTuong/sound_off.png");
        this.btnNoSound.setPosition(180, 30);
        this.addChild(this.btnNoSound);
        this.btnNoSound.addTouchEventListener(this.onSoundClick, this);
        this.isMute = false;

        this.btnMusic = new ccui.Button("res/GameCo/CoTuong/music_on.png");
        this.btnMusic.setPosition(258, 30);
        this.addChild(this.btnMusic);
        this.btnMusic.addTouchEventListener(this.onMusicClick, this);

        this.btnNoMusic = new ccui.Button("res/GameCo/CoTuong/music_off.png");
        this.btnNoMusic.setPosition(258, 30);
        this.addChild(this.btnNoMusic);
        this.btnNoMusic.addTouchEventListener(this.onMusicClick, this);
        this.isMusic = true;
        this.updateSound();
        this.updateMusic();

        var btnSend = new ccui.Button("res/GameCo/CoTuong/send.png");
        this.addChild(btnSend);
        btnSend.setPosition(1249, 47);
        btnSend.addTouchEventListener(this.onSendChatClick, this);

        this.nodeStart = [];
        var nodeLeft = new CoUp.NodeStart(0);
        this.addChild(nodeLeft);
        nodeLeft.setPosition(-nodeLeft.bg.getContentSize().width / 2 - cc.winSize.width, 493);
        this.posLeft = nodeLeft.getPosition();

        this.nodeStart.push(nodeLeft);
        var nodeRight = new CoUp.NodeStart(1);
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
        this.wait.setPosition(size.width / 2, size.height * 0.65);
        var lblWait = new cc.LabelTTF("Vui lòng chờ người khác vào chơi", fontArialB.fontName, 25);
        this.wait.addChild(lblWait);
        this.wait.setContentSize(lblWait.getContentSize().width + 20, lblWait.getContentSize().height + 20);
        lblWait.setPosition(this.wait.getContentSize().width / 2, this.wait.getContentSize().height / 2);

        this.sprXem = new cc.Scale9Sprite("res/common/9patch.png");
        this.addChild(this.sprXem);
        var lblXem = new cc.LabelTTF("Đang xem", fontArialB.fontName, 25);
        this.sprXem.addChild(lblXem);
        this.sprXem.setContentSize(lblXem.width + 20, lblXem.height + 20);
        lblXem.setPosition(this.sprXem.width / 2, this.sprXem.height / 2);
        this.sprXem.setPosition(1115, 656);

        this.btnShowQuanAn = [];
        var btnQuanAn1 = new ccui.Button("res/GameCo/CoUp/tamgiac.png");
        this.addChild(btnQuanAn1);
        btnQuanAn1.x = 0;
        btnQuanAn1.y = size.height / 2;
        btnQuanAn1.setAnchorPoint(0, 0.5);
        btnQuanAn1.setTag(0);
        this.btnShowQuanAn.push(btnQuanAn1);
        btnQuanAn1.addTouchEventListener(this.showQuanAn, this);
        btnQuanAn1.setVisible(false);

        var btnQuanAn2 = new ccui.Button("res/GameCo/CoUp/tamgiac.png");
        btnQuanAn2.setRotation(180);
        this.addChild(btnQuanAn2);
        btnQuanAn2.x = size.width;
        btnQuanAn2.y = size.height / 2;
        btnQuanAn2.setAnchorPoint(0, 0.5);
        btnQuanAn2.setTag(1);
        this.btnShowQuanAn.push(btnQuanAn2);
        btnQuanAn2.addTouchEventListener(this.showQuanAn, this);
        btnQuanAn2.setVisible(false);

        this.tableQuanAn = [];
        var tableQuanAn1 = new CoUp.DanhSachQuanAn(0);
        this.addChild(tableQuanAn1);
        tableQuanAn1.x = 167;
        tableQuanAn1.y = btnQuanAn1.y;
        tableQuanAn1.setAnchorPoint(0, 0.5);
        tableQuanAn1.setVisible(false);
        this.tableQuanAn.push(tableQuanAn1);

        var tableQuanAn2 = new CoUp.DanhSachQuanAn(1);
        this.addChild(tableQuanAn2);
        tableQuanAn2.x = size.width - 167;
        tableQuanAn2.y = btnQuanAn2.y;
        tableQuanAn2.setAnchorPoint(1, 0.5);
        tableQuanAn2.setVisible(false);
        this.tableQuanAn.push(tableQuanAn2);

        var that = this;
        var listener = cc.EventListener.create({
            touchedPiece: null,
            moveToPos: null,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                cc.log(CoUp.gameLogic.isMyTurn());
                cc.log(that.isMarked);
                if (!CoUp.gameLogic.isMyTurn() || that.isMarked)
                    return false;
                var point = touch.getLocation();
                point = that.table.convertToNodeSpace(point);
                for (var i = 0; i < that.pieces.length; i++) {
                    if (!that.pieces[i].isVisible() || that.pieces[i].owner != CoUp.gameLogic.myChessColor)
                        continue;
                    if (cc.rectContainsPoint(that.pieces[i].getBoundingBox(), point)) {
                        if (this.touchedPiece == null || CoUp.gameLogic.myChessColor == that.pieces[i].owner) {
                            that.invalidMoveSpr.setVisible(false);
                            cc.log("touched a piece");
                            this.touchedPiece = that.pieces[i];
                            this.moveToPos = null;
                            if (!that.isMute)
                                cc.audioEngine.playEffect(CoUp.sound.pickup, false);
                            return true;
                        } else {
                            break;
                        }
                    }
                }
                if (this.touchedPiece == null)
                    return false;
                this.moveToPos = CoUp.convertPointToPos(point);
                return !(this.moveToPos.x < 0 || this.moveToPos.x >= CoUp.BoardRow || this.moveToPos.y < 0 || this.moveToPos.y >= CoUp.BoardCol);
            },

            onTouchMoved: function(touch, event) {
            },

            onTouchEnded: function(touch, event) {
                var point = touch.getLocation();
                point = that.table.convertToNodeSpace(point);
                if (this.moveToPos != null) {
                    var pos = CoUp.convertPointToPos(point);
                    if (pos.x != this.moveToPos.x || pos.y != this.moveToPos.y)
                        return;
                    cc.log("move to " + this.moveToPos.x + " " + this.moveToPos.y);
                    //if (that.isInListMove(this.moveToPos)) {
                        // send to server then mark isMarked = false
                        that.isMark = true;
                        that.sendMoveToServer(this.touchedPiece.piece.x, this.touchedPiece.piece.y, this.moveToPos.x, this.moveToPos.y);
                        that.removeAllSuggestion();
                        this.touchedPiece = null;
                    //}
                    return;
                }
                for (var i = 0; i < that.pieces.length; i++) {
                    if (!that.pieces[i].isVisible() || that.pieces[i].owner != CoUp.gameLogic.myChessColor)
                        continue;
                    if (cc.rectContainsPoint(that.pieces[i].getBoundingBox(), point)) {
                        if (this.touchedPiece == that.pieces[i]) {
                            that.selected.setVisible(true);
                            that.selected.setPosition(this.touchedPiece.getPosition());
                            var listMove = this.touchedPiece.piece.getListMove();
                            that.listMove = listMove;
                            that.showSuggest(listMove);
                        }
                    }
                }
            }
        });
        cc.eventManager.addListener(listener, this);

        this.initPiece();
    },

    showQuanAn: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var index = sender.getTag();
            this.tableQuanAn[index].setVisible(true);
        }
    },

    showKhieuChien: function(nickName, money) {
        if (this.popupKhieuChien) {
            this.popupKhieuChien.removeFromParent();
        }
        this.popupKhieuChien = new CoUp.Popup(this);
        this.popupKhieuChien.showKhieuChien(nickName, money);
    },

    showKhieuChienTableView: function(nickName, money) {
        if (!this.khieuChienView) {
            this.khieuChienView = new CoUp.KhieuChien(this);
            this.addChild(this.khieuChienView);
            this.khieuChienView.setPosition(166, 190);
        }
        var data;
        var isVin;
        var currentMoney;
        if (CoUp.gameLogic.moneyType == MONEY_VIN) {
            data = gameData.configGameCoVin;
            isVin = true;
            currentMoney = lobby.userInfo.vinTotal;
        } else {
            data = gameData.configGameCoXu;
            isVin = false;
            currentMoney = lobby.userInfo.xuTotal;
        }
        this.khieuChienView.updateInfo(nickName, data, isVin, currentMoney, money);
    },

    showCauHoaConfirm: function() {
        if (this.popupCauHoaConfirm) {
            this.popupCauHoaConfirm.removeFromParent();
        }
        this.popupCauHoaConfirm = new CoUp.Popup(this);
        this.popupCauHoaConfirm.showCauHoaConfirm();
    },

    showKhieuChienConfirm: function(data) {
        if (this.popupKhieuChienConfirm) {
            this.popupKhieuChienConfirm.removeFromParent();
        }
        this.popupKhieuChienConfirm = new CoUp.Popup(this);
        this.popupKhieuChienConfirm.showKhieuChienConfirm(data.nickName, data.moneyBet);
    },

    showCauHoaDenied: function(error) {
        if (this.popupCauHoaDenied) {
            this.popupCauHoaDenied.removeFromParent();
        }
        this.popupCauHoaDenied = new CoUp.Popup(this);
        this.popupCauHoaDenied.showCauHoaDenied(error);
    },

    showKhieuChienDenied: function(error) {
        if (this.popupKhieuChienDenied) {
            this.popupKhieuChienDenied.removeFromParent();
        }
        this.popupKhieuChienDenied = new CoUp.Popup(this);
        this.popupKhieuChienDenied.showKhieuChienDenied(error);
    },

    showXinThuaDenied: function(error) {
        if (this.popupXinThuaDenied) {
            this.popupXinThuaDenied.removeFromParent();
        }
        this.popupXinThuaDenied = new CoUp.Popup(this);
        this.popupXinThuaDenied.showXinThuaDenied(error);
    },

    createCheckKillAnimation: function() {
        var animFrames = [];
        for (var i = 0; i < 25; i++) {
            var str = "GameCo/checkKillEffect/e" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(frame, 1, null);
            animFrames.push(animFrame);
        }
        var spr = new cc.Sprite("#GameCo/checkKillEffect/e0.png");
        var animation = new cc.Animation(animFrames, 0.05, 100);
        var animate = new cc.Animate(animation);
        spr.runAction(animate);
        return spr;
    },

    createKillAnimation: function() {
        var animFrames = [];
        for (var i = 0; i < 25; i++) {
            var str = "GameCo/kill/ke" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(frame, 1, null);
            animFrames.push(animFrame);
        }
        var spr = new cc.Sprite("#GameCo/kill/ke0.png");
        var animation = new cc.Animation(animFrames, 0.04, 1);
        var animate = new cc.Animate(animation);
        spr.runAction(cc.sequence(animate, cc.delayTime(1), cc.removeSelf()));
        return spr;
    },

    sendMoveToServer: function(sx, sy, dx, dy) {
        var cmd = new CoUp.CmdSendTakeTurn();
        var startPos = CoUp.gameLogic.convertToServerPos(sx, sy);
        var destPos = CoUp.gameLogic.convertToServerPos(dx, dy);
        cmd.putData(startPos.x, startPos.y, destPos.x, destPos.y);
        gameWsClient.send(cmd);
        cmd.clean();
    },

    isInListMove: function(move) {
        for (var i in this.listMove) {
            if (move.x == this.listMove[i].x && move.y == this.listMove[i].y)
                return true;
        }
        return false;
    },

    invalidMove: function(dx, dy) {
        this.invalidMoveSpr.setVisible(true);
        this.invalidMoveSpr.setPosition(CoUp.getPosInMap(dx, dy));
    },

    removeAllSuggestion: function() {
        for (var i in this.suggestSpr) {
            this.suggestSpr[i].removeFromParent();
        }
        for (var i in this.ckEffect) {
            this.ckEffect[i].removeFromParent();
        }
        this.suggestSpr = [];
        this.ckEffect = [];
    },

    showSuggest: function(listMove) {
        this.removeAllSuggestion();
        for (var i = 0; i < listMove.length; i++) {
            var x = listMove[i].x;
            var y = listMove[i].y;
            var piece = this.getPieceAtPos(x, y);
            if (piece) {
                var spr = this.createCheckKillAnimation();
                this.table.addChild(spr);
                this.ckEffect.push(spr);
                spr.setPosition(CoUp.getPosInMap(x, y));
            } else {
                var spr = new cc.Sprite("res/GameCo/CoTuong/suggest.png");
                this.table.addChild(spr);
                this.suggestSpr.push(spr);
                spr.setPosition(CoUp.getPosInMap(x, y));
            }
        }
    },

    getPieceAtPos: function(x, y) {
        var pieceLogic = CoUp.gameLogic.board[x][y].piece;
        if (pieceLogic == null)
            return null;
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isVisible() && this.pieces[i].name == pieceLogic.name)
                return this.pieces[i];
        }
        return null;
    },

    movePiece: function(sx, sy, dx, dy, isTrans) {
        var sPiece = this.getPieceDisplayByPieceData(CoUp.gameLogic.movedPiece);
        var dPiece = this.getPieceDisplayByPieceData(CoUp.gameLogic.killedPiece);
        cc.log("Move Piece: " + sPiece.name);
        cc.log(dPiece);
        if (dPiece) {
            dPiece.removePiece();
            if (!this.isMute)
                cc.audioEngine.playEffect(CoUp.sound.killPiece, false);
            var spr = this.createKillAnimation();
            this.table.addChild(spr);
            spr.setPosition(dPiece.getPosition());
        }
        sPiece.moveToPos(dx, dy, isTrans);
        this.justMovedEffect.setVisible(false);
        this.justMovedEffect.stopAllActions();
        this.justMovedEffect.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(this.showJustMovedEffect.bind(this, dx, dy), this)));

        var attacker = sPiece.owner;
        var defender = "r";
        if (attacker == "r")
            defender = "b";
        var index;
        var pos;
        if (CoUp.gameLogic.mePlaying) {
            if (defender == CoUp.gameLogic.myChessColor) {
                index = 0;
                pos = this.getPieceByName(defender + "g0").getPosition();
                pos.y += 150;
            } else {
                pos = this.getPieceByName(defender + "g0").getPosition();
                pos.y -= 150;
                index = 1;
            }
        } else {
            if (defender == "b") {
                index = 0;
                pos = this.getPieceByName("bg0").getPosition();
                pos.y += 150;
            } else {
                pos = this.getPieceByName("rg0").getPosition();
                pos.y -= 150;
                index = 1;
            }
        }

        if (CoUp.gameLogic.checkEndGame(CoUp.gameLogic.board, attacker, defender)) {
            pos = this.table.convertToWorldSpace(pos);
            pos = this.effect2D.convertToNodeSpace(pos);
            this.effect2D.showChieuTuong(index, pos);
            if (!this.isMute)
                cc.audioEngine.playEffect(CoUp.sound.chieutuong, false);
        }
    },

    getPieceDisplayByPieceData: function(piece) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].isVisible() && this.pieces[i].piece == piece)
                return this.pieces[i];
        }
        return null;
    },

    showJustMovedEffect: function(dx, dy) {
        cc.log("show just move effect");
        this.justMovedEffect.setVisible(true);
        this.justMovedEffect.runAction(cc.repeatForever(cc.rotateBy(2, -360)));
        this.justMovedEffect.setPosition(CoUp.getPosInMap(dx, dy));
    },

    initPiece: function() {
        this.pieces = [];
        for (var i = 0; i < CoUp.startPiece.length; i++) {
            var piece = new CoUp.PieceDisplay(CoUp.startPiece[i]);
            this.table.addChild(piece);
            this.pieces.push(piece);
            piece.setVisible(false);
        }
    },

    updatePiece: function() {
        for (var i = 0; i < CoUp.gameLogic.pieces.length; i++) {
            this.pieces[i].setPieceData(CoUp.gameLogic.pieces[i]);
            this.pieces[i].setVisible(true);
        }
    },

    getPieceByName: function(name) {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].name == name) {
                return this.pieces[i];
            }
        }
        return null;
    },

    onHelpClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            var s = GameManager.getInstance().getHotroLink(GameList.CoUp);
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

    onMusicClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.isMusic = !this.isMusic;
            this.updateMusic();
        }
    },

    updateSound: function() {
        this.btnSound.setVisible(!this.isMute);
        this.btnNoSound.setVisible(this.isMute);
    },

    updateMusic: function() {
        this.btnMusic.setVisible(this.isMusic);
        this.btnNoMusic.setVisible(!this.isMusic);
        if (this.isMusic && CoUp.gameLogic.isPlaying) {
            this.musicId = cc.audioEngine.playMusic(CoUp.sound.bg, true);
        } else {
            cc.audioEngine.stopMusic(this.musicId);
        }
    },

    onChatClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (!this.chatLayer){
                this.chatLayer = new ChatLayer(this);
                this.chatLayer.setVisible(false);
                this.addChild(this.chatLayer, 999);
            }
            this.chatLayer.setVisible(!this.chatLayer.isVisible());
            this.chatLayer.touchListener.setEnabled(this.chatLayer.isVisible());
        }
    },

    onSendChatClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.editBoxReturn(this.editBox);
        }
    },

    onReqDraw: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (CoUp.gameLogic.mePlaying) {
                if (this.popupCauHoa) {
                    this.popupCauHoa.removeFromParent();
                }
                this.popupCauHoa = new CoUp.Popup(this);
                this.popupCauHoa.showCauHoaSendConfirm();
            }
        }
    },

    onReqLose: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            if (CoUp.gameLogic.mePlaying) {
                if (this.popupXinThua) {
                    this.popupXinThua.removeFromParent();
                }
                this.popupXinThua = new CoUp.Popup(this);
                this.popupXinThua.showXinThuaSendConfirm();
            }
        }
    },

    resetData: function() {
        this.effect2D.hideEffect();
        this.resetBoard();
        this.isMarked = false;
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].reset();
        }
        this.justMovedEffect.stopAllActions();
        this.justMovedEffect.setVisible(false);
    },

    resetBoard: function() {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].reset();
        }
    },

    addAutoStart: function(time) {
        cc.log("addAutoStart");
        this.stopAutoStart();
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        this.after = new cc.Sprite(CoUp.res.afterTime);

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
        return CoUp.res.startNumPngPath + num + ".png";
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
            var pk = new CoUp.CmdSendRequestLeaveGame();
            pk.putData();
            gameWsClient.send(pk);
            pk.clean();
        }
    },

    removeInGamePopup: function() {
        if (this.popupCauHoa) {
            this.popupCauHoa.removeFromParent();
            this.popupCauHoa = null;
        }
        if (this.popupCauHoaConfirm) {
            this.popupCauHoaConfirm.removeFromParent();
            this.popupCauHoaConfirm = null;
        }
        if (this.popupCauHoaDenied) {
            this.popupCauHoaDenied.removeFromParent();
            this.popupCauHoaDenied = null;
        }
        if (this.popupXinThua) {
            this.popupXinThua.removeFromParent();
            this.popupXinThua = null;
        }
        if (this.popupXinThuaDenied) {
            this.popupXinThuaDenied.removeFromParent();
            this.popupXinThuaDenied = null;
        }
    },

    removeOutGamePopup: function() {
        if (this.popupKhieuChien) {
            this.popupKhieuChien.removeFromParent();
            this.popupKhieuChien = null;
        }
        if (this.popupKhieuChienConfirm) {
            this.popupKhieuChienConfirm.removeFromParent();
            this.popupKhieuChienConfirm = null;
        }
        if (this.popupKhieuChienDenied) {
            this.popupKhieuChienDenied.removeFromParent();
            this.popupKhieuChienDenied = null;
        }
    },

    showStartGame: function() {
        this.removeOutGamePopup();
        this.updateMusic();
        var spr = new cc.Scale9Sprite("res/common/9patch.png");
        this.addChild(spr);
        var size = GameScene.getMainContentSize();
        spr.setPosition(size.width / 2, size.height / 2);
        var lbl = new cc.LabelTTF("Quân đen đi trước", fontArialB.fontName, 25);
        spr.addChild(lbl);
        spr.setContentSize(lbl.width + 20, lbl.height + 20);
        lbl.setPosition(spr.width / 2, spr.height / 2);
        spr.setOpacity(0);
        spr.runAction(cc.sequence(cc.delayTime(1.6), cc.fadeIn(0.3), cc.delayTime(3), cc.removeSelf()));

        if (CoUp.gameLogic.mePlaying) {
            this.reqDraw.setVisible(true);
            this.reqLose.setVisible(true);
        }
        for (var i = 0; i < this.playerList.length; i++)
            this.playerList[i].hideBtnStandUp();
        this.stopAutoStart();
        this.vs.stopAllActions();
        this.vs.setScale(0);
        this.vs.runAction(cc.sequence(cc.scaleTo(0.3, 1), cc.delayTime(1), cc.scaleTo(0.3, 0)));
        for (var i = 0; i < 2; i++) {
            var player = CoUp.gameLogic.getPlayerByGameChair(i);
            if (player.status != 0) {
                this.nodeStart[i].initData(player);
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
            cc.audioEngine.playEffect(CoUp.sound.start, false);
        if (CoUp.gameLogic.mePlaying) {
            this.btnShowQuanAn[CoUp.gameLogic.myGameChair].setVisible(true);
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

    onUpdateGui: function(data) {
        var i;
        var numPlayer = 0;
        for (i = 0; i < CoUp.gameLogic.players.length; i++) {
            if (CoUp.gameLogic.players[i].status >= 2) {
                this.playerList[CoUp.gameLogic.players[i].info.gameChair].updateWithPlayer(CoUp.gameLogic.players[i]);
                numPlayer++;
            }
        }
        if (numPlayer >= 2 || !CoUp.gameLogic.mePlaying) {
            this.wait.setVisible(false);
        } else {
            this.wait.setVisible(true);
        }

        if (CoUp.gameLogic.isPlaying) {
            if (CoUp.gameLogic.mePlaying) {
                this.sprXem.setVisible(false);
            } else {
                this.sprXem.setVisible(true);
            }
        } else {
            this.sprXem.setVisible(false);
        }

        switch (CoUp.gameLogic.gameState) {
            case CoUp.GameState.JOIN_ROOM: {
                cc.log("CoUp join room");
                if(data.moneyType == MONEY_VIN){
                    this.btn_moichoi = new ButtonMoiChoi();
                    this.addChild(this.btn_moichoi);
                }
                this.lblTableName.setString("Bàn " + CoUp.gameLogic.roomId);
                if (CoUp.gameLogic.bet >= 100000) {
                    this.lblMoney.setString(StringUtility.rutGonNumBer(CoUp.gameLogic.bet));
                } else {
                    this.lblMoney.setString(StringUtility.standartNumber(CoUp.gameLogic.bet));
                }
                this.reloadViewer();
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.DANG_KI_GAME:
            {
                cc.log("dang ki game");
                this.reloadViewer();
                this.btnChat.setTouchEnabled(CoUp.gameLogic.players[CoUp.gameLogic.myChair].status >= 2);
                this.btnChat.setColor(cc.color.WHITE);
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.HUY_DANG_KI_GAME:
            {
                cc.log("huy dang ki game");
                for (var i = 0; i < this.playerList.length; i++) {
                    this.playerList[i].checkStandUp();
                }
                this.reloadViewer();
                this.btnChat.setTouchEnabled(CoUp.gameLogic.players[CoUp.gameLogic.myChair].status >= 2);
                this.btnChat.setColor(cc.color.GRAY);
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.AUTO_START:
            {
                cc.log("CoUpScene autostart");
                if(data && (data.isAutoStart) && (data.timeAutoStart > 0))
                    this.addAutoStart(CoUp.gameLogic.timeAutoStart);

                if(data && (!data.isAutoStart))
                {
                    this.stopAutoStart();
                }

                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.USER_JOIN:{
                //this.playerList[CoUp.gameLogic.activeLocalChair].hideEndGame();
                //this.playerList[CoUp.gameLogic.activeLocalChair].updateWithPlayer(CoUp.gameLogic.players[CoUp.gameLogic.activeLocalChair]);
                this.reloadViewer();
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.USER_LEAVE:{
                cc.log("vao CoUpScene userleave");
                //this.playerList[CoUp.gameLogic.activeLocalChair].updateWithPlayer(CoUp.gameLogic.players[CoUp.gameLogic.activeLocalChair]);
                if(CoUp.gameLogic.activeLocalChair == CoUp.gameLogic.myChair){
                    cc.audioEngine.stopMusic(this.musicId);
                    userGameData.setItem("inRoom", "false");
                    this.setVisible(false);
                    GameManager.getInstance().backToSelectRoom();
                    return;
                }
                for (var i = 0; i < this.playerList.length; i++) {
                    this.playerList[i].checkStandUp();
                }
                this.reloadViewer();
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.START_GAME:
            {
                this.showStartGame();
                this.updatePiece();
                for (var i = 0; i < 2; i++) {
                    this.playerList[i].updateStartInfo();
                }
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.TAKE_TURN:
            {
                this.removeAllSuggestion();
                this.selected.setVisible(false);
                this.invalidMoveSpr.setVisible(false);
                if (data.isTrans) {
                    var pieceDisplay = this.getPieceDisplayByPieceData(CoUp.gameLogic.movedPiece);
                    CoUp.gameLogic.movedPiece = CoUp.gameLogic.board[data.dx][data.dy].piece;
                    pieceDisplay.changePieceData(CoUp.gameLogic.movedPiece);
                }
                this.movePiece(data.sx, data.sy, data.dx, data.dy, data.isTrans);
                if (!this.isMute)
                    cc.audioEngine.playEffect(CoUp.sound.place, false);
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.CHANGE_TURN:
            {
                for (var i = 0; i < 2; i++)
                    this.playerList[i].stopTurn();
                cc.log("Change turn to " + CoUp.gameLogic.currentPlayer);
                cc.log("count down tume: " + CoUp.gameLogic.countDownTime);
                cc.log("game time: " + CoUp.gameLogic.gameTime);
                this.playerList[CoUp.gameLogic.currentPlayer].startTurn(CoUp.gameLogic.countDownTime, CoUp.gameLogic.gameTime);
                if (CoUp.gameLogic.isMyTurn()) {
                    this.isMarked = false;
                }
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.END_GAME:
            {
                this.updateMusic();
                cc.log("ket thuc game roi");
                for (var i = 0; i < 2; i++)
                    this.playerList[i].stopTurn();
                this.removeInGamePopup();

                this.removeAllSuggestion();
                this.selected.setVisible(false);
                this.invalidMoveSpr.setVisible(false);
                this.reqDraw.setVisible(false);
                this.reqLose.setVisible(false);

                var playerWin = CoUp.gameLogic.getPlayerByGameChair(data.winner);
                if (CoUp.gameLogic.mePlaying) {
                    if (data.result == CoUp.Result.WIN_LOSE || data.result == CoUp.Result.TIME_OUT || data.result == CoUp.Result.RESIGN) {
                        if (playerWin.info.chair != CoUp.gameLogic.myChair) {
                            if (data.result == CoUp.Result.TIME_OUT) {
                                GameToast.makeToast(5, "Bạn đã hết thời gian chơi", this.effect2D);
                            }
                            this.effect2D.showLoseEffect();
                        } else {
                            if (data.result == CoUp.Result.TIME_OUT) {
                                GameToast.makeToast(5, "Đối phương đã hết thời gian chơi", this.effect2D);
                            } else if (data.result == CoUp.Result.RESIGN) {
                                GameToast.makeToast(5, "Đối phương đã đầu hàng", this.effect2D);
                            }
                            this.effect2D.showWinEffect();
                        }
                    } else {
                        this.effect2D.showDrawEffect();
                    }
                } else {
                    if (data.result == CoUp.Result.WIN_LOSE || data.result == CoUp.Result.TIME_OUT) {
                        GameToast.makeToast(5, playerWin.info.nickName + " đã chiến thắng", this.effect2D);
                    } else if (data.result == CoUp.Result.DRAW) {
                        GameToast.makeToast(5, "Cờ hòa", this.effect2D);
                    } else if (data.result == CoUp.Result.RESIGN) {
                        var playerLose = CoUp.gameLogic.getPlayerByGameChair(1 - data.winner);
                        GameToast.makeToast(5, playerLose.info.nickName + " đã đầu hàng", this.effect2D);
                        break;
                    }
                }
                this.addTienCuoiVan();
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.UPDATE_MATCH:
            {
                this.resetData();
                for (var i = 0; i < 2; i++) {
                    this.playerList[i].reset();
                }
                this.reloadViewer();
                this.btnShowQuanAn[0].setVisible(false);
                this.btnShowQuanAn[1].setVisible(false);
                this.tableQuanAn[0].reset();
                this.tableQuanAn[1].reset();
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.NOTIFYOUTROOM:
            {
                this.playerList[data.outChair].iconOutRoom.setVisible(data.isOutRoom);
                if (data.outChair == CoUp.gameLogic.myChair){
                    var stringNotify;
                    if(data.isOutRoom){
                        stringNotify = "Bạn đã đăng ký rời phòng thành công."
                    }else{
                        stringNotify = "Bạn đã hủy đăng ký rời phòng."
                    }
                    GameToast.makeToast(2, stringNotify, this.effect2D);
                }
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.THONG_TIN_VAN_CHOI:
            {
                this.updatePiece();
                for (var i = 0; i < 2; i++) {
                    this.playerList[i].updateStartInfo();
                    if (i == CoUp.gameLogic.currentPlayer) {
                        this.playerList[i].startTurn(CoUp.gameLogic.countDownTime, this.playerList[i].player.gameTime);
                    }
                }
                this.updateMusic();
                if (data.lastX != -1 && data.lastY != -1) {
                    var pos = CoUp.gameLogic.convertToServerPos(data.lastX, data.lastY);
                    this.showJustMovedEffect(pos.x, pos.y);
                }
                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }

            case CoUp.GameState.RECONNECT:
            {
                cc.log("CoUp join room");
                this.lblTableName.setString("Bàn " + CoUp.gameLogic.roomId);
                if (CoUp.gameLogic.bet >= 100000) {
                    this.lblMoney.setString(StringUtility.rutGonNumBer(CoUp.gameLogic.bet));
                } else {
                    this.lblMoney.setString(StringUtility.standartNumber(CoUp.gameLogic.bet));
                }
                this.reloadViewer();

                this.btnChat.setTouchEnabled(CoUp.gameLogic.players[CoUp.gameLogic.myChair].status >= 2);
                if (CoUp.gameLogic.mePlaying) {
                    this.reqDraw.setVisible(true);
                    this.reqLose.setVisible(true);
                    this.btnChat.setColor(cc.color.WHITE);
                } else {
                    this.reqDraw.setVisible(false);
                    this.reqLose.setVisible(false);
                    this.btnChat.setColor(cc.color.GRAY);
                }

                this.updatePiece();
                for (var i = 0; i < 2; i++) {
                    this.playerList[i].updateStartInfo();
                    if (i == CoUp.gameLogic.currentPlayer) {
                        this.playerList[i].startTurn(CoUp.gameLogic.countDownTime, this.playerList[i].player.gameTime);
                    }
                }
                this.updateMusic();
                if (data.lastX != -1 && data.lastY != -1) {
                    var pos = CoUp.gameLogic.convertToServerPos(data.lastX, data.lastY);
                    this.showJustMovedEffect(pos.x, pos.y);
                }

                if (CoUp.gameLogic.mePlaying) {
                    this.btnShowQuanAn[CoUp.gameLogic.myGameChair].setVisible(true);
                }
                for (var i = 0; i < data.danhSachQuanAn.length; i++) {
                    this.tableQuanAn[CoUp.gameLogic.myGameChair].addQuanAn(data.danhSachQuanAn[i]);
                }

                CoUp.gameLogic.gameState = CoUp.GameState.NONE;
                break;
            }
        }
    },

    addTienCuoiVan: function() {
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].addMoney(CoUp.gameLogic.getPlayerByGameChair(i).tongCuoiVan, 1);
        }
    },

    addQuanAn: function(pk) {
        this.tableQuanAn[CoUp.gameLogic.myGameChair].addQuanAn(pk.quanan);
    },

    updateChatRoom: function(pk) {
        if (!pk.isIcon) {
            this.showTextChat(pk.chair, pk.content);
        } else {
            var image = new cc.Sprite("res/common/chat/emotion_" + pk.content + ".png");
            var p = CoUp.gameLogic.players[pk.chair];
            if (p.info.gameChair != undefined && p.info.gameChair >= 0) {
                var localChair = p.info.gameChair;
                var player = this.playerList[localChair];
                var pos = player.avatar.convertToWorldSpaceAR(cc.p(0, 0));
                this.effect2D.updateChatRoom(localChair, pos, image);
            }
        }
    },

    showTextChat: function(chair, str) {
        if (CoUp.gameLogic.players[chair].status == 0)
            return;
        var playerName = CoUp.gameLogic.players[chair].info.nickName;
        var lblName = new cc.LabelTTF(playerName + ": ", fontArial.fontName, 20);
        lblName.setColor({r: 255, g: 192, b: 0});
        var lblTest = new cc.LabelTTF(" ", fontArial.fontName, 20);
        var l = lblName.width / lblTest.width;
        for (var i = 0; i < l + 1; i++) {
            str = " " + str;
        }
        var lblContent = new cc.LabelTTF(str, fontArial.fontName, 20, cc.size(300, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        var layout = new ccui.Layout();
        layout.height = lblContent.height;
        layout.width = lblContent.width;
        layout.addChild(lblName);
        layout.addChild(lblContent);
        lblName.setPosition(cc.p(lblName.width / 2, lblContent.height - lblName.height / 2));
        lblContent.setPosition(cc.p(lblContent.width / 2, lblContent.height / 2));
        this.chatView.pushBackCustomItem(layout);
        if (this.chatLogLength >= 10) {
            this.chatView.removeItem(0);
            this.chatView.refreshView();
        } else {
            this.chatLogLength++;
        }
        this.chatView.jumpToBottom();
    },

    tableCellTouched:function (table, cell) {
        //cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(330, 50);
    },

    tableCellAtIndex:function (table, idx) {
        var cell = table.dequeueCell();
        if (!cell) {
            cell = new CoUp.CustomTableViewCell();
        }
        cell.updatePlayerData(CoUp.gameLogic.viewers[idx]);
        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return CoUp.gameLogic.viewers.length;
    },

    reloadViewer: function() {
        CoUp.gameLogic.updateViewerList();
        cc.log("Reload Viewer");
        cc.log(CoUp.gameLogic.viewers.length);
        this.tableView.reloadData();
    },

    editBoxEditingDidBegin: function (editBox) {
    },

    editBoxEditingDidEnd: function (editBox) {
    },

    editBoxTextChanged: function (editBox, text) {
    },

    editBoxReturn: function (editBox) {
        var str = editBox.getString();
        if (str != "") {
            gameWsClient.sendChatRoom(false, str);
            editBox.setString("");
        }
    }
});

CoUp.CustomTableViewCell = cc.TableViewCell.extend({
    ctor: function() {
        this._super();
        var bg = new cc.Sprite("res/GameCo/CoTuong/viewerCell.png");
        this.addChild(bg);
        bg.setAnchorPoint(0, 0);

        var size = cc.size(330, 50);

        this.lblName = new cc.LabelTTF("", fontArial.fontName, 20);
        this.addChild(this.lblName);
        this.lblName.setPosition(size.width / 4, size.height / 2);
        this.lblName.setColor({r: 255, g: 192, b: 0});

        if (CoUp.gameLogic.moneyType == MONEY_VIN) {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipVin.png");
        } else {
            this.chip = new cc.Sprite("res/GameCo/Caro/chipXu.png");
        }
        this.chip.setScale(0.8);
        this.addChild(this.chip);
        this.chip.setPosition(size.width / 2 + this.chip.getContentSize().width / 2, size.height / 2);

        this.lblMoney = new cc.LabelTTF("", fontArial.fontName, 20);
        this.addChild(this.lblMoney);
        this.lblMoney.setAnchorPoint(0, 0.5);
        this.lblMoney.setPosition(this.chip.getPositionX() + this.chip.getContentSize().width / 2, size.height/2);

        this.btnThachDau = new ccui.Button("res/GameCo/CoTuong/kiem.png");
        this.addChild(this.btnThachDau);
        this.btnThachDau.setPosition(size.width * 0.9, size.height / 2);
        this.btnThachDau.addTouchEventListener(this.showKhieuChien, this);
    },

    updatePlayerData: function(playerData) {
        this.playerData = playerData;
        this.lblName.setString(this.playerData.info.nickName);
        this.lblMoney.setString(StringUtility.formatNumberSymbol(this.playerData.info.money));
        if (CoUp.gameLogic.players[CoUp.gameLogic.myChair].status > 1 || this.playerData.status > 1 || this.playerData.info.chair == CoUp.gameLogic.myChair) {
            this.btnThachDau.setTouchEnabled(false);
            this.btnThachDau.setColor({r: 150, g: 150, b: 150});
        } else {
            this.btnThachDau.setTouchEnabled(true);
            this.btnThachDau.setColor({r: 255, g: 255, b: 255});
        }
    },

    showKhieuChien: function() {
        SceneMgr.getInstance().getRunningScene().getMainLayer().showKhieuChienTableView(this.playerData.info.nickName, this.playerData.info.money);
    }
});