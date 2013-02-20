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
     * @param handle Object on which the mouse will operate.
     * @return 
     */
    namespace.Touch = function(handle) {
        this.handle = handle;
        this.touchState = new window.WAF.inputs.TouchState();
        
        var self = this;
        this.handle.addEventListener("touchmove",
                                    function(e) {
                                        self.setStateTouch(e, self); 
                                    }, 
                                    false);
        this.handle.addEventListener("touchstart",
                                    function(e) {
                                        //alert("test touch");
                                        self.setStateStart(e, self);
                                    }, 
                                    false);
        this.handle.addEventListener("touchend",
                                    function(e) {
                                        self.setStateEnd(e, self);
                                    }, 
                                    false);
    };
    
    /**
     * Set the state of the mouse when touch.
     * 
     * @param e Event the function is call for.
     * @param obj Object which handle the call.
     * @return 
     */
    namespace.Touch.prototype.setStateTouch = function(e, obj) {
        for (var i = 0; i < e.touches.length; i++) {
            obj.touchState.setX(e.touches[i], obj.handle);
            obj.touchState.setY(e.touches[i], obj.handle);
        }
    
        e.preventDefault();
    };

    namespace.Touch.prototype.setStateStart = function(e, obj) {
        for (var i = 0; i < e.touches.length; i++) {
            obj.touchState.setX(e.touches[i], obj.handle);
            obj.touchState.setY(e.touches[i], obj.handle);
        }
    
        obj.touchState.setTouched(true);
        obj.touchState.setTouching(true);
    
        e.preventDefault();
    };

    namespace.Touch.prototype.setStateEnd = function(e, obj)
    {
        obj.touchState.setTouching(false);
    
        e.preventDefault();
    };
    
    /**
    * Gets the current state of the touch, including touch position and if screen 
    * is touched.
    * 
    * @param 
    * @return The state of the touch.
    */
    namespace.Touch.prototype.getState = function() {
        return this.touchState;
    };
    
    // private methods and properties
    var inputs = window.WAF.inputs;
    
}(window.WAF.inputs = window.WAF.inputs || {}));