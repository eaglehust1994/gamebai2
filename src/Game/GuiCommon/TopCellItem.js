//
TopItem = cc.Class.extend({
    ctor: function(name){
        this.name = name;
    }
});

TopCellItem = cc.TableViewCell.extend({
    ctor: function(){
        this._super();
        var i = 0;
        this.items = [];
        var jsonLayout = ccs.load("res/g_res_cardGame_json_ItemTopSerVer.json");
        this._layout = jsonLayout.node;
        this.addChild(this._layout);
        this._layout.anchorX = 0.0;
        this._layout.anchorY = 0.0;
        this._layout.x = 0;
        this._layout.y = 0;
        var lb1 = this._layout.getChildByName("name");
        this.stt = this._layout.getChildByName("stt");
        this.gold = this._layout.getChildByName("gold");
        this.name = lb1;
    },

    onEnter: function()
    {
        cc.TableViewCell.prototype.onEnter.call(this);
    },

    updateWithItem: function(stt, item){
        this.name.setString(item.n);
        this.gold.setString(item.m);
        var sttPos = this.stt.getPosition();
        this.stt.removeFromParent();
        this.stt = new cc.Sprite(this.getPathSoByStt(stt));
        this.stt.setPosition(sttPos);
        this._layout.addChild(this.stt);
    },

    getPathSoByStt:function(stt){
        stt = stt + 1;
        return "res/CardGame/ChonBan/stt_" + stt +".png";
    }

})