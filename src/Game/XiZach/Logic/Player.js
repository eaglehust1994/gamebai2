//
XiZach.Player = cc.Class.extend({
    ctor: function(){
        //thong tin cua nguoi choi;
        this.ingame= false;
        this.active = true;
        this.chairInServer= -1;
        this.chairLocal= -1;
        this.type= 1;            // type = 0: My
        this.cards= [];
        this.state= 0;
        this.status= -1;
        // user info
        this.nickName = "phuBaDao";
        this.avatar = "1";
        this.isMy = false;
        this.moneyBet = 0;
        this.hasSoBai = false;
        this.hasMoBai = false;
        this.hasDanBai = false;
        this.isWiner = false;
        this.groupCard = new XiZach.GroupCard([]);
        this.needShowWinLostMoney = true;
    },

    //initWithPlayer: function(player){
    //    //thong tin cua nguoi choi;
    //    this.ingame= player.ingame;
    //    this.active = player.active;
    //    this.chairInServer= player.chairInServer;
    //    this.chairLocal= player.chairLocal;
    //    this.type = player.type;            // type = 0: My
    //    this.cards= player.cards;
    //    this.state= player.state;
    //    this.status= player.status;
    //    // user info
    //    this.nickName = player.nickName;
    //    this.avatar = player.avatar;
    //    this.isMy = player.isMy;
    //    this.moneyBet = player.moneyBet;
    //    this.hasSoBai = player.hasSoBai;
    //    this.hasMoBai = player.hasMoBai;
    //    this.hasDanBai = player.hasDanBai;
    //    this.isWiner = player.isWiner;
    //    this.groupCard = this.player;
    //    this.needShowWinLostMoney = true;
    //},

    clearNewGame: function(){
        this.hasMoBai = false;
        this.hasSoBai = false;
        this.moneyBet = 0;
        this.needShowWinLostMoney = false;
        this.groupCard.clearCard();
    },

    canDanBai: function(){
        return (this.hasDanBai == false && this.groupCard.canDanBai());
    },


    getBoName: function(){
        return (this.groupCard.getBoName());
    },

    getDiemBoBai: function(){
        return this.groupCard.getMaxDiem();
    },


    canRutBai: function(){
        var res1 = this.groupCard.canRutBai();
        var res = this.hasDanBai == false && res1;
        return res;
    },

    isPlaying: function(){
        return this.status == XiZach.GameStatus.PLAYING;
    },

    isChuong: function(){
        return this.index == XiZach.gameLogic.chuongChair;
    },

    getCardSize: function(){
        return this.groupCard.getCardSize();
    },

    resetNewGame: function(){
        this.hasDanBai = false;
        this.hasMoBai = false;
        this.hasSoBai = false;
        this.groupCard.clearCard();
    }
});