import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Spin } from 'antd'
import { Route } from 'react-router-dom'

const { Content, Header } = Layout

// container
import UserManage from 'containers/UserManage'

// component
import Sidebar from 'components/Sidebar'
import Loading from 'components/Loading'
import User from 'components/User'

// scss
import styles from './style.scss'

const HomeContainer = ({ match }) => (
    <Layout className="ant-layout-has-sider">
        <Sidebar />
        <Layout>
            <Header className={styles.header}>
                员工管理
                <User />
            </Header>
            <Content className={styles.main}>
                <Loading />
                <Route exact path={match.url} component={UserManage} />
            </Content>
        </Layout>
    </Layout>
)

HomeContainer.propTypes = {
    match: PropTypes.object
}

export default HomeContainer