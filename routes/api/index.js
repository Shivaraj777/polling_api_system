// Description: Entry point for api router

// imports
const express = require('express');

const router = express.Router(); //create the express router

// route the requests
router.use('/v1', require('./v1')); //route the requests to v1 router

// export the router
module.exports = router;