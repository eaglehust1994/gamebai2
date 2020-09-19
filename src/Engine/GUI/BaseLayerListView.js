/**
 * Created by PVC on 7/18/2017.
 */

var itemList = {
    name:"",
    width: 0,
    color:cc.color.WHITE,
    apiName:""
}

var BaseLayoutListView  = ccui.Layout.extend(
    {
        _bgImg: null,
        _listView:null,
        _size:null,
        _arrInfoColom:null,
        _layer: null,
        _pTitle:null,
        _cellHeight:40,

        ctor: function (layer , size, arrInfoColom){
            this._super();
            this._layer = layer;
            this._size = size;
            this._arrInfoColom = arrInfoColom;
            this.setContentSize(size);

            //this._bgImg = new
            this._bgImg = new ccui.ImageView(image,cc.spriteFrameCache.getSpriteFrame(image) ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE);
            this._bgImg.setScale9Enabled(true);
            this._bgImg.setPosition(position);
            this._bgImg.setAnchorPoint(0.5, 0.5);
            this._bgImg.setContentSize(this._size);



            this._listView = new ccui.ListView();
            this._listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._listView.setTouchEnabled(true);
            this._listView.setBounceEnabled(true);
            this._listView.setClippingEnabled(true);
            this._listView.setContentSize(this._size);
            this._listView.setPosition(position);
            this._listView.setAnchorPoint(cc.p(0.0, 0.0));
            this._listView.setPosition(cc.p(0,0));
            this.addChild(this._listView);

            this._pTitle = new ccui.Layout();
            this._pTitle.setAnchorPoint(0.5, 0.5);
            this._pTitle.setContentSize(this._size.width,50);
            this._pTitle.setTouchEnabled(false);
            this._pTitle.setCascadeOpacityEnabled(true);
            this._pTitle.setPosition(cc.p(this._size.width/2, this._size.height-25));
            this.addChild(this._pTitle);

        },
        initPTitle:function()
        {
            for(var i = 0; i < this._arrInfoColom.length; i++)
            {
                var titleName = new ccui.Text(this._arrInfoColom[i].name, fontRobotoBlack.fontName, 22);
                //titleName.setPosition(position);
                titleName.setAnchorPoint(0.5, 0.5);
                if (cc.sys.isNative) {
                    titleName.setFontName("res/Font/" + titleName.getFontName() + ".ttf");
                }
                titleName.ignoreContentAdaptWithSize(false);
                titleName.setContentSize(cc.size(this._arrInfoColom[i].width,50));
                titleName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                titleName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
                titleName.setColor(cc.color(255,223,88));
                titleName.setTag(i);
                var position = cc.p(0,0);
                if(i == 0)
                {
                    position = cc.p(this._arrInfoColom[i].width/2,25);

                }else
                {
                    var positionW = this._pTitle.getChildByTag(i-1).getPosition().width + this._pTitle.getChildByTag(i-1).getContentSize().width/2 + this._arrInfoColom[i].width/2;
                    position = cc.p(positionW,25);
                }
                titleName.setPosition(position);
                this._pTitle.addChild(titleName);
            }

        },

        createItemListView:function(data)
        {
            var cell = new ccui.Layout();
            cell.height = this._cellHeight;
            cell.width =  this._size.width;
            cell.setPosition(cc.p(378,0));
            cell.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            cell.setClippingEnabled(true);
            cell.setBackGroundColor(colorBgCell1);
        }

    }
);