import {
    GET_ANSWER,
    ERROR_GET_ANSWER,
    ANSWER_LOADING,
    CREATING_ANSWER,
    CREATE_ANSWER,
    CREATE_ANSWER_ERROR,
    DELETED_ANSWER,
    DELETE_ANSWER_ERROR,
    LIKED,
    UNLIKED
} from './types'
import { setAlert } from './alert'
import axios from 'axios'
import { loadUser } from './auth'


export const like = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/answer/${id}/like`)
        dispatch({
            type: LIKED,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
}

export const unlike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/answer/${id}/unlike`)
        dispatch({
            type: UNLIKED,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
}


export const createAnswer = (qsID, body) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    dispatch({
        type: CREATING_ANSWER
    })


    try {
        const res = await axios.post(`/api/questions/${qsID}/answer`, JSON.stringify({ answerdetail: body }), config)
        dispatch({
            type: CREATE_ANSWER,
            payload: res.data
        })
        dispatch(setAlert('Answer Created!', 'success'))
        dispatch(getAnswer(qsID))

    } catch (err) {
        dispatch({
            type: CREATE_ANSWER_ERROR
        })
        // const errors = err.response.data.errors
        // console.log(errors)
        dispatch(setAlert(err.response.data.errors.map(res => res.msg).toString(), 'warning'))
    }
}

export const deleteAnswer = (ans_id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const res = await axios.delete(`/api/answer/${ans_id}`)
            dispatch({
                type: DELETED_ANSWER,
                payload: { msg: res.data.msg, id: ans_id }
            })
            dispatch(setAlert(res.data.msg, 'success'))
            // console.log(ans_id)
            // dispatch(loadUser())

        } catch (err) {
            dispatch({
                type: DELETE_ANSWER_ERROR
            })
            // const errors = err.response.data.errors
            // console.log(errors)
            dispatch(setAlert('Error!', 'warning'))
        }
    }
}

export const getAnswer = (qsID) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // console.log(qsID)

    dispatch({
        type: ANSWER_LOADING
    })

    try {
        const res = await axios.get(`/api/answers/${qsID}`, null, config)
        dispatch({
            type: GET_ANSWER,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ERROR_GET_ANSWER
        })
        dispatch(setAlert('Answer Getting Error!', 'warning'))
    }
}