import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'

// scss
import styles from './style'

@connect(
    state => ({
        user: state.app.user
    })
)
class User extends PureComponent {
    render() {
        const { user } = this.props

        return (
            <div className={styles.user}>
                <span className={styles.avatar}>
                    <Avatar size="large" src={user.avatar} />
                </span>
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.object
}

export default User