import React from 'react'
import { mount } from 'enzyme'
import NumberCard from './NumberCard'

const setup = () => {
    const props = {
        icon: 'user',
        color: '#1abc9c',
        title: '标题',
        number: 1111,
    }

    const wrapper = mount(<NumberCard {...props} />)

    return {
        props,
        wrapper
    }
}

describe('NumberCard component', () => {
    const { wrapper, props } = setup()

    it('renders Dashboard', () => {
        expect(wrapper.find('.ant-card').exists())
    })

    it('renders title', () => {
        expect(wrapper.find('p').first().text()).toContain(props.title)
    })

    it('renders number', () => {
        expect(wrapper.find('span').text()).toContain('0')
    })
})