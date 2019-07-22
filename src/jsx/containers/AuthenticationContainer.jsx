import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { FormattedMessage, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import FooterContainer from './authentication/FooterContainer';

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

    static propTypes = {
        language: PropTypes.string
    };

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
            mode: 'login',
            language: this.props.language,
        };
        console.log(this.state.mode);
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
                    window.location.reload();
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
                    window.location.reload();
                }
            })
            .catch(function (err) {
                console.log('ERROR: ' + err);
            });
    };

    render() {
        const logo = (
            <div className={'col'}>
                <div className={'row'} style={{minWidth: '308px', maxWidth: '335px'}}>
                    <svg height={'69px'} width={'204px'} style={{display: 'block', float: 'left', left: 0}}>
                        <use xlinkHref={'dist/spritemap.svg#sprite-logo'}/>
                    </svg>
                    <div style={{display: 'block', float: 'right', width: 'auto'}}>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52', paddingTop: '11px'}}>
                            <FormattedMessage
                                id='app.header.logo.message-top'
                                defaultMessage='Collaborative'
                            />
                        </a>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52'}}>
                            <FormattedMessage
                                id='app.header.logo.message-middle'
                                defaultMessage='Health Outcomes'
                            />
                        </a>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52'}}>
                            <FormattedMessage
                                id='app.header.logo.message-bottom'
                                defaultMessage='Information Registry'
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
        const login = (
            <div className={'col-xs-6 mt-2 mb-2'} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{padding: '0 10px 0 10px'}}>
                    <button onClick={() => this.handleSwitchMode('login')}
                            className={'btn btn-outline-success'}
                            style={{minHeight: '38px', minWidth: '215px'}}
                            type={'button'}>
                        <FormattedMessage
                            id='app.authentication.button.sign-in'
                            defaultMessage='Sign in'
                        />
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
                        <FormattedMessage
                            id='app.authentication.button.registration'
                            defaultMessage='Registration'
                        />
                    </button>
                </div>
            </div>
        );

        const cssTextHeader = {
            fontSize: '16pt',
            fontWeight: 700
        };

        const authentication = this.state.mode === 'registration' ? (
            <div className='container' style={{paddingTop: '230px'}}>
                <div className='row justify-content-center align-items-center'>
                    <form className='col-xl-8 col-lg-8 col-sm-11 col-xs-8'
                          onSubmit={this.handleRegistrationSubmit}
                    >
                        <div className='container text-center'>
                            <a style={{...cssTextHeader, ...{color: '#CC444A'}}}>
                                <FormattedMessage
                                    id='app.authentication.message.registration'
                                    defaultMessage='Type your Registration credentials.'
                                />
                            </a>
                        </div>
                        <div className='form-group'>
                            <label>
                                <FormattedMessage
                                    id='app.authentication.label.email-address'
                                    defaultMessage='Email address'
                                />
                            </label>
                            <FormattedMessage
                                id='app.authentication.input.placeholder.email-address'
                                defaultMessage='Your email' >
                                { (placeholder) =>
                                    <input type={'email'}
                                           name={'email'}
                                           required={true}
                                           className={'form-control'}
                                           placeholder={placeholder}
                                           onChange={this.handleRegistrationChange}
                                           value={this.state.form.registration.email}

                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className='form-group'>
                            <label>
                                <FormattedMessage
                                    id='app.authentication.label.secret-password'
                                    defaultMessage='Secret password'
                                />
                            </label>
                            <FormattedMessage
                                id='app.authentication.input.placeholder.password'
                                defaultMessage='Your password' >
                                { (placeholder) =>
                                    <input type={'password'}
                                           name={'password'}
                                           required={true}
                                           className={'form-control'}
                                           placeholder={placeholder}
                                           onChange={this.handleRegistrationChange}
                                           value={this.state.form.registration.password}

                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className='form-group'>
                            <label>
                                <FormattedMessage
                                    id='app.authentication.label.confirm-password'
                                    defaultMessage='Confirm password'
                                />
                            </label>
                            <FormattedMessage
                                id='app.authentication.input.placeholder.password-verify'
                                defaultMessage='Your password' >
                                { (placeholder) =>
                                    <input type={'password'}
                                           name={'passwordVerify'}
                                           required={true}
                                           className={'form-control'}
                                           placeholder={placeholder}
                                           onChange={this.handleRegistrationChange}
                                           value={this.state.form.registration.passwordVerify}

                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className='form-group text-right' style={{paddingTop: '30px'}}>
                            <button className={'btn btn-outline-primary'}
                                    style={{minHeight: '45px', minWidth: '230px'}}
                                    type={'submit'}
                            >
                                <FormattedMessage
                                    id='app.authentication.button.submit'
                                    defaultMessage='Submit'
                                />
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
                            <a style={{...cssTextHeader, ...{color: '#51A351'}}}>
                                <FormattedMessage
                                    id='app.authentication.message.sign-in'
                                    defaultMessage='Type your Sign-in credentials.'
                                />
                            </a>
                        </div>
                        <div className='form-group'>
                            <label>
                                <FormattedMessage
                                    id='app.authentication.label.email-address'
                                    defaultMessage='Email address'
                                />
                            </label>
                            <FormattedMessage
                                id='app.authentication.input.placeholder.email-address'
                                defaultMessage='Your email' >
                                { (placeholder) =>
                                    <input type={'email'}
                                           name={'email'}
                                           required={true}
                                           className={'form-control'}
                                           placeholder={placeholder}
                                           onChange={this.handleLoginChange}
                                           value={this.state.form.login.email}

                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className='form-group'>
                            <label>
                                <FormattedMessage
                                    id='app.authentication.label.secret-password'
                                    defaultMessage='Secret password'
                                />
                            </label>
                            <FormattedMessage
                                id='app.authentication.input.placeholder.password'
                                defaultMessage='Your password' >
                                { (placeholder) =>
                                    <input type={'password'}
                                           name={'password'}
                                           required={true}
                                           className={'form-control'}
                                           placeholder={placeholder}
                                           onChange={this.handleLoginChange}
                                           value={this.state.form.login.password}

                                    />
                                }
                            </FormattedMessage>
                        </div>
                        <div className='form-group text-right' style={{paddingTop: '30px'}}>
                            <button className={'btn btn-outline-primary'}
                                    style={{minHeight: '45px', minWidth: '230px'}}
                                    type={'submit'}
                            >
                                <FormattedMessage
                                    id='app.authentication.button.submit'
                                    defaultMessage='Submit'
                                />
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
                <FooterContainer
                    language={this.state.language}
                />
            </Authentication>
        );
    }
}

export default AuthenticationContainer;