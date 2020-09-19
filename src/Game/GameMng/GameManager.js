//
var userGameData = cc.sys.localStorage;

var GameManager = cc.Class.extend({
    ctor: function(){
        this.lastGame = -1;
        this.currentGame = -1;
        this.outRoom = true;
        this.nickName = "";
        this.inGame = false;
        this.hasLoadGameList = [];
    },

    checkType: function(type){
        return true;
    },

    openGame: function(type){
        cc.log("type: " + type);
        var config = lobby.getConfigByType(type);
        //cc.log("status: " + config.status);
        //if(config && config.status == 0){
        if(config){
            if(waitingJoinGame) {
                cc.log("doi xu ly vao game");
                return;
            }
            waitingJoinGame = true;
            cc.log("before showLoading");
            showLoading();
            cc.log("showLoading");
            this.currentGame = type;
            gameData.setGameType(type);
            this.connectToGameServer(type);
        }
        else{
            // cc.log("game status: " + config.status);
            popup.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },

    openGameSlot: function(type){
        // cc.log("type: " + type);
        var config = lobby.getConfigByType(type);
        //cc.log("status: " + config.status);
        if(config && config.status == 0){

            loadResoureGame(g_resources_slots_kho_bau, slotKhoBau ,function(){
                if(waitingJoinGame) {
                    cc.log("doi xu ly vao game");
                    return;
                }
                waitingJoinGame = true;
                showLoading();
                cc.log("showLoading");
                this.currentGame = type;
                gameData.setGameType(type);
                this.connectToGameServer(type);
            }.bind(this));
        }
        else{
            //cc.log("game status: " + config.status);
            popup.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },
    openGameNuDiepVien: function(type){
        cc.log("type: " + type);
        var config = lobby.getConfigByType(type);
        //cc.log("status: " + config.status);
        if(config && config.status == 0){
                if(waitingJoinGame) {
                    cc.log("doi xu ly vao game");
                    return;
                }
                waitingJoinGame = true;
                showLoading();
                cc.log("showLoading");
                this.currentGame = type;
                gameData.setGameType(type);
                this.connectToGameServer(type);
        }
        else{
            popup.openPanel_Alert_Lobby("Game đang bảo trì. Vui lòng đợi!!!");
        }
    },

	initAndOpenGame: function(type){
        switch (type)
        {
            case GameList.TienLenSoLo:
            case GameList.TienLenThuong:
                loadResoureGame(g_resources_tienlen, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.BaCay:
            case GameList.BaiCao:
                loadResoureGame(g_resources_bacay, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.MauBinh:
            case GameList.MauBinhTinhAt:
                loadResoureGame(g_resources_maubinh, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.SamSoLo:
            case GameList.SamThuong:
                loadResoureGame(g_resources_sam, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.PokerTour:
            case GameList.Poker:
                loadResoureGame(g_resources_poker, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.Lieng:
                loadResoureGame(g_resources_lieng, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.XiZach:
                loadResoureGame(g_resources_xizach, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.CoCaro:
                loadResoureGame(g_resources_caro, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.CoTuong:
                loadResoureGame(g_resources_cotuong, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
            case GameList.CoUp:
                loadResoureGame(g_resources_coup, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
			case GameList.XocDia:
                loadResoureGame(g_resources_xocdia, this.hasLoadGameList[type] ,function(){
                    this.hasLoadGameList[type] = true;
                    this.openGame(type);
                }.bind(this));
                break;
        }

    },

    getGameName : function(gameType){
        var name = "";
        if (gameType == GameList.TienLenSoLo)
            name = "TLMN Solo";
        else if(gameType == GameList.TienLenThuong)
            name = "Tiến Lên Miền Nam";
        else if(gameType == GameList.BaCay)
            name = "Ba Cây";
        else if(gameType == GameList.BaiCao)
            name = "Bài Cào";
        else if(gameType == GameList.MauBinh)
            name = "Mậu Binh";
        else if(gameType == GameList.MauBinhTinhAt)
            name = "Mậu Binh Tính Át";
        else if(gameType == GameList.SamSoLo)
            name = "Sâm Solo";
        else if(gameType == GameList.SamThuong)
            name = "Sâm Solo";
        else if(gameType == GameList.Poker)
            name = "Poker Texas";
        else if(gameType == GameList.Lieng)
            name = "Liêng";
        else if(gameType == GameList.XiZach)
            name = "Xì Dzach";
        else if(gameType == GameList.CoCaro)
            name = "Cờ Caro";
        else if(gameType == GameList.CoTuong)
            name = "Cờ Tướng";
        else if(gameType == GameList.CoUp)
            name = "Cờ Úp";
        else if(gameType == GameList.XocDia)
            name = "Xóc Đĩa";

        return name;
    },

    backToLobby: function(){
        cc.log("backToLobby");
        SceneMgr.getInstance().getRunningScene().removeGameGui();
        GameLobby.getInstance().setVisible(false);
        GameLobby.getInstance().pn_create_room.setVisible(false);
        this.inGame = false;
        cc.log("backToLobby2");
        menutab.showAllInfo();
        cc.log("backToLobby end");
    },

    disconnectNetworkSlow: function(){
        cc.log("disconnect network slow");
        popup.openPanel_Alert_Lobby("Mạng yếu kiểm tra lại kết nối mạng");
        //this.disconnect();
    },

    clickOnBack: function(){
        cc.log("click on back");
        userGameData.setItem("currentGame", "-1");
        this.disconnect();
    },

    disconnect: function(){
        cc.log("gameWsclient disconnect");
        if(gameWsClient != null && gameWsClient != undefined)
            gameWsClient.disconnect();
    },

    openPlayingGame: function(){
        return;
        var curGame = userGameData.getItem("currentGame");
        var inRoom = userGameData.getItem("inRoom");

        if(!curGame || curGame == "-1" || !inRoom || inRoom == "false"){
            return;
        }
        else{
            cc.log("PlayingGame: " + curGame);
            //this.openGame(parseInt(curGame));
        }
    },

    //01697135555 900925
    connectToGameServer: function(gameType) {
        cc.log("connectTo GameType: " + gameType);
        if (gameType == GameList.SamSoLo || gameType == GameList.SamThuong) {
            gameWsClient = new Sam.SamWebSocket();
        }
        else if (gameType == GameList.BaCay) {
            gameWsClient = new BaCay.BaCayWebSocket();
        }
        else if (gameType == GameList.MauBinh || gameType == GameList.MauBinhTinhAt) {
            gameWsClient = new MauBinh.WebSocket();
        }
        else if(gameType == GameList.TienLenSoLo || gameType == GameList.TienLenThuong){
            gameWsClient = new TienLen.TienLenWebSocket();
        }
        else if(gameType == GameList.BaiCao){
            gameWsClient = new BaiCao.BaiCaoWebSocket();
        }
        else if(gameType == GameList.SlotKhoBau) {
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.NuDiepVien){
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.Avenger){
            gameWsClient = new Slots.SlotsWebSocket();
            }
        else if(gameType == GameList.Poker){
            gameWsClient = new Poker.PokerSocket();
        }
        else if(gameType == GameList.Lieng){
            gameWsClient = new Lieng.LiengSocket();
        }
        else if(gameType == GameList.CoCaro)
        {
            gameWsClient = new CoCaro.CoCaroSocket();
        }else if(gameType == GameList.XiZach)
        {
            gameWsClient = new XiZach.XiZachSocket();
        }
        else if(gameType == GameList.CoTuong)
        {
            gameWsClient = new CoTuong.CoTuongSocket();
        }
        else if(gameType == GameList.CoUp)
        {
            gameWsClient = new CoUp.CoUpSocket();
        }else if(gameType == GameList.XocDia)
        {
            gameWsClient = new XocDia.XocDiaSocket();
        }


        gameWsClient.connectToServer(gameType);
        this.startCountLogin();
    },


    showYesNoDialog: function(title,message,target,selector,parent){

        this.dialog = new Dialog();
        if(parent)
        {
            parent.addChild(this.dialog);
        }
        else
            this.getRunningScene().getMainLayer().addChild(this.dialog);
        this.dialog.setLocalZOrder(Dialog.ZODER);
        this.dialog.setTag(Dialog.TAG);
        this.dialog.set(title,message,target,selector);
        return this.dialog;
    },

    startCountLogin: function(){
        cc.log("start Count Login");
        EventHandlerManager.getInstance().addHandler("login", function(){
            cc.log("Login time out");
            popup.openPanel_Alert_Lobby("Kết nối tới game không thành công. Vui lòng thử lại sau.");
            //EventHandlerManager.getInstance().removeHandler("login");
            this.disconnect();
            closeLoading();
        }.bind(this));
        EventHandlerManager.getInstance().getHandler("login").setTimeOut(5);
    },
	
	// add Some comment

    addStartJoinRoom: function(){
        cc.log("start Count Join Room");
        //showLoading();
        EventHandlerManager.getInstance().addHandler("joinRoom", function(){
            cc.log("join room time out");
            waitingJoinRoom = false;
            cc.log("waitingJoint Room = false");
            //EventHandlerManager.getInstance().removeHandler("joinRoom");
        }.bind(this));

        EventHandlerManager.getInstance().getHandler("joinRoom").setTimeOut(2);
    },

    //
    sendRequestTopCaoThu: function(){
        //gameData.clearTopServer();
        sendRequest(this.getUrlTopCaoThuVin(),null,false,this.callBackGetTopCaoThuVin,this.callBackError);
        sendRequest(this.getUrlTopCaoThuXu(),null,false,this.callBackGetTopCaoThuXu,this.callBackError);
    },

    sendRequestTopCaoThuVin: function(){
        sendRequest(this.getUrlTopCaoThuVin(),null,false,this.callBackGetTopCaoThuVin,this.callBackError);
    },

    sendRequestTopCaoThuXu: function(){
        sendRequest(this.getUrlTopCaoThuXu(),null,false,this.callBackGetTopCaoThuXu,this.callBackError);
    },

    callBackGetTopCaoThuVin: function(response){
        var jsonData = JSON.parse(response);

        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if(success)
        {
            var userList = jsonData["userList"];
            cc.log("UserList: " + userList);
            if(userList != "" && userList != undefined){
                gameData.updateCaothuListVin(userList);
            }
        }else
        {
        }
    },

    callBackError: function(error){

    },


    callBackGetTopCaoThuXu: function(response){
        var jsonData = JSON.parse(response);

        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        if(success)
        {
            var userList = jsonData["userList"];
            gameData.updateCaothuListXu(userList);
        }else
        {
        }
    },


    getUrlTopCaoThuVin: function()
    {
        var hh = BASE_URL;
        //var hh = "http://104.155.193.15:8081/api?";
        //var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ "29-09-2016";
        var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ this.getCurrentDate();
        cc.log(kk);
        return kk;
    },

    getUrlTopCaoThuXu: function()
    {
        var hh = BASE_URL;
        //var hh = "http://104.155.193.15:8081/api?";
        //var kk =  hh + "c=123&n="+5+"&mt=vin&date="+ "29-09-2016";
        var kk =  hh + "c=123&n="+5+"&mt=xu&date="+ this.getCurrentDate();
        cc.log(kk);
        return kk;
    },

    getCurrentDate : function(){
        var time = new Date();
            var date = time.getDate();
            var month = time.getMonth() +1;
            var year = time.getFullYear();
            if(date < 10)
                date = '0'+date;
            if(month < 10){
                month = '0' + month;
            }

            var today = date+'-'+month+'-'+year;
            return today;
    },

    startPingPong: function(){
        if(gameWsState != CLIENT_STATE.CONNECTED){
            return;
        }

        if(gameWsClient){
            gameWsClient.sendPingPong();
        }

        EventHandlerManager.getInstance().addHandler("pingpong", function(){
            GameManager.getInstance().disconnectNetworkSlow();
        });

        EventHandlerManager.getInstance().addHandler("networkSlow", function(){
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(true);
            }
            this.startPingPong();
        }.bind(this));

        EventHandlerManager.getInstance().getHandler("pingpong").setTimeOut(20);
        EventHandlerManager.getInstance().getHandler("networkSlow").setTimeOut(5);
    },


    //startPingPong2: function(){
    //}

    receivedPingPong: function(){
        EventHandlerManager.getInstance().addHandler("receivedPingPong", function(){
            GameManager.getInstance().startPingPong();
        });

        EventHandlerManager.getInstance().getHandler("receivedPingPong").setTimeOut(5);
        //fast network check

        if(EventHandlerManager.getInstance().getHandler("networkSlow") != null)      // goi tin tra ve nhanh hon 5s
        {
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(false);
            }
        }
        else
        {
            if(GameScene.getMainLayer() && GameScene.getMainLayer().networkSlow){
                GameScene.getMainLayer().networkSlow(true);
            }
        }

        EventHandlerManager.getInstance().removeHandler("pingpong");
        EventHandlerManager.getInstance().removeHandler("networkSlow");
    },

    backToSelectRoom: function(){
        cc.log("backToSelectRoom");
        GameScene.removeGameGui();
        cc.log("backToSelectRoom 1");
        GameLobby.getInstance().setVisible(true);
        GameLobby.getInstance().showAndSendTopServer();
        if(gameWsClient){
            gameWsClient.sendGetMoneyBetConfig(GameLobby.getInstance().typeBan, 0, -1, 0, CARD_FROM, CARD_TO);
        }

        cc.log("backToSelectRoom 2");
    },

    backToTestScene: function(){
        cc.log("backToTestRoom");
        GameScene.removeGameGui();
        testLobby.setVisible(true);
    },

    getHotroLink: function(gameType) {
        if(gameType == GameList.SamThuong || gameType == GameList.SamSoLo) {
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.BaCay){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.MauBinh){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.MauBinhTinhAt){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.TienLenSoLo || gameType == GameList.TienLenThuong){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.BaiCao){
            return "http://vinplay.vin/huong-dan"
        }
        else if(gameType == GameList.Poker){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.Lieng){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.CoCaro){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.XiZach){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.CoTuong){
            return "http://vinplay.vin/huong-dan";
        }
        else if(gameType == GameList.CoUp){
            return "http://vinplay.vin/huong-dan";
        }else if(gameType == GameList.XocDia){
            return "http://vinplay.vin/huong-dan";
        }
    }


});

var gameWsClient = null;
var waitingJoinGame = false;
var waitingJoinRoom = false;
GameManager.CLOSED = 0;
GameManager.OPEN = 1;
var gameWsState = GameManager.CLOSED;

var gameManagerInstance = null;

GameManager.getInstance = function(){
    if(gameManagerInstance == null){
        gameManagerInstance = new GameManager();

    }
    return gameManagerInstance;
}

