import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table, Modal, message } from 'antd'
import { bindActionCreators } from 'redux'

// utils
import { createPagination, createColumns, createForm } from 'utils/config'

// component
import EditModal from 'components/EditModal'

// actions
import { actions } from 'ducks/userManage'

// scss
import styles from '../style'

const { aGetUserBusiness } = actions
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
            modalVisible: false,
            item: {}
        }
    }
    componentWillMount() {
        const { match, userLists, business, aGetUserBusiness } = this.props
        const uid = match.params.id
        const data = userLists.filter(item => item.uid === uid)[0] || {}
        const keys = Object.keys(data)
        this.content = keys.map(key => (
            <div key={key} className={styles.item}>
                <div>{key}</div>
                <div>{String(data[key])}</div>
            </div>
        ))

        this.userName = data.name
        aGetUserBusiness(data.name)
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
        const { business, isFetching } = this.props
        const { item, modalVisible } = this.state
        const columns = createColumns({
            handleOption: this.handleOption,
            type: 'UserDetail'
        })
        const modalProps = {
            item,
            title: '更新商机',
            type: 'userDetail',
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

        return (
            <div className={styles.content}>
                {this.content}
                <span>商机:</span>
                <Table
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    dataSource={data}
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