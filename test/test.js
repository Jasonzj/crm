import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HelloReact from '../src/containers/HelloReact'
import Counter from '../src/components/Counter'

configure({ adapter: new Adapter() })

const CounterProps = {
    value: 0,
    getData: jest.fn(),
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onIncrementAsync: jest.fn(),
    onDecrementAsync: jest.fn()
}

const HelloWorldProps = {
    data: [
        'test1',
        'test2',
        'test3'
    ],
    ...CounterProps
}

describe('HelloReact component', () => {
    it('should render dom', () => {
        const wrapper = shallow(<HelloReact />)
        expect(wrapper.find('h1').text()).toContain('React starter')
    })
})

describe('Counter component', () => {
    it('should render dom', () => {
        const wrapper = shallow(<Counter {...CounterProps} />)
        expect(wrapper.find('h1').text()).toContain('0')
    })
})