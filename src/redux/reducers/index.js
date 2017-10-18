import { combineReducers } from 'redux'
import counter from './counter'
import data from './data.js'

const rootReducer = combineReducers({
    counter,
    data
})

export default rootReducer