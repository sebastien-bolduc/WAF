/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-24          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test = window.WAF.test || {};
window.WAF.test.starFighter = window.WAF.test.starFighter || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param containedByElement ID of the element this sprite is 'contained' by.
     * @param rocketshipID       ID of the rocketship to handle.
     * @param x                  Start position of rocketship on X axis.
     * @param y                  Start position of rocketship on Y axis. 
     * @return 
     */
    namespace.Rocketship = function(containedByElement, rocketshipID, x, y) {
        this.parentElement = containedByElement;
        this.spriteList = [];
        this.spriteList.push(new window.WAF.game.css.graphics.SpriteImage(this.parentElement, rocketshipID, "rocketship"));
        
        this.id = rocketshipID;
        this.x = x;
        this.y = y;
        this.width = this.spriteList[0].width;
        this.height = this.spriteList[0].height;
        this.speed = Math.floor(Math.random()*5 + 5);
        this.size = 1;
        this.rotation = 0;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, this.width, this.height);
        
        // set starting position of sprite
        this.spriteList[0].x = this.x;
        this.spriteList[0].y = this.y;
    };
    
    /**
     * Update the position of the rocketship.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return
     */
    namespace.Rocketship.prototype.update = function(gameTime) {
        // move rocketship
        this.y -= Math.ceil((this.speed / 16) * gameTime.elapsedGameTime);
        
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].translate(this.x, this.y);
            this.hitbox.translate(this.spriteList[i].x, this.spriteList[i].y);
        }
    };
    
    /**
     * Draw the rocketship sprite.
     * 
     * @param
     * @return
     */
    namespace.Rocketship.prototype.draw = function() {
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].draw();
        }
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));