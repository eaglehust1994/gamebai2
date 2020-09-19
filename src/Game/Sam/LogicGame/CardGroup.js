Sam.CardGroup = cc.Class.extend({
    //ctor with array of Cards
    ctor: function (cards) {
        this.cards = cards;
        this.typeGroup = -1;
    },

    ctor: function(cards){
        this.typeGroup= -1;
        this.cards = cards;
        this.initCards();
    },

    // Sort cards and find typeGroup
    initCards: function(){
        if(this.cards.length == 0)
            return;

        this.cards.sort(function(card1,card2){return card1.id - card2.id});      // sort tang dan`

        var size = this.cards.length;
        this.typeGroup = Sam.CardGroup.TYPENONE;
        if (size == 1)
        {
            this.typeGroup = Sam.CardGroup.TYPEMOTLA;
            return;
        }
        else if(size == 2)
        {
            if ((this.cards[0].so) == (this.cards[1].so))
            {
                this.typeGroup = Sam.CardGroup.TYPEDOI;
                return;
            }
            return;
        }
        else if(size == 3)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[0].so) == (this.cards[2].so))
            {
                this.typeGroup = Sam.CardGroup.TYPEBALA;
                return;
            }
        }
        else if(size == 4)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[0].so) == (this.cards[2].so) && (this.cards[0].so) == (this.cards[3].so))
            {
                this.typeGroup = Sam.CardGroup.TYPETUQUY;
                return;
            }
        }
        else if(size == 8)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[0].so) == (this.cards[2].so) && (this.cards[0].so) == (this.cards[3].so)
                && (this.cards[4].so) == (this.cards[5].so) && (this.cards[4].so) == (this.cards[6].so) && (this.cards[4].so) == (this.cards[7].so))
            {
                this.typeGroup = Sam.CardGroup.TYPEHAITUQUY;
                return;
            }
        }

        var sanh = false;
        var so = this.cards[0].so;

        var countSanh = 0;

        for (var i=1;i<this.cards.length ;i++) {
            if ((this.cards[i].so - 1) == so) {
                so = this.cards[i].so;
                countSanh++;
            }
        }

        if(countSanh == this.cards.length -1 && countSanh >= 2 && this.cards[this.cards.length -1].so != Sam.Card.kQuanbai2){
            sanh = true;
        }

        // day A, 2 vao dau mang cardSortNguoc;
        var cardSortNguoc = [];
        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so != Sam.Card.kQuanbaiA && this.cards[i].so != Sam.Card.kQuanbai2) {
                cardSortNguoc.push(this.cards[i]);
            }
        }

        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so == Sam.Card.kQuanbai2) {
                cardSortNguoc.splice(0, 0, this.cards[i]);
            }
        }

        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so == Sam.Card.kQuanbaiA){
                cardSortNguoc.splice(0, 0, this.cards[i]);
            }
        }


        countSanh = 0;
        so = cardSortNguoc[0].so;
        for (var i=1;i< cardSortNguoc.length ;i++) {
            if (Sam.convertSo(cardSortNguoc[i].so) == Sam.convertSo(so +1)) {
                so = cardSortNguoc[i].so;
                countSanh++;
            }
        }

        if(countSanh == this.cards.length -1 && countSanh >= 2){
            sanh = true;
        }

        if (sanh)
        {
            this.typeGroup = Sam.CardGroup.TYPESANH;
            return;
        }
    },

    isSanhNguoc: function(){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].so == Sam.Card.kQuanbai2){
                return true;
            }
        }
        return false;
    },

    // make sanh theo dung thu tu danh bai
    makeSanhArray: function(){
        if(this.isSanhNguoc()){
            return this.makeSanhNguocArray();
        }else{
            var res = [];
            for(var i = 0; i< this.cards.length; i++ ) {
                res.push(this.cards[i]);
            }
            return res;
        }
    },

    // make khi sanh la nguoc
    makeSanhNguocArray: function(){
        var res = [];
        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so != Sam.Card.kQuanbaiA && this.cards[i].so != Sam.Card.kQuanbai2) {
                res.push(this.cards[i]);
            }
        }

        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so == Sam.Card.kQuanbai2) {
                res.splice(0, 0, this.cards[i]);
            }
        }

        for(var i = 0; i< this.cards.length; i++ ) {
            if (this.cards[i].so == Sam.Card.kQuanbaiA){
                res.splice(0, 0, this.cards[i]);
            }
        }
        return res;
    },

    isSanhToiCot: function(){
        if(this.typeGroup != Sam.CardGroup.TYPESANH){
            return false;
        }
        var res = this.makeSanhArray();
        if(res[res.length -1].so == Sam.Card.kQuanbaiA){
            return true;
        }
        else{
            return false;
        }
    }
});




Sam.CardGroup.TYPENONE = -1; //  Don't be a group card
Sam.CardGroup.TYPEMOTLA = 1;
Sam.CardGroup.TYPEDOI = 2;
Sam.CardGroup.TYPEBALA = 3;
Sam.CardGroup.TYPESANH = 4;
Sam.CardGroup.TYPETUQUY = 5;
Sam.CardGroup.TYPEHAITUQUY = 6;
