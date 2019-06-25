import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input.jsx';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleLogin() {
    }
    handleChange(event) {
        //this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

const wrapper = document.getElementById('create-app-main');
wrapper ? ReactDOM.render(<AppContainer />, wrapper) : false;

export default AppContainer;