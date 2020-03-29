import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";

export default class AddNote extends Component {
  static contextType = ApiContext;
  state = {
    name: '',
    content: '',
    folderId: ''

  };

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        folderId: this.state.folderId,
        modified: new Date()
      })

    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        // console.log(note);
        this.context.addNote(note);
        this.props.history.push(`/note/${note.id}`);
      })

      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <>
        <h2>Add Note</h2>
        <form onSubmit={this.handleSubmit} className="AddNote">
          <label>
            Name:{" "}
            <input
              type="text"
              onChange={this.handleChange} 
              value={this.state.name}
              name='name'
              required
            /> <br />
          </label>
          <label>Content:{" "}
            <input type="text" onChange={this.handleChange}  value={this.state.content} name='content' required/> 
          </label> <br />
          <label>
          Folder:
          <select name='folderId' value={this.state.value} onChange={this.handleChange} required >
            <option value =''></option>
            {
              this.context.folders.map((folder) => (
                <option value={folder.id}>{folder.name}</option>
              ))
            }
    
          </select>
        </label>
          <input type="submit" value="submit" />
        </form>
      </>
    );
  }
}
