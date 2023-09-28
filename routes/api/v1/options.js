// Description: This file contains the router for options controller

// imports
const express = require('express');
const optionsController = require('../../../controllers/api/v1/options_controller');

const router = express.Router(); //create the express router

// route the requests
router.patch('/:id/add_vote', optionsController.addVote); //route the request to addVote action of options_controller
router.delete('/:id/delete', optionsController.deleteOption); //route the request to deleteOption action of options_controller

// export the router
module.exports = router;