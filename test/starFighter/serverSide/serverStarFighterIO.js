/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-26          (the version of the package this class was first added to)
 */

// requires node's
var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs');

// make the server listen to this port
app.listen(process.env.PORT || 8001);

/**
 * Handle an HTTP request.
 * 
 * @param req Request.
 * @param res Response.
 * @return
 */
function handler (req, res) {
    fs.readFile('test/starFighter/default.html',
        function (err, data) {
            if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {'Content-Type': 'text/html', "Content-Length": data.length});   
        res.end(data);
    });
}

var maxPerMatch = 2;
var onlineList = [];

/**
 * Call this function when we have a connection from the outside.
 * 
 * @param callback A function to callback.
 * @return
 */
io.sockets.on('connection', function (socket) {
    // create the player
    registerOnlineList(socket);
    
    // send message to a player
    socket.on('message', function (data) {
        var obj = JSON.parse(data);
        
        // act depending on the object type
        switch (obj.type) {
            case "sync":
                syncWithOther(socket, obj.data);
                break;
            case "message":
                sendMessageToOther(socket, obj.message)
                break;
            default:
                socket.send(JSON.stringify({"type":"echo", "message":"This is an echo...(not a valid type)."}));       
        }
    });
    
    // destroy the player
    socket.on('disconnect', function() {
        unregisterOnlineList(socket);
    });
});

/**
 * Register a new connection to the online list and match it with somebody else
 * if it is possible.
 * 
 * @param socket Socket responsible for the connection.
 * @return 
 */
function registerOnlineList(socket) {
    var data = "";
    
    // match with somebody already online
    for (var i=0; i<onlineList.length; i++) {
        if (onlineList[i].length > 0 && onlineList[i].length < maxPerMatch) {
            for (var j=0; j<onlineList[i].length; j++) {
                data = JSON.stringify({"type":"connection", "match":i, "message":"Online budy connecting..."});
                onlineList[i][j].send(data);  
            }
            onlineList[i].push(socket);
            data = JSON.stringify({"type":"connection", "match":i, "message":"You are connected...with someone"});
            socket.send(data);
            return;
        }
    }
    
    // create a new match
    onlineList.push([socket]);
    data = JSON.stringify({"type":"connection", "match":(onlineList.length - 1), "message":"You are connected..."});
    socket.send(data);
}

/**
 * Unregister a connection from the online list.
 * 
 * @param socket Socket responsible for the connection.
 * @return
 */
function unregisterOnlineList(socket) {
    var data = "";
    
    for (var i=0; i<onlineList.length; i++) {
        for (var j=0; j<onlineList[i].length; j++) {
            if (onlineList[i][j].id == socket.id) {
                // remove from a match
                onlineList[i].splice(j, 1);
                for (var k=0; k<onlineList[i].length; k++) {
                    data = JSON.stringify({"type":"connection", "match":i, "message":"Online budy disconnected..."});
                    onlineList[i][k].send(data);  
                }
                
                // remove from online list if match empty
                if (onlineList[i].length === 0) {
                    onlineList.splice(i, 1);
                }
                return;
            }
        }
    }     
}

/**
 * Syncing data with everybody else in the match.
 * 
 * @param socket Socket responsible for the connection.
 * @param data   Sync data to be sent.
 * @return
 */
function syncWithOther(socket, data) {
    var syncData = "";
    
    for (var i=0; i<onlineList.length; i++) {
        for (var j=0; j<onlineList[i].length; j++) {
            if (onlineList[i][j].id == socket.id && onlineList[i].length > 1) { 
                for (var k=0; k<onlineList[i].length; k++) {
                    if (k != j) {
                        syncData = JSON.stringify({"type":"sync", "match":i, "data":data});
                        onlineList[i][k].send(syncData);  
                    }
                }
                return;
            }
        }
    }
}

/**
 * Send a message to other connected with you.
 * 
 * @param socket  Socket responsible for the connection.
 * @param message Message to be sent to other.
 * @return
 */
function sendMessageToOther(socket, message) {
    var msgData = "";
    
    for (var i=0; i<onlineList.length; i++) {
        for (var j=0; j<onlineList[i].length; j++) {
            if (onlineList[i][j].id == socket.id && onlineList[i].length > 1) { 
                for (var k=0; k<onlineList[i].length; k++) {
                    if (k != j) {
                        msgData = JSON.stringify({"type":"message", "match":i, "message":message});
                        onlineList[i][k].send(msgData);  
                    }
                }
                return;
            }
        }
    }
}