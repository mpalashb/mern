import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import question from './question'
import answer from './answer'

export default combineReducers({
    auth,
    alert,
    question,
    answer
})
