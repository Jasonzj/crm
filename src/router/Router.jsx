import React from 'react'
import asyncComponent from '../AsyncComponent.js'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// components
import HomeContainer from 'containers/HomeContainer'
// import HelloWorld from 'containers/HelloWorld'

// lazyContainer
// const HelloReact = asyncComponent(() => import(/* webpackChunkName: "HelloReact" */ '../containers/HelloReact/index'))
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/404'))

const RouteConfig = () => (
    <Router>
        <HomeContainer>
            <Switch>
                {/* <Route exact path="/" component={HelloWorld} />
                <Route path="/react" component={HelloReact} /> */}
                <Route component={NotFound} />
            </Switch>
        </HomeContainer>
    </Router>
)

export default RouteConfig