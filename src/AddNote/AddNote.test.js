import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNote from './AddNote'

describe(`AddNote component`, () => {
  const stubFolders = [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Important"
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Super"
    },
    {
      "id": "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Spangley"
    }
  ]

  it('renders the complete form', () => {
    const wrapper = shallow(<AddNote />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't support React.createContext
  it.skip('renders the select options from folders', () => {
    const context = { folders: stubFolders }
    const select = shallow(<AddNote />, context)
      .find('#note-folder-select')
    expect(toJson(select)).toMatchSnapshot()
  })
})
