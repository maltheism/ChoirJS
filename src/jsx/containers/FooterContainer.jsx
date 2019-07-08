import React, { Component } from 'react';
import styled from 'styled-components';
import {AppContext} from '../contexts/AppContext';
import PropTypes from 'prop-types';

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
        console.log(this.state.language);
        const setLanguage = this.state.language === 'en' ? 'Français' : 'English';
        return (
            <Footer>
                <div className={'container-fluid'}
                     style={{display: 'flex', minHeight: 'inherit'}}
                >
                    <div className={'row'} style={{minHeight: '100%'}}>
                        <div className={'col'}
                             style={{...cssRow, ...{minWidth: '100px'}}}>
                            <a style={cssLink} href={'https://med.stanford.edu/researchit.html'}>
                                About us
                            </a>
                        </div>
                        <div className={'col'} style={cssRow}>
                            <a style={cssLink} href={'https://www.stanford.edu/site/terms.html'}>
                                Terms
                            </a>
                        </div>
                        <div className={'col'} style={cssRow}>
                            <a style={cssLink} href={'https://choir.stanford.edu/contact/'}>
                                Contact
                            </a>
                        </div>
                        <div className={'col'} style={cssRowLanguage}>
                            <a style={cssLink} onClick={this.handleLanguage}>
                                {setLanguage}
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{position: 'absolute', bottom: 15, right: 15, zIndex: 5}}>
                    <button onClick={this.handleLogout}
                        className={'btn btn-dark'}
                            style={{height: '40px', width: '100px'}}>
                        Logout
                    </button>
                </div>
            </Footer>
        );
    }
}

export default FooterContainer;