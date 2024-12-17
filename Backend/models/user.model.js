const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Use bcrypt
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password when fetching users by default
    },
    socketId: {
        type: String,
    },
});

// Generate Authentication Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash Password before saving
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Hash with salt rounds = 10
};

// Create User Model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
