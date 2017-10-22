import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// component
import Lists from 'components/Lists'
import DropOption from 'components/DropOption'

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
    {
        title: 'Operation',
        key: 'operation',
        width: 100,
        render: (text, record) => (
            <DropOption
                onMenuClick={e => console.log(record, e)}
                menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '删除' }]}
            />
        )
    }
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
    }),
}

@connect(
    state => ({
        ...state.userManage,
        signIn: state.app.signIn,
        isFetching: state.app.isFetching
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.pagination = {
            defaultCurrent: 1,
            total: 300,
            onChange(page) {
                props.getUserListPage(page)
            }
        }
    }

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
        const { userLists, isFetching } = this.props

        return (
            <div>
                <Lists
                    data={userLists}
                    columns={columns}
                    loading={isFetching}
                    pagination={this.pagination}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
}

UserManage.propTypes = {
    signIn: PropTypes.bool,
    history: PropTypes.object,
    userLists: PropTypes.array,
    isFetching: PropTypes.bool,
    getUserListPage: PropTypes.func,
}

export default UserManage