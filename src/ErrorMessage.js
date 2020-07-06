import React, { Component } from 'react';

export default class ErrorMessage extends Component {
    render(){
        return(
            <>
                <span>{this.props.errorMessage}</span>
            </>
        )
    }
}