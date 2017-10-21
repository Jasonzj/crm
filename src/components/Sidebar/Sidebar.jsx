import React, { PureComponent } from 'react'
import { Layout, Menu, Icon } from 'antd'

// scss
import styles from './style.scss'

const { Sider } = Layout

class Sidebar extends PureComponent {
    constructor() {
        super()
        this.state = {
            collapsed: false
        }
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    render() {
        const { collapsed } = this.state
        const { user } = this.props

        return (
            <Sider
                collapsed={collapsed}
                onCollapse={this.onCollapse}
                collapsible
            >
                <div className={collapsed ? styles.logoSmall : styles.logoBig}>
                    CRM
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>员工管理</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="pay-circle" />
                        <span>商机</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="bell" />
                        <span>拜访</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="solution" />
                        <span>合同</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default Sidebar