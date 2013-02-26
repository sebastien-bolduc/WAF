/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-26          (the version of the package this class was first added to)
 */

// requires node's
var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')

app.listen(process.env.PORT || 8001);

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

io.sockets.on('connection', function (socket) {
    // echo the message
    socket.on('message', function (data) {
        console.info(data);
        socket.send("[ECHO] "+data);
    });
});