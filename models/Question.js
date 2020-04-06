const mongoose = require('mongoose')
const QuestSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    questiontitle: {
        type: String,
        required: true,
        max: 200
    },
    created: { type: Date, default: Date.now }

})

module.exports = Question = mongoose.model('question', QuestSchema)