/**
 * Created by vinplay on 2/4/17.
 */

var CaroTile = {
    BLANK: 0,
    X: 1,
    O: 2
};

var dx = [-1, 0, 1, 1, 1, 0, -1, -1];
var dy = [-1, -1, -1, 0, 1, 1, 1, 0];

XocDia.GameLogic = cc.Class.extend({
    ctor: function() {

        this.init();
    },

    init: function() {
       // this.boardSize = CoCaro.boardSize;
    },

    joinRoom: function(pk) {
        var gameLayer = gameScenePool.getXocDiaGameScene();
        GameLobby.getInstance().setVisible(false);
        if(gameLobbyInstance.disableMoiChoi == true){
            if(gameLobbyInstance.guiReceiveMoiChoi)
                gameLobbyInstance.guiReceiveMoiChoi.hide();
        }
        GameLobby.getInstance().closeCreateRoom();
        GameScene.addGameGUI(gameLayer);
        GameScene.gameGui.onUpdateGui(pk);
        //xocdia.onUpdate(pk);
    },
    UserjoinRoom: function(pk) {
        cc.log("user join: ");
        GameScene.gameGui.addPlayerToListStand(pk);

        //var remem = [];
        //var checkuserInroom = GameScene.gameGui.checkUserInRoom(pk.nickname);
        //if(checkuserInroom == false) {
            //GameScene.gameGui.save_number_playing = GameScene.gameGui.save_number_playing + 1;
            //for (var i = 0; i < 8; i++) {
            //    if (GameScene.gameGui.arrayPlayer[i] == "") {
            //        remem.push(i);
            //    }
            //}
            //var ran = getRandomInt(0, (remem.length - 1));
            //GameScene.gameGui.audioXocDia.soundEffect(GameScene.gameGui.audioXocDia.inRoom);
            //GameScene.gameGui.drawPlayerJoinRoom(remem[ran], pk.nickname, parseInt(pk.avatar), pk.money);
        //}
    },
});

XocDia.GameState = {
    //JOIN_ROOM: 0,
    //END_GAME: 1,
    //START_GAME: 2,
    //THONG_TIN_VAN_CHOI: 3,
    //NOTIFYOUTROOM: 4,
    //AUTO_START: 5,
    //USER_JOIN: 6,
    //USER_LEAVE: 7,
    //UPDATE_MATCH: 8,
    //TAKE_TURN: 9,
    //CHANGE_TURN: 10
};

XocDia.GameLogic.MAX_PLAYER = 30;