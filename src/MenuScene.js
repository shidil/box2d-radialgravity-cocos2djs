var MenuLayer = cc.Layer.extend({
    spriteSheet: null,
    ctor: function () {
        // call super class's ctor function
        this._super();
    },
    init: function () {
        // call super class's super function
        this._super();
        //add background music
        soundManager.playMusic();
        // get window size
        var winSize = cc.director.getWinSize();
        // calculate center point
        var centerPoint = cc.p(winSize.width/2,winSize.height/2);
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.menu_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.menu_png);
        this.addChild(this.spriteSheet);

        // create background image and position it on screen center
        var spriteBg = cc.Sprite.create(res.background);
        spriteBg.setPosition(cc.p(0,0));
        spriteBg.setAnchorPoint(0,0);
        this.addChild(spriteBg);


        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= cc.MenuItemSprite.create(
            cc.Sprite.create("#play.png"), // normal state image
            cc.Sprite.create("#play_pressed.png"), //select state image
            this.onPlay, this);
        var menu = cc.Menu.create(menuItemPlay);  //7. create the menu
        menu.setPosition(cc.p(centerPoint.x,centerPoint.y-50));
        this.addChild(menu);

        // create title sprite
        var spriteTitle = cc.Sprite.create("#title.png");
        spriteTitle.setPosition(cc.p(centerPoint.x,centerPoint.y+100));
        this.addChild(spriteTitle);
    },
    onPlay : function(){
        cc.log("==onplay clicked");
        soundManager.click();
        cc.director.runScene(cc.TransitionFade.create(0.2, new PlayScene(),cc.color(255, 255, 255)));
    }

});
var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});