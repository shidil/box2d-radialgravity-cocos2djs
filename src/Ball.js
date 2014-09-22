/**
 * Created by sdl on 6/6/2014.
 */
var Ball = BoxObject.extend({
    BALL_STATE_IDLE: 0,
    BALL_STATE_FLY: 1,
    BALL_STATE_HIT: 2,
    BALL_RADIUS: 60,


    // methods
    ctor : function(spritesheet,world,pos,radius,type){
        this.world = world;
        this.state = this.BALL_STATE_IDLE;
        if(radius)
            this.BALL_RADIUS = radius-2;
        //1. create Sprite with a sprite frame name
        this.sprite = cc.Sprite.create("#disc.png");
        this.sprite.setPosition(pos);
        var width = radius*2;
        this.sprite.setScale(width/408,width/408);
        this.makeCircleBody(this.BALL_RADIUS,type,3,0,2,pos,0);
        spritesheet.addChild(this.sprite);
        this.body.SetUserData("ball");
    }

});