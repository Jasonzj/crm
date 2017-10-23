import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

// action
import { actions } from 'ducks/app'

import Loading from 'components/Loading'

const FormItem = Form.Item

@connect(
    state => ({
        signIn: state.app.signIn,
        isFetching: state.app.isFetching
    }),
    dispatch => ({
        onSignIn(values) {
            return dispatch(actions.onSignIn(values))
        }
    })
)
class SignIn extends Component {
    constructor() {
        super()
        this.state = { loading: true }
    }

    componentWillMount() {
        const { signIn, history } = this.props
        const { loading } = this.state
        this.jumpIndex(signIn, history)
    }

    componentWillReceiveProps() {
        const { loading } = this.state
        loading && this.setState({ loading: false })
    }

    jumpIndex(bool, history) {
        bool && history.push('/')
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { form, onSignIn, history } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                onSignIn(values).then((data) => {
                    const { success, message } = data.data
                    if (success) {
                        message.info(message)
                        this.jumpIndex(success, history)
                        return success
                    }
                    message.error(message)
                })
            }
        })
    }

    render() {
        const { isFetching, form: { getFieldDecorator } } = this.props
        const { loading } = this.state

        return (
            <div className={styles.signIn}>
                <Loading spinning={loading} />
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
                        <FormItem>
                            {
                                getFieldDecorator('user', {
                                    rules: [{ required: true, message: '请输入你的用户名!' }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="账号"
                                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('pass', {
                                    rules: [{ required: true, message: '请输入你的密码!' }],
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
    onSignIn: PropTypes.func,
    history: PropTypes.object,
    isFetching: PropTypes.bool,
    getFieldDecorator: PropTypes.func,
}

export default Index