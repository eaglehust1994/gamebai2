/**
 * Created by vinplay on 2/18/17.
 */

CoTuong.NodeStart = cc.Node.extend({
    ctor: function(index) {
        this._super();

        this.bg = new cc.Sprite("res/GameCo/Caro/shape.png");
        this.addChild(this.bg);
        this.avatar = new cc.Sprite("res/common/avatar/Avatar_1.png");
        this.addChild(this.avatar);
        this.avatar.setScale(0.6);
        this.name = new cc.LabelTTF("", fontArialB.fontName, 35);
        this.addChild(this.name);

        if (index == 0) {
            this.initLeft();
        } else {
            this.initRight();
        }
    },

    initLeft: function() {
        this.avatar.setPosition(80, 0);
        this.name.setPosition(-45, 0);
    },

    initRight: function() {
        //this.bg.setRotationX(180);
        this.avatar.setPosition(-80, 0);
        this.name.setPosition(45, 0);
    },

    initData: function(player) {
        this.name.setString(StringUtility.rutGonString(player.info["nickName"], 7));
        var avatarUrl = player.info["avatar"];
        this.setAvatarChuan(avatarUrl);
    },

    setAvatarChuan: function(avatarUrl){
        cc.log("avatarUrl: " + avatarUrl);
        this.avatar.setTexture(gameUtility.getAvatarPath(avatarUrl));
    }
});