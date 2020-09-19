//

var listenerPingPong = true;
var CardGameListener = cc.Class.extend(
    {
        ctor:function(){
            this.gameListenerReady = false;
        },

        onFinishConnect:function(isSuccess){
            if(isSuccess) {
                cc.log("card game onFinishConnect succeed");
                gameWsState = CLIENT_STATE.CONNECTED;
                gameWsClient.sendLogin();
                cc.log("gameWsState: " + gameWsState);
            }
            else{
                cc.log("card game onFinsishConect failed");
                waitingJoinGame = false;
                gameWsState = CLIENT_STATE.NOT_CONNECTED;
                closeLoading();
            }
        },

        onDisconnected:function(){
            waitingJoinGame = false;
            cc.log("Listener onDisconnected");
            closeLoading();

            gameWsState = CLIENT_STATE.NOT_CONNECTED;
            gameWsClient = null;

            userGameData.setItem("currentGame", "-1");
            GameManager.getInstance.currentGame = -1;

            if(GameLobby.hasInit){
                GameLobby.getInstance().unscheduleThongTinHuVang();
            }

            if(GameManager.getInstance().inGame){
                GameManager.getInstance().backToLobby();
            }
        },

        handleCmdCommon: function(cmdId, pkg){
            // khong lang nghe neu trang thai khac conected
            if(gameWsState != CLIENT_STATE.CONNECTED){
                return true;
            }

            EventHandlerManager.getInstance().removeHandler("pingpong");
            cc.log("received cardgame: " + cmdId);

            switch(cmdId){
                case CARD_GAME_CMD.CMDLOGIN:{
                    cc.log("Received cmd login")

                    EventHandlerManager.getInstance().removeHandler("login");
                    var cmd = new CARD_GAME.CmdReceiveLogin(pkg);
                    var failError = cmd.getError();
                    cc.log("Eror: " + failError);


                    closeLoading();
                    if(failError == 0){
                        //GameManager.getInstance().startPingPong();
                        if(gameData.gameType == GameList.PokerTour){
                            var pokerLobby = PokerTourLobby.getInstance();
                            pokerLobby.show();
                            GameManager.getInstance().inGame = true;

                            menutab.gotoLobbyGameBai();

                            cc.log("send Reconnect");
                            gameWsClient.sendReconnect();

                            return;
                        }
                        var gameLobby = GameLobby.getInstance();
                        //waitingJoinGame = false;
                        gameLobby.initWithGameType(GameManager.getInstance().currentGame);
                        gameLobby.resetCountReceiveMoiChoi();
                        gameLobby.showAndSendGetConfig();
                        GameManager.getInstance().inGame = true;

                        menutab.gotoLobbyGameBai();

                        cc.log("send Reconnect");
                        gameWsClient.sendReconnect();

                    }
                    else{
                        switch (failError){
                            case 1:
                            s = "LOGIN_ERROR";
                            popup.open_panel_message_OK("Thông Báo", "Phiên làm việc bạn đã hết hạn, vui lòng đăng nhập lại", "Ok", menutab.logout);
                            break;
                            case 2:
                                s = "Bạn đã chặn không chơi game này.";
                                popup.openPanel_Alert_Lobby(s);
                                break;
                            case 3:
                                s = "Hệ thống bảo trì";
                                popup.openPanel_Alert_Lobby(s);
                                break;
                        }
                        GameManager.getInstance().disconnect();

                    }
                    return true;
                }
                    break;

                case CARD_GAME_CMD.CMDRECONNECTGAMEROOM:{
                    cc.log("Received cmd reconnect failed");
                    return true;
                }
                    break;

                case CARD_GAME_CMD.CMDNOTIFYDISCONNECT:{
                    cc.log("Received cmd systemDisconnect");
                    var cmd = new CARD_GAME.ReceivedDisconnect(pkg);
                    var s = "";
                    var reason = cmd.getError();
                    switch (reason){
                        case 3:
                            s = "Tài khoản của bạn đang chơi game trên máy khác.";
                            break;
                        case 0:
                            s = "Bạn bị đưa ra khỏi game vì không tương tác quá lâu."
                            break;
                        default:
                            s = "Bạn đã bị đưa ra khỏi game.";
                            break;

                    }
                    cc.log("toi day");
                    popup.openPanel_Alert_Lobby(s);
                    GameManager.getInstance().disconnect();
                    cmd.clean();
                    return true;
                }
                    break;

                case CARD_GAME_CMD.CMDJOINROOMFAIL:{
                    cc.log("Received cmd join room fail")
                    var cmd = new CARD_GAME.ReceiveJoinRoomFail(pkg);

                    var failError = cmd.getError();
                    //data.clean();
                    cc.log("Eror: " + failError);

                    var s = "";
                    switch (failError){
                        case 1:
                            s = "Lỗi kiểm tra thông tin!";
                            break;
                        case 2:
                            s = "Không tìm được phòng thích hợp. Vui lòng thử lại sau!";
                            break;
                        case 3:
                            s = "Bạn không đủ tiền vào phòng chơi này!";
                            break;
                        case 4:
                            s = "Không tìm được phòng thích hợp. Vui lòng thử lại sau!";
                            break;
                        case 5:
                            s = "Mỗi lần vào phòng phải cách nhau 10 giây!"
                            break;
                        case 6:
                            s = "Hệ thống bảo trì!";
                            break;
                        case 7:
                            s = "Không tìm thấy phòng chơi!";
                            break;
                        case 8:
                            s = "Mật khẩu phòng chơi không đúng!";
                            break;
                        case 9:
                            s = "Phòng chơi đã đủ người!";
                            break;
                        case 10:
                            s = "Bạn bị chủ phòng không cho vào bàn!";
                            break;
                    }
                    watingJoinRoom = false;
                    gameLobbyInstance.btn_quickPlay.setEnabled(true);
                    cc.log("watingJoinRoom = " + watingJoinRoom);
                    popup.openPanel_Alert_Lobby(s);
                    if(gameWsClient != null) {
                        if(gameLobbyInstance != null) {
                            if(gameData.gameType == GameList.MauBinhTinhAt)
                                gameWsClient.sendGetListRoom(gameLobbyInstance.typeBan, gameData.maxPlayer, gameLobbyInstance.save_muccuoc, 1, CARD_FROM, CARD_TO);
                            else
                                gameWsClient.sendGetListRoom(gameLobbyInstance.typeBan, gameData.maxPlayer, gameLobbyInstance.save_muccuoc, 0, CARD_FROM, CARD_TO);
                        }
                    }

                    cmd.clean();
                    return true;
                }
                    break;

                case SAMCMD.CMDNOTIFYKICKOFF:
                {
                    cc.log("Received user Leaved room");
                    var pk = new Sam.CmdReceivedKickOff(pkg);
                    var reason = pk.reason;
                    var s = "Không rõ lý do.";
                    if(reason == 1){
                        s = "Bạn bị mời ra khỏi phòng vì không đủ tiền";
                    }
                    else if(reason == 2){
                        s = "Hệ thống đang bảo trì."
                    }
                    else if(reason == 3){
                        s = "Buy-In thất bại, bạn bị mời ra khỏi phòng";
                    }
                    else if(reason == 6){
                        s = "Bàn chơi đã bị hủy";
                    }
                    else if(reason == 7){
                        s = "Bạn bị kick ra khỏi bàn chơi";
                    }
                    
                    popup.openPanel_Alert_Lobby(s);
                    pk.clean();
                    return true;
                }
                    break;

                case CARD_GAME_CMD.MONEYBETCONFIG:{
                    cc.log("Received MoneyBetConfig");
                    gameData.ListRoomHavePass = [];
                    var pk = new CARD_GAME.CmdReceiveSamConfig(pkg);
                    gameData.updateConfig(pk);
                    pk.clean();
                    return true;
                }
                    break;

                case CARD_GAME_CMD.GETLISTROOM:{
                    cc.log("Received List room");
                    var pk = new CARD_GAME.CmdReceiveListRoom(pkg);
                    gameData.updateMoneyBetConfig(pk);
                    pk.clean();
                    return true;
                }
                    break;
                case CARD_GAME_CMD.CREATE_ROOM_FAIL:{
                    cc.log("Create Room Fail");
                    var pk = new CARD_GAME.CmdReceiveCreateRoom(pkg);
                    var s = "Không rõ lý do.";
                    if(pk.error == 1){
                        s = "Lỗi kiểm tra thông tin!";
                    }else if(pk.error == 2 || pk.error == 4){
                        s = "Không tạo được bàn chơi. Vui lòng thử lại sau!";
                    }else if(pk.error == 3){
                        s = "Bạn không đủ tiền để tạo bàn này!";
                    }else if(pk.error == 5){
                        s = "Mỗi lần tạo bàn phải cách nhau 10 giây!";
                    }else if(pk.error == 6){
                        s = "Hệ thống bảo trì!";
                    }else if(pk.error == 7){
                        s = "Không tìm thấy phòng chơi!";
                    }else if(pk.error == 8 || pk.error == 9 || pk.error == 10){
                        s = "Không tạo được bàn chơi. Vui lòng thử lại sau!";
                    }else if(pk.error == 11){
                        s = "Thông tin tạo bàn không chính xác!";
                    }else if(pk.error == 12){
                        s = "Bạn chưa đủ cấp độ Vip để tạo bàn!"
                    }else if(pk.error == 13){
                        s = "Không thể tạo thêm bàn với cấp độ Vip hiện tại!";
                    }
                    popup.openPanel_Alert_Lobby(s);
                    pk.clean();
                    return true;
                }
                    break;

                case CARD_GAME_CMD.TOPSERVER: {
                    cc.log("Received TopServer");
                    var pk = new CARD_GAME.CmdReceiveTopServer(pkg);
                    gameData.updateTopServer(pk);
                    //GameLobby.getInstance().reloadTopServer();
                    cc.log("reloadDone");
                    return true;
                }
                    break;
                case CARD_GAME_CMD.FIND_ROOM_LOBBY: {
                    cc.log("Received FindRoom");
                    var pk = new CARD_GAME.CmdReceiveFindRoom(pkg);
                    gameData.updateFindRoom(pk);
                    return true;
                }
                    break;
                case CARD_GAME_CMD.GET_XOCDIA_CONFIG: {
                    cc.log("Received xoc dia config");
                    var pk = new CARD_GAME.CmdReceiveXocDiaConfig(pkg);
                    gameData.updateXocDiaConfig(pk);
                    return true;
                }
                    break;
                case CARD_GAME_CMD.CMDPINGPONG:{

                    if(listenerPingPong){
                        cc.log("Received Ping Pong");
                        GameManager.getInstance().receivedPingPong();
                    }

                    return true;
                }
                    break;

                case CARD_GAME_CMD.CMDPINGTEST:{

                    var pk = new CARD_GAME.CmdReceivePingTest(pkg);
                    cc.log("Test cur Long");
                    cc.log(pk.curLong);
                    cc.log(pk.curLong + 3);
                    cc.log(pk.curLong + pk.curLong);
                    cc.log(3 + pk.curLong);
                    //var cur = pk.curLong;
                    //if(cur == 0){
                    //    startTime = new Date().getTime();
                    //}
                    //if(cur != curLongTes){
                    //    cc.log("curLong: " + curLongTes + "longServer: " + cur);
                    //}
                    //else{
                    //
                    //
                    //    if(curLongTes >= 500){
                    //        cc.log("hahahhaha");
                    //        var timeEnd = new Date().getTime();
                    //        cc.log("time: " + (timeEnd  -  startTime));
                    //    }
                    //    else{
                    //        cc.log("receive pingTest");
                    //        cc.log(cur + 3);
                    //        cc.log(pk.curLong + 3);
                    //        cc.log(3 + cur);
                    //        cc.log(3 + pk.curLong);
                    //
                    //        curLongTes++;
                    //        gameWsClient.sendPingTest();
                    //    }
                    //
                    //}
                    return true;
                }
                    break;
                case CARD_GAME_CMD.CHAT_ROOM:{
                    cc.log("receive Chat room");
                    var pk = new CARD_GAME.CmdReceiveChatRoom(pkg);

                    var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    if (gameScene == null){
                        return;
                    }
                    if (gameData.gameType == GameList.CoTuong || gameData.gameType == GameList.CoUp) {
                        gameScene.updateChatRoom(pk);
                        return;
                    }
                        var image = null;
                    if (pk.isIcon){
                        image = new cc.Sprite("res/common/chat/emotion_" + pk.content + ".png");
                    }
                    else{
                        image = new cc.Scale9Sprite("res/common/9patch.png");

                        var label = new ccui.Text(pk.content, "Arial", 25);
                        label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                        image.addChild(label);

                        image.width = label.getContentSize().width*1.1;
                        image.height = 40;
                        label.setPosition(image.width/2,image.height/2);
                    }

                    if (gameData.gameType == GameList.XocDia){
                        gameScene.updateChatRoom(pk.nickname, image);
                        return;
                    }

                    gameScene.updateChatRoom(pk.chair, image);

                    return true;
                }
                    break;
                case CARD_GAME_CMD.NO_HU_VANG:
                {
                    cc.log("receive No hu vang");
                    var pk = new CARD_GAME.CmdReceiveNoHuVang(pkg);

                    var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
                    if (gameScene!=null){
                        var noHuLayer = new NoHuLayer(pk.nickName, pk.moneyAdd);
                        gameScene.addChild(noHuLayer, 99999);
                    }
                    if(gameWsClient){
                        gameWsClient.sendThongTinHuVang();
                    }
                    return true;
                }
                    break;

                case CARD_GAME_CMD.THONG_TIN_HU_VANG:
                {
                    var pk = new CARD_GAME.CmdThongTinHuVang(pkg);
                    var gameLobby = GameLobby.getInstance();

                    gameLobby.updateThongTinHuVang(pk);
                    if(!gameLobby.isVisible()){
                        var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
                        if (gameScene!=null){
                            //Test
                            //gameScene.updateWithData(pk);
                        }
                    }
                }
                    break;

                case CARD_GAME_CMD.REQUEST_INFO_MOI_CHOI:
                {
                    var pk = new CARD_GAME.ReceiveInfoMoiChoi(pkg);
                    var gameLobby = GameLobby.getInstance();
                    if(!gameLobby.isVisible()){
                        var gameScene = SceneMgr.getInstance().getRunningScene().getMainLayer();
                        if (gameScene!=null){
                            gameScene.receiveInfoMoiChoi(pk);
                        }
                    }
                }
                    break;

                case CARD_GAME_CMD.MOI_CHOI:
                {
                    cc.log("moi choi");
                    var pk = new CARD_GAME.ReceiveLoiMoiChoi(pkg);
                    var gameLobby = GameLobby.getInstance();

                    if(gameLobby.isVisible()){
                        gameLobby.receiveMoiChoi(pk);
                    }
                }
                    break;
            };
        }
    }
);

var startTime = 0;