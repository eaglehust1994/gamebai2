/**
 * Created by Tuan on 04-Aug-16.
 */

var MauBinhGroupCard = cc.Class.extend({
    ctor: function(){
        this.groupKind = -1;
        this.cardList = [];
        this.valueList = [];
        this.isSelected = false;
    },

    updateGroupCard: function(){
        this.groupKind = this.getGroupKind();

        for (var i=0; i<this.getNumberOfCards(); i++){
            this.cardList[i].display.setHighlight(true);
        }

        switch (this.groupKind){
            case MauBinh.GroupKind.THUNG_PHA_SANH:
            case MauBinh.GroupKind.CU_LU:
            case MauBinh.GroupKind.THUNG:
            case MauBinh.GroupKind.SANH:
                for (var i=0; i<this.getNumberOfCards(); i++){
                    this.cardList[i].display.setHighlight(false);
                }
                break;
            case MauBinh.GroupKind.TU_QUY:
            case MauBinh.GroupKind.SAM_CO:
            case MauBinh.GroupKind.MOT_DOI:
            case MauBinh.GroupKind.MAU_THAU:
                for (var i=0; i<this.getNumberOfCards(); i++){
                    if (this.cardList[i].getNumber() == this.valueList[0])
                        this.cardList[i].display.setHighlight(false);
                }
                break;
            case MauBinh.GroupKind.THU:
                for (var i=0; i<this.getNumberOfCards(); i++){
                    if ((this.cardList[i].getNumber() == this.valueList[0]) || (this.cardList[i].getNumber() == this.valueList[1]))
                        this.cardList[i].display.setHighlight(false);
                }
                break;
        };
    },

    getNumberOfCards: function(){
        return this.cardList.length;
    },

    addCard: function(card) {
        this.cardList.push(card);
    },

    removeCard: function(card){
        for (var i=0; i<this.getNumberOfCards(); i++){
            if (this.cardList[i].id == card.id){
                this.cardList.splice(i, 1);
                break;
            }
        }
    },

    getMaxNumber: function(){

    },

    getMaxId: function(){

    },

    getGroupKind: function(){

        if (this.getNumberOfCards() == 1)
            return MauBinh.GroupKind.MAU_THAU;

        if (this.getNumberOfCards() == 3){
            if (this.isSamCo())
                return MauBinh.GroupKind.SAM_CO;
            if (this.isMotDoi())
                return MauBinh.GroupKind.MOT_DOI;
            // this.reset();
            // for (var i=this.getNumberOfCards()-1; i>=0; i--)
            //     this.valueList.push(this.cardList[i].getNumber());
            // return MauBinh.GroupKind.MAU_THAU;
        }

        if (this.getNumberOfCards() == 5){
            if (this.isThungPhaSanh())
                return MauBinh.GroupKind.THUNG_PHA_SANH;
            if (this.isTuQuy())
                return MauBinh.GroupKind.TU_QUY;
            if (this.isCuLu())
                return MauBinh.GroupKind.CU_LU;
            if (this.isThung())
                return MauBinh.GroupKind.THUNG;
            if (this.isSanh())
                return MauBinh.GroupKind.SANH;
            if (this.isSamCo())
                return MauBinh.GroupKind.SAM_CO;
            if (this.isThu())
                return MauBinh.GroupKind.THU;
            if (this.isMotDoi())
                return MauBinh.GroupKind.MOT_DOI;
        }

        this.reset();
        var listCardTemp = this.getSortedCardList();
        for (var i=this.getNumberOfCards()-1; i>=0; i--)
            this.valueList.push(listCardTemp[i].getNumber());
        return MauBinh.GroupKind.MAU_THAU;
    },

    isThungPhaSanh: function(){
        if (this.getNumberOfCards() != 5) return false;
        var sortedCardList = this.getSortedCardList();
        var count = 1;
        for (var i=1; i<this.getNumberOfCards(); i++){
            if (sortedCardList[i].getSuit() == sortedCardList[i-1].getSuit()){
                if ((sortedCardList[i].getNumber() == sortedCardList[i-1].getNumber()+1) ||
                    ((sortedCardList[0].getNumber() == 2) && (sortedCardList[i].getNumber() == 14))){
                    count++;
                }
            }
        }
        if (count == this.getNumberOfCards()){
            this.reset();
            if ((sortedCardList[0].getNumber() == 2) && (sortedCardList[sortedCardList.length-1].getNumber() == 14)){
                this.valueList.push(1);//Thung pha sanh yeu nhat, bat dau tu A
            }
            else{
                this.valueList.push(sortedCardList[0].getNumber());
            }
        }
        return (count == this.getNumberOfCards());
    },

    isTuQuy: function(){
        if (this.getNumberOfCards() != 5 ) return false;
        for (var i=0; i<this.getNumberOfCards(); i++){
            var number = 1;
            for (var j=0; j<this.getNumberOfCards(); j++){
                if ((i!=j) && (this.cardList[i].getNumber() == this.cardList[j].getNumber())){
                    number++;
                }
                if (number == 4){
                    this.reset();
                    this.valueList.push(this.cardList[i].getNumber());
                    return true;
                }
            }
        }
        return false;
    },

    //3 la bai giong nhau + 1 doi giong nhau
    isCuLu: function(){
        if (this.getNumberOfCards() != 5 ) return false;
        var sortedCardList = this.getSortedCardList();
        var result = false;
        if (sortedCardList[0].getNumber() == sortedCardList[1].getNumber()) {
            if ((sortedCardList[1].getNumber() == sortedCardList[2].getNumber()) && (sortedCardList[3].getNumber() == sortedCardList[4].getNumber())){
                result = true;
                this.reset();
                this.valueList.push(sortedCardList[0].getNumber());
                this.valueList.push(sortedCardList[3].getNumber());
            }
            if ((sortedCardList[2].getNumber() == sortedCardList[3].getNumber()) && (sortedCardList[3].getNumber() == sortedCardList[4].getNumber())){
                result = true;
                this.reset();
                this.valueList.push(sortedCardList[2].getNumber());
                this.valueList.push(sortedCardList[0].getNumber())
            }
        }
        return result;
    },

    //1 day cac la bai dong chat
    isThung: function(){
        var sortedCardList = this.getSortedCardList();
        if (this.getNumberOfCards() != 5 ) return false;
        for (var i=1; i<this.getNumberOfCards(); i++){
            if (sortedCardList[i].getSuit() != sortedCardList[0].getSuit()){
                return false;
            }
        }
        this.reset();
        for (var i=this.getNumberOfCards()-1; i>=0 ; i--){
            this.valueList.push(sortedCardList[i].getNumber());
        }
        return true;
    },

    isSanh: function(){
        if (this.getNumberOfCards() != 5) return false;
        var sortedCardList = this.getSortedCardList();
        var count = 1;
        for (var i=1; i<this.getNumberOfCards(); i++){
            if ((sortedCardList[i].getNumber() == sortedCardList[i-1].getNumber()+1) ||
                ((sortedCardList[0].getNumber() == 2) && (i==this.getNumberOfCards()-1) && (sortedCardList[i].getNumber() == 14))){
                count++;
            }
        }
        if (count == this.getNumberOfCards()){
            this.reset();
            if ((sortedCardList[0].getNumber() == 2) && (sortedCardList[sortedCardList.length-1].getNumber() == 14)){
                this.valueList.push(1);//Sanh yeu nhat, bat dau tu A
            }
            else{
                this.valueList.push(sortedCardList[0].getNumber());
            }
        }
        return (count == this.getNumberOfCards());

    },

    //gom 1 bo 3 + 2 quan bai khac nhau
    isSamCo: function(){
        for (var i=0; i<this.getNumberOfCards(); i++){
            var count = 1;
            for (var j=0; j<this.getNumberOfCards(); j++){
                if ((i!=j) && (this.cardList[i].getNumber() == this.cardList[j].getNumber())){
                    count++;
                }
            }
            if (count == 3){
                this.reset();
                this.valueList.push(this.cardList[i].getNumber());
                return true;
            }
        }
        return false;
    },

    //gom 2 bo doi khac nhau
    isThu: function(){
        if (this.getNumberOfCards() != 5) return false;
        var pairList = [];
        for (var i=0; i<this.getNumberOfCards()-1; i++){
            if ((pairList.indexOf(this.cardList[i].getNumber()) == -1)){
                for (var j=i+1; j<this.getNumberOfCards(); j++) {
                    if (this.cardList[i].getNumber() == this.cardList[j].getNumber()) {
                        pairList.push(this.cardList[i].getNumber());
                        break;
                    }
                }
            }
        }
        if (pairList.length == 2){
            this.reset();
            this.valueList.push(Math.max(pairList[0], pairList[1]));
            this.valueList.push(Math.min(pairList[0], pairList[1]));
            for (var i=0; i<this.getNumberOfCards(); i++){
                if (pairList.indexOf(this.cardList[i].getNumber()) == -1){
                    this.valueList.push(this.cardList[i].getNumber());
                }
            }
            return true;
        }
        return false;
    },

    isMotDoi: function(){
        var pairList = [];
        for (var i=0; i<this.getNumberOfCards()-1; i++){
            for (var j=i+1; j<this.getNumberOfCards(); j++){
                if (this.cardList[i].getNumber() == this.cardList[j].getNumber()){
                    pairList.push(this.cardList[i].getNumber());
                }
            }
        }
        if (pairList.length == 1){
            this.reset();
            this.valueList.push(pairList[0]);
            var sortedCardList = this.getSortedCardList();
            for (var i=this.getNumberOfCards()-1; i>=0; i--){
                if (sortedCardList[i].getNumber() != pairList[0]){
                    this.valueList.push(sortedCardList[i].getNumber());
                }
            }
            return true;
        }
        return false;
    },

    getGroupKindLevel: function(isTinhAt){
        var result = MauBinh.GroupKindLevel.BINH_THUONG;
        if (isTinhAt){
            if ((this.groupKind == MauBinh.GroupKind.THUNG_PHA_SANH) || (this.groupKind == MauBinh.GroupKind.SANH)){
                if (this.valueList[0] == 10){// 10,J,Q,K,A
                    result = MauBinh.GroupKindLevel.THUONG;
                }
                else if (this.valueList[0] == 1){ // A,2,3,4,5
                    result = MauBinh.GroupKindLevel.HA;
                }
            }
        }
        return result;
    },

    getSortedCardList: function(){
        var result = [];
        for (var i=0; i<this.getNumberOfCards(); i++){
            result.push(this.cardList[i]);
        }
        result.sort(function(a, b){return (a.getId()>b.getId())});
        return result;
    },

    sortCardList: function(increase){
        if (increase)
            this.cardList.sort(function(a, b){return b.getId() - a.getId()});
        else
            this.cardList.sort(function(a, b){return a.getId() - b.getId()});
    },

    reset: function(){
        this.valueList = [];
        //this.sortCardList(true);
    }

});