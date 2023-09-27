// Description: This file contains the router for questions controller

// imports
const express = require('express');
const questionsController = require('../../../controllers/api/v1/questions_controller'); 
const optionsController = require('../../../controllers/api/v1/options_controller');

const router = express.Router(); //create the express router

// route the requests
router.post('/create', questionsController.createQuestion); //route the request to createQuestion action of questions_controller
router.post('/:id/options/create', optionsController.createOption); //route the request to createOption action of optiond_controller

// export the router
module.exports = router;