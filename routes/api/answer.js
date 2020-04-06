const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Question = require('../../models/Question')
const Answer = require('../../models/Answer')
const User = require('../../models/User')

const Router = express.Router()

//Creating answer
Router.post('/questions/:qs_id/answer', [auth, [
    check('answerdetail', 'Answer detail may not be blank!').not().notEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errArrey = { errors: errors.array() }
        const errMSG = errArrey.errors.map(er => ({ msg: er.msg }))
        const [errMSGerrMSG,] = errMSG
        console.log(errMSGerrMSG)
        return res.status(400).json(errArrey)
    }

    try {
        try {
            await Question.findById(req.params.qs_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid question ID!' })
        }

        const selQuestion = await Question.findOne({ author: req.user.id, _id: req.params.qs_id })
        if (!selQuestion) {
            const checkQuestion = await Question.findOne({ _id: req.params.qs_id })
            if (!checkQuestion) {
                return res.json({ msg: 'Question ID does not found!' })
            }

            // const checkAnswerInstc = await Answer.findOne({author: req.user.id}).exists()

            const newAnswer = new Answer({
                author: req.user.id,
                question: checkQuestion._id,
                answerdetail: req.body.answerdetail
            });

            const answer = await newAnswer.save()
            return res.json(answer)

        }
        return res.json({ msg: 'Permission Denied (Question Owner)!' })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})

//Read and Getting answer
Router.get('/answers/:qs_id', auth, async (req, res) => {

    try {
        try {
            await Question.findById(req.params.qs_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid question ID!' })
        }

        const selAnswer = await Answer.find({ question: req.params.qs_id })

        return res.json(selAnswer)


    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})


//Edit answer by author
Router.put('/answer/:ans_id', [auth, [
    check('answerdetail', 'Answer detail may not be blank!').not().notEmpty()
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errArrey = { errors: errors.array() }
        const errMSG = errArrey.errors.map(er => ({ msg: er.msg }))
        const [errMSGerrMSG,] = errMSG
        console.log(errMSGerrMSG)
        return res.status(400).json(errArrey)
    }

    try {
        try {
            await Answer.findById(req.params.ans_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid answer ID!' })
        }

        const selAnswer = await Answer.findOne({ _id: req.params.ans_id, author: req.user.id })

        if (!selAnswer) {
            return res.json({ msg: 'Permission Denied!' })
        }

        selAnswer.answerdetail = req.body.answerdetail
        await selAnswer.save()

        return res.json(selAnswer)


    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})

//Delete answer by author
Router.delete('/answer/:ans_id', auth, async (req, res) => {

    try {
        try {
            await Answer.findById(req.params.ans_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid answer ID!' })
        }

        const selAnswer = await Answer.findOne({ _id: req.params.ans_id, author: req.user.id })

        if (!selAnswer) {
            return res.json({ msg: 'Permission Denied!' })
        }

        await selAnswer.remove()
        return res.json({ msg: 'Deleted!' })


    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})


//Like answer by any user
Router.put('/answer/:ans_id/like', auth, async (req, res) => {

    try {
        try {
            await Answer.findById(req.params.ans_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid answer ID!' })
        }

        const selLikeAnswer = await Answer.findById(req.params.ans_id)

        if (!selLikeAnswer) {
            return res.json({ msg: 'Answer not found!' })
        }

        if (
            selLikeAnswer.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        selLikeAnswer.likes.unshift({ user: req.user.id })
        await selLikeAnswer.save();

        return res.json(selLikeAnswer.likes);



    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})

//UnLike answer by owner Author user
Router.put('/answer/:ans_id/unlike', auth, async (req, res) => {

    try {
        try {
            await Answer.findById(req.params.ans_id)
        } catch (errr) {
            return res.json({ msg: 'Invalid answer ID!' })
        }

        const selLikeAnswer = await Answer.findById(req.params.ans_id)

        if (!selLikeAnswer) {
            return res.json({ msg: 'Answer not found!' })
        }

        // Check if the post has already been liked
        if (
            selLikeAnswer.likes.filter(like => like.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = selLikeAnswer.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id)

        selLikeAnswer.likes.splice(removeIndex, 1);

        await selLikeAnswer.save();

        return res.json(selLikeAnswer.likes);



    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error!' })
    }

})








module.exports = Router