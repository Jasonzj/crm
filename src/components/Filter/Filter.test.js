import React from 'react'
import { shallow } from 'enzyme'
import Filter from './Filter'

const setup = () => {
    const props = {
        onReset: jest.fn(),
        onCreate: jest.fn(),
        isFetching: false,
        hasSelected: false,
        onSearchName: jest.fn(),
        selectedLen: 2,
        onDeleteUsers: jest.fn(),
        removeTitle: 'xxxx',
        onSearchCompany: jest.fn(),
    }

    const wrapper = shallow(<Filter {...props} />)

    return {
        props,
        wrapper
    }
}

describe('Filter component', () => {
    const { wrapper, wrapper2, props } = setup()

    it('renders Filter', () => {
        expect(wrapper.find('.ant-row').exists())
    })

})