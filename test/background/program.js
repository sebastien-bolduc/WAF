/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-21          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test= window.WAF.test || {};
window.WAF.test.background = window.WAF.test.background || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.Program = function() {
    };
    
    /**
     * The main entry point for our application.
     * 
     * @param 
     * @return 
     */
    namespace.Program.prototype.main = function() {
        var game = new background.Game1();
        
        game.run();
    };
    
    // private methods and properties
    var background = window.WAF.test.background;
    
}(window.WAF.test.background = window.WAF.test.background || {}));

// this will allow us to start the application
var program = new window.WAF.test.background.Program();
//document.addEventListener("load", program.main(), false);