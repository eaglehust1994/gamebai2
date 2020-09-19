/**
 * Created by Admin on 8/19/2016.
 */
/// START VQMM
var CmdSendVQMM= CmdSendCommon.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(1);
            this.setCmdId(START_NEW_VQMM);

        },
        putStartVQMM:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);

var CmdStartVQMM = CmdReceivedCommon.extend(
    {
        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.error = this.getError();
            this.prizeVin = this.getString();
            this.prizeXu = this.getString();
            this.prizeSlot = this.getString();
            this.remainCount = this.getShort();
            this.currentMoneyVin = this.getLong();
            this.currentMoneyXu = this.getLong();
        }
    }
);