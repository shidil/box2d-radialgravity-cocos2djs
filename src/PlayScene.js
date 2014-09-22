/**
 * Created by sdl on 6/6/2014.
 */
var b2Vec2 = Box2D.Common.Math.b2Vec2
    , b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2World = Box2D.Dynamics.b2World
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var PlayScene = cc.Scene.extend({
    // class constants
    GAME_STATE_INITIALIZE :0,
    GAME_STATE_READY : 1,
    GAME_STATE_RUNNING : 2,
    GAME_STATE_OVER : 3,
    // class variables
    world:null,
    gameLayer:null,
    state : null,
    shapesToRemove:[],
    //class methods
    onEnter:function () {
        this._super();
        this.state = this.GAME_STATE_INITIALIZE;

        this.initPhysics();

        this.gameLayer = cc.Layer.create();
        //add three layer in the right order
        this.addChild(new BackgroundLayer(), 0, TagOfLayer.background);
        this.gameLayer.addChild(new WorldLayer(this.world), 0, TagOfLayer.World);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();

        this.state = this.GAME_STATE_READY;
        this.state = this.GAME_STATE_RUNNING;
    },
    initPhysics : function(){
        //1. new world object
        this.world = new b2World(new b2Vec2(0,0));
        this.world.SetContinuousPhysics(true);
        this.shapesToRemove = [];
    },
    update:function (dt) {
        dt = dt>0.2? 0.1:dt;
        if(this.state == this.GAME_STATE_RUNNING){
            this.updateRunning(dt);
        }
        else if(this.state == this.GAME_STATE_OVER){
            this.updateGameOver(dt);
        }
        else if(this.state == this.GAME_STATE_READY){
            this.updateGameReady(dt);
        }

    },
    updateRunning: function(dt){
        // box2d step
        this.world.Step(dt, 8,1);
         /*//Simulation cpworldAddPostStepCallback
         for(var i = 0; i < this.shapesToRemove.length; i++) {
         var shape = this.shapesToRemove[i];
         this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
         }
         this.shapesToRemove = [];*/

        var worldLayer = this.gameLayer.getChildByTag(TagOfLayer.World);
        worldLayer.update(dt);
    },
    updateGameOver: function(dt){

    },
    updateGameReady: function(dt){

    },
    restart: function(){
        cc.log("==Restarting");
        soundManager.restart();
        cc.director.runScene(cc.TransitionFade.create(0.2, new PlayScene(),cc.color(255, 255, 255)));
    }
});