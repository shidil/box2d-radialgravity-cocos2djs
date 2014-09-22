/**
 * Created by sdl on 6/6/2014.
 */
var StatusLayer = cc.Layer.extend({
    labelCoin:null,
    labelMeter:null,
    coins:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();
        //6.create a menu and assign onPlay event callback to it
        var menuItemRestart= cc.MenuItemSprite.create(
            cc.Sprite.create(res.close_png), // normal state image
            cc.Sprite.create(res.close_s_png), //select state image
            this.onRestart, this);
        menuItemRestart.setPosition(cc.p(240,200));
        var menu1 = cc.Menu.create(menuItemRestart);  //7. create the menu
        menu1.setPosition(cc.p(400,240));
        this.addChild(menu1);

       this.labelCoin = cc.LabelBMFont.create("Coins:0",res.arial_14_fnt);
        this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelCoin.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCoin);

        this.labelMeter = cc.LabelBMFont.create("0M", res.arial_14_fnt);
        this.labelMeter.setColor(cc.color(0,0,0));//black color
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);
    },
    updateMeter:function (px) {
      this.labelMeter.setString(parseInt(px / 10) + "M");
    },
    onRestart : function(){
        cc.log("==restart clicked");
        this.getParent().restart();
    }
});