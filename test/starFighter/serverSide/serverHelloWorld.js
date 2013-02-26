/**
 * @author      Sébastien Bolduc    <sebastien.bolduc@gmail.com>
 * @version     0.0                 (current version number of program)
 * @since       2013-02-26          (the version of the package this class was first added to)
 */

// requires node's http module
var http = require('http');

// info
var port = process.env.PORT;

// creates a new httpServer instance
http.createServer(function (req, res) {
    // this is the callback, or request handler for the httpServer

    // respond to the browser, write some headers so the 
    // browser knows what type of content we are sending
    res.writeHead(200, {'Content-Type': 'text/html'});

    // write some content to the browser that your user will see
    res.write('<h1>hello, i know nodejs from Cloud9 IDE.</h1>');

    // close the response
    res.end();
}).listen(port); // the server will listen on 'port'