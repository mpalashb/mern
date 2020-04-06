import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnswer } from '../../actions/answers'
import Spinner from '../layout/Spinner'
import { Redirect } from 'react-router-dom'

const AnswerCreate = ({ matchID, createAnswer, answer }) => {

    if (answer) {
        console.log(answer)
    }

    const [formData, setFormData] = useState({
        answerdetail: ''
    })

    const { answerdetail } = formData
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        createAnswer(matchID, answerdetail)
    };



    return (
        <div className="form-group">
            <form onSubmit={e => onSubmit(e)}>
                <label>Create your Answer!</label>
                <input
                    type="text"
                    className="form-control mb-2 editInput"
                    placeholder=""
                    name='answerdetail'
                    onChange={e => onChange(e)}
                />
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Publish Answer!</button>
                <hr className="my-4" />
            </form>
        </div>
    )
}

AnswerCreate.propTypes = {

}

const mapStateToProps = state => {
    return {
        answer: state.answer
    }
}

export default connect(null, { createAnswer })(AnswerCreate)
