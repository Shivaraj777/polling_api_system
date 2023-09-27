// Description: This file contains the actions related to options

// imports
const Question = require('../../../models/question');
const Option = require('../../../models/option');

// action to create an option
module.exports.createOption = async function(req, res){
    try{
        // check questionId and option value are null
        if(!req.params.id || !req.body.value){
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
            option.link_to_vote = `${baseURL}/options/${option._id}/add_vote`;
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