import React from 'react'
import { Avatar, Menu } from 'antd'
import PropTypes from 'prop-types'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

// scss
import styles from '../style'

const User = ({
    user,
    onSignOut
}) => (
    <Menu
        mode="horizontal"
        className={styles.user}
        onClick={onSignOut}
    >
        <SubMenu
            title={
                <Avatar size="large" src={user.avatar} />
            }
        >
            <MenuItemGroup title={user.name} />
            <Menu.Item key="signout">
                Sign out
            </Menu.Item>
        </SubMenu>
    </Menu>
)

User.propTypes = {
    user: PropTypes.object,
    onSignOut: PropTypes.func
}

export default User