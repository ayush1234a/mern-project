const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDatabase = require('../backend/db/db');
const userRoutes = require('../backend/routes/user.routes.js');


connectToDatabase();

//curantlly we acappt all requests from all domain when production time is there at that time in place of core particular domain name is there where we get the requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('hello world');
});

// app.use(express.json());
app.use('/api', userRoutes);
// app.use('/api', userRoutes);
// app.use('/user', userRoutes);



module.exports = app;
