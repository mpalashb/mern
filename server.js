const express = require('express')
const connectDB = require('./config/db')
const authRoute = require('./routes/api/auth')
const Questions = require('./routes/api/question')
const Answers = require('./routes/api/answer')
const path = require('path');
//App and db connected!
const app = express()
connectDB()
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api', Questions);
app.use('/api', Answers);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/`))


