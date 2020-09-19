/**
 * Created by Admin on 7/21/2016.
 */
var UserLogin = {
    id:1,
    username:"hungnd",
    nickname:"cacao_bcrt",
    password:"e10adc3949ba59abbe56e057f20f883e",
    email:null,
    facebookId:null,
    mobile:null,
    birthday:null,
    gender:false,
    address:null,
    vin:-20000,
    xu:0,
    vinTotal:0,
    xuTotal:0,
    safe:0,
    rechargeMoney:0,
    vippoint:0,
    daily:0,
    status:0,
    banLogin:false,
    banCashOut:false,
    banPlayGame:false,
    banTransferMoney:false,
    hasMobileSecurity:false,
    parserResult: function(strJson)
    {
        var jsonData = JSON.parse(strJson);
        this.id = jsonData["id"];
        this.username = jsonData["username"];
        this.nickname = jsonData["nickname"];
        this.password = jsonData["password"];
        this.email = jsonData["email"];

        this.facebookId = jsonData["facebookId"];
        this.mobile = jsonData["mobile"];
        this.birthday = jsonData["birthday"];
        this.gender = jsonData["gender"];
        this.address = jsonData["address"];

        this.vin = jsonData["vin"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];

        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];

        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
        this.id = jsonData["id"];
    }



};

