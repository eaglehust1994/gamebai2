/**
 * Created by Tuan on 04-Aug-16.
 */

XiZach.Card = cc.Class.extend({

    ctor: function (id, spriteDisplay) {
        this.id = id;
        this.so = this.getNumber();
        this.chat = this.getSuit();
    },

    setCard: function(number, suit){
        this.id = (number - 2) * 4 + suit;
    },

    getNumber: function(){
        return (Math.floor(this.id / 4));
    },

    getSuit: function(){
        return (this.id % 4);
    },

    getId: function(){
        return this.id;
    },

    getDisplayId: function(id){
        var realSo;
        if(id < 0 || id >= 52){
            realSo = 52;
        }
        else{
            realSo = (id - 8 + 52)%52;
        }

        return realSo;
    },

    isXi: function(){
        return this.so == 0;
    },

    soSanhSo: function( card) {
        return (this.so - other.so);
    },

    getDiem: function(){
        if(this.isXi()){
            return 1;
        }
        else{
            if(this.so == 9 || this.so == 10 || this.so == 11 || this.so == 12){
                return 10;
            }
            else{
                return this.so + 1;
            }
        }
    },

    getMinDiem: function(){
        if(this.isXi()){
            return 1;
        }
        else{
            if(this.so == 9 || this.so == 10 || this.so == 11 || this.so == 12){
                return 10;
            }
            else{
                return this.so + 1;
            }
        }
    }
});

XiZach.Card.getDisplayId = function(id){
    var realSo;
    if(id < 0 || id >= 52){
        realSo = 52;
    }
    else{
        realSo = (id - 8 + 52)%52;
    }

    return realSo;
}
