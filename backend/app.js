const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDatabase = require('../backend/db/db');

connectToDatabase();

//curantlly we acappt all requests from all domain when production time is there at that time in place of core particular domain name is there where we get the requests
app.use(cors());



app.get('/', (req, res) => {
    res.send('hello world');
});


module.exports = app;
