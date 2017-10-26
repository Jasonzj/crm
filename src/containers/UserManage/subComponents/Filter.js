import React from 'react'
import { Popconfirm, Button, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'

import styles from '../style'

const Search = Input.Search

const Filter = ({
    onReset,
    selectedLen,
    hasSelected,
    onSearchName,
    onDeleteUsers,
}) => (
    <Row gutter={24} className={styles.filter}>
        <Col sm={{ span: 8 }} xs={{ span: 24 }}>
            <Search
                size="large"
                placeholder="搜索用户名字"
                onSearch={onSearchName}
            />
        </Col>
        <Col sm={{ span: 10 }} xs={{ span: 12 }}>
            <Button
                size="large"
                type="primary"
                onClick={onReset}
            >
                    重置
            </Button>
        </Col>
        <Col sm={{ span: 6 }} xs={{ span: 12 }} className={styles.remove}>
            <span className={styles.selectSpan}>
                {hasSelected ? `选择了 ${selectedLen} 个用户` : ''}
            </span>
            <Popconfirm title={'你确定删除这些用户吗?'} placement="left" onConfirm={onDeleteUsers}>
                <Button
                    size="large"
                    type="primary"
                    disabled={!hasSelected}
                >
                    删除
                </Button>
            </Popconfirm>
        </Col>
    </Row>
)

Filter.propTypes = {
    onReset: PropTypes.func,
    hasSelected: PropTypes.bool,
    selectedLen: PropTypes.number,
    onDeleteUsers: PropTypes.func,
    onSearchName: PropTypes.func,
}

export default Filter