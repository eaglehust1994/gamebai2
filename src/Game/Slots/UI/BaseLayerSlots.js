/**
 * Created by Admin on 5/4/2017.
 */

var BaseLayerSlots  = cc.Layer.extend({

    ctor: function(id){
        this.sizeContent = cc.size(1280,720);
        this.positionCenter = cc.p(0,0);
        this.positionCenterBG = cc.p(0,0);
        this.curFram = 0;

        this._id = id;
        this._layout = null;
        this._layoutPath = "";
        this._scale = -1;

        this._showHideAnimate = false;
        this._bgShowHideAnimate = null;
        this._currentScaleBg = 1;

        this._enableBack = false;

        if(this._scale  < 0)
        {
            this._scale = cc.director.getWinSize().width/800;
            this._scale = (this._scale > 1) ? 1 : this._scale;
        }

        cc.Layer.prototype.ctor.call(this);
        this._layerColor = new cc.LayerColor(cc.BLACK);
        this.addChild(this._layerColor);
        this._layerColor.setVisible(false);

        this._keyboardEvent = cc.EventListener.create({
            event:cc.EventListener.KEYBOARD,
            onKeyReleased:function(keyCode, event){
                if(keyCode == cc.KEY.back || keyCode == 27){
                    event.getCurrentTarget().backKeyPress();
                }
            }
        });
        cc.eventManager.addListener(this._keyboardEvent, this);


        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){return true;},
            onTouchMoved: function(touch,event){},
            onTouchEnded: function(touch,event){}
        });
    },

    onEnter: function(){
        this.curFram += 1;
        cc.Layer.prototype.onEnter.call(this);
        this.setContentSize(cc.winSize);
        this.setAnchorPoint(cc.p(.5,.5));
        if(cc.sys.isNative)
        {
            this.positionCenter = cc.p(640,360);
            this.positionCenterBG = cc.p(640,360);
        }else
        {
            this.positionCenterBG = cc.p(640,270);
            this.positionCenter = cc.p(640,317);

        }
        this.customizeGUI();
    },

    initWithJsonFile: function(json){
        this._layoutPath = json;
        var jsonLayout = ccs.load(json);
        this._layout = jsonLayout.node;
        this._layout.setContentSize(cc.director.getWinSize());
        if(cc.sys.isNative) {
            ccui.Helper.doLayout(this._layout);
        }
        this.addChild(this._layout);
        this.initGUI();
    },

    initWithBinaryFile: function(json){
        var start = new Date().getTime();
        this._layoutPath = json;
        cc.log("initWithBinaryFile1 " + json);
        var jsonLayout = ccs.load(json);
        cc.log("initWithBinaryFile2 ");
        this._layout = jsonLayout.node;
        cc.log("initWithBinaryFile3 ");
        this._layout.setContentSize(cc.director.getWinSize());

        cc.log("initWithBinaryFile4 ");
        if(cc.sys.isNative) {
            ccui.Helper.doLayout(this._layout);
        }
        this.addChild(this._layout);
        var end = new Date().getTime();
        cc.log("## LOAD JSON " + json + " : " + (end - start));

        this.initGUI();
        var end2 = new Date().getTime();
        cc.log("## INIT GUI " + json + " : " + (end2 - end));
    },

    addSprite:function(parent,name,position,image)
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
    },
    customizeButton: function(name,tag,parent) {
        cc.log(tag);
        if(tag){
            tag = parseInt(tag);
        }

        if(!this._layout)
            return;

        var button = null;
        if(parent)
        {
            button = ccui.Helper.seekWidgetByName(parent,name);
        }
        else
        {
            button = ccui.Helper.seekWidgetByName(this._layout,name);
        }

        if(!button)
            return null;
        button.setPressedActionEnabled(true);
        button.setTag(tag);
        button.addTouchEventListener(this.onTouchEventHandler,this);

        return button;

    },

    customButton : function (name, tag, parent,action) {
        if(action === undefined)
            action = true;
        if(tag){
            tag = parseInt(tag);
        }

        var btn = this.getControl(name,parent);
        if(!btn) return null;
        btn.setPressedActionEnabled(action);

        btn.setTag(tag);
        btn.addTouchEventListener(this.onTouchEventHandler, this);
        return btn;
    },

    setLabelText : function (text, control) {
        if(typeof  text === 'undefined') return;
        if(typeof  control === 'undefined') return;
        if(control == null) return;
        if(typeof  control.getString === 'undefined') return;
        if(typeof  control.setString === 'undefined') return;

        var str = control.getString();
        var l1 = str.length;
        var l2 = text.length;

        if(control.subText !== undefined)
        {
            l1 = control.subText;

            if(l2 <= l1)
            {
                control.setString(text);
            }
            else
            {
                control.setString(text.substring(0,l1-2) + "...");
            }
        }
        else if(control.wrapText !== undefined)
        {
            var s1 = control.width;
            var num = text.length;
            var str = "";
            var result = "";
            for(var i = 0 ; i < num ; i++)
            {
                str += text.charAt(i);
                result += text.charAt(i);
                control.setString(str);
                if(text.charAt(i) == " ")
                {
                    if(control.width > s1)
                    {
                        result += "\n";
                        str = "";
                    }
                }
            }
            control.setString(result);
        }
        else
        {
            control.setString(text);
        }
    },

    getControl : function (cName,parent) {
        var p = null;
        if(typeof  parent === 'undefined')
        {
            p = this._layout;
        }
        else if(typeof parent === 'string')
        {
            p = ccui.Helper.seekWidgetByName(this._layout,parent);
        }
        else
        {
            p = parent;
        }

        var control = ccui.Helper.seekWidgetByName(p,cName);
        if(control == null)
        {
            cc.log("$getControl error " + cName);
            return null;
        }
        this.analyzeCustomControl(control);
        return control;
    },

    processScaleControl : function (control,direct) {
        if(direct === undefined)
        {
            control.setScale(this._scale);
        }
        else if(direct == 1)
        {
            control.setScaleX(this._scale);
        }
        else
        {
            control.setScaleY(this._scale);
        }
    },

    analyzeCustomControl : function (control) {
        if(control.customData === undefined)
        {
            if(control.getTag() < 0) // scale theo ty le nho nhat
            {
                this.processScaleControl(control);
            }
            return;
        }

        var s = control.customData;

        if(s.indexOf("scale") > -1) // scale theo ty le nho nhat
        {
            if(s.indexOf("scaleX") > -1)
            {
                this.processScaleControl(control,1);
            }
            else if(s.indexOf("scaleY") > -1)
            {
                this.processScaleControl(control,0);
            }
            else
            {
                this.processScaleControl(control);
            }
        }

        if(s.indexOf("subText") > -1) // set text gioi han string
        {
            control["subText"] = control.getString().length;
        }

        if(s.indexOf("wrapText") > -1) // set text cat strign xuong dong
        {
            control["wrapText"] = control.getString().length;
        }
    },

    processListControl : function (name, num) {
        if(name === undefined || num === undefined) return;

        for(var i = 0 ; i < num ; i++)
        {
            this.getControl(name + i);
        }
    },

    setFog: function(bool){
        this._layerColor.setVisible(true);
        cc.eventManager.addListener(this._listener,this);
        this._layerColor.runAction(cc.fadeTo(.25,150));
    },

    enableFog : function() {
        this._fog = new cc.LayerColor(cc.BLACK);
        this._fog.setVisible(true);
        this.addChild(this._fog,-999);

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){return true;},
            onTouchMoved: function(touch,event){},
            onTouchEnded: function(touch,event){}
        });

        cc.eventManager.addListener(this._listener,this);
        this._fog.runAction(cc.fadeTo(.25,150));
    },

    setDelayInit : function (time) {
        if(time === undefined)
            time = BaseLayer.TIME_APPEAR_GUI;
        if(time < BaseLayer.TIME_APPEAR_GUI)
            time = BaseLayer.TIME_APPEAR_GUI;

        this.runAction(cc.sequence(cc.delayTime(time),cc.callFunc(this.functionDelayInit,this)));
    },

    setShowHideAnimate : function (parent,customScale) {
        this._showHideAnimate = true;
        if(parent === undefined)
        {
            this._bgShowHideAnimate = this._layout;
        }
        else
        {
            this._bgShowHideAnimate = parent;
        }

        if(customScale === undefined)
        {
            customScale = false;
        }
        this._currentScaleBg = customScale?this._scale : 1;

        this._bgShowHideAnimate.setScale(0.5*this._currentScaleBg);
        this._bgShowHideAnimate.setOpacity(0);
        this._bgShowHideAnimate.runAction(cc.sequence(cc.spawn(new cc.EaseBackOut(cc.scaleTo(0.35,this._currentScaleBg)),cc.fadeIn(0.35)),cc.callFunc(this.finishAnimate,this)));
    },
    setShowHideAnimate9Sprite : function (parent, customScaleX, customScaleY){
        this._showHideAnimate = true;
        if(parent === undefined)
        {
            this._bgShowHideAnimate = this._layout;
        }
        else
        {
            this._bgShowHideAnimate = parent;
        }

        this._bgShowHideAnimate.setScale(0.5*customScaleX,0.5*customScaleY);
        this._bgShowHideAnimate.setOpacity(0);
        this._bgShowHideAnimate.runAction(cc.sequence(cc.spawn(new cc.EaseBackOut(cc.scaleTo(0.35,customScaleX,customScaleY)),cc.fadeIn(0.35)),cc.callFunc(this.finishAnimate,this)));
    },

    onClose : function () {
        if(this._layerColor && this._layerColor.isVisible())
            this._layerColor.runAction(cc.fadeTo(.3,0));

        if(this._fog && this._fog.isVisible())
            this._fog.runAction(cc.fadeTo(.3,0));

        if(this._showHideAnimate)
        {
            this._bgShowHideAnimate.setScale(this._currentScaleBg);
            this._bgShowHideAnimate.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(0.2,1.2)),cc.fadeOut(0.2)));
            this.runAction(cc.sequence(cc.delayTime(0.2),cc.removeSelf()));
        }
        else
        {
            this.removeFromParent();
        }
    },

    setBackEnable : function (enable) {
        this._enableBack = enable;
    },

    backKeyPress : function () {
        if(!this._enableBack) return;

        var dialog = sceneMgr.getRunningScene().getMainLayer().getChildByTag(Dialog.TAG);
        if(dialog !== undefined && dialog != null)
        {
            if(dialog._id !== undefined && dialog._id == "Dialog")
                dialog.onBackDetect();
            return;
        }

        var sp = sceneMgr.getRunningScene().getMainLayer().getChildByTag(Dialog.SUPPORT_TAG);
        if(sp !== undefined && sp != null)
        {
            if(sp._id !== undefined && sp._id == "SupportGUI")
                sp.onBackDetect();
            return;
        }

        this.onBack();
    },

    checkGuiAvailable : function (tag,id) {
        if(tag === undefined) return false;

        var g = this.getChildByTag(tag);
        if(g !== undefined && g != null)
        {
            if(id === undefined) return true;
            if(g._id !== undefined && g._id == id) return true;
        }

        return false;
    },

    /************ touch event handler *************/
    onTouchEventHandler: function(sender,type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this.onButtonTouched(sender,sender.getTag());
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onButtonRelease(sender,sender.getTag());
                this.playSoundButton(sender.getTag());
                break;
        }
    },
    ////////////////////////////////////////////

    /******* functions need override  *******/
    customizeGUI: function(){
        /*    override meeeeeeeeee  */
    },

    onButtonRelease: function(button,id){
        /*    override meeeeeeeeee  */
    },

    onButtonTouched: function(button,id){
        /*    override meeeeeeeeee  */
    },

    onUpdateGUI: function(data){

    },

    initGUI : function () {

    },

    functionDelayInit : function () {

    },

    finishAnimate : function () {

    },

    onBack : function () {

    },
    playSoundButton: function(id){
        //gameSound.playClick();
    },

    //////////////////////////////////////////////////////
});
BaseLayer.TIME_APPEAR_GUI = 0.35;


