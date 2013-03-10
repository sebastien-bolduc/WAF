/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-03-09          (the version of the package this class was first added to)
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
    namespace.Gamepad = function() {
        
    // cross
    var cross1 = document.getElementById('cross1');
    var cross2 = document.getElementById('cross2');
    var cross3 = document.getElementById('cross3');
    var cross4 = document.getElementById('cross4');
    var corner1 = document.getElementById('corner1');
    var corner2 = document.getElementById('corner2');
    var corner3 = document.getElementById('corner3');
    var corner4 = document.getElementById('corner4');
    
    // button
    var button1 = document.getElementById('button1');
    
    // object
    var self = this;
        
    // left
    cross1.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 37);
        }
    }, false);
    cross1.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    cross1.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 37);
        }
    }, false);

    // right
    cross2.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 39);
        }
    }, false);
    cross2.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    cross2.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 39);
        }   
    }, false);

    // up
    cross3.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 38);
        }
    }, false);
    cross3.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    cross3.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 38);
        }
    }, false);

    // down
    cross4.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 40);
        }
    }, false);
    cross4.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    cross4.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 40);
        }
    }, false);

    // upper left
    corner1.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 37);
            self.triggerKeyboardEventDown(document.body, 38);
        }
    }, false);
    corner1.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    corner1.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 37);
            self.triggerKeyboardEventUp(document.body, 38);
        }
    }, false);

    // upper right
    corner2.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 39);
            self.triggerKeyboardEventDown(document.body, 38);
        }
    }, false);
    corner2.addEventListener('touchmove', function (event) {
        event.preventDefault(); 
    }, false);
    corner2.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 39);
            self.triggerKeyboardEventUp(document.body, 38);
        }
    }, false);

    // bottom left
    corner3.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 37);
            self.triggerKeyboardEventDown(document.body, 40);
        }
    }, false);
    corner3.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    corner3.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 37);
            self.triggerKeyboardEventUp(document.body, 40);
        }
    }, false);

    // bottom right
    corner4.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            self.triggerKeyboardEventDown(document.body, 39);
            self.triggerKeyboardEventDown(document.body, 40);
        }
    }, false);
    corner4.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    corner4.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 39);
            self.triggerKeyboardEventUp(document.body, 40);
        }
    }, false);
    
    // button
    button1.addEventListener('touchstart', function (event) {
        event.preventDefault();
        // If there's one or more finger inside this element
        if (event.targetTouches.length >= 1) {
            //alert("down");
            self.triggerKeyboardEventDown(document.body, 32);
        }
    }, false);
    button1.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    button1.addEventListener('touchend', function (event) {
        // If there's one or more finger inside this element
        if (event.changedTouches.length >= 1) {
            self.triggerKeyboardEventUp(document.body, 32);
        }
    }, false);
    
    };
    
    /**
     * Trigger a keyboard event (down).
     * 
     * @param el      Element on which to dispatch the event.
     * @param keyCode Key code to simulate.
     * @return
     */
    namespace.Gamepad.prototype.triggerKeyboardEventDown = function(el, keyCode) {
        var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent("Events");
  
        if(eventObj.initEvent){
            eventObj.initEvent("keydown", true, true);
        }
  
        eventObj.keyCode = keyCode;
        eventObj.which = keyCode;
    
        el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
    };
    
    /**
     * Trigger a keyboard event (up).
     * 
     * @param el      Element on which to dispatch the event.
     * @param keyCode Key code to simulate.
     * @return
     */
    namespace.Gamepad.prototype.triggerKeyboardEventUp = function(el, keyCode) {
        var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent("Events");
  
        if(eventObj.initEvent){
            eventObj.initEvent("keyup", true, true);
        }
  
        eventObj.keyCode = keyCode;
        eventObj.which = keyCode;
    
        el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeyup", eventObj); 
    };
    
    // private methods and properties
    var inputs = window.WAF.inputs;
    
}(window.WAF.inputs = window.WAF.inputs || {}));