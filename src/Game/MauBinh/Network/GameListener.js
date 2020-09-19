MauBinh.GameListener = CardGameListener.extend(
    {
        ctor:function(){

        },

        onReceived:function(cmd, pkg){
            cc.log("on Received");
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
                case MauBinh.Cmd.GAME_INFO:
                    cc.log("Received cmd reconnect succeed");
                    userGameData.setItem("inRoom", "true");

                    var pk = new MauBinh.CmdReceiveGameInfo(pkg);

                    var gameGui = new GameGui();
                    gameGui.updateSoloTinhAt(pk.rule);
                    GameLobby.getInstance().setVisible(false);
                    if(menutab)
                        menutab.hideAllInfo();
                    SceneMgr.getInstance().getRunningScene().replaceGameGui(gameGui);

                    MauBinhMatchMgr.getInstance().reconnectGame(pk);
                    gameGui.reconnectGame();
                    break;

                case MauBinh.Cmd.JOIN_ROOM_SUCCESS:
                    cc.log("join room success");
                    var pk = new MauBinh.CmdReceiveJoinRoomSuccess(pkg);

                    var gameGui = new GameGui();
                    gameGui.updateSoloTinhAt(pk.rule);
                    GameLobby.getInstance().setVisible(false);
                    if(gameLobbyInstance.disableMoiChoi == true){
                        if(gameLobbyInstance.guiReceiveMoiChoi)
                            gameLobbyInstance.guiReceiveMoiChoi.hide();
                    }
                    if(menutab)
                        menutab.hideAllInfo();
                    SceneMgr.getInstance().getRunningScene().replaceGameGui(gameGui);

                    MauBinhMatchMgr.getInstance().joinRoomSuccess(pk);
                    gameGui.onJoinRoomSuccess(pk);
                    GameLobby.getInstance().closeCreateRoom();
                    break;
                case MauBinh.Cmd.NEW_USER_JOIN_ROOM:
                    cc.log("new user join room");
                    var pk = new MauBinh.CmdReceiveNewUserJoinRoom(pkg);

                    var playerInfo = new MauBinhPlayerInfo();
                    playerInfo.nickName = pk.nickName;
                    playerInfo.avatar = pk.avatar;
                    playerInfo.currentMoney = pk.money;
                    playerInfo.chairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(pk.uChair);
                    playerInfo.status = pk.uStatus;
                    MauBinhPlayerMgr.getInstance().addPlayer(playerInfo.chairIndex, playerInfo);

                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    gameGui.addPlayer(playerInfo.chairIndex);

                    cc.log("Add player: " + playerInfo.toString());

                    break;
                case MauBinh.Cmd.REQUEST_LEAVE_ROOM:
                    var pk = new MauBinh.CmdReceiveRequestLeaveRoom(pkg);
                    var localChairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(pk.outChair);

                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    gameGui.onRequestLeaveRoom(localChairIndex, pk.isOutRoom);

                    break;

                case MauBinh.Cmd.LEAVE_ROOM:
                    cc.log("user leave room");
                    var pk = new MauBinh.CmdReceiveLeaveRoom(pkg);
                    var localChairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(pk.chairIndex);

                    cc.log("Remove player: " + MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(localChairIndex).toString());

                    MauBinhPlayerMgr.getInstance().removePlayer(localChairIndex);

                    if (localChairIndex != 0){
                        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                        gameGui.removePlayer(localChairIndex);
                    }
                    else{
                        userGameData.setItem("inRoom", "false");
                        GameManager.getInstance().backToSelectRoom();
                    }
                    pk.clean();
                    break;
                case MauBinh.Cmd.AUTO_START:
                    var pk = new MauBinh.CmdReceiveAutoStart(pkg);
                    cc.log("auto start, isAutoStart = " + pk.isAutoStart);

                    GuiUtil.clearEffect();

                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    if (pk.isAutoStart)
                        gameGui.effectLayer.showWaitingMatchStart(pk.autoStartTime);
                    else
                        gameGui.effectLayer.showWaitingOtherPlayers();
                    break;
                case MauBinh.Cmd.CHIA_BAI:
                    cc.log("chia bai");
                    var pk = new MauBinh.CmdReceiveChiaBai(pkg);
                    cc.log("chia bai: list = " + pk.cardList);

                    GuiUtil.clearEffect();

                    //chuyen trang thai tu ngoi doi -> dang choi
                    var allInroomPlayers = MauBinhPlayerMgr.getInstance().getAllInRoomPlayers();
                    for (var i=0; i<allInroomPlayers.length; i++){
                        if (allInroomPlayers[i].status == MauBinh.PlayerStatus.SIT){
                            allInroomPlayers[i].status = MauBinh.PlayerStatus.PLAY;
                        }
                    }
                    MauBinhMatchMgr.getInstance().startGame(pk);
                    break;
                case MauBinh.Cmd.BINH_SO_CHI:
                    var pk = new MauBinh.CmdReceiveBinhSoChi(pkg);
                    var localChairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(pk.chairIndex);
                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    if (localChairIndex != 0)
                        gameGui.effectLayer.setArrangeState(localChairIndex, true);
                    else{
                        gameGui.zoomCardOfPlayer(MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0), GameGui.MY_CARD_SO_BAI_SCALE);
                        gameGui.arrangeFog.setVisible(false);
                        gameGui.setEnableBtnArrange(true, GameGui.BTN_ARRANGE_XEP_LAI);
                        gameGui.updateBinhInfo();
                    }
                    break;
                case MauBinh.Cmd.XEP_LAI:
                    var pk = new MauBinh.CmdReceiveXepLai(pkg);
                    var localChairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(pk.chairIndex);
                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    if (localChairIndex != 0)
                        gameGui.effectLayer.setArrangeState(localChairIndex, false);
                    else{
                        gameGui.zoomCardOfPlayer(MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0), GameGui.MY_CARD_ARRANGE_SCALE);
                        gameGui.arrangeFog.setVisible(true);
                        gameGui.touchListener.setEnabled(true);
                        gameGui.setEnableBtnArrange(true, GameGui.BTN_ARRANGE_SO_CHI);
                        gameGui.updateBinhInfo();
                    }
                    break;
                case MauBinh.Cmd.KET_THUC:
                    cc.log("KET THUC, SO CHI");
                    var pk = new MauBinh.CmdReceiveKetThuc(pkg);
                    cc.log("MauBinh.Cmd.KET_THUC: created received");

                    for (var i=0; i<pk.playerResultList.length; i++){
                        var playerResult = pk.playerResultList[i];
                        playerResult.chairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(playerResult.chairIndex);
                        if(playerResult.chairIndex == 0){
                            cc.log("DA KET THUC" + playerResult.currentMoney);
                            var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                            gameGui.effectLayer.my_currentmoney = playerResult.currentMoney;
                        }
                    }
                    cc.log("playerResultObject.chi1" + pk.playerResultList[0].chi1.toString());


                    MauBinhMatchMgr.getInstance().endGame(pk.playerResultList);
                    break;
                case MauBinh.Cmd.UPDATE_MATCH:
                    cc.log("update new match");
                    var pk = new MauBinh.CmdReceiveUpdateMatch(pkg);

                    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    gameGui.resetElementsInMatch();
                    gameGui.removeAllPlayers();

                    MauBinhPlayerMgr.getInstance().resetAllPlayers();
                    MauBinhMatchMgr.getInstance().initMatch();

                    MauBinhMatchMgr.getInstance().myGlobalChairIndex = pk.uChair;

                    for (var chairIndex in pk.playerList){
                        var playerInfo = new MauBinhPlayerInfo();
                        playerInfo.status = MauBinh.PlayerStatus.SIT;
                        playerInfo.avatar = pk.playerList[chairIndex].avatar;
                        playerInfo.nickName = pk.playerList[chairIndex].nickName;
                        playerInfo.currentMoney = pk.playerList[chairIndex].currentMoney;
                        playerInfo.chairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(chairIndex);

                        MauBinhPlayerMgr.getInstance().addPlayer(playerInfo.chairIndex, playerInfo);

                        gameGui.addPlayer(playerInfo.chairIndex);

                        cc.log("Add player: " + playerInfo.toString());
                    }
                    break;
            };
        }
    }
);