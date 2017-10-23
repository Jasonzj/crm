import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// reducer
import app from './app'
import userManage from './userManage'

const rootReducer = combineReducers({
    app,
    userManage
})


let store = null
if (__DEV__) {          // 开发环境
    store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk, logger)
    )
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}

export default store