/**
 * Created by Admin on 10/21/2016.
 */
var Slots = {};
var NuDiepVien = {};
var Avenger = {};
var VuongQuocVin = {};
var TayDuKy = {};
Slots.SlotsWebSocket = WebsocketClient.extend({
    ctor: function(){
        this._super();
        this.isConnected = false;
        this.isLoginSocket = false;
        this.openGame = null;
    },

    connectToServer: function () {
        showLoading();
        this.isInit = true;
        var socketConfig = lobby.appConfig.khobau;
        if(socketConfig == null || socketConfig == undefined){
            return;
        }

        var ip = socketConfig.ip;
        var port = socketConfig.port;
        if(this.listener == null)
        {
            this.listener = new SlotsSocketListener();
        }
        cc.log(" card game connectToServer " + ip + ":" + port);
        gameWsState = CLIENT_STATE.CONNECTING;
        this.connect(ip, port, isHttps, this.listener);
    },
    disconnect: function () {
        cc.log("Disconnect bang tay");
        if(!cc.sys.isNative || !useTCP){
            this.ws.close();
        }else{
            this.ws.disconnect();
        }
        gameWsState = CLIENT_STATE.NOT_CONNECTED;
        cc.log("Disconnect bang tay end");

    },

    sendLogin: function () {
        // cc.log("Slots Send login to Server");
        var login = new CARD_GAME.CmdLogin();
        var nickName;
        var accessToken;
        if (lobby.userInfo) {
            nickName = lobby.userInfo.nickname;
            accessToken = lobby.userInfo.accessToken;
            cc.log("nickName, access: " + nickName + " " + accessToken);
            login.putData(nickName, accessToken);
            this.send(login);
            login.clean();
        }
    },

    sendSubScribe: function () {
        var pk = new CmdSendSubScribeHall();
        pk.putData();
        this.send(pk);
        pk.clean();
        lobby.isSubscribeMenuSlots = true;
    },
    sendUnSubScribe: function () {
        var pk = new CmdSendUnSubScribeHall();
        pk.putData();
        this.send(pk);
        pk.clean();
        lobby.isSubscribeMenuSlots = false;
    },

    sendJoinRoom: function (moneyType, maxNum, moneyBet, rule) {
        var pk = new CARD_GAME.CmdJoinRoom();
        cc.log("" + moneyType + " " + maxNum + " " + moneyBet);
        pk.putData(moneyType, maxNum, moneyBet, rule);
        this.send(pk);
        pk.clean();
    },

    sendGetMoneyBetConfig: function () {
        cc.log("card sendGetMoneyBetConfig");
        var packet = new CARD_GAME.SendGetGameConfig();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendTopServer: function (type) {
        var packet = new CARD_GAME.SendGetTopServer();
        packet.putData(type);
        this.send(packet);
        packet.clean();
    },

    sendReconnect: function(){
        cc.log("card  send reconnect");
        var packet = new CARD_GAME.CmdReconnectRoom();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendThongTinHuVang: function(){
        cc.log("card  send thong tin hu vang");
        var packet = new CARD_GAME.CmdSendThongTinHuVang();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendPingPong: function () {
        cc.log("send pingPong");
        var packet = new CARD_GAME.CmdSendPing();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendPingTest: function () {
        var packet = new CARD_GAME.CmdSendPingTest();
        packet.putData(curLongTes);
        this.send(packet);
        packet.clean();
    },

    sendChatRoom: function(isIcon, content){
        cc.log("send ChatRoom: isIcon = " + isIcon + ", content = " + content);

        var packet = new CARD_GAME.SendChatRoom();
        packet.putData(isIcon, content);
        this.send(packet);
        packet.clean();
    },

    sendMoiChoi: function(){
        cc.log("send Moi Choi");
        var packet = new CARD_GAME.SendMoiChoi();
        this.send(packet);
        packet.clean();
    },

    send: function(pk){
        cc.log("state: " + gameWsState);
        if(!this.isConnected ){
            cc.log("khong duoc send when not connected")
        }else{
            WebsocketClient.prototype.send.call(this, pk);
        }
    }


});

var CmdSendSubScribeHall = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(SUBSCRIBE_HALL);

        },
        putData:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdSendUnSubScribeHall = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(UNSUBSCRIBE_HALL);

        },
        putData:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

