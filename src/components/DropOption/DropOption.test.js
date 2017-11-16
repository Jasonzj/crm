import React from 'react'
import { shallow } from 'enzyme'
import DropOption from './DropOption'

const setup = () => {
    const props = {
        onMenuClick: jest.fn(),
        menuOptions: [
            { key: '1', name: '更新' },
            { key: '2', name: '删除' }
        ],
        buttonStyle: {},
        dropdownProps: {},
    }

    const wrapper = shallow(<DropOption {...props} />)

    return {
        props,
        wrapper
    }
}

describe('DropOption component', () => {
    const { wrapper, props } = setup()

    it('renders Dashboard', () => {
        expect(wrapper.find('.ant-btn').exists())
    })

})