/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-21          (the version of the package this class was first added to)
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
     * @param backgroundID       ID of the background to handle.
     * @param image              Image associated with the background.
     * @param initPosition       Initial position on the background.
     * @return 
     */
    namespace.BackgroundImage = function(containedByElement, backgroundID, image, initPosition) {
        document.getElementById(containedByElement).innerHTML += '<div id="' + backgroundID + '" class="viewport"><div class="' + image + '"></div></div>';
        
        this.id = backgroundID;
        this.curPosition = initPosition;                                    // current position on the background
        document.getElementById(this.id).scrollLeft = this.curPosition.X;
        document.getElementById(this.id).scrollTop = this.curPosition.Y;
    };
    
    /**
     * Scroll background to the right.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop  Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollRight = function(speed, loop) {
        if (loop) {
            this.curPosition.X += speed;
            if (this.curPosition.X >= (document.getElementById(this.id).scrollWidth / 3) * 2) {
                this.curPosition.X -= (document.getElementById(this.id).scrollWidth / 3); 
            }   
        } else {
            if (this.curPosition.X < (document.getElementById(this.id).scrollWidth - document.getElementById(this.id).clientWidth)) {
                this.curPosition.X += speed;
            } else {
                this.curPosition.X = (document.getElementById(this.id).scrollWidth - document.getElementById(this.id).clientWidth); 
            }
        }
         
        // scrolling the background to the new position
        document.getElementById(this.id).scrollLeft = this.curPosition.X;
    };
    
    /**
     * Scroll background to the left.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop  Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollLeft = function(speed, loop) {
        if (loop) {
            this.curPosition.X -= speed;
            if (this.curPosition.X <= ((document.getElementById(this.id).scrollWidth / 3) - document.getElementById(this.id).clientWidth)) {
                this.curPosition.X += ((document.getElementById(this.id).scrollWidth / 3) * 1);
            }
        } else {
            if (this.curPosition.X > 0) {
                this.curPosition.X -= speed;
            } else {
                this.curPosition.X = 0;
            }
        }
         
        // scrolling the background to the new position
        document.getElementById(this.id).scrollLeft = this.curPosition.X;
    };
    
    /**
     * Scroll background Up.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop  Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollUp = function(speed, loop) {
        if (loop) {
            this.curPosition.Y -= speed;
            if (this.curPosition.Y <= ((document.getElementById(this.id).scrollHeight / 3) - document.getElementById(this.id).clientHeight)) {
                this.curPosition.Y += ((document.getElementById(this.id).scrollHeight / 3) * 1);
            }
        } else {
            if (this.curPosition.Y > 0) {
                this.curPosition.Y -= speed;
            } else {
                this.curPosition.Y = 0;
            }
        }
         
        // scrolling the background to the new position
        document.getElementById(this.id).scrollTop = this.curPosition.Y;
    };
    
    /**
     * Scroll background down.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop  Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollDown = function(speed, loop) {
        if (loop) {
            this.curPosition.Y += speed;
            if (this.curPosition.Y >= (document.getElementById(this.id).scrollHeight / 3) * 2) {
                this.curPosition.Y -= (document.getElementById(this.id).scrollHeight / 3); 
            }  
        } else {
            if (this.curPosition.Y < (document.getElementById(this.id).scrollHeight - document.getElementById(this.id).clientHeight)) {
                this.curPosition.Y += speed;
            } else {
                this.curPosition.Y = (document.getElementById(this.id).scrollHeight - document.getElementById(this.id).clientHeight);
            }
        }
        
        // scrolling the background to the new position
        document.getElementById(this.id).scrollTop = this.curPosition.Y;
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));