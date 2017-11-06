import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Steps, Icon } from 'antd'

// actions
import { actions } from 'ducks/contract'

const Step = Steps.Step

@connect(
    state => ({
        ...state.contract,
        uid: state.app.user.uid,
        uState: state.app.user.state,
        isFetching: state.app.isFetching,
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class Detail extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {
        const { match, aGetContractDetail } = this.props
        aGetContractDetail(match.params.id)
    }

    render() {
        const { currentContract } = this.props
        const { state } = currentContract
        const setpError = state === 2 && 'error'
        return (
            <div>
                <Steps
                    current={state}
                    status={setpError}
                >
                    <Step title="签订" icon={<Icon type="edit" />} />
                    <Step title="进行" icon={<Icon type="sync" />} />
                    {
                        state === 2
                            ? <Step status={setpError} title="失败" icon={<Icon type="frown-o" />} />
                            : <Step title="成功" icon={<Icon type="smile-o" />} />
                    }
                </Steps>
            </div>
        )
    }
}

Detail.propTypes = {
    match: PropTypes.object,
    aGetContractDetail: PropTypes.func,
    currentContract: PropTypes.object,
}

export default Detail