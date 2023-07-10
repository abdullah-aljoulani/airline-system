'use strict'

const { eventsPool } = require('./events')


eventsPool.on('took-off', pilotHandler)
eventsPool.on('arrived', arriveHandler)

function pilotHandler(payload) {
    console.log(`pilot: flight with ID: ${payload.id} have took-off Flight:`,
        {
            event: 'took-off',
            time: new Date(),
            Details: {
                airLine: payload.airline,
                flightID: payload.id,
                pilot: payload.pilotes,
                destination: payload.destinations
            }
        });
}


function arriveHandler(payload) {
    console.log(`pilot: flight with ID: ${payload.id} have been arrived Flight:`,
        {
            event: 'arrived',
            time: new Date(),
            Details: {
                airLine: payload.airline,
                flightID: payload.id,
                pilot: payload.pilotes,
                destination: payload.destinations
            }
        });
}