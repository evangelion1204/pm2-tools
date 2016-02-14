const defaultOptions = {
};

export default class CountMetric {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);

        this.counter = 0;
    }

    push() {
        this.counter++;
    }

    get value() {
        return this.counter;
    }
}