var CheatLayer = BaseLayer.extend({
    ctor: function() {
        this._super();

      //  this.initWithBinaryFile("res/g_res_cardGame_json_CheatLayer.json");
        this.cheatCardLayer = new CheatCardLayer();
        cc.log("cheatLayer onEnter 2");
        this.addChild(this.cheatCardLayer);
        cc.log("cheatLayer onEnter 3");
        this.customizeGUI2();
        this.clear();
        cc.log("cheatLayer onEnter 4");
    },

    onEnter: function(){
        BaseLayer.prototype.onEnter.call(this);
        this.cheatCardLayer.addListenerNew();
    },

    customizeGUI2: function(){
        var i;
        cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");
        //cc.spriteFrameCache.addSpriteFrames("res/CardGame/Poker/PlistPoker.plist","res/CardGame/Poker/PlistPoker.png");
        cc.log("cheatLayer custumize 1");
        this.addSprite(this,"bg",cc.p(640,360),res_CardGame_CommonResource_BanChoi+"/bg_layer_banchoi.png")
        this.addButton(this,"btnCheat",CheatLayer.BTNCHEAT,cc.p(1186,296.5),true,res_CardGame_CommonResource_BanChoi+"/btn_xacnhan_endgame.png",res_CardGame_CommonResource_BanChoi+"/btn_xacnhan_endgame.png");
        this.addButton(this,"btnBack",CheatLayer.BTNBACK,cc.p(52,654),true,res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_back_gamebai.png");
        this.addButton(this,"btnHuyCheat",CheatLayer.BTNHUYCHEAT,cc.p(1207,218.5),true,res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi+"/btn_faq_gamebai.png");
        //this.btnBack = this.customizeButton("btnBack", CheatLayer.BTNBACK);
        //this.btnCheat = this.customizeButton("btnCheat", CheatLayer.BTNCHEAT);
        //this.btnHuyCheat = this.customizeButton("btnHuyCheat", CheatLayer.BTNHUYCHEAT);
        this.addSprite(this,"bgSmallChair",cc.p(1141.5,388.5),res_CardGame_CommonResource_BanChoi+"/bgName.png");
        this.addEditBox(this["bgSmallChair"],"tfSmallChair",cc.p(88,16),"-1","",RobotoRegular.fontName,20,cc.size(169,23),null,cc.TEXT_ALIGNMENT_LEFT,10);
        /// this.bgSmallChair = ccui.helper.seekWidgetByName(this._layout, "bgSmallChair");

        this.tfCheatTienList = [];
        var positionbgCheat = [cc.p(906.5,674),cc.p(1106.5,674),cc.p(906.5,624),cc.p(1106.5,624),cc.p(906.5,574),cc.p(1106.5,574),cc.p(906.5,524),cc.p(1106.5,524),cc.p(906.5,474)];
        for(var i = 0; i < Poker.MAX_PLAYER; i++){

            //  var tfCheatTien = ccui.helper.seekWidgetByName(this._layout, "tfCheatTien_" + i);
            this.addSprite(this,"bgCheatTien" + i,positionbgCheat[i],res_CardGame_CommonResource_BanChoi+"/bgName.png");
            this.addEditBox(this["bgCheatTien" + i],"tfCheatTien_"+i,cc.p(88,16),"0","",RobotoRegular.fontName,20,cc.size(169,23),null,cc.TEXT_ALIGNMENT_LEFT,10);

            this.tfCheatTienList.push(this["tfCheatTien_"+i]);

        }

        cc.log("cheatLayer custumize end 2");
        //them 5 btn avatar
    },

    setType: function(type){
        cc.log("num: " + type);
        this.type = type;
        if(type == GameList.BaCay){
            this.cheatCardLayer.numCardOnePlayer = 6;
        }else if(type == GameList.SamSoLo){
            this.cheatCardLayer.numCardOnePlayer = 10;
        }else if(type == GameList.TienLenSoLo){
            this.cheatCardLayer.numCardOnePlayer = 13;
        }else if(type == GameList.BaiCao){
            this.cheatCardLayer.numCardOnePlayer = 6;
        }else if(type == GameList.Poker){
            this.cheatCardLayer.numCardOnePlayer = 5;
        }else if(type == GameList.Lieng){
            this.cheatCardLayer.numCardOnePlayer = 6;
        }else if(type == GameList.XiZach){
            this.cheatCardLayer.numCardOnePlayer = 5;
        }

        if(type == GameList.BaCay){
            for(var i = 28; i < 44; i++){
                this.cheatCardLayer.listInGame[i] = false;
                this.cheatCardLayer.handOnCards[i].setVisible(false);
            }
        }
        else{
            for(var i = 0; i < 52; i++){
                this.cheatCardLayer.listInGame[i] = true;
                this.cheatCardLayer.handOnCards[i].setVisible(true);
            }
        }

    },

    clear: function(){
        this.cheatCardLayer.clear();
    },


    // convert from id tu id hien thi tren clien(3B la 0) sang id chua server
    convertId: function(id){
        var res = id;
        if(this.type == GameList.BaCay){
            if(id >= 44){
                res = res - 44;
            }
            else{
                res =  res + 8;
            }

            if(res % 4 == 3){
                res = res -1;
            }else if(res % 4 ==2){
                res = res +1;
            }
        }
        else if(this.type == GameList.Poker){
            if(id >= 48){
                res = res - 48;
            }
            else{
                res =  res + 4;
            }
        }
        else if(this.type == GameList.Lieng){
            if(id >= 44){
                res = res -44;
            }
            else{
                res = res + 8;
            }

            if(res % 4 == 2){
                res = res + 1;
            }
            else if(res % 4 ==3){
                res = res -1;
            }
        }
        else if(this.type == GameList.XiZach){
            if(id < 0 || id >= 52){
                return id;
            }
            id = (id +8)%52;
            return id;
        }
        return res;
    },

    onButtonRelease: function(btn, id){
        cc.log("btn" + id);
        switch(id){
            case 1:{
                cc.log("Click btnBack");
                this.cheatCardLayer.clear();
                this.setVisible(false);
            }
                break;
            case 2:{
                cc.log("Click btnCheat");
                var i = 0;
                var cards = [];

                for(i = 0; i < this.cheatCardLayer.selectCount; i++){
                    cards.push(this.convertId(this.cheatCardLayer.selectCards[i]));
                }

                for(i =0; i < this.cheatCardLayer.cheatCards.length; i++){
                    if(this.cheatCardLayer.isHide[i] == false && this.cheatCardLayer.listInGame[i]){
                        cc.log(this.convertId(this.cheatCardLayer.cheatCards[i]));
                        cards.push(this.convertId(this.cheatCardLayer.cheatCards[i]));
                    }
                }





                var smallChair = this.tfSmallChair.getString();
                if(smallChair == null || smallChair == undefined){
                    smallChair = 0;
                }
                else{
                    smallChair = parseInt(smallChair);
                }

                this.listTien = [];
                for(var i = 0; i < Poker.MAX_PLAYER; i++){


                    var moneyCheat = this.tfCheatTienList[i].getString();
                    if(moneyCheat == null || moneyCheat == undefined){
                        moneyCheat = 0;
                    }
                    else{
                        moneyCheat = parseInt(moneyCheat);
                    }

                    this.listTien.push(moneyCheat);
                }

                var cmd = new CARD_GAME.SendCardCheat();
                cmd.putData(1, cards, smallChair, this.listTien);

                gameWsClient.send(cmd);
                cmd.clean();
                this.cheatCardLayer.clear();
                this.setVisible(false);
            }

                break;
            case 3:{
                var cards = [];
                cc.log("Click btnHuyCheat");

                var smallChair = this.tfSmallChair.getString();
                if(smallChair == null || smallChair == undefined){
                    smallChair = 0;
                }
                else{
                    smallChair = parseInt(smallChair);
                }

                this.listTien = [];
                for(var i = 0; i < Poker.MAX_PLAYER; i++){


                    var moneyCheat = this.tfCheatTienList[i].getString();
                    if(moneyCheat == null || moneyCheat == undefined){
                        moneyCheat = 0;
                    }
                    else{
                        moneyCheat = parseInt(moneyCheat);
                    }

                    this.listTien.push(moneyCheat);
                }

                var cmd = new CARD_GAME.SendCardCheat();
                cmd.putData(0, cards, smallChair, this.listTien);
                gameWsClient.send(cmd);
                cmd.clean();
            }
            break;

        }

    }
});

CheatLayer.BTNBACK = 1;
CheatLayer.BTNCHEAT = 2;
CheatLayer.BTNHUYCHEAT = 3;
CheatLayer.BTN_MINUS = 4;
CheatLayer.BTN_PLUS = 5;
