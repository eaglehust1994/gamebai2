Lieng.BoBaiLieng = new cc.Class.extend({
    ctor: function(cards){
        this.cards = cards;
    },

    getDiem: function(){
        var sum = 0;
        var i = 0;
        for(i =0; i < this.cards.length; i++){
            sum += this.cards[i].diem;
        }
        sum = sum %10;
        return sum;
    },

    isSap: function(){
        var count = 0;
        var so = this.cards[0].so;
        for(var i = 1; i < this.cards.length; i++){
            if(so == this.cards[i].so)
                count++;
        }
        return (count == 2);
    },

    getSo: function() {
        return this.cards[0].diem;
    },

    hasAtCu: function(){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].id == 3){
                return true;
            }
        }
    },

    isSapAt: function(){
        return this.isSap() && this.cards[0].so == 0;
    },

    getNameImage: function(){
        if(this.isSapAt()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_at.png";
        }
        else if(this.isSap()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_" + this.getSo()+".png";
        }
        else if(this.isAnh()){

        }
        else if(this.isMuoiCu()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/muoiAtCu.png";
        }
        else{
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/"+this.getDiem() +"Diem.png";
        }
    },


    needShadown: function(){
        var flag = true;
        if(this.isSapAtCu()){
            flag = false;
        }
        else if(this.isSapAt()){
            flag = false;
        }
        else if(this.isSap()){
            flag = false;
        }

        else if(this.isLiengDongChat()){
            flag = false;
        }
        return flag;
    },

    xacSuatSap: function(){
        return 13*4/(52*51*50/6);
    },

    xacSuatLieng: function(){

    },


})