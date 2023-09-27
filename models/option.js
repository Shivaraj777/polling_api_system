// Description: This file contains the schema for Options collection

// imports
const mongoose = require('mongoose');

// create the Schema for options
const optionSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    link_to_vote: {
        type: String
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
}, {
    timestamps: true
});

// create the options model
const Option = mongoose.model('Option', optionSchema);

// export the model
module.exports = Option;