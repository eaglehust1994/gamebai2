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

CoCaro.GameLogic = cc.Class.extend({
    ctor: function() {
        var i;
        this.currentPlayer = -1;
        this.starter = 0;
        this.myChair = 0; // Chair in server
        this.players = [];
        this.gameId = 0;
        this.roomId = 0;
        this.bet = 1000;
        this.isPlaying = false;
        for(i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++){
            var player = new CoCaro.Player();
            player.status = 0;
            this.players.push(player);
        }
        this.init();
    },

    isMyTurn: function() {
        return this.currentPlayer == 0;
    },

    init: function() {
        this.boardSize = CoCaro.boardSize;
        this.board = new Array(this.boardSize);
        this.effectMap = new Array(this.boardSize);
        for (var i = 0; i < this.boardSize; i++) {
            this.board[i] = new Array(this.boardSize);
            this.effectMap[i] = new Array(this.boardSize);
            for (var j = 0; j < this.boardSize; j++) {
                this.board[i][j] = CaroTile.BLANK;
                this.effectMap[i][j] = 0;
            }
        }
    },

    startGame: function(pk) {
        this.starter = this.convertChair(pk.starter);
        for (var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
            var chair = this.convertChair(i);
            this.players[chair].info.tickType = pk.playerInfo[i].tickType;
        }
        this.gameState = CoCaro.GameState.START_GAME;
        this.currentPlayer = -1;
        this.isPlaying = true;
    },

    getCurrentTickType: function() {
        return this.getTickTypeOfPlayer(this.currentPlayer);
    },

    getTickTypeOfPlayer: function(id) {
        if (this.starter == id)
            return CaroTile.X;
        return CaroTile.O;
    },

    resetEffectMap: function() {
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                this.effectMap[i][j] = 0;
            }
        }
    },

    canMark: function(x, y) {
        if (x < 0 || x >= this.boardSize || y < 0 || y >= this.boardSize)
            return false;
        return this.board[x][y] == CaroTile.BLANK;
    },

    markOnTile: function(x, y, v) {
        if (!this.canMark(x, y)) {
            return false;
        }
        this.board[x][y] = v;
        return true;
    },

    verifyEffectMap: function(x, y) {
        for (var i = 0; i < dx.length; i++) {
            this.verifyVector(x, y, dx[i], dy[i]);
        }
    },

    checkWarning: function(x, y) {
        return;
        this.verifyEffectMap(x, y);
        for (var i = 0; i < dx.length; i++) {
            this.checkVector(x, y, dx[i], dy[i]);
        }
    },

    isOutBoard: function(x) {
        return x < 0 || x >= this.boardSize;
    },

    checkVector: function(x, y, vx, vy) {
        this.isTicked = false;
        this.mark = 0;
        var l = this.loangForwardVector(x, y, vx, vy);
        var r = this.loangForwardVector(x, y, -vx, -vy);
        var d = r[2] + l[2] - 1;
        if (d > 5 || (d == 5 && this.mark < 2)) {
            for (var i = 0; i < d; i++) {
                var tx = r[0] + i * vx;
                var ty = r[1] + i * vy;
                if (this.board[tx][ty] != CaroTile.BLANK)
                    this.effectMap[tx][ty] = 1;
            }
        }
    },

    tryRemoveEffect: function(x, y) {
        for (var k = 0; k < dx.length; k++) {
            var vx = dx[k];
            var vy = dy[k];
            this.isTicked = false;
            this.mark = 0;
            var l = this.loangForwardVector(x, y, vx, vy);
            var r = this.loangForwardVector(x, y, -vx, -vy);
            var d = r[2] + l[2] - 1;
            if (d > 5 || (d == 5 && this.mark < 2)) {
                return;
            }
        }
        this.effectMap[x][y] = 0;
    },

    verifyVector: function(x, y, vx, vy) {
        var tx = x + vx;
        var ty = y + vy;
        while (true) {
            if (this.isOutBoard(tx) || this.isOutBoard(ty))
                break;
            if (this.board[tx][ty] != this.board[x][y] && this.board[tx][ty] != CaroTile.BLANK) {
                if (this.effectMap[tx][ty] == 1)
                {
                    this.tryRemoveEffect(tx, ty);
                }
            }
            tx += vx;
            ty += vy;
        }
    },

    loangForwardVector: function(x, y, vx, vy) {
        var lx = x;
        var ly = y;
        var d = 1;
        while (true) {
            var tx = lx + vx;
            var ty = ly + vy;
            if (this.isOutBoard(tx) || this.isOutBoard(ty))
                break;
            if (this.board[tx][ty] != this.board[x][y]) {
                if (this.board[tx][ty] == CaroTile.BLANK) {
                    if (!this.isTicked) {
                        this.isTicked = true;
                    } else {
                        break;
                    }
                } else {
                    this.mark++;
                    break;
                }
            }
            lx = tx;
            ly = ty;
            d++;
        }
        return [lx, ly, d];
    },

    test: function() {
        var contents = cc.loader._loadTxtSync("res/test.txt");
        cc.log("HERE I COME....................................................");
        cc.log("===============================================================");
        var lines = contents.split('\n');
        for(var i = 0; i < this.boardSize; i++) {
            var line = lines[i].split(' ');
            for (var j = 0; j < this.boardSize; j++) {
                this.board[i][j] = parseInt(line[j]);
            }
        }
        for (var i = 0; i < this.boardSize; i++) {
            var s = "";
            if (i < 10)
                s += "0" + i + " - ";
            else
                s += i + " - ";
            for (var j = 0; j < this.boardSize; j++) {
                s += this.board[i][j] + " ";
            }
            cc.log(s);
        }
        this.verify(6, 5);
        cc.log("===============================================================");
        for (var i = 0; i < this.boardSize; i++) {
            var s = "";
            if (i < 10)
                s += "0" + i + " - ";
            else
                s += i + " - ";
            for (var j = 0; j < this.boardSize; j++) {
                s += this.effectMap[i][j] + " ";
            }
            cc.log(s);
        }
        cc.log("===============================================================");
    },

    joinRoom: function(pk) {
        cc.log("joinRoom 1");
        this.gameState = CoCaro.GameState.JOIN_ROOM;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.countDownTime;

        for(var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++)
        {
            var chair = this.convertChair(i);
            if (pk.playerStatus[chair] != 0) {
                this.players[chair].info = pk.playerInfos[i];
                this.players[chair].status = pk.playerStatus[i];
            }
        }
        cc.log("joinRoom end");
    },

    notifyOutRoom: function(pk) {
        this.gameState = CoCaro.GameState.NOTIFYOUTROOM;
    },

    userLeave: function(pkg) {
        cc.log("vao userLeave logic");

        var chairLocal = this.convertChair(pkg.chair);
        if(pkg.nickName){
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].status = 0;
        }
        cc.log("local chair: " + this.activeLocalChair);
        this.gameState = CoCaro.GameState.USER_LEAVE;
    },

    userJoinRoom: function(pkg) {
        this.gameState = CoCaro.GameState.USER_JOIN;
        var chairLocal = this.convertChair(pkg.uChair);
        {
            this.activeLocalChair = chairLocal;
            this.players[chairLocal].info = pkg.info;
            this.players[chairLocal].status = pkg.uStatus;
        }
    },

    autoStart: function(pk){
        this.gameState = CoCaro.GameState.AUTO_START;
        this.timeAutoStart = pk.timeAutoStart;
    },

    resetData: function() {
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                this.board[i][j] = CaroTile.BLANK;
            }
        }
        this.resetEffectMap();
        this.currentPlayer = -1;
    },

    takeTurn: function(pk) {
        this.gameState = CoCaro.GameState.TAKE_TURN;
        this.markOnTile(pk.x, pk.y, pk.type);
    },

    changeTurn: function(pk) {
        this.currentPlayer = this.convertChair(pk.currentPlayer);
        this.countDownTime = pk.countDownTime;
        this.gameState = CoCaro.GameState.CHANGE_TURN;
    },

    endGame: function(data) {
        this.currentPlayer = -1;
        this.isPlaying = false;
        if (data.result == CoCaro.Result.WIN_LOSE) {
            if (data.winner != this.myChair) {
                this.players[0].tongCuoiVan = data.moneyLose;
                this.players[1].tongCuoiVan = data.moneyWin;
            } else {
                this.players[0].tongCuoiVan = data.moneyWin;
                this.players[1].tongCuoiVan = data.moneyLose;
            }
        } else {
            this.players[0].tongCuoiVan = 0;
            this.players[1].tongCuoiVan = 0;
        }
        for (i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++) {
            var chair = this.convertChair(i);
            this.players[chair].info.money = data.currentMoney[i];
            if (chair == 0) {
                lobby.updateMoney(data.currentMoney[i], this.moneyType);
            }
        }

        this.gameState = CoCaro.GameState.END_GAME;
    },

    convertChair: function(serverChair){
        return (serverChair - this.myChair + CoCaro.GameLogic.MAX_PLAYER) % CoCaro.GameLogic.MAX_PLAYER;
    },

    convertToChairServer: function(local){
        return (local + this.myChair + CoCaro.GameLogic.MAX_PLAYER) % CoCaro.GameLogic.MAX_PLAYER;
    },

    updateMatch: function() {
        this.gameState = CoCaro.GameState.UPDATE_MATCH;
        this.resetData();
    },

    reconnect: function(pk) {
        this.gameState = CoCaro.GameState.THONG_TIN_VAN_CHOI;
        this.isPlaying = true;
        this.bet = pk.moneyBet;
        this.moneyType = pk.moneyType;
        this.roomId = pk.roomId;
        this.gameId = pk.gameId;
        this.myChair = pk.myChair;
        this.gameAction = pk.gameAction;
        this.activeTimeRemain = pk.countDownTime;

        for(var i = 0; i < CoCaro.GameLogic.MAX_PLAYER; i++)
        {
            var chair = this.convertChair(i);
            if (pk.playerStatus[chair] != 0) {
                this.players[chair].info = pk.playerInfos[i];
                this.players[chair].status = pk.playerStatus[i];
            }
        }

        this.currentPlayer = this.convertChair(pk.currentChair);
        for (var i = 0; i < this.boardSize; i++) {
            for (var j = 0; j < this.boardSize; j++) {
                if (pk.map[i][j] != 0) {
                    this.markOnTile(i, j, pk.map[i][j]);
                    this.checkWarning(i, j);
                } else {
                    this.board[i][j] = 0;
                }
            }
        }
    }
});

CoCaro.GameState = {
    JOIN_ROOM: 0,
    END_GAME: 1,
    START_GAME: 2,
    THONG_TIN_VAN_CHOI: 3,
    NOTIFYOUTROOM: 4,
    AUTO_START: 5,
    USER_JOIN: 6,
    USER_LEAVE: 7,
    UPDATE_MATCH: 8,
    TAKE_TURN: 9,
    CHANGE_TURN: 10
};

CoCaro.GameLogic.MAX_PLAYER = 2;