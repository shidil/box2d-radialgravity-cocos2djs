/**
 * Created by sdl on 6/6/2014.
 */
var Hero = BoxObject.extend({
    BALL_STATE_IDLE: 0,
    BALL_STATE_FLY: 1,
    BALL_STATE_HIT: 2,
    BALL_RADIUS: 18,

    flyAction:null,
    idleAction:null,
    winAction:null,
    velocity:null,
    spriteSheet: null,
    // methods
    ctor : function(spritesheet,world,pos){
        this.world = world;
        this.spriteSheet = spritesheet;
        this.state = this.BALL_STATE_IDLE;
        heroPoints = [];
        //1. create Sprite with a sprite frame name
        this.sprite = cc.Sprite.create("#ball.png");
        this.sprite.setPosition(pos);
        this.makeCircleBody(this.BALL_RADIUS,Box2D.Dynamics.b2Body.b2_kinematicBody,4,0,2,pos,0);
        //this.sprite.runAction(this.flyAction);
        spritesheet.addChild(this.sprite);
        this.body.SetUserData("hero");
    },
    victory: function() {
        cc.log("Removing Body");
        this.isAlive=false;
    },
    shoot: function(shotPower,vectorMade) {
        var angle = Math.atan2(vectorMade.y, vectorMade.x);
        this.body.SetType(Box2D.Dynamics.b2Body.b2_dynamicBody);
        var vX = -(shotPower / 12) *  Math.cos(angle);
        var vY = -(shotPower / 12) *  Math.sin(angle);
        this.body.SetLinearVelocity(new b2Vec2(vX, vY));
        this.body.SetLinearDamping(0.14);
        this.body.SetAngularDamping(0.64);
        this.state = this.BALL_STATE_FLY;
        heroPoints = [];
    },
    isFlying: function () {
        return (this.state==this.BALL_STATE_FLY);
    },
    update: function(dt){
        this._super(dt);
        if(this.isFlying()){
            heroPoints.push(this.getPosition());
        }
    }

});