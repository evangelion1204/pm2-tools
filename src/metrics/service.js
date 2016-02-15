
const defaultOptions = {
};

export default class MetricsService {
    constructor(options = {}) {
        this.options = options;

        this.metrics = {};
    }

    register(name, metric) {
        this.metrics[name] = metric;

        return this;
    }

    push(name, event) {
        if (!this.metrics[name]) {
            throw new Error(`Metric "${name}" is not registered`)
        }

        this.metrics[name].push(event);

        return this;
    }

    serialize() {
        return Object.keys(this.metrics).reduce(
            (result, metric) => Object.assign(result, {metric: this.metrics[metric].serialize()}),
            {}
        );
    }
}