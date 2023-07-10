'use strict'

const { eventsPool } = require('./events');

eventsPool.on('new-flight', flighthandler)

function flighthandler(payload) {
    console.log(`Manager: new flight with ID: ${payload.id} have been scheduled Flight:`, {
        event: 'new flight',
        time: new Date(),
        Details: {
            airLine: payload.airline,
            flightID: payload.id,
            pilot: payload.pilotes,
            destination: payload.destinations
        }
    })
}

