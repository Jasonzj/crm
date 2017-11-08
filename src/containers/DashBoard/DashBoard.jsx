import React, { PureComponent } from 'react'
import NumberCard from 'components/NumberCard'
import { Row, Col } from 'antd'

class DashBoard extends PureComponent {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <Row gutter={24}>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="user"
                            color="rgb(143, 201, 251)"
                            title="用户总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="pay-circle-o"
                            color="rgb(100, 234, 145)"
                            title="商机总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="bell"
                            color="rgb(216, 151, 235)"
                            title="拜访总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="solution"
                            color="rgb(246, 152, 153)"
                            title="合同总数"
                            number={2222}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DashBoard