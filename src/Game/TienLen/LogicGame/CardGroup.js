//
TienLen.CardGroup = cc.Class.extend({
    //ctor with array of Cards
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
        this.typeGroup = TienLen.CardGroup.TYPENONE;
        if (size == 1)
        {
            this.typeGroup = TienLen.CardGroup.TYPEMOTLA;
            return;
        }
        else if(size == 2)
        {
            if ((this.cards[0].so) == (this.cards[1].so))
            {
                this.typeGroup = TienLen.CardGroup.TYPEDOI;
                return;
            }
            return;
        }
        else if(size == 3)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[0].so) == (this.cards[2].so))
            {
                this.typeGroup = TienLen.CardGroup.TYPEBALA;
                return;
            }
        }
        else if(size == 4)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[0].so) == (this.cards[2].so) && (this.cards[0].so) == (this.cards[3].so))
            {
                this.typeGroup = TienLen.CardGroup.TYPETUQUY;
                return;
            }
        }
        else if(size == 6)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[2].so) == (this.cards[3].so) && (this.cards[4].so) == (this.cards[5].so)
                && (this.cards[2].so == this.cards[1].so + 1) && (this.cards[4].so == this.cards[2].so + 1) && (this.cards[4].so != TienLen.Card.kQuanbai2))
            {
                this.typeGroup = TienLen.CardGroup.BADOITHONG;
                return;
            }
        }
        else if(size == 8)
        {
            if ((this.cards[0].so) == (this.cards[1].so) && (this.cards[2].so) == (this.cards[3].so) && (this.cards[4].so) == (this.cards[5].so) && (this.cards[6].so == this.cards[7].so)
                && (this.cards[2].so == this.cards[1].so + 1) && (this.cards[4].so == this.cards[3].so + 1) && (this.cards[6].so == this.cards[5].so + 1) &&(this.cards[6].so != TienLen.Card.kQuanbai2))
            {
                this.typeGroup = TienLen.CardGroup.BONDOITHONG;
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

        if(countSanh == this.cards.length -1 && countSanh >= 2 && this.cards[this.cards.length -1].so != TienLen.Card.kQuanbai2){
            sanh = true;
        }

        if (sanh)
        {
            this.typeGroup = TienLen.CardGroup.TYPESANH;
            return;
        }
    },

    // make sanh theo dung thu tu danh bai
    makeSanhArray: function(){
        var res = [];
        for(var i = 0; i< this.cards.length; i++ ) {
            res.push(this.cards[i]);
        }
        return res;
    }
});

TienLen.CardGroup.TYPENONE = -1; //  Don't be a group card
TienLen.CardGroup.TYPEMOTLA = 1;
TienLen.CardGroup.TYPEDOI = 2;
TienLen.CardGroup.TYPEBALA = 3;
TienLen.CardGroup.TYPESANH = 4;
TienLen.CardGroup.TYPETUQUY = 5;
TienLen.CardGroup.BADOITHONG = 6;
TienLen.CardGroup.BONDOITHONG = 7;
