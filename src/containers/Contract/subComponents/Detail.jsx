import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
        const { match, aGetContractDetail, contracts } = this.props
        // aGetContractDetail(match.params.id)
        this.data = contracts.filter(item => item.id === match.params.id)[0]
    }

    render() {
        const { currentContract, isFetching } = this.props
        const { state, title, name, uName, eName, time, note, content, result, uid } = this.data
        const setpError = state === 2 ? 'error' : ''
        return ([
            <Card
                key="1"
                title={title}
                loading={isFetching}
                className={styles.box}
            >
                <DescriptionList size="large">
                    <Description term="公司名字">{name}</Description>
                    <Description term="状态">{['签订', '进行', '成功', '失败'][state]}</Description>
                    <Description term="跟进人">
                        <Link to={`/user/${uid}`}>{eName}</Link>
                    </Description>
                    <Description term="创建时间">{time}</Description>
                </DescriptionList>
            </Card>,
            <Card
                key="2"
                title="流程信息"
                loading={isFetching}
                className={styles.box}
            >
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
            </Card>,
            <Card
                key="3"
                title="合同备注"
                loading={isFetching}
                className={styles.box}
            >
                {note}
            </Card>,
            <Card
                key="4"
                title="合同内容"
                loading={isFetching}
                className={styles.box}
            >
                {content}
            </Card>
        ])
    }
}

Detail.propTypes = {
    match: PropTypes.object,
    isFetching: PropTypes.bool,
    currentContract: PropTypes.object,
    aGetContractDetail: PropTypes.func,
}

export default Detail