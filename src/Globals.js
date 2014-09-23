/**
 * Created by sdl on 6/6/2014.
 */
var g_planeStartX = 100;

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.World = 1;
    TagOfLayer.Status = 2;
    TagOfLayer.Over = 3;
};

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.ball = 0;
    SpriteTag.target = 1;
    SpriteTag.box = 2;
    SpriteTag.disc = 3;
    SpriteTag.wall = 4;
};
