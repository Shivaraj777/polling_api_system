// Description: Entry point for version 1 api router

// imports
const express = require('express');

const router = express.Router(); //create the express router

// route the requests
router.use('/questions', require('./questions')); //route the requests to questions router
router.use('/options', require('./options')); //route the requests to options router

// export the router
module.exports = router;