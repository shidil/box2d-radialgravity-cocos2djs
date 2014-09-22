/**
 * Created by sdl on 6/10/2014.
 */
var soundManager = cc.Class.extend({});
soundManager.playMusic = function(){
    cc.audioEngine.playMusic(res.bgm_mp3, true);
};
soundManager.victory = function(){
    cc.audioEngine.playEffect(res.victory_mp3);
};
soundManager.restart = function(){
    cc.audioEngine.playEffect(res.restart_mp3);
};
soundManager.bounce = function(){
    cc.audioEngine.playEffect(res.bounce_mp3);
};
soundManager.click = function(){
    cc.audioEngine.playEffect(res.ui_click_mp3);
};