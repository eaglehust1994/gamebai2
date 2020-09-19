var Minigame = null;
var miniGameX = 0;
var miniGameY = 0;

var onMinigameMoving = false;
var minigameAppear = false;



var miniGameMoving = null;
var MinigameLayer = BaseLayer.extend({
    ctor: function() {
        this.isConnectSocket = false;
        this.isShow = false;
        this._super("Minigame");
        //this.initWithBinaryFile("res/Minigame/Minigame.json");
        this.pNenMiniGame = null;
        this.pMiniGame = null;
        this.img_center = null;
        this.btn_tai_xiu = null;
        this.btn_bau_cua = null;
        this.btn_poker = null;
        this.btn_vong_quay = null;
        this.btn_minigame = null;
        this.btn_cao_thap = null;
        this.miniGameClient = null;
        this.minigameListener = null;
        this.isSelect = false;
        this.isLoginSocket = false;
        this.countSelect = MinigameLayer.BTN_TAI_XIU;;
        this.maxZorder = 1;
        this.sp_nhay = null;
        this.btn_mail = null;
        this.btn_mini_slot = null;
        this.lb_tool_tip = null;
        this.mouseLis = null;

        this.pTimeTaiXiu1 = null;
        this.pTimeTaiXiu2 = null;
        this.lb_time_tai_xiu1 = null;
        this.lb_time_tai_xiu2 = null;

        this.pCountEmail1 = null;
        this.pCountEmail2 = null;
        this.lb_count_email1 = null;
        this.lb_count_email2 = null;
        this.Number_Mail_Unread = null;

        this.arrMenuMiniGame = [];
        this.arrMail = [];
        this.isfirstReadMail = false;

        this.amTaiXiu = null;
        this.amPokego = null;
        this.amBauCua = null;
        this.amMiniPoker = null;
        this.amVongQuay = null;
        this.amCaoThap = null;
        this.baseStoragePath = "";
        if (cc.sys.isNative) {
            this.baseStoragePath = jsb.fileUtils.getWritablePath();
        }

        this.manifestMiniGame = {
            manifestPathMiniGame: ["",
                "res/Minigame/TaiXiu/project.manifest",
                "res/Minigame/BauCua/project.manifest",
                "res/Minigame/ResVQMM/project.manifest",
                "res/Minigame/ResMiniPoker/project.manifest",
                "",
                "",
                "res/Minigame/ResCaoThap/project.manifest",
                "",
                "res/Minigame/ResSlotBa/project.manifest"
            ],
            storagePathMiniGame: ["",
                this.baseStoragePath + "update/res/Minigame/TaiXiu",
                this.baseStoragePath + "update/res/Minigame/BauCua",
                this.baseStoragePath + "update/res/Minigame/ResVQMM",
                this.baseStoragePath + "update/res/Minigame/ResMiniPoker",
                "",
                "",
                this.baseStoragePath + "update/res/Minigame/ResCaoThap",
                "",
                this.baseStoragePath + "update/res/Minigame/ResSlotBa"
            ],
            amMinigame: [],
            isWaitingDowns: [false, false, false, false, false, false, false, false, false, false]
        }
    },
    customizeGUI: function() {
        this.addLayout(this, "pNenMiniGame", cc.p(640, 360), null, cc.size(1280, 720), false);
        this.pNenMiniGame.setVisible(false);
        this.addLayout(this, "pMiniGame", cc.p(640, 360), res_Minigame + "/vong_to.png", cc.size(349, 349), true);
        this.addButton(this.pMiniGame, "btn_tai_xiu", MinigameLayer.BTN_TAI_XIU, cc.p(295, 224), true, res_Minigame + "/tai_xiu.png", res_Minigame + "/tai_xiu.png");
        this.addButton(this.pMiniGame, "btn_bau_cua", MinigameLayer.BTN_BAU_CUA, cc.p(127, 55), true, res_Minigame + "/cua.png", res_Minigame + "/cua.png");
        this.addButton(this.pMiniGame, "btn_poker", MinigameLayer.BTN_POKER, cc.p(59, 129), true, res_Minigame + "/mini_poke.png", res_Minigame + "/mini_poke.png");
        this.addButton(this.pMiniGame, "btn_vong_quay", MinigameLayer.BTN_VONG_QUAY, cc.p(58, 222), true, res_Minigame + "/vong_quay.png", res_Minigame + "/vong_quay.png");
        this.addButton(this.pMiniGame, "btn_cao_thap", MinigameLayer.BTN_CAO_THAP, cc.p(128, 290), true, res_Minigame + "/cao_thap.png", res_Minigame + "/cao_thap.png");
        this.addButton(this.pMiniGame, "btn_mail", MinigameLayer.BTN_MAIL, cc.p(220, 290), true, res_Minigame + "/mail.png", res_Minigame + "/mail.png");
        this.addButton(this.pMiniGame, "btn_mini_slot", MinigameLayer.BTN_MINI_SLOT, cc.p(295, 127), true, res_Minigame + "/poke_ball.png", res_Minigame + "/poke_ball.png");
        this.addButton(this.pMiniGame, "btn_minigame", MinigameLayer.BTN_MINIGAME, cc.p(174.5, 174.5), true, res_Minigame + "/minigame-01.png", res_Minigame + "/minigame-01.png");
        this.addButton(this.pMiniGame, "btn_mail_1", MinigameLayer.BTN_MAIL1, cc.p(225, 56), false, res_Minigame + "/coomingsoon.png", res_Minigame + "/coomingsoon.png");
        if (cc.sys.os == cc.sys.OS_IOS) {
            if (lobby.open_payment_ios == false)
                this.btn_mail.setVisible(false);
        }
        this.addText(this.pMiniGame, "lb_tool_tip", cc.p(293, 178), "Tài Xỉu", RobotoRegular.fontName, 20);
        this.lb_tool_tip.setVisible(false);

        this.addSprite(this.pMiniGame, "pTimeTaiXiu2", cc.p(358, 227), res_Minigame + "/time.png");
        this.addText(this.pTimeTaiXiu2, "lb_time_tai_xiu2", cc.p(28, 13), "00:59", RobotoRegular.fontName, 20);

        this.addSprite(this.pMiniGame, "pCountEmail2", cc.p(244, 283), res_Minigame + "/thong_bao.png");
        this.addText(this.pCountEmail2, "lb_count_email2", cc.p(16, 13), "10", RobotoRegular.fontName, 20);
        this.pMiniGame.setScale(0);
        this.pMiniGame.setRotation(180);


        this.addSprite(this, "img_center", cc.p(1151, 586), res_Minigame + "/minigame-01.png");

        this.addSprite(this.img_center, "sp_nhay", cc.p(53.5, 53.5), res_Minigame + "/minigame-02.png");
        this.sp_nhay.runAction(cc.repeatForever(cc.rotateBy(2, 360)));

        this.addSprite(this.img_center, "pTimeTaiXiu1", cc.p(102, -5), res_Minigame + "/time.png");
        this.addText(this.pTimeTaiXiu1, "lb_time_tai_xiu1", cc.p(28, 13), "00:59", RobotoRegular.fontName, 20);

        this.addSprite(this.img_center, "pCountEmail1", cc.p(85, 106), res_Minigame + "/thong_bao.png");
        this.addText(this.pCountEmail1, "lb_count_email1", cc.p(16, 13), "10", RobotoRegular.fontName, 20);

        this.pCountEmail1.setVisible(false);
        this.pCountEmail2.setVisible(false);
        this.lb_count_email1.setString("");
        this.lb_count_email2.setString("");



        if (!cc.sys.isNative) {
            this.img_center.setPosition(cc.p(1357, 643));
        }

        this.initObjForToolTip();
        if (miniGameMoving === null) {
            miniGameMoving = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                startX: 0,
                startY: 0,
                deltaMove: 10,
                onTouchBegan: function(touch, event) {
                    if (Minigame === null || !minigameAppear) {
                        return false;
                    }
                    var locationInNode = Minigame.img_center.convertToNodeSpace(touch.getLocation());
                    var s = Minigame.img_center.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        startX = touch.getLocation().x;
                        startY = touch.getLocation().y;
                        return true;
                    }
                    return false;
                },
                onTouchMoved: function(touch, event) {
                    //Move the position of current button sprite
                    if (!Minigame.isShow) {
                        var delta = touch.getDelta();
                        Minigame.img_center.x += delta.x;
                        Minigame.img_center.y += delta.y;
                    }

                },
                //Process the touch end event
                onTouchEnded: function(touch, event) {
                    //var target = event.getCurrentTarget();
                    var curX = touch.getLocation().x;
                    var curY = touch.getLocation().y;
                    var dxy = Math.abs(startX - curX) + Math.abs(startY - curY);
                    if (dxy <= this.deltaMove) {
                        Minigame.actionShowMiniGame();
                    }

                    var target = event.getCurrentTarget();
                    var endX = target.getPosition().x;
                    var endY = target.getPosition().y;
                    if (cc.sys.isNative) {
                        if (endX < 0) {
                            target.x = 0;
                        }
                        if (endX > 1280) {
                            target.x = 1280;
                        }
                        if (endY < 0) {
                            target.y = 0;
                        }
                        if (endY > 720) {
                            target.y = 720;
                        }
                    } else {
                        if (endX < -320) {
                            target.x = -320;
                        }
                        if (endX > 1600) {
                            target.x = 1600;
                        }
                        if (endY < -270) {
                            target.y = -270;
                        }
                        if (endY > 810) {
                            target.y = 810;
                        }

                    }
                }
            });

            cc.eventManager.addListener(miniGameMoving, this.img_center);
        } else if (!cc.sys.isNative) {
            cc.eventManager.addListener(miniGameMoving, this.img_center);
        }

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {

                if (Minigame.isShow) {
                    this.swallowTouches = true;
                } else {
                    this.swallowTouches = false;
                }
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }

                return true;
            },
            //Trigger when moving touch
            onTouchMoved: function(touch, event) {
                //Move the position of current button sprite



            },
            //Process the touch end event
            onTouchEnded: function(touch, event) {
                var target = event.getCurrentTarget();
                if (Minigame.isShow = true) {
                    Minigame.actionHideMiniGame();
                }
            }
        });
        if (!cc.sys.isNative) {
            cc.eventManager.addListener(listener1, this.pNenMiniGame);
            cc.eventManager.pauseTarget(this.pNenMiniGame, true);
        }



        this.connectSocket();



        if ('mouse' in cc.sys.capabilities) {
            this.mouseLis = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event) {},
                onMouseMove: function(event) {
                    var pos = event.getLocation();
                    target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);
                    if (!cc.rectContainsPoint(rect, locationInNode)) {
                        Minigame.hideToolTip();

                    } else {

                        for (var i = 0; i < Minigame.arrMenuMiniGame.length; i++) {
                            if (cc.rectContainsPoint(cc.rect(Minigame.arrMenuMiniGame[i].position.x - 37, Minigame.arrMenuMiniGame[i].position.y - 37, 75, 75), locationInNode)) {
                                var str = "";
                                str = Minigame.arrMenuMiniGame[i].name;
                                Minigame.showToolTip(str, Minigame.arrMenuMiniGame[i].position);

                                break;
                            } else {
                                Minigame.hideToolTip();
                            }
                        }


                    }

                },
                onMouseUp: function(event) {
                    var pos = event.getLocation();
                    target = event.getCurrentTarget();

                }
            });

        } else {}
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener(this.mouseLis, this.pMiniGame);

        }
        if (cc.sys.isNative) {
            this.initLayerDownload(this.btn_tai_xiu);
            this.initLayerDownload(this.btn_bau_cua);
            this.initLayerDownload(this.btn_cao_thap);
            this.initLayerDownload(this.btn_poker);
            this.initLayerDownload(this.btn_mini_slot);
            this.initLayerDownload(this.btn_vong_quay);
            for (var i = 0; i < this.manifestMiniGame.manifestPathMiniGame.length; i++) {
                if (this.manifestMiniGame.manifestPathMiniGame[i] == "") {
                    this.manifestMiniGame.amMinigame.push(new Object());
                } else {
                    var _am = new jsb.AssetsManager(this.manifestMiniGame.manifestPathMiniGame[i], this.manifestMiniGame.storagePathMiniGame[i]);
                    _am.retain();
                    this.manifestMiniGame.amMinigame.push(_am);
                    checkUpdateManifest(_am, this.pMiniGame.getChildByTag(i));
                }
            }
        }

    },
    initLayerDownload: function(parent) {
        this.addLayout(parent, "ShowDownload" + parent.getTag(), cc.p(37, 37), null, cc.size(100, 100), false);
        this["ShowDownload" + parent.getTag()].setName("ShowDownload");
        this["ShowDownload" + parent.getTag()].setTag(999);
        this["ShowDownload" + parent.getTag()].setVisible(false);
        this.addText(this["ShowDownload" + parent.getTag()], "lb_download" + parent.getTag(), cc.p(50, 50), "Download", fontRobotoBold.fontName, 24);
        this["ShowDownload" + parent.getTag()].setName("lb_ShowDownload");


        var sprite = new cc.Sprite("res/common/avatar/Vong_Vang.png");
        var uiTimer = new cc.ProgressTimer(sprite);
        uiTimer.setType(cc.ProgressTimer.TYPE_RADIAL);
        uiTimer.setReverseDirection(true);
        var size = this.btn_tai_xiu.getContentSize();
        uiTimer.setPosition(37, 37.5);
        uiTimer.setPercentage(0);
        parent.addChild(uiTimer);
        uiTimer.setScale(0.7);
        uiTimer.setTag(1000);
        uiTimer.setVisible(false);
    },
    updateTimeTaiXiu: function(remainTime, bettingState) {
        if (taiXiuAppear) {
            this.pTimeTaiXiu1.setVisible(false);
            this.pTimeTaiXiu2.setVisible(false);
        } else {
            if (bettingState == true) {
                this.lb_time_tai_xiu1.setColor(cc.color(255, 255, 255));
                this.lb_time_tai_xiu2.setColor(cc.color(255, 255, 255));
            } else {
                this.lb_time_tai_xiu1.setColor(cc.color(255, 255, 0));
                this.lb_time_tai_xiu2.setColor(cc.color(255, 255, 0));
            }
            this.pTimeTaiXiu1.setVisible(true);
            this.pTimeTaiXiu2.setVisible(true);
            if (remainTime > 9) {
                this.lb_time_tai_xiu1.setString("00:" + remainTime);
                this.lb_time_tai_xiu2.setString("00:" + remainTime);
                //this.lb_time_tai_xiu1.setColor(cc.color(255,255,255));
            } else {
                this.lb_time_tai_xiu1.setString("00:0" + remainTime);
                this.lb_time_tai_xiu2.setString("00:0" + remainTime);
                //if(remainTime<6)
                //{
                //    this.lb_dem_giay_choi.setColor(cc.color(255,0,0));
                //}
            }

        }

    },
    initObjForToolTip: function() {
        var objTooltip1 = {};
        objTooltip1.position = this.btn_tai_xiu.getPosition();
        objTooltip1.name = "Tài xỉu";

        var objTooltip2 = {};
        objTooltip2.position = this.btn_bau_cua.getPosition();
        objTooltip2.name = "Bầu cua";

        var objTooltip3 = {};
        objTooltip3.position = this.btn_poker.getPosition();
        objTooltip3.name = "Poker";

        var objTooltip4 = {};
        objTooltip4.position = this.btn_mini_slot.getPosition();
        objTooltip4.name = "Poke Go";

        var objTooltip5 = {};
        objTooltip5.position = this.btn_cao_thap.getPosition();
        objTooltip5.name = "Cao thấp";

        var objTooltip6 = {};
        objTooltip6.position = this.btn_vong_quay.getPosition();
        objTooltip6.name = "Vòng quay";

        var objTooltip7 = {};
        objTooltip7.position = this.btn_mail.getPosition();
        objTooltip7.name = "Hòm thư";


        this.arrMenuMiniGame.push(objTooltip1);
        this.arrMenuMiniGame.push(objTooltip2);
        this.arrMenuMiniGame.push(objTooltip3);
        this.arrMenuMiniGame.push(objTooltip4);
        this.arrMenuMiniGame.push(objTooltip5);
        this.arrMenuMiniGame.push(objTooltip6);
        this.arrMenuMiniGame.push(objTooltip7);
    },
    showToolTip: function(str, posi) {
        this.lb_tool_tip.setVisible(true);
        this.lb_tool_tip.setString(str);
        this.lb_tool_tip.setPosition(new cc.p(posi.x, posi.y - 45));
    },
    hideToolTip: function() {
        this.lb_tool_tip.setVisible(false);
    },
    mapReleaseToCodeSocket: function(currentRelease) {
        switch (currentRelease) {
            case MinigameLayer.BTN_TAI_XIU:
                return 'taixiu';
            case MinigameLayer.BTN_BAU_CUA:
                return 'minigame';
            case MinigameLayer.BTN_POKER:
                return 'poker';
            case MinigameLayer.BTN_VONG_QUAY:
                return 'taixiu';
            case MinigameLayer.IMG_MINIGAME:
                return 'minigame';
            case MinigameLayer.BTN_MINIGAME:
                return 'minigame';
            case MinigameLayer.BTN_CAO_THAP:
                return 'minigame';
            case MinigameLayer.BTN_MAIL:
                return 'minigame';
            case MinigameLayer.BTN_MAIL1:
                return 'minigame';
            case MinigameLayer.BTN_MINI_SLOT:
                return 'minigame';
            default:
                return 'minigame'
        }
    },
    connectSocket: function() {
        if (this.miniGameClient == null) {
            this.miniGameClient = new WebsocketClient();

        }
        this.miniGameClient.connect(lobby.appConfig[this.mapReleaseToCodeSocket(this.countSelect)].ip, lobby.appConfig[this.mapReleaseToCodeSocket(this.countSelect)].port, isHttps, new MinigameListener());

    },
    onButtonRelease: function(button, id) {

        switch (id) {
            case MinigameLayer.IMG_MINIGAME:
                this.actionShowMiniGame();
                break;
            case MinigameLayer.BTN_MINIGAME:
                this.actionHideMiniGame();

                break;
            case MinigameLayer.BTN_TAI_XIU:
                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_TAI_XIU).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_TAI_XIU);
                    } else {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!taiXiuAppear) {
                                openTaiXiu();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_TAI_XIU;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    }
                } else
                    loadResoureGame(g_resources_mn_tai_xiu, taiXiu, function() {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!taiXiuAppear) {
                                openTaiXiu();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_TAI_XIU;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    });

                break;
            case MinigameLayer.BTN_VONG_QUAY:

                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_VONG_QUAY).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_VONG_QUAY);
                    } else {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!vongquayAppear) {
                                openVongquay();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_VONG_QUAY;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    }
                } else {
                    Minigame.actionHideMiniGame();
                    loadResoureGame(g_resources_mn_vqmm, vongquay, function() {
                        if (Minigame.isLoginSocket) {
                            if (!vongquayAppear) {
                                openVongquay();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_VONG_QUAY;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    });
                }
                break;

            case MinigameLayer.BTN_POKER:
                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_POKER).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_POKER);
                    } else {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!miniPokerAppear) {

                                openMiniPoker();
                                if (miniPoker.autoRotate == false) {
                                    subScribeMiniPoker(miniPoker.MINI_POKER_ROOM);
                                }
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_POKER;

                            Minigame.isSelect = true;

                            Minigame.connectSocket();
                        }
                    }
                } else {
                    Minigame.actionHideMiniGame();
                    loadResoureGame(g_resources_mn_poker, miniPoker, function() {
                        if (Minigame.isLoginSocket) {
                            if (!miniPokerAppear) {

                                openMiniPoker();
                                if (miniPoker.autoRotate == false) {
                                    subScribeMiniPoker(miniPoker.MINI_POKER_ROOM);
                                }
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_POKER;

                            Minigame.isSelect = true;

                            Minigame.connectSocket();
                        }
                    });
                }

                break;
            case MinigameLayer.BTN_BAU_CUA:
                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_BAU_CUA).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_BAU_CUA);
                    } else {
                        if (Minigame.isLoginSocket) {
                            if (!baucuaAppear) {

                                openBauCua();
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_BAU_CUA;

                            Minigame.isSelect = true;

                            Minigame.connectSocket();
                        }
                    }
                } else {
                    Minigame.actionHideMiniGame();
                    loadResoureGame(g_resources_mn_bau_cua, baucua, function() {
                        if (Minigame.isLoginSocket) {
                            if (!baucuaAppear) {

                                openBauCua();
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_BAU_CUA;

                            Minigame.isSelect = true;

                            Minigame.connectSocket();
                        }
                    });
                }

                break;
            case MinigameLayer.BTN_CAO_THAP:
                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_CAO_THAP).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_CAO_THAP);
                    } else {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!caothapAppear) {
                                openCaoThap();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_CAO_THAP;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    }
                } else {
                    Minigame.actionHideMiniGame();

                    loadResoureGame(g_resources_mn_cao_thap, caothap, function() {
                        if (Minigame.isLoginSocket) {
                            if (!caothapAppear) {
                                openCaoThap();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_CAO_THAP;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    });
                }

                break;
            case MinigameLayer.BTN_MAIL:
                Minigame.actionHideMiniGame();
                openmail_info();
                break;
            case MinigameLayer.BTN_MINI_SLOT:
                if (cc.sys.isNative) {
                    if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_MINI_SLOT).getChildByTag(999).isVisible()) {
                        this.downloadGamne(MinigameLayer.BTN_MINI_SLOT);
                    } else {
                        Minigame.actionHideMiniGame();
                        if (Minigame.isLoginSocket) {
                            if (!slot3hangAppear) {
                                openslot3hang();
                            }
                        } else {
                            Minigame.countSelect = MinigameLayer.BTN_MINI_SLOT;
                            Minigame.isSelect = true;
                            Minigame.connectSocket();
                        }
                    }
                } else {
                    Minigame.actionHideMiniGame();
                    loadResoureGame(g_resources_mn_pokego, slot3hang, function() {
                        if (Minigame.isLoginSocket) {
                            if (!slot3hangAppear) {

                                openslot3hang();
                            }
                        } else {

                            Minigame.countSelect = MinigameLayer.BTN_MINI_SLOT;

                            Minigame.isSelect = true;

                            Minigame.connectSocket();
                        }
                    });
                }

                break;
        }
    },

    downloadGamne: function(gameType) {
        if (this.manifestMiniGame.isWaitingDowns[gameType] == true)
            return;
        this.manifestMiniGame.isWaitingDowns[gameType] = true;
        this.pMiniGame.getChildByTag(gameType).getChildByTag(1000).setVisible(true);
        updateManifest(this.manifestMiniGame.amMinigame[gameType], this.pMiniGame.getChildByTag(gameType).getChildByTag(1000), function() {
            this.pMiniGame.getChildByTag(gameType).getChildByTag(1000).setVisible(false);
            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).setVisible(false);
            this.manifestMiniGame.isWaitingDowns[gameType] = false;
        }.bind(this), function(msg) {
            this.pMiniGame.getChildByTag(gameType).getChildByTag(1000).setVisible(false);
            popup.openPanel_Alert_Lobby("Lỗi : " + msg);
            this.manifestMiniGame.isWaitingDowns[gameType] = false;
        }.bind(this), this.pMiniGame.getChildByTag(gameType))

    },

    actionShowMiniGame: function() {
        if (this.isShow) {
            return;
        }
        this.isShow = true;
        this.pMiniGame.runAction(cc.spawn(cc.scaleTo(0.35, 1), cc.rotateTo(0.35, 0)));
        this.img_center.setVisible(false);
        this.pNenMiniGame.setVisible(true);
        cc.eventManager.resumeTarget(this.pNenMiniGame, true);

    },

    onPurchaseGG: function(signedData, signature, purchaseData) {
        popup.openPanel_Alert_Lobby("signedData: " + signedData + "\n signature : " + signature + "\n purchaseData: " + purchaseData);
    },

    actionHideMiniGame: function() {
        this.btn_minigame.setEnabled(false);
        this.pMiniGame.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.35, 0), cc.rotateTo(0.35, 180)), cc.callFunc(function() {
            Minigame.isShow = false;
            Minigame.img_center.setVisible(true);
            Minigame.btn_minigame.setEnabled(true);
        })));
        this.pNenMiniGame.setVisible(false);
        cc.eventManager.pauseTarget(this.pNenMiniGame, true);
    },

    formatDateTime: function(str) {
        var date = str.split(" ")[0];
        var time = str.split(" ")[1];
        var day = date.split("-")[2];
        var month = date.split("-")[1];
        var year = date.split("-")[0];
        str = time + " " + day + "/" + month + "/" + year;
        return str;
    },
    callBackError: function(response) {},

    parserDataMailUser: function() {
        var url = urlGetMailUser(lobby.userInfo.nickname, 1, lobby.userInfo.accessToken);
        sendRequest(url, null, false, this.callBackMailUser, this.callBackError);
    },
    callBackMailUser: function(response) {
        var jsonData = JSON.parse(response);
        var success = jsonData["success"];
        var errorCode = jsonData["errorCode"];
        var Mail_Unread = jsonData["mailNotRead"];
        this.Number_Mail_Unread = Mail_Unread;
        if (Number(Mail_Unread) > 0) {
            Minigame.pCountEmail1.setVisible(true);
            Minigame.pCountEmail2.setVisible(true);
            Minigame.lb_count_email1.setString(Mail_Unread);
            Minigame.lb_count_email2.setString(Mail_Unread);
        } else {
            Minigame.pCountEmail1.setVisible(false);
            Minigame.pCountEmail2.setVisible(false);
            Minigame.lb_count_email1.setString("");
            Minigame.lb_count_email2.setString("");
        }
    },

    responseKickUser: function(error) {
        if (GameManager.getInstance().inGame == true) {
            GameManager.getInstance().inGame = false;
            GameManager.getInstance().disconnect();
            menutab.showAllInfo();
            GameManager.getInstance().backToLobby();
        }
        menutab.logout();
        if (error == 0)
            popup.openPanel_Alert_Lobby("Bạn bị kick khỏi game!");
        else if (error == 1)
            popup.openPanel_Alert_Lobby("Server bảo trì, bạn vui lòng quay lại sau!");
        else if (error == 2)
            popup.openPanel_Alert_Lobby("Tài khoản của bạn đã bị khóa!");
    },
    responseHasNewMail: function() {
        //cc.log("co mail moi");
        Minigame.parserDataMailUser();
    },
    /*addSprite:function(parent,name,position,image)
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
    addButton:function(name, tag, parent,position,action,imageNol,imageS)
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
    },*/
});

openMiniGame = function() {

    if (Minigame === null) {

        cc.loader.load("res/Minigame/Minigame.json", function(err) {
            if (err)
                return cc.log("load failed");
            else {
                Minigame = new MinigameLayer();
                Minigame.INDEX_SLOT = 1;
                Minigame.INDEX_TAI_XIU = 2;
                Minigame.INDEX_MINI_POKER = 3;
                Minigame.INDEX_MINI_SLOT = 4;
                Minigame.INDEX_MINI_CAO_THAP = 4;
                Minigame.INDEX_CONTROL = 5;
                Minigame.INDEX_BAU_CUA = 6;
                Minigame.INDEX_VQMM = 10;
                miniGameX = Minigame.getPosition().x;
                miniGameY = Minigame.getPosition().y;
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(Minigame, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_CONTROL);
                if (Minigame.isfirstReadMail == false) {
                    Minigame.parserDataMailUser();
                    Minigame.isfirstReadMail = true;
                }
            }
        });


    } else {
        Minigame.setVisible(true);
        Minigame.connectSocket();
        if (Minigame.isfirstReadMail == false) {
            Minigame.parserDataMailUser();
            Minigame.isfirstReadMail = true;
        }
    }

    minigameAppear = true;
};
closeMiniGame = function() {
    if (Minigame === null) {
        return;
    }
    if (minigameAppear) {
        //curScene.removeChild(Minigame);
        Minigame.setVisible(false);
        minigameAppear = false;
    }
};

MinigameLayer.BTN_TAI_XIU = 1;
MinigameLayer.BTN_BAU_CUA = 2;
MinigameLayer.BTN_POKER = 4;
MinigameLayer.BTN_VONG_QUAY = 3;
MinigameLayer.IMG_MINIGAME = 5;
MinigameLayer.BTN_MINIGAME = 6;
MinigameLayer.BTN_CAO_THAP = 7;
MinigameLayer.BTN_MAIL = 8;
MinigameLayer.BTN_MAIL1 = 10;
MinigameLayer.BTN_MINI_SLOT = 9;