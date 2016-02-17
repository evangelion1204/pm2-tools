var RestService = require('../..').RestService;
var Counter = require('../..').Metrics.Counter;
var Average = require('../..').Metrics.Average;
var instance = new RestService({
    monitor_apps: ['server']
});

instance.registerMetric('total_requests', new Counter());
instance.registerMetric('average_request_time', new Average());

instance.connect().then(function () {
    instance.listen(8001);
});