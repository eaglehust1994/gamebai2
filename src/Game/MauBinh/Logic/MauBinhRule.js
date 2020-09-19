/**
 * Created by Tuan on 05-Aug-16.
 */

var MauBinhRule = {};

MauBinhRule.compareChi = function(groupCard1, groupCard2, isTinhAt){
    if (groupCard1.groupKind > groupCard2.groupKind)
        return -1;
    else if (groupCard1.groupKind < groupCard2.groupKind)
        return 1;
    else{
        if (isTinhAt){
            var groupCard1Level = groupCard1.getGroupKindLevel(isTinhAt);
            var groupCard2Level = groupCard2.getGroupKindLevel(isTinhAt);

            if (groupCard1Level > groupCard2Level)
                return -1;
            else if (groupCard1Level < groupCard2Level)
                return 1;
        }

        for (var i=0; i<groupCard1.valueList.length; i++){
            if (groupCard1.valueList[i] > groupCard2.valueList[i])
                return 1;
            else if (groupCard1.valueList[i] < groupCard2.valueList[i])
                return -1;
        }
        return 0;
    }
};