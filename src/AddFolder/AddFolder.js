import React, { Component } from "react";
import ApiContext from '../ApiContext'
import config from '../config'


export default class AddFolder extends Component {
    static contextType = ApiContext;

    state= {
        folderName:''
    }

    handleChange = (e) => {
        this.setState({
            folderName:e.currentTarget.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                "name":this.state.folderName
            })
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then((folder) => {
            console.log(folder)
            this.context.addFolder(folder)
            this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(error => {
              console.error({ error })
            })

    }

  render() {
    return (
      <>
        <h2>Add Folder</h2>
        <form onSubmit={this.handleSubmit} className="AddFolder">
          <label>
            Folder Name:{" "} 
            <input type="text" onChange={this.handleChange} value={this.state.folderName} required />
            <input type="submit" value="submit"/>
          </label>
        </form>
      </>
    );
  }
}
