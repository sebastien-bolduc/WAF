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
        for (var i=0; i<(this.viewportOfTileDisplayed.height+2); i++) {
            for (var j=0; j<(this.viewportOfTileDisplayed.width+2); j++) {
                var element = j + (i * (this.viewportOfTileDisplayed.width+2));
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
        this.curPixelPositionOfFirstTile.X -= speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile.X <= -this.tileWidth && (this.curPositionOnTileMap.X + this.viewportOfTileDisplayed.width) < this.mapWidth) {
            ++this.curPositionOnTileMap.X;
            this.curPixelPositionOfFirstTile.X += this.tileWidth;
        } else if (this.curPixelPositionOfFirstTile.X <= -this.tileWidth && loopBackground) {
            this.curPositionOnTileMap.X = ((this.curPositionOnTileMap.X + 1) < this.mapWidth) ? this.curPositionOnTileMap.X + 1 : 0;
            this.curPixelPositionOfFirstTile.X += this.tileWidth;
        } else if ((this.curPositionOnTileMap.X + this.viewportOfTileDisplayed.width) >= this.mapWidth && !loopBackground) {
            this.curPixelPositionOfFirstTile.X += speed;
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
        this.curPixelPositionOfFirstTile.X += speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile.X >= this.tileWidth && this.curPositionOnTileMap.X > 0) {
            --this.curPositionOnTileMap.X;
            this.curPixelPositionOfFirstTile.X -= this.tileWidth;
        } else if (this.curPixelPositionOfFirstTile.X >= this.tileWidth && loopBackground) {
            this.curPositionOnTileMap.X = ((this.curPositionOnTileMap.X - 1) > 0) ? this.curPositionOnTileMap.X - 1 : this.mapWidth - 1;
            this.curPixelPositionOfFirstTile.X -= this.tileWidth;
        } else if (this.curPositionOnTileMap.X <= 0 && !loopBackground) {
            this.curPixelPositionOfFirstTile.X -= speed;
        }
    };
    
    /**
     * Scroll background up.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loopBackground Loop the background (true or false).
     * @return
     */
    namespace.Background.prototype.scrollUp = function(speed, loopBackground) {
        this.curPixelPositionOfFirstTile.Y -= speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile.Y <= -this.tileHeight && (this.curPositionOnTileMap.Y + this.viewportOfTileDisplayed.height) < this.mapHeight) {
            ++this.curPositionOnTileMap.Y;
            this.curPixelPositionOfFirstTile.Y += this.tileHeight;
        } else if (this.curPixelPositionOfFirstTile.Y <= -this.tileHeight && loopBackground) {
            this.curPositionOnTileMap.Y = ((this.curPositionOnTileMap.Y + 1) < this.mapHeight) ? this.curPositionOnTileMap.Y + 1 : 0;
            this.curPixelPositionOfFirstTile.Y += this.tileHeight;
        } else if ((this.curPositionOnTileMap.Y + this.viewportOfTileDisplayed.height) >= this.mapHeight && !loopBackground) {
            this.curPixelPositionOfFirstTile.Y += speed;
        }
    };
    
    /**
     * Scroll background down.  Will stop at the end of it or loop if told
     * to do so.
     * 
     * @param speed Speed at which the background is scrolled.
     * @param loopBackground Loop the background (true or false).
     * @return
     */
    namespace.Background.prototype.scrollDown = function(speed, loopBackground) {
        this.curPixelPositionOfFirstTile.Y += speed;
         
        // ajusting the current position for displaying the background
        if (this.curPixelPositionOfFirstTile.Y >= this.tileHeight && this.curPositionOnTileMap.Y > 0) {
            --this.curPositionOnTileMap.Y;
            this.curPixelPositionOfFirstTile.Y -= this.tileHeight;
        } else if (this.curPixelPositionOfFirstTile.Y >= this.tileHeight && loopBackground) {
            this.curPositionOnTileMap.Y = ((this.curPositionOnTileMap.Y - 1) > 0) ? this.curPositionOnTileMap.Y - 1 : this.mapHeight - 1;
            this.curPixelPositionOfFirstTile.Y -= this.tileHeight;
        } else if (this.curPositionOnTileMap.Y <= 0 && !loopBackground) {
            this.curPixelPositionOfFirstTile.Y -= speed;
        }
    };
    
    /**
     * Draw the background.
     * 
     * @param
     * @return
     */
    namespace.Background.prototype.drawBackground = function() {
        var maxNumTileToDisplay = {};
        maxNumTileToDisplay.width = this.viewportOfTileDisplayed.width + 2;
        maxNumTileToDisplay.height = this.viewportOfTileDisplayed.height + 2;
        var pixelPositionOfFirstTile = {};
        pixelPositionOfFirstTile.X = this.curPixelPositionOfFirstTile.X - this.tileWidth;
        pixelPositionOfFirstTile.Y = this.curPixelPositionOfFirstTile.Y - this.tileHeight;
        var i,j, element;
        var tileNumber = 0;
        
        // resolve the maximum tile position to draw
        var maxTilePositionToDraw = {};
        maxTilePositionToDraw.X = ((this.curPositionOnTileMap.X + maxNumTileToDisplay.width) < this.mapWidth) ? (this.curPositionOnTileMap.X + maxNumTileToDisplay.width) : this.mapWidth;
        maxTilePositionToDraw.Y = ((this.curPositionOnTileMap.Y + maxNumTileToDisplay.height) < this.mapHeight) ? (this.curPositionOnTileMap.Y + maxNumTileToDisplay.height) : this.mapHeight;
        
        for (i=this.curPositionOnTileMap.Y; i<maxTilePositionToDraw.Y; i++) {
            for (j=this.curPositionOnTileMap.X; j<maxTilePositionToDraw.X; j++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile.X + (this.tileWidth * (j - this.curPositionOnTileMap.X)),
                                                    pixelPositionOfFirstTile.Y + (this.tileHeight * (i - this.curPositionOnTileMap.Y)));
                tileNumber++;
            }
        }
        
        // resolve the minimum tile position to draw
        var minTilePositionToDraw = {};
        minTilePositionToDraw.X = maxNumTileToDisplay.width - (this.mapWidth - this.curPositionOnTileMap.X);
        minTilePositionToDraw.Y = maxNumTileToDisplay.height - (this.mapHeight - this.curPositionOnTileMap.Y);
        
        //  |* 
        // ---
        //  |
        for (i=this.curPositionOnTileMap.Y; i<maxTilePositionToDraw.Y; i++) {
            for (j=0; j<minTilePositionToDraw.X; j++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile.X + (this.tileWidth * (j + (maxNumTileToDisplay.width - minTilePositionToDraw.X))),
                                                    pixelPositionOfFirstTile.Y + (this.tileHeight * (i - this.curPositionOnTileMap.Y)));
                tileNumber++;
            }
        }
        
        //  | 
        // ---
        // *|
        for (j=this.curPositionOnTileMap.X; j<maxTilePositionToDraw.X; j++) {
            for (i=0; i<minTilePositionToDraw.Y; i++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile.X + (this.tileWidth * (j - this.curPositionOnTileMap.X)),
                                                    pixelPositionOfFirstTile.Y + (this.tileHeight * (i + (maxNumTileToDisplay.height - minTilePositionToDraw.Y))));
                tileNumber++;
            }
        }
        
        //  | 
        // ---
        //  |*
        for (i=0; i<minTilePositionToDraw.Y; i++) {
            for (j=0; j<minTilePositionToDraw.X; j++) {
                element = j + (i * this.mapWidth);
                document.getElementById("tile" + tileNumber).className = this.map[element] + " " + this.image;
                this.tile[tileNumber].translateSprite(pixelPositionOfFirstTile.X + (this.tileWidth * (j + (maxNumTileToDisplay.width - minTilePositionToDraw.X))),
                                                    pixelPositionOfFirstTile.Y + (this.tileHeight * (i + (maxNumTileToDisplay.height - minTilePositionToDraw.Y))));
                tileNumber++;
            }
        }
    };
     
    // private methods and properties
    var graphics = window.WAF.game.css.graphics;
    
}(window.WAF.game.css.graphics = window.WAF.game.css.graphics || {}));