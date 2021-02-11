import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotePageMain from './NotePageMain'

describe(`NotePageMain component`, () => {
  it('renders a .NotePageMain by default', () => {
    const wrapper = shallow(<NotePageMain />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip('renders a Note with note prop', () => {
    const props = {
      match: {
        params: {
          noteId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }
    const context = {
      notes: [{
        id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
        name: `Dogs`,
        modified: `2019-01-03T00:00:00.000Z`,
        // folderId: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
        content: "Corporis accusamus placeat.\n \rUnde."
      }]
    }
    const note = shallow(<NotePageMain {...props} />, context)
      .find('Note')
    expect(toJson(note)).toMatchSnapshot()
  })

  // enzyme doesn't yet support React.createContext
  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          noteId: 'cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1'
        }
      }
    }

    const notesContextWithDifferentContent = [
      {
        notes: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          }
        ]
      },
      {
        notes: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter."
          }
        ]
      }
    ]

    notesContextWithDifferentContent.forEach(context => {
      const content = shallow(<NotePageMain {...props} />, context)
        .find('NotePageMain__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})
