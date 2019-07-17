import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {AppContext} from '../contexts/AppContext';

const Footer = styled.div`
    bottom: 0;
    z-index: 2;
    flex: 1 0 auto;
    overflow: none;
    position: fixed;
    min-height: 40px;
    width: calc(100vw);
    border-top: 2px solid #822422;
    background-color: #FFFFFF;
    
    @media (min-width: 0px) {
        min-height: 70px;       
    } 
    
    @media (min-width: 601px) {
        min-height: 50px;      
    } 
    
    @media (min-width: 898px) {
        min-height: 40px;
    }
`;

class FooterContainer extends Component {

    static contextType = AppContext;

    static propTypes = {
        language: PropTypes.string,
        setLanguageKey: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            language: this.props.language,
            languages: {
                fr: 'Français',
                en: 'English'
            }
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
    }

    handleLogout() {
        document.cookie = 'choirjs' + '=; Path=/; Expires=Tue, 18 Sep 1990 00:00:01 GMT;';
        document.cookie = 'session' + '=; Path=/; Expires=Tue, 18 Sep 1990 00:00:01 GMT;';
        location.reload();
    }

    handleLanguage(event) {
        if (event.target.innerText === 'Français') {
            this.state.setLanguageKey('fr');
        } else if (event.target.innerText === 'English') {
            this.state.setLanguageKey('en');
        }
    }

    componentDidMount() {
        this.setState({setLanguageKey: this.context.setLanguageKey});
    }

    render() {
        const cssRow = {
            display: 'flex',
            color: '#822422',
            cursor: 'pointer',
            alignItems: 'center'
        };
        const cssRowLanguage = {
            display: 'flex',
            color: '#444682',
            cursor: 'pointer',
            alignItems: 'center'
        };
        const cssLink = {
            color: 'inherit',
        };
        const setLanguage = this.state.language === 'en' ? 'Français' : 'English';
        return (
            <Footer>
                <div className={'container-fluid'}
                     style={{display: 'flex', minHeight: 'inherit'}}
                >
                    <div className={'row'} style={{minHeight: '100%'}}>
                        <div className={'col-md-auto'} style={cssRowLanguage}>
                            <a style={cssLink} onClick={this.handleLanguage}>
                                {setLanguage}
                            </a>
                        </div>
                        <div className={'col-sm-auto'}
                             style={{...cssRow}}>
                            <a style={cssLink} href={'https://med.stanford.edu/researchit.html'}>
                                <FormattedMessage id='app.footer.about' defaultMessage='About us' />
                            </a>
                        </div>
                        <div className={'col-sm-auto'} style={cssRow}>
                            <a style={cssLink} href={'https://www.stanford.edu/site/terms.html'}>
                                <FormattedMessage id='app.footer.terms' defaultMessage='Terms' />
                            </a>
                        </div>
                        <div className={'col-sm-auto'} style={cssRow}>
                            <a style={cssLink} href={'https://choir.stanford.edu/contact/'}>
                                <FormattedMessage id='app.footer.contact' defaultMessage='Contact' />
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 15, right: 15, zIndex: 5}}>
                    <button onClick={this.handleLogout}
                        className={'btn btn-dark'}
                            style={{height: '40px', width: '120px'}}>
                        <FormattedMessage id='app.footer.logout' defaultMessage='Logout' />
                    </button>
                </div>
            </Footer>
        );
    }
}

export default FooterContainer;