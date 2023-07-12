'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000;

const server = require('socket.io-client')

// create a host to new endpoint or space name called airline 
const host = `http://localhost:${port}/airline`

// create host to connect the globel server or the system server to get the flight data from there
const hostServer = `http://localhost:${port}`

// connect the airline space name 
const socket = server(host)

// connect to the system sever
const socketServer = server(hostServer)

// get the data from the getData event in the system server which is the global thats why we use the socketServer no the space name host
socketServer.on('getData', payload => {
    // emmiting the data that we took from the system to the space name airline
    socket.emit('getFlight', payload)
})
// taking the data that we send from the system and handle it here the took off and the arrived functions 
socket.on('took-off', tookOffHandler)
socket.on('arrived', arrivedHandler)

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