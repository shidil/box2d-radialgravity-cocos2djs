/**
 * Created by sdl on 6/6/2014.
 */
var Planet = BoxObject.extend({
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
        this.makeCircleBody(this.BALL_RADIUS,type,20,0,4,pos,0);
        spritesheet.addChild(this.sprite);
        this.body.SetUserData("planet");
    },
    update: function (dt) {
        this._super(dt);this.world.ClearForces();
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()){

            //if(b.GetUserData()!='ball') return;
            var ground = this.body;
            var circle = this.body.GetFixtureList();
            circle = circle.GetShape();
            // Get position of our "Planet"
            var  center = ground.GetWorldPoint(circle.m_p);
            // Get position of our current body in the iteration
            var position = b.GetPosition();
            // Get the distance between the two objects.
            var d = center.Copy();
            d.Subtract( position);
            // The further away the objects are, the weaker the gravitational force is
            if(d.Length()*PMR>800) return;
            var force = 20 / d.LengthSquared(); // 150 can be changed to adjust the amount of force
            d.Normalize();
            d.Multiply(force);
            // Finally apply a force on the body in the direction of the "Planet"
            b.ApplyForce(d, position);

        }
    }

});