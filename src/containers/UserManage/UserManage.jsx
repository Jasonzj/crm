import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// actions
import { actions } from 'reduxFile/userManage'

@connect(
    state => ({
        ...state.userManage,
        signIn: state.app.signIn
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class UserManage extends Component {
    componentWillMount() {
        const { userLists, signIn, history } = this.props

        if (userLists.length === 0) {
            this.props.getUserListPage(1)
        }

        // 判断登入
        if (!signIn) {                
            history.push('/sign_in')
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
    signIn: PropTypes.bool,
    history: PropTypes.object,
    userLists: PropTypes.array,
    getUserListPage: PropTypes.func,
}

export default UserManage