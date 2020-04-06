import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editQuestion } from '../../actions/auestion'
import Spinner from '../layout/Spinner'
import { Redirect } from 'react-router-dom'

const QuestionEdit = ({ auth, editQuestion, question, match }) => {

    var title = null
    var id = null

    if (question.loading === false && question.question) {
        var title = question.question.questiontitle
        var id = question.question._id
    }

    const [formData, setFormData] = useState({
        questiontitle: title
    })

    useEffect(() => {
        document.title = title
    }, [])

    const { questiontitle } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        editQuestion(match.params.id, questiontitle)
    };

    if (question.updated == true) {
        return <Redirect to={`/detail/${match.params.id}`} />
    }

    return (
        <div className="container">
            <div className="form-group">
                <form onSubmit={e => onSubmit(e)}>
                    <label>Update your Question!</label>
                    <input
                        type="text"
                        className="form-control mb-2 editInput"
                        placeholder=""
                        name='questiontitle'
                        value={questiontitle}
                        onChange={e => onChange(e)}
                    />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update Now!</button>
                    <hr className="my-4" />
                    {question.loading && <Spinner />}
                </form>
            </div>
        </div>
    )
}

// QuestionEdit.propTypes = {

// }


const mapStateToProps = state => {
    return {
        question: state.question,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { editQuestion })(QuestionEdit)