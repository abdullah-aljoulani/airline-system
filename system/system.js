'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000


// import the socket server
const server = require('socket.io')(port);

// create new space name called airline
const airline = server.of('/airline')


//connect  the server to the manager
server.on('connection', socket => {
    console.log('the server is connceted to id:', socket.id);
    // take the new flight data from the emiter in manager which its the faker
    socket.on('new-flight', data => {
        // emiting the data globly to the flight handler which we take it from the new flight event 
        server.emit('flight', data)
        // emitting the data globly so we can use it in any where 
        server.emit('getData', data)
    })
    // log the state of the proccess 
    socket.on('logStatus', data => {
        console.log(data);
    })
    socket.on('notifyArrived', data => {
        server.emit('notifyManager', data)
    })
})

// connect to the space name airline from the pilot
airline.on('connection', socket => {
    console.log('pilot has been connected with id', socket.id);
    // take the data from the getFlight event which is in the pilot file
    socket.on('getFlight', data => {
        // emitting the data (sending it back) to the took off and arrived events to handle them in pilot file
        airline.emit('took-off', data)
        airline.emit('arrived', data)
    })
    // log the state of the proccess 
    socket.on('logStatus', data => {
        console.log(data);
    })
})