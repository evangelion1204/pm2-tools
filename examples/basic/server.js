var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Ok');
}).listen(9999);

console.log('Running on 9999')