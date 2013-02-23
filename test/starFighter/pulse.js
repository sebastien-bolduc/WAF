/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-23          (the version of the package this class was first added to)
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
     * @param pulseID ID of the pulse to handle.
     * @param x       Start position of pulse on X axis.
     * @param y       Start position of pulse on Y axis. 
     * @return 
     */
    namespace.Pulse = function(pulseID, x, y) {
        this.spriteList = [];
        this.spriteList.push(new window.WAF.game.css.graphics.SpriteImage("backgroundStarfield", pulseID, "pulse"));
        
        this.id = pulseID;
        this.x = x + 65;
        this.y = y + 25;
        this.width = this.spriteList[0].width;
        this.height = this.spriteList[0].height;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, this.spriteList[0].width, this.spriteList[0].height);
    };
    
    /**
     * Update the position of the pulse.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return
     */
    namespace.Pulse.prototype.update = function(gameTime) {
        this.x += Math.ceil(10/16 * gameTime.elapsedGameTime);
    };
    
    /**
     * Draw the pulse sprite.
     * 
     * @param
     * @return
     */
    namespace.Pulse.prototype.draw = function() {
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].translate(this.x, this.y);
            this.hitbox.translate(this.spriteList[i].x, this.spriteList[i].y);
        }  
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));