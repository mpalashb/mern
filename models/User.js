const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true
    },
    created: { type: Date, default: Date.now }

})

module.exports = User = mongoose.model('user', UserSchema)