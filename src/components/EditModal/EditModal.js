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
    type,
    formData,
    item = {},
    ...modalProps
}) => {
    const { getFieldDecorator, validateFields, getFieldsValue } = form
    const handleOk = () => {
        validateFields((errors) => {
            if (errors) return
            const values = getFieldsValue()
            const data = {
                userManage: {
                    ...values,
                    uid: item.key,
                    eid: item.eid
                },
                userDetail: {
                    id: item.key,
                    uid: item.uid,
                    eid: item.eid,
                    eName: values.eName,
                    client: {
                        ...values,
                        type: item.type
                    }
                }
            }[type]

            type === 'userDetail' && delete data.client.eName

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
                {
                    formData.map((data) => {
                        const selectVal = data.selectVal
                        let content = null
                        let selectKeys = null
                        selectKeys = data.type === 'select'
                            ? Object.keys(selectVal)
                            : null

                        content = {
                            input: <Input disabled={data.disabled} />,
                            number: <InputNumber min={data.min} max={data.max} />,
                            select: (
                                <Select>
                                    {
                                        selectKeys &&
                                        selectKeys.map(key => (
                                            <Option value={key}>
                                                {selectVal[key]}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )
                        }[data.type]

                        return (
                            <FormItem
                                key={data.id}
                                label={data.label}
                                hasFeedback
                                {...formItemLayout}
                            >
                                {
                                    getFieldDecorator(data.key, {
                                        initialValue: data.string ? `${item[data.key]}` : item[data.key],
                                        rules: data.rules
                                    })(
                                        content
                                    )
                                }
                            </FormItem>
                        )
                    })
                }
            </Form>
        </Modal>
    )
}


const Index = Form.create()(editModal)

editModal.propTypes = {
    onOk: PropTypes.func,
    type: PropTypes.string,
    item: PropTypes.object,
    form: PropTypes.object,
    formData: PropTypes.array,
}

export default Index
