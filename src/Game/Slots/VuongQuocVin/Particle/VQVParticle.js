/**
 * Created by Admin on 4/4/2017.
 */
var vqv = {};

createParticleLua = function(numberOfParticles)
{
    var particleLua = new cc.ParticleSystem();
    particleLua.initWithTotalParticles(numberOfParticles);
    particleLua.setDuration(cc.ParticleSystem.DURATION_INFINITY);

    // Gravity Mode
    particleLua.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


    // Gravity Mode: gravity
    particleLua.setGravity(cc.p(0, 606));

    // Gravity Mode: speed of particles
    particleLua.setSpeed(94);
    particleLua.setSpeedVar(10);

    // Gravity Mode: radial
    particleLua.setRadialAccel(-800);
    particleLua.setRadialAccelVar(600);

    // Gravity Mode: tangential
    particleLua.setTangentialAccel(-20);
    particleLua.setTangentialAccelVar(0);

    // angle
    particleLua.setAngle(90);
    particleLua.setAngleVar(0);

    // emitter position
    var winSize = cc.director.getWinSize();
    particleLua.setPosition(winSize.width / 2, winSize.height / 2);
    particleLua.setPosVar(cc.p(5,0));

    // life of particles
    particleLua.setLife(0.8);
    particleLua.setLifeVar(0.3);

    // size, in pixels
    particleLua.setStartSize(110);
    particleLua.setStartSizeVar(40.0);
    particleLua.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

    // emits per second
    particleLua.setEmissionRate(particleLua.getTotalParticles() / particleLua.getLife());

    particleLua.setStartColor(cc.color(255,54,20,255));
    particleLua.setStartColorVar(cc.color(0,0,0,255));
    particleLua.setEndColor(cc.color(0,0,0,255));
    particleLua.setEndColorVar(cc.color(0,0,0,255));

    // additive
    particleLua.setBlendAdditive(true);
    particleLua.texture = cc.textureCache.addImage("res/VuongQuocVin/particle_texture.png");

    return particleLua;
}

createParticleBigWin = function(numberOfParticles)
{
    var particleBigWin = new cc.ParticleSystem();

    particleBigWin.initWithTotalParticles(numberOfParticles);

    particleBigWin.setDuration(cc.ParticleSystem.DURATION_INFINITY);

    // Gravity Mode
    particleBigWin.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


    // Gravity Mode: gravity
    particleBigWin.setGravity(cc.p(0, -720));

    // Gravity Mode: speed of particles
    particleBigWin.setSpeed(379);
    particleBigWin.setSpeedVar(360);

    // Gravity Mode: radial
    particleBigWin.setRadialAccel(0);
    particleBigWin.setRadialAccelVar(0);

    // Gravity Mode: tangential
    particleBigWin.setTangentialAccel(0);
    particleBigWin.setTangentialAccelVar(0);

    // angle
    particleBigWin.setAngle(90);
    particleBigWin.setAngleVar(-90);

    // emitter position
    var winSize = cc.director.getWinSize();
    particleBigWin.setPosition(winSize.width / 2, winSize.height / 2);
    particleBigWin.setPosVar(cc.p(0,0));

    // life of particles
    particleBigWin.setLife(1.6);
    particleBigWin.setLifeVar(0.2);

    // size, in pixels
    particleBigWin.setStartSize(30);
    particleBigWin.setStartSizeVar(50);
    particleBigWin.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
    //this.setStartSpin(720);
    //this.setStartSpinVar(0);
    //
    //this.setEndSpin(-1124);
    //this.setEndSpinVar(0);


    // emits per second
    particleBigWin.setEmissionRate(particleBigWin.getTotalParticles() / particleBigWin.getLife());

    // color of particles
    particleBigWin.setStartColor(cc.color(255, 255, 51, 255));
    particleBigWin.setStartColorVar(cc.color(51, 51, 51, 255));
    particleBigWin.setEndColor(cc.color(255, 255, 51, 255));
    particleBigWin.setEndColorVar(cc.color(0, 0, 0, 255));

    // additive
    particleBigWin.setBlendAdditive(true);

    return particleBigWin;

}

createParticleWinNol = function(numberOfParticles)
{
    var particleWinNol = new cc.ParticleSystem();

    particleWinNol.initWithTotalParticles(numberOfParticles);

    particleWinNol.setDuration(1);

    // Gravity Mode
    particleWinNol.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


    // Gravity Mode: gravity
    particleWinNol.setGravity(cc.p(0, -480));

    // Gravity Mode: radial acceleration
    particleWinNol.setRadialAccel(0);
    particleWinNol.setRadialAccelVar(0);

    // Gravity Mode: tangential
    particleWinNol.setTangentialAccel(0);
    particleWinNol.setTangentialAccelVar(0);

    // Gravity Mode: speed of particles
    particleWinNol.setSpeed(520);
    particleWinNol.setSpeedVar(172);

    // starting angle
    particleWinNol.setAngle(90);
    particleWinNol.setAngleVar(60);

    // emitter position
    var winSize = cc.director.getWinSize();
    particleWinNol.setPosition(winSize.width / 2, 60);
    particleWinNol.setPosVar(cc.p(0, 0));

    // life of particles
    particleWinNol.setLife(0.5);
    particleWinNol.setLifeVar(1);


    // size, in pixels
    particleWinNol.setStartSize(30);
    particleWinNol.setStartSizeVar(50);
    particleWinNol.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

    // life of particles
    particleWinNol.setLife(1.6);
    particleWinNol.setLifeVar(0.2);
    // emits per frame
    particleWinNol.setEmissionRate(particleWinNol.getTotalParticles() / particleWinNol.getLife());

    // color of particles
    particleWinNol.setStartColor(cc.color(255, 255,51, 255));
    particleWinNol.setStartColorVar(cc.color(51, 51, 51, 255));
    particleWinNol.setEndColor(cc.color(255, 255, 51, 255));
    particleWinNol.setEndColorVar(cc.color(51, 51, 51, 255));

    // additive
    particleWinNol.setBlendAdditive(true);
    particleWinNol.texture = cc.textureCache.addImage("res/VuongQuocVin/vin gold_0.png");
    return particleWinNol;
}


//vqv.ParticleLua = cc.Class.extend;
//vqv.ParticleBigWin = cc.Class.extend;
cc.ParticleSystem.extend = cc.Node.extend;

vqv.ParticleLua = cc.ParticleSystem.extend({
    /**
     * <p>The cc.ParticleFlower's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFlower()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor : function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 250 : 100);
    },

    /**
     * initialize a flower particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(cc.ParticleSystem.DURATION_INFINITY);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, 606));

            // Gravity Mode: speed of particles
            this.setSpeed(94);
            this.setSpeedVar(10);

            // Gravity Mode: radial
            this.setRadialAccel(-800);
            this.setRadialAccelVar(600);

            // Gravity Mode: tangential
            this.setTangentialAccel(-20);
            this.setTangentialAccelVar(0);

            // angle
            this.setAngle(90);
            this.setAngleVar(0);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setPosVar(cc.p(5,0));

            // life of particles
            this.setLife(0.8);
            this.setLifeVar(0.3);

            // size, in pixels
            this.setStartSize(110);
            this.setStartSizeVar(40.0);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

            // emits per second
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            this.setStartColor(cc.color(255,54,20,255));
            this.setStartColorVar(cc.color(0,0,0,255));
            this.setEndColor(cc.color(0,0,0,255));
            this.setEndColorVar(cc.color(0,0,0,255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});

vqv.ParticleLua.create = function () {
    return new vqv.ParticleLua();
};

vqv.ParticleBigWin = cc.ParticleSystem.extend(/** @lends cc.ParticleFlower# */{
    /**
     * <p>The cc.ParticleFlower's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFlower()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor : function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 250 : 100);
    },

    /**
     * initialize a flower particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(cc.ParticleSystem.DURATION_INFINITY);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, -720));

            // Gravity Mode: speed of particles
            this.setSpeed(379);
            this.setSpeedVar(360);

            // Gravity Mode: radial
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: tangential
            this.setTangentialAccel(0);
            this.setTangentialAccelVar(0);

            // angle
            this.setAngle(90);
            this.setAngleVar(-90);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setPosVar(cc.p(0,0));

            // life of particles
            this.setLife(1.6);
            this.setLifeVar(0.2);

            // size, in pixels
            this.setStartSize(30);
            this.setStartSizeVar(50);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
            //this.setStartSpin(720);
            //this.setStartSpinVar(0);
            //
            //this.setEndSpin(-1124);
            //this.setEndSpinVar(0);


            // emits per second
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.color(255, 255, 51, 255));
            this.setStartColorVar(cc.color(51, 51, 51, 255));
            this.setEndColor(cc.color(255, 255, 51, 255));
            this.setEndColorVar(cc.color(0, 0, 0, 255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});
vqv.ParticleBigWin.create = function () {
    return new vqv.ParticleBigWin();
};

vqv.ParticleWinNol = cc.ParticleSystem.extend(/** @lends cc.ParticleFire# */{
    /**
     * <p>The cc.ParticleFire's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFire()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor:function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 300 : 150);
    },

    /**
     * initialize a fire particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(1);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, -480));

            // Gravity Mode: radial acceleration
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: tangential
            this.setTangentialAccel(0);
            this.setTangentialAccelVar(0);

            // Gravity Mode: speed of particles
            this.setSpeed(520);
            this.setSpeedVar(172);

            // starting angle
            this.setAngle(90);
            this.setAngleVar(60);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, 60);
            this.setPosVar(cc.p(0, 0));

            // life of particles
            this.setLife(0.5);
            this.setLifeVar(1);


            // size, in pixels
            this.setStartSize(30);
            this.setStartSizeVar(50);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

            // life of particles
            this.setLife(1.6);
            this.setLifeVar(0.2);
            // emits per frame
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.color(255, 255,51, 255));
            this.setStartColorVar(cc.color(51, 51, 51, 255));
            this.setEndColor(cc.color(255, 255, 51, 255));
            this.setEndColorVar(cc.color(51, 51, 51, 255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});

/**
 * Create a fire particle system
 * @deprecated since v3.0 please use new cc.ParticleFire() instead
 * @return {cc.ParticleFire}
 */
vqv.ParticleWinNol.create = function () {
    return new vqv.ParticleWinNol();
};
