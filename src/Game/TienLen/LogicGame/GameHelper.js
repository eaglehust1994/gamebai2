
TienLen.GameHelper  = function(){};


TienLen.GameHelper.compareCard = function(card1, card2){
    return card1.id > card2.id;
};

//pass by review
TienLen.GameHelper.kiemtraDanh = function(cards){
    var group = new TienLen.CardGroup(cards);
    if(group.typeGroup != TienLen.CardGroup.TYPENONE)
        return true;
    return false;
}

// pass by review
TienLen.GameHelper.kiemtraChatQuan = function(a, b) {
    if(TienLen.gameLogic.changeTurnChair != 0){
        if(b.typeGroup != TienLen.CardGroup.BONDOITHONG || TienLen.gameLogic.chairLastTurn == 0){
            return false;
        }
    }

    var len1 = a.cards.length;
    var len2 = b.cards.length;

    if (a.typeGroup != b.typeGroup)
    {
        // Nhung TH dac biet khac loai nhom bai ma co the chat duoc
        if ((a.typeGroup == TienLen.CardGroup.TYPEMOTLA) && (a.cards[0].so == TienLen.Card.kQuanbai2) && (b.typeGroup == TienLen.CardGroup.TYPETUQUY ||
            b.typeGroup == TienLen.CardGroup.BADOITHONG || b.typeGroup == TienLen.CardGroup.BONDOITHONG))
        {
            return true;
        }
        else if((a.typeGroup == TienLen.CardGroup.TYPEDOI) && (a.cards[0].so == TienLen.Card.kQuanbai2) && (b.typeGroup == TienLen.CardGroup.TYPETUQUY || b.typeGroup == TienLen.CardGroup.BONDOITHONG))
        {
            return true;
        }
        else if((a.typeGroup == TienLen.CardGroup.BADOITHONG) && (b.typeGroup == TienLen.CardGroup.TYPETUQUY || b.typeGroup == TienLen.CardGroup.BONDOITHONG)){
            return true;
        }
        else if((a.typeGroup == TienLen.CardGroup.TYPETUQUY) && (b.typeGroup == TienLen.CardGroup.BONDOITHONG)){
            return true;
        }
        return false;
    }

    switch (a.typeGroup)
    {
        case TienLen.CardGroup.TYPEMOTLA:
        case TienLen.CardGroup.TYPEDOI:
        case TienLen.CardGroup.TYPEBALA:
        case TienLen.CardGroup.BADOITHONG:
        case TienLen.CardGroup.BONDOITHONG:
        case TienLen.CardGroup.TYPETUQUY:
            return b.cards[len2 -1].id > a.cards[len1 -1].id;
            break;
        case TienLen.CardGroup.TYPESANH:
        {
            if ((len1!= len2) || (a.cards[len1 -1].id >= b.cards[len2 -1].id))
            {
                return false;
            }
            else
            {
                return true;
            }

            break;
        }

        default:
            return false;
            break;
    }
}


TienLen.GameHelper.sapxepQuanBai = function(card, sort){
    if (sort == TienLen.kSortTangDan)
    {
        card.sort(function(a, b){return a.id- b.id});
        return card;
    }
    else if(sort == TienLen.kSortGroup)
    {
        var tmp = card.slice();
        var cards = [];
        tmp.sort(function(a, b){return a.id- b.id});

        if (tmp.length >= 4)
        {
            // check tu quy
            var size = tmp.length-1;
            var count = 0;
            while (size > 0)
            {
                if (tmp[size].so == tmp[size-1].so)
                {

                    count++;
                    if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                    {
                        cards.push(tmp[size-1]);
                        cards.push(tmp[size]);
                        cards.push(tmp[size+1]);
                        cards.push(tmp[size+2]);
                        tmp.splice(size-1,4);
                        size-=4;
                        count =0;
                    }
                    else
                    {
                        size--;
                    }
                }
                else
                {
                    count = 0;
                    size--;
                }
            }
        }

        if (tmp.length >= 4)
        {
            // check tu quy
            var size = tmp.length-1;
            var count = 0;
            while (size > 0)
            {
                if (tmp[size].so == tmp[size-1].so)
                {

                    count++;
                    if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                    {
                        cards.push(tmp[size-1]);
                        cards.push(tmp[size]);
                        cards.push(tmp[size+1]);
                        cards.push(tmp[size+2]);
                        tmp.splice(size-1,4);
                        size-=4;
                        count =0;
                    }
                    else
                    {
                        size--;
                    }
                }
                else
                {
                    count = 0;
                    size--;
                }
            }
        }

        if (tmp.length >= 3)
        {
            // Check sanh doc
            while (true)
            {
                var idx = [];					// Loai bo cac quan bai bang nhau khac chat (de xet cac sanh) , no bao gom chi so cua cac quan bai trong vector tmp
                idx.push(0);
                for (var i = 1;i<tmp.length;i++)
                {
                    if (tmp[i].so > tmp[i-1].so)
                    {
                        idx.push(i);
                    }
                }
                if (idx.length < 3)
                {
                    break;
                }
                var sanhIdxs = [];				// Chi so cac quan bai tao sanh doc trong vector tmp
                var cosanhdoc = false;
                var iter = idx.length-1;
                while (iter > 0)
                {
                    var end = false;
                    cc.log("sapxepquanbai" + tmp[idx[iter]].so + " " +  tmp[idx[iter-1]].so );
                    if (tmp[idx[iter]].so == (tmp[idx[iter-1]].so+1))
                    {
                        if (sanhIdxs.length == 0)
                        {
                            sanhIdxs.push(idx[iter]);
                        }
                        sanhIdxs.push(idx[iter-1]);
                        if (iter == 1)
                        {
                            end = true;
                        }
                    }
                    if(tmp[idx[iter]].so != (tmp[idx[iter-1]].so+1) || end)
                    {
                        if (sanhIdxs.length >= 3)
                        {
                            for (var j=sanhIdxs.length-1;j>=0;j--)
                            {
                                cards.push(tmp[sanhIdxs[j]]);
                            }
                            cosanhdoc = true;
                            for (var j=0;j<sanhIdxs.length;j++)
                            {
                                tmp.splice(sanhIdxs[j],1);
                            }
                            sanhIdxs = [];

                            break;
                        }
                        sanhIdxs = [];
                    }
                    iter--;
                }
                if (!cosanhdoc)
                {
                    break;
                }
            }

            // Check ba la
            var size = tmp.length-1;
            var count = 0;
            while (size > 0)
            {
                if (tmp[size].so == tmp[size-1].so)
                {
                    count++;
                    if (count == 2)		// co tu quy tu` (size-1) -> size + 1
                    {
                        cards.push(tmp[size-1]);cards.push(tmp[size]);cards.push(tmp[size+1]);
                        tmp.splice(size-1,3);
                        size -= 3;
                        count = 0;

                    }
                    else
                    {
                        size--;
                    }
                }
                else
                {
                    count = 0;
                    size--;
                }

            }

        }


        if (tmp.length >= 2)
        {
            // Check doi
            var size = tmp.length-1;
            var count = 0;
            while (size > 0)
            {
                if (tmp[size].so == tmp[size-1].so)
                {
                    count++;
                    if (count == 1)		// co tu quy tu` (size-1) -> size
                    {
                        cards.push(tmp[size-1]);cards.push(tmp[size]);
                        tmp.splice(size-1,2);
                        size -= 2;
                        count = 0;

                    }
                    else
                    {
                        size--;
                    }
                }
                else
                {
                    count = 0;
                    size--;
                }
            }
        }
        // add not phan rac'
        for (var i=0;i<tmp.length;i++)
        {
            cards.push(tmp[i]);
        }

    }
    return cards;
}

//pass by review
TienLen.GameHelper.kiemtraThoiHeo = function(cards) {
    var count = 0;
    for(var i=0;i<cards.length;i++)
    {
        if(Math.floor(cards[i] / 4) == TienLen.Card.kQuanbai2)
        {
            count ++;
        }
    }
    if(count > 0)
        return true;
    return false;
}

// pass by review
TienLen.GameHelper.kiemtraThoiTuQuy = function(cards) {
    cards.sort(function(a, b){return a- b});

    if (cards.length >= 4)
    {
        // check tu quy
        var size = cards.length-1;
        var count = 0;
        while (size > 0)
        {
            if (Math.floor(cards[size]/4) == Math.floor(cards[size-1]/4))
            {
                count++;
                if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                {
                    return true;
                }
            }
            else

            {
                count = 0;
            }
            size --;
        }
        return false;
    }
    else
        return false;
}

// Tim bo bai danh duoc trong cardHandon chua cardselect

TienLen.GameHelper.recommend2 = function(cardHandon, cardselect){
    var cardsB = [];
    for(var i = 0; i < cardHandon.length; i++){
        cardsB.push(new TienLen.Card(cardHandon[i]));
    }
    cardsB.sort(function(a, b){return a.id - b.id});


    var minSanh, maxSanh;
    var recommend = [];
    cardselect.sort(function(a, b){return a.id - b.id});
    recommend.push(cardselect);

    var hasDoi = false;
    if(cardselect.length == 1){
       return recommend;
    }

    for(var i = 1; i < cardselect.length; i++){
        if(cardselect[i].so == cardselect[i-1].so){
            hasDoi = true;
            break;
        }
    }
    if(hasDoi){
        return recommend;
    }

    var recommentTemp = [];
    minSanh = cardselect[0].so;
    maxSanh = cardselect[cardselect.length -1].so;

    var resSanh = true;

    for(var i = minSanh; i <= maxSanh; i++){
        var res2 = false;
        for(var j = 0; j < cardsB.length; j++){
            if(cardsB[j].so == i){
                res2 = true;
                var cardId = cardsB[j].id;
                for(var k = 0; k < cardselect.length; k++){
                    if(cardselect[k].so == i) {
                        cardId = cardselect[k].id;
                    }
                }
                recommentTemp.push(new TienLen.Card(cardId));
                break;
            }
        }

        if(res2 == false){
            resSanh = false;
            break;
        }
    }

    if(resSanh){
        return recommentTemp;
    }

    return recommend;
}

// Tim` bo bai` hop ly (chua card select) tu bo bai tren tay co the chat duoc cards
TienLen.GameHelper.recommend = function(inCards, cardHandon, select){
    var cards = [];
    var cardsB = [];
    var len = inCards.length;

    for(var i=0; i<inCards.length;i++)
    {
        cards.push(new TienLen.Card(inCards[i]));
    }

    for(var i = 0; i < cardHandon.length; i++){
        cardsB.push(new TienLen.Card(cardHandon[i]));
    }

    cards.sort(function(a, b){return a.id - b.id});
    cardsB.sort(function(a, b){return a.id - b.id});

    var groupA = new TienLen.CardGroup(cards);
    var recommend = [];
    recommend.push(select);

    switch (groupA.typeGroup)
    {
        case TienLen.CardGroup.TYPEMOTLA:
        {
            if((cards.length == 1) && (cards[0].so == TienLen.Card.kQuanbai2))
            {
                // Tim cac la co cung` quan bai voi cardselect , (chek xem co tu quy nao khong)
                if(select.id > cards[0].id){
                    break;
                }

                var bo = TienLen.GameHelper.timBaDoiChatHaiRecommend(cardsB, select);
                if(bo.length > 0){
                    return bo;
                }

                var res = [];
                for(var i = 0; i < cardHandon.length; i++){
                    if(cardsB[i].so == select.so){
                        res.push(cardsB[i]);
                    }
                }

                if(res.length == 4){
                    return res;
                }

            }
            break;
        }
        case TienLen.CardGroup.TYPEDOI:
        case TienLen.CardGroup.TYPEBALA:
        {
            // Tim cac la co cung` quan bai voi cardselect
            var res = [];
            res.push(select);
            for(var i=0; i< cardsB.length;i++){
                if(cardsB[i].so == select.so && cardsB[i].id != select.id && res.length < cards.length){
                    res.push(cardsB[i]);
                }
            }
            if(res.length == cards.length){
                res.sort(function(a, b){return a.id - b.id});
                if(res[len -1].id > cards[len-1].id){
                    return res;
                }
            }
            if(groupA.typeGroup == TienLen.CardGroup.TYPEBALA){
                break;
            }

            if(cards[0].so == TienLen.Card.kQuanbai2){
                var res  = TienLen.GameHelper.timTuQuyRecommend(cardsB, select);
                if(res.length == 4){
                    return res;
                }

                res = TienLen.GameHelper.timBonDoiChatTuQuyRecommend(cardsB, select);
                if(res.length == 8){
                    return res;
                }
            }
            break;
        }

        case TienLen.CardGroup.TYPETUQUY:
            var res  = TienLen.GameHelper.timTuQuyChatTuQuy(cards, cardsB, select);
            if(res.length == 4){
                return res;
            }

            res = TienLen.GameHelper.timBonDoiChatTuQuyRecommend(cardsB, select);
            if(res.length == 8){
                return res;
            }
            break;
        case TienLen.CardGroup.TYPESANH:
        {
            recommend = TienLen.GameHelper.timsanhdocchatduoc(cards,cardsB,select);
            break;
        }

        case TienLen.CardGroup.BADOITHONG:{
            res = TienLen.GameHelper.timTuQuyRecommend(cardsB, select);
            if(res.length > 1){
                return res;
            }

            var res  = TienLen.GameHelper.timBaDoiChatBaDoiRecommend(cards, cardsB, select);
            if(res.length > 1){
                return res;
            }

            res = TienLen.GameHelper.timBonDoiChatTuQuyRecommend(cardsB, select);
            if(res.length > 1){
                return res;
            }
            break;
        }

        case TienLen.CardGroup.BONDOITHONG:{
            var res  = TienLen.GameHelper.timBonDoiChatBonDoiRecommend(cards, cardsB, select);
            if(res.length > 1){
                return res;
            }
            break
        }
    }
    return recommend;

}

TienLen.GameHelper.findBlackCard = function(inCards, cardHandon){
    if(inCards.length <= 0)
        return;
    var black = [];
    var select;
    for(var i = 0; i < cardHandon.length; i++){
        if(inCards.length == 1){
            if(cardHandon[i] >  inCards[0]){
                continue;
            }
        }

        select = new TienLen.Card(cardHandon[i]);
        var res = TienLen.GameHelper.recommend(inCards, cardHandon, select);
        if(res.length <= 1){
            black.push(cardHandon[i]);
        }
    }
    return black;
}

//test by review
//select la id
TienLen.GameHelper.timsanhdocchatduoc = function(cards, cardsB, select){

    var group = new TienLen.CardGroup(cards);
    var len = cards.length;
    var res = [];
    res.push(select);
    var res2;

    for(var j = -2; j <= TienLen.Card.kQuanbaiQ;j++){
        var countSanh = 0;
        res2 = [];
        var holdSelect = false;
        if(j + len - 1 < cards[len -1].so)
            continue;
        for(var i = 0; i < cards.length; i++){
            var res3 =false;
            for(var k = cardsB.length -1; k >= 0; k--){
                var kk = cardsB[k].so;
                var kkk = j + i;
                if((kk == kkk) && (j +i < 12)){
                    res3 =  true;
                    if(cardsB[k].so == select.so){
                        res2.push(select);
                        holdSelect = true;
                    }else{
                        res2.push(cardsB[k]);
                    }
                    break;
                }
            }
            if(res3){
                countSanh++;
            }
        }

        if(countSanh == cards.length && holdSelect && res2[len-1].id > cards[len -1].id){
            res = res2;
            break;
        }
    }
    return res;
}

//test by review
TienLen.checkSanh = function(cards, handOn){
    handOn.sort(function(a, b){a.id - b.id});

    var group = new TienLen.CardGroup(cards);
    var cardArray = group.makeSanhArray();
    var len = cardArray.length;
    var res = false;
    var sanhArray = [];

    for(var j = -2; j <= TienLen.Card.kQuanbaiQ;j++){
        if(j + len - 1 < Math.floor(cardArray[len -1].id/4))
            continue;
        var countSanh = 0;
        sanhArray = [];
        for(var i = 0; i < cardArray.length; i++){
            var res2 = false;
            for(var k = handOn.length -1; k >=0; k--){
                if((handOn[k].so == (j + i)) && (j +i < 12)){
                    res2 =  true;
                    sanhArray.push(handOn[k]);
                    break;
                }
            }
            if(res2){
                countSanh++;
            }
        }

        if(countSanh == cardArray.length && sanhArray[countSanh-1].id > cardArray[len-1].id){
            res = true;
            break;
        }
    }
    return res;
}

// a la 1 goupCard, b la array CArd;

TienLen.GameHelper.kiemTraChatDuocKhong = function(a,b)  // kiem tra trong bo bai` b co the chat dc a khong (a la group)  true: khong phai bo luot , false : bo luot
{
    a.cards.sort(function(a1, b1){return a1.id- b1.id});
    b.sort(function(a1, b1){return a1.id - b1.id});

    switch(a.typeGroup)
    {
        case TienLen.CardGroup.TYPEMOTLA:
        {
            if(a.cards[0].so == TienLen.Card.kQuanbai2)         // kiem tra xem co tu quy de chat khong
            {
                if(TienLen.GameHelper.checkBaDoiThong(b)){
                    return true;
                }
                if(TienLen.GameHelper.checkTuQuy(b)){
                    return true;
                }
            }

            for(var i=0;i< b.length;i++)
            {
                if(b[i].id > a.cards[0].id)
                {
                    return true;
                }
            }
            return false;
            break;
        }

        case TienLen.CardGroup.TYPEDOI:
        {
            cc.log("Kiem tra danh duoc khong hai doi ?") ;
            if(a.cards[0].so == TienLen.Card.kQuanbai2)         // kiem tra xem co doi tu quy khong
            {
                if(TienLen.GameHelper.checkBonDoiThong(b)){
                    return true;
                }
                if(TienLen.GameHelper.checkTuQuy(b)){
                    return true;
                }
            }


            if(b.length < 2){
                return false;
            };
            var count = 0;
            var pos = 1;
            var hasDoi = false;
            while(!hasDoi && pos < b.length){
                if(b[pos].so == b[pos -1].so){
                    count++;
                }
                else{
                    count = 0;
                }
                if(count == 1 && b[pos].id > a.cards[1].id){
                    hasDoi = true;
                }
                pos++;
            }
            if(hasDoi) {
                return true;
            }

            return false;
            break;
        }
        case TienLen.CardGroup.TYPEBALA:
        {
            if(b.length < 3){
                return false;
            };
            var count = 0;
            var pos = 1;
            var hasBa = false;
            while(!hasDoi && pos < b.length){
                if(b[pos].so == b[pos -1].so){
                    count++;
                }
                else{
                    count = 0;
                }
                if(count == 2 && b[pos].id > a.cards[2].id){
                    hasBa = true;
                }
                pos++;
            }
            if(hasBa) {
                return true;
            }

            return false;
            break;
        }

        case TienLen.CardGroup.TYPETUQUY:
        {
            if(TienLen.GameHelper.checkBonDoiThong(b)){
                return true;
            }

            if(b.length < 4){
                return false;
            };
            var count = 0;
            var pos = 1;
            var hasTuQuy = false;
            while(!hasDoi && pos < b.length){
                if(b[pos].so == b[pos -1].so){
                    count++;
                }
                else{
                    count = 0;
                }
                if(count == 3 && b[pos].id > a.cards[3].id){
                    hasTuQuy = true;
                }
                pos++;
            }
            if(hasTuQuy) {
                return true;
            }

            return false;
            break;
        }

        case TienLen.CardGroup.TYPESANH:
        {
            return TienLen.checkSanh(a.cards, b)
        }
        case TienLen.CardGroup.BADOITHONG:
        {
            if(TienLen.GameHelper.timBaDoiThongChatDuoc(a.cards, b).length > 0){
                return true;
            }
            if(TienLen.GameHelper.checkTuQuy(b)){
                return true;
            }
            if(TienLen.GameHelper.checkBonDoiThong(b)){
                return true;
            }
            return false;
        }
        case TienLen.CardGroup.BONDOITHONG:
        {
            if(TienLen.GameHelper.timBonDoiThongChatDuoc(a.cards, b).length > 0){
                return true;
            }
            return false;

        }
    }
}
// b la array Cards
TienLen.GameHelper.checkBaDoiThong = function(b){
    var len = b.length;
    if(b.length < 6){
        return false;
    }

    for(var k = 0; k <= b.length - 6; k++){
        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 6 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 6){
            return true;
            break;
        }
    }
    return false;
};

TienLen.GameHelper.checkBonDoiThong = function(b){
    var len = b.length;
    if(b.length < 8){
        return false;
    }

    for(var k = 0; k <= b.length - 8; k++){
        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 8 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 8){
            return true;
            break;
        }
    }
    return false;
}

TienLen.GameHelper.timBaDoiThongChatDuoc = function(a, b){
    var len = b.length;
    if(b.length < 6){
        return false;
    }

    for(var k = 0; k <= b.length - 6; k++){
        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 6 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 6 && res[5].id> a[5].id){
            return res;
            break;
        }

    }
    return [];
}

TienLen.GameHelper.timBonDoiThongChatDuoc = function(a, b){
    var len = b.length;
    if(b.length < 8){
        return false;
    }

    for(var k = 0; k <= b.length - 8; k++){
        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 8 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 8 && res[7].id> a[7].id){
            return res;
            break;
        }

    }
    return [];
}
TienLen.GameHelper.timBonDoiThong= function(b){
    var len = b.length;
    if(b.length < 8){
        return false;
    }

    for(var k = 0; k <= b.length - 8; k++){
        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 8 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 8){
            return res;
            break;
        }

    }
    return [];
}

TienLen.GameHelper.checkTuQuy = function(b){
    var len = b.length;
    if(b.length < 4){
        return false;
    }
    var pos = 1;
    var count = 0;
    var hasTuQuy = false;

    while(!hasTuQuy && pos < len){
        if(b[pos].so == b[pos -1].so){
            count++;
        }else{
            count = 0;
        }

        if(count == 3){
            hasTuQuy = true;
        }
        pos++;
    }
    return hasTuQuy;
}

TienLen.GameHelper.timTuQuyChatTuQuy = function(a, b, select){
    if(select.so <= a[0].so){
        return [];
    }

    var len = b.length;
    var res = [];

    for(var i = 0; i < len; i++){
        if(b[i].so == select.so){
            res.push(b[i]);
        }
    }
    if(res.length == 4){
        return res;
    }
    return [];

};

TienLen.GameHelper.timTuQuyRecommend = function(b, select){
    var len = b.length;
    var res = [];

    for(var i = 0; i < len; i++){
        if(b[i].so == select.so){
            res.push(b[i]);
        }
    }
    if(res.length == 4){
        return res;
    }
    return [];
}


TienLen.GameHelper.timBaDoiChatHaiRecommend = function(b, select){

    var len = b.length;
    if(b.length < 6){
        return false;
    }

    for(var k = 0; k <= b.length - 6; k++){
        if(b[k].so > select.so || (b[k].so + 2) < select.so){
            continue;
        }

        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 6 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 6){
            var hasSelect = false;
            for(var h = 0; h < count; h++){
                if(res[h].id == select.id){
                    hasSelect = true;
                }
            }
            if(!hasSelect){
                for(var h = 0; h < count ; h++){
                    if(res[h].so == select.so){
                        res[h] = select;
                    }
                    break;
                }
            }
            return res;
            break;
        }

    }
    return [];
}

TienLen.GameHelper.timBaDoiChatBaDoiRecommend = function(a, b, select){
    var len = b.length;
    if(b.length < 6){
        return false;
    }

    for(var k = 0; k <= b.length - 6; k++){
        if(b[k].so > select.so || (b[k].so + 2) < select.so){
            continue;
        }

        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 6 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }
        if(count == 6 && res[5].id > a[5].id){
            var hasSelect = false;
            for(var h = 0; h < count; h++){
                if(res[h].id == select.id){
                    hasSelect = true;
                }
            }
            if(!hasSelect){
                for(var h = 0; h < count ; h++){
                    if(res[h].so == select.so){
                        res[h] = select;
                    }
                }
            }
            return res;
            break;
        }

    }
    return [];
}

TienLen.GameHelper.timBonDoiChatTuQuyRecommend = function(b, select){

    var len = b.length;
    if(b.length < 8){
        return false;
    }

    for(var k = 0; k <= b.length - 8; k++){
        if(b[k].so > select.so || (b[k].so + 3) < select.so){
            continue;
        }

        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 8 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }

        if(count == 8){
            var hasSelect = false;
            for(var h = 0; h < count; h++){
                if(res[h].id == select.id){
                    hasSelect = true;
                }
            }
            if(!hasSelect){
                for(var h = 0; h < count ; h++){
                    if(res[h].so == select.so){
                        res[h] = select;
                        break;
                    }
                }
            }
            return res;
            break;
        }

    }
    return [];
}

TienLen.GameHelper.timBonDoiChatBonDoiRecommend = function(a, b, select){
    var len = b.length;
    if(b.length < 8){
        return false;
    }

    for(var k = 0; k <= b.length - 8; k++){
        if(b[k].so > select.so || (b[k].so + 3) < select.so){
            continue;
        }

        var count = 1;
        var pos = k + 1;
        var res = [];
        res.push(b[k]);
        while(count < 8 && pos < len){
            if(count % 2 == 1) {
                if (b[pos].so == res[res.length - 1].so && b[pos].so != TienLen.Card.kQuanbai2) {
                    count++;
                    res.push(b[pos]);
                }
            }
            else{
                if(b[pos].so == res[res.length -1].so +1){
                    count++;
                    res.push(b[pos]);
                }
            }
            pos++;
        }

        if(count == 8 && res[7].id > a[7].id){
            var hasSelect = false;
            for(var h = 0; h < count; h++){
                if(res[h].id == select.id){
                    hasSelect = true;
                }
            }
            if(!hasSelect){
                for(var h = 0; h < count ; h++){
                    if(res[h].so == select.so){
                        res[h] = select;
                    }
                }
            }
            return res;
            break;
        }

    }
    return [];
}