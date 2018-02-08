import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal } from 'antd'
import PropTypes from 'prop-types'

// style
import styles from './style'

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
    static propTypes = {
        uid: PropTypes.number,
        total: PropTypes.number,
        uState: PropTypes.number,
        contracts: PropTypes.array,
        isFetching: PropTypes.bool,
        aCreateContract: PropTypes.func,
        aDeleteContract: PropTypes.func,
        aUpdateContract: PropTypes.func,
        aGetContractPage: PropTypes.func,
        aSearchUserContract: PropTypes.func,
        aSearchCompanyContract: PropTypes.func,
    }

    state = {
        selectedRowKeys: [],
        modalVisible: false,
        item: {},
        page: 1
    }

    componentWillMount() {
        const { contracts, aGetContractPage } = this.props
        contracts.length === 0 && aGetContractPage(1)
    }

    handleOption = (record, e) => {
        const { uid, aDeleteContract } = this.props
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
                    aDeleteContract(data).then((result) => {
                        result.data.success && onReset()
                    })
                }
            })
        }
    }

    onReset = () => {
        this.props.aGetContractPage(1)
        this.setState({ selectedRowKeys: [], page: 1 })
    }

    onModalOk = (data) => {
        this.props.aUpdateContract(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSearchName = (name) => {
        this.props.aSearchUserContract(name)
    }

    onSearchCompany = (name) => {
        this.props.aSearchCompanyContract(name)
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onPageChnage = (page) => {
        this.props.aGetContractPage(page)
        this.setState({ page })
    }

    onDeleteUsers = () => {
        const { selectedRowKeys } = this.state
        const { uid, aDeleteContract } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        aDeleteContract(data).then((result) => {
            result.data.success && this.onReset()
        })
    }

    onCreate = () => {
        this.setState({ modalVisible: true, item: {} })
    }

    onCreateContract = (data) => {
        this.props.aCreateContract(data).then((result) => {
            if (result.data.success) {
                this.onReset()
                this.onModalCancel()
            }
        })
    }

    render() {
        const { contracts, isFetching, total, uState, uid } = this.props
        const { item, modalVisible, selectedRowKeys, page } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const columnsConfig = {
            uid,
            uState,
            type: 'contract',
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
            eid: uid,
            type: 'contract',
            title: '创建/更新合同信息',
            onOk: this.onModalOk,
            visible: modalVisible,
            confirmLoading: isFetching,
            onCancel: this.onModalCancel,
            onCreate: this.onCreateContract,
            formData: createForm('contract'),
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const columns = createColumns(columnsConfig)

        return (
            <div className={styles.contract}>
                <Filter
                    removeTitle="拜访"
                    onReset={this.onReset}
                    isFetching={isFetching}
                    onCreate={this.onCreate}
                    hasSelected={hasSelected}
                    onSearchName={this.onSearchName}
                    onDeleteUsers={this.onDeleteUsers}
                    selectedLen={selectedRowKeys.length}
                    onSearchCompany={this.onSearchCompany}
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

export default Contract
