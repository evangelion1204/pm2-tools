const pm2 = require('pm2');

export default class MessageBus {
    constructor () {
        process.on('message', this.onMessage.bind(this));
    }

    onMessage(message) {
        console.log(message);
    }

    publish(event, ...payload) {
        process.send({
            type: 'process:msg',
            data: {
                event,
                payload
            }
        })
    }
}


