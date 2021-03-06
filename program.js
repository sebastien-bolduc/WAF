/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-16          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};

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
        var game = new WAF.game.css.Game1();
        
        game.run();
    };
    
    // private methods and properties
    var WAF = window.WAF;
    
}(window.WAF = window.WAF || {}));

// this will allow us to start the application
var program = new window.WAF.Program();
//document.addEventListener("load", program.main(), false);