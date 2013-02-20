/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-20          (the version of the package this class was first added to)
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
     * @param 
     * @return 
     */
    namespace.Background = function() {
        this.map = ["tile0", "tile1", "tile2", "tile3",
                    "tile3", "tile2", "tile1", "tile0",
                    "tile2", "tile2", "tile2", "tile2"];
        this.mapWidth = 4;
        this.mapHeight = 3;
        this.tile = [];
        this.tileWidth = 200;
        this.tileHeight = 200;
    };
    
    /**
     * Initialize the background by placing the tiles forming it.
     * 
     * @param 
     * @return 
     */
    namespace.Background.prototype.initializeBackground = function() {
        for (var i=0; i<this.mapHeight; i++) {
            for (var j=0; j<this.mapWidth; j++) {
                var element = j + (i * this.mapWidth);
                this.tile[element] = new window.WAF.game.css.graphics.Sprite("tile" + element);
                document.getElementById("tile" + element).className = this.map[element] + " field";
                this.tile[element].translateSprite(0 + (this.tileWidth * j), 0 + (this.tileHeight * i));
            }
        }
    };
    
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));