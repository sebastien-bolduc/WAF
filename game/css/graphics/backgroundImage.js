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
     * @param containedByElement ID of the element this background is 'contained' by.
     * @param backgroundID       ID of the background to handle.
     * @param image              Image associated with the background.
     * @param initPosition       Initial position on the background.
     * @return 
     */
    namespace.BackgroundImage = function(containedByElement, backgroundID, image, initPosition) {
        document.getElementById(containedByElement).innerHTML += '<div id="' + backgroundID + '" class="viewport"><div class="' + image + '"></div></div>';
        
        this.id = backgroundID;
        this.curPosition = initPosition;                                    // current position on the background
    };
    
    /**
     * Scroll background to the right.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed    Speed at which the background is scrolled.
     * @param loopFlag Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollRight = function(speed, loopFlag) {
        var scrollWidth = document.getElementById(this.id).scrollWidth;     // width of the background
        var clientWidth = document.getElementById(this.id).clientWidth;     // width of the 'window'
        
        if (loopFlag) {
            this.curPosition.X += speed;
            if (this.curPosition.X >= (scrollWidth / 3) * 2) {
                this.curPosition.X -= (scrollWidth / 3); 
            }   
        } else {
            if (this.curPosition.X < (scrollWidth - clientWidth)) {
                this.curPosition.X += speed;
            } else {
                this.curPosition.X = (scrollWidth - clientWidth); 
            }
        }
    };
    
    /**
     * Scroll background to the left.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed    Speed at which the background is scrolled.
     * @param loopFlag Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollLeft = function(speed, loopFlag) {
        var scrollWidth = document.getElementById(this.id).scrollWidth;     // width of the background
        var clientWidth = document.getElementById(this.id).clientWidth;     // width of the 'window'
        
        if (loopFlag) {
            this.curPosition.X -= speed;
            if (this.curPosition.X <= ((scrollWidth / 3) - clientWidth)) {
                this.curPosition.X += ((scrollWidth / 3) * 1);
            }
        } else {
            if (this.curPosition.X > 0) {
                this.curPosition.X -= speed;
            } else {
                this.curPosition.X = 0;
            }
        }
    };
    
    /**
     * Scroll background Up.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed    Speed at which the background is scrolled.
     * @param loopFlag Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollUp = function(speed, loopFlag) {
        var scrollHeight = document.getElementById(this.id).scrollHeight;   // height of the background
        var clientHeight = document.getElementById(this.id).clientHeight;   // height of the 'window'
        
        if (loopFlag) {
            this.curPosition.Y -= speed;
            if (this.curPosition.Y <= ((scrollHeight / 3) - clientHeight)) {
                this.curPosition.Y += ((scrollHeight / 3) * 1);
            }
        } else {
            if (this.curPosition.Y > 0) {
                this.curPosition.Y -= speed;
            } else {
                this.curPosition.Y = 0;
            }
        }
    };
    
    /**
     * Scroll background down.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed    Speed at which the background is scrolled.
     * @param loopFlag Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollDown = function(speed, loop) {
        var scrollHeight = document.getElementById(this.id).scrollHeight;   // height of the background
        var clientHeight = document.getElementById(this.id).clientHeight;   // height of the 'window'
        
        if (loop) {
            this.curPosition.Y += speed;
            if (this.curPosition.Y >= (scrollHeight / 3) * 2) {
                this.curPosition.Y -= (scrollHeight / 3); 
            }  
        } else {
            if (this.curPosition.Y < (scrollHeight - clientHeight)) {
                this.curPosition.Y += speed;
            } else {
                this.curPosition.Y = (scrollHeight - clientHeight);
            }
        }
    };
    
    /**
     * Draw the background.
     * 
     * @param
     * @return
     */
    namespace.BackgroundImage.prototype.draw = function() {
        document.getElementById(this.id).scrollLeft = this.curPosition.X;
        document.getElementById(this.id).scrollTop = this.curPosition.Y;
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));