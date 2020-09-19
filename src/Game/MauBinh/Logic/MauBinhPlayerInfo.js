/**
 * Created by Tuan on 10-Aug-16.
 */

var MauBinhPlayerInfo = cc.Class.extend({

    ctor: function(){
        this.uid = null;
        this.nickName = "";
        this.currentMoney = 0;
        this.chairIndex = -1;
        this.playerCard = new MauBinhPlayerCard();
        this.status = -1;
    },

    toString: function(){
        return "[nickName: " + this.nickName + ", money: " + this.currentMoney + ", localChairIndex: " + this.chairIndex + ", status: " + this.status + "]";
    }
});