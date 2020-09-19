/**
 * Created by Admin on 10/28/2016.
 */


var SUBSCRIBE_HALL = 10001;
var UNSUBSCRIBE_HALL = 10002;
var UPDATE_JACK_POTS = 10003;
//var UPDATE_RESULT_HALL = 10004;
var UPDATE_KHO_BAU_MINIMIZE = 2014;
var UPDATE_NDV_MINIMIZE = 3014;
var UPDATE_VQV_MINIMIZE = 5014;
var UPDATE_SAH_MINIMIZE = 4014;
var UPDATE_INFO_HALL = 10004;


var urlGetTopSlotsKhoBau = function(page)
{
    return BASE_URL + "c=136&p="+page;

}
//c=134&un=phamCanh&p=1&mt=1

var urlGetLsgdKhoBau = function(userName,page)
{
    return BASE_URL + "c=137&un="+userName+"&p="+page;

}


var urlGetTopNuDiepVien = function(page)
{
    return BASE_URL + "c=136&p="+page+"&gn=NuDiepVien";

}
//c=134&un=phamCanh&p=1&mt=1

var urlGetLsgdNuDiepVien = function(userName,page)
{
    return BASE_URL + "c=137&un="+userName+"&p="+page+"&gn=NuDiepVien";

}

var urlGetTopAvenger = function(page)
{
    return BASE_URL + "c=136&p="+page+"&gn=SieuAnhHung";

}
//c=134&un=phamCanh&p=1&mt=1

var urlGetLsgdAvenger = function(userName,page)
{
    return BASE_URL + "c=137&un="+userName+"&p="+page+"&gn=SieuAnhHung";

}

var urlGetTopVuongQuocVin = function(page)
{
    cc.log(BASE_URL + "c=138&p="+page+"&gn=VuongQuocVin");
    return BASE_URL + "c=138&p="+page+"&gn=VuongQuocVin";

}
//c=134&un=phamCanh&p=1&mt=1

var urlGetLsgdVuongQuocVin = function(userName,page)
{
    return BASE_URL + "c=137&un="+userName+"&p="+page+"&gn=VuongQuocVin";

}

var urlGetTopTayDuKy = function(page)
{
    cc.log(BASE_URL + "c=138&p="+page+"&gn=VuongQuocVin");
    return BASE_URL + "c=138&p="+page+"&gn=VuongQuocVin";

}
//c=134&un=phamCanh&p=1&mt=1

var urlGetLsgdTayDuKy = function(userName,page)
{
    return BASE_URL + "c=137&un="+userName+"&p="+page+"&gn=VuongQuocVin";

}