import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

// action
import { actions } from 'ducks/app'

const FormItem = Form.Item

@connect(
    state => ({
        signIn: state.app.signIn,
        isFetching: state.app.isFetching
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class SignIn extends PureComponent {
    componentWillMount() {
        const { signIn, history } = this.props
        this.jumpIndex(signIn, history)
        setTimeout(() => this.props.finishLoader(), 50)
    }

    componentWillUnmount() {
        this.props.startLoader()
    }

    jumpIndex(bool, history) {
        bool && history.push('/user')
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { form, aSignIn, history } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                aSignIn(values).then((data) => {
                    const { success, message } = data.data
                    success && this.jumpIndex(success, history)
                })
            }
        })
    }

    render() {
        const { isFetching, form: { getFieldDecorator } } = this.props

        return (
            <div className={styles.signIn}>
                <div className={styles.main}>
                    <div className={styles.title}>
                        <Link to={'/sign_in'} className={styles.active}>
                            登入
                        </Link>
                        <b>·</b>
                        <Link to={'/sign_up'}>
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
                                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
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
                                            <Icon type="lock" style={{ fontSize: 13 }} />
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