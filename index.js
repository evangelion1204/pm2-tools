'use strict'

//exports.Starter = require('./lib/starter').default;
exports.RestService = require('./lib/rest').default;
exports.MessageBus = require('./lib/bus').default;
exports.Metrics = {
    Counter: require('./lib/metrics/counter').default,
    MultiCounter: require('./lib/metrics/multi-counter').default,
    Average: require('./lib/metrics/average').default
};