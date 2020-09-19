/**
 * Created by Admin on 2/28/2017.
 */
baseUrlSoundNDV = "res/Sound/NuDiepVien/";
NuDiepVienAudio = cc.Class.extend(
    {
        nhacNen: baseUrlSoundNDV + "background.mp3",
        button: baseUrlSoundNDV +"button.mp3",
        clickResultKhoBau: baseUrlSoundNDV +"click_result_kho_bau.mp3",
        lineThang: baseUrlSoundNDV +"line_thang.mp3",
        noHu: baseUrlSoundNDV +"no_hu.mp3",
        quay: baseUrlSoundNDV +"quay.mp3",
        resultBigWin: baseUrlSoundNDV +"result_big_win.mp3",
        resultBonusMiniGame: baseUrlSoundNDV +"result_bonus_mini_game.mp3",
        resultDuongKhoBau: baseUrlSoundNDV +"result_duong_kho_bau.mp3",
        resultGoldMiniGame: baseUrlSoundNDV +"result_gold_mini_game.mp3",
        resultMiniGame: baseUrlSoundNDV +"result_mini_game.mp3",
        resultGiaiThuong: baseUrlSoundNDV +"result_nol.mp3",
        runItem: baseUrlSoundNDV +"run_item.mp3",
        showResultMiniGame: baseUrlSoundNDV +"show_result_mini_game.mp3",
        startMiniGame: baseUrlSoundNDV +"click_result_kho_bau.mp3",
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
        soundEffectKhoBau:function(url)
        {
            if(this.isOnSoundEffect && nuDiepVienAppear)
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
        stopAllSound:function()
        {
            this.stopAllEffect();
            this.stopMusicBackGround();
        }
        ,
        onSoundEffect:function()
        {
            this.isOnSoundEffect = true;
        }
    }
)