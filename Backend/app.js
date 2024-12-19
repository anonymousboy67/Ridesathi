const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Corrected

const app = express();
const userRoutes = require('./routes/user.routes.js');
const connectToDatabase = require('./db/db');

// Connect to the database
connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// User routes
app.use('/users', userRoutes);

module.exports = app;
