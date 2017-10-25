import React from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

const editModal = ({
    onOk,
    form,
    item = {},
    ...modalProps
}) => {
    const { getFieldDecorator, validateFields, getFieldsValue } = form
    const handleOk = () => {
        validateFields((errors) => {
            if (errors) return

            const data = {
                ...getFieldsValue(),
                uid: item.key,
                eid: item.eid
            }

            onOk(data)
        })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk
    }

    return (
        <Modal {...modalOpts}>
            <Form>
                <FormItem label="姓名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('name', {
                            initialValue: item.name,
                            rules: [
                                { required: true, message: '请输入你的姓名!' }
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="用户名" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('user', {
                            initialValue: item.user,
                            rules: [
                                { required: true, message: '请输入你的用户名!' }
                            ],
                        })(
                            <Input disabled />
                        )
                    }
                </FormItem>
                <FormItem label="年龄" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('age', {
                            initialValue: item.age,
                            rules: [
                                { required: true, message: '请输入你的年龄!' }
                            ],
                        })(
                            <InputNumber min={18} max={100} />
                        )
                    }
                </FormItem>
                <FormItem label="性别" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('sex', {
                            initialValue: `${item.sex}`,
                            rules: [
                                { required: true }
                            ],
                        })(
                            <Select>
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="权限" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: `${item.state}`,
                            rules: [
                                { required: true }
                            ],
                        })(
                            <Select>
                                <Option value="0">管理员</Option>
                                <Option value="1">普通</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="手机号码" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('tel', {
                            initialValue: item.tel,
                            rules: [
                                { required: true, message: '手机号码不能为空!' },
                                {
                                    pattern: /^(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/,
                                    message: '手机号码格式错误!'
                                }
                            ],
                        })(
                            <Input />
                        )
                    }
                </FormItem>
            </Form>
        </Modal>
    )
}


const Index = Form.create()(editModal)

editModal.propTypes = {
    onOk: PropTypes.func,
    item: PropTypes.object,
    form: PropTypes.object,
}

export default Index
