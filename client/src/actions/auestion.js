import {
    GET_QUESTIONS,
    GET_QUESTION,
    QUESTION_ERROR,
    QUESTIONS_LOADING,
    QUESTION_LOADING,
    QUESTION_UPDATED,
    QUESTION_DELETED,
    QUESTION_ADDED,
} from './types'
import { setAlert } from './alert'
import axios from 'axios'
import { loadUser } from './auth'

//Editing
export const deleteQuestion = (id) => async dispatch => {

    if (window.confirm('Are you sure? This can NOT be undone!')) {

        dispatch({
            type: QUESTION_LOADING
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.delete(`/api/questions/${id}`, config)
            dispatch({
                type: QUESTION_DELETED,
                payload: res.data
            })

            dispatch(setAlert(res.data.msg, 'success'))

        } catch (err) {
            dispatch({
                type: QUESTION_ERROR
            })
            dispatch(setAlert('Questions Error!', 'warnning'))
        }
    }

}
//Adding
export const addQuestion = (data) => async dispatch => {
    dispatch({
        type: QUESTION_LOADING
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ questiontitle: data })

    try {
        const res = await axios.post(`/api/questions`, body, config)
        dispatch({
            type: QUESTION_ADDED,
            payload: res.data
        })

        dispatch(setAlert('Questions Added!', 'success'))

    } catch (err) {
        dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data.errors
        })

        dispatch(setAlert(err.response.data.errors.map(res => res.msg).toString(), 'warning'))
    }

}
//Editing
export const editQuestion = (id, data) => async dispatch => {
    dispatch({
        type: QUESTION_LOADING
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ questiontitle: data })

    try {
        const res = await axios.put(`/api/questions/${id}`, body, config)
        dispatch({
            type: QUESTION_UPDATED,
            payload: res.data
        })

        dispatch(setAlert('Questions Updated!', 'success'))

    } catch (err) {
        dispatch({
            type: QUESTION_ERROR
        })
        dispatch(setAlert('Questions Error!', 'warnning'))
    }

}

export const getQuestion = (id) => async dispatch => {
    dispatch({
        type: QUESTION_LOADING
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`/api/questions/${id}`, null, config)
        dispatch({
            type: GET_QUESTION,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (err) {
        dispatch({
            type: QUESTION_ERROR
        })
        dispatch(setAlert('Questions Error!', 'warnning'))
    }

}

export const getQuestions = () => async dispatch => {
    dispatch({
        type: QUESTIONS_LOADING
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get('/api/questions', null, config)
        dispatch({
            type: GET_QUESTIONS,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: QUESTION_ERROR
        })
        dispatch(setAlert('Questions Error!', 'warnning'))
    }

}

