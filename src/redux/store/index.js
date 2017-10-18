import { createStore, applyMiddleware } from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'

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