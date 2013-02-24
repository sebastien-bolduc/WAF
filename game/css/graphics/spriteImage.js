/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-22          (the version of the package this class was first added to)
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
     * @param containedByElement ID of the element this sprite is 'contained' by.
     * @param spriteID           ID of the sprite to handle.
     * @param image              Image associated with the sprite.
     * @return 
     */
    namespace.SpriteImage = function(containedByElement, spriteID, image) {
        document.getElementById(containedByElement).innerHTML += '<div id="' + spriteID + '" class="' + image + '"></div>';
        
        this.id = spriteID;
        this.x = 0;
        this.y = 0;
        this.width = document.getElementById(this.id).scrollWidth;      // hack to get sprite dimension
        this.height = document.getElementById(this.id).scrollHeight;
        this.size = 1;
        this.rotation = 0;
    };
    
    /**
     * Translate a sprite.
     * 
     * @param x Translation along the X axis in pixel.
     * @param y Translation along the Y axis in pixel.
     * @return 
     */
    namespace.SpriteImage.prototype.translate = function(x, y) {
        this.x = x;
        this.y = y;
    };
    
    /**
     * Scale a sprite.
     * 
     * @param x Scale sprite by a factor of x.
     * @return
     */
    namespace.SpriteImage.prototype.scale = function(x) {
        this.size = x;            
    };
    
    /**
     * Rotate a sprite.
     * 
     * @param x Rotate sprite of x degree.
     * @return
     */
    namespace.SpriteImage.prototype.rotate = function(x) {
        this.rotation = x;            
    };
    
    /**
     * Draw a sprite.
     * 
     * @param
     * @return
     */
    namespace.SpriteImage.prototype.draw = function() {
        var sprite = document.getElementById(this.id);
        
        sprite.style.WebkitTransform = "translate(" + this.x + "px," + this.y + "px)";
        if (this.size != 1) {
            sprite.style.WebkitTransform += " scale(" + this.size + ")";
        }
        if (this.rotation !== 0) {
            sprite.style.WebkitTransform += " rotate(" + this.rotation + "deg)";
        }
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));