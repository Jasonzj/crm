import React from 'react'
import { Avatar, Menu, Icon, Dropdown } from 'antd'
import PropTypes from 'prop-types'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

// scss
import styles from '../style'

const User = ({
    user,
    onSignOut
}) => {
    const menu = (
        <Menu
            className={styles.user}
            onClick={onSignOut}
        >
            <Menu.Item disabled><Icon type="user" />个人中心</Menu.Item>
            <Menu.Item disabled><Icon type="setting" />设置</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="signout"><Icon type="logout" />退出登录</Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" src={user.avatar} className={styles.avatar} />
                <span className={styles.uName}>{user.name}</span>
            </span>
        </Dropdown>
    )
}

User.propTypes = {
    user: PropTypes.object,
    onSignOut: PropTypes.func
}

export default User