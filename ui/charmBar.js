/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-19          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.ui = window.WAF.ui || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.CharmBar = function() {
        this.top = false;
    };
    
    /**
     * Show the top 'charm bar'.
     * 
     * @param id Element id associated to the top charm bar.
     * @return
     */
    namespace.CharmBar.prototype.showTopCharmBar = function(id) {
        var topCharmBar = document.getElementById(id);
        
        topCharmBar.style["top"] = "0px";
        this.top = true;
    };
    
    /**
     * Hide the top 'charm bar'.
     * 
     * @param id Element id associated to the top charm bar.
     * @return
     */
    namespace.CharmBar.prototype.hideTopCharmBar = function(id) {
        var topCharmBar = document.getElementById(id);
        
        topCharmBar.style["top"] = "-100px";
        this.top = false;
    };
    
    // private methods and properties
    var ui = window.WAF.ui;
    
}(window.WAF.ui = window.WAF.ui || {}));