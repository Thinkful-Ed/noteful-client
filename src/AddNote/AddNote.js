import React, { Component } from "react";
//import ApiContext from '../ApiContext'
//import config from '../config'

export default class AddNote extends Component {
 // static contextType = ApiContext;
  state = {
    addNote: ""
  };

  handleChange = (e) => {
    this.setState({
      addNote: e.currentTarget.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // fetch(`${config.API_ENDPOINT}/notes`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name: this.state.noteName
        
    //   })
    // })
    //   .then((res) => {
    //     if (!res.ok) return res.json().then((e) => Promise.reject(e));
    //     return res.json();
    //   })
    //   .then((note) => {
    //     console.log(note);
    //     this.context.addNote(note);
    //     this.props.history.push(`/notes/${note.id}`);
    //   })

    //   .catch((error) => {
    //     console.error({ error });
    //   });
  };

  render() {
    return (
      <>
        <h2>Add Note</h2>
        <form onSubmit={this.handleSubmit} className="AddNote">
          <label>
            {" "}
            Add Note:{" "}
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.addNote}
              required
            />
            <input type="submit" value="submit" />
          </label>
        </form>
      </>
    );
  }
}
