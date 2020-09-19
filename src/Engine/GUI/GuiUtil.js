
var GuiUtil = GuiUtil || {};

GuiUtil.createSprite = function(name) {

    if ((typeof name == "undefined") || (name == "")){
        return new cc.Sprite();
    }
    else{
        if(cc.spriteFrameCache.getSpriteFrame(name))
        {
            return new cc.Sprite("#" + name);
        }
        else
        {
            return new cc.Sprite(name);
        }
    }
};

cc.Layer.prototype
GuiUtil.changeSprite = function(sprite, name) {
    if (cc.spriteFrameCache.getSpriteFrame(name)) {
        sprite.setSpriteFrame(name);
    }
    else {
        sprite.setTexture(name);
    }
};
GuiUtil.getFontNameButton = function(a) {
    return a = cc.sys.isNative ? "res/Font/" + a + ".ttf" : a;
}
GuiUtil.changeImage = function(image,name)
{
    if (cc.spriteFrameCache.getSpriteFrame(name)) {
        image.loadTexture(name,ccui.Widget.PLIST_TEXTURE);
    }
    else {
        image.loadTexture(name,ccui.Widget.LOCAL_TEXTURE);
    }
};
//GuiUtil.changeButtonBg = function(image,name)

GuiUtil.changeSpriteWithTexture = function(sprite, texture){
    sprite.setTexture(texture);
};

GuiUtil.createSimpleButton = function(normal, texType)
{
    texType = texType || ccui.Widget.LOCAL_TEXTURE;
    var btnKeep = new ccui.Button();
    btnKeep.loadTextureNormal(normal,texType);
    return btnKeep;
};

GuiUtil.getWinSize = function(){
    if(!cc.sys.isNative){
        return cc.size(1280, 720);
    }
    else{
        return cc.winSize;
    }
};

GuiUtil.getCardResource = function(cardId){
    var number = 52;
    if (0<=cardId && cardId <4) number = 48+cardId;
    else if (4<=cardId && cardId<=51) number = cardId-4;
    return "res/CardGame/LaBai/labai_"+number+".png";
};

GuiUtil.checkTextureType = function(image){
    return cc.spriteFrameCache.getSpriteFrame(image) ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE;
};

GuiUtil.loadTextureNormal = function(target, image){
    target.loadTextureNormal(image, GuiUtil.checkTextureType(image));
};

GuiUtil.clearEffect = function(){
    var gameGui = SceneMgr.getInstance().getRunningScene().getMainLayer();
    if (gameGui != null && gameGui != undefined){
        if(gameGui.effectLayer) {
            gameGui.effectLayer.clear();
        }
        gameGui.stopAllActions();
    }
}

GuiUtil.showWaitingGui = function(){
    // var waitingGui = gv.guiMgr.getGuiById(GuiId.WAITING_GUI);
    // if(waitingGui == null){
    //     gv.guiMgr.addGui(new GuiWaiting(), GuiId.WAITING_GUI, LayerId.LAYER_LOADING);
    // }
};

GuiUtil.hideWaitingGui = function(){
    // var waitingGui = gv.guiMgr.getGuiById(GuiId.WAITING_GUI);
    // if(waitingGui!=null)
    //     waitingGui.destroy();
};