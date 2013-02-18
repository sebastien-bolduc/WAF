/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-17          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};
window.WAF.game.css = window.WAF.game.css || {};
window.WAF.game.css.graphics = window.WAF.game.css.graphics || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param spriteID ID of the sprite to handle.
     * @return 
     */
    namespace.Sprite = function(spriteID) {
        this.spriteID = spriteID;
        this.x = 0;
        this.y = 0;
    };
    
    /**
     * Translate a sprite.
     * 
     * @param x Translation along the X axis in pixel.
     * @param y Translation along the Y axis in pixel.
     * @return 
     */
    namespace.Sprite.prototype.translateSprite = function(x, y) {
        var sprite = document.getElementById(this.spriteID);
        
        sprite.style["WebkitTransform"] = "translate(" + x + "px," + y + "px)";
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));