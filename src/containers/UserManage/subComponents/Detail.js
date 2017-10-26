import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { createPagination, createBusinessColumns } from '../config'

// actions
import { actions } from 'ducks/userManage'

// scss
import styles from '../style'

const { aGetUserBusiness } = actions

class Detail extends PureComponent {
    componentWillMount() {
        const { match, userLists, aGetUserBusiness } = this.props
        const uid = match.params.id
        const data = userLists.filter(item => item.uid === uid)[0] || {}
        const keys = Object.keys(data)
        this.content = keys.map(key => (
            <div key={key} className={styles.item}>
                <div>{key}</div>
                <div>{String(data[key])}</div>
            </div>
        ))

        aGetUserBusiness(data.name)
    }

    render() {
        const { business, isFetching } = this.props
        const columns = createBusinessColumns()

        return (
            <div className={styles.content}>
                {this.content}
                <span>商机:</span>
                <Table
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 800 }}
                    loading={isFetching}
                    dataSource={business}
                />
            </div>
        )
    }
}

Detail.propTypes = {
    match: PropTypes.object,
    business: PropTypes.array,
    userLists: PropTypes.array,
    isFetching: PropTypes.bool,
    aGetUserBusiness: PropTypes.func,
}

export default connect(
    state => ({
        ...state.userManage,
        isFetching: state.app.isFetching
    }),
    dispatch => ({
        aGetUserBusiness(name) {
            dispatch(aGetUserBusiness(name))
        }
    })
)(Detail)