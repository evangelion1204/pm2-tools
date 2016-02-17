'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

import Metric from '../../src/metrics/multi-average';

describe('MultiAverageMetric', function() {
    it('should be a class', function () {
        expect(Metric).to.be.a('function');
    });

    it('should be a initialized correct', function () {
        var instance = new Metric();

        expect(instance).to.be.an('object');
    });

    it('should calculate the correct value if one value is passed', function () {
        var instance = new Metric();

        expect(instance.push(10).value).to.deep.equal({
            default: 10
        });
    });

    it('should calculate the correct value if multiple values are passed', function () {
        var instance = new Metric();

        instance.push(10, 'metric1');
        instance.push(20, 'metric2');
        instance.push(40, 'metric1');

        expect(instance.value).to.deep.equal({
            metric1: 25,
            metric2: 20
        });
    });

    it('serialize should return the value', function () {
        var instance = new Metric();

        instance.push(10);
        instance.push(20);
        instance.push(30);

        expect(instance.serialize()).to.deep.equal(instance.value);
    });
});