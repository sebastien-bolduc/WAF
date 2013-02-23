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
     * @param asteroidID ID of the asteroid to handle.
     * @param x          Start position of asteroid on X axis.
     * @param y          Start position of asteroid on Y axis. 
     * @return 
     */
    namespace.Asteroid = function(asteroidID, x, y) {
        this.spriteList = [];
        this.spriteList.push(new window.WAF.game.css.graphics.SpriteImage("backgroundStarfield", asteroidID, "asteroid"));
        
        this.id = asteroidID;
        this.x = x;
        this.y = y;
        this.speed = Math.floor(Math.random()*5 + 1);
        this.width = this.spriteList[0].width;
        this.height = this.spriteList[0].height;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, this.spriteList[0].width, this.spriteList[0].height);
    };
    
    /**
     * Update the position of the asteroid.
     * 
     * @param
     * @return
     */
    namespace.Asteroid.prototype.update = function() {
        this.x -= this.speed;
    };
    
    /**
     * Draw the asteroid sprite.
     * 
     * @param
     * @return
     */
    namespace.Asteroid.prototype.draw = function() {
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].translate(this.x, this.y);
            this.hitbox.translate(this.spriteList[i].x, this.spriteList[i].y);
        }  
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));