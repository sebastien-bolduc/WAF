/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-17          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};
window.WAF.game.css = window.WAF.game.css || {};

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
    customObject.extend(window.WAF.game.Game, window.WAF.game.css.Game1);
    
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
        
        // test sprites...
        sprite0 = new css.graphics.Sprite("sprite0");
        sprite1 = new css.graphics.Sprite("sprite1");
        sprite1.xIncrement = 5;
        sprite1.yIncrement = 5;
        sprite2 = new css.graphics.Sprite("sprite2");
        sprite2.xIncrement = 4;
        sprite2.yIncrement = 4;
        sprite3 = new css.graphics.Sprite("sprite3");
        sprite3.xIncrement = 3;
        sprite3.yIncrement = 3;
        sprite4 = new css.graphics.Sprite("sprite4");
        sprite4.xIncrement = 2;
        sprite4.yIncrement = 2;
        sprite5 = new css.graphics.Sprite("sprite5");
        sprite5.xIncrement = 1;
        sprite5.yIncrement = 1;
        
        // test background...
        background = new css.graphics.Background();
        background.initializeBackground();
        
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
        function move(sprite, x, y) {
            if (x <= 0) {
                sprite.xIncrement = -sprite.xIncrement;
            } else if (x >= (window.innerWidth-206-15)) {
                sprite.xIncrement = -sprite.xIncrement;
            }
            
            if (y <= 0) {
                sprite.yIncrement = -sprite.yIncrement;
            } else if (y >= (window.innerHeight-206-15)) {
                sprite.yIncrement = -sprite.yIncrement;
            }
        };
        
        sprite1.x += sprite1.xIncrement;
        sprite1.y += sprite1.yIncrement;
        move(sprite1, sprite1.x, sprite1.y);
        sprite2.x += sprite2.xIncrement;
        sprite2.y += sprite2.yIncrement;
        move(sprite2, sprite2.x, sprite2.y);
        sprite3.x += sprite3.xIncrement;
        sprite3.y += sprite3.yIncrement;
        move(sprite3, sprite3.x, sprite3.y);
        sprite4.x += sprite4.xIncrement;
        sprite4.y += sprite4.yIncrement;
        move(sprite4, sprite4.x, sprite4.y);
        sprite5.x += sprite5.xIncrement;
        sprite5.y += sprite5.yIncrement;
        move(sprite5, sprite5.x, sprite5.y);
        
        // keyboard...
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {
            sprite0.x -= 5;
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            sprite0.x += 5;;
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            sprite0.y -= 5;
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            sprite0.y += 5;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.s)) {
            if (this.charmBar.top) {
                this.charmBar.hideTopCharmBar("status");
                document.getElementById("sprite0").className = "sprite0 mario";
            } else {
                this.charmBar.showTopCharmBar("status");
                document.getElementById("sprite0").className = "sprite0 goomba";
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
        
        // test sprites...
        sprite0.translateSprite(sprite0.x, sprite0.y);
        sprite1.translateSprite(sprite1.x, sprite1.y);
        sprite2.translateSprite(sprite2.x, sprite2.y);
        sprite3.translateSprite(sprite3.x, sprite3.y);
        sprite4.translateSprite(sprite4.x, sprite4.y);
        sprite5.translateSprite(sprite5.x, sprite5.y);
        
        // call function of super class
        window.WAF.game.Game.prototype.draw.call(this);
    };
    
    // private methods and properties
    var css = window.WAF.game.css;
    var fps = 0;
    var tbf = 0;
    var sprite0 = null;
    var sprite1 = null;
    var sprite2 = null;
    var sprite3 = null;
    var sprite4 = null;
    var sprite5 = null;
    var background = null;
    
}(window.WAF.game.css = window.WAF.game.css || {}));