import React from 'react'
import { Icon } from 'antd'
import styles from './style'

const NotFound = () => (
    <div className="content-inner">
        <div className={styles.error}>
            <Icon type="frown-o" />
            <h1>404 Not Found</h1>
        </div>
    </div>
)

export default NotFound