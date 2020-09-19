/**
 * Created by vinplay on 2/4/17.
 */

XocDia.GameListener = CardGameListener.extend({
    ctor: function() {
        this._super();
    },

    onReceived: function(cmd, pkg) {
        if (cc.sys.isNative && useTCP) {
            var data = new engine.InPacket();
        }
        else {
            var data = new InPacket();
        }

        data.init(pkg);

        var cmdId = data.getCmdId();

        if (this.handleCmdCommon(cmdId, pkg)) {
            return;
        }
        switch (cmdId) {
            case XocDia.XocDiaCmd.JOIN_ROOM_SUCCESS:
            {
                cc.log("join room succes: ");
                var cmd = new XocDia.ReceiveJoinRoomSucceed(pkg);
                XocDia.gamelogic = new XocDia.GameLogic();
                XocDia.gamelogic.joinRoom(cmd);
                cmd.clean();
                if (menutab)
                    menutab.hideAllInfo();
                break;
            }
            case XocDia.XocDiaCmd.USER_JOIN_ROOM_SUCCESS:
            {
                cc.log("Received cmd user joinRoom succeed");
                var cmd = new XocDia.ReceiveUserJoinRoom(pkg);
                XocDia.gamelogic.UserjoinRoom(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.DANG_KY_THOAT_PHONG:
            {
                cc.log("dang ky thoat phong");
                var cmd = new XocDia.ReceiveRequestLeaveGame(pkg);
                GameScene.gameGui.orderOutRoom(cmd.nickname, cmd.bRegis);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.QUIT_ROOM:
            {
                cc.log("quit room");
                var cmd = new XocDia.ReceiveQuitRoom(pkg);
                if(cmd.reason == 1)
                    popup.openPanel_Alert_Lobby("Bạn không đủ tiền để tham gia phòng!");
                else if(cmd.reason == 2)
                    popup.openPanel_Alert_Lobby("Hệ thống đang tạm thời bảo trì!");
                else if(cmd.reason == 5)
                    popup.openPanel_Alert_Lobby("Bạn bị mời ra khỏi phòng vì quá lâu không tương tác!");
                else if(cmd.reason == 6)
                    popup.openPanel_Alert_Lobby("Nhà cái đã kick bạn ra khỏi phòng!");
                GameManager.getInstance().backToSelectRoom();
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.USER_OUT_ROOM:
            {
                var cmd = new XocDia.ReceiveUserOutRoom(pkg)
                cc.log("user out room" + cmd.nickname);
                if(GameScene.gameGui != null) {
                    GameScene.gameGui.userOutRoom(cmd.nickname);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.ORDER_BANKER:
            {
                cc.log("order banker");
                var cmd = new XocDia.ReceiveOrderBanker(pkg);
                if(cmd.error == 0){
                    GameScene.gameGui.showNotice("Đăng ký làm cái thành công!");
                    GameScene.gameGui.order_banker = true;
                }else if(cmd.error == 1){
                    if(xocdia.moneyType == 0)
                        GameScene.gameGui.showNotice("Bạn cần " + formatMoney(0,3,cmd.moneyRequire) + " Xu để làm cái!");
                    else
                        GameScene.gameGui.showNotice("Bạn cần " + formatMoney(0,3,cmd.moneyRequire) + " Vin để làm cái!");
                    GameScene.gameGui.btn_lam_cai.setEnabled(true);
                    GameScene.gameGui.btn_lam_cai.setBright(true);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.ACTION_IN_GAME:
            {
                cc.log("action in game");
                var cmd = new XocDia.ReceiveActionInGame(pkg);
                if(GameScene.gameGui != null) {
                    var stringNotify;
                    if (cmd.action == 1) {
                        stringNotify = "Bắt đầu ván mới!";
                        GameScene.gameGui.STATE_XOC_DIA = 1;
                        GameScene.gameGui.NewGame();
                    } else if (cmd.action == 2) {
                        stringNotify = "Bắt đầu đặt cửa!";
                        GameScene.gameGui.STATE_XOC_DIA = 2;
                    } else if (cmd.action == 3) {
                        stringNotify = "Bắt đầu bán cửa!";
                        GameScene.gameGui.STATE_XOC_DIA = 3;
                    }else if (cmd.action == 4) {
                        stringNotify = "Nhà cái cân tiền, hoàn tiền!";
                        GameScene.gameGui.STATE_XOC_DIA = 4;
                    } else if (cmd.action == 5) {
                        stringNotify = "Bắt đầu hoàn tiền!";
                        GameScene.gameGui.STATE_XOC_DIA = 5;
                    } else if (cmd.action == 6) {
                        stringNotify = "Bắt đầu trả thưởng!";
                        GameScene.gameGui.STATE_XOC_DIA = 6;
                    }
                    GameScene.gameGui.clock.setVisible(true);
                    GameScene.gameGui.clockShadow.setVisible(true);
                    GameScene.gameGui.showActionInGame(stringNotify);
                    GameScene.gameGui.countTime(cmd.time);
                    if(GameScene.gameGui.STATE_XOC_DIA != 2)
                        GameScene.gameGui.stopTurn();

                    GameScene.gameGui.showCancuaBanCua();

                    if(GameScene.gameGui.STATE_XOC_DIA == 1){
                        GameScene.gameGui.btn_lam_cai.setVisible(false);
                        GameScene.gameGui.btn_Huy_dat.setEnabled(false);
                        GameScene.gameGui.btn_Huy_dat.setBright(false);
                        if(GameScene.gameGui.is_pause_btn == false) {
                            cc.eventManager.pauseTarget(GameScene.gameGui.btn_lam_cai, true);
                            GameScene.gameGui.is_pause_btn = true;
                        }
                    }else{
                        GameScene.gameGui.drawStatusBegin();
                        if(GameScene.gameGui.banker == "") {
                            if(GameScene.gameGui.order_banker == false) {
                                if (GameScene.gameGui.roomWorld == false)
                                    GameScene.gameGui.btn_lam_cai.setVisible(true);
                            }
                            if(GameScene.gameGui.is_pause_btn == true) {
                                if (GameScene.gameGui.roomWorld == false) {
                                    cc.eventManager.resumeTarget(GameScene.gameGui.btn_lam_cai, true);
                                    GameScene.gameGui.is_pause_btn = false;
                                }
                            }
                        }
                        GameScene.gameGui.btn_Huy_dat.setEnabled(true);
                        GameScene.gameGui.btn_Huy_dat.setBright(true);
                    }
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.PUT_MONEY:
            {
                var cmd = new XocDia.ReceivePutMoney(pkg);
                cc.log("put money: error " + cmd.error + " nickname: " + cmd.nickname + " betMoney : " + cmd.betMoney + " potId : " + cmd.potId + " potMoney : " + cmd. potMoney + " currentMoney : " + cmd.currentMoney);
                GameScene.gameGui.responseUserPutMoney(cmd.error, cmd.nickname, cmd.betMoney, cmd.potId, cmd. potMoney, cmd.currentMoney, false);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.START_GAME:
            {
                var cmd = new XocDia.ReceiveStartGame(pkg);
                cc.log("banker: " + cmd.banker);
                if(GameScene.gameGui != null) {
                    GameScene.gameGui.setBankerPlayer(cmd.banker, cmd.moneyBanker, cmd.list_lock_gate);
                    GameScene.gameGui.txt_info.setString("Bàn: " + GameScene.gameGui.save_roomId);
                    GameScene.gameGui.txt_table.setString("#" + cmd.gameId);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.BANKER_SELL_GATE:
            {
                var cmd = new XocDia.ReceiveBankerSellGate(pkg);
                cc.log("action sell gate: " + cmd.action);
                if(cmd.action == 1)
                    GameScene.gameGui.showNotice("Nhà cái cân tất!");
                else{
                    if (GameScene.gameGui.banker != "me") {
                        if (cmd.action == 2) {
                            GameScene.gameGui.showNotice("Nhà cái bán cửa chẵn!");
                            GameScene.gameGui.chose_chan_le = 2;
                            GameScene.gameGui.btn_can_lech_cua.setTitleText("MUA CHẴN");
                            GameScene.gameGui.txt_buy_gate.setString("MUA CHẴN");
                        }else {
                            GameScene.gameGui.showNotice("Nhà cái bán cửa lẻ!");
                            GameScene.gameGui.chose_chan_le = 3;
                            GameScene.gameGui.btn_can_lech_cua.setTitleText("MUA LẺ");
                            GameScene.gameGui.txt_buy_gate.setString("MUA LẺ");
                        }
                        var currentMoney = 0;
                        if(GameScene.gameGui.moneyType == 1)
                            currentMoney = lobby.userInfo.vinTotal;
                        else
                            currentMoney = lobby.userInfo.xuTotal;
                        if(currentMoney > 0) {
                            GameScene.gameGui.btn_can_lech_cua.setVisible(true);
                            if (currentMoney > cmd.moneySell) {
                                if(GameScene.gameGui.banker == "")
                                    GameScene.gameGui.beginSellGate(cmd.moneySell);
                                else
                                    GameScene.gameGui.showSlider(cmd.moneySell);
                                GameScene.gameGui.btn_close_pnscroll.setVisible(true);
                            }else {
                                if(GameScene.gameGui.banker == "")
                                    GameScene.gameGui.beginSellGate(currentMoney);
                                else
                                    GameScene.gameGui.showSlider(currentMoney);
                                GameScene.gameGui.btn_close_pnscroll.setVisible(true);
                            }
                        }
                    }
                    GameScene.gameGui.pn_buy_gate.setVisible(true);
                    GameScene.gameGui.on_show_buy_gate.setVisible(true);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.BUY_GATE:
            {
                var cmd = new XocDia.ReceiveBuyGate(pkg);
                cc.log("error buy gate: " + cmd.error + " nickname : " + cmd.nickname + " tien sell la: " + cmd.rmMoneySell);
                var stringNotify;
                if(cmd.error == 1) {
                    GameScene.gameGui.showNotice("Bạn không đủ tiền để mua cửa!");
                }else if(cmd.error == 0){
                    GameScene.gameGui.buyGateSuccess(cmd.nickname, cmd.moneyBuy);
                }else if(cmd.error == 2){
                    GameScene.gameGui.showNotice("Nhà cái đã bán cửa xong!");
                }
                if(cmd.rmMoneySell > 0) {
                    cc.log("tien sell la2 :" + cmd.rmMoneySell);
                    if(GameScene.gameGui.banker != "me"){
                        if(cmd.rmMoneySell != 0) {
                            var currentmoney = 0;
                            if(GameScene.gameGui.moneyType == 1){
                                currentmoney = lobby.userInfo.vinTotal;
                            }else{
                                currentmoney = lobby.userInfo.xuTotal;
                            }
                            if(GameScene.gameGui.is_dont_want_buy == false) {
                                if (currentmoney > cmd.rmMoneySell) {
                                    GameScene.gameGui.showSlider(cmd.rmMoneySell);
                                    GameScene.gameGui.btn_can_lech_cua.setVisible(true);
                                } else {
                                    if (currentmoney > 0) {
                                        GameScene.gameGui.showSlider(currentmoney);
                                        GameScene.gameGui.btn_can_lech_cua.setVisible(true);
                                    } else {
                                        GameScene.gameGui.btn_can_lech_cua.setVisible(false);
                                        GameScene.gameGui.pn_scroll.setVisible(false);
                                    }
                                }
                            }
                        }
                    }else {
                        GameScene.gameGui.txt_money_hoan.setString(formatMoney(0, 3, cmd.rmMoneySell));
                    }

                }else{
                    GameScene.gameGui.btn_can_tat.setVisible(false);
                    GameScene.gameGui.btn_banker_hoantien.setVisible(false);
                    GameScene.gameGui.txt_money_hoan.setString("");
                    GameScene.gameGui.btn_can_lech_cua.setVisible(false);
                    GameScene.gameGui.pn_scroll.setVisible(false);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.REFUN_MONEY:
            {
                var cmd = new XocDia.ReceiveRefunMoney(pkg);
                cc.log("refun so nguoi : " + cmd.rfCount);
                if(GameScene.gameGui != null) {
                    GameScene.gameGui.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                        GameScene.gameGui.refunMoney(cmd);
                    })))
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.FINISH_GAME:
            {
                var cmd = new XocDia.ReceiveFinishGame(pkg);
                cc.log("finish game : ");
                if(GameScene.gameGui != null) {
                    GameScene.gameGui.runAction(cc.sequence(cc.delayTime(1),cc.callFunc(function(){
                        GameScene.gameGui.responseFinshGame(cmd);
                    })))
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.GET_TIME:
            {
                var cmd = new XocDia.ReceiveGetTime(pkg);
                cc.log("get time : " + cmd.time);
                GameScene.gameGui.txt_time.stopAllActions();
                GameScene.gameGui.countTime(cmd.time);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.HUY_LAM_CAI:
            {
                var cmd = new XocDia.ReceiveHuyLamCai(pkg);
                cc.log("xin huy lam cai : " + cmd.bDestroy);
                GameScene.gameGui.responseHuyLamCai(cmd.bDestroy);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.STOP_GAME:
            {
                var cmd = new XocDia.ReceiveStopGame(pkg);
                cc.log("stop game : ");
                var stringNotify;
                stringNotify = "Vui lòng đợi ván chơi mới!";
                if(GameScene.gameGui != null) {
                    GameScene.gameGui.showActionInGame(stringNotify);
                    GameScene.gameGui.StopGame(cmd.banker);
                }
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.SOI_CAU:
            {
                var cmd = new XocDia.ReceiveGetCau(pkg);
                cc.log("soi cau : ");
                GameScene.gameGui.drawSoiCau(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.MESSAGE_ERROR_BANKER:
            {
                var cmd = new XocDia.ReceiveMessageErrorBanker(pkg);
                cc.log("soi cau : " + cmd.error);
                if(cmd.error == 1)
                    GameScene.gameGui.showNotice("Bạn không đủ tiền để làm cái!");
                else if(cmd.error == 2)
                    GameScene.gameGui.showNotice("Đã có người chơi khác làm cái!");
                GameScene.gameGui.btn_lam_cai.setEnabled(true);
                GameScene.gameGui.btn_lam_cai.setBright(true);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.INFO_GATE_SELL:
            {
                var cmd = new XocDia.ReceiveInfoGateSell(pkg);
                cc.log("thong tin cua chan : " + cmd.moneyEven + " cua le: " + cmd.moneyOdd);
                GameScene.gameGui.info_sell_chan = cmd.moneyEven;
                GameScene.gameGui.info_sell_le = cmd.moneyOdd;
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.INFO_MONEY_AFTER_BANKER_SELL:
            {
                var cmd = new XocDia.ReceiveInfoMoneyAfterBankerSell(pkg);
                cc.log("thong tin money cho banker : " + cmd.money);
                GameScene.gameGui.txt_can_tat.setString("CÂN NỐT");
                GameScene.gameGui.txt_money_hoan.setString(formatMoney(0,3,cmd.money));
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.ACTION_BANKER:
            {
                var cmd = new XocDia.ReceiveActionBanker(pkg);
                cc.log("action banker : ");
                GameScene.gameGui.ActionBanker(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.LOCK_GATE:
            {
                var cmd = new XocDia.ReceiveLockGate(pkg);
                cc.log("lockgate : " + cmd.error + "trang thai : " + cmd.bChangeLock);
                GameScene.gameGui.LockGate(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.KICK_OUT_XOCDIA:
            {
                var cmd = new XocDia.ReceiveKickUser(pkg);
                cc.log("kick thanh cong : " + cmd.error);
                GameScene.gameGui.ReceiveKickUser(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.DESTROY_ROOM:
            {
                var cmd = new XocDia.ReceiveDestroyRoom(pkg);
                cc.log("huy ban : " + cmd.error + " trang thai : " + cmd.reqDestroyRoom );
                GameScene.gameGui.ReceiveDestroyRoom(cmd);
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.GET_MONEY_LAI:
            {
                var cmd = new XocDia.ReceiveChotLai(pkg);
                cc.log("chot lai : " + cmd.error);
                if(cmd.error == 0) {
                    GameScene.gameGui.showNotice("Rút lãi thành công!");
                    GameScene.gameGui.updateMoneyMasterRoom(cmd.currentmoney);
                }else if(cmd.error == 1)
                    GameScene.gameGui.showNotice("Bạn chưa có lãi!");
                cmd.clean();
                break;
            }
            case XocDia.XocDiaCmd.UPDATE_CURRENT_MONEY:
            {
                var cmd = new XocDia.ReceiveUpdateCurrentMoney(pkg);
                cc.log("update current money nickname : " + cmd.nickname + " money : " + cmd.currentmoney );
                GameScene.gameGui.updateCurrentmoney(cmd);
                cmd.clean();
                break;
            }
        }
    }
});