import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

const Lists = ({
    data,
    columns
}) => (
    <div>
        <Table dataSource={data} columns={columns} />
    </div>
)

Lists.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array
}

export default Lists