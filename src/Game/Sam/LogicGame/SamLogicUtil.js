Sam.LogicUtil  = function(){};


Sam.LogicUtil.compareCard = function(card1, card2){
    if(card1.so > card1.so)
        return 1;
    else if(card1.so == card2.so)
        return 0;
    else
        return -1;
};

//pass by review
Sam.LogicUtil.kiemtraDanh = function(cards){
    var group = new Sam.CardGroup(cards);
    if(group.typeGroup != Sam.CardGroup.TYPENONE)
        return true;
    return false;
}

// pass by review
Sam.LogicUtil.kiemtraChatQuan = function(a, b) {
    if (a.typeGroup != b.typeGroup)
    {
        // Nhung TH dac biet khac loai nhom bai ma co the chat duoc
        if ((a.typeGroup == Sam.CardGroup.TYPEMOTLA) && (a.cards[0].so == Sam.Card.kQuanbai2) && (b.typeGroup == Sam.CardGroup.TYPETUQUY))
        {
            return true;
        }
        else if((a.typeGroup == Sam.CardGroup.TYPEDOI) && (a.cards[0].so == Sam.Card.kQuanbai2) && (b.typeGroup == Sam.CardGroup.TYPEHAITUQUY))
        {
            return true;
        }
        return false;
    }

    switch (a.typeGroup)
    {
        case Sam.CardGroup.TYPEMOTLA:
        case Sam.CardGroup.TYPEDOI:
        case Sam.CardGroup.TYPEBALA:
            return Sam.Card.isGreater(b.cards[0], a.cards[0]);
            break;
        case Sam.CardGroup.TYPESANH:
        {
            var sanhArrayA = a.makeSanhArray();
            var sanhArrayB = b.makeSanhArray();
            if ((sanhArrayA.length != sanhArrayB.length) || (sanhArrayA[sanhArrayA.length-1].so >= sanhArrayB[sanhArrayB.length-1].so))
            {
                return false;
            }
            else
            {
                return true;
            }

            break;
        }

        case Sam.CardGroup.TYPETUQUY:
        {
            return Sam.Card.isGreater(b.cards[0], a.cards[0]);
            break;
        }

        case Sam.CardGroup.TYPEHAITUQUY:
        {
            a.cards.sort(function(a, b){return a.so- b.so});
            b.cards.sort(function(a, b){return a.so- b.so});

            var tuquy1a = a.cards[0].so;
            var tuquy2a = a.cards[a.cards.length-1].so;

            var tuquy1b= b.cards[0].so;
            var tuquy2b = b.cards[b.cards.length-1].so;

            if(Sam.Card.isGreater(b.cards[0], a.cards[0]) && Sam.Card.isGreater(b.cards[b.cards.length-1], a.cards[a.cards.length-1]))
                return true;
            return false;

            break;
        }
        default:
            return false;
            break;
    }
}

Sam.LogicUtil.sapxepQuanBai = function(card, sort){
    if (sort == Sam.kSortTangDan)
    {
        card.sort(function(a, b){return a.id- b.id});
        return card;
    }
    else if(sort == Sam.kSortGroup)
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
Sam.LogicUtil.kiemtraThoiHeo = function(cards) {
    var count = 0;
    for(var i=0;i<cards.length;i++)
    {
        if(Math.floor(cards[i] / 4) == Sam.Card.kQuanbai2)
        {
            count ++;
        }
    }
    if(count > 0)
        return true;
    return false;
}

// pass by review
Sam.LogicUtil.kiemtraThoiTuQuy = function(cards) {
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
Sam.LogicUtil.recommend2 = function(cardHandon, cardselect){
    var cards = [];
    var minSanh, maxSanh;
    var recommend = [];
    for(var i = 0; i < cardselect.length; i++){
        recommend.push(cardselect[i].id);
    }

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

    // Truong hop co at
    var hasA = false;
    for(var i = 0; i < cardselect.length; i++){
        if(cardselect[i].so == Sam.Card.kQuanbaiA){
            hasA = true;
            break;
        }
    }

    var recommentTemp = [];
    if(hasA){
        //tim sanh toi A
        minSanh = cardselect[0].so;
        maxSanh = Sam.Card.kQuanbaiA;
        var resSanh = true;

        for(var i = minSanh; i <= maxSanh; i++){
            var res2 = false;
            for(var j = 0; j < cardHandon.length; j++){
                if(Math.floor(cardHandon[j]/4) == i){
                    res2 = true;
                    // tim xem co quan bai trong select
                    var cardId = cardHandon[j];
                    for(var k = 0; k < cardselect.length; k++){
                        if(cardselect[k].so == i)
                            cardId = cardselect[k].id;
                    }
                    recommentTemp.push(cardId);
                    break;
                }
            }
            if(res2 == false){
                resSanh = false;
            }
        }
        if(resSanh){
            return recommentTemp;
        }
    }

    // tim sanh
    //
    cardselect.sort(function(a, b){
        return Sam.LogicUtil.changeSo(a.so) - Sam.LogicUtil.changeSo(b.so)
    });

    recommentTemp = [];
    minSanh = Sam.LogicUtil.changeSo(cardselect[0].so);
    maxSanh = Sam.LogicUtil.changeSo(cardselect[cardselect.length -1].so);

    var resSanh = true;
    for(var i = minSanh; i <= maxSanh; i++){
        var res2 = false;
        var kkkk = cardHandon.length;
        for(var j = 0; j < cardHandon.length; j++){

            var kk = Math.floor(cardHandon[j]/4);
            var kkk = Sam.convertSo(i);
            if(Math.floor(cardHandon[j]/4) == Sam.convertSo(i)){
                res2 = true;
                // tim xem co quan bai trong select
                var cardId = cardHandon[j];
                for(var k = 0; k < cardselect.length; k++){
                    if(cardselect[k].so == Sam.convertSo(i))
                        cardId = cardselect[k].id;
                }
                recommentTemp.push(cardId);
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

Sam.LogicUtil.changeSo = function(so){
    if(so == Sam.Card.kQuanbaiA || so == Sam.Card.kQuanbai2){
        return so - 13;
    }
    return so;
}


Sam.LogicUtil.recommend = function(inCards, cardHandon, cardselect){               // Tim` bo bai` hop ly (chua card select) tu bo bai tren tay co the chat duoc cards
    var cards = [];
    for(var i=0;i<inCards.length;i++)
    {
        cards.push(new Sam.Card(inCards[i]));
    }

    var group = new Sam.CardGroup(cards);
    var recommend = [];
    recommend.push(cardselect);

    switch (group.typeGroup)
    {
        case Sam.CardGroup.TYPEMOTLA:
        {
            if((cards.length == 1) && (cards[0].so == Sam.Card.kQuanbai2))
            {
                // Tim cac la co cung` quan bai voi cardselect , (chek xem co tu quy nao khong)
                var quanbai = [];
                for(var i=0; i< cardHandon.length;i++)
                {
                    if(Math.floor(cardselect / 4) == Math.floor(cardHandon[i] / 4))
                    {
                        quanbai.push(cardHandon[i]);
                    }
                }

                if(quanbai.length == 4)
                {
                    for(var i=0;i<4;i++)
                    {
                        if(quanbai[i] != cardselect)
                            recommend.push(quanbai[i])
                    }
                }
            }
            break;
        }
        case Sam.CardGroup.TYPEDOI:
        case Sam.CardGroup.TYPEBALA:
        case Sam.CardGroup.TYPETUQUY:
        {
            // Tim cac la co cung` quan bai voi cardselect
            var quanbai = [];
            for(var i=0;i<cardHandon.length;i++)
            {
                if(Math.floor(cardselect / 4) == Math.floor(cardHandon[i] / 4))
                {
                    quanbai.push(cardHandon[i]);
                }
            }
            quanbai.sort(function(a,b){return a < b;});
            var idx = 0;
            for(var i=0;i<quanbai.length;i++)
            {
                if(quanbai[i] == cardselect)
                {
                    idx = i;
                    break;
                }
            }

            if(group.typeGroup == Sam.CardGroup.TYPEDOI)
            {
                if(quanbai.length < 2)           // Neu so quan bai giong cardselect nho hon 2 hoac quan bai`nay` nho hon cards can` chat.
                    break;
                if(group.cards[0].so == Sam.Card.kQuanbai2)    // cards la` doi 2 (truong hop dac biet)  -> can` check co doi tu quy khong
                {
                    var doituquy = Sam.timDoiTuQuyChatHai(cards,cardHandon,cardselect);

                    for(var i=0;i<doituquy.length;i++)
                    {
                        recommend.push(doituquy[i]);
                    }
                    break;
                }

                if(Math.floor(quanbai[0]/4)  == Sam.Card.kQuanbai2)
                {
                    recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
                    break;
                }

                if(group.cards[0].so >= Math.floor(quanbai[0]/4))
                    break;
                // Neu chat duoc -> push nhung card con lai
                recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
            }

            else if(group.typeGroup == Sam.CardGroup.TYPEBALA)
            {
                if(group.cards[0].so == Sam.Card.kQuanbai2)
                    break;
                if(quanbai.length < 3)
                    break;
                if(Math.floor(quanbai[0]/4)  == Sam.Card.kQuanbai2)
                {
                    recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
                    recommend.push(quanbai[(idx +2)>=quanbai.length?idx+2-quanbai.length:idx+2]);
                    break;
                }
                if(group.cards[0].so >= Math.floor(quanbai[0]/4))
                    break;
                recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
                recommend.push(quanbai[(idx +2)>=quanbai.length?idx+2-quanbai.length:idx+2]);
            }
            else if(group.typeGroup == Sam.CardGroup.TYPETUQUY)
            {
                if(group.cards[0].so == Sam.Card.kQuanbai2)
                    break;
                if(quanbai.length < 4)
                    break;
                if(Math.floor(quanbai[0]/4)  == Sam.Card.kQuanbai2)
                {
                    recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
                    recommend.push(quanbai[(idx +2)>=quanbai.length?idx+2-quanbai.length:idx+2]);
                    recommend.push(quanbai[(idx +3)>=quanbai.length?idx+3-quanbai.length:idx+3]);
                    break;
                }
                if(group.cards[0].so >= Math.floor(quanbai[0]/4))
                    break;
                recommend.push(quanbai[(idx +1)>=quanbai.length?idx+1-quanbai.length:idx+1]);
                recommend.push(quanbai[(idx +2)>=quanbai.length?idx+2-quanbai.length:idx+2]);
                recommend.push(quanbai[(idx +3)>=quanbai.length?idx+3-quanbai.length:idx+3]);
            }

            break;
        }
        case Sam.CardGroup.TYPESANH:
        {
            recommend = Sam.timSanhChatDuoc(cards,cardHandon,cardselect);
            break;
        }
        case Sam.CardGroup.TYPEHAITUQUY:
        {
            recommend = Sam.timDoiTuQuyChatDoiTuQuy(cards,cardHandon,cardselect);
            break;
        }
    }
    return recommend;

}


Sam.LogicUtil.findBlackCard = function(inCards, cardHandon){
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
        var res = TienLen.LogicUtil.recommend(inCards, cardHandon, select);
        if(res.length <= 1){
            black.push(cardHandon[i]);
        }
    }
    return black;
}

Sam.LogicUtil.findBlackCard = function(inCards, cardHandon){
    if(inCards.length <= 0)
        return;
    var black = [];
    for(var i = 0; i < cardHandon.length; i++){

        if(inCards.length == 1){
            if(Math.floor(cardHandon[i]/4) > Math.floor(inCards[0]/4)){
                continue;
            }
        }

        var res = Sam.LogicUtil.recommend(inCards, cardHandon, cardHandon[i]);
        if(res.length <= 1){
            black.push(cardHandon[i]);
        }
    }
    return black;
}

//test by review

Sam.timSanhChatDuoc = function(cards,handOn,select){
    var group = new Sam.CardGroup(cards);
    var cardArray = group.makeSanhArray();
    var len = cardArray.length;
    var res = [];
    res.push(select);
    var res2;

    for(var j = -2; j <= Sam.Card.kQuanbaiQ;j++){
        var countSanh = 0;
        res2 = [];
        var holdSelect = false;
        if(j + len - 1 <= Math.floor(cardArray[len -1].id/4))
            continue;
        for(var i = 0; i < cardArray.length; i++){
            var res3 =false;
            for(var k = 0; k < handOn.length; k++){
                var kk = Sam.convertSo(Math.floor(handOn[k]/4));
                var kkk = Sam.convertSo(j + i);
                if((kk == kkk) && ((j +i) < 12)){
                    res3 =  true;
                    if(Math.floor(handOn[k]/4) == Math.floor(select/4)){
                        res2.push(select);
                        holdSelect = true;
                    }else{
                        res2.push(handOn[k]);
                    }
                    break;
                }
            }
            if(res3){
                countSanh++;
            }
        }
        if(countSanh == cardArray.length && holdSelect){
            res = res2;
            break;
        }
    }
    return res;
}

//test by review
Sam.checkSanh = function(cards, handOn){
    var group = new Sam.CardGroup(cards);
    var cardArray = group.makeSanhArray();
    var len = cardArray.length;
    var res = false;

    for(var j = -2; j <= Sam.Card.kQuanbaiQ;j++){
        if(j + len - 1 <= Math.floor(cardArray[len -1].id/4))
            continue;
        var countSanh = 0;
        for(var i = 0; i < cardArray.length; i++){
            var res2 = false;
            for(var k = 0; k < handOn.length; k++){
                if((Sam.convertSo(handOn[k].so) == Sam.convertSo(j + i)) && ((j +i) < 12)){
                    res2 =  true;
                    break;
                }
            }
            if(res2){
                countSanh++;
            }
        }

        if(countSanh == cardArray.length){
            res = true;
            break;
        }
    }
    return res;
}

Sam.convertSo = function(id){
    return (id + 13) %13;
}


Sam.timDoiTuQuyChatHai = function(cards,cardHandon,cardselect)
{
    var tmp = [];
    var ret = [];
    for(var i=0;i<cardHandon.length;i++)
    {
        tmp.push(cardHandon[i]);
    }
    tmp.sort(function(a, b){return a- b});

    for(var i=0;i<cardHandon.length;i++)
    {
        if(Math.floor(cardselect / 4) == Math.floor(cardHandon[i] / 4))
        {
            ret.push(cardHandon[i]);
        }
    }
    if(ret.length != 4)
    {
        return [];
    }
    else
    {
        ret.sort(function(a, b){return a- b});
        var idx = 0;
        for(var i=0;i<tmp.length;i++)
        {
            if(ret[0] == tmp[i])
            {
                idx = i;
                break;
            }
        }
        tmp.splice(idx,4);
        if (tmp.length >= 4)
        {
            // check tu quy
            var size = tmp.length-1;
            var count = 0;
            var cotuquy = false;
            while (size > 0)
            {
                if (Math.floor(tmp[size]/4) == Math.floor(tmp[size-1]/4))
                {
                    count++;
                    if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                    {
                        ret.push(tmp[size-1]);ret.push(tmp[size]);ret.push(tmp[size+1]);ret.push(tmp[size+2]);
                        size-=4;
                        count =0;
                        cotuquy = true;
                        cc.log("ret "+ret.length);
                        return ret;
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
            if(!cotuquy)
            {
                return [];
            }
        }
        else
        {
            return [];
        }

    }
}

Sam.timDoiTuQuyChatDoiTuQuy = function(cards,cardHandon,cardselect)
{
    cards.sort(function(a, b){return a- b});
    var tuquy1 = Math.floor(cards[0] / 4);
    var tuquy2 = Math.floor(cards[cards.length-1] / 4);

    var tmp = [];
    var retTuquy01 = [];

    for(var i=0;i<cardHandon.length;i++)
    {
        tmp.push(cardHandon[i]);
    }
    tmp.sort(function(a, b){return a- b});

    for(var i=0;i<cardHandon.length;i++)
    {
        if(Math.floor(cardselect / 4) == Math.floor(cardHandon[i] / 4))
        {
            retTuquy01.push(cardHandon[i]);
        }
    }
    if(retTuquy01.length != 4)
    {
        return [];
    }
    else
    {
        retTuquy01.sort(function(a, b){return a- b});
        var idx = 0;
        for(var i=0;i<tmp.length;i++)
        {
            if(retTuquy01[0] == tmp[i])
            {
                idx = i;
                break;
            }
        }
        tmp.splice(idx,4);
        if (tmp.length >= 4)
        {
            // check tu quy
            var size = tmp.length-1;
            var count = 0;
            var cotuquy = false;
            while (size > 0)
            {
                if (Math.floor(tmp[size]/4) == Math.floor(tmp[size-1]/4))
                {
                    count++;
                    if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                    {
                        var retTuquy02 = [];
                        retTuquy02.push(tmp[size-1]);retTuquy02.push(tmp[size]);retTuquy02.push(tmp[size+1]);retTuquy02.push(tmp[size+2]);
                        //size-=4;
                        //count =0;
                        //cotuquy = true;

                        // den day ta co 2 tu quy tu` card handon , check xem chung co the chat dc ko
                        var check1 = Math.floor(retTuquy01[0]/4);
                        var check2 = Math.floor(retTuquy02[0]/4);

                        if(((check1 > tuquy1) && (check2 > tuquy2)) || ((check1 > tuquy2) && (check2 > tuquy1)))
                        {
                            var ret = [];
                            for(var i=0;i<4;i++)
                            {
                                ret.push(retTuquy01[i]);
                                ret.push(retTuquy02[i]);
                            }
                            return ret;
                        }
                        else
                        {
                            return [];
                        }
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
            if(!cotuquy)
            {
                return [];
            }
        }
        else
        {
            return [];
        }

    }
}

Sam.LogicUtil.kiemTraChatDuocKhong = function(a,b)  // kiem tra trong bo bai` b co the chat dc a khong (a la group)  true: khong phai bo luot , false : bo luot
{
    switch(a.typeGroup)
    {
        case Sam.CardGroup.TYPEMOTLA:
        {
            if(a.cards[0].so == Sam.Card.kQuanbai2)         // kiem tra xem co tu quy de chat khong
            {
                var tmp = b.cards.slice();
                tmp.sort(function(a, b){return a.id- b.id});

                if (tmp.length >= 4)
                {
                    var count = 0;
                    var index = 1;
                    while(index < tmp.length){
                        if(tmp[index].so == tmp[index-1].so){
                            count++;
                        }else{
                            count = 0;
                        }
                        if(count >=3){
                            return true;
                        }
                        index++;
                    }
                    return false;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                for(var i=0;i< b.cards.length;i++)
                {
                    if(b.cards[i].so > a.cards[0].so)
                    {
                        return true;
                    }
                }
                return false;
            }
            break;
        }

        case Sam.CardGroup.TYPEDOI:
        {
            if(a.cards[0].so == Sam.Card.kQuanbai2)         // kiem tra xem co doi tu quy khong
            {
                var tmp = b.cards.slice();
                tmp.sort(function(a, b){return a.id- b.id});
                if (tmp.length >= 8) {
                    // check tu quy
                    var index = 1;
                    var count = 0;
                    var sotuquy = 0;
                    while (index < tmp.length) {
                        if (tmp[index].so == tmp[index - 1].so) {
                            count++;
                            if (count == 3)
                            {
                                sotuquy++;
                                count = 0;
                            }
                        }
                        else {
                            count = 0;
                        }
                        index++;
                    }
                    if(sotuquy >=2)
                        return true
                    return false;
                }
                else
                    return false;
            }
            else
            {
                var tmp = b.cards.slice();
                tmp.sort(function(a, b){return a.id- b.id});
                if (tmp.length >= 2)
                {
                    // Check doi
                    var index = 1;
                    var count = 0;
                    var res = false;
                    while (index < tmp.length)
                    {
                        if (tmp[index].so == tmp[index -1].so)
                        {
                            if(tmp[index].so >= a.cards[0].so){
                                res = true;
                            }
                        }
                        index++;
                    }
                    return res;
                }
                else
                {
                    return false;
                }
            }
            break;
        }
        case Sam.CardGroup.TYPEBALA:
        {
            if(a.cards[0].so == Sam.Card.kQuanbai2)
            {
                return false;
            }
            else
            {
                var tmp = b.cards.slice();
                tmp.sort(function(a, b){return a.id- b.id});
                if (tmp.length >= 3)
                {
                    // Check ba la
                    var size = tmp.length-1;
                    var count = 0;
                    var index = 1;
                    while (index < tmp.length)
                    {
                        if ( tmp[index].so == tmp[index-1].so)
                        {
                            count++;
                            if (count == 2)
                            {
                                if((tmp[index].so > a.cards[0].so))
                                    return true;
                            }
                        }
                        else
                        {
                            count = 0;
                        }
                        index++;

                    }
                    return false;
                }
                else
                {
                    return false;
                }
            }

            break;
        }
        case Sam.CardGroup.TYPETUQUY:
        {
            var tmp = b.cards.slice();
            tmp.sort(function(a, b){return a.id- b.id});
            if (tmp.length >= 4)
            {
                // check tu quy
                var index = 1;
                var count = 0;
                while (index < tmp.length)
                {
                    if (tmp[index].so == tmp[index-1].so)
                    {
                        count++;
                        if (count == 3)
                        {
                            if(tmp[index].so > a.cards[0].so)
                                return true;
                        }
                    }
                    else
                    {
                        count = 0;
                    }
                    index++;

                }
                return false;
            }
            else
            {
                return false;
            }
            break;
        }
        case Sam.CardGroup.TYPEHAITUQUY:
        {
            a.cards.sort(function(a, b){return a.id- b.id});
            var tuquy1a = a.cards[0].so;
            var tuquy2a = a.cards[a.cards.length-1].so;
            var tuquy1b = -1;
            var tuquy2b = -1;

            var tmp = b.cards.slice();
            tmp.sort(function(a, b){return a.id- b.id});


            if (tmp.length >= 8)
            {
                // check tu quy
                var index = 1;
                var count = 0;
                var sotuquy = 0;
                while (index < tmp.length)
                {
                    if (tmp[index].so == tmp[index-1].so)
                    {
                        count++;
                        if (count == 3)		// co tu quy tu` (size-1) -> size + 2
                        {
                            sotuquy++;
                            if(sotuquy == 1)
                            {
                                tuquy1b = tmp[index].so;
                            }
                            else if(sotuquy == 2)
                            {
                                tuquy2b = tmp[index].so;
                                if(((tuquy1b > tuquy1a) && (tuquy2b > tuquy2a)))
                                    return true;
                            }
                        }
                    }
                    else
                    {
                        count = 0;
                    }
                    index++;

                }
                return false;
            }
            else
            {
                return false;
            }
            break;
        }
        case Sam.CardGroup.TYPESANH:
        {
            return Sam.checkSanh(a.cards, b.cards)
        }
    }
}
