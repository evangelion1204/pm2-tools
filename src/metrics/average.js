const defaultOptions = {
};

export default class AverageMetric {
    constructor(options = {}) {
        this.options = Object.assign({}, defaultOptions, options);

        this.counter = 0;
        this.average = 0;
    }

    push(value) {
        this.average = (this.average * this.counter + value) / (this.counter + 1);
        this.counter++;

        return this;
    }

    get value() {
        return this.average;
    }

    serialize() {
        return this.value;
    }
}