import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
    msg: null,
    alertType: null,
    id: null
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SET_ALERT:
            return {
                ...state,
                ...payload

            }
        case REMOVE_ALERT:
            return initialState
        default:
            return state;
    }
}
