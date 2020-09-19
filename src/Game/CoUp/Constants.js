/**
 * Created by vinplay on 2/4/17.
 */

CoUp = {};

CoUp.Result = {
    WIN_LOSE: 0,
    DRAW: 1,
    TIME_OUT: 6,
    RESIGN: 7
};

CoUp.res = {
    afterTime: "res/common/afterTime.png",
    startNumPngPath: "res/common/boSo/start_"
};

CoUp.sound = {
    start: "res/Sound/vs.mp3",
    win: "res/Sound/win.mp3",
    lose: "res/Sound/lose.mp3",
    draw: "res/Sound/draw.mp3",
    tictoc: "res/Sound/tictoc.mp3",
    pickup: "res/Sound/pickup.mp3",
    place: "res/Sound/place.mp3",
    bg: "res/Sound/cotuong_background.mp3",
    chieutuong: "res/Sound/chieutuong.mp3",
    killPiece: "res/Sound/killPiece.mp3"
};

CoUp.Palace = {
    minx1: 0,
    maxx1: 2,
    miny: 3,
    maxy: 5,
    minx2: 7,
    maxx2: 9
};

CoUp.normalVector = {
    x: [-1, 0, 1, 0],
    y: [0, -1, 0, 1]
};

CoUp.crossVector = {
    x: [-1, 1, 1, -1],
    y: [-1, -1, 1, 1]
};

CoUp.doubleCrossVector = {
    x: [-2, 2, 2, -2],
    y: [-2, -2, 2, 2]
};

CoUp.horseVector = {
    x: [-1, -2, -2, -1, 1, 2, 2, 1],
    y: [-2, -1, 1, 2, 2, 1, -1, -2],
    px: [0, -1, -1, 0, 0, 1, 1, 0],
    py: [-1, 0, 0, 1, 1, 0, 0, -1]
};

CoUp.soldierVector = {
    x: [1, 0, 0],
    y: [0, -1, 1]
};

CoUp.soldierVectorEnemy = {
    x: [-1, 0, 0],
    y: [0, -1, 1]
};

CoUp.river = 4;

CoUp.Tile = {
    BLANK: 0,
    GENERAL: 1,
    GUARD: 2,
    ELEPHANT: 3,
    CHARIOT: 4,
    HORSE: 5,
    CANNON: 6,
    SOLDIER: 7
};

CoUp.ID = {
    BLACK: 0,
    RED: 1
};

CoUp.BoardCol = 9;
CoUp.BoardRow = 10;

var pieces = [];
pieces.push(["bx0", 0, 0]);
pieces.push(["bm0", 0, 1]);
pieces.push(["bt0", 0, 2]);
pieces.push(["bs0", 0, 3]);
pieces.push(["bg0", 0, 4]);
pieces.push(["bs1", 0, 5]);
pieces.push(["bt1", 0, 6]);
pieces.push(["bm1", 0, 7]);
pieces.push(["bx1", 0, 8]);
pieces.push(["bp0", 2, 1]);
pieces.push(["bp1", 2, 7]);
pieces.push(["bz0", 3, 0]);
pieces.push(["bz1", 3, 2]);
pieces.push(["bz2", 3, 4]);
pieces.push(["bz3", 3, 6]);
pieces.push(["bz4", 3, 8]);

pieces.push(["rx0", 9, 0]);
pieces.push(["rm0", 9, 1]);
pieces.push(["rt0", 9, 2]);
pieces.push(["rs0", 9, 3]);
pieces.push(["rg0", 9, 4]);
pieces.push(["rs1", 9, 5]);
pieces.push(["rt1", 9, 6]);
pieces.push(["rm1", 9, 7]);
pieces.push(["rx1", 9, 8]);
pieces.push(["rp0", 7, 1]);
pieces.push(["rp1", 7, 7]);
pieces.push(["rz0", 6, 0]);
pieces.push(["rz1", 6, 2]);
pieces.push(["rz2", 6, 4]);
pieces.push(["rz3", 6, 6]);
pieces.push(["rz4", 6, 8]);

CoUp.startPiece = pieces;

var pieceReverse = [];
pieceReverse.push(["rx1", 0, 0]);
pieceReverse.push(["rm1", 0, 1]);
pieceReverse.push(["rt1", 0, 2]);
pieceReverse.push(["rs1", 0, 3]);
pieceReverse.push(["rg0", 0, 4]);
pieceReverse.push(["rs0", 0, 5]);
pieceReverse.push(["rt0", 0, 6]);
pieceReverse.push(["rm0", 0, 7]);
pieceReverse.push(["rx0", 0, 8]);
pieceReverse.push(["rp1", 2, 1]);
pieceReverse.push(["rp0", 2, 7]);
pieceReverse.push(["rz4", 3, 0]);
pieceReverse.push(["rz3", 3, 2]);
pieceReverse.push(["rz2", 3, 4]);
pieceReverse.push(["rz1", 3, 6]);
pieceReverse.push(["rz0", 3, 8]);

pieceReverse.push(["bx1", 9, 0]);
pieceReverse.push(["bm1", 9, 1]);
pieceReverse.push(["bt1", 9, 2]);
pieceReverse.push(["bs1", 9, 3]);
pieceReverse.push(["bg0", 9, 4]);
pieceReverse.push(["bs0", 9, 5]);
pieceReverse.push(["bt0", 9, 6]);
pieceReverse.push(["bm0", 9, 7]);
pieceReverse.push(["bx0", 9, 8]);
pieceReverse.push(["bp1", 7, 1]);
pieceReverse.push(["bp0", 7, 7]);
pieceReverse.push(["bz4", 6, 0]);
pieceReverse.push(["bz3", 6, 2]);
pieceReverse.push(["bz2", 6, 4]);
pieceReverse.push(["bz1", 6, 6]);
pieceReverse.push(["bz0", 6, 8]);

CoUp.startPieceReverse = pieceReverse;

CoUp.tileWidth = 559 / 8;
CoUp.tileHeight = 627 / 9;

CoUp.getPosInMap = function(x, y) {
    return cc.p(CoUp.tileWidth * y, CoUp.tileHeight * x);
};

CoUp.convertPointToPos = function(point) {
    return {x: parseInt(Math.ceil(point.y / CoUp.tileWidth - 1/2)), y: parseInt(Math.ceil(point.x / CoUp.tileHeight - 1/2))};
};
