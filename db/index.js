const mongoose = require('mongoose')

const database_connection = 'mongodb+srv://my_database:P%40ssword01@cluster0.cu8en.mongodb.net/my_database';

const db = () => {
    try {
        mongoose.connect(database_connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.log('error', error);
    }
};

module.exports = {
    db,
};