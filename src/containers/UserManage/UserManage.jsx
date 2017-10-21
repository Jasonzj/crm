import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// actions
import * as userManage from 'action/userManage'

@connect(
    state => ({
        ...state
    }),
    dispatch => bindActionCreators({ ...userManage }, dispatch)
)
class UserManage extends Component {
    componentWillMount() {
        // const { userLists } = this.props
        // if (userLists.length === 0) {
        //     // this.props.getUserList(1)
        // }
        console.log(this.props)
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
    getUserLists: PropTypes.func
}

export default UserManage