/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-16          (the version of the package this class was first added to)
 */

// create global namespace
var WAF = WAF || {};  

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    namespace.i = 5;
    
    namespace.getAlertPublic = function() {
        getAlert();
    };
    
    // private methods and properties
    var j = 4;
    
    function getAlert() {
        alert("i = " + namespace.i + " and j = " + j);
    };
    
}(window.WAF = window.WAF || {}));

// test
WAF.getAlertPublic();