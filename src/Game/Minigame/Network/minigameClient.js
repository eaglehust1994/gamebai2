var countOnConect = 3;

var MinigameListener = cc.Class.extend(
    {
        ctor:function(){
            this.isLoggined = false;
        },
        onFinishConnect:function(isSuccess){
            // cc.log("MinigameListener Finish connect Minigame" + isSuccess);
            Minigame.isConnectSocket = isSuccess;

            if(isSuccess){
                login();

            }else
            {
                Minigame.isLoginSocket = false;
                Minigame.stopAllActions();
                if(menutab.Islogout == false)
                {
                    if(Minigame.isSelect) {

                        Minigame.isSelect = false;
                        popup.openPanel_Alert_Lobby("Không kết nối được mini game ");
                    }
                    /*Minigame.runAction(cc.sequence(cc.delayTime(10),cc.callFunc(function(){
                        if(countOnConect == 0 || Minigame.isSelect)
                        {
                            Minigame.isSelect = false;

                            countOnConect--;
                        }else
                        {
                            countOnConect = -1;
                            //Minigame.connectSocket();
                        }
                    })));*/


                }

            }
        },
        onDisconnected:function(){
            // cc.log("MinigameListener Finish connect Minigame" );
            // cc.log("MinigameListener countOnConect = " + countOnConect);
            Minigame.isLoginSocket = false;
            if(menutab.Islogout == true){
                Minigame.isConnectSocket = false;
            }else{
                if (countOnConect > 0) {
                    //Minigame.connectSocket();
                    Minigame.isSelect = false;
                    countOnConect = countOnConect - 1;
                    Minigame.connectSocket();
                }else{
                    Minigame.isConnectSocket = false;
                    if(countOnConect == 0 || Minigame.isSelect)
                    {
                        //popup.openPanel_Alert_Lobby("Mất kết nối mini game, minigame sẽ tự động kết nối sau 10s");
                        countOnConect--;
                    }else
                    {
                        countOnConect =- 1;
                    }

                }
            }

            menutab.close_list_hu();

            if(taiXiu!= null)
            {
                closeTaiXiu();

            }
            if(vongquay!=null)
            {
                closeVongquay();
            }
            if(miniPoker!=null)
            {
                closeMiniPoker();
            }
            if(caothap!=null)
            {
                closeCaoThap();
            }
            if(baucua!=null)
            {
                closeBauCua();
            }
            if(slot3hang!=null)
            {
                closeslot3hang();
                slot3hang.forceStopAuto();
            }
            lobby.pn_chat.setVisible(false);
            lobby.pn_event.setVisible(true);
        },
        onReceived:function(cmd, pkg){
            //var data = new InPacket();
            //
            //data.init(pkg);

            if(cc.sys.isNative && useTCP){
                var data = new engine.InPacket();
            }
            else{
                var data = new InPacket();
            }

            data.init(pkg);

            var cmdId = data.getCmdId();
            var cmd = null;
            switch (data.getCmdId())
            {
                case MN_LOGIN:

                    countOnConect = 3;
                    this.isLoggined = true;
                    Minigame.isLoginSocket = true;
                    Minigame.isSelect = false;
                    lobby.getRandomBanner(0,1);
                    if(lobby.userInfo.luckyRotate > 0 && lobby.isShowSlots == false) {
                        loadResoureGame(g_resources_mn_vqmm,vongquay,function(){openVongquay();});
                    }
                    if((Minigame.countSelect == MinigameLayer.BTN_TAI_XIU))
                    {
                        loadResoureGame(g_resources_mn_tai_xiu,taiXiu,function(){openTaiXiu();});
                    }

                    if(Minigame.countSelect == MinigameLayer.BTN_BAU_CUA)
                    {
                        loadResoureGame(g_resources_mn_bau_cua,baucua,function(){openBauCua();});
                    }

                    if(Minigame.countSelect == MinigameLayer.BTN_CAO_THAP)
                    {
                        loadResoureGame(g_resources_mn_cao_thap,caothap,function(){openCaoThap();});
                    }
                    if(Minigame.countSelect == MinigameLayer.BTN_POKER)
                    {
                        loadResoureGame(g_resources_mn_poker,miniPoker,function(){
                            openMiniPoker();
                            subScribeMiniPoker(miniPoker.MINI_POKER_ROOM);

                        });

                    }
                    if(Minigame.countSelect == MinigameLayer.BTN_MINI_SLOT)
                    {
                        loadResoureGame(g_resources_mn_pokego,slot3hang,function(){openslot3hang();});
                        openslot3hang();
                    }
                    if(cc.sys.os == cc.sys.OS_ANDROID) {
                        if (parseInt(ConnectNative.versionCode()) >= 10) {
                            iapManager.setTarget(lobby, lobby.onPurchaseGG.bind(lobby));
                            iapManager.checkItemWhenMinigameConnected();
                        }
                    }
                    menutab.runAction(cc.sequence(cc.delayTime(1.5),cc.callFunc(function(){
                        menutab.funGetInfoEventVippoint();
                    })));
                    if(!cc.sys.isNative) {
                        //menutab.pn_list_hu.x = -205.00;
                        menutab.show_list_hu();
                    }
                    break;
                case UPDATE_TIME_TAI_XIU:
                    cmd = new CmdTXUpdateTimeTaiXiu(pkg);
                    Minigame.updateTimeTaiXiu(cmd.remainTime,cmd.bettingState);

                    break;
                case UPDATE_TAI_XIU_PER_SECOND:
                    cmd = new CmdUpdateTaiXiu(pkg);
                    taiXiu.responseUpdateTaiXiu(cmd.remainTime,cmd.bettingState,cmd.potTai,cmd.potXiu,cmd.numBetTai,cmd.numBetXiu);
                    break;
                case TAI_XIU_INFO:
                    cmd = new CmdTaiXiuInfo(pkg);
                    if(taiXiu!=null)
                    taiXiu.responseTaiXiuInfo(cmd.gameId,cmd.moneyType,cmd.referenceId, cmd.remainTime, cmd.bettingState,cmd.potTai,cmd.potXiu,cmd.betTai,cmd.betXiu,cmd.dice1,cmd.dice2,cmd.dice3,cmd.remainTimeRutLoc);

                    break;
                case MN_UPDATE_USER_INFO:
                    cmd = new CmdUpdateMoney(pkg);
                    lobby.updateMoney(cmd.currentMoney,cmd.moneyType);
                    break;
                case MN_POP:
                    cmd = new CmdPopMinigame(pkg);
                    break;

                case UPDATE_RESULT_DICES:
                    cmd = new CmdUpdateResultDices(pkg);
                    if(taiXiu)
                    taiXiu.responseTaiXiu(cmd.result,cmd.dice1,cmd.dice2,cmd.dice3);
                    break;
                case UPDATE_PRIZE_TAI_XIU:

                    cmd = new CmdUpdatePrizeTaiXiu(pkg);
                    if(taiXiu)
                    taiXiu.responsePrizeTaiXiu(cmd.moneyType,cmd.totalMoney,cmd.currentMoney);
                    break;
                case  BET_TAI_XIU:
                    cmd = new CmdBetTaiXiu(pkg);
                    if(taiXiu)
                    taiXiu.responseBetTaiXiuSuccess(cmd.result,cmd.currentMoney);
                    break;
                case  START_NEW_GAME_TAI_XIU:
                    cmd = new CmdStartNewGameTaiXiu(pkg);
                    taiXiu.responseStartNewGameTaiXiu(cmd.referenceId,cmd.remainTimeRutLoc);
                    break;
                case LICH_SU_PHIEN_TAI_XIU:
                    cmd = new CmdLichSuTaiXiu(pkg);
                    taiXiu.responseLichSuPhien(cmd.data);
                    break;
                case TX_TAN_LOC:
                    cmd = new CmdTXTanLoc(pkg);
                    taiXiu.responseTanLoc(cmd.result,cmd.currentMoney);
                    break;
                case TX_RUT_LOC:
                    cmd = new CmdTXRutLoc(pkg);
                    taiXiu.responseRutLoc(cmd.prize,cmd.currentMoney);
                    break;
                case UPDATE_QUY_LOC:
                    cmd = new CmdTXUpdateQuyLoc(pkg);
                    taiXiu.responseUpdateHuLoc(cmd.value);
                    break;
                case START_NEW_ROUND_RUT_LOC:
                    cmd = new CmdTXStartRutLoc(pkg);
                    taiXiu.responseStartRutLoc(cmd.remainTime);
                    break;
                case UPDATE_LUOT_RUT_LOC:
                    cmd = new CmdTXUpdateSoLuotRutLoc(pkg);
                    taiXiu.responseUpdateLuotRutLoc(cmd.soLuotRut);
                    break;
                case ENABLE_RUT_LOC:
                    taiXiu.startRutLoc();
                    break;
                /// vqmm
                case START_NEW_VQMM:
                    cmd = new CmdStartVQMM(pkg);
                    vongquay.responseVQMM(cmd.error, cmd.prizeVin,cmd.prizeXu,cmd.prizeSlot,cmd.remainCount, cmd.currentMoneyVin, cmd.currentMoneyXu);
                    break;
                /// minipoker
                case PLAY_MINI_POKER:
                    cmd = new CmdReceivedPlayMiniPoker(pkg);
                    miniPoker.responsePlayMiniPoker(cmd.result,cmd.prize,cmd.card1, cmd.card2, cmd.card3, cmd.card4, cmd.card5, cmd.currentMoney);
                    break;
                case UPDATE_POT_MINIPOKER:
                    cmd = new CmdUpdateMiniPoker(pkg);
                    miniPoker.responseUpdateMiniPoker(cmd.value);
                    break;
                /// caothap
                case FORCE_STOP_AUTO_PLAY:
                    cmd = new CmdReceivedStopAutoPlay(pkg);
                    miniPoker.responseStopAutoMiniPoker();
                    break;
                case USER_INFO_CAO_THAP:
                    cmd = new CmdReceivedUserInfoCaoThap(pkg);
                    caothap.responseUserInfoCaoThap(cmd.numA, cmd.card, cmd.money1, cmd.money2, cmd.money3, cmd.time, cmd.step, cmd.referenceId, cmd.cards);
                    break;
                case START_PLAY_CAO_THAP:
                    cmd = new CmdReceivedStartCaoThap(pkg);
                    caothap.responseStartCaoThap(cmd.error, cmd.referenceId,cmd.card,cmd.money1, cmd.money2, cmd.money3, cmd.currentMoney);
                    break;
                case PLAY_CAO_THAP:
                    cmd = new CmdReceivedPlayCaoThap(pkg);
                    caothap.responsePlayCaoThap(cmd.card,cmd.money1, cmd.money2, cmd.money3);
                    break;
                case UPDATE_POT_CAO_THAP:
                    cmd = new CmdUpdatePotPlayCaoThap(pkg);
                    caothap.responseUpdatePotCaoThap(cmd.value);
                    break;
                case STOP_PLAY_CAO_THAP:
                    cmd = new CmdReceivedStopCaoThap(pkg);
                    caothap.responseStopCaoThap(cmd.result, cmd.currentMoney, cmd.moneyExchange);
                    break;
                case UPDATE_TIME_CAO_THAP:
                    cmd = new CmdReceivedUpdateTimeCaoThap(pkg);
                    caothap.responseUpdateTimeCaoThap(cmd.time);
                    break;
                case SUBSCRIBE_CAO_THAP:
                    cmd = new CmdReceivedSubscribeCaoThap(pkg);
                    caothap.responseReceivedSubcribeCaoThap(cmd.status, cmd.roomId);
                    break;
                case CHANGE_ROOM_CAO_THAP:
                    cmd = new CmdReceivedChangeRoomCaoThap(pkg);
                    caothap.responseReceivedChangeRoomCaoThap(cmd.status);
                    break;
                //Bàu cua
                case BC_INFO:
                    cmd = new BCResponseInfo(pkg);
                    baucua.responseInfo(cmd.referenceId,cmd.remainTime,cmd.bettingState,cmd.potData,cmd.betData,cmd.lichSuPhien,cmd.dice1,cmd.dice2,cmd.dice3,cmd.xPot,cmd.xValue,cmd.room);
                    break;
                case BC_BET:
                    cmd = new BCResponseBet(pkg);
                    baucua.responseBet(cmd.result,cmd.currentMoney);
                    break;
                case BC_START_NEW_GAME:
                    cmd = new BCResponseStartNewGame(pkg);
                    baucua.responseStartNewGame(cmd.referenceId);
                    break;
                case BC_UPDATE:
                    cmd = new BCResponseUpdate(pkg);
                    if(baucua)
                    baucua.responseUpdate(cmd.potData,cmd.remainTime,cmd.bettingState);
                    break;
                case BC_RESULT:
                    cmd = new BCResponseResult(pkg);
                    if(baucua)
                    baucua.responseResult(cmd.dice1,cmd.dice2,cmd.dice3,cmd.xPot,cmd.xValue)
                    break;
                case BC_PRIZE:
                    cmd = new BCResponsePrize(pkg);
                    if(baucua)
                    baucua.responsePrize(cmd.prize,cmd.currentMoney,cmd.room);
                    break;

                //pokemon
                case PKM_UPDATE_RESULT:
                    cmd = new PKMResponseUpdateResult(pkg);
                    slot3hang.updateResult(cmd.result,cmd.matrix,cmd.linesWin,cmd.prize,cmd.currentMoney);
                    break;
                case PKM_UPDATE_POT:
                    cmd = new PKMResponseUpdatePot(pkg);
                    slot3hang.updatePot(cmd.value,cmd.x2);
                    break;
                case PKM_FORCE_STOP_AUTO:
                    cmd = new PKMResponseForceStopAuto(pkg);
                    slot3hang.forceStopAuto();
                    break;
                case PKM_DATE_X2:
                    cmd = new PKMResponseDateX2(pkg);
                    //slot3hang
                    slot3hang.setDateX2(cmd.date);
                    break;

                // GiftCode
                case GIFTCODE:
                    cmd = new CmdReceivedGiftCode(pkg);
                    giftcode.responseGiftCode(cmd.error,cmd.currentMoneyVin, cmd.currentMoneyXu, cmd.moneyGiftCodeVin, cmd. moneyGiftCodeXu);
                    break;
                // CheckNickName
                case CHECK_NICK_NAME:
                    cmd = new CmdReceivedCheckNickName(pkg);
                    chuyenkhoan.responsenickname(cmd.error, cmd.type, cmd.fee);
                    break;
                // RECHARGE_XU
                case RECHARGE_XU:
                    cmd = new CmdReceivedRechargeXu(pkg);
                    shopping_info.responseRechargeXu(cmd.error);
                    break;
                case RESULT_RECHARGE_XU:
                    cmd = new CmdReceivedResultRechargeXu(pkg);
                    shopping_info.responseResultRechargeXu(cmd.error, cmd.currentMoneyVin, cmd.currentMoneyXu);
                    break;
                // RECHARGE_VIN
                case RECHARGE_VIN:
                    cmd = new CmdReceivedRechargeVin(pkg);
                    shopping_info.responseRechargeVin(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // RECHARGE_VINPLAY
                case RECHARGE_VINPLAY_CARD:
                    cmd = new CmdReceivedRechargeVinPlayCard(pkg);
                    shopping_info.responseRechargeVinplayCard(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // RECHARGE_VINPLAY
                case RECHARGE_MEGA_CARD:
                    cmd = new CmdReceivedRechargeMegaCard(pkg);
                    shopping_info.responseRechargeMegaCard(cmd.error, cmd.currentMoney, cmd.timeFail, cmd.numFail);
                    break;
                // CONFIRM OTP
                case SEND_OTP:
                    cmd = new CmdReceivedSendOTP(pkg);
                    if(panel_otp == null){
                        openpn_otp("",0);
                        panel_otp.responseSendOtp(cmd.error);
                    }else
                        panel_otp.responseSendOtp(cmd.error);
                    break;
                // BROADCAST_MESSAGE
                case BROADCAST_MESSAGE:
                    cmd = new CmdReceivedBroadcastmessage(pkg);
                    menutab.responseBroadcastMessage(cmd.message);
                    break;
                // CHANGEPASSWORD
                case CHANGEPASS:
                    cmd = new CmdReceivedChangePassword(pkg);
                    profileUser.responseChangePassword(cmd.error);
                    break;
                case RESULT_CHANGEPASS:
                    cmd = new CmdReceivedResultChangePassword(pkg);
                    profileUser.responseResultChangePassword(cmd.error);
                    break;
                // EXCHANGE VIPPOINT
                case EXCHANGE_VIPPOINT:
                    cmd = new CmdReceivedExchangeVippint(pkg);
                    profileUser.responseExchangeVippoint(cmd.error);
                    break;
                case RESULT_EXCHANGE_VIPPOINT:
                    cmd = new CmdReceivedResultExchangeVippint(pkg);
                    profileUser.responseResultExchangeVippoint(cmd.error, cmd.currentMoney, cmd.moneyAdd);
                    break;
                // UPDATE USER INFO
                case UPDATE_USER_INFO:
                    cmd = new CmdReceivedUpdateUserInfo(pkg);
                    sercurity_info.responseUpdateUserInfo(cmd.error);
                    break;
                case UPDATE_EMAIL_USER:
                    cmd = new CmdReceivedUpdateEmail(pkg);
                    sercurity_info.responseUpdateEmail(cmd.error);
                    break;
                case UPDATE_PHONE_USER:
                    cmd = new CmdReceivedUpdatePhone(pkg);
                    sercurity_info.responseUpdatePhone(cmd.error);
                    break;
                case ACTIVE_EMAIL:
                    cmd = new CmdReceivedActiveEmail(pkg);
                    sercurity_info.responseActiveEmail(cmd.error);
                    break;
                case ACTIVE_MOBILE:
                    cmd = new CmdReceivedActivePhone(pkg);
                    sercurity_info.responseActivePhone(cmd.error);
                    break;
                case RESULT_ACTIVE_MOBILE:
                    cmd = new CmdReceivedResultActivePhone(pkg);
                    sercurity_info.responseResultActivePhone(cmd.error);
                    break;
                /// EXCHANGE MOBILE ACTIVED
                case EXCHANGE_MOBILE_ACTIVED:
                    cmd = new CmdReceivedExchangeMobileActived(pkg);
                    sercurity_info.responseExchangeMobileActived(cmd.error);
                    break;
                case RESULT_EXCHANGE_MOBILE_ACTIVED:
                    cmd = new CmdReceivedResultExchangeMobileActived(pkg);
                    sercurity_info.responseResultExchangeMobileActived(cmd.error);
                    break;
                case RESULT_ACTIVE_NEW_MOBILE:
                    cmd = new CmdReceivedResultActiveNewMobile(pkg);
                    sercurity_info.responseResultActiveNewMobile(cmd.error);
                    break;
                /// GET INFORMATION SERCURITY
                case GET_INFORMATION_SERCURITY:
                    cmd = new CmdReceivedGetInformationSercurity(pkg);
                    sercurity_info.responseGetInformationSercurity(cmd.error, cmd.username, cmd.cmt, cmd.email, cmd.mobile, cmd.mobileSecure, cmd.emailSecure, cmd.appSecure, cmd.loginSecure, cmd.moneyLoginOtp, cmd.moneyUse, cmd.safe, cmd.configGame);
                    break;
                /// SERCURITY LOGIN
                case SERCURITY_LOGIN:
                    cmd = new CmdReceivedSercurityLogin(pkg);
                    sercurity_info.responseSercurityLogin(cmd.error);
                    break; CmdReceivedConfigGames
                /// CONFIG_GAMES
                case CONFIG_GAMES:
                    cmd = new CmdReceivedConfigGames(pkg);
                    sercurity_info.responseConfigGames(cmd.error);
                    break;
                /// SAFE MONEY
                case SAFE_MONEY:
                    cmd = new CmdReceivedSafeMoney(pkg);
                    sercurity_info.responseSafeMoney(cmd.error, cmd.moneyUse, cmd.safe);
                    break;
                case RESULT_SAFE_MONEY:
                    cmd = new CmdReceivedResultSafeMoney(pkg);
                    sercurity_info.responseResultSafeMoney(cmd.error, cmd.moneyUse, cmd.safe, cmd.currentMoney);
                    break;
                /// EXCHANGE_VIN
                case EXCHANGE_VIN:
                    cmd = new CmdReceivedExchangeVin(pkg);
                    chuyenkhoan.responseExchangeMoney(cmd.error, cmd.moneyUse);
                    break;
                case RESULT_EXCHANGE_VIN:
                    cmd = new CmdReceivedResultExchangeVin(pkg);
                    chuyenkhoan.responseResultExchangeMoney(cmd.error, cmd.moneyUse, cmd.currentMoney);
                    break;
                //Get MoneyUse
                case GET_MONEYUSE:
                    cmd = new CmdReceivedGetMoneyUse(pkg);
                    shopping_info.responseGetMoneyUse(cmd.moneyUse);
                    break;
                //Buy Card Mobile
                case BUY_CARD:
                    cmd = new CmdReceivedBuyCardMobile(pkg);
                    shopping_info.responseBuyCard(cmd.error);
                    break;
                case RESULT_BUY_CARD:
                    cmd = new CmdReceivedResultBuyCardMobile(pkg);
                    shopping_info.responseResultBuyCard(cmd.error, cmd.currentMoney, cmd.softpin);
                    break;
                //Recharge Mobile
                case RECHARGE_MOBILE:
                    cmd = new CmdReceivedRechargeMobile(pkg);
                    shopping_info.responseRechargeMobile(cmd.error);
                    break;
                case RESULT_RECHARGE_MOBILE:
                    cmd = new CmdReceivedResultRechargeMobile(pkg);
                    shopping_info.responseResultRechargeMobile(cmd.error, cmd.currentMoney);
                    break;
                case UPDATE_JACKPOT:
                    cmd = new CmdReceivedUpdateJackpot(pkg);
                    menutab.responseUpdateJackpot(cmd.miniPoker100, cmd.miniPoker1000, cmd.miniPoker10000, cmd.pokeGo100, cmd.pokeGo1000, cmd.pokeGo10000, cmd.khoBau100, cmd.khoBau1000, cmd.khoBau10000,
                    cmd.NDV100, cmd.NDV1000, cmd.NDV10000, cmd.Avengers100, cmd.Avengers1000, cmd.Avengers10000, cmd.Vqv100, cmd.Vqv1000, cmd.Vqv10000);
                    break;
                case RECHARGE_BANK:
                    cmd = new CmdReceivedRechargeBank(pkg);
                    shopping_info.responseRechargeBank(cmd.error, cmd.url);
                    break;
                //Kick User
                case KICK_USER:
                    cmd = new CmdReceivedKickUser(pkg);
                    Minigame.responseKickUser(cmd.error);

                    break;
                //Pot Game bai
                case POT_GAME_BAI:
                    cmd = new CmdReceivedPotGameBai(pkg);
                    menutab.responsePotGameBai(cmd.huBaCay, cmd.huBaiCao, cmd.huBinh, cmd.huSam, cmd.huTLMN);
                    break;
                //Chat Lobby
                case SEND_CHAT:
                    cmd = new CmdReceivedSendChat(pkg);
                    lobby.responseSendChat(cmd.error, cmd.nickname, cmd.message);
                    break;
                case LOG_CHAT:
                    cmd = new CmdReceivedLogChat(pkg);
                    lobby.responseLogChat(cmd.message, cmd.minVipPoint, cmd.timeBan, cmd.userType);
                    break;
                /// IAP
                case CHECK_IAP:
                    cmd = new CmdReceivedCheckIAP(pkg);
                    lobby.responseCheckIAP(cmd.error);
                    break;
                case RESULT_IAP:
                    cmd = new CmdReceivedResultIAP(pkg);
                    lobby.responseResultIAP(cmd.error, cmd.sku, cmd.currentMoney);
                    break;
                // Event Vippoint
                case EVENT_VIPPOINT:
                    cmd = new CmdReceivedEventVippoint(pkg);
                    menutab.responseEventVippoint(cmd.status, cmd.time);
                    break;

                // New Mail
                case NEW_MAIL:
                    cmd = new CmdReceivedNewMail(pkg);
                    Minigame.responseHasNewMail();
                    break;
                // Event Dragon
                case EVENT_VP_DRAGON:
                    cmd = new CmdReceivedEventDragon(pkg);
                    menutab.responseHasEventDragon();
                    break;
                // VQ VIP
                case GET_VONGQUAY_VIP:
                    cmd = new CmdReceivedGetVongQuayVip(pkg);
                    vq_vip.responseGetVongQuayVip(cmd.remainCount);
                    break;
                case PLAY_VONGQUAY_VIP:
                    cmd = new CmdReceivedPlayVongQuayVip(pkg);
                    vq_vip.responsePlayVongQuayVip(cmd.error, cmd.prizeVin, cmd.prizeMulti, cmd.remainCount, cmd.currentMoneyVin);
                    break;
            }
            if(cmd!= null)
            {
                cmd.clean();
            }
        }
    }
);

var CmdSendLogin = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(1);
        },
        putData:function(username, accessToken){
            //pack
            this.packHeader();
            this.putString(username);
            this.putString(accessToken);
            //update
            this.updateSize();
        }
    }
);
function login()
{
    var lo = new CmdSendLogin();
    if(lobby.userInfo)
    {
        var nn = lobby.userInfo.nickname;

        var accessToken = lobby.userInfo.accessToken;
        lo.putData(nn,accessToken);
        Minigame.miniGameClient.send(lo);
        lo.clean();
    }


}
