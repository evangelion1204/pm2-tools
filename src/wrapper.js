var pm2 = require('pm2');
var http = require('http');

export default class PM2Wrapper {
    constructor(options = {}) {
        this.options = options;
    }

    run() {
        pm2.connect(this.onConnected.bind(this));
    }

    onConnected(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        const instances = this.options.instances.map(instance => Object.assign({}, instance, this.options.passArguments ? {args: process.argv} : {}));

        pm2.start(instances, this.onStarted.bind(this));
    }

    onStarted(err) {
        pm2.launchBus(function (err, bus) {
            console.log('[PM2] Log streaming started');

            bus.on('process:msg', function (packet) {
                console.log('received message', JSON.stringify(packet))
            });

            bus.on('log:out', function (packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data);
            });

            bus.on('log:err', function (packet) {
                console.error('[App:%s][Err] %s', packet.process.name, packet.data);
            });
        });
    }
}
