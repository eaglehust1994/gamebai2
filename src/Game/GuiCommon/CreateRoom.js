var crRoom = null;
var crRoomX = 0; var crRoomY = 0;
var crRoomAppear = false;

CreateRoom = BaseLayer.extend({
    ctor: function () {
        this._super("CreateRoom");
        this.initWithBinaryFile("res/g_res_cardGame_json_CreateRoom.json");
    },

    customizeGUI: function(){
        cc.log("open create room");



    }
});

openCreateRoom = function () {
    if (crRoom == null) {
        crRoom = new CreateRoom();
        crRoomX = crRoom.getPosition().x;
        crRoomY = crRoom.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(crRoom, BaseScene.INDEX_GAME_GUI, 2);
    }else
    {
        vongquay.setVisible(true);
        vongquay.pn_vqmm.runAction(cc.scaleTo(0.2,1));

    }
    crRoomAppear = true;
};
closeCreateRoom = function () {
    if (crRoom == null) {
        return;
    }
    if(crRoomAppear) {
        crRoomAppear = false;
    }
};
