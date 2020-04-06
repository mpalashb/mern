const express = require('express')
const { check, validationResult } = require('express-validator')
// const bycript = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('config')
const auth = require('../../middleware/auth')
const Question = require('../../models/Question')
const User = require('../../models/User')

const Router = express.Router()

//Get Read Questions List
Router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find().sort({ created: -1 })
        return res.json(questions)

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error!' })
    }
})
//Get Single Questions List
Router.get('/questions/:qs_id', async (req, res) => {
    try {

        try {
            await Question.findById(req.params.qs_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid Questions ID!' })
        }

        const selquestions = await Question.findById(req.params.qs_id)

        if (!selquestions) {
            return res.json({ msg: 'Questions not found!' })
        }


        const questions = await Question.findById(req.params.qs_id)
        return res.json(questions)

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error!' })
    }
})

//Create Questions List
Router.post('/questions', [auth, [
    check('questiontitle', 'Question title may not be blank! or exceed more than 200 chr')
        .not().isEmpty().isLength({ max: 200 })
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const user = await User.findById(req.user.id).select('-password')

        const QST = new Question({
            author: user.id,
            questiontitle: req.body.questiontitle
        })

        const questionsNew = await QST.save()
        return res.json(questionsNew)


    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error!' })
    }
})

//Update Questions List
Router.put('/questions/:qs_id', [auth, [
    check('questiontitle', 'Question title may not be blank! or exceed more than 200 chr')
        .not().isEmpty().isLength({ max: 200 })
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {

        const quesSingle = await Question.findOne({ author: req.user.id, _id: req.params.qs_id })
        if (!quesSingle) {
            return res.json({ msg: 'Permission Denied!' })
        }
        quesSingle.questiontitle = req.body.questiontitle

        await quesSingle.save()
        return res.json(quesSingle)

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error!' })
    }
})

//Delete Questions List
Router.delete('/questions/:qs_id', auth, async (req, res) => {
    try {

        const quesSingle = await Question.findOne({ author: req.user.id, _id: req.params.qs_id })
        if (!quesSingle) {
            return res.json({ msg: 'Permission Denied!' })
        }

        await quesSingle.remove()
        return res.json({ msg: 'Question Deleted!' })

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ msg: 'Server error!' })
    }
})


module.exports = Router