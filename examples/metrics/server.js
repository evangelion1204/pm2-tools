var http = require('http');
var MessageBus = require('../..').MessageBus;
var bus = new MessageBus();

var server = this._server = http.createServer(function (req, res) {
    (function delayRequest(start) {
        setTimeout(function () {
            bus.publish('total_requests');
            bus.publish('average_request_time', new Date() - start);
            res.writeHead(200);
            res.end('Ok');
        }, Math.random() * 20 + 100);
    })(new Date());
});

server.listen(8000);
