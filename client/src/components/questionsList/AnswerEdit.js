import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editQuestion } from '../../actions/auestion'
import Spinner from '../layout/Spinner'
import { Link, Redirect } from 'react-router-dom'

const AnswerEdit = ({ match }) => {

    // const [formData, setFormData] = useState({
    //     questiontitle: title
    // })

    // useEffect(() => {
    //     document.title = 'Answer Update!'
    // }, [])

    // const { questiontitle } = formData

    // const onChange = e =>
    //     setFormData({ ...formData, [e.target.name]: e.target.value })

    // const onSubmit = async e => {
    //     e.preventDefault()
    //     editQuestion(match.params.id, questiontitle)
    // }

    return (
        <div className="container">
            <div className="form-group">
                <form>
                    <label>Update your Answer!</label>
                    <input
                        type="text"
                        className="form-control mb-2 editInput"
                        placeholder=""
                        name='answerdetail'
                    />
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update Answer!</button>
                    <hr className="my-4" />
                </form>
            </div>
        </div>
    )
}

AnswerEdit.propTypes = {

}

export default AnswerEdit
