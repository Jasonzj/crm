import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// reducer
import app from './app'
import userManage from './userManage'
import business from './business'

const rootReducer = combineReducers({
    app,
    userManage,
    business
})


let store = null
if (__DEV__) {          // 开发环境
    store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    )
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    )
}

export default store