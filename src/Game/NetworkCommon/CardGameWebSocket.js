//
var CLIENT_STATE = {
    NOT_CONNECTED : 0,
    CONNECTING: 1,
    CONNECTED: 2
};

var CARD_GAME = {};

var CardGameWebSocket = WebsocketClient.extend({
    ctor: function(){
        this._super();
    },

    connectToServer: function (gameType) {
        cc.log("connectToServer");
        var issl = false;
        this.isInit = true;
        var socketConfig = lobby.getConfigByType(gameType);

        if(socketConfig == null || socketConfig == undefined){
            return;
        }

        var ip = socketConfig.ip;
        var port = socketConfig.port;

        if(gameType == GameList.XiZach){
            //ip = "192.168.0.151";
            //port = 1444;
            var listener = this.getListenerByType(gameType);
            // cc.log(" card game connectToServer " + ip + ":" + port);
            gameWsState = CLIENT_STATE.CONNECTING;
            this.connect(ip, port, isHttps, listener);
            return;
        }

        var listener = this.getListenerByType(gameType);
        // cc.log(" card game connectToServer " + ip + ":" + port);
        gameWsState = CLIENT_STATE.CONNECTING;
        this.connect(ip, port, isHttps, listener);
    },

    getListenerByType: function (gameType) {
        switch (gameType) {
            case GameList.SamSoLo:
            case GameList.SamThuong:
                cc.log("Sam Game listener");
                return new Sam.GameListener();
            case GameList.BaCay:
                return new BaCay.GameListener();
            case GameList.MauBinh:
            case GameList.MauBinhTinhAt:
                return new MauBinh.GameListener();
            case GameList.TienLenSoLo:
            case GameList.TienLenThuong:
                return new TienLen.GameListener();
            case GameList.BaiCao:
                return new BaiCao.GameListener();
            case GameList.Poker:
            case GameList.PokerTour:
                return new Poker.GameListener();
            case GameList.Lieng:
                return new Lieng.GameListener();
            case GameList.XiZach:
                return new XiZach.GameListener();
            case GameList.CoCaro:
                return new CoCaro.GameListener();
            case GameList.CoTuong:
                return new CoTuong.GameListener();
            case GameList.CoUp:
                return new CoUp.GameListener();
			case GameList.XocDia:
                return new XocDia.GameListener();
        }
        return null;
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
        // cc.log("Car Game Send login to Server");
        var login = new CARD_GAME.CmdLogin();
        var nickName;
        var accessToken;
        if (lobby.userInfo) {
            nickName = lobby.userInfo.nickname;
            accessToken = lobby.userInfo.accessToken;
            // cc.log("nickName, access: " + nickName + " " + accessToken);
            login.putData(nickName, accessToken);
            this.send(login);
            login.clean();
        }
    },
    sendJoinRoomById: function (roomId, password) {
        var pk = new CARD_GAME.SendJoinRoomById();
        pk.putData(roomId, password);
        this.send(pk);
        pk.clean();
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

    sendGetXocDiaConfig: function () {
        cc.log("xoc dia config");
        var packet = new CARD_GAME.SendGetXocDiaConfig();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendGetListRoom: function (moneyType, maxUserPerRoom, moneyBet, rule, from, to) {
        cc.log("card sendGetMoneyBetConfig");
        var packet = new CARD_GAME.SendGetListRoom();
        packet.putData(moneyType, maxUserPerRoom, moneyBet, rule, from, to);
        this.send(packet);
        packet.clean();
    },

    sendCreateRoom: function (moneyType, maxUserPerRoom, moneyBet, rule, limitPlayer, password, roomName, quyban) {
        cc.log("card sendGetMoneyBetConfig");
        var packet = new CARD_GAME.SendCreateRoom();
        packet.putData(moneyType, maxUserPerRoom, moneyBet, rule, limitPlayer, password, roomName, quyban);
        this.send(packet);
        packet.clean();
    },

    sendTopServer: function (type) {
        var packet = new CARD_GAME.SendGetTopServer();
        packet.putData(type);
        this.send(packet);
        packet.clean();
    },

    sendFindRoom: function (roomId) {
        var packet = new CARD_GAME.SendFindRoom();
        packet.putData(roomId);
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

    sendGetInfoMoiChoi: function(){
        cc.log("send Moi Choi");
        var packet = new CARD_GAME.SendRequestInfoMoiChoi();
        this.send(packet);
        packet.clean();
    },

    sendMoiChoi: function(listName) {
        cc.log("send Moi Choi");
        var packet = new CARD_GAME.SendMoiChoi();
        packet.putData(listName);
        this.send(packet);
        packet.clean();

    },

    sendAcceptMoiChoi: function(name){
        cc.log("send Accept Moi Choi");
        var packet = new CARD_GAME.SendAcceptMoiChoi();
        packet.putData(name);
        this.send(packet);
        packet.clean();
    },

    send: function(pk){
        cc.log("state send: " + gameWsState);
        if(gameWsState != CLIENT_STATE.CONNECTED){
            cc.log("khong duoc send when not connected")
        }else{
            WebsocketClient.prototype.send.call(this, pk);
        }
    }
});


var curLongTes = 0;


