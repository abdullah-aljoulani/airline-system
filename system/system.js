'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io')(port);

const uuid = require('uuid').v4

const airline = server.of('/airline')

const queue = {
}


server.on('connection', socket => {
    console.log('the server is connected to id:', socket.id);

    socket.on('new-flight', data => {

        server.emit('flight', data)

        server.emit('getData', data)
        let id = uuid();
        queue[id] = data
        server.emit('get-all', queue)
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
    socket.on('offline', () => {
        Object.keys(queue)
            .forEach(id => {
                airline.emit('get-all-offline', {
                    id,
                    flight: queue[id]
                })
            })
    })
    socket.on('emptyQueue', payload => {
        delete queue[payload]
    })

    socket.on('getFlight', data => {
        airline.emit('took-off', data)
        airline.emit('arrived', data)
    })
 
    socket.on('logStatus', data => {
        console.log(data);
    })
})