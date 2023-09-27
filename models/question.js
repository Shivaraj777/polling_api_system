// Description: This file contains the schema for Questions collection

// imports
const mongoose = require('mongoose');

// create the questions schema
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option'
    }]
}, {
    timestamps: true
});

// create the model for questions collection
const Question = mongoose.model('Question', questionSchema);

// export the model
module.exports = Question;