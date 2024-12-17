const mongoose = require('mongoose');

function connectToDatabase() {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error('MongoDB URI is not defined!');
        return;
    }

    mongoose.connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToDatabase;

