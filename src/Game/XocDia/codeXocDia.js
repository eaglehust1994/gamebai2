var xocdia = null; var xocdiaX = null; var xocdiaY = null; var xocdiaAppear = false;
var codeXocDia = BaseLayer.extend(
    {
        ctor: function () {
            this.array_buy_gate = [];
            this.pn_xocdia = null;
            this.pn_putMoney = null;
            this.btn_put_chan = null;
            this.btn_put_le = null;
            this.btn_put_chan4 = null;
            this.btn_put_chan0 = null;
            this.btn_put_le3 = null;
            this.btn_put_le1 = null;

            this.pn_bat_dia = null;
            this.sp_bat = null;
            this.vtri_trungtam = null;
            this.sp_vi_1 = null;
            this.sp_vi_2 = null;
            this.sp_vi_3 = null;
            this.sp_vi_4 = null;

            this.pn_position_user = null;
            this.btn_sit1 = null;
            this.btn_sit2 = null;
            this.btn_sit3 = null;
            this.btn_sit4 = null;
            this.btn_sit5 = null;
            this.btn_sit6 = null;
            this.btn_sit7 = null;
            this.btn_sit8 = null;
            this.btn_sit9 = null;

            this.pn_user = null;
            this.menhgia_put = null;
            this.value1 = null; this.value2 = null; this.value3 = null; this.value4 = null; this.value5 = null;
            this.sp_avatar = null;
            this.sp_sub_banker = null;this.txt_money = null;
            this.txt_nickname = null;
            this.sp_win = null;
            this.sp_chuong = null;
            this.sp_outroom = null;

            this.pn_Out_put = null;
            this.btn_value1 = null;
            this.txt_value1 = null;
            this.btn_value2 = null;
            this.txt_value2 = null;
            this.btn_value3 = null;
            this.txt_value3 = null;
            this.btn_value4 = null;
            this.txt_value4 = null;
            this.btn_value5 = null;
            this.txt_value5 = null;

            this.ListPut = null;
            this.ListPut_Chan = null;   this.ListPut_Le = null;
            this.ListPut_Chan_4 = null; this.ListPut_Chan_0 = null;
            this.ListPut_Le_1 = null;  this.ListPut_Le_3 = null;
            this.ListTraThuong = null;

            this.valuePut = 0;

            this.pn_nen = null;
            this.pn_text = null;
            this.sp_money_chan = null;
            this.sp_money_le = null;
            this.sp_money_chan4 = null;
            this.sp_money_chan0 = null;
            this.sp_money_le1 = null;
            this.sp_money_le3 = null;
            this.txt_money_chan = null;
            this.txt_money_le = null;
            this.txt_money_chan4 = null;
            this.txt_money_chan0 = null;
            this.txt_money_le1 = null;
            this.txt_money_le3 = null;

            this.array_phing_chan = [];
            this.array_phing_le = [];
            this.array_phing_chan0 = [];
            this.array_phing_chan4 = [];
            this.array_phing_le1 = [];
            this.array_phing_le3 = [];

            this.pn_ratio = null
            this.txt_ratio_chan = null;
            this.txt_ratio_le = null;
            this.txt_ratio_chan4 = null;
            this.txt_ratio_chan0 = null;
            this.txt_ratio_le1 = null;
            this.txt_ratio_le3 = null;

            this.btn_Huy_dat = null;
            this.btn_lam_cai = null;
            this.btn_put_x2 = null;
            this.btn_all_in = null;
            this.sp_dealer = null;
            this.pos_dealerX = 0; this.pos_dealerY = 0;

            this.MoneyReviceServer = [0,0,0,0,0,0];
            this.moneyType = 1; // 0 la xu, 1 la vin
            this.pn_player_1 = null; this.pn_player_2 = null; this.pn_player_3 = null; this.pn_player_4 = null;
            this.pn_player_5 = null; this.pn_player_6 = null; this.pn_player_7 = null; this.pn_player_8 = null;
            this.arrayPlayer = ["","","","","","","",""];
            this.arrayPlace = [0,1,2,3,4,5,6,7];
            this.txt_info = null;
            this.txt_time = null;
            this.btn_backgame = null;
            this.btn_chat = null;
            this.btn_info = null;

            this.pn_confirm = null;
            this.txt_content_confirm = null;
            this.btn_huy_confirm = null;
            this.btn_ok_confirm = null;

            this.STATE_XOC_DIA = 0;
            this.is_all_in = false;
            this.pn_notice_in_game = null;
            this.pn_notice = null;
            this.pn_action_ingame = null;
            this.txt_action_ingame = null;
            this.txt_content_notice = null;
            this.arrayGomMoney = [0,0,0,0];
            this.arrayHasMoney = [0,0,0,0,0,0];
            this.SAVE_PK = null;
            this.banker = "";
            this.btn_can_tat = null;
            this.btn_ban_cua = null;
            this.btn_can_lech_cua = null;
            this.btn_huy_lam_cai = null;
            this.btn_ban_le = null;
            this.btn_xac_nhan = null;
            this.btn_banker_hoantien = null;
            this.txt_money_hoan = null;
            this.Subbanker = "";
            this.array_save_money_each_pot = [0,0,0,0,0,0];
            this.save_place_banker = null;
            this.save_place_Subbanker = null;
            this.array_save_ratio = [];
            this.is_clock_alarm = false;
            this.save_array_effect_money = [];
            this.Is_dealer = 1;
            this.save_time_new = 0;
            this.save_order_huy_lam_cai = false;

            this.pn_my_money = null;
            this.txt_my_money_0 = null;
            this.txt_my_money_1 = null;
            this.txt_my_money_2 = null;
            this.txt_my_money_3 = null;
            this.txt_my_money_4 = null;
            this.txt_my_money_5 = null;
            this.my_put_money = [0,0,0,0,0,0];
            this.pn_list_player = null;

            this.pn_soicau = null;
            this.txt_total_chan = null;
            this.txt_total_le = null;
            this.list_soicau = null;

            this.tf_cheat = null;
            this.pn_effect_win = null;
            this.sp_win_0 = null;
            this.sp_win_1 = null;
            this.sp_win_2 = null;
            this.sp_win_3 = null;
            this.sp_win_4 = null;
            this.sp_win_5 = null;
            this.effect_win_0 = null;
            this.effect_win_1 = null;

            this.save_roomId = null;
            this.chatImage = [];
            for (var i=0; i< XocDia.MAX_PLAYER; i++){
                this.chatImage[i] = null;
            }
            this.save_number_phing_in_pot = [0,0,0,0,0,0];
            this.number_phing_delete = [0,0,0,0,0,0];

            this.pn_scroll = null;
            this.slider_put = null;
            this.txt_money_slider = null;
            this.max_money_slider = 0;
            this.value_slider = 0;
            this.chose_chan_le = 0;
            this.info_sell_chan = 0; this.info_sell_le = 0;
            this.is_sellgate = false;
            this.btn_close_pnscroll = null;

            this.txt_put_x2 = null;
            this.txt_all_in = null;
            this.txt_can_tat = null;
            this.txt_hoan_tien = null;

            this.is_dont_want_buy = false;
            this.pn_buy_gate = null;
            this.bg_buy_gate = null;
            this.txt_buy_gate = null;
            this.lv_buy_gate = null;
            this.on_show_buy_gate = null;
            this.is_show_buy_gate = true;
            this.pn_add_clock = null;

            this.onMove_tooltip = false;
            this.save_muccuoc = 0;
            this.save_number_playing = 0;
            this.is_pause_btn = false;
            this.order_banker = false;

            this.maxMoneyBet = [0,0,0,0,0,0];
            this.lockByGate = [0,0,0,0,0,0];

            this.masterRoom = false;
            this.roomWorld = false;
            this.isLockOrKick = false;
            this.nicknameKick = "";
            this.gateLock = 0;

            this.listAllPlayer = [];
            this.listPlayerSit = [];
            this.listPlayerStand = [];

            this.save_avatar = [0,0,0,0,0,0,0,0];
            this.isOpenPlayerStand = false;

            this.kind_confirm = 0;
            this.is_destroy_room = false;
            this.save_user_order_kick = [];

            this.order_lock_gate = [0,0,0,0,0,0];
            this.lockgate1 = null; this.lockgate2 = null; this.lockgate3 = null; this.lockgate4 = null;
            this.save_btn_kick = null;

            this.vtBat = cc.p(0, 0);

            this._super("codeXocDia");
            //this.initWithBinaryFile("res/XocDiaScene.json");
            return true;
        },
        customizeGUI: function(){
            var that = this;

            this.customlistener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                eventName: "updateMoney",
                callback: function(event){
                    if(GameScene.gameGui != null)
                        that.updateMoney(event);
                }
            });
            cc.eventManager.addListener(this.customlistener, 1);
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer1_animation/dealer1Plist.plist","res/CardGame/ResXocDia/animation/Dealer1_animation/dealer1Plist.png");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer2_animation/dealer2Plist.plist","res/CardGame/ResXocDia/animation/Dealer2_animation/dealer2Plist.png");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer3_animation/dealer3Plist.plist","res/CardGame/ResXocDia/animation/Dealer3_animation/dealer3Plist.png");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/CommonResource/BanChoi/PlistBanChoi.plist","res/CardGame/CommonResource/BanChoi/PlistBanChoi.png");

            //this.pn_xocdia = this._layout.getChildByName("pn_xocdia");
            this.addLayout(this,"pn_xocdia",cc.p(640,360),null,cc.size(1280,720),true);//Cha
            this.addImage(this.pn_xocdia,"bg_banchoi",cc.p(640,360),"res/CardGame/Poker/bgBanPoker.png", cc.size(1280,720));
            this.addImage(this.pn_xocdia,"bg_chieu",cc.p(640,360),res_XocDia + "/banchoi-02.png", cc.size(990,437));
            this.addImage(this.pn_xocdia,"bg_bottom",cc.p(640,25),res_XocDia + "/xocdia02.png", cc.size(1283,53));
            this.addImage(this.pn_xocdia,"bg_title",cc.p(671,85),res_XocDia + "/xocdia-08.png", cc.size(399,36));
            //
            this.addLayout(this.pn_xocdia,"pn_putMoney",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_ratio",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_effect_win",cc.p(0,0),null,cc.size(0,0),true);
            //
            this.addSprite(this.pn_xocdia,"sp_dealer",cc.p(637.13,721.04),"CardGame/ResXocDia/animation/Dealer1_animation/Dealer1_00.png");
            this.sp_dealer.anchorY = 1;
            this.sp_dealer.setScale(0.83);
            //
            this.addLayout(this.pn_xocdia,"pn_bat_dia",cc.p(639,430),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"ListPut",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_bg",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_nen",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_text",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_position_user",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_soicau",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_user_stand",cc.p(991.94,118.64),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_Out_put",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_user",cc.p(409,95.12),null,cc.size(0,0),true);

            this.addButton(this.pn_xocdia,"btn_backgame",codeXocDia.BTN_BACKROOM,cc.p(48.25,669.97),true,res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_back_gamebai.png");
            this.addButton(this.pn_xocdia,"btn_info",codeXocDia.BTN_INFO,cc.p(1149.78,669.97),true,res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_faq_gamebai.png");
            this.addButton(this.pn_xocdia,"btn_chat",codeXocDia.BTN_CHAT,cc.p(1229.91,669.97),true,res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png",res_CardGame_CommonResource_BanChoi + "/btn_chat_gamebai.png");
            //
            this.addText(this.pn_xocdia,"txt_info",cc.p(763.04,22.96),"",RobotoRegular.fontName,16);
            this.txt_info.ignoreContentAdaptWithSize(false);
            this.txt_info.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.txt_info.setContentSize(cc.size(253,23));
            this.txt_info.setColor(cc.color("#FF974F"));
            this.addText(this.pn_xocdia,"txt_table",cc.p(763.04,22.96),"",RobotoRegular.fontName,16);
            this.txt_table.ignoreContentAdaptWithSize(false);
            this.txt_table.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this.txt_table.setContentSize(cc.size(253,23));
            this.txt_table.setColor(cc.color("#FF974F"));

            this.addLayout(this.pn_xocdia,"pn_add_clock",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_list_player",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_my_money",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_scroll",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_buy_gate",cc.p(0,0),null,cc.size(0,0),true);

            this.addButton(this.pn_xocdia,"on_show_buy_gate",codeXocDia.BTN_ON_SHOW_BUY_GATE,cc.p(178.79,534.88),true,res_XocDia + "/tamgiac.png",res_XocDia + "/tamgiac.png");
            this.on_show_buy_gate.setRotation(180);

            this.addLayout(this.pn_xocdia,"pn_notice_in_game",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_list_user_stand",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.pn_xocdia,"pn_confirm",cc.p(640,360),null,cc.size(1280,720),true);
            this.addLayout(this.pn_xocdia,"pn_tool",cc.p(0,0),null,cc.size(0,0),true);

            this.initputMoney();
            this.initpn_ratio();
            this.initpn_effect_win();
            this.initpn_bat_dia();
            this.initListPut();
            this.initpn_bg();
            this.initpn_nen();
            this.initpn_text();
            this.initpn_position_user();
            this.initpn_soicau();
            this.initpn_user_stand();
            this.initpn_Out_put();
            this.initpn_user();
            this.initpn_my_money();
            this.initpn_scroll();
            this.initpn_buy_gate();
            this.init_pn_notice_in_game();
            this.init_pn_list_user_stand();
            this.init_pn_confirm();
            this.init_pn_tool();

            this.funResetVisibleMoney();
            this.on_show_buy_gate.setVisible(false);

            // add clock
            this.clock = new cc.Node();
            this.tieClock = GuiUtil.createSprite("res/GameCo/Caro/Tai-1.png");//new cc.Sprite("res/GameCo/Caro/Tai-1.png");
            this.clock.addChild(this.tieClock);
            this.tieClock.setPosition(-24.04, 34.02);
            this.tieClock.setAnchorPoint(0.64, 0.18);

            this.tieClock1 = GuiUtil.createSprite("res/GameCo/Caro/Tai-2.png");//new cc.Sprite("res/GameCo/Caro/Tai-2.png");
            this.clock.addChild(this.tieClock1);
            this.tieClock1.setPosition(24.05, 34.48);
            this.tieClock1.setAnchorPoint(0.36, 0.2);

            var thanClock = GuiUtil.createSprite("res/GameCo/Caro/Mat-dong-ho.png");//new cc.Sprite("res/GameCo/Caro/Mat-dong-ho.png");
            this.clock.addChild(thanClock);

            var matClock = GuiUtil.createSprite("res/GameCo/Caro/mat-tren.png");//new cc.Sprite("res/GameCo/Caro/mat-tren.png");
            this.clock.addChild(matClock);
            matClock.setPosition(0, 13);

            this.nutbam = GuiUtil.createSprite("res/GameCo/Caro/Num-bam.png");//new cc.Sprite("res/GameCo/Caro/Num-bam.png");
            this.clock.addChild(this.nutbam);
            this.nutbam.setPosition(0, 45); // -11, 44  20

            var matclock = GuiUtil.createSprite("res/GameCo/Caro/mat-tren.png");//new cc.Sprite("res/GameCo/Caro/mat-tren.png");
            this.clock.addChild(matclock);
            matclock.setPosition(0, 13);

            this.timer = "   ";
            this.lblTimer = new cc.LabelTTF(this.timer, fontArialB.fontName, 48);
            this.lblTimer.setColor({r: 18, g: 32, b: 68});
            this.lblTimer.setPosition(0, 4);
            this.clock.addChild(this.lblTimer);
            this.txt_time = this.lblTimer;

            this.pn_add_clock.addChild(this.clock);
            //this.clock.setScale(1.5);
            this.clock.setPosition(cc.p(760.94,602.73));
            this.clock.setVisible(false);

            this.clockShadow = GuiUtil.createSprite("res/GameCo/Caro/SD2.png");//new cc.Sprite("res/GameCo/Caro/SD2.png");
            this.addChild(this.clockShadow);
            this.clockShadow.setPosition(this.clock.getPositionX(), this.clock.getPositionY() - 40);
            this.clockShadow.setVisible(false);

            this.audioXocDia = new XocDia.Audio(true,true);

            // add cheat
            if (CURRENT_MODE != MODE_DEPLOY.LIVE) {
                //var button = new ccui.Button();
                //button.loadTextureNormal("res/CardGame/ResXocDia/xocdia-22_1.png");
                this.addButton(this,"button123",-123,cc.p(1350,600),true,"res/CardGame/ResXocDia/xocdia-22_1.png",null);;
                this.button123.setTitleText("CHEAT");
                this.button123.setTitleColor(cc.color("#1B1464"));

                this.button123.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.setCheat();
                            break;
                    }

                }, this);

                this.addEditBox(this,"tf_cheat",cc.p(1350, 550),"","Ví dụ: 1,1,1,1",fontRobotoMedium.fontName,20,cc.size(165,35),"res/Lobby/bg_tendangnhap.png",null,7);
                //this.tf_cheat = new cc.EditBox(cc.size(165, 35), cc.Scale9Sprite.create("res/Lobby/bg_tendangnhap.png"), cc.Scale9Sprite.create("res/Lobby/bg_tendangnhap.png"));
                this.tf_cheat.setPlaceHolder("Ví dụ: 1,1,1,1");
                this.tf_cheat.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
                this.tf_cheat.setPosition(cc.p(1350, 550));
                this.tf_cheat.setFontName("Roboto-Medium");
                this.tf_cheat.setFontSize(20);
                this.tf_cheat.setPlaceholderFontSize(20);
                this.tf_cheat.setPlaceholderFontColor(cc.color.GRAY);
                this.tf_cheat.setFontColor(cc.color.WHITE);
                this.tf_cheat.setDelegate(this);
                this.tf_cheat.setMaxLength(7);
                //this.addChild(this.tf_cheat, 1);
            }

            var onMoveNotice = cc.EventListener.create(
                {event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if(GameScene.gameGui.onMove_tooltip == false){
                                GameScene.gameGui.onMove_tooltip = true;
                                var money = GameScene.gameGui.save_number_playing * 170*GameScene.gameGui.save_muccuoc;
                                if(money > 0)
                                    GameScene.gameGui.showNotice("Bạn cần " + formatMoney(0,3,parseInt(money)) + " để làm cái.");
                                else
                                    GameScene.gameGui.showNotice("Bạn cần " + formatMoney(0,3,parseInt(170*GameScene.gameGui.save_muccuoc)) + " để làm cái.");
                            }
                        }else{
                            GameScene.gameGui.onMove_tooltip = false;
                        }
                    }
                });

            cc.eventManager.addListener(onMoveNotice.clone(), this.btn_lam_cai);
        },

        initputMoney : function(){
            this.addButton(this.pn_putMoney,"btn_put_chan",codeXocDia.BTN_PUT_CHAN,cc.p(390.55,442.22),true,res_XocDia + "/xocdia17.png",res_XocDia + "/xocdia17.png");
            this.addButton(this.pn_putMoney,"btn_put_le",codeXocDia.BTN_PUT_LE,cc.p(889.23,442.22),true,res_XocDia + "/xocdia17.png",res_XocDia + "/xocdia17.png");
            this.btn_put_le.setScaleX(-1);
            this.addButton(this.pn_putMoney,"btn_put_chan4",codeXocDia.BTN_PUT_CHAN4,cc.p(330.55,267.90),true,res_XocDia + "/xocdia14.png",res_XocDia + "/xocdia14.png");
            this.addButton(this.pn_putMoney,"btn_put_chan0",codeXocDia.BTN_PUT_CHAN0,cc.p(535.70,267.90),true,res_XocDia + "/xocdia14.png",res_XocDia + "/xocdia14.png");
            this.addButton(this.pn_putMoney,"btn_put_le1",codeXocDia.BTN_PUT_LE1,cc.p(742.19,267.90),true,res_XocDia + "/xocdia14.png",res_XocDia + "/xocdia14.png");
            this.addButton(this.pn_putMoney,"btn_put_le3",codeXocDia.BTN_PUT_LE3,cc.p(949.23,267.90),true,res_XocDia + "/xocdia14.png",res_XocDia + "/xocdia14.png");
            this.btn_put_le3.setScaleX(-1);
            this.setNameTarget("btn_put_chan",this.btn_put_chan);
            this.setNameTarget("btn_put_le",this.btn_put_le);
            this.setNameTarget("btn_put_chan4",this.btn_put_chan4);
            this.setNameTarget("btn_put_chan0",this.btn_put_chan0);
            this.setNameTarget("btn_put_le1",this.btn_put_le1);
            this.setNameTarget("btn_put_le3",this.btn_put_le3);
        },

        initpn_ratio : function(){
            this.addText(this.pn_ratio,"tx_chan",cc.p(390.55,450.22),"CHẴN",fontRobotoBold.fontName,34);
            this.addText(this.pn_ratio,"tx_le",cc.p(889.23,450.22),"LẺ",fontRobotoBold.fontName,34);
            this.tx_le.setColor(cc.color("#FF314A"));
            this.addText(this.pn_ratio,"txt_ratio_chan",cc.p(390.55,424.80),"(1x2)",fontRobotoBold.fontName,16);
            this.addText(this.pn_ratio,"txt_ratio_le",cc.p(889.23,424.80),"(1x2)",fontRobotoBold.fontName,16);
            this.txt_ratio_le.setColor(cc.color("#FF314A"));
            this.addLayout(this.pn_ratio,"pn_ratio_vi",cc.p(0,0),null,cc.size(0,0),true);
            this.addText(this.pn_ratio_vi,"txt",cc.p(330.55,282.09),"4 TRẮNG",fontRobotoBold.fontName,20);
            this.addText(this.pn_ratio_vi,"txt_ratio_chan4",cc.p(330.55,255.49),"(1x16)",fontRobotoBold.fontName,16);;
            this.addText(this.pn_ratio_vi,"txt2",cc.p(535.70,282.09),"4 ĐỎ",fontRobotoBold.fontName,20);
            this.addText(this.pn_ratio_vi,"txt_ratio_chan0",cc.p(535.70,255.49),"(1x16)",fontRobotoBold.fontName,16);
            this.addText(this.pn_ratio_vi,"txt3",cc.p(742.19,282.09),"3 ĐỎ",fontRobotoBold.fontName,20);
            this.addText(this.pn_ratio_vi,"txt_ratio_le1",cc.p(742.19,255.49),"(1x4)",fontRobotoBold.fontName,16);
            this.txt3.setColor(cc.color("#FF314A"));
            this.txt_ratio_le1.setColor(cc.color("#FF314A"));
            this.addText(this.pn_ratio_vi,"txt4",cc.p(949.23,282.09),"3 TRẮNG",fontRobotoBold.fontName,20);
            this.addText(this.pn_ratio_vi,"txt_ratio_le3",cc.p(949.23,255.49),"(1x4)",fontRobotoBold.fontName,16);
            this.txt4.setColor(cc.color("#FF314A"));
            this.txt_ratio_le3.setColor(cc.color("#FF314A"));

            this.txt_ratio_chan.ignoreContentAdaptWithSize(false);
            this.txt_ratio_le.ignoreContentAdaptWithSize(false);
            this.txt_ratio_chan4.ignoreContentAdaptWithSize(false);
            this.txt_ratio_chan0.ignoreContentAdaptWithSize(false);
            this.txt_ratio_le1.ignoreContentAdaptWithSize(false);
            this.txt_ratio_le3.ignoreContentAdaptWithSize(false);

            this.txt_ratio_chan.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_ratio_le.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_ratio_chan4.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_ratio_chan0.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_ratio_le1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_ratio_le3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.txt_ratio_chan.setContentSize(cc.size(100,25));
            this.txt_ratio_le.setContentSize(cc.size(70,25));
            this.txt_ratio_chan4.setContentSize(cc.size(70,25));
            this.txt_ratio_chan0.setContentSize(cc.size(70,25));
            this.txt_ratio_le1.setContentSize(cc.size(70,25));
            this.txt_ratio_le3.setContentSize(cc.size(70,25));
        },

        initpn_effect_win : function(){
            this.addSprite(this.pn_effect_win,"sp_win_0",cc.p(390.55,442.22),res_XocDia + "/xocdia-16.png");
            this.addSprite(this.pn_effect_win,"sp_win_1",cc.p(889.23,442.22),res_XocDia + "/xocdia-16.png");
            this.addSprite(this.pn_effect_win,"sp_win_2",cc.p(330.55,267.90),res_XocDia + "/xocdia-15.png");
            this.addSprite(this.pn_effect_win,"sp_win_3",cc.p(535.70,267.90),res_XocDia + "/xocdia-15.png");
            this.addSprite(this.pn_effect_win,"sp_win_4",cc.p(742.19,267.90),res_XocDia + "/xocdia-15.png");
            this.addSprite(this.pn_effect_win,"sp_win_5",cc.p(949.23,267.90),res_XocDia + "/xocdia-15.png");
            for(var i = 0; i < 6; i ++){
                this["sp_win_" + i].setVisible(false);
            }
            this.sp_win_5.setScaleX(-1);
            this.sp_win_1.setScaleX(-1);
            this.addSprite(this.pn_effect_win,"lockgate2",cc.p(391.84,316.53),res_XocDia + "/lockgate.png");
            this.addSprite(this.pn_effect_win,"lockgate3",cc.p(595.83,316.30),res_XocDia + "/lockgate.png");
            this.addSprite(this.pn_effect_win,"lockgate4",cc.p(802.83,316.30),res_XocDia + "/lockgate.png");
            this.addSprite(this.pn_effect_win,"lockgate5",cc.p(1010.45,316.57),res_XocDia + "/lockgate.png");
            this.lockgate2.setVisible(false);   this.lockgate3.setVisible(false);
            this.lockgate4.setVisible(false);   this.lockgate5.setVisible(false);

            this.addSprite(this.pn_effect_win,"effect_win_0",cc.p(390.55,442.22),res_XocDia + "/sang-28.png");
            this.addSprite(this.pn_effect_win,"effect_win_1",cc.p(330.55,267.90),res_XocDia + "/sang-28.png");
            this.effect_win_0.setScale(1.1); this.effect_win_0.setVisible(false);
            this.effect_win_1.setScale(0.7); this.effect_win_1.setVisible(false);
        },

        initpn_bat_dia : function(){
            this.addSprite(this.pn_bat_dia,"sp_dia",cc.p(0,0),res_XocDia + "/xocdia08.png");
            this.addSprite(this.pn_bat_dia,"sp_vi_4",cc.p(-5.72,-1.97),res_XocDia + "/vi2.png");
            this.addSprite(this.pn_bat_dia,"sp_vi_3",cc.p(-5.72,-1.97),res_XocDia + "/vi2.png");
            this.addSprite(this.pn_bat_dia,"sp_vi_2",cc.p(-5.72,-1.97),res_XocDia + "/vi1.png");
            this.addSprite(this.pn_bat_dia,"sp_vi_1",cc.p(-5.72,-1.97),res_XocDia + "/vi1.png");
            this.addSprite(this.pn_bat_dia,"sp_bat",cc.p(0,-0.5),res_XocDia + "/xocdia09.png");
            this.addLayout(this.pn_bat_dia,"vtri_trungtam",cc.p(0,0),null,cc.size(0,0),true);
            this.pn_bat_dia.setVisible(false);
            this.vtBat = this.sp_bat.getPosition();
        },

        initListPut : function(){
            this.addSprite(this.ListPut,"bg_soicau_100",cc.p(640,269.11),res_XocDia + "/soicau_100.png");
            this.bg_soicau_100.setVisible(false);
            this.addLayout(this.ListPut,"ListPut_Chan",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListPut_Le",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListPut_Chan_4",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListPut_Chan_0",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListPut_Le_1",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListPut_Le_3",cc.p(0,0),null,cc.size(0,0),true);
            this.addLayout(this.ListPut,"ListTraThuong",cc.p(0,0),null,cc.size(0,0),true);
            this.setNameTarget("ListPut_Chan", this.ListPut_Chan);
            this.setNameTarget("ListPut_Le", this.ListPut_Le);
            this.setNameTarget("ListPut_Chan_4", this.ListPut_Chan_4);
            this.setNameTarget("ListPut_Chan_0", this.ListPut_Chan_0);
            this.setNameTarget("ListPut_Le_1", this.ListPut_Le_1);
            this.setNameTarget("ListPut_Le_3", this.ListPut_Le_3);
            this.setNameTarget("ListTraThuong", this.ListTraThuong);
        },

        initpn_bg : function(){
            this.addLayout(this.pn_bg,"chan4",cc.p(0,0),null,cc.size(0,0),true);
            this.addSprite(this.chan4,"sp1",cc.p(244.05,267.90),res_XocDia + "/xocdia-20.png");
            this.addSprite(this.chan4,"sp2",cc.p(244.05,301.99),res_XocDia + "/vi1_s.png");
            this.addSprite(this.chan4,"sp3",cc.p(244.05,279.52),res_XocDia + "/vi1_s.png");
            this.addSprite(this.chan4,"sp4",cc.p(244.05,256.80),res_XocDia + "/vi1_s.png");
            this.addSprite(this.chan4,"sp5",cc.p(244.05,233.80),res_XocDia + "/vi1_s.png");
            ////
            this.addLayout(this.pn_bg,"chan0",cc.p(0,0),null,cc.size(0,0),true);
            this.addSprite(this.chan0,"sp1",cc.p(449.20,267.90),res_XocDia + "/xocdia-20.png");
            this.addSprite(this.chan0,"sp2",cc.p(449.20,301.99),res_XocDia + "/vi2_s.png");
            this.addSprite(this.chan0,"sp3",cc.p(449.20,279.52),res_XocDia + "/vi2_s.png");
            this.addSprite(this.chan0,"sp4",cc.p(449.20,256.80),res_XocDia + "/vi2_s.png");
            this.addSprite(this.chan0,"sp5",cc.p(449.20,233.80),res_XocDia + "/vi2_s.png");
            ////
            this.addLayout(this.pn_bg,"le1",cc.p(0,0),null,cc.size(0,0),true);
            this.addSprite(this.le1,"sp1",cc.p(655.69,267.90),res_XocDia + "/xocdia-20.png");
            this.addSprite(this.le1,"sp2",cc.p(655.69,301.99),res_XocDia + "/vi2_s.png");
            this.addSprite(this.le1,"sp3",cc.p(655.69,279.52),res_XocDia + "/vi2_s.png");
            this.addSprite(this.le1,"sp4",cc.p(655.69,256.80),res_XocDia + "/vi2_s.png");
            this.addSprite(this.le1,"sp5",cc.p(655.69,233.80),res_XocDia + "/vi1_s.png");
            ////
            this.addLayout(this.pn_bg,"le3",cc.p(0,0),null,cc.size(0,0),true);
            this.addSprite(this.le3,"sp1",cc.p(862.73,267.90),res_XocDia + "/xocdia-20.png");
            this.addSprite(this.le3,"sp2",cc.p(862.73,301.99),res_XocDia + "/vi1_s.png");
            this.addSprite(this.le3,"sp3",cc.p(862.73,279.52),res_XocDia + "/vi1_s.png");
            this.addSprite(this.le3,"sp4",cc.p(862.73,256.80),res_XocDia + "/vi1_s.png");
            this.addSprite(this.le3,"sp5",cc.p(862.73,233.80),res_XocDia + "/vi2_s.png");
            ////
            this.addSprite(this.ListPut,"bg_soicau",cc.p(184.74,65.26),res_XocDia + "/xocdia19.png");
        },

        initpn_nen : function(){
            this.addSprite(this.pn_nen,"sp_money_chan",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
            this.addSprite(this.pn_nen,"sp_money_le",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
            this.addSprite(this.pn_nen,"sp_money_chan4",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
            this.addSprite(this.pn_nen,"sp_money_chan0",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
            this.addSprite(this.pn_nen,"sp_money_le1",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
            this.addSprite(this.pn_nen,"sp_money_le3",cc.p(518.61,465.53),res_XocDia + "/xocdia18.png");
        },

        initpn_text : function(){
            this.addText(this.pn_text,"txt_money_chan",cc.p(390.55,511.12),"0",RobotoRegular.fontName,20);
            this.txt_money_chan.ignoreContentAdaptWithSize(false);
            this.txt_money_chan.setColor(cc.color("#FFFF00"));
            this.txt_money_chan.setContentSize(cc.size(282,30));
            this.txt_money_chan.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_chan.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_text,"txt_money_le",cc.p(889.23,511.12),"0",RobotoRegular.fontName,20);
            this.txt_money_le.ignoreContentAdaptWithSize(false);
            this.txt_money_le.setColor(cc.color("#FFFF00"));
            this.txt_money_le.setContentSize(cc.size(282,30));
            this.txt_money_le.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_le.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

            this.addText(this.pn_text,"txt_money_chan4",cc.p(330.55,330.84),"0",RobotoRegular.fontName,20);
            this.txt_money_chan4.ignoreContentAdaptWithSize(false);
            this.txt_money_chan4.setColor(cc.color("#FFFF00"));
            this.txt_money_chan4.setContentSize(cc.size(168,25));
            this.txt_money_chan4.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_chan4.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_text,"txt_money_chan0",cc.p(535.70,330.84),"0",RobotoRegular.fontName,20);
            this.txt_money_chan0.ignoreContentAdaptWithSize(false);
            this.txt_money_chan0.setColor(cc.color("#FFFF00"));
            this.txt_money_chan0.setContentSize(cc.size(168,25));
            this.txt_money_chan0.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_chan0.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_text,"txt_money_le1",cc.p(742.19,330.84),"0",RobotoRegular.fontName,20);
            this.txt_money_le1.ignoreContentAdaptWithSize(false);
            this.txt_money_le1.setColor(cc.color("#FFFF00"));
            this.txt_money_le1.setContentSize(cc.size(168,25));
            this.txt_money_le1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_le1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_text,"txt_money_le3",cc.p(949.23,330.84),"0",RobotoRegular.fontName,20);
            this.txt_money_le3.ignoreContentAdaptWithSize(false);
            this.txt_money_le3.setColor(cc.color("#FFFF00"));
            this.txt_money_le3.setContentSize(cc.size(168,25));
            this.txt_money_le3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_le3.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        },

        initpn_position_user : function(){
            this.addButton(this.pn_position_user,"btn_sit1",codeXocDia.BTN_SIT_1,cc.p(409.00,95.12),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit2",codeXocDia.BTN_SIT_2,cc.p(1172.35,231.21),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit3",codeXocDia.BTN_SIT_3,cc.p(1172.84,389.46),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit4",codeXocDia.BTN_SIT_4,cc.p(1172.35,563.46),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit5",codeXocDia.BTN_SIT_5,cc.p(900.79,611.74),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit6",codeXocDia.BTN_SIT_6,cc.p(384.18,611.74),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit7",codeXocDia.BTN_SIT_7,cc.p(110.18,563.46),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit8",codeXocDia.BTN_SIT_8,cc.p(112.89,389.46),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
            this.addButton(this.pn_position_user,"btn_sit9",codeXocDia.BTN_SIT_9,cc.p(115.03,231.21),true,res_XocDia + "/xocdia13.png",res_XocDia + "/xocdia13.png");
        },
        initpn_soicau : function(){
            this.addText(this.pn_soicau,"txt_total_chan",cc.p(70.76,82.44),"0",fontRobotoBold.fontName,18);
            this.txt_total_chan.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_total_chan.ignoreContentAdaptWithSize(false);
            this.txt_total_chan.setColor(cc.color.BLACK);
            this.txt_total_chan.setContentSize(cc.size(69,19));
            this.addText(this.pn_soicau,"txt_total_le",cc.p(70.76,26.10),"0",fontRobotoBold.fontName,18);
            this.txt_total_le.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_total_le.ignoreContentAdaptWithSize(false);
            this.txt_total_le.setContentSize(cc.size(69,19));
            this.addLayout(this.pn_soicau,"list_soicau",cc.p(0,0),null,cc.size(0,0),true);
        },
        initpn_user_stand : function (){
            this.addButton(this.pn_user_stand,"btn_user_stand",codeXocDia.BTN_USER_STAND,cc.p(0,0),true,res_XocDia + "/user.png",res_XocDia + "/user.png");
        },
        initpn_Out_put : function(){
            this.addButton(this.pn_Out_put,"btn_value1",codeXocDia.BTN_VALUE_1,cc.p(554.03,85),true,res_XocDia + "/xocdia03.png",res_XocDia + "/xocdia03.png");
            this.addText(this.btn_value1,"txt_value1",cc.p(33.74,34.94),"100K",fontRobotoBold.fontName,15);
            this.txt_value1.setContentSize(cc.size(40,18));
            this.addButton(this.pn_Out_put,"btn_value2",codeXocDia.BTN_VALUE_2,cc.p(630.38,85),true,res_XocDia + "/xocdia03.png",res_XocDia + "/xocdia03.png");
            this.addText(this.btn_value2,"txt_value2",cc.p(33.74,34.94),"100K",fontRobotoBold.fontName,15);
            this.txt_value2.setContentSize(cc.size(40,18));
            this.addButton(this.pn_Out_put,"btn_value3",codeXocDia.BTN_VALUE_3,cc.p(708.35,85),true,res_XocDia + "/xocdia03.png",res_XocDia + "/xocdia03.png");
            this.addText(this.btn_value3,"txt_value3",cc.p(33.74,34.94),"100K",fontRobotoBold.fontName,15);
            this.txt_value3.setContentSize(cc.size(40,18));
            this.addButton(this.pn_Out_put,"btn_value4",codeXocDia.BTN_VALUE_4,cc.p(785.27,85),true,res_XocDia + "/xocdia03.png",res_XocDia + "/xocdia03.png");
            this.addText(this.btn_value4,"txt_value4",cc.p(33.74,34.94),"100K",fontRobotoBold.fontName,15);
            this.txt_value4.setContentSize(cc.size(40,18));
            this.addButton(this.pn_Out_put,"btn_value5",codeXocDia.BTN_VALUE_5,cc.p(900,85),true,res_XocDia + "/xocdia03.png",res_XocDia + "/xocdia03.png");
            this.addText(this.btn_value5,"txt_value5",cc.p(33.74,34.94),"100K",fontRobotoBold.fontName,15);
            this.txt_value5.setContentSize(cc.size(40,18));
            this.btn_value5.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_Huy_dat",codeXocDia.BTN_HUY_DAT,cc.p(136.68,669.97),true,res_XocDia + "/xocdia-22.png",res_XocDia + "/xocdia-22.png");
            this.addButton(this.pn_Out_put,"btn_lam_cai",codeXocDia.BTN_LAM_CAI,cc.p(640.09,515.58),true,res_XocDia + "/xocdia-10.png",res_XocDia + "/xocdia-10_s.png");

            this.addButton(this.pn_Out_put,"btn_put_x2",codeXocDia.BTN_PUT_MONEY_X2,cc.p(989.18,42.33),true,res_XocDia + "/bt-03.png",res_XocDia + "/bt-03_s.png");
            this.addText(this.btn_put_x2,"txt_put_x2",cc.p(82.50,36.50),"GẤP ĐÔI",fontRobotoBold.fontName,24);
            this.txt_put_x2.ignoreContentAdaptWithSize(false);
            this.txt_put_x2.setColor(cc.color("#FFFFFF"));
            this.addButton(this.pn_Out_put,"btn_all_in",codeXocDia.BTN_PUT_ALLIN,cc.p(1158.60,42.33),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.addText(this.btn_all_in,"txt_all_in",cc.p(82.50,36.50),"TẤT TAY",fontRobotoBold.fontName,24);
            this.txt_all_in.ignoreContentAdaptWithSize(false);
            this.txt_all_in.setColor(cc.color("#FFFFFF"));

            this.addButton(this.pn_Out_put,"btn_can_tat",codeXocDia.BTN_CAN_CUA,cc.p(552.89,149.30),true,res_XocDia + "/bt-03.png",res_XocDia + "/bt-03_s.png");
            this.addText(this.btn_can_tat,"txt_can_tat",cc.p(84.50,37.50),"CÂN TẤT",fontRobotoBold.fontName,22);
            this.txt_can_tat.ignoreContentAdaptWithSize(false);
            this.txt_can_tat.setColor(cc.color("#FFFFFF"));
            this.btn_can_tat.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_ban_cua",codeXocDia.BTN_BAN_CUA,cc.p(675.05,149.30),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.btn_ban_cua.setTitleText("BÁN CHẴN");
            this.btn_ban_cua.setTitleFontName(fontRobotoBold.fontName);
            this.btn_ban_cua.setTitleFontSize(22);
            this.btn_ban_cua.setTitleColor(cc.color("#FFFFFF"));
            this.btn_ban_cua.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_huy_lam_cai",codeXocDia.BTN_HUY_LAM_CAI,cc.p(552.89,149.30),true,res_XocDia + "/bt-03.png",res_XocDia + "/bt-03_s.png");
            this.btn_huy_lam_cai.setTitleText("HỦY LÀM CÁI");
            this.btn_huy_lam_cai.setTitleFontName(fontRobotoBold.fontName);
            this.btn_huy_lam_cai.setTitleFontSize(22);
            this.btn_huy_lam_cai.setTitleColor(cc.color("#FFFFFF"));
            this.btn_huy_lam_cai.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_ban_le",codeXocDia.BTN_BAN_LE,cc.p(797.65,149.30),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.btn_ban_le.setTitleText("BÁN LẺ");
            this.btn_ban_le.setTitleFontName(fontRobotoBold.fontName);
            this.btn_ban_le.setTitleFontSize(22);
            this.btn_ban_le.setTitleColor(cc.color("#FFFFFF"));
            this.btn_ban_le.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_banker_hoantien",codeXocDia.BTN_BANKER_HOANTIEN,cc.p(797.65,149.30),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.addText(this.btn_banker_hoantien,"txt_hoan_tien",cc.p(82.34,50.66),"HOÀN TIỀN",fontRobotoBold.fontName,20);
            this.txt_hoan_tien.ignoreContentAdaptWithSize(false);
            this.txt_hoan_tien.setColor(cc.color("#FFFFFF"));
            this.addText(this.btn_banker_hoantien,"txt_money_hoan",cc.p(82.34,50.66),"100.000.000.000",fontRobotoBold.fontName,18);
            this.txt_money_hoan.ignoreContentAdaptWithSize(false);
            this.txt_money_hoan.setColor(cc.color("#933E00"));
            this.txt_money_hoan.setContentSize(cc.size(163,30));
            this.btn_banker_hoantien.setVisible(false);

            this.addButton(this.pn_Out_put,"btn_destroy_room",codeXocDia.BTN_DESTROY_ROOM,cc.p(225.25,669.97),true,res_XocDia + "/TNT.png",res_XocDia + "/TNT.png");
            this.btn_destroy_room.setVisible(false);
            this.addButton(this.pn_Out_put,"btn_chot_lai",codeXocDia.BTN_CHOT_LAI,cc.p(1068.02,669.97),true,res_XocDia + "/chotlai.png",res_XocDia + "/chotlai.png");
            this.btn_chot_lai.setVisible(false);

            this.btn_can_tat.setScale(0.7); this.btn_ban_cua.setScale(0.7);
            this.btn_huy_lam_cai.setScale(0.7); this.btn_ban_le.setScale(0.7);
        },
        initpn_user : function (){
            this.addSprite(this.pn_user,"sp_avatar",cc.p(2,-23),"res/common/avatar/Avatar_1.png");
            this.addText(this.pn_user,"txt_money",cc.p(129.55,-70.37),"100.000.000.000",fontRobotoBold.fontName,17);
            this.txt_money.ignoreContentAdaptWithSize(false);
            this.txt_money.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money.setContentSize(cc.size(149,24));
            this.txt_money.setColor(cc.color("#FEEACA"));
            this.addText(this.pn_user,"txt_nickname",cc.p(0,45),"nickname1",fontRobotoBold.fontName,16);
            this.txt_nickname.ignoreContentAdaptWithSize(false);
            this.txt_nickname.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_nickname.setContentSize(cc.size(120,25));
            this.txt_nickname.setColor(cc.color("#FF974F"));
            this.addSprite(this.pn_user,"sp_win",cc.p(2,-57),res_XocDia + "/xocdia11.png");
            this.sp_win.setVisible(false);
            this.addSprite(this.pn_user,"sp_chuong",cc.p(48.87,12.48),res_XocDia + "/iconChuong.png");
            this.sp_chuong.setVisible(false);
            this.addSprite(this.pn_user,"sp_outroom",cc.p(-48.87,10.48),res_XocDia + "/up_0013_btn_exit_room.png");
            this.sp_outroom.setVisible(false);
            this.addSprite(this.pn_user,"sp_sub_banker",cc.p(48.87,12.48),res_XocDia + "/subbanker.png");
            this.sp_sub_banker.setVisible(false);
        },
        initpn_my_money : function(){
            this.addText(this.pn_my_money,"txt_my_money_0",cc.p(390.55,371.81),"",fontRobotoBold.fontName,18);
            this.txt_my_money_0.ignoreContentAdaptWithSize(false);
            this.txt_my_money_0.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_my_money_0.setContentSize(cc.size(282,28));
            this.txt_my_money_0.setColor(cc.color("#FF974F"));
            this.addText(this.pn_my_money,"txt_my_money_1",cc.p(889.23,371.81),"",fontRobotoBold.fontName,18);
            this.txt_my_money_1.ignoreContentAdaptWithSize(false);
            this.txt_my_money_1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_my_money_1.setContentSize(cc.size(282,28));
            this.txt_my_money_1.setColor(cc.color("#FF974F"));

            this.addText(this.pn_my_money,"txt_my_money_2",cc.p(330.55,203.42),"",fontRobotoBold.fontName,18);
            this.txt_my_money_2.ignoreContentAdaptWithSize(false);
            this.txt_my_money_2.setContentSize(cc.size(168,22));
            this.txt_my_money_2.setColor(cc.color("#FF974F"));
            this.txt_my_money_2.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addText(this.pn_my_money,"txt_my_money_3",cc.p(535.70,203.42),"",fontRobotoBold.fontName,18);
            this.txt_my_money_3.ignoreContentAdaptWithSize(false);
            this.txt_my_money_3.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_my_money_3.setContentSize(cc.size(168,22));
            this.txt_my_money_3.setColor(cc.color("#FF974F"));
            this.addText(this.pn_my_money,"txt_my_money_4",cc.p(742.19,203.42),"",fontRobotoBold.fontName,18);
            this.txt_my_money_4.ignoreContentAdaptWithSize(false);
            this.txt_my_money_4.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_my_money_4.setContentSize(cc.size(168,22));
            this.txt_my_money_4.setColor(cc.color("#FF974F"));
            this.addText(this.pn_my_money,"txt_my_money_5",cc.p(949.23,203.42),"",fontRobotoBold.fontName,18);
            this.txt_my_money_5.ignoreContentAdaptWithSize(false);
            this.txt_my_money_5.setContentSize(cc.size(168,22));
            this.txt_my_money_5.setColor(cc.color("#FF974F"));
            this.txt_my_money_5.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        },
        initpn_scroll : function(){
            this.addLayout(this.pn_scroll,"shadow",cc.p(640,360),null,cc.size(1280,720),true);
            this.shadow.setColor(cc.color.BLACK);
            this.shadow.setOpacity(204);
            this.addSprite(this.pn_scroll,"bg_table",cc.p(692.01,122.50),res_XocDia + "/bg_scroll.png");
            this.addSprite(this.pn_scroll,"bg_scroll",cc.p(685.30,147.06),res_XocDia + "/xocdia-26.png");

            var uiSlider = new ccui.Slider();
            uiSlider.setTouchEnabled(true);
            var texType = ccui.Widget.LOCAL_TEXTURE;
            if (cc.spriteFrameCache.getSpriteFrame(res_XocDia + "/xocdia-25.png") )
            {
                texType = ccui.Widget.PLIST_TEXTURE;
            }

            uiSlider.loadBarTexture(res_XocDia + "/xocdia-25.png",texType);
            uiSlider.loadSlidBallTextures(res_XocDia + "/xocdia-24.png",res_XocDia + "/xocdia-24.png",res_XocDia + "/xocdia-24.png",texType);
            uiSlider.loadProgressBarTexture(res_XocDia + "/xocdia-25.png",texType);
            //uiSlider.height = 24;
            //uiSlider.weight = 407;
            this.pn_scroll.addChild(uiSlider);
            this.slider_put = uiSlider;
            this.slider_put.setPosition(cc.p(684.56, 132.62));
            this.slider_put.addEventListener(this.ClickSlecter, this);

            this.addText(this.pn_scroll,"txt_money_slider",cc.p(692.01,165.70),"100.000.000.000",fontRobotoBold.fontName,30);
            this.txt_money_slider.ignoreContentAdaptWithSize(false);
            this.txt_money_slider.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_money_slider.setContentSize(cc.size(300,40));

            this.addButton(this.pn_scroll,"btn_can_lech_cua",codeXocDia.BTN_CAN_LECH_CUA,cc.p(692.01,88.39),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.btn_can_lech_cua.setTitleText("MUA CỬA");
            this.btn_can_lech_cua.setTitleFontName(fontRobotoBold.fontName);
            this.btn_can_lech_cua.setTitleFontSize(22);
            this.btn_can_lech_cua.setTitleColor(cc.color("#FFFFFF"));
            this.btn_can_lech_cua.setVisible(false);

            this.addButton(this.pn_scroll,"btn_xac_nhan",codeXocDia.BTN_XAC_NHAN,cc.p(692.01,88.39),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.btn_xac_nhan.setTitleText("XÁC NHẬN");
            this.btn_xac_nhan.setTitleFontName(fontRobotoBold.fontName);
            this.btn_xac_nhan.setTitleFontSize(22);
            this.btn_xac_nhan.setTitleColor(cc.color("#FFFFFF"));
            this.btn_xac_nhan.setVisible(false);

            this.addButton(this.pn_scroll,"btn_close_pnscroll",codeXocDia.BTN_CLOSE_SCROLL,cc.p(893.86,181.55),true,res_XocDia + "/close_scroll.png",res_XocDia + "/close_scroll.png");
            this.btn_can_lech_cua.setScale(0.7);
            this.btn_xac_nhan.setScale(0.7);
            this.pn_scroll.setVisible(false);
        },

        initpn_buy_gate : function(){
            this.addImage(this.pn_buy_gate,"bg_buy_gate",cc.p(84.49,360.80),res_XocDia + "/bg_buy.png", cc.size(168,423));
            this.addText(this.pn_buy_gate,"txt_buy_gate",cc.p(84.49,556.04),"MUA CỬA",fontRobotoBold.fontName,20);
            this.txt_buy_gate.ignoreContentAdaptWithSize(false);
            this.txt_buy_gate.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_buy_gate.setColor(cc.color("#FFFFFF"));
            this.txt_buy_gate.setContentSize(159,23);

            this.addListView(this.pn_buy_gate, "lv_buy_gate", cc.p(84.49, 350.11), cc.size(161,384));
            this.lv_buy_gate.setTouchEnabled(true);
            this.lv_buy_gate.setClippingEnabled(true);
            this.lv_buy_gate.setScrollBarEnabled(false);
            this.pn_buy_gate.setVisible(false);
        },
        init_pn_notice_in_game : function(){
            this.addLayout(this.pn_notice_in_game,"pn_notice",cc.p(0,100),null,cc.size(0,0),true);
            this.addImage(this.pn_notice,"Image_4",cc.p(642.65,594.35),res_XocDia + "/xocdia-09.png", cc.size(576,52));
            this.addText(this.pn_notice,"txt_content_notice",cc.p(642.65,590.33),"",RobotoRegular.fontName,24);
            this.txt_content_notice.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_content_notice.ignoreContentAdaptWithSize(false);
            this.txt_content_notice.setContentSize(574,32);
            this.pn_notice.runAction(cc.fadeOut(0));
            this.pn_notice.setVisible(false);

            this.addLayout(this.pn_notice_in_game,"pn_action_ingame",cc.p(0,-230),null,cc.size(0,0),true);
            this.addImage(this.pn_action_ingame,"Image_5",cc.p(642.65,580.35),res_XocDia + "/xocdia-14.png", cc.size(432,52));
            this.addText(this.pn_action_ingame,"txt_action_ingame",cc.p(642.65,581.33),"",RobotoRegular.fontName,24);
            this.txt_action_ingame.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_action_ingame.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.txt_action_ingame.ignoreContentAdaptWithSize(false);
            this.txt_action_ingame.setContentSize(428,32);
            this.pn_action_ingame.runAction(cc.fadeOut(0));
            this.pn_action_ingame.setVisible(false);
        },
        init_pn_list_user_stand : function(){
            this.addLayout(this.pn_list_user_stand,"shadow",cc.p(640,360),null,cc.size(1280,720),true);
            this.addImage(this.pn_list_user_stand,"nen",cc.p(640,360),res_XocDia + "/xocdia-21.png", cc.size(550,387));
            this.addLayout(this.pn_list_user_stand,"Panel_3",cc.p(638.65,334.81),null,cc.size(500,300),true);
            this.Panel_3.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.Panel_3.setBackGroundColor(cc.color("#020243"));
            this.addLayout(this.pn_list_user_stand,"Panel_4",cc.p(640,332),null,cc.size(516,300),true);
            this.Panel_4.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.Panel_4.setBackGroundColor(cc.color("#4B5593"));
            this.Panel_4.setBackGroundColorOpacity(204);
            this.addText(this.pn_list_user_stand,"title",cc.p(640,526),"NGƯỜI CHƠI",RobotoRegular.fontName,34);
            this.title.setColor(cc.color("#642A00"));

            this.addButton(this.pn_list_user_stand,"btn_close_pn_list_stand",codeXocDia.BTN_CLOSE_PN_SHOW_USER_STAND,cc.p(901.62,525.25),true,res_XocDia + "/close_scroll.png",res_XocDia + "/close_scroll.png");
            this.addListView(this.pn_list_user_stand, "lv_user_stand", cc.p(640, 332.39 ), cc.size(502,287));
            this.lv_user_stand.setTouchEnabled(true);
            this.lv_user_stand.setClippingEnabled(true);
            this.lv_user_stand.setScrollBarEnabled(false);
            this.pn_list_user_stand.setVisible(false);
        },
        init_pn_confirm : function(){
            this.addLayout(this.pn_confirm,"shadow",cc.p(640,360),null,cc.size(1280,720),true);
            this.addImage(this.pn_confirm,"nen",cc.p(640,360),res_XocDia + "/xocdia-21.png", cc.size(550,387));

            this.addText(this.pn_confirm,"title",cc.p(640,526),"THÔNG BÁO",RobotoRegular.fontName,34);
            this.title.setColor(cc.color("#642A00"));

            this.addText(this.pn_confirm,"txt_content_confirm",cc.p(640,387),"0",RobotoRegular.fontName,20);
            this.txt_content_confirm.ignoreContentAdaptWithSize(false);
            this.txt_content_confirm.setContentSize(488,169);

            this.addButton(this.pn_confirm,"btn_huy_confirm",codeXocDia.BTN_HUY_CONFIRM,cc.p(527.62,228.25),true,res_XocDia + "/bt-03.png",res_XocDia + "/bt-03_s.png");
            this.btn_huy_confirm.setTitleText("HỦY");
            this.btn_huy_confirm.setTitleFontName(fontRobotoBold.fontName);
            this.btn_huy_confirm.setTitleFontSize(20);
            this.btn_huy_confirm.setTitleColor(cc.color("#FFFFFF"));
            this.btn_huy_confirm.setVisible(false);

            this.addButton(this.pn_confirm,"btn_ok_confirm",codeXocDia.BTN_OK_CONFIRM,cc.p(747.76,228.25),true,res_XocDia + "/bt-04.png",res_XocDia + "/bt-04_s.png");
            this.btn_ok_confirm.setTitleText("ĐỒNG Ý");
            this.btn_ok_confirm.setTitleFontName(fontRobotoBold.fontName);
            this.btn_ok_confirm.setTitleFontSize(20);
            this.btn_ok_confirm.setTitleColor(cc.color("#FFFFFF"));
            this.btn_ok_confirm.setVisible(false);

            this.pn_confirm.setVisible(false);
        },
        init_pn_tool  :function(){
            this.addLayout(this.pn_tool,"btn_close_pn_tool",cc.p(640,360),null,cc.size(1280,720),true);
            this.addButton(this.pn_tool,"btn_tool",codeXocDia.BTN_TOOL,cc.p(0,0),true,res_XocDia + "/pn_tool.png",res_XocDia + "/pn_tool.png");
            this.addText(this.btn_tool,"lb_tool",cc.p(83.50,47),"HUY",RobotoRegular.fontName,22);
            this.btn_tool.setScale(0);
            this.lb_tool.ignoreContentAdaptWithSize(false);
            this.lb_tool.setContentSize(127,68);
            this.pn_tool.setVisible(false);
        },

        setNameTarget : function(name, target){
            target.setName(name);
        },

        updateMoney: function(event){
            if(event.moneyType == this.moneyType)
            {
                this.txt_money.setString(formatMoney(0,3,event.currentMoney));
            }

        },

        addDataToArray : function(nickname, money){
            var check = false;
            for(var i = 0; i < this.array_buy_gate.length; i ++){
                var ob = this.array_buy_gate[i];
                if(ob.nickname == nickname){
                    var moneyold = ob.money;
                    ob.money = moneyold + money;
                    check = true;
                }
            }
            if(check == false) {
                var ob_buy = {};
                ob_buy.nickname = nickname;
                ob_buy.money = money;
                this.array_buy_gate.push(ob_buy);
            }
            this.drawDataToListBuyGate();
        },
        drawDataToListBuyGate : function (){
            this.lv_buy_gate.removeAllItems();
            this.lv_buy_gate.removeAllChildren();
            var cellHeight = 47;
            var  font1 = {fontName:"Roboto-Bold", src:[{src:"res/Font/Roboto-Bold.ttf", type:"truetype"}]};
            var  font2 = {fontName:"Roboto-Regular", src:[{src:"res/Font/Roboto-Regular.ttf", type:"truetype"}]};
            for(var i = 0; i<this.array_buy_gate.length; i++){
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_buy_gate.width;
                cellList.setPosition(cc.p(0,0));

                var bg_buy = new cc.Sprite();
                bg_buy.initWithFile("res/CardGame/ResXocDia/chid_buy.png",cc.rect(0,0,139,45));
                bg_buy.setPosition(cc.p(this.lv_buy_gate.getPositionX() - 5,cellHeight/2));

                var lb_nickname =  new cc.LabelTTF('',  font1.fontName, 16, cc.size(117,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lb_nickname.setPosition(cc.p(bg_buy.getPositionX(),bg_buy.getPositionY() + 10));
                var nick = this.array_buy_gate[i].nickname;
                if(nick.length >=12){
                    var sub = nick.substr(0,9);
                    nick = sub + "...";
                }
                lb_nickname.setString(nick);
                lb_nickname.setColor(cc.color("#FF6800"));

                var lb_money =  new cc.LabelTTF('',  font1.fontName, 16, cc.size(117,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lb_money.setPosition(cc.p(bg_buy.getPositionX(),bg_buy.getPositionY() - 10));
                lb_money.setString(formatMoney(0,3,this.array_buy_gate[i].money));
                if(this.moneyType == 1)
                    lb_money.setColor(cc.color("#E702FE"));
                else
                    lb_money.setColor(cc.color("#c0c1c3"));

                cellList.addChild(bg_buy);
                cellList.addChild(lb_nickname);
                cellList.addChild(lb_money);
                this.lv_buy_gate.pushBackCustomItem(cellList);
            }
            //if(this.array_buy_gate.length >= 8)
            //    this.bg_buy_gate._setHeight(8*47 + 40);
            //else
            //    this.bg_buy_gate._setHeight(this.array_buy_gate.length*47 + 40);
        },

        ClickSlecter : function(){
            var percent = this.slider_put.getPercent();
            var value = parseInt((percent/100)*this.max_money_slider);
            if(value <= 0)
                value = 1;
            this.value_slider = value;
            this.txt_money_slider.setString(formatMoney(0,3,this.value_slider));
        },
        setCheat : function(){
            var txt = this.tf_cheat.getString();
            var splittxt = txt.split(',');
            var leng = splittxt.length;
            if(leng == 4) {
                if (gameWsClient != null) {
                    var pk = new XocDia.CmdSendCheat();
                    pk.putData(splittxt[0], splittxt[1], splittxt[2], splittxt[3]);
                    gameWsClient.send(pk);
                    pk.clean();
                    this.showNotice("Đã set kết quả");
                }
            }else{
                this.showNotice("nhap sai kieu roi");
            }
        },
        onUpdateGui: function(pk) {
            // game state
            var stringNotify;
            if(pk.gameState == 0){
                stringNotify = "Vui lòng đợi ván chơi mới!";
                this.STATE_XOC_DIA = 0;
            }else if (pk.gameState == 1) {
                stringNotify = "Bắt đầu ván mới!";
                this.STATE_XOC_DIA = 1;
            } else if (pk.gameState == 2) {
                stringNotify = "Bắt đầu đặt cửa!";
                this.STATE_XOC_DIA = 2;
            } else if (pk.gameState == 3) {
                stringNotify = "Bắt đầu bán cửa!";
                this.STATE_XOC_DIA = 3;
            }else if (pk.gameState == 4) {
                stringNotify = "Nhà cái cân tiền, hoàn tiền!";
                this.STATE_XOC_DIA = 4;
            } else if (pk.gameState == 5) {
                stringNotify = "Bắt đầu hoàn tiền!";
                this.STATE_XOC_DIA = 5;
            } else if (pk.gameState == 6) {
                stringNotify = "Bắt đầu trả thưởng!";
                this.STATE_XOC_DIA = 6;
            }

            if(this.STATE_XOC_DIA == 3 || this.STATE_XOC_DIA == 4 || this.STATE_XOC_DIA == 5 || this.STATE_XOC_DIA == 6){
                this.btn_put_x2.setEnabled(false);
                this.btn_put_x2.setBright(false);
                this.txt_put_x2.setColor(cc.color("#BFBFBF"));
                this.btn_all_in.setEnabled(false);
                this.btn_all_in.setBright(false);
                this.txt_all_in.setColor(cc.color("#BFBFBF"));
            }

            if(pk.gameState == 3 || pk.gameState == 4 || pk.gameState == 5 || pk.gameState == 6){
                this.showNotice("Vui lòng đợi ván chơi mới!");
            }

            this.moneyType = pk.moneyType;
            for(var i = 1; i < 9; i ++){
                this.addPlayer(i);
            }
            if(this.moneyType == MONEY_VIN){
                // add btn moi choi
                cc.log("tao nut moi choi");
                this.btn_moichoi = new ButtonMoiChoi();
                this.addChild(this.btn_moichoi);
            }
            if(this.moneyType == 0) {
                this.txt_money.setColor(cc.color("#c0c1c3"));
                this.txt_money_slider.setColor(cc.color("#c0c1c3"));
                this.txt_money_slider.enableOutline(cc.p("#BFBFBF"),1);
            }else {
                this.txt_money.setColor(cc.color("#E702FE"));
                this.txt_money_slider.setColor(cc.color("#E702FE"));
                this.txt_money_slider.enableOutline(cc.p("#BFBFBF"),1);
            }

            if(pk.gameState == 0){
                this.clock.setVisible(false);
                this.clockShadow.setVisible(false);
            }else{
                this.clock.setVisible(true);
                this.clockShadow.setVisible(true);
                this.pn_bat_dia.setVisible(true);
            }

            this.showActionInGame(stringNotify);
            this.save_roomId = pk.roomId;
            this.txt_info.setString("Bàn: " + pk.roomId);
            this.txt_table.setString("#" + pk.gameId);
            this.save_muccuoc = pk.moneyBet;
            if(pk.countTime > 0)
                this.countTime(pk.countTime);
            this.pn_user.setPosition(cc.p(this.btn_sit1.x,this.btn_sit1.y));
            this.sp_avatar.setTexture(menutab.getlinkAvatar(lobby.userInfo.avatar));

            this.txt_nickname.setString(lobby.userInfo.nickname);
            this.txt_money.setString(formatMoney(0,3,pk.money));
            if(pk.banker == true) {
                this.sp_chuong.setVisible(true);
                this.btn_lam_cai.setEnabled(false);
                this.btn_lam_cai.setBright(false);
                this.btn_lam_cai.setVisible(false);
                if(this.is_pause_btn == false) {
                    cc.eventManager.pauseTarget(this.btn_lam_cai, true);
                    this.is_pause_btn = true;
                }
                if(pk.rule == 2) {
                    this.masterRoom = true;
                    this.btn_destroy_room.setVisible(true);
                    if(pk.bossReqDestroy == true)
                        this.showNotice("Bạn đã đăng ký hủy phòng!");
                }
            }
            if(pk.isSubBanker == true) {
                this.sp_sub_banker.setVisible(true);
                this.Subbanker = "me";
            }
            if(pk.banker == true) {
                this.banker = "me";
                this.save_place_banker = this.pn_user;
                this.btn_put_x2.setEnabled(false);
                this.btn_put_x2.setBright(false);
                this.txt_put_x2.setColor(cc.color("#BFBFBF"));
                this.btn_all_in.setEnabled(false);
                this.btn_all_in.setBright(false);
                this.txt_all_in.setColor(cc.color("#BFBFBF"));
            }
            if(pk.rule == 1) {
                this.roomWorld = true;
                this.chan4.setVisible(false);
                this.chan0.setVisible(false);
                this.le1.setVisible(false);
                this.le3.setVisible(false);
                this.pn_ratio_vi.setVisible(false);
                this.btn_put_chan4.setVisible(false);
                this.btn_put_chan0.setVisible(false);
                this.btn_put_le1.setVisible(false);
                this.btn_put_le3.setVisible(false);
                this.bg_soicau.setVisible(false);
                this.bg_soicau_100.setVisible(true);
                this.txt_total_chan.setPosition(cc.p(288.68, 287.90));
                this.txt_total_le.setPosition(cc.p(288.68, 228.90));
                this.btn_lam_cai.setVisible(false);
                cc.eventManager.pauseTarget(this.btn_lam_cai, true);
            }
            this.setPhing(pk.moneyBet);
            if(this.STATE_XOC_DIA == 3){
                if(this.banker == "me"){
                    if(pk.purchaseStatus == 0){
                        this.btn_can_tat.setVisible(true);
                        this.btn_ban_cua.setVisible(true);
                        this.btn_ban_le.setVisible(true);
                        this.info_sell_chan = pk.moneyPurchaseEven;
                        this.info_sell_le = pk.moneyPurchaseOdd;
                        this.btn_huy_lam_cai.setVisible(false);
                    }else if(pk.purchaseStatus == 1){
                        this.txt_can_tat.setString("CÂN NỐT");
                        this.btn_can_tat.setVisible(true);
                        this.btn_can_tat.setEnabled(false);
                        this.btn_can_tat.setBright(false);
                        this.txt_can_tat.setColor(cc.color("#BFBFBF"));

                        this.btn_banker_hoantien.setVisible(true);
                        this.btn_banker_hoantien.setEnabled(false);
                        this.btn_banker_hoantien.setBright(false);
                        this.txt_hoan_tien.setColor(cc.color("#BFBFBF"));
                        this.txt_money_hoan.setColor(cc.color("#BFBFBF"));
                        this.txt_money_hoan.setString(formatMoney(0,3,pk.moneyRemain));

                        this.btn_huy_lam_cai.setVisible(false);
                        if(pk.potPurchase == 0)
                            this.showNotice("Nhà cái đang bán cửa chẵn");
                        else
                            this.showNotice("Nhà cái đang bán cửa lẻ");
                    }
                }else{
                    if(pk.purchaseStatus == 1){
                        var currentmoney = 0;
                        if(this.moneyType == 1)
                            currentmoney = lobby.userInfo.vinTotal;
                        else
                            currentmoney = lobby.userInfo.xuTotal;
                        if(currentmoney > pk.moneyRemain){
                            this.showSlider(pk.moneyRemain);
                            this.btn_can_lech_cua.setVisible(true);
                        }else{
                            if(currentmoney > 0) {
                                this.showSlider(currentmoney);
                                this.btn_can_lech_cua.setVisible(true);
                            }
                        }
                        if(pk.potPurchase == 0) {
                            this.showNotice("Nhà cái đang bán cửa chẵn");
                            this.btn_can_lech_cua.setTitleText("MUA CHẴN");
                        }else {
                            this.showNotice("Nhà cái đang bán cửa lẻ");
                            this.btn_can_lech_cua.setTitleText("MUA LẺ");
                        }
                    }
                }
                if(pk.subListCount > 0) {
                    if(pk.potPurchase == 0)
                        this.txt_buy_gate.setString("MUA CHẴN");
                    else
                        this.txt_buy_gate.setString("MUA LẺ");
                    this.on_show_buy_gate.setVisible(true);
                    this.pn_buy_gate.setVisible(true);
                    this.array_buy_gate = pk.list_buy_gate;
                    this.drawDataToListBuyGate();
                }
            }

            this.txt_ratio_chan.setString("(1x" + (pk.potID[0].ratio/100) +")");
            this.txt_ratio_le.setString("(1x" + (pk.potID[1].ratio/100) +")");
            this.txt_ratio_chan4.setString("(1x" + (pk.potID[2].ratio/100) +")");
            this.txt_ratio_chan0.setString("(1x" + (pk.potID[3].ratio/100) +")");
            this.txt_ratio_le1.setString("(1x" + (pk.potID[4].ratio/100) +")");
            this.txt_ratio_le3.setString("(1x" + (pk.potID[5].ratio/100) +")");

            for(var i = 0; i < 6; i ++) {
                this.maxMoneyBet[i] = pk.potID[i].maxMoneyBet;
                if(pk.potID[i].isLock == true) {
                    this.lockByGate[i] = 1;
                    this["lockgate" + i].setVisible(true);
                }
                this.drawAllPot(i, pk.potID[i].totalMoney);
                this.array_save_ratio.push(pk.potID[i].ratio);
                if(parseInt(pk.potID[i].moneyBet) > 0)
                    this["txt_my_money_" + i].setString(formatMoney(0,3,parseInt(pk.potID[i].moneyBet)));
            }

            this.listAllPlayer = pk.playerInfos;
            for(var i = 0; i<this.listAllPlayer.length; i ++){
                if(this.listAllPlayer[i].reqKickroom == true){
                    this.save_user_order_kick.push(this.listAllPlayer[i].nickname);
                }
            }
            this.save_number_playing = pk.playerInfos.length;
            cc.log("number player : " + this.save_number_playing);
            var number_in_list_sit = 9;
            var have_banker = false;

            if(this.banker == "me") {
            }else{
                var check = false;
                for (var i = 0; i < this.listAllPlayer.length; i++) {
                    if(this.listAllPlayer[i].banker == true){
                        this.listPlayerSit.push(this.listAllPlayer[i]);
                        this.listAllPlayer.splice(i, 1);
                        check = true;
                        break;
                    }
                }
                if(check == false)
                    number_in_list_sit = 9;
                else {
                    number_in_list_sit = 8;
                    have_banker = true;
                }
            }
            if (this.listAllPlayer.length >= number_in_list_sit) {
                for (var i = 0; i < (number_in_list_sit - 1); i++) {
                    var ran = getRandomInt(0, (this.listAllPlayer.length - 1));
                    this.listPlayerSit.push(this.listAllPlayer[ran]);
                    this.listAllPlayer.splice(ran, 1);
                }
                this.listPlayerStand = this.listAllPlayer;
            } else {
                for(var i = 0; i < this.listAllPlayer.length; i ++){
                    this.listPlayerSit.push(this.listAllPlayer[i])
                }
            }

            for(var i = 0; i < this.listPlayerSit.length; i ++){
                if(i == 0){
                    if(have_banker == true){
                        var ran = 3;
                        this.arrayPlace.splice(ran,1);
                    }else {
                        var ran = this.getRandomPlacePlayer();
                    }
                }else{
                    var ran = this.getRandomPlacePlayer();
                }
                this.drawPlayerJoinRoom(ran, this.listPlayerSit[i].nickname, parseInt(this.listPlayerSit[i].avatar), this.listPlayerSit[i].money, this.listPlayerSit[i].banker, this.listPlayerSit[i].isSubBanker);

            }
            this.checkHideUserStand();
            this.funGetCau();

            var ran = getRandomInt(1,3);
            this.Is_dealer = ran;
            this.changedealer(this.Is_dealer);
            this.SetTextButtonPhing();

            if(this.STATE_XOC_DIA == 0 || this.STATE_XOC_DIA == 1 || this.STATE_XOC_DIA == 2){
                if(this.masterRoom == true){
                    this.btn_chot_lai.setVisible(true);
                }
            }else{
                this.btn_chot_lai.setVisible(false);
            }

            this.pn_soicau.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
                if(GameScene.gameGui.banker != "") {
                    if (GameScene.gameGui.banker == "me") {
                        if (pk.bankerReqDestroy == true) {
                            GameScene.gameGui.save_order_huy_lam_cai = true;
                            GameScene.gameGui.btn_huy_lam_cai.setVisible(false);
                            GameScene.gameGui.btn_lam_cai.setVisible(false);
                        }else{
                            if(GameScene.gameGui.STATE_XOC_DIA != 1 && GameScene.gameGui.STATE_XOC_DIA != 3 || GameScene.gameGui.STATE_XOC_DIA != 4) {
                                if(GameScene.gameGui.masterRoom == false)
                                    GameScene.gameGui.btn_huy_lam_cai.setVisible(true);
                            }
                        }
                    } else {
                        if (pk.bankerReqDestroy == true) {
                            GameScene.gameGui.showNotice("Nhà cái đã xin dừng làm cái!");
                            GameScene.gameGui.btn_lam_cai.setVisible(true);
                        }
                    }
                }
            })));
        },
        SetTextButtonPhing : function(){
            if(this.moneyType == 0){
                for(var i = 1; i < 6; i ++){
                    this["btn_value" + i].loadTextureNormal("res/CardGame/ResXocDia/xocdia03_s.png");
                    this["btn_value" + i].loadTexturePressed("res/CardGame/ResXocDia/xocdia03_s.png");
                    this["txt_value" + i].setColor(cc.color("#c0c1c3"));
                }
            }else{
                for(var i = 1; i < 6; i ++){
                    this["txt_value" + i].setColor(cc.color("#E702FE"));
                }
            }
        },
        checkHideUserStand : function(){
            if(this.listPlayerStand.length >= 1) {
                this.pn_user_stand.setVisible(true);
            }else
                this.pn_user_stand.setVisible(false);
        },

        updateTime : function(dt){
            var time = new Date().getTime();

            if(Math.abs(time - 3100) <= this.save_time_new && this.save_time_new <= Math.abs(time + 3100)){
                //cc.log()
            }else{
                this.funGetTime();
                this.drawStatusInTimePut();
            }
            this.save_time_new = time;
        },

        getRandomPlacePlayer : function(){
            var ran = getRandomInt(0,(this.arrayPlace.length - 1));
            var place = this.arrayPlace[ran];
            this.arrayPlace.splice(ran,1);
            return place;
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeXocDia.BTN_CHOT_LAI:
                   this.funChotLai();
                    break;
                case codeXocDia.BTN_DESTROY_ROOM:
                    if(this.is_destroy_room == false)
                        this.showNoticeConfirm("Bạn có chắc chắn muốn hủy bàn chơi?", 1);
                    else
                        this.showNoticeConfirm("Bạn có chắc chắn muốn duy trì bàn chơi?", 1);
                    break;
                case codeXocDia.BTN_CLOSE_PN_SHOW_USER_STAND:
                    this.pn_list_user_stand.setVisible(false);
                    this.isOpenPlayerStand = false;
                    break;
                case codeXocDia.BTN_USER_STAND:
                    this.showUserStand();
                    break;
                case codeXocDia.BTN_ON_SHOW_BUY_GATE:
                    if(this.is_show_buy_gate == true) {
                        this.is_show_buy_gate = false;
                        this.pn_buy_gate.runAction(cc.scaleTo(0.2, 0, 1));
                        this.on_show_buy_gate.setPosition(cc.p(19.97, 377.88));
                        this.on_show_buy_gate.setRotation(0);
                    }else{
                        this.is_show_buy_gate = true;
                        this.pn_buy_gate.runAction(cc.scaleTo(0.2, 1, 1));
                        this.on_show_buy_gate.setPosition(cc.p(187.79, 541.88));
                        this.on_show_buy_gate.setRotation(180);
                    }
                    break;
                case codeXocDia.BTN_OK_CONFIRM:
                    if(this.kind_confirm == 0) {
                        this.funHuyLamCai();
                    }else if(this.kind_confirm == 1){
                        this.funSendDestroyRoom();
                    }else{
                        if(gameWsClient != null) {
                            var pk = new XocDia.CmdSendKickUserXocDia();
                            pk.putData(this.nicknameKick);
                            gameWsClient.send(pk);
                            pk.clean();
                            this.pn_confirm.setVisible(false);
                        }
                    }
                    break;
                case codeXocDia.BTN_HUY_CONFIRM:
                    this.pn_confirm.setVisible(false);
                    break;
                case codeXocDia.BTN_HUY_LAM_CAI:
                    this.showNoticeConfirm("Bạn có chắc chắn muốn dừng làm cái?", 0);
                    break;
                case codeXocDia.BTN_BAN_LE:
                    this.chose_chan_le = 3;
                    this.showSlider(this.info_sell_le);
                    this.btn_can_tat.setVisible(false);
                    this.btn_ban_cua.setVisible(false);
                    this.btn_ban_le.setVisible(false);
                    this.btn_xac_nhan.setVisible(true);
                    this.btn_close_pnscroll.setVisible(true);
                    this.txt_content_pnscroll.setString("BÁN CỬA LẺ");
                    this.btn_xac_nhan.setTitleText("BÁN LẺ");
                    break;
                case codeXocDia.BTN_BAN_CUA:
                    this.chose_chan_le = 2;
                    this.showSlider(this.info_sell_chan);
                    this.btn_can_tat.setVisible(false);
                    this.btn_ban_cua.setVisible(false);
                    this.btn_ban_le.setVisible(false);
                    this.btn_xac_nhan.setVisible(true);
                    this.btn_close_pnscroll.setVisible(true);
                    this.btn_xac_nhan.setTitleText("BÁN CHẴN");
                    break;
                case codeXocDia.BTN_CAN_LECH_CUA:
                    this.funCanLechCua();
                    break;
                case codeXocDia.BTN_CAN_CUA:
                    if(this.STATE_XOC_DIA == 3) {
                        this.funCanCuaBanCua(1, 100);
                    }else{
                        this.funBankerCanNotTien(1);
                    }
                    break;
                case codeXocDia.BTN_XAC_NHAN:
                    this.funCanCuaBanCua(this.chose_chan_le, this.value_slider);
                    break;
                case codeXocDia.BTN_BANKER_HOANTIEN:
                    this.funBankerCanNotTien(2);
                    break;
                case codeXocDia.BTN_PUT_ALLIN:
                    if(this.STATE_XOC_DIA ==2) {
                        if (this.is_all_in == false) {
                            if(this.moneyType == 1)
                                var currentmoney = lobby.userInfo.vinTotal;
                            else
                                var currentmoney = lobby.userInfo.xuTotal;
                            if(currentmoney <= 0){
                                this.showNotice("Bạn không đủ tiền!");
                                return;
                            }
                            this.btn_all_in.setBright(false);
                            this.txt_all_in.setColor(cc.color("#BFBFBF"));
                            this.is_all_in = true;
                            this.showNotice("Chọn cửa bạn muốn Tất tay!");
                        } else {
                            this.btn_all_in.setBright(true);
                            this.is_all_in = false;
                            this.txt_all_in.setColor(cc.color("#FFFFFF"));
                        }
                    }
                    break;
                case codeXocDia.BTN_PUT_MONEY_X2:
                    if(this.STATE_XOC_DIA ==2)
                        this.funSendPutMoneyX2();
                    break;
                case codeXocDia.BTN_BACKROOM:
                    this.funSendBackRoom();
                    break;
                case codeXocDia.BTN_CHAT:
                    this.onButtonChat();
                    break;
                case codeXocDia.BTN_INFO:
                    this.onButtonInfo();
                    break;
                case codeXocDia.BTN_HUY_DAT:
                    this.Is_dealer = this.Is_dealer + 1;
                    if(this.Is_dealer >= 4)
                        this.Is_dealer = 1;
                    this.changedealer(this.Is_dealer);
                    break;
                case codeXocDia.BTN_LAM_CAI:
                    this.funOrderBanker();
                    break;
                case codeXocDia.BTN_SIT_2:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_3:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_4:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_5:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_6:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_7:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_8:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_SIT_9:
                    if(gameWsClient){
                        gameWsClient.sendGetInfoMoiChoi();
                    }
                    break;
                case codeXocDia.BTN_PUT_CHAN:
                    if(this.STATE_XOC_DIA ==2) {
                        var check = this.showMessagePut(0);
                        if(check == false) return;
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(0);
                        else
                            this.funSendValuePut(0, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_PUT_LE:
                    if(this.STATE_XOC_DIA ==2) {
                        var check = this.showMessagePut(1);
                        if(check == false) return;
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(1);
                        else
                            this.funSendValuePut(1, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_PUT_CHAN4:
                    var check = this.showMessagePut(2);
                    if(check == false) return;
                    if(this.checkLockGate(2)){
                        this.showNotice("Nhà cái đang tạm khóa cửa này!");
                        return;
                    }
                    if(this.STATE_XOC_DIA ==2) {
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(2);
                        else
                            this.funSendValuePut(2, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_PUT_CHAN0:
                    var check = this.showMessagePut(3);
                    if(check == false) return;
                    if(this.checkLockGate(3)){
                        this.showNotice("Nhà cái đang tạm khóa cửa này!");
                        return;
                    }
                    if(this.STATE_XOC_DIA ==2) {
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(3);
                        else
                            this.funSendValuePut(3, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_PUT_LE1:
                    var check = this.showMessagePut(4);
                    if(check == false) return;
                    if(this.checkLockGate(4)){
                        this.showNotice("Nhà cái đang tạm khóa cửa này!");
                        return;
                    }
                    if(this.STATE_XOC_DIA ==2) {
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(4);
                        else
                            this.funSendValuePut(4, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_PUT_LE3:
                    var check = this.showMessagePut(5);
                    if(check == false) return;
                    if(this.checkLockGate(5)){
                        this.showNotice("Nhà cái đang tạm khóa cửa này!");
                        return;
                    }
                    if(this.STATE_XOC_DIA ==2) {
                        if(this.is_all_in == true)
                            this.funSendPutMoneyAllIn(5);
                        else
                            this.funSendValuePut(5, this.valuePut);
                    }else{
                        this.showNotice("Vui lòng đợi ván chơi mới!");
                    }
                    break;
                case codeXocDia.BTN_VALUE_1:
                    if(this.valuePut != this.value1)
                        this.funJumpValue(this.btn_value1,85.00, this.value1);
                    break;
                case codeXocDia.BTN_VALUE_2:
                    if(this.valuePut != this.value2)
                        this.funJumpValue(this.btn_value2,85.00, this.value2);
                    break;
                case codeXocDia.BTN_VALUE_3:
                    if(this.valuePut != this.value3)
                        this.funJumpValue(this.btn_value3,85.00, this.value3);
                    break;
                case codeXocDia.BTN_VALUE_4:
                    if(this.valuePut != this.value4)
                        this.funJumpValue(this.btn_value4,85.00, this.value4);
                    break;
                case codeXocDia.BTN_VALUE_5:
                    if(this.valuePut != this.value5)
                        this.funJumpValue(this.btn_value5,85.00, this.value5);
                    break;
                case codeXocDia.BTN_CLOSE_SCROLL:
                    this.pn_scroll.setVisible(false);
                    if(this.banker == "me"){
                        this.btn_can_tat.setVisible(true);
                        this.btn_ban_cua.setVisible(true);
                        this.btn_ban_le.setVisible(true);
                    }else{
                        this.is_dont_want_buy = true;
                    }
                    break;
                case codeXocDia.BTN_CLOSE_PN_TOOL:
                    this.closeToolXocDia();
                    break;
                case codeXocDia.BTN_TOOL:
                    this.funSendLockGate();
                    this.closeToolXocDia();
                    break;
            }
        },
        showSlider : function(max){
            this.slider_put.setPercent(100);
            this.pn_scroll.setVisible(true);
            this.max_money_slider = max;
            this.value_slider = max;
            this.txt_money_slider.setString(formatMoney(0,3,this.value_slider));
        },
        funBankerCanNotTien : function(action){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendActionBanker();
                pk.putData(action);
                gameWsClient.send(pk);
                pk.clean();
                this.btn_can_tat.setVisible(false);
                this.btn_banker_hoantien.setVisible(false);
            }
        },
        funCanLechCua : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendBuyGate();
                pk.putData(this.value_slider);
                gameWsClient.send(pk);
                pk.clean();
                this.btn_can_lech_cua.setVisible(false);
            }
        },
        funCanCuaBanCua : function(action, money){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendBankerSellGate();
                if(money == 0){
                    this.btn_can_tat.setVisible(true);
                    if(this.info_sell_chan > 0)
                        this.btn_ban_cua.setVisible(true);
                    if(this.info_sell_le > 0)
                        this.btn_ban_le.setVisible(true);
                    this.btn_xac_nhan.setVisible(false);
                    this.pn_scroll.setVisible(false);
                    return;
                }
                pk.putData(action, money);
                gameWsClient.send(pk);
                pk.clean();
                if(action == 1) {
                    this.btn_can_tat.setVisible(false);
                }else{
                    this.pn_buy_gate.setVisible(true);
                    this.on_show_buy_gate.setVisible(true);
                    this.txt_can_tat.setString("CÂN NỐT");
                    this.btn_can_tat.setVisible(true);
                    this.btn_can_tat.setEnabled(false);
                    this.btn_can_tat.setBright(false);
                    this.txt_can_tat.setColor(cc.color("#BFBFBF"));
                    if(this.masterRoom == false)
                        this.btn_huy_lam_cai.setVisible(true);
                    this.btn_banker_hoantien.setVisible(true);
                    this.btn_banker_hoantien.setEnabled(false);
                    this.btn_banker_hoantien.setBright(false);
                    this.txt_hoan_tien.setColor(cc.color("#BFBFBF"));
                    this.txt_money_hoan.setColor(cc.color("#BFBFBF"));

                    if(action == 2)
                        this.txt_money_hoan.setString(formatMoney(0,3,money));
                    else
                        this.txt_money_hoan.setString(formatMoney(0,3,money));
                    if(money == 0){
                        this.btn_banker_hoantien.setVisible(false);
                    }
                }
                this.btn_ban_cua.setVisible(false);
                this.btn_ban_le.setVisible(false);
                this.btn_xac_nhan.setVisible(false);
                this.pn_scroll.setVisible(false);
            }
        },
        funSendPutMoneyAllIn : function(potid){
            if(this.lockByGate[potid] == 1){
                this.showNotice("Nhà cái đã khóa cửa này!");
                return;
            }
            //if(this.roomWorld == false) {
            //    if(this.banker != "") {
            //        if (this.MoneyReviceServer[potid] >= this.maxMoneyBet[potid]) {
            //            this.showNotice("Không thể đặt quá hạn mức của cửa!");
            //            return;
            //        }
            //    }
            //}

            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendPutAllIn();
                pk.putData(potid);
                gameWsClient.send(pk);
                pk.clean();
            }
        },
        funSendPutMoneyX2 : function(){
            var check = false;
            for(var i = 0; i < 6; i ++) {
                if (this.my_put_money[i] > 0){
                    check = true;
                }
            }
            if(check == false){
                this.showNotice("Bạn chưa đặt cửa!");
                return;
            }

            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendPutMoneyX2();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
        },
        funSendBackRoom : function(){
            if(this.masterRoom == true){
                if (gameWsClient != null) {
                    var pk = new XocDia.CmdSendRequestLeaveGame();
                    pk.putData();
                    gameWsClient.send(pk);
                    pk.clean();
                }
                GameManager.getInstance().backToSelectRoom();
                menutab.Isingame = false;
            }else {
                if (gameWsClient != null) {
                    var pk = new XocDia.CmdSendRequestLeaveGame();
                    pk.putData();
                    gameWsClient.send(pk);
                    pk.clean();
                }
            }
        },
        funOrderBanker : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendOrderBanker();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                this.btn_lam_cai.setEnabled(false);
                this.btn_lam_cai.setBright(false);
                this.btn_lam_cai.setVisible(false);
                if(this.is_pause_btn == false) {
                    cc.eventManager.pauseTarget(this.btn_lam_cai, true);
                    this.is_pause_btn = true;
                }
            }
        },
        funHuyLamCai : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendHuyLamCai();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                this.btn_huy_lam_cai.setVisible(false);
                this.pn_confirm.setVisible(false);
            }
        },
        funGetCau : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendGetCau();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
        },

        addPlayer : function(i){
            var panel = new ccui.Layout();
            this["pn_player_"+i] = panel;
            panel.setBackGroundColorOpacity(0);
            this.pn_list_player.addChild(panel);

            var avatar = new ccui.Button();
            avatar.loadTextureNormal(menutab.getlinkAvatar(0));
            avatar.loadTexturePressed(menutab.getlinkAvatar(0));
            avatar.setName("avatar" + i);
            avatar.setScale(0.8);
            avatar.setPosition(cc.p(0, 10));
            panel.addChild(avatar);

            var btn_kick = new ccui.Button();
            btn_kick.loadTextureNormal("res/CardGame/ResXocDia/kick.png");
            btn_kick.loadTexturePressed("res/CardGame/ResXocDia/kick.png");
            btn_kick.setName("bnkick" + i);
            btn_kick.setScale(0.8);
            if(i == 1 || i == 2 || i == 3 || i == 5) {
                btn_kick.setPosition(cc.p(avatar.getPosition().x + 58, avatar.getPosition().y - 36));
            }else{
                btn_kick.setPosition(cc.p(avatar.getPosition().x - 58, avatar.getPosition().y - 36));
            }
            btn_kick.setVisible(false);
            panel.addChild(btn_kick);

            btn_kick.addTouchEventListener(function (sender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_ENDED:
                        this.touchAvatar(sender.name);
                        break;
                }

            }, this);

            if(i == 4) {
                var txt_nickname = new cc.LabelTTF("twestfaassdasdddasddd", RobotoRegular.fontName, 16,cc.size(175,25),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                txt_nickname.setPosition(cc.p(avatar.getPosition().x + 140, avatar.getPosition().y - 20));
            }else if(i == 5) {
                var txt_nickname = new cc.LabelTTF("twestfaassdasdddasddd", RobotoRegular.fontName, 16,cc.size(175,25),cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                txt_nickname.setPosition(cc.p(avatar.getPosition().x - 140, avatar.getPosition().y - 20));
            }else {
                var txt_nickname = new cc.LabelTTF("twestfaassdasdddasddd", RobotoRegular.fontName, 16);
                txt_nickname.setPosition(cc.p(avatar.getPosition().x, avatar.getPosition().y - 60));
            }
            txt_nickname.setName("nickname");
            txt_nickname.setColor(cc.color("#FF6800"));
            panel.addChild(txt_nickname);

            if(i == 4) {
                var txt_money = new cc.LabelTTF("100.000.000.000", RobotoRegular.fontName, 16,cc.size(175,25), cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                txt_money.setPosition(cc.p(txt_nickname.getPosition().x,txt_nickname.getPosition().y - 20));
            }else if(i == 5) {
                var txt_money = new cc.LabelTTF("100.000.000.000", RobotoRegular.fontName, 16,cc.size(175,25), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                txt_money.setPosition(cc.p(txt_nickname.getPosition().x,txt_nickname.getPosition().y - 20));
            }else {
                var txt_money = new cc.LabelTTF("100.000.000.000", RobotoRegular.fontName, 16);
                txt_money.setPosition(cc.p(txt_nickname.getPosition().x, txt_nickname.getPosition().y - 20));
            }
            txt_money.setName("money");
            if(this.moneyType == 0) {
                txt_money.setColor(cc.color("#c0c1c3"));
            }else {
                txt_money.setColor(cc.color("#E702FE"));
            }
            panel.addChild(txt_money);

            var sp_win = new cc.Sprite();
            sp_win.initWithFile("res/CardGame/ResXocDia/xocdia11.png",cc.rect(0,0,135,64));
            sp_win.setName("sp_win");
            sp_win.setPosition(cc.p(avatar.getPosition().x,avatar.getPosition().y - 40));
            sp_win.setVisible(false);
            panel.addChild(sp_win);

            var sp_chuong = new cc.Sprite();
            sp_chuong.initWithFile("res/CardGame/ResXocDia/iconChuong.png",cc.rect(0,0,37,36));
            sp_chuong.setName("sp_chuong");
            sp_chuong.setPosition(cc.p(avatar.getPosition().x + 45,avatar.getPosition().y + 45));
            sp_chuong.setVisible(false);
            panel.addChild(sp_chuong);

            var sp_sub_banker = new cc.Sprite();
            sp_sub_banker.initWithFile("res/CardGame/ResXocDia/subbanker.png",cc.rect(0,0,37,36));
            sp_sub_banker.setName("sp_sub_banker");
            sp_sub_banker.setPosition(cc.p(avatar.getPosition().x + 45,avatar.getPosition().y + 45));
            sp_sub_banker.setVisible(false);
            panel.addChild(sp_sub_banker);

            var sp_outroom = new cc.Sprite();
            sp_outroom.initWithFile("res/CardGame/ResXocDia/up_0013_btn_exit_room.png",cc.rect(0,0,37,41));
            sp_outroom.setName("sp_outroom");
            sp_outroom.setPosition(cc.p(avatar.getPosition().x - 45,avatar.getPosition().y + 42));
            sp_outroom.setVisible(false);
            panel.addChild(sp_outroom);

            panel.setPosition(cc.p(this["btn_sit" + (i+1)].getPosition().x,this["btn_sit" + (i+1)].getPosition().y));
            panel.setVisible(false);
        },
        touchAvatar : function(name){
            if(this.masterRoom == true) {
                var i = name.substr(6, name.length)
                cc.log("i: " + i);
                var panel = this["pn_player_" + i];
                var avatar = panel.getChildByName("avatar" + i);
                this.save_btn_kick = panel.getChildByName("bnkick" + i);
                this.save_btn_kick.setVisible(false);
                this.nicknameKick = panel.getChildByName("nickname").getString();
                this.showNoticeConfirm("Bạn có chắc chắn muốn Kick người chơi " + this.nicknameKick+ " ?", 2);
            }
        },
        showMessagePut : function(index){
            if(index == 2 || index == 3 || index == 4 || index == 5){
                if(this.masterRoom == true) {
                    var sprite = this.pn_putMoney.getChildByName(this.getNamePotId(index));
                    var content = "";
                    if(this.lockByGate[index] == 1) {
                        if(this.order_lock_gate[index] == 0) {
                            content = "Mở Cửa"
                        }else{
                            content = "Hủy Mở"
                        }
                    }else {
                        if(this.order_lock_gate[index] == 0) {
                            content = "Khóa Cửa"
                        }else{
                            content = "Hủy Khóa"
                        }
                    }
                    this.showToolXocDia(sprite, content, true, false);
                    this.gateLock = index;
                    return false;
                }
                if(this.banker == "") {
                    this.showNotice("Không thể đặt cửa vị khi chưa có người chơi làm cái!");
                    return false;
                }
            }
            if(this.banker == "me") {
                this.showNotice("Bạn đang làm cái!");
                return false;
            }
            return true;
        },
        showToolXocDia : function(target, content, islock, where){
            this.pn_tool.setVisible(true);
            if(where == false)
                this.btn_tool.setPosition(target.getPosition());
            else
                this.btn_tool.setPosition(cc.p(target.getPositionX() + 390, target.getPositionY() + 356));
            this.btn_tool.runAction(cc.scaleTo(0.2,1));
            this.lb_tool.setString(content);
            this.isLockOrKick = islock;
        },
        closeToolXocDia : function(){
            this.btn_tool.runAction(cc.sequence(cc.scaleTo(0.2,0), cc.callFunc(function(){
                GameScene.gameGui.pn_tool.setVisible(false);
            })));
        },

        drawAllPot : function(i, money){
            var txt = "";
            var strgate = "";
            var gate = null;
            var array = [];
            array = this.CountNumberPhing(money);
            if(i == 0) {
                txt = "chan";
                strgate = "btn_put_chan";
                gate = 0;
                this.array_phing_chan = array;
                this.arrayHasMoney[0] = 1;
            }else if(i == 1){
                txt = "le";
                strgate = "btn_put_le";
                gate = 1;
                this.array_phing_le = array;
                this.arrayHasMoney[1] = 1;
            }else if(i == 2) {
                txt = "chan4";
                strgate = "btn_put_chan4";
                gate = 2;
                this.array_phing_chan4 = array;
                this.arrayHasMoney[2] = 1;
            }else if(i == 3){
                txt = "chan0";
                strgate = "btn_put_chan0";
                gate = 3;
                this.array_phing_chan0 = array;
                this.arrayHasMoney[3] = 1;
            }else if(i == 4){
                txt = "le1";
                strgate = "btn_put_le1";
                gate = 4;
                this.array_phing_le1 = array;
                this.arrayHasMoney[4] = 1;
            }else if(i == 5){
                txt = "le3";
                strgate = "btn_put_le3";
                gate = 5;
                this.array_phing_le3 = array;
                this.arrayHasMoney[5] = 1;
            }
            if(this.pn_putMoney.getChildByName(strgate)!= null)
                var sprite = this.pn_putMoney.getChildByName(strgate);

            if(money > 0){
                this["sp_money_" + txt].setVisible(true);
                this["txt_money_" + txt].setString(formatMoney(0,3,money));
                this.drawPhingInTable(sprite,money,gate, false);
            }else{
                this["sp_money_" + txt].setVisible(false);
                this["txt_money_" + txt].setString("");
            }
        },
        checkUserInRoom : function(nickname){
            for(var i = 0; i<8; i++){
                if(this.arrayPlayer[i] == nickname)
                    return true;
            }
            return false;
        },
        drawPlayerJoinRoom : function(i, nickname, avatar, money, banker, subbanker){
            var panel = this["pn_player_" + (i + 1)];
            panel.setVisible(true);
            panel.getChildByName("nickname").setString(nickname);
            panel.getChildByName("avatar" + (i + 1)).loadTextureNormal(menutab.getlinkAvatar(avatar));
            panel.getChildByName("avatar" + (i + 1)).loadTexturePressed(menutab.getlinkAvatar(avatar));
            panel.getChildByName("money").setString(formatMoney(0,3,money));
            if(this.masterRoom == true){
                if(!this.checkNickNameOrderKick(nickname))
                    panel.getChildByName("bnkick" + (i + 1)).setVisible(true);
            }else
                panel.getChildByName("bnkick" + (i + 1)).setVisible(false);
            if(this.moneyType == 0) {
                panel.getChildByName("money").setColor(cc.color("#c0c1c3"));
            }else {
                panel.getChildByName("money").setColor(cc.color("#E702FE"));
            }
            if(banker == true) {
                panel.getChildByName("sp_chuong").setVisible(true);
                this.banker = nickname;
                this.save_place_banker = panel;
                this.btn_lam_cai.setEnabled(false);
                this.btn_lam_cai.setBright(false);
                this.btn_lam_cai.setVisible(false);
                if(this.is_pause_btn == false) {
                    cc.eventManager.pauseTarget(this.btn_lam_cai, true);
                    this.is_pause_btn = true;
                }
            }else
                panel.getChildByName("sp_chuong").setVisible(false);
            if(subbanker == true){
                panel.getChildByName("sp_sub_banker").setVisible(true);
                this.save_place_Subbanker = panel;
                this.Subbanker = nickname;
            }else{
                panel.getChildByName("sp_sub_banker").setVisible(false);
            }
            this.arrayPlayer[i] = nickname;
            this.save_avatar[i] = avatar;
            //cc.log("user: " + this.arrayPlayer[i]);
        },
        countTime : function(time){
            //cc.log("time: " + time);
            this.txt_time.stopAllActions();
            if(time >= 10)
                this.txt_time.setString(time);
            else
                this.txt_time.setString("0" + time);
            if(time != 0) {
                this.txt_time.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
                    GameScene.gameGui.countTime(time - 1);
                })));
            }
            if(this.STATE_XOC_DIA == 5) {
                if (time == 0) {
                    this.unscheduleAllCallbacks();
                    this.stopTurn();
                }
            }
            if(this.STATE_XOC_DIA == 2){
                if(time <= 5){
                    if(this.is_clock_alarm == false)
                        this.alertEffect();
                    this.audioXocDia.soundEffect(this.audioXocDia.clock);
                }
            }
        },
        funGetTime : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendGetTime();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
        },

        findPosUserOutRoom : function(nickname){
            for(var i = 0; i < 8; i ++){
                if(this.arrayPlayer[i] == nickname){
                    return i;
                }
            }
        },
        userOutRoom : function(nickname){
            this.save_number_playing = this.save_number_playing - 1;
            if(this.save_number_playing < 0)
                this.save_number_playing = 0;
            if(this.checkUserInRoom(nickname)) {
                this.audioXocDia.soundEffect(this.audioXocDia.outRoom);
                var vitri = this.findPosUserOutRoom(nickname);
                this.arrayPlayer[vitri] = "";
                for(var i = 0; i < this.listPlayerSit.length; i ++){
                    if(nickname == this.listPlayerSit[i].nickname){
                        this.listPlayerSit.splice(i, 1);
                        break;
                    }
                }
                var panel = this["pn_player_" + (vitri + 1)];
                panel.setVisible(false);
                panel.getChildByName("nickname").setString("");
                panel.getChildByName("money").setString("");
                this.setPlayerStandToSit(vitri);
            }else{
                if(this.listPlayerStand.length > 0){
                    for(var i = 0; i <this.listPlayerStand.length; i ++){
                        if(nickname == this.listPlayerStand[i].nickname){
                            this.listPlayerStand.splice(i, 1);
                        }
                    }
                }
                if(this.isOpenPlayerStand == true){
                    this.showUserStand();
                }
                this.checkHideUserStand();
            }

        },
        setPlayerStandToSit : function(vitri){
            if(this.listPlayerStand.length > 0){
                var ran = getRandomInt(0,(this.listPlayerStand.length - 1));
                this.audioXocDia.soundEffect(this.audioXocDia.inRoom);
                this.drawPlayerJoinRoom(vitri, this.listPlayerStand[ran].nickname, parseInt(this.listPlayerStand[ran].avatar), this.listPlayerStand[ran].money);
                this.listPlayerSit.push(this.listPlayerStand[ran]);
                this.listPlayerStand.splice(ran, 1);

                /// check con cho trong hay khong
                if(this.listPlayerSit.length < 8){
                    var remem = [];
                    for (var i = 0; i < 8; i++) {
                        if (this.arrayPlayer[i] == "") {
                            remem.push(i);
                        }
                    }
                    var ran = getRandomInt(0, (remem.length - 1));
                    this.setPlayerStandToSit(remem[ran]);
                    return;
                }
                if(this.isOpenPlayerStand == true){
                    this.showUserStand();
                }
            }
            this.checkHideUserStand();
        },

        addPlayerToListStand : function(pk){
            var obj = {
                nickname : pk.nickname,
                avatar : pk.avatar,
                banker : false,
                isSubBanker : false,
                money : pk.money
            };
            this.save_number_playing = this.save_number_playing + 1;
            this.listPlayerStand.push(obj);
            if(this.isOpenPlayerStand == true){
                this.showUserStand();
            }
            if(this.listPlayerSit.length < 8){
                var remem = [];
                for (var i = 0; i < 8; i++) {
                    if (this.arrayPlayer[i] == "") {
                        remem.push(i);
                    }
                }
                var ran = getRandomInt(0, (remem.length - 1));
                this.setPlayerStandToSit(remem[ran]);
            }else{
                this.checkHideUserStand();
            }
        },

        orderOutRoom : function(nickname,status){
            var checkplayer = this.checkPlayerInArray(nickname);
            if (checkplayer == true) {
                var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                player.getChildByName("sp_outroom").setVisible(status);
            } else {
                if(nickname == lobby.userInfo.nickname) {
                    this.sp_outroom.setVisible(status);
                    if (status == true)
                        GameScene.gameGui.showNotice("Bạn đã đăng ký rời phòng thành công!");
                    else
                        GameScene.gameGui.showNotice("Bạn đã hủy đăng ký rời phòng!");
                }
            }
        },
        checkPlayerInArray : function(nickname){
            for(var i = 0; i < 8; i ++){
                if(this.arrayPlayer[i] == nickname){
                    return true;
                }
            }
            return false;
        },
        checkPlayerInArrayStand : function(nickname, currentmoney){
            for(var i = 0; i < this.listPlayerStand.length; i ++){
                if(this.listPlayerStand[i].nickname == nickname){
                    if(currentmoney >= 0)
                        this.listPlayerStand[i].money = currentmoney;
                    return true;
                }
            }
            return false;
        },
        funSendValuePut : function(gate, money){
            if(this.lockByGate[gate] == 1){
                this.showNotice("Nhà cái đã khóa cửa này!");
                return;
            }
            //if(this.roomWorld == false) {
            //    if(this.banker != "") {
            //        if (this.MoneyReviceServer[gate] >= this.maxMoneyBet[gate]) {
            //            this.showNotice("Không thể đặt quá hạn mức của cửa!");
            //            return;
            //        }
            //    }
            //}

            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendPutMoney();
                pk.putData(gate, money);
                gameWsClient.send(pk);
                pk.clean();
            }
        },
        funResetVisibleMoney : function(){
            this.sp_money_chan.setVisible(false);
            this.sp_money_le.setVisible(false);
            this.sp_money_chan4.setVisible(false);
            this.sp_money_chan0.setVisible(false);
            this.sp_money_le1.setVisible(false);
            this.sp_money_le3.setVisible(false);
            this.txt_money_chan.setString("");
            this.txt_money_le.setString("");
            this.txt_money_chan4.setString("");
            this.txt_money_chan0.setString("");
            this.txt_money_le1.setString("");
            this.txt_money_le3.setString("");
        },
        setPhing : function(muccuoc){
            this.menhgia_put = muccuoc;
            if(this.roomWorld == true){
                this.value1 = muccuoc;
                this.value2 = muccuoc * 10;
                this.value3 = muccuoc * 100;
                this.value4 = muccuoc * 1000;
                this.value5 = muccuoc * 10000;
            }else {
                this.value1 = muccuoc;
                this.value2 = muccuoc * 5;
                this.value3 = muccuoc * 10;
                this.value4 = muccuoc * 20;
                this.value5 = muccuoc * 50;
            }

            this.txt_value1.setString(this.setTextValue(this.value1));
            this.txt_value2.setString(this.setTextValue(this.value2));
            this.txt_value3.setString(this.setTextValue(this.value3));
            this.txt_value4.setString(this.setTextValue(this.value4));
            this.txt_value5.setString(this.setTextValue(this.value5));

            this.funJumpValue(this.btn_value1,85.00, this.value1);
        },
        setTextValue : function(value){
            var str ="";
            if(value >= 1000 && value < 1000000)
                str = (value/1000) + "K";
            else if(value >= 1000000 && value < 1000000000)
                str = (value/1000000) + "M";
            else if(value >= 1000000000)
                str = (value/1000000000) + "B";
            else
                str = value;
            return str;
        },
        funJumpValue : function(sprite, pos, value){
            this.valuePut = value;
            this.btn_value1.stopAllActions();   this.btn_value2.stopAllActions();   this.btn_value3.stopAllActions();
            this.btn_value4.stopAllActions();   this.btn_value5.stopAllActions();

            this.btn_value1.y = pos;    this.btn_value2.y = pos;    this.btn_value3.y = pos;
            this.btn_value4.y = pos;    this.btn_value5.y = pos;

            var moveUp = cc.MoveTo.create(0.2, cc.p(sprite.x, pos + 10));
            var moveDown = cc.MoveTo.create(0.2, cc.p(sprite.x, pos));
            var seq = cc.sequence(moveUp,moveDown);
            sprite.runAction(cc.repeatForever(seq));
        },

        responseUserPutMoney : function(error, nickname, value, gate, AllMoney, currentmoney, trathuong){
            this.btn_all_in.setBright(true);
            if(nickname == lobby.userInfo.nickname) {
                this.btn_all_in.setBright(true);
                this.is_all_in = false;
                this.txt_all_in.setColor(cc.color("#FFFFFF"));
            }
            if(error == 1) {
                this.showNotice("Bạn không đủ tiền!");
                return;
            }
            if(error == 2) {
                this.showNotice("Không thể đặt quá hạn mức của cửa!");
                return;
            }
            if(value <= 0)
                return;
            //if(value > this.menhgia_put*30)
            //    value = this.menhgia_put*30;
            this.MoneyReviceServer[gate] = AllMoney;

            var rand = getRandomInt(0,2);
            if(rand == 0)
                this.audioXocDia.soundEffect(this.audioXocDia.AddPhing1);
            else if(rand == 1)
                this.audioXocDia.soundEffect(this.audioXocDia.AddPhing2);
            else if(rand == 2)
                this.audioXocDia.soundEffect(this.audioXocDia.AddPhing3);

            if(nickname != "") {
                var checkplayer = this.checkPlayerInArray(nickname);
                if (checkplayer == true) {
                    var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                    player.getChildByName("money").setString(formatMoney(0, 3, currentmoney));
                } else {
                    if(nickname == lobby.userInfo.nickname){
                        this.txt_money.setString(formatMoney(0, 3, currentmoney));
                        cc.log("current money put : " + currentmoney);
                        lobby.updateMoney(currentmoney, this.moneyType);
                        var player = this.pn_user;
                        if (trathuong == false) {
                            this.my_put_money[gate] = this.my_put_money[gate] + value;
                            this.setTextMyMoneyPut();
                        }
                    }else{
                        this.checkPlayerInArrayStand(nickname, currentmoney);
                        var player = this.pn_user_stand;
                    }
                }
            }else{
                var player = this.sp_dealer;
            }

            var strgate = "";
            //if(AllMoney == 0)
            //    return;
            if(gate == 0){
                strgate = "btn_put_chan";
                this.sp_money_chan.setVisible(true);
                this.txt_money_chan.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[0] = 1;
            }else if(gate == 1){
                strgate = "btn_put_le";
                this.sp_money_le.setVisible(true);
                this.txt_money_le.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[1] = 1;
            }else if(gate == 2)    {
                strgate = "btn_put_chan4";
                this.sp_money_chan4.setVisible(true);
                this.txt_money_chan4.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[2] = 1;
            }else if(gate == 3)    {
                strgate = "btn_put_chan0";
                this.sp_money_chan0.setVisible(true);
                this.txt_money_chan0.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[3] = 1;
            }else if(gate == 4)    {
                strgate = "btn_put_le1";
                this.sp_money_le1.setVisible(true);
                this.txt_money_le1.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[4] = 1;
            }else if(gate == 5)    {
                strgate = "btn_put_le3";
                this.sp_money_le3.setVisible(true);
                this.txt_money_le3.setString(formatMoney(0,3,AllMoney));
                this.arrayHasMoney[5] = 1;
            }
            cc.log("gate: " + strgate);
            this.throwPhingToPot(value, gate, strgate, player);
            return;
        },
        getRandomVitriPot : function(potID, namePot){
            var xy = [0,0];
            if(this.pn_putMoney.getChildByName(namePot)!= null) {
                var sprite = this.pn_putMoney.getChildByName(namePot);
                if (potID == 0 || potID == 1) {
                    var X = getRandomFloat((sprite.getPositionX() - 125), (sprite.getPositionX() + 125), 2);
                    xy[0] = X;
                    var Y = getRandomFloat((sprite.getPositionY() - 45), (sprite.getPositionY() + 45), 2);
                    xy[1] = Y;
                } else {
                    var X = getRandomFloat((sprite.getPositionX() - 70), (sprite.getPositionX() + 70), 2);
                    xy[0] = X;
                    var Y = getRandomFloat((sprite.getPositionY() - 43), (sprite.getPositionY() + 43), 2);
                    xy[1] = Y;
                }
            }
            return xy;
        },
        throwPhingToPot : function(value, gate, strgate, player){
            var number = this.countNumberPhingFollowMinBet(value);
            var stt = this.save_number_phing_in_pot[gate];
            var txt_child = "";
            for(var i = 0; i < number ; i ++) {
                var u_list = null;
                if (gate == 0) {
                    txt_child = "phing_chan_";
                    u_list = this.ListPut_Chan;
                } else if (gate == 1) {
                    txt_child = "phing_le_";
                    u_list = this.ListPut_Le;
                } else if (gate == 2) {
                    txt_child = "phing_chan_4_";
                    u_list = this.ListPut_Chan_4;
                } else if (gate == 3) {
                    txt_child = "phing_chan_0_";
                    u_list = this.ListPut_Chan_0;
                } else if (gate == 4) {
                    txt_child = "phing_le_1_";
                    u_list = this.ListPut_Le_1;
                } else if (gate == 5) {
                    txt_child = "phing_le_3_";
                    u_list = this.ListPut_Le_3;
                }
                var aSprite = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                if(this.moneyType == 1)
                    GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03.png");
                else
                    GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03_s.png");
                if (player == this.sp_dealer)
                    aSprite.setPosition(cc.p(player.x, player.y - 90));
                else
                    aSprite.setPosition(cc.p(player.x, player.y));
                u_list.addChild(aSprite);
                aSprite.setScale(0.45);
                aSprite.setName(txt_child + stt);
                stt = stt + 1;
                var xy = this.getRandomVitriPot(gate, strgate);
                var child = u_list.childrenCount;
                cc.log("number phing = " + child);
                if(gate == 0 || gate == 1){
                    var nuss = 300;
                }else{
                    var nuss = 180;
                }
                if(child > nuss){
                    var nu = this.number_phing_delete[gate];
                    var sp = u_list.getChildByName(txt_child + nu);
                    this.number_phing_delete[gate] = nu + 1;
                    if(sp != null){
                        sp.removeFromParent(true);
                        cc.log("remove");
                    }
                    var actionMove = cc.MoveTo.create(0.3, cc.p(parseFloat(xy[0]), parseFloat(xy[1])));
                    //var actionMove = cc.sequence(move,cc.callFunc(function(){
                    //   aSprite.removeFromParent(true);
                    //}));
                }else
                    var actionMove = cc.MoveTo.create(0.3, cc.p(parseFloat(xy[0]), parseFloat(xy[1])));
                aSprite.runAction(actionMove);
            }
            this.save_number_phing_in_pot[gate] = stt;
        },
        countNumberPhingFollowMinBet : function(value){
            var number = Math.ceil(value/this.menhgia_put);
            if(value > this.value1 && value <= this.value2) {
                number = 2;
            }else if(value > this.value2 && value <= this.value3){
                number = 3;
            }else if(value > this.value3 && value <= this.value4){
                number = 4;
            }

            if (number > 5)
                number = 5;
            return number;
        },

        setTextMyMoneyPut : function(){
            for(var i =0; i <6; i++){
                if(this.my_put_money[i] > 0){
                    this["txt_my_money_" + i].setString(formatMoney(0,3,this.my_put_money[i]));
                }else{
                    this["txt_my_money_" + i].setString("");
                }
            }
        },

        // KET THUC -- lay tien thua ve banker -- tu banker tra tien thang -- tien thang ve nguoi choi thang//
        responseFinshGame : function(pk){
            var listDince = pk.diceID;
            for(var i = 0; i<4; i ++){
                var vt = this.getRandomVi(i);
                this["sp_vi_" + (i + 1)].setPosition(cc.p(vt[0], vt[1]));
                this["sp_vi_" + (i + 1)].setVisible(false);
                if(parseInt(listDince[i].dince) == 0)
                    this["sp_vi_" + (i + 1)].setTexture("res/CardGame/ResXocDia/vi1.png");
                else
                    this["sp_vi_" + (i + 1)].setTexture("res/CardGame/ResXocDia/vi2.png");
            }

            var action = cc.MoveTo.create(1.5, cc.p(this.sp_bat.getPositionX() - 50, this.sp_bat.getPositionY() + 80));
            var spawn = cc.spawn(action, cc.callFunc(function(){
                for(var i = 0; i < 4; i ++){
                    GameScene.gameGui["sp_vi_" + (i + 1)].setVisible(true);
                }
                GameScene.gameGui.audioXocDia.soundEffect(GameScene.gameGui.audioXocDia.MoBat);
            }));

            var infoAllPot = pk.infoAllPot;
            var money_banker_get_pot_lost = 0;
            var listPotLost = [];
            var listPotWin = [];
            var moneyBanker = pk.moneyBankerAfter;
            var listPlayerWin = pk.playerInfoWin;
            //for(var i = 0; i < pk.playerInfoWin.length; i ++){
            //    for(var j = 0; j < this.arrayPlayer.length; j ++){
            //        if(pk.playerInfoWin[i] == this.arrayPlayer[j]) {
            //            listPlayerWin.push(pk.playerInfoWin[i]);
            //            break;
            //        }
            //    }
            //}

            for(var i = 0; i < 6; i ++){
                if(infoAllPot[i].win == false) {
                    money_banker_get_pot_lost = money_banker_get_pot_lost + infoAllPot[i].totalMoney;
                    listPotLost.push(i);
                }else{
                    listPotWin.push(i);
                }
                this.array_save_money_each_pot[i] = infoAllPot[i].totalMoney;
            }

            cc.log("tong tien gom truoc: " + money_banker_get_pot_lost);

            var time_sub = 0;
            var winorlose = "";
            var pot_target = 0;
            var pot_save = 0;
            this.sp_bat.stopAllActions();
            this.sp_bat.runAction(cc.sequence(cc.delayTime(0.5), spawn,cc.callFunc(function(){
                GameScene.gameGui.showPotWin(listPotWin);
                if(pk.subListCount > 0){
                    GameScene.gameGui.is_sellgate = true;
                    time_sub = 2;
                    var listSubBanker = pk.InfoSubBanker;
                    var allMoneySub = 0;
                    for(var i = 0; i < pk.subListCount; i ++){
                        if(listSubBanker[i].potSubBanker == 0 || listSubBanker[i].potSubBanker == 1) {
                            pot_save = listSubBanker[i].potSubBanker;
                        }
                        pot_target = listSubBanker[i].potSubBanker;
                        var checkplayer = GameScene.gameGui.checkPlayerInArray(listSubBanker[i].nicknameSubbanker);
                        if (checkplayer == true) {
                            var player = GameScene.gameGui["pn_player_" + (GameScene.gameGui.findPosUserOutRoom(listSubBanker[i].nicknameSubbanker) + 1)];
                        }else{
                            if(listSubBanker[i].nicknameSubbanker == lobby.userInfo.nickname){
                                var player = GameScene.gameGui.pn_user;
                            }else{
                                GameScene.gameGui.checkPlayerInArrayStand(listSubBanker[i].nicknameSubbanker, listSubBanker[i].currentMoneySubBanker);
                                var player = GameScene.gameGui.pn_user_stand;
                            }
                        }
                        allMoneySub = allMoneySub + Math.abs(listSubBanker[i].moneySubBankerNoFee);
                        if(listSubBanker[i].moneySubBanker > 0){
                            if(listSubBanker[i].potSubBanker == 0 || listSubBanker[i].potSubBanker == 1) {
                                if (pot_save == 0) {
                                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Chan, "phing_chan_");
                                } else if (pot_save == 1) {
                                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Le, "phing_le_");
                                }
                            }
                            winorlose = "win";
                            money_banker_get_pot_lost = money_banker_get_pot_lost - GameScene.gameGui.array_save_money_each_pot[pot_target];
                            if(player != GameScene.gameGui.pn_user_stand) {
                                GameScene.gameGui.addMoneyFly(player, "+", listSubBanker[i].moneySubBanker);
                            }
                            GameScene.gameGui.responseMoneyWin(listSubBanker[i].potSubBanker, listSubBanker[i].moneySubBanker, player);
                            if (checkplayer == true)
                                player.getChildByName("money").setString(formatMoney(0,3,listSubBanker[i].currentMoneySubBanker));
                            else {
                                if(listSubBanker[i].nicknameSubbanker == lobby.userInfo.nickname){
                                    GameScene.gameGui.txt_money.setString(formatMoney(0, 3, listSubBanker[i].currentMoneySubBanker));
                                }
                            }
                        }else{
                            winorlose = "lose";
                            if(player != GameScene.gameGui.pn_user_stand) {
                                GameScene.gameGui.addMoneyFly(player, "-", Math.abs(listSubBanker[i].moneySubBanker));
                            }
                            GameScene.gameGui.responseUserPutMoney(0, listSubBanker[i].nicknameSubbanker, Math.abs(listSubBanker[i].moneySubBanker), listSubBanker[i].potSubBanker, (GameScene.gameGui.array_save_money_each_pot[pot_target]*2), listSubBanker[i].currentMoneySubBanker, true);
                        }
                    }
                    var money_banker = GameScene.gameGui.array_save_money_each_pot[pot_target] - allMoneySub;
                    var currentmoneyBanker = 0;
                    //money_banker_get_pot_lost = money_banker_get_pot_lost - GameScene.gameGui.array_save_money_each_pot[pot_target];
                    //cc.log("tong tien gom sau: " + money_banker_get_pot_lost);
                    if(money_banker > 0){
                        if (winorlose == "win") {
                            if(GameScene.gameGui.save_place_banker == null) {
                                GameScene.gameGui.save_place_banker = GameScene.gameGui.sp_dealer;
                            }
                            currentmoneyBanker = pk.moneyBankerBefore + money_banker;
                            GameScene.gameGui.addMoneyFly(GameScene.gameGui.save_place_banker, "+", money_banker);
                            GameScene.gameGui.responseMoneyWin(pot_target, money_banker, GameScene.gameGui.save_place_banker);
                            if (GameScene.gameGui.banker == "me") {
                                GameScene.gameGui.txt_money.setString(formatMoney(0, 3, currentmoneyBanker));
                            } else {
                                if(GameScene.gameGui.banker != "") {
                                    var player = GameScene.gameGui["pn_player_" + (GameScene.gameGui.findPosUserOutRoom(GameScene.gameGui.banker) + 1)];
                                    player.getChildByName("money").setString(formatMoney(0, 3, currentmoneyBanker));
                                }
                            }
                        } else {
                            currentmoneyBanker = pk.moneyBankerBefore - money_banker;
                            if (GameScene.gameGui.banker == "me") {
                                var player = GameScene.gameGui.pn_user;
                            } else {
                                if(GameScene.gameGui.banker != "") {
                                    var player = GameScene.gameGui["pn_player_" + (GameScene.gameGui.findPosUserOutRoom(GameScene.gameGui.banker) + 1)];
                                    player.getChildByName("money").setString(formatMoney(0, 3, currentmoneyBanker));
                                }else{
                                    var player = GameScene.gameGui.sp_dealer;
                                }
                            }
                            GameScene.gameGui.addMoneyFly(player, "-", money_banker);
                            GameScene.gameGui.responseUserPutMoney(0, GameScene.gameGui.banker, money_banker, pot_target, (GameScene.gameGui.array_save_money_each_pot[pot_target] * 2), currentmoneyBanker, true);
                        }
                    }
                }
            })));

            this.runAction(cc.sequence(cc.delayTime(time_sub + 5), cc.callFunc(function(){
                GameScene.gameGui.actionFinshGame(listPotLost, money_banker_get_pot_lost, listPotWin, moneyBanker, listPlayerWin, pk.subListCount, pk.InfoSubBanker, pot_save, pk.moneyBankerExchange);
            })));
        },
        actionFinshGame : function(arrayGomMoney, money_pot_lost, listPotWin, moneyBanker, listPlayerWin, subListCount, InfoSubBanker, pot_target, moneyBankerExchange){
            /// gom tien cac cua thua
            if(this.banker != "") {
                this.pos_dealerX = this.save_place_banker.x;
                this.pos_dealerY = this.save_place_banker.y;
            }else{
                this.pos_dealerX = this.sp_dealer.x;
                this.pos_dealerY = this.sp_dealer.y - 90;
            }
            for(var i = 0; i < arrayGomMoney.length; i++){
                var index = arrayGomMoney[i];
                var pn_phing = "";
                var txt_child = "";
                if(index == 0)  {
                    txt_child = "phing_chan_";
                    pn_phing = "ListPut_Chan";
                }else if(index == 1)  {
                    txt_child = "phing_le_";
                    pn_phing = "ListPut_Le";
                }else if(index == 2) {
                    txt_child = "phing_chan_4_";
                    pn_phing = "ListPut_Chan_4";
                }else if(index == 3)  {
                    txt_child = "phing_chan_0_";
                    pn_phing = "ListPut_Chan_0";
                }else if(index == 4)  {
                    txt_child = "phing_le_1_";
                    pn_phing = "ListPut_Le_1";
                }else if(index == 5)  {
                    txt_child = "phing_le_3_";
                    pn_phing = "ListPut_Le_3";
                }

                if(this.ListPut.getChildByName(pn_phing) != null)
                    var panel = this.ListPut.getChildByName(pn_phing);

                var numberchild = panel.childrenCount;
                if(numberchild > 0){
                    this.HideSpPutMoney(index);
                    this.audioXocDia.soundEffect(this.audioXocDia.ThuTraPhip);
                    for(var j = 0; j<numberchild; j++) {
                        if (panel.getChildByName(txt_child + j) != null) {
                            var aSprite1 = panel.getChildByName(txt_child + j);
                            if (j != (numberchild - 1)) {
                                var actionMove = cc.MoveTo.create(0.25, cc.p(this.pos_dealerX, this.pos_dealerY));
                                aSprite1.runAction(actionMove);
                            } else {
                                var actionMove = cc.MoveTo.create(0.25, cc.p(this.pos_dealerX, this.pos_dealerY));
                                aSprite1.runAction(actionMove);
                                this.removeAllChildPhing(pn_phing);
                            }
                        }else{
                            cc.log("ko thay");
                        }
                    }

                }
            }

            // Hien tien thu ve banker hoac dealer
            if(money_pot_lost > 0) {
                if (this.banker != "")
                    this.runAction(cc.sequence(cc.callFunc(function () {
                        GameScene.gameGui.addMoneyFly(GameScene.gameGui.save_place_banker, "+", money_pot_lost);
                    })));
                else
                    this.runAction(cc.sequence(cc.callFunc(function () {
                        GameScene.gameGui.addMoneyFly(GameScene.gameGui.sp_dealer, "+", money_pot_lost);
                    })));
            }

            /// tra tien vao cua thang
            this.runAction(cc.sequence(cc.delayTime(2.5),cc.callFunc(function(){
                var money_banker_lost = 0;
                for(var i = 0; i < listPotWin.length; i++) {
                    var money = GameScene.gameGui.array_save_money_each_pot[listPotWin[i]] * (GameScene.gameGui.array_save_ratio[listPotWin[i]]/100);

                    if (GameScene.gameGui.is_sellgate == false) {
                        var value = (GameScene.gameGui.array_save_money_each_pot[listPotWin[i]] * (GameScene.gameGui.array_save_ratio[listPotWin[i]]/100) - GameScene.gameGui.array_save_money_each_pot[listPotWin[i]]);
                        money_banker_lost = money_banker_lost + value;
                        if (GameScene.gameGui.banker != "")
                            GameScene.gameGui.responseUserPutMoney(0, GameScene.gameGui.banker, value, listPotWin[i], money, moneyBanker, true);
                        else
                            GameScene.gameGui.responseUserPutMoney(0, "", value, listPotWin[i], money, 0, true);
                    } else {
                        if(pot_target != listPotWin[i]) {
                            var value = (GameScene.gameGui.array_save_money_each_pot[listPotWin[i]] * (GameScene.gameGui.array_save_ratio[listPotWin[i]]/100)- GameScene.gameGui.array_save_money_each_pot[listPotWin[i]]);
                            money_banker_lost = money_banker_lost + value;
                            if (GameScene.gameGui.banker == "")
                                GameScene.gameGui.responseUserPutMoney(0, GameScene.gameGui.banker, value, listPotWin[i], money, 0, true);
                            else
                                GameScene.gameGui.responseUserPutMoney(0, GameScene.gameGui.banker, value, listPotWin[i], money, moneyBanker, true);
                        }
                    }
                }
                if(GameScene.gameGui.banker == "")
                    GameScene.gameGui.addMoneyFly(GameScene.gameGui.sp_dealer, "-", money_banker_lost);
                else
                    GameScene.gameGui.addMoneyFly(GameScene.gameGui.save_place_banker, "-", money_banker_lost);
            }),cc.delayTime(2), cc.callFunc(function(){
                // tra thuong cho nguoi choi thang
                GameScene.gameGui.PayMoneyForWin(listPlayerWin, moneyBankerExchange, moneyBanker);
            })));
        },
        PayMoneyForWin : function(listPlayerWin, moneyBankerExchange, moneyBanker){
            this.visibleAllListPut();
            this.audioXocDia.soundEffect(this.audioXocDia.ThuTraPhip);
            for(var i =0; i < listPlayerWin.length ; i++) {
                var nickname = listPlayerWin[i].nickname;
                var listPotWin = listPlayerWin[i].potsWin;
                var listMoneyWinEachPot = listPlayerWin[i].moneyWinPots;
                var allMoneyWin = listPlayerWin[i].moneyWin;
                var currentMoneyUser = listPlayerWin[i].currentMoney;

                var checkplayer = this.checkPlayerInArray(nickname);
                var arrayPot = listPotWin.split(',');
                var arrayMoneyRefunEachPot = listMoneyWinEachPot.split(',');
                var nPot = arrayPot.length;
                var inlistStand = false;

                if (checkplayer == true) {
                    var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                    player.getChildByName("money").setString(formatMoney(0, 3, currentMoneyUser));
                }else{
                    if(nickname == lobby.userInfo.nickname){
                        var player = this.pn_user;
                        this.txt_money.setString(formatMoney(0, 3, currentMoneyUser));
                        cc.log("current money pay : " + currentMoneyUser);
                        lobby.updateMoney(currentMoneyUser, this.moneyType);
                    }else{
                        this.checkPlayerInArrayStand(nickname, currentMoneyUser);
                        var player = this.pn_user_stand;
                        inlistStand = true;
                    }
                }
                for (var j = 0; j < nPot; j++) {
                    var vtPot = this.getNamePotId(arrayPot[j]);
                    this.responseMoneyWin(arrayPot[j], arrayMoneyRefunEachPot[j], player);
                    this.HideSpPutMoney(parseInt(arrayPot[j]));
                }
                if(allMoneyWin > 0) {
                    if(inlistStand == false)
                        this.addMoney(player, allMoneyWin, 0.3);

                }
            }
            this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
                if(moneyBankerExchange > 0)
                    GameScene.gameGui.addMoney(GameScene.gameGui.save_place_banker, moneyBankerExchange, 0.3);
            })));

            if(this.banker == "me"){
                this.txt_money.setString(formatMoney(0, 3, moneyBanker));
                lobby.updateMoney(moneyBanker, this.moneyType);
            }else{
                if(this.banker != "") {
                    var player = this["pn_player_" + (this.findPosUserOutRoom(this.banker) + 1)];
                    player.getChildByName("money").setString(formatMoney(0, 3, moneyBanker));
                }
            }

            //cc.log("chan : " + this.ListPut_Chan.childrenCount);
            //cc.log("le : " + this.ListPut_Le.childrenCount);
            //cc.log("chan4 : " + this.ListPut_Chan_4.childrenCount);
            //cc.log("chan0 : " + this.ListPut_Chan_0.childrenCount);
            //cc.log("le1 : " + this.ListPut_Le_1.childrenCount);
            //cc.log("le3 : " + this.ListPut_Le_3.childrenCount);
            this.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                GameScene.gameGui.removeAllListPut();
            })));
        },
        removeAllChildPhing : function(panel){
            this.ListPut.runAction(cc.sequence(cc.delayTime(0.4),cc.callFunc(function(){
                if(panel == "ListPut_Chan"){
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Chan, "phing_chan_");
                    GameScene.gameGui.sp_money_chan.setVisible(false);
                    GameScene.gameGui.txt_money_chan.setString("");
                }else if(panel == "ListPut_Le") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Le, "phing_le_");
                    GameScene.gameGui.sp_money_le.setVisible(false);
                    GameScene.gameGui.txt_money_le.setString("");
                }else if(panel == "ListPut_Chan_4") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Chan_4, "phing_chan_4_");
                    GameScene.gameGui.sp_money_chan4.setVisible(false);
                    GameScene.gameGui.txt_money_chan4.setString("");
                }else if(panel == "ListPut_Chan_0") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Chan_0, "phing_chan_0_");
                    GameScene.gameGui.sp_money_chan0.setVisible(false);
                    GameScene.gameGui.txt_money_chan0.setString("");
                }else if(panel == "ListPut_Le_1") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Le_1, "phing_le_1_");
                    GameScene.gameGui.sp_money_le1.setVisible(false);
                    GameScene.gameGui.txt_money_le1.setString("");
                }else if(panel == "ListPut_Le_3") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListPut_Le_3, "phing_le_3_");
                    GameScene.gameGui.sp_money_le3.setVisible(false);
                    GameScene.gameGui.txt_money_le3.setString("");
                }else if(panel == "ListTraThuong") {
                    GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListTraThuong, "tra_thuong_");
                }
            })));
        },
        HideSpPutMoney : function(pot){
            if(pot == 0){
                this.sp_money_chan.setVisible(false);
                this.txt_money_chan.setString("");
            }else if(pot == 1) {
                this.sp_money_le.setVisible(false);
                this.txt_money_le.setString("");
            }else if(pot == 2) {
                this.sp_money_chan4.setVisible(false);
                this.txt_money_chan4.setString("");
            }else if(pot == 3) {
                this.sp_money_chan0.setVisible(false);
                this.txt_money_chan0.setString("");
            }else if(pot == 4) {
                this.sp_money_le1.setVisible(false);
                this.txt_money_le1.setString("");
            }else if(pot == 5) {
                this.sp_money_le3.setVisible(false);
                this.txt_money_le3.setString("");
            }
        },
        showPotWin : function(listpotWin){
            var effFade = cc.sequence(cc.fadeIn(0.3),cc.delayTime(1.5),cc.fadeOut(0.3));
            for(var i = 0; i < listpotWin.length; i ++){
                this["sp_win_" + listpotWin[i]].stopAllActions();
                if(listpotWin[i] == 0 || listpotWin[i] == 1) {
                    this["sp_win_" + listpotWin[i]].setVisible(true);
                }else{
                    if(this.roomWorld == false) {
                        this["sp_win_" + listpotWin[i]].setVisible(true);
                    }
                }
                this["sp_win_" + listpotWin[i]].runAction(cc.repeatForever(effFade));
                if(listpotWin[i] == 0 || listpotWin[i] == 1){
                    this.effect_win_0.setVisible(true);
                    this.effect_win_0.setPosition(cc.p(this["sp_win_" + listpotWin[i]].getPositionX(),this["sp_win_" + listpotWin[i]].getPositionY()));
                    var rotate = new cc.RotateBy(10,720);
                    this.effect_win_0.stopAllActions();
                    this.effect_win_0.runAction(cc.repeatForever(rotate));
                }else{
                    if(this.roomWorld == false) {
                        this.effect_win_1.setVisible(true);
                        this.effect_win_1.setPosition(cc.p(this["sp_win_" + listpotWin[i]].getPositionX(), this["sp_win_" + listpotWin[i]].getPositionY()));
                        var rotate1 = new cc.RotateBy(10, 720);
                        this.effect_win_1.stopAllActions();
                        this.effect_win_1.runAction(cc.repeatForever(rotate1));
                    }
                }
            }
        },
        HideEffectWin : function(){
            this.effect_win_0.stopAllActions();
            this.effect_win_0.setVisible(false);
            this.effect_win_1.stopAllActions();
            this.effect_win_1.setVisible(false);
            for(var i = 0; i <6; i ++){
                this["sp_win_" + i].stopAllActions();
                this["sp_win_" + i].setVisible(false);
            }
        },

        responseMoneyWin : function(pot, moneywin, place){
            this.audioXocDia.soundEffect(this.audioXocDia.ThuTraPhip);
            var number = this.countNumberPhingFollowMinBet(moneywin);
            var txt_child = "";
            var posY = 0;
            if(place != this.sp_dealer)
                posY = place.getPosition().y;
            else
                posY = place.getPosition().y - 90;
            if(pot == 0){
                var panel = this.ListPut_Chan;
                txt_child = "phing_chan_";
            }else if(pot == 1){
                var panel = this.ListPut_Le;
                txt_child = "phing_le_";
            }else if(pot == 2){
                var panel = this.ListPut_Chan_4;
                txt_child = "phing_chan_4_";
            }else if(pot == 3){
                var panel = this.ListPut_Chan_0;
                txt_child = "phing_chan_0_";
            }else if(pot == 4){
                var panel = this.ListPut_Le_1;
                txt_child = "phing_le_1_";
            }else if(pot == 5){
                var panel = this.ListPut_Le_3;
                txt_child = "phing_le_3_";
            }
            var txt_new = "tra_thuong_";
            var number_child = panel.childrenCount;
            //cc.log("number : " + number + " number_child : " + number_child );
            var stt = 0;
            if(number_child == 0){
                for(var i = 0; i < number ; i ++) {

                    var aSprite = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                    if(this.moneyType == 1)
                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03.png");
                    else
                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03_s.png");
                    aSprite.setScale(0.45);
                    //var ranGoc = getRandomInt(0,360);
                    //aSprite.setRotation(ranGoc);
                    aSprite.setName(txt_new + stt);
                    stt = stt + 1;
                    var strgate = this.getNamePotId(pot);
                    var xy = this.getRandomVitriPot(pot, strgate);
                    aSprite.setPosition(cc.p(parseFloat(xy[0]),parseFloat(xy[1])));
                    this.ListTraThuong.addChild(aSprite);
                    var actionMove = cc.MoveTo.create(0.25, cc.p(place.getPosition().x, posY));
                    aSprite.runAction(actionMove);
                }
                this.removeAllChildPhing("ListTraThuong");
                return;
            }
            if(number > number_child)
                number = number_child;
            for(var i = 0; i < number ; i ++) {
                //cc.log("vao 3");
                if(panel.getChildByName(txt_child + (number_child - 1 - i)) != null) {
                    var sp = panel.getChildByName(txt_child + (number_child - 1 - i));


                    var aSprite = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                    if(this.moneyType == 1)
                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03.png");
                    else
                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03_s.png");
                    aSprite.setScale(0.45);
                    aSprite.setPosition(cc.p(sp.getPositionX(),sp.getPositionY()));
                    aSprite.setName(txt_new + stt);
                    stt = stt + 1;
                    sp.removeFromParent(true);
                    this.ListTraThuong.addChild(aSprite);
                    var actionMove = cc.MoveTo.create(0.25, cc.p(place.getPosition().x, posY));
                    aSprite.runAction(actionMove);
                }
            }
            //this.stopActionAndRemoveChild(this.ListTraThuong, txt_new);
        },

        CountNumberPhing : function(value){
            if(value > 0) {
                //cc.log("value: " + value);
                var num_phing_5 = parseInt(value / this.value5);

                var money_for_phing4 = value - num_phing_5*this.value5;
                var num_phing_4 = parseInt(money_for_phing4 / this.value4);

                var money_for_phing3 = money_for_phing4 - num_phing_4*this.value4;
                var num_phing_3 = parseInt(money_for_phing3 / this.value3);

                var money_for_phing2 = money_for_phing3 - num_phing_3*this.value3;
                var num_phing_2 = parseInt(money_for_phing2 / this.value2);

                var money_for_phing1 = money_for_phing2 - num_phing_2*this.value2;
                var num_phing_1 = parseInt(money_for_phing1 / this.value1);

                //cc.log("1: " + num_phing_1 + " ,2: " + num_phing_2 + " ,3: " + num_phing_3 + " ,4: " + num_phing_4 + " ,5: " + num_phing_5);

                var array_phing = [num_phing_1, num_phing_2, num_phing_3, num_phing_4, num_phing_5];
            }else{
                var array_phing = [0, 0, 0, 0, 0];
            }
            return array_phing;
        },

        removeAllListPut : function(){
            this.stopActionAndRemoveChild(this.ListPut_Chan, "phing_chan_");
            this.stopActionAndRemoveChild(this.ListPut_Le, "phing_le_");
            this.stopActionAndRemoveChild(this.ListPut_Chan_4, "phing_chan_4_");
            this.stopActionAndRemoveChild(this.ListPut_Chan_0, "phing_chan_0_");
            this.stopActionAndRemoveChild(this.ListPut_Le_1, "phing_le_1_");
            this.stopActionAndRemoveChild(this.ListPut_Le_3, "phing_le_3_");
        },
        visibleAllListPut : function(){
            this.visibleAllChild(this.ListPut_Chan, "phing_chan_");
            this.visibleAllChild(this.ListPut_Le, "phing_le_");
            this.visibleAllChild(this.ListPut_Chan_4, "phing_chan_4_");
            this.visibleAllChild(this.ListPut_Chan_0, "phing_chan_0_");
            this.visibleAllChild(this.ListPut_Le_1, "phing_le_1_");
            this.visibleAllChild(this.ListPut_Le_3, "phing_le_3_");
        },
        drawPhingInTable : function(sprite, value, vitri, trathuong){
            //cc.log("array_phing : " + array_phing);
            if(vitri == 0)
                this.stopActionAndRemoveChild(this.ListPut_Chan, "phing_chan_");
            else if(vitri == 1)
                this.stopActionAndRemoveChild(this.ListPut_Le, "phing_le_");
            else if(vitri == 2)
                this.stopActionAndRemoveChild(this.ListPut_Chan_4, "phing_chan_4_");
            else if(vitri == 3)
                this.stopActionAndRemoveChild(this.ListPut_Chan_0, "phing_chan_0_");
            else if(vitri == 4)
                this.stopActionAndRemoveChild(this.ListPut_Le_1, "phing_le_1_");
            else if(vitri == 5)
                this.stopActionAndRemoveChild(this.ListPut_Le_3, "phing_le_3_");

            var stt = 0;
            var number = this.countNumberPhingFollowMinBet(value);
            this.save_number_phing_in_pot[vitri] = number;
            for(var j = 0; j<number; j++){

                var aSprite = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                if(this.moneyType == 1)
                    GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03.png");
                else
                    GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03_s.png");
                var strgate = this.getNamePotId(vitri);
                var xy = this.getRandomVitriPot(vitri, strgate);
                //var x = xy[0] - 0.01; var y = xy[1] - 0.01;
                var x = parseFloat(xy[0]); var y = parseFloat(xy[1]);
                aSprite.setPosition(cc.p(x,y));
                //cc.log("vi tri x: " + aSprite.getPositionX() + " y: " + aSprite.getPositionY());
                aSprite.setScale(0.5);
                if(trathuong == false) {
                    if (vitri == 0) {
                        aSprite.setName("phing_chan_" + stt);
                        this.ListPut_Chan.addChild(aSprite);
                    } else if (vitri == 1) {
                        aSprite.setName("phing_le_" + stt);
                        this.ListPut_Le.addChild(aSprite);
                    } else if (vitri == 2) {
                        aSprite.setName("phing_chan_4_" + stt);
                        this.ListPut_Chan_4.addChild(aSprite);
                    } else if (vitri == 3) {
                        aSprite.setName("phing_chan_0_" + stt);
                        this.ListPut_Chan_0.addChild(aSprite);
                    } else if (vitri == 4) {
                        aSprite.setName("phing_le_1_" + stt);
                        this.ListPut_Le_1.addChild(aSprite);
                    } else if (vitri == 5) {
                        aSprite.setName("phing_le_3_" + stt);
                        this.ListPut_Le_3.addChild(aSprite);
                    }
                }else{
                    aSprite.setName("tra_thuong_" + stt);
                    this.ListTraThuong.addChild(aSprite);
                }
                stt = stt + 1;
            }
        },

        changePosBanker : function(nicknamebanker){
            if(this.checkPlayerInArray(nicknamebanker)){
                var pos_banker_old = this.findPosUserOutRoom(nicknamebanker);
                // luu thong tin vi tri 4
                var avatar_4 = this.save_avatar[3];
                var panel = this["pn_player_" + (3 + 1)];
                var nickname_4 = panel.getChildByName("nickname").getString();
                var money_4 = panel.getChildByName("money").getString();
                //luu vi tri banker moi
                var avatar_old = this.save_avatar[pos_banker_old];
                var panel_old = this["pn_player_" + (pos_banker_old + 1)];
                var nickname_old = nicknamebanker;
                var money_old = panel_old.getChildByName("money").getString();
                //set lai
                panel.getChildByName("nickname").setString(nickname_old);
                panel.getChildByName("money").setString(money_old);
                panel.getChildByName("avatar" + (3 + 1)).loadTextureNormal(menutab.getlinkAvatar(avatar_old));
                panel.getChildByName("avatar" + (3 + 1)).loadTexturePressed(menutab.getlinkAvatar(avatar_old));
                this.save_avatar[3] = avatar_old;
                this.arrayPlayer[3] = nickname_old;

                panel_old.getChildByName("nickname").setString(nickname_4);
                panel_old.getChildByName("money").setString(money_4);
                panel_old.getChildByName("avatar" + (pos_banker_old + 1)).loadTextureNormal(menutab.getlinkAvatar(avatar_4));
                panel_old.getChildByName("avatar" + (pos_banker_old + 1)).loadTexturePressed(menutab.getlinkAvatar(avatar_4));
                this.save_avatar[pos_banker_old] = avatar_4;
                this.arrayPlayer[pos_banker_old] = nickname_4;
                this.save_place_banker = panel;
                panel.getChildByName("sp_chuong").setVisible(true);

                if(!panel.isVisible()) {
                    panel.setVisible(true);
                    panel_old.setVisible(false);
                }
            }else{
                if(this.checkPlayerInArrayStand(nicknamebanker,-1)){
                    var money = 0;
                    var avatar = 0;
                    var player = null;
                    for(var i = 0; i < this.listPlayerStand.length; i ++){
                        if(this.listPlayerStand[i].nickname == nicknamebanker){
                            money = this.listPlayerStand[i].money;
                            avatar = this.listPlayerStand[i].avatar;
                            player = this.listPlayerStand[i];
                            this.listPlayerStand.splice(i,1);
                            this.checkPlayerInArrayStand(nicknamebanker,money);
                            break;
                        }
                    }
                    var nickname_4 = this.arrayPlayer[3];

                    var panel = this["pn_player_" + (3 + 1)];
                    panel.getChildByName("nickname").setString(nicknamebanker);
                    panel.getChildByName("money").setString(money);
                    panel.getChildByName("avatar" + (3 + 1)).loadTextureNormal(menutab.getlinkAvatar(avatar));
                    panel.getChildByName("avatar" + (3 + 1)).loadTexturePressed(menutab.getlinkAvatar(avatar));
                    panel.getChildByName("sp_chuong").setVisible(true);
                    this.save_avatar[3] = avatar;
                    this.arrayPlayer[3] = nicknamebanker;
                    this.save_place_banker = panel;

                    var player_4 = null;
                    for(var i = 0; i < this.listPlayerSit.length; i ++){
                        if(this.listPlayerSit[i].nickname == nickname_4){
                            player_4 = this.listPlayerSit[i];
                            this.listPlayerSit.splice(i,1);
                            break;
                        }
                    }
                    this.listPlayerSit.push(player);
                    this.listPlayerStand.push(player_4);
                }
            }
        },
        NewGame : function(){
            if(this.masterRoom == true)
                this.closeToolXocDia();
            this.order_lock_gate = [0,0,0,0,0,0];
            this.save_user_order_kick = [];
            this.order_banker = false;
            this.pn_buy_gate.setVisible(false);
            this.on_show_buy_gate.setVisible(false);
            this.lv_buy_gate.removeAllItems();
            this.lv_buy_gate.removeAllChildren();
            //this.bg_buy_gate._setHeight(80);
            this.array_buy_gate = [];
            this.is_dont_want_buy = false;
            this.btn_huy_lam_cai.setVisible(false);
            this.btn_all_in.setBright(true);
            this.is_all_in = false;
            this.is_sellgate = false;
            this.btn_banker_hoantien.setVisible(false);
            this.txt_can_tat.setString("CÂN TẤT");
            this.btn_can_tat.setEnabled(true);
            this.btn_can_tat.setBright(true);
            this.txt_can_tat.setColor(cc.color("#FFFFFF"));
            this.HideEffectWin();
            this.funGetCau();
            this.save_number_phing_in_pot = [0,0,0,0,0,0];
            this.number_phing_delete = [0,0,0,0,0,0];
            this.MoneyReviceServer = [0,0,0,0,0,0];
            this.my_put_money = [0,0,0,0,0,0];
            this.setTextMyMoneyPut();
            this.clock.setVisible(true);
            this.clockShadow.setVisible(true);
            this.save_time_new = new Date().getTime();
            this.schedule(this.updateTime,3);
            this.actionDealerXocDia(this.Is_dealer);

            this.pn_bat_dia.setVisible(false);
            this.removeEffectMoney();
            this.sp_bat.setPosition(this.vtBat);

            this.array_save_money_each_pot = [0,0,0,0,0,0];
            if(this.Subbanker != "") {
                this.visibleSubBanker();
                this.Subbanker = "";
            }

            this.stopActionAndRemoveChild(this.ListTraThuong, "tra_thuong_");
            this.stopActionAndRemoveChild(this.ListPut_Chan, "phing_chan_");
            this.stopActionAndRemoveChild(this.ListPut_Le, "phing_le_");
            this.stopActionAndRemoveChild(this.ListPut_Chan_4, "phing_chan_4_");
            this.stopActionAndRemoveChild(this.ListPut_Chan_0, "phing_chan_0_");
            this.stopActionAndRemoveChild(this.ListPut_Le_1, "phing_le_1_");
            this.stopActionAndRemoveChild(this.ListPut_Le_3, "phing_le_3_");
            this.arrayHasMoney = [0,0,0,0,0,0];
            this.funResetVisibleMoney();
        },
        StopGame : function(nickname){
            if(this.masterRoom == true)
                this.closeToolXocDia();
            this.order_lock_gate = [0,0,0,0,0,0];
            this.save_user_order_kick = [];
            this.order_banker = false;
            this.pn_buy_gate.setVisible(false);
            this.on_show_buy_gate.setVisible(false);
            this.lv_buy_gate.removeAllItems();
            this.lv_buy_gate.removeAllChildren();
            //this.bg_buy_gate._setHeight(80);
            this.array_buy_gate = [];
            this.is_dont_want_buy = false;
            this.btn_huy_lam_cai.setVisible(false);
            this.btn_all_in.setBright(true);
            this.is_all_in = false;
            this.is_sellgate = false;
            this.btn_banker_hoantien.setVisible(false);
            this.txt_can_tat.setString("CÂN TẤT");
            this.HideEffectWin();
            this.save_number_phing_in_pot = [0,0,0,0,0,0];
            this.number_phing_delete = [0,0,0,0,0,0];
            this.MoneyReviceServer = [0,0,0,0,0,0];
            this.my_put_money = [0,0,0,0,0,0];
            this.setTextMyMoneyPut();
            this.funResetVisibleMoney();
            this.pn_bat_dia.setVisible(false);
            this.clock.setVisible(false);
            this.clockShadow.setVisible(false);
            if(this.Subbanker != "") {
                this.visibleSubBanker();
                this.Subbanker = "";
            }
            if(nickname != "") {
                var check = this.checkPlayerInArray(nickname);
                if (check == true) {
                    var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                    player.getChildByName("sp_chuong").setVisible(true);
                } else {
                    this.sp_chuong.setVisible(true);
                }
                if(this.masterRoom == false)
                    this.btn_huy_lam_cai.setVisible(true);
            }else{
                this.btn_lam_cai.setEnabled(true);
                this.btn_lam_cai.setBright(true);
                if(this.roomWorld == false)
                    this.btn_lam_cai.setVisible(true);
                this.sp_chuong.setVisible(false);
                if(this.is_pause_btn == true) {
                    cc.eventManager.resumeTarget(this.btn_lam_cai, true);
                    this.is_pause_btn = false;
                }

            }
        },
        visibleSubBanker : function(){
            this.sp_chuong.setVisible(false);
            this.sp_sub_banker.setVisible(false);
            for(var i =0; i < 8; i ++){
                var player = this["pn_player_" + (i + 1)];
                player.getChildByName("sp_chuong").setVisible(false);
                player.getChildByName("sp_sub_banker").setVisible(false);
            }
        },
        stopActionAndRemoveChild : function(panel, txt_child){
            var numberchild = panel.childrenCount;
            if(numberchild > 0){
                for(var j = 0; j<numberchild; j++) {
                    if (panel.getChildByName(txt_child + j) != null) {
                        var aSprite1 = panel.getChildByName(txt_child + j);
                        aSprite1.stopAllActions();
                        aSprite1.setVisible(false);
                    }
                }
            }
            panel.removeAllChildren();
        },
        visibleAllChild : function(panel, txt_child){
            var numberchild = panel.childrenCount;
            if(numberchild > 0){
                for(var j = 0; j<numberchild; j++) {
                    if (panel.getChildByName(txt_child + j) != null) {
                        var aSprite1 = panel.getChildByName(txt_child + j);
                        aSprite1.setVisible(false);
                    }
                }
            }
        },

        setBankerPlayer : function(nickname, moneyBanker, list_lock_gate){
            this.resetBankerPlayer();
            if(this.banker != ""){
                if(this.banker == "me"){
                    this.sp_chuong.setVisible(false);
                }else{
                    this.save_place_banker.getChildByName("sp_chuong").setVisible(false);
                }
            }
            if(nickname != "") {
                if(lobby.userInfo.nickname != nickname && this.banker == "me"){
                    if(this.save_order_huy_lam_cai == false) {
                        this.showNotice("Bạn không đủ tiền để tiếp tục làm cái!");
                        this.sp_chuong.setVisible(false);
                    }
                }
                var check = this.checkPlayerInArray(nickname);
                if (check == true) {
                    //var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                    //player.getChildByName("sp_chuong").setVisible(true);
                    //player.getChildByName("money").setString(formatMoney(0,3,moneyBanker));
                    this.banker = nickname;
                    //this.save_place_banker = player;
                    this.changePosBanker(nickname);
                } else {
                    if(nickname == lobby.userInfo.nickname) {
                        this.banker = "me";
                        this.save_place_banker = this.pn_user;
                        this.sp_chuong.setVisible(true);
                        if (this.masterRoom == false)
                            this.btn_huy_lam_cai.setVisible(true);
                        this.txt_money.setString(formatMoney(0, 3, moneyBanker));
                    }else{
                        this.changePosBanker(nickname);
                    }
                }
                this.btn_lam_cai.setEnabled(false);
                this.btn_lam_cai.setBright(false);
                this.btn_lam_cai.setVisible(false);
                if(this.is_pause_btn == false) {
                    cc.eventManager.pauseTarget(this.btn_lam_cai, true);
                    this.is_pause_btn = true;
                }
            }else{
                this.btn_lam_cai.setEnabled(true);
                this.btn_lam_cai.setBright(true);
                //this.btn_lam_cai.setVisible(true);
                if(this.banker == "me"){
                    if(this.save_order_huy_lam_cai == true){
                        this.save_order_huy_lam_cai = false;
                        this.banker = "";
                        return;
                    }
                    this.showNotice("Bạn không đủ tiền để tiếp tục làm cái!");
                    this.sp_chuong.setVisible(false);
                }
                this.banker = "";
            }

            for(var i = 0; i < 6; i ++){
                if(list_lock_gate[i].isLock == true) {
                    this.lockByGate[i] = 1;
                    this["lockgate" + i].setVisible(true);
                }else {
                    if(i != 0 && i != 1) {
                        this.lockByGate[i] = 0;
                        this["lockgate" + i].setVisible(false);
                    }
                }
            }
        },
        resetBankerPlayer : function(){
            for(var i = 0; i < 8; i  ++){
                var player = this["pn_player_" + (i + 1)];
                player.getChildByName("sp_chuong").setVisible(false);
            }
            this.sp_chuong.setVisible(false);
            this.btn_huy_lam_cai.setVisible(false);
        },
        buyGateSuccess : function(nickname, moneybuy){
            if(this.banker == "me"){
                var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                player.getChildByName("sp_sub_banker").setVisible(true);
                this.save_place_Subbanker = player;
            }else{
                if(nickname == lobby.userInfo.nickname){
                    this.sp_sub_banker.setVisible(true);
                    if(this.chose_chan_le == 2)
                        this.showNotice("Mua cửa chẵn thành công số tiền " + formatMoney(0,3, moneybuy)+"!");
                    else if(this.chose_chan_le == 3)
                        this.showNotice("Mua cửa lẻ thành công số tiền " + formatMoney(0,3, moneybuy)+"!");
                    this.save_place_Subbanker = this.pn_user;
                }else{
                    if(this.checkPlayerInArray(nickname)) {
                        var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                        player.getChildByName("sp_sub_banker").setVisible(true);
                        this.save_place_Subbanker = player;
                    }
                }
            }
            this.Subbanker = nickname;
            this.addDataToArray(nickname, moneybuy);
        },

        showNoiceOutRoom : function(nickname, status){
            var check = this.checkPlayerInArray(nickname);
            if (check == true) {
                var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                if(status == true)
                    player.getChildByName("sp_outroom").setVisible(true);
                else
                    player.getChildByName("sp_outroom").setVisible(false);
            } else {
                if(status == true)
                    this.sp_outroom.setVisible(true);
                else
                    this.sp_outroom.setVisible(false);
            }
        },

        refunMoney : function(pk){
            var rfCount = pk.rfCount;
            var listPot = pk.potID;
            var listPlayerRefun = pk.playerInfosRefun;

            var int = 0;
            this.audioXocDia.soundEffect(this.audioXocDia.ThuTraPhip);
            for(var i =0; i < listPlayerRefun.length ; i++){
                var nickname = listPlayerRefun[i].nickname;
                var listPotRefun = listPlayerRefun[i].pots;
                var listMoneyRefunEachPot = listPlayerRefun[i].moneyRfPots;
                var allMoneyRefun = listPlayerRefun[i].moneyRefund;
                var currentMoneyUser = listPlayerRefun[i].currentMoney;
                var checkplayer = this.checkPlayerInArray(nickname);
                if(checkplayer == true)
                    var player = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                else {
                    if(nickname == lobby.userInfo.nickname){
                        var player = this.pn_user;
                    }else{
                        this.checkPlayerInArrayStand(nickname, currentMoneyUser);
                        var player = this.pn_user_stand;
                    }
                }

                var arrayPot = listPotRefun.split(',');
                var arrayMoneyRefunEachPot = listMoneyRefunEachPot.split(',');
                var nPot = arrayPot.length;

                cc.log("vao : " + i);
                for(var j = 0; j< nPot; j ++){
                    var vtPot = this.getNamePotId(arrayPot[j]);
                    var child = "";
                    if (arrayPot[j] == 0) {
                        child = "phing_chan_";
                        var panel = this.ListPut_Chan;
                    } else if (arrayPot[j] == 1) {
                        child = "phing_le_";
                        var panel = this.ListPut_Le;
                    } else if (arrayPot[j] == 2) {
                        child = "phing_chan_4_";
                        var panel = this.ListPut_Chan_4;
                    } else if (arrayPot[j] == 3) {
                        child = "phing_chan_0_";
                        var panel = this.ListPut_Chan_0;
                    } else if (arrayPot[j] == 4) {
                        child = "phing_le_1_";
                        var panel = this.ListPut_Le_1;
                    } else if (arrayPot[j] == 5) {
                        child = "phing_le_3_";
                        var panel = this.ListPut_Le_3;
                    }
                    var sprite = this.pn_putMoney.getChildByName(vtPot);
                    var number = this.countNumberPhingFollowMinBet(arrayMoneyRefunEachPot[j]);
                    var moneyOld = this.my_put_money[arrayPot[j]];
                    var moneyNew = moneyOld - arrayMoneyRefunEachPot[j];
                    this.my_put_money[arrayPot[j]] = moneyNew;
                    this.setTextMyMoneyPut();

                    var numberchild = panel.childrenCount;
                    cc.log("numberchild : " + numberchild);
                    for(var h = 0; h < number; h ++){
                        if(panel.getChildByName(child + (numberchild - 1 - h)) != null) {
                            var sprite = panel.getChildByName(child + (numberchild - 1 - h));


                            var sprite2 = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                            if(this.moneyType == 1)
                                GuiUtil.changeSprite(sprite2,"res/CardGame/ResXocDia/xocdia03.png");
                            else
                                GuiUtil.changeSprite(sprite2,"res/CardGame/ResXocDia/xocdia03_s.png");
                            sprite2.setName("refun_" + int);
                            sprite2.setScale(0.45);
                            sprite2.setPosition(cc.p(sprite.getPositionX(), sprite.getPositionY()));
                            int = int + 1;
                            sprite.removeFromParent(true);
                            this.ListTraThuong.addChild(sprite2);
                            var move = cc.MoveTo.create(0.25, cc.p(player.getPosition().x, player.getPosition().y));
                            sprite2.runAction(move);
                        }
                    }
                }
                if(checkplayer == true) {
                    player.getChildByName("money").setString(formatMoney(0, 3, currentMoneyUser));
                }else{
                    if(nickname == lobby.userInfo.nickname) {
                        this.txt_money.setString(formatMoney(0, 3, currentMoneyUser));
                        cc.log("current money refun : " + currentMoneyUser);
                        lobby.updateMoney(currentMoneyUser, this.moneyType);
                    }else{
                        this.checkPlayerInArrayStand(nickname, currentMoneyUser)
                    }
                }
                if(player != this.pn_user_stand)
                    this.addMoneyFly(player, "+", allMoneyRefun);
            }
            for(var i = 0; i < 6; i ++){
                var strgate = this.getNamePotId(i);
                if(this.pn_putMoney.getChildByName(strgate)!= null)
                    var sprite = this.pn_putMoney.getChildByName(strgate);
                var txt_child = "";
                var txt = "";
                if (i == 0) {
                    txt_child = "phing_chan_";
                    txt = "chan";
                } else if (i == 1) {
                    txt_child = "phing_le_";
                    txt = "le";
                } else if (i == 2) {
                    txt_child = "phing_chan_4_";
                    txt = "chan4";
                } else if (i == 3) {
                    txt_child = "phing_chan_0_";
                    txt = "chan0";
                } else if (i == 4) {
                    txt_child = "phing_le_1_";
                    txt = "le1";
                } else if (i == 5) {
                    txt_child = "phing_le_3_";
                    txt = "le3";
                }
                this.array_save_money_each_pot[i] = listPot[i].totalMoney;
                if(listPot[i].moneyRefund > 0){
                    if(listPot[i].totalMoney > 0){
                        this["txt_money_" + txt].setString(formatMoney(0,3,listPot[i].totalMoney));
                    }else{
                        this["txt_money_" + txt].setString("");
                    }
                    cc.log("money refun: " + listPot[i].moneyRefund);
                    this.addMoneyFly(sprite, "-", listPot[i].moneyRefund);
                }
                if(i == 0 || i == 1){
                    if(listPot[i].moneyRefund > 0) {
                        var txt = "";
                        if (i == 0) {
                            var List_phing = this.ListPut_Le;
                            var List_Ve = this.ListPut_Chan;
                            txt = "phing_chan_";
                            var total_phing = listPot[1].totalMoney;
                            var totoal_ve = listPot[0].totalMoney;
                        } else {
                            var List_phing = this.ListPut_Chan;
                            var List_Ve = this.ListPut_Le;
                            txt = "phing_le_";
                            var total_phing = listPot[0].totalMoney;
                            var totoal_ve = listPot[1].totalMoney;
                        }
                        this.stopActionAndRemoveChild(List_Ve, txt);
                        if(listPot[i].totalMoney > 0) {
                            var numberChild_phing = List_phing.childrenCount;
                            if(numberChild_phing > 0) {
                                var numberChild_ve = Math.ceil((numberChild_phing * totoal_ve) / total_phing);
                                //if (numberChild_ve > 30)
                                //    numberChild_ve = 30;
                                var stt = 0;
                                this.save_number_phing_in_pot[i] = numberChild_ve;
                                for (var j = 0; j < numberChild_ve; j++) {


                                    var aSprite = GuiUtil.createSprite("res/CardGame/ResXocDia/xocdia03.png");// new cc.Sprite();
                                    if(this.moneyType == 1)
                                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03.png");
                                    else
                                        GuiUtil.changeSprite(aSprite,"res/CardGame/ResXocDia/xocdia03_s.png");
                                    var strgate = this.getNamePotId(i);
                                    var xy = this.getRandomVitriPot(i, strgate);
                                    var x = parseFloat(xy[0]);
                                    var y = parseFloat(xy[1]);
                                    aSprite.setPosition(cc.p(x, y));
                                    //cc.log("vi tri x: " + aSprite.getPositionX() + " y: " + aSprite.getPositionY());
                                    aSprite.setScale(0.5);
                                    aSprite.setName(txt + stt);
                                    if (i == 0)
                                        this.ListPut_Chan.addChild(aSprite);
                                    else
                                        this.ListPut_Le.addChild(aSprite);
                                    stt = stt + 1;
                                }
                            }else{
                                this.drawAllPot(i, this.array_save_money_each_pot[i]);
                            }
                        }
                    }
                }else {
                    if (listPot[i].moneyRefund > 0) {
                        this.drawAllPot(i, this.array_save_money_each_pot[i]);
                    }
                }
            }
            this.runAction(cc.sequence(cc.delayTime(0.25), cc.callFunc(function(){
                GameScene.gameGui.stopActionAndRemoveChild(GameScene.gameGui.ListTraThuong, "refun_");
            })));

        },
        getNamePotId : function(index){
            var strgate = null;
            if(index == 0)
                strgate = "btn_put_chan";
            else if(index == 1)
                strgate = "btn_put_le";
            else if(index == 2)
                strgate = "btn_put_chan4";
            else if(index == 3)
                strgate = "btn_put_chan0";
            else if(index == 4)
                strgate = "btn_put_le1";
            else if(index == 5)
                strgate = "btn_put_le3";
            return strgate;
        },
        addMoneyFly : function(target,plus, money){
            if(target == null) return;
            var panel = new ccui.Layout();
            var kc = 0;
            if(target == this.sp_dealer)
                kc = -80;
            panel.setPosition(cc.p(target.getPosition().x,target.getPosition().y+ kc));
            panel.setBackGroundColorOpacity(0);
            this.pn_xocdia.addChild(panel);
            if(money > 0)
                var txt_moneywin = new cc.LabelTTF(plus + formatMoney(0,3,money), fontRobotoBlack.fontName, 34);
            else
                var txt_moneywin = new cc.LabelTTF("", fontRobotoBlack.fontName, 25);
            txt_moneywin.setPosition(cc.p(0,0));
            if(this.moneyType == 1) {
                txt_moneywin.setColor(cc.color("#E702FE"));
                txt_moneywin.enableStroke(cc.p("#BFBFBF"), 2);
            }else {
                txt_moneywin.setColor(cc.color("#c0c1c3"));
                txt_moneywin.enableStroke(cc.p("#000000"),2);
            }
            panel.addChild(txt_moneywin);

            var move = cc.MoveTo.create(0.8, cc.p(panel.getPosition().x, panel.getPosition().y + 40));
            var spawn = cc.spawn(move, cc.fadeOut(0.8));
            panel.runAction(cc.sequence(cc.delayTime(1.5), spawn,cc.callFunc(function(){
                txt_moneywin.removeFromParent(true);
                panel.removeFromParent(true);
            })));
        },

        showCancuaBanCua : function(){
            if(this.STATE_XOC_DIA == 3) {
                if (this.banker == "me") {
                    this.btn_can_tat.setVisible(true);
                    if( this.save_number_phing_in_pot[0] > 0)
                        this.btn_ban_cua.setVisible(true);
                    if(this.save_number_phing_in_pot[1] > 0)
                        this.btn_ban_le.setVisible(true);
                    this.btn_huy_lam_cai.setVisible(false);
                }
            }else if (this.STATE_XOC_DIA == 4){
                if (this.banker == "me") {
                    this.btn_can_tat.setVisible(true);
                    this.btn_can_tat.setEnabled(true);
                    this.btn_can_tat.setBright(true);
                    this.txt_can_tat.setColor(cc.color("#FFFFFF"));
                    this.btn_banker_hoantien.setVisible(true);
                    this.btn_banker_hoantien.setEnabled(true);
                    this.btn_banker_hoantien.setBright(true);
                    this.txt_hoan_tien.setColor(cc.color("#FFFFFF"));
                    this.txt_money_hoan.setColor(cc.color("#FFFFFF"));
                    this.btn_xac_nhan.setVisible(false);
                    this.btn_huy_lam_cai.setVisible(false);
                }
                this.pn_scroll.setVisible(false);
                this.btn_xac_nhan.setVisible(false);
                this.btn_can_lech_cua.setVisible(false);
            }else {
                this.btn_can_tat.setVisible(false);
                this.btn_ban_cua.setVisible(false);
                this.btn_ban_le.setVisible(false);
                this.btn_can_lech_cua.setVisible(false);
                this.pn_scroll.setVisible(false);
                this.btn_xac_nhan.setVisible(false);
                this.btn_can_lech_cua.setVisible(false);
                this.btn_banker_hoantien.setVisible(false);
                if (this.STATE_XOC_DIA != 1) {
                    if (this.banker == "me") {
                        if (this.save_order_huy_lam_cai == false) {
                            if(this.masterRoom == false)
                                this.btn_huy_lam_cai.setVisible(true);
                        }
                    }
                }
            }
            if(this.STATE_XOC_DIA == 1 || this.STATE_XOC_DIA == 2){
                this.btn_put_x2.setEnabled(true);
                this.btn_put_x2.setBright(true);
                this.txt_put_x2.setColor(cc.color("#FFFFFF"));
                this.btn_all_in.setEnabled(true);
                this.btn_all_in.setBright(true);
                this.txt_all_in.setColor(cc.color("#FFFFFF"));
            }else{
                this.btn_put_x2.setEnabled(false);
                this.btn_put_x2.setBright(false);
                this.txt_put_x2.setColor(cc.color("#BFBFBF"));
                this.btn_all_in.setEnabled(false);
                this.btn_all_in.setBright(false);
                this.txt_all_in.setColor(cc.color("#BFBFBF"));
            }
            if(this.banker == "me"){
                this.btn_put_x2.setEnabled(false);
                this.btn_put_x2.setBright(false);
                this.txt_put_x2.setColor(cc.color("#BFBFBF"));
                this.btn_all_in.setEnabled(false);
                this.btn_all_in.setBright(false);
                this.txt_all_in.setColor(cc.color("#BFBFBF"));
            }
            if(this.STATE_XOC_DIA == 0 || this.STATE_XOC_DIA == 1 || this.STATE_XOC_DIA == 2){
                if(this.masterRoom == true){
                    this.btn_chot_lai.setVisible(true);
                }
            }else{
                this.btn_chot_lai.setVisible(false);
            }
        },

        onButtonChat : function(){
            if (!this.chatLayer){
                this.chatLayer = new ChatLayer(this);
                this.chatLayer.setVisible(false);
                this.addChild(this.chatLayer, GameGui.CHAT_Z_ORDER);
            }
            this.chatLayer.setVisible(!this.chatLayer.isVisible());
            this.chatLayer.touchListener.setEnabled(this.chatLayer.isVisible());
        },
        onButtonInfo: function(){
            var s = GameManager.getInstance().getHotroLink(GameList.XocDia);
            if(cc.sys.os == cc.sys.OS_IOS) {
                if (lobby.open_payment_ios == false) {
                    popup.openPanel_Alert_Lobby("Chức năng đang được nâng cấp!");
                    return;
                }
            }
            ConnectNative.openWebView(s, false);
        },

        addMoney: function(target, money, time) {
            if(!time){
                time = 0;
            }

            var nodeMoney = gameUtility.createNodeMoney(money);
            nodeMoney.setLocalZOrder(5);
            target.addChild(nodeMoney);
            this.save_array_effect_money.push(nodeMoney);
            var pos = cc.p(0,0);

            nodeMoney.setPosition(pos);
            nodeMoney.setVisible(false);
            nodeMoney.setScale(3);
            nodeMoney.runAction(cc.sequence(cc.delayTime(time),cc.show(),cc.spawn(cc.fadeIn(.5),new cc.EaseBounceOut(cc.scaleTo(.5,.85))),cc.delayTime(3),cc.moveBy(1.25,cc.p(0,100)),cc.hide()));
        },
        removeEffectMoney : function(){
            for(var i = 0 ; i < this.save_array_effect_money.length; i++){
                var effectItem = this.save_array_effect_money[i];
                this.save_array_effect_money.pop(i);
                effectItem.stopAllActions();
                effectItem.removeFromParent();
            }
            this.effectUpdateMatch = [];
        },

        getRandomVi : function(intVi){
            var xTT = this.vtri_trungtam.getPosition().x;
            var yTT = this.vtri_trungtam.getPosition().y;
            var vitri = [];
            if(intVi == 0){
                var newX = getRandomFloat((xTT - 25.02), xTT-3,3);
                var newY = getRandomFloat(yTT + 3, (yTT + 24),3);
            }else if(intVi == 1){
                var newX = getRandomFloat(xTT +3, (xTT + 25.02),3);
                var newY = getRandomFloat(yTT + 3, (yTT + 24),3);
            }else if(intVi == 2){
                var newX = getRandomFloat((xTT - 25.02), xTT - 3,3);
                var newY = getRandomFloat((yTT - 24), yTT -3,3);
            }else if(intVi == 3){
                var newX = getRandomFloat(xTT + 3, (xTT + 25.02),3);
                var newY = getRandomFloat((yTT - 24), yTT - 3,3);
            }

            vitri.push(newX);
            vitri.push(newY);
            return vitri;
        },

        alertEffect: function() {
            this.is_clock_alarm = true;
            var action = cc.repeatForever(cc.sequence(cc.rotateBy(0.05, 20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, 20)));
            this.tieClock.runAction(action);
            this.tieClock1.runAction(action.clone());
            this.nutbam.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.rotateBy(0.05, 20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, -20), cc.rotateBy(0.05, 20)),
                cc.sequence(cc.moveTo(0.05, cc.p(-11, 44)), cc.moveTo(0.05, cc.p(0, 45)), cc.moveTo(0.05, cc.p(11, 44)), cc.moveTo(0.05, cc.p(0, 45))))));
            this.clock.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.1, 1.05), cc.scaleTo(0.2, 0.95), cc.scaleTo(0.1, 1))));
            this.clockShadow.runAction(cc.repeatForever(cc.sequence(cc.callFunc(this.playTicSound, this), cc.delayTime(0.7), cc.callFunc(this.playTicSound, this), cc.delayTime(0.7))));
        },
        stopTurn: function() {
            if(this.is_clock_alarm == true) {
                this.clock.setScale(1);
                this.clock.stopAllActions();
                this.tieClock.stopAllActions();
                this.tieClock1.stopAllActions();
                this.nutbam.stopAllActions();
                this.tieClock.setRotation(0);
                this.tieClock1.setRotation(0);
                this.nutbam.setRotation(0);
                this.nutbam.setPosition(0, 45);
                this.clockShadow.stopAllActions();
                this.is_clock_alarm = false;
            }
        },

        changedealer : function(i){
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer1_animation/dealer1Plist.plist");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer2_animation/dealer2Plist.plist");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer3_animation/dealer3Plist.plist");
            GuiUtil.changeSprite(this.sp_dealer,"CardGame/ResXocDia/animation/Dealer"+i+"_animation/Dealer"+i+"_00.png");
        },
        actionDealerXocDia : function(index){
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer1_animation/dealer1Plist.plist");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer2_animation/dealer2Plist.plist");
            cc.spriteFrameCache.addSpriteFrames("res/CardGame/ResXocDia/animation/Dealer3_animation/dealer3Plist.plist");
            this.sp_dealer.stopAllActions();

            var animFrames = [];
            var str = "";

            for (var i = 0; i <= 16; i++) {
                if (i < 10)
                    str = "CardGame/ResXocDia/animation/Dealer" + index + "_animation/Dealer" + index + "_0" + i + ".png";
                else
                    str = "CardGame/ResXocDia/animation/Dealer" + index + "_animation/Dealer" + index + "_" + i + ".png";

                var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                var animFrame = new cc.AnimationFrame();
                animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                animFrames.push(animFrame);
            }
            var animation = cc.Animation.create(animFrames, 0.04, 4);
            var animate   = cc.Animate.create(animation);
            var spawn = cc.spawn(animate, cc.callFunc(function(){
                cc.log("lap lap");
                GameScene.gameGui.audioXocDia.soundEffect(GameScene.gameGui.audioXocDia.XocDia);
            }));
            this.sp_dealer.runAction(cc.sequence(cc.scaleTo(0.25,1.3),spawn,cc.scaleTo(0.25,0.83),cc.callFunc(function(){
                GameScene.gameGui.changedealer(GameScene.gameGui.Is_dealer);
                GameScene.gameGui.pn_bat_dia.setVisible(true);
            })));
        },
        drawStatusBegin : function(){
            cc.log("stop all effect");
            this.HideEffectWin();
            this.stopAllActions();
            this.sp_bat.stopAllActions();
            this.removeEffectMoney();
            this.sp_bat.setPosition(this.vtBat);
            this.sp_dealer.stopAllActions();
            this.pn_bat_dia.setVisible(true);
            this.sp_dealer.setScale(0.83);
            this.changedealer(this.Is_dealer);
            this.audioXocDia.stopAllEffect();
            this.pn_notice.runAction(cc.fadeOut(0));
            this.pn_action_ingame.runAction(cc.fadeOut(0));
        },
        drawStatusInTimePut : function(){
            cc.log("stop all effect");
            this.removeEffectMoney();
            this.pn_bat_dia.setVisible(true);
            this.audioXocDia.stopAllEffect();
        },

        showNotice : function(content){
            this.pn_notice.stopAllActions();
            this.pn_notice.setVisible(true);
            this.txt_content_notice.setString(content);
            this.pn_notice.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(2), cc.fadeOut(0.2)));
        },
        showActionInGame : function(content){
            this.pn_action_ingame.stopAllActions();
            this.pn_action_ingame.setVisible(true);
            this.txt_action_ingame.setString(content);
            this.pn_action_ingame.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(2), cc.fadeOut(0.2)));
        },
        showNoticeConfirm : function(content, kind){
            this.kind_confirm = kind;
            this.pn_confirm.setVisible(true);
            this.txt_content_confirm.setString(content);
        },

        responseHuyLamCai :function(bool){
            if(bool == true){
                if(this.banker == "me"){
                    this.showNotice("Đăng ký hủy làm cái thành công!");
                    this.save_order_huy_lam_cai = true;
                }else{
                    this.showNotice("Nhà cái xin dừng làm cái!");
                    this.btn_lam_cai.setVisible(true);
                    this.btn_lam_cai.setEnabled(true);
                    this.btn_lam_cai.setBright(true);
                    if(this.is_pause_btn == true) {
                        cc.eventManager.resumeTarget(this.btn_lam_cai, true);
                        this.is_pause_btn = false;
                    }
                }
            }else{
                if(this.banker == "me"){
                    this.showNotice("Bạn tiếp tục làm cái!");
                    this.save_order_huy_lam_cai = false;
                }else{
                    this.showNotice("Nhà cái tiếp tục làm cái!");
                }
            }
        },

        drawSoiCau : function(pk){
            this.list_soicau.removeAllChildren();
            var totalEven = pk.totalEven;
            var totalOdd = pk.totalOdd;
            this.txt_total_chan.setString(formatMoney(0,3,totalEven));
            this.txt_total_le.setString(formatMoney(0,3,totalOdd));
            var count = pk.rsCount;
            if(count > 100)
                count  = 100;
            var listcau = pk.arrayCau;
            if(this.roomWorld == false) {
                var X = this.pn_soicau.getPositionX() + 128.07;
                var Y = this.pn_soicau.getPositionY() + 107.51;
            }else{
                var X = this.pn_soicau.getPositionX() + 345.99;
                var Y = this.pn_soicau.getPositionY() + 310;
            }
            var saveY = Y;
            var countY = 1;
            for(var i = 0; i < count; i ++){
                var rs = listcau[i].rs;


                var sp_vi = GuiUtil.createSprite("res/CardGame/ResXocDia/vi1_s.png");// new cc.Sprite();
                if(rs == 0)
                    GuiUtil.changeSprite(sp_vi,"res/CardGame/ResXocDia/vi1_s.png");
                else
                    GuiUtil.changeSprite(sp_vi,"res/CardGame/ResXocDia/vi2_s.png");
                sp_vi.setPosition(cc.p(X,Y));
                this.list_soicau.addChild(sp_vi);
                Y = Y - 28.3;
                countY = countY + 1;
                if(countY >= 5){
                    countY =1;
                    Y = saveY;
                    X = X + 28;
                }

            }
        },
        updateChatRoom : function(nickname, image){
            var checkNickName = this.checkPlayerInArray(nickname);
            if(checkNickName == true){
                var playerSlot = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                var localChair = this.findPosUserOutRoom(nickname) + 1;
                var position = playerSlot.getPosition();
            }else{
                var check = false;
                for(var i = 0; i < this.listPlayerStand.length; i ++){
                    if(this.listPlayerStand[i].nickname == nickname){
                        check = true;
                        return;
                    }
                }
                if(check == false) {
                    var playerSlot = this.pn_user;
                    var localChair = 0;
                    var position = cc.p(playerSlot.getPositionX(), playerSlot.getPositionY() - 20);
                }
            }


            if (this.chatImage[localChair]){
                this.chatImage[localChair].removeFromParent();
                this.chatImage[localChair] = null;
            }

            this.chatImage[localChair] = image;
            this.chatImage[localChair].setPosition(position);
            this.addChild(this.chatImage[localChair]);

            var actionArr = [];
            for (var i=0; i<4; i++){
                actionArr.push(cc.moveBy(0.3, 0, 10));
                actionArr.push(cc.moveBy(0.3, 0, -10));
            }
            actionArr.push(cc.callFunc(function(){
                if (this.chatImage[localChair]){
                    this.chatImage[localChair].removeFromParent();
                    this.chatImage[localChair] = null;
                }
            }.bind(this)));

            this.chatImage[localChair].runAction(cc.sequence(actionArr));
        },

        clearChatRoom: function(){
            for(var i = 0; i < XocDia.MAX_PLAYER; i++) {
                if (this.chatImage[i]){
                    this.chatImage[i].removeFromParent();
                    this.chatImage[i] = null;
                }
            }
        },
        ActionBanker : function(pk){
            if(pk.action == 1){
                this.showNotice("Nhà cái cân nốt tiền!");
            }else{
                if(this.banker == "me"){
                    this.showNotice("Hoàn lại số tiền " + formatMoney(0,3,pk.money) +" !");
                }else{
                    this.showNotice("Nhà cái hoàn lại " + formatMoney(0,3,pk.money) +" !");
                }
            }
        },
        beginSellGate : function(money){
            this.runAction(cc.sequence(cc.delayTime(1.2), cc.callFunc(function(){
                GameScene.gameGui.showSlider(money);
            })));
        },
        //show user stand
        showUserStand : function(){
            this.lv_user_stand.removeAllItems();
            this.lv_user_stand.removeAllChildren();
            if(this.listPlayerStand.length >= 1){
                this.isOpenPlayerStand = true;
                this.pn_user_stand.setVisible(true);
                this.pn_list_user_stand.setVisible(true);
                var cellWidth = this.lv_user_stand.width;
                var peace = cellWidth/4;
                var num_user = this.listPlayerStand.length;
                var num_row = parseInt(num_user/4);
                var num_du = num_user - (num_row*4);
                var cellHeight = 120;
                var name = 0;
                if(num_row > 0){
                    for(var i = 0; i < num_row; i ++){
                        var cellList = new ccui.Layout();
                        cellList.width = this.lv_user_stand.width;
                        cellList.height = cellHeight;
                        for(var j = 0; j < 4; j ++){
                            var avatar = new ccui.Button();
                            avatar.loadTextureNormal(menutab.getlinkAvatar(this.listPlayerStand[name].avatar));
                            avatar.loadTexturePressed(menutab.getlinkAvatar(this.listPlayerStand[name].avatar));
                            avatar.setPosition(cc.p(peace/2 + peace*j,cellHeight/2 + 22));
                            avatar.setAnchorPoint(cc.p(0.5,0.5));
                            avatar.setName("avatar");
                            avatar.setScale(0.55);
                            cellList.addChild(avatar);

                            var sp_kind = new ccui.Button();
                            sp_kind.loadTextureNormal("res/CardGame/ResXocDia/kick.png");
                            sp_kind.loadTexturePressed("res/CardGame/ResXocDia/kick.png");
                            sp_kind.setPosition(cc.p(peace/2 + peace*j + 40,cellHeight/2 + 40));
                            sp_kind.setName(this.listPlayerStand[name].nickname);
                            cellList.addChild(sp_kind);

                            if(this.masterRoom == false) {
                                sp_kind.setVisible(false);
                            }else{
                                if(!this.checkNickNameOrderKick(this.listPlayerStand[name].nickname))
                                    sp_kind.setVisible(true);
                                else
                                    sp_kind.setVisible(false);
                            }

                            sp_kind.addTouchEventListener(function(sender,type){
                                switch (type){
                                    case ccui.Widget.TOUCH_ENDED:
                                        this.touchAvatarListStand(sender);
                                        break;
                                }

                            },this);

                            var full = this.listPlayerStand[name].nickname;
                            if(full.length > 10){
                                var first = full.substr(0,7);
                                full = first + "...";
                            }
                            var lb_value =  new cc.LabelTTF('',  RobotoRegular.fontName, 15, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                            lb_value.setColor(cc.color("#FF6800"));
                            lb_value.setAnchorPoint(cc.p(0.5,0.5));
                            lb_value.setString(full);
                            lb_value.setPosition(avatar.getPositionX(), cellHeight/2 - 25);
                            cellList.addChild(lb_value);

                            var money = formatMoney(0,3,parseInt(this.listPlayerStand[name].money));
                            var lb_money =  new cc.LabelTTF('',  RobotoRegular.fontName, 15, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                            if(this.moneyType == 0) {
                                lb_money.setColor(cc.color("#c0c1c3"));
                            }else {
                                lb_money.setColor(cc.color("#E702FE"));
                            }
                            lb_money.setAnchorPoint(cc.p(0.5,0.5));
                            lb_money.setString(money);
                            lb_money.setPosition(avatar.getPositionX(), cellHeight/2 - 42);
                            cellList.addChild(lb_money);

                            name = name + 1;

                        }
                        this.lv_user_stand.pushBackCustomItem(cellList);
                    }
                }

                if(num_du > 0){
                    var cellList = new ccui.Layout();
                    cellList.width = this.lv_user_stand.width;
                    cellList.height = cellHeight;
                    for(var i = 0; i < num_du; i ++){
                        var avatar = new ccui.Button();
                        avatar.loadTextureNormal(menutab.getlinkAvatar(this.listPlayerStand[name].avatar));
                        avatar.loadTexturePressed(menutab.getlinkAvatar(this.listPlayerStand[name].avatar));
                        avatar.setPosition(cc.p(peace/2 + peace*i,cellHeight/2 + 22));
                        avatar.setName("avatar");
                        avatar.setScale(0.55);
                        cellList.addChild(avatar);

                        var sp_kind = new ccui.Button();
                        sp_kind.loadTextureNormal("res/CardGame/ResXocDia/kick.png");
                        sp_kind.loadTexturePressed("res/CardGame/ResXocDia/kick.png");
                        sp_kind.setPosition(cc.p(peace/2 + peace*i + 40,cellHeight/2 + 40));
                        sp_kind.setName(this.listPlayerStand[name].nickname);
                        cellList.addChild(sp_kind);

                        if(this.masterRoom == false) {
                            sp_kind.setVisible(false);
                        }else{
                            if(!this.checkNickNameOrderKick(this.listPlayerStand[name].nickname))
                                sp_kind.setVisible(true);
                            else
                                sp_kind.setVisible(false);
                        }

                        sp_kind.addTouchEventListener(function(sender,type){
                            switch (type){
                                case ccui.Widget.TOUCH_ENDED:
                                    this.touchAvatarListStand(sender);
                                    break;
                            }

                        },this);

                        var full = this.listPlayerStand[name].nickname;
                        if(full.length > 10){
                            var first = full.substr(0,7);
                            full = first + "...";
                        }
                        var lb_value =  new cc.LabelTTF('',  RobotoRegular.fontName, 15, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        lb_value.setColor(cc.color("#FF6800"));
                        lb_value.setAnchorPoint(cc.p(0.5,0.5));
                        lb_value.setString(full);
                        lb_value.setPosition(avatar.getPositionX(), cellHeight/2 - 25);
                        cellList.addChild(lb_value);

                        var money = formatMoney(0,3,parseInt(this.listPlayerStand[name].money));
                        var lb_money =  new cc.LabelTTF('',  RobotoRegular.fontName, 15, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                        if(this.moneyType == 0) {
                            lb_money.setColor(cc.color("#c0c1c3"));
                        }else {
                            lb_money.setColor(cc.color("#E702FE"));
                        }
                        lb_money.setAnchorPoint(cc.p(0.5,0.5));
                        lb_money.setString(money);
                        lb_money.setPosition(avatar.getPositionX(), cellHeight/2 - 42);
                        cellList.addChild(lb_money);

                        name = name + 1;
                    }
                    this.lv_user_stand.pushBackCustomItem(cellList);
                }

            }else{
                this.pn_user_stand.setVisible(false);
            }
        },
        touchAvatarListStand : function(sender){
            cc.log("name : " + sender.name);
            if(this.masterRoom == true) {
                this.nicknameKick = sender.name;
                this.save_btn_kick = sender;
                this.save_btn_kick.setVisible(false);
                this.showNoticeConfirm("Bạn có chắc chắn muốn Kick người chơi " + this.nicknameKick+ " ?", 2);
            }
        },
        /// funSendLockGate or Kick
        funSendLockGate : function(){
            if(this.isLockOrKick == true) // la khoa cua
            {
                if(gameWsClient != null) {
                    var pk = new XocDia.CmdSendLockGate();
                    pk.putData(this.gateLock);
                    gameWsClient.send(pk);
                    pk.clean();
                }
            }else{
                //if(gameWsClient != null) {
                //    var pk = new XocDia.CmdSendKickUserXocDia();
                //    pk.putData(this.nicknameKick);
                //    gameWsClient.send(pk);
                //    pk.clean();
                //}
            }
        },
        funChotLai : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendChotLai();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
            }
        },
        LockGate : function(pk){
            if(pk.error == 0){
                if(this.lockByGate[this.gateLock] == 0) {
                    if (pk.bChangeLock == true) {
                        this.showNotice("Đăng ký khóa cửa thành công!");
                        this.order_lock_gate[this.gateLock] = 1;
                    }else {
                        this.showNotice("Hủy đăng ký khóa cửa thành công!");
                        this.order_lock_gate[this.gateLock] = 0;
                    }
                }else{
                    if (pk.bChangeLock == true) {
                        this.showNotice("Đăng ký mở cửa thành công!");
                        this.order_lock_gate[this.gateLock] = 1;
                    }else{
                        this.showNotice("Hủy đăng ký mở cửa thành công!");
                        this.order_lock_gate[this.gateLock] = 0;
                    }
                }
            }else{
                this.showNotice("Khóa cửa không thành công!");
            }
        },
        checkLockGate : function(gate){
            if(this.lockByGate[gate] == 1){
                return true;
            }
            return false;
        },
        /// kick user
        ReceiveKickUser : function(pk){
            if(pk.error == 0) {
                if(pk.reason == 1){
                    this.showNotice("Bạn đã Kick người chơi " + this.nicknameKick + " ra khỏi bàn!");
                }else if(pk.reason == 2){
                    this.showNotice("Đăng ký Kick người chơi " + this.nicknameKick + " ra khỏi bàn!");
                    if(!this.checkNickNameOrderKick(this.nicknameKick))
                        this.save_user_order_kick.push(this.nicknameKick);
                }else if(pk.reason == 3){
                    this.showNotice("Hủy đăng ký Kick người chơi " + this.nicknameKick + "!");
                    for(var i = 0; i < this.save_user_order_kick.length; i ++){
                        if(this.nicknameKick == this.save_user_order_kick[i]){
                            this.save_user_order_kick.splice(i, 1);
                            break;
                        }
                    }
                }
            }else{
                this.save_btn_kick.setVisible(true);
            }
        },
        /// Destroy room
        funSendDestroyRoom : function(){
            if(gameWsClient != null) {
                var pk = new XocDia.CmdSendDestroyRoom();
                pk.putData();
                gameWsClient.send(pk);
                pk.clean();
                this.pn_confirm.setVisible(false);
            }
        },
        ReceiveDestroyRoom : function(pk){
            if(pk.error == 0){
                if(pk.reqDestroyRoom  == true) {
                    this.showNotice("Đăng ký hủy bàn chơi thành công!");
                    this.is_destroy_room = true;
                }else {
                    this.showNotice("Bàn chơi tiếp tục!");
                    this.is_destroy_room = false;
                }
            }
        },
        checkNickNameOrderKick : function(nickname){
            for(var i = 0; i < this.save_user_order_kick.length; i ++){
                if(nickname == this.save_user_order_kick[i])
                    return true;
            }
            return false;
        },
        receiveInfoMoiChoi: function(data){
            if(!this.guiMoiChoi){
                this.guiMoiChoi = new MoiChoiLayer();
                this.addChild(this.guiMoiChoi);
            }
            //this.guiMoiChoi.setVisible(true);
            this.guiMoiChoi.show();
            this.guiMoiChoi.updateListItems(data, this.moneyType);
            this.guiMoiChoi.reloadData(data);
        },
        updateMoneyMasterRoom : function(money){
            this.txt_money.setString(formatMoney(0, 3, money));
            lobby.updateMoney(money, this.moneyType);
        },
        updateCurrentmoney : function(pk){
            var nickname = pk.nickname;
            var currentmoney = pk.currentmoney;
            var checkNickName = this.checkPlayerInArray(nickname);
            if(checkNickName == true){
                var playerSlot = this["pn_player_" + (this.findPosUserOutRoom(nickname) + 1)];
                playerSlot.getChildByName("money").setString(formatMoney(0,3,currentmoney));
            }else{
                if(nickname == lobby.userInfo.nickname){
                    this.txt_money.setString(formatMoney(0, 3, currentmoney));
                    lobby.updateMoney(currentmoney, this.moneyType);
                }else{
                    this.checkPlayerInArrayStand(nickname, currentmoney);
                }
            }

        }
    }

);


codeXocDia.BTN_PUT_CHAN = 1; codeXocDia.BTN_PUT_LE = 2;
codeXocDia.BTN_PUT_CHAN4 = 3; codeXocDia.BTN_PUT_CHAN0 = 4; codeXocDia.BTN_PUT_LE1 = 5; codeXocDia.BTN_PUT_LE3 = 6;
codeXocDia.BTN_SIT_1 = 7; codeXocDia.BTN_SIT_2 = 8; codeXocDia.BTN_SIT_3 = 9; codeXocDia.BTN_SIT_4 = 10;
codeXocDia.BTN_SIT_5 = 11; codeXocDia.BTN_SIT_6 = 12; codeXocDia.BTN_SIT_7 = 13; codeXocDia.BTN_SIT_8 = 14; codeXocDia.BTN_SIT_9 = 15;
codeXocDia.BTN_VALUE_1 = 16; codeXocDia.BTN_VALUE_2 = 17; codeXocDia.BTN_VALUE_3 = 18;
codeXocDia.BTN_VALUE_4 = 19; codeXocDia.BTN_VALUE_5 = 20;

codeXocDia.BTN_HUY_DAT = 21;
codeXocDia.BTN_LAM_CAI = 22;
codeXocDia.BTN_BACKROOM = 23;
codeXocDia.BTN_PUT_MONEY_X2 = 24;
codeXocDia.BTN_PUT_ALLIN = 25;
codeXocDia.BTN_CHAT = 26;
codeXocDia.BTN_INFO = 27;
codeXocDia.BTN_CAN_CUA = 28;
codeXocDia.BTN_BAN_CUA = 29;
codeXocDia.BTN_CAN_LECH_CUA = 30;
codeXocDia.BTN_HUY_LAM_CAI = 31;

codeXocDia.BTN_HUY_CONFIRM = 32;
codeXocDia.BTN_OK_CONFIRM = 33;
codeXocDia.BTN_BAN_LE = 34;
codeXocDia.BTN_XAC_NHAN = 35;
codeXocDia.BTN_BANKER_HOANTIEN = 36;
codeXocDia.BTN_CLOSE_SCROLL = 37;
codeXocDia.BTN_ON_SHOW_BUY_GATE = 38;

codeXocDia.BTN_CLOSE_PN_TOOL = 39;
codeXocDia.BTN_TOOL = 40;

codeXocDia.BTN_USER_STAND = 41;
codeXocDia.BTN_CLOSE_PN_SHOW_USER_STAND = 42;
codeXocDia.BTN_DESTROY_ROOM = 43;
codeXocDia.BTN_CHOT_LAI = 44;

openXocDia = function (pk) {
    if (xocdia === null) {
        xocdia = new codeXocDia();
        xocdiaX = xocdia.getPosition().x;
        xocdiaY = xocdia.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        xocdia.SAVE_PK = pk;
        curScene.addGUI(xocdia, BaseScene.INDEX_GAME_GUI, 0);
    }else{
        xocdia.setVisible(true);
        xocdia.joinRoom(pk);
    }
    xocdiaAppear = true;
};