/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-22          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param x      The x-coordinate of the rectangle.
     * @param y      The y-coordinate of the rectangle.
     * @param width  Width of the rectangle.
     * @param height Height of the rectangle.
     * @return 
     */
    namespace.Rectangle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    
    /**
     * Translate a rectangle.
     * 
     * @param x Translation along the X axis in pixel.
     * @param y Translation along the Y axis in pixel.
     * @return 
     */
    namespace.Rectangle.prototype.translate = function(x, y) {
        this.x = x;
        this.y = y;  
    }
    
    /**
     * Determines whether a specified Rectangle intersects with this Rectangle.
     * 
     * @param  rectangle The Rectangle to evaluate.
     * @return True if the specified rectangle intersects with this one, false otherwise.
     */
    namespace.Rectangle.prototype.intersects = function(rectangle) {
        // left side (this) vs. right side (rectangle)
        var _min = this.x;
        var _max = rectangle.x + rectangle.width - 1;
    
        if (_min > _max) {
            return false;
        }
        
        // right side (this) vs. left side (rectangle)
        var min_ = rectangle.x;
        var max_ = this.x + this.width - 1;
    
        if (min_ > max_) {
            return false;
        }
    
        // top side (this) vs. bottom side (rectangle)
        _min = this.y;
        _max = rectangle.y + rectangle.height - 1;
    
        if (_min > _max) {
            return false;
        }
        
        // bottom side (this) vs. top side (rectangle)
        min_ = rectangle.y;
        max_ = this.y + this.height - 1;
    
        if (min_ > max_) {
            return false;
        }
    
        return true;
    };
    
    // private methods and properties
    var game = window.WAF.game;
    
}(window.WAF.game = window.WAF.game || {}));