var RestService = require('../..').RestService;
var Counter = require('../..').Metrics.Counter;
var MultiCounter = require('../..').Metrics.MultiCounter;
var Average = require('../..').Metrics.Average;
var MultiAverage = require('../..').Metrics.MultiAverage;
var instance = new RestService({
    monitor_apps: ['server']
});

instance.registerMetric('total_requests', new Counter());
instance.registerMetric('requests_by_path', new MultiCounter());
instance.registerMetric('average_request_time', new Average());
instance.registerMetric('request_time_by_path', new MultiAverage());

instance.connect().then(function () {
    instance.listen(8001);
});