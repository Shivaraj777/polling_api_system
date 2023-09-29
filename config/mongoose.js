// Description: This file contains the code for connecting to mongoDB database

// imports
const mongoose = require('mongoose');
const env = require('./environment');

// connect to the database
mongoose.connect(env.mongo_connect_URL);

// establish connection to the database
const db = mongoose.connection;

// if error occurs while connecting to database
db.on('error', console.error.bind(console, 'Error connecting to mongoDB'));

// if the connection is successfull
db.once('open', function(){
    console.log('Successfully connected to the database');
});

// export the module
module.exports = db;