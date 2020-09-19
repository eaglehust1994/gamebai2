var ThongTinGiaiDauItem = cc.Class.extend({
    ctor: function(pk){
        this.gioiThieu = pk.gioiThieu;
        this.nPersion = this.nPerson;
        this.curNPerson = pk.curNPerson;
        this.theLe = pk.TheLe;
        this.cost = pk.cost;
        this.time = pk.time;
        this.trangThai = pk.trangThai;
        this.time = pk.time;
    }
});

