import React, { Component } from 'react';
import ApiContext from './ApiContext';

export default class ErrorMessage extends Component {
    static contextType = ApiContext;
    render(){
        return(
            <>
                <span>{this.context.ErrorMessage}</span>
            </>
        )
    }
}