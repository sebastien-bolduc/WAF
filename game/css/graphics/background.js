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
     * @param scene Definition of the background.
     * @return 
     */
    namespace.Background = function(scene) {
        this.image = scene.image;
        
        this.map = scene.map;
        this.mapWidth = scene.mapWidth;
        this.mapHeight = scene.mapHeight;
        
        this.tile = [];
        this.tileWidth = scene.tileWidth;
        this.tileHeight = scene.tileHeight;
        
        this.curPixelPositionOfFirstTile = scene.curPixelPositionOfFirstTile;
        this.curPositionOnTileMap = scene.curPositionOnTileMap;
        this.viewportOfTileDisplayed = scene.viewportOfTileDisplayed;
    };
    
    /**
     * Initialize the background by placing the tiles forming it.
     * 
     * @param 
     * @return 
     */
    namespace.Background.prototype.initializeBackground = function() {
        for (var i=0; i<this.mapHeight; i++) {
            for (var j=0; j<(this.viewportOfTileDisplayed+2); j++) {
                var element = j + (i * (this.viewportOfTileDisplayed+2));
                this.tile[element] = new window.WAF.game.css.graphics.Sprite("tile" + element);
                document.getElementById("tile" + element).className = this.map[element] + " " + this.image;
                this.tile[element].translateSprite(0 + (this.tileWidth * j), 0 + (this.tileHeight * i));
            }
        }
    };
    
    /**
     * Scroll background to the left.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loopBackground Loop the background (true or false).
     * @return
     */
    namespace.Background.prototype.scrollLeft = function(speed, loopBackground) {
        this.curPixelPositionOfFirstTile -= speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile < -this.tileWidth && (this.curPositionOnTileMap + this.viewportOfTileDisplayed) < this.mapWidth) {
            ++this.curPositionOnTileMap;
            this.curPixelPositionOfFirstTile += this.tileWidth;
        } else if (this.curPixelPositionOfFirstTile < -this.tileWidth && loopBackground) {
            this.curPositionOnTileMap = ((this.curPositionOnTileMap + 1) < this.mapWidth) ? this.curPositionOnTileMap + 1 : 0;
            this.curPixelPositionOfFirstTile += this.tileWidth;
        } else if ((this.curPositionOnTileMap + this.viewportOfTileDisplayed) >= this.mapWidth && !loopBackground) {
            this.curPixelPositionOfFirstTile += speed;
        }
    };
    
    /**
     * Scroll background to the right.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loopBackground Loop the background (true or false).
     * @return
     */
    namespace.Background.prototype.scrollRight = function(speed, loopBackground) {
        this.curPixelPositionOfFirstTile += speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile > this.tileWidth && this.curPositionOnTileMap > 0) {
            --this.curPositionOnTileMap;
            this.curPixelPositionOfFirstTile -= this.tileWidth;
        } else if (this.curPixelPositionOfFirstTile > this.tileWidth && loopBackground) {
            this.curPositionOnTileMap = ((this.curPositionOnTileMap - 1) > 0) ? this.curPositionOnTileMap - 1 : this.mapWidth - 1;
            this.curPixelPositionOfFirstTile -= this.tileWidth;
        } else if (this.curPositionOnTileMap <= 0 && !loopBackground) {
            this.curPixelPositionOfFirstTile -= speed;
        }
    };
    
    /**
     * Draw the background.
     * 
     * @param
     * @return
     */
    namespace.Background.prototype.drawBackground = function() {
        var maxNumTileToDisplay = this.viewportOfTileDisplayed + 2;
        var pixelPositionOfFirstTile = this.curPixelPositionOfFirstTile - this.tileWidth;
        var i,j, element;
        var tileNumber = 0;
        
        // resolve the maximum tile position to draw
        var maxTilePositionToDraw = ((this.curPositionOnTileMap + maxNumTileToDisplay) < this.mapWidth) ?
                                    (this.curPositionOnTileMap + maxNumTileToDisplay) : this.mapWidth;
        
        for (i=0; i<this.mapHeight; i++) {
            for (j=this.curPositionOnTileMap; j<maxTilePositionToDraw; j++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile + (this.tileWidth * (j - this.curPositionOnTileMap)), 0 + (this.tileHeight * i));
                tileNumber++;
            }
        }
        
        // resolve the minimum tile position to draw
        var minTilePositionToDraw = maxNumTileToDisplay - (this.mapWidth - this.curPositionOnTileMap);
        
        for (i=0; i<this.mapHeight; i++) {
            for (j=0; j<minTilePositionToDraw; j++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile + (this.tileWidth * (j + (maxNumTileToDisplay - minTilePositionToDraw))), 0 + (this.tileHeight * i));
                tileNumber++;
            }
        }
    };
     
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));