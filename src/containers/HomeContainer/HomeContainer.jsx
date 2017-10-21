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

const HomeContainer = ({ match }) => (
    <Layout className="ant-layout-has-sider">
        <Sidebar />
        <Layout>
            <Header className="header">
                员工管理
            </Header>
            <Content className="main">
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