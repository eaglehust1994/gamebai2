MauBinh.serverIp = "192.168.0.109";
MauBinh.serverPort = "543";

MauBinh.WebSocket = CardGameWebSocket.extend({
    ctor: function(){
        this._super();
    },

    sendRequestLeaveRoom: function(){
        cc.log("sendRegisterExitRoom");
        var pk = new MauBinh.CmdSendRequestLeaveRoom();
        pk.putData();
        this.send(pk);
        pk.clean();
    },

    sendTopServer: function(type){
        cc.log("send Top Server: " + type);
        var packet = new MauBinh.CmdSendGetTopServer();
        packet.putData(type);
        this.send(packet);
        packet.clean();
    },

    sendBinhSoChi: function(){
        cc.log("send Binh So Chi");

        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0).playerCard;
        var chi1 = [], chi2 = [], chi3 = [];
        for (var i=0; i<playerCard.chiDau.cardList.length; i++){
            chi1.push(playerCard.chiDau.cardList[i].id);
        }
        for (var i=0; i<playerCard.chiGiua.cardList.length; i++){
            chi2.push(playerCard.chiGiua.cardList[i].id);
        }
        for (var i=0; i<playerCard.chiCuoi.cardList.length; i++){
            chi3.push(playerCard.chiCuoi.cardList[i].id);
        }

        cc.log("Chi 1 = " + chi1.toString());
        cc.log("Chi 2 = " + chi2.toString());
        cc.log("Chi 3 = " + chi3.toString());

        var packet = new MauBinh.CmdSendBinhSoChi();
        packet.putData(chi1, chi2, chi3);
        this.send(packet);
        packet.clean();
    },

    sendBaoBinh: function(){
        cc.log("send Bao Binh");

        var packet = new MauBinh.CmdSendBaoBinh();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendXepLai: function(){
        cc.log("send Xep lai");

        var packet = new MauBinh.CmdSendXepLai();
        packet.putData();
        this.send(packet);
        packet.clean();
    },

    sendAutoBinhSoChi: function(){
        cc.log("send Auto Binh So Chi");

        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(0).playerCard;
        var chi1 = [], chi2 = [], chi3 = [];
        for (var i=0; i<playerCard.chiDau.cardList.length; i++){
            chi1.push(playerCard.chiDau.cardList[i].id);
        }
        for (var i=0; i<playerCard.chiGiua.cardList.length; i++){
            chi2.push(playerCard.chiGiua.cardList[i].id);
        }
        for (var i=0; i<playerCard.chiCuoi.cardList.length; i++){
            chi3.push(playerCard.chiCuoi.cardList[i].id);
        }

        cc.log("Chi 1 = " + chi1.toString());
        cc.log("Chi 2 = " + chi2.toString());
        cc.log("Chi 3 = " + chi3.toString());

        var packet = new MauBinh.CmdSendAutoBinhSoChi();
        packet.putData(chi1, chi2, chi3);
        this.send(packet);
        packet.clean();
    },

    sendCheatBai: function(isCheat, cards){
        cc.log("send cheat bai");
        var packet = new MauBinh.SendCheatBai();
        packet.putData(isCheat, cards);
        this.send(packet);
        packet.clean();
    },

});

