//
BaCay.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            cc.log("BaCay on Received");
            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }

            data.init(pkg);

            var cmdId = data.getCmdId();
            //cc.log("cmdId: " + cmdId);

            if(this.handleCmdCommon(cmdId, pkg)){
                return;
            }

            switch(cmdId) {
                case BACAYCMD.CMDTHONGTINBANCHOI:
                {
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new BaCay.ReceivedGameInfo(pkg);
                    BaCay.gameLogic = new BaCay.GameLogic();
                    BaCay.gameLogic.setGameInfo(cmd);
                    //var gameLayer = new BaCay.BaCayScene();
                    var gameLayer = gameScenePool.getBaCayScene();
                    GameLobby.getInstance().setVisible(false);
                    //SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                   //SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    //Back to lobby
                }
                    break;

                case BACAYCMD.CMDJOINROOMSUCCESS:
                {
                    cc.log("Received cmd joinRoom succeed")
                    userGameData.setItem("inRoom", "true");
                    waitingJoinRoom = false;
                    var cmd = new BaCay.ReceiveJoinRoomSucceed(pkg);
                    cc.log("Received cmd joinRoom succeed2")
                    BaCay.gameLogic = new BaCay.GameLogic();
                    BaCay.gameLogic.joinRoom(cmd);
                    cmd.clean();

                    cc.log("Received cmd joinRoom succeed 1")
                    //var gameLayer = new BaCay.BaCayScene();
                    var gameLayer = gameScenePool.getBaCayScene();
                    GameLobby.getInstance().setVisible(false);
                    //SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    if(gameLobbyInstance.disableMoiChoi == true){
                        if(gameLobbyInstance.guiReceiveMoiChoi)
                            gameLobbyInstance.guiReceiveMoiChoi.hide();
                    }
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                    //SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                    //closeLoading();
                    GameLobby.getInstance().closeCreateRoom();
                    break;
                }
                case BACAYCMD.CMDTUDONGBATDAU:
                {
                    cc.log("Received auto start")
                    var auto = new BaCay.ReceiveAutoStart(pkg);
                    BaCay.gameLogic.autoStart(auto);

                    if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof BaCay.BaCayScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(auto);
                    auto.clean();
                    break;
                }
                    break;
                case BACAYCMD.CMDDOICHUONG:
                {
                    cc.log("Doi Chuong");
                    var pk = new BaCay.ReceivedDoiChuong(pkg);

                    if(BaCay.gameLogic != null && BaCay.gameLogic != undefined){
                        BaCay.gameLogic.doiChuong(pk);
                    }
                    if( SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }

                    pk.clean();
                }
                    break;
                case BACAYCMD.CMDMOIDATCUOC:
                {
                    cc.log("Moi dat cuoc");
                    var pk = new BaCay.ReceivedMoiDatCuoc(pkg);
                    BaCay.gameLogic.moiDatCuoc(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BACAYCMD.CMDCHIABAI:
                {
                    cc.log("Received chia bai");
                    var pk = new BaCay.ReceivedChiaBai(pkg);
                    BaCay.gameLogic.chiaBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDDATCUOC:
                {
                    cc.log("Received Dat Cuoc");
                    var pk = new BaCay.ReceivedDatCuoc(pkg);
                    BaCay.gameLogic.datCuoc(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDYEUCAUDANHBIEN:
                {
                    cc.log("Received yeu CauDanh Bien");
                    var pk = new BaCay.ReceivedYeuCauDanhBien(pkg);
                    BaCay.gameLogic.danhBien(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDCHAPNHANDANHBIEN:
                {
                    cc.log("received ChapNhanDanhBien");
                    var pk = new BaCay.ReceivedChapNhanDanhBien(pkg);
                    BaCay.gameLogic.chapNhanDanhBien(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BACAYCMD.CMDKECUA:
                {
                    cc.log("received KeCua");
                    var pk = new BaCay.ReceivedKeCua(pkg);
                    BaCay.gameLogic.keCua(pk);

                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDVAOGA:
                {
                    cc.log("received VaoGa");
                    var pk = new BaCay.ReceivedVaoGa(pkg);
                    BaCay.gameLogic.vaoGa(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDMOBAI:
                {
                    cc.log("moBai");
                    var pk = new BaCay.ReceivedMoBai(pkg);
                    BaCay.gameLogic.moBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDREQUESTLEAVEROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new BaCay.CmdReceiveNotifyRegOutRoom(pkg);
                    BaCay.gameLogic.notifyOutRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDUSERLEAVEROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new BaCay.ReceiveUserLeaveRoom(pkg);
                    BaCay.gameLogic.userLeave(pk);
                    if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof BaCay.BaCayScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BACAYCMD.CMDNOTIFYKICKOFF:
                {
                    cc.log("Received user kick off");
                    var pk = new BaCay.CmdReceivedKickOff(pkg);
                    var reason = pk.reason;
                    var s = "Không rõ lý do.";
                    if (reason == 1) {
                        s = "Thiếu tiền";
                    }
                    popup.openPanel_Alert_Lobby(s);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDUSERJOINROOM:
                {
                    cc.log("Received user join room");
                    var pk = new BaCay.ReceiveUserJoinRoom(pkg);
                    BaCay.gameLogic.userJoinRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDENDGAME:
                {
                    cc.log("Received end game");
                    var pk = new BaCay.ReceivedEndGame(pkg);
                    BaCay.gameLogic.endGame(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.CMDUPDATEMATCH:
                {
                    cc.log("Received update match");
                    var pk = new BaCay.CmdReceivedUpdateMatch(pkg);
                    BaCay.gameLogic.updateMatch(pk)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BACAYCMD.DOI_CHUONG:
                {
                    cc.log("Received Doi Chuong");
                    var pk = new BaCay.ReceivedDoiChuong(pkg);
                    BaCay.gameLogic.doiChuong(pk)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
            };
        }
    }
);