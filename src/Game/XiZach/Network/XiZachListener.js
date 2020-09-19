//
XiZach.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            //cc.log("XiZach on Received");
            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }

            data.init(pkg);

            var cmdId = data.getCmdId();

            if(cmdId != 3107){
                cc.log("cmdId: " + cmdId);
            }


            if(this.handleCmdCommon(cmdId, pkg)){
                return;
            }

            switch(cmdId) {

                case XiZach.Cmd.JOIN_ROOM_SUCCESS:
                {
                    cc.log("Received cmd joinRoom succeed")
                    var cmd = new XiZach.ReceiveJoinRoomSucceed(pkg);
                    XiZach.gameLogic = new XiZach.GameLogic();
                    XiZach.gameLogic.joinRoom(cmd);
                    cmd.clean();

                    var gameLayer = new XiZach.XiZachScene();
                    GameLobby.getInstance().setVisible(false);
                    if(gameLobbyInstance.disableMoiChoi == true){
                        if(gameLobbyInstance.guiReceiveMoiChoi)
                            gameLobbyInstance.guiReceiveMoiChoi.hide();
                    }
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                    GameLobby.getInstance().closeCreateRoom();
                }
                    break;

                case XiZach.Cmd.GAME_INFO:
                {
                    cc.log("Received cmd reconnect succeed");
                    var cmd = new XiZach.ReceiveGameInfo(pkg);
                    XiZach.gameLogic = new XiZach.GameLogic();
                    XiZach.gameLogic.setGameInfo(cmd);
                    var gameLayer = new XiZach.XiZachScene();
                    GameLobby.getInstance().setVisible(false);
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                }
                    break;

                case XiZach.Cmd.REQUEST_LEAVE_ROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new XiZach.ReceiveRequestOutRoom(pkg);
                    XiZach.gameLogic.notifyOutRoom(pk);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }

                    pk.clean();
                }
                    break;

                case XiZach.Cmd.NEW_USER_JOIN_ROOM:{
                    cc.log("Received new user join room");
                    var pk = new XiZach.ReceiveUserJoinRoom(pkg);
                    XiZach.gameLogic.userJoinRoom(pk);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case XiZach.Cmd.USER_LEFT_ROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new XiZach.ReceiveUserLeaveRoom(pkg);

                    if(XiZach.gameLogic.needUpdateGui){
                        XiZach.gameLogic.userLeaveRoom(pk);
                    }

                    if(XiZach.gameLogic.needUpdateGui && SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case XiZach.Cmd.AUTO_START:
                {
                    cc.log("Received auto start");
                    var auto = new XiZach.ReceiveAutoStart(pkg);
                    XiZach.gameLogic.autoStart(auto);

                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(auto);

                    auto.clean();
                }
                    break;

                case XiZach.Cmd.NOTIFY_CHUYEN_GIAI_DOAN_2:
                {
                    cc.log("NOTIFY CHUYEN GIAI DOAN 2");
                    var cmd = new XiZach.ReceiveChuyenGiaiDoan2(pkg);
                    XiZach.gameLogic.notifyChuyenGiaiDoan2(cmd);

                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.NOTIFY_CHUYEN_GIAI_DOAN_3:
                {
                    cc.log("NOTIFY CHUYEN GIAI DOAN 3");
                    var cmd = new XiZach.ReceiveChuyenGiaiDoan3(pkg);
                    XiZach.gameLogic.notifyChuyenGiaiDoan3(cmd);

                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.RUT_BAI:
                {
                    cc.log("Receive rut bai");
                    var cmd = new XiZach.ReceiveRutCard(pkg);

                    if(cmd.getError() == 0){
                        XiZach.gameLogic.receiveRutBai(cmd);

                        if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                            SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                        cmd.clean();
                    }
                    else{
                        cc.log("error: " + cmd.getError());
                    }

                }
                    break;

                case XiZach.Cmd.DAN_BAI:
                {
                    cc.log("Receive Dan Bai");
                    var cmd = new XiZach.ReceiveDanBai(pkg);
                    XiZach.gameLogic.receiveDanBai(cmd);
                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();

                }
                    break;

                case XiZach.Cmd.RUT_BAI_TU_DONG:
                {
                    cc.log("Receive Rut Bai Tu dong");
                    var cmd = new XiZach.ReceiveRutBaiTuDong(pkg);
                    XiZach.gameLogic.rutBaiTuDong(cmd);
                    if(SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof XiZach.XiZachScene)
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.DEAL_CARD:
                {
                    cc.log("Received deal cards");
                    var pk = new XiZach.ReceiveDealCards(pkg);

                        XiZach.gameLogic.dealCard(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }
                    break;

                case XiZach.Cmd.RUT_BAI_TU_DONG:
                {
                    cc.log("Receive rut bai tu dong");
                    var pk = new XiZach.ReceiveRutBaiTuDong(pkg);
                    XiZach.gameLogic.rutBaiTuDong(pk);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    pk.clean();
                }

                    break;

                case XiZach.Cmd.UPDATE_MATCH:{
                    cc.log("Received update macth");
                    var cmd = new XiZach.ReceiveUpdateMatch(pkg);
                    XiZach.gameLogic.updateMatch(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.SO_BAI:{
                    cc.log("Received so bai");
                    var cmd = new XiZach.ReceiveSoBai(pkg);
                    XiZach.gameLogic.soBai(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.END_GAME:{
                    cc.log("Received end game");
                    var cmd = new XiZach.ReceiveEndGame(pkg);
                    XiZach.gameLogic.endGame(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.DOI_CHUONG:{
                    cc.log("Receive doi chuong");
                    var cmd = new XiZach.ReceiveDoiChuong(pkg);
                    XiZach.gameLogic.doiChuong(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case XiZach.Cmd.NOTIFY_NO_CHUONG:{
                    cc.log("Receive notify no chuong");
                    XiZach.gameLogic.notifyNoChuong(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break
                case XiZach.Cmd.NOTIFY_XIZACH:{
                    cc.log("Receive notify xizach");
                    var cmd = new XiZach.ReceiveKetQuaXiZach(pkg);
                    XiZach.gameLogic.notifyKetQuaXiZach(cmd);
                    if(XiZach.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();

                }
                    break;
            }
        }
    }
);