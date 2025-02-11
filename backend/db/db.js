// its work is connect to the database this is for database connection
const mongoose = require('mongoose');


function connectToDatabase() {
    mongoose.connect(process.env.DB_CONNECT,).then(() => {
        console.log('Connected to DB');}).catch(err => console.log(err));
}

module.exports = connectToDatabase;