const pm2 = require('pm2');
const http = require('http');

const defaultOptions = {
    monitor_apps: []
};

export default class RestInterface {
    constructor (options = {}) {
        this.options = Object.assign({}, defaultOptions, options);
    }

    connect() {
        return new Promise(function (resolve, reject) {
            pm2.connect(err => err ? reject(err) : resolve());
        }.bind(this))
    }

    listen(port) {
        this._server = http.createServer(this.onRequest.bind(this));

        console.log(`Listening on port ${port}`)

        return this._server.listen(port);

    }

    onRequest(request, response) {
        switch(request.url) {
            case '/healthcheck':
                pm2.list(function (err, list) {
                    if (!err) {
                        const running = list.filter(function (app) {
                            return this.options.monitor_apps.length ? this.options.monitor_apps.indexOf(app.name) >= 0 : true;
                        }.bind(this)).reduce(function (result, app) {
                            return result || app.pid !== 0
                        }, false);

                        response.writeHead(running ? 200 : 500);
                        response.end(running ? 'OK' : 'FAIL');
                    }
                    else {
                        response.writeHead(500);
                        response.end('FAIL');
                    }
                }.bind(this));
                break;
            case '/metrics':
                pm2.list(function (err, list) {
                    if (!err) {
                        const processMetrics = list.filter(function (app) {
                                return this.options.monitor_apps.length ? this.options.monitor_apps.indexOf(app.name) >= 0 : true;
                            }.bind(this)).map(function (app) {
                            return {
                                process: app.monit,
                                restarts: app.pm2_env.restart_time,
                                status: app.pm2_env.status,
                                name: app.name
                            }
                        }, false);

                        response.writeHead(200);
                        response.end(JSON.stringify(processMetrics));
                    }
                    else {
                        response.writeHead(500);
                        response.end('FAIL');
                    }
                }.bind(this));
                break;
            default:
                response.writeHead(404);
                response.end('Not found');
        }
    }
}


