//
Res = {};
RoomItem = cc.Class.extend({
    ctor: function (getId, getUserCount, limitPlayer, maxUserPerRoom, moneyBet, requiredMoney, rule, nameRoom, key, quyban) {
        this.roomId = getId;
        this.getUserCount = getUserCount;
        this.limitPlayer = limitPlayer;
        this.moneyBet = moneyBet;
        this.moneyRequire = requiredMoney;
        this.rule = rule;
        this.maxUserPerRoom = maxUserPerRoom;
        this.nameRoom = nameRoom;
        this.key = key;
        this.quyban = quyban;
    }
});

RoomLock = cc.Class.extend({
    ctor: function (getId, numJoin) {
        this.roomId = getId;
        this.numJoin = numJoin;
    }
});


GameData = cc.Class.extend({
    ctor: function () {
        this.gameLogic = null;
        this.gameType = 0 // 0: solo, bt
        this.moneyBetWinList = [];
        this.moneyBetXuList = [];

        this.configVinList = [];
        this.configXuList = [];

        this.save_BetVinList = [];
        this.save_BetXuList = [];

        this.configGameCoVin = [];
        this.configGameCoXu = [];

        this.xuTopServerWeekListMoney = [];
        this.xuTopServerAllListMoney = [];
        this.vinTopServerWeekListMoney = [];
        this.vinTopServerAllListMoney = [];

        this.xuTopServerWeekListNumber = [];
        this.xuTopServerAllListNumber = [];
        this.vinTopServerWeekListNumber = [];
        this.vinTopServerAllListNumber = [];
        /////
        this.topDayVin_money = [];
        this.topWeekVin_money = [];
        this.topMonthVin_money = [];

        this.topDayVin_number = [];
        this.topWeekVin_number = [];
        this.topMonthVin_number = [];

        this.topDayXu_money = [];
        this.topWeekXu_money = [];
        this.topMonthXu_money = [];

        this.topDayXu_number = [];
        this.topWeekXu_number = [];
        this.topMonthXu_number = [];
        ///////
        this.vinCaoThuList = [];
        this.xuCaoThuList = [];
        this.maxPlayer = -1;

        this.RoomFind = [];

        this.fundVipMinRegis = null;

        this.ListRoomHavePass = [];
        this.ruleType = 0;
        this.openMoiChoi = false;
    },

    setGameType: function (gameType) {
        this.gameType = gameType;
        if (this.gameType == GameList.SamSoLo) {
            this.maxPlayer = 2;
        } else if (this.gameType == GameList.SamThuong) {
            this.maxPlayer = 5;
        } else if (this.gameType == GameList.BaCay) {
            this.maxPlayer = 8;
        } else if (this.gameType == GameList.MauBinh || this.gameType == GameList.MauBinhTinhAt) {
            this.maxPlayer = 4;
        } else if (this.gameType == GameList.TienLenSoLo) {
            this.maxPlayer = 2;
        } else if (this.gameType == GameList.TienLenThuong) {
            this.maxPlayer = 4;
        } else if (this.gameType == GameList.BaiCao) {
            this.maxPlayer = 8;
        } else if (this.gameType == GameList.Poker) {
            this.maxPlayer = 9;
        } else if (this.gameType == GameList.Lieng) {
            this.maxPlayer = 9;
        } else if (this.gameType == GameList.XiZach) {
            this.maxPlayer = 6;
        } else if (this.gameType == GameList.CoCaro) {
            this.maxPlayer = 2;
        } else if (this.gameType == GameList.CoTuong) {
            this.maxPlayer = 10;
        } else if (this.gameType == GameList.CoUp) {
            this.maxPlayer = 10;
        } else if (this.gameType == GameList.XocDia) {
            this.maxPlayer = 30;
        }
    },

    clearTopServer: function () {
        this.xuTopServerWeekListMoney = [];
        this.xuTopServerAllListMoney = [];
        this.vinTopServerWeekListMoney = [];
        this.vinTopServerAllListMoney = [];

        this.xuTopServerWeekListNumber = [];
        this.xuTopServerAllListNumber = [];
        this.vinTopServerWeekListNumber = [];
        this.vinTopServerAllListNumber = [];
        GameLobby.getInstance().reloadTopServer();
    },

    updateFindRoom: function (pkg) {
        if (pkg.error == 0) {
            if (pkg.list[0].maxUserPerRoom != gameData.maxPlayer) {
                popup.openPanel_Alert_Lobby("Không tìm thấy phòng đã chọn!");
                return;
            }
            this.RoomFind = [];
            var kk = new RoomItem(
                pkg.list[0].getId,
                pkg.list[0].getUserCount,
                pkg.list[0].limitPlayer,
                pkg.list[0].maxUserPerRoom,
                pkg.list[0].moneyBet,
                pkg.list[0].requiredMoney,
                pkg.list[0].rule,
                pkg.list[0].nameRoom,
                pkg.list[0].key,
                pkg.list[0].quyban
            );
            this.RoomFind.push(kk);
            if (pkg.list[0].moneyType == gameLobbyInstance.typeBan) {
                if (pkg.list[0].moneyType == 1) {
                    this.moneyBetWinList = this.RoomFind;
                } else {
                    this.moneyBetXuList = this.RoomFind;
                }
                gameLobbyInstance.reloadTable();
            } else {
                popup.openPanel_Alert_Lobby("Không tìm thấy phòng đã chọn!");
            }
        } else {
            popup.openPanel_Alert_Lobby("Không tìm thấy phòng đã chọn!");
        }
        gameLobbyInstance.btn_find_table.setEnabled(true);
    },

    updateMoneyBetConfig: function (pkg) {
        this.moneyBetWinList = [];
        this.moneyBetXuList = [];
        var listSize = pkg.listSize;
        var i;
        var currentRule = 0;
        if (this.gameType == GameList.MauBinhTinhAt)
            currentRule = 1;

        for (i = 0; i < listSize; i++) {
            if ((pkg.list[i].maxUserPerRoom == 2 && (this.gameType == GameList.SamSoLo || this.gameType == GameList.TienLenSoLo))
                || (pkg.list[i].maxUserPerRoom != 2 && (this.gameType == GameList.SamThuong || this.gameType == GameList.TienLenThuong))
                || (this.gameType != GameList.SamSoLo && this.gameType != GameList.SamThuong && this.gameType != GameList.TienLenSoLo && this.gameType != GameList.TienLenThuong)) {
                var kk = new RoomItem(
                    pkg.list[i].getId,
                    pkg.list[i].getUserCount,
                    pkg.list[i].limitPlayer,
                    pkg.list[i].maxUserPerRoom,
                    pkg.list[i].moneyBet,
                    pkg.list[i].requiredMoney,
                    pkg.list[i].rule,
                    pkg.list[i].nameRoom,
                    pkg.list[i].key,
                    pkg.list[i].quyban
                );

                if (this.gameType == GameList.XocDia) {
                    if (pkg.list[i].moneyType == 1) {
                        this.moneyBetWinList.push(kk);
                    }
                    else {
                        this.moneyBetXuList.push(kk);
                    }
                } else {
                    if (currentRule == pkg.list[i].rule) {
                        if (pkg.list[i].moneyType == 1) {
                            this.moneyBetWinList.push(kk);
                        }
                        else {
                            this.moneyBetXuList.push(kk);
                        }
                    }
                }
            }
        }

        if (this.gameType == GameList.XocDia) {
            if (listSize > 0) {
                gameLobbyInstance.sp_order_user.setRotation(180);
                gameLobbyInstance.isSortPlayer = true;
                var ar_ban_thuong = [];
                var ar_ban_tg = [];
                var ar_ban_vip = [];
                var ar_ban = [];
                if (pkg.list[0].moneyType == MONEY_VIN) {
                    ar_ban = this.moneyBetWinList;
                } else {
                    ar_ban = this.moneyBetXuList;
                }
                for (var i = 0; i < ar_ban.length; i++) {
                    if (ar_ban[i].rule == 1) {
                        ar_ban_tg.push(ar_ban[i]);
                    } else if (ar_ban[i].rule == 2) {
                        ar_ban_vip.push(ar_ban[i]);
                    } else {
                        ar_ban_thuong.push(ar_ban[i]);
                    }
                }
                // săp xep theo so luong nguoi choi
                ar_ban_tg.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                ar_ban_vip.sort(function (a, b) { return b.getUserCount - a.getUserCount });
                ar_ban_thuong.sort(function (a, b) { return b.getUserCount - a.getUserCount });

                // add tung loai ban
                for (var i = 0; i < ar_ban_vip.length; i++) {
                    ar_ban_tg.push(ar_ban_vip[i]);
                }
                for (var i = 0; i < ar_ban_thuong.length; i++) {
                    ar_ban_tg.push(ar_ban_thuong[i]);
                }
                if (pkg.list[0].moneyType == MONEY_VIN) {
                    this.moneyBetWinList = ar_ban_tg;
                } else {
                    this.moneyBetXuList = ar_ban_tg;
                }
            }
        } else {
            this.moneyBetWinList.sort(function (a, b) { return a.moneyBet - b.moneyBet });
            this.moneyBetXuList.sort(function (a, b) { return a.moneyBet - b.moneyBet });
        }


        this.save_BetVinList = this.moneyBetWinList;
        this.save_BetXuList = this.moneyBetXuList;

        gameLobbyInstance.btn_Vin.setEnabled(true);
        gameLobbyInstance.btn_Xu.setEnabled(true);
        gameLobbyInstance.btn_refresh_table.setEnabled(true);

        gameLobbyInstance.reloadTable();
    },


    updateConfig: function (pkg) {
        if (this.gameType == GameList.MauBinhTinhAt)
            this.ruleType = 1;
        this.configVinList = [];
        this.configXuList = [];
        this.configGameCoVin = [];
        this.configGameCoXu = [];
        var listSize = pkg.listSize;
        var i;
        for (i = 0; i < listSize; i++) {
            if ((pkg.list[i].maxUserPerRoom == 2 && (this.gameType == GameList.SamSoLo || this.gameType == GameList.TienLenSoLo))
                || (pkg.list[i].maxUserPerRoom != 2 && (this.gameType == GameList.SamThuong || this.gameType == GameList.TienLenThuong))
                || (this.gameType != GameList.SamSoLo && this.gameType != GameList.SamThuong && this.gameType != GameList.TienLenSoLo && this.gameType != GameList.TienLenThuong)) {
                var pp = pkg.list[i].moneyBet;
                if (pkg.list[i].moneyType == 1) {
                    for (var j = 0; j < this.configVinList.length; j++) {
                        if (pp == this.configVinList[j])
                            continue;
                    }
                    this.configVinList.push(pp);
                    this.configGameCoVin.push(pkg.list[i]);
                
                }
                else {
                    for (var j = 0; j < this.configXuList.length; j++) {
                        if (pp == this.configXuList[j])
                            continue;
                    }
                    this.configXuList.push(pp);
                    this.configGameCoXu.push(pkg.list[i]);
                }
            }
        }

        this.configVinList.sort(function (a, b) { return a - b });
        this.configXuList.sort(function (a, b) { return a - b });
        if (gameData.gameType == GameList.MauBinhTinhAt)
            gameWsClient.sendGetListRoom(gameLobbyInstance.typeBan, gameData.maxPlayer, -1, 1, CARD_FROM, CARD_TO);
        else
            gameWsClient.sendGetListRoom(gameLobbyInstance.typeBan, gameData.maxPlayer, -1, 0, CARD_FROM, CARD_TO);

        if (this.gameType == GameList.XocDia) {
            gameWsClient.sendGetXocDiaConfig();
        }
    },



    updateXocDiaConfig: function (pkg) {
        this.fundVipMinRegis = pkg.fundVipMinRegis;
        cc.log("tile nhan: " + this.fundVipMinRegis);
    },

    updateTopServer: function (pkg) {
        cc.log("goi reload");
        var i;
        var ar_day_money = [];
        var ar_week_money = [];
        var ar_month_money = [];

        var ar_day_number = [];
        var ar_week_number = [];
        var ar_month_number = [];

        var d_m = 0;
        var w_m = 0;
        var m_m = 0;

        var d_n = 0;
        var w_n = 0;
        var m_n = 0;

        for (var key in JSON.parse(pkg.topWeek_money)) {
            if (JSON.parse(pkg.topDay_money).hasOwnProperty(key)) {
                d_m++;
            }
        }
        for (i = 0; i < d_m; i++) {
            var ob = JSON.parse(pkg.topDay_money)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_day_money.push(item);
        }

        for (var key in JSON.parse(pkg.topWeek_money)) {
            if (JSON.parse(pkg.topWeek_money).hasOwnProperty(key)) {
                w_m++;
            }
        }
        for (i = 0; i < w_m; i++) {
            var ob = JSON.parse(pkg.topWeek_money)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_week_money.push(item);
        }

        for (var key in JSON.parse(pkg.topMonth_money)) {
            if (JSON.parse(pkg.topMonth_money).hasOwnProperty(key)) {
                m_m++;
            }
        }
        for (i = 0; i < m_m; i++) {
            var ob = JSON.parse(pkg.topMonth_money)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_month_money.push(item);
        }

        for (var key in JSON.parse(pkg.topDay_number)) {
            if (JSON.parse(pkg.topDay_number).hasOwnProperty(key)) {
                d_n++;
            }
        }
        for (i = 0; i < d_n; i++) {
            var ob = JSON.parse(pkg.topDay_number)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_day_number.push(item);
        }

        for (var key in JSON.parse(pkg.topWeek_number)) {
            if (JSON.parse(pkg.topWeek_number).hasOwnProperty(key)) {
                w_n++;
            }
        }
        for (i = 0; i < w_n; i++) {
            var ob = JSON.parse(pkg.topWeek_number)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_week_number.push(item);
        }

        for (var key in JSON.parse(pkg.topMonth_number)) {
            if (JSON.parse(pkg.topMonth_number).hasOwnProperty(key)) {
                m_n++;
            }
        }
        for (i = 0; i < m_n; i++) {
            var ob = JSON.parse(pkg.topMonth_number)[i];
            var moneyNum = parseInt(ob["mw"]);
            var name = ob["n"];
            var winCount = ob["cw"];

            var item = { "m": moneyNum, "n": name, "c": winCount };
            ar_month_number.push(item);
        }

        if (pkg.rankType == MONEY_VIN) {
            this.topDayVin_money = ar_day_money;
            this.topWeekVin_money = ar_week_money;
            this.topMonthVin_money = ar_month_money;

            this.topDayVin_number = ar_day_number;
            this.topWeekVin_number = ar_week_number;
            this.topMonthVin_number = ar_month_number;
        } else {
            this.topDayXu_money = ar_day_money;
            this.topWeekXu_money = ar_week_money;
            this.topMonthXu_money = ar_month_money;

            this.topDayXu_number = ar_day_number;
            this.topWeekXu_number = ar_week_number;
            this.topMonthXu_number = ar_month_number;
        }
        if (gameLobbyInstance.topGameLayer == null) {
            gameLobbyInstance.topGameLayer = new TopGameLayer();
            gameLobbyInstance.pn_top_thele.addChild(gameLobbyInstance.topGameLayer);
        } else {
            cc.log("goi reload table");
            gameLobbyInstance.topGameLayer.setVisible(true);
            gameLobbyInstance.topGameLayer.reloadTable();
        }
    },

    updateCaothuListVin: function (userList) {
        this.vinCaoThuArray = userList;
        this.vinCaoThuList = [];
        var vinNumber = userList.length;

        for (var i = 0; i < vinNumber; i++) {
            var ob = this.vinCaoThuArray[i];
            var moneyNum = parseInt(ob["moneyWin"]);

            var name = ob["nickname"];
            cc.log("moneyNum: " + moneyNum + " nickName: " + name);
            var item = { "n": name, "m": moneyNum };
            this.vinCaoThuList.push(item);
        }
        GameLobby.getInstance().reloadTopCaoThu();
    },

    updateCaothuListXu: function (userList) {
        this.xuCaoThuJson = userList;
        this.xuCaoThuList = [];
        var xuNumber = userList.length;


        for (var i = 0; i < xuNumber; i++) {
            var ob = this.xuCaoThuJson[i];
            var moneyNum = parseInt(ob["moneyWin"]);
            var name = ob["nickname"];

            var item = { "n": name, "m": moneyNum };
            this.xuCaoThuList.push(item);
        }
        GameLobby.getInstance().reloadTopCaoThu();
    },

    initDefautNameRoom: function () {
        var text = ["San bằng tất cả"];
        if (gameData.gameType == GameList.MauBinh || gameData.gameType == GameList.MauBinhTinhAt)
            text = ["Thùng phá sảnh", "Bắt sập làng", "Dân chuyên nghiệp", "Thích thì nhích", "Vui chơi có thưởng", "Sảnh rồng cuốn", "Chơi tới bến", "Có tiền thì vào"];
        else if (gameData.gameType == GameList.Lieng)
            text = ["Dân chuyên nghiệp", "Làm giàu không khó", "Nhiều tiền thì vào", "Vui chơi có thưởng", "Dám tất tay không?", "Sợ thì đừng vào", "Pro thì vào", "Đĩ ăn to nào"];
        else if (gameData.gameType == GameList.BaCay)
            text = ["Dân chuyên nghiệp", "Thích thì nhích", "Vui chơi có thưởng", "Tất tay nào", "Có tiền thì vào", "Chơi tới bến", "Vào phòng nổ hũ nào", "10 ông tổ vào đây"];
        else if (gameData.gameType == GameList.BaiCao)
            text = ["Sáp ăn to nào", "Thích thì nhích", "Vui chơi có thưởng", "Tất tay nào", "Có tiền thì vào", "Chơi tới bến", "Vào phòng nổ hũ nào", "Dân chuyên nghiệp"];
        else if (gameData.gameType == GameList.XocDia)
            text = ["Chẵn hay Lẻ đây?", "Dân chuyên nghiệp", "Thích thì nhích", "Vui chơi có thưởng", "Có tiền thì vào", "Chơi tới bến", "Pro thì vào", "Tất tay vào đây"];
        else if (gameData.gameType == GameList.XiZach)
            text = ["Làm giàu không khó", "Dân chuyên nghiệp", "Nhiều tiền thì vào", "Vui chơi có thưởng", "Quắc ăn to:))", "Đủ tuổi thì vào", "Chơi tới bến", "Pro thì vào", "Thích thì nhích"];
        else if (gameData.gameType == GameList.CoTuong || gameData.gameType == GameList.CoUp)
            text = ["Chiếu tướng hết cờ", "Tốt nhập cung nào", "Pháo đầu thì vào", "Dân chuyên nghiệp", "Vui chơi có thưởng", "Cờ bí dí Tốt nào", "Chơi tới bến", "Pro thì vào", "Gà pro vào đây"];
        else if (gameData.gameType == GameList.CoCaro)
            text = ["Dân chuyên nghiệp", "Nhiều tiền thì vào", "Thích thì nhích", "Chấp 1 nước luôn", "Vui chơi có thưởng", "Chơi tới bến", "Pro thì vào", "Gà pro vào đây"];
        else
            text = ["San bằng tất cả", "Nhiều tiền thì vào", "Thích thì nhích", "Vui chơi có thưởng", "Chơi tới bến", "Pro thì vào", "Gà pro vào đây"];

        var ran = getRandomInt(0, (text.length - 1));
        return text[ran];
    }

});

GameData.firstInit = true;
GameData.instance = null;
GameData.getInstance = function () {
    if (GameData.firstInit) {
        GameData.instance = new GameData();
        GameData.firstInit = false;
    }
    return GameData.instance;
};

gameData = GameData.getInstance();

Res.btnRankVinSelected = "res/CardGame/CommonResource/ChonBan/btnRankVinSelected.png";
Res.btnRankVinUnselected = "res/CardGame/CommonResource/ChonBan/btnRankVinUnselected.png";
Res.btnRankXuSelected = "res/CardGame/CommonResource/ChonBan/btnRankXuSelected.png";
Res.btnRankXuUnselected = "res/CardGame/CommonResource/ChonBan/btnRankXuUnselected.png";

Res.imageCenterJoinRoomEnable = "res/CardGame/CommonResource/ChonBan/btn_vaoban.png";
Res.imageCenterJoinRoomPress = "res/CardGame/CommonResource/ChonBan/btn_vaoban_s.png";
Res.imageCenterJoinRoomDisable = "res/CardGame/CommonResource/ChonBan/btn_vaoban_dis.png";
Res.imageCenterVinEnabled = "res/CardGame/CommonResource/ChonBan/imageCenterVinEnabled.png";
Res.imageCenterVinDisabled = "res/CardGame/CommonResource/ChonBan/imageCenterVinDisabled.png";
Res.imageCenterXuEnabled = "res/CardGame/CommonResource/ChonBan/imageCenterXuEnabled.png";
Res.imageCenterXuDisabled = "res/CardGame/CommonResource/ChonBan/imageCenterXuDisabled.png";

Res.imageCenterWorldVinEnabled = "res/CardGame/CommonResource/ChonBan/imageVipVinEnabled.png";
Res.imageCenterWorldVinDisabled = "res/CardGame/CommonResource/ChonBan/imageVipVinDisabled.png";

Res.imageCenterVipVinEnabled = "res/CardGame/CommonResource/ChonBan/imageXDVip2Enabled.png";
Res.imageCenterVipVinDisabled = "res/CardGame/CommonResource/ChonBan/imageXDVip2Disabled.png";


Res.btnXepHangSelected = "res/CardGame/CommonResource/ChonBan/btn_xephang_s.png";
Res.btnXepHangUnselected = "res/CardGame/CommonResource/ChonBan/btn_xephang.png";
Res.btnXepHangMidSelected = "res/CardGame/CommonResource/ChonBan/btn_xephang_mid_s.png";
Res.btnXepHangMidUnselected = "res/CardGame/CommonResource/ChonBan/btn_xephang_mid.png";
Res.imageMoiChoiItem = "res/CardGame/CommonResource/MoiChoi/itemMoiChoi.png";

Res.imageKhoa = "res/CardGame/CommonResource/ChonBan/khoa.png";

Res.vinWinSelect = "res/CardGame/CommonResource/ChonBan/btn_vin_win.png";
Res.vinWinUnselect = "res/CardGame/CommonResource/ChonBan/btn_vin_win_s.png";
Res.numWinSelect = "res/CardGame/CommonResource/ChonBan/btn_number_win.png";
Res.numWinUnselect = "res/CardGame/CommonResource/ChonBan/btn_number_win_s.png";

Res.lobbyMoneySelect = "res/CardGame/CommonResource/ChonBan/btn_banvin.png";
Res.lobbyMoneyUnselect = "res/CardGame/CommonResource/ChonBan/btn_banxu.png";
Res.lobbyMoneyClick = "res/CardGame/CommonResource/ChonBan/btn_banvin_s.png";