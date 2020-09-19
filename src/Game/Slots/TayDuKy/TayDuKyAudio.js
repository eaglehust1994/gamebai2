/**
 * Created by Admin on 2/28/2017.
 */
var baseUrlSoundVQV = "res/Sound/VuongQuocVin/";
TayDuKyAudio = cc.Class.extend(
    {
        nhacNen1: baseUrlSoundVQV + "background1.mp3",
        nhacNen2: baseUrlSoundVQV + "background2.mp3",
        nhacNenLobby: baseUrlSoundVQV + "bg_lobby.mp3",
        nhacNenMiniGame: baseUrlSoundVQV + "background_minigame.mp3",
        vangRoi: baseUrlSoundVQV + "vang_roi.mp3",
        button: baseUrlSoundVQV +"button.mp3",
        clickResultKhoBau: baseUrlSoundVQV +"click_result_kho_bau.mp3",
        lineThang: baseUrlSoundVQV +"line_thang.mp3",
        noHu: baseUrlSoundVQV +"no_hu.mp3",
        quay: baseUrlSoundVQV +"quay.mp3",
        resultBigWin: baseUrlSoundVQV +"result_big_win.mp3",
        resultBonusMiniGame: baseUrlSoundVQV +"result_bonus_mini_game.mp3",
        resultDuongKhoBau: baseUrlSoundVQV +"result_duong_kho_bau.mp3",
        resultGoldMiniGame: baseUrlSoundVQV +"result_gold_mini_game.mp3",
        resultMiniGame: baseUrlSoundVQV +"result_mini_game.mp3",
        resultGiaiThuong: baseUrlSoundVQV +"result_nol.mp3",
        runItem: baseUrlSoundVQV +"run_item.mp3",
        showResultMiniGame: baseUrlSoundVQV +"show_result_mini_game.mp3",
        startMiniGame: baseUrlSoundVQV +"click_result_kho_bau.mp3",
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
            cc.audioEngine.playMusic(this.nhacNen1, true);

        },
        playSoundBackGroundLoop:function(url)
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(url, true);
            }
        },
        playSoundBackGround:function(url,loop)
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(url, loop);
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
            if(this.isOnSoundEffect && vuongQuocVinAppear)
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