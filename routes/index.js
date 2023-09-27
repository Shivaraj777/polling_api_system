// Description: Entry point for router

// imports
const express = require('express');

const router = express.Router(); //create the express router

console.log('Router loaded');

// route the requests
router.use('/api', require('./api')); //route the requests to api router

// export the router
module.exports = router;