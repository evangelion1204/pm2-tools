import http from 'http';

export default class RestInterface {
    constructor (pm2, options = {}) {
        this._pm2 = pm2;
    }

    listen(port) {
        this._server = http.createServer(this.onRequest.bind(this));

        return this._server.listen(port);
    }

    onRequest(request, response) {
        switch(request.url) {
            case '/healtcheck':
                this._pm2.list(function (err, list) {
                    if (!err) {
                        const running = list.reduce(function (result, app) {
                            return result || app.pid !== 0
                        }, false);

                        response.writeHead(running ? 200 : 500);
                        response.end(running ? 'OK' : 'FAIL');
                    }
                    else {
                        response.writeHead(500);
                        response.end('FAIL');
                    }
                });
                break;
            case '/metrics':
                this._pm2.list(function (err, list) {
                    if (!err) {
                        const processMetrics = list.map(function (app) {
                            return {
                                process: app.monit
                            }
                        }, false);

                        response.writeHead(200);
                        response.end(JSON.stringify(processMetrics));
                    }
                    else {
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
}


