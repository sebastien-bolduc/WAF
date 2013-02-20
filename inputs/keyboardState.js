/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-18          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.inputs = window.WAF.inputs || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.KeyboardState = function() {
        this.isKeyPressed = [256];
        this.isKeyPressedOnce = [256];

        for (var i=0; i<256; i++) {
            this.isKeyPressed[i] = false;
            this.isKeyPressedOnce[i] = false;
        }
        
        // register callback function for keyboard event
        var self = this;
        document.onkeydown = function(event){self.handleKeyDown(event);};
        document.onkeyup = function(event){self.handleKeyUp(event);};
    };
    
    /**
     * Put a key to true when stroke down.
     * 
     * @param event Event relating to keyboard strokes
     * @return 
     */
    namespace.KeyboardState.prototype.handleKeyDown = function(event) {
        this.isKeyPressed[event.keyCode] = true;
    };

    /**
     * Put a key to false when release.
     * 
     * @param event Event relating to keyboard strokes.
     * @return 
     */
    namespace.KeyboardState.prototype.handleKeyUp = function(event) {
        this.isKeyPressed[event.keyCode] = false;
    };
    
    /**
     * Returns whether a specified key is currently being pressed.
     * 
     * @param key Char code of the key to check.
     * @return {boolean} Key pressed or not
     */
    namespace.KeyboardState.prototype.isKeyDown = function(key) {
        return this.isKeyPressed[key];
    };

    /**
     * Returns whether a specified key is currently being pressed (once).
     * 
     * @param key Char code of the key to check.
     * @return {boolean} Key pressed or not
     */
    namespace.KeyboardState.prototype.isKeyDownOnce = function(key) {
        if (this.isKeyPressed[key] === true && this.isKeyPressedOnce[key] === false) {
            this.isKeyPressedOnce[key] = true;
            return true;
        } else if (this.isKeyPressed[key] === false && this.isKeyPressedOnce[key] === true) {
            this.isKeyPressedOnce[key] = false;
            return false;
        } else {
            return false;
        }
    };
    
    // private methods and properties
    var inputs = window.WAF.inputs;
    
}(window.WAF.inputs = window.WAF.inputs || {}));