'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

import Metric from '../../src/metrics/counter';

describe('CounterMetric', function() {
    it('should be a class', function () {
        expect(Metric).to.be.a('function');
    });

    it('should be a initialized correct', function () {
        var instance = new Metric();

        expect(instance).to.be.an('object');
    });

    it('should calculate the correct value if nothing pushed yet', function () {
        var instance = new Metric();

        expect(instance.value).to.be.equal(0);
    });

    it('should calculate the correct value if multiple times called', function () {
        var instance = new Metric();

        instance.push();
        instance.push();
        instance.push();

        expect(instance.value).to.be.equal(3);
    });
});