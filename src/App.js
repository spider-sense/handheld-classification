import logo from './logo.svg';
import './App.css';
import React from 'react';
import ButtonView from './components/ButtonView';
import TextInput from './components/TextInput';
import jsonData from './data/split2.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 0 };
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleIdChange(idValue) {
        const idNum = parseInt(idValue, 10);
        if(idValue == null || idValue == undefined || isNaN(idNum)) {
            this.setState({ id: 0 });
        } else {
            this.setState({ id: idNum });
        }
    }

    render() {
        const imageId = this.state.id;

        // Check if value exists before use
        const imageFileName = !jsonData[imageId.toString()] ? "" : jsonData[imageId.toString()].name;

        const imageUrl = "https://gitlab.com/acgandhi/handheld-classification-files/-/raw/main/" + imageFileName;
        return (
            <div>
                hello world
                <TextInput value={imageId} label="Image #:" onChange={this.handleIdChange}></TextInput>
                <img src={imageUrl}/>
            </div>
            
        );
    }
}

export default App;
