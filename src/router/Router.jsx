import React from 'react'
import asyncComponent from '../AsyncComponent.js'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// components
import HomeContainer from 'containers/HomeContainer'
import UserManage from 'containers/UserManage'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/404'))

const RouteConfig = () => (
    <Router>
        <HomeContainer>
            <Switch>
                <Route exact path="/" component={UserManage} />
                <Route component={NotFound} />
            </Switch>
        </HomeContainer>
    </Router>
)

export default RouteConfig