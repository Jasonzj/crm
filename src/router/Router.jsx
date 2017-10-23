import React from 'react'
import { connect } from 'react-redux'
import asyncComponent from '../AsyncComponent.js'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Loading from 'components/Loading'
import PropTypes from 'prop-types'

// container
import HomeContainer from 'containers/HomeContainer'
import SignIn from 'containers/SignIn'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../containers/404'))

const RouteConfig = ({ loading }) => (
    <Router>
        <div style={{ height: '100%' }}>
            <Loading spinning={loading} />
            <Switch>
                <Route exact path="/" component={HomeContainer} />
                <Route path="/sign_in" component={SignIn} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

RouteConfig.propTypes = {
    loading: PropTypes.bool
}

export default connect(
    state => ({
        loading: state.app.loading
    })
)(RouteConfig)