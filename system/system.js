'use strict'

require('dotenv').config();

const port = process.env.PORT || 3000

const server = require('socket.io')(port)

const pilot = server.of('/airline')

const { faker } = require('@faker-js/faker')

setInterval(() => {
    let data = {
        event: 'new-flight',
        time: new Date(),
        Details: {
            airLine: faker.airline.aircraftType(),
            flightID: faker.string.uuid(),
            pilot: faker.internet.userName(),
            destination: faker.location.country()
        }
    }
    server.emit('new-flight', data)
}, 10000)

server.on('connection', socket => {
    console.log(`manager with id ${socket.id} has connect`);
    socket.on('managerAlert', Details => {
        console.log({
            event: 'new-flight',
            time: new Date(),
            Details
        });
        server.emit('alertPilot', Details)
    })
})

pilot.on('connection', socket => {
    console.log(`pilot with id ${socket.id} has connect`);
    socket.on('took-off', data => {
        console.log(data);
    })
    socket.on('arrived', data => {
        console.log(data);
    })
})