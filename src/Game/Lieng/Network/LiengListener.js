//
Lieng.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            //cc.log("Lieng on Received");
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

                case Lieng.Cmd.JOIN_ROOM_SUCCESS:
                {
                    cc.log("Received cmd joinRoom succeed")
                    var cmd = new Lieng.ReceiveJoinRoomSucceed(pkg);
                    Lieng.gameLogic = new Lieng.GameLogic();
                    Lieng.gameLogic.joinRoom(cmd);
                    cmd.clean();

                    var gameLayer = new Lieng.LiengScene();
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

                case Lieng.Cmd.GAME_INFO:
                {
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new Lieng.ReceiveGameInfo(pkg);
                    Lieng.gameLogic = new Lieng.GameLogic();
                    Lieng.gameLogic.setGameInfo(cmd);
                    var gameLayer = new Lieng.LiengScene();
                    GameLobby.getInstance().setVisible(false);
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                }
                    break;

                case Lieng.Cmd.REQUEST_LEAVE_ROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new Lieng.ReceiveRequestOutRoom(pkg);
                    Lieng.gameLogic.notifyOutRoom(pk);
                    if(Lieng.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }

                    pk.clean();
                }
                    break;

                case Lieng.Cmd.NEW_USER_JOIN_ROOM:{
                    cc.log("Received new user join room");
                    var pk = new Lieng.ReceiveUserJoinRoom(pkg);
                    Lieng.gameLogic.userJoinRoom(pk);
                    if(Lieng.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.USER_LEFT_ROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new Lieng.ReceiveUserLeaveRoom(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.userLeaveRoom(pk);
                    }

                    if(Lieng.gameLogic.needUpdateGui && SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof Lieng.LiengScene){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.TAKE_TURN:
                {
                    cc.log("Received take turn");
                    var pk = new Lieng.ReceiveTakeTurn(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.takeTurn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();

                }
                    break;

                case Lieng.Cmd.SELECT_DEALER:
                {
                    cc.log("Received select dealer");
                    var pk = new Lieng.ReceiveSelectDealer(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.selectDealer(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.BUY_IN:
                {
                    cc.log("Received buy in");
                    var pk = new Lieng.ReceiveBuyIn(pkg);
                    cc.log("pk. buyinMoney: " + pk.buyInMoney);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.buyIn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.DEAL_CARD:
                {
                    cc.log("Received deal cards");
                    this.timeDealCard = new Date().getTime();
                    var pk = new Lieng.ReceiveDealCards(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.dealCard(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.NEW_BET_ROUND:{
                    cc.log("Received new bet round");

                    var cmd = new Lieng.ReceiveNewBetRound(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.newBetRound(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.CHANGE_TURN:{
                    cc.log("Receive change turn");
                    this.timeChangeTurn = new Date().getTime();
                    cc.log("## Khoang cach chia bai: " +  (this.timeChangeTurn - this.timeDealCard));
                    var pk = new Lieng.ReceiveChangeTurn(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.changeTurn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Lieng.Cmd.END_GAME:{
                    cc.log("Received end game");
                    var cmd = new Lieng.ReceiveEndGame(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.endGame(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.UPDATE_MATCH:{
                    cc.log("Received update macth");
                    var cmd = new Lieng.ReceiveUpdateMatch(pkg);

                    if(Lieng.gameLogic.needUpdateGui){
                        Lieng.gameLogic.updateMatch(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.REQUEST_SHOW_CARD:{
                    cc.log("Received show card");
                    var cmd = new Lieng.ReceiveShowCard(pkg);
                    Lieng.gameLogic.showCard(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.REQUEST_LAT_BAI:{
                    cc.log("Received update macth");
                    var cmd = new Lieng.ReceiveLatBai(pkg);
                    Lieng.gameLogic.receiveLatBai(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.NOTIFY_BUY_IN:{
                    cc.log("listener Notify buyin");
                    var cmd = new Lieng.NotifyLBuyIn(pkg);
                    Lieng.gameLogic.notifyBuyIn(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case Lieng.Cmd.REQUEST_STAND_UP:{
                    cc.log("listenr Receive stand up");
                    var cmd = new Lieng.ReceiveStandUp(pkg);
                    Lieng.gameLogic.standBuy(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;
            }
        }
    }
);