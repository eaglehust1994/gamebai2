/**
 * Created by Admin on 3/10/2017.
 */
VPItemSlots = ccui.Button.extend({

    _spComingSoon: null,
    _size: null,
    _spStatus: null,
    _lbPrize:null,
    _lbPotRoom1:null,
    _lbPotRoom2:null,
    _lbPotRoom3:null,
    _spX2PotRoom1:null,
    _spX2PotRoom2:null,
    _spX2PotRoom3:null,

    _LayerThangLon:null,
    _layerNoHu:null,
    _spGrowThangLon:null,
    _spGrowNoHu:null,
    _spBgTextThangLon:null,
    _spBgTextNoHu:null,
    _lbPrizeThangLon:null,
    _lbPrizeNoHu:null,
    _isX2Pot1:false,
    _isX2Pot2:false,
    _isX2Pot3:false,
    _isPlay:false,
    _valuePot1:0,
    _valuePot2:5000000,
    _valuePot3:50000000,
    _totalValuePot1:0,
    _totalValuePot2:0,
    _totalValuePot3:0,
    _gameName:"",
    _nameSocket:"",
    _openGame:null,
    _result:{
        result:0,
        prize:0,
        currentMoney:0
    },
    _btnDungQuay:null,
    _audio:null,
    _sumPot: 3,
    _isComingSoon: false,
    _isWaitingDownLoad: false,
    _am:null,
    _manifestPath:null,
    _toragePath:null,
    _ShowDownload:null,


    ctor:function(bgImage,isComingSoon,size)
    {
        this._size = size;
        this._isComingSoon = isComingSoon;
        var fontNamePot = fontRobotoMedium.fontName;
        var fontNamePrize = fontRobotoMedium.fontName;
        var fontSize = 20;
        this._capInsetsNormal = cc.rect(0, 0, 0, 0);
        this._capInsetsPressed = cc.rect(0, 0, 0, 0);
        this._capInsetsDisabled = cc.rect(0, 0, 0, 0);
        this._normalTextureSize = cc.size(0, 0);
        this._pressedTextureSize = cc.size(0, 0);
        this._disabledTextureSize = cc.size(0, 0);
        ccui.Button.prototype.ctor.call(this);
        if(bgImage)
        {
            this.loadTextures(bgImage, bgImage,bgImage);
        }
        if(isComingSoon)
        {
            this._spStatus = new cc.Sprite("res/MenuSlots/coming_soon.png");
            this._spStatus.setPosition(cc.p(size.width/2,size.height-10));
            this.addChild(this._spStatus);
        }else
        {
            this._spStatus = new cc.Sprite("res/MenuSlots/dung_quay.png");
            this._spStatus.setPosition(cc.p(size.width/2,size.height-10));
            this.addChild(this._spStatus);

            this._lbPrize = new ccui.Text('',  fontNamePrize, 36);
            this._lbPrize.setPosition(cc.p(size.width/2, size.height/2));
            this._lbPrize.setColor(colorMoneyVin);
            this.addChild(this._lbPrize);
            this._lbPrize.enableShadow(cc.color(110,110,110), cc.size(2,2), 1);

            this._lbPotRoom1 = new ccui.Text('500.000',  fontNamePot, fontSize);
            this._lbPotRoom1.setPosition(cc.p(size.width/2, size.height/2-95));
            this._lbPotRoom1.setColor(cc.color.YELLOW);
            this.addChild(this._lbPotRoom1);
            this._lbPotRoom2 = new ccui.Text('5.000.000',  fontNamePot, fontSize);
            this._lbPotRoom2.setPosition(cc.p(size.width/2, size.height/2-128));
            this._lbPotRoom2.setColor(cc.color.YELLOW);
            this.addChild(this._lbPotRoom2);
            this._lbPotRoom3 = new ccui.Text('50.000.000',  fontNamePot, fontSize);
            this._lbPotRoom3.setPosition(cc.p(size.width/2, size.height/2-161));
            this._lbPotRoom3.setColor(cc.color.YELLOW);
            this.addChild(this._lbPotRoom3);


            this._spX2PotRoom1 = new cc.Sprite("res/MenuSlots/X2.png");
            this._spX2PotRoom1.setPosition(cc.p(size.width/2 - 92,size.height/2 - 95));
            this.addChild(this._spX2PotRoom1);

            this._spX2PotRoom2 = new cc.Sprite("res/MenuSlots/X2.png");
            this._spX2PotRoom2.setPosition(cc.p(size.width/2 - 92,size.height/2 - 128));
            this.addChild(this._spX2PotRoom2);

            this._spX2PotRoom3 = new cc.Sprite("res/MenuSlots/X2.png");
            this._spX2PotRoom3.setPosition(cc.p(size.width/2 - 92,size.height/2 - 161));
            this.addChild(this._spX2PotRoom3);

            this._btnDungQuay = new ccui.Button();
            this._btnDungQuay.loadTextures("res/MenuSlots/dung_nor.png","res/MenuSlots/dung_click.png","res/MenuSlots/dung_click.png");
            this._btnDungQuay.setPosition(cc.p(size.width/2,size.height-50));
            this._btnDungQuay.addTouchEventListener(this.onTouchDungQuay, this);
            //this._btnDungQuay.setTitleText("Dừng quay");
            this._btnDungQuay.setVisible(false);
            this.addChild(this._btnDungQuay);
            this._spX2PotRoom1.setVisible(false);
            this._spX2PotRoom2.setVisible(false);
            this._spX2PotRoom3.setVisible(false);

            this.initThangLon();
            this.initNoHu();
            if(cc.sys.isNative)
                this.initLayerDownload();
        }


    },
    initLayerDownload:function()
    {
        this.addLayout(this,"_ShowDownload",cc.p(this._size.width/2,this._size.height/2),null,cc.size(100,100),false);
        this._ShowDownload.setName("ShowDownload");
        this._ShowDownload.setTag(999);
        this._ShowDownload.setVisible(false);
        this.addText(this._ShowDownload,"lb_download",cc.p(50,50),"Download",fontRobotoBold.fontName,24);
        this.lb_download.setName("lb_ShowDownload");


        var sprite = new cc.Sprite("res/common/avatar/Vong_Vang.png");
        var uiTimer = new cc.ProgressTimer(sprite);
        uiTimer.setType(cc.ProgressTimer.TYPE_RADIAL);
        uiTimer.setReverseDirection(true);
        //var this._size = this.btn_tai_xiu.getContentSize();
        uiTimer.setPosition(this._size.width/2,this._size.height/2);
        uiTimer.setPercentage(0);
        this.addChild(uiTimer);
        //uiTimer.setScale(0.7);
        uiTimer.setTag(1000);
        uiTimer.setVisible(false);
    },
    checkDownLoad:function(manifestPath,toragePath)
    {
        //this._
        this._am = new jsb.AssetsManager(manifestPath,jsb.fileUtils.getWritablePath()+toragePath);
        this._am.retain();
        checkUpdateManifest(this._am,this);
    },
    downloadGamne: function()
    {


        if(this._isWaitingDownLoad)
            return;
        this._isWaitingDownLoad = true;
        this.getChildByTag(1000).setVisible(true);
        updateManifest(this._am,this.getChildByTag(1000),function(){
            this.getChildByTag(1000).setVisible(false);
            this.getChildByTag(999).setVisible(false);
            this._isWaitingDownLoad = false;
        }.bind(this),function(msg){
            this.getChildByTag(1000).setVisible(false);
            popup.openPanel_Alert_Lobby("Lỗi : " + msg);
            this._isWaitingDownLoad = false;
        }.bind(this),this)

    },
    getComingSoon:function()
    {
        return this._isComingSoon;
    },
    setAudio:function(audio)
    {
        this._audio = audio;
    },
    onTouchDungQuay:function(sender, type)
    {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.dungQuay();
                lobby.socketSlot.sendSubScribe();
                sender.setVisible(false);

                break;
        }
    },
    dungQuay:function()
    {
        if(this.getGameName() == "khobau")
        {
            khoBauUnsubscribe(Slots.Content.currentRoom);
        }else
        if(this.getGameName() == "nudiepvien")
        {
            nuDiepVienUnsubscribe(NuDiepVien.Content.currentRoom);
        }else
        if(this.getGameName() == "sieuanhhung")
        {
            avengerUnsubscribe(Avenger.Content.currentRoom);
        }else if(this.getGameName() == "vuongquocvin")
        {
            vuongQuocVinUnsubscribe(VuongQuocVin.Content.currentRoom)
        }
        else
        {
            popup.openPanel_Alert_Lobby("Game sắp ra mắt.");
        }
        //else
    },
    setGameName:function(gameName)
    {
        this._gameName = gameName;
    },
    getGameName:function()
    {
        return this._gameName;
    },
    setNameSocket:function(nameSocket)
    {
        this._nameSocket = nameSocket;
    },
    getNameSocket:function()
    {
        return this._nameSocket;
    },
    setOpenGame:function(openGame)
    {
        this._openGame = openGame;
    },
    openGame:function()
    {
        if(this.getGameName() == "khobau")
        {
            loadResoureGame(g_resources_slots_kho_bau,slotKhoBau,function(){
                if(!slotKhoBauAppear) {
                    openSlotKhoBau();
                }
               });

        }else
        if(this.getGameName() == "nudiepvien")
        {
            loadResoureGame(g_resources_nu_diep_vien,nuDiepVien,function(){
                if(!nuDiepVienAppear) {
                    openNuDiepVien();
                }
            });
        }else
        if(this.getGameName() == "sieuanhhung")
        {
            loadResoureGame(g_resources_avenger,avenger,function(){
                if(!avengerAppear) {
                    openAvenger();
                }
            });
        }else
        {
            //popup.openPanel_Alert_Lobby("Game sắp ra mắt.");
            openVuongQuocVin();
        }
    },
    getSlotsGame:function()
    {
        if(this.getGameName() == "khobau")
        {
            return slotKhoBau;
        }
        if(this.getGameName() == "nudiepvien")
        {
            return nuDiepVien;
        }
        if(this.getGameName() == "sieuanhhung")
        {
            return avenger;
        }
        if(this.getGameName() == "vuongquocvin")
        {
            return vuongQuocVin;
        }
        return null;
    },
    setStatusPlay:function(isPlay)
    {
        if(this._isPlay == isPlay)
        {
            return;
        }
        this._isPlay = isPlay;
        if(this._isPlay)
        {
            this._btnDungQuay.setVisible(true);
            this._spStatus.setTexture("res/MenuSlots/dang_quay_01.png");
            var that = this;
            this._spStatus.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
                this._spStatus.setTexture("res/MenuSlots/dang_quay_02.png");
            }.bind(this)),cc.delayTime(0.3),cc.callFunc(function(){
                this._spStatus.setTexture("res/MenuSlots/dang_quay_01.png");
            }.bind(this)))));
        }else
        {
            this._btnDungQuay.setVisible(false);
            this._spStatus.stopAllActions();
            this._spStatus.setTexture("res/MenuSlots/dung_quay.png");
        }
    },
    getStatusPlay:function()
    {
        return this._isPlay;
    },
    initThangLon:function()
    {
        var sizeBg = cc.size(207,194);
        this._LayerThangLon = new cc.Sprite("res/MenuSlots/hieu_ung/shadow_hu_thang_lon.png");
        this._LayerThangLon.setPosition(cc.p(this._size.width/2,this._size.height/2));
        this.addChild(this._LayerThangLon);
        var sao = new cc.Sprite("res/MenuSlots/hieu_ung/thang_lon/sao.png");
        sao.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._LayerThangLon.addChild(sao);
        this._spGrowThangLon = new cc.Sprite("res/MenuSlots/hieu_ung/thang_lon/glow.png");
        this._spGrowThangLon.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._LayerThangLon.addChild(this._spGrowThangLon);
        this._spBgTextThangLon = new cc.Sprite("res/MenuSlots/hieu_ung/thang_lon/background.png");
        this._spBgTextThangLon.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._LayerThangLon.addChild(this._spBgTextThangLon);
        this._spTextThangLon = new cc.Sprite("res/MenuSlots/hieu_ung/thang_lon/thang_lon.png");
        this._spTextThangLon.setPosition(cc.p(sizeBg.width/2,80));
        this._LayerThangLon.addChild(this._spTextThangLon);
        this._lbPrizeThangLon = new ccui.Text('',  RobotoRegular.fontName, 24);
        this._lbPrizeThangLon.setPosition(cc.p(sizeBg.width/2,34));
        this._lbPrizeThangLon.setColor(cc.color.YELLOW);
        //this._lbPrizeThangLon.enableOutline(cc.color.RED, cc.size(1,1));//(cc.color.RED,cc.size(1,1));
        this._LayerThangLon.addChild(this._lbPrizeThangLon);
        this._LayerThangLon.setVisible(false);
        //this.showThangLon(23456789);
    },
    initNoHu:function()
    {
        var sizeBg = cc.size(207,194);
        this._layerNoHu = new cc.Sprite("res/MenuSlots/hieu_ung/shadow_hu_thang_lon.png");
        this._layerNoHu.setPosition(cc.p(this._size.width/2,this._size.height/2));
        this.addChild(this._layerNoHu);
        var sao = new cc.Sprite("res/MenuSlots/hieu_ung/no_hu/sao.png");
        sao.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._layerNoHu.addChild(sao);

        this._spGrowNoHu = new cc.Sprite("res/MenuSlots/hieu_ung/no_hu/glow.png");
        this._spGrowNoHu.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._layerNoHu.addChild(this._spGrowNoHu);
        this._spBgTextNoHu = new cc.Sprite("res/MenuSlots/hieu_ung/no_hu/background.png");
        this._spBgTextNoHu.setPosition(cc.p(sizeBg.width/2,sizeBg.height/2));
        this._layerNoHu.addChild(this._spBgTextNoHu);
        this._spTextNoHu = new cc.Sprite("res/MenuSlots/hieu_ung/no_hu/no_hu.png");
        this._spTextNoHu.setPosition(cc.p(sizeBg.width/2,89));
        this._layerNoHu.addChild(this._spTextNoHu);

        this._lbPrizeNoHu = new ccui.Text('',  RobotoRegular.fontName, 24);
        this._lbPrizeNoHu.setPosition(cc.p(sizeBg.width/2,43));
        this._lbPrizeNoHu.setColor(cc.color.YELLOW);
        this._layerNoHu.addChild(this._lbPrizeNoHu);
        this._layerNoHu.setVisible(false);
        //this.showNoHu(23456789);
    }
    ,
    showThangLon:function(prize)
    {
        this._lbPrizeThangLon.setString(formatMoney(0,3,prize));
        this._LayerThangLon.setVisible(true);
        this._spGrowThangLon.runAction(cc.repeatForever(cc.rotateBy(2,360)));
        this._spTextThangLon.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1))));
    },
    showNoHu:function(prize)
    {
        this._lbPrizeNoHu.setString(formatMoney(0,3,prize));
        this._layerNoHu.setVisible(true);
        this._spGrowNoHu.runAction(cc.repeatForever(cc.rotateBy(2,360)));
        this._spTextNoHu.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5,0.9),cc.scaleTo(0.5,1))));
    },
    stopThangLon:function()
    {
        this._spTextThangLon.stopAllActions();
        this._spGrowThangLon.stopAllActions();
        this._LayerThangLon.setVisible(false);
    },
    stopNohu:function()
    {
        this._spTextNoHu.stopAllActions();
        this._spGrowNoHu.stopAllActions();
        this._layerNoHu.setVisible(false);
    },
    flyMoneyPrize:function(prize)
    {
        if(isNaN(prize))
        {
            this._lbPrize.setString(prize);
            this._lbPrize.setFontSize(20);
            this._lbPrize.setColor(cc.color.WHITE);
        }else
        {
            this._lbPrize.setString("+"+formatMoney(0,3,prize));
            this._lbPrize.setFontSize(36);
            this._lbPrize.setColor(colorMoneyVin);
        }

        this._lbPrize.stopAllActions();
        this._lbPrize.setPosition(cc.p(this._size.width/2,this._size.height/2));
        this._lbPrize.setOpacity(0);
        var fadeOut = cc.fadeOut(3);
        var fadeIn = cc.fadeIn(0.25);
        var mo = cc.moveBy(3,cc.p(0,120));
        var sp = cc.spawn(fadeOut,mo);
        var seq = cc.sequence(fadeIn,cc.delayTime(1), sp);
        this._lbPrize.runAction(seq);
    },
    updateResult:function(result,prize,currentMoney)
    {
        if(this.getSlotsGame() && this.getSlotsGame().isWaitingRotate)
        {
            this.getSlotsGame().isWaitingRotate = false;
        }
        this._result.result = result;
        this._result.prize = prize;
        this._result.currentMoney = currentMoney;

        this.stopNohu();
        this.stopThangLon();
        var msg = "";

        if(result == 100||result == 101||result == 103)
        {
            this.setStatusPlay(false);
            this.dungQuay();
            return;

        }
        if(result == 102)
        {
            this.setStatusPlay(false);
            this.flyMoneyPrize("Bạn không đủ tiền");
            this.dungQuay();
            return;
        }

        if(this._result.result == 2)
        {
            this.showThangLon(prize);

            this._audio.soundEffect(this._audio.thangLon);
        }else
        if(this._result.result == 3)
        {
            this._audio.soundEffect(this._audio.noHu);
            this.showNoHu(prize);
            this.setStatusPlay(false);

        }else
        {
            //this.showThangLon(prize);
            this._audio.soundEffect(this._audio.giaiThuong);
            this.flyMoneyPrize(prize);
        }
        lobby.updateMoney(currentMoney,MONEY_VIN);
    },
    updateStatusInGame:function()
    {

    },
    updatePot:function(pots)
    {
        if(!this._lbPotRoom1)
        {
            cc.log("loi o game " + this.getGameName());
        }
        this._lbPotRoom1.unscheduleAllCallbacks();
        this._lbPotRoom2.unscheduleAllCallbacks();
        this._lbPotRoom3.unscheduleAllCallbacks();
        this._lbPotRoom1.setString(formatMoney(0,3,this._totalValuePot1));
        this._lbPotRoom2.setString(formatMoney(0,3,this._totalValuePot2));
        this._lbPotRoom3.setString(formatMoney(0,3,this._totalValuePot3));
        this._valuePot1 = this._totalValuePot1;
        this._valuePot2 = this._totalValuePot2;
        this._valuePot3 = this._totalValuePot3;

        var pot1 = -1;
        var pot2 = -1;
        var pot3 = -1;
        var x2Pot1 = null;
        var x2Pot2 = null;
        var x2Pot3 = null;
        //if(this.getGameName() == "khobau" ||this.getGameName() == "nudiepvien" )
        //    return;
        //cc.log(this.getGameName());
        if(pots == null || pots == "" || pots == [] || pots == undefined)
        {
            return;
        }
        else
        {
            if(pots["100"])
            {
                pot1 = parseInt(pots["100"].p);
                x2Pot1 = Boolean(parseInt(pots["100"].x2));
            }
            if(pots["1000"])
            {
                pot2 = parseInt(pots["1000"].p);
                x2Pot2 = Boolean(parseInt(pots["1000"].x2));
            }
            if(pots["10000"])
            {
                pot3 = parseInt(pots["10000"].p);
                x2Pot3 = Boolean(parseInt(pots["10000"].x2));
            }

        }

        this._totalValuePot1 = pot1;
        this._totalValuePot2 = pot2;
        this._totalValuePot3 = pot3;
        if(this._valuePot1 == 0)
        {
            if(pot1 != -1)
            {
                this._lbPotRoom1.setString(formatMoney(0,3,pot1));
                this._valuePot1 = pot1;
            }
            if(pot2 != -1)
            {
                this._lbPotRoom2.setString(formatMoney(0,3,pot2));
                this._valuePot2 = pot2;
            }

            if(pot3 != -1)
            {
                this._lbPotRoom3.setString(formatMoney(0,3,pot3));
                this._valuePot3 = pot3;
            }

            return;
        }
        if(pot1 <= this._valuePot1 && pot1 != -1)
        {
            this._lbPotRoom1.setString(formatMoney(0,3,pot1));
        }
        else
        {
            var delayT = 1*this._sumPot/60;
            if(this._totalValuePot1 - this._valuePot1 > 240/this._sumPot)
            {
                delayT = 1*this._sumPot/60;
            }else{
                delayT = 4*this._sumPot/(this._totalValuePot1 - this._valuePot1);
            }
            this._lbPotRoom1.schedule(this.runPot1.bind(this),delayT);
            //effectRunMoneyMenu(this._lbPotRoom1,this._valuePot1,pot1,0,true);
        }

        if(pot2 <= this._valuePot2 && pot2 != -1)
        {
            this._lbPotRoom2.setString(formatMoney(0,3,pot2));
        }
        else
        {
            var delayT = 1*this._sumPot/60;
            if(this._totalValuePot2 - this._valuePot2 > 240/this._sumPot)
            {
                delayT = 1*this._sumPot/60;
            }else{
                delayT = 4*this._sumPot/(this._totalValuePot2 - this._valuePot2);
            }
            this._lbPotRoom2.schedule(this.runPot2.bind(this),delayT);
        }
            //effectRunMoneyMenu(this._lbPotRoom2,this._valuePot2,pot2,0,true);
        if(pot3 <= this._valuePot3 && pot3 != -1)
        {
            this._lbPotRoom3.setString(formatMoney(0,3,pot3));
        }
        else
        {
            var delayT = 1*this._sumPot/60;
            if(this._totalValuePot3 - this._valuePot3 > 240/this._sumPot)
            {
                delayT = 1*this._sumPot/60;
            }else{
                delayT = 4*this._sumPot/(this._totalValuePot3 - this._valuePot3);
            }
            this._lbPotRoom3.schedule(this.runPot3.bind(this),delayT);
            //effectRunMoneyMenu(this._lbPotRoom3,this._valuePot3,pot3,0,true);
        }

        //this._valuePot1 = pot1;
        //this._valuePot2 = pot2;
        //this._valuePot3 = pot3;

        if(x2Pot1 != null && x2Pot1 != this._isX2Pot1)
        {
            this._isX2Pot1 = x2Pot1;
            if(this._isX2Pot1)
            {
                this._spX2PotRoom1.setVisible(true);
                this._spX2PotRoom1.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,0.9),cc.scaleTo(0.3,1))));
            }else
            {
                this._spX2PotRoom1.stopAllActions();
                this._spX2PotRoom1.setVisible(false);
            }

        }

        if(x2Pot2 != null && x2Pot2 != this._isX2Pot2)
        {
            this._isX2Pot2 = x2Pot2;
            if(this._isX2Pot2)
            {
                this._spX2PotRoom2.setVisible(true);
                this._spX2PotRoom2.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,0.9),cc.scaleTo(0.3,1))));
            }else
            {
                this._spX2PotRoom2.stopAllActions();
                this._spX2PotRoom2.setVisible(false);
            }

        }

        if(x2Pot3 != null && x2Pot3 != this._isX2Pot3)
        {
            this._isX2Pot3 = x2Pot3;
            if(this._isX2Pot3)
            {
                this._spX2PotRoom3.setVisible(true);
                this._spX2PotRoom3.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3,0.9),cc.scaleTo(0.3,1))));
            }else
            {
                this._spX2PotRoom3.stopAllActions();
                this._spX2PotRoom3.setVisible(false);
            }

        }


    },

    runPot1:function(dt)
    {
        if(this._valuePot1 >= this._totalValuePot1)
        {
            this._lbPotRoom1.setString(formatMoney(0,3,this._valuePot1));
            this._lbPotRoom1.unscheduleAllCallbacks();
        }else
        {
            this._valuePot1 ++;
            this._lbPotRoom1.setString(formatMoney(0,3,this._valuePot1));
        }

    },

    runPot2:function(dt)
    {
        if(this._valuePot2 >= this._totalValuePot2)
        {
            this._lbPotRoom2.setString(formatMoney(0,3,this._valuePot1));
            this._lbPotRoom2.unscheduleAllCallbacks();
        }else
        {
            this._valuePot2 ++;
            this._lbPotRoom2.setString(formatMoney(0,3,this._valuePot2));
        }

    },

    runPot3:function(dt)
    {
        if(this._valuePot3 >= this._totalValuePot3)
        {
            this._lbPotRoom3.setString(formatMoney(0,3,this._valuePot3));
            this._lbPotRoom3.unscheduleAllCallbacks();
        }else
        {
            this._valuePot3 ++;
            this._lbPotRoom3.setString(formatMoney(0,3,this._valuePot3));
        }

    },
    stopRunAllPot:function()
    {

        this._lbPotRoom1.unscheduleAllCallbacks();
        this._lbPotRoom2.unscheduleAllCallbacks();
        this._lbPotRoom3.unscheduleAllCallbacks();
        this._lbPotRoom1.setString(formatMoney(0,3,this._totalValuePot1));
        this._lbPotRoom2.setString(formatMoney(0,3,this._totalValuePot2));
        this._lbPotRoom3.setString(formatMoney(0,3,this._totalValuePot3));
        this._valuePot1 = this._totalValuePot1;
        this._valuePot2 = this._totalValuePot2;
        this._valuePot3 = this._totalValuePot3;
    },
    addSprite:function(parent,name,position,image)
    {
        this[name] = new cc.Sprite();
        this[name].setPosition(position);
        if(image)
        {
            this[name].setTexture(image);
        }

        parent.addChild(this[name]);
    },
    addLayout:function(parent,name,position,image,size,isTouch)
    {
        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5,0.5);
        this[name].setContentSize(size);
        this[name].setTouchEnabled(isTouch);
        if(image != null)
            this[name].setBackGroundImage(image);
        this[name].setPosition(position);

        parent.addChild(this[name]);
    },
    addButton:function(parent,name, tag, position,action,imageNol,imageS)
    {
        if(action === undefined)
            action = true;
        if(tag){
            tag = parseInt(tag);
        }

        this[name] = new ccui.Button();
        if(imageS != null)
        {
            this[name].loadTextures(imageNol,imageS,imageS);
        }
        else{
            this[name].loadTextures(imageNol,imageNol,imageNol);
        }
        this[name].setPressedActionEnabled(action);

        this[name].setTag(tag);
        this[name].addTouchEventListener(this.onTouchEventHandler, this);
        this[name].setPosition(position);
        this[name].setTitleFontName(SeagullBold.fontName);
        this[name].setTitleFontSize(30);
        this[name].setTitleColor(cc.color.WHITE);
        parent.addChild(this[name]);
    },
    addText:function(parent,name,position,string,fontName,fontSize)
    {
        this[name] = new ccui.Text(string,  fontName, fontSize);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5,0.5);
        if(cc.sys.isNative)
        {
            this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
        }
        parent.addChild(this[name]);
    },
    addEditBox:function(parent,name,position,string,placeHolder,fontName,fontSize,size,backGround,textAlign,maxLength)
    {
        if(backGround != null)
            this[name] =  new cc.EditBox(size, cc.Scale9Sprite.create(backGround), cc.Scale9Sprite.create(backGround));
        else
            this[name] =  new cc.EditBox(size, cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        this[name].setPosition(position);
        this[name].setPlaceHolder(placeHolder);
        this[name].setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this[name].setFontName(fontName);
        this[name].setFontSize(fontSize);
        this[name].setPlaceholderFontSize(fontSize);
        this[name].setPlaceholderFontColor(cc.color.GRAY);
        this[name].setFontColor(cc.color.WHITE);
        this[name].setDelegate(this);
        if(textAlign != null && !cc.sys.isNative)
            this[name].setTextAlign(textAlign);
        this[name].setAnchorPoint(0.5,0.5);
        this[name].setPosition(position);
        this[name].setMaxLength(maxLength);
        /*if(cc.sys.isNative)
         {
         this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
         }*/
        parent.addChild(this[name]);
    },
    addCheckBook:function(parent, name, position,isSelect)
    {
        this[name] = new ccui.CheckBox();
        this[name].loadTextures("res/Lobby/bg_checkbox.png","res/Lobby/bg_checkbox.png","res/Lobby/nodecheckbox.png","res/Lobby/bg_checkbox.png","res/Lobby/nodecheckbox.png",ccui.Widget.LOCAL_TEXTURE);
        this[name].setPosition(position);
        this[name].setSelected(isSelect);
        parent.addChild(this[name]);
    },



})