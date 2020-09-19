TienLen.Player = cc.Class.extend({
    ctor: function()
    {
        this.ingame= false;
        this.active = true;
        this.chairInServer= -1;
        this.chairLocal= -1;
        this.type= 1;
        this.cards= [];                 // for my
        this.state= 0;
        this.status= -1;
        // user info
        this.info= null;
    }
})

TienLen.Player.MY = 0;
TienLen.Player.ENEMY = 1;

TienLen.Player.STATENONE = 0;
TienLen.Player.STATEVIEWING = 1;
TienLen.Player.STATEBAOSAM = 2;
//TienLen.Player.STATE