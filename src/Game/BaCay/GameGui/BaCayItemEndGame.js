//
BaCayEndGameItem = cc.Class.extend({
    ctor: function(stt, name, num1, num2, num3, num4, num5){
        this.stt = stt;
        this.name = name;
        this.num1 = num1;
        this.num2 = num2;
        this.num3 = num3;
        this.num4 = num4;
        this.num5 = num5;
    }
});

BaBayItemContain = cc.TableViewCell.extend({
    ctor: function(){
        this._super();
        //var jsonLayout = ccs.load("res/g_res_cardGame_json_BaCayEndGameItem.json");
        //this._layout = jsonLayout.node;
        //this.addChild(this._layout);
        //this._layout.anchorX = 0.0;
        //this._layout.anchorY = 0.0;
        //this._layout.x = 0;
        //this._layout.y = 0;
        this.addImage(this,"bg",cc.p(408,34),res_CardGame_BaCay + "/bg_content_ketqua.png",cc.size(816,68));
        this.addText(this,"stt",cc.p(32,34),"1",fontRobotoMedium.fontName,36);
        this.addText(this,"name",cc.p(118,34),"Thim Tuyen ha",fontRobotoMedium.fontName,22);
        this.addText(this,"num1",cc.p(263,34),"10000000000",fontRobotoMedium.fontName,22);
        this.addText(this,"num2",cc.p(388,34),"100000000",fontRobotoMedium.fontName,22);
        this.addText(this,"num3",cc.p(511,34),"100000000",fontRobotoMedium.fontName,22);
        this.addText(this,"num4",cc.p(634,34),"500000000",fontRobotoMedium.fontName,22);
        this.addText(this,"num5",cc.p(754,34),"10000000000",fontRobotoMedium.fontName,22);
        //this.name = this._layout.getChildByName("name");
        //this.stt = this._layout.getChildByName("stt");
        //this.num1 = this._layout.getChildByName("datCuoc");
        //this.num2 = this._layout.getChildByName("danhBien");
        //this.num3 = this._layout.getChildByName("keCua");
        //this.num4 = this._layout.getChildByName("cuocGa");
        //this.num5 = this._layout.getChildByName("tongCuoc");
    },

    onEnter: function()
    {
        cc.TableViewCell.prototype.onEnter.call(this);
    },

    updateWithItem: function(item){

        if(item.name.length > 15){
            item.name = item.name.substring(0, 15);
        }
        this.name.setString(item.name);
        this.num1.setString(gameUtility.standartNumber(item.num1));

        if(item.num1 > 0){
            this.num1.setColor({r: 255, g: 255, b: 0});
        }else{
            this.num1.setColor({r: 255, g: 255, b: 255});
        }

        this.num2.setString(gameUtility.standartNumber(item.num2));
        if(item.num2 > 0){
            this.num2.setColor({r: 255, g: 255, b: 0});
        }
        else{
            this.num2.setColor({r: 255, g: 255, b: 255});
        }
        this.num3.setString(gameUtility.standartNumber(item.num3));
        if(item.num3 > 0){
            this.num3.setColor({r: 255, g: 255, b: 0});
        }else{
            this.num3.setColor({r: 255, g: 255, b: 255});
        }
        this.num4.setString(gameUtility.standartNumber(item.num4));
        if(item.num4 > 0){
            this.num4.setColor({r: 255, g: 255, b: 0});
        }else{
            this.num4.setColor({r: 255, g: 255, b: 255});
        }
        this.num5.setString(gameUtility.standartNumber(item.num5));
        if(item.num5 > 0){
            this.num5.setColor({r: 255, g: 255, b: 0});
        }else{
            this.num5.setColor({r: 255, g: 255, b: 255});
        }

        this.stt.setString("" + item.stt);
        if(parseInt(item.stt) == 1){
            this.name.setColor({r: 0, g: 255, b: 0});
            this.stt.setColor({r: 0, g: 255, b: 0});
        }else {
            this.name.setColor({r: 255, g: 255, b: 255});
            this.stt.setColor({r: 255, g: 255, b: 255});
        }

    },
    addImage:function(parent, name, position, image, size)
    {
        if(cc.spriteFrameCache.getSpriteFrame(image))
        {
            this[name] = new ccui.ImageView(image,ccui.Widget.PLIST_TEXTURE);
        }else
        {
            this[name] = new ccui.ImageView(image,ccui.Widget.LOCAL_TEXTURE);
        }

        this[name].setScale9Enabled(true);
        this[name].setPosition(position);
        this[name].setAnchorPoint(0.5,0.5);
        this[name].setContentSize(size);
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
    }
})