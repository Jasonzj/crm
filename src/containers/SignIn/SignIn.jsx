import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button, message } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

// utils
import config from 'utils/config'

// component
import Loading from 'components/Loading'

// action
import { actions } from 'ducks/app'

const FormItem = Form.Item
const iconSize = { fontSize: 13 }

@connect(
    state => ({
        signIn: state.app.signIn,
        isFetching: state.app.isFetching
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class SignIn extends PureComponent {
    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentWillMount() {
        const { signIn, history } = this.props
        this.jumpIndex(signIn, history)
        setTimeout(() => this.setState({ loading: false }), 50)
    }

    jumpIndex(bool, history) {
        bool && history.push(config.homePage)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { form, aSignIn, history } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                aSignIn(values).then((data) => {
                    const { success } = data.data
                    success && this.jumpIndex(success, history)
                })
            }
        })
    }

    render() {
        const { isFetching, form: { getFieldDecorator } } = this.props

        return (
            <div className={styles.signIn}>
                <Loading spinning={this.state.loading} />
                <div className={styles.main}>
                    <div className={styles.title}>
                        <Link to="/sign_in" className={styles.active}>
                            登入
                        </Link>
                        <b>·</b>
                        <Link to="/sign_up">
                            注册
                        </Link>
                    </div>
                    <Form onSubmit={this.handleSubmit} className={styles.form}>
                        <FormItem hasFeedback>
                            {
                                getFieldDecorator('user', {
                                    rules: [
                                        { required: true, message: '请输入你的用户名!' },
                                        { min: 5, message: '最小长度不能低于5' },
                                        { max: 18, message: '最大长度不能超过18' }
                                    ],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="账号"
                                        prefix={<Icon type="user" style={iconSize} />}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem hasFeedback>
                            {
                                getFieldDecorator('pass', {
                                    rules: [
                                        { required: true, message: '请输入你的密码!' },
                                        { min: 5, message: '最小长度不能低于5' },
                                        { max: 18, message: '最大长度不能超过18' }
                                    ],
                                })(
                                    <Input
                                        size="large"
                                        type="password"
                                        placeholder="密码"
                                        prefix={
                                            <Icon type="lock" style={iconSize} />
                                        }
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.button}
                                loading={isFetching}
                            >
                                登入
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const Index = Form.create()(SignIn)

SignIn.propTypes = {
    form: PropTypes.object,
    signIn: PropTypes.bool,
    aSignIn: PropTypes.func,
    history: PropTypes.object,
    isFetching: PropTypes.bool,
}

export default Index