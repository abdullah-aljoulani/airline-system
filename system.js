'use strict'
const { eventsPool } = require('./events')

require('./manager')
require('./pilot')
const { payload } = require('./events')

setInterval(() => {
    eventsPool.emit('new-flight', payload)
    setTimeout(() => {
        eventsPool.emit('took-off', payload)
    }, 4000)
    setTimeout(() => {
        eventsPool.emit('arrived', payload)
        console.log("Manager: we’re greatly thankful for the amazing flight", payload.pilotes);
    }, 7000)
}, 10000)
