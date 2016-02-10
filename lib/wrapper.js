'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pm2 = require('pm2');
var http = require('http');

var PM2Wrapper = function () {
    function PM2Wrapper() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, PM2Wrapper);

        this.options = options;
    }

    _createClass(PM2Wrapper, [{
        key: 'run',
        value: function run() {
            pm2.connect(this.onConnected.bind(this));
        }
    }, {
        key: 'onConnected',
        value: function onConnected(err) {
            var _this = this;

            if (err) {
                console.error(err);
                process.exit(2);
            }

            var instances = this.options.instances.map(function (instance) {
                return Object.assign({}, instance, _this.options.passArguments ? { args: process.argv } : {});
            });

            pm2.start(instances, this.onStarted.bind(this));
        }
    }, {
        key: 'onStarted',
        value: function onStarted(err) {
            pm2.launchBus(function (err, bus) {
                console.log('[PM2] Log streaming started');

                bus.on('process:msg', function (packet) {
                    console.log('received message', JSON.stringify(packet));
                });

                bus.on('log:out', function (packet) {
                    console.log('[App:%s] %s', packet.process.name, packet.data);
                });

                bus.on('log:err', function (packet) {
                    console.error('[App:%s][Err] %s', packet.process.name, packet.data);
                });
            });
        }
    }]);

    return PM2Wrapper;
}();

exports.default = PM2Wrapper;