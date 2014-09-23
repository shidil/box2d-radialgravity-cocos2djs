/**
 * Created by sdl on 6/6/2014.
 */
var currentLevel = 1;
var heroBall = null;
var target = null;
var X1 = null,
    X2 = null,
    Y1 = null,
    Y2 = null;
var ballReady = null,
    heroOrigin = null,
    heroOld = null,
    heroOldSprite= null,
    heroPoints =[],
    vectorMade = null,
    shotPower = null;
var WORLD_WIDTH = 800;
var WORLD_HEIGHT = 480;
var contactListner = null;
var levelFactory = null;
var objects = null;
var WorldLayer = cc.Layer.extend({
    // Constants
    WORLD_STATE_RUNNING: 0,
    WORLD_STATE_OVER: 1,
    WORLD_WIDTH: 480,
    WORLD_HEIGHT: 320,
    state: null,
    spriteSheet: null,
    originSprite: null,
    drawer: null,
    heroPointsDrawer: null,
    world: null,
    objects: null,
    //class methods
    ctor: function (world) {
        this._super();
        this.world = world;
        ballReady = false;

        // Create Debug Draw
        //this._debugNode = cc.PhysicsDebugNode.create(this.world);
        //this.addChild(this._debugNode, 10);
        objects = [];
        this.init();

    },
    init: function () {
        this._super();
        heroOld = cc.p(-100, -100);
        this.drawer = cc.DrawNode.create();
        this.heroPointsDrawer = cc.DrawNode.create();
        this.addChild(this.drawer);
        this.addChild(this.heroPointsDrawer);
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.game_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.game_png);
        this.addChild(this.spriteSheet);
        //
        heroOldSprite = cc.Sprite.create("#ball_trace.png");
        heroOldSprite.setPosition(heroOld);
        this.spriteSheet.addChild(heroOldSprite);

        // add game objects
        heroOrigin = cc.p(-150, -150);

        //
        this.originSprite = cc.Sprite.create("#origin.png");
        this.originSprite.setPosition(heroOrigin);
        this.spriteSheet.addChild(this.originSprite);
        this.state = this.WORLD_STATE_RUNNING;

        // Handle Touch
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        contactListner = new Box2D.Dynamics.b2ContactListener();
        contactListner.BeginContact = this.BeginContact;
        this.world.SetContactListener(contactListner);

        // load level
        this.loadLevel();
        var plan = new Planet(this.spriteSheet,this.world,cc.p(460,240),60, Box2D.Dynamics.b2Body.b2_staticBody);
        objects.push(plan);
    },
    loadLevel: function () {
        var txt = cc.loader._loadTxtSync("res/levels/" + currentLevel);
        var proto = JSON.parse(txt);
        levelFactory = new LevelFactory(proto);
        heroBall = levelFactory.createHero(this.spriteSheet, this.world);
        target = levelFactory.createTarget(this.spriteSheet, this.world);
        objects = levelFactory.createObjects(this.spriteSheet,this.world);
            heroOrigin = heroBall.getPosition();
        this.originSprite.setPosition(heroOrigin);

    },
    BeginContact: function (contact) {
        var fixtureA = contact.GetFixtureA();
        var fixtureB = contact.GetFixtureB();
        var nameA = fixtureA.GetBody().GetUserData();
        var nameB = fixtureB.GetBody().GetUserData();
        cc.log("contact: " + nameA + ", " + nameB);
        if (nameA == "hero" && nameB == "target") {
            if (!target.isLocked()) {
                contact.SetEnabled(false);
                soundManager.victory();
                heroBall.victory();
                target.victory();
                currentLevel++;
            }
        }
        else if (nameA == "target" && nameB == "hero") {
            if (!target.isLocked()) {
                contact.SetEnabled(false);
                soundManager.victory();
                heroBall.victory();
                target.victory();
                currentLevel++;
            }
        }
        else {
            soundManager.bounce();
        }
    },
    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        var x = pos.x;
        var y = pos.y;
        cc.log("TouchDown x: " + pos.x + " y: " + pos.y);
        if (x < heroBall.getX() + heroBall.BALL_RADIUS * 4
            && x > heroBall.getX() - heroBall.BALL_RADIUS * 4
            && y < heroBall.getY() + heroBall.BALL_RADIUS * 4
            && y > heroBall.getY() - heroBall.BALL_RADIUS * 4) {
            if (!heroBall.isFlying()) {
                X1 = heroBall.getX();
                Y1 = heroBall.getY();
                X2 = X1;
                Y2 = Y1;
                ballReady = true;
                cc.log("Ball Touched ");
                return true;
            }
        }
        else{
            var ball = new Ball(heroBall.spriteSheet,heroBall.world,pos,6,Box2D.Dynamics.b2Body.b2_dynamicBody);
            objects.push(ball)
        }
        return false;
    },

    onTouchMoved: function (touch, event) {

        if (ballReady) {
            cc.log("Ball Dragged ");
            var pos = touch.getLocation();
            var x = pos.x;
            var y = pos.y;
            X2 = x;
            Y2 = y;
            var angle;
            var dist_x = X2 - heroOrigin.x;
            var dist_y = Y2 - heroOrigin.y;
            var distance = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
            if (distance > 100) {
                angle = Math.atan2(dist_y, dist_x);
                X2 = (heroOrigin.x + 100 * Math.cos(angle));
                Y2 = (heroOrigin.y + 100 * Math.sin(angle));
            }
            // Store value to reduce number of calculations
            // Update VectorMade
            vectorMade = new b2Vec2(X2 - X1, Y2 - Y1);
            shotPower = vectorMade.Length();
            // Normalise vector to yield only directional info
            vectorMade.Normalize();
            {
                if (shotPower > 10)
                    heroBall.setPosition(cc.p(X2, Y2));
            }
        }
        return false;
    },

    onTouchEnded: function (touch, event) {
        var pos = touch.getLocation();
        if (shotPower < 10 || !ballReady) {
            ballReady = false;
        } else if (ballReady) {
            cc.log("Fire!! " + shotPower);
            heroOldSprite.setPosition(heroOld);
            heroBall.shoot(shotPower, vectorMade);
            shotPower = 0;
            heroOld = cc.p(X2, Y2);
            X1 = 0;
            X2 = 0;
            Y1 = 0;
            Y2 = 0;
            ballReady = false;
            return true;
        }
        return false;
    },
    update: function (dt) {
        //this._super();
        if (this.state == this.WORLD_STATE_RUNNING) {

            this.originSprite.setPosition(heroOrigin);
            this.drawer.clear();
            this.drawer.drawSegment(cc.p(X1, Y1), cc.p(X2, Y2), 1, cc.color(50, 50, 50, 180));
            var size = heroPoints.length;
            this.heroPointsDrawer.clear();
            for(var i=0;i<size;i++){
                this.heroPointsDrawer.drawDot(heroPoints[i], 1, cc.color(64, 95, 85, 225));
            }
            // update meter
            //var statusLayer = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
            //statusLayer.updateMeter((plane.getPosition().x - g_planeStartX) / 2);
            this.updateObjects(dt);
        }
    },
    updateObjects: function (dt) {
        if (heroBall.getX() - 30 > WORLD_WIDTH) {
            this.state = this.GAME_STATE_OVER;
            this.getParent().getParent().restart();
            return;
        } else if (heroBall.getX() + 30 < 0) {
            this.state = this.GAME_STATE_OVER;
            this.getParent().getParent().restart();
            return;
        } else if (heroBall.getY() - 30 > WORLD_HEIGHT) {
            this.state = this.GAME_STATE_OVER;
            this.getParent().getParent().restart();
            return;
        } else if (heroBall.getY() + 30 < 0) {
            this.state = this.GAME_STATE_OVER;
            this.getParent().getParent().restart();
            return;
        }
        heroBall.update(dt);
        target.update(dt);
        var length = objects.length;
        for (var i=0;i<length;i++){
            objects[i].update(dt);
        }
    }
});