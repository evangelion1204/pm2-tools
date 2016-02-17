const defaultOptions = {
};

export default class MultiCounterMetric {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);

        this.counter = {};
    }

    push(name = 'default') {
        this.counter[name] = this.counter[name] ? this.counter[name] + 1 : 1;
    }

    get value() {
        return this.counter;
    }

    serialize() {
        return this.value;
    }
}