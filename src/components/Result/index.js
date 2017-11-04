import React from 'react'
import classNames from 'classnames'
import { Icon } from 'antd'
import styles from './index.scss'

export default function Result({
    type,
    title,
    extra,
    actions,
    className,
    description,
    ...restProps
}) {
    const iconMap = {
        error: <Icon className={styles.error} type="close-circle" />,
        success: <Icon className={styles.success} type="check-circle" />,
    };
    const clsString = classNames(styles.result, className)
    return (
        <div className={clsString} {...restProps}>
            <div className={styles.icon}>{iconMap[type]}</div>
            <div className={styles.title}>{title}</div>
            {description && <div className={styles.description}>{description}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    )
}
