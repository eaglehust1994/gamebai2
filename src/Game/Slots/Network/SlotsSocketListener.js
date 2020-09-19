/**
 * Created by Admin on 3/14/2017.
 */
SlotsSocketListener = cc.Class.extend(
    {
        ctor:function(webSocket){
        },
        onFinishConnect:function(isSuccess){
            if(isSuccess) {
                cc.log("card game onFinishConnect succeed");
                //gameWsState = CLIENT_STATE.CONNECTED;
                lobby.socketSlot.isConnected = true;
                lobby.socketSlot.sendLogin();
                cc.log("lobby.socketSlot.isConnected: " + lobby.socketSlot.isConnected);
                lobby.isClickMenuSlot = false;
            }
            else{
                cc.log("card game onFinsishConect failed");
                waitingJoinGame = false;
                //gameWsState = CLIENT_STATE.NOT_CONNECTED;
                lobby.socketSlot.isConnected = false;
                closeLoading();
            }
        },

        onDisconnected:function(){
            waitingJoinGame = false;
            cc.log("Listener onDisconnected");
            closeLoading();

            lobby.socketSlot.isConnected = false;
            if(lobby.isClickMenuSlot && menutab.Islogout == false)
            {
                lobby.isClickMenuSlot = false;
                popup.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }

            lobby.isMenuSlots = false;
            lobby.chuyenMenu();

            for(var i = 0; i < gameListSlot.length; i ++)
            {
                if(lobby[gameListSlot[i].name].getStatusPlay())
                {
                    if(lobby[gameListSlot[i].name].getSlotsGame()!= null)
                    {
                        lobby[gameListSlot[i].name].getSlotsGame().isAutoRotate = false;
                        if(lobby[gameListSlot[i].name].getSlotsGame() == slotKhoBau)
                        {
                            if(cc.sys.isNative == false)
                            {
                                slotKhoBau.btn_tu_quay.setBright(true);
                                slotKhoBau.btn_quay.setBright(true);
                            }else
                            {
                                slotKhoBau.btn_tu_quay.loadTextures("res/SlotKhoBau/btn_tuquay.png","res/SlotKhoBau/btn_tuquay_s.png","res/SlotKhoBau/btn_tuquay_s.png");
                            }
                        }else if(lobby[gameListSlot[i].name].getSlotsGame() == nuDiepVien)
                        {
                            lobby[gameListSlot[i].name].getSlotsGame().btn_tu_quay.loadTextures("res/NuDiepVien/btn_tuquay.png","res/NuDiepVien/btn_tuquay_s.png","res/NuDiepVien/btn_tuquay_s.png");
                        }else if(lobby[gameListSlot[i].name].getSlotsGame() == avenger)
                        {
                            lobby[gameListSlot[i].name].getSlotsGame().btn_tu_quay.loadTextures("res/Avenger/btn_tuquay.png","res/Avenger/btn_tuquay_s.png","res/Avenger/btn_tuquay_s.png");
                        }
                    }

                }

            }

            closeSlotKhoBau();
            closeNuDiepVien();
            closeAvenger();
            closeVuongQuocVin();
            Slots.Content.isAutoRotate = false;
            Avenger.Content.isAutoRotate = false;
            NuDiepVien.Content.isAutoRotate = false;
            VuongQuocVin.Content.isAutoRotate = false;
            //closeAvenger();

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
                        lobby.socketSlot.sendSubScribe();

                        //lobby.lv_menu.setVisible(false);
                        //lobby.pn_chat_event.setVisible(false);
                        //openAvenger();
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
                    cmd.clean();
                    break;
                }
                case UPDATE_JACK_POTS:
                    var cmd = new SlotsResponseUpdatePots(pkg)
                    lobby.updatePotSlots(cmd.pots);
                    cmd.clean();
                    break;

                // case TDK_UPDATE_RESULT:
                //     var cmd = new TayDuKyResponseUpdateResult(pkg);
                //     cc.log("updateResult");
                //     tayDuKy.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.freeSpin,cmd.isFree,cmd.itemsWild,cmd.ratio);
                //     cmd.clean();
                //     break;
                // case TDK_UPDATE_POT:
                //     var cmd = new TayDuKyResponseUpdatePot(pkg);
                //     tayDuKy.updatePot(cmd.valueRoom1,cmd.x2);
                //     //cc.log("value = " + cmd.valueRoom1 );
                //     cmd.clean();
                //     break;
                // case TDK_FORCE_STOP_AUTO:
                //     var cmd = new TayDuKyResponseForceStopAuto(pkg);
                //     tayDuKy.forceStopAuto();
                //     cmd.clean();
                //     break;
                // case TDK_BIG_WIN:
                //     var cmd = new TayDuKyResponseBigWin(pkg);
                //     tayDuKy.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                //     cmd.clean();
                //     break;
                // case TDK_FREE:
                //     var cmd = new TayDuKyResponseFree(pkg);
                //     tayDuKy.updateEndFree(cmd.prize,cmd.ratio);
                //     //avenger.updateFree(cmd.remain);
                //     cmd.clean();
                //     break;
                // case TDK_DATE_X2:
                //     var cmd = new TayDuKyResponseDateX2(pkg);
                //     //tayDuKy.setDateX2(cmd.dateX2);
                //     //tayDuKy.updateFree(cmd.remain,cmd.current_money);
                //     //tayDuKy.checkFreeIngame(cmd.freeSpin,cmd.lines);
                //     cmd.clean();
                //     break;
                // case TDK_FREE_DAI_LY:
                //     var cmd = new TayDuKyResponseFreeDaiLy(pkg);
                //     //tayDuKy.showFreeDaiLy(cmd.remain);
                //     cmd.clean();
                //     break;


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

                case NDV_UPDATE_RESULT:
                    var cmd = new NuDiepVienResponseUpdateResult(pkg);
                    nuDiepVien.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case NDV_UPDATE_POT:
                    var cmd = new NuDiepVienResponseUpdatePot(pkg);
                    nuDiepVien.updatePot(cmd.valueRoom1,cmd.x2);
                    cmd.clean();
                    break;
                case NDV_FORCE_STOP_AUTO:
                    var cmd = new NuDiepVienResponseForceStopAuto(pkg);
                    nuDiepVien.forceStopAuto();
                    cmd.clean();
                    break;
                case NDV_BIG_WIN:
                    var cmd = new NuDiepVienResponseBigWin(pkg);
                    nuDiepVien.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case NDV_FREE:
                    var cmd = new NuDiepVienResponseFree(pkg);
                    nuDiepVien.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case NDV_DATE_X2:
                    var cmd = new NuDiepVienResponseDateX2(pkg);
                    nuDiepVien.setDateX2(cmd.dateX2);
                    nuDiepVien.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case NDV_FREE_DAI_LY:
                    var cmd = new NuDiepVienResponseFreeDaiLy(pkg);
                    nuDiepVien.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;



                case VQV_UPDATE_RESULT:
                    var cmd = new VuongQuocVinResponseUpdateResult(pkg);
                    vuongQuocVin.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney,cmd.isFreeSpin,cmd.ratio);
                    cmd.clean();
                    break;
                case VQV_UPDATE_POT:
                    var cmd = new VuongQuocVinResponseUpdatePot(pkg);
                    vuongQuocVin.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3,cmd.x21,cmd.x22);
                    cmd.clean();
                    break;
                case VQV_FORCE_STOP_AUTO:
                    var cmd = new VuongQuocVinResponseForceStopAuto(pkg);
                    vuongQuocVin.forceStopAuto();
                    cmd.clean();
                    break;
                case VQV_BIG_WIN:
                    var cmd = new VuongQuocVinResponseBigWin(pkg);
                    vuongQuocVin.updateBigWin(cmd.username,cmd.type,cmd.betValue,cmd.totalPrizes,cmd.timestampt);
                    cmd.clean();
                    break;
                case VQV_FREE:
                    var cmd = new VuongQuocVinResponseFree(pkg);
                    vuongQuocVin.updateFree(cmd.remain);
                    cmd.clean();
                    break;
                case VQV_DATE_X2:
                    var cmd = new VuongQuocVinResponseDateX2(pkg);
                    vuongQuocVin.setDateX2(cmd.dateX2);
                    vuongQuocVin.updateFree(cmd.remain);
                    vuongQuocVin.checkFreeIngame(cmd.freeSpin,cmd.lines, cmd.current_room);
                    cmd.clean();
                    break;
                case VQV_FREE_DAI_LY:
                    var cmd = new VuongQuocVinResponseFreeDaiLy(pkg);
                    vuongQuocVin.showFreeDaiLy(cmd.remain);
                    //
                    cmd.clean();
                    break;



                case KHOBAU_UPDATE_RESULT:
                    var cmd = new KhoBauResponseUpdateResult(pkg);
                    slotKhoBau.updateResult(cmd.ref,cmd.result,cmd.matrix,cmd.linesWin,cmd.haiSao,cmd.prize,cmd.currentMoney);
                    cmd.clean();
                    break;
                case KHOBAU_UPDATE_POT:
                    var cmd = new KhoBauResponseUpdatePot(pkg);
                    slotKhoBau.updatePot(cmd.valueRoom1,cmd.valueRoom2,cmd.valueRoom3,cmd.x21,cmd.x22);
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
                    slotKhoBau.setDateX2(cmd.ngayX2);
                    cmd.clean();
                    break;
                case KHOBAU_FREE_DAI_LY:
                    var cmd = new KhoBauResponseFreeDaiLy(pkg);
                    slotKhoBau.showFreeDaiLy(cmd.remain);
                    cmd.clean();
                    break;
                case UPDATE_KHO_BAU_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,mapMenuSlot.khoBau);
                    cmd.clean();
                    break;
                case UPDATE_VQV_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,mapMenuSlot.vuongQuocVin);
                    cmd.clean();
                    break;
                case UPDATE_NDV_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,mapMenuSlot.nuDiepVien);
                    cmd.clean();
                    break;
                case UPDATE_SAH_MINIMIZE:
                    var cmd = new SlotsResponseUpdateResultHall(pkg);
                    lobby.updateResultHall(cmd.result,cmd.prize,cmd.currentMoney,mapMenuSlot.sieuAnhHung);
                    cmd.clean();
                    break;
                case UPDATE_INFO_HALL:
                    var cmd = new SlotsResponseUpdateInfoHall(pkg);
                    lobby.updateAuto(cmd.autoKhoBau,cmd.autoNDV,cmd.autoSieuAnhHung,cmd.autoVuongQuocVin);
                    if(lobby.socketSlot.openGame == null)
                    {

                    }
                    else{
                        lobby.openGame(lobby.socketSlot.openGame);
                        lobby.socketSlot.openGame = null;
                    }
                    break;

            };
        }
    }
);