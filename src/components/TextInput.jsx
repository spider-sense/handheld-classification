import React from "react";
class TextInput extends React.Component {
    
    // Expects props:
    // value: Text field current value
    // labelText: legend label value
    // 
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        const labelText = this.props.label;
        return (
            <fieldset>
                <legend>{labelText}</legend>
                <input value={value}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

export default TextInput;
