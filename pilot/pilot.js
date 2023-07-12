'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io-client')

const serverHost = `http://localhost:${port}`;

const pilotHost = `http://localhost:${port}/airline`;

const pilotSocket = server(pilotHost)

const socket = server(serverHost)

socket.on('alertPilot', Details => {
    setTimeout(() => {
        let payload = {
            event: 'took-off',
            time: new Date(),
            Details
        }
        console.log(payload);
        pilotSocket.emit('took-off', payload)
    }, 4000)
    setTimeout(() => {
        let payload = {
            event: 'arrived',
            time: new Date(),
            Details
        }
        console.log(payload);
        pilotSocket.emit('arrived', payload)
    }, 7000)
})