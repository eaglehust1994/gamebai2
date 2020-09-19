/**
 * Created by vinplay on 2/4/17.
 */

CoCaro = {};

CoCaro.res = {
    x: "res/GameCo/Caro/x.png",
    o: "res/GameCo/Caro/o.png",
    afterTime: "res/common/afterTime.png",
    startNumPngPath: "res/common/boSo/start_"
};

CoCaro.sound = {
    start: "res/Sound/vs.mp3",
    win: "res/Sound/win.mp3",
    lose: "res/Sound/lose.mp3",
    draw: "res/Sound/draw.mp3",
    tictoc: "res/Sound/tictoc.mp3",
    mark: "res/Sound/mark.mp3"
};

CoCaro.fixPos = {
    minx: 335,
    maxx: 955,
    miny: 45,
    maxy: 665
};

CoCaro.Result = {
    WIN_LOSE: 0,
    DRAW: 1
};

CoCaro.halfTileSize = 620 / 30;
CoCaro.tileSize = 620 / 15;
CoCaro.boardSize = 15;