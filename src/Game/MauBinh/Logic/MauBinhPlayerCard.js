/**
 * Created by Tuan on 11-Aug-16.
 */

var MauBinhPlayerCard = cc.Class.extend({

    ctor: function(){
        this.maubinhType = MauBinh.Type.BINH_THUONG;
        this.chiDau = new MauBinhGroupCard();
        this.chiGiua = new MauBinhGroupCard();
        this.chiCuoi = new MauBinhGroupCard();
    },

    initCard: function(chairIndex){
        var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
        for (var j=0; j<5; j++)
            this.chiDau.addCard(new MauBinhCard(52, gameGui.getCardSprite(chairIndex, j)));
        for (var j=5; j<10; j++)
            this.chiGiua.addCard(new MauBinhCard(52, gameGui.getCardSprite(chairIndex, j)));
        for (var j=10; j<13; j++)
            this.chiCuoi.addCard(new MauBinhCard(52, gameGui.getCardSprite(chairIndex, j)));
    },

    addCardToChiDau: function(card){
        this.chiDau.addCard(card);
    },

    addCardToChiGiua: function(card){
        this.chiGiua.addCard(card);
    },

    addCardToChiCuoi: function(card){
        this.chiCuoi.addCard(card);
    },

    getChi: function(chiIndex){
        switch (chiIndex){
            case 1:
                return this.chiDau;
            case 2:
                return this.chiGiua;
            case 3:
                return this.chiCuoi;
        }
    },

    getGroupCardContainsIndex: function(index) {
        if ((0 <= index) && (index < 5))
            return this.chiDau;
        else if (index < 10)
            return this.chiGiua;
        else if (index < 13)
            return this.chiCuoi;
        return null;
    },

    getAllCards: function(){
        var result = [];
        result = result.concat(this.chiDau.cardList);
        result = result.concat(this.chiGiua.cardList);
        result = result.concat(this.chiCuoi.cardList);
        return result;
    },

    swapCard: function(card1, card2){
        var tempId = card1.id;
        card1.id = card2.id;
        card2.id = tempId;

        var tempTexture = card1.display.sprite.getTexture();
        GuiUtil.changeSpriteWithTexture(card1.display.sprite, card2.display.sprite.getTexture());
        GuiUtil.changeSpriteWithTexture(card2.display.sprite, tempTexture);
    },

    updatePlayerCard: function(isTinhAt){
        this.chiDau.updateGroupCard();
        this.chiGiua.updateGroupCard();
        this.chiCuoi.updateGroupCard();

        if (this.isSanhRong()){
            this.maubinhType = MauBinh.Type.SANH_RONG;
        }
        else if (isTinhAt && this.isMuoiBaCayDongMau()){
            this.maubinhType = MauBinh.Type.MUOI_BA_CAY_DONG_MAU;
        }
        else if (isTinhAt && this.isMuoiHaiCayDongMau()){
            this.maubinhType = MauBinh.Type.MUOI_HAI_CAY_DONG_MAU;
        }
        else if (this.isBaCaiThung()){
            this.maubinhType = MauBinh.Type.BA_CAI_THUNG;
        }
        else if (this.isBaCaiSanh()){
            this.maubinhType = MauBinh.Type.BA_CAI_SANH;
        }
        else if (this.isLucPheBon()){
            this.maubinhType = MauBinh.Type.LUC_PHE_BON;
        }
        else if (this.isBinhLung(isTinhAt)){
            this.maubinhType = MauBinh.Type.BINH_LUNG;
        }
        else{
            this.maubinhType = MauBinh.Type.BINH_THUONG;
        }

        cc.log("Chi1: " + MauBinhPlayerCard.getGroupKindString(this.chiDau.groupKind) + ", Chi2: " + MauBinhPlayerCard.getGroupKindString(this.chiGiua.groupKind) +
                ", Chi3: " + MauBinhPlayerCard.getGroupKindString(this.chiCuoi.groupKind) + ", Bai: " + MauBinhPlayerCard.getMauBinhString(this.maubinhType));
    },

    isSanhRong: function(){
        var sortedCardList = this.getSortedCardListFromList(this.getAllCards());
        var count = 0;
        var number = 1;
        for (var i=0; i<sortedCardList.length; i++){
            number++;
            if (sortedCardList[i].getNumber() == number){
                count++;
            }
        }
        return (count == 13);
    },

    isMuoiBaCayDongMau: function(){
       var cardList = this.getAllCards();
        var blackCount = 0, redCount = 0;
        for (var i=0; i<cardList.length; i++){
            if (cardList[i].getColor() == MauBinh.CardColor.BLACK)
                blackCount++;
            else
                redCount++;
        }
        return ((blackCount==13) || (redCount==13));
    },

    isMuoiHaiCayDongMau: function(){
        var cardList = this.getAllCards();
        var blackCount = 0, redCount = 0;
        for (var i=0; i<cardList.length; i++){
            if (cardList[i].getColor() == MauBinh.CardColor.BLACK)
                blackCount++;
            else
                redCount++;
        }
        return ((blackCount==12) || (redCount==12));
    },

    isBaCaiThung: function(){
        if (((this.chiDau.groupKind == MauBinh.GroupKind.THUNG_PHA_SANH) || (this.chiDau.groupKind == MauBinh.GroupKind.THUNG))
            && ((this.chiGiua.groupKind == MauBinh.GroupKind.THUNG_PHA_SANH) || (this.chiGiua.groupKind == MauBinh.GroupKind.THUNG))){
            var chiCuoiCardList = this.chiCuoi.cardList;
            if ((chiCuoiCardList[0].getSuit() == chiCuoiCardList[1].getSuit()) && (chiCuoiCardList[1].getSuit() == chiCuoiCardList[2].getSuit())){ //3 la dong chat o chi cuoi
                return true;
            }
        }
        return false;
    },

    isBaCaiSanh: function(){
        if (((this.chiDau.groupKind == MauBinh.GroupKind.THUNG_PHA_SANH) || (this.chiDau.groupKind == MauBinh.GroupKind.SANH))
            && ((this.chiGiua.groupKind == MauBinh.GroupKind.THUNG_PHA_SANH) || (this.chiGiua.groupKind == MauBinh.GroupKind.SANH))){
            var chiCuoiCardList = this.chiCuoi.cardList;
            var sortedCard = this.getSortedCardListFromList(chiCuoiCardList);
            if (((sortedCard[0].getNumber()+1 == sortedCard[1].getNumber()) && (sortedCard[1].getNumber()+1 == sortedCard[2].getNumber())) ||
                ((sortedCard[0].getNumber() == 2) && (sortedCard[1].getNumber() == 3) && (sortedCard[2].getNumber() == 14))){ //3 la lien tiep o chi cuoi
                return true;
            }
        }
        return false;
    },

    haveSauDoi: function(){
        var sortedCardList = this.getSortedCardListFromList(this.getAllCards());
        var count = 0, index = 0;
        while (index <sortedCardList.length){
            if (index+1<sortedCardList.length){
                if (sortedCardList[index+1].getNumber() == sortedCardList[index].getNumber()) {
                    count++;
                    index++;
                }
            }
            index++;
        }
        return (count == 6);
    },

    isLucPheBon: function(){
        if (this.haveSauDoi()){//boi bai co 6 doi khong can khac nhau
            if ((this.chiDau.groupKind == MauBinh.GroupKind.THU) && (this.chiGiua.groupKind == MauBinh.GroupKind.THU) &&(this.chiCuoi.groupKind == MauBinh.GroupKind.MOT_DOI)) {
                return true;
            }
        }
        return false;
    },

    isBinhLung: function(isTinhAt){
        if (MauBinhRule.compareChi(this.chiDau, this.chiGiua, isTinhAt)<0 || (MauBinhRule.compareChi(this.chiGiua, this.chiCuoi, isTinhAt)<0)){
            return true;
        }
        return false;
    },

    getSortedCardListFromList: function(cardList){
        var result = [];
        for (var i=0; i<cardList.length; i++){
            result.push(cardList[i]);
        }

        for (var i=0; i<result.length-1; i++){
            for (var j=i+1; j<result.length; j++){
                if (result[i].getId() > result[j].getId()){
                    var temp = result[i];
                    result[i] = result[j];
                    result[j] = temp;
                }
            }
        }
        return result;
    },

});

MauBinhPlayerCard.getGroupKindString = function(groupKind){
  switch (groupKind){
      case MauBinh.GroupKind.THUNG_PHA_SANH:
          return "THUNG_PHA_SANH";
      case MauBinh.GroupKind.TU_QUY:
          return "TU_QUY";
      case MauBinh.GroupKind.CU_LU:
          return "CU_LU";
      case MauBinh.GroupKind.THUNG:
          return "THUNG";
      case MauBinh.GroupKind.SANH:
          return "SANH";
      case MauBinh.GroupKind.SAM_CO:
          return "SAM_CO";
      case MauBinh.GroupKind.THU:
          return "THU";
      case MauBinh.GroupKind.MOT_DOI:
          return "MOT_DOI";
      case MauBinh.GroupKind.MAU_THAU:
          return "MAU_THAU";
  }
};

MauBinhPlayerCard.getMauBinhString = function(mauBinhType){
    switch (mauBinhType){
        case MauBinh.Type.SANH_RONG:
            return "SANH_RONG";
        case MauBinh.Type.MUOI_BA_CAY_DONG_MAU:
            return "MUOI_BA_CAY_DONG_MAU";
        case MauBinh.Type.MUOI_HAI_CAY_DONG_MAU:
            return "MUOI_HAI_CAY_DONG_MAU";
        case MauBinh.Type.BA_CAI_THUNG:
            return "BA_CAI_THUNG";
        case MauBinh.Type.BA_CAI_SANH:
            return "BA_CAI_SANH";
        case MauBinh.Type.LUC_PHE_BON:
            return "LUC_PHE_BON";
        case MauBinh.Type.BINH_THUONG:
            return "BINH_THUONG";
        case MauBinh.Type.BINH_LUNG:
            return "BINH_LUNG";
    }
};