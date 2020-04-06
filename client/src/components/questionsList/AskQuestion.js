import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addQuestion } from '../../actions/auestion'
import Spinner from '../layout/Spinner'
import { Redirect } from 'react-router-dom'

const AskQuestion = ({ addQuestion, question }) => {
    useEffect(() => {
        document.title = 'Ask'
    }, [])

    const [formData, setFormData] = useState({
        questiontitle: ''
    })

    const { questiontitle } = formData
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        addQuestion(questiontitle)
    };

    if (question.added == true) {
        return <Redirect to={`/questions`} />
    }

    return (
        <div className="container">
            <div className="form-group">
                <form onSubmit={e => onSubmit(e)}>
                    <label>Ask any question!</label>
                    <input
                        type="text"
                        className="form-control mb-2 editInput"
                        placeholder="Ask Here!"
                        name='questiontitle'
                        value={questiontitle}
                        onChange={e => onChange(e)}
                    />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Ask!</button>
                    <hr className="my-4" />
                    {question.loading && <Spinner />}
                </form>
            </div>
        </div>
    )
}

// AskQuestion.propTypes = {

// }


const mapStateToProps = state => {
    return {
        question: state.question,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { addQuestion })(AskQuestion)
