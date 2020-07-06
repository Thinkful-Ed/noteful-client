import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  errorMessage: "",
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  addErrorMessage: () => {},
})
