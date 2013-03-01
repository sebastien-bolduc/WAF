/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-26          (the version of the package this class was first added to)
 */

// requires node's
var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')

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

var player = 0;
var socketBoard = [];

// create the player
io.sockets.on('connection', function (socket) {
    socketBoard.push(socket);
    socket.send(player++);
    
    // send message to a player
    socket.on('message', function (data) {
        var element = data.split(" ");
        
        if (socketBoard[Number(element[0])]) {
            switch (element[1]) {
                case "position":
                    socketBoard[Number(element[0])].send("position " + element[2] + " " + element[3]);
                    break;
                default:
                    socketBoard[Number(element[0])].send("message " + element[2]);       
            }
        } else {
            socket.send("No other player...");
        }
    });
    
    // destroy the player
    socket.on('disconnect', function(socket) {
        socketBoard.splice(socketBoard.indexOf(socket));
        player--;
    });
});