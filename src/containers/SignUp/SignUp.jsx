import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Form, Icon, Input, InputNumber, Button, message, Select } from 'antd'

// components
import Result from 'components/Result'

// action
import { actions } from 'ducks/app'

// style
import styles from './style'

const FormItem = Form.Item
const Option = Select.Option
const iconSize = { fontSize: 13 }
const footer = (
    <div className={styles.actions}>
        <Button size="large"><Link to="/user">返回首页</Link></Button>
    </div>
)

@connect(
    state => ({
        signIn: state.app.signIn,
        isFetching: state.app.isFetching
    }),
    dispatch => bindActionCreators({ ...actions }, dispatch)
)
class SignUp extends PureComponent {
    constructor() {
        super()
        this.state = {
            confirmDirty: false,
            resultVisible: false
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('pass')) {
            callback('两个密码输入不一致!')
        } else {
            callback()
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { form, aSignUp, history } = this.props

        form.validateFields((err, values) => {
            if (!err) {
                aSignUp(values).then((data) => {
                    const { success } = data.data
                    success && this.setState({ resultVisible: true })
                })
            }
        })
    }

    render() {
        const { form: { getFieldDecorator, getFieldValue }, isFetching } = this.props
        const { resultVisible } = this.state
        const user = getFieldValue('user')
        const title = <div className={styles.title}>你的账户：{user} 注册成功</div>

        return (
            <div className={styles.signIn}>
                {
                    !resultVisible &&
                    <div className={styles.main}>
                        <div className={styles.title}>
                            <Link to={'/sign_in'}>
                                登入
                            </Link>
                            <b>·</b>
                            <Link to={'/sign_up'} className={styles.active}>
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
                                    getFieldDecorator('name', {
                                        rules: [
                                            { required: true, message: '请输入你的姓名!' },
                                            { min: 1, message: '最小长度不能低于1' },
                                            { max: 6, message: '最大长度不能超过6' }
                                        ],
                                    })(
                                        <Input
                                            size="large"
                                            placeholder="姓名"
                                            prefix={<Icon type="file-text" style={iconSize} />}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                    getFieldDecorator('pass', {
                                        rules: [
                                            { validator: this.checkConfirm },
                                            { required: true, message: '请输入你的密码!' },
                                            { min: 5, message: '最小长度不能低于5' },
                                            { max: 18, message: '最大长度不能超过18' }
                                        ],
                                    })(
                                        <Input
                                            size="large"
                                            type="password"
                                            placeholder="密码"
                                            prefix={<Icon type="lock" style={iconSize} />}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                hasFeedback
                            >
                                {
                                    getFieldDecorator('confirm', {
                                        rules: [
                                            { required: true, message: '请再次输入密码！' },
                                            { validator: this.checkPassword }
                                        ],
                                    })(
                                        <Input
                                            type="password"
                                            placeholder="确认密码"
                                            onBlur={this.handleConfirmBlur}
                                            prefix={<Icon type="lock" style={iconSize} />}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                    getFieldDecorator('age', {
                                        rules: [
                                            { required: true, message: '请输入你的年龄!' }
                                        ],
                                    })(
                                        <InputNumber
                                            min={18}
                                            max={100}
                                            placeholder="年龄"
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                    getFieldDecorator('sex', {
                                        rules: [
                                            { required: true, message: '请输入你的性别!' },
                                        ],
                                    })(
                                        <Select placeholder="性别">
                                            <Option value="0">男</Option>
                                            <Option value="1">女</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                    getFieldDecorator('tel', {
                                        rules: [
                                            { required: true, message: '手机号码不能为空!' },
                                            {
                                                pattern: /^(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
                                                message: '手机号码格式错误!'
                                            }
                                        ],
                                    })(
                                        <Input
                                            size="large"
                                            placeholder="手机号码"
                                            prefix={<Icon type="phone" style={iconSize} />}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isFetching}
                                    className={styles.button}
                                >
                                    注册
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                }
                {
                    resultVisible &&
                    <Result
                        className={styles.registerResult}
                        type="success"
                        title={title}
                        actions={footer}
                    />
                }
            </div>
        )
    }
}

const Index = Form.create()(SignUp)

SignUp.propTypes = {
    form: PropTypes.object,
    aSignUp: PropTypes.func,
    history: PropTypes.object,
    isFetching: PropTypes.bool,
}

export default Index