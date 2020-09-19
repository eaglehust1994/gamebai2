
CoUp.KhieuChien = cc.Node.extend({
    ctor: function(gameScene) {
        this._super();
        this.gameScene = gameScene;
        this.bg = new cc.Sprite("res/GameCo/CoTuong/popup/khieuchien/bg_vin.png");
        this.addChild(this.bg);

        var btnClose = new ccui.Button("res/GameCo/CoTuong/popup/khieuchien/close.png");
        this.addChild(btnClose);
        btnClose.setPosition(147, 99);
        btnClose.addTouchEventListener(this.onClose, this);

        this.btnRooms = [];
        this.lblRooms = [];
        for (var i = 0; i < 8; i++) {
            var btnRoom = new ccui.Button("res/GameCo/CoTuong/popup/khieuchien/vin_click.png");
            this.addChild(btnRoom);
            btnRoom.setPosition(parseInt(i / 2) * 76 - 116, 7 - (i % 2) * 77);
            btnRoom.addTouchEventListener(this.onBtnRoomClick, this);
            this.btnRooms.push(btnRoom);

            var lblRoom = new cc.LabelTTF("", fontArial.fontName, 22);
            btnRoom.addChild(lblRoom);
            lblRoom.setPosition(btnRoom.width / 2, 16);
            this.lblRooms.push(lblRoom);
        }
    },

    onBtnRoomClick: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.gameScene.showKhieuChien(this.nickName, sender.getTag());
        }
    },

    onClose: function(sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            this.gameScene.khieuChienView = null;
            this.removeFromParent();
        }
    },

    updateInfo: function(nickName, data, isVin, currentMoney, enemyMoney) {
        this.nickName = nickName;
        if (isVin) {
            this.bg.setTexture("res/GameCo/CoTuong/popup/khieuchien/bg_vin.png");
            for (var i = 0; i < this.btnRooms.length; i++) {
                this.btnRooms[i].loadTextures("res/GameCo/CoTuong/popup/khieuchien/vin_click.png", "res/GameCo/CoTuong/popup/khieuchien/vin_click.png", "res/GameCo/CoTuong/popup/khieuchien/vin_click.png");
                this.lblRooms[i].setColor({r:109, g:73, b:21});
            }
        } else {
            this.bg.setTexture("res/GameCo/CoTuong/popup/khieuchien/bg_xu.png");
            for (var i = 0; i < this.btnRooms.length; i++) {
                this.btnRooms[i].loadTextures("res/GameCo/CoTuong/popup/khieuchien/xu_click.png", "res/GameCo/CoTuong/popup/khieuchien/xu_click.png", "res/GameCo/CoTuong/popup/khieuchien/xu_click.png");
                this.lblRooms[i].setColor({r:255, g:255, b:255});
            }
        }

        for (var i = 0; i < this.btnRooms.length; i++) {
            this.btnRooms[i].setTag(data[i].moneyBet);
            this.lblRooms[i].setString(this.getMoneyString(data[i].moneyBet));
            if (currentMoney < data[i].moneyRequire || enemyMoney < data[i].moneyRequire) {
                this.btnRooms[i].setEnabled(false);
                this.btnRooms[i].setColor(cc.color.GRAY);
                this.lblRooms[i].setColor(cc.color.GRAY);
            } else {
                this.btnRooms[i].setEnabled(true);
                this.btnRooms[i].setColor({r: 255, g: 255, b: 255});
                this.btnRooms[i].setColor({r: 255, g: 255, b: 255});
            }
        }
    },

    getMoneyString: function(num){
        if(num < 1000){
            return "" + num;
        }else if(num < 1000000){
            return "" + Math.floor(num/1000) + "K";
        }else {
            return "" + Math.floor(num / 1000000) + "M";
        }
    }
});