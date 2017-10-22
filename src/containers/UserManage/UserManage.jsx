import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// component
import Lists from 'components/Lists'

// actions
import { actions } from 'reduxFile/userManage'

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        render: text => <a href="#">{text}</a>,
    },
    {
        title: '用户名',
        dataIndex: 'user'
    },
    {
        title: '年龄',
        dataIndex: 'age'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render: num => ['男', '女'][num]
    },
    {
        title: '权限',
        dataIndex: 'state',
        render: num => ['管理员', '普通'][num]
    },
    {
        title: '手机号码',
        dataIndex: 'tel'
    },
    // {
    //     title: 'Operation',
    //     key: 'operation',
    //     width: 100,
    //     render: (text, record) => (
    //         // <DropOption />
    //     )
    // }
]

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
        const { userLists } = this.props
        
        return (
            <div>
                <Lists
                    data={userLists}
                    columns={columns}
                />
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