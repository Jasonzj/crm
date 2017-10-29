import React from 'react'
import { Popconfirm, Button, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'

import styles from './style'

const Search = Input.Search

const Filter = ({
    onReset,
    onCreate,
    isFetching,
    removeTitle,
    selectedLen,
    hasSelected,
    onSearchName,
    onDeleteUsers,
    onSearchCompany,
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
        {
            onSearchCompany &&
            <Col sm={{ span: 8 }} xs={{ span: 24 }}>
                <Search
                    size="large"
                    placeholder="搜索公司名字"
                    onSearch={onSearchCompany}
                />
            </Col>
        }
        <Col
            xs={{ span: 24 }}
            className={styles.remove}
            sm={{ span: onSearchName ? onSearchCompany ? 8 : 16 : 24 }}
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
                    icon="minus-circle-o"
                    size="large"
                    disabled={!hasSelected}
                >
                    删除
                </Button>
            </Popconfirm>
            <Button
                icon="sync"
                size="large"
                type="primary"
                onClick={onReset}
                loading={isFetching}
                style={{ marginLeft: '12px' }}
            >
                    重置
            </Button>
            {
                onCreate &&
                <Button
                    icon="plus-circle-o"
                    size="large"
                    onClick={onCreate}
                    style={{ marginLeft: '12px' }}
                >
                    创建
                </Button>
            }
        </Col>
    </Row>
)

Filter.propTypes = {
    onReset: PropTypes.func,
    onCreate: PropTypes.func,
    isFetching: PropTypes.bool,
    hasSelected: PropTypes.bool,
    onSearchName: PropTypes.func,
    selectedLen: PropTypes.number,
    onDeleteUsers: PropTypes.func,
    removeTitle: PropTypes.string,
    onSearchCompany: PropTypes.func,
}

export default Filter