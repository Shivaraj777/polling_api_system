// Deacription: This file contains all the actions related to questions

// imports
const Question = require('../../../models/question'); //import the question model
const Option = require('../../../models/option'); //import the option model
const utils = require('../../../utils/index'); //import the utility functions

// action to create a question
module.exports.createQuestion = async function(req, res){
    try{
        // check if question title is null
        if(!req.body.title || !utils.containsNonSpaceCharacters(req.body.title)){
            console.log('Question title cannot be null');
            return res.status(400).json({
                message: 'Question title cannot be null',
                success: false
            });
        }

        // check if question already exists
        let question = await Question.findOne({title: req.body.title});

        // if question does not exists create question
        if(!question){
            question = await Question.create({
                title: req.body.title
            });

            // send the success response
            console.log('Question created successfully');
            return res.status(200).json({
                message: 'Question created successfully',
                success: true,
                data: {
                    question
                }
            });
        }else{ //not found response
            console.log('Question already exists');
            return res.status(400).json({
                message: 'Question already exists, please enter a different question',
                success: false,
                data: {
                    id: question._id
                }
            });
        }
    }catch(err){ //unhandled error response
        console.log(`Error: ${err}`);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

// action to view a question and it's options
module.exports.getQuestion = async function(req, res){
    try{
        // find the question
        const question = await Question.findById(req.params.id);

        // if question exists
        if(question){
            // enable question record to access it's options data
            await question.populate({path: 'options', select: '_id value votes link_to_vote'});

            // send the success response
            console.log(`Question ${question._id} fetched successfully`);
            return res.status(200).json({
                message: `Question ${question._id} fetched successfully`,
                success: true,
                data: {
                    question
                }
            });
        }else{
            console.log(`Question ${req.params.id} does not exists`);
            return res.status(404).json({
                message: `Question ${req.params.id} does not exists`,
                success: false,
            }); 
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        }); 
    }
}

// action to delete a question
module.exports.deleteQuestion = async function(req, res){
    try{
        // find the question
        const question = await Question.findById(req.params.id).populate({path: 'options', select: '_id value votes'});

        // if question exists
        if(question){
            // check if question's options have votes
            const options = question.options;
            let canBeDeleted = true;
            options.forEach(option => {
                if(option.votes > 0){
                    canBeDeleted = false;
                    return;
                }
            });

            // if question can be deleted
            if(canBeDeleted){
                // delete the options and question
                await Option.deleteMany({question: question._id});
                await Question.findByIdAndDelete(question._id);

                // send the success response
                console.log(`Question ${req.params.id} deleted successfully`);
                return res.status(200).json({
                    message: `Question ${req.params.id} deleted successfully`,
                    success: true
                });
            }else{
                console.log(`Question ${req.params.id} contains options which have been voted, hence it cannot be deleted`);
                return res.status(400).json({
                    message: `Question ${req.params.id} contains options which have been voted, hence it cannot be deleted`,
                    success: false
                });
            }
        }else{
            console.log(`Question ${req.params.id} does not exists`);
            return res.status(404).json({
                message: `Question ${req.params.id} does not exists`,
                success: false
            }); 
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.status(500).json({
            message: `Internal sserver error`,
            success: false
        }); 
    }
}