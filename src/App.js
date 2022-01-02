import logo from './logo.svg';
import './App.css';
import React from 'react';
import ButtonView from './components/ButtonView';
import TextInput from './components/TextInput';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 0 };
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleIdChange(idValue) {
        this.setState({ id: idValue })
    }

    render() {
        const imageId = this.state.id;
        return (
            <div>
                hello world
                <TextInput value={imageId} label="Image #:" onChange={this.handleIdChange}></TextInput>
                <div>{this.state.id}</div>
            </div>
            
        );
    }
}

export default App;
