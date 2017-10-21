import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spin } from 'antd'

@connect(
    state => ({
        isFetching: state.app.isFetching
    })
)
class Loading extends PureComponent {
    render() {
        const { isFetching } = this.props
        return (
            <div>
                { isFetching && <Spin size="large" /> }
            </div>
        )
    }
}

Loading.propTypes = {
    isFetching: PropTypes.bool
}

export default Loading