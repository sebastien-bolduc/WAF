/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-17          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.utils = window.WAF.utils || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.CustomObject = function() {
    };
    
    /**
     * Class extension utility function
     * 
     * @param base The base class
     * @param constructor The constructor function for the new class
     * @return 
     */
    namespace.CustomObject.prototype.extend = function(base, constructor) {
        var prototype = new Function();
        prototype.prototype = base.prototype;
        constructor.prototype = new prototype();
        constructor.prototype.constructor = constructor;
    };
    
    // private methods and properties
    var utils = window.WAF.utils;
    
}(window.WAF.utils = window.WAF.utils || {}));