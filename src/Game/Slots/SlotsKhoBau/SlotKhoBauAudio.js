/**
 * Created by Admin on 2/24/2017.
 */

SlotKhoBauAudio = cc.Class.extend(
    {
        nhacNen:"res/Sound/KhoBau/background.mp3",
        button:"res/Sound/KhoBau/button.mp3",
        clickResultKhoBau:"res/Sound/KhoBau/click_result_kho_bau.mp3",
        lineThang:"res/Sound/KhoBau/line_thang.mp3",
        noHu:"res/Sound/KhoBau/no_hu.mp3",
        quay:"res/Sound/KhoBau/quay.mp3",
        resultBigWin:"res/Sound/KhoBau/result_big_win.mp3",
        resultBonusMiniGame:"res/Sound/KhoBau/result_bonus_mini_game.mp3",
        resultDuongKhoBau:"res/Sound/KhoBau/result_duong_kho_bau.mp3",
        resultGoldMiniGame:"res/Sound/KhoBau/result_gold_mini_game.mp3",
        resultMiniGame:"res/Sound/KhoBau/result_mini_game.mp3",
        resultGiaiThuong:"res/Sound/KhoBau/result_nol.mp3",
        runItem:"res/Sound/KhoBau/run_item.mp3",
        showResultMiniGame:"res/Sound/KhoBau/show_result_mini_game.mp3",
        startMiniGame:"res/Sound/KhoBau/start_mini_game.mp3",
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
        offSoundBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                this.isOnSoundBackGround = false;
                cc.audioEngine.stopMusic();
            }
        },
        soundEffectKhoBau:function(url)
        {
            if(this.isOnSoundEffect && slotKhoBauAppear)
            {
                cc.audioEngine.playEffect(url,false);
            }
        },
        playSoundBackGround:function()
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(this.nhacNen, true);
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
        stopAllSound:function()
        {
            this.stopAllEffect();
            this.stopMusicBackGround();
        },
        onSoundEffect:function()
        {
            this.isOnSoundEffect = true;
        }
    }
)
