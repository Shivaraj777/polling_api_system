// Deacription: This file contains all the actions related to questions

// imports
const Question = require('../../../models/question'); //import the question model

// action to create a question
module.exports.createQuestion = async function(req, res){
    try{
        // check if question already exists
        let question = await Question.findOne({title: req.body.title});

        // if question does not exists create question
        if(!question){
            question = await Question.create({
                title: req.body.title
            });

            console.log('Question created successfully');
            return res.status(200).json({
                message: 'Question created successfully',
                success: true,
                data: {
                    question
                }
            });
        }else{
            console.log('Question already exists');
            return res.status(400).json({
                message: 'Question already exists, please enter a different question',
                success: false,
                data: {
                    id: question._id
                }
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