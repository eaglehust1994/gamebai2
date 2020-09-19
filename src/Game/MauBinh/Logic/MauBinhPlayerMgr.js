/**
 * Created by Tuan on 10-Aug-16.
 */

var MauBinhPlayerMgr = cc.Class.extend({
    ctor: function(){
        this.chairIndex_playerInfo = [];
    },

    //initCard: function(){
    //    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
    //
    //    var allPlayingPlayers = this.getAllPlayingPlayers();
    //    for (var i=0; i<allPlayingPlayers.length; i++){
    //        var playerInfo = allPlayingPlayers[i];
    //        var playerCard = playerInfo.playerCard;
    //        for (var j=0; j<5; j++)
    //            playerCard.addCardToChiDau(new MauBinhCard(52, gameGui.getCardSprite(playerInfo.chairIndex, j)));
    //        for (var j=5; j<10; j++)
    //            playerInfo.playerCard.addCardToChiGiua(new MauBinhCard(52, gameGui.getCardSprite(playerInfo.chairIndex, j)));
    //        for (var j=10; j<13; j++)
    //            playerInfo.playerCard.addCardToChiCuoi(new MauBinhCard(52, gameGui.getCardSprite(playerInfo.chairIndex, j)));
    //    }
    //},

    getAllPlayingPlayers: function(){
        var result = [];
        for (var chairIndex in this.chairIndex_playerInfo){
            var playerInfo = this.getPlayerInfoByIndex(chairIndex);
            if (playerInfo.status == MauBinh.PlayerStatus.PLAY){
                result.push(playerInfo);
            }
        }
        return result;
    },

    getNumberPlayingPlayer: function(){
        return this.getAllPlayingPlayers().length;
    },

    getAllInRoomPlayers: function(){
        var result = [];
        for (var chairIndex in this.chairIndex_playerInfo){
            var playerInfo = this.getPlayerInfoByIndex(chairIndex);
            if (playerInfo.status != MauBinh.PlayerStatus.NO_USER){
                result.push(playerInfo);
            }
        }
        return result;
    },

    getPlayerInfoByIndex: function(chairIndex){
        var result = this.chairIndex_playerInfo[chairIndex];
        return result;
    },

    changePlayerStatusTo: function(playerStatus){
        for (var chairIndex in this.chairIndex_playerInfo) {
            var playerInfo = this.getPlayerInfoByIndex(chairIndex);
            if (playerInfo.status != MauBinh.PlayerStatus.NO_USER){
                playerInfo.status = playerStatus;
            }
        }
    },

    getNumberPlayer: function(){
        return this.chairIndex_playerInfo.length;
    },

    addPlayer: function(chairIndex, playerInfo){
        this.chairIndex_playerInfo[chairIndex] = playerInfo;
        playerInfo.playerCard.initCard(chairIndex);
    },

    removePlayer: function(chairIndex){
        this.chairIndex_playerInfo[chairIndex].status = MauBinh.PlayerStatus.NO_USER;
    },

    resetAllPlayers: function(){
        for (var chairIndex in this.chairIndex_playerInfo){
            this.removePlayer(chairIndex);
        }
    }

});

MauBinhPlayerMgr.getInstance = function(){
    if (!this._instance){
        this._instance = new MauBinhPlayerMgr();
    }
    return this._instance;
};