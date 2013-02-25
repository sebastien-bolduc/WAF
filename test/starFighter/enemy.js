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
     * @param containedByElement ID of the element this sprite is 'contained' by.
     * @return 
     */
    namespace.Enemy = function(containedByElement) {
        this.parentElement = containedByElement;
        this.asteroidFieldFlag = false;
        this.waveshipFlag = false;
        this.rocketshipFlag = false;
        
        this.asteroidList = [];
        this.waveshipList = [];
        this.rocketshipList = [];
    };
    
    /**
     * Initialize the asteroid field.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.initializeAsteroid = function() {
        for (var i=this.asteroidList.length; i<10; i++) {
            // make sure we have a unique ID for the asteroid
            var modifier = 1;
            var asteroidID = "spriteAsteroid" + i;
            while(document.getElementById(asteroidID)) {
                asteroidID = "spriteAsteroid" + (this.asteroidList.length + modifier);
                modifier++;
            }
            
            // create asteroid
            this.asteroidList.push(new window.WAF.test.starFighter.Asteroid(this.parentElement, asteroidID,
                document.getElementById(this.parentElement).scrollLeft + document.getElementById(this.parentElement).clientWidth,
                Math.floor(Math.random()*(document.getElementById(this.parentElement).clientHeight - 64) + document.getElementById(this.parentElement).scrollTop))
            );
        }
    };
    
    /**
     * Initialize the waveships.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.initializeWaveship = function() {
        var startingHeight = Math.floor(Math.random()*(document.getElementById(this.parentElement).clientHeight - 96) + document.getElementById(this.parentElement).scrollTop);
        for (var i=0; i<6; i++) {
            // make sure we have a unique ID for the waveship
            var modifier = 1;
            var waveshipID = "spriteWaveship" + i;
            while(document.getElementById(waveshipID)) {
                waveshipID = "spriteWaveship" + (this.waveshipList.length + modifier);
                modifier++;
            }
            
            // create waveship
            this.waveshipList.push(new window.WAF.test.starFighter.Waveship(this.parentElement, waveshipID,
                document.getElementById(this.parentElement).scrollLeft + document.getElementById(this.parentElement).clientWidth + (i * 96), startingHeight)
            );
        }
    };
    
    /**
     * Initialize the rocketships.
     * 
     * @param
     * @return
     */
    namespace.Enemy.prototype.initializeRocketship = function() {
        var startingWidth = Math.floor(Math.random()*(document.getElementById(this.parentElement).clientWidth - 64) + document.getElementById(this.parentElement).scrollLeft);
        for (var i=0; i<1; i++) {
            // make sure we have a unique ID for the waveship
            var modifier = 1;
            var rocketshipID = "spriteRocketship" + i;
            while(document.getElementById(rocketshipID)) {
                rocketshipID = "spriteRocketship" + (this.rocketshipList.length + modifier);
                modifier++;
            }
            
            // create rocketship
            this.rocketshipList.push(new window.WAF.test.starFighter.Rocketship(this.parentElement, rocketshipID,
                startingWidth, document.getElementById(this.parentElement).scrollTop + document.getElementById(this.parentElement).clientHeight + (i * 64))
            );
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
     * Destroy a waveship and everything link to it.
     * 
     * @param indexOf Position of our element in the list.
     * @return
     */
    namespace.Enemy.prototype.destroyWaveship = function(indexOf) {
        var waveshipElement = document.getElementById(this.waveshipList[indexOf].id);
        waveshipElement.parentNode.removeChild(waveshipElement);
        this.waveshipList.splice(indexOf,1);
    };
    
    /**
     * Destroy a rocketship and everything link to it.
     * 
     * @param indexOf Position of our element in the list.
     * @return
     */
    namespace.Enemy.prototype.destroyRocketship = function(indexOf) {
        var rocketshipElement = document.getElementById(this.rocketshipList[indexOf].id);
        rocketshipElement.parentNode.removeChild(rocketshipElement);
        this.rocketshipList.splice(indexOf,1);
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
     * Check the hitbox of the sprite for collision.
     * 
     * @param hitbox Hitbox to compare to.
     * @return True or false depending on a hit.
     */
    namespace.Enemy.prototype.checkWaveshipHitbox = function(hitbox) {
        for (var i=0; i<this.waveshipList.length; i++) {
            if (this.waveshipList[i].hitbox.intersects(hitbox)) {
                this.destroyWaveship(i);
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * Check the hitbox of the sprite for collision.
     * 
     * @param hitbox Hitbox to compare to.
     * @return True or false depending on a hit.
     */
    namespace.Enemy.prototype.checkRocketshipHitbox = function(hitbox) {
        for (var i=0; i<this.rocketshipList.length; i++) {
            if (this.rocketshipList[i].hitbox.intersects(hitbox)) {
                this.destroyRocketship(i);
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * Update the enemies behavior.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return
     */
    namespace.Enemy.prototype.update = function(gameTime) {
        // asteroid
        for (var i=0; i<this.asteroidList.length; i++) {
            this.asteroidList[i].update(gameTime);
            
            // remove asteroid if limit is cross
            if (this.asteroidList[i].x < (document.getElementById(this.parentElement).scrollLeft)) {
                var asteroidElement = document.getElementById(this.asteroidList[i].id);
                asteroidElement.parentNode.removeChild(asteroidElement);
                this.asteroidList.splice(i,1);
            }
        }
        
        // recreate the asteroid field
        if (this.asteroidFieldFlag) {
            this.initializeAsteroid();
        }
        
        // -----------------------------------------------------------------------------------------
        
        // waveship
        for (i=0; i<this.waveshipList.length; i++) {
            this.waveshipList[i].update(gameTime);
            
            // remove waveship if limit is cross
            if (this.waveshipList[i].x < (document.getElementById(this.parentElement).scrollLeft)) {
                var waveshipElement = document.getElementById(this.waveshipList[i].id);
                waveshipElement.parentNode.removeChild(waveshipElement);
                this.waveshipList.splice(i,1);
            }
        }
        
        // recreate the waveships
        if (this.waveshipFlag) {
            this.initializeWaveship();
            this.waveshipFlag = false;
        }
        
        // -----------------------------------------------------------------------------------------
        
        // rocketship
        for (i=0; i<this.rocketshipList.length; i++) {
            this.rocketshipList[i].update(gameTime);
            
            // remove rocketship if limit is cross
            if (this.rocketshipList[i].y < (document.getElementById(this.parentElement).scrollTop)) {
                var rocketshipElement = document.getElementById(this.rocketshipList[i].id);
                rocketshipElement.parentNode.removeChild(rocketshipElement);
                this.rocketshipList.splice(i,1);
            }
        }
        
        // recreate the rocketships
        if (this.rocketshipFlag) {
            this.initializeRocketship();
            this.rocketshipFlag = false;
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
        
        // draw waveship
        for (i=0; i<this.waveshipList.length; i++) {
            this.waveshipList[i].draw();
        }
        
        // draw rocketship
        for (i=0; i<this.rocketshipList.length; i++) {
            this.rocketshipList[i].draw();
        }
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));