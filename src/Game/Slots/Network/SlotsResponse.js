/**
 * Created by Admin on 3/14/2017.
 */
var SlotsResponseUpdatePots = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){

            this.pots = this.getString();
        }

    }
);

var SlotsResponseUpdateResultHall = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){

            this.result = this.getByte();
            this.prize = this.getLong();
            this.currentMoney = this.getLong();
        }

    }
);

var SlotsResponseUpdateInfoHall = CmdReceivedCommon.extend(
    {

        ctor: function(pkg) {
            this._super(pkg);
            this.readData();
        },
        readData: function(){
            this.autoKhoBau = this.getBool();
            this.autoNDV = this.getBool();
            this.autoSieuAnhHung = this.getBool();
            this.autoVuongQuocVin = this.getBool();

        }

    }
);