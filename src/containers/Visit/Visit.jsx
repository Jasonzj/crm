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
import { actions } from 'ducks/visit'

import styles from './style'

const confirm = Modal.confirm

@connect(
    state => ({
        ...state.app,
        ...state.visit,
        uid: state.app.user.uid,
        uState: state.app.user.state,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class Visit extends PureComponent {
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
        const { visits, aGetVisitPage } = this.props
        visits.length === 0 && aGetVisitPage(1)
    }

    handleOption = (record, e) => {
        const { uid, aDeleteVisit } = this.props
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
                    aDeleteVisit(data).then((result) => {
                        result.data.success && onReset()
                    })
                }
            })
        }
    }

    onReset = () => {
        this.props.aGetVisitPage(1)
        this.setState({ selectedRowKeys: [], page: 1 })
    }

    onModalOk = (data) => {
        this.props.aUpdateVisit(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSearchName = (name) => {
        this.props.aSearchUserVisit(name)
    }

    onSearchCompany = (name) => {
        this.props.aSearchCompanyVisit(name)
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onDeleteUsers = () => {
        const { selectedRowKeys } = this.state
        const { uid, aDeleteVisit } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        aDeleteVisit(data)
        this.onReset()
    }

    onPageChnage = (page) => {
        this.props.aGetVisitPage(page)
        this.setState({ page })
    }

    onCreate = () => {
        this.setState({ modalVisible: true, item: {} })
    }

    onCreateBusiness = (data) => {
        this.props.aCreateVisit(data).then((data) => {
            if (data.success) {
                this.onReset()
                this.onModalCancel()
            }
        })
    }

    render() {
        const { visits, isFetching, total, uid, uState } = this.props
        const { modalVisible, selectedRowKeys, item, page } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const columns = createColumns({
            uid,
            uState,
            handleOption: this.handleOption,
            type: 'visit'
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
            type: 'visit',
            onOk: this.onModalOk,
            title: '创建/更新拜访',
            visible: modalVisible,
            onCancel: this.onModalCancel,
            onCreate: this.onCreateBusiness,
            formData: createForm('visit'),
        }

        return (
            <div>
                <Filter
                    removeTitle={'拜访'}
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
                    dataSource={visits}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    pagination={pagination}
                    rowSelection={rowSelection}
                />
                { modalVisible && <EditModal {...modalProps} /> }
            </div>
        )
    }
}

Visit.propTypes = {
    uid: PropTypes.number,
    total: PropTypes.number,
    visits: PropTypes.array,
    uState: PropTypes.number,
    isFetching: PropTypes.bool,
    aUpdateVisit: PropTypes.func,
    aDeleteVisit: PropTypes.func,
    aCreateVisit: PropTypes.func,
    aGetVisitPage: PropTypes.func,
    aSearchUserVisit: PropTypes.func,
    aSearchCompanyVisit: PropTypes.func,
}

export default Visit