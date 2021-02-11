import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolder from './AddFolder'

describe(`AddItemForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddFolder />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
