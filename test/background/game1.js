/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-21          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test= window.WAF.test || {};

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
        window.WAF.game.Game.call(this);
    };
    
    // inherits from Game (css)
    var customObject = new window.WAF.utils.CustomObject();
    customObject.extend(window.WAF.game.Game, window.WAF.test.Game1);
    
    /**
     * Allows the game to perform any initialization it needs to before starting to 
     * run.
     * 
     * @param 
     * @return 
     */
    namespace.Game1.prototype.initialize = function() {
        // TODO: Add your initialization logic here
        document.getElementById("element1").innerHTML = "Average frame per second (fps): --";
        document.getElementById("element2").innerHTML = "Average time between frame: -- ms";
        
        // background
        background = new window.WAF.game.css.graphics.BackgroundImage("game", "field");
        
        // call function of super class
        window.WAF.game.Game.prototype.initialize.call(this);
    };
    
    /**
     * Allows the game to run logic such as updating the world, checking for 
     * collisions, gathering input, and playing audio.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return 
     */
    namespace.Game1.prototype.update = function(gameTime) {
        // TODO: Add your update logic here
        fps = gameTime.averageFramePerSecond();
        tbf = gameTime.averageTimeBetweenFrame();
        
        // keyboard...
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {
            background.scrollLeft(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            background.scrollRight(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            background.scrollUp(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            background.scrollDown(5, false);
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.s)) {
            if (this.charmBar.top) {
                this.charmBar.hideTopCharmBar("status");
            } else {
                this.charmBar.showTopCharmBar("status");
            }
        }
        
        // touch...
        var touchState = this.touch.getState();
        if (touchState.hasBeenTouched()) {
            if (this.charmBar.top) {
                this.charmBar.hideTopCharmBar("status");
            } else {
                this.charmBar.showTopCharmBar("status");
            }
        }
        
        // call function of super class
        window.WAF.game.Game.prototype.update.call(this, gameTime);
    };
    
    /**
     * This is called when the game should draw itself.
     * 
     * @param 
     * @return 
     */
    namespace.Game1.prototype.draw = function() {
        // TODO: Add your drawing code here
        document.getElementById("element1").innerHTML = "Average frame per second (fps): " + fps;
        document.getElementById("element2").innerHTML = "Average time between frame: " + tbf + " ms";
        
        // call function of super class
        window.WAF.game.Game.prototype.draw.call(this);
    };
    
    // private methods and properties
    var test = window.WAF.test;
    var fps = 0;
    var tbf = 0;
    var background = null;
    
}(window.WAF.test = window.WAF.test || {}));