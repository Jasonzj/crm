import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// actions
import { actions } from 'reduxFile/userManage'

@connect(
    state => ({
        ...state.userManage
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class UserManage extends Component {
    componentWillMount() {
        const { userLists } = this.props
        if (userLists.length === 0) {
            this.props.getUserListPage(1)
        }
    }

    render() {
        return (
            <div>
                1
            </div>
        )
    }
}

UserManage.propTypes = {
    userLists: PropTypes.array,
    getUserListPage: PropTypes.func
}

export default UserManage