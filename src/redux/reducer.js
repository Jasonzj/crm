import { combineReducers } from 'redux'

// reducer
import app from './app'
import userManage from './userManage'

export default combineReducers({
    app,
    userManage
})