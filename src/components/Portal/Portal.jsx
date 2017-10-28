import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends PureComponent {
    constructor(props) {
        super(props)
        this.el = document.createElement('div')
    }

    componentDidMount() {
        document.body.appendChild(this.el)
    }

    componentWillUnmount() {
        document.body.removeChild(this.el)
    }

    render() {
        return createPortal(
            this.props.children,
            this.el,
        )
    }
}

Portal.propTypes = {
    children: PropTypes.any
}

export default Portal