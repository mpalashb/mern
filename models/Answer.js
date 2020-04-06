const mongoose = require('mongoose')

const AnsSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions'
    },
    answerdetail: {
        type: String,
        required: true,
        max: 500
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    created: { type: Date, default: Date.now }
})

module.exports = Answer = mongoose.model('answer', AnsSchema)