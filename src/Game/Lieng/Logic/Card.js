/**
 * Created by Tuan on 04-Aug-16.
 */

Lieng.Card = cc.Class.extend({
    ctor: function(id) {
        this.id = id;
        this.so = this.getSoById(id);
        this.chat = this.getChatById(id);
        this.diem = this.getDiem();
    },

    getId: function(){
        return this.id;
    },

    getSoById: function(idValue){
        return Math.floor(idValue/4);
    },

    getChatById: function(idValue){
        return Math.floor(idValue%4);
    },

    getDiem: function(){
        if(this.so <= 8){
            return this.so+1;
        }
        else{
            return 0;
        }
    },


    getDisplayId: function(id){
        var realSo;
        if(id < 4){
            realSo = 11;
        }else if(id < 8){
            realSo = 12
        }
        else{
            realSo = Math.floor(id/4) - 2;
        }

        var chat = Math.floor(id%4);
        if(chat == 3){
            chat = 2;
        }
        else if(chat == 2){
            chat = 3;
        }
        return realSo*4 + chat;
    }
});

Lieng.Card.getDisplayId = function(id){
    var realSo;
    if(id < 4){
        realSo = 11;
    }else if(id < 8){
        realSo = 12
    }
    else{
        realSo = Math.floor(id/4) - 2;
    }

    var chat = Math.floor(id%4);
    if(chat == 3){
        chat = 2;
    }
    else if(chat == 2){
        chat = 3;
    }
    return realSo*4 + chat;
}
