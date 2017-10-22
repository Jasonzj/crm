import React from 'react'
import { Layout, Menu, Icon, Switch } from 'antd'
import PropTypes from 'prop-types'

// scss
import styles from '../style'

const { Sider } = Layout

const Sidebar = ({
    collapsed,
    sideInline,
    changeTheme
}) => (
    <Sider
        className={sideInline ? styles.inline : ''}
        collapsed={collapsed}
    >
        <div className={collapsed ? styles.logoSmall : styles.logoBig}>
            CRM
        </div>
        <Menu
            theme={sideInline ? 'inline' : 'dark'}
            mode="inline"
            defaultSelectedKeys={['1']}
        >
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
        {
            !collapsed &&
            <div className={sideInline ? styles.light : styles.dark}>
                <span><Icon type="bulb" className={styles.bulb} />Switch Theme</span>
                <Switch onChange={changeTheme} defaultChecked={false} checkedChildren="Light" unCheckedChildren="Dark" />
            </div>
        }
    </Sider>
)

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    sideInline: PropTypes.bool,
    changeTheme: PropTypes.func,
}

export default Sidebar