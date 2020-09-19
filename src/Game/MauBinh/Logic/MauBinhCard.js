/**
 * Created by Tuan on 04-Aug-16.
 */

var MauBinhCard = cc.Class.extend({

    ctor: function (id, spriteDisplay) {
        this.id = id;
        this.display = new MauBinhCardDisplay(this, spriteDisplay);
    },

    setCard: function(number, suit){
        this.id = (number - 2) * 4 + suit;
    },

    getNumber: function(){
        return (Math.floor(this.id / 4) + 2);
    },

    getSuit: function(){
        return (this.id % 4);
    },

    getId: function(){
        return this.id;
    },

    getColor: function(){
        var suit = this.getSuit();
        if (suit == MauBinh.CardSuit.SPADE || suit == MauBinh.CardSuit.CLUB){
            return MauBinh.CardColor.BLACK;
        }
        else if (suit == MauBinh.CardSuit.DIAMOND || suit == MauBinh.CardSuit.HEART){
            return MauBinh.CardColor.RED;
        }
        DebugUtil.log("Not consistent card color with suit = " + suit);
        return null;
    }
});