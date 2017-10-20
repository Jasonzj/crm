import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

// actions
import * as userManage from 'action/userManage'

@connect(
    state => ({
        ...state.userManage
    }),
    dispatch => bindActionCreators({ ...userManage }, dispatch)
)
class UserManage extends Component {
    componentWillMount() {
        const { userList } = this.props
        if (userList.length === 0) {
            this.props.getUserList(1)
        }
    }

    render() {
        return (
            <div>1</div>
        )
    }
}

UserManage.propTypes = {
    userList: PropTypes.array,
    getUserList: PropTypes.func
}

export default UserManage