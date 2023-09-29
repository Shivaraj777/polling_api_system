// Description: This file conatains the variables for environment

// set the variables for development mode
const development = {
    name: 'development',
    mongo_connect_URL: 'mongodb://127.0.0.1/polling_api',
    API_base_URL: 'http://localhost:8000'
}

// set the variables forn production mode
const production = {
    name: 'production',
    mongo_connect_URL: process.env.MONGODB_ATLAS_URL,
    API_base_URL: process.env.PS_API_BASE_URL
}

// export the env module
module.exports = eval(process.env.NODE_ENV) === undefined ? development : eval(process.env.NODE_ENV);
