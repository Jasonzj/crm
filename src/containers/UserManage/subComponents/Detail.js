import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from '../style'

const Detail = ({
    match,
    userLists
}) => {
    const uid = match.params.id
    const data = userLists.filter(item => item.uid === uid)[0]
    const keys = Object.keys(data)
    const content = keys.map(key => (
        <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
        </div>
    ))

    return (
        <div className={styles.content}>
            {content}
        </div>
    )
}

Detail.propTypes = {
    match: PropTypes.object,
    userLists: PropTypes.array,
}

export default connect(
    state => ({
        userLists: state.userManage.userLists
    })
)(Detail)