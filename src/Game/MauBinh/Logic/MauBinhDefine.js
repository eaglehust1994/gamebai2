/**
 * Created by Tuan on 04-Aug-16.
 */

var MauBinh = {};

MauBinh.CardSuit = {
    SPADE: 0,
    CLUB: 1,
    DIAMOND: 2,
    HEART: 3
};

MauBinh.CardColor = {
    BLACK: 0,
    RED: 1
};

//for Binh Tinh At
MauBinh.GroupKindLevel = {
    THUONG: 0,
    HA: 1,
    BINH_THUONG: 2
};

MauBinh.GroupKind = {
    THUNG_PHA_SANH: 0,
    TU_QUY: 1,
    CU_LU: 2,
    THUNG: 3,
    SANH: 4,
    SAM_CO: 5,
    THU: 6,
    MOT_DOI: 7,
    MAU_THAU: 8
};

MauBinh.Type = {
    SANH_RONG: 0,
    MUOI_BA_CAY_DONG_MAU: 1,
    MUOI_HAI_CAY_DONG_MAU: 2,
    BA_CAI_THUNG: 3,
    BA_CAI_SANH: 4,
    LUC_PHE_BON: 5,
    BINH_THUONG: 6,
    BINH_LUNG: 7

};

MauBinh.PlayerStatus = {
    NO_USER: 0,
    VIEW: 1,
    SIT: 2,
    PLAY: 3
};

MauBinh.GameState = {
    NO_START: 0,
    PLAYING: 1,
    GAME_END: 2
}

MauBinh.Const = {
    NUMBER_OF_CARD_PER_PLAYER: 13,
    MAX_NUMBER_PLAYER: 4
};