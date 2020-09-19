/**
 * Created by Admin on 3/7/2017.
 */
AvengerAudio = cc.Class.extend(
    {
        nhacNen:"res/Sound/Avenger/background.mp3",
        button:"res/Sound/Avenger/button.mp3",
        btnMiniGame:"res/Sound/Avenger/chon_x_mini_game.mp3",
        damTang:"res/Sound/Avenger/danh_trung.mp3",
        damTruot:"res/Sound/Avenger/danh_truot.mp3",
        nhay:"res/Sound/Avenger/nhay.mp3",
        giaiThuong:"res/Sound/Avenger/giai_thuong.mp3",
        miniGame:"res/Sound/Avenger/mini_game.mp3",
        noHu:"res/Sound/Avenger/no_hu.mp3",
        quay:"res/Sound/Avenger/quay.mp3",
        runItem:"res/Sound/Avenger/run_item.mp3",
        showPopup:"res/Sound/Avenger/show_popup_mini_game.mp3",
        thangLon:"res/Sound/Avenger/thang_lon.mp3",
        wild:"res/Sound/Avenger/wild.mp3",
        mienPhi:"res/Sound/Avenger/mien_phi.mp3",
        lineWin:"res/Sound/Avenger/line_win.mp3",

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
            if(this.isOnSoundEffect && avengerAppear)
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
)