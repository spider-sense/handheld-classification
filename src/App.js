import logo from './logo.svg';
import './App.css';
import React from 'react';
import ButtonView from './components/ButtonView';
import TextInput from './components/TextInput';
import jsonData from './data/split2.json'
import * as colors from './utils/colors';

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
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        // Empty log for display purposes.
        this.log = [];
    }

    pushToLog(id, isHandheld) {
        const color = isHandheld ? colors.GREEN : colors.RED;
        const text = isHandheld ? "Handheld" : "Not Handheld";
        const highlightStyle = {backgroundColor: color};
        console.log(colors.GREEN);
        this.log.unshift (
            <div>Image #{id} set to <mark style={highlightStyle}>{text}</mark></div>
        )
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
        this.pushToLog(this.state.id, true);
        localStorage.setItem(this.state.id, true);
        this.setState({ id: this.state.id + 1 });
        this.syncState();
    }

    handleNotHandheld() {
        this.pushToLog(this.state.id, false);
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

    handleKeyPressed(e) {
        switch (e.key) {
            case "w":
                this.handleHandheld();
                break;
            case "s":
                this.handleNotHandheld();
                break;
            case "a":
                this.handleBack();
            default:
                break;
        }
    }

    getImageEntry(imageId) {
        return !jsonData[imageId.toString()] ? { name: "", category: "n/a" } : jsonData[imageId.toString()]; 
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
        const imageEntry = this.getImageEntry(imageId);
        const imageUrl = "https://gitlab.com/acgandhi/handheld-classification-files/-/raw/main/" + imageEntry.name;

        const preloadImageEntry = this.getImageEntry(imageId + 1);
        const preloadImageUrl = "https://gitlab.com/acgandhi/handheld-classification-files/-/raw/main/" + preloadImageEntry.name;

        // Buttons and other text
        // This should probably be a react component
        const statusContainerStyle = {
            // width: '400px',
            // display: 'flex',
            justifyContent: 'left',
            verticalAlign: 'middle'
        };

        return (
            <div tabIndex={-1} onKeyDown={this.handleKeyPressed}>
                <TextInput value={imageId} label="Image #:" onChange={this.handleIdChange}></TextInput>

                <div style={statusContainerStyle}>
                    <ButtonView label="Back (a)" callback={this.handleBack} bgColor="#f0f0f0" textColor="black" />
                    <span> | </span>
                    <ButtonView label="Not Handheld (s)" callback={this.handleNotHandheld} bgColor="#ff9aa2" textColor="black" />
                    <ButtonView label="Handheld (w)" callback={this.handleHandheld} bgColor="#e2f0cb" textColor="black" />
                    <span>Object type: <b>{imageEntry.category}</b></span>
                </div>
                <img src={imageUrl} height="700px"/>
                <img src={preloadImageUrl} style={{display: 'none'}}/>
                <div><ButtonView label="Export" callback={this.saveLocalStorage} bgColor="#0f0f0f" textColor="white" /></div>
                <div>Log:</div>
                <div>{this.log}</div>
            </div>
        );
    }
}

export default App;
