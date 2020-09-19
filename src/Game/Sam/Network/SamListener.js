//
Sam.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            cc.log("Sam on Received");
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

                case SAMCMD.CMDUPDATEGAMEINFO:{
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new Sam.ReceivedUpdateGameInfo(pkg);
                    Sam.gameLogic = new Sam.LogicGame();
                    Sam.gameLogic.updateLogicGameInfo(cmd);
                    var gameLayer =  gameScenePool.getSamScene();
                    GameLobby.getInstance().setVisible(false);
                    SceneMgr.getInstance().getRunningScene().replaceGameGui(gameLayer);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    //Back to lobby
                }
                    break;

                case SAMCMD.CMDJOINROOMSUCCESS:
                {
                    cc.log("Received cmd login succeed")
                    userGameData.setItem("inRoom", "true");
                    var cmd = new Sam.ReceiveJoinRoomSucceed(pkg);
                    Sam.gameLogic = new Sam.LogicGame();
                    Sam.gameLogic.updateLogicJoinRoom(cmd);

                    var gameLayer = gameScenePool.getSamScene();
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
                case SAMCMD.CMDAUTOSTART:
                {
                    cc.log("Received auto start")
                    var auto = new Sam.ReceiveAutoStart(pkg);
                    Sam.gameLogic.updateLogicAutoStart(auto);

                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof Sam.GameScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(auto);

                    auto.clean();
                    break;
                }

                case SAMCMD.CMDBAOSAM:
                {
                    cc.log("Received bao sam");
                    var pk = new Sam.ReceivedBaoSam(pkg);
                    Sam.gameLogic.updateLogicBaoSam();
                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof Sam.GameScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case SAMCMD.CMDHUYBAOSAM:
                {
                    cc.log("Received huy bao sam");
                    var pk = new Sam.ReceivedHuyBao(pkg);
                    Sam.gameLogic.updateLogicHuyBaoSam(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDQUYETDINHSAM:{
                    cc.log("Received quyet dinh sam");
                    var pk = new Sam.ReceivedQuyetDinhSam(pkg);
                    Sam.gameLogic.updateLogicQuyetDinhSam(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDFIRSTTURN:
                {
                    cc.log("Received first turn");
                    var pk = new Sam.ReceivedFirstTurnDecision(pkg);
                    Sam.gameLogic.updateLogicFirstTurn(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                    break;
                }

                case SAMCMD.CMDCHIABAI:
                {
                    cc.log("Received chia bai");
                    var pk = new Sam.ReceivedChiaBai(pkg);
                    Sam.gameLogic.updateLogicChiaBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDCHANGETURN:
                {
                    cc.log("Received change turn");
                    var pk = new Sam.ReceivedChangeTurn(pkg);
                    Sam.gameLogic.updateLogicChangeTurn(pk);

                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                    break;
                }

                case SAMCMD.CMDDANHBAI:
                {
                    cc.log("Received danh bai");
                    var pk = new Sam.ReceivedDanhBai(pkg);
                    Sam.gameLogic.updateLogicDanhBai(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case SAMCMD.CMDBOLUOT:
                {
                    cc.log("Received Bo Luot")
                    var pk = new Sam.ReceivedBoluot(pkg);
                    Sam.gameLogic.updateLogicBoLuot(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDREQUESTLEAVEROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new Sam.CmdReceiveNotifyRegOutRoom(pkg);
                    Sam.gameLogic.updateLogicNotifyOutRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
                case SAMCMD.CMDUSERLEAVEROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new Sam.CMDUSERLEAVEROOM(pkg);
                    Sam.gameLogic.updateLogicUserLeave(pk);
                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof Sam.GameScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDUSERJOINROOM:{
                    cc.log("Received user join room");
                    var pk = new Sam.ReceiveUserJoinRoom(pkg);
                    Sam.gameLogic.updateLogicUserJoinRoom(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDENDGAME:{
                    cc.log("Received end game");
                    var pk = new Sam.ReceivedEndGame(pkg);
                    Sam.gameLogic.updateLogicEndGame(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDUPDATEMATH: {
                    cc.log("Received update");
                    var pk = new Sam.CmdReceivedUpdateMath(pkg);
                    Sam.gameLogic.updateLogicUpdateMatch(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case SAMCMD.CMDCHATCHONG:{
                    cc.log("Received chat chong");
                    var pk = new Sam.ReceivedChatChong(pkg);
                    Sam.gameLogic.updateLogicChatChong(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;
            };


        }
    }
);