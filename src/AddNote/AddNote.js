import React, { useState } from 'react';
import './AddNote.css'
import {useHistory} from "react-router-dom"
import config from '../config';

export default function AddNote() {
    const [name, setFolderName] = useState('');
    const [error, setError] = useState(false);
    let history = useHistory();
    const handleAddNotes = (event) => {
        event.preventDefault()
        fetch(`${config.API_ENDPOINT}/notes`,  {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name})
        })
        .then(resp => resp.json())
        .then(data => {
            setFolders(data)
            setError(false)
            history.push(`/`)
        })
        .catch(function(error){
            setError(true)
            console.log(error)
        })

        
    }
    
  return (
    <form onSubmit={ (event)=>{handleAddNotes(event)} }>
        <h3 style={{color: "white", marginBottom: "5px"}}>Add a New Folder:</h3>
        <input type="text" name="foldername" onChange={(event) => setFolderName(event.target.value)} /><br/>        
        <input type="submit" value="Submit" />
        {error && <h1>An Error has occured</h1>}
    </form> 
  )
}