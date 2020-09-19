/**
 * Created by vinplay on 2/4/17.
 */

CoTuong.GameListener = CardGameListener.extend({
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
            case CoTuong.Cmd.JOIN_ROOM_SUCCESS:
            {
                cc.log("Received cmd joinRoom succeed");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;
                var cmd = new CoTuong.ReceiveJoinRoomSucceed(pkg);
                CoTuong.gameLogic = new CoTuong.GameLogic();
                CoTuong.gameLogic.joinRoom(cmd);
                cmd.clean();

                var gameLayer = gameScenePool.getCoTuongGameScene();
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

            case CoTuong.Cmd.DANG_KY_THOAT_PHONG:
            {
                cc.log("Received notify reqOutRoom");
                var pk = new CoTuong.CmdReceiveNotifyRegOutRoom(pkg);
                CoTuong.gameLogic.notifyOutRoom(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.LEAVE_GAME:
            {
                cc.log("Received user Leaved room");
                var pk = new CoTuong.ReceiveUserLeaveRoom(pkg);
                CoTuong.gameLogic.userLeave(pk);
                if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof CoTuong.CoTuongScene)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.NOTIFY_KICK_FROM_ROOM:
            {
                cc.log("Received user kick off");
                var pk = new CoTuong.CmdReceivedKickOff(pkg);
                var reason = pk.reason;
                var s = "Không rõ lý do.";
                if (reason == 1) {
                    s = "Thiếu tiền";
                }
                popup.openPanel_Alert_Lobby(s);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.NEW_USER_JOIN:
            {
                cc.log("Received user join room");
                var pk = new CoTuong.ReceiveUserJoinRoom(pkg);
                CoTuong.gameLogic.userJoinRoom(pk);
                if (SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof CoTuong.CoTuongScene)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.DANG_KY_CHOI:
            {
                var pk = new CoTuong.ReceivedSitting(pkg);
                if (pk.getError() == 0) {
                    cc.log("ngoi thanh cong");
                    if (pk.action == 1) {
                        cc.log("ngoi xuong");
                        CoTuong.gameLogic.sitting(pk);
                    } else if (pk.action == 2) {
                        cc.log("dung day");
                        CoTuong.gameLogic.standup(pk);
                    } else {
                        // dang ki huy
                    }
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                } else {
                    cc.log("fail cmnr");
                }
                break;
            }

            case CoTuong.Cmd.TU_DONG_BAT_DAU:
            {
                cc.log("Received Auto Start");
                var pk = new CoTuong.ReceiveAutoStart(pkg);
                CoTuong.gameLogic.autoStart(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.START_GAME:
            {
                cc.log("Receive Start game");
                var pk = new CoTuong.ReceivedStartGame(pkg);
                CoTuong.gameLogic.startGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoTuong.Cmd.TAKE_TURN:
            {
                cc.log("Take turn");
                var pk = new CoTuong.CmdReceivedTakeTurn(pkg);
                var startPos = CoTuong.gameLogic.convertToServerPos(pk.sx, pk.sy);
                var destPos = CoTuong.gameLogic.convertToServerPos(pk.dx, pk.dy);
                pk.sx = startPos.x;
                pk.sy = startPos.y;
                pk.dx = destPos.x;
                pk.dy = destPos.y;
                cc.log(pk.key + " " + pk.die + " " + pk.sx + " " + pk.sy + " " + pk.dx + " " + pk.dy);
                cc.log(pk.result);
                if (pk.result <= 2) {
                    CoTuong.gameLogic.takeTurn(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                } else {
                    SceneMgr.getInstance().getRunningScene().getMainLayer().invalidMove(pk.dx, pk.dy);
                }
                break;
            }

            case CoTuong.Cmd.CHANGE_TURN:
            {
                cc.log("Change turn");
                var pk = new CoTuong.CmdReceivedChangeTurn(pkg);
                cc.log(pk.currentPlayer);
                cc.log(pk.countDownTime);
                CoTuong.gameLogic.changeTurn(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoTuong.Cmd.KET_THUC:
            {
                cc.log("End game");
                var pk = new CoTuong.CmdReceivedEndGame(pkg);
                CoTuong.gameLogic.endGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoTuong.Cmd.UPDATE_MATCH:
            {
                cc.log("update match");
                var pk = new CoTuong.CmdReceivedUpdateMatch(pkg);
                CoTuong.gameLogic.updateMatch(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoTuong.Cmd.THONG_TIN_BAN_CHOI:
            {
                cc.log("thong tin van choi");
                cc.log(CoTuong.gameLogic.players);
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;

                var pk = new CoTuong.CmdReceivedRoomInfo(pkg);
                CoTuong.gameLogic.updateState(CoTuong.GameState.THONG_TIN_VAN_CHOI);
                CoTuong.gameLogic.reconnect(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoTuong.Cmd.RECONNECT:
            {
                cc.log("reconnect");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;

                CoTuong.gameLogic = new CoTuong.GameLogic();
                var pk = new CoTuong.CmdReceivedRoomInfo(pkg);
                CoTuong.gameLogic.updateState(CoTuong.GameState.RECONNECT);
                CoTuong.gameLogic.reconnect(pk);

                var gameLayer = gameScenePool.getCoTuongGameScene();
                GameLobby.getInstance().setVisible(false);
                if (menutab)
                    menutab.hideAllInfo();
                GameScene.replaceGameGui(gameLayer);
                GameScene.gameGui.onUpdateGui(pk);
                break;
            }

            case CoTuong.Cmd.CAU_HOA:
            {
                SceneMgr.getInstance().getRunningScene().getMainLayer().showCauHoaConfirm();
                break;
            }

            case CoTuong.Cmd.THACH_DAU:
            {
                cc.log("nhan loi thach dau ");
                var pk = new CoTuong.CmdReceivedKhieuChien(pkg);
                cc.log(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showKhieuChienConfirm(pk);
                break;
            }

            case CoTuong.Cmd.KET_QUA_CAU_HOA:
            {
                var pk = new CoTuong.CmdReceivedCauHoaResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showCauHoaDenied(pk.getError());
                break;
            }

            case CoTuong.Cmd.KET_QUA_THACH_DAU:
            {
                var pk = new CoTuong.CmdReceivedKhieuChienResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showKhieuChienDenied(pk.getError());
                break;
            }

            case CoTuong.Cmd.KET_QUA_XIN_THUA:
            {
                var pk = new CoTuong.CmdReceivedKhieuChienResponse(pkg);
                SceneMgr.getInstance().getRunningScene().getMainLayer().showXinThuaDenied(pk.getError());
                break;
            }
        }
    }
});