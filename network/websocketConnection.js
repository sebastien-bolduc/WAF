/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-25          (the version of the package this class was first added to)
 */

// create global namespace
window.WAF = window.WAF || {};
window.WAF.network = window.WAF.network || {};

// using IIFE (Immediately-Invoked Function Expression) to give each file its own local scope
(function(namespace, undefined) {
    // public methods and properties
    /**
     * Constructor.
     * 
     * @param
     * @return 
     */
    namespace.WebSocketConnection = function() {
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
    namespace.WebSocketConnection.prototype.isOpen = function() {
        if (!this.connection) {
            return false;
        } else if (this.connection.readyState === 0 || this.connection.readyState === 3) {
            return false;
        }
        
        return true;
    };
    
    /**
     * Open a WebSockect connection.
     * 
     * @param url Url of the server to connect to.
     * @return
     */
    namespace.WebSocketConnection.prototype.open = function(url) {
        this.connection =  new WebSocket(url);
        
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
    namespace.WebSocketConnection.prototype.close = function() {
        this.connection.close();
    };
    
    /**
     * Send data via a WebSocket connection.
     * 
     * @param data Data to be send.
     * @return
     */
    namespace.WebSocketConnection.prototype.send = function(data) {
        if (typeof data !== "undefined") {
            this.connection.send(data);
        }
    };
    
    /**
     * Set a function to execute when a connection is open.
     * 
     * @param functionToCall Function link to the 'onopen' event.
     * @return
     */
    namespace.WebSocketConnection.prototype.setOnOpen = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onOpenFunction = functionToCall;  
        } else if (this.onOpenFunction === null) {
            this.onOpenFunction = function(e) { alert('Open socket: ' + e.data); };
        }
        
        this.connection.onopen = this.onOpenFunction;
    };
    
    /**
     * Set a function to execute when a connection is close.
     * 
     * @param functionToCall Function link to the 'onclose' event.
     * @return 
     */
    namespace.WebSocketConnection.prototype.setOnClose = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onCloseFunction = functionToCall;  
        } else if (this.onCloseFunction === null) {
            this.onCloseFunction = function(e) { alert('Close socket: ' + e.data); };
        }
        
        this.connection.onclose = this.onCloseFunction;
    };
    
    /**
     * Set a function to execute when we receive a message.
     * 
     * @param functionToCall Function link to the 'onmessage' event.
     * @return 
     */
    namespace.WebSocketConnection.prototype.setOnMessage = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onMessageFunction = functionToCall;  
        } else if (this.onMessageFunction === null) {
            this.onMessageFunction = function(e) { alert('Message: ' + e.data); };
        }
        
        this.connection.onmessage = this.onMessageFunction;
    };
    
    /**
     * Set a function to execute when an error happen.
     * 
     * @param functionToCall Function link to the 'onerror' event.
     * @return 
     */
    namespace.WebSocketConnection.prototype.setOnError = function(functionToCall) {
        // set a default case
        if (typeof functionToCall !== "undefined") {
            this.onErrorFunction = functionToCall;  
        } else if (this.onErrorFunction === null) {
            this.onErrorFunction = function(e) { alert('Error: ' + e.data); };
        }
        
        this.connection.onerror = this.onErrorFunction;
    };
    
    // private methods and properties
    var network = window.WAF.network;
    
}(window.WAF.network = window.WAF.network || {}));