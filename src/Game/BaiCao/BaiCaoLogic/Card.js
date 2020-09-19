//
BaiCao.Card = cc.Class.extend({
    ctor: function(id){
        this.id = id;
        this.so = BaiCao.Card.getSoById(id);
        this.chat = BaiCao.Card.getChatById(id);
        this.diem = BaiCao.Card.getDiemById(id);
    }
});

BaiCao.Card.getSoById = function(id){
    return Math.floor(id/4);
};

BaiCao.Card.getDiemById = function(id){
    if(id >= 36)
        return 0;

    return Math.floor(id/4) + 1;
}

BaiCao.Card.getChatById = function (id){
    return id % 4;
}

BaiCao.Card.getNormalId = function(id){
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
