import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

const Lists = ({
    data,
    columns,
    loading,
    pagination,
    rowSelection
}) => (
    <div>
        <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            pagination={pagination}
            rowSelection={rowSelection}
        />
    </div>
)

Lists.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    columns: PropTypes.array,
    pagination: PropTypes.object,
    rowSelection: PropTypes.object
}

export default Lists