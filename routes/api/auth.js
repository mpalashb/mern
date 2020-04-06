const express = require('express')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Router = express.Router()
const User = require('../../models/User')

//Register //Public
Router.post('/register', [
    check('name', 'Name is required!').notEmpty(),
    check('username', 'Username is required! or maximum Len has been exceeded!').notEmpty().isLength({ max: 50 }),
    check('password', 'Min 6 Len of password is required!').notEmpty().isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, username, password } = req.body

    try {
        //Checking If exists username!
        let user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ msg: 'User already exists!' })
        }

        user = new User({
            name, username, password
        })

        const salt = await bycript.genSalt(10)
        user.password = await bycript.hash(password, salt)
        await user.save()


        const payload = { user: { id: user.id } }
        jwt.sign(payload, config.get('jwSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            res.json({ msg: 'User Created!', id: user.id, username: user.username, token })
        })



    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server error' })
    }

})


//Get User
Router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
        // const user = await User.findById(req.user.id)
        // res.json({ user: user.username, name: user.name })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }
})


//User Login
Router.post('/login', [
    check('username', 'Invalid Credentials').exists(),
    check('password', 'Invalid Credentials').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bycript.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) throw err
            return res.json({ msg: 'Login Success!', id: user.id, username: user.username, name: user.name, token })
        })




    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }
})


Router.delete('/me', auth, async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.user.id });
        return res.json({ msg: 'User deleted!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = Router