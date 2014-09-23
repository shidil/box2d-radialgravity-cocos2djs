/**
 * Created by sdl on 6/7/2014.
 */
var GameOverLayer = cc.Layer.extend({
    // constructor
    ctor: function () {
        this._super();
        //cc.associateWithNative( this, cc.LayerColor );
        this.init();
    },
    init: function () {
        //this._super(cc.c(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = cc.MenuItemSprite.create(
            cc.Sprite.create(res.play_normal_png),
            cc.Sprite.create(res.play_selected_png),
            this.onRestart, this);
        var menu = cc.Menu.create(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onRestart: function (sender) {
        cc.director.resume();
        cc.director.runScene(new PlayScene());
    }
});