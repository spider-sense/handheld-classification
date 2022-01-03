import logo from './logo.svg';
import './App.css';
import React from 'react';
import ButtonView from './components/ButtonView';
import TextInput from './components/TextInput';
import jsonData from './data/split2.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        const initalId = localStorage.getItem("id") == null ? 0 : parseInt(localStorage.getItem("id"));
        this.state = { id: initalId };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleHandheld = this.handleHandheld.bind(this);
        this.handleNotHandheld = this.handleNotHandheld.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.saveLocalStorage = this.saveLocalStorage.bind(this);
    }

    handleIdChange(idValue) {
        const idNum = parseInt(idValue, 10);
        if (idValue == null || idValue == undefined || isNaN(idNum)) {
            this.setState({ id: 0 });
        } else {
            this.setState({ id: idNum });
        }
        this.syncState();
    }

    handleHandheld() {
        localStorage.setItem(this.state.id, true);
        this.setState({ id: this.state.id + 1 });
        this.syncState();
    }

    handleNotHandheld() {
        localStorage.setItem(this.state.id, false);
        this.setState({ id: this.state.id + 1 });
        this.syncState();
    }

    handleBack() {
        if (!this.state.id <= 0) {
            this.setState({ id: this.state.id - 1 });;
        }
        this.syncState();
    }

    syncState() {
        localStorage.setItem("id", this.state.id);
    }

    saveLocalStorage() {
        const saveFile = async (blob) => {
            const a = document.createElement('a');
            a.download = 'your-name.json';
            a.href = URL.createObjectURL(blob);
            a.addEventListener('click', (e) => {
                setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
            });
            a.click();
        };

        const blob = new Blob([JSON.stringify(localStorage, null, 2)], { type: 'application/json' });

        saveFile(blob);
    }

    render() {
        const imageId = this.state.id;

        // Check if value exists before use
        const imageEntry = !jsonData[imageId.toString()] ? { name: "", category: "n/a" } : jsonData[imageId.toString()];

        const imageUrl = "https://gitlab.com/acgandhi/handheld-classification-files/-/raw/main/" + imageEntry.name;

        // Buttons and other text
        // This should probably be a react component
        const statusContainerStyle = {
            // width: '400px',
            // display: 'flex',
            justifyContent: 'left',
            verticalAlign: 'middle'
        };


        return (
            <div>
                <TextInput value={imageId} label="Image #:" onChange={this.handleIdChange}></TextInput>

                <div style={statusContainerStyle}>
                    <ButtonView label="Back" callback={this.handleBack} bgColor="#f0f0f0" textColor="black" />
                    <span> | </span>
                    <ButtonView label="Not Handheld" callback={this.handleNotHandheld} bgColor="#ff9aa2" textColor="black" />
                    <ButtonView label="Handheld" callback={this.handleHandheld} bgColor="#e2f0cb" textColor="black" />
                    <span>Object type: <b>{imageEntry.category}</b></span>
                </div>
                <img src={imageUrl} />
                <div><ButtonView label="Export" callback={this.saveLocalStorage} bgColor="#0f0f0f" textColor="white" /></div>
            </div>
        );
    }
}

export default App;
