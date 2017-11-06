import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal } from 'antd'
import PropTypes from 'prop-types'

// utils
import { createColumns, createForm } from 'utils/formConfig'

// component
import EditModal from 'components/EditModal'
import Filter from 'components/Filter'

// actions
import { actions } from 'ducks/contract'

const confirm = Modal.confirm

@connect(
    state => ({
        ...state.contract,
        uid: state.app.user.uid,
        uState: state.app.user.state,
        isFetching: state.app.isFetching,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class Contract extends PureComponent {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [],
            modalVisible: false,
            item: {},
            page: 1
        }
    }

    componentWillMount() {
        const { contracts, aGetContractPage } = this.props
        contracts.length === 0 && aGetContractPage(1)
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
                    aDeleteUser(data).then((result) => {
                        result.data.success && onReset()
                    })
                }
            })
        }
    }

    onReset = () => {
        this.props.aGetUserListPage(1)
        this.setState({ selectedRowKeys: [], page: 1 })
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

    onPageChnage = (page) => {
        this.props.aGetUserListPage(page)
        this.setState({ page })
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
        const { contracts, isFetching, total, uState, uid } = this.props
        const { item, modalVisible, selectedRowKeys, page } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const columnsConfig = {
            uid,
            uState,
            type: 'userManage',
            handleOption: this.handleOption
        }
        const pagination = {
            total,
            current: page,
            showQuickJumper: true,
            onChange: this.onPageChnage
        }
        const modalProps = {
            item,
            type: 'userManage',
            title: '更新员工信息',
            onOk: this.onModalOk,
            visible: modalVisible,
            onCancel: this.onModalCancel,
            formData: createForm('userManage'),
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const columns = createColumns(columnsConfig)

        return (
            <div>
                <Filter
                    removeTitle={'用户'}
                    onReset={this.onReset}
                    isFetching={isFetching}
                    hasSelected={hasSelected}
                    onSearchName={this.onSearchName}
                    onDeleteUsers={this.onDeleteUsers}
                    selectedLen={selectedRowKeys.length}
                />
                <Table
                    simple
                    bordered
                    columns={columns}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    dataSource={contracts}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
                {modalVisible && <EditModal {...modalProps} />}
            </div>
        )
    }
}

Contract.propTypes = {
    total: PropTypes.number,
    uState: PropTypes.number,
    contracts: PropTypes.array,
    isFetching: PropTypes.bool,
    aGetContractPage: PropTypes.func,
}
