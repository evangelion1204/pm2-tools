const defaultOptions = {
};

export default class MultiAverageMetric {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);

        this.counter = {};
        this.average = {};
    }

    push(value, name = 'default') {
        this.counter[name] = this.counter[name] ? this.counter[name] + 1 : 1;
        this.average[name] = this.average[name] ? (this.average[name] * (this.counter[name] - 1) + value) / this.counter[name] : value;

        return this;
    }

    get value() {
        return this.average;
    }

    serialize() {
        return this.value;
    }
}