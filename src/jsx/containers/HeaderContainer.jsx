import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import Dropdown from '../components/Dropdown';

const Header = styled.div`
    top: 0;
    z-index: 4;
    flex: 1 0 auto;
    overflow: none;
    min-height: 70px;
    position: absolute;
    width: calc(100vw);
    padding: 0 70px 0 10px;
    background-color: #FFFFFF;
    
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

class HeaderContainer extends Component {
    static propTypes = {
        session: PropTypes.object,
        language: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
            language: this.props.language,
            search: ''
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event) {
        this.setState({search: event.target.value});
        // todo.. build search functionality.
    }

    render() {

        const logo = (
            <div className={'col'}>
                <div className={'row'} style={{minWidth: '308px', maxWidth: '335px'}}>
                    <svg height={'69px'} width={'204px'} style={{display: 'block', float: 'left', left: 0}}>
                        <use xlinkHref={'dist/spritemap.svg#sprite-logo'}/>
                    </svg>
                    <div style={{display: 'block', float: 'right', width: 'auto'}}>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52', paddingTop: '11px'}}>
                            <FormattedMessage id='app.header.logo.message-top' defaultMessage='Collaborative' />
                        </a>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52'}}>
                            <FormattedMessage id='app.header.logo.message-middle' defaultMessage='Health Outcomes' />
                        </a>
                        <a style={{display: 'block', fontSize: '8pt', color: '#4d4e52'}}>
                            <FormattedMessage id='app.header.logo.message-bottom' defaultMessage='Information Registry' />
                        </a>
                    </div>
                </div>
            </div>
        );

        const dropdownMenu = this.state.session ? (
            <div className={'col-sm mt-2 mb-2'} style={{display: 'flex', alignItems: 'center'}}>
                <Dropdown
                    list={[
                        'Stanford Medicine',
                        'Test Survey Client',
                        'Patient Satisfaction',
                        'Test Stanford CAT',
                        'Test Stubbed Questions',
                        'Pediatric Pain Management Clinic'
                    ]}
                    index={0}
                />
            </div>
        ) : null;

        const search = this.state.session ? (
            <div className={'col-xl-3 col-lg-4 col-sm-6 col-xs-6'} style={{display: 'flex', alignItems: 'center'}}>
                <FormattedMessage
                    id='app.header.input.placeholder.search'
                    defaultMessage='email, mm, or name' >
                    { (placeholder) =>
                        <input className={'form-control'}
                               placeholder={placeholder}
                               onChange={this.handleSearchChange}
                               value={this.state.search}
                               style={{minWidth: '253px'}}

                        />
                    }
                </FormattedMessage>
                <button className={'btn btn-light'} type={'button'}>Go</button>
            </div>
        ) : null;

        const loggedInMessage = this.state.session ? (
            <div style={{right: 40, position: 'absolute', fontSize: '10pt'}}>
                <i>
                    <FormattedMessage id='app.header.login-message' defaultMessage='Logged in as:' />
                </i> <b>{this.state.session.user.email}</b>
            </div>
        ) : null;

        return (
            <Header>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        {logo}
                        {dropdownMenu}
                        {search}
                        {loggedInMessage}
                    </div>
                </div>
            </Header>
        );
    }
}

export default HeaderContainer;