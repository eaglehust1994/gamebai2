//
Poker.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            //cc.log("Poker on Received");
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

                case Poker.Cmd.JOIN_ROOM_SUCCESS:
                {
                    cc.log("Received cmd joinRoom succeed")
                    var cmd = new Poker.ReceiveJoinRoomSucceed(pkg);
                    Poker.gameLogic = new Poker.GameLogic();
                    Poker.gameLogic.joinRoom(cmd);
                    cmd.clean();

                    if(Poker.gameLogic.maxPlayer == 9){
                        var gameLayer = new Poker.PokerScene();
                    }
                    else{
                        var gameLayer = new Poker.PokerScene();
                    }
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

                case Poker.Cmd.GAME_INFO:
                {
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");
                    var cmd = new Poker.ReceiveGameInfo(pkg);
                    Poker.gameLogic = new Poker.GameLogic();
                    Poker.gameLogic.setGameInfo(cmd);
                    var gameLayer = new Poker.PokerScene();
                    GameLobby.getInstance().setVisible(false);
                    GameScene.addGameGUI(gameLayer);
                    GameScene.gameGui.onUpdateGui(cmd);
                }
                    break;

                case Poker.Cmd.REQUEST_LEAVE_ROOM:
                {
                    cc.log("Received notify reqOutRoom");
                    var pk = new Poker.ReceiveRequestOutRoom(pkg);
                    Poker.gameLogic.notifyOutRoom(pk);
                    if(Poker.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }

                    pk.clean();
                }
                    break;

                case Poker.Cmd.NEW_USER_JOIN_ROOM:{
                    cc.log("Received new user join room");
                    var pk = new Poker.ReceiveUserJoinRoom(pkg);
                    if(Poker.gameLogic){
                        Poker.gameLogic.userJoinRoom(pk);
                    }
                    if(Poker.gameLogic.needUpdateGui){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.USER_LEFT_ROOM:
                {
                    cc.log("Received user Leaved room");
                    var pk = new Poker.ReceiveUserLeaveRoom(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.userLeaveRoom(pk);
                    }

                    if(Poker.gameLogic.needUpdateGui && SceneMgr.getInstance().getRunningScene().getMainLayer() && SceneMgr.getInstance().getRunningScene().getMainLayer() instanceof Poker.PokerScene){
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.TAKE_TURN:
                {
                    cc.log("Received take turn");
                    var pk = new Poker.ReceiveTakeTurn(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.takeTurn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();

                }
                    break;

                case Poker.Cmd.SELECT_DEALER:
                {
                    cc.log("Received select dealer");
                    var pk = new Poker.ReceiveSelectDealer(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.selectDealer(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.BUY_IN:
                {
                    cc.log("Received buy in");
                    var pk = new Poker.ReceiveBuyIn(pkg);
                    cc.log("pk. buyinMoney: " + pk.buyInMoney);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.buyIn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.DEAL_CARD:
                {
                    cc.log("Received deal cards");
                    this.timeDealCard = new Date().getTime();
                    var pk = new Poker.ReceiveDealCards(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.dealCard(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.NEW_BET_ROUND:{
                    cc.log("Received new bet round");

                    var cmd = new Poker.ReceiveNewBetRound(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.newBetRound(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Poker.Cmd.CHANGE_TURN:{
                    cc.log("Receive change turn");
                    this.timeChangeTurn = new Date().getTime();
                    cc.log("## Khoang cach chia bai: " +  (this.timeChangeTurn - this.timeDealCard));
                    var pk = new Poker.ReceiveChangeTurn(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.changeTurn(pk);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(pk);
                    }
                    pk.clean();
                }
                    break;

                case Poker.Cmd.END_GAME:{
                    cc.log("Received end game");
                    var cmd = new Poker.ReceiveEndGame(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.endGame(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Poker.Cmd.UPDATE_MATCH:{
                    cc.log("Received update macth");
                    var cmd = new Poker.ReceiveUpdateMatch(pkg);

                    if(Poker.gameLogic.needUpdateGui){
                        Poker.gameLogic.updateMatch(cmd);
                        SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    }
                    cmd.clean();
                }
                    break;

                case Poker.Cmd.REQUEST_SHOW_CARD:{
                    cc.log("Received show card");
                    var cmd = new Poker.ReceiveShowCard(pkg);

                    Poker.gameLogic.showCard(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case Poker.Cmd.NOTIFY_BUY_IN:{
                    cc.log("Notify buyin");
                    Poker.gameLogic.notifyBuyIn();
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui();
                }
                    break;

                case Poker.Cmd.REQUEST_STAND_UP:{
                    cc.log("listenr Receive stand up");
                    var cmd = new Poker.ReceiveStandUp(pkg);
                    Poker.gameLogic.standBuy(cmd);
                    SceneMgr.getInstance().getRunningScene().getMainLayer().onUpdateGui(cmd);
                    cmd.clean();
                }
                    break;

                case Poker.Cmd.GHEP_BAN:
                {
                    // Dosomething like reconnect;
                }
                    break;
            }
        }
    }
);