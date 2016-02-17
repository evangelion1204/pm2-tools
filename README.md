# PM2 - Tools [![Build Status](https://travis-ci.org/evangelion1204/pm2-tools.svg?branch=master)](https://travis-ci.org/evangelion1204/pm2-tools) [![Coverage Status](https://coveralls.io/repos/github/evangelion1204/pm2-tools/badge.svg?branch=master)](https://coveralls.io/github/evangelion1204/pm2-tools?branch=master)

This package contains a few tools to work with AWS.

## REST - Interface

Will start a server on the specified port with currently the following endpoints

- `/healthcheck` => returns 200 if at least one of the watched processes is still live
- `/metrics` => wraps the `pm2 list` command and returns the following structure
```json
{
    "processes": [{
        "process": {
            "memory": "<usage in bytes>",
            "cpu": "<cpu usage in %>"
        },
        "restarts": "<number of restarts>",
        "status": "<current process status (online...)>",
        "name": "<name of the app>"
    }],
    "metrics": {
        "<name>": "<metric data>"
    }
}
```

### Usage

Let your application run with PM2, either via JSON or directly via command line and additionally run this script.

```js
'use strict';

const RestService = require('pm2-tools').RestService;

const app = new RestService({
    monitor_apps: ['my-application'] // if you just want to monitor specific apps
});

app.connect().then(function () {
    app.listen(7979)
});
```

The passed options `monitor_apps` allows you to control which PM2 applications you want to monitor. If not passed all will be monitored.

#### Via PM2

Another possibility is to also start the status/metric server with PM2.

```json
{
  "apps": [
    {
      "name": "status",
      "script": "src/status.js",
      "instances": 1,
      "max_memory_restart": "200M"
    },
    {
      "name": "my-app",
      "script": "src/server.js",
      "instances": 4,
      "max_memory_restart": "200M",
      "exec_mode": "cluster"
    }
  ],
}
```

The only important config is the the above described `monitor_apps` which needs to be set to `['my-app']` to deliver the correct status, else we would take status into account too and would never get a bad healthcheck.

For Docker finally start with `pm2 --no-daemon pm2.json` to keep Docker alive or without `--no-daemon` for any other environment.

### Metrics

There are 4 different built in metrics.

- Counter => a simple counter which requires no params
- MultiCounter => like counter but accepts one additional param to count for examples requests paths
- Average => a simple average counter to measure response times
- MultiAverage => like average it accepts an additional param that allows to measure for example different averages of request paths
Updadad
#### Usage

##### Register

Before using a custom metric it needs to be registered.

```js
    var MultiAverage = require('pm2-tools').Metrics.MultiAverage;

    instance.registerMetric('request_time_by_path', new MultiAverage());
```

##### Sending data to metrics

The application it self can use the `MessageBus` to publish metrics.

```js
var MessageBus = require('pm2-tools').MessageBus;
var bus = new MessageBus();

bus.publish('request_time_by_path', new Date() - start, '/my-url');
```