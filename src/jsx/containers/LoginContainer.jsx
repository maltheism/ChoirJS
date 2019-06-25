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
    
    @media (min-width: 0px) {
        padding-top: 64px;      
    } 
    
    @media (min-width: 601px) {
        padding-top: 128px;      
    } 
    
    @media (min-width: 898px) {
        padding-top: 64px;
    }
`;

class LoginContainer extends Component {
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

        axios.post('/login', {
            email: this.state.form.email,
            password: this.state.form.password,
        })
            .then(function (body) {
                // POST succeeded
                console.log('got: '
                    + JSON.stringify(body.data));
            })
            .catch(function (err) {
                console.log('ERROR: ' + err);
            });
    };
    render() {
        return (
            <Page>
                Login
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}
                           name={'email'}
                           value={this.state.form.email}
                           type={'email'}
                           placeholder={'email'}
                    />
                    <input onChange={this.handleChange}
                           name={'password'}
                           value={this.state.form.password}
                           type={'password'}
                           placeholder={'password'}
                    />
                    <button type={'submit'}>
                        Login
                    </button>
                </form>
            </Page>
        );
    }
}

export default LoginContainer;