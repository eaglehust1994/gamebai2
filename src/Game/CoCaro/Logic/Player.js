/**
 * Created by vinplay on 2/9/17.
 */

CoCaro.Player = cc.Class.extend({
    ctor: function()
    {
        this.ingame= false;
        this.active = true;
        this.chairInServer= -1;
        this.chairLocal= -1;
        this.type= 1;
        this.state= 0;
        this.status= -1;
        // user info
        this.info= null;
    }
});