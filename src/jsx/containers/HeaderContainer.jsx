import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../components/Dropdown';

import styled from 'styled-components';

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
    };

    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session
        };
        console.log(this.state);
    }

    render() {

        const logo = (
            <div className={'col'}>
                <svg height={'69'}>
                    <use xlinkHref='dist/spritemap.svg#sprite-logo'/>
                </svg>
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
                <input className={'form-control'} placeholder={'email, mm, or name'} style={{minWidth: '253px'}}/>
                <button className={'btn btn-light'} type={'button'}>Go</button>
            </div>
        ) : null;

        const loggedInMessage = this.state.session ? (
            <div style={{right: 40, position: 'absolute', fontSize: '10pt'}}>
                <i>Logged in as:</i> <b>{this.state.session.user.email}</b>
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