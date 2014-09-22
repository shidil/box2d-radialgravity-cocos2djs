/**
 * Created by sdl on 6/6/2014.
 */
var Box = BoxObject.extend({


    // methods
    ctor : function(spritesheet,world,pos,width,height,type){
        this.world = world;
        this.state = this.BALL_STATE_IDLE;
        //1. create Sprite with a sprite frame name
        this.sprite = cc.Sprite.create("#box.png");
        this.sprite.setPosition(pos);
        this.sprite.setScale(width/100,height/100);
        this.makeBoxBody(width,height,type,20,0.88,0.2,pos,0);
        spritesheet.addChild(this.sprite);
        this.body.SetUserData("box");
    }

});