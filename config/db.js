const mongoose = require('mongoose')
const cfg = require('config')
const db = cfg.get('mongoURI')

const connectDB = async () => {
    try {
        await mongoose.connect(
            db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
        )
        console.log('Mongobd Connected')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB