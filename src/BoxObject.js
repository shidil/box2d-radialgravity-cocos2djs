/**
 * Created by sdl on 6/11/2014.
 */
var PMR = 100;
var BoxObject = cc.Class.extend({

    world:null,
    body:null,
    sprite:null,
    shape:null,
    state: null,
    stateTime: 0,
    runTime: 0,
    isAlive: true,
    ctor : function(spritesheet,world,pos){
        this.world = world;
    },
    makeCircleBody: function(radius,bodyType,density,restitution,friction,pos,angle){
        var bodyDef = new b2BodyDef();
        bodyDef.type = bodyType;
        bodyDef.position.Set(pos.x/PMR, pos.y/PMR);
        bodyDef.angle = cc.degreesToRadians(angle);
        this.body = this.world.CreateBody(bodyDef);
        this.shape = new b2CircleShape();
        this.shape.SetRadius(radius/PMR);
        var fixDef = new b2FixtureDef();
        fixDef.shape=this.shape;
        fixDef.density=density;
        fixDef.friction=friction;
        fixDef.restitution = restitution;
        this.body.CreateFixture(fixDef);
    },
    makeBoxBody: function(width,height,bodyType,density,restitution,friction,pos,angle){
        var bodyDef = new b2BodyDef();
        bodyDef.type = bodyType;
        bodyDef.position.Set(pos.x/PMR, pos.y/PMR);
        bodyDef.angle = cc.degreesToRadians(angle);
        this.body = this.world.CreateBody(bodyDef);
        this.shape = new b2PolygonShape();
        width=width/2;
        height=height/2;
        this.shape.SetAsBox(width/PMR,height/PMR)
        var fixDef = new b2FixtureDef();
        fixDef.shape=this.shape;
        fixDef.density=density;
        fixDef.friction=friction;
        fixDef.restitution = restitution;
        this.body.CreateFixture(fixDef);
    },
    makePolygonBody: function (verts,bodyType,density,restitution,friction,pos,angle) {
        var bodyDef = new b2BodyDef();
        bodyDef.type = bodyType;
        bodyDef.position.Set(pos.x/PMR, pos.y/PMR);
        bodyDef.angle = cc.degreesToRadians(angle);
        this.body = this.world.CreateBody(bodyDef);
        this.shape = new b2PolygonShape();
        this.shape.SetAsArray(verts);
        var fixDef = new b2FixtureDef();
        fixDef.shape=this.shape;
        fixDef.density=density;
        fixDef.friction=friction;
        fixDef.restitution = restitution;
        this.body.CreateFixture(fixDef);
    },
    update: function (dt) {
        this.stateTime++;
        this.runTime++;
        if(this.sprite!=null&&this.isAlive){
            this.sprite.setPosition(this.getPosition());
            this.sprite.setRotation(this.getRotation());
        }
    },
    getPosition:function () {
        var pos = this.body.GetPosition();
        return cc.p(pos.x * PMR, pos.y * PMR);
    },
    getX: function () {
        return this.getPosition().x;
    },
    getY: function () {
        return this.getPosition().y;
    },
    setPosition:function (p) {
        this.body.SetPosition(new b2Vec2(p.x / PMR, p.y / PMR));
        if(this.sprite!=null){
            //this.sprite.setPosition(this.getPosition());
        }
    },
    getRotation:function () {
        return cc.radiansToDegrees(this.body.GetAngle());
    },
    setRotation:function (r) {
        this.body.SetAngle(cc.degreesToRadians(r));
        if(this.sprite!=null){
            //this.sprite.setRotation(this.getRotation());
        }
    },
    getBody:function () {
        return this.body;
    },
    removeFromParent:function () {
        this.world.RemoveBody(this.body);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    }
});