'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000;

const server = require('socket.io-client')

const host = `http://localhost:${port}/airline`

const hostServer = `http://localhost:${port}`

const socket = server(host)

const socketServer = server(hostServer)

socketServer.on('getData', payload => {

    socket.emit('getFlight', payload)
})

socket.emit('offline')
socketServer.on('get-all', flighHandler)
socket.on('took-off', tookOffHandler)
socket.on('arrived', arrivedHandler)

socket.on('get-all-offline', payload => {
    console.log(`Pilot:Sorry i didn't catch this flight ID ${payload.flight.details.id}`);

    socket.emit('emptyQueue', payload.id)
})

function flighHandler(payload) {
    console.log(payload);
}

function tookOffHandler(payload) {
    setTimeout(() => {
        console.log(`Pilot: flight with ID${payload.details.id} took-off`);
        payload.event = 'took-off'
        payload.data = new Date()
        socket.emit('logStatus', payload)
    }, 4000)
}

function arrivedHandler(payload) {
    setTimeout(() => {
        console.log(` Pilot: flight with ID${payload.details.id} arrived`);
        payload.event = 'arrived'
        payload.data = new Date()
        socket.emit('logStatus', payload)
    }, 7000)

}