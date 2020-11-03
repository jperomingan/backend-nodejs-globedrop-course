const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const database_connection = process.env.MONGODB_URI

const db = () => {
    mongoose.connect(database_connection, {
        useNewUrlParser : true,
    })
}

module.exports = {
    db,
};