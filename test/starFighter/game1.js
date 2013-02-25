/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-23          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.test = window.WAF.test || {};
window.WAF.test.starFighter = window.WAF.test.starFighter || {};

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
    customObject.extend(window.WAF.game.Game, window.WAF.test.starFighter.Game1);
    
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
        background = new window.WAF.game.css.graphics.BackgroundImage("game", "backgroundStarfield", "starfield", initPosition);
        
        // sprite
        starship = new window.WAF.test.starFighter.Starship("backgroundStarfield");
        
        // enemy
        enemy = new window.WAF.test.starFighter.Enemy("backgroundStarfield");
        
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
        starship.update(gameTime);
        enemy.update(gameTime);
        
        // check collision...
        for (var i=0; i<starship.pulseList.length; i++) {                   // pulse
            if (enemy.checkAsteroidHitbox(starship.pulseList[i].hitbox)) {
                starship.destroyPulse(i);
            }
        }
        for (i=0; i<starship.pulseList.length; i++) {
            if (enemy.checkWaveshipHitbox(starship.pulseList[i].hitbox)) {
                starship.destroyPulse(i);
            }
        }
        for (i=0; i<starship.pulseList.length; i++) {
            if (enemy.checkRocketshipHitbox(starship.pulseList[i].hitbox)) {
                starship.destroyPulse(i);
            }
        }
        for (var j=0; j<enemy.asteroidList.length; j++) {                   // starship
            starship.checkHitbox(enemy.asteroidList[j].hitbox);
        }
        for (j=0; j<enemy.waveshipList.length; j++) {
            starship.checkHitbox(enemy.waveshipList[j].hitbox);
        }
        for (j=0; j<enemy.rocketshipList.length; j++) {
            starship.checkHitbox(enemy.rocketshipList[j].hitbox);
        }
        
        // sprite...
        function move(sprite, x, y) {
            sprite.x += x;
            sprite.y += y;
            
            // limit set by the world
            if (sprite.x < 0) {
                sprite.x -= x;
            } else if (sprite.x > (document.getElementById("backgroundStarfield").scrollWidth - sprite.width)) {
                sprite.x -= x;
            }
            
            if (sprite.y <= 0) {
                sprite.y -= y;
            } else if (sprite.y >= (document.getElementById("backgroundStarfield").scrollHeight - sprite.height)) {
                sprite.y -= y;
            }
            
            // scrolling the background
            if (((sprite.x + sprite.width) - document.getElementById("backgroundStarfield").scrollLeft) > (window.innerWidth / 3 * 2)) {
                background.scrollRight(x, false);
            }
            if ((sprite.x - document.getElementById("backgroundStarfield").scrollLeft) < (window.innerWidth / 3 * 1)) {
                background.scrollLeft(-x, false);
            }
            if (((sprite.y + sprite.height) - document.getElementById("backgroundStarfield").scrollTop) > (window.innerHeight / 4 * 3)) {
                background.scrollDown(y, false);
            }
            if ((sprite.y - document.getElementById("backgroundStarfield").scrollTop) < (window.innerHeight / 4 * 1)) {
                background.scrollUp(-y, false);
            }
        }
        
        // keyboard...
        var speed = Math.ceil(5/16 * gameTime.elapsedGameTime);
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {
            move(starship, -speed, 0);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            move(starship, speed, 0);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            move(starship, 0, -speed);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            move(starship, 0, speed);
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.Space) && starship.size == 1) {
            starship.shoot();
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.a)) {
            enemy.asteroidFieldFlag = !enemy.asteroidFieldFlag;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.r)) {
            enemy.rocketshipFlag = true;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.w)) {
            enemy.waveshipFlag = true;
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
        
        // sprite
        starship.draw();
        enemy.draw();
        
        // call function of super class
        window.WAF.game.Game.prototype.draw.call(this);
    };
    
    // private methods and properties
    var starFighter = window.WAF.test.starFighter;
    var fps = 0;
    var tbf = 0;
    var background = null;
    var starship = null;
    var enemy = null;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));