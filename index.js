// imports
const express = require('express'); //import the express module
const db = require('./config/mongoose'); //import the mongoose module

const app = express(); //create the express app
const port = process.env.port || 8000; //define the port

// middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// middleware to route the requests
app.use('/', require('./routes/'));

// listen on the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});