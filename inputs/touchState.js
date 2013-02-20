/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-19          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.inputs = window.WAF.inputs || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.TouchState = function() {
        this.x = 0;
        this.y = 0;
        this.touched = false;
        this.touching = false;
    };
    
    /**
     * Set the position on the X axis of the touch.
     *
     * @param e Event related to the touch.
     * @param handle Object on which the touch is perform.
     * @return
     */
    namespace.TouchState.prototype.setX = function(e, handle) {
        this.x = e.pageX;
    
        // hack to get the position 'relative' to our handle
        var obj = handle;
        if (obj.offsetParent) {
            do {
                this.x -= obj.offsetLeft;
            } while (obj = obj.offsetParent);
        }
    };
    
    /**
     * Set the position on the Y axis of the touch.
     *
     * @param e Event related to the touch.
     * @param handle Object on which the touch is perform.
     * @return 
     */
    namespace.TouchState.prototype.setY = function(e, handle) {
        this.y = e.pageY;
    
        var obj = handle;
        if (obj.offsetParent) {
            do {
                this.y -= obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
    };

    /**
     * Set the state of the 'touched' variable for the touch.
     * 
     * @param state State of the touch (yes or no).
     * @return 
     */
    namespace.TouchState.prototype.setTouched = function(state) {
        this.touched = state;
    };
    
    /**
     * Set the state of the 'touching' variable for the touch.
     * 
     * @param state State of the touch (yes or no).
     * @return 
     */
    namespace.TouchState.prototype.setTouching = function(state) {
        this.touching = state;
    };
    
    /**
     * Tell if screen has been touched.
     * 
     * @param 
     * @return 
     */
    namespace.TouchState.prototype.hasBeenTouched = function() {
        var touched = this.touched;
        
        if (touched) {
            this.touched = false;
        }
        return touched;
    };
    
    /**
     * Tell if screen is being touched.
     * 
     * @param 
     * @return 
     */
    namespace.TouchState.prototype.isBeingTouched = function() {
        return this.touching;
    };
    
    // private methods and properties
    var inputs = window.WAF.inputs;
    
}(window.WAF.inputs = window.WAF.inputs || {}));