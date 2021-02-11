import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ErrorMessage from '../ErrorMessage'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  state = {
    errorMessage: "",
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      folder_name: e.target['folder-name'].value
    }
    if (folder.name === ""){
      this.setState({errorMessage: "Folder name is required."});
    }
    else {
      fetch(`${config.API_ENDPOINT}/folders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(folder),
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })       
    }
  }    

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
          </div>
          <ErrorMessage errorMessage={this.state.errorMessage} />
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
