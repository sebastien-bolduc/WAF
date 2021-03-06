/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-16          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};
window.WAF.game.css = window.WAF.game.css || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
    * Constructor.
    * 
    * @param 
    * @return 
    */
    namespace.Game = function() {
    };
    
    /**
    * Allows the game to perform any initialization it needs to before starting to 
    * run.
    * 
    * @param 
    * @return 
    */
    namespace.Game.prototype.initialize = function() { 
    };
    
    /**
    * Called when the game has determined that game logic needs to be processed. 
    * This might include the management of the game state, the processing of user 
    * input, or the updating of simulation data. Override this method with 
    * game-specific logic.
    * 
    * @param 
    * @return 
    */
    namespace.Game.prototype.update = function() {
    };
    
    /**
    * Called when the game determines it is time to draw a frame. Override this 
    * method with game-specific rendering code.
    * 
    * @param 
    * @return 
    */
    namespace.Game.prototype.draw = function() {
    };
    
    /**
    * Call this method to initialize the game, begin running the game loop, and 
    * start processing events for the game.
    * 
    * @param 
    * @return
    */
    namespace.Game.prototype.run = function()
    {
        this.initialize();
        this.tick();
    };
    
    /**
    * Game loop.
    * 
    * @param 
    * @return 
    */
    namespace.Game.prototype.tick = function()
    {
        // we call the game loop with "this" object
        var self = this;
    
        this.update();
        this.draw();
        
        // complete update and draw before requesting another frame
        // (note: callback is called later as a callback, not executed immediately)
        window.requestAnimationFrame(function() {self.tick();});
        //window.setTimeout(function() {self.tick();}, 1000/60);
    };
    
    // private methods and properties
    var css = window.WAF.game.css;
    
}(window.WAF.game.css = window.WAF.game.css || {}));