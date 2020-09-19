//
var gameUtility = function(){};


var NumberType = {
    NUMBER_THANG: 0,
    NUMBER_THUA: 1,
    NUMBER_COUNT_TIME: 2,
};



// Tao Node so theo kieu chu In
gameUtility.createSo = function(so){
    so = ""+ so;
    var node = new cc.Node();
    var length = so.length;
    var path = this.getPathSo("0");
    var soWidth = ( new cc.Sprite(path)).getContentSize().width;
    for(var i = 0; i < length; i++){
        var chuso = new cc.Sprite(this.getPathSo(so[i]));
        chuso.setPosition(cc.p ((-(length -1)/2 + i)*soWidth, 0));
        node.addChild(chuso);
    }
    return node;
}



gameUtility.getRandomInt = function(min, max){
    var vRandom = Math.floor(Math.random() * (max - min)) + min;
    return vRandom;
}

gameUtility.standartNumber = function(number){// Hien thi number theo chuan{
    cc.log(" number: " + number);
    var dau = number > 0;
    number = "" + number;
    if(number.length < 3){
        return number;
    }

    var temp = "";
    cc.log(" number length: " + number.length);
    for(var i = number.length -1; i >= 0; i--){
        temp = number[i] + temp;
        if((number.length -1 - i) %3 == 2 && ((dau && i > 0) || (!dau && i > 1))){
            temp = "." + temp;
        }
        cc.log("temp " + i + " " + temp);
    }

    return temp;
}

// Tao Node so theo kieu so Thuong
gameUtility.createSo2 = function(so, color){
    so = ""+ so;
    var node = new cc.Node();
    var length = so.length;
    var path = this.getPathSo2("0");
    var soWidth = ( new cc.Sprite(path)).getContentSize().width;
    for(var i = 0; i < length; i++){
        var chuso = new cc.Sprite(this.getPathSo2(so[i]));
        chuso.setPosition(cc.p ((-(length -1)/2 + i)*soWidth, 0));
        if(color)
            chuso.setColor(color);
        node.addChild(chuso);
    }
    return node;
}

gameUtility.createSo3 = function(so, color){
    so = ""+ so;
    var node = new cc.Node();
    var length = so.length;
    var path = this.getPathSo3("0");
    var soWidth = ( new cc.Sprite(path)).getContentSize().width;
    for(var i = 0; i < length; i++){
        var chuso = new cc.Sprite(this.getPathSo3(so[i]));
        chuso.setPosition(cc.p ((-(length -1)/2 + i)*soWidth, 0));
        if(color)
            chuso.setColor(color);
        node.addChild(chuso);
    }
    return node;
}


gameUtility.getResNumberByType = function(numberType, character){
    var result = "res/common/number/";
    switch (numberType){
        case NumberType.NUMBER_THANG:
            result = result+"bo_thang/";
            break;
        case NumberType.NUMBER_THUA:
            result = result+"bo_thua/";
            break;
        case NumberType.NUMBER_COUNT_TIME:
            result = result+"bo_dem/";
            break;
        default:
            cc.assert(false, "number type is not exist!");
    }

    if (character == ".") result =  result + "dot";
    else if (character == "+") result = result + "plus";
    else if (character == "-") result = result + "minus";
    else result = result + character;

    result = result + ".png";
    return result;
};

gameUtility.getNumberPath = function(thang,number)
{
    var path = "res/common/boSo/";
    if(thang)
        path += "bosothang/";
    else
        path += "bosothua/";
    if(number == -1)
        path += "dot";
    else if(number == -2)
    {
        if(thang)
            path += "cong";
        else
            path += "tru";
    }
    else
    {
        path += ("so"+number);
    }
    path += ".png";
    return path;
}

gameUtility.createNodeMoney = function(money)
{
    var node = new cc.Node();
    var str = ""+Math.abs(money);
    var thang = (money >= 0);
    var width = 0;
    var height = 0;

    var ret = new cc.Sprite(gameUtility.getNumberPath(thang,-2));
    width += ret.getContentSize().width;
    var fix = 0;
    node.addChild(ret);

    var prePost = 0;
    var preLen = ret.getContentSize().width;
    for(var i=0;i<str.length;i++)
    {
        ret = new cc.Sprite(gameUtility.getNumberPath(thang,parseInt(str[i])));
        var xx = prePost + preLen/2 + ret.getContentSize().width/2;
        ret.setPositionX(xx);
        node.addChild(ret);

        prePost = xx;
        preLen = ret.getContentSize().width;

        width += ret.getContentSize().width;
        height = ret.getContentSize().height;

        if((i < str.length - 1) && ((str.length - 1- i) % 3 == 0))
        {

            ret = new cc.Sprite(gameUtility.getNumberPath(thang,-1));
            xx = prePost + preLen/2 + ret.getContentSize().width*0.49;
            ret.setPosition(xx - 3, -9);
            prePost  = xx;
            preLen = ret.getContentSize().width*0.49;
            node.addChild(ret);
            width += ret.getContentSize().width*0.49;
        }
    }

    node.setContentSize(cc.size(width,height));
    node.setAnchorPoint(cc.p(.5,.5));
    return node;
}

gameUtility.createText = function(messeage){
    var node = new cc.Scale9Sprite("res/common/9patch.png");
    var _label = new ccui.Text();
    _label.setAnchorPoint(cc.p(0.5,0.5));
    _label.setFontName("res/Font/Roboto-Black.ttf");
    _label.setFontSize(30);
    _label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
    _label.setColor(cc.color.WHITE);
    _label.setString(messeage);

    node.width = _label.getContentSize().width*1.05;
    node.height = 40;
    node.addChild(_label);
    _label.setPosition(cc.p(node.width/2,20));
    return node;
};

gameUtility.getAvatarPath  = function (value){
    if(value == "" || value == undefined){
        value = "0";
    }

    value = parseInt(value);
    if(value < 0 || value >= 12){
        value = 0;
    }
    for(var i = 0; i < 12; i ++){
        if(value == i) {
            return "res/common/avatar/Avatar_" + (i + 1) + ".png";
        }
    }
};


gameUtility.getPathSo = function(chuSo){
    var temp = parseInt(chuSo);
    return "res/common/boSo/bosothang/so" + chuSo + ".png";
};


gameUtility.getPathSo2 = function(chuSo){
    var temp = parseInt(chuSo);
    return "res/common/boSo/start_" + chuSo + ".png";
};


gameUtility.getPathSo3 = function(chuSo){
    if(chuSo == "."){
        return "res/common/boSo/dauphaycong.png";
    }

    var temp = parseInt(chuSo);
    return "res/common/boSo/cong_" + chuSo + ".png";
};


gameUtility.standartMoney1 = function(money){
    var s;
    if(money >= 1000000000){
        s = "" + Math.floor(money/1000000000)+ "B";
    }else if(money >= 1000000){
        s = "" + Math.floor(money/1000000) + "M";
    }else if(money >= 1000){
        s = "" + Math.floor(money/1000)+"K";
    }
    else{
        s = "" + money;
    }
    return s;
};

gameUtility.standartMoney2 = function(money){
    var s;
    var value;
    if(money >= 1000000000){
        value = Math.floor(money/1000000000);
        s = "" + Math.floor(money/1000000000)+ "B";
    }else if(money >= 1000000){
        value = Math.floor(money/1000000);
        s = "" + Math.floor(money/1000000) + "M";
    }else if(money >= 1000){
        value = Math.floor(money/1000);
        s = "" + Math.floor(money/1000)+"K";
    }
    else{
        s = "" + money;
    }
    if(value < 10){
        s = "  " + s;
    }
    else if(value < 100){
        s = " " + s;
    }
    return s;
};

gameUtility.standartMoneyPoker = function(money){
    var s;
    if(money >= 1000000000){
        s = "" + Math.floor(money/1000000000)+ "/" +  (Math.floor(money/1000000000)*2) + "B";
    }else if(money >= 1000000){
        s = "" + Math.floor(money/1000000) +  "/" +  (Math.floor(money/1000000)*2) + "M";
    }else if(money >= 1000){
        s = "" + Math.floor(money/1000)+ "/" +  (Math.floor(money/1000)*2) + "K";
    }
    else{
        s = "" + Math.floor(money)+ "/" +  Math.floor(money*2);
    }
    return s;
};

gameUtility.randomBetween = function(min, max){
    var tmp = Math.floor((Math.random() * (max - min)) + min);
    return tmp;
};

gameUtility.randomFloatBetween = function(min, max){
    var tmp = Math.random() * (max - min) + min;
    return tmp;
};

gameUtility.getSign = function(number){
    return number>0?1:-1;
};