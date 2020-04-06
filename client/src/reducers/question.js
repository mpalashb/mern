import {
    GET_QUESTION,
    GET_QUESTIONS,
    QUESTIONS_LOADING,
    QUESTION_LOADING,
    QUESTION_ERROR,
    QUESTION_UPDATED,
    QUESTION_DELETED,
    QUESTION_ADDED
} from '../actions/types'

const initialState = {
    questions: [],
    question: null,
    loading: null,
    updated: null,
    deleted: null,
    added: null

}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case QUESTION_ADDED:
            return {
                ...initialState,
                added: true

            }
        case QUESTION_DELETED:
            return {
                ...state,
                questions: null,
                question: null,
                loading: false,
                updated: false,
                deleted: true,
                added: null
            }
        case QUESTION_UPDATED:
            return {
                ...state,
                questions: null,
                question: null,
                loading: false,
                updated: true,
                deleted: null,
                added: null
            }
        case QUESTION_ERROR:
            return {
                ...state,
                questions: null,
                question: null,
                loading: false,
                updated: false,
                deleted: null,
                added: null
            }
        case QUESTIONS_LOADING:
            return {
                ...state,
                questions: null,
                question: null,
                loading: true,
                updated: false,
                deleted: null,
                added: null
            }
        case QUESTION_LOADING:
            return {
                ...state,
                questions: payload,
                question: null,
                loading: true,
                updated: false,
                deleted: null,
                added: null
            }
        case GET_QUESTION:
            return {
                ...state,
                question: payload,
                loading: false,
                updated: false,
                deleted: null,
                added: null
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: payload,
                loading: false,
                updated: false,
                deleted: null,
                added: null
            }

        default: return state
    }
}