/**
 * Created by sdl on 6/6/2014.
 */
var Target = BoxObject.extend({
    TARGET_STATE_IDLE: 0,
    TARGET_STATE_FLY: 1,
    TARGET_STATE_HIT: 2,
    TARGET_RADIUS: 29,
    locked: false,

    // methods
    ctor : function(spritesheet,world,pos){
        this.world = world;
        this.state = this.TARGET_STATE_IDLE;
        //1. create Sprite with a sprite frame name
        this.sprite = cc.Sprite.create("#ring.png");
        this.sprite.setPosition(pos);
        this.makeCircleBody(this.TARGET_RADIUS/2,Box2D.Dynamics.b2Body.b2_staticBody,20,0.88,0.2,pos,0);
        spritesheet.addChild(this.sprite);
        this.body.SetUserData("target");
    },
    victory: function() {
        this.isAlive = false;
        this.sprite = cc.Sprite.create("#ring_victory.png");
    },
    isLocked: function () {
        return this.locked;
    }

});