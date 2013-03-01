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
    namespace.Starship = function(containedByElement) {
        this.parentElement = containedByElement;
        this.spriteList = [];
        this.spriteList.push(new window.WAF.game.css.graphics.SpriteImage(this.parentElement, "spriteStarship", "starship")); 
        
        this.id = "spriteStarship";
        this.x = 0;
        this.y = 0;
        this.width = this.spriteList[0].width;
        this.height = this.spriteList[0].height;
        this.size = 1;
        
        this.hitbox = new window.WAF.game.Rectangle(this.x, this.y, this.width, this.height);
        
        // set starting position of sprite
        this.spriteList[0].x = this.x;
        this.spriteList[0].y = this.y;
        
        this.pulseList = [];
        
        // sound
        this.pulseSound = new window.WAF.audio.SoundEffect("http://www.wyomingwebdesign.com/files/sound_files/laser.wav");
        //this.pulseSound = new window.WAF.audio.SoundEffect("https://c9.io/sebastien_bolduc/waf/workspace/test/starFighter/sound/laser.wav");
    };
    
    /**
     * Move the starship.
     * 
     * @param x         New position for the starship.
     * @param y         New position for the starship.
     * @network network Network object for online.
     * @return
     */
    namespace.Starship.prototype.move = function(x, y, network) {
            this.x += x;
            this.y += y;
            
            // limit set by the world
            if (this.x < 0) {
                this.x -= x;
            } else if (this.x > (document.getElementById(this.parentElement).scrollWidth - this.width)) {
                this.x -= x;
            }
            
            if (this.y <= 0) {
                this.y -= y;
            } else if (this.y >= (document.getElementById(this.parentElement).scrollHeight - this.height)) {
                this.y -= y;
            }
            
            // network
            network.send("1 position " + this.x + " " + this.y);
        }
    
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
        
        this.pulseList.push(new window.WAF.test.starFighter.Pulse(this.parentElement, pulseID, this.x, this.y));
        
        // sound
        this.pulseSound.play();
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
     * Check the hitbox of the sprite for collision.
     * 
     * @param hitbox Hitbox to compare to.
     * @return
     */
    namespace.Starship.prototype.checkHitbox = function(hitbox) {
        if (this.hitbox.intersects(hitbox) && this.size == 1) {
            this.size = 0.5;
            
            var self = this;
            setTimeout(function() {
                self.size = 1;
            }, 5000);
        }
    };
    
    /**
     * Update the position of the starship and the pulse shot by the starship.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return
     */
    namespace.Starship.prototype.update = function(gameTime) {
        // update starship
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].translate(this.x, this.y);
            this.spriteList[i].scale(this.size);
            this.hitbox.translate(this.spriteList[i].x, this.spriteList[i].y);
        }
        
        // update pulse
        for (var j=0; j<this.pulseList.length; j++) {
            this.pulseList[j].update(gameTime);
            
            // remove pulse if limit is cross
            if (this.pulseList[j].x > (document.getElementById(this.parentElement).scrollLeft + document.getElementById(this.parentElement).clientWidth)) {
                var pulseElement = document.getElementById(this.pulseList[j].id);
                pulseElement.parentNode.removeChild(pulseElement);
                this.pulseList.splice(j,1);
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
        for (var i=0; i<this.spriteList.length; i++) {
            this.spriteList[i].draw();
        }
        
        // draw pulse
        for (var j=0; j<this.pulseList.length; j++) {
            this.pulseList[j].draw();
        }
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));