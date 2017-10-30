import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table, Modal, message, Tabs, Icon } from 'antd'
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

const confirm = Modal.confirm
const TabPane = Tabs.TabPane
const modalConfigs = {
    1: {
        title: '更新商机',
        data: 'userDetail',
        type: 'business'
    },
    2: {
        title: '更新拜访',
        data: 'visit',
        type: 'visit',
    }
}

@connect(
    state => ({
        ...state.userManage,
        uid: state.app.user.uid,
        uState: state.app.user.state,
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
            tabKey: 1,
            item: {}
        }
    }
    componentWillMount() {
        const { match, userLists, business, aGetUserBusiness, aGetUserVisit, agetUserDetail } = this.props
        const uid = match.params.id
        const data = userLists.filter(item => item.uid === uid)[0]
        const init = (name) => {
            this.userName = name
            aGetUserBusiness(name)
            aGetUserVisit(name)
        }

        if (data) {
            this.data = data
            init(data.name)
        } else {
            agetUserDetail(uid).then(data => init(data.name))
        }
    }

    onReset = () => {
        const { aGetUserBusiness, aGetUserVisit } = this.props
        const { tabKey } = this.state
        tabKey == 1
            ? aGetUserBusiness(this.userName)
            : aGetUserVisit(this.userName)
    }

    onModalOk = (data) => {
        const { aUpdateBusiness, aUpdateVisit } = this.props
        const { tabKey } = this.state
        tabKey == 1
            ? aUpdateBusiness(data)
            : aUpdateVisit(data)
        this.onModalCancel()
    }

    onModalCancel = () => {
        this.setState({ modalVisible: false })
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    onDeleteBusiness = () => {
        const { selectedRowKeys, tabKey } = this.state
        const { uid, aDeleteBusiness, aDeleteVisit } = this.props
        const data = { uid, deleteId: selectedRowKeys }
        this.setState({ selectedRowKeys: [] })
        tabKey == 1
            ? aDeleteBusiness(data)
            : aDeleteVisit(data)
    }

    handleOption = (record, e) => {
        const { uid, aDeleteBusiness, aDeleteVisit } = this.props
        const { tabKey } = this.state
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
                    tabKey == 1
                        ? aDeleteBusiness(data)
                        : aDeleteVisit(data)
                }
            })
        }
    }

    onTabChange = (tabKey) => {
        this.setState({ tabKey })
    }

    render() {
        const { visits, business, isFetching, currentUser, uid, uState } = this.props
        const { item, modalVisible, selectedRowKeys, tabKey } = this.state
        const hasSelected = selectedRowKeys.length > 0
        const modalConfig = modalConfigs[tabKey]
        const columns = createColumns({
            uid,
            uState,
            handleOption: this.handleOption,
            type: modalConfig.type
        })
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const modalProps = {
            item,
            onOk: this.onModalOk,
            visible: modalVisible,
            type: modalConfig.type,
            title: modalConfig.title,
            onCancel: this.onModalCancel,
            formData: createForm(modalConfig.data),
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
                <Filter
                    removeTitle={'商机'}
                    onReset={this.onReset}
                    hasSelected={hasSelected}
                    onDeleteUsers={this.onDeleteBusiness}
                    selectedLen={selectedRowKeys.length}
                />
                <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                    <TabPane tab={<span><Icon type="pay-circle" />商机</span>} key="1">
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            scroll={{ x: 800 }}
                            loading={isFetching}
                            rowSelection={rowSelection}
                        />
                    </TabPane>
                    <TabPane tab={<span><Icon type="eye" />拜访</span>} key="2">
                        <Table
                            columns={columns}
                            dataSource={visits}
                            pagination={false}
                            scroll={{ x: 800 }}
                            loading={isFetching}
                            rowSelection={rowSelection}
                        />
                    </TabPane>
                </Tabs>
                { modalVisible && <EditModal {...modalProps} /> }
            </div>
        )
    }
}

Detail.propTypes = {
    uid: PropTypes.any,
    uState: PropTypes.bool,
    match: PropTypes.object,
    visits: PropTypes.array,
    business: PropTypes.array,
    userLists: PropTypes.array,
    isFetching: PropTypes.bool,
    currentUser: PropTypes.object,
    agetUserDetail: PropTypes.func,
    aDeleteBusiness: PropTypes.func,
    aUpdateBusiness: PropTypes.func,
    aGetUserBusiness: PropTypes.func,
}

export default Detail