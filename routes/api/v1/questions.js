// Description: This file contains the router for questions controller

// imports
const express = require('express');
const questionsController = require('../../../controllers/api/v1/questions_controller'); 

const router = express.Router(); //create the express router

// route the requests
router.post('/create', questionsController.createQuestion); //route the request to createQuestion action of questions_controller

// export the router
module.exports = router;