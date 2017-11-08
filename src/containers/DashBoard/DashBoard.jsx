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
                            color="color: #1abc9c"
                            title="用户总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="user"
                            color="color: #1abc9c"
                            title="用户总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="user"
                            color="color: #1abc9c"
                            title="用户总数"
                            number={2222}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <NumberCard
                            icon="user"
                            color="color: #1abc9c"
                            title="用户总数"
                            number={2222}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DashBoard