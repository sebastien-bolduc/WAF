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
     * @param soundEffect Sound effect to be loaded.
     * @return 
     */
    namespace.SoundEffect = function(soundEffect) {
        this.audio = new Audio();
        this.audioChannels = [];
        this.channel = 0;
        this.audio.src = soundEffect;
        this.audio.preload = "auto";
         
        this.setAudioChannels();
    };
    
    /**
     * Set sound channels (to play sound multiple time).
     * 
     * @param 
     * @return 
     */
    namespace.SoundEffect.prototype.setAudioChannels = function()
    {
        for (var i = 0; i < 5; i++)
        {
            this.audioChannels.push(new Audio());
            this.audioChannels[i].src = this.audio.src;
            this.audioChannels[i].preload = this.audio.preload;
        }
    };
    
    /**
     * Plays a sound.
     * 
     * @param 
     * @return 
     */
    namespace.SoundEffect.prototype.play = function()
    {
        this.audioChannels[this.channel].play();
        this.channel = (this.channel == 4) ? 0 : this.channel + 1;
    };
    
    // private methods and properties
    var audio = window.WAF.audio;
    
}(window.WAF.audio = window.WAF.audio || {}));