import React from 'react'
import { Provider } from 'react-redux'
import Router from 'router'     // 路由配置
import store from 'ducks'       // store
import './app.scss'             // 全局样式

const App = () => (
    <Provider store={store}>
        <Router />
    </Provider>
)

export default App