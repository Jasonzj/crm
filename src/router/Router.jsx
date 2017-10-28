import React, { PureComponent } from 'react'
import asyncComponent from '../AsyncComponent'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

// Container
import HomeContainer from 'containers/HomeContainer'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/NotFound'))

const RouteConfig = () => (
    <Router>
        <HomeContainer>
            <Switch>
                <Route exact path="/" render={() => (<Redirect to="/user" />)} />
                <Route component={NotFound} />
            </Switch>
        </HomeContainer>
    </Router>
)

export default RouteConfig