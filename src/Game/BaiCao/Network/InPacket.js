//
BaiCao.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
})

BaiCao.ReceiveJoinRoomFail = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        //this.getString();
    }
});

BaiCao.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i;
        // gia cua toi tren server
        this.myChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed myChair: " + this.myChair);
        this.chuongChair = this.getByte();
        cc.log("ReceiveJoinRoomSucceed chuongChair: " + this.chuongChair);
        this.moneyBet = this.getLong();
        cc.log("ReceiveJoinRoomSucceed moneyBet: " + this.moneyBet);
        this.roomId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed roomId: " + this.roomId);
        this.gameId = this.getInt();
        cc.log("ReceiveJoinRoomSucceed gameId: " + this.gameId);
        this.moneyType = this.getByte();
        cc.log("ReceiveJoinRoomSucceed moneyType: " + this.moneyType);
        this.rule   = this.getByte();
        cc.log("ReceiveJoinRoomSucceed rule: " + this.rule);
        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerStatus = [];
        for(i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
            cc.log("ReceiveJoinRoomSucceed playerStatus: " + i + " " + this.playerStatus[i]);
        }

        this.playerSize = this.getShort();
        cc.log("ReceiveJoinRoomSucceed playerSize: " + this.playerSize);
        this.playerInfos = [];
        for(i =0; i < this.playerSize; i++){
            var player = {};
            player.nickName = this.getString();
            cc.log("ReceiveJoinRoomSucceed nickName: " + i + " " + player.nickName);
            player.avatar = this.getString();
            cc.log("ReceiveJoinRoomSucceed avatarUrl: " + i + " " + player.avatar);
            player.money = this.getLong();
            cc.log("ReceiveJoinRoomSucceed money: " + i + " " + player.money);
            this.playerInfos.push(player);
        }
        this.gameAction = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.gameAction);
        this.countDownTime = this.getByte();
        cc.log("ReceiveJoinRoomSucceed gameAction: " + i + " " + this.countDownTime);
    }
});

BaiCao.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.timeAutoStart = this.getByte();

    }
});

BaiCao.ReceivedChiaBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i = 0;
        this.cardSize = this.getShort();
        cc.log("cardSize: " + this.cardSize);
        this.cards = [];
        for( i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
            cc.log("card: " + i + " " + this.cards[i]);
        }
        this.gameId = this.getInt();
        this.timeChiaBai = this.getByte();
        cc.log("time Chia Bai: " + this.timeChiaBai);
    }
});

BaiCao.ReceivedFirstTurnDecision = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.isRandom = this.getBool();
        this.chair = this.getByte();
        this.cardSize = this.getShort();
        this.cards= [];
        for(i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
        }
    }
})

BaiCao.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function() {
        this.chair = this.getByte();
        this.nickName = this.getString();
        cc.log("chair" + this.chair + "nickName" + this.nickName);
    }
})

BaiCao.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.info = {};
        this.info["nickName"] = this.getString();
        this.info["avatar"] = this.getString();
        this.info["money"]= this.getLong();
        this.uChair = this.getByte();
        this.uStatus = this.getByte();
    }
})

BaiCao.CmdReceivedUpdateMatch = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.myChair = this.getByte();

        var size = this.getShort();
        this.hasInfo = [];
        for(var i=0;i<size;i++){
            this.hasInfo.push(this.getBool());
        }

        this.infos = [];
        for(var i=0;i<size;i++){
            var info = {};
            if(this.hasInfo[i])
            {
                info["nickName"] = this.getString();
                info["avatar"] = this.getString();
                info["money"] = this.getLong();
                info["status"] = this.getInt();
            }
            this.infos.push(info);
        }

    }
})

BaiCao.CmdReceiveBaiCaoConfig = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listSize = this.getShort();
        this.list = [];
        for( var i = 0; i < this.listSize; i++){
            var kk = {};
            kk.maxUserPerRoom = this.getByte();
            kk.moneyType = this.getByte();
            kk.moneyBet = this.getLong();
            kk.moneyRequire = this.getLong();
            kk.nPersion = this.getInt();
            this.list.push(kk);
        };
    }
});


BaiCao.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
})

BaiCao.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

BaiCao.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
    }
});


BaiCao.ReceivedMoiDatCuoc = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.timeDatCuoc = this.getByte();
    }
});

BaiCao.ReceivedDatCuoc = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chairDatCuoc = this.getByte();
        this.level = this.getByte();
        cc.log("chairDatCuoc: " + this.chairDatCuoc + " level: " + this.level);
    }
})

BaiCao.ReceivedYeuCauDanhBien = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.danhBienChair = this.getByte();
        this.level = this.getByte();
        cc.log("Received Yeucau danh bien:" + this.danhBienChair + " " + this.level);
    }
})

// nhan goi tin respon to AcceptDanhBien voi nguoi khac
BaiCao.ReceivedChapNhanDanhBien = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.danhBienChair = this.getByte();
        this.level = this.getByte();
        cc.log("Received Yeucau danh bien:" + this.danhBienChair + " " + this.level);
    }
})

BaiCao.ReceivedKeCua = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chairKeCuaFrom = this.getByte();
        this.chairKeCuaTo = this.getByte();
        this.level = this.getByte();
    }
})

BaiCao.ReceivedVaoGa = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.chicKenBet = this.getLong();
    }
}),



BaiCao.ReceivedMoBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chairMoBai = this.getByte();
        this.cardSize = this.getShort();
        this.cards = [];
        for(var i = 0; i <this.cardSize; i++){
            this.cards.push(this.getByte());
        }
        cc.log("Received MoBai:" + this.chairMoBai + " " + this.cardSize + " " + this.cards[0] + " " + this.cards[1] + " " + this.cards[2]);
    }
});

BaiCao.ReceivedEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i;
        var statusSize = this.getShort();
        this.statusList = [];
        for(i = 0; i < statusSize; i++){
            this.statusList.push(this.getByte());
        }

        var playerSize;
        this.cardList = [];

        for(i = 0; i < this.statusList.length; i++){
            var cards = [];
            if(this.statusList[i] == 3){
                var cardSize = this.getShort();
                for(var j = 0; j < cardSize; j++){
                    cards.push(this.getByte());
                }
            }

            this.cardList.push(cards);
        }

        this.tienThangChuong = this.getLong();
        this.tienThangGa = this.getLong();
        this.keCuaMoneyList = [];
        this.danhBienMoneyList = [];

        var keCuaSize = this.getShort();
        for( i = 0; i < keCuaSize; i++){
            this.keCuaMoneyList.push(this.getLong());
        }

        var danhBienSize = this.getShort();
        for(i = 0; i < danhBienSize; i++){
            this.danhBienMoneyList.push(this.getLong());
        }

        this.tongTienCuoiVan = this.getLong();


        this.tongTienCuocList = [];
        this.tongDanhBienList = [];
        this.tongKeCuaList = [];
        this.tongCuocGaList = [];
        this.tongCuoiVanList = [];
        this.currentMoneyList = [];
        playerSize = this.getShort();

        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongTienCuocList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongDanhBienList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongKeCuaList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongCuocGaList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongCuoiVanList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.currentMoneyList.push(tien);
        }

        this.timeEndGame = this.getByte();
    }
});


BaiCao.ReceivedDoiChuong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chuongChair = this.getByte();
    }
});

BaiCao.ReceivedGameInfo = CmdReceivedCommon.extend({
    ctor: function (pkg) {
        this._super(pkg);
        this.readData();
    },
    readData: function () {
        cc.log("ReceivedGameInfo: " + this.gameServerState);
        this.myChair = this.getByte();
        cc.log("myChair " + this.myChair);
        this.chuongChair = this.getByte();
        cc.log("chuongChair " + this.chuongChair);

        // bo Bai;
        var cardSize = this.getShort();
        cc.log("cardSize: " + cardSize);
        this.cards = [];
        for(var i =0; i < cardSize; i++){
            this.cards.push(this.getByte());
        }

        this.cuocDanhBienList = [];
        var size = this.getShort();

        for(var i = 0; i < size; i++){
            this.cuocDanhBienList[i] = this.getInt();
        }


        this.cuocKeCuaList = [];
        size = this.getShort();
        for(var i = 0; i < size; i++){
            this.cuocKeCuaList[i] = this.getInt();
        }

        this.gameServerState = this.getByte();
        cc.log("gameServerState: " + this.gameServerState);
        this.isAutoStart = this.getBool();
        this.gameAction = this.getByte();
        cc.log("gameAction " + this.gameAction);
        this.countDownTime = this.getByte();
        cc.log("countDownTime " + this.countDownTime);

        this.moneyType = this.getByte();
        this.moneyBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

        this.hasInfo = [];
        size = this.getShort();
        for(var i = 0; i < size; i++){
            this.hasInfo[i] = this.getBool();
            cc.log("hasInfo i: " + i );
        }

        this.players = []
        for(var i = 0; i < BaiCao.GameLogic.MAX_PLAYER; i++){
            if(this.hasInfo[i]){
                this.players[i] = [];
                this.players[i].status = this.getByte();
                this.players[i].money = this.getLong();
                this.players[i].cuocGa = this.getInt();
                this.players[i].cuocChuong = this.getInt();
                this.players[i].avatar = this.getString();
                this.players[i].nickName = this.getString();
            }else{
                this.players[i] = [];
                this.players[i].status = 0;
            }
        }


    }
});




