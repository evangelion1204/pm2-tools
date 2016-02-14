
const defaultOptions = {
};

export default class MetricService {
    constructor(options = {}) {
        this.options = options;

        this.metrics = {};
    }

    registerMetric(name, metric) {
        this.metrics[name] = metric;
    }

    pushEvent(name, event) {
        this.metrics[name].push(event);
    }
}