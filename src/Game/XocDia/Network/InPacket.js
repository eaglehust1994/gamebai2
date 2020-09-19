/**
 * Created by vinplay on 2/4/17.
 */

XocDia.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.moneyBet = this.getInt();
        this.roomId = this.getInt();
        this.gameId = this.getInt();
        this.moneyType = this.getByte();
        this.gameState = this.getByte();
        this.countTime = this.getInt();
        this.playerCount = this.getByte();
        this.potID = [];
        for(var i = 0; i < 6; i ++){
            var pot = {};
            pot.id = this.getByte();
            pot.ratio = this.getInt();
            pot.maxMoneyBet = this.getLong();
            pot.totalMoney = this.getLong();
            pot.moneyBet = this.getLong();
            pot.isLock = this.getBool();
            this.potID.push(pot);
        }
        //cc.log("potID ");
        //cc.log(this.potID);
        this.playerInfos = [];
        for(var j = 0; j < this.playerCount; j ++){
            var player = {};
            player.nickname = this.getString();
            player.avatar = this.getString();
            player.money = this.getLong();
            player.banker = this.getBool();
            player.isSubBanker = this.getBool();
            player.reqKickroom = this.getBool();
            this.playerInfos.push(player);
        }
        this.money = this.getLong();
        this.banker = this.getBool();
        this.isSubBanker = this.getBool();
        this.purchaseStatus = this.getInt();
        this.potPurchase = this.getInt();
        this.moneyPurchaseEven = this.getLong();
        this.moneyPurchaseOdd = this.getLong();
        this.moneyRemain = this.getLong();
        this.subListCount = this.getInt();
        this.list_buy_gate = [];
        for(var i = 0; i < this.subListCount; i ++){
            var ob = {};
            ob.nickname = this.getString();
            ob.money = this.getLong();
            this.list_buy_gate.push(ob);
        }
        this.bankerReqDestroy = this.getBool();
        this.bossReqDestroy = this.getBool();
        this.rule = this.getInt();
    }
});

XocDia.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.nickname = this.getString();
        this.avatar = this.getString();
        this.money = this.getLong();
    }
});

XocDia.ReceiveRequestLeaveGame = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.bRegis = this.getBool();
        this.nickname = this.getString();
    }
});

XocDia.ReceiveQuitRoom = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

XocDia.ReceiveUserOutRoom = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.nickname = this.getString();
    }
});

XocDia.ReceiveOrderBanker = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.moneyRequire = this.getLong();
    }
});

XocDia.ReceiveActionInGame = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.action = this.getByte();
        this.time = this.getByte();
    }
});

XocDia.ReceivePutMoney = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.nickname = this.getString();
        this.betMoney = this.getLong();
        this.potId = this.getByte();
        this.potMoney = this.getLong();
        this.currentMoney = this.getLong();
    }
});

XocDia.ReceiveStartGame = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.banker = this.getString();
        this.gameId = this.getInt();
        this.moneyBanker = this.getLong();
        this.list_lock_gate = [];
        for(var i = 0; i < 6; i ++){
            var ob = {};
            ob.id = this.getByte();
            ob.isLock = this.getBool();
            this.list_lock_gate.push(ob);
        }
    }
});

XocDia.ReceiveBankerSellGate = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.action = this.getByte();
        this.moneySell = this.getLong();
    }
});


XocDia.ReceiveBuyGate = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.nickname = this.getString();
        this.moneyBuy = this.getLong();
        this.rmMoneySell = this.getLong();
    }
});

XocDia.ReceiveRefunMoney = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.rfCount  = this.getInt();
        this.potID = [];
        for(var i = 0; i < 6; i ++){
            var pot = {};
            pot.id = this.getByte();
            pot.moneyRefund = this.getLong();
            pot.totalMoney = this.getLong();
            this.potID.push(pot);
        }
        this.playerInfosRefun = [];
        for(var j = 0; j < this.rfCount; j ++){
            var player = {};
            player.nickname = this.getString();
            player.moneyRefund = this.getLong();
            player.currentMoney = this.getLong();
            player.pots = this.getString();
            player.moneyRfPots = this.getString();
            this.playerInfosRefun.push(player);
        }
    }
});

XocDia.ReceiveFinishGame = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.infoAllPot = [];
        for(var i = 0; i < 6; i ++){
            var info = {};
            info.potId = this.getByte();
            info.totalMoney = this.getLong();
            info.win = this.getBool();
            this.infoAllPot.push(info);
        }

        this.diceID = [];
        for(var i = 0; i < 4; i ++){
            var dice = {};
            dice.dince = this.getInt();
            this.diceID.push(dice);
        }
        this.moneyBankerBefore = this.getLong();
        this.moneyBankerAfter = this.getLong();
        this.moneyBankerExchange = this.getLong();
        this.playerWinCount = this.getInt();
        this.playerInfoWin = [];
        for(var j = 0; j < this.playerWinCount; j ++){
            var player = {};
            player.nickname = this.getString();
            player.moneyWin = this.getLong();
            player.currentMoney = this.getLong();
            player.potsWin = this.getString();
            player.moneyWinPots = this.getString();
            this.playerInfoWin.push(player);
        }
        this.subListCount = this.getInt();
        this.InfoSubBanker = [];
        for(var j = 0; j < this.subListCount; j ++){
            var info = {};
            info.nicknameSubbanker = this.getString();
            info.potSubBanker = this.getByte();
            info.moneySubBanker  = this.getLong();
            info.moneySubBankerNoFee = this.getLong();
            info.currentMoneySubBanker = this.getLong();
            this.InfoSubBanker.push(info);
        }
    }
});

XocDia.ReceiveGetTime = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.time = this.getByte();
    }
});

XocDia.ReceiveHuyLamCai = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.bDestroy = this.getBool();
        this.nickname = this.getString();
    }
});

XocDia.ReceiveStopGame = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.banker = this.getString();
    }
});

XocDia.ReceiveMessageErrorBanker = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
    }
});

XocDia.ReceiveGetCau = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.totalEven = this.getInt();
        this.totalOdd = this.getInt();
        this.rsCount = this.getInt();
        this.arrayCau = [];
        for(var i = 0; i < this.rsCount; i++){
            var rsCau = {};
            rsCau.rs = this.getByte();
            this.arrayCau.push(rsCau);
        }
    }
});

XocDia.ReceiveInfoGateSell = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.moneyEven = this.getLong();
        this.moneyOdd = this.getLong();
    }
});

XocDia.ReceiveInfoGateSell = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.moneyEven = this.getLong();
        this.moneyOdd = this.getLong();
    }
});

XocDia.ReceiveInfoMoneyAfterBankerSell = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.money = this.getLong();
    }
});

XocDia.ReceiveActionBanker = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.action = this.getByte();
        this.money = this.getLong();
    }
});

XocDia.ReceiveLockGate = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.bChangeLock = this.getBool();
    }
});

XocDia.ReceiveKickUser = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.reason = this.getByte();
    }
});

XocDia.ReceiveDestroyRoom = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.reqDestroyRoom  = this.getBool();
    }
});

XocDia.ReceiveChotLai = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.error = this.getError();
        this.currentmoney = this.getLong();
    }
});

XocDia.ReceiveUpdateCurrentMoney = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.nickname = this.getString();
        this.currentmoney = this.getLong();
    }
});