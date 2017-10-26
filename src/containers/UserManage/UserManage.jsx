import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Table, Modal, Button, Popconfirm } from 'antd'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shallowCompare from 'utils/shallowCompare'

// component
import EditModal from './subComponents/EditModal'
import Filter from './subComponents/Filter'

// actions
import { actions } from 'ducks/userManage'

// styles
import styles from './style'

import { createPagination, createColumns } from './config'

const confirm = Modal.confirm

@connect(
    state => ({
        ...state.userManage,
        uid: state.app.user.uid,
        uState: state.app.user.state,
        isFetching: state.app.isFetching,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class UserManage extends Component {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [],
            modalVisible: false,
            item: {}
        }
    }

    componentWillMount() {
        const { userLists, history, aGetUserListPage } = this.props
        userLists.length === 0 && aGetUserListPage(1)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(nextProps, this.props) || shallowCompare(nextState, this.state)
    }

    handleOption = (record, e) => {
        const { uid, aDeleteUser } = this.props
        const { onReset } = this

        if (e.key === '1') {
            this.setState({
                modalVisible: true,
                item: { ...record, eid: uid }
            })
        } else if (e.key === '2') {
            confirm({
                title: '你确定要删除这个用户?',
                onOk() {
                    const data = { uid, deleteId: [record.uid] }
                    aDeleteUser(data)
                    onReset()
                }
            })
        }
    }

    onReset = () => {
        this.props.aGetUserListPage(1)
    }

    onModalOk = (data) => {
        this.props.aUpdateUser(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSearchName = (name) => {
        this.props.aSearchUser(name)
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onDeleteUsers = () => {
        const { selectedRowKeys } = this.state
        const { uid, aDeleteUser } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        aDeleteUser(data)
        this.onReset()
    }

    render() {
        const { userLists, isFetching, total, aGetUserListPage, uState } = this.props
        const { modalVisible, item, modalKey, selectedRowKeys } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const pagination = createPagination(total, page => aGetUserListPage(page))
        const columns = createColumns(uState, this.handleOption)
        const modalProps = {
            item,
            modalKey,
            visible: modalVisible,
            title: 'update',
            onOk: this.onModalOk,
            onCancel: this.onModalCancel,
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        return (
            <div>
                <Filter
                    onReset={this.onReset}
                    hasSelected={hasSelected}
                    onSearchName={this.onSearchName}
                    onDeleteUsers={this.onDeleteUsers}
                    selectedLen={selectedRowKeys.length}
                />
                <Table
                    columns={columns}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    dataSource={userLists}
                    pagination={pagination}
                    className={styles.table}
                    rowSelection={rowSelection}
                />
                { modalVisible && <EditModal {...modalProps} /> }
            </div>
        )
    }
}

UserManage.propTypes = {
    uid: PropTypes.number,
    total: PropTypes.number,
    uState: PropTypes.number,
    history: PropTypes.object,
    userLists: PropTypes.array,
    isFetching: PropTypes.bool,
    aSearchUser: PropTypes.func,
    aDeleteUser: PropTypes.func,
    aUpdateUser: PropTypes.func,
    aGetUserListPage: PropTypes.func,
}

export default UserManage