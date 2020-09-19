
ParticleVinplay = cc.Node.extend(/** @lends ParticleVinplay# */{
    _className:"ParticleSystem",
    //***********variables*************
    _plistFile: "",
    //! time elapsed since the start of the system (in seconds)
    _elapsed: 0,
    _dontTint: false,

    // Different modes
    //! Mode A:Gravity + Tangential Accel + Radial Accel
    modeA: null,
    //! Mode B: circular movement (gravity, radial accel and tangential accel don't are not used in this mode)
    modeB: null,

    //private POINTZERO for ParticleSystem
    _pointZeroForParticle: cc.p(0, 0),

    //! Array of particles
    _particles: null,

    // color modulate
    //  BOOL colorModulate;

    //! How many particles can be emitted per second
    _emitCounter: 0,
    //!  particle idx
    _particleIdx: 0,

    _batchNode: null,
    atlasIndex: 0,

    //true if scaled or rotated
    _transformSystemDirty: false,
    _allocatedParticles: 0,

    _isActive: false,
    particleCount: 0,
    duration: 0,
    _sourcePosition: null,
    _posVar: null,
    life: 0,
    lifeVar: 0,
    angle: 0,
    angleVar: 0,
    startSize: 0,
    startSizeVar: 0,
    endSize: 0,
    endSizeVar: 0,
    _startColor: null,
    _startColorVar: null,
    _endColor: null,
    _endColorVar: null,
    startSpin: 0,
    startSpinVar: 0,
    endSpin: 0,
    endSpinVar: 0,
    emissionRate: 0,
    _totalParticles: 0,
    _texture: null,
    _blendFunc: null,
    _opacityModifyRGB: false,
    positionType: null,
    autoRemoveOnFinish: false,
    emitterMode: 0,

    _textureLoaded: null,

    /**
     * <p> return the string found by key in dict. <br/>
     *    This plist files can be create manually or with Particle Designer:<br/>
     *    http://particledesigner.71squared.com/<br/>
     * </p>
     * Constructor of ParticleVinplay
     * @param {String|Number} plistFile
     */
    ctor:function (plistFile) {
        cc.Node.prototype.ctor.call(this);
        this.emitterMode = ParticleVinplay.MODE_GRAVITY;
        this.modeA = new ParticleVinplay.ModeA();
        this.modeB = new ParticleVinplay.ModeB();
        this._blendFunc = {src:cc.BLEND_SRC, dst:cc.BLEND_DST};

        this._particles = [];
        this._sourcePosition = cc.p(0, 0);
        this._posVar = cc.p(0, 0);

        this._startColor = cc.color(255, 255, 255, 255);
        this._startColorVar = cc.color(255, 255, 255, 255);
        this._endColor = cc.color(255, 255, 255, 255);
        this._endColorVar = cc.color(255, 255, 255, 255);

        this._plistFile = "";
        this._elapsed = 0;
        this._dontTint = false;
        this._pointZeroForParticle = cc.p(0, 0);
        this._emitCounter = 0;
        this._particleIdx = 0;
        this._batchNode = null;
        this.atlasIndex = 0;

        this._transformSystemDirty = false;
        this._allocatedParticles = 0;
        this._isActive = false;
        this.particleCount = 0;
        this.duration = 0;
        this.life = 0;
        this.lifeVar = 0;
        this.angle = 0;
        this.angleVar = 0;
        this.startSize = 0;
        this.startSizeVar = 0;
        this.endSize = 0;
        this.endSizeVar = 0;

        this.startSpin = 0;
        this.startSpinVar = 0;
        this.endSpin = 0;
        this.endSpinVar = 0;
        this.emissionRate = 0;
        this._totalParticles = 0;
        this._texture = null;
        this._opacityModifyRGB = false;
        this.positionType = ParticleVinplay.TYPE_FREE;
        this.autoRemoveOnFinish = false;

        this._textureLoaded = true;

        if (!plistFile || cc.isNumber(plistFile)) {
            var ton = plistFile || 100;
            this.setDrawMode(ParticleVinplay.TEXTURE_MODE);
            this.initWithTotalParticles(ton);
        } else if (cc.isString(plistFile)) {
            this.initWithFile(plistFile);
        } else if (cc.isObject(plistFile)) {
            this.initWithDictionary(plistFile, "");
        }
    },

    _createRenderCmd: function(){
        if(cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new ParticleVinplay.CanvasRenderCmd(this);
        else
            return new ParticleVinplay.WebGLRenderCmd(this);
    },

    /**
     * This is a hack function for performance, it's only available on Canvas mode. <br/>
     * It's very expensive to change color on Canvas mode, so if set it to true, particle system will ignore the changing color operation.
     * @param {boolean} ignore
     */
    ignoreColor: function(ignore){
        this._dontTint = ignore;
    },

    /**
     * <p> initializes the texture with a rectangle measured Points<br/>
     * pointRect should be in Texture coordinates, not pixel coordinates
     * </p>
     * @param {cc.Rect} pointRect
     */
    initTexCoordsWithRect:function (pointRect) {
        this._renderCmd.initTexCoordsWithRect(pointRect);
    },

    /**
     * return weak reference to the cc.SpriteBatchNode that renders the cc.Sprite
     * @return {cc.ParticleBatchNode}
     */
    getBatchNode:function () {
        return this._batchNode;
    },

    /**
     *  set weak reference to the cc.SpriteBatchNode that renders the cc.Sprite
     * @param {cc.ParticleBatchNode} batchNode
     */
    setBatchNode:function (batchNode) {
        this._renderCmd.setBatchNode(batchNode);
    },

    /**
     * return index of system in batch node array
     * @return {Number}
     */
    getAtlasIndex:function () {
        return this.atlasIndex;
    },

    /**
     * set index of system in batch node array
     * @param {Number} atlasIndex
     */
    setAtlasIndex:function (atlasIndex) {
        this.atlasIndex = atlasIndex;
    },

    /**
     * Return DrawMode of ParticleSystem   (Canvas Mode only)
     * @return {Number}
     */
    getDrawMode:function () {
        return this._renderCmd.getDrawMode();
    },

    /**
     * DrawMode of ParticleSystem setter   (Canvas Mode only)
     * @param {Number} drawMode
     */
    //setDrawMode:function (drawMode) {
    //    this._renderCmd.setDrawMode(drawMode);
    //},

    /**
     * Return ShapeType of ParticleSystem  (Canvas Mode only)
     * @return {Number}
     */
    getShapeType:function () {
        return this._renderCmd.getShapeType();
    },

    /**
     * ShapeType of ParticleSystem setter  (Canvas Mode only)
     * @param {Number} shapeType
     */
    setShapeType:function (shapeType) {
        this._renderCmd.setShapeType(shapeType);
    },

    /**
     * Return ParticleSystem is active
     * @return {Boolean}
     */
    isActive:function () {
        return this._isActive;
    },

    /**
     * Quantity of particles that are being simulated at the moment
     * @return {Number}
     */
    getParticleCount:function () {
        return this.particleCount;
    },

    /**
     * Quantity of particles setter
     * @param {Number} particleCount
     */
    setParticleCount:function (particleCount) {
        this.particleCount = particleCount;
    },

    /**
     * How many seconds the emitter wil run. -1 means 'forever'
     * @return {Number}
     */
    getDuration:function () {
        return this.duration;
    },

    /**
     * set run seconds of the emitter
     * @param {Number} duration
     */
    setDuration:function (duration) {
        this.duration = duration;
    },

    /**
     * Return sourcePosition of the emitter
     * @return {cc.Point | Object}
     */
    getSourcePosition:function () {
        return {x: this._sourcePosition.x, y: this._sourcePosition.y};
    },

    /**
     * sourcePosition of the emitter setter
     * @param sourcePosition
     */
    setSourcePosition:function (sourcePosition) {
        this._sourcePosition = sourcePosition;
    },

    /**
     * Return Position variance of the emitter
     * @return {cc.Point | Object}
     */
    getPosVar:function () {
        return {x: this._posVar.x, y: this._posVar.y};
    },

    /**
     * Position variance of the emitter setter
     * @param {cc.Point} posVar
     */
    setPosVar:function (posVar) {
        this._posVar = posVar;
    },

    /**
     * Return life of each particle
     * @return {Number}
     */
    getLife:function () {
        return this.life;
    },

    /**
     * life of each particle setter
     * @param {Number} life
     */
    setLife:function (life) {
        this.life = life;
    },

    /**
     * Return life variance of each particle
     * @return {Number}
     */
    getLifeVar:function () {
        return this.lifeVar;
    },

    /**
     * life variance of each particle setter
     * @param {Number} lifeVar
     */
    setLifeVar:function (lifeVar) {
        this.lifeVar = lifeVar;
    },

    /**
     * Return angle of each particle
     * @return {Number}
     */
    getAngle:function () {
        return this.angle;
    },

    /**
     * angle of each particle setter
     * @param {Number} angle
     */
    setAngle:function (angle) {
        this.angle = angle;
    },

    /**
     * Return angle variance of each particle
     * @return {Number}
     */
    getAngleVar:function () {
        return this.angleVar;
    },

    /**
     * angle variance of each particle setter
     * @param angleVar
     */
    setAngleVar:function (angleVar) {
        this.angleVar = angleVar;
    },

    // mode A
    /**
     * Return Gravity of emitter
     * @return {cc.Point}
     */
    getGravity:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getGravity() : Particle Mode should be Gravity");
        var locGravity = this.modeA.gravity;
        return cc.p(locGravity.x, locGravity.y);
    },

    /**
     * Gravity of emitter setter
     * @param {cc.Point} gravity
     */
    setGravity:function (gravity) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setGravity() : Particle Mode should be Gravity");
        this.modeA.gravity = gravity;
    },

    /**
     * Return Speed of each particle
     * @return {Number}
     */
    getSpeed:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getSpeed() : Particle Mode should be Gravity");
        return this.modeA.speed;
    },

    /**
     * Speed of each particle setter
     * @param {Number} speed
     */
    setSpeed:function (speed) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setSpeed() : Particle Mode should be Gravity");
        this.modeA.speed = speed;
    },

    /**
     * return speed variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getSpeedVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getSpeedVar() : Particle Mode should be Gravity");
        return this.modeA.speedVar;
    },

    /**
     * speed variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} speedVar
     */
    setSpeedVar:function (speedVar) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setSpeedVar() : Particle Mode should be Gravity");
        this.modeA.speedVar = speedVar;
    },

    /**
     * Return tangential acceleration of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getTangentialAccel:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getTangentialAccel() : Particle Mode should be Gravity");
        return this.modeA.tangentialAccel;
    },

    /**
     * Tangential acceleration of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} tangentialAccel
     */
    setTangentialAccel:function (tangentialAccel) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setTangentialAccel() : Particle Mode should be Gravity");
        this.modeA.tangentialAccel = tangentialAccel;
    },

    /**
     * Return tangential acceleration variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getTangentialAccelVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getTangentialAccelVar() : Particle Mode should be Gravity");
        return this.modeA.tangentialAccelVar;
    },

    /**
     * tangential acceleration variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} tangentialAccelVar
     */
    setTangentialAccelVar:function (tangentialAccelVar) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setTangentialAccelVar() : Particle Mode should be Gravity");
        this.modeA.tangentialAccelVar = tangentialAccelVar;
    },

    /**
     * Return radial acceleration of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getRadialAccel:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getRadialAccel() : Particle Mode should be Gravity");
        return this.modeA.radialAccel;
    },

    /**
     * radial acceleration of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} radialAccel
     */
    setRadialAccel:function (radialAccel) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setRadialAccel() : Particle Mode should be Gravity");
        this.modeA.radialAccel = radialAccel;
    },

    /**
     * Return radial acceleration variance of each particle. Only available in 'Gravity' mode.
     * @return {Number}
     */
    getRadialAccelVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getRadialAccelVar() : Particle Mode should be Gravity");
        return this.modeA.radialAccelVar;
    },

    /**
     * radial acceleration variance of each particle setter. Only available in 'Gravity' mode.
     * @param {Number} radialAccelVar
     */
    setRadialAccelVar:function (radialAccelVar) {
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setRadialAccelVar() : Particle Mode should be Gravity");
        this.modeA.radialAccelVar = radialAccelVar;
    },

    /**
     * get the rotation of each particle to its direction Only available in 'Gravity' mode.
     * @returns {boolean}
     */
    getRotationIsDir: function(){
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.getRotationIsDir() : Particle Mode should be Gravity");
        return this.modeA.rotationIsDir;
    },

    /**
     * set the rotation of each particle to its direction Only available in 'Gravity' mode.
     * @param {boolean} t
     */
    setRotationIsDir: function(t){
        if(this.emitterMode !== ParticleVinplay.MODE_GRAVITY)
            cc.log("cc.ParticleBatchNode.setRotationIsDir() : Particle Mode should be Gravity");
        this.modeA.rotationIsDir = t;
    },

    // mode B
    /**
     * Return starting radius of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getStartRadius:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getStartRadius() : Particle Mode should be Radius");
        return this.modeB.startRadius;
    },

    /**
     * starting radius of the particles setter. Only available in 'Radius' mode.
     * @param {Number} startRadius
     */
    setStartRadius:function (startRadius) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setStartRadius() : Particle Mode should be Radius");
        this.modeB.startRadius = startRadius;
    },

    /**
     * Return starting radius variance of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getStartRadiusVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getStartRadiusVar() : Particle Mode should be Radius");
        return this.modeB.startRadiusVar;
    },

    /**
     * starting radius variance of the particles setter. Only available in 'Radius' mode.
     * @param {Number} startRadiusVar
     */
    setStartRadiusVar:function (startRadiusVar) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setStartRadiusVar() : Particle Mode should be Radius");
        this.modeB.startRadiusVar = startRadiusVar;
    },

    /**
     * Return ending radius of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getEndRadius:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getEndRadius() : Particle Mode should be Radius");
        return this.modeB.endRadius;
    },

    /**
     * ending radius of the particles setter. Only available in 'Radius' mode.
     * @param {Number} endRadius
     */
    setEndRadius:function (endRadius) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setEndRadius() : Particle Mode should be Radius");
        this.modeB.endRadius = endRadius;
    },

    /**
     * Return ending radius variance of the particles. Only available in 'Radius' mode.
     * @return {Number}
     */
    getEndRadiusVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getEndRadiusVar() : Particle Mode should be Radius");
        return this.modeB.endRadiusVar;
    },

    /**
     * ending radius variance of the particles setter. Only available in 'Radius' mode.
     * @param endRadiusVar
     */
    setEndRadiusVar:function (endRadiusVar) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setEndRadiusVar() : Particle Mode should be Radius");
        this.modeB.endRadiusVar = endRadiusVar;
    },

    /**
     * get Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
     * @return {Number}
     */
    getRotatePerSecond:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getRotatePerSecond() : Particle Mode should be Radius");
        return this.modeB.rotatePerSecond;
    },

    /**
     * set Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
     * @param {Number} degrees
     */
    setRotatePerSecond:function (degrees) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setRotatePerSecond() : Particle Mode should be Radius");
        this.modeB.rotatePerSecond = degrees;
    },

    /**
     * Return Variance in degrees for rotatePerSecond. Only available in 'Radius' mode.
     * @return {Number}
     */
    getRotatePerSecondVar:function () {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.getRotatePerSecondVar() : Particle Mode should be Radius");
        return this.modeB.rotatePerSecondVar;
    },

    /**
     * Variance in degrees for rotatePerSecond setter. Only available in 'Radius' mode.
     * @param degrees
     */
    setRotatePerSecondVar:function (degrees) {
        if(this.emitterMode !== ParticleVinplay.MODE_RADIUS)
            cc.log("cc.ParticleBatchNode.setRotatePerSecondVar() : Particle Mode should be Radius");
        this.modeB.rotatePerSecondVar = degrees;
    },
    //////////////////////////////////////////////////////////////////////////

    //don't use a transform matrix, this is faster
    setScale:function (scale, scaleY) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setScale.call(this, scale, scaleY);
    },

    setRotation:function (newRotation) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setRotation.call(this, newRotation);
    },

    setScaleX:function (newScaleX) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setScaleX.call(this, newScaleX);
    },

    setScaleY:function (newScaleY) {
        this._transformSystemDirty = true;
        cc.Node.prototype.setScaleY.call(this, newScaleY);
    },

    /**
     * get start size in pixels of each particle
     * @return {Number}
     */
    getStartSize:function () {
        return this.startSize;
    },

    /**
     * set start size in pixels of each particle
     * @param {Number} startSize
     */
    setStartSize:function (startSize) {
        this.startSize = startSize;
    },

    /**
     * get size variance in pixels of each particle
     * @return {Number}
     */
    getStartSizeVar:function () {
        return this.startSizeVar;
    },

    /**
     * set size variance in pixels of each particle
     * @param {Number} startSizeVar
     */
    setStartSizeVar:function (startSizeVar) {
        this.startSizeVar = startSizeVar;
    },

    /**
     * get end size in pixels of each particle
     * @return {Number}
     */
    getEndSize:function () {
        return this.endSize;
    },

    /**
     * set end size in pixels of each particle
     * @param endSize
     */
    setEndSize:function (endSize) {
        this.endSize = endSize;
    },

    /**
     * get end size variance in pixels of each particle
     * @return {Number}
     */
    getEndSizeVar:function () {
        return this.endSizeVar;
    },

    /**
     * set end size variance in pixels of each particle
     * @param {Number} endSizeVar
     */
    setEndSizeVar:function (endSizeVar) {
        this.endSizeVar = endSizeVar;
    },

    /**
     * set start color of each particle
     * @return {cc.Color}
     */
    getStartColor:function () {
        return cc.color(this._startColor.r, this._startColor.g, this._startColor.b, this._startColor.a);
    },

    /**
     * get start color of each particle
     * @param {cc.Color} startColor
     */
    setStartColor:function (startColor) {
        this._startColor = cc.color(startColor);
    },

    /**
     * get start color variance of each particle
     * @return {cc.Color}
     */
    getStartColorVar:function () {
        return cc.color(this._startColorVar.r, this._startColorVar.g, this._startColorVar.b, this._startColorVar.a);
    },

    /**
     * set start color variance of each particle
     * @param {cc.Color} startColorVar
     */
    setStartColorVar:function (startColorVar) {
        this._startColorVar = cc.color(startColorVar);
    },

    /**
     * get end color and end color variation of each particle
     * @return {cc.Color}
     */
    getEndColor:function () {
        return cc.color(this._endColor.r, this._endColor.g, this._endColor.b, this._endColor.a);
    },

    /**
     * set end color and end color variation of each particle
     * @param {cc.Color} endColor
     */
    setEndColor:function (endColor) {
        this._endColor = cc.color(endColor);
    },

    /**
     * get end color variance of each particle
     * @return {cc.Color}
     */
    getEndColorVar:function () {
        return cc.color(this._endColorVar.r, this._endColorVar.g, this._endColorVar.b, this._endColorVar.a);
    },

    /**
     * set end color variance of each particle
     * @param {cc.Color} endColorVar
     */
    setEndColorVar:function (endColorVar) {
        this._endColorVar = cc.color(endColorVar);
    },

    /**
     * get initial angle of each particle
     * @return {Number}
     */
    getStartSpin:function () {
        return this.startSpin;
    },

    /**
     * set initial angle of each particle
     * @param {Number} startSpin
     */
    setStartSpin:function (startSpin) {
        this.startSpin = startSpin;
    },

    /**
     * get initial angle variance of each particle
     * @return {Number}
     */
    getStartSpinVar:function () {
        return this.startSpinVar;
    },

    /**
     * set initial angle variance of each particle
     * @param {Number} startSpinVar
     */
    setStartSpinVar:function (startSpinVar) {
        this.startSpinVar = startSpinVar;
    },

    /**
     * get end angle of each particle
     * @return {Number}
     */
    getEndSpin:function () {
        return this.endSpin;
    },

    /**
     * set end angle of each particle
     * @param {Number} endSpin
     */
    setEndSpin:function (endSpin) {
        this.endSpin = endSpin;
    },

    /**
     * get end angle variance of each particle
     * @return {Number}
     */
    getEndSpinVar:function () {
        return this.endSpinVar;
    },

    /**
     * set end angle variance of each particle
     * @param {Number} endSpinVar
     */
    setEndSpinVar:function (endSpinVar) {
        this.endSpinVar = endSpinVar;
    },

    /**
     * get emission rate of the particles
     * @return {Number}
     */
    getEmissionRate:function () {
        return this.emissionRate;
    },

    /**
     * set emission rate of the particles
     * @param {Number} emissionRate
     */
    setEmissionRate:function (emissionRate) {
        this.emissionRate = emissionRate;
    },

    /**
     * get maximum particles of the system
     * @return {Number}
     */
    getTotalParticles:function () {
        return this._totalParticles;
    },

    /**
     * set maximum particles of the system
     * @param {Number} tp totalParticles
     */
    setTotalParticles:function (tp) {
        this._renderCmd.setTotalParticles(tp);
    },

    /**
     * get Texture of Particle System
     * @return {cc.Texture2D}
     */
    getTexture:function () {
        return this._texture;
    },

    /**
     * set Texture of Particle System
     * @param {cc.Texture2D } texture
     */
    setTexture:function (texture) {
        if(!texture)
            return;

        if(texture.isLoaded()){
            this.setTextureWithRect(texture, cc.rect(0, 0, texture.width, texture.height));
        } else {
            this._textureLoaded = false;
            texture.addEventListener("load", function(sender){
                this._textureLoaded = true;
                this.setTextureWithRect(sender, cc.rect(0, 0, sender.width, sender.height));
            }, this);
        }
    },

    /** conforms to CocosNodeTexture protocol */
    /**
     * get BlendFunc of Particle System
     * @return {cc.BlendFunc}
     */
    getBlendFunc:function () {
        return this._blendFunc;
    },

    /**
     * set BlendFunc of Particle System
     * @param {Number} src
     * @param {Number} dst
     */
    setBlendFunc:function (src, dst) {
        if (dst === undefined) {
            if (this._blendFunc !== src) {
                this._blendFunc = src;
                this._updateBlendFunc();
            }
        } else {
            if (this._blendFunc.src !== src || this._blendFunc.dst !== dst) {
                this._blendFunc = {src:src, dst:dst};
                this._updateBlendFunc();
            }
        }
    },

    /**
     * does the alpha value modify color getter
     * @return {Boolean}
     */
    isOpacityModifyRGB:function () {
        return this._opacityModifyRGB;
    },

    /**
     * does the alpha value modify color setter
     * @param newValue
     */
    setOpacityModifyRGB:function (newValue) {
        this._opacityModifyRGB = newValue;
    },

    /**
     * <p>whether or not the particles are using blend additive.<br/>
     *     If enabled, the following blending function will be used.<br/>
     * </p>
     * @return {Boolean}
     * @example
     *    source blend function = GL_SRC_ALPHA;
     *    dest blend function = GL_ONE;
     */
    isBlendAdditive:function () {
        return (( this._blendFunc.src === cc.SRC_ALPHA && this._blendFunc.dst === cc.ONE) || (this._blendFunc.src === cc.ONE && this._blendFunc.dst === cc.ONE));
    },

    /**
     * <p>whether or not the particles are using blend additive.<br/>
     *     If enabled, the following blending function will be used.<br/>
     * </p>
     * @param {Boolean} isBlendAdditive
     */
    setBlendAdditive:function (isBlendAdditive) {
        var locBlendFunc = this._blendFunc;
        if (isBlendAdditive) {
            locBlendFunc.src = cc.SRC_ALPHA;
            locBlendFunc.dst = cc.ONE;
        } else {
            this._renderCmd._setBlendAdditive();
        }
    },

    /**
     * get particles movement type: Free or Grouped
     * @return {Number}
     */
    getPositionType:function () {
        return this.positionType;
    },

    /**
     * set particles movement type: Free or Grouped
     * @param {Number} positionType
     */
    setPositionType:function (positionType) {
        this.positionType = positionType;
    },

    /**
     *  <p> return whether or not the node will be auto-removed when it has no particles left.<br/>
     *      By default it is false.<br/>
     *  </p>
     * @return {Boolean}
     */
    isAutoRemoveOnFinish:function () {
        return this.autoRemoveOnFinish;
    },

    /**
     *  <p> set whether or not the node will be auto-removed when it has no particles left.<br/>
     *      By default it is false.<br/>
     *  </p>
     * @param {Boolean} isAutoRemoveOnFinish
     */
    setAutoRemoveOnFinish:function (isAutoRemoveOnFinish) {
        this.autoRemoveOnFinish = isAutoRemoveOnFinish;
    },

    /**
     * return kind of emitter modes
     * @return {Number}
     */
    getEmitterMode:function () {
        return this.emitterMode;
    },

    /**
     * <p>Switch between different kind of emitter modes:<br/>
     *  - CCParticleSystem.MODE_GRAVITY: uses gravity, speed, radial and tangential acceleration<br/>
     *  - CCParticleSystem.MODE_RADIUS: uses radius movement + rotation <br/>
     *  </p>
     * @param {Number} emitterMode
     */
    setEmitterMode:function (emitterMode) {
        this.emitterMode = emitterMode;
    },

    /**
     * initializes a ParticleVinplay
     */
    init:function () {
        return this.initWithTotalParticles(150);
    },

    /**
     * <p>
     *     initializes a CCParticleSystem from a plist file. <br/>
     *      This plist files can be creted manually or with Particle Designer:<br/>
     *      http://particledesigner.71squared.com/
     * </p>
     * @param {String} plistFile
     * @return {boolean}
     */
    initWithFile:function (plistFile) {
        this._plistFile = plistFile;
        var dict = cc.loader.getRes(plistFile);
        if(!dict){
            cc.log("ParticleVinplay.initWithFile(): Particles: file not found");
            return false;
        }

        // XXX compute path from a path, should define a function somewhere to do it
        return this.initWithDictionary(dict, "");
    },

    /**
     * return bounding box of particle system in world space
     * @return {cc.Rect}
     */
    getBoundingBoxToWorld:function () {
        return cc.rect(0, 0, cc._canvas.width, cc._canvas.height);
    },

    /**
     * initializes a particle system from a NSDictionary and the path from where to load the png
     * @param {object} dictionary
     * @param {String} dirname
     * @return {Boolean}
     */
    initWithDictionary:function (dictionary, dirname) {
        var ret = false;
        var buffer = null;
        var image = null;
        var locValueForKey = this._valueForKey;

        var maxParticles = parseInt(locValueForKey("maxParticles", dictionary));
        // self, not super
        if (this.initWithTotalParticles(maxParticles)) {
            // angle
            this.angle = parseFloat(locValueForKey("angle", dictionary));
            this.angleVar = parseFloat(locValueForKey("angleVariance", dictionary));

            // duration
            this.duration = parseFloat(locValueForKey("duration", dictionary));

            // blend function
            this._blendFunc.src = parseInt(locValueForKey("blendFuncSource", dictionary));
            this._blendFunc.dst = parseInt(locValueForKey("blendFuncDestination", dictionary));

            // color
            var locStartColor = this._startColor;
            locStartColor.r = parseFloat(locValueForKey("startColorRed", dictionary)) * 255;
            locStartColor.g = parseFloat(locValueForKey("startColorGreen", dictionary)) * 255;
            locStartColor.b = parseFloat(locValueForKey("startColorBlue", dictionary)) * 255;
            locStartColor.a = parseFloat(locValueForKey("startColorAlpha", dictionary)) * 255;

            var locStartColorVar = this._startColorVar;
            locStartColorVar.r = parseFloat(locValueForKey("startColorVarianceRed", dictionary)) * 255;
            locStartColorVar.g = parseFloat(locValueForKey("startColorVarianceGreen", dictionary)) * 255;
            locStartColorVar.b = parseFloat(locValueForKey("startColorVarianceBlue", dictionary)) * 255;
            locStartColorVar.a = parseFloat(locValueForKey("startColorVarianceAlpha", dictionary)) * 255;

            var locEndColor = this._endColor;
            locEndColor.r = parseFloat(locValueForKey("finishColorRed", dictionary)) * 255;
            locEndColor.g = parseFloat(locValueForKey("finishColorGreen", dictionary)) * 255;
            locEndColor.b = parseFloat(locValueForKey("finishColorBlue", dictionary)) * 255;
            locEndColor.a = parseFloat(locValueForKey("finishColorAlpha", dictionary)) * 255;

            var locEndColorVar = this._endColorVar;
            locEndColorVar.r = parseFloat(locValueForKey("finishColorVarianceRed", dictionary)) * 255;
            locEndColorVar.g = parseFloat(locValueForKey("finishColorVarianceGreen", dictionary)) * 255;
            locEndColorVar.b = parseFloat(locValueForKey("finishColorVarianceBlue", dictionary)) * 255;
            locEndColorVar.a = parseFloat(locValueForKey("finishColorVarianceAlpha", dictionary)) * 255;

            // particle size
            this.startSize = parseFloat(locValueForKey("startParticleSize", dictionary));
            this.startSizeVar = parseFloat(locValueForKey("startParticleSizeVariance", dictionary));
            this.endSize = parseFloat(locValueForKey("finishParticleSize", dictionary));
            this.endSizeVar = parseFloat(locValueForKey("finishParticleSizeVariance", dictionary));

            // position
            this.setPosition(parseFloat(locValueForKey("sourcePositionx", dictionary)),
                parseFloat(locValueForKey("sourcePositiony", dictionary)));
            this._posVar.x = parseFloat(locValueForKey("sourcePositionVariancex", dictionary));
            this._posVar.y = parseFloat(locValueForKey("sourcePositionVariancey", dictionary));

            // Spinning
            this.startSpin = parseFloat(locValueForKey("rotationStart", dictionary));
            this.startSpinVar = parseFloat(locValueForKey("rotationStartVariance", dictionary));
            this.endSpin = parseFloat(locValueForKey("rotationEnd", dictionary));
            this.endSpinVar = parseFloat(locValueForKey("rotationEndVariance", dictionary));

            this.emitterMode = parseInt(locValueForKey("emitterType", dictionary));

            // Mode A: Gravity + tangential accel + radial accel
            if (this.emitterMode === ParticleVinplay.MODE_GRAVITY) {
                var locModeA = this.modeA;
                // gravity
                locModeA.gravity.x = parseFloat(locValueForKey("gravityx", dictionary));
                locModeA.gravity.y = parseFloat(locValueForKey("gravityy", dictionary));

                // speed
                locModeA.speed = parseFloat(locValueForKey("speed", dictionary));
                locModeA.speedVar = parseFloat(locValueForKey("speedVariance", dictionary));

                // radial acceleration
                var pszTmp = locValueForKey("radialAcceleration", dictionary);
                locModeA.radialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = locValueForKey("radialAccelVariance", dictionary);
                locModeA.radialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;

                // tangential acceleration
                pszTmp = locValueForKey("tangentialAcceleration", dictionary);
                locModeA.tangentialAccel = (pszTmp) ? parseFloat(pszTmp) : 0;

                pszTmp = locValueForKey("tangentialAccelVariance", dictionary);
                locModeA.tangentialAccelVar = (pszTmp) ? parseFloat(pszTmp) : 0;

                // rotation is dir
                var locRotationIsDir = locValueForKey("rotationIsDir", dictionary).toLowerCase();
                locModeA.rotationIsDir = (locRotationIsDir != null && (locRotationIsDir === "true" || locRotationIsDir === "1"));
            } else if (this.emitterMode === ParticleVinplay.MODE_RADIUS) {
                // or Mode B: radius movement
                var locModeB = this.modeB;
                locModeB.startRadius = parseFloat(locValueForKey("maxRadius", dictionary));
                locModeB.startRadiusVar = parseFloat(locValueForKey("maxRadiusVariance", dictionary));
                locModeB.endRadius = parseFloat(locValueForKey("minRadius", dictionary));
                locModeB.endRadiusVar = 0;
                locModeB.rotatePerSecond = parseFloat(locValueForKey("rotatePerSecond", dictionary));
                locModeB.rotatePerSecondVar = parseFloat(locValueForKey("rotatePerSecondVariance", dictionary));
            } else {
                cc.log("ParticleVinplay.initWithDictionary(): Invalid emitterType in config file");
                return false;
            }

            // life span
            this.life = parseFloat(locValueForKey("particleLifespan", dictionary));
            this.lifeVar = parseFloat(locValueForKey("particleLifespanVariance", dictionary));

            // emission Rate
            this.emissionRate = this._totalParticles / this.life;

            //don't get the internal texture if a batchNode is used
            if (!this._batchNode) {
                // Set a compatible default for the alpha transfer
                this._opacityModifyRGB = false;

                // texture
                // Try to get the texture from the cache
                var textureName = locValueForKey("textureFileName", dictionary);
                var imgPath = cc.path.changeBasename(this._plistFile, textureName);
                var tex = cc.textureCache.getTextureForKey(imgPath);

                if (tex) {
                    this.setTexture(tex);
                } else {
                    var textureData = locValueForKey("textureImageData", dictionary);

                    if (!textureData || textureData.length === 0) {
                        tex = cc.textureCache.addImage(imgPath);
                        if (!tex)
                            return false;
                        this.setTexture(tex);
                    } else {
                        buffer = cc.unzipBase64AsArray(textureData, 1);
                        if (!buffer) {
                            cc.log("ParticleVinplay: error decoding or ungzipping textureImageData");
                            return false;
                        }

                        var imageFormat = cc.getImageFormatByData(buffer);

                        if(imageFormat !== cc.FMT_TIFF && imageFormat !== cc.FMT_PNG){
                            cc.log("ParticleVinplay: unknown image format with Data");
                            return false;
                        }

                        var canvasObj = document.createElement("canvas");
                        if(imageFormat === cc.FMT_PNG){
                            var myPngObj = new cc.PNGReader(buffer);
                            myPngObj.render(canvasObj);
                        } else {
                            var myTIFFObj = cc.tiffReader;
                            myTIFFObj.parseTIFF(buffer,canvasObj);
                        }

                        cc.textureCache.cacheImage(imgPath, canvasObj);

                        var addTexture = cc.textureCache.getTextureForKey(imgPath);
                        if(!addTexture)
                            cc.log("ParticleVinplay.initWithDictionary() : error loading the texture");
                        this.setTexture(addTexture);
                    }
                }
            }
            ret = true;
        }
        return ret;
    },

    /**
     * Initializes a system with a fixed number of particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        this._totalParticles = numberOfParticles;

        var i, locParticles = this._particles;
        locParticles.length = 0;
        for(i = 0; i< numberOfParticles; i++){
            locParticles[i] = new cc.Particle();
        }

        if (!locParticles) {
            cc.log("Particle system: not enough memory");
            return false;
        }
        this._allocatedParticles = numberOfParticles;

        if (this._batchNode)
            for (i = 0; i < this._totalParticles; i++)
                locParticles[i].atlasIndex = i;

        // default, active
        this._isActive = true;

        // default blend function
        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        // default movement type;
        this.positionType = ParticleVinplay.TYPE_FREE;

        // by default be in mode A:
        this.emitterMode = ParticleVinplay.MODE_GRAVITY;

        // default: modulate
        // XXX: not used
        //  colorModulate = YES;
        this.autoRemoveOnFinish = false;

        //for batchNode
        this._transformSystemDirty = false;

        // udpate after action in run!
        this.scheduleUpdateWithPriority(1);
        this._renderCmd._initWithTotalParticles(numberOfParticles);
        return true;
    },

    /**
     * Unschedules the "update" method.
     * @function
     * @see scheduleUpdate();
     */
    destroyParticleSystem:function () {
        this.unscheduleUpdate();
    },

    /**
     * Add a particle to the emitter
     * @return {Boolean}
     */
    addParticle: function () {
        if (this.isFull())
            return false;

        var particle = this._renderCmd.addParticle();
        this.initParticle(particle);
        ++this.particleCount;
        return true;
    },

    /**
     * Initializes a particle
     * @param {cc.Particle} particle
     */
    initParticle:function (particle) {
        var locRandomMinus11 = cc.randomMinus1To1;
        // timeToLive
        // no negative life. prevent division by 0
        particle.timeToLive = this.life + this.lifeVar * locRandomMinus11();
        particle.timeToLive = Math.max(0, particle.timeToLive);

        // position
        particle.pos.x = this._sourcePosition.x + this._posVar.x * locRandomMinus11();
        particle.pos.y = this._sourcePosition.y + this._posVar.y * locRandomMinus11();

        // Color
        var start, end;
        var locStartColor = this._startColor, locStartColorVar = this._startColorVar;
        var locEndColor = this._endColor, locEndColorVar = this._endColorVar;
        start = {
            r: cc.clampf(locStartColor.r + locStartColorVar.r * locRandomMinus11(), 0, 255),
            g: cc.clampf(locStartColor.g + locStartColorVar.g * locRandomMinus11(), 0, 255),
            b: cc.clampf(locStartColor.b + locStartColorVar.b * locRandomMinus11(), 0, 255),
            a: cc.clampf(locStartColor.a + locStartColorVar.a * locRandomMinus11(), 0, 255)
        };
        end = {
            r: cc.clampf(locEndColor.r + locEndColorVar.r * locRandomMinus11(), 0, 255),
            g: cc.clampf(locEndColor.g + locEndColorVar.g * locRandomMinus11(), 0, 255),
            b: cc.clampf(locEndColor.b + locEndColorVar.b * locRandomMinus11(), 0, 255),
            a: cc.clampf(locEndColor.a + locEndColorVar.a * locRandomMinus11(), 0, 255)
        };

        particle.color = start;
        var locParticleDeltaColor = particle.deltaColor, locParticleTimeToLive = particle.timeToLive;
        locParticleDeltaColor.r = (end.r - start.r) / locParticleTimeToLive;
        locParticleDeltaColor.g = (end.g - start.g) / locParticleTimeToLive;
        locParticleDeltaColor.b = (end.b - start.b) / locParticleTimeToLive;
        locParticleDeltaColor.a = (end.a - start.a) / locParticleTimeToLive;

        // size
        var startS = this.startSize + this.startSizeVar * locRandomMinus11();
        startS = Math.max(0, startS); // No negative value

        particle.size = startS;
        if (this.endSize === ParticleVinplay.START_SIZE_EQUAL_TO_END_SIZE) {
            particle.deltaSize = 0;
        } else {
            var endS = this.endSize + this.endSizeVar * locRandomMinus11();
            endS = Math.max(0, endS); // No negative values
            particle.deltaSize = (endS - startS) / locParticleTimeToLive;
        }

        // rotation
        var startA = this.startSpin + this.startSpinVar * locRandomMinus11();
        var endA = this.endSpin + this.endSpinVar * locRandomMinus11();
        particle.rotation = startA;
        particle.deltaRotation = (endA - startA) / locParticleTimeToLive;

        // position
        if (this.positionType === ParticleVinplay.TYPE_FREE)
            particle.startPos = this.convertToWorldSpace(this._pointZeroForParticle);
        else if (this.positionType === ParticleVinplay.TYPE_RELATIVE){
            particle.startPos.x = this._position.x;
            particle.startPos.y = this._position.y;
        }

        // direction
        var a = cc.degreesToRadians(this.angle + this.angleVar * locRandomMinus11());

        // Mode Gravity: A
        if (this.emitterMode === ParticleVinplay.MODE_GRAVITY) {
            var locModeA = this.modeA, locParticleModeA = particle.modeA;
            var s = locModeA.speed + locModeA.speedVar * locRandomMinus11();

            // direction
            locParticleModeA.dir.x = Math.cos(a);
            locParticleModeA.dir.y = Math.sin(a);
            cc.pMultIn(locParticleModeA.dir, s);

            // radial accel
            locParticleModeA.radialAccel = locModeA.radialAccel + locModeA.radialAccelVar * locRandomMinus11();

            // tangential accel
            locParticleModeA.tangentialAccel = locModeA.tangentialAccel + locModeA.tangentialAccelVar * locRandomMinus11();

            // rotation is dir
            if(locModeA.rotationIsDir)
                particle.rotation = -cc.radiansToDegrees(cc.pToAngle(locParticleModeA.dir));
        } else {
            // Mode Radius: B
            var locModeB = this.modeB, locParitlceModeB = particle.modeB;

            // Set the default diameter of the particle from the source position
            var startRadius = locModeB.startRadius + locModeB.startRadiusVar * locRandomMinus11();
            var endRadius = locModeB.endRadius + locModeB.endRadiusVar * locRandomMinus11();

            locParitlceModeB.radius = startRadius;
            locParitlceModeB.deltaRadius = (locModeB.endRadius === ParticleVinplay.START_RADIUS_EQUAL_TO_END_RADIUS) ? 0 : (endRadius - startRadius) / locParticleTimeToLive;

            locParitlceModeB.angle = a;
            locParitlceModeB.degreesPerSecond = cc.degreesToRadians(locModeB.rotatePerSecond + locModeB.rotatePerSecondVar * locRandomMinus11());
        }
    },

    /**
     * stop emitting particles. Running particles will continue to run until they die
     */
    stopSystem:function () {
        this._isActive = false;
        this._elapsed = this.duration;
        this._emitCounter = 0;
    },

    /**
     * Kill all living particles.
     */
    resetSystem:function () {
        this._isActive = true;
        this._elapsed = 0;
        var locParticles = this._particles;
        for (this._particleIdx = 0; this._particleIdx < this.particleCount; ++this._particleIdx)
            locParticles[this._particleIdx].timeToLive = 0 ;
    },

    /**
     * whether or not the system is full
     * @return {Boolean}
     */
    isFull:function () {
        return (this.particleCount >= this._totalParticles);
    },

    /**
     * should be overridden by subclasses
     * @param {cc.Particle} particle
     * @param {cc.Point} newPosition
     */
    updateQuadWithParticle:function (particle, newPosition) {
        this._renderCmd.updateQuadWithParticle(particle, newPosition);
    },

    /**
     * should be overridden by subclasses
     */
    postStep:function () {
        this._renderCmd.postStep();
    },

    /**
     * update emitter's status
     * @override
     * @param {Number} dt delta time
     */
    update:function (dt) {
        if (this._isActive && this.emissionRate) {
            var rate = 1.0 / this.emissionRate;
            //issue #1201, prevent bursts of particles, due to too high emitCounter
            if (this.particleCount < this._totalParticles)
                this._emitCounter += dt;

            while ((this.particleCount < this._totalParticles) && (this._emitCounter > rate)) {
                this.addParticle();
                this._emitCounter -= rate;
            }

            this._elapsed += dt;
            if (this.duration !== -1 && this.duration < this._elapsed)
                this.stopSystem();
        }
        this._particleIdx = 0;

        var currentPosition = cc.Particle.TemporaryPoints[0];
        if (this.positionType === ParticleVinplay.TYPE_FREE) {
            cc.pIn(currentPosition, this.convertToWorldSpace(this._pointZeroForParticle));
        } else if (this.positionType === ParticleVinplay.TYPE_RELATIVE) {
            currentPosition.x = this._position.x;
            currentPosition.y = this._position.y;
        }

        if (this._visible) {
            // Used to reduce memory allocation / creation within the loop
            var tpa = cc.Particle.TemporaryPoints[1],
                tpb = cc.Particle.TemporaryPoints[2],
                tpc = cc.Particle.TemporaryPoints[3];

            var locParticles = this._particles;
            while (this._particleIdx < this.particleCount) {

                // Reset the working particles
                cc.pZeroIn(tpa);
                cc.pZeroIn(tpb);
                cc.pZeroIn(tpc);

                var selParticle = locParticles[this._particleIdx];

                // life
                selParticle.timeToLive -= dt;

                if (selParticle.timeToLive > 0) {
                    // Mode A: gravity, direction, tangential accel & radial accel
                    if (this.emitterMode === ParticleVinplay.MODE_GRAVITY) {

                        var tmp = tpc, radial = tpa, tangential = tpb;

                        // radial acceleration
                        if (selParticle.pos.x || selParticle.pos.y) {
                            cc.pIn(radial, selParticle.pos);
                            cc.pNormalizeIn(radial);
                        } else {
                            cc.pZeroIn(radial);
                        }

                        cc.pIn(tangential, radial);
                        cc.pMultIn(radial, selParticle.modeA.radialAccel);

                        // tangential acceleration
                        var newy = tangential.x;
                        tangential.x = -tangential.y;
                        tangential.y = newy;

                        cc.pMultIn(tangential, selParticle.modeA.tangentialAccel);

                        cc.pIn(tmp, radial);
                        cc.pAddIn(tmp, tangential);
                        cc.pAddIn(tmp, this.modeA.gravity);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.modeA.dir, tmp);


                        cc.pIn(tmp, selParticle.modeA.dir);
                        cc.pMultIn(tmp, dt);
                        cc.pAddIn(selParticle.pos, tmp);
                    } else {
                        // Mode B: radius movement
                        var selModeB = selParticle.modeB;
                        // Update the angle and radius of the particle.
                        selModeB.angle += selModeB.degreesPerSecond * dt;
                        selModeB.radius += selModeB.deltaRadius * dt;

                        selParticle.pos.x = -Math.cos(selModeB.angle) * selModeB.radius;
                        selParticle.pos.y = -Math.sin(selModeB.angle) * selModeB.radius;
                    }

                    // color
                    this._renderCmd._updateDeltaColor(selParticle, dt);

                    // size
                    selParticle.size += (selParticle.deltaSize * dt);
                    selParticle.size = Math.max(0, selParticle.size);

                    // angle
                    selParticle.rotation += (selParticle.deltaRotation * dt);

                    //
                    // update values in quad
                    //
                    var newPos = tpa;
                    if (this.positionType === ParticleVinplay.TYPE_FREE || this.positionType === ParticleVinplay.TYPE_RELATIVE) {
                        var diff = tpb;
                        cc.pIn(diff, currentPosition);
                        cc.pSubIn(diff, selParticle.startPos);

                        cc.pIn(newPos, selParticle.pos);
                        cc.pSubIn(newPos, diff);
                    } else {
                        cc.pIn(newPos, selParticle.pos);
                    }

                    // translate newPos to correct position, since matrix transform isn't performed in batchnode
                    // don't update the particle with the new position information, it will interfere with the radius and tangential calculations
                    if (this._batchNode) {
                        newPos.x += this._position.x;
                        newPos.y += this._position.y;
                    }
                    this._renderCmd.updateParticlePosition(selParticle, newPos);

                    // update particle counter
                    ++this._particleIdx;
                } else {
                    // life < 0
                    var currentIndex = selParticle.atlasIndex;
                    if(this._particleIdx !== this.particleCount -1){
                        var deadParticle = locParticles[this._particleIdx];
                        locParticles[this._particleIdx] = locParticles[this.particleCount -1];
                        locParticles[this.particleCount -1] = deadParticle;
                    }
                    if (this._batchNode) {
                        //disable the switched particle
                        this._batchNode.disableParticle(this.atlasIndex + currentIndex);
                        //switch indexes
                        locParticles[this.particleCount - 1].atlasIndex = currentIndex;
                    }

                    --this.particleCount;
                    if (this.particleCount === 0 && this.autoRemoveOnFinish) {
                        this.unscheduleUpdate();
                        this._parent.removeChild(this, true);
                        return;
                    }
                }
            }
            this._transformSystemDirty = false;
        }

        if (!this._batchNode)
            this.postStep();
    },

    /**
     * update emitter's status (dt = 0)
     */
    updateWithNoTime:function () {
        this.update(0);
    },

    //
    // return the string found by key in dict.
    // @param {string} key
    // @param {object} dict
    // @return {String} "" if not found; return the string if found.
    // @private
    //
    _valueForKey:function (key, dict) {
        if (dict) {
            var pString = dict[key];
            return pString != null ? pString : "";
        }
        return "";
    },

    _updateBlendFunc:function () {
        if(this._batchNode){
            cc.log("Can't change blending functions when the particle is being batched");
            return;
        }

        var locTexture = this._texture;
        if (locTexture && locTexture instanceof cc.Texture2D) {
            this._opacityModifyRGB = false;
            var locBlendFunc = this._blendFunc;
            if (locBlendFunc.src === cc.BLEND_SRC && locBlendFunc.dst === cc.BLEND_DST) {
                if (locTexture.hasPremultipliedAlpha()) {
                    this._opacityModifyRGB = true;
                } else {
                    locBlendFunc.src = cc.SRC_ALPHA;
                    locBlendFunc.dst = cc.ONE_MINUS_SRC_ALPHA;
                }
            }
        }
    },

    /**
     * to copy object with deep copy.
     * returns a clone of action.
     *
     * @return {ParticleVinplay}
     */
    clone:function () {
        var retParticle = new ParticleVinplay();

        // self, not super
        if (retParticle.initWithTotalParticles(this.getTotalParticles())) {
            // angle
            retParticle.setAngle(this.getAngle());
            retParticle.setAngleVar(this.getAngleVar());

            // duration
            retParticle.setDuration(this.getDuration());

            // blend function
            var blend = this.getBlendFunc();
            retParticle.setBlendFunc(blend.src,blend.dst);

            // color
            retParticle.setStartColor(this.getStartColor());

            retParticle.setStartColorVar(this.getStartColorVar());

            retParticle.setEndColor(this.getEndColor());

            retParticle.setEndColorVar(this.getEndColorVar());

            // this size
            retParticle.setStartSize(this.getStartSize());
            retParticle.setStartSizeVar(this.getStartSizeVar());
            retParticle.setEndSize(this.getEndSize());
            retParticle.setEndSizeVar(this.getEndSizeVar());

            // position
            retParticle.setPosition(cc.p(this.x, this.y));
            retParticle.setPosVar(cc.p(this.getPosVar().x,this.getPosVar().y));

            retParticle.setPositionType(this.getPositionType());

            // Spinning
            retParticle.setStartSpin(this.getStartSpin()||0);
            retParticle.setStartSpinVar(this.getStartSpinVar()||0);
            retParticle.setEndSpin(this.getEndSpin()||0);
            retParticle.setEndSpinVar(this.getEndSpinVar()||0);

            retParticle.setEmitterMode(this.getEmitterMode());

            // Mode A: Gravity + tangential accel + radial accel
            if (this.getEmitterMode() === ParticleVinplay.MODE_GRAVITY) {
                // gravity
                var gra = this.getGravity();
                retParticle.setGravity(cc.p(gra.x,gra.y));

                // speed
                retParticle.setSpeed(this.getSpeed());
                retParticle.setSpeedVar(this.getSpeedVar());

                // radial acceleration
                retParticle.setRadialAccel(this.getRadialAccel());
                retParticle.setRadialAccelVar(this.getRadialAccelVar());

                // tangential acceleration
                retParticle.setTangentialAccel(this.getTangentialAccel());
                retParticle.setTangentialAccelVar(this.getTangentialAccelVar());

            } else if (this.getEmitterMode() === ParticleVinplay.MODE_RADIUS) {
                // or Mode B: radius movement
                retParticle.setStartRadius(this.getStartRadius());
                retParticle.setStartRadiusVar(this.getStartRadiusVar());
                retParticle.setEndRadius(this.getEndRadius());
                retParticle.setEndRadiusVar(this.getEndRadiusVar());

                retParticle.setRotatePerSecond(this.getRotatePerSecond());
                retParticle.setRotatePerSecondVar(this.getRotatePerSecondVar());
            }

            // life span
            retParticle.setLife(this.getLife());
            retParticle.setLifeVar(this.getLifeVar());

            // emission Rate
            retParticle.setEmissionRate(this.getEmissionRate());

            //don't get the internal texture if a batchNode is used
            if (!this.getBatchNode()) {
                // Set a compatible default for the alpha transfer
                retParticle.setOpacityModifyRGB(this.isOpacityModifyRGB());
                // texture
                var texture = this.getTexture();
                if(texture){
                    var size = texture.getContentSize();
                    retParticle.setTextureWithRect(texture, cc.rect(0, 0, size.width, size.height));
                }
            }
        }
        return retParticle;
    },

    /**
     * <p> Sets a new CCSpriteFrame as particle.</br>
     * WARNING: this method is experimental. Use setTextureWithRect instead.
     * </p>
     * @param {cc.SpriteFrame} spriteFrame
     */
    setDisplayFrame: function (spriteFrame) {
        if (!spriteFrame)
            return;

        var locOffset = spriteFrame.getOffsetInPixels();
        if (locOffset.x !== 0 || locOffset.y !== 0)
            cc.log("ParticleVinplay.setDisplayFrame(): QuadParticle only supports SpriteFrames with no offsets");

        // update texture before updating texture rect
        var texture = spriteFrame.getTexture(), locTexture = this._texture;
        if (locTexture !== texture)
            this.setTexture(texture);
    },

    /**
     *  Sets a new texture with a rect. The rect is in Points.
     * @param {cc.Texture2D} texture
     * @param {cc.Rect} rect
     */
    setTextureWithRect: function (texture, rect) {
        var locTexture = this._texture;
        if (locTexture !== texture) {
            this._texture = texture;
            this._updateBlendFunc();
        }
        this.initTexCoordsWithRect(rect);
    },

    /**
     * listen the event that coming to foreground on Android  (An empty function for native)
     * @param {cc.Class} obj
     */
    listenBackToForeground:function (obj) {
        //do nothing
    }
});

var _p = ParticleVinplay.prototype;

// Extended properties
/** @expose */
//_p.opacityModifyRGB;
//cc.defineGetterSetter(_p, "opacityModifyRGB", _p.isOpacityModifyRGB, _p.setOpacityModifyRGB);
/** @expose */
_p.batchNode;
cc.defineGetterSetter(_p, "batchNode", _p.getBatchNode, _p.setBatchNode);
/** @expose */
//_p.drawMode;
//cc.defineGetterSetter(_p, "drawMode", _p.getDrawMode, _p.setDrawMode);
///** @expose */
//_p.shapeType;
//cc.defineGetterSetter(_p, "shapeType", _p.getShapeType, _p.setShapeType);
///** @expose */
//_p.active;
//cc.defineGetterSetter(_p, "active", _p.isActive);
///** @expose */
//_p.sourcePos;
//cc.defineGetterSetter(_p, "sourcePos", _p.getSourcePosition, _p.setSourcePosition);
///** @expose */
//_p.posVar;
//cc.defineGetterSetter(_p, "posVar", _p.getPosVar, _p.setPosVar);
/** @expose */
_p.gravity;
cc.defineGetterSetter(_p, "gravity", _p.getGravity, _p.setGravity);
/** @expose */
_p.speed;
cc.defineGetterSetter(_p, "speed", _p.getSpeed, _p.setSpeed);
/** @expose */
_p.speedVar;
cc.defineGetterSetter(_p, "speedVar", _p.getSpeedVar, _p.setSpeedVar);
/** @expose */
_p.tangentialAccel;
cc.defineGetterSetter(_p, "tangentialAccel", _p.getTangentialAccel, _p.setTangentialAccel);
/** @expose */
_p.tangentialAccelVar;
cc.defineGetterSetter(_p, "tangentialAccelVar", _p.getTangentialAccelVar, _p.setTangentialAccelVar);
/** @expose */
_p.radialAccel;
cc.defineGetterSetter(_p, "radialAccel", _p.getRadialAccel, _p.setRadialAccel);
/** @expose */
_p.radialAccelVar;
cc.defineGetterSetter(_p, "radialAccelVar", _p.getRadialAccelVar, _p.setRadialAccelVar);
/** @expose */
_p.rotationIsDir;
cc.defineGetterSetter(_p, "rotationIsDir", _p.getRotationIsDir, _p.setRotationIsDir);
/** @expose */
_p.startRadius;
cc.defineGetterSetter(_p, "startRadius", _p.getStartRadius, _p.setStartRadius);
/** @expose */
_p.startRadiusVar;
cc.defineGetterSetter(_p, "startRadiusVar", _p.getStartRadiusVar, _p.setStartRadiusVar);
/** @expose */
_p.endRadius;
cc.defineGetterSetter(_p, "endRadius", _p.getEndRadius, _p.setEndRadius);
/** @expose */
_p.endRadiusVar;
cc.defineGetterSetter(_p, "endRadiusVar", _p.getEndRadiusVar, _p.setEndRadiusVar);
/** @expose */
//_p.rotatePerS;
//cc.defineGetterSetter(_p, "rotatePerS", _p.getRotatePerSecond, _p.setRotatePerSecond);
///** @expose */
//_p.rotatePerSVar;
//cc.defineGetterSetter(_p, "rotatePerSVar", _p.getRotatePerSecondVar, _p.setRotatePerSecondVar);
///** @expose */
//_p.startColor;
//cc.defineGetterSetter(_p, "startColor", _p.getStartColor, _p.setStartColor);
///** @expose */
//_p.startColorVar;
//cc.defineGetterSetter(_p, "startColorVar", _p.getStartColorVar, _p.setStartColorVar);
///** @expose */
//_p.endColor;
//cc.defineGetterSetter(_p, "endColor", _p.getEndColor, _p.setEndColor);
///** @expose */
//_p.endColorVar;
//cc.defineGetterSetter(_p, "endColorVar", _p.getEndColorVar, _p.setEndColorVar);
///** @expose */
//_p.totalParticles;
//cc.defineGetterSetter(_p, "totalParticles", _p.getTotalParticles, _p.setTotalParticles);
/** @expose */
_p.texture;
cc.defineGetterSetter(_p, "texture", _p.getTexture, _p.setTexture);


/**
 * <p> return the string found by key in dict. <br/>
 *    This plist files can be create manually or with Particle Designer:<br/>
 *    http://particledesigner.71squared.com/<br/>
 * </p>
 * @deprecated since v3.0 please use new cc.ParticleSysytem(plistFile) instead.
 * @param {String|Number} plistFile
 * @return {ParticleVinplay}
 */
ParticleVinplay.create = function (plistFile) {
    return new ParticleVinplay(plistFile);
};

/**
 * <p> return the string found by key in dict. <br/>
 *    This plist files can be create manually or with Particle Designer:<br/>
 *    http://particledesigner.71squared.com/<br/>
 * </p>
 * @deprecated since v3.0 please use new cc.ParticleSysytem(plistFile) instead.
 * @function
 * @param {String|Number} plistFile
 * @return {ParticleVinplay}
 */
ParticleVinplay.createWithTotalParticles = ParticleVinplay.create;

// Different modes
/**
 * Mode A:Gravity + Tangential Accel + Radial Accel
 * @Class
 * @Construct
 * @param {cc.Point} [gravity=] Gravity value.
 * @param {Number} [speed=0] speed of each particle.
 * @param {Number} [speedVar=0] speed variance of each particle.
 * @param {Number} [tangentialAccel=0] tangential acceleration of each particle.
 * @param {Number} [tangentialAccelVar=0] tangential acceleration variance of each particle.
 * @param {Number} [radialAccel=0] radial acceleration of each particle.
 * @param {Number} [radialAccelVar=0] radial acceleration variance of each particle.
 * @param {boolean} [rotationIsDir=false]
 */
ParticleVinplay.ModeA = function (gravity, speed, speedVar, tangentialAccel, tangentialAccelVar, radialAccel, radialAccelVar, rotationIsDir) {
    /** Gravity value. Only available in 'Gravity' mode. */
    this.gravity = gravity ? gravity : cc.p(0,0);
    /** speed of each particle. Only available in 'Gravity' mode.  */
    this.speed = speed || 0;
    /** speed variance of each particle. Only available in 'Gravity' mode. */
    this.speedVar = speedVar || 0;
    /** tangential acceleration of each particle. Only available in 'Gravity' mode. */
    this.tangentialAccel = tangentialAccel || 0;
    /** tangential acceleration variance of each particle. Only available in 'Gravity' mode. */
    this.tangentialAccelVar = tangentialAccelVar || 0;
    /** radial acceleration of each particle. Only available in 'Gravity' mode. */
    this.radialAccel = radialAccel || 0;
    /** radial acceleration variance of each particle. Only available in 'Gravity' mode. */
    this.radialAccelVar = radialAccelVar || 0;
    /** set the rotation of each particle to its direction Only available in 'Gravity' mode. */
    this.rotationIsDir = rotationIsDir || false;
};

/**
 * Mode B: circular movement (gravity, radial accel and tangential accel don't are not used in this mode)
 * @Class
 * @Construct
 * @param {Number} [startRadius=0] The starting radius of the particles.
 * @param {Number} [startRadiusVar=0] The starting radius variance of the particles.
 * @param {Number} [endRadius=0] The ending radius of the particles.
 * @param {Number} [endRadiusVar=0] The ending radius variance of the particles.
 * @param {Number} [rotatePerSecond=0] Number of degrees to rotate a particle around the source pos per second.
 * @param {Number} [rotatePerSecondVar=0] Variance in degrees for rotatePerSecond.
 */
ParticleVinplay.ModeB = function (startRadius, startRadiusVar, endRadius, endRadiusVar, rotatePerSecond, rotatePerSecondVar) {
    /** The starting radius of the particles. Only available in 'Radius' mode. */
    this.startRadius = startRadius || 0;
    /** The starting radius variance of the particles. Only available in 'Radius' mode. */
    this.startRadiusVar = startRadiusVar || 0;
    /** The ending radius of the particles. Only available in 'Radius' mode. */
    this.endRadius = endRadius || 0;
    /** The ending radius variance of the particles. Only available in 'Radius' mode. */
    this.endRadiusVar = endRadiusVar || 0;
    /** Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode. */
    this.rotatePerSecond = rotatePerSecond || 0;
    /** Variance in degrees for rotatePerSecond. Only available in 'Radius' mode. */
    this.rotatePerSecondVar = rotatePerSecondVar || 0;
};

/**
 * Shape Mode of Particle Draw
 * @constant
 * @type Number
 */
ParticleVinplay.SHAPE_MODE = 0;

/**
 * Texture Mode of Particle Draw
 * @constant
 * @type Number
 */
ParticleVinplay.TEXTURE_MODE = 1;

/**
 * Star Shape for ShapeMode of Particle
 * @constant
 * @type Number
 */
ParticleVinplay.STAR_SHAPE = 0;

/**
 * Ball Shape for ShapeMode of Particle
 * @constant
 * @type Number
 */
ParticleVinplay.BALL_SHAPE = 1;

/**
 * The Particle emitter lives forever
 * @constant
 * @type Number
 */
ParticleVinplay.DURATION_INFINITY = -1;

/**
 * The starting size of the particle is equal to the ending size
 * @constant
 * @type Number
 */
ParticleVinplay.START_SIZE_EQUAL_TO_END_SIZE = -1;

/**
 * The starting radius of the particle is equal to the ending radius
 * @constant
 * @type Number
 */
ParticleVinplay.START_RADIUS_EQUAL_TO_END_RADIUS = -1;

/**
 * Gravity mode (A mode)
 * @constant
 * @type Number
 */
ParticleVinplay.MODE_GRAVITY = 0;

/**
 * Radius mode (B mode)
 * @constant
 * @type Number
 */
ParticleVinplay.MODE_RADIUS = 1;

/**
 * Living particles are attached to the world and are unaffected by emitter repositioning.
 * @constant
 * @type Number
 */
ParticleVinplay.TYPE_FREE = 0;

/**
 * Living particles are attached to the world but will follow the emitter repositioning.<br/>
 * Use case: Attach an emitter to an sprite, and you want that the emitter follows the sprite.
 * @constant
 * @type Number
 */
ParticleVinplay.TYPE_RELATIVE = 1;

/**
 * Living particles are attached to the emitter and are translated along with it.
 * @constant
 * @type Number
 */
ParticleVinplay.TYPE_GROUPED = 2;
