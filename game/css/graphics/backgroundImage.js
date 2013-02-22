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
     * @param image Image for the background.
     * @return 
     */
    namespace.BackgroundImage = function(game, image) {
        document.getElementById(game).innerHTML += '<div id="scroll' + image + '" class="viewport"><div id="background' + image + '" class="' + image + '"></div></div>';
        
        this.id = image;
        this.curScrollPosition = {};    // current position of the background
        this.curScrollPosition.X = 0;
        this.curScrollPosition.Y = 0;
    };
    
    /**
     * Scroll background to the right.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollRight = function(speed, loop) {
        if (this.curScrollPosition.X < (document.getElementById("scroll" + this.id).scrollWidth - document.getElementById("scroll" + this.id).clientWidth)) {
            this.curScrollPosition.X += speed;
        } else {
            this.curScrollPosition.X = (document.getElementById("scroll" + this.id).scrollWidth - document.getElementById("scroll" + this.id).clientWidth);
        }
         
        // scrolling the background to the new position
        document.getElementById("scroll" + this.id).scrollLeft = this.curScrollPosition.X;
    };
    
    /**
     * Scroll background to the left.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollLeft = function(speed, loop) {
        if (this.curScrollPosition.X > 0) {
            this.curScrollPosition.X -= speed;
        } else {
            this.curScrollPosition.X = 0;
        }
         
        // scrolling the background to the new position
        document.getElementById("scroll" + this.id).scrollLeft = this.curScrollPosition.X;
    };
    
    /**
     * Scroll background Up.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollUp = function(speed, loop) {
        if (this.curScrollPosition.Y > 0) {
            this.curScrollPosition.Y -= speed;
        } else {
            this.curScrollPosition.Y = 0;
        }
         
        // scrolling the background to the new position
        document.getElementById("scroll" + this.id).scrollTop = this.curScrollPosition.Y;
    };
    
    /**
     * Scroll background down.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loop Loop the background (true or false).
     * @return
     */
    namespace.BackgroundImage.prototype.scrollDown = function(speed, loop) {
        if (this.curScrollPosition.Y < (document.getElementById("scroll" + this.id).scrollHeight - 800)) { //document.getElementById("scroll" + this.id).clientHeight)) {
            this.curScrollPosition.Y += speed;
        } else {
            this.curScrollPosition.Y = (document.getElementById("scroll" + this.id).scrollHeight - document.getElementById("scroll" + this.id).clientHeight);
        }
        
        // scrolling the background to the new position
        document.getElementById("scroll" + this.id).scrollTop = this.curScrollPosition.Y;
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));