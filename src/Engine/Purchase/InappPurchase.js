/**
 * Created by Admin on 12/10/2016.
 */

var IAPManaggger = cc.Class.extend({
    ctor: function () {

        this._target = null
        this._selector = null
    },

    setTarget: function (target, selector) {
        this._target = target;
        this._selector = selector;
    },

    // khi connect server thi goi hen
    checkItemWhenMinigameConnected: function()
    {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            jsb.reflection.callStaticMethod("vinplay/utils/VinplayPurchase", "checkItem", "()V");
        }
    },
    // khi clcik button thi goi
    purchase: function(sku,userID)
    {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            jsb.reflection.callStaticMethod("vinplay/utils/VinplayPurchase", "purchaseVin", "(Ljava/lang/String;Ljava/lang/String;)V",sku+"",userID+"");
        }
        else if(cc.sys.os == cc.sys.OS_IOS){
            engine.HandlerManager.getInstance().addHandler("iap", this.onPurchaseHandle.bind(this));
            //jsb.reflection.callStaticMethod("vinplay/utils/VinplayPurchase", "purchaseVin", "(Ljava/lang/String;Ljava/lang/String;)V",sku+"",userID+"");
            jsb.reflection.callStaticMethod("ObjCVinplay", "purchase:uData:",sku + "",userID + "");
        }
    },
    // goi khi muon close item
    closeItem: function(sku)
    {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            engine.HandlerManager.getInstance().addHandler("closeItem", this.onCloseItemCallback.bind(this));
            jsb.reflection.callStaticMethod("vinplay/utils/VinplayPurchase", "closeItem", "(Ljava/lang/String;)V",sku+"");
        }
    },
    onCloseItemCallback: function(errorCode,message)
    {

    },

    // dc goi khi thuc hien giao dich voi google
    onPurchaseGG: function(errorCode,signedData,signature,purchaseData)
    {
        if (this._selector && this._target)
            this._selector.call(this._target,errorCode, signedData,signature,purchaseData);
    },


    // call back from handler manager , parse to get signedData,signature,purchaseData
    onPurchaseHandle: function(jdata)
    {
        var obj = JSON.parse(jdata);
        this.onPurchaseGG(obj["error"],obj["signedData"],obj["signature"],obj["purchaseData"]);
    }

})

