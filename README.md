# Polling System API

## Project Description

Develop a polling system, only API based. We need to create an API where anyone can create questions with options and also add votes to it.

## Features

-	Create a question
-	Add options to a question
-	Add a vote to an option of question
-	Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
-	Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
-	View a question with it’s options and all the votes given to it

## API routes

- baseURL for local system: http://localhost:8000
- baseURL for production environment: https://polling-system-api-1995.onrender.com

- POST request: Create a question
    - baseURL/api/v1/questions/create

- POST request: Add options to a question
    - baseURL/api/v1/questions/questionID/options/create

- PATCH request: Add a vote to an option of question
    - baseURL/api/v1/options/optionID/add_vote

- DELETE request: Delete a question
    - baseURL/api/v1/questions/questionID/delete

- DELETE request: Delete an option
    - baseURL/api/v1/options/optionID/delete

- GET request: View a question
    - baseURL/api/v1/questions/questionID

## Technology used

- Node.js
- Express.js
- Mongoose
- MongoDB
- REST APIs

## Application/Project setup

- Clone the git repository in your local machine by using command,
    - git clone https://github.com/Shivaraj777/polling_api_system.git
- Open the project code in VS code.
- Open the terminal and go to root directory of the project.
- Use command, npm install to install all the dependencies.
- Set up the environment variables in system.
- use "npm start" command to run the application.
- Install Postman application to execute APIs
- execute the above mentioned routes in "API Routes" header in Postman to get desired results

## Hosting

- Application hosted on: https://polling-system-api-1995.onrender.com
