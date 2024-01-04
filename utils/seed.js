const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
    getRandomArrItem,
    getRandomThought,
    getRandomUser,
} = require('./data');

//Start seeding runtime timer
console.time('seeding');

//Create a connection to mongodb
connection.once('open', async () =>{
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts'}).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users')
    }
});

//empty arrays for randomly generated thoughts and users
const thoughts = [...getRandomThought(1)]
const users = [];
