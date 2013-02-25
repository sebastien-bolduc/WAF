/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-18          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.inputs = window.WAF.inputs || {};

// some constant for handling the keyboard keys
window.WAF.inputs.Keys = {};
window.WAF.inputs.Keys.Left = 37;   // Left cursor key
window.WAF.inputs.Keys.Up = 38;     // Up cursor key
window.WAF.inputs.Keys.Right = 39;  // Right cursor key
window.WAF.inputs.Keys.Down = 40;   // Down cursor key
window.WAF.inputs.Keys.Space = 32;  // Space cursor key 
window.WAF.inputs.Keys.a = 65;      // a key
window.WAF.inputs.Keys.r = 82;      // r key
window.WAF.inputs.Keys.s = 83;      // s key
window.WAF.inputs.Keys.w = 87;      // w key

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.Keyboard = function() {
        this.keyboardState = new window.WAF.inputs.KeyboardState();
    };
    
    /**
    * Returns the current keyboard or Chatpad state.
    * 
    * @param
    * @return The state of the keyboard
    */
    namespace.Keyboard.prototype.getState = function()
    {
        return this.keyboardState;
    };
    
    // private methods and properties
    var inputs = window.WAF.inputs;
    
}(window.WAF.inputs = window.WAF.inputs || {}));