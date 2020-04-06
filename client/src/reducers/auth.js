import {
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    USER_LOADING,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ACCOUNT_DELETED
} from '../actions/types'

const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    userLoading: null,
    user: null,
    name: null,
    msg: '',
    logingFaild: null,
    loggedOut: false
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                ...payload,
                token: localStorage.getItem('token'),
                userLoading: true,
                loading: true,
                isLoading: false,
                logingFaild: null,
                loggedOut: false
            }

        case LOGIN_SUCCESS:
        case USER_LOADED:
        case REGISTER_SUCCESS:
            // localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                isLoading: false,
                logingFaild: null,
                userLoading: null,
                msg: null,
                loggedOut: false,
                id: payload.id
            }

        case LOGIN_FAIL:
            // localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                name: null,
                isLoading: false,
                userLoading: null,
                logingFaild: true,
                msg: payload.map(res => res.msg).toString(),
                loggedOut: false
            }
        case REGISTER_FAIL:
            // localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                name: null,
                isLoading: false,
                userLoading: null,
                logingFaild: true,
                loggedOut: false
            }
        case AUTH_ERROR:
        case ACCOUNT_DELETED:
            // localStorage.removeItem('token')
            return {
                ...state,
                ...payload,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                name: null,
                isLoading: false,
                userLoading: null,
                logingFaild: null,
                loggedOut: false,
            }
        case LOGOUT:
            // localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                userLoading: null,
                user: null,
                name: null,
                isLoading: false,
                logingFaild: null,
                _id: null,
                username: null,
                created: null,
                loggedOut: true
            }
        case LOGIN_LOADING:
        case REGISTER_LOADING:
            return {
                ...state,
                isLoading: true,
                userLoading: null,
                logingFaild: null,
                loggedOut: false
            }

        default: return state
    }
}