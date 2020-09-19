/**
 * Created by Admin on 3/7/2017.
 */
XocDia.Audio = cc.Class.extend(
    {
        clock:"res/CardGame/ResXocDia/Sound/Dong_ho_tic_tic.mp3",
        MoBat:"res/CardGame/ResXocDia/Sound/Mo_bat.mp3",
        ThuTraPhip:"res/CardGame/ResXocDia/Sound/thu_tra_phing.mp3",
        AddPhing1:"res/CardGame/ResXocDia/Sound/addPhing1.mp3",
        AddPhing2:"res/CardGame/ResXocDia/Sound/addPhing2.mp3",
        AddPhing3:"res/CardGame/ResXocDia/Sound/addPhing3.mp3",
        XocDia:"res/CardGame/ResXocDia/Sound/Xoc_dia.mp3",
        inRoom:"res/CardGame/ResXocDia/Sound/inRoom.mp3",
        outRoom:"res/CardGame/ResXocDia/Sound/outRoom.mp3",

        isOnSoundBackGround: true,
        isOnSoundEffect:true,

        ctor: function (isOnSoundBackGround,isOnSoundEffect) {
            this.isOnSoundBackGround = isOnSoundBackGround;
            this.isOnSoundEffect = isOnSoundEffect;
            //cc.log("SlotKhoBauAudio New isOnSoundBackGround = " + isOnSoundBackGround + " isOnSoundEffect = "+isOnSoundEffect);

        },
        onSoundBackGround:function()
        {
            this.isOnSoundBackGround = true;
            cc.audioEngine.playMusic(this.nhacNen, true);

        },
        playSoundBackGround:function()
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(this.nhacNen, true);
            }
        },
        offSoundBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                this.isOnSoundBackGround = false;
                cc.audioEngine.stopMusic();
            }
        },
        soundEffect:function(url)
        {
            if(this.isOnSoundEffect)
            {
                cc.audioEngine.playEffect(url,false);
            }
        },
        stopAllEffect:function()
        {
            if(this.isOnSoundEffect)
            {
                cc.audioEngine.stopAllEffects();
            }
        },
        stopMusicBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                cc.audioEngine.stopMusic();
            }
        },
        offSoundEffect:function()
        {
            this.isOnSoundEffect = false;
            cc.audioEngine.stopAllEffects();
        },
        onSoundEffect:function()
        {
            this.isOnSoundEffect = true;
        },
        stopAllSound:function()
        {
            this.stopAllEffect();
            this.stopMusicBackGround();
        }
    }
)/**
 * Created by Admin on 4/4/2017.
 */
