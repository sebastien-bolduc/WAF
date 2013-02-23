/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-22          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test = window.WAF.test || {};
window.WAF.test.collision = window.WAF.test.collision || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.Mario = function() {
        spriteList = [];
        spriteList.push(new window.WAF.game.css.graphics.SpriteImage("backgroundField", "spriteMario", "mario"));
        
        this.x = 0;
        this.y = 0;
        this.width = spriteList[0].width;
        this.height = spriteList[0].height;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, spriteList[0].width, spriteList[0].height);
    };
    
    /**
     * Check the hitbox of the sprite for collision.
     * 
     * @param hitboxList List of hitbox to compare to.
     * @return
     */
    namespace.Mario.prototype.checkHitbox = function(hitboxList) {
        var x = this.hitbox.x;  // last position of hitbox
        var y = this.hitbox.y;
        
        this.hitbox.translate(this.x, this.y);
        for (var i=0; i<hitboxList.length; i++) {
            if (this.hitbox.intersects(hitboxList[i])) {
                this.x = x;
                this.y = y;
                this.hitbox.translate(this.x, this.y);
                break;
            }
        }
    }
    
    /**
     * Draw the mario sprite.
     * 
     * @param
     * @return
     */
    namespace.Mario.prototype.draw = function() {
        for (var i=0; i<spriteList.length; i++) {
            spriteList[i].translate(this.x, this.y);
            this.hitbox.translate(spriteList[i].x, spriteList[i].y);
        }  
    };
    
    // private methods and properties
    var collision = window.WAF.test.collision;
    var spriteList = null;
    
}(window.WAF.test.collision = window.WAF.test.collision || {}));