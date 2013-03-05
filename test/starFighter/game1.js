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
        var initPosition = {};                                              // position of the background
        initPosition.X = 0;
        initPosition.Y = 0;
        initPosition.rightLimit = Math.floor(window.innerWidth / 3 * 2);    // limit for scrolling
        initPosition.leftLimit = Math.floor(window.innerWidth / 3 * 1);
        initPosition.topLimit = Math.floor(window.innerHeight / 4 * 1);
        initPosition.bottomLimit = Math.floor(window.innerHeight / 4 * 3);  
        background = new window.WAF.game.css.graphics.BackgroundImage("game", "backgroundStarfield", "starfield", initPosition);
        
        // sprite
        starship = new window.WAF.test.starFighter.Starship("backgroundStarfield");
        
        // enemy
        enemy = new window.WAF.test.starFighter.Enemy("backgroundStarfield");
        
        // music
        music = new window.WAF.audio.Music("http://incompetech.com/music/royalty-free/mp3-royaltyfree/Poofy%20Reel.mp3");
        //music = new window.WAF.audio.Music("https://c9.io/sebastien_bolduc/waf/workspace/test/starFighter/sound/Poofy%20Reel.mp3");
        
        // network
        network = new window.WAF.network.WebSocketConnectionIO();
        network.setOnOpen();
        network.setOnClose();
        network.setOnMessage(function(data) {
            var obj = JSON.parse(data);
            
            switch (obj.type) {
                case "connection":
                    alert("match: " + obj.match + " --> message: " + obj.message);
                    break;
                case "sync":
                    var syncData = JSON.parse(obj.data);
                    starship.x = syncData.starshipX;
                    starship.y = syncData.starshipY;
                    break;
                case "message":
                    alert("match: " + obj.match + " --> message: " + obj.message);
                    break;
                default:
                    alert("ECHO --> message: " + obj.message);
            }
        });
        network.setOnError();
        
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
        background.update(starship);
        
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
        
        // keyboard...
        var speed = Math.ceil(5/16 * gameTime.elapsedGameTime);
        var keyboardState = this.keyboard.getState();
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Left)) {                                 // starship
            starship.move(-speed, 0, network);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Right)) {
            starship.move(speed, 0, network);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Up)) {
            starship.move(0, -speed, network);
        }
        if (keyboardState.isKeyDown(window.WAF.inputs.Keys.Down)) {
            starship.move(0, speed, network);
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.Space) && starship.size == 1) {
            starship.shoot();
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.a)) {                                // asteroid
            enemy.asteroidFieldFlag = !enemy.asteroidFieldFlag;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.r)) {                                // rocketship
            enemy.rocketshipFlag = true;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.w)) {                                // waveship
            enemy.waveshipFlag = true;
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.m)) {                                // music
            if (music.playing) {
                music.pause();    
            } else {
                music.play();
            }
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.n)) {                                // network
            if (!network.isOpen()) {
                console.log("open WebSocket connection...");
                //network.open("ws://echo.websocket.org/");
                network.open();
            } else {
                console.log("close WebSocket connection...");
                network.close();
            }
        }
        if (keyboardState.isKeyDownOnce(window.WAF.inputs.Keys.p)) {                                // message
            console.log("sending message...");
            network.send(JSON.stringify({"type":"message", "message":"This is a simple message!"}));
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
            if (!network.isOpen()) {
                console.log("open WebSocket connection...");
                //network.open("ws://echo.websocket.org/");
                network.open();
            } else {
                console.log("close WebSocket connection...");
                network.close();
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
    var music = null;
    var network = null;
    
}(window.WAF.test.starFighter = window.WAF.test.starFighter || {}));