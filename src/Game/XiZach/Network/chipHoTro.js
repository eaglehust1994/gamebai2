var listChip = [1, 5, 25, 100, 500, 1000, 5000, 25000, 100000, 500000, 1000000, 5000000, 25000000, 100000000];

var chiaPot = function(moneyBet){
    var res = [];
    var curChip = listChip.length -1;
    var curNumber = moneyBet;
    while(curNumber >0){
        while( curChip >= 0 && listChip[curChip] > curNumber){
            curChip--;
        }

        var numChip = Math.floor(curNumber/listChip[curChip]);
        curNumber = curNumber - numChip*listChip[curChip];
        res.push([curChip, numChip]);
    }

    // cc.log("res: " + res.length);
    for(var i = 0; i < res.length; i++){
        // cc.log(res[i][0] + " : "  + res[i][1]);
    }

    return res;
};

chiaPot(1345643341);