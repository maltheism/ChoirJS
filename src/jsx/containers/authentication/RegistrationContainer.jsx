import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const Page = styled.div`
    overflow: auto;
    position: absolute;
    width: calc(100vw - 85px);
    min-height: 100vh;
    z-index: 2;
    flex: 1 0 auto;
`;

class RegistrationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const state = Object.assign({}, this.state);
        state.form[event.target.name] = event.target.value;
        this.setState({state});
    }
    handleSubmit(event) {
        event.preventDefault();

        axios.post('/register', {
            email: this.state.form.email,
            password: this.state.form.password,
        })
            .then(function (body) {
                // POST succeeded
                console.log('got: ' + JSON.stringify(body.data));
                if (body.data && body.data.status) {
                    console.log('yay');
                    location.reload();
                }
            })
            .catch(function (err) {
                console.log('ERROR: ' + err);
            });
    };
    render() {
        return (
            <Page>
                Register
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}
                           name={'email'}
                           value={this.state.form.email}
                           type={'email'}
                           placeholder={'email'}
                           required={true}
                    />
                    <input onChange={this.handleChange}
                           name={'password'}
                           value={this.state.form.password}
                           type={'password'}
                           placeholder={'password'}
                           required={true}
                    />
                    <button type={'submit'}>
                        Login
                    </button>
                </form>
            </Page>
        );
    }
}

export default RegistrationContainer;