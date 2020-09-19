//
BaiCao.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }

            data.init(pkg);

            var cmdId = data.getCmdId();

            if(this.handleCmdCommon(cmdId, pkg)){
                return;
            }

            switch(cmdId) {
                case BAICAOCMD.CMDTHONGTINBANCHOI:
                {
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new BaiCao.ReceivedGameInfo(pkg);
                    BaiCao.gameLogic = new BaiCao.GameLogic();
                    BaiCao.gameLogic.setGameInfo(cmd);
                    //var gameLayer = new BaiCao.BaiCaoScene();
                    var gameLayer = gameScenePool.getBaiCaoScene();
                    GameLobby.getInstance().setVisible(false);
                    //SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                   //SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    //Back to lobby
                }
                    break;

                case BAICAOCMD.CMDJOINROOMSUCCESS:
                {
                    cc.log("Received cmd joinRoom succeed")
                    userGameData.setItem("inRoom", "true");
                    waitingJoinRoom = false;
                    var cmd = new BaiCao.ReceiveJoinRoomSucceed(pkg);
                    cc.log("Received cmd joinRoom succeed2")
                    BaiCao.gameLogic = new BaiCao.GameLogic();
                    BaiCao.gameLogic.joinRoom(cmd);
                    cmd.clean();

                    cc.log("Received cmd joinRoom succeed 1")
                    //var gameLayer = new BaiCao.BaiCaoScene();
                    var gameLayer = gameScenePool.getBaiCaoScene();
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
                case BAICAOCMD.CMDTUDONGBATDAU:
                {
                    cc.log("Received auto start")
                    var auto = new BaiCao.ReceiveAutoStart(pkg);
                    BaiCao.gameLogic.autoStart(auto);

                    if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof BaiCao.BaiCaoScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(auto);
                    auto.clean();
                    break;
                }
                    break;
                case BAICAOCMD.CMDDOICHUONG:
                {
                    cc.log("Doi Chuong");
                    var pk = new BaiCao.ReceivedDoiChuong(pkg);

                    if(BaiCao.gameLogic != null && BaiCao.gameLogic != undefined){
                        BaiCao.gameLogic.doiChuong(pk);
                    }
                    if( SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }

                    pk.clean();
                }
                    break;
                case BAICAOCMD.CMDMOIDATCUOC:
                {
                    cc.log("Moi dat cuoc");
                    var pk = new BaiCao.ReceivedMoiDatCuoc(pkg);
                    BaiCao.gameLogic.moiDatCuoc(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BAICAOCMD.CMDCHIABAI:
                {
                    cc.log("Received chia bai");
                    var pk = new BaiCao.ReceivedChiaBai(pkg);
                    BaiCao.gameLogic.chiaBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDDATCUOC:
                {
                    cc.log("Received Dat Cuoc");
                    var pk = new BaiCao.ReceivedDatCuoc(pkg);
                    BaiCao.gameLogic.datCuoc(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDYEUCAUDANHBIEN:
                {
                    cc.log("Received yeu CauDanh Bien");
                    var pk = new BaiCao.ReceivedYeuCauDanhBien(pkg);
                    BaiCao.gameLogic.danhBien(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDCHAPNHANDANHBIEN:
                {
                    cc.log("received ChapNhanDanhBien");
                    var pk = new BaiCao.ReceivedChapNhanDanhBien(pkg);
                    BaiCao.gameLogic.chapNhanDanhBien(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BAICAOCMD.CMDKECUA:
                {
                    cc.log("received KeCua");
                    var pk = new BaiCao.ReceivedKeCua(pkg);
                    BaiCao.gameLogic.keCua(pk);

                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDVAOGA:
                {
                    cc.log("received VaoGa");
                    var pk = new BaiCao.ReceivedVaoGa(pkg);
                    BaiCao.gameLogic.vaoGa(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDMOBAI:
                {
                    cc.log("moBai");
                    var pk = new BaiCao.ReceivedMoBai(pkg);
                    BaiCao.gameLogic.moBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDREQUESTLEAVEROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new BaiCao.CmdReceiveNotifyRegOutRoom(pkg);
                    BaiCao.gameLogic.notifyOutRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDUSERLEAVEROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new BaiCao.ReceiveUserLeaveRoom(pkg);
                    BaiCao.gameLogic.userLeave(pk);
                    if (SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof BaiCao.BaiCaoScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case BAICAOCMD.CMDNOTIFYKICKOFF:
                {
                    cc.log("Received user kick off");
                    var pk = new BaiCao.CmdReceivedKickOff(pkg);
                    var reason = pk.reason;
                    var s = "Không rõ lý do.";
                    if (reason == 1) {
                        s = "Thiếu tiền";
                    }
                    popup.openPanel_Alert_Lobby(s);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDUSERJOINROOM:
                {
                    cc.log("Received user join room");
                    var pk = new BaiCao.ReceiveUserJoinRoom(pkg);
                    BaiCao.gameLogic.userJoinRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDENDGAME:
                {
                    cc.log("Received end game");
                    var pk = new BaiCao.ReceivedEndGame(pkg);
                    BaiCao.gameLogic.endGame(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.CMDUPDATEMATCH:
                {
                    cc.log("Received update match");
                    var pk = new BaiCao.CmdReceivedUpdateMatch(pkg);
                    BaiCao.gameLogic.updateMatch(pk)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case BAICAOCMD.DOI_CHUONG:
                {
                    cc.log("Received Doi Chuong");
                    var pk = new BaiCao.ReceivedDoiChuong(pkg);
                    BaiCao.gameLogic.doiChuong(pk)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
            };
        }
    }
);