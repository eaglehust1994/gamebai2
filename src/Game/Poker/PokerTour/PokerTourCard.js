
var PokerTourItem = cc.Class.extend({
    ctor: function(nPerson, cost, time){
        this.nPerson = nPerson;
        this.cost = cost;
        this.time = time;
    }
});

var PokerTourCard = cc.Node.extend({
    ctor: function(item){
        this._super();
        this.girl = new cc.Sprite(PokerTour.res.girl + "1" + ".png");
        this.girl.setPosition(cc.p(116,245));
        this.addChild(this.girl, 0);
        this.bg = new ccui.Button(PokerTour.res.pokerCardBg, PokerTour.res.pokerCardBg, PokerTour.res.pokerCardBg);
        this.addChild(this.bg);
        this.bg.setPosition(116, 94.5);
        var image = new cc.Sprite(PokerTour.res.imageHead);
        image.setPosition(47, 83);
        this.bg.addChild(image, 0);

        this.lbPerson = new cc.LabelTTF("So nguoi: 1000", fontArialB.fontName, 20);
        this.bg.addChild(this.lbPerson, 0);
        this.lbPerson.setPosition(140, 119);

        this.lbCost = new cc.LabelTTF("So nguoi: 1000", fontArialB.fontName, 20);
        this.bg.addChild(this.lbCost, 0);
        this.lbCost.setPosition(140, 82);

        this.lbTime = new cc.LabelTTF("So nguoi: 1000", fontArialB.fontName, 20);
        this.bg.addChild(this.lbTime, 0);
        this.lbTime.setPosition(140, 46);
        this.updateWithItem(item);
    },

    updateWithItem: function(tourItem){
        this.lbPerson.setString((tourItem.nPerson));
        this.lbCost.setString(tourItem.cost);

        if(tourItem.cost == 50000){
            this.girl.setTexture(PokerTour.res.girl + "2.png");
        }
        else if(tourItem.cost == 100000){
            this.girl.setTexture(PokerTour.res.girl + "3.png");
        }

        this.lbTime.setString(tourItem.time);
    }
})