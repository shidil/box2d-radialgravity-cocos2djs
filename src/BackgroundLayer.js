/**
 * Created by sdl on 6/6/2014.
 */
var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();

        //create the background image and position it at the center of screen
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var spriteBG = cc.Sprite.create(res.background);
        spriteBG.setPosition(cc.p(0,0));
        spriteBG.setAnchorPoint(0,0);
        this.addChild(spriteBG);
    }
});