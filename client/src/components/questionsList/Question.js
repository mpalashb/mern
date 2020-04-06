import React, { useEffect, Fragment } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuestion, deleteQuestion } from '../../actions/auestion'
import { getAnswer, deleteAnswer, like, unlike } from '../../actions/answers'
import Spinner from '../layout/Spinner'
import { Link, Redirect } from 'react-router-dom'
import AnswerCreate from './AnswerCreate'

const Question = (
    { auth,
        getQuestion,
        getAnswer,
        deleteQuestion,
        question,
        answers,
        // answerCreated,
        like, unlike,
        deleteAnswer,
        match }
) => {
    useEffect(() => {
        getQuestion(match.params.id)
        getAnswer(match.params.id)
        var title = 'Detail'
        document.title = title
        if (question.loading === false && question.question) {
            title = question.question.questiontitle
        }
    }, [])

    if (question.loading || answers.loading) {
        return <Spinner />
    }

    if (question.deleted) {
        return <Redirect to={`/questions`} />
    }

    var questionAuth = ''
    // var answerID = ''
    var ANSAUTHMATCH = null

    if (answers.answer) {
        var [questionAuth] = answers.answer.map(res => res.author)
        // console.log(questionAuth)
        var [ANSAUTHMATCH] = answers.answer.map(item => item.author === auth._id)
        var [ANSAUTHMATCH] = answers.answer.filter(item => item.author === auth._id)

        // if (ANSAUTHMATCH) {
        //     console.log(ANSAUTHMATCH)
        // }

        // var ANSAUTHMATCH = ANSAUTHMATCH.length
    }



    var QSSAUTHOR = ''
    if (question.question) {
        var QSSAUTHOR = question.question.author
        // console.log(QSSAUTHOR)
    }





    return (
        <div className="container">
            {question.loading === false && question.question ?
                <div>
                    <p> Question: {question.question.questiontitle} </p>
                    {/* {auth._id || auth.id == question.question.author ? */}
                    {auth._id === question.question.author ?
                        <div>
                            <span className="btn-danger">Question Owner</span>
                            <hr />
                            <Link className="btn btn-success navReg text-center" to={`/detail/edit/${question.question._id}`}>Edit</Link>
                            <button className="btn btn-success navLogin text-center" onClick={() => deleteQuestion(question.question._id)} >Delete</button>
                        </div>
                        : null}
                </div>
                : null}



            <div>
                {!answers.answer || answers.answer.length === 0 && <h6 className="bg-warning text-center py-2 mt-2">No Answer Yet!</h6>}

                {/* {answers.answer.map(item =>
                    item['author'] === auth._id || questionAuth == auth._id ?
                        <Fragment> <p key={item._id}> Already Answered! </p></Fragment> :
                        // auth._id == QSSAUTHOR ? '' :
                        // <AnswerCreate matchID={match.params.id} />
                        <div>Create!</div>

                )} */}

                {/* {questionAuth == auth._id ? null :
                    auth._id == QSSAUTHOR ? null :
                        answers.answer.map(item =>
                            item.author == auth._id ? <Fragment> <p> Already Answered! </p></Fragment> :
                                <AnswerCreate matchID={match.params.id} />
                        )

                } */}

                {/* {console.log(ANSAUTHMATCH)} */}

                {questionAuth === auth._id ? <Fragment>Already Answered!</Fragment> :
                    auth._id === QSSAUTHOR ? '' :
                        <div>
                            {ANSAUTHMATCH ? <Fragment>Already Answered!</Fragment> : <AnswerCreate matchID={match.params.id} />}

                        </div>

                }
                {/* {!questionAuth && <Fragment><AnswerCreate match={match.params.id} /></Fragment>} */}
                {/* {console.log(answerCreated)} */}

                {answers.answer &&
                    <Fragment>
                        <hr />
                        <hr />

                        {answers.answer.map(res => (
                            <div key={res._id}>
                                <p>Answer</p>
                                <div className="answerItem mb-2" key={`Item ${res._id}`}>
                                    <b className="bg-success text-white py-2">{res.answerdetail}</b>

                                    {auth._id === res.author ?
                                        <Fragment>
                                            <button className="btn btn-danger ml-2"
                                                key={`Item Button${res._id}`}
                                                onClick={() => deleteAnswer(res._id)}>Delete
                                            </button>
                                        </Fragment>
                                        : <Fragment>
                                            <button className="btn btn-dark ml-2"
                                                onClick={() => like(res._id)}
                                            >Like {res.likes.length}</button>
                                            <button className="btn btn-danger ml-2"
                                                onClick={() => unlike(res._id)}
                                            >Unlike</button>
                                        </Fragment>
                                    }

                                </div>
                            </div>

                        ))}
                    </Fragment>}
            </div>


        </div>
    )
}

// Question.propTypes = {

// }

const mapStateToProps = state => {
    return {
        question: state.question,
        auth: state.auth,
        answers: state.answer,
        answerCreated: state.answer.ansCreated
    }
}

export default connect(mapStateToProps,
    {
        getQuestion,
        deleteQuestion,
        getAnswer,
        deleteAnswer,
        like,
        unlike
    })
    (Question)
