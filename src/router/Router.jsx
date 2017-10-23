import React from 'react'
import asyncComponent from '../AsyncComponent'
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

// lazyContainer
const HomeContainer = asyncComponent(() => import(/* webpackChunkName: "HomeContainer" */ '../containers/HomeContainer'))
const SignIn = asyncComponent(() => import(/* webpackChunkName: "SignIn" */ '../containers/SignIn'))
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/404'))

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