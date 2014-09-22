/**
 * Created by sdl on 6/11/2014.
 */
var LevelFactory = cc.Class.extend({
    objects: null,
    name: null,
    width: null,
    height: null,
    ctor: function (proto) {
        this.objects = proto.objects;
    },
    createHero: function (spritesheet,world) {
        var proto = this.objects[0];
        var hero = new Hero(spritesheet,world,cc.p(proto.x,proto.y));
        return hero;
    },
    createTarget: function (spritesheet,world) {
        var proto = this.objects[1];
        var target = new Target(spritesheet,world,cc.p(proto.x,proto.y));
        return target;
    },
    createObjects: function (spritesheet,world) {
        var objects = [];
        var length = this.objects.length;
        for (var i=0;i<length;i++){
            var proto = this.objects[i];
            if(proto.name=='box'){
                var bodyType =  Box2D.Dynamics.b2Body.b2_staticBody;
                if(proto.type=='dynamic') bodyType = Box2D.Dynamics.b2Body.b2_dynamicBody;
                else if(proto.type=='kinematic') bodyType = Box2D.Dynamics.b2Body.b2_kinematicBody;
                var box =  new Box(spritesheet,world,cc.p(proto.x,proto.y),proto.width,proto.height,bodyType);
                if(proto.angle)
                    box.setRotation(proto.angle);
                objects.push(box);
            }
            else if(proto.name=='disc'){
                var bodyType =  Box2D.Dynamics.b2Body.b2_staticBody;
                if(proto.type=='dynamic') bodyType = Box2D.Dynamics.b2Body.b2_dynamicBody;
                else if(proto.type=='kinematic') bodyType = Box2D.Dynamics.b2Body.b2_kinematicBody;
                var ball =  new Ball(spritesheet,world,cc.p(proto.x,proto.y),proto.radius,bodyType);
                if(proto.angle)
                    ball.setRotation(proto.angle);
                objects.push(ball);
            }
        }
        return objects;
    }
});