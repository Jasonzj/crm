import React from 'react'
import { Card, Icon } from 'antd'
import PropTypes from 'prop-types'
import CountUp from 'react-countup'
import styles from './style'

const NumberCard = ({
    icon,
    color,
    title,
    number,
}) => (
    <Card className={styles.numberCard} bordered={false}>
        <Icon className={styles.iconWarp} type={icon} style={{ color }} />
        <div className={styles.content}>
            <p className={styles.title}>{title || 'NO Title'}</p>
            <p className={styles.number}>
                <CountUp
                    start={0}
                    end={number}
                    duration={2.75}
                    useEasing
                    useGrouping
                    separator=","
                />
            </p>
        </div>
    </Card>
)

NumberCard.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string,
    number: PropTypes.number
}

export default NumberCard