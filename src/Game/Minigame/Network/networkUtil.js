/**
 * Created by Admin on 7/9/2016.
 */

var TAI_XIU_ID = 2;
var MONEY_VIN = 1;
var MONEY_XU = 0;
var SIDE_TAI = 1;
var SIDE_XIU = 0;

var CARD_FROM = 0;
var CARD_TO = 50;

var MN_LOGIN = 1;
var MN_CHANGE_ROOM = 2002;
var MN_UPDATE_USER_INFO = 2003;
var MN_UNSUBSCRIBE = 2001;
var MN_SUBSCRIBE = 2000;  // Vào game
var MN_POP = 37; // đẩy minigame ra ngoài


var BET_TAI_XIU = 2110; //
var TAI_XIU_INFO = 2111;
var UPDATE_TAI_XIU_PER_SECOND = 2112;
var UPDATE_RESULT_DICES = 2113;
var UPDATE_PRIZE_TAI_XIU = 2114;
var START_NEW_GAME_TAI_XIU = 2115;
var LICH_SU_PHIEN_TAI_XIU = 2116;
var TX_TAN_LOC = 2118;
var TX_RUT_LOC = 2119;
var UPDATE_QUY_LOC = 2120;
var START_NEW_ROUND_RUT_LOC = 2121;
var UPDATE_LUOT_RUT_LOC = 2122;
var ENABLE_RUT_LOC = 2123;
var UPDATE_TIME_TAI_XIU = 2124;

var START_VQMM = 2140; //
var START_NEW_VQMM = 20042; //

var PLAY_MINI_POKER = 4001;
var UPDATE_POT_MINIPOKER = 4002;
var MINI_POKER_ROOM = 0;
var MINI_POKER_SUBSCRIBE = 4003;  // Vào minipoker
var UNSUBSCRIBER_MINI_POKER = 4004;
var CHANGE_ROOM_MINIPOKER = 4005;
var AUTO_PLAY_MINI_POKER = 4006;
var FORCE_STOP_AUTO_PLAY = 4008;

//Bầu Cua
var BC_SUBSCRIBE = 5001;
var BC_UNSUBSCRIBE = 5002;
var BC_CHANGE_ROOM = 5003;
var BC_BET = 5004;
var BC_INFO = 5005;
var BC_START_NEW_GAME = 5007;
var BC_UPDATE = 5006;
var BC_RESULT = 5008;
var BC_PRIZE = 5009;

//CaoThap
var START_PLAY_CAO_THAP = 6001;
var PLAY_CAO_THAP = 6002;
var UPDATE_POT_CAO_THAP = 6003;
var SUBSCRIBE_CAO_THAP = 6004;
var UNSUBSCRIBE_CAO_THAP = 6005;
var CHANGE_ROOM_CAO_THAP = 6006;
var STOP_PLAY_CAO_THAP = 6007;
var UPDATE_TIME_CAO_THAP = 6008;
var USER_INFO_CAO_THAP = 6009;


// Pokemon
var PKM_SUBCRIBE = 7003;
var PKM_UNSUBCRIBE = 7004;
var PKM_CHANGE_ROOM = 7005;
var PKM_PLAY = 7001;
var PKM_UPDATE_RESULT = 7001;
var PKM_UPDATE_POT = 7002;
var PKM_AUTO = 7006;
var PKM_STOP_AUTO = 7006;
var PKM_FORCE_STOP_AUTO = 7008;
var PKM_DATE_X2 = 7009;

//MenuLobby
var CHECK_NICK_NAME = 20018;
var GIFTCODE = 20017;
var RECHARGE_XU = 20011;
var SEND_OTP = 20019;
var RESULT_RECHARGE_XU = 20031;
var RECHARGE_VIN = 20012;
var RECHARGE_VINPLAY_CARD = 20045;
var RECHARGE_MEGA_CARD = 20046;
var BROADCAST_MESSAGE = 20100;
var CHANGEPASS = 20000;
var RESULT_CHANGEPASS = 20020;
var EXCHANGE_VIPPOINT = 20001;
var RESULT_EXCHANGE_VIPPOINT = 20021;
var UPDATE_USER_INFO = 20002;
var UPDATE_EMAIL_USER = 20003;
var UPDATE_PHONE_USER = 20004;
var ACTIVE_EMAIL = 20005;
var ACTIVE_MOBILE = 20006;
var RESULT_ACTIVE_MOBILE = 20026;
var EXCHANGE_MOBILE_ACTIVED = 20007;
var RESULT_EXCHANGE_MOBILE_ACTIVED = 20027;
var RESULT_ACTIVE_NEW_MOBILE = 20028;
var GET_INFORMATION_SERCURITY = 20050;
var SERCURITY_LOGIN = 20008;
var CONFIG_GAMES = 20010;
var SAFE_MONEY = 20009;
var RESULT_SAFE_MONEY = 20029;
var EXCHANGE_VIN = 20014;
var RESULT_EXCHANGE_VIN = 20034;
var GET_MONEYUSE = 20051;
var BUY_CARD = 20015;
var RESULT_BUY_CARD = 20035;
var RECHARGE_MOBILE = 20016;
var RESULT_RECHARGE_MOBILE = 20036;
var UPDATE_JACKPOT = 20101;
var RECHARGE_BANK = 20013;
var SUBCRIBE_JACPORT = 20102;
var UNSUBCRIBE_JACPORT = 20103;
var KICK_USER = 19001;
var POT_GAME_BAI = 20104;
var EVENT_VIPPOINT = 20039;

var SUBCRIBLE_CHAT = 18001;
var UNSUBCRIBLE_CHAT = 18002;
var SEND_CHAT = 18000;
var LOG_CHAT = 18003;

var CHECK_IAP = 20037;
var RESULT_IAP = 20038;

var NEW_MAIL = 20053;
var EVENT_VP_DRAGON = 20052;

var GET_VONGQUAY_VIP = 20043;
var PLAY_VONGQUAY_VIP = 20044;
var isHttps = false;

    var MODE_DEPLOY = {
        LOCAL:0,
        TEST:1,
        LIVE:2
    };

var CURRENT_IP = "45.32.103.189";

var CURRENT_MODE = MODE_DEPLOY.LIVE;

var BASE_URL = "http://" + CURRENT_IP + ":8081/api?";


var accessTokenUrl = "";

var urlQuickRegiste = function(username,password,captcha, idcaptcha)  // ?c=1&un=&pw=&cp=&cid=
{
    if(lobby.facebook_canvas == true)
        return BASE_URL + "c=1&un="+username+"&pw="+password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=Appfb&utm_medium=Appfb&utm_term=Appfb&utm_content=Appfb&utm_campaign=Appfb";
    else if(cc.sys.os == cc.sys.OS_IOS && ConnectNative.versionCode() == "1.3.5")
        return BASE_URL + "c=1&un="+username+"&pw="+password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=IOS&utm_medium=IOS&utm_term=IOS&utm_content=IOS&utm_campaign=IOS";
    else if(cc.sys.os == cc.sys.OS_ANDROID)
        return BASE_URL + "c=1&un="+username+"&pw="+password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl + "&utm_source=ANDROID&utm_medium=ANDROID&utm_term=ANDROID&utm_content=ANDROID&utm_campaign=ANDROID";
    else
        return BASE_URL + "c=1&un="+username+"&pw="+password + "&cp=" + captcha + "&cid=" + idcaptcha + "&at=" + accessTokenUrl;
}
var urlRegister = function(username,password,mobile,email,address)
{
    return BASE_URL + "c=2&un="+username+"&pw="+password+"&mobile="+mobile+"&email="+email+"&address="+address+ "&at=" + accessTokenUrl;
}
var urlLoginAcccessToken = function(nickName, accessToken, platform)
{
    //cc.log("platform :" + platform);
    return BASE_URL + "c=2&nn="+nickName+"&at="+accessToken + "&pf=" + platform;
}

var urlLogin = function(username,password, platform)
{
    return BASE_URL + "c=3&un="+username+"&pw="+password + "&pf=" + platform+ "&at=" + accessTokenUrl;
}

var urlUpdateNick = function(username,password,nickName,platform)
{
    cc.log(BASE_URL + "c=5&un="+username+"&pw="+password+"&nn="+ nickName)+ "&at=" + accessTokenUrl;

    return BASE_URL + "c=5&un="+username+"&pw="+password+"&nn="+ nickName + "&pf=" + platform+ "&at=" + accessTokenUrl;
}
var urlUpdateNickFBGG = function(s,at,nn, platform)
{
    return BASE_URL +"c=5&s="+s+"&at="+at+"&nn="+nn + "&pf=" + platform;
}

var urlGetConfig = function()
{
    var os = "";
    var did = "";

    if(cc.sys.os == cc.sys.OS_IOS)
    {
        os = "ios";

    }else
    if(cc.sys.os == cc.sys.OS_ANDROID)
    {
        os = "ad";

    }else
    if(cc.sys.os == cc.sys.OS_WP8)
    {
        os = "wp";
    }
    else
    {
        os = "web"
    }
    var url = BASE_URL + "c=6&v="+"1.0"+"&pf="+os+"&did="+did+ "&at=" + accessTokenUrl;
    // cc.log("urlGetConfig " + url);
    return url;
};

var urlGetConfigCommon = function()
{
    return BASE_URL + "c=129"+ "&at=" + accessTokenUrl;
}

var urlLichSuGiaoDichTX = function(page,username,moneyType)
{
    return BASE_URL + "c=100&p="+page+"&un="+username+"&mt="+moneyType+ "&at=" + accessTokenUrl;
}

var urlTopUserTX = function(moneyType)
{
    return BASE_URL + "c=101&mt="+moneyType+ "&at=" + accessTokenUrl;
}
var urlChiTietPhien = function(rid,mt)
{
    return BASE_URL + "c=102&rid="+rid+"&mt="+mt+ "&at=" + accessTokenUrl;
}
var urlThanhDuDay = function(day,type)
{
    return BASE_URL + "c=103&"+"date="+day+"&type="+type+ "&at=" + accessTokenUrl;
}
var urlThanhDuMonth = function(month,type)
{
    return BASE_URL + "c=103&"+"month="+month+"&type="+type+ "&at=" + accessTokenUrl;
}

// VQMM
var urlLichSuVQMM = function(nickname)
{
    return BASE_URL + "c=201&n=30&nn="+nickname+ "&at=" + accessTokenUrl;
}

var urlLichSuVQMM_NEW = function(nickname, page)
{
    return BASE_URL + "c=201&p="+page+"&nn="+nickname+ "&at=" + accessTokenUrl;
}


var urlTopTanLoc = function(un,type)
{
    return BASE_URL + "c=104&un="+un + "&type="+type+ "&at=" + accessTokenUrl;
}

// Minipoker
var urlVinhdanhMiniPoker = function(moneyType, page)
{
    return BASE_URL + "c=106&mt=" + moneyType + "&p=" + page+ "&at=" + accessTokenUrl;
}
var urlLichSuMiniPoker = function(page,nickname,moneyType)
{
    return BASE_URL + "c=105&p="+page+"&un=" + nickname+"&mt="+moneyType+ "&at=" + accessTokenUrl;
}
// Lichsu User
var urlLichSuUser = function(nickname,type,page,accesstoken)
{
    return BASE_URL + "c=302&nn="+nickname+"&mt=" + type+"&p="+page+"&at="+accesstoken;
}
// Daily
var urlDaily = function()
{
    return BASE_URL + "c=401"+ "&at=" + accessTokenUrl;
}
// mail user
var urlGetMailUser = function(nickname, page, accesstoken)
{
    return BASE_URL + "c=405&nn="+nickname+"&p="+page+"&at=" + accesstoken;
}
var urlUpdateMailUser = function(mailID)
{
    return BASE_URL + "c=404&mid="+mailID+ "&at=" + accessTokenUrl;
}
var urlDeleteMailUser = function(mailID)
{
    return BASE_URL + "c=403&mid="+mailID+ "&at=" + accessTokenUrl;
}

//Caothap
var urlVinhdanhCaoThap = function(moneyType, page)
{
    return BASE_URL + "c=108&mt=" + moneyType + "&p=" + page+ "&at=" + accessTokenUrl;
}
var urlLichSuCaoThap = function(page,nickname,moneyType)
{
    return BASE_URL + "c=107&p="+page+"&nn=" + nickname+"&mt="+moneyType+ "&at=" + accessTokenUrl;
}
var urlEventCaoThapMonth = function(type,month)
{
    return BASE_URL + "c=109&type=" + type + "&month="+ month+ "&at=" + accessTokenUrl;
}
var urlEventCaoThapDate = function(type,date)
{
    return BASE_URL + "c=109&type=" + type + "&date="+ date+ "&at=" + accessTokenUrl;
}

//Bầu cua

var urlBCTopUser = function(moneyType)
{
    return BASE_URL + "c=120&mt="+moneyType+ "&at=" + accessTokenUrl;
}

var urlBCLichSuGiaoDich= function(username,page,moneyType)
{
    return BASE_URL + "c=121&un="+username+"&p="+page+"&mt="+moneyType+ "&at=" + accessTokenUrl;
}
var urlBCToiChonCa = function(date)
{
    return BASE_URL + "c=122&date=" + date+ "&at=" + accessTokenUrl;
}

//PokeMon

var urlPKMLichSuGiaoDich = function(un,p,mt)
{
    return BASE_URL + "c=134&un="+un+"&p="+p+"&mt="+mt+ "&at=" + accessTokenUrl;
}

var urlPKMTopUser = function(p,mt)
{
    return BASE_URL + "c=135&p="+p+"&mt=" + mt+ "&at=" + accessTokenUrl;
}

var urlLoginGGFB = function(s,at,platform)
{
    if(lobby.facebook_canvas == true)
        return BASE_URL + "c=3&s="+s+"&at="+at + "&pf=" + platform + "&utm_source=Appfb&utm_medium=Appfb&utm_term=Appfb&utm_content=Appfb&utm_campaign=Appfb";
    else if(cc.sys.os == cc.sys.OS_IOS && ConnectNative.versionCode() == "1.3.5")
        return BASE_URL + "c=3&s="+s+"&at="+at + "&pf=" + platform + "&utm_source=IOS&utm_medium=IOS&utm_term=IOS&utm_content=IOS&utm_campaign=IOS";
    else
        return BASE_URL + "c=3&s="+s+"&at="+at + "&pf=" + platform;

}

var urlGetCaptcha = function()
{
    return BASE_URL + "c=124"+ "&at=" + accessTokenUrl;

}
var urlUpdateAvatar = function(nickname, vlAvatar)
{
    return BASE_URL + "c=125&nn="+ nickname +"&avatar=" + vlAvatar+ "&at=" + accessTokenUrl;

}
// change get vippoint
var urlGetVipPoint = function(nickname)
{
    return BASE_URL + "c=126&nn=" + nickname+ "&at=" + accessTokenUrl;

}
// send information forget password
var urlForgetPassword = function(username, captcha,captchaId)
{
    return BASE_URL + "c=127&un="+username+"&cp="+captcha+"&cid="+captchaId+ "&at=" + accessTokenUrl;

}
// send otp forget pass
var urlOTP_ForgetPassword = function(username, otp,type)
{
    return BASE_URL + "c=128&un="+username+"&otp="+otp+"&type=" + type+ "&at=" + accessTokenUrl;

}

// send email forget pass
var urlSendEmailForgetPassword = function(username, email)
{
    return BASE_URL + "c=133&un="+username+"&email="+email+ "&at=" + accessTokenUrl;

}

//login with otp
var urlLoginWithOtp = function(username, password, otp,type, platform)
{
    return BASE_URL + "c=4&un="+username+"&pw="+password+"&otp="+otp+"&type="+type + "&pf=" + platform+ "&at=" + accessTokenUrl;

}
//login FB GG with otp
var urlLoginFB_GG_Otp = function(s, at, otp,type, platform)
{
    return BASE_URL + "c=4&s="+s+"&at="+at+"&otp="+otp+"&type=" + type + "&pf=" + platform;

}
//getConfig Billing
var urlGetConfigBilling = function()
{
    return BASE_URL + "c=130"+ "&at=" + accessTokenUrl;

}

//getconfig Event Vippoint
var urlGetEventVippoint = function(nickname)
{
    return BASE_URL + "c=501&nn=" + nickname+ "&at=" + accessTokenUrl;

}
var urlBXH_Intel_Vippoint = function(nickname)
{
    return BASE_URL + "c=502&nn=" + nickname+ "&at=" + accessTokenUrl;

}
var urlBXH_Strong_Vippoint = function(nickname)
{
    return BASE_URL + "c=503&nn=" + nickname+ "&at=" + accessTokenUrl;

}

// VQ VIP
var urlLichSuVQVIP = function(nickname, page)
{
    return BASE_URL + "c=12&p="+page+"&nn="+nickname+ "&at=" + accessTokenUrl;
}
