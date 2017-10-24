import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Layout, Icon } from 'antd'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import localStore from 'utils/localStore'
import asyncComponent from '../../AsyncComponent'

const { Content, Header } = Layout

// lazyContainer
// const UserManage = asyncComponent(() => import(/* webpackChunkName: "UserManage" */ '../UserManage'))
import UserManage from 'containers/UserManage'

// component
import Sidebar from './subComponents/Sidebar.jsx'
import User from './subComponents/User.jsx'

// actions
import { actions } from 'ducks/app'

// scss
import styles from './style.scss'

@connect(
    state => ({
        isFetching: state.app.isFetching,
        user: state.app.user,
        signIn: state.app.signIn,
    }),
    dispatch => ({
        setSignOut() {
            dispatch(actions.setSignOut())
        }
    })
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
        !signIn && history.push('/sign_in')
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
        const { match, isFetching, user } = this.props
        const { collapsed, sideInline } = this.state

        return (
            <Layout className="ant-layout-has-sider">
                <Sidebar
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
                    <Content className={styles.main}>
                        <Route exact path={`${match.url}/user`} component={UserManage} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

HomeContainer.propTypes = {
    user: PropTypes.object,
    signIn: PropTypes.bool,
    match: PropTypes.object,
    history: PropTypes.object,
    setSignOut: PropTypes.func,
    isFetching: PropTypes.bool,
}

export default HomeContainer