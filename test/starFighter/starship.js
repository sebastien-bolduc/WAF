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
    namespace.Starship = function() {
        spriteList = [];
        spriteList.push(new window.WAF.game.css.graphics.SpriteImage("backgroundStarfield", "spriteStarship", "starship"));
        
        this.id = "spriteStarship";
        this.x = 0;
        this.y = 0;
        this.width = spriteList[0].width;
        this.height = spriteList[0].height;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, spriteList[0].width, spriteList[0].height);
        
        this.pulseList = [];
    };
    
    /**
     * Shoot a pulse.
     * 
     * @param
     * @return
     */
    namespace.Starship.prototype.shoot = function() {
        // make sure we have a unique ID for the pulse
        var modifier = 1;
        var pulseID = "spritePulse" + this.pulseList.length;
        while(document.getElementById(pulseID)) {
            pulseID = "spritePulse" + (this.pulseList.length + modifier);
            modifier++;
        }
        
        this.pulseList.push(new window.WAF.test.starFighter.Pulse(pulseID, this.x, this.y));
    };
    
    /**
     * Destroy a pulse and everything link to it.
     * 
     * @param indexOf Position of our element in the list.
     * @return
     */
    namespace.Starship.prototype.destroyPulse = function(indexOf) {
        var pulseElement = document.getElementById(this.pulseList[indexOf].id);
        pulseElement.parentNode.removeChild(pulseElement);
        this.pulseList.splice(indexOf,1);
    };
    
    /**
     * Update the pulse shoot by the starship.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return
     */
    namespace.Starship.prototype.update = function(gameTime) {
        // update pulse
        for (var i=0; i<this.pulseList.length; i++) {
            this.pulseList[i].update(gameTime);
            
            // remove pulse if limit is cross
            if (this.pulseList[i].x > (document.getElementById("backgroundStarfield").scrollLeft + window.innerWidth)) {
                var pulseElement = document.getElementById(this.pulseList[i].id);
                pulseElement.parentNode.removeChild(pulseElement);
                this.pulseList.splice(i,1);
            }
        }
    };
    
    /**
     * Draw the starship sprite.
     * 
     * @param
     * @return
     */
    namespace.Starship.prototype.draw = function() {
        // draw starship
        for (var i=0; i<spriteList.length; i++) {
            spriteList[i].translate(this.x, this.y);
            this.hitbox.translate(spriteList[i].x, spriteList[i].y);
        }
        
        // draw pulse
        for (var j=0; j<this.pulseList.length; j++) {
            this.pulseList[j].draw();
        }
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    var spriteList = null;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));