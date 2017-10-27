import React from 'react'
import { Popconfirm, Button, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'

import styles from '../style'

const Search = Input.Search

const Filter = ({
    onReset,
    removeTitle,
    selectedLen,
    hasSelected,
    onSearchName,
    onDeleteUsers,
}) => (
    <Row gutter={24} className={styles.filter}>
        {
            onSearchName &&
            <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                <Search
                    size="large"
                    placeholder="搜索用户名字"
                    onSearch={onSearchName}
                />
            </Col>
        }
        <Col
            xs={{ span: 24 }}
            className={styles.remove}
            sm={{ span: onSearchName ? 16 : 24 }}
        >
            <span className={styles.selectSpan}>
                {
                    hasSelected
                        ? `选择了 ${selectedLen} 个${removeTitle}` 
                        : ''
                }
            </span>
            <Popconfirm
                placement="left"
                onConfirm={onDeleteUsers}
                title={`你确定删除这些${removeTitle}吗?`}
            >
                <Button
                    size="large"
                    type="primary"
                    disabled={!hasSelected}
                >
                    删除
                </Button>
            </Popconfirm>
            <Button
                size="large"
                type="primary"
                onClick={onReset}
                style={{ marginLeft: '12px' }}
            >
                    重置
            </Button>
        </Col>
    </Row>
)

Filter.propTypes = {
    onReset: PropTypes.func,
    hasSelected: PropTypes.bool,
    onSearchName: PropTypes.func,
    selectedLen: PropTypes.number,
    onDeleteUsers: PropTypes.func,
    removeTitle: PropTypes.string,
}

export default Filter