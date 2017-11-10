import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NumberCard from 'components/NumberCard'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from 'antd'

// style
import styles from './style'

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
        const { numbers, visit } = this.props
        const { users, business, visits, contracts } = numbers

        return (
            <div className={styles.dashboard}>
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
                <Card
                    title="年拜访转换表"
                >
                    <ResponsiveContainer minHeight={360}>
                        <LineChart width={500} height={300} data={visit}>
                            <XAxis dataKey="year" axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="success" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="failure" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        )
    }
}

DashBoard.propTypes = {
    visit: PropTypes.array,
    aSetData: PropTypes.func,
    numbers: PropTypes.object,
}

export default DashBoard