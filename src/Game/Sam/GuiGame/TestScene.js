//
cc.ActionInterval.extend = cc.Class.extend;
cc.ProgressFromTo.extend = cc.Class.extend;
var MyProgressFromTo = cc.ProgressFromTo.extend({
    ctor: function(duration, from, to, dataRun){
        cc.ProgressFromTo.prototype.ctor.call(this);

        this._to = 0;
        this._from = 0;
        this.dataRun = dataRun;
        this.control = true;
        to !== undefined && this.initWithDuration(duration, from, to);
    },

    update: function(time){
        //var nen = true;
        if (this.target  instanceof cc.ProgressTimer) {
            this.target.percentage = this._from + (this._to - this._from) * time;

            if (time <= 0.5)
            {
                this.target._sprite.setColor({r:Math.floor(time * 510),g:255,b:0});
            }
            else
            {
                this.target._sprite.setColor({r:255,g:Math.floor(255 - (time - 0.5) * 510),b:0});
            }
        }
    }
});

var MyMoveBy = cc.ActionInterval.extend({
    ctor:function (duration, delTa) {
        cc.ActionInterval.prototype.ctor.call(this);

        this._positionDelta = cc.p(0, 0);
        this._startPosition = cc.p(0, 0);
        this._previousPosition = cc.p(0, 0);

        delTa !== undefined && this.initWithDuration(duration, delTa);
    },

    initWithDuration:function (duration, position) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this._positionDelta.x = position.x;
            this._positionDelta.y = position.y;
            return true;
        }
        return false;
    },


    initWithDuration:function (duration, position, y) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            if(position.x !== undefined) {
                y = position.y;
                position = position.x;
            }

            this._positionDelta.x = position;
            this._positionDelta.y = y;
            return true;
        }
        return false;
    },

    startWithTarget:function (target) {

        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        var locPosX = target.getPositionX();
        var locPosY = target.getPositionY();
        this._previousPosition.x = locPosX;
        this._previousPosition.y = locPosY;
        this._startPosition.x = locPosX;
        this._startPosition.y = locPosY;
    },

    update:function (dt) {
        //dt = this._computeEaseTime(dt);

        if (this.target) {
            var x = this._positionDelta.x * dt;
            var y = this._positionDelta.y * dt;
            var locStartPosition = this._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                var targetX = this.target.getPositionX();
                var targetY = this.target.getPositionY();
                var locPreviousPosition = this._previousPosition;

                locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
                locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
                x = x + locStartPosition.x;
                y = y + locStartPosition.y;
                locPreviousPosition.x = x;
                locPreviousPosition.y = y;
                this.target.setPosition(x, y);
            } else {
                this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
            }
        }
    }
});

cc.ActionInterval.extend = cc.Class.extend;
var MyMoveCircle = cc.ActionInterval.extend({
    ctor:function (duration, rSize, point, from) {
        cc.ActionInterval.prototype.ctor.call(this);

        //this._positionDelta = cc.p(0, 0);
        this._startPosition = cc.p(0, 0);
        this._previousPosition = cc.p(0, 0);
        this.center = point;
        point !== undefined && this.initWithDuration(duration, rSize, point, from);
    },

    initWithDuration:function (duration, rSize, point, from) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this.center.x = point.x;
            this.center.y = point.y;
            this.rSize = rSize;
            this.from = from;
            return true;
        }
        return false;
    },

    startWithTarget:function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this._startPosition.x = this.center.x +  Math.sin(360*(this.from))*this.rSize;
        this._startPosition.y = this.center.y +  Math.cos(360*(this.from))*this.rSize;
    },

    update:function (dt) {
        //dt = this._computeEaseTime(dt);

        if (this.target) {

            var x =  this.center.x +  Math.sin(2*Math.PI * dt)* this.rSize;
            var y =  this.center.y + Math.cos(2*Math.PI * dt)* this.rSize;


            //var x =  this.center.x ;
            //var y =  this.center.y;
            this.target.setPosition(x, y);
        }
    }
});



var TestScene = BaseLayer.extend({
    ctor: function(){
        this._super("TestScene");
        this.initWithBinaryFile("res/g_res_cardGame_json_TestLobby.json");
    },

    customizeGUI: function(){
        this.btnJoinRoom = this.customizeButton("btnJoinRoom", 1);
    },

    onButtonRelease: function(btn, id){
        if(id == 1){
            //var baCay = new BaCay.BaCayScene();
            //SceneMgr.getInstance().getRunningScene().replaceGameGui(baCay);
            //this.setVisible(false);
            GameManager.getInstance().openGame(parseInt(mapTagToGameType["" + 4]));
        }
    }
});