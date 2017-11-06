import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from '../style'

const breadcrumbNameMap = {
    '/user/*': {
        name: 'User Detail',
        icon: 'solution'
    },
    '/business': {
        name: 'Business',
        icon: 'pay-circle'
    },
    '/visit': {
        name: 'Visit',
        icon: 'bell'
    },
    '/sign_in': {
        name: 'sign_in',
        icon: 'bell'
    },
    '/contract': {
        name: 'Contract',
        icon: 'solution',
    },
    '/contract/*': {
        name: 'Contract Detail',
        icon: 'solution'
    }
}

const Bread = ({
    location
}) => {
    const pathSnippets = location.pathname
        .split('/')
        .filter(i => i)
        .map(item => (parseInt(item) ? '*' : item))

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        const config = breadcrumbNameMap[url]
        let content = null
        if (config) {
            content = (
                <span>
                    {config.icon && <Icon type={config.icon} style={{ marginRight: 4 }} />}
                    {config.name}
                </span>
            )

            return (
                <Breadcrumb.Item key={url}>
                    {
                        url.includes('*')
                            ? content
                            : <Link to={url}>{content}</Link>
                    }
                </Breadcrumb.Item>
            )
        }
    })

    const breadcrumbItems = [(
        <Breadcrumb.Item key="user">
            <Link to="/user">
                <Icon type="user" style={{ marginRight: 4 }} />
                User
            </Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems)

    return (
        <Breadcrumb className={styles.crumb}>
            {breadcrumbItems}
        </Breadcrumb>
    )
}

Bread.propTypes = {
    location: PropTypes.object
}

export default Bread