/**
 * Created by Tuan on 16-Aug-16.
 */

var MauBinhMathUtil={};

MauBinhMathUtil.randomBetween = function(min, max){
    var tmp = Math.floor((Math.random() * (max - min)) + min);
    return tmp;
};

MauBinhMathUtil.randomFloatBetween = function(min, max){
    var tmp = Math.random() * (max - min) + min;
    return tmp;
};

MauBinhMathUtil.getSign = function(number){
    return number>0?1:-1;
};