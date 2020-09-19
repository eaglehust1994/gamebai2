Sam.Player = cc.Class.extend({
    ctor: function()
    {
        this.ingame= false;
        this.active = true;
        this.chairInServer= -1;
        this.chairLocal= -1;
        this.type= 1;
        this.cards= [];
        this.state= 0;
        this.status= -1;
        this.info= null;
    }
})


Sam.Player.STATENONE = 0;
Sam.Player.STATEVIEWING = 1;
Sam.Player.STATEBAOSAM = 2;