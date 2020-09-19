/**
 * Created by Tuan on 10-Aug-16.
 */

var MauBinhMatchMgr = cc.Class.extend({

    ctor: function(){
        this.isTinhAt = false;
        this.myGlobalChairIndex = -1;
        this.gameState = -1;
        this.countdownTime = 0;
        this.playerResultList = null;
        this.arrangeDone = [];
        this.roomId = "";
        this.gameId = "";
        this.moneyBet = 0;
        this.moneyType = 0;

        this.initMatch();
    },

    initMatch: function(){
        // for (var i=0; i<MauBinh.Const.MAX_NUMBER_PLAYER; i++){
        //     this.arrangeDone[i] = false;
        // }
    },

    joinRoomSuccess: function(data){
        this.myGlobalChairIndex = data.uChair;
        this.gameState = data.gameState;
        this.countdownTime = data.countdownTime;
        this.moneyBet = data.moneyBet;
        this.moneyType = data.moneyType;
        this.gameId = data.gameId;
        this.roomId = data.roomId;
        this.isTinhAt = data.rule == 1 ? true : false;

        for (var i=0; i<data.playerList.length; i++){
            var playerInfo = new MauBinhPlayerInfo();
            playerInfo.status = data.playerStatus[i];
            playerInfo.avatar = data.playerList[i].avatar;
            playerInfo.nickName = data.playerList[i].nickName;
            playerInfo.currentMoney = data.playerList[i].currentMoney;
            playerInfo.chairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(i);

            MauBinhPlayerMgr.getInstance().addPlayer(playerInfo.chairIndex, playerInfo);
        }
    },

    reconnectGame: function(data){
        this.myGlobalChairIndex = data.uChair;
        this.gameState = data.gameState;
        this.countdownTime = data.countdownTime;
        this.moneyBet = data.moneyBet;
        this.moneyType = data.moneyType;
        this.gameId = data.gameId;
        this.roomId = data.roomId;
        this.isTinhAt = data.rule == 1 ? true : false;

        this.playerResultList = [];
        for (var chairIndex in data.playerList){
            var playerInfo = new MauBinhPlayerInfo();
            playerInfo.status = data.playerList[chairIndex].status;
            playerInfo.avatar = data.playerList[chairIndex].avatar;
            playerInfo.uid = data.playerList[chairIndex].userId;
            playerInfo.nickName = data.playerList[chairIndex].nickName;
            playerInfo.currentMoney = data.playerList[chairIndex].currentMoney;
            playerInfo.chairIndex = MauBinhMatchMgr.getInstance().convertGlobalToLocalChair(chairIndex);

            MauBinhPlayerMgr.getInstance().addPlayer(playerInfo.chairIndex, playerInfo);

            if (this.gameState == MauBinh.GameState.PLAYING){
                if (playerInfo.chairIndex == 0){
                    var chi1 = [], chi2 = [], chi3 = [];
                    for (var i=0; i<data.playerList[chairIndex].cardList.length; i++){
                        var cardId = data.playerList[chairIndex].cardList[i];
                        if (i<5) chi1.push(cardId);
                        else if (i<10) chi2.push(cardId);
                        else chi3.push(cardId);
                    }
                    this.updateCardOfPlayer(0, chi1, chi2, chi3);
                }
                //this.arrangeDone[playerInfo.chairIndex] = true;
            }
            else if (this.gameState == MauBinh.GameState.GAME_END){
                var chi1 = [], chi2 = [], chi3 = [];
                for (var i=0; i<data.playerList[chairIndex].cardList.length; i++){
                    var cardId = data.playerList[chairIndex].cardList[i];
                    if (i<5) chi1.push(cardId);
                    else if (i<10) chi2.push(cardId);
                    else chi3.push(cardId);
                }
                this.updateCardOfPlayer(playerInfo.chairIndex, chi1, chi2, chi3);

                playerInfo.playerCard.maubinhType = data.playerList[chairIndex].maubinhType;

                this.playerResultList.push({
                    chairIndex: playerInfo.chairIndex,
                    moneyCommon: data.playerList[chairIndex].moneyCommon
                });
            }
        }
    },


    startGame: function(dataObject){
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();

        var chi1 = [], chi2 = [], chi3 = [];
        for (var i=0; i<dataObject.cardList.length; i++){
            if (i<5) chi1.push(dataObject.cardList[i]);
            else if (i<10) chi2.push(dataObject.cardList[i]);
            else chi3.push(dataObject.cardList[i]);
        }

        this.gameId = dataObject.gameId;
        this.countdownTime = dataObject.countdown;

        this.updateCardOfPlayer(0, chi1, chi2, chi3);
        gameGui.distributeCard();
        gameGui.loadBoardInfo();
    },

    endGame: function(playerResultList){
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        gameGui.onWaitingArrangeFinish();

        GuiUtil.clearEffect();

        this.playerResultList = playerResultList;
        cc.log(">>> Result from server:");
        for (var i=0; i<playerResultList.length; i++){
            var chairIndex = playerResultList[i].chairIndex;
            cc.log("i = " + i + ", chair = " + playerResultList[i].chairIndex);
            var playerInfo = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex);
            if (playerInfo.status == MauBinh.PlayerStatus.PLAY){
                cc.log("player: " + chairIndex + ": chi1: " + playerResultList[i].chi1.toString() + ", chi2: " + playerResultList[i].chi2.toString() + ", chi3: " + playerResultList[i].chi3.toString());
                this.updateCardOfPlayer(chairIndex, playerResultList[i].chi1, playerResultList[i].chi2, playerResultList[i].chi3);
                playerInfo.playerCard.updatePlayerCard(this.isTinhAt);
                playerInfo.playerCard.maubinhType = playerResultList[i].maubinhType;
            }
        }
        gameGui.startSoBai();
    },

    updateCardOfPlayer: function(chairIndex, chi1, chi2, chi3){
        var playerCard = MauBinhPlayerMgr.getInstance().getPlayerInfoByIndex(chairIndex).playerCard;
        for (var cardIndex = 0; cardIndex<5; cardIndex++)
            playerCard.chiDau.cardList[cardIndex].id = chi1[cardIndex];
        for (var cardIndex = 0; cardIndex<5; cardIndex++)
            playerCard.chiGiua.cardList[cardIndex].id = chi2[cardIndex];
        for (var cardIndex = 0; cardIndex<3; cardIndex++)
            playerCard.chiCuoi.cardList[cardIndex].id = chi3[cardIndex];
    },

    needShowMoneyWhenSoChi: function(){
        for (var i=0; i<this.playerResultList.length; i++) {
            var playerResult = this.playerResultList[i];
            if ((playerResult.chairIndex == 0) && (playerResult.maubinhType != MauBinh.Type.BINH_THUONG)){//neu la nguoi choi chinh
                return false;
            }
        }
        return true;
    },

    needSoChi: function(){
        var count = 0;
        for (var i=0; i<this.playerResultList.length; i++){
            if (this.playerResultList[i].maubinhType == MauBinh.Type.BINH_THUONG){
                count++;
            }
        }
        return (count>=2);
    },

    needBatSap: function(){
        for (var i=0; i<this.playerResultList.length; i++){
            if (this.playerResultList[i].moneySap != 0){
                return true;
            }
        }
        return false;
    },

    convertGlobalToLocalChair: function(globalChair){
        return ((globalChair - this.myGlobalChairIndex + MauBinh.Const.MAX_NUMBER_PLAYER) % MauBinh.Const.MAX_NUMBER_PLAYER);
    },
});

MauBinhMatchMgr.getInstance = function(){
    if (!this._instance){
        this._instance = new MauBinhMatchMgr();
    }
    return this._instance;
};