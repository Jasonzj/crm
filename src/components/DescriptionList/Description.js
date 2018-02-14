import React from 'react'
import classNames from 'classnames'
import { Col } from 'antd'
import PropTypes from 'prop-types'
import styles from './index.scss'
import responsive from './responsive'
import Description from './Description'

const Description = ({
    term,
    column,
    children,
    className,
    ...restProps
}) => {
    const clsString = classNames(styles.description, className)
    return (
        <Col className={clsString} {...responsive[column]} {...restProps}>
            {term && <div className={styles.term}>{term}</div>}
            {children && <div className={styles.detail}>{children}</div>}
        </Col>
    )
}

export default Description
