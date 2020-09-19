var BaseLayer = cc.Layer.extend({

    ctor: function (id) {
        this.curFram = 0;

        this._id = id;
        this._layout = null;
        this._layoutPath = "";
        this._scale = -1;

        this._showHideAnimate = false;
        this._bgShowHideAnimate = null;
        this._currentScaleBg = 1;

        this._enableBack = false;

        if (this._scale < 0) {
            this._scale = cc.director.getWinSize().width / 800;
            this._scale = (this._scale > 1) ? 1 : this._scale;
        }

        cc.Layer.prototype.ctor.call(this);
        this._layerColor = new cc.LayerColor(cc.BLACK);
        this.addChild(this._layerColor);
        this._layerColor.setVisible(false);

        this._keyboardEvent = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: function (keyCode, event) {
                if (keyCode == cc.KEY.back || keyCode == 27) {
                    event.getCurrentTarget().backKeyPress();
                }
            }
        });
        cc.eventManager.addListener(this._keyboardEvent, this);


        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            onTouchEnded: function (touch, event) {
            }
        });
    },

    onEnter: function () {
        this.curFram += 1;
        cc.Layer.prototype.onEnter.call(this);
        this.setContentSize(cc.winSize);
        this.setAnchorPoint(cc.p(.5, .5));
        this.customizeGUI();
    },

    initWithJsonFile: function (json) {
        this._layoutPath = json;
        var jsonLayout = ccs.load(json);
        this._layout = jsonLayout.node;
        this._layout.setContentSize(cc.director.getWinSize());
        if (cc.sys.isNative) {
            ccui.Helper.doLayout(this._layout);
        }
        this.addChild(this._layout);
        this.initGUI();
    },

    initWithBinaryFile: function (json) {
        var start = new Date().getTime();
        this._layoutPath = json;
        var jsonLayout = ccs.load(json);
        this._layout = jsonLayout.node;
        this._layout.setContentSize(cc.director.getWinSize());
        if (cc.sys.isNative) {
            ccui.Helper.doLayout(this._layout);
        }
        this.addChild(this._layout);
        var end = new Date().getTime();

        this.initGUI();
        var end2 = new Date().getTime();
    },

    customizeButton: function (name, tag, parent) {
        if (tag) {
            tag = parseInt(tag);
        }

        if (!this._layout)
            return;

        var button = null;
        if (parent) {
            button = ccui.Helper.seekWidgetByName(parent, name);
        }
        else {
            button = ccui.Helper.seekWidgetByName(this._layout, name);
        }

        if (!button)
            return null;
        button.setPressedActionEnabled(true);
        button.setTag(tag);
        button.addTouchEventListener(this.onTouchEventHandler, this);

        return button;

    },

    customButton: function (name, tag, parent, action) {
        if (action === undefined)
            action = true;
        if (tag) {
            tag = parseInt(tag);
        }

        var btn = this.getControl(name, parent);
        if (!btn) return null;
        btn.setPressedActionEnabled(action);

        btn.setTag(tag);
        btn.addTouchEventListener(this.onTouchEventHandler, this);
        return btn;
    },

    setLabelText: function (text, control) {
        if (typeof  text === 'undefined') return;
        if (typeof  control === 'undefined') return;
        if (control == null) return;
        if (typeof  control.getString === 'undefined') return;
        if (typeof  control.setString === 'undefined') return;

        var str = control.getString();
        var l1 = str.length;
        var l2 = text.length;

        if (control.subText !== undefined) {
            l1 = control.subText;

            if (l2 <= l1) {
                control.setString(text);
            }
            else {
                control.setString(text.substring(0, l1 - 2) + "...");
            }
        }
        else if (control.wrapText !== undefined) {
            var s1 = control.width;
            var num = text.length;
            var str = "";
            var result = "";
            for (var i = 0; i < num; i++) {
                str += text.charAt(i);
                result += text.charAt(i);
                control.setString(str);
                if (text.charAt(i) == " ") {
                    if (control.width > s1) {
                        result += "\n";
                        str = "";
                    }
                }
            }
            control.setString(result);
        }
        else {
            control.setString(text);
        }
    },

    getControl: function (cName, parent) {
        var p = null;
        if (typeof  parent === 'undefined') {
            p = this._layout;
        }
        else if (typeof parent === 'string') {
            p = ccui.Helper.seekWidgetByName(this._layout, parent);
        }
        else {
            p = parent;
        }

        var control = ccui.Helper.seekWidgetByName(p, cName);
        if (control == null) {
            return null;
        }
        this.analyzeCustomControl(control);
        return control;
    },

    processScaleControl: function (control, direct) {
        if (direct === undefined) {
            control.setScale(this._scale);
        }
        else if (direct == 1) {
            control.setScaleX(this._scale);
        }
        else {
            control.setScaleY(this._scale);
        }
    },

    analyzeCustomControl: function (control) {
        if (control.customData === undefined) {
            if (control.getTag() < 0) // scale theo ty le nho nhat
            {
                this.processScaleControl(control);
            }
            return;
        }

        var s = control.customData;

        if (s.indexOf("scale") > -1) // scale theo ty le nho nhat
        {
            if (s.indexOf("scaleX") > -1) {
                this.processScaleControl(control, 1);
            }
            else if (s.indexOf("scaleY") > -1) {
                this.processScaleControl(control, 0);
            }
            else {
                this.processScaleControl(control);
            }
        }

        if (s.indexOf("subText") > -1) // set text gioi han string
        {
            control["subText"] = control.getString().length;
        }

        if (s.indexOf("wrapText") > -1) // set text cat strign xuong dong
        {
            control["wrapText"] = control.getString().length;
        }
    },

    processListControl: function (name, num) {
        if (name === undefined || num === undefined) return;

        for (var i = 0; i < num; i++) {
            this.getControl(name + i);
        }
    },

    setFog: function (bool) {
        this._layerColor.setVisible(true);
        cc.eventManager.addListener(this._listener, this);
        this._layerColor.runAction(cc.fadeTo(.25, 150));
    },

    enableFog: function () {
        this._fog = new cc.LayerColor(cc.BLACK);
        this._fog.setVisible(true);
        this.addChild(this._fog, -999);

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchMoved: function (touch, event) {
            },
            onTouchEnded: function (touch, event) {
            }
        });

        cc.eventManager.addListener(this._listener, this);
        this._fog.runAction(cc.fadeTo(.25, 150));
    },

    setDelayInit: function (time) {
        if (time === undefined)
            time = BaseLayer.TIME_APPEAR_GUI;
        if (time < BaseLayer.TIME_APPEAR_GUI)
            time = BaseLayer.TIME_APPEAR_GUI;

        this.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(this.functionDelayInit, this)));
    },

    setShowHideAnimate: function (parent, customScale) {
        this._showHideAnimate = true;
        if (parent === undefined) {
            this._bgShowHideAnimate = this._layout;
        }
        else {
            this._bgShowHideAnimate = parent;
        }

        if (customScale === undefined) {
            customScale = false;
        }
        this._currentScaleBg = customScale ? this._scale : 1;

        this._bgShowHideAnimate.setScale(0.5 * this._currentScaleBg);
        this._bgShowHideAnimate.setOpacity(0);
        this._bgShowHideAnimate.runAction(cc.sequence(cc.spawn(new cc.EaseBackOut(cc.scaleTo(0.35, this._currentScaleBg)), cc.fadeIn(0.35)), cc.callFunc(this.finishAnimate, this)));
    },
    setShowHideAnimate9Sprite: function (parent, customScaleX, customScaleY) {
        this._showHideAnimate = true;
        if (parent === undefined) {
            this._bgShowHideAnimate = this._layout;
        }
        else {
            this._bgShowHideAnimate = parent;
        }

        this._bgShowHideAnimate.setScale(0.5 * customScaleX, 0.5 * customScaleY);
        this._bgShowHideAnimate.setOpacity(0);
        this._bgShowHideAnimate.runAction(cc.sequence(cc.spawn(new cc.EaseBackOut(cc.scaleTo(0.35, customScaleX, customScaleY)), cc.fadeIn(0.35)), cc.callFunc(this.finishAnimate, this)));
    },

    onClose: function () {
        if (this._layerColor && this._layerColor.isVisible())
            this._layerColor.runAction(cc.fadeTo(.3, 0));

        if (this._fog && this._fog.isVisible())
            this._fog.runAction(cc.fadeTo(.3, 0));

        if (this._showHideAnimate) {
            this._bgShowHideAnimate.setScale(this._currentScaleBg);
            this._bgShowHideAnimate.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(0.2, 1.2)), cc.fadeOut(0.2)));
            this.runAction(cc.sequence(cc.delayTime(0.2), cc.removeSelf()));
        }
        else {
            this.removeFromParent();
        }
    },

    setBackEnable: function (enable) {
        this._enableBack = enable;
    },

    backKeyPress: function () {
        if (!this._enableBack) return;

        var dialog = sceneMgr.getRunningScene().getMainLayer().getChildByTag(Dialog.TAG);
        if (dialog !== undefined && dialog != null) {
            if (dialog._id !== undefined && dialog._id == "Dialog")
                dialog.onBackDetect();
            return;
        }

        var sp = sceneMgr.getRunningScene().getMainLayer().getChildByTag(Dialog.SUPPORT_TAG);
        if (sp !== undefined && sp != null) {
            if (sp._id !== undefined && sp._id == "SupportGUI")
                sp.onBackDetect();
            return;
        }

        this.onBack();
    },

    checkGuiAvailable: function (tag, id) {
        if (tag === undefined) return false;

        var g = this.getChildByTag(tag);
        if (g !== undefined && g != null) {
            if (id === undefined) return true;
            if (g._id !== undefined && g._id == id) return true;
        }

        return false;
    },

    /************ touch event handler *************/
    onTouchEventHandler: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.onButtonTouched(sender, sender.getTag());
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onButtonRelease(sender, sender.getTag());
                this.playSoundButton(sender.getTag());
                break;
        }
    },

    addSprite: function (parent, name, position, image, texType) {
        if ((typeof image == "undefined") || (image == "")) {
            this[name] = new cc.Sprite();
        }
        else {
            if (cc.spriteFrameCache.getSpriteFrame(image)) {
                this[name] = new cc.Sprite("#" + image);
            }
            else {
                this[name] = new cc.Sprite(image);
            }
        }
        this[name].setPosition(position);
        parent.addChild(this[name]);
    },

    addChildAsProp: function (parent, child, name, addRootProp) {
        child.setName(name);
        parent.addChild(child);
        addRootProp && (this[name] = child);
        return child;
    },

    addSpriteStructure: function (parent, name, position, image, options) {
        var resourcePath = (options && options.resourcePath !== undefined) ? options.resourcePath : (this.resourcePath || "");
        var sprite;
        if ((typeof image == "undefined") || (image == "")) {
            sprite = new cc.Sprite();
        }
        else {
            if (cc.spriteFrameCache.getSpriteFrame(resourcePath + image)) {
                sprite = new cc.Sprite("#" + resourcePath + image);
            }
            else if (image) {
                sprite = new cc.Sprite(resourcePath + image);
            } else {
                sprite = new cc.Sprite();
            }
        }
        sprite.setAnchorPoint(0.5, 0.5);
        sprite.setPosition(position);
        if (typeof options === "object") {
            cc.extend(sprite, options);
        }
        this.addChildAsProp(parent, sprite, name, (options && options.nestedProp) ? false : true);
        return sprite;
    },

    addSpriteStructureWithoutResourcePath: function () {
        var options = arguments[4] || {};
        var newArguments = cc.extend([], arguments);
        newArguments[4] = cc.extend(options, {resourcePath: ""});
        return this.addSpriteStructure.apply(this, newArguments);
    },

    addLayout: function (parent, name, position, image, size, isTouch) {

        this[name] = new ccui.Layout();
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setContentSize(size);
        this[name].setTouchEnabled(isTouch);
        this[name].setCascadeOpacityEnabled(true);
        if (image != null) {
            if (cc.spriteFrameCache.getSpriteFrame(image)) {
                this[name].setBackGroundImage(image, ccui.Widget.PLIST_TEXTURE);
            } else {
                this[name].setBackGroundImage(image, ccui.Widget.LOCAL_TEXTURE);
            }
        }
        this[name].setPosition(position);

        parent.addChild(this[name]);
    },
    addLayoutStructure: function (parent, name, position, image, size, isTouch, options) {
        var resourcePath = this.resourcePath || "";
        var layout = new ccui.Layout();
        layout.setAnchorPoint(0.5, 0.5);
        size && layout.setContentSize(size);
        layout.setTouchEnabled(isTouch);
        layout.setPosition(position);
        layout.setName(name);
        if (image) {
            layout.setBackGroundImage(resourcePath + image, cc.spriteFrameCache.getSpriteFrame(resourcePath + image) ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE);
        }
        cc.extend(layout, options);
        this.addChildAsProp(parent, layout, name, (options && options.nestedProp) ? false : true);
        return layout;
    },

    addButton: function (parent, name, tag, position, action, imageNol, imageS, texType) {

        //texType = texType || ccui.Widget.LOCAL_TEXTURE;
        if (action === undefined)
            action = true;
        if (tag) {
            tag = parseInt(tag);
        }
        var texType = ccui.Widget.LOCAL_TEXTURE;
        this[name] = new ccui.Button();
        if (cc.spriteFrameCache.getSpriteFrame(imageNol)) {
            texType = ccui.Widget.PLIST_TEXTURE;
        }

        if (imageS != null) {
            this[name].loadTextures(imageNol, imageS, imageS, texType);
        }
        else {
            this[name].loadTextures(imageNol, imageNol, imageNol, texType);
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

    addButtonStructure: function (parent, name, tag, position, enableAction, images, options) {

        var button = new ccui.Button();
        this.addChildAsProp(parent, button, name, (options && options.nestedProp) ? false : true);
        tag = parseInt(tag);
        button.setTag(tag);
        button.setName(name);
        button.setPosition(position);

        enableAction = enableAction === undefined ? true : enableAction;
        button.setPressedActionEnabled(enableAction);
        button.addTouchEventListener(this.onTouchEventHandler, this);
        if(images){
            var imageAguments = [];
            if (images instanceof Array) {
                imageAguments = images;
            } else if (images) {
                imageAguments = [images, images, images]
            }

            if (cc.spriteFrameCache.getSpriteFrame(imageAguments[0])) {
                imageAguments[3] = ccui.Widget.PLIST_TEXTURE
            }
            imageAguments[2] = imageAguments[2] || imageAguments[1];
            button.loadTextures.apply(button, imageAguments);
        }

        var initTextType = {
            titleText: "",
            titleColor: cc.color.WHITE,
            titleFontName: SeagullBold.fontName,
            titleFontSize: 30
        };
        cc.extend(button, initTextType, options, (options && options.nestedProp) ? false : true);
        options && options.titleFontName && cc.sys.isNative && button.setTitleFontName("res/Font/" + options.titleFontName + ".ttf");
        options && options.titleColor && cc.sys.isNative && button.setTitleColor(options.titleColor);
        return button;

    },
    createButtonText: function (name, options) {
        return cc.extend({
            titleText: name,
            titleColor: cc.color(255, 255, 255, 1),
            titleFontName: fontRobotoBold.fontName,
            titleFontSize: 24
        }, options);
    },
    addText: function (parent, name, position, string, fontName, fontSize) {
        this[name] = new ccui.Text(string, fontName, fontSize);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5, 0.5);
        if (cc.sys.isNative) {
            this[name].setFontName("res/Font/" + this[name].getFontName() + ".ttf");
        }
        parent.addChild(this[name]);
    },
    addTextStructure: function (parent, name, position, string, fontName, fontSize, color, options) {
        var text = new ccui.Text(string, fontName, fontSize);
        text.setName(name);
        text.setPosition(position);
        if (typeof color == "string") {
            color = cc.color.apply(this, this.convertHexToRgbA(color));
        }
        color && text.setColor(color);
        cc.extend(text, options);
        if (cc.sys.isNative) {
            text.setFontName("res/Font/" + text.getFontName() + ".ttf");
        }
        if (options && options.__size) {
            text.ignoreContentAdaptWithSize(false);
            text.setContentSize(options.__size);
            text.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            text.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        }
        this.addChildAsProp(parent, text, name, (options && options.nestedProp) ? false : true);
        return text;
    },
    convertHexToRgbA: function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return [(c >> 16) & 255, (c >> 8) & 255, c & 255, 1];
        }
        throw new Error('Bad Hex');
    },
    addEditBoxStructure: function (parent, name, position, string, placeHolder, fontName, fontSize, size, backGround, textAlign, maxLength, options) {
        var editBox;
        if (backGround) {
            if (cc.spriteFrameCache.getSpriteFrame(backGround))
                editBox = new cc.EditBox(size, new cc.Scale9Sprite(backGround, cc.rect(0, 0, size.width, size.height)), new cc.Scale9Sprite(backGround, cc.rect(0, 0, size.width, size.height)));
            else
                editBox = new cc.EditBox(size, cc.Scale9Sprite.create(backGround), cc.Scale9Sprite.create(backGround));
        } else editBox = new cc.EditBox(size, cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        editBox.setPosition(position);
        editBox.setPlaceHolder(placeHolder);
        editBox.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        editBox.setFontName(fontName);
        editBox.setFontSize(fontSize);
        editBox.setPlaceholderFontSize(fontSize);
        editBox.setPlaceholderFontColor(cc.color.GRAY);
        editBox.setFontColor(cc.color.WHITE);
        editBox.setDelegate(this);
        if (textAlign != null && !cc.sys.isNative)
            editBox.setTextAlign(textAlign);
        editBox.setAnchorPoint(0.5, 0.5);
        editBox.setPosition(position);
        editBox.setMaxLength(maxLength);
        cc.extend(editBox, options);
        return this.addChildAsProp(parent, editBox, name, (options && options.nestedProp) ? false : true);
    },
    addTextFieldStructure: function (parent, name, position, string, placeHolder, fontName, fontSize, size, backGround, textAlign, maxLength, options) {
        var editBox;
        editBox = new ccui.TextField(placeHolder, fontName, fontSize);
        if (backGround) {
            editBox.setBackGroundImage(image, cc.spriteFrameCache.getSpriteFrame(backGround) ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE)
        }

        editBox.setContentSize(size);
        editBox.setPosition(position);
        editBox.setPlaceHolder(placeHolder);
        editBox.setFontName(fontName);
        editBox.setFontSize(fontSize);
        editBox.setPlaceHolderColor(cc.color.GRAY);
        editBox.setTextColor(cc.color.WHITE);
        editBox.setTextHorizontalAlignment(textAlign);
        // editBox.setTextVerticalAlignment(textAlign);

        editBox.setAnchorPoint(0.5, 0.5);
        editBox.setPosition(position);
        editBox.setMaxLength(maxLength);
        cc.extend(editBox, options);
        return this.addChildAsProp(parent, editBox, name, (options && options.nestedProp) ? false : true);
    },
    addEditBox: function (parent, name, position, string, placeHolder, fontName, fontSize, size, backGround, textAlign, maxLength) {
        if (backGround != null) {
            if (cc.spriteFrameCache.getSpriteFrame(backGround))
                this[name] = new cc.EditBox(size, new cc.Scale9Sprite(backGround, cc.rect(0, 0, size.width, size.height)), new cc.Scale9Sprite(backGround, cc.rect(0, 0, size.width, size.height)));
            else
                this[name] = new cc.EditBox(size, cc.Scale9Sprite.create(backGround), cc.Scale9Sprite.create(backGround));
        }

        else
            this[name] = new cc.EditBox(size, cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        this[name].setPosition(position);
        this[name].setPlaceHolder(placeHolder);
        this[name].setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
        this[name].setFontName(fontName);
        this[name].setFontSize(fontSize);
        this[name].setPlaceholderFontSize(fontSize);
        this[name].setPlaceholderFontColor(cc.color.GRAY);
        this[name].setFontColor(cc.color.WHITE);
        this[name].setDelegate(this);
        // if (textAlign != null && !cc.sys.isNative)
        //     this[name].setVerticalAlignment(textAlign);
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setPosition(position);
        this[name].setMaxLength(maxLength);
        /*if(cc.sys.isNative)
         {
         this[name].setFontName("res/Font/"+ this[name].getFontName()+".ttf");
         }*/
        parent.addChild(this[name]);
    },
    addImage: function (parent, name, position, image, size) {
        if (cc.spriteFrameCache.getSpriteFrame(image)) {
            this[name] = new ccui.ImageView(image, ccui.Widget.PLIST_TEXTURE);
        } else {
            this[name] = new ccui.ImageView(image, ccui.Widget.LOCAL_TEXTURE);
        }

        this[name].setScale9Enabled(true);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5, 0.5);
        this[name].setContentSize(size);
        this[name].setCascadeOpacityEnabled(true);
        parent.addChild(this[name]);
    },
    addCheckBox: function (parent, name, position, isSelect, backGround, backGroundSelected, cross, backGroundDisabled, frontCrossDisabled, texType) {
        this[name] = new ccui.CheckBox();
        if (cc.spriteFrameCache.getSpriteFrame(backGround) || texType == ccui.Widget.PLIST_TEXTURE)
            this[name].loadTextures(backGround, backGroundSelected, cross, backGroundDisabled, frontCrossDisabled, ccui.Widget.PLIST_TEXTURE);
        else
            this[name].loadTextures(backGround, backGroundSelected, cross, backGroundDisabled, frontCrossDisabled, ccui.Widget.LOCAL_TEXTURE);
        this[name].setPosition(position);
        this[name].setSelected(isSelect);
        parent.addChild(this[name]);
    },
    addCheckBoxStructure: function (parent, name, position, isSelect, images, texType, options) {
        var child = new ccui.CheckBox();
        child.setPosition(position);
        child.setSelected(isSelect);
        this.addChildAsProp(parent, child, name, (options && options.nestedProp) ? false : true);
        if(images && images[0]){
            texType = (cc.spriteFrameCache.getSpriteFrame(images[0]) || texType == ccui.Widget.PLIST_TEXTURE) ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE;
            images[5] = texType;
            child.loadTextures.apply(child,images);
        }
        return child;
    },
    addTextBM: function (parent, name, position, bgImage, text, font) {
        var imgBG = null;
        if (bgImage != null) {
            if (cc.spriteFrameCache.getSpriteFrame(bgImage)) {
                imgBG = new ccui.ImageView(bgImage, ccui.Widget.PLIST_TEXTURE);
            } else {
                imgBG = new ccui.ImageView(bgImage, ccui.Widget.LOCAL_TEXTURE);
            }

            imgBG.setScale9Enabled(true);
            imgBG.setPosition(position);
            imgBG.setAnchorPoint(0.5, 0.5);
            parent.addChild(imgBG);
        }
        this[name] = new cc.LabelBMFont(text, font);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5, 0.5);
        parent.addChild(this[name]);
        if (imgBG != null) {
            imgBG.setContentSize(this[name].getContentSize().width + 50, this[name].getContentSize().height + 10);
        }
    },
    addListView: function (parent, name, position, size) {
        this[name] = new ccui.ListView();
        this[name].setDirection(ccui.ScrollView.DIR_VERTICAL);
        this[name].setTouchEnabled(true);
        this[name].setBounceEnabled(true);
        this[name].setClippingEnabled(true);
        this[name].setContentSize(size);
        this[name].setPosition(position);
        this[name].setAnchorPoint(cc.p(0.5, 0.5));
        parent.addChild(this[name]);
    },
    ////////////////////////////////////////////

    /******* functions need override  *******/
    customizeGUI: function () {
        /*    override meeeeeeeeee  */
    },

    onButtonRelease: function (button, id) {
        /*    override meeeeeeeeee  */
    },

    onButtonTouched: function (button, id) {
        /*    override meeeeeeeeee  */
    },

    onUpdateGUI: function (data) {

    },

    initGUI: function () {

    },

    functionDelayInit: function () {

    },

    finishAnimate: function () {

    },

    onBack: function () {

    },
    playSoundButton: function (id) {
        //gameSound.playClick();
    },

    //////////////////////////////////////////////////////
});
BaseLayer.TIME_APPEAR_GUI = 0.35;


