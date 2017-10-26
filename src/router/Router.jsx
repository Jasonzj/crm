import React, { PureComponent } from 'react'
import asyncComponent from '../AsyncComponent'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

// Container
import SignIn from 'containers/SignIn'
import HomeContainer from 'containers/HomeContainer'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/NotFound'))
// const HomeContainer = asyncComponent(() => import(/* webpackChunkName: "HomeContainer" */ '../containers/HomeContainer'))
// const SignIn = asyncComponent(() => import(/* webpackChunkName: "SianIn" */ '../containers/SignIn'))

const RouteConfig = () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => (<Redirect to="/admin" />)} />
            <Route path="/admin" component={HomeContainer} />
            <Route path="/sign_in" component={SignIn} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default RouteConfig