/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-25          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.audio = window.WAF.audio || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param tune Tune to be loaded.
     * @return 
     */
    namespace.Music = function(tune) {
        this.audio = new Audio();
        this.audio.src = tune;
        this.audio.preload = "auto";
        this.audio.loop = true;
        
        this.playing = false;
    };
    
    /**
     * Play a music.
     * 
     * @param 
     * @return 
     */
    namespace.Music.prototype.play = function()
    {
        this.audio.play();
        this.playing = true;
    };
    
    /**
     * Pause a music.
     * 
     * @param 
     * @return 
     */
    namespace.Music.prototype.pause = function()
    {
        this.audio.pause();
        this.playing = false;
    };
    
    // private methods and properties
    var audio = window.WAF.audio;
    
}(window.WAF.audio = window.WAF.audio || {}));