/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-22          (the version of the package this class was first added to)
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
     * @param containedByElement ID of the element this level is 'contained' by.
     * @param levelID            ID of the level to handle.
     * @param map                Map associated with the level.
     * @return 
     */
    namespace.LevelImage = function(containedByElement, levelID, map) {
        document.getElementById(containedByElement).innerHTML += '<div id="' + levelID + '"></div>';
        
        this.id = levelID;
        
        // build map
        this.tileList = [];
        for (var j=0; j<map.height; j++) {
            for (var i=0; i<map.width; i++) {
                var element = i + (j * map.width);
                if (map.content[element] != "") {
                    this.tileList.push(new window.WAF.game.css.graphics.SpriteImage(this.id, "tile" + element, map.content[element]));
                    this.tileList[this.tileList.length-1].translate(i * this.tileList[this.tileList.length-1].width, j * this.tileList[this.tileList.length-1].height);
                }
            }
        }
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));