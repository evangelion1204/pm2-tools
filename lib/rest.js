'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestInterface = function () {
    function RestInterface(pm2) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, RestInterface);

        this._pm2 = pm2;
    }

    _createClass(RestInterface, [{
        key: 'listen',
        value: function listen(port) {
            this._server = _http2.default.createServer(this.onRequest.bind(this));

            return this._server.listen(port);
        }
    }, {
        key: 'onRequest',
        value: function onRequest(request, response) {
            switch (request.url) {
                case '/healtcheck':
                    this._pm2.list(function (err, list) {
                        if (!err) {
                            var running = list.reduce(function (result, app) {
                                return result || app.pid !== 0;
                            }, false);

                            response.writeHead(running ? 200 : 500);
                            response.end(running ? 'OK' : 'FAIL');
                        } else {
                            response.writeHead(500);
                            response.end('FAIL');
                        }
                    });
                    break;
                case '/metrics':
                    this._pm2.list(function (err, list) {
                        if (!err) {
                            var processMetrics = list.map(function (app) {
                                return {
                                    process: app.monit
                                };
                            }, false);

                            response.writeHead(200);
                            response.end(JSON.stringify(processMetrics));
                        } else {
                            response.writeHead(500);
                            response.end('FAIL');
                        }
                    });
                    break;
                default:
                    response.writeHead(404);
                    response.end('Not found');
            }
        }
    }]);

    return RestInterface;
}();

exports.default = RestInterface;