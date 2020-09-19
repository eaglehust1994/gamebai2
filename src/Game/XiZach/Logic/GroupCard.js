//
XiZach.GroupCard = cc.Class.extend({
    ctor: function(cards){
        this.cards = cards;
        this.bo = -1;
        this.kiemTraBo();
    },

    addCard: function(c){
        this.cards.push(new XiZach.Card(c));
        this.kiemTraBo();
    },

    addCards: function(cs){
        cc.log("addCards Size: " + cs.length);
        var temp = " ";
        for(var i = 0; i < cs.length; i++){
            temp += " " + cs[i];
            this.cards.push(new XiZach.Card(cs[i]));
        }
        cc.log("addCard List: "  + temp);

        this.kiemTraBo();
    },

    kiemTraBo: function(){
        if(this.bo == -1 || this.bo == XiZach.GroupCard.KG_WRONG){
            return this.tinhBo();
        }
        return this.bo;
    },

    tinhBo: function(){
        if(this.size < 2)
            return XiZach.GroupCard.KG_WRONG;

        for(var i = 0; i < this.size; i++){
            if(this.cards[i].id >=52 && this.cards[i].id < 0){
                return XiZach.GroupCard.KG_WRONG;
            }
        }

        if(this.isXiBang()){
            return XiZach.GroupCard.KG_XIBANG;

        }
        else if(this.isXiZach()){
            return XiZach.GroupCard.KG_XIZACH;
        }
        else if(this.isNguLinh()){
            return XiZach.GroupCard.KG_NGULINH;
        }
        else if(this.getMaxDiem() == 21){
            return XiZach.GroupCard.KG_21DIEM;
        }

        if(this.isQuac()){
            this.bo = XiZach.GroupCard.KG_QUAC;
            return XiZach.GroupCard.KG_QUAC;
        }
        else if(this.cards.length < 2){
            this.bo = XiZach.GroupCard.KG_WRONG;
            return XiZach.GroupCard.KG_WRONG;
        }
        else if(this.getMaxDiem() < 16){
            this.bo = XiZach.GroupCard.KG_DANNON;
            return XiZach.GroupCard.KG_DANNON;
        }
        else{
            this.bo = XiZach.GroupCard.KG_THUONG;
            return XiZach.GroupCard.KG_THUONG;
        }
    },

    getCardSize: function(){
        return this.cards.length;
    },

    isXiBang: function(){
        if(this.cards.length == 2 && this.cards[0].isXi() && this.cards[1].isXi()){
            return true;
        }
        return false;
    },

    isXiZach: function(){
        if(this.cards.length == 2 && this.cards[0].isXi() && this.cards[1].getDiem() == 10){
            return true;
        }

        if(this.cards.length == 2 && this.cards[1].isXi() && this.cards[0].getDiem() == 10){
            return true;
        }
        return false;
    },

    clearCard: function(){
        this.cards = [];
        this.bo = -1;
    },

    hasXi: function(){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].isXi())
                return true;
        }
        return false;
    },

    isNguLinh: function(){
        if(this.cards.length >= 5 && this.getMinDiem() <= 21){
            return true;
        }
        return false;
    },

    isQuac: function(){
        return this.getMaxDiem() > 21;
    },

    canRutBai: function(){
        if(this.isXiZach() || this.isXiBang()){
            return false;
        }
        return (this.getMinDiem() >= 21) && (!this.isNguLinh());
    },


    canDanBai: function(){
        cc.log("canDanBai: " + this.getMaxDiem());
        return this.isNguLinh() || this.getMaxDiem() >= 16;
    },


    canRutBai: function(){
        if(this.isXiZach() || this.isXiBang()){
            return false;
        }

        return ( (this.getMinDiem() < 21) && !this.isNguLinh());
    },


    getMinDiem: function(){
        var sum = 0;
        for(var i = 0; i < this.cards.length; i++){
            sum += this.cards[i].getMinDiem();
        }
        return sum;
    },

    getMaxDiem: function(){
        if(this.isXiBang() || this.isXiZach()){
            return 21;
        }
        var minDiem = this.getMinDiem();
        if(!this.hasXi()){
            return minDiem;
        }
        else{
            if(!this.has2XiTroLen()){
                return this.chonDiemMax(minDiem, minDiem + 10);
            }
            else {
                var a1 = minDiem;
                return a1;
            }
        }
    },


    chonDiemMax: function(a, b){
        if(a < 16 && b > 21){
            return a;
        }
        if(b < 16 && a > 21){
            return b;
        }

        if(a < 16 || a> 21){
            return b;
        }

        if(b < 16 || b > 21){
            return a;
        }

        if( a <= b){
            return b;
        }
        else{
            return a;
        }
    },


    has2XiTroLen: function(){
        var countXi = 0;
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].isXi()){
                countXi++;
            }
        }
        return (countXi >=2);
    },

    getNameImage: function(){
        var kk = this.tinhBo();
        if(kk == XiZach.BoXiZach.KG_XIBANG){
            return "res/CardGame/blackjack/xibang.png";
        }
        else if(kk == XiZach.BoXiZach.KG_XIZACH){
            return "res/CardGame/blackjack/xizach.png";
        }
        else if(kk == XiZach.BoXiZach.KG_NGULINH){
            return "res/CardGame/blackjack/ngulinh.png";
        }
        else if(kk == XiZach.BoXiZach.KG_QUAC){
            return "res/CardGame/blackjack/quac.png";
        }
        else if(kk == XiZach.BoXiZach.KG_21DIEM){
            return "res/CardGame/blackjack/21diem.png";
        }
        else{
            return "res/CardGame/blackjack/xibang.png";
        }
    },


    needShadown: function(boBai){
        return false;
    },

    getBoName: function(){
        return this.tinhBo();
    }

});




XiZach.GroupCard.group_names = ["WR", "DN", "Q", "T", "21", "NL", "XR", "XB"];
XiZach.GroupCard.KG_WRONG = 0;
XiZach.GroupCard.KG_XIBANG = 7;
XiZach.GroupCard.KG_XIZACH = 6;
XiZach.GroupCard.KG_NGULINH = 5;
XiZach.GroupCard.KG_21DIEM = 4;
XiZach.GroupCard.KG_THUONG = 3;
XiZach.GroupCard.KG_QUAC = 2;
XiZach.GroupCard.KG_DANNON = 1;