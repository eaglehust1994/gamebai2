/**
 * Created by Admin on 10/13/2016.
 */

var NoHuLayer = BaseLayer.extend({

    ctor: function (nickName, money) {
        this._super();

        this.showEffectNoHu(nickName, money);

        this.runAction(cc.sequence(
            cc.delayTime(4.0),
            cc.callFunc(function () {
                this.removeFromParent();
            }.bind(this))
        ));
    },

    onEnter: function(){
        this._super();
        this.setFog(true);
    },

    showEffectNoHu: function(nickName, money){
        var slot = GuiUtil.createSprite("res/common/nohuvang/no_hu_slot.png");
        slot.setPosition(GuiUtil.getWinSize().width/2, GuiUtil.getWinSize().height/2);
        this.addChild(slot);

        var nameSlot = GuiUtil.createSprite("res/common/nohuvang/no_hu_name_slot.png");
        nameSlot.setPosition(slot.getContentSize().width/2, slot.getContentSize().height-100);
        slot.addChild(nameSlot);

        var textName = new ccui.Text(nickName, "Arial", 20);
        textName.setPosition(nameSlot.getContentSize().width/2, nameSlot.getContentSize().height/2);
        nameSlot.addChild(textName);

        var glow = GuiUtil.createSprite("res/common/nohuvang/no_hu_glow.png");
        glow.setPosition(slot.getContentSize().width/2, slot.getContentSize().height/2-10);
        slot.addChild(glow);
        glow.runAction(cc.rotateBy(3.0, -360).repeatForever());

        var star = GuiUtil.createSprite("res/common/nohuvang/no_hu_star.png");
        star.setPosition(slot.getContentSize().width/2, slot.getContentSize().height/2-10);
        slot.addChild(star);
        star.runAction(cc.rotateBy(3.5, 360).repeatForever());

        var text = GuiUtil.createSprite("res/common/nohuvang/no_hu_text.png");
        text.setPosition(slot.getContentSize().width/2, slot.getContentSize().height/2-5);
        slot.addChild(text);
        text.runAction(cc.sequence(
            cc.scaleTo(0.4, 1.1),
            cc.scaleTo(0.4, 0.9)
        ).repeatForever());

        var moneyText = new NumberSprite(money, NumberType.NUMBER_THANG, true);
        moneyText.setPosition(slot.getContentSize().width/2-20, slot.getContentSize().height/2-90);
        moneyText.setScale(0.9);
        slot.addChild(moneyText);
    }
});
