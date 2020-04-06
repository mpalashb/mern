import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    USER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_LOADING,
    ACCOUNT_DELETED
} from './types'
import { setAlert } from './alert';
import axios from 'axios'


//Register User
export const register = ({ name, username, password }) => async dispatch => {
    dispatch({
        type: REGISTER_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, username, password })

    try {
        const res = await axios.post('/api/auth/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert(res.data.msg, 'success'))

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
        const errors = err.response.data.errors
        if (errors) {
            dispatch(setAlert(errors.map(res => res.msg), 'danger'))
        }
        if (err.response.data.msg) {

            dispatch(setAlert(err.response.data.msg, 'danger'))
        }
    }

}


// Load User
export const loadUser = () => async dispatch => {
    dispatch({
        type: USER_LOADING
    })

    try {
        const res = await axios.get('/api/auth/me');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
        // dispatch(setAlert(res.data.msg))
    }
};

// Login User
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username: username, password: password })

    dispatch({
        type: LOGIN_LOADING
    })

    try {
        const res = await axios.post('/api/auth/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert(res.data.msg, 'success'))
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errors
        })
        dispatch(setAlert(err.response.data.errors.map(res => res.msg).toString(), 'danger'))
    }

}



// Logout 
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Logout Success!', 'success'))
};


// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/auth/me');

            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanantly deleted', 'danger'));
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }
}
