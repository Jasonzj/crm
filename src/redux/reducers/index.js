import { combineReducers } from 'redux'
import counter from './counter'
import userManage from './userManage'

const rootReducer = combineReducers({
    counter,
    userManage
})

export default rootReducer