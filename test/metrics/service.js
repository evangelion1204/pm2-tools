'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

import Service from '../../src/metrics/service';

describe('MetricsService', function() {
    it('should be a class', function () {
        expect(Service).to.be.a('function');
    });

    it('should be a initialized correct', function () {
        var instance = new Service();

        expect(instance).to.be.an('object');
    });

    it('should be able to register new services by name', function () {
        var instance = new Service();

        expect(instance.register('mymetric', {})).to.be.equal(instance);
    });

    it('pushing a non existing metric should result in an error', function () {
        var instance = new Service();

        expect(function () {
            instance.push('unknown_metric', 'payload');
        }).to.throw('Metric "unknown_metric" is not registered');
    });

    it('pushing an existing metric should propagate the push event', function () {
        var instance = new Service();
        var mock = {
            push: sinon.spy()
        };

        instance.register('metric', mock);

        expect(instance.push('metric', 'payload')).to.be.equal(instance);
        expect(mock.push).to.be.calledWith('payload');
    });
});