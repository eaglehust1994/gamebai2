/**
 * Created by vinplay on 2/4/17.
 */

CoUp.GameListener = CardGameListener.extend({
    ctor: function() {
        this._super();
    },

    onReceived: function(cmd, pkg) {
        if (cc.sys.isNative && useTCP) {
            var data = new engine.InPacket();
        }
        else {
            var data = new InPacket();
        }

        data.init(pkg);

        var cmdId = data.getCmdId();

        if (this.handleCmdCommon(cmdId, pkg)) {
            return;
        }

        switch (cmdId) {
            case CoUp.Cmd.JOIN_ROOM_SUCCESS:
            {
                cc.log("Received cmd joinRoom succeed");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;
                var cmd = new CoUp.ReceiveJoinRoomSucceed(pkg);
                CoUp.gameLogic = new CoUp.GameLogic();
                CoUp.gameLogic.joinRoom(cmd);
                cmd.clean();

                var gameLayer = gameScenePool.getCoUpGameScene();
                GameLobby.getInstance().setVisible(false);
                if(gameLobbyInstance.disableMoiChoi == true){
                    if(gameLobbyInstance.guiReceiveMoiChoi)
                        gameLobbyInstance.guiReceiveMoiChoi.hide();
                }
                if (menutab)
                    menutab.hideAllInfo();
                GameScene.replaceGameGui(gameLayer);
                GameScene.gameGui.onUpdateGui(cmd);
                GameLobby.getInstance().closeCreateRoom();
                break;
            }

            case CoUp.Cmd.DANG_KY_THOAT_PHONG:
            {
                cc.log("Received notify reqOutRoom");
                var pk = new CoUp.CmdReceiveNotifyRegOutRoom(pkg);
                CoUp.gameLogic.notifyOutRoom(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoUp.Cmd.LEAVE_GAME:
            {
                cc.log("Received user Leaved room");
                var pk = new CoUp.ReceiveUserLeaveRoom(pkg);
                CoUp.gameLogic.userLeave(pk);
                if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof CoUp.CoUpScene)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoUp.Cmd.NOTIFY_KICK_FROM_ROOM:
            {
                cc.log("Received user kick off");
                var pk = new CoUp.CmdReceivedKickOff(pkg);
                var reason = pk.reason;
                var s = "Không rõ lý do.";
                if (reason == 1) {
                    s = "Thiếu tiền";
                }
                popup.openPanel_Alert_Lobby(s);
                pk.clean();
                break;
            }

            case CoUp.Cmd.NEW_USER_JOIN:
            {
                cc.log("Received user join room");
                var pk = new CoUp.ReceiveUserJoinRoom(pkg);
                CoUp.gameLogic.userJoinRoom(pk);
                if (SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof CoUp.CoUpScene)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoUp.Cmd.DANG_KY_CHOI:
            {
                var pk = new CoUp.ReceivedSitting(pkg);
                if (pk.getError() == 0) {
                    cc.log("ngoi thanh cong");
                    if (pk.action == 1) {
                        cc.log("ngoi xuong");
                        CoUp.gameLogic.sitting(pk);
                    } else if (pk.action == 2) {
                        cc.log("dung day");
                        CoUp.gameLogic.standup(pk);
                    } else {
                        // dang ki huy
                    }
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                } else {
                    cc.log("fail cmnr");
                }
                break;
            }

            case CoUp.Cmd.TU_DONG_BAT_DAU:
            {
                cc.log("Received Auto Start");
                var pk = new CoUp.ReceiveAutoStart(pkg);
                CoUp.gameLogic.autoStart(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoUp.Cmd.START_GAME:
            {
                cc.log("Receive Start game");
                var pk = new CoUp.ReceivedStartGame(pkg);
                CoUp.gameLogic.startGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoUp.Cmd.TAKE_TURN:
            {
                cc.log("Take turn");
                var pk = new CoUp.CmdReceivedTakeTurn(pkg);
                var startPos = CoUp.gameLogic.convertToServerPos(pk.sx, pk.sy);
                var destPos = CoUp.gameLogic.convertToServerPos(pk.dx, pk.dy);
                pk.sx = startPos.x;
                pk.sy = startPos.y;
                pk.dx = destPos.x;
                pk.dy = destPos.y;
                cc.log(pk.key + " " + pk.die + " " + pk.sx + " " + pk.sy + " " + pk.dx + " " + pk.dy + " " + pk.isTrans + " " + pk.newPiece);
                cc.log(pk.result);
                if (pk.result <= 2) {
                    CoUp.gameLogic.takeTurn(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                } else {
                    SceneMgr.getInstance().getRunningScene().getMainLayer().invalidMove(pk.dx, pk.dy);
                }
                break;
            }

            case CoUp.Cmd.CHANGE_TURN:
            {
                cc.log("Change turn");
                var pk = new CoUp.CmdReceivedChangeTurn(pkg);
                cc.log(pk.currentPlayer);
                cc.log(pk.countDownTime);
                CoUp.gameLogic.changeTurn(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoUp.Cmd.KET_THUC:
            {
                cc.log("End game");
                var pk = new CoUp.CmdReceivedEndGame(pkg);
                CoUp.gameLogic.endGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoUp.Cmd.UPDATE_MATCH:
            {
                cc.log("update match");
                var pk = new CoUp.CmdReceivedUpdateMatch(pkg);
                CoUp.gameLogic.updateMatch(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoUp.Cmd.THONG_TIN_BAN_CHOI:
            {
                cc.log("thong tin van choi");
                cc.log(CoUp.gameLogic.players);
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;

                var pk = new CoUp.CmdReceivedRoomInfo(pkg);
                CoUp.gameLogic.updateState(CoUp.GameState.THONG_TIN_VAN_CHOI);
                CoUp.gameLogic.reconnect(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoUp.Cmd.RECONNECT:
            {
                cc.log("reconnect");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;

                CoUp.gameLogic = new CoUp.GameLogic();
                var pk = new CoUp.CmdReceivedReconnect(pkg);
                CoUp.gameLogic.updateState(CoUp.GameState.RECONNECT);
                CoUp.gameLogic.reconnect(pk);

                var gameLayer = gameScenePool.getCoUpGameScene();
                GameLobby.getInstance().setVisible(false);
                if (menutab)
                    menutab.hideAllInfo();
                GameScene.replaceGameGui(gameLayer);
                GameScene.gameGui.onUpdateGui(pk);
                break;
            }

            case CoUp.Cmd.CAU_HOA:
            {
                SceneMgr.getInstance().getRunningScene().getMainLayer().showCauHoaConfirm();
                break;
            }

            case CoUp.Cmd.THACH_DAU:
            {
                cc.log("nhan loi thach dau ");
                var pk = new CoUp.CmdReceivedKhieuChien(pkg);
                cc.log(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showKhieuChienConfirm(pk);
                break;
            }

            case CoUp.Cmd.KET_QUA_CAU_HOA:
            {
                var pk = new CoUp.CmdReceivedCauHoaResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showCauHoaDenied(pk.getError());
                break;
            }

            case CoUp.Cmd.KET_QUA_THACH_DAU:
            {
                var pk = new CoUp.CmdReceivedKhieuChienResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showKhieuChienDenied(pk.getError());
                break;
            }

            case CoUp.Cmd.KET_QUA_XIN_THUA:
            {
                var pk = new CoUp.CmdReceivedKhieuChienResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showXinThuaDenied(pk.getError());
                break;
            }

            case CoUp.Cmd.THONG_TIN_QUAN_AN:
            {
                cc.log("thong tin quan an");
                var pk = new CoUp.CmdThongTinQuanAn(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().addQuanAn(pk);
                break;
            }
        }
    }
});