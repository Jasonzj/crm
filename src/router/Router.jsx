import React from 'react'
import asyncComponent from '../AsyncComponent.js'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// container
import HomeContainer from 'containers/HomeContainer'
import SignIn from 'containers/SignIn'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/404'))

const RouteConfig = () => (
    <Router>
        <div style={{ height: '100%' }}>
            <Switch>
                <Route exact path="/" component={HomeContainer} />
                <Route path="/sign_in" component={SignIn} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

export default RouteConfig