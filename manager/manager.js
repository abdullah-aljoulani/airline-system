'use strict'

require('dotenv').config()

const server = require('socket.io-client');

const port = process.env.PORT || 3000

const socket = server(`http://localhost:${port}`);

const { faker } = require('@faker-js/faker');

setInterval(() => {
    let data = {
        event: 'new-fligh',
        time: new Date(),
        details: {
            id: faker.string.uuid(),
            pilotes: faker.internet.userName(),
            destinations: faker.location.country(),
            airline: faker.definitions.airline.airline[0].name,
        }
    }

    socket.emit('new-flight', data)
}, 10000)

socket.on('flight', flighthandler)

function flighthandler(payload) {
    console.log(`Manager: new flight with ID: ${payload.details.id} have been scheduled:`, new Date())
    payload.event = 'new-flight'
    payload.data = new Date()
    socket.emit('logStatus', payload)
}

socket.on('notifyManager', payload => {
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.details.pilotes}`);
})