var http = require('http');

var server = this._server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Ok');
});

server.listen(8000);
