var TaiXiuNetWork = {} ;
TaiXiuNetWork.onReceived = function(cmdId, pkg){
    if(taiXiu)
    {
        switch (cmdId) {
            case TAI_XIU_INFO:
                //onProcessInFo(pkg);
                var cmd = new CmdTaiXiuInfo(pkg);
                cc.log(cmd.gameId);
                taiXiu.responseTaiXiuInfo(cmd.gameId,cmd.moneyType,cmd.referenceId, cmd.remainTime, cmd.bettingState,cmd.potTai,cmd.potXiu,cmd.betTai,cmd.betXiu);
                break;
            case UPDATE_TAI_XIU_PER_SECOND:
                var cmd = new CmdUpdateTaiXiu(pkg);
                cc.log(cmd.remainTime+" bettingState" + cmd.bettingState );
                taiXiu.responseUpdateTaiXiu(cmd.remainTime,cmd.bettingState,cmd.potTai,cmd.potXiu,cmd.numBetTai,cmd.numBetXiu);
                break;


            case UPDATE_RESULT_DICES:
                var cmd = new CmdUpdateResultDices(pkg);
                taiXiu.responseTaiXiu(cmd.result,cmd.dice1,cmd.dice2,cmd.dice3);
                break;
            case UPDATE_PRIZE_TAI_XIU:
                var cmd = new CmdUpdatePrizeTaiXiu(pkg);
                cc.log(cmd.remainTime+"referenceId" + cmd.referenceId );
                taiXiu.responsePrizeTaiXiu(cmd.moneyType,cmd.totalMoney);
                break;
            case  BET_TAI_XIU:
                var cmd = new CmdBetTaiXiu(pkg);
                taiXiu.responseBetTaiXiuSuccess(cmd.result);
                break;
            case  START_NEW_GAME_TAI_XIU:
                var cmd = new CmdStartNewGameTaiXiu(pkg);
                taiXiu.responseStartNewGameTaiXiu(cmd.referenceId);
                break;
            case LICH_SU_PHIEN_TAI_XIU:
                var cmd = new CmdLichSuTaiXiu(pkg);
                taiXiu.responseLichSuPhien(cmd.data);
                break;
        }
    }

}


var CmdReceiveTest = CmdReceivedCommon.extend({
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.value = this.getString();
        }

    }
);
function onProcessInFo(pkg){
    var cmd = new CmdTaiXiuInfo(pkg);
    cc.log(cmd.gameId);
}


function subScribeTaiXiu(gameType, room)
{
    var taiXiuSend = new CmdSendScribe();
    taiXiuSend.putSubScribe(gameType,room);
    Minigame.miniGameClient.send(taiXiuSend);
    taiXiuSend.clean();

}