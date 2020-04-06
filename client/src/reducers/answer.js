import {
    GET_ANSWER,
    ERROR_GET_ANSWER,
    ANSWER_LOADING,
    CREATING_ANSWER,
    CREATE_ANSWER,
    DELETED_ANSWER,
    LIKED,
    UNLIKED
} from '../actions/types'

const initialState = {
    answer: [],
    loading: null,
    ansloading: null,
    ansCreated: false
}

export default function (state = initialState, { type, payload }) {
    switch (type) {

        case LIKED:
        case UNLIKED:
            return {
                ...state,
                answer: state.answer.map(ans => ans._id === payload.id ? { ...ans, likes: payload.likes } : ans),
                loading: false,
                // ansloading: null,
                // ansCreated: false
            }


        case DELETED_ANSWER:
            return {
                ...state,
                answer: state.answer.filter(ans => ans._id !== payload.id)
            }

        case CREATE_ANSWER:
            return {
                ...state,
                loading: null,
                ansloading: null,
                ansCreated: true
            }
        case ANSWER_LOADING:
            return {
                ...state,
                loading: true,
                ansloading: null,
            }
        case CREATING_ANSWER:
            return {
                ...state,
                answer: payload,
                loading: null,
                ansloading: true,
            }
        case GET_ANSWER:
            return {
                ...state,
                answer: payload,
                loading: null,
                ansloading: null,
            }

        case ERROR_GET_ANSWER:
            return {
                ...state,
                ...initialState
            }

        default: return state
    }
}