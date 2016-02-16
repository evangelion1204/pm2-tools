var RestService = require('../..').RestService;
var instance = new RestService({
    monitor_apps: ['server']
});

instance.connect().then(function () {
    instance.listen(8001);
});