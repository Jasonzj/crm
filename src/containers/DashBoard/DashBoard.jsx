import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NumberCard from 'components/NumberCard'
import { Row, Col, Card, Tabs, Icon } from 'antd'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// style
import styles from './style'

// actions
import { actions } from 'ducks/dashboard'

const TabPane = Tabs.TabPane

@connect(
    state => ({ ...state.dashboard }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class DashBoard extends PureComponent {
    static propTypes = {
        visit: PropTypes.array,
        aSetData: PropTypes.func,
        numbers: PropTypes.object,
        contract: PropTypes.array,
    }

    componentDidMount() {
        this.props.aSetData()
    }

    render() {
        const { numbers, visit, contract } = this.props
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
                <Card>
                    <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                        <TabPane tab={<span><Icon type="bell" />拜访转换表</span>} key="1">
                            <ResponsiveContainer minHeight={360}>
                                <LineChart width={500} height={300} data={visit}>
                                    <XAxis dataKey="year" axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="success" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="failure" stroke="#82ca9d" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </TabPane>
                        <TabPane tab={<span><Icon type="solution" />合同转换表</span>} key="2">
                            <ResponsiveContainer minHeight={360}>
                                <LineChart width={500} height={300} data={contract}>
                                    <XAxis dataKey="year" axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="success" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="failure" stroke="#f69899" strokeWidth={3} />
                                    <Line type="monotone" dataKey="signed" stroke="#8884d8" strokeWidth={3} />
                                    <Line type="monotone" dataKey="proceed" stroke="#f8c82e" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

export default DashBoard