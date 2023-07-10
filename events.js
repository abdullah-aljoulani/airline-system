'use strict'

const events = require('events')

const eventsPool = new events();

const { faker } = require('@faker-js/faker');


const payload = {

    id: faker.string.uuid(),
    pilotes: faker.internet.userName(),
    destinations: faker.location.country(),
    airline: faker.definitions.airline.airline[0].name,
}


module.exports = {
    eventsPool,
    payload
}