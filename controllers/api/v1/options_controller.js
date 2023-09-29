// Description: This file contains the actions related to options

// imports
const Question = require('../../../models/question');
const Option = require('../../../models/option');
const utils = require('../../../utils/index');

// action to create an option
module.exports.createOption = async function(req, res){
    try{
        // check questionId and option value are null
        if(!req.params.id || !req.body.value || !utils.containsNonSpaceCharacters(req.body.value)){
            console.log('QuestionId/Option value is null');
            return res.status(400).json({
                message: 'QuestionId/Option value is null',
                success: false
            });
        }

        // find the question
        const question = await Question.findById(req.params.id);

        // if question exists
        if(question){
            // create option
            const baseURL = 'http://localhost:8000'
            const option = await Option.create({
                value: req.body.value,
                question: question._id
            });
            option.link_to_vote = `${baseURL}/api/v1/options/${option._id}/add_vote`;
            option.save();

            // add the option to the question
            question.options.push(option._id);
            question.save();

            console.log('Option created successfully');
            return res.status(200).json({
                message: `Option for ${question._id} added successfully`,
                success: true,
                data: {
                    option
                }
            });
        }else{
            console.log('Question does not exist, Please enter a valid questionId');
            return res.status(404).json({
                message: `Question with ${req.params.id} does not exist, Please enter a valid questionId`,
                success: false
            });
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.status(500).json({
            message: `Internal server error`,
            success: false
        });
    }
}

// action to add vote to an option
module.exports.addVote = async function(req, res){
    try{
        // find the option to vote
        const option = await Option.findById(req.params.id);

        // if option exists
        if(option){
            // increment the vote
            option.votes++;
            option.save();

            console.log(`Vote added for option: ${option._id}`);
            return res.status(200).json({
                message: `Vote added for option: ${option._id}`,
                success: true,
                data: {
                    option
                }
            });
        }else{
            console.log(`Option ${option._id} does not exist`);
            return res.status(404).json({
                message: `Option ${option._id} does not exist`,
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

// action to delete an option
module.exports.deleteOption = async function(req, res){
    try{
        // find the option
        const option = await Option.findById(req.params.id);

        // if option exists
        if(option){
            // delete if option does not contain votes
            if(option.votes === 0){
                // remove the option from question and delete it
                await Question.findByIdAndUpdate(option.question, {$pull: {options: option._id}});
                await Option.findByIdAndDelete(req.params.id);

                console.log(`Option ${req.params.id} deleted successfully`);
                return res.status(200).json({
                    message: `Option ${req.params.id} deleted successfully`,
                    success: true
                });
            }else{
                console.log(`Option ${req.params.id} contains votes, hence cannot be deleted`);
                return res.status(400).json({
                    message: `Option ${req.params.id} contains votes, hence cannot be deleted`,
                    success: false
                });
            }
        }else{
            console.log(`Option ${req.params.id} does not exist`);
            return res.status(404).json({
                message: `Option ${req.params.id} does not exist`,
                success: false
            });
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}