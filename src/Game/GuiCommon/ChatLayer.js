/**
 * Created by Admin on 10/8/2016.
 */

var ChatLayer = BaseLayer.extend({

    ctor: function () {
        this._super("ChatLayer");

        var _this = this;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch,event){return true;},
            onTouchMoved: function(touch,event){},
            onTouchEnded: _this.onTouchEnded.bind(_this)
        });
        cc.eventManager.addListener(this.touchListener, this);

        this.timeout = 0;
        this.initGUI();
    },

    initGUI: function () {
        this.addSprite(this,"bg",cc.p(1015,360),res_common_chat + "/chat_bg.png");
        this.addButton(this.bg,"btnText",2000,cc.p(44,45),true,res_common_chat + "/chat_btn_text.png",res_common_chat + "/chat_btn_text.png");
        this.btnText.addClickEventListener(this.onBtnTextClicked.bind(this));
        this.addButton(this.bg,"btnEmotion",2000,cc.p(116,45),true,res_common_chat + "/chat_btn_emotion.png",res_common_chat + "/chat_btn_emotion.png");
        this.btnEmotion.addClickEventListener(this.onBtnEmotionClicked.bind(this));
        this.addButton(this.bg,"btnSend",2000,cc.p(462,45),true,res_common_chat + "/chat_btn_send.png",res_common_chat + "/chat_btn_send.png");
        this.btnSend.addClickEventListener(this.onBtnSendClicked.bind(this));

        this.addSprite(this.bg,"bg_editbox",cc.p(281,45),res_common_chat+"/chat_box.png");
        this.addEditBox(this.bg,"textField",cc.p(281,45),"","Nhập nội dung...",RobotoRegular.fontName,22,cc.size(228,43),null,cc.TEXT_ALIGNMENT_LEFT,20);
        this.textField.setFontColor(cc.color.BLACK);
        this.addText(this.bg,"timeoutWarning",cc.p(266,85),"Mỗi lần chat phải cách nhau tối thiểu 5s!",RobotoRegular.fontName,22);
        this.timeoutWarning.setColor(cc.color.RED);
        this.timeoutWarning.setOpacity(0);

        this.initEmotions();
        this.initDefaultTexts();

        this.textNode.setVisible(false);

    },
    changeTextFieldAsEditBox : function(textfield, parent){
        var namebox = textfield.getName();
        var placeHolder = textfield.getPlaceHolder();
        var fontsize = textfield.getFontSize();
        var maxlenght = textfield.getMaxLength();
        var tag = textfield.getLocalZOrder();
        textfield.removeFromParent(true);

        this.neweditbox = new cc.EditBox(cc.size(textfield.width, textfield.height + 10), cc.Scale9Sprite.create(), cc.Scale9Sprite.create(), cc.Scale9Sprite.create());
        this.neweditbox.setName(namebox);
        this.neweditbox.setAnchorPoint(cc.p(0.5,0.5));
        this.neweditbox.setPosition(cc.p(textfield.x, textfield.y));
        this.neweditbox.setPlaceHolder(placeHolder);
        this.neweditbox.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.neweditbox.setFontName("Roboto-Regular");
        this.neweditbox.setPlaceholderFontName("Roboto-Regular");
        this.neweditbox.setFontSize(fontsize);
        this.neweditbox.setPlaceholderFontSize(fontsize);
        this.neweditbox.setPlaceholderFontColor(cc.color.GRAY);
        this.neweditbox.setFontColor(cc.color.BLACK);
        this.neweditbox.setDelegate(this);
        this.neweditbox.setMaxLength(maxlenght);
        parent.addChild(this.neweditbox, tag);
        this.neweditbox.setLocalZOrder(tag);
        return this.neweditbox;

    },
    editBoxReturn: function (editBox) {
        if (!cc.sys.isNative) {
            cc.log("Enter");
            var curTime = new Date().getTime()/1000;
            if (curTime-this.timeout<ChatLayer.TIME_OUT){
                if (this.timeoutWarning.getOpacity()==0){
                    this.timeoutWarning.runAction(cc.sequence(
                        cc.fadeIn(0.5),
                        cc.delayTime(1.0),
                        cc.fadeOut(0.5)
                    ));
                }
            }
            else {
                this.setVisible(false);
                this.touchListener.setEnabled(false);

                var textStr = this.textField.getString();
                lobby.btn_dayly.setVisible(false);
                lobby.btn_dayly.setVisible(true);
                if (textStr.length > 0){
                    this.timeout = curTime;
                    gameWsClient.sendChatRoom(false, textStr);
                    this.textField.setString("");
                }
            }
        }

        return;
    },
    onTextFieldChanged: function(){
    },

    onTouchEnded: function(touch,event){
        var touchLocal = this.convertToNodeSpace(touch.getLocation());
        if (!cc.rectContainsPoint(this.bg.getBoundingBox(), touchLocal)){
            this.setVisible(false);
            this.touchListener.setEnabled(false);
            lobby.btn_dayly.setVisible(false);
            lobby.btn_dayly.setVisible(true);
        }
    },

    initEmotions: function(){

        this.emotionNode = new cc.Node();
        this.emotionNode.setPosition(ChatLayer.BACKGROUND_SIZE.width/2, ChatLayer.BACKGROUND_SIZE.height/2);
        this.bg.addChild(this.emotionNode);

        var rootPos = cc.p(-180, -160);
        for (var i=0; i<5; i++){
            for (var j=0; j<5; j++){
                var id = i*5+j+1;
                var emotion = GuiUtil.createSimpleButton("res/common/chat/emotion_" + id + ".png");
                emotion.addClickEventListener(this.onEmotionClicked.bind(this, id));
                emotion.setPosition(rootPos.x + j*90, rootPos.y + (4-i)*90);
                this.emotionNode.addChild(emotion);
            }
        }
    },


    initDefaultTexts: function(){
        this.textList = ["Helllooo", "Quit đây", "Thank u vinamilk", "Sorry babie", "Nhanh lên ông eii", "Bài chán vãi", "Đỡ nè",
            "Tiêu", "Thúi heo", "Chết nè", "Cóng chưa", "4 Đôi Thông", "Thua đi cưng", "3 Đôi Thông", "Sảnh Rồng"];

        switch(gameData.gameType){
            case GameList.SamSoLo:
            case GameList.SamThuong:
                this.textList = ["Cóng chưa", "Tuổi gì mà bắt", "Đời không như là mơ", "Hên thế", "Ăn hàng :v",
                    "Đen vãi", "Thế mà cũng đòi sâm", "Chết nè", "Bài chán vãi", "Vỡ alo chưa ?", "Thua đi cưng", "Nhanh lên thím"];
                break;
            case GameList.TienLenSoLo:
            case GameList.TienLenThuong:
                this.textList = ["4 đôi thông :)", "Tuổi gì mà bắt", "Hên thế", "Ăn hàng :v","Heo nè!",
                    "Đen vãi", "Chết nè", "Thua đi cưng", "Vỡ alo chưa ?", "Bài chán thế", "Thối rồi", "Xong!"];
                break;
            case GameList.BaCay:
                this.textList = ["Sáp nè",  "Hên thế", "Cướp chương nhé", "Nhanh lên thím",
                    "Đen vãi", "Dây nè :)", "Sang tiền :)", "Bài chán thế", "X2 cả Làng :)"];
                break;
            case GameList.BaiCao:
                this.textList = ["Sáp nè",  "Hên thế", "Cướp chương nhé", "Nhanh lên thím", "Ảnh nè mấy bác :)",
                    "Đen vãi", "Ảnh nè mấy bác :)", "Sang tiền :)", "Bài chán thế", "X2 cả Làng :)"];
                break;
            case GameList.MauBinh:
            case GameList.MauBinhTinhAt:
                this.textList = ["Nhanh lên thím",  "Xếp lâu thế!", "3 Cái Thùng :)", "Sảnh rồng nè :)", "Lục phế bôn :)",
                    "Đen vãi", "Sập hầm rồi :(", "3 Cái Sảnh :)", "Bài chán thế", "Mậu binh hụt :((", "Sám chi cuối :)"]
                break;
            case GameList.Poker:
                this.textList = ["All in nè",  "Hên thế", "Tất tay nhé", "Nhanh lên thím", "Sảnh vua nè","Sám cô rồi",
                    "Đen vãi", "Tố nè :)", "Sang tiền :)", "Bài chán thế", "Ăn cả Làng :)", "Dám tất tay không", "Đánh hay đấy"];
                break;
            case GameList.Lieng:
                this.textList = ["Sáp nè",  "Hên thế", "Úp hết đê", "Nhanh lên thím", "Ảnh nè mấy bác :)",
                    "Đen vãi", "Liêng nè", "Sang tiền :)", "Bài chán thế", "Tố to lên"];
                break;
            case GameList.CoCaro:
                this.textList = ["Nhanh lên thím", "Xong!", "Chéo nè!", "Đánh hay đấy", "Tuổi tí :)", "Chạy đâu cho thoát cưng",
                    "Nước đôi nè!", "Chấp 1 nước luôn!", "Lâu thế, chơi hay nghỉ đây", "Chặn hết rồi :)"];
                break;
            case GameList.XiZach:
                this.textList = ["Nhanh lên thím", "Hên thế!", "Tôi 20!", "Quắc Chưa?", "Đen vãi!", "Dằn non!",
                    "Ngũ Linh nè!", "Quắc mẹ nó rồi!", "Đủ tuổi", "Sang tiền", "Trời! Ngũ linh luôn", "Ăn rồi", "x2 cả làng", "21 nè! ",  "19 xuân xanh"];
                break;
            case GameList.CoTuong:
                this.textList = ["Chiếu tướng!", "Hết Cờ :)", "Chạy ah!", "Tốt nhập cung", "Cờ bí dí Tốt", "Đổi không?",
                    "Cờ tàn rồi!", "Tướng mất Sĩ như đĩ mất váy :)", "Nhanh lên thím", "Pháo đầu nè!",
                    "Đánh hay đấy", "Một Sĩ chòi góc cóc sợ Mã công", "Cụt Xe hơn què Tượng", "Lâu thế, chơi hay nghỉ đây"];
                break;
            case GameList.CoUp:
                this.textList = ["Chiếu tướng!", "Hết Cờ :)", "Chạy ah!", "Tốt nhập cung", "Cờ bí dí Tốt", "Đổi không?",
                    "Cờ tàn rồi!", "Tướng mất Sĩ như đĩ mất váy :)", "Nhanh lên thím", "Pháo đầu nè!",
                    "Đánh hay đấy", "Một Sĩ chòi góc cóc sợ Mã công", "Cụt Xe hơn què Tượng", "Lâu thế, chơi hay nghỉ đây"];
                break;
            case GameList.XocDia:
                this.textList = ["Chẵn nè!", "Đen vãi!", "Tứ đỏ nhé anh em!", "Lẻ Rồi!", "Tất Tay Lẻ nào!", "Chẵn hay Lẻ đây?",
                    "Nhanh lên thím!", "Tất Tay Chẵn đi!", "Đánh hay đấy!", "Hên thế!", "100% Lẻ", "100% Chẵn",
                    "May Vãi", "Tứ trắng!", "Đánh lớn lên ae"];
                break;
        }

        this.textNode = new cc.Node();
        this.textNode.setPosition(ChatLayer.BACKGROUND_SIZE.width/2, ChatLayer.BACKGROUND_SIZE.height/2);
        this.bg.addChild(this.textNode);

        var textLength = 0;
        var posX = 250;
        var posY = 220;

        for (var i=0; i<this.textList.length; i++){
            var slot = GuiUtil.createSimpleButton("res/common/9patch.png");
            slot.setScale9Enabled(true);
            slot.addClickEventListener(this.onDefaultTextClicked.bind(this, i));
            slot.setAnchorPoint(1, 0.5);
            this.textNode.addChild(slot);

            var label = new ccui.Text(this.textList[i], "Arial", 25);
            label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            slot.addChild(label);

            slot.width = label.getContentSize().width*1.1;
            slot.height = 40;

            textLength += this.textList[i].length;
            cc.log("text length = " + textLength);
            if (textLength>ChatLayer.MAX_CHAR_IN_LINE){
                textLength = this.textList[i].length;
                posY = posY - slot.height - 10;
                posX = 250;
            }
            slot.setPosition(posX-15, posY);
            label.setPosition(slot.width/2,slot.height/2);

            posX-=(slot.width+15);
        }
    },

    onDefaultTextClicked: function(index){
        var curTime = new Date().getTime()/1000;
        if (curTime-this.timeout<ChatLayer.TIME_OUT){
            if (this.timeoutWarning.getOpacity()==0){
                this.timeoutWarning.runAction(cc.sequence(
                    cc.fadeIn(0.5),
                    cc.delayTime(1.0),
                    cc.fadeOut(0.5)
                ));
            }
        }
        else{
            this.timeout = curTime;
            this.setVisible(false);
            this.touchListener.setEnabled(false);
            gameWsClient.sendChatRoom(false, this.textList[index]);
        }
    },

    onEmotionClicked: function(emotionId){
        var curTime = new Date().getTime()/1000;
        if (curTime-this.timeout<ChatLayer.TIME_OUT){
            if (this.timeoutWarning.getOpacity()==0){
                this.timeoutWarning.runAction(cc.sequence(
                    cc.fadeIn(0.5),
                    cc.delayTime(1.0),
                    cc.fadeOut(0.5)
                ));
            }
        }
        else {
            this.timeout = curTime;
            this.setVisible(false);
            this.touchListener.setEnabled(false);
            gameWsClient.sendChatRoom(true, emotionId.toString());
        }
    },

    onBtnSendClicked: function(){
        var curTime = new Date().getTime()/1000;
        if (curTime-this.timeout<ChatLayer.TIME_OUT){
            if (this.timeoutWarning.getOpacity()==0){
                this.timeoutWarning.runAction(cc.sequence(
                    cc.fadeIn(0.5),
                    cc.delayTime(1.0),
                    cc.fadeOut(0.5)
                ));
            }
        }
        else {
            this.setVisible(false);
            this.touchListener.setEnabled(false);

            var textStr = this.textField.getString();
            if (textStr.length > 0){
                this.timeout = curTime;
                gameWsClient.sendChatRoom(false, textStr);
                this.textField.setString("");
            }
        }
    },

    onBtnTextClicked: function(){
        this.emotionNode.setVisible(false);
        this.textNode.setVisible(true);
    },

    onBtnEmotionClicked: function(){
        this.emotionNode.setVisible(true);
        this.textNode.setVisible(false);
    }

});

ChatLayer.MAX_CHAR_IN_LINE = 32;
ChatLayer.TIME_OUT = 3;
ChatLayer.BACKGROUND_SIZE = cc.size(512, 597);

