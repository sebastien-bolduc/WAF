/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-17          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
    * Constructor.
    * 
    * @param 
    * @return 
    */
    namespace.Game1 = function() {
        // call constructor of super class
        game.css.Game.call(this);
    };
    
    // inherits from Game (css)
    var customObject = new window.WAF.CustomObject();
    customObject.extend(window.WAF.game.css.Game, window.WAF.game.Game1);
    
    /**
    * Allows the game to perform any initialization it needs to before starting to 
    * run.
    * 
    * @param 
    * @return 
    */
    namespace.Game1.prototype.initialize = function() {
        document.getElementById("element1").innerHTML = "Frame per seconds: --";
        alert("test initialize"); 
    };
    
    /**
    * Allows the game to run logic such as updating the world, checking for 
    * collisions, gathering input, and playing audio.
    * 
    * @param 
    * @return 
    */
    namespace.Game1.prototype.update = function() {
        var time = new Date().getTime();
        
        if (lastTime === 0) {
            fps = 0;
        } else {
            fps = 1000 / (time - lastTime);
        }
        
        lastTime = time;
    };
    
    /**
    * This is called when the game should draw itself.
    * 
    * @param 
    * @return 
    */
    namespace.Game1.prototype.draw = function() {
        document.getElementById("element1").innerHTML = "Frame per seconds: " + fps;
    };
    
    // private methods and properties
    var game = window.WAF.game;
    var fps = 0;
    var lastTime = 0;
    
}(window.WAF.game = window.WAF.game || {}));