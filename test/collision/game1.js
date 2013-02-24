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
    namespace.Game1 = function() {
        // call constructor of super class
        window.WAF.game.Game.call(this);
    };
    
    // inherits from Game (css)
    var customObject = new window.WAF.utils.CustomObject();
    customObject.extend(window.WAF.game.Game, window.WAF.test.collision.Game1);
    
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
        
        // level
        stage = new window.WAF.test.collision.Stage();
        
        // sprite
        mario = new window.WAF.test.collision.Mario();
        
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
        
        // game update...
        mario.update();
        
        // sprite...
        function move(sprite, x, y) {
            sprite.x += x;
            sprite.y += y;
            
            // limit set by the world
            if (sprite.x < 0) {
                sprite.x -= x;
            } else if (sprite.x > (document.getElementById("backgroundField").scrollWidth - sprite.width)) {
                sprite.x -= x;
            }
            
            if (sprite.y <= 0) {
                sprite.y -= y;
            } else if (sprite.y >= (document.getElementById("backgroundField").scrollHeight - sprite.height)) {
                sprite.y -= y;
            }
            
            // checking for collision
            sprite.checkHitbox(stage.hitboxList);
            
            // scrolling the background
            if (((sprite.x + sprite.width) - document.getElementById("backgroundField").scrollLeft) > (window.innerWidth / 3 * 2)) {
                background.scrollRight(x, false);
            }
            if ((sprite.x - document.getElementById("backgroundField").scrollLeft) < (window.innerWidth / 3 * 1)) {
                background.scrollLeft(-x, false);
            }
            if (((sprite.y + sprite.height) - document.getElementById("backgroundField").scrollTop) > (window.innerHeight / 4 * 3)) {
                background.scrollDown(y, false);
            }
            if ((sprite.y - document.getElementById("backgroundField").scrollTop) < (window.innerHeight / 4 * 1)) {
                background.scrollUp(-y, false);
            }
        }
        
        // keyboard...
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {
            move(mario, -5, 0);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            move(mario, 5, 0);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            move(mario, 0, -5);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            move(mario, 0, 5);
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
        
        // background
        background.draw();
        
        // stage
        stage.draw();
        
        // sprite
        mario.draw();
        
        // call function of super class
        window.WAF.game.Game.prototype.draw.call(this);
    };
    
    // private methods and properties
    var collision = window.WAF.test.collision;
    var fps = 0;
    var tbf = 0;
    var background = null;
    var stage = null;
    var mario = null;
    
}(window.WAF.test.collision = window.WAF.test.collision || {}));