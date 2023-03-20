const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    picture: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    balance: {
        required: true,
        type: Number
    },
})

module.exports = mongoose.model('user', userSchema)
