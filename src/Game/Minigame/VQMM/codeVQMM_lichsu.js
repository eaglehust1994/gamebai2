var vongquay_ls = null;
var vongquay_lsX = 0; var vongquay_lsY = 0;
var vongquay_lsAppear = false;


var codeVQMM_LS = MiniGameBaseLayer.extend(
    {
        ctor: function () {
            this.PanelLSGD = null;
            this.btnCloseLS = null;
            this.lb_soluotquay = null;
            this.array_lsVQMM = [];
            this.list_ls_VQMM = null;
            this.text_vong_trong = null;
            this.text_vong_ngoai = null;
            this.macolor = null;

            this.nenTitle = null;
            this.page = 1;
            this.maxpage = 100;
            this.pn_page = null;
            this.btn_back_all = null;
            this.btn_back = null;
            this.btn_next_all = null;
            this.btn_next = null;
            this.lb_page = null;

            this._super("codeVQMM_LS");
            this.initWithBinaryFile("res/VQMM_LichSu.json");
            return true;
        },
        customizeGUI: function(){
            this.PanelLSGD = this._layout.getChildByName("PanelLSGD");
            this.PanelLSGD.setVisible(false);
            this.PanelLSGD.setScale(0);
            this.btnCloseLS = this.customButton("btnCloseLS",codeVQMM_LS.BTN_CLOSELICHSU,this.PanelLSGD);
            this.nenTitle = this.PanelLSGD.getChildByName("nenTitle");
            this.nenTitle.setTexture("res/ResourceMenuTab/Mail/Title.png");

            this.list_ls_VQMM = this.getControl("list_ls_VQMM",this.PanelLSGD);
            this.list_ls_VQMM.setTouchEnabled(true);
            this.list_ls_VQMM.setClippingEnabled(true);
            this.list_ls_VQMM.setScrollBarEnabled(false);

            this.pn_page = this.PanelLSGD.getChildByName("pn_page");
            this.btn_back_all = this.customButton("btn_back_all",codeVQMM_LS.BTN_BACKALL_LS_VQ,this.pn_page);
            this.btn_back = this.customButton("btn_back",codeVQMM_LS.BTN_BACK_LS_VQ,this.pn_page);
            this.btn_next_all = this.customButton("btn_next_all",codeVQMM_LS.BTN_NEXTALL_LS_VQ,this.pn_page);
            this.btn_next = this.customButton("btn_next",codeVQMM_LS.BTN_NEXT_LS_VQ,this.pn_page);
            this.lb_page = this.getControl("lb_page",this.pn_page);

            this.PanelLSGD.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            //this.addMasterLayer(this.PanelLSGD);
        },
        onshow :function(){
            this.PanelLSGD.setVisible(true);
            this.PanelLSGD.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case codeVQMM_LS.BTN_CLOSELICHSU:
                    vongquay_ls.PanelLSGD.runAction(cc.scaleTo(0.2,0));
                    break;
                case codeVQMM_LS.BTN_BACKALL_LS_VQ:
                    if(this.page != 1){
                        this.page = 1;
                        this.parserDataLichSuVQMM();
                    }
                    break;
                case codeVQMM_LS.BTN_BACK_LS_VQ:
                    if(this.page > 1){
                        this.page = this.page - 1;
                        this.parserDataLichSuVQMM();
                    }
                    break;
                case codeVQMM_LS.BTN_NEXTALL_LS_VQ:
                    if(this.page != this.maxpage){
                        this.page = this.maxpage;
                        this.parserDataLichSuVQMM();
                    }
                    break;
                case codeVQMM_LS.BTN_NEXT_LS_VQ:
                    if(this.page < this.maxpage){
                        this.page = this.page + 1;
                        this.parserDataLichSuVQMM();
                    }
                    break;
            }
        },
        addLoading : function(){
            if(this.PanelLSGD.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(407,204));
                loading.setName("loadingdata");
                this.PanelLSGD.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.PanelLSGD.getChildByName("loadingdata").setVisible(true);
                this.PanelLSGD.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.PanelLSGD.getChildByName("loadingdata").stopAllActions();
            this.PanelLSGD.getChildByName("loadingdata").setVisible(false);
        },
        parserDataLichSuVQMM: function()
        {
            var url = urlLichSuVQMM_NEW(lobby.userInfo.nickname, this.page);
            sendRequest(url,null,false,vongquay_ls.callBackLSVQMM,vongquay_ls.callBackError);
            this.addLoading();
        },
        callBackLSVQMM:function(response)
        {
            //cc.log(response);

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            vongquay_ls.maxpage = jsonData["totalPages"];
            if(vongquay_ls.maxpage > 100)
                vongquay_ls.maxpage = 100;
            if(success){
                if(vongquay_ls.array_lsVQMM != null)
                    while(vongquay_ls.array_lsVQMM.length > 0) {
                        vongquay_ls.array_lsVQMM.pop();
                    }
                var LichSuVQ = jsonData["results"];
                if(LichSuVQ == ""){
                    vongquay_ls.closeLoading();
                }

                for (var i = 0; i < LichSuVQ.length; i++) {
                    var counter = LichSuVQ[i];
                    vongquay_ls.array_lsVQMM.push(counter);

                }
                vongquay_ls.reloadLSVQMM();
            }


            vongquay_ls.lb_page.setString(vongquay_ls.page +"/"+ vongquay_ls.maxpage);
            //cc.log(jsonData[0].nickname);
        },
        reloadLSVQMM:function()
        {
            this.list_ls_VQMM.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            for(var i = 0; i<this.array_lsVQMM.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.list_ls_VQMM.width;

                var cellList = null;
                if(i % 2 == 0)
                {
                    cellList = new cc.LayerColor(cc.color(23,57,106));
                }else
                {
                    cellList = new cc.LayerColor(cc.color("#39489E"));
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.list_ls_VQMM.width;

                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(140,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(71.49,positionY));
                lbPhien.setString(vongquay_ls.array_lsVQMM[i].transId);
                lbPhien.setColor(cc.color("#e8daad"));

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(159,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(221.2,positionY));
                lbTime.setString(Minigame.formatDateTime(vongquay_ls.array_lsVQMM[i].transTime));
                lbTime.setColor(cc.color("#e8daad"));

                var lbVongXu =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(107,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongXu.setPosition(cc.p(461.65,positionY));
                vongquay_ls.get_text_vong_xu(vongquay_ls.array_lsVQMM[i].resultXu);
                lbVongXu.setString(vongquay_ls.text_vong_trong);
                lbVongXu.setColor(cc.color("#c0c1c3"));

                var lbVongSlot =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(163,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongSlot.setPosition(cc.p(598.05,positionY));
                vongquay_ls.get_text_vong_slot(vongquay_ls.array_lsVQMM[i].resultSlot);
                lbVongSlot.setString(vongquay_ls.text_vong_ngoai);
                lbVongSlot.setColor(cc.color(vongquay_ls.macolor));

                var lbVongVin =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(163,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongVin.setPosition(cc.p(353.71,positionY));
                lbVongVin.setString(vongquay_ls.get_text_vong_vin(vongquay_ls.array_lsVQMM[i].resultVin));
                if(vongquay_ls.array_lsVQMM[i].resultVin == "fail"){
                    lbVongVin.setColor(cc.color("#c0c1c3"));
                }else
                    lbVongVin.setColor(cc.color("#E702FE"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(141,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(300,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(408.09,positionY + 3));

                var aSprite4 = new cc.Sprite();
                aSprite4.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite4.setScaleY(1); aSprite4.setScaleX(2);
                aSprite4.setPosition(cc.p(515.95,positionY + 3));

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbVongXu);
                cellList.addChild(lbVongSlot);
                cellList.addChild(lbVongVin);

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3); cellList.addChild(aSprite4);
                cl1.addChild(cellList);

                this.list_ls_VQMM.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
        callBackError: function(response)
        {
            this.closeLoading();
        },
        get_text_vong_xu : function(value){
                if (value == "200000") { ////// 5M xu
                    vongquay_ls.text_vong_trong = "200K Xu";
                }else if (value == "2000000") { ////// 500K xu
                    vongquay_ls.text_vong_trong = "2M Xu";
                }else if (value == "500000") { ////// 1M xu
                    vongquay_ls.text_vong_trong = "500K Xu";
                }else if (value == "1000000") { ////// 200k Xu
                    vongquay_ls.text_vong_trong = "1M Xu";
                }else if (value == "300000") { ////// them luot
                    vongquay_ls.text_vong_trong = "300K Xu";
                }else if (value == "3000000") { ////// 300k xu
                    vongquay_ls.text_vong_trong = "3M Xu";
                }else if (value == "100000") { ////// 2m xu
                    vongquay_ls.text_vong_trong = "100K Xu";
                }else if (value == "5000000") { ////// 100k xu
                    vongquay_ls.text_vong_trong = "5M Xu";
                }
        },
        get_text_vong_vin : function(value){
            var txt = ""
            if (value == "1000") { ////// 5M xu
                txt = "1K Vin";
            }else if (value == "10000") { ////// 500K xu
                txt = "10K Vin";
            }else if (value == "2000") { ////// 1M xu
                txt = "2K Vin";
            }else if (value == "50000") { ////// 200k Xu
                txt = "50K Vin";
            }else if (value == "5000") { ////// them luot
                txt = "5K Vin";
            }else if (value == "20000") { ////// 300k xu
                txt = "20K Vin";
            }else if (value == "fail") { ////// 2m xu
                txt = "Trượt";
            }else if (value == "100000") { ////// 100k xu
                txt = "100K Vin";
            }
            return txt;
        },
        get_text_vong_slot : function(value){
            if (value == "KhoBau3") { ////// 2 luot kho bau
                vongquay_ls.text_vong_ngoai = "3 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "NuDiepVien1") { ////// 1K vin
                vongquay_ls.text_vong_ngoai = "1 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "NuDiepVien2") { ////// Truot roi
                vongquay_ls.text_vong_ngoai = "2 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "KhoBau1") { ////// 50k vin
                vongquay_ls.text_vong_ngoai = "1 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "fail") { ////// 2k vin
                vongquay_ls.text_vong_ngoai = "Trượt";
                vongquay_ls.macolor = "#c0c1c3";
            }else if (value == "NuDiepVien3") { ////// 200k xu
                vongquay_ls.text_vong_ngoai = "3 lượt Nữ Điệp Viên";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "SieuAnhHung2") { ////// 10k vin
                vongquay_ls.text_vong_ngoai = "2 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "KhoBau2") { ////// 1 kho bau
                vongquay_ls.text_vong_ngoai = "2 lượt Kho Báu";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "SieuAnhHung3") { ////// 100k xu
                vongquay_ls.text_vong_ngoai = "3 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            }else if (value == "more") { ////// 20k vin
                vongquay_ls.text_vong_ngoai = "Thêm lượt";
                vongquay_ls.macolor = "#c0c1c3";
            }else if (value == "SieuAnhHung1") { ////// 5k vin
                vongquay_ls.text_vong_ngoai = "1 lượt Siêu Anh Hùng";
                vongquay_ls.macolor = "#E3E300";
            }
        },
        
    }
);

codeVQMM_LS.BTN_CLOSELICHSU = 1;
codeVQMM_LS.BTN_BACKALL_LS_VQ = 2;
codeVQMM_LS.BTN_BACK_LS_VQ = 3;
codeVQMM_LS.BTN_NEXTALL_LS_VQ = 4;
codeVQMM_LS.BTN_NEXT_LS_VQ = 5;


openvongquay_ls = function () {
    if (vongquay_ls == null) {
        vongquay_ls = new codeVQMM_LS();
        vongquay_lsX = vongquay_ls.getPosition().x;
        vongquay_lsY = vongquay_ls.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(vongquay_ls, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_VQMM+100);
    }else
    {
        vongquay_ls.PanelLSGD.setVisible(true);
        vongquay_ls.PanelLSGD.runAction(cc.scaleTo(0.2,1));
        vongquay_ls.setTag(Minigame.INDEX_VQMM + 100);
        //vongquay_ls.reOpenLayer(vongquay_ls.PanelLSGD);
    }
    vongquay_lsAppear = true;
    vongquay_ls.parserDataLichSuVQMM();
};
closevongquay_ls = function () {
    if (vongquay_ls == null) {
        return;
    }
    if(vongquay_lsAppear) {
        //vongquay_ls.closeLayer(vongquay_ls.PanelLSGD);
        vongquay_ls.PanelLSGD.setVisible(false);
        vongquay_ls.PanelLSGD.runAction(cc.scaleTo(0.2,0));
        vongquay_lsAppear = false;
    }
};