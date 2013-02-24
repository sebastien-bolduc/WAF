/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-22          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test = window.WAF.test || {};
window.WAF.test.collision = window.WAF.test.collision || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.Stage = function() {
        var map = {};
        map.content =  ["", "", "", "goomba", "goomba", "goomba", "goomba", "", ""      , ""      , ""      ,
                        "", "", "", "goomba", ""      , ""      , ""      , "", ""      , ""      , ""      ,
                        "", "", "", "goomba", ""      , ""      , ""      , "", ""      , ""      , "goomba",
                        "", "", "", "goomba", ""      , ""      , ""      , "", ""      , ""      , "goomba",
                        "", "", "", ""      , ""      , ""      , ""      , "", ""      , "goomba", ""      ,
                        "", "", "", ""      , ""      , ""      , ""      , "", "goomba", ""      , ""      ,
                        "", "", "", ""      , ""      , ""      , ""      , "", "goomba", ""      , ""       ];
        map.width = 11;
        map.height = 7;
        
        this.level = new window.WAF.game.css.graphics.LevelImage("backgroundField", "level0", map);
        
        this.hitboxList = [];
        for (var j=0; j<map.height; j++) {
            for (var i=0; i<map.width; i++) {
                var element = i + (j * map.width);
                if (map.content[element] !== "") {
                    this.hitboxList.push(new window.WAF.game.Rectangle(i * this.level.tileList[0].width, j * this.level.tileList[0].height, 
                                                                        this.level.tileList[0].width, this.level.tileList[0].height));
                }
            }
        }
    };
    
    /**
     * Draw the stage.
     * 
     * @param
     * @return
     */
    namespace.Stage.prototype.draw = function() {
        this.level.draw();
    };
    
    // private methods and properties
    var collision = window.WAF.test.collision;
    
}(window.WAF.test.collision = window.WAF.test.collision || {}));