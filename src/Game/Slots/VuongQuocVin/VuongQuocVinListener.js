/**
 * Created by Admin on 10/21/2016.
 */
//
VuongQuocVin.GameListener = cc.Class.extend(
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
           // window.location = HOST;
            //if(GameManager.getInstance().inGame){
            //    GameManager.getInstance().backToLobby();
            //}
            if(vuongQuocVin != null && !vuongQuocVin.isBackToLobby)
                popup.open_panel_message_OK("Thông báo","Kết nối mạng không ổn định, vui lòng thử lại sau!","Ok",function(){window.location = HOST;});
            else
            {
                window.location = HOST;
            }
           // closevuongQuocVin();

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
                        vuongQuocVinSubcribe(0);
                        loadResoureGame(g_resources_mn, Minigame, function () {
                            openMiniGame();
                            //openMenuTab();
                        });
                        //lobby.lv_menu.setVisible(false);
                        //lobby.pn_chat_event.setVisible(false);
                        //openvuongQuocVin();
                    }
                    else{
                        switch (failError){
                            case 1:
                                s = "LOGIN_ERROR";
                                popup.open_panel_message_OK("Thông Báo", "Phiên làm việc bạn đã hết hạn, vui lòng đăng nhập lại", "Ok", function(){window.location = HOST;});
                                break;
                            case 2:
                                s = "Bạn đã chặn không chơi game này.";
                                popup.open_panel_message_OK("Thông Báo", s, "Ok", function(){window.location = HOST;});
                                //popup.openPanel_Alert_Lobby(s);
                                break;
                            case 3:
                                s = "Hệ thống bảo trì";
                               // popup.openPanel_Alert_Lobby(s)
                                popup.open_panel_message_OK("Thông Báo", s, "Ok", function(){window.location = HOST;});
                                break;
                        }
                       // GameManager.getInstance().disconnect();

                    }

                    break;
                }
                case NDV_UPDATE_RESULT:
                    var cmd = new VuongQuocVinResponseUpdateResult(pkg);
                    vuongQuocVin.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case NDV_UPDATE_POT:
                    var cmd = new VuongQuocVinResponseUpdatePot(pkg);
                    vuongQuocVin.updatePot(cmd.valueRoom1,cmd.x2);
                    cmd.clean();
                    break;
                case NDV_FORCE_STOP_AUTO:
                    var cmd = new VuongQuocVinResponseForceStopAuto(pkg);
                    vuongQuocVin.forceStopAuto();
                    cmd.clean();
                    break;
                case NDV_BIG_WIN:
                    var cmd = new VuongQuocVinResponseBigWin(pkg);
                    vuongQuocVin.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case NDV_FREE:
                    var cmd = new VuongQuocVinResponseFree(pkg);
                    vuongQuocVin.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case NDV_DATE_X2:
                    var cmd = new VuongQuocVinResponseDateX2(pkg);
                    vuongQuocVin.setDateX2(cmd.dateX2);
                    vuongQuocVin.updateFree(cmd.remain,cmd.current_money);

                    cmd.clean();
                    break;
                case NDV_FREE_DAI_LY:
                    var cmd = new VuongQuocVinResponseFreeDaiLy(pkg);
                    vuongQuocVin.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;

            };
        }
    }
);
