const mongoose = require('mongoose');
const { stringify } = require('querystring');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 * 
 * create connection and export the connection to mongodb database
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




// Expose the connection
module.exports = connection;