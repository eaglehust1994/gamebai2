//
TienLen.Card = cc.Class.extend({
    ctor: function (id) {
        this.id = id;
        this.chat = this.getChatById(this.id);
        this.so = this.getSoById(this.id);
    },

    getChatById: function(id){
        return id%4;
    },

    getSoById: function(id){
        return Math.floor(id/4);
    },

    getDisplayId: function(id){
        return Math.floor(id/4);
    },

    isGreater: function(card2){
        return this.id > card2.id;
    },

    convertToServerCard: function(idex){
        return idex;
    }
});

TienLen.Card.isGreater = function(a, b){
    return a.id > b.id;
}


TienLen.Card.kQuanbai3 = 0;
TienLen.Card.kQuanbai4 = 1;
TienLen.Card.kQuanbai5 = 2;
TienLen.Card.kQuanbai6 = 3;
TienLen.Card.kQuanbai7 = 4;
TienLen.Card.kQuanbai8 = 5;
TienLen.Card.kQuanbai9 = 6;
TienLen.Card.kQuanbai10 = 7;
TienLen.Card.kQuanbaiJ = 8;
TienLen.Card.kQuanbaiQ = 9;
TienLen.Card.kQuanbaiK = 10;
TienLen.Card.kQuanbaiA = 11;
TienLen.Card.kQuanbai2 = 12;
TienLen.Card.kQuanbaiNONE = 13;

TienLen.Card.kChatBICH = 0;
TienLen.Card.kChatCHUON = 1;
TienLen.Card.kChatRO = 2;
TienLen.Card.kChatCO = 3;