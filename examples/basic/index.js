const PM2Wrapper = require('../../index').Wrapper;

const instance = new PM2Wrapper({
    instances: [{
        name: 'basic-example',
        script: 'examples/basic/server.js',
        exec_mode: 'cluster',
        instances: 2,
        max_memory_restart: '200M'
    }]
}).run();