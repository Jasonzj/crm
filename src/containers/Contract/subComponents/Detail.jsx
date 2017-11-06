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
        return (
            <div>
                <Steps current={currentContract.state}>
                    <Step status="finish" title="签订" icon={<Icon type="edit" />} />
                    <Step status="finish" title="进行" icon={<Icon type="sync" />} />
                    {
                        currentContract.state === 2
                            ? <Step status="process" title="失败" icon={<Icon type="frown-o" />} />
                            : <Step status="wait" title="成功" icon={<Icon type="smile-o" />} />
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