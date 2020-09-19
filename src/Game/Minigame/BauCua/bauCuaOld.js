var baucua = null;
var baucuaX = 0;
var baucuaY = 0;
var baucuaAppear = false;

var codeBauCua = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.btnCloseGameBC = null;
            this.isFirtBet = true;
            this.arrLichSu = [];
            //this.currentRoomBC
            this.pBauCua = null;
            this.btnXacNhan = null;
            this.btnXoa = null;
            this.btnGapThep = null;
            this.btnDatLai = null;
            this.bettingState = true;
            this.remainTime = 0;
            this.result = {
                dice1: 1,
                dice2: 1,
                dice3: 1,
                xPot: 1,
                xValue: 1
            };
            this.colorPotVin = cc.color(231, 2, 254);
            this.colorPotXu = cc.color.BLACK;
            this.colorBet = cc.color.RED;
            this.colorBetDone = cc.color.BLACK;

            this.isDoneTungXX = true;
            //this.btnNextRoom = null;
            //this.btnPreRoom = null;
            this.btn_room1 = null;
            this.btn_room2 = null;
            this.btn_room3 = null;
            this.txtMoneyPutBau = null;
            this.txtMoneyPutCua = null;
            this.txtMoneyPutTom = null;
            this.txtMoneyPutCa = null;
            this.txtMoneyPutGa = null;
            this.txtMoneyPutHuou = null;
            this.txtHuBau = null;
            this.txtHuCua = null;
            this.txtHuTom = null;
            this.txtHuCa = null;
            this.txtHuGa = null;
            this.txtHuHuou = null;
            this.txtMaPhienBC = null;
            this.txtTime = null;
            this.pnroomBC1 = null;
            this.pnroomBC2 = null;
            this.pnroomBC3 = null;
            this.pnroomBC4 = null;
            this.pnroomBC5 = null;
            this.btnBau = null;
            this.btnCua = null;
            this.btnTom = null;
            this.btnCa = null;
            this.btnGa = null;
            this.btnHuou = null;
            this.btn_soi_cau = null;
            this.indexMenhGia = 1;
            //this.txtroomBC1 = null;
            //this.txtroomBC2 = null;
            //this.txtroomBC3 = null;
            //this.txtroomBC4 = null;
            //this.txtroomBC5 = null;
            this.spTileNhan = null;
            this.sp_glow_nhan = null;
            this.spTileNhanXX = null;
            this.sp_glow_nhanXX = null;
            this.aniXucXacBC = null;
            this.spXucXacBC1 = null;
            this.spXucXacBC2 = null;
            this.spXucXacBC3 = null;
            this.spDiaBC = null;
            this.currentRoom = 0;
            this.moneyTypeBC = MONEY_VIN;
            this.menhGia = 1000;
            this.isBetDone = {
                room0: false,
                room1: false,
                room2: false,
                room3: false,
                room4: false,
                room5: false

            };
            this.lv_soi_cau = null;

            this.betValueOld = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.betValueDone = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.betValue = {
                room0: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room1: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room2: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room3: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room4: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                },
                room5: {
                    betBau: 0,
                    betCua: 0,
                    betTom: 0,
                    betCa: 0,
                    betGa: 0,
                    betHuou: 0
                }
            }

            this.valueMoney = 0;
            this.vtBtnRoom = 0;
            this.valuePutBau = 0;
            this.valuePutCua = 0;
            this.valuePutTom = 0;
            this.valuePutCa = 0;
            this.valuePutGa = 0;
            this.valuePutHuou = 0;
            this.resultBC = "6,3,1|2,4";
            this.linkImageXX = null;
            this.pnEffect = null;
            this.btnChangeRoomBC = null;
            this.InBau = null;
            this.InCua = null;
            this.InTom = null;
            this.InCa = null;
            this.InGa = null;
            this.InHuou = null;
            this.invisibleBC = "huou";
            this.numRunEffect = 15;
            this.strPutVin = "0,0,0,0,0,0";
            this.strPutXu = "0,0,0,0,0,0";
            this.strRememberVin = "0,0,0,0,0,0";
            this.strRememberXu = "0,0,0,0,0,0";
            this.moneyTypeBC = MONEY_VIN;
            //this.pn_SoiCau = null;
            this.btnTopXHBC = null;
            this.btnGuildBC = null;
            //this.btnLSPhienBC = null;
            this.btnLSGDBC = null;
            this.pnGuildBC = null;
            this.btnCloseGuild = null;
            this.pnTopXHBC = null;
            this.btnCloseXHBC = null;
            this.pnTopLSPhienBC = null;
            this.btnCloseLSPhienBC = null;
            this.pnLSGDBC = null;
            this.btnCloseLSGDBC = null;
            this.pSoiCau = null;
            this.lb_soi_cau_huou = null;
            this.lb_soi_cau_bau = null;
            this.lb_soi_cau_ga = null;
            this.lb_soi_cau_ca = null;
            this.lb_soi_cau_cua = null;
            this.lb_soi_cau_tom = null;
            this.btn_event = null;
            this._super("codeBauCua");

            this.initWithBinaryFile("res/MNBauCua.json");
            return true;
        },
        customizeGUI: function () {

            this.btnCloseGameBC = this.customButton("btnCloseGameBC", codeBauCua.BTN_CLOSEGAMEBAUCUA);

            this.pBauCua = this._layout.getChildByName("pBauCua");

            var Pn_PutMoney = this.getControl("Pn_PutMoney", this.pBauCua); //this._layout.getChildByName("Pn_PutMoney");
            this.txtHuHuou = this.getControl("txtHuHuou", Pn_PutMoney);
            this.txtHuBau = this.getControl("txtHuBau", Pn_PutMoney);
            this.txtHuGa = this.getControl("txtHuGa", Pn_PutMoney);
            this.txtHuCa = this.getControl("txtHuCa", Pn_PutMoney);
            this.txtHuCua = this.getControl("txtHuCua", Pn_PutMoney);
            this.txtHuTom = this.getControl("txtHuTom", Pn_PutMoney);
            //this.txtHuHuou.setString("1.000",Pn_PutMoney);
            //this.txtHuBau.setString("1.000",Pn_PutMoney);
            //this.txtHuGa.setString("1.000",Pn_PutMoney);
            //this.txtHuCa.setString("1.000",Pn_PutMoney);
            //this.txtHuCua.setString("1.000",Pn_PutMoney);
            //this.txtHuTom.setString("1.000",Pn_PutMoney);

            this.txtMoneyPutHuou = this.getControl("txtMoneyPutHuou", Pn_PutMoney);
            this.txtMoneyPutBau = this.getControl("txtMoneyPutBau", Pn_PutMoney);
            this.txtMoneyPutGa = this.getControl("txtMoneyPutGa", Pn_PutMoney);
            this.txtMoneyPutCa = this.getControl("txtMoneyPutCa", Pn_PutMoney);
            this.txtMoneyPutCua = this.getControl("txtMoneyPutCua", Pn_PutMoney);
            this.txtMoneyPutTom = this.getControl("txtMoneyPutTom", Pn_PutMoney);
            //this.txtMoneyPutHuou.setString(""); this.txtMoneyPutBau.setString(""); this.txtMoneyPutGa.setString("");
            //this.txtMoneyPutCa.setString(""); this.txtMoneyPutCua.setString(""); this.txtMoneyPutTom.setString("");

            this.txtMaPhienBC = this.getControl("txtMaPhien", this.pBauCua);//this._layout.getChildByName("txtMaPhien");
            // this.txtMaPhienBC.setString("#89923");
            this.txtTime = this.getControl("txtTime", this.pBauCua);//this._layout.getChildByName("txtTime");
            //this.txtTime.setString("00:10");

            this.lv_soi_cau = this.getControl("lv_soi_cau", this.pBauCua);

            this.pSoiCau = this.getControl("pSoiCau", this.pBauCua);
            this.pSoiCau.setVisible(false);
            this.btn_soi_cau = this.customButton("btn_soi_cau", codeBauCua.BTN_SOI_CAU, this.pBauCua);

            this.lb_soi_cau_huou = this.getControl("lb_soi_cau_huou", this.pSoiCau);
            this.lb_soi_cau_bau = this.getControl("lb_soi_cau_bau", this.pSoiCau);
            this.lb_soi_cau_ga = this.getControl("lb_soi_cau_ga", this.pSoiCau);
            this.lb_soi_cau_ca = this.getControl("lb_soi_cau_ca", this.pSoiCau);
            this.lb_soi_cau_cua = this.getControl("lb_soi_cau_cua", this.pSoiCau);
            this.lb_soi_cau_tom = this.getControl("lb_soi_cau_tom", this.pSoiCau);

            this.spDiaBC = this.pBauCua.getChildByName("spDia");//this._layout.getChildByName("spDia");
            this.spDiaBC.setVisible(false);
            this.spXucXacBC1 = this.pBauCua.getChildByName("spXucXac1");//this._layout.getChildByName("spXucXac1");
            this.spXucXacBC1.setVisible(false);
            this.spXucXacBC2 = this.pBauCua.getChildByName("spXucXac2");//this._layout.getChildByName("spXucXac2");
            this.spXucXacBC2.setVisible(false);
            this.spXucXacBC3 = this.pBauCua.getChildByName("spXucXac3");//this._layout.getChildByName("spXucXac3");
            this.spXucXacBC3.setVisible(false);
            this.aniXucXacBC = this.pBauCua.getChildByName("spAniXucXac");//this._layout.getChildByName("spAniXucXac");
            this.aniXucXacBC.setVisible(false);
            this.spTileNhan = this.pBauCua.getChildByName("spTileNhan");
            this.spTileNhan.setVisible(false);

            this.sp_glow_nhan = this.pBauCua.getChildByName("sp_glow_nhan");
            this.spTileNhanXX = this.pBauCua.getChildByName("spTileNhanXX");
            this.sp_glow_nhanXX = this.pBauCua.getChildByName("sp_glow_nhanXX");
            //this.sp_glow_nhanXX.runAction(cc.repeatForever(cc.rotateBy(2,360)));
            //this.sp_glow_nhan.runAction(cc.repeatForever(cc.rotateBy(2,360)));
            this.sp_glow_nhan.setVisible(false);
            this.spTileNhanXX.setVisible(false);
            this.sp_glow_nhanXX.setVisible(false);

            this.btnXacNhan = this.customButton("btnXacNhan", codeBauCua.BTN_XACNHAN, this.pBauCua);
            this.btnGapThep = this.customButton("btnGapThep", codeBauCua.BTN_GAPTHEPBC, this.pBauCua);
            this.btnXoa = this.customButton("btnXoa", codeBauCua.BTN_XOABAUCUA, this.pBauCua);
            this.btnDatLai = this.customButton("btnDatLai", codeBauCua.BTN_DATLAIBC, this.pBauCua);
            this.btn_event = this.customButton("btn_event", codeBauCua.BTN_EVENT, this.pBauCua);
            if (cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false)
                    this.btn_event.setEnabled(false);
            }

            this.btnBau = this.customButton("btnBau", codeBauCua.BTN_BAU, this.pBauCua);
            this.btnCua = this.customButton("btnCua", codeBauCua.BTN_CUA, this.pBauCua);
            this.btnTom = this.customButton("btnTom", codeBauCua.BTN_TOM, this.pBauCua);
            this.btnCa = this.customButton("btnCa", codeBauCua.BTN_CA, this.pBauCua);
            this.btnGa = this.customButton("btnGa", codeBauCua.BTN_GA, this.pBauCua);
            this.btnHuou = this.customButton("btnHuou", codeBauCua.BTN_HUOU, this.pBauCua);


            this.btn_room1 = this.customButton("btn_room1", codeBauCua.BTN_ROOM1, this.pBauCua);
            this.btn_room2 = this.customButton("btn_room2", codeBauCua.BTN_ROOM2, this.pBauCua);
            this.btn_room3 = this.customButton("btn_room3", codeBauCua.BTN_ROOM3, this.pBauCua);


            this.btn_key1 = this.customButton("btn_key1", codeBauCua.BTN_MONEYVALUE1, this.pBauCua);
            this.btn_key2 = this.customButton("btn_key2", codeBauCua.BTN_MONEYVALUE2, this.pBauCua);
            this.btn_key3 = this.customButton("btn_key3", codeBauCua.BTN_MONEYVALUE3, this.pBauCua);
            this.btn_key4 = this.customButton("btn_key4", codeBauCua.BTN_MONEYVALUE4, this.pBauCua);
            this.btn_key5 = this.customButton("btn_key5", codeBauCua.BTN_MONEYVALUE5, this.pBauCua);

            //this.pnEffect = this._layout.getChildByName("pnEffect");
            this.InBau = this.pBauCua.getChildByName("InBau");//this.getControl("InBau", this.pBauCua);
            this.InCua = this.pBauCua.getChildByName("InCua");//this.getControl("InCua", this.pBauCua);
            this.InTom = this.pBauCua.getChildByName("InTom");//this.getControl("InTom", this.pBauCua);
            this.InCa = this.pBauCua.getChildByName("InCa");//this.getControl("InCa", this.pBauCua);
            this.InGa = this.pBauCua.getChildByName("InGa");//this.getControl("InGa", this.pBauCua);
            this.InHuou = this.pBauCua.getChildByName("InHuou");//this.getControl("InHuou", this.pBauCua);
            this.btnChangeRoomBC = this.customButton("btnChangeRoomBC", codeBauCua.BTN_CHANGEROOMBC, this.pBauCua);

            this.btnTopXHBC = this.customButton("btnTopXHBC", codeBauCua.BTN_TOPXHBC, this.pBauCua);
            this.btnGuildBC = this.customButton("btnGuildBC", codeBauCua.BTN_GUILDBC, this.pBauCua);
            this.btnLSGDBC = this.customButton("btnLSGDBC", codeBauCua.BTN_LICHSUGDBC, this.pBauCua);

            this.addMasterLayer(this.pBauCua);

            if (!cc.sys.isNative) {
                this.pBauCua.setScale(0.80);
            }
            this.sp_glow_nhanXX.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
            this.sp_glow_nhan.runAction(cc.repeatForever(cc.rotateBy(3, 360)));
        },
        onButtonRelease: function (button, id) {

            switch (id) {
                case codeBauCua.BTN_EVENT:
                    openBCToiChonCa();
                    break;
                case codeBauCua.BTN_SOI_CAU:
                    if (this.pSoiCau.isVisible()) {
                        this.pSoiCau.setVisible(false);
                        this.lv_soi_cau.setVisible(true);
                    } else {
                        this.pSoiCau.setVisible(true);
                        this.lv_soi_cau.setVisible(false);
                    }
                    break;
                case codeBauCua.BTN_CLOSEGAMEBAUCUA:
                    closeBauCua();
                    break;
                case codeBauCua.BTN_XACNHAN:
                    if (this.bettingState == true && this.remainTime < 6) {
                        this.toastBauCua("Quá thời gian đặt cửa", 3);
                    } else {
                        this.btnXacNhan.setEnabled(false);
                        this.sendBet();
                    }


                    break;
                case codeBauCua.BTN_BAU:

                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.BAU, this.menhGia);
                    }

                    break;
                case codeBauCua.BTN_CUA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.CUA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_TOM:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.TOM, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_CA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.CA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_GA:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.GA, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_HUOU:
                    if (this.checkMoney()) {
                        this.updateBetBauCua(codeBauCua.HUOU, this.menhGia);
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE1:
                    if (this.indexMenhGia == 1) {

                    } else {
                        this.nhayBtnKey(this.btn_key1);
                        this.indexMenhGia = 1;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 1000;
                                break;
                            case 1:
                                this.menhGia = 10000;
                                break;
                            case 2:
                                this.menhGia = 100000;
                                break;
                            case 3:
                                this.menhGia = 10000;
                                break;
                            case 4:
                                this.menhGia = 100000;
                                break;
                            case 5:
                                this.menhGia = 1000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE2:
                    if (this.indexMenhGia == 2) {

                    } else {
                        this.nhayBtnKey(this.btn_key2);
                        this.indexMenhGia = 2;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 5000;
                                break;
                            case 1:
                                this.menhGia = 50000;
                                break;
                            case 2:
                                this.menhGia = 500000;
                                break;
                            case 3:
                                this.menhGia = 50000;
                                break;
                            case 4:
                                this.menhGia = 500000;
                                break;
                            case 5:
                                this.menhGia = 5000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE3:
                    if (this.indexMenhGia == 3) {

                    } else {
                        this.nhayBtnKey(this.btn_key3);
                        this.indexMenhGia = 3;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 10000;
                                break;
                            case 1:
                                this.menhGia = 100000;
                                break;
                            case 2:
                                this.menhGia = 1000000;
                                break;
                            case 3:
                                this.menhGia = 100000;
                                break;
                            case 4:
                                this.menhGia = 1000000;
                                break;
                            case 5:
                                this.menhGia = 10000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE4:
                    if (this.indexMenhGia == 4) {

                    } else {
                        this.nhayBtnKey(this.btn_key4);
                        this.indexMenhGia = 4;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 50000;
                                break;
                            case 1:
                                this.menhGia = 500000;
                                break;
                            case 2:
                                this.menhGia = 5000000;
                                break;
                            case 3:
                                this.menhGia = 500000;
                                break;
                            case 4:
                                this.menhGia = 5000000;
                                break;
                            case 5:
                                this.menhGia = 50000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_MONEYVALUE5:
                    if (this.indexMenhGia == 5) {

                    } else {
                        this.nhayBtnKey(this.btn_key5);
                        this.indexMenhGia = 5;
                        switch (this.currentRoom) {
                            case 0:
                                this.menhGia = 100000;
                                break;
                            case 1:
                                this.menhGia = 1000000;
                                break;
                            case 2:
                                this.menhGia = 10000000;
                                break;
                            case 3:
                                this.menhGia = 1000000;
                                break;
                            case 4:
                                this.menhGia = 10000000;
                                break;
                            case 5:
                                this.menhGia = 100000000;
                                break;
                        }
                    }
                    break;
                case codeBauCua.BTN_CHANGEROOMBC:

                    if (this.moneyTypeBC == MONEY_VIN) {
                        this.sendChangeRoom(this.currentRoom, 3);
                    } else {
                        this.sendChangeRoom(this.currentRoom, 0);
                    }

                    break;
                case codeBauCua.BTN_XOABAUCUA:


                    if (this.betValue["room" + this.currentRoom].betBau > 0 || this.betValue["room" + this.currentRoom].betCua > 0 || this.betValue["room" + this.currentRoom].betTom > 0 || this.betValue["room" + this.currentRoom].betCa > 0 || this.betValue["room" + this.currentRoom].betGa > 0 || this.betValue["room" + this.currentRoom].betHuou > 0) {
                        this.betValue["room" + this.currentRoom].betBau = 0;
                        this.betValue["room" + this.currentRoom].betCua = 0;
                        this.betValue["room" + this.currentRoom].betTom = 0;
                        this.betValue["room" + this.currentRoom].betCa = 0;
                        this.betValue["room" + this.currentRoom].betGa = 0;
                        this.betValue["room" + this.currentRoom].betHuou = 0;

                        this.txtMoneyPutBau.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betBau));
                        this.txtMoneyPutBau.setColor(this.colorBetDone);
                        this.txtMoneyPutCua.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betCua));
                        this.txtMoneyPutCua.setColor(this.colorBetDone);
                        this.txtMoneyPutTom.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betTom));
                        this.txtMoneyPutTom.setColor(this.colorBetDone);
                        this.txtMoneyPutCa.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betCa));
                        this.txtMoneyPutCa.setColor(this.colorBetDone);
                        this.txtMoneyPutGa.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betGa));
                        this.txtMoneyPutGa.setColor(this.colorBetDone);
                        this.txtMoneyPutHuou.setString(formatMoneyStr(this.betValueDone["room" + this.currentRoom].betHuou));
                        this.txtMoneyPutHuou.setColor(this.colorBetDone);
                    } else {
                        this.toastBauCua("Bạn chưa đăt cửa", 3);
                    }


                    break;
                case codeBauCua.BTN_DATLAIBC:
                    if (this.isBetDone["room" + this.currentRoom]) {
                        this.toastBauCua("Chỉ được đặt lại lần đầu", 3);
                    } else {
                        if (this.betValueOld["room" + this.currentRoom].betBau > 0 || this.betValueOld["room" + this.currentRoom].betCua > 0 || this.betValueOld["room" + this.currentRoom].betTom > 0 || this.betValueOld["room" + this.currentRoom].betCa > 0 || this.betValueOld["room" + this.currentRoom].betGa > 0 || this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                            if (this.betValueOld["room" + this.currentRoom].betBau > 0) {
                                this.betValue["room" + this.currentRoom].betBau = 0;//parseFloat(this.betValueOld["room"+this.currentRoom].betBau)*2;
                                this.updateBetBauCua(codeBauCua.BAU, parseFloat(this.betValueOld["room" + this.currentRoom].betBau));

                            } else {
                                this.betValue["room" + this.currentRoom].betBau = 0;
                                this.updateBetBauCua(codeBauCua.BAU, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCua > 0) {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, parseFloat(this.betValueOld["room" + this.currentRoom].betCua));
                            } else {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betTom > 0) {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, parseFloat(this.betValueOld["room" + this.currentRoom].betTom));
                            } else {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCa > 0) {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, parseFloat(this.betValueOld["room" + this.currentRoom].betCa));
                            } else {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betGa > 0) {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, parseFloat(this.betValueOld["room" + this.currentRoom].betGa));
                            } else {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, parseFloat(this.betValueOld["room" + this.currentRoom].betHuou));
                            } else {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, 0);
                            }
                        } else {
                            this.toastBauCua("Bạn chưa đặt phiên trước", 3);
                        }


                    }
                    break;
                case codeBauCua.BTN_GAPTHEPBC:

                    if (this.isBetDone["room" + this.currentRoom]) {
                        this.toastBauCua("Chỉ được gấp thếp lần đầu");
                    } else {
                        if (this.betValueOld["room" + this.currentRoom].betBau > 0 || this.betValueOld["room" + this.currentRoom].betCua > 0 || this.betValueOld["room" + this.currentRoom].betTom > 0 || this.betValueOld["room" + this.currentRoom].betCa > 0 || this.betValueOld["room" + this.currentRoom].betGa > 0 || this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                            if (this.betValueOld["room" + this.currentRoom].betBau > 0) {
                                this.betValue["room" + this.currentRoom].betBau = 0;//parseFloat(this.betValueOld["room"+this.currentRoom].betBau)*2;
                                this.updateBetBauCua(codeBauCua.BAU, parseFloat(this.betValueOld["room" + this.currentRoom].betBau) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betBau = 0;
                                this.updateBetBauCua(codeBauCua.BAU, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCua > 0) {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, parseFloat(this.betValueOld["room" + this.currentRoom].betCua) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betCua = 0;
                                this.updateBetBauCua(codeBauCua.CUA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betTom > 0) {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, parseFloat(this.betValueOld["room" + this.currentRoom].betTom) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betTom = 0;
                                this.updateBetBauCua(codeBauCua.TOM, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betCa > 0) {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, parseFloat(this.betValueOld["room" + this.currentRoom].betCa) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betCa = 0;
                                this.updateBetBauCua(codeBauCua.CA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betGa > 0) {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, parseFloat(this.betValueOld["room" + this.currentRoom].betGa) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betGa = 0;
                                this.updateBetBauCua(codeBauCua.GA, 0);
                            }

                            if (this.betValueOld["room" + this.currentRoom].betHuou > 0) {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, parseFloat(this.betValueOld["room" + this.currentRoom].betHuou) * 2);
                            } else {
                                this.betValue["room" + this.currentRoom].betHuou = 0;
                                this.updateBetBauCua(codeBauCua.HUOU, 0);
                            }
                        } else {
                            this.toastBauCua("Bạn chưa đặt phiên trước", 3);
                        }


                    }

                    break;
                case codeBauCua.BTN_TOPXHBC:
                    openBCTopUser();
                    break;
                case codeBauCua.BTN_CLOSETOPXHBC:
                    break;
                case codeBauCua.BTN_GUILDBC:
                    openbcHuongDan();
                    break;
                case codeBauCua.BTN_CLOSEGUILDBC:
                    break;
                //case codeBauCua.BTN_LICHSUPHIENBC:
                //    break;
                case codeBauCua.BTN_CLOSELICHSUPHIENBC:
                    break;
                case codeBauCua.BTN_LICHSUGDBC:
                    openbcLSGD();
                    break;
                case codeBauCua.BTN_CLOSELICHSUGDBC:
                    break;
                case codeBauCua.BTN_ROOM1:
                    if (this.currentRoom == 0 || this.currentRoom == 3) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 0);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 3);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
                case codeBauCua.BTN_ROOM2:
                    if (this.currentRoom == 1 || this.currentRoom == 4) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 1);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 4);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
                case codeBauCua.BTN_ROOM3:
                    if (this.currentRoom == 2 || this.currentRoom == 5) {

                    } else {
                        if (this.moneyTypeBC == MONEY_VIN) {
                            this.sendChangeRoom(this.currentRoom, 2);
                        } else {
                            this.sendChangeRoom(this.currentRoom, 5);
                        }
                        this.btn_room1.setEnabled(false);
                        this.btn_room2.setEnabled(false);
                        this.btn_room3.setEnabled(false);
                        this.btnChangeRoomBC.setEnabled(false);
                    }
                    break;
            }
        },
        updateBetBauCua: function (side, value) {
            // cc.log(this.menhGia);
            if (this.isFirtBet) {
                this.toastBauCua("Bấm xác nhận để hoàn tất", 3);
                this.isFirtBet = false;
            }

            switch (side) {
                case codeBauCua.BAU:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betBau = this.betValue.room0.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betBau) + parseFloat(this.betValueDone.room0.betBau);
                            // cc.log(monneyBetShow);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betBau = this.betValue.room1.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betBau) + parseFloat(this.betValueDone.room1.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betBau = this.betValue.room2.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betBau) + parseFloat(this.betValueDone.room2.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betBau = this.betValue.room3.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betBau) + parseFloat(this.betValueDone.room3.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betBau = this.betValue.room4.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betBau) + parseFloat(this.betValueDone.room4.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betBau = this.betValue.room5.betBau + value;
                            if (value == 0)
                                this.txtMoneyPutBau.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutBau.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betBau) + parseFloat(this.betValueDone.room5.betBau);
                            this.txtMoneyPutBau.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.CUA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betCua = this.betValue.room0.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betCua) + parseFloat(this.betValueDone.room0.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betCua = this.betValue.room1.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betCua) + parseFloat(this.betValueDone.room1.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betCua = this.betValue.room2.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betCua) + parseFloat(this.betValueDone.room2.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betCua = this.betValue.room3.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betCua) + parseFloat(this.betValueDone.room3.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betCua = this.betValue.room4.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betCua) + parseFloat(this.betValueDone.room4.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betCua = this.betValue.room5.betCua + value;
                            if (value == 0)
                                this.txtMoneyPutCua.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCua.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betCua) + parseFloat(this.betValueDone.room5.betCua);
                            this.txtMoneyPutCua.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.TOM:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betTom = this.betValue.room0.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betTom) + parseFloat(this.betValueDone.room0.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betTom = this.betValue.room1.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betTom) + parseFloat(this.betValueDone.room1.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betTom = this.betValue.room2.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betTom) + parseFloat(this.betValueDone.room2.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betTom = this.betValue.room3.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betTom) + parseFloat(this.betValueDone.room3.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betTom = this.betValue.room4.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betTom) + parseFloat(this.betValueDone.room4.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betTom = this.betValue.room5.betTom + value;
                            if (value == 0)
                                this.txtMoneyPutTom.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutTom.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betTom) + parseFloat(this.betValueDone.room5.betTom);
                            this.txtMoneyPutTom.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.CA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betCa = this.betValue.room0.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betCa) + parseFloat(this.betValueDone.room0.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betCa = this.betValue.room1.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betCa) + parseFloat(this.betValueDone.room1.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betCa = this.betValue.room2.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betCa) + parseFloat(this.betValueDone.room2.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betCa = this.betValue.room3.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betCa) + parseFloat(this.betValueDone.room3.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betCa = this.betValue.room4.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betCa) + parseFloat(this.betValueDone.room4.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betCa = this.betValue.room5.betCa + value;
                            if (value == 0)
                                this.txtMoneyPutCa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutCa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betCa) + parseFloat(this.betValueDone.room5.betCa);
                            this.txtMoneyPutCa.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.GA:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betGa = this.betValue.room0.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betGa) + parseFloat(this.betValueDone.room0.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betGa = this.betValue.room1.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betGa) + parseFloat(this.betValueDone.room1.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betGa = this.betValue.room2.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betGa) + parseFloat(this.betValueDone.room2.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betGa = this.betValue.room3.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betGa) + parseFloat(this.betValueDone.room3.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betGa = this.betValue.room4.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betGa) + parseFloat(this.betValueDone.room4.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betGa = this.betValue.room5.betGa + value;
                            if (value == 0)
                                this.txtMoneyPutGa.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutGa.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betGa) + parseFloat(this.betValueDone.room5.betGa);
                            this.txtMoneyPutGa.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
                case codeBauCua.HUOU:
                    switch (this.currentRoom) {
                        case 0:
                            this.betValue.room0.betHuou = this.betValue.room0.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room0.betHuou) + parseFloat(this.betValueDone.room0.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 1:
                            this.betValue.room1.betHuou = this.betValue.room1.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room1.betHuou) + parseFloat(this.betValueDone.room1.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 2:
                            this.betValue.room2.betHuou = this.betValue.room2.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room2.betHuou) + parseFloat(this.betValueDone.room2.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 3:
                            this.betValue.room3.betHuou = this.betValue.room3.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room3.betHuou) + parseFloat(this.betValueDone.room3.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 4:
                            this.betValue.room4.betHuou = this.betValue.room4.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room4.betHuou) + parseFloat(this.betValueDone.room4.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                        case 5:
                            this.betValue.room5.betHuou = this.betValue.room5.betHuou + value;
                            if (value == 0)
                                this.txtMoneyPutHuou.setColor(this.colorBetDone);
                            else
                                this.txtMoneyPutHuou.setColor(this.colorBet);
                            var monneyBetShow = parseFloat(this.betValue.room5.betHuou) + parseFloat(this.betValueDone.room5.betHuou);
                            this.txtMoneyPutHuou.setString(formatMoneyStr(monneyBetShow));
                            break;
                    }

                    break;
            }
        },
        checkMoney: function () {
            if (this.moneyTypeBC == MONEY_VIN) {
                if (lobby.userInfo.vinTotal < this.menhGia) {
                    this.toastBauCua("Không đủ VIN", 3);
                    return false;
                }
                else {
                    return true;
                }
            } else {
                if (lobby.userInfo.xuTotal < this.menhGia) {
                    this.toastBauCua("Không đủ Xu", 3);
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        nhayBtnKey: function (btn) {
            this.btn_key1.setPosition(cc.p(this.btn_key1.getPosition().x, 5));
            this.btn_key2.setPosition(cc.p(this.btn_key2.getPosition().x, 5));
            this.btn_key3.setPosition(cc.p(this.btn_key3.getPosition().x, 5));
            this.btn_key4.setPosition(cc.p(this.btn_key4.getPosition().x, 5));
            this.btn_key5.setPosition(cc.p(this.btn_key5.getPosition().x, 5));
            this.btn_key1.stopAllActions();
            this.btn_key2.stopAllActions();
            this.btn_key3.stopAllActions();
            this.btn_key4.stopAllActions();
            this.btn_key5.stopAllActions();

            var moveB = cc.moveBy(0.2, cc.p(0, 8));
            var actionByBack = moveB.reverse();
            btn.runAction(cc.repeatForever(cc.sequence(moveB, actionByBack)));

        },

        responseInfo: function (referenceId, remainTime, bettingState, potData, betData, lichSuPhien, dice1, dice2, dice3, xPot, xValue, room) {
            this.bettingState = bettingState;
            this.remainTime = remainTime;
            if (bettingState) {
                if (remainTime > 5) {
                    this.txtTime.setColor(cc.color.WHITE);
                } else {
                    this.txtTime.setColor(cc.color.RED);
                }
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.inVisibleEffect();

                this.stopAllActions();
                this.btnBau.stopAllActions();
                this.btnCua.stopAllActions();
                this.btnTom.stopAllActions();
                this.btnCa.stopAllActions();
                this.btnGa.stopAllActions();
                this.btnHuou.stopAllActions();
                this.btnBau.setScale(1);
                this.btnCua.setScale(1);
                this.btnTom.setScale(1);
                this.btnCa.setScale(1);
                this.btnGa.setScale(1);
                this.btnHuou.setScale(1);

                this.numRunEffect = 15;
                this.spDiaBC.setVisible(false);
                this.spXucXacBC1.setVisible(false);
                this.spXucXacBC2.setVisible(false);
                this.spXucXacBC3.setVisible(false);
                this.aniXucXacBC.stopAllActions();
                this.aniXucXacBC.setVisible(false);
                this.spTileNhan.setVisible(false);
                this.sp_glow_nhan.setVisible(false);
                this.spTileNhanXX.setVisible(false);
                this.sp_glow_nhanXX.setVisible(false);

                //this.isBetDone = false;

                this.txtHuBau.setString("0");
                this.txtHuCua.setString("0");
                this.txtHuTom.setString("0");
                this.txtHuCa.setString("0");
                this.txtHuGa.setString("0");
                this.txtHuHuou.setString("0");

                this.txtMoneyPutBau.setString("0");
                this.txtMoneyPutCua.setString("0");
                this.txtMoneyPutTom.setString("0");
                this.txtMoneyPutCa.setString("0");
                this.txtMoneyPutGa.setString("0");
                this.txtMoneyPutHuou.setString("0");

                this.txtMoneyPutBau.setColor(this.colorBetDone);
                this.txtMoneyPutCua.setColor(this.colorBetDone);
                this.txtMoneyPutTom.setColor(this.colorBetDone);
                this.txtMoneyPutCa.setColor(this.colorBetDone);
                this.txtMoneyPutGa.setColor(this.colorBetDone);
                this.txtMoneyPutHuou.setColor(this.colorBetDone);


                this.btn_room1.setEnabled(true);
                this.btn_room2.setEnabled(true);
                this.btn_room3.setEnabled(true);
                this.btnChangeRoomBC.setEnabled(true);
                this.btnBau.setEnabled(true);
                this.btnCua.setEnabled(true);
                this.btnTom.setEnabled(true);
                this.btnCa.setEnabled(true);
                this.btnGa.setEnabled(true);
                this.btnHuou.setEnabled(true);

                this.btnGapThep.setEnabled(true);
                this.btnDatLai.setEnabled(true);
                this.btnXoa.setEnabled(true);
                this.btnXacNhan.setEnabled(true);
            }
            else {
                //this.visibleEffect();
                this.txtTime.setColor(cc.color.YELLOW);
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }

                //if(dice1 == 0) baucua.InBau.setVisible(false);
                //else if(dice1 == 1) baucua.InCua.setVisible(false);
                //else if(dice1 == 2) baucua.InTom.setVisible(false);
                //else if(dice1 == 3) baucua.InCa.setVisible(false);
                //else if(dice1 == 4) baucua.InGa.setVisible(false);
                //else if(dice1 == 5) baucua.InHuou.setVisible(false);
                //
                //if(dice2 == 0) baucua.InBau.setVisible(false);
                //else if(dice2 == 1) baucua.InCua.setVisible(false);
                //else if(dice2 == 2) baucua.InTom.setVisible(false);
                //else if(dice2 == 3) baucua.InCa.setVisible(false);
                //else if(dice2 == 4) baucua.InGa.setVisible(false);
                //else if(dice2 == 5) baucua.InHuou.setVisible(false);
                //
                //if(dice3 == 0) baucua.InBau.setVisible(false);
                //else if(dice3 ==1) baucua.InCua.setVisible(false);
                //else if(dice3 == 2) baucua.InTom.setVisible(false);
                //else if(dice3 == 3) baucua.InCa.setVisible(false);
                //else if(dice3 == 4) baucua.InGa.setVisible(false);
                //else if(dice3 == 5) baucua.InHuou.setVisible(false);
                this.result.dice1 = dice1;
                this.result.dice2 = dice2;
                this.result.dice3 = dice3;
                this.result.xPot = xPot;
                this.result.xValue = xValue;

                this.showDoneEff();

                this.btn_room1.setEnabled(false);
                this.btn_room2.setEnabled(false);
                this.btn_room3.setEnabled(false);
                this.btnChangeRoomBC.setEnabled(false);
                this.btnBau.setEnabled(false);
                this.btnCua.setEnabled(false);
                this.btnTom.setEnabled(false);
                this.btnCa.setEnabled(false);
                this.btnGa.setEnabled(false);
                this.btnHuou.setEnabled(false);

                this.btnGapThep.setEnabled(false);
                this.btnDatLai.setEnabled(false);
                this.btnXoa.setEnabled(false);
                this.btnXacNhan.setEnabled(false);

            }

            this.txtMaPhienBC.setString("#" + referenceId);
            var potDatas = potData.split(",");
            if (potDatas.length > 5) {
                this.txtHuBau.setString(formatMoneyStr(potDatas[0]));
                this.txtHuCua.setString(formatMoneyStr(potDatas[1]));
                this.txtHuTom.setString(formatMoneyStr(potDatas[2]));
                this.txtHuCa.setString(formatMoneyStr(potDatas[3]));
                this.txtHuGa.setString(formatMoneyStr(potDatas[4]));
                this.txtHuHuou.setString(formatMoneyStr(potDatas[5]));
            }
            var betDatas = betData.split(",");
            if (betDatas.length > 5) {
                this.txtMoneyPutBau.setString(formatMoneyStr(betDatas[0]));
                this.txtMoneyPutCua.setString(formatMoneyStr(betDatas[1]));
                this.txtMoneyPutTom.setString(formatMoneyStr(betDatas[2]));
                this.txtMoneyPutCa.setString(formatMoneyStr(betDatas[3]));
                this.txtMoneyPutGa.setString(formatMoneyStr(betDatas[4]));
                this.txtMoneyPutHuou.setString(formatMoneyStr(betDatas[5]));
                this.betValueDone["room" + room].betBau = betDatas[0];
                this.betValueDone["room" + room].betCua = betDatas[1];
                this.betValueDone["room" + room].betTom = betDatas[2];
                this.betValueDone["room" + room].betCa = betDatas[3];
                this.betValueDone["room" + room].betGa = betDatas[4];
                this.betValueDone["room" + room].betHuou = betDatas[5];

            }
            this.betValue["room" + room].betBau = 0;
            this.betValue["room" + room].betCua = 0;
            this.betValue["room" + room].betTom = 0;
            this.betValue["room" + room].betCa = 0;
            this.betValue["room" + room].betGa = 0;
            this.betValue["room" + room].betHuou = 0;

            this.txtMoneyPutBau.setColor(this.colorBetDone);
            this.txtMoneyPutCua.setColor(this.colorBetDone);
            this.txtMoneyPutTom.setColor(this.colorBetDone);
            this.txtMoneyPutCa.setColor(this.colorBetDone);
            this.txtMoneyPutGa.setColor(this.colorBetDone);
            this.txtMoneyPutHuou.setColor(this.colorBetDone);

            this.loadRoom(room, betData);

            //cc.log(lichSuPhien);
            var lichSu = lichSuPhien.split(",");
            while (this.arrLichSu.length > 0) {
                this.arrLichSu.pop();
            }
            for (var i = 0; i < lichSu.length; i++) {
                if (i % 5 == 4) {
                    var obLs = {};
                    obLs.xx1 = lichSu[i - 4];
                    obLs.xx2 = lichSu[i - 3];
                    obLs.xx3 = lichSu[i - 2];
                    obLs.xPot = lichSu[i - 1];
                    obLs.xValue = lichSu[i];

                    this.arrLichSu.push(obLs);
                }
            }
            this.reloadSoiCau1(this.arrLichSu);
            this.reloadSoiCau2(this.arrLichSu);

        },
        responseBet: function (result, currentMoney) {

            lobby.updateMoney(currentMoney, this.moneyTypeBC);
            this.btnXacNhan.setEnabled(true);

            if (result == 1) {
                this.betValueDone["room" + this.currentRoom].betBau = parseFloat(this.betValueDone["room" + this.currentRoom].betBau) + parseFloat(this.betValue["room" + this.currentRoom].betBau);
                this.betValueDone["room" + this.currentRoom].betCua = parseFloat(this.betValueDone["room" + this.currentRoom].betCua) + parseFloat(this.betValue["room" + this.currentRoom].betCua);
                this.betValueDone["room" + this.currentRoom].betTom = parseFloat(this.betValueDone["room" + this.currentRoom].betTom) + parseFloat(this.betValue["room" + this.currentRoom].betTom);
                this.betValueDone["room" + this.currentRoom].betCa = parseFloat(this.betValueDone["room" + this.currentRoom].betCa) + parseFloat(this.betValue["room" + this.currentRoom].betCa);
                this.betValueDone["room" + this.currentRoom].betGa = parseFloat(this.betValueDone["room" + this.currentRoom].betGa) + parseFloat(this.betValue["room" + this.currentRoom].betGa);
                this.betValueDone["room" + this.currentRoom].betHuou = parseFloat(this.betValueDone["room" + this.currentRoom].betHuou) + parseFloat(this.betValue["room" + this.currentRoom].betHuou);

                this.betValue["room" + this.currentRoom].betBau = 0;
                this.betValue["room" + this.currentRoom].betCua = 0;
                this.betValue["room" + this.currentRoom].betTom = 0;
                this.betValue["room" + this.currentRoom].betCa = 0;
                this.betValue["room" + this.currentRoom].betGa = 0;
                this.betValue["room" + this.currentRoom].betHuou = 0;

                this.txtMoneyPutBau.setColor(this.colorBetDone);
                this.txtMoneyPutCua.setColor(this.colorBetDone);
                this.txtMoneyPutTom.setColor(this.colorBetDone);
                this.txtMoneyPutCa.setColor(this.colorBetDone);
                this.txtMoneyPutGa.setColor(this.colorBetDone);
                this.txtMoneyPutHuou.setColor(this.colorBetDone);

                this.isBetDone["room" + this.currentRoom] = true;

                this.toastBauCua("Đặt cửa thành công.", 3);

            } else if (result == 100) {
                this.toastBauCua("Đặt của thất bại.", 3);
            }
            else if (result == 101) {
                this.toastBauCua("Chưa tới lượt đặt cửa.", 3);
            }
            else if (result == 102) {
                this.toastBauCua("Không đủ tiền.", 3);
            }

        },

        responseStartNewGame: function (referenceId) {
            this.isFirtBet = true;
            this.txtMaPhienBC.setString("#" + referenceId);
            this.inVisibleEffect();
            this.stopAllActions();
            this.btnBau.stopAllActions();
            this.btnCua.stopAllActions();
            this.btnTom.stopAllActions();
            this.btnCa.stopAllActions();
            this.btnGa.stopAllActions();
            this.btnHuou.stopAllActions();
            this.btnBau.setScale(1);
            this.btnCua.setScale(1);
            this.btnTom.setScale(1);
            this.btnCa.setScale(1);
            this.btnGa.setScale(1);
            this.btnHuou.setScale(1);

            this.numRunEffect = 15;
            this.spDiaBC.setVisible(false);
            this.spXucXacBC1.setVisible(false);
            this.spXucXacBC2.setVisible(false);
            this.spXucXacBC3.setVisible(false);
            this.aniXucXacBC.stopAllActions();
            this.aniXucXacBC.setVisible(false);
            this.spTileNhan.setVisible(false);
            this.sp_glow_nhan.setVisible(false);
            this.spTileNhanXX.setVisible(false);
            this.sp_glow_nhanXX.setVisible(false);

            //this.isBetDone = false;

            this.txtHuBau.setString("0");
            this.txtHuCua.setString("0");
            this.txtHuTom.setString("0");
            this.txtHuCa.setString("0");
            this.txtHuGa.setString("0");
            this.txtHuHuou.setString("0");

            this.txtMoneyPutBau.setString("0");
            this.txtMoneyPutCua.setString("0");
            this.txtMoneyPutTom.setString("0");
            this.txtMoneyPutCa.setString("0");
            this.txtMoneyPutGa.setString("0");
            this.txtMoneyPutHuou.setString("0");

            this.txtMoneyPutBau.setColor(this.colorBetDone);
            this.txtMoneyPutCua.setColor(this.colorBetDone);
            this.txtMoneyPutTom.setColor(this.colorBetDone);
            this.txtMoneyPutCa.setColor(this.colorBetDone);
            this.txtMoneyPutGa.setColor(this.colorBetDone);
            this.txtMoneyPutHuou.setColor(this.colorBetDone);


            this.btn_room1.setEnabled(true);
            this.btn_room2.setEnabled(true);
            this.btn_room3.setEnabled(true);
            this.btnChangeRoomBC.setEnabled(true);
            this.btnBau.setEnabled(true);
            this.btnCua.setEnabled(true);
            this.btnTom.setEnabled(true);
            this.btnCa.setEnabled(true);
            this.btnGa.setEnabled(true);
            this.btnHuou.setEnabled(true);

            this.btnGapThep.setEnabled(true);
            this.btnDatLai.setEnabled(true);
            this.btnXoa.setEnabled(true);
            this.btnXacNhan.setEnabled(true);

            for (var i = 0; i < 6; i++) {
                if (this.betValueDone["room" + i].betBau > 0 || this.betValueDone["room" + i].betCua > 0 || this.betValueDone["room" + i].betTom > 0 || this.betValueDone["room" + i].betCa > 0 || this.betValueDone["room" + i].betGa > 0 || this.betValueDone["room" + i].betHuou > 0) {
                    this.betValueOld["room" + i].betBau = this.betValueDone["room" + i].betBau;
                    this.betValueOld["room" + i].betCua = this.betValueDone["room" + i].betCua;
                    this.betValueOld["room" + i].betTom = this.betValueDone["room" + i].betTom;
                    this.betValueOld["room" + i].betCa = this.betValueDone["room" + i].betCa;
                    this.betValueOld["room" + i].betGa = this.betValueDone["room" + i].betGa;
                    this.betValueOld["room" + i].betHuou = this.betValueDone["room" + i].betHuou;
                }
                this.betValueDone["room" + i].betBau = 0;
                this.betValueDone["room" + i].betCua = 0;
                this.betValueDone["room" + i].betTom = 0;
                this.betValueDone["room" + i].betCa = 0;
                this.betValueDone["room" + i].betGa = 0;
                this.betValueDone["room" + i].betHuou = 0;

                this.betValue["room" + i].betBau = 0;
                this.betValue["room" + i].betCua = 0;
                this.betValue["room" + i].betTom = 0;
                this.betValue["room" + i].betCa = 0;
                this.betValue["room" + i].betGa = 0;
                this.betValue["room" + i].betHuou = 0;

                this.isBetDone["room" + i] = false;
            }
            this.reloadSoiCau1(this.arrLichSu);
            this.reloadSoiCau2(this.arrLichSu);
            //this.betValueDone = this.betValueNull;
            //this.betValue = this.betValueNull;

        },
        responseUpdate: function (potData, remainTime, bettingState) {
            this.bettingState = bettingState;
            this.remainTime = remainTime;
            if (bettingState) {
                if (remainTime > 5) {
                    this.txtTime.setColor(cc.color.WHITE);
                } else {
                    this.txtTime.setColor(cc.color.RED);
                }
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.inVisibleEffect();
            }
            else {
                this.txtTime.setColor(cc.color.YELLOW);
                if (remainTime > 9) {
                    this.txtTime.setString("00:" + remainTime);
                }
                else {
                    this.txtTime.setString("00:0" + remainTime);
                }
                this.btn_room1.setEnabled(false);
                this.btn_room2.setEnabled(false);
                this.btn_room3.setEnabled(false);
                this.btnChangeRoomBC.setEnabled(false);
                this.btnBau.setEnabled(false);
                this.btnCua.setEnabled(false);
                this.btnTom.setEnabled(false);
                this.btnCa.setEnabled(false);
                this.btnGa.setEnabled(false);
                this.btnHuou.setEnabled(false);

                this.btnGapThep.setEnabled(false);
                this.btnDatLai.setEnabled(false);
                this.btnXoa.setEnabled(false);
                this.btnXacNhan.setEnabled(false);
            }
            var potDatas = potData.split(",")
            if (potDatas.length > 5) {
                this.txtHuBau.setString(formatMoneyStr(potDatas[0]));
                this.txtHuCua.setString(formatMoneyStr(potDatas[1]));
                this.txtHuTom.setString(formatMoneyStr(potDatas[2]));
                this.txtHuCa.setString(formatMoneyStr(potDatas[3]));
                this.txtHuGa.setString(formatMoneyStr(potDatas[4]));
                this.txtHuHuou.setString(formatMoneyStr(potDatas[5]));
            }
        },
        responseResult: function (dice1, dice2, dice3, xPot, xValue) {
            this.result.dice1 = dice1;
            this.result.dice2 = dice2;
            this.result.dice3 = dice3;
            this.result.xPot = xPot;
            this.result.xValue = xValue;

            this.aniXucXacBC.setVisible(true);
            this.aniXucXacBC.runAction(cc.sequence(this.actionTungXXBC()));
            var obLs = {};
            obLs.xx1 = dice1;
            obLs.xx2 = dice2;
            obLs.xx3 = dice3;
            obLs.xPot = xPot;
            obLs.xValue = xValue;
            this.arrLichSu.push(obLs);
        },
        responsePrize: function (prize, currentMoney, room) {
            var moneyType = MONEY_VIN;

            if (room < 3) {
                moneyType = MONEY_VIN;
            }
            else {
                moneyType = MONEY_XU;
            }

            lobby.updateMoney(currentMoney, moneyType);
            var dvTien = "";
            var strKetQua = "";
            if (room == this.currentRoom) {
                if (room < 3) {
                    dvTien = " VIN";
                } else {
                    dvTien = " XU";
                }

                if (prize > 0) {

                    strKetQua = strKetQua + "+ " + formatMoney(0, 3, prize) + dvTien;
                    if (this.moneyTypeBC == MONEY_VIN) {
                        this.effectShowMoney(strKetQua, 1, colorMoneyVin);

                    } else {
                        this.effectShowMoney(strKetQua, 1, colorMoneyXu);
                    }

                }

            }

        },
        loadRoom: function (room, betData) {
            var betDatas = betData.split(",");
            this.currentRoom = room;
            this.indexMenhGia = 1;
            switch (room) {
                case 0:
                    this.betValueDone.room0.betBau = betDatas[0];
                    this.betValueDone.room0.betCua = betDatas[1];
                    this.betValueDone.room0.betTom = betDatas[2];
                    this.betValueDone.room0.betCa = betDatas[3];
                    this.betValueDone.room0.betGa = betDatas[4];
                    this.betValueDone.room0.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");
                    // "Minigame/TaiXiu/images/sp_xiu.png"
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");

                    this.menhGia = 1000;

                    this.btn_key1.setTitleText("1K");
                    this.btn_key2.setTitleText("5K");
                    this.btn_key3.setTitleText("10K");
                    this.btn_key4.setTitleText("50K");
                    this.btn_key5.setTitleText("100K");
                    break;
                case 1:
                    this.betValueDone.room1.betBau = betDatas[0];
                    this.betValueDone.room1.betCua = betDatas[1];
                    this.betValueDone.room1.betTom = betDatas[2];
                    this.betValueDone.room1.betCa = betDatas[3];
                    this.betValueDone.room1.betGa = betDatas[4];
                    this.betValueDone.room1.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");

                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 10000;

                    this.btn_key1.setTitleText("10K");
                    this.btn_key2.setTitleText("50K");
                    this.btn_key3.setTitleText("100K");
                    this.btn_key4.setTitleText("500K");
                    this.btn_key5.setTitleText("1M");
                    break;
                case 2:
                    this.betValueDone.room2.betBau = betDatas[0];
                    this.betValueDone.room2.betCua = betDatas[1];
                    this.betValueDone.room2.betTom = betDatas[2];
                    this.betValueDone.room2.betCa = betDatas[3];
                    this.betValueDone.room2.betGa = betDatas[4];
                    this.betValueDone.room2.betHuou = betDatas[5];
                    if (this.moneyTypeBC != MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choivin.png");
                    this.moneyTypeBC = MONEY_VIN;
                    this.btn_room1.setTitleText("1K");
                    this.btn_room2.setTitleText("10K");
                    this.btn_room3.setTitleText("100K");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/room_select.png");

                    this.menhGia = 100000;
                    this.btn_key1.setTitleText("100K");
                    this.btn_key2.setTitleText("500K");
                    this.btn_key3.setTitleText("1M");
                    this.btn_key4.setTitleText("5M");
                    this.btn_key5.setTitleText("10M");
                    break;
                case 3:
                    this.betValueDone.room3.betBau = betDatas[0];
                    this.betValueDone.room3.betCua = betDatas[1];
                    this.betValueDone.room3.betTom = betDatas[2];
                    this.betValueDone.room3.betCa = betDatas[3];
                    this.betValueDone.room3.betGa = betDatas[4];
                    this.betValueDone.room3.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 10000;

                    this.btn_key1.setTitleText("10K");
                    this.btn_key2.setTitleText("50K");
                    this.btn_key3.setTitleText("100K");
                    this.btn_key4.setTitleText("500K");
                    this.btn_key5.setTitleText("1M");
                    break;
                case 4:
                    this.betValueDone.room4.betBau = betDatas[0];
                    this.betValueDone.room4.betCua = betDatas[1];
                    this.betValueDone.room4.betTom = betDatas[2];
                    this.betValueDone.room4.betCa = betDatas[3];
                    this.betValueDone.room4.betGa = betDatas[4];
                    this.betValueDone.room4.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.menhGia = 100000;

                    this.btn_key1.setTitleText("100K");
                    this.btn_key2.setTitleText("500K");
                    this.btn_key3.setTitleText("1M");
                    this.btn_key4.setTitleText("5M");
                    this.btn_key5.setTitleText("10M");
                    break;
                case 5:
                    this.betValueDone.room5.betBau = betDatas[0];
                    this.betValueDone.room5.betCua = betDatas[1];
                    this.betValueDone.room5.betTom = betDatas[2];
                    this.betValueDone.room5.betCa = betDatas[3];
                    this.betValueDone.room5.betGa = betDatas[4];
                    this.betValueDone.room5.betHuou = betDatas[5];
                    if (this.moneyTypeBC == MONEY_VIN)
                        this.btnChangeRoomBC.loadTextureNormal("res/Minigame/ImageChung/choixu.png");
                    this.moneyTypeBC = MONEY_XU;
                    this.btn_room1.setTitleText("10K");
                    this.btn_room2.setTitleText("100K");
                    this.btn_room3.setTitleText("1M");
                    this.btn_room1.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room2.loadTextureNormal("res/Minigame/ImageChung/bg_room.png");
                    this.btn_room3.loadTextureNormal("res/Minigame/ImageChung/room_select.png");
                    this.menhGia = 1000000;

                    this.btn_key1.setTitleText("1M");
                    this.btn_key2.setTitleText("5M");
                    this.btn_key3.setTitleText("10M");
                    this.btn_key4.setTitleText("50M");
                    this.btn_key5.setTitleText("100M");
                    break;
            }


            if (this.moneyTypeBC == MONEY_VIN) {
                this.txtHuBau.setColor(this.colorPotVin);
                this.txtHuCua.setColor(this.colorPotVin);
                this.txtHuTom.setColor(this.colorPotVin);
                this.txtHuCa.setColor(this.colorPotVin);
                this.txtHuGa.setColor(this.colorPotVin);
                this.txtHuHuou.setColor(this.colorPotVin);
            } else {
                this.txtHuBau.setColor(this.colorPotXu);
                this.txtHuCua.setColor(this.colorPotXu);
                this.txtHuTom.setColor(this.colorPotXu);
                this.txtHuCa.setColor(this.colorPotXu);
                this.txtHuGa.setColor(this.colorPotXu);
                this.txtHuHuou.setColor(this.colorPotXu);
            }


            this.btn_room1.setEnabled(true);
            this.btn_room2.setEnabled(true);
            this.btn_room3.setEnabled(true);
            this.btnChangeRoomBC.setEnabled(true);
            this.nhayBtnKey(this.btn_key1);


        },
        actionTungXXBC: function () {
            baucua.spDiaBC.setVisible(true);
            baucua.aniXucXacBC.setVisible(true);
            baucua.spTileNhan.setVisible(false);
            baucua.sp_glow_nhan.setVisible(false);
            baucua.spTileNhanXX.setVisible(false);
            baucua.sp_glow_nhanXX.setVisible(false);
            baucua.spXucXacBC1.setVisible(false);
            baucua.spXucXacBC2.setVisible(false);
            baucua.spXucXacBC3.setVisible(false);

            //cc.spriteFrameCache.addSpriteFrames("res/Minigame/BauCua/animationXXBC.plist");
            //var bcTexture = cc.textureCache.addImage("res/Minigame/BauCua/animationXXBC.png");
            //baucua.addChild(bcImages);
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/BauCua/animationXXBC.plist");
            var animFrames = [];
            var str = "";
            for (var i = 0; i < 19; i++) {
                if (i <= 9) {
                    str = "Minigame/BauCua/AnimationXucXac/00" + i + ".png";
                } else {
                    str = "Minigame/BauCua/AnimationXucXac/0" + i + ".png";
                }
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.05, 1);
            var animate = new cc.Animate(animation);


            this.isDoneTungXX = false;
            baucua.runEffect();
            var seq = cc.sequence(animate, cc.callFunc(function () {
                baucua.isDoneTungXX = true;
                baucua.ShowResult();
            }));

            return seq;
        },
        ShowResult: function () {

            if (this.result.dice1 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice1 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice1 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice1 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice1 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice1 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC1.setVisible(true);
            baucua.spXucXacBC1.setTexture(baucua.linkImageXX);

            if (this.result.dice2 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice2 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice2 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice2 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice2 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice2 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC2.setVisible(true);
            baucua.spXucXacBC2.setTexture(baucua.linkImageXX);

            if (this.result.dice3 == 0) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_bau.png";
            else if (this.result.dice3 == 1) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_cua.png";
            else if (this.result.dice3 == 2) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_tom.png";
            else if (this.result.dice3 == 3) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ca.png";
            else if (this.result.dice3 == 4) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_ga.png";
            else if (this.result.dice3 == 5) baucua.linkImageXX = "res/Minigame/BauCua/Result/kq_huou.png";
            baucua.spXucXacBC3.setVisible(true);
            baucua.spXucXacBC3.setTexture(baucua.linkImageXX);


        },
        reloadChangeRoom: function (value) {

            if (value == 1) {
                baucua.txtroomBC1.setString("1K");
                baucua.txtroomBC2.setString("5K");
                baucua.txtroomBC3.setString("10K");
                baucua.txtroomBC4.setString("50K");
                baucua.txtroomBC5.setString("100K");
            } else if (value == 2) {
                baucua.txtroomBC1.setString("10K");
                baucua.txtroomBC2.setString("50K");
                baucua.txtroomBC3.setString("100K");
                baucua.txtroomBC4.setString("500K");
                baucua.txtroomBC5.setString("1M");
            } else {
                baucua.txtroomBC1.setString("100K");
                baucua.txtroomBC2.setString("500K");
                baucua.txtroomBC3.setString("1M");
                baucua.txtroomBC4.setString("5M");
                baucua.txtroomBC5.setString("10M");
            }
        },
        runEffect: function () {
            if (baucua.invisibleBC == "huou") {
                baucua.invisibleBC = "bau";
                baucua.InHuou.setVisible(true);
                baucua.InBau.setVisible(false);
            } else if (baucua.invisibleBC == "bau") {
                baucua.invisibleBC = "ga";
                baucua.InBau.setVisible(true);
                baucua.InGa.setVisible(false);
            } else if (baucua.invisibleBC == "ga") {
                baucua.invisibleBC = "tom";
                baucua.InGa.setVisible(true);
                baucua.InTom.setVisible(false);
            } else if (baucua.invisibleBC == "ca") {
                baucua.invisibleBC = "huou";
                baucua.InCa.setVisible(true);
                baucua.InHuou.setVisible(false);
            } else if (baucua.invisibleBC == "cua") {
                baucua.invisibleBC = "ca";
                baucua.InCua.setVisible(true);
                baucua.InCa.setVisible(false);
            } else if (baucua.invisibleBC == "tom") {
                baucua.invisibleBC = "cua";
                baucua.InTom.setVisible(true);
                baucua.InCua.setVisible(false);
            }
            if (!baucua.isDoneTungXX) {
                this.runAction(cc.sequence(cc.delayTime(0.05), cc.callFunc(baucua.runEffect, this)));
            }



            //return ac;
            //if (baucua.numRunEffect >= 0){
            //    this.runAction(cc.sequence(cc.delayTime(0.05),cc.callFunc(baucua.runEffect,this)));
            else {

                this.showDoneEff();
            }
        },
        showDoneEff: function () {

            this.visibleEffect();
            baucua.btnBau.stopAllActions();
            baucua.btnCua.stopAllActions();
            baucua.btnTom.stopAllActions();
            baucua.btnCa.stopAllActions();
            baucua.btnGa.stopAllActions();
            baucua.btnHuou.stopAllActions();
            baucua.btnXacNhan.setEnabled(true);
            if (this.result.dice1 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice1 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice1 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice1 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            if (this.result.dice2 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice2 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice2 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice2 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            if (this.result.dice3 == 0) {

                baucua.InBau.setVisible(false);
                baucua.btnBau.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 1) {
                baucua.InCua.setVisible(false);
                baucua.btnCua.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 2) {
                baucua.InTom.setVisible(false);
                baucua.btnTom.runAction(cc.repeatForever(this.nhayBtnItem()));
            }

            else if (this.result.dice3 == 3) {
                baucua.InCa.setVisible(false);
                baucua.btnCa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice3 == 4) {
                baucua.InGa.setVisible(false);
                baucua.btnGa.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            else if (this.result.dice3 == 5) {
                baucua.InHuou.setVisible(false);
                baucua.btnHuou.runAction(cc.repeatForever(this.nhayBtnItem()));
            }
            this.checkXPot();
        },

        checkXPot: function () {


            var arrXX = [this.result.dice1, this.result.dice2, this.result.dice3];
            var nhan = this.nhan(arrXX);
            for (var i = 0; i < nhan.length; i++) {
                if (nhan[i].nhan1 > 1) {
                    this.spTileNhanXX.setVisible(true);
                    this.sp_glow_nhanXX.setVisible(true);
                    this.spTileNhanXX.setTexture("res/Minigame/BauCua/x" + nhan[i].nhan1 + ".png");
                    this.sp_glow_nhanXX.setPosition(this.getPositionNhan(i))
                    this.spTileNhanXX.setPosition(this.getPositionNhan(i));
                }

                if (nhan[i].nhan2 > 2) {
                    this.spTileNhan.setVisible(true);
                    this.sp_glow_nhan.setVisible(true);
                    this.spTileNhan.setTexture("res/Minigame/BauCua/x" + nhan[i].nhan2 + ".png");
                    this.sp_glow_nhan.setPosition(this.getPositionNhan(i))
                    this.spTileNhan.setPosition(this.getPositionNhan(i));
                }

            }

        },
        showNhan: function () {
            if (this.result.xValue >= 2) {
                this.spTileNhan.setTexture("res/Minigame/BauCua/x" + this.result.xValue + ".png");
                this.spTileNhan.setPosition(this.getPositionNhan(this.result.xPot));
                this.sp_glow_nhan.setPosition(this.getPositionNhan(this.result.xPot));

            }
            else {
                this.spTileNhan.setVisible(false);
                this.sp_glow_nhan.setVisible(false);

            }
        },
        getPositionNhan: function (pot) {
            if (pot == 0) return this.btnBau.getPosition();
            else if (pot == 1) return this.btnCua.getPosition();
            else if (pot == 2) return this.btnTom.getPosition();
            else if (pot == 3) return this.btnCa.getPosition();
            else if (pot == 4) return this.btnGa.getPosition();
            else return this.btnHuou.getPosition();
        },
        nhayBtnItem: function () {
            var moveB = cc.scaleBy(0.3, 0.8);
            var actionByBack = moveB.reverse();
            var se = cc.sequence(moveB, actionByBack);
            return se;
        },
        visibleEffect: function () {
            baucua.InBau.setVisible(true);
            baucua.InCua.setVisible(true);
            baucua.InTom.setVisible(true);
            baucua.InCa.setVisible(true);
            baucua.InGa.setVisible(true);
            baucua.InHuou.setVisible(true);
        },
        inVisibleEffect: function () {
            baucua.InBau.setVisible(false);
            baucua.InCua.setVisible(false);
            baucua.InTom.setVisible(false);
            baucua.InCa.setVisible(false);
            baucua.InGa.setVisible(false);
            baucua.InHuou.setVisible(false);
        },
        resetVitriRoom: function () {
            baucua.pnroomBC1.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC2.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC3.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC4.setPositionX(baucua.vtBtnRoom);
            baucua.pnroomBC5.setPositionX(baucua.vtBtnRoom);
        },

        sendChangeRoom: function (currentRoom, joinRoom) {
            var bcSend = new BCSendChangeRoom();
            bcSend.putChangeRoom(currentRoom, joinRoom);
            Minigame.miniGameClient.send(bcSend);
            bcSend.clean();
        },
        sendBet: function () {
            if (this.betValue["room" + this.currentRoom].betBau > 0 || this.betValue["room" + this.currentRoom].betCua > 0 || this.betValue["room" + this.currentRoom].betTom > 0 || this.betValue["room" + this.currentRoom].betCa > 0 || this.betValue["room" + this.currentRoom].betGa > 0 || this.betValue["room" + this.currentRoom].betHuou > 0) {
                var betData = this.betValue["room" + this.currentRoom].betBau.toString() + "," + this.betValue["room" + this.currentRoom].betCua.toString() + "," + this.betValue["room" + this.currentRoom].betTom.toString() + "," + this.betValue["room" + this.currentRoom].betCa.toString() + "," + this.betValue["room" + this.currentRoom].betGa.toString() + "," + this.betValue["room" + this.currentRoom].betHuou.toString();
                //cc.log(betData);
                var bcSend = new BCSendBet();
                bcSend.putBet(betData);
                Minigame.miniGameClient.send(bcSend);
                bcSend.clean();
            } else {
                this.toastBauCua("Bạn chưa đăt cửa", 3);
            }


        },
        reloadSoiCau2: function (arr) {
            var bau = 0;
            var cua = 0;
            var tom = 0;
            var ca = 0;
            var ga = 0;
            var huou = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].xx1 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx1 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx1 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx1 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx1 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx1 == codeBauCua.HUOU) {
                    huou++;
                }

                if (arr[i].xx2 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx2 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx2 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx2 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx2 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx2 == codeBauCua.HUOU) {
                    huou++;
                }

                if (arr[i].xx3 == codeBauCua.BAU) {
                    bau++;
                } else if (arr[i].xx3 == codeBauCua.CUA) {
                    cua++;
                } else if (arr[i].xx3 == codeBauCua.TOM) {
                    tom++;
                } else if (arr[i].xx3 == codeBauCua.CA) {
                    ca++;
                } else if (arr[i].xx3 == codeBauCua.GA) {
                    ga++;
                } else if (arr[i].xx3 == codeBauCua.HUOU) {
                    huou++;
                }
            }
            this.lb_soi_cau_bau.setString(bau);
            this.lb_soi_cau_cua.setString(cua);
            this.lb_soi_cau_tom.setString(tom);
            this.lb_soi_cau_ca.setString(ca);
            this.lb_soi_cau_ga.setString(ga);
            this.lb_soi_cau_huou.setString(huou);

        },
        reloadSoiCau1: function (arr) {
            this.lv_soi_cau.removeAllItems();
            var startX = 44;
            var startY = 27;
            var khoangCach = 60;
            var chieuCao = 46;

            for (var i = arr.length - 1; i >= 0; i--) {
                var cellList = new ccui.Layout();
                cellList.height = chieuCao;
                cellList.width = this.lv_soi_cau.width;

                var spNen1;// = new cc.Sprite();
                if (arr[i].xx1 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen1 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen1 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen1 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen1 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen1.setPosition(startX, startY);
                var spItem1 = new cc.Sprite("res/Minigame/BauCua/SoiCau/" + arr[i].xx1 + ".png");
                spItem1.setPosition(startX, startY);


                var spNen2;// = new cc.Sprite();
                if (arr[i].xx2 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen2 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen2 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen2 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen2 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen2.setPosition(startX + khoangCach, startY);
                var spItem2 = new cc.Sprite("res/Minigame/BauCua/SoiCau/" + arr[i].xx2 + ".png");
                spItem2.setPosition(startX + khoangCach, startY);

                var spNen3;// = new cc.Sprite();
                if (arr[i].xx3 == arr[i].xPot && arr[i].xValue > 1) {
                    if (arr[i].xValue == 2) {
                        spNen3 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x2.png");
                    } else if (arr[i].xValue == 3) {
                        spNen3 = new cc.Sprite("res/Minigame/BauCua/SoiCau/x3.png");
                    }
                } else {
                    if (i == (arr.length - 1))
                        spNen3 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_vua_ve.png");
                    else
                        spNen3 = new cc.Sprite("res/Minigame/BauCua/SoiCau/cau_da_ve.png");
                }
                spNen3.setPosition(startX + 2 * khoangCach, startY);
                var spItem3 = new cc.Sprite("res/Minigame/BauCua/SoiCau/" + arr[i].xx3 + ".png");
                spItem3.setPosition(startX + 2 * khoangCach, startY);

                cellList.addChild(spNen1);
                cellList.addChild(spNen2);
                cellList.addChild(spNen3);
                cellList.addChild(spItem1);
                cellList.addChild(spItem2);
                cellList.addChild(spItem3);

                this.lv_soi_cau.pushBackCustomItem(cellList);

            }
        },
        nhan: function (dices) {
            var tiLe = new Array(6);
            for (var i = 0; i < 6; i++) {
                var objTile = {nhan1: 0, nhan2: 0};
                objTile.nhan1 = 0;
                for (var j = 0; j < dices.length; j++) {
                    if (i == dices[j]) {
                        objTile.nhan1++;
                    }
                }
                if (objTile.nhan1 > 0 && i == this.result.xPot) {
                    objTile.nhan2 = objTile.nhan1 * this.result.xValue;
                }
                tiLe[i] = objTile;
            }
            if (tiLe[this.result.xPot].nhan1 == 0) {
                tiLe[this.result.xPot].nhan2 = this.result.xValue;
            }
            return tiLe;
        }


        ,
        effectShowMoney: function (message, timeShow, colorLB) {
            var wbg = this.pBauCua.getContentSize().width;
            var hbg = this.pBauCua.getContentSize().height;
            if (this.pBauCua.getChildByTag(9999) != null) {
                // this.bg_tai_xiu.getChildByName("moneyShow123").removeAllChildren(true);
                this.pBauCua.removeChildByTag(9999, true);

            }
            var lb = new cc.LabelTTF(message, fontRobotoBlack.fontName, 32);
            lb.setName("moneyShow123");
            lb.setTag(9999);
            lb.setString(message);
            lb.setPosition(cc.p(wbg / 2, hbg / 2 + 70));
            this.pBauCua.addChild(lb);

            if (colorLB != null) {
                lb.color = colorLB;
            } else {
                lb.color = cc.color(255, 255, 255);
            }
            var fadeOut = cc.fadeOut(3);
            var fadeIn = cc.fadeIn(0.25);
            var mo = cc.moveBy(3, cc.p(0, 120));
            var sp = cc.spawn(fadeOut, mo);
            var seq = cc.sequence(fadeIn, cc.delayTime(timeShow), sp);
            lb.runAction(seq);
        },

        toastBauCua: function (message, timeShow, colorLable) {
            var wbg = baucua.pBauCua.getContentSize().width;
            if (this.getChildByTag(999) != null) {
                this.getChildByTag(999).removeAllChildren(true);
                baucua.pBauCua.removeChildByTag(999, true);
            }
            //var layer = new cc.LayerColor(cc.color(245, 170, 8));
            var layer = new cc.Sprite("res/Minigame/ImageChung/bg_mo.png");
            layer.setOpacity(90);

            layer.setName("tostTaiXiu");


            layer.setTag(999);

            var label1 = new cc.LabelTTF(message, "Arial", 28);
            layer.addChild(label1);
            var w = layer.getContentSize().width;
            //layer.setContentSize(cc.size(w + 10,40))
            layer.setPosition(wbg / 2, 40);
            if (colorLable != null) {
                label1.color = colorLable;
            } else {
                label1.color = cc.color(255, 255, 255);
            }
            //label1.color = cc.color(241, 224, 99);
            label1.x = w / 2;
            label1.y = 20;
            //label1.opacity = 0;
            var fadeOut = cc.fadeOut(2);
            var fadeIn = cc.fadeIn(0.5);
            var seq = cc.sequence(fadeIn, cc.delayTime(timeShow), fadeOut, cc.callFunc(function () {
                // label1.setVisible(false);
            }));

            baucua.pBauCua.addChild(layer, 999);
            //var forever = seq.repeatForever();
            layer.runAction(seq);
            label1.runAction(seq.clone());


        }

    }
)


subscribeBauCua = function () {
    var bcSend = new BCSendSubscribe();
    if (baucua == null) {
        bcSend.putSubScribe(0);
    } else {
        bcSend.putSubScribe(baucua.currentRoom);
    }
    Minigame.miniGameClient.send(bcSend);
    bcSend.clean();
}

unsubscribeBauCua = function () {
    var bcSend = new BCSendUnscribe();
    bcSend.putUnsubScribe(baucua.currentRoom);
    Minigame.miniGameClient.send(bcSend);
    bcSend.clean();
},

    openBauCua = function () {

        if (baucua === null) {

            cc.log("----> openBauCua");
            baucua = new codeBauCua();
            baucuaX = baucua.getPosition().x;
            baucuaY = baucua.getPosition().y;
            var curScene = SceneMgr.getInstance().getRunningScene();
            curScene.addGUI(baucua, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_BAU_CUA);

        } else {
            baucua.setVisible(true);
            cc.eventManager.resumeTarget(baucua.pBauCua, true);
            baucua.reOpenLayer(baucua.pBauCua);
        }
        subscribeBauCua();
        baucuaAppear = true;
    };
closeBauCua = function () {
    if (baucua === null) {
        cc.log(" Bau cua Null");
        return;
    }
    if (baucuaAppear) {
        baucua.closeLayer(baucua.pBauCua);
        baucua.setVisible(false);
        if (menutab.Islogout == false) {
            unsubscribeBauCua();
        }
        baucuaAppear = false;
        cc.eventManager.pauseTarget(baucua.pBauCua, true);

        if (bcTopUser != null) {
            closeBCTopUser();
        }
        if (bcLSGD != null) {
            closebcLSGD();
        }
        if (bcHuongDan != null) {
            closebcHuongDan();
        }
        if (bcToiChonCa != null) {
            closeBCToiChonCa();
        }


    }
};
