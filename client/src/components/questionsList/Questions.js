import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getQuestions } from '../../actions/auestion'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'

const Questions = ({ questions, getQuestions }) => {
    useEffect(() => {
        document.title = 'Question-List'
        getQuestions()
    }, []);

    if (questions.loading) {
        return <Spinner />
    }

    return (
        // ''
        <div className="container mt-4 questionList list-group">
            <b>Questions:</b>
            {/* {
                questions.loading && <Spinner />
            } */}
            {questions.questions && questions.loading === false ?
                questions.questions.map(res => (
                    <div className="card w-100" key={res._id}>
                        <div className="card-body" >
                            <h5 className="card-title">{res.questiontitle}</h5>
                            <Link className="btn btn-primary" to={`/detail/${res._id}`} >Go-Detail</Link>
                        </div>
                    </div>
                ))

                : null}


        </div>

    )
}

Questions.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        questions: state.question
    }
}


export default connect(mapStateToProps, { getQuestions })(Questions)
