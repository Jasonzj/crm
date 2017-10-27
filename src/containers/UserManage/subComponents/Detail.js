import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table, Modal, message } from 'antd'
import { bindActionCreators } from 'redux'

// utils
import { createPagination, createColumns, createForm } from 'utils/config'

// component
import EditModal from 'components/EditModal'
import Filter from 'components/Filter'

// actions
import { actions } from 'ducks/userManage'

// scss
import styles from '../style'

const { aGetUserBusiness, agetUserDetail } = actions
const confirm = Modal.confirm

@connect(
    state => ({
        ...state.userManage,
        uid: state.app.user.uid,
        isFetching: state.app.isFetching,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class Detail extends PureComponent {
    constructor() {
        super()
        this.state = {
            selectedRowKeys: [],
            modalVisible: false,
            item: {}
        }
    }
    componentWillMount() {
        const { match, userLists, business, aGetUserBusiness, agetUserDetail } = this.props
        const uid = match.params.id
        const data = userLists.filter(item => item.uid === uid)[0]
        const init = (name) => {
            this.userName = name
            aGetUserBusiness(name)
        }

        if (data) {
            this.data = data
            init(data.name)
        } else {
            agetUserDetail(uid).then(data => init(data.name))
        }
    }

    onReset = () => {
        this.props.aGetUserBusiness(this.userName)
    }

    onModalOk = (data) => {
        this.props.aUpdateBusiness(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onDeleteBusiness = () => {
        const { selectedRowKeys } = this.state
        const { uid, aDeleteBusiness } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        aDeleteBusiness(data)
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
                title: '你确定要删除这个用户?',
                onOk() {
                    const data = { uid, deleteId: [record.uid] }
                    aDeleteBusiness(data)
                }
            })
        }
    }

    render() {
        const { business, isFetching, currentUser } = this.props
        const { item, modalVisible, selectedRowKeys } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const columns = createColumns({
            handleOption: this.handleOption,
            type: 'userDetail'
        })
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const modalProps = {
            item,
            title: '更新商机',
            type: 'business',
            onOk: this.onModalOk,
            visible: modalVisible,
            formData: createForm('userDetail'),
            onCancel: this.onModalCancel,
        }
        const data = business.map(item => ({
            ...item,
            ...item.client,
            client: null
        }))

        const detail = this.data || currentUser
        const keys = Object.keys(detail)

        return (
            <div className={styles.content}>
                {
                    keys.map(key => (
                        <div key={key} className={styles.item}>
                            <div>{key}</div>
                            <div>{String(detail[key])}</div>
                        </div>
                    ))
                }
                <h1 className={styles.businessTitle}>员工商机</h1>
                <Filter
                    removeTitle={'商机'}
                    onReset={this.onReset}
                    hasSelected={hasSelected}
                    onDeleteUsers={this.onDeleteBusiness}
                    selectedLen={selectedRowKeys.length}
                />
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    rowSelection={rowSelection}
                />
                { modalVisible && <EditModal {...modalProps} /> }
            </div>
        )
    }
}

Detail.propTypes = {
    uid: PropTypes.any,
    match: PropTypes.object,
    business: PropTypes.array,
    userLists: PropTypes.array,
    isFetching: PropTypes.bool,
    aDeleteBusiness: PropTypes.func,
    aUpdateBusiness: PropTypes.func,
    aGetUserBusiness: PropTypes.func,
}

export default Detail