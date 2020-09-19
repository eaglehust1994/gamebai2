/**
 * Created by Admin on 10/21/2016.
 */
//
Avenger.GameListener = cc.Class.extend(
    {
        ctor:function(){

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
            //gameWsState = GameManager.CLOSED;
            gameWsClient = null;

            userGameData.setItem("currentGame", "-1");
            GameManager.getInstance.currentGame = -1;
            //window.location = HOST;
            //if(GameManager.getInstance().inGame){
            //    GameManager.getInstance().backToLobby();
            //}
            if(avenger != null && !avenger.isBackToLobby)
            popup.openPanel_Alert_Lobby("Mất kết nối");
            closeAvenger();

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
            //cc.log("cmdId = " + cmdId);
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
                        //NuDiepVienSubcribe(0);
                        //loadResoureGame(g_resources_mn, Minigame, function () {
                        //    openMiniGame();
                        //    //openMenuTab();
                        //});
                        lobby.lv_menu.setVisible(false);
                        lobby.pn_chat_event.setVisible(false);
                        openAvenger();
                    }
                    cmd.clean();
                    break;
                }
                case AVENGER_UPDATE_RESULT:
                    var cmd = new AvengerResponseUpdateResult(pkg);
                    cc.log("updateResult");
                    avenger.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.freeSpin,cmd.isFree,cmd.itemsWild,cmd.ratio);
                    cmd.clean();
                    break;
                case AVENGER_UPDATE_POT:
                    var cmd = new AvengerResponseUpdatePot(pkg);
                    avenger.updatePot(cmd.valueRoom1,cmd.x2);
                    //cc.log("value = " + cmd.valueRoom1 );
                    cmd.clean();
                    break;
                case AVENGER_FORCE_STOP_AUTO:
                    var cmd = new AvengerResponseForceStopAuto(pkg);
                    avenger.forceStopAuto();
                    cmd.clean();
                    break;
                case AVENGER_BIG_WIN:
                    var cmd = new AvengerResponseBigWin(pkg);
                    avenger.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case AVENGER_FREE:
                    var cmd = new AvengerResponseFree(pkg);
                    avenger.updateEndFree(cmd.prize,cmd.ratio);
                    //avenger.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case AVENGER_DATE_X2:
                    var cmd = new AvengerResponseDateX2(pkg);
                    avenger.setDateX2(cmd.dateX2);
                    avenger.updateFree(cmd.remain,cmd.current_money);
                    avenger.checkFreeIngame(cmd.freeSpin,cmd.lines);
                    cmd.clean();
                    break;
                case AVENGER_FREE_DAI_LY:
                    var cmd = new AvengerResponseFreeDaiLy(pkg);
                    avenger.showFreeDaiLy(cmd.remain);
                    cmd.clean();
                    break;

            };
        }
    }
);
