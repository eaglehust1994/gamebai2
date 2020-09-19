/**
 * Created by Admin on 8/24/2016.
 */
var CmdSendScribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(MN_SUBSCRIBE);

        },
        putSubScribe:function(typeGame, room){
            this.packHeader();
            this.putShort(typeGame);
            this.putShort(room);
            this.updateSize();
        }
    }
);

var CmdSendUnscribe = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(MN_UNSUBSCRIBE);

        },
        putUnsubScribe:function(gameId, roomId){
            this.packHeader();
            this.putShort(gameId);
            this.putShort(roomId);
            this.updateSize();
        }
    }
);

var CmdSendChangeRoom = CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(MN_CHANGE_ROOM);

        },
        putChangeRoom:function(gameId, lastRoomId,newRoomId){
            this.packHeader();
            this.putShort(gameId);
            this.putShort(lastRoomId);
            this.putShort(newRoomId);
            this.updateSize();
        }
    }
);

var CmdReceivedKickUser = CmdReceivedCommon.extend({
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.error = this.getError();
        }
    }
);
