'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io-client')

const host = `http://localhost:${port}`

const socket = server(host)

socket.on('new-flight', data => {
    console.log(` Manager: new flight with ID ${data.Details.flightID} have been scheduled`);
    let scheduled = {
        airLine: data.Details.airLine,
        flightID: data.Details.pilot,
        pilot: data.Details.flightID,
        destination: data.Details.destination
    };
    socket.emit('managerAlert', scheduled)
})