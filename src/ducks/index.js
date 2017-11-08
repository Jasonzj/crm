import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// reducer
import app from './app'
import visit from './visit'
import contract from './contract'
import business from './business'
import userManage from './userManage'
import dashboard from './dashboard'

const rootReducer = combineReducers({
    app,
    visit,
    contract,
    business,
    dashboard,
    userManage,
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