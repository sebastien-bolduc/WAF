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
     * @param 
     * @return 
     */
    namespace.Enemy = function() {
        this.initializeAsteroid();
    };
    
    /**
     * Initialize the asteroid field.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.initializeAsteroid = function() {
        this.asteroidList = [];
        for (var i=0; i<10; i++) {
            this.asteroidList.push(new window.WAF.test.starFighter.Asteroid("spriteAsteroid" + i, document.getElementById("backgroundStarfield").scrollLeft + window.innerWidth,
                                                                            Math.floor(Math.random()*(window.innerHeight - 64) + document.getElementById("backgroundStarfield").scrollTop)));
        }
    };
    
    /**
     * Destroy an asteroid and everything link to it.
     * 
     * @param indexOf Position of our element in the list.
     * @return
     */
    namespace.Enemy.prototype.destroyAsteroid = function(indexOf) {
        var asteroidElement = document.getElementById(this.asteroidList[indexOf].id);
        asteroidElement.parentNode.removeChild(asteroidElement);
        this.asteroidList.splice(indexOf,1);
    };
    
    /**
     * Check the hitbox of the sprite for collision.
     * 
     * @param hitbox Hitbox to compare to.
     * @return True or false depending on a hit.
     */
    namespace.Enemy.prototype.checkAsteroidHitbox = function(hitbox) {
        for (var i=0; i<this.asteroidList.length; i++) {
            if (this.asteroidList[i].hitbox.intersects(hitbox)) {
                this.destroyAsteroid(i);
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * Update the enemies behavior.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.update = function() {
        // asteroid
        for (var i=0; i<this.asteroidList.length; i++) {
            this.asteroidList[i].update();
            
            // remove asteroid if limit is cross
            if (this.asteroidList[i].x < (document.getElementById("backgroundStarfield").scrollLeft)) {
                var asteroidElement = document.getElementById(this.asteroidList[i].id);
                asteroidElement.parentNode.removeChild(asteroidElement);
                this.asteroidList.splice(i,1);
            }
        }
        
        // recreate the asteroid field
        if (this.asteroidList.length === 0) {
            this.initializeAsteroid();
        }
    };
    
    /**
     * Draw the enemies sprites.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.draw = function() {
        // draw asteroid
        for (var i=0; i<this.asteroidList.length; i++) {
            this.asteroidList[i].draw();
        }
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));