//
TienLen.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            cc.log("TienLen on Received");

            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }

            data.init(pkg);
            var cmdId = data.getCmdId();
            cc.log("cmdId: " + cmdId);

            if(this.handleCmdCommon(cmdId, pkg)){
                return;
            }

            switch(cmdId){
                case TIENLENCMD.CMDUPDATEGAMEINFO:{
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new TienLen.ReceivedUpdateGameInfo(pkg);
                    TienLen.gameLogic = new TienLen.GameLogic();
                    TienLen.gameLogic.initReconnect(cmd);
                    var gameLayer =  gameScenePool.getTienLenScene();
                    GameLobby.getInstance().setVisible(false);
                    SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    //Back to lobby
                }
                    break;

                case TIENLENCMD.CMDJOINROOMSUCCESS:
                {
                    cc.log("Received cmd login succeed")
                    userGameData.setItem("inRoom", "true");
                    var cmd = new TienLen.ReceiveJoinRoomSucceed(pkg);
                    TienLen.gameLogic = new TienLen.GameLogic();
                    TienLen.gameLogic.initWith(cmd);

                    var gameLayer = gameScenePool.getTienLenScene();
                    //gameLayer.lastGUI = sceneMgr.getRunningScene().getMainLayer().id;
                    //SceneMgr.getInstance().replaceWithScene(makeScene(gameLayer), 1);
                    GameLobby.getInstance().setVisible(false);
                    if(gameLobbyInstance.disableMoiChoi == true){
                        if(gameLobbyInstance.guiReceiveMoiChoi)
                            gameLobbyInstance.guiReceiveMoiChoi.hide();
                    }
                    SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    GameLobby.getInstance().closeCreateRoom();
                    cmd.clean();
                    break;
                }
                case TIENLENCMD.CMDAUTOSTART:
                {
                    cc.log("Received auto start")
                    var auto = new TienLen.ReceiveAutoStart(pkg);
                    TienLen.gameLogic.autoStart(auto);

                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof TienLen.GameScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(auto);

                    auto.clean();
                    break;
                }

                case TIENLENCMD.CMDFIRSTTURN:
                {
                    cc.log("Received first turn");
                    var pk = new TienLen.ReceivedFirstTurnDecision(pkg);
                    TienLen.gameLogic.firstTurn(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                    break;
                }

                case TIENLENCMD.CMDCHIABAI:
                {
                    cc.log("Received chia bai");
                    var pk = new TienLen.ReceivedChiaBai(pkg);
                    TienLen.gameLogic.chiabai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case TIENLENCMD.CMDCHANGETURN:
                {
                    cc.log("Received change turn");
                    var pk = new TienLen.ReceivedChangeTurn(pkg);
                    TienLen.gameLogic.changeturn(pk);

                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                    break;
                }

                case TIENLENCMD.CMDWAIT4DOITHONG:{
                    cc.log("Received doi 4 doi thong");
                    var pk = new TienLen.ReceivedWaitBonDoiThong(pkg);
                    TienLen.gameLogic.waitBonDoiThong(pkg);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                    break;

                    break;
                }

                case TIENLENCMD.CMDDANHBAI:
                {
                    cc.log("Received danh bai");
                    var pk = new TienLen.ReceivedDanhBai(pkg);
                    TienLen.gameLogic.danhbai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case TIENLENCMD.CMDBOLUOT:
                {
                    cc.log("Received Bo Luot")
                    var pk = new TienLen.ReceivedBoluot(pkg);
                    TienLen.gameLogic.boluot(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case TIENLENCMD.CMDREQUESTLEAVEROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new TienLen.CmdReceiveNotifyRegOutRoom(pkg);
                    TienLen.gameLogic.notifyOutRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case TIENLENCMD.CMDUSERLEAVEROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new TienLen.CMDUSERLEAVEROOM(pkg);
                    TienLen.gameLogic.userLeave(pk);
                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof TienLen.GameScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                    pk.clean();
                }
                    break;
                case TIENLENCMD.CMDNOTIFYKICKOFF:
                {
                    cc.log("Received user Leaved room");
                    var pk = new TienLen.CmdReceivedKickOff(pkg);
                    var reason = pk.reason;
                    var s = "Không rõ lý do.";
                    if(reason == 1){
                        s = "Thiếu tiền";
                    }
                    popup.openPanel_Alert_Lobby(s);
                    pk.clean();
                }

                case TIENLENCMD.CMDUSERJOINROOM:{
                    cc.log("Received user join room");
                    var pk = new TienLen.ReceiveUserJoinRoom(pkg);
                    TienLen.gameLogic.userJoinRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                    pk.clean();
                }
                    break;

                case TIENLENCMD.CMDENDGAME:{
                    cc.log("Received end game");
                    var pk = new TienLen.ReceivedEndGame(pkg);
                    TienLen.gameLogic.endGame(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case TIENLENCMD.CMDUPDATEMATH: {
                    cc.log("Received update");
                    var pk = new TienLen.CmdReceivedUpdateMath(pkg);
                    TienLen.gameLogic.updateMath(pk)
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case TIENLENCMD.CMDCHATCHONG:{
                    cc.log("Received chat chong");
                    var pk = new TienLen.ReceivedChatChong(pkg);
                    TienLen.gameLogic.chatchong(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
            };


        }
    }
);