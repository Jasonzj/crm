import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Steps, Icon, Card } from 'antd'
import DescriptionList from 'components/DescriptionList'

// style
import styles from '../style'

// actions
import { actions } from 'ducks/contract'

const Step = Steps.Step
const { Description } = DescriptionList

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
        const { currentContract, isFetching } = this.props
        const { state, title, name, uName, eName, time } = currentContract
        const setpError = state === 2 ? 'error' : ''
        return (
            <Card title="Card title" loading={isFetching}>
                <h1 className={styles.title}>{title}</h1>
                <DescriptionList size="large" title="合同信息" style={{ marginBottom: 32 }}>
                    <Description term="公司名字">{name}</Description>
                    <Description term="状态">{['签订', '进行', '成功', '失败'][state]}</Description>
                    <Description term="跟进人">{eName}</Description>
                    <Description term="跟进人用户名">{uName}</Description>
                    <Description term="创建时间">{time}</Description>
                </DescriptionList>
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
            </Card>
        )
    }
}

Detail.propTypes = {
    match: PropTypes.object,
    aGetContractDetail: PropTypes.func,
    currentContract: PropTypes.object,
}

export default Detail