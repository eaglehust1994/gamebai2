/**
 * Created by Admin on 10/21/2016.
 */
//
Slots.GameListener = cc.Class.extend(
    {
        ctor:function(){

        },

        //onFinishConnect:function(isSuccess){
        //    if(isSuccess) {
        //        cc.log("Slots game onFinishConnect succeed");
        //        gameWsClient.sendLogin();
        //        gameWsState = GameManager.OPEN;
        //    }
        //    else{
        //        cc.log("Slots game onFinsishConect failed");
        //        waitingJoinGame = false;
        //        closeLoading();
        //        cc.log("close waiting join game");
        //    }
        //},
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
            //gameWsState = GameManager.CLOSED;
            gameWsClient = null;

            userGameData.setItem("currentGame", "-1");
            GameManager.getInstance.currentGame = -1;
            //window.location = HOST;
            //if(GameManager.getInstance().inGame){
            //    GameManager.getInstance().backToLobby();
            //}
            if(slotKhoBau != null && !slotKhoBau.isBackToLobby)
            popup.openPanel_Alert_Lobby("Mất kết nối");
            closeSlotKhoBau();

        },

        onReceived: function(cmd, pkg){
            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }
            data.init(pkg);
            var cmdId = data.getCmdId();

            switch(cmdId){

                case 1:
                {
                    cc.log("Received cmd login")

                    EventHandlerManager.getInstance().removeHandler("login");
                    var cmd = new CARD_GAME.CmdReceiveLogin(pkg);
                    var failError = cmd.getError();
                    cc.log("Eror: " + failError);
                    closeLoading();
                    if (failError == 0) {
                        //khoBauSubcribe(0);
                        //loadResoureGame(g_resources_mn, Minigame, function () {
                        //    openMiniGame();
                        //    //openMenuTab();
                        //});
                        lobby.lv_menu.setVisible(false);
                        lobby.pn_chat_event.setVisible(false);
                        openSlotKhoBau();
                        //openNuDiepVien();
                    }
                    cmd.clean();
                    break;
                }
                case KHOBAU_UPDATE_RESULT:
                    var cmd = new KhoBauResponseUpdateResult(pkg);
                    slotKhoBau.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case KHOBAU_UPDATE_POT:
                    var cmd = new KhoBauResponseUpdatePot(pkg);
                    slotKhoBau.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3);
                    cmd.clean();
                    break;
                case KHOBAU_FORCE_STOP_AUTO:
                    var cmd = new KhoBauResponseForceStopAuto(pkg);
                    slotKhoBau.forceStopAuto();
                    cmd.clean();
                    break;
                case KHOBAU_BIG_WIN:
                    var cmd = new KhoBauResponseBigWin(pkg);
                    slotKhoBau.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case KHOBAU_FREE:
                    var cmd = new KhoBauResponseFree(pkg)
                    slotKhoBau.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case KHOBAU_FREE_DAI_LY:
                    var cmd = new KhoBauResponseFreeDaiLy(pkg);
                    slotKhoBau.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;

            };
        }
    }
);
