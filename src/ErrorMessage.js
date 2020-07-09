import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends Component {
    render(){
        return(
            <>
                <span>{this.props.errorMessage}</span>
            </>
        )
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
}