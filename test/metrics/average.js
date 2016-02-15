'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

import Metric from '../../src/metrics/average';

describe('AverageMetric', function() {
    it('should be a class', function () {
        expect(Metric).to.be.a('function');
    });

    it('should be a initialized correct', function () {
        var instance = new Metric();

        expect(instance).to.be.an('object');
    });

    it('should calculate the correct value if one value is passed', function () {
        var instance = new Metric();

        expect(instance.push(10).value).to.be.equal(10);
    });

    it('should calculate the correct value if multiple values are passed', function () {
        var instance = new Metric();

        instance.push(10);
        instance.push(20);
        instance.push(30);

        expect(instance.value).to.be.equal(20);
    });

    it('serialize should return the value', function () {
        var instance = new Metric();

        instance.push(10);
        instance.push(20);
        instance.push(30);

        expect(instance.serialize()).to.be.equal(instance.value);
    });
});