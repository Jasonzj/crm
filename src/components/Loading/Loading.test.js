import React from 'react'
import { shallow } from 'enzyme'
import Loading from './Loading'

const setup = () => {
    const props = {
        spinning: true
    }

    const wrapper = shallow(<Loading {...props} />)

    return {
        props,
        wrapper
    }
}

describe('DropOption component', () => {
    const { wrapper, props } = setup()

    it('renders Dashboard', () => {
        expect(wrapper.find('div').last().text()).toContain('LOADING')
    })

})