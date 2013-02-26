/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-26          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.network = window.WAF.network || {};
window.WAF.io = io;                                 // define by Node.js

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param
     * @return 
     */
    namespace.WebSocketConnectionIO = function() {
        this.connection = null;
        this.onOpenFunction = null;
        this.onCloseFunction = null;
        this.onMessageFunction = null;
        this.onErrorFunction = null;
    };
    
    /**
     * Tell if a WebSocket connection is activated.
     * 
     * @param
     * @return True of False depending on the state of the connection.
     */
    namespace.WebSocketConnectionIO.prototype.isOpen = function() {
        if (!this.connection || !this.connection.socket.connected) {
            return false;
        }
        
        return true;
    };
    
    /**
     * Open a WebSockect connection.
     * 
     * @param
     * @return
     */
    namespace.WebSocketConnectionIO.prototype.open = function() {
        if (!this.connection) {
            this.connection = window.WAF.io.connect(null,{'auto connect': false}); 
            this.connection.socket.connect();
        } else {
            this.connection.socket.reconnect();
        }
            
        this.setOnOpen();
        this.setOnClose();
        this.setOnMessage();
        this.setOnError();
    };
    
    /**
     * Close a WebSocket connection.
     * 
     * @param
     * @return
     */
    namespace.WebSocketConnectionIO.prototype.close = function() {
        this.connection.socket.disconnect();
    };
    
    /**
     * Send data via a WebSocket connection.
     * 
     * @param data Data to be send.
     * @return
     */
    namespace.WebSocketConnectionIO.prototype.send = function(data) {
        if (typeof data !== "undefined" && this.connection !== null && this.connection.socket.connected) {
            this.connection.send(data);
        }
    };
    
    /**
     * Set a function to execute when a connection is open.
     * 
     * @param functionToCall Function link to the 'onopen' event.
     * @return
     */
    namespace.WebSocketConnectionIO.prototype.setOnOpen = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onOpenFunction = functionToCall;  
        } else if (this.onOpenFunction === null) {
            this.onOpenFunction = function(data) { alert('Open socket: ' + data); };
        }
        
        this.connection.on('connect', this.onOpenFunction);
        this.connection.on('reconnect', function() { alert('reconnecting...')});
    };
    
    /**
     * Set a function to execute when a connection is close.
     * 
     * @param functionToCall Function link to the 'onclose' event.
     * @return 
     */
    namespace.WebSocketConnectionIO.prototype.setOnClose = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onCloseFunction = functionToCall;  
        } else if (this.onCloseFunction === null) {
            this.onCloseFunction = function(data) { alert('Close socket: ' + data); };
        }
    
        this.connection.on('disconnect', this.onCloseFunction);
    };
    
    /**
     * Set a function to execute when we receive a message.
     * 
     * @param functionToCall Function link to the 'onmessage' event.
     * @return 
     */
    namespace.WebSocketConnectionIO.prototype.setOnMessage = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onMessageFunction = functionToCall;  
        } else if (this.onMessageFunction === null) {
            this.onMessageFunction = function(data) { alert('Message: ' + data); };
        }
        
        this.connection.on('message', this.onMessageFunction);
    };
    
    /**
     * Set a function to execute when an error happen.
     * 
     * @param functionToCall Function link to the 'onerror' event.
     * @return 
     */
    namespace.WebSocketConnectionIO.prototype.setOnError = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onErrorFunction = functionToCall;  
        } else if (this.onErrorFunction === null) {
            this.onErrorFunction = function(data) { alert('Error: ' + data); };
        }
        
        this.connection.on('error', this.onErrorFunction);
    };
    
    // private methods and properties
    var network = window.WAF.network;
    
}(window.WAF.network = window.WAF.network || {}));