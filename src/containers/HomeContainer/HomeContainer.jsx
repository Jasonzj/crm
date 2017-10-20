import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Content, Header } = Layout

// component
import Sidebar from 'components/Sidebar'

// style
import './style.scss'

const HomeContainer = ({ children }) => (
    <Layout className="ant-layout-has-sider">
        <Sidebar />
        <Layout>
            <Header className="header">
                员工管理
            </Header>
            <Content className="main">
                { children }
            </Content>
        </Layout>
    </Layout>
)

HomeContainer.propTypes = {
    children: PropTypes.any
}

export default HomeContainer