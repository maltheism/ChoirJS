import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Header = styled.div`
    top: 0;
    z-index: 4;
    flex: 1 0 auto;
    overflow: none;
    min-height: 70px;
    position: absolute;
    width: calc(100vw);
    background-color: #FFFFFF;
    padding: 0 70px 0 10px;
    
    @media (min-width: 0px) {
        min-height: 192px;       
    } 
    
    @media (min-width: 713px) {
        min-height: 128px;      
    } 
    
    @media (min-width: 1032px) {
        min-height: 70px;
    }
`;

const Authentication = styled.div`
    z-index: 2;
    flex: 1 0 auto;
    overflow: auto;
    min-height: 500px;
    position: relative;
    width: calc(100vw);
    height: calc(100vh);
    background-color: #fff;
`;

class AuthenticationContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                login: {
                    email: '',
                    password: ''
                },
                registration: {
                    email: '',
                    password: '',
                    passwordVerify: ''
                }
            },
            mode: 'login'
        };
        this.handleRegistrationChange = this.handleRegistrationChange.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleSwitchMode = this.handleSwitchMode.bind(this);
    }

    handleRegistrationChange(event) {
        const state = Object.assign({}, this.state);
        state.form.registration[event.target.name] = event.target.value;
        this.setState({state});
    }
    handleLoginChange(event) {
        const state = Object.assign({}, this.state);
        state.form.login[event.target.name] = event.target.value;
        this.setState({state});
    }

    handleSwitchMode(mode) {
        this.setState({mode: mode});
    }

    handleRegistrationSubmit(event) {
        event.preventDefault();
        axios.post('/register', {
            email: this.state.form.registration.email,
            password: this.state.form.registration.password,
        })
            .then(function (body) {
                // POST succeeded
                if (body.data && body.data.status) {
                    location.reload();
                }
            })
            .catch(function (err) {
                console.log('ERROR: ' + err);
            });
    };

    handleLoginSubmit(event) {
        event.preventDefault();
        axios.post('/login', {
            email: this.state.form.login.email,
            password: this.state.form.login.password,
        })
            .then(function (body) {
                // POST succeeded
                if (body.data && body.data.status) {
                    location.reload();
                }
            })
            .catch(function (err) {
                console.log('ERROR: ' + err);
            });
    };

    render() {
        const logo = (
            <div className={'col-xs-6'}>
                <svg height={'69'}>
                    <use xlinkHref='dist/spritemap.svg#sprite-logo'/>
                </svg>
            </div>
        );
        const login = (
            <div className={'col-xs-6 mt-2 mb-2'} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{padding: '0 10px 0 10px'}}>
                    <button onClick={() => this.handleSwitchMode('login')}
                            className={'btn btn-outline-success'}
                            style={{minHeight: '38px', minWidth: '215px'}}
                            type={'button'}>
                        Sign in
                    </button>
                </div>
            </div>
        );
        const register = (
            <div className={'col-xs-6 mt-2 mb-2'} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{padding: '0 10px 0 10px'}}>
                    <button onClick={() => this.handleSwitchMode('registration')}
                            className={'btn btn-outline-danger'}
                            style={{minHeight: '38px', minWidth: '215px'}}
                            type={'button'}>
                        Registration
                    </button>
                </div>
            </div>
        );

        const cssTextHeader = {
            fontSize: '16pt'
        };

        const authentication = this.state.mode === 'registration' ? (
            <div className='container' style={{paddingTop: '230px'}}>
                <div className='row justify-content-center align-items-center'>
                    <form className='col-xl-8 col-lg-8 col-sm-11 col-xs-8'
                          onSubmit={this.handleRegistrationSubmit}
                    >
                        <div className='container text-center'>
                            <a style={cssTextHeader}>Type your </a>
                            <a style={{...cssTextHeader, ...{color: '#CC444A'}}}>"</a>
                            <a style={{...cssTextHeader,...{color: '#CC444A', fontWeight: '700'}}}>Registration</a>
                            <a style={{...cssTextHeader, ...{color: '#CC444A'}}}>"</a>
                            <a style={cssTextHeader}> credentials.</a>
                        </div>
                        <div className='form-group'>
                            <label>Email address</label>
                            <input type={'email'}
                                   name={'email'}
                                   required={true}
                                   className={'form-control'}
                                   placeholder={'Your email'}
                                   onChange={this.handleRegistrationChange}
                                   value={this.state.form.registration.email}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Secret password</label>
                            <input type={'password'}
                                   name={'password'}
                                   required={true}
                                   className={'form-control'}
                                   placeholder={'Your password'}
                                   onChange={this.handleRegistrationChange}
                                   value={this.state.form.registration.password}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Confirm password</label>
                            <input type={'password'}
                                   name={'passwordVerify'}
                                   required={true}
                                   className={'form-control'}
                                   placeholder={'Your password'}
                                   onChange={this.handleRegistrationChange}
                                   value={this.state.form.registration.passwordVerify}
                            />
                        </div>
                        <div className='form-group text-right' style={{paddingTop: '30px'}}>
                            <button className={'btn btn-outline-primary'}
                                    style={{minHeight: '45px', minWidth: '230px'}}
                                    type={'submit'}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : (
            <div className='container' style={{paddingTop: '230px'}}>
                <div className='row justify-content-center align-items-center'>
                    <form className='col-xl-8 col-lg-8 col-sm-11 col-xs-8'
                          onSubmit={this.handleLoginSubmit}
                    >
                        <div className='container text-center'>
                            <a style={cssTextHeader}>Type your </a>
                            <a style={{...cssTextHeader, ...{color: '#51A351'}}}>"</a>
                            <a style={{...cssTextHeader,...{color: '#51A351', fontWeight: '700'}}}>Sign-in</a>
                            <a style={{...cssTextHeader, ...{color: '#51A351'}}}>"</a>
                            <a style={cssTextHeader}> credentials.</a>
                        </div>
                        <div className='form-group'>
                            <label>Email address</label>
                            <input type={'email'}
                                   name={'email'}
                                   required={true}
                                   className={'form-control'}
                                   placeholder={'Your email'}
                                   onChange={this.handleLoginChange}
                                   value={this.state.form.login.email}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Secret password</label>
                            <input type={'password'}
                                   name={'password'}
                                   required={true}
                                   className={'form-control'}
                                   placeholder={'Your password'}
                                   onChange={this.handleLoginChange}
                                   value={this.state.form.login.password}
                            />
                        </div>
                        <div className='form-group text-right' style={{paddingTop: '30px'}}>
                            <button className={'btn btn-outline-primary'}
                                    style={{minHeight: '45px', minWidth: '230px'}}
                                    type={'submit'}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );

        return (
            <Authentication>
                <Header>
                    <div className={'container-fluid'}>
                        <div className={'row'}>
                            {logo}
                        </div>
                        <div className={'row'}>
                            {login}
                            {register}
                        </div>
                    </div>
                </Header>
                {authentication}
                {/*<RegistrationContainer/>*/}
            </Authentication>
        );
    }
}

export default AuthenticationContainer;