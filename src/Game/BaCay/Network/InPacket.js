//
BaCay.CmdReceiveLogin = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
    }
})

BaCay.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i;
        // gia cua toi tren server
        this.myChair = this.getByte();
        this.chuongChair = this.getByte();
        this.moneyBet = this.getLong();
        this.roomId = this.getInt();
        this.gameId = this.getInt();
        this.moneyType = this.getByte();
        this.rule   = this.getByte();
        this.playerSize = this.getShort();
        this.playerStatus = [];

        for(i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
        }

        this.playerSize = this.getShort();
        this.playerInfos = [];
        for(i =0; i < this.playerSize; i++){
            var player = {};
            player.nickName = this.getString();
            player.avatar = this.getString();
            player.money = this.getLong();
            this.playerInfos.push(player);
        }
        this.gameAction = this.getByte();
        this.countDownTime = this.getByte();
    }
});

BaCay.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.timeAutoStart = this.getByte();

    }
});

BaCay.ReceivedChiaBai = CmdReceivedCommon.extend({
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

BaCay.ReceivedFirstTurnDecision = CmdReceivedCommon.extend({
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

BaCay.ReceiveUserLeaveRoom = CmdReceivedCommon.extend({
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

BaCay.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
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

BaCay.CmdReceivedUpdateMatch = CmdReceivedCommon.extend({
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

BaCay.CmdReceiveBaCayConfig = CmdReceivedCommon.extend({
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


BaCay.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
})

BaCay.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

BaCay.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
    }
});


BaCay.ReceivedMoiDatCuoc = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.timeDatCuoc = this.getByte();
    }
});

BaCay.ReceivedDatCuoc = CmdReceivedCommon.extend({
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

BaCay.ReceivedYeuCauDanhBien = CmdReceivedCommon.extend({
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
BaCay.ReceivedChapNhanDanhBien = CmdReceivedCommon.extend({
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

BaCay.ReceivedKeCua = CmdReceivedCommon.extend({
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

BaCay.ReceivedVaoGa = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
        this.chicKenBet = this.getLong();
    }
}),



BaCay.ReceivedMoBai = CmdReceivedCommon.extend({
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

BaCay.ReceivedEndGame = CmdReceivedCommon.extend({
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

        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongTienCuocList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongDanhBienList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongKeCuaList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongCuocGaList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.tongCuoiVanList.push(tien);
        }

        playerSize = this.getShort();
        for(i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
            var tien = 0;
            if(this.statusList[i] == 3){
                tien = this.getLong();
            }
            this.currentMoneyList.push(tien);
        }

        this.timeEndGame = this.getByte();
    }
});


BaCay.ReceivedDoiChuong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chuongChair = this.getByte();
    }
});

BaCay.ReceivedGameInfo = CmdReceivedCommon.extend({
    ctor: function (pkg) {
        this._super(pkg);
        this.readData();
    },
    readData: function () {
        this.myChair = this.getByte();
        this.chuongChair = this.getByte();

        // bo Bai;
        var cardSize = this.getShort();
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
        this.isAutoStart = this.getBool();
        this.gameAction = this.getByte();
        this.countDownTime = this.getByte();

        this.moneyType = this.getByte();
        this.moneyBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

        this.hasInfo = [];
        size = this.getShort();
        for(var i = 0; i < size; i++){
            this.hasInfo[i] = this.getBool();
        }

        this.players = []
        for(var i = 0; i < BaCay.GameLogic.MAX_PLAYER; i++){
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




