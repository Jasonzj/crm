import React from 'react'
import { shallow, mount } from 'enzyme'
import EditModal from './EditModal'
import { createForm } from 'utils/formConfig'

const setup = () => {
    const props = {
        item: {},
        eid: 1233213123,
        type: 'visit',
        onOk: jest.fn(),
        title: '创建/更新拜访',
        visible: true,
        onCancel: jest.fn(),
        formData: createForm('visit'),
    }

    props.item = {
        id: '330000201410087258',
        uid: '330000201410087258',
        eName: '李四',
        name: '顶峰有限公司',
        result: 0,
        time: '2006-09-01',
        note: '备注xxxxxxxxxxxxxxxxxxxxx',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        key: '330000201410087258'
    }

    const wrapper = mount(<EditModal {...props} />)

    return {
        props,
        wrapper
    }
}

describe('EditModal component', () => {
    const { wrapper, wrapper2, props } = setup()

    it('renders EditModal', () => {
        expect(wrapper.find('.ant-modal').exists())
    })

    it('props item name', () => {
        expect(wrapper.props().item.name).toContain(props.item.name)
    })
})