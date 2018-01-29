import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table, Modal, message, Tabs, Icon, Card } from 'antd'
import { bindActionCreators } from 'redux'

// utils
import { createPagination, createColumns, createForm } from 'utils/formConfig'

// component
import EditModal from 'components/EditModal'
import Filter from 'components/Filter'
import DescriptionList from 'components/DescriptionList'

// actions
import { actions } from 'ducks/userManage'

// scss
import styles from '../style'

const { Description } = DescriptionList
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
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            modalVisible: false,
            tabKey: 1,
            item: {}
        }
    }
    componentWillMount() {
        const { match, userLists, business, aGetUserBusiness, aGetUserVisit, agetUserDetail, currentUser } = this.props
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
            agetUserDetail(uid).then(result => init(result.data.data.name))
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
            type: modalConfig.type,
            nameDisabled: true,
            handleOption: this.handleOption,
        })
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const modalProps = {
            item,
            eid: uid,
            onOk: this.onModalOk,
            visible: modalVisible,
            type: modalConfig.type,
            title: modalConfig.title,
            onCancel: this.onModalCancel,
            formData: createForm(modalConfig.data),
        }

        const detail = this.data || currentUser
        const { name, user, age, sex, tel, state } = detail

        return (
            <div className={styles.content}>
                <Card
                    title="用户信息"
                    bordered={false}
                    loading={isFetching}
                    style={{ marginBottom: '20px' }}
                >
                    <DescriptionList size="large">
                        <Description term="姓名">{name}</Description>
                        <Description term="性别">{['男', '女'][sex]}</Description>
                        <Description term="年龄">{age}</Description>
                        <Description term="权限">{['管理员', '普通'][state]}</Description>
                        <Description term="用户名">{user}</Description>
                        <Description term="手机号码">{tel}</Description>
                    </DescriptionList>
                </Card>
                <div className={styles.userTable}>
                    <Filter
                        removeTitle="商机"
                        onReset={this.onReset}
                        hasSelected={hasSelected}
                        isFetching={isFetching}
                        onDeleteUsers={this.onDeleteBusiness}
                        selectedLen={selectedRowKeys.length}
                    />
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab={<span><Icon type="pay-circle" />商机</span>} key="1">
                            <Table
                                columns={columns}
                                dataSource={business}
                                pagination={false}
                                scroll={{ x: 1000 }}
                                loading={isFetching}
                                rowSelection={rowSelection}
                            />
                        </TabPane>
                        <TabPane tab={<span><Icon type="eye" />拜访</span>} key="2">
                            <Table
                                columns={columns}
                                dataSource={visits}
                                pagination={false}
                                scroll={{ x: 900 }}
                                loading={isFetching}
                                rowSelection={rowSelection}
                            />
                        </TabPane>
                    </Tabs>
                </div>
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
    aUpdateVisit: PropTypes.func,
    aDeleteVisit: PropTypes.func,
    currentUser: PropTypes.object,
    aGetUserVisit: PropTypes.func,
    agetUserDetail: PropTypes.func,
    aDeleteBusiness: PropTypes.func,
    aUpdateBusiness: PropTypes.func,
    aGetUserBusiness: PropTypes.func,
}

export default Detail