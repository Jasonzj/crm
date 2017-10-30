import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Layout, Icon } from 'antd'
import { withRouter } from 'react-router'
import { Route, Switch, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import localStore from 'utils/localStore'
import asyncComponent from '../../AsyncComponent'

const { Content, Header, Footer } = Layout

// Container
import UserManage from 'containers/UserManage'
import Business from 'containers/Business'
import Detail from 'containers/UserManage/subComponents/Detail'
import SignIn from 'containers/SignIn'
import Visit from 'containers/Visit'

// lazyContainer
const NotFound = asyncComponent(() => import(/* webpackChunkName: "NotFound" */ '../../containers/NotFound'))

// component
import User from './subComponents/User'
import Bread from './subComponents/Bread'
import Sidebar from './subComponents/Sidebar'
import Loading from 'components/Loading'

// actions
import { actions } from 'ducks/app'

// scss
import styles from './style.scss'

let lastHref
const menuConfig = {
    '/user': 1,
    '/business': 2,
    '/visit': 3,
}

@withRouter
@connect(
    state => ({ ...state.app }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class HomeContainer extends PureComponent {
    constructor() {
        super()
        const sideInline = localStore.fetch('sideInline') || false
        this.state = {
            collapsed: false,
            sideInline
        }
    }

    componentWillMount() {
        const { signIn, history } = this.props
        !signIn ? history.push('/sign_in') : history.push('/user')
    }

    onChangeState = state => () => {
        const value = !this.state[state]
        this.setState({ [state]: value })
        if (state === 'sideInline') localStore.save(state, value)
    }

    onSignOut = (e) => {
        if (e.key === 'signout') {
            this.props.setSignOut()
            this.props.history.push('/sign_in')
        }
    }

    render() {
        const { match, isFetching, user, history: { location }, loading } = this.props
        const { collapsed, sideInline } = this.state
        const href = window.location.href
        const menuKeys = [`${menuConfig[location.pathname]}`]

        if (lastHref !== href) {
            NProgress.start()
            NProgress.set(0.4)
            if (!isFetching) {
                setTimeout(() => NProgress.done(), 300)
                lastHref = href
            }
        }

        if ('/sign_in'.includes(location.pathname)) {
            return [
                <Loading key="1" spinning={loading} />,
                <Route key="2" exact path="/sign_in" component={SignIn} />
            ]
        }

        return (
            <Layout className="ant-layout-has-sider">
                <Loading spinning={loading} />
                <Sidebar
                    menuKeys={menuKeys}
                    collapsed={collapsed}
                    sideInline={sideInline}
                    changeTheme={this.onChangeState('sideInline')}
                />
                <Layout>
                    <Header className={styles.header}>
                        <Icon
                            className={styles.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onChangeState('collapsed')}
                        />
                        <User
                            user={user}
                            onSignOut={this.onSignOut}
                        />
                    </Header>
                    <Bread location={location} />
                    <Content className={styles.main}>
                        <Switch>
                            <Route exact path="/user" component={UserManage} />
                            <Route exact path="/user/:id" component={Detail} />
                            <Route exact path="/business" component={Business} />
                            <Route exact path="/visit" component={Visit} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer className={styles.footer}>CRM Admin  © 2017 Jason</Footer>
                </Layout>
            </Layout>
        )
    }
}

HomeContainer.propTypes = {
    user: PropTypes.object,
    signIn: PropTypes.bool,
    match: PropTypes.object,
    loading: PropTypes.bool,
    history: PropTypes.object,
    setSignOut: PropTypes.func,
    isFetching: PropTypes.bool,
}

export default HomeContainer