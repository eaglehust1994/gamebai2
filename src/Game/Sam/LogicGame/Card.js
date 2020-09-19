
Sam.Card = cc.Class.extend({
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

    compare: function(anotherCard){
        if(this.so > card2.so)
            return 1;
        else if(this.so == card2.so){
            return 0;
        }
        else
            return -1;
    },

    convertToServerCard: function(idex){
        return idex;
    },
});

Sam.Card.isGreater = function(a, b){
    return Sam.Card.isSoGreater(a.so, b.so);
}

Sam.Card.isSoGreater = function(a, b){
    return a > b;
},


Sam.Card.kQuanbai3 = 0;
Sam.Card.kQuanbai4 = 1;
Sam.Card.kQuanbai5 = 2;
Sam.Card.kQuanbai6 = 3;
Sam.Card.kQuanbai7 = 4;
Sam.Card.kQuanbai8 = 5;
Sam.Card.kQuanbai9 = 6;
Sam.Card.kQuanbai10 = 7;
Sam.Card.kQuanbaiJ = 8;
Sam.Card.kQuanbaiQ = 9;
Sam.Card.kQuanbaiK = 10;
Sam.Card.kQuanbaiA = 11;
Sam.Card.kQuanbai2 = 12;
Sam.Card.kQuanbaiNONE = 13;

Sam.Card.kChatBICH = 0;
Sam.Card.kChatCHUON = 1;
Sam.Card.kChatRO = 2;
Sam.Card.kChatCO = 3;