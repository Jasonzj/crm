import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Table, Modal } from 'antd'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

// utils
import { createColumns, createForm } from 'utils/formConfig'

// component
import EditModal from 'components/EditModal'
import Filter from 'components/Filter'

// actions
import { actions } from 'ducks/business'

const confirm = Modal.confirm

@connect(
    state => ({
        ...state.business,
        uid: state.app.user.uid,
        uState: state.app.user.state,
        isFetching: state.app.isFetching,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class Business extends PureComponent {
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
        const { business, aGetBusinessPage } = this.props
        business.length === 0 && aGetBusinessPage(1)
    }

    handleOption = (record, e) => {
        const { uid, aDeleteBusiness } = this.props
        const { onReset } = this

        if (e.key === '1') {
            this.setState({
                modalVisible: true,
                item: { ...record, eid: uid }
            })
        } else if (e.key === '2') {
            confirm({
                title: '你确定要删除这个商机?',
                onOk() {
                    const data = { uid, deleteId: [record.uid] }
                    aDeleteBusiness(data).then((result) => {
                        result.data.success && onReset()
                    })
                }
            })
        }
    }

    onReset = () => {
        this.props.aGetBusinessPage(1)
        this.setState({ selectedRowKeys: [], page: 1 })
    }

    onModalOk = (data) => {
        this.props.aUpdateBusiness(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSearchName = (name) => {
        this.props.aSearchUserBusiness(name)
    }

    onSearchCompany = (name) => {
        this.props.aSearchCompanyBusiness(name)
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onDeleteUsers = () => {
        const { selectedRowKeys } = this.state
        const { uid, aDeleteBusiness } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        aDeleteBusiness(data).then((result) => {
            result.data.success && this.onReset()
        })
    }

    onPageChnage = (page) => {
        this.props.aGetBusinessPage(page)
        this.setState({ page })
    }

    onCreate = () => {
        this.setState({ modalVisible: true, item: {} })
    }

    onCreateBusiness = (data) => {
        this.props.aCreateBusiness(data).then((result) => {
            if (result.data.success) {
                this.onReset()
                this.onModalCancel()
            }
        })
    }

    render() {
        const { business, isFetching, total, uid, uState } = this.props
        const { modalVisible, selectedRowKeys, item, page } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const columns = createColumns({
            uid,
            uState,
            type: 'business',
            handleOption: this.handleOption,
        })
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
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
            type: 'business',
            onOk: this.onModalOk,
            title: '创建/更新商机',
            visible: modalVisible,
            onCancel: this.onModalCancel,
            onCreate: this.onCreateBusiness,
            formData: createForm('business'),
        }
        const data = business.map(item => ({
            ...item,
            ...item.client,
            client: null
        }))

        return (
            <div>
                <Filter
                    removeTitle={'商机'}
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
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 1100 }}
                    loading={isFetching}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
                { modalVisible && <EditModal {...modalProps} /> }
            </div>
        )
    }
}

Business.propTypes = {
    uid: PropTypes.number,
    total: PropTypes.number,
    uState: PropTypes.number,
    business: PropTypes.array,
    isFetching: PropTypes.bool,
    aUpdateBusiness: PropTypes.func,
    aDeleteBusiness: PropTypes.func,
    aCreateBusiness: PropTypes.func,
    aGetBusinessPage: PropTypes.func,
    aSearchUserBusiness: PropTypes.func,
    aSearchCompanyBusiness: PropTypes.func,
}

export default Business