import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NumberCard from 'components/NumberCard'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

// actions
import { actions } from 'ducks/dashboard'

@connect(
    state => ({ ...state.dashboard }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class DashBoard extends PureComponent {
    componentWillMount() {
        this.props.aSetData()
    }

    render() {
        const { numbers } = this.props
        const { users, business, visits, contracts } = numbers

        return (
            <div>
                <Row gutter={24}>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="user"
                            color="rgb(143, 201, 251)"
                            title="用户总数"
                            number={users}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="pay-circle-o"
                            color="rgb(100, 234, 145)"
                            title="商机总数"
                            number={business}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="bell"
                            color="rgb(216, 151, 235)"
                            title="拜访总数"
                            number={visits}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="solution"
                            color="rgb(246, 152, 153)"
                            title="合同总数"
                            number={contracts}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

DashBoard.propTypes = {
    aSetData: PropTypes.func,
    numbers: PropTypes.object,
}

export default DashBoard