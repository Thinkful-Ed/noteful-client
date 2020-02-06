import React from 'react';
import ReactDOM from 'react-dom';
import ValidationError from '../AddNote/ValidationError';
import { runInNewContext } from 'vm';
import config from '../config';
import NoteError from '../NoteError';
import PropTypes from 'prop-types'

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: '',
            touched: false
          }
        }
    } 

    updateName(name) {
        this.setState({name: {value: name, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name} = this.state;
    
        console.log(name);
        let options = {
            method: 'POST', 
            body: JSON.stringify({name: name.value }),
            headers: { 'Content-Type': 'application/json'}
        }
        fetch(`${config.API_ENDPOINT}/notes`, options) 
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } else if (name.length < 3) {
          return "Name must be at least 3 characters long";
        }
      }

    render() {
        const nameError = this.validateName();
        
        return (
            <form className="addnote" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Note</h2>
                <div className="addnote__hint">* required field</div>  
                <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" className="name__control"
                    name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
                {this.state.name.touched && <ValidationError message={nameError} />}
                </div>
    
                <div className="addfolder__button__group">
                <button 
                    type="reset" 
                    className="addnote__button">
                    Cancel
                </button>
                <NoteError>
                    <button 
                        type="submit" 
                        className="addnote__button"
                        disabled={this.validateName()}>
                        Save
                    </button>
                </NoteError>
                </div>
            </form>
        )
    }
}

AddNote.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    touched: PropTypes.boolean
};

export default AddNote;