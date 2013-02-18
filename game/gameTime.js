/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-17          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.game = window.WAF.game || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param 
     * @return 
     */
    namespace.GameTime = function() {
        this.currentGameTime = 0;
        this.elapsedGameTime = 0;
        this.averageFPS = [];
        this.averageTBF = [];
        
        this.currentGameTime = new Date().getTime();
        this.elapsedGameTime = namespace.currentGameTime;
    };
    
    /**
     * Updating the amount of elapsed game time since the last update.
     * 
     * @param 
     * @return 
     */
    namespace.GameTime.prototype.update = function() {   
        this.elapsedGameTime = (new Date().getTime()) - this.currentGameTime;    
        
        this.currentGameTime = new Date().getTime();
        
        // fps
        this.averageFPS.push(1000 / this.elapsedGameTime);
        // tbf
        this.averageTBF.push(this.elapsedGameTime);
    };
    
    /**
     * Return the average frame per second achieve by the program.
     * 
     * @param 
     * @return Average frame per second. 
     */
    namespace.GameTime.prototype.averageFramePerSecond = function() {
        var averageFPS = 0;
        
        // keep a maximum of 10 elements
        if (this.averageFPS.length > 10) {
            this.averageFPS.shift();
        }
        
        /*this.averageFPS.forEach(function(fps) {
               averageFPS += fps;
        });*/
        for (var i=0; i<10; i++) {
            averageFPS += this.averageFPS[i];
        }
        
        return Math.floor(averageFPS / this.averageFPS.length);
    };
    
    /**
     * Return the average time between frame achieve by the program.
     * 
     * @param 
     * @return Average time between frame. 
     */
    namespace.GameTime.prototype.averageTimeBetweenFrame = function() {
        var averageTBF = 0;
        
        // keep a maximum of 10 elements
        if (this.averageTBF.length > 10) {
            this.averageTBF.shift();
        }
        
        /*this.averageTBF.forEach(function(tbf) {
               averageTBF += tbf;
        });*/
        for (var i=0; i<10; i++) {
            averageTBF += this.averageTBF[i];
        }
        
        return Math.floor(averageTBF / this.averageTBF.length);
    };

    // private methods and properties
    var game = window.WAF.game;
    
}(window.WAF.game = window.WAF.game || {}));