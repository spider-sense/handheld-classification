// src/components/ButtonView.jsx
import React, { Component } from 'react';

// This component expects the props:
// label: text for the button
// callback: function to call when the button is pressed
// bgColor: background color for the button
// textColor: text color for the button
class ButtonView extends Component {
    constructor(props) {
        super(props);
        // Maybe need to bind something here idk
        // this.handleClick = this.handleClick.bind(this);
    }
    
    render() {
        const styles = {
            backgroundColor: this.props.bgColor,
            color: this.props.textColor,
            border: 'none',
            borderRadius: '4px',
        }
        return (<button type="button" style={styles} onClick={this.props.callback}>{this.props.label}</button>);
    }
    
}
export default ButtonView;