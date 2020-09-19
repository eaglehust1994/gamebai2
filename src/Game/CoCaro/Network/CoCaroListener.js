/**
 * Created by vinplay on 2/4/17.
 */

CoCaro.GameListener = CardGameListener.extend({
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
            case CoCaro.CoCaroCmd.JOIN_ROOM_SUCCESS:
            {
                cc.log("Received cmd joinRoom succeed");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;
                var cmd = new CoCaro.ReceiveJoinRoomSucceed(pkg);
                CoCaro.gameLogic = new CoCaro.GameLogic();
                CoCaro.gameLogic.joinRoom(cmd);
                cmd.clean();

                var gameLayer = gameScenePool.getCaroGameScene();
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

            case CoCaro.CoCaroCmd.DANG_KY_THOAT_PHONG:
            {
                cc.log("Received notify reqOutRoom");
                var pk = new CoCaro.CmdReceiveNotifyRegOutRoom(pkg);
                CoCaro.gameLogic.notifyOutRoom(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.LEAVE_GAME:
            {
                cc.log("Received user Leaved room");
                var pk = new CoCaro.ReceiveUserLeaveRoom(pkg);
                CoCaro.gameLogic.userLeave(pk);
                if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof CoCaro.CoCaroScene)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.NOTIFY_KICK_FROM_ROOM:
            {
                cc.log("Received user kick off");
                var pk = new CoCaro.CmdReceivedKickOff(pkg);
                var reason = pk.reason;
                var s = "Không rõ lý do.";
                if (reason == 1) {
                    s = "Thiếu tiền";
                }
                popup.openPanel_Alert_Lobby(s);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.NEW_USER_JOIN:
            {
                cc.log("Received user join room");
                var pk = new CoCaro.ReceiveUserJoinRoom(pkg);
                CoCaro.gameLogic.userJoinRoom(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.TU_DONG_BAT_DAU:
            {
                cc.log("Received Auto Start");
                var pk = new CoCaro.ReceiveAutoStart(pkg);
                CoCaro.gameLogic.autoStart(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.START_GAME:
            {
                cc.log("Receive Start game");
                var pk = new CoCaro.ReceivedStartGame(pkg);
                CoCaro.gameLogic.startGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                pk.clean();
                break;
            }

            case CoCaro.CoCaroCmd.TAKE_TURN:
            {
                cc.log("Take turn");
                var pk = new CoCaro.CmdReceivedTakeTurn(pkg);
                CoCaro.gameLogic.takeTurn(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoCaro.CoCaroCmd.CHANGE_TURN:
            {
                cc.log("Change turn");
                var pk = new CoCaro.CmdReceivedChangeTurn(pkg);
                cc.log(pk.currentPlayer);
                cc.log(pk.countDownTime);
                CoCaro.gameLogic.changeTurn(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoCaro.CoCaroCmd.KET_THUC:
            {
                cc.log("End game");
                var pk = new CoCaro.CmdReceivedEndGame(pkg);
                CoCaro.gameLogic.endGame(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoCaro.CoCaroCmd.UPDATE_MATCH:
            {
                cc.log("update match");
                var pk = new CoCaro.CmdReceivedUpdateMatch(pkg);
                CoCaro.gameLogic.updateMatch(pk);
                SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                break;
            }

            case CoCaro.CoCaroCmd.THONG_TIN_BAN_CHOI:
            {
                cc.log("reconnect");
                userGameData.setItem("inRoom", "true");
                waitingJoinRoom = false;

                CoCaro.gameLogic = new CoCaro.GameLogic();
                var pk = new CoCaro.CmdReceivedRoomInfo(pkg);
                CoCaro.gameLogic.reconnect(pk);

                var gameLayer = gameScenePool.getCaroGameScene();
                GameLobby.getInstance().setVisible(false);
                if (menutab)
                    menutab.hideAllInfo();
                GameScene.replaceGameGui(gameLayer);
                GameScene.gameGui.onUpdateGui(pk);
                break;
            }
        }
    }
});