import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Spin, Icon } from 'antd'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const { Content, Header } = Layout

// container
import UserManage from 'containers/UserManage'

// component
import Sidebar from 'components/Sidebar'
import User from 'components/User'

// actions
import { actions } from 'reduxFile/app'

// scss
import styles from './style.scss'

@connect(
    state => ({
        isFetching: state.app.isFetching,
        user: state.app.user
    }),
    dispatch => ({
        setLogOut() {
            dispatch(actions.setLogOut())
        }
    })
)
class HomeContainer extends PureComponent {
    constructor() {
        super()
        this.state = {
            collapsed: false,
            sideInline: false
        }
    }

    onCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    changeTheme = () => {
        this.setState({ sideInline: !this.state.sideInline })
    }

    onSignOut = (e) => {
        if (e.key === 'signout') {
            this.props.setLogOut()
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
                    changeTheme={this.changeTheme}
                />
                <Layout>
                    <Header className={styles.header}>
                        <Icon
                            className={styles.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onCollapse}
                        />
                        <User
                            user={user}
                            onSignOut={this.onSignOut}
                        />
                    </Header>
                    <Content className={styles.main}>
                        { isFetching && <Spin size="large" /> }
                        <Route exact path={match.url} component={UserManage} />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

HomeContainer.propTypes = {
    user: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    setLogOut: PropTypes.func,
    isFetching: PropTypes.bool
}

export default HomeContainer