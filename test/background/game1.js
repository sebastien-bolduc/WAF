/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-21          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test= window.WAF.test || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.Game1 = function() {
        // call constructor of super class
        window.WAF.game.Game.call(this);
    };
    
    // inherits from Game (css)
    var customObject = new window.WAF.utils.CustomObject();
    customObject.extend(window.WAF.game.Game, window.WAF.test.Game1);
    
    /**
     * Allows the game to perform any initialization it needs to before starting to 
     * run.
     * 
     * @param 
     * @return
     */
    namespace.Game1.prototype.initialize = function() {
        // TODO: Add your initialization logic here
        document.getElementById("element1").innerHTML = "Average frame per second (fps): --";
        document.getElementById("element2").innerHTML = "Average time between frame: -- ms";
        
        // background
        var initPosition = {};  // position of the background
        initPosition.X = 0;
        initPosition.Y = 0;
        background = new window.WAF.game.css.graphics.BackgroundImage("game", "backgroundField", "field", initPosition);
        
        // background (loop)
        /*var initPosition = {};  // position of the background
        initPosition.X = 2592;
        initPosition.Y = 1944;
        background = new window.WAF.game.css.graphics.BackgroundImage("game", "backgroundField", "fieldLoop", initPosition);*/
        
        // sprite
        spriteList = [];
        for (var i=0; i<20; i++) {
            spriteList.push(new window.WAF.game.css.graphics.SpriteImage("backgroundField", "spriteMario" + i, "mario"));
            spriteList[i].translate(Math.floor(Math.random()*800), 0);
            spriteList[i].xIncrement = Math.floor(Math.random()*5 + 1);
            spriteList[i].yIncrement = Math.floor(Math.random()*5 + 1);
        }
        
        // call function of super class
        window.WAF.game.Game.prototype.initialize.call(this);
    };
    
    /**
     * Allows the game to run logic such as updating the world, checking for 
     * collisions, gathering input, and playing audio.
     * 
     * @param gameTime GameTime object to update with the function call.
     * @return 
     */
    namespace.Game1.prototype.update = function(gameTime) {
        // TODO: Add your update logic here
        fps = gameTime.averageFramePerSecond();
        tbf = gameTime.averageTimeBetweenFrame();
        
        // sprite...
        function move(sprite) {
            sprite.x += sprite.xIncrement;
            sprite.y += sprite.yIncrement;
            
            if (sprite.x <= 0) {
                sprite.xIncrement = -sprite.xIncrement;
            } else if (sprite.x >= (document.getElementById("backgroundField").scrollWidth - 256 - 15)) {
                sprite.xIncrement = -sprite.xIncrement;
            }
            
            if (sprite.y <= 0) {
                sprite.yIncrement = -sprite.yIncrement;
            } else if (sprite.y >= (document.getElementById("backgroundField").scrollHeight - 256 - 15)) {
                sprite.yIncrement = -sprite.yIncrement;
            }
        }
        for (var i=0; i<spriteList.length; i++) {
            move(spriteList[i]);
        }
        
        // keyboard...
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {
            background.scrollLeft(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            background.scrollRight(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            background.scrollUp(5, false);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            background.scrollDown(5, false);
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.s)) {
            if (this.charmBar.top) {
                this.charmBar.hideTopCharmBar("status");
            } else {
                this.charmBar.showTopCharmBar("status");
            }
        }
        
        // touch...
        var touchState = this.touch.getState();
        if (touchState.hasBeenTouched()) {
            if (this.charmBar.top) {
                this.charmBar.hideTopCharmBar("status");
            } else {
                this.charmBar.showTopCharmBar("status");
            }
        }
        
        // call function of super class
        window.WAF.game.Game.prototype.update.call(this, gameTime);
    };
    
    /**
     * This is called when the game should draw itself.
     * 
     * @param 
     * @return 
     */
    namespace.Game1.prototype.draw = function() {
        // TODO: Add your drawing code here
        document.getElementById("element1").innerHTML = "Average frame per second (fps): " + fps;
        document.getElementById("element2").innerHTML = "Average time between frame: " + tbf + " ms";
        
        // sprite
        for (var i=0; i<spriteList.length; i++) {
            spriteList[i].translate(spriteList[i].x, spriteList[i].y);
        }
        
        // call function of super class
        window.WAF.game.Game.prototype.draw.call(this);
    };
    
    // private methods and properties
    var test = window.WAF.test;
    var fps = 0;
    var tbf = 0;
    var background = null;
    var spriteList = null;
    
}(window.WAF.test = window.WAF.test || {}));